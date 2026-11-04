export const progressKey=id=>'iw-progress:'+id;
export function readProgress(storage,id){try{const v=JSON.parse(storage.getItem(progressKey(id))||'null');return v&&typeof v.runId==='string'&&typeof v.search==='string'?v:null;}catch{return null;}}
export function clearRouteProgress(storage,id){const prefix='iw-game:'+id+':';const keys=[];for(let i=0;i<storage.length;i++){const k=storage.key(i);if(k?.startsWith(prefix))keys.push(k);}keys.forEach(k=>storage.removeItem(k));storage.removeItem(progressKey(id));}
export function saveProgress(storage,id,value){const current=readProgress(storage,id);if(current&&current.runId!==value.runId)return false;storage.setItem(progressKey(id),JSON.stringify({...value,updatedAt:new Date().toISOString()}));return true;}
