'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - Coordinates & Straight Lines
//
//  Syllabus: NCF Grades 7-9, §3.9 "Geometry: Coordinates" (PDF p.49,
//  printed 43): gradient of inclined, horizontal and vertical lines; gradient
//  of parallel lines; the equation y = mx + c from a gradient and a point or
//  from two points; straight-line graphs in practical situations.
//
//  ⚠ THIS CONTENT AREA WAS MISSING FROM THE PACK ENTIRELY and is examined
//    every year - NCE 2025 Q18 (gradient then equation of AB, 3 marks) and
//    Q29 (draw y = x + 4 on a supplied grid, name the enclosed figure, find
//    its area, 5 marks), NCE 2024 Q26(a). See docs/nce-grade9/syllabus-map.md.
//
//  ⚠ EVERY GRADIENT AND INTERCEPT IS RE-DERIVED from the two points by
//    scripts/test-grade9-maths-content.js. The table is not trusted.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9m-coordinates';

// ── The grid used by the drawing task ────────────────────────────────────
// Original SVG, owned by this repository. Registered in
// docs/nce-grade9/visual-assets.md.
// ⚠ Black on white with no colour: a generated paper prints in monochrome, so
//   anything distinguished by colour alone is unreadable on the sheet.
function grid(xMin, xMax, yMin, yMax) {
  const w = 300, h = 300;
  const sx = w / (xMax - xMin), sy = h / (yMax - yMin);
  const X = x => ((x - xMin) * sx).toFixed(1);
  const Y = y => (h - (y - yMin) * sy).toFixed(1);
  let g = '';
  for (let x = xMin; x <= xMax; x++) {
    g += `<line x1="${X(x)}" y1="0" x2="${X(x)}" y2="${h}" stroke="#bbb" stroke-width="0.5"/>`;
  }
  for (let y = yMin; y <= yMax; y++) {
    g += `<line x1="0" y1="${Y(y)}" x2="${w}" y2="${Y(y)}" stroke="#bbb" stroke-width="0.5"/>`;
  }
  g += `<line x1="0" y1="${Y(0)}" x2="${w}" y2="${Y(0)}" stroke="#000" stroke-width="1.4"/>`;
  g += `<line x1="${X(0)}" y1="0" x2="${X(0)}" y2="${h}" stroke="#000" stroke-width="1.4"/>`;
  for (let x = xMin; x <= xMax; x++) {
    if (x === 0) continue;
    g += `<text x="${X(x)}" y="${(+Y(0) + 12)}" font-size="9" text-anchor="middle" fill="#000">${x}</text>`;
  }
  for (let y = yMin; y <= yMax; y++) {
    if (y === 0) continue;
    g += `<text x="${(+X(0) - 5)}" y="${(+Y(y) + 3)}" font-size="9" text-anchor="end" fill="#000">${y}</text>`;
  }
  g += `<text x="${w - 4}" y="${(+Y(0) - 5)}" font-size="10" text-anchor="end" font-style="italic">x</text>`;
  g += `<text x="${(+X(0) + 6)}" y="10" font-size="10" font-style="italic">y</text>`;
  // The plot fills w x h exactly, so the outermost tick labels straddle x=0
  // and x=w and the viewBox cut them: the axis printed "-1" as a fragment and
  // clipped the last "8". M is a margin around the plot, not part of it.
  const M = 14;
  return `<svg viewBox="0 0 ${w + 2 * M} ${h + 2 * M}" width="${w + 2 * M}" height="${h + 2 * M}" xmlns="http://www.w3.org/2000/svg" role="img"><g transform="translate(${M},${M})">${g}</g></svg>`;
}

// [ id, subsection, difficulty, marks, prompt, answer, accept[], hint, explanation ]
const ITEMS = [

  // ── gradient ────────────────────────────────────────────────────────────
  ['g9m-crd-001', 'gradient', 2, 2, 'A line passes through the points <b>A</b> (0, 1) and <b>B</b> (3, 7). Find the <b>gradient</b> of the line <b>AB</b>.',
   '2', [],
   'Gradient is the change in y divided by the change in x.',
   'Gradient = (7 &minus; 1) &divide; (3 &minus; 0) = 6 &divide; 3 = 2.'],

  ['g9m-crd-002', 'gradient', 2, 2, 'Find the gradient of the line joining (1, 2) and (4, 11).',
   '3', [],
   'Subtract the y values, then the x values, in the same order.',
   'Gradient = (11 &minus; 2) &divide; (4 &minus; 1) = 9 &divide; 3 = 3.'],

  ['g9m-crd-003', 'gradient', 1, 1, 'What is the gradient of a horizontal line?',
   '0', [],
   'A horizontal line does not rise at all.',
   'The change in y is 0 for any change in x, so the gradient is 0 &divide; (change in x) = 0.'],

  ['g9m-crd-004', 'gradient', 2, 2, 'Find the gradient of the line joining (2, 5) and (6, 13).',
   '2', [],
   'Rise over run.',
   'Gradient = (13 &minus; 5) &divide; (6 &minus; 2) = 8 &divide; 4 = 2.'],

  ['g9m-crd-005', 'gradient', 3, 2, 'Find the gradient of the line joining (&minus;1, 4) and (3, &minus;4).',
   '-2', [],
   'Take care with the negative coordinates; subtract in the same order on both.',
   'Gradient = (&minus;4 &minus; 4) &divide; (3 &minus; (&minus;1)) = &minus;8 &divide; 4 = &minus;2.'],

  ['g9m-crd-006', 'gradient', 1, 1, 'Find the gradient of the line joining (0, 0) and (5, 10).',
   '2', [],
   'Rise over run from the origin.',
   'Gradient = (10 &minus; 0) &divide; (5 &minus; 0) = 10 &divide; 5 = 2.'],

  ['g9m-crd-007', 'gradient', 3, 2, 'Find the gradient of the line joining (&minus;2, &minus;3) and (2, 5).',
   '2', [],
   'Subtracting a negative adds.',
   'Gradient = (5 &minus; (&minus;3)) &divide; (2 &minus; (&minus;2)) = 8 &divide; 4 = 2.'],

  ['g9m-crd-008', 'gradient', 1, 1, 'Write down the gradient of the line <i>y</i> = 3<i>x</i> + 5.',
   '3', [],
   'In y = mx + c, the gradient is m.',
   'Comparing with y = mx + c, the number multiplying x is 3, so the gradient is 3.'],

  ['g9m-crd-009', 'gradient', 1, 1, 'Write down the gradient of the line <i>y</i> = &minus;2<i>x</i> + 7.',
   '-2', [],
   'The gradient is the number in front of x, including its sign.',
   'Comparing with y = mx + c gives m = &minus;2.'],

  ['g9m-crd-010', 'gradient', 3, 2, 'Find the gradient of the line 2<i>y</i> = 6<i>x</i> &minus; 4.',
   '3', [],
   'Rearrange into the form y = mx + c first.',
   'Dividing every term by 2 gives y = 3x &minus; 2, so the gradient is 3.'],

  ['g9m-crd-011', 'gradient', 2, 1, 'A line is parallel to <i>y</i> = 4<i>x</i> &minus; 1. Write down its gradient.',
   '4', [],
   'Parallel lines have equal gradients.',
   'Parallel lines have the same gradient, so this line also has gradient 4.'],

  ['g9m-crd-012', 'gradient', 2, 1, 'Find the gradient of the line joining (3, 3) and (7, 3).',
   '0', [],
   'What do you notice about the two y values?',
   'The y values are equal, so the change in y is 0 and the gradient is 0 &divide; 4 = 0.'],

  ['g9m-crd-013', 'gradient', 3, 2, 'Find the gradient of the line 3<i>x</i> + <i>y</i> = 9.',
   '-3', [],
   'Make y the subject.',
   'Rearranging gives y = &minus;3x + 9, so the gradient is &minus;3.'],

  ['g9m-crd-014', 'gradient', 3, 2, 'Find the gradient of the line joining (&minus;4, 2) and (0, 0).',
   '-1/2', ['-0.5'],
   'Your answer will be a fraction.',
   'Gradient = (0 &minus; 2) &divide; (0 &minus; (&minus;4)) = &minus;2 &divide; 4 = &minus;1/2.'],

  ['g9m-crd-015', 'gradient', 3, 2, 'Find the gradient of the line 4<i>y</i> = 8<i>x</i> + 12.',
   '2', [],
   'Divide through by 4.',
   'Dividing every term by 4 gives y = 2x + 3, so the gradient is 2.'],

  ['g9m-crd-016', 'gradient', 3, 2, 'Find the gradient of the line joining (5, &minus;2) and (1, 6).',
   '-2', [],
   'Keep the points in the same order top and bottom.',
   'Gradient = (6 &minus; (&minus;2)) &divide; (1 &minus; 5) = 8 &divide; (&minus;4) = &minus;2.'],

  ['g9m-crd-017', 'gradient', 2, 1, 'The lines <i>y</i> = 5<i>x</i> + 2 and <i>y</i> = <i>kx</i> &minus; 3 are parallel. Find the value of <i>k</i>.',
   '5', [],
   'Parallel means the gradients match.',
   'Parallel lines have equal gradients, so k = 5.'],

  ['g9m-crd-018', 'gradient', 2, 2, 'Find the gradient of the line joining (0, 7) and (2, 1).',
   '-3', [],
   'The line falls, so expect a negative answer.',
   'Gradient = (1 &minus; 7) &divide; (2 &minus; 0) = &minus;6 &divide; 2 = &minus;3.'],

  ['g9m-crd-019', 'gradient', 2, 2, 'Find the gradient of the line joining (&minus;3, 1) and (1, 9).',
   '2', [],
   'Rise over run.',
   'Gradient = (9 &minus; 1) &divide; (1 &minus; (&minus;3)) = 8 &divide; 4 = 2.'],

  ['g9m-crd-020', 'gradient', 3, 2, 'Find the gradient of the line joining (6, 4) and (2, 4).',
   '0', [],
   'Look at the y values before calculating.',
   'Both points have y = 4, so the line is horizontal and its gradient is 0.'],

  // ── equation_of_line ────────────────────────────────────────────────────
  ['g9m-crd-021', 'equation_of_line', 1, 1, 'A line has gradient 2 and cuts the <i>y</i>-axis at 1. Write down its equation.',
   'y=2x+1', [],
   'Substitute m and c into y = mx + c.',
   'With m = 2 and c = 1, the equation is y = 2x + 1.'],

  ['g9m-crd-022', 'equation_of_line', 3, 2, 'A line passes through <b>A</b> (0, 1) and <b>B</b> (3, 7). <b>State</b> the equation of the line <b>AB</b>.',
   'y=2x+1', [],
   'Find the gradient first; the point (0, 1) gives c straight away.',
   'Gradient = (7 &minus; 1) &divide; 3 = 2. The line crosses the y-axis at (0, 1), so c = 1 and the equation is y = 2x + 1.'],

  ['g9m-crd-023', 'equation_of_line', 1, 1, 'Write the equation of the line with gradient 3 passing through (0, &minus;4).',
   'y=3x-4', [],
   'The point (0, c) gives the intercept directly.',
   'With m = 3 and c = &minus;4, the equation is y = 3x &minus; 4.'],

  ['g9m-crd-024', 'equation_of_line', 2, 1, 'Write the equation of the line with gradient &minus;1 passing through (0, 5).',
   'y=-x+5', ['y=5-x'],
   'A gradient of &minus;1 is written as &minus;x, not &minus;1x.',
   'With m = &minus;1 and c = 5, the equation is y = &minus;x + 5.'],

  ['g9m-crd-025', 'equation_of_line', 1, 1, 'Write the equation of the line with gradient 4 passing through the origin.',
   'y=4x', [],
   'Through the origin means c = 0.',
   'The origin is (0, 0), so c = 0 and the equation is y = 4x.'],

  ['g9m-crd-026', 'equation_of_line', 3, 2, 'A line has gradient 2 and passes through (1, 5). Find its equation.',
   'y=2x+3', [],
   'Substitute the point into y = 2x + c to find c.',
   'Substituting: 5 = 2(1) + c, so c = 3 and the equation is y = 2x + 3.'],

  ['g9m-crd-027', 'equation_of_line', 3, 2, 'A line has gradient 3 and passes through (2, 7). Find its equation.',
   'y=3x+1', [],
   'Put the point into y = 3x + c.',
   'Substituting: 7 = 3(2) + c = 6 + c, so c = 1 and the equation is y = 3x + 1.'],

  ['g9m-crd-028', 'equation_of_line', 3, 2, 'A line has gradient &minus;2 and passes through (&minus;1, 4). Find its equation.',
   'y=-2x+2', [],
   'Take care with the two negatives when you substitute.',
   'Substituting: 4 = &minus;2(&minus;1) + c = 2 + c, so c = 2 and the equation is y = &minus;2x + 2.'],

  ['g9m-crd-029', 'equation_of_line', 4, 3, 'Find the equation of the line passing through (2, 3) and (4, 7).',
   'y=2x-1', [],
   'Find the gradient first, then use one of the points to find c.',
   'Gradient = (7 &minus; 3) &divide; (4 &minus; 2) = 2. Substituting (2, 3): 3 = 2(2) + c, so c = &minus;1 and the equation is y = 2x &minus; 1.'],

  ['g9m-crd-030', 'equation_of_line', 4, 3, 'Find the equation of the line passing through (0, 6) and (3, 0).',
   'y=-2x+6', ['y=6-2x'],
   'One of the points is on the y-axis.',
   'Gradient = (0 &minus; 6) &divide; (3 &minus; 0) = &minus;2. The point (0, 6) gives c = 6, so the equation is y = &minus;2x + 6.'],

  ['g9m-crd-031', 'equation_of_line', 1, 1, 'Write down the equation of the <i>x</i>-axis.',
   'y=0', [],
   'Every point on it has the same y value.',
   'Every point on the x-axis has y = 0, so its equation is y = 0.'],

  ['g9m-crd-032', 'equation_of_line', 1, 1, 'Write down the equation of the <i>y</i>-axis.',
   'x=0', [],
   'Every point on it has the same x value.',
   'Every point on the y-axis has x = 0, so its equation is x = 0.'],

  ['g9m-crd-033', 'equation_of_line', 2, 1, 'Write the equation of the horizontal line through (2, 5).',
   'y=5', [],
   'A horizontal line keeps y constant.',
   'A horizontal line through (2, 5) has y = 5 everywhere, so its equation is y = 5.'],

  ['g9m-crd-034', 'equation_of_line', 2, 1, 'Write the equation of the vertical line through (3, &minus;1).',
   'x=3', [],
   'A vertical line keeps x constant.',
   'A vertical line through (3, &minus;1) has x = 3 everywhere, so its equation is x = 3.'],

  ['g9m-crd-035', 'equation_of_line', 3, 2, 'A line is parallel to <i>y</i> = 2<i>x</i> + 7 and passes through (0, &minus;3). Find its equation.',
   'y=2x-3', [],
   'Parallel lines share a gradient; the point gives c.',
   'Parallel means m = 2. The point (0, &minus;3) gives c = &minus;3, so the equation is y = 2x &minus; 3.'],

  ['g9m-crd-036', 'equation_of_line', 4, 3, 'A line is parallel to <i>y</i> = &minus;3<i>x</i> + 1 and passes through (1, 2). Find its equation.',
   'y=-3x+5', [],
   'Use m = &minus;3 and substitute the point.',
   'Parallel gives m = &minus;3. Substituting (1, 2): 2 = &minus;3(1) + c, so c = 5 and the equation is y = &minus;3x + 5.'],

  ['g9m-crd-037', 'equation_of_line', 4, 3, 'Find the equation of the line passing through (&minus;2, 1) and (2, 9).',
   'y=2x+5', [],
   'Watch the signs in the gradient calculation.',
   'Gradient = (9 &minus; 1) &divide; (2 &minus; (&minus;2)) = 8 &divide; 4 = 2. Substituting (2, 9): 9 = 4 + c, so c = 5 and the equation is y = 2x + 5.'],

  ['g9m-crd-038', 'equation_of_line', 1, 1, 'Write down the <i>y</i>-intercept of the line <i>y</i> = 5<i>x</i> &minus; 8.',
   '-8', [],
   'In y = mx + c, the intercept is c.',
   'Comparing with y = mx + c gives c = &minus;8.'],

  ['g9m-crd-039', 'equation_of_line', 4, 3, 'Find the equation of the line passing through (1, 1) and (3, 7).',
   'y=3x-2', [],
   'Gradient first, then substitute either point.',
   'Gradient = (7 &minus; 1) &divide; (3 &minus; 1) = 3. Substituting (1, 1): 1 = 3 + c, so c = &minus;2 and the equation is y = 3x &minus; 2.'],

  ['g9m-crd-040', 'equation_of_line', 3, 2, 'A line is parallel to 2<i>y</i> = 4<i>x</i> + 6 and passes through (0, 1). Find its equation.',
   'y=2x+1', [],
   'Rearrange the given line before comparing gradients.',
   '2y = 4x + 6 gives y = 2x + 3, so the gradient is 2. With c = 1, the equation is y = 2x + 1.'],
];

const isNumeric = a => /^-?[\d.\/]+$/.test(a);

ITEMS.forEach(([id, subsection, difficulty, marks, prompt, answer, accept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection, difficulty,
    source: 'NCF Grades 7-9 §3.9 Geometry: Coordinates; NCE 2025 Q18 pattern.',
    parts: [{
      label: 'a', prompt, marks, hint, explanation,
      response: { kind: isNumeric(answer) ? 'number' : 'expression', answer, accept },
    }],
  }));
});

// ── The drawing task the blueprint requires ──────────────────────────────
// ⚠ Every measured year carries at least one task that must be DRAWN, and it
//   cannot be auto-marked. It is excluded from online practice by
//   Assessment.projectToItems() and appears on the printable paper with the
//   rubric below. Replacing it with an easier multiple-choice question is
//   exactly what the brief forbids.
STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-crd-041', chapterId: CH, subsection: 'equation_of_line', difficulty: 3,
  source: 'NCF §3.9 Coordinates, straight-line graphs; NCE 2025 Q29 pattern.',
  stimulus: {
    html: grid(-1, 8, -1, 8),
    altText: 'A squared coordinate grid with the x-axis and y-axis drawn and numbered from minus one to eight.',
  },
  parts: [
    { label: 'a', prompt: 'On the grid above, draw the graph of <i>y</i> = <i>x</i> + 2.', marks: 2,
      rubric: 'One mark for a straight line with gradient 1. One mark for the line passing through (0, 2) '
            + 'and (4, 6). Accept any correctly drawn straight line through those points, extended across the grid.',
      response: { kind: 'drawing' } },
    { label: 'b', prompt: 'Write down the coordinates of the point where your line crosses the <i>y</i>-axis.',
      marks: 1, dependsOn: 'a',
      hint: 'Read off the value of y where the line meets the vertical axis.',
      explanation: 'The line y = x + 2 meets the y-axis where x = 0, giving y = 2. The point is (0, 2).',
      response: { kind: 'number', answer: '(0, 2)', accept: ['(0,2)', '0, 2', '0,2'] } },
  ],
}));

})();

// ══════════════════════════════════════════════════════════════════════════
//  Paper-shape items: multiple-choice for the consolidated question, and two
//  extended multi-part problems for the tail.
// ══════════════════════════════════════════════════════════════════════════
(function () {

const CH = 'g9m-coordinates';

const MCQ = [
  ['g9m-crd-042', 'gradient',
   'What is the gradient of the line <i>y</i> = 7 &minus; 2<i>x</i>?',
   ['&minus;2', '7', '2', '&minus;7'], '&minus;2',
   'Rewrite it as y = mx + c before reading off m.',
   'y = 7 &minus; 2x is y = &minus;2x + 7, so the gradient is &minus;2. Answering 7 reads the intercept instead; answering 2 drops the minus sign.'],

  ['g9m-crd-043', 'equation_of_line',
   'Which of these lines is <b>parallel</b> to <i>y</i> = 3<i>x</i> &minus; 4?',
   ['<i>y</i> = 3<i>x</i> + 9', '<i>y</i> = &minus;3<i>x</i> + 4', '<i>y</i> = 4<i>x</i> &minus; 3', '<i>y</i> = &minus;<sup>1</sup>&frasl;<sub>3</sub><i>x</i> &minus; 4'],
   '<i>y</i> = 3<i>x</i> + 9',
   'Parallel lines have the same gradient.',
   'Parallel means the gradient must also be 3, so y = 3x + 9. The second answer flips the sign; the third swaps the gradient and intercept; the fourth is the perpendicular gradient.'],

  ['g9m-crd-044', 'gradient',
   'A straight line has a gradient of 0. Which statement describes the line?',
   ['It is horizontal.', 'It is vertical.', 'It slopes upwards.', 'It slopes downwards.'],
   'It is horizontal.',
   'A gradient of 0 means no change in y.',
   'Gradient 0 means y does not change as x changes, so the line is horizontal. A vertical line has no gradient at all, because the change in x is 0 and division by 0 is undefined.'],
];

MCQ.forEach(([id, subsection, prompt, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection, difficulty: 2,
    source: 'NCF §3.9 Geometry: Coordinates; NCE 2025 Q11 MCQ-block pattern.',
    parts: [{ label: 'a', prompt, marks: 1, hint, explanation,
              response: { kind: 'choice', variant: 'options', options, answer } }],
  }));
});

// ── Extended problems for the tail ───────────────────────────────────────
STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-crd-045', chapterId: CH, subsection: 'equation_of_line', difficulty: 4,
  source: 'NCF §3.9 Coordinates; NCE 2025 Q18 extended to a three-part problem.',
  parts: [
    { label: 'a', prompt: 'A line passes through <b>P</b> (&minus;2, &minus;5) and <b>Q</b> (4, 7). Find the <b>gradient</b> of <b>PQ</b>.',
      marks: 2,
      hint: 'Subtract the y values and the x values in the same order.',
      explanation: 'Gradient = (7 &minus; (&minus;5)) &divide; (4 &minus; (&minus;2)) = 12 &divide; 6 = 2.',
      response: { kind: 'number', answer: '2' } },
    { label: 'b', prompt: 'Find the equation of the line <b>PQ</b>.', marks: 2, dependsOn: 'a',
      hint: 'Put one of the two points into y = mx + c.',
      explanation: 'With m = 2, substituting Q (4, 7): 7 = 2(4) + c = 8 + c, so c = &minus;1 and the equation is y = 2x &minus; 1.',
      response: { kind: 'expression', answer: 'y=2x-1' } },
    { label: 'c', prompt: 'The point <b>R</b> (1, <i>k</i>) lies on the line <b>PQ</b>. Find the value of <i>k</i>.',
      marks: 1, dependsOn: 'b',
      hint: 'Substitute x = 1 into your equation.',
      explanation: 'Substituting x = 1 into y = 2x &minus; 1 gives y = 2(1) &minus; 1 = 1, so k = 1.',
      response: { kind: 'number', answer: '1', label: 'k' } },
  ],
}));

STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-crd-046', chapterId: CH, subsection: 'gradient', difficulty: 4,
  source: 'NCF §3.9 Coordinates, gradient of parallel lines; NCE 2024 Q26 pattern.',
  parts: [
    { label: 'a.i', prompt: 'A line <b>L</b> has equation 2<i>y</i> = 6<i>x</i> &minus; 8. Find the <b>gradient</b> of <b>L</b>.',
      marks: 2,
      hint: 'Divide every term by 2 to reach the form y = mx + c.',
      explanation: 'Dividing throughout by 2 gives y = 3x &minus; 4, so the gradient is 3.',
      response: { kind: 'number', answer: '3' } },
    { label: 'a.ii', prompt: 'Write down the <i>y</i>-intercept of <b>L</b>.', marks: 1,
      hint: 'It is the constant term once y is the subject.',
      explanation: 'From y = 3x &minus; 4, the y-intercept is &minus;4.',
      response: { kind: 'number', answer: '-4' } },
    { label: 'b', prompt: 'Find the equation of the line parallel to <b>L</b> that passes through (0, 5).',
      marks: 2, dependsOn: 'a.i',
      hint: 'Parallel lines share a gradient, and the point given is on the y-axis.',
      explanation: 'Parallel to L means the gradient is also 3. The point (0, 5) is the y-intercept, so c = 5 and the equation is y = 3x + 5.',
      response: { kind: 'expression', answer: 'y=3x+5' } },
  ],
}));

})();

// ══════════════════════════════════════════════════════════════════════════
//  Additional questions (crd-047 – crd-066) — difficulty 2–4, matching
//  NCE past-paper patterns:
//    • gradient from rearranged equations (2x−3y=6, x+2y=8, 3y=6x−9)
//    • gradient involving negative/fractional results
//    • x-intercept and unknown coordinates on a line
//    • equation from two points with negative gradient
//    • multi-part "gradient → equation → point/intercept" problems
//    • applied context (taxi fares, practical-graph pattern)
// ══════════════════════════════════════════════════════════════════════════
(function () {

const CH = 'g9m-coordinates';

// [ id, subsection, difficulty, marks, prompt, answer, accept[], hint, explanation ]
const ITEMS2 = [

  // ── gradient ────────────────────────────────────────────────────────────
  ['g9m-crd-047', 'gradient', 2, 2,
   'Find the gradient of the line joining (2, 1) and (6, 9).',
   '2', [],
   'Rise divided by run.',
   'Gradient = (9 &minus; 1) &divide; (6 &minus; 2) = 8 &divide; 4 = 2.'],

  ['g9m-crd-048', 'gradient', 3, 2,
   'Find the gradient of the line joining (&minus;1, 3) and (5, &minus;3).',
   '-1', [],
   'The line falls &mdash; expect a negative answer.',
   'Gradient = (&minus;3 &minus; 3) &divide; (5 &minus; (&minus;1)) = &minus;6 &divide; 6 = &minus;1.'],

  ['g9m-crd-049', 'gradient', 3, 2,
   'Find the gradient of the line 2<i>x</i> &minus; 3<i>y</i> = 6.',
   '2/3', [],
   'Make y the subject first.',
   'Rearranging: 3y = 2x &minus; 6, so y = <sup>2</sup>&frasl;<sub>3</sub>x &minus; 2. The gradient is <sup>2</sup>&frasl;<sub>3</sub>.'],

  ['g9m-crd-050', 'gradient', 3, 2,
   'Find the gradient of the line <i>x</i> + 2<i>y</i> = 8.',
   '-1/2', ['-0.5'],
   'Make y the subject first.',
   'Rearranging: 2y = &minus;x + 8, so y = &minus;<sup>1</sup>&frasl;<sub>2</sub>x + 4. The gradient is &minus;<sup>1</sup>&frasl;<sub>2</sub>.'],

  ['g9m-crd-051', 'gradient', 3, 2,
   'Find the gradient of the line joining (4, &minus;1) and (&minus;2, &minus;4).',
   '1/2', ['0.5'],
   'Subtract in the same order; dividing two negatives gives a positive.',
   'Gradient = (&minus;4 &minus; (&minus;1)) &divide; (&minus;2 &minus; 4) = &minus;3 &divide; &minus;6 = <sup>1</sup>&frasl;<sub>2</sub>.'],

  ['g9m-crd-058', 'gradient', 3, 2,
   'Find the gradient of the line 3<i>y</i> = 6<i>x</i> &minus; 9.',
   '2', [],
   'Divide every term by 3.',
   'Dividing throughout by 3 gives y = 2x &minus; 3, so the gradient is 2.'],

  ['g9m-crd-063', 'gradient', 2, 2,
   'Find the gradient of the line joining (0, &minus;3) and (5, 7).',
   '2', [],
   'One point is on the y-axis.',
   'Gradient = (7 &minus; (&minus;3)) &divide; (5 &minus; 0) = 10 &divide; 5 = 2.'],

  // ── equation_of_line ────────────────────────────────────────────────────
  ['g9m-crd-052', 'equation_of_line', 2, 1,
   'Find the <i>x</i>-intercept of the line <i>y</i> = 2<i>x</i> &minus; 6.',
   '3', [],
   'Set y = 0 and solve for x.',
   'Setting y = 0: 0 = 2x &minus; 6, so x = 3.'],

  ['g9m-crd-053', 'equation_of_line', 2, 1,
   'Find the <i>x</i>-intercept of the line <i>y</i> = &minus;<i>x</i> + 5.',
   '5', [],
   'Set y = 0 and solve for x.',
   'Setting y = 0: 0 = &minus;x + 5, so x = 5.'],

  ['g9m-crd-054', 'equation_of_line', 3, 2,
   'The point (3, <i>k</i>) lies on the line <i>y</i> = 2<i>x</i> &minus; 1. Find the value of <i>k</i>.',
   '5', [],
   'Substitute x = 3 into the equation.',
   'y = 2(3) &minus; 1 = 5, so k = 5.'],

  ['g9m-crd-055', 'equation_of_line', 3, 2,
   'The point (<i>k</i>, 3) lies on the line <i>y</i> = &minus;<i>x</i> + 7. Find the value of <i>k</i>.',
   '4', [],
   'Substitute y = 3 and solve for x.',
   '3 = &minus;k + 7, so k = 4.'],

  ['g9m-crd-056', 'equation_of_line', 4, 3,
   'Find the equation of the line passing through (1, 4) and (3, &minus;2).',
   'y=-3x+7', [],
   'Find the gradient first, then substitute one point to find c.',
   'Gradient = (&minus;2 &minus; 4) &divide; (3 &minus; 1) = &minus;3. Substituting (1, 4): 4 = &minus;3 + c, so c = 7 and the equation is y = &minus;3x + 7.'],

  ['g9m-crd-057', 'equation_of_line', 3, 2,
   'A line has gradient &minus;1 and passes through (3, 2). Find its equation.',
   'y=-x+5', [],
   'Substitute m = &minus;1 and the point into y = mx + c.',
   'Using y = &minus;x + c with (3, 2): 2 = &minus;3 + c, so c = 5 and the equation is y = &minus;x + 5.'],

  ['g9m-crd-064', 'equation_of_line', 3, 2,
   'A line has gradient &minus;3 and passes through (&minus;1, 5). Find its equation.',
   'y=-3x+2', [],
   'Take care with the double negative when you substitute.',
   'Substituting: 5 = &minus;3(&minus;1) + c = 3 + c, so c = 2 and the equation is y = &minus;3x + 2.'],

  ['g9m-crd-065', 'equation_of_line', 3, 2,
   'Find the equation of the line parallel to <i>y</i> = 4<i>x</i> &minus; 1 that passes through (2, 3).',
   'y=4x-5', [],
   'Parallel means the same gradient; substitute the point to find c.',
   'Gradient = 4. Substituting (2, 3): 3 = 4(2) + c = 8 + c, so c = &minus;5 and the equation is y = 4x &minus; 5.'],

  ['g9m-crd-066', 'equation_of_line', 2, 1,
   'Find the <i>y</i>-intercept of the line passing through (2, 3) and (4, 7).',
   '-1', [],
   'Find the gradient first, then find c.',
   'Gradient = (7 &minus; 3) &divide; (4 &minus; 2) = 2. Substituting (2, 3): 3 = 4 + c, so c = &minus;1.'],
];

const isNumeric2 = a => /^-?[\d.\/]+$/.test(a);

ITEMS2.forEach(([id, subsection, difficulty, marks, prompt, answer, accept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection, difficulty,
    source: 'NCF Grades 7-9 §3.9 Geometry: Coordinates; NCE past-paper level.',
    parts: [{
      label: 'a', prompt, marks, hint, explanation,
      response: { kind: isNumeric2(answer) ? 'number' : 'expression', answer, accept },
    }],
  }));
});

// ── Multi-part problems (NCE 2025 Q18 / 2024 Q26 patterns) ───────────────

STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-crd-059', chapterId: CH, subsection: 'equation_of_line', difficulty: 4,
  source: 'NCF §3.9 Coordinates; NCE 2025 Q18 "gradient → equation → point on line" pattern.',
  parts: [
    { label: 'a',
      prompt: 'A line passes through <b>A</b> (1, 2) and <b>B</b> (5, 10). Find the <b>gradient</b> of <b>AB</b>.',
      marks: 2,
      hint: 'Subtract the y values and the x values in the same order.',
      explanation: 'Gradient = (10 &minus; 2) &divide; (5 &minus; 1) = 8 &divide; 4 = 2.',
      response: { kind: 'number', answer: '2' } },
    { label: 'b',
      prompt: 'Find the equation of the line <b>AB</b>.',
      marks: 2, dependsOn: 'a',
      hint: 'Use y = 2x + c and substitute one of the two points.',
      explanation: 'With m = 2, substituting A (1, 2): 2 = 2(1) + c = 2 + c, so c = 0 and the equation is y = 2x.',
      response: { kind: 'expression', answer: 'y=2x' } },
    { label: 'c',
      prompt: 'The point <b>C</b> (3, <i>k</i>) lies on the line <b>AB</b>. Find the value of <i>k</i>.',
      marks: 1, dependsOn: 'b',
      hint: 'Substitute x = 3 into your equation.',
      explanation: 'Substituting x = 3 into y = 2x: k = 2(3) = 6.',
      response: { kind: 'number', answer: '6', label: 'k' } },
  ],
}));

STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-crd-060', chapterId: CH, subsection: 'gradient', difficulty: 4,
  source: 'NCF §3.9 Coordinates; NCE 2024 Q26 "rearrange → gradient → parallel" pattern.',
  parts: [
    { label: 'a',
      prompt: 'Find the gradient of the line 2<i>y</i> = 4<i>x</i> + 10.',
      marks: 2,
      hint: 'Divide every term by 2 to get the form y = mx + c.',
      explanation: 'Dividing throughout by 2 gives y = 2x + 5, so the gradient is 2.',
      response: { kind: 'number', answer: '2' } },
    { label: 'b',
      prompt: 'Find the equation of the line parallel to 2<i>y</i> = 4<i>x</i> + 10 that passes through (1, &minus;1).',
      marks: 2, dependsOn: 'a',
      hint: 'Parallel lines share the same gradient; substitute the point to find c.',
      explanation: 'Gradient = 2. Substituting (1, &minus;1): &minus;1 = 2(1) + c = 2 + c, so c = &minus;3 and the equation is y = 2x &minus; 3.',
      response: { kind: 'expression', answer: 'y=2x-3' } },
  ],
}));

STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-crd-061', chapterId: CH, subsection: 'equation_of_line', difficulty: 4,
  source: 'NCF §3.9 Coordinates; NCE 2025 Q18 pattern — gradient, equation, x-intercept.',
  parts: [
    { label: 'a',
      prompt: 'A line passes through <b>A</b> (0, 2) and <b>B</b> (4, 6). Find the <b>gradient</b> of <b>AB</b>.',
      marks: 1,
      hint: 'One point is on the y-axis, so c is immediate.',
      explanation: 'Gradient = (6 &minus; 2) &divide; (4 &minus; 0) = 4 &divide; 4 = 1.',
      response: { kind: 'number', answer: '1' } },
    { label: 'b',
      prompt: 'Find the equation of the line <b>AB</b>.',
      marks: 1, dependsOn: 'a',
      hint: 'The point (0, 2) gives c = 2 straight away.',
      explanation: 'With m = 1 and y-intercept 2, the equation is y = x + 2.',
      response: { kind: 'expression', answer: 'y=x+2' } },
    { label: 'c',
      prompt: 'Find the coordinates of the point where <b>AB</b> crosses the <i>x</i>-axis.',
      marks: 1, dependsOn: 'b',
      hint: 'Set y = 0 in your equation.',
      explanation: 'Setting y = 0: 0 = x + 2, so x = &minus;2. The line crosses the x-axis at (&minus;2, 0).',
      response: { kind: 'expression', answer: '(-2,0)', accept: ['(-2, 0)', '-2, 0'] } },
  ],
}));

STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-crd-062', chapterId: CH, subsection: 'equation_of_line', difficulty: 4,
  source: 'NCF §3.9 Straight-line graphs in practical situations; NCE 2025 Q29 applied pattern.',
  parts: [
    { label: 'a',
      prompt: 'A taxi charges a fixed amount plus a rate per kilometre. A 3 km journey costs Rs 150 and a 7 km journey costs Rs 290. Find the gradient of the cost&ndash;distance graph.',
      marks: 2,
      hint: 'Treat the two journeys as the points (3, 150) and (7, 290) on a straight line.',
      explanation: 'Gradient = (290 &minus; 150) &divide; (7 &minus; 3) = 140 &divide; 4 = 35. The taxi charges Rs 35 per km.',
      response: { kind: 'number', answer: '35' } },
    { label: 'b',
      prompt: 'Find the equation of the cost <i>C</i> (in rupees) in terms of distance <i>d</i> (in km).',
      marks: 2, dependsOn: 'a',
      hint: 'Use C = 35d + c and substitute one of the given journeys.',
      explanation: 'Substituting (3, 150): 150 = 35(3) + c = 105 + c, so c = 45. The equation is C = 35d + 45.',
      response: { kind: 'expression', answer: 'C=35d+45' } },
  ],
}));

})();
