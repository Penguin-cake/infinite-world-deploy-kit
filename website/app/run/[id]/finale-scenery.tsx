'use client';
import {useEffect,useState} from 'react';
import {WORLD_NAMES} from '../../depth-worlds';
import './run-cinema.css';

export function FinaleScenery({worlds}:{worlds:string[]}){
 const [frame,setFrame]=useState(0);
 const [paused,setPaused]=useState(false);
 useEffect(()=>{
  if(paused||worlds.length<2)return;
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const timer=setInterval(()=>{if(!preference.matches)setFrame(i=>(i+1)%worlds.length);},5500);
  return()=>clearInterval(timer);
 },[worlds.length,paused]);
 const active=frame%Math.max(1,worlds.length);
 return <>
  <div className={'finale-landscape'+(paused?' is-paused':'')} aria-hidden="true">
   {worlds.map((world,i)=>{
    const tile=WORLD_NAMES.indexOf(world);
    return <div key={i} className={'finale-scene'+(i===active?' is-visible':'')+(tile<0?' is-panorama':'')}
      style={tile<0?undefined:{backgroundPosition:((tile%8)/7*100)+'% '+(Math.floor(tile/8)/3*100)+'%'}}/>;
   })}
  </div>
  <div className="finale-scene-caption">
   <span>{worlds[active]}</span>
   {worlds.length>1&&<><button onClick={()=>setFrame((active+1)%worlds.length)}>下一幕</button><button className="finale-pause" onClick={()=>setPaused(!paused)}>{paused?'继续回放':'暂停回放'}</button></>}
  </div>
 </>;
}
