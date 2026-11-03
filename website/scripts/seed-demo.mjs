// Seeds uploaded files through the same authenticated API as the user interface.
// Remote Sites access is accepted only on hidden stdin, never in command arguments.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {zipSync} from 'fflate';
const project=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const repository=path.resolve(project,'../..');
const localVars=Object.fromEntries(fs.readFileSync(path.join(project,'.dev.vars'),'utf8').split(/\r?\n/).filter(Boolean).map(line=>{const n=line.indexOf('=');return[line.slice(0,n),line.slice(n+1)];}));
const base=process.argv[2]||'http://127.0.0.1:4180';
let token='';
if(!new URL(base).hostname.match(/^(localhost|127\.0\.0\.1)$/)){
 const raw=await new Promise((resolve,reject)=>{let value='';if(process.stdin.isTTY){process.stdin.setRawMode(true);process.stderr.write('Ready for seed access JSON on stdin (input is hidden).\n');}const done=()=>{process.stdin.removeListener('data',data);process.stdin.pause();if(process.stdin.isTTY)process.stdin.setRawMode(false);resolve(value);};const data=chunk=>{value+=chunk;if(value.includes('\u0003'))reject(Error('Cancelled'));else if(/[\r\n]/.test(value))done();};process.stdin.setEncoding('utf8');process.stdin.on('data',data);process.stdin.once('end',done);process.stdin.resume();});
 token=JSON.parse(String(raw)).bearer||'';
}
async function api(endpoint,init={}){const headers=new Headers(init.headers);headers.set('x-admin-key',localVars.ADMIN_KEY);if(token)headers.set('OAI-Sites-Authorization','Bearer '+token);const response=await fetch(new URL('/api/'+endpoint,base),{...init,headers,redirect:'error'});let data;try{data=await response.json();}catch{throw Error('API did not return JSON ('+response.status+')');}if(!response.ok)throw Error(data.error||'API failed '+response.status);return data;}
let state=await api('state');const ids=[];
const examples=[
 {folder:'wasteland-market',world:'废土集市',title:'余烬之约',description:'在锈风集市拾荒、以物易物、修好电台。你留下的净水，会成为别人的明天。',exitHook:'电台忽然传出一段戏腔，三声锣响压过集市的风。信号提灯泛起青光，照出一道朱门。你推门而入，红灯笼下坐满了没有影子的看客——幽冥戏班，今夜等你替班。'},
 {folder:'ghost-opera',world:'幽冥戏班',title:'子夜折子',description:'循戏本、正脸谱、鸣送魂。唱完一折给亡者的戏，才有你自己的归途。',exitHook:'最后一声锣落下，戏魂各自归去。你提着青灯穿过幕后之门，终于走回主神大厅，带着这一路的遗物和故事。'}
];
for(const game of examples){let record=state.games.find(g=>g.team==='主办方示例队'&&g.world===game.world&&g.title===game.title);if(!record){const files={};for(const name of ['index.html','style.css','game.js','model.js','renderer.js'])files[game.folder+'/'+name]=new Uint8Array(fs.readFileSync(path.join(repository,game.folder,name)));files['shared/save-protocol.js']=new Uint8Array(fs.readFileSync(path.join(repository,'shared/save-protocol.js')));const zip=zipSync(files,{level:6}),form=new FormData();for(const [key,value]of Object.entries({...game,team:'主办方示例队',entry:game.folder+'/index.html'}))if(key!=='folder')form.set(key,value);form.set('file',new File([zip],game.folder+'.zip',{type:'application/zip'}));record=await api('upload',{method:'POST',body:form});console.log('Uploaded example: '+game.world);}if(record.status!=='approved')await api('admin/review',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:record.id,status:'approved'})});ids.push(record.id);}
state=await api('state');let route=state.routes.find(r=>r.stages.length===ids.length&&r.stages.every((s,i)=>s.id===ids[i]));
if(!route)route=await api('admin/publish',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title:'初始世界线 · 余烬与归客',ids})});
console.log(JSON.stringify({seeded:true,gameCount:ids.length,routeId:route.id,playUrl:new URL('/run/'+route.id,base).href}));
