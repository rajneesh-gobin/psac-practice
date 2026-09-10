'use strict';
// grade1-health — visual bank: pictures, colours and diagrams.
// IDs: g1he-hyg-061…084, g1he-nut-061…084, g1he-saf-061…084
(function () {

const CH_HYG = 'g1he-hygiene';
const CH_NUT = 'g1he-nutrition';
const CH_SAF = 'g1he-safety';

// ── figure plumbing ──────────────────────────────────────────────────────────
// Every figure is inline SVG so read-aloud stays silent on it and it can never
// 404. No HTML tags may appear inside an <svg>.

const TXT = 'font-family="system-ui, sans-serif" fill="#1f2937" text-anchor="middle"';

function fig(label, w, h, maxw, body) {
  return '<div style="text-align:center;margin:.5em 0" aria-label="' + label + '">' +
    '<svg viewBox="0 0 ' + w + ' ' + h + '" style="width:100%;max-width:' + maxw +
    'px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
    '<rect x="0" y="0" width="' + w + '" height="' + h + '" rx="8" fill="#ffffff"/>' +
    body + '</svg></div>';
}

function lbl(x, y, s, size) {
  return '<text x="' + x + '" y="' + y + '" ' + TXT + ' font-size="' + (size || 15) + '">' + s + '</text>';
}

function cell(x, y, w, h) {
  return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h +
    '" rx="6" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="2"/>';
}

function at(px, py, s, body) {
  return '<g transform="translate(' + px + ',' + py + ') scale(' + s + ')">' + body + '</g>';
}

function row4(label, gs, ls) {
  const xs = [6, 92, 178, 264];
  let s = '';
  for (let i = 0; i < 4; i++) s += cell(xs[i], 4, 70, 86) + gs[i](xs[i], 8) + lbl(xs[i] + 35, 111, ls[i], 16);
  return fig(label, 340, 122, 340, s);
}

function row2(label, gs, ls) {
  const xs = [40, 130];
  let s = '';
  for (let i = 0; i < 2; i++) s += cell(xs[i], 4, 70, 86) + gs[i](xs[i], 8) + lbl(xs[i] + 35, 111, ls[i], 16);
  return fig(label, 240, 122, 250, s);
}

function one(label, g, maxw) {
  return fig(label, 100, 100, maxw || 150, g(15, 15));
}

function two(label, a, b, maxw) {
  return fig(label, 180, 90, maxw || 220, a(10, 10) + b(96, 10));
}

function gQ(x, y) { return lbl(x + 35, y + 48, '?', 34); }

// ── hygiene glyphs ───────────────────────────────────────────────────────────

function gSoap(x, y) {
  return '<rect x="' + (x + 8) + '" y="' + (y + 30) + '" width="54" height="30" rx="8" fill="#A855F7" stroke="#111827" stroke-width="2"/>' +
    '<circle cx="' + (x + 18) + '" cy="' + (y + 18) + '" r="7" fill="#FFFFFF" stroke="#111827" stroke-width="1.5"/>' +
    '<circle cx="' + (x + 34) + '" cy="' + (y + 11) + '" r="5" fill="#FFFFFF" stroke="#111827" stroke-width="1.5"/>' +
    '<circle cx="' + (x + 48) + '" cy="' + (y + 20) + '" r="6" fill="#FFFFFF" stroke="#111827" stroke-width="1.5"/>';
}

function gTap(x, y, rinse) {
  let d = '<path d="M' + (x + 41) + ' ' + (y + 46) + ' L' + (x + 47) + ' ' + (y + 57) +
    ' A6 6 0 1 1 ' + (x + 35) + ' ' + (y + 57) + ' Z" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>';
  if (rinse) {
    d += '<path d="M' + (x + 30) + ' ' + (y + 48) + ' L' + (x + 34) + ' ' + (y + 56) +
      ' A4 4 0 1 1 ' + (x + 26) + ' ' + (y + 56) + ' Z" fill="#3B82F6" stroke="#111827" stroke-width="1.2"/>' +
      '<path d="M' + (x + 52) + ' ' + (y + 50) + ' L' + (x + 56) + ' ' + (y + 58) +
      ' A4 4 0 1 1 ' + (x + 48) + ' ' + (y + 58) + ' Z" fill="#3B82F6" stroke="#111827" stroke-width="1.2"/>';
  }
  return '<rect x="' + (x + 12) + '" y="' + (y + 10) + '" width="11" height="24" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x + 12) + '" y="' + (y + 32) + '" width="34" height="10" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x + 6) + '" y="' + (y + 4) + '" width="23" height="7" rx="3" fill="#111827"/>' + d;
}

function gTowel(x, y) {
  return '<rect x="' + (x + 6) + '" y="' + (y + 10) + '" width="58" height="6" rx="3" fill="#92400E" stroke="#111827" stroke-width="1.5"/>' +
    '<rect x="' + (x + 14) + '" y="' + (y + 16) + '" width="42" height="46" rx="4" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x + 14) + '" y="' + (y + 30) + '" width="42" height="6" fill="#F97316"/>' +
    '<rect x="' + (x + 14) + '" y="' + (y + 44) + '" width="42" height="6" fill="#F97316"/>';
}

function gComb(x, y) {
  let t = '';
  for (let i = 0; i < 7; i++) {
    t += '<rect x="' + (x + 11 + i * 7) + '" y="' + (y + 34) + '" width="4" height="18" fill="#3B82F6" stroke="#111827" stroke-width="1.2"/>';
  }
  return '<rect x="' + (x + 8) + '" y="' + (y + 22) + '" width="54" height="12" rx="3" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' + t;
}

function gBrush(x, y, worn) {
  let b = '';
  for (let i = 0; i < 4; i++) {
    const bx = x + 46 + i * 5;
    b += worn
      ? '<path d="M' + bx + ' ' + (y + 32) + ' L' + (bx + 6) + ' ' + (y + 22) + '" stroke="#22C55E" stroke-width="3" fill="none"/>'
      : '<rect x="' + bx + '" y="' + (y + 20) + '" width="3.5" height="12" fill="#22C55E" stroke="#111827" stroke-width="0.8"/>';
  }
  return '<rect x="' + (x + 6) + '" y="' + (y + 34) + '" width="42" height="9" rx="4" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x + 44) + '" y="' + (y + 31) + '" width="20" height="14" rx="3" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' + b;
}

function gTooth(x, y, decay) {
  const d = 'M' + (x + 13) + ' ' + (y + 16) + ' q22 -12 44 0 q5 22 -2 42 q-5 8 -10 -2 l-10 -20 -10 20 q-5 8 -10 2 q-7 -22 -2 -42 z';
  return '<path d="' + d + '" fill="#FFFFFF" stroke="#111827" stroke-width="2.5"/>' +
    (decay ? '<circle cx="' + (x + 34) + '" cy="' + (y + 30) + '" r="6.5" fill="#111827"/>' : '');
}

function gArrowUpDown(x, y) {
  return '<path d="M' + (x + 62) + ' ' + (y + 16) + ' L' + (x + 62) + ' ' + (y + 54) + '" stroke="#EF4444" stroke-width="3.5" fill="none"/>' +
    '<polygon points="' + (x + 62) + ',' + (y + 8) + ' ' + (x + 68) + ',' + (y + 20) + ' ' + (x + 56) + ',' + (y + 20) + '" fill="#EF4444"/>' +
    '<polygon points="' + (x + 62) + ',' + (y + 62) + ' ' + (x + 68) + ',' + (y + 50) + ' ' + (x + 56) + ',' + (y + 50) + '" fill="#EF4444"/>';
}

function gArrowSide(x, y) {
  return '<path d="M' + (x + 14) + ' ' + (y + 62) + ' L' + (x + 56) + ' ' + (y + 62) + '" stroke="#EF4444" stroke-width="3.5" fill="none"/>' +
    '<polygon points="' + (x + 6) + ',' + (y + 62) + ' ' + (x + 18) + ',' + (y + 56) + ' ' + (x + 18) + ',' + (y + 68) + '" fill="#EF4444"/>' +
    '<polygon points="' + (x + 64) + ',' + (y + 62) + ' ' + (x + 52) + ',' + (y + 56) + ' ' + (x + 52) + ',' + (y + 68) + '" fill="#EF4444"/>';
}

function gClock(x, y) {
  return '<circle cx="' + (x + 35) + '" cy="' + (y + 35) + '" r="30" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
    '<circle cx="' + (x + 35) + '" cy="' + (y + 9) + '" r="2.5" fill="#111827"/>' +
    '<circle cx="' + (x + 61) + '" cy="' + (y + 35) + '" r="2.5" fill="#111827"/>' +
    '<circle cx="' + (x + 35) + '" cy="' + (y + 61) + '" r="2.5" fill="#111827"/>' +
    '<circle cx="' + (x + 9) + '" cy="' + (y + 35) + '" r="2.5" fill="#111827"/>' +
    '<path d="M' + (x + 35) + ' ' + (y + 35) + ' L' + (x + 35) + ' ' + (y + 18) + '" stroke="#111827" stroke-width="3" fill="none"/>' +
    '<path d="M' + (x + 35) + ' ' + (y + 35) + ' L' + (x + 51) + ' ' + (y + 41) + '" stroke="#EF4444" stroke-width="3" fill="none"/>' +
    '<circle cx="' + (x + 35) + '" cy="' + (y + 35) + '" r="3" fill="#111827"/>';
}

function gSun(x, y) {
  const pts = [[35, 4, 35, 14], [35, 56, 35, 66], [4, 35, 14, 35], [56, 35, 66, 35],
    [13, 13, 20, 20], [57, 13, 50, 20], [13, 57, 20, 50], [57, 57, 50, 50]];
  let r = '';
  for (let i = 0; i < pts.length; i++) {
    r += '<path d="M' + (x + pts[i][0]) + ' ' + (y + pts[i][1]) + ' L' + (x + pts[i][2]) + ' ' + (y + pts[i][3]) +
      '" stroke="#F97316" stroke-width="3.5" fill="none"/>';
  }
  return r + '<circle cx="' + (x + 35) + '" cy="' + (y + 35) + '" r="18" fill="#FACC15" stroke="#F97316" stroke-width="2.5"/>';
}

function gMoon(x, y) {
  return '<circle cx="' + (x + 34) + '" cy="' + (y + 35) + '" r="24" fill="#FACC15" stroke="#92400E" stroke-width="2"/>' +
    '<circle cx="' + (x + 48) + '" cy="' + (y + 30) + '" r="22" fill="#FFFFFF"/>';
}

function gShirt(x, y, dirty) {
  let s = '<path d="M' + (x + 12) + ' ' + (y + 22) + ' L' + (x + 24) + ' ' + (y + 13) +
    ' q11 9 22 0 L' + (x + 58) + ' ' + (y + 22) + ' L' + (x + 50) + ' ' + (y + 32) +
    ' L' + (x + 50) + ' ' + (y + 60) + ' L' + (x + 20) + ' ' + (y + 60) + ' L' + (x + 20) + ' ' + (y + 32) +
    ' Z" fill="#3B82F6" stroke="#111827" stroke-width="2"/>';
  if (dirty) {
    s += '<circle cx="' + (x + 30) + '" cy="' + (y + 42) + '" r="5" fill="#92400E"/>' +
      '<circle cx="' + (x + 42) + '" cy="' + (y + 52) + '" r="4" fill="#92400E"/>' +
      '<circle cx="' + (x + 38) + '" cy="' + (y + 34) + '" r="3" fill="#92400E"/>';
  }
  return s;
}

function gBook(x, y) {
  return '<rect x="' + (x + 10) + '" y="' + (y + 18) + '" width="50" height="36" rx="3" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x + 33) + '" y="' + (y + 18) + '" width="4" height="36" fill="#111827"/>' +
    '<path d="M' + (x + 14) + ' ' + (y + 27) + ' L' + (x + 29) + ' ' + (y + 27) + '" stroke="#FFFFFF" stroke-width="2" fill="none"/>' +
    '<path d="M' + (x + 41) + ' ' + (y + 27) + ' L' + (x + 56) + ' ' + (y + 27) + '" stroke="#FFFFFF" stroke-width="2" fill="none"/>' +
    '<path d="M' + (x + 14) + ' ' + (y + 36) + ' L' + (x + 29) + ' ' + (y + 36) + '" stroke="#FFFFFF" stroke-width="2" fill="none"/>' +
    '<path d="M' + (x + 41) + ' ' + (y + 36) + ' L' + (x + 56) + ' ' + (y + 36) + '" stroke="#FFFFFF" stroke-width="2" fill="none"/>';
}

function gPencil(x, y) {
  return '<rect x="' + (x + 10) + '" y="' + (y + 30) + '" width="36" height="12" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
    '<polygon points="' + (x + 46) + ',' + (y + 30) + ' ' + (x + 62) + ',' + (y + 36) + ' ' + (x + 46) + ',' + (y + 42) + '" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x + 5) + '" y="' + (y + 30) + '" width="6" height="12" fill="#EC4899" stroke="#111827" stroke-width="2"/>';
}

function gBall(x, y) {
  return '<circle cx="' + (x + 35) + '" cy="' + (y + 36) + '" r="24" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
    '<path d="M' + (x + 11) + ' ' + (y + 36) + ' L' + (x + 59) + ' ' + (y + 36) + '" stroke="#111827" stroke-width="2" fill="none"/>' +
    '<path d="M' + (x + 35) + ' ' + (y + 12) + ' q10 24 0 48" stroke="#111827" stroke-width="2" fill="none"/>' +
    '<path d="M' + (x + 35) + ' ' + (y + 12) + ' q-10 24 0 48" stroke="#111827" stroke-width="2" fill="none"/>';
}

function gTissue(x, y) {
  return '<rect x="' + (x + 12) + '" y="' + (y + 32) + '" width="46" height="26" rx="3" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
    '<polygon points="' + (x + 28) + ',' + (y + 32) + ' ' + (x + 38) + ',' + (y + 12) + ' ' + (x + 46) + ',' + (y + 32) + '" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>';
}

function gCloth(x, y) {
  return '<path d="M' + (x + 10) + ' ' + (y + 20) + ' L' + (x + 60) + ' ' + (y + 20) +
    ' L' + (x + 56) + ' ' + (y + 58) + ' L' + (x + 14) + ' ' + (y + 58) + ' Z" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
    '<circle cx="' + (x + 26) + '" cy="' + (y + 34) + '" r="5" fill="#92400E"/>' +
    '<circle cx="' + (x + 44) + '" cy="' + (y + 44) + '" r="6" fill="#92400E"/>' +
    '<circle cx="' + (x + 34) + '" cy="' + (y + 50) + '" r="3.5" fill="#92400E"/>';
}

// ── food glyphs ──────────────────────────────────────────────────────────────

function gBanana(x, y) {
  return '<path d="M' + (x + 12) + ' ' + (y + 52) + ' q4 -28 36 -36 q-2 32 -36 36 z" fill="#FACC15" stroke="#92400E" stroke-width="2"/>' +
    '<rect x="' + (x + 46) + '" y="' + (y + 10) + '" width="6" height="9" rx="2" fill="#92400E"/>';
}

function gCarrot(x, y) {
  return '<polygon points="' + (x + 35) + ',' + (y + 62) + ' ' + (x + 22) + ',' + (y + 26) + ' ' + (x + 48) + ',' + (y + 26) + '" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
    '<path d="M' + (x + 35) + ' ' + (y + 26) + ' L' + (x + 24) + ' ' + (y + 8) + '" stroke="#22C55E" stroke-width="4" fill="none"/>' +
    '<path d="M' + (x + 35) + ' ' + (y + 26) + ' L' + (x + 36) + ' ' + (y + 6) + '" stroke="#22C55E" stroke-width="4" fill="none"/>' +
    '<path d="M' + (x + 35) + ' ' + (y + 26) + ' L' + (x + 47) + ' ' + (y + 10) + '" stroke="#22C55E" stroke-width="4" fill="none"/>';
}

function gApple(x, y) {
  return '<circle cx="' + (x + 35) + '" cy="' + (y + 40) + '" r="22" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x + 33) + '" y="' + (y + 12) + '" width="4" height="10" fill="#92400E"/>' +
    '<ellipse cx="' + (x + 45) + '" cy="' + (y + 15) + '" rx="8" ry="4" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>';
}

function gMango(x, y) {
  return '<ellipse cx="' + (x + 34) + '" cy="' + (y + 42) + '" rx="26" ry="20" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x + 32) + '" y="' + (y + 14) + '" width="4" height="9" fill="#92400E"/>' +
    '<ellipse cx="' + (x + 45) + '" cy="' + (y + 16) + '" rx="9" ry="4" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>';
}

function gBread(x, y) {
  return '<path d="M' + (x + 8) + ' ' + (y + 54) + ' q0 -30 27 -30 q27 0 27 30 z" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
    '<path d="M' + (x + 22) + ' ' + (y + 38) + ' L' + (x + 28) + ' ' + (y + 32) + '" stroke="#FACC15" stroke-width="3" fill="none"/>' +
    '<path d="M' + (x + 34) + ' ' + (y + 34) + ' L' + (x + 40) + ' ' + (y + 29) + '" stroke="#FACC15" stroke-width="3" fill="none"/>';
}

function gGlass(x, y, liquid) {
  return '<polygon points="' + (x + 20) + ',' + (y + 14) + ' ' + (x + 50) + ',' + (y + 14) + ' ' + (x + 45) + ',' + (y + 60) + ' ' + (x + 25) + ',' + (y + 60) + '" fill="' + liquid + '" stroke="#111827" stroke-width="2.5"/>' +
    '<path d="M' + (x + 21) + ' ' + (y + 24) + ' L' + (x + 49) + ' ' + (y + 24) + '" stroke="#111827" stroke-width="1.5" fill="none"/>';
}

function gMilk(x, y) { return gGlass(x, y, '#FFFFFF'); }
function gWater(x, y) { return gGlass(x, y, '#3B82F6'); }

function gFizzy(x, y) {
  return '<rect x="' + (x + 22) + '" y="' + (y + 26) + '" width="26" height="34" rx="5" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x + 30) + '" y="' + (y + 16) + '" width="10" height="10" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x + 28) + '" y="' + (y + 9) + '" width="14" height="8" rx="2" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
    '<circle cx="' + (x + 30) + '" cy="' + (y + 38) + '" r="3" fill="#FFFFFF"/>' +
    '<circle cx="' + (x + 40) + '" cy="' + (y + 46) + '" r="2.5" fill="#FFFFFF"/>' +
    '<circle cx="' + (x + 34) + '" cy="' + (y + 52) + '" r="2" fill="#FFFFFF"/>';
}

function gSweet(x, y) {
  return '<rect x="' + (x + 24) + '" y="' + (y + 28) + '" width="24" height="18" rx="4" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
    '<polygon points="' + (x + 24) + ',' + (y + 28) + ' ' + (x + 10) + ',' + (y + 21) + ' ' + (x + 10) + ',' + (y + 53) + ' ' + (x + 24) + ',' + (y + 46) + '" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
    '<polygon points="' + (x + 48) + ',' + (y + 28) + ' ' + (x + 62) + ',' + (y + 21) + ' ' + (x + 62) + ',' + (y + 53) + ' ' + (x + 48) + ',' + (y + 46) + '" fill="#EC4899" stroke="#111827" stroke-width="2"/>';
}

function gLeafVeg(x, y) {
  return '<path d="M' + (x + 35) + ' ' + (y + 12) + ' q26 16 0 48 q-26 -32 0 -48 z" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
    '<path d="M' + (x + 35) + ' ' + (y + 14) + ' L' + (x + 35) + ' ' + (y + 58) + '" stroke="#111827" stroke-width="1.5" fill="none"/>';
}

function gFish(x, y) {
  return '<ellipse cx="' + (x + 30) + '" cy="' + (y + 38) + '" rx="22" ry="13" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
    '<polygon points="' + (x + 50) + ',' + (y + 38) + ' ' + (x + 64) + ',' + (y + 26) + ' ' + (x + 64) + ',' + (y + 50) + '" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
    '<circle cx="' + (x + 18) + '" cy="' + (y + 34) + '" r="2.5" fill="#111827"/>';
}

function gRice(x, y) {
  return '<path d="M' + (x + 10) + ' ' + (y + 52) + ' q25 -34 50 0 z" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
    '<path d="M' + (x + 24) + ' ' + (y + 44) + ' L' + (x + 30) + ' ' + (y + 44) + '" stroke="#9CA3AF" stroke-width="2" fill="none"/>' +
    '<path d="M' + (x + 38) + ' ' + (y + 40) + ' L' + (x + 44) + ' ' + (y + 40) + '" stroke="#9CA3AF" stroke-width="2" fill="none"/>' +
    '<path d="M' + (x + 32) + ' ' + (y + 49) + ' L' + (x + 38) + ' ' + (y + 49) + '" stroke="#9CA3AF" stroke-width="2" fill="none"/>';
}

function gChips(x, y) {
  return '<polygon points="' + (x + 16) + ',' + (y + 20) + ' ' + (x + 22) + ',' + (y + 14) + ' ' + (x + 28) + ',' + (y + 20) + ' ' +
    (x + 34) + ',' + (y + 14) + ' ' + (x + 40) + ',' + (y + 20) + ' ' + (x + 46) + ',' + (y + 14) + ' ' + (x + 52) + ',' + (y + 20) + ' ' +
    (x + 52) + ',' + (y + 60) + ' ' + (x + 16) + ',' + (y + 60) + '" fill="#F97316" stroke="#111827" stroke-width="2"/>';
}

function gShaker(x, y) {
  return '<rect x="' + (x + 24) + '" y="' + (y + 26) + '" width="22" height="34" rx="3" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x + 24) + '" y="' + (y + 17) + '" width="22" height="10" rx="3" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
    '<circle cx="' + (x + 30) + '" cy="' + (y + 22) + '" r="1.8" fill="#111827"/>' +
    '<circle cx="' + (x + 35) + '" cy="' + (y + 22) + '" r="1.8" fill="#111827"/>' +
    '<circle cx="' + (x + 40) + '" cy="' + (y + 22) + '" r="1.8" fill="#111827"/>';
}

function plate(cx, cy, r) {
  return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r - 9) + '" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="2"/>';
}

// ── safety glyphs ────────────────────────────────────────────────────────────

function gBin(x, y) {
  return '<polygon points="' + (x + 16) + ',' + (y + 26) + ' ' + (x + 54) + ',' + (y + 26) + ' ' + (x + 49) + ',' + (y + 62) + ' ' + (x + 21) + ',' + (y + 62) + '" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x + 12) + '" y="' + (y + 18) + '" width="46" height="8" rx="3" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x + 30) + '" y="' + (y + 11) + '" width="10" height="7" rx="2" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
    '<path d="M' + (x + 28) + ' ' + (y + 34) + ' L' + (x + 26) + ' ' + (y + 54) + '" stroke="#111827" stroke-width="1.5" fill="none"/>' +
    '<path d="M' + (x + 42) + ' ' + (y + 34) + ' L' + (x + 44) + ' ' + (y + 54) + '" stroke="#111827" stroke-width="1.5" fill="none"/>';
}

function gLitter(x, y) {
  return '<path d="M' + (x + 4) + ' ' + (y + 58) + ' L' + (x + 66) + ' ' + (y + 58) + '" stroke="#92400E" stroke-width="3" fill="none"/>' +
    '<polygon points="' + (x + 12) + ',' + (y + 56) + ' ' + (x + 20) + ',' + (y + 44) + ' ' + (x + 28) + ',' + (y + 56) + '" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
    '<polygon points="' + (x + 30) + ',' + (y + 56) + ' ' + (x + 36) + ',' + (y + 48) + ' ' + (x + 43) + ',' + (y + 56) + '" fill="#FACC15" stroke="#111827" stroke-width="1.5"/>' +
    '<rect x="' + (x + 46) + '" y="' + (y + 48) + '" width="18" height="8" rx="4" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>';
}

function gTyre(x, y) {
  return '<circle cx="' + (x + 35) + '" cy="' + (y + 38) + '" r="26" fill="#9CA3AF" stroke="#111827" stroke-width="3"/>' +
    '<circle cx="' + (x + 35) + '" cy="' + (y + 38) + '" r="13" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
    '<path d="M' + (x + 22) + ' ' + (y + 38) + ' a13 13 0 0 0 26 0 z" fill="#3B82F6"/>';
}

function gBucket(x, y) {
  return '<path d="M' + (x + 16) + ' ' + (y + 22) + ' q19 -16 38 0" stroke="#111827" stroke-width="2.5" fill="none"/>' +
    '<polygon points="' + (x + 16) + ',' + (y + 22) + ' ' + (x + 54) + ',' + (y + 22) + ' ' + (x + 48) + ',' + (y + 60) + ' ' + (x + 22) + ',' + (y + 60) + '" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
    '<polygon points="' + (x + 19) + ',' + (y + 36) + ' ' + (x + 51) + ',' + (y + 36) + ' ' + (x + 48) + ',' + (y + 60) + ' ' + (x + 22) + ',' + (y + 60) + '" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>';
}

function gHat(x, y) {
  return '<ellipse cx="' + (x + 35) + '" cy="' + (y + 48) + '" rx="30" ry="8" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
    '<path d="M' + (x + 18) + ' ' + (y + 48) + ' q0 -28 17 -28 q17 0 17 28 z" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
    '<path d="M' + (x + 18) + ' ' + (y + 42) + ' L' + (x + 52) + ' ' + (y + 42) + '" stroke="#92400E" stroke-width="4" fill="none"/>';
}

function gFlag(x, y) {
  return '<rect x="' + (x + 16) + '" y="' + (y + 8) + '" width="5" height="54" fill="#92400E" stroke="#111827" stroke-width="1.5"/>' +
    '<polygon points="' + (x + 21) + ',' + (y + 10) + ' ' + (x + 58) + ',' + (y + 20) + ' ' + (x + 21) + ',' + (y + 30) + '" fill="#EF4444" stroke="#111827" stroke-width="2"/>';
}

function gWaves(x, y) {
  return '<path d="M' + (x + 4) + ' ' + (y + 48) + ' q9 -8 18 0 q9 8 18 0 q9 -8 18 0" stroke="#3B82F6" stroke-width="3" fill="none"/>' +
    '<path d="M' + (x + 4) + ' ' + (y + 60) + ' q9 -8 18 0 q9 8 18 0 q9 -8 18 0" stroke="#3B82F6" stroke-width="3" fill="none"/>';
}

function gKettle(x, y) {
  return '<path d="M' + (x + 24) + ' ' + (y + 26) + ' q8 -6 0 -12 q-8 -6 0 -10" stroke="#9CA3AF" stroke-width="2.5" fill="none"/>' +
    '<path d="M' + (x + 40) + ' ' + (y + 26) + ' q8 -6 0 -12 q-8 -6 0 -10" stroke="#9CA3AF" stroke-width="2.5" fill="none"/>' +
    '<rect x="' + (x + 14) + '" y="' + (y + 32) + '" width="38" height="28" rx="6" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
    '<polygon points="' + (x + 52) + ',' + (y + 38) + ' ' + (x + 66) + ',' + (y + 30) + ' ' + (x + 66) + ',' + (y + 36) + ' ' + (x + 54) + ',' + (y + 46) + '" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
    '<path d="M' + (x + 20) + ' ' + (y + 32) + ' q13 -14 26 0" stroke="#111827" stroke-width="3" fill="none"/>';
}

function gPotEdge(x, y) {
  return '<rect x="' + (x + 2) + '" y="' + (y + 52) + '" width="60" height="10" rx="3" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
    '<path d="M' + (x + 62) + ' ' + (y + 52) + ' L' + (x + 62) + ' ' + (y + 68) + '" stroke="#111827" stroke-width="2.5" fill="none"/>' +
    '<rect x="' + (x + 20) + '" y="' + (y + 28) + '" width="28" height="24" rx="3" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x + 18) + '" y="' + (y + 23) + '" width="32" height="6" rx="2" fill="#111827"/>' +
    '<rect x="' + (x + 48) + '" y="' + (y + 34) + '" width="21" height="6" rx="3" fill="#111827"/>';
}

function gSocket(x, y) {
  return '<rect x="' + (x + 16) + '" y="' + (y + 14) + '" width="40" height="44" rx="6" fill="#FFFFFF" stroke="#111827" stroke-width="2.5"/>' +
    '<rect x="' + (x + 26) + '" y="' + (y + 26) + '" width="6" height="13" rx="1" fill="#111827"/>' +
    '<rect x="' + (x + 40) + '" y="' + (y + 26) + '" width="6" height="13" rx="1" fill="#111827"/>' +
    '<rect x="' + (x + 33) + '" y="' + (y + 44) + '" width="6" height="10" rx="1" fill="#111827"/>';
}

function gHazardBottle(x, y) {
  return '<rect x="' + (x + 20) + '" y="' + (y + 24) + '" width="30" height="38" rx="5" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x + 30) + '" y="' + (y + 14) + '" width="10" height="10" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x + 28) + '" y="' + (y + 8) + '" width="14" height="7" rx="2" fill="#111827"/>' +
    '<polygon points="' + (x + 35) + ',' + (y + 32) + ' ' + (x + 47) + ',' + (y + 52) + ' ' + (x + 23) + ',' + (y + 52) + '" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x + 33) + '" y="' + (y + 39) + '" width="4" height="7" fill="#111827"/>' +
    '<circle cx="' + (x + 35) + '" cy="' + (y + 49) + '" r="2" fill="#111827"/>';
}

function gKnifeEdge(x, y) {
  return '<rect x="' + (x + 2) + '" y="' + (y + 42) + '" width="46" height="8" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
    '<path d="M' + (x + 6) + ' ' + (y + 50) + ' L' + (x + 6) + ' ' + (y + 66) + '" stroke="#92400E" stroke-width="4" fill="none"/>' +
    '<rect x="' + (x + 8) + '" y="' + (y + 30) + '" width="16" height="9" rx="3" fill="#111827"/>' +
    '<polygon points="' + (x + 24) + ',' + (y + 30) + ' ' + (x + 64) + ',' + (y + 36) + ' ' + (x + 24) + ',' + (y + 39) + '" fill="#9CA3AF" stroke="#111827" stroke-width="1.5"/>';
}

function gMatches(x, y) {
  return '<rect x="' + (x + 12) + '" y="' + (y + 38) + '" width="46" height="20" rx="3" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x + 12) + '" y="' + (y + 45) + '" width="46" height="6" fill="#111827"/>' +
    '<rect x="' + (x + 26) + '" y="' + (y + 18) + '" width="5" height="20" fill="#FACC15" stroke="#111827" stroke-width="1.2"/>' +
    '<circle cx="' + (x + 28) + '" cy="' + (y + 15) + '" r="5" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>';
}

function gCandle(x, y) {
  return '<rect x="' + (x + 26) + '" y="' + (y + 26) + '" width="18" height="34" rx="2" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
    '<path d="M' + (x + 35) + ' ' + (y + 22) + ' L' + (x + 35) + ' ' + (y + 26) + '" stroke="#111827" stroke-width="2" fill="none"/>' +
    '<path d="M' + (x + 35) + ' ' + (y + 6) + ' q9 10 0 16 q-9 -6 0 -16 z" fill="#F97316" stroke="#EF4444" stroke-width="1.5"/>';
}

function gScissors(x, y) {
  return '<path d="M' + (x + 16) + ' ' + (y + 10) + ' L' + (x + 44) + ' ' + (y + 42) + '" stroke="#9CA3AF" stroke-width="6" fill="none"/>' +
    '<path d="M' + (x + 52) + ' ' + (y + 10) + ' L' + (x + 24) + ' ' + (y + 42) + '" stroke="#9CA3AF" stroke-width="6" fill="none"/>' +
    '<circle cx="' + (x + 22) + '" cy="' + (y + 52) + '" r="8" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
    '<circle cx="' + (x + 46) + '" cy="' + (y + 52) + '" r="8" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>';
}

function gStairs(x, y) {
  return '<polygon points="' + (x + 8) + ',' + (y + 62) + ' ' + (x + 8) + ',' + (y + 48) + ' ' + (x + 24) + ',' + (y + 48) + ' ' +
    (x + 24) + ',' + (y + 36) + ' ' + (x + 40) + ',' + (y + 36) + ' ' + (x + 40) + ',' + (y + 24) + ' ' + (x + 58) + ',' + (y + 24) + ' ' +
    (x + 58) + ',' + (y + 62) + '" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
    '<path d="M' + (x + 10) + ' ' + (y + 38) + ' L' + (x + 56) + ' ' + (y + 12) + '" stroke="#92400E" stroke-width="4" fill="none"/>' +
    '<path d="M' + (x + 14) + ' ' + (y + 46) + ' L' + (x + 14) + ' ' + (y + 36) + '" stroke="#92400E" stroke-width="3" fill="none"/>' +
    '<path d="M' + (x + 46) + ' ' + (y + 28) + ' L' + (x + 46) + ' ' + (y + 18) + '" stroke="#92400E" stroke-width="3" fill="none"/>';
}

function gWetSign(x, y) {
  return '<ellipse cx="' + (x + 35) + '" cy="' + (y + 62) + '" rx="26" ry="5" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
    '<polygon points="' + (x + 35) + ',' + (y + 12) + ' ' + (x + 62) + ',' + (y + 56) + ' ' + (x + 8) + ',' + (y + 56) + '" fill="#FACC15" stroke="#111827" stroke-width="2.5"/>' +
    '<rect x="' + (x + 32) + '" y="' + (y + 28) + '" width="6" height="14" rx="2" fill="#111827"/>' +
    '<circle cx="' + (x + 35) + '" cy="' + (y + 48) + '" r="3.5" fill="#111827"/>';
}

function gSlide(x, y) {
  return '<polygon points="' + (x + 10) + ',' + (y + 60) + ' ' + (x + 44) + ',' + (y + 20) + ' ' + (x + 52) + ',' + (y + 26) + ' ' + (x + 20) + ',' + (y + 60) + '" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x + 48) + '" y="' + (y + 18) + '" width="5" height="42" fill="#92400E" stroke="#111827" stroke-width="1.5"/>' +
    '<rect x="' + (x + 58) + '" y="' + (y + 18) + '" width="5" height="42" fill="#92400E" stroke="#111827" stroke-width="1.5"/>' +
    '<path d="M' + (x + 50) + ' ' + (y + 32) + ' L' + (x + 61) + ' ' + (y + 32) + '" stroke="#92400E" stroke-width="3" fill="none"/>' +
    '<path d="M' + (x + 50) + ' ' + (y + 44) + ' L' + (x + 61) + ' ' + (y + 44) + '" stroke="#92400E" stroke-width="3" fill="none"/>' +
    '<path d="M' + (x + 6) + ' ' + (y + 62) + ' L' + (x + 66) + ' ' + (y + 62) + '" stroke="#92400E" stroke-width="2.5" fill="none"/>';
}

function gHouse(x, y) {
  return '<polygon points="' + (x + 35) + ',' + (y + 14) + ' ' + (x + 62) + ',' + (y + 34) + ' ' + (x + 8) + ',' + (y + 34) + '" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x + 14) + '" y="' + (y + 34) + '" width="42" height="26" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x + 30) + '" y="' + (y + 44) + '" width="12" height="16" fill="#92400E" stroke="#111827" stroke-width="1.5"/>' +
    '<rect x="' + (x + 18) + '" y="' + (y + 40) + '" width="9" height="9" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>';
}

function gRain(x, y) {
  let s = '';
  for (let i = 0; i < 5; i++) {
    s += '<path d="M' + (x + 12 + i * 12) + ' ' + (y + 4) + ' L' + (x + 8 + i * 12) + ' ' + (y + 18) + '" stroke="#3B82F6" stroke-width="3" fill="none"/>';
  }
  return s;
}

function gTraffic(x, y, lit) {
  const on = ['#EF4444', '#FACC15', '#22C55E'];
  const c = ['#9CA3AF', '#9CA3AF', '#9CA3AF'];
  c[lit] = on[lit];
  return '<rect x="' + (x + 22) + '" y="' + (y + 6) + '" width="26" height="50" rx="6" fill="#111827"/>' +
    '<rect x="' + (x + 32) + '" y="' + (y + 56) + '" width="6" height="12" fill="#111827"/>' +
    '<circle cx="' + (x + 35) + '" cy="' + (y + 17) + '" r="7" fill="' + c[0] + '"/>' +
    '<circle cx="' + (x + 35) + '" cy="' + (y + 31) + '" r="7" fill="' + c[1] + '"/>' +
    '<circle cx="' + (x + 35) + '" cy="' + (y + 45) + '" r="7" fill="' + c[2] + '"/>';
}

function gZebra(x, y) {
  let s = '<rect x="' + (x + 4) + '" y="' + (y + 20) + '" width="62" height="34" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>';
  for (let i = 0; i < 4; i++) {
    s += '<rect x="' + (x + 10 + i * 15) + '" y="' + (y + 20) + '" width="8" height="34" fill="#FFFFFF"/>';
  }
  return s;
}

function gBrokenGlass(x, y) {
  return '<path d="M' + (x + 6) + ' ' + (y + 58) + ' L' + (x + 66) + ' ' + (y + 58) + '" stroke="#92400E" stroke-width="3" fill="none"/>' +
    '<polygon points="' + (x + 14) + ',' + (y + 56) + ' ' + (x + 22) + ',' + (y + 34) + ' ' + (x + 28) + ',' + (y + 56) + '" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
    '<polygon points="' + (x + 32) + ',' + (y + 56) + ' ' + (x + 40) + ',' + (y + 42) + ' ' + (x + 46) + ',' + (y + 56) + '" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
    '<polygon points="' + (x + 48) + ',' + (y + 56) + ' ' + (x + 56) + ',' + (y + 46) + ' ' + (x + 62) + ',' + (y + 56) + '" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>';
}

// ── personal_hygiene (061–068) ───────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1he-hyg-061', chapterId:CH_HYG, difficulty:1, subsection:'personal_hygiene',
    question: row4('four things we keep in the bathroom, labelled A to D',
      [gComb, gSoap, gBrush, gTowel], ['A', 'B', 'C', 'D']) +
      'Which one do we rub on our body with water to wash away dirt?',
    options:['B','A','C','D'], answer:'B',
    hint:'Look for the one that makes bubbles.',
    explanation:'Picture <b>B</b> is the bar of soap. 🧼 Water alone slides over dirt — soap lifts the dirt and germs off our skin.' }),

  makeMCQ({ id:'g1he-hyg-062', chapterId:CH_HYG, difficulty:1, subsection:'personal_hygiene',
    question: row2('two drawings of the same shirt, one with marks on it',
      [function (x, y) { return gShirt(x, y, true); }, function (x, y) { return gShirt(x, y, false); }],
      ['A', 'B']) +
      'Which shirt should you put on for school?',
    options:['B','A','Both','Neither'], answer:'B',
    hint:'Look carefully for spots and marks.',
    explanation:'Shirt <b>B</b> has no marks on it. Shirt A is dirty, and dirty clothes hold germs against our skin all day.' }),

  makeMCQ({ id:'g1he-hyg-063', chapterId:CH_HYG, difficulty:1, subsection:'personal_hygiene',
    question: row4('four everyday objects, labelled A to D',
      [gBall, gBook, gBrush, gPencil], ['A', 'B', 'C', 'D']) +
      'Which one must you never share with a friend?',
    options:['C','A','B','D'], answer:'C',
    hint:'Which one goes inside your mouth?',
    explanation:'Picture <b>C</b> is a toothbrush. 🪥 It touches inside your mouth, so sharing it passes germs straight from one child to another. Balls, books and pencils are fine to share.' }),

  makeMCQ({ id:'g1he-hyg-064', chapterId:CH_HYG, difficulty:1, subsection:'personal_hygiene',
    question: one('a striped cloth hanging on a rail', gTowel, 140) +
      'You have just finished your bath. What do you do with this?',
    options:['Dry my body','Wash my hair','Clean my shoes','Wipe the floor'], answer:'Dry my body',
    hint:'Think about what you do straight after a bath.',
    explanation:'A towel is for <b>drying your body</b>. Staying wet makes you cold, and damp skin between the toes is where itchy germs like to grow.' }),

  makeMCQ({ id:'g1he-hyg-065', chapterId:CH_HYG, difficulty:1, subsection:'personal_hygiene',
    question: one('a bar with round bubbles above it', gSoap, 140) +
      'Soap helps us to ______.',
    options:['wash away germs','make our hair grow','grow much taller','run a lot faster'], answer:'wash away germs',
    hint:'Think about what soap does to the dirt on your skin.',
    explanation:'Soap <b>washes away germs</b>. It grabs the oil and dirt on your skin so the water can carry them down the drain.' }),

  makeMCQ({ id:'g1he-hyg-066', chapterId:CH_HYG, difficulty:1, subsection:'personal_hygiene',
    question: row4('four objects, labelled A to D',
      [gSoap, gTowel, gComb, gSweet], ['A', 'B', 'C', 'D']) +
      'Three of these help us keep clean and tidy. Which one does not?',
    options:['D','A','B','C'], answer:'D',
    hint:'Which one is something to eat?',
    explanation:'Picture <b>D</b> is a sweet 🍬 — it is food, not a cleaning thing. Soap, a towel and a comb all help us stay clean and tidy.' }),

  makeMCQ({ id:'g1he-hyg-067', chapterId:CH_HYG, difficulty:1, subsection:'personal_hygiene',
    question: one('a box with a folded white sheet coming out of it', gTissue, 140) +
      'You feel a big sneeze coming. What should you use?',
    options:['A tissue','My shirt','My hand','A book'], answer:'A tissue',
    hint:'Look at the picture — what is coming out of the box?',
    explanation:'Use <b>a tissue</b>, then put it in the bin and wash your hands. 🤧 Sneezing into your hand puts germs on everything you touch next.' }),

  makeMCQ({ id:'g1he-hyg-068', chapterId:CH_HYG, difficulty:2, subsection:'personal_hygiene',
    question: row4('four objects, labelled A to D',
      [gSoap, gTowel, gCloth, gBook], ['A', 'B', 'C', 'D']) +
      'Your hands are clean. Which one would make them dirty again?',
    options:['C','A','B','D'], answer:'C',
    hint:'Look for the spots and marks.',
    explanation:'Picture <b>C</b> is a dirty cloth. Wiping clean hands on it puts the dirt straight back — that is why we dry on a <b>clean</b> towel.' })

);

// ── hand_washing (069–076) ───────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1he-hyg-069', chapterId:CH_HYG, difficulty:1, subsection:'hand_washing',
    question: row4('four small pictures in a numbered row, 1 to 4',
      [function (x, y) { return gTap(x, y, false); }, gSoap,
        function (x, y) { return gTap(x, y, true); }, gTowel], ['1', '2', '3', '4']) +
      'The pictures show hand washing in order. What do we use at step 2?',
    options:['Soap','A comb','A book','A ball'], answer:'Soap',
    hint:'Look at the second picture only.',
    explanation:'Step 2 is the <b>soap</b>. First the water, then soap, then rinse, then dry — always in that order.' }),

  makeMCQ({ id:'g1he-hyg-070', chapterId:CH_HYG, difficulty:1, subsection:'hand_washing',
    question: row4('three small pictures and one empty box in a numbered row',
      [function (x, y) { return gTap(x, y, false); }, gSoap,
        function (x, y) { return gTap(x, y, true); }, gQ], ['1', '2', '3', '4']) +
      'One step is missing at number 4. What must we still do?',
    options:['Dry my hands','Wet my hands','Open the door','Eat my lunch'], answer:'Dry my hands',
    hint:'The water is finished — what comes last?',
    explanation:'The last step is to <b>dry my hands</b> on a clean towel. Wet hands pick up new germs from everything they touch.' }),

  makeMCQ({ id:'g1he-hyg-071', chapterId:CH_HYG, difficulty:1, subsection:'hand_washing',
    question: two('a tap with a drop of water and a bar with bubbles', function (x, y) { return gTap(x, y, false); }, gSoap, 220) +
      'How long should we rub our hands with soap before we rinse?',
    options:['20 seconds','1 second','1 hour','all day'], answer:'20 seconds',
    hint:'Long enough to sing Happy Birthday twice.',
    explanation:'About <b>20 seconds</b> — sing Happy Birthday twice while you rub. 🎵 One quick second only wets the germs, it does not lift them off.' }),

  makeMCQ({ id:'g1he-hyg-072', chapterId:CH_HYG, difficulty:1, subsection:'hand_washing',
    question: fig('a round plate with food on it', 200, 150, 190,
      plate(100, 78, 62) + at(58, 44, 0.5, gRice(0, 0)) + at(100, 42, 0.5, gFish(0, 0)) + at(78, 80, 0.5, gLeafVeg(0, 0))) +
      'Your lunch is ready. When should you wash your hands?',
    options:['Before I eat','After I eat only','Once a week','Only at night'], answer:'Before I eat',
    hint:'Your fingers touch the food you put in your mouth.',
    explanation:'Wash them <b>before you eat</b> (and after too). Your fingers carry germs straight into your mouth with the food.' }),

  makeMCQ({ id:'g1he-hyg-073', chapterId:CH_HYG, difficulty:1, subsection:'hand_washing',
    question: one('a container with a lid', gBin, 140) +
      'You have just dropped your rubbish in the bin. What do you do next?',
    options:['Wash my hands','Eat my snack','Rub my eyes','Touch my food'], answer:'Wash my hands',
    hint:'The bin lid is touched by many hands.',
    explanation:'<b>Wash my hands.</b> A bin is full of germs, so we always wash after touching one — before we eat or touch our face.' }),

  makeMCQ({ id:'g1he-hyg-074', chapterId:CH_HYG, difficulty:1, subsection:'hand_washing',
    question: two('a tap with drops and a bar with bubbles', function (x, y) { return gTap(x, y, true); }, gSoap, 220) +
      'What do we need to get our hands really clean?',
    options:['Water and soap','Only water','Only a towel','Only a comb'], answer:'Water and soap',
    hint:'The picture shows you both of them.',
    explanation:'We need <b>water and soap</b> together. Water on its own leaves the greasy dirt — and the germs hiding in it — on your skin.' }),

  makeMCQ({ id:'g1he-hyg-075', chapterId:CH_HYG, difficulty:2, subsection:'hand_washing',
    question: one('a striped cloth hanging on a rail', gTowel, 140) +
      'Why must we dry our hands after washing them?',
    options:['Germs like wet hands','Water is always cold','The towel is soft','The soap smells nice'], answer:'Germs like wet hands',
    hint:'Think about what sticks to wet fingers.',
    explanation:'<b>Germs like wet hands.</b> They stick to damp skin and spread easily, so drying is part of washing, not an extra.' }),

  makeMCQ({ id:'g1he-hyg-076', chapterId:CH_HYG, difficulty:2, subsection:'hand_washing',
    question: row4('four objects, labelled A to D',
      [gTowel, gComb, function (x, y) { return gTap(x, y, false); }, gSoap], ['A', 'B', 'C', 'D']) +
      'Which picture shows what we use FIRST when we wash our hands?',
    options:['C','A','B','D'], answer:'C',
    hint:'Your hands must be wet before the soap goes on.',
    explanation:'Picture <b>C</b> is the tap. We wet our hands first, then soap (D), then rinse, then dry on the towel (A).' })

);

// ── dental_care (077–084) ────────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1he-hyg-077', chapterId:CH_HYG, difficulty:1, subsection:'dental_care',
    question: row2('the same tooth twice, each with an arrow beside it',
      [function (x, y) { return gTooth(x, y, false) + gArrowUpDown(x, y); },
        function (x, y) { return gTooth(x, y, false) + gArrowSide(x, y); }], ['A', 'B']) +
      'The arrows show how the brush moves. Which picture shows brushing up and down?',
    options:['A','B','Both','Neither'], answer:'A',
    hint:'Follow the way each arrow points.',
    explanation:'Arrow <b>A</b> points up and down. Brushing that way sweeps the bits of food out from between the teeth; scrubbing sideways only pushes them along.' }),

  makeMCQ({ id:'g1he-hyg-078', chapterId:CH_HYG, difficulty:1, subsection:'dental_care',
    question: row2('two drawings of a tooth, one with a dark mark on it',
      [function (x, y) { return gTooth(x, y, false); }, function (x, y) { return gTooth(x, y, true); }], ['A', 'B']) +
      'One of these teeth has a hole in it. Which one?',
    options:['B','A','Both','Neither'], answer:'B',
    hint:'Look for the dark spot.',
    explanation:'Tooth <b>B</b> has the dark spot — that is a hole made by decay. It hurts, and only a dentist can mend it.' }),

  makeMCQ({ id:'g1he-hyg-079', chapterId:CH_HYG, difficulty:1, subsection:'dental_care',
    question: two('a bright round shape with rays and a curved night shape', gSun, gMoon, 200) +
      'Morning and night. How many times a day should we brush our teeth?',
    options:['Two times','One time','Five times','No times'], answer:'Two times',
    hint:'Count the pictures.',
    explanation:'<b>Two times</b> — once in the morning and once before bed. The night brush matters most, because food left on teeth all night makes holes.' }),

  makeMCQ({ id:'g1he-hyg-080', chapterId:CH_HYG, difficulty:1, subsection:'dental_care',
    question: one('a tooth shape with a dark mark on it', function (x, y) { return gTooth(x, y, true); }, 130) +
      'Sugar made this hole. What should you do after eating something sweet?',
    options:['Brush my teeth','Eat one more sweet','Go straight to bed','Drink a fizzy drink'], answer:'Brush my teeth',
    hint:'Do not leave the sugar sitting on your teeth.',
    explanation:'<b>Brush my teeth.</b> Sugar left on a tooth feeds the germs that dig holes like this one. 🪥' }),

  makeMCQ({ id:'g1he-hyg-081', chapterId:CH_HYG, difficulty:1, subsection:'dental_care',
    question: row4('four objects with handles, labelled A to D',
      [gBrush, gPencil, gComb, gBook], ['A', 'B', 'C', 'D']) +
      'Which one do we use to clean our teeth?',
    options:['toothbrush','pencil','comb','book'], answer:'toothbrush',
    hint:'Look for the one with soft bristles at the end.',
    explanation:'The <b>toothbrush</b> — picture A. Its little bristles reach the food hiding between the teeth.' }),

  makeMCQ({ id:'g1he-hyg-082', chapterId:CH_HYG, difficulty:1, subsection:'dental_care',
    question: two('two brushes with bristles, side by side', gBrush, gBrush, 200) +
      'Your friend forgot her toothbrush at home. What should she do?',
    options:['Get a new brush','Use my brush','Not brush at all','Share with me'], answer:'Get a new brush',
    hint:'A toothbrush belongs to one person only.',
    explanation:'She should <b>get a new brush</b>. Two brushes, two children — sharing one moves germs from mouth to mouth.' }),

  makeMCQ({ id:'g1he-hyg-083', chapterId:CH_HYG, difficulty:2, subsection:'dental_care',
    question: row2('two brushes, one with straight bristles and one with bent bristles',
      [function (x, y) { return gBrush(x, y, true); }, function (x, y) { return gBrush(x, y, false); }], ['A', 'B']) +
      'Which toothbrush is worn out and should be thrown away?',
    options:['A','B','Both','Neither'], answer:'A',
    hint:'Look at the little bristles at the end.',
    explanation:'Brush <b>A</b> — its bristles are bent and floppy, so they cannot clean any more. We change a toothbrush about every three months.' }),

  makeMCQ({ id:'g1he-hyg-084', chapterId:CH_HYG, difficulty:2, subsection:'dental_care',
    question: one('a round face with marks and two pointers', gClock, 140) +
      'How long should you brush your teeth each time?',
    options:['Two minutes','Ten seconds','A whole hour','All morning'], answer:'Two minutes',
    hint:'Longer than a quick scrub, shorter than a lesson.',
    explanation:'About <b>two minutes</b>. That is just long enough to reach the front, the back and the top of every tooth. ⏰' })

);

// ── food_groups (061–068) ────────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1he-nut-061', chapterId:CH_NUT, difficulty:1, subsection:'food_groups',
    question: row4('four different foods, labelled A to D',
      [gCarrot, gBanana, gBread, gFish], ['A', 'B', 'C', 'D']) +
      'Which one of these foods is a vegetable?',
    options:['A','B','C','D'], answer:'A',
    hint:'It is orange and it grows under the ground.',
    explanation:'Picture <b>A</b> is a carrot 🥕 — a vegetable. B is a fruit, C is bread and D is fish.' }),

  makeMCQ({ id:'g1he-nut-062', chapterId:CH_NUT, difficulty:1, subsection:'food_groups',
    question: one('a long curved yellow food with a stalk', gBanana, 130) +
      'A banana belongs to which food group?',
    options:['Fruits','Vegetables','Meat group','Milk group'], answer:'Fruits',
    hint:'It grows on a tree and it is sweet.',
    explanation:'A banana is a <b>fruit</b>. Fruits are sweet, they grow on plants and trees, and they give us vitamins.' }),

  makeMCQ({ id:'g1he-nut-063', chapterId:CH_NUT, difficulty:2, subsection:'food_groups',
    question: fig('a round plate divided into three parts of different sizes', 200, 180, 200,
      '<path d="M100 90 L100 160 A70 70 0 0 1 100 20 Z" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<path d="M100 90 L100 20 A70 70 0 0 1 170 90 Z" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<path d="M100 90 L170 90 A70 70 0 0 1 100 160 Z" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="100" cy="90" r="70" fill="none" stroke="#111827" stroke-width="3"/>' +
      lbl(62, 95, 'Veg', 15) + lbl(133, 60, 'Rice', 15) + lbl(133, 125, 'Fish', 15)) +
      'This plate shows how much of each food to eat. Which part is the biggest?',
    options:['Veg','Rice','Fish','Cake'], answer:'Veg',
    hint:'One part fills half the plate on its own.',
    explanation:'<b>Veg</b> fills half the plate — the biggest part. Vegetables and fruit should be the largest part of every meal. 🥗' }),

  makeMCQ({ id:'g1he-nut-064', chapterId:CH_NUT, difficulty:1, subsection:'food_groups',
    question: one('a tall container filled to the top', gMilk, 130) +
      'Milk helps to build strong ______.',
    options:['bones and teeth','hair and nails','shoes and socks','books and bags'], answer:'bones and teeth',
    hint:'Think of the hard parts inside your body.',
    explanation:'Milk builds strong <b>bones and teeth</b> 🥛 because it is full of calcium.' }),

  makeMCQ({ id:'g1he-nut-065', chapterId:CH_NUT, difficulty:1, subsection:'food_groups',
    question: row4('four foods, labelled A to D',
      [gApple, gLeafVeg, gFish, gSweet], ['A', 'B', 'C', 'D']) +
      'Which of these should we eat the least?',
    options:['D','A','B','C'], answer:'D',
    hint:'Which one is nearly all sugar?',
    explanation:'Picture <b>D</b> is a sweet. Sweets are almost all sugar — they give no vitamins and they make holes in our teeth.' }),

  makeMCQ({ id:'g1he-nut-066', chapterId:CH_NUT, difficulty:2, subsection:'food_groups',
    question: fig('a round plate with four foods on it', 200, 150, 200,
      plate(100, 78, 62) + at(62, 40, 0.45, gBanana(0, 0)) + at(104, 40, 0.45, gApple(0, 0)) +
      at(62, 84, 0.45, gMango(0, 0)) + at(104, 84, 0.45, gBread(0, 0))) +
      'How many of the foods on this plate are fruits?',
    options:['3','2','4','1'], answer:'3',
    hint:'One of the four is not a fruit at all.',
    explanation:'<b>3</b> — the banana, the apple and the mango 🥭 are fruits. The brown loaf is bread, and bread is not a fruit.' }),

  makeMCQ({ id:'g1he-nut-067', chapterId:CH_NUT, difficulty:1, subsection:'food_groups',
    question: fig('a container holding several round and curved foods', 200, 150, 200,
      '<path d="M55 78 q45 -46 90 0" stroke="#92400E" stroke-width="5" fill="none"/>' +
      at(46, 36, 0.55, gBanana(0, 0)) + at(84, 32, 0.55, gApple(0, 0)) + at(122, 38, 0.55, gMango(0, 0)) +
      '<polygon points="40,78 160,78 145,134 55,134" fill="#92400E" stroke="#111827" stroke-width="2.5"/>' +
      '<path d="M40 88 L160 88" stroke="#111827" stroke-width="2" fill="none"/>') +
      'How often should we eat fruit and vegetables?',
    options:['Every day','Once a week','Once a month','Only at parties'], answer:'Every day',
    hint:'Our body needs vitamins all the time, not sometimes.',
    explanation:'<b>Every day.</b> Our body cannot store most vitamins, so it needs a fresh supply from fruit and vegetables each day.' }),

  makeMCQ({ id:'g1he-nut-068', chapterId:CH_NUT, difficulty:2, subsection:'food_groups',
    question: fig('one food drawn above two empty labelled boxes', 260, 175, 260,
      at(95, 6, 0.75, gCarrot(0, 0)) +
      lbl(65, 88, 'Fruits', 15) + '<rect x="15" y="96" width="100" height="60" rx="8" fill="#FFFFFF" stroke="#111827" stroke-width="2.5"/>' +
      lbl(195, 88, 'Vegetables', 15) + '<rect x="145" y="96" width="100" height="60" rx="8" fill="#FFFFFF" stroke="#111827" stroke-width="2.5"/>') +
      'Which box should this food go into?',
    options:['Vegetables','Fruits','Drinks','Sweets'], answer:'Vegetables',
    hint:'Does it grow under the ground, or on a tree?',
    explanation:'The carrot goes in the <b>Vegetables</b> box. It is a root — it grows under the ground and it is not sweet like a fruit.' })

);

// ── healthy_meals (069–076) ──────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1he-nut-069', chapterId:CH_NUT, difficulty:1, subsection:'healthy_meals',
    question: fig('a round plate with three different foods on it', 200, 150, 200,
      plate(100, 78, 62) + at(58, 44, 0.5, gRice(0, 0)) + at(100, 42, 0.5, gFish(0, 0)) + at(78, 80, 0.5, gLeafVeg(0, 0))) +
      'This plate has rice, fish and a green vegetable. What kind of meal is it?',
    options:['A balanced meal','A sweet snack','A cold drink','An empty plate'], answer:'A balanced meal',
    hint:'Count how many different food groups are there.',
    explanation:'It is <b>a balanced meal</b> — rice for energy, fish to grow, vegetables for vitamins. Three groups on one plate. 🍚' }),

  makeMCQ({ id:'g1he-nut-070', chapterId:CH_NUT, difficulty:1, subsection:'healthy_meals',
    question: fig('a round plate with one food on it', 200, 150, 200,
      plate(100, 78, 62) + at(72, 52, 0.62, gRice(0, 0))) +
      'This plate has only rice. What is missing?',
    options:['Vegetables','More rice','More salt','More sugar'], answer:'Vegetables',
    hint:'Which group has not come to the plate at all?',
    explanation:'<b>Vegetables</b> are missing (and something to grow on, like fish or beans). Rice alone gives energy but no vitamins.' }),

  makeMCQ({ id:'g1he-nut-071', chapterId:CH_NUT, difficulty:1, subsection:'healthy_meals',
    question: fig('two round plates side by side with different foods on them', 320, 170, 340,
      plate(82, 80, 50) + at(58, 52, 0.4, gRice(0, 0)) + at(84, 54, 0.4, gFish(0, 0)) + at(70, 84, 0.4, gLeafVeg(0, 0)) +
      plate(238, 80, 50) + at(214, 52, 0.4, gSweet(0, 0)) + at(240, 54, 0.4, gChips(0, 0)) + at(226, 86, 0.4, gSweet(0, 0)) +
      lbl(82, 156, 'A', 17) + lbl(238, 156, 'B', 17)) +
      'Which plate is the healthier meal?',
    options:['Plate A','Plate B','Both plates','No plate'], answer:'Plate A',
    hint:'One plate has food from three groups; the other has only treats.',
    explanation:'<b>Plate A.</b> It has food from three groups. Plate B is only sweets and chips — lots of sugar, salt and oil, and no vitamins.' }),

  makeMCQ({ id:'g1he-nut-072', chapterId:CH_NUT, difficulty:1, subsection:'healthy_meals',
    question: fig('a box with three parts, two filled and one empty', 240, 140, 250,
      '<rect x="10" y="20" width="220" height="100" rx="10" fill="#3B82F6" stroke="#111827" stroke-width="2.5"/>' +
      '<rect x="20" y="30" width="65" height="80" rx="5" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="2"/>' +
      '<rect x="95" y="30" width="65" height="80" rx="5" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="2"/>' +
      '<rect x="170" y="30" width="60" height="80" rx="5" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="2"/>' +
      at(26, 42, 0.75, gBread(0, 0)) + at(101, 42, 0.75, gApple(0, 0)) + lbl(200, 82, '?', 30)) +
      'Your lunch box has bread and fruit. What should go in the last part?',
    options:['A bottle of water','A bar of chocolate','A packet of chips','A fizzy cold drink'], answer:'A bottle of water',
    hint:'What does your body need most on a hot Mauritian day?',
    explanation:'<b>A bottle of water.</b> Water is the best drink of all — it costs nothing, it has no sugar and it keeps you cool. 💧' }),

  makeMCQ({ id:'g1he-nut-073', chapterId:CH_NUT, difficulty:1, subsection:'healthy_meals',
    question: fig('a bright shape with rays beside a round plate of food', 200, 130, 220,
      at(6, 20, 0.8, gSun(0, 0)) + plate(132, 68, 45) + at(110, 46, 0.6, gBread(0, 0))) +
      'The sun is up and it is time for breakfast. Why is breakfast important?',
    options:['It gives us energy','It makes us sleepy','It makes us taller','It cleans our teeth'], answer:'It gives us energy',
    hint:'Your body has had nothing all night.',
    explanation:'<b>It gives us energy.</b> After a whole night with no food, breakfast fills the tank so you can think and play at school. 🌅' }),

  makeMCQ({ id:'g1he-nut-074', chapterId:CH_NUT, difficulty:1, subsection:'healthy_meals',
    question: fig('three numbered pictures of the sky at different times', 340, 130, 340,
      cell(20, 4, 80, 96) + '<path d="M26 74 L94 74" stroke="#92400E" stroke-width="3" fill="none"/>' +
      '<circle cx="60" cy="62" r="14" fill="#FACC15" stroke="#F97316" stroke-width="2.5"/>' +
      cell(130, 4, 80, 96) + at(135, 8, 0.75, gSun(0, 0)) +
      cell(240, 4, 80, 96) + at(245, 12, 0.7, gMoon(0, 0)) +
      lbl(60, 120, '1', 16) + lbl(170, 120, '2', 16) + lbl(280, 120, '3', 16)) +
      'Which meal do we eat at picture 3, when the moon is out?',
    options:['Dinner','Breakfast','Snack','Lunch'], answer:'Dinner',
    hint:'Picture 3 is night time.',
    explanation:'<b>Dinner</b> is our night meal. Picture 1 is sunrise (breakfast), picture 2 is midday (lunch), picture 3 is night. 🌙' }),

  makeMCQ({ id:'g1he-nut-075', chapterId:CH_NUT, difficulty:1, subsection:'healthy_meals',
    question: two('a container with holes in the lid and a wrapped item', gShaker, gSweet, 200) +
      'Eating a lot of salt and sugar every day is ______.',
    options:['not good for us','very good for us','good for our eyes','good for our ears'], answer:'not good for us',
    hint:'A little is fine — a lot is the problem.',
    explanation:'Too much salt and sugar is <b>not good for us</b>. Sugar makes holes in teeth, and too much salt is hard work for the heart.' }),

  makeMCQ({ id:'g1he-nut-076', chapterId:CH_NUT, difficulty:2, subsection:'healthy_meals',
    question: fig('a round plate with four different foods on it', 200, 150, 200,
      plate(100, 78, 62) + at(62, 40, 0.45, gRice(0, 0)) + at(104, 40, 0.45, gFish(0, 0)) +
      at(62, 84, 0.45, gLeafVeg(0, 0)) + at(104, 84, 0.45, gBanana(0, 0))) +
      'Rice, fish, a green leaf and a banana. How many food groups is that?',
    options:['4','3','2','1'], answer:'4',
    hint:'Each food comes from a different group.',
    explanation:'<b>4</b> groups: rice gives energy, fish helps us grow, the leaf is a vegetable and the banana is a fruit. A really good plate!' })

);

// ── healthy_snacks (077–084) ─────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1he-nut-077', chapterId:CH_NUT, difficulty:1, subsection:'healthy_snacks',
    question: row2('two snacks side by side, labelled A and B', [gApple, gSweet], ['A', 'B']) +
      'It is break time. Which snack is better for you?',
    options:['Snack A','Snack B','Both snacks','No snacks'], answer:'Snack A',
    hint:'One of them is nearly all sugar.',
    explanation:'<b>Snack A</b>, the apple 🍎 — it brings water, vitamins and fibre. Snack B is a sweet, and sweets are sugar and little else.' }),

  makeMCQ({ id:'g1he-nut-078', chapterId:CH_NUT, difficulty:1, subsection:'healthy_snacks',
    question: row4('four snacks and drinks, labelled A to D',
      [gApple, gChips, gSweet, gFizzy], ['A', 'B', 'C', 'D']) +
      'You are hungry after school. Which one should you choose?',
    options:['A fresh fruit','A bag of chips','A sugar sweet','A fizzy drink'], answer:'A fresh fruit',
    hint:'Look for the one that grew on a plant.',
    explanation:'<b>A fresh fruit</b> — picture A. The other three are made in a factory and are full of sugar, salt or oil.' }),

  makeMCQ({ id:'g1he-nut-079', chapterId:CH_NUT, difficulty:1, subsection:'healthy_snacks',
    question: two('a packet with a torn top and a wrapped item', gChips, gSweet, 200) +
      'Chips and sweets hold a lot of ______.',
    options:['salt and sugar','water and air','milk and eggs','seeds and leaves'], answer:'salt and sugar',
    hint:'Think about how they taste on your tongue.',
    explanation:'They hold a lot of <b>salt and sugar</b> (and oil). That is why they taste so strong — and why they are treats, not everyday food.' }),

  makeMCQ({ id:'g1he-nut-080', chapterId:CH_NUT, difficulty:1, subsection:'healthy_snacks',
    question: one('a round face with marks and two pointers', gClock, 140) +
      'When is the best time to eat a snack?',
    options:['Between meals','While I sleep','During my bath','Just before bed'], answer:'Between meals',
    hint:'A snack fills the gap — it does not replace a meal.',
    explanation:'<b>Between meals</b>, when you are really hungry. Eating just before bed leaves food on your teeth all night.' }),

  makeMCQ({ id:'g1he-nut-081', chapterId:CH_NUT, difficulty:1, subsection:'healthy_snacks',
    question: one('an oval food with a small green leaf at the top', gMango, 140) +
      'This fruit grows on trees all over Mauritius. Why is it a good snack?',
    options:['It has vitamins','It has much salt','It has much oil','It has no taste'], answer:'It has vitamins',
    hint:'Think about what fresh fruit gives your body.',
    explanation:'A mango 🥭 <b>has vitamins</b> and water, and no added sugar at all. Mauritian fruit in season is the cheapest good snack there is.' }),

  makeMCQ({ id:'g1he-nut-082', chapterId:CH_NUT, difficulty:1, subsection:'healthy_snacks',
    question: fig('several wrapped items in a pile', 240, 110, 240,
      at(10, 6, 0.8, gSweet(0, 0)) + at(66, 6, 0.8, gSweet(0, 0)) + at(122, 6, 0.8, gSweet(0, 0)) +
      at(38, 44, 0.8, gSweet(0, 0)) + at(94, 44, 0.8, gSweet(0, 0)) + at(150, 44, 0.8, gSweet(0, 0))) +
      'There are lots of sweets at a party. How many should you eat?',
    options:['Just a little','A whole packet','Ten packets','A big bowl'], answer:'Just a little',
    hint:'Sweets are a treat, not a meal.',
    explanation:'<b>Just a little.</b> One or two at a party is fine — then drink water and brush your teeth before bed. 🍬' }),

  makeMCQ({ id:'g1he-nut-083', chapterId:CH_NUT, difficulty:1, subsection:'healthy_snacks',
    question: fig('a round food under a tap with drops falling', 180, 130, 180,
      at(20, 2, 0.9, gTap(0, 0, true)) + at(48, 56, 0.85, gApple(0, 0))) +
      'You pick a fruit at the market. What must you do before you eat it?',
    options:['Wash it well','Drop it down','Hide it away','Kick it about'], answer:'Wash it well',
    hint:'Think about all the hands that touched it.',
    explanation:'<b>Wash it well</b> under clean water. Fruit is touched by many hands and may carry dust or germs on the skin.' }),

  makeMCQ({ id:'g1he-nut-084', chapterId:CH_NUT, difficulty:2, subsection:'healthy_snacks',
    question: row2('two drinks side by side, labelled A and B', [gWater, gFizzy], ['A', 'B']) +
      'You are hot and thirsty after playing. Which drink is best?',
    options:['Plain water','Fizzy drink','Sweet syrup','Cold coffee'], answer:'Plain water',
    hint:'Which one has no sugar in it at all?',
    explanation:'<b>Plain water</b> — drink A. A fizzy drink has spoonfuls of sugar in it and leaves you thirsty again soon after.' })

);

// ── school_safety (061–068) ──────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1he-saf-061', chapterId:CH_SAF, difficulty:1, subsection:'school_safety',
    question: one('a yellow three-sided sign standing on a shiny patch of floor', gWetSign, 140) +
      'This sign is in the school corridor. The floor there is wet. What should you do?',
    options:['Walk slowly','Run very fast','Jump over it','Slide on it'], answer:'Walk slowly',
    hint:'What happens to fast feet on a wet floor?',
    explanation:'<b>Walk slowly.</b> The yellow sign means the floor is slippery — running or sliding on it is how children fall and hurt their head. ⚠️' }),

  makeMCQ({ id:'g1he-saf-062', chapterId:CH_SAF, difficulty:1, subsection:'school_safety',
    question: one('steps going up, with a long bar beside them', gStairs, 150) +
      'You are going down the school stairs. What should you hold?',
    options:['The handrail','My friend','My school bag','The window'], answer:'The handrail',
    hint:'Look at the long brown bar in the picture.',
    explanation:'Hold <b>the handrail</b> — the bar along the side. If your foot slips, your hand is already holding on.' }),

  makeMCQ({ id:'g1he-saf-063', chapterId:CH_SAF, difficulty:1, subsection:'school_safety',
    question: fig('a round object lying on the floor of a passage', 200, 110, 200,
      '<path d="M10 90 L190 90" stroke="#92400E" stroke-width="3" fill="none"/>' +
      '<path d="M10 90 L10 14" stroke="#9CA3AF" stroke-width="3" fill="none"/>' +
      '<path d="M190 90 L190 14" stroke="#9CA3AF" stroke-width="3" fill="none"/>' +
      at(66, 28, 1, gBall(0, 0))) +
      'Someone left this in the corridor. Why is that not safe?',
    options:['Someone can trip','Someone can lose it','Someone can kick it','Someone can hide it'], answer:'Someone can trip',
    hint:'Think about feet that are not looking down.',
    explanation:'<b>Someone can trip</b> over it and fall. Toys and bags belong in the classroom or the yard, never on the corridor floor.' }),

  makeMCQ({ id:'g1he-saf-064', chapterId:CH_SAF, difficulty:1, subsection:'school_safety',
    question: one('a tool with two blades and two rings', gScissors, 130) +
      'Your teacher asks you to carry these across the classroom. How do you hold them?',
    options:['Points down low','Points up high','Above my head','Over my shoulder'], answer:'Points down low',
    hint:'Point the sharp end where it can hurt nobody.',
    explanation:'Hold them closed, with the <b>points down low</b> in your fist. If you trip, the sharp end is pointing at the floor and not at anyone. ✂️' }),

  makeMCQ({ id:'g1he-saf-065', chapterId:CH_SAF, difficulty:1, subsection:'school_safety',
    question: one('a sloping playground toy with a ladder', gSlide, 150) +
      'On the slide in the school yard, you must always ______.',
    options:['go down feet first','go down head first','climb up the slide','push the next child'], answer:'go down feet first',
    hint:'Which part of you should land first?',
    explanation:'Always <b>go down feet first</b>, sitting up, one child at a time. Head first means your head hits the ground first too.' }),

  makeMCQ({ id:'g1he-saf-066', chapterId:CH_SAF, difficulty:1, subsection:'school_safety',
    question: one('a bright round shape with rays around it', gSun, 130) +
      'It is very hot and sunny in the school yard. What should you wear?',
    options:['A hat','A coat','Boots','Gloves'], answer:'A hat',
    hint:'Which one gives your face and neck some shade?',
    explanation:'<b>A hat.</b> The Mauritian sun is strongest between 11 and 3 — a hat shades your face and neck, and the shade of a tree is even better. ☀️' }),

  makeMCQ({ id:'g1he-saf-067', chapterId:CH_SAF, difficulty:1, subsection:'school_safety',
    question: row4('four things found in a classroom, labelled A to D',
      [gScissors, gBook, gBall, gHat], ['A', 'B', 'C', 'D']) +
      'Which of these has a sharp point you must be careful with?',
    options:['A','B','C','D'], answer:'A',
    hint:'Which one can cut?',
    explanation:'Picture <b>A</b> is the scissors. We carry them points down, we never run with them, and we never wave them about.' }),

  makeMCQ({ id:'g1he-saf-068', chapterId:CH_SAF, difficulty:2, subsection:'school_safety',
    question: fig('a grey strip with white bars painted across it', 120, 100, 160, gZebra(25, 15)) +
      'School is over and you must cross the road. Where is the safest place?',
    options:['On the crossing','Behind a car','Between two cars','At a blind corner'], answer:'On the crossing',
    hint:'Where can the drivers see you best?',
    explanation:'<b>On the crossing</b> — the white bars. Drivers watch for children there. Between parked cars nobody can see you until it is too late.' })

);

// ── home_safety (069–076) ────────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1he-saf-069', chapterId:CH_SAF, difficulty:1, subsection:'home_safety',
    question: one('a container with a spout and curly lines rising from it', gKettle, 140) +
      'The kettle has just boiled and it is very hot. Who should pour the water?',
    options:['A grown-up','Me, alone','My friend','My brother'], answer:'A grown-up',
    hint:'The curly lines are steam, and steam burns.',
    explanation:'<b>A grown-up</b> pours boiling water. The steam alone can burn your skin, and a full kettle is heavy for small hands. ☕' }),

  makeMCQ({ id:'g1he-saf-070', chapterId:CH_SAF, difficulty:2, subsection:'home_safety',
    question: one('a pot on a cooker with its handle over the edge', gPotEdge, 150) +
      'The pot handle is sticking out over the edge of the cooker. Why is that not safe?',
    options:['I could knock it','I could clean it','I could smell it','I could count it'], answer:'I could knock it',
    hint:'What happens if your arm touches the handle as you walk past?',
    explanation:'<b>I could knock it</b> and pull the hot pot down on myself. At home we turn every pot handle inwards, away from the edge. 🍲' }),

  makeMCQ({ id:'g1he-saf-071', chapterId:CH_SAF, difficulty:1, subsection:'home_safety',
    question: one('a white wall plate with three dark slots in it', gSocket, 130) +
      'Why must we never push anything into an electric socket?',
    options:['It can give a shock','It can make a noise','It can turn a light','It can break a toy'], answer:'It can give a shock',
    hint:'Something you cannot see is waiting inside.',
    explanation:'<b>It can give a shock.</b> Electricity is invisible and very strong — a shock can stop your heart. Only a grown-up touches plugs. ⚡' }),

  makeMCQ({ id:'g1he-saf-072', chapterId:CH_SAF, difficulty:1, subsection:'home_safety',
    question: one('a closed container with a yellow three-sided mark on it', gHazardBottle, 130) +
      'You find this bottle under the sink. The yellow mark means danger. What should you do?',
    options:['Tell a grown-up','Open and smell','Drink a little','Wash with it'], answer:'Tell a grown-up',
    hint:'Never open something you do not know.',
    explanation:'<b>Tell a grown-up.</b> Cleaning liquids can burn your mouth and make you very ill, even in a small sip. The yellow triangle means STOP. ⚠️' }),

  makeMCQ({ id:'g1he-saf-073', chapterId:CH_SAF, difficulty:1, subsection:'home_safety',
    question: one('a long thin metal object resting over the edge of a table', gKnifeEdge, 150) +
      'A knife is lying over the edge of the table. What could happen?',
    options:['It could fall on me','It could roll away','It could be washed','It could get lost'], answer:'It could fall on me',
    hint:'Look how much of it is hanging in the air.',
    explanation:'<b>It could fall on me.</b> One small knock and it drops, sharp end down. Tell a grown-up instead of moving it yourself. 🔪' }),

  makeMCQ({ id:'g1he-saf-074', chapterId:CH_SAF, difficulty:1, subsection:'home_safety',
    question: one('a small box with a stick beside it', gMatches, 140) +
      'You find a box of matches on the table at home. What should you do?',
    options:['Give it to an adult','Light one to see','Keep it in my bag','Take it to school'], answer:'Give it to an adult',
    hint:'Matches are a tool for grown-ups, not a toy.',
    explanation:'<b>Give it to an adult.</b> One match can start a fire that burns a whole house. Matches and lighters are never a toy. 🔥' }),

  makeMCQ({ id:'g1he-saf-075', chapterId:CH_SAF, difficulty:1, subsection:'home_safety',
    question: one('a tall shape with a small orange flame on top', gCandle, 130) +
      'Why must we not play near a burning candle?',
    options:['The flame can burn','The flame is pretty','The wax is very soft','The light is yellow'], answer:'The flame can burn',
    hint:'What does fire do to skin, paper and curtains?',
    explanation:'<b>The flame can burn</b> you, and it can set paper or a curtain alight in seconds. During a power cut, keep well away from candles. 🕯️' }),

  makeMCQ({ id:'g1he-saf-076', chapterId:CH_SAF, difficulty:2, subsection:'home_safety',
    question: fig('a small building with grey curls coming from the roof', 140, 120, 150,
      '<path d="M60 34 q10 -8 0 -16 q-10 -8 0 -14" stroke="#9CA3AF" stroke-width="3" fill="none"/>' +
      '<path d="M80 32 q10 -8 0 -16 q-10 -8 0 -14" stroke="#9CA3AF" stroke-width="3" fill="none"/>' +
      at(35, 42, 1, gHouse(0, 0))) +
      'You smell smoke in the kitchen at home. What is the FIRST thing to do?',
    options:['Tell a grown-up','Look for water','Open the fridge','Hide under a bed'], answer:'Tell a grown-up',
    hint:'You cannot put out a fire on your own.',
    explanation:'<b>Tell a grown-up</b> at once, then get outside. Never hide from a fire — the people helping must be able to find you. 🚒' })

);

// ── environment (077–084) ────────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1he-saf-077', chapterId:CH_SAF, difficulty:1, subsection:'environment',
    question: row2('a container with a lid, and paper and plastic lying on the ground',
      [gBin, gLitter], ['A', 'B']) +
      'You have finished your snack. Where should the empty packet go?',
    options:['In the bin','On the road','In the grass','In the sea'], answer:'In the bin',
    hint:'Look at picture A.',
    explanation:'<b>In the bin</b> — picture A. Rubbish on the ground blocks the drains, and when the rain comes it all washes down to the sea. 🗑️' }),

  makeMCQ({ id:'g1he-saf-078', chapterId:CH_SAF, difficulty:1, subsection:'environment',
    question: one('a thick round object with blue liquid resting inside it', gTyre, 140) +
      'It rained last night and water has stayed inside this old tyre. What must we do?',
    options:['Empty the water','Leave the water','Add more water','Drink the water'], answer:'Empty the water',
    hint:'Something tiny lays its eggs in water that does not move.',
    explanation:'<b>Empty the water.</b> Mosquitoes lay eggs in still water, and mosquitoes carry dengue and chikungunya. After every rain we tip out tyres, buckets and pots. 🦟' }),

  makeMCQ({ id:'g1he-saf-079', chapterId:CH_SAF, difficulty:2, subsection:'environment',
    question: one('a container half full of blue liquid', gBucket, 130) +
      'Why is water standing in a bucket around the house a danger?',
    options:['Mosquitoes breed there','The grass grows there','The birds drink there','The wind blows there'], answer:'Mosquitoes breed there',
    hint:'Think about what buzzes at you after the rain.',
    explanation:'<b>Mosquitoes breed there.</b> They need only a little still water to lay their eggs, so we empty and turn over every container. 🪣' }),

  makeMCQ({ id:'g1he-saf-080', chapterId:CH_SAF, difficulty:1, subsection:'environment',
    question: fig('a pole with a red cloth on it standing beside wavy lines', 180, 110, 190,
      at(10, 12, 1, gFlag(0, 0)) + at(96, 12, 1, gWaves(0, 0))) +
      'A red flag is flying at the beach. What does it tell us?',
    options:['Do not swim here','The water is warm','Swimming is safe','There are no waves'], answer:'Do not swim here',
    hint:'Red always means stop.',
    explanation:'<b>Do not swim here.</b> A red flag means the sea is dangerous today. Always swim where a grown-up can see you. 🚩' }),

  makeMCQ({ id:'g1he-saf-081', chapterId:CH_SAF, difficulty:1, subsection:'environment',
    question: one('a tall dark box on a post with three round lamps, the top one lit',
      function (x, y) { return gTraffic(x, y, 0); }, 120) +
      'The top lamp is lit for the cars. What must the cars do now?',
    options:['Stop and wait','Go very fast','Turn around','Sound the horn'], answer:'Stop and wait',
    hint:'The top lamp is the red one.',
    explanation:'They must <b>stop and wait</b>. Red is always at the top. Even so, look left and right yourself before you step off the pavement. 🚦' }),

  makeMCQ({ id:'g1he-saf-082', chapterId:CH_SAF, difficulty:1, subsection:'environment',
    question: one('sharp pointed pieces lying on the ground', gBrokenGlass, 150) +
      'A bottle has broken on the school path. Where should the pieces go?',
    options:['In the rubbish bin','In my school bag','On the grass','Down the drain'], answer:'In the rubbish bin',
    hint:'And a grown-up should be the one to pick them up.',
    explanation:'<b>In the rubbish bin</b>, picked up by a grown-up with a brush. Broken glass cuts bare feet — never touch it with your fingers.' }),

  makeMCQ({ id:'g1he-saf-083', chapterId:CH_SAF, difficulty:1, subsection:'environment',
    question: fig('a small building with slanting lines falling above it', 140, 120, 150,
      at(35, 4, 1, gRain(0, 0)) + at(35, 42, 1, gHouse(0, 0))) +
      'A cyclone warning is on the radio. Where is the safest place to be?',
    options:['Inside my house','Under a big tree','On the beach','In the school yard'], answer:'Inside my house',
    hint:'Wind can break branches and blow things about.',
    explanation:'<b>Inside my house</b>, away from the windows. In a cyclone the wind throws branches and sheets of metal about outside. 🌀' }),

  makeMCQ({ id:'g1he-saf-084', chapterId:CH_SAF, difficulty:2, subsection:'environment',
    question: fig('wavy lines with a swimming shape and a floating object', 200, 110, 200,
      at(6, 2, 0.9, gFish(0, 0)) +
      '<rect x="118" y="28" width="40" height="16" rx="7" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<rect x="158" y="32" width="10" height="8" rx="2" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<path d="M8 78 q14 -10 28 0 q14 10 28 0 q14 -10 28 0 q14 10 28 0 q14 -10 28 0 q14 10 28 0" stroke="#3B82F6" stroke-width="3" fill="none"/>' +
      '<path d="M8 94 q14 -10 28 0 q14 10 28 0 q14 -10 28 0 q14 10 28 0 q14 -10 28 0 q14 10 28 0" stroke="#3B82F6" stroke-width="3" fill="none"/>') +
      'Someone has thrown a bottle into the river. Why is that bad?',
    options:['It harms the fish','It makes it deeper','It makes it faster','It cleans the water'], answer:'It harms the fish',
    hint:'Who lives in the river?',
    explanation:'<b>It harms the fish</b> and every animal living there, and the river carries the plastic out to our lagoon. Rubbish belongs in a bin. 🐟' })

);

})();
