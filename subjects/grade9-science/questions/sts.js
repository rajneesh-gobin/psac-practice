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

  ['g9s-sts-005', 'applications_of_distillation', 2,
   'Crude oil is separated into petrol, diesel and other fractions by:',
   ['Fractional distillation', 'Filtration',
    'Chromatography', 'Crystallisation'],
   'Fractional distillation',
   'The fractions have different boiling points.',
   'Fractional distillation separates crude oil into fractions using their different boiling points.'],

  ['g9s-sts-006', 'applications_of_distillation', 2,
   'Which industry in Mauritius uses distillation to produce its product?',
   ['Rum distilleries', 'Textile factories',
    'Cement works', 'Fish canning plants'],
   'Rum distilleries',
   'The name of the industry contains the technique.',
   'Rum distilleries use distillation to concentrate and purify the spirit produced from sugar cane.'],

  ['g9s-sts-007', 'applications_of_distillation', 3,
   'Essential oils are extracted from plants by passing steam through them and then cooling the vapour. Which technique is this?',
   ['Distillation', 'Filtration', 'Chromatography', 'Neutralisation'],
   'Distillation',
   'Something is vaporised and then condensed.',
   'Steam distillation carries the oil off as a vapour, which is then condensed and collected.'],

  ['g9s-sts-008', 'applications_of_distillation', 3,
   'Why is air cooled to a very low temperature before its gases are separated?',
   ['So the gases become liquids that can be distilled apart',
    'So the gases become solids that can be filtered',
    'So the gases react together and form a compound',
    'So the gases dissolve completely in water'],
   'So the gases become liquids that can be distilled apart',
   'Distillation needs liquids to work with.',
   'Cooling liquefies the air, and the liquid is then fractionally distilled to separate nitrogen from oxygen.'],

  ['g9s-sts-009', 'applications_of_chromatography', 2,
   'What is <b>chromatography</b> used for?',
   ['Separating and identifying the substances in a mixture',
    'Measuring the temperature of a slow reaction',
    'Increasing the speed of a reaction',
    'Turning a solid directly into a gas'],
   'Separating and identifying the substances in a mixture',
   'The result is a set of separated spots.',
   'Chromatography separates the components of a mixture so they can be identified and compared.'],

  ['g9s-sts-010', 'applications_of_chromatography', 3,
   'How is chromatography used in sport?',
   ['To detect banned drugs in an athlete&rsquo;s sample',
    'To measure how fast an athlete can run',
    'To decide which athlete has trained hardest',
    'To check the temperature of the track'],
   'To detect banned drugs in an athlete&rsquo;s sample',
   'It identifies substances that should not be present.',
   'A sample is separated by chromatography and compared with known drugs to detect banned substances.'],

  ['g9s-sts-011', 'applications_of_chromatography', 3,
   'How is chromatography used to check food?',
   ['To detect pesticide residues and unlawful additives',
    'To measure how much the food weighs',
    'To decide how the food should be cooked',
    'To find out how long the food will keep fresh'],
   'To detect pesticide residues and unlawful additives',
   'It finds substances that should not be there.',
   'Chromatography separates a food extract so that contaminants and additives can be identified.'],

  ['g9s-sts-012', 'applications_of_chromatography', 3,
   'A pure substance is tested by chromatography. What result is expected?',
   ['A single spot, because there is only one substance',
    'Several spots, one for each of the impurities',
    'No spot at all, because it is pure',
    'A continuous line rather than a spot'],
   'A single spot, because there is only one substance',
   'Each substance gives one spot.',
   'A pure substance separates into one spot; more than one spot means the sample is a mixture.'],

  ['g9s-sts-013', 'climate_change', 2,
   'What is meant by <b>climate change</b>?',
   ['A long-term change in the usual weather patterns of the Earth',
    'The change from day to night each 24 hours',
    'The difference in the weather between two nearby towns',
    'A single storm that causes serious damage'],
   'A long-term change in the usual weather patterns of the Earth',
   'Climate is weather averaged over a long time.',
   'Climate change is a lasting shift in average weather patterns, not a single event or a daily variation.'],

  ['g9s-sts-014', 'climate_change', 2,
   'Which human activity contributes most to climate change?',
   ['Burning fossil fuels for energy and transport',
    'Planting more trees along the roadside',
    'Using bicycles instead of cars',
    'Recycling paper and glass at home'],
   'Burning fossil fuels for energy and transport',
   'Which one releases carbon dioxide?',
   'Burning coal, oil and gas releases the carbon dioxide that drives the enhanced greenhouse effect.'],

  ['g9s-sts-015', 'climate_change', 3,
   'Which hazard is a small island state such as Mauritius especially exposed to?',
   ['Coastal flooding as sea levels rise',
    'The loss of all its underground caves',
    'A permanent fall in air temperature',
    'The disappearance of its rivers overnight'],
   'Coastal flooding as sea levels rise',
   'Think about where an island meets the sea.',
   'With most of its people and infrastructure near the coast, a rising sea threatens flooding and erosion.'],

  ['g9s-sts-016', 'climate_change', 3,
   'Which measure would reduce a country&rsquo;s contribution to climate change?',
   ['Generating more electricity from wind and solar',
    'Building more coal-fired power stations',
    'Encouraging every household to use two cars',
    'Clearing forest to create more farmland'],
   'Generating more electricity from wind and solar',
   'Reduce the carbon dioxide released.',
   'Renewable generation displaces fossil fuels and so cuts carbon dioxide emissions.'],

  ['g9s-sts-017', 'interpreting_climate_data', 2,
   'The graph shows carbon dioxide and global temperature since 1960. What does it show?<br>' + CLIMATE,
   ['Both have risen over the period',
    'Both have fallen over the period',
    'Carbon dioxide has risen while temperature has fallen',
    'Neither has changed over the period'],
   'Both have risen over the period',
   'Follow each line from left to right.',
   'Both lines rise from left to right, so carbon dioxide and temperature have increased together.'],

  ['g9s-sts-018', 'interpreting_climate_data', 3,
   'The two lines on that graph rise together. What can be concluded from the graph <b>alone</b>?',
   ['The two are correlated, but the graph alone does not prove cause',
    'Carbon dioxide definitely causes the temperature rise',
    'The temperature rise definitely causes the carbon dioxide rise',
    'The two quantities have nothing to do with each other'],
   'The two are correlated, but the graph alone does not prove cause',
   'Two things rising together is not the same as one causing the other.',
   'The graph establishes a correlation; showing cause needs the physics of how the gas traps heat, not just the two lines.'],

  ['g9s-sts-019', 'interpreting_climate_data', 3,
   'Why do scientists use measurements taken over many decades rather than a few years?',
   ['Short periods vary too much to show a long-term trend',
    'Old measurements are always more accurate',
    'A few years of data cannot be plotted on a graph',
    'Long records are quicker to collect than short ones'],
   'Short periods vary too much to show a long-term trend',
   'Climate is an average over a long time.',
   'Year-to-year variation is large, so only a long record separates a genuine trend from ordinary fluctuation.'],

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

  ['g9s-sts-026', 'optical_fibres', 1,
   'What travels along an optical fibre?',
   ['Light', 'Electricity', 'Water', 'Sound waves'], 'Light',
   'The clue is in the word optical.',
   'An optical fibre carries information as pulses of light.'],

  ['g9s-sts-027', 'optical_fibres', 2,
   'How are optical fibres used in medicine?',
   ['In an endoscope, to see inside the body without major surgery',
    'To measure a patient&rsquo;s temperature from a distance',
    'To replace the bones that have been broken',
    'To carry blood from one part of the body to another'],
   'In an endoscope, to see inside the body without major surgery',
   'They carry an image out of a narrow space.',
   'An endoscope uses optical fibres to light the inside of the body and carry an image back to the doctor.'],

  ['g9s-sts-028', 'optical_fibres', 3,
   'What is the main advantage of optical fibres over copper wires for communication?',
   ['They carry far more information and lose less of the signal',
    'They are much heavier and so much harder to damage',
    'They need no equipment at either end',
    'They work only over very short distances'],
   'They carry far more information and lose less of the signal',
   'Think about capacity and about signal loss.',
   'Fibres carry much more data with less loss and no electrical interference, which is why they carry long-distance traffic.'],

  ['g9s-sts-029', 'optical_fibres', 3,
   'Why is an island such as Mauritius connected to the rest of the world by undersea optical fibre cables?',
   ['They carry internet traffic across the ocean at high capacity',
    'They supply the island with its electricity',
    'They anchor the island against the strongest currents',
    'They carry fresh water from the mainland'],
   'They carry internet traffic across the ocean at high capacity',
   'Think about what a fibre carries.',
   'Undersea fibre cables carry the island&rsquo;s internet and telephone traffic to other continents.'],
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
  ['g9s-sts-031', 'applications_of_distillation', 2,
   'Name the technique used to separate crude oil into petrol, diesel and other fractions.',
   'Fractional distillation', ['distillation', 'fractional-distillation'],
   'The fractions have different boiling points.',
   'Fractional distillation separates crude oil into its fractions.'],
  ['g9s-sts-032', 'applications_of_chromatography', 2,
   'Name the technique used to detect banned drugs in an athlete&rsquo;s sample.',
   'Chromatography', ['chromatograph', 'paper chromatography'],
   'It separates a mixture into spots.',
   'Chromatography separates the sample so banned substances can be identified.'],
  ['g9s-sts-033', 'optical_fibres', 1,
   'State what travels along an optical fibre.',
   'Light', ['light pulses', 'pulses of light'],
   'The clue is in the word optical.',
   'Information travels along an optical fibre as pulses of light.'],
  ['g9s-sts-034', 'optical_fibres', 2,
   'Name the medical instrument that uses optical fibres to see inside the body.',
   'Endoscope', ['an endoscope', 'endoscopy'],
   'One word.', 'An endoscope uses optical fibres to look inside the body.'],
  ['g9s-sts-035', 'climate_change', 2,
   'State one hazard that climate change brings to a small island state.',
   'Coastal flooding',
   ['sea level rise', 'rising sea levels', 'flooding', 'coastal erosion',
    'stronger cyclones', 'coral bleaching', 'drought'],
   'Think about where an island meets the sea.',
   'Rising seas bring coastal flooding and erosion, and warming brings stronger storms and coral bleaching.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

})();
