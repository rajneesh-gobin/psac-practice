'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Science - B2 · Reproductive System   (examWeight 3)
//
//  ⚠ THIS IS NATIONAL CURRICULUM CONTENT FOR 14- AND 15-YEAR-OLDS and it is
//    written the way the syllabus and the papers treat it: clinical, factual,
//    and about structure, function and health. The outcomes are "identify and
//    label the parts" and "understand sexually transmitted diseases and how
//    they are prevented". Nothing here goes beyond that.
//
//  ⚠ NO ANATOMICAL DIAGRAM IS DRAWN. The real papers label one; this pack has
//    no artwork, and a hand-rolled SVG of human reproductive anatomy would be
//    crude rather than clinical. The parts are therefore NAMED in the stem and
//    the questions ask for their function - which is where the marks are
//    anyway. Recorded as an artwork gap rather than approximated.
//
//  ⚠ THE HIV ITEMS STATE HOW IT IS AND IS NOT TRANSMITTED. Half the marks in
//    this area of the paper are about prevention, and the misconceptions
//    (sharing food, insect bites, touching) are exactly what an exam
//    distractor tests. Getting that right matters more here than in any other
//    chapter of this pack.
//
//  ⚠ <i> IS AN HTML BREAKOUT TAG AND MUST NEVER APPEAR INSIDE AN <svg>.
//
//  Source: NCE Science (Biology) 2021-2025; NCF Grades 7-9 §B2.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-b2-reproductive';

// ── Supplied health data: reported cases of an STD over five years.
const casesGraph = () => {
  const X0 = 46, Y0 = 116, X1 = 236, Y1 = 20;
  const bars = [['2020', 40], ['2021', 55], ['2022', 70], ['2023', 85], ['2024', 100]];
  const sy = v => Y0 - (v / 120) * (Y0 - Y1);
  let g = '<svg viewBox="0 0 250 150" width="270" role="img" aria-label="a bar chart of supplied data">';
  for (let v = 0; v <= 120; v += 40) {
    g += '<line x1="' + X0 + '" y1="' + sy(v).toFixed(1) + '" x2="' + X1 + '" y2="' + sy(v).toFixed(1) + '" stroke="#e2e8f0"/>';
    g += '<text x="' + (X0 - 5) + '" y="' + (sy(v) + 3).toFixed(1) + '" font-size="9" text-anchor="end" fill="#334155">' + v + '</text>';
  }
  const bw = 26, gap = ((X1 - X0) - bars.length * bw) / (bars.length + 1);
  bars.forEach((b, i) => {
    const x = X0 + gap + i * (bw + gap);
    g += '<rect x="' + x.toFixed(1) + '" y="' + sy(b[1]).toFixed(1) + '" width="' + bw + '" height="' + (Y0 - sy(b[1])).toFixed(1) + '" fill="#60a5fa" stroke="#1d4ed8" stroke-width="1.5"/>';
    g += '<text x="' + (x + bw / 2).toFixed(1) + '" y="' + (Y0 + 13) + '" font-size="9" text-anchor="middle" fill="#334155">' + b[0] + '</text>';
  });
  g += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X1 + '" y2="' + Y0 + '" stroke="#0f172a" stroke-width="2"/>';
  g += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X0 + '" y2="' + Y1 + '" stroke="#0f172a" stroke-width="2"/>';
  g += '<text x="140" y="144" font-size="9" text-anchor="middle" fill="#334155">year</text>';
  g += '<text x="12" y="68" font-size="9" text-anchor="middle" fill="#334155" transform="rotate(-90 12 68)">cases reported</text>';
  return g + '</svg>';
};

const GRAPH = casesGraph();

const MCQ = [
  ['g9s-b2-001', 'reproduction_basics', 1,
   'What is <b>reproduction</b>?',
   ['The process by which living things produce offspring',
    'The process by which living things obtain energy',
    'The process by which living things grow larger',
    'The process by which living things remove waste'],
   'The process by which living things produce offspring',
   'It is about the next generation.',
   'Reproduction is the process by which living organisms produce new individuals of their own kind.'],

  ['g9s-b2-002', 'reproduction_basics', 2,
   'Why is reproduction important for a species?',
   ['Without it the species would die out',
    'It allows each individual to live longer',
    'It provides the energy each individual needs',
    'It removes waste products from the body'],
   'Without it the species would die out',
   'Think about what happens over generations.',
   'Individuals die, so a species survives only if new individuals are produced to replace them.'],

  ['g9s-b2-003', 'reproduction_basics', 2,
   'Which of these is NOT one of the seven life processes?',
   ['Photography', 'Reproduction', 'Respiration', 'Growth'],
   'Photography',
   'Six of the seven begin with a different idea entirely.',
   'The life processes include reproduction, respiration and growth; photography is not one of them.'],

  ['g9s-b2-004', 'sexual_asexual', 1,
   'How many parents are needed for <b>asexual</b> reproduction?',
   ['One', 'Two', 'Three', 'Four'], 'One',
   'The prefix means "without sex".',
   'Asexual reproduction needs only one parent, and the offspring are genetically identical to it.'],

  ['g9s-b2-005', 'sexual_asexual', 1,
   'How many parents are needed for <b>sexual</b> reproduction?',
   ['Two', 'One', 'Three', 'It varies from none to many'], 'Two',
   'Two sex cells must join.',
   'Sexual reproduction involves two parents, each contributing a sex cell.'],

  ['g9s-b2-006', 'sexual_asexual', 2,
   'What is the main advantage of sexual reproduction?',
   ['The offspring show variation, which helps a species adapt',
    'It produces offspring far more quickly than asexual reproduction',
    'It needs only one parent, so it is simpler',
    'The offspring are always identical to the parent'],
   'The offspring show variation, which helps a species adapt',
   'Think about how the offspring differ from each other.',
   'Mixing genetic material from two parents produces variation, which lets a species adapt to change.'],

  ['g9s-b2-007', 'sexual_asexual', 2,
   'What is the main advantage of asexual reproduction?',
   ['Only one parent is needed, so it can be very fast',
    'The offspring are all genetically different',
    'It always produces stronger offspring',
    'It needs two parents to find each other'],
   'Only one parent is needed, so it can be very fast',
   'No partner has to be found.',
   'With one parent and no need to find a mate, asexual reproduction can produce many offspring quickly.'],

  ['g9s-b2-008', 'sexual_asexual', 3,
   'Why is a population produced asexually more at risk from a new disease?',
   ['The offspring are identical, so all are affected in the same way',
    'The offspring are all different, so the disease spreads much faster',
    'Asexual offspring are always physically weaker',
    'Asexual offspring never develop any defences'],
   'The offspring are identical, so all are affected in the same way',
   'Think about what identical means for resistance.',
   'Genetically identical offspring share the same weaknesses, so a disease that affects one affects all of them.'],

  ['g9s-b2-009', 'sexual_asexual', 3,
   'Which of these is an example of asexual reproduction?',
   ['A potato plant growing from a tuber',
    'A seed forming after a flower is pollinated',
    'A chick hatching from a fertilised egg',
    'A kitten born to two adult cats'],
   'A potato plant growing from a tuber',
   'Look for the one with a single parent and no sex cells.',
   'A new potato plant grows from a tuber of the parent plant, with one parent and no fertilisation.'],

  ['g9s-b2-010', 'male_reproductive_system', 2,
   'Which structure in the male reproductive system produces sperm?',
   ['The testes', 'The bladder', 'The urethra', 'The kidney'],
   'The testes',
   'It is the organ that makes the male sex cells.',
   'The testes produce sperm, the male sex cells.'],

  ['g9s-b2-011', 'male_reproductive_system', 2,
   'What is the function of the sperm duct?',
   ['It carries sperm from the testes',
    'It produces the male sex cells',
    'It stores urine before it leaves the body',
    'It filters waste out of the blood'],
   'It carries sperm from the testes',
   'A duct is a tube that carries something.',
   'The sperm duct is the tube that carries sperm away from the testes.'],

  ['g9s-b2-012', 'male_reproductive_system', 3,
   'What is the male sex cell called?',
   ['A sperm cell', 'An egg cell', 'A pollen grain', 'A red blood cell'],
   'A sperm cell',
   'It is produced in the testes.',
   'The male sex cell, or male gamete, is the sperm cell.'],

  ['g9s-b2-013', 'female_reproductive_system', 2,
   'Which structure in the female reproductive system produces egg cells?',
   ['The ovary', 'The uterus', 'The oviduct', 'The bladder'],
   'The ovary',
   'It is the organ that makes the female sex cells.',
   'The ovaries produce the egg cells, the female sex cells.'],

  ['g9s-b2-014', 'female_reproductive_system', 2,
   'What is the function of the uterus?',
   ['It is where a fertilised egg develops into a baby',
    'It is where the egg cells are produced',
    'It carries the egg from the ovary',
    'It stores urine before it leaves the body'],
   'It is where a fertilised egg develops into a baby',
   'It is sometimes called the womb.',
   'The uterus (womb) is where the fertilised egg implants and the baby develops.'],

  ['g9s-b2-015', 'female_reproductive_system', 3,
   'What is the function of the oviduct?',
   ['It carries the egg from the ovary towards the uterus',
    'It produces the female sex cells each month',
    'It is where the baby develops before birth',
    'It filters waste products out of the blood'],
   'It carries the egg from the ovary towards the uterus',
   'It is the tube between two other structures.',
   'The oviduct carries the egg from the ovary to the uterus, and is usually where fertilisation happens.'],

  ['g9s-b2-016', 'female_reproductive_system', 3,
   'What is <b>fertilisation</b>?',
   ['The joining of a sperm cell and an egg cell',
    'The release of an egg cell from the ovary',
    'The growth of the baby inside the uterus',
    'The production of the sperm inside the testes'],
   'The joining of a sperm cell and an egg cell',
   'Two cells become one.',
   'Fertilisation is the fusion of the male and female sex cells to form a single new cell.'],

  ['g9s-b2-017', 'stds', 1,
   'What does <b>STD</b> stand for?',
   ['Sexually transmitted disease', 'Serious tropical disease',
    'Skin treatment drug', 'Standard test for disease'],
   'Sexually transmitted disease',
   'It describes how the disease is passed on.',
   'STD stands for sexually transmitted disease.'],

  ['g9s-b2-018', 'stds', 2,
   'Which of these is a sexually transmitted disease?',
   ['Syphilis', 'Malaria', 'Chickenpox', 'Influenza'], 'Syphilis',
   'Three of these are spread in other ways entirely.',
   'Syphilis is a sexually transmitted disease; malaria is spread by mosquitoes and the other two through the air.'],

  ['g9s-b2-019', 'stds', 2,
   'What does <b>HIV</b> attack in the body?',
   ['The immune system, which fights infection',
    'The bones, which support the body',
    'The lungs, which take in oxygen',
    'The stomach, which digests food'],
   'The immune system, which fights infection',
   'It is why other infections then take hold.',
   'HIV attacks the white blood cells of the immune system, leaving the body unable to fight other infections.'],

  ['g9s-b2-020', 'stds', 3,
   'Which of these does NOT transmit HIV?',
   ['Sharing food with an infected person',
    'Sharing a needle with an infected person',
    'Unprotected sexual contact with an infected person',
    'A transfusion of infected blood'],
   'Sharing food with an infected person',
   'HIV is carried in body fluids, not on food.',
   'HIV is not spread by sharing food, touching or insect bites; it is spread through blood and other body fluids.'],

  ['g9s-b2-021', 'stds', 3,
   'Which measure best prevents the spread of sexually transmitted diseases?',
   ['Avoiding unprotected sexual contact',
    'Avoiding shaking hands with other people',
    'Boiling all drinking water before use',
    'Sleeping under a mosquito net at night'],
   'Avoiding unprotected sexual contact',
   'Match the prevention to the way the disease is passed on.',
   'STDs are passed on through sexual contact, so avoiding unprotected contact is the measure that works.'],

  ['g9s-b2-022', 'stds', 3,
   'Why is it dangerous for a person to share a needle?',
   ['Blood carrying an infection can pass directly into them',
    'The needle becomes blunt and causes pain',
    'The needle carries no risk if it is wiped first',
    'Sharing a needle only risks a skin infection'],
   'Blood carrying an infection can pass directly into them',
   'Think about what stays on a used needle.',
   'A used needle carries blood, so infections such as HIV can pass straight into the bloodstream.'],

  ['g9s-b2-023', 'stds', 3,
   'Why should someone who thinks they may have an STD see a doctor early?',
   ['Early treatment cures many STDs and stops them spreading',
    'The disease always disappears on its own if left',
    'A doctor cannot help once symptoms have started',
    'Waiting makes the treatment work far better'],
   'Early treatment cures many STDs and stops them spreading',
   'Think about the person and about everyone else.',
   'Many STDs are curable if treated early, and treatment also stops them being passed to others.'],

  ['g9s-b2-024', 'interpreting_health_data', 2,
   'The chart shows reported cases of an STD in a district. What is the trend?<br>' + GRAPH,
   ['The number of cases rises each year',
    'The number of cases falls each year',
    'The number of cases stays the same',
    'The number of cases rises and then falls'],
   'The number of cases rises each year',
   'Compare the height of each bar with the one before it.',
   'Each bar is taller than the last, so the number of reported cases is rising year on year.'],

  ['g9s-b2-025', 'interpreting_health_data', 3,
   'Reading the same chart, how many cases were reported in 2022?<br>' + GRAPH,
   ['70', '55', '85', '100'], '70',
   'Read the height of the 2022 bar against the scale.',
   'The 2022 bar reaches 70 on the vertical axis.'],

  ['g9s-b2-026', 'interpreting_health_data', 3,
   'Reading the same chart, by how many did the cases increase from 2020 to 2024?<br>' + GRAPH,
   ['60', '40', '100', '20'], '60',
   'Subtract the first bar from the last.',
   '100 in 2024 minus 40 in 2020 gives an increase of 60 cases.'],

  ['g9s-b2-027', 'interpreting_health_data', 3,
   'The chart shows reported cases rising. Which is the most careful conclusion?',
   ['More cases are being reported, which may be partly better testing',
    'Exactly this many people caught the disease in each of those years',
    'The disease has become impossible to treat',
    'Nobody had the disease before 2020'],
   'More cases are being reported, which may be partly better testing',
   'The chart counts reports, not every case that exists.',
   'A chart of reported cases can rise because more people are being tested, so the rise needs interpreting carefully.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const SHORT = [
  ['g9s-b2-028', 'reproduction_basics', 1,
   'Give the term for the process by which living things produce offspring.',
   'Reproduction', ['reproducing', 'to reproduce'],
   'It is one of the seven life processes.',
   'Reproduction produces new individuals of the same kind.'],
  ['g9s-b2-029', 'sexual_asexual', 2,
   'Give the term for reproduction that needs only one parent.',
   'Asexual reproduction', ['asexual', 'a-sexual reproduction'],
   'The offspring are identical to the parent.',
   'Asexual reproduction involves one parent and produces identical offspring.'],
  ['g9s-b2-030', 'male_reproductive_system', 2,
   'Name the male sex cell.',
   'Sperm', ['sperm cell', 'spermatozoon'],
   'It is produced in the testes.', 'The male sex cell is the sperm.'],
  ['g9s-b2-031', 'female_reproductive_system', 2,
   'Name the organ in which a fertilised egg develops into a baby.',
   'Uterus', ['the uterus', 'womb', 'the womb'],
   'It is also called the womb.', 'The fertilised egg develops in the uterus.'],
  ['g9s-b2-032', 'female_reproductive_system', 2,
   'Give the term for the joining of a sperm cell and an egg cell.',
   'Fertilisation', ['fertilization', 'fertilisation.'],
   'Two cells become one.', 'Fertilisation is the fusion of the two sex cells.'],
  ['g9s-b2-033', 'stds', 2,
   'State one way of preventing the spread of sexually transmitted diseases.',
   'Avoid unprotected sexual contact',
   ['use protection', 'do not share needles', 'avoid unprotected sex',
    'get tested and treated early', 'avoid sharing needles'],
   'Match the measure to how the disease is passed on.',
   'Avoiding unprotected contact, not sharing needles and seeking early treatment all prevent spread.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

})();
