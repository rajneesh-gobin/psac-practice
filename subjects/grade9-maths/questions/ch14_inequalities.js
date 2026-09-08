'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - Inequalities
//
//  Syllabus: NCF Grades 7-9, §3.9 "Algebra: Inequalities" (PDF p.52,
//  printed 46): find the solution of inequalities using SET-BUILDER NOTATION.
//
//  ⚠ Set-builder notation is what the syllabus names, and it is the one thing
//    the chapter's earlier prose left out. It is written { x : x > 4 } here,
//    and the accepted forms allow the spacing a child will actually type.
//
//  Paper style: NCE 2025 Q14 - a number line with a filled and a hollow circle,
//  then TICK the correct inequality from four; then "Solve −5x > 20" [2].
//  NCE 2024 Q16 - solve, then DRAW the number line for your answer.
//
//  ⚠ MULTIPLYING OR DIVIDING BY A NEGATIVE REVERSES THE SIGN. That is the one
//    thing this topic exists to teach, and −5x > 20 giving x < −4 is exactly
//    the item the papers set. Several distractors below are the un-reversed
//    answer, because that is the real mistake.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9m-inequalities';

// ── A number line. Original SVG, monochrome. ────────────────────────────
// marks: [{ at, filled }] - filled means the endpoint is included (≤ or ≥).
// span: [from, to] draws the heavy segment between them; open ends get arrows.
function numberLine(min, max, marks, span) {
  const step = 34, pad = 26, y = 44;
  const w = (max - min) * step + pad * 2, h = 76;
  const X = v => pad + (v - min) * step;
  let g = `<defs><marker id="nlA" markerWidth="9" markerHeight="9" refX="7" refY="3.2" orient="auto">`
        + `<path d="M0,0 L7,3.2 L0,6.4 z" fill="#000"/></marker></defs>`;
  g += `<line x1="${pad - 14}" y1="${y}" x2="${w - pad + 14}" y2="${y}" stroke="#000" stroke-width="1.5" marker-end="url(#nlA)"/>`;
  g += `<line x1="${pad - 14}" y1="${y}" x2="${pad - 4}" y2="${y}" stroke="#000" stroke-width="1.5" marker-start="url(#nlA)"/>`;
  for (let v = min; v <= max; v++) {
    g += `<line x1="${X(v)}" y1="${y - 6}" x2="${X(v)}" y2="${y + 6}" stroke="#000" stroke-width="1.2"/>`;
    g += `<text x="${X(v)}" y="${y + 22}" font-size="11" text-anchor="middle">${v}</text>`;
  }
  if (span) g += `<line x1="${X(span[0])}" y1="${y - 14}" x2="${X(span[1])}" y2="${y - 14}" stroke="#000" stroke-width="2.6"/>`;
  (marks || []).forEach(m => {
    g += `<circle cx="${X(m.at)}" cy="${y - 14}" r="5.4" fill="${m.filled ? '#000' : '#fff'}" stroke="#000" stroke-width="1.8"/>`;
  });
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" role="img">${g}</svg>`;
}
const ALT_NL = 'A number line marked with whole numbers, carrying a heavy segment between two circles; a filled circle includes its value and a hollow circle excludes it.';

// Set-builder answers accept the spacings a child will really type.
const sb = (v, op) => ({
  kind: 'expression',
  answer: `{x:x${op}${v}}`,
  accept: [`{x : x ${op} ${v}}`, `{x| x ${op} ${v}}`, `x${op}${v}`, `x ${op} ${v}`],
});

// [ id, difficulty, marks, prompt, response, hint, explanation, svg ]
const ITEMS = [
  ['g9m-ineq-001', 2, 2, 'Solve the inequality <i>x</i> + 3 &gt; 7, giving your answer in <b>set-builder notation</b>.',
   sb(4, '>'), 'Subtract 3 from both sides, as you would with an equation.',
   'x + 3 &gt; 7 gives x &gt; 4, written { x : x &gt; 4 }.', null],

  ['g9m-ineq-002', 2, 2, 'Solve the inequality 2<i>x</i> &lt; 10, giving your answer in <b>set-builder notation</b>.',
   sb(5, '<'), 'Divide both sides by 2, which is positive, so the sign does not change.',
   '2x &lt; 10 gives x &lt; 5, written { x : x &lt; 5 }.', null],

  ['g9m-ineq-003', 3, 2, 'Solve the inequality 5<i>x</i> + 4 &le; 24.',
   sb(4, '<='), 'Subtract 4, then divide by 5.',
   '5x + 4 &le; 24 gives 5x &le; 20, so x &le; 4, written { x : x &le; 4 }.', null],

  ['g9m-ineq-004', 4, 2, 'Solve the inequality &minus;5<i>x</i> &gt; 20.',
   sb(-4, '<'),
   'Dividing by a negative number reverses the inequality sign.',
   'Dividing both sides by &minus;5 reverses the sign: x &lt; &minus;4, written { x : x &lt; &minus;4 }. '
   + 'Answering x &gt; &minus;4 is the common mistake - the sign must turn round.', null],

  ['g9m-ineq-005', 4, 2, 'Solve the inequality &minus;3<i>x</i> &le; 12.',
   sb(-4, '>='), 'Dividing by &minus;3 turns &le; into &ge;.',
   'Dividing by &minus;3 reverses the sign: x &ge; &minus;4, written { x : x &ge; &minus;4 }.', null],

  ['g9m-ineq-006', 3, 2, 'Solve the inequality 4<i>x</i> &minus; 5 &ge; 7.',
   sb(3, '>='), 'Add 5, then divide by 4.',
   '4x &minus; 5 &ge; 7 gives 4x &ge; 12, so x &ge; 3, written { x : x &ge; 3 }.', null],

  ['g9m-ineq-007', 2, 1, 'Solve the inequality <i>x</i> &minus; 6 &lt; &minus;2.',
   sb(4, '<'), 'Add 6 to both sides.',
   'x &minus; 6 &lt; &minus;2 gives x &lt; 4, written { x : x &lt; 4 }.', null],

  ['g9m-ineq-008', 4, 3, 'Solve the inequality 3 &minus; 2<i>x</i> &gt; 9.',
   sb(-3, '<'), 'Move the 3 first, then divide by &minus;2 and turn the sign round.',
   'Subtracting 3: &minus;2x &gt; 6. Dividing by &minus;2 reverses the sign: x &lt; &minus;3, '
   + 'written { x : x &lt; &minus;3 }.', null],

  ['g9m-ineq-009', 3, 2, 'Solve the inequality 5<i>x</i> + 2 &lt; 3<i>x</i> + 10.',
   sb(4, '<'), 'Collect the x terms on one side first.',
   'Subtracting 3x: 2x + 2 &lt; 10. Subtracting 2: 2x &lt; 8, so x &lt; 4, written { x : x &lt; 4 }.', null],

  ['g9m-ineq-010', 3, 2, 'Solve the inequality <sup><i>x</i></sup>&frasl;<sub>3</sub> &ge; 2.',
   sb(6, '>='), 'Multiply both sides by 3.',
   'Multiplying by 3 gives x &ge; 6, written { x : x &ge; 6 }.', null],

  ['g9m-ineq-011', 2, 1, 'Which inequality means &ldquo;<i>x</i> is <b>at least</b> 5&rdquo;?',
   { kind: 'choice', variant: 'options',
     options: ['<i>x</i> &ge; 5', '<i>x</i> &gt; 5', '<i>x</i> &le; 5', '<i>x</i> &lt; 5'],
     answer: '<i>x</i> &ge; 5' },
   '&ldquo;At least&rdquo; means 5 itself is allowed.',
   '&ldquo;At least 5&rdquo; means 5 or more, so x &ge; 5. Using &gt; would wrongly exclude 5 itself.',
   null],

  ['g9m-ineq-012', 2, 1, 'Which inequality means &ldquo;<i>x</i> is <b>less than</b> 8&rdquo;?',
   { kind: 'choice', variant: 'options',
     options: ['<i>x</i> &lt; 8', '<i>x</i> &le; 8', '<i>x</i> &gt; 8', '<i>x</i> &ge; 8'],
     answer: '<i>x</i> &lt; 8' },
   '&ldquo;Less than&rdquo; does not include the number itself.',
   '&ldquo;Less than 8&rdquo; excludes 8, so x &lt; 8.', null],

  ['g9m-ineq-013', 3, 2, 'Write down the <b>smallest integer</b> that satisfies <i>x</i> &gt; 3.7.',
   { kind: 'number', answer: '4' }, 'The answer must be a whole number bigger than 3.7.',
   'The integers greater than 3.7 are 4, 5, 6, &hellip;, so the smallest is 4.', null],

  ['g9m-ineq-014', 3, 2, 'Write down the <b>largest integer</b> that satisfies <i>x</i> &le; 6.2.',
   { kind: 'number', answer: '6' }, 'The answer must be a whole number no bigger than 6.2.',
   'The integers less than or equal to 6.2 are &hellip;, 5, 6, so the largest is 6.', null],

  ['g9m-ineq-015', 4, 3, 'Solve the inequality 2(<i>x</i> &minus; 1) &lt; 3<i>x</i> + 4.',
   sb(-6, '>'), 'Expand the bracket, then collect the x terms; watch the sign at the end.',
   'Expanding: 2x &minus; 2 &lt; 3x + 4. Subtracting 2x: &minus;2 &lt; x + 4. '
   + 'Subtracting 4: &minus;6 &lt; x, which is x &gt; &minus;6, written { x : x &gt; &minus;6 }.', null],

  ['g9m-ineq-016', 3, 2, 'Which inequality is shown on the number line?',
   { kind: 'choice', variant: 'tick',
     options: ['&minus;1 &le; <i>x</i> &le; 3', '&minus;1 &lt; <i>x</i> &le; 3',
               '&minus;1 &le; <i>x</i> &lt; 3', '&minus;1 &lt; <i>x</i> &lt; 3'],
     answer: '&minus;1 &le; <i>x</i> &lt; 3' },
   'A filled circle includes its value; a hollow circle excludes it.',
   'The circle at &minus;1 is filled, so &minus;1 is included and the sign is &le;. '
   + 'The circle at 3 is hollow, so 3 is excluded and the sign is &lt;. '
   + 'The inequality is &minus;1 &le; x &lt; 3.',
   numberLine(-3, 5, [{ at: -1, filled: true }, { at: 3, filled: false }], [-1, 3])],

  ['g9m-ineq-017', 3, 2, 'Write down the inequality represented by the number line below.',
   { kind: 'choice', variant: 'tick',
     options: ['0 &lt; <i>x</i> &lt; 4', '0 &le; <i>x</i> &le; 4',
               '0 &lt; <i>x</i> &le; 4', '0 &le; <i>x</i> &lt; 4'],
     answer: '0 &lt; <i>x</i> &le; 4' },
   'Check each end separately.',
   'The circle at 0 is hollow, so 0 is excluded: 0 &lt; x. The circle at 4 is filled, '
   + 'so 4 is included: x &le; 4. Together, 0 &lt; x &le; 4.',
   numberLine(-2, 6, [{ at: 0, filled: false }, { at: 4, filled: true }], [0, 4])],

  ['g9m-ineq-018', 4, 3, 'Solve the inequality &minus;<sup><i>x</i></sup>&frasl;<sub>2</sub> &ge; 3.',
   sb(-6, '<='), 'Multiplying by &minus;2 reverses the sign.',
   'Multiplying both sides by &minus;2 reverses the sign: x &le; &minus;6, '
   + 'written { x : x &le; &minus;6 }.', null],

  ['g9m-ineq-019', 3, 2, 'How many <b>integers</b> satisfy &minus;2 &lt; <i>x</i> &le; 3?',
   { kind: 'number', answer: '5' }, 'List them, remembering which end is included.',
   '&minus;2 is excluded and 3 is included, so the integers are &minus;1, 0, 1, 2, 3 - five of them.',
   null],

  ['g9m-ineq-020', 3, 2, 'Solve the inequality 7 &minus; <i>x</i> &le; 2.',
   sb(5, '>='), 'Move the x across, or divide by &minus;1 and turn the sign.',
   'Subtracting 7: &minus;x &le; &minus;5. Multiplying by &minus;1 reverses the sign: x &ge; 5, '
   + 'written { x : x &ge; 5 }.', null],
];

ITEMS.forEach(([id, difficulty, marks, prompt, response, hint, explanation, svg]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection: 'solve_and_represent', difficulty,
    source: 'NCF Grades 7-9 §3.9 Algebra: Inequalities (set-builder notation); NCE 2025 Q14 and 2024 Q16 pattern.',
    stimulus: svg ? { html: svg, altText: ALT_NL } : null,
    parts: [{ label: 'a', prompt, marks, hint, explanation, response }],
  }));
});

// ── Solve, then DRAW the number line - NCE 2024 Q16 ─────────────────────
// ⚠ Part (b) cannot be auto-marked. It stays on the printed paper with a
//   rubric and is dropped from the online pool, like every drawing task.
STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-ineq-021', chapterId: CH, subsection: 'solve_and_represent', difficulty: 4,
  source: 'NCF §3.9 Inequalities; NCE 2024 Q16 solve-then-draw pattern.',
  parts: [
    { label: 'a', prompt: 'Solve the inequality 2<i>x</i> + 3 &le; 11.', marks: 2,
      hint: 'Subtract 3, then divide by 2.',
      explanation: '2x + 3 &le; 11 gives 2x &le; 8, so x &le; 4.',
      response: sb(4, '<=') },
    { label: 'b', prompt: 'Draw a number line to represent the inequality in <b>part (a)</b>.',
      marks: 1, dependsOn: 'a',
      rubric: 'One mark for a number line with a FILLED circle at 4 and the line shaded to the '
            + 'left, with an arrow. Follow-through: accept a correct representation of the '
            + "candidate's own answer to part (a). A hollow circle scores zero, because &le; "
            + 'includes its endpoint.',
      response: { kind: 'drawing' } },
  ],
}));

})();
