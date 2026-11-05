import {initialSave,stageSave,advanceState} from '../lib/relay.mjs';
import {pages} from './game-pages.mjs';
const team = '主办方示例队';
const examples = [
  ['example-wasteland', 'wasteland-market', '废土集市', '余烬之约',
    '在锈风集市拾荒、以物易物、修好电台。你留下的净水，会成为别人的明天。'],
  ['example-opera', 'ghost-opera', '幽冥戏班', '子夜折子',
    '循戏本、正脸谱、鸣送魂。唱完一折给亡者的戏，才有你自己的归途。'],
];
export const games = examples.map(([id, folder, world, title, description]) => ({
  id, team, world, title, description, entry: folder + '/index.html',
  exitHook: world==='废土集市'?'青灯照出幽冥戏班，下一段故事正在等待。':'携着遗物走回大陆，让旅程中的故事留在心中。', status: 'approved', fileCount: 6, hasRelay: true,
}));
export const route = {
  id: 'infinite-world', title: '无限世界', initial_save:initialSave(),
  stages: games.map(game => ({...game, entry_path: game.entry})),
};
export function staticDocument(url,context){
 const game=games.find(game=>url.includes(game.id)||url.includes(game.entry));
 if(!game)return '';
 const initial=context||{routeId:'preview',slot:0,gameId:game.id,world:game.world,exitHook:game.exitHook,nextWorld:'试玩结束',nextUrl:'#finished',save:stageSave(initialSave(),{stages:[{world:game.world,exitHook:game.exitHook}]},0),history:[]};
 return pages[game.id].replace(/<head\b[^>]*>/i,head=>head+'<script>window.__iw_staticContext='+JSON.stringify(initial).replaceAll('<','\\u003c')+';</script>');
}
export async function staticRequest(path,body) {
 if(path==='runs'&&body){
  const runId=crypto.randomUUID();
  const state={runId,routeId:route.id,step:0,revision:0,save:stageSave(route.initial_save,route,0),history:[],done:false,enteredAt:Date.now()};
  localStorage.setItem('iw-static-run:'+runId,JSON.stringify(state));return state;
 }
 if(path.startsWith('runs/')){
  const key='iw-static-run:'+path.slice(5),stored=localStorage.getItem(key);
  if(!stored)throw Error('进度不存在，请全新开始。');
  const state=JSON.parse(stored),next=body?advanceState(state,route,body):state;
  localStorage.setItem(key,JSON.stringify(next));return next;
 }
 if(path==='results')return {ok:true};

  if (path === 'state') {
    return {games, routes: [route], activeRoute: route.id, admin: false, groups: []};
  }
  if (path === 'routes/' + route.id) return route;
  const game = games.find(game => path === 'demo/' + game.id);
  if (game) return {url: './games/demo/' + game.id + '/' + game.entry};
  throw new Error('静态版仅提供作品浏览与游玩。');
}
