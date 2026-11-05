# 无限世界 · 赛事大厅

- website/ 是完整平台源码。独立部署时配置自己的 D1、R2 绑定及运行时 ADMIN_KEY、UPLOAD_CODE。迁移按 0000 至 0003 顺序执行。
- docs/ 是静态试玩版，可以托管在任意子目录，也可在 Chrome/Edge 离线打开 index.html。静态版进度保存在本机浏览器。
- participant-delivery-kit-v2/ 是对齐后的选手交付包，包含协议、模拟器、种子卡、最小示例和引擎脚手架。

完整平台的正式旅程使用服务器进度，网址只带 runId、step。管理员可在接线控制台配置初始状态、关序和出口钩子。验收作品仍会自动接入唯一一条无限世界。当前关卡和初始配置保存在路线快照，修改配置不会改写已经开始的旅程。

[参赛团队 5 分钟接入指南](<participant-delivery-kit-v2/参赛团队 5 分钟接入指南.md>) · [平台侧对齐说明](平台侧对齐说明.md)

复建静态版时，在 website/ 安装依赖，执行 node --experimental-strip-types static-site/build.mjs ../docs。
复核平台逻辑时，在 website/ 执行 node --experimental-strip-types scripts/test-alignment.mjs（需 Node 24），以及 node scripts/test-core.mjs。
