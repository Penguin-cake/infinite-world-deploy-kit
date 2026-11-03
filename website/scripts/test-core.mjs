import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import {zipSync,strToU8} from 'fflate';
import {inspectZip,validateMeta,makeBridge,injectBridge,gameHeaders,PortalError} from '../lib/portal-core.mjs';
let passed=0;
function test(name,fn){fn();console.log('通过：'+name);passed++;}
const html=strToU8('<!doctype html><html><head></head><body><script src="game.js"></script></body></html>');
const script=strToU8('var save=WL.readSave(CONFIG.level);function finish(){WL.completeLevel(CONFIG,save,{})}');
const good=()=>zipSync({'entry/index.html':html,'entry/game.js':script});
test('普通 ZIP 自动去除共同根目录并识别入口与接力接口',()=>{const p=inspectZip(good());assert.equal(p.entry,'index.html');assert.equal(p.fileCount,2);assert.equal(p.hasRelay,true);});
test('保留复杂目录，显式入口可引用上传包里的共享库',()=>{const p=inspectZip(zipSync({'world/index.html':html,'world/game.js':script,'shared/save-protocol.js':strToU8('official')}),'world/index.html');assert.ok(p.files['shared/save-protocol.js']);});
test('仅打包协议库但作品没有调用，不视为完成接力接入',()=>{const p=inspectZip(zipSync({'index.html':html,'shared/save-protocol.js':script}));assert.equal(p.hasRelay,false);});
test('拒绝路径穿越、Windows路径、编码路径、隐藏密钥和可执行文件',()=>{for(const name of ['../a.html','C:/a.html','a\\b.html','%2e%2e/a.html','.env','x.exe','.git/config'])assert.throws(()=>inspectZip(zipSync({[name]:html})),PortalError);});
test('拒绝损坏压缩包、缺失入口及超过文件上限的压缩包',()=>{assert.throws(()=>inspectZip(new Uint8Array([1,2,3])));assert.throws(()=>inspectZip(zipSync({'x.js':script})));const files={};for(let i=0;i<251;i++)files['f'+i+'.js']=script;assert.throws(()=>inspectZip(zipSync(files)),/250/);});
test('解压炸弹在解压前按声明体积拒绝',()=>{assert.throws(()=>inspectZip(zipSync({'index.html':html,'big.txt':new Uint8Array(8*1024*1024+1)})),/8 MB/);});
test('投稿必填与长度约束在服务端生效',()=>{assert.throws(()=>validateMeta({}));assert.throws(()=>validateMeta({team:'a'.repeat(41)}));assert.equal(validateMeta({team:'队伍',title:'作品',world:'世界',description:'简介',exitHook:'钩子'}).world,'世界');});
const protocol=fs.readFileSync('../../shared/save-protocol.js','utf8');
function fixture(slot=0,seed={}){const messages=[],ctx={slot,routeId:'route-one',gameId:'game-one',world:'本关世界',prevWorld:'上家世界',nextWorld:'下家世界',nextUrl:'/play/route-one/'+(slot+1)+'/index.html',exitHook:'主办方调整的出口钩子'};const c={Buffer,console,location:{href:'https://portal.test/play/route-one/0/index.html',search:''},parent:{postMessage:m=>messages.push(m)},addEventListener(){}};c.window=c;c.globalThis=c;vm.createContext(c);vm.runInContext(makeBridge(ctx,seed),c);vm.runInContext(protocol,c);return {c,messages,ctx};}
test('注入桥接会覆盖全局CONFIG并调用真实协议生成正确关序、出口和旅程',()=>{const {c,messages}=fixture(2);vm.runInContext(`var CONFIG={level:99,world:'旧世界',nextUrl:'wrong'};var s=WL.readSave(99);WL.addItem(s,{id:'key',name:'钥匙',type:'key'});WL.addClue(s,'线索');var result=WL.completeLevel(CONFIG,s,{exitHook:'旧钩子',nextUrl:'wrong'});`,c);assert.equal(c.CONFIG.level,3);assert.equal(c.CONFIG.nextWorld,'下家世界');assert.equal(c.result.level,4);assert.equal(c.result.exit_hook,'主办方调整的出口钩子');assert.equal(c.result.prev_world,'本关世界');assert.equal(c.WL.readHistory().length,1);assert.equal(messages.filter(m=>m.type==='iw-save').length,1);});
test('const局部CONFIG作品仍通过WL包装正确写出官方协议',()=>{const {c}=fixture(1);vm.runInContext(`(function(){const CONFIG={level:8,world:'错误世界'};var s=WL.readSave(CONFIG.level);WL.addItem(s,{id:'x',name:'灯',type:'light'});WL.addClue(s,'线索');globalThis.completed=WL.completeLevel(CONFIG,s,{nextUrl:'wrong',exitHook:'wrong'});})();`,c);assert.equal(c.completed.level,3);assert.equal(c.completed.prev_world,'本关世界');});
test('沙盒存储只持有本游戏种子，写入消息不会包含管理口令',()=>{const {c,messages}=fixture(0,{saved:'progress'});assert.equal(c.localStorage.getItem('saved'),'progress');c.localStorage.setItem('new','state');assert.equal(c.localStorage.length,2);assert.ok(messages.find(m=>m.type==='iw-storage'&&m.key==='new'));assert.equal(c.localStorage.getItem('iw-admin-key'),null);c.localStorage.clear();assert.equal(c.localStorage.length,0);});
test('元数据中的script闭合标签无法逃出注入脚本',()=>{const code=makeBridge({world:'</script><script>alert(1)</script>'},{});assert.doesNotMatch(code,/<\/script>/);assert.match(code,/\\u003c/);assert.ok(injectBridge('<html><head></head></html>',{},{}).includes('<head><script>'));});
test('上传内容的响应强制沙盒、禁止同源与表单并隔离管理页面',()=>{const h=gameHeaders('text/html',true);assert.match(h['Content-Security-Policy'],/sandbox allow-scripts;/);assert.doesNotMatch(h['Content-Security-Policy'],/allow-same-origin|allow-top-navigation/);assert.match(h['Content-Security-Policy'],/form-action 'none'/);assert.equal(h['Cache-Control'],'no-store');});
console.log(passed+' 项云端平台核心检查通过。');
