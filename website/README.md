# 无限世界 · 云端赛事大厅

网页游戏上传、主办方验收、世界线排序与一键连续游玩。后台运行在托管 Worker，关卡元数据及路线保存在 D1，上传资源保存在 R2；无需让主办方电脑持续开机。

## 使用

- 玩家：在大厅点击「开始完整旅程」。关卡间自动携带 SAVE_STATE v2 的生命、理智、道具、线索及旅程，最后进入统一结算。
- 选手：填写队名、世界、作品名、简介、出口钩子与入口路径，输入上传邀请码，提交 ZIP。投稿先进入待验收区。
- 主办方：输入独立管理员口令，试玩投稿、通过或退回；勾选已通过作品、上下调整顺序、编辑出口钩子并发布世界线。
- 路线发布生成不可变快照。后来修改顺序或审核状态，不改变旧路线中的关卡文件与顺序。

管理员口令与上传邀请码是不同权限。密钥仅在云端环境变量中配置，不放入浏览器代码或 Git。当前主办方持有的凭据文件在原工作区根目录，不属于本站源码。

## 支持的作品

静态 HTML/CSS/JS 浏览器游戏，以及常见图片、音频、视频、字体和 WASM 资源。不能运行 EXE、Python、PHP、Node 后台程序。ZIP 最大10MB，解压后最大30MB、250文件、单文件8MB。拒绝路径穿越、隐藏密钥和不支持的文件。

推荐入口与 shared/ 目录一同打包，例如：

```
my-world/index.html
my-world/game.js
my-world/style.css
shared/save-protocol.js
```

入口填写 `my-world/index.html`。ZIP只有一层共同根目录时会自动去掉。只有一个index.html时可自动识别。静态接口检查不能替代实际通关验收；作品应使用主办方 `WL.readSave` 和 `WL.completeLevel`。

平台在隔离 iframe 与响应 CSP 沙盒中运行作品，不授予同源访问管理页面或顶层跳转权限。它会在关卡运行时注入本线关序、上下家、下一关地址和主办方钩子。每个作品获得隔离的存储适配器，本机进度不会访问管理员口令。

## 存档范围

复制运行页的进度链接可在关卡交接点跨设备接力。关内状态取决于选手作品如何保存，平台只提供隔离的本机存储。历史世界线和已上传文件保持不变，公开访问范围由 Sites 配置控制。

## 本地验证与发布

```
npm run db:generate
node <Sites插件目录>/scripts/build-site.mjs
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_magical_moon_knight.sql
npm start -- --port 4180 --env-file <本机.dev.vars绝对路径>
node scripts/seed-demo.mjs http://127.0.0.1:4180
node scripts/test-core.mjs
node scripts/test-api.mjs http://127.0.0.1:4180
```

`.openai/hosting.json` 声明 DB / BUCKET 绑定。部署通过 Sites 源码与打包流程，数据库迁移在部署时应用；不要在请求里建表。云端环境变量需配置 `ADMIN_KEY` 和 `UPLOAD_CODE`，以 secret 存储。本地 `.dev.vars` 已被 Git 忽略。

`scripts/seed-demo.mjs` 通过真实上传、验收、发布API安装废土集市和幽冥戏班；远程的 Sites 服务访问凭据仅从隐藏stdin读入，不写文件或命令参数。重复执行会复用示例，避免反复生成投稿与路线。

内置示例：drizzle/0001_seed_worlds.sql 幂等创建两款主办方作品与初始世界线，lib/example-assets.ts 提供对应游戏文件。正式选手投稿仍由上传接口保存到 R2。
验证记录：核心 12 项、接口 11 项和 TypeScript 检查通过；拒绝请求前会有界收完未读取的小请求体，避免预览服务异常。云端 HTTP 核验被当前网络的 Cloudflare 访问防护阻止，部署与数据库状态通过 Sites 官方工具确认。

