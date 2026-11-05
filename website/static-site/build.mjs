import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve, posix} from 'node:path';
import {build} from 'vite';
import react from '@vitejs/plugin-react';
import {games, route} from './catalog.mjs';
import {exampleAssets} from '../lib/example-assets.ts';
import {officialProtocol} from '../lib/protocol.ts';
import {inlineGameAssets} from '../lib/inline-assets.mjs';
import {makeBridge, safeJSON} from '../lib/portal-core.mjs';

const root = fileURLToPath(new URL('.', import.meta.url));
const project = resolve(root, '..');
const output = resolve(process.argv[2] || resolve(project, 'static-dist'));

function staticOverrides() {
  const catalog = resolve(root, 'catalog.mjs').replaceAll('\\', '/');
  const importCatalog = `import {staticRequest,staticDocument} from ${JSON.stringify(catalog)};\n`;
  return {
    name: 'infinite-worlds-static',
    enforce: 'pre',
    transform(code, id) {
      const file = id.replaceAll('\\', '/');
      if (file.endsWith('/app/ui.tsx')) {
        return importCatalog + code
          .replace(/const request=useCallback[^\n]+/, 'const request=useCallback(staticRequest,[]);')
          .replace('TABS.map(t=>', "TABS.filter(t=>t.id==='home'||t.id==='games').map(t=>")
          .replace('href="/"', 'href="./index.html"')
          .replaceAll('href="/participant-delivery-kit-v2.zip"', 'href="./participant-delivery-kit-v2.zip"')
          .replace('<button className="subtle-button"', '<button hidden className="subtle-button"')
          .replace('<button aria-label="主办方登录"', '<button hidden aria-label="主办方登录"')
          .replace('上传一关，连接所有可能','从这里开启接力旅程')
          .replace('云端托管','离线可玩')
          .replace("'/run/'+active.id", "'./index.html?run='+active.id")
          .replace(/<button className="button outline" onClick=\{\(\)=>setTab\('upload'\)\}>[^<]*<Upload[^>]*\/>提交我的关卡<\/button>/, '')
          .replace("{tab==='home'&&<button className=\"add-world\"", "{false&&<button className=\"add-world\"")
          .replace("setSrc(u.origin===location.origin?u.pathname+u.search:u.href)", 'setSrc(u.href)')
          .replace('new URL(url,location.origin)', 'new URL(url,location.href)')
          .replace('src={src}', 'srcDoc={staticDocument(url,context)}')
          .replace("pathname.split('/')[2]", "searchParams.get('run')")
          .replace('连接云端中', '正在读取作品')
          .replace('云端已连接', '静态游玩版')
          .replace('参赛与接力指南', '接力指南');
      }
      if (file.endsWith('/app/journey-entries.tsx')) {
        return code.replace("'/run/'+r.id", "'./index.html?run='+r.id");
      }
      if (file.endsWith('/app/run/[id]/run.tsx')) {
        return importCatalog + code
          .replace(/async function request\(path:string,body\?:unknown\)\{[^]*?\n\}/, 'const request=staticRequest;')
          .replace("'/play/'+id+'/'+state.step+'/'", "'./games/route/'+state.step+'/'")
          .replace("import Link from 'next/link';", '')
          .replaceAll('<Link ', '<a ').replaceAll('</Link>', '</a>')
          .replaceAll('href="/"', 'href="./index.html"')
          .replace("fetch('/api/routes/'+id).then(async r=>{const data=await r.json() as any;if(!r.ok)throw Error(data.error);", "staticRequest('routes/'+id).then((data:any)=>{")
          .replace("'/play/'+routeId+'/'+slot+'/'", "'./games/route/'+slot+'/'")
          .replace('location.origin);','location.href);')
          .replace('return url.origin===location.origin?url.pathname+url.search:url.href;', 'return url.href;')
          .replaceAll("'/run/'+id+'?'+", "'./index.html?run='+id+'&'+")
          .replace('crypto.randomUUID()', "(crypto.randomUUID?.() || Date.now().toString(36)+'-'+Math.random().toString(36).slice(2))");
      }
    },
  };
}

const pages={};
for(const [slot,game] of games.entries()){
 const bundle=exampleAssets[game.id];
 const page=await inlineGameAssets(bundle[game.entry],async reference=>{
  const path=posix.normalize(posix.join(posix.dirname(game.entry),reference.split(/[?#]/)[0]));
  return path==='shared/save-protocol.js'?officialProtocol:bundle[path]??null;
 });
 const context={routeId:route.id,slot,gameId:game.id,world:game.world,prevWorld:slot?games[slot-1].world:'主神大厅',nextWorld:games[slot+1]?.world||'终局结算',exitHook:game.exitHook,nextUrl:'#finished'};
 const bridge=makeBridge(context).replace('('+safeJSON(context)+',{});','(window.__iw_staticContext||'+safeJSON(context)+',{});');
 pages[game.id]=page.replace(/<head\b[^>]*>/i,head=>head+'<script>'+bridge+'</script>');
}
await writeFile(resolve(root,'game-pages.mjs'),'export const pages='+JSON.stringify(pages)+';');
await build({
  configFile: false, root, base: './', publicDir: resolve(project, 'public'),
  plugins: [staticOverrides(), react()],
  build: {outDir: output, emptyOutDir: true},
});

const landing = resolve(output, 'index.html');
const html = await readFile(landing, 'utf8');
await writeFile(landing, html
  .replace('type="module" crossorigin', 'defer')
  .replace('rel="stylesheet" crossorigin', 'rel="stylesheet"'));

async function emitGame(game, slot, demo) {
  const bundle = exampleAssets[game.id];
  const prefix = demo ? 'demo/' + game.id : 'route/' + slot;
  const page = await inlineGameAssets(bundle[game.entry], async reference => {
    const path = posix.normalize(posix.join(posix.dirname(game.entry), reference.split(/[?#]/)[0]));
    return path === 'shared/save-protocol.js' ? officialProtocol : bundle[path] ?? null;
  });
  const next = route.stages[slot + 1];
  const context = {
    routeId: demo ? 'preview' : route.id, slot: demo ? 0 : slot, gameId: game.id,
    world: game.world, prevWorld: !demo && slot ? route.stages[slot - 1].world : '主神大厅',
    nextWorld: !demo && next ? next.world : '终局结算', exitHook: game.exitHook,
    nextUrl: demo ? '../../finish.html' : next ? '../../' + (slot + 1) + '/' + next.entry_path : '../../finish.html',
  };
  const bridge = makeBridge(context).replace('seed={};', 'seed=(()=>{try{return JSON.parse(new URLSearchParams(location.search).get("__iw_state")||"{}")}catch{return {}}})();');
  const dir = resolve(output, 'games', prefix);
  for (const [name, content] of Object.entries(bundle)) {
    await mkdir(resolve(dir, posix.dirname(name)), {recursive: true});
    await writeFile(resolve(dir, name), name === game.entry
      ? page.replace(/<head\b[^>]*>/i, head => head + '<script>' + bridge + '</script>')
      : content);
  }
}
for (const [slot, game] of games.entries()) {
  await emitGame(game, slot, false);
  await emitGame(game, slot, true);
}
await writeFile(resolve(output, 'games/finish.html'), '<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>旅程完成</title><body style="background:#14252d;color:#edf3dc;font:18px system-ui;text-align:center;padding:15vh"><h1>旅程已完成</h1></body></html>');
await writeFile(resolve(output, '.nojekyll'), '');
