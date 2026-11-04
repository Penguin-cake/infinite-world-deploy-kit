/* Original pixel scenery for 幽冥戏班 · 子夜折子. No external assets. */
(function (global) {
  'use strict';

  const C = {
    night: '#101924', floor: '#26353b', joint: '#1c2b32', stone: '#34444a',
    stoneLight: '#43545a', teal: '#506f73', mist: '#8ba8a5', ink: '#111b24',
    wood: '#4b3435', woodLight: '#71504a', woodDark: '#2d252e',
    red: '#aa463e', brightRed: '#d86548', deepRed: '#612f37',
    gold: '#b6965e', lightGold: '#e6c385', bone: '#ded5b5', dimBone: '#b8b69e',
    jade: '#71938a', cyan: '#a2c4ad', outline: '#14222b'
  };

  function rect(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }

  function seeded(seed) {
    let n = seed >>> 0;
    return function () { n = (Math.imul(n, 1664525) + 1013904223) >>> 0; return n / 4294967296; };
  }

  function line(ctx, x1, y1, x2, y2, color, size) {
    const w = size || 2;
    const n = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
    if (!n) { rect(ctx, x1, y1, w, w, color); return; }
    for (let i = 0; i <= n; i += 2) rect(ctx, x1 + (x2 - x1) * i / n, y1 + (y2 - y1) * i / n, w, w, color);
  }

  function text(ctx, value, x, y, color, size, align) {
    ctx.font = '600 ' + (size || 11) + 'px "Microsoft YaHei","PingFang SC",sans-serif';
    ctx.textAlign = align || 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color || C.dimBone;
    ctx.fillText(value, Math.round(x), Math.round(y));
  }

  function steppedShadow(ctx, x, y, w, h) {
    rect(ctx, x - w / 2 + 3, y - h / 2, w - 6, h, '#0d1721aa');
    rect(ctx, x - w / 2, y - h / 2 + 3, w, h - 6, '#0d1721aa');
  }

  function squareGlow(ctx, x, y, radius, color) {
    for (let i = 4; i > 0; i--) {
      ctx.globalAlpha = 0.016 * (5 - i);
      rect(ctx, x - radius * i / 4, y - radius * i / 6, radius * i / 2, radius * i / 3, color);
    }
    ctx.globalAlpha = 1;
  }

  function lantern(ctx, x, y, scale, frame, spirit) {
    const s = scale || 1;
    const dx = frame ? Math.round(Math.sin(frame) * 2) : 0;
    x += dx;
    const shell = spirit ? '#6a9d90' : '#bd5444';
    const shine = spirit ? '#bbd7b0' : '#e79459';
    line(ctx, x, y - 17 * s, x, y - 2 * s, C.gold, s);
    rect(ctx, x - 6 * s, y - 3 * s, 12 * s, 2 * s, C.gold);
    rect(ctx, x - 9 * s, y, 18 * s, 16 * s, C.deepRed);
    rect(ctx, x - 11 * s, y + 3 * s, 22 * s, 10 * s, shell);
    rect(ctx, x - 8 * s, y + 1 * s, 16 * s, 14 * s, shell);
    rect(ctx, x - 5 * s, y + 2 * s, 3 * s, 12 * s, shine);
    rect(ctx, x + 2 * s, y + 2 * s, 2 * s, 12 * s, shine);
    rect(ctx, x - 7 * s, y + 16 * s, 14 * s, 2 * s, C.gold);
    rect(ctx, x - s, y + 18 * s, 2 * s, 10 * s, C.gold);
    rect(ctx, x - 3 * s, y + 26 * s, 6 * s, 4 * s, spirit ? C.cyan : C.red);
  }

  function roofTile(ctx, x, y, w, color) {
    rect(ctx, x, y, w, 7, color || '#304047');
    for (let i = 3; i < w - 3; i += 10) {
      rect(ctx, x + i, y, 2, 7, '#4b5a5c');
      rect(ctx, x + i - 2, y + 5, 7, 2, '#1d2b34');
    }
  }

  function mask(ctx, x, y, kind, s) {
    const scale = s || 1;
    const main = kind === 'red' ? '#c45047' : kind === 'white' ? '#dcd6b9' : '#29323b';
    const dark = kind === 'black' ? '#a6b3a0' : '#282c32';
    const r = (a, b, w, h, c) => rect(ctx, x + a * scale, y + b * scale, w * scale, h * scale, c);
    r(-7, -8, 14, 14, C.outline); r(-5, -10, 10, 18, C.outline);
    r(-5, -7, 10, 13, main); r(-3, -9, 6, 17, main);
    r(-5, -3, 4, 2, dark); r(1, -3, 4, 2, dark);
    r(-4, -5, 3, 2, dark); r(2, -5, 3, 2, dark);
    r(-1, -5, 2, 7, kind === 'red' ? '#e9c78c' : kind === 'white' ? '#b6403e' : '#dfd6b5');
    r(-3, 4, 6, 2, dark); r(-1, 6, 2, 2, C.gold);
    r(-3, -8, 2, 2, '#f2e0b9');
  }

  function pillar(ctx, x, y, h, color) {
    rect(ctx, x - 8, y + 4, 18, h, C.woodDark);
    rect(ctx, x - 7, y, 14, h, color || C.deepRed);
    rect(ctx, x - 6, y + 4, 3, h - 8, '#a04a42');
    rect(ctx, x - 11, y - 3, 22, 7, C.gold);
    rect(ctx, x - 10, y + h - 8, 20, 8, '#535557');
    rect(ctx, x - 12, y + h, 24, 7, '#2c353d');
  }

  function chair(ctx, x, y, occupied, ghostPhase, facing) {
    steppedShadow(ctx, x + 5, y + 4, 55, 14);
    rect(ctx, x - 21, y - 23, 42, 6, '#302b32');
    rect(ctx, x - 19, y - 24, 38, 4, C.woodLight);
    rect(ctx, x - 18, y - 21, 4, 18, C.wood);
    rect(ctx, x + 14, y - 21, 4, 18, C.wood);
    rect(ctx, x - 16, y - 12, 32, 4, '#664b43');
    rect(ctx, x - 23, y - 7, 5, 18, '#61483f');
    rect(ctx, x + 18, y - 7, 5, 18, '#61483f');
    rect(ctx, x - 20, y + 3, 40, 5, C.woodLight);
    rect(ctx, x - 18, y + 8, 4, 9, C.wood);
    rect(ctx, x + 14, y + 8, 4, 9, C.wood);
    rect(ctx, x - 16, y + 4, 32, 2, C.gold);
    if (occupied) {
      const bob = Math.round(Math.sin(ghostPhase || 0) * 2);
      ctx.globalAlpha = 0.58;
      rect(ctx, x - 11, y - 24 + bob, 22, 19, '#678883');
      rect(ctx, x - 8, y - 30 + bob, 16, 11, '#829b8d');
      rect(ctx, x - 5, y - 32 + bob, 10, 3, '#a3b7a0');
      rect(ctx, x - 14, y - 16 + bob, 5, 14, '#4b7271');
      rect(ctx, x + 9, y - 16 + bob, 5, 14, '#4b7271');
      rect(ctx, x - 11, y - 2 + bob, 22, 6, '#526f71');
      if (facing === 'front') {
        rect(ctx, x - 5, y - 26 + bob, 3, 2, C.ink);
        rect(ctx, x + 2, y - 26 + bob, 3, 2, C.ink);
      }
      ctx.globalAlpha = 1;
    }
  }

  function person(ctx, x, y, type, dir, stride, phase) {
    x = Math.round(x); y = Math.round(y);
    const walking = stride || 0;
    const ghost = type === 'paper';
    steppedShadow(ctx, x + 3, y + 1, type === 'actor' ? 34 : 28, 10);
    const r = (a, b, w, h, c) => rect(ctx, x + a, y + b, w, h, c);
    if (type === 'actor') {
      r(-14, -30, 28, 24, C.deepRed); r(-11, -33, 22, 28, '#ba5149');
      r(-8, -37, 16, 14, '#e3d5b0'); r(-10, -40, 20, 7, '#253642');
      r(-13, -43, 26, 5, '#bb9d67'); r(-8, -47, 16, 6, '#2c4c55');
      r(-2, -50, 4, 5, C.lightGold);
      r(-5, -34, 3, 2, C.ink); r(3, -34, 3, 2, C.ink);
      r(-7, -30, 4, 2, C.red); r(4, -30, 4, 2, C.red);
      r(-1, -29, 3, 4, C.red); r(-3, -22, 6, 13, C.lightGold);
      r(-16, -25, 6, 15, C.red); r(10, -25, 6, 15, C.red);
      const sway = Math.round(Math.sin(phase || 0) * 4);
      r(-30, -21 + sway, 17, 7, '#ddd7bc'); r(-36, -19 + sway, 9, 15, '#ddd7bc');
      r(13, -20 - sway, 21, 7, '#ddd7bc'); r(28, -17 - sway, 8, 13, '#ddd7bc');
      r(-11, -9, 22, 6, C.gold); r(-9, -3, 6, 5, '#202c36'); r(4, -3, 6, 5, '#202c36');
      return;
    }
    const coat = ghost ? '#b8bfaa' : '#426f72';
    const lit = ghost ? '#d6d8b8' : '#6d9d92';
    const shade = ghost ? '#798b81' : '#2a505d';
    r(-10, -32, 20, 29, C.outline); r(-12, -26, 24, 21, C.outline);
    r(-8, -25, 16, 20, coat); r(-10, -23, 5, 15, shade); r(7, -23, 5, 15, shade);
    r(-9, -8, 18, 5, shade); r(-7, -5, 6, 7 + Math.max(0, walking), '#21343d');
    r(3, -5, 6, 7 + Math.max(0, -walking), '#21343d');
    r(-8, 1 + Math.max(0, walking), 8, 3, '#182733'); r(2, 1 + Math.max(0, -walking), 8, 3, '#182733');
    r(-6, -38, 14, 14, ghost ? C.bone : '#c49b77'); r(-8, -36, 18, 8, ghost ? C.bone : '#c49b77');
    if (ghost) {
      r(-9, -42, 19, 7, '#2e454a'); r(-5, -47, 12, 7, '#384e50'); r(-2, -44, 4, 4, C.gold);
      r(-6, -32, 4, 2, '#3e5558'); r(3, -32, 4, 2, '#3e5558'); r(-1, -28, 4, 2, '#8e4941');
      r(-3, -22, 6, 16, '#ae5650'); r(-11, -16, 4, 9, '#d1ceae'); r(9, -16, 4, 9, '#d1ceae');
    } else {
      r(-8, -41, 18, 6, '#2d3f4b'); r(-11, -36, 24, 4, '#354a53'); r(-6, -43, 14, 3, '#60776d');
      r(-1, -25, 7, 6, '#c47355'); r(4, -21, 5, 8, '#b4614d'); r(-6, -21, 3, 11, lit);
      r(-12, -19, 5, 10, '#b18c6d'); r(9, -19, 5, 10, '#b18c6d');
      if (dir !== 'up') {
        if (dir !== 'right') r(-4, -31, 2, 2, '#2b3439');
        if (dir !== 'left') r(5, -31, 2, 2, '#2b3439');
      } else {
        r(-6, -33, 14, 8, '#38494d'); r(-3, -25, 9, 5, '#c47355');
      }
      r(-9, -12, 18, 3, '#b39b6c'); r(0, -12, 3, 3, '#e0bd79');
    }
  }

  function makeBackground(ctx) {
    const random = seeded(460617);
    rect(ctx, 0, 0, 960, 600, C.night);
    // The enclosing wall, with little hints of a dark village beyond it.
    for (let x = 0; x < 960; x += 27) {
      const height = 10 + Math.floor(random() * 30);
      rect(ctx, x, 47 - height, 24, height + 21, '#17232f');
      if (random() > .7) rect(ctx, x + 7, 48 - height, 3, 5, '#6c6b4e');
    }
    rect(ctx, 0, 65, 960, 39, '#2d3b40');
    for (let row = 0; row < 3; row++) for (let x = -24; x < 984; x += 48) {
      const xx = x + (row % 2 ? 24 : 0);
      rect(ctx, xx + 2, 69 + row * 11, 45, 9, row % 2 ? '#344247' : '#303d42');
      rect(ctx, xx + 3, 69 + row * 11, 41, 1, '#435054');
    }
    roofTile(ctx, 0, 59, 960, '#26383f');
    rect(ctx, 0, 100, 960, 500, C.floor);
    // Courtyard paving. Patterns are intentionally hard-edged rather than filtered.
    for (let row = 0; row < 24; row++) for (let col = 0; col < 35; col++) {
      const x = col * 29 + (row % 2 ? -14 : 0), y = 102 + row * 21;
      const shade = random();
      rect(ctx, x + 1, y + 1, 27, 19, shade < .25 ? '#2b3c41' : shade > .81 ? '#304148' : '#29393f');
      if (random() > .64) rect(ctx, x + 3, y + 3, 10 + random() * 12, 1, '#4c5b592b');
    }
    rect(ctx, 439, 174, 82, 381, '#3d4d50');
    rect(ctx, 447, 176, 66, 379, '#465459');
    for (let row = 0; row < 21; row++) {
      const y = 179 + row * 18;
      rect(ctx, 447, y, 66, 2, '#2d3f46');
      rect(ctx, row % 2 ? 474 : 479, y + 2, 2, 16, '#34464a');
      rect(ctx, 450, y + 3, 18, 1, '#65717055');
    }
    // Weathered side walls and low courtyard rails.
    for (const x of [15, 925]) {
      rect(ctx, x, 94, 20, 476, '#273339'); rect(ctx, x + 3, 94, 7, 476, '#3e4b4d');
      for (let y = 110; y < 570; y += 35) {
        rect(ctx, x - 2, y, 24, 7, '#4a5451'); rect(ctx, x + 2, y + 7, 16, 3, '#172932');
      }
    }
    rect(ctx, 22, 560, 394, 13, '#2f3e43'); rect(ctx, 544, 560, 393, 13, '#2f3e43');
    roofTile(ctx, 22, 553, 394); roofTile(ctx, 544, 553, 393);
    // Main stage: a wide, layered roof and red curtains around a passable center.
    steppedShadow(ctx, 487, 241, 406, 37);
    rect(ctx, 303, 77, 354, 143, '#252631'); rect(ctx, 319, 76, 322, 131, '#3e2d35');
    rect(ctx, 431, 94, 98, 99, '#182830');
    rect(ctx, 443, 101, 74, 90, '#13252c');
    rect(ctx, 451, 111, 58, 79, '#263a3a');
    rect(ctx, 460, 119, 40, 72, '#354b44');
    rect(ctx, 473, 123, 13, 69, '#65725633');
    rect(ctx, 326, 88, 105, 104, '#742f37'); rect(ctx, 529, 88, 105, 104, '#742f37');
    for (let i = 0; i < 7; i++) {
      rect(ctx, 329 + i * 14, 91, 7, 101, i % 2 ? '#9b403d' : '#80323a');
      rect(ctx, 531 + i * 14, 91, 7, 101, i % 2 ? '#80323a' : '#9b403d');
      rect(ctx, 331 + i * 14, 185 + i % 2 * 2, 10, 7, C.gold);
      rect(ctx, 531 + i * 14, 185 + i % 2 * 2, 10, 7, C.gold);
    }
    for (let i = 0; i < 4; i++) {
      rect(ctx, 397 + i * 8, 111 + i * 18, 30 - i * 7, 22, '#672f39');
      rect(ctx, 529 - i * 3, 111 + i * 18, 34 - i * 7, 22, '#672f39');
    }
    rect(ctx, 322, 82, 316, 19, '#6f3038');
    for (let i = 0; i < 17; i++) {
      rect(ctx, 325 + i * 18, 95, 15, 4 + (i % 2) * 3, C.red);
      rect(ctx, 330 + i * 18, 100, 4, 3, C.gold);
    }
    rect(ctx, 303, 197, 354, 22, '#59403c'); rect(ctx, 306, 198, 348, 3, '#b08158');
    for (let x = 309; x < 654; x += 25) {
      rect(ctx, x, 202, 23, 11, '#6a4940'); rect(ctx, x + 2, 203, 19, 1, '#86614d');
    }
    rect(ctx, 302, 217, 356, 8, '#292c31'); rect(ctx, 434, 218, 92, 7, '#758078');
    rect(ctx, 431, 225, 98, 7, '#3b5051'); rect(ctx, 425, 232, 110, 6, '#5c6b63');
    rect(ctx, 420, 238, 120, 5, '#2a3c42');
    pillar(ctx, 314, 78, 142); pillar(ctx, 646, 78, 142);
    rect(ctx, 289, 72, 382, 13, '#60363a'); rect(ctx, 286, 68, 388, 6, C.gold);
    // Pixel-step flying eaves.
    rect(ctx, 305, 30, 350, 9, '#344850'); rect(ctx, 293, 38, 374, 8, '#3e5459');
    rect(ctx, 280, 46, 400, 9, '#31454d'); rect(ctx, 266, 55, 428, 9, '#273c47');
    rect(ctx, 255, 62, 450, 7, '#1c303d');
    rect(ctx, 250, 58, 28, 8, '#476163'); rect(ctx, 245, 51, 13, 9, '#526b68');
    rect(ctx, 241, 44, 8, 9, C.gold); rect(ctx, 682, 58, 28, 8, '#476163');
    rect(ctx, 703, 51, 13, 9, '#526b68'); rect(ctx, 711, 44, 8, 9, C.gold);
    for (let y = 35; y < 66; y += 8) {
      const inset = (64 - y) * 1.5;
      for (let x = 264 + inset; x < 698 - inset; x += 13) {
        rect(ctx, x, y, 9, 2, '#657573'); rect(ctx, x + 7, y + 2, 2, 4, '#1a2a35');
      }
    }
    rect(ctx, 402, 48, 156, 40, '#1d242c'); rect(ctx, 406, 51, 148, 34, C.gold);
    rect(ctx, 409, 54, 142, 28, '#382a2e'); rect(ctx, 413, 58, 134, 20, '#4f3032');
    text(ctx, '幽 冥 戏 班', 480, 68, C.lightGold, 17);
    rect(ctx, 316, 104, 18, 92, '#442a30'); rect(ctx, 627, 104, 18, 92, '#442a30');
    ['一','曲','未','了'].forEach((v, i) => text(ctx, v, 326, 119 + i * 20, '#c4a672', 11));
    ['故','人','莫','归'].forEach((v, i) => text(ctx, v, 635, 119 + i * 20, '#c4a672', 11));
    // Left changing room and an old opera manuscript.
    rect(ctx, 186, 149, 107, 24, '#29383e'); roofTile(ctx, 181, 143, 116);
    pillar(ctx, 192, 166, 52, '#304f52'); pillar(ctx, 288, 166, 52, '#304f52');
    rect(ctx, 198, 168, 86, 28, '#5b4741'); rect(ctx, 194, 192, 94, 9, C.woodDark);
    rect(ctx, 194, 174, 94, 5, '#9b7d58'); rect(ctx, 204, 198, 5, 24, C.wood); rect(ctx, 273, 198, 5, 24, C.wood);
    rect(ctx, 218, 175, 40, 23, '#b9b69b'); rect(ctx, 220, 176, 16, 20, '#dad1b0');
    rect(ctx, 240, 176, 16, 20, '#d2c6a5'); rect(ctx, 237, 176, 3, 20, '#8a876f');
    for (let i = 0; i < 4; i++) {
      rect(ctx, 223, 180 + i * 4, 10, 1, '#817e69'); rect(ctx, 244, 180 + i * 4, 9, 1, '#817e69');
    }
    rect(ctx, 261, 175, 7, 19, '#2e3c40'); rect(ctx, 258, 175, 13, 4, '#9e8e61');
    text(ctx, '旧戏本 · 未完折子', 240, 158, '#c3bd98', 10);
    // Right wing: the hanging masks, ribbons and costume cabinet.
    rect(ctx, 743, 165, 114, 13, '#463437'); roofTile(ctx, 738, 158, 125);
    rect(ctx, 749, 182, 7, 60, C.woodLight); rect(ctx, 845, 182, 7, 60, C.woodLight);
    rect(ctx, 752, 180, 96, 6, C.gold); rect(ctx, 756, 192, 90, 43, '#222d33');
    for (let i = 0; i < 3; i++) {
      rect(ctx, 769 + i * 29, 186, 2, 10, '#9d916e');
      mask(ctx, 770 + i * 29, 209, ['red', 'white', 'black'][i], 1.35);
      rect(ctx, 768 + i * 29, 222, 4, 13, i === 1 ? '#b8b9a0' : C.deepRed);
    }
    rect(ctx, 743, 239, 115, 8, '#5b4240'); rect(ctx, 746, 245, 8, 16, '#3d3539'); rect(ctx, 846, 245, 8, 16, '#3d3539');
    text(ctx, '借 一 张 面，唱 一 段 命', 800, 174, '#d0b789', 9);
    // Ancient tree: angular branches and cold foliage.
    steppedShadow(ctx, 113, 229, 120, 24);
    rect(ctx, 101, 143, 19, 79, '#41403c'); rect(ctx, 108, 122, 17, 95, '#605447');
    rect(ctx, 111, 146, 4, 66, '#8b7150'); rect(ctx, 100, 212, 37, 8, '#4d4e43');
    line(ctx, 115, 155, 72, 120, '#5d5546', 8); line(ctx, 118, 151, 152, 104, '#5d5546', 9);
    line(ctx, 108, 135, 102, 88, '#4b4d42', 8); line(ctx, 103, 106, 77, 88, '#4b4d42', 5);
    const foliage = [[58,96,43,34],[78,71,43,42],[105,88,43,37],[132,84,34,43],[64,123,41,35],[119,118,45,37],[91,111,40,42]];
    foliage.forEach((p, i) => {
      rect(ctx, p[0] + 5, p[1], p[2] - 10, p[3], i % 2 ? '#324d4b' : '#2b4344');
      rect(ctx, p[0], p[1] + 6, p[2], p[3] - 13, i % 2 ? '#355450' : '#304b48');
      rect(ctx, p[0] + 7, p[1] + 5, p[2] - 20, 4, '#557065');
    });
    for (let i = 0; i < 25; i++) {
      const x = 57 + random() * 110, y = 80 + random() * 75;
      rect(ctx, x, y, 4, 3, '#69827655');
    }
    // Shrine beneath the tree, burning a cold guide flame.
    rect(ctx, 89, 239, 42, 8, '#394c51'); rect(ctx, 96, 244, 28, 26, '#2b4048');
    rect(ctx, 101, 251, 18, 20, '#5a746d'); rect(ctx, 105, 248, 10, 27, '#a4bd96');
    rect(ctx, 88, 268, 44, 8, '#5d6c64'); rect(ctx, 82, 275, 56, 7, '#253e46');
    // Ticket booth and paper charms.
    steppedShadow(ctx, 156, 415, 133, 18);
    rect(ctx, 96, 351, 109, 16, '#48363a'); roofTile(ctx, 90, 344, 121);
    pillar(ctx, 103, 368, 43); pillar(ctx, 199, 368, 43);
    rect(ctx, 107, 370, 88, 27, '#67453d'); rect(ctx, 109, 373, 84, 3, '#b18c5e');
    rect(ctx, 112, 391, 78, 9, '#3f3035');
    rect(ctx, 121, 374, 29, 18, '#bcb797'); rect(ctx, 124, 377, 22, 12, '#d4c7a1');
    rect(ctx, 128, 380, 14, 2, '#8a7358'); rect(ctx, 161, 375, 14, 13, '#8b493c');
    text(ctx, '请 对 号 入 座', 151, 359, C.lightGold, 10);
    // Gong stand at the right, with a visible mallet and red cloth.
    rect(ctx, 650, 378, 6, 40, '#735649'); rect(ctx, 745, 378, 6, 40, '#735649');
    rect(ctx, 649, 376, 102, 7, C.gold); rect(ctx, 657, 386, 86, 3, '#bd925d');
    rect(ctx, 693, 384, 3, 10, '#c1a275'); rect(ctx, 679, 392, 34, 33, '#735c45');
    rect(ctx, 674, 398, 44, 21, '#a28455'); rect(ctx, 681, 393, 30, 31, '#bb9f65');
    rect(ctx, 686, 398, 20, 21, '#d4b578'); rect(ctx, 690, 403, 12, 12, '#a78551');
    rect(ctx, 692, 405, 8, 8, '#e3c98b'); rect(ctx, 677, 418, 38, 5, '#6f5846');
    rect(ctx, 650, 416, 13, 6, '#3f4140'); rect(ctx, 738, 416, 13, 6, '#3f4140');
    line(ctx, 731, 393, 744, 421, '#b09164', 3); rect(ctx, 728, 389, 9, 8, '#9a4840');
    rect(ctx, 661, 389, 7, 32, '#843a3e');
    // Audience rows leave the broad central aisle open.
    [[357,309],[447,309],[537,309],[627,309],[357,370],[627,370]].forEach(p => chair(ctx, p[0], p[1], false));
    chair(ctx, 474, 366, false);
    rect(ctx, 461, 361, 26, 13, '#d2c4a1'); rect(ctx, 464, 364, 20, 1, '#9d8063');
    rect(ctx, 466, 367, 16, 1, '#9d8063'); text(ctx, '客', 474, 368, '#764d41', 9);
    // Red side rugs and small backstage piles.
    for (const x of [62, 854]) {
      rect(ctx, x, 318, 37, 103, '#4f3439'); rect(ctx, x + 3, 321, 31, 97, '#6a3b3e');
      for (let y = 326; y < 415; y += 14) rect(ctx, x + 7, y, 23, 2, '#a76a4866');
      rect(ctx, x + 4, 319, 29, 2, C.gold); rect(ctx, x + 4, 419, 29, 2, C.gold);
    }
    [[270,469],[793,487],[212,304],[845,332]].forEach((p, index) => {
      steppedShadow(ctx, p[0] + 3, p[1] + 7, 32, 13);
      rect(ctx, p[0] - 13, p[1] - 16, 26, 25, '#51413b'); rect(ctx, p[0] - 10, p[1] - 13, 20, 19, '#725545');
      rect(ctx, p[0] - 15, p[1] - 18, 30, 4, '#997650'); rect(ctx, p[0] - 3, p[1] - 15, 4, 23, '#b79b6b');
      rect(ctx, p[0] - 12, p[1] - 2, 24, 3, '#3c3435');
      if (index % 2 === 0) rect(ctx, p[0] - 9, p[1] - 25, 17, 8, '#baae89');
    });
    // Fallen leaves, folded paper money and tiny cracks.
    for (let i = 0; i < 150; i++) {
      const x = 42 + random() * 876, y = 110 + random() * 435;
      if (x > 303 && x < 659 && y < 245) continue;
      const paper = i % 6 === 0;
      rect(ctx, x, y, paper ? 6 : 3, paper ? 4 : 2, paper ? '#b6ad8877' : '#8c816155');
      if (paper) rect(ctx, x + 2, y + 1, 2, 2, '#5b5b4988');
      if (i % 13 === 0) { rect(ctx, x + 3, y + 7, 15, 1, '#172932'); rect(ctx, x + 15, y + 8, 5, 1, '#172932'); }
    }
    // Entry gateway, a subdued route back to the unknown.
    rect(ctx, 423, 542, 8, 40, '#69524a'); rect(ctx, 529, 542, 8, 40, '#69524a');
    rect(ctx, 417, 537, 126, 8, '#33474d'); rect(ctx, 431, 545, 98, 16, '#28383e');
    text(ctx, '子 时 · 戏 院 入 口', 480, 554, '#b09f7b', 9);
  }

  class OperaRenderer {
    constructor(canvas, nodes, solids) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.ctx.imageSmoothingEnabled = false;
      this.nodes = nodes || [];
      this.solids = solids || [];
      this.background = document.createElement('canvas');
      this.background.width = 960; this.background.height = 600;
      const ctx = this.background.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      makeBackground(ctx);
      this.reducedMotion = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    label(ctx, node, active, state) {
      const gone = node.id === 'ticket' && state.flags && state.flags.ticket;
      const name = node.id === 'exit' && !state.ending ? '幕后之门 · 封' : node.name;
      const w = Math.max(48, name.length * 11 + 20);
      const y = node.y + (node.id === 'exit' ? 8 : 16);
      rect(ctx, node.x - w / 2 - 1, y - 8, w + 2, 20, active ? '#b69b64' : '#52646299');
      rect(ctx, node.x - w / 2, y - 7, w, 18, active ? '#d3c9a6' : '#192b33df');
      rect(ctx, node.x - w / 2 + 3, y - 5, 2, 14, active ? '#8b4c41' : '#9b835e');
      text(ctx, name, node.x + 2, y + 2, active ? '#283d42' : gone ? '#92a39b' : '#d7c9a6', 10);
    }

    render(state, nowMs, target, nearestId) {
      const ctx = this.ctx;
      const time = this.reducedMotion ? 0 : (Number(nowMs) || 0) / 1000;
      const flags = state.flags || {};
      const player = state.player || { x: 480, y: 525, dir: 'down', moving: false };
      ctx.clearRect(0, 0, 960, 600);
      ctx.drawImage(this.background, 0, 0);

      // A few low, stepped patches of fog never obscure the walkable central aisle.
      for (let i = 0; i < 6; i++) {
        const x = (time * (3 + i % 3) + i * 187) % 1220 - 160;
        const y = 115 + i * 69 + Math.round(Math.sin(time * .2 + i) * 5);
        rect(ctx, x + 15, y, 104, 5, '#8aafa611');
        rect(ctx, x, y + 5, 165, 5, '#8aafa60d');
        rect(ctx, x + 35, y + 10, 114, 3, '#8aafa60a');
      }

      // Square light pools give lanterns a warm falloff without smoothing the art.
      const lamps = [[284,113,1.25],[676,113,1.25],[53,295,.9],[905,295,.9],[221,464,.9],[811,463,.9]];
      lamps.forEach((p, i) => {
        squareGlow(ctx, p[0], p[1] + 13, 55, '#d87341');
        lantern(ctx, p[0], p[1], p[2], time * .8 + i);
      });
      line(ctx, 45, 246, 187, 243, '#68756a', 1);
      line(ctx, 775, 243, 911, 247, '#68756a', 1);
      lantern(ctx, 110, 240, 1.05, time * .65, true);
      if (flags.lantern) {
        squareGlow(ctx, 110, 274, 57, '#bad7a4');
        rect(ctx, 106, 252, 10, 15, '#afcfa5'); rect(ctx, 109, 245 + Math.round(Math.sin(time * 2) * 2), 4, 17, '#d9e7b6');
      }

      // The waiting audience grows clearer as the three acts proceed.
      const act = Number(state.act) || 0;
      const guests = [[357,309],[447,309],[537,309],[627,309],[357,370],[627,370]];
      guests.forEach((p, i) => chair(ctx, p[0], p[1], i < 3 + act, time * .7 + i));
      chair(ctx, 474, 366, !!flags.seat, time * .8, 'front');
      if (!flags.seat) {
        rect(ctx, 464, 360, 21, 12, '#c2baa0'); text(ctx, '客', 474, 366, '#7f5948', 10);
      }

      // A singer remains on the boards; white sleeves sway in the quiet air.
      person(ctx, 480 + Math.round(Math.sin(time * .4) * 3), 188, 'actor', 'down', 0, time * 1.2);
      if (state.maskSolved) {
        [0, 1, 2].forEach((i) => {
          rect(ctx, 424 + i * 54, 92, 3, 6, '#d4c698');
          mask(ctx, 425 + i * 54, 104, ['red', 'white', 'black'][i], .8);
        });
      }
      if (state.gongSolved) {
        rect(ctx, 686, 403, 20, 11, '#efcf88');
        const pulse = Math.floor(time * 2) % 3;
        for (let i = 0; i < 3; i++) rect(ctx, 723 + i * 5, 398 - i * 3, 2, 8 + (i + pulse) % 3 * 2, '#dbc28277');
      }
      // Scroll readability and a tiny guiding mote reward inspection.
      if (flags.script || state.learned) {
        rect(ctx, 219, 176, 38, 20, '#d8d2af');
        rect(ctx, 236, 176, 2, 20, '#837d62');
        for (let i = 0; i < 4; i++) rect(ctx, 223, 180 + i * 4, 9, 1, '#7b7760');
        squareGlow(ctx, 240, 195, 30, '#d0cf98');
      }

      const people = [{ x: 160, y: 435, type: 'paper', dir: 'down', stride: 0 }];
      people.push({ x: player.x, y: player.y, type: 'player', dir: player.dir, stride: player.moving ? (Math.sin(time * 15) > 0 ? 3 : -3) : 0 });
      people.sort((a, b) => a.y - b.y).forEach(p => person(ctx, p.x, p.y, p.type, p.dir, p.stride));

      // The player's travelling lamp makes them immediately identifiable in the night.
      const px = player.x + 19, py = player.y - 18;
      if (flags.lantern) {
        squareGlow(ctx, player.x, player.y - 11, 47, '#a8d3ac');
        rect(ctx, px - 2, py - 3, 7, 10, '#8ea990'); rect(ctx, px, py - 2, 3, 7, '#e2dfb4');
      }
      rect(ctx, player.x - 5, player.y - 57, 10, 2, '#d6c38c');
      rect(ctx, player.x - 3, player.y - 55, 6, 2, '#d6c38c');
      rect(ctx, player.x - 1, player.y - 53, 2, 2, '#d6c38c');

      if (target && Number.isFinite(target.x) && Number.isFinite(target.y)) {
        const s = 8 + (Math.sin(time * 4) > 0 ? 2 : 0), x = Math.round(target.x), y = Math.round(target.y);
        rect(ctx, x - s, y - s, 6, 2, C.lightGold); rect(ctx, x - s, y - s, 2, 6, C.lightGold);
        rect(ctx, x + s - 4, y - s, 6, 2, C.lightGold); rect(ctx, x + s, y - s, 2, 6, C.lightGold);
        rect(ctx, x - s, y + s, 6, 2, C.lightGold); rect(ctx, x - s, y + s - 4, 2, 6, C.lightGold);
        rect(ctx, x + s - 4, y + s, 6, 2, C.lightGold); rect(ctx, x + s, y + s - 4, 2, 6, C.lightGold);
      }

      if (state.ending || flags.performed) {
        squareGlow(ctx, 480, 133, 150, '#a0c297');
        rect(ctx, 458, 105, 45, 86, '#759a8188'); rect(ctx, 468, 112, 25, 79, '#bdd0a255');
        for (let i = 0; i < 10; i++) {
          const yy = 188 - (time * 12 + i * 17) % 96;
          rect(ctx, 457 + i % 4 * 14, yy, 2, 4, '#d9ddb4');
        }
      }

      this.nodes.forEach(node => this.label(ctx, node, node.id === nearestId, state));
      if (nearestId) {
        const node = this.nodes.find(n => n.id === nearestId);
        if (node) {
          const y = node.y - (node.kind === 'npc' ? 60 : 32);
          rect(ctx, node.x - 8, y, 16, 13, '#d9cfac'); rect(ctx, node.x - 2, y + 12, 4, 3, '#d9cfac');
          text(ctx, '···', node.x, y + 5, '#4c6262', 11);
        }
      }

      // Paper fragments and fireflies move sparingly; the important geometry stays clear.
      for (let i = 0; i < 16; i++) {
        const x = (i * 137 + time * (4 + i % 3)) % 1000 - 20;
        const y = 113 + i * 83 % 417 + Math.sin(time * .45 + i) * 9;
        if (i % 3) rect(ctx, x, y, 2, 2, '#b6c5a655');
        else { rect(ctx, x, y, 5, 3, '#d7c7a066'); rect(ctx, x + 2, y + 1, 1, 1, '#8e7f6a'); }
      }
      // Mild, stepped edge shading maintains the hand-pixelled look.
      rect(ctx, 0, 0, 960, 6, '#0b1726aa'); rect(ctx, 0, 0, 8, 600, '#0b172666');
      rect(ctx, 952, 0, 8, 600, '#0b172666'); rect(ctx, 0, 591, 960, 9, '#0b172688');
    }
  }

  global.OperaRenderer = OperaRenderer;
})(typeof window !== 'undefined' ? window : globalThis);
