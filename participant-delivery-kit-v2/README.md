# 无限世界接力黑客松 · 参赛团队官方交付包使用手册 (README)

欢迎参加 **「无限世界百人共创游戏接力黑客松」**！  
这是一场多元宇宙无限流接力：所有参赛队伍将共同接续同一位主角的命运。上一个世界的通关状态（生命值、理智、随身遗物与出口遗言）将原汁原味地交接到下一个世界。

本交付包是组委会为各参赛团队准备的**标准化接入工具箱**。无论你使用原生 HTML5、Godot、Unity 还是 Phaser 引擎开发，均可实现 **10 分钟极速接入协议并完成本地自测**。

---

## 📁 交付包目录结构总览

```text
participant-delivery-kit/
├── README.md                      # [本文档] 交付包全景使用指南
├── AGENT.md                       # [核心宪章] 关卡时长、双层道具规范、防破壁与AI提示词
├── 参赛团队 5 分钟接入指南.md      # [快速查阅] 字段速查表与 ZIP 投稿避坑手册
├── mock-runner.html               # [本地仿真器] 零依赖双击即用，模拟大赛主控大屏
├── seed-card.json                 # [初始种子卡] 初始主角属性示例（测试与第1棒入场用）
├── shared/
│   └── save-protocol.js           # [核心协议库] 跨关卡状态读取、道具注入与交接逻辑
├── adapters/                      # [引擎适配器] 主流游戏引擎开箱即用脚手架
│   ├── unity/                     # Unity WebGL 桥接脚本 (.cs 与 .jslib)
│   ├── godot/                     # Godot 4 全局单例桥接脚本 (.gd)
│   └── phaser/                    # Phaser 3 场景插件 (.ts)
└── examples/
    └── 01-minimal-html5-level/    # [官方范例关卡] 最小原生 HTML5 完整接力演示关卡
```

---

## 🛠️ 核心文件与工具使用指南

### 1. 核心协议库：`shared/save-protocol.js`

#### 📌 是什么？
大赛官方通信协议（SAVE_STATE v3）的纯 JavaScript 实现，处理主控大屏与游戏关卡 iframe 之间的 `postMessage` 状态同步、数据防篡改校验以及出入口卡片交接。

#### 💻 怎么用？
在你的游戏入口页面 `index.html` 的 `<head>` 或 `<body>` 最顶部引入：
```html
<script src="shared/save-protocol.js"></script>
```

#### 🔑 必须掌握的 4 个 API：

```javascript
// 1. 开局读取上一棒传来的主角状态（严禁写死满血！）
const save = WL.readSave();
console.log("当前生命:", save.player.hp);          // 1 ~ 3
console.log("当前理智:", save.player.sanity);      // 0 ~ 3
console.log("上一棒战利品:", save.inventory.items); // 继承自上个世界的道具
console.log("上一棒收尾遗言:", save.narrative.lastHook);

// 2. 关卡内阵亡逻辑
if (currentHp <= 0) {
  // 方式 A：就近快速复活（适合轻度阵亡，不扣减全局属性）
  WL.respawn();
  
  // 方式 B：主角力竭彻底认输，把遗物传给下一位“继承者”
  WL.failLevel("力竭倒在机械守卫脚下");
  return;
}

// 3. 通关时添加通用战利品（必须符合自描述词条规范，详见 AGENT.md）
WL.addItem(save, {
  id: "item_cyber_battery",
  name: "高能超导电池",
  type: "tool",
  desc: "从废弃能源站拆卸下来的电池，可为下一关设备供能",
  effect: { stat: "attack", value: 1, trigger: "passive" }
});

// 4. 通关交付：提交关卡状态，触发穿越跳转
WL.completeLevel(window.__CONFIG__ || {}, save, {
  exitHook: "他推开沉重的气闸门，前方是一片被霓虹灯染红的雨夜都市...",
  nextUrl: window.__CONFIG__?.nextUrl
});
```

---

### 2. 多引擎适配器：`adapters/`

如果你使用专业游戏引擎，无需手动编写底层的浏览器通信，直接使用对应目录下的桥接脚本即可：

#### 🎮 Unity WebGL (`adapters/unity/`)
1. 将 `InfiniteWorldPlugin.jslib` 拷贝到你的 Unity 工程目录：`Assets/Plugins/WebGL/`。
2. 将 `InfiniteWorldBridge.cs` 挂载到场景中的一个常驻 GameObject 上（如 `GameManager`）。
3. 在 C# 脚本中调用：
   ```csharp
   // 读取初始存档
   SaveData save = InfiniteWorldBridge.Instance.ReadSave();
   int hp = save.player.hp;

   // 关卡通关交付
   InfiniteWorldBridge.Instance.CompleteLevel(
       exitHook: "主角穿过了传送光门...",
       rewardItemId: "item_magic_wand",
       rewardItemName: "炽炎法杖",
       rewardStat: "attack",
       rewardVal: 1
   );
   ```

#### 🤖 Godot 4 (`adapters/godot/`)
1. 将 `InfiniteWorldBridge.gd` 放入你的 Godot 项目（例如 `res://scripts/`）。
2. 在 **项目设置 -> 全局加载 (AutoLoad)** 中将其注册为单例 `InfiniteWorld`。
3. 在 GDScript 中调用：
   ```gdscript
   func _ready():
       var save = InfiniteWorld.read_save()
       print("入场生命值: ", save.player.hp)

   func _on_level_clear():
       InfiniteWorld.add_item({
           "id": "relic_gem",
           "name": "虚空原石",
           "type": "token",
           "desc": "蕴含神秘能量的晶石",
           "effect": { "stat": "sanity", "value": 1, "trigger": "on_enter" }
       })
       InfiniteWorld.complete_level("推开通往未知的大门...")
   ```

#### ⚡ Phaser 3 (`adapters/phaser/`)
1. 在场景中引入 `InfiniteWorldPhaserPlugin.ts`。
2. 在场景 `create()` 生命周期中直接读取并绑定通关事件。

---

### 3. 本地大屏沙盒仿真器：`mock-runner.html`

#### 📌 是什么？
这是一个**完全免环境、单文件**的比赛主控端沙盒仿真器。  
现场比赛时，主办方是在一个大屏主控网页内通过 `iframe` 加载选手的游戏。`mock-runner.html` 让你在本地电脑上就能 100% 还原这个运行环境！

#### 🚀 怎么使用？
1. **直接双击**：在任意现代浏览器（Chrome、Edge、Firefox 等）中双击打开 `mock-runner.html`。
2. **选择你的游戏入口**：
   - 方式 A（本地文件）：点击页面顶部的“选择本地关卡 HTML 文件”，选中你本地制作的 `index.html`。
   - 方式 B（本地服务器）：如果使用了 Vite / Webpack / Godot 本地预览，在 URL 输入框输入 `http://localhost:5173` 并点击“加载”。
3. **选择测试用小人状态**：
   - 仿真器顶部预设了多种典型开局：“标准开局”、“1点残血极限抗压”、“理智归零疯狂状态”、“携带前人攻击武器”。
4. **实时验收**：
   - 在左侧 iframe 中试玩你的关卡。
   - 当你在关卡内通关或阵亡时，右侧面板会**实时捕获通信事件**，自动校验数据结构是否合法、通用道具词条是否合规，并给出直观的通过/失败提示。

---

### 4. 初始种子主角卡：`seed-card.json`

#### 📌 是什么？
比赛世界线第 1 棒（开局关卡）出场时，主角的初始标准档案。

#### 📄 字段内容包含：
- `player.hp: 3`（满血初始）
- `player.sanity: 3`（神智清醒）
- `player.buffs: []`（无诅咒状态）
- `inventory.items: []`（初始背包空）
- `narrative.journey: []`（旅程刚刚开启）

#### 💡 如何使用？
1. **第 1 棒开局队伍**：在本地离线开发时，可直接读取本文件作为默认 fallback 状态。
2. **所有队伍的自测试用例**：建议大家复制此文件修改测试，例如故意把 `hp` 改为 `1`，测试关卡在主角开局残血时是否能正常通关、是否没有设置无解的开门杀。

---

### 5. 最小范例关卡：`examples/01-minimal-html5-level/`

这是一个由纯原生 HTML5 + Canvas 编写的极简迷宫接力关卡：
- 文件仅包含 `index.html`，代码量仅 100 余行。
- 展示了如何自适应上一棒的生命值与理智、拾取关卡内临时道具、胜利后带出通用战利品并交付全流程。
- 你可以直接用 `mock-runner.html` 打开它体验效果，也可以直接在此代码基础上复制修改！

---

## 📋 提交作品前的必检清单 (Checklist)

在将关卡打包提交给主办方前，请逐一核对以下事项：

- [ ] **时长控制**：正常通关时长是否在 **90 秒 ～ 150 秒** 之间（最长不超过 3 分钟）？
- [ ] **自适应主角**：若主角只剩 1 点生命值进场，前 5 秒是否拥有安全区？关卡是否仍有可能通关？
- [ ] **道具合规**：跨关带出的道具是否为 **1 ~ 3 件**？是否在 `effect.stat` 中正确绑定了通用词条？
- [ ] **无卡死保底**：主角力竭阵亡后，是否提供了复活或 `WL.failLevel()` 认输交接，严禁死循环黑屏卡死！
- [ ] **叙事沉浸**：剧情与台词是否**无恶搞破甲破壁**内容？是否留下承上启下的出口悬念？
- [ ] **版权合规**：关卡使用的背景音乐是否为 CC0、免版税商用库或 AI 原创？（**严禁使用商业版权流行歌曲**）。
- [ ] **打包格式**：ZIP 压缩包根目录是否直接包含 `index.html`？压缩包体积是否 **≤ 50MB**？

---

祝各位开发者玩得开心，期待在现场大屏见证你们创造的奇迹世界！🚀
