'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {ArrowLeft,ArrowRight,Copy,Flag,CheckCircle2,Heart,RotateCcw,SkipForward,Volume2,Shield,X} from 'lucide-react';
import {FinaleScenery} from './finale-scenery';
import {VortexEntry} from '../../vortex-entry';
import {GameFrame} from '../../ui';
import {gameConfig} from '../../../lib/relay.mjs';
import {readProgress,clearRouteProgress,saveProgress} from '../../../lib/progress.mjs';

async function request(path:string,body?:unknown){
 const response=await fetch('/api/'+path,body?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}:undefined);
 const result=await response.json() as any;
 if(!response.ok)throw Error(result.error||'旅程操作未完成，请重试。');
 return result;
}
export default function Run({id}:{id:string}){
 const [route,setRoute]=useState<any>(null),[error,setError]=useState(''),[step,setStep]=useState(0),[boot,setBoot]=useState<any>(null),[finish,setFinish]=useState<any>(null),[copied,setCopied]=useState(false);
 const [ready,setReady]=useState(false),[saved,setSaved]=useState<any>(null),[runId,setRunId]=useState(''),[group,setGroup]=useState(''),[resultNotice,setResultNotice]=useState('');
 const [rescueOpen,setRescueOpen]=useState(false),[rescueNotice,setRescueNotice]=useState(''),[timeLeft,setTimeLeft]=useState(180),[command,setCommand]=useState<{type:string;nonce:number}|undefined>();
 const stateRef=useRef<any>(null),busyRef=useRef(false),routeRef=useRef<any>(null);
 const audioRef=useRef<AudioContext|null>(null),logoClicks=useRef({count:0,at:0});
 const apply=useCallback((state:any,activeRoute:any,reload=false)=>{
  stateRef.current=state;routeRef.current=activeRoute;
  setRunId(state.runId);setStep(state.step);setReady(true);
  const q=new URLSearchParams({runId:state.runId,step:String(state.step)});
  if(state.done)q.set('done','1');
  history.replaceState(null,'','/run/'+id+'?'+q);
  saveProgress(localStorage,id,{runId:state.runId,search:q.toString()});
  if(state.done){
   setFinish({save:state.save,history:state.history});setBoot(null);
   request('results',{routeId:id,runId:state.runId,save:state.save,history:state.history})
    .then(()=>setResultNotice('本次旅程已记录。')).catch(()=>setResultNotice('汇总暂未成功，服务器进度已保留。'));
   return;
  }
  setFinish(null);
  const stage=activeRoute.stages[state.step],url=new URL(stage.external_url||'/play/'+id+'/'+state.step+'/'+stage.entry_path,location.origin);
  url.searchParams.set('runId',state.runId);
  if(reload)url.searchParams.set('_reload',String(Date.now()));
  setBoot({url:url.href,gameId:stage.id,context:{...gameConfig(activeRoute,state.step,location.origin),save:state.save,history:state.history}});
 },[id]);
 useEffect(()=>{
  let live=true;
  request('routes/'+id).then(data=>{
   if(!live)return;
   if(data.id!==id){location.replace('/run/'+data.id);return;}
   setRoute(data);routeRef.current=data;
   const q=new URLSearchParams(location.search),stored=readProgress(localStorage,id);
   const queryRun=q.get('runId');
   setSaved(queryRun?{runId:queryRun,search:q.toString()}:q.has('save')?{runId:'legacy',search:q.toString()}:stored);
  }).catch(e=>setError(e.message));
  return()=>{live=false;};
 },[id]);
 function unlockAudio(){
  try{if(!audioRef.current)audioRef.current=new AudioContext();void audioRef.current.resume();}catch{}
 }
 async function begin(fresh:boolean){
  if(busyRef.current)return;busyRef.current=true;
  try{
   unlockAudio();setError('');setRescueNotice('');
   if(fresh)clearRouteProgress(localStorage,id);
   let state:any;
   try{
    state=fresh||!saved?.runId?await request('runs',{routeId:id}):await request('runs/'+saved.runId);
   }catch(error){
    const query=new URLSearchParams(saved?.search||'');
    const encoded=query.get('save');
    if(fresh||!encoded||encoded.length>20000||Number(query.get('step'))<=0)throw error;
    const save=JSON.parse(decodeURIComponent(escape(atob(encoded))));
    state=await request('runs',{routeId:id,legacy:{step:Number(query.get('step')),save}});
    setRescueNotice('旧版交接存档已迁移为短链接，旧关序以前的回放使用平台钩子恢复。');
   }
   if(state.routeId!==id)throw Error('存档与当前世界线不符，请全新开始。');
   apply(state,route);
  }catch(e){setError((e as Error).message);}finally{busyRef.current=false;}
 }
 const advance=useCallback(async(save:any,failure=false,reason='')=>{
  const current=stateRef.current;if(!current||current.done||busyRef.current)return;
  busyRef.current=true;
  try{
   const state=await request('runs/'+current.runId,{routeId:id,step:current.step,revision:current.revision,save,failure,reason});
   apply(state,routeRef.current);
  }catch(e){setError((e as Error).message);setRescueNotice('交接未完成，进度已保留；请重试通关或刷新旅程。');}
  finally{busyRef.current=false;}
 },[id,apply]);
 const onMessage=useCallback((data:any)=>{
  const current=stateRef.current;
  if(!current||current.done||!data||typeof data!=='object'||data.routeId!==id||data.slot!==current.step)return;
  if(data.type==='IW_FAIL'){void advance(data.fallenSave||current.save,true,String(data.reason||'探索者生命耗尽'));return;}
  if(['IW_SAVE','iw-save','IW_COMPLETE'].includes(data.type)&&data.save&&typeof data.save==='object'){
   void advance(data.save,data.failure===true,String(data.reason||''));
  }
 },[id,advance]);
 useEffect(()=>{
  if(!ready||finish)return;
  const enteredAt=stateRef.current?.enteredAt||Date.now();
  let timedOut=false;
  const timer=setInterval(()=>{
   const elapsed=Date.now()-enteredAt;
   setTimeLeft(Math.max(0,Math.ceil((180000-elapsed)/1000)));
   if(elapsed>=180000&&elapsed<190000)setRescueNotice('本关时间已到，将在 '+Math.ceil((190000-elapsed)/1000)+' 秒后执行遗物交接。');
   if(elapsed>=190000&&!timedOut){timedOut=true;void advance(stateRef.current.save,true,'时空裂隙坍缩（演示超时）');}
  },1000);
  return()=>clearInterval(timer);
 },[ready,finish,step,advance]);
 useEffect(()=>{
  function key(event:KeyboardEvent){if(event.key==='F8'||event.ctrlKey&&event.altKey&&event.key.toLowerCase()==='k'){event.preventDefault();setRescueOpen(v=>!v);}}
  addEventListener('keydown',key);return()=>removeEventListener('keydown',key);
 },[]);
 function reloadCurrent(){if(stateRef.current)apply(stateRef.current,routeRef.current,true);}
 async function heal(){
  if(busyRef.current||!stateRef.current||stateRef.current.done)return;
  busyRef.current=true;
  try{
   const current=stateRef.current;
   const next=await request('runs/'+current.runId,{routeId:id,step:current.step,revision:current.revision,action:'heal'});
   apply(next,routeRef.current,true);setRescueNotice('已恢复满血并重新载入当前关。');
  }catch(error){setError((error as Error).message);}finally{busyRef.current=false;}
 }
 function forceSkip(){void advance(stateRef.current?.save,true,'裁判强制跳关');setRescueOpen(false);}
 function rescueAudio(){unlockAudio();setCommand({type:'audio',nonce:Date.now()});setRescueNotice('已发送音频解锁指令。');}
 function logoClick(){const now=Date.now();logoClicks.current=now-logoClicks.current.at<1200?{count:logoClicks.current.count+1,at:now}:{count:1,at:now};if(logoClicks.current.count>=3){setRescueOpen(true);logoClicks.current.count=0;}}
 async function copy(){try{await navigator.clipboard.writeText(location.href);setCopied(true);setTimeout(()=>setCopied(false),2500);}catch{setError('复制失败，请复制地址栏中的旅程链接。');}}
 const clock=String(Math.floor(timeLeft/60)).padStart(2,'0')+':'+String(timeLeft%60).padStart(2,'0');
 return <div className="run-shell">
  <style>{`.rescue-button{display:inline-flex;align-items:center;gap:6px}.watchdog{font-variant-numeric:tabular-nums;color:#d8c58f}.watchdog.urgent{color:#ff8d7a}.rescue-backdrop{position:fixed;inset:0;z-index:10000;background:rgba(3,8,15,.82);display:grid;place-items:center;padding:20px}.rescue-panel{width:min(560px,100%);background:#101b29;border:1px solid #486072;border-radius:14px;padding:22px;color:#edf5f7;box-shadow:0 24px 90px #000}.rescue-panel header{display:flex;justify-content:space-between;align-items:center}.rescue-panel h2{margin:0}.rescue-panel p{color:#b7c6ce;line-height:1.7}.rescue-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px}.rescue-actions button{display:flex;align-items:center;justify-content:center;gap:8px;min-height:44px}.rescue-notice{color:#9ff5c8;min-height:24px}`}</style>
  <header className="run-top"><Link href="/"><ArrowLeft size={16}/>返回赛事大厅</Link><span onClick={logoClick} role="button" tabIndex={0} aria-label="无限世界，连续点击三次打开裁判救援"><b>∞ 无限世界</b><small>{route?.title||'世界线加载中'}</small></span><div style={{display:'flex',gap:8,alignItems:'center'}}><button className="rescue-button" onClick={()=>setRescueOpen(true)}><Shield size={15}/>裁判救援</button><button onClick={copy}><Copy size={15}/>{copied?'已复制进度链接':'复制进度链接'}</button></div></header>
  {error&&<div className="alert error">{error}</div>}
  {route&&!ready&&<VortexEntry title={route.title} saved={!!saved} onBegin={begin}/>}
  {route&&ready&&<div className="run-body"><nav className="run-journey-strip" aria-label="世界旅程">{route.stages.map((g:any,i:number)=><span key={g.id} className={finish||i<step?'is-complete':''} aria-current={!finish&&i===step?'step':undefined}>{finish||i<step?<CheckCircle2 size={13}/>:String(i+1).padStart(2,'0')} {g.world}</span>)}<span aria-current={finish?'step':undefined}><Flag size={13}/>终局</span></nav>
   <main className="run-game">{finish?<div className="journey-finished"><FinaleScenery worlds={route.stages.map((stage:any)=>stage.world)}/><div className="eyebrow">THE WORLDS ARE CONNECTED</div><h1><span>我已不再地坛</span><span>地坛在我</span></h1><p>{finish.history.length?'你走过了 '+finish.history.length+' 段世界旅程。':'世界线已抵达终局。'}</p><div className="finish-items">{Array.isArray(finish.save.items)&&finish.save.items.map((item:any,i:number)=><span key={i}>{String(item.name||'遗物')}</span>)}</div><div className="finish-items">{(finish.save.clues||[]).map((clue:any,i:number)=><span key={i}>{String(clue)}</span>)}</div><p>{resultNotice}</p>{group&&<a className="button primary" href={'/finale/'+group}>进入共同终局与三线汇总</a>}<div className="journey-history">{finish.history.slice(-38).map((h:any,i:number)=><div key={i}><b>{String(h.world||'未知世界')}</b><p>{String(h.hook||'')}</p></div>)}</div><Link className="finale-return" href="/">回到赛事大厅 <ArrowRight size={15}/></Link></div>:<><div className="run-game-title"><span><i/>正在游玩</span><b>{route.stages[step]?.world}</b><small>第 {step+1} / {route.stages.length} 关 · <span className={'watchdog '+(timeLeft<=30?'urgent':'')}>看门狗 {clock}</span></small></div>{rescueNotice&&<div className="alert" role="status">{rescueNotice}</div>}{boot&&<GameFrame key={boot.url} url={boot.url} namespace={id+':'+runId} initialGameId={boot.gameId} onMessage={onMessage} command={command} context={boot.context}/>}</>}</main>
  </div>}
  {rescueOpen&&<div className="rescue-backdrop" role="dialog" aria-modal="true" aria-label="裁判救援控制台"><section className="rescue-panel"><header><h2>裁判救援控制台</h2><button onClick={()=>setRescueOpen(false)} aria-label="关闭"><X size={18}/></button></header><p>用于现场卡死、静音或角色状态异常。强制跳关会生成本关墓碑，并将当前背包作为遗物交给下一位满血探索者。</p><div className="rescue-actions"><button onClick={heal}><Heart size={17}/>满血复活</button><button onClick={forceSkip}><SkipForward size={17}/>强制跳关</button><button onClick={rescueAudio}><Volume2 size={17}/>音频解锁</button><button onClick={()=>{setCommand({type:'reload',nonce:Date.now()});reloadCurrent();setRescueNotice('已重载当前关，看门狗不会重置。');}}><RotateCcw size={17}/>重载当前关</button></div><p className="rescue-notice">{rescueNotice}</p><small>快捷键：F8 或 Ctrl + Alt + K</small></section></div>}
 </div>;
}
