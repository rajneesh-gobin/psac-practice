'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - NON-VISUAL alternatives at the sizes that need them
//
//  ⚠ AN INTERACTION BETWEEN TWO FIXES, AND NEITHER IS WRONG ON ITS OWN.
//    Batch 15 made the visual steering symmetric, so once a paper reaches the
//    blueprint's 26% the comparator prefers a NON-visual candidate. Batch 16
//    then gave several chapters three or four figure-carrying tasks at four
//    marks. Put together, a chapter whose four-mark tasks are three figures and
//    ONE piece of text has that one text task forced into every paper the
//    moment the visual quota is met.
//
//    Measured: `g9m-man-021` is the only manipulation task at four marks with
//    no figure, and it appeared in FOUR of five papers while stale. The same
//    shape holds wherever a chapter is lopsided the other way.
//
//  ⚠ SO THE RULE IS NOT "MORE FIGURES". A chapter needs alternatives at each
//    mark size on BOTH SIDES of the visual split, because the assembler now
//    chooses by visual-ness in both directions. Batch 15 wrote 24 figures to
//    fix a shortage of figures and created a shortage of text at the same size.
//
//  These are deliberately plain: no stimulus, no diagram, just multi-part
//  questions of the right size in the chapters that had one.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const SRC = 'NCF Grades 7-9 §3.9; NCE body questions. Written as non-visual counterparts '
          + 'at mark sizes where a chapter held only figures.';

const P = (label, prompt, marks, answer, unit, hint, explanation, extra) => ({
  label, prompt, marks, hint, explanation,
  response: Object.assign({ kind: 'number', answer: String(answer) }, unit ? { unit } : {}, extra || {}),
});
const EXPR = (a, accept) => ({ kind: 'expression', answer: a, accept: accept || [] });

const ITEMS = [

  // ── g9m-manipulation : one non-visual task at 4 marks, forced x4 ───────
  ['g9m-bal-001', 'g9m-manipulation', 'formulae_and_subject', 3, [
    P('a.i', 'The formula for converting degrees Celsius to Fahrenheit is '
      + '<i>F</i> = 1.8<i>C</i> + 32. Find <i>F</i> when <i>C</i> = 25.', 2, '77', null,
      'Multiply first, then add.', 'F = 1.8(25) + 32 = 45 + 32 = 77.'),
    P('a.ii', 'Make <i>C</i> the subject and hence find <i>C</i> when <i>F</i> = 68.',
      2, '20', null, 'Subtract 32, then divide by 1.8.',
      'C = (F &minus; 32) &divide; 1.8 = 36 &divide; 1.8 = 20.'),
  ]],

  ['g9m-bal-002', 'g9m-manipulation', 'formulae_and_subject', 4, [
    P('a.i', 'The cost of hiring a van is <i>C</i> = 900 + 45<i>d</i>, where <i>d</i> is the '
      + 'number of days. Find the cost for 6 days.', 2, '1170', 'Rs',
      'Substitute d = 6.', 'C = 900 + 45(6) = 900 + 270 = Rs 1 170.'),
    P('a.ii', 'Make <i>d</i> the subject of the formula and hence find how many days a hire '
      + 'costing Rs 1 800 lasted.', 2, '20', 'days',
      'Subtract 900, then divide by 45.', 'd = (C &minus; 900) &divide; 45 = 900 &divide; 45 = 20 days.'),
  ]],

  ['g9m-bal-003', 'g9m-manipulation', 'formulae_and_subject', 4, [
    P('a.i', 'Given <i>v</i> = <i>u</i> + <i>at</i>, find <i>v</i> when <i>u</i> = 5, '
      + '<i>a</i> = 3 and <i>t</i> = 4.', 2, '17', null,
      'Work out at first, then add u.', 'v = 5 + 3(4) = 5 + 12 = 17.'),
    P('a.ii', 'Make <i>a</i> the subject and hence find <i>a</i> when <i>v</i> = 30, '
      + '<i>u</i> = 6 and <i>t</i> = 8.', 2, '3', null,
      'Subtract u from both sides, then divide by t.',
      'a = (v &minus; u) &divide; t = 24 &divide; 8 = 3.'),
  ]],

  // ── g9m-vectors : all three four-mark tasks carry a grid ──────────────
  ['g9m-bal-004', 'g9m-vectors', 'column_vectors', 3, [
    P('a.i', 'Given <b>p</b> with components (5, &minus;3), write down the <b>x-component</b> '
      + 'of 3<b>p</b>.', 2, '15', null, 'Multiply each component by 3.', '3 &times; 5 = 15.'),
    P('a.ii', 'Write down the <b>y-component</b> of 3<b>p</b>.', 2, '-9', null,
      'The sign is kept.', '3 &times; (&minus;3) = &minus;9.'),
  ]],

  ['g9m-bal-005', 'g9m-vectors', 'translation', 4, [
    P('a.i', 'A translation moves (3, 7) to (8, 4). Write down the <b>x-component</b> of the '
      + 'translation vector.', 2, '5', null,
      'Subtract the starting x from the finishing x.', '8 &minus; 3 = 5.'),
    P('a.ii', 'Write down the <b>y-component</b>.', 2, '-3', null,
      'Subtract the starting y from the finishing y.', '4 &minus; 7 = &minus;3.'),
  ]],

  // ── g9m-trigonometry : both four-mark tasks carry a figure ────────────
  ['g9m-bal-006', 'g9m-trigonometry', 'ratios_and_2d_problems', 4, [
    P('a.i', 'In a right-angled triangle the hypotenuse is 13 cm and one shorter side is 5 cm. '
      + 'Use Pythagoras to find the <b>third side</b>.', 2, '12', 'cm',
      'The square on the hypotenuse equals the sum of the squares on the other two sides.',
      '13&sup2; &minus; 5&sup2; = 169 &minus; 25 = 144, and &radic;144 = 12 cm.'),
    P('a.ii', 'Calculate the <b>area</b> of that triangle.', 2, '30', 'cm²',
      'Half of the two shorter sides multiplied together.',
      '&frac12; &times; 5 &times; 12 = 30 cm&sup2;.'),
  ]],

  // ── g9m-volume : both four-mark tasks carry a figure ──────────────────
  ['g9m-bal-007', 'g9m-volume', 'prisms_and_cylinders', 4, [
    P('a.i', 'A cube has edges of 9 cm. Calculate its <b>volume</b>.', 2, '729', 'cm³',
      'Edge cubed.', '9 &times; 9 &times; 9 = 729 cm&sup3;.'),
    P('a.ii', 'A second cube has twice the edge length. How many times bigger is its volume?',
      2, '8', 'times', 'Doubling every edge multiplies the volume by 2 x 2 x 2.',
      '18&sup3; = 5 832, and 5 832 &divide; 729 = 8 times.'),
  ]],

  // ── g9m-geometry-revision : one task at 5 marks, and it was forced x3 ──
  ['g9m-bal-008', 'g9m-geometry-revision', 'grade7_8_geometry', 4, [
    P('a.i', 'In a survey of 50 people, 28 read the news online, 22 read a printed paper and 9 do '
      + 'both. How many read <b>online only</b>?', 2, '19', 'people',
      'Take the overlap off the online total.', '28 &minus; 9 = 19 people.'),
    P('a.ii', 'How many read a printed paper <b>only</b>?', 1, '13', 'people',
      'Take the overlap off the printed total.', '22 &minus; 9 = 13 people.'),
    P('b', 'How many read <b>neither</b>?', 2, '9', 'people',
      'Add the three regions, then subtract from 50.',
      '19 + 9 + 13 = 41, so 50 &minus; 41 = 9 people.'),
  ]],

  ['g9m-bal-009', 'g9m-geometry-revision', 'grade7_8_geometry', 4, [
    P('a', 'Three angles meet at a point on a straight line. Two of them are 47&deg; and 68&deg;. '
      + 'Find the third.', 2, '65', '°',
      'Angles on a straight line add to 180&deg;.', '180 &minus; 47 &minus; 68 = 65&deg;.'),
    P('b', 'A fourth angle is added so that all four now meet at a point and fill a complete turn. '
      + 'Find that fourth angle.', 3, '180', '°',
      'A complete turn is 360&deg;, and the first three already make 180&deg;.',
      '360 &minus; 180 = 180&deg;.'),
  ]],

  // ── g9m-number-revision : six of its eight four-mark tasks are figures ─
  ['g9m-bal-010', 'g9m-number-revision', 'fractions_decimals_percentages', 4, [
    P('a.i', 'A television costs Rs 18 000. In a sale the price falls by 15%. Calculate the '
      + '<b>sale price</b>.', 2, '15300', 'Rs',
      'Find 15% and take it off, or find 85% directly.',
      '15% of 18 000 = 2 700, so the sale price is 18 000 &minus; 2 700 = Rs 15 300.'),
    P('a.ii', 'After the sale the price is raised by 15% of the SALE price. Show that it does '
      + 'not return to Rs 18 000 by calculating the new price.', 2, '17595', 'Rs',
      '15% of 15 300 is smaller than 15% of 18 000.',
      '15% of 15 300 = 2 295, so the new price is 15 300 + 2 295 = Rs 17 595.'),
  ]],

  ['g9m-bal-011', 'g9m-number-revision', 'ratio_and_measures', 3, [
    P('a.i', 'A recipe uses flour and sugar in the ratio 5 : 2. A baker uses 750 g of flour. '
      + 'How much sugar is needed?', 2, '300', 'g',
      'Find what one part weighs first.', '750 &divide; 5 = 150 g per part, so 2 &times; 150 = 300 g.'),
    P('a.ii', 'What is the <b>total</b> weight of flour and sugar?', 2, '1050', 'g',
      'Add the two amounts.', '750 + 300 = 1 050 g.'),
  ]],

  // ── g9m-expressions : all three four-mark tasks carry a figure ────────
  ['g9m-bal-012', 'g9m-expressions', 'binomials_and_factorising', 4, [
    P('a.i', 'Expand and simplify (<i>x</i> + 4)(<i>x</i> + 7).', 2, 'x^2+11x+28', null,
      'Multiply all four pairs, then collect the x terms.',
      'x&sup2; + 7x + 4x + 28 = x&sup2; + 11x + 28.', EXPR('x^2+11x+28')),
    P('a.ii', 'Hence find the value of the expression when <i>x</i> = 10.', 2, '238', null,
      'Substitute into your expanded form, or into the brackets.',
      '(10 + 4)(10 + 7) = 14 &times; 17 = 238.'),
  ]],
];

ITEMS.forEach(([id, chapterId, subsection, difficulty, parts]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId, subsection, difficulty, source: SRC, parts,
  }));
});

})();
