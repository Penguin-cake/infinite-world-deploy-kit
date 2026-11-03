/* =========================================================
 * 终局结算页逻辑（主办方页面，队伍不用改）
 * ========================================================= */

/* ★ 组织者要维护的：按最终抽签结果填写通关者名单（每关一条） */
var CONFIG = {
  hallUrl: '../main-hall/index.html',
  teams: [
    /* 示例数据——活动当天按抽签结果改成真实队名 */
    { level: 1, world: '永夜列车',   team: '待定' },
    { level: 2, world: '深海囚笼',   team: '待定' },
    { level: 3, world: '极夜科考站', team: '待定' }
  ]
};

var save = WL.readSave();        /* 最后一个世界写出的终局存档 */
var journeyHistory = WL.readHistory();  /* 整条世界线的通关旅程 */

/* ---------- 结算评级（小彩蛋） ---------- */

function grade() {
  var score = save.player.hp + save.player.sanity;
  if (score >= 6) return { rank: 'S', label: '完美通关——系统也挑不出毛病的通关者' };
  if (score >= 5) return { rank: 'A', label: '优秀通关——带着清醒与完整的自己走到了终点' };
  if (score >= 4) return { rank: 'B', label: '勉强通关——你丢失了一部分东西，但终点还是到了' };
  if (save.player.hp === 0) return { rank: 'D', label: '惨胜——命悬一线地爬过了终点线' };
  return { rank: 'C', label: '艰难通关——理智所剩无几，但故事还算完整' };
}

function render() {
  var E = WL.escapeHtml;

  /* 页头副标题 */
  if (save.prev_world) {
    document.getElementById('finale-sub').textContent =
      '从『' + save.prev_world + '』的结局里走出来的，是你。';
  }

  /* 结算评级 */
  var g = grade();
  document.getElementById('grade-panel').innerHTML =
    '<h3>结算评级</h3>' +
    '<div class="grade">' +
      '<span class="grade-rank">' + g.rank + '</span>' +
      '<div>' +
        '<div class="grade-label">' + E(g.label) + '</div>' +
        '<div class="grade-stats">最终面板：命 ' + save.player.hp + ' · 理智 ' + save.player.sanity + '</div>' +
      '</div>' +
    '</div>';

  /* 旅程回放（彩蛋：整条世界线的结局串联） */
  var journey = '<h3>旅程回放</h3>';
  if (!journeyHistory.length) {
    journey += '<p class="dim">（未检测到通关记录——可能是直接打开本页演示，请从主神大厅开始体验完整链路。）</p>';
  } else {
    journeyHistory.forEach(function (h) {
      journey += '<div class="journey-row">' +
        '<span class="j-lv">第' + h.level + '关</span>' +
        '<span class="j-world">' + E(h.world) + '</span>' +
        '<span class="j-hook">“' + E(h.hook || '……') + '”</span>' +
      '</div>';
    });
  }
  document.getElementById('journey-panel').innerHTML = journey;

  /* 跨关遗物与线索 */
  var carry = '<h3>你带出终点的东西</h3>';
  if (save.items.length) {
    carry += '<div class="carry-row">遗物：' + save.items.map(function (i) {
      return '<span class="tag">' + E(i.name) + '（' + (WL.TYPE_LABELS[i.type] || i.type) + '）</span>';
    }).join('') + '</div>';
  } else {
    carry += '<div class="carry-row">遗物：无——你两手空空地走完了全程。</div>';
  }
  if (save.clues.length) {
    carry += '<div class="carry-row">线索：' + save.clues.map(function (c) {
      return '<span class="tag">' + E(c) + '</span>';
    }).join('') + '</div>';
  } else {
    carry += '<div class="carry-row">线索：无——有些谜题，注定被带出世界线。</div>';
  }
  document.getElementById('carry-panel').innerHTML = carry;

  /* 全部通关者名单 */
  var credits = '<h3>本次世界线 · 全部通关者</h3>';
  CONFIG.teams.forEach(function (t) {
    credits += '<div class="credit-row">' +
      '<span class="c-lv">第' + t.level + '关</span>' +
      '<span class="c-world">' + E(t.world) + '</span>' +
      '<span class="c-team">—— ' + E(t.team) + '</span>' +
    '</div>';
  });
  document.getElementById('credits-panel').innerHTML = credits;
}

document.getElementById('restart-btn').onclick = function () {
  WL.resetRun();
  location.href = CONFIG.hallUrl;
};

render();

