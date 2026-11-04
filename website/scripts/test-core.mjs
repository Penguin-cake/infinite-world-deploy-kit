import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import { zipSync, strToU8 } from 'fflate';
import { inspectZip, validateMeta, makeBridge, injectBridge, gameHeaders, PortalError } from '../lib/portal-core.mjs';

let passed = 0;
function test(name, fn) {
  fn();
  console.log('通过：' + name);
  passed++;
}

const html = strToU8('<!doctype html><html><head></head><body><script src="game.js"></script></body></html>');
const script = strToU8('var save=WL.readSave(CONFIG.level);function finish(){WL.completeLevel(CONFIG,save,{})}');
const good = () => zipSync({ 'entry/index.html': html, 'entry/game.js': script });

test('普通 ZIP 自动去除共同根目录并识别入口与接力接口', () => {
  const pack = inspectZip(good());
  assert.equal(pack.entry, 'index.html');
  assert.equal(pack.fileCount, 2);
  assert.equal(pack.hasRelay, true);
});
test('保留复杂目录，显式入口可引用上传包里的共享库', () => {
  const pack = inspectZip(zipSync({ 'world/index.html': html, 'world/game.js': script, 'shared/save-protocol.js': strToU8('official') }), 'world/index.html');
  assert.ok(pack.files['shared/save-protocol.js']);
});
test('仅打包协议库但作品没有调用，只产生提醒标记', () => {
  const pack = inspectZip(zipSync({ 'index.html': html, 'shared/save-protocol.js': script }));
  assert.equal(pack.hasRelay, false);
  assert.equal(pack.entry, 'index.html');
});
test('接受 Godot、Unity 等引擎常用二进制资源', () => {
  const pack = inspectZip(zipSync({ 'index.html': html, 'game.js': script, 'engine.wasm': new Uint8Array([0, 97, 115, 109]), 'world.pck': new Uint8Array([1]), 'world.data': new Uint8Array([2]), 'world.mem': new Uint8Array([3]) }));
  assert.equal(pack.fileCount, 6);
});
test('拒绝路径穿越、Windows路径、编码路径、隐藏密钥和可执行文件', () => {
  for (const name of ['../a.html', 'C:/a.html', 'a\\b.html', '%2e%2e/a.html', '.env', 'x.exe', '.git/config']) {
    assert.throws(() => inspectZip(zipSync({ [name]: html })), PortalError);
  }
});
test('拒绝损坏压缩包、缺失入口及超过 1000 文件的压缩包', () => {
  assert.throws(() => inspectZip(new Uint8Array([1, 2, 3])));
  assert.throws(() => inspectZip(zipSync({ 'x.js': script })));
  const files = { 'index.html': html };
  for (let i = 0; i < 1000; i++) files['f' + i + '.js'] = script;
  assert.throws(() => inspectZip(zipSync(files)), /1000/);
});
test('单文件超过 35 MB 时在解压前按声明体积拒绝', () => {
  assert.throws(() => inspectZip(zipSync({ 'index.html': html, 'big.txt': new Uint8Array(35 * 1024 * 1024 + 1) })), /35 MB/);
});
test('投稿必填与长度约束在服务端生效', () => {
  assert.throws(() => validateMeta({}));
  assert.throws(() => validateMeta({ team: 'a'.repeat(41) }));
  assert.equal(validateMeta({ team: '队伍', title: '作品', world: '世界', description: '简介', exitHook: '钩子' }).world, '世界');
});

const protocol = fs.readFileSync('../../shared/save-protocol.js', 'utf8');
function fixture(slot = 0, seed = {}) {
  const messages = [];
  const listeners = {};
  const ctx = {
    slot,
    routeId: 'route-one',
    gameId: 'game-one',
    world: '本关世界',
    prevWorld: '上家世界',
    nextWorld: '下家世界',
    nextUrl: '/play/route-one/' + (slot + 1) + '/index.html',
    exitHook: '主办方调整的出口钩子',
  };
  const c = {
    Buffer,
    console,
    location: { href: 'https://portal.test/play/route-one/0/index.html', search: '', reload() {} },
    parent: { postMessage: (m) => messages.push(m) },
    addEventListener(type, fn) {
      (listeners[type] ||= []).push(fn);
    },
  };
  c.window = c;
  c.globalThis = c;
  vm.createContext(c);
  vm.runInContext(makeBridge(ctx, seed), c);
  vm.runInContext(protocol, c);
  const emit = (type, event = {}) => {
    for (const fn of listeners[type] || []) fn(event);
  };
  return { c, messages, ctx, emit };
}

test('注入桥接会覆盖全局CONFIG并调用真实协议生成正确关序、出口和旅程', () => {
  const { c, messages } = fixture(2);
  vm.runInContext(`var CONFIG={level:99,world:'旧世界',nextUrl:'wrong'};var s=WL.readSave(99);WL.addItem(s,{id:'key',name:'钥匙',type:'key'});WL.addClue(s,'线索');var result=WL.completeLevel(CONFIG,s,{exitHook:'旧钩子',nextUrl:'wrong'});`, c);
  assert.equal(c.CONFIG.level, 3);
  assert.equal(c.CONFIG.nextWorld, '下家世界');
  assert.equal(c.result.schema, 'v3');
  assert.equal(c.result.level, 4);
  assert.equal(c.result.exit_hook, '主办方调整的出口钩子');
  assert.equal(c.result.prev_world, '本关世界');
  assert.equal(c.WL.readHistory().length, 1);
  assert.equal(messages.filter((m) => m.type === 'iw-save').length, 1);
  assert.ok(messages.some((m) => m.type === 'IW_COMPLETE'));
});
test('const局部CONFIG作品仍通过WL包装正确写出官方协议', () => {
  const { c } = fixture(1);
  vm.runInContext(`(function(){const CONFIG={level:8,world:'错误世界'};var s=WL.readSave(CONFIG.level);WL.addItem(s,{id:'x',name:'灯',type:'light'});WL.addClue(s,'线索');globalThis.completed=WL.completeLevel(CONFIG,s,{nextUrl:'wrong',exitHook:'wrong'});})();`, c);
  assert.equal(c.completed.level, 3);
  assert.equal(c.completed.prev_world, '本关世界');
});
test('v2 本地存档与旅程可宽容迁移为 v3', () => {
  const { c } = fixture();
  c.localStorage.setItem('wuxianliu_save_v2', JSON.stringify({ schema: 'v2', level: 2, player: { hp: 1, sanity: 1 }, items: [{ id: 'old', name: '旧钥匙', type: 'key' }], clues: ['旧线索'] }));
  c.localStorage.setItem('wuxianliu_history_v2', JSON.stringify([{ level: 1, world: '旧世界', hook: '旧结局' }]));
  const save = c.WL.readSave(2);
  assert.equal(save.schema, 'v3');
  assert.equal(save.player.hp, 1);
  assert.equal(save.player.max_hp, 3);
  assert.equal(save.player.status, 'normal');
  assert.deepEqual(Object.keys(save.tombstone), ['fallen_level', 'cause', 'epitaph']);
  assert.equal(c.WL.readHistory()[0].world, '旧世界');
});
test('死亡角色不能按成功通关，自动转换遗物、墓碑和满血二代', () => {
  const { c, messages } = fixture();
  vm.runInContext(`var CONFIG={level:1,world:'本关世界'};var dead=WL.readSave(1);WL.addItem(dead,{id:'lamp',name:'提灯',type:'light'});WL.addClue(dead,'死亡线索');WL.setPlayer(dead,{hp:0,status:'dead'});globalThis.failed=WL.completeLevel(CONFIG,dead,{nextUrl:'/next',exitHook:'不应作为成功结局'});`, c);
  assert.equal(c.failed.schema, 'v3');
  assert.equal(c.failed.level, 2);
  assert.equal(c.failed.player.hp, 3);
  assert.equal(c.failed.player.status, 'normal');
  assert.equal(c.failed.items[0].relic, true);
  assert.match(c.failed.items[0].name, /^前人的/);
  assert.equal(c.failed.tombstone.cause, '探索者生命耗尽');
  assert.match(c.failed.exit_hook, /遗物交接/);
  assert.ok(messages.some((m) => m.type === 'IW_FAIL'));
  assert.ok(messages.some((m) => m.type === 'IW_SAVE' && m.failure === true));
});
test('空背包失败也有保底遗物，跨代墓碑会保留', () => {
  const { c } = fixture();
  vm.runInContext(`var CONFIG={level:1,world:'本关世界',nextWorld:'下家世界'};var first=WL.failLevel('第一次失败');first.level=2;globalThis.second=WL.failLevel('第二次失败',first,CONFIG);`, c);
  assert.equal(c.second.items[0].id, 'relic_survival_knife');
  assert.equal(c.second.items[0].relic, true);
  assert.match(c.second.tombstone.epitaph, /第一次失败/);
  assert.match(c.second.tombstone.epitaph, /第二次失败/);
  assert.doesNotMatch(c.second.items[0].name, /前人的前人的/);
});
test('respawn 恢复进入本关时的快照而非死亡状态', () => {
  const { c } = fixture();
  vm.runInContext(`var initial=WL.readSave(1);WL.setPlayer(initial,{hp:0,status:'dead'});WL.addItem(initial,{id:'new',name:'新道具',type:'tool'});globalThis.restored=WL.respawn();`, c);
  assert.equal(c.restored.player.hp, 3);
  assert.equal(c.restored.player.status, 'normal');
  assert.equal(c.restored.items.length, 0);
});
test('IW_INIT_SAVE 与裁判指令别名可由核心库接收', () => {
  const { c, emit, messages } = fixture();
  emit('message', { data: { type: 'IW_INIT_SAVE', save: { schema: 'v2', level: 4, player: { hp: 0, status: 'dead' }, items: [], clues: [] } } });
  assert.equal(c.WL.readSave(4).schema, 'v3');
  emit('message', { data: { type: 'IW_ADMIN_COMMAND', action: 'heal_player' } });
  assert.equal(c.WL.readSave(4).player.hp, 3);
  assert.equal(c.WL.readSave(4).player.status, 'normal');
  emit('load');
  assert.ok(messages.some((m) => m.type === 'IW_READY'));
});
test('沙盒存储只持有本游戏种子，写入消息不会包含管理口令', () => {
  const { c, messages } = fixture(0, { saved: 'progress' });
  assert.equal(c.localStorage.getItem('saved'), 'progress');
  c.localStorage.setItem('new', 'state');
  assert.equal(c.localStorage.length, 2);
  assert.ok(messages.find((m) => m.type === 'iw-storage' && m.key === 'new'));
  assert.equal(c.localStorage.getItem('iw-admin-key'), null);
  c.localStorage.clear();
  assert.equal(c.localStorage.length, 0);
});
test('元数据中的script闭合标签无法逃出注入脚本', () => {
  const code = makeBridge({ world: '</script><script>alert(1)</script>' }, {});
  assert.doesNotMatch(code, /<\/script>/);
  assert.match(code, /\\u003c/);
  assert.ok(injectBridge('<html><head></head></html>', {}, {}).includes('<head><script>'));
});
test('游戏响应支持 worker，并隔离作品源、表单和顶层导航', () => {
  const headers = gameHeaders('text/html', true);
  const csp = headers['Content-Security-Policy'];
  assert.match(csp, /sandbox allow-scripts/);
  assert.doesNotMatch(csp, /allow-same-origin/);
  assert.doesNotMatch(csp, /allow-top-navigation/);
  assert.match(csp, /worker-src blob: https: http:/);
  assert.match(csp, /form-action 'none'/);
  assert.equal(headers['Cross-Origin-Opener-Policy'], 'same-origin');
  assert.equal(headers['Cross-Origin-Embedder-Policy'], 'credentialless');
  assert.equal(headers['Cross-Origin-Resource-Policy'], 'cross-origin');
  assert.equal(headers['Cache-Control'], 'no-store');
});

console.log(passed + ' 项云端平台核心检查通过。');
