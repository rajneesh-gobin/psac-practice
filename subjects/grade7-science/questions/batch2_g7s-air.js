'use strict';
STATIC_QUESTIONS.push(
  makeNum({
    id: 'g7s-air-017', chapterId: 'g7s-air', difficulty: 2,
    subsection: 'composition_air',
    question: 'Clean dry air is about 78% nitrogen and about 21% oxygen. What percentage is left for all the other gases together?',
    answer: 1, acceptableAnswers: ['1', '1%'],
    hint: 'The whole sample of air is 100%.',
    explanation: '100 − 78 − 21 = 1%, and most of that 1% is argon with a little carbon dioxide. Adding 78 and 21 gives 99, which is the part already accounted for, not the remainder.'
  }),
  makeMCQ({
    id: 'g7s-air-018', chapterId: 'g7s-air', difficulty: 2,
    subsection: 'air_properties',
    question: 'A tied balloon is left in strong sunshine and slowly gets bigger. Why?',
    options: ['The air inside expands', 'The rubber soaks up air', 'The air inside gets heavier', 'The air inside condenses'],
    answer: 'The air inside expands',
    hint: 'What does heating do to the space between gas particles?',
    explanation: 'Warming the air makes its particles move faster and spread further apart, so the same air takes up more space and stretches the balloon. No air enters or leaves, so its mass cannot change, and condensing would make it smaller.'
  }),
  makeText({
    id: 'g7s-air-019', chapterId: 'g7s-air', difficulty: 1,
    subsection: 'oxygen_co2_tests',
    question: 'Name the colourless solution that turns milky when carbon dioxide is bubbled through it.',
    answer: 'lime water', alsoAccept: ['limewater', 'calcium hydroxide', 'calcium hydroxide solution'],
    hint: 'Two words; it is made from calcium hydroxide.',
    explanation: 'Lime water turns milky because the carbon dioxide forms tiny grains of solid calcium carbonate. A glowing splint tests for oxygen instead, and water alone shows no change.'
  }),
  makeMCQ({
    id: 'g7s-air-020', chapterId: 'g7s-air', difficulty: 3,
    subsection: 'air_properties',
    question: 'A pupil says a candle under a jar goes out because <b>all</b> the air is used up. Which correction is right?',
    options: ['Only the oxygen is used up', 'All the nitrogen is used up', 'The air escapes from the jar', 'The wax runs out of fuel'],
    answer: 'Only the oxygen is used up',
    hint: 'Which single gas does burning need?',
    explanation: 'Burning uses the oxygen, about a fifth of the air, and the nitrogen is left behind untouched. The jar is sealed so no air escapes, and there is still plenty of wax when the flame dies.'
  })
);
