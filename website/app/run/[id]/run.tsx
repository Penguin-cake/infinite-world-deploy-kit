'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {ArrowLeft,ArrowRight,Copy,Flag,Globe2,CheckCircle2,Heart,RotateCcw,SkipForward,Volume2,Shield,X} from 'lucide-react';
import {VortexEntry} from '../../vortex-entry';
import {GameFrame} from '../../ui';
import {readProgress,clearRouteProgress,saveProgress} from '../../../lib/progress.mjs';

const decode=(s:string|null)=>s?JSON.parse(decodeURIComponent(escape(atob(s)))):null;
const encode=(v:unknown)=>btoa(unescape(encodeURIComponent(JSON.stringify(v))));
const bounded=(value:unknown,fallback:number,min:number,max:number)=>{const n=Number(value??fallback);return Number.isFinite(n)?Math.min(max,Math.max(min,Math.trunc(n))):fallback;};
const freshPlayer=()=>({hp:3,max_hp:3,sanity:2,level:1,status:'normal',curses:[]});
const defaultSave=(route:any,slot:number)=>({
 schema:'v3',level:slot+1,world:route.stages[slot].world,player:freshPlayer(),items:[],clues:[],exit_hook:'',
 prev_world:slot?route.stages[slot-1].world:'主神大厅',next_world:route.stages[slot+1]?.world||'终局结算',tombstone:{}
});
function normalizeSave(raw:any,route:any,slot:number){
 const base=defaultSave(route,slot),p=raw?.player||{},maxHp=bounded(p.max_hp,3,1,10);
 return {
  ...base,...(raw&&typeof raw==='object'?raw:{}),schema:'v3',level:slot+1,world:route.stages[slot].world,
  player:{...base.player,...p,max_hp:maxHp,hp:bounded(p.hp,Math.min(3,maxHp),0,maxHp),level:bounded(p.level,1,1,10),status:['normal','wounded','cursed','dead','specter'].includes(p.status)?p.status:'normal',curses:Array.isArray(p.curses)?p.curses.slice(0,8):[]},
  items:Array.isArray(raw?.items)?raw.items.filter(Boolean).slice(0,3):[],clues:Array.isArray(raw?.clues)?raw.clues.map(String).slice(-8):[],
  prev_world:slot?route.stages[slot-1].world:'主神大厅',next_world:route.stages[slot+1]?.world||'终局结算',
  tombstone:raw?.tombstone&&typeof raw.tombstone==='object'?raw.tombstone:{}
 };
}
function relicSave(raw:any,route:any,slot:number,reason:string){
 const current=normalizeSave(raw,route,slot),stage=route.stages[slot];
 let items=current.items.map((it:any)=>({...it,relic:true,name:('前人的'+String(it.name||'未知物品').replace(/^(前人的)+/,'')).slice(0,32)}));
 if(!items.length)items=[{id:'relic_survival_knife',name:'前人的求生短刀',type:'tool',relic:true}];
 const epitaph=(current.tombstone?.epitaph?current.tombstone.epitaph+' | ':'')+`[第${slot+1}关] ${reason}`;
 return {
  ...current,level:slot+2,player:freshPlayer(),items,clues:current.clues.length?current.clues:['前人倒在此处，留下了未解的谜题'],
  exit_hook:'【遗物交接】一代探索者在此长眠，新求生者拾起遗物踏入下一世界……',prev_world:stage.world,
  next_world:route.stages[slot+1]?.world||'终局结算',tombstone:{fallen_level:slot+1,cause:reason.slice(0,100),epitaph:epitaph.slice(0,200)}
 };
}
function gameUrl(routeId:string,route:any,slot:number,save:any,journey:any[],reload=0){
 const stage=route.stages[slot];
 const url=new URL(stage.external_url||'/play/'+routeId+'/'+slot+'/'+stage.entry_path,location.origin);
 url.searchParams.set('save',encode(save));url.searchParams.set('history',encode(journey));
 if(reload)url.searchParams.set('_reload',String(reload));
 return url.origin===location.origin?url.pathname+url.search:url.href;
}

export default function Run({id}:{id:string}){
 const [route,setRoute]=useState<any>(null),[error,setError]=useState(''),[step,setStep]=useState(0),[boot,setBoot]=useState<{url:string;gameId:string}|null>(null),[finish,setFinish]=useState<any>(null),[copied,setCopied]=useState(false);
 const [ready,setReady]=useState(false),[saved,setSaved]=useState<any>(null),[runId,setRunId]=useState(''),[group,setGroup]=useState(''),[resultNotice,setResultNotice]=useState('');
 const [rescueOpen,setRescueOpen]=useState(false),[rescueNotice,setRescueNotice]=useState(''),[timeLeft,setTimeLeft]=useState(180),[command,setCommand]=useState<{type:string;nonce:number}|undefined>();
 const stepRef=useRef(0),saveRef=useRef<any>(null),historyRef=useRef<any[]>([]),advanceLock=useRef<number|null>(null),finishedRef=useRef(false),advanceRef=useRef<(save:any,history:any[])=>void>(()=>{});
 const audioRef=useRef<AudioContext|null>(null),logoClicks=useRef({count:0,at:0});

 const unlockAudio=useCallback(()=>{
  try{
   const AudioContextClass=window.AudioContext||(window as any).webkitAudioContext;
   if(!AudioContextClass)return;
   if(!audioRef.current)audioRef.current=new AudioContextClass();
   if(audioRef.current.state==='suspended')void audioRef.current.resume();
  }catch{}
 },[]);
 useEffect(()=>{let live=true;fetch('/api/routes/'+id).then(async r=>{const data=await r.json() as any;if(!r.ok)throw Error(data.error);if(!live)return;if(id==='infinite-world'&&data.id!==id){location.replace('/run/'+data.id);return;}setRoute(data);const q=new URLSearchParams(location.search);setGroup(q.get('group')||'');const stored=readProgress(localStorage,id);setSaved(q.has('save')?{...(stored||{}),search:q.toString()}:stored);}).catch(e=>setError(e.message));return()=>{live=false;};},[id]);

 const finishJourney=useCallback((rawSave:any,journey:any[])=>{
  if(finishedRef.current||!route)return;
  finishedRef.current=true;
  const finalSave={...normalizeSave(rawSave,route,route.stages.length-1),level:route.stages.length+1,next_world:'终局结算'};
  const result={save:finalSave,history:journey};setFinish(result);setBoot(null);
  const end=new URLSearchParams({done:'1',save:encode(finalSave),history:encode(journey)});if(group)end.set('group',group);
  saveProgress(localStorage,id,{runId,search:end.toString(),finish:result});history.replaceState(null,'','/run/'+id+'?'+end);
  if(group)fetch('/api/results',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({groupId:group,routeId:id,runId,save:finalSave,history:journey})}).then(async r=>{if(!r.ok)throw Error();setResultNotice('本次通关记录已提交到赛事汇总。');}).catch(()=>setResultNotice('云端汇总提交未成功；本机通关记录已保留。'));
 },[route,group,id,runId]);

 const advance=useCallback((rawSave:any,journey:any[])=>{
  if(!route||finishedRef.current)return;
  const current=stepRef.current;if(advanceLock.current===current)return;advanceLock.current=current;
  if(current>=route.stages.length-1){finishJourney(rawSave,journey);return;}
  const next=current+1,nextSave=normalizeSave(rawSave,route,next),nextHistory=Array.isArray(journey)?journey:[];
  stepRef.current=next;saveRef.current=nextSave;historyRef.current=nextHistory;setStep(next);setTimeLeft(180);
  const q=new URLSearchParams(location.search);q.set('step',String(next));q.set('save',encode(nextSave));q.set('history',encode(nextHistory));q.delete('done');if(group)q.set('group',group);
  saveProgress(localStorage,id,{runId,search:q.toString()});history.replaceState(null,'','/run/'+id+'?'+q);
  setBoot({url:gameUrl(id,route,next,nextSave,nextHistory),gameId:route.stages[next].id});
 },[route,finishJourney,group,id,runId]);
 useEffect(()=>{advanceRef.current=advance;},[advance]);

 function begin(fresh:boolean){
  try{
   unlockAudio();const q=new URLSearchParams(fresh?'':saved?.search||''),groupId=group||q.get('group')||'';
   if(fresh)clearRouteProgress(localStorage,id);
   const currentRun=fresh||!saved?.runId?crypto.randomUUID():saved.runId;
   setRunId(currentRun);setGroup(groupId);setFinish(null);setBoot(null);setResultNotice('');setRescueNotice('');finishedRef.current=false;advanceLock.current=null;if(groupId)q.set('group',groupId);
   if(!fresh&&q.get('done')==='1'){
    const save=decode(q.get('save')),journey=decode(q.get('history'));
    if(!save||typeof save!=='object'||!Array.isArray(journey))throw Error('存档无效，请全新开始。');
    finishedRef.current=true;setFinish({save,history:journey});saveProgress(localStorage,id,{runId:currentRun,search:q.toString(),finish:{save,history:journey}});setReady(true);return;
   }
   const n=Number(q.get('step')||0),slot=Number.isInteger(n)&&n>=0&&n<route.stages.length?n:0;
   const journey=q.get('history')?decode(q.get('history')):[],currentSave=normalizeSave(q.get('save')?decode(q.get('save')):null,route,slot);
   if(!Array.isArray(journey))throw Error('旅程记录无效，请全新开始。');
   stepRef.current=slot;saveRef.current=currentSave;historyRef.current=journey;setStep(slot);setTimeLeft(180);
   q.set('step',String(slot));q.set('save',encode(currentSave));q.set('history',encode(journey));q.delete('done');
   saveProgress(localStorage,id,{runId:currentRun,search:q.toString()});history.replaceState(null,'','/run/'+id+'?'+q);
   setBoot({url:gameUrl(id,route,slot,currentSave,journey),gameId:route.stages[slot].id});setReady(true);
  }catch(e){setError((e as Error).message);}
 }

 const onMessage=useCallback((d:any)=>{
  if(!d||typeof d!=='object'||stepRef.current!==step||(d.routeId&&d.routeId!==id))return;
  if(d.type==='iw-enter'&&Number.isInteger(d.slot)&&d.slot>=0&&d.slot<(route?.stages.length||0)){
   if(d.slot===stepRef.current)return;
   stepRef.current=d.slot;setStep(d.slot);const q=new URLSearchParams(d.search||location.search);q.set('step',String(d.slot));if(group)q.set('group',group);
   if(saveProgress(localStorage,id,{runId,search:q.toString()}))history.replaceState(null,'','/run/'+id+'?'+q);return;
  }
  if(d.type==='iw-finished'){
   if(d.save&&Array.isArray(d.history))finishJourney(d.save,d.history);return;
  }
  if(d.type==='IW_FAIL'){
   const reason=String(d.reason||'探索者力竭倒地').slice(0,100),slot=stepRef.current;
   setRescueNotice('本关已按失败交接：遗物与墓碑将传给下一位探索者。');
   const failed=relicSave(d.fallenSave||saveRef.current,route,slot,reason);
   advanceRef.current(failed,historyRef.current);return;
  }
  if(d.type==='iw-save'||d.type==='IW_SAVE'||d.type==='IW_COMPLETE'){
   if(!d.save||typeof d.save!=='object')return;
   const journey=Array.isArray(d.history)?d.history:historyRef.current;
   const nextSave=d.failure===true?relicSave(d.fallenSave||d.save,route,stepRef.current,String(d.reason||'探索者力竭倒地').slice(0,100)):d.save;
   advanceRef.current(nextSave,journey);
  }
 },[id,route,group,runId,finishJourney,step]);

 useEffect(()=>{
  if(!ready||finish||!route)return;
  const deadline=Date.now()+180000;
  const timer=setInterval(()=>{
   const left=Math.max(0,Math.ceil((deadline-Date.now())/1000));setTimeLeft(left);
   if(left>0)return;
   clearInterval(timer);const slot=stepRef.current;
   setRescueNotice('180 秒看门狗已接管本关，正在执行遗物交接。');
   advanceRef.current(relicSave(saveRef.current,route,slot,'时空裂隙坍缩（演示超时）'),historyRef.current);
  },1000);
  return()=>clearInterval(timer);
 },[ready,finish,step,route]);

 useEffect(()=>{
  const listener=(event:KeyboardEvent)=>{if(event.key==='F8'||(event.ctrlKey&&event.altKey&&event.key.toLowerCase()==='k')){event.preventDefault();setRescueOpen(v=>!v);}};
  addEventListener('keydown',listener);return()=>removeEventListener('keydown',listener);
 },[]);

 function reloadCurrent(rawSave=saveRef.current){
  if(!route)return;const slot=stepRef.current,current=normalizeSave(rawSave,route,slot),journey=historyRef.current;
  saveRef.current=current;const q=new URLSearchParams(location.search);q.set('step',String(slot));q.set('save',encode(current));q.set('history',encode(journey));
  saveProgress(localStorage,id,{runId,search:q.toString()});history.replaceState(null,'','/run/'+id+'?'+q);
  setBoot({url:gameUrl(id,route,slot,current,journey,Date.now()),gameId:route.stages[slot].id});
 }
 function heal(){const current=normalizeSave(saveRef.current,route,stepRef.current);current.player.hp=current.player.max_hp;current.player.status='normal';saveRef.current=current;setCommand({type:'heal',nonce:Date.now()});reloadCurrent(current);setRescueNotice('已恢复满血并重载当前关。');}
 function forceSkip(){advanceRef.current(relicSave(saveRef.current,route,stepRef.current,'裁判强制跳关'),historyRef.current);setRescueOpen(false);}
 function rescueAudio(){unlockAudio();setCommand({type:'audio',nonce:Date.now()});setRescueNotice('已发送音频解锁指令；若游戏仍有静音提示，请在游戏画面内点击一次。');}
 function logoClick(){const now=Date.now();logoClicks.current=now-logoClicks.current.at<1200?{count:logoClicks.current.count+1,at:now}:{count:1,at:now};if(logoClicks.current.count>=3){setRescueOpen(true);logoClicks.current={count:0,at:0};}}
 async function copy(){try{await navigator.clipboard.writeText(location.href);setCopied(true);setTimeout(()=>setCopied(false),2500);}catch{setError('复制失败，请手动复制地址栏中的完整链接。');}}
 const clock=String(Math.floor(timeLeft/60)).padStart(2,'0')+':'+String(timeLeft%60).padStart(2,'0');

 return <div className="run-shell">
  <style>{`.rescue-button{display:inline-flex;align-items:center;gap:6px}.watchdog{font-variant-numeric:tabular-nums;color:#d8c58f}.watchdog.urgent{color:#ff8d7a}.rescue-backdrop{position:fixed;inset:0;z-index:10000;background:rgba(3,8,15,.82);display:grid;place-items:center;padding:20px}.rescue-panel{width:min(560px,100%);background:#101b29;border:1px solid #486072;border-radius:14px;padding:22px;color:#edf5f7;box-shadow:0 24px 90px #000}.rescue-panel header{display:flex;justify-content:space-between;align-items:center}.rescue-panel h2{margin:0}.rescue-panel p{color:#b7c6ce;line-height:1.7}.rescue-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px}.rescue-actions button{display:flex;align-items:center;justify-content:center;gap:8px;min-height:44px}.rescue-notice{color:#9ff5c8;min-height:24px}`}</style>
  <header className="run-top"><Link href="/"><ArrowLeft size={16}/>返回赛事大厅</Link><span onClick={logoClick} role="button" tabIndex={0} aria-label="无限世界，连续点击三次打开裁判救援"><b>∞ 无限世界</b><small>{route?.title||'世界线加载中'}</small></span><div style={{display:'flex',gap:8,alignItems:'center'}}><button className="rescue-button" onClick={()=>setRescueOpen(true)}><Shield size={15}/>裁判救援</button><button onClick={copy}><Copy size={15}/>{copied?'已复制进度链接':'复制进度链接'}</button></div></header>
  {error&&<div className="alert error">{error}</div>}
  {route&&!ready&&<VortexEntry title={route.title} saved={!!saved} onBegin={begin}/>}
  {route&&ready&&<div className="run-body"><aside className="run-route"><span className="eyebrow">YOUR JOURNEY</span><h2>这一次，走过这些世界。</h2>{route.stages.map((g:any,i:number)=><div key={g.id} className={'run-stage '+(i===step?'current':i<step||finish?'complete':'')}><span>{i<step||finish?<CheckCircle2 size={17}/>:String(i+1).padStart(2,'0')}</span><div><b>{g.world}</b><small>{g.team}</small></div>{i===step&&!finish&&<i/>}</div>)}<div className={'run-stage '+(finish?'current':'')}><span><Flag size={17}/></span><div><b>终局结算</b><small>把故事带回来。</small></div></div><p>道具、线索与选择<br/>会随你一路走下去。</p></aside>
   <main className="run-game">{finish?<div className="journey-finished"><Globe2 size={48}/><div className="eyebrow">THE WORLDS ARE CONNECTED</div><h1>走完这一程，<br/>你已不再是出发时的你。</h1><p>你完成了 {finish.history.length} 段世界旅程。</p><div className="finish-items">{Array.isArray(finish.save.items)&&finish.save.items.map((item:any,i:number)=><span key={i}>{String(item.name||'遗物')}</span>)}</div><div className="finish-items">{(finish.save.clues||[]).map((clue:any,i:number)=><span key={i}>{String(clue)}</span>)}</div><p>{resultNotice}</p>{group&&<a className="button primary" href={'/finale/'+group}>进入共同终局与三线汇总</a>}<div className="journey-history">{finish.history.slice(-38).map((h:any,i:number)=><div key={i}><b>{String(h.world||'未知世界')}</b><p>{String(h.hook||'')}</p></div>)}</div><Link className="button primary" href="/">回到赛事大厅 <ArrowRight size={15}/></Link></div>:<><div className="run-game-title"><span><i/>正在游玩</span><b>{route.stages[step]?.world}</b><small>第 {step+1} / {route.stages.length} 关 · <span className={'watchdog '+(timeLeft<=30?'urgent':'')}>看门狗 {clock}</span></small></div>{rescueNotice&&<div className="alert" role="status">{rescueNotice}</div>}{boot&&<GameFrame key={boot.url} url={boot.url} namespace={id+':'+runId} initialGameId={boot.gameId} onMessage={onMessage} command={command}/>}</>}</main>
  </div>}
  {rescueOpen&&<div className="rescue-backdrop" role="dialog" aria-modal="true" aria-label="裁判救援控制台"><section className="rescue-panel"><header><h2>裁判救援控制台</h2><button onClick={()=>setRescueOpen(false)} aria-label="关闭"><X size={18}/></button></header><p>用于现场卡死、静音或角色状态异常。强制跳关会生成本关墓碑，并将当前背包作为遗物交给下一位满血探索者。</p><div className="rescue-actions"><button onClick={heal}><Heart size={17}/>满血复活</button><button onClick={forceSkip}><SkipForward size={17}/>强制跳关</button><button onClick={rescueAudio}><Volume2 size={17}/>音频解锁</button><button onClick={()=>{setCommand({type:'reload',nonce:Date.now()});reloadCurrent();setRescueNotice('已重载当前关，看门狗不会重置。');}}><RotateCcw size={17}/>重载当前关</button></div><p className="rescue-notice">{rescueNotice}</p><small>快捷键：F8 或 Ctrl + Alt + K</small></section></div>}
 </div>;
}
