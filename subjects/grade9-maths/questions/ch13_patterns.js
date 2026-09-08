'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - Patterns & Sequences
//
//  Syllabus: NCF Grades 7-9, §3.9 "Numbers: Patterns and Sequences"
//  (PDF p.48, printed 42): identify and complete Pascal's triangle; extend
//  given number patterns AND FIGURES and find the general term; find the
//  relation between ordered pairs of a sequence, including positive and
//  negative numbers.
//
//  Paper style: NCE 2025 Q15(a) is a sequence of ordered pairs with the last
//  pair left blank - "(2, 3), (3, 5), (4, 7), (......, ......)" - printed as
//  two blanks on one line, which is `kind: 'blanks'`.
//
//  ⚠ "AND FIGURES" is the half that needed a diagram. The syllabus asks a
//    child to extend a growing PATTERN, not only a list of numbers, so this
//    chapter draws dot patterns. Measured in batch 8, only 16 distinct
//    diagrams existed across the whole bank and the repeated-stimulus rate was
//    82.4%; a growing figure is a genuinely different picture each time.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9m-patterns';

// ── A row of growing dot figures. Original SVG, monochrome. ──────────────
// `shape(n)` returns the dot coordinates for figure n, in grid units.
function figureRow(shape, count, caption) {
  const cell = 13, gap = 26, pad = 12, labelH = 18;
  const figs = [];
  let width = pad;
  for (let n = 1; n <= count; n++) {
    const pts = shape(n);
    const w = (Math.max.apply(null, pts.map(p => p[0])) + 1) * cell;
    const h = (Math.max.apply(null, pts.map(p => p[1])) + 1) * cell;
    figs.push({ pts, w, h, x: width });
    width += w + gap;
  }
  const maxH = Math.max.apply(null, figs.map(f => f.h));
  const height = maxH + labelH + pad * 2;
  let g = '';
  figs.forEach((f, i) => {
    f.pts.forEach(([px, py]) => {
      g += `<circle cx="${f.x + px * cell + cell / 2}" cy="${pad + maxH - f.h + py * cell + cell / 2}" r="4.2" fill="#444" stroke="#000" stroke-width="0.8"/>`;
    });
    g += `<text x="${f.x + f.w / 2}" y="${pad + maxH + 14}" font-size="10.5" text-anchor="middle">${caption}${i + 1}</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" role="img">${g}</svg>`;
}

// Three shapes, so the pictures differ from item to item.
const SQUARE = n => { const p = []; for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) p.push([x, y]); return p; };
const LSHAPE = n => { const p = []; for (let x = 0; x < n; x++) p.push([x, n - 1]); for (let y = 0; y < n - 1; y++) p.push([0, y]); return p; };
const ROW3 = n => { const p = []; for (let y = 0; y < 3; y++) for (let x = 0; x < n; x++) p.push([x, y]); return p; };

const ALT_FIG = 'A row of dot patterns, each labelled Figure 1, Figure 2 and so on, with each figure larger than the one before.';

// [ id, difficulty, marks, prompt, response, hint, explanation, svg ]
const ITEMS = [
  ['g9m-pat-001', 1, 1, 'Write down the <b>next term</b> of the sequence 3, 7, 11, 15, &hellip;',
   { kind: 'number', answer: '19' }, 'What is added each time?',
   'Each term is 4 more than the one before, so the next term is 15 + 4 = 19.', null],

  ['g9m-pat-002', 3, 2, 'Find the <b><i>n</i>th term</b> of the sequence 3, 7, 11, 15, &hellip;',
   { kind: 'expression', answer: '4n-1' }, 'The common difference tells you what multiplies n.',
   'The terms go up by 4, so the nth term starts 4n. When n = 1, 4n = 4 but the term is 3, '
   + 'so the rule is 4n &minus; 1.', null],

  ['g9m-pat-003', 2, 1, 'Write down the <b>next term</b> of the sequence 2, 5, 8, 11, &hellip;',
   { kind: 'number', answer: '14' }, 'Look at the difference between terms.',
   'Each term is 3 more than the one before, so the next is 11 + 3 = 14.', null],

  ['g9m-pat-004', 3, 2, 'Find the <b><i>n</i>th term</b> of the sequence 2, 5, 8, 11, &hellip;',
   { kind: 'expression', answer: '3n-1' }, 'Difference 3, so start with 3n.',
   'The difference is 3, so the rule starts 3n. At n = 1 that gives 3 but the term is 2, '
   + 'so the nth term is 3n &minus; 1.', null],

  ['g9m-pat-005', 2, 1, 'Write down the <b>next term</b> of the sequence 20, 17, 14, 11, &hellip;',
   { kind: 'number', answer: '8' }, 'The sequence is going down.',
   'Each term is 3 less than the one before, so the next is 11 &minus; 3 = 8.', null],

  ['g9m-pat-006', 3, 2, 'Find the <b><i>n</i>th term</b> of the sequence 20, 17, 14, 11, &hellip;',
   { kind: 'expression', answer: '23-3n', accept: ['-3n+23'] },
   'A falling sequence has a negative multiple of n.',
   'The difference is &minus;3, so the rule starts &minus;3n. At n = 1 that gives &minus;3 '
   + 'but the term is 20, so the nth term is 23 &minus; 3n.', null],

  ['g9m-pat-007', 3, 2, 'Write down the <b>missing term</b> in the following sequence of ordered pairs.'
   + '<div style="margin:8px 0 0 12px">(2, 3), (3, 5), (4, 7), ( &hellip;&hellip; , &hellip;&hellip; )</div>',
   { kind: 'blanks', partial: false, answer: [['5'], ['9']] },
   'Look at how the first number changes, then how the second changes.',
   'The first numbers go up by 1, so the next is 5. The second numbers go up by 2, so the next is 9. '
   + 'The missing pair is (5, 9). The rule is y = 2x &minus; 1.', null],

  ['g9m-pat-008', 4, 2, 'For the sequence of ordered pairs (1, 4), (2, 7), (3, 10), find the <b>relation</b> '
   + 'between <i>x</i> and <i>y</i>.',
   { kind: 'expression', answer: 'y=3x+1' }, 'How much does y rise for each step in x?',
   'y increases by 3 each time x increases by 1, so y = 3x + c. Using (1, 4): 4 = 3 + c, '
   + 'so c = 1 and y = 3x + 1.', null],

  ['g9m-pat-009', 4, 2, 'For the sequence of ordered pairs (1, &minus;2), (2, &minus;4), (3, &minus;6), '
   + 'find the <b>relation</b> between <i>x</i> and <i>y</i>.',
   { kind: 'expression', answer: 'y=-2x' }, 'The y values are negative and doubling.',
   'Each y is &minus;2 times its x, so y = &minus;2x.', null],

  ['g9m-pat-010', 2, 1, 'Write down the <b>next row</b> of Pascal&rsquo;s triangle after 1, 3, 3, 1.',
   { kind: 'blanks', partial: false, answer: [['1'], ['4'], ['6'], ['4'], ['1']] },
   'Each number is the sum of the two above it, and every row starts and ends with 1.',
   'Adding neighbouring pairs of 1, 3, 3, 1 gives 4, 6, 4, and a 1 at each end: 1, 4, 6, 4, 1.', null],

  ['g9m-pat-011', 3, 2, 'In Pascal&rsquo;s triangle, write down the <b>missing number</b> in the row '
   + '1, 5, &hellip;&hellip;, 10, 5, 1.',
   { kind: 'number', answer: '10' }, 'The row is symmetrical.',
   'Each row of Pascal&rsquo;s triangle reads the same forwards and backwards, so the number '
   + 'matching the 10 near the end is also 10.', null],

  ['g9m-pat-012', 2, 1, 'The dot patterns below grow in a regular way. How many dots are in <b>Figure 4</b>?',
   { kind: 'number', answer: '16', unit: 'dots' }, 'Count the dots in each figure and look for the rule.',
   'The figures hold 1, 4 and 9 dots - the square numbers - so Figure 4 has 4 &times; 4 = 16 dots.',
   figureRow(SQUARE, 3, 'Figure ')],

  ['g9m-pat-013', 4, 2, 'For the dot patterns below, find the number of dots in <b>Figure <i>n</i></b>.',
   { kind: 'expression', answer: 'n^2' }, 'The counts are 1, 4, 9 &hellip;',
   'The numbers of dots are 1, 4 and 9, which are 1&sup2;, 2&sup2; and 3&sup2;, so Figure n has n&sup2; dots.',
   figureRow(SQUARE, 3, 'Figure ')],

  ['g9m-pat-014', 3, 2, 'The dot patterns below grow in a regular way. How many dots are in <b>Figure 5</b>?',
   { kind: 'number', answer: '9', unit: 'dots' }, 'Each figure adds two dots to the one before.',
   'The figures hold 1, 3 and 5 dots, going up by 2 each time, so Figure 4 has 7 and Figure 5 has 9 dots.',
   figureRow(LSHAPE, 3, 'Figure ')],

  ['g9m-pat-015', 4, 3, 'The dot patterns below form an L shape. Find an expression for the number of dots in <b>Figure <i>n</i></b>.',
   { kind: 'expression', answer: '2n-1' }, 'The counts go up by 2 each time.',
   'The counts are 1, 3, 5, rising by 2, so the rule starts 2n. At n = 1 that gives 2 but the '
   + 'figure has 1 dot, so the number of dots in Figure n is 2n &minus; 1.',
   figureRow(LSHAPE, 3, 'Figure ')],

  ['g9m-pat-016', 3, 2, 'The dot patterns below grow in a regular way. How many dots are in <b>Figure 6</b>?',
   { kind: 'number', answer: '18', unit: 'dots' }, 'Each figure is three rows deep.',
   'Each figure has 3 rows, with 1, 2 and 3 dots per row, giving 3, 6 and 9 dots. '
   + 'Figure 6 has 6 dots per row, so 3 &times; 6 = 18 dots.',
   figureRow(ROW3, 3, 'Figure ')],

  ['g9m-pat-017', 4, 2, 'Each of the dot patterns below has three rows. Find an expression for the number of dots in <b>Figure <i>n</i></b>.',
   { kind: 'expression', answer: '3n' }, 'Three rows, each getting one longer.',
   'Each figure has 3 rows of n dots, so Figure n has 3n dots.',
   figureRow(ROW3, 3, 'Figure ')],

  ['g9m-pat-018', 3, 2, 'Find the <b>10th term</b> of the sequence with <i>n</i>th term 5<i>n</i> + 2.',
   { kind: 'number', answer: '52' }, 'Substitute n = 10.',
   '5(10) + 2 = 50 + 2 = 52.', null],

  ['g9m-pat-019', 3, 2, 'The <i>n</i>th term of a sequence is 2<i>n</i><sup>2</sup>. Write down its <b>first three terms</b>.',
   { kind: 'blanks', partial: false, answer: [['2'], ['8'], ['18']] },
   'Substitute n = 1, 2 and 3 in turn.',
   '2(1)&sup2; = 2, 2(2)&sup2; = 8 and 2(3)&sup2; = 18, so the first three terms are 2, 8 and 18.', null],

  ['g9m-pat-020', 4, 3, 'The sequence 4, 9, 16, 25 continues in the same way. Find its <b><i>n</i>th term</b>.',
   { kind: 'expression', answer: '(n+1)^2', accept: ['n^2+2n+1'] },
   'These are square numbers, but not starting from 1.',
   'The terms are 2&sup2;, 3&sup2;, 4&sup2;, 5&sup2;. The number being squared is one more than n, '
   + 'so the nth term is (n + 1)&sup2;.', null],
];

ITEMS.forEach(([id, difficulty, marks, prompt, response, hint, explanation, svg]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection: 'sequences_and_figures', difficulty,
    source: "NCF Grades 7-9 §3.9 Numbers: Patterns and Sequences; NCE 2025 Q15(a) pattern.",
    stimulus: svg ? { html: svg, altText: ALT_FIG } : null,
    parts: [{ label: 'a', prompt, marks, hint, explanation, response }],
  }));
});

})();
