'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - multi-part tasks at the SCARCE mark sizes
//
//  ⚠ WRITTEN AGAINST A MEASUREMENT, AND THE MEASUREMENT WAS NOT "the bank is
//    too small". After batch 12 the bank held 561 tasks and every blueprint
//    role cleared what ten papers need, yet five papers still repeated 53% of
//    their memorable stimuli and some items appeared in ALL FIVE. The cause is
//    the mark-size histogram, not the total:
//
//        marks per task :  1    2    3    4    5    6    7
//        tasks          : 199  240   77   22   14    7    2
//        of those, with
//        a figure       :  12   37   23    2    3    3    1
//
//    A paper has to total EXACTLY 100. When the assembler needs a seven it has
//    two candidates, so one of them lands in every paper; when it needs a
//    four-mark question carrying a figure it has two in the whole bank. That is
//    why `g9m-ext-012`, `g9m-ext-002`, the vector grid and the cuboid each
//    appeared 5 times in 5 papers. Writing another hundred one- and two-mark
//    items would not have moved it at all.
//
//    So this file is deliberately lopsided: 26 tasks, none below 4 marks, and
//    21 of them carrying a figure.
//
//  ⚠ MULTI-PART, NOT LONG. Every task here breaks into (a)/(b)/(c) where each
//    part earns its own marks and later parts build on earlier ones - which is
//    what the real papers do at the tail, and what gives a generated paper its
//    numbering depth. Padding a two-mark calculation with more words would
//    satisfy the histogram and nothing else.
//
//  ⚠ Original SVG, monochrome, no network. Italic inside an svg is a <tspan>:
//    <i> is an HTML breakout tag and ENDS the svg element - see
//    scripts/test-svg-figures.js and the header of ch19_geometry_revision.js.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const SRC = 'NCF Grades 7-9 §3.9; NCE 2024 Q31 (6 marks) and Q33 (7 marks) '
          + 'extended-tail pattern, and the 4-mark multi-part questions in the body.';

const ITAL = t => '<tspan font-style="italic">' + t + '</tspan>';
const SVG = (w, h) => '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h
  + '" xmlns="http://www.w3.org/2000/svg" role="img">';
const n1 = v => (+v).toFixed(1);

// ── Figures ───────────────────────────────────────────────────────────────

// A cuboid in oblique projection. x0 is 46 so the right-to-left height label
// does not run off the left edge of the viewBox - that clip printed "10 cm" as
// "0 cm" in ch04_volume.js until batch 11.
function cuboid(wL, dL, hL) {
  const x0 = 46, y0 = 24, w = 128, h = 80, dx = 36, dy = -23;
  const fl = y0 + h, fr = x0 + w, P = (x, y) => x + ',' + y;
  const g = `<polygon points="${P(x0, y0)} ${P(fr, y0)} ${P(fr, fl)} ${P(x0, fl)}" fill="none" stroke="#000" stroke-width="1.5"/>`
    + `<polyline points="${P(x0, y0)} ${P(x0 + dx, y0 + dy)} ${P(fr + dx, y0 + dy)} ${P(fr, y0)}" fill="none" stroke="#000" stroke-width="1.5"/>`
    + `<polyline points="${P(fr + dx, y0 + dy)} ${P(fr + dx, fl + dy)} ${P(fr, fl)}" fill="none" stroke="#000" stroke-width="1.5"/>`
    + `<polyline points="${P(x0, fl)} ${P(x0 + dx, fl + dy)} ${P(fr + dx, fl + dy)}" fill="none" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>`
    + `<line x1="${x0 + dx}" y1="${y0 + dy}" x2="${x0 + dx}" y2="${fl + dy}" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>`
    + `<text x="${x0 + w / 2}" y="${fl + 18}" font-size="12" text-anchor="middle">${wL}</text>`
    + `<text x="${x0 - 8}" y="${y0 + h / 2}" font-size="12" text-anchor="end">${hL}</text>`
    + `<text x="${fr + dx + 6}" y="${fl + dy + 24}" font-size="12" text-anchor="start">${dL}</text>`;
  return SVG(fr + dx + 64, fl + 26) + g + '</svg>';
}
const ALT_CUBOID = 'A cuboid drawn in three dimensions with its length, width and height labelled in centimetres.';

// A right-angled triangle with the right angle at the bottom left.
function rightTriangle(baseL, heightL, hypL, angL) {
  const x0 = 52, y0 = 22, w = 156, h = 96;
  const bx = x0, by = y0 + h;
  let g = `<polygon points="${bx},${by} ${bx + w},${by} ${bx},${y0}" fill="none" stroke="#000" stroke-width="1.6"/>`
    + `<path d="M ${bx + 14} ${by} L ${bx + 14} ${by - 14} L ${bx} ${by - 14}" fill="none" stroke="#000" stroke-width="1.2"/>`;
  if (baseL)   g += `<text x="${bx + w / 2}" y="${by + 18}" font-size="12" text-anchor="middle">${baseL}</text>`;
  if (heightL) g += `<text x="${bx - 8}" y="${y0 + h / 2 + 4}" font-size="12" text-anchor="end">${heightL}</text>`;
  if (hypL)    g += `<text x="${bx + w / 2 + 18}" y="${y0 + h / 2 - 6}" font-size="12" text-anchor="middle">${hypL}</text>`;
  if (angL) {
    g += `<path d="M ${bx + w - 26} ${by} A 26 26 0 0 0 ${(bx + w - 26 * 0.86).toFixed(1)} ${(by - 26 * 0.51).toFixed(1)}" fill="none" stroke="#000" stroke-width="1.1"/>`;
    g += `<text x="${bx + w - 40}" y="${by - 10}" font-size="12" text-anchor="middle">${angL}</text>`;
  }
  return SVG(bx + w + 44, by + 26) + g + '</svg>';
}
const ALT_RTRI = 'A right-angled triangle with the right angle marked by a small square and its sides labelled.';

// A grouped frequency bar chart.
function barChart(cats, vals, xTitle, yTitle) {
  const x0 = 52, y0 = 18, w = 236, h = 132;
  const max = Math.max(...vals, 1);
  const step = w / cats.length, bw = step * 0.6;
  let g = `<line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y0 + h}" stroke="#000" stroke-width="1.4"/>`
        + `<line x1="${x0}" y1="${y0 + h}" x2="${x0 + w}" y2="${y0 + h}" stroke="#000" stroke-width="1.4"/>`;
  for (let v = 0; v <= max; v++) {
    const y = y0 + h - (v / max) * h;
    g += `<line x1="${x0}" y1="${n1(y)}" x2="${x0 + w}" y2="${n1(y)}" stroke="#ddd" stroke-width="0.6"/>`
       + `<text x="${x0 - 6}" y="${n1(y + 4)}" font-size="10" text-anchor="end">${v}</text>`;
  }
  cats.forEach((c, i) => {
    const bx = x0 + i * step + (step - bw) / 2;
    const bh = (vals[i] / max) * h;
    g += `<rect x="${n1(bx)}" y="${n1(y0 + h - bh)}" width="${n1(bw)}" height="${n1(bh)}" fill="#cfcfcf" stroke="#000" stroke-width="1.1"/>`
       + `<text x="${n1(bx + bw / 2)}" y="${y0 + h + 15}" font-size="10" text-anchor="middle">${c}</text>`;
  });
  g += `<text x="${x0 + w / 2}" y="${y0 + h + 31}" font-size="11" text-anchor="middle" font-weight="bold">${xTitle}</text>`
     + `<text x="16" y="${y0 + h / 2}" font-size="11" text-anchor="middle" font-weight="bold"`
     + ` transform="rotate(-90 16 ${y0 + h / 2})">${yTitle}</text>`;
  return SVG(x0 + w + 14, y0 + h + 40) + g + '</svg>';
}
const ALT_BAR = 'A bar chart with a labelled horizontal axis of categories and a numbered vertical axis.';

// A cylinder.
function cylinder(rL, hL) {
  const cx = 118, top = 30, bot = 128, rx = 52, ry = 15;
  let g = `<path d="M ${cx - rx} ${top} L ${cx - rx} ${bot} A ${rx} ${ry} 0 0 0 ${cx + rx} ${bot} L ${cx + rx} ${top}" fill="none" stroke="#000" stroke-width="1.5"/>`
    + `<ellipse cx="${cx}" cy="${top}" rx="${rx}" ry="${ry}" fill="none" stroke="#000" stroke-width="1.5"/>`
    + `<path d="M ${cx - rx} ${bot} A ${rx} ${ry} 0 0 1 ${cx + rx} ${bot}" fill="none" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>`
    + `<line x1="${cx}" y1="${top}" x2="${cx + rx}" y2="${top}" stroke="#000" stroke-width="1"/>`
    + `<circle cx="${cx}" cy="${top}" r="2" fill="#000"/>`
    + `<text x="${cx + rx / 2}" y="${top - 20}" font-size="12" text-anchor="middle">${rL}</text>`
    + `<line x1="${cx + rx / 2}" y1="${top - 17}" x2="${cx + rx / 2}" y2="${top - 3}" stroke="#000" stroke-width="0.7"/>`
    + `<line x1="${cx - rx - 14}" y1="${top}" x2="${cx - rx - 14}" y2="${bot}" stroke="#000" stroke-width="1"/>`
    + `<line x1="${cx - rx - 19}" y1="${top}" x2="${cx - rx - 9}" y2="${top}" stroke="#000" stroke-width="1"/>`
    + `<line x1="${cx - rx - 19}" y1="${bot}" x2="${cx - rx - 9}" y2="${bot}" stroke="#000" stroke-width="1"/>`
    + `<text x="${cx - rx - 24}" y="${(top + bot) / 2 + 4}" font-size="12" text-anchor="end">${hL}</text>`;
  return SVG(cx + rx + 30, bot + 22) + g + '</svg>';
}
const ALT_CYL = 'A cylinder drawn in three dimensions with its radius marked on the top circle and its height marked at the side.';

// A trapezium, drawn with the two parallel sides horizontal.
function trapezium(aL, bL, hL) {
  const y0 = 22, h = 90, top = 96, bot = 168, x0 = 50;
  const off = (bot - top) / 2;
  const pts = `${x0 + off},${y0} ${x0 + off + top},${y0} ${x0 + bot},${y0 + h} ${x0},${y0 + h}`;
  let g = `<polygon points="${pts}" fill="none" stroke="#000" stroke-width="1.6"/>`
    + `<line x1="${x0 + off}" y1="${y0}" x2="${x0 + off}" y2="${y0 + h}" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>`
    + `<path d="M ${x0 + off} ${y0 + h - 13} L ${x0 + off + 13} ${y0 + h - 13} L ${x0 + off + 13} ${y0 + h}" fill="none" stroke="#000" stroke-width="1.1"/>`
    + `<text x="${x0 + off + top / 2}" y="${y0 - 6}" font-size="12" text-anchor="middle">${aL}</text>`
    + `<text x="${x0 + bot / 2}" y="${y0 + h + 17}" font-size="12" text-anchor="middle">${bL}</text>`
    + `<text x="${x0 + off - 8}" y="${y0 + h / 2 + 4}" font-size="12" text-anchor="end">${hL}</text>`;
  return SVG(x0 + bot + 30, y0 + h + 26) + g + '</svg>';
}
const ALT_TRAP = 'A trapezium with its two parallel sides and its perpendicular height labelled in centimetres.';

// A simple tariff / price table.
function table(head, rows) {
  const th = head.map(h => `<th>${h}</th>`).join('');
  const tr = rows.map(r => '<tr>' + r.map(c => `<td>${c}</td>`).join('') + '</tr>').join('');
  return '<table style="border-collapse:collapse;font-size:13px;margin:4px 0">'
    + '<style>table th,table td{border:1px solid #000;padding:3px 10px;text-align:left}'
    + 'table th{font-weight:bold;background:#efefef}</style>'
    + '<thead><tr>' + th + '</tr></thead><tbody>' + tr + '</tbody></table>';
}

// ── The tasks ─────────────────────────────────────────────────────────────
// [ id, chapterId, subsection, difficulty, parts[], stimulus?, alt?, intro? ]
const P = (label, prompt, marks, answer, unit, hint, explanation, extra) => ({
  label, prompt, marks, hint, explanation,
  response: Object.assign({ kind: 'number', answer: String(answer) }, unit ? { unit } : {}, extra || {}),
});

const ITEMS = [

  // ── 4 marks (the bank held 22, only 2 of them with a figure) ────────────
  ['g9m-multi-001', 'g9m-volume', 'prisms_and_cylinders', 3, [
    P('a', 'Calculate the <b>volume</b> of the cuboid.', 2, '960', 'cm³',
      'Volume of a cuboid is length &times; width &times; height.',
      '16 &times; 10 &times; 6 = 960 cm&sup3;.'),
    P('b', 'The cuboid is filled with water to <b>three quarters</b> of its height. Calculate the volume of water.', 2, '720', 'cm³',
      'Three quarters of the volume you found in (a).',
      '&frac34; of 960 = 720 cm&sup3;. (Or work with a height of 4.5 cm: 16 &times; 10 &times; 4.5 = 720.)'),
  ], cuboid('16 cm', '10 cm', '6 cm'), ALT_CUBOID],

  ['g9m-multi-002', 'g9m-volume', 'prisms_and_cylinders', 4, [
    P('a', 'Calculate the <b>volume</b> of the cylinder. Take &pi; = 3.14.', 2, '1570', 'cm³',
      'Volume of a cylinder is &pi; &times; r&sup2; &times; h.',
      '3.14 &times; 10&sup2; &times; 5 = 3.14 &times; 100 &times; 5 = 1570 cm&sup3;.'),
    P('b', 'The cylinder is emptied into cups holding 157 cm&sup3; each. How many cups can be filled?', 2, '10', 'cups',
      'Divide the volume by the size of one cup.',
      '1570 &divide; 157 = 10 cups.'),
  ], cylinder('10 cm', '5 cm'), ALT_CYL],

  ['g9m-multi-003', 'g9m-geometry-revision', 'grade7_8_geometry', 3, [
    P('a', 'Calculate the <b>area</b> of the trapezium.', 2, '396', 'cm²',
      'Area of a trapezium is &frac12; &times; (sum of the parallel sides) &times; height.',
      '&frac12; &times; (12 + 21) &times; 24 = &frac12; &times; 33 &times; 24 = 396 cm&sup2;.'),
    P('b', 'A rectangle has the same area and a length of 33 cm. Find its <b>width</b>.', 2, '12', 'cm',
      'Area divided by length gives the width.',
      '396 &divide; 33 = 12 cm.'),
  ], trapezium('12 cm', '21 cm', '24 cm'), ALT_TRAP],

  ['g9m-multi-004', 'g9m-trigonometry', 'ratios_and_2d_problems', 3, [
    // The vertices carry no letters on the figure, so the question must not
    // name a side by letters either - it says which side it means.
    P('a', 'Calculate the length of the side <b>opposite</b> the 30&deg; angle, to 1 decimal place.',
      2, '5.0', 'cm', 'Use sin = opposite &divide; hypotenuse.',
      'sin 30&deg; = opposite &divide; 10, so the side is 10 &times; sin 30&deg; = 10 &times; 0.5 = 5.0 cm.'),
    P('b', 'Hence calculate the <b>area</b> of the triangle.', 2, '21.75', 'cm²',
      'Area of a triangle is &frac12; &times; base &times; perpendicular height, and the base is on the figure.',
      'The base is 8.7 cm and the perpendicular height is the 5.0 cm found in (a): '
      + '&frac12; &times; 8.7 &times; 5.0 = 21.75 cm&sup2;.'),
  ], rightTriangle('8.7 cm', null, '10 cm', '30&deg;'), ALT_RTRI],

  ['g9m-multi-005', 'g9m-statistics', 'frequency_and_averages', 3, [
    P('a.i', 'How many pupils were asked <b>altogether</b>?', 1, '30', 'pupils',
      'Add the height of every bar.',
      '4 + 8 + 7 + 6 + 5 = 30 pupils.'),
    P('a.ii', 'Which sport is the <b>mode</b>?', 1, 'Football', null,
      'The mode is the tallest bar.',
      'Football has the tallest bar, 8 pupils, so it is the mode.',
      { kind: 'choice', variant: 'options', options: ['Football', 'Athletics', 'Swimming', 'Cycling'], answer: 'Football' }),
    P('b', 'What <b>percentage</b> of the pupils chose swimming?', 2, '20', '%',
      'Write the swimming figure over the total, then multiply by 100.',
      '6 out of 30 is 6/30 = 1/5, and 1/5 &times; 100 = 20%.'),
  ], barChart(['Athl.', 'Foot.', 'Volley.', 'Swim.', 'Cycl.'], [4, 8, 7, 6, 5], 'Sport', 'Pupils'), ALT_BAR],

  ['g9m-multi-006', 'g9m-finance', 'salaries_and_bills', 4, [
    P('a', 'Calculate the cost of the <b>first 50 units</b>.', 2, '375', 'Rs',
      'Multiply the number of units by the rate for that band.',
      '50 &times; Rs 7.50 = Rs 375.'),
    P('b', 'A household uses <b>90 units</b> in a month. Calculate the total cost.', 2, '735', 'Rs',
      'The first 50 units are charged at one rate and the remaining 40 at the other.',
      'First 50: Rs 375. Next 40: 40 &times; Rs 9.00 = Rs 360. Total = 375 + 360 = Rs 735.'),
  ], table(['Units used', 'Rate per unit'],
           [['First 50 units', 'Rs 7.50'], ['Above 50 units', 'Rs 9.00']]),
     'A two-row electricity tariff table giving a rate per unit for the first band and for units above it.'],

  ['g9m-multi-007', 'g9m-number-revision', 'ratio_and_measures', 3, [
    P('a', 'Share Rs 4 200 between Aisha and Ben in the ratio <b>3 : 4</b>. How much does <b>Aisha</b> get?',
      2, '1800', 'Rs', 'Find the value of one share first.',
      '3 + 4 = 7 shares, and 4200 &divide; 7 = Rs 600 per share. Aisha gets 3 &times; 600 = Rs 1 800.'),
    P('b', 'How much <b>more</b> than Aisha does Ben receive?', 2, '600', 'Rs',
      'Ben has one more share than Aisha.',
      'Ben gets 4 &times; 600 = Rs 2 400, so he receives 2 400 &minus; 1 800 = Rs 600 more.'),
  ], null, null],

  ['g9m-multi-008', 'g9m-quadratics', 'factorise_and_solve', 3, [
    P('a', 'Factorise <i>x</i><sup>2</sup> + 2<i>x</i> &minus; 15.', 2, '(x+5)(x-3)', null,
      'Find two numbers that multiply to &minus;15 and add to +2.',
      '+5 and &minus;3 multiply to &minus;15 and add to +2, so x&sup2; + 2x &minus; 15 = (x + 5)(x &minus; 3).',
      { kind: 'expression', answer: '(x+5)(x-3)', accept: ['(x-3)(x+5)'] }),
    P('b', 'Hence solve <i>x</i><sup>2</sup> + 2<i>x</i> &minus; 15 = 0, giving the <b>positive</b> root.',
      2, '3', null, 'Each bracket can be zero.',
      '(x + 5)(x &minus; 3) = 0 gives x = &minus;5 or x = 3. The positive root is x = 3.'),
  ], null, null],

  ['g9m-multi-009', 'g9m-coordinates', 'gradient', 3, [
    P('a', 'Find the <b>gradient</b> of the line joining A (1, 3) and B (5, 11).', 2, '2', null,
      'Gradient is the change in y divided by the change in x.',
      '(11 &minus; 3) &divide; (5 &minus; 1) = 8 &divide; 4 = 2.'),
    P('b', 'Find the <b>y-intercept</b> of the line AB.', 2, '1', null,
      'Substitute one of the points into y = 2x + c.',
      'Using A (1, 3): 3 = 2(1) + c, so c = 1.'),
  ], null, null],

  ['g9m-multi-010', 'g9m-probability', 'simple_and_combined_events', 3, [
    P('a', 'A bag holds 5 red, 7 blue and 8 green marbles. Find the probability of drawing a <b>blue</b> marble.',
      2, '7/20', null, 'There are 20 marbles altogether.',
      '5 + 7 + 8 = 20, so P(blue) = 7/20.',
      { kind: 'expression', answer: '7/20', accept: ['0.35'] }),
    P('b', 'Find the probability that the marble is <b>not green</b>.', 2, '3/5', null,
      'Either count the non-green marbles, or subtract from 1.',
      'P(green) = 8/20 = 2/5, so P(not green) = 1 &minus; 2/5 = 3/5. (Or 12/20 = 3/5.)',
      { kind: 'expression', answer: '3/5', accept: ['12/20', '0.6'] }),
  ], null, null],

  ['g9m-multi-011', 'g9m-surface-area', 'nets_and_surface_area', 4, [
    P('a', 'Calculate the <b>total surface area</b> of the cuboid.', 3, '368', 'cm²',
      'Three pairs of identical faces: 2(lw + lh + wh).',
      '2(14&times;6 + 14&times;5 + 6&times;5) = 2(84 + 70 + 30) = 2 &times; 184 = 368 cm&sup2;.'),
    P('b', 'The cuboid is painted at Rs 2 per cm&sup2;. Find the cost, using your answer to (a).',
      1, '736', 'Rs', 'Multiply the surface area by the rate.',
      '368 &times; 2 = Rs 736.'),
  ], cuboid('14 cm', '6 cm', '5 cm'), ALT_CUBOID],

  ['g9m-multi-012', 'g9m-inequalities', 'solve_and_represent', 3, [
    P('a', 'Solve 5<i>x</i> &minus; 3 &gt; 12, giving your answer in the form <i>x</i> &gt; <i>k</i>. Write down the value of <i>k</i>.', 2, '3', null,
      'Add 3 to both sides, then divide by 5.',
      '5x &gt; 15, so x &gt; 3.'),
    P('b', 'Write down the <b>smallest integer</b> that satisfies 5<i>x</i> &minus; 3 &gt; 12.',
      2, '4', null, 'x &gt; 3 does not include 3 itself.',
      'The inequality is strict, so x must be more than 3; the smallest integer is 4.'),
  ], null, null],

  // ── 5 marks ────────────────────────────────────────────────────────────
  ['g9m-multi-013', 'g9m-volume', 'prisms_and_cylinders', 4, [
    P('a.i', 'Calculate the <b>volume</b> of the tank.', 2, '54000', 'cm³',
      'Length &times; width &times; height.',
      '60 &times; 30 &times; 30 = 54 000 cm&sup3;.'),
    P('a.ii', 'Given that 1 litre = 1 000 cm&sup3;, express the volume in <b>litres</b>.', 1, '54', 'litres',
      'Divide by 1 000.', '54 000 &divide; 1 000 = 54 litres.'),
    P('b', 'Water flows in at 4.5 litres per minute. How long does the tank take to fill?',
      2, '12', 'minutes', 'Divide the capacity by the rate.',
      '54 &divide; 4.5 = 12 minutes.'),
  ], cuboid('60 cm', '30 cm', '30 cm'), ALT_CUBOID],

  ['g9m-multi-014', 'g9m-statistics', 'frequency_and_averages', 4, [
    P('a', 'How many families were surveyed?', 1, '25', 'families',
      'Add the bars.', '3 + 9 + 7 + 4 + 2 = 25 families.'),
    P('b.i', 'Calculate the <b>total</b> number of children in all the families.', 2, '43', 'children',
      'Multiply each number of children by how many families have that many, then add.',
      '(0&times;3) + (1&times;9) + (2&times;7) + (3&times;4) + (4&times;2) = 0 + 9 + 14 + 12 + 8 = 43.'),
    P('b.ii', 'Calculate the <b>mean</b> number of children per family, to 2 decimal places.',
      2, '1.72', null, 'Total children divided by number of families.',
      '43 &divide; 25 = 1.72 children per family.'),
  ], barChart(['0', '1', '2', '3', '4'], [3, 9, 7, 4, 2], 'Children in the family', 'Families'), ALT_BAR],

  ['g9m-multi-015', 'g9m-trigonometry', 'ratios_and_2d_problems', 4, [
    P('a', 'A ladder leans against a wall as shown. Calculate the height it reaches up the wall, to 1 decimal place.',
      2, '5.2', 'm', 'The height is opposite the 60&deg; angle: use sin.',
      'sin 60&deg; = h &divide; 6, so h = 6 &times; 0.866 = 5.196, which is 5.2 m to 1 d.p.'),
    P('b', 'Calculate how far the foot of the ladder is from the wall.', 2, '3', 'm',
      'That distance is adjacent to the 60&deg; angle: use cos.',
      'cos 60&deg; = d &divide; 6, so d = 6 &times; 0.5 = 3 m.'),
    P('c', 'The ladder slips so that it now makes 45&deg; with the ground. Calculate the height it '
      + 'reaches up the wall, to 1 decimal place.',
      1, '4.2', 'm', 'Use sin again, with the new angle.',
      '6 &times; sin 45&deg; = 6 &times; 0.7071 = 4.243, which is 4.2 m to 1 d.p. - lower than before, '
      + 'because sin 45&deg; is less than sin 60&deg;.'),
  ], rightTriangle('distance from wall', 'wall', '6 m', '60&deg;'), ALT_RTRI],

  ['g9m-multi-016', 'g9m-finance', 'salaries_and_bills', 4, [
    P('a', 'Calculate the charge for the <b>first 20 m&sup3;</b> of water.', 1, '250', 'Rs',
      'Multiply by the first-band rate.', '20 &times; Rs 12.50 = Rs 250.'),
    P('b', 'A household uses <b>35 m&sup3;</b>. Calculate the total charge before the fixed fee.',
      2, '550', 'Rs', 'The extra 15 m&sup3; are charged at the higher rate.',
      'First 20: Rs 250. Next 15: 15 &times; Rs 20 = Rs 300. Total = Rs 550.'),
    P('c', 'A fixed service fee of Rs 90 is added. Calculate the <b>final bill</b>.',
      2, '640', 'Rs', 'Add the fee to your answer for (b).', '550 + 90 = Rs 640.'),
  ], table(['Water used', 'Rate per m&sup3;'],
           [['First 20 m&sup3;', 'Rs 12.50'], ['Above 20 m&sup3;', 'Rs 20.00']]),
     'A two-band water tariff table with a rate per cubic metre for each band.'],

  ['g9m-multi-017', 'g9m-simultaneous', 'solve_simultaneous', 4, [
    P('a', 'Two pens and three books cost Rs 235; four pens and one book cost Rs 195. Taking <i>p</i> for the cost of a pen and <i>b</i> for a book, find <b>p</b>.',
      3, '35', 'Rs', 'Multiply the second equation so that one letter cancels.',
      '2p + 3b = 235 and 4p + b = 195. Multiplying the second by 3 gives 12p + 3b = 585. '
      + 'Subtracting the first: 10p = 350, so p = Rs 35.'),
    P('b', 'Find the cost of <b>one book</b>.', 2, '55', 'Rs',
      'Substitute your value for a pen into either equation.',
      '4(35) + b = 195, so 140 + b = 195 and b = Rs 55.'),
  ], null, null],

  ['g9m-multi-018', 'g9m-geometry-revision', 'grade7_8_geometry', 4, [
    P('a', 'In a class of 40 pupils, 22 study French and 18 study Spanish. 7 study <b>both</b>. How many study French <b>only</b>?',
      2, '15', 'pupils', 'Take the overlap away from the French total.',
      '22 &minus; 7 = 15 pupils study French only.'),
    P('b', 'How many study <b>neither</b> language?', 3, '7', 'pupils',
      'Add the three regions inside the circles, then subtract from 40.',
      'French only 15, both 7, Spanish only 18 &minus; 7 = 11. That is 15 + 7 + 11 = 33, '
      + 'so 40 &minus; 33 = 7 pupils study neither.'),
  ], null, null],

  // ── 6 marks (the bank held 7) ──────────────────────────────────────────
  ['g9m-multi-019', 'g9m-volume', 'prisms_and_cylinders', 4, [
    P('a.i', 'Calculate the <b>volume</b> of the cylindrical drum. Take &pi; = 3.14.', 2, '4710', 'cm³',
      '&pi; &times; r&sup2; &times; h.', '3.14 &times; 10&sup2; &times; 15 = 4 710 cm&sup3;.'),
    P('a.ii', 'Express the volume in <b>litres</b>, given 1 litre = 1 000 cm&sup3;.', 1, '4.71', 'litres',
      'Divide by 1 000.', '4 710 &divide; 1 000 = 4.71 litres.'),
    P('b', 'The drum is filled from a tap running at 0.3 litres per second. How long does it take, to the nearest second?',
      2, '16', 'seconds', 'Capacity divided by rate.', '4.71 &divide; 0.3 = 15.7, which is 16 seconds to the nearest second.'),
    P('c', 'Water costs Rs 4 per litre. Calculate the cost of one full drum, to the nearest rupee.',
      1, '19', 'Rs', 'Multiply the capacity in litres by the rate.', '4.71 &times; 4 = Rs 18.84, which is Rs 19 to the nearest rupee.'),
  ], cylinder('10 cm', '15 cm'), ALT_CYL],

  ['g9m-multi-020', 'g9m-statistics', 'frequency_and_averages', 4, [
    P('a.i', 'How many matches were played?', 1, '20', 'matches',
      'Add the bars.', '2 + 6 + 5 + 4 + 3 = 20 matches.'),
    P('a.ii', 'Find the <b>modal</b> number of goals.', 1, '1', 'goals',
      'The tallest bar.', '1 goal was scored in 6 matches, more than any other, so the mode is 1.'),
    P('b.i', 'Calculate the <b>total</b> number of goals scored.', 2, '40', 'goals',
      'Multiply each score by its frequency and add.',
      '(0&times;2) + (1&times;6) + (2&times;5) + (3&times;4) + (4&times;3) = 0 + 6 + 10 + 12 + 12 = 40.'),
    P('b.ii', 'Calculate the <b>mean</b> number of goals per match.', 2, '2', 'goals',
      'Total goals divided by number of matches.', '40 &divide; 20 = 2 goals per match.'),
  ], barChart(['0', '1', '2', '3', '4'], [2, 6, 5, 4, 3], 'Goals scored', 'Matches'), ALT_BAR],

  ['g9m-multi-021', 'g9m-surface-area', 'nets_and_surface_area', 4, [
    P('a', 'Calculate the area of the <b>curved surface</b> of the cylinder. Take &pi; = 3.14.',
      2, '659.4', 'cm²', 'The curved surface is a rectangle 2&pi;r long and h tall.',
      '2 &times; 3.14 &times; 7 &times; 15 = 659.4 cm&sup2;.'),
    P('b', 'Calculate the area of <b>one circular end</b>.', 2, '153.86', 'cm²',
      '&pi; &times; r&sup2;.', '3.14 &times; 7&sup2; = 3.14 &times; 49 = 153.86 cm&sup2;.'),
    P('c', 'Hence find the <b>total surface area</b> of the closed cylinder.', 2, '967.12', 'cm²',
      'The curved surface plus TWO ends.',
      '659.4 + 2 &times; 153.86 = 659.4 + 307.72 = 967.12 cm&sup2;.'),
  ], cylinder('7 cm', '15 cm'), ALT_CYL],

  ['g9m-multi-022', 'g9m-geometry-revision', 'grade7_8_geometry', 4, [
    P('a', 'Calculate the <b>area</b> of the trapezium-shaped garden.', 2, '540', 'm²',
      '&frac12; &times; (sum of parallel sides) &times; height.',
      '&frac12; &times; (18 + 27) &times; 24 = &frac12; &times; 45 &times; 24 = 540 m&sup2;.'),
    P('b', 'Grass seed covers 12 m&sup2; per bag. How many <b>whole bags</b> are needed?',
      2, '45', 'bags', 'Divide the area by the coverage.', '540 &divide; 12 = 45 bags exactly.'),
    P('c', 'Each bag costs Rs 185. Calculate the total cost.', 2, '8325', 'Rs',
      'Multiply the number of bags by the price.', '45 &times; 185 = Rs 8 325.'),
  ], trapezium('18 m', '27 m', '24 m'),
     'A trapezium-shaped garden with its two parallel sides and its perpendicular width labelled in metres.'],

  ['g9m-multi-023', 'g9m-finance', 'salaries_and_bills', 4, [
    P('a.i', 'A worker earns Rs 285 per hour for a 40-hour week. Calculate the <b>basic weekly pay</b>.',
      2, '11400', 'Rs', 'Rate multiplied by hours.', '285 &times; 40 = Rs 11 400.'),
    P('a.ii', 'Overtime is paid at <b>time and a half</b>. Calculate the overtime rate per hour.',
      1, '427.50', 'Rs', 'One and a half times the basic rate.', '285 &times; 1.5 = Rs 427.50.'),
    P('b.i', 'The worker does 6 hours of overtime. Calculate the <b>overtime pay</b>.',
      1, '2565', 'Rs', 'Overtime rate times overtime hours.', '427.50 &times; 6 = Rs 2 565.'),
    P('b.ii', 'Calculate the <b>total pay</b> for the week.', 2, '13965', 'Rs',
      'Basic pay plus overtime pay.', '11 400 + 2 565 = Rs 13 965.'),
  ], null, null],

  // ── 7 marks (the bank held TWO) ────────────────────────────────────────
  ['g9m-multi-024', 'g9m-volume', 'prisms_and_cylinders', 4, [
    P('a.i', 'Calculate the <b>volume</b> of the water tank.', 2, '144000', 'cm³',
      'Length &times; width &times; height.', '80 &times; 60 &times; 30 = 144 000 cm&sup3;.'),
    P('a.ii', 'Express its capacity in <b>litres</b> (1 litre = 1 000 cm&sup3;).', 1, '144', 'litres',
      'Divide by 1 000.', '144 000 &divide; 1 000 = 144 litres.'),
    P('b', 'The tank is <b>two thirds</b> full. Calculate the volume of water, in litres.',
      2, '96', 'litres', 'Two thirds of the capacity.', '&#8532; of 144 = 96 litres.'),
    P('c', 'Water is drawn off at 8 litres per minute. How long until the tank is empty?',
      2, '12', 'minutes', 'Divide the water present by the rate.', '96 &divide; 8 = 12 minutes.'),
  ], cuboid('80 cm', '60 cm', '30 cm'), ALT_CUBOID],

  ['g9m-multi-025', 'g9m-statistics', 'frequency_and_averages', 4, [
    P('a.i', 'How many pupils sat the test?', 1, '30', 'pupils',
      'Add every bar.', '4 + 6 + 9 + 7 + 4 = 30 pupils.'),
    P('a.ii', 'Write down the <b>modal</b> mark.', 1, '3', 'marks',
      'The tallest bar.', '3 marks was scored by 9 pupils, more than any other, so the mode is 3.'),
    P('b.i', 'Calculate the <b>total</b> of all the marks.', 2, '91', 'marks',
      'Multiply each mark by its frequency and add.',
      '(1&times;4) + (2&times;6) + (3&times;9) + (4&times;7) + (5&times;4) = 4 + 12 + 27 + 28 + 20 = 91.'),
    P('b.ii', 'Calculate the <b>mean</b> mark, to 2 decimal places.', 2, '3.03', 'marks',
      'Total marks divided by number of pupils.', '91 &divide; 30 = 3.033..., which is 3.03 to 2 d.p.'),
    P('c', 'How many pupils scored <b>more than the mean</b>?', 1, '11', 'pupils',
      'Count everyone whose mark is above 3.03.',
      'Marks of 4 (7 pupils) and 5 (4 pupils) are above 3.03, so 7 + 4 = 11 pupils.'),
  ], barChart(['1', '2', '3', '4', '5'], [4, 6, 9, 7, 4], 'Mark', 'Pupils'), ALT_BAR],

  ['g9m-multi-026', 'g9m-surface-area', 'nets_and_surface_area', 4, [
    P('a.i', 'Calculate the <b>volume</b> of the box.', 2, '3600', 'cm³',
      'Length &times; width &times; height.', '20 &times; 15 &times; 12 = 3 600 cm&sup3;.'),
    P('a.ii', 'Calculate the <b>total surface area</b> of the box.', 3, '1440', 'cm²',
      '2(lw + lh + wh).',
      '2(20&times;15 + 20&times;12 + 15&times;12) = 2(300 + 240 + 180) = 2 &times; 720 = 1 440 cm&sup2;.'),
    P('b', 'Card costs Rs 0.60 per cm&sup2;. Calculate the cost of the card for one box.',
      2, '864', 'Rs', 'Multiply the surface area by the price per cm&sup2;.',
      '1 440 &times; 0.60 = Rs 864.'),
  ], cuboid('20 cm', '15 cm', '12 cm'), ALT_CUBOID],
];

ITEMS.forEach(([id, chapterId, subsection, difficulty, parts, svg, alt, intro]) => {
  STATIC_QUESTIONS.push(makeTask(Object.assign({
    id, chapterId, subsection, difficulty, source: SRC, parts,
  }, svg ? { stimulus: { html: svg, altText: alt } } : {},
     intro ? { intro } : {})));
});

})();
