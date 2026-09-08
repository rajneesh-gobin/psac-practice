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

// ── Additional plain pairs (sim-021 – sim-032) ────────────────────────────────
// sim-021 = NCE 2021 Q25 verbatim (4 marks, multiply one equation)
// sim-022 = NCE 2023 Q30 verbatim (4 marks, substitution or multiply-both)
// sim-023/025/028/031 = multiply both equations before eliminating
// sim-024/026/027 = one multiplication, negative solutions
// sim-029/030 = substitution-method practice (equation already in y=… or x=… form)
// sim-032 = multiply-one elimination, negative y
const ITEMS2 = [
  ['g9m-sim-021', 4, 4, '2<i>x</i> + <i>y</i> = 5', '3<i>x</i> + 2<i>y</i> = 7',
   [[2, 1, 5], [3, 2, 7]], 3, -1,
   'Multiply the first equation by 2 so the y-coefficients match, then subtract.',
   'Multiplying the first by 2: 4x + 2y = 10. Subtracting 3x + 2y = 7 gives x = 3. '
   + 'Substituting into 2x + y = 5: 6 + y = 5, so y = &minus;1.'],

  ['g9m-sim-022', 4, 4, '4<i>x</i> &minus; 5<i>y</i> = &minus;7', '6<i>x</i> + <i>y</i> = 15',
   [[4, -5, -7], [6, 1, 15]], 2, 3,
   'From the second equation, express y in terms of x, then substitute into the first.',
   'From 6x + y = 15: y = 15 &minus; 6x. Substituting into the first: '
   + '4x &minus; 5(15 &minus; 6x) = &minus;7, so 34x = 68, giving x = 2. '
   + 'Then y = 15 &minus; 12 = 3.'],

  ['g9m-sim-023', 4, 4, '3<i>x</i> + 2<i>y</i> = 13', '2<i>x</i> + 3<i>y</i> = 12',
   [[3, 2, 13], [2, 3, 12]], 3, 2,
   'Multiply the first equation by 3 and the second by 2 so the y-coefficients match, then subtract.',
   'Multiplying: 9x + 6y = 39 and 4x + 6y = 24. Subtracting: 5x = 15, so x = 3. '
   + 'Substituting into 3x + 2y = 13: 9 + 2y = 13, so y = 2.'],

  ['g9m-sim-024', 3, 4, '3<i>x</i> + 2<i>y</i> = 4', '<i>x</i> &minus; <i>y</i> = 3',
   [[3, 2, 4], [1, -1, 3]], 2, -1,
   'From the second equation express x in terms of y, then substitute.',
   'From x &minus; y = 3: x = y + 3. Substituting into 3x + 2y = 4: '
   + '3(y + 3) + 2y = 4, so 5y = &minus;5, giving y = &minus;1. Then x = &minus;1 + 3 = 2.'],

  ['g9m-sim-025', 4, 4, '3<i>x</i> + 4<i>y</i> = 18', '4<i>x</i> + 3<i>y</i> = 17',
   [[3, 4, 18], [4, 3, 17]], 2, 3,
   'Multiply the first equation by 4 and the second by 3 so the x-coefficients match, then subtract.',
   'Multiplying: 12x + 16y = 72 and 12x + 9y = 51. Subtracting: 7y = 21, so y = 3. '
   + 'Substituting into 3x + 4y = 18: 3x = 6, so x = 2.'],

  ['g9m-sim-026', 3, 4, '<i>x</i> + 3<i>y</i> = 1', '2<i>x</i> &minus; <i>y</i> = 9',
   [[1, 3, 1], [2, -1, 9]], 4, -1,
   'Multiply the first equation by 2 so the x-coefficients match, then subtract.',
   'Multiplying the first by 2: 2x + 6y = 2. Subtracting 2x &minus; y = 9: '
   + '7y = &minus;7, so y = &minus;1. Then x = 1 &minus; 3(&minus;1) = 4.'],

  ['g9m-sim-027', 3, 4, '<i>x</i> &minus; 2<i>y</i> = 7', '3<i>x</i> + <i>y</i> = 7',
   [[1, -2, 7], [3, 1, 7]], 3, -2,
   'From the second equation express y in terms of x, then substitute.',
   'From 3x + y = 7: y = 7 &minus; 3x. Substituting into x &minus; 2y = 7: '
   + 'x &minus; 2(7 &minus; 3x) = 7, so 7x = 21, giving x = 3. '
   + 'Then y = 7 &minus; 9 = &minus;2.'],

  ['g9m-sim-028', 4, 4, '2<i>x</i> + 3<i>y</i> = 16', '3<i>x</i> + 4<i>y</i> = 22',
   [[2, 3, 16], [3, 4, 22]], 2, 4,
   'Multiply the first equation by 4 and the second by 3 so the y-coefficients match, then subtract.',
   'Multiplying: 8x + 12y = 64 and 9x + 12y = 66. Subtracting: x = 2. '
   + 'Substituting into 2x + 3y = 16: 4 + 3y = 16, so y = 4.'],

  ['g9m-sim-029', 3, 4, '<i>y</i> = 3<i>x</i> &minus; 4', '2<i>x</i> + <i>y</i> = 11',
   [[-3, 1, -4], [2, 1, 11]], 3, 5,
   'The first equation already gives y in terms of x — substitute it directly into the second.',
   'Substituting y = 3x &minus; 4 into 2x + y = 11: '
   + '2x + 3x &minus; 4 = 11, so 5x = 15, giving x = 3. Then y = 3(3) &minus; 4 = 5.'],

  ['g9m-sim-030', 3, 4, '<i>x</i> = 2<i>y</i> + 3', '3<i>x</i> &minus; 4<i>y</i> = 11',
   [[1, -2, 3], [3, -4, 11]], 5, 1,
   'The first equation already gives x in terms of y — substitute it directly into the second.',
   'Substituting x = 2y + 3 into 3x &minus; 4y = 11: '
   + '3(2y + 3) &minus; 4y = 11, so 2y = 2, giving y = 1. Then x = 2(1) + 3 = 5.'],

  ['g9m-sim-031', 4, 4, '3<i>x</i> &minus; 2<i>y</i> = 5', '2<i>x</i> + 3<i>y</i> = 12',
   [[3, -2, 5], [2, 3, 12]], 3, 2,
   'Multiply the first equation by 3 and the second by 2 so the y-coefficients cancel on adding.',
   'Multiplying: 9x &minus; 6y = 15 and 4x + 6y = 24. Adding: 13x = 39, so x = 3. '
   + 'Substituting into 2x + 3y = 12: 6 + 3y = 12, so y = 2.'],

  ['g9m-sim-032', 4, 4, '5<i>x</i> + 4<i>y</i> = 3', '3<i>x</i> &minus; 2<i>y</i> = 15',
   [[5, 4, 3], [3, -2, 15]], 3, -3,
   'Multiply the second equation by 2 so the y-coefficients cancel on adding.',
   'Multiplying the second by 2: 6x &minus; 4y = 30. Adding to the first: 11x = 33, so x = 3. '
   + 'Substituting into 5x + 4y = 3: 15 + 4y = 3, so y = &minus;3.'],
];

ITEMS2.forEach(([id, difficulty, marks, l1, l2, eqs, x, y, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection: 'solve_simultaneous', difficulty,
    source: 'NCF Grades 7-9 §3.9 Simultaneous Equations; NCE past-paper level (2021 Q25 / 2023 Q30 pattern).',
    parts: [{
      label: 'a',
      prompt: 'Solve the simultaneous equations:' + pair(l1, l2),
      marks, hint, explanation,
      eqs,
      response: { kind: 'blanks', answer: [[String(x)], [String(y)]],
                  labels: ['x', 'y'] },
    }],
  }));
});

// ── Word problems continued (sim-033 – sim-036) ───────────────────────────────
STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-sim-033', chapterId: CH, subsection: 'solve_simultaneous', difficulty: 4,
  source: 'NCF §3.9 Simultaneous Equations; bus-fare word problem, NCE 6-mark pattern.',
  parts: [{
    label: 'a',
    prompt: '2 adult bus tickets and 3 child bus tickets cost Rs 210.<br>'
          + '5 adult bus tickets and 2 child bus tickets cost Rs 360.<br><br>'
          + 'Find the total cost of <b>1 adult ticket</b> and <b>4 child tickets</b>.',
    marks: 6,
    hint: 'Let a = cost of one adult ticket and c = cost of one child ticket. '
        + 'Form two equations, then solve.',
    explanation: 'Let a = adult ticket price and c = child ticket price. '
               + 'Then 2a + 3c = 210 and 5a + 2c = 360. '
               + 'Multiplying the first by 2: 4a + 6c = 420. '
               + 'Multiplying the second by 3: 15a + 6c = 1080. '
               + 'Subtracting: 11a = 660, so a = 60. '
               + 'Then 2(60) + 3c = 210, so c = 30. '
               + '1 adult + 4 child = 60 + 4(30) = Rs 180.',
    response: { kind: 'number', answer: '180', prefix: 'Rs' },
  }],
}));

STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-sim-034', chapterId: CH, subsection: 'solve_simultaneous', difficulty: 4,
  source: 'NCF §3.9 Simultaneous Equations; school-canteen multi-part word problem.',
  intro: 'At the school canteen, 3 portions of fried rice and 2 cups of juice cost Rs 85. '
       + '1 portion of fried rice and 4 cups of juice cost Rs 65.',
  parts: [
    { label: 'a', prompt: 'Find the cost of <b>one portion of fried rice</b>.', marks: 3,
      hint: 'Multiply the first equation by 4 and the second by 2 so the juice terms cancel when you subtract.',
      explanation: 'Let r = price of fried rice, j = price of juice. '
                 + 'Multiplying 3r + 2j = 85 by 4: 12r + 8j = 340. '
                 + 'Multiplying r + 4j = 65 by 2: 2r + 8j = 130. '
                 + 'Subtracting: 10r = 210, so r = Rs 21.',
      response: { kind: 'number', answer: '21', prefix: 'Rs' } },
    { label: 'b', prompt: 'Find the cost of <b>one cup of juice</b>.', marks: 2, dependsOn: 'a',
      hint: 'Substitute your answer for r into the simpler equation.',
      explanation: 'Substituting r = 21 into r + 4j = 65: 21 + 4j = 65, so j = Rs 11.',
      response: { kind: 'number', answer: '11', prefix: 'Rs' } },
  ],
}));

STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-sim-035', chapterId: CH, subsection: 'solve_simultaneous', difficulty: 4,
  source: 'NCF §3.9 Simultaneous Equations; market-stall word problem, NCE 6-mark pattern.',
  parts: [{
    label: 'a',
    prompt: 'At a market stall, 3 mangoes and 2 pineapples cost Rs 65.<br>'
          + '1 mango and 4 pineapples cost Rs 55.<br><br>'
          + 'Find the total cost of <b>2 mangoes</b> and <b>3 pineapples</b>.',
    marks: 6,
    hint: 'Let m = cost of 1 mango and p = cost of 1 pineapple. Form two equations and solve.',
    explanation: '3m + 2p = 65 and m + 4p = 55. '
               + 'From the second: m = 55 &minus; 4p. '
               + 'Substituting: 3(55 &minus; 4p) + 2p = 65, so 165 &minus; 10p = 65, giving p = 10. '
               + 'Then m = 55 &minus; 40 = 15. '
               + '2 mangoes + 3 pineapples = 2(15) + 3(10) = 30 + 30 = Rs 60.',
    response: { kind: 'number', answer: '60', prefix: 'Rs' },
  }],
}));

STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-sim-036', chapterId: CH, subsection: 'solve_simultaneous', difficulty: 4,
  source: 'NCF §3.9 Simultaneous Equations; ages word problem, multi-part.',
  intro: 'Priya is x years old and her brother Dev is y years old. '
       + 'The sum of their ages is 27. '
       + 'In 3 years’ time, Priya will be twice as old as Dev.',
  parts: [
    { label: 'a', prompt: 'Find the age of <b>Priya</b>.', marks: 3,
      hint: 'Write one equation for the sum of ages, and one for "Priya\'s age in 3 years = twice Dev\'s age in 3 years".',
      explanation: 'x + y = 27, and x + 3 = 2(y + 3), which gives x = 2y + 3. '
                 + 'Substituting: 2y + 3 + y = 27, so 3y = 24, giving y = 8. '
                 + 'Then x = 2(8) + 3 = 19. Priya is 19 years old.',
      response: { kind: 'number', answer: '19' } },
    { label: 'b', prompt: 'How old will Dev be in <b>10 years’ time</b>?', marks: 2, dependsOn: 'a',
      hint: 'Use your answer from part (a) to find Dev\'s current age, then add 10.',
      explanation: 'Dev is currently y = 8 years old. In 10 years he will be 8 + 10 = 18.',
      response: { kind: 'number', answer: '18' } },
  ],
}));

})();
