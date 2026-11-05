'use client';
import {useEffect,useState} from 'react';

export function RouteSettings({games,adminKey,onChanged}:{games:any[];adminKey:string;onChanged:()=>void}){
 const [rows,setRows]=useState<any[]>([]);
 const [player,setPlayer]=useState({hp:3,max_hp:3,sanity:2,curses:''});
 const [notice,setNotice]=useState(''),[busy,setBusy]=useState(false);
 useEffect(()=>{
  setRows(games.filter(game=>game.status==='approved').map((game,index)=>({...game,slot:game.slot??index})));
 },[games]);
 useEffect(()=>{
  let live=true;
  fetch('/api/routes/infinite-world').then(r=>r.json()).then((data:any)=>{
   const p=data.initial_save?.player;
   if(live&&p)setPlayer({hp:p.hp,max_hp:p.max_hp,sanity:p.sanity,curses:(p.curses||[]).join('\n')});
  }).catch(()=>{});
  return()=>{live=false;};
 },[]);
 async function save(event:React.FormEvent){
  event.preventDefault();setBusy(true);setNotice('');
  try{
   const response=await fetch('/api/admin/configure',{method:'POST',headers:{'Content-Type':'application/json','x-admin-key':adminKey},
    body:JSON.stringify({stages:rows.map(row=>({id:row.id,slot:Number(row.slot),exitHook:row.exitHook})),
     initial_save:{player:{hp:player.hp,max_hp:player.max_hp,sanity:player.sanity,curses:player.curses.split('\n').map(x=>x.trim()).filter(Boolean)}}})});
   const result=await response.json() as any;
   if(!response.ok)throw Error(result.error);
   setNotice('世界线已更新，新旅程使用本次配置。');onChanged();
  }catch(error){setNotice((error as Error).message);}finally{setBusy(false);}
 }
 return <form onSubmit={save} className="upload-form">
  <h2>无限世界 · 出场配置</h2><p>验收后自动接线。关序从小到大排列，尚未配置的新作品排在末尾。</p>
  <div className="form-grid">
   <label>初始生命<input type="number" min="0" max={player.max_hp} value={player.hp} onChange={e=>setPlayer({...player,hp:Number(e.target.value)})}/></label>
   <label>生命上限<input type="number" min="1" max="10" value={player.max_hp} onChange={e=>setPlayer({...player,max_hp:Number(e.target.value)})}/></label>
   <label>初始理智<input type="number" min="0" max="99" value={player.sanity} onChange={e=>setPlayer({...player,sanity:Number(e.target.value)})}/></label>
   <label>初始诅咒（最多 8 项，每行一项）<textarea rows={2} value={player.curses} onChange={e=>setPlayer({...player,curses:e.target.value})}/></label>
  </div>
  {rows.map((row,index)=><div key={row.id} className="form-grid">
   <label>{row.world} · 关序<input required type="number" min="0" max="10000" value={row.slot} onChange={e=>setRows(rows.map((v,i)=>i===index?{...v,slot:e.target.value}:v))}/></label>
   <label>平台出口钩子<textarea required rows={2} maxLength={400} value={row.exitHook} onChange={e=>setRows(rows.map((v,i)=>i===index?{...v,exitHook:e.target.value}:v))}/></label>
  </div>)}
  <button className="button outline" disabled={busy||!rows.length}>{busy?'正在保存…':'保存并更新世界线'}</button><p role="status">{notice}</p>
 </form>;
}
