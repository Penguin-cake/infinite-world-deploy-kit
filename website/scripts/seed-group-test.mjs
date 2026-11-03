import fs from 'node:fs';import assert from 'node:assert/strict';import {zipSync,strToU8} from 'fflate';
const base=process.argv[2]||'http://127.0.0.1:4180';if(!['127.0.0.1','localhost'].includes(new URL(base).hostname))throw Error('Local synthetic fixtures only.');
const vars=Object.fromEntries(fs.readFileSync('.dev.vars','utf8').split(/\r?\n/).filter(Boolean).map(s=>{const i=s.indexOf('=');return[s.slice(0,i),s.slice(i+1)]}));
async function api(path,init={},auth=true){const headers=new Headers(init.headers);if(auth)headers.set('x-admin-key',vars.ADMIN_KEY);const r=await fetch(base+'/api/'+path,{...init,headers});return {status:r.status,data:await r.json()};}
const post=(p,body,auth=true)=>api(p,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)},auth);
const fixture={routes:{},games:{},base};const protocol=fs.readFileSync('../../shared/save-protocol.js');
for(const lane of ['A','B','C']){
 const html=`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>隔离验收 ${lane}</title></head><body><h1>audit-${lane}</h1><p id="state"></p><button id="add">拾取 ${lane} 遗物</button><button id="finish">完成 ${lane} 世界</button><script src="shared/save-protocol.js"></script><script>var CONFIG={level:1,world:'audit-${lane}',prevWorld:'主神大厅',nextWorld:'终局结算',nextUrl:'done.html',passViaUrl:true};var save=WL.readSave(1);function render(){document.getElementById('state').textContent=JSON.stringify({items:save.items,clues:save.clues,marker:localStorage.getItem('audit-marker')});}document.getElementById('add').onclick=function(){WL.addItem(save,{id:'audit-${lane}',name:'${lane}遗物',type:'tool'});WL.addClue(save,'${lane}线索');localStorage.setItem('audit-marker','${lane}-picked');localStorage.setItem('audit-save',JSON.stringify(save));render();};try{var cached=localStorage.getItem('audit-save');if(cached)save=JSON.parse(cached);}catch(e){}document.getElementById('finish').onclick=function(){WL.completeLevel(CONFIG,save,{exitHook:'${lane}完成',nextUrl:CONFIG.nextUrl});};render();</script></body></html>`;
 const form=new FormData();for(const [k,v]of Object.entries({team:'本机审计测试队',title:'隔离验收'+lane,world:'audit-'+lane,description:'本机回归用合成作品，不发布到生产。',exitHook:lane+'完成',entry:'index.html'}))form.set(k,v);form.set('file',new File([zipSync({'index.html':strToU8(html),'shared/save-protocol.js':protocol})],lane+'.zip',{type:'application/zip'}));
 const upload=await api('upload',{method:'POST',body:form});assert.equal(upload.status,201);fixture.games[lane]=upload.data.id;
 assert.equal((await post('admin/review',{id:upload.data.id,status:'approved'})).status,200);
 const route=await post('admin/publish',{title:'审计测试线 '+lane,ids:[upload.data.id]});assert.equal(route.status,201);fixture.routes[lane]=route.data.id;
}
assert.equal((await post('admin/publish-group',{title:'invalid',routes:{A:fixture.routes.A,B:fixture.routes.A,C:fixture.routes.C}})).status,400);
assert.equal((await post('admin/publish-group',{title:'unauthorized',routes:fixture.routes},false)).status,401);
const group=await post('admin/publish-group',{title:'本机审计 A/B/C 组',routes:fixture.routes});assert.equal(group.status,201);fixture.groupId=group.data.id;fixture.groupUrl=base+'/groups/'+group.data.id;
assert.equal((await api('admin/group-results/'+group.data.id,{},false)).status,401);assert.equal((await api('admin/group-results/'+group.data.id)).status,200);
assert.equal((await post('results',{groupId:group.data.id,routeId:'invalid',runId:'invalid-run-123',save:{schema:'v2'},history:[]},false)).status,400);
fs.mkdirSync('.sites-runtime',{recursive:true});fs.writeFileSync('.sites-runtime/group-fixture.json',JSON.stringify(fixture,null,2));console.log(JSON.stringify(fixture));
