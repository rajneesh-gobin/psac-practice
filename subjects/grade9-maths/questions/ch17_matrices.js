'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Mathematics - Matrices
//
//  Syllabus: NCF Grades 7-9, §3.9 "Algebra: Matrices" (PDF p.51, printed 45):
//  interpret a matrix as a store of information; determine the ORDER of a
//  matrix; identify null, zero, square, identity, equal and diagonal matrices;
//  add, subtract and multiply matrices; solve a matrix equation by addition
//  and subtraction.
//
//  ⚠ THIS CONTENT AREA WAS MISSING FROM THE PACK. NCE 2025 Q4 is "State the
//    order of the matrix" [1] and 2024 Q24 is "Find 2A − B" [2].
//    See docs/nce-grade9/syllabus-map.md.
//
//  ⚠ An order is written "2 x 3" and read "two by three" - ROWS FIRST. Getting
//    that round the wrong way is the classic mistake, and several distractors
//    below are exactly that.
//
//  ⚠ A matrix answer is typed on one line as rows separated by a semicolon,
//    because a child cannot type a bracket two lines tall. The prompt shows the
//    matrix stacked as the papers print it; the answer line explains the
//    notation wherever it is needed.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9m-matrices';

// A matrix printed the way the papers do: stacked rows inside tall brackets.
function mat(rows) {
  const body = rows.map(r => r.join('&nbsp;&nbsp;')).join('<br>');
  return `<span style="display:inline-block;vertical-align:middle;font-size:2.1em;line-height:.72">(</span>`
       + `<span style="display:inline-block;vertical-align:middle;text-align:center;line-height:1.25;margin:0 2px">${body}</span>`
       + `<span style="display:inline-block;vertical-align:middle;font-size:2.1em;line-height:.72">)</span>`;
}
// Typed form: "1 2; 3 4". Accept a few spacings and a comma separator.
const matAns = rows => {
  const canon = rows.map(r => r.join(' ')).join('; ');
  return {
    kind: 'expression', answer: canon,
    accept: [rows.map(r => r.join(',')).join(';'),
             rows.map(r => r.join(' ')).join(';'),
             rows.map(r => r.join(', ')).join('; ')],
  };
};
const NOTE = '<div style="font-size:.9em;opacity:.85;margin-top:4px">'
  + 'Write your answer with a semicolon between the rows, for example <b>1 2; 3 4</b>.</div>';

// [ id, difficulty, marks, prompt, response, hint, explanation ]
const ITEMS = [
  ['g9m-mat-001', 1, 1, `State the <b>order</b> of the matrix. ${mat([[3], [1]])}`,
   { kind: 'expression', answer: '2x1', accept: ['2 x 1', '2*1', '2 by 1'] },
   'Count the rows first, then the columns.',
   'The matrix has 2 rows and 1 column, so its order is 2 &times; 1.'],

  ['g9m-mat-002', 1, 1, `State the <b>order</b> of the matrix. ${mat([[2, 5, 7]])}`,
   { kind: 'expression', answer: '1x3', accept: ['1 x 3', '1*3', '1 by 3'] },
   'Rows first, then columns.',
   'The matrix has 1 row and 3 columns, so its order is 1 &times; 3.'],

  ['g9m-mat-003', 2, 1, `State the <b>order</b> of the matrix. ${mat([[1, 2, 3], [4, 5, 6]])}`,
   { kind: 'expression', answer: '2x3', accept: ['2 x 3', '2*3', '2 by 3'] },
   'Two rows, three columns - and the rows come first.',
   'There are 2 rows and 3 columns, so the order is 2 &times; 3. Writing 3 &times; 2 '
   + 'is the usual mistake: the row count is always given first.'],

  ['g9m-mat-004', 2, 1, 'A matrix has order 3 &times; 4. How many <b>elements</b> does it contain?',
   { kind: 'number', answer: '12' }, 'Multiply the rows by the columns.',
   '3 rows of 4 elements gives 3 &times; 4 = 12 elements.'],

  ['g9m-mat-005', 2, 1, 'Which of these is a <b>square</b> matrix?',
   { kind: 'choice', variant: 'options',
     options: [mat([[1, 2], [3, 4]]), mat([[1, 2, 3]]), mat([[1], [2]]), mat([[1, 2, 3], [4, 5, 6]])],
     answer: mat([[1, 2], [3, 4]]) },
   'A square matrix has as many rows as columns.',
   'Only the 2 &times; 2 matrix has an equal number of rows and columns, so it is the square one.'],

  ['g9m-mat-006', 2, 1, 'Which of these is the 2 &times; 2 <b>identity</b> matrix?',
   { kind: 'choice', variant: 'options',
     options: [mat([[1, 0], [0, 1]]), mat([[0, 0], [0, 0]]), mat([[1, 1], [1, 1]]), mat([[0, 1], [1, 0]])],
     answer: mat([[1, 0], [0, 1]]) },
   'The identity has 1s down the leading diagonal and 0s elsewhere.',
   'The identity matrix has 1s on the leading diagonal, from top left to bottom right, '
   + 'and 0s everywhere else.'],

  ['g9m-mat-007', 2, 1, 'Which of these is a <b>null</b> (zero) matrix?',
   { kind: 'choice', variant: 'options',
     options: [mat([[0, 0], [0, 0]]), mat([[1, 0], [0, 1]]), mat([[0, 1], [1, 0]]), mat([[1, 1], [0, 0]])],
     answer: mat([[0, 0], [0, 0]]) },
   'Every element must be zero.',
   'A null matrix has 0 in every position.'],

  ['g9m-mat-008', 3, 1, 'Which of these is a <b>diagonal</b> matrix?',
   { kind: 'choice', variant: 'options',
     options: [mat([[3, 0], [0, 5]]), mat([[3, 2], [0, 5]]), mat([[0, 3], [5, 0]]), mat([[3, 3], [3, 3]])],
     answer: mat([[3, 0], [0, 5]]) },
   'Everything off the leading diagonal must be zero.',
   'A diagonal matrix has non-zero entries only on the leading diagonal and 0 everywhere else.'],

  ['g9m-mat-009', 2, 2, `Find <b>A</b> + <b>B</b>, where <b>A</b> = ${mat([[1, 2], [3, 4]])} and <b>B</b> = ${mat([[5, 6], [7, 8]])}.${NOTE}`,
   matAns([[6, 8], [10, 12]]), 'Add the numbers in matching positions.',
   'Adding element by element: 1+5 = 6, 2+6 = 8, 3+7 = 10 and 4+8 = 12, giving (6 8; 10 12).'],

  ['g9m-mat-010', 2, 2, `Find <b>A</b> &minus; <b>B</b>, where <b>A</b> = ${mat([[7, 5], [3, 2]])} and <b>B</b> = ${mat([[2, 1], [1, 4]])}.${NOTE}`,
   matAns([[5, 4], [2, -2]]), 'Subtract element by element, keeping the positions.',
   'Subtracting: 7&minus;2 = 5, 5&minus;1 = 4, 3&minus;1 = 2 and 2&minus;4 = &minus;2, '
   + 'giving (5 4; 2 &minus;2).'],

  ['g9m-mat-011', 2, 2, `Find 3<b>A</b>, where <b>A</b> = ${mat([[1, -2], [4, 0]])}.${NOTE}`,
   matAns([[3, -6], [12, 0]]), 'Multiply every element by 3.',
   'Multiplying each element by 3: (3 &minus;6; 12 0).'],

  ['g9m-mat-012', 3, 2, `Find 2<b>A</b> &minus; <b>B</b>, where <b>A</b> = ${mat([[2, -3], [0, 5]])} and <b>B</b> = ${mat([[-1, 4], [6, 2]])}.${NOTE}`,
   matAns([[5, -10], [-6, 8]]), 'Double A first, then subtract B element by element.',
   '2A = (4 &minus;6; 0 10). Subtracting B: 4&minus;(&minus;1) = 5, &minus;6&minus;4 = &minus;10, '
   + '0&minus;6 = &minus;6 and 10&minus;2 = 8, giving (5 &minus;10; &minus;6 8).'],

  ['g9m-mat-013', 3, 2, `Find <b>P</b> + <b>Q</b>, where <b>P</b> = ${mat([[8], [-5]])} and <b>Q</b> = ${mat([[3], [2]])}.${NOTE}`,
   matAns([[11], [-3]]), 'Add the top numbers, then the bottom numbers.',
   '8+3 = 11 and &minus;5+2 = &minus;3, giving (11; &minus;3).'],

  ['g9m-mat-014', 3, 3, `Solve the matrix equation <b>X</b> + ${mat([[1, 2], [3, 4]])} = ${mat([[5, 7], [9, 11]])} for <b>X</b>.${NOTE}`,
   matAns([[4, 5], [6, 7]]), 'Subtract the known matrix from both sides.',
   'X = (5 7; 9 11) &minus; (1 2; 3 4). Subtracting element by element: '
   + '(4 5; 6 7).'],

  ['g9m-mat-015', 3, 3, `Solve the matrix equation <b>Y</b> &minus; ${mat([[2, 0], [1, 3]])} = ${mat([[1, 4], [2, 2]])} for <b>Y</b>.${NOTE}`,
   matAns([[3, 4], [3, 5]]), 'Add the known matrix to both sides.',
   'Y = (1 4; 2 2) + (2 0; 1 3) = (3 4; 3 5).'],

  ['g9m-mat-016', 3, 2, 'Two matrices are <b>equal</b>. What must be true of them?',
   { kind: 'choice', variant: 'options',
     options: ['They have the same order and every matching element is equal',
               'They have the same order only',
               'They contain exactly the same numbers in any positions',
               'They have the same number of elements'],
     answer: 'They have the same order and every matching element is equal' },
   'Both the shape and every entry must match.',
   'Equal matrices must have the same order AND identical elements in matching positions. '
   + 'Two matrices holding the same numbers in different places are not equal.'],

  ['g9m-mat-017', 4, 3, `Given that ${mat([['x'], [3]])} + ${mat([[2], ['y']])} = ${mat([[7], [10]])}, find the values of <i>x</i> and <i>y</i>.`,
   { kind: 'blanks', answer: [['5'], ['7']], labels: ['x', 'y'] },
   'Matching positions must be equal, so write down two ordinary equations.',
   'The top entries give x + 2 = 7, so x = 5. The bottom entries give 3 + y = 10, so y = 7.'],

  ['g9m-mat-018', 2, 1, 'A shop records its sales in a matrix with 4 rows and 2 columns. State the '
   + '<b>order</b> of the matrix.',
   { kind: 'expression', answer: '4x2', accept: ['4 x 2', '4*2', '4 by 2'] },
   'Rows first.', 'With 4 rows and 2 columns the order is 4 &times; 2.'],

  ['g9m-mat-019', 3, 2, `Find 2<b>Q</b>, where <b>Q</b> = ${mat([[3], [2]])}.${NOTE}`,
   matAns([[6], [4]]), 'Multiply each element by 2.',
   '2 &times; 3 = 6 and 2 &times; 2 = 4, giving (6; 4).'],

  ['g9m-mat-020', 4, 3, `Find <b>A</b> + 2<b>B</b>, where <b>A</b> = ${mat([[1, 0], [2, 1]])} and <b>B</b> = ${mat([[3, 1], [0, 4]])}.${NOTE}`,
   matAns([[7, 2], [2, 9]]), 'Work out 2B first, then add A.',
   '2B = (6 2; 0 8). Adding A: 1+6 = 7, 0+2 = 2, 2+0 = 2 and 1+8 = 9, giving (7 2; 2 9).'],
];

ITEMS.forEach(([id, difficulty, marks, prompt, response, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeTask({
    id, chapterId: CH, subsection: 'order_types_operations', difficulty,
    source: 'NCF Grades 7-9 §3.9 Algebra: Matrices; NCE 2025 Q4 and 2024 Q24 pattern.',
    parts: [{ label: 'a', prompt, marks, hint, explanation, response }],
  }));
});

})();
