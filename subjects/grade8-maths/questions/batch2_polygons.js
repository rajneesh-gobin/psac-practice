'use strict';
// Grade 8 Mathematics - Polygons, batch 2 (012-020).
// The existing eleven items all substitute into a formula. These add the
// reasoning behind it: splitting a polygon into triangles, working back from an
// angle sum to the number of sides, an algebraic angle in a diagram, an
// impossible exterior angle to explain, and a tiling question.
//
// ⚠ ORIGINAL SVG, drawn for this repository, black and grey only so a printed
//   paper still reads. Angle labels sit INSIDE each shape: outside the outline
//   they collided with the viewBox edge on a narrow phone.

(function () {

const NTS = '<div style="font-size:.8em;opacity:.75;margin-top:.25rem">The diagram is not drawn to scale.</div>';

// A convex pentagon with one label placed just inside each vertex.
function pentagonLabelled(l1, l2, l3, l4, l5) {
  return `<svg viewBox="0 0 240 200" width="240" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A five-sided shape with an angle marked inside each corner.">
    <polygon points="30,120 90,30 180,45 210,130 120,175" fill="none" stroke="#000" stroke-width="1.6"/>
    <text x="52" y="122" font-size="13" text-anchor="middle">${l1}</text>
    <text x="93" y="58" font-size="13" text-anchor="middle">${l2}</text>
    <text x="167" y="68" font-size="13" text-anchor="middle">${l3}</text>
    <text x="187" y="126" font-size="13" text-anchor="middle">${l4}</text>
    <text x="120" y="156" font-size="13" text-anchor="middle">${l5}</text>
  </svg>${NTS}`;
}

// A regular pentagon with the side C-D produced, and the angle between the
// produced part and the next side marked x.
function pentagonProduced() {
  return `<svg viewBox="0 0 230 190" width="230" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A regular five-sided shape with one side continued past a corner, and the angle between that continued line and the next side marked x.">
    <polygon points="110,35 171.8,79.9 148.2,152.6 71.8,152.6 48.2,79.9" fill="none" stroke="#000" stroke-width="1.6"/>
    <line x1="148.2" y1="152.6" x2="205" y2="152.6" stroke="#000" stroke-width="1.6" stroke-dasharray="5 4"/>
    <path d="M 170.2 152.6 A 22 22 0 0 0 155.0 131.7" fill="none" stroke="#000" stroke-width="1.2"/>
    <text x="178" y="140" font-size="14" text-anchor="middle" font-style="italic">x</text>
    <text x="110" y="100" font-size="12" text-anchor="middle">regular</text>
  </svg>${NTS}`;
}

STATIC_QUESTIONS.push(

  makeNum({
    id: 'g8m-polygons-012', chapterId: 'g8m-polygons', difficulty: 2,
    subsection: 'angle_sum',
    question: 'Diagonals are drawn from <b>one</b> vertex of a <b>decagon</b> (10 sides) to every other vertex. How many <b>triangles</b> is the decagon split into?',
    answer: 8,
    hint: 'Try it on a quadrilateral and a pentagon first and look for the pattern.',
    explanation: 'A polygon with n sides splits into n &minus; 2 triangles, so a decagon gives 10 &minus; 2 = 8. That is exactly why its angles add to 8 &times; 180&deg; = 1,440&deg;. Answering 10 counts a triangle for every side, and the two sides meeting at the chosen vertex cannot start one.'
  }),

  makeMCQ({
    id: 'g8m-polygons-013', chapterId: 'g8m-polygons', difficulty: 3,
    subsection: 'angle_sum',
    question: 'The interior angles of a polygon add up to <b>1,440&deg;</b>. How many <b>sides</b> has it?',
    options: ['10', '8', '12', '9'],
    answer: '10',
    hint: 'Undo the rule (n &minus; 2) &times; 180&deg;: divide first, then deal with the 2.',
    explanation: '1,440 &divide; 180 = 8, and 8 = n &minus; 2, so n = 10. Answering 8 stops one step early, and 12 comes from adding 2 twice.'
  }),

  makeNum({
    id: 'g8m-polygons-014', chapterId: 'g8m-polygons', difficulty: 4,
    subsection: 'angle_sum',
    question: 'The diagram shows a pentagon.' + pentagonLabelled('100&deg;', '120&deg;', '80&deg;', '2x', 'x') + 'Find the value of <b>x</b>, in degrees.',
    answer: 80,
    hint: 'Work out the angle sum of a pentagon, take the three known angles off, then share what is left between 2x and x.',
    explanation: 'A pentagon’s angles add to (5 &minus; 2) &times; 180 = 540&deg;. The known angles come to 100 + 120 + 80 = 300&deg;, leaving 240&deg; for 2x + x = 3x, so x = 80&deg;. Sharing 240&deg; equally between the two unknown angles gives 120&deg;, but one of them is twice the other.'
  }),

  makeMCQ({
    id: 'g8m-polygons-015', chapterId: 'g8m-polygons', difficulty: 2,
    subsection: 'interior_exterior_angles',
    question: 'The diagram shows a <b>regular pentagon</b> with one side continued past a corner.' + pentagonProduced() + 'Find the angle marked <b>x</b>.',
    options: ['72&deg;', '108&deg;', '60&deg;', '36&deg;'],
    answer: '72&deg;',
    hint: 'The marked angle is an exterior angle, and the exterior angles of any polygon add to 360&deg;.',
    explanation: 'The exterior angles of the pentagon add to 360&deg; and there are 5 equal ones, so x = 360 &divide; 5 = 72&deg;. 108&deg; is the interior angle at that corner, and 60&deg; would be the exterior angle of a regular hexagon.'
  }),

  makeNum({
    id: 'g8m-polygons-016', chapterId: 'g8m-polygons', difficulty: 3,
    subsection: 'interior_exterior_angles',
    question: 'Each <b>interior</b> angle of a regular polygon is <b>156&deg;</b>. How many <b>sides</b> has it?',
    answer: 15,
    hint: 'Find the exterior angle first &mdash; it is much easier to work with than the interior one.',
    explanation: 'The exterior angle is 180 &minus; 156 = 24&deg;, and 360 &divide; 24 = 15 sides. Dividing 360 by 156 gives about 2.3, which is not a whole number of sides, because 156&deg; is the interior angle.'
  }),

  makeMCQ({
    id: 'g8m-polygons-017', chapterId: 'g8m-polygons', difficulty: 3,
    subsection: 'interior_exterior_angles',
    question: 'A pupil says a <b>regular</b> polygon can have an exterior angle of <b>50&deg;</b>. Why is that impossible?',
    options: ['360 &divide; 50 is not a whole number', 'An exterior angle must be obtuse', 'An exterior angle must be under 45&deg;', 'The interior angle would be 130&deg;'],
    answer: '360 &divide; 50 is not a whole number',
    hint: 'How many equal exterior angles would a polygon with 50&deg; exterior angles need?',
    explanation: 'The exterior angles of a regular polygon are equal and add to 360&deg;, so 360 &divide; 50 = 7.2 would mean 7.2 sides, which cannot exist. Exterior angles are usually acute, not obtuse, and 130&deg; is a perfectly ordinary interior angle &mdash; it is the 7.2 that rules it out.'
  }),

  makeMCQ({
    id: 'g8m-polygons-018', chapterId: 'g8m-polygons', difficulty: 2,
    subsection: 'regular_polygons',
    question: 'How many <b>lines of symmetry</b> does a regular octagon have?',
    options: ['8', '4', '16', '6'],
    answer: '8',
    hint: 'Count the lines through opposite corners and the lines through the middle of opposite sides.',
    explanation: 'A regular polygon has as many lines of symmetry as sides: 4 through pairs of opposite vertices and 4 through the midpoints of opposite sides, making 8. Counting only the corner-to-corner lines gives 4.'
  }),

  makeNum({
    id: 'g8m-polygons-019', chapterId: 'g8m-polygons', difficulty: 3,
    subsection: 'regular_polygons',
    question: 'A regular hexagon has a perimeter of <b>54 cm</b>. Each side of a regular pentagon is <b>3 cm longer</b> than a side of that hexagon. What is the <b>perimeter of the pentagon</b>, in cm?',
    answer: 60,
    hint: 'A regular shape has equal sides, so start by finding one side of the hexagon.',
    explanation: 'One side of the hexagon is 54 &divide; 6 = 9 cm, so a side of the pentagon is 12 cm and its perimeter is 5 &times; 12 = 60 cm. Adding 3 cm to the whole perimeter gives 57 cm, but the 3 cm is added to every one of the five sides.'
  }),

  makeMCQ({
    id: 'g8m-polygons-020', chapterId: 'g8m-polygons', difficulty: 3,
    subsection: 'regular_polygons',
    question: 'Regular hexagonal tiles cover a floor with <b>no gaps and no overlaps</b>. How many tiles meet at each point where their corners touch?',
    options: ['3', '4', '6', '5'],
    answer: '3',
    hint: 'The angles round a point add to 360&deg;. What is one interior angle of a regular hexagon?',
    explanation: 'One interior angle of a regular hexagon is 120&deg;, and 360 &divide; 120 = 3 tiles at each point. 4 would need 90&deg; angles (squares) and 6 would need 60&deg; angles (equilateral triangles).'
  })

);

})();
