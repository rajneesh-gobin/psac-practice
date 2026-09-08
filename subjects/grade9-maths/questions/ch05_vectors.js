'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - Vectors & Translation
//
//  Syllabus: NCF Grades 7-9, §3.9 "Geometry: Vectors and Translation"
//  (PDF p.49, printed 43): scalar vs vector; column form; magnitude of a
//  vector; describing a translation, and finding the image, the object or the
//  translation vector when the other two are given.
//
//  ⚠ THE PAPERS ASK FOR MORE THAN THE SYLLABUS LISTS. §3.9 does not mention
//    adding, subtracting or scaling vectors, but NCE 2025 Q16 asks for P - Q
//    and 2Q and is worth 4 marks. Those items are here deliberately, and
//    docs/nce-grade9/syllabus-map.md records the discrepancy rather than
//    quietly resolving it.
//
//  Paper style: NCE 2025 Q16 (column vector arithmetic, 2 marks a part) and
//  Q20 (a squared grid showing A mapped to B, then TICK the correct column
//  vector, then find its magnitude).
//
//  ⚠ A column vector is written (x, y) in the answer here rather than stacked,
//    because a child types it on one line. Every item accepts the spaced and
//    unspaced forms.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9m-vectors';

// ── A squared grid carrying a translation arrow from A to B ──────────────
// Original SVG. Monochrome, because a generated paper prints in black only.
function translationGrid(ax, ay, bx, by, xMax, yMax) {
  const cell = 30, pad = 16;
  const w = xMax * cell + pad * 2, h = yMax * cell + pad * 2;
  const X = x => pad + x * cell;
  const Y = y => h - pad - y * cell;
  let g = '';
  for (let x = 0; x <= xMax; x++) g += `<line x1="${X(x)}" y1="${Y(0)}" x2="${X(x)}" y2="${Y(yMax)}" stroke="#b5b5b5" stroke-width="0.7"/>`;
  for (let y = 0; y <= yMax; y++) g += `<line x1="${X(0)}" y1="${Y(y)}" x2="${X(xMax)}" y2="${Y(y)}" stroke="#b5b5b5" stroke-width="0.7"/>`;
  g += `<defs><marker id="vArrow" markerWidth="9" markerHeight="9" refX="7" refY="3.2" orient="auto">`
     + `<path d="M0,0 L7,3.2 L0,6.4 z" fill="#000"/></marker></defs>`;
  g += `<line x1="${X(ax)}" y1="${Y(ay)}" x2="${X(bx)}" y2="${Y(by)}" stroke="#000" stroke-width="1.8" marker-end="url(#vArrow)"/>`;
  g += `<circle cx="${X(ax)}" cy="${Y(ay)}" r="3.2" fill="#000"/>`;
  g += `<circle cx="${X(bx)}" cy="${Y(by)}" r="3.2" fill="#000"/>`;
  g += `<text x="${X(ax) - 9}" y="${Y(ay) + 15}" font-size="13" font-weight="bold">A</text>`;
  g += `<text x="${X(bx) + 6}" y="${Y(by) - 6}" font-size="13" font-weight="bold">B</text>`;
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" role="img">${g}</svg>`;
}
const ALT_GRID = 'A squared grid with two marked points, A and B, joined by an arrow pointing from A to B.';

// A column vector as the papers print it, stacked inside brackets.
const col = (a, b) => `<span style="display:inline-block;vertical-align:middle;font-size:1.5em;line-height:.8">(</span>`
  + `<span style="display:inline-block;vertical-align:middle;text-align:center;line-height:1.15;margin:0 1px">${a}<br>${b}</span>`
  + `<span style="display:inline-block;vertical-align:middle;font-size:1.5em;line-height:.8">)</span>`;

// Accept the spaced, unspaced and stacked-typed forms of a column vector.
const vecAccept = (x, y) => [`(${x},${y})`, `${x},${y}`, `${x} ${y}`];

// [ id, subsection, difficulty, marks, prompt, answer, accept[], hint, explanation, unit ]
const ITEMS = [

  // ── column_vectors ──────────────────────────────────────────────────────
  ['g9m-vec-001', 'column_vectors', 2, 2,
   `<b>P</b> = ${col(8, '&minus;5')} and <b>Q</b> = ${col(3, 2)}. Find <b>P</b> &minus; <b>Q</b>.`,
   '(5, -7)', vecAccept(5, -7), 'Subtract the top numbers, then the bottom numbers.',
   'Top: 8 &minus; 3 = 5. Bottom: &minus;5 &minus; 2 = &minus;7. So P &minus; Q = (5, &minus;7).'],

  ['g9m-vec-002', 'column_vectors', 2, 2,
   `<b>P</b> = ${col(8, '&minus;5')} and <b>Q</b> = ${col(3, 2)}. Find <b>P</b> + <b>Q</b>.`,
   '(11, -3)', vecAccept(11, -3), 'Add the top numbers, then the bottom numbers.',
   'Top: 8 + 3 = 11. Bottom: &minus;5 + 2 = &minus;3. So P + Q = (11, &minus;3).'],

  ['g9m-vec-003', 'column_vectors', 2, 2, `<b>Q</b> = ${col(3, 2)}. Find 2<b>Q</b>.`,
   '(6, 4)', vecAccept(6, 4), 'Multiply both numbers by 2.',
   '2Q means doubling each component: 2 &times; 3 = 6 and 2 &times; 2 = 4, giving (6, 4).'],

  ['g9m-vec-004', 'column_vectors', 2, 2, `Find the <b>magnitude</b> of the vector ${col(3, 4)}.`,
   '5', [], 'Use Pythagoras on the two components.',
   'Magnitude = &radic;(3&sup2; + 4&sup2;) = &radic;(9 + 16) = &radic;25 = 5.'],

  ['g9m-vec-005', 'column_vectors', 2, 2, `Find the <b>magnitude</b> of the vector ${col(6, 8)}.`,
   '10', [], 'Square each component, add, then take the square root.',
   'Magnitude = &radic;(6&sup2; + 8&sup2;) = &radic;(36 + 64) = &radic;100 = 10.'],

  ['g9m-vec-006', 'column_vectors', 3, 2, `Find the <b>magnitude</b> of the vector ${col(5, 12)}.`,
   '13', [], '5, 12 and 13 form a right-angled triangle.',
   'Magnitude = &radic;(5&sup2; + 12&sup2;) = &radic;(25 + 144) = &radic;169 = 13.'],

  ['g9m-vec-007', 'column_vectors', 3, 2,
   `<b>a</b> = ${col(2, 3)} and <b>b</b> = ${col(1, '&minus;1')}. Find <b>a</b> + <b>b</b>.`,
   '(3, 2)', vecAccept(3, 2), 'Add the components in pairs.',
   'Top: 2 + 1 = 3. Bottom: 3 + (&minus;1) = 2. So a + b = (3, 2).'],

  ['g9m-vec-008', 'column_vectors', 3, 2,
   `<b>a</b> = ${col(2, 3)} and <b>b</b> = ${col(1, '&minus;1')}. Find <b>a</b> &minus; <b>b</b>.`,
   '(1, 4)', vecAccept(1, 4), 'Subtracting a negative adds.',
   'Top: 2 &minus; 1 = 1. Bottom: 3 &minus; (&minus;1) = 4. So a &minus; b = (1, 4).'],

  ['g9m-vec-009', 'column_vectors', 2, 2, `<b>a</b> = ${col(2, '&minus;1')}. Find 3<b>a</b>.`,
   '(6, -3)', vecAccept(6, -3), 'Multiply each component by 3.',
   '3 &times; 2 = 6 and 3 &times; (&minus;1) = &minus;3, giving (6, &minus;3).'],

  ['g9m-vec-010', 'column_vectors', 3, 2, `Find the <b>magnitude</b> of the vector ${col(8, 15)}.`,
   '17', [], 'Square both, add, then take the square root.',
   'Magnitude = &radic;(8&sup2; + 15&sup2;) = &radic;(64 + 225) = &radic;289 = 17.'],

  ['g9m-vec-011', 'column_vectors', 1, 1, `<b>m</b> = ${col(4, 0)}. Write down |<b>m</b>|.`,
   '4', [], 'The vector points straight along one axis.',
   '|m| = &radic;(4&sup2; + 0&sup2;) = &radic;16 = 4.'],

  ['g9m-vec-012', 'column_vectors', 2, 1, `<b>n</b> = ${col(0, '&minus;7')}. Write down |<b>n</b>|.`,
   '7', [], 'A magnitude is a length, so it is never negative.',
   '|n| = &radic;(0&sup2; + (&minus;7)&sup2;) = &radic;49 = 7. A magnitude is a length and cannot be negative.'],

  ['g9m-vec-013', 'column_vectors', 1, 1, `<b>a</b> = ${col(1, 2)}. Write down &minus;<b>a</b>.`,
   '(-1, -2)', vecAccept(-1, -2), 'Change the sign of both components.',
   'Negating a vector reverses it: &minus;a = (&minus;1, &minus;2).'],

  ['g9m-vec-014', 'column_vectors', 4, 3,
   `<b>a</b> = ${col(1, 1)} and <b>b</b> = ${col(2, 3)}. Find 2<b>a</b> + <b>b</b>.`,
   '(4, 5)', vecAccept(4, 5), 'Work out 2a first, then add b.',
   '2a = (2, 2). Adding b: top 2 + 2 = 4, bottom 2 + 3 = 5, giving (4, 5).'],

  ['g9m-vec-015', 'column_vectors', 3, 2, `Find the <b>magnitude</b> of the vector ${col(9, 12)}.`,
   '15', [], 'This is a 3-4-5 triangle scaled by 3.',
   'Magnitude = &radic;(9&sup2; + 12&sup2;) = &radic;(81 + 144) = &radic;225 = 15.'],

  ['g9m-vec-016', 'column_vectors', 3, 2,
   `<b>a</b> = ${col(5, '&minus;2')} and <b>b</b> = ${col('&minus;3', 4)}. Find <b>a</b> + <b>b</b>.`,
   '(2, 2)', vecAccept(2, 2), 'Add each pair, watching the signs.',
   'Top: 5 + (&minus;3) = 2. Bottom: &minus;2 + 4 = 2. So a + b = (2, 2).'],

  ['g9m-vec-017', 'column_vectors', 2, 2, `<b>a</b> = ${col('&minus;1', 3)}. Find 4<b>a</b>.`,
   '(-4, 12)', vecAccept(-4, 12), 'Multiply both components by 4.',
   '4 &times; (&minus;1) = &minus;4 and 4 &times; 3 = 12, giving (&minus;4, 12).'],

  ['g9m-vec-018', 'column_vectors', 3, 2, `Find the <b>magnitude</b> of the vector ${col('&minus;3', 4)}.`,
   '5', [], 'Squaring removes the minus sign.',
   'Magnitude = &radic;((&minus;3)&sup2; + 4&sup2;) = &radic;(9 + 16) = &radic;25 = 5.'],

  ['g9m-vec-019', 'column_vectors', 3, 2,
   `<b>p</b> = ${col(6, 1)} and <b>q</b> = ${col(2, 5)}. Find <b>p</b> &minus; <b>q</b>.`,
   '(4, -4)', vecAccept(4, -4), 'Subtract in the order given.',
   'Top: 6 &minus; 2 = 4. Bottom: 1 &minus; 5 = &minus;4. So p &minus; q = (4, &minus;4).'],

  ['g9m-vec-020', 'column_vectors', 4, 3,
   `<b>a</b> = ${col(3, '&minus;1')} and <b>b</b> = ${col(1, 2)}. Find 2<b>a</b> &minus; <b>b</b>.`,
   '(5, -4)', vecAccept(5, -4), 'Double a first, then subtract b.',
   '2a = (6, &minus;2). Subtracting b: top 6 &minus; 1 = 5, bottom &minus;2 &minus; 2 = &minus;4, giving (5, &minus;4).'],

  // ── translation ─────────────────────────────────────────────────────────
  ['g9m-vec-021', 'translation', 2, 2,
   `The point <b>A</b> (1, 2) is translated by the vector ${col(3, 4)}. Find the coordinates of its <b>image</b>.`,
   '(4, 6)', vecAccept(4, 6), 'Add the vector to the coordinates of A.',
   'Adding: (1 + 3, 2 + 4) = (4, 6).'],

  ['g9m-vec-022', 'translation', 3, 2,
   `The point <b>A</b> (2, &minus;1) is translated by the vector ${col('&minus;3', 5)}. Find the coordinates of its <b>image</b>.`,
   '(-1, 4)', vecAccept(-1, 4), 'Add each component, watching the signs.',
   'Adding: (2 + (&minus;3), &minus;1 + 5) = (&minus;1, 4).'],

  ['g9m-vec-023', 'translation', 4, 3,
   `A point <b>A</b> is mapped onto <b>B</b> (5, 7) by the translation ${col(2, 3)}. Find the coordinates of <b>A</b>.`,
   '(3, 4)', vecAccept(3, 4), 'To go backwards, subtract the translation vector.',
   'A = B &minus; the vector = (5 &minus; 2, 7 &minus; 3) = (3, 4).'],

  ['g9m-vec-024', 'translation', 2, 2,
   'The point <b>A</b> (1, 1) is mapped onto <b>B</b> (4, 5). Find the <b>translation vector</b>.',
   '(3, 4)', vecAccept(3, 4), 'Subtract the coordinates of A from those of B.',
   'The vector is B &minus; A = (4 &minus; 1, 5 &minus; 1) = (3, 4).'],

  ['g9m-vec-025', 'translation', 2, 1,
   'A translation moves every point 4 units to the <b>right</b> and 2 units <b>down</b>. Write this translation as a column vector.',
   '(4, -2)', vecAccept(4, -2), 'Right is positive across; down is negative up the page.',
   'Moving right is a positive x component and moving down is a negative y component, so the vector is (4, &minus;2).'],

  ['g9m-vec-026', 'translation', 3, 2,
   'The point <b>P</b> (4, 3) is mapped onto <b>Q</b> (1, 8). Find the <b>translation vector</b>.',
   '(-3, 5)', vecAccept(-3, 5), 'Image minus object.',
   'The vector is Q &minus; P = (1 &minus; 4, 8 &minus; 3) = (&minus;3, 5).'],

  ['g9m-vec-027', 'translation', 3, 2,
   `The point <b>A</b> (&minus;2, &minus;3) is translated by ${col(5, 1)}. Find the coordinates of its <b>image</b>.`,
   '(3, -2)', vecAccept(3, -2), 'Add the vector to A.',
   'Adding: (&minus;2 + 5, &minus;3 + 1) = (3, &minus;2).'],

  ['g9m-vec-028', 'translation', 4, 3,
   `A point <b>A</b> is mapped onto <b>B</b> (0, 0) by the translation ${col('&minus;4', 6)}. Find the coordinates of <b>A</b>.`,
   '(4, -6)', vecAccept(4, -6), 'Subtract the vector from B.',
   'A = B &minus; the vector = (0 &minus; (&minus;4), 0 &minus; 6) = (4, &minus;6).'],

  ['g9m-vec-029', 'translation', 2, 1,
   `A translation is given by ${col(0, 0)}. Describe its effect on any point.`,
   'no change', ['none', 'it does not move', 'stays the same'],
   'What happens when you add nothing to a point?',
   'Adding (0, 0) leaves every coordinate unchanged, so the point does not move.'],

  ['g9m-vec-030', 'translation', 3, 2,
   'The point <b>M</b> (7, &minus;2) is mapped onto <b>N</b> (7, 5). Find the <b>translation vector</b>.',
   '(0, 7)', vecAccept(0, 7), 'The x-coordinate does not change.',
   'The vector is N &minus; M = (7 &minus; 7, 5 &minus; (&minus;2)) = (0, 7).'],

  ['g9m-vec-035', 'translation', 2, 2,
   `The point <b>A</b> (3, 1) is translated by the vector ${col(2, '&minus;4')}. Find the coordinates of its <b>image</b>.`,
   '(5, -3)', vecAccept(5, -3), 'Add the vector to A, watching the negative.',
   'Adding: (3 + 2, 1 + (&minus;4)) = (5, &minus;3).'],

  ['g9m-vec-036', 'translation', 2, 2,
   `The point <b>A</b> (&minus;1, 0) is translated by the vector ${col(0, 6)}. Find the coordinates of its <b>image</b>.`,
   '(-1, 6)', vecAccept(-1, 6), 'The x-coordinate is unchanged.',
   'Adding: (&minus;1 + 0, 0 + 6) = (&minus;1, 6).'],

  ['g9m-vec-037', 'translation', 2, 2,
   'The point <b>P</b> (2, 2) is mapped onto <b>Q</b> (6, 2). Find the <b>translation vector</b>.',
   '(4, 0)', vecAccept(4, 0), 'Only one coordinate has changed.',
   'The vector is Q &minus; P = (6 &minus; 2, 2 &minus; 2) = (4, 0).'],

  ['g9m-vec-038', 'translation', 3, 2,
   'The point <b>A</b> (5, 5) is mapped onto <b>B</b> (1, 1). Find the <b>translation vector</b>.',
   '(-4, -4)', vecAccept(-4, -4), 'The point has moved left and down, so expect two negatives.',
   'The vector is B &minus; A = (1 &minus; 5, 1 &minus; 5) = (&minus;4, &minus;4).'],

  ['g9m-vec-039', 'translation', 3, 2,
   `A point is mapped onto (3, 3) by the translation ${col(1, 1)}. Find the coordinates of the <b>object</b>.`,
   '(2, 2)', vecAccept(2, 2), 'To go backwards, subtract the vector.',
   'Object = image &minus; vector = (3 &minus; 1, 3 &minus; 1) = (2, 2).'],

  ['g9m-vec-040', 'translation', 4, 3,
   `A point is mapped onto (&minus;2, 4) by the translation ${col(3, '&minus;1')}. Find the coordinates of the <b>object</b>.`,
   '(-5, 5)', vecAccept(-5, 5), 'Subtract the vector from the image, watching both signs.',
   'Object = image &minus; vector = (&minus;2 &minus; 3, 4 &minus; (&minus;1)) = (&minus;5, 5).'],

  ['g9m-vec-041', 'translation', 2, 2,
   `The point <b>A</b> (0, 4) is translated by the vector ${col(6, '&minus;4')}. Find the coordinates of its <b>image</b>.`,
   '(6, 0)', vecAccept(6, 0), 'Add each component.',
   'Adding: (0 + 6, 4 + (&minus;4)) = (6, 0).'],

  ['g9m-vec-042', 'translation', 3, 2,
   `A vertex of a triangle is at <b>T</b> (&minus;3, 2). The triangle is translated by ${col(5, 3)}. Find the coordinates of the image of <b>T</b>.`,
   '(2, 5)', vecAccept(2, 5), 'Translate the vertex like any other point.',
   'Adding: (&minus;3 + 5, 2 + 3) = (2, 5).'],

  ['g9m-vec-043', 'translation', 2, 2,
   'The point <b>A</b> (7, 1) is mapped onto <b>B</b> (7, 9). Find the <b>translation vector</b>.',
   '(0, 8)', vecAccept(0, 8), 'The point moves straight up.',
   'The vector is B &minus; A = (7 &minus; 7, 9 &minus; 1) = (0, 8).'],
];

ITEMS.forEach(([id, subsection, difficulty, marks, prompt, answer, accept, hint, explanation]) => {
  const isNumeric = /^-?[\d.\/]+$/.test(answer);
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection, difficulty,
    source: 'NCF Grades 7-9 §3.9 Geometry: Vectors and Translation; NCE 2025 Q16 and Q20 pattern.',
    parts: [{
      label: 'a', prompt, marks, hint, explanation,
      response: { kind: isNumeric ? 'number' : 'expression', answer, accept },
    }],
  }));
});

// ── Scalar vs vector: the syllabus's own first outcome, as MCQ ───────────
const MCQ = [
  ['g9m-vec-031', 'column_vectors', 'Which of the following is a <b>vector</b> quantity?',
   ['Force', 'Mass', 'Temperature', 'Time'], 'Force',
   'A vector has a direction as well as a size.',
   'Force has both size and direction, so it is a vector. Mass, temperature and time have size only, so they are scalars.'],

  ['g9m-vec-032', 'column_vectors', 'Which of the following is a <b>scalar</b> quantity?',
   ['Speed', 'Velocity', 'Displacement', 'Acceleration'], 'Speed',
   'A scalar has size but no direction.',
   'Speed tells you how fast, but not which way, so it is a scalar. Velocity, displacement and acceleration all carry a direction and are vectors.'],
];

MCQ.forEach(([id, subsection, prompt, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection, difficulty: 2,
    source: 'NCF §3.9 Vectors, "distinguish between a scalar and a vector quantity".',
    parts: [{ label: 'a', prompt, marks: 1, hint, explanation,
              response: { kind: 'choice', variant: 'options', options, answer } }],
  }));
});

// ── The grid task: tick the column vector, then find its magnitude ───────
// NCE 2025 Q20 exactly: a squared grid showing A mapped to B, part (a) is
// TICK one of three column vectors, part (b) is the magnitude.
// ⚠ `variant: 'tick'` prints boxes to tick rather than a lettered A/B/C/D
//   list, which is what that question does on the page.
STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-vec-033', chapterId: CH, subsection: 'translation', difficulty: 3,
  source: 'NCF §3.9 Vectors and Translation; NCE 2025 Q20 grid + tick + magnitude.',
  intro: 'Point <b>A</b> is mapped onto point <b>B</b> under a translation <b>T</b>.',
  stimulus: { html: translationGrid(1, 1, 4, 5, 6, 6), altText: ALT_GRID },
  parts: [
    { label: 'a', prompt: 'Tick (&#10004;) the box which correctly indicates <b>T</b> expressed as a column vector.',
      marks: 1,
      hint: 'Count how far right, then how far up, the arrow goes.',
      explanation: 'From A (1, 1) to B (4, 5) the arrow moves 3 to the right and 4 up, so T = (3, 4).',
      response: { kind: 'choice', variant: 'tick',
                  options: [col(3, 4), col('&minus;3', '&minus;4'), col(4, 3)], answer: col(3, 4) } },
    { label: 'b', prompt: 'Find the <b>magnitude</b> of the column vector <b>T</b>.', marks: 2,
      dependsOn: 'a',
      hint: 'Use Pythagoras on the two components of T.',
      explanation: '|T| = &radic;(3&sup2; + 4&sup2;) = &radic;(9 + 16) = &radic;25 = 5.',
      response: { kind: 'number', answer: '5' } },
  ],
}));

// ── A three-level task: (a)(i), (a)(ii), (b) ─────────────────────────────
// ⚠ The papers reach depth 3 - NCE 2025 Q31 runs (a)(i), (a)(ii), (b) and
//   2024 Q26 runs (a)(i), (a)(ii), (b)(i), (b)(ii). The schema and the printer
//   both supported it from the start; until now no question used it, so the
//   compliance report showed "numbering depth 1" and nothing exercised the
//   deepest label the renderer can draw.
STATIC_QUESTIONS.push(makeTask({
  id: 'g9m-vec-034', chapterId: CH, subsection: 'column_vectors', difficulty: 4,
  source: 'NCF §3.9 Vectors; NCE 2025 Q31 three-level numbering pattern.',
  intro: `<b>a</b> = ${col(4, 3)} and <b>b</b> = ${col('&minus;2', 1)}.`,
  parts: [
    { label: 'a.i', prompt: 'Find <b>a</b> + <b>b</b>.', marks: 1,
      hint: 'Add the components in pairs.',
      explanation: 'Top: 4 + (&minus;2) = 2. Bottom: 3 + 1 = 4. So a + b = (2, 4).',
      response: { kind: 'expression', answer: '(2, 4)', accept: vecAccept(2, 4) } },
    { label: 'a.ii', prompt: 'Find 2<b>a</b> &minus; <b>b</b>.', marks: 2,
      hint: 'Double a first, then subtract b.',
      explanation: '2a = (8, 6). Subtracting b: top 8 &minus; (&minus;2) = 10, bottom 6 &minus; 1 = 5, giving (10, 5).',
      response: { kind: 'expression', answer: '(10, 5)', accept: vecAccept(10, 5) } },
    { label: 'b', prompt: 'Find the <b>magnitude</b> of <b>a</b>.', marks: 2,
      hint: 'Use Pythagoras on the components of a.',
      explanation: '|a| = &radic;(4&sup2; + 3&sup2;) = &radic;(16 + 9) = &radic;25 = 5.',
      response: { kind: 'number', answer: '5' } },
  ],
}));

})();
