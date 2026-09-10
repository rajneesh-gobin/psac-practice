'use strict';
STATIC_QUESTIONS.push(
  makeText({
    id: 'g7s-matter-017', chapterId: 'g7s-matter', difficulty: 2,
    subsection: 'changes_of_state',
    question: 'Name the change of state in which a solid turns straight into a gas without melting first.',
    answer: 'sublimation', alsoAccept: ['subliming', 'sublimate'],
    hint: 'Solid carbon dioxide (dry ice) does this in an open room.',
    explanation: 'Sublimation goes solid → gas with no liquid stage, as dry ice does. Evaporation and boiling start from a liquid, and condensation goes the other way, gas → liquid.'
  }),
  makeMCQ({
    id: 'g7s-matter-018', chapterId: 'g7s-matter', difficulty: 3,
    subsection: 'properties_states',
    question: 'A sealed syringe holds air. The plunger is pushed in until the volume is halved. What happens to the <b>mass</b> of the air inside?',
    options: ['It stays the same', 'It doubles', 'It halves', 'It becomes zero'],
    answer: 'It stays the same',
    hint: 'Nothing can get in or out of a sealed syringe.',
    explanation: 'The same particles are still inside, only closer together, so the mass is unchanged while the density doubles. Nothing was added or removed, so the mass cannot double, halve or disappear.'
  }),
  makeNum({
    id: 'g7s-matter-019', chapterId: 'g7s-matter', difficulty: 3,
    subsection: 'changes_of_state',
    question: 'A pupil heats ice steadily and records the temperature.' +
      '<table class="q-table"><tr><th>Time (min)</th><th>Temperature (°C)</th></tr>' +
      '<tr><td>0</td><td>−10</td></tr><tr><td>2</td><td>0</td></tr>' +
      '<tr><td>4</td><td>0</td></tr><tr><td>6</td><td>0</td></tr>' +
      '<tr><td>8</td><td>20</td></tr></table>' +
      'For how many minutes did the temperature stay at 0 °C?',
    answer: 4, acceptableAnswers: ['4', '4 min', '4 minutes'],
    hint: 'Find the first and the last time that shows 0 °C.',
    explanation: 'It reads 0 °C at 2 min and still 0 °C at 6 min, so the temperature held steady for 6 − 2 = 4 minutes while the ice melted. Counting the three rows that show 0 gives 3, but that counts readings, not minutes.'
  }),
  makeMCQ({
    id: 'g7s-matter-020', chapterId: 'g7s-matter', difficulty: 2,
    subsection: 'states_of_matter',
    question: 'In which state are the particles packed in a regular pattern and able only to vibrate on the spot?',
    options: ['Solid', 'Liquid', 'Gas', 'Vapour'],
    answer: 'Solid',
    hint: 'Think about which state cannot be poured or squashed.',
    explanation: 'Solid particles are fixed in a regular arrangement and vibrate without moving past each other. Liquid particles slide past one another, and gas and vapour particles move freely and far apart.'
  })
);
