'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - Algebraic Expressions
//
//  Syllabus: NCF Grades 7-9, §3.9 "Algebra: Expressions" (PDF p.51,
//  printed 45): identify a binomial expression; use area tables and the
//  distributive law to find the product of binomials; expand and use perfect
//  squares; factorise the difference of two squares and use it to factorise
//  binomials; work with algebraic fractions.
//
//  ⚠ The syllabus gives its own worked examples and both are here as items,
//    because they show what the examiner means: 101² = (100 + 1)² and
//    101² − 99² = (101 + 99)(101 − 99). These are arithmetic shortcuts, not
//    algebra for its own sake, and a calculator-free paper is exactly where
//    they earn their place.
//
//  Paper style: NCE 2025 Q9 ("Expand 4(x + 2)" [1], "Factorise 6x − 15" [1])
//  and Q24 (a labelled rectangle, expressions for a length and an area).
//
//  ⚠ Powers are typed with a caret: x^2, not x2. Answers accept the reordered
//    form, because normaliseExpression() sorts the terms of a sum - "x^2+5x+6"
//    and "6+5x+x^2" are the same answer.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9m-expressions';

// [ id, difficulty, marks, prompt, answer, accept[], hint, explanation ]
const ITEMS = [
  ['g9m-exp-001', 1, 1, 'Expand 4(<i>x</i> + 2).',
   '4x+8', [], 'Multiply the 4 by each term inside the bracket.',
   '4 &times; x = 4x and 4 &times; 2 = 8, so the answer is 4x + 8.'],

  ['g9m-exp-002', 1, 1, 'Factorise 6<i>x</i> &minus; 15.',
   '3(2x-5)', [], 'What is the highest number that divides both 6 and 15?',
   'The highest common factor of 6 and 15 is 3, so 6x &minus; 15 = 3(2x &minus; 5).'],

  ['g9m-exp-003', 2, 2, 'Expand (<i>x</i> + 3)(<i>x</i> + 2).',
   'x^2+5x+6', [], 'Multiply every term in the first bracket by every term in the second.',
   'x&times;x = x&sup2;, x&times;2 = 2x, 3&times;x = 3x and 3&times;2 = 6. Collecting: x&sup2; + 5x + 6.'],

  ['g9m-exp-004', 3, 2, 'Expand (<i>x</i> + 5)(<i>x</i> &minus; 2).',
   'x^2+3x-10', [], 'Take care with the minus sign in the second bracket.',
   'x&sup2; &minus; 2x + 5x &minus; 10 = x&sup2; + 3x &minus; 10.'],

  ['g9m-exp-005', 2, 2, 'Expand (<i>x</i> + 4)<sup>2</sup>.',
   'x^2+8x+16', [], 'A square means the bracket multiplied by itself.',
   '(x + 4)&sup2; = (x + 4)(x + 4) = x&sup2; + 4x + 4x + 16 = x&sup2; + 8x + 16.'],

  ['g9m-exp-006', 3, 2, 'Expand (<i>x</i> &minus; 3)<sup>2</sup>.',
   'x^2-6x+9', [], 'The middle term is negative; the last term is positive.',
   '(x &minus; 3)&sup2; = x&sup2; &minus; 3x &minus; 3x + 9 = x&sup2; &minus; 6x + 9. '
   + 'Note the last term is +9, because a negative times a negative is positive.'],

  ['g9m-exp-007', 2, 2, 'Factorise <i>x</i><sup>2</sup> &minus; 9.',
   '(x+3)(x-3)', ['(x-3)(x+3)'], 'This is a difference of two squares.',
   'x&sup2; &minus; 9 = x&sup2; &minus; 3&sup2; = (x + 3)(x &minus; 3).'],

  ['g9m-exp-008', 2, 2, 'Factorise <i>x</i><sup>2</sup> &minus; 25.',
   '(x+5)(x-5)', ['(x-5)(x+5)'], 'Both terms are perfect squares with a minus between them.',
   'x&sup2; &minus; 25 = x&sup2; &minus; 5&sup2; = (x + 5)(x &minus; 5).'],

  ['g9m-exp-009', 4, 3, 'Factorise 2<i>y</i><sup>2</sup> &minus; 50 <b>completely</b>.',
   '2(y+5)(y-5)', ['2(y-5)(y+5)'], 'Take out the common factor first, then look again.',
   '2y&sup2; &minus; 50 = 2(y&sup2; &minus; 25) = 2(y + 5)(y &minus; 5).'],

  ['g9m-exp-010', 3, 2, 'Use the difference of two squares to evaluate 101<sup>2</sup> &minus; 99<sup>2</sup>.',
   '400', [], 'Write it as (a + b)(a &minus; b) rather than squaring anything.',
   '101&sup2; &minus; 99&sup2; = (101 + 99)(101 &minus; 99) = 200 &times; 2 = 400.'],

  ['g9m-exp-011', 3, 2, 'Use perfect squares to evaluate 101<sup>2</sup>.',
   '10201', [], 'Write 101 as 100 + 1 and expand.',
   '101&sup2; = (100 + 1)&sup2; = 100&sup2; + 2(100)(1) + 1&sup2; = 10 000 + 200 + 1 = 10 201.'],

  ['g9m-exp-012', 1, 1, 'Factorise 3<i>x</i> &minus; 6.',
   '3(x-2)', [], 'Both terms share a factor of 3.',
   '3x &minus; 6 = 3(x &minus; 2).'],

  ['g9m-exp-013', 2, 1, 'Simplify <sup>6<i>x</i></sup>&frasl;<sub>3</sub>.',
   '2x', [], 'Divide the number on the top by the number on the bottom.',
   '6x &divide; 3 = 2x.'],

  ['g9m-exp-014', 3, 2, 'Simplify <sup>(2<i>x</i> + 4)</sup>&frasl;<sub>2</sub>.',
   'x+2', [], 'Every term on the top must be divided by 2, not just the first.',
   '(2x + 4) &divide; 2 = 2x/2 + 4/2 = x + 2.'],

  ['g9m-exp-015', 4, 3, 'Expand (2<i>x</i> + 1)(<i>x</i> + 3).',
   '2x^2+7x+3', [], 'Multiply all four pairs, then collect the x terms.',
   '2x&times;x = 2x&sup2;, 2x&times;3 = 6x, 1&times;x = x and 1&times;3 = 3. Collecting: 2x&sup2; + 7x + 3.'],

  ['g9m-exp-016', 3, 2, 'Expand (<i>x</i> &minus; 1)(<i>x</i> &minus; 4).',
   'x^2-5x+4', [], 'Two negatives multiply to give a positive.',
   'x&sup2; &minus; 4x &minus; x + 4 = x&sup2; &minus; 5x + 4.'],

  ['g9m-exp-017', 2, 1, 'Factorise 4<i>a</i> + 8<i>b</i>.',
   '4(a+2b)', [], 'The highest common factor of 4 and 8 is 4.',
   '4a + 8b = 4(a + 2b).'],

  ['g9m-exp-018', 1, 1, 'Simplify 7<i>x</i><sup>2</sup> + 2<i>x</i><sup>2</sup>.',
   '9x^2', [], 'These are like terms, so add the numbers in front.',
   '7x&sup2; + 2x&sup2; = 9x&sup2;.'],

  ['g9m-exp-019', 2, 2, 'Factorise <i>x</i><sup>2</sup> &minus; 100.',
   '(x+10)(x-10)', ['(x-10)(x+10)'], 'Difference of two squares again.',
   'x&sup2; &minus; 100 = x&sup2; &minus; 10&sup2; = (x + 10)(x &minus; 10).'],

  ['g9m-exp-020', 4, 3, 'Expand (3<i>x</i> &minus; 2)(<i>x</i> + 5).',
   '3x^2+13x-10', [], 'Watch the signs on the two middle terms.',
   '3x&times;x = 3x&sup2;, 3x&times;5 = 15x, &minus;2&times;x = &minus;2x and &minus;2&times;5 = &minus;10. '
   + 'Collecting: 3x&sup2; + 13x &minus; 10.'],
];

ITEMS.forEach(([id, difficulty, marks, prompt, answer, accept, hint, explanation]) => {
  const isNumeric = /^-?[\d.\/]+$/.test(answer);
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection: 'binomials_and_factorising', difficulty,
    source: 'NCF Grades 7-9 §3.9 Algebra: Expressions; NCE 2025 Q9 and Q24 pattern.',
    parts: [{ label: 'a', prompt, marks, hint, explanation,
              response: { kind: isNumeric ? 'number' : 'expression', answer, accept } }],
  }));
});

// ── The labelled-rectangle question, NCE 2025 Q24 ────────────────────────
// A figure whose sides are algebraic, then expressions for a length and an
// area. This is where "in terms of x" and "in its simplest form" come from.
// ⚠ EVERY LABEL GOES THROUGH svgSafe. <i> and <b> are HTML breakout tags:
//   inside an <svg> the parser leaves foreign content on them, which ENDS the
//   svg element and reparses the rest as sibling HTML. This figure - the one
//   modelled on NCE 2025 Q24 - was drawing as a bare rectangle with its three
//   expressions printed loose beside it, and nothing failed: the item loaded,
//   marked and tested correctly. It showed up only on a rendered page.
const svgSafe = t => String(t)
  .replace(/<i>/g, '<tspan font-style="italic">').replace(/<\/i>/g, '</tspan>')
  .replace(/<b>/g, '<tspan font-weight="bold">').replace(/<\/b>/g, '</tspan>');
function labelledRectangle(top, right, bottom, markP) {
  const x0 = 46, y0 = 30, w = 210, h = 96;
  top = svgSafe(top); right = svgSafe(right); bottom = svgSafe(bottom);
  let g = `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="none" stroke="#000" stroke-width="1.6"/>`;
  g += `<text x="${x0 - 6}" y="${y0 - 8}" font-size="12" font-weight="bold" text-anchor="middle">A</text>`;
  g += `<text x="${x0 + w + 6}" y="${y0 - 8}" font-size="12" font-weight="bold" text-anchor="middle">B</text>`;
  g += `<text x="${x0 + w + 6}" y="${y0 + h + 16}" font-size="12" font-weight="bold" text-anchor="middle">C</text>`;
  g += `<text x="${x0 - 6}" y="${y0 + h + 16}" font-size="12" font-weight="bold" text-anchor="middle">D</text>`;
  if (markP) {
    const px = x0 + 96;
    g += `<line x1="${px}" y1="${y0 - 5}" x2="${px}" y2="${y0 + 5}" stroke="#000" stroke-width="1.4"/>`;
    g += `<text x="${px}" y="${y0 - 10}" font-size="12" font-weight="bold" text-anchor="middle">P</text>`;
    g += `<text x="${(x0 + px) / 2}" y="${y0 - 10}" font-size="12" text-anchor="middle">${top}</text>`;
  } else {
    g += `<text x="${x0 + w / 2}" y="${y0 - 8}" font-size="12" text-anchor="middle">${top}</text>`;
  }
  g += `<text x="${x0 + w + 12}" y="${y0 + h / 2 + 4}" font-size="12" text-anchor="start">${right}</text>`;
  g += `<text x="${x0 + w / 2}" y="${y0 + h + 18}" font-size="12" text-anchor="middle">${bottom}</text>`;
  return `<svg viewBox="0 0 ${x0 + w + 104} ${y0 + h + 30}" width="${x0 + w + 104}" height="${y0 + h + 30}" xmlns="http://www.w3.org/2000/svg" role="img">${g}</svg>`;
}

STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-exp-021', chapterId: CH, subsection: 'binomials_and_factorising', difficulty: 4,
  source: 'NCF §3.9 Expressions; NCE 2025 Q24 labelled-figure pattern.',
  intro: '<b>ABCD</b> is a rectangle. It is given that <b>DC</b> = (3<i>x</i> + 1) cm and '
       + '<b>BC</b> = (<i>x</i> + 1) cm. <b>P</b> is a point on <b>AB</b>, such that '
       + '<b>AP</b> = (2 &minus; <i>x</i>) cm.',
  stimulus: {
    html: labelledRectangle('(2 &minus; <i>x</i>) cm', '(<i>x</i> + 1) cm', '(3<i>x</i> + 1) cm', true),
    altText: 'A rectangle ABCD with a point P marked on the top side, and the lengths of the top part, the right side and the bottom side each given as an expression.',
  },
  parts: [
    { label: 'a', prompt: 'Giving your answer in its <b>simplest form</b>, find, in terms of <i>x</i>, an expression for <b>PB</b>.',
      marks: 2,
      hint: 'AB is the same length as DC. PB is what is left of AB after AP.',
      explanation: 'AB = DC = (3x + 1) cm. PB = AB &minus; AP = (3x + 1) &minus; (2 &minus; x) '
                 + '= 3x + 1 &minus; 2 + x = 4x &minus; 1 cm.',
      response: { kind: 'expression', answer: '4x-1', unit: 'cm' } },
    { label: 'b', prompt: 'Giving your answer in its <b>simplest form</b>, find, in terms of <i>x</i>, an expression for the <b>area</b> of rectangle <b>ABCD</b>.',
      marks: 2,
      hint: 'Area is length times width; expand the brackets and collect terms.',
      explanation: 'Area = DC &times; BC = (3x + 1)(x + 1) = 3x&sup2; + 3x + x + 1 = 3x&sup2; + 4x + 1 cm&sup2;.',
      response: { kind: 'expression', answer: '3x^2+4x+1', unit: 'cm²' } },
  ],
}));

})();
