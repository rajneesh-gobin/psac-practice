'use strict';
// grade2-english — visual bank: pictures, colours, diagrams, syllables.
// IDs: g2eng-lis-076…091 · g2eng-spk-076…091 · g2eng-rdr-076…091
//      g2eng-wrt-076…091 · g2eng-grm-076…091 · g2eng-pho-076…091

(function () {

const CH_LIS = 'g2eng-listening';
const CH_SPK = 'g2eng-speaking';
const CH_RDR = 'g2eng-reading';
const CH_WRT = 'g2eng-writing';
const CH_GRM = 'g2eng-grammar';
const CH_PHO = 'g2eng-phonics';

// Every figure: white panel first (dark theme), no HTML tags inside the svg,
// no external refs, neutral aria-label.
const FIG = function (label, w, h, max, body) {
  return '<div style="text-align:center;margin:.5em 0" aria-label="' + label + '">' +
    '<svg viewBox="0 0 ' + w + ' ' + h + '" style="width:100%;max-width:' + max + 'px;height:auto" ' +
    'xmlns="http://www.w3.org/2000/svg" role="img">' +
    '<rect x="0" y="0" width="' + w + '" height="' + h + '" rx="8" fill="#ffffff"/>' +
    body + '</svg></div>';
};

const TXT = function (x, y, size, s, col, anchor) {
  return '<text x="' + x + '" y="' + y + '" font-family="system-ui, sans-serif" font-size="' + size +
    '" fill="' + (col || '#1f2937') + '" text-anchor="' + (anchor || 'middle') + '">' + s + '</text>';
};

const GROUND = function (w, y, h, col) {
  return '<rect x="0" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + (col || '#22C55E') + '"/>';
};

const SUN = function (x, y, r) {
  const d = [[1, 0], [0.71, 0.71], [0, 1], [-0.71, 0.71], [-1, 0], [-0.71, -0.71], [0, -1], [0.71, -0.71]];
  let s = '';
  for (let i = 0; i < 8; i++) {
    s += '<line x1="' + (x + d[i][0] * (r + 4)) + '" y1="' + (y + d[i][1] * (r + 4)) +
      '" x2="' + (x + d[i][0] * (r + 15)) + '" y2="' + (y + d[i][1] * (r + 15)) +
      '" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>';
  }
  return s + '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#FACC15" stroke="#F59E0B" stroke-width="2"/>';
};

const CLOUD = function (x, y, col) {
  const c = col || '#FFFFFF';
  return '<circle cx="' + (x - 16) + '" cy="' + y + '" r="16" fill="' + c + '" stroke="#111827" stroke-width="2"/>' +
    '<circle cx="' + (x + 2) + '" cy="' + (y - 11) + '" r="20" fill="' + c + '" stroke="#111827" stroke-width="2"/>' +
    '<circle cx="' + (x + 24) + '" cy="' + y + '" r="15" fill="' + c + '" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x - 32) + '" y="' + y + '" width="64" height="16" fill="' + c + '" stroke="' + c + '" stroke-width="1"/>' +
    '<line x1="' + (x - 32) + '" y1="' + (y + 16) + '" x2="' + (x + 32) + '" y2="' + (y + 16) +
    '" stroke="#111827" stroke-width="2"/>';
};

const RAIN = function (x, y, n) {
  let s = '';
  for (let i = 0; i < n; i++) {
    s += '<line x1="' + (x - 24 + i * 16) + '" y1="' + y + '" x2="' + (x - 30 + i * 16) + '" y2="' + (y + 18) +
      '" stroke="#3B82F6" stroke-width="4" stroke-linecap="round"/>';
  }
  return s;
};

const TREE = function (x, baseY, r, trunkH, fruits, fcol) {
  const cy = baseY - trunkH - r + 10;
  let s = '<rect x="' + (x - 8) + '" y="' + (baseY - trunkH) + '" width="16" height="' + trunkH +
    '" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
    '<circle cx="' + x + '" cy="' + cy + '" r="' + r + '" fill="#22C55E" stroke="#111827" stroke-width="2"/>';
  const p = [[-0.45, -0.3], [0.45, -0.3], [0, 0.45], [-0.5, 0.28], [0.5, 0.28],
    [0, -0.55], [-0.25, 0.02], [0.25, 0.02], [-0.68, -0.05], [0.68, -0.05]];
  for (let i = 0; i < (fruits || 0); i++) {
    s += '<circle cx="' + (x + p[i][0] * r) + '" cy="' + (cy + p[i][1] * r) +
      '" r="7" fill="' + (fcol || '#EF4444') + '" stroke="#111827" stroke-width="1.5"/>';
  }
  return s;
};

const HOUSE = function (x, baseY, wall, roof, door, nwin) {
  let s = '<rect x="' + (x - 60) + '" y="' + (baseY - 78) + '" width="120" height="78" fill="' + wall +
    '" stroke="#111827" stroke-width="3"/>' +
    '<polygon points="' + x + ',' + (baseY - 122) + ' ' + (x + 78) + ',' + (baseY - 78) + ' ' +
    (x - 78) + ',' + (baseY - 78) + '" fill="' + roof + '" stroke="#111827" stroke-width="3"/>' +
    '<rect x="' + (x - 15) + '" y="' + (baseY - 42) + '" width="30" height="42" fill="' + door +
    '" stroke="#111827" stroke-width="3"/>';
  if (nwin >= 1) s += '<rect x="' + (x - 48) + '" y="' + (baseY - 66) +
    '" width="26" height="24" fill="#3B82F6" stroke="#111827" stroke-width="3"/>';
  if (nwin >= 2) s += '<rect x="' + (x + 22) + '" y="' + (baseY - 66) +
    '" width="26" height="24" fill="#3B82F6" stroke="#111827" stroke-width="3"/>';
  return s;
};

const BOAT = function (x, waterY, sail) {
  return '<line x1="' + x + '" y1="' + (waterY - 76) + '" x2="' + x + '" y2="' + (waterY - 8) +
    '" stroke="#111827" stroke-width="3"/>' +
    '<polygon points="' + (x + 3) + ',' + (waterY - 74) + ' ' + (x + 48) + ',' + (waterY - 16) + ' ' +
    (x + 3) + ',' + (waterY - 16) + '" fill="' + (sail || '#EF4444') + '" stroke="#111827" stroke-width="2"/>' +
    '<polygon points="' + (x - 52) + ',' + (waterY - 12) + ' ' + (x + 52) + ',' + (waterY - 12) + ' ' +
    (x + 36) + ',' + (waterY + 12) + ' ' + (x - 36) + ',' + (waterY + 12) +
    '" fill="#92400E" stroke="#111827" stroke-width="3"/>';
};

const BUS = function (x, baseY, col) {
  return '<rect x="' + (x - 65) + '" y="' + (baseY - 62) + '" width="130" height="52" rx="8" fill="' + col +
    '" stroke="#111827" stroke-width="3"/>' +
    '<rect x="' + (x - 55) + '" y="' + (baseY - 54) + '" width="30" height="22" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x - 18) + '" y="' + (baseY - 54) + '" width="30" height="22" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x + 19) + '" y="' + (baseY - 54) + '" width="30" height="22" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
    '<circle cx="' + (x - 38) + '" cy="' + (baseY - 6) + '" r="12" fill="#111827"/>' +
    '<circle cx="' + (x + 38) + '" cy="' + (baseY - 6) + '" r="12" fill="#111827"/>';
};

const CUP = function (x, baseY, col) {
  return '<path d="M' + (x - 30) + ' ' + (baseY - 62) + ' L' + (x - 26) + ' ' + (baseY - 10) +
    ' Q' + (x - 24) + ' ' + baseY + ' ' + (x - 12) + ' ' + baseY + ' L' + (x + 12) + ' ' + baseY +
    ' Q' + (x + 24) + ' ' + baseY + ' ' + (x + 26) + ' ' + (baseY - 10) + ' L' + (x + 30) + ' ' + (baseY - 62) +
    ' Z" fill="' + (col || '#FFFFFF') + '" stroke="#111827" stroke-width="3"/>' +
    '<path d="M' + (x + 30) + ' ' + (baseY - 52) + ' Q' + (x + 58) + ' ' + (baseY - 46) + ' ' +
    (x + 44) + ' ' + (baseY - 24) + '" fill="none" stroke="#111827" stroke-width="4"/>';
};

const BALL = function (x, y, r, col) {
  return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + col + '" stroke="#111827" stroke-width="3"/>' +
    '<line x1="' + (x - r) + '" y1="' + y + '" x2="' + (x + r) + '" y2="' + y + '" stroke="#111827" stroke-width="2"/>';
};

const BOXOBJ = function (x, baseY, w, h, col) {
  return '<rect x="' + (x - w / 2) + '" y="' + (baseY - h) + '" width="' + w + '" height="' + h +
    '" fill="' + col + '" stroke="#111827" stroke-width="3"/>' +
    '<line x1="' + (x - w / 2) + '" y1="' + (baseY - h + h / 3) + '" x2="' + (x + w / 2) + '" y2="' + (baseY - h + h / 3) +
    '" stroke="#111827" stroke-width="2"/>';
};

const STAR = function (x, y, R, col) {
  const o = [[0, -1], [0.951, -0.309], [0.588, 0.809], [-0.588, 0.809], [-0.951, -0.309]];
  const n = [[0.588, -0.809], [0.951, 0.309], [0, 1], [-0.951, 0.309], [-0.588, -0.809]];
  const r = R * 0.42, pts = [];
  for (let k = 0; k < 5; k++) {
    pts.push((x + o[k][0] * R).toFixed(1) + ',' + (y + o[k][1] * R).toFixed(1));
    pts.push((x + n[k][0] * r).toFixed(1) + ',' + (y + n[k][1] * r).toFixed(1));
  }
  return '<polygon points="' + pts.join(' ') + '" fill="' + (col || '#FACC15') + '" stroke="#F59E0B" stroke-width="2"/>';
};

const FLAG = function (x, baseY, col) {
  return '<rect x="' + (x - 42) + '" y="' + (baseY - 100) + '" width="7" height="100" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
    '<rect x="' + (x - 35) + '" y="' + (baseY - 96) + '" width="76" height="46" fill="' + col + '" stroke="#111827" stroke-width="3"/>';
};

const KITE = function (x, y, col) {
  return '<polygon points="' + x + ',' + (y - 40) + ' ' + (x + 28) + ',' + y + ' ' + x + ',' + (y + 44) + ' ' +
    (x - 28) + ',' + y + '" fill="' + col + '" stroke="#111827" stroke-width="2.5"/>' +
    '<line x1="' + x + '" y1="' + (y - 40) + '" x2="' + x + '" y2="' + (y + 44) + '" stroke="#111827" stroke-width="1.5"/>' +
    '<line x1="' + (x - 28) + '" y1="' + y + '" x2="' + (x + 28) + '" y2="' + y + '" stroke="#111827" stroke-width="1.5"/>' +
    '<path d="M' + x + ' ' + (y + 44) + ' Q' + (x + 14) + ' ' + (y + 60) + ' ' + x + ' ' + (y + 74) +
    '" fill="none" stroke="#111827" stroke-width="2"/>';
};

const FLOWER = function (x, baseY, petal) {
  const cy = baseY - 62;
  let s = '<line x1="' + x + '" y1="' + cy + '" x2="' + x + '" y2="' + baseY + '" stroke="#22C55E" stroke-width="4"/>' +
    '<ellipse cx="' + (x + 13) + '" cy="' + (baseY - 20) + '" rx="12" ry="6" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>';
  const p = [[0, -20], [19, -6], [12, 17], [-12, 17], [-19, -6]];
  for (let k = 0; k < 5; k++) {
    s += '<circle cx="' + (x + p[k][0]) + '" cy="' + (cy + p[k][1]) + '" r="12" fill="' + petal +
      '" stroke="#111827" stroke-width="1.5"/>';
  }
  return s + '<circle cx="' + x + '" cy="' + cy + '" r="9" fill="#92400E" stroke="#111827" stroke-width="1.5"/>';
};

const BAG = function (x, baseY, col) {
  return '<path d="M' + (x - 24) + ' ' + (baseY - 76) + ' Q' + (x - 24) + ' ' + (baseY - 104) + ' ' + x + ' ' + (baseY - 104) +
    ' Q' + (x + 24) + ' ' + (baseY - 104) + ' ' + (x + 24) + ' ' + (baseY - 76) + '" fill="none" stroke="#111827" stroke-width="5"/>' +
    '<rect x="' + (x - 45) + '" y="' + (baseY - 78) + '" width="90" height="78" rx="8" fill="' + col +
    '" stroke="#111827" stroke-width="3"/>' +
    '<rect x="' + (x - 45) + '" y="' + (baseY - 44) + '" width="90" height="14" fill="#111827"/>';
};

const CARD = function (x, y, w, h, label, size) {
  return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="6" fill="#F3F4F6" stroke="#111827" stroke-width="2"/>' +
    TXT(x + w / 2, y + h / 2 + (size || 18) * 0.36, size || 18, label);
};

const BUBBLE = function (x, y, w, h, label, size) {
  return '<polygon points="' + (x + 22) + ',' + (y + h - 4) + ' ' + (x + 46) + ',' + (y + h - 4) + ' ' +
    (x + 24) + ',' + (y + h + 18) + '" fill="#FFFFFF" stroke="#111827" stroke-width="2.5"/>' +
    '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="12" fill="#FFFFFF" stroke="#111827" stroke-width="2.5"/>' +
    TXT(x + w / 2, y + h / 2 + 6, size || 16, label);
};

const ARROW = function (x, y, dir, col) {
  const c = col || '#111827';
  if (dir === 'up') {
    return '<polygon points="' + x + ',' + (y - 28) + ' ' + (x + 20) + ',' + (y - 4) + ' ' + (x + 8) + ',' + (y - 4) + ' ' +
      (x + 8) + ',' + (y + 28) + ' ' + (x - 8) + ',' + (y + 28) + ' ' + (x - 8) + ',' + (y - 4) + ' ' +
      (x - 20) + ',' + (y - 4) + '" fill="' + c + '"/>';
  }
  if (dir === 'down') {
    return '<polygon points="' + x + ',' + (y + 28) + ' ' + (x + 20) + ',' + (y + 4) + ' ' + (x + 8) + ',' + (y + 4) + ' ' +
      (x + 8) + ',' + (y - 28) + ' ' + (x - 8) + ',' + (y - 28) + ' ' + (x - 8) + ',' + (y + 4) + ' ' +
      (x - 20) + ',' + (y + 4) + '" fill="' + c + '"/>';
  }
  if (dir === 'left') {
    return '<polygon points="' + (x - 28) + ',' + y + ' ' + (x - 4) + ',' + (y - 20) + ' ' + (x - 4) + ',' + (y - 8) + ' ' +
      (x + 28) + ',' + (y - 8) + ' ' + (x + 28) + ',' + (y + 8) + ' ' + (x - 4) + ',' + (y + 8) + ' ' +
      (x - 4) + ',' + (y + 20) + '" fill="' + c + '"/>';
  }
  return '<polygon points="' + (x + 28) + ',' + y + ' ' + (x + 4) + ',' + (y - 20) + ' ' + (x + 4) + ',' + (y - 8) + ' ' +
    (x - 28) + ',' + (y - 8) + ' ' + (x - 28) + ',' + (y + 8) + ' ' + (x + 4) + ',' + (y + 8) + ' ' +
    (x + 4) + ',' + (y + 20) + '" fill="' + c + '"/>';
};

const CAP = function (x, baseY, col) {
  return '<path d="M' + (x - 34) + ' ' + baseY + ' Q' + (x - 34) + ' ' + (baseY - 46) + ' ' + x + ' ' + (baseY - 46) +
    ' Q' + (x + 34) + ' ' + (baseY - 46) + ' ' + (x + 34) + ' ' + baseY + ' Z" fill="' + col +
    '" stroke="#111827" stroke-width="3"/>' +
    '<path d="M' + (x + 30) + ' ' + baseY + ' L' + (x + 66) + ' ' + (baseY - 2) + ' Q' + (x + 70) + ' ' + (baseY + 8) + ' ' +
    (x + 30) + ' ' + (baseY + 8) + ' Z" fill="' + col + '" stroke="#111827" stroke-width="3"/>';
};

const CANDLE = function (x, baseY, h, lit) {
  const top = baseY - h;
  let s = '<rect x="' + (x - 13) + '" y="' + top + '" width="26" height="' + h +
    '" fill="#FACC15" stroke="#111827" stroke-width="2.5"/>' +
    '<line x1="' + x + '" y1="' + top + '" x2="' + x + '" y2="' + (top - 8) + '" stroke="#111827" stroke-width="2"/>';
  if (lit) s += '<ellipse cx="' + x + '" cy="' + (top - 16) + '" rx="7" ry="12" fill="#F97316" stroke="#EF4444" stroke-width="2"/>';
  return s;
};

STATIC_QUESTIONS.push(

  // ══ LISTENING ══════════════════════════════════════════════════════════════
  // ── sound_discrimination (076–081) ────────────────────────────────────────

  makeMCQ({ id:'g2eng-lis-076', chapterId:CH_LIS, difficulty:1, subsection:'sound_discrimination',
    question:
      FIG('a round toy', 180, 130, 160, BALL(90, 68, 46, '#EF4444')) +
      'This is a <b>ball</b>. Which sound do you hear at the <b>start</b> of “ball”?',
    options:['/b/','/p/','/d/','/g/'], answer:'/b/',
    hint:'Say the word slowly: b‑a‑ll. Listen only to the first little sound.',
    explanation:'“Ball” starts with <b>/b/</b>. Your lips press together, then pop open. /p/ is close, but /p/ has no voice in your throat.' }),

  makeMCQ({ id:'g2eng-lis-077', chapterId:CH_LIS, difficulty:1, subsection:'sound_discrimination',
    question:
      FIG('a drinking vessel', 190, 130, 165, CUP(85, 108, '#FFFFFF')) +
      'This is a <b>cup</b>. Which sound do you hear at the <b>end</b> of “cup”?',
    options:['/p/','/k/','/t/','/m/'], answer:'/p/',
    hint:'Say “cup” and stop at the very last sound. What are your lips doing?',
    explanation:'“Cup” ends with <b>/p/</b>. /k/ is the sound at the beginning, not the end. 🫖' }),

  makeMCQ({ id:'g2eng-lis-078', chapterId:CH_LIS, difficulty:2, subsection:'sound_discrimination',
    question:
      FIG('four small pictures in a row, labelled A to D', 320, 140, 330,
        BAG(45, 108, '#A855F7') + TXT(45, 132, 15, 'A') +
        SUN(125, 66, 26) + TXT(125, 132, 15, 'B') +
        BALL(205, 76, 32, '#EF4444') + TXT(205, 132, 15, 'C') +
        TREE(280, 112, 26, 30, 0) + TXT(280, 132, 15, 'D')) +
      'A is a bag, B is the sun, C is a ball, D is a tree. Which <b>two</b> words begin with the same sound?',
    options:['A and C','A and B','B and C','C and D'], answer:'A and C',
    hint:'Say each word out loud and listen only to the first sound.',
    explanation:'<b>Bag</b> and <b>ball</b> both begin with /b/. Sun begins with /s/ and tree begins with /t/.' }),

  makeMCQ({ id:'g2eng-lis-079', chapterId:CH_LIS, difficulty:1, subsection:'sound_discrimination',
    question:
      FIG('a shape with five points', 160, 140, 150, STAR(80, 70, 55, '#FACC15')) +
      'This is a <b>star</b>. Which word <b>rhymes</b> with “star”?',
    options:['car','cat','sit','sun'], answer:'car',
    hint:'Rhyming words end with the same sound. Say them all after “star”.',
    explanation:'<b>Car</b> rhymes with star — both end in the same /ar/ sound. Cat, sit and sun end differently. 🚗' }),

  makeMCQ({ id:'g2eng-lis-080', chapterId:CH_LIS, difficulty:1, subsection:'sound_discrimination',
    question:
      FIG('a bright object in the sky', 170, 140, 150, SUN(85, 70, 34)) +
      'The picture shows the <b>sun</b>. Which word does <b>not</b> rhyme with “sun”?',
    options:['hat','bun','fun','run'], answer:'hat',
    hint:'Three words end the same way. One does not belong.',
    explanation:'<b>Hat</b> does not rhyme with sun. Bun, fun and run all end with the /un/ sound.' }),

  makeMCQ({ id:'g2eng-lis-081', chapterId:CH_LIS, difficulty:2, subsection:'sound_discrimination',
    question:
      FIG('two small pictures labelled A and B', 260, 140, 280,
        CAP(70, 80, '#3B82F6') + TXT(70, 128, 15, 'A') +
        CUP(180, 100, '#FFFFFF') + TXT(180, 128, 15, 'B')) +
      'You hear the sounds /k/ /a/ /p/. Which picture is it?',
    options:['picture A','picture B','both pictures','no picture'], answer:'picture A',
    hint:'Blend the three sounds together slowly, then look at both pictures.',
    explanation:'/k/ /a/ /p/ makes <b>cap</b> — picture A. Picture B is a cup, which has /u/ in the middle, not /a/. 🧢' }),

  // ── story_listening (082–086) ─────────────────────────────────────────────

  makeMCQ({ id:'g2eng-lis-082', chapterId:CH_LIS, difficulty:1, subsection:'story_listening',
    question:
      FIG('three small pictures labelled A, B and C', 300, 140, 320,
        GROUND(300, 112, 12, '#92400E') +
        '<circle cx="50" cy="104" r="8" fill="#92400E" stroke="#111827" stroke-width="2"/>' + TXT(50, 134, 15, 'A') +
        CLOUD(150, 40, '#9CA3AF') + RAIN(150, 60, 4) + TXT(150, 134, 15, 'B') +
        TREE(250, 112, 24, 28, 0) + TXT(250, 134, 15, 'C')) +
      'Ravi planted a seed. Then it rained. A small tree grew. Which order tells the story?',
    options:['A, B, C','C, B, A','B, A, C','A, C, B'], answer:'A, B, C',
    hint:'What did Ravi do first of all? What came right after that?',
    explanation:'First the seed (A), then the rain (B), and last the tree (C) — <b>A, B, C</b>. 🌱' }),

  makeMCQ({ id:'g2eng-lis-083', chapterId:CH_LIS, difficulty:1, subsection:'story_listening',
    question:
      FIG('three weather pictures in a row', 300, 130, 320,
        CLOUD(55, 55, '#9CA3AF') + TXT(55, 120, 15, 'A') +
        CLOUD(150, 45, '#9CA3AF') + RAIN(150, 65, 4) + TXT(150, 120, 15, 'B') +
        SUN(248, 55, 24) + TXT(248, 120, 15, 'C')) +
      'It was cloudy. Then rain fell all morning. Later the sun came out. What happened <b>last</b>?',
    options:['The sun came out.','The rain fell.','It was cloudy.','The wind blew.'], answer:'The sun came out.',
    hint:'“Later” tells you which part of the story came at the end.',
    explanation:'The story ends with <b>the sun coming out</b>. Cloudy came first, then the rain. ☀️' }),

  makeMCQ({ id:'g2eng-lis-084', chapterId:CH_LIS, difficulty:1, subsection:'story_listening',
    question:
      FIG('a large vehicle', 220, 130, 210, GROUND(220, 118, 12, '#9CA3AF') + BUS(110, 118, '#3B82F6')) +
      'Anil waited at the stop. A big blue bus came. He got on and went to school. What did Anil get on?',
    options:['the blue bus','the red car','the small boat','the green bike'], answer:'the blue bus',
    hint:'Listen again for the words that come just before “came”.',
    explanation:'The story says a <b>big blue bus</b> came, and Anil got on it. 🚌' }),

  makeMCQ({ id:'g2eng-lis-085', chapterId:CH_LIS, difficulty:1, subsection:'story_listening',
    question:
      FIG('a toy above a plant', 220, 170, 200,
        GROUND(220, 158, 12) + TREE(150, 158, 34, 40, 0) + KITE(70, 55, '#EF4444')) +
      'Mira flew her red kite. The wind took it into a tree. Papa got it down for her. Where did the kite go?',
    options:['into a tree','onto the roof','into the sea','under the bed'], answer:'into a tree',
    hint:'What did the wind do with the kite?',
    explanation:'The wind took the kite <b>into a tree</b>, and Papa got it down. 🪁' }),

  makeMCQ({ id:'g2eng-lis-086', chapterId:CH_LIS, difficulty:2, subsection:'story_listening',
    question:
      FIG('four toys of different colours, labelled A to D', 320, 170, 330,
        KITE(45, 60, '#3B82F6') + TXT(45, 160, 15, 'A') +
        KITE(125, 60, '#EF4444') + TXT(125, 160, 15, 'B') +
        KITE(205, 60, '#22C55E') + TXT(205, 160, 15, 'C') +
        KITE(280, 60, '#FACC15') + TXT(280, 160, 15, 'D')) +
      'Mira told us her kite is <b>red</b>. Which kite is hers?',
    options:['kite B','kite A','kite C','kite D'], answer:'kite B',
    hint:'Listen for the colour word in the story, then find that colour.',
    explanation:'Mira said her kite is red, so it is <b>kite B</b>. A is blue, C is green and D is yellow.' }),

  // ── instruction_following (087–091) ───────────────────────────────────────

  makeMCQ({ id:'g2eng-lis-087', chapterId:CH_LIS, difficulty:1, subsection:'instruction_following',
    question:
      FIG('four boxes in a row, each holding a shape', 320, 120, 330,
        '<rect x="12" y="14" width="60" height="60" rx="6" fill="#F3F4F6" stroke="#111827" stroke-width="2"/>' +
        STAR(42, 44, 22, '#FACC15') + TXT(42, 100, 15, 'A') +
        '<rect x="92" y="14" width="60" height="60" rx="6" fill="#F3F4F6" stroke="#111827" stroke-width="2"/>' +
        '<circle cx="122" cy="44" r="22" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' + TXT(122, 100, 15, 'B') +
        '<rect x="172" y="14" width="60" height="60" rx="6" fill="#F3F4F6" stroke="#111827" stroke-width="2"/>' +
        '<rect x="182" y="24" width="40" height="40" fill="#22C55E" stroke="#111827" stroke-width="2"/>' + TXT(202, 100, 15, 'C') +
        '<rect x="252" y="14" width="60" height="60" rx="6" fill="#F3F4F6" stroke="#111827" stroke-width="2"/>' +
        '<polygon points="282,22 304,64 260,64" fill="#EF4444" stroke="#111827" stroke-width="2"/>' + TXT(282, 100, 15, 'D')) +
      'Tick the box with the <b>star</b> in it. Which box do you tick?',
    options:['box A','box B','box C','box D'], answer:'box A',
    hint:'A star has five points. Look at each box before you choose.',
    explanation:'The star is in <b>box A</b>. B holds a circle, C a square and D a triangle. ⭐' }),

  makeMCQ({ id:'g2eng-lis-088', chapterId:CH_LIS, difficulty:1, subsection:'instruction_following',
    question:
      FIG('four arrows pointing different ways, labelled A to D', 320, 120, 330,
        ARROW(45, 45, 'right', '#3B82F6') + TXT(45, 100, 15, 'A') +
        ARROW(125, 45, 'up', '#3B82F6') + TXT(125, 100, 15, 'B') +
        ARROW(205, 45, 'left', '#3B82F6') + TXT(205, 100, 15, 'C') +
        ARROW(282, 45, 'down', '#3B82F6') + TXT(282, 100, 15, 'D')) +
      'Follow the arrow that points <b>up</b>. Which arrow is it?',
    options:['arrow A','arrow B','arrow C','arrow D'], answer:'arrow B',
    hint:'“Up” means towards the top of the page — towards the sky.',
    explanation:'<b>Arrow B</b> points up. A points right, C points left and D points down. ⬆️' }),

  makeMCQ({ id:'g2eng-lis-089', chapterId:CH_LIS, difficulty:2, subsection:'instruction_following',
    question:
      FIG('a row of four shapes', 300, 100, 310,
        '<circle cx="45" cy="45" r="26" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
        '<rect x="98" y="19" width="52" height="52" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
        '<polygon points="205,17 233,71 177,71" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
        STAR(268, 45, 27, '#EF4444')) +
      'Colour the <b>third</b> shape in the row. Which shape do you colour?',
    options:['the triangle','the square','the circle','the star'], answer:'the triangle',
    hint:'Count from the left: first, second, third…',
    explanation:'Counting from the left, the third shape is <b>the triangle</b>. The star is fourth.' }),

  makeMCQ({ id:'g2eng-lis-090', chapterId:CH_LIS, difficulty:1, subsection:'instruction_following',
    question:
      FIG('two numbered pictures showing steps', 280, 140, 280,
        TXT(70, 26, 16, '1') +
        '<rect x="52" y="40" width="14" height="34" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
        '<rect x="52" y="34" width="44" height="12" rx="4" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
        '<ellipse cx="90" cy="84" rx="7" ry="10" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
        '<ellipse cx="90" cy="112" rx="7" ry="10" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
        TXT(200, 26, 16, '2') +
        '<ellipse cx="200" cy="86" rx="52" ry="20" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
        '<ellipse cx="200" cy="86" rx="30" ry="11" fill="#FACC15" stroke="#111827" stroke-width="2"/>') +
      'Wash your hands, then eat your food. What do you do <b>first</b>?',
    options:['wash my hands','eat my food','wash the plate','dry the plate'], answer:'wash my hands',
    hint:'The word “then” tells you which thing comes second.',
    explanation:'You <b>wash your hands</b> first — “then” means eating comes after. 🚰' }),

  makeMCQ({ id:'g2eng-lis-091', chapterId:CH_LIS, difficulty:2, subsection:'instruction_following',
    question:
      FIG('four empty boxes arranged in two rows', 260, 160, 250,
        '<rect x="40" y="18" width="72" height="56" rx="6" fill="#F3F4F6" stroke="#111827" stroke-width="2"/>' + TXT(76, 53, 20, 'A') +
        '<rect x="140" y="18" width="72" height="56" rx="6" fill="#F3F4F6" stroke="#111827" stroke-width="2"/>' + TXT(176, 53, 20, 'B') +
        '<rect x="40" y="90" width="72" height="56" rx="6" fill="#F3F4F6" stroke="#111827" stroke-width="2"/>' + TXT(76, 125, 20, 'C') +
        '<rect x="140" y="90" width="72" height="56" rx="6" fill="#F3F4F6" stroke="#111827" stroke-width="2"/>' + TXT(176, 125, 20, 'D')) +
      'Put a cross in the box at the <b>top right</b>. Which box is it?',
    options:['box A','box B','box C','box D'], answer:'box B',
    hint:'Top means the row above. Right means the side of the hand you write with (for most of us).',
    explanation:'The top row holds A and B. The one on the right is <b>box B</b>. ✅' }),

  // ══ SPEAKING ═══════════════════════════════════════════════════════════════
  // ── retelling (076–080) ───────────────────────────────────────────────────

  makeMCQ({ id:'g2eng-spk-076', chapterId:CH_SPK, difficulty:1, subsection:'retelling',
    question:
      FIG('four pictures of the same object at different times', 320, 150, 330,
        CANDLE(45, 122, 86, true) + TXT(45, 142, 15, 'A') +
        CANDLE(125, 122, 62, true) + TXT(125, 142, 15, 'B') +
        CANDLE(205, 122, 38, true) + TXT(205, 142, 15, 'C') +
        CANDLE(282, 122, 22, false) + TXT(282, 142, 15, 'D')) +
      'A candle burned all evening and then went out. Which picture comes <b>first</b> in the story?',
    options:['picture A','picture B','picture C','picture D'], answer:'picture A',
    hint:'A candle gets shorter as it burns. Which one has burned the least?',
    explanation:'<b>Picture A</b> is the tallest candle, so it comes first. D has gone out, so it comes last. 🕯️' }),

  makeMCQ({ id:'g2eng-spk-077', chapterId:CH_SPK, difficulty:1, subsection:'retelling',
    question:
      FIG('three numbered boxes joined by arrows', 316, 110, 320,
        CARD(10, 24, 76, 50, '1', 20) + ARROW(103, 49, 'right', '#9CA3AF') +
        CARD(120, 24, 76, 50, '2', 20) + ARROW(213, 49, 'right', '#9CA3AF') +
        CARD(230, 24, 76, 50, '3', 20)) +
      'You are retelling a story in order. Which word do you say at the <b>beginning</b>?',
    options:['First','Then','Next','Last'], answer:'First',
    hint:'Which word means “before everything else”?',
    explanation:'We start a retelling with <b>First</b>. Then and Next join the middle, and Last ends it.' }),

  makeMCQ({ id:'g2eng-spk-078', chapterId:CH_SPK, difficulty:2, subsection:'retelling',
    question:
      FIG('a drawn scene on water', 260, 160, 250,
        '<rect x="0" y="120" width="260" height="40" fill="#3B82F6"/>' +
        CLOUD(150, 34, '#9CA3AF') + RAIN(150, 54, 4) + BOAT(110, 124, '#EF4444')) +
      'A boat went out to sea. Rain came down. The boat came back home. Which sentence retells this best?',
    options:['A boat sailed in the rain.','A bus drove in the rain.','A boat sank in the sea.','A boy swam in the rain.'],
    answer:'A boat sailed in the rain.',
    hint:'A good retelling keeps the same thing and the same weather.',
    explanation:'<b>A boat sailed in the rain.</b> The boat did not sink — it came back home. ⛵' }),

  makeMCQ({ id:'g2eng-spk-079', chapterId:CH_SPK, difficulty:1, subsection:'retelling',
    question:
      FIG('a plant with fruit on it and a container beside it', 240, 180, 230,
        GROUND(240, 168, 12) + TREE(110, 168, 46, 52, 10, '#EF4444') +
        '<path d="M196 138 L232 138 L226 166 L202 166 Z" fill="#92400E" stroke="#111827" stroke-width="2.5"/>') +
      'Papa picked ten litchis. He gave four to me. When you retell it, how many litchis did Papa pick?',
    options:['ten litchis','four litchis','six litchis','two litchis'], answer:'ten litchis',
    hint:'The question asks how many he <b>picked</b>, not how many he gave away.',
    explanation:'Papa picked <b>ten litchis</b>. He gave four away, but he still picked ten. 🍒' }),

  makeMCQ({ id:'g2eng-spk-080', chapterId:CH_SPK, difficulty:2, subsection:'retelling',
    question:
      FIG('three boxes joined by arrows, the middle one empty', 320, 110, 330,
        CARD(8, 26, 86, 50, 'First', 18) + ARROW(112, 51, 'right', '#9CA3AF') +
        CARD(130, 26, 60, 50, '?', 22) + ARROW(208, 51, 'right', '#9CA3AF') +
        CARD(226, 26, 86, 50, 'Last', 18)) +
      'Which word belongs in the <b>middle</b> box when you retell a story?',
    options:['Next','First','Last','Stop'], answer:'Next',
    hint:'The word must join the beginning to the ending.',
    explanation:'<b>Next</b> goes in the middle: First… Next… Last. “Stop” is not a retelling word.' }),

  // ── describing_pictures (081–086) ─────────────────────────────────────────

  makeMCQ({ id:'g2eng-spk-081', chapterId:CH_SPK, difficulty:1, subsection:'describing_pictures',
    question:
      FIG('a drawing of a building', 200, 150, 200, GROUND(200, 140, 10) + HOUSE(100, 140, '#FACC15', '#EF4444', '#92400E', 2)) +
      'Look at the picture. How many <b>windows</b> does the house have?',
    options:['two','one','three','four'], answer:'two',
    hint:'The windows are the small blue squares. Point at each one as you count.',
    explanation:'The house has <b>two</b> windows, one on each side of the door. 🏠' }),

  makeMCQ({ id:'g2eng-spk-082', chapterId:CH_SPK, difficulty:1, subsection:'describing_pictures',
    question:
      FIG('a drawing of a building', 200, 150, 200, GROUND(200, 140, 10) + HOUSE(100, 140, '#FFFFFF', '#92400E', '#22C55E', 1)) +
      'What colour is the <b>door</b> of this house?',
    options:['green','red','blue','yellow'], answer:'green',
    hint:'The door is the tall rectangle you walk through — not the window.',
    explanation:'The door is <b>green</b>. The window is blue and the roof is brown.' }),

  makeMCQ({ id:'g2eng-spk-083', chapterId:CH_SPK, difficulty:1, subsection:'describing_pictures',
    question:
      FIG('a drawn scene', 260, 170, 260,
        '<rect x="0" y="126" width="260" height="44" fill="#3B82F6"/>' + SUN(212, 40, 24) + BOAT(105, 130, '#EF4444')) +
      'Which sentence describes this picture best?',
    options:['A boat is on the sea.','A bus is on the road.','A boat is in a tree.','A cup is on a plate.'],
    answer:'A boat is on the sea.',
    hint:'Name the thing you see, then say where it is.',
    explanation:'<b>A boat is on the sea.</b> The blue part is the sea and the yellow circle is the sun. ⛵' }),

  makeMCQ({ id:'g2eng-spk-084', chapterId:CH_SPK, difficulty:1, subsection:'describing_pictures',
    question:
      FIG('a drawing of furniture with objects', 260, 170, 250,
        CUP(70, 96, '#FFFFFF') +
        '<ellipse cx="168" cy="92" rx="42" ry="12" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
        '<rect x="20" y="98" width="220" height="12" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
        '<rect x="34" y="110" width="12" height="52" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
        '<rect x="214" y="110" width="12" height="52" fill="#92400E" stroke="#111827" stroke-width="2"/>') +
      'A cup and a plate are in the picture. <b>Where</b> is the cup?',
    options:['on the table','under the table','in the bag','on the roof'], answer:'on the table',
    hint:'Words like on, under and in tell us where something is.',
    explanation:'The cup is <b>on the table</b>, next to the plate. Nothing is under the table. ☕' }),

  makeMCQ({ id:'g2eng-spk-085', chapterId:CH_SPK, difficulty:1, subsection:'describing_pictures',
    question:
      FIG('a plant with fruit on it', 200, 180, 190, GROUND(200, 170, 10) + TREE(100, 170, 46, 52, 3, '#EF4444')) +
      'How many <b>fruits</b> can you count on the tree?',
    options:['three','two','four','five'], answer:'three',
    hint:'Touch each red circle once as you count it.',
    explanation:'There are <b>three</b> fruits on the tree. 🍎' }),

  makeMCQ({ id:'g2eng-spk-086', chapterId:CH_SPK, difficulty:2, subsection:'describing_pictures',
    question:
      FIG('three plants in a row', 260, 170, 260,
        GROUND(260, 160, 10) + FLOWER(55, 160, '#EF4444') + FLOWER(130, 160, '#FACC15') + FLOWER(205, 160, '#A855F7')) +
      'Three flowers are growing. Which one is in the <b>middle</b>?',
    options:['the yellow one','the red one','the purple one','the green one'], answer:'the yellow one',
    hint:'The middle one has a flower on each side of it.',
    explanation:'The middle flower is <b>the yellow one</b>. Red is on the left and purple is on the right. 🌼' }),

  // ── conversation (087–091) ────────────────────────────────────────────────

  makeMCQ({ id:'g2eng-spk-087', chapterId:CH_SPK, difficulty:1, subsection:'conversation',
    question:
      FIG('a wrapped parcel', 200, 150, 180,
        '<rect x="48" y="52" width="104" height="80" rx="6" fill="#EC4899" stroke="#111827" stroke-width="3"/>' +
        '<rect x="92" y="52" width="16" height="80" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
        '<rect x="48" y="82" width="104" height="16" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
        '<circle cx="86" cy="46" r="12" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
        '<circle cx="114" cy="46" r="12" fill="#FACC15" stroke="#111827" stroke-width="2"/>') +
      'Your aunt gives you this gift. What do you say to her?',
    options:['Thank you.','Good night.','Excuse me.','I am sorry.'], answer:'Thank you.',
    hint:'What do we say when somebody gives us something?',
    explanation:'We say <b>Thank you.</b> when we are given a gift. 🎁' }),

  makeMCQ({ id:'g2eng-spk-088', chapterId:CH_SPK, difficulty:2, subsection:'conversation',
    question:
      FIG('two speech bubbles labelled A and B', 300, 170, 300,
        BUBBLE(20, 14, 160, 46, 'Where is my bag?', 15) + TXT(100, 96, 15, 'A') +
        BUBBLE(20, 106, 160, 46, 'I have my bag.', 15) + TXT(100, 166, 15, 'B')) +
      'One person is asking something. Which bubble is a <b>question</b>?',
    options:['bubble A','bubble B','both bubbles','no bubble'], answer:'bubble A',
    hint:'Look at the mark at the end of each sentence.',
    explanation:'<b>Bubble A</b> ends with a question mark, so it is asking something. Bubble B just tells us a fact.' }),

  makeMCQ({ id:'g2eng-spk-089', chapterId:CH_SPK, difficulty:1, subsection:'conversation',
    question:
      FIG('a shop counter with an item and a price label', 260, 150, 250,
        '<rect x="20" y="96" width="220" height="14" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
        '<rect x="30" y="110" width="200" height="34" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
        '<rect x="52" y="52" width="94" height="44" rx="18" fill="#F97316" stroke="#111827" stroke-width="3"/>' +
        '<rect x="164" y="46" width="74" height="40" rx="6" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        TXT(201, 72, 17, 'Rs 20')) +
      'You want to buy this bread at the shop. What do you say?',
    options:['May I have bread, please?','Give me that bread now!','I do not want any bread.','This bread looks very old.'],
    answer:'May I have bread, please?',
    hint:'Being polite means asking, and using the word “please”.',
    explanation:'<b>May I have bread, please?</b> is polite. Telling the shopkeeper what to do is not polite. 🥖' }),

  makeMCQ({ id:'g2eng-spk-090', chapterId:CH_SPK, difficulty:1, subsection:'conversation',
    question:
      FIG('a roadside sign and a clock face', 260, 160, 250,
        '<rect x="46" y="46" width="14" height="104" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
        '<rect x="14" y="26" width="80" height="34" rx="5" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
        TXT(54, 50, 17, 'BUS', '#FFFFFF') +
        '<circle cx="182" cy="86" r="48" fill="#FFFFFF" stroke="#111827" stroke-width="4"/>' +
        '<line x1="182" y1="86" x2="182" y2="50" stroke="#111827" stroke-width="4"/>' +
        '<line x1="182" y1="86" x2="154" y2="110" stroke="#111827" stroke-width="4"/>' +
        '<circle cx="182" cy="86" r="4" fill="#111827"/>') +
      'You are at the bus stop and you do not know the time of the bus. What do you <b>ask</b>?',
    options:['When does the bus come?','The bus is very late.','I like the blue bus.','My bus stop is here.'],
    answer:'When does the bus come?',
    hint:'A question asks for something you do not know.',
    explanation:'<b>When does the bus come?</b> is a question about the time. The others only tell, they do not ask. 🚏' }),

  makeMCQ({ id:'g2eng-spk-091', chapterId:CH_SPK, difficulty:2, subsection:'conversation',
    question:
      FIG('two labelled boxes joined by arrows', 300, 140, 300,
        CARD(14, 40, 100, 52, 'You', 18) +
        ARROW(150, 30, 'right', '#22C55E') + ARROW(150, 104, 'left', '#22C55E') +
        CARD(186, 40, 100, 52, 'Friend', 18)) +
      'A good conversation goes both ways. What do you do while your friend is talking?',
    options:['listen quietly','talk louder','walk away','sing a song'], answer:'listen quietly',
    hint:'Only one person should speak at a time.',
    explanation:'We <b>listen quietly</b> and wait for our turn. That is how both arrows keep going. 👂' }),

  // ══ READING ════════════════════════════════════════════════════════════════
  // ── phonics_decoding (076–080) ────────────────────────────────────────────

  makeMCQ({ id:'g2eng-rdr-076', chapterId:CH_RDR, difficulty:1, subsection:'phonics_decoding',
    question:
      FIG('a bright object in the sky', 170, 140, 150, SUN(85, 70, 34)) +
      'Blend these sounds together: /s/ /u/ /n/. Which word do they make?',
    options:['sun','sit','sad','saw'], answer:'sun',
    hint:'Say the three sounds slowly, then faster, until they join up.',
    explanation:'/s/ /u/ /n/ blends into <b>sun</b> — and that is what the picture shows. ☀️' }),

  makeMCQ({ id:'g2eng-rdr-077', chapterId:CH_RDR, difficulty:1, subsection:'phonics_decoding',
    question:
      FIG('a simple drawing above three letter boxes', 220, 180, 210,
        BOXOBJ(110, 86, 92, 62, '#92400E') +
        CARD(34, 106, 48, 52, 'b', 26) + CARD(86, 106, 48, 52, ' ', 26) + CARD(138, 106, 48, 52, 'x', 26)) +
      'The picture shows a box. Which letter is missing from the middle card?',
    options:['o','a','e','i'], answer:'o',
    hint:'Say “box” slowly and listen to the sound in the middle.',
    explanation:'The middle sound in <b>box</b> is /o/, so the missing letter is <b>o</b>: b‑o‑x. 📦' }),

  makeMCQ({ id:'g2eng-rdr-078', chapterId:CH_RDR, difficulty:1, subsection:'phonics_decoding',
    question:
      FIG('a simple drawing', 170, 190, 160, KITE(85, 70, '#A855F7')) +
      'Which word matches the picture?',
    options:['kite','kit','king','kick'], answer:'kite',
    hint:'All four words start the same way. Read to the end of each one.',
    explanation:'The picture is a <b>kite</b>. The letter e at the end makes the i say its name: k‑i‑te. 🪁' }),

  makeMCQ({ id:'g2eng-rdr-079', chapterId:CH_RDR, difficulty:2, subsection:'phonics_decoding',
    question:
      FIG('a simple drawing', 170, 160, 160,
        '<path d="M18 74 A62 62 0 0 1 142 74 Z" fill="#EF4444" stroke="#111827" stroke-width="3"/>' +
        '<line x1="80" y1="74" x2="80" y2="126" stroke="#111827" stroke-width="4"/>' +
        '<path d="M80 126 Q80 140 66 140 Q54 140 54 130" fill="none" stroke="#111827" stroke-width="4"/>') +
      'This is an <b>umbrella</b>. How many syllables (claps) does the word have?',
    options:['three','two','four','one'], answer:'three',
    hint:'Clap once for each beat: um‑brel‑la.',
    explanation:'“Umbrella” has <b>three</b> beats: um‑brel‑la. ☂️' }),

  makeMCQ({ id:'g2eng-rdr-080', chapterId:CH_RDR, difficulty:1, subsection:'phonics_decoding',
    question:
      FIG('a simple drawing', 190, 160, 170, GROUND(190, 150, 10) + FLAG(105, 150, '#22C55E')) +
      'Which two letters make the <b>first</b> sound of this word?',
    options:['fl','fr','bl','gl'], answer:'fl',
    hint:'Say the word and listen to the two sounds that slide together at the start.',
    explanation:'A <b>flag</b> starts with <b>fl</b> — you hear /f/ and /l/ join together. 🚩' }),

  // ── sight_words (081–085) ─────────────────────────────────────────────────

  makeMCQ({ id:'g2eng-rdr-081', chapterId:CH_RDR, difficulty:1, subsection:'sight_words',
    question:
      FIG('a large vehicle on a road', 220, 130, 200, GROUND(220, 118, 12, '#9CA3AF') + BUS(110, 118, '#EF4444')) +
      'Look! ______ is the bus.',
    options:['There','Their','They','These'], answer:'There',
    hint:'We use this word to point at something: “______ it is!”',
    explanation:'<b>There</b> is the bus. We use “there” to point at a place or a thing. 🚌' }),

  makeMCQ({ id:'g2eng-rdr-082', chapterId:CH_RDR, difficulty:1, subsection:'sight_words',
    question:
      FIG('three round objects on strings', 200, 170, 180,
        '<line x1="50" y1="86" x2="52" y2="160" stroke="#111827" stroke-width="2"/>' +
        '<line x1="100" y1="76" x2="100" y2="160" stroke="#111827" stroke-width="2"/>' +
        '<line x1="150" y1="86" x2="148" y2="160" stroke="#111827" stroke-width="2"/>' +
        '<ellipse cx="50" cy="58" rx="26" ry="30" fill="#EF4444" stroke="#111827" stroke-width="2.5"/>' +
        '<ellipse cx="100" cy="48" rx="26" ry="30" fill="#3B82F6" stroke="#111827" stroke-width="2.5"/>' +
        '<ellipse cx="150" cy="58" rx="26" ry="30" fill="#22C55E" stroke="#111827" stroke-width="2.5"/>') +
      'I ______ three balloons.',
    options:['have','has','had','having'], answer:'have',
    hint:'We say “I have”, not “I has”.',
    explanation:'<b>I have</b> three balloons. “Has” goes with he, she or it. 🎈' }),

  makeMCQ({ id:'g2eng-rdr-083', chapterId:CH_RDR, difficulty:1, subsection:'sight_words',
    question:
      FIG('an empty speech bubble', 220, 120, 200,
        BUBBLE(20, 16, 180, 60, '. . .', 22)) +
      'Mum ______, “Come here, please.”',
    options:['said','say','says','saying'], answer:'said',
    hint:'This already happened, so we need the past word.',
    explanation:'<b>Said</b> is the past of “say”. It is a word to know by sight — we do not sound it out. 💬' }),

  makeMCQ({ id:'g2eng-rdr-084', chapterId:CH_RDR, difficulty:1, subsection:'sight_words',
    question:
      FIG('a simple drawing', 200, 140, 180,
        '<rect x="46" y="34" width="108" height="80" rx="4" fill="#3B82F6" stroke="#111827" stroke-width="3"/>' +
        '<rect x="140" y="38" width="14" height="72" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        '<line x1="66" y1="34" x2="66" y2="114" stroke="#111827" stroke-width="2"/>') +
      'Come and ______ my new book!',
    options:['see','saw','seen','sees'], answer:'see',
    hint:'After the word “and” we use the plain word, with no ending.',
    explanation:'Come and <b>see</b> my new book. “Saw” is for yesterday. 📘' }),

  makeMCQ({ id:'g2eng-rdr-085', chapterId:CH_RDR, difficulty:2, subsection:'sight_words',
    question:
      FIG('four word cards labelled A to D', 320, 110, 330,
        CARD(8, 14, 68, 48, 'saide', 18) + TXT(42, 92, 15, 'A') +
        CARD(88, 14, 68, 48, 'said', 18) + TXT(122, 92, 15, 'B') +
        CARD(168, 14, 68, 48, 'sed', 18) + TXT(202, 92, 15, 'C') +
        CARD(248, 14, 68, 48, 'sayd', 18) + TXT(282, 92, 15, 'D')) +
      'All four cards sound the same. Which card shows the word spelled <b>correctly</b>?',
    options:['card A','card B','card C','card D'], answer:'card B',
    hint:'This is a word you learn by sight. Picture how it looks in your reading book.',
    explanation:'The correct spelling is on <b>card B</b>: s‑a‑i‑d. It does not follow the sounds, so we remember it by sight.' }),

  // ── reading_comprehension (086–091) ───────────────────────────────────────

  makeMCQ({ id:'g2eng-rdr-086', chapterId:CH_RDR, difficulty:1, subsection:'reading_comprehension',
    question:
      FIG('a roadside sign with two boards', 220, 170, 220,
        '<rect x="104" y="40" width="12" height="126" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
        '<rect x="20" y="34" width="170" height="38" rx="5" fill="#FFFFFF" stroke="#111827" stroke-width="2.5"/>' +
        TXT(105, 59, 17, 'Beach 3 km') +
        '<rect x="20" y="84" width="170" height="38" rx="5" fill="#FFFFFF" stroke="#111827" stroke-width="2.5"/>' +
        TXT(105, 109, 17, 'Market 5 km')) +
      'Anil is standing at this sign. He wants to walk to the place that is <b>nearer</b>. Which place is nearer?',
    options:['the beach','the market','the school','the shop'], answer:'the beach',
    hint:'A smaller number of kilometres means a shorter walk.',
    explanation:'The beach is 3 km away and the market is 5 km away, so <b>the beach</b> is nearer. 🏖️' }),

  makeMCQ({ id:'g2eng-rdr-087', chapterId:CH_RDR, difficulty:2, subsection:'reading_comprehension',
    question:
      FIG('two price labels', 280, 110, 280,
        '<rect x="15" y="30" width="112" height="50" rx="8" fill="#FACC15" stroke="#111827" stroke-width="2.5"/>' +
        '<circle cx="30" cy="42" r="5" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        TXT(75, 62, 16, 'Mango Rs 15') +
        '<rect x="153" y="30" width="112" height="50" rx="8" fill="#22C55E" stroke="#111827" stroke-width="2.5"/>' +
        '<circle cx="168" cy="42" r="5" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        TXT(213, 62, 16, 'Litchi Rs 10')) +
      'Sara buys one mango and one litchi at the market. How much does she pay in all?',
    options:['Rs 25','Rs 20','Rs 15','Rs 5'], answer:'Rs 25',
    hint:'Read both labels, then add the two prices together.',
    explanation:'Rs 15 + Rs 10 = <b>Rs 25</b>. Reading a price label is real reading! 🥭' }),

  makeMCQ({ id:'g2eng-rdr-088', chapterId:CH_RDR, difficulty:2, subsection:'reading_comprehension',
    question:
      FIG('a chart with three bars of different heights', 260, 165, 260,
        '<line x1="26" y1="20" x2="26" y2="124" stroke="#111827" stroke-width="2"/>' +
        '<line x1="26" y1="124" x2="250" y2="124" stroke="#111827" stroke-width="2"/>' +
        TXT(16, 40, 12, '6') + TXT(16, 70, 12, '4') + TXT(16, 100, 12, '2') +
        '<rect x="44" y="34" width="46" height="90" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
        '<rect x="112" y="64" width="46" height="60" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
        '<rect x="180" y="94" width="46" height="30" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
        TXT(67, 142, 14, 'mango') + TXT(135, 142, 14, 'banana') + TXT(203, 142, 14, 'litchi')) +
      'Our class made this chart of favourite fruits. The taller the bar, the more children chose it. Which fruit did <b>most</b> children choose?',
    options:['mango','banana','litchi','apple'], answer:'mango',
    hint:'Find the tallest bar, then read the word written under it.',
    explanation:'The tallest bar is above <b>mango</b>, so most children chose mango. 📊' }),

  makeMCQ({ id:'g2eng-rdr-089', chapterId:CH_RDR, difficulty:1, subsection:'reading_comprehension',
    question:
      FIG('a small table with rows and columns', 240, 145, 240,
        '<rect x="20" y="16" width="200" height="36" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
        TXT(70, 40, 16, 'Bus', '#FFFFFF') + TXT(170, 40, 16, 'Time', '#FFFFFF') +
        '<rect x="20" y="52" width="200" height="36" fill="#FFFFFF" stroke="#111827" stroke-width="2"/>' +
        TXT(70, 76, 16, 'Bus 1') + TXT(170, 76, 16, '7:30') +
        '<rect x="20" y="88" width="200" height="36" fill="#F3F4F6" stroke="#111827" stroke-width="2"/>' +
        TXT(70, 112, 16, 'Bus 2') + TXT(170, 112, 16, '8:00') +
        '<line x1="120" y1="16" x2="120" y2="124" stroke="#111827" stroke-width="2"/>') +
      'Ravi takes <b>Bus 2</b> to school. Read the timetable. What time does his bus leave?',
    options:['8:00','7:30','8:30','7:00'], answer:'8:00',
    hint:'Find the row that says Bus 2, then slide your finger across to the Time column.',
    explanation:'The Bus 2 row shows <b>8:00</b>. Bus 1 leaves earlier, at 7:30. 🕗' }),

  makeMCQ({ id:'g2eng-rdr-090', chapterId:CH_RDR, difficulty:1, subsection:'reading_comprehension',
    question:
      FIG('a weather chart with three days', 300, 150, 300,
        '<line x1="10" y1="110" x2="290" y2="110" stroke="#111827" stroke-width="2"/>' +
        CLOUD(55, 46, '#9CA3AF') + RAIN(55, 66, 4) + TXT(55, 132, 14, 'Monday') +
        CLOUD(150, 46, '#9CA3AF') + RAIN(150, 66, 4) + TXT(150, 132, 14, 'Tuesday') +
        SUN(248, 56, 24) + TXT(248, 132, 14, 'Wednesday')) +
      'This chart shows our weather for three days. On which day was it <b>sunny</b>?',
    options:['Wednesday','Monday','Tuesday','Thursday'], answer:'Wednesday',
    hint:'Find the day with no rain falling under the cloud.',
    explanation:'It rained on Monday and Tuesday. The sun is drawn above <b>Wednesday</b>. 🌤️' }),

  makeMCQ({ id:'g2eng-rdr-091', chapterId:CH_RDR, difficulty:2, subsection:'reading_comprehension',
    question:
      FIG('a drawn scene with a building and a plant', 260, 175, 260,
        GROUND(260, 164, 11) + TREE(214, 164, 34, 56, 0) + HOUSE(100, 164, '#FACC15', '#92400E', '#EF4444', 2)) +
      'Sara lives in a small house. Its door is red. A tall tree grows next to it. Which sentence is <b>true</b>?',
    options:['The door is red.','The door is blue.','The house is big.','The tree is small.'],
    answer:'The door is red.',
    hint:'Read the passage again, then check the picture for the same thing.',
    explanation:'The passage says the door is red, and the picture shows a red door — <b>The door is red.</b> 🏠' }),

  // ══ WRITING ════════════════════════════════════════════════════════════════
  // ── sentence_writing (076–081) ────────────────────────────────────────────

  makeMCQ({ id:'g2eng-wrt-076', chapterId:CH_WRT, difficulty:1, subsection:'sentence_writing',
    question:
      FIG('a drawn scene', 260, 200, 250,
        GROUND(260, 190, 10) + HOUSE(90, 190, '#FACC15', '#EF4444', '#92400E', 2) + KITE(200, 52, '#3B82F6')) +
      'Which sentence tells us <b>where</b> the kite is?',
    options:['The kite is over the house.','The kite is in the cup.','The kite is under the bed.','The kite is on the plate.'],
    answer:'The kite is over the house.',
    hint:'Look at the top of the picture. What is under the kite?',
    explanation:'<b>The kite is over the house.</b> Words like over, under and on tell us where. 🪁' }),

  makeMCQ({ id:'g2eng-wrt-077', chapterId:CH_WRT, difficulty:2, subsection:'sentence_writing',
    question:
      FIG('a drawing of a building', 200, 150, 190, GROUND(200, 140, 10) + HOUSE(100, 140, '#FFFFFF', '#92400E', '#EF4444', 2)) +
      'All four sentences say the same thing. Which one is <b>written correctly</b>?',
    options:['The house has a red door.','the house has a red door.','The house has a red door','the house has a red door'],
    answer:'The house has a red door.',
    hint:'Check two things: the first letter, and the mark at the end.',
    explanation:'A sentence needs a <b>capital letter</b> at the start and a <b>full stop</b> at the end. Only the first one has both.' }),

  makeMCQ({ id:'g2eng-wrt-078', chapterId:CH_WRT, difficulty:2, subsection:'sentence_writing',
    question:
      FIG('four word cards that are mixed up', 320, 90, 330,
        CARD(10, 20, 70, 50, 'sun', 19) + CARD(90, 20, 60, 50, 'is', 19) +
        CARD(160, 20, 70, 50, 'The', 19) + CARD(240, 20, 70, 50, 'hot', 19)) +
      'Put these words in the right order. Which sentence is correct?',
    options:['The sun is hot.','Sun the is hot.','Hot is the sun.','Is the sun hot.'], answer:'The sun is hot.',
    hint:'Which word has a capital letter? That word starts the sentence.',
    explanation:'<b>The sun is hot.</b> The naming word comes first, then the action word “is”. ☀️' }),

  makeMCQ({ id:'g2eng-wrt-079', chapterId:CH_WRT, difficulty:1, subsection:'sentence_writing',
    question:
      FIG('a plant with fruit on it', 200, 180, 190, GROUND(200, 170, 10) + TREE(100, 170, 46, 52, 3, '#EF4444')) +
      'Which sentence tells us <b>how many</b>?',
    options:['I see three apples.','I see an apple.','I see a big tree.','I see a green leaf.'], answer:'I see three apples.',
    hint:'A number word tells how many. Count the fruits first.',
    explanation:'<b>I see three apples.</b> The number word “three” tells us how many. 🍎' }),

  makeMCQ({ id:'g2eng-wrt-080', chapterId:CH_WRT, difficulty:2, subsection:'sentence_writing',
    question:
      FIG('a weather drawing', 220, 150, 200,
        CLOUD(110, 46, '#9CA3AF') + RAIN(110, 66, 4) + RAIN(110, 96, 4) + GROUND(220, 140, 10)) +
      'Which one is a <b>complete sentence</b>?',
    options:['The rain is falling.','Falling on the roof.','Very hard rain now.','In the big garden.'],
    answer:'The rain is falling.',
    hint:'A complete sentence tells us <b>who or what</b> and <b>what it does</b>.',
    explanation:'<b>The rain is falling.</b> tells what (the rain) and what it does (is falling). The others leave you asking “what?” 🌧️' }),

  makeMCQ({ id:'g2eng-wrt-081', chapterId:CH_WRT, difficulty:1, subsection:'sentence_writing',
    question:
      FIG('a large vehicle on a road', 220, 130, 200, GROUND(220, 118, 12, '#9CA3AF') + BUS(110, 118, '#FACC15')) +
      'Finish the sentence: The bus ______ to school every day.',
    options:['goes','go','going','gone'], answer:'goes',
    hint:'One bus, so the action word needs an s.',
    explanation:'The bus <b>goes</b> to school. We say “it goes”, not “it go”. 🚌' }),

  // ── punctuation (082–086) ─────────────────────────────────────────────────

  makeMCQ({ id:'g2eng-wrt-082', chapterId:CH_WRT, difficulty:1, subsection:'punctuation',
    question:
      FIG('a written line with an empty box at the end', 260, 100, 260,
        '<rect x="14" y="22" width="232" height="56" rx="6" fill="#F3F4F6" stroke="#111827" stroke-width="2"/>' +
        TXT(112, 58, 17, 'Where is my bag') +
        '<rect x="200" y="36" width="30" height="30" fill="#FFFFFF" stroke="#EF4444" stroke-width="2.5"/>') +
      'Which mark belongs in the empty box at the end of this sentence?',
    options:['question mark','full stop','comma','exclamation mark'], answer:'question mark',
    hint:'The sentence is asking something. What does an asking sentence end with?',
    explanation:'“Where is my bag” is asking, so it ends with a <b>question mark</b>. ❓' }),

  makeMCQ({ id:'g2eng-wrt-083', chapterId:CH_WRT, difficulty:1, subsection:'punctuation',
    question:
      FIG('a written line', 250, 90, 250,
        '<rect x="12" y="20" width="226" height="50" rx="6" fill="#F3F4F6" stroke="#111827" stroke-width="2"/>' +
        TXT(125, 54, 16, 'mauritius is my home.')) +
      'Which word should start with a <b>capital letter</b>?',
    options:['mauritius','is','my','home'], answer:'mauritius',
    hint:'The name of a country always begins with a capital — and so does the first word.',
    explanation:'<b>Mauritius</b> is the name of our country, and it is the first word too. It needs a capital M. 🇲🇺' }),

  makeMCQ({ id:'g2eng-wrt-084', chapterId:CH_WRT, difficulty:1, subsection:'punctuation',
    question:
      FIG('three boxes each holding one written mark', 280, 120, 280,
        CARD(20, 14, 64, 60, '.', 40) + TXT(52, 100, 15, 'A') +
        CARD(108, 14, 64, 60, '?', 40) + TXT(140, 100, 15, 'B') +
        CARD(196, 14, 64, 60, '!', 40) + TXT(228, 100, 15, 'C')) +
      'Which mark ends this sentence: “What a big mango”',
    options:['mark C','mark A','mark B','no mark'], answer:'mark C',
    hint:'The sentence shows a big feeling — surprise!',
    explanation:'It shows surprise, so it ends with the exclamation mark — <b>mark C</b>. 🥭' }),

  makeMCQ({ id:'g2eng-wrt-085', chapterId:CH_WRT, difficulty:2, subsection:'punctuation',
    question:
      FIG('a written line with a mark drawn under it', 280, 110, 280,
        '<rect x="12" y="22" width="256" height="50" rx="6" fill="#F3F4F6" stroke="#111827" stroke-width="2"/>' +
        TXT(140, 56, 15, 'I like rice beans and fish') +
        TXT(140, 96, 30, ',', '#EF4444')) +
      'This list needs one comma. <b>Where</b> does it go?',
    options:['after rice','after beans','after fish','after like'], answer:'after rice',
    hint:'In a list we put commas between the things, but not before the word “and”.',
    explanation:'It goes <b>after rice</b>: I like rice, beans and fish. The word “and” does the job of the last comma. 🍚' }),

  makeMCQ({ id:'g2eng-wrt-086', chapterId:CH_WRT, difficulty:2, subsection:'punctuation',
    question:
      FIG('a writing line and a pencil', 240, 110, 220,
        '<line x1="20" y1="70" x2="220" y2="70" stroke="#9CA3AF" stroke-width="3"/>' +
        '<rect x="60" y="26" width="110" height="20" rx="4" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
        '<polygon points="170,26 200,36 170,46" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
        '<rect x="44" y="26" width="16" height="20" fill="#EC4899" stroke="#111827" stroke-width="2"/>') +
      'Which sentence uses punctuation <b>correctly</b>?',
    options:['Come here, please.','Come here please','come here, please.','Come here, please'],
    answer:'Come here, please.',
    hint:'Look for a capital at the start, a comma before “please”, and a full stop at the end.',
    explanation:'<b>Come here, please.</b> has all three: capital C, a comma, and a full stop. ✏️' }),

  // ── word_choice (087–091) ─────────────────────────────────────────────────

  makeMCQ({ id:'g2eng-wrt-087', chapterId:CH_WRT, difficulty:1, subsection:'word_choice',
    question:
      FIG('two containers labelled A and B', 240, 160, 230,
        '<rect x="34" y="30" width="60" height="90" rx="4" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
        '<rect x="37" y="42" width="54" height="76" fill="#3B82F6"/>' + TXT(64, 146, 15, 'A') +
        '<rect x="146" y="30" width="60" height="90" rx="4" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
        TXT(176, 146, 15, 'B')) +
      'Choose the best word: The glass marked A is ______.',
    options:['full','empty','broken','heavy'], answer:'full',
    hint:'Look at how much water is inside glass A.',
    explanation:'Glass A is <b>full</b> of water. Glass B is the empty one. 🥛' }),

  makeMCQ({ id:'g2eng-wrt-088', chapterId:CH_WRT, difficulty:1, subsection:'word_choice',
    question:
      FIG('a weather drawing with an object under it', 220, 190, 200,
        CLOUD(110, 40, '#9CA3AF') + RAIN(110, 60, 4) +
        '<path d="M46 130 A64 64 0 0 1 174 130 Z" fill="#EF4444" stroke="#111827" stroke-width="3"/>' +
        '<line x1="110" y1="130" x2="110" y2="178" stroke="#111827" stroke-width="4"/>') +
      'Choose the best word: I open my umbrella when it ______.',
    options:['rains','shines','blows','dries'], answer:'rains',
    hint:'Look at what is falling from the cloud.',
    explanation:'We open an umbrella when it <b>rains</b>, to stay dry. ☔' }),

  makeMCQ({ id:'g2eng-wrt-089', chapterId:CH_WRT, difficulty:1, subsection:'word_choice',
    question:
      FIG('a dish with food and a utensil', 240, 150, 230,
        '<ellipse cx="110" cy="90" rx="76" ry="26" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
        '<ellipse cx="110" cy="86" rx="48" ry="16" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
        '<line x1="196" y1="52" x2="212" y2="118" stroke="#9CA3AF" stroke-width="6" stroke-linecap="round"/>' +
        '<ellipse cx="194" cy="46" rx="13" ry="18" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>') +
      'Choose the best word: We ______ rice with a spoon.',
    options:['eat','drink','wear','read'], answer:'eat',
    hint:'What do you do with food on a plate?',
    explanation:'We <b>eat</b> rice. We drink water, wear clothes and read books. 🍚' }),

  makeMCQ({ id:'g2eng-wrt-090', chapterId:CH_WRT, difficulty:1, subsection:'word_choice',
    question:
      FIG('a vehicle on a road', 240, 140, 230,
        '<rect x="0" y="112" width="240" height="28" fill="#9CA3AF"/>' +
        '<rect x="20" y="124" width="30" height="5" fill="#FFFFFF"/>' +
        '<rect x="70" y="124" width="30" height="5" fill="#FFFFFF"/>' +
        '<rect x="120" y="124" width="30" height="5" fill="#FFFFFF"/>' +
        '<rect x="170" y="124" width="30" height="5" fill="#FFFFFF"/>' +
        BUS(120, 112, '#22C55E')) +
      'Choose the best word: The bus ______ on the road.',
    options:['drives','swims','flies','sleeps'], answer:'drives',
    hint:'Think about what a bus does on a road, not in the sea or the sky.',
    explanation:'The bus <b>drives</b> on the road. Boats swim along, birds fly. 🚍' }),

  makeMCQ({ id:'g2eng-wrt-091', chapterId:CH_WRT, difficulty:2, subsection:'word_choice',
    question:
      FIG('a bright object in the sky above the ground', 220, 160, 200,
        SUN(110, 60, 36) + GROUND(220, 148, 12, '#FACC15')) +
      'Which word tells us the sun is <b>very</b> hot?',
    options:['boiling','warm','cool','cold'], answer:'boiling',
    hint:'One word means much more than just hot.',
    explanation:'<b>Boiling</b> means very, very hot. Warm is only a little hot. 🔥' }),

  // ══ GRAMMAR ════════════════════════════════════════════════════════════════
  // ── nouns_pronouns (076–080) ──────────────────────────────────────────────

  makeMCQ({ id:'g2eng-grm-076', chapterId:CH_GRM, difficulty:1, subsection:'nouns_pronouns',
    question:
      FIG('a simple drawing', 200, 150, 190, GROUND(200, 140, 10) + HOUSE(100, 140, '#FACC15', '#EF4444', '#92400E', 2)) +
      'A <b>noun</b> is a naming word. Which noun names this picture?',
    options:['house','boat','cake','star'], answer:'house',
    hint:'Say out loud what you can see, then find that word.',
    explanation:'The picture shows a <b>house</b> — a naming word for a place we live in. 🏠' }),

  makeMCQ({ id:'g2eng-grm-077', chapterId:CH_GRM, difficulty:1, subsection:'nouns_pronouns',
    question:
      FIG('a simple drawing', 200, 140, 180,
        '<circle cx="52" cy="70" r="26" fill="#FACC15" stroke="#111827" stroke-width="3"/>' +
        '<circle cx="52" cy="70" r="10" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
        '<rect x="74" y="62" width="86" height="16" fill="#FACC15" stroke="#111827" stroke-width="3"/>' +
        '<rect x="126" y="78" width="12" height="18" fill="#FACC15" stroke="#111827" stroke-width="3"/>' +
        '<rect x="148" y="78" width="12" height="18" fill="#FACC15" stroke="#111827" stroke-width="3"/>') +
      'Which noun names this picture?',
    options:['key','cup','bag','box'], answer:'key',
    hint:'It is small, it has teeth, and it opens a door.',
    explanation:'The picture shows a <b>key</b>. Nouns name things like this. 🔑' }),

  makeMCQ({ id:'g2eng-grm-078', chapterId:CH_GRM, difficulty:1, subsection:'nouns_pronouns',
    question:
      FIG('two drawings on water', 300, 160, 300,
        '<rect x="0" y="120" width="300" height="40" fill="#3B82F6"/>' +
        BOAT(78, 124, '#EF4444') + BOAT(220, 124, '#22C55E')) +
      'Which <b>pronoun</b> can take the place of “the two boats”?',
    options:['They','He','She','It'], answer:'They',
    hint:'Count the boats. Is it one thing or more than one?',
    explanation:'There are two boats — more than one — so we say <b>They</b>. “It” is for only one thing. ⛵' }),

  makeMCQ({ id:'g2eng-grm-079', chapterId:CH_GRM, difficulty:1, subsection:'nouns_pronouns',
    question:
      FIG('a small object on a piece of furniture', 240, 150, 220,
        '<circle cx="92" cy="60" r="18" fill="#FACC15" stroke="#111827" stroke-width="3"/>' +
        '<circle cx="92" cy="60" r="7" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
        '<rect x="108" y="54" width="56" height="12" fill="#FACC15" stroke="#111827" stroke-width="3"/>' +
        '<rect x="146" y="66" width="9" height="13" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
        '<rect x="20" y="88" width="200" height="12" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
        '<rect x="34" y="100" width="12" height="42" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
        '<rect x="194" y="100" width="12" height="42" fill="#92400E" stroke="#111827" stroke-width="2"/>') +
      'The key is on the table. ______ is very small.',
    options:['It','He','She','They'], answer:'It',
    hint:'A key is one thing, not a person.',
    explanation:'We use <b>It</b> for one thing. He and she are for people. 🔑' }),

  makeMCQ({ id:'g2eng-grm-080', chapterId:CH_GRM, difficulty:2, subsection:'nouns_pronouns',
    question:
      FIG('an object on a piece of furniture', 240, 170, 220,
        BAG(120, 96, '#A855F7') +
        '<rect x="20" y="96" width="200" height="12" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
        '<rect x="34" y="108" width="12" height="52" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
        '<rect x="194" y="108" width="12" height="52" fill="#92400E" stroke="#111827" stroke-width="2"/>') +
      'Which word in “The bag is on the table.” names a <b>thing</b>?',
    options:['bag','is','on','The'], answer:'bag',
    hint:'A naming word is something you can point at in the picture.',
    explanation:'<b>Bag</b> is a noun — you can point at it. “Is” is an action word and “on” tells where. 👜' }),

  // ── verbs_action (081–085) ────────────────────────────────────────────────

  makeMCQ({ id:'g2eng-grm-081', chapterId:CH_GRM, difficulty:1, subsection:'verbs_action',
    question:
      FIG('a weather drawing', 220, 150, 200, CLOUD(110, 40, '#9CA3AF') + RAIN(110, 60, 4) + RAIN(110, 92, 4)) +
      'Which <b>action word</b> tells what the rain is doing?',
    options:['falling','sitting','reading','singing'], answer:'falling',
    hint:'The drops are coming down from the cloud.',
    explanation:'The rain is <b>falling</b>. A verb tells us what something is doing. 🌧️' }),

  makeMCQ({ id:'g2eng-grm-082', chapterId:CH_GRM, difficulty:1, subsection:'verbs_action',
    question:
      FIG('a drawing under water', 240, 150, 220,
        '<rect x="0" y="20" width="240" height="130" fill="#BFDBFE"/>' +
        '<ellipse cx="130" cy="82" rx="52" ry="30" fill="#F97316" stroke="#111827" stroke-width="3"/>' +
        '<polygon points="78,82 40,58 40,106" fill="#F97316" stroke="#111827" stroke-width="3"/>' +
        '<circle cx="154" cy="72" r="5" fill="#111827"/>') +
      'Finish the sentence: The fish ______ in the sea.',
    options:['swims','walks','flies','sleeps'], answer:'swims',
    hint:'What can a fish do in the water?',
    explanation:'The fish <b>swims</b> in the sea. Swims is the action word here. 🐟' }),

  makeMCQ({ id:'g2eng-grm-083', chapterId:CH_GRM, difficulty:1, subsection:'verbs_action',
    question:
      FIG('a round object with an arrow beside it', 200, 170, 180,
        BALL(70, 118, 34, '#EF4444') + ARROW(150, 80, 'up', '#22C55E')) +
      'The arrow shows the way the ball moves. The ball ______ up in the air.',
    options:['goes','eats','sings','sleeps'], answer:'goes',
    hint:'Which of these words is about moving?',
    explanation:'The ball <b>goes</b> up. Eating, singing and sleeping are not ways of moving. ⚽' }),

  makeMCQ({ id:'g2eng-grm-084', chapterId:CH_GRM, difficulty:2, subsection:'verbs_action',
    question:
      FIG('a vehicle with lines drawn behind it', 240, 130, 220,
        GROUND(240, 118, 12, '#9CA3AF') + BUS(140, 118, '#3B82F6') +
        '<line x1="20" y1="72" x2="60" y2="72" stroke="#9CA3AF" stroke-width="4"/>' +
        '<line x1="14" y1="88" x2="60" y2="88" stroke="#9CA3AF" stroke-width="4"/>') +
      'Which word is the <b>action word</b> in “The bus stops here.”?',
    options:['stops','bus','here','The'], answer:'stops',
    hint:'Which word tells you what the bus <b>does</b>?',
    explanation:'<b>Stops</b> is the verb — it tells what the bus does. “Bus” is a noun and “here” tells where. 🚌' }),

  makeMCQ({ id:'g2eng-grm-085', chapterId:CH_GRM, difficulty:2, subsection:'verbs_action',
    question:
      FIG('a page from a calendar beside a weather drawing', 280, 150, 280,
        '<rect x="16" y="26" width="96" height="96" rx="6" fill="#FFFFFF" stroke="#111827" stroke-width="3"/>' +
        '<rect x="16" y="26" width="96" height="26" rx="6" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
        TXT(64, 45, 14, 'Yesterday', '#FFFFFF') + TXT(64, 100, 34, '9') +
        CLOUD(200, 46, '#9CA3AF') + RAIN(200, 66, 4) + RAIN(200, 96, 4)) +
      'Finish the sentence: Yesterday it ______ all day.',
    options:['rained','rain','rains','raining'], answer:'rained',
    hint:'It is finished and gone. Which word ends in <b>-ed</b>?',
    explanation:'“Yesterday” means it already happened, so we say it <b>rained</b>. 🌧️' }),

  // ── adjectives_describing (086–091) ───────────────────────────────────────

  makeMCQ({ id:'g2eng-grm-086', chapterId:CH_GRM, difficulty:1, subsection:'adjectives_describing',
    question:
      FIG('two round objects of different sizes, labelled A and B', 260, 160, 250,
        BALL(78, 74, 48, '#3B82F6') + TXT(78, 148, 15, 'A') +
        BALL(196, 96, 26, '#3B82F6') + TXT(196, 148, 15, 'B')) +
      'Both balls are blue. Finish the sentence: Ball A is ______ than ball B.',
    options:['bigger','smaller','longer','rounder'], answer:'bigger',
    hint:'Only one thing is different about them — their size.',
    explanation:'Ball A is <b>bigger</b> than ball B. A describing word can compare two things. ⚽' }),

  makeMCQ({ id:'g2eng-grm-087', chapterId:CH_GRM, difficulty:1, subsection:'adjectives_describing',
    question:
      FIG('four plants in a row, labelled A to D', 320, 175, 330,
        GROUND(320, 164, 11) +
        FLOWER(45, 164, '#EF4444') + TXT(45, 174, 14, 'A') +
        FLOWER(125, 164, '#3B82F6') + TXT(125, 174, 14, 'B') +
        FLOWER(205, 164, '#FACC15') + TXT(205, 174, 14, 'C') +
        FLOWER(282, 164, '#A855F7') + TXT(282, 174, 14, 'D')) +
      'Which flower is <b>blue</b>?',
    options:['flower A','flower B','flower C','flower D'], answer:'flower B',
    hint:'Blue is the colour of the sea on a bright day.',
    explanation:'<b>Flower B</b> is blue. A is red, C is yellow and D is purple. 🌸' }),

  makeMCQ({ id:'g2eng-grm-088', chapterId:CH_GRM, difficulty:1, subsection:'adjectives_describing',
    question:
      FIG('two plants of different heights', 260, 170, 250,
        GROUND(260, 158, 12) + TREE(72, 158, 34, 62, 0) + TREE(190, 158, 24, 26, 0)) +
      'Finish the sentence: The tree on the <b>left</b> is ______.',
    options:['tall','short','wide','thin'], answer:'tall',
    hint:'Compare the two trees. Which one reaches higher?',
    explanation:'The tree on the left is <b>tall</b>. The one on the right is short. 🌳' }),

  makeMCQ({ id:'g2eng-grm-089', chapterId:CH_GRM, difficulty:2, subsection:'adjectives_describing',
    question:
      FIG('a flat object from a plant', 200, 150, 180,
        '<path d="M40 120 Q46 44 154 34 Q148 116 40 120 Z" fill="#22C55E" stroke="#111827" stroke-width="3"/>' +
        '<line x1="40" y1="120" x2="150" y2="40" stroke="#111827" stroke-width="2"/>') +
      'This is a leaf. Which describing word tells us its <b>colour</b>?',
    options:['green','big','three','round'], answer:'green',
    hint:'A colour word tells you what your eyes see, not the size or the number.',
    explanation:'<b>Green</b> is the colour word. “Big” describes size and “three” tells how many. 🍃' }),

  makeMCQ({ id:'g2eng-grm-090', chapterId:CH_GRM, difficulty:2, subsection:'adjectives_describing',
    question:
      FIG('a plant with fruit on it', 200, 180, 190, GROUND(200, 170, 10) + TREE(100, 170, 46, 52, 4, '#EF4444')) +
      'Count the fruits. Which describing word tells us <b>how many</b>?',
    options:['four','red','round','sweet'], answer:'four',
    hint:'Some describing words are numbers.',
    explanation:'<b>Four</b> tells how many. Red tells the colour, and round tells the shape. 🍎' }),

  makeMCQ({ id:'g2eng-grm-091', chapterId:CH_GRM, difficulty:2, subsection:'adjectives_describing',
    question:
      FIG('two toys of different colours', 260, 180, 250,
        KITE(70, 62, '#A855F7') + KITE(190, 62, '#F97316')) +
      'Finish the sentence: The kite on the <b>right</b> is ______.',
    options:['orange','purple','yellow','green'], answer:'orange',
    hint:'Your right hand side of the picture. Name that colour.',
    explanation:'The kite on the right is <b>orange</b>. The one on the left is purple. 🪁' }),

  // ══ PHONICS ════════════════════════════════════════════════════════════════
  // ── blends_digraphs (076–081) ─────────────────────────────────────────────

  makeMCQ({ id:'g2eng-pho-076', chapterId:CH_PHO, difficulty:1, subsection:'blends_digraphs',
    question:
      FIG('a drawing on water', 240, 170, 230,
        '<rect x="0" y="130" width="240" height="40" fill="#3B82F6"/>' + BOAT(110, 134, '#EF4444')) +
      'The picture shows a big boat that sails the sea. Which two letters are missing? ______ip',
    options:['sh','ch','th','wh'], answer:'sh',
    hint:'Say the word for a big sailing boat. The first sound is a quiet “hush” sound.',
    explanation:'The word is <b>ship</b>, so the missing letters are <b>sh</b>. Two letters, one sound. 🚢' }),

  makeMCQ({ id:'g2eng-pho-077', chapterId:CH_PHO, difficulty:1, subsection:'blends_digraphs',
    question:
      FIG('a shape with five points', 160, 150, 150, STAR(80, 74, 56, '#FACC15')) +
      'Which <b>blend</b> does the name of this picture start with?',
    options:['st','sp','sk','sn'], answer:'st',
    hint:'In a blend you can hear both letters. Listen for /s/ then /t/.',
    explanation:'<b>Star</b> begins with the blend <b>st</b> — you hear /s/ and /t/ slide together. ⭐' }),

  makeMCQ({ id:'g2eng-pho-078', chapterId:CH_PHO, difficulty:1, subsection:'blends_digraphs',
    question:
      FIG('a tall plant', 200, 180, 180, GROUND(200, 170, 10) + TREE(100, 170, 46, 54, 0)) +
      'Which blend do you hear at the <b>start</b> of the name of this picture?',
    options:['tr','dr','br','gr'], answer:'tr',
    hint:'Say it slowly. The first sound is /t/, then /r/ follows.',
    explanation:'<b>Tree</b> starts with <b>tr</b>. Dr, br and gr start with different first sounds. 🌳' }),

  makeMCQ({ id:'g2eng-pho-079', chapterId:CH_PHO, difficulty:1, subsection:'blends_digraphs',
    question:
      FIG('a cloth on a pole', 190, 160, 170, GROUND(190, 150, 10) + FLAG(105, 150, '#3B82F6')) +
      'This picture is raised on a pole on special days. Which two letters are missing? ______ag',
    options:['fl','fr','bl','gl'], answer:'fl',
    hint:'Say the word slowly: /f/ /l/ /a/ /g/.',
    explanation:'The word is <b>flag</b>, so the missing blend is <b>fl</b>. 🚩' }),

  makeMCQ({ id:'g2eng-pho-080', chapterId:CH_PHO, difficulty:2, subsection:'blends_digraphs',
    question:
      FIG('a piece of furniture', 220, 175, 200,
        '<rect x="66" y="92" width="94" height="14" fill="#92400E" stroke="#111827" stroke-width="2.5"/>' +
        '<rect x="66" y="30" width="14" height="66" fill="#92400E" stroke="#111827" stroke-width="2.5"/>' +
        '<rect x="70" y="106" width="12" height="52" fill="#92400E" stroke="#111827" stroke-width="2.5"/>' +
        '<rect x="144" y="106" width="12" height="52" fill="#92400E" stroke="#111827" stroke-width="2.5"/>') +
      'This is a <b>chair</b>. Which other word starts with the same sound?',
    options:['cheese','share','three','whale'], answer:'cheese',
    hint:'Chair starts with ch. Which word also starts with ch?',
    explanation:'<b>Cheese</b> starts with ch, just like chair. Share starts with sh, three with th and whale with wh. 🪑' }),

  makeMCQ({ id:'g2eng-pho-081', chapterId:CH_PHO, difficulty:1, subsection:'blends_digraphs',
    question:
      FIG('a musical object', 220, 165, 200,
        '<ellipse cx="110" cy="122" rx="50" ry="14" fill="#EF4444" stroke="#111827" stroke-width="3"/>' +
        '<rect x="60" y="62" width="100" height="60" fill="#EF4444" stroke="#111827" stroke-width="3"/>' +
        '<ellipse cx="110" cy="62" rx="50" ry="16" fill="#FDE68A" stroke="#111827" stroke-width="3"/>' +
        '<line x1="76" y1="30" x2="100" y2="56" stroke="#92400E" stroke-width="6" stroke-linecap="round"/>' +
        '<line x1="150" y1="30" x2="126" y2="56" stroke="#92400E" stroke-width="6" stroke-linecap="round"/>') +
      'You beat this with two sticks. Which two letters are missing? ______um',
    options:['dr','tr','br','gr'], answer:'dr',
    hint:'Say the word slowly: /d/ /r/ /u/ /m/.',
    explanation:'The word is <b>drum</b>, so the missing blend is <b>dr</b>. 🥁' }),

  // ── word_families (082–086) ───────────────────────────────────────────────

  makeMCQ({ id:'g2eng-pho-082', chapterId:CH_PHO, difficulty:1, subsection:'word_families',
    question:
      FIG('something you wear on your head', 220, 130, 190, CAP(90, 82, '#EF4444')) +
      'This is a <b>hat</b>. Which word family does it belong to?',
    options:['-at','-op','-ug','-in'], answer:'-at',
    hint:'A word family is the ending you hear. Say “hat” and keep only the last part.',
    explanation:'Hat belongs to the <b>-at</b> family, with cat, bat, mat and rat. 🧢' }),

  makeMCQ({ id:'g2eng-pho-083', chapterId:CH_PHO, difficulty:1, subsection:'word_families',
    question:
      FIG('a drinking vessel with a handle', 190, 130, 165, CUP(85, 108, '#3B82F6')) +
      'This is a <b>mug</b>. Which word rhymes with it?',
    options:['rug','ram','red','rim'], answer:'rug',
    hint:'Rhyming words end the same way. Listen for the /ug/ ending.',
    explanation:'<b>Rug</b> rhymes with mug — both end in -ug. Ram, red and rim end differently. ☕' }),

  makeMCQ({ id:'g2eng-pho-084', chapterId:CH_PHO, difficulty:1, subsection:'word_families',
    question:
      FIG('a small round object', 180, 150, 160,
        '<circle cx="90" cy="86" r="42" fill="none" stroke="#FACC15" stroke-width="12"/>' +
        '<circle cx="90" cy="86" r="42" fill="none" stroke="#111827" stroke-width="1.5"/>' +
        '<polygon points="90,20 106,44 74,44" fill="#3B82F6" stroke="#111827" stroke-width="2"/>') +
      'You wear this on your finger. It is a <b>ring</b>. Which word is in the same family?',
    options:['king','kite','cake','cook'], answer:'king',
    hint:'Look for the word that ends with the same three letters.',
    explanation:'<b>King</b> is in the -ing family with ring, sing and wing. 💍' }),

  makeMCQ({ id:'g2eng-pho-085', chapterId:CH_PHO, difficulty:2, subsection:'word_families',
    question:
      FIG('a labelled box holding two word cards and an empty card', 250, 150, 250,
        '<rect x="12" y="14" width="226" height="124" rx="10" fill="#F3F4F6" stroke="#111827" stroke-width="2.5"/>' +
        TXT(125, 44, 22, '-op') +
        CARD(28, 62, 62, 52, 'mop', 18) + CARD(96, 62, 62, 52, 'top', 18) + CARD(164, 62, 62, 52, '?', 22)) +
      'Two words are already in this family box. Which word joins them?',
    options:['hop','hat','sun','bed'], answer:'hop',
    hint:'Every word in the box must end with the sound written at the top.',
    explanation:'<b>Hop</b> ends in -op, like mop and top. Hat, sun and bed end differently. 🧹' }),

  makeMCQ({ id:'g2eng-pho-086', chapterId:CH_PHO, difficulty:2, subsection:'word_families',
    question:
      FIG('four word cards labelled A to D', 320, 110, 330,
        CARD(8, 14, 68, 48, 'bat', 18) + TXT(42, 92, 15, 'A') +
        CARD(88, 14, 68, 48, 'bus', 18) + TXT(122, 92, 15, 'B') +
        CARD(168, 14, 68, 48, 'cat', 18) + TXT(202, 92, 15, 'C') +
        CARD(248, 14, 68, 48, 'cup', 18) + TXT(282, 92, 15, 'D')) +
      'Which <b>two</b> cards hold words from the <b>-at</b> family?',
    options:['A and C','A and B','B and D','C and D'], answer:'A and C',
    hint:'Read the last two letters of every card.',
    explanation:'<b>Bat</b> and <b>cat</b> both end in -at. Bus and cup do not. 🐱' }),

  // ── vowel_sounds (087–091) ────────────────────────────────────────────────

  makeMCQ({ id:'g2eng-pho-087', chapterId:CH_PHO, difficulty:1, subsection:'vowel_sounds',
    question:
      FIG('a drinking vessel', 190, 130, 165, CUP(85, 108, '#EC4899')) +
      'This is a <b>cup</b>. Which vowel sound do you hear in the middle?',
    options:['u','a','e','o'], answer:'u',
    hint:'Say c‑u‑p slowly. The middle sound is the vowel.',
    explanation:'“Cup” has the short <b>u</b> sound in the middle: c‑u‑p. ☕' }),

  makeMCQ({ id:'g2eng-pho-088', chapterId:CH_PHO, difficulty:1, subsection:'vowel_sounds',
    question:
      FIG('a simple drawing', 200, 150, 180, BAG(100, 130, '#22C55E')) +
      'Which word matches this picture?',
    options:['bag','bug','big','beg'], answer:'bag',
    hint:'All four words change only in the middle. Say each one and picture it.',
    explanation:'The picture is a <b>bag</b>, with the short a sound: b‑a‑g. 👜' }),

  makeMCQ({ id:'g2eng-pho-089', chapterId:CH_PHO, difficulty:2, subsection:'vowel_sounds',
    question:
      FIG('a piece of furniture', 240, 150, 230,
        '<rect x="24" y="44" width="16" height="86" fill="#92400E" stroke="#111827" stroke-width="2.5"/>' +
        '<rect x="24" y="80" width="192" height="34" rx="6" fill="#3B82F6" stroke="#111827" stroke-width="3"/>' +
        '<rect x="44" y="60" width="56" height="22" rx="8" fill="#FFFFFF" stroke="#111827" stroke-width="2.5"/>' +
        '<rect x="34" y="114" width="12" height="24" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
        '<rect x="194" y="114" width="12" height="24" fill="#92400E" stroke="#111827" stroke-width="2"/>') +
      'The picture shows where you sleep. Which vowel letter is missing? b______d',
    options:['e','a','i','u'], answer:'e',
    hint:'The word is bed. Say it slowly and listen to the middle.',
    explanation:'The middle sound of <b>bed</b> is a short e: b‑e‑d. 🛏️' }),

  makeMCQ({ id:'g2eng-pho-090', chapterId:CH_PHO, difficulty:2, subsection:'vowel_sounds',
    question:
      FIG('a simple drawing', 170, 190, 160, KITE(85, 70, '#EC4899')) +
      'This is a <b>kite</b>. Does it have a long or a short vowel sound?',
    options:['long i','short i','long a','short a'], answer:'long i',
    hint:'A long vowel says its own name. Say “kite” and listen to the vowel.',
    explanation:'<b>Kite</b> has a long i — the vowel says its name, because of the e at the end. 🪁' }),

  makeMCQ({ id:'g2eng-pho-091', chapterId:CH_PHO, difficulty:1, subsection:'vowel_sounds',
    question:
      FIG('a drawing under water', 220, 140, 200,
        '<rect x="0" y="16" width="220" height="124" fill="#BFDBFE"/>' +
        '<ellipse cx="120" cy="76" rx="48" ry="28" fill="#A855F7" stroke="#111827" stroke-width="3"/>' +
        '<polygon points="72,76 36,54 36,98" fill="#A855F7" stroke="#111827" stroke-width="3"/>' +
        '<circle cx="142" cy="66" r="5" fill="#111827"/>') +
      'This is a <b>fish</b>. Which vowel sound do you hear in it?',
    options:['i','a','e','u'], answer:'i',
    hint:'Say f‑i‑sh slowly and stop on the middle sound.',
    explanation:'“Fish” has the short <b>i</b> sound: f‑i‑sh. 🐟' })

);

})();
