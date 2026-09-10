'use strict';
STATIC_QUESTIONS.push(
  makeMCQ({
    id: 'g7s-inquiry-017', chapterId: 'g7s-inquiry', difficulty: 2,
    subsection: 'lab_safety',
    question: 'A pupil heats water in a test tube and the open end points towards her neighbour. What must she change?',
    options: ['The direction of the tube mouth', 'The amount of water in the tube', 'The height of the tripod stand', 'The colour of her safety goggles'],
    answer: 'The direction of the tube mouth',
    hint: 'Think about where the hot water goes if it suddenly spits out.',
    explanation: 'Boiling water can spit from the open end, so the mouth is always pointed away from everyone. Changing the volume of water, the stand or the goggles does not decide who gets scalded.'
  }),
  makeNum({
    id: 'g7s-inquiry-018', chapterId: 'g7s-inquiry', difficulty: 2,
    subsection: 'data_recording',
    question: 'A pupil records the mass of a bean plant each week.' +
      '<table class="q-table"><tr><th>Week</th><th>Mass (g)</th></tr>' +
      '<tr><td>1</td><td>12</td></tr><tr><td>2</td><td>19</td></tr>' +
      '<tr><td>3</td><td>27</td></tr><tr><td>4</td><td>36</td></tr></table>' +
      'By how many grams did the mass increase between week 2 and week 4?',
    answer: 17, acceptableAnswers: ['17', '17 g'],
    hint: 'Read both masses off the table first, then subtract.',
    explanation: 'Week 4 is 36 g and week 2 is 19 g, so the increase is 36 − 19 = 17 g. Reading week 4 alone gives 36 g, and starting from week 1 gives 24 g — neither is the change asked for.'
  }),
  makeText({
    id: 'g7s-inquiry-019', chapterId: 'g7s-inquiry', difficulty: 2,
    subsection: 'investigations',
    question: 'A pupil gives six bean plants fertiliser and six the same care with <b>no</b> fertiliser, then compares them. What one word names the six plants that get no fertiliser?',
    answer: 'control', alsoAccept: ['the control', 'control group', 'the control group', 'controls'],
    hint: 'They are there so that she has something to compare the others against.',
    explanation: 'They are the control. Everything about them is the same except the one variable being tested, so any difference in growth must come from the fertiliser. They are not the "variable" or the "sample" — those words describe what is changed and what is measured.'
  })
);
