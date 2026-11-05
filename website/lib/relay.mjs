import {normalize,settleEntrySave} from './entry-save.mjs';

export function initialSave(input={}){
 const save=normalize({schema:'v3',...input,player:{hp:3,max_hp:3,sanity:2,...input.player}});
 save.player.sanity=Math.min(99,save.player.sanity);
 save.player.deaths=0;
 return save;
}

export function stageSave(raw,route,slot,{settle=true}={}){
 const save=normalize(raw,slot+1);
 save.world=route.stages[slot].world;
 save.prev_world=slot?route.stages[slot-1].world:'主神大厅';
 save.next_world=route.stages[slot+1]?.world||'终局结算';
 save.exit_hook=route.stages[slot].exitHook;
 save.player.sanity=Math.min(99,save.player.sanity);
 save.clues=save.clues.slice(-2);
 return settle?settleEntrySave(save):save;
}

export function gameConfig(route,slot,origin){
 const stage=route.stages[slot],next=route.stages[slot+1];
 return {
  routeId:route.id,slot,gameId:stage.id,level:slot+1,world:stage.world,
  prevWorld:slot?route.stages[slot-1].world:'主神大厅',
  nextWorld:next?.world||'终局结算',exitHook:stage.exitHook,passViaUrl:true,
  nextUrl:next?(next.external_url||'/play/'+route.id+'/'+(slot+1)+'/'+next.entry_path):
   '/play/'+route.id+'/'+route.stages.length+'/__finish.html'
 };
}

export function advanceState(state,route,body){
 const slot=state.step;
 if(state.done||body.step!==slot)return state;
 const current=stageSave(body.save||state.save,route,slot,{settle:false});
 current.settled=Array.isArray(state.save.settled)?state.save.settled.slice(-8):[];
 const failed=body.failure===true||current.player.hp<=0||current.player.status==='dead';
 if(failed){
  const reason=String(body.reason||'探索者生命耗尽').slice(0,100);
  current.items=current.items.map(it=>({...it,relic:true,name:('前人的'+it.name.replace(/^(前人的)+/,'')).slice(0,32)}));
  if(!current.items.length)current.items=[{id:'relic_survival_knife',name:'前人的求生短刀',type:'tool',relic:true}];
  const previous=state.save.tombstone?.epitaph||current.tombstone?.epitaph||'';
  current.tombstone={fallen_level:slot+1,cause:reason,epitaph:(previous+(previous?' | ':'')+'[第'+(slot+1)+'关] '+reason).slice(-200)};
  current.player=initialSave().player;
 }
 current.player.deaths=0;
 const history=[...state.history.slice(0,slot),{level:slot+1,world:route.stages[slot].world,hook:route.stages[slot].exitHook}].slice(-64);
 const done=slot===route.stages.length-1;
 const save=done?{...current,level:route.stages.length+1,next_world:'终局结算'}:stageSave(current,route,slot+1);
 return {...state,step:done?slot:slot+1,save,history,done,revision:state.revision+1,enteredAt:Date.now()};
}
