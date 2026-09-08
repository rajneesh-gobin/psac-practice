'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - depth where scripts/nce-pool-depth.js says to write
//
//  ⚠ WRITTEN FROM A REPORT, NOT FROM A HUNCH. Four earlier batches each found
//    a different cause of repeated papers by hand, from a different throwaway
//    script. `scripts/nce-pool-depth.js` now measures it, and its answer for
//    this batch was specific:
//
//        write here first - these chapters cannot avoid repeating:
//          g9m-volume   has 4 distinct memorable stimuli, asked for 5
//
//    A chapter's TASK count says nothing about this. `g9m-volume` holds 32
//    tasks and only FOUR distinct memorable stimuli, because most of its pool
//    is small text questions and its figures are a cuboid and a cylinder -
//    both of which `g9m-surface-area` also draws.
//
//  ⚠ THE FAMILIES HERE ARE NEW TO THE WHOLE PACK: a cone, an L-shaped prism, a
//    tank with a trapezoidal cross-section, a row of containers, a matrix
//    written as a bracketed grid, and a growing square pattern. The report
//    lists ten families currently shared between two chapters; adding another
//    cuboid would have deepened none of them.
//
//  ⚠ `g9m-matrices` had ZERO memorable stimuli - 23 tasks, not one of which a
//    child would recognise on sight. A matrix printed as a bracketed grid is a
//    figure, and the papers print them that way.
//
//  ⚠ Italic inside an svg is a <tspan>; <i> ends the svg element. Left-hand
//    labels read right-to-left and an svg clips at its viewBox.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const SRC = 'NCF Grades 7-9 §3.9; NCE body questions. Written against '
          + 'scripts/nce-pool-depth.js, which names the chapters that cannot avoid repeating.';

const SVG = (w, h) => '<svg viewBox="0 0 ' + Math.round(w) + ' ' + Math.round(h) + '" width="'
  + Math.round(w) + '" height="' + Math.round(h)
  + '" xmlns="http://www.w3.org/2000/svg" role="img">';
const n1 = v => (+v).toFixed(1);

// ── 1. A cone ────────────────────────────────────────────────────────────
function cone(rL, hL) {
  const cx = 118, top = 26, bot = 140, rx = 56, ry = 15;
  const g = `<path d="M ${cx - rx} ${bot} L ${cx} ${top} L ${cx + rx} ${bot}" fill="none" stroke="#000" stroke-width="1.6"/>`
    + `<path d="M ${cx - rx} ${bot} A ${rx} ${ry} 0 0 0 ${cx + rx} ${bot}" fill="none" stroke="#000" stroke-width="1.6"/>`
    + `<path d="M ${cx - rx} ${bot} A ${rx} ${ry} 0 0 1 ${cx + rx} ${bot}" fill="none" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>`
    + `<line x1="${cx}" y1="${top}" x2="${cx}" y2="${bot}" stroke="#000" stroke-width="1" stroke-dasharray="3 3"/>`
    + `<line x1="${cx}" y1="${bot}" x2="${cx + rx}" y2="${bot}" stroke="#000" stroke-width="1.2"/>`
    + `<text x="${cx + rx / 2}" y="${bot + 16}" font-size="12" text-anchor="middle">${rL}</text>`
    + `<text x="${cx - 8}" y="${(top + bot) / 2}" font-size="12" text-anchor="end">${hL}</text>`;
  return SVG(cx + rx + 34, bot + 30) + g + '</svg>';
}
const ALT_CONE = 'A cone drawn in three dimensions with its vertical height and the radius of its base marked.';

// ── 2. An L-shaped prism (a step block) ──────────────────────────────────
function lPrism(aL, bL, cL, dL, depthL) {
  const s = 4.6, x0 = 56, y0 = 30, dx = 34, dy = -24;
  const a = 20 * s, b = 18 * s, c = 11 * s, d = 8 * s;
  const pts = [[0, 0], [a, 0], [a, b - d], [a - c, b - d], [a - c, b], [0, b]];
  const P = p => (x0 + p[0]).toFixed(1) + ',' + (y0 + p[1]).toFixed(1);
  let g = `<polygon points="${pts.map(P).join(' ')}" fill="none" stroke="#000" stroke-width="1.6"/>`;
  [[0, 0], [a, 0], [a, b - d]].forEach(p => {
    g += `<line x1="${(x0 + p[0]).toFixed(1)}" y1="${(y0 + p[1]).toFixed(1)}" `
       + `x2="${(x0 + p[0] + dx).toFixed(1)}" y2="${(y0 + p[1] + dy).toFixed(1)}" stroke="#000" stroke-width="1.2"/>`;
  });
  const back = pts.slice(0, 3).map(p => (x0 + p[0] + dx).toFixed(1) + ',' + (y0 + p[1] + dy).toFixed(1));
  g += `<polyline points="${back.join(' ')}" fill="none" stroke="#000" stroke-width="1.2"/>`;
  g += `<text x="${(x0 + a / 2).toFixed(1)}" y="${y0 - 8}" font-size="12" text-anchor="middle">${aL}</text>`
     + `<text x="${x0 - 8}" y="${(y0 + b / 2).toFixed(1)}" font-size="12" text-anchor="end">${bL}</text>`
     + `<text x="${(x0 + a - c / 2).toFixed(1)}" y="${(y0 + b + 16).toFixed(1)}" font-size="12" text-anchor="middle">${cL}</text>`
     + `<text x="${(x0 + a + 8).toFixed(1)}" y="${(y0 + (b - d) / 2).toFixed(1)}" font-size="12" text-anchor="start">${dL}</text>`
     + `<text x="${(x0 + a + dx + 6).toFixed(1)}" y="${(y0 + dy + 4).toFixed(1)}" font-size="12" text-anchor="start">${depthL}</text>`;
  return SVG(x0 + a + dx + 76, y0 + b + 30) + g + '</svg>';
}
const ALT_LPRISM = 'A solid whose end face is an L-shape, drawn in three dimensions with its edges labelled.';

// ── 3. A tank with a trapezoidal cross-section ───────────────────────────
function tank(topL, botL, depthL, lenL) {
  const x0 = 58, y0 = 28, top = 176, bot = 108, h = 82, dx = 30, dy = -22;
  const off = (top - bot) / 2;
  const F = [[0, 0], [top, 0], [top - off, h], [off, h]];
  const P = p => (x0 + p[0]).toFixed(1) + ',' + (y0 + p[1]).toFixed(1);
  let g = `<polygon points="${F.map(P).join(' ')}" fill="none" stroke="#000" stroke-width="1.6"/>`;
  F.slice(0, 3).forEach(p => {
    g += `<line x1="${(x0 + p[0]).toFixed(1)}" y1="${(y0 + p[1]).toFixed(1)}" `
       + `x2="${(x0 + p[0] + dx).toFixed(1)}" y2="${(y0 + p[1] + dy).toFixed(1)}" stroke="#000" stroke-width="1.2"/>`;
  });
  g += `<polyline points="${F.slice(0, 3).map(p => (x0 + p[0] + dx).toFixed(1) + ',' + (y0 + p[1] + dy).toFixed(1)).join(' ')}" fill="none" stroke="#000" stroke-width="1.2"/>`
     + `<text x="${(x0 + top / 2).toFixed(1)}" y="${y0 - 8}" font-size="12" text-anchor="middle">${topL}</text>`
     + `<text x="${(x0 + top / 2).toFixed(1)}" y="${(y0 + h + 17).toFixed(1)}" font-size="12" text-anchor="middle">${botL}</text>`
     + `<text x="${x0 - 8}" y="${(y0 + h / 2).toFixed(1)}" font-size="12" text-anchor="end">${depthL}</text>`
     + `<text x="${(x0 + top + dx + 6).toFixed(1)}" y="${(y0 + dy + 4).toFixed(1)}" font-size="12" text-anchor="start">${lenL}</text>`;
  return SVG(x0 + top + dx + 74, y0 + h + 30) + g + '</svg>';
}
const ALT_TANK = 'A tank drawn in three dimensions whose end face is a trapezium, with the two parallel edges, the depth and the length labelled.';

// ── 4. A row of containers of different sizes ────────────────────────────
function containers(spec) {
  const x0 = 44, base = 152, per = 74;
  let g = '';
  spec.forEach((c, i) => {
    const w = 46, h = c.h;
    const x = x0 + i * per;
    g += `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="none" stroke="#000" stroke-width="1.6"/>`
       + `<rect x="${x + 3}" y="${base - h * c.frac + 3}" width="${w - 6}" height="${(h * c.frac - 6).toFixed(1)}" fill="#d8d8d8"/>`
       + `<text x="${x + w / 2}" y="${base + 17}" font-size="12" text-anchor="middle">${c.label}</text>`
       + `<text x="${x + w / 2}" y="${base - h - 8}" font-size="11" text-anchor="middle">${c.cap}</text>`;
  });
  return SVG(x0 + spec.length * per + 20, base + 28) + g + '</svg>';
}
const ALT_CONTAINERS = 'Three containers of different heights drawn side by side, each part-filled and labelled with its capacity.';

// ── 5. A matrix printed as a bracketed grid ──────────────────────────────
function matrix(rows, label) {
  const cw = 46, rh = 30, x0 = 46, y0 = 26;
  const w = rows[0].length * cw, h = rows.length * rh;
  let g = `<path d="M ${x0 - 8} ${y0} q -9 ${h / 2} 0 ${h}" fill="none" stroke="#000" stroke-width="1.8"/>`
        + `<path d="M ${x0 + w + 8} ${y0} q 9 ${h / 2} 0 ${h}" fill="none" stroke="#000" stroke-width="1.8"/>`;
  rows.forEach((r, i) => r.forEach((v, j) => {
    g += `<text x="${x0 + j * cw + cw / 2}" y="${y0 + i * rh + rh / 2 + 5}" font-size="14" text-anchor="middle">${v}</text>`;
  }));
  if (label) g += `<text x="${x0 - 30}" y="${y0 + h / 2 + 5}" font-size="14" font-weight="bold" text-anchor="middle">${label}</text>`;
  return SVG(x0 + w + 40, y0 + h + 24) + g + '</svg>';
}
const ALT_MATRIX = 'A matrix written as a grid of numbers inside curved brackets.';

// ── 6. A growing pattern of squares ──────────────────────────────────────
function squarePattern(counts) {
  const u = 15, gap = 34, y0 = 30;
  let g = '', x = 34;
  counts.forEach((n, i) => {
    for (let k = 0; k < n; k++) {
      const col = k % Math.ceil(Math.sqrt(n)), row = Math.floor(k / Math.ceil(Math.sqrt(n)));
      g += `<rect x="${x + col * u}" y="${y0 + row * u}" width="${u - 2}" height="${u - 2}" fill="#d0d0d0" stroke="#000" stroke-width="1.1"/>`;
    }
    const side = Math.ceil(Math.sqrt(n));
    g += `<text x="${x + side * u / 2}" y="${y0 + side * u + 18}" font-size="11" text-anchor="middle">Figure ${i + 1}</text>`;
    x += side * u + gap;
  });
  return SVG(x + 10, y0 + 5 * u + 30) + g + '</svg>';
}
const ALT_SQPATTERN = 'Three figures in a growing pattern, each made of small squares arranged in a larger square.';

const P = (label, prompt, marks, answer, unit, hint, explanation, extra) => ({
  label, prompt, marks, hint, explanation,
  response: Object.assign({ kind: 'number', answer: String(answer) }, unit ? { unit } : {}, extra || {}),
});

const ITEMS = [

  // ── g9m-volume : the one chapter the report named ─────────────────────
  ['g9m-dep-001', 'g9m-volume', 'prisms_and_cylinders', 4, [
    P('a.i', 'The volume of a cone is <sup>1</sup>&frasl;<sub>3</sub>&pi;<i>r</i><sup>2</sup><i>h</i>. '
      + 'Taking &pi; = 3.14, calculate the volume of the cone shown.', 3, '314', 'cm³',
      'Square the radius, multiply by the height and by pi, then divide by 3.',
      '&#8531; &times; 3.14 &times; 5&sup2; &times; 12 = &#8531; &times; 3.14 &times; 300 = 314 cm&sup3;.'),
    P('a.ii', 'A cylinder has the same radius and height. How many times larger is its volume?',
      2, '3', 'times', 'A cone is one third of the cylinder that contains it.',
      'The cylinder is &pi;r&sup2;h and the cone is a third of that, so the cylinder is 3 times larger.'),
  ], cone('5 cm', '12 cm'), ALT_CONE],

  ['g9m-dep-002', 'g9m-volume', 'prisms_and_cylinders', 4, [
    P('a.i', 'The solid has an L-shaped end face. Calculate the <b>area</b> of that face.',
      3, '272', 'cm²', 'Split the L into two rectangles, or take a piece from a big one.',
      'The whole rectangle is 20 &times; 18 = 360 cm&sup2; and the missing corner is 11 &times; 8 = 88 cm&sup2;, '
      + 'so the face is 360 &minus; 88 = 272 cm&sup2;.'),
    P('a.ii', 'The solid is 9 cm deep. Calculate its <b>volume</b>.', 2, '2448', 'cm³',
      'Area of the end face multiplied by the depth.', '272 &times; 9 = 2 448 cm&sup3;.'),
  ], lPrism('20 cm', '18 cm', '11 cm', '10 cm', '9 cm'), ALT_LPRISM],

  ['g9m-dep-003', 'g9m-volume', 'prisms_and_cylinders', 4, [
    P('a.i', 'The tank has a trapezium as its end face. Calculate the <b>area</b> of that face.',
      2, '720', 'cm²', '&frac12; &times; (sum of the parallel sides) &times; depth.',
      '&frac12; &times; (24 + 12) &times; 40 = 18 &times; 40 = 720 cm&sup2;.'),
    P('a.ii', 'The tank is 50 cm long. Calculate its <b>volume</b>.', 2, '36000', 'cm³',
      'End area multiplied by length.', '720 &times; 50 = 36 000 cm&sup3;.'),
    P('b', 'Express that volume in <b>litres</b> (1 litre = 1 000 cm&sup3;).', 1, '36', 'litres',
      'Divide by 1 000.', '36 000 &divide; 1 000 = 36 litres.'),
  ], tank('24 cm', '12 cm', '40 cm', '50 cm'), ALT_TANK],

  // ── g9m-matrices : 23 tasks and ZERO memorable stimuli ────────────────
  ['g9m-dep-004', 'g9m-matrices', 'order_types_operations', 2, [
    P('a', 'Write down the <b>order</b> of matrix <b>A</b> shown, in the form rows &times; columns. '
      + 'Give the number of rows.', 2, '2', null,
      'Count the horizontal lines of numbers.', 'There are 2 rows and 3 columns, so the order is 2 &times; 3.'),
    P('b', 'Write down the number of <b>columns</b>.', 2, '3', null,
      'Count the vertical lines of numbers.', 'There are 3 columns.'),
  ], matrix([['3', '&minus;1', '5'], ['0', '4', '2']], 'A'), ALT_MATRIX],

  ['g9m-dep-005', 'g9m-matrices', 'order_types_operations', 3, [
    P('a.i', 'Matrix <b>B</b> is shown. Write down the element in row 2, column 1.',
      2, '7', null, 'Second row, first column.', 'The element in row 2, column 1 is 7.'),
    P('a.ii', 'Calculate the <b>sum</b> of all four elements of <b>B</b>.', 2, '16', null,
      'Add every number in the matrix.', '2 + 5 + 7 + 2 = 16.'),
  ], matrix([['2', '5'], ['7', '2']], 'B'), ALT_MATRIX],

  // ── g9m-capacity : 2 memorable stimuli, and the jug is shared ─────────
  ['g9m-dep-006', 'g9m-capacity', 'units_and_problems', 3, [
    P('a', 'Three containers are shown with their capacities. What is their <b>total</b> capacity '
      + 'in litres?', 2, '9', 'litres', 'Add the three capacities.', '2 + 3 + 4 = 9 litres.'),
    P('b', 'Each is half full. How much liquid is there altogether?', 2, '4.5', 'litres',
      'Half of the total capacity.', '&frac12; of 9 = 4.5 litres.'),
  ], containers([{ label: 'A', cap: '2 L', h: 60, frac: 0.5 },
                 { label: 'B', cap: '3 L', h: 88, frac: 0.5 },
                 { label: 'C', cap: '4 L', h: 116, frac: 0.5 }]), ALT_CONTAINERS],

  ['g9m-dep-007', 'g9m-capacity', 'units_and_problems', 4, [
    P('a.i', 'Container C holds 4 litres when full and is shown three quarters full. '
      + 'How many litres does it contain?', 2, '3', 'litres',
      'Three quarters of its capacity.', '&frac34; of 4 = 3 litres.'),
    P('a.ii', 'How many <b>millilitres</b> is that?', 2, '3000', 'ml',
      '1 litre is 1 000 millilitres.', '3 &times; 1 000 = 3 000 ml.'),
  ], containers([{ label: 'A', cap: '1 L', h: 52, frac: 0.25 },
                 { label: 'B', cap: '2 L', h: 80, frac: 0.5 },
                 { label: 'C', cap: '4 L', h: 116, frac: 0.75 }]), ALT_CONTAINERS],

  // ── g9m-patterns : 2 memorable stimuli across 24 tasks ────────────────
  ['g9m-dep-008', 'g9m-patterns', 'sequences_and_figures', 3, [
    P('a', 'The pattern is made of small squares. How many squares are in <b>Figure 4</b>?',
      2, '16', 'squares', 'Each figure is a square of squares.',
      'The figures hold 1, 4, 9 squares - the square numbers - so Figure 4 holds 4&sup2; = 16.'),
    P('b', 'How many squares are in <b>Figure 10</b>?', 2, '100', 'squares',
      'Square the figure number.', '10&sup2; = 100 squares.'),
  ], squarePattern([1, 4, 9]), ALT_SQPATTERN],

  ['g9m-dep-009', 'g9m-patterns', 'sequences_and_figures', 4, [
    P('a.i', 'The pattern grows as shown. Write down the number of squares in <b>Figure 4</b>.',
      2, '25', 'squares', 'Look at how the side length grows.',
      'The sides are 2, 3, 4, so Figure 4 has side 5 and holds 5&sup2; = 25 squares.'),
    P('a.ii', 'The <i>n</i>th figure has (<i>n</i> + 1)<sup>2</sup> squares. How many squares are '
      + 'in <b>Figure 12</b>?', 2, '169', 'squares',
      'Substitute n = 12 into the rule.', '(12 + 1)&sup2; = 13&sup2; = 169 squares.'),
  ], squarePattern([4, 9, 16]), ALT_SQPATTERN],
];

ITEMS.forEach(([id, chapterId, subsection, difficulty, parts, svg, alt]) => {
  STATIC_QUESTIONS.push(makeTask(Object.assign({
    id, chapterId, subsection, difficulty, source: SRC, parts,
  }, svg ? { stimulus: { html: svg, altText: alt } } : {})));
});

})();
