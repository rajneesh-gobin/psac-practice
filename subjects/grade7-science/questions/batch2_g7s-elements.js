'use strict';
STATIC_QUESTIONS.push(
  makeText({
    id: 'g7s-elements-017', chapterId: 'g7s-elements', difficulty: 1,
    subsection: 'elements_symbols',
    question: 'Give the chemical symbol for <b>calcium</b>.',
    answer: 'Ca', alsoAccept: ['ca'],
    hint: 'Two letters: a capital followed by a small one.',
    explanation: 'Calcium is Ca. C on its own is carbon, and Cl is chlorine — the second letter is always written small so that the symbol cannot be read as two elements.'
  }),
  makeMCQ({
    id: 'g7s-elements-018', chapterId: 'g7s-elements', difficulty: 2,
    subsection: 'periodic_table',
    question: 'Which of these is a <b>mixture</b> rather than a compound?',
    options: ['Air', 'Water', 'Salt', 'Sugar'],
    answer: 'Air',
    hint: 'In which one are the substances not chemically joined?',
    explanation: 'Air is a mixture of nitrogen, oxygen and other gases that are not chemically joined, so it can be separated by physical means. Water, salt and sugar are compounds whose elements are joined by chemical bonds in fixed proportions.'
  }),
  makeMCQ({
    id: 'g7s-elements-019', chapterId: 'g7s-elements', difficulty: 2,
    subsection: 'metals_nonmetals',
    question: 'Which property makes copper a good choice for the base of a cooking pot?',
    options: ['It conducts heat well', 'It floats on hot water', 'It resists every acid', 'It weighs very little'],
    answer: 'It conducts heat well',
    hint: 'Think about what has to travel from the flame to the food.',
    explanation: 'Copper is one of the best conductors of heat, so the flame heats the food quickly and evenly. It sinks in water, it does react with acids, and it is denser than most metals rather than light.'
  }),
  makeNum({
    id: 'g7s-elements-020', chapterId: 'g7s-elements', difficulty: 3,
    subsection: 'elements_symbols',
    question: 'Limestone has the formula CaCO₃. How many <b>oxygen</b> atoms are there in one unit of it?',
    answer: 3, acceptableAnswers: ['3'],
    hint: 'The small number after a symbol counts the atoms of that element.',
    explanation: 'The subscript 3 follows the O, so there are 3 oxygen atoms with 1 calcium and 1 carbon — 5 atoms in all. Answering 5 counts every atom, not just the oxygen.'
  })
);
