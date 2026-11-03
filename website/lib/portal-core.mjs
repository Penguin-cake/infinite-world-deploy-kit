import {unzipSync} from 'fflate';
export const ZIP_LIMIT=10*1024*1024;
const EXTENSIONS=new Set('html htm js mjs css json png jpg jpeg gif webp svg ico avif mp3 ogg wav m4a mp4 webm woff woff2 ttf otf wasm txt md map'.split(' '));
export class PortalError extends Error{constructor(message,status=400){super(message);this.status=status;}}
export function cleanPath(name){
 if(typeof name!=='string'||!name||name.length>250||/[\\\x00-\x1f%?#:]/.test(name)||name.startsWith('/')||name.split('/').some(p=>p==='..'||p==='.'||!p))throw new PortalError('游戏包包含不安全或不支持的文件路径。');
 if(name.split('/').some(p=>p.startsWith('.')))throw new PortalError('请移除隐藏目录、版本库和环境密钥文件后上传。');
 return name.normalize('NFC');
}
export function inspectZip(bytes,requested='index.html'){
 if(bytes.byteLength>ZIP_LIMIT)throw new PortalError('ZIP 文件不得超过 10 MB。');
 let files=0,total=0;
 let unpacked;
 try{unpacked=unzipSync(bytes,{filter:entry=>{
  if(entry.name.endsWith('/'))return false;
  if(entry.name.startsWith('__MACOSX/')||entry.name.endsWith('/.DS_Store')||entry.name==='.DS_Store')return false;
  cleanPath(entry.name);
  if(!EXTENSIONS.has(entry.name.split('.').pop().toLowerCase()))throw new PortalError('游戏包仅接受网页、脚本、样式及常见图片、音频、字体文件。');
  if(entry.originalSize>8*1024*1024||++files>250||(total+=entry.originalSize)>30*1024*1024)throw new PortalError('解压后最多 250 个文件、30 MB，单个文件最多 8 MB。');
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
 return `;(function(){'use strict';const C=${safeJSON(context)},seed=${safeJSON(initialStorage)};const memory=Object.assign(Object.create(null),seed);const tell=(type,data)=>{if(parent!==window)parent.postMessage(Object.assign({type,routeId:C.routeId,slot:C.slot,gameId:C.gameId},data||{}),'*')};const storage={getItem:k=>Object.prototype.hasOwnProperty.call(memory,String(k))?memory[String(k)]:null,setItem(k,v){k=String(k);v=String(v);if(k.length>150||v.length>65536)return;memory[k]=v;tell('iw-storage',{key:k,value:v})},removeItem(k){k=String(k);delete memory[k];tell('iw-storage',{key:k,value:null})},clear(){Object.keys(memory).forEach(k=>storage.removeItem(k))},key:i=>Object.keys(memory)[i]||null};Object.defineProperty(storage,'length',{get:()=>Object.keys(memory).length});try{Object.defineProperty(window,'localStorage',{configurable:true,get:()=>storage})}catch(e){}let config,wl;const fix=v=>Object.assign({},v||{},{level:C.slot+1,world:C.world,prevWorld:C.prevWorld,nextWorld:C.nextWorld,nextUrl:C.nextUrl,passViaUrl:true});try{Object.defineProperty(window,'CONFIG',{configurable:true,get:()=>config,set:v=>{config=fix(v)}})}catch(e){}const install=v=>{if(!v||v.__portalBridge)return v;const read=v.readSave,complete=v.completeLevel;v.readSave=function(){return read.call(v,C.slot+1)};v.completeLevel=function(c,s,o){o=Object.assign({},o||{},{nextUrl:C.nextUrl,passViaUrl:true});if(C.exitHook)o.exitHook=C.exitHook;const result=complete.call(v,fix(c),s,o);if(result)tell('iw-save',{save:result,history:v.readHistory()});return result};v.__portalBridge=true;return v};try{Object.defineProperty(window,'WL',{configurable:true,get:()=>wl,set:v=>{wl=install(v)}})}catch(e){if(window.WL)install(window.WL)}addEventListener('load',()=>tell('iw-enter',{world:C.world,search:location.search}));})();`;
}
export function injectBridge(html,context,storage){const tag='<script>'+makeBridge(context,storage)+'</script>';return /<head\b[^>]*>/i.test(html)?html.replace(/<head\b[^>]*>/i,m=>m+tag):html.replace(/^(\s*<!doctype[^>]*>)?/i,m=>m+tag);}
export function gameHeaders(type,html=false){return {'Content-Type':type,'Access-Control-Allow-Origin':'*','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Cache-Control':html?'no-store':'public, max-age=31536000, immutable','Content-Security-Policy':"sandbox allow-scripts; default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval' https: http: blob:; style-src 'unsafe-inline' https: http:; img-src https: http: data: blob:; font-src https: http: data:; media-src https: http: data: blob:; connect-src https: http: data: blob:; worker-src blob:; base-uri 'none'; form-action 'none'; frame-ancestors 'self'"};}
