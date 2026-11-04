/* 正式比赛只需根据接线表填写下列配置；世界签编号 05 不是本线关序。 */
var CONFIG = {
  level: 1,
  world: '废土集市',
  prevWorld: '主神大厅',
  nextWorld: '幽冥戏班',
  nextUrl: '../ghost-opera/index.html',
  passViaUrl: true
};

(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var esc = WL.escapeHtml;
  var canvas = $('game-canvas');
  var model = MarketModel;
  var renderer = new MarketRenderer(canvas, model.nodes, model.solids);
  var entry = WL.readSave(CONFIG.level);
  var fingerprint = WL.encodeCode(entry);
  var sessionKey = 'wasteland_market_session_v1';
  var state, save, logs = [], echo = '', finished = false, paused = false;
  var keys = {}, path = [], target = null, pendingNode = null, near = null;
  var lastTime = 0, saveTimer = 0, toastTimer = 0, currentEntity = null;
  var audioContext = null, soundOn = false, lastFootstep = 0;

  function freshState() {
    save = WL.normalize(JSON.parse(JSON.stringify(entry)), CONFIG.level);
    var tool = WL.consumeAny(save.items, 'tool');
    state = model.create(save, !!tool);
    echo = tool
      ? '你用从「' + (entry.prev_world || '上一个世界') + '」带来的「' + tool.name + '」帮守门人修好了推车。他送你 3 份废料作为谢礼。'
      : '没有工具也没关系。守门人递来一根撬棍和一小袋废料：「去找摊主聊聊，锈风从不拒绝空手的旅人。」';
    if (entry.player.hp === 0) echo += ' 水婆先替你包扎了伤口，你以 1 点生命重新站起。';
    logs = [{ time: '09:00', text: tool ? '旧世界的工具，换来了集市的第一份善意。' : '抵达锈风集市。先去看看中央的悬赏榜吧。' }];
  }

  function initialize() {
    freshState();
    try {
      var stored = JSON.parse(localStorage.getItem(sessionKey) || 'null');
      if (stored && stored.v === 1 && stored.fingerprint === fingerprint && stored.state && stored.state.player && stored.state.resources && stored.state.parts && Array.isArray(stored.state.salvaged) && Array.isArray(stored.logs) && !stored.finished) {
        state = stored.state;
        state.player.moving = false;
        save = WL.normalize(stored.relay, CONFIG.level);
        logs = stored.logs;
        echo = stored.echo || echo;
      }
    } catch (e) { /* 浏览器禁用存储或旧快照损坏时，仍可从上家入口游玩。 */ }
    $('opening-strip').innerHTML = WL.renderOpening(entry);
    $('echo-log').textContent = echo;
    $('entry-echo').textContent = (entry.exit_hook ? '「' + entry.exit_hook + '」\n\n' : '') + echo;
    $('intro-note').hidden = state.started;
    WL.mountDebug(save);
    $('debug-reset').onclick = confirmRestart;
    renderUI();
    if (state.dead) showGameOver();
    else if (state.repaired) showEnding();
  }

  function clockText() {
    var minutes = 9 * 60 + Math.floor(state.elapsed / 3);
    return String(Math.floor(minutes / 60)).padStart(2, '0') + ':' + String(minutes % 60).padStart(2, '0');
  }

  function persist() {
    if (finished) return;
    WL.setPlayer(save, { hp: state.hp, sanity: state.sanity });
    try {
      localStorage.setItem(sessionKey, JSON.stringify({ v: 1, fingerprint: fingerprint, state: state, relay: save, logs: logs, echo: echo, finished: false }));
      $('save-status').innerHTML = '<i></i> 旅程自动保存';
    } catch (e) {
      $('save-status').textContent = '此浏览器未开放本地存储';
    }
  }

  function addLog(text) {
    logs.unshift({ time: clockText(), text: text });
    logs = logs.slice(0, 18);
    renderUI();
  }

  function toast(text) {
    $('toast').textContent = text;
    $('toast').hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { $('toast').hidden = true; }, 3400);
  }

  function renderUI() {
    $('water-count').textContent = state.resources.water;
    $('scrap-count').textContent = state.resources.scrap;
    $('trust-count').textContent = state.resources.trust;
    $('hp').textContent = '♥ '.repeat(Math.min(8, state.hp)) + '♡ '.repeat(Math.max(0, 3 - state.hp));
    $('hp').setAttribute('aria-label', '生命 ' + state.hp);
    $('sanity').textContent = '理智 ' + state.sanity;
    $('clock').textContent = clockText();
    $('weather-text').textContent = state.flags.storm ? '扬沙 · 注意饮水' : '晴 · 东南风';
    var parts = [
      { id: 'oscillator', name: '寻回振荡器', icon: '▥', hint: '老莫 · 西北修理摊' },
      { id: 'cable', name: '换取铜线组', icon: '≋', hint: '阿锈 · 东北零件摊' },
      { id: 'battery', name: '找到蓄电池', icon: '▣', hint: '小满 · 东南帐篷' }
    ];
    var count = parts.filter(function (p) { return state.parts[p.id]; }).length;
    $('mission-progress').style.width = count / 3 * 100 + '%';
    $('objectives').innerHTML = parts.map(function (p) {
      return '<div class="objective ' + (state.parts[p.id] ? 'complete' : '') + '" title="' + p.hint + '"><span class="check">' + (state.parts[p.id] ? '✓' : '') + '</span><span>' + p.name + '</span><span class="objective-count">' + (state.parts[p.id] ? '1' : '0') + '/1</span></div>';
    }).join('');
    var bag = parts.filter(function (p) { return state.parts[p.id]; }).map(function (p) { return { name: p.name.slice(2), icon: p.icon }; });
    if (state.coil) bag.push({ name: '旧线圈 · 可与老莫交换', icon: '◎' });
    if (state.relic) bag.push({ name: '机械蜥蜴 · 废土纪念物', icon: '⌁' });
    save.items.forEach(function (item) { if (bag.length < 6) bag.push({ name: item.name + ' · 来自上一个世界', icon: '◇' }); });
    $('bag-count').textContent = bag.length + ' / 6';
    $('bag-grid').innerHTML = Array.from({ length: 6 }, function (_, i) {
      var item = bag[i];
      return '<div class="bag-slot ' + (item ? 'filled' : '') + '" title="' + esc(item ? item.name : '空位') + '" aria-label="' + esc(item ? item.name : '空位') + '">' + (item ? item.icon : '·') + (item ? '<span>1</span>' : '') + '</div>';
    }).join('');
    $('bag-caption').textContent = count === 3 ? '零件齐了。去北面的电台试试吧。' : state.coil ? '旧线圈，也许有人用得上。' : '轻装上路，也是一种勇气。';
    $('activity-log').innerHTML = logs.slice(0, 3).map(function (l) { return '<div class="log-entry"><time>' + esc(l.time) + '</time><span>' + esc(l.text) + '</span></div>'; }).join('');
    WL.setPlayer(save, { hp: state.hp, sanity: state.sanity });
    $('card-preview').innerHTML = WL.renderSaveCard(save, CONFIG.level, CONFIG.world);
    $('debug-json').textContent = WL.debug.json(save);
  }

  function closeDialog() {
    $('game-dialog').close();
    currentEntity = null;
    keys = {};
    canvas.focus({ preventScroll: true });
  }

  function openDialog(kicker, title, body, choices) {
    path = []; target = null; pendingNode = null; keys = {};
    state.player.moving = false;
    $('dialog-kicker').textContent = kicker;
    $('dialog-body').innerHTML = '<h2 id="dialog-title">' + esc(title) + '</h2>' + body;
    $('dialog-actions').innerHTML = '';
    (choices || []).forEach(function (choice) {
      var button = document.createElement('button');
      button.className = 'action-button' + (choice.featured ? ' featured' : '');
      button.innerHTML = '<span>' + esc(choice.label) + '</span>' + (choice.hint ? '<small>' + esc(choice.hint) + '</small>' : '');
      button.disabled = !!choice.disabled;
      if (choice.id) button.dataset.action = choice.id;
      button.onclick = choice.onClick || function () {
        var entity = currentEntity;
        var result = doAction(choice.id);
        if (!result.ok) return;
        if (state.dead) return;
        if (state.repaired) { showEnding(); return; }
        if (entity) openEntity(entity);
      };
      $('dialog-actions').appendChild(button);
    });
    if (!$('game-dialog').open) $('game-dialog').showModal();
  }

  function doAction(id) {
    if (finished) return { ok: false };
    var result = model.action(state, id);
    if (result.ok) {
      addLog(result.message);
      tone(id.indexOf('salvage') === 0 ? 'loot' : 'trade');
      if (id === 'bounty') WL.addClue(save, '悬赏榜背面刻着一组穿界频率：07-24-6。');
      if (id === 'oscillator_coil') WL.addClue(save, '老莫说：穿界频率 07-24-6，只有信任能让它稳定。');
    }
    toast(result.message || '这笔交换暂时做不了。');
    renderUI(); persist();
    if (state.dead) showGameOver();
    return result;
  }

  function openEntity(id) {
    var node = model.nodes.find(function (n) { return n.id === id; });
    if (!node || !state.started || state.dead || finished) return;
    if (node.kind === 'salvage') { doAction(id); return; }
    currentEntity = id;
    var r = state.resources;
    if (id === 'water') {
      openDialog('水婆 / 净水摊', '在这里，水比承诺更珍贵。', '<p class="character-quote">「喝一口再谈买卖吧，孩子。你要是没东西换，就帮我抽一会儿水。」</p><p>你可以用废料交换净水，也可以花一点时间帮忙抽水。行走和交易都会消耗时间；每 90 秒需要饮用 1 份净水。</p>', [
        { id: 'water_buy', label: '换两份净水', hint: '1 废料 → 2 净水', disabled: r.scrap < 1 },
        { id: 'pump', label: '帮忙抽水', hint: '+1 净水 · 花费 14 秒', featured: !r.water },
        { label: '把水壶收好，继续逛逛', onClick: closeDialog }
      ]);
    } else if (id === 'oscillator') {
      openDialog('老莫 / 旧物修理铺', state.parts.oscillator ? '旧东西，还能有新去处。' : '要让电台发声，先找回心跳。', '<p class="character-quote">「这枚振荡器还管用。拿三份废料来，或者——东边废料堆里的旧线圈，我找它很久了。」</p><p>旧线圈藏在集市东面的废料堆里。帮老莫找回来，他会记住你的这份心意。</p>', state.parts.oscillator ? [
        { label: '多谢了，老莫', onClick: closeDialog }
      ] : [
        { id: 'oscillator_coil', label: '用找回的旧线圈交换', hint: '1 旧线圈 · 声望 +1', disabled: !state.coil, featured: !!state.coil },
        { id: 'oscillator_scrap', label: '用废料交换振荡器', hint: '3 废料', disabled: r.scrap < 3 },
        { label: '我再去找找', onClick: closeDialog }
      ]);
    } else if (id === 'cable') {
      openDialog('阿锈 / 零件摊', state.parts.cable ? '这笔生意，做得不赖。' : '好铜线，要给值得的人。', '<p class="character-quote">「四份废料，不二价。嗯……如果你在集市帮过忙，两份也能谈。两壶水？那也成。」</p><p>完成中央悬赏、帮老莫找回线圈，或为小满送水，都能获得声望。熟人的价格，总会温柔一点。</p>', state.parts.cable ? [
        { label: '收好铜线，告辞', onClick: closeDialog }
      ] : [
        { id: 'cable_fair', label: '谈一笔熟人的买卖', hint: '2 废料 · 需声望 1', disabled: r.trust < 1 || r.scrap < 2, featured: r.trust >= 1 },
        { id: 'cable_full', label: '按原价交换铜线', hint: '4 废料', disabled: r.scrap < 4 },
        { id: 'cable_water', label: '用净水以物易物', hint: '2 净水', disabled: r.water < 2 },
        { label: '先去别处转转', onClick: closeDialog }
      ]);
    } else if (id === 'battery') {
      openDialog('小满 / 南边的帐篷', state.parts.battery ? '希望你能收到，明天的声音。' : '一块电池，两个人的明天。', '<p class="character-quote">「这块蓄电池是爸爸留下的。我们缺水……你能给我们两份净水吗？或者，三份废料也可以。」</p><p>给小满净水，可以得到蓄电池和 2 点声望。废土里的选择，总有买卖之外的分量。</p>', state.parts.battery ? [
        { label: '愿你们的水壶一直满着', onClick: closeDialog }
      ] : [
        { id: 'battery_water', label: '把两份净水递给小满', hint: '2 净水 · 声望 +2', disabled: r.water < 2, featured: r.water >= 2 },
        { id: 'battery_scrap', label: '用废料交换蓄电池', hint: '3 废料', disabled: r.scrap < 3 },
        { label: '等我一会儿', onClick: closeDialog }
      ]);
    } else if (id === 'board') {
      openDialog('悬赏榜 / 集市公告', '有些委托，值得多走几步。', '<span class="dialog-chip">公开悬赏</span><span class="dialog-chip">水是共同的财富</span><p class="character-quote">「净水泵缺少修补材料。交来三份废料，换四份净水；集市会记住帮忙的人。」</p><p>主线线索：老莫有振荡器，阿锈有铜线组，小满有蓄电池。凑齐三件后，去北面的穿界电台。</p><p class="dialog-small">公告背面有人刻着：07-24-6。旁边写了一句——别忘了留下一个信号。</p>', [
        { id: 'bounty', label: state.flags.bounty ? '净水泵已修好，悬赏已领取' : '完成净水泵悬赏', hint: '3 废料 → 4 净水 · 声望 +1', disabled: !!state.flags.bounty || r.scrap < 3, featured: !state.flags.bounty && r.scrap >= 3 },
        { label: '记下线索，继续探索', onClick: closeDialog }
      ]);
      if (!state.flags.readBoard) {
        state.flags.readBoard = true;
        WL.addClue(save, '悬赏榜背面刻着一组穿界频率：07-24-6。');
        addLog('看过悬赏榜：三名摊主，各有一件电台零件。'); persist();
      }
    } else if (id === 'camp') {
      openDialog('营火 / 短暂歇脚', '风在走，你可以歇一会儿。', '<p class="character-quote">「人只要还有一口水，就总能再往前走一点。」</p><p>喝一份净水，恢复 1 点生命。停在对话中时，时间暂停。</p>', [
        { id: 'rest', label: '在营火边喝水休息', hint: '1 净水 → 1 生命', disabled: r.water < 1 || state.hp >= Math.max(3, entry.player.hp), featured: state.hp < 3 && r.water > 0 },
        { label: '拍拍尘土，继续上路', onClick: closeDialog }
      ]);
    } else if (id === 'radio') {
      if (state.repaired) { showEnding(); return; }
      var ready = state.parts.cable && state.parts.battery && state.parts.oscillator;
      openDialog('穿界电台 / 北方旧站', ready ? '零件齐了。试着呼叫明天吧。' : '沉默的电台，等一个声音。', '<p class="character-quote">「……这里是……锈风……有……人……吗？」</p><p>电台还缺少振荡器、铜线组和蓄电池。把三件零件装回去，就能接通离开废土的世界线。</p><p class="dialog-small">下一世界：' + esc(CONFIG.nextWorld) + (CONFIG.nextWorld === '待接线世界' ? '（演示接入虚拟下家，正式比赛按接线表配置）' : '') + '</p>', [
        { id: 'repair', label: ready ? '装好零件，接通电台' : '还需要集齐三件零件', hint: ready ? '开启结局' : '收集进度见旅人日志', disabled: !ready, featured: ready },
        { label: '再去集市看看', onClick: closeDialog }
      ]);
    }
    currentEntity = id;
  }

  function showEnding() {
    currentEntity = null;
    if (!state.ending) {
      tone('win');
      openDialog('信号已接通 / A LITTLE HOPE', '原来，明天也可以交换。', '<p>电台里的杂音渐渐退去。集市的灯一盏盏亮起来，你听见了另一端的风声。</p><p class="character-quote">「旅人，能不能给后来的人，也留下一个信号？」</p><p>离开之前，你还可以选择给集市留下一份净水。</p>', [
        { label: '留一份净水，再向明天出发', hint: '净水 −1 · 余温结局', disabled: state.resources.water < 1, featured: true, onClick: function () { if (doAction('ending_kindness').ok) showEnding(); } },
        { label: '带着集市的信号继续上路', hint: '远行结局', onClick: function () { if (doAction('ending_leave').ok) showEnding(); } }
      ]);
      return;
    }
    var kind = state.ending === 'kindness';
    openDialog('旅程完成 / ' + (kind ? 'THE EMBER PACT' : 'THE NEXT FREQUENCY'), kind ? '你留下的水，长成了明天。' : '带着一缕信号，继续远行。', '<p>' + (kind ? '水婆把一枚刻着火种的铜牌放进你掌心。小满朝你挥手，集市的电台第一次播出了清晰的声音。' : '阿锈把一枚集市通行牌递给你。风穿过布棚，电台替你记住了这条来时的路。') + '</p><div class="result-stats"><div><b>' + state.resources.trust + '</b><span>收获声望</span></div><div><b>' + state.salvaged.length + '/6</b><span>探索废墟</span></div><div><b>' + Math.floor(state.elapsed / 60) + ':' + String(Math.floor(state.elapsed % 60)).padStart(2, '0') + '</b><span>旅途用时</span></div></div><p>随身带走：集市通行牌、信号提灯' + (state.resources.water > 0 ? '和封好的净水' : '') + '。你的道具和线索会通过主办方的接力存档，真实流入下一关。</p>', [
      { label: '保存旅程，进入下一世界', hint: '接力交接 →', featured: true, onClick: finish },
      { label: '再看一眼集市', onClick: closeDialog }
    ]);
    persist();
  }

  function finish() {
    if (finished || !state.repaired || !state.ending) return;
    if (!state.flags.rewards) {
      WL.addItem(save, { id: 'rustwind_pass', name: '锈风集市通行牌', type: 'token' });
      WL.addItem(save, { id: 'frequency_lantern', name: '穿界信号提灯', type: 'light' });
      if (state.resources.water > 0) WL.addItem(save, { id: 'sealed_market_water', name: '封好的废土净水', type: 'food' });
      WL.addClue(save, CONFIG.nextWorld === '幽冥戏班' ? '电台戏腔唱着：空位留客，脸谱归真，落幕莫回头。信号提灯靠近朱门时泛起青光。' : '穿界电台的稳定频率是 07-24-6；信号提灯能引出同一频率的门。');
      WL.addClue(save, state.ending === 'kindness' ? '锈风集市相信：给后来者留下水的人，能被火种铜牌认出。' : '通行牌背面写着：遇见陌生的门，先听一听门后的电台声。');
      state.flags.rewards = true;
    }
    WL.setPlayer(save, { hp: state.hp, sanity: state.sanity });
    var hook = CONFIG.nextWorld === '幽冥戏班'
      ? '电台忽然传出一段戏腔，三声锣响压过集市的风。信号提灯泛起青光，照出一道朱门。你推门而入，红灯笼下坐满了没有影子的看客——幽冥戏班，今夜等你替班。'
      : '电台锁定了「' + CONFIG.nextWorld + '」的频率。信号提灯照出一道门，你推开门，集市的风声在身后消失——另一段世界正等着你。';
    var complete = WL.completeLevel(CONFIG, save, { exitHook: hook, nextUrl: CONFIG.nextUrl, passViaUrl: CONFIG.passViaUrl });
    if (complete) {
      finished = true;
      $('game-dialog').close();
      keys = {}; path = [];
      try { localStorage.removeItem(sessionKey); } catch (e) { /* URL 交接不依赖本地存储。 */ }
    } else {
      toast('出口交接还未配置完整，请打开接力存档查看提示。');
    }
  }

  function showGameOver() {
    openDialog('旅途暂歇 / THE DUST SETTLES', '先把自己，从风里找回来。', '<p>水壶空了，你的脚步也慢了下来。集市的守门人把你带回入口。</p><p>下一次可以先在水婆处补水，或帮忙抽水。每 90 秒需要 1 份净水；对话时不会消耗时间。</p>', [{ label: '从这一关的入口重新出发', featured: true, onClick: restart }]);
  }

  function confirmRestart() {
    openDialog('重走旅程', '回到第一次抵达集市的时候？', '<p>本关的探索和交易将重新开始。上一个世界传来的道具、面板和故事会重新带入。</p>', [
      { label: '重新开始本关', featured: true, onClick: restart },
      { label: '继续眼前的旅程', onClick: closeDialog }
    ]);
  }

  function restart() {
    finished = false; paused = false; path = []; target = null; pendingNode = null; keys = {};
    $('pause-badge').hidden = true;
    $('pause-button').textContent = 'Ⅱ';
    if ($('relay-dialog').open) $('relay-dialog').close();
    closeDialog(); freshState();
    $('intro-note').hidden = false;
    $('entry-echo').textContent = (entry.exit_hook ? '「' + entry.exit_hook + '」\n\n' : '') + echo;
    $('echo-log').textContent = echo;
    WL.mountDebug(save); $('debug-reset').onclick = confirmRestart;
    renderUI(); persist();
  }

  function showGuide() {
    openDialog('旅人手册 / FIELD GUIDE', '在废土里，做一点有用的事。', '<div class="help-controls"><span><kbd>W A S D</kbd> 或方向键 · 移动</span><span><kbd>E</kbd> 靠近人物、公告和废料堆后交互</span><span><kbd>SHIFT</kbd> 按住快跑</span><span>鼠标 / 触屏 · 点击人物或物资，自动前往</span><span><kbd>ESC</kbd> 暂停或关闭对话</span></div><p>你的目标是换齐三件零件，修好北面的穿界电台。可以先看中央悬赏榜，再拾荒、换水、与摊主谈条件。</p><p>水既是生存物资，也是交换的筹码。每 90 秒需要 1 份水；缺水会损失生命。物资不足时，可在水婆处帮忙抽水。</p><p class="dialog-small">游戏会自动记录本关进度。上家道具按类型接入；没有对应道具也有完整通关路线。声音默认关闭，可从右上角开启。</p>', [{ label: '记住了，出发', featured: true, onClick: closeDialog }]);
  }

  function showMission() {
    openDialog('当前委托 / THE NEXT FREQUENCY', '给明天一个信号', '<p>① 西北修理铺：老莫保管着振荡器。东边废料堆里的旧线圈能换到它。</p><p>② 东北零件摊：阿锈出售铜线。积攒 1 点声望后，可以把四份废料的价格谈到两份。</p><p>③ 东南帐篷：小满愿意用蓄电池交换净水，也接受废料。</p><p>凑齐三件零件后，到北面的穿界电台接通下一世界。不要忘记，中央悬赏榜和水婆能帮你补给。</p>', [
      { label: '在地图上前往电台', hint: '自动寻路', onClick: function () { closeDialog(); if (state.started) navigateTo(model.nodes.find(function (n) { return n.id === 'radio'; }), 'radio'); else toast('先点击「进入集市」开启旅程。'); } },
      { label: '继续探索', featured: true, onClick: closeDialog }
    ]);
  }

  function showRelay() {
    keys = {}; path = []; target = null; pendingNode = null;
    renderUI();
    $('debug-code').value = WL.debug.code(save);
    if (!$('relay-dialog').open) $('relay-dialog').showModal();
  }

  function blocked(x, y) {
    if (x < 24 || x > 936 || y < 90 || y > 558) return true;
    return model.solids.some(function (s) { return x > s.x - 9 + 0.01 && x < s.x + s.w + 9 - 0.01 && y > s.y - 9 + 0.01 && y < s.y + s.h + 9 - 0.01; });
  }

  // 小地图使用网格寻路；拒绝穿过摊位，也不让斜线切过障碍物的角。
  function findPath(destination) {
    var step = 12, cols = 80, rows = 50;
    var start = { x: Math.round(state.player.x / step), y: Math.round(state.player.y / step) };
    var end = { x: Math.round(destination.x / step), y: Math.round(destination.y / step) };
    function index(p) { return p.y * cols + p.x; }
    function free(x, y) { return x >= 0 && x < cols && y >= 0 && y < rows && !blocked(x * step, y * step); }
    function nearestFree(p) {
      if (free(p.x, p.y)) return p;
      for (var r = 1; r < 16; r++) {
        for (var dy = -r; dy <= r; dy++) for (var dx = -r; dx <= r; dx++) {
          if (Math.abs(dx) !== r && Math.abs(dy) !== r) continue;
          if (free(p.x + dx, p.y + dy)) return { x: p.x + dx, y: p.y + dy };
        }
      }
      return null;
    }
    start = nearestFree(start); end = nearestFree(end);
    if (!start || !end) return [];
    var queue = [start], parents = new Int32Array(cols * rows).fill(-1), seen = new Uint8Array(cols * rows);
    seen[index(start)] = 1;
    var found = false;
    var directions = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
    for (var head = 0; head < queue.length; head++) {
      var p = queue[head];
      if (p.x === end.x && p.y === end.y) { found = true; break; }
      directions.forEach(function (d) {
        var x = p.x + d[0], y = p.y + d[1], i = y * cols + x;
        if (!free(x, y) || seen[i]) return;
        if (d[0] && d[1] && (!free(p.x + d[0], p.y) || !free(p.x, p.y + d[1]))) return;
        seen[i] = 1; parents[i] = index(p); queue.push({ x: x, y: y });
      });
    }
    if (!found) return [];
    var points = [], cursor = index(end), origin = index(start);
    while (cursor !== origin && cursor >= 0) { points.push({ x: cursor % cols * step, y: Math.floor(cursor / cols) * step }); cursor = parents[cursor]; }
    points.reverse();
    return points;
  }

  function navigateTo(destination, nodeId) {
    path = findPath(destination); target = { x: destination.x, y: destination.y }; pendingNode = nodeId || null;
    if (!path.length) {
      target = null;
      if (nodeId && Math.hypot(state.player.x - destination.x, state.player.y - destination.y) < 55) openEntity(nodeId);
      else if (nodeId) toast('那边暂时走不过去，试试另一条路。');
      pendingNode = null;
    }
  }

  function updateMovement(dt) {
    var dx = (keys.d || keys.arrowright ? 1 : 0) - (keys.a || keys.arrowleft ? 1 : 0);
    var dy = (keys.s || keys.arrowdown ? 1 : 0) - (keys.w || keys.arrowup ? 1 : 0);
    var speed = (keys.shift ? 177 : 113) * (state.flags.storm ? 0.82 : 1);
    if (dx || dy) { path = []; target = null; pendingNode = null; }
    else if (path.length) {
      var next = path[0], distance = Math.hypot(next.x - state.player.x, next.y - state.player.y);
      if (distance <= speed * dt + 1) {
        state.player.x = next.x; state.player.y = next.y; path.shift();
        if (!path.length) {
          target = null;
          var id = pendingNode; pendingNode = null;
          if (id) { openEntity(id); return; }
        }
        return;
      }
      dx = next.x - state.player.x; dy = next.y - state.player.y;
    }
    var length = Math.hypot(dx, dy);
    state.player.moving = length > 0;
    if (!length) return;
    dx /= length; dy /= length;
    state.player.dir = Math.abs(dx) > Math.abs(dy) ? dx > 0 ? 'right' : 'left' : dy > 0 ? 'down' : 'up';
    var nx = state.player.x + dx * speed * dt, ny = state.player.y + dy * speed * dt;
    if (!blocked(nx, state.player.y)) state.player.x = nx;
    if (!blocked(state.player.x, ny)) state.player.y = ny;
    if (soundOn && performance.now() - lastFootstep > 350) { tone('step'); lastFootstep = performance.now(); }
  }

  function updateNear() {
    var best = null, distance = 57;
    model.nodes.forEach(function (node) {
      if (node.kind === 'salvage' && state.salvaged.indexOf(node.id) !== -1) return;
      var d = Math.hypot(state.player.x - node.x, state.player.y - node.y);
      if (d < distance) { distance = d; best = node; }
    });
    near = best;
    var prompt = $('interaction-prompt');
    prompt.hidden = !best || !state.started || state.dead || paused || finished || $('game-dialog').open || $('relay-dialog').open;
    if (best) prompt.innerHTML = '<kbd>E</kbd><span>' + (best.kind === 'salvage' ? '搜寻' : best.id === 'board' ? '查看' : best.id === 'radio' ? '检查' : '交谈 · ') + esc(best.name) + '</span>';
  }

  function isActive() {
    return state.started && !state.dead && !paused && !finished && !$('game-dialog').open && !$('relay-dialog').open && !document.hidden;
  }

  function frame(now) {
    var dt = lastTime ? Math.min((now - lastTime) / 1000, 0.06) : 0;
    lastTime = now;
    if (isActive()) {
      updateMovement(dt);
      if (isActive()) {
        var events = model.tick(state, dt) || [];
        events.forEach(function (event) { var message = typeof event === 'string' ? event : event.message; addLog(message); toast(message); });
        if (state.dead) showGameOver();
        saveTimer += dt;
        if (saveTimer >= 2) { saveTimer = 0; renderUI(); persist(); }
      }
    } else state.player.moving = false;
    updateNear();
    renderer.render(state, now, target, near ? near.id : null);
    requestAnimationFrame(frame);
  }

  function togglePause() {
    if (!state.started || state.dead || finished || $('game-dialog').open || $('relay-dialog').open) return;
    paused = !paused; keys = {};
    $('pause-badge').hidden = !paused;
    $('pause-button').textContent = paused ? '▷' : 'Ⅱ';
    $('pause-button').setAttribute('aria-label', paused ? '继续游戏' : '暂停游戏');
    persist();
  }

  function tone(kind) {
    if (!soundOn) return;
    try {
      if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
      if (audioContext.state === 'suspended') audioContext.resume();
      var frequencies = kind === 'win' ? [392, 494, 587, 784] : kind === 'loot' ? [523, 784] : kind === 'trade' ? [440, 659] : [110];
      frequencies.forEach(function (f, i) {
        var osc = audioContext.createOscillator(), gain = audioContext.createGain(), at = audioContext.currentTime + i * 0.09;
        osc.type = kind === 'step' ? 'triangle' : 'square'; osc.frequency.value = f;
        gain.gain.setValueAtTime(kind === 'step' ? 0.012 : 0.025, at); gain.gain.exponentialRampToValueAtTime(0.001, at + 0.12);
        osc.connect(gain); gain.connect(audioContext.destination); osc.start(at); osc.stop(at + 0.13);
      });
    } catch (e) { soundOn = false; }
  }

  $('start-button').onclick = function () { state.started = true; $('intro-note').hidden = true; persist(); canvas.focus({ preventScroll: true }); toast('点击人物或废料堆即可前往。先看看中央悬赏榜吧。'); };
  $('guide-button').onclick = showGuide;
  $('mission-button').onclick = showMission;
  $('world-button').onclick = showRelay;
  $('relay-button').onclick = showRelay;
  $('market-tab').onclick = function () { if ($('relay-dialog').open) $('relay-dialog').close(); if ($('game-dialog').open) closeDialog(); canvas.focus({ preventScroll: true }); };
  $('dialog-close').onclick = closeDialog;
  $('relay-close').onclick = function () { $('relay-dialog').close(); canvas.focus({ preventScroll: true }); };
  $('restart-button').onclick = confirmRestart;
  $('pause-button').onclick = togglePause;
  $('resume-button').onclick = togglePause;
  $('interaction-prompt').onclick = function () { if (near && isActive()) openEntity(near.id); };
  $('touch-interact').onclick = function () { if (near && isActive()) openEntity(near.id); else if (state.repaired) showEnding(); else toast('靠近摊主、悬赏榜或废料堆再交互。'); };
  $('map-button').onclick = function () { $('map-note').hidden = !$('map-note').hidden; $('map-button').setAttribute('aria-pressed', String(!$('map-note').hidden)); };
  $('sound-button').onclick = function () { soundOn = !soundOn; $('sound-button').querySelector('.sound-off').hidden = soundOn; $('sound-button').setAttribute('aria-label', soundOn ? '关闭声音' : '开启声音'); $('sound-button').title = soundOn ? '关闭声音' : '开启声音'; if (soundOn) tone('trade'); };

  canvas.addEventListener('pointerdown', function (event) {
    if (!isActive()) return;
    event.preventDefault(); canvas.focus({ preventScroll: true });
    var box = canvas.getBoundingClientRect();
    var point = { x: (event.clientX - box.left) / box.width * canvas.width, y: (event.clientY - box.top) / box.height * canvas.height };
    var selected = model.nodes.map(function (n) { return { node: n, d: Math.min(Math.hypot(point.x - n.x, point.y - n.y), Math.hypot(point.x - n.x, point.y - (n.y - 27))) }; }).sort(function (a, b) { return a.d - b.d; })[0];
    if (selected && selected.d < 38) navigateTo(selected.node, selected.node.id);
    else navigateTo(point, null);
  });

  document.addEventListener('keydown', function (event) {
    var key = event.key.toLowerCase();
    if (/input|textarea/i.test(event.target.tagName)) return;
    if ($('game-dialog').open || $('relay-dialog').open) return;
    if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'shift', 'e', 'escape'].indexOf(key) !== -1) event.preventDefault();
    if (key === 'escape' && !event.repeat) { togglePause(); return; }
    if (key === 'e' && !event.repeat && isActive()) {
      if (near) openEntity(near.id);
      else if (state.repaired) showEnding();
      else toast('靠近摊主、悬赏榜或发光的废料堆再按 E。');
      return;
    }
    if (isActive()) keys[key] = true;
  });
  document.addEventListener('keyup', function (event) { keys[event.key.toLowerCase()] = false; });
  document.querySelectorAll('[data-dir]').forEach(function (button) {
    var key = { up: 'w', left: 'a', down: 's', right: 'd' }[button.dataset.dir];
    button.addEventListener('pointerdown', function (event) { event.preventDefault(); if (isActive()) { button.setPointerCapture(event.pointerId); keys[key] = true; } });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (type) { button.addEventListener(type, function () { keys[key] = false; }); });
  });
  window.addEventListener('blur', function () { keys = {}; });
  document.addEventListener('visibilitychange', function () { keys = {}; lastTime = 0; if (document.hidden) persist(); });
  window.addEventListener('pagehide', persist);
  $('game-dialog').addEventListener('close', function () { keys = {}; currentEntity = null; });
  $('relay-dialog').addEventListener('close', function () { keys = {}; });

  initialize();
  requestAnimationFrame(frame);
})();
