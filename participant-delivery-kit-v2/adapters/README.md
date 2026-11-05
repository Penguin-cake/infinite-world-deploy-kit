# 引擎接力脚手架

- **Unity WebGL**：把 `InfiniteWorldPlugin.jslib` 放到 `Assets/Plugins/WebGL/`。把 `InfiniteWorldBridge.cs` 挂到名为 `InfiniteWorldBridge` 的场景对象上。等 `SaveLoaded` 或 `CurrentSave` 就绪后读属性，通关时调用 `FinishLevel(hook, items, clues)`。
- **Godot 4 Web**：将 `InfiniteWorldBridge.gd` 加为同名 Autoload。读取 `current_save` 或监听 `save_loaded`，通关时调用 `complete_level(hook, items, clues)`。
- **Phaser**：将 `InfiniteWorldPhaserPlugin.ts` 加入项目。在游戏配置的 `plugins.global` 注册 `{key: 'InfiniteWorld', plugin: InfiniteWorldPlugin, start: true}`。在场景用 `this.plugins.get('InfiniteWorld')` 获取插件，读取 `save` 或等待游戏的 `save-ready` 事件，再调用 `completeLevel(hook, items, clues)`。

每个示例都提供失败交接方法。B 轨可只使用消息桥，A 轨如使用官方 WL 则将协议脚本随游戏打包。首次集成请用实际大厅的作品入口和完整世界线验证。
