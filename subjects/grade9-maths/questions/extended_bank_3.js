'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - big tasks in the HEAVY chapters
//
//  ⚠ THE FIRST TRANCHE (extended_bank_2.js) FIXED THE HISTOGRAM AND BARELY
//    MOVED THE REPEAT RATE: 53.4% to 51.9% over five papers, with the same two
//    tasks still appearing in all five. Writing 26 large tasks was necessary
//    and not sufficient, and tracing the assembler said why.
//
//    `assemblePaper` ranks candidates by CHAPTER DEFICIT first, then size, and
//    only reaches freshness on an exact tie. So the chapter that owes the most
//    marks wins, and within it the biggest task wins - whether or not it was on
//    the last paper. Measured per chapter:
//
//        chapter                weight  ~marks/paper   4mk 5mk 6mk 7mk
//        g9m-number-revision       8         15         1   0   1   0
//        g9m-vectors               4          8         0   1   0   0
//        g9m-coordinates           4          8         1   3   0   0
//        g9m-quadratics            2          4         3   0   0   1
//        g9m-indices               2          4         0   1   0   0
//
//    number-revision is the HEAVIEST chapter in the paper and owned exactly one
//    six-mark task, so `g9m-ext-002` was not chosen - it was forced, five times
//    out of five. Same for `g9m-vec-034` in vectors and `g9m-ext-012` in
//    quadratics. The shortage was never the bank's size; it was that big tasks
//    have to be distributed in proportion to a chapter's WEIGHT, and the first
//    tranche put them in volume, statistics, surface area and finance - none of
//    which were the ones being forced.
//
//  ⚠ So this file is aimed, not general: 22 tasks of 4 marks or more, every one
//    of them in a chapter that had no alternative at its size.
//
//  ⚠ Italic inside an svg is a <tspan>. <i> is an HTML breakout tag and ENDS
//    the svg element - see scripts/test-svg-figures.js.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const SRC = 'NCF Grades 7-9 §3.9; NCE multi-part body questions. Written to give the '
          + 'heaviest chapters an alternative at 4-7 marks.';

const SVG = (w, h) => '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h
  + '" xmlns="http://www.w3.org/2000/svg" role="img">';
const ITAL = t => '<tspan font-style="italic">' + t + '</tspan>';

// A squared grid with optional plotted points and an optional arrow between two
// of them. M is a margin: the plot used to fill the viewBox exactly and the
// outermost axis labels were clipped (see ch02_coordinates.js).
function grid(xMin, xMax, yMin, yMax, pts, arrow) {
  const M = 16, cell = 26;
  const w = (xMax - xMin) * cell, h = (yMax - yMin) * cell;
  const X = x => (M + (x - xMin) * cell).toFixed(1);
  const Y = y => (M + h - (y - yMin) * cell).toFixed(1);
  let g = '';
  for (let x = xMin; x <= xMax; x++) g += `<line x1="${X(x)}" y1="${M}" x2="${X(x)}" y2="${M + h}" stroke="#c8c8c8" stroke-width="0.6"/>`;
  for (let y = yMin; y <= yMax; y++) g += `<line x1="${M}" y1="${Y(y)}" x2="${M + w}" y2="${Y(y)}" stroke="#c8c8c8" stroke-width="0.6"/>`;
  g += `<line x1="${M}" y1="${Y(0)}" x2="${M + w}" y2="${Y(0)}" stroke="#000" stroke-width="1.4"/>`;
  g += `<line x1="${X(0)}" y1="${M}" x2="${X(0)}" y2="${M + h}" stroke="#000" stroke-width="1.4"/>`;
  for (let x = xMin; x <= xMax; x++) if (x !== 0)
    g += `<text x="${X(x)}" y="${(+Y(0) + 13)}" font-size="10" text-anchor="middle">${x}</text>`;
  for (let y = yMin; y <= yMax; y++) if (y !== 0)
    g += `<text x="${(+X(0) - 6)}" y="${(+Y(y) + 4)}" font-size="10" text-anchor="end">${y}</text>`;
  g += `<text x="${M + w - 4}" y="${(+Y(0) - 6)}" font-size="11" text-anchor="end" font-style="italic">x</text>`;
  g += `<text x="${(+X(0) + 6)}" y="${M + 11}" font-size="11" font-style="italic">y</text>`;
  (pts || []).forEach(p => {
    g += `<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="3.2" fill="#000"/>`;
    if (p[2]) g += `<text x="${(+X(p[0]) + 7)}" y="${(+Y(p[1]) - 7)}" font-size="12" font-weight="bold">${p[2]}</text>`;
  });
  if (arrow) {
    const [a, b] = arrow;
    g += `<defs><marker id="ah" markerWidth="9" markerHeight="9" refX="7" refY="3.2" orient="auto">`
       + `<path d="M0,0 L7,3.2 L0,6.4 z" fill="#000"/></marker></defs>`
       + `<line x1="${X(a[0])}" y1="${Y(a[1])}" x2="${X(b[0])}" y2="${Y(b[1])}" stroke="#000" stroke-width="1.8" marker-end="url(#ah)"/>`;
  }
  return SVG(Math.round(M * 2 + w), Math.round(M * 2 + h)) + g + '</svg>';
}
const ALT_GRID = 'A squared coordinate grid with numbered x and y axes and some marked points.';

const P = (label, prompt, marks, answer, unit, hint, explanation, extra) => ({
  label, prompt, marks, hint, explanation,
  response: Object.assign({ kind: 'number', answer: String(answer) }, unit ? { unit } : {}, extra || {}),
});
const EXPR = (a, accept) => ({ kind: 'expression', answer: a, accept: accept || [] });

const ITEMS = [

  // ── g9m-number-revision : weight 8, the heaviest chapter, and it owned ONE
  //    six-mark task. Seven added, spread across 4, 5, 6 and 7 marks.
  ['g9m-nrb-101', 'g9m-number-revision', 'fractions_decimals_percentages', 3, [
    P('a', 'A shirt costs Rs 1 250. Its price is reduced by <b>12%</b>. Calculate the reduction.',
      2, '150', 'Rs', '12% means 12 out of every 100.', '12% of 1 250 = 0.12 &times; 1 250 = Rs 150.'),
    P('b', 'Calculate the <b>new price</b> of the shirt.', 2, '1100', 'Rs',
      'Take the reduction off the original price.', '1 250 &minus; 150 = Rs 1 100.'),
  ]],

  ['g9m-nrb-102', 'g9m-number-revision', 'fractions_decimals_percentages', 4, [
    P('a.i', 'Express <sup>3</sup>&frasl;<sub>8</sub> as a <b>decimal</b>.', 1, '0.375', null,
      'Divide 3 by 8.', '3 &divide; 8 = 0.375.'),
    P('a.ii', 'Express <sup>3</sup>&frasl;<sub>8</sub> as a <b>percentage</b>.', 2, '37.5', '%',
      'Multiply the decimal by 100.', '0.375 &times; 100 = 37.5%.'),
    P('b', 'A tank holds 640 litres. Calculate <sup>3</sup>&frasl;<sub>8</sub> of its capacity.',
      2, '240', 'litres', 'Divide by 8, then multiply by 3.', '640 &divide; 8 = 80, and 80 &times; 3 = 240 litres.'),
  ]],

  ['g9m-nrb-103', 'g9m-number-revision', 'ratio_and_measures', 4, [
    P('a.i', 'A map has a scale of 1 : 50 000. Two towns are <b>8 cm</b> apart on the map. '
      + 'Find the real distance in <b>centimetres</b>.', 2, '400000', 'cm',
      'Multiply the map distance by the scale factor.', '8 &times; 50 000 = 400 000 cm.'),
    P('a.ii', 'Express that distance in <b>kilometres</b>.', 2, '4', 'km',
      'There are 100 000 cm in a kilometre.', '400 000 &divide; 100 000 = 4 km.'),
    P('b', 'A third town is 11 km from the first. How far apart are they <b>on the map</b>?',
      2, '22', 'cm', 'Turn the kilometres into centimetres first, then divide by 50 000.',
      '11 km = 1 100 000 cm, and 1 100 000 &divide; 50 000 = 22 cm.'),
  ]],

  ['g9m-nrb-104', 'g9m-number-revision', 'fractions_decimals_percentages', 4, [
    P('a.i', 'Calculate <sup>2</sup>&frasl;<sub>3</sub> + <sup>1</sup>&frasl;<sub>4</sub>, '
      + 'giving your answer as a fraction in its lowest terms.', 2, '11/12', null,
      'Use a common denominator of 12.', '8/12 + 3/12 = 11/12.', EXPR('11/12')),
    P('a.ii', 'Calculate <sup>2</sup>&frasl;<sub>3</sub> &minus; <sup>1</sup>&frasl;<sub>4</sub>.',
      2, '5/12', null, 'The same common denominator.', '8/12 &minus; 3/12 = 5/12.', EXPR('5/12')),
    P('a.iii', 'Calculate <sup>2</sup>&frasl;<sub>3</sub> &times; <sup>1</sup>&frasl;<sub>4</sub>, '
      + 'in its lowest terms.', 2, '1/6', null, 'Multiply the tops and the bottoms, then simplify.',
      '2/3 &times; 1/4 = 2/12 = 1/6.', EXPR('1/6')),
  ]],

  ['g9m-nrb-105', 'g9m-number-revision', 'ratio_and_measures', 4, [
    P('a', 'A recipe for 4 people needs 600 g of rice. How much is needed for <b>6</b> people?',
      2, '900', 'g', 'Find the amount for one person first.',
      '600 &divide; 4 = 150 g each, so 6 people need 6 &times; 150 = 900 g.'),
    P('b.i', 'Rice is sold in 2 kg bags. How many <b>whole bags</b> are needed for 6 people?',
      1, '1', 'bag', '900 g is less than 2 kg.', '900 g is under 2 000 g, so one bag is enough.'),
    P('b.ii', 'How many people could be fed from <b>one</b> 2 kg bag?', 2, '13', 'people',
      'Divide 2 000 g by the amount one person needs, then round down.',
      '2 000 &divide; 150 = 13.33, and you cannot feed a third of a person, so 13.'),
  ]],

  ['g9m-nrb-106', 'g9m-number-revision', 'fractions_decimals_percentages', 4, [
    P('a.i', 'A sum of Rs 25 000 is invested at <b>6% simple interest</b> per year. '
      + 'Calculate the interest earned in <b>one</b> year.', 2, '1500', 'Rs',
      '6% of the sum invested.', '0.06 &times; 25 000 = Rs 1 500.'),
    P('a.ii', 'Calculate the interest earned in <b>3</b> years.', 2, '4500', 'Rs',
      'Simple interest is the same every year.', '3 &times; 1 500 = Rs 4 500.'),
    P('b', 'Write down the <b>total amount</b> after 3 years.', 1, '29500', 'Rs',
      'Add the interest to the original sum.', '25 000 + 4 500 = Rs 29 500.'),
    P('c', 'For how many <b>whole years</b> must it be invested for the interest to exceed Rs 10 000?',
      2, '7', 'years', 'Divide 10 000 by the yearly interest and round up.',
      '10 000 &divide; 1 500 = 6.67, so after 6 years the interest is Rs 9 000 and after 7 it is '
      + 'Rs 10 500. The answer is 7 years.'),
  ]],

  ['g9m-nrb-107', 'g9m-number-revision', 'ratio_and_measures', 4, [
    P('a.i', 'A car travels 210 km in 3 hours. Calculate its <b>average speed</b>.',
      2, '70', 'km/h', 'Speed is distance divided by time.', '210 &divide; 3 = 70 km/h.'),
    P('a.ii', 'At the same speed, how far would it travel in <b>5</b> hours?', 2, '350', 'km',
      'Speed multiplied by time.', '70 &times; 5 = 350 km.'),
    P('b.i', 'How long would a journey of 490 km take at that speed? '
      + 'Give your answer in hours.', 2, '7', 'hours', 'Distance divided by speed.',
      '490 &divide; 70 = 7 hours.'),
    P('b.ii', 'The car uses 1 litre of fuel every 14 km. How many litres does the 490 km journey use?',
      1, '35', 'litres', 'Divide the distance by the distance per litre.', '490 &divide; 14 = 35 litres.'),
  ]],

  // ── g9m-vectors : weight 4, and the bank held ONE task above 3 marks.
  ['g9m-vcb-101', 'g9m-vectors', 'column_vectors', 3, [
    P('a', 'The diagram shows the points A (1, 1) and B (5, 4). Write down the <b>x-component</b> '
      + 'of the vector <b>AB</b>.', 2, '4', null, 'Subtract the x of A from the x of B.',
      '5 &minus; 1 = 4.'),
    P('b', 'Write down the <b>y-component</b> of <b>AB</b>.', 2, '3', null,
      'Subtract the y of A from the y of B.', '4 &minus; 1 = 3.'),
  ], grid(0, 7, 0, 6, [[1, 1, 'A'], [5, 4, 'B']], [[1, 1], [5, 4]]), ALT_GRID],

  ['g9m-vcb-102', 'g9m-vectors', 'column_vectors', 4, [
    P('a.i', 'Given <b>a</b> with components (3, 4), calculate its <b>magnitude</b>.',
      2, '5', null, 'Use Pythagoras on the two components.',
      '&radic;(3&sup2; + 4&sup2;) = &radic;(9 + 16) = &radic;25 = 5.'),
    P('a.ii', 'Given <b>b</b> with components (6, 8), calculate its magnitude.', 2, '10', null,
      'The same method.', '&radic;(36 + 64) = &radic;100 = 10.'),
    P('b', '<b>b</b> is a multiple of <b>a</b>. Write down the value of <i>k</i> for which '
      + '<b>b</b> = <i>k</i><b>a</b>.', 1, '2', null, 'Compare the components.',
      '6 = 2 &times; 3 and 8 = 2 &times; 4, so k = 2.'),
  ]],

  ['g9m-vcb-103', 'g9m-vectors', 'translation', 4, [
    P('a.i', 'A point P (2, 3) is translated by the vector with components (4, &minus;1). '
      + 'Write down the <b>x-coordinate</b> of the image.', 2, '6', null,
      'Add the x-component to the x-coordinate.', '2 + 4 = 6.'),
    P('a.ii', 'Write down the <b>y-coordinate</b> of the image.', 2, '2', null,
      'Add the y-component, remembering it is negative.', '3 + (&minus;1) = 2.'),
    P('b', 'The image is then translated back to P. Write down the <b>x-component</b> of that '
      + 'second translation.', 2, '-4', null, 'It must undo the first translation.',
      'The reverse of (4, &minus;1) is (&minus;4, 1), so the x-component is &minus;4.'),
  ]],

  ['g9m-vcb-104', 'g9m-vectors', 'column_vectors', 4, [
    P('a.i', 'Given <b>a</b> = (2, 5) and <b>b</b> = (3, &minus;1), find the <b>x-component</b> '
      + 'of <b>a</b> + <b>b</b>.', 1, '5', null, 'Add the x parts.', '2 + 3 = 5.'),
    P('a.ii', 'Find the <b>y-component</b> of <b>a</b> + <b>b</b>.', 1, '4', null,
      'Add the y parts.', '5 + (&minus;1) = 4.'),
    P('b.i', 'Find the <b>x-component</b> of 2<b>a</b> &minus; <b>b</b>.', 2, '1', null,
      'Double a first, then subtract b.', '2 &times; 2 = 4, and 4 &minus; 3 = 1.'),
    P('b.ii', 'Find the <b>y-component</b> of 2<b>a</b> &minus; <b>b</b>.', 2, '11', null,
      'The same, taking care with the minus.', '2 &times; 5 = 10, and 10 &minus; (&minus;1) = 11.'),
  ]],

  // ── g9m-coordinates : weight 4, nothing above 5 marks.
  ['g9m-crb-101', 'g9m-coordinates', 'equation_of_line', 4, [
    P('a', 'A line passes through A (0, 2) and B (4, 10). Find its <b>gradient</b>.',
      2, '2', null, 'Change in y over change in x.', '(10 &minus; 2) &divide; (4 &minus; 0) = 8 &divide; 4 = 2.'),
    P('b', 'Write down the <b>y-intercept</b>.', 1, '2', null,
      'A has x = 0, so it is on the y-axis.', 'A is (0, 2), so the y-intercept is 2.'),
    P('c', 'Find the value of <i>y</i> when <i>x</i> = 7.', 2, '16', null,
      'Use y = 2x + 2.', 'y = 2(7) + 2 = 16.'),
    P('d', 'Find the value of <i>x</i> when <i>y</i> = 0.', 1, '-1', null,
      'Set y to zero and solve.', '0 = 2x + 2 gives x = &minus;1.'),
  ], grid(-2, 6, -2, 6, [[0, 2, 'A']], null), ALT_GRID],

  ['g9m-crb-102', 'g9m-coordinates', 'gradient', 4, [
    P('a', 'Find the gradient of the line through P (&minus;2, 1) and Q (2, 9).',
      2, '2', null, 'Take the differences in the same order.',
      '(9 &minus; 1) &divide; (2 &minus; (&minus;2)) = 8 &divide; 4 = 2.'),
    P('b.i', 'Find the <b>midpoint</b> of PQ. Write down its <i>x</i>-coordinate.', 2, '0', null,
      'The midpoint x is the average of the two x values.', '(&minus;2 + 2) &divide; 2 = 0.'),
    P('b.ii', 'Write down the <i>y</i>-coordinate of the midpoint.', 2, '5', null,
      'The average of the two y values.', '(1 + 9) &divide; 2 = 5.'),
  ], grid(-3, 4, -1, 10, [[-2, 1, 'P'], [2, 9, 'Q']], null), ALT_GRID],

  ['g9m-crb-103', 'g9m-coordinates', 'equation_of_line', 4, [
    P('a.i', 'A line has equation <i>y</i> = 3<i>x</i> &minus; 4. Write down its gradient.',
      1, '3', null, 'The number in front of x.', 'In y = mx + c the gradient m is 3.'),
    P('a.ii', 'Write down its <i>y</i>-intercept.', 1, '-4', null, 'The constant term.',
      'c = &minus;4.'),
    P('b.i', 'The point (5, <i>k</i>) lies on the line. Find <i>k</i>.', 2, '11', null,
      'Substitute x = 5.', 'k = 3(5) &minus; 4 = 11.'),
    P('b.ii', 'A second line is <b>parallel</b> to the first and passes through (0, 6). '
      + 'Find <i>y</i> when <i>x</i> = 2.', 2, '12', null,
      'Parallel lines share a gradient, so the second line is y = 3x + 6.',
      'y = 3(2) + 6 = 12.'),
  ]],

  // ── g9m-quadratics : weight 2, one 7-mark task and nothing at 5 or 6.
  ['g9m-qdb-101', 'g9m-quadratics', 'factorise_and_solve', 4, [
    P('a', 'Factorise <i>x</i><sup>2</sup> &minus; 7<i>x</i> + 12.', 2, '(x-3)(x-4)', null,
      'Two numbers multiplying to 12 and adding to &minus;7.',
      '&minus;3 and &minus;4 give (x &minus; 3)(x &minus; 4).', EXPR('(x-3)(x-4)', ['(x-4)(x-3)'])),
    P('b.i', 'Hence write down the <b>smaller</b> root of <i>x</i><sup>2</sup> &minus; 7<i>x</i> + 12 = 0.',
      2, '3', null, 'Each bracket can be zero.', 'x = 3 or x = 4; the smaller is 3.'),
    P('b.ii', 'A rectangle has length (<i>x</i> &minus; 3) cm and width (<i>x</i> &minus; 4) cm. '
      + 'When <i>x</i> = 9, calculate its <b>area</b>.', 2, '30', 'cm²',
      'Substitute x = 9 into both sides, then multiply.',
      'Length = 6 cm and width = 5 cm, so the area is 30 cm&sup2;.'),
  ]],

  ['g9m-qdb-102', 'g9m-quadratics', 'factorise_and_solve', 4, [
    P('a', 'Factorise <i>x</i><sup>2</sup> + 9<i>x</i> + 20.', 2, '(x+4)(x+5)', null,
      'Two numbers multiplying to 20 and adding to 9.', '4 and 5, so (x + 4)(x + 5).',
      EXPR('(x+4)(x+5)', ['(x+5)(x+4)'])),
    P('b', 'Write down the two roots of <i>x</i><sup>2</sup> + 9<i>x</i> + 20 = 0. '
      + 'Give the more negative one.', 2, '-5', null, 'Each bracket can be zero.',
      'x = &minus;4 or x = &minus;5; the more negative is &minus;5.'),
    P('c.i', 'Find the <b>sum</b> of the two roots.', 1, '-9', null,
      'Add them.', '&minus;4 + (&minus;5) = &minus;9.'),
    P('c.ii', 'Find the <b>product</b> of the two roots.', 1, '20', null,
      'Multiply them.', '(&minus;4) &times; (&minus;5) = 20.'),
  ]],

  // ── g9m-indices : weight 2, one 5-mark task and nothing else above 3.
  ['g9m-inb-101', 'g9m-indices', 'laws', 4, [
    P('a.i', 'Simplify 2<sup>5</sup> &times; 2<sup>3</sup>, giving your answer as a power of 2. '
      + 'Write down the index.', 2, '8', null, 'When multiplying powers of the same base, add the indices.',
      '5 + 3 = 8, so the answer is 2^8.'),
    P('a.ii', 'Simplify 2<sup>9</sup> &divide; 2<sup>4</sup>. Write down the index.', 2, '5', null,
      'When dividing, subtract the indices.', '9 &minus; 4 = 5, so the answer is 2^5.'),
    P('b', 'Evaluate 2<sup>5</sup>.', 1, '32', null, 'Multiply 2 by itself five times.',
      '2 &times; 2 &times; 2 &times; 2 &times; 2 = 32.'),
  ]],

  ['g9m-inb-102', 'g9m-indices', 'negative_indices', 4, [
    P('a', 'Evaluate 3<sup>&minus;2</sup>, giving your answer as a fraction.', 2, '1/9', null,
      'A negative index means one over the positive power.', '3^-2 = 1/3&sup2; = 1/9.', EXPR('1/9')),
    P('b', 'Write down the value of 12<sup>0</sup> &times; 3<sup>0</sup>.', 1, '1', null,
      'Anything raised to the power zero is 1.',
      '12^0 = 1 and 3^0 = 1, so the product is 1 &times; 1 = 1.'),
    P('c.i', 'Simplify 4<sup>3</sup> &times; 4<sup>&minus;5</sup>. Write down the index of the answer '
      + 'as a power of 4.', 2, '-2', null, 'Add the indices, keeping the sign.',
      '3 + (&minus;5) = &minus;2, so the answer is 4^-2.'),
    P('c.ii', 'Hence evaluate 4<sup>3</sup> &times; 4<sup>&minus;5</sup> as a fraction.',
      1, '1/16', null, 'Use your answer to (c).', '4^-2 = 1/4&sup2; = 1/16.', EXPR('1/16')),
  ]],

  // ── g9m-expressions : weight 3, nothing above 3 marks.
  ['g9m-exb-101', 'g9m-expressions', 'binomials_and_factorising', 4, [
    P('a.i', 'Expand (<i>x</i> + 6)(<i>x</i> &minus; 2).', 2, 'x^2+4x-12', null,
      'Multiply every term in the first bracket by every term in the second.',
      'x&sup2; &minus; 2x + 6x &minus; 12 = x&sup2; + 4x &minus; 12.', EXPR('x^2+4x-12')),
    P('a.ii', 'Hence find the value of the expression when <i>x</i> = 3.', 2, '9', null,
      'Substitute into your expanded form, or into the brackets.',
      '3&sup2; + 4(3) &minus; 12 = 9 + 12 &minus; 12 = 9. (Check: (3+6)(3&minus;2) = 9 &times; 1 = 9.)'),
    P('b', 'Factorise <i>x</i><sup>2</sup> &minus; 36.', 2, '(x+6)(x-6)', null,
      'A difference of two squares.', 'x&sup2; &minus; 6&sup2; = (x + 6)(x &minus; 6).',
      EXPR('(x+6)(x-6)', ['(x-6)(x+6)'])),
  ]],

  ['g9m-exb-102', 'g9m-expressions', 'binomials_and_factorising', 4, [
    P('a', 'Expand (2<i>x</i> &minus; 3)<sup>2</sup>.', 3, '4x^2-12x+9', null,
      'A square means the bracket multiplied by itself; there are three terms in the answer.',
      '(2x &minus; 3)(2x &minus; 3) = 4x&sup2; &minus; 6x &minus; 6x + 9 = 4x&sup2; &minus; 12x + 9.',
      EXPR('4x^2-12x+9')),
    P('b', 'Find the value of the expression when <i>x</i> = 5.', 2, '49', null,
      'Substitute, or square (2&times;5 &minus; 3) directly.',
      '(2(5) &minus; 3)&sup2; = 7&sup2; = 49.'),
  ]],

  // ── g9m-manipulation and g9m-inequalities : weight 2 each, one 4-mark task
  //    between them and nothing larger.
  ['g9m-mnb-101', 'g9m-manipulation', 'formulae_and_subject', 4, [
    P('a', 'The formula for the perimeter of a rectangle is <i>P</i> = 2(<i>l</i> + <i>w</i>). '
      + 'Find <i>P</i> when <i>l</i> = 12 and <i>w</i> = 7.', 2, '38', null,
      'Add first, then double.', '2(12 + 7) = 2 &times; 19 = 38.'),
    P('b', 'Make <i>w</i> the subject and hence find <i>w</i> when <i>P</i> = 50 and <i>l</i> = 15.',
      3, '10', null, 'Divide by 2, then subtract l.',
      'w = P/2 &minus; l = 50/2 &minus; 15 = 25 &minus; 15 = 10.'),
  ]],

  ['g9m-ineb-101', 'g9m-inequalities', 'solve_and_represent', 4, [
    P('a.i', 'Solve 3<i>x</i> + 4 &le; 19, giving your answer in the form <i>x</i> &le; <i>k</i>. '
      + 'Write down <i>k</i>.', 2, '5', null, 'Subtract 4, then divide by 3.',
      '3x &le; 15, so x &le; 5.'),
    P('a.ii', 'Write down the <b>largest integer</b> that satisfies the inequality.', 1, '5', null,
      'The sign allows equality.', 'x &le; 5 includes 5 itself.'),
    P('b', 'Solve &minus;2<i>x</i> &gt; 8, giving your answer in the form <i>x</i> &lt; <i>k</i>. '
      + 'Write down <i>k</i>.', 2, '-4', null,
      'Dividing by a negative number reverses the inequality sign.',
      'Dividing both sides by &minus;2 gives x &lt; &minus;4.'),
  ]],
];

ITEMS.forEach(([id, chapterId, subsection, difficulty, parts, svg, alt]) => {
  STATIC_QUESTIONS.push(makeTask(Object.assign({
    id, chapterId, subsection, difficulty, source: SRC, parts,
  }, svg ? { stimulus: { html: svg, altText: alt } } : {})));
});

})();
