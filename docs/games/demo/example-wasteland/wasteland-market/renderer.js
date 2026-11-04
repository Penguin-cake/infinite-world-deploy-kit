/* Original, dependency-free pixel artwork for the Rustwind Bazaar. */
(function (global) {
  'use strict';

  const C = {
    sand: '#c8b481', pale: '#d9c797', path: '#dccb9c', shadow: '#a18e5e',
    deep: '#5b6248', green: '#687651', moss: '#90936a', light: '#e8d8a9',
    rust: '#a56b48', orange: '#c58c57', darkRust: '#845c43', teal: '#6e9184',
    darkTeal: '#526d61', red: '#b57857', cream: '#e8d3a3', wood: '#8f7750',
    darkWood: '#6c6244', metal: '#85836a', darkMetal: '#626a55'
  };

  function rect(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }

  function poly(ctx, points, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    points.forEach((p, i) => i ? ctx.lineTo(Math.round(p[0]), Math.round(p[1])) : ctx.moveTo(Math.round(p[0]), Math.round(p[1])));
    ctx.closePath();
    ctx.fill();
  }

  function random(seed) {
    let x = seed >>> 0;
    return function () {
      x = (Math.imul(1664525, x) + 1013904223) >>> 0;
      return x / 4294967296;
    };
  }

  function shadow(ctx, x, y, w, h) {
    rect(ctx, x - w / 2, y - h / 2 + 2, w, h - 4, '#6c684329');
    rect(ctx, x - w / 2 + 4, y - h / 2, w - 8, h, '#6c684329');
  }

  function crate(ctx, x, y, size, shade) {
    const s = size || 24;
    shadow(ctx, x + s / 2 + 4, y + s + 3, s + 10, 9);
    rect(ctx, x, y, s, s, C.darkWood);
    rect(ctx, x + 2, y + 2, s - 4, s - 4, shade || '#a88d5a');
    rect(ctx, x + 4, y + 4, s - 8, s - 8, '#b39b68');
    rect(ctx, x + 2, y + s / 2 - 1, s - 4, 3, '#897446');
    rect(ctx, x + s / 2 - 1, y + 2, 3, s - 4, '#897446');
    rect(ctx, x + 2, y + 2, s - 4, 2, '#d1b77e');
    rect(ctx, x + 3, y + s - 4, s - 6, 2, '#8d784d');
    for (let i = 3; i < s - 3; i += 4) {
      rect(ctx, x + i, y + i, 3, 3, '#d0b078');
      rect(ctx, x + s - i - 3, y + i, 3, 3, '#d0b078');
    }
    rect(ctx, x + 3, y + 3, 2, 2, '#675e42');
    rect(ctx, x + s - 5, y + s - 5, 2, 2, '#675e42');
  }

  function barrel(ctx, x, y, color, scale) {
    const s = scale || 1;
    shadow(ctx, x + 11 * s, y + 27 * s, 30 * s, 10 * s);
    rect(ctx, x + 3 * s, y, 16 * s, 3 * s, '#5d644d');
    rect(ctx, x, y + 3 * s, 22 * s, 23 * s, color || '#8c9877');
    rect(ctx, x + 3 * s, y + 26 * s, 16 * s, 3 * s, '#626c52');
    rect(ctx, x + 3 * s, y + 4 * s, 5 * s, 21 * s, '#ffffff18');
    rect(ctx, x, y + 8 * s, 22 * s, 3 * s, '#59665099');
    rect(ctx, x, y + 20 * s, 22 * s, 3 * s, '#59665099');
    rect(ctx, x + 4 * s, y + 2 * s, 13 * s, 3 * s, '#c0b995');
    rect(ctx, x + 13 * s, y + 3 * s, 4 * s, 3 * s, '#626c52');
  }

  function cactus(ctx, x, y, s) {
    s = s || 1;
    shadow(ctx, x + 2 * s, y + 2 * s, 29 * s, 9 * s);
    rect(ctx, x - 5 * s, y - 28 * s, 10 * s, 29 * s, '#778657');
    rect(ctx, x - 2 * s, y - 31 * s, 5 * s, 4 * s, '#778657');
    rect(ctx, x - 14 * s, y - 20 * s, 6 * s, 15 * s, '#748052');
    rect(ctx, x - 11 * s, y - 9 * s, 8 * s, 5 * s, '#748052');
    rect(ctx, x + 4 * s, y - 14 * s, 8 * s, 5 * s, '#69794e');
    rect(ctx, x + 9 * s, y - 24 * s, 5 * s, 15 * s, '#69794e');
    rect(ctx, x - 2 * s, y - 26 * s, 2 * s, 26 * s, '#a4ab73');
    rect(ctx, x - 12 * s, y - 17 * s, 2 * s, 9 * s, '#a4ab73');
    rect(ctx, x + 10 * s, y - 22 * s, 2 * s, 8 * s, '#92a16a');
    rect(ctx, x + 2 * s, y - 18 * s, 2 * s, 2 * s, '#526346');
    rect(ctx, x - 4 * s, y - 7 * s, 2 * s, 2 * s, '#526346');
    rect(ctx, x - 1 * s, y - 33 * s, 4 * s, 3 * s, '#b88464');
  }

  function rock(ctx, x, y, s) {
    s = s || 1;
    poly(ctx, [[x, y], [x + 5 * s, y - 7 * s], [x + 15 * s, y - 8 * s], [x + 22 * s, y - 2 * s], [x + 23 * s, y + 5 * s], [x + 4 * s, y + 6 * s]], '#9b926c');
    rect(ctx, x + 5 * s, y - 6 * s, 9 * s, 3 * s, '#b4aa7e');
    rect(ctx, x + 6 * s, y + 4 * s, 16 * s, 2 * s, '#8e875f');
  }

  function grass(ctx, x, y, color) {
    const c = color || '#999d69';
    rect(ctx, x, y, 2, 8, c);
    rect(ctx, x - 3, y + 2, 2, 5, c);
    rect(ctx, x + 3, y - 2, 2, 9, c);
    rect(ctx, x + 6, y + 3, 2, 4, c);
  }

  function rug(ctx, x, y, w, h, color) {
    rect(ctx, x, y, w, h, '#796f4c36');
    rect(ctx, x + 3, y + 2, w - 6, h - 5, color || '#b29169');
    rect(ctx, x + 8, y + 7, w - 16, h - 15, '#cbb482');
    rect(ctx, x + 12, y + 11, w - 24, h - 23, color || '#b29169');
    for (let i = 8; i < w - 5; i += 8) {
      rect(ctx, x + i, y - 3, 2, 5, '#dbbd8e');
      rect(ctx, x + i, y + h - 3, 2, 5, '#dbbd8e');
    }
    for (let i = 21; i < w - 20; i += 17) {
      rect(ctx, x + i, y + h / 2 - 2, 4, 4, '#ded0a1');
      rect(ctx, x + i - 2, y + h / 2, 8, 2, '#ded0a1');
    }
  }

  function pixelText(ctx, text, x, y, color, size, align) {
    ctx.font = `${size || 11}px "Microsoft YaHei", "PingFang SC", sans-serif`;
    ctx.textAlign = align || 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color || C.deep;
    ctx.fillText(text, Math.round(x), Math.round(y));
  }

  function sign(ctx, text, x, y, w, color) {
    const width = w || text.length * 13 + 18;
    rect(ctx, x - width / 2 + 2, y - 8, width, 21, '#76674836');
    rect(ctx, x - width / 2, y - 11, width, 21, color || '#e9d6a6');
    rect(ctx, x - width / 2, y - 11, width, 2, '#f2e3b9');
    rect(ctx, x - width / 2, y + 8, width, 2, '#9b885f');
    rect(ctx, x - width / 2 + 4, y - 3, 2, 2, '#9a885f');
    rect(ctx, x + width / 2 - 6, y - 3, 2, 2, '#9a885f');
    pixelText(ctx, text, x, y, '#6b664a', 10);
  }

  function stall(ctx, x, y, w, color, stripe, merchandise) {
    const h = 61;
    shadow(ctx, x + w / 2 + 4, y + 58, w + 22, 27);
    rect(ctx, x + 6, y - 19, 5, h + 40, C.darkWood);
    rect(ctx, x + w - 11, y - 19, 5, h + 40, C.darkWood);
    rect(ctx, x + 7, y - 22, w - 14, 4, '#92805a');
    rect(ctx, x + 8, y + 24, w - 16, 30, '#7d7653');
    rect(ctx, x + 12, y + 27, w - 24, 24, '#9d8b5f');
    rect(ctx, x + 11, y + 31, w - 22, 2, '#b29c6b');
    rect(ctx, x + 11, y + 45, w - 22, 2, '#b29c6b');
    rect(ctx, x + 18, y + 31, 2, 20, '#786d4b');
    rect(ctx, x + w - 21, y + 31, 2, 20, '#786d4b');
    rect(ctx, x + 3, y + 50, w - 6, 10, '#6b6447');
    rect(ctx, x + 1, y + 47, w - 2, 7, '#b9a171');
    rect(ctx, x + 1, y + 47, w - 2, 2, '#d5bc87');
    // The roof is formed from hard, stepped pixels rather than smooth paths.
    rect(ctx, x + 10, y - 17, w - 20, 5, color);
    rect(ctx, x + 6, y - 12, w - 12, 9, color);
    rect(ctx, x + 2, y - 3, w - 4, 12, color);
    rect(ctx, x - 2, y + 9, w + 4, 14, color);
    for (let i = 0; i < w; i += 28) {
      const sw = Math.min(14, w - i);
      rect(ctx, x + i + 4, y - 12, sw - 3, 8, stripe);
      rect(ctx, x + i + 1, y - 4, sw + 1, 13, stripe);
      rect(ctx, x + i - 2, y + 9, sw + 5, 14, stripe);
    }
    rect(ctx, x - 2, y + 22, w + 4, 6, color);
    for (let i = 0; i < w + 2; i += 14) {
      rect(ctx, x + i - 2, y + 28, 12, 7, i % 28 ? stripe : color);
      rect(ctx, x + i, y + 35, 8, 3, i % 28 ? stripe : color);
    }
    rect(ctx, x + 13, y - 13, 19, 2, '#f2d9ac48');
    rect(ctx, x + w - 28, y + 4, 12, 7, '#c4b18c');
    rect(ctx, x + w - 28, y + 4, 12, 1, '#e3d2aa');
    rect(ctx, x + w - 23, y + 3, 1, 9, '#7e7757');
    if (merchandise === 'water') {
      for (let i = 0; i < 5; i++) {
        rect(ctx, x + 18 + i * 18, y + 39, 7, 8, '#759b91');
        rect(ctx, x + 20 + i * 18, y + 35, 3, 5, '#8fb0a0');
        rect(ctx, x + 20 + i * 18, y + 34, 3, 2, '#d2c49a');
        rect(ctx, x + 19 + i * 18, y + 39, 2, 5, '#bad0b0');
      }
    } else if (merchandise === 'mechanic') {
      rect(ctx, x + 21, y + 40, 19, 7, '#77836b');
      rect(ctx, x + 23, y + 38, 12, 2, '#afb18b');
      rect(ctx, x + 55, y + 39, 10, 8, '#5a6e5b');
      rect(ctx, x + 57, y + 41, 6, 3, '#abbd8a');
      rect(ctx, x + 83, y + 42, 23, 3, '#c5ac72');
      rect(ctx, x + 93, y + 38, 4, 9, '#72745c');
    } else {
      for (let i = 0; i < 5; i++) {
        rect(ctx, x + 19 + i * 21, y + 41, 13, 5, '#7e8264');
        rect(ctx, x + 22 + i * 21, y + 37, 7, 12, '#a8a884');
        rect(ctx, x + 24 + i * 21, y + 40, 3, 6, '#616e54');
      }
    }
  }

  function person(ctx, x, y, kind, dir, stride) {
    x = Math.round(x / 2) * 2;
    y = Math.round(y / 2) * 2;
    const styles = {
      player: { hat: '#536145', brim: '#6d7950', coat: '#6f8052', scarf: '#bb7c50', skin: '#d9b17b', pack: '#927d4e' },
      water: { hat: '#ac8d68', brim: '#c5ad7d', coat: '#819a87', scarf: '#c8b98b', skin: '#c49464', pack: '#a88b5f' },
      oscillator: { hat: '#8a8a67', brim: '#beb68d', coat: '#96885d', scarf: '#71836b', skin: '#c8a377', pack: '#616f57' },
      cable: { hat: '#b17651', brim: '#d69a68', coat: '#8a7656', scarf: '#e3bd80', skin: '#d2a36e', pack: '#777d5e' },
      battery: { hat: '#839071', brim: '#a3af86', coat: '#9d8b66', scarf: '#c58c65', skin: '#d9b17b', pack: '#7b7858' },
      visitor: { hat: '#8e8664', brim: '#aba078', coat: '#8a8c69', scarf: '#b69e6e', skin: '#c6a371', pack: '#777951' }
    };
    const s = styles[kind] || styles.visitor;
    const foot = stride || 0;
    shadow(ctx, x + 1, y + 1, 28, 10);
    if (kind === 'battery') { y += 4; }
    rect(ctx, x - 8, y - 13, 6, 12 + Math.max(0, foot), '#5f6249');
    rect(ctx, x + 3, y - 13, 6, 12 + Math.max(0, -foot), '#5f6249');
    rect(ctx, x - 9, y - 3 + Math.max(0, foot), 8, 4, '#535a43');
    rect(ctx, x + 3, y - 3 + Math.max(0, -foot), 8, 4, '#535a43');
    rect(ctx, x - 11, y - 27, 22, 19, s.coat);
    rect(ctx, x - 13, y - 25, 4, 15, s.coat);
    rect(ctx, x + 10, y - 25, 4, 15, s.coat);
    rect(ctx, x - 12, y - 12, 4, 5, s.skin);
    rect(ctx, x + 10, y - 12, 4, 5, s.skin);
    rect(ctx, x - 8, y - 10, 17, 3, '#5b684a');
    rect(ctx, x - 6, y - 26, 3, 15, '#a4ac79');
    rect(ctx, x - 5, y - 19, 4, 2, '#b5bb8a');
    if (dir === 'up') {
      rect(ctx, x - 8, y - 26, 16, 15, s.pack);
      rect(ctx, x - 6, y - 24, 12, 2, '#b9a476');
      rect(ctx, x - 5, y - 18, 10, 5, '#a58e5e');
      rect(ctx, x - 8, y - 19, 16, 2, '#776848');
    } else {
      rect(ctx, x + (dir === 'left' ? 8 : -13), y - 25, 6, 16, s.pack);
      rect(ctx, x + (dir === 'left' ? 9 : -12), y - 23, 3, 2, '#b5a071');
    }
    rect(ctx, x - 8, y - 40, 16, 15, s.skin);
    rect(ctx, x - 10, y - 38, 2, 8, '#b08c61');
    rect(ctx, x + 8, y - 38, 2, 8, '#b08c61');
    rect(ctx, x - 8, y - 28, 16, 5, s.scarf);
    rect(ctx, x + 5, y - 25, 5, 8, s.scarf);
    rect(ctx, x - 10, y - 44, 20, 9, s.hat);
    rect(ctx, x - 7, y - 47, 14, 4, s.hat);
    rect(ctx, x - 14, y - 37, 28, 4, s.brim);
    rect(ctx, x - 8, y - 44, 14, 2, '#d3c49a52');
    if (dir !== 'up') {
      if (dir !== 'right') rect(ctx, x - 5, y - 32, 2, 2, '#5b5c43');
      if (dir !== 'left') rect(ctx, x + 4, y - 32, 2, 2, '#5b5c43');
      rect(ctx, x - 2, y - 27, 5, 2, '#b18a61');
    }
    if (kind === 'oscillator') {
      rect(ctx, x - 8, y - 33, 7, 5, '#535f4c');
      rect(ctx, x + 2, y - 33, 7, 5, '#535f4c');
      rect(ctx, x - 6, y - 32, 3, 2, '#b7c8a1');
      rect(ctx, x + 4, y - 32, 3, 2, '#b7c8a1');
      rect(ctx, x - 1, y - 32, 3, 2, '#6d6e51');
    }
    if (kind === 'water') {
      rect(ctx, x - 8, y - 29, 3, 5, '#ddd0a5');
      rect(ctx, x + 5, y - 29, 3, 5, '#ddd0a5');
    }
  }

  function salvage(ctx, x, y, depleted) {
    shadow(ctx, x + 3, y + 3, 50, 15);
    const a = depleted ? '#a99b72' : '#85856a';
    const b = depleted ? '#b5a379' : '#a18c60';
    rect(ctx, x - 18, y - 8, 23, 11, a);
    rect(ctx, x - 16, y - 13, 17, 6, b);
    rect(ctx, x - 11, y - 15, 5, 3, '#c2b087');
    rect(ctx, x + 4, y - 6, 16, 10, b);
    rect(ctx, x + 8, y - 9, 10, 4, '#bba175');
    rect(ctx, x - 6, y - 7, 18, 5, '#7e7859');
    rect(ctx, x - 4, y - 4, 5, 12, a);
    rect(ctx, x - 21, y + 3, 12, 4, '#a18d62');
    rect(ctx, x + 9, y + 5, 14, 3, '#d0b57e');
    if (!depleted) {
      rect(ctx, x - 14, y - 7, 6, 2, '#c8c59a');
      rect(ctx, x + 6, y - 3, 4, 4, '#c1c6a0');
      rect(ctx, x + 10, y - 5, 4, 3, '#8a9e7f');
    }
  }

  class MarketRenderer {
    constructor(canvas, nodes, solids) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.ctx.imageSmoothingEnabled = false;
      this.nodes = Array.isArray(nodes) ? nodes : [];
      this.solids = solids || [];
      this.background = document.createElement('canvas');
      this.background.width = 960;
      this.background.height = 600;
      this.makeBackground(this.background.getContext('2d'));
    }

    makeBackground(ctx) {
      const rnd = random(42107);
      rect(ctx, 0, 0, 960, 600, C.sand);
      // A dust-softened skyline establishes the world beyond the bazaar.
      rect(ctx, 0, 0, 960, 86, '#d3c293');
      poly(ctx, [[0, 39], [44, 39], [44, 32], [100, 32], [100, 44], [159, 44], [159, 37], [216, 37], [216, 51], [301, 51], [301, 43], [382, 43], [382, 57], [478, 57], [478, 39], [589, 39], [589, 47], [670, 47], [670, 35], [733, 35], [733, 48], [815, 48], [815, 37], [887, 37], [887, 43], [960, 43], [960, 86], [0, 86]], '#c1b385');
      for (let i = 0; i < 12; i++) {
        const x = 22 + i * 88 + Math.floor(rnd() * 20);
        const h = 17 + Math.floor(rnd() * 29);
        rect(ctx, x, 52 - h, 27 + rnd() * 15, h + 17, '#aaa47b');
        rect(ctx, x + 3, 49 - h, 17, 3, '#b9ad82');
        if (i % 3 === 0) rect(ctx, x + 10, 37 - h, 3, 16, '#aaa47b');
        rect(ctx, x + 6, 58 - h, 5, 6, '#bfb288');
        rect(ctx, x + 18, 59 - h, 5, 6, '#bfb288');
      }
      rect(ctx, 0, 66, 960, 8, '#b7a77b');
      rect(ctx, 0, 74, 960, 8, '#c3af7f');
      // Old foundation stones and a deliberately open market street.
      rect(ctx, 25, 89, 910, 470, '#bfa976');
      rect(ctx, 31, 96, 898, 455, C.sand);
      rect(ctx, 438, 133, 90, 410, C.path);
      rect(ctx, 410, 318, 145, 157, C.path);
      rect(ctx, 121, 247, 704, 42, C.path);
      rect(ctx, 78, 276, 126, 64, '#cdb986');
      rect(ctx, 718, 280, 135, 170, '#cdb986');
      rect(ctx, 373, 279, 226, 80, C.path);
      rect(ctx, 359, 302, 255, 33, C.path);
      rect(ctx, 443, 533, 87, 56, '#cbb988');
      for (let i = 0; i < 2300; i++) {
        const x = Math.floor(rnd() * 960 / 3) * 3;
        const y = 82 + Math.floor(rnd() * 518 / 3) * 3;
        const shade = i % 5 === 0 ? '#e5d3a140' : i % 3 === 0 ? '#9a895e24' : '#ab98662a';
        rect(ctx, x, y, i % 7 ? 2 : 5, 2, shade);
      }
      for (let i = 0; i < 82; i++) {
        const y = 92 + i * 6;
        rect(ctx, 434 - Math.floor(rnd() * 8), y, 4 + rnd() * 9, 3, '#d6c28e');
        rect(ctx, 527 + Math.floor(rnd() * 8), y, 4 + rnd() * 9, 3, '#d6c28e');
      }
      // A broken wall and small fenced enclosures frame the playable area.
      for (let y = 99; y < 553; y += 22) {
        rect(ctx, 17, y, 16, 15, '#9c946b');
        rect(ctx, 19, y, 12, 3, '#b6ac7d');
        rect(ctx, 930, y + 6, 16, 15, '#a2986d');
        rect(ctx, 933, y + 6, 12, 3, '#b8ab79');
      }
      for (let x = 40; x < 430; x += 24) {
        rect(ctx, x, 550, 20, 14, '#a39569');
        rect(ctx, x + 2, 550, 17, 3, '#c0ad7b');
      }
      for (let x = 545; x < 936; x += 24) {
        rect(ctx, x, 550, 20, 14, '#a39569');
        rect(ctx, x + 2, 550, 17, 3, '#c0ad7b');
      }
      rect(ctx, 410, 533, 8, 40, '#766b48');
      rect(ctx, 543, 531, 8, 42, '#766b48');
      rect(ctx, 413, 534, 3, 36, '#a7925f');
      rect(ctx, 546, 533, 3, 37, '#a7925f');
      for (let x = 415; x < 548; x += 15) rect(ctx, x, 529 + ((x / 15 | 0) % 2) * 3, 13, 4, '#998454');
      sign(ctx, '锈 风 集 市', 482, 560, 112, '#ddc28e');

      // The water tank, complete with ladder, spigot, and patched pipes.
      shadow(ctx, 76, 171, 66, 16);
      rect(ctx, 49, 109, 43, 52, '#607e6f');
      rect(ctx, 53, 103, 35, 7, '#8b9c80');
      rect(ctx, 53, 159, 35, 5, '#4f6c5f');
      rect(ctx, 54, 111, 7, 44, '#8aa48a');
      rect(ctx, 49, 118, 43, 4, '#adb394');
      rect(ctx, 49, 146, 43, 4, '#a6af8c');
      rect(ctx, 59, 128, 15, 12, '#c0c2a0');
      rect(ctx, 64, 130, 5, 8, '#7e9a85');
      rect(ctx, 51, 164, 5, 12, '#716f4e');
      rect(ctx, 85, 163, 5, 13, '#716f4e');
      rect(ctx, 83, 107, 3, 51, '#c5b691');
      for (let y = 113; y < 156; y += 10) rect(ctx, 80, y, 11, 2, '#c5b691');
      rect(ctx, 91, 145, 9, 5, '#737a5e');
      rect(ctx, 96, 148, 4, 15, '#737a5e');
      rect(ctx, 93, 161, 10, 3, '#737a5e');
      rect(ctx, 98, 169, 12, 4, '#91a68a');
      rug(ctx, 97, 214, 137, 25, '#ac9270');
      stall(ctx, 100, 150, 135, '#708c79', '#c1c3a0', 'water');
      sign(ctx, '水 婆 · 净水', 167, 132, 94, '#e6d3a3');
      barrel(ctx, 102, 224, '#829980', .8);
      barrel(ctx, 214, 218, '#799182', .8);
      crate(ctx, 245, 185, 22);
      crate(ctx, 248, 209, 25);

      rug(ctx, 281, 214, 127, 23, '#b99b70');
      stall(ctx, 277, 150, 135, '#aa7753', '#d3b884', 'mechanic');
      sign(ctx, '老 莫 · 修理铺', 344, 132, 109, '#e3c999');
      crate(ctx, 286, 223, 20, '#8c8e6b');
      rect(ctx, 390, 217, 24, 4, '#79754e');
      rect(ctx, 392, 219, 4, 17, '#7b714d');
      rect(ctx, 410, 219, 4, 17, '#7b714d');
      rect(ctx, 394, 212, 16, 5, '#a7956a');
      barrel(ctx, 260, 138, '#989d77', .7);

      rug(ctx, 652, 214, 140, 23, '#a19d73');
      stall(ctx, 650, 150, 145, '#b88d4d', '#ddbf82', 'cable');
      sign(ctx, '阿 锈 · 旧物交换', 723, 132, 120, '#dfc89b');
      crate(ctx, 803, 181, 29);
      crate(ctx, 809, 158, 23, '#8c8c68');
      barrel(ctx, 626, 202, '#959b73', .85);
      // Tires and old machinery sit in the far east, away from the crossing.
      rect(ctx, 866, 179, 39, 14, '#7e7f63');
      rect(ctx, 860, 188, 48, 31, '#97906a');
      rect(ctx, 868, 192, 11, 14, '#b2a074');
      rect(ctx, 886, 190, 14, 18, '#666e55');
      rect(ctx, 865, 216, 13, 10, '#60684f');
      rect(ctx, 891, 216, 13, 10, '#60684f');
      rect(ctx, 867, 219, 8, 4, '#b6aa7d');
      rect(ctx, 894, 219, 7, 4, '#b6aa7d');

      // The child's home is a patched sailcloth tent rather than another stall.
      shadow(ctx, 748, 411, 158, 33);
      poly(ctx, [[677, 408], [691, 381], [705, 357], [726, 332], [747, 332], [772, 358], [800, 385], [818, 409]], '#9a916c');
      poly(ctx, [[682, 405], [702, 366], [726, 337], [741, 337], [760, 363], [787, 405]], '#d5bc84');
      poly(ctx, [[742, 338], [767, 357], [799, 388], [811, 405], [789, 405]], '#b29b70');
      rect(ctx, 704, 379, 6, 30, '#d9c18c');
      poly(ctx, [[711, 407], [722, 375], [731, 360], [744, 379], [752, 407]], '#6e7051');
      poly(ctx, [[716, 405], [727, 373], [731, 369], [737, 405]], '#848362');
      rect(ctx, 752, 359, 16, 12, '#9b9d75');
      rect(ctx, 757, 357, 2, 16, '#c9ba8a');
      rect(ctx, 750, 364, 20, 2, '#c9ba8a');
      rect(ctx, 675, 407, 146, 4, '#8a7b54');
      rect(ctx, 672, 405, 3, 12, '#84724c');
      rect(ctx, 824, 405, 3, 12, '#84724c');
      rug(ctx, 710, 416, 71, 24, '#b28e65');
      crate(ctx, 800, 420, 24);
      barrel(ctx, 670, 422, '#9a9a70', .7);
      rect(ctx, 783, 438, 12, 4, '#7f8161');
      rect(ctx, 785, 435, 8, 4, '#aba37d');

      // Satellite architecture, old cables, and the crossing's stone plinth.
      rect(ctx, 411, 120, 140, 14, '#b19b6e');
      rect(ctx, 418, 113, 126, 15, '#c7b381');
      rect(ctx, 426, 105, 109, 15, '#d3c18f');
      rect(ctx, 432, 74, 12, 43, '#6a7456');
      rect(ctx, 519, 74, 12, 43, '#6a7456');
      rect(ctx, 436, 78, 4, 35, '#a5ae7a');
      rect(ctx, 522, 77, 4, 34, '#a5ae7a');
      rect(ctx, 440, 66, 85, 10, '#6a7456');
      rect(ctx, 448, 59, 68, 10, '#87916a');
      rect(ctx, 455, 55, 54, 7, '#a2a67b');
      rect(ctx, 443, 74, 77, 31, '#87906c');
      rect(ctx, 449, 78, 64, 25, '#a6ac81');
      rect(ctx, 454, 83, 52, 16, '#657b5d');
      for (let i = 0; i < 6; i++) rect(ctx, 458 + i * 8, 91 - (i % 3) * 3, 4, 3 + (i % 3) * 3, '#a8bc86');
      rect(ctx, 471, 102, 20, 6, '#686d50');
      rect(ctx, 460, 110, 42, 8, '#8b8e67');
      rect(ctx, 467, 109, 5, 3, '#bdad79');
      rect(ctx, 482, 109, 5, 3, '#bf9867');
      rect(ctx, 496, 108, 3, 4, '#c4bd89');
      rect(ctx, 537, 66, 4, 52, '#8b8b62');
      rect(ctx, 535, 59, 8, 8, '#a4a97b');
      rect(ctx, 539, 31, 2, 30, '#727c5c');
      rect(ctx, 525, 39, 30, 2, '#76825e');
      rect(ctx, 530, 47, 20, 2, '#76825e');
      rect(ctx, 536, 28, 7, 4, '#a17f52');
      sign(ctx, '穿 界 电 台', 481, 40, 104, '#dcca9d');
      rect(ctx, 385, 87, 18, 26, '#747e5f');
      rect(ctx, 388, 90, 12, 17, '#99a080');
      rect(ctx, 390, 93, 8, 9, '#566d57');
      rect(ctx, 389, 108, 3, 2, '#c4b785');
      rect(ctx, 396, 108, 3, 2, '#c4b785');
      for (let x = 401; x < 431; x += 4) rect(ctx, x, 112 + (x % 3), 6, 2, '#7c7b53');
      barrel(ctx, 561, 100, '#839174', .8);

      // The bounty board is a landmark in the central market square.
      shadow(ctx, 483, 303, 66, 12);
      rect(ctx, 453, 250, 5, 56, '#766c48');
      rect(ctx, 509, 250, 5, 56, '#766c48');
      rect(ctx, 449, 247, 69, 40, '#766c48');
      rect(ctx, 452, 250, 63, 33, '#9c8d60');
      rect(ctx, 448, 245, 71, 5, '#b5a075');
      rect(ctx, 456, 255, 19, 20, '#e2cca1');
      rect(ctx, 479, 254, 14, 17, '#c8b48e');
      rect(ctx, 495, 257, 14, 21, '#ddd2aa');
      rect(ctx, 459, 259, 12, 2, '#a5906b');
      rect(ctx, 459, 264, 10, 2, '#a5906b');
      rect(ctx, 459, 269, 7, 2, '#a5906b');
      rect(ctx, 482, 258, 7, 2, '#94866b');
      rect(ctx, 498, 262, 8, 2, '#a5906b');
      rect(ctx, 499, 267, 5, 5, '#b58a61');
      rect(ctx, 461, 253, 2, 2, '#b17e55');
      rect(ctx, 500, 255, 2, 2, '#b17e55');

      // A fire ring, stools, cups, and a tarpaulin cart make the lower half lived-in.
      rug(ctx, 228, 434, 103, 48, '#a99168');
      const stones = [[-17, -4], [-8, -12], [5, -12], [16, -5], [17, 5], [6, 12], [-7, 12], [-18, 5]];
      stones.forEach(p => { rect(ctx, 278 + p[0], 430 + p[1], 9, 6, '#8e8d67'); rect(ctx, 279 + p[0], 430 + p[1], 6, 2, '#b3a67a'); });
      rect(ctx, 268, 430, 26, 5, '#6d6546');
      rect(ctx, 273, 424, 5, 17, '#8c714b');
      rect(ctx, 286, 425, 5, 15, '#886c48');
      rect(ctx, 237, 417, 14, 13, '#8a7c52');
      rect(ctx, 235, 415, 18, 6, '#b19a6c');
      rect(ctx, 309, 449, 15, 12, '#8a7c52');
      rect(ctx, 307, 447, 19, 5, '#b19a6c');
      rect(ctx, 241, 463, 12, 5, '#8d7b55');
      rect(ctx, 244, 459, 6, 4, '#c2af7f');
      rect(ctx, 312, 419, 8, 6, '#bba67a');
      rect(ctx, 314, 417, 4, 3, '#d3c393');
      shadow(ctx, 80, 466, 90, 23);
      rect(ctx, 47, 431, 74, 27, '#8d835c');
      rect(ctx, 51, 434, 65, 19, '#b29d6c');
      rect(ctx, 48, 432, 4, 25, '#d0b480');
      rect(ctx, 115, 432, 4, 25, '#c8b07a');
      rect(ctx, 55, 437, 55, 2, '#928456');
      rect(ctx, 55, 446, 55, 2, '#928456');
      rect(ctx, 59, 424, 49, 9, '#91a081');
      rect(ctx, 64, 420, 38, 6, '#9caa88');
      rect(ctx, 71, 420, 4, 14, '#d0c49b');
      rect(ctx, 96, 420, 4, 14, '#d0c49b');
      rect(ctx, 42, 454, 14, 18, '#656c51');
      rect(ctx, 45, 458, 8, 9, '#b9a77c');
      rect(ctx, 107, 454, 14, 18, '#656c51');
      rect(ctx, 110, 458, 8, 9, '#b9a77c');
      rect(ctx, 121, 444, 29, 4, '#8b7a51');
      rect(ctx, 145, 444, 4, 12, '#8b7a51');
      crate(ctx, 60, 491, 29);
      crate(ctx, 92, 501, 22, '#919674');
      crate(ctx, 58, 472, 20);

      // String lights across the crossing, in deliberately stepped runs.
      for (let i = 0; i < 88; i++) {
        const x = 198 + i * 6;
        const y = 107 + Math.round((1 - Math.pow((i - 44) / 44, 2)) * 18 / 2) * 2;
        rect(ctx, x, y, 7, 2, '#6b72514d');
        if (i % 8 === 0) {
          rect(ctx, x + 2, y + 2, 2, 7, '#797958');
          rect(ctx, x, y + 7, 6, 6, '#ddc58b');
          rect(ctx, x + 2, y + 8, 2, 4, '#f0dda5');
        }
      }
      // Scatter is kept to the margins, leaving every documented interaction reachable.
      [[55, 256, 1], [890, 291, 1.2], [600, 181, .75], [64, 348, .8], [893, 475, 1.15], [220, 518, .8], [601, 516, .65], [391, 488, .55]].forEach(a => cactus(ctx, ...a));
      [[57, 294, 1], [857, 336, .8], [389, 90, .7], [624, 331, .6], [40, 523, .6], [864, 525, 1], [205, 363, .7], [604, 480, .65], [205, 112, .6]].forEach(a => rock(ctx, ...a));
      [[82, 315], [210, 328], [56, 394], [228, 389], [618, 380], [887, 390], [900, 427], [327, 513], [641, 501], [380, 459], [843, 115], [592, 268], [122, 509], [36, 212], [607, 134], [615, 446], [839, 444]].forEach(a => grass(ctx, ...a));
      // Footprints add scale and subtle life to the bare sand.
      for (let i = 0; i < 13; i++) {
        const x = 463 + Math.sin(i * .7) * 7;
        const y = 364 + i * 9;
        rect(ctx, x, y, 3, 4, '#9c8d6030');
        rect(ctx, x + 9, y + 5, 3, 4, '#9c8d6030');
      }
      // A small pack animal waits beside the west wall.
      shadow(ctx, 83, 292, 38, 10);
      rect(ctx, 70, 271, 26, 16, '#b1996f');
      rect(ctx, 66, 267, 12, 14, '#b1996f');
      rect(ctx, 66, 261, 3, 8, '#ae926b');
      rect(ctx, 74, 260, 3, 9, '#ae926b');
      rect(ctx, 64, 273, 5, 5, '#d1bd8a');
      rect(ctx, 69, 270, 2, 2, '#63654a');
      rect(ctx, 73, 285, 4, 9, '#827756');
      rect(ctx, 90, 285, 4, 9, '#827756');
      rect(ctx, 79, 269, 13, 11, '#839070');
      rect(ctx, 83, 267, 3, 16, '#d1c091');
      rect(ctx, 96, 271, 4, 13, '#9b845e');
      // A reclaimed road sign on the right tells the oldest joke in the market.
      rect(ctx, 872, 92, 4, 39, '#8e8057');
      rect(ctx, 839, 96, 73, 19, '#bdb187');
      rect(ctx, 842, 98, 67, 15, '#d2c193');
      pixelText(ctx, '明天再来 →', 876, 106, '#8a805e', 10);
    }

    label(ctx, node, nearest, depleted) {
      const names = {
        water: '水婆 · 净水', oscillator: '老莫 · 振荡器', cable: '阿锈 · 电缆',
        battery: '小满 · 蓄电池', board: '悬赏榜', radio: '穿界电台', camp: '篝火'
      };
      let label = names[node.id] || node.name || '废料堆';
      if (node.id.indexOf('salvage') === 0) label = depleted ? '已拾取' : '拾荒';
      const small = node.id.indexOf('salvage') === 0 || node.id === 'camp';
      ctx.font = `${small ? 10 : 11}px "Microsoft YaHei", sans-serif`;
      const width = Math.ceil(ctx.measureText(label).width) + (small ? 12 : 18);
      const y = node.y + (node.id === 'camp' ? 21 : 24);
      const color = nearest ? '#f7efd5' : small ? '#e6d6adcf' : '#f1e3bfdf';
      if (depleted && !nearest) return;
      rect(ctx, node.x - width / 2 + 2, y - 7, width, small ? 17 : 20, '#7467471c');
      rect(ctx, node.x - width / 2, y - 9, width, small ? 17 : 20, color);
      if (nearest) {
        rect(ctx, node.x - width / 2, y - 9, width, 1, '#8e9c6d');
        rect(ctx, node.x - width / 2, y + (small ? 7 : 10), width, 1, '#8e9c6d');
      }
      pixelText(ctx, label, node.x, y + (small ? -1 : 1), nearest ? '#4e6541' : '#767654', small ? 10 : 11);
    }

    render(state, nowMs, target, nearestId) {
      const ctx = this.ctx;
      const now = Number.isFinite(nowMs) ? nowMs : 0;
      const player = state.player || { x: 480, y: 500, dir: 'down', moving: false };
      ctx.clearRect(0, 0, 960, 600);
      ctx.drawImage(this.background, 0, 0);
      const time = now / 1000;
      const salvaged = Array.isArray(state.salvaged) ? state.salvaged : [];
      // Interactive scrap has its own sprite so that depletion is immediately visible.
      this.nodes.filter(n => n.id.indexOf('salvage') === 0).forEach(n => {
        const depleted = salvaged.indexOf(n.id) !== -1;
        salvage(ctx, n.x, n.y, depleted);
        if (!depleted) {
          const d = Math.sin(time * 2.3 + n.x) > -.25;
          const sparkleY = n.y - 23 - Math.round(Math.sin(time * 2 + n.x) * 2);
          if (d) {
            rect(ctx, n.x + 17, sparkleY, 2, 8, '#f5e3af');
            rect(ctx, n.x + 14, sparkleY + 3, 8, 2, '#f5e3af');
            rect(ctx, n.x - 18, n.y - 17, 2, 2, '#e9dca8');
          }
        }
      });

      // Embers are tiny hard-edged clusters, keeping the canvas consistently pixel based.
      const fire = Math.floor(time * 6) % 3;
      rect(ctx, 274, 416 - fire * 2, 10, 18 + fire * 2, '#bb8050');
      rect(ctx, 282, 412 + fire * 2, 8, 20 - fire * 2, '#c58d50');
      rect(ctx, 277, 420 - fire * 2, 7, 13 + fire * 2, '#e5b76b');
      rect(ctx, 281, 424, 4, 9, '#f1d293');
      for (let i = 0; i < 4; i++) {
        const p = (time * 12 + i * 12) % 43;
        rect(ctx, 281 + Math.round(Math.sin(p / 7 + i) * 8 / 2) * 2, 414 - p, 2, 3, i % 2 ? '#c3bb9444' : '#bfaf8455');
      }

      const people = this.nodes.filter(n => ['water', 'oscillator', 'cable', 'battery'].indexOf(n.id) !== -1).map(n => ({ x: n.x, y: n.y, kind: n.id, dir: 'down', stride: 0 }));
      people.push({ x: player.x, y: player.y, kind: 'player', dir: player.dir, stride: player.moving ? Math.sin(time * 14) > 0 ? 3 : -3 : 0 });
      people.push({ x: 596 + Math.round(Math.sin(time * .22) * 8), y: 286, kind: 'visitor', dir: 'left', stride: 0 });
      people.push({ x: 207, y: 393, kind: 'visitor', dir: 'right', stride: 0 });
      people.sort((a, b) => a.y - b.y).forEach(p => person(ctx, p.x, p.y, p.kind, p.dir, p.stride));

      // A pale triangle makes the player's identity clear without a modern outline.
      const markerY = Math.round(player.y - 59 + Math.sin(time * 2) * 2);
      rect(ctx, player.x - 5, markerY, 10, 2, '#ede4b8');
      rect(ctx, player.x - 3, markerY + 2, 6, 2, '#ede4b8');
      rect(ctx, player.x - 1, markerY + 4, 2, 2, '#ede4b8');
      if (target && Number.isFinite(target.x) && Number.isFinite(target.y)) {
        const x = Math.round(target.x), y = Math.round(target.y);
        const s = 8 + (Math.sin(time * 5) > 0 ? 2 : 0);
        rect(ctx, x - s, y - s, 6, 2, '#f1e8c7');
        rect(ctx, x - s, y - s, 2, 6, '#f1e8c7');
        rect(ctx, x + s - 5, y - s, 6, 2, '#f1e8c7');
        rect(ctx, x + s, y - s, 2, 6, '#f1e8c7');
        rect(ctx, x - s, y + s, 6, 2, '#f1e8c7');
        rect(ctx, x - s, y + s - 4, 2, 6, '#f1e8c7');
        rect(ctx, x + s - 5, y + s, 7, 2, '#f1e8c7');
        rect(ctx, x + s, y + s - 4, 2, 6, '#f1e8c7');
      }

      if (state.repaired) {
        // The working radio is a visual payoff that remains readable behind the ending.
        rect(ctx, 454, 83, 52, 16, '#5d805f');
        const p = Math.floor(time * 6) % 6;
        for (let i = 0; i < 6; i++) rect(ctx, 458 + i * 8, 88 - (i + p) % 3, 4, 7 + (i + p) % 3, '#bacc8d');
        for (let i = 0; i < 3; i++) {
          const r = 12 + ((time * 14 + i * 13) % 38);
          const a = Math.max(0, .55 - (r - 12) / 85);
          ctx.strokeStyle = `rgba(223,231,166,${a})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(540, 34, r, -.7, .7);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(540, 34, r, Math.PI - .7, Math.PI + .7);
          ctx.stroke();
        }
      } else {
        rect(ctx, 496, 108, 3, 4, Math.sin(time * 2) > 0 ? '#d8aa6c' : '#a09262');
      }

      // Labels render after characters, preventing a merchant from hiding their own name.
      this.nodes.forEach(n => this.label(ctx, n, n.id === nearestId, salvaged.indexOf(n.id) !== -1));
      if (nearestId) {
        const node = this.nodes.find(n => n.id === nearestId);
        if (node) {
          const y = node.y - (['water', 'cable', 'oscillator', 'battery'].indexOf(node.id) !== -1 ? 58 : 39);
          rect(ctx, node.x - 7, y, 14, 12, '#f4e8c5');
          pixelText(ctx, '· · ·', node.x + 1, y + 4, '#8b9367', 10);
          rect(ctx, node.x - 2, y + 11, 4, 3, '#f4e8c5');
        }
      }

      // Sparse drifting sand and an occasional bird make the still world feel alive.
      for (let i = 0; i < 24; i++) {
        const x = (i * 173 + time * (9 + i % 3) + Math.sin(i) * 60) % 1000 - 20;
        const y = 90 + (i * 97 % 475) + Math.sin(time * .5 + i) * 2;
        rect(ctx, x, y, i % 3 === 0 ? 6 : 3, 1, '#f4e5b955');
      }
      const birdX = (time * 12 + 219) % 1100 - 60;
      if (birdX > 0 && birdX < 960) {
        const birdY = 15 + Math.sin(time * .3) * 5;
        rect(ctx, birdX, birdY, 3, 2, '#8e977039');
        rect(ctx, birdX - 4, birdY - (Math.sin(time * 4) > 0 ? 2 : 0), 4, 1, '#8e977039');
        rect(ctx, birdX + 3, birdY - (Math.sin(time * 4) > 0 ? 2 : 0), 4, 1, '#8e977039');
      }
      if ((state.elapsed || 0) > 300) {
        const intensity = Math.min(.14, ((state.elapsed || 0) - 300) / 1800);
        rect(ctx, 0, 0, 960, 600, `rgba(171,133,70,${intensity})`);
        for (let i = 0; i < 32; i++) {
          rect(ctx, (time * (42 + i % 4 * 11) + i * 119) % 1010 - 50, (i * 53 + time * 2) % 600, 14 + i % 7, 2, '#e3c28637');
        }
      }
    }
  }

  global.MarketRenderer = MarketRenderer;
})(typeof window !== 'undefined' ? window : globalThis);
