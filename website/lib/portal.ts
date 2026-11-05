import {initialSave,stageSave,gameConfig,advanceState} from './relay.mjs';
import {validateGroup,validateResult,groupById} from './route-groups.mjs';
import {inspectZip,validateMeta,PortalError,ZIP_LIMIT,UNPACKED_LIMIT,FILE_COUNT_LIMIT,cleanPath,mime,injectBridge,gameHeaders} from './portal-core.mjs';
import {officialProtocol} from './protocol';
import {exampleAssets} from './example-assets';
import {inlineGameAssets} from './inline-assets.mjs';
type Env={DB?:D1Database;BUCKET?:R2Bucket;ADMIN_KEY?:string;UPLOAD_CODE?:string};
type Game={id:string;team:string;title:string;world:string;entry_path:string;external_url?:string|null;slot?:number|null;description:string;exit_hook:string;byte_size:number;file_count:number;has_relay:number;status:string;review_note:string;created_at:string};
type Stage={id:string;title:string;team:string;world:string;entry_path:string;external_url?:string|null;exitHook:string};
const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const db=(env:Env)=>{if(!env.DB||!env.BUCKET)throw new PortalError('云端存储正在初始化，请稍后重试。',503);return env.DB;};
async function equal(a:string,b:string){if(!a||!b)return false;const dig=async(v:string)=>new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(v)));const [x,y]=await Promise.all([dig(a),dig(b)]);let n=0;for(let i=0;i<x.length;i++)n|=x[i]^y[i];return n===0;}
async function isAdmin(req:Request,env:Env){return equal(req.headers.get('x-admin-key')||'',env.ADMIN_KEY||'');}
async function admin(req:Request,env:Env){if(!await isAdmin(req,env))throw new PortalError('管理员口令不正确。',401);}
function sameOrigin(req:Request){const origin=req.headers.get('origin');if(origin&&origin!==new URL(req.url).origin)throw new PortalError('不接受来自其他页面的写入请求。',403);}
// Finish small unused bodies before responding; never drain an unbounded upload.
async function settleBody(req:Request){if(!req.body||req.bodyUsed)return;const reader=req.body.getReader();let bytes=0;try{while(bytes<=65536){const {done,value}=await reader.read();if(done)return;bytes+=value.byteLength;}await reader.cancel();}catch{}finally{reader.releaseLock();}}
async function boundedForm(req:Request){
 if(!req.body)throw new PortalError('上传内容为空。');
 const reader=req.body.getReader(),chunks:Uint8Array[]=[];let length=0;
 while(true){const {done,value}=await reader.read();if(done)break;length+=value.byteLength;if(length>ZIP_LIMIT+100000){await reader.cancel();throw new PortalError('ZIP 文件不得超过 50 MB。',413);}chunks.push(value);}
 const bytes=new Uint8Array(length);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}
 try{return await new Request(req.url,{method:'POST',headers:{'Content-Type':req.headers.get('content-type')||''},body:bytes}).formData();}catch{throw new PortalError('上传表单无法读取，请重新选择 ZIP 游戏包。');}
}
const dto=(g:Game)=>({id:g.id,team:g.team,title:g.title,world:g.world,entry:g.entry_path,externalUrl:g.external_url||null,description:g.description,exitHook:g.exit_hook,byteSize:g.byte_size,fileCount:g.file_count,hasRelay:!!g.has_relay,status:g.status,reviewNote:g.review_note,createdAt:g.created_at,slot:g.slot??null});
const previewContext=(g:Game)=>{const route={id:'preview-'+g.id,stages:[stageOf(g)]};return {...gameConfig(route,0,''),save:stageSave(initialSave(),route,0),history:[]};};
const stageOf=(g:Game,exitHook=g.exit_hook):Stage=>({id:g.id,title:g.title,team:g.team,world:g.world,entry_path:g.entry_path,external_url:g.external_url||null,exitHook});
function validExternalUrl(value:unknown){try{const u=new URL(String(value||''));if(u.protocol!=='https:'||u.username||u.password)throw new Error();return u.href;}catch{throw new PortalError('外部作品地址必须是有效的 HTTPS URL，且不能包含账号口令。');}}
async function automaticRoute(env:Env){
 const rows=await db(env).prepare("SELECT * FROM submissions WHERE status='approved' ORDER BY slot IS NULL,slot ASC,created_at ASC,id ASC LIMIT 200").all<Game>();
 const stages=rows.results.map(g=>stageOf(g));
 const configRow=await db(env).prepare("SELECT value FROM settings WHERE key='initial_save'").first<{value:string}>();
 const initial_save=initialSave(configRow?JSON.parse(configRow.value):{});
 const serial=JSON.stringify(stages),hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(serial+JSON.stringify(initial_save)))),v=>v.toString(16).padStart(2,'0')).join('');
 const id='infinite-'+hash.slice(0,24),created_at=new Date().toISOString();
 await db(env).prepare('INSERT OR IGNORE INTO routes(id,title,stages,created_at) VALUES(?,?,?,?)').bind(id,'无限世界',serial,created_at).run();
 await db(env).prepare('INSERT OR IGNORE INTO settings(key,value) VALUES(?,?)').bind('route:'+id+':initial_save',JSON.stringify(initial_save)).run();
 return {id,title:'无限世界',created_at,stages,initial_save};
}
export async function routeById(env:Env,id:string):Promise<any>{
 if(id==='infinite-world'){
  const active=await db(env).prepare("SELECT value FROM settings WHERE key='active_route'").first<{value:string}>();
  if(active)return routeById(env,active.value);
  return automaticRoute(env);
 }
 const row=await db(env).prepare('SELECT * FROM routes WHERE id=?').bind(id).first<any>();
 if(!row)throw new PortalError('这条世界线不存在。',404);
 const config=await db(env).prepare('SELECT value FROM settings WHERE key=?').bind('route:'+id+':initial_save').first<{value:string}>();
 return {...row,stages:JSON.parse(row.stages),initial_save:initialSave(config?JSON.parse(config.value):{})};
}
async function readRun(env:Env,runId:string){
 if(!/^[a-zA-Z0-9-]{20,80}$/.test(runId))throw new PortalError('旅程链接无效。',404);
 const row=await db(env).prepare('SELECT value FROM settings WHERE key=?').bind('run:'+runId).first<{value:string}>();
 if(!row)throw new PortalError('旅程记录不存在，请全新开始。',404);
 return {raw:row.value,state:JSON.parse(row.value)};
}
async function boundedJson(req:Request){
 if(!req.body)throw new PortalError('请求内容为空。');
 const reader=req.body.getReader();const chunks:Uint8Array[]=[];let size=0;
 while(true){const part=await reader.read();if(part.done)break;size+=part.value.length;
  if(size>120000){await reader.cancel();throw new PortalError('记录过大。',413);}chunks.push(part.value);
 }
 const buffer=new Uint8Array(size);let at=0;for(const c of chunks){buffer.set(c,at);at+=c.length;}
 try{return JSON.parse(new TextDecoder().decode(buffer));}catch{throw new PortalError('请求格式无效。');}
}
async function ticket(env:Env,id:string,exp:number){const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(env.ADMIN_KEY),{name:'HMAC',hash:'SHA-256'},false,['sign']);const sig=new Uint8Array(await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(id+'.'+exp)));return Array.from(sig,b=>b.toString(16).padStart(2,'0')).join('');}
async function validTicket(env:Env,id:string,value:string){const [expires,sig]=value.split('-');const exp=Number(expires);return !!exp&&exp>Date.now()&&exp<Date.now()+61*60*1000&&await equal(sig||'',await ticket(env,id,exp));}
export async function handleApi(req:Request,env:Env){try{
 const url=new URL(req.url),path=url.pathname.slice(5).split('/').filter(Boolean);db(env);if(req.method!=='GET')sameOrigin(req);
 if(path[0]==='state'&&req.method==='GET'){
  const privileged=await isAdmin(req,env),rows=await db(env).prepare(privileged?'SELECT * FROM submissions ORDER BY created_at DESC LIMIT 200':"SELECT * FROM submissions WHERE status = 'approved' ORDER BY created_at ASC LIMIT 200").all<Game>();
  const routes=await db(env).prepare('SELECT id,title,stages,created_at FROM routes ORDER BY created_at DESC LIMIT 200').all<{id:string;title:string;stages:string;created_at:string}>();
  const active=await db(env).prepare("SELECT value FROM settings WHERE key = 'active_route'").first<{value:string}>();
  const groupRows=await db(env).prepare("SELECT value FROM settings WHERE key LIKE 'group:%' ORDER BY json_extract(value, '$.createdAt') DESC LIMIT 100").all<{value:string}>();
  const activeGroup=await db(env).prepare("SELECT value FROM settings WHERE key='active_group'").first<{value:string}>();
  const current=active?await routeById(env,active.value):await automaticRoute(env);
  return json({groups:[],activeGroup:null,games:rows.results.map(dto),routes:[current],activeRoute:current.id,admin:privileged,limits:{zipMB:ZIP_LIMIT/1024/1024,files:FILE_COUNT_LIMIT,unpackedMB:UNPACKED_LIMIT/1024/1024}});
 }
 if(path[0]==='runs'){
  if(path.length===1&&req.method==='POST'){
   const body=await boundedJson(req),route=await routeById(env,String(body.routeId||''));
   if(!route.stages.length)throw new PortalError('世界线还没有可游玩的关卡。',409);
   const count=await db(env).prepare("SELECT COUNT(*) AS n FROM settings WHERE key LIKE 'run:%'").first<{n:number}>();
   if((count?.n||0)>=20000)throw new PortalError('本场旅程记录已满。',429);
   const runId=crypto.randomUUID(),state:any={runId,routeId:route.id,step:0,save:stageSave(route.initial_save,route,0),history:[],done:false,revision:0,enteredAt:Date.now()};
   if(body.legacy&&Number.isInteger(body.legacy.step)&&body.legacy.step>0&&body.legacy.step<route.stages.length){
    const legacy=body.legacy;
    state.step=legacy.step;
    state.save=stageSave(legacy.save,route,legacy.step);
    state.history=route.stages.slice(0,legacy.step).map((stage:any,index:number)=>({level:index+1,world:stage.world,hook:stage.exitHook}));
    (state as any).migrated=true;
   }
   await db(env).prepare('INSERT INTO settings(key,value) VALUES(?,?)').bind('run:'+runId,JSON.stringify(state)).run();
   return json(state,201);
  }
  const {state,raw}=await readRun(env,path[1]);
  if(req.method==='GET')return json(state);
  if(req.method==='POST'){
   const body=await boundedJson(req),route=await routeById(env,state.routeId);
   if(body.routeId!==state.routeId)throw new PortalError('旅程与世界线不符。',409);
   if(body.step!==state.step||body.revision!==state.revision||state.done)return json(state);
   if(!body.action&&body.failure!==true&&(!body.save||typeof body.save!=='object'))throw new PortalError('缺少通关存档。');
   if(!body.action&&body.failure!==true){
    const normalized=stageSave(body.save,route,state.step,{settle:false});
    if(normalized.player.hp>0&&normalized.player.status!=='dead'&&(!normalized.items.length||!normalized.clues.length))throw new PortalError('通关交接至少需要一件道具和一条线索。');
   }
   if(body.action&&body.action!=='heal')throw new PortalError('未知的救援操作。');
   const next=body.action==='heal'?{
    ...state,save:{...state.save,player:{...state.save.player,hp:state.save.player.max_hp,status:'normal'}},revision:state.revision+1
   }:advanceState(state,route,body);
   const updated=await db(env).prepare('UPDATE settings SET value=? WHERE key=? AND value=?').bind(JSON.stringify(next),'run:'+state.runId,raw).run();
   if(!updated.meta.changes)return json((await readRun(env,state.runId)).state);
   return json(next);
  }
 }
 if(path[0]==='groups'&&path[1]&&req.method==='GET')return json(await groupById(db(env),path[1]));
 if(path[0]==='results'&&req.method==='POST'){
  if(Number(req.headers.get('content-length')||0)>60000)throw new PortalError('记录过大。',413);
  const body=await boundedJson(req);
  const group=body.groupId?await groupById(db(env),body.groupId):{id:'single',lanes:[{...await routeById(env,body.routeId),label:'无限世界'}]};
  const result=validateResult(body,group);
  const key='result:'+group.id+':'+result.runId;
  if(await db(env).prepare('SELECT key FROM settings WHERE key=?').bind(key).first())return json({ok:true,source:'player-reported'});
  const count=await db(env).prepare("SELECT COUNT(*) AS n FROM settings WHERE key LIKE ?").bind('result:'+group.id+':%').first<{n:number}>();if((count?.n||0)>=2000)throw new PortalError('本场记录已满。',429);
  await db(env).prepare('INSERT OR IGNORE INTO settings(key,value) VALUES(?,?)').bind('result:'+group.id+':'+result.runId,JSON.stringify(result)).run();return json({ok:true,source:'player-reported'});
 }
 if(path[0]==='routes'&&path[1]&&req.method==='GET'){const r=await routeById(env,path[1]);if(!r.stages.length)throw new PortalError('世界线还没有可游玩的关卡。',409);return json({...r,createdAt:r.created_at});}
 if(path[0]==='demo'&&path[1]&&req.method==='GET'){const game=await db(env).prepare("SELECT * FROM submissions WHERE id=? AND status='approved'").bind(path[1]).first<Game>();if(!game)throw new PortalError('作品尚未上线。',404);const exp=Date.now()+30*60*1000;return json({url:game.external_url||'/preview/'+game.id+'/'+exp+'-'+await ticket(env,game.id,exp)+'/'+game.entry_path,context:previewContext(game)});}
 if(path[0]==='upload'&&req.method==='POST'){
  if(!await isAdmin(req,env)&&!await equal(req.headers.get('x-upload-code')||'',env.UPLOAD_CODE||''))throw new PortalError('请填写有效的选手上传邀请码。',401);
  if(Number(req.headers.get('content-length')||0)>ZIP_LIMIT+100000)throw new PortalError('ZIP 文件不得超过 50 MB。',413);
  const count=await db(env).prepare('SELECT COUNT(*) as n FROM submissions').first<{n:number}>();if((count?.n||0)>=200)throw new PortalError('本场已达到 200 份投稿上限，请联系主办方。',429);
  const form=await boundedForm(req),file=form.get('file'),mode=String(form.get('mode')||'zip');
  const meta=validateMeta(Object.fromEntries(['team','title','world','description','exitHook'].map(k=>[k,form.get(k)]))) as Record<string,string>;
  const id=crypto.randomUUID(),keys:string[]=[];
  if(mode==='url'){
   const externalUrl=validExternalUrl(form.get('externalUrl'));
   await db(env).prepare('INSERT INTO submissions (id,team,title,world,entry_path,external_url,description,exit_hook,byte_size,file_count,has_relay,status,review_note,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(id,meta.team,meta.title,meta.world,'index.html',externalUrl,meta.description,meta.exitHook,0,0,0,'pending','外链作品需人工确认接力协议与跨域嵌入。',new Date().toISOString()).run();
   return json({id,status:'pending',hasRelay:false,entry:externalUrl,fileCount:0,message:'外部作品地址已提交；主办方试玩确认后可强制验收。'},201);
  }
  if(!(file instanceof File))throw new PortalError('请选择 ZIP 游戏包。');if(file.size>ZIP_LIMIT)throw new PortalError('ZIP 文件不得超过 50 MB。',413);
  const pack=inspectZip(new Uint8Array(await file.arrayBuffer()),String(form.get('entry')||'index.html'));
  try{
   const entries=Object.entries(pack.files) as [string,Uint8Array][];let cursor=0;
   const puts=await Promise.allSettled(Array.from({length:Math.min(4,entries.length)},async()=>{while(cursor<entries.length){const [name,bytes]=entries[cursor++];const key='games/'+id+'/'+name;keys.push(key);await env.BUCKET!.put(key,bytes,{httpMetadata:{contentType:mime(name)}});}}));
   const failed=puts.find(r=>r.status==='rejected');if(failed?.status==='rejected')throw failed.reason;
   await db(env).prepare('INSERT INTO submissions (id,team,title,world,entry_path,external_url,description,exit_hook,byte_size,file_count,has_relay,status,review_note,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(id,meta.team,meta.title,meta.world,pack.entry,null,meta.description,meta.exitHook,file.size,pack.fileCount,pack.hasRelay?1:0,'pending',pack.hasRelay?'':'未自动检测到接力接口，可人工试玩后强制验收。',new Date().toISOString()).run();
  }catch(e){if(keys.length)await env.BUCKET!.delete(keys).catch(()=>{});throw e;}
  return json({id,status:'pending',hasRelay:pack.hasRelay,entry:pack.entry,fileCount:pack.fileCount,message:pack.hasRelay?'上传成功，作品已进入主办方验收队列。':'上传成功；接口检测仅作提醒，主办方可人工试玩后强制验收。'},201);
 }
 if(path[0]==='admin'){
  await admin(req,env);
  if(path[1]==='publish-group'&&req.method==='POST'){
   const body=await req.json() as any;if(!body.routes||Object.keys(body.routes).sort().join('')!=='ABC')throw new PortalError('请设置 A、B、C 路线。');
   const routes:any={};for(const label of ['A','B','C'])routes[label]=await routeById(env,String(body.routes[label]));
   const group={...validateGroup(body.title,routes),id:crypto.randomUUID(),createdAt:new Date().toISOString()};
   await db(env).batch([db(env).prepare('INSERT INTO settings(key,value) VALUES(?,?)').bind('group:'+group.id,JSON.stringify(group)),db(env).prepare("INSERT INTO settings(key,value) VALUES('active_group',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").bind(group.id)]);return json(group,201);
  }
  if(path[1]==='group-results'&&path[2]&&req.method==='GET'){
   const group=await groupById(db(env),path[2]);const rows=await db(env).prepare('SELECT value FROM settings WHERE key LIKE ? ORDER BY key LIMIT 2000').bind('result:'+group.id+':%').all<{value:string}>();return json({group,results:rows.results.map(r=>JSON.parse(r.value)),source:'player-reported',notice:'玩家提交的终局记录，需人工复核，不作为防作弊凭据。'});
  }
  if(path[1]==='health'&&req.method==='POST'){
   const schema=await db(env).prepare('SELECT slot FROM submissions LIMIT 1').all();
   const probe=crypto.randomUUID(),key='games/_health/'+probe+'.txt';
   try{
    await env.BUCKET!.put(key,probe,{httpMetadata:{contentType:'text/plain'}});
    const object=await env.BUCKET!.get(key);
    if(!object||await object.text()!==probe)throw new PortalError('对象存储读写检查失败。',503);
   }finally{await env.BUCKET!.delete(key);}
   return json({ok:true,database:true,slotMigration:true,objectStorage:true,probeRemoved:true});
  }
  if(path[1]==='route-snapshots'&&req.method==='GET'){
   const rows=await db(env).prepare('SELECT id,title,created_at FROM routes ORDER BY created_at DESC LIMIT 200').all();
   const active=await db(env).prepare("SELECT value FROM settings WHERE key='active_route'").first<{value:string}>();
   return json({routes:rows.results,activeRoute:active?.value||null});
  }
  if(path[1]==='activate-route'&&req.method==='POST'){
   const body=await boundedJson(req);
   if(body.id==='infinite-world')throw new PortalError('请选择一个已保存的正式快照。');
   const route=await routeById(env,String(body.id||''));
   if(!route.stages.length)throw new PortalError('不能启用空路线。',409);
   await db(env).prepare("INSERT INTO settings(key,value) VALUES('active_route',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").bind(route.id).run();
   return json({id:route.id,url:'/run/'+route.id});
  }
  if(path[1]==='configure'&&req.method==='POST'){
   const body=await boundedJson(req);
   if(!Array.isArray(body.stages)||!body.stages.length||body.stages.length>200)throw new PortalError('请配置至少一个已验收关卡。');
   const ids=new Set<string>();const statements:D1PreparedStatement[]=[];
   for(const stage of body.stages){
    const slot=Number(stage.slot),hook=String(stage.exitHook||'').trim();
    if(ids.has(stage.id)||!Number.isInteger(slot)||slot<0||slot>10000||!hook||hook.length>400)throw new PortalError('关序必须为非负整数，每关需填写不超过 400 字的出口钩子。');
    ids.add(stage.id);
    if(!await db(env).prepare("SELECT id FROM submissions WHERE id=? AND status='approved'").bind(stage.id).first())throw new PortalError('只能配置已验收关卡。');
    statements.push(db(env).prepare('UPDATE submissions SET slot=?,exit_hook=? WHERE id=?').bind(slot,hook,stage.id));
   }
   statements.push(db(env).prepare("INSERT INTO settings(key,value) VALUES('initial_save',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").bind(JSON.stringify(initialSave(body.initial_save||{}))));
   statements.push(db(env).prepare("DELETE FROM settings WHERE key='active_route'"));
   await db(env).batch(statements);
   const route=await automaticRoute(env);
   await db(env).prepare("INSERT INTO settings(key,value) VALUES('active_route',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").bind(route.id).run();
   return json({id:route.id,url:'/run/'+route.id});
  }
  if(path[1]==='check'){await settleBody(req);return json({ok:true});}
  if(path[1]==='invitation'&&req.method==='GET')return json({code:env.UPLOAD_CODE||''});
  if(path[1]==='review'&&req.method==='POST'){
   const body=await req.json() as {id:string;status:string;note?:string;force?:boolean};if(!['approved','rejected'].includes(body.status))throw new PortalError('无效的验收结果。');
   const game=await db(env).prepare('SELECT * FROM submissions WHERE id=?').bind(body.id).first<Game>();if(!game)throw new PortalError('作品不存在。',404);
   if(body.status==='approved'&&!game.has_relay&&body.force!==true)throw new PortalError('未自动检测到接力接口。请人工试玩确认后使用强制验收。');
   await db(env).batch([db(env).prepare('UPDATE submissions SET status=?,review_note=? WHERE id=?').bind(body.status,String(body.note||'').slice(0,300),body.id),db(env).prepare("DELETE FROM settings WHERE key='active_route'")]);return json({ok:true});
  }
  if(path[1]==='preview'&&req.method==='POST'){
   const {id}=await req.json() as {id:string};const game=await db(env).prepare('SELECT * FROM submissions WHERE id=?').bind(id).first<Game>();if(!game)throw new PortalError('作品不存在。',404);const exp=Date.now()+30*60*1000,token=exp+'-'+await ticket(env,id,exp);return json({url:game.external_url||'/preview/'+id+'/'+token+'/'+game.entry_path,context:previewContext(game)});
  }
  if(path[1]==='publish'&&req.method==='POST'){
   const body=await req.json() as {title:string;ids:string[];hooks?:Record<string,string>;initial_save?:any};if(!Array.isArray(body.ids)||!body.ids.length||body.ids.length>38||new Set(body.ids).size!==body.ids.length)throw new PortalError('请选择 1–38 个不重复的已验收关卡。');
   const stages:Stage[]=[];for(const id of body.ids){const g=await db(env).prepare("SELECT * FROM submissions WHERE id=? AND status='approved'").bind(id).first<Game>();if(!g)throw new PortalError('路线中包含尚未通过验收的作品。');const hook=String(body.hooks?.[id]||g.exit_hook).trim();if(!hook||hook.length>400)throw new PortalError('每关需要一条不超过 400 字的出口钩子。');stages.push(stageOf(g,hook));}
   const title=String(body.title||'无限世界').trim().slice(0,60);
   const initial_save=initialSave(body.initial_save||{});
   const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify({stages,initial_save,title})));
   const id='infinite-'+Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('').slice(0,24);
   await db(env).batch([...body.ids.map((gameId,index)=>db(env).prepare('UPDATE submissions SET slot=? WHERE id=?').bind(index,gameId)),db(env).prepare('INSERT OR IGNORE INTO settings(key,value) VALUES(?,?)').bind('route:'+id+':initial_save',JSON.stringify(initial_save)),db(env).prepare('INSERT OR IGNORE INTO routes(id,title,stages,created_at) VALUES(?,?,?,?)').bind(id,title,JSON.stringify(stages),new Date().toISOString()),db(env).prepare("INSERT INTO settings(key,value) VALUES('active_route',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").bind(id)]);
   return json({id,url:'/run/'+id,title},201);
  }
 }
 throw new PortalError('未找到这个操作。',404);
}catch(e){await settleBody(req);if(e instanceof PortalError)return json({error:e.message},e.status);console.error('Portal API failed',e);return json({error:'云端操作未完成，请稍后重试。'},500);}}

export async function handleGame(req:Request,env:Env){try{
 const url=new URL(req.url),segments=url.pathname.split('/').filter(Boolean),preview=segments[0]==='preview';db(env);
 let stage:Stage,ctx:any,filePath:string;
 if(preview){const [,id,token,...rest]=segments;if(!await validTicket(env,id,token))throw new PortalError('试玩链接已过期，请从控制台重新打开。',403);const g=await db(env).prepare('SELECT * FROM submissions WHERE id=?').bind(id).first<Game>();if(!g)throw new PortalError('作品不存在。',404);stage=stageOf(g);filePath=rest.join('/')||g.entry_path;ctx={routeId:'preview-'+id,slot:0,gameId:id,world:g.world,prevWorld:'主神大厅',nextWorld:'试玩结束',exitHook:g.exit_hook,nextUrl:'/preview/'+id+'/'+token+'/__finish.html'};
 }else{
  const [,routeId,slotText,...rest]=segments;const route=await routeById(env,routeId);if(!route.stages.length)throw new PortalError('世界线还没有可游玩的关卡。',409);
  if(slotText==='shared'&&rest.join('/')==='save-protocol.js')return new Response(officialProtocol,{headers:gameHeaders('application/javascript; charset=utf-8')});
  const slot=Number(slotText);if(!/^\d+$/.test(slotText)||slot<0||slot>route.stages.length)throw new PortalError('关卡位置无效。',404);
  if(slot===route.stages.length)return finishPage();
  stage=route.stages[slot];filePath=rest.join('/')||stage.entry_path;
  if(stage.external_url){const target=new URL(stage.external_url);url.searchParams.forEach((value,key)=>target.searchParams.set(key,value));return Response.redirect(target.href,302);}
  ctx={routeId,slot,gameId:stage.id,world:stage.world,prevWorld:slot?route.stages[slot-1].world:'主神大厅',nextWorld:route.stages[slot+1]?.world||'终局结算',exitHook:stage.exitHook,nextUrl:route.stages[slot+1]?(route.stages[slot+1].external_url||'/play/'+routeId+'/'+(slot+1)+'/'+route.stages[slot+1].entry_path):'/play/'+routeId+'/'+route.stages.length+'/__finish.html'};
 }
 if(preview){ctx.save=stageSave(initialSave(),{stages:[stage]},0);ctx.history=[];}
 if(filePath==='__finish.html')return finishPage();
 if(!preview&&ctx){
  const runId=url.searchParams.get('runId');
  if(runId){
   const {state}=await readRun(env,runId);
   if(state.routeId!==ctx.routeId||state.step!==ctx.slot||state.done)throw new PortalError('本关已交接，请返回旅程页面继续。',409);
   ctx.save=state.save;ctx.history=state.history;
  }else{
   for(const name of ['save','history'])if((url.searchParams.get(name)||'').length>20000)throw new PortalError('存档参数过长，请从旅程入口重新进入。',413);
   let raw:any={};
   if(ctx.slot>0&&url.searchParams.has('save')){
    try{raw=JSON.parse(decodeURIComponent(escape(atob(url.searchParams.get('save')!))));}catch{throw new PortalError('存档格式无效。');}
   }
   const route=await routeById(env,ctx.routeId);
   ctx.save=stageSave(ctx.slot?raw:route.initial_save,route,ctx.slot);
   ctx.history=[];
  }
 }
 const path=cleanPath(decodeURIComponent(filePath));
 if(path==='shared/save-protocol.js')return new Response(officialProtocol,{headers:gameHeaders('application/javascript; charset=utf-8')});
 let object=await env.BUCKET!.get('games/'+stage.id+'/'+path);
 if(!object&&exampleAssets[stage.id]?.[path]!==undefined){const source=exampleAssets[stage.id][path];object={text:async()=>source,body:source,httpEtag:'"example-v1"'} as any;}
 if(!object&&path==='shared/save-protocol.js')return new Response(officialProtocol,{headers:gameHeaders('application/javascript; charset=utf-8')});
 if(!object)throw new PortalError('游戏资源不存在：'+path,404);
 const type=mime(path),html=/\.html?$/i.test(path);
 if(html){let storage:Record<string,string>={};try{const raw=url.searchParams.get('__iw_state');if(raw&&raw.length<=20000){const v=JSON.parse(raw);if(v&&typeof v==='object'&&!Array.isArray(v))for(const [k,val]of Object.entries(v))if(k.length<150&&typeof val==='string'&&val.length<16000)storage[k]=val;}}catch{}
  const prefix='/'+segments.slice(0,3).join('/')+'/';
  const source=await inlineGameAssets(await object.text(),async(reference:string)=>{
   try{const target=new URL(reference.replaceAll('&amp;','&'),url);if(target.origin!==url.origin||!target.pathname.startsWith(prefix))return null;
    const key=cleanPath(decodeURIComponent(target.pathname.slice(prefix.length)));if(key==='shared/save-protocol.js')return officialProtocol;
    const item=await env.BUCKET!.get('games/'+stage.id+'/'+key);if(item)return item.text();
    if(exampleAssets[stage.id]?.[key]!==undefined)return exampleAssets[stage.id][key];
    return key==='shared/save-protocol.js'?officialProtocol:null;
   }catch{return null;}
  });
  return new Response(injectBridge(source,ctx,storage),{headers:gameHeaders(type,true)});}
 return new Response(object.body,{headers:{...gameHeaders(type),ETag:object.httpEtag}});
}catch(e){return new Response(e instanceof PortalError?e.message:'游戏加载失败，请返回大厅重试。',{status:e instanceof PortalError?e.status:500,headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'no-store'}});}}
function finishPage(){return new Response(`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><style>body{margin:0;background:#17372d;color:#eee4c8;font:18px/2 system-ui;text-align:center;padding:15vh 20px}h1{font-size:35px}p{color:#b9c6aa}</style><h1>世界已相连，旅程已完成。</h1><p>你的道具与故事，都留在了这一段世界线里。</p><script>try{const q=new URLSearchParams(location.search);const decode=v=>JSON.parse(decodeURIComponent(escape(atob(v||''))));parent.postMessage({type:'iw-finished',save:decode(q.get('save')),history:decode(q.get('history'))},'*')}catch(e){}</script></html>`,{headers:gameHeaders('text/html; charset=utf-8',true)});}



