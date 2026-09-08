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

  ['g9s-inq-007', 'lab_safety', 1,
   'Why are safety goggles worn in a school laboratory?',
   ['To protect the eyes from splashes and flying pieces',
    'To make it easier to see very small objects',
    'To keep the face warm near a flame',
    'To stop dust settling on the bench'],
   'To protect the eyes from splashes and flying pieces',
   'Think about what could reach the eyes.',
   'Goggles protect the eyes from chemical splashes and from anything that shatters or spits.'],

  ['g9s-inq-008', 'lab_safety', 2,
   'What should be done first if a chemical is spilled on the skin?',
   ['Wash it off with plenty of water and tell the teacher',
    'Rub it in until it disappears',
    'Cover it with a cloth and carry on',
    'Wait to see whether it starts to hurt at all'],
   'Wash it off with plenty of water and tell the teacher',
   'Dilute and remove it at once.',
   'Washing with plenty of water dilutes and removes the chemical; the teacher must always be told.'],

  ['g9s-inq-009', 'lab_safety', 2,
   'Why is long hair tied back in a laboratory?',
   ['So it cannot catch fire or fall into the apparatus',
    'So the pupil can see the bench more easily',
    'So the pupil looks tidy for the lesson',
    'So the hair does not become dusty'],
   'So it cannot catch fire or fall into the apparatus',
   'There are flames on the bench.',
   'Loose hair can reach a flame or trail into chemicals, so it is tied back.'],

  ['g9s-inq-010', 'lab_safety', 3,
   'Why is a test tube heated with its mouth pointed away from everyone?',
   ['The contents can spit out suddenly when heated',
    'It makes the contents heat up more quickly',
    'It stops the glass from becoming too hot to hold',
    'It keeps the flame from being blown out'],
   'The contents can spit out suddenly when heated',
   'Think about what a boiling liquid can do.',
   'Heated liquids can bump and spit, so the open end must point away from every person.'],

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

  ['g9s-inq-019', 'reporting_findings', 2,
   'Which section of a report says what was found out?',
   ['The conclusion', 'The method', 'The apparatus list', 'The title'],
   'The conclusion',
   'It comes at the end.',
   'The conclusion states what the results show, and whether they support the hypothesis.'],

  ['g9s-inq-020', 'reporting_findings', 2,
   'Why is the method written in enough detail for someone else to follow?',
   ['So another person can repeat the experiment and check it',
    'So the report is as long as possible',
    'So the conclusion does not need to be written',
    'So the apparatus does not have to be listed'],
   'So another person can repeat the experiment and check it',
   'Science is checked by being repeated.',
   'A method that can be followed exactly lets others repeat the work and confirm or challenge the findings.'],

  ['g9s-inq-021', 'reporting_findings', 3,
   'A pupil concludes "the plant made more bubbles because it liked the light". Why is this a poor conclusion?',
   ['It states a feeling rather than what the data shows',
    'It mentions the plant, which is not allowed',
    'It is too short to be a conclusion',
    'It uses the word bubbles instead of oxygen'],
   'It states a feeling rather than what the data shows',
   'A conclusion must come from the measurements.',
   'A conclusion must be supported by the data; "liked" attributes a feeling that nothing was measured about.'],

  ['g9s-inq-022', 'research_and_ict', 2,
   'Which source of information about a science topic is most likely to be reliable?',
   ['A university or government science website',
    'A comment posted under a video',
    'A message forwarded on a phone',
    'An advertisement selling a product'],
   'A university or government science website',
   'Think about who is responsible for the content.',
   'Information from a scientific institution is checked and attributable; the others are anonymous or are selling something.'],

  ['g9s-inq-023', 'research_and_ict', 3,
   'Why should the same fact be checked in more than one source?',
   ['One source may be wrong, out of date or biased',
    'It makes the report look much longer',
    'Every source always says exactly the same thing',
    'It is the only way to find a source at all'],
   'One source may be wrong, out of date or biased',
   'Agreement between independent sources is what builds confidence.',
   'Cross-checking guards against a single source being mistaken, outdated or one-sided.'],

  ['g9s-inq-024', 'research_and_ict', 2,
   'Why must the sources used in a science report be listed?',
   ['So a reader can check where the information came from',
    'So the report reaches the required number of pages',
    'So no one else can use the same sources',
    'So the conclusion does not have to be written'],
   'So a reader can check where the information came from',
   'It is the same reason a method is written out.',
   'Listing sources lets a reader verify the claims and credits the work of others.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

// ⚠ `formula_rearrangement` deliberately reuses the relationships this pack
//   already teaches, so the skill transfers instead of standing alone.
const NUM = [
  ['g9s-inq-025', 'formula_rearrangement', 2,
   'Speed = distance &divide; time. A car travels 150 m in 10 s. Calculate its speed, in m/s.',
   15, 'Substitute straight into the relationship.', '150 / 10 = 15 m/s.'],
  ['g9s-inq-026', 'formula_rearrangement', 3,
   'Speed = distance &divide; time. A car travels at 12 m/s for 9 s. Calculate the distance, in metres.',
   108, 'Rearrange to distance = speed &times; time.', '12 &times; 9 = 108 m.'],
  ['g9s-inq-027', 'formula_rearrangement', 3,
   'Q = It. A charge of 36 C flows in 6 s. Calculate the current, in amperes.',
   6, 'Rearrange to I = Q &divide; t.', '36 / 6 = 6 A.'],
  ['g9s-inq-028', 'formula_rearrangement', 3,
   'Density = mass &divide; volume. A block has a mass of 90 g and a volume of 30 cm&#179;. Calculate its density, in g/cm&#179;.',
   3, 'Substitute straight into the relationship.', '90 / 30 = 3 g/cm&#179;.'],
  ['g9s-inq-029', 'formula_rearrangement', 3,
   'Density = mass &divide; volume. A liquid of density 2 g/cm&#179; has a volume of 25 cm&#179;. Calculate its mass, in grams.',
   50, 'Rearrange to mass = density &times; volume.', '2 &times; 25 = 50 g.'],
  ['g9s-inq-030', 'formula_rearrangement', 3,
   'Magnification = drawing size &divide; real size. A drawing is 45 mm wide at a magnification of 9. Calculate the real size, in mm.',
   5, 'Rearrange to real size = drawing size &divide; magnification.', '45 / 9 = 5 mm.'],
];

NUM.forEach(([id, subsection, difficulty, question, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeNum({ id, chapterId: CH, subsection, difficulty,
    question, answer, hint, explanation }));
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
  ['g9s-inq-033', 'lab_safety', 1,
   'State one safety precaution to take when heating a liquid in a test tube.',
   'Point the mouth away from everyone',
   ['wear goggles', 'point it away from people', 'tie back long hair',
    'do not point it at anyone', 'use a test tube holder'],
   'Think about spitting, and about eyes.',
   'Pointing the tube away, wearing goggles and using a holder are all correct precautions.'],
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
  ['g9s-inq-036', 'reporting_findings', 2,
   'Name the section of a report that states what the results show.',
   'Conclusion', ['the conclusion', 'conclusions'],
   'It comes at the end.',
   'The conclusion states what the results mean.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

})();
