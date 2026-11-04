/*
 * 废土集市：不依赖 DOM 的玩法模型。
 * 浏览器：MarketModel.create / action / tick；Node：require('./model.js')。
 * 状态由调用者持有，模型只改动传入的本关状态，不读写接力存档。
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.MarketModel = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var nodes = [
    { id: 'water', kind: 'npc', name: '水婆', x: 166, y: 234 },
    { id: 'oscillator', kind: 'npc', name: '老莫', x: 336, y: 232 },
    { id: 'cable', kind: 'npc', name: '阿锈', x: 720, y: 230 },
    { id: 'battery', kind: 'npc', name: '小满', x: 737, y: 435 },
    { id: 'board', kind: 'board', name: '悬赏榜', x: 482, y: 308 },
    { id: 'radio', kind: 'radio', name: '穿界电台', x: 480, y: 147 },
    { id: 'camp', kind: 'camp', name: '旅人营火', x: 278, y: 445 },
    { id: 'salvage1', kind: 'salvage', name: '废料堆', x: 104, y: 380 },
    { id: 'salvage2', kind: 'salvage', name: '旧收音机', x: 820, y: 303 },
    { id: 'salvage3', kind: 'salvage', name: '废车残骸', x: 824, y: 494 },
    { id: 'salvage4', kind: 'salvage', name: '旧行李箱', x: 170, y: 505 },
    { id: 'salvage5', kind: 'salvage', name: '废零件', x: 365, y: 360 },
    { id: 'salvage6', kind: 'salvage', name: '铁皮箱', x: 571, y: 424 }
  ];

  var solids = [
    { x: 100, y: 150, w: 135, h: 60 },
    { x: 277, y: 150, w: 135, h: 60 },
    { x: 650, y: 150, w: 145, h: 60 },
    { x: 680, y: 355, w: 135, h: 60 },
    { x: 420, y: 65, w: 122, h: 63 },
    { x: 48, y: 105, w: 45, h: 65 }
  ];

  var salvageAmounts = [2, 3, 2, 3, 2, 2];

  function integer(value, fallback) {
    var n = Number(value);
    return Number.isFinite(n) && value !== null && value !== ''
      ? Math.max(0, Math.floor(n))
      : fallback;
  }

  function create(incomingSave, hasTool) {
    var incoming = incomingSave && incomingSave.player || {};
    var hp = Math.max(1, integer(incoming.hp, 3));
    return {
      player: { x: 480, y: 500, dir: 'down', moving: false },
      resources: { water: 3, scrap: hasTool ? 7 : 4, trust: 0 },
      parts: { cable: false, battery: false, oscillator: false },
      coil: 0,
      relic: false,
      flags: {},
      salvaged: [],
      elapsed: 0,
      hydration: 0,
      started: false,
      repaired: false,
      dead: false,
      ending: null,
      hp: hp,
      maxHp: Math.max(3, hp),
      sanity: integer(incoming.sanity, 2)
    };
  }

  /* 在缺水伤害的准确时刻停表；暂停、死亡和修复完成均不再消耗净水。 */
  function tick(state, seconds) {
    var messages = [];
    var remaining = Number(seconds);
    if (!state.started || state.dead || state.repaired || !Number.isFinite(remaining) || remaining <= 0) return messages;

    while (remaining > 0.000001 && !state.dead) {
      if (!state.flags.storm && state.elapsed >= 300) {
        state.flags.storm = true;
        messages.push('沙暴卷过集市。风更大了，摊主们仍在等你。');
      }
      var untilWater = Math.max(0, 90 - state.hydration);
      var untilStorm = state.flags.storm ? Infinity : Math.max(0, 300 - state.elapsed);
      var step = Math.min(remaining, untilWater, untilStorm);
      state.elapsed += step;
      state.hydration += step;
      remaining -= step;

      if (state.hydration >= 90 - 0.000001) {
        state.hydration = 0;
        if (state.resources.water > 0) {
          state.resources.water--;
          messages.push(state.resources.water === 0
            ? '喝完了最后一份净水。去找水婆，帮忙抽水也能换来补给。'
            : '烈日下喝掉一份净水。净水 -1。');
        } else {
          state.hp = Math.max(0, state.hp - 1);
          messages.push('缺水让你步履艰难。生命 -1，水婆的水泵还能使用。');
          if (state.hp === 0) {
            state.dead = true;
            state.player.moving = false;
            messages.push('你倒在黄沙中。重整行囊，再来一次吧。');
          }
        }
      }
      if (!state.flags.storm && state.elapsed >= 300 && !state.dead) {
        state.flags.storm = true;
        messages.push('沙暴卷过集市。风更大了，摊主们仍在等你。');
      }
    }
    return messages;
  }

  function failure(message) {
    return { ok: false, message: message };
  }

  function action(state, id) {
    if (state.dead) return failure('旅程暂时结束了，重新开始本关再试一次吧。');
    if (state.ending) return failure('这一段旅程已经完成。');
    if (state.repaired && id !== 'ending_kindness' && id !== 'ending_leave') {
      return failure('电台已修复，是时候选择如何告别集市了。');
    }

    var bag = state.resources;
    var message = '';
    var kind = 'trade';
    var duration = 6;
    var salvageIndex = /^salvage([1-6])$/.exec(id);

    if (salvageIndex) {
      if (state.salvaged.indexOf(id) !== -1) return failure('这里已经搜寻过了。');
      var index = Number(salvageIndex[1]) - 1;
      bag.scrap += salvageAmounts[index];
      state.salvaged.push(id);
      message = '拾荒有收获：废料 +' + salvageAmounts[index] + '。';
      if (id === 'salvage2') {
        state.coil++;
        message += '你还找到一枚完整的旧线圈，老莫应该用得上。';
      }
      if (id === 'salvage4') {
        state.relic = true;
        message += '箱底躺着一只发条蜥蜴，依然轻轻转动。';
      }
      kind = 'salvage';
    } else if (id === 'water_buy') {
      if (bag.scrap < 1) return failure('需要 1 份废料。也可以免费帮水婆抽水。');
      bag.scrap--;
      bag.water += 2;
      message = '水婆把水壶灌满。废料 -1，净水 +2。';
    } else if (id === 'pump') {
      /* 先拿到水，再推进时间，避免临界时刻的免费补给反而致命。 */
      bag.water++;
      duration = 14;
      message = '你帮忙摇动水泵，水婆分给你一份净水。净水 +1。';
      kind = 'water';
    } else if (id === 'cable_full' || id === 'cable_fair' || id === 'cable_water') {
      if (state.parts.cable) return failure('你已经拿到了绝缘电缆。');
      if (id === 'cable_fair' && bag.trust < 1) return failure('阿锈还不认识你。先完成悬赏，或帮帮其他摊主。');
      var cableCost = id === 'cable_fair' ? 2 : 4;
      if (id === 'cable_water') {
        if (bag.water < 2) return failure('这笔交换需要 2 份净水。');
        bag.water -= 2;
        message = '阿锈接过净水，把电缆推给你。净水 -2，绝缘电缆 +1。';
      } else {
        if (bag.scrap < cableCost) return failure('还需要 ' + cableCost + ' 份废料。周围的残骸里还能找到一些。');
        bag.scrap -= cableCost;
        message = id === 'cable_fair'
          ? '“听说你帮了集市。”阿锈给你一个人情价。废料 -2，绝缘电缆 +1。'
          : '交易达成。废料 -4，绝缘电缆 +1。';
      }
      state.parts.cable = true;
    } else if (id === 'battery_water' || id === 'battery_scrap') {
      if (state.parts.battery) return failure('你已经拿到了储能电池。');
      if (id === 'battery_water') {
        if (bag.water < 2) return failure('小满需要 2 份净水。去水婆那里看看吧。');
        bag.water -= 2;
        bag.trust += 2;
        message = '小满给家人装好净水，郑重递来电池。净水 -2，储能电池 +1，声望 +2。';
      } else {
        if (bag.scrap < 3) return failure('这笔交换需要 3 份废料。');
        bag.scrap -= 3;
        message = '你用备用零件换下小满的储能电池。废料 -3，储能电池 +1。';
      }
      state.parts.battery = true;
    } else if (id === 'oscillator_scrap' || id === 'oscillator_coil') {
      if (state.parts.oscillator) return failure('你已经拿到了信号振荡器。');
      if (id === 'oscillator_coil') {
        if (state.coil < 1) return failure('需要一枚旧线圈。东侧的旧收音机也许还没坏透。');
        state.coil--;
        bag.trust++;
        message = '旧线圈让老莫的收音机重新唱歌。旧线圈 -1，信号振荡器 +1，声望 +1。';
      } else {
        if (bag.scrap < 3) return failure('老莫需要 3 份废料来修他的机器。');
        bag.scrap -= 3;
        message = '老莫从工具箱底翻出一个振荡器。废料 -3，信号振荡器 +1。';
      }
      state.parts.oscillator = true;
    } else if (id === 'bounty') {
      if (state.flags.bounty) return failure('这张净水泵维修悬赏已经结清了。');
      if (bag.scrap < 3) return failure('修水泵需要 3 份废料。完成后可领 4 份净水。');
      bag.scrap -= 3;
      bag.water += 4;
      bag.trust++;
      state.flags.bounty = true;
      message = '水泵重新运转，集市记住了你的名字。废料 -3，净水 +4，声望 +1。';
      kind = 'quest';
    } else if (id === 'rest') {
      var maxHp = Math.max(3, state.maxHp || 3);
      if (state.hp >= maxHp) return failure('你现在精神不错，暂时不需要休息。');
      if (bag.water < 1) return failure('休息需要 1 份净水。水婆的水泵一直开着。');
      bag.water--;
      state.hp++;
      message = '在营火边喝一口水，缓过气来。净水 -1，生命 +1。';
      kind = 'heal';
    } else if (id === 'repair') {
      if (!state.parts.cable || !state.parts.battery || !state.parts.oscillator) {
        return failure('电台还缺零件：需要绝缘电缆、储能电池和信号振荡器。');
      }
      state.repaired = true;
      state.player.moving = false;
      message = '电流穿过旧线路，穿界电台终于亮了。明天，有了信号。';
      kind = 'repair';
      duration = 0;
    } else if (id === 'ending_kindness' || id === 'ending_leave') {
      if (!state.repaired) return failure('先修好北面的穿界电台，才能接通世界线。');
      if (id === 'ending_kindness') {
        if (bag.water < 1) return failure('至少留下一份净水，才能把这份希望交给集市。');
        bag.water--;
        state.ending = 'kindness';
        message = '你留下一份净水。集市的灯火会替你守住这条回家的路。';
      } else {
        state.ending = 'leave';
        message = '你带着集市的信号告别。下一段旅程，正在电波的另一端等你。';
      }
      kind = 'ending';
      duration = 0;
    } else {
      return failure('这里暂时没有可以进行的交易。');
    }

    var events = tick(state, duration);
    if (events.length) message += ' ' + events.join(' ');
    return { ok: true, message: message, kind: kind, events: events };
  }

  return { create: create, action: action, tick: tick, nodes: nodes, solids: solids };
});
