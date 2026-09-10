'use strict';
STATIC_QUESTIONS.push(
  makeNum({
    id: 'g7s-measurement-017', chapterId: 'g7s-measurement', difficulty: 3,
    subsection: 'calculating_measurements',
    question: 'Water in a measuring cylinder stands at 40 cm³. A small stone is lowered in and the water rises to 65 cm³. What is the volume of the stone, in cm³?',
    answer: 25, acceptableAnswers: ['25', '25 cm³', '25cm3'],
    hint: 'The stone pushes aside exactly its own volume of water.',
    explanation: 'The rise in level is the volume of the stone: 65 − 40 = 25 cm³. 65 is the final reading, not the stone, and 40 is the water on its own.'
  }),
  makeMCQ({
    id: 'g7s-measurement-018', chapterId: 'g7s-measurement', difficulty: 3,
    subsection: 'measuring_instruments',
    question: 'A pupil must find the thickness of <b>one</b> sheet of paper using only a ruler. Which method gives the best result?',
    options: ['Measure 100 sheets, then divide', 'Measure one sheet very carefully', 'Fold one sheet twice, then measure', 'Compare it with a coin of 1 mm'],
    answer: 'Measure 100 sheets, then divide',
    hint: 'A ruler cannot read a length far smaller than its smallest division.',
    explanation: 'One sheet is far thinner than the 1 mm marks on a ruler, so measuring a stack of 100 and dividing spreads the reading error over 100 sheets. Measuring one sheet reads 0 mm, folding changes the thickness being measured, and a coin is not a measurement.'
  }),
  makeNum({
    id: 'g7s-measurement-019', chapterId: 'g7s-measurement', difficulty: 2,
    subsection: 'si_units',
    question: 'A bag of rice has a mass of 2500 g. What is its mass in kilograms?',
    answer: 2.5, acceptableAnswers: ['2.5', '2.5 kg', '2,5'],
    hint: 'One kilogram is 1000 grams.',
    explanation: '2500 ÷ 1000 = 2.5 kg. Multiplying by 1000 instead gives 2 500 000, which would be the mass in milligrams.'
  }),
  makeMCQ({
    id: 'g7s-measurement-020', chapterId: 'g7s-measurement', difficulty: 1,
    subsection: 'si_units',
    question: 'Which unit is the most sensible one for the mass of a single grain of sugar?',
    options: ['Milligram', 'Kilogram', 'Gram', 'Tonne'],
    answer: 'Milligram',
    hint: 'Choose the unit that gives a number that is easy to say and write.',
    explanation: 'A grain of sugar is a few milligrams. In grams it would be 0.005, in kilograms 0.000005, and a tonne is a million times too large.'
  })
);
