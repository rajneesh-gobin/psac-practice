'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Science - Scientific Inquiry   (examWeight 2)
//
//  ⚠ PRACTICAL SCIENCE IS EXAMINED ON PAPER, HEAVILY. blueprint-science §X.6:
//    none of the three papers is a practical exam, yet every one of them tests
//    practical work through diagrams and descriptions - naming apparatus,
//    choosing a technique, spotting a mistake in a rig, naming a controlled
//    variable, stating a safety precaution, identifying a source of error,
//    drawing a conclusion from a results table. Measured at roughly 8-12 marks
//    per paper, spread across questions rather than gathered into one.
//    That makes this the most under-weighted chapter in the manifest at 2, and
//    the most transferable: it earns marks in Biology, Chemistry AND Physics.
//
//  ⚠ VARIABLES ARE THE CORE OF IT. Independent, dependent, controlled - the
//    papers ask which is which by name, and a child who cannot separate them
//    cannot answer the "why is this not a fair test?" item that follows.
//
//  ⚠ `formula_rearrangement` IS A REAL SYLLABUS OUTCOME - "finding a missing
//    quantity from a simple relationship" - and it is written here as pure
//    rearrangement across the relationships this pack already uses (speed,
//    Q = It, magnification, density), so it reinforces rather than duplicates.
//
//  ⚠ <i> IS AN HTML BREAKOUT TAG AND MUST NEVER APPEAR INSIDE AN <svg>.
//
//  Source: NCE Science 2021-2025, all three sciences; NCF Grades 7-9 §Inquiry.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-inquiry';

// ── A supplied results table: the shape every paper uses for the
//    "draw a conclusion" item.
const results = () => {
  const rows = [['20', '12'], ['30', '18'], ['40', '25'], ['50', '31'], ['60', '38']];
  const W = 250, X0 = 26, RH = 19, top = 24;
  let g = '<svg viewBox="0 0 ' + W + ' ' + (top + RH * (rows.length + 1) + 10) + '" width="260" role="img" aria-label="a table of results">';
  g += '<text x="' + (W / 2) + '" y="15" font-size="10" text-anchor="middle" fill="#0f172a">Bubbles counted from a water plant</text>';
  const c1 = X0 + 100;
  g += '<rect x="' + X0 + '" y="' + top + '" width="' + (W - 2 * X0) + '" height="' + (RH * (rows.length + 1)) + '" fill="none" stroke="#0f172a" stroke-width="1.5"/>';
  g += '<line x1="' + c1 + '" y1="' + top + '" x2="' + c1 + '" y2="' + (top + RH * (rows.length + 1)) + '" stroke="#0f172a" stroke-width="1.5"/>';
  g += '<line x1="' + X0 + '" y1="' + (top + RH) + '" x2="' + (W - X0) + '" y2="' + (top + RH) + '" stroke="#0f172a" stroke-width="1.5"/>';
  g += '<text x="' + (X0 + 5) + '" y="' + (top + 13) + '" font-size="9" fill="#0f172a">Light / units</text>';
  g += '<text x="' + (c1 + 5) + '" y="' + (top + 13) + '" font-size="9" fill="#0f172a">Bubbles per min</text>';
  rows.forEach((r, i) => {
    const y = top + RH * (i + 1);
    if (i) g += '<line x1="' + X0 + '" y1="' + y + '" x2="' + (W - X0) + '" y2="' + y + '" stroke="#cbd5e1" stroke-width="1"/>';
    g += '<text x="' + (X0 + 5) + '" y="' + (y + 13) + '" font-size="9" fill="#334155">' + r[0] + '</text>';
    g += '<text x="' + (c1 + 5) + '" y="' + (y + 13) + '" font-size="9" fill="#334155">' + r[1] + '</text>';
  });
  return g + '</svg>';
};

const TABLE = results();

const MCQ = [
  ['g9s-inq-001', 'hypothesis_testing', 1,
   'What is a <b>hypothesis</b>?',
   ['A prediction that can be tested by an experiment',
    'A conclusion drawn after the results are in',
    'A measurement taken during an experiment',
    'A rule that has already been proved true'],
   'A prediction that can be tested by an experiment',
   'It comes before the experiment, not after it.',
   'A hypothesis is a testable prediction, made before the experiment and then tested by it.'],

  ['g9s-inq-002', 'hypothesis_testing', 2,
   'Which of these is a testable hypothesis?',
   ['A plant given more light will produce more bubbles',
    'Plants are the most beautiful living things',
    'Plants were here before animals were',
    'Everyone should look after plants properly'],
   'A plant given more light will produce more bubbles',
   'A hypothesis must be something an experiment could check.',
   'Only the first can be tested by measurement; the others are opinions or claims an experiment cannot settle.'],

  ['g9s-inq-003', 'hypothesis_testing', 2,
   'In an experiment, what is the <b>independent</b> variable?',
   ['The one the investigator deliberately changes',
    'The one that is measured as the result',
    'The one that is deliberately kept the same',
    'The one that cannot be measured at all'],
   'The one the investigator deliberately changes',
   'It is the cause being tested.',
   'The independent variable is the one deliberately changed to see what effect it has.'],

  ['g9s-inq-004', 'hypothesis_testing', 2,
   'What is the <b>dependent</b> variable?',
   ['The one that is measured as the result',
    'The one the investigator deliberately changes',
    'The one that is kept the same throughout',
    'The one that is written in the title'],
   'The one that is measured as the result',
   'It depends on what was changed.',
   'The dependent variable is the outcome measured; its value depends on the independent variable.'],

  ['g9s-inq-005', 'hypothesis_testing', 3,
   'A pupil changes the light intensity and counts the bubbles from a water plant, keeping the temperature the same. What is the controlled variable?',
   ['The temperature', 'The light intensity',
    'The number of bubbles', 'The type of plant used only'],
   'The temperature',
   'A controlled variable is one deliberately kept the same.',
   'Temperature is deliberately held constant so it cannot affect the result - that makes it a controlled variable.'],

  ['g9s-inq-006', 'hypothesis_testing', 3,
   'Why must all the other variables be kept the same in a fair test?',
   ['So any change in the result is caused by the one variable changed',
    'So that the experiment can be finished much more quickly',
    'So the results are always whole numbers',
    'So the hypothesis is certain to be correct'],
   'So any change in the result is caused by the one variable changed',
   'Two changes at once tell you nothing about either.',
   'Controlling everything else is what lets the result be attributed to the variable that was changed.'],

  ['g9s-inq-011', 'recording_data', 2,
   'Where should the readings taken during an experiment be written?',
   ['In a table prepared before the experiment starts',
    'On loose scraps of paper to be copied later',
    'From memory once the experiment is finished',
    'Only in the conclusion at the end'],
   'In a table prepared before the experiment starts',
   'A table drawn in advance means nothing is forgotten.',
   'Results go straight into a prepared table, with the quantities and units already headed.'],

  ['g9s-inq-012', 'recording_data', 2,
   'What must the heading of each column in a results table include?',
   ['The quantity and its unit', 'The quantity only',
    'The unit only', 'The name of the pupil'],
   'The quantity and its unit',
   'A number without a unit means nothing.',
   'Each column heading names the quantity and gives its unit, so every value in it can be read correctly.'],

  ['g9s-inq-013', 'recording_data', 3,
   'Which is the best way to show how one measured quantity changes with another?',
   ['A line graph', 'A pie chart', 'A single sentence', 'A photograph'],
   'A line graph',
   'Both quantities are numbers that vary.',
   'A line graph shows the relationship between two continuous variables and reveals the pattern at a glance.'],

  ['g9s-inq-014', 'interpreting_results', 3,
   'The table shows results from a water plant. What is the pattern?<br>' + TABLE,
   ['As the light increases, the number of bubbles increases',
    'As the light increases, the number of bubbles decreases',
    'The number of bubbles stays the same throughout',
    'There is no pattern in these results'],
   'As the light increases, the number of bubbles increases',
   'Read down both columns together.',
   'Every increase in light is matched by an increase in bubbles, so the two rise together.'],

  ['g9s-inq-015', 'interpreting_results', 3,
   'Reading the same table, how many bubbles per minute were counted at 40 units of light?<br>' + TABLE,
   ['25', '18', '31', '12'], '25',
   'Find the row for 40 and read across.',
   'The row for 40 units gives 25 bubbles per minute.'],

  ['g9s-inq-016', 'interpreting_results', 3,
   'One reading in a set of results is far away from the pattern of the others. What is it called?',
   ['An anomalous result', 'A controlled variable',
    'A conclusion', 'A hypothesis'],
   'An anomalous result',
   'It does not fit the pattern.',
   'A result that does not fit the pattern is anomalous, and should be checked or repeated rather than quietly ignored.'],

  ['g9s-inq-017', 'interpreting_results', 2,
   'Why is an experiment repeated several times?',
   ['To check the results are reliable and find any anomalies',
    'To use up the remaining chemicals in the laboratory',
    'To make the experiment take a whole lesson',
    'To change the hypothesis while it is running'],
   'To check the results are reliable and find any anomalies',
   'One reading could be a fluke.',
   'Repeats show whether a result can be trusted and make an odd reading obvious.'],

  ['g9s-inq-018', 'interpreting_results', 3,
   'What is the difference between a result and a conclusion?',
   ['A result is what was measured; a conclusion is what it means',
    'A result is an opinion; a conclusion is a measurement',
    'They are two words for exactly the same thing',
    'A conclusion is written before the experiment starts'],
   'A result is what was measured; a conclusion is what it means',
   'One is data, the other is an interpretation.',
   'Results are the measurements themselves; the conclusion is what those measurements show about the hypothesis.'],

];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});
const SHORT = [
  ['g9s-inq-031', 'hypothesis_testing', 2,
   'Give the term for the variable that the investigator deliberately changes.',
   'Independent variable', ['independent', 'the independent variable'],
   'It is the cause being tested.',
   'The independent variable is the one deliberately changed.'],
  ['g9s-inq-032', 'hypothesis_testing', 2,
   'Give the term for the variable that is measured as the result.',
   'Dependent variable', ['dependent', 'the dependent variable'],
   'Its value depends on what was changed.',
   'The dependent variable is the outcome that is measured.'],
  ['g9s-inq-034', 'interpreting_results', 2,
   'Give the term for a reading that does not fit the pattern of the others.',
   'Anomalous', ['anomaly', 'an anomalous result', 'anomalous result', 'outlier'],
   'It stands out from the rest.',
   'A result that does not fit the pattern is anomalous.'],
  ['g9s-inq-035', 'recording_data', 2,
   'State what must appear in the heading of each column of a results table.',
   'The quantity and its unit',
   ['quantity and unit', 'the unit and the quantity', 'name and unit'],
   'A number on its own means nothing.',
   'Each heading gives the quantity being recorded and the unit it is measured in.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});
})();
