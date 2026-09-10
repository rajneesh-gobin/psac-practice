'use strict';
// Grade 7 Maths — g7m-coordinates, batch 2A (009–020)
// The grid is generated so that every figure in this file uses the same scale
// and the same axis labels; a child reading two of them reads one picture.

function _b2aGrid(marks, poly) {
  const C = 22, O = 150, L = 18, H = 282;
  let s = '<svg viewBox="0 0 300 300" width="300" height="300" style="display:block;margin:6px auto;max-width:100%;background:#f8fafc;border-radius:8px;border:1px solid #cbd5e1" role="img" aria-label="a coordinate grid diagram">';
  for (let i = -6; i <= 6; i++) {
    const p = O + i * C;
    s += '<line x1="' + p + '" y1="' + L + '" x2="' + p + '" y2="' + H + '" stroke="#e2e8f0" stroke-width="1"/>';
    s += '<line x1="' + L + '" y1="' + p + '" x2="' + H + '" y2="' + p + '" stroke="#e2e8f0" stroke-width="1"/>';
  }
  s += '<line x1="' + L + '" y1="' + O + '" x2="' + H + '" y2="' + O + '" stroke="#1e293b" stroke-width="2"/>';
  s += '<line x1="' + O + '" y1="' + L + '" x2="' + O + '" y2="' + H + '" stroke="#1e293b" stroke-width="2"/>';
  for (const v of [-6, -4, -2, 2, 4, 6]) {
    const t = v < 0 ? '&#8722;' + (-v) : String(v);
    s += '<text x="' + (O + v * C) + '" y="' + (O + 14) + '" text-anchor="middle" font-size="10" font-family="sans-serif" fill="#64748b">' + t + '</text>';
    s += '<text x="' + (O - 6) + '" y="' + (O - v * C + 4) + '" text-anchor="end" font-size="10" font-family="sans-serif" fill="#64748b">' + t + '</text>';
  }
  s += '<text x="' + (H - 3) + '" y="' + (O - 7) + '" text-anchor="end" font-size="12" font-family="sans-serif" fill="#1e293b">x</text>';
  s += '<text x="' + (O + 7) + '" y="' + (L + 11) + '" font-size="12" font-family="sans-serif" fill="#1e293b">y</text>';
  if (poly && poly.length) {
    s += '<polygon points="' + poly.map(p => (O + p[0] * C) + ',' + (O - p[1] * C)).join(' ')
      + '" fill="rgba(37,99,235,0.12)" stroke="#2563eb" stroke-width="2"/>';
  }
  for (const m of marks) {
    const px = O + m.x * C, py = O - m.y * C;
    s += '<circle cx="' + px + '" cy="' + py + '" r="4" fill="#dc2626"/>';
    if (m.label) s += '<text x="' + (px + 7) + '" y="' + (py - 7) + '" font-size="13" font-weight="bold" font-family="sans-serif" fill="#dc2626">' + m.label + '</text>';
  }
  return s + '</svg>';
}

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7m-coordinates-009', chapterId:'g7m-coordinates', difficulty:1,
    subsection:'quadrants',
    question:'A point has a POSITIVE x-coordinate and a NEGATIVE y-coordinate. In which quadrant does it lie?',
    options:['Fourth','First','Second','Third'],
    answer:'Fourth',
    hint:'Quadrants are numbered anticlockwise, starting from the top right.',
    explanation:'Right of the y-axis and below the x-axis is the fourth quadrant. The first has both coordinates positive, the second has x negative and y positive, and the third has both negative.' }),

  makeMCQ({ id:'g7m-coordinates-010', chapterId:'g7m-coordinates', difficulty:2,
    subsection:'quadrants',
    question:'Point P(4, −6) is reflected in the <b>y-axis</b>. In which quadrant does the image lie?',
    options:['Third','First','Second','Fourth'],
    answer:'Third',
    hint:'Reflecting in the y-axis changes the sign of one coordinate only. Which one?',
    explanation:'The image is (−4, −6), and both coordinates negative means the third quadrant. P itself is in the fourth, which is where you stay if you forget to reflect; reflecting in the x-axis instead would give (4, 6) in the first.' }),

  makeMCQ({ id:'g7m-coordinates-011', chapterId:'g7m-coordinates', difficulty:2,
    subsection:'quadrants',
    question:'Which of these points does NOT lie in the second quadrant?',
    options:['(2, 7)','(−1, 5)','(−4, 2)','(−6, 9)'],
    answer:'(2, 7)',
    hint:'In the second quadrant x is negative and y is positive. Check both signs.',
    explanation:'(2, 7) has a positive x, so it sits in the first quadrant. The other three all have a negative x with a positive y, which is exactly the second quadrant.' }),

  makeMCQ({ id:'g7m-coordinates-012', chapterId:'g7m-coordinates', difficulty:2,
    subsection:'quadrants',
    question:'Four points are marked on the grid below. Which one lies in the THIRD quadrant?'
      + _b2aGrid([{ x:3, y:4, label:'A' }, { x:-4, y:2, label:'B' }, { x:-2, y:-5, label:'C' }, { x:5, y:-3, label:'D' }]),
    options:['C','A','B','D'],
    answer:'C',
    hint:'The third quadrant is the bottom-left corner of the grid.',
    explanation:'C is at (−2, −5), with both coordinates negative, so it is in the third quadrant. A is in the first, B is in the second and D is in the fourth.' }),

  makeMCQ({ id:'g7m-coordinates-013', chapterId:'g7m-coordinates', difficulty:2,
    subsection:'plotting_points',
    question:'What are the coordinates of the point marked <b>K</b> on the grid?'
      + _b2aGrid([{ x:-3, y:4, label:'K' }]),
    options:['(−3, 4)','(4, −3)','(3, 4)','(−4, 3)'],
    answer:'(−3, 4)',
    hint:'Read along the x-axis first, then up or down the y-axis.',
    explanation:'K is 3 units to the LEFT of the y-axis and 4 units above the x-axis, so it is (−3, 4). Two of the wrong options give the numbers in the wrong order, and (3, 4) drops the minus sign and lands in the first quadrant instead.' }),

  makeMCQ({ id:'g7m-coordinates-014', chapterId:'g7m-coordinates', difficulty:2,
    subsection:'plotting_points',
    question:'Which of these points lies ON the x-axis?',
    options:['(5, 0)','(0, 5)','(0, −7)','(−2, 3)'],
    answer:'(5, 0)',
    hint:'A point on the x-axis has no height above or below it.',
    explanation:'A point is on the x-axis when its y-coordinate is 0, so (5, 0) qualifies. (0, 5) and (0, −7) have an x-coordinate of 0 and sit on the y-axis instead, and (−2, 3) is off both axes altogether.' }),

  makeNum({ id:'g7m-coordinates-015', chapterId:'g7m-coordinates', difficulty:3,
    subsection:'plotting_points',
    question:'Point A is at (−5, 2) and point B is at (7, 2). How many units long is the line AB?',
    answer:12,
    hint:'Both points have the same y-coordinate, so AB is horizontal. Count the steps across.',
    explanation:'From −5 to 0 is 5 units and from 0 to 7 is 7 more, so AB = 12 units. Subtracting the numbers without noticing the sign gives 7 − 5 = 2, which is far too short to cross the y-axis.' }),

  makeNum({ id:'g7m-coordinates-016', chapterId:'g7m-coordinates', difficulty:4,
    subsection:'plotting_points',
    question:'On a treasure map drawn on a grid, a chest starts at (−4, 6). It is moved 9 units to the right, then 5 units down, then 3 units to the left. What is the x-coordinate of its final position?',
    answer:2,
    hint:'Only two of the three moves change the x-coordinate. Ignore the other one.',
    explanation:'The x-coordinate goes −4 + 9 = 5, then the downward move leaves it alone, then 5 − 3 = 2. The final position is (2, 1). Adding all three numbers to −4 gives 13 by treating "down" as a move across.' }),

  makeMCQ({ id:'g7m-coordinates-017', chapterId:'g7m-coordinates', difficulty:3,
    subsection:'shapes_coordinates',
    question:'P(−2, 1), Q(3, 1) and R(3, 5) are three vertices of a rectangle PQRS. What are the coordinates of S?',
    options:['(−2, 5)','(5, −2)','(−2, −5)','(2, 5)'],
    answer:'(−2, 5)',
    hint:'S must sit directly above P and directly across from R. Sketch the three known points first.',
    explanation:'PQ is horizontal and QR is vertical, so S shares P\'s x-coordinate (−2) and R\'s y-coordinate (5). (5, −2) swaps them, (−2, −5) puts S below the x-axis, and (2, 5) loses the minus sign so the shape is no longer a rectangle.' }),

  makeNum({ id:'g7m-coordinates-018', chapterId:'g7m-coordinates', difficulty:3,
    subsection:'shapes_coordinates',
    question:'A rectangle has vertices at (−3, −2), (5, −2), (5, 4) and (−3, 4). What is its PERIMETER, in units?',
    answer:28,
    hint:'Work out the two side lengths by counting steps, then remember a rectangle has four sides.',
    explanation:'The width runs from −3 to 5, that is 8 units, and the height from −2 to 4, that is 6 units. The perimeter is 2 × (8 + 6) = 28 units. Answering 48 gives the AREA, and 14 adds one width to one height only.' }),

  makeNum({ id:'g7m-coordinates-019', chapterId:'g7m-coordinates', difficulty:4,
    subsection:'shapes_coordinates',
    question:'A triangular flower bed is drawn on a plan with vertices at (0, 0), (8, 0) and (8, 6), where 1 unit stands for 1 metre. One packet of grass seed covers 3 m². How many packets are needed to cover the whole bed?',
    answer:8,
    hint:'The triangle is right-angled at (8, 0). Find its area before you think about packets.',
    explanation:'The base is 8 m and the height is 6 m, so the area is ½ × 8 × 6 = 24 m², and 24 ÷ 3 = 8 packets. Using 8 × 6 = 48 m² forgets to halve and doubles the order to 16 packets.' }),

  makeMCQ({ id:'g7m-coordinates-020', chapterId:'g7m-coordinates', difficulty:2,
    subsection:'shapes_coordinates',
    question:'The four marked points on the grid are joined in order. What shape has been formed?'
      + _b2aGrid([{ x:-3, y:-1 }, { x:3, y:-1 }, { x:2, y:2 }, { x:-1, y:2 }], [[-3, -1], [3, -1], [2, 2], [-1, 2]]),
    options:['Trapezium','Rectangle','Rhombus','Parallelogram'],
    answer:'Trapezium',
    hint:'Count the length of the top edge and the bottom edge. Are the sloping sides parallel too?',
    explanation:'The bottom edge is 6 units and the top edge is 3 units, and both are horizontal, so exactly ONE pair of sides is parallel — a trapezium. A parallelogram would need the sloping sides parallel as well, a rectangle would need right angles, and a rhombus would need all four sides equal.' })

);
