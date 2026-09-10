'use strict';
// Grade 8 Mathematics - Indices, Square Roots & Cube Roots, batch 2 (012-020).
// Roots are asked from an area and from a volume, an index law is asked as a
// missing power and as a pupil's error to diagnose, and the applied item runs a
// doubling sequence through an index rather than just evaluating one.

STATIC_QUESTIONS.push(

  makeNum({
    id: 'g8m-indices-012', chapterId: 'g8m-indices', difficulty: 2,
    subsection: 'square_cube_roots',
    question: 'A square floor tile has an area of <b>196 cm&sup2;</b>. How long is <b>one side</b> of the tile, in cm?',
    answer: 14,
    hint: 'Area of a square is side &times; side, so you need to undo a squaring.',
    explanation: '&radic;196 = 14, because 14 &times; 14 = 196. Halving 196 gives 98, which is not a side length, and 13&sup2; = 169 while 15&sup2; = 225.'
  }),

  makeMCQ({
    id: 'g8m-indices-013', chapterId: 'g8m-indices', difficulty: 3,
    subsection: 'square_cube_roots',
    question: 'Without a calculator, between which two <b>whole numbers</b> does <b>&radic;50</b> lie?',
    options: ['7 and 8', '6 and 7', '8 and 9', '24 and 26'],
    answer: '7 and 8',
    hint: 'List the square numbers until you pass 50.',
    explanation: '7&sup2; = 49 and 8&sup2; = 64, and 50 sits between them. 6&sup2; = 36 and 7&sup2; = 49 are both below 50, 8&sup2; = 64 is already above it, and 24 and 26 come from halving 50 rather than taking a square root.'
  }),

  makeNum({
    id: 'g8m-indices-014', chapterId: 'g8m-indices', difficulty: 3,
    subsection: 'square_cube_roots',
    question: 'A cube has a volume of <b>343 cm&sup3;</b>. A wire is bent around <b>all 12 edges</b> of the cube. What length of wire is needed, in cm?',
    answer: 84,
    hint: 'Find one edge first. Volume of a cube is edge &times; edge &times; edge.',
    explanation: 'The cube root of 343 is 7, so one edge is 7 cm, and 12 &times; 7 = 84 cm. 343 itself is the volume, not a length, and 7 alone is only one edge of the twelve.'
  }),

  makeMCQ({
    id: 'g8m-indices-015', chapterId: 'g8m-indices', difficulty: 2,
    subsection: 'index_laws',
    question: 'Write <b>2 &times; 2 &times; 2 &times; 5 &times; 5</b> in index form.',
    options: ['2&sup3; &times; 5&sup2;', '2&sup2; &times; 5&sup3;', '2&sup3; &times; 5&sup3;', '2&sup2; &times; 5&sup2;'],
    answer: '2&sup3; &times; 5&sup2;',
    hint: 'The index counts how many times the number appears, not what the number is.',
    explanation: 'The 2 appears three times and the 5 appears twice, so it is 2&sup3; &times; 5&sup2; = 8 &times; 25 = 200. The other options swap the two indices or count one of the numbers wrongly.'
  }),

  makeMCQ({
    id: 'g8m-indices-016', chapterId: 'g8m-indices', difficulty: 3,
    subsection: 'index_laws',
    question: 'A pupil writes <b>3<sup>2</sup> &times; 3<sup>4</sup> = 9<sup>6</sup></b>. Which is the <b>correct</b> answer?',
    options: ['3<sup>6</sup>', '9<sup>6</sup>', '3<sup>8</sup>', '9<sup>8</sup>'],
    answer: '3<sup>6</sup>',
    hint: 'When you multiply powers of the SAME number, what happens to the base?',
    explanation: 'The indices add and the base stays the same, so 3<sup>2</sup> &times; 3<sup>4</sup> = 3<sup>6</sup> = 729. The pupil multiplied the bases as well as adding the indices; 3<sup>8</sup> multiplies the indices instead of adding them.'
  }),

  makeNum({
    id: 'g8m-indices-017', chapterId: 'g8m-indices', difficulty: 3,
    subsection: 'index_laws',
    question: 'Find the value of <b>k</b>:<br><b>7<sup>k</sup> &times; 7<sup>3</sup> = 7<sup>9</sup></b>',
    answer: 6,
    hint: 'The bases are the same, so compare the indices on each side.',
    explanation: 'Multiplying powers of 7 adds the indices, so k + 3 = 9 and k = 6. Dividing 9 by 3 gives 3, which would be right only if the indices multiplied.'
  }),

  makeNum({
    id: 'g8m-indices-018', chapterId: 'g8m-indices', difficulty: 2,
    subsection: 'evaluating_indices',
    question: 'Evaluate: <b>3<sup>4</sup> &minus; 2<sup>4</sup></b>',
    answer: 65,
    hint: 'Work out each power on its own first. You cannot subtract the bases.',
    explanation: '3<sup>4</sup> = 81 and 2<sup>4</sup> = 16, so 81 &minus; 16 = 65. Subtracting the bases first gives 1<sup>4</sup> = 1, which is wrong: powers must be evaluated before subtracting.'
  }),

  makeMCQ({
    id: 'g8m-indices-019', chapterId: 'g8m-indices', difficulty: 3,
    subsection: 'evaluating_indices',
    question: 'Evaluate: <b>&radic;81 + &#8731;27 &times; 2</b>',
    options: ['15', '24', '18', '12'],
    answer: '15',
    hint: 'Roots count as brackets: work them out first, then remember that &times; comes before +.',
    explanation: '&radic;81 = 9 and &#8731;27 = 3, giving 9 + 3 &times; 2 = 9 + 6 = 15. 24 comes from adding before multiplying, (9 + 3) &times; 2; 18 doubles only the 9; 12 forgets to double at all.'
  }),

  makeNum({
    id: 'g8m-indices-020', chapterId: 'g8m-indices', difficulty: 4,
    subsection: 'evaluating_indices',
    question: 'In a science experiment, dish A starts with <b>4</b> bacteria and the number <b>doubles every hour</b>. Dish B starts with <b>100</b> bacteria and does not grow at all. After <b>5 hours</b>, how many <b>MORE</b> bacteria are in dish A than in dish B?',
    answer: 28,
    hint: 'Doubling five times means multiplying by 2<sup>5</sup>. Work dish A out fully before comparing it with dish B.',
    explanation: 'Dish A holds 4 &times; 2<sup>5</sup> = 4 &times; 32 = 128 bacteria after 5 hours, so it has 128 &minus; 100 = 28 more than dish B. 128 is dish A&rsquo;s total, not the difference, and multiplying 4 by 5 &times; 2 = 40 treats repeated doubling as a single multiplication.'
  })

);
