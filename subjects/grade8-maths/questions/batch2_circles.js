'use strict';
// Grade 8 Mathematics - Circles, batch 2 (011-020).
// The first ten items all run circumference and area forwards from a radius or
// a diameter. These add: reading a labelled circle, both formulas reversed, a
// semicircle perimeter, a quarter circle, a fencing cost, a ring, and a
// leftover-area subtraction.
//
// ⚠ Every radius or diameter here is a multiple of 7, so that pi = 22/7
//   cancels exactly and the whole calculation is done without a calculator -
//   the way the paper is sat.
//
// ⚠ ORIGINAL SVG, black and grey only. Nothing in an aria-label names the part
//   the question is asking the child to identify.

(function () {

// A circle with three lines drawn on it, labelled a, b and c.
function labelledCircle() {
  return `<svg viewBox="0 0 220 190" width="220" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A circle with its centre marked O and three straight lines drawn on it, labelled a, b and c.">
    <circle cx="110" cy="95" r="70" fill="none" stroke="#000" stroke-width="1.6"/>
    <line x1="40" y1="95" x2="180" y2="95" stroke="#000" stroke-width="1.4"/>
    <line x1="110" y1="95" x2="145" y2="34.4" stroke="#000" stroke-width="1.4"/>
    <line x1="86.1" y1="160.8" x2="133.9" y2="160.8" stroke="#000" stroke-width="1.4"/>
    <circle cx="110" cy="95" r="3" fill="#000"/>
    <text x="101" y="110" font-size="12">O</text>
    <text x="136" y="64" font-size="13" font-weight="bold">a</text>
    <text x="152" y="88" font-size="13" font-weight="bold">b</text>
    <text x="110" y="153" font-size="13" font-weight="bold" text-anchor="middle">c</text>
  </svg>`;
}

// Two circles with the same centre: a pond with a path round it.
function ring(innerLabel, widthLabel) {
  return `<svg viewBox="0 0 230 200" width="230" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two circles with the same centre; the space between them is shaded.">
    <circle cx="112" cy="100" r="84" fill="#e2e2e2" stroke="#000" stroke-width="1.6"/>
    <circle cx="112" cy="100" r="42" fill="#fff" stroke="#000" stroke-width="1.6"/>
    <line x1="112" y1="100" x2="154" y2="100" stroke="#000" stroke-width="1.2"/>
    <line x1="154" y1="100" x2="196" y2="100" stroke="#000" stroke-width="1.2" stroke-dasharray="4 3"/>
    <circle cx="112" cy="100" r="3" fill="#000"/>
    <text x="133" y="93" font-size="11" text-anchor="middle">${innerLabel}</text>
    <text x="175" y="93" font-size="11" text-anchor="middle">${widthLabel}</text>
    <text x="112" y="192" font-size="11" text-anchor="middle">pond (white) &middot; path (shaded)</text>
  </svg>`;
}

// A circle cut from a square sheet, the circle just touching all four sides.
function circleInSquare(sideLabel) {
  return `<svg viewBox="0 0 210 200" width="210" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A square sheet with a circle inside it touching all four sides; the circle is shown removed.">
    <rect x="30" y="20" width="140" height="140" fill="#e2e2e2" stroke="#000" stroke-width="1.6"/>
    <circle cx="100" cy="90" r="70" fill="#fff" stroke="#000" stroke-width="1.6"/>
    <line x1="30" y1="176" x2="170" y2="176" stroke="#000" stroke-width="1"/>
    <line x1="30" y1="171" x2="30" y2="181" stroke="#000" stroke-width="1"/>
    <line x1="170" y1="171" x2="170" y2="181" stroke="#000" stroke-width="1"/>
    <text x="100" y="193" font-size="11" text-anchor="middle">${sideLabel}</text>
  </svg>`;
}

STATIC_QUESTIONS.push(

  makeMCQ({
    id: 'g8m-circles-011', chapterId: 'g8m-circles', difficulty: 1,
    subsection: 'parts_circle',
    question: 'Three straight lines are drawn on this circle, with centre O.' + labelledCircle() + 'Which line is the <b>diameter</b>?',
    options: ['b', 'a', 'c', 'O'],
    answer: 'b',
    hint: 'A diameter has to pass through the centre and reach the circle at both ends.',
    explanation: 'Line b goes right across the circle through O, so it is the diameter. Line a starts at O but stops at the circle, so it is a radius (half the length of b); line c joins two points on the circle but misses O, so it is a chord; and O is the centre itself, not a line.'
  }),

  makeMCQ({
    id: 'g8m-circles-012', chapterId: 'g8m-circles', difficulty: 2,
    subsection: 'parts_circle',
    question: 'A <b>sector</b> of a circle is the region bounded by &hellip;',
    options: ['two radii and an arc', 'two chords and an arc', 'a chord and an arc', 'two diameters and an arc'],
    answer: 'two radii and an arc',
    hint: 'Think of a slice of cake cut from the middle. What are the two straight edges?',
    explanation: 'A sector is the slice cut by two radii, closed off by the arc between them. A chord and an arc bound a <i>segment</i>, not a sector, and two diameters cut four sectors rather than bounding one.'
  }),

  makeNum({
    id: 'g8m-circles-013', chapterId: 'g8m-circles', difficulty: 3,
    subsection: 'circumference',
    question: 'The circumference of a circle is <b>132 cm</b>. Find its <b>radius</b>, in cm. (Use &pi; = 22/7.)',
    answer: 21,
    hint: 'C = 2&pi;r. Divide by 2&pi;, which with &pi; = 22/7 means dividing by 44/7.',
    explanation: '132 = 2 &times; 22/7 &times; r = 44r/7, so r = 132 &times; 7 &divide; 44 = 21 cm. 42 cm is the diameter, and multiplying 132 by 22/7 instead of dividing gives 414.9.'
  }),

  makeMCQ({
    id: 'g8m-circles-014', chapterId: 'g8m-circles', difficulty: 3,
    subsection: 'circumference',
    question: 'A semicircular protractor has a <b>diameter of 14 cm</b>. What is its <b>full perimeter</b> &mdash; the curved edge <i>and</i> the straight edge together? (Use &pi; = 22/7.)',
    options: ['36 cm', '22 cm', '44 cm', '29 cm'],
    answer: '36 cm',
    hint: 'Half a circle has half the circumference, but it also has a straight edge that a full circle does not.',
    explanation: 'The whole circumference would be 22/7 &times; 14 = 44 cm, so the curve is 22 cm, and the straight edge adds the 14 cm diameter: 22 + 14 = 36 cm. 22 cm is the curve alone and 44 cm is the whole circle.'
  }),

  makeNum({
    id: 'g8m-circles-015', chapterId: 'g8m-circles', difficulty: 4,
    subsection: 'circumference',
    question: 'A circular flower bed of <b>diameter 28 m</b> is to be fenced all the way round. Fencing costs <b>Rs 150 per metre</b>. What is the <b>total cost</b>, in rupees? (Use &pi; = 22/7.)',
    answer: 13200,
    hint: 'The fence follows the circumference, not the diameter. Work that out before touching the price.',
    explanation: 'C = 22/7 &times; 28 = 88 m of fencing, costing 88 &times; 150 = Rs 13,200. Using the 28 m diameter as the length gives Rs 4,200, and using the area would give a figure in square metres, which cannot be fenced.'
  }),

  makeNum({
    id: 'g8m-circles-016', chapterId: 'g8m-circles', difficulty: 3,
    subsection: 'area_circle',
    question: 'A circle has an <b>area of 616 cm&sup2;</b>. Find its <b>radius</b>, in cm. (Use &pi; = 22/7.)',
    answer: 14,
    hint: 'A = &pi;r&sup2;. Divide by &pi; first, and only then take the square root.',
    explanation: '616 &divide; 22/7 = 616 &times; 7 &divide; 22 = 196, so r&sup2; = 196 and r = 14 cm. 196 is r&sup2;, not r, and stopping there is the usual slip; 28 cm is the diameter.'
  }),

  makeMCQ({
    id: 'g8m-circles-017', chapterId: 'g8m-circles', difficulty: 4,
    subsection: 'area_circle',
    question: 'A circular pond of <b>radius 7 m</b> is surrounded by a paved path <b>7 m wide</b>.' + ring('7 m', '7 m') + 'What is the <b>area of the path</b>? (Use &pi; = 22/7.)',
    options: ['462 m&sup2;', '616 m&sup2;', '154 m&sup2;', '308 m&sup2;'],
    answer: '462 m&sup2;',
    hint: 'Find the area out to the OUTSIDE edge of the path, then take the pond away.',
    explanation: 'The outer radius is 7 + 7 = 14 m, giving 22/7 &times; 14&sup2; = 616 m&sup2;, and the pond is 22/7 &times; 7&sup2; = 154 m&sup2;, so the path is 616 &minus; 154 = 462 m&sup2;. 616 m&sup2; is pond and path together, and 154 m&sup2; is the pond alone.'
  }),

  makeMCQ({
    id: 'g8m-circles-018', chapterId: 'g8m-circles', difficulty: 3,
    subsection: 'area_circle',
    question: 'A <b>quarter circle</b> has a radius of <b>14 cm</b>. What is its <b>area</b>? (Use &pi; = 22/7.)',
    options: ['154 cm&sup2;', '616 cm&sup2;', '308 cm&sup2;', '196 cm&sup2;'],
    answer: '154 cm&sup2;',
    hint: 'Work out the whole circle first, then take the fraction the question asks for.',
    explanation: 'The whole circle is 22/7 &times; 14&sup2; = 616 cm&sup2;, and a quarter of that is 154 cm&sup2;. 616 cm&sup2; is the whole circle, 308 cm&sup2; is a half, and 196 cm&sup2; is 14&sup2; with the &pi; left out.'
  }),

  makeMCQ({
    id: 'g8m-circles-019', chapterId: 'g8m-circles', difficulty: 2,
    subsection: 'circumference',
    question: 'If the <b>radius</b> of a circle is <b>doubled</b>, what happens to its <b>circumference</b>?',
    options: ['It is doubled', 'It is halved', 'It is quadrupled', 'It is unchanged'],
    answer: 'It is doubled',
    hint: 'Look at the formula C = 2&pi;r. How many times does r appear?',
    explanation: 'C = 2&pi;r, and r appears once, so doubling r doubles C. Quadrupling is what happens to the AREA, because A = &pi;r&sup2; has r appearing twice.'
  }),

  makeNum({
    id: 'g8m-circles-020', chapterId: 'g8m-circles', difficulty: 4,
    subsection: 'area_circle',
    question: 'A circle of <b>diameter 14 cm</b> is cut out of a square card of <b>side 14 cm</b>.' + circleInSquare('14 cm') + 'What area of card is <b>left over</b>, in cm&sup2;? (Use &pi; = 22/7.)',
    answer: 42,
    hint: 'Two shapes, two areas, one subtraction. The circle just fits inside the square.',
    explanation: 'The square is 14 &times; 14 = 196 cm&sup2;. The circle has radius 7 cm, so its area is 22/7 &times; 7&sup2; = 154 cm&sup2;, leaving 196 &minus; 154 = 42 cm&sup2;. 154 cm&sup2; is the piece thrown away, not the piece kept.'
  })

);

})();
