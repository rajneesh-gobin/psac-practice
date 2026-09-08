'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - Simultaneous Equations
//
//  Syllabus: NCF Grades 7-9, §3.9 "Simultaneous Equations" (PDF p.52,
//  printed 46): identify and use simultaneous equations; solve simultaneous
//  linear equations by the graphical, substitution or elimination method.
//
//  ⚠ THIS CONTENT AREA WAS MISSING FROM THE PACK, and it is the heaviest
//    single question on a recent paper: NCE 2024 Q31 is a shopping problem
//    solved by simultaneous equations, worth **6 marks**. NCE 2025 Q25 is a
//    plain pair worth 4. See docs/nce-grade9/syllabus-map.md.
//
//  Paper style: the answer line is printed "x = ........., y = .........",
//  which is two blanks on one line - `kind: 'blanks'` with partial credit,
//  because a candidate who finds x correctly and slips on y has earned
//  something and the paper's method marks say so.
//
//  ⚠ Every pair below is checked by substituting the stated solution back
//    into BOTH equations - not by trusting the table.
//    scripts/test-grade9-maths-content.js does that arithmetic itself.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9m-simultaneous';

// The pair is written into the prompt in the paper's own layout, and the
// coefficients are repeated in `eqs` so the harness can re-solve it.
// eqs: [[a1, b1, c1], [a2, b2, c2]] meaning a1*x + b1*y = c1.
const pair = (l1, l2) =>
  `<div style="margin:6px 0 0 14px;line-height:1.9">${l1}<br>${l2}</div>`;

// [ id, difficulty, marks, line1, line2, eqs, x, y, hint, explanation ]
const ITEMS = [
  ['g9m-sim-001', 3, 4, '3<i>x</i> &minus; <i>y</i> = 7', '2<i>x</i> + 3<i>y</i> = 1',
   [[3, -1, 7], [2, 3, 1]], 2, -1,
   'Multiply the first equation by 3 so the y terms cancel when you add.',
   'Multiplying the first equation by 3: 9x &minus; 3y = 21. Adding the second: 11x = 22, so x = 2. '
   + 'Substituting into 3x &minus; y = 7: 6 &minus; y = 7, so y = &minus;1.'],

  ['g9m-sim-002', 2, 3, '<i>x</i> + <i>y</i> = 10', '<i>x</i> &minus; <i>y</i> = 4',
   [[1, 1, 10], [1, -1, 4]], 7, 3,
   'Adding the two equations removes y straight away.',
   'Adding: 2x = 14, so x = 7. Substituting into x + y = 10 gives y = 3.'],

  ['g9m-sim-003', 2, 3, '2<i>x</i> + <i>y</i> = 11', '<i>x</i> &minus; <i>y</i> = 1',
   [[2, 1, 11], [1, -1, 1]], 4, 3,
   'The y terms already cancel when you add.',
   'Adding: 3x = 12, so x = 4. Substituting into x &minus; y = 1 gives y = 3.'],

  ['g9m-sim-004', 3, 4, '3<i>x</i> + 2<i>y</i> = 16', '<i>x</i> &minus; 2<i>y</i> = 0',
   [[3, 2, 16], [1, -2, 0]], 4, 2,
   'The 2y terms cancel on adding.',
   'Adding: 4x = 16, so x = 4. Substituting into x &minus; 2y = 0 gives 4 = 2y, so y = 2.'],

  ['g9m-sim-005', 3, 4, '5<i>x</i> + <i>y</i> = 17', '3<i>x</i> &minus; <i>y</i> = 7',
   [[5, 1, 17], [3, -1, 7]], 3, 2,
   'Add the equations to eliminate y.',
   'Adding: 8x = 24, so x = 3. Substituting into 5x + y = 17 gives 15 + y = 17, so y = 2.'],

  ['g9m-sim-006', 3, 4, '<i>x</i> + 2<i>y</i> = 8', '3<i>x</i> &minus; 2<i>y</i> = 0',
   [[1, 2, 8], [3, -2, 0]], 2, 3,
   'The 2y terms cancel when you add.',
   'Adding: 4x = 8, so x = 2. Substituting into x + 2y = 8 gives 2 + 2y = 8, so y = 3.'],

  ['g9m-sim-007', 4, 4, '2<i>x</i> + 3<i>y</i> = 12', '4<i>x</i> &minus; 3<i>y</i> = 6',
   [[2, 3, 12], [4, -3, 6]], 3, 2,
   'Add to eliminate y, then substitute back.',
   'Adding: 6x = 18, so x = 3. Substituting into 2x + 3y = 12 gives 6 + 3y = 12, so y = 2.'],

  ['g9m-sim-008', 3, 4, '<i>x</i> + <i>y</i> = 9', '2<i>x</i> + <i>y</i> = 13',
   [[1, 1, 9], [2, 1, 13]], 4, 5,
   'Subtracting the first equation from the second removes y.',
   'Subtracting: x = 4. Substituting into x + y = 9 gives y = 5.'],

  ['g9m-sim-009', 4, 4, '4<i>x</i> + <i>y</i> = 14', '2<i>x</i> + <i>y</i> = 8',
   [[4, 1, 14], [2, 1, 8]], 3, 2,
   'Subtract one equation from the other.',
   'Subtracting: 2x = 6, so x = 3. Substituting into 2x + y = 8 gives 6 + y = 8, so y = 2.'],

  ['g9m-sim-010', 3, 4, '3<i>x</i> &minus; 2<i>y</i> = 4', '<i>x</i> + 2<i>y</i> = 12',
   [[3, -2, 4], [1, 2, 12]], 4, 4,
   'Add to eliminate y.',
   'Adding: 4x = 16, so x = 4. Substituting into x + 2y = 12 gives 4 + 2y = 12, so y = 4.'],

  ['g9m-sim-011', 4, 4, '2<i>x</i> + <i>y</i> = 7', '3<i>x</i> + 2<i>y</i> = 12',
   [[2, 1, 7], [3, 2, 12]], 2, 3,
   'Multiply the first equation by 2, then subtract.',
   'Multiplying the first by 2: 4x + 2y = 14. Subtracting the second: x = 2. '
   + 'Substituting into 2x + y = 7 gives 4 + y = 7, so y = 3.'],

  ['g9m-sim-012', 4, 4, '5<i>x</i> &minus; 2<i>y</i> = 11', '3<i>x</i> + 2<i>y</i> = 13',
   [[5, -2, 11], [3, 2, 13]], 3, 2,
   'The 2y terms cancel on adding.',
   'Adding: 8x = 24, so x = 3. Substituting into 3x + 2y = 13 gives 9 + 2y = 13, so y = 2.'],

  ['g9m-sim-013', 3, 3, '<i>x</i> &minus; <i>y</i> = 2', '<i>x</i> + <i>y</i> = 8',
   [[1, -1, 2], [1, 1, 8]], 5, 3,
   'Add to eliminate y.',
   'Adding: 2x = 10, so x = 5. Substituting into x + y = 8 gives y = 3.'],

  ['g9m-sim-014', 4, 4, '4<i>x</i> + 3<i>y</i> = 18', '2<i>x</i> &minus; 3<i>y</i> = 0',
   [[4, 3, 18], [2, -3, 0]], 3, 2,
   'Add to eliminate y.',
   'Adding: 6x = 18, so x = 3. Substituting into 2x &minus; 3y = 0 gives 6 = 3y, so y = 2.'],

  ['g9m-sim-015', 4, 4, '2<i>x</i> + 5<i>y</i> = 16', '2<i>x</i> + <i>y</i> = 8',
   [[2, 5, 16], [2, 1, 8]], 3, 2,
   'Subtract the second equation from the first.',
   'Subtracting: 4y = 8, so y = 2. Substituting into 2x + y = 8 gives 2x = 6, so x = 3.'],

  ['g9m-sim-016', 3, 4, '<i>x</i> + 3<i>y</i> = 13', '<i>x</i> &minus; <i>y</i> = 1',
   [[1, 3, 13], [1, -1, 1]], 4, 3,
   'Subtract to eliminate x.',
   'Subtracting: 4y = 12, so y = 3. Substituting into x &minus; y = 1 gives x = 4.'],

  ['g9m-sim-017', 4, 4, '3<i>x</i> + <i>y</i> = 10', '<i>x</i> + <i>y</i> = 6',
   [[3, 1, 10], [1, 1, 6]], 2, 4,
   'Subtract to eliminate y.',
   'Subtracting: 2x = 4, so x = 2. Substituting into x + y = 6 gives y = 4.'],

  ['g9m-sim-018', 4, 4, '2<i>x</i> &minus; <i>y</i> = 5', '3<i>x</i> + <i>y</i> = 15',
   [[2, -1, 5], [3, 1, 15]], 4, 3,
   'Add to eliminate y.',
   'Adding: 5x = 20, so x = 4. Substituting into 2x &minus; y = 5 gives 8 &minus; y = 5, so y = 3.'],
];

ITEMS.forEach(([id, difficulty, marks, l1, l2, eqs, x, y, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection: 'solve_simultaneous', difficulty,
    source: 'NCF Grades 7-9 §3.9 Simultaneous Equations; NCE 2025 Q25 and 2024 Q31 pattern.',
    parts: [{
      label: 'a',
      prompt: 'Solve the simultaneous equations:' + pair(l1, l2),
      marks, hint, explanation,
      // ⚠ The coefficients ride along so the harness can re-solve the pair and
      //   check the stated roots, rather than trusting the table.
      eqs,
      response: { kind: 'blanks', answer: [[String(x)], [String(y)]],
                  labels: ['x', 'y'] },
    }],
  }));
});

// ── The two word problems the papers actually set ────────────────────────
// NCE 2024 Q31 is the second-heaviest question on that paper at 6 marks, and
// it is a shopping problem, not a bare pair of equations.
STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-sim-019', chapterId: CH, subsection: 'solve_simultaneous', difficulty: 4,
  source: 'NCF §3.9 Simultaneous Equations; NCE 2024 Q31 word-problem pattern, 6 marks.',
  parts: [{
    label: 'a',
    prompt: 'A pair of shoes and 3 T-shirts cost Rs 3 750.<br>'
          + 'Two pairs of the same shoes and 5 T-shirts cost Rs 6 750.<br><br>'
          + 'Find the cost of <b>1 pair of shoes</b> and <b>4 T-shirts</b>.',
    marks: 6,
    hint: 'Let s be the cost of a pair of shoes and t the cost of a T-shirt, then write two equations.',
    explanation: 'Let s be the cost of one pair of shoes and t the cost of one T-shirt. '
               + 'Then s + 3t = 3750 and 2s + 5t = 6750. '
               + 'Multiplying the first by 2: 2s + 6t = 7500. Subtracting the second: t = 750. '
               + 'Substituting back: s + 2250 = 3750, so s = 1500. '
               + 'The cost of 1 pair of shoes and 4 T-shirts is 1500 + 4(750) = Rs 4 500.',
    response: { kind: 'number', answer: '4500', prefix: 'Rs' },
  }],
}));

STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-sim-020', chapterId: CH, subsection: 'solve_simultaneous', difficulty: 4,
  source: 'NCF §3.9 Simultaneous Equations, "formulate and solve" from context.',
  intro: 'At a school fair, 2 samosas and 3 gateaux cost Rs 95, while 4 samosas and 1 gateau cost Rs 90.',
  parts: [
    { label: 'a', prompt: 'Find the cost of <b>one samosa</b>.', marks: 3,
      hint: 'Call a samosa s and a gateau g, then eliminate one of them.',
      explanation: 'From 2s + 3g = 95 and 4s + g = 90. Multiplying the second by 3: 12s + 3g = 270. '
                 + 'Subtracting the first: 10s = 175, so s = Rs 17.50.',
      response: { kind: 'number', answer: '17.50', accept: ['17.5', '35/2'], prefix: 'Rs' } },
    { label: 'b', prompt: 'Find the cost of <b>one gateau</b>.', marks: 2, dependsOn: 'a',
      hint: 'Substitute your answer to part (a) into either equation.',
      explanation: 'Substituting s = 17.50 into 4s + g = 90: 70 + g = 90, so g = Rs 20.',
      response: { kind: 'number', answer: '20', prefix: 'Rs' } },
  ],
}));

})();
