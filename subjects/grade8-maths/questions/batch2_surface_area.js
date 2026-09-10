'use strict';
// Grade 8 Mathematics - Surface Area, batch 2 (011-020).
// The existing prism items HAND the child the area of every face; these make
// the child work the faces out. Also here: a net read off a diagram, surface
// area reversed to an edge and to a missing height, a cost per 100 cm2, and two
// items about what happens to the surface when solids are cut or joined.
//
// ⚠ ORIGINAL SVG. A net is drawn flat with its fold lines dashed, so a child
//   can see which faces are which; the solids use dashed hidden edges.

(function () {

// Net of a triangular prism: three rectangles in a row, a triangle on each
// side of the middle one.
function prismNet() {
  return `<svg viewBox="0 0 220 200" width="220" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A flat net made of a row of three rectangles with one triangle attached above the middle rectangle and another below it.">
    <rect x="20" y="70" width="60" height="60" fill="none" stroke="#000" stroke-width="1.5"/>
    <rect x="80" y="70" width="60" height="60" fill="none" stroke="#000" stroke-width="1.5"/>
    <rect x="140" y="70" width="60" height="60" fill="none" stroke="#000" stroke-width="1.5"/>
    <polygon points="80,70 140,70 110,25" fill="none" stroke="#000" stroke-width="1.5"/>
    <polygon points="80,130 140,130 110,175" fill="none" stroke="#000" stroke-width="1.5"/>
    <line x1="80" y1="70" x2="80" y2="130" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>
    <line x1="140" y1="70" x2="140" y2="130" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>
  </svg>`;
}

// Net of a cuboid: a band of four faces with a top and a bottom on the first.
function cuboidNet(a, b, c) {
  return `<svg viewBox="0 0 250 140" width="250" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A flat net made of six rectangles, arranged as a row of four with one rectangle above the first and one below it.">
    <rect x="40" y="60" width="200" height="20" fill="none" stroke="#000" stroke-width="1.5"/>
    <rect x="40" y="20" width="60" height="40" fill="none" stroke="#000" stroke-width="1.5"/>
    <rect x="40" y="80" width="60" height="40" fill="none" stroke="#000" stroke-width="1.5"/>
    <line x1="100" y1="60" x2="100" y2="80" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>
    <line x1="140" y1="60" x2="140" y2="80" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>
    <line x1="200" y1="60" x2="200" y2="80" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>
    <text x="70" y="14" font-size="11" text-anchor="middle">${a}</text>
    <text x="34" y="44" font-size="11" text-anchor="end">${b}</text>
    <text x="34" y="74" font-size="11" text-anchor="end">${c}</text>
  </svg>`;
}

// A right triangular prism lying on its rectangular face.
function triPrism() {
  return `<svg viewBox="0 0 200 180" width="200" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A solid with a triangular end face, drawn in three dimensions with its edges labelled.">
    <polygon points="40,140 40,80 85,140" fill="none" stroke="#000" stroke-width="1.6"/>
    <polyline points="40,80 100,45 145,105 85,140" fill="none" stroke="#000" stroke-width="1.6"/>
    <line x1="40" y1="140" x2="100" y2="105" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>
    <line x1="100" y1="105" x2="100" y2="45" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>
    <line x1="100" y1="105" x2="145" y2="105" stroke="#000" stroke-width="1" stroke-dasharray="4 3"/>
    <text x="62" y="155" font-size="11" text-anchor="middle">3 cm</text>
    <text x="34" y="114" font-size="11" text-anchor="end">4 cm</text>
    <text x="70" y="103" font-size="11" text-anchor="middle">5 cm</text>
    <text x="128" y="72" font-size="11" text-anchor="middle">10 cm</text>
  </svg>`;
}

STATIC_QUESTIONS.push(

  makeMCQ({
    id: 'g8m-surface-area-011', chapterId: 'g8m-surface-area', difficulty: 2,
    subsection: 'nets',
    question: 'This flat shape is folded up along the dashed lines.' + prismNet() + 'Which solid does it make?',
    options: ['A triangular prism', 'A square pyramid', 'A closed cylinder', 'A cuboid'],
    answer: 'A triangular prism',
    hint: 'Count the rectangles and the triangles. The two identical faces become the ends of the solid.',
    explanation: 'Three rectangles wrap round and the two triangles close the ends, which is a triangular prism. A cuboid needs six rectangles and no triangles, a square pyramid has one square and four triangles, and a cylinder needs two circles.'
  }),

  makeNum({
    id: 'g8m-surface-area-012', chapterId: 'g8m-surface-area', difficulty: 3,
    subsection: 'nets',
    question: 'The diagram shows the net of a cuboid.' + cuboidNet('6 cm', '4 cm', '2 cm') + 'What is the <b>total area of the net</b>, in cm&sup2;?',
    answer: 88,
    hint: 'The net has three different sizes of rectangle, and each one appears twice.',
    explanation: 'The three different faces measure 6 &times; 4 = 24, 6 &times; 2 = 12 and 4 &times; 2 = 8 cm&sup2;, and each occurs twice: 2 &times; (24 + 12 + 8) = 88 cm&sup2;. Adding the three faces once gives 44, which is only half the net, and 6 &times; 4 &times; 2 = 48 is the volume.'
  }),

  makeMCQ({
    id: 'g8m-surface-area-013', chapterId: 'g8m-surface-area', difficulty: 2,
    subsection: 'nets',
    question: 'The net of a <b>square-based pyramid</b> is made of &hellip;',
    options: ['one square and four triangles', 'two squares and four triangles', 'one square and three triangles', 'one square and four rectangles'],
    answer: 'one square and four triangles',
    hint: 'The base is the square. Every other face runs from a base edge up to the single apex.',
    explanation: 'The square is the base and each of its four edges carries a triangle up to the apex, so it is one square and four triangles. Two squares would make a prism, and rectangles could never meet at a single point.'
  }),

  makeNum({
    id: 'g8m-surface-area-014', chapterId: 'g8m-surface-area', difficulty: 3,
    subsection: 'cuboid_surface',
    question: 'A cube has a <b>surface area of 150 cm&sup2;</b>. How long is <b>one edge</b>, in cm?',
    answer: 5,
    hint: 'A cube has six identical square faces. Find the area of one of them first.',
    explanation: '150 &divide; 6 = 25 cm&sup2; for one face, and &radic;25 = 5 cm for one edge. Stopping at 25 gives the area of a face, not a length, and taking &radic;150 directly gives about 12.2.'
  }),

  makeMCQ({
    id: 'g8m-surface-area-015', chapterId: 'g8m-surface-area', difficulty: 3,
    subsection: 'cuboid_surface',
    question: 'A closed cuboid has a <b>square base of side 5 cm</b> and a <b>surface area of 170 cm&sup2;</b>. What is its <b>height</b>?',
    options: ['6 cm', '5 cm', '7 cm', '8 cm'],
    answer: '6 cm',
    hint: 'The top and base are known squares. Whatever is left over is shared between the four side faces.',
    explanation: 'The base and top come to 2 &times; 25 = 50 cm&sup2;, leaving 120 cm&sup2; for the four sides. Each side is 5 &times; h, so 20h = 120 and h = 6 cm. Answering 5 cm would make it a cube, whose surface area is only 150 cm&sup2;.'
  }),

  makeNum({
    id: 'g8m-surface-area-016', chapterId: 'g8m-surface-area', difficulty: 4,
    subsection: 'cuboid_surface',
    question: 'A closed metal box measures <b>60 cm &times; 40 cm &times; 25 cm</b>. The sheet metal costs <b>Rs 3 per 100 cm&sup2;</b>. What is the cost of the metal, in rupees?',
    answer: 294,
    hint: 'Surface area first, then divide by 100 to find how many lots of metal are bought.',
    explanation: 'Surface area = 2 &times; (60&times;40 + 60&times;25 + 40&times;25) = 2 &times; (2,400 + 1,500 + 1,000) = 9,800 cm&sup2;. That is 98 lots of 100 cm&sup2;, costing 98 &times; 3 = Rs 294. Multiplying the whole 9,800 by 3 gives Rs 29,400, which prices every square centimetre at Rs 3.'
  }),

  makeNum({
    id: 'g8m-surface-area-017', chapterId: 'g8m-surface-area', difficulty: 3,
    subsection: 'prism_surface',
    question: 'The diagram shows a prism whose ends are right-angled triangles with sides <b>3 cm, 4 cm and 5 cm</b>. The prism is <b>10 cm</b> long.' + triPrism() + 'Find its <b>total surface area</b>, in cm&sup2;.',
    answer: 132,
    hint: 'Two triangular ends plus three rectangles. Each rectangle is 10 cm long and as wide as one side of the triangle.',
    explanation: 'Each triangular end is &frac12; &times; 3 &times; 4 = 6 cm&sup2;, giving 12 cm&sup2; for the two. The rectangles are 3&times;10, 4&times;10 and 5&times;10, so 30 + 40 + 50 = 120 cm&sup2;. Total = 132 cm&sup2;. Using 5 cm as the height of the triangle counts the hypotenuse twice.'
  }),

  makeMCQ({
    id: 'g8m-surface-area-018', chapterId: 'g8m-surface-area', difficulty: 3,
    subsection: 'prism_surface',
    question: 'A wooden cube of side <b>4 cm</b> is sawn straight through the middle into <b>two identical cuboids</b>. What is the <b>total surface area of the two pieces</b> together?',
    options: ['128 cm&sup2;', '96 cm&sup2;', '112 cm&sup2;', '192 cm&sup2;'],
    answer: '128 cm&sup2;',
    hint: 'The cut does not remove any wood, but it does create two brand-new faces.',
    explanation: 'The cube had 6 &times; 16 = 96 cm&sup2;. The saw exposes two new 4 &times; 4 faces, adding 32 cm&sup2;, so the total is 128 cm&sup2;. 96 cm&sup2; forgets the new faces, and 192 cm&sup2; doubles the whole cube, as though sawing made two full cubes.'
  }),

  makeMCQ({
    id: 'g8m-surface-area-019', chapterId: 'g8m-surface-area', difficulty: 2,
    subsection: 'prism_surface',
    question: 'Which faces of any <b>prism</b> are always identical to each other?',
    options: ['The two end faces', 'The two longest faces', 'The four side faces', 'All of the faces'],
    answer: 'The two end faces',
    hint: 'A prism is a shape whose cross-section is the same all the way along.',
    explanation: 'A prism has the same cross-section throughout, so the two ends are identical whatever shape they are. The rectangular sides are usually all different, and only in a cube are all six faces the same.'
  }),

  makeMCQ({
    id: 'g8m-surface-area-020', chapterId: 'g8m-surface-area', difficulty: 3,
    subsection: 'cuboid_surface',
    question: 'Two cubes of side <b>3 cm</b> are glued together face to face. What is the <b>surface area of the solid</b> that is formed?',
    options: ['90 cm&sup2;', '108 cm&sup2;', '99 cm&sup2;', '81 cm&sup2;'],
    answer: '90 cm&sup2;',
    hint: 'The two glued faces are now inside the solid, so nobody can paint them.',
    explanation: 'Each cube has 6 &times; 9 = 54 cm&sup2;, giving 108 cm&sup2; separately, but the two glued 3 &times; 3 faces disappear from the outside: 108 &minus; 18 = 90 cm&sup2;. 108 cm&sup2; ignores the join, and 99 cm&sup2; removes only one of the two hidden faces.'
  })

);

})();
