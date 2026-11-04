// Run against local preview only. It creates synthetic submissions and routes.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { zipSync, strToU8 } from 'fflate';

const base = process.argv[2] || 'http://127.0.0.1:4180';
if (!['127.0.0.1', 'localhost'].includes(new URL(base).hostname)) throw Error('Synthetic checks are local only.');
const vars = Object.fromEntries(fs.readFileSync('.dev.vars', 'utf8').split(/\r?\n/).filter(Boolean).map((line) => {
  const i = line.indexOf('=');
  return [line.slice(0, i), line.slice(i + 1)];
}));
let passed = 0;
let id;
let externalId;
let publishedRouteId;
const externalUrl = base + '/?source=external#relay-target';

async function test(name, fn) {
  await fn();
  console.log('通过：' + name);
  passed++;
}

async function req(path, options = {}, kind = 'none') {
  const headers = new Headers(options.headers);
  if (kind === 'admin') headers.set('x-admin-key', vars.ADMIN_KEY);
  if (kind === 'team') headers.set('x-upload-code', vars.UPLOAD_CODE);
  const response = await fetch(base + '/api/' + path, { ...options, headers });
  return { status: response.status, data: await response.json() };
}

const post = (path, body, kind = 'admin') => req(path, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
}, kind);

function metadata() {
  return {
    team: '自动验收测试队',
    title: '权限与隔离回归样例',
    world: '测试世界',
    description: '仅用于本机验证，非正式作品。',
    exitHook: '测试结束。',
    entry: 'index.html',
  };
}

function form(files) {
  const body = new FormData();
  for (const [key, value] of Object.entries(metadata())) body.set(key, value);
  body.set('file', new File([zipSync(files)], 'test.zip', { type: 'application/zip' }));
  return body;
}

function externalForm() {
  const body = new FormData();
  for (const [key, value] of Object.entries(metadata())) body.set(key, value);
  body.set('mode', 'url');
  body.set('externalUrl', externalUrl);
  return body;
}

await test('没有管理口令不能审核、发布、生成待验收试玩链接', async () => {
  for (const path of ['admin/check', 'admin/review', 'admin/publish', 'admin/preview']) {
    assert.equal((await post(path, {}, 'none')).status, 401);
  }
});

await test('无上传邀请码不能投稿', async () => {
  assert.equal((await req('upload', { method: 'POST', body: form({ 'index.html': strToU8('<html></html>') }) })).status, 401);
});

await test('拒绝跨站写入，即使携带管理凭据', async () => {
  assert.equal((await req('admin/check', { method: 'POST', headers: { Origin: 'https://another.example' } }, 'admin')).status, 403);
});

await test('选手邀请码可上传，作品真实保存为待验收', async () => {
  const result = await req('upload', { method: 'POST', body: form({ 'index.html': strToU8('<html><body>test</body></html>') }) }, 'team');
  assert.equal(result.status, 201);
  assert.equal(result.data.status, 'pending');
  assert.equal(result.data.hasRelay, false);
  id = result.data.id;
});

await test('公众列表看不到待验收作品，管理员能看到', async () => {
  assert.ok(!(await req('state')).data.games.some((game) => game.id === id));
  assert.ok((await req('state', {}, 'admin')).data.games.some((game) => game.id === id));
});

await test('缺少接力接口不能直接通过验收', async () => {
  assert.equal((await post('admin/review', { id, status: 'approved' })).status, 400);
});

await test('主办方可试玩待验收作品，签名错误会被拒绝', async () => {
  const result = await post('admin/preview', { id });
  assert.equal(result.status, 200);
  const html = await fetch(base + result.data.url);
  assert.equal(html.status, 200);
  assert.match(await html.text(), /iw-storage/);
  assert.match(html.headers.get('content-security-policy'), /sandbox allow-scripts/);
  const wrong = new URL(result.data.url, base);
  wrong.pathname = wrong.pathname.replace(/\d+-[a-f0-9]{64}/, '0-bad');
  assert.equal((await fetch(wrong)).status, 403);
});

await test('路径穿越压缩包被拒绝，不新增记录', async () => {
  const before = (await req('state', {}, 'admin')).data.games.length;
  assert.equal((await req('upload', { method: 'POST', body: form({ '../index.html': strToU8('bad') }) }, 'team')).status, 400);
  assert.equal((await req('state', {}, 'admin')).data.games.length, before);
});

await test('未通过的作品与重复关卡不能进入路线', async () => {
  assert.equal((await post('admin/publish', { title: 'bad', ids: [id] })).status, 400);
  assert.equal((await post('admin/publish', { title: 'bad', ids: [id, id] })).status, 400);
});

await test('正式路线、游戏HTML和素材可从云端存储读取', async () => {
  const state = (await req('state')).data;
  const route = state.routes.find((item) => item.stages.some((stage) => stage.world === '废土集市'));
  assert.ok(route);
  const slot = route.stages.findIndex((stage) => stage.world === '废土集市');
  const game = route.stages[slot];
  const path = '/play/' + route.id + '/' + slot + '/' + game.entry_path;
  const html = await fetch(base + path);
  assert.equal(html.status, 200);
  assert.match(await html.text(), /主办方|readSave/);
  const css = await fetch(base + path.replace(/index\.html$/, 'style.css'));
  assert.equal(css.status, 200);
  assert.match(css.headers.get('content-type'), /text\/css/);
});

await test('B轨外部URL可投稿并进入待验收队列', async () => {
  const result = await req('upload', { method: 'POST', body: externalForm() }, 'team');
  assert.equal(result.status, 201);
  assert.equal(result.data.status, 'pending');
  assert.equal(result.data.hasRelay, false);
  externalId = result.data.id;
  const game = (await req('state', {}, 'admin')).data.games.find((item) => item.id === externalId);
  assert.equal(game.externalUrl, externalUrl);
});

await test('外链作品预览直接使用投稿地址', async () => {
  const result = await post('admin/preview', { id: externalId });
  assert.equal(result.status, 200);
  assert.equal(result.data.url, externalUrl);
});

await test('人工试玩后可强制验收ZIP与外链作品', async () => {
  assert.equal((await post('admin/review', { id, status: 'approved', force: true, note: '人工试玩确认。' })).status, 200);
  assert.equal((await post('admin/review', { id: externalId, status: 'approved', force: true, note: '人工试玩确认。' })).status, 200);
});

await test('自动路线包含人工验收且未检测到接口的作品', async () => {
  const route = (await req('state')).data.routes[0];
  assert.ok(route.stages.some((stage) => stage.id === id));
  assert.ok(route.stages.some((stage) => stage.id === externalId && stage.external_url === externalUrl));
});

await test('手动路线保留外链且可作为ZIP关卡的下一关', async () => {
  const published = await post('admin/publish', { title: '双轨接口回归', ids: [id, externalId] });
  assert.equal(published.status, 201);
  publishedRouteId = published.data.id;
  const route = (await req('routes/' + publishedRouteId)).data;
  assert.equal(route.stages[1].external_url, externalUrl);
  const html = await fetch(base + '/play/' + publishedRouteId + '/0/index.html');
  assert.equal(html.status, 200);
  assert.ok((await html.text()).includes(externalUrl));
});

await test('外链关卡302重定向保留存档参数和原有查询参数', async () => {
  const response = await fetch(base + '/play/' + publishedRouteId + '/1/index.html?__iw_state=encoded-save&slot=1', { redirect: 'manual' });
  assert.equal(response.status, 302);
  const target = new URL(response.headers.get('location'));
  assert.equal(target.searchParams.get('source'), 'external');
  assert.equal(target.searchParams.get('__iw_state'), 'encoded-save');
  assert.equal(target.searchParams.get('slot'), '1');
  assert.equal(target.hash, '#relay-target');
});

await test('退回操作不影响已发布世界线快照', async () => {
  const before = (await req('routes/' + publishedRouteId)).data;
  assert.equal((await post('admin/review', { id, status: 'rejected', note: '本机自动验收已完成。' })).status, 200);
  assert.equal((await post('admin/review', { id: externalId, status: 'rejected', note: '本机自动验收已完成。' })).status, 200);
  assert.deepEqual((await req('routes/' + publishedRouteId)).data, before);
});

console.log(passed + ' 项本机云服务接口检查通过。');
