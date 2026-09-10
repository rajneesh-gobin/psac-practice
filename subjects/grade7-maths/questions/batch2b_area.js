'use strict';
// Grade 7 Maths — Area (g7m-area), batch 2B
// IDs: g7m-area-009 … -020

(function () {

const _SVG_TRI_HEIGHT = `<svg viewBox="0 0 210 125" width="210" height="125" role="img" aria-label="A triangle with three of its measurements marked, one of them a dashed line" style="display:block;margin:6px auto;background:#eff6ff;border-radius:8px;border:1px solid #bfdbfe">
  <polygon points="25,95 185,95 120,25" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="120" y1="25" x2="120" y2="95" stroke="#b91c1c" stroke-width="1.6" stroke-dasharray="4,3"/>
  <rect x="110" y="85" width="10" height="10" fill="none" stroke="#b91c1c" stroke-width="1.2"/>
  <text x="105" y="112" font-size="9.5" fill="#1e3a8a" text-anchor="middle">9 cm</text>
  <text x="126" y="62" font-size="9.5" fill="#b91c1c">4 cm</text>
  <text x="60" y="52" font-size="9.5" fill="#1e3a8a" text-anchor="middle">6 cm</text>
</svg>`;

const _SVG_HOUSE = `<svg viewBox="0 0 210 155" width="210" height="155" role="img" aria-label="A shape made from a rectangle with a triangle resting on top of it" style="display:block;margin:6px auto;background:#fffbeb;border-radius:8px;border:1px solid #fde68a">
  <rect x="45" y="65" width="120" height="70" fill="#fef3c7" stroke="#b45309" stroke-width="2"/>
  <polygon points="45,65 165,65 105,20" fill="#fde68a" stroke="#b45309" stroke-width="2"/>
  <line x1="105" y1="20" x2="105" y2="65" stroke="#b91c1c" stroke-width="1.4" stroke-dasharray="4,3"/>
  <text x="105" y="150" font-size="9.5" fill="#78350f" text-anchor="middle">8 cm</text>
  <text x="172" y="104" font-size="9.5" fill="#78350f">5 cm</text>
  <text x="110" y="48" font-size="9.5" fill="#b91c1c">3 cm</text>
</svg>`;

const _SVG_STEP = `<svg viewBox="0 0 200 150" width="200" height="150" role="img" aria-label="A six-sided figure with all its corners at right angles" style="display:block;margin:6px auto;background:#faf5ff;border-radius:8px;border:1px solid #ddd6fe">
  <polygon points="20,130 128,130 128,70 68,70 68,22 20,22" fill="#ede9fe" stroke="#6d28d9" stroke-width="2"/>
  <line x1="20" y1="70" x2="128" y2="70" stroke="#a78bfa" stroke-width="1.2" stroke-dasharray="4,3"/>
  <text x="74" y="145" font-size="9.5" fill="#4c1d95" text-anchor="middle">9 cm</text>
  <text x="136" y="104" font-size="9.5" fill="#4c1d95">5 cm</text>
  <text x="44" y="16" font-size="9.5" fill="#4c1d95" text-anchor="middle">4 cm</text>
  <text x="14" y="50" font-size="9.5" fill="#4c1d95" text-anchor="end">4 cm</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeNum({ id:'g7m-area-009', chapterId:'g7m-area', difficulty:3,
    subsection:'rectangle_area',
    question:'A rectangle has an area of 96 cm² and a width of 8 cm. What is its length, in cm?',
    answer:12,
    hint:'Area = length × width, so run the multiplication backwards.',
    explanation:'96 ÷ 8 = <b>12 cm</b>. Check it: 12 × 8 = 96 cm². Subtracting instead of dividing would give 88, which is far too long for a rectangle of this area.' }),

  makeMCQ({ id:'g7m-area-010', chapterId:'g7m-area', difficulty:2,
    subsection:'rectangle_area',
    question:'How many square centimetres are there in 1 square metre?',
    options:['10,000 cm²','100 cm²','1,000 cm²','1,000,000 cm²'],
    answer:'10,000 cm²',
    hint:'A square metre is a square 100 cm along each side. Find its area in centimetres.',
    explanation:'1 m² is 100 cm × 100 cm = <b>10,000 cm²</b>. 100 cm² is the conversion for length, not for area — with area the conversion factor is squared as well.' }),

  makeNum({ id:'g7m-area-011', chapterId:'g7m-area', difficulty:4,
    subsection:'rectangle_area',
    question:'A floor measuring 6 m by 4 m is covered with square tiles of side 50 cm. How many tiles are needed?',
    answer:96,
    hint:'Work in the same unit throughout: how many 50 cm tiles fit along a 6 m side?',
    explanation:'Along the 6 m side 12 tiles fit (6 m = 600 cm), and along the 4 m side 8 tiles fit, so 12 × 8 = <b>96 tiles</b>. Dividing 24 m² by 50 mixes square metres with centimetres and gives a meaningless answer.' }),

  makeMCQ({ id:'g7m-area-012', chapterId:'g7m-area', difficulty:3,
    subsection:'rectangle_area',
    question:'A pupil was asked for the area of a rectangle 7 cm by 5 cm and wrote 24 cm². What did the pupil actually calculate?',
    options:['the perimeter, not the area','the area, but in the wrong unit','half of the correct area','the length plus the width'],
    answer:'the perimeter, not the area',
    hint:'Work out 2 × (7 + 5) and compare it with the pupil’s number.',
    explanation:'2 × (7 + 5) = 24, so the pupil found the <b>perimeter</b> instead of the area, which is 7 × 5 = 35 cm². Half of 35 is 17.5, and 7 + 5 is only 12.' }),

  makeNum({ id:'g7m-area-013', chapterId:'g7m-area', difficulty:3,
    subsection:'triangle_area',
    question:'A triangle has an area of 30 cm² and a base of 12 cm. What is its height, in cm?',
    answer:5,
    hint:'Area = ½ × base × height. Double the area before you divide.',
    explanation:'Doubling the area gives 60, and 60 ÷ 12 = <b>5 cm</b>. Dividing 30 by 12 straight away gives 2.5, which forgets the ½ in the formula.' }),

  makeMCQ({ id:'g7m-area-014', chapterId:'g7m-area', difficulty:2,
    subsection:'triangle_area',
    question:`${_SVG_TRI_HEIGHT}What is the area of this triangle?`,
    options:['18 cm²','27 cm²','12 cm²','36 cm²'],
    answer:'18 cm²',
    hint:'Only one of the three measurements is the perpendicular height — look for the right-angle mark.',
    explanation:'The perpendicular height is the dashed 4 cm line, so the area is ½ × 9 × 4 = <b>18 cm²</b>. Using the 6 cm slanting side gives 27 cm², and forgetting the ½ gives 36 cm².' }),

  makeNum({ id:'g7m-area-015', chapterId:'g7m-area', difficulty:2,
    subsection:'triangle_area',
    question:'Find the area of a triangle with a base of 14 cm and a perpendicular height of 5 cm, in cm².',
    answer:35,
    hint:'A triangle is half of a rectangle with the same base and height.',
    explanation:'½ × 14 × 5 = <b>35 cm²</b>. The matching rectangle would have an area of 70 cm², and the triangle covers exactly half of it.' }),

  makeMCQ({ id:'g7m-area-016', chapterId:'g7m-area', difficulty:3,
    subsection:'triangle_area',
    question:'A triangle and a rectangle have the same base of 10 cm and the same height of 6 cm. How many times larger is the area of the rectangle?',
    options:['2 times','1½ times','3 times','4 times'],
    answer:'2 times',
    hint:'Work out both areas, then compare them — the actual numbers matter less than the relationship.',
    explanation:'The rectangle covers 10 × 6 = 60 cm² and the triangle ½ × 10 × 6 = 30 cm², so the rectangle is <b>2 times</b> larger. This is true for any pair with the same base and height, whatever the numbers are.' }),

  makeMCQ({ id:'g7m-area-017', chapterId:'g7m-area', difficulty:3,
    subsection:'compound_shapes',
    question:`${_SVG_HOUSE}What is the total area of this shape?`,
    options:['52 cm²','40 cm²','64 cm²','76 cm²'],
    answer:'52 cm²',
    hint:'Split the shape into the two simple figures you already know how to measure.',
    explanation:'Rectangle: 8 × 5 = 40 cm². Triangle: ½ × 8 × 3 = 12 cm². Total = <b>52 cm²</b>. 40 cm² leaves out the roof, and 64 cm² treats the triangle as a rectangle.' }),

  makeNum({ id:'g7m-area-018', chapterId:'g7m-area', difficulty:4,
    subsection:'compound_shapes',
    question:'A hall measures 12 m by 9 m. A square store room 3 m by 3 m is built into one corner and is not carpeted. Carpet costs Rs 250 per square metre. What is the total cost of the carpet, in rupees?',
    answer:24750,
    hint:'Find the area that actually gets carpeted before you touch the price.',
    explanation:'The hall is 12 × 9 = 108 m² and the store room takes away 3 × 3 = 9 m², leaving 99 m². Then 99 × 250 = <b>Rs 24,750</b>. Carpeting the whole hall would have cost Rs 27,000.' }),

  makeNum({ id:'g7m-area-019', chapterId:'g7m-area', difficulty:3,
    subsection:'compound_shapes',
    question:`${_SVG_STEP}All the corners of this figure are right angles. What is its area, in cm²?`,
    answer:61,
    hint:'The dashed line splits the figure into two rectangles.',
    explanation:'The lower rectangle is 9 × 5 = 45 cm² and the upper one is 4 × 4 = 16 cm², giving 45 + 16 = <b>61 cm²</b>. Treating the whole figure as a 9 cm by 9 cm square would give 81 cm², counting a corner that is not there.' }),

  makeMCQ({ id:'g7m-area-020', chapterId:'g7m-area', difficulty:4,
    subsection:'compound_shapes',
    question:'A rectangular garden measures 10 m by 6 m. A concrete path 1 m wide is laid all the way round the OUTSIDE of the garden. What is the area of the path?',
    options:['36 m²','32 m²','40 m²','60 m²'],
    answer:'36 m²',
    hint:'Draw the big rectangle that includes the path. The path is 1 m wide on both sides of each dimension.',
    explanation:'Including the path the rectangle is 12 m by 8 m = 96 m². Taking away the garden, 96 − 60 = <b>36 m²</b>. 32 m² comes from adding 1 m only once to each dimension, and 60 m² is the garden itself.' })

);

})();
