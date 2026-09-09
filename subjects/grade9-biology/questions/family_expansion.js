'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Biology - question families  (g9s-bfam-NNN-<variant>)
//
//  ⚠ THE FAMILY ID IS THE QUESTION ID MINUS ITS -<variant> SUFFIX. There is no
//    `family:` field: the factories take a fixed field list and anything else
//    is dropped from the built bundle.
//
//  ⚠ THE THREE SCIENCES SHARE THE `g9s-` PREFIX ON PURPOSE - the importer keys
//    on it. `bfam` is this pack's infix; chemistry and physics use their own.
//
//  ⚠ <i> AND EVERY OTHER HTML TAG IS A BREAKOUT TAG INSIDE AN <svg>. The
//    tables below are built by one helper so no stem hand-writes markup.
//
//  Seeded from docs/nce-difficulty-audit/evidence.md:
//    g9s-b2-015   inflated-level  -> bfam-006 rebuilds the outcome at L1/L2/L3
//    g9s-stsb-030 weak-distractors-> bfam-013 makes pupils weigh real sources
//    g9s-b1-v083  useful-application -> bfam-001 keeps the correlation outcome
//                                      and gives it distractors worth choosing
//
//  Source: NCE Science (Biology) 2021-2025; NCF Grades 7-9 §B1-B4, Inquiry, STS.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH1 = 'g9s-b1-circulatory';
const CH2 = 'g9s-b2-reproductive';
const CH3 = 'g9s-b3-biodiversity';
const CH4 = 'g9s-b4-plant-nutrition';
const CHI = 'g9s-inquiry';
const CHS = 'g9s-sts';

const table = (title, headers, rows) => {
  const cols = headers.length;
  const W = 300, X0 = 10, RH = 20, top = 24;
  const cw = (W - 2 * X0) / cols;
  const H = top + RH * (rows.length + 1) + 8;
  let g = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H +
    '" width="300" height="' + H + '" role="img" aria-label="a table of recorded figures"' +
    ' style="display:block;margin:8px auto">';
  g += '<text x="' + (W / 2) + '" y="15" font-size="10" text-anchor="middle" fill="#0f172a">' + title + '</text>';
  g += '<rect x="' + X0 + '" y="' + top + '" width="' + (W - 2 * X0) + '" height="' +
    (RH * (rows.length + 1)) + '" fill="none" stroke="#0f172a" stroke-width="1.5"/>';
  for (let c = 1; c < cols; c++) {
    const x = X0 + cw * c;
    g += '<line x1="' + x + '" y1="' + top + '" x2="' + x + '" y2="' +
      (top + RH * (rows.length + 1)) + '" stroke="#0f172a" stroke-width="1.5"/>';
  }
  g += '<line x1="' + X0 + '" y1="' + (top + RH) + '" x2="' + (W - X0) + '" y2="' +
    (top + RH) + '" stroke="#0f172a" stroke-width="1.5"/>';
  headers.forEach((h, c) => {
    g += '<text x="' + (X0 + cw * c + cw / 2) + '" y="' + (top + 14) +
      '" font-size="9" text-anchor="middle" fill="#0f172a">' + h + '</text>';
  });
  rows.forEach((r, i) => {
    const y = top + RH * (i + 1);
    if (i) g += '<line x1="' + X0 + '" y1="' + y + '" x2="' + (W - X0) + '" y2="' + y +
      '" stroke="#cbd5e1" stroke-width="1"/>';
    r.forEach((v, c) => {
      g += '<text x="' + (X0 + cw * c + cw / 2) + '" y="' + (y + 14) +
        '" font-size="9" text-anchor="middle" fill="#334155">' + v + '</text>';
    });
  });
  return g + '</svg>';
};

// ── 001 · four districts: exercise rate against heart-attack admissions ────
const T_DISTRICT = table('Four districts, same year',
  ['District', 'Exercise (%)', 'Admissions'],
  [['Nord', '20', '48'], ['Est', '30', '40'], ['Sud', '40', '32'], ['Ouest', '50', '24']]);
const D_INTRO = 'The table gives, for four districts, the percentage of adults who ' +
  'exercise weekly and the number of heart-attack admissions per 10 000 adults.<br>' + T_DISTRICT;

// ── 003 · pulse recovery of two pupils after the same exercise ─────────────
const T_PULSE = table('Pulse after the same exercise',
  ['Time (min)', 'Pupil A', 'Pupil B'],
  [['0', '150', '150'], ['1', '120', '138'], ['2', '96', '126'],
   ['3', '84', '114'], ['4', '80', '102']]);
const P_INTRO = 'Two pupils did the same exercise, then had their pulse counted every ' +
  'minute. All readings are in beats per minute.<br>' + T_PULSE;

// ── 005 · screening figures for one sexually transmitted disease ───────────
const T_STD = table('Screening for one STD',
  ['Year', 'Tests done', 'Positive'],
  [['2019', '5 000', '200'], ['2020', '10 000', '350'], ['2021', '20 000', '600']]);
const S_INTRO = 'A clinic offered free screening for one sexually transmitted disease. ' +
  'The table gives the tests carried out each year and how many were positive.<br>' + T_STD;

// ── 010 · bubbles from pondweed at rising light intensity ──────────────────
const T_BUBBLES = table('Bubbles from pondweed',
  ['Light intensity', 'Bubbles per min'],
  [['1', '8'], ['2', '16'], ['3', '24'], ['4', '30'], ['5', '32']]);
const B_INTRO = 'A piece of pondweed was placed in water and the bubbles of gas leaving ' +
  'the cut stem were counted for one minute at five light intensities. The temperature ' +
  'was kept the same throughout.<br>' + T_BUBBLES;

// ── 011 · fish landed from one lagoon over ten years ───────────────────────
const T_CATCH = table('Fish landed from one lagoon',
  ['Year', 'Catch (tonnes)'],
  [['1', '400'], ['3', '360'], ['5', '320'], ['7', '260'], ['10', '200']]);
const L_INTRO = 'Fishermen land their catch from one lagoon. The table gives the total ' +
  'weight landed in five of the ten years.<br>' + T_CATCH;

// ── 012 · a herbal drink said to lower resting pulse ───────────────────────
const H_INTRO = 'Eight adults drank a herbal remedy every day for a month. Their mean ' +
  'resting pulse at the end of the month was 4 beats per minute lower than at the start. ';

// ── 013 · three sources about a food supplement ────────────────────────────
const W_INTRO = 'A website carries the stories of 12 people who say a food supplement ' +
  'cured their tiredness. A trial published in a journal followed 400 people, half of ' +
  'whom took the supplement, and found no difference between the two halves. ';

const MCQ = [

  // ══ FAMILY 001 · correlation, confounding and what would settle it ══
  ['g9s-bfam-001-b', CH1, 'interpreting_health_data', 2,
   D_INTRO + 'What does the table show about the two columns of figures?',
   ['Admissions fall steadily as the exercise rate rises',
    'Admissions rise steadily as the exercise rate rises',
    'Exercise shows no measurable link with admissions here',
    'Admissions fall only in the district with most exercise'],
   'Admissions fall steadily as the exercise rate rises',
   'Read the two columns down the page together, row by row.',
   'Each 10-point rise in the exercise rate goes with 8 fewer admissions, so the two ' +
   'quantities move in opposite directions across all four districts. Describing a ' +
   'pattern is not the same as claiming a cause.'],

  ['g9s-bfam-001-c', CH1, 'interpreting_health_data', 4,
   D_INTRO + 'Nord has the oldest adult population and Ouest the youngest. Pupil A says ' +
   'the table shows exercise lowers heart attacks. Pupil B says the age difference ' +
   'explains both columns. Which judgement fits the table best?',
   ['The table fits both explanations and cannot decide between them',
    'Pupil A is right, because the two columns change together',
    'Pupil B is right, because age always outweighs exercise',
    'Neither is right, because the districts are not the same size'],
   'The table fits both explanations and cannot decide between them',
   'Ask what a younger population would do to BOTH columns at once.',
   'A younger population tends to exercise more and to have fewer heart attacks, so age ' +
   'alone would produce exactly this table. The misconception is that a pattern picks ' +
   'its own explanation; two explanations that predict the same figures are not separated ' +
   'by those figures. District size is already allowed for, because the admissions are ' +
   'given per 10 000 adults.'],

  ['g9s-bfam-001-d', CH1, 'interpreting_health_data', 4,
   D_INTRO + 'One explanation of the pattern is exercise; another is that Nord has an ' +
   'older population than Ouest. Which further evidence would best separate the two?',
   ['Admission rates for adults of the same age in each district',
    'Admission rates for the same four districts ten years ago',
    'The number of adults living in each of the four districts',
    'The number of hospital beds open in each of the four districts'],
   'Admission rates for adults of the same age in each district',
   'Evidence separates two explanations only if it holds one of them still.',
   'Comparing adults of the same age removes age as a possible cause, so any difference ' +
   'left must come from something else. The misconception is that any extra data helps: ' +
   'older figures, population sizes and bed counts all leave the age difference in place, ' +
   'so none of them can decide between the two explanations.'],

  ['g9s-bfam-001-e', CH1, 'interpreting_health_data', 3,
   D_INTRO + 'A pupil writes: "A district with more exercise will always have fewer heart ' +
   'attacks." Is that claim always, sometimes or never true?',
   ['Sometimes true, because other factors also affect the risk',
    'Always true, because exercise removes the risk completely',
    'Always true, because the table shows it in every district',
    'Never true, because exercise has no effect on the heart'],
   'Sometimes true, because other factors also affect the risk',
   'Four districts agreeing is not the same as every district agreeing.',
   'Diet, smoking, age and inherited risk all affect heart attacks, so a district could ' +
   'exercise more and still have more admissions. The misconception is treating four ' +
   'agreeing rows as a rule with no exceptions.'],

  // ══ FAMILY 002 · magnification, run forwards, backwards and misread ══
  ['g9s-bfam-002-d', CH1, 'magnification', 3,
   'A drawing of a white blood cell is 60 mm wide and the real cell is 0.012 mm wide. ' +
   'A pupil divides 0.012 by 60 and writes the magnification as &times;0.0002. What has ' +
   'gone wrong?',
   ['The two measurements were divided the wrong way round',
    'The real width should have been measured in metres first',
    'The drawing width should have been halved before dividing',
    'The two widths should have been multiplied instead of divided'],
   'The two measurements were divided the wrong way round',
   'A drawing that is bigger than the specimen cannot have a magnification below 1.',
   'Magnification = drawing size &divide; real size = 60 &divide; 0.012 = &times;5000. ' +
   'The misconception is putting the smaller number on top because it looks tidier; check ' +
   'the answer against the picture first, because a drawing larger than the real object ' +
   'must give a magnification greater than 1.'],

  ['g9s-bfam-002-e', CH1, 'magnification', 3,
   'Two pupils made drawings of the <b>same</b> white blood cell. Pupil A drew it 40 mm ' +
   'wide and Pupil B drew it 80 mm wide. Which statement is correct?',
   ['B used twice the magnification, and the real cell is unchanged',
    'B saw a cell twice as wide, so B measured more carefully',
    'Both drawings must carry the same magnification value',
    'A used twice the magnification, since A kept the drawing smaller'],
   'B used twice the magnification, and the real cell is unchanged',
   'Only one of the two numbers in the formula has changed.',
   'The real width is the same for both, so doubling the drawing doubles the magnification. ' +
   'The misconception is reading the drawing as the specimen: magnification describes how ' +
   'much the picture was enlarged, not how big the cell is.'],

  // ══ FAMILY 003 · pulse recovery ══
  ['g9s-bfam-003-c', CH1, 'pulse', 3,
   P_INTRO + 'Which pupil recovered faster, and what does that suggest?',
   ['Pupil A, because a faster fall in pulse suggests better fitness',
    'Pupil B, because a slower fall means the heart worked less hard',
    'Pupil A, because the higher pulse at 4 minutes suggests fitness',
    'Neither, because both pupils started from the same pulse rate'],
   'Pupil A, because a faster fall in pulse suggests better fitness',
   'Compare how far each pupil has come down by 4 minutes.',
   'Pupil A falls from 150 to 80 while Pupil B only reaches 102, so A returns towards rest ' +
   'faster. The misconception is judging fitness from the starting pulse, which is the same ' +
   'for both; it is the rate of recovery that differs.'],

  ['g9s-bfam-003-d', CH1, 'pulse', 4,
   P_INTRO + 'A pupil concludes from these readings that training lowers a person\'s ' +
   'highest pulse rate. Why is that conclusion unsafe?',
   ['Both pupils reached 150, and no training was carried out here',
    'The readings were taken every minute rather than every second',
    'A pulse should be counted for a whole minute, not for 15 seconds',
    'The pulse was taken at the wrist instead of at the side of the neck'],
   'Both pupils reached 150, and no training was carried out here',
   'Look at what the investigation actually changed, and what it did not.',
   'The table compares two people on one day; nobody was trained and both reached the same ' +
   'highest reading, so it holds no evidence about training at all. The misconception is ' +
   'answering the question you expected instead of the one the data can support - this ' +
   'investigation is about recovery, not about maximum pulse.'],

  // ══ FAMILY 004 · how blood vessels are named ══
  ['g9s-bfam-004-b', CH1, 'blood_vessels', 2,
   'What decides whether a blood vessel is called an artery or a vein?',
   ['Whether it carries blood away from or towards the heart',
    'Whether the blood inside it is oxygenated or not',
    'Whether its wall is thick or thin compared with others',
    'Whether it lies deep in the body or close to the skin'],
   'Whether it carries blood away from or towards the heart',
   'The name records a direction of travel.',
   'Arteries carry blood away from the heart and veins carry it back. The misconception is ' +
   'that the name records the kind of blood; wall thickness follows from the pressure, but ' +
   'it is not what the name is based on.'],

  ['g9s-bfam-004-c', CH1, 'blood_vessels', 4,
   'A pupil argues: "Veins carry deoxygenated blood, so the pulmonary vein must really be ' +
   'an artery." Which reply resolves this?',
   ['Vessels are named by flow direction, not by the blood in them',
    'The pulmonary vein does carry deoxygenated blood to the lungs',
    'The pulmonary vein is the one vessel with no proper name at all',
    'The rule holds, so the pulmonary vein has been named wrongly'],
   'Vessels are named by flow direction, not by the blood in them',
   'Ask which way the blood in that vessel is travelling.',
   'The pulmonary vein carries oxygenated blood from the lungs <b>towards</b> the heart, ' +
   'so it is a vein by the rule that actually applies. The misconception is turning a ' +
   'usual pattern - most veins carry deoxygenated blood - into the definition; the ' +
   'pulmonary vessels are the ordinary test of which rule you are using.'],

  ['g9s-bfam-004-d', CH1, 'blood_vessels', 3,
   'Predict what would most likely happen if the valves inside the leg veins stopped ' +
   'working properly.',
   ['Blood would flow backwards and collect in the leg veins',
    'Blood would leave the heart faster than it could return',
    'The arteries in the leg would widen to make up for it',
    'The pulse in the leg would become impossible to feel'],
   'Blood would flow backwards and collect in the leg veins',
   'Think about what holds blood up against gravity in a low-pressure vessel.',
   'Blood in the veins is at low pressure, so the valves are what stop it sliding back ' +
   'down; without them it pools in the legs. The misconception is expecting a vein problem ' +
   'to show up in the pulse, which is felt in an artery.'],

  // ══ FAMILY 005 · rising case counts against a falling positive rate ══
  ['g9s-bfam-005-c', CH2, 'interpreting_health_data', 3,
   S_INTRO + 'Positive results rose from 200 in 2019 to 600 in 2021. What does that rise, ' +
   'on its own, show?',
   ['More cases were found, because far more tests were done',
    'Three times as many people caught the disease each year',
    'The disease had become three times harder to treat',
    'Screening makes no difference to how many cases are found'],
   'More cases were found, because far more tests were done',
   'Compare the middle column across the three years before judging the last one.',
   'The number of tests also rose four-fold, so more positives were bound to be found even ' +
   'if the disease were no more common. The misconception is reading a count of detected ' +
   'cases as a count of infections.'],

  ['g9s-bfam-005-d', CH2, 'interpreting_health_data', 4,
   S_INTRO + 'Two explanations are offered for the rise in positive results: more people ' +
   'are becoming infected, or more people are being tested. Which figure decides between ' +
   'them?',
   ['The percentage of tests positive, which fell from 4% to 3%',
    'The number of positive results, which rose from 200 to 600',
    'The number of tests done, which rose from 5 000 to 20 000',
    'The number of years covered, which is three years in total'],
   'The percentage of tests positive, which fell from 4% to 3%',
   'One explanation predicts a rising share of positives, the other does not.',
   'If infections were becoming more common, the share of tests coming back positive would ' +
   'rise; it fell (4%, 3.5%, 3%), which fits better testing rather than more disease. The ' +
   'misconception is comparing totals when the totals were collected from different numbers ' +
   'of people - only the rate can be compared across the three years.'],

  // ══ FAMILY 006 · where the egg travels and where it is fertilised ══
  ['g9s-bfam-006-b', CH2, 'female_reproductive_system', 2,
   'Where does fertilisation normally take place in a woman?',
   ['In the oviduct, on the way from the ovary',
    'In the ovary, as soon as the egg is made',
    'In the uterus, where the baby develops',
    'In the vagina, where the sperm enter'],
   'In the oviduct, on the way from the ovary',
   'It happens while the egg is still travelling.',
   'Sperm swim up and meet the egg in the oviduct, and the fertilised egg then travels on ' +
   'to the uterus. The misconception is placing fertilisation where the baby grows.'],

  ['g9s-bfam-006-c', CH2, 'female_reproductive_system', 3,
   'Predict what would happen if both oviducts were completely blocked.',
   ['Eggs would still be released, but could not meet any sperm',
    'The ovaries would stop making egg cells altogether',
    'The lining of the uterus would stop thickening each month',
    'Sperm cells would stop being produced in the male partner'],
   'Eggs would still be released, but could not meet any sperm',
   'A blocked tube stops a journey; it does not stop the organ before it.',
   'The ovary releases an egg whether or not the tube beyond it is open, so ovulation ' +
   'continues while fertilisation cannot happen. The misconception is assuming a blockage ' +
   'shuts down every part of the system rather than the step that uses it.'],

  ['g9s-bfam-006-d', CH2, 'female_reproductive_system', 3,
   'A pupil says the uterus must be where fertilisation happens, because that is where the ' +
   'baby grows. Which reply corrects this best?',
   ['Fertilisation happens in the oviduct, and the embryo then moves down',
    'The baby grows in the oviduct and moves to the uterus at birth',
    'Fertilisation happens in the ovary before the egg is released',
    'Both events happen in the same place, but at different times'],
   'Fertilisation happens in the oviduct, and the embryo then moves down',
   'Two different events can happen in two different places.',
   'Fertilisation is in the oviduct; the fertilised egg then travels to the uterus and ' +
   'implants there to develop. The misconception is assuming one organ must do both jobs.'],

  // ══ FAMILY 007 · a nursery choosing between suckers and seed ══
  ['g9s-bfam-007-a', CH2, 'sexual_asexual', 2,
   'A nursery grows Bed 1 of banana plants from suckers cut off parent plants, and Bed 2 ' +
   'from seed. Which statement about the plants in Bed 1 is correct?',
   ['They are genetically identical to the parent plant',
    'They each have two parents and differ from each other',
    'They were formed after pollen reached a flower',
    'They carry a mixture of two different sets of genes'],
   'They are genetically identical to the parent plant',
   'A sucker grows straight from the parent, with no other plant involved.',
   'A sucker is asexual reproduction from one parent, so every plant in Bed 1 has the same ' +
   'genes as that parent. The misconception is that any new plant must have two parents.'],

  ['g9s-bfam-007-b', CH2, 'sexual_asexual', 3,
   'A nursery grows Bed 1 of banana plants from suckers and Bed 2 from seed. A new fungal ' +
   'disease arrives that some banana plants can resist. Which bed is more likely to be ' +
   'lost completely, and why?',
   ['Bed 1, because all of its plants respond to the fungus alike',
    'Bed 2, because plants grown from seed are weaker than suckers',
    'Bed 1, because plants grown from suckers are always smaller',
    'Bed 2, because its plants have more parents to inherit from'],
   'Bed 1, because all of its plants respond to the fungus alike',
   'Ask which bed contains plants that differ from one another.',
   'Bed 1 is one set of genes repeated, so whatever the fungus does to one plant it does to ' +
   'all of them; in Bed 2 some plants may carry resistance. The misconception is treating ' +
   'asexual offspring as weaker in general - they are not weaker, they are uniform, and ' +
   'uniformity is the risk.'],

  ['g9s-bfam-007-c', CH2, 'sexual_asexual', 4,
   'A nursery keeps growing bananas from suckers because identical plants ripen together ' +
   'and sell for more. A new fungal disease is spreading in the region. Which is the best ' +
   'judgement of the decision?',
   ['It buys a uniform crop but gives up useful variation',
    'It is wrong, because asexual reproduction is always risky',
    'It is right, because uniform plants resist disease better',
    'It makes no difference, since disease strikes all plants'],
   'It buys a uniform crop but gives up useful variation',
   'A decision can gain one thing and lose another at the same time.',
   'Uniform plants are worth more at market, and the same uniformity means no plant in the ' +
   'bed can survive what kills its neighbour - a trade-off, not a simple mistake. The ' +
   'misconception is grading a decision right or wrong when the evidence supports both a ' +
   'gain and a cost.'],

  // ══ FAMILY 008 · quadrats, and a sample that is not representative ══
  ['g9s-bfam-008-d', CH3, 'quadrat_sampling', 4,
   'A lawn measures 200 m&sup2;. One pupil placed five 1 m&sup2; quadrats at random and ' +
   'counted 4, 6, 5, 7 and 3 daisy plants. A second pupil placed all five quadrats in the ' +
   'shade under one tree and counted 0, 1, 0, 1 and 0, giving an estimate of 80 plants for ' +
   'the lawn. Which statement about the second estimate is correct?',
   ['It is too low, because the quadrats were not placed randomly',
    'It is correct, because the mean was worked out properly',
    'It is too high, because shaded ground holds extra plants',
    'It cannot be judged without knowing the area of the lawn'],
   'It is too low, because the quadrats were not placed randomly',
   'Decide first whether the sample is fair, then which way it is wrong.',
   'Mean = 2 &divide; 5 = 0.4 per m&sup2;, and 0.4 &times; 200 = 80, so the arithmetic is ' +
   'right; the sample is not. All five quadrats sat in the one patch where daisies grow ' +
   'worst, so the estimate is far below the random sample\'s 1 000. The misconception is ' +
   'accepting an answer because the calculation was done correctly - correct arithmetic on ' +
   'a biased sample gives a confidently wrong number.'],

  // ══ FAMILY 009 · the starch test and the two-variable trap ══
  ['g9s-bfam-009-a', CH4, 'photosynthesis_experiments', 2,
   'Why is a potted plant left in a dark cupboard for two days before a starch-test ' +
   'experiment?',
   ['So that any starch found afterwards was made during the test',
    'So that the leaf becomes soft enough for iodine to soak in',
    'So that the chlorophyll is removed from the leaf beforehand',
    'So that the plant stops photosynthesising for the whole week'],
   'So that any starch found afterwards was made during the test',
   'Think about what would confuse the result if it were left in the leaf.',
   'Two days in the dark uses up the starch already stored, so a blue-black result later ' +
   'can only have come from the conditions being tested. The misconception is confusing ' +
   'destarching with removing chlorophyll - the chlorophyll is still there, and is removed ' +
   'later by boiling the leaf in alcohol.'],

  ['g9s-bfam-009-c', CH4, 'photosynthesis_experiments', 3,
   'A destarched green leaf is half covered with black paper, left in sunlight for a day, ' +
   'then tested with iodine solution. The covered half stays orange-brown and the uncovered ' +
   'half turns blue-black. What does this show?',
   ['Light is needed for the leaf to make starch',
    'Chlorophyll is needed for the leaf to make starch',
    'Black paper destroys the starch already in a leaf',
    'Starch drains out of any part of a leaf left shaded'],
   'Light is needed for the leaf to make starch',
   'Name the one thing that differed between the two halves.',
   'Both halves had the same chlorophyll, air and water; only light differed, so light is ' +
   'what the result is about. The misconception is naming whichever factor comes to mind ' +
   'first - a result can only be about the variable that was actually changed.'],

  ['g9s-bfam-009-d', CH4, 'photosynthesis_experiments', 4,
   'A pupil covers part of a <b>variegated</b> leaf, which has green and white areas, with ' +
   'black paper. After a day in sunlight the leaf is tested and the pupil concludes that ' +
   'light is needed to make starch. Why is that conclusion unsafe?',
   ['Two things differ at once, so neither can be blamed alone',
    'A variegated leaf makes starch only in its white areas',
    'Iodine solution cannot be used on a leaf with white areas',
    'The leaf must be boiled in water before it is covered up'],
   'Two things differ at once, so neither can be blamed alone',
   'List everything that is not the same between the two areas being compared.',
   'An area with no starch might be missing light, or missing chlorophyll, or both, so the ' +
   'result cannot say which mattered. Change one variable at a time: use an all-green leaf ' +
   'to test light, and an uncovered variegated leaf to test chlorophyll. The misconception ' +
   'is that any experiment giving a clear-looking result has proved something.'],

  // ══ FAMILY 010 · a rate that levels off ══
  ['g9s-bfam-010-b', CH4, 'factors_for_photosynthesis', 3,
   B_INTRO + 'Which statement describes the pattern in these results?',
   ['The rate rises steadily, then almost stops rising',
    'The rate rises steadily across the whole range',
    'The rate rises, then falls back at high intensity',
    'The rate stays the same whatever the intensity is'],
   'The rate rises steadily, then almost stops rising',
   'Work out the step between each pair of readings before describing the shape.',
   'The steps are 8, 8, 6 and 2, so the rise slows sharply at the top of the range. The ' +
   'misconception is describing a line from its two ends only; the middle readings are what ' +
   'show the change of shape.'],

  ['g9s-bfam-010-c', CH4, 'factors_for_photosynthesis', 4,
   B_INTRO + 'Between intensities 4 and 5 the rate rises by only 2 bubbles per minute. ' +
   'What best explains this?',
   ['Another factor has become the one limiting the rate',
    'The plant has used up all of the chlorophyll in its leaves',
    'Very bright light begins to stop photosynthesis working',
    'The plant has made as much starch as its leaves can hold'],
   'Another factor has become the one limiting the rate',
   'Photosynthesis needs several things at once, not light alone.',
   'Once there is plenty of light, whichever other requirement is in shortest supply - here ' +
   'the dissolved carbon dioxide - sets the rate, so more light adds almost nothing. The ' +
   'misconception is that the factor you are changing must always be the one in control.'],

  ['g9s-bfam-010-d', CH4, 'factors_for_photosynthesis', 4,
   B_INTRO + 'Predict what would happen at intensity 5 if extra carbon dioxide were ' +
   'dissolved in the water, with the temperature unchanged.',
   ['The rate would rise, showing carbon dioxide was limiting',
    'The rate would stay the same, since light sets the rate',
    'The rate would fall, since carbon dioxide is a waste gas',
    'The bubbles would stop, since the plant is already full'],
   'The rate would rise, showing carbon dioxide was limiting',
   'Predict first, then say what the result would prove.',
   'If carbon dioxide is what is holding the rate back, supplying more of it must let the ' +
   'rate climb again - and that rise is the evidence for the explanation. The misconception ' +
   'is treating carbon dioxide as a waste gas: it is waste from respiration but a raw ' +
   'material for photosynthesis.'],

  // ══ FAMILY 011 · a falling fish catch, a cyclone, and fishing effort ══
  ['g9s-bfam-011-b', CH3, 'natural_threats', 3,
   L_INTRO + 'A cyclone badly damaged the reef in Year 6. What do the figures show about ' +
   'the cyclone as the cause of the fall?',
   ['The catch was already falling before the cyclone struck',
    'The catch fell only in the years after the cyclone struck',
    'The cyclone caused the whole fall from Year 1 onwards',
    'The cyclone had no effect on the catch in any of the years'],
   'The catch was already falling before the cyclone struck',
   'Look at the rows before Year 6 on their own.',
   'The catch drops from 400 to 320 tonnes over Years 1 to 5, before the cyclone, so the ' +
   'cyclone cannot account for the whole decline, though it may have made it worse. The ' +
   'misconception is letting one dramatic event claim a trend that started before it.'],

  ['g9s-bfam-011-c', CH3, 'human_threats', 4,
   L_INTRO + 'A cyclone damaged the reef in Year 6, and the lagoon is also heavily fished. ' +
   'Which further evidence would best separate these two explanations of the fall?',
   ['The number of fishing boats working the lagoon each year',
    'The number of cyclones in the region over the last 50 years',
    'The price paid for fish at the market in each of the years',
    'The number of tourists visiting the lagoon in each of the years'],
   'The number of fishing boats working the lagoon each year',
   'Useful evidence must change if one explanation is true and not if the other is.',
   'Boat numbers measure fishing effort directly, so a steady rise in boats would support ' +
   'overfishing while flat boat numbers would point at the reef damage. The misconception ' +
   'is collecting whatever data is easy to get: cyclone history, prices and tourist numbers ' +
   'are all about the lagoon, and none of them tells the two explanations apart.'],

  ['g9s-bfam-011-d', CH3, 'human_threats', 4,
   'Fishermen land a smaller catch from a lagoon than they did ten years ago. A pupil says ' +
   'this proves there are fewer fish living in the lagoon. Is that always, sometimes or ' +
   'never true?',
   ['Sometimes, because the catch depends on fishing effort too',
    'Always, because catch and fish numbers rise and fall together',
    'Always, because fewer fish is the only cause of a small catch',
    'Never, because the catch says nothing at all about fish numbers'],
   'Sometimes, because the catch depends on fishing effort too',
   'Two things decide a catch: what is in the water and how hard it is fished.',
   'If boats, hours or nets have been cut back, the catch falls even with the same fish in ' +
   'the lagoon; if effort has been steady, a falling catch is evidence of falling numbers. ' +
   'The misconception is reading a measure of what people took as a measure of what is ' +
   'there.'],

  ['g9s-bfam-011-e', CH3, 'natural_threats', 2,
   'Which of these threats to a lagoon is a <b>natural</b> calamity rather than a human ' +
   'activity?',
   ['A cyclone that breaks up the coral',
    'Waste water piped into the lagoon',
    'Coral taken to sell to visitors',
    'A hotel built over the mangroves'],
   'A cyclone that breaks up the coral',
   'Three of these would stop if people stopped doing something.',
   'A cyclone happens whether or not people are present; pollution, coral collecting and ' +
   'building are all human threats. The misconception is calling any damage to nature a ' +
   'natural threat - the word describes the cause, not the victim.'],

  // ══ FAMILY 012 · a claim about a herbal drink ══
  ['g9s-bfam-012-a', CHI, 'hypothesis_testing', 3,
   H_INTRO + 'What is missing before the fall can be linked to the drink?',
   ['A similar group of adults who did not take the drink',
    'A second month of readings from the same eight adults',
    'A record of each adult\'s pulse before they woke up',
    'A count of how many millilitres each adult drank daily'],
   'A similar group of adults who did not take the drink',
   'You need to know what would have happened without the drink.',
   'Resting pulse changes with weather, activity and season, so without a comparison group ' +
   'there is nothing to say the fall would not have happened anyway. The misconception is ' +
   'that measuring before and after is enough on its own.'],

  ['g9s-bfam-012-b', CHI, 'interpreting_results', 4,
   H_INTRO + 'The study is repeated with a second group of adults who took no drink at ' +
   'all. The mean resting pulse of both groups fell by about 4 beats per minute. What does ' +
   'this show?',
   ['The fall cannot be put down to the drink itself',
    'The drink works, since the pulse fell in both groups',
    'The control group must have taken the drink secretly',
    'The drink works only in people with a high pulse rate'],
   'The fall cannot be put down to the drink itself',
   'Compare the two groups with each other, not each group with its own start.',
   'Both groups changed by the same amount, so whatever caused the fall was acting on the ' +
   'group that took nothing as well. The misconception is looking only at the treated ' +
   'group: a control group is there to be compared against, not just to exist.'],

  ['g9s-bfam-012-c', CHI, 'interpreting_results', 3,
   H_INTRO + 'Which change would most improve how much the result can be trusted?',
   ['Repeating it with several hundred adults, not eight',
    'Taking each adult\'s pulse twice on the same morning',
    'Running it for two months instead of for one month',
    'Choosing adults whose resting pulse is already low'],
   'Repeating it with several hundred adults, not eight',
   'Think about how much one unusual person shifts a mean of eight.',
   'In a group of eight, one person with an unusual month moves the mean a long way; ' +
   'hundreds of people leave the effect of any one of them small. The misconception is that ' +
   'taking more readings from the same few people is the same as testing more people.'],

  // ══ FAMILY 013 · weighing three sources against each other ══
  ['g9s-bfam-013-a', CHS, 'evaluating_information', 2,
   W_INTRO + 'Which is the stronger evidence about the supplement, and why?',
   ['The trial, because it compared many people with a control',
    'The website, because the users describe their own experience',
    'The website, because all 12 accounts agree with each other',
    'The trial, because it also appeared on the internet afterwards'],
   'The trial, because it compared many people with a control',
   'Ask what each source could have found if the supplement did nothing.',
   'The trial had a comparison group and enough people for chance to average out, so it ' +
   'could have detected an effect had there been one; 12 self-selected stories could not. ' +
   'The misconception is that agreeing accounts add up to evidence - people who felt no ' +
   'benefit had no reason to write in.'],

  ['g9s-bfam-013-b', CHS, 'evaluating_information', 3,
   'A website states: "No scientist has ever proved this supplement is harmful, so it must ' +
   'work." What is wrong with that reasoning?',
   ['Being unproved harmful says nothing about whether it works',
    'Scientists have in fact proved that the supplement is harmful',
    'A supplement that is not harmful must be doing something',
    'Only a doctor is allowed to say whether a product works'],
   'Being unproved harmful says nothing about whether it works',
   'Safety and effectiveness are two separate questions.',
   'Clean water is harmless and would not cure tiredness either; showing that something ' +
   'does no damage is not evidence that it does any good. The misconception is treating ' +
   '"no evidence against" as evidence in favour.'],

  ['g9s-bfam-013-c', CHS, 'evaluating_information', 4,
   W_INTRO + 'A third study, of 30 people and paid for by the maker of the supplement, ' +
   'reports a large benefit. Two of the three sources now favour the supplement. How ' +
   'should the three be judged?',
   ['By method and independence, so the 400-person trial leads',
    'By majority, so the two favourable sources decide the matter',
    'By how recent each one is, so the newest study leads',
    'By size of effect, so the largest reported benefit leads'],
   'By method and independence, so the 400-person trial leads',
   'Evidence is weighed, not counted.',
   'The 400-person trial is the largest, has a comparison group and no stake in the answer, ' +
   'so it outweighs a small funded study and a page of testimonials put together. The ' +
   'misconception is voting: three sources are not three votes, and a source paid for by ' +
   'the seller needs more scrutiny, not equal standing.'],
];

const NUM = [
  ['g9s-bfam-001-a', CH1, 'interpreting_health_data', 2,
   D_INTRO + 'How many more heart-attack admissions per 10 000 adults were recorded in ' +
   'Nord than in Ouest?',
   24,
   'Use the admissions column, not the exercise column.',
   '48 &minus; 24 = 24 admissions per 10 000 adults. The common slip is subtracting the ' +
   'exercise percentages (50 &minus; 20 = 30), which answers a different question.'],

  ['g9s-bfam-002-a', CH1, 'magnification', 2,
   'A drawing of a white blood cell is 72 mm wide. The real cell is 0.012 mm wide. ' +
   'Calculate the magnification of the drawing.',
   6000,
   'Magnification = drawing size &divide; real size.',
   '72 &divide; 0.012 = 6000, so the drawing is &times;6000. A magnification has no unit ' +
   'because it is one length divided by another.'],

  ['g9s-bfam-002-b', CH1, 'magnification', 3,
   'A drawing of a white blood cell is 90 mm wide and was made at a magnification of ' +
   '&times;7500. Calculate the real width of the cell, in mm.',
   0.012,
   'Rearrange to real size = drawing size &divide; magnification.',
   '90 &divide; 7500 = 0.012 mm. The common slip is multiplying, which would make the real ' +
   'cell larger than the drawing.'],

  ['g9s-bfam-002-c', CH1, 'magnification', 3,
   'A white blood cell is 0.015 mm wide. It is to be drawn at a magnification of ' +
   '&times;4000. Calculate the width the drawing should be, in mm.',
   60,
   'Rearrange to drawing size = real size &times; magnification.',
   '0.015 &times; 4000 = 60 mm. Here the unknown is the drawing, so the two known values ' +
   'are multiplied rather than divided.'],

  ['g9s-bfam-003-a', CH1, 'pulse', 2,
   P_INTRO + 'By how many beats per minute did the pulse of Pupil A fall during the first ' +
   'two minutes?',
   54,
   'Use the reading at 0 minutes and the reading at 2 minutes.',
   '150 &minus; 96 = 54 beats per minute. The common slip is reading down Pupil B\'s ' +
   'column, which gives 24.'],

  ['g9s-bfam-003-b', CH1, 'pulse', 3,
   P_INTRO + 'Calculate the mean of the five readings taken from Pupil B, in beats per ' +
   'minute.',
   126,
   'Add the five readings, then divide by how many there are.',
   '150 + 138 + 126 + 114 + 102 = 630, and 630 &divide; 5 = 126 beats per minute. Divide ' +
   'by 5 readings, not by the 4 minutes.'],

  ['g9s-bfam-005-a', CH2, 'interpreting_health_data', 2,
   S_INTRO + 'Calculate the percentage of the 2021 tests that gave a positive result.',
   3,
   'Percentage = (positive &divide; tests done) &times; 100.',
   '(600 &divide; 20 000) &times; 100 = 3%. Percentages let the three years be compared ' +
   'even though a different number of tests was done each year.'],

  ['g9s-bfam-005-b', CH2, 'interpreting_health_data', 3,
   S_INTRO + 'In 2020, 350 of 10 000 tests were positive. If that same percentage had ' +
   'applied in 2021, how many of the 2021 tests would have been positive?',
   700,
   'Find the 2020 percentage first, then apply it to the 2021 number of tests.',
   '350 &divide; 10 000 = 3.5%, and 3.5% of 20 000 = 700. The clinic actually recorded ' +
   '600, so the positive rate fell even though the count of positives rose.'],

  ['g9s-bfam-008-a', CH3, 'quadrat_sampling', 2,
   'A pupil placed five quadrats of 1 m&sup2; at random on a lawn and counted 4, 6, 5, 7 ' +
   'and 3 daisy plants. Calculate the mean number of daisy plants per quadrat.',
   5,
   'Add the five counts, then divide by the number of quadrats.',
   '4 + 6 + 5 + 7 + 3 = 25, and 25 &divide; 5 = 5 plants per quadrat. Each quadrat covers ' +
   '1 m&sup2;, so this is also 5 plants per square metre.'],

  ['g9s-bfam-008-b', CH3, 'quadrat_sampling', 2,
   'A pupil placed five quadrats of 1 m&sup2; at random on a lawn of 200 m&sup2; and ' +
   'counted 4, 6, 5, 7 and 3 daisy plants. Estimate the total number of daisy plants on ' +
   'the whole lawn.',
   1000,
   'Find the mean per square metre, then scale up to the whole area.',
   'Mean = 25 &divide; 5 = 5 per m&sup2;, so the estimate is 5 &times; 200 = 1 000 plants. ' +
   'The common slip is multiplying the total counted (25) by the area, which counts each ' +
   'quadrat 200 times over.'],

  ['g9s-bfam-008-c', CH3, 'quadrat_sampling', 3,
   'In a field of 300 m&sup2;, six quadrats of 1 m&sup2; were used and the estimated total ' +
   'was 1 200 plants. Calculate the total number of plants counted inside the six quadrats.',
   24,
   'Work backwards: the estimate came from a mean per square metre.',
   'Mean = 1 200 &divide; 300 = 4 plants per m&sup2;, so the six quadrats held 4 &times; ' +
   '6 = 24 plants in total. This is the estimate run in reverse.'],

  ['g9s-bfam-010-a', CH4, 'factors_for_photosynthesis', 2,
   B_INTRO + 'How many bubbles per minute were counted at light intensity 3?',
   24,
   'Find the row for intensity 3 and read across.',
   '24 bubbles per minute. Reading the row above or below gives 16 or 30, so check the ' +
   'intensity value before reading across.'],

  ['g9s-bfam-011-a', CH3, 'human_threats', 2,
   L_INTRO + 'Calculate the percentage fall in the catch from Year 1 to Year 10.',
   50,
   'Percentage fall = (fall &divide; the starting value) &times; 100.',
   'Fall = 400 &minus; 200 = 200 tonnes, and (200 &divide; 400) &times; 100 = 50%. The ' +
   'common slip is dividing by the final catch of 200, which gives 100% and would mean ' +
   'nothing was landed at all.'],
];

const SHORT = [
  ['g9s-bfam-006-a', CH2, 'female_reproductive_system', 1,
   'Name the tube that carries an egg from the ovary towards the uterus.',
   'Oviduct', ['the oviduct', 'oviducts', 'fallopian tube', 'the fallopian tube',
     'fallopian tubes', 'egg tube', 'oviduct (fallopian tube)'],
   'It is the tube between the ovary and the uterus.',
   'The oviduct, also called the fallopian tube, carries the egg away from the ovary and ' +
   'is where fertilisation normally happens.'],

  ['g9s-bfam-004-a', CH1, 'blood_vessels', 2,
   'Name the blood vessel that carries blood from the heart to the lungs.',
   'Pulmonary artery', ['the pulmonary artery', 'pulmonary arteries',
     'the pulmonary arteries'],
   'It leaves the heart, so it is not a vein.',
   'The pulmonary artery carries blood away from the right side of the heart to the lungs. ' +
   'It is an artery because of the direction it carries blood, even though the blood in it ' +
   'is deoxygenated.'],

  ['g9s-bfam-005-e', CH2, 'interpreting_health_data', 3,
   'A clinic reports how many screening tests came back positive this year. State the ' +
   'other figure that must be known before saying whether the disease is becoming more ' +
   'common.',
   'The number of tests', ['number of tests', 'the number of tests done',
     'number of tests done', 'how many tests were done', 'the number of people tested',
     'number of people tested', 'how many people were tested', 'the number tested'],
   'A count of positives on its own does not say how many people were looked at.',
   'Positives can only be compared between years as a share of the tests carried out; ' +
   'testing more people finds more cases even when the disease is no more common.'],

  ['g9s-bfam-007-d', CH2, 'sexual_asexual', 3,
   'A new disease reaches a field of plants grown from seed, and a few of the plants ' +
   'survive it. Give the term for the differences between individuals that allow this.',
   'Variation', ['genetic variation', 'variations', 'variety', 'genetic variety',
     'natural variation'],
   'It is what sexual reproduction produces and asexual reproduction does not.',
   'Sexual reproduction mixes genes from two parents, so the offspring differ; that ' +
   'variation means some may carry resistance the others lack. Plants grown from suckers ' +
   'or cuttings have almost none of it.'],

  ['g9s-bfam-008-e', CH3, 'quadrat_sampling', 3,
   'A pupil estimates the number of daisies on a lawn from five quadrats. State what must ' +
   'be true about where the quadrats are placed for the estimate to be trusted.',
   'Random', ['random placement', 'randomly placed', 'placed at random', 'at random',
     'they must be random', 'random positions', 'random sampling', 'chosen at random'],
   'The placing must not favour any one part of the lawn.',
   'Quadrat positions are chosen from random coordinates so that every part of the area ' +
   'has the same chance of being sampled; choosing spots that look interesting biases the ' +
   'estimate before any counting starts.'],

  ['g9s-bfam-009-b', CH4, 'photosynthesis_experiments', 2,
   'Name the solution used to test a leaf for starch.',
   'Iodine', ['iodine solution', 'the iodine solution', 'iodine (solution)',
     'dilute iodine', 'iodine liquid'],
   'It is orange-brown before it is dropped on the leaf.',
   'Iodine solution turns from orange-brown to blue-black where starch is present, so the ' +
   'colour shows which parts of the leaf have been making food.'],

  ['g9s-bfam-009-e', CH4, 'photosynthesis_experiments', 3,
   'In the experiment where half of a destarched green leaf is covered with black paper, ' +
   'name the part of the leaf that acts as the control.',
   'The uncovered part', ['uncovered part', 'the uncovered half', 'uncovered half',
     'the exposed part', 'exposed part', 'the part left in the light',
     'the part in the light', 'the uncovered area'],
   'The control is the part that had nothing done to it.',
   'The uncovered half experienced everything the covered half did except the loss of ' +
   'light, so the difference between them can be blamed on light alone.'],

  ['g9s-bfam-010-e', CH4, 'factors_for_photosynthesis', 2,
   'Name the gas that collects as bubbles from the cut stem of pondweed in the light.',
   'Oxygen', ['o2', 'oxygen gas', 'the oxygen'],
   'It is the gas photosynthesis releases.',
   'Photosynthesis releases oxygen as a by-product, so counting the bubbles is a way of ' +
   'measuring how fast the plant is photosynthesising.'],

  ['g9s-bfam-012-d', CHI, 'recording_data', 2,
   'A study tests whether a herbal drink lowers resting pulse. Name the quantity that must ' +
   'be measured and recorded to judge the effect of the drink.',
   'Pulse rate', ['pulse', 'the pulse rate', 'resting pulse', 'the resting pulse',
     'resting pulse rate', 'heart rate', 'the heart rate'],
   'It is the quantity the claim is about.',
   'The pulse rate is the dependent variable: it is measured, not chosen, and it is what ' +
   'is expected to change if the drink has any effect.'],

  ['g9s-bfam-013-d', CHS, 'evaluating_information', 3,
   'State what a published study must include so that other scientists can repeat it and ' +
   'check the result for themselves.',
   'The method', ['method', 'its method', 'the method used', 'the procedure', 'procedure',
     'the full method', 'a method'],
   'Another team must be able to do exactly what the first team did.',
   'A study that reports only its conclusion cannot be checked; the method lets another ' +
   'team repeat the work under the same conditions and see whether the same result appears.'],
];

MCQ.forEach(([id, chapterId, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

NUM.forEach(([id, chapterId, subsection, difficulty, question, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeNum({ id, chapterId, subsection, difficulty,
    question, answer, hint, explanation }));
});

SHORT.forEach(([id, chapterId, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

})();
