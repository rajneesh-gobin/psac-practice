'use strict';
// Grade 6 Mathematics - questions that require READING A STIMULUS: a graph,
// pictogram, table, grid or shape cropped from the real MES papers
// (assets/past-papers/g6-maths-20xx/).
//
// WHY THIS FILE EXISTS
// Measured 2026-09-09. In the 2024 Mathematics paper, 41 of the 100 marks hang
// on reading something - the line graph [5], the pictogram [7], the flight
// table [5], the seven-triangles figure [5], the clock face, the money, the
// prism, the bar chart, the shaded grids. That is not a one-year quirk: every
// paper from 2019 to 2024 carries 8-13 such questions.
//
//   stimulus-dependent          paper ~41% of marks
//   items carrying a stimulus   bank    5.1%  (35 of 680)
//
// That was the largest single gap in the whole Grade 6 bank - larger than
// Science's diagram gap and larger than History's reasons gap.
//
// ⚠ Numeric answers use makeNum ON PURPOSE. The paper makes a child WRITE the
//   number; an MCQ would let them pick it. Where the paper itself offers a
//   choice (which shape, which school) makeMCQ matches it.
// ⚠ Every value below was read off the cropped artwork and checked, not
//   assumed: the 2019 grid really is 11 of 30 shaded, the 2021 pictogram is
//   3.5 / 6 / 2.5 symbols, the line graph runs (0,0) to (5 kg, Rs 100).
// ⚠ Alt text says what a reader would see, never what the question is testing.

const _g6mRead = (year, file, alt) =>
  `<img src="assets/past-papers/g6-maths-${year}/${file}.png" alt="${alt}"` +
  ` style="display:block;margin:8px auto;max-width:min(100%,420px);height:auto;` +
  `border-radius:6px;background:#fff">`;

const _MALT = {
  graph:    'A line graph with mass in kilograms along the bottom and cost in rupees up the side',
  picto24:  'A pictogram with one labelled row per day, drawn with whole and half circle symbols',
  picto21:  'A pictogram with one row per school, drawn with whole and part figures of children',
  shells:   'A pictogram with one row per child, drawn with whole and part circle symbols, and a key beneath',
  grid30:   'A rectangle ruled into a grid of small squares, some of them shaded',
  grid9:    'A square ruled into nine smaller squares, some of them shaded',
  solids:   'Four solid shapes drawn in three dimensions, two of them labelled',
  prism:    'A solid shape with triangular ends drawn in three dimensions',
  quads:    'Four quadrilaterals labelled A to D, some with tick marks or arrows on their sides',
  parts:    'Four squares labelled A to D, each divided up with some parts shaded',
  rectTri:  'A rectangle and a triangle drawn side by side, with two lengths marked on the rectangle',
  compass:  'An eight-point compass rose with north marked and one arm labelled R',
  angles:   'Four angles labelled A to D, each drawn as two lines meeting at a point',
  kite:     'A four-sided shape with tick marks on its sides',
};

STATIC_QUESTIONS.push(

  // ── Reading a line graph ────────────────────────────────────────────────

  makeNum({ id:'g6m-read-001', chapterId:'g6-graphs', subsection:'line_graph', difficulty:2,
    question:'The line graph shows the cost of lentils in a supermarket.' +
      _g6mRead(2024,'q40-line-graph',_MALT.graph) +
      'Use the graph. What is the cost of <b>3 kg</b> of lentils, in rupees?',
    answer:60, acceptableAnswers:['60','Rs 60'],
    hint:'Find 3 on the bottom axis, go up to the line, then across to the cost.',
    explanation:'At 3 kg the line is level with <b>Rs 60</b> on the cost axis.' }),

  makeNum({ id:'g6m-read-002', chapterId:'g6-graphs', subsection:'line_graph', difficulty:2,
    question:'The line graph shows the cost of lentils in a supermarket.' +
      _g6mRead(2024,'q40-line-graph',_MALT.graph) +
      'How many <b>kilograms</b> of lentils can be bought with Rs 40?',
    answer:2, acceptableAnswers:['2','2 kg'],
    hint:'Start at 40 on the cost axis this time, go across to the line, then down.',
    explanation:'Rs 40 on the cost axis meets the line above <b>2 kg</b> on the mass axis.' }),

  makeNum({ id:'g6m-read-003', chapterId:'g6-graphs', subsection:'line_graph', difficulty:3,
    question:'The line graph shows the cost of lentils in a supermarket.' +
      _g6mRead(2024,'q40-line-graph',_MALT.graph) +
      'The graph stops at 5 kg. What would <b>8 kg</b> of lentils cost, in rupees?',
    answer:160, acceptableAnswers:['160','Rs 160'],
    hint:'Work out the cost of 1 kg from the graph first, then multiply.',
    explanation:'The graph shows 5 kg costing Rs 100, so 1 kg costs Rs 100 ÷ 5 = Rs 20. Then 8 × Rs 20 = <b>Rs 160</b>.' }),

  // ── Reading pictograms ──────────────────────────────────────────────────

  makeNum({ id:'g6m-read-004', chapterId:'g6-graphs', subsection:'pictogram', difficulty:3,
    question:'The pictogram shows customers visiting a restaurant. Each whole symbol stands for <b>100 customers</b>.' +
      _g6mRead(2024,'q41-pictogram',_MALT.picto24) +
      'How many customers came on <b>Thursday</b>?',
    answer:400, acceptableAnswers:['400'],
    hint:'Count Thursday\'s symbols, then multiply by 100.',
    explanation:'Thursday shows 4 whole symbols. 4 × 100 = <b>400 customers</b>.' }),

  makeNum({ id:'g6m-read-005', chapterId:'g6-graphs', subsection:'pictogram', difficulty:3,
    question:'The pictogram shows customers visiting a restaurant. Each whole symbol stands for <b>100 customers</b>.' +
      _g6mRead(2024,'q41-pictogram',_MALT.picto24) +
      'How many customers came on <b>Saturday</b>?',
    answer:550, acceptableAnswers:['550'],
    hint:'Saturday has some whole symbols and one half symbol. A half symbol is 50 customers.',
    explanation:'Saturday shows 5 whole symbols and 1 half symbol: (5 × 100) + 50 = <b>550 customers</b>.' }),

  makeMCQ({ id:'g6m-read-006', chapterId:'g6-graphs', subsection:'pictogram', difficulty:2,
    question:'The pictogram shows how many pupils from three schools took part in a competition.' +
      _g6mRead(2021,'q41-pictogram',_MALT.picto21) +
      'Which school had the <b>greatest</b> number of participants?',
    options:['Star Kids','Happy Kids','Power Kids','They were equal'], answer:'Star Kids',
    hint:'Which row is the longest?',
    explanation:'<b>Star Kids</b> has 6 whole figures, more than Happy Kids (3½) or Power Kids (2½).' }),

  makeNum({ id:'g6m-read-007', chapterId:'g6-graphs', subsection:'pictogram', difficulty:3,
    question:'The pictogram shows pupils from three schools. Each whole figure stands for <b>2 pupils</b>.' +
      _g6mRead(2021,'q41-pictogram',_MALT.picto21) +
      'How many pupils took part from <b>Star Kids</b>?',
    answer:12, acceptableAnswers:['12'],
    hint:'Count the figures in the Star Kids row, then multiply by 2.',
    explanation:'Star Kids shows 6 whole figures. 6 × 2 = <b>12 pupils</b>.' }),

  makeNum({ id:'g6m-read-008', chapterId:'g6-graphs', subsection:'pictogram', difficulty:3,
    question:'The pictogram shows pupils from three schools. Each whole figure stands for <b>2 pupils</b>.' +
      _g6mRead(2021,'q41-pictogram',_MALT.picto21) +
      'How many pupils took part <b>altogether</b>?',
    answer:24, acceptableAnswers:['24'],
    hint:'Add the three rows first, counting a part figure as a half, then multiply by 2.',
    explanation:'3½ + 6 + 2½ = 12 figures in all. 12 × 2 = <b>24 pupils</b>.' }),

  makeMCQ({ id:'g6m-read-009', chapterId:'g6-graphs', subsection:'pictogram', difficulty:2,
    question:'The pictogram shows how many shells five friends collected.' +
      _g6mRead(2023,'q43-shells',_MALT.shells) +
      'Who collected the <b>fewest</b> shells?',
    options:['Samuel','Riya','Jennifer','Ricardo'], answer:'Samuel',
    hint:'Which row has the fewest symbols?',
    explanation:'<b>Samuel</b> has only 3 symbols; every other row has 4 or more.' }),

  makeNum({ id:'g6m-read-010', chapterId:'g6-graphs', subsection:'pictogram', difficulty:3,
    question:'The pictogram shows shells collected by five friends. The key says one symbol stands for <b>4 shells</b>.' +
      _g6mRead(2023,'q43-shells',_MALT.shells) +
      'How many shells did <b>Riya</b> collect?',
    answer:16, acceptableAnswers:['16'],
    hint:'Count Riya\'s symbols, then multiply by the number in the key.',
    explanation:'Riya has 4 whole symbols. 4 × 4 = <b>16 shells</b>.' }),

  makeNum({ id:'g6m-read-011', chapterId:'g6-graphs', subsection:'pictogram', difficulty:3,
    question:'The pictogram shows shells collected by five friends. One symbol stands for <b>4 shells</b>.' +
      _g6mRead(2023,'q43-shells',_MALT.shells) +
      'How many shells did <b>Samuel</b> collect?',
    answer:12, acceptableAnswers:['12'],
    hint:'Samuel has the shortest row. Count it, then multiply by 4.',
    explanation:'Samuel has 3 whole symbols. 3 × 4 = <b>12 shells</b>.' }),

  // ── Reading a grid ──────────────────────────────────────────────────────

  makeNum({ id:'g6m-read-012', chapterId:'g6-fractions', subsection:'fraction_of', difficulty:2,
    question:'The diagram shows 30 small squares arranged in a rectangle.' +
      _g6mRead(2019,'q34-squares',_MALT.grid30) +
      'How many of the squares are <b>shaded</b>?',
    answer:11, acceptableAnswers:['11'],
    hint:'Count the shaded squares row by row so you do not lose your place.',
    explanation:'Counting row by row gives 2 + 2 + 3 + 3 + 1 = <b>11 shaded squares</b> out of 30.' }),

  makeNum({ id:'g6m-read-013', chapterId:'g6-fractions', subsection:'fraction_of', difficulty:3,
    question:'The diagram shows 30 small squares arranged in a rectangle.' +
      _g6mRead(2019,'q34-squares',_MALT.grid30) +
      'How many <b>more</b> squares must be shaded so that exactly half the diagram is shaded?',
    answer:4, acceptableAnswers:['4'],
    hint:'Work out half of 30 first, then count how many are already shaded.',
    explanation:'Half of 30 is 15. There are 11 shaded already, so 15 − 11 = <b>4 more</b> squares.' }),

  makeNum({ id:'g6m-read-014', chapterId:'g6-fractions', subsection:'fraction_of', difficulty:2,
    question:'The square below is divided into nine equal parts.' +
      _g6mRead(2019,'q15-symmetry',_MALT.grid9) +
      'How many of the nine parts are <b>shaded</b>?',
    answer:3, acceptableAnswers:['3'],
    hint:'Count the grey squares.',
    explanation:'Three of the nine small squares are shaded, so the shaded fraction is 3/9, which is 1/3.' }),

  // ── Reading solid shapes ────────────────────────────────────────────────

  makeNum({ id:'g6m-read-015', chapterId:'g6-geometry', subsection:'3d_shapes', difficulty:2,
    question:'Four solid shapes are shown below.' +
      _g6mRead(2022,'q30-shapes',_MALT.solids) +
      'How many <b>vertices</b> (corners) does shape <b>B</b> have?',
    answer:8, acceptableAnswers:['8'],
    hint:'Shape B is a cuboid. Count the corners, including the dashed ones at the back.',
    explanation:'A cuboid has <b>8 vertices</b> - four at the front and four at the back. It also has 6 faces and 12 edges.' }),

  makeMCQ({ id:'g6m-read-016', chapterId:'g6-geometry', subsection:'3d_shapes', difficulty:2,
    question:'Four solid shapes are shown below.' +
      _g6mRead(2022,'q30-shapes',_MALT.solids) +
      'Which shape has a <b>curved</b> surface?',
    options:['Shape A','Shape B','Neither of them','Both A and B'], answer:'Shape A',
    hint:'One of the labelled shapes has no flat sides going round it.',
    explanation:'<b>Shape A</b> is a cylinder: it has two flat circular ends and one curved surface joining them. Shape B, the cuboid, has six flat faces.' }),

  makeNum({ id:'g6m-read-017', chapterId:'g6-geometry', subsection:'3d_shapes', difficulty:2,
    question:'The solid shape below has triangular ends.' +
      _g6mRead(2021,'q17-prism',_MALT.prism) +
      'How many <b>edges</b> does this shape have?',
    answer:9, acceptableAnswers:['9'],
    hint:'Count the three edges round each triangular end, then the ones joining them.',
    explanation:'A triangular prism has 3 edges on each triangular end and 3 joining edges: 3 + 3 + 3 = <b>9 edges</b>. It also has 5 faces and 6 vertices.' }),

  // ── Reading flat shapes ─────────────────────────────────────────────────

  makeMCQ({ id:'g6m-read-018', chapterId:'g6-geometry', subsection:'2d_shapes', difficulty:3,
    question:'Four quadrilaterals are shown below. The arrows on a side show which sides are parallel.' +
      _g6mRead(2024,'q20-quadrilaterals',_MALT.quads) +
      'Which shape has <b>exactly one</b> pair of parallel sides?',
    options:['D','A','B','C'], answer:'D',
    hint:'Count the pairs of arrows on each shape. One pair of arrows means one pair of parallel sides.',
    explanation:'Shape <b>D</b> has arrows on its top and bottom sides only - one pair of parallel sides, which makes it a trapezium. Shape B has two pairs, so it is a parallelogram.' }),

  makeMCQ({ id:'g6m-read-019', chapterId:'g6-fractions', subsection:'equivalent', difficulty:2,
    question:'Four squares are shown below, each divided into equal parts.' +
      _g6mRead(2024,'q26-shaded-figures',_MALT.parts) +
      'Which square is divided into <b>nine</b> equal parts?',
    options:['B','A','C','D'], answer:'B',
    hint:'Count the parts in each square. You are looking for a three-by-three grid.',
    explanation:'Square <b>B</b> is ruled into three rows of three, giving nine equal parts. A is divided into eight triangles and C into six rectangles.' }),

  makeNum({ id:'g6m-read-020', chapterId:'g6-geometry', subsection:'perimeter', difficulty:2,
    question:'Rectangle <b>P</b> and triangle <b>Q</b> are shown below.' +
      _g6mRead(2023,'q39-shapes',_MALT.rectTri) +
      'Using the lengths marked on the diagram, find the <b>perimeter</b> of rectangle P, in cm.',
    answer:60, acceptableAnswers:['60','60 cm'],
    hint:'A rectangle has two long sides and two short sides. Read both lengths off the diagram.',
    explanation:'The rectangle is 20 cm long and 10 cm wide. Perimeter = 20 + 10 + 20 + 10 = <b>60 cm</b>.' }),

  makeMCQ({ id:'g6m-read-021', chapterId:'g6-geometry', subsection:'angles', difficulty:2,
    question:'The compass rose below has one arm labelled <b>R</b>.' +
      _g6mRead(2023,'q26-compass',_MALT.compass) +
      'Which direction is <b>opposite</b> to R?',
    options:['South East','North East','South West','North West'], answer:'South East',
    hint:'Find R first, then follow the line straight through the centre to the other side.',
    explanation:'R points north-west, and the arm directly opposite on the compass is <b>south-east</b>.' }),

  makeMCQ({ id:'g6m-read-022', chapterId:'g6-geometry', subsection:'angles', difficulty:2,
    question:'Four angles are shown below.' +
      _g6mRead(2021,'q25-angles',_MALT.angles) +
      'Which one is a <b>right angle</b>?',
    options:['B','A','C','D'], answer:'B',
    hint:'A right angle is a quarter turn, and is usually marked with a small square.',
    explanation:'Angle <b>B</b> is drawn as a quarter turn with the small square that marks 90°. A is obtuse, C is reflex and D is acute.' })

);
