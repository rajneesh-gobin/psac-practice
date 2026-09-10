'use strict';
// Grade 8 Mathematics - Volume, batch 2 (011-020).
// Volume is reversed to a missing height, to an edge and to a cross-section
// area; the conversions run cm3 to m3 and metres to litres rather than only
// litres to cm3; and the prisms use a trapezium cross-section, which is what a
// sloping-floor swimming pool actually is.

STATIC_QUESTIONS.push(

  makeNum({
    id: 'g8m-volume-011', chapterId: 'g8m-volume', difficulty: 3,
    subsection: 'cuboid_volume',
    question: 'A cuboid has a <b>volume of 240 cm&sup3;</b>. Its length is <b>8 cm</b> and its width is <b>5 cm</b>. What is its <b>height</b>, in cm?',
    answer: 6,
    hint: 'Find the area of the base first, then ask how many layers of that base make 240 cm&sup3;.',
    explanation: 'The base is 8 &times; 5 = 40 cm&sup2;, and 240 &divide; 40 = 6 cm. Dividing 240 by 8 and then by 8 again, or by 13 (the two sides added), does not undo the multiplication that made the volume.'
  }),

  makeMCQ({
    id: 'g8m-volume-012', chapterId: 'g8m-volume', difficulty: 3,
    subsection: 'cuboid_volume',
    question: 'A cube has a <b>volume of 216 cm&sup3;</b>. How long is <b>one edge</b>?',
    options: ['6 cm', '8 cm', '36 cm', '12 cm'],
    answer: '6 cm',
    hint: 'All three dimensions of a cube are the same, so you need a cube root.',
    explanation: '6 &times; 6 &times; 6 = 216, so one edge is 6 cm. 36 cm is 216 &divide; 6, which is the area of a face, and 12 cm comes from halving instead of taking a cube root.'
  }),

  makeNum({
    id: 'g8m-volume-013', chapterId: 'g8m-volume', difficulty: 4,
    subsection: 'cuboid_volume',
    question: 'A box measures <b>30 cm long, 20 cm wide and 15 cm high</b>. How many wooden cubes of side <b>5 cm</b> fit inside it exactly, with no gaps?',
    answer: 72,
    hint: 'How many cubes fit along each edge of the box? Then multiply the three counts.',
    explanation: 'Along the edges: 30 &divide; 5 = 6, 20 &divide; 5 = 4 and 15 &divide; 5 = 3, so 6 &times; 4 &times; 3 = 72 cubes. Checking by volume gives the same: 9,000 &divide; 125 = 72. Dividing 9,000 by 5 gives 1,800, which counts 1 cm slices, not 5 cm cubes.'
  }),

  makeMCQ({
    id: 'g8m-volume-014', chapterId: 'g8m-volume', difficulty: 2,
    subsection: 'unit_conversion',
    question: 'How many <b>cm&sup3;</b> are there in <b>1 m&sup3;</b>?',
    options: ['1,000,000', '10,000', '100,000', '1,000'],
    answer: '1,000,000',
    hint: '1 m = 100 cm, and a cubic metre is 100 cm by 100 cm by 100 cm.',
    explanation: '100 &times; 100 &times; 100 = 1,000,000 cm&sup3;. 10,000 is the number of cm&sup2; in 1 m&sup2; (only two dimensions), and 1,000 is the number of cm&sup3; in a litre.'
  }),

  makeNum({
    id: 'g8m-volume-015', chapterId: 'g8m-volume', difficulty: 3,
    subsection: 'unit_conversion',
    question: 'A water tank holds <b>0.75 m&sup3;</b> of water. How many <b>litres</b> is that?',
    answer: 750,
    hint: '1 m&sup3; is 1,000 litres. Nothing else is needed.',
    explanation: '0.75 &times; 1,000 = 750 litres. Answering 75 or 7,500 moves the decimal point by the wrong number of places; 0.75 m&sup3; is three quarters of a cubic metre, so it must be three quarters of 1,000 litres.'
  }),

  makeMCQ({
    id: 'g8m-volume-016', chapterId: 'g8m-volume', difficulty: 3,
    subsection: 'unit_conversion',
    question: 'A juice carton holds <b>250 ml</b>. How many <b>full cartons</b> can be filled from a <b>6 litre</b> container?',
    options: ['24', '20', '30', '12'],
    answer: '24',
    hint: 'Put both amounts into the same unit before dividing.',
    explanation: '6 litres is 6,000 ml, and 6,000 &divide; 250 = 24 cartons. Dividing 6 by 250 gives 0.024, and 12 would be right only if a carton held 500 ml.'
  }),

  makeNum({
    id: 'g8m-volume-017', chapterId: 'g8m-volume', difficulty: 3,
    subsection: 'prism_volume',
    question: 'A prism has a <b>trapezium</b> cross-section whose parallel sides are <b>8 cm</b> and <b>12 cm</b> and whose height is <b>5 cm</b>. The prism is <b>9 cm</b> long. Find its <b>volume</b>, in cm&sup3;.',
    answer: 450,
    hint: 'Area of a trapezium is &frac12; &times; (sum of the parallel sides) &times; height. Then multiply by the length.',
    explanation: 'Cross-section = &frac12; &times; (8 + 12) &times; 5 = 50 cm&sup2;, and 50 &times; 9 = 450 cm&sup3;. Multiplying 8 &times; 12 &times; 5 treats the trapezium as a cuboid and gives 480 cm&sup2; for the cross-section alone.'
  }),

  makeMCQ({
    id: 'g8m-volume-018', chapterId: 'g8m-volume', difficulty: 4,
    subsection: 'prism_volume',
    question: 'A swimming pool is <b>20 m long</b> and <b>8 m wide</b>. Its floor slopes evenly, so the water is <b>1 m</b> deep at the shallow end and <b>3 m</b> deep at the deep end &mdash; the side wall is a trapezium. What volume of water fills the pool?',
    options: ['320 m&sup3;', '480 m&sup3;', '160 m&sup3;', '240 m&sup3;'],
    answer: '320 m&sup3;',
    hint: 'The trapezium side wall is the cross-section, and the 8 m width is the length of the prism.',
    explanation: 'The side wall has area &frac12; &times; (1 + 3) &times; 20 = 40 m&sup2;, and 40 &times; 8 = 320 m&sup3;. 480 m&sup3; uses the 3 m depth everywhere and 160 m&sup3; uses the 1 m depth everywhere &mdash; the true answer sits between the two, as it must.'
  }),

  makeMCQ({
    id: 'g8m-volume-019', chapterId: 'g8m-volume', difficulty: 3,
    subsection: 'prism_volume',
    question: 'A prism has a <b>volume of 360 cm&sup3;</b> and is <b>12 cm long</b>. What is the <b>area of its cross-section</b>?',
    options: ['30 cm&sup2;', '24 cm&sup2;', '36 cm&sup2;', '60 cm&sup2;'],
    answer: '30 cm&sup2;',
    hint: 'Volume of a prism is cross-section area &times; length, so divide to get back to the area.',
    explanation: '360 &divide; 12 = 30 cm&sup2;. The units confirm it: cm&sup3; divided by cm leaves cm&sup2;, which is an area. 60 cm&sup2; comes from halving as though the cross-section were a triangle, which the question never says.'
  }),

  makeNum({
    id: 'g8m-volume-020', chapterId: 'g8m-volume', difficulty: 4,
    subsection: 'unit_conversion',
    question: 'A cuboid water tank measures <b>1.2 m &times; 0.8 m &times; 0.5 m</b> and is <b>half full</b>. How many <b>litres</b> of water are in it?',
    answer: 240,
    hint: 'Work in metres, get a volume in m&sup3;, convert to litres, and only then halve it.',
    explanation: '1.2 &times; 0.8 &times; 0.5 = 0.48 m&sup3;, which is 480 litres when full, so half full is 240 litres. 480 forgets the halving, and 0.24 is the answer left in cubic metres instead of litres.'
  })

);
