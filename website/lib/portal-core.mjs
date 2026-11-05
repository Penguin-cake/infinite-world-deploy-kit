import {unzipSync} from 'fflate';
export const ZIP_LIMIT=50*1024*1024;
export const UNPACKED_LIMIT=120*1024*1024;
export const FILE_SIZE_LIMIT=35*1024*1024;
export const FILE_COUNT_LIMIT=1000;
const EXTENSIONS=new Set('html htm js mjs css json png jpg jpeg gif webp svg ico avif mp3 ogg wav m4a mp4 webm woff woff2 ttf otf wasm data pck pak mem txt md map'.split(' '));
export class PortalError extends Error{constructor(message,status=400){super(message);this.status=status;}}
export function cleanPath(name){
 if(typeof name!=='string'||!name||name.length>250||/[\\\x00-\x1f%?#:]/.test(name)||name.startsWith('/')||name.split('/').some(p=>p==='..'||p==='.'||!p))throw new PortalError('游戏包包含不安全或不支持的文件路径。');
 if(name.split('/').some(p=>p.startsWith('.')))throw new PortalError('请移除隐藏目录、版本库和环境密钥文件后上传。');
 return name.normalize('NFC');
}
export function inspectZip(bytes,requested='index.html'){
 if(bytes.byteLength>ZIP_LIMIT)throw new PortalError('ZIP 文件不得超过 50 MB。');
 let files=0,total=0;
 let unpacked;
 try{unpacked=unzipSync(bytes,{filter:entry=>{
  if(entry.name.endsWith('/'))return false;
  if(entry.name.startsWith('__MACOSX/')||entry.name.endsWith('/.DS_Store')||entry.name==='.DS_Store')return false;
  cleanPath(entry.name);
  if(!EXTENSIONS.has(entry.name.split('.').pop().toLowerCase()))throw new PortalError('游戏包仅接受网页、脚本、样式及常见图片、音频、字体文件。');
  if(entry.originalSize>FILE_SIZE_LIMIT||++files>FILE_COUNT_LIMIT||(total+=entry.originalSize)>UNPACKED_LIMIT)throw new PortalError('解压后最多 1000 个文件、120 MB，单个文件最多 35 MB。');
  return true;
 }});}catch(e){if(e instanceof PortalError)throw e;throw new PortalError('ZIP 无法读取。请使用普通、未加密的 ZIP 文件。');}
 let names=Object.keys(unpacked);if(!names.length)throw new PortalError('游戏包为空。');
 const first=names[0].split('/')[0];
 if(names.every(n=>n.startsWith(first+'/'))){unpacked=Object.fromEntries(names.map(n=>[n.slice(first.length+1),unpacked[n]]));names=Object.keys(unpacked);}
 requested=cleanPath(String(requested||'index.html').trim());
 if(!unpacked[requested]){
  const candidates=names.filter(n=>/(^|\/)index\.html?$/i.test(n));
  if(requested==='index.html'&&candidates.length===1)requested=candidates[0];else throw new PortalError('找不到入口页面「'+requested+'」。请填写它在 ZIP 内的相对路径。');
 }
 if(!/\.html?$/i.test(requested))throw new PortalError('游戏入口必须是 HTML 页面。');
 const text=new TextDecoder().decode(unpacked[requested]);
 if(!/<(?:!doctype|html|head|body|canvas|div|script)\b/i.test(text))throw new PortalError('入口内容不是有效的网页游戏。');
 const allScripts=names.filter(n=>/\.(?:m?js|html?)$/i.test(n)&&!n.endsWith('save-protocol.js')).map(n=>new TextDecoder().decode(unpacked[n])).join('\n');
 const hasRelay=/\bWL\s*\.\s*completeLevel\s*\(/.test(allScripts)&&/\bWL\s*\.\s*readSave\s*\(/.test(allScripts);
 return {files:unpacked,entry:requested,hasRelay,fileCount:names.length,unpackedSize:Object.values(unpacked).reduce((n,b)=>n+b.byteLength,0)};
}
export function validateMeta(input){
 const result={};for(const [key,max] of Object.entries({team:40,title:60,world:40,description:400,exitHook:400})){
  const value=String(input[key]??'').trim();if(!value||value.length>max)throw new PortalError('请填写完整的队名、作品名、世界名、简介和出口钩子，且不要超过字数限制。');result[key]=value;
 }return result;
}
export function safeJSON(value){return JSON.stringify(value).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');}
export function mime(path){const ext=path.split('.').pop().toLowerCase();return ({html:'text/html; charset=utf-8',htm:'text/html; charset=utf-8',js:'application/javascript; charset=utf-8',mjs:'application/javascript; charset=utf-8',css:'text/css; charset=utf-8',json:'application/json',svg:'image/svg+xml',png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',webp:'image/webp',gif:'image/gif',avif:'image/avif',ico:'image/x-icon',mp3:'audio/mpeg',ogg:'audio/ogg',wav:'audio/wav',m4a:'audio/mp4',mp4:'video/mp4',webm:'video/webm',woff:'font/woff',woff2:'font/woff2',ttf:'font/ttf',otf:'font/otf',wasm:'application/wasm',txt:'text/plain; charset=utf-8',md:'text/plain; charset=utf-8',map:'application/json'})[ext]||'application/octet-stream';}
export function makeBridge(context,initialStorage={}){
 return '('+bridgeRuntime.toString()+')('+safeJSON(context)+','+safeJSON(initialStorage)+');';
}
function bridgeRuntime(C,seed){
 'use strict';
 const memory=Object.assign(Object.create(null),seed);
 const tell=(type,data)=>parent.postMessage({...data,type,routeId:C.routeId,slot:C.slot,gameId:C.gameId},'*');
 const storage={
  getItem:key=>Object.hasOwn(memory,String(key))?memory[String(key)]:null,
  setItem(key,value){key=String(key);value=String(value);if(key.length>150||value.length>65536)return;memory[key]=value;tell('iw-storage',{key,value});},
  removeItem(key){delete memory[String(key)];tell('iw-storage',{key:String(key),value:null});},
  clear(){Object.keys(memory).forEach(key=>storage.removeItem(key));},
  key:index=>Object.keys(memory)[index]||null
 };
 Object.defineProperty(storage,'length',{get:()=>Object.keys(memory).length});
 try{Object.defineProperty(window,'localStorage',{get:()=>storage});}catch{}
 const clone=value=>JSON.parse(JSON.stringify(value));
 const freeze=value=>{if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;};
 const initial=C.save?freeze(clone(C.save)):null;
 const fix=config=>({...config,level:C.slot+1,world:C.world,prevWorld:C.prevWorld,nextWorld:C.nextWorld,nextUrl:C.nextUrl,exitHook:C.exitHook,passViaUrl:true});
 let config=fix({}),wl;
 Object.defineProperty(window,'CONFIG',{configurable:true,get:()=>config,set:value=>{config=fix(value);}});
 const install=value=>{
  if(!value||value.__portalBridge)return value;
  const read=value.readSave,complete=value.completeLevel,history=value.readHistory;
  value.readSave=()=>initial?clone(initial):read.call(value,C.slot+1);
  value.getInitialSave=()=>initial?clone(initial):read.call(value,C.slot+1);
  value.readHistory=()=>Array.isArray(C.history)?clone(C.history):history.call(value);
  value.completeLevel=(c,save,opts)=>{
   const result=complete.call(value,fix(c),save,{...opts,nextUrl:C.nextUrl,exitHook:C.exitHook,passViaUrl:true});
   if(result)tell('iw-save',{save:result,history:value.readHistory()});
   return result;
  };
  value.__portalBridge=true;return value;
 };
 Object.defineProperty(window,'WL',{configurable:true,get:()=>wl,set:value=>{wl=install(value);}});
 addEventListener('message',event=>{
  if(event.source!==parent||!event.data||typeof event.data!=='object')return;
  if(event.data.type==='IW_STORAGE_INIT'&&event.data.values&&typeof event.data.values==='object'){
   for(const [key,value]of Object.entries(event.data.values))if(key.length<150&&typeof value==='string'&&value.length<=65536)memory[key]=value;
  }
 });
 addEventListener('load',()=>tell('IW_READY',{world:C.world}));
}
export function injectBridge(html,context,storage){const tag='<script>'+makeBridge(context,storage)+'</script>';return /<head\b[^>]*>/i.test(html)?html.replace(/<head\b[^>]*>/i,m=>m+tag):html.replace(/^(\s*<!doctype[^>]*>)?/i,m=>m+tag);}
export function gameHeaders(type,html=false){return {'Content-Type':type,'Access-Control-Allow-Origin':'*','Cross-Origin-Opener-Policy':'same-origin','Cross-Origin-Embedder-Policy':'credentialless','Cross-Origin-Resource-Policy':'cross-origin','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Cache-Control':html?'no-store':'public, max-age=31536000, immutable','Content-Security-Policy':"sandbox allow-scripts allow-pointer-lock allow-orientation-lock; default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval' https: http: blob:; style-src 'unsafe-inline' https: http:; img-src https: http: data: blob:; font-src https: http: data:; media-src https: http: data: blob:; connect-src https: http: data: blob:; worker-src blob: https: http:; child-src blob: https: http:; base-uri 'none'; form-action 'none'; frame-ancestors 'self'"};}
