/* 幽冥戏班：独立于 DOM 与接力协议的关卡规则。 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.OperaModel = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var nodes = [
    { id: 'ticket', kind: 'npc', name: '守门纸人', x: 160, y: 435 },
    { id: 'script', kind: 'script', name: '旧戏本', x: 240, y: 230 },
    { id: 'masks', kind: 'masks', name: '脸谱架', x: 788, y: 278 },
    { id: 'seat', kind: 'seat', name: '空座', x: 474, y: 385 },
    { id: 'gong', kind: 'gong', name: '铜锣', x: 720, y: 455 },
    { id: 'stage', kind: 'stage', name: '戏台', x: 480, y: 234 },
    { id: 'lantern', kind: 'lantern', name: '引魂灯', x: 110, y: 285 },
    { id: 'exit', kind: 'exit', name: '幕后之门', x: 480, y: 125 }
  ];
  var solids = [
    { x: 329, y: 70, w: 105, h: 126 },
    { x: 526, y: 70, w: 105, h: 126 },
    { x: 66, y: 132, w: 93, h: 90 },
    { x: 194, y: 173, w: 92, h: 31 },
    { x: 749, y: 193, w: 100, h: 47 },
    { x: 101, y: 370, w: 100, h: 31 },
    { x: 651, y: 396, w: 98, h: 22 },
    { x: 330, y: 285, w: 54, h: 30 },
    { x: 420, y: 285, w: 54, h: 30 },
    { x: 510, y: 285, w: 54, h: 30 },
    { x: 600, y: 285, w: 54, h: 30 },
    { x: 330, y: 346, w: 54, h: 30 },
    { x: 600, y: 346, w: 54, h: 30 }
  ];
  var maskOrder = ['white', 'red', 'black'];
  var rhythmOrder = ['drum', 'gong', 'bell', 'gong'];
  var maskNames = { white: '白面', red: '红面', black: '黑面' };
  var beatNames = { drum: '鼓', gong: '锣', bell: '铃' };

  function integer(value, fallback) {
    var n = Number(value);
    return value !== null && value !== '' && Number.isFinite(n)
      ? Math.max(0, Math.floor(n)) : fallback;
  }

  function create(incomingSave, hasLight) {
    var incoming = incomingSave && incomingSave.player || {};
    var sanity = Math.max(1, integer(incoming.sanity, 2)) + (hasLight ? 1 : 0);
    return {
      player: { x: 480, y: 525, dir: 'down', moving: false },
      hp: Math.max(1, integer(incoming.hp, 3)),
      sanity: sanity,
      maxSanity: Math.max(3, sanity),
      elapsed: 0,
      started: false,
      lost: false,
      performed: false,
      ending: null,
      flags: {},
      learned: false,
      masksCollected: [],
      casting: [null, null, null],
      maskSolved: false,
      rhythm: [],
      gongSolved: false,
      act: 0
    };
  }

  // 戏院没有隐藏的生存倒计时，演出完成后也不再累计旅途用时。
  function tick(state, seconds) {
    var dt = Number(seconds);
    if (state.started && !state.lost && !state.performed && !state.ending && Number.isFinite(dt) && dt > 0) state.elapsed += dt;
    return [];
  }

  function fail(message) { return { ok: false, message: message }; }
  function finish(state, message, kind, duration) {
    tick(state, duration === undefined ? 6 : duration);
    return { ok: true, message: message, kind: kind || 'story' };
  }
  function costSanity(state, message, clear) {
    state.sanity = Math.max(0, state.sanity - 1);
    if (clear === 'casting') state.casting = [null, null, null];
    if (clear === 'rhythm') state.rhythm = [];
    // 先记录此次判定的时间，再冻结失神状态。
    var result = finish(state, message + '理智 -1。', 'mistake');
    if (state.sanity === 0) {
      state.lost = true;
      state.player.moving = false;
      result.message += '你被戏声困住了；到引魂灯前重新点灯，可以找回神志。';
    }
    return result;
  }

  function action(state, id) {
    if (state.ending) return fail('这一折戏已经落幕，下一段世界正在等你。');
    if (state.lost && id !== 'relight') return fail(state.hp === 0
      ? '你已无力继续这一折戏，请从入口重新开始。'
      : '你暂时迷失在戏声里，先到引魂灯前找回神志。');
    if (state.performed && id !== 'ending_release' && id !== 'ending_inherit') return fail('送魂戏已经唱完，去幕后之门选择告别吧。');

    if (id === 'ticket') {
      if (state.flags.ticket) return fail('冥戏票已经收好，纸人不会再收第二次票。');
      state.flags.ticket = true;
      return finish(state, '纸人递来一张冥戏票：空座不可坐，脸谱不可乱，锣鼓不可错。');
    }

    if (id === 'read_script') {
      if (state.learned) return finish(state, '再读戏本：白面饰伪言者，红面饰守誓者，黑面饰断是非者；送魂四拍是鼓、锣、铃、锣。', 'story', 0);
      state.learned = true;
      state.flags.script = true;
      state.act = Math.max(state.act, 1);
      return finish(state, '你读懂了旧戏本：左起伪言者、守誓者、断是非者，对应白面、红面、黑面；落幕四拍为鼓、锣、铃、锣。');
    }

    if (id === 'take_masks') {
      if (!state.flags.ticket) return fail('先向守门纸人领一张冥戏票，才能借取脸谱。');
      if (state.masksCollected.length) return fail('三张脸谱已经借出，就在你的行囊里。');
      state.masksCollected = ['red', 'white', 'black'];
      state.flags.masks = true;
      return finish(state, '你借下红、白、黑三张脸谱。它们等着回到戏本里各自的位置。', 'item');
    }

    var assignment = /^assign_([0-2])_(red|white|black)$/.exec(id);
    if (assignment) {
      if (!state.masksCollected.length) return fail('脸谱架还没打开，先借下三张脸谱。');
      if (state.maskSolved) return fail('三张脸谱已经归位，不要再惊动台上的人。');
      var slot = Number(assignment[1]);
      var mask = assignment[2];
      if (state.masksCollected.indexOf(mask) === -1) return fail('行囊里没有这张脸谱。');
      var previous = state.casting[slot];
      var occupied = state.casting.indexOf(mask);
      if (occupied !== -1 && occupied !== slot) state.casting[occupied] = previous;
      state.casting[slot] = mask;
      return finish(state, '第 ' + (slot + 1) + ' 位换上了' + maskNames[mask] + '。', 'selection', 0);
    }

    if (id === 'check_masks') {
      if (!state.learned) return fail('先读旧戏本，认清三位戏中人的身份。');
      if (!state.masksCollected.length) return fail('你还没有向脸谱架借取脸谱。');
      if (state.maskSolved) return fail('脸谱已经归位，这一关考验不必再来一次。');
      if (state.casting.length !== 3 || state.casting.some(function (mask) { return !maskNames[mask]; }) || new Set(state.casting).size !== 3) return fail('请先为三个角色各放一张不同的脸谱。');
      if (!state.casting.every(function (mask, index) { return mask === maskOrder[index]; })) return costSanity(state, '脸谱的眼角同时转向你。身份错位了，三张脸谱又退回暗处。', 'casting');
      state.maskSolved = true;
      state.act = Math.max(state.act, 2);
      return finish(state, '白面藏谎，红面守誓，黑面断是非。脸谱终于归位，戏台深处传来一声轻叹。', 'puzzle');
    }

    var beat = /^beat_(drum|gong|bell)$/.exec(id);
    if (beat) {
      if (!state.maskSolved) return fail('先让三张脸谱归位，锣鼓才肯听你的指挥。');
      if (state.gongSolved) return fail('送魂四拍已经奏对，不必再打断余音。');
      if (state.rhythm.length >= 4) return fail('四拍已齐，先确认，或清空后重新敲击。');
      state.rhythm.push(beat[1]);
      return finish(state, '第 ' + state.rhythm.length + ' 拍：' + beatNames[beat[1]] + '。', 'beat', 0);
    }

    if (id === 'clear_rhythm') {
      if (state.gongSolved) return fail('已经奏对的送魂四拍不会被抹去。');
      state.rhythm = [];
      return finish(state, '铜锣的余音散去，可以重新起拍。', 'selection', 0);
    }

    if (id === 'check_rhythm') {
      if (!state.maskSolved) return fail('先让脸谱归位，才能奏送魂四拍。');
      if (state.gongSolved) return fail('送魂四拍已经奏对，台上的影子正在等你。');
      if (state.rhythm.length !== 4) return fail('送魂曲需要完整的四拍，先把四拍敲齐。');
      if (!state.rhythm.every(function (beat, index) { return beat === rhythmOrder[index]; })) return costSanity(state, '锣鼓错了拍，台下传来不属于活人的应声。再看看戏本里的四拍。', 'rhythm');
      state.gongSolved = true;
      state.act = Math.max(state.act, 3);
      return finish(state, '鼓起，锣应，铃过，锣收。四拍相接，台下的影子安静下来。', 'puzzle');
    }

    if (id === 'respect_seat') {
      if (state.flags.seat) return fail('这张空座已经留给原来的客人了。');
      state.flags.seat = true;
      return finish(state, '你向空座欠身，给看不见的客人让了路。椅上的薄霜悄悄散去。');
    }

    if (id === 'sit_seat') {
      if (state.flags.seatWarning) return fail('椅子已经给过警告，不要再坐下。');
      state.flags.seatWarning = true;
      state.hp = Math.max(0, state.hp - 1);
      var seated = finish(state, '你刚要落座，一只冰冷的手便将你推开。生命 -1。这张座位有它的主人。', 'mistake');
      if (state.hp === 0) {
        state.lost = true;
        state.player.moving = false;
        seated.message += '你已无力起身，请从戏院入口重新开始。';
      }
      return seated;
    }

    if (id === 'relight') {
      if (state.hp === 0) return fail('引魂灯能找回神志，却扶不起耗尽的身体。请重新开始本关。');
      if (state.sanity >= state.maxSanity && !state.lost) return fail('心神已经安定，灯火会在这里等你。');
      state.sanity = Math.min(state.maxSanity, Math.max(0, state.sanity) + 1);
      state.lost = false;
      state.flags.lantern = true;
      return finish(state, '你在引魂灯前重新点起一缕火。理智 +1，戏声中的杂念渐渐远去。', 'restore');
    }

    if (id === 'perform') {
      if (!state.flags.ticket) return fail('纸人还未放行，先领取冥戏票。');
      if (!state.learned) return fail('台词还未认清，先读懂旧戏本。');
      if (!state.maskSolved) return fail('三位戏中人的脸谱还没归位。');
      if (!state.gongSolved) return fail('送魂四拍还没奏对，暂时不能登台。');
      if (!state.flags.seat) return fail('台下还有客人无座。先向院中空座欠身让路。');
      state.performed = true;
      state.flags.performed = true;
      state.act = 4;
      state.player.moving = false;
      return finish(state, '你替戏中人唱完最后一句。红帷缓缓落下，无名的观众终于起身，幕后之门开了。', 'performance', 0);
    }

    if (id === 'ending_release' || id === 'ending_inherit') {
      if (!state.performed) return fail('这一折送魂戏尚未落幕，幕后之门还不能通行。');
      state.ending = id === 'ending_release' ? 'release' : 'inherit';
      if (state.ending === 'inherit') {
        state.sanity = Math.max(0, state.sanity - 1);
        return finish(state, '你留下自己的名字，接过戏班的脸谱。理智 -1；今夜之后，余音将随你远行。', 'ending', 0);
      }
      return finish(state, '你归还脸谱，不曾回头。灯火替戏中人照亮归途，也照出你的下一段世界。', 'ending', 0);
    }

    return fail('这件事不在今夜的戏本里。');
  }

  return { create: create, action: action, tick: tick, nodes: nodes, solids: solids };
});
