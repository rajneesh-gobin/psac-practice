'use strict';
// grade2-maths - visual bank: pictures, diagrams, blocks, clocks, coins.
// IDs: g2mth-num-061..070, g2mth-add-061..070, g2mth-sub-061..070,
//      g2mth-mul-061..070, g2mth-frc-061..070, g2mth-msr-061..070,
//      g2mth-tim-061..070, g2mth-shp-079..088, g2mth-ord-091..100,
//      g2mth-mon-091..100, g2mth-div-091..100
(function () {

const CH_NUM = 'g2mth-numbers';
const CH_ADD = 'g2mth-addition';
const CH_SUB = 'g2mth-subtraction';
const CH_MUL = 'g2mth-multiplication';
const CH_FRC = 'g2mth-fractions';
const CH_MSR = 'g2mth-measurement';
const CH_TIM = 'g2mth-time';
const CH_SHP = 'g2mth-shapes';
const CH_ORD = 'g2mth-ordinals';
const CH_MON = 'g2mth-money';
const CH_DIV = 'g2mth-division';

// ---- drawing helpers -------------------------------------------------------
// Every figure is built here so the white panel, the explicit fills and the
// dark <text> can never be forgotten on one item. No HTML tags go inside an
// <svg>: the parser would close the svg there and lose the rest of the figure.

const R = n => Math.round(n * 10) / 10;

const fig = (w, h, max, label, body) =>
  '<div style="text-align:center;margin:.5em 0" aria-label="' + label + '">' +
  '<svg viewBox="0 0 ' + w + ' ' + h + '" style="width:100%;max-width:' + max +
  'px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
  '<rect x="0" y="0" width="' + w + '" height="' + h + '" rx="8" fill="#ffffff"/>' +
  body + '</svg></div>';

const T = (x, y, size, s, anchor) =>
  '<text x="' + R(x) + '" y="' + R(y) + '" font-family="system-ui, sans-serif" font-size="' +
  size + '" fill="#1f2937" text-anchor="' + (anchor || 'middle') + '">' + s + '</text>';

const rct = (x, y, w, h, fill, stroke, sw, dash) =>
  '<rect x="' + R(x) + '" y="' + R(y) + '" width="' + R(w) + '" height="' + R(h) +
  '" fill="' + fill + '" stroke="' + (stroke || 'none') + '" stroke-width="' + (sw || 0) + '"' +
  (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';

const crc = (cx, cy, r, fill, stroke, sw) =>
  '<circle cx="' + R(cx) + '" cy="' + R(cy) + '" r="' + R(r) + '" fill="' + fill +
  '" stroke="' + (stroke || 'none') + '" stroke-width="' + (sw || 0) + '"/>';

const ell = (cx, cy, rx, ry, fill, stroke, sw) =>
  '<ellipse cx="' + R(cx) + '" cy="' + R(cy) + '" rx="' + R(rx) + '" ry="' + R(ry) +
  '" fill="' + fill + '" stroke="' + (stroke || 'none') + '" stroke-width="' + (sw || 0) + '"/>';

const ln = (x1, y1, x2, y2, stroke, sw, dash) =>
  '<line x1="' + R(x1) + '" y1="' + R(y1) + '" x2="' + R(x2) + '" y2="' + R(y2) +
  '" stroke="' + stroke + '" stroke-width="' + sw + '"' +
  (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';

const poly = (pts, fill, stroke, sw) =>
  '<polygon points="' + pts + '" fill="' + fill + '" stroke="' + (stroke || 'none') +
  '" stroke-width="' + (sw || 0) + '"/>';

const grp = (x, y, body) => '<g transform="translate(' + R(x) + ',' + R(y) + ')">' + body + '</g>';

const arrowDown = (x, y1, y2, colour) =>
  ln(x, y1, x, y2 - 7, colour, 2.5) +
  poly(R(x) + ',' + R(y2) + ' ' + R(x - 6) + ',' + R(y2 - 10) + ' ' + R(x + 6) + ',' + R(y2 - 10), colour);

// base-ten blocks: tens as tall ruled bars, ones as small squares
const blocksW = (t, o) => t * 17 + (o ? (t ? 10 : 0) + Math.min(o, 5) * 12 : 0);
const blocks = (t, o, x0, y0) => {
  let s = '';
  for (let i = 0; i < t; i++) {
    const x = x0 + i * 17;
    s += rct(x, y0, 12, 60, '#93C5FD', '#1D4ED8', 1.5);
    for (let k = 1; k < 10; k++) s += ln(x, y0 + k * 6, x + 12, y0 + k * 6, '#1D4ED8', 0.7);
  }
  const ox = x0 + t * 17 + (t ? 10 : 0);
  for (let j = 0; j < o; j++) s += rct(ox + (j % 5) * 12, y0 + 36 + Math.floor(j / 5) * 12, 10, 10, '#FDBA74', '#C2410C', 1.5);
  return s;
};
const blocksC = (t, o, w, y0) => blocks(t, o, (w - blocksW(t, o)) / 2, y0);

// number line
const NLX0 = 25, NLX1 = 275, NLY = 78;
const nlx = (i, n) => NLX0 + i * (NLX1 - NLX0) / (n - 1);
const numline = labels => {
  const n = labels.length;
  let s = ln(NLX0 - 10, NLY, NLX1 + 10, NLY, '#111827', 2.5);
  for (let i = 0; i < n; i++) {
    const x = nlx(i, n);
    s += ln(x, NLY - 7, x, NLY + 7, '#111827', 2);
    if (labels[i] !== '') s += T(x, NLY + 24, 14, labels[i]);
  }
  return s;
};
const hop = (xa, xb, label) => {
  const dir = xb > xa ? 1 : -1;
  return '<path d="M ' + R(xa) + ' ' + R(NLY - 9) + ' Q ' + R((xa + xb) / 2) + ' ' +
    R(NLY - 57) + ' ' + R(xb) + ' ' + R(NLY - 9) + '" fill="none" stroke="#EF4444" stroke-width="2.5"/>' +
    poly(R(xb) + ',' + R(NLY - 2) + ' ' + R(xb - 7 * dir) + ',' + R(NLY - 16) + ' ' +
      R(xb + 4 * dir) + ',' + R(NLY - 15), '#EF4444') +
    (label ? T((xa + xb) / 2, NLY - 38, 13, label) : '');
};

// dots
const dots = (n, cols, x0, y0, pitch, r, fill) => {
  let s = '';
  for (let i = 0; i < n; i++)
    s += crc(x0 + (i % cols) * pitch, y0 + Math.floor(i / cols) * pitch, r, fill || '#3B82F6', '#1D4ED8', 2);
  return s;
};

// lettered choice cells
const cell = (x, y, w, h, letter, body) =>
  rct(x, y, w, h, '#FFFFFF', '#D1D5DB', 1.5) + T(x + 13, y + 17, 14, letter) + grp(x, y, body);
const grid4 = cells => {
  const P = [[6, 6], [140, 6], [6, 124], [140, 124]];
  let s = '';
  for (let i = 0; i < 4; i++) s += cell(P[i][0], P[i][1], 128, 112, 'ABCD'[i], cells[i]);
  return s;
};
const rowcells = (cells, w, h) => {
  let s = '';
  for (let i = 0; i < 4; i++) s += cell(6 + i * (w + 6), 6, w, h, 'ABCD'[i], cells[i]);
  return s;
};

// column arithmetic; '#' in a row draws an empty box for the missing digit
const colsum = (top, bot, op, res, opts) => {
  opts = opts || {};
  const X = [110, 140], yTop = 58, yBot = 100, yRes = 152;
  let s = opts.hi ? rct(124, 26, 32, 96, '#FEF3C7') : '';
  if (opts.carry) s += rct(94, 12, 32, 34, '#FFFFFF', '#EF4444', 2.5) + T(110, 38, 22, '?');
  const put = (str, y) => {
    let t = '';
    for (let i = 0; i < str.length; i++) {
      const ch = str.charAt(str.length - 1 - i), x = X[1 - i];
      t += (ch === '#') ? rct(x - 16, y - 30, 32, 36, '#FFFFFF', '#EF4444', 2.5) : T(x, y, 30, ch);
    }
    return t;
  };
  s += put(top, yTop) + T(72, yBot, 30, op) + put(bot, yBot);
  s += ln(86, 114, 160, 114, '#111827', 3);
  if (res) s += put(res, yRes);
  return s;
};

// pie slice, used for halves and quarters
const pieSlice = (cx, cy, r, a0, a1, fill) => {
  const p = a => R(cx + r * Math.cos(a * Math.PI / 180)) + ' ' + R(cy + r * Math.sin(a * Math.PI / 180));
  return '<path d="M ' + R(cx) + ' ' + R(cy) + ' L ' + p(a0) + ' A ' + r + ' ' + r + ' 0 ' +
    ((a1 - a0) > 180 ? 1 : 0) + ' 1 ' + p(a1) + ' Z" fill="' + fill + '" stroke="#111827" stroke-width="2"/>';
};

// clock face
const clock = (h, m, cx, cy, r) => {
  let s = crc(cx, cy, r, '#FFFFFF', '#111827', 3);
  for (let i = 0; i < 12; i++) {
    const a = i * Math.PI / 6;
    s += ln(cx + Math.sin(a) * (r - 8), cy - Math.cos(a) * (r - 8),
      cx + Math.sin(a) * (r - 3), cy - Math.cos(a) * (r - 3), '#111827', 2);
  }
  const names = ['12', '3', '6', '9'];
  for (let k = 0; k < 4; k++) {
    const a = k * Math.PI / 2;
    s += T(cx + Math.sin(a) * (r - 17), cy - Math.cos(a) * (r - 17) + 5, 13, names[k]);
  }
  const ha = ((h % 12) + m / 60) * Math.PI / 6, ma = (m / 60) * 2 * Math.PI;
  s += ln(cx, cy, cx + Math.sin(ha) * r * 0.5, cy - Math.cos(ha) * r * 0.5, '#111827', 5);
  s += ln(cx, cy, cx + Math.sin(ma) * r * 0.78, cy - Math.cos(ma) * r * 0.78, '#EF4444', 3);
  return s + crc(cx, cy, 3.5, '#111827');
};

// month calendar; startCol 0 = Monday
const cal = (startCol, days) => {
  const cw = 34, chh = 26, x0 = 8, y0 = 26;
  const hd = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  let s = '';
  for (let c = 0; c < 7; c++) s += T(x0 + c * cw + cw / 2, 18, 11, hd[c]);
  let d = 1, row = 0, col = startCol;
  while (d <= days) {
    const x = x0 + col * cw, y = y0 + row * chh;
    s += rct(x, y, cw - 2, chh - 2, '#F3F4F6', '#9CA3AF', 1) + T(x + 16, y + 18, 13, String(d));
    d++; col++;
    if (col === 7) { col = 0; row++; }
  }
  return s;
};
const calH = (startCol, days) => 26 + Math.ceil((startCol + days) / 7) * 26 + 8;

// money
const coin = (cx, cy, label) => crc(cx, cy, 24, '#FCD34D', '#B45309', 2.5) +
  crc(cx, cy, 19, 'none', '#B45309', 1) + T(cx, cy + 5, 13, label);
const note = (x, y, label) => rct(x, y, 84, 46, '#BBF7D0', '#15803D', 2.5) +
  rct(x + 6, y + 6, 72, 34, 'none', '#15803D', 1) + T(x + 42, y + 30, 17, label);

// misc objects
const star = (cx, cy, r1, fill) => {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? r1 : r1 * 0.45, a = -Math.PI / 2 + i * Math.PI / 5;
    pts.push(R(cx + r * Math.cos(a)) + ',' + R(cy + r * Math.sin(a)));
  }
  return poly(pts.join(' '), fill || '#FACC15', '#B45309', 2);
};
const hexa = (cx, cy, r, fill) => {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 3;
    pts.push(R(cx + r * Math.cos(a)) + ',' + R(cy + r * Math.sin(a)));
  }
  return poly(pts.join(' '), fill || '#A855F7', '#6B21A8', 2);
};
const diamond = (cx, cy, r, fill) =>
  poly(R(cx) + ',' + R(cy - r) + ' ' + R(cx + r * 0.7) + ',' + R(cy) + ' ' +
    R(cx) + ',' + R(cy + r) + ' ' + R(cx - r * 0.7) + ',' + R(cy), fill || '#EC4899', '#9D174D', 2);
const tri = (cx, cy, r, fill) =>
  poly(R(cx) + ',' + R(cy - r) + ' ' + R(cx + r * 0.9) + ',' + R(cy + r * 0.75) + ' ' +
    R(cx - r * 0.9) + ',' + R(cy + r * 0.75), fill || '#22C55E', '#15803D', 2);
const car = (x, y, num) =>
  rct(x, y + 12, 46, 18, '#3B82F6', '#1D4ED8', 2) +
  rct(x + 10, y, 24, 13, '#BFDBFE', '#1D4ED8', 2) +
  crc(x + 12, y + 32, 6, '#111827') + crc(x + 34, y + 32, 6, '#111827') +
  T(x + 23, y + 26, 13, num);

// ---------------------------------------------------------------- numbers ---

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g2mth-num-061', chapterId:CH_NUM, difficulty:1, subsection:'place_value',
    question:
      fig(230, 90, 280, 'tall bars and small squares standing for tens and ones',
        blocksC(3, 4, 230, 15)) +
      'Each tall bar is one ten and each small square is one. What number is shown?',
    options:['34','43','7','304'], answer:'34',
    hint:'Count the tall bars first, then the little squares.',
    explanation:'3 tall bars are <b>3 tens = 30</b>, and 4 small squares are <b>4 ones</b>. 30 + 4 = <b>34</b>.' }),

  makeMCQ({ id:'g2mth-num-062', chapterId:CH_NUM, difficulty:1, subsection:'place_value',
    question:
      fig(220, 110, 250, 'a two-column chart with a digit in each column',
        rct(25, 20, 170, 76, '#FFFFFF', '#111827', 2.5) +
        ln(110, 20, 110, 96, '#111827', 2.5) + ln(25, 54, 195, 54, '#111827', 2.5) +
        rct(25, 20, 170, 34, '#E0E7FF') +
        T(67, 44, 16, 'Tens') + T(152, 44, 16, 'Ones') +
        T(67, 86, 26, '6') + T(152, 86, 26, '0')) +
      'What number does this place-value chart show?',
    options:['60','6','16','66'], answer:'60',
    hint:'The Tens column tells you how many tens, the Ones column how many ones.',
    explanation:'6 tens and 0 ones is <b>60</b>. The 0 keeps the ones place empty — it is not nothing, it holds the place.' }),

  makeMCQ({ id:'g2mth-num-063', chapterId:CH_NUM, difficulty:2, subsection:'place_value',
    question:
      fig(230, 90, 280, 'tall bars and small squares standing for tens and ones',
        blocksC(4, 7, 230, 15)) +
      'How many <b>tens</b> are in the number shown?',
    options:['4','7','47','11'], answer:'4',
    hint:'Only the tall bars are tens. Do not count the little squares.',
    explanation:'There are 4 tall bars, so the number has <b>4 tens</b>. The number itself is 47.' }),

  makeMCQ({ id:'g2mth-num-064', chapterId:CH_NUM, difficulty:2, subsection:'place_value',
    question:
      fig(274, 242, 320, 'four pictures of bars and squares, each labelled with a letter',
        grid4([
          blocks(2, 5, 12, 26), blocks(5, 2, 12, 26),
          blocks(2, 3, 12, 26), blocks(3, 5, 12, 26)
        ])) +
      'Each tall bar is ten and each small square is one. Which picture shows <b>25</b>?',
    options:['A','B','C','D'], answer:'A',
    hint:'25 means 2 tens and 5 ones — look for 2 tall bars.',
    explanation:'Picture <b>A</b> has 2 tall bars (20) and 5 small squares (5). 20 + 5 = 25.' }),

  makeMCQ({ id:'g2mth-num-065', chapterId:CH_NUM, difficulty:1, subsection:'ordering_comparing',
    question:
      fig(300, 110, 320, 'a number line with an arrow pointing at one mark',
        numline(['30', '', '50', '60', '70']) +
        arrowDown(nlx(1, 5), 30, 66, '#EF4444')) +
      'What number does the arrow point to?',
    options:['40','35','45','31'], answer:'40',
    hint:'The marks go up by the same amount each time. What comes after 30?',
    explanation:'The line counts in tens: 30, <b>40</b>, 50, 60, 70. The arrow is on 40.' }),

  makeMCQ({ id:'g2mth-num-066', chapterId:CH_NUM, difficulty:2, subsection:'ordering_comparing',
    question:
      fig(250, 190, 280, 'two pictures of bars and squares, one above the other',
        T(16, 52, 16, 'A') + blocks(3, 6, 40, 20) +
        T(16, 142, 16, 'B') + blocks(6, 3, 40, 110)) +
      'Each tall bar is ten and each small square is one. Which picture shows the <b>greater</b> number?',
    options:['picture B','picture A','both equal','neither one'], answer:'picture B',
    hint:'Tens are worth much more than ones — count the tall bars first.',
    explanation:'A is 36 and B is 63. Both use 9 pieces, but B has <b>6 tens</b>, so <b>picture B</b> is greater.' }),

  makeMCQ({ id:'g2mth-num-067', chapterId:CH_NUM, difficulty:2, subsection:'ordering_comparing',
    question:
      fig(300, 130, 330, 'a number line with four lettered flags on it',
        grp(0, 20, numline(['0', '', '20', '', '40', '', '60', '', '80', '', '100']) +
          (function () {
            const P = [[2, 'A', '#EF4444'], [5, 'B', '#3B82F6'], [7, 'C', '#22C55E'], [9, 'D', '#A855F7']];
            let s = '';
            for (let i = 0; i < 4; i++) {
              const x = nlx(P[i][0], 11);
              s += ln(x, NLY, x, NLY - 34, '#111827', 2) +
                poly(R(x) + ',' + (NLY - 34) + ' ' + R(x + 18) + ',' + (NLY - 28) + ' ' + R(x) + ',' + (NLY - 22), P[i][2]) +
                T(x + 8, NLY - 40, 13, P[i][1]);
            }
            return s;
          })())) +
      'The line counts in tens. Which flag is standing on <b>70</b>?',
    options:['A','B','C','D'], answer:'C',
    hint:'Start at a labelled mark and count on in tens to 70.',
    explanation:'Counting 0, 10, 20 … the flags stand on 20, 50, 70 and 90. Flag <b>C</b> is on 70.' }),

  makeMCQ({ id:'g2mth-num-068', chapterId:CH_NUM, difficulty:1, subsection:'odd_even_100',
    question:
      fig(270, 130, 300, 'counters, most of them drawn inside rings in twos',
        (function () {
          const P = [[30, 38], [110, 38], [190, 38], [30, 95]];
          let s = '';
          for (let i = 0; i < 4; i++) {
            s += ell(P[i][0] + 13, P[i][1], 26, 16, 'none', '#F97316', 2.5) +
              crc(P[i][0], P[i][1], 9, '#3B82F6', '#1D4ED8', 2) + crc(P[i][0] + 26, P[i][1], 9, '#3B82F6', '#1D4ED8', 2);
          }
          return s + crc(120, 95, 9, '#3B82F6', '#1D4ED8', 2);
        })()) +
      'The counters have been put into pairs. How many counters are <b>not</b> in a pair?',
    options:['1','0','2','4'], answer:'1',
    hint:'Look for a counter with no ring around it.',
    explanation:'There are 9 counters: 4 pairs and <b>1</b> left over. A number that leaves one over when you pair it is an <b>odd</b> number.' }),

  makeMCQ({ id:'g2mth-num-069', chapterId:CH_NUM, difficulty:1, subsection:'odd_even_100',
    question:
      fig(280, 60, 320, 'a strip of ten numbered boxes, some of them shaded',
        (function () {
          let s = '';
          for (let i = 0; i < 10; i++) {
            const n = 41 + i, x = 8 + i * 26;
            s += rct(x, 15, 24, 30, (n % 2 === 0) ? '#FDE68A' : '#F3F4F6', '#9CA3AF', 1.5) + T(x + 12, 36, 13, String(n));
          }
          return s;
        })()) +
      'Look only at the shaded boxes. All of those numbers are —',
    options:['even','odd','tens','ones'], answer:'even',
    hint:'Try sharing each shaded number into two equal groups.',
    explanation:'42, 44, 46, 48 and 50 all split into two equal groups, so they are <b>even</b>. Even numbers end in 0, 2, 4, 6 or 8.' }),

  makeMCQ({ id:'g2mth-num-070', chapterId:CH_NUM, difficulty:2, subsection:'odd_even_100',
    question:
      fig(280, 90, 320, 'four lettered boxes, each holding a number',
        (function () {
          const v = ['13', '16', '17', '19'];
          let s = '';
          for (let i = 0; i < 4; i++) {
            const x = 14 + i * 66;
            s += T(x + 26, 22, 14, 'ABCD'[i]) + rct(x, 30, 52, 44, '#E0E7FF', '#4338CA', 2) + T(x + 26, 61, 22, v[i]);
          }
          return s;
        })()) +
      'Which letter is above an <b>even</b> number?',
    options:['A','B','C','D'], answer:'B',
    hint:'An even number can be shared fairly between two people with none left over.',
    explanation:'16 shares into 8 and 8 with nothing left over, so 16 is even. The answer is <b>B</b>. 13, 17 and 19 are all odd.' })
);

// --------------------------------------------------------------- addition ---

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g2mth-add-061', chapterId:CH_ADD, difficulty:1, subsection:'mental_addition',
    question:
      fig(300, 110, 320, 'a number line with two curved jumps drawn above it',
        numline(['24', '', '34', '', '44']) +
        hop(nlx(0, 5), nlx(2, 5), '+10') + hop(nlx(2, 5), nlx(4, 5), '+10')) +
      'The frog starts on 24 and makes the two jumps shown. Where does it land?',
    options:['44','34','46','54'], answer:'44',
    hint:'Two jumps of 10 is the same as adding 20.',
    explanation:'24 + 10 = 34, then 34 + 10 = <b>44</b>. Adding tens only changes the tens digit.' }),

  makeMCQ({ id:'g2mth-add-062', chapterId:CH_ADD, difficulty:1, subsection:'mental_addition',
    question:
      fig(200, 145, 240, 'a ten-frame with some counters, and more counters below it',
        rct(20, 18, 160, 64, '#FFFFFF', '#111827', 2.5) +
        ln(52, 18, 52, 82, '#111827', 1.2) + ln(84, 18, 84, 82, '#111827', 1.2) +
        ln(116, 18, 116, 82, '#111827', 1.2) + ln(148, 18, 148, 82, '#111827', 1.2) +
        ln(20, 50, 180, 50, '#111827', 1.2) +
        dots(7, 5, 36, 34, 32, 12, '#3B82F6') +
        dots(5, 5, 36, 116, 32, 12, '#F97316')) +
      'How many counters are there altogether?',
    options:['12','11','13','10'], answer:'12',
    hint:'Move counters up to fill the frame first, then count what is left over.',
    explanation:'3 orange counters fill the frame to make 10, and 2 orange counters are left. 10 + 2 = <b>12</b>.' }),

  makeMCQ({ id:'g2mth-add-063', chapterId:CH_ADD, difficulty:2, subsection:'mental_addition',
    question:
      fig(280, 120, 300, 'a bar diagram with a long bar above two shorter bars',
        rct(20, 20, 240, 34, '#E5E7EB', '#374151', 2) + T(140, 44, 20, '?') +
        rct(20, 66, 131, 34, '#BFDBFE', '#1D4ED8', 2) + T(85, 90, 18, '30') +
        rct(151, 66, 109, 34, '#FDE68A', '#B45309', 2) + T(205, 90, 18, '25')) +
      'The two short bars together make the long bar. What number goes where the <b>?</b> is?',
    options:['55','5','65','50'], answer:'55',
    hint:'The whole bar is made of both parts, so put the parts together.',
    explanation:'30 + 25 = <b>55</b>. In a bar model the long bar is always the whole.' }),

  makeMCQ({ id:'g2mth-add-064', chapterId:CH_ADD, difficulty:2, subsection:'mental_addition',
    question:
      fig(300, 110, 320, 'a number line with one curved jump drawn above it',
        numline(['36', '37', '38', '39', '40']) + hop(nlx(0, 5), nlx(4, 5), '?')) +
      'The jump starts on 36 and lands on 40. How big is the jump?',
    options:['4','6','14','3'], answer:'4',
    hint:'Count the small steps from 36 up to 40.',
    explanation:'37, 38, 39, 40 — that is <b>4</b> steps. So 36 + 4 = 40.' }),

  makeMCQ({ id:'g2mth-add-065', chapterId:CH_ADD, difficulty:1, subsection:'column_addition',
    question:
      fig(180, 175, 165, 'a sum written in columns', colsum('42', '35', '+', '')) +
      'Work out this sum. What is the answer?',
    options:['77','87','7','76'], answer:'77',
    hint:'Add the ones column first, then the tens column.',
    explanation:'2 + 5 = 7 ones, and 4 + 3 = 7 tens. The answer is <b>77</b>.' }),

  makeMCQ({ id:'g2mth-add-066', chapterId:CH_ADD, difficulty:2, subsection:'column_addition',
    question:
      fig(180, 175, 165, 'a sum written in columns with an empty box in place of one digit',
        colsum('2#', '14', '+', '39')) +
      'Which digit belongs in the red box?',
    options:['5','3','4','6'], answer:'5',
    hint:'Look at the ones column only: something add 4 makes 9.',
    explanation:'In the ones column, ? + 4 = 9, so ? is <b>5</b>. Checking: 25 + 14 = 39.' }),

  makeMCQ({ id:'g2mth-add-067', chapterId:CH_ADD, difficulty:2, subsection:'column_addition',
    question:
      fig(180, 175, 165, 'a sum written in columns with a small empty box above the left column',
        colsum('27', '15', '+', '', { carry:true, hi:true })) +
      'In the shaded ones column, 7 + 5 = 12. Which digit is carried into the small box above the tens?',
    options:['1','2','12','0'], answer:'1',
    hint:'12 is one ten and two ones. Only the tens part moves across.',
    explanation:'12 ones become <b>1</b> ten and 2 ones. The 2 stays in the ones column and the <b>1</b> is carried to the tens.' }),

  makeMCQ({ id:'g2mth-add-068', chapterId:CH_ADD, difficulty:1, subsection:'addition_problems',
    question:
      fig(220, 165, 250, 'two piles of flat rectangles of different heights',
        (function () {
          let s = '';
          for (let i = 0; i < 6; i++) s += rct(20, 142 - i * 15, 74, 13, '#93C5FD', '#1D4ED8', 1.8);
          for (let i = 0; i < 8; i++) s += rct(120, 142 - i * 15, 74, 13, '#86EFAC', '#15803D', 1.8);
          return s;
        })()) +
      'Meena already has the pile of books on the left. Her sister gives her the pile on the right. How many books does Meena have now?',
    options:['14','13','15','12'], answer:'14',
    hint:'Count each pile, then put the two numbers together.',
    explanation:'The left pile has 6 books and the right pile has 8. 6 + 8 = <b>14</b> books.' }),

  makeMCQ({ id:'g2mth-add-069', chapterId:CH_ADD, difficulty:2, subsection:'addition_problems',
    question:
      fig(280, 120, 300, 'a bar diagram with a long bar above two shorter bars',
        rct(20, 20, 240, 34, '#E5E7EB', '#374151', 2) + T(140, 44, 20, '50') +
        rct(20, 66, 144, 34, '#BFDBFE', '#1D4ED8', 2) + T(92, 90, 18, '30') +
        rct(164, 66, 96, 34, '#FDE68A', '#B45309', 2) + T(212, 90, 20, '?')) +
      'Ravi read 50 pages in all. He read 30 pages on Monday and the rest on Tuesday. How many pages did he read on Tuesday?',
    options:['20','30','80','25'], answer:'20',
    hint:'Count up from 30 until you reach 50.',
    explanation:'30 + <b>20</b> = 50, so Ravi read 20 pages on Tuesday.' }),

  makeMCQ({ id:'g2mth-add-070', chapterId:CH_ADD, difficulty:2, subsection:'addition_problems',
    question:
      fig(300, 140, 320, 'three rings, each holding some dots',
        ell(55, 70, 42, 32, 'none', '#F97316', 2.5) + dots(10, 5, 27, 60, 14, 5, '#3B82F6') +
        ell(150, 70, 42, 38, 'none', '#F97316', 2.5) + dots(15, 5, 122, 53, 14, 5, '#22C55E') +
        ell(245, 70, 42, 26, 'none', '#F97316', 2.5) + dots(5, 5, 217, 70, 14, 5, '#A855F7')) +
      'Each ring holds rows of 5 dots. How many dots are there altogether?',
    options:['30','25','35','20'], answer:'30',
    hint:'Count the rows of 5 in each ring instead of counting one dot at a time.',
    explanation:'The rings hold 10, 15 and 5 dots. 10 + 15 = 25, and 25 + 5 = <b>30</b>.' })
);

// ------------------------------------------------------------ subtraction ---

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g2mth-sub-061', chapterId:CH_SUB, difficulty:1, subsection:'mental_subtraction',
    question:
      fig(190, 110, 230, 'a ten-frame holding counters, some marked with a cross',
        rct(15, 15, 160, 64, '#FFFFFF', '#111827', 2.5) +
        ln(47, 15, 47, 79, '#111827', 1.2) + ln(79, 15, 79, 79, '#111827', 1.2) +
        ln(111, 15, 111, 79, '#111827', 1.2) + ln(143, 15, 143, 79, '#111827', 1.2) +
        ln(15, 47, 175, 47, '#111827', 1.2) +
        dots(9, 5, 31, 31, 32, 12, '#3B82F6') +
        (function () {
          let s = '';
          for (let i = 0; i < 4; i++) {
            const x = 31 + i * 32;
            s += ln(x - 9, 22, x + 9, 40, '#EF4444', 3) + ln(x + 9, 22, x - 9, 40, '#EF4444', 3);
          }
          return s;
        })()) +
      'The counters with a red cross are taken away. How many counters are left?',
    options:['5','6','4','13'], answer:'5',
    hint:'Count only the counters with no cross on them.',
    explanation:'There were 9 counters and 4 were taken away. 9 − 4 = <b>5</b> left.' }),

  makeMCQ({ id:'g2mth-sub-062', chapterId:CH_SUB, difficulty:1, subsection:'mental_subtraction',
    question:
      fig(300, 110, 320, 'a number line with one curved jump going backwards',
        numline(['35', '', '45']) + hop(nlx(2, 3), nlx(0, 3), 'back 10')) +
      'The jump starts on 45 and goes backwards. Where does it land?',
    options:['35','55','34','30'], answer:'35',
    hint:'Going back 10 makes the tens digit one smaller.',
    explanation:'45 − 10 = <b>35</b>. The ones digit stays as 5.' }),

  makeMCQ({ id:'g2mth-sub-063', chapterId:CH_SUB, difficulty:2, subsection:'mental_subtraction',
    question:
      fig(300, 110, 320, 'a number line with one curved jump above it',
        numline(['28', '30', '32', '34', '36', '38', '40']) + hop(nlx(0, 7), nlx(6, 7), '?')) +
      'How far is it from 28 to 40 on this line?',
    options:['12','18','22','13'], answer:'12',
    hint:'Hop to 30 first, then count on in tens and twos.',
    explanation:'28 to 30 is 2, and 30 to 40 is 10. 2 + 10 = <b>12</b>, so 40 − 28 = 12.' }),

  makeMCQ({ id:'g2mth-sub-064', chapterId:CH_SUB, difficulty:2, subsection:'mental_subtraction',
    question:
      fig(280, 120, 300, 'a bar diagram with a long bar above two shorter bars',
        rct(20, 20, 240, 34, '#E5E7EB', '#374151', 2) + T(140, 44, 20, '60') +
        rct(20, 66, 100, 34, '#FDE68A', '#B45309', 2) + T(70, 90, 18, '25') +
        rct(120, 66, 140, 34, '#BFDBFE', '#1D4ED8', 2) + T(190, 90, 20, '?')) +
      'The whole bar is 60. One part is 25. What is the other part?',
    options:['35','45','85','30'], answer:'35',
    hint:'Take the part you know away from the whole.',
    explanation:'60 − 25 = <b>35</b>. You can check it: 25 + 35 = 60.' }),

  makeMCQ({ id:'g2mth-sub-065', chapterId:CH_SUB, difficulty:1, subsection:'column_subtraction',
    question:
      fig(180, 175, 165, 'a subtraction written in columns', colsum('68', '23', '−', '')) +
      'Work out this subtraction. What is the answer?',
    options:['45','44','35','85'], answer:'45',
    hint:'Take away the ones first, then the tens.',
    explanation:'8 − 3 = 5 ones and 6 − 2 = 4 tens, so the answer is <b>45</b>.' }),

  makeMCQ({ id:'g2mth-sub-066', chapterId:CH_SUB, difficulty:2, subsection:'column_subtraction',
    question:
      fig(180, 175, 165, 'a subtraction written in columns with an empty box in place of one digit',
        colsum('5#', '21', '−', '36')) +
      'Which digit belongs in the red box?',
    options:['7','5','6','8'], answer:'7',
    hint:'In the ones column, something take away 1 leaves 6.',
    explanation:'? − 1 = 6, so ? is <b>7</b>. Checking: 57 − 21 = 36.' }),

  makeMCQ({ id:'g2mth-sub-067', chapterId:CH_SUB, difficulty:2, subsection:'column_subtraction',
    question:
      fig(200, 140, 280, 'bars and squares, with one bar ringed and an arrow pointing down to a row of squares',
        blocks(4, 2, 20, 15) +
        ell(77, 45, 13, 36, 'none', '#EF4444', 2.5) +
        arrowDown(77, 86, 106, '#EF4444') +
        (function () {
          let s = '';
          for (let i = 0; i < 10; i++) s += rct(20 + i * 17, 112, 10, 10, '#FDBA74', '#C2410C', 1.5);
          return s;
        })()) +
      'The picture shows 42. To take away 7 ones we swap the ringed ten for ten ones. How many ones are there then?',
    options:['12','10','2','11'], answer:'12',
    hint:'Add the ten new ones to the ones that were already there.',
    explanation:'42 had 2 ones. The ringed ten becomes 10 more ones: 10 + 2 = <b>12</b> ones. Now 12 − 7 is easy.' }),

  makeMCQ({ id:'g2mth-sub-068', chapterId:CH_SUB, difficulty:1, subsection:'subtraction_problems',
    question:
      fig(240, 150, 270, 'a tray of oval shapes, some marked with a cross',
        rct(10, 10, 220, 130, '#FEF3C7', '#92400E', 2.5) +
        (function () {
          let s = '';
          for (let i = 0; i < 15; i++) {
            const cx = 32 + (i % 5) * 44, cy = 34 + Math.floor(i / 5) * 42;
            s += ell(cx, cy, 15, 18, '#FFFFFF', '#111827', 2);
            if (i < 6) s += ln(cx - 11, cy - 13, cx + 11, cy + 13, '#EF4444', 3) + ln(cx + 11, cy - 13, cx - 11, cy + 13, '#EF4444', 3);
          }
          return s;
        })()) +
      'Mum uses the eggs marked with a cross. How many eggs are left in the tray?',
    options:['9','8','10','21'], answer:'9',
    hint:'Count all the eggs first, then count only the ones with a cross.',
    explanation:'There are 15 eggs and 6 are used. 15 − 6 = <b>9</b> eggs left.' }),

  makeMCQ({ id:'g2mth-sub-069', chapterId:CH_SUB, difficulty:2, subsection:'subtraction_problems',
    question:
      fig(220, 180, 250, 'two upright bars of different heights with a gap marked between the tops',
        ln(25, 152, 200, 152, '#111827', 2.5) +
        rct(45, 30, 50, 122, '#86EFAC', '#15803D', 2) + T(70, 22, 14, '24 cm') +
        rct(120, 65, 50, 87, '#86EFAC', '#15803D', 2) + T(145, 57, 14, '17 cm') +
        ln(185, 30, 185, 65, '#EF4444', 2.5) +
        ln(178, 30, 192, 30, '#EF4444', 2.5) + ln(178, 65, 192, 65, '#EF4444', 2.5) +
        T(200, 52, 16, '?')) +
      'Two plants are measured. How much <b>taller</b> is the plant on the left?',
    options:['7 cm','6 cm','8 cm','41 cm'], answer:'7 cm',
    hint:'The red gap is the difference. Take the shorter height from the taller one.',
    explanation:'24 − 17 = <b>7 cm</b>. Comparing means subtracting, not adding.' }),

  makeMCQ({ id:'g2mth-sub-070', chapterId:CH_SUB, difficulty:2, subsection:'subtraction_problems',
    question:
      fig(280, 120, 300, 'a bar diagram with a long bar above two shorter bars',
        rct(20, 20, 240, 34, '#E5E7EB', '#374151', 2) + T(140, 44, 20, '?') +
        rct(20, 66, 95, 34, '#FDE68A', '#B45309', 2) + T(67, 90, 18, '13') +
        rct(115, 66, 145, 34, '#BFDBFE', '#1D4ED8', 2) + T(187, 90, 18, '20')) +
      'A shop had some loaves of bread. 13 were sold and 20 are still on the shelf. How many loaves were there at the start?',
    options:['33','7','23','30'], answer:'33',
    hint:'The sold loaves and the left loaves together make the whole.',
    explanation:'13 + 20 = <b>33</b> loaves at the start. When the start is missing you add the parts back together.' })
);

// --------------------------------------------------------- multiplication ---

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g2mth-mul-061', chapterId:CH_MUL, difficulty:1, subsection:'repeated_addition',
    question:
      fig(170, 140, 200, 'dots arranged in equal rows',
        dots(12, 4, 32, 32, 36, 13, '#3B82F6')) +
      'Which addition matches this picture of rows?',
    options:['4 + 4 + 4','3 + 3 + 3','4 + 4','3 + 4'], answer:'4 + 4 + 4',
    hint:'How many rows are there, and how many dots are in each row?',
    explanation:'There are 3 rows with 4 dots in each row, so it is <b>4 + 4 + 4</b> = 12.' }),

  makeMCQ({ id:'g2mth-mul-062', chapterId:CH_MUL, difficulty:1, subsection:'repeated_addition',
    question:
      fig(220, 180, 250, 'four rings, each holding the same number of dots',
        (function () {
          const P = [[60, 50], [160, 50], [60, 130], [160, 130]];
          let s = '';
          for (let i = 0; i < 4; i++) {
            s += ell(P[i][0], P[i][1], 42, 34, 'none', '#F97316', 2.5);
            s += dots(3, 3, P[i][0] - 22, P[i][1] - 12, 22, 7, '#22C55E');
            s += dots(2, 2, P[i][0] - 11, P[i][1] + 14, 22, 7, '#22C55E');
          }
          return s;
        })()) +
      'Each ring holds the same number of dots. How many dots are there altogether?',
    options:['20','9','15','25'], answer:'20',
    hint:'Count one ring, then count in that size: 5, 10, 15 …',
    explanation:'Each ring has 5 dots and there are 4 rings. 5 + 5 + 5 + 5 = <b>20</b>, which is 4 × 5.' }),

  makeMCQ({ id:'g2mth-mul-063', chapterId:CH_MUL, difficulty:2, subsection:'repeated_addition',
    question:
      fig(280, 110, 300, 'dots arranged in equal rows',
        dots(12, 6, 40, 38, 40, 13, '#A855F7')) +
      'Which multiplication matches this picture?',
    options:['2 × 6','3 × 6','2 × 4','6 × 6'], answer:'2 × 6',
    hint:'Say the number of rows first, then the number in each row.',
    explanation:'There are 2 rows of 6 dots, so the picture shows <b>2 × 6</b> = 12.' }),

  makeMCQ({ id:'g2mth-mul-064', chapterId:CH_MUL, difficulty:2, subsection:'repeated_addition',
    question:
      fig(274, 242, 320, 'four pictures of dots in rows, each labelled with a letter',
        grid4([
          dots(6, 2, 46, 34, 32, 9, '#3B82F6'),
          dots(4, 2, 46, 44, 32, 9, '#3B82F6'),
          dots(9, 3, 34, 34, 30, 9, '#3B82F6'),
          dots(8, 2, 46, 30, 26, 9, '#3B82F6')
        ])) +
      'Which picture shows <b>3 rows of 2</b> dots?',
    options:['A','B','C','D'], answer:'A',
    hint:'Count the rows going down, then the dots across one row.',
    explanation:'Picture <b>A</b> has 3 rows with 2 dots in each row. 3 × 2 = 6 dots.' }),

  makeMCQ({ id:'g2mth-mul-065', chapterId:CH_MUL, difficulty:1, subsection:'times_2',
    question:
      fig(300, 110, 320, 'a number line with five equal curved jumps above it',
        numline(['0', '2', '4', '6', '8', '10']) +
        hop(nlx(0, 6), nlx(1, 6), '') + hop(nlx(1, 6), nlx(2, 6), '') +
        hop(nlx(2, 6), nlx(3, 6), '') + hop(nlx(3, 6), nlx(4, 6), '') +
        hop(nlx(4, 6), nlx(5, 6), '')) +
      'The frog starts at 0 and makes 5 equal jumps. What is 5 × 2?',
    options:['10','7','12','8'], answer:'10',
    hint:'Each jump is 2. Count in twos five times.',
    explanation:'2, 4, 6, 8, <b>10</b>. Five jumps of 2 land on 10, so 5 × 2 = 10.' }),

  makeMCQ({ id:'g2mth-mul-066', chapterId:CH_MUL, difficulty:1, subsection:'times_2',
    question:
      fig(300, 90, 320, 'seven boxes in a row, each holding the same number of dots',
        (function () {
          let s = '';
          for (let i = 0; i < 7; i++) {
            const x = 12 + i * 40;
            s += rct(x, 22, 34, 48, '#FEF3C7', '#B45309', 2) +
              crc(x + 17, 36, 7, '#EF4444', '#991B1B', 1.5) + crc(x + 17, 56, 7, '#EF4444', '#991B1B', 1.5);
          }
          return s;
        })()) +
      'Every box holds the same number of dots. How many dots are there in all the boxes?',
    options:['14','9','12','16'], answer:'14',
    hint:'Count the boxes, then count on in twos.',
    explanation:'7 boxes with 2 dots each: 2, 4, 6, 8, 10, 12, <b>14</b>. So 7 × 2 = 14.' }),

  makeMCQ({ id:'g2mth-mul-067', chapterId:CH_MUL, difficulty:2, subsection:'times_2',
    question:
      fig(300, 110, 320, 'dots arranged in two equal rows',
        dots(16, 8, 30, 40, 34, 11, '#22C55E')) +
      'This picture shows 2 rows of 8. How many dots are there?',
    options:['16','10','18','14'], answer:'16',
    hint:'Two rows of 8 is the same as 8 twos — count in twos down the columns.',
    explanation:'2 × 8 = <b>16</b>. Turning the picture on its side makes 8 × 2, and that is 16 too.' }),

  makeMCQ({ id:'g2mth-mul-068', chapterId:CH_MUL, difficulty:1, subsection:'times_5_10',
    question:
      fig(300, 110, 320, 'a number line with five equal curved jumps above it',
        numline(['0', '5', '10', '15', '20', '25']) +
        hop(nlx(0, 6), nlx(1, 6), '') + hop(nlx(1, 6), nlx(2, 6), '') +
        hop(nlx(2, 6), nlx(3, 6), '') + hop(nlx(3, 6), nlx(4, 6), '') +
        hop(nlx(4, 6), nlx(5, 6), '')) +
      'Each jump is 5 and there are 5 jumps. What is 5 × 5?',
    options:['25','20','30','10'], answer:'25',
    hint:'Count in fives: 5, 10, 15 …',
    explanation:'5, 10, 15, 20, <b>25</b>. Five jumps of 5 land on 25.' }),

  makeMCQ({ id:'g2mth-mul-069', chapterId:CH_MUL, difficulty:1, subsection:'times_5_10',
    question:
      fig(140, 90, 190, 'six tall ruled bars standing side by side', blocks(6, 0, 14, 15)) +
      'Each tall bar is made of 10 small squares. How many small squares are there altogether?',
    options:['60','16','70','600'], answer:'60',
    hint:'Count the bars, then count in tens.',
    explanation:'There are 6 bars of 10: 10, 20, 30, 40, 50, <b>60</b>. So 6 × 10 = 60.' }),

  makeMCQ({ id:'g2mth-mul-070', chapterId:CH_MUL, difficulty:2, subsection:'times_5_10',
    question:
      fig(300, 160, 330, 'two blocks of dots side by side, each labelled with a letter',
        T(95, 26, 15, 'A') + dots(30, 10, 20, 46, 18, 6, '#3B82F6') +
        T(250, 26, 15, 'B') + dots(25, 5, 215, 46, 18, 6, '#F97316')) +
      'Block A has 3 rows of 10. Block B has 5 rows of 5. How many <b>more</b> dots has A than B?',
    options:['5','3','10','2'], answer:'5',
    hint:'Work out each block with a times fact, then compare.',
    explanation:'A is 3 × 10 = 30 and B is 5 × 5 = 25. 30 − 25 = <b>5</b> more dots.' })
);

// -------------------------------------------------------------- fractions ---

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g2mth-frc-061', chapterId:CH_FRC, difficulty:1, subsection:'half',
    question:
      fig(120, 120, 140, 'a circle divided into equal parts with one part shaded',
        pieSlice(60, 60, 48, -90, 90, '#3B82F6') + pieSlice(60, 60, 48, 90, 270, '#FFFFFF')) +
      'What fraction of the circle is shaded blue?',
    options:['one half','one quarter','one third','one whole'], answer:'one half',
    hint:'How many equal pieces is the circle cut into?',
    explanation:'The circle is cut into 2 equal pieces and 1 is shaded, so <b>one half</b> is shaded.' }),

  makeTF({ id:'g2mth-frc-062', chapterId:CH_FRC, difficulty:2, subsection:'half',
    question:
      fig(200, 110, 250, 'a rectangle split into two parts, one of them shaded',
        rct(10, 20, 180, 70, '#FFFFFF', '#111827', 2.5) +
        rct(10, 20, 60, 70, '#F97316', '#111827', 2.5) +
        ln(70, 20, 70, 90, '#111827', 2.5)) +
      'The shaded part of this shape is one half.',
    answer:false,
    hint:'For a half, both pieces must be exactly the same size.',
    explanation:'The two pieces are <b>not equal</b> — the shaded piece is much smaller. Two pieces only make halves when they match.' }),

  makeMCQ({ id:'g2mth-frc-063', chapterId:CH_FRC, difficulty:1, subsection:'half',
    question:
      fig(300, 80, 320, 'a row of circles, some of them shaded',
        (function () {
          let s = '';
          for (let i = 0; i < 8; i++) s += crc(25 + i * 36, 40, 15, i < 4 ? '#A855F7' : '#FFFFFF', '#111827', 2.5);
          return s;
        })()) +
      'What fraction of the circles is shaded?',
    options:['one half','one quarter','one third','all of them'], answer:'one half',
    hint:'Count the shaded circles and then the plain ones.',
    explanation:'4 of the 8 circles are shaded, and 4 is half of 8. So <b>one half</b> is shaded.' }),

  makeMCQ({ id:'g2mth-frc-064', chapterId:CH_FRC, difficulty:2, subsection:'half',
    question:
      fig(240, 110, 260, 'a rectangle divided into four equal parts with two of them shaded',
        (function () {
          let s = '';
          for (let i = 0; i < 4; i++) s += rct(20 + i * 50, 20, 50, 70, i < 2 ? '#22C55E' : '#FFFFFF', '#111827', 2.5);
          return s;
        })()) +
      'Two quarters of this bar are shaded. What is another name for the shaded amount?',
    options:['one half','one quarter','one third','three quarters'], answer:'one half',
    hint:'Cover the shaded part with your finger — is it the same size as the plain part?',
    explanation:'2 quarters is the same as <b>one half</b>, because the shaded part and the plain part are equal.' }),

  makeMCQ({ id:'g2mth-frc-065', chapterId:CH_FRC, difficulty:1, subsection:'quarter',
    question:
      fig(286, 92, 320, 'four squares divided into parts, each labelled with a letter',
        rowcells([
          rct(10, 22, 44, 44, '#FFFFFF', '#111827', 2) + rct(10, 22, 22, 22, '#3B82F6', '#111827', 2) +
            ln(32, 22, 32, 66, '#111827', 2) + ln(10, 44, 54, 44, '#111827', 2),
          rct(10, 22, 44, 44, '#FFFFFF', '#111827', 2) + rct(10, 22, 22, 44, '#3B82F6', '#111827', 2),
          rct(10, 22, 44, 44, '#FFFFFF', '#111827', 2) + rct(10, 22, 44, 22, '#3B82F6', '#111827', 2) +
            ln(32, 22, 32, 66, '#111827', 2) + ln(10, 44, 54, 44, '#111827', 2),
          rct(10, 22, 44, 44, '#FFFFFF', '#111827', 2) + rct(10, 22, 44, 15, '#3B82F6', '#111827', 2) +
            ln(10, 37, 54, 37, '#111827', 2) + ln(10, 51, 54, 51, '#111827', 2)
        ], 64, 80)) +
      'In which square is exactly <b>one quarter</b> shaded?',
    options:['A','B','C','D'], answer:'A',
    hint:'Look for a square cut into 4 equal pieces with only 1 piece shaded.',
    explanation:'Square <b>A</b> is cut into 4 equal parts with 1 shaded. B shows a half, C shows two quarters (a half) and D shows a third.' }),

  makeMCQ({ id:'g2mth-frc-066', chapterId:CH_FRC, difficulty:1, subsection:'quarter',
    question:
      fig(120, 120, 140, 'a circle divided into four equal parts with some parts shaded',
        pieSlice(60, 60, 48, -90, 0, '#EC4899') + pieSlice(60, 60, 48, 0, 90, '#EC4899') +
        pieSlice(60, 60, 48, 90, 180, '#EC4899') + pieSlice(60, 60, 48, 180, 270, '#FFFFFF')) +
      'This cake is cut into quarters. How many quarters are shaded?',
    options:['3','1','2','4'], answer:'3',
    hint:'Count the shaded pieces only.',
    explanation:'3 of the 4 equal pieces are shaded, so <b>3</b> quarters are shaded and 1 quarter is left.' }),

  makeTF({ id:'g2mth-frc-067', chapterId:CH_FRC, difficulty:2, subsection:'quarter',
    question:
      fig(280, 80, 300, 'a bar divided into eight equal parts with two parts shaded',
        (function () {
          let s = '';
          for (let i = 0; i < 8; i++) s += rct(20 + i * 30, 22, 30, 40, i < 2 ? '#F97316' : '#FFFFFF', '#111827', 2.5);
          return s;
        })()) +
      'One quarter of this chocolate bar is shaded.',
    answer:true,
    hint:'Split the bar into 4 equal groups and see how big one group is.',
    explanation:'8 squares split into 4 equal groups gives 2 squares in each group. 2 squares <b>are</b> one quarter of the bar.' }),

  makeMCQ({ id:'g2mth-frc-068', chapterId:CH_FRC, difficulty:1, subsection:'comparing_fractions',
    question:
      fig(250, 130, 280, 'two circles of the same size with different amounts shaded',
        pieSlice(62, 65, 48, -90, 90, '#3B82F6') + pieSlice(62, 65, 48, 90, 270, '#FFFFFF') +
        pieSlice(188, 65, 48, -90, 0, '#3B82F6') + pieSlice(188, 65, 48, 0, 90, '#FFFFFF') +
        pieSlice(188, 65, 48, 90, 180, '#FFFFFF') + pieSlice(188, 65, 48, 180, 270, '#FFFFFF')) +
      'Both circles are the same size. Which is bigger, one half or one quarter?',
    options:['one half','one quarter','they are equal','one whole'], answer:'one half',
    hint:'The more pieces you cut a cake into, the smaller each piece becomes.',
    explanation:'The shaded half on the left is clearly bigger than the shaded quarter on the right, so <b>one half</b> is bigger.' }),

  makeMCQ({ id:'g2mth-frc-069', chapterId:CH_FRC, difficulty:2, subsection:'comparing_fractions',
    question:
      fig(280, 130, 300, 'two bars of the same length, one cut into two parts and one into four',
        rct(20, 20, 240, 40, '#FFFFFF', '#111827', 2.5) + rct(20, 20, 120, 40, '#22C55E', '#111827', 2.5) +
        rct(20, 75, 240, 40, '#FFFFFF', '#111827', 2.5) + rct(20, 75, 120, 40, '#FACC15', '#111827', 2.5) +
        ln(80, 75, 80, 115, '#111827', 2.5) + ln(140, 75, 140, 115, '#111827', 2.5) + ln(200, 75, 200, 115, '#111827', 2.5)) +
      'The two bars are the same length. How many quarters cover the same amount as one half?',
    options:['2','1','4','3'], answer:'2',
    hint:'Look straight down from the shaded half onto the bar underneath.',
    explanation:'The shaded half on top lines up with <b>2</b> quarters underneath, so one half is the same as two quarters.' }),

  makeMCQ({ id:'g2mth-frc-070', chapterId:CH_FRC, difficulty:2, subsection:'comparing_fractions',
    question:
      fig(300, 110, 320, 'twelve counters drawn inside four rings',
        (function () {
          let s = '';
          for (let i = 0; i < 4; i++) {
            const cx = 42 + i * 72;
            s += ell(cx, 58, 31, 26, 'none', '#6B21A8', 2.5) + dots(3, 3, cx - 20, 58, 20, 7, '#A855F7');
          }
          return s;
        })()) +
      'The 12 counters are shared into 4 equal rings. What is <b>one quarter</b> of 12?',
    options:['3','4','6','2'], answer:'3',
    hint:'One quarter means one of the four equal groups.',
    explanation:'12 counters in 4 equal rings gives <b>3</b> in each ring, so one quarter of 12 is 3.' })
);

// ------------------------------------------------------------ measurement ---

const RX0 = 15, RPX = 26;
const ruler = y => {
  let s = rct(RX0, y, 10 * RPX, 28, '#FEF3C7', '#92400E', 2);
  for (let i = 0; i <= 10; i++) {
    const x = RX0 + i * RPX;
    s += ln(x, y, x, y + (i % 5 === 0 ? 15 : 9), '#92400E', 1.6);
    s += T(x, y + 25, 10, String(i));
  }
  return s;
};
const jug = (x, y, w, h, litres, cap) => {
  let s = rct(x, y, w, h, '#F9FAFB', '#374151', 2.5);
  const fh = h * litres / cap;
  if (fh > 0) s += rct(x + 3, y + h - fh, w - 6, fh - 3, '#93C5FD');
  for (let i = 1; i <= cap; i++) {
    const yy = y + h - h * i / cap;
    s += ln(x, yy, x + 14, yy, '#374151', 1.6) + T(x + 20, yy + 4, 11, String(i), 'start');
  }
  return s + '<path d="M ' + R(x + w) + ' ' + R(y + 10) + ' L ' + R(x + w + 13) + ' ' + R(y + 2) +
    '" fill="none" stroke="#374151" stroke-width="2.5"/>';
};
const dial = (cx, cy, r, value, max) => {
  const A = i => -2.356 + (i / max) * 4.712;
  let s = crc(cx, cy, r, '#FFFFFF', '#111827', 3);
  for (let i = 0; i <= max; i++) {
    const a = A(i);
    s += ln(cx + Math.sin(a) * (r - 10), cy - Math.cos(a) * (r - 10),
      cx + Math.sin(a) * (r - 2), cy - Math.cos(a) * (r - 2), '#111827', 2);
    s += T(cx + Math.sin(a) * (r - 22), cy - Math.cos(a) * (r - 22) + 5, 13, String(i));
  }
  const av = A(value);
  s += ln(cx, cy, cx + Math.sin(av) * (r - 26), cy - Math.cos(av) * (r - 26), '#EF4444', 4);
  return s + crc(cx, cy, 4, '#111827') + T(cx, cy + r - 8, 12, 'kg');
};

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g2mth-msr-061', chapterId:CH_MSR, difficulty:1, subsection:'length_cm_m',
    question:
      fig(300, 110, 320, 'a long thin object lying above a numbered ruler',
        rct(RX0, 24, 6.3 * RPX, 18, '#FACC15', '#92400E', 1.8) +
        poly(R(RX0 + 6.3 * RPX) + ',24 ' + R(RX0 + 7 * RPX) + ',33 ' + R(RX0 + 6.3 * RPX) + ',42', '#92400E') +
        ruler(58)) +
      'The pencil is lying along the ruler. How long is it?',
    options:['7 cm','6 cm','8 cm','7 m'], answer:'7 cm',
    hint:'The pencil starts at 0, so read the number at its tip.',
    explanation:'The tip reaches the 7 mark and the pencil starts at 0, so it is <b>7 cm</b> long.' }),

  makeMCQ({ id:'g2mth-msr-062', chapterId:CH_MSR, difficulty:2, subsection:'length_cm_m',
    question:
      fig(300, 110, 320, 'a strip lying above a numbered ruler, not starting at the first mark',
        rct(RX0 + 3 * RPX, 26, 6 * RPX, 16, '#EC4899', '#9D174D', 1.8) + ruler(58)) +
      'This ribbon does <b>not</b> start at 0. How long is the ribbon?',
    options:['6 cm','9 cm','3 cm','12 cm'], answer:'6 cm',
    hint:'Count the ruler marks from where the ribbon starts to where it ends.',
    explanation:'The ribbon runs from 3 to 9. From 3 to 9 is <b>6 cm</b> — you must count the gap, not read the end number.' }),

  makeMCQ({ id:'g2mth-msr-063', chapterId:CH_MSR, difficulty:2, subsection:'length_cm_m',
    question:
      fig(300, 130, 320, 'two strips of different lengths lying above a numbered ruler',
        rct(RX0, 18, 3 * RPX, 15, '#3B82F6', '#1D4ED8', 1.8) + T(RX0 - 7, 30, 13, 'A', 'end') +
        rct(RX0, 40, 8 * RPX, 15, '#22C55E', '#15803D', 1.8) + T(RX0 - 7, 52, 13, 'B', 'end') +
        ruler(72)) +
      'Both strips start at 0. How much <b>longer</b> is strip B than strip A?',
    options:['5 cm','8 cm','3 cm','11 cm'], answer:'5 cm',
    hint:'Read both lengths off the ruler, then find the difference.',
    explanation:'B is 8 cm and A is 3 cm. 8 − 3 = <b>5 cm</b> longer.' }),

  makeMCQ({ id:'g2mth-msr-064', chapterId:CH_MSR, difficulty:2, subsection:'length_cm_m',
    question:
      fig(240, 140, 270, 'a large room drawn from the side with an arrow across it',
        rct(20, 30, 200, 90, '#F3F4F6', '#374151', 2.5) +
        rct(170, 62, 34, 58, '#FDE68A', '#92400E', 2) +
        rct(40, 50, 44, 32, '#BFDBFE', '#374151', 2) +
        ln(30, 132, 210, 132, '#EF4444', 2.5) +
        poly('20,132 34,126 34,138', '#EF4444') + poly('220,132 206,126 206,138', '#EF4444') +
        T(120, 22, 14, 'classroom')) +
      'Which unit is the best one for measuring how long a classroom is?',
    options:['metres','centimetres','litres','kilograms'], answer:'metres',
    hint:'Would you rather measure a long room in tiny steps or big ones?',
    explanation:'A classroom is long, so we use <b>metres</b>. Centimetres are for small things like a pencil.' }),

  makeMCQ({ id:'g2mth-msr-065', chapterId:CH_MSR, difficulty:1, subsection:'mass_kg',
    question:
      fig(180, 190, 220, 'a round weighing dial with a pointer',
        rct(30, 140, 120, 34, '#D1D5DB', '#374151', 2.5) + dial(90, 82, 68, 2, 5)) +
      'A bag of rice is put on the scale. What is its mass?',
    options:['2 kg','3 kg','1 kg','20 kg'], answer:'2 kg',
    hint:'Follow the red pointer out to the number it touches.',
    explanation:'The pointer is on the 2, so the bag has a mass of <b>2 kg</b>.' }),

  makeMCQ({ id:'g2mth-msr-066', chapterId:CH_MSR, difficulty:2, subsection:'mass_kg',
    question:
      fig(260, 150, 290, 'a balance beam tipped down on one side with a parcel in each pan',
        poly('130,120 108,146 152,146', '#9CA3AF', '#374151', 2) +
        ln(40, 46, 220, 74, '#374151', 4) + ln(130, 60, 130, 120, '#374151', 4) +
        ln(40, 46, 40, 70, '#374151', 2) + ln(220, 74, 220, 98, '#374151', 2) +
        rct(14, 70, 52, 34, '#F97316', '#9A3412', 2) + T(40, 93, 15, 'A') +
        rct(194, 98, 52, 26, '#3B82F6', '#1D4ED8', 2) + T(220, 117, 15, 'B')) +
      'The balance tips down on the side of parcel A. Which parcel is <b>heavier</b>?',
    options:['parcel A','parcel B','both same','neither one'], answer:'parcel A',
    hint:'The heavier side always goes down.',
    explanation:'The side holding <b>parcel A</b> has gone down, so parcel A is heavier. Size does not decide it — heaviness does.' }),

  makeMCQ({ id:'g2mth-msr-067', chapterId:CH_MSR, difficulty:2, subsection:'mass_kg',
    question:
      fig(280, 150, 300, 'a level balance beam with labelled blocks in both pans',
        poly('140,116 118,142 162,142', '#9CA3AF', '#374151', 2) +
        ln(40, 56, 240, 56, '#374151', 4) + ln(140, 56, 140, 116, '#374151', 4) +
        ln(40, 56, 40, 74, '#374151', 2) + ln(240, 56, 240, 74, '#374151', 2) +
        rct(12, 74, 56, 40, '#22C55E', '#15803D', 2) + T(40, 100, 16, '5 kg') +
        rct(178, 74, 48, 40, '#FACC15', '#B45309', 2) + T(202, 100, 16, '2 kg') +
        rct(232, 74, 42, 40, '#A855F7', '#6B21A8', 2) + T(253, 100, 18, '?')) +
      'The two sides balance exactly. What is the mass of the purple block?',
    options:['3 kg','2 kg','5 kg','7 kg'], answer:'3 kg',
    hint:'Both sides must come to the same total.',
    explanation:'The left side is 5 kg, so the right side must be 5 kg too. 2 + <b>3</b> = 5, so the purple block is 3 kg.' }),

  makeMCQ({ id:'g2mth-msr-068', chapterId:CH_MSR, difficulty:1, subsection:'capacity_litres',
    question:
      fig(160, 170, 180, 'a marked container holding some liquid', jug(40, 20, 80, 130, 3, 5)) +
      'How much water is in the jug?',
    options:['3 litres','2 litres','4 litres','5 litres'], answer:'3 litres',
    hint:'Read the mark at the very top of the water.',
    explanation:'The water reaches the 3 mark, so there are <b>3 litres</b> in the jug.' }),

  makeMCQ({ id:'g2mth-msr-069', chapterId:CH_MSR, difficulty:2, subsection:'capacity_litres',
    question:
      fig(300, 170, 330, 'two small marked containers and one large empty container',
        jug(20, 60, 60, 90, 2, 3) + jug(110, 60, 60, 90, 2, 3) +
        T(95, 112, 26, '+') + T(190, 112, 26, '=') +
        jug(210, 20, 70, 130, 0, 5)) +
      'The water from both small jugs is poured into the empty jug. How much will be in it?',
    options:['4 litres','2 litres','5 litres','6 litres'], answer:'4 litres',
    hint:'Read how much is in each small jug, then put the two amounts together.',
    explanation:'Each small jug holds 2 litres. 2 + 2 = <b>4 litres</b> in the big jug.' }),

  makeMCQ({ id:'g2mth-msr-070', chapterId:CH_MSR, difficulty:2, subsection:'capacity_litres',
    question:
      fig(160, 170, 180, 'a marked container that is partly filled', jug(40, 20, 80, 130, 2, 5)) +
      'The jug is full at the 5 mark. How many <b>more</b> litres are needed to fill it?',
    options:['3 litres','2 litres','5 litres','7 litres'], answer:'3 litres',
    hint:'Count the marks from the top of the water up to 5.',
    explanation:'There are 2 litres inside and the jug holds 5. 5 − 2 = <b>3 litres</b> more.' })
);

// ------------------------------------------------------------------- time ---

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g2mth-tim-061', chapterId:CH_TIM, difficulty:1, subsection:'days_months',
    question:
      fig(300, 70, 320, 'a row of boxes holding names in order, with one box empty',
        (function () {
          const d = ['Mon', 'Tue', 'Wed', '?', 'Fri', 'Sat', 'Sun'];
          let s = '';
          for (let i = 0; i < 7; i++) {
            const x = 8 + i * 40;
            s += rct(x, 16, 38, 38, i === 3 ? '#FEF3C7' : '#F3F4F6', '#9CA3AF', 1.5) + T(x + 19, 40, 13, d[i]);
          }
          return s;
        })()) +
      'The days of the week are in order. Which day is missing?',
    options:['Thursday','Tuesday','Saturday','Sunday'], answer:'Thursday',
    hint:'Say the days out loud in order and stop where the box is empty.',
    explanation:'After Wednesday comes <b>Thursday</b>, then Friday.' }),

  makeMCQ({ id:'g2mth-tim-062', chapterId:CH_TIM, difficulty:2, subsection:'days_months',
    question:
      fig(280, 70, 300, 'a row of boxes holding names in order, with one box empty',
        (function () {
          const m = ['Feb', 'Mar', 'Apr', '?', 'Jun'];
          let s = '';
          for (let i = 0; i < 5; i++) {
            const x = 8 + i * 53;
            s += rct(x, 16, 50, 38, i === 3 ? '#FEF3C7' : '#F3F4F6', '#9CA3AF', 1.5) + T(x + 25, 40, 14, m[i]);
          }
          return s;
        })()) +
      'These months are in order. Which month belongs in the empty box?',
    options:['May','June','March','July'], answer:'May',
    hint:'Say the months in order from January and listen for the one after April.',
    explanation:'The order is April, <b>May</b>, June — so May goes in the empty box.' }),

  makeMCQ({ id:'g2mth-tim-063', chapterId:CH_TIM, difficulty:1, subsection:'days_months',
    question:
      fig(254, calH(0, 31), 320, 'a month grid with numbered squares', cal(0, 31)) +
      'How many days are there in the month shown?',
    options:['31','30','28','29'], answer:'31',
    hint:'Find the very last numbered square.',
    explanation:'The last square is <b>31</b>, so this month has 31 days.' }),

  makeMCQ({ id:'g2mth-tim-064', chapterId:CH_TIM, difficulty:1, subsection:'oclock_halfpast',
    question:
      fig(140, 140, 160, 'a clock face with two hands', clock(3, 0, 70, 70, 62)) +
      'What time does this clock show?',
    options:['3 o’clock','4 o’clock','12 o’clock','half past 3'], answer:'3 o’clock',
    hint:'The short hand tells the hour, the long red hand tells the minutes.',
    explanation:'The long hand points to 12, so it is exactly on the hour, and the short hand is on 3. It is <b>3 o’clock</b>.' }),

  makeMCQ({ id:'g2mth-tim-065', chapterId:CH_TIM, difficulty:1, subsection:'oclock_halfpast',
    question:
      fig(140, 140, 160, 'a clock face with two hands', clock(7, 30, 70, 70, 62)) +
      'What time does this clock show?',
    options:['half past 7','half past 6','7 o’clock','half past 8'], answer:'half past 7',
    hint:'When the long hand points to 6, the time is half past something.',
    explanation:'The long hand is on 6, so it is half past. The short hand has gone past 7, so it is <b>half past 7</b>.' }),

  makeMCQ({ id:'g2mth-tim-066', chapterId:CH_TIM, difficulty:2, subsection:'oclock_halfpast',
    question:
      fig(274, 242, 320, 'four clock faces, each labelled with a letter',
        grid4([
          clock(9, 0, 64, 60, 42), clock(9, 30, 64, 60, 42),
          clock(8, 30, 64, 60, 42), clock(3, 30, 64, 60, 42)
        ])) +
      'Which clock shows <b>half past 9</b>?',
    options:['A','B','C','D'], answer:'B',
    hint:'First find the clocks whose long hand points to 6, then check the short hand.',
    explanation:'Clock <b>B</b> has the long hand on 6 and the short hand just past 9, so it shows half past 9.' }),

  makeMCQ({ id:'g2mth-tim-067', chapterId:CH_TIM, difficulty:2, subsection:'oclock_halfpast',
    question:
      fig(140, 140, 160, 'a clock face with two hands', clock(5, 0, 70, 70, 62)) +
      'The clock shows the time now. The film starts <b>one hour later</b>. What time does the film start?',
    options:['6 o’clock','5 o’clock','4 o’clock','7 o’clock'], answer:'6 o’clock',
    hint:'Move the short hand on by just one number.',
    explanation:'The clock shows 5 o’clock. One hour later is <b>6 o’clock</b>.' }),

  makeMCQ({ id:'g2mth-tim-068', chapterId:CH_TIM, difficulty:1, subsection:'calendar',
    question:
      fig(254, calH(3, 30), 320, 'a month grid with numbered squares under day headings', cal(3, 30)) +
      'On which day of the week is the <b>15th</b>?',
    options:['Thursday','Tuesday','Sunday','Monday'], answer:'Thursday',
    hint:'Find the square with 15 in it, then slide your finger straight up to the day name.',
    explanation:'15 sits in the Thu column, so the 15th is a <b>Thursday</b>.' }),

  makeMCQ({ id:'g2mth-tim-069', chapterId:CH_TIM, difficulty:2, subsection:'calendar',
    question:
      fig(254, calH(3, 30), 320, 'a month grid with numbered squares under day headings', cal(3, 30)) +
      'How many <b>Sundays</b> are there in this month?',
    options:['4','5','3','6'], answer:'4',
    hint:'Go down the last column and count the numbered squares.',
    explanation:'The Sun column holds 4, 11, 18 and 25 — that is <b>4</b> Sundays.' }),

  makeMCQ({ id:'g2mth-tim-070', chapterId:CH_TIM, difficulty:2, subsection:'calendar',
    question:
      fig(254, calH(3, 30), 320, 'a month grid with numbered squares under day headings', cal(3, 30)) +
      'Aisha’s birthday is on the <b>second Tuesday</b> of this month. What is the date?',
    options:['13','6','20','14'], answer:'13',
    hint:'Go down the Tue column and count: first, second …',
    explanation:'The Tuesdays are 6, 13, 20 and 27. The second one is the <b>13th</b>.' })
);

// ----------------------------------------------------------------- shapes ---

const CUBE = '<polygon points="64,22 92,36 64,50 36,36" fill="#DBEAFE" stroke="#1D4ED8" stroke-width="2"/>' +
  '<polygon points="92,36 92,68 64,82 64,50" fill="#BFDBFE" stroke="#1D4ED8" stroke-width="2"/>' +
  '<polygon points="36,36 64,50 64,82 36,68" fill="#93C5FD" stroke="#1D4ED8" stroke-width="2"/>';
const CUBOID = '<polygon points="64,24 104,38 64,52 24,38" fill="#FEF3C7" stroke="#B45309" stroke-width="2"/>' +
  '<polygon points="104,38 104,64 64,78 64,52" fill="#FDE68A" stroke="#B45309" stroke-width="2"/>' +
  '<polygon points="24,38 64,52 64,78 24,64" fill="#FCD34D" stroke="#B45309" stroke-width="2"/>';
const PYRAMID = '<polygon points="64,58 100,72 64,86 28,72" fill="#E9D5FF" stroke="#6B21A8" stroke-width="2"/>' +
  '<polygon points="64,20 28,72 64,86" fill="#D8B4FE" stroke="#6B21A8" stroke-width="2"/>' +
  '<polygon points="64,20 100,72 64,86" fill="#C084FC" stroke="#6B21A8" stroke-width="2"/>';
const SPHERE = crc(64, 54, 32, '#FCA5A5', '#991B1B', 2) + ell(54, 44, 11, 7, '#FEE2E2');
const CYLINDER = ell(64, 28, 30, 10, '#A7F3D0', '#047857', 2) +
  rct(34, 28, 60, 52, '#D1FAE5') + ln(34, 28, 34, 80, '#047857', 2) + ln(94, 28, 94, 80, '#047857', 2) +
  ell(64, 80, 30, 10, '#6EE7B7', '#047857', 2);
const CONE = ell(64, 82, 30, 10, '#FBCFE8', '#9D174D', 2) +
  '<path d="M 64 20 L 94 82 A 30 10 0 0 1 34 82 Z" fill="#F9A8D4" stroke="#9D174D" stroke-width="2"/>';

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g2mth-shp-079', chapterId:CH_SHP, difficulty:1, subsection:'2d_shapes',
    question:
      fig(286, 92, 320, 'four flat shapes in a row, each labelled with a letter',
        rowcells([
          crc(32, 48, 20, '#3B82F6', '#1D4ED8', 2),
          tri(32, 48, 20),
          rct(14, 30, 36, 36, '#FACC15', '#B45309', 2),
          rct(6, 36, 52, 24, '#EC4899', '#9D174D', 2)
        ], 64, 80)) +
      'Which shape has <b>no corners</b> at all?',
    options:['A','B','C','D'], answer:'A',
    hint:'A corner is a sharp point where two sides meet. Run your finger round each shape.',
    explanation:'Shape <b>A</b> is a circle. Its edge curves all the way round, so it has no corners and no straight sides.' }),

  makeMCQ({ id:'g2mth-shp-080', chapterId:CH_SHP, difficulty:2, subsection:'2d_shapes',
    question:
      fig(300, 170, 320, 'six flat shapes of different kinds',
        rct(30, 30, 40, 40, '#FACC15', '#B45309', 2) +
        tri(150, 50, 24) +
        rct(220, 38, 60, 26, '#3B82F6', '#1D4ED8', 2) +
        crc(50, 125, 22, '#EC4899', '#9D174D', 2) +
        diamond(150, 125, 24) +
        hexa(250, 125, 24)) +
      'How many of these shapes have <b>exactly 4 sides</b>?',
    options:['3','2','4','5'], answer:'3',
    hint:'Count the straight sides of every shape, one shape at a time.',
    explanation:'The square, the long rectangle and the diamond each have 4 sides — that is <b>3</b> shapes. The triangle has 3, the hexagon 6 and the circle none.' }),

  makeMCQ({ id:'g2mth-shp-081', chapterId:CH_SHP, difficulty:1, subsection:'2d_shapes',
    question:
      fig(220, 190, 240, 'a house drawn out of simple flat shapes',
        poly('110,20 190,80 30,80', '#EF4444', '#7F1D1D', 2.5) +
        rct(40, 80, 140, 90, '#FDE68A', '#92400E', 2.5) +
        rct(90, 120, 40, 50, '#92400E', '#451A03', 2) +
        crc(65, 105, 14, '#BFDBFE', '#1D4ED8', 2)) +
      'Which shape has been used for the <b>roof</b> of this house?',
    options:['triangle','square','circle','rectangle'], answer:'triangle',
    hint:'Count the straight sides of the shape right at the top.',
    explanation:'The roof has 3 straight sides and 3 corners, so it is a <b>triangle</b>.' }),

  makeMCQ({ id:'g2mth-shp-082', chapterId:CH_SHP, difficulty:2, subsection:'2d_shapes',
    question:
      fig(300, 80, 320, 'a repeating row of flat shapes ending with an empty dashed box',
        crc(30, 40, 18, '#3B82F6', '#1D4ED8', 2) +
        rct(57, 22, 36, 36, '#FACC15', '#B45309', 2) +
        tri(120, 40, 19) +
        crc(165, 40, 18, '#3B82F6', '#1D4ED8', 2) +
        rct(192, 22, 36, 36, '#FACC15', '#B45309', 2) +
        rct(238, 18, 44, 44, '#FFFFFF', '#9CA3AF', 2.5, '6 4') + T(260, 49, 22, '?')) +
      'The shapes repeat in a pattern. Which shape comes next?',
    options:['triangle','circle','square','rectangle'], answer:'triangle',
    hint:'Say the pattern out loud and listen for where it starts again.',
    explanation:'The pattern is circle, square, <b>triangle</b>, circle, square … so the next shape is a triangle.' }),

  makeMCQ({ id:'g2mth-shp-083', chapterId:CH_SHP, difficulty:2, subsection:'3d_shapes',
    question:
      fig(274, 242, 320, 'four solid shapes, each labelled with a letter',
        grid4([CUBE, CUBOID, PYRAMID, SPHERE])) +
      'Which of these solid shapes would <b>roll</b> if you pushed it?',
    options:['A','B','C','D'], answer:'D',
    hint:'A shape can only roll if part of it is curved.',
    explanation:'Shape <b>D</b> is a sphere — it is curved all over, so it rolls. The others are made of flat faces and will only slide.' }),

  makeMCQ({ id:'g2mth-shp-084', chapterId:CH_SHP, difficulty:1, subsection:'3d_shapes',
    question:
      fig(274, 242, 320, 'four solid shapes, each labelled with a letter',
        grid4([CONE, CYLINDER, CUBE, SPHERE])) +
      'Which one of these is a <b>cylinder</b>?',
    options:['A','B','C','D'], answer:'B',
    hint:'A cylinder is shaped like a tin of beans: a flat circle at each end.',
    explanation:'Shape <b>B</b> has a flat circle at the top and another at the bottom with a curved side between them — that is a cylinder.' }),

  makeMCQ({ id:'g2mth-shp-085', chapterId:CH_SHP, difficulty:2, subsection:'3d_shapes',
    question:
      fig(128, 112, 160, 'a solid shape with a circular base and a point on top', CONE) +
      'Which everyday object is this shape?',
    options:['ice-cream cone','cereal box','tin can','football'], answer:'ice-cream cone',
    hint:'It has one flat circle at the bottom and comes to a point at the top.',
    explanation:'A cone has a circular base and one point, so an <b>ice-cream cone</b> matches. A tin can is a cylinder and a football is a sphere.' }),

  makeMCQ({ id:'g2mth-shp-086', chapterId:CH_SHP, difficulty:1, subsection:'symmetry',
    question:
      fig(274, 242, 320, 'four shapes, each with a dashed line drawn across it',
        grid4([
          rct(20, 34, 88, 50, '#BFDBFE', '#1D4ED8', 2) + ln(20, 84, 108, 34, '#EF4444', 2.5, '6 4'),
          poly('64,22 104,90 24,90', '#BBF7D0', '#15803D', 2) + ln(64, 14, 64, 98, '#EF4444', 2.5, '6 4'),
          rct(34, 26, 60, 60, '#FDE68A', '#B45309', 2) + ln(50, 18, 50, 94, '#EF4444', 2.5, '6 4'),
          crc(64, 56, 34, '#F9A8D4', '#9D174D', 2) + ln(20, 36, 108, 36, '#EF4444', 2.5, '6 4')
        ])) +
      'In which picture is the dashed line a <b>line of symmetry</b>?',
    options:['A','B','C','D'], answer:'B',
    hint:'Imagine folding along the dashed line. Do the two halves land exactly on top of each other?',
    explanation:'Only in picture <b>B</b> does the fold match: the dashed line runs from the top point straight down the middle of the triangle.' }),

  makeTF({ id:'g2mth-shp-087', chapterId:CH_SHP, difficulty:2, subsection:'symmetry',
    question:
      fig(160, 160, 180, 'a four-sided shape with a dashed line drawn from corner to corner',
        rct(30, 30, 100, 100, '#DDD6FE', '#6B21A8', 2.5) +
        ln(30, 30, 130, 130, '#EF4444', 3, '7 5')) +
      'The dashed line is a line of symmetry of this square.',
    answer:true,
    hint:'Fold the paper along the dashed line — where does each corner land?',
    explanation:'A square folds neatly along its corner-to-corner line, so this <b>is</b> a line of symmetry. A square has 4 of them altogether.' }),

  makeMCQ({ id:'g2mth-shp-088', chapterId:CH_SHP, difficulty:2, subsection:'symmetry',
    question:
      fig(274, 242, 320, 'four flat shapes, each labelled with a letter',
        grid4([
          poly('20,44 56,44 56,30 96,58 56,86 56,72 20,72', '#93C5FD', '#1D4ED8', 2),
          poly('18,28 110,28 110,50 76,50 76,94 52,94 52,50 18,50', '#FDE68A', '#B45309', 2),
          poly('34,24 58,24 58,78 100,78 100,98 34,98', '#FCA5A5', '#991B1B', 2),
          ell(64, 58, 42, 28, '#BBF7D0', '#15803D', 2)
        ])) +
      'Which shape has <b>no</b> line of symmetry at all?',
    options:['A','B','C','D'], answer:'C',
    hint:'Try folding each one in half — across, down, and corner to corner.',
    explanation:'Shape <b>C</b> is an L shape: no fold makes the two halves match. The arrow, the T and the oval can all be folded in half.' })
);

// --------------------------------------------------------------- ordinals ---

const QUEUE6 =
  crc(30, 52, 18, '#3B82F6', '#1D4ED8', 2) +
  rct(57, 34, 36, 36, '#FACC15', '#B45309', 2) +
  tri(120, 52, 20) +
  star(165, 52, 20) +
  hexa(210, 52, 20) +
  diamond(255, 52, 22) +
  T(30, 106, 13, 'FRONT') + T(255, 106, 13, 'BACK');

const boxRow = (n, x0, w, pitch, y, h, shade, mark) => {
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = x0 + i * pitch;
    s += rct(x, y, w, h, i === shade ? '#FDE68A' : '#F3F4F6', '#6B7280', 1.8);
    if (i === mark) s += crc(x + w / 2, y + h / 2, 6, '#EF4444');
  }
  return s;
};

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g2mth-ord-091', chapterId:CH_ORD, difficulty:1, subsection:'positions_1_6',
    question:
      fig(300, 120, 320, 'six different flat shapes standing in a line', QUEUE6) +
      'Which shape is <b>3rd</b> from the front of the line?',
    options:['triangle','square','circle','hexagon'], answer:'triangle',
    hint:'Put your finger on the front shape and count 1st, 2nd, 3rd.',
    explanation:'Counting from the front: circle (1st), square (2nd), <b>triangle</b> (3rd).' }),

  makeMCQ({ id:'g2mth-ord-092', chapterId:CH_ORD, difficulty:1, subsection:'positions_1_6',
    question:
      fig(300, 120, 320, 'six different flat shapes standing in a line', QUEUE6) +
      'Counting from the front, in which position is the <b>star</b>?',
    options:['4th','3rd','5th','2nd'], answer:'4th',
    hint:'Count along from the FRONT label, not from the other end.',
    explanation:'Circle, square, triangle, then the star — the star is <b>4th</b>.' }),

  makeMCQ({ id:'g2mth-ord-093', chapterId:CH_ORD, difficulty:2, subsection:'positions_1_6',
    question:
      fig(300, 120, 320, 'six different flat shapes standing in a line', QUEUE6) +
      'Now count from the <b>BACK</b> of the line. Which shape is 2nd?',
    options:['hexagon','diamond','star','square'], answer:'hexagon',
    hint:'Start at the BACK label and count backwards along the line.',
    explanation:'From the back: diamond (1st), <b>hexagon</b> (2nd). The same shape has a different position depending on which end you count from.' }),

  makeMCQ({ id:'g2mth-ord-094', chapterId:CH_ORD, difficulty:2, subsection:'ordinal_problems',
    question:
      fig(340, 100, 340, 'numbered cars in a line with a striped post at one end',
        car(8, 26, '3') + car(60, 26, '5') + car(112, 26, '2') +
        car(164, 26, '6') + car(216, 26, '1') + car(268, 26, '4') +
        rct(322, 14, 12, 62, '#111827') + rct(322, 24, 12, 10, '#FFFFFF') + rct(322, 44, 12, 10, '#FFFFFF') +
        rct(322, 64, 12, 10, '#FFFFFF')) +
      'The cars are racing towards the striped finish post on the right. Which car is in <b>2nd place</b>?',
    options:['car 1','car 4','car 6','car 3'], answer:'car 1',
    hint:'First place is the car nearest the finish post, not the car with the smallest number.',
    explanation:'Car 4 is closest to the post, so it is 1st. The next one back is <b>car 1</b>, in 2nd place.' }),

  makeMCQ({ id:'g2mth-ord-095', chapterId:CH_ORD, difficulty:1, subsection:'positions_7_12',
    question:
      fig(310, 70, 330, 'a row of twelve identical boxes with one of them shaded',
        boxRow(12, 10, 20, 24, 20, 30, 7, -1)) +
      'Counting from the <b>left</b>, in which position is the shaded box?',
    options:['8th','7th','9th','10th'], answer:'8th',
    hint:'Touch each box as you count so you do not lose your place.',
    explanation:'The shaded box is the <b>8th</b> box from the left. Seven plain boxes come before it.' }),

  makeMCQ({ id:'g2mth-ord-096', chapterId:CH_ORD, difficulty:2, subsection:'positions_7_12',
    question:
      fig(310, 70, 330, 'a row of twelve identical boxes with a dot inside one of them',
        boxRow(12, 10, 20, 24, 20, 30, -1, 9)) +
      'Counting from the <b>right</b>, in which position is the box with the dot?',
    options:['3rd','2nd','10th','4th'], answer:'3rd',
    hint:'Start at the far right box and count leftwards.',
    explanation:'From the right the dotted box is <b>3rd</b>. From the left it would be 10th — the box has not moved, only the counting has.' }),

  makeMCQ({ id:'g2mth-ord-097', chapterId:CH_ORD, difficulty:2, subsection:'positions_7_12',
    question:
      fig(130, 200, 150, 'a stack of twelve flat rectangles with one of them shaded',
        (function () {
          let s = '';
          for (let i = 0; i < 12; i++)
            s += rct(15, 176 - i * 15, 100, 13, i === 6 ? '#FDE68A' : '#BFDBFE', '#1D4ED8', 1.8);
          return s;
        })()) +
      'The shaded book is 7th counting from the <b>bottom</b>. Counting from the <b>top</b>, which book is it?',
    options:['6th','7th','5th','12th'], answer:'6th',
    hint:'Count down from the very top book of the pile.',
    explanation:'There are 12 books. Counting down from the top, the shaded one is <b>6th</b>, because 5 books sit above it.' }),

  makeMCQ({ id:'g2mth-ord-098', chapterId:CH_ORD, difficulty:2, subsection:'ordinal_problems',
    question:
      fig(300, 90, 320, 'a line of nine boxes with a dot inside one of them',
        boxRow(9, 10, 26, 32, 18, 34, -1, 4) + T(23, 74, 12, 'FRONT')) +
      'The dotted box is a child waiting in a queue. How many children are <b>in front of</b> that child?',
    options:['4','5','3','9'], answer:'4',
    hint:'Count only the boxes between the FRONT label and the dot.',
    explanation:'There are <b>4</b> boxes in front of the dot, so that child is 5th in the queue.' }),

  makeMCQ({ id:'g2mth-ord-099', chapterId:CH_ORD, difficulty:2, subsection:'ordinal_problems',
    question:
      fig(320, 80, 330, 'a line of ten boxes, two of them shaded',
        (function () {
          let s = '';
          for (let i = 0; i < 10; i++) {
            const x = 10 + i * 31;
            s += rct(x, 20, 26, 36, (i === 2 || i === 6) ? '#BFDBFE' : '#F3F4F6', '#6B7280', 1.8);
            if (i === 2) s += T(x + 13, 45, 16, 'S');
            if (i === 6) s += T(x + 13, 45, 16, 'T');
          }
          return s;
        })()) +
      'Sara is at box <b>S</b> and Tom is at box <b>T</b>. How many boxes are <b>between</b> them?',
    options:['3','4','2','5'], answer:'3',
    hint:'Do not count S or T themselves — only the boxes in the gap.',
    explanation:'Sara is 3rd and Tom is 7th, so boxes 4, 5 and 6 are between them — that is <b>3</b> boxes.' }),

  makeMCQ({ id:'g2mth-ord-100', chapterId:CH_ORD, difficulty:2, subsection:'ordinal_problems',
    question:
      fig(280, 70, 300, 'a row of eight identical boxes with one of them shaded',
        boxRow(8, 12, 28, 33, 18, 34, 4, -1)) +
      'The shaded box is 5th from the left. How many boxes come <b>after</b> it?',
    options:['3','4','5','8'], answer:'3',
    hint:'Count only the boxes to the right of the shaded one.',
    explanation:'4 boxes come before the shaded box and it is the 5th, so <b>3</b> of the 8 boxes are left after it.' })
);

// ------------------------------------------------------------------ money ---

const noteS = (x, y, label) => rct(x, y, 66, 38, '#BBF7D0', '#15803D', 2.5) +
  rct(x + 5, y + 5, 56, 28, 'none', '#15803D', 1) + T(x + 33, y + 25, 14, label);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g2mth-mon-091', chapterId:CH_MON, difficulty:1, subsection:'coins_notes',
    question:
      fig(334, 102, 340, 'four pieces of money, each labelled with a letter',
        rowcells([
          coin(38, 50, 'Rs 5'), coin(38, 50, 'Rs 20'),
          noteS(5, 32, 'Rs 50'), noteS(5, 32, 'Rs 100')
        ], 76, 90)) +
      'Which one is the <b>Rs 50 note</b>?',
    options:['A','B','C','D'], answer:'C',
    hint:'Notes are the flat rectangles. Coins are the round ones.',
    explanation:'<b>C</b> is a rectangle, so it is a note, and it says Rs 50. D is a note too, but it is worth Rs 100.' }),

  makeMCQ({ id:'g2mth-mon-092', chapterId:CH_MON, difficulty:1, subsection:'coins_notes',
    question:
      fig(240, 100, 260, 'three round coins in a row',
        coin(50, 52, 'Rs 5') + coin(120, 52, 'Rs 10') + coin(190, 52, 'Rs 20')) +
      'Which of these coins is worth the <b>most</b>?',
    options:['Rs 20','Rs 10','Rs 5','Rs 50'], answer:'Rs 20',
    hint:'All three coins look the same size — read the number on each one.',
    explanation:'<b>Rs 20</b> is the largest amount. A bigger coin is not always worth more, so you must read it.' }),

  makeMCQ({ id:'g2mth-mon-093', chapterId:CH_MON, difficulty:2, subsection:'coins_notes',
    question:
      fig(200, 70, 240, 'two identical rectangular notes side by side',
        note(6, 12, 'Rs 50') + note(100, 12, 'Rs 50')) +
      'These two notes together are worth the same as one of these. Which one?',
    options:['Rs 100 note','Rs 50 note','Rs 25 note','Rs 200 note'], answer:'Rs 100 note',
    hint:'Add the two notes together first.',
    explanation:'50 + 50 = 100, so the two notes are worth the same as one <b>Rs 100 note</b>.' }),

  makeMCQ({ id:'g2mth-mon-094', chapterId:CH_MON, difficulty:2, subsection:'coins_notes',
    question:
      fig(320, 140, 330, 'some round coins on one side of a line and a rectangular note on the other',
        coin(45, 45, 'Rs 10') + coin(105, 45, 'Rs 10') + coin(75, 100, 'Rs 10') +
        ln(160, 14, 160, 126, '#9CA3AF', 2, '6 5') +
        note(200, 48, 'Rs 25')) +
      'Which side is worth <b>more</b> — the coins on the left or the note on the right?',
    options:['the coins','the note','both equal','neither one'], answer:'the coins',
    hint:'Add the coins up before you compare.',
    explanation:'The three coins make 10 + 10 + 10 = Rs 30, and Rs 30 is more than Rs 25, so <b>the coins</b> are worth more.' }),

  makeMCQ({ id:'g2mth-mon-095', chapterId:CH_MON, difficulty:1, subsection:'counting_money',
    question:
      fig(240, 100, 260, 'three round coins in a row',
        coin(50, 52, 'Rs 10') + coin(120, 52, 'Rs 5') + coin(190, 52, 'Rs 5')) +
      'How much money is shown here?',
    options:['Rs 20','Rs 15','Rs 25','Rs 10'], answer:'Rs 20',
    hint:'Start with the biggest coin and count the others on.',
    explanation:'10, then 15, then <b>Rs 20</b>. Starting with the largest coin makes counting money quicker.' }),

  makeMCQ({ id:'g2mth-mon-096', chapterId:CH_MON, difficulty:2, subsection:'counting_money',
    question:
      fig(280, 110, 300, 'a rectangular note beside two round coins',
        note(10, 32, 'Rs 50') + coin(140, 55, 'Rs 20') + coin(215, 55, 'Rs 5')) +
      'Ravi empties his pocket. How much money does he have?',
    options:['Rs 75','Rs 70','Rs 55','Rs 80'], answer:'Rs 75',
    hint:'Count the note first, then add each coin on.',
    explanation:'50 + 20 = 70, and 70 + 5 = <b>Rs 75</b>.' }),

  makeMCQ({ id:'g2mth-mon-097', chapterId:CH_MON, difficulty:2, subsection:'counting_money',
    question:
      fig(274, 242, 320, 'four sets of money, each labelled with a letter',
        grid4([
          coin(40, 62, 'Rs 20') + coin(92, 62, 'Rs 10'),
          noteS(28, 20, 'Rs 25') + coin(64, 84, 'Rs 10'),
          coin(40, 62, 'Rs 20') + coin(92, 62, 'Rs 5'),
          coin(40, 62, 'Rs 10') + coin(92, 62, 'Rs 10')
        ])) +
      'A pen costs Rs 30. Which set pays for it <b>exactly</b>, with no change?',
    options:['A','B','C','D'], answer:'A',
    hint:'Add each set up and look for the one that makes exactly 30.',
    explanation:'Set <b>A</b> is 20 + 10 = Rs 30 exactly. B makes 35 (too much), C makes 25 and D makes 20.' }),

  makeMCQ({ id:'g2mth-mon-098', chapterId:CH_MON, difficulty:1, subsection:'money_problems',
    question:
      fig(300, 140, 320, 'a round object with a price label beside a rectangular note',
        crc(60, 70, 42, '#EF4444', '#991B1B', 2.5) + ln(18, 70, 102, 70, '#991B1B', 2) +
        rct(115, 52, 70, 36, '#FFFFFF', '#111827', 2) + T(150, 77, 16, 'Rs 35') +
        note(200, 48, 'Rs 50')) +
      'Sarah buys the ball with the Rs 50 note. How much change should she get?',
    options:['Rs 15','Rs 25','Rs 20','Rs 85'], answer:'Rs 15',
    hint:'Count on from the price up to the money she handed over.',
    explanation:'From 35 up to 50 is 15, so the change is <b>Rs 15</b>. Change is always what is left after paying.' }),

  makeMCQ({ id:'g2mth-mon-099', chapterId:CH_MON, difficulty:2, subsection:'money_problems',
    question:
      fig(300, 150, 320, 'two school objects, each with a price label under it',
        rct(46, 24, 18, 62, '#FACC15', '#92400E', 1.8) +
        poly('46,86 64,86 55,104', '#92400E') +
        rct(29, 112, 52, 28, '#FFFFFF', '#111827', 2) + T(55, 133, 15, 'Rs 12') +
        rct(180, 30, 80, 62, '#3B82F6', '#1D4ED8', 2) + ln(196, 30, 196, 92, '#1D4ED8', 2) +
        rct(194, 112, 52, 28, '#FFFFFF', '#111827', 2) + T(220, 133, 15, 'Rs 25')) +
      'How much do the pencil and the book cost <b>altogether</b>?',
    options:['Rs 37','Rs 35','Rs 13','Rs 47'], answer:'Rs 37',
    hint:'Altogether means put the two prices together.',
    explanation:'12 + 25 = <b>Rs 37</b>. Add the tens (10 + 20 = 30), then the ones (2 + 5 = 7).' }),

  makeMCQ({ id:'g2mth-mon-100', chapterId:CH_MON, difficulty:2, subsection:'money_problems',
    question:
      fig(300, 160, 320, 'a toy with a price label, and some money beside it',
        poly('70,16 108,60 70,110 32,60', '#A855F7', '#6B21A8', 2.5) +
        ln(70, 16, 70, 110, '#6B21A8', 1.5) + ln(32, 60, 108, 60, '#6B21A8', 1.5) +
        '<path d="M 70 110 Q 84 122 70 134 Q 56 146 70 156" fill="none" stroke="#6B21A8" stroke-width="2"/>' +
        rct(38, 118, 64, 30, '#FFFFFF', '#111827', 2) + T(70, 140, 15, 'Rs 65') +
        noteS(170, 40, 'Rs 25') + coin(205, 110, 'Rs 20')) +
      'Rina wants the kite. She has only the money on the right. How much <b>more</b> does she need?',
    options:['Rs 20','Rs 25','Rs 15','Rs 110'], answer:'Rs 20',
    hint:'Add up her money first, then see how far it is from the price.',
    explanation:'Rina has 25 + 20 = Rs 45. From 45 up to 65 is <b>Rs 20</b> more.' })
);

// --------------------------------------------------------------- division ---

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g2mth-div-091', chapterId:CH_DIV, difficulty:1, subsection:'sharing_by_2',
    question:
      fig(260, 120, 290, 'counters drawn inside two rings',
        ell(70, 60, 48, 38, 'none', '#F97316', 2.5) +
        dots(3, 3, 48, 48, 22, 8, '#3B82F6') + dots(2, 2, 59, 76, 22, 8, '#3B82F6') +
        ell(190, 60, 48, 38, 'none', '#F97316', 2.5) +
        dots(3, 3, 168, 48, 22, 8, '#3B82F6') + dots(2, 2, 179, 76, 22, 8, '#3B82F6')) +
      '10 counters have been shared equally into 2 rings. How many counters are in each ring?',
    options:['5','2','10','4'], answer:'5',
    hint:'Count the counters inside just one ring.',
    explanation:'Each ring holds <b>5</b> counters, so 10 ÷ 2 = 5.' }),

  makeMCQ({ id:'g2mth-div-092', chapterId:CH_DIV, difficulty:1, subsection:'sharing_by_2',
    question:
      fig(300, 170, 320, 'a group of round fruits above two empty plates',
        dots(12, 6, 40, 32, 42, 15, '#FACC15') +
        ell(80, 140, 62, 20, '#FFFFFF', '#111827', 2.5) +
        ell(220, 140, 62, 20, '#FFFFFF', '#111827', 2.5)) +
      'The 12 mangoes are to be shared equally onto the 2 plates. How many mangoes go on each plate?',
    options:['6','4','12','8'], answer:'6',
    hint:'Deal them out one for this plate, one for that plate, until they are gone.',
    explanation:'12 shared between 2 plates gives <b>6</b> on each plate, because 6 + 6 = 12.' }),

  makeMCQ({ id:'g2mth-div-093', chapterId:CH_DIV, difficulty:2, subsection:'sharing_by_2',
    question:
      fig(280, 130, 300, 'counters drawn inside two rings',
        ell(75, 62, 54, 42, 'none', '#6B21A8', 2.5) +
        dots(4, 4, 42, 50, 22, 8, '#A855F7') + dots(3, 3, 53, 80, 22, 8, '#A855F7') +
        ell(205, 62, 54, 42, 'none', '#6B21A8', 2.5) +
        dots(4, 4, 172, 50, 22, 8, '#A855F7') + dots(3, 3, 183, 80, 22, 8, '#A855F7')) +
      'The counters were shared equally into these 2 rings. How many counters were there <b>before</b> they were shared?',
    options:['14','9','7','12'], answer:'14',
    hint:'Count one ring, then remember there are two the same.',
    explanation:'Each ring holds 7, so there were 7 + 7 = <b>14</b> counters. Sharing backwards means adding the groups together.' }),

  makeMCQ({ id:'g2mth-div-094', chapterId:CH_DIV, difficulty:2, subsection:'sharing_by_2',
    question:
      fig(300, 130, 320, 'counters drawn inside two rings, with one counter outside them',
        ell(70, 60, 42, 36, 'none', '#F97316', 2.5) + dots(4, 2, 55, 46, 30, 9, '#22C55E') +
        ell(175, 60, 42, 36, 'none', '#F97316', 2.5) + dots(4, 2, 160, 46, 30, 9, '#22C55E') +
        crc(265, 60, 9, '#22C55E', '#1D4ED8', 2)) +
      '9 counters were shared equally into the 2 rings. How many counters are <b>left over</b>?',
    options:['1','0','2','4'], answer:'1',
    hint:'Look for the counter that is not inside a ring.',
    explanation:'Each ring took 4 counters, and <b>1</b> is left over outside. 9 does not share fairly between 2 because it is an odd number.' }),

  makeMCQ({ id:'g2mth-div-095', chapterId:CH_DIV, difficulty:1, subsection:'dividing_by_2',
    question:
      fig(300, 120, 320, 'dots arranged in two equal rows with a line drawn between them',
        dots(16, 8, 30, 42, 34, 11, '#A855F7') +
        ln(14, 59, 286, 59, '#EF4444', 2, '7 5')) +
      'These 16 dots are split into 2 equal rows. What is 16 ÷ 2?',
    options:['8','6','16','9'], answer:'8',
    hint:'Count the dots in one row only.',
    explanation:'Each row has <b>8</b> dots, so 16 ÷ 2 = 8.' }),

  makeMCQ({ id:'g2mth-div-096', chapterId:CH_DIV, difficulty:2, subsection:'dividing_by_2',
    question:
      fig(300, 80, 320, 'a long strip of small squares with a dashed line across the middle',
        (function () {
          let s = '';
          for (let i = 0; i < 20; i++) s += rct(10 + i * 14, 24, 12, 32, '#BFDBFE', '#1D4ED8', 1.4);
          return s;
        })() + ln(149, 14, 149, 66, '#EF4444', 3, '6 4')) +
      'The dashed line cuts this strip of 20 squares into two equal halves. What is <b>half of 20</b>?',
    options:['10','5','20','15'], answer:'10',
    hint:'Count the squares on one side of the dashed line.',
    explanation:'There are <b>10</b> squares on each side of the line, so half of 20 is 10.' }),

  makeMCQ({ id:'g2mth-div-097', chapterId:CH_DIV, difficulty:2, subsection:'dividing_by_2',
    question:
      fig(274, 242, 320, 'four pictures of dots in rows, each labelled with a letter',
        grid4([
          dots(14, 7, 20, 44, 15, 5, '#3B82F6'),
          dots(12, 6, 26, 44, 15, 5, '#3B82F6'),
          dots(16, 8, 16, 44, 14, 5, '#3B82F6'),
          dots(15, 5, 30, 38, 16, 5, '#3B82F6')
        ])) +
      'Which picture shows <b>14 shared into 2 equal rows</b>?',
    options:['A','B','C','D'], answer:'A',
    hint:'You need exactly 2 rows, and 7 dots in each row.',
    explanation:'Picture <b>A</b> has 2 rows of 7, and 7 + 7 = 14. So 14 ÷ 2 = 7.' }),

  makeMCQ({ id:'g2mth-div-098', chapterId:CH_DIV, difficulty:1, subsection:'div_word_probs',
    question:
      fig(300, 120, 320, 'a long band with a mark across the middle of it',
        rct(20, 50, 260, 20, '#92400E', '#451A03', 2) +
        T(150, 34, 16, '12 m') +
        ln(150, 38, 150, 84, '#EF4444', 2.5, '6 4') +
        crc(142, 96, 8, '#FFFFFF', '#EF4444', 2.5) + crc(158, 96, 8, '#FFFFFF', '#EF4444', 2.5) +
        ln(138, 90, 162, 74, '#EF4444', 2.5) + ln(162, 90, 138, 74, '#EF4444', 2.5)) +
      'A rope 12 m long is cut in half at the dashed line. How long is each piece?',
    options:['6 m','4 m','12 m','2 m'], answer:'6 m',
    hint:'Cutting in half means sharing the length between 2 equal pieces.',
    explanation:'12 ÷ 2 = <b>6 m</b>. Both pieces must be the same length for it to be halved.' }),

  makeMCQ({ id:'g2mth-div-099', chapterId:CH_DIV, difficulty:2, subsection:'div_word_probs',
    question:
      fig(300, 180, 320, 'two shelves holding upright books, with a few more books above the top shelf',
        (function () {
          let s = '';
          for (let i = 0; i < 3; i++) s += rct(120 + i * 20, 14, 16, 28, '#F97316', '#9A3412', 1.6);
          s += arrowDown(150, 46, 62, '#EF4444');
          for (let i = 0; i < 10; i++) s += rct(40 + i * 20, 66, 16, 28, '#3B82F6', '#1D4ED8', 1.6);
          s += rct(30, 94, 240, 8, '#92400E', '#451A03', 1.5);
          for (let i = 0; i < 10; i++) s += rct(40 + i * 20, 132, 16, 28, '#3B82F6', '#1D4ED8', 1.6);
          s += rct(30, 160, 240, 8, '#92400E', '#451A03', 1.5);
          return s;
        })()) +
      '20 books were shared equally between the two shelves. Then 3 more books were added to the <b>top</b> shelf. How many books are on the top shelf now?',
    options:['13','10','23','12'], answer:'13',
    hint:'Work out the fair share first, then add the extra books.',
    explanation:'20 ÷ 2 = 10 books on each shelf. Then 10 + 3 = <b>13</b> on the top shelf.' }),

  makeMCQ({ id:'g2mth-div-100', chapterId:CH_DIV, difficulty:2, subsection:'div_word_probs',
    question:
      fig(320, 140, 330, 'a row of oval shapes above a small container holding two of them',
        (function () {
          let s = '';
          for (let i = 0; i < 14; i++) s += ell(18 + i * 21, 40, 9, 11, '#FFFFFF', '#111827', 2);
          return s;
        })() +
        rct(110, 80, 60, 42, '#FEF3C7', '#92400E', 2) +
        ell(128, 101, 9, 11, '#FFFFFF', '#111827', 2) + ell(152, 101, 9, 11, '#FFFFFF', '#111827', 2)) +
      'The 14 eggs are packed <b>2 to a box</b>, like the box shown. How many boxes are needed?',
    options:['7','2','14','6'], answer:'7',
    hint:'Count how many pairs of eggs you can make.',
    explanation:'14 eggs in pairs makes <b>7</b> boxes, because 14 ÷ 2 = 7.' })
);

})();
