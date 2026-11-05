import assert from 'node:assert/strict';
import fs from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import ts from 'typescript';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {settleEntrySave} from '../lib/entry-save.mjs';
import {advanceState,initialSave} from '../lib/relay.mjs';

const database=new DatabaseSync(':memory:');
for(const file of fs.readdirSync('drizzle').filter(x=>x.endsWith('.sql')).sort())database.exec(fs.readFileSync('drizzle/'+file,'utf8').replace(/^\uFEFF/,''));
class Statement{
 constructor(sql,args=[]){this.sql=sql;this.args=args;}
 bind(...args){return new Statement(this.sql,args);}
 async first(){return database.prepare(this.sql).get(...this.args)||null;}
 async all(){return {results:database.prepare(this.sql).all(...this.args)};}
 async run(){const result=database.prepare(this.sql).run(...this.args);return {meta:{changes:Number(result.changes)}};}
}
const DB={prepare:sql=>new Statement(sql),batch:async statements=>{database.exec('BEGIN');try{const out=await Promise.all(statements.map(s=>s.run()));database.exec('COMMIT');return out;}catch(error){database.exec('ROLLBACK');throw error;}}};
const objects=new Map();
const BUCKET={
 async put(key,bytes){objects.set(key,typeof bytes==='string'?new TextEncoder().encode(bytes):new Uint8Array(bytes));},
 async get(key){const value=objects.get(key);return value?{body:value,text:async()=>new TextDecoder().decode(value),httpEtag:'"test"'}:null;},
 async delete(keys){for(const key of Array.isArray(keys)?keys:[keys])objects.delete(key);}
};
const env={DB,BUCKET,ADMIN_KEY:'local-admin-test',UPLOAD_CODE:'local-upload-test'};
const source=fs.readFileSync('lib/portal.ts','utf8').replace(/from '(\.\/[^']+)'/g,(_,reference)=>{
 const file=resolve('lib',reference);
 return "from '"+pathToFileURL(fs.existsSync(file)?file:file+'.ts').href+"'";
});
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {handleApi,handleGame,routeById}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
let checks=0;
async function api(path,body,admin=false){
 const r=await handleApi(new Request('https://local.test/api/'+path,body?{method:'POST',headers:{'Content-Type':'application/json',...(admin?{'x-admin-key':env.ADMIN_KEY}:{})},body:JSON.stringify(body)}:undefined),env);
 return {status:r.status,data:await r.json()};
}
const config={player:{hp:1,max_hp:5,sanity:9,curses:['a','b']}};
const stages=database.prepare("SELECT id,exit_hook FROM submissions WHERE status='approved' ORDER BY created_at,id").all();
const configured=await api('admin/configure',{initial_save:config,stages:stages.map((s,i)=>({id:s.id,slot:i,exitHook:'平台钩子-'+i}))},true);
assert.equal(configured.status,200);
const route=(await api('routes/infinite-world')).data;
assert.equal(route.initial_save.player.hp,1);
assert.equal(route.stages.length,2);
assert.equal(route.stages[0].exitHook,'平台钩子-0');checks++;
const repeated=await api('admin/configure',{initial_save:config,stages:stages.map((s,i)=>({id:s.id,slot:i,exitHook:'平台钩子-'+i}))},true);
assert.equal(repeated.data.id,route.id);checks++;
const started=await api('runs',{routeId:route.id,save:{player:{hp:999}},step:1});
assert.equal(started.status,201);
assert.equal(started.data.step,0);assert.equal(started.data.save.player.hp,1);checks++;
const item=(id,stat,value,trigger='on_enter')=>({id,name:id,type:'food',effect:{stat,value,trigger}});
const save={...started.data.save,player:{...started.data.save.player,hp:1},exit_hook:'假钩子',world:'假世界',next_world:'恶意跳转',items:[item('a','hp',1),item('b','hp',2),item('c','cleanse',true),item('d','attack',1,'passive')],clues:['a','b','c']};
const body={routeId:route.id,revision:0,step:0,save};
const next=(await api('runs/'+started.data.runId,body)).data;
assert.equal(next.step,1);assert.equal(next.save.player.hp,3);
assert.equal(next.save.player.curses.length,1);
assert.deepEqual(next.save.items.map(x=>x.id),['b','c','d']);
assert.deepEqual(next.save.clues,['b','c']);
assert.equal(next.history[0].hook,'平台钩子-0');
assert.equal(next.save.exit_hook,'平台钩子-1');checks++;
assert.deepEqual((await api('runs/'+started.data.runId,body)).data,next);checks++;
const replayed=settleEntrySave({...next.save,player:{...next.save.player,hp:1}});
assert.equal(replayed.player.hp,1);
assert.equal(settleEntrySave({...save,items:[item('bad','cleanse',1)]}).items[0].effect,undefined);checks++;
const completed=(await api('runs/'+next.runId,{routeId:route.id,step:1,revision:1,save:next.save,failure:true,reason:'回归阵亡'})).data;
assert.equal(completed.done,true);assert.equal(completed.save.player.hp,3);
assert.equal(completed.save.tombstone.fallen_level,2);assert.equal(completed.history.length,2);
assert.ok(completed.save.items.every(i=>i.relic));checks++;
assert.equal((await api('results',{routeId:route.id,runId:completed.runId,save:completed.save,history:completed.history})).status,200);
assert.equal((await api('results',{routeId:route.id,runId:completed.runId,save:completed.save,history:completed.history})).status,200);
assert.equal(database.prepare("SELECT count(*) AS n FROM settings WHERE key LIKE 'result:%'").get().n,1);checks++;
const formal=await handleGame(new Request('https://local.test/play/'+route.id+'/0/'+route.stages[0].entry_path+'?save='+btoa(JSON.stringify({player:{hp:10}}))),env);
assert.equal(formal.status,200);assert.ok((await formal.text()).includes('"hp":1'));checks++;
const stale=await handleGame(new Request('https://local.test/play/'+route.id+'/0/'+route.stages[0].entry_path+'?runId='+next.runId),env);
assert.equal(stale.status,409);checks++;
const rescue=(await api('runs',{routeId:route.id})).data;
const invalid=await api('runs/'+rescue.runId,{routeId:route.id,step:0,revision:0,save:{}});
assert.equal(invalid.status,400);
const healed=(await api('runs/'+rescue.runId,{routeId:route.id,step:0,revision:0,action:'heal'})).data;
assert.equal(healed.step,0);assert.equal(healed.save.player.hp,5);assert.equal(healed.enteredAt,rescue.enteredAt);checks++;
const longRoute={id:'long-route',stages:Array.from({length:25},(_,i)=>({id:'stage-'+i,world:'世界'+i,exitHook:'出口'+i}))};
let state={runId:crypto.randomUUID(),routeId:longRoute.id,save:initialSave(),step:0,history:[],revision:0,done:false};
for(let i=0;i<25;i++){state=advanceState(state,longRoute,{step:i,save:state.save});const uri='https://local.test/run/long-route?runId='+state.runId+'&step='+state.step;assert.ok(uri.length<2000);}
assert.equal(state.history.length,25);checks++;

const listed=await handleApi(new Request('https://local.test/api/admin/route-snapshots',{headers:{'x-admin-key':env.ADMIN_KEY}}),env);
assert.equal(listed.status,200);
const previousRoute=route.id;
const reversed=await api('admin/configure',{initial_save:{player:{hp:2}},stages:stages.map((s,i)=>({id:s.id,slot:stages.length-i,exitHook:'新钩子-'+i}))},true);
assert.notEqual(reversed.data.id,previousRoute);
const beforeRollback=database.prepare('SELECT COUNT(*) AS n FROM submissions').get().n;
assert.equal((await api('admin/activate-route',{id:previousRoute},true)).status,200);
assert.equal((await api('routes/infinite-world')).data.id,previousRoute);
assert.equal(database.prepare('SELECT COUNT(*) AS n FROM submissions').get().n,beforeRollback);
assert.equal((await api('runs/'+started.data.runId)).data.routeId,previousRoute);checks++;

const {createServer}=await import('node:http');
const uris=[];
const network=createServer(async(req,res)=>{
 try{
  uris.push(req.url);
  const parts=[];for await(const part of req)parts.push(part);
  const request=new Request('http://127.0.0.1'+req.url,{method:req.method,headers:req.headers,...parts.length?{body:Buffer.concat(parts)}:{}});
  const response=await handleApi(request,env);
  res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
 }catch{res.writeHead(500).end('test transport failed');}
});
await new Promise(resolve=>network.listen(0,'127.0.0.1',resolve));
try{
 const origin='http://127.0.0.1:'+network.address().port;
 database.prepare('INSERT INTO routes(id,title,stages,created_at) VALUES(?,?,?,?)').run(longRoute.id,'25关联网回归',JSON.stringify(longRoute.stages),new Date().toISOString());
 const net=async(path,body)=>{
  const response=await fetch(origin+'/api/'+path,body?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}:undefined);
  assert.ok(response.ok,await response.clone().text());return response.json();
 };
 let run=await net('runs',{routeId:longRoute.id});
 for(let i=0;i<25;i++){
  const save={...run.save,items:run.save.items.length?run.save.items:[item('network-relic','attack',1,'passive')],clues:['第'+i+'关线索']};
  run=await net('runs/'+run.runId,{routeId:longRoute.id,step:run.step,revision:run.revision,save,failure:i%5===4,reason:'网络回归失败交接'});
  const reloaded=await net('runs/'+run.runId);
  assert.deepEqual(reloaded,run);
 }
 assert.equal(run.done,true);assert.equal(run.history.length,25);
 assert.ok(run.save.tombstone.epitaph.includes('第25关'));
 assert.ok(uris.every(uri=>uri.length<2000));
 console.log('25关真实 HTTP 请求已完成；最大 URI '+Math.max(...uris.map(uri=>uri.length))+' 字符，每关均重新读取服务器存档。');
 checks++;
}finally{await new Promise(resolve=>network.close(resolve));}

const oldAdmin=env.ADMIN_KEY;env.ADMIN_KEY='rotated-test-admin';
const oldResponse=await handleApi(new Request('https://local.test/api/admin/check',{method:'POST',headers:{'x-admin-key':oldAdmin}}),env);
assert.equal(oldResponse.status,401);
assert.equal((await api('admin/check',{},true)).status,200);
const oldUpload=env.UPLOAD_CODE;env.UPLOAD_CODE='rotated-test-upload';
assert.equal((await handleApi(new Request('https://local.test/api/upload',{method:'POST',headers:{'x-upload-code':oldUpload},body:'bad'}),env)).status,401);
assert.equal(database.prepare("SELECT COUNT(*) AS n FROM settings WHERE key IN ('ADMIN_KEY','UPLOAD_CODE')").get().n,0);
assert.ok(database.prepare('PRAGMA index_list(submissions)').all().some(index=>index.name==='submissions_status_slot'));checks++;


const {zipSync,strToU8}=await import('fflate');
const form=new FormData();
for(const [key,value]of Object.entries({team:'存储回归',world:'停摆医院',title:'上传回归',description:'存储验证',exitHook:'平台存储出口',entry:'index.html'}))form.set(key,value);
form.set('file',new File([zipSync({'game/index.html':strToU8('<!doctype html><html><head></head><body><script>WL.readSave(); function finish(){WL.completeLevel({},{},{});}</script></body></html>')})],'test.zip',{type:'application/zip'}));
const uploadResponse=await handleApi(new Request('https://local.test/api/upload',{method:'POST',headers:{'x-admin-key':env.ADMIN_KEY},body:form}),env);
assert.equal(uploadResponse.status,201);
const uploaded=await uploadResponse.json();
assert.ok(objects.has('games/'+uploaded.id+'/index.html'));
const preview=await api('admin/preview',{id:uploaded.id},true);
const previewResponse=await handleGame(new Request('https://local.test'+preview.data.url),env);
assert.equal(previewResponse.status,200);
assert.ok((await previewResponse.text()).includes('bridgeRuntime'));checks++;

const health=await api('admin/health',{},true);
assert.equal(health.status,200);assert.equal(health.data.probeRemoved,true);
assert.ok([...objects.keys()].every(key=>!key.startsWith('games/_health/')));checks++;
globalThis.__alignmentPortal={routeById};
let workerSource=fs.readFileSync('worker/index.ts','utf8')
 .replace("import {routeById} from '../lib/portal';","const {routeById}=globalThis.__alignmentPortal;")
 .replace('import handler from "vinext/server/fetch-handler";','const handler={fetch:()=>new Response("rendered")};')
 .replace('import { runWithConnectorBinding } from "../lib/connector-context";','const runWithConnectorBinding=(binding,fn)=>fn();')
 .replace('import.meta.env.DEV','false');
const workerCode=ts.transpileModule(workerSource,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {default:worker}=await import('data:text/javascript;base64,'+Buffer.from(workerCode).toString('base64'));
const alias=await worker.fetch(new Request('https://local.test/run/infinite-world'),env,{props:{}});
assert.equal(alias.status,302);
assert.equal(new URL(alias.headers.get('location')).pathname,'/run/'+previousRoute);
assert.equal((await worker.fetch(new Request('https://local.test/run/'+previousRoute),env,{props:{}})).status,200);checks++;

database.prepare("UPDATE submissions SET status='rejected'").run();
database.prepare("DELETE FROM settings WHERE key='active_route'").run();
assert.equal((await api('routes/infinite-world')).status,409);
assert.equal((await worker.fetch(new Request('https://local.test/run/infinite-world'),env,{props:{}})).status,409);checks++;
console.log(checks+' 项平台清单回归通过，包括完整迁移、首关防伪、B轨钩子、道具裁剪、重复交接、失败墓碑、结果幂等和25关短链接。');
