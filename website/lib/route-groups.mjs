import {PortalError} from './portal-core.mjs';
export function validateGroup(title,routes){
 if(!routes||Object.keys(routes).sort().join('')!=='ABC')throw new PortalError('请设置 A、B、C 三条世界线。');
 const lanes=['A','B','C'].map(label=>({label,...routes[label]}));
 if(lanes.some(r=>!r.id||!Array.isArray(r.stages)||!r.stages.length)||new Set(lanes.map(r=>r.id)).size!==3)throw new PortalError('三条路线必须不同且不能为空。');
 const ids=lanes.flatMap(r=>r.stages.map(s=>s.id));if(ids.length>38||new Set(ids).size!==ids.length)throw new PortalError('三线合计最多 38 关，同一作品不可重复分配。');
 return {title:String(title||'无限世界 · 三线赛事').trim().slice(0,60),lanes,routes:Object.fromEntries(lanes.map(r=>[r.label,r.id])),routeDetails:Object.fromEntries(lanes.map(r=>[r.label,r])),totalStages:ids.length};
}
export function validateResult(body,group){
 if(!body||typeof body!=='object')throw new PortalError('终局记录格式无效。');
 const lane=group.lanes.find(r=>r.id===body.routeId);if(!lane)throw new PortalError('路线不属于本场赛事。');
 if(!/^[a-zA-Z0-9-]{8,80}$/.test(body.runId||'')||body.save?.schema!=='v2'||!Array.isArray(body.history)||body.history.length!==lane.stages.length||JSON.stringify(body).length>60000)throw new PortalError('终局记录格式无效。');
 if(!Array.isArray(body.save.items)||body.save.items.length>100||!Array.isArray(body.save.clues)||body.save.clues.length>100||body.history.some((h,i)=>!h||typeof h!=='object'||h.world!==lane.stages[i].world))throw new PortalError('终局旅程与路线不符。');
 return {runId:body.runId,routeId:lane.id,lane:lane.label,save:body.save,history:body.history,source:'player-reported',createdAt:new Date().toISOString()};
}
export async function groupById(db,id){const row=await db.prepare('SELECT value FROM settings WHERE key=?').bind('group:'+id).first();if(!row)throw new PortalError('赛事组不存在。',404);return JSON.parse(row.value);}


