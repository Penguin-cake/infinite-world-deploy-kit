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
const env={DB,BUCKET:{get:async()=>null},ADMIN_KEY:'local-admin-test',UPLOAD_CODE:'local-upload-test'};
const source=fs.readFileSync('lib/portal.ts','utf8').replace(/from '(\.\/[^']+)'/g,(_,reference)=>{
 const file=resolve('lib',reference);
 return "from '"+pathToFileURL(fs.existsSync(file)?file:file+'.ts').href+"'";
});
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {handleApi,handleGame}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
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
database.prepare("UPDATE submissions SET status='rejected'").run();
database.prepare("DELETE FROM settings WHERE key='active_route'").run();
assert.equal((await api('routes/infinite-world')).status,409);checks++;
console.log(checks+' 项平台清单回归通过，包括完整迁移、首关防伪、B轨钩子、道具裁剪、重复交接、失败墓碑、结果幂等和25关短链接。');
