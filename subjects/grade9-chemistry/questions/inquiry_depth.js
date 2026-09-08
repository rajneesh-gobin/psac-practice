'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Chemistry - Scientific Inquiry, depth pass
//
//  ⚠ THIS PACK HELD ONLY PART OF A CROSS-CUTTING CHAPTER. g9s-inquiry and
//    g9s-sts were split between biology / chemistry / physics by subject
//    affinity when grade9-science was divided on 2026-09-08, so chemistry kept
//    12 inquiry items across three subsections and biology kept the other
//    three. This file brings all six to 20 items each, in CHEMISTRY contexts -
//    titrations, burette readings, mass loss from a flask, rates of reaction,
//    the reactivity series - so that a child practising chemistry inquiry meets
//    chemistry apparatus and not a water plant.
//
//  ⚠ IDS CARRY A `c` BLOCK (g9s-inq-c001…) ON PURPOSE. The shared 001-036 block
//    is already split across three packs and biology / physics are being filled
//    out in parallel working trees; a bare numeric continuation would collide
//    silently and the importer keys on ids. The g9s- prefix is kept, as the
//    manifest requires.
//
//  ⚠ THE THREE NEW SUBSECTIONS ARE DECLARED IN _manifest.js. A tagged id that
//    is not declared hides those questions from the syllabus screen entirely;
//    scripts/test-subsection-invariant.js fails the build on either half.
//
//  ⚠ <i> IS AN HTML BREAKOUT TAG AND MUST NEVER APPEAR INSIDE AN <svg>.
//
//  Source: NCE Chemistry 2021-2025 (blueprint-science §C.3, §X.6);
//  NCF Grades 7-9 §Scientific Inquiry.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-inquiry';

// ── Volume of gas against time. One curve, or two of equal final height for
//    the surface-area comparison: the point of the second figure is that the
//    steeper curve levels off at the SAME volume, because the mass is the same.
const rateGraph = (two) => {
  const X0 = 40, Y0 = 120, X1 = 228, Y1 = 22;
  const sx = t => X0 + (t / 120) * (X1 - X0);
  const sy = v => Y0 - (v / 60) * (Y0 - Y1);
  const curve = k => {
    let d = '';
    for (let t = 0; t <= 120; t += 5) {
      const v = 50 * (1 - Math.exp(-k * t));
      d += (t ? 'L' : 'M') + sx(t).toFixed(1) + ' ' + sy(v).toFixed(1) + ' ';
    }
    return d.trim();
  };
  let g = '<svg viewBox="0 0 250 ' + (two ? 172 : 156) + '" width="270" role="img" '
    + 'aria-label="a graph of gas volume against time">';
  g += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X1 + '" y2="' + Y0 + '" stroke="#0f172a" stroke-width="2"/>';
  g += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X0 + '" y2="' + Y1 + '" stroke="#0f172a" stroke-width="2"/>';
  ['0', '30', '60', '90', '120'].forEach((t, i) => {
    const x = X0 + (i / 4) * (X1 - X0);
    g += '<line x1="' + x.toFixed(1) + '" y1="' + Y0 + '" x2="' + x.toFixed(1) + '" y2="' + (Y0 + 4) + '" stroke="#0f172a" stroke-width="1"/>';
    g += '<text x="' + x.toFixed(1) + '" y="' + (Y0 + 14) + '" font-size="8" text-anchor="middle" fill="#334155">' + t + '</text>';
  });
  ['0', '20', '40', '60'].forEach((v, i) => {
    const y = Y0 - (i / 3) * (Y0 - Y1);
    g += '<line x1="' + (X0 - 4) + '" y1="' + y.toFixed(1) + '" x2="' + X0 + '" y2="' + y.toFixed(1) + '" stroke="#0f172a" stroke-width="1"/>';
    g += '<text x="' + (X0 - 7) + '" y="' + (y + 3).toFixed(1) + '" font-size="8" text-anchor="end" fill="#334155">' + v + '</text>';
  });
  g += '<path d="' + curve(two ? 0.09 : 0.05) + '" fill="none" stroke="#b91c1c" stroke-width="2.5"/>';
  // ⚠ The slower curve must reach the SAME plateau inside the plotted window,
  //   because c091 asks the child to read "faster, but the same total gas" off
  //   the figure. At k = 0.018 it was still climbing at t = 120 and the figure
  //   said the opposite of the answer.
  if (two) g += '<path d="' + curve(0.032) + '" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-dasharray="6 4"/>';
  g += '<text x="134" y="146" font-size="8" text-anchor="middle" fill="#334155">Time / s</text>';
  g += '<text x="12" y="72" font-size="8" text-anchor="middle" fill="#334155" transform="rotate(-90 12 72)">Volume of gas / cm&sup3;</text>';
  if (two) {
    g += '<line x1="52" y1="163" x2="76" y2="163" stroke="#b91c1c" stroke-width="2.5"/>';
    g += '<text x="80" y="166" font-size="8" fill="#334155">powder</text>';
    g += '<line x1="140" y1="163" x2="164" y2="163" stroke="#1d4ed8" stroke-width="2.5" stroke-dasharray="6 4"/>';
    g += '<text x="168" y="166" font-size="8" fill="#334155">lumps</text>';
  }
  return g + '</svg>';
};

const RATE_ONE = rateGraph(false);
const RATE_TWO = rateGraph(true);

const HOT = 'A pupil tests the idea that magnesium reacts faster with acid at a '
  + 'higher temperature. The same volume of acid, of the same concentration, is '
  + 'warmed to five different temperatures and the time for the ribbon to '
  + 'disappear is measured each time.<br>';

const MCQ = [
  // ── lab_safety ──────────────────────────────────────────────────────────
  ['g9s-inq-c001', 'lab_safety', 2,
   'Why is concentrated acid always added to water, and never water to acid?',
   ['A great deal of heat is released and the mixture can spit',
    'The acid would turn into a gas that cannot be collected',
    'The water would become far too cold for the acid to mix',
    'The acid would lose its strength and stop reacting at all'],
   'A great deal of heat is released and the mixture can spit',
   'Think about the heat produced when the two meet.',
   'Diluting acid releases heat. Adding acid slowly to a large volume of water spreads that heat through the water; pouring water onto acid heats a small volume, which can boil and throw acid out of the beaker.'],

  ['g9s-inq-c002', 'lab_safety', 1,
   'Which protective equipment should be worn when handling a corrosive acid?',
   ['Safety goggles and a laboratory coat',
    'A woollen scarf and canvas sandals',
    'A paper apron and cotton mittens',
    'A sun hat and a pair of oven gloves'],
   'Safety goggles and a laboratory coat',
   'Protect the eyes before anything else.',
   'Goggles keep splashes out of the eyes and a laboratory coat protects skin and clothing from a corrosive liquid.'],

  ['g9s-inq-c003', 'lab_safety', 2,
   'Why are anti-bumping granules added before a liquid is boiled?',
   ['They let bubbles form steadily so the liquid does not spit',
    'They raise the boiling point so the liquid heats up faster',
    'They soak up the liquid so that less of it has to be used',
    'They colour the liquid so that the level can be seen easily'],
   'They let bubbles form steadily so the liquid does not spit',
   'Think about how a liquid boils when they are left out.',
   'Without them a liquid superheats and boils in sudden bursts, called bumping. The granules give small bubbles somewhere to start, so boiling is smooth and nothing is thrown out of the flask.'],

  ['g9s-inq-c004', 'lab_safety', 3,
   'Why is a flammable liquid such as ethanol heated in a water bath rather than over a flame?',
   ['Its vapour could catch fire if it met the naked flame',
    'A flame would not make the liquid hot enough to boil',
    'A water bath makes the liquid boil at a much lower point',
    'The flame would change the liquid into a different one'],
   'Its vapour could catch fire if it met the naked flame',
   'Ethanol vapour and a flame are a dangerous pair.',
   'Ethanol vapour is flammable. A water bath heats the liquid to below 100 &deg;C with no naked flame anywhere near the vapour.'],

  ['g9s-inq-c005', 'lab_safety', 3,
   'Why is a gas such as sulfur dioxide prepared in a fume cupboard?',
   ['The gas is toxic and must be drawn safely away',
    'The gas is very light and would float upwards',
    'The cupboard keeps the apparatus at one steady heat',
    'The gas is expensive and none of it may be wasted'],
   'The gas is toxic and must be drawn safely away',
   'Think about what breathing it in would do.',
   'Sulfur dioxide is toxic and irritates the lungs. A fume cupboard draws the gas away from everyone in the room.'],

  ['g9s-inq-c006', 'lab_safety', 1,
   'What is the correct way to smell a gas in a test tube?',
   ['Waft a little of it towards the nose with the hand',
    'Hold the tube under the nose and breathe in deeply',
    'Warm the tube first and then sniff it very quickly',
    'Pour it into an open beaker and lean over the top'],
   'Waft a little of it towards the nose with the hand',
   'Never take a full breath of an unknown gas.',
   'Wafting brings a very small, diluted amount to the nose. Breathing a gas in directly can damage the lungs.'],

  ['g9s-inq-c007', 'lab_safety', 2,
   'Why must a chemical in the laboratory never be tasted?',
   ['Many chemicals are poisonous even in small amounts',
    'Most chemicals have no taste that could be noticed',
    'Tasting would cool the chemical down far too quickly',
    'The taste changes once the bottle has been opened'],
   'Many chemicals are poisonous even in small amounts',
   'Think about what a trace of it could do.',
   'Even a trace of a laboratory chemical can be poisonous or corrosive, and a label tells you nothing about how a substance tastes.'],

  ['g9s-inq-c008', 'lab_safety', 3,
   'A crucible has just been heated strongly. How should it be moved?',
   ['With tongs, onto a heat-proof mat to cool down',
    'With bare hands, because it cools very quickly',
    'With a paper towel wrapped around it for grip',
    'By pouring cold water over it and lifting it out'],
   'With tongs, onto a heat-proof mat to cool down',
   'Hot porcelain looks exactly like cold porcelain.',
   'A hot crucible gives no sign that it is hot. Tongs and a heat-proof mat keep hands and bench safe, and cold water would crack it.'],

  ['g9s-inq-c009', 'lab_safety', 2,
   'Why is a Bunsen burner left with a yellow flame when it is not being used?',
   ['A yellow flame is easy to see and warns people',
    'A yellow flame uses far less gas than a blue one',
    'A yellow flame cannot set fire to anything at all',
    'A yellow flame keeps the barrel from becoming hot'],
   'A yellow flame is easy to see and warns people',
   'Which flame can you see across a bench?',
   'The safety flame is luminous and visible. A blue flame is almost invisible in a bright room, so somebody can reach through it without knowing.'],

  ['g9s-inq-c010', 'lab_safety', 3,
   'Why is the label on a bottle read before the chemical is used?',
   ['It gives the name, the hazards and how to handle it',
    'It gives the price and the shop where it was bought',
    'It gives the date on which the bottle was last washed',
    'It gives the number of pupils allowed to use it'],
   'It gives the name, the hazards and how to handle it',
   'A label carries more than a name.',
   'A label names the substance, shows its hazard symbols and states the precautions, so it must be read before the stopper is removed.'],

  ['g9s-inq-c011', 'lab_safety', 4,
   'A pupil has some leftover dilute acid at the end of a practical. What should be done with it?',
   ['Follow the instructions given for disposing of waste',
    'Pour it straight down the sink with no water at all',
    'Return it to the stock bottle it was taken from',
    'Leave it in the beaker on the bench for the next class'],
   'Follow the instructions given for disposing of waste',
   'Two of these would contaminate something.',
   'Waste is disposed of as the teacher instructs, usually diluted with plenty of running water. Returning it contaminates the stock bottle, and leaving it out is a hazard for whoever comes next.'],

  ['g9s-inq-c012', 'lab_safety', 4,
   'A beaker of hot solution cracks and the liquid spreads across the bench. What is the first thing to do?',
   ['Tell the teacher at once and keep everyone back',
    'Wipe it up quickly with a handful of paper towel',
    'Pick the broken glass out with your fingers first',
    'Carry on and clear it up at the end of the lesson'],
   'Tell the teacher at once and keep everyone back',
   'Hot liquid and broken glass are both on that bench.',
   'The teacher decides how a spill of hot liquid and broken glass is cleared. Keeping people away prevents a burn or a cut before the clean-up begins.'],

  // ── reporting_findings ──────────────────────────────────────────────────
  ['g9s-inq-c016', 'reporting_findings', 1,
   'Which section of a report states what the investigation set out to find?',
   ['The aim', 'The results', 'The apparatus', 'The method'],
   'The aim',
   'It is written before the work begins.',
   'The aim states the purpose of the investigation. The method says how it was done and the results say what happened.'],

  ['g9s-inq-c017', 'reporting_findings', 2,
   'In which section of a report is the list of chemicals and equipment given?',
   ['The apparatus and materials',
    'The conclusion and evaluation',
    'The results and observations',
    'The aim and the hypothesis'],
   'The apparatus and materials',
   'It is what you collect together before you start.',
   'The apparatus and materials section lists everything used, so that the work can be set up again exactly as it was.'],

  ['g9s-inq-c018', 'reporting_findings', 2,
   'Which of these is an <b>observation</b> rather than a conclusion?',
   ['Bubbles were seen and the ribbon disappeared',
    'Magnesium reacts faster than zinc does in acid',
    'The gas given off must have been hydrogen',
    'Magnesium is above copper in the reactivity series'],
   'Bubbles were seen and the ribbon disappeared',
   'Which one is only what your eyes saw?',
   'An observation records what happened. The other three interpret what happened, which makes them conclusions drawn from an observation.'],

  ['g9s-inq-c019', 'reporting_findings', 3,
   'Why does a method say &ldquo;25 cm&sup3; of dilute hydrochloric acid&rdquo; rather than &ldquo;some acid&rdquo;?',
   ['So another person can repeat it exactly as it was done',
    'So the report reaches the length the teacher asked for',
    'So the acid does not have to be measured out at all',
    'So the conclusion can be written before the results'],
   'So another person can repeat it exactly as it was done',
   'Think about somebody else trying to follow it.',
   'Exact quantities make the work repeatable. &ldquo;Some acid&rdquo; gives a different result each time and cannot be checked by anybody else.'],

  ['g9s-inq-c020', 'reporting_findings', 2,
   'Why is a labelled diagram of the apparatus drawn in a report?',
   ['It shows how the parts were arranged more clearly',
    'It makes the report look neater than it really was',
    'It takes the place of listing any of the apparatus',
    'It shows what the results are expected to look like'],
   'It shows how the parts were arranged more clearly',
   'Some arrangements are hard to describe in words.',
   'A labelled diagram shows the set-up at a glance, such as where the delivery tube runs and where the thermometer sits, which prose describes clumsily.'],

  ['g9s-inq-c021', 'reporting_findings', 3,
   'A pupil gets one result far from all the others. What should the report do with it?',
   ['Record it and say that it does not fit',
    'Rub it out so the pattern looks tidier',
    'Change it to the value that was expected',
    'Leave it out and repeat until it agrees'],
   'Record it and say that it does not fit',
   'Honest reporting comes before a tidy graph.',
   'An anomalous result is recorded and identified. Deleting or altering it hides evidence that something went wrong, which is the opposite of science.'],

  ['g9s-inq-c022', 'reporting_findings', 2,
   'A results table records a temperature as 26.5 with nothing written after it. What is missing?',
   ['The unit', 'The colour', 'The date', 'The mass'],
   'The unit',
   'A number on its own does not say how much.',
   'Every measurement needs its unit, so this should read 26.5 &deg;C. Without a unit the number could mean anything at all.'],

  ['g9s-inq-c023', 'reporting_findings', 2,
   'Which tense is used to write up a method that has already been carried out?',
   ['The past tense, saying what was done',
    'The future tense, saying what will happen',
    'A list of the names of everyone in the group',
    'The present tense, saying what is planned'],
   'The past tense, saying what was done',
   'The work has already been done.',
   'A write-up reports work already carried out, so it is written in the past tense: &ldquo;the acid was added&rdquo;, not &ldquo;add the acid&rdquo;.'],

  ['g9s-inq-c024', 'reporting_findings', 3,
   'A conclusion says &ldquo;copper is the least useful metal&rdquo;. Why is that not acceptable?',
   ['Nothing in the results measured usefulness',
    'Copper was not named anywhere in the aim',
    'A conclusion may not mention a metal by name',
    'The word least may not be used in a report'],
   'Nothing in the results measured usefulness',
   'A conclusion may only say what was measured.',
   'The experiment measured reactivity, not usefulness. A conclusion must stay inside what the results actually show.'],

  ['g9s-inq-c025', 'reporting_findings', 4,
   'A pupil wants to show the class how three antacids compared. Which is the clearest way?',
   ['A bar chart of the volume neutralised by each',
    'A long paragraph describing each one in turn',
    'A photograph of the three bottles side by side',
    'A list of the apparatus that was used for each'],
   'A bar chart of the volume neutralised by each',
   'Three separate items are being compared.',
   'A bar chart compares separate items at a glance. Prose and a photograph do not show how big the difference between them was.'],

  ['g9s-inq-c026', 'reporting_findings', 3,
   'Why are the individual titre readings given as well as the mean?',
   ['They show how closely the repeats agreed',
    'They make the results table look much fuller',
    'They are needed because a mean cannot be used',
    'They give the volume of acid in the burette'],
   'They show how closely the repeats agreed',
   'A mean on its own hides something important.',
   'The spread of the raw readings shows how reliable the mean is. Three titres within 0.10 cm&sup3; mean far more than three that differ by 2 cm&sup3;.'],

  ['g9s-inq-c027', 'reporting_findings', 2,
   'Why does a report state the safety precautions that were taken?',
   ['So anyone repeating it knows the risks',
    'So the report can be marked more quickly',
    'So the apparatus list can be left out',
    'So the results do not need repeating'],
   'So anyone repeating it knows the risks',
   'Somebody else may set this up next week.',
   'The precautions are part of the method. Whoever repeats the work must know what the hazards are before they begin.'],

  ['g9s-inq-c028', 'reporting_findings', 4,
   'A conclusion says the reaction sped up, but the results table shows it slowed down. What should happen?',
   ['The conclusion is rewritten to match the results',
    'The results are changed to match the conclusion',
    'Both are left in and the reader chooses one',
    'The results table is removed from the report'],
   'The conclusion is rewritten to match the results',
   'Which of the two is the evidence?',
   'The results are the evidence. A conclusion that contradicts them is simply wrong and has to be rewritten.'],

  // ── research_and_ict ────────────────────────────────────────────────────
  ['g9s-inq-c032', 'research_and_ict', 2,
   'Where is the most reliable information about the hazards of a chemical found?',
   ['The safety data sheet from the supplier',
    'A comment left underneath a video clip',
    'A message forwarded by a friend online',
    'An advertisement for laboratory glassware'],
   'The safety data sheet from the supplier',
   'Ask who is responsible for the information.',
   'A supplier must publish a safety data sheet giving the hazards, the handling and the first aid. The other three are anonymous or are selling something.'],

  ['g9s-inq-c033', 'research_and_ict', 2,
   'Why is the date of a web page checked before its information is used?',
   ['Advice about a chemical can change over time',
    'A page written last week is always correct',
    'Older pages take much longer to load fully',
    'The date shows who paid for the page to exist'],
   'Advice about a chemical can change over time',
   'Safety advice is not fixed for ever.',
   'Hazard classifications and recommended practice are revised. An out-of-date page may give advice that has since been withdrawn.'],

  ['g9s-inq-c034', 'research_and_ict', 3,
   'How is a spreadsheet most useful after a titration has been carried out?',
   ['It calculates the mean titre and draws a graph',
    'It measures the volume delivered by the burette',
    'It decides which indicator should have been used',
    'It tells you when the end point has been reached'],
   'It calculates the mean titre and draws a graph',
   'It works with numbers you have already taken.',
   'A spreadsheet processes recorded data into means, differences and charts. It cannot make a measurement for you.'],

  ['g9s-inq-c035', 'research_and_ict', 3,
   'What is the advantage of using a data logger with a pH probe?',
   ['It records readings automatically at set times',
    'It removes the need to plan the experiment at all',
    'It makes the neutralisation happen more quickly',
    'It changes the pH of the solution as it is added'],
   'It records readings automatically at set times',
   'Think about how often a reading is needed near the end point.',
   'A logger takes readings at fixed intervals with nobody watching, so the rapid change near the end point is not missed.'],

  ['g9s-inq-c036', 'research_and_ict', 2,
   'Why must the author of any text copied into a report be named?',
   ['Using their words as your own is dishonest',
    'The report has to reach a set number of words',
    'Named text does not have to be understood',
    'A named author makes any claim true at once'],
   'Using their words as your own is dishonest',
   'The writing belongs to somebody.',
   'Presenting somebody else&rsquo;s words as your own is plagiarism. Naming the source credits the author and lets a reader check the claim.'],

  ['g9s-inq-c037', 'research_and_ict', 3,
   'Why is a fertiliser advertisement a poor source of evidence about water pollution?',
   ['The seller gains if the product looks harmless',
    'Advertisements are always written far too briefly',
    'The claims in it are never printed in any language',
    'Advertisements can only be read by farmers'],
   'The seller gains if the product looks harmless',
   'Ask who benefits from the message.',
   'An advertiser has an interest in the answer, so its claims are not independent. Evidence should come from a source with nothing to sell.'],

  ['g9s-inq-c038', 'research_and_ict', 2,
   'Which search would give the most useful results about acid rain in Mauritius?',
   ['&ldquo;acid rain&rdquo; Mauritius effects on buildings',
    'something interesting about rain and weather',
    'chemistry homework answers for tonight please',
    'the best website about science in the world'],
   '&ldquo;acid rain&rdquo; Mauritius effects on buildings',
   'Precise words return precise results.',
   'Naming the topic, the place and what you want narrows the search. Vague words return millions of unrelated pages.'],

  ['g9s-inq-c039', 'research_and_ict', 3,
   'Why might a simulation be used instead of carrying out a reaction?',
   ['The real reaction may be far too dangerous',
    'A simulation always gives the exact real value',
    'A simulation needs no thought about variables',
    'The real reaction can never be repeated twice'],
   'The real reaction may be far too dangerous',
   'Some reactions cannot be done in a school laboratory.',
   'A simulation lets a hazardous or expensive reaction be explored safely, although it models the reaction rather than measuring it.'],

  ['g9s-inq-c040', 'research_and_ict', 2,
   'Which chart best shows the percentage of each gas in clean dry air?',
   ['A pie chart', 'A line graph', 'A scatter plot', 'A flow chart'],
   'A pie chart',
   'The parts add up to one whole.',
   'A pie chart shows how a whole is divided. A line graph is for a quantity that changes continuously.'],

  ['g9s-inq-c041', 'research_and_ict', 3,
   'A graph is copied from a website into a report. What must go with it?',
   ['The address of the page it came from',
    'A drawing of the person who made it',
    'The number of times it was viewed',
    'A note saying the graph was easy to find'],
   'The address of the page it came from',
   'A reader may want to see it where it came from.',
   'The source lets a reader find the original, check that it says what you claim, and see how the data were collected.'],

  ['g9s-inq-c042', 'research_and_ict', 4,
   'Two websites give different values for the pH of rainwater. What is the best next step?',
   ['Look for a third, independent source and compare',
    'Use the value from the page that loaded fastest',
    'Take the value that appears on the prettier page',
    'Write both down and let the reader pick one'],
   'Look for a third, independent source and compare',
   'Agreement between independent sources is the test.',
   'A third independent source shows which value is supported. Loading speed and appearance say nothing at all about accuracy.'],

  ['g9s-inq-c043', 'research_and_ict', 2,
   'Why are the raw data files from an investigation saved as well as the graph?',
   ['The graph can be redrawn if a mistake is found',
    'A saved file makes the graph print more clearly',
    'The graph cannot be shown without the raw file',
    'Saved files take up much less space than graphs'],
   'The graph can be redrawn if a mistake is found',
   'What if the axes turned out to be the wrong way round?',
   'Keeping the raw data means the analysis can be repeated or corrected. A graph on its own cannot be reworked.'],

  ['g9s-inq-c044', 'research_and_ict', 3,
   'What is one advantage of a digital balance over a beam balance?',
   ['The reading is a number, so nobody misreads it',
    'It works without any electricity being supplied',
    'It measures volume as well as mass in one go',
    'It never needs to be set to zero before use'],
   'The reading is a number, so nobody misreads it',
   'Think about two people reading the same instrument.',
   'A digital display removes the judgement needed to read a scale, so two people record the same value.'],

  ['g9s-inq-c045', 'research_and_ict', 4,
   'A class wants to share its results with a school in another country. Which ICT tool suits this best?',
   ['A shared online document and a video call',
    'A poster pinned on the laboratory wall',
    'A note written in the practical notebook',
    'A photograph kept on one pupil&rsquo;s phone'],
   'A shared online document and a video call',
   'The other school is not in the room.',
   'A shared document and a call let both schools see and discuss the same results. The other three stay where they are.'],

  // ── hypothesis_testing ──────────────────────────────────────────────────
  ['g9s-inq-c049', 'hypothesis_testing', 1,
   'What is a <b>hypothesis</b>?',
   ['A statement that can be tested by experiment',
    'A measurement taken during an experiment',
    'The list of apparatus used in an experiment',
    'A summary written after an experiment ends'],
   'A statement that can be tested by experiment',
   'It comes before the work, not after it.',
   'A hypothesis is a testable statement made before the experiment. The results then either support it or they do not.'],

  ['g9s-inq-c050', 'hypothesis_testing', 2,
   HOT + 'What is the <b>independent</b> variable?',
   ['The temperature of the acid',
    'The time taken to disappear',
    'The volume of acid used',
    'The concentration of the acid'],
   'The temperature of the acid',
   'It is the one deliberately changed.',
   'The independent variable is the one the pupil chooses and changes, which here is the temperature of the acid.'],

  ['g9s-inq-c051', 'hypothesis_testing', 2,
   HOT + 'What is the <b>dependent</b> variable?',
   ['The time taken to disappear',
    'The temperature of the acid',
    'The volume of acid used',
    'The length of the magnesium'],
   'The time taken to disappear',
   'It is the one measured at the end.',
   'The dependent variable is what is measured to show the effect, which here is the time for the ribbon to disappear.'],

  ['g9s-inq-c052', 'hypothesis_testing', 2,
   HOT + 'Which of these must be kept the same each time?',
   ['The concentration of the acid',
    'The temperature of the acid',
    'The time that is measured',
    'The reading on the stopclock'],
   'The concentration of the acid',
   'Anything else that could change the time.',
   'Controlled variables are held constant so that only temperature can explain the change. A different concentration would alter the time as well.'],

  ['g9s-inq-c053', 'hypothesis_testing', 3,
   'Why is only one variable changed at a time?',
   ['So the change in the result has one cause',
    'So the experiment can be finished more quickly',
    'So fewer pieces of apparatus have to be used',
    'So the results do not have to be repeated'],
   'So the change in the result has one cause',
   'Two changes at once give two possible reasons.',
   'If two variables change together you cannot say which one caused the difference, so the test is not fair.'],

  ['g9s-inq-c054', 'hypothesis_testing', 2,
   'Which of these is a testable hypothesis?',
   ['Powdered marble reacts faster than lumps',
    'Marble is the most interesting rock there is',
    'Chemistry is harder than any other subject',
    'Powdered marble looks nicer than lumps do'],
   'Powdered marble reacts faster than lumps',
   'Which one could you actually measure?',
   'A testable hypothesis predicts something that can be measured. Interest, difficulty and appearance are opinions, not measurements.'],

  ['g9s-inq-c055', 'hypothesis_testing', 3,
   'Why is &ldquo;copper is the most beautiful metal&rdquo; not a scientific hypothesis?',
   ['Beauty cannot be measured in an experiment',
    'Copper is not a metal that can be tested',
    'Only three metals may be named at one time',
    'A hypothesis may never mention a colour'],
   'Beauty cannot be measured in an experiment',
   'Ask what instrument would test it.',
   'A hypothesis must be testable. There is no measurement that could decide which metal is the most beautiful.'],

  ['g9s-inq-c056', 'hypothesis_testing', 3,
   'Iron nails are used to test whether rusting needs both air and water. Which tube is the <b>control</b>?',
   ['A nail in ordinary water open to the air',
    'A nail in boiled water sealed under oil',
    'A nail in dry air over a drying agent',
    'A nail in oil with no water present'],
   'A nail in ordinary water open to the air',
   'The control is the one in which rusting is expected.',
   'The control has both air and water present, so it shows what happens when nothing is removed and gives the other tubes something to be compared with.'],

  ['g9s-inq-c057', 'hypothesis_testing', 2,
   'Why is an experiment repeated three times?',
   ['To check that the readings agree with each other',
    'To use up all the chemicals that were prepared',
    'To give every member of the group a turn at it',
    'To make sure the apparatus does not get cold'],
   'To check that the readings agree with each other',
   'A single reading could be a mistake.',
   'Repeats show whether a value is reliable. With one reading only, an error would never be revealed.'],

  ['g9s-inq-c058', 'hypothesis_testing', 3,
   'Powdered marble and marble lumps of the same mass are added to the same acid. What is the prediction?',
   ['The powder reacts faster than the lumps',
    'The lumps give off much more gas in total',
    'Both react at exactly the same speed here',
    'The lumps stop reacting before the powder'],
   'The powder reacts faster than the lumps',
   'Which one has more surface touching the acid?',
   'Powder has a far greater surface area, so more particles are exposed and the reaction is faster. The total gas is the same, because the mass of marble is the same.'],

  ['g9s-inq-c059', 'hypothesis_testing', 3,
   'Manganese(IV) oxide is added to hydrogen peroxide to test whether it is a catalyst. What must be kept the same in both tests?',
   ['The volume and concentration of the peroxide',
    'The volume of gas that is given off in total',
    'The number of bubbles counted in a minute',
    'The time taken for the bubbling to stop'],
   'The volume and concentration of the peroxide',
   'A controlled variable is never one you measure.',
   'Only the catalyst should differ, so the peroxide must be identical in both tubes. The gas and the time are the measurements, so they cannot be controlled.'],

  ['g9s-inq-c060', 'hypothesis_testing', 4,
   'A pupil wants to find which of three antacid tablets neutralises the most acid. What must be the same for each tablet?',
   ['The concentration of the acid used each time',
    'The volume of acid that each tablet neutralises',
    'The mass of each tablet after the reaction',
    'The time each tablet takes to dissolve fully'],
   'The concentration of the acid used each time',
   'One of these is the thing you are measuring.',
   'The acid must be identical so that only the tablets differ. The volume neutralised is the measurement, so it cannot be fixed in advance.'],

  ['g9s-inq-c061', 'hypothesis_testing', 4,
   'How should a pupil test whether concentration affects the rate of a reaction?',
   ['Change only the concentration of the acid',
    'Change the concentration and the temperature',
    'Change the metal used for each concentration',
    'Change the volume of acid for each attempt'],
   'Change only the concentration of the acid',
   'One variable at a time.',
   'Only the concentration may change. Altering anything else means a difference in rate could have had another cause.'],

  ['g9s-inq-c062', 'hypothesis_testing', 3,
   'The results do not support the hypothesis. What should the pupil do?',
   ['Report that and say what the results show',
    'Change the results until they agree with it',
    'Write the hypothesis again after the results',
    'Leave the conclusion out of the report'],
   'Report that and say what the results show',
   'A hypothesis that fails is still a result.',
   'A hypothesis that is not supported is reported honestly. Learning that an idea is wrong is a genuine scientific finding.'],

  ['g9s-inq-c063', 'hypothesis_testing', 2,
   'A good hypothesis is based on:',
   ['What is already known about the topic',
    'What the pupil hopes will be the result',
    'What the rest of the class has decided',
    'What takes the least time to carry out'],
   'What is already known about the topic',
   'It is a reasoned prediction, not a wish.',
   'A hypothesis grows out of what is already known, such as the fact that particles move faster when hotter, and is then tested.'],

  ['g9s-inq-c064', 'hypothesis_testing', 4,
   'Potassium nitrate is dissolved in water at 20, 30, 40, 50 and 60 &deg;C to find how much dissolves. What is the dependent variable?',
   ['The mass that dissolves in the water',
    'The temperature of the water used',
    'The volume of water in each beaker',
    'The type of salt that is being used'],
   'The mass that dissolves in the water',
   'It is what is measured at each temperature.',
   'Temperature is chosen and changed, so it is the independent variable. The mass that dissolves is measured and depends on it.'],

  // ── recording_data ──────────────────────────────────────────────────────
  ['g9s-inq-c069', 'recording_data', 1,
   'Where is the unit written in a results table?',
   ['In the column heading', 'Beside every reading',
    'Under the whole table', 'In the title of the table'],
   'In the column heading',
   'It is written once, not fifty times.',
   'The unit goes in the column heading, such as &ldquo;Time / s&rdquo;, so that each cell below holds a number only.'],

  ['g9s-inq-c070', 'recording_data', 2,
   'Which quantity is written in the first column of a results table?',
   ['The independent variable', 'The dependent variable',
    'The mean of the repeats', 'The largest reading taken'],
   'The independent variable',
   'The one whose values you chose.',
   'The independent variable heads the first column, listed in order, with the measured values beside it.'],

  ['g9s-inq-c071', 'recording_data', 2,
   'Which axis of a graph carries the independent variable?',
   ['The horizontal axis', 'The vertical axis',
    'Either one will do', 'Neither of the axes'],
   'The horizontal axis',
   'It is usually called the x-axis.',
   'The independent variable goes on the horizontal axis and the dependent variable on the vertical axis.'],

  ['g9s-inq-c072', 'recording_data', 3,
   'A burette is read to the nearest:',
   ['0.05 cm&sup3;', '1 cm&sup3;', '5 cm&sup3;', '10 cm&sup3;'],
   '0.05 cm&sup3;',
   'It is graduated in divisions of 0.1.',
   'A burette is graduated in 0.1 cm&sup3; and is read to the nearest half division, which is 0.05 cm&sup3;.'],

  ['g9s-inq-c073', 'recording_data', 2,
   'The volume of gas collected is measured every 30 seconds. Which graph should be drawn?',
   ['A line graph', 'A bar chart', 'A pie chart', 'A flow chart'],
   'A line graph',
   'Both quantities change continuously.',
   'Two continuous quantities are plotted as a line graph, so that the shape of the change can be seen.'],

  ['g9s-inq-c074', 'recording_data', 2,
   'Four different antacids are compared. Which chart should be drawn?',
   ['A bar chart', 'A line graph', 'A pie chart', 'A ray diagram'],
   'A bar chart',
   'The four antacids are separate items.',
   'A bar chart compares separate categories. A line graph would imply values between the bars, which is meaningless here.'],

  ['g9s-inq-c075', 'recording_data', 3,
   'Why are all the masses in a table recorded to the same number of decimal places?',
   ['It shows the balance was read the same way',
    'It makes the numbers add up more easily',
    'It saves the time needed to write them out',
    'It stops the balance from drifting off zero'],
   'It shows the balance was read the same way',
   'Decimal places show how precise the instrument is.',
   'Recording 2.40 g rather than 2.4 g states the precision of the balance, and a consistent table shows every reading was taken in the same way.'],

  ['g9s-inq-c076', 'recording_data', 3,
   'Why is the mass of the empty crucible recorded as well as the final mass?',
   ['The mass of the solid is the difference',
    'The crucible must be weighed before heating',
    'The balance needs a second reading to work',
    'The crucible loses mass while it is heated'],
   'The mass of the solid is the difference',
   'You cannot weigh the solid on its own.',
   'The solid cannot be weighed by itself once it is in the crucible, so the empty mass is subtracted from the total.'],

  ['g9s-inq-c077', 'recording_data', 2,
   'What must be written along each axis of a graph?',
   ['The quantity and its unit', 'The name of the pupil',
    'The date of the lesson', 'The number of readings taken'],
   'The quantity and its unit',
   'A number on an axis has to say what it is.',
   'Each axis is labelled with the quantity and its unit, such as &ldquo;Volume of gas / cm&sup3;&rdquo;, or the graph cannot be read.'],

  ['g9s-inq-c078', 'recording_data', 3,
   'Why is a scale chosen that fills most of the grid?',
   ['The points are spread out and easier to read',
    'A full grid uses less paper than a small one',
    'The line will then always be perfectly straight',
    'The axes do not have to be labelled at all'],
   'The points are spread out and easier to read',
   'Think about points crowded into one corner.',
   'A scale that fills the grid spreads the points out, so the trend is clear and a value can be read off accurately.'],

  ['g9s-inq-c079', 'recording_data', 2,
   'A pupil tests four gases with a lighted splint and a glowing splint. How should the results be recorded?',
   ['In a table of observations', 'As a line graph of the tests',
    'As a pie chart of the gases', 'In a single sentence of prose'],
   'In a table of observations',
   'The results are descriptions, not numbers.',
   'Qualitative results are set out as a table of observations. A graph needs numbers, and there are none here.'],

  ['g9s-inq-c080', 'recording_data', 3,
   'A reading is clearly out of step with the rest. How is it entered in the table?',
   ['Written in and marked as anomalous',
    'Left out so the pattern stays clear',
    'Replaced by the value expected',
    'Written in with a different unit'],
   'Written in and marked as anomalous',
   'Nothing is ever rubbed out of a results table.',
   'Every reading is recorded. An anomalous one is marked, so that a reader can see it was noticed and left out of the mean.'],

  ['g9s-inq-c081', 'recording_data', 4,
   'A flask of acid and marble chips stands on a balance and loses mass as gas escapes. Which table headings suit the results?',
   ['Time / s and Mass / g', 'Time / s and Volume / g',
    'Mass / s and Time / g', 'Time and Mass, no units'],
   'Time / s and Mass / g',
   'Each heading names the quantity and its own unit.',
   'Time is measured in seconds and mass in grams, so the headings are &ldquo;Time / s&rdquo; and &ldquo;Mass / g&rdquo;. A unit must match the quantity it belongs to.'],

  ['g9s-inq-c082', 'recording_data', 4,
   'A titration gives one rough titre and then three accurate ones. What should the table record?',
   ['Every titre, with the rough one marked',
    'Only the mean of all four of the titres',
    'Only the smallest titre that was measured',
    'Only the three that agree with each other'],
   'Every titre, with the rough one marked',
   'The rough titre is still a reading you took.',
   'All readings are recorded. The rough titre is identified so that a reader can see why it was left out of the mean.'],

  ['g9s-inq-c083', 'recording_data', 3,
   'Why are readings written down as soon as they are taken?',
   ['A remembered number is easily changed',
    'The paper would otherwise be left blank',
    'A reading loses its unit after a minute',
    'The balance forgets its last reading'],
   'A remembered number is easily changed',
   'Memory is not a measuring instrument.',
   'Writing a reading down at once means the value recorded is the one that was actually read, not a number recalled later.'],

  // ── interpreting_results ────────────────────────────────────────────────
  ['g9s-inq-c089', 'interpreting_results', 2,
   'The graph shows the volume of gas given off as marble chips react with acid. When is the reaction fastest?<br>' + RATE_ONE,
   ['At the start, where the line is steepest',
    'At the end, where the line is level',
    'In the middle, halfway through the reaction',
    'It goes at the same speed throughout'],
   'At the start, where the line is steepest',
   'Steeper means more gas in the same time.',
   'The steepest part of the curve is where gas is produced fastest, and that is at the start when the acid is most concentrated.'],

  ['g9s-inq-c090', 'interpreting_results', 2,
   'Why does the line on a gas-volume graph become horizontal at the end?',
   ['One of the reactants has been used up',
    'The gas has escaped through the delivery tube',
    'The acid has become much more concentrated',
    'The marble chips have grown larger in size'],
   'One of the reactants has been used up',
   'No more gas is being made.',
   'A horizontal line means the volume is no longer rising, so the reaction has stopped because one of the reactants has run out.'],

  ['g9s-inq-c091', 'interpreting_results', 3,
   'Two curves are drawn for powdered marble and marble lumps of equal mass. What do they show?<br>' + RATE_TWO,
   ['The powder reacted faster but gave the same gas',
    'The powder gave far more gas than the lumps did',
    'The lumps reacted faster and gave much more gas',
    'Both reacted at the same speed but gave less gas'],
   'The powder reacted faster but gave the same gas',
   'Compare the steepness, then compare the final height.',
   'The steeper curve reacts faster, because powder has more surface area. Both level off at the same volume, because the mass of marble is the same.'],

  ['g9s-inq-c092', 'interpreting_results', 3,
   'One point on a graph lies well off the line. What should be done?',
   ['Draw the line through the other points',
    'Draw the line so it passes through it too',
    'Rub the point out before drawing the line',
    'Join every point with short straight lines'],
   'Draw the line through the other points',
   'The other points share a pattern.',
   'A best-fit line follows the trend of the reliable points. The anomalous point is left on the graph and identified, not erased.'],

  ['g9s-inq-c093', 'interpreting_results', 2,
   'A table shows that magnesium fizzes strongly in acid, zinc fizzes slowly and copper does not react. Which conclusion does it support?',
   ['Magnesium is the most reactive of the three',
    'Copper is the most useful metal of the three',
    'Zinc would react faster than magnesium in air',
    'All three metals react with acid at some speed'],
   'Magnesium is the most reactive of the three',
   'Only say what the observations show.',
   'The strongest fizzing means the fastest reaction with acid, so magnesium is the most reactive. Nothing here measured usefulness or behaviour in air.'],

  ['g9s-inq-c094', 'interpreting_results', 3,
   'Sales of sunglasses and the mass of carbon dioxide released both rose over ten years. What does this show?',
   ['The two rose together, which does not prove a link',
    'Buying sunglasses causes carbon dioxide to be made',
    'Carbon dioxide in the air makes people buy sunglasses',
    'The two have no connection with each other at all'],
   'The two rose together, which does not prove a link',
   'Two things rising together is not the same as one causing the other.',
   'A correlation shows two quantities changing together. Establishing a cause needs a mechanism and further evidence, and there is none here.'],

  ['g9s-inq-c095', 'interpreting_results', 3,
   'Titres of 25.10, 25.20 and 27.60 cm&sup3; are obtained. Which should be used for the mean?',
   ['The first two, because they agree closely',
    'All three, because each one was measured',
    'The last one, because it is the largest of them',
    'The middle one, because it lies between them'],
   'The first two, because they agree closely',
   'Concordant titres agree within about 0.10 cm&sup3;.',
   'Only concordant titres are averaged. 27.60 cm&sup3; is far from the others, so it is recorded as anomalous and left out of the mean.'],

  ['g9s-inq-c096', 'interpreting_results', 3,
   'Gas is collected over water, but the bung is fitted a moment after the acid is added. What is the effect?',
   ['Some gas escapes, so the volume is too small',
    'Some water enters, so the volume is far too big',
    'The reaction stops before the gas is collected',
    'The gas dissolves and the volume stays the same'],
   'Some gas escapes, so the volume is too small',
   'The reaction is fastest at the very beginning.',
   'Gas is produced fastest at the start, so a delay in fitting the bung lets some escape and every reading afterwards is lower than it should be.'],

  ['g9s-inq-c097', 'interpreting_results', 3,
   'What causes a parallax error when a burette is read?',
   ['The eye is not level with the liquid surface',
    'The burette is filled above the zero mark',
    'The tap is left open while the reading is taken',
    'The liquid is coloured and hides the scale'],
   'The eye is not level with the liquid surface',
   'It depends on where your eye is.',
   'Reading from above or below makes the scale appear to line up with the wrong mark. The eye must be level with the bottom of the meniscus.'],

  ['g9s-inq-c098', 'interpreting_results', 2,
   'How is the reliability of a set of results improved?',
   ['By repeating and taking a mean', 'By using a larger sheet of paper',
    'By drawing the graph more neatly', 'By writing the conclusion first'],
   'By repeating and taking a mean',
   'A single reading proves very little.',
   'Repeats show whether readings agree, and a mean of concordant repeats is closer to the true value than any single reading.'],

  ['g9s-inq-c099', 'interpreting_results', 4,
   'Four metals are added to dilute acid. W fizzes strongly, X slowly, Y very slowly and Z not at all. What is the order of reactivity, most reactive first?',
   ['W, X, Y, Z', 'Z, Y, X, W', 'X, W, Z, Y', 'Y, Z, W, X'],
   'W, X, Y, Z',
   'The strongest fizzing is the most reactive.',
   'How vigorously each metal fizzes shows how readily it reacts, so W is the most reactive and Z, which does not react at all, is the least.'],

  ['g9s-inq-c100', 'interpreting_results', 4,
   'Equal volumes of three acids are neutralised by the same alkali. The temperature rises by 5.2, 6.8 and 4.1 &deg;C. Which released the most heat?',
   ['The one that rose by 6.8 &deg;C', 'The one that rose by 5.2 &deg;C',
    'The one that rose by 4.1 &deg;C', 'They all released the same heat'],
   'The one that rose by 6.8 &deg;C',
   'More heat gives a bigger temperature rise.',
   'The same mass of solution is warmed each time, so the largest temperature rise means the most heat was released.'],

  ['g9s-inq-c101', 'interpreting_results', 3,
   'Why does a conclusion refer back to the hypothesis?',
   ['To say whether the results support it',
    'To repeat what the hypothesis said again',
    'To show the hypothesis was written first',
    'To make the conclusion long enough to read'],
   'To say whether the results support it',
   'The hypothesis was the idea being tested.',
   'The whole purpose of the experiment was to test the hypothesis, so the conclusion must say whether the results support it or not.'],

  ['g9s-inq-c102', 'interpreting_results', 2,
   'Which statement is a <b>conclusion</b> rather than an observation?',
   ['Zinc is more reactive than copper',
    'The zinc fizzed and the copper did not',
    'The solution turned from blue to green',
    'A colourless gas came off the zinc'],
   'Zinc is more reactive than copper',
   'Which one explains rather than describes?',
   'The others record what was seen. Saying that zinc is more reactive interprets those observations, which makes it a conclusion.'],

  ['g9s-inq-c103', 'interpreting_results', 4,
   'Bubbles are counted by eye as a gas is given off. Suggest the best improvement.',
   ['Collect the gas in a syringe and read it',
    'Count the bubbles more slowly than before',
    'Ask two pupils to count the same bubbles',
    'Use a larger flask so bubbles are bigger'],
   'Collect the gas in a syringe and read it',
   'Counting fast bubbles by eye is not accurate.',
   'A gas syringe measures the volume directly and does not depend on how fast a person can count, so the readings are far more accurate.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const NUM = [
  ['g9s-inq-c068', 'hypothesis_testing', 3,
   'A pupil repeats a reaction three times. The magnesium disappears after 24 s, 26 s and 25 s. Calculate the mean time in seconds.',
   '25', ['25', '25.0'],
   'Add the three times, then divide by three.',
   '24 + 26 + 25 = 75, and 75 &divide; 3 = 25 s. A mean of repeats reduces the effect of any single poor reading.'],

  ['g9s-inq-c084', 'recording_data', 2,
   'A burette reads 1.20 cm&sup3; before a titration and 26.70 cm&sup3; after it. Calculate the titre in cm&sup3;.',
   '25.50', ['25.50', '25.5'],
   'Subtract the first reading from the second.',
   '26.70 &minus; 1.20 = 25.50 cm&sup3;. The titre is always the difference between the two burette readings, never the final reading on its own.'],

  ['g9s-inq-c085', 'recording_data', 2,
   'An empty crucible has a mass of 24.50 g. With copper oxide in it the mass is 26.90 g. Calculate the mass of copper oxide in g.',
   '2.40', ['2.40', '2.4'],
   'Subtract the mass of the empty crucible.',
   '26.90 &minus; 24.50 = 2.40 g. The solid cannot be weighed on its own, so it is found by difference.'],

  ['g9s-inq-c086', 'recording_data', 3,
   'A flask of acid and marble chips has a mass of 152.60 g at the start and 150.20 g at the end. Calculate the mass of gas lost in g.',
   '2.40', ['2.40', '2.4'],
   'The gas that escaped is the mass that has gone.',
   '152.60 &minus; 150.20 = 2.40 g. The mass lost is the carbon dioxide that escaped from the open flask.'],

  ['g9s-inq-c104', 'interpreting_results', 2,
   'Titres of 25.10, 25.20 and 25.30 cm&sup3; are concordant. Calculate the mean titre in cm&sup3;.',
   '25.20', ['25.20', '25.2'],
   'Add the three titres, then divide by three.',
   '25.10 + 25.20 + 25.30 = 75.60, and 75.60 &divide; 3 = 25.20 cm&sup3;.'],

  ['g9s-inq-c105', 'interpreting_results', 3,
   '60 cm&sup3; of gas is collected in 30 seconds. Calculate the average rate in cm&sup3; per second.',
   '2', ['2', '2.0'],
   'Divide the volume by the time.',
   '60 &divide; 30 = 2 cm&sup3; per second. An average rate is the total change divided by the total time taken.'],

  ['g9s-inq-c106', 'interpreting_results', 3,
   'During a neutralisation the temperature rises from 21.0 &deg;C to 27.5 &deg;C. Calculate the temperature rise in &deg;C.',
   '6.5', ['6.5'],
   'Subtract the starting temperature from the final one.',
   '27.5 &minus; 21.0 = 6.5 &deg;C. Neutralisation is exothermic, so the temperature of the mixture rises.'],
];

NUM.forEach(([id, subsection, difficulty, question, answer, acceptableAnswers, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeNum({ id, chapterId: CH, subsection, difficulty,
    question, answer, acceptableAnswers, hint, explanation }));
});

const SHORT = [
  ['g9s-inq-c013', 'lab_safety', 1,
   'Name the piece of apparatus used to hold a hot evaporating basin.',
   'Tongs', ['a pair of tongs', 'crucible tongs', 'pair of tongs', 'the tongs'],
   'Never with bare hands.',
   'Tongs hold hot apparatus so that hands are never in contact with it.'],

  ['g9s-inq-c014', 'lab_safety', 2,
   'A drop of acid splashes into a pupil&rsquo;s eye. State what must be done immediately.',
   'Wash the eye with plenty of water',
   ['wash the eye with water', 'rinse the eye with water', 'wash it with water',
    'flush the eye with water', 'rinse it with plenty of water',
    'wash the eye with plenty of water'],
   'Dilute and remove it at once, then get help.',
   'The eye is rinsed with plenty of running water straight away and the teacher is told, so that medical help can be arranged.'],

  ['g9s-inq-c015', 'lab_safety', 2,
   'Name the equipment that draws toxic gases safely away from the laboratory.',
   'Fume cupboard', ['a fume cupboard', 'fume hood', 'the fume cupboard', 'fume chamber'],
   'Work with chlorine is done inside it.',
   'A fume cupboard extracts toxic gases so that they are not breathed in.'],

  ['g9s-inq-c029', 'reporting_findings', 2,
   'Name the section of a report that lists the chemicals and equipment used.',
   'Apparatus', ['the apparatus', 'apparatus and materials', 'materials', 'equipment'],
   'It is written before the method.',
   'The apparatus and materials section lists everything used, so the work can be set up again exactly.'],

  ['g9s-inq-c030', 'reporting_findings', 2,
   'Name the section of a report that states what the investigation set out to find.',
   'Aim', ['the aim', 'objective', 'purpose', 'the objective'],
   'It is the first thing written.',
   'The aim states the purpose of the investigation.'],

  ['g9s-inq-c031', 'reporting_findings', 3,
   'Give the word for what you see or measure during an experiment, before any explanation is added.',
   'Observation', ['observations', 'an observation', 'the observation'],
   'It is not yet a conclusion.',
   'An observation is what happened; a conclusion is what it means.'],

  ['g9s-inq-c046', 'research_and_ict', 2,
   'Name the document a chemical supplier provides that lists the hazards of a substance.',
   'Safety data sheet',
   ['sds', 'a safety data sheet', 'material safety data sheet', 'msds',
    'the safety data sheet'],
   'Its initials are SDS.',
   'A safety data sheet gives the hazards, handling, storage and first-aid measures for a substance.'],

  ['g9s-inq-c047', 'research_and_ict', 2,
   'Name the ICT tool used to calculate means and draw graphs from a results table.',
   'Spreadsheet', ['a spreadsheet', 'spreadsheet software', 'excel', 'the spreadsheet'],
   'It works in rows and columns.',
   'A spreadsheet holds data in rows and columns and can calculate from it and plot it.'],

  ['g9s-inq-c048', 'research_and_ict', 3,
   'Give the word for presenting somebody else&rsquo;s writing as your own.',
   'Plagiarism', ['plagiarising', 'plagiarizing', 'copying'],
   'It is avoided by naming the source.',
   'Plagiarism is using another person&rsquo;s work without credit; naming the source avoids it.'],

  ['g9s-inq-c065', 'hypothesis_testing', 2,
   'Name the variable that is deliberately changed in an investigation.',
   'Independent variable',
   ['independent', 'the independent variable', 'input variable', 'independent var'],
   'It is the one you choose.',
   'The independent variable is chosen and changed by the experimenter.'],

  ['g9s-inq-c066', 'hypothesis_testing', 2,
   'Name the variable that is measured to find the effect of the change.',
   'Dependent variable',
   ['dependent', 'the dependent variable', 'outcome variable', 'output variable'],
   'Its value depends on the one you changed.',
   'The dependent variable is measured, and its value depends on the independent variable.'],

  ['g9s-inq-c067', 'hypothesis_testing', 3,
   'Name the experiment set up for comparison, in which the factor being tested is left out.',
   'Control', ['a control', 'control experiment', 'the control', 'controlled experiment'],
   'It shows what happens when nothing is changed.',
   'A control gives a baseline, so any difference in the other tubes can be put down to the factor being tested.'],

  ['g9s-inq-c087', 'recording_data', 2,
   'Name the type of graph drawn when both quantities change continuously.',
   'Line graph', ['a line graph', 'line', 'line-graph', 'the line graph'],
   'The points are joined with a line.',
   'A line graph is used for two continuous quantities, such as volume of gas against time.'],

  ['g9s-inq-c088', 'recording_data', 2,
   'Besides the quantity, what must a results-table column heading carry?',
   'The unit', ['unit', 'units', 'the units', 'its unit'],
   'Time / s carries it after the stroke.',
   'The unit goes in the heading, so that every cell below holds a number only.'],

  ['g9s-inq-c107', 'interpreting_results', 2,
   'Give the word for a result that does not fit the pattern of the others.',
   'Anomalous', ['anomaly', 'an anomaly', 'anomalous result', 'outlier', 'odd one out'],
   'It is recorded and marked, never rubbed out.',
   'An anomalous result is recorded and identified, then left out of the mean.'],

  ['g9s-inq-c108', 'interpreting_results', 3,
   'Give the word describing titres that are close enough in value to be averaged.',
   'Concordant', ['concordant titres', 'concordant results', 'concordant readings'],
   'They agree within about 0.10 cm&sup3;.',
   'Concordant titres agree within about 0.10 cm&sup3; and are the ones averaged; a titre far from the rest is anomalous.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

})();
