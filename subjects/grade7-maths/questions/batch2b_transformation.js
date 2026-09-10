'use strict';
// Grade 7 Maths — Transformation (g7m-transformation), batch 2B
// IDs: g7m-transformation-009 … -020

(function () {

const _SVG_MIRROR = `<svg viewBox="0 0 200 132" width="200" height="132" role="img" aria-label="A triangle drawn on a square grid beside a dashed vertical line" style="display:block;margin:6px auto;background:#f8fafc;border-radius:8px;border:1px solid #cbd5e1">
  <g stroke="#e2e8f0" stroke-width="1">
    <line x1="10" y1="10" x2="10" y2="110"/><line x1="30" y1="10" x2="30" y2="110"/>
    <line x1="50" y1="10" x2="50" y2="110"/><line x1="70" y1="10" x2="70" y2="110"/>
    <line x1="90" y1="10" x2="90" y2="110"/><line x1="110" y1="10" x2="110" y2="110"/>
    <line x1="130" y1="10" x2="130" y2="110"/><line x1="150" y1="10" x2="150" y2="110"/>
    <line x1="170" y1="10" x2="170" y2="110"/>
    <line x1="10" y1="10" x2="170" y2="10"/><line x1="10" y1="30" x2="170" y2="30"/>
    <line x1="10" y1="50" x2="170" y2="50"/><line x1="10" y1="70" x2="170" y2="70"/>
    <line x1="10" y1="90" x2="170" y2="90"/><line x1="10" y1="110" x2="170" y2="110"/>
  </g>
  <line x1="110" y1="4" x2="110" y2="116" stroke="#dc2626" stroke-width="2" stroke-dasharray="5,4"/>
  <polygon points="50,30 50,70 90,70" fill="#bfdbfe" fill-opacity="0.6" stroke="#1e40af" stroke-width="2"/>
  <circle cx="50" cy="30" r="3" fill="#1e40af"/>
  <text x="42" y="26" font-size="10" fill="#1e40af">A</text>
  <text x="110" y="128" font-size="8.5" fill="#dc2626" text-anchor="middle">mirror line</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7m-transformation-009', chapterId:'g7m-transformation', difficulty:2,
    subsection:'reflection',
    question:'The point P(3, 2) is reflected and its image is P′(3, −2). Which line is the mirror line?',
    options:['the x-axis','the y-axis','the line y = x','the line x = 3'],
    answer:'the x-axis',
    hint:'Look at which coordinate changed sign and which one stayed the same.',
    explanation:'The x-coordinate stayed 3 and only the y-coordinate changed sign, so the mirror is the <b>x-axis</b>. Reflecting in the y-axis would have changed the 3 to −3; y = x would swap the two numbers; x = 3 would leave P exactly where it is, because P already lies on that line.' }),

  makeNum({ id:'g7m-transformation-010', chapterId:'g7m-transformation', difficulty:3,
    subsection:'reflection',
    question:'A vertex of a shape is at (5, 3). The shape is reflected in the line <b>x = 2</b>. What is the x-coordinate of the image of that vertex?',
    answer:-1,
    hint:'Count how many units the point is from the mirror line, then count the same number across to the other side.',
    explanation:'The point is 5 − 2 = 3 units to the right of x = 2, so its image is 3 units to the <i>left</i>: 2 − 3 = <b>−1</b>. The y-coordinate does not change, because the mirror line is vertical.' }),

  makeNum({ id:'g7m-transformation-011', chapterId:'g7m-transformation', difficulty:2,
    subsection:'reflection',
    question:`${_SVG_MIRROR}The triangle is reflected in the dashed mirror line. How many squares to the <b>right</b> of the mirror line will the image of vertex A be?`,
    answer:3,
    hint:'A reflected point sits the same distance from the mirror as the original.',
    explanation:'Vertex A is 3 squares to the left of the mirror line, so its image is <b>3</b> squares to the right. A reflection never changes the distance from the mirror — it only changes which side the point is on.' }),

  makeMCQ({ id:'g7m-transformation-012', chapterId:'g7m-transformation', difficulty:3,
    subsection:'reflection',
    question:'Triangle ABC has vertices (1, 2), (4, 2) and (4, 5). It is reflected in the <b>x-axis</b>. What are the vertices of the image?',
    options:['(1, −2), (4, −2), (4, −5)','(−1, 2), (−4, 2), (−4, 5)','(2, 1), (2, 4), (5, 4)','(1, 2), (4, 2), (4, 5)'],
    answer:'(1, −2), (4, −2), (4, −5)',
    hint:'Reflecting in the x-axis keeps each x the same and flips the sign of each y.',
    explanation:'In the x-axis, (x, y) → (x, −y), giving <b>(1, −2), (4, −2), (4, −5)</b>. Changing the x values instead is a reflection in the y-axis; swapping the numbers is a reflection in y = x; leaving them unchanged means no reflection happened at all.' }),

  makeMCQ({ id:'g7m-transformation-013', chapterId:'g7m-transformation', difficulty:2,
    subsection:'translation',
    question:'After the translation (x − 3, y + 4) a point lands on (2, 6). Where did the point start?',
    options:['(5, 2)','(−1, 10)','(5, 10)','(−1, 2)'],
    answer:'(5, 2)',
    hint:'To go backwards, undo each step: add back the 3, take away the 4.',
    explanation:'Undoing the translation gives (2 + 3, 6 − 4) = <b>(5, 2)</b>. Applying the rule forwards instead of backwards gives (−1, 10); mixing the two directions gives (5, 10) or (−1, 2).' }),

  makeNum({ id:'g7m-transformation-014', chapterId:'g7m-transformation', difficulty:2,
    subsection:'translation',
    question:'A translation maps A(1, 2) onto A′(7, 5). How many units does the shape move <b>horizontally</b>?',
    answer:6,
    hint:'The horizontal move is the change in the x-coordinates only.',
    explanation:'7 − 1 = <b>6</b> units to the right. The vertical move is 5 − 2 = 3 units up, so the full translation is (x + 6, y + 3) — but only the horizontal part was asked for.' }),

  makeMCQ({ id:'g7m-transformation-015', chapterId:'g7m-transformation', difficulty:3,
    subsection:'translation',
    question:'A shape is translated by (x + 3, y − 2) and then by (x − 5, y + 6). Which single translation has the same effect?',
    options:['(x − 2, y + 4)','(x + 8, y − 8)','(x + 2, y + 4)','(x − 2, y − 4)'],
    answer:'(x − 2, y + 4)',
    hint:'Add the two horizontal moves together, then add the two vertical moves together.',
    explanation:'Horizontally +3 then −5 gives −2; vertically −2 then +6 gives +4, so the single translation is <b>(x − 2, y + 4)</b>. Subtracting the moves instead of adding them gives (x + 8, y − 8), and losing a minus sign gives the other two.' }),

  makeMCQ({ id:'g7m-transformation-016', chapterId:'g7m-transformation', difficulty:3,
    subsection:'congruence',
    question:'Shape A is a triangle with sides 7 cm, 8 cm and 9 cm. Shape B is a triangle with sides 7 cm, 8 cm and 10 cm. Which statement is TRUE?',
    options:['They are not congruent, one side differs','They are congruent, two sides do match','They are congruent, both are triangles','They are not congruent, one is a mirror'],
    answer:'They are not congruent, one side differs',
    hint:'Congruent shapes must match in EVERY measurement, not just in most of them.',
    explanation:'9 cm and 10 cm are different, so the triangles are <b>not congruent</b>. Two matching sides are not enough, being the same type of shape is not enough either, and neither triangle is a reflection of the other.' }),

  makeNum({ id:'g7m-transformation-017', chapterId:'g7m-transformation', difficulty:2,
    subsection:'congruence',
    question:'A rectangle 6 cm long and 4 cm wide is reflected in a mirror line. What is the perimeter of the image, in cm?',
    answer:20,
    hint:'A reflection is a congruent transformation — think about what it does to the side lengths.',
    explanation:'A reflection produces a congruent image, so the sides are still 6 cm and 4 cm: perimeter = 2 × (6 + 4) = <b>20 cm</b>. The image is turned round, but no length is changed.' }),

  makeMCQ({ id:'g7m-transformation-018', chapterId:'g7m-transformation', difficulty:2,
    subsection:'congruence',
    question:'Which pair of shapes is <b>NOT</b> congruent?',
    options:['a 5 cm square and a 6 cm square','a triangle and its reflected image','a hexagon and its translated image','two circles each of radius 3 cm'],
    answer:'a 5 cm square and a 6 cm square',
    hint:'Reflections and translations never change size; different measurements do.',
    explanation:'The two squares have different side lengths, so they are the same shape but <b>not the same size</b> — not congruent. Reflections and translations always give a congruent image, and two circles of equal radius match exactly.' }),

  makeNum({ id:'g7m-transformation-019', chapterId:'g7m-transformation', difficulty:2,
    subsection:'congruence',
    question:'A triangle has an area of 24 cm². It is translated 5 units to the right. What is the area of the image, in cm²?',
    answer:24,
    hint:'A translation slides a shape — ask yourself whether sliding changes any length.',
    explanation:'A translation only changes position, so the image is congruent and its area is still <b>24 cm²</b>. The 5 units tells you where the triangle went, not how big it became.' }),

  makeMCQ({ id:'g7m-transformation-020', chapterId:'g7m-transformation', difficulty:4,
    subsection:'translation',
    question:'Triangle T has vertices (2, 1), (6, 1) and (2, 4). It is first reflected in the <b>x-axis</b>, then translated by (x + 1, y). Where is the image of the vertex (6, 1)?',
    options:['(7, −1)','(7, 1)','(5, −1)','(−6, 2)'],
    answer:'(7, −1)',
    hint:'Do one transformation at a time, and write down the point you get after the first one.',
    explanation:'Reflecting (6, 1) in the x-axis gives (6, −1); translating by (x + 1, y) then gives <b>(7, −1)</b>. Forgetting the reflection gives (7, 1); translating the wrong way gives (5, −1); reflecting in the y-axis instead gives a negative x.' })

);

})();
