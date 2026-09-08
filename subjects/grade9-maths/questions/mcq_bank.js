'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - multiple-choice bank
//
//  ⚠ WRITTEN TO FILL A MEASURED SHORTAGE, not to pad the bank. The blueprint
//    gathers SEVEN one-mark multiple-choice items into a single question every
//    paper (NCE 2025 Q11 parts (a)-(g), 2024 Q12 parts (a)-(f)). Measured by
//    scripts/nce-paper-report.js after batch 9:
//
//        role                have   per paper   for 10 papers   short by
//        1-mark MCQ items      22           7              70         48
//
//    A 468-task bank was still repeating 56.6% of its questions across ten
//    papers, and this was one of the three reasons. More two-mark questions
//    would not have moved it.
//
//  ⚠ EVERY DISTRACTOR IS A NAMED MISCONCEPTION. The explanation says which
//    mistake produces which wrong option, because a distractor chosen to fill
//    a slot teaches nothing and a child who picks it learns nothing from being
//    told only that they were wrong.
//
//  This file is cross-cutting by chapter, following the pattern the repository
//  already uses for `extended_practice_bank.js` and `exam_depth.js`. Every item
//  still carries its own chapterId and subsection.
// ══════════════════════════════════════════════════════════════════════════

(function () {

// [ id, chapterId, subsection, difficulty, prompt, options[], answer, hint, explanation ]
const ITEMS = [

  // ── Number revision ─────────────────────────────────────────────────────
  ['g9m-mcq-001', 'g9m-number-revision', 'fractions_decimals_percentages', 1,
   'What is the value of <b>3</b> in 21.03?',
   ['3 hundredths', '3 tenths', '3 tens', '3 hundreds'], '3 hundredths',
   'Count the places after the decimal point.',
   'The first place after the point is tenths and the second is hundredths, so the 3 is worth '
   + '3 hundredths. "3 tenths" reads the wrong column; the other two read to the left of the point.'],

  ['g9m-mcq-002', 'g9m-number-revision', 'fractions_decimals_percentages', 2,
   'Which of the following is an <b>irrational</b> number?',
   ['&radic;5', '&radic;25', '<sup>22</sup>&frasl;<sub>7</sub>', '0.25'], '&radic;5',
   'An irrational number cannot be written as one whole number over another.',
   '&radic;5 = 2.2360&hellip; never terminates or repeats, so it is irrational. &radic;25 = 5 is a '
   + 'whole number; 22/7 is a fraction; 0.25 = 1/4. All three of those are rational. '
   + '22/7 is a common trap because it is used as an approximation for &pi;, but it is itself rational.'],

  ['g9m-mcq-003', 'g9m-number-revision', 'ratio_and_measures', 1,
   'Convert 3 kg 80 g into grams.',
   ['3080 g', '380 g', '3800 g', '3.080 g'], '3080 g',
   'One kilogram is 1 000 grams - and 80 g is not 800 g.',
   '3 kg = 3 000 g, so the total is 3 080 g. 380 g and 3 800 g both mis-place the 80; '
   + '3.080 g leaves the answer in kilograms.'],

  ['g9m-mcq-004', 'g9m-number-revision', 'ratio_and_measures', 2,
   '130 minutes is the same as',
   ['2 h 10 min', '1 h 30 min', '1 h 40 min', '2 h 30 min'], '2 h 10 min',
   'There are 60 minutes in an hour, not 100.',
   '130 = 120 + 10, and 120 minutes is 2 hours, so it is 2 h 10 min. "1 h 30 min" treats 130 as '
   + '1 hour and 30 minutes, which is the mistake of reading the digits rather than dividing by 60.'],

  ['g9m-mcq-005', 'g9m-number-revision', 'ratio_and_measures', 2,
   'A crate holds 24 bottles. How many bottles are there in 7 crates?',
   ['168', '31', '17', '148'], '168',
   'Multiply the number in one crate by the number of crates.',
   '24 &times; 7 = 168. 31 adds instead of multiplying; 17 subtracts; '
   + '148 is the slip of multiplying 20 &times; 7 and adding 4 &times; 2.'],

  ['g9m-mcq-006', 'g9m-number-revision', 'fractions_decimals_percentages', 2,
   'Which of these is the <b>largest</b>?',
   ['0.7', '0.07', '0.007', '0.0007'], '0.7',
   'Compare the first digit after the decimal point.',
   '0.7 has 7 tenths; the others have 7 hundredths, thousandths and ten-thousandths. '
   + 'More digits after the point does not mean a bigger number.'],

  // ── Indices ─────────────────────────────────────────────────────────────
  ['g9m-mcq-007', 'g9m-indices', 'laws', 2,
   'Simplify <i>x</i><sup>8</sup> &divide; <i>x</i><sup>2</sup>.',
   ['x<sup>6</sup>', 'x<sup>4</sup>', 'x<sup>10</sup>', 'x<sup>16</sup>'], 'x<sup>6</sup>',
   'Division subtracts the indices.',
   'x<sup>8</sup> &divide; x<sup>2</sup> = x<sup>8&minus;2</sup> = x<sup>6</sup>. x<sup>4</sup> '
   + 'comes from dividing the indices, x<sup>10</sup> from adding them and x<sup>16</sup> from '
   + 'multiplying them.'],

  ['g9m-mcq-008', 'g9m-indices', 'negative_indices', 3,
   'Which of the following equals <sup>1</sup>&frasl;<sub>16</sub>?',
   // ⚠ NO TWO OPTIONS MAY BE MATHEMATICALLY EQUAL. The first draft offered
   //   both 2^-4 and 4^-2, which are both 1/16, so the question had two correct
   //   answers. The schema validator cannot catch that - it compares option
   //   STRINGS, not their values - so it is the author's job, and it is the
   //   reason this note exists rather than being quietly fixed.
   ['2<sup>&minus;4</sup>', '2<sup>4</sup>', '&minus;2<sup>4</sup>', '2<sup>&minus;2</sup>'],
   '2<sup>&minus;4</sup>',
   'A negative index means one over the positive power.',
   '2<sup>&minus;4</sup> = 1/2<sup>4</sup> = 1/16. 2<sup>4</sup> = 16 and &minus;2<sup>4</sup> = '
   + '&minus;16 both confuse a negative index with a negative answer, and 2<sup>&minus;2</sup> = 1/4 '
   + 'halves the index instead of using it.'],

  // ── Patterns ────────────────────────────────────────────────────────────
  ['g9m-mcq-009', 'g9m-patterns', 'sequences_and_figures', 2,
   'What is the next term of the sequence 1, 4, 9, 16, &hellip;?',
   ['25', '20', '24', '32'], '25',
   'Look at what kind of numbers these are.',
   'They are the square numbers 1&sup2;, 2&sup2;, 3&sup2;, 4&sup2;, so the next is 5&sup2; = 25. '
   + '20 and 24 come from assuming a constant difference; 32 from doubling.'],

  ['g9m-mcq-010', 'g9m-patterns', 'sequences_and_figures', 3,
   'The <i>n</i>th term of a sequence is 2<i>n</i> + 5. What is its <b>4th</b> term?',
   ['13', '11', '28', '14'], '13',
   'Substitute n = 4.',
   '2(4) + 5 = 13. 11 substitutes n = 3; 28 multiplies (2 + 5) by 4; 14 forgets to add the 5 '
   + 'and doubles 7.'],

  ['g9m-mcq-011', 'g9m-patterns', 'sequences_and_figures', 3,
   'In Pascal&rsquo;s triangle, which row comes after 1, 2, 1?',
   ['1, 3, 3, 1', '1, 2, 2, 1', '1, 3, 2, 1', '2, 3, 3, 2'], '1, 3, 3, 1',
   'Each entry is the sum of the two above it.',
   'Adding neighbouring pairs of 1, 2, 1 gives 3 and 3, with a 1 at each end: 1, 3, 3, 1. '
   + 'Every row of Pascal&rsquo;s triangle begins and ends with 1.'],

  // ── Finance ─────────────────────────────────────────────────────────────
  ['g9m-mcq-012', 'g9m-finance', 'salaries_and_bills', 2,
   'A worker earns Rs 500 a day. How much does he earn in 5 days?',
   ['Rs 2 500', 'Rs 505', 'Rs 100', 'Rs 1 000'], 'Rs 2 500',
   'Multiply the daily rate by the number of days.',
   '500 &times; 5 = Rs 2 500. Rs 505 adds instead of multiplying; Rs 100 divides; '
   + 'Rs 1 000 doubles rather than multiplying by five.'],

  ['g9m-mcq-013', 'g9m-finance', 'salaries_and_bills', 3,
   'The simple interest on Rs 10 000 at 5% per annum for 1 year is',
   ['Rs 500', 'Rs 50', 'Rs 5 000', 'Rs 10 500'], 'Rs 500',
   '5% means 5 out of every 100.',
   '5% of 10 000 = 500. Rs 50 divides by 100 twice; Rs 5 000 takes 50%; Rs 10 500 gives the '
   + 'total amount rather than the interest, which is what the question asked for.'],

  ['g9m-mcq-014', 'g9m-finance', 'salaries_and_bills', 3,
   'An item costs Rs 2 000 cash. On hire purchase it costs a deposit of Rs 500 plus 6 payments '
   + 'of Rs 280. How much MORE does hire purchase cost?',
   ['Rs 180', 'Rs 2 180', 'Rs 780', 'Rs 1 680'], 'Rs 180',
   'Work out the hire purchase total first, then compare.',
   'Hire purchase costs 500 + 6 &times; 280 = Rs 2 180, which is Rs 180 more than Rs 2 000. '
   + 'Rs 2 180 is the total rather than the difference; Rs 780 adds the deposit to one payment; '
   + 'Rs 1 680 is the instalments alone.'],

  // ── Trigonometry ────────────────────────────────────────────────────────
  ['g9m-mcq-015', 'g9m-trigonometry', 'ratios_and_2d_problems', 2,
   'In a right-angled triangle, cos <i>&theta;</i> is equal to',
   ['adjacent &divide; hypotenuse', 'opposite &divide; hypotenuse',
    'opposite &divide; adjacent', 'hypotenuse &divide; adjacent'],
   'adjacent &divide; hypotenuse',
   'CAH in SOH CAH TOA.',
   'Cosine is adjacent over hypotenuse. Opposite over hypotenuse is sine, opposite over adjacent '
   + 'is tangent, and hypotenuse over adjacent is the cosine upside down.'],

  ['g9m-mcq-016', 'g9m-trigonometry', 'ratios_and_2d_problems', 3,
   'A right-angled triangle has sides 6 cm, 8 cm and 10 cm. What is the sine of the angle '
   + 'opposite the 6 cm side?',
   ['0.6', '0.8', '0.75', '1.25'], '0.6',
   'The hypotenuse is the longest side.',
   'sin = opposite &divide; hypotenuse = 6/10 = 0.6. 0.8 is the cosine (8/10); 0.75 is the '
   + 'tangent (6/8); 1.25 turns the fraction upside down.'],

  ['g9m-mcq-017', 'g9m-trigonometry', 'ratios_and_2d_problems', 3,
   'If tan <i>&theta;</i> = 1, then <i>&theta;</i> equals',
   ['45&deg;', '30&deg;', '60&deg;', '90&deg;'], '45&deg;',
   'Tangent 1 means the two shorter sides are equal.',
   'tan 45&deg; = 1, because opposite and adjacent are equal. tan 30&deg; &asymp; 0.58, '
   + 'tan 60&deg; &asymp; 1.73, and tan 90&deg; is undefined.'],

  // ── Coordinates ─────────────────────────────────────────────────────────
  ['g9m-mcq-018', 'g9m-coordinates', 'gradient', 2,
   'Which one of the following lines has a gradient of <b>zero</b>?',
   ['<i>y</i> = 4', '<i>x</i> = 4', '<i>y</i> = 4<i>x</i>', '<i>y</i> = <i>x</i> + 4'],
   '<i>y</i> = 4',
   'A gradient of zero means the line does not rise at all.',
   'y = 4 is horizontal, so its gradient is 0. x = 4 is vertical and has NO gradient (not zero - '
   + 'the division is by zero). y = 4x has gradient 4 and y = x + 4 has gradient 1.'],

  ['g9m-mcq-019', 'g9m-coordinates', 'equation_of_line', 2,
   'What is the <i>y</i>-intercept of the line <i>y</i> = 2<i>x</i> &minus; 3?',
   ['&minus;3', '3', '2', '&minus;2'], '&minus;3',
   'In y = mx + c, the intercept is c - with its sign.',
   'c = &minus;3, so the line crosses the y-axis at &minus;3. Answering 3 drops the minus sign; '
   + '2 gives the gradient instead of the intercept.'],

  ['g9m-mcq-020', 'g9m-coordinates', 'gradient', 3,
   'A line passes through (0, 0) and (2, 6). Its gradient is',
   ['3', '2', '6', '<sup>1</sup>&frasl;<sub>3</sub>'], '3',
   'Rise over run.',
   'Gradient = 6/2 = 3. Answering 2 or 6 uses only one coordinate; 1/3 puts the run over the rise.'],

  // ── Vectors ─────────────────────────────────────────────────────────────
  ['g9m-mcq-021', 'g9m-vectors', 'column_vectors', 2,
   'The magnitude of the vector with components 3 and 4 is',
   ['5', '7', '12', '25'], '5',
   'Use Pythagoras, not addition.',
   '&radic;(3&sup2; + 4&sup2;) = &radic;25 = 5. 7 adds the components; 12 multiplies them; '
   + '25 forgets to take the square root.'],

  ['g9m-mcq-022', 'g9m-vectors', 'translation', 2,
   'A translation moves a point 3 units left and 2 units up. As a column vector this is',
   ['(&minus;3, 2)', '(3, 2)', '(3, &minus;2)', '(2, &minus;3)'], '(&minus;3, 2)',
   'Left is negative across; up is positive.',
   'Left is a negative x component and up is a positive y component, giving (&minus;3, 2). '
   + '(3, 2) misses the direction; (3, &minus;2) reverses both; (2, &minus;3) also swaps the order.'],

  // ── Surface area ────────────────────────────────────────────────────────
  ['g9m-mcq-023', 'g9m-surface-area', 'nets_and_surface_area', 2,
   'The surface area of a cube of side 3 cm is',
   ['54 cm&sup2;', '27 cm&sup2;', '9 cm&sup2;', '36 cm&sup2;'], '54 cm&sup2;',
   'A cube has six identical square faces.',
   'One face is 3 &times; 3 = 9 cm&sup2;, and 6 &times; 9 = 54 cm&sup2;. 27 cm&sup2; is the VOLUME; '
   + '9 cm&sup2; is one face only; 36 cm&sup2; uses four faces instead of six.'],

  ['g9m-mcq-024', 'g9m-surface-area', 'nets_and_surface_area', 2,
   'The net of a cylinder is made of',
   ['two circles and a rectangle', 'two rectangles and a circle',
    'three circles', 'two triangles and a rectangle'],
   'two circles and a rectangle',
   'Think about unrolling a tin can.',
   'The two ends are circles and the curved surface unrolls into a rectangle.'],

  ['g9m-mcq-025', 'g9m-surface-area', 'nets_and_surface_area', 3,
   'The circumference of a circle of radius 7 cm, using &pi; = <sup>22</sup>&frasl;<sub>7</sub>, is',
   ['44 cm', '154 cm', '22 cm', '88 cm'], '44 cm',
   'Circumference is 2&pi;r, not &pi;r&sup2;.',
   '2 &times; (22/7) &times; 7 = 44 cm. 154 cm is the AREA; 22 cm forgets the 2; 88 cm uses the '
   + 'diameter as the radius.'],

  // ── Volume ──────────────────────────────────────────────────────────────
  ['g9m-mcq-026', 'g9m-volume', 'prisms_and_cylinders', 1,
   'The volume of a cuboid measuring 4 cm by 3 cm by 2 cm is',
   ['24 cm&sup3;', '9 cm&sup3;', '52 cm&sup3;', '12 cm&sup3;'], '24 cm&sup3;',
   'Multiply all three dimensions.',
   '4 &times; 3 &times; 2 = 24 cm&sup3;. 9 cm&sup3; adds them; 52 cm&sup3; is the surface area; '
   + '12 cm&sup3; uses only two of the three dimensions.'],

  ['g9m-mcq-027', 'g9m-volume', 'prisms_and_cylinders', 2,
   'The volume of a cylinder is given by',
   ['&pi;<i>r</i><sup>2</sup><i>h</i>', '2&pi;<i>rh</i>', '&pi;<i>r</i><sup>2</sup>', '2&pi;<i>r</i>'],
   '&pi;<i>r</i><sup>2</sup><i>h</i>',
   'Volume is the area of the circular end times the height.',
   'The end has area &pi;r&sup2;, and multiplying by the height h gives &pi;r&sup2;h. '
   + '2&pi;rh is the curved surface area, &pi;r&sup2; is the area of one end, and 2&pi;r is the '
   + 'circumference.'],

  ['g9m-mcq-028', 'g9m-volume', 'prisms_and_cylinders', 3,
   'A cube has a volume of 64 cm&sup3;. The length of one edge is',
   ['4 cm', '8 cm', '16 cm', '32 cm'], '4 cm',
   'Which number cubed gives 64?',
   '4 &times; 4 &times; 4 = 64, so each edge is 4 cm. 8 cm takes the square root instead of the '
   + 'cube root; 16 cm and 32 cm divide by 4 and by 2.'],

  // ── Capacity ────────────────────────────────────────────────────────────
  ['g9m-mcq-029', 'g9m-capacity', 'units_and_problems', 1,
   'How many millilitres are there in 2 litres?',
   ['2 000 mL', '200 mL', '20 mL', '20 000 mL'], '2 000 mL',
   'One litre is 1 000 millilitres.',
   '2 &times; 1 000 = 2 000 mL. 200 mL uses centilitres by mistake; the others move the decimal '
   + 'point the wrong way.'],

  ['g9m-mcq-030', 'g9m-capacity', 'units_and_problems', 2,
   'A container of volume 1 000 cm&sup3; has a capacity of',
   ['1 litre', '10 litres', '100 litres', '0.1 litre'], '1 litre',
   '1 cm&sup3; of space holds 1 mL.',
   '1 000 cm&sup3; holds 1 000 mL, which is 1 litre. The others shift the conversion by powers '
   + 'of ten.'],

  ['g9m-mcq-031', 'g9m-capacity', 'units_and_problems', 2,
   'Which of these is the same as 0.75 L?',
   ['75 cL', '7.5 cL', '750 cL', '0.75 cL'], '75 cL',
   'One litre is 100 centilitres.',
   '0.75 &times; 100 = 75 cL. 750 would be the millilitres; the others move the point wrongly.'],

  // ── Expressions ─────────────────────────────────────────────────────────
  ['g9m-mcq-032', 'g9m-expressions', 'binomials_and_factorising', 2,
   'Expand 3(<i>x</i> &minus; 4).',
   ['3<i>x</i> &minus; 12', '3<i>x</i> &minus; 4', '3<i>x</i> + 12', '<i>x</i> &minus; 12'],
   '3<i>x</i> &minus; 12',
   'The 3 multiplies BOTH terms in the bracket.',
   '3 &times; x = 3x and 3 &times; (&minus;4) = &minus;12. "3x &minus; 4" forgets to multiply the '
   + 'second term, which is the most common slip here.'],

  ['g9m-mcq-033', 'g9m-expressions', 'binomials_and_factorising', 3,
   'Factorise <i>x</i><sup>2</sup> &minus; 49.',
   ['(<i>x</i> + 7)(<i>x</i> &minus; 7)', '(<i>x</i> &minus; 7)<sup>2</sup>',
    '(<i>x</i> + 7)<sup>2</sup>', '<i>x</i>(<i>x</i> &minus; 49)'],
   '(<i>x</i> + 7)(<i>x</i> &minus; 7)',
   'Two squares with a minus between them.',
   'This is the difference of two squares: x&sup2; &minus; 7&sup2; = (x + 7)(x &minus; 7). '
   + '(x &minus; 7)&sup2; expands to x&sup2; &minus; 14x + 49, which is not the same.'],

  ['g9m-mcq-034', 'g9m-expressions', 'binomials_and_factorising', 3,
   'Expand (<i>x</i> + 2)<sup>2</sup>.',
   ['<i>x</i><sup>2</sup> + 4<i>x</i> + 4', '<i>x</i><sup>2</sup> + 4',
    '<i>x</i><sup>2</sup> + 2<i>x</i> + 4', '<i>x</i><sup>2</sup> + 4<i>x</i> + 2'],
   '<i>x</i><sup>2</sup> + 4<i>x</i> + 4',
   'A square is the bracket multiplied by itself - there is a middle term.',
   '(x + 2)(x + 2) = x&sup2; + 2x + 2x + 4 = x&sup2; + 4x + 4. "x&sup2; + 4" squares each term '
   + 'separately and loses the middle term entirely, which is the classic error.'],

  // ── Matrices ────────────────────────────────────────────────────────────
  ['g9m-mcq-035', 'g9m-matrices', 'order_types_operations', 2,
   'A matrix has 3 rows and 5 columns. Its order is',
   ['3 &times; 5', '5 &times; 3', '15', '8'], '3 &times; 5',
   'Rows are always given first.',
   'The order is written rows &times; columns, so 3 &times; 5. Writing 5 &times; 3 reverses them; '
   + '15 gives the number of elements; 8 adds the two.'],

  ['g9m-mcq-036', 'g9m-matrices', 'order_types_operations', 2,
   'Two matrices can be ADDED only when they have',
   ['the same order', 'the same number of rows only',
    'the same number of columns only', 'the same first element'],
   'the same order',
   'Addition works element by element, position for position.',
   'Every element must have a partner in the same position, so both the rows and the columns '
   + 'must match - that is, the same order.'],

  ['g9m-mcq-037', 'g9m-matrices', 'order_types_operations', 3,
   'How many elements are there in a matrix of order 4 &times; 3?',
   ['12', '7', '4', '3'], '12',
   'Multiply the rows by the columns.',
   '4 &times; 3 = 12 elements. 7 adds the two numbers instead of multiplying them.'],

  // ── Quadratics ──────────────────────────────────────────────────────────
  ['g9m-mcq-038', 'g9m-quadratics', 'factorise_and_solve', 3,
   'One solution of (<i>x</i> &minus; 3)(<i>x</i> + 5) = 0 is',
   ['<i>x</i> = 3', '<i>x</i> = 5', '<i>x</i> = &minus;3', '<i>x</i> = 15'],
   '<i>x</i> = 3',
   'Set each bracket equal to zero in turn.',
   'x &minus; 3 = 0 gives x = 3, and x + 5 = 0 gives x = &minus;5. The signs inside the brackets '
   + 'reverse when you solve: answering x = &minus;3 or x = 5 is reading the brackets without '
   + 'solving them.'],

  ['g9m-mcq-039', 'g9m-quadratics', 'factorise_and_solve', 2,
   'How many solutions does the equation <i>x</i><sup>2</sup> &minus; 4 = 0 have?',
   ['2', '1', '0', '4'], '2',
   'Factorise it and set each bracket to zero.',
   'x&sup2; &minus; 4 = (x + 2)(x &minus; 2) = 0, giving x = 2 and x = &minus;2 - two '
   + 'solutions. Answering 1 forgets the negative root, which is the usual mistake.'],

  // ── Formulae ────────────────────────────────────────────────────────────
  ['g9m-mcq-040', 'g9m-manipulation', 'formulae_and_subject', 2,
   'Making <i>x</i> the subject of <i>y</i> = <i>x</i> &minus; 7 gives',
   ['<i>x</i> = <i>y</i> + 7', '<i>x</i> = <i>y</i> &minus; 7',
    '<i>x</i> = 7 &minus; <i>y</i>', '<i>x</i> = 7<i>y</i>'],
   '<i>x</i> = <i>y</i> + 7',
   'Do the opposite operation to both sides.',
   'Adding 7 to both sides gives x = y + 7. "x = y &minus; 7" repeats the original rather than '
   + 'undoing it; "7 &minus; y" subtracts the wrong way round.'],

  ['g9m-mcq-041', 'g9m-manipulation', 'formulae_and_subject', 3,
   'If <i>A</i> = <i>lw</i>, then <i>w</i> equals',
   ['<i>A</i> &divide; <i>l</i>', '<i>A</i> &minus; <i>l</i>',
    '<i>Al</i>', '<i>l</i> &divide; <i>A</i>'],
   '<i>A</i> &divide; <i>l</i>',
   'The l is multiplying, so divide by it.',
   'Dividing both sides by l gives w = A/l. Subtracting l undoes the wrong operation; '
   + 'l/A turns the division upside down.'],

  ['g9m-mcq-042', 'g9m-manipulation', 'formulae_and_subject', 2,
   'Find the value of <i>P</i> when <i>l</i> = 5 and <i>w</i> = 2, given <i>P</i> = 2(<i>l</i> + <i>w</i>).',
   ['14', '12', '10', '7'], '14',
   'Work out the bracket before multiplying.',
   'l + w = 7, so P = 2 &times; 7 = 14. Answering 12 multiplies only the l by 2 before adding; '
   + '10 multiplies l and w together; 7 forgets the 2 altogether.'],

  // ── Inequalities ────────────────────────────────────────────────────────
  ['g9m-mcq-043', 'g9m-inequalities', 'solve_and_represent', 3,
   'Solving &minus;2<i>x</i> &gt; 6 gives',
   ['<i>x</i> &lt; &minus;3', '<i>x</i> &gt; &minus;3', '<i>x</i> &gt; 3', '<i>x</i> &lt; 3'],
   '<i>x</i> &lt; &minus;3',
   'Dividing by a negative reverses the inequality sign.',
   'Dividing both sides by &minus;2 turns &gt; into &lt;, giving x &lt; &minus;3. '
   + '"x &gt; &minus;3" is the answer of someone who divided correctly but forgot to turn the '
   + 'sign round - the single most common mistake in this topic.'],

  ['g9m-mcq-044', 'g9m-inequalities', 'solve_and_represent', 2,
   'On a number line, a <b>hollow</b> circle at 5 means',
   ['5 is not included', '5 is included', 'the line stops at 5', '5 is negative'],
   '5 is not included',
   'Filled means included; hollow means excluded.',
   'A hollow circle marks a strict inequality (&lt; or &gt;), so 5 itself is not part of the '
   + 'solution. A filled circle would mean &le; or &ge;.'],

  // ── Simultaneous equations ──────────────────────────────────────────────
  ['g9m-mcq-045', 'g9m-simultaneous', 'solve_simultaneous', 3,
   'If <i>x</i> + <i>y</i> = 10 and <i>x</i> &minus; <i>y</i> = 2, then <i>x</i> equals',
   ['6', '4', '5', '8'], '6',
   'Adding the two equations removes y.',
   'Adding gives 2x = 12, so x = 6 (and y = 4). Answering 4 gives y rather than x; '
   + '5 halves the 10 without using the second equation.'],

  ['g9m-mcq-046', 'g9m-simultaneous', 'solve_simultaneous', 2,
   'To eliminate <i>y</i> from 3<i>x</i> + <i>y</i> = 9 and 2<i>x</i> &minus; <i>y</i> = 1, you should',
   ['add the two equations', 'subtract the two equations',
    'multiply the first by 2', 'divide the second by 2'],
   'add the two equations',
   'Look at the signs in front of the y terms.',
   'The y terms are +y and &minus;y, so adding cancels them. Subtracting would give 2y, which '
   + 'keeps y in the equation.'],

  // ── Statistics ──────────────────────────────────────────────────────────
  ['g9m-mcq-047', 'g9m-statistics', 'frequency_and_averages', 1,
   'The <b>mode</b> of 4, 5, 5, 6, 9 is',
   ['5', '6', '5.8', '9'], '5',
   'The mode is the most frequent value.',
   '5 appears twice and everything else once, so the mode is 5. 6 is the median, 5.8 is the '
   + 'mean, and 9 is the largest value.'],

  ['g9m-mcq-048', 'g9m-statistics', 'frequency_and_averages', 2,
   'The <b>median</b> of 3, 8, 5, 1, 9 is',
   ['5', '8', '3', '5.2'], '5',
   'Put the numbers in order first.',
   'In order: 1, 3, 5, 8, 9. The middle value is 5. Answering 5 without ordering would be luck; '
   + 'answering 8 takes the middle of the list as written; 5.2 is the mean.'],

  ['g9m-mcq-049', 'g9m-statistics', 'frequency_and_averages', 2,
   'The <b>range</b> of 7, 2, 9, 4 is',
   ['7', '5', '11', '5.5'], '7',
   'Largest take away smallest.',
   '9 &minus; 2 = 7. Answering 5 subtracts the wrong pair; 11 adds them; 5.5 is the mean.'],

  // ── Probability ─────────────────────────────────────────────────────────
  ['g9m-mcq-050', 'g9m-probability', 'simple_and_combined_events', 1,
   'The probability of an event that is <b>certain</b> is',
   ['1', '0', '100', '<sup>1</sup>&frasl;<sub>2</sub>'], '1',
   'Probability runs from 0 to 1.',
   'A certain event has probability 1. 0 is impossible; 100 confuses a probability with a '
   + 'percentage; 1/2 is an even chance.'],

  ['g9m-mcq-051', 'g9m-probability', 'simple_and_combined_events', 2,
   'A fair die is thrown once. The probability of getting a number greater than 4 is',
   ['<sup>1</sup>&frasl;<sub>3</sub>', '<sup>1</sup>&frasl;<sub>6</sub>',
    '<sup>2</sup>&frasl;<sub>3</sub>', '<sup>1</sup>&frasl;<sub>2</sub>'],
   '<sup>1</sup>&frasl;<sub>3</sub>',
   'Which faces are greater than 4?',
   'The faces 5 and 6 are greater than 4, so the probability is 2/6 = 1/3. 1/6 counts only one '
   + 'face; 1/2 counts 4, 5 and 6, but 4 is not greater than 4.'],

  ['g9m-mcq-052', 'g9m-probability', 'simple_and_combined_events', 3,
   'The probability that it rains is <sup>1</sup>&frasl;<sub>4</sub>. The probability that it '
   + 'does <b>not</b> rain is',
   ['<sup>3</sup>&frasl;<sub>4</sub>', '<sup>1</sup>&frasl;<sub>4</sub>',
    '<sup>1</sup>&frasl;<sub>2</sub>', '&minus;<sup>1</sup>&frasl;<sub>4</sub>'],
   '<sup>3</sup>&frasl;<sub>4</sub>',
   'The two probabilities must add up to 1.',
   '1 &minus; 1/4 = 3/4. A probability is never negative, so &minus;1/4 cannot be right.'],
];

ITEMS.forEach(([id, chapterId, subsection, difficulty, prompt, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId, subsection, difficulty,
    source: 'NCF Grades 7-9 §3.9; NCE 2025 Q11 / 2024 Q12 consolidated MCQ-block pattern.',
    parts: [{ label: 'a', prompt, marks: 1, hint, explanation,
              response: { kind: 'choice', variant: 'options', options, answer } }],
  }));
});

})();
