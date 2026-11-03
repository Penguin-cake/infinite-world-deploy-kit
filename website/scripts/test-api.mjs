// Run against local preview only. It creates one synthetic rejected submission.
import fs from 'node:fs';import assert from 'node:assert/strict';import {zipSync,strToU8} from 'fflate';
const base=process.argv[2]||'http://127.0.0.1:4180';if(!['127.0.0.1','localhost'].includes(new URL(base).hostname))throw Error('Synthetic checks are local only.');
const vars=Object.fromEntries(fs.readFileSync('.dev.vars','utf8').split(/\r?\n/).filter(Boolean).map(s=>{const i=s.indexOf('=');return[s.slice(0,i),s.slice(i+1)]}));let passed=0;
async function test(name,fn){await fn();console.log('通过：'+name);passed++;}
async function req(path,options={},kind='none'){const headers=new Headers(options.headers);if(kind==='admin')headers.set('x-admin-key',vars.ADMIN_KEY);if(kind==='team')headers.set('x-upload-code',vars.UPLOAD_CODE);const r=await fetch(base+'/api/'+path,{...options,headers});return {status:r.status,data:await r.json()};}
const post=(path,body,kind='admin')=>req(path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)},kind);
const form=(files)=>{const f=new FormData();for(const [k,v]of Object.entries({team:'自动验收测试队',title:'权限与隔离回归样例',world:'测试世界',description:'仅用于本机验证，非正式作品。',exitHook:'测试结束。',entry:'index.html'}))f.set(k,v);f.set('file',new File([zipSync(files)],'test.zip',{type:'application/zip'}));return f;};
await test('没有管理口令不能审核、发布、生成待验收试玩链接',async()=>{for(const p of ['admin/check','admin/review','admin/publish','admin/preview'])assert.equal((await post(p,{},'none')).status,401);});
await test('无上传邀请码不能投稿',async()=>assert.equal((await req('upload',{method:'POST',body:form({'index.html':strToU8('<html></html>')})})).status,401));
await test('拒绝跨站写入，即使携带管理凭据',async()=>assert.equal((await req('admin/check',{method:'POST',headers:{Origin:'https://another.example'}},'admin')).status,403));
let id;
await test('选手邀请码可上传，作品真实保存为待验收',async()=>{const r=await req('upload',{method:'POST',body:form({'index.html':strToU8('<html><body>test</body></html>')})},'team');assert.equal(r.status,201);assert.equal(r.data.status,'pending');assert.equal(r.data.hasRelay,false);id=r.data.id;});
await test('公众列表看不到待验收作品，管理员能看到',async()=>{assert.ok(!(await req('state')).data.games.some(g=>g.id===id));assert.ok((await req('state',{},'admin')).data.games.some(g=>g.id===id));});
await test('缺少接力接口不能直接通过验收',async()=>assert.equal((await post('admin/review',{id,status:'approved'})).status,400));
await test('主办方可试玩待验收作品，签名错误会被拒绝',async()=>{const r=await post('admin/preview',{id});assert.equal(r.status,200);const html=await fetch(base+r.data.url);assert.equal(html.status,200);assert.match(await html.text(),/iw-storage/);assert.match(html.headers.get('content-security-policy'),/sandbox allow-scripts/);const wrong=new URL(r.data.url,base);wrong.pathname=wrong.pathname.replace(/\d+-[a-f0-9]{64}/,'0-bad');assert.equal((await fetch(wrong)).status,403);});
await test('路径穿越压缩包被拒绝，不新增记录',async()=>{const before=(await req('state',{},'admin')).data.games.length;assert.equal((await req('upload',{method:'POST',body:form({'../index.html':strToU8('bad')})},'team')).status,400);assert.equal((await req('state',{},'admin')).data.games.length,before);});
await test('未通过的作品与重复关卡不能进入路线',async()=>{assert.equal((await post('admin/publish',{title:'bad',ids:[id]})).status,400);assert.equal((await post('admin/publish',{title:'bad',ids:[id,id]})).status,400);});
await test('正式路线、游戏HTML和素材可从云端存储读取',async()=>{const state=(await req('state')).data,route=state.routes.find(r=>r.stages.length===2&&r.stages[0].world==='废土集市');assert.equal(route.stages.length,2);const g=route.stages[0],path='/play/'+route.id+'/0/'+g.entry_path;const html=await fetch(base+path);assert.equal(html.status,200);assert.match(await html.text(),/主办方|readSave/);const css=await fetch(base+path.replace(/index\.html$/,'style.css'));assert.equal(css.status,200);assert.match(css.headers.get('content-type'),/text\/css/);});
await test('退回操作不影响已发布世界线快照',async()=>{const before=(await req('state')).data.activeRoute;assert.equal((await post('admin/review',{id,status:'rejected',note:'本机自动验收已完成。'})).status,200);assert.equal((await req('state')).data.activeRoute,before);});
console.log(passed+' 项本机云服务接口检查通过。');



