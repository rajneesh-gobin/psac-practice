'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Science - Science, Technology & Society   (examWeight 2)
//
//  ⚠ EVERY NAMED FACT HERE IS REAL AND CHECKABLE. Christiaan Barnard performed
//    the first human-to-human heart transplant in Cape Town in December 1967;
//    the patient, Louis Washkansky, survived 18 days and died of pneumonia.
//    Those are the facts, and the 18 days is the part that carries the lesson -
//    a first is not the same as a success. A science bank that rounds that off
//    into "the operation was a success" teaches the wrong thing about science.
//
//  ⚠ CHROMATOGRAPHY IS A SYLLABUS OUTCOME HERE, NOT IN C2. The manifest puts
//    `applications_of_chromatography` under STS - drugs in sport, pesticide
//    residues, food contaminants, testing purity - so this chapter carries the
//    applications and C2 keeps the separation techniques. Do not duplicate it.
//
//  ⚠ THE CORRELATION ITEM IS THE POINT OF `interpreting_climate_data`. Two
//    lines rising together is a correlation; saying which causes which needs
//    more than the graph. That distinction is the mark, and it is the same
//    reasoning as the salt/heart-disease item in B1 - deliberately so.
//
//  ⚠ <i> IS AN HTML BREAKOUT TAG AND MUST NEVER APPEAR INSIDE AN <svg>.
//
//  Source: NCE Science 2021-2025; NCF Grades 7-9 §STS.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-sts';

// ── Two rising lines on one pair of axes: global temperature and atmospheric
//    carbon dioxide. Drawn to be READ, and the point is the correlation.
const climateGraph = () => {
  const X0 = 44, Y0 = 118, X1 = 226, Y1 = 22;
  const co2  = [[0, 20], [1, 32], [2, 46], [3, 62], [4, 78]];
  const temp = [[0, 14], [1, 24], [2, 40], [3, 54], [4, 72]];
  const sx = i => X0 + (i / 4) * (X1 - X0);
  const sy = v => Y0 - (v / 100) * (Y0 - Y1);
  const path = pts => pts.map((p, i) => (i ? 'L' : 'M') + sx(p[0]).toFixed(1) + ' ' + sy(p[1]).toFixed(1)).join(' ');
  let g = '<svg viewBox="0 0 250 178" width="270" role="img" aria-label="a graph with two lines on shared axes">';
  g += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X1 + '" y2="' + Y0 + '" stroke="#0f172a" stroke-width="2"/>';
  g += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X0 + '" y2="' + Y1 + '" stroke="#0f172a" stroke-width="2"/>';
  ['1960', '1980', '2000', '2010', '2020'].forEach((t, i) => {
    g += '<text x="' + sx(i).toFixed(1) + '" y="' + (Y0 + 13) + '" font-size="8" text-anchor="middle" fill="#334155">' + t + '</text>';
  });
  g += '<path d="' + path(co2) + '" fill="none" stroke="#b91c1c" stroke-width="2.5"/>';
  g += '<path d="' + path(temp) + '" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-dasharray="6 4"/>';
  g += '<line x1="60" y1="162" x2="86" y2="162" stroke="#b91c1c" stroke-width="2.5"/>';
  g += '<text x="90" y="165" font-size="8" fill="#334155">carbon dioxide</text>';
  g += '<line x1="152" y1="162" x2="178" y2="162" stroke="#1d4ed8" stroke-width="2.5" stroke-dasharray="6 4"/>';
  g += '<text x="182" y="165" font-size="8" fill="#334155">temperature</text>';
  // ⚠ The x label sat at y=136, five pixels under tick labels at y=131, and
  //   printed over the "2000". The vertical axis carried no label at all, which
  //   for a two-line plot is worse than untidy: the lines are different
  //   quantities on different scales and the figure has to SAY so. Both found by
  //   rendering the sheet and looking at it; both were inside the viewBox, so
  //   the clipping check passed them.
  g += '<text x="140" y="146" font-size="8" text-anchor="middle" fill="#334155">year</text>';
  g += '<text x="13" y="72" font-size="8" text-anchor="middle" fill="#334155" transform="rotate(-90 13 72)">each line on its own scale</text>';
  return g + '</svg>';
};

const CLIMATE = climateGraph();

const MCQ = [
  ['g9s-sts-001', 'christiaan_barnard', 1,
   'What did Christiaan Barnard perform for the first time in 1967?',
   ['A human heart transplant', 'A blood transfusion',
    'An X-ray of the chest', 'A vaccination against measles'],
   'A human heart transplant',
   'It involved replacing an organ.',
   'In December 1967 Christiaan Barnard carried out the first human-to-human heart transplant, in Cape Town.'],

  ['g9s-sts-002', 'christiaan_barnard', 2,
   'The first heart transplant patient lived for 18 days after the operation. What does that show?',
   ['A scientific first is not the same as a complete success',
    'The operation had no value to medicine at all',
    'Heart transplants can never work in practice',
    'The patient was cured completely by the surgery'],
   'A scientific first is not the same as a complete success',
   'Think about what came after that first attempt.',
   'The operation proved a transplant was possible; making patients survive long term took many more years of work.'],

  ['g9s-sts-003', 'christiaan_barnard', 3,
   'Why does the body sometimes reject a transplanted organ?',
   ['The immune system treats it as foreign and attacks it',
    'The organ is always too large for the space',
    'The organ has no blood supply of its own',
    'The body cannot produce enough new blood'],
   'The immune system treats it as foreign and attacks it',
   'It is the same system that fights infection.',
   'The immune system recognises the transplanted tissue as foreign and attacks it, which is why patients take drugs to suppress it.'],

  ['g9s-sts-004', 'christiaan_barnard', 3,
   'Which is an ethical question raised by organ transplantation?',
   ['Who should receive an organ when there are too few',
    'Whether the heart is inside the chest cavity',
    'How many hours the operation takes',
    'Which instruments the surgeon uses'],
   'Who should receive an organ when there are too few',
   'An ethical question is about what OUGHT to be done.',
   'Deciding fairly who receives a scarce organ is a question of values, not a question science alone can answer.'],

  ['g9s-sts-020', 'evaluating_information', 2,
   'A website claims a new product "cures every illness". How should this claim be treated?',
   ['With caution, because no evidence is offered for it',
    'As true, because it is written on a website',
    'As true, because it is a very strong claim',
    'As true, if the website looks professional'],
   'With caution, because no evidence is offered for it',
   'Ask what evidence supports the claim.',
   'A claim with no evidence behind it is not established, however confidently or professionally it is presented.'],

  ['g9s-sts-021', 'evaluating_information', 3,
   'Which question is most useful when judging a scientific claim?',
   ['What evidence supports it, and who checked that evidence',
    'How many people have shared it online',
    'How confidently the claim is stated',
    'Whether the website has attractive pictures on it'],
   'What evidence supports it, and who checked that evidence',
   'Science is judged on evidence, not on popularity.',
   'Evidence and independent checking are what make a claim trustworthy; popularity and presentation are not.'],

  ['g9s-sts-022', 'evaluating_information', 3,
   'Why should the source of a scientific claim be considered?',
   ['A source that profits from the claim may be biased',
    'Only claims from other countries can be trusted',
    'The source never affects how reliable a claim is',
    'A longer article is always more reliable'],
   'A source that profits from the claim may be biased',
   'Ask who benefits if the claim is believed.',
   'Someone with something to gain has an interest in the conclusion, so their evidence needs independent checking.'],

  ['g9s-sts-023', 'ethics_of_science', 2,
   'What makes a question an <b>ethical</b> question rather than a scientific one?',
   ['It asks what ought to be done, not what is true',
    'It asks what is true, not what ought to be done',
    'It can always be settled by an experiment',
    'It has no possible answer of any kind'],
   'It asks what ought to be done, not what is true',
   'Ethics is about right and wrong.',
   'Science establishes what is the case; ethics asks what we ought to do about it, which measurement alone cannot settle.'],

  ['g9s-sts-024', 'ethics_of_science', 3,
   'Which of these is an ethical issue raised by a new medical technology?',
   ['Whether everyone will be able to afford it',
    'Which chemicals the medicine contains',
    'How the medicine is stored in a fridge',
    'What temperature the reaction needs'],
   'Whether everyone will be able to afford it',
   'Three of these are technical questions.',
   'Fair access is a question of values; the other three are answered by measurement.'],

  ['g9s-sts-025', 'ethics_of_science', 3,
   'A discovery can be used to help people or to harm them. What does this show about science?',
   ['How a discovery is used is a decision for society',
    'Discoveries should therefore never be made',
    'Scientists alone should decide every use',
    'A discovery can only ever be used one way'],
   'How a discovery is used is a decision for society',
   'The knowledge and its use are two different things.',
   'Knowledge itself is neutral; deciding how it is applied is a choice society makes, and one scientists share in.'],

];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});
const SHORT = [
  ['g9s-sts-030', 'christiaan_barnard', 2,
   'Name the surgeon who performed the first human heart transplant in 1967.',
   'Christiaan Barnard', ['barnard', 'christian barnard', 'dr barnard'],
   'He worked in Cape Town.',
   'Christiaan Barnard performed the first human-to-human heart transplant.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});
})();
