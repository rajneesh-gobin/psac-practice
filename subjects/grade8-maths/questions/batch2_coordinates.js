'use strict';
// Grade 8 Mathematics - Coordinates, batch 2 (011-020).
// Two items read a real grid rather than a printed pair of numbers; the rest
// reverse the tasks the first ten only ever ran forwards - an endpoint from a
// midpoint at the origin, a rectangle's area from three of its corners, the
// fourth vertex of a parallelogram, an x-intercept, and a straight-line rule
// used as a price formula.
//
// ⚠ ORIGINAL SVG. Grey grid, black axes: the printed paper is monochrome, so
//   nothing here is distinguished by colour alone.

(function () {

const M = 24, U = 18, N = 5;               // margin, pixels per unit, grid runs -N..N
const SX = x => M + (x + N) * U;
const SY = y => M + (N - y) * U;
const SIZE = 2 * M + 2 * N * U;

function grid(inner, label) {
  let g = '';
  for (let i = -N; i <= N; i++) {
    g += `<line x1="${SX(i)}" y1="${SY(-N)}" x2="${SX(i)}" y2="${SY(N)}" stroke="#c8c8c8" stroke-width="0.7"/>`;
    g += `<line x1="${SX(-N)}" y1="${SY(i)}" x2="${SX(N)}" y2="${SY(i)}" stroke="#c8c8c8" stroke-width="0.7"/>`;
  }
  g += `<line x1="${SX(-N)}" y1="${SY(0)}" x2="${SX(N)}" y2="${SY(0)}" stroke="#000" stroke-width="1.5"/>`;
  g += `<line x1="${SX(0)}" y1="${SY(-N)}" x2="${SX(0)}" y2="${SY(N)}" stroke="#000" stroke-width="1.5"/>`;
  for (const t of [-4, -2, 2, 4]) {
    g += `<text x="${SX(t)}" y="${SY(0) + 13}" font-size="10" text-anchor="middle">${t}</text>`;
    g += `<text x="${SX(0) - 6}" y="${SY(t) + 4}" font-size="10" text-anchor="end">${t}</text>`;
  }
  g += `<text x="${SX(N) - 2}" y="${SY(0) - 6}" font-size="11" text-anchor="end" font-style="italic">x</text>`;
  g += `<text x="${SX(0) + 7}" y="${SY(N) + 9}" font-size="11" font-style="italic">y</text>`;
  return `<svg viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">${g}${inner}</svg>`;
}

function plotted(pts) {
  return pts.map(([x, y, nm]) =>
    `<circle cx="${SX(x)}" cy="${SY(y)}" r="3.4" fill="#000"/>` +
    `<text x="${SX(x) + 7}" y="${SY(y) - 6}" font-size="12" font-weight="bold">${nm}</text>`).join('');
}

STATIC_QUESTIONS.push(

  makeMCQ({
    id: 'g8m-coordinates-011', chapterId: 'g8m-coordinates', difficulty: 2,
    subsection: 'four_quadrants',
    question: 'Four points are marked on the grid.' +
      grid(plotted([[2, 3, 'P'], [-3, -2, 'Q'], [4, -1, 'R'], [-2, 4, 'S']]),
           'A square grid with x and y axes and four marked points labelled P, Q, R and S.') +
      'Which point has coordinates <b>(&minus;3, &minus;2)</b>?',
    options: ['Q', 'P', 'R', 'S'],
    answer: 'Q',
    hint: 'Read across from the origin first, then up or down. Both numbers here are negative.',
    explanation: 'Q sits 3 units left and 2 units down from the origin, which is (&minus;3, &minus;2). R is at (4, &minus;1), S is at (&minus;2, 4) &mdash; easy to pick if the two coordinates are read the wrong way round &mdash; and P is at (2, 3).'
  }),

  makeMCQ({
    id: 'g8m-coordinates-012', chapterId: 'g8m-coordinates', difficulty: 2,
    subsection: 'four_quadrants',
    question: 'The point <b>(5, &minus;2)</b> is <b>reflected in the x-axis</b>. In which quadrant does the image lie?',
    options: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
    answer: 'Quadrant I',
    hint: 'Reflecting in the x-axis leaves the x-coordinate alone and changes the sign of the y-coordinate.',
    explanation: 'The image is (5, 2): both coordinates are now positive, which is Quadrant I. Quadrant IV is where the original point (5, &minus;2) sits, and Quadrant II would need a negative x-coordinate.'
  }),

  makeNum({
    id: 'g8m-coordinates-013', chapterId: 'g8m-coordinates', difficulty: 3,
    subsection: 'four_quadrants',
    question: 'Three corners of a rectangle are <b>A(&minus;2, 1)</b>, <b>B(4, 1)</b> and <b>C(4, &minus;3)</b>. What is the <b>area</b> of the rectangle, in square units?',
    answer: 24,
    hint: 'AB is horizontal and BC is vertical. Count the units along each, then multiply.',
    explanation: 'AB runs from x = &minus;2 to x = 4, a length of 6, and BC runs from y = 1 to y = &minus;3, a length of 4, so the area is 6 &times; 4 = 24 square units. Subtracting &minus;2 from 4 as 4 &minus; 2 = 2 gives 8, and adding the sides gives the perimeter, 20.'
  }),

  makeMCQ({
    id: 'g8m-coordinates-014', chapterId: 'g8m-coordinates', difficulty: 2,
    subsection: 'midpoint',
    question: 'The midpoint of <b>PQ</b> is the origin <b>(0, 0)</b>, and <b>P</b> is <b>(&minus;6, 4)</b>. What are the coordinates of <b>Q</b>?',
    options: ['(6, &minus;4)', '(&minus;6, &minus;4)', '(6, 4)', '(&minus;3, 2)'],
    answer: '(6, &minus;4)',
    hint: 'The origin is halfway between them, so Q is the same distance from (0, 0) as P but on the opposite side.',
    explanation: 'For the midpoint to be (0, 0) the two x-coordinates must add to 0 and so must the two y-coordinates, so Q is (6, &minus;4). (&minus;3, 2) is the midpoint of O and P, and (6, 4) changes only one sign.'
  }),

  makeNum({
    id: 'g8m-coordinates-015', chapterId: 'g8m-coordinates', difficulty: 3,
    subsection: 'midpoint',
    question: 'A triangle has vertices <b>A(1, 2)</b>, <b>B(7, 2)</b> and <b>C(7, 10)</b>. <b>M</b> is the midpoint of <b>AC</b>. What is the <b>y-coordinate</b> of M?',
    answer: 6,
    hint: 'B is not needed. Average the two y-coordinates of the endpoints of AC.',
    explanation: 'M is the midpoint of AC, so its y-coordinate is (2 + 10) &divide; 2 = 6. Using B by mistake gives (2 + 2) &divide; 2 = 2, and 4 is the x-coordinate of M.'
  }),

  makeMCQ({
    id: 'g8m-coordinates-016', chapterId: 'g8m-coordinates', difficulty: 4,
    subsection: 'midpoint',
    question: 'The diagonals of a parallelogram <b>bisect each other</b>. Three vertices of parallelogram ABCD are <b>A(1, 2)</b>, <b>B(5, 3)</b> and <b>C(7, 8)</b>. Find the coordinates of <b>D</b>.',
    options: ['(3, 7)', '(11, 9)', '(4, 5)', '(2, 6)'],
    answer: '(3, 7)',
    hint: 'The midpoint of AC must also be the midpoint of BD. Find it first.',
    explanation: 'The midpoint of AC is ((1+7)&divide;2, (2+8)&divide;2) = (4, 5). That must also be the midpoint of BD, so D = (2&times;4 &minus; 5, 2&times;5 &minus; 3) = (3, 7). (4, 5) is the centre of the parallelogram, not a vertex, and (11, 9) comes from reflecting A instead of B.'
  }),

  makeMCQ({
    id: 'g8m-coordinates-017', chapterId: 'g8m-coordinates', difficulty: 2,
    subsection: 'linear_graphs',
    question: 'What is the <b>gradient</b> of the line <b>y = 4 &minus; 3x</b>?',
    options: ['&minus;3', '3', '4', '&minus;4'],
    answer: '&minus;3',
    hint: 'Rewrite it as y = mx + c. The gradient is the number multiplying x, sign included.',
    explanation: 'y = 4 &minus; 3x is y = &minus;3x + 4, so the gradient is &minus;3 and the line slopes downwards. 4 is the y-intercept, and 3 drops the minus sign, which would make the line rise.'
  }),

  makeNum({
    id: 'g8m-coordinates-018', chapterId: 'g8m-coordinates', difficulty: 3,
    subsection: 'linear_graphs',
    question: 'The line <b>y = 2x &minus; 6</b> crosses the <b>x-axis</b> at the point (k, 0). What is the value of <b>k</b>?',
    answer: 3,
    hint: 'Every point on the x-axis has y = 0. Put that into the equation.',
    explanation: 'Setting y = 0 gives 0 = 2x &minus; 6, so 2x = 6 and x = 3. &minus;6 is where the line crosses the y-axis, not the x-axis.'
  }),

  makeMCQ({
    id: 'g8m-coordinates-019', chapterId: 'g8m-coordinates', difficulty: 3,
    subsection: 'linear_graphs',
    question: 'A straight line is drawn on the grid.' +
      grid(`<line x1="${SX(-2)}" y1="${SY(-5)}" x2="${SX(3)}" y2="${SY(5)}" stroke="#000" stroke-width="2"/>` +
           plotted([[0, -1, ''], [2, 3, '']]),
           'A square grid with x and y axes and one straight line drawn across it.') +
      'What is the <b>equation</b> of this line?',
    options: ['y = 2x &minus; 1', 'y = x &minus; 1', 'y = 2x + 1', 'y = &minus;2x &minus; 1'],
    answer: 'y = 2x &minus; 1',
    hint: 'Read where the line crosses the y-axis, then count how far it rises for every 1 unit across.',
    explanation: 'The line crosses the y-axis at &minus;1 and rises 2 units for every 1 unit to the right, so y = 2x &minus; 1. y = x &minus; 1 is too shallow, y = 2x + 1 crosses at +1, and y = &minus;2x &minus; 1 would slope downwards.'
  }),

  makeNum({
    id: 'g8m-coordinates-020', chapterId: 'g8m-coordinates', difficulty: 4,
    subsection: 'linear_graphs',
    question: 'A taxi fare in rupees is given by <b>y = 25x + 60</b>, where <b>x</b> is the distance in km. A passenger paid <b>Rs 360</b>. How many <b>km</b> was the trip?',
    answer: 12,
    hint: 'The Rs 60 is paid whatever the distance. Take it off before dividing.',
    explanation: '360 = 25x + 60, so 25x = 300 and x = 12 km. Dividing 360 by 25 gives 14.4 km, which charges the Rs 60 fixed fee as though it were part of the distance.'
  })

);

})();
