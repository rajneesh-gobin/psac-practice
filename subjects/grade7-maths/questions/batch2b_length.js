'use strict';
// Grade 7 Maths — Length (g7m-length), batch 2B
// IDs: g7m-length-009 … -020

(function () {

const _SVG_L_SHAPE = `<svg viewBox="0 0 200 140" width="200" height="140" role="img" aria-label="A six-sided figure with two of its sides marked with a question mark" style="display:block;margin:6px auto;background:#f0fdf4;border-radius:8px;border:1px solid #86efac">
  <polygon points="20,110 140,110 140,62 92,62 92,38 20,38" fill="#dcfce7" stroke="#15803d" stroke-width="2"/>
  <text x="80" y="126" font-size="9" fill="#14532d" text-anchor="middle">10 cm</text>
  <text x="150" y="90" font-size="9" fill="#14532d">4 cm</text>
  <text x="14" y="78" font-size="9" fill="#14532d" text-anchor="end">6 cm</text>
  <text x="56" y="32" font-size="9" fill="#14532d" text-anchor="middle">6 cm</text>
  <text x="116" y="58" font-size="10" fill="#b91c1c" text-anchor="middle">?</text>
  <text x="101" y="54" font-size="10" fill="#b91c1c">?</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7m-length-009', chapterId:'g7m-length', difficulty:2,
    subsection:'units_length',
    question:'A plank is 2.5 m long. What is its length in <b>millimetres</b>?',
    options:['2,500 mm','250 mm','25,000 mm','25 mm'],
    answer:'2,500 mm',
    hint:'Metres to centimetres first, then centimetres to millimetres.',
    explanation:'2.5 m = 250 cm, and 250 cm = <b>2,500 mm</b>. Stopping after one step gives 250 mm, and doing the second step twice gives 25,000 mm.' }),

  makeMCQ({ id:'g7m-length-010', chapterId:'g7m-length', difficulty:3,
    subsection:'units_length',
    question:'Which of these lengths is the <b>longest</b>?',
    options:['900 mm','0.85 m','88 cm','0.0008 km'],
    answer:'900 mm',
    hint:'Change all four lengths into centimetres before you compare them.',
    explanation:'In centimetres they are 90, 85, 88 and 80, so <b>900 mm</b> is longest. The kilometre value looks impressive but 0.0008 km is only 80 cm.' }),

  makeNum({ id:'g7m-length-011', chapterId:'g7m-length', difficulty:3,
    subsection:'units_length',
    question:'A road sign says the next village is 1.2 km away. What is this distance in <b>centimetres</b>?',
    answer:120000,
    hint:'Kilometres to metres, then metres to centimetres — two separate steps.',
    explanation:'1.2 km = 1,200 m and 1,200 m = <b>120,000 cm</b>. Answering 1,200 stops halfway; answering 12,000 multiplies by 10 instead of 100 in the second step.' }),

  makeMCQ({ id:'g7m-length-012', chapterId:'g7m-length', difficulty:1,
    subsection:'units_length',
    question:'Which unit is best for measuring the thickness of a coin?',
    options:['millimetre','centimetre','metre','kilometre'],
    answer:'millimetre',
    hint:'A coin is thinner than the width of your fingernail.',
    explanation:'A coin is only 2 or 3 <b>millimetres</b> thick. A centimetre is already the width of a fingernail, a metre is about the height of a table, and a kilometre is a walking distance.' }),

  makeNum({ id:'g7m-length-013', chapterId:'g7m-length', difficulty:3,
    subsection:'perimeter',
    question:'A rectangle has a perimeter of 46 cm and a length of 14 cm. What is its width, in cm?',
    answer:9,
    hint:'Two lengths and two widths make the perimeter. Take the two lengths away first.',
    explanation:'The two lengths use 2 × 14 = 28 cm, leaving 46 − 28 = 18 cm for the two widths, so the width is 18 ÷ 2 = <b>9 cm</b>. Doing 46 − 14 = 32 forgets that there are two lengths.' }),

  makeMCQ({ id:'g7m-length-014', chapterId:'g7m-length', difficulty:3,
    subsection:'perimeter',
    question:`${_SVG_L_SHAPE}All the corners of this figure are right angles. What is its perimeter?`,
    options:['32 cm','28 cm','30 cm','36 cm'],
    answer:'32 cm',
    hint:'The two unmarked sides can be worked out from the sides you are given.',
    explanation:'The missing horizontal side is 10 − 6 = 4 cm and the missing vertical side is 6 − 4 = 2 cm. Adding all six sides: 10 + 4 + 4 + 2 + 6 + 6 = <b>32 cm</b>. Adding only the four labelled sides gives 26 cm, and guessing 2 cm for both missing sides gives 30 cm.' }),

  makeNum({ id:'g7m-length-015', chapterId:'g7m-length', difficulty:4,
    subsection:'perimeter',
    question:'A rectangular garden measures 18 m by 12 m. A fence post is placed at every corner and then every 3 m all the way round. How many posts are needed?',
    answer:20,
    hint:'Work out the distance all the way round first, then think about how many 3 m gaps fit into it.',
    explanation:'The perimeter is 2 × (18 + 12) = 60 m, and 60 ÷ 3 = <b>20 posts</b>. Because the fence closes into a loop, the number of posts equals the number of gaps — there is no extra post at the end.' }),

  makeMCQ({ id:'g7m-length-016', chapterId:'g7m-length', difficulty:3,
    subsection:'perimeter',
    question:'A square has the same perimeter as a rectangle measuring 10 cm by 6 cm. What is the length of one side of the square?',
    options:['8 cm','4 cm','6 cm','16 cm'],
    answer:'8 cm',
    hint:'Find the rectangle’s perimeter, then share it between four equal sides.',
    explanation:'The rectangle’s perimeter is 2 × (10 + 6) = 32 cm, so the square’s side is 32 ÷ 4 = <b>8 cm</b>. 16 cm is half the perimeter, and 4 cm comes from dividing 16 by 4 instead of 32.' }),

  makeNum({ id:'g7m-length-017', chapterId:'g7m-length', difficulty:4,
    subsection:'distance_problems',
    question:'Yash cycles 2.4 km from home to school and the same way back, five days a week. How many kilometres does he cycle in one school week?',
    answer:24,
    hint:'One school day is two journeys, not one.',
    explanation:'Each day he cycles 2 × 2.4 = 4.8 km, so in five days he covers 5 × 4.8 = <b>24 km</b>. Answering 12 km counts the journey to school only.' }),

  makeMCQ({ id:'g7m-length-018', chapterId:'g7m-length', difficulty:3,
    subsection:'distance_problems',
    question:'A coach drives 22 km from Port Louis to Curepipe, then 28 km on to Mahébourg. In the evening it drives the whole way back along the same road. What is the total distance driven?',
    options:['100 km','50 km','78 km','122 km'],
    answer:'100 km',
    hint:'Work out the one-way distance, then remember the coach does it twice.',
    explanation:'One way is 22 + 28 = 50 km, and the return doubles it: 2 × 50 = <b>100 km</b>. 50 km is the outward trip only, and 78 km adds one extra leg instead of the whole return.' }),

  makeNum({ id:'g7m-length-019', chapterId:'g7m-length', difficulty:3,
    subsection:'distance_problems',
    question:'A piece of wire 12 m long is bent to make a square. How long is one side of the square, in <b>centimetres</b>?',
    answer:300,
    hint:'The wire becomes the perimeter. Convert only after you have found the side.',
    explanation:'12 ÷ 4 = 3 m for each side, and 3 m = <b>300 cm</b>. Answering 3 gives the correct side but in metres, not the centimetres asked for.' }),

  makeMCQ({ id:'g7m-length-020', chapterId:'g7m-length', difficulty:4,
    subsection:'distance_problems',
    question:'A room measures 8 m by 5 m. Skirting board is fitted all the way round the floor, except across a doorway 1 m wide. How much skirting board is needed?',
    options:['25 m','26 m','24 m','13 m'],
    answer:'25 m',
    hint:'Start from the distance all the way round the room, then deal with the doorway.',
    explanation:'The perimeter is 2 × (8 + 5) = 26 m, and the doorway takes away 1 m: 26 − 1 = <b>25 m</b>. 26 m forgets the doorway, and 13 m is only half of the way round.' })

);

})();
