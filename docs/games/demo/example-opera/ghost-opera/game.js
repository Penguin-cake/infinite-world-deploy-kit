/* 当前示范链：废土集市（第1关）→ 幽冥戏班（第2关）。世界签06并非关序。 */
var CONFIG = {
  level: 2,
  world: '幽冥戏班',
  prevWorld: '废土集市',
  nextWorld: '待接线世界',
  nextUrl: '../dev-tools/virtual-downstream.html',
  passViaUrl: true
};

(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var esc = WL.escapeHtml;
  var model = OperaModel;
  var canvas = $('game-canvas');
  var renderer = new OperaRenderer(canvas, model.nodes, model.solids);
  var entry = WL.readSave(CONFIG.level), fingerprint = WL.encodeCode(entry);
  var sessionKey = 'ghost_opera_session_v1';
  var state, save, echo, logs = [], finished = false, paused = false;
  var keys = {}, path = [], target = null, pendingNode = null, near = null;
  var lastTime = 0, saveTimer = 0, toastTimer = 0, currentEntity = null;
  var soundOn = false, audioContext = null, lastFootstep = 0, demoTimer = null;
  var maskNames = { white: '白面', red: '红面', black: '黑面' };
  var maskColors = { white: '#d7cda4', red: '#ae4c43', black: '#759196' };
  var beatNames = { drum: '鼓', gong: '锣', bell: '铃' };

  function freshState() {
    save = WL.normalize(JSON.parse(JSON.stringify(entry)), CONFIG.level);
    var light = WL.consumeAny(save.items, 'light');
    state = model.create(save, !!light);
    echo = light ? '你举起从「' + (entry.prev_world || '上个世界') + '」带来的「' + light.name + '」。它在院门前化作一盏青灯，替你守住一分清明。理智 +1。' : '手边没有照明物。守门纸人替你点亮一盏纸灯：「拿稳了。这里的人，认灯不认脸。」没有旧物，也能走完这出戏。';
    if (entry.prev_world === '废土集市') echo = '电台里的戏腔已经近在耳边，门后的红灯笼一盏盏亮起。' + echo + ' 纸人朝你作揖：「锈风来的客，今夜的替班位给你留着。」';
    if (!entry.player.hp || !entry.player.sanity) echo += ' 灯火托住你摇摇欲坠的神思，将不足 1 的面板恢复到 1。';
    logs = [{ time: '23:00', text: '锣响三更，抵达梨园旧院。先去西南找守门纸人。' }];
  }

  function initialize() {
    freshState();
    try {
      var stored = JSON.parse(localStorage.getItem(sessionKey) || 'null');
      if (stored && stored.v === 1 && stored.fingerprint === fingerprint && stored.state && stored.state.player && stored.state.flags && Array.isArray(stored.state.casting) && Array.isArray(stored.state.masksCollected) && Array.isArray(stored.state.rhythm) && Array.isArray(stored.logs) && !stored.finished) {
        state = stored.state; state.player.moving = false;
        save = WL.normalize(stored.relay, CONFIG.level); logs = stored.logs; echo = stored.echo || echo;
      }
    } catch (e) { /* 无本地存储时可完整游玩，并使用 URL 接力。 */ }
    $('opening-strip').innerHTML = WL.renderOpening(entry);
    $('echo-log').textContent = echo;
    $('entry-echo').textContent = (entry.exit_hook ? '「' + entry.exit_hook + '」\n\n' : '') + echo;
    $('intro-note').hidden = state.started;
    WL.mountDebug(save); $('debug-reset').onclick = confirmRestart;
    renderUI();
    if (state.lost) showLost();
    else if (state.ending) showEnding();
    else if (state.performed) showCurtain();
  }

  function clockText() {
    var minutes = 23 * 60 + Math.floor(state.elapsed / 8);
    return String(Math.floor(minutes / 60) % 24).padStart(2, '0') + ':' + String(minutes % 60).padStart(2, '0');
  }

  function persist() {
    if (finished) return;
    WL.setPlayer(save, { hp: state.hp, sanity: state.sanity });
    try {
      localStorage.setItem(sessionKey, JSON.stringify({ v: 1, fingerprint: fingerprint, state: state, relay: save, echo: echo, logs: logs, finished: false }));
      $('save-status').innerHTML = '<i></i> 前尘自动记下';
    } catch (e) { $('save-status').textContent = '当前浏览器未开放本地存储'; }
  }

  function addLog(message) { logs.unshift({ time: clockText(), text: message }); logs = logs.slice(0, 20); renderUI(); }
  function toast(message) {
    $('toast').textContent = message; $('toast').hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { $('toast').hidden = true; }, 3400);
  }

  function maskIcon(color) { return '<i class="mini-mask" style="--mask-color:' + maskColors[color] + '" aria-hidden="true"></i>'; }

  function renderUI() {
    $('hp').textContent = '♥ '.repeat(Math.min(state.hp, 8)) + '♡ '.repeat(Math.max(0, 3 - state.hp));
    $('hp').setAttribute('aria-label', '生命 ' + state.hp);
    $('sanity').textContent = '理智 ' + state.sanity;
    $('clock').textContent = clockText();
    $('weather-text').textContent = state.performed ? '夜戏将散' : state.gongSolved ? '雾 · 锣声已定' : '阴 · 有客来';
    $('act-label').textContent = ['候场', '寻谱', '正面', '鸣锣', '落幕'][state.act] || '候场';
    $('chapter-dots').innerHTML = Array.from({ length: 4 }, function (_, i) { return '<i class="' + (state.act > i ? 'done' : '') + '"></i>'; }).join('');
    var tasks = [
      { done: state.learned, name: '读懂旧戏本', hint: '西北角 · 旧戏本' },
      { done: state.maskSolved, name: '让三张脸谱归真', hint: '东侧脸谱架 · 依据戏本分配' },
      { done: state.gongSolved, name: '敲响四拍送魂锣', hint: '东南铜锣 · 按戏本记下的顺序' }
    ];
    $('objectives').innerHTML = tasks.map(function (t) { return '<div class="objective ' + (t.done ? 'complete' : '') + '" title="' + t.hint + '"><span class="check">' + (t.done ? '✓' : '') + '</span><span>' + t.name + '</span><span class="objective-count">' + (t.done ? '1' : '0') + '/1</span></div>'; }).join('');
    var bag = [];
    if (state.flags.ticket) bag.push({ name: '冥戏票', html: '▤' });
    if (state.learned) bag.push({ name: '《归客》残卷', html: '冊' });
    state.masksCollected.forEach(function (m) { bag.push({ name: maskNames[m] + (state.maskSolved ? ' · 已归位' : ' · 待归位'), html: maskIcon(m) }); });
    $('bag-count').textContent = bag.length + ' 件';
    $('bag-grid').innerHTML = Array.from({ length: 5 }, function (_, i) { var item = bag[i]; return '<div class="bag-slot ' + (item ? 'filled' : '') + '" title="' + esc(item ? item.name : '空位') + '" aria-label="' + esc(item ? item.name : '空位') + '">' + (item ? item.html : '·') + (item ? '<span>1</span>' : '') + '</div>'; }).join('');
    $('bag-caption').textContent = state.performed ? '帷幕将落。去幕后之门，道一声告别。' : save.items.length ? '上家遗物 ' + save.items.length + ' 件，见「前尘回响」。' : state.flags.seat ? '空座已留给客人。你记住了规矩。' : '借来的脸，记得还。';
    $('activity-log').innerHTML = logs.slice(0, 3).map(function (l) { return '<div class="log-entry"><time>' + esc(l.time) + '</time><span>' + esc(l.text) + '</span></div>'; }).join('');
    WL.setPlayer(save, { hp: state.hp, sanity: state.sanity });
    $('card-preview').innerHTML = WL.renderSaveCard(save, CONFIG.level, CONFIG.world);
    $('debug-json').textContent = WL.debug.json(save);
  }

  function stopDemo() { if (demoTimer) clearInterval(demoTimer); demoTimer = null; }
  function closeDialog() { stopDemo(); $('game-dialog').close(); currentEntity = null; keys = {}; canvas.focus({ preventScroll: true }); }
  function openDialog(kicker, title, body, choices) {
    stopDemo(); keys = {}; path = []; target = null; pendingNode = null; state.player.moving = false;
    $('dialog-kicker').textContent = kicker;
    $('dialog-body').innerHTML = '<h2 id="dialog-title">' + esc(title) + '</h2>' + body;
    $('dialog-actions').innerHTML = '';
    (choices || []).forEach(function (choice) {
      var button = document.createElement('button');
      button.className = 'action-button' + (choice.featured ? ' featured' : '') + (choice.danger ? ' danger' : '');
      button.innerHTML = '<span>' + esc(choice.label) + '</span>' + (choice.hint ? '<small>' + esc(choice.hint) + '</small>' : '');
      button.disabled = !!choice.disabled;
      if (choice.id) button.dataset.action = choice.id;
      button.onclick = choice.onClick || function () {
        var id = currentEntity, result = doAction(choice.id);
        if (!result.ok || state.lost) return;
        if (choice.id === 'perform') { showCurtain(); return; }
        if (id) openEntity(id);
      };
      $('dialog-actions').appendChild(button);
    });
    if (!$('game-dialog').open) $('game-dialog').showModal();
  }

  function doAction(id) {
    if (finished) return { ok: false };
    var result = model.action(state, id);
    if (result.ok) {
      if (result.kind === 'mistake') state.flags.mistakes = (state.flags.mistakes || 0) + 1;
      if (!/^assign_|^beat_|^clear_rhythm/.test(id)) addLog(result.message);
      if (/^beat_/.test(id)) tone(id.slice(5)); else if (result.kind === 'mistake') tone('wrong'); else if (!/^assign_|^clear_/.test(id)) tone('clue');
      if (id === 'read_script' && state.learned) WL.addClue(save, '《归客》戏本：白面藏言、红面守誓、黑面断是非；送魂四拍为鼓、锣、铃、锣。');
      if (id === 'respect_seat') WL.addClue(save, '梨园旧院的空座有人预留；活人让座，亡客方能入场。');
    }
    if (!/^assign_|^beat_|^clear_rhythm/.test(id)) toast(result.message || '此刻还不能这样做。');
    renderUI(); persist();
    if (state.lost) showLost();
    return result;
  }

  function scriptBody() {
    return '<div class="script-page"><p>三位旧角，一人藏言，一人守誓，一人断是非。</p><p><strong>白面藏言，红面守誓，黑面断是非。</strong></p><p>从左至右：<strong>藏言者 · 守誓者 · 断是非者</strong>。脸借错了，戏魂就认不出自己。</p><p>客到台下，留一空座。四拍送魂，方可登台。</p><div class="beat-note">鼓 → 锣 → 铃 → 锣</div><p>灯不灭，人不回头。待《归客》唱罢，幕后的门，自会打开。</p></div>';
  }

  function openBook() {
    currentEntity = 'script';
    openDialog('旧戏本 / 残卷其一', '纸上的字，正在等你读完。', '<p class="character-quote">「人会忘记自己是谁，戏不会。」</p>' + scriptBody(), [{ label: '记下这几行，合上戏本', featured: true, onClick: closeDialog }]);
    currentEntity = 'script';
  }

  function openMasks() {
    currentEntity = 'masks';
    if (!state.flags.ticket) {
      openDialog('后台 / 脸谱架', '无票者，不碰戏中脸。', '<p>三张脸谱同时转向你。架后的声音很轻：「先去西南，领一张冥戏票。戏班不收无名的客。」</p>', [{ label: '去找守门纸人', onClick: closeDialog }]); return;
    }
    if (!state.masksCollected.length) {
      openDialog('后台 / 三张借来的脸', '脸谱认人，也认错人。', '<p class="character-quote">「拿走可以，别把自己当成他们。」</p><p>红、白、黑三张脸谱各有一位旧主。西北角的戏本记着他们的身份。</p><div class="mask-legend"><span>' + maskIcon('white') + '白面</span><span>' + maskIcon('red') + '红面</span><span>' + maskIcon('black') + '黑面</span></div>', [{ id: 'take_masks', label: '接过三张脸谱', hint: '收进旧物', featured: true }, { label: '先不碰它们', onClick: closeDialog }]); currentEntity = 'masks'; return;
    }
    if (state.maskSolved) {
      openDialog('脸谱归真 / 第二折', '三位戏魂，终于想起了名字。', '<p>白面低笑，红面作揖，黑面拂袖。架上的三张脸不再朝你转动。</p><p class="character-quote">「还差一段送魂的锣鼓。去东南角吧，别把拍子敲错。」</p>', [{ label: '记住了，去敲送魂锣', featured: true, onClick: closeDialog }]); return;
    }
    var roles = ['藏言者', '守誓者', '断是非者'];
    var body = '<p>为三位戏魂归还原本的脸。点击每位角色下的脸谱；同一张脸会交换位置。</p>' + (!state.learned ? '<p class="dialog-small">还未读过戏本。可先去西北角寻找身份线索。</p>' : '<p class="dialog-small">戏本记着：白面藏言，红面守誓，黑面断是非。</p>');
    body += '<div class="casting-board">' + roles.map(function (role, i) {
      return '<div class="casting-slot"><b>' + role + '</b><div class="big-mask" aria-label="' + role + '：' + (state.casting[i] ? maskNames[state.casting[i]] : '未选择') + '">' + (state.casting[i] ? maskIcon(state.casting[i]) : '？') + '</div><div class="mask-options">' + ['white', 'red', 'black'].map(function (color) { return '<button class="mask-choice ' + (state.casting[i] === color ? 'selected' : '') + '" data-mask-slot="' + i + '" data-mask-color="' + color + '" aria-label="给' + role + '选择' + maskNames[color] + '">' + maskIcon(color) + '</button>'; }).join('') + '</div></div>';
    }).join('') + '</div>';
    openDialog('归还脸谱 / 不是每张脸都属于你', '借来的脸，归给何人？', body, [
      { id: 'check_masks', label: '请三位戏魂认回自己', hint: '答错理智 −1', disabled: !state.learned || state.casting.some(function (m) { return !m; }), featured: true },
      { label: state.learned ? '再看一眼戏本' : '先去找戏本', onClick: state.learned ? openBook : closeDialog },
      { label: '暂时离开脸谱架', onClick: closeDialog }
    ]);
    currentEntity = 'masks';
    $('dialog-body').querySelectorAll('[data-mask-slot]').forEach(function (button) {
      button.onclick = function () { var result = doAction('assign_' + button.dataset.maskSlot + '_' + button.dataset.maskColor); if (result.ok) openMasks(); };
    });
  }

  function openGong() {
    currentEntity = 'gong';
    if (!state.maskSolved) { openDialog('东南角 / 铜锣', '先正其面，才闻其声。', '<p>铜锣蒙着一层雾。三张脸还没有找到自己的主人，此时敲下去，只会惊动台下的客。</p><p>先翻阅戏本，再到东侧脸谱架让三张脸谱归位。</p>', [{ label: '暂且收起鼓槌', onClick: closeDialog }]); return; }
    if (state.gongSolved) { openDialog('送魂四拍 / 第三折', '最后一声锣，落在了人间。', '<p>鼓、锣、铃、锣。声响一停，台下的雾轻了许多。</p><p class="character-quote">「若给客人留好了空位，就去北面的戏台，把《归客》唱完。」</p>', [{ label: '去唱最后一折', featured: true, onClick: closeDialog }]); return; }
    var body = '<p>照戏本留下的顺序，敲出四拍送魂声。无需抢拍，依次点击即可。</p><div class="rhythm-row">' + Array.from({ length: 4 }, function (_, i) { return '<div class="rhythm-step ' + (state.rhythm[i] ? 'filled' : '') + '" data-beat-index="' + i + '">' + (state.rhythm[i] ? beatNames[state.rhythm[i]] : '·') + '</div>'; }).join('') + '</div><div class="rhythm-buttons">' + ['drum', 'gong', 'bell'].map(function (beat) { return '<button data-beat="' + beat + '" aria-label="敲' + beatNames[beat] + '" ' + (state.rhythm.length >= 4 ? 'disabled' : '') + '>' + beatNames[beat] + '<small>' + beat.toUpperCase() + '</small></button>'; }).join('') + '</div><p class="dialog-small">戏本提示：鼓 → 锣 → 铃 → 锣。四拍敲完后再确认。</p>';
    openDialog('送魂锣 / 声起有序，声落有归', '用四声，送他们上路。', body, [
      { id: 'check_rhythm', label: '让这一段锣鼓落定', hint: '答错理智 −1', disabled: state.rhythm.length !== 4, featured: true },
      { label: '看一次送魂四拍', hint: '示范，不计失误', onClick: showBeatDemo },
      { id: 'clear_rhythm', label: '清空这四拍，重新敲', disabled: !state.rhythm.length },
      { label: '收起鼓槌，稍后再来', onClick: closeDialog }
    ]);
    currentEntity = 'gong';
    $('dialog-body').querySelectorAll('[data-beat]').forEach(function (button) { button.onclick = function () { var result = doAction('beat_' + button.dataset.beat); if (result.ok) openGong(); }; });
  }

  function showBeatDemo() {
    stopDemo();
    var pattern = ['drum', 'gong', 'bell', 'gong'], index = 0;
    var slots = $('dialog-body').querySelectorAll('[data-beat-index]');
    $('dialog-actions').querySelectorAll('button').forEach(function (b) { b.disabled = true; });
    function nextBeat() {
      slots.forEach(function (slot) { slot.classList.remove('flash'); });
      if (index >= 4) { stopDemo(); openGong(); return; }
      slots[index].textContent = beatNames[pattern[index]]; slots[index].classList.add('flash'); tone(pattern[index]); index++;
    }
    nextBeat(); demoTimer = setInterval(nextBeat, 650);
  }

  function openEntity(id) {
    var node = model.nodes.find(function (n) { return n.id === id; });
    if (!node || !state.started || state.lost || finished) return;
    currentEntity = id;
    if (id === 'ticket') {
      openDialog('守门纸人 / 不问来路，只问归处', state.flags.ticket ? '票在手里，别忘了规矩。' : '客官，借一出戏给你走。', '<p class="character-quote">「戏班今夜缺一个替班人。你替他们唱完《归客》，他们替你开一扇门。」</p><p>壹，空位有人，生人莫坐。贰，借来的脸，必须认回旧主。叁，四拍送魂，落幕不回头。</p><p class="dialog-small">西北角有旧戏本，东边有脸谱与铜锣。若神思恍惚，就去引魂灯旁缓一缓。</p>', [
        { id: 'ticket', label: state.flags.ticket ? '冥戏票已领，今夜有你一席' : '接过冥戏票', hint: '记下戏班规矩', disabled: state.flags.ticket, featured: !state.flags.ticket },
        { label: '提灯，继续入院', onClick: closeDialog }
      ]);
    } else if (id === 'script') {
      if (!state.learned) doAction('read_script');
      openBook();
    } else if (id === 'masks') { openMasks(); }
    else if (id === 'gong') { openGong(); }
    else if (id === 'seat') {
      openDialog('台下 / 一张空着的椅子', state.flags.seat ? '空位有客，轮不到你。' : '人都坐满了，偏留这一席。', '<p class="character-quote">「那位客人还在路上。你站着看一会儿，可好？」</p><p>椅子干干净净，椅脚旁放着一双旧布鞋。守门纸人的话又在耳边响起：空位有人，生人莫坐。</p>', [
        { id: 'respect_seat', label: state.flags.seat ? '已给亡客留座' : '退到一旁，把位置留给客人', hint: '守住第一条规矩', disabled: state.flags.seat, featured: !state.flags.seat },
        { id: 'sit_seat', label: '试着在空椅子上坐下', hint: '违背规矩 · 生命 −1', disabled: state.flags.seatWarning || state.flags.seat, danger: true },
        { label: '离开空座', onClick: closeDialog }
      ]);
    } else if (id === 'lantern') {
      openDialog('引魂灯 / 无论你从哪场梦里来', '看着灯，还记得自己是谁吗？', '<p>青色的火苗没有温度，却能照见你的影子。远处的戏声轻了下来，你终于听见自己的呼吸。</p><p>在灯下找回 1 点理智。若在谜题中迷了心神，也能循着这盏灯回来，保留已经完成的进度。</p>', [
        { id: 'relight', label: '定神，拨亮这盏灯', hint: '理智 +1', disabled: state.sanity >= state.maxSanity, featured: state.sanity < state.maxSanity },
        { label: '记住灯的位置，继续入戏', onClick: closeDialog }
      ]);
    } else if (id === 'stage') {
      if (state.performed) { showCurtain(); return; }
      var ready = state.flags.ticket && state.learned && state.maskSolved && state.gongSolved && state.flags.seat;
      openDialog('梨园旧台 / 最后一折', ready ? '台下已满，等你一句开场。' : '这出戏，还有未了的规矩。', '<p class="character-quote">「一生只唱一出戏，一出戏里是一生。客官，替我们把最后一句唱完。」</p><p>' + (ready ? '脸谱归真，四拍送魂，空座也等来了它的客人。现在，你可以站到灯下，唱出《归客》的最后一句。' : '登台之前，需要冥戏票、读过戏本、归还三张脸谱、敲对四拍送魂声，并为台下亡客留下空座。') + '</p>' + (!state.flags.seat ? '<p class="dialog-small">还没有给客人让座：看看院子中央那张空椅子。</p>' : ''), [
        { id: 'perform', label: ready ? '登台，唱完《归客》' : '尚有规矩未守，暂不能登台', hint: ready ? '开启落幕' : '查看入戏手札', disabled: !ready, featured: ready },
        { label: '回院中，再走一走', onClick: closeDialog }
      ]);
    } else if (id === 'exit') {
      if (state.performed) { showEnding(); return; }
      openDialog('幕后之门 / 门不认来人', '戏未唱完，门不会开。', '<p>你推了推那扇门。门后有风，却没有路。</p><p class="character-quote">「等《归客》唱完，我们才有各自的归处。」</p>', [{ label: '转身回到戏院', onClick: closeDialog }]);
    }
    if (['masks', 'gong', 'script'].indexOf(id) === -1) currentEntity = id;
  }

  function showCurtain() {
    tone('win');
    openDialog('第四折 / 戏终，人未散', '最后一句，唱给了谁听？', '<p class="character-quote">「归来吧，归来吧。生者循灯，逝者随风。」</p><p>你的声音落下，满院的观众同时起身。没有掌声，只有衣袂轻轻擦过椅背的声音。</p><p>北面的帷幕后，一扇门缓缓打开。有人在门边等你作最后一个选择。</p>', [
      { label: '走向幕后的门', hint: '自动前往', featured: true, onClick: function () { closeDialog(); navigateTo(model.nodes.find(function (n) { return n.id === 'exit'; }), 'exit'); } },
      { label: '再看一眼落幕的戏院', onClick: closeDialog }
    ]);
  }

  function showEnding() {
    if (!state.ending) {
      openDialog('幕后之门 / 还一张脸，留一段戏', '帷幕后，只剩你和班主。', '<p class="character-quote">「客官，好戏唱完了。你是还脸离场，还是替我们把这戏继续唱下去？」</p><p>你可以把脸谱交还旧主，送戏魂归去；也可以收下班主的黑面，带着戏班未尽的故事走进下一世界。</p>', [
        { label: '还脸辞戏，提灯送客', hint: '归客结局', featured: true, onClick: function () { if (doAction('ending_release').ok) showEnding(); } },
        { label: '收下黑面，接过班主的戏本', hint: '传灯结局 · 理智 −1', onClick: function () { if (doAction('ending_inherit').ok) showEnding(); } }
      ]); return;
    }
    var release = state.ending === 'release';
    openDialog('一折已终 / ' + (release ? 'THE RETURNING GUEST' : 'THE KEEPER OF THE PLAY'), release ? '戏散了，他们终于回家。' : '从今夜起，你也是戏中人。', '<p>' + (release ? '三张脸谱在台前轻轻一碰，化作纸灰。班主将出戏票递来，青灯照亮你的路。你没有回头，身后的锣声也没有再响。' : '黑面贴近掌心，戏本翻开新的一页，上面写着你的名字。灯火并未熄灭，只是从班主手中，传到了你的手中。') + '</p><div class="result-stats"><div><b>' + (release ? '归客' : '传灯') + '</b><span>此夜结局</span></div><div><b>' + (state.flags.mistakes || 0) + '</b><span>入戏失误</span></div><div><b>' + Math.floor(state.elapsed / 60) + ':' + String(Math.floor(state.elapsed % 60)).padStart(2, '0') + '</b><span>此折用时</span></div></div><p>你的道具、线索和面板会通过主办方接力协议，真实传入下一世界。</p>', [
      { label: '封存这一折，进入下一世界', hint: '接力交接 →', featured: true, onClick: finish },
      { label: '暂留片刻', onClick: closeDialog }
    ]); persist();
  }

  function finish() {
    if (finished || !state.performed || !state.ending) return;
    if (!state.flags.rewards) {
      if (state.ending === 'release') {
        WL.addItem(save, { id: 'farewell_ticket', name: '梨园出戏票', type: 'key' });
        WL.addItem(save, { id: 'soul_guiding_lantern', name: '不灭引魂灯', type: 'light' });
        WL.addItem(save, { id: 'returned_opera_mask', name: '戏魂谢礼铜面', type: 'token' });
      } else {
        WL.addItem(save, { id: 'master_black_mask', name: '班主的黑面', type: 'strange' });
        WL.addItem(save, { id: 'ghost_opera_script', name: '写着你名字的戏本', type: 'info' });
        WL.addItem(save, { id: 'opera_master_tally', name: '幽冥戏班腰牌', type: 'token' });
      }
      WL.addClue(save, '《归客》的送魂四拍是鼓、锣、铃、锣；不灭引魂灯能照出活人的影子。');
      WL.addClue(save, state.ending === 'release' ? '亡客离场时提醒：陌生世界的空座，也可能有人预留；落幕之后切莫回头。' : '班主的戏本会在下一世界续写；若黑面发热，附近有人正冒用另一个人的名字。');
      state.flags.rewards = true;
    }
    WL.setPlayer(save, { hp: state.hp, sanity: state.sanity });
    var hook = '最后一声锣落下，帷幕后开出通往「' + CONFIG.nextWorld + '」的门。你握紧' + (state.ending === 'release' ? '引魂灯' : '班主的黑面') + '跨了过去；门的另一边，有人叫出了你的名字。';
    var result = WL.completeLevel(CONFIG, save, { exitHook: hook, nextUrl: CONFIG.nextUrl, passViaUrl: CONFIG.passViaUrl });
    if (result) { finished = true; stopDemo(); $('game-dialog').close(); path = []; keys = {}; try { localStorage.removeItem(sessionKey); } catch (e) { /* URL 已携带接力码。 */ } }
    else toast('出口接线尚未完整，请打开前尘回响查看提示。');
  }

  function showLost() {
    openDialog('失神 / 灯还没有灭', state.hp > 0 ? '你几乎，忘记了自己的名字。' : '这一折，先在这里歇一歇。', '<p>' + (state.hp > 0 ? '戏声钻进耳里，三张脸都像是你。还好，西边的引魂灯依旧亮着。你可以循灯醒来，保留已经完成的线索与谜题。' : '那张空椅子原本就不是给你准备的。守门纸人将你送回院门，下一次，记得让座。') + '</p>', [
      { label: '循灯醒来，找回一点清明', hint: '保留进度 · 理智恢复 1', disabled: state.hp === 0, featured: state.hp > 0, onClick: function () { if (doAction('relight').ok) { state.player.x = 110; state.player.y = 285; closeDialog(); renderUI(); persist(); } } },
      { label: '从入院时，重唱这一折', onClick: restart }
    ]);
  }

  function confirmRestart() { openDialog('重入此戏', '这一折，要从头再来吗？', '<p>本关的探索和谜题会重新开始。上家传来的面板、旧物与故事会按最初入口重新带入。</p>', [{ label: '重新入戏', featured: true, onClick: restart }, { label: '继续今夜的故事', onClick: closeDialog }]); }
  function restart() {
    finished = false; paused = false; path = []; target = null; pendingNode = null; keys = {};
    if ($('relay-dialog').open) $('relay-dialog').close(); closeDialog(); freshState();
    $('pause-badge').hidden = true; $('pause-button').textContent = 'Ⅱ';
    $('intro-note').hidden = false; $('entry-echo').textContent = (entry.exit_hook ? '「' + entry.exit_hook + '」\n\n' : '') + echo;
    $('echo-log').textContent = echo; WL.mountDebug(save); $('debug-reset').onclick = confirmRestart; renderUI(); persist();
  }

  function showGuide() {
    openDialog('戏班规矩 / 看戏容易，出戏难', '客官，有三句话要记牢。', '<p class="character-quote">「空位有人，脸谱有主，锣声有归。」</p><div class="help-controls"><p><kbd>W A S D</kbd> / 方向键移步 · <kbd>E</kbd> 靠近后查看</p><p><kbd>SHIFT</kbd> 疾行 · <kbd>ESC</kbd> 暂歇</p><p>点击人物、戏本或道具，可自动前往。</p></div><p>先找西南守门纸人领票，再读西北戏本；根据身份给三张脸谱归位，敲对东南角的四拍送魂锣，记得给中央空座让位。之后去北面的戏台唱完《归客》。</p><p>脸谱或锣鼓答错会扣 1 理智。理智耗尽时可循引魂灯恢复，保留进度；误坐空座会扣 1 生命。游戏没有倒计时追赶。</p><p class="dialog-small">纯氛围怪谈，无突发惊吓。声音默认关闭，右上角可开启；鼓点同时有文字示范，不依赖听觉。</p>', [{ label: '记住了，继续入戏', featured: true, onClick: closeDialog }]);
  }

  function showMission() {
    if (state.learned) { openBook(); return; }
    openDialog('入戏手札 / 先循灯，后循声', '要出戏，先把戏读懂。', '<p>西南的守门纸人会给你冥戏票，西北旧桌上的《归客》戏本藏着脸谱和锣鼓的线索。</p><p>不要坐院子中央的空椅子。若觉得神思恍惚，到西边引魂灯前歇一歇。</p>', [{ label: '前往西北旧戏本', hint: '自动寻路', featured: true, onClick: function () { closeDialog(); if (state.started) navigateTo(model.nodes.find(function (n) { return n.id === 'script'; }), 'script'); else toast('先点「持灯入戏」，再探这座戏院。'); } }, { label: '继续探索', onClick: closeDialog }]);
  }
  function showRelay() { stopDemo(); keys = {}; path = []; target = null; pendingNode = null; renderUI(); $('debug-code').value = WL.debug.code(save); if (!$('relay-dialog').open) $('relay-dialog').showModal(); }

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
    var speed = (keys.shift ? 177 : 113) * (false ? 0.82 : 1);
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
    var best = null, distance = 55;
    model.nodes.forEach(function (node) { var d = Math.hypot(state.player.x - node.x, state.player.y - node.y); if (d < distance) { best = node; distance = d; } });
    near = best;
    $('interaction-prompt').hidden = !best || !state.started || state.lost || paused || finished || $('game-dialog').open || $('relay-dialog').open;
    if (best) $('interaction-prompt').innerHTML = '<kbd>E</kbd><span>' + ({ ticket: '交谈 · ', script: '翻阅 · ', masks: '查看 · ', seat: '观察 · ', gong: '敲响 · ', stage: '登上 · ', lantern: '靠近 · ', exit: '推开 · ' }[best.id] || '查看 · ') + esc(best.name) + '</span>';
  }
  function isActive() { return state.started && !state.lost && !paused && !finished && !$('game-dialog').open && !$('relay-dialog').open && !document.hidden; }
  function frame(now) {
    var dt = lastTime ? Math.min((now - lastTime) / 1000, 0.06) : 0; lastTime = now;
    if (isActive()) { updateMovement(dt); if (isActive()) { (model.tick(state, dt) || []).forEach(function (message) { addLog(message); toast(message); }); if (state.lost) showLost(); saveTimer += dt; if (saveTimer >= 2) { saveTimer = 0; renderUI(); persist(); } } }
    else state.player.moving = false;
    updateNear(); renderer.render(state, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : now, target, near ? near.id : null);
    requestAnimationFrame(frame);
  }
  function togglePause() { if (!state.started || state.lost || finished || $('game-dialog').open || $('relay-dialog').open) return; paused = !paused; keys = {}; $('pause-badge').hidden = !paused; $('pause-button').textContent = paused ? '▷' : 'Ⅱ'; $('pause-button').setAttribute('aria-label', paused ? '继续游戏' : '暂停游戏'); persist(); }
  function tone(kind) {
    if (!soundOn) return;
    try {
      if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
      if (audioContext.state === 'suspended') audioContext.resume();
      var notes = kind === 'drum' ? [95] : kind === 'gong' ? [196, 293] : kind === 'bell' ? [784, 1174] : kind === 'win' ? [293, 392, 440, 587] : kind === 'wrong' ? [147, 139] : kind === 'step' ? [88] : [392, 587];
      notes.forEach(function (frequency, i) {
        var osc = audioContext.createOscillator(), gain = audioContext.createGain(), at = audioContext.currentTime + i * (kind === 'gong' || kind === 'bell' ? 0 : .11);
        osc.type = kind === 'step' || kind === 'drum' ? 'triangle' : 'sine'; osc.frequency.setValueAtTime(frequency, at);
        if (kind === 'drum') osc.frequency.exponentialRampToValueAtTime(40, at + .2);
        var duration = kind === 'gong' || kind === 'bell' ? .65 : .18;
        gain.gain.setValueAtTime(kind === 'step' ? .018 : .08, at); gain.gain.exponentialRampToValueAtTime(.001, at + duration);
        osc.connect(gain); gain.connect(audioContext.destination); osc.start(at); osc.stop(at + duration + .01);
      });
    } catch (e) { soundOn = false; }
  }

  $('start-button').onclick = function () { state.started = true; $('intro-note').hidden = true; persist(); canvas.focus({ preventScroll: true }); toast('先去西南找守门纸人。点击地图里的目标即可前往。'); };
  $('guide-button').onclick = showGuide; $('mission-button').onclick = showMission;
  $('world-button').onclick = showRelay; $('relay-button').onclick = showRelay;
  $('market-tab').onclick = function () { if ($('relay-dialog').open) $('relay-dialog').close(); if ($('game-dialog').open) closeDialog(); canvas.focus({ preventScroll: true }); };
  $('dialog-close').onclick = closeDialog; $('relay-close').onclick = function () { $('relay-dialog').close(); canvas.focus({ preventScroll: true }); };
  $('restart-button').onclick = confirmRestart; $('pause-button').onclick = togglePause; $('resume-button').onclick = togglePause;
  $('interaction-prompt').onclick = function () { if (near && isActive()) openEntity(near.id); };
  $('touch-interact').onclick = function () { if (near && isActive()) openEntity(near.id); else toast('靠近人物或旧物，再按查看。'); };
  $('map-button').onclick = function () { $('map-note').hidden = !$('map-note').hidden; $('map-button').setAttribute('aria-pressed', String(!$('map-note').hidden)); };
  $('sound-button').onclick = function () { soundOn = !soundOn; $('sound-button').querySelector('.sound-off').hidden = soundOn; $('sound-button').setAttribute('aria-label', soundOn ? '关闭声音' : '开启声音'); $('sound-button').title = soundOn ? '关闭声音' : '开启声音'; if (soundOn) tone('bell'); };
  canvas.addEventListener('pointerdown', function (event) {
    if (!isActive()) return; event.preventDefault(); canvas.focus({ preventScroll: true });
    var box = canvas.getBoundingClientRect(), point = { x: (event.clientX - box.left) / box.width * canvas.width, y: (event.clientY - box.top) / box.height * canvas.height };
    var nearest = model.nodes.map(function (node) { return { node: node, d: Math.min(Math.hypot(point.x - node.x, point.y - node.y), Math.hypot(point.x - node.x, point.y - (node.y - 25))) }; }).sort(function (a, b) { return a.d - b.d; })[0];
    if (nearest && nearest.d < 39) navigateTo(nearest.node, nearest.node.id); else navigateTo(point, null);
  });
  document.addEventListener('keydown', function (event) {
    var key = event.key.toLowerCase(); if (/input|textarea/i.test(event.target.tagName) || $('game-dialog').open || $('relay-dialog').open) return;
    if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'shift', 'e', 'escape'].indexOf(key) !== -1) event.preventDefault();
    if (key === 'escape' && !event.repeat) { togglePause(); return; }
    if (key === 'e' && !event.repeat && isActive()) { if (near) openEntity(near.id); else toast('靠近目标，再按 E。'); return; }
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
  $('game-dialog').addEventListener('close', function () { stopDemo(); keys = {}; currentEntity = null; });
  $('relay-dialog').addEventListener('close', function () { keys = {}; });
  initialize(); requestAnimationFrame(frame);
})();
