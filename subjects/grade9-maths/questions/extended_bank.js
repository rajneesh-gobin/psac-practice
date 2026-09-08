'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - extended questions (5-7 marks)
//
//  ⚠ WRITTEN TO FILL A MEASURED SHORTAGE. The blueprint ends every paper with
//    TWO extended questions of 5 marks or more - 2024 Q31 at 6 and Q33 at 7.
//    Measured by scripts/nce-paper-report.js after batch 9:
//
//        role                       have   per paper   for 10 papers   short by
//        extended tasks (5+ marks)     9           2              20         11
//
//  ⚠ AN EXTENDED QUESTION IS MULTI-STEP, NOT MERELY LONG. Each item here needs
//    three or four linked steps to reach its answer, which is what earns the
//    marks and what makes it belong at the end of a paper. Padding a two-mark
//    calculation with extra words would satisfy the count and nothing else.
//
//  ⚠ Several carry a diagram, because that role was short too (49 of the ~80
//    a ten-paper run wants). The SVG helpers are local to this file rather than
//    imported: every question file in this pack is a self-contained script
//    evaluated in a sandbox with no module system.
// ══════════════════════════════════════════════════════════════════════════

(function () {

// ── Local diagram helpers, monochrome for print ─────────────────────────
function cuboid(wL, dL, hL) {
  // ⚠ x0 IS 46, NOT 34: the height label is anchored at x0-8 and read
  //   right-to-left off the left edge, printing 40 cm as "0 cm".
  const x0 = 46, y0 = 26, w = 132, h = 84, dx = 38, dy = -24;
  const fl = y0 + h, fr = x0 + w;
  const P = (x, y) => `${x},${y}`;
  let g = `<polygon points="${P(x0, y0)} ${P(fr, y0)} ${P(fr, fl)} ${P(x0, fl)}" fill="none" stroke="#000" stroke-width="1.5"/>`
        + `<polyline points="${P(x0, y0)} ${P(x0 + dx, y0 + dy)} ${P(fr + dx, y0 + dy)} ${P(fr, y0)}" fill="none" stroke="#000" stroke-width="1.5"/>`
        + `<polyline points="${P(fr + dx, y0 + dy)} ${P(fr + dx, fl + dy)} ${P(fr, fl)}" fill="none" stroke="#000" stroke-width="1.5"/>`
        + `<polyline points="${P(x0, fl)} ${P(x0 + dx, fl + dy)} ${P(fr + dx, fl + dy)}" fill="none" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>`
        + `<line x1="${x0 + dx}" y1="${y0 + dy}" x2="${x0 + dx}" y2="${fl + dy}" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>`
        + `<text x="${x0 + w / 2}" y="${fl + 18}" font-size="12" text-anchor="middle">${wL}</text>`
        + `<text x="${x0 - 8}" y="${y0 + h / 2}" font-size="12" text-anchor="end">${hL}</text>`
        + `<text x="${fr + dx + 6}" y="${fl + dy + 24}" font-size="12" text-anchor="start">${dL}</text>`;
  return `<svg viewBox="0 0 ${fr + dx + 66} ${fl + 28}" width="${fr + dx + 66}" height="${fl + 28}" xmlns="http://www.w3.org/2000/svg" role="img">${g}</svg>`;
}
const ALT_CUBOID = 'A cuboid drawn in three dimensions with its length, width and height labelled.';

function rightTriangle(base, height, hyp, ang) {
  const x0 = 46, y0 = 18, w = 150, h = 100;
  const bx = x0, by = y0 + h, rx = x0 + w, sq = 12;
  let g = `<polygon points="${x0},${y0} ${bx},${by} ${rx},${by}" fill="none" stroke="#000" stroke-width="1.6"/>`
        + `<polyline points="${bx},${by - sq} ${bx + sq},${by - sq} ${bx + sq},${by}" fill="none" stroke="#000" stroke-width="1.1"/>`;
  if (base)   g += `<text x="${bx + w / 2}" y="${by + 18}" font-size="12" text-anchor="middle">${base}</text>`;
  if (height) g += `<text x="${bx - 8}" y="${y0 + h / 2 + 4}" font-size="12" text-anchor="end">${height}</text>`;
  if (hyp)    g += `<text x="${(x0 + rx) / 2 + 14}" y="${(y0 + by) / 2 - 6}" font-size="12" text-anchor="start">${hyp}</text>`;
  if (ang) {
    g += `<path d="M ${rx - 26} ${by} A 26 26 0 0 0 ${rx - 20} ${by - 16}" fill="none" stroke="#000" stroke-width="1"/>`;
    g += `<text x="${rx - 34}" y="${by - 8}" font-size="12" text-anchor="end">${ang}</text>`;
  }
  return `<svg viewBox="0 0 ${x0 + w + 44} ${y0 + h + 26}" width="${x0 + w + 44}" height="${y0 + h + 26}" xmlns="http://www.w3.org/2000/svg" role="img">${g}</svg>`;
}
const ALT_TRI = 'A right-angled triangle with the right angle marked by a small square and its sides labelled.';

function dataTable(head, rows) {
  const td = (v, b) => `<td style="border:1px solid #000;padding:4px 11px;text-align:center${b ? ';background:#eee' : ''}">${b ? '<b>' + v + '</b>' : v}</td>`;
  return '<table style="border-collapse:collapse;margin:6px 0">'
    + '<tr>' + head.map(v => td(v, true)).join('') + '</tr>'
    + rows.map(r => '<tr>' + r.map(v => td(v, false)).join('') + '</tr>').join('')
    + '</table>';
}
const ALT_TABLE = 'A table of values with a heading row and one or more rows of data beneath it.';

// [ id, chapterId, subsection, prompt, response, hint, explanation, marks, stimulus, altText ]
const ITEMS = [
  ['g9m-ext-001', 'g9m-finance', 'salaries_and_bills',
   'A shopkeeper buys 40 shirts at Rs 250 each. He sells 30 of them at Rs 400 each and the '
   + 'remaining 10 at Rs 300 each. Calculate his <b>total profit</b>.',
   { kind: 'number', answer: '5000', prefix: 'Rs' },
   'Work out the total cost, then the total money taken, then compare.',
   'The shirts cost 40 &times; 250 = Rs 10 000. He takes 30 &times; 400 = Rs 12 000 from the first '
   + 'batch and 10 &times; 300 = Rs 3 000 from the rest, giving Rs 15 000 in all. '
   + 'The profit is 15 000 &minus; 10 000 = Rs 5 000.', 5, null, null],

  ['g9m-ext-002', 'g9m-number-revision', 'fractions_decimals_percentages',
   'A tourist changes Rs 18 000 into euros at 45 rupees to the euro. She spends 240 euros and '
   + 'changes the rest back at 40 rupees to the euro. How many <b>rupees</b> does she get back?',
   { kind: 'number', answer: '6400', prefix: 'Rs' },
   'Find the euros she starts with, then the euros left, then convert back at the NEW rate.',
   '18 000 &divide; 45 = 400 euros. After spending 240 she has 160 euros left. '
   + 'Changing back at 40 rupees to the euro gives 160 &times; 40 = Rs 6 400.', 6, null, null],

  ['g9m-ext-003', 'g9m-volume', 'prisms_and_cylinders',
   'The diagram shows a rectangular tank measuring 120 cm by 50 cm by 40 cm. Water flows into '
   + 'the empty tank at 8 litres per minute. How many <b>minutes</b> does it take to fill?',
   { kind: 'number', answer: '30', unit: 'minutes' },
   'Find the volume in cubic centimetres, change it to litres, then divide by the rate.',
   'The tank holds 120 &times; 50 &times; 40 = 240 000 cm&sup3;. Since 1 000 cm&sup3; = 1 litre, '
   + 'that is 240 litres. At 8 litres a minute it takes 240 &divide; 8 = 30 minutes.',
   5, cuboid('120 cm', '50 cm', '40 cm'), ALT_CUBOID],

  ['g9m-ext-004', 'g9m-volume', 'prisms_and_cylinders',
   'The diagram shows a solid metal cuboid measuring 20 cm by 10 cm by 6 cm. It is melted down '
   + 'and recast as cubes of side 2 cm. How many <b>cubes</b> are made?',
   { kind: 'number', answer: '150', unit: 'cubes' },
   'The metal keeps its volume; find the volume of one small cube.',
   'The cuboid has volume 20 &times; 10 &times; 6 = 1 200 cm&sup3;. Each small cube has volume '
   + '2 &times; 2 &times; 2 = 8 cm&sup3;. So 1 200 &divide; 8 = 150 cubes are made.',
   5, cuboid('20 cm', '10 cm', '6 cm'), ALT_CUBOID],

  ['g9m-ext-005', 'g9m-surface-area', 'nets_and_surface_area',
   'A closed rectangular box measures 30 cm by 20 cm by 10 cm. It is to be covered with paper '
   + 'costing Rs 2 per 100 cm&sup2;. Calculate the <b>cost</b> of the paper.',
   { kind: 'number', answer: '44', prefix: 'Rs' },
   'Find the total surface area first, then work out how many hundreds of square centimetres.',
   'The three different faces are 30&times;20 = 600, 30&times;10 = 300 and 20&times;10 = 200 cm&sup2;. '
   + 'Each occurs twice, so the surface area is 2(600 + 300 + 200) = 2 200 cm&sup2;. '
   + 'That is 22 lots of 100 cm&sup2;, costing 22 &times; 2 = Rs 44.',
   6, cuboid('30 cm', '20 cm', '10 cm'), ALT_CUBOID],

  ['g9m-ext-006', 'g9m-trigonometry', 'ratios_and_2d_problems',
   'In the right-angled triangle shown, <b>AC</b> = 20 cm and the angle at <b>C</b> is 30&deg;. '
   + 'Calculate the <b>perimeter</b> of the triangle, giving your answer to the nearest whole '
   + 'number. <span style="white-space:nowrap">[Given sin 30&deg; = 0.5, cos 30&deg; = 0.87]</span>',
   { kind: 'number', answer: '47', unit: 'cm' },
   'Find each of the two shorter sides in turn, then add all three.',
   'AB is opposite the 30&deg; angle: sin 30&deg; = AB/20, so AB = 20 &times; 0.5 = 10 cm. '
   + 'BC is adjacent: cos 30&deg; = BC/20, so BC = 20 &times; 0.87 = 17.4 cm. '
   + 'The perimeter is 10 + 17.4 + 20 = 47.4 cm, which is 47 cm to the nearest whole number.',
   6, rightTriangle('BC', 'AB', '20 cm', '30&deg;'), ALT_TRI],

  ['g9m-ext-007', 'g9m-statistics', 'frequency_and_averages',
   'The table shows the marks scored by 20 pupils in a test. Calculate the <b>mean</b> mark.',
   { kind: 'number', answer: '5.4', unit: 'marks' },
   'Multiply each mark by how many pupils scored it, add those up, then divide by 20.',
   'The total is (4&times;5) + (5&times;6) + (6&times;5) + (7&times;4) = 20 + 30 + 30 + 28 = 108. '
   + 'The mean is 108 &divide; 20 = 5.4 marks exactly.',
   5, dataTable(['Mark', '4', '5', '6', '7'], [['Number of pupils', '5', '6', '5', '4']]), ALT_TABLE],

  ['g9m-ext-008', 'g9m-probability', 'simple_and_combined_events',
   'A bag contains 4 red, 5 blue and 6 green marbles. One marble is drawn at random and NOT '
   + 'replaced. It is green. A second marble is then drawn. Find the probability that the second '
   + 'marble is also <b>green</b>.',
   { kind: 'number', answer: '5/14' },
   'Recount both the greens and the total after the first marble has gone.',
   'At the start there are 4 + 5 + 6 = 15 marbles, of which 6 are green. One green is removed '
   + 'and not replaced, leaving 14 marbles of which 5 are green. '
   + 'So the probability that the second is green is 5/14.',
   6, null, null],

  ['g9m-ext-009', 'g9m-coordinates', 'equation_of_line',
   'A line passes through <b>A</b> (&minus;1, &minus;3) and <b>B</b> (3, 5). A second line is '
   + 'parallel to <b>AB</b> and passes through (0, 4). Find the equation of the <b>second</b> line.',
   { kind: 'expression', answer: 'y=2x+4' },
   'Find the gradient of AB first; parallel lines share it.',
   'The gradient of AB is (5 &minus; (&minus;3)) &divide; (3 &minus; (&minus;1)) = 8/4 = 2. '
   + 'The second line has the same gradient and passes through (0, 4), so its intercept is 4 '
   + 'and its equation is y = 2x + 4.', 5, null, null],

  ['g9m-ext-010', 'g9m-expressions', 'binomials_and_factorising',
   'A rectangle has length (<i>x</i> + 5) cm and width (<i>x</i> &minus; 2) cm. '
   + 'Show that its area is <i>x</i><sup>2</sup> + 3<i>x</i> &minus; 10, then find the area when '
   + '<i>x</i> = 6.',
   { kind: 'number', answer: '44', unit: 'cm²' },
   'Expand the brackets first, then substitute.',
   'Area = (x + 5)(x &minus; 2) = x&sup2; &minus; 2x + 5x &minus; 10 = x&sup2; + 3x &minus; 10. '
   + 'Substituting x = 6: 36 + 18 &minus; 10 = 44 cm&sup2;.', 5, null, null],

  ['g9m-ext-011', 'g9m-simultaneous', 'solve_simultaneous',
   'At a canteen, 3 rotis and 2 cups of tea cost Rs 85. 5 rotis and 4 cups of tea cost Rs 155. '
   + 'Find the cost of <b>2 rotis and 3 cups of tea</b>.',
   { kind: 'number', answer: '80', prefix: 'Rs' },
   'Let r be a roti and t a cup of tea, write two equations, then answer the question asked.',
   'From 3r + 2t = 85 and 5r + 4t = 155. Doubling the first: 6r + 4t = 170. '
   + 'Subtracting the second: r = 15. Substituting back: 45 + 2t = 85, so t = 20. '
   + 'Then 2 rotis and 3 teas cost 2(15) + 3(20) = 30 + 60 = Rs 80.', 6, null, null],

  ['g9m-ext-012', 'g9m-quadratics', 'factorise_and_solve',
   'A rectangular garden is 4 m longer than it is wide. Its area is 96 m&sup2;. '
   + 'Find the <b>perimeter</b> of the garden.',
   { kind: 'number', answer: '40', unit: 'm' },
   'Call the width x, form a quadratic, solve it, then answer the question that was asked.',
   'Let the width be x m, so the length is (x + 4) m and x(x + 4) = 96. '
   + 'This gives x&sup2; + 4x &minus; 96 = 0, so (x + 12)(x &minus; 8) = 0 and x = &minus;12 or x = 8. '
   + 'A width cannot be negative, so the width is 8 m and the length is 12 m. '
   + 'The perimeter is 2(8 + 12) = 40 m.', 7, null, null],

  ['g9m-ext-013', 'g9m-capacity', 'units_and_problems',
   'A tank holds 45 litres when full. It is <sup>2</sup>&frasl;<sub>3</sub> full. '
   + '12 litres are drawn off, then 5 litres are added. How many <b>litres</b> are in the tank now?',
   { kind: 'number', answer: '23', unit: 'L' },
   'Work through the three steps in order.',
   'Two thirds of 45 is 30 litres. Drawing off 12 leaves 18 litres. Adding 5 gives 23 litres.',
   5, null, null],

  ['g9m-ext-014', 'g9m-patterns', 'sequences_and_figures',
   'The <i>n</i>th term of a sequence is 3<i>n</i> + 2. Find <b>which term</b> of the sequence '
   + 'is equal to 47.',
   { kind: 'number', answer: '15', label: 'n' },
   'Set the rule equal to 47 and solve for n.',
   '3n + 2 = 47, so 3n = 45 and n = 15. The 15th term is 47. '
   + 'Checking: 3(15) + 2 = 47.', 5, null, null],
];

ITEMS.forEach(([id, chapterId, subsection, prompt, response, hint, explanation, marks, svg, alt]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId, subsection, difficulty: 4,
    source: 'NCF Grades 7-9 §3.9; NCE 2024 Q31 (6 marks) and Q33 (7 marks) extended-tail pattern.',
    stimulus: svg ? { html: svg, altText: alt } : null,
    parts: [{ label: 'a', prompt, marks, hint, explanation, response }],
  }));
});

})();
