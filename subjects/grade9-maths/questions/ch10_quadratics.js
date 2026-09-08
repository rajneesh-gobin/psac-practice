'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - Quadratics
//
//  Syllabus: NCF Grades 7-9, §3.9 "Algebra: Quadratics" (PDF p.51,
//  printed 45): identify a quadratic expression and a quadratic equation;
//  factorise ax² + bx + c; solve quadratic equations by factorisation where
//  a = 1, including those involving algebraic fractions; formulate and solve
//  problems leading to quadratic equations.
//
//  Paper style: NCE 2024 Q15(b) "Solve x² − 5x + 6 = 0" with the answer line
//  printed as "x = ......... or x = .........", and NCE 2025 Q22(b)
//  "Solve p² − 10p + 10 = −14" [3], which has to be rearranged first.
//
//  ⚠ A quadratic has TWO answers and the paper prints TWO blanks. Those items
//    use `kind: 'blanks'` so both roots are marked, and `partial: false`
//    because the paper awards the marks for the pair, not one root at a time.
//    The roots are accepted in either order.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9m-quadratics';

// ⚠ Two roots, either order. `blanks` is ordered, so the accepted list on each
//   blank carries both roots - a candidate writing "3 or 2" has not made a
//   mistake, and the papers never say which root to write first.
const roots = (a, b) => ({
  kind: 'blanks', partial: false,
  answer: [[String(a), String(b)], [String(b), String(a)]],
});

// [ id, difficulty, marks, prompt, response, hint, explanation ]
const ITEMS = [
  ['g9m-qdr-001', 2, 2, 'Factorise <i>x</i><sup>2</sup> + 5<i>x</i> + 6.',
   { kind: 'expression', answer: '(x+2)(x+3)', accept: ['(x+3)(x+2)'] },
   'Find two numbers that multiply to 6 and add to 5.',
   '2 &times; 3 = 6 and 2 + 3 = 5, so x&sup2; + 5x + 6 = (x + 2)(x + 3).'],

  ['g9m-qdr-002', 2, 2, 'Factorise <i>x</i><sup>2</sup> &minus; 5<i>x</i> + 6.',
   { kind: 'expression', answer: '(x-2)(x-3)', accept: ['(x-3)(x-2)'] },
   'The two numbers multiply to +6 and add to &minus;5, so both are negative.',
   '(&minus;2) &times; (&minus;3) = 6 and (&minus;2) + (&minus;3) = &minus;5, so the factors are (x &minus; 2)(x &minus; 3).'],

  ['g9m-qdr-003', 3, 2, 'Solve <i>x</i><sup>2</sup> &minus; 5<i>x</i> + 6 = 0.',
   roots(2, 3), 'Factorise first, then set each bracket to zero.',
   '(x &minus; 2)(x &minus; 3) = 0, so x &minus; 2 = 0 or x &minus; 3 = 0, giving x = 2 or x = 3.'],

  ['g9m-qdr-004', 3, 2, 'Solve <i>x</i><sup>2</sup> + 7<i>x</i> + 12 = 0.',
   roots(-3, -4), 'Two numbers multiplying to 12 and adding to 7.',
   '(x + 3)(x + 4) = 0, so x = &minus;3 or x = &minus;4.'],

  ['g9m-qdr-005', 3, 2, 'Factorise <i>x</i><sup>2</sup> + 2<i>x</i> &minus; 8.',
   { kind: 'expression', answer: '(x+4)(x-2)', accept: ['(x-2)(x+4)'] },
   'The numbers multiply to &minus;8 and add to +2, so one is negative.',
   '4 &times; (&minus;2) = &minus;8 and 4 + (&minus;2) = 2, so the factors are (x + 4)(x &minus; 2).'],

  ['g9m-qdr-006', 2, 2, 'Solve <i>x</i><sup>2</sup> &minus; 9 = 0.',
   roots(3, -3), 'This is a difference of two squares.',
   'x&sup2; &minus; 9 = (x + 3)(x &minus; 3) = 0, so x = 3 or x = &minus;3.'],

  ['g9m-qdr-007', 4, 3, 'Solve <i>p</i><sup>2</sup> &minus; 10<i>p</i> + 10 = &minus;14.',
   roots(4, 6), 'Move everything to one side so the equation equals zero first.',
   'Adding 14 to both sides: p&sup2; &minus; 10p + 24 = 0. '
   + 'Two numbers multiplying to 24 and adding to &minus;10 are &minus;4 and &minus;6, '
   + 'so (p &minus; 4)(p &minus; 6) = 0 and p = 4 or p = 6.'],

  ['g9m-qdr-008', 3, 2, 'Factorise <i>x</i><sup>2</sup> &minus; 3<i>x</i> &minus; 10.',
   { kind: 'expression', answer: '(x-5)(x+2)', accept: ['(x+2)(x-5)'] },
   'Multiply to &minus;10, add to &minus;3.',
   '(&minus;5) &times; 2 = &minus;10 and (&minus;5) + 2 = &minus;3, so the factors are (x &minus; 5)(x + 2).'],

  ['g9m-qdr-009', 3, 2, 'Solve <i>x</i><sup>2</sup> + 6<i>x</i> = 0.',
   roots(0, -6), 'Take out the common factor of x.',
   'x(x + 6) = 0, so x = 0 or x + 6 = 0, giving x = 0 or x = &minus;6. '
   + 'Dividing both sides by x would lose the root x = 0.'],

  ['g9m-qdr-010', 1, 1, 'Which of these is a <b>quadratic</b> expression?',
   { kind: 'choice', variant: 'options',
     options: ['<i>x</i><sup>2</sup> + 3<i>x</i> &minus; 1', '3<i>x</i> &minus; 1',
               '<i>x</i><sup>3</sup> + 2', '<sup>1</sup>&frasl;<sub><i>x</i></sub>'],
     answer: '<i>x</i><sup>2</sup> + 3<i>x</i> &minus; 1' },
   'A quadratic has a highest power of 2.',
   'A quadratic expression has x&sup2; as its highest power. 3x &minus; 1 is linear, '
   + 'x&sup3; + 2 is cubic, and 1/x is not a polynomial at all.'],

  ['g9m-qdr-011', 3, 2, 'Solve <i>x</i><sup>2</sup> &minus; 7<i>x</i> + 10 = 0.',
   roots(2, 5), 'Multiply to 10, add to &minus;7.',
   '(x &minus; 2)(x &minus; 5) = 0, so x = 2 or x = 5.'],

  ['g9m-qdr-012', 3, 2, 'Solve <i>x</i><sup>2</sup> &minus; 16 = 0.',
   roots(4, -4), 'Difference of two squares.',
   '(x + 4)(x &minus; 4) = 0, so x = 4 or x = &minus;4.'],

  ['g9m-qdr-013', 3, 2, 'Factorise <i>x</i><sup>2</sup> + 8<i>x</i> + 15.',
   { kind: 'expression', answer: '(x+3)(x+5)', accept: ['(x+5)(x+3)'] },
   'Multiply to 15, add to 8.',
   '3 &times; 5 = 15 and 3 + 5 = 8, so the factors are (x + 3)(x + 5).'],

  ['g9m-qdr-014', 4, 3, 'Solve <i>x</i><sup>2</sup> + 2<i>x</i> &minus; 15 = 0.',
   roots(3, -5), 'Multiply to &minus;15, add to +2.',
   '(x + 5)(x &minus; 3) = 0, so x = &minus;5 or x = 3.'],

  ['g9m-qdr-015', 2, 1, 'Which of these is a <b>quadratic equation</b>?',
   { kind: 'choice', variant: 'options',
     options: ['<i>x</i><sup>2</sup> &minus; 4 = 0', '2<i>x</i> + 5 = 0',
               '<i>x</i><sup>3</sup> = 8', '<i>x</i> + <i>y</i> = 7'],
     answer: '<i>x</i><sup>2</sup> &minus; 4 = 0' },
   'An equation has an equals sign, and a quadratic has x&sup2; as its highest power.',
   'x&sup2; &minus; 4 = 0 is an equation whose highest power is 2. The others are '
   + 'linear, cubic, and a linear equation in two unknowns.'],

  ['g9m-qdr-016', 4, 3, 'Solve <i>x</i><sup>2</sup> = 5<i>x</i>.',
   roots(0, 5), 'Bring everything to one side; do not divide by x.',
   'x&sup2; &minus; 5x = 0, so x(x &minus; 5) = 0 and x = 0 or x = 5. '
   + 'Dividing both sides by x at the start would lose the root x = 0.'],

  ['g9m-qdr-017', 3, 2, 'Solve <i>x</i><sup>2</sup> &minus; 11<i>x</i> + 24 = 0.',
   roots(3, 8), 'Multiply to 24, add to &minus;11.',
   '(x &minus; 3)(x &minus; 8) = 0, so x = 3 or x = 8.'],

  ['g9m-qdr-018', 3, 2, 'Factorise <i>x</i><sup>2</sup> &minus; 6<i>x</i> + 9.',
   { kind: 'expression', answer: '(x-3)(x-3)', accept: ['(x-3)^2'] },
   'Both numbers are the same here, which makes it a perfect square.',
   '(&minus;3) &times; (&minus;3) = 9 and (&minus;3) + (&minus;3) = &minus;6, '
   + 'so the expression is (x &minus; 3)(x &minus; 3), or (x &minus; 3)&sup2;.'],

  ['g9m-qdr-019', 4, 4, 'The length of a rectangle is 3 cm more than its width. Its area is 40 cm&sup2;. '
   + 'Find the <b>width</b> of the rectangle.',
   { kind: 'number', answer: '5', unit: 'cm' },
   'Call the width x, write the area as an equation, then solve it.',
   'Let the width be x cm, so the length is (x + 3) cm and x(x + 3) = 40. '
   + 'This gives x&sup2; + 3x &minus; 40 = 0, so (x + 8)(x &minus; 5) = 0 and x = &minus;8 or x = 5. '
   + 'A width cannot be negative, so the width is 5 cm.'],

  ['g9m-qdr-020', 4, 4, 'The length of each side of a square is increased by 8 cm. The area of the '
   + '<b>new</b> square is 6 times its <b>perimeter</b>. Find the length of one side of the '
   + '<b>original</b> square.',
   { kind: 'number', answer: '16', unit: 'cm' },
   'Let the original side be x. Write the new area and the new perimeter in terms of x.',
   'Let the original side be x cm, so the new side is (x + 8) cm. '
   + 'The new area is (x + 8)&sup2; and the new perimeter is 4(x + 8). '
   + 'So (x + 8)&sup2; = 6 &times; 4(x + 8) = 24(x + 8). Dividing both sides by (x + 8), '
   + 'which cannot be zero, gives x + 8 = 24, so x = 16 cm.'],
];

ITEMS.forEach(([id, difficulty, marks, prompt, response, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection: 'factorise_and_solve', difficulty,
    source: 'NCF Grades 7-9 §3.9 Algebra: Quadratics; NCE 2024 Q15(b) and 2025 Q22(b) pattern.',
    parts: [{ label: 'a', prompt, marks, hint, explanation, response }],
  }));
});

})();
