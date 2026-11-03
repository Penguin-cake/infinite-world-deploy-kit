import fs from 'node:fs';
const cfg=JSON.parse(fs.readFileSync('deployment.json','utf8'));
if(!/^[a-z0-9-]+$/.test(cfg.name)||!cfg.database_id||cfg.database_id.includes('REPLACE')||!cfg.bucket_name||!cfg.database_name)throw Error('请先填写 deployment.json 的独立部署资源信息');
const p='dist/server/wrangler.json';
const worker=JSON.parse(fs.readFileSync(p,'utf8'));
worker.name=cfg.name;worker.d1_databases=[{binding:'DB',database_name:cfg.database_name,database_id:cfg.database_id}];
worker.r2_buckets=[{binding:'BUCKET',bucket_name:cfg.bucket_name}];
fs.writeFileSync(p,JSON.stringify(worker,null,2));
console.log('已更新构建产物的 DB / BUCKET 绑定，可使用 Wrangler 部署。');
