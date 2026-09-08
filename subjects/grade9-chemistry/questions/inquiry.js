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
const SHORT = [
  ['g9s-inq-033', 'lab_safety', 1,
   'State one safety precaution to take when heating a liquid in a test tube.',
   'Point the mouth away from everyone',
   ['wear goggles', 'point it away from people', 'tie back long hair',
    'do not point it at anyone', 'use a test tube holder'],
   'Think about spitting, and about eyes.',
   'Pointing the tube away, wearing goggles and using a holder are all correct precautions.'],
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
