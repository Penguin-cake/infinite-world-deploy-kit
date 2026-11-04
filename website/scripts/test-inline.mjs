import assert from 'node:assert/strict';import fs from 'node:fs';import {inlineGameAssets} from '../lib/inline-assets.mjs';
const files={'style.css':'body{color:red}','a.js':'window.first=1;','b.js':'window.second="</script>";'};
const html='<head><link rel="stylesheet" href="style.css"></head><script src="a.js"></script><script src="b.js"></script><script src="https://example.com/x.js"></script>';
const out=await inlineGameAssets(html,async p=>files[p]??null);
assert.match(out,/<style>body\{color:red\}<\/style>/);assert.ok(out.indexOf('window.first')<out.indexOf('window.second'));assert.ok(out.includes('<\\/script>'));assert.ok(out.includes('src="https://example.com/x.js"'));assert.ok(!out.includes('src="a.js"'));
for(const folder of ['wasteland-market','ghost-opera']){const base=new URL('../../../'+folder+'/',import.meta.url),doc=fs.readFileSync(new URL('index.html',base),'utf8');const bundled=await inlineGameAssets(doc,async p=>{try{return fs.readFileSync(new URL(p,base),'utf8')}catch{return null}});assert.ok(!/<script\b[^>]*\bsrc=/i.test(bundled));assert.ok(!/<link\b[^>]*rel="stylesheet"/i.test(bundled));assert.ok(bundled.includes('requestAnimationFrame'));}
console.log('通过：两款实际游戏的样式、协议和脚本均随 HTML 完整送达，执行顺序与脚本闭合转义正确。');
