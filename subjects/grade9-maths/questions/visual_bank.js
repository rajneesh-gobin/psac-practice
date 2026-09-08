'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - 4-mark VISUAL tasks in the chapters that own one
//
//  ⚠ AIMED AT A TABLE, NOT AT "MORE QUESTIONS". With a full recent-paper
//    history five papers still repeat 47% of their memorable stimuli, and every
//    one of the worst offenders is the same shape of problem: a chapter that
//    owns exactly ONE visual task at four marks, so the assembler has no
//    alternative and reuses it.
//
//        repeats  chapter                mk  visual tasks that chapter has @mk
//           x9    g9m-surface-area        4   1   <- the cuboid, in every paper
//           x5    g9m-geometry-revision   4   1
//           x4    g9m-expressions         4   1
//           x4    g9m-vectors             4   1
//           x4    g9m-probability         4   0   (an intro, no figure at all)
//           x4    g9m-manipulation        4   0
//           x3    g9m-trigonometry        4   1
//           x3    g9m-statistics          7   1
//
//    And the heaviest chapter in the whole paper, `g9m-number-revision` at
//    weight 8, carries **zero visual tasks at any size** - so ~15 marks of
//    every paper come from a chapter that can never contribute a figure.
//
//  ⚠ THE FIGURES ARE DELIBERATELY DIFFERENT SHAPES. Adding three more cuboids
//    would satisfy the count and change nothing: a child remembers the picture,
//    not the id. Nine new families here - spinner, two-way table, tree diagram,
//    measuring jug, number line, triangular prism, parallelogram, line graph,
//    scale bar - none of which existed in the bank.
//
//  ⚠ Italic inside an svg is a <tspan>. <i> is an HTML breakout tag: inside an
//    <svg> the parser leaves foreign content on it, ENDING the svg element and
//    reparsing the rest as sibling HTML. Ten figures shipped broken that way.
//    scripts/test-svg-figures.js asserts it.
//
//  ⚠ Left-hand dimension labels read RIGHT TO LEFT from their x, and an svg
//    clips at its viewBox. That is how "10 cm" printed as "0 cm". Leave room.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const SRC = 'NCF Grades 7-9 §3.9; NCE body questions. Written to give chapters that '
          + 'owned a single four-mark figure an alternative.';

const SVG = (w, h) => '<svg viewBox="0 0 ' + Math.round(w) + ' ' + Math.round(h) + '" width="'
  + Math.round(w) + '" height="' + Math.round(h)
  + '" xmlns="http://www.w3.org/2000/svg" role="img">';
const n1 = v => (+v).toFixed(1);
const ITAL = t => '<tspan font-style="italic">' + t + '</tspan>';
const RAD = d => d * Math.PI / 180;

// ── 1. A spinner: a circle cut into equal labelled sectors ────────────────
function spinner(labels, shaded) {
  const on = new Set(shaded || []);
  const cx = 100, cy = 100, r = 74, step = 360 / labels.length;
  let g = '', acc = -90;
  labels.forEach((lab, i) => {
    const a = acc, b = acc + step;
    const p = (deg, rr) => [cx + rr * Math.cos(RAD(deg)), cy + rr * Math.sin(RAD(deg))];
    const [x1, y1] = p(a, r), [x2, y2] = p(b, r);
    g += `<path d="M ${cx} ${cy} L ${n1(x1)} ${n1(y1)} A ${r} ${r} 0 0 1 ${n1(x2)} ${n1(y2)} Z" `
       + `fill="${on.has(i) ? '#c9c9c9' : '#ffffff'}" `
       + `stroke="#000" stroke-width="1.3"/>`;
    const [lx, ly] = p(a + step / 2, r * 0.62);
    g += `<text x="${n1(lx)}" y="${n1(ly + 4)}" font-size="12" text-anchor="middle">${lab}</text>`;
    acc = b;
  });
  g += `<path d="M ${cx} ${cy - 4} L ${cx + 46} ${cy} L ${cx} ${cy + 4} Z" fill="#000"/>`
     + `<circle cx="${cx}" cy="${cy}" r="4" fill="#000"/>`;
  return SVG(200, 200) + g + '</svg>';
}
const ALT_SPIN = 'A spinner divided into equal labelled sectors, some shaded grey and some white, with a pointer at its centre.';

// ── 2. A probability tree, two stages ─────────────────────────────────────
function tree(stage1, stage2) {
  const x0 = 24, x1 = 118, x2 = 244, w = 320, h = 190;
  let g = '';
  const y1 = [56, 138];
  stage1.forEach((s, i) => {
    g += `<line x1="${x0}" y1="97" x2="${x1}" y2="${y1[i]}" stroke="#000" stroke-width="1.4"/>`
       + `<text x="${(x0 + x1) / 2}" y="${(97 + y1[i]) / 2 - 5}" font-size="11" text-anchor="middle">${s.p}</text>`
       + `<text x="${x1 + 6}" y="${y1[i] + 4}" font-size="12" font-weight="bold">${s.label}</text>`;
    const y2 = [y1[i] - 30, y1[i] + 30];
    stage2.forEach((t, j) => {
      g += `<line x1="${x1 + 22}" y1="${y1[i]}" x2="${x2}" y2="${y2[j]}" stroke="#000" stroke-width="1.4"/>`
         + `<text x="${(x1 + 22 + x2) / 2}" y="${(y1[i] + y2[j]) / 2 - 5}" font-size="11" text-anchor="middle">${t.p}</text>`
         + `<text x="${x2 + 6}" y="${y2[j] + 4}" font-size="12" font-weight="bold">${t.label}</text>`;
    });
  });
  g += `<circle cx="${x0}" cy="97" r="3" fill="#000"/>`;
  return SVG(w, h) + g + '</svg>';
}
const ALT_TREE = 'A two-stage probability tree diagram with each branch labelled with its probability.';

// ── 3. A measuring jug with a marked liquid level ─────────────────────────
function jug(capacity, level, unit) {
  const x0 = 62, y0 = 20, w = 84, h = 132;
  const frac = level / capacity, top = y0 + h - h * frac;
  let g = `<rect x="${x0}" y="${n1(top)}" width="${w}" height="${n1(y0 + h - top)}" fill="#dcdcdc"/>`
    + `<path d="M ${x0} ${y0} L ${x0} ${y0 + h} L ${x0 + w} ${y0 + h} L ${x0 + w} ${y0}" `
    + `fill="none" stroke="#000" stroke-width="1.8"/>`
    + `<path d="M ${x0 + w} ${y0 + 8} L ${x0 + w + 14} ${y0 + 2}" fill="none" stroke="#000" stroke-width="1.6"/>`
    + `<line x1="${x0}" y1="${n1(top)}" x2="${x0 + w}" y2="${n1(top)}" stroke="#000" stroke-width="1.4"/>`;
  const steps = 5;
  for (let i = 0; i <= steps; i++) {
    const v = capacity * i / steps, y = y0 + h - h * (i / steps);
    g += `<line x1="${x0}" y1="${n1(y)}" x2="${x0 + 12}" y2="${n1(y)}" stroke="#000" stroke-width="1"/>`
       + `<text x="${x0 - 6}" y="${n1(y + 4)}" font-size="11" text-anchor="end">${v}</text>`;
  }
  g += `<text x="${x0 + w / 2}" y="${y0 + h + 18}" font-size="11" text-anchor="middle">${unit}</text>`;
  return SVG(x0 + w + 30, y0 + h + 28) + g + '</svg>';
}
const ALT_JUG = 'A measuring jug marked with a scale, with the liquid inside shaded up to one of the marks.';

// ── 4. A number line with an inequality marked on it ──────────────────────
function numberLine(min, max, from, to, closedFrom, closedTo) {
  const x0 = 30, y = 54, w = 300, step = w / (max - min);
  const X = v => x0 + (v - min) * step;
  let g = `<line x1="${x0 - 12}" y1="${y}" x2="${x0 + w + 12}" y2="${y}" stroke="#000" stroke-width="1.6"/>`
    + `<path d="M ${x0 + w + 12} ${y} l -8 -5 v 10 z" fill="#000"/>`
    + `<path d="M ${x0 - 12} ${y} l 8 -5 v 10 z" fill="#000"/>`;
  for (let v = min; v <= max; v++) {
    g += `<line x1="${n1(X(v))}" y1="${y - 6}" x2="${n1(X(v))}" y2="${y + 6}" stroke="#000" stroke-width="1.1"/>`
       + `<text x="${n1(X(v))}" y="${y + 22}" font-size="11" text-anchor="middle">${v}</text>`;
  }
  if (from != null && to != null) {
    g += `<line x1="${n1(X(from))}" y1="${y - 14}" x2="${n1(X(to))}" y2="${y - 14}" stroke="#000" stroke-width="3.2"/>`
       + `<circle cx="${n1(X(from))}" cy="${y - 14}" r="4.5" fill="${closedFrom ? '#000' : '#fff'}" stroke="#000" stroke-width="1.6"/>`
       + `<circle cx="${n1(X(to))}" cy="${y - 14}" r="4.5" fill="${closedTo ? '#000' : '#fff'}" stroke="#000" stroke-width="1.6"/>`;
  }
  return SVG(x0 + w + 30, 84) + g + '</svg>';
}
const ALT_NUMLINE = 'A number line with a range marked by a heavy bar between two circles, one at each end.';

// ── 5. A triangular prism ─────────────────────────────────────────────────
function prism(bL, hL, lL) {
  const x0 = 52, y0 = 26, w = 96, h = 76, dx = 62, dy = -26;
  const A = [x0, y0 + h], B = [x0 + w, y0 + h], C = [x0 + w / 2, y0];
  const A2 = [A[0] + dx, A[1] + dy], B2 = [B[0] + dx, B[1] + dy], C2 = [C[0] + dx, C[1] + dy];
  const P = p => p[0] + ',' + p[1];
  let g = `<polygon points="${P(A)} ${P(B)} ${P(C)}" fill="none" stroke="#000" stroke-width="1.6"/>`
    + `<polyline points="${P(C)} ${P(C2)} ${P(B2)} ${P(B)}" fill="none" stroke="#000" stroke-width="1.6"/>`
    + `<line x1="${B2[0]}" y1="${B2[1]}" x2="${A2[0]}" y2="${A2[1]}" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>`
    + `<line x1="${A2[0]}" y1="${A2[1]}" x2="${C2[0]}" y2="${C2[1]}" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>`
    + `<line x1="${A[0]}" y1="${A[1]}" x2="${A2[0]}" y2="${A2[1]}" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>`
    + `<text x="${x0 + w / 2}" y="${y0 + h + 18}" font-size="12" text-anchor="middle">${bL}</text>`
    + `<text x="${x0 - 8}" y="${y0 + h / 2 + 4}" font-size="12" text-anchor="end">${hL}</text>`
    + `<text x="${B[0] + dx / 2 + 12}" y="${B[1] + dy / 2 + 16}" font-size="12" text-anchor="middle">${lL}</text>`;
  return SVG(x0 + w + dx + 40, y0 + h + 28) + g + '</svg>';
}
const ALT_PRISM = 'A triangular prism drawn in three dimensions with the base, height and length of the prism labelled.';

// ── 6. A parallelogram with base and perpendicular height ─────────────────
function parallelogram(bL, hL, sL) {
  const x0 = 54, y0 = 24, b = 150, h = 84, slant = 46;
  const pts = `${x0 + slant},${y0} ${x0 + slant + b},${y0} ${x0 + b},${y0 + h} ${x0},${y0 + h}`;
  let g = `<polygon points="${pts}" fill="none" stroke="#000" stroke-width="1.6"/>`
    + `<line x1="${x0 + slant}" y1="${y0}" x2="${x0 + slant}" y2="${y0 + h}" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>`
    + `<path d="M ${x0 + slant} ${y0 + h - 13} L ${x0 + slant + 13} ${y0 + h - 13} L ${x0 + slant + 13} ${y0 + h}" fill="none" stroke="#000" stroke-width="1.1"/>`
    + `<text x="${x0 + b / 2}" y="${y0 + h + 18}" font-size="12" text-anchor="middle">${bL}</text>`
    + `<text x="${x0 + slant - 8}" y="${y0 + h / 2 + 4}" font-size="12" text-anchor="end">${hL}</text>`;
  if (sL) g += `<text x="${x0 + slant + b + 8}" y="${y0 + h / 2}" font-size="12" text-anchor="start">${sL}</text>`;
  return SVG(x0 + slant + b + 60, y0 + h + 28) + g + '</svg>';
}
const ALT_PARA = 'A parallelogram with its base and its perpendicular height marked by a dashed line.';

// ── 7. Two straight lines on a grid ───────────────────────────────────────
function lineGraph(xMin, xMax, yMin, yMax, lines, pts) {
  const M = 20, cell = 24;
  const w = (xMax - xMin) * cell, h = (yMax - yMin) * cell;
  const X = x => M + (x - xMin) * cell, Y = y => M + h - (y - yMin) * cell;
  let g = '';
  for (let x = xMin; x <= xMax; x++) g += `<line x1="${n1(X(x))}" y1="${M}" x2="${n1(X(x))}" y2="${M + h}" stroke="#c8c8c8" stroke-width="0.6"/>`;
  for (let y = yMin; y <= yMax; y++) g += `<line x1="${M}" y1="${n1(Y(y))}" x2="${M + w}" y2="${n1(Y(y))}" stroke="#c8c8c8" stroke-width="0.6"/>`;
  g += `<line x1="${M}" y1="${n1(Y(0))}" x2="${M + w}" y2="${n1(Y(0))}" stroke="#000" stroke-width="1.4"/>`
     + `<line x1="${n1(X(0))}" y1="${M}" x2="${n1(X(0))}" y2="${M + h}" stroke="#000" stroke-width="1.4"/>`;
  for (let x = xMin; x <= xMax; x++) if (x !== 0)
    g += `<text x="${n1(X(x))}" y="${n1(Y(0) + 13)}" font-size="10" text-anchor="middle">${x}</text>`;
  for (let y = yMin; y <= yMax; y++) if (y !== 0)
    g += `<text x="${n1(X(0) - 6)}" y="${n1(Y(y) + 4)}" font-size="10" text-anchor="end">${y}</text>`;
  (lines || []).forEach(L => {
    g += `<line x1="${n1(X(L.x1))}" y1="${n1(Y(L.y1))}" x2="${n1(X(L.x2))}" y2="${n1(Y(L.y2))}" stroke="#000" stroke-width="1.8"/>`
       + `<text x="${n1(X(L.lx))}" y="${n1(Y(L.ly))}" font-size="11" font-weight="bold">${L.label}</text>`;
  });
  (pts || []).forEach(p => {
    g += `<circle cx="${n1(X(p[0]))}" cy="${n1(Y(p[1]))}" r="3.4" fill="#000"/>`;
    if (p[2]) g += `<text x="${n1(X(p[0]) + 7)}" y="${n1(Y(p[1]) - 7)}" font-size="12" font-weight="bold">${p[2]}</text>`;
  });
  g += `<text x="${M + w - 4}" y="${n1(Y(0) - 6)}" font-size="11" text-anchor="end" font-style="italic">x</text>`
     + `<text x="${n1(X(0) + 6)}" y="${M + 11}" font-size="11" font-style="italic">y</text>`;
  return SVG(M * 2 + w, M * 2 + h) + g + '</svg>';
}
const ALT_LINEGRAPH = 'A squared grid with numbered axes and two straight lines drawn on it, each labelled.';

// ── 8. A plain HTML table (a stimulus the papers use constantly) ──────────
function table(head, rows) {
  return '<table style="border-collapse:collapse;font-size:13px;margin:4px 0">'
    + '<style>table th,table td{border:1px solid #000;padding:3px 10px;text-align:left}'
    + 'table th{font-weight:bold;background:#efefef}</style>'
    + '<thead><tr>' + head.map(h => `<th>${h}</th>`).join('') + '</tr></thead><tbody>'
    + rows.map(r => '<tr>' + r.map(c => `<td>${c}</td>`).join('') + '</tr>').join('')
    + '</tbody></table>';
}

// ── 9. A scale bar with a measured length on it ───────────────────────────
function scaleBar(kmPerCm, cmLen, label) {
  const x0 = 30, y = 46, per = 46;
  let g = '';
  for (let i = 0; i < cmLen; i++) {
    g += `<rect x="${x0 + i * per}" y="${y}" width="${per}" height="16" fill="${i % 2 ? '#000' : '#fff'}" stroke="#000" stroke-width="1.2"/>`;
  }
  for (let i = 0; i <= cmLen; i++) {
    g += `<text x="${x0 + i * per}" y="${y - 6}" font-size="11" text-anchor="middle">${i * kmPerCm}</text>`;
  }
  g += `<text x="${x0 + (cmLen * per) / 2}" y="${y + 34}" font-size="11" text-anchor="middle">${label}</text>`;
  return SVG(x0 * 2 + cmLen * per, y + 46) + g + '</svg>';
}
const ALT_SCALE = 'A map scale bar divided into equal black and white segments, numbered along its top edge.';

// ── 10. A rectangle with algebraic or numeric sides ──────────────────────
// ⚠ ADDED BECAUSE THE FIRST CUT OF THIS FILE REUSED ONE FAMILY ACROSS FOUR
//   CHAPTERS. parallelogram() was serving surface-area, manipulation,
//   expressions and quadratics, so a single paper could carry three
//   parallelograms and the measurement counted them as one repeated stimulus
//   seven times over. A child remembers the SHAPE, not the id: two chapters
//   drawing the same figure is the same defect as one task appearing twice.
function rectAlg(wL, hL) {
  const x0 = 56, y0 = 26, w = 168, h = 92;
  const g = `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="none" stroke="#000" stroke-width="1.6"/>`
    + `<text x="${x0 + w / 2}" y="${y0 + h + 18}" font-size="12" text-anchor="middle">${wL}</text>`
    + `<text x="${x0 - 8}" y="${y0 + h / 2 + 4}" font-size="12" text-anchor="end">${hL}</text>`;
  return SVG(x0 + w + 34, y0 + h + 28) + g + '</svg>';
}
const ALT_RECT = 'A rectangle with its length and its width labelled along two of its sides.';

// ── 11. A right-angled triangle ──────────────────────────────────────────
function rightTri(baseL, heightL) {
  // ⚠ x0 IS 82, NOT 56. The height label is anchored at x0-8 and reads
  //   right-to-left, so an algebraic label like "(x - 1) cm" started at x=-14
  //   and the viewBox cut its opening bracket. Caught by test-svg-figures.js.
  const x0 = 82, y0 = 24, w = 156, h = 92;
  const bx = x0, by = y0 + h;
  const g = `<polygon points="${bx},${by} ${bx + w},${by} ${bx},${y0}" fill="none" stroke="#000" stroke-width="1.6"/>`
    + `<path d="M ${bx + 14} ${by} L ${bx + 14} ${by - 14} L ${bx} ${by - 14}" fill="none" stroke="#000" stroke-width="1.2"/>`
    + `<text x="${bx + w / 2}" y="${by + 18}" font-size="12" text-anchor="middle">${baseL}</text>`
    + `<text x="${bx - 8}" y="${y0 + h / 2 + 4}" font-size="12" text-anchor="end">${heightL}</text>`;
  return SVG(bx + w + 34, by + 28) + g + '</svg>';
}
const ALT_RTRI = 'A right-angled triangle with the right angle marked by a small square and its two shorter sides labelled.';

// ── 12. A circle with its radius drawn ───────────────────────────────────
function circleR(rL) {
  const cx = 108, cy = 96, r = 70;
  const g = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#000" stroke-width="1.6"/>`
    + `<line x1="${cx}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="#000" stroke-width="1.3"/>`
    + `<circle cx="${cx}" cy="${cy}" r="2.6" fill="#000"/>`
    + `<text x="${cx + r / 2}" y="${cy - 8}" font-size="12" text-anchor="middle">${rL}</text>`;
  return SVG(cx + r + 30, cy + r + 26) + g + '</svg>';
}
const ALT_CIRCLE = 'A circle with a line drawn from its centre to the edge, labelled.';

// ── 13. A cube ───────────────────────────────────────────────────────────
function cube(sideL) {
  const x0 = 54, y0 = 30, s = 88, dx = 34, dy = -26;
  const P = (x, y) => x + ',' + y;
  const g = `<polygon points="${P(x0, y0)} ${P(x0 + s, y0)} ${P(x0 + s, y0 + s)} ${P(x0, y0 + s)}" fill="none" stroke="#000" stroke-width="1.5"/>`
    + `<polyline points="${P(x0, y0)} ${P(x0 + dx, y0 + dy)} ${P(x0 + s + dx, y0 + dy)} ${P(x0 + s, y0)}" fill="none" stroke="#000" stroke-width="1.5"/>`
    + `<polyline points="${P(x0 + s + dx, y0 + dy)} ${P(x0 + s + dx, y0 + s + dy)} ${P(x0 + s, y0 + s)}" fill="none" stroke="#000" stroke-width="1.5"/>`
    + `<polyline points="${P(x0, y0 + s)} ${P(x0 + dx, y0 + s + dy)} ${P(x0 + s + dx, y0 + s + dy)}" fill="none" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>`
    + `<line x1="${x0 + dx}" y1="${y0 + dy}" x2="${x0 + dx}" y2="${y0 + s + dy}" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>`
    + `<text x="${x0 + s / 2}" y="${y0 + s + 18}" font-size="12" text-anchor="middle">${sideL}</text>`;
  return SVG(x0 + s + dx + 34, y0 + s + 28) + g + '</svg>';
}
const ALT_CUBE = 'A cube drawn in three dimensions with the length of one edge labelled.';

// ── The tasks ─────────────────────────────────────────────────────────────
const P = (label, prompt, marks, answer, unit, hint, explanation, extra) => ({
  label, prompt, marks, hint, explanation,
  response: Object.assign({ kind: 'number', answer: String(answer) }, unit ? { unit } : {}, extra || {}),
});
const CH = (opts, ans) => ({ kind: 'choice', variant: 'options', options: opts, answer: ans });

const ITEMS = [

  // ── g9m-number-revision : weight 8, and ZERO visual tasks in the bank ───
  ['g9m-vis-001', 'g9m-number-revision', 'ratio_and_measures', 3, [
    P('a.i', 'The scale bar below comes from a map. How many <b>kilometres</b> does 1 cm represent?',
      2, '5', 'km', 'Read the numbers above the first segment.',
      'Each segment is 1 cm long and spans 0 to 5, so 1 cm represents 5 km.'),
    P('a.ii', 'Two villages are 7 cm apart on the map. Find the real distance.',
      2, '35', 'km', 'Multiply by the distance one centimetre stands for.',
      '7 &times; 5 = 35 km.'),
  ], scaleBar(5, 4, 'kilometres'), ALT_SCALE],

  ['g9m-vis-002', 'g9m-number-revision', 'fractions_decimals_percentages', 4, [
    P('a', 'The table shows a family budget. What <b>percentage</b> of the income goes on food?',
      2, '30', '%', 'Write the food amount over the total income, then multiply by 100.',
      '6 000 out of 20 000 is 6000/20000 = 0.3, and 0.3 &times; 100 = 30%.'),
    P('b', 'How much is left after all four items are paid for?', 2, '3000', 'Rs',
      'Add the four amounts and subtract from the income.',
      '6 000 + 5 000 + 3 000 + 3 000 = 17 000, so 20 000 &minus; 17 000 = Rs 3 000.'),
  ], table(['Item', 'Amount (Rs)'],
           [['Income', '20 000'], ['Food', '6 000'], ['Rent', '5 000'],
            ['Transport', '3 000'], ['School', '3 000']]),
     'A budget table listing a monthly income and four categories of spending in rupees.'],

  ['g9m-vis-003', 'g9m-number-revision', 'ratio_and_measures', 4, [
    P('a', 'The jug shows how much juice is left. How many <b>millilitres</b> are in the jug?',
      2, '600', 'ml', 'Read the scale where the shading stops.',
      'The shading reaches the 600 mark, so there are 600 ml.'),
    P('b', 'The jug is filled to the top. What <b>fraction</b> of the full jug is 600 ml? '
      + 'Give your answer in its lowest terms.', 2, '3/5', null,
      'The jug holds 1 000 ml when full.',
      '600/1000 = 3/5.', { kind: 'expression', answer: '3/5', accept: ['0.6', '600/1000'] }),
  ], jug(1000, 600, 'millilitres'), ALT_JUG],

  ['g9m-vis-004', 'g9m-number-revision', 'fractions_decimals_percentages', 3, [
    P('a', 'The number line shows a set of values. Write down the <b>smallest</b> value marked.',
      2, '-2', null, 'Read the left-hand end of the heavy bar.',
      'The heavy bar starts at &minus;2 with a filled circle, so &minus;2 is included.'),
    P('b', 'Write down the <b>largest whole number</b> in the marked set.', 2, '3', null,
      'The right-hand circle is open, so that value is NOT included.',
      'The bar ends at 4 with an open circle, so 4 is excluded and the largest whole number is 3.'),
  ], numberLine(-4, 6, -2, 4, true, false), ALT_NUMLINE],

  // ── g9m-surface-area : the cuboid appeared in ALL FIVE papers, x9 ───────
  ['g9m-vis-005', 'g9m-surface-area', 'nets_and_surface_area', 4, [
    P('a', 'Calculate the <b>area of the triangular end</b> of the prism.', 2, '54', 'cm²',
      'Area of a triangle is &frac12; &times; base &times; height.',
      '&frac12; &times; 12 &times; 9 = 54 cm&sup2;.'),
    P('b', 'The prism has two such ends. Calculate their <b>combined</b> area.',
      2, '108', 'cm²', 'Double your answer to (a).', '2 &times; 54 = 108 cm&sup2;.'),
  ], prism('12 cm', '9 cm', '20 cm'), ALT_PRISM],

  ['g9m-vis-006', 'g9m-surface-area', 'nets_and_surface_area', 4, [
    P('a', 'Calculate the <b>area</b> of the parallelogram.', 2, '112', 'cm²',
      'Area of a parallelogram is base &times; perpendicular height.',
      '14 &times; 8 = 112 cm&sup2;.'),
    P('b', 'A second parallelogram has the same area but a base of 16 cm. '
      + 'Find its perpendicular height.', 2, '7', 'cm',
      'Area divided by base gives the height.', '112 &divide; 16 = 7 cm.'),
  ], parallelogram('14 cm', '8 cm', '10 cm'), ALT_PARA],

  ['g9m-vis-007', 'g9m-surface-area', 'nets_and_surface_area', 4, [
    P('a.i', 'Calculate the <b>volume</b> of the cube.', 2, '1728', 'cm³',
      'Volume of a cube is the edge length cubed.',
      '12 &times; 12 &times; 12 = 1 728 cm&sup3;.'),
    P('a.ii', 'The cube is made of metal weighing 8 g per cm&sup3;. Find its <b>mass</b> in kilograms.',
      2, '13.824', 'kg', 'Multiply the volume by the mass of one cubic centimetre, then convert.',
      '1 728 &times; 8 = 13 824 g, and 13 824 &divide; 1 000 = 13.824 kg.'),
  ], cube('12 cm'), ALT_CUBE],

  // ── g9m-probability : x4, and NO figure at all in the chapter ───────────
  ['g9m-vis-008', 'g9m-probability', 'simple_and_combined_events', 3, [
    P('a', 'The spinner has four equal sectors. Find the probability of landing on <b>B</b>.',
      2, '1/4', null, 'All four sectors are the same size.',
      'One of the four equal sectors is B, so P(B) = 1/4.',
      { kind: 'expression', answer: '1/4', accept: ['0.25'] }),
    P('b', 'Find the probability of landing on <b>A or C</b>.', 2, '1/2', null,
      'Two of the four sectors, added together.',
      'P(A) + P(C) = 1/4 + 1/4 = 2/4 = 1/2.',
      { kind: 'expression', answer: '1/2', accept: ['2/4', '0.5'] }),
  ], spinner(['A', 'B', 'C', 'D']), ALT_SPIN],

  ['g9m-vis-009', 'g9m-probability', 'simple_and_combined_events', 4, [
    P('a', 'The spinner has six equal sectors. Find the probability of landing on a <b>shaded</b> sector.',
      2, '1/2', null, 'Count the shaded sectors out of six.',
      'Three of the six sectors are shaded, so 3/6 = 1/2.',
      { kind: 'expression', answer: '1/2', accept: ['3/6', '0.5'] }),
    P('b', 'The spinner is spun 120 times. How many times would you <b>expect</b> a shaded sector?',
      2, '60', 'times', 'Multiply the probability by the number of spins.',
      '&frac12; &times; 120 = 60 times.'),
  ], spinner(['1', '2', '3', '4', '5', '6'], [1, 3, 5]), ALT_SPIN],

  ['g9m-vis-010', 'g9m-probability', 'simple_and_combined_events', 4, [
    P('a', 'The tree diagram shows two spins of a fair coin. Write down the probability shown on '
      + 'each branch.', 1, '1/2', null, 'A fair coin has two equally likely outcomes.',
      'Each branch carries a probability of 1/2.',
      { kind: 'expression', answer: '1/2', accept: ['0.5'] }),
    P('b', 'Use the tree to find the probability of the outcome <b>HH</b>.', 2, '1/4', null,
      'Multiply the two probabilities along that path.', '&frac12; &times; &frac12; = 1/4.',
      { kind: 'expression', answer: '1/4', accept: ['0.25'] }),
    P('c', 'Use the tree to find the probability of the outcomes <b>HT or TH</b> together.',
      2, '1/2', null, 'Two complete paths through the tree, added.',
      '&frac14; + &frac14; = 2/4 = 1/2.',
      { kind: 'expression', answer: '1/2', accept: ['2/4', '0.5'] }),
  ], tree([{ p: '&frac12;', label: 'H' }, { p: '&frac12;', label: 'T' }],
          [{ p: '&frac12;', label: 'H' }, { p: '&frac12;', label: 'T' }]), ALT_TREE],

  // ── g9m-manipulation : x4, and NO figure in the chapter ────────────────
  ['g9m-vis-011', 'g9m-manipulation', 'formulae_and_subject', 4, [
    P('a', 'The circumference of a circle is <i>C</i> = 2&pi;<i>r</i>. Using the radius shown '
      + 'and &pi; = 3.14, calculate <i>C</i>.', 2, '43.96', 'cm',
      'Double the radius, then multiply by pi.',
      'C = 2 &times; 3.14 &times; 7 = 43.96 cm.'),
    P('b', 'Make <i>r</i> the subject of <i>C</i> = 2&pi;<i>r</i> and hence find <i>r</i> when '
      + '<i>C</i> = 62.8 cm.', 2, '10', 'cm',
      'Divide both sides by 2 pi.', 'r = C &divide; (2&pi;) = 62.8 &divide; 6.28 = 10 cm.'),
  ], circleR('7 cm'), ALT_CIRCLE],

  ['g9m-vis-012', 'g9m-manipulation', 'formulae_and_subject', 4, [
    P('a', 'The table gives the cost <i>C</i> of hiring a hall for <i>n</i> hours. '
      + 'Find the cost of <b>1 extra hour</b>.', 2, '450', 'Rs',
      'Look at how the cost changes from one row to the next.',
      'From 2 hours to 3 hours the cost rises from 1 700 to 2 150, a rise of Rs 450.'),
    P('b', 'The formula is <i>C</i> = 450<i>n</i> + <i>k</i>. Find <i>k</i>.',
      2, '800', null, 'Substitute one row of the table into the formula.',
      'Using n = 2 and C = 1 700: 1 700 = 900 + k, so k = 800.'),
  ], table(['Hours, n', 'Cost, C (Rs)'], [['2', '1 700'], ['3', '2 150'], ['4', '2 600']]),
     'A table of values pairing a number of hours with the cost of hiring a hall in rupees.'],

  // ── g9m-simultaneous : no visual task at any size ──────────────────────
  ['g9m-vis-013', 'g9m-simultaneous', 'solve_simultaneous', 4, [
    P('a', 'The graph shows two lines. Write down the <i>x</i>-coordinate of the point where '
      + 'they cross.', 2, '2', null, 'Read straight down from the crossing point.',
      'The lines cross at (2, 4), so x = 2.'),
    P('b', 'Write down the <i>y</i>-coordinate of that point.', 2, '4', null,
      'Read straight across from the crossing point.',
      'The lines cross at (2, 4), so y = 4.'),
  ], lineGraph(0, 6, 0, 8,
       [{ x1: 0, y1: 2, x2: 6, y2: 8, lx: 4.4, ly: 7.4, label: 'L1' },
        { x1: 0, y1: 8, x2: 4, y2: 0, lx: 0.4, ly: 7.4, label: 'L2' }],
       [[2, 4, '']]), ALT_LINEGRAPH],

  ['g9m-vis-014', 'g9m-simultaneous', 'solve_simultaneous', 4, [
    P('a', 'The table shows the cost of buying pens and books. Using the two rows, find the cost '
      + 'of <b>one pen</b>.', 3, '15', 'Rs',
      'The second row has one more pen than the first and the same number of books.',
      'Row 2 minus row 1: one extra pen adds Rs 15, so a pen costs Rs 15.'),
    P('b', 'Hence find the cost of <b>one book</b>.', 1, '40', 'Rs',
      'Substitute the pen price into either row.',
      'Row 1: 2 pens cost Rs 30, so 2 books cost 110 &minus; 30 = Rs 80 and one book is Rs 40.'),
  ], table(['Pens', 'Books', 'Total cost (Rs)'], [['2', '2', '110'], ['3', '2', '125']]),
     'A table with three columns giving a number of pens, a number of books and the total cost.'],

  // ── g9m-expressions : x4 on its single four-mark figure ────────────────
  ['g9m-vis-015', 'g9m-expressions', 'binomials_and_factorising', 4, [
    P('a', 'The rectangle has length (<i>x</i> + 5) cm and width <i>x</i> cm. Write down an '
      + 'expression for its <b>area</b>, expanded.', 2, 'x^2+5x', null,
      'Area is base times height; multiply out the bracket.',
      'x(x + 5) = x&sup2; + 5x.', { kind: 'expression', answer: 'x^2+5x' }),
    P('b', 'Find the area when <i>x</i> = 4.', 2, '36', 'cm²',
      'Substitute into your expression, or into the bracket.',
      '4&sup2; + 5(4) = 16 + 20 = 36 cm&sup2;.'),
  ], rectAlg('(' + ITAL('x') + ' + 5) cm', ITAL('x') + ' cm'), ALT_RECT],

  ['g9m-vis-016', 'g9m-expressions', 'binomials_and_factorising', 4, [
    P('a', 'The prism has a triangular end of base 2<i>x</i> cm and height <i>x</i> cm. '
      + 'Write an expression for the <b>area of the end</b>.', 2, 'x^2', null,
      'Half of base times height.',
      '&frac12; &times; 2x &times; x = x&sup2;.', { kind: 'expression', answer: 'x^2' }),
    P('b', 'Find that area when <i>x</i> = 7.', 2, '49', 'cm²',
      'Substitute x = 7.', '7&sup2; = 49 cm&sup2;.'),
  ], prism('2' + ITAL('x') + ' cm', ITAL('x') + ' cm', '15 cm'), ALT_PRISM],

  // ── g9m-vectors : x4 on its single four-mark grid ──────────────────────
  ['g9m-vis-017', 'g9m-vectors', 'translation', 4, [
    P('a', 'The grid shows P and Q. Write down the <b>x-component</b> of the vector <b>PQ</b>.',
      2, '3', null, 'Count across from P to Q.', 'From x = 1 to x = 4 is 3 to the right.'),
    P('b', 'Write down the <b>y-component</b> of <b>PQ</b>.', 2, '-2', null,
      'Count up or down from P to Q; downwards is negative.',
      'From y = 5 to y = 3 is 2 downwards, so the component is &minus;2.'),
  ], lineGraph(0, 7, 0, 7,
       [{ x1: 1, y1: 5, x2: 4, y2: 3, lx: 2.3, ly: 4.8, label: '' }],
       [[1, 5, 'P'], [4, 3, 'Q']]),
     'A squared grid with numbered axes, two marked points P and Q, and a straight line joining them.'],

  ['g9m-vis-018', 'g9m-vectors', 'column_vectors', 4, [
    P('a', 'The table gives three vectors. Find the <b>x-component</b> of <b>a</b> + <b>b</b>.',
      2, '7', null, 'Add the x parts.', '4 + 3 = 7.'),
    P('b', 'Find the <b>y-component</b> of <b>a</b> + <b>b</b>, reading both from the table.',
      2, '1', null, 'Add the y parts, watching the sign.', '&minus;2 + 3 = 1.'),
  ], table(['Vector', 'x-component', 'y-component'],
           [['<b>a</b>', '4', '&minus;2'], ['<b>b</b>', '3', '3'], ['<b>c</b>', '&minus;1', '5']]),
     'A table listing three vectors with their x-components and y-components.'],

  // ── g9m-trigonometry : x3 on its single four-mark figure ───────────────
  ['g9m-vis-019', 'g9m-trigonometry', 'ratios_and_2d_problems', 4, [
    P('a', 'The table gives some trigonometric values. Use it to find the length marked '
      + '<i>h</i> when the hypotenuse is 12 cm and the angle is 30&deg;.', 2, '6', 'cm',
      'The side opposite the angle uses sine.',
      'h = 12 &times; sin 30&deg; = 12 &times; 0.5 = 6 cm.'),
    P('b', 'Find the length adjacent to the 30&deg; angle, to 1 decimal place.',
      2, '10.4', 'cm', 'The adjacent side uses cosine.',
      '12 &times; cos 30&deg; = 12 &times; 0.866 = 10.392, which is 10.4 cm to 1 d.p.'),
  ], table(['Angle', 'sin', 'cos', 'tan'],
           [['30&deg;', '0.500', '0.866', '0.577'],
            ['45&deg;', '0.707', '0.707', '1.000'],
            ['60&deg;', '0.866', '0.500', '1.732']]),
     'A table of sine, cosine and tangent values for three angles.'],

  // ── g9m-statistics : x3 on its single seven-mark chart ─────────────────
  ['g9m-vis-020', 'g9m-statistics', 'frequency_and_averages', 4, [
    P('a', 'The table shows the marks of 20 pupils. Write down the <b>modal</b> mark.',
      1, '6', 'marks', 'The mark with the highest frequency.',
      '6 marks has a frequency of 7, the highest in the table.'),
    P('b', 'Calculate the <b>range</b> of the marks.', 1, '4', 'marks',
      'Largest mark minus smallest mark.', '8 &minus; 4 = 4.'),
    P('c', 'Calculate the <b>mean</b> mark.', 2, '5.9', 'marks',
      'Multiply each mark by its frequency, add, then divide by 20.',
      '(4&times;3) + (5&times;4) + (6&times;7) + (7&times;4) + (8&times;2) = 12 + 20 + 42 + 28 + 16 = 118, '
      + 'and 118 &divide; 20 = 5.9.'),
  ], table(['Mark', '4', '5', '6', '7', '8'], [['Frequency', '3', '4', '7', '4', '2']]),
     'A frequency table pairing five possible marks with the number of pupils scoring each.'],

  // ── g9m-inequalities : only two visual tasks, both at 2 marks ──────────
  ['g9m-vis-021', 'g9m-inequalities', 'solve_and_represent', 4, [
    P('a', 'The number line shows the solution of an inequality. Write down the smallest '
      + 'value in the solution set.', 2, '1', null,
      'The left-hand circle is filled, so that value is included.',
      'The bar starts at 1 with a filled circle, so 1 is in the set.'),
    P('b', 'Write down the largest <b>integer</b> in the solution set.', 2, '4', null,
      'The right-hand circle is open, so that value is excluded.',
      'The bar ends at 5 with an open circle, so 5 is excluded and the largest integer is 4.'),
  ], numberLine(-2, 7, 1, 5, true, false), ALT_NUMLINE],

  // ── g9m-capacity : no visual task at any size ──────────────────────────
  ['g9m-vis-022', 'g9m-capacity', 'units_and_problems', 3, [
    P('a', 'How many <b>litres</b> of water are in the container?', 2, '3', 'litres',
      'Read the scale where the shading stops.',
      'The shading reaches the 3 mark, so there are 3 litres.'),
    P('b', 'How many more litres are needed to fill it?', 2, '2', 'litres',
      'The container holds 5 litres when full.', '5 &minus; 3 = 2 litres.'),
  ], jug(5, 3, 'litres'), ALT_JUG],

  // ── g9m-quadratics : no visual task at any size ────────────────────────
  ['g9m-vis-023', 'g9m-quadratics', 'factorise_and_solve', 4, [
    P('a', 'The right-angled triangle has base (<i>x</i> + 2) cm and height (<i>x</i> &minus; 1) cm. '
      + 'Find its area when <i>x</i> = 7.', 2, '27', 'cm²',
      'Substitute x = 7, then take half of base times height.',
      'Base = 9 cm, height = 6 cm, so the area is &frac12; &times; 9 &times; 6 = 27 cm&sup2;.'),
    P('b', 'Solve <i>x</i><sup>2</sup> + <i>x</i> &minus; 42 = 0, giving the <b>positive</b> root.',
      2, '6', null, 'Two numbers multiplying to &minus;42 and adding to +1.',
      '(x + 7)(x &minus; 6) = 0, so x = &minus;7 or x = 6. The positive root is 6.'),
  ], rightTri('(' + ITAL('x') + ' + 2) cm', '(' + ITAL('x') + ' &minus; 1) cm'), ALT_RTRI],

  // ── g9m-coordinates : only one visual at 3 marks, none at 4 ────────────
  ['g9m-vis-024', 'g9m-coordinates', 'gradient', 4, [
    P('a', 'The graph shows the line L1. Find its <b>gradient</b>.', 2, '1', null,
      'Count the rise and the run between two points on the line.',
      'From (0, 2) to (6, 8) the rise is 6 and the run is 6, so the gradient is 1.'),
    P('b', 'Write down the <b>y-intercept</b> of L1.', 2, '2', null,
      'Where the line crosses the y-axis.', 'L1 crosses the y-axis at 2.'),
  ], lineGraph(0, 6, 0, 8,
       [{ x1: 0, y1: 2, x2: 6, y2: 8, lx: 4.4, ly: 7.4, label: 'L1' }], []), ALT_LINEGRAPH],
];

ITEMS.forEach(([id, chapterId, subsection, difficulty, parts, svg, alt]) => {
  STATIC_QUESTIONS.push(makeTask(Object.assign({
    id, chapterId, subsection, difficulty, source: SRC, parts,
  }, svg ? { stimulus: { html: svg, altText: alt } } : {})));
});

})();
