'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - figure families no OTHER chapter draws
//
//  ⚠ THE REMAINING REPEATS ARE CROSS-CHAPTER FAMILY REUSE, not a shortage of
//    tasks. After visual_bank.js five papers repeat 21.1% of their memorable
//    stimuli, and the survivors all have the same cause: `g9m-surface-area`
//    holds four DISTINCT figure families at four marks and the cuboid still
//    appeared four times, because a cuboid is also what `g9m-volume` and
//    `extended_bank_2.js` draw. One paper can take a cuboid from three
//    different chapters and every one of them counts as fresh.
//
//        x4  cuboid       drawn by volume, surface-area AND extended_bank_2
//        x2  number line  drawn by number-revision AND inequalities
//        x2  measuring jug drawn by number-revision AND capacity
//        x2  triangular prism  drawn by surface-area AND expressions
//
//    Batch 15 learned this one level down - one family serving four chapters -
//    and fixed it inside a single file. The same rule applies ACROSS files, and
//    nothing enforces it, so it has to be checked by measuring which altText
//    strings a chapter shares with its neighbours.
//
//  ⚠ So every family here is one that appears NOWHERE ELSE in the pack: a net,
//    a square-based pyramid, a pictogram, a time-series graph, a polygon with
//    its interior angles, a thermometer, counters in a bag, a stem-and-leaf
//    table. Adding a fifth cuboid would have changed nothing.
//
//  ⚠ Italic inside an svg is a <tspan>; <i> ends the svg element. Left-hand
//    labels read right-to-left and an svg clips at its viewBox.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const SRC = 'NCF Grades 7-9 §3.9; NCE body questions. Figure families chosen so no '
          + 'chapter shares a shape with another.';

const SVG = (w, h) => '<svg viewBox="0 0 ' + Math.round(w) + ' ' + Math.round(h) + '" width="'
  + Math.round(w) + '" height="' + Math.round(h)
  + '" xmlns="http://www.w3.org/2000/svg" role="img">';
const n1 = v => (+v).toFixed(1);
const RAD = d => d * Math.PI / 180;

// ── 1. The NET of a cuboid, opened flat ──────────────────────────────────
function net(lL, wL, hL) {
  const u = 34, x0 = 40, y0 = 22;
  const c = (cx, cy, cw, ch) => `<rect x="${x0 + cx * u}" y="${y0 + cy * u}" width="${cw * u}" `
    + `height="${ch * u}" fill="none" stroke="#000" stroke-width="1.5"/>`;
  let g = c(1, 0, 2, 1) + c(0, 1, 1, 2) + c(1, 1, 2, 2) + c(3, 1, 1, 2) + c(1, 3, 2, 1) + c(1, 4, 2, 1);
  g += `<text x="${x0 + 2 * u}" y="${y0 + 0.6 * u}" font-size="11" text-anchor="middle">${lL}</text>`
     + `<text x="${x0 + 0.5 * u}" y="${y0 + 2.1 * u}" font-size="11" text-anchor="middle">${hL}</text>`
     + `<text x="${x0 + 2 * u}" y="${y0 + 2.1 * u}" font-size="11" text-anchor="middle">${wL}</text>`;
  return SVG(x0 + 4 * u + 34, y0 + 5 * u + 24) + g + '</svg>';
}
const ALT_NET = 'The net of a closed box opened out flat, made of six rectangles, three of them labelled.';

// ── 2. A square-based pyramid ────────────────────────────────────────────
function pyramid(baseL, heightL) {
  const x0 = 56, y0 = 26, w = 130, d = 40, h = 96;
  const A = [x0, y0 + h], B = [x0 + w, y0 + h], C = [x0 + w + d, y0 + h - d], D = [x0 + d, y0 + h - d];
  const apex = [x0 + (w + d) / 2, y0];
  const P = p => p[0] + ',' + p[1];
  let g = `<polygon points="${P(A)} ${P(B)} ${P(apex)}" fill="none" stroke="#000" stroke-width="1.6"/>`
    + `<polyline points="${P(B)} ${P(C)} ${P(apex)}" fill="none" stroke="#000" stroke-width="1.6"/>`
    + `<polyline points="${P(A)} ${P(D)} ${P(apex)}" fill="none" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>`
    + `<line x1="${D[0]}" y1="${D[1]}" x2="${C[0]}" y2="${C[1]}" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>`
    + `<line x1="${apex[0]}" y1="${apex[1]}" x2="${apex[0]}" y2="${y0 + h - d / 2}" stroke="#000" stroke-width="1" stroke-dasharray="3 3"/>`
    + `<text x="${x0 + w / 2}" y="${y0 + h + 18}" font-size="12" text-anchor="middle">${baseL}</text>`
    + `<text x="${apex[0] + 8}" y="${y0 + h / 2}" font-size="12" text-anchor="start">${heightL}</text>`;
  return SVG(x0 + w + d + 44, y0 + h + 28) + g + '</svg>';
}
const ALT_PYRAMID = 'A pyramid on a square base drawn in three dimensions, with the base edge and the vertical height labelled.';

// ── 3. A pictogram: rows of repeated symbols ─────────────────────────────
function pictogram(rows, keyText) {
  const x0 = 92, y0 = 26, rh = 30, s = 11;
  let g = '';
  rows.forEach((r, i) => {
    const y = y0 + i * rh;
    g += `<text x="${x0 - 10}" y="${y + 5}" font-size="12" text-anchor="end">${r.label}</text>`;
    for (let k = 0; k < Math.floor(r.n); k++) {
      g += `<circle cx="${x0 + 12 + k * (s + 10)}" cy="${y}" r="${s / 2 + 2}" fill="#bdbdbd" stroke="#000" stroke-width="1.1"/>`;
    }
    if (r.n % 1) {
      const k = Math.floor(r.n);
      g += `<path d="M ${x0 + 12 + k * (s + 10)} ${y - s / 2 - 2} A ${s / 2 + 2} ${s / 2 + 2} 0 0 1 `
         + `${x0 + 12 + k * (s + 10)} ${y + s / 2 + 2} Z" fill="#bdbdbd" stroke="#000" stroke-width="1.1"/>`;
    }
  });
  const maxN = Math.max(...rows.map(r => Math.ceil(r.n)));
  g += `<text x="${x0 - 10}" y="${y0 + rows.length * rh + 10}" font-size="11" text-anchor="end">Key:</text>`
     + `<circle cx="${x0 + 12}" cy="${y0 + rows.length * rh + 6}" r="${s / 2 + 2}" fill="#bdbdbd" stroke="#000" stroke-width="1.1"/>`
     + `<text x="${x0 + 28}" y="${y0 + rows.length * rh + 10}" font-size="11">= ${keyText}</text>`;
  return SVG(x0 + 30 + maxN * (s + 10) + 40, y0 + rows.length * rh + 30) + g + '</svg>';
}
const ALT_PICTO = 'A pictogram with one row per category, each row made of repeated circular symbols, and a key below.';

// ── 4. A time-series line graph with plotted points ──────────────────────
function timeSeries(labels, vals, xTitle, yTitle) {
  const x0 = 58, y0 = 20, w = 232, h = 128;
  const max = Math.max(...vals, 1);
  const step = w / (labels.length - 1);
  const X = i => x0 + i * step, Y = v => y0 + h - (v / max) * h;
  let g = `<line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y0 + h}" stroke="#000" stroke-width="1.4"/>`
        + `<line x1="${x0}" y1="${y0 + h}" x2="${x0 + w}" y2="${y0 + h}" stroke="#000" stroke-width="1.4"/>`;
  for (let v = 0; v <= max; v += Math.max(1, Math.round(max / 5))) {
    g += `<line x1="${x0}" y1="${n1(Y(v))}" x2="${x0 + w}" y2="${n1(Y(v))}" stroke="#ddd" stroke-width="0.6"/>`
       + `<text x="${x0 - 6}" y="${n1(Y(v) + 4)}" font-size="10" text-anchor="end">${v}</text>`;
  }
  let path = '';
  vals.forEach((v, i) => { path += (i ? ' L ' : 'M ') + n1(X(i)) + ' ' + n1(Y(v)); });
  g += `<path d="${path}" fill="none" stroke="#000" stroke-width="1.8"/>`;
  vals.forEach((v, i) => {
    g += `<circle cx="${n1(X(i))}" cy="${n1(Y(v))}" r="3.2" fill="#000"/>`
       + `<text x="${n1(X(i))}" y="${y0 + h + 15}" font-size="10" text-anchor="middle">${labels[i]}</text>`;
  });
  g += `<text x="${x0 + w / 2}" y="${y0 + h + 31}" font-size="11" text-anchor="middle" font-weight="bold">${xTitle}</text>`
     + `<text x="18" y="${y0 + h / 2}" font-size="11" text-anchor="middle" font-weight="bold"`
     + ` transform="rotate(-90 18 ${y0 + h / 2})">${yTitle}</text>`;
  return SVG(x0 + w + 16, y0 + h + 40) + g + '</svg>';
}
const ALT_TIMESERIES = 'A line graph with points joined in order across a labelled horizontal axis and a numbered vertical axis.';

// ── 5b. A regular polygon with ONE SIDE labelled ─────────────────────────
function regularPolygon(sides, sideLabel) {
  const cx = 118, cy = 104, r = 78;
  const pts = [];
  for (let i = 0; i < sides; i++) {
    const a = -90 + i * 360 / sides;
    pts.push([cx + r * Math.cos(RAD(a)), cy + r * Math.sin(RAD(a))]);
  }
  let g = `<polygon points="${pts.map(p => n1(p[0]) + ',' + n1(p[1])).join(' ')}" fill="none" stroke="#000" stroke-width="1.6"/>`;
  // Label the side whose midpoint is furthest right, so the text has room.
  let best = 0, bx = -Infinity;
  for (let i = 0; i < sides; i++) {
    const m = (pts[i][0] + pts[(i + 1) % sides][0]) / 2;
    if (m > bx) { bx = m; best = i; }
  }
  const a = pts[best], b = pts[(best + 1) % sides];
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
  const ox = mx - cx, oy = my - cy, om = Math.hypot(ox, oy);
  g += `<text x="${n1(mx + 18 * ox / om)}" y="${n1(my + 18 * oy / om + 4)}" font-size="12" text-anchor="start">${sideLabel}</text>`;
  return SVG(cx + r + 96, cy + r + 26) + g + '</svg>';
}
const ALT_REGPOLY = 'A regular polygon with all its sides drawn equal and one side labelled.';

// ── 5. A regular polygon with one interior angle marked ──────────────────
function polygonAngles(sides, mark) {
  const cx = 118, cy = 108, r = 82;
  const pts = [];
  for (let i = 0; i < sides; i++) {
    const a = -90 + i * 360 / sides;
    pts.push([cx + r * Math.cos(RAD(a)), cy + r * Math.sin(RAD(a))]);
  }
  let g = `<polygon points="${pts.map(p => n1(p[0]) + ',' + n1(p[1])).join(' ')}" fill="none" stroke="#000" stroke-width="1.6"/>`;
  const v = pts[0], prev = pts[sides - 1], next = pts[1];
  const u = t => { const dx = t[0] - v[0], dy = t[1] - v[1], m = Math.hypot(dx, dy); return [dx / m, dy / m]; };
  const [ax, ay] = u(prev), [bx, by] = u(next);
  g += `<path d="M ${n1(v[0] + 22 * ax)} ${n1(v[1] + 22 * ay)} A 22 22 0 0 ${ax * by - ay * bx > 0 ? 1 : 0} `
     + `${n1(v[0] + 22 * bx)} ${n1(v[1] + 22 * by)}" fill="none" stroke="#000" stroke-width="1.2"/>`;
  const m = [ax + bx, ay + by], mm = Math.hypot(m[0], m[1]);
  g += `<text x="${n1(v[0] + 40 * m[0] / mm)}" y="${n1(v[1] + 40 * m[1] / mm + 4)}" font-size="13" text-anchor="middle">${mark}</text>`;
  return SVG(cx + r + 36, cy + r + 26) + g + '</svg>';
}
const ALT_POLY = 'A regular polygon with one of its interior angles marked by an arc and labelled.';

// ── 6. A thermometer with a reading ──────────────────────────────────────
function thermometer(min, max, reading, unit) {
  const x0 = 84, y0 = 22, w = 22, h = 148;
  const frac = (reading - min) / (max - min), top = y0 + h - h * frac;
  let g = `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="9" fill="none" stroke="#000" stroke-width="1.6"/>`
    + `<rect x="${x0 + 4}" y="${n1(top)}" width="${w - 8}" height="${n1(y0 + h - top - 2)}" fill="#9a9a9a"/>`
    + `<circle cx="${x0 + w / 2}" cy="${y0 + h + 12}" r="13" fill="#9a9a9a" stroke="#000" stroke-width="1.6"/>`;
  const steps = 5;
  for (let i = 0; i <= steps; i++) {
    const v = min + (max - min) * i / steps, y = y0 + h - h * (i / steps);
    g += `<line x1="${x0 - 8}" y1="${n1(y)}" x2="${x0}" y2="${n1(y)}" stroke="#000" stroke-width="1.1"/>`
       + `<text x="${x0 - 12}" y="${n1(y + 4)}" font-size="11" text-anchor="end">${v}</text>`;
  }
  g += `<text x="${x0 + w + 10}" y="${n1(top + 4)}" font-size="11" text-anchor="start">&larr;</text>`
     + `<text x="${x0 + w / 2}" y="${y0 + h + 40}" font-size="11" text-anchor="middle">${unit}</text>`;
  return SVG(x0 + w + 52, y0 + h + 52) + g + '</svg>';
}
const ALT_THERMO = 'A thermometer with a numbered scale and the liquid column reaching one of the marks, indicated by an arrow.';

// ── 7. Counters in a bag ─────────────────────────────────────────────────
function counters(spec) {
  const x0 = 34, y0 = 44, per = 40, gap = 26;
  // ⚠ The bag has to be drawn AFTER the tallest column is known, or the
  //   counters spill out of it.
  const tall = Math.max(...spec.map(c => c.n));
  const bagH = (tall - 1) * gap + 46;
  let g = `<path d="M ${x0 - 12} ${y0 - 26} q 0 -14 20 -14 h ${spec.length * per - 16} q 20 0 20 14 `
    + `v ${bagH} q 0 16 -20 16 h -${spec.length * per - 16} q -20 0 -20 -16 z" fill="none" stroke="#000" stroke-width="1.6"/>`;
  spec.forEach((c, i) => {
    for (let k = 0; k < c.n; k++) {
      const cx = x0 + i * per + 12, cy = y0 + k * gap;
      g += `<circle cx="${cx}" cy="${cy}" r="11" fill="${c.fill}" stroke="#000" stroke-width="1.3"/>`
         + `<text x="${cx}" y="${cy + 4}" font-size="11" text-anchor="middle">${c.label}</text>`;
    }
  });
  return SVG(x0 + spec.length * per + 34, y0 + bagH + 24) + g + '</svg>';
}
const ALT_COUNTERS = 'A bag drawn in outline containing counters of more than one kind, each marked with a letter.';

// ── 8. A stem-and-leaf table ─────────────────────────────────────────────
function stemLeaf(rows, keyText) {
  return '<table style="border-collapse:collapse;font-size:13px;margin:4px 0">'
    + '<style>table th,table td{border:1px solid #000;padding:3px 10px;text-align:left}'
    + 'table th{font-weight:bold;background:#efefef}</style>'
    + '<thead><tr><th>Stem</th><th>Leaf</th></tr></thead><tbody>'
    + rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')
    + '</tbody></table><div style="font-size:12px;margin-top:2px">Key: ' + keyText + '</div>';
}

const P = (label, prompt, marks, answer, unit, hint, explanation, extra) => ({
  label, prompt, marks, hint, explanation,
  response: Object.assign({ kind: 'number', answer: String(answer) }, unit ? { unit } : {}, extra || {}),
});

const ITEMS = [

  // ── surface-area : the cuboid is shared with volume and extended_bank ──
  ['g9m-vsb-001', 'g9m-surface-area', 'nets_and_surface_area', 3, [
    P('a', 'The diagram shows the <b>net</b> of a closed box. How many <b>faces</b> does the box have?',
      1, '6', 'faces', 'Count the rectangles in the net.',
      'A closed box has six faces, and the net shows six rectangles.'),
    P('b', 'Using the net, calculate the <b>total surface area</b> of the closed box.', 3, '158', 'cm²',
      'Add the areas of all six rectangles, or use 2(lw + lh + wh).',
      '2(8&times;5 + 8&times;3 + 5&times;3) = 2(40 + 24 + 15) = 2 &times; 79 = 158 cm&sup2;.'),
  ], net('8 cm', '5 cm', '3 cm'), ALT_NET],

  ['g9m-vsb-002', 'g9m-surface-area', 'nets_and_surface_area', 4, [
    P('a', 'The pyramid stands on a square base of side 10 cm. Calculate the <b>area of its base</b>.',
      2, '100', 'cm²', 'The base is a square.', '10 &times; 10 = 100 cm&sup2;.'),
    P('b', 'The volume of a pyramid is <sup>1</sup>&frasl;<sub>3</sub> &times; base area &times; height. '
      + 'Calculate the volume.', 2, '400', 'cm³', 'Use the height marked on the figure.',
      '&#8531; &times; 100 &times; 12 = 400 cm&sup3;.'),
  ], pyramid('10 cm', '12 cm'), ALT_PYRAMID],

  // ── statistics : one figure family at 7 marks, and it repeated x3 ──────
  ['g9m-vsb-003', 'g9m-statistics', 'frequency_and_averages', 4, [
    P('a.i', 'The pictogram shows how many books four classes read. How many books did <b>Class B</b> read?',
      2, '25', 'books', 'Each whole symbol stands for 10 books.',
      'Class B shows 2 and a half symbols, and 2.5 &times; 10 = 25 books.'),
    P('a.ii', 'How many books were read <b>altogether</b>?', 2, '105', 'books',
      'Add all four classes.',
      'A 30, B 25, C 20, D 30 gives 30 + 25 + 20 + 30 = 105 books.'),
    P('b', 'Calculate the <b>mean</b> number of books per class.', 1, '26.25', 'books',
      'Total divided by the number of classes.', '105 &divide; 4 = 26.25 books.'),
  ], pictogram([{ label: 'Class A', n: 3 }, { label: 'Class B', n: 2.5 },
                { label: 'Class C', n: 2 }, { label: 'Class D', n: 3 }], '10 books'), ALT_PICTO],

  ['g9m-vsb-004', 'g9m-statistics', 'frequency_and_averages', 4, [
    P('a.i', 'The graph shows a shop’s sales over five months. In which month were sales <b>highest</b>?',
      1, 'April', null, 'Find the highest point.', 'April is the highest point, at 40.',
      { kind: 'choice', variant: 'options', options: ['April', 'January', 'March', 'May'], answer: 'April' }),
    P('a.ii', 'By how much did sales <b>rise</b> from January to April?', 2, '25', null,
      'Subtract the January value from the April value.', '40 &minus; 15 = 25.'),
    P('b.i', 'Calculate the <b>mean</b> monthly sales over the five months.', 2, '28', null,
      'Add the five values and divide by 5.',
      '15 + 25 + 30 + 40 + 30 = 140, and 140 &divide; 5 = 28.'),
    P('b.ii', 'Calculate the <b>range</b> of the five values.', 2, '25', null,
      'Highest minus lowest.', '40 &minus; 15 = 25.'),
  ], timeSeries(['Jan', 'Feb', 'Mar', 'Apr', 'May'], [15, 25, 30, 40, 30], 'Month', 'Sales'),
     ALT_TIMESERIES],

  ['g9m-vsb-005', 'g9m-statistics', 'frequency_and_averages', 4, [
    P('a', 'The stem-and-leaf diagram shows the ages of a group. How many people are in the group?',
      1, '12', 'people', 'Count every leaf.', '4 + 5 + 3 = 12 leaves, so 12 people.'),
    P('b', 'Write down the <b>youngest</b> age.', 1, '12', 'years',
      'The first leaf on the first stem.', 'Stem 1, leaf 2 gives 12.'),
    P('c', 'Write down the <b>range</b> of the ages.', 2, '23', 'years',
      'Oldest minus youngest.', 'The oldest is 35 and the youngest 12, so 35 &minus; 12 = 23.'),
  ], stemLeaf([['1', '2  5  7  9'], ['2', '0  3  4  6  8'], ['3', '1  2  5']], '1 | 2 means 12 years'),
     'A stem-and-leaf diagram with three stems and their leaves, and a key explaining how to read it.'],

  // ── geometry-revision : one task at 5 marks, no figure at that size ────
  ['g9m-vsb-006', 'g9m-geometry-revision', 'grade7_8_geometry', 3, [
    P('a', 'The diagram shows a regular <b>pentagon</b>. Calculate the sum of its interior angles.',
      2, '540', '°', 'The sum for a polygon with n sides is (n &minus; 2) &times; 180&deg;.',
      '(5 &minus; 2) &times; 180 = 3 &times; 180 = 540&deg;.'),
    P('b', 'Hence find the size of one interior angle <i>p</i>.', 2, '108', '°',
      'A regular polygon has all its angles equal.', '540 &divide; 5 = 108&deg;.'),
    P('c', 'Calculate the size of one <b>exterior</b> angle.', 1, '72', '°',
      'An interior and its exterior angle lie on a straight line.',
      '180 &minus; 108 = 72&deg;. (Or 360 &divide; 5 = 72&deg;.)'),
  ], polygonAngles(5, '<tspan font-style="italic">p</tspan>'), ALT_POLY],

  ['g9m-vsb-007', 'g9m-geometry-revision', 'grade7_8_geometry', 4, [
    P('a', 'The diagram shows a regular <b>hexagon</b>. Calculate the sum of its interior angles.',
      2, '720', '°', '(n &minus; 2) &times; 180&deg;.', '(6 &minus; 2) &times; 180 = 720&deg;.'),
    P('b', 'Find the size of one interior angle <i>q</i>.', 2, '120', '°',
      'Divide the sum by the number of angles.', '720 &divide; 6 = 120&deg;.'),
  ], polygonAngles(6, '<tspan font-style="italic">q</tspan>'), ALT_POLY],

  // ── number-revision : number line and jug are shared with two chapters ─
  ['g9m-vsb-008', 'g9m-number-revision', 'ratio_and_measures', 3, [
    P('a', 'The thermometer shows the temperature at dawn. Write down the reading.',
      2, '10', '°C', 'Read the scale where the column stops.',
      'The column reaches the 10 mark, so the temperature is 10&deg;C.'),
    P('b', 'By midday the temperature has risen by 14&deg;C. Write down the midday temperature.',
      2, '24', '°C', 'Add the rise to the dawn reading.', '10 + 14 = 24&deg;C.'),
  ], thermometer(-10, 40, 10, '&deg;C'), ALT_THERMO],

  ['g9m-vsb-009', 'g9m-number-revision', 'ratio_and_measures', 4, [
    P('a', 'The thermometer reads &minus;5&deg;C. The temperature then rises by 18&deg;C. '
      + 'Find the new temperature.', 2, '13', '°C',
      'Adding to a negative number moves up the scale.', '&minus;5 + 18 = 13&deg;C.'),
    P('b', 'From 13&deg;C the temperature falls by 21&deg;C overnight. Find the temperature then.',
      2, '-8', '°C', 'Subtracting takes you back down past zero.', '13 &minus; 21 = &minus;8&deg;C.'),
  ], thermometer(-10, 40, -5, '&deg;C'), ALT_THERMO],

  // ── probability : the only figure is a spinner, shared across items ────
  ['g9m-vsb-010', 'g9m-probability', 'simple_and_combined_events', 3, [
    P('a', 'The bag contains the counters shown. Write down the probability of drawing a counter '
      + 'marked <b>R</b>.', 2, '3/8', null, 'Count the R counters out of the total.',
      'There are 3 R counters out of 8, so P(R) = 3/8.',
      { kind: 'expression', answer: '3/8', accept: ['0.375'] }),
    P('b', 'Write down the probability of drawing a counter that is <b>not</b> R.',
      2, '5/8', null, 'Subtract from 1, or count the others.',
      '1 &minus; 3/8 = 5/8. (Or 2 + 3 = 5 counters out of 8.)',
      { kind: 'expression', answer: '5/8', accept: ['0.625'] }),
  ], counters([{ label: 'R', n: 3, fill: '#c9c9c9' }, { label: 'B', n: 2, fill: '#ffffff' },
               { label: 'G', n: 3, fill: '#e8e8e8' }]), ALT_COUNTERS],

  ['g9m-vsb-011', 'g9m-probability', 'simple_and_combined_events', 4, [
    P('a', 'The bag contains the counters shown. One counter is drawn. Find the probability that '
      + 'it is marked <b>Y</b>.', 2, '1/3', null, 'Count the Y counters out of the total.',
      'There are 4 Y counters out of 12, so 4/12 = 1/3.',
      { kind: 'expression', answer: '1/3', accept: ['4/12'] }),
    P('b', 'A counter is drawn 60 times, and replaced each time. How many times would you '
      + '<b>expect</b> a Y?', 2, '20', 'times', 'Multiply the probability by the number of draws.',
      '&#8531; &times; 60 = 20 times.'),
  ], counters([{ label: 'Y', n: 4, fill: '#e8e8e8' }, { label: 'P', n: 5, fill: '#ffffff' },
               { label: 'W', n: 3, fill: '#c9c9c9' }]), ALT_COUNTERS],

  // ── manipulation : the repeat was a text intro, not a figure ───────────
  ['g9m-vsb-012', 'g9m-manipulation', 'formulae_and_subject', 4, [
    P('a', 'The volume of a pyramid is <i>V</i> = <sup>1</sup>&frasl;<sub>3</sub><i>Ah</i>, where '
      + '<i>A</i> is the base area. Find <i>V</i> when <i>A</i> = 48 cm&sup2; and <i>h</i> = 9 cm.',
      2, '144', 'cm³', 'Multiply, then divide by 3.', '&#8531; &times; 48 &times; 9 = 144 cm&sup3;.'),
    P('b', 'Make <i>h</i> the subject and hence find <i>h</i> when <i>V</i> = 200 cm&sup3; and '
      + '<i>A</i> = 25 cm&sup2;.', 2, '24', 'cm',
      'Multiply both sides by 3, then divide by A.',
      'h = 3V &divide; A = 600 &divide; 25 = 24 cm.'),
  ], pyramid('base area A', '<tspan font-style="italic">h</tspan>'), ALT_PYRAMID],

  // ── expressions : the prism is shared with surface-area ────────────────
  ['g9m-vsb-013', 'g9m-expressions', 'binomials_and_factorising', 4, [
    P('a', 'A regular hexagon has sides of length (<i>x</i> + 3) cm. Write an expression for its '
      + '<b>perimeter</b>, expanded.', 2, '6x+18', null,
      'Six equal sides.', '6(x + 3) = 6x + 18.', { kind: 'expression', answer: '6x+18' }),
    P('b', 'Find the perimeter when <i>x</i> = 4.', 2, '42', 'cm',
      'Substitute x = 4.', '6(4) + 18 = 24 + 18 = 42 cm.'),
  ], regularPolygon(6, '(' + '<tspan font-style="italic">x</tspan>' + ' + 3) cm'), ALT_REGPOLY],
];

ITEMS.forEach(([id, chapterId, subsection, difficulty, parts, svg, alt]) => {
  STATIC_QUESTIONS.push(makeTask(Object.assign({
    id, chapterId, subsection, difficulty, source: SRC, parts,
  }, svg ? { stimulus: { html: svg, altText: alt } } : {})));
});

})();
