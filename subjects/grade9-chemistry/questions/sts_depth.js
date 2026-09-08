'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Chemistry - Science, Technology & Society, depth pass
//
//  ⚠ CHROMATOGRAPHY IS A SYLLABUS OUTCOME HERE, NOT IN C2. syllabus-science.md
//    is explicit: at Grade 9 chromatography appears only under STS, as an
//    application, while C2 carries crystallisation, sublimation and
//    distillation. So the technique's practical detail - pencil baseline,
//    solvent front, reading a chromatogram against knowns - lives in this file
//    and must not be duplicated into c2_mixtures.js.
//
//  ⚠ CORRELATION IS NOT CAUSE, and that distinction is the mark in
//    `interpreting_climate_data`. Two quantities rising together is a
//    correlation; saying which causes which needs the mechanism as well.
//
//  ⚠ IDS CARRY A `c` BLOCK (g9s-sts-c001…). The shared 001-035 block is split
//    across biology / chemistry / physics and those packs are being filled out
//    in parallel; a bare numeric continuation would collide silently and the
//    importer keys on ids.
//
//  ⚠ <i> IS AN HTML BREAKOUT TAG AND MUST NEVER APPEAR INSIDE AN <svg>.
//
//  Source: NCE Chemistry 2021-2025 (chromatogram items: 2023 Q4(a)-(b),
//  2021 Q2(b)); NCF Grades 7-9 §Science, Technology and Society.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-sts';

// ── A chromatogram: an unknown colouring run beside three known dyes. The
//    unknown lane carries two spots, each level with one of the knowns, which
//    is exactly the reading the 2023 paper asks for.
const chromatogram = () => {
  const L = 34, R = 224, TOP = 26, BOT = 144, BASE = 132, FRONT = 36;
  const lanes = [['X', 70, [94, 64]], ['A', 110, [94]], ['B', 150, [64]], ['C', 190, [112]]];
  let g = '<svg viewBox="0 0 250 172" width="270" role="img" '
    + 'aria-label="a chromatogram of an unknown colouring beside three known dyes">';
  g += '<rect x="' + L + '" y="' + TOP + '" width="' + (R - L) + '" height="' + (BOT - TOP)
    + '" fill="#fffbeb" stroke="#0f172a" stroke-width="1.5"/>';
  g += '<line x1="' + L + '" y1="' + FRONT + '" x2="' + R + '" y2="' + FRONT
    + '" stroke="#0f172a" stroke-width="1" stroke-dasharray="5 3"/>';
  g += '<line x1="' + L + '" y1="' + BASE + '" x2="' + R + '" y2="' + BASE
    + '" stroke="#475569" stroke-width="1.2"/>';
  lanes.forEach(([name, x, spots]) => {
    spots.forEach(y => {
      g += '<ellipse cx="' + x + '" cy="' + y + '" rx="9" ry="6" fill="#7c3aed" opacity="0.75"/>';
    });
    g += '<text x="' + x + '" y="' + (BASE + 10) + '" font-size="9" text-anchor="middle" fill="#0f172a">' + name + '</text>';
  });
  g += '<text x="128" y="21" font-size="8" text-anchor="middle" fill="#334155">solvent front</text>';
  g += '<text x="128" y="160" font-size="8" text-anchor="middle" fill="#334155">start line drawn in pencil</text>';
  return g + '</svg>';
};

// ── Carbon dioxide in the atmosphere, measured values in parts per million.
//    Real figures, not illustrative ones: a table a child does arithmetic on
//    should be a table of what was actually measured.
const co2Table = () => {
  const rows = [['1960', '317'], ['1980', '339'], ['2000', '369'], ['2010', '389'], ['2020', '414']];
  const W = 250, X0 = 40, RH = 19, top = 24, c1 = X0 + 70;
  const H = top + RH * (rows.length + 1) + 10;
  let g = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="260" role="img" '
    + 'aria-label="a table of carbon dioxide readings by year">';
  g += '<text x="125" y="15" font-size="10" text-anchor="middle" fill="#0f172a">Carbon dioxide in the air</text>';
  g += '<rect x="' + X0 + '" y="' + top + '" width="' + (W - 2 * X0) + '" height="' + (RH * (rows.length + 1))
    + '" fill="none" stroke="#0f172a" stroke-width="1.5"/>';
  g += '<line x1="' + c1 + '" y1="' + top + '" x2="' + c1 + '" y2="' + (top + RH * (rows.length + 1)) + '" stroke="#0f172a" stroke-width="1.5"/>';
  g += '<line x1="' + X0 + '" y1="' + (top + RH) + '" x2="' + (W - X0) + '" y2="' + (top + RH) + '" stroke="#0f172a" stroke-width="1.5"/>';
  g += '<text x="' + (X0 + 5) + '" y="' + (top + 13) + '" font-size="9" fill="#0f172a">Year</text>';
  g += '<text x="' + (c1 + 5) + '" y="' + (top + 13) + '" font-size="9" fill="#0f172a">Carbon dioxide / ppm</text>';
  rows.forEach((r, i) => {
    const y = top + RH * (i + 1);
    if (i) g += '<line x1="' + X0 + '" y1="' + y + '" x2="' + (W - X0) + '" y2="' + y + '" stroke="#cbd5e1" stroke-width="1"/>';
    g += '<text x="' + (X0 + 5) + '" y="' + (y + 13) + '" font-size="9" fill="#334155">' + r[0] + '</text>';
    g += '<text x="' + (c1 + 5) + '" y="' + (y + 13) + '" font-size="9" fill="#334155">' + r[1] + '</text>';
  });
  return g + '</svg>';
};

// ── Where one country's carbon dioxide comes from, as percentages.
const emissionBars = () => {
  const bars = [['Electricity', 40], ['Transport', 25], ['Industry', 20], ['Homes', 15]];
  const X0 = 40, Y0 = 126, Y1 = 26, BW = 32;
  const sy = v => Y0 - (v / 50) * (Y0 - Y1);
  let g = '<svg viewBox="0 0 250 156" width="270" role="img" '
    + 'aria-label="a bar chart of carbon dioxide sources">';
  g += '<text x="125" y="16" font-size="9" text-anchor="middle" fill="#0f172a">Where the carbon dioxide comes from</text>';
  g += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="234" y2="' + Y0 + '" stroke="#0f172a" stroke-width="2"/>';
  g += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X0 + '" y2="' + Y1 + '" stroke="#0f172a" stroke-width="2"/>';
  [0, 10, 20, 30, 40, 50].forEach(v => {
    const y = sy(v);
    g += '<line x1="' + (X0 - 4) + '" y1="' + y + '" x2="' + X0 + '" y2="' + y + '" stroke="#0f172a" stroke-width="1"/>';
    g += '<text x="' + (X0 - 7) + '" y="' + (y + 3) + '" font-size="8" text-anchor="end" fill="#334155">' + v + '</text>';
  });
  bars.forEach(([name, v], i) => {
    const x = 52 + i * 44;
    g += '<rect x="' + x + '" y="' + sy(v) + '" width="' + BW + '" height="' + (Y0 - sy(v))
      + '" fill="#0ea5e9" stroke="#0f172a" stroke-width="1"/>';
    g += '<text x="' + (x + BW / 2) + '" y="' + (Y0 + 12) + '" font-size="8" text-anchor="middle" fill="#334155">' + name + '</text>';
  });
  g += '<text x="12" y="76" font-size="8" text-anchor="middle" fill="#334155" transform="rotate(-90 12 76)">Percentage of the total</text>';
  return g + '</svg>';
};

const CHROMA = chromatogram();
const CO2 = co2Table();
const BARS = emissionBars();

const MCQ = [
  // ── applications_of_distillation ────────────────────────────────────────
  ['g9s-sts-c001', 'applications_of_distillation', 2,
   'In a fractionating column, where are the fractions with the highest boiling points collected?',
   ['At the bottom, where it is hottest',
    'At the very top, where it is coolest',
    'In the middle of the column',
    'Outside the column altogether'],
   'At the bottom, where it is hottest',
   'A high boiling point means it condenses first.',
   'The column is hottest at the bottom, so fractions with the highest boiling points condense there. The lightest fractions rise to the cool top.'],

  ['g9s-sts-c002', 'applications_of_distillation', 2,
   'Which fraction of crude oil is used as the fuel in a car engine?',
   ['Petrol', 'Bitumen', 'Kerosene', 'Candle wax'],
   'Petrol',
   'It is the lightest of these.',
   'Petrol is a light fraction used in car engines. Kerosene fuels aircraft and bitumen surfaces roads.'],

  ['g9s-sts-c003', 'applications_of_distillation', 3,
   'Why can crude oil be separated by fractional distillation?',
   ['Its parts have different boiling points',
    'Its parts have different colours entirely',
    'Its parts have exactly the same density',
    'Its parts react with each other on heating'],
   'Its parts have different boiling points',
   'Something has to differ between the parts.',
   'Distillation separates liquids whose boiling points differ, so each fraction condenses at a different height in the column.'],

  ['g9s-sts-c004', 'applications_of_distillation', 2,
   'Which two gases are obtained on a large scale by distilling liquid air?',
   ['Nitrogen and oxygen', 'Hydrogen and helium',
    'Methane and ethane', 'Chlorine and fluorine'],
   'Nitrogen and oxygen',
   'They are the two main gases in air.',
   'Air is cooled until it liquefies and then fractionally distilled: nitrogen boils off first, leaving oxygen behind.'],

  ['g9s-sts-c005', 'applications_of_distillation', 3,
   'What is the oxygen from an air distillation plant mainly used for in a hospital?',
   ['Helping patients who cannot breathe well',
    'Keeping the operating theatre very cool',
    'Cleaning the instruments before surgery',
    'Lighting the lamps above the operating table'],
   'Helping patients who cannot breathe well',
   'Think about a patient with lung trouble.',
   'Medical oxygen supports patients whose lungs cannot take in enough of it from the air.'],

  ['g9s-sts-c006', 'applications_of_distillation', 2,
   'Why is nitrogen from liquid air sealed inside packets of crisps?',
   ['It is unreactive, so the food keeps longer',
    'It is cheaper than the air outside a packet',
    'It gives the crisps their salty flavour',
    'It makes the packet float in a shop'],
   'It is unreactive, so the food keeps longer',
   'What in ordinary air makes food go stale?',
   'Nitrogen is unreactive, so it keeps oxygen away from the food and the fat does not turn rancid.'],

  ['g9s-sts-c007', 'applications_of_distillation', 3,
   'Essential oils are obtained from plants by steam distillation. What happens in the condenser?',
   ['The vapour is cooled back into a liquid',
    'The vapour is heated further into a gas',
    'The liquid is filtered to remove the leaves',
    'The liquid reacts with the steam to form oil'],
   'The vapour is cooled back into a liquid',
   'A condenser does what its name says.',
   'Steam carries the oil over as a vapour; the condenser cools it back to a liquid, which is then separated from the water.'],

  ['g9s-sts-c008', 'applications_of_distillation', 2,
   'What is distillation used for in a rum distillery?',
   ['To concentrate and purify the alcohol',
    'To ferment the cane juice into alcohol',
    'To dissolve the sugar out of the cane',
    'To colour the spirit before it is sold'],
   'To concentrate and purify the alcohol',
   'Fermentation happens before this step.',
   'Fermentation produces a dilute alcohol; distillation then separates and concentrates it, because alcohol boils below water.'],

  ['g9s-sts-c009', 'applications_of_distillation', 3,
   'How is drinking water obtained from seawater by distillation?',
   ['The water is boiled off and the salt stays',
    'The salt is boiled off and the water stays',
    'Both boil off together and are then cooled',
    'The salt dissolves and the water evaporates'],
   'The water is boiled off and the salt stays',
   'Which of the two has a boiling point you can reach?',
   'Water boils and is condensed as pure water. The salt is not volatile, so it is left behind in the flask.'],

  ['g9s-sts-c010', 'applications_of_distillation', 3,
   'Why is distillation an expensive way to purify water?',
   ['A great deal of energy is needed to boil it',
    'The apparatus has to be replaced every day',
    'Salt must be bought to add to the seawater',
    'The water has to be filtered many times first'],
   'A great deal of energy is needed to boil it',
   'Think about the heating.',
   'Boiling water needs a large amount of energy, which is why distillation is used mainly where fresh water is genuinely scarce.'],

  ['g9s-sts-c011', 'applications_of_distillation', 2,
   'Why is distilled water used in a car battery rather than tap water?',
   ['It contains no dissolved salts',
    'It is much colder than tap water',
    'It boils at a much lower point',
    'It carries a charge of its own'],
   'It contains no dissolved salts',
   'Tap water is not pure.',
   'Distilled water has had its dissolved salts removed, so it does not react with or damage the plates of the battery.'],

  ['g9s-sts-c012', 'applications_of_distillation', 4,
   'A mixture of ethanol and water is distilled. Ethanol boils at 78 &deg;C and water at 100 &deg;C. What is collected first?',
   ['Ethanol, because it boils at the lower temperature',
    'Water, because it boils at the higher temperature',
    'Both together, because they mix in all proportions',
    'Neither, because the mixture cannot be separated'],
   'Ethanol, because it boils at the lower temperature',
   'The lower boiling point vaporises first.',
   'The liquid with the lower boiling point vaporises first, so ethanol distils over at about 78 &deg;C, before the water.'],

  // ── applications_of_chromatography ──────────────────────────────────────
  ['g9s-sts-c016', 'applications_of_chromatography', 2,
   'Why is the starting line on a chromatogram drawn in pencil?',
   ['Pencil does not dissolve in the solvent',
    'Pencil is easier to see than ink is',
    'Pencil dries much faster than ink does',
    'Pencil marks can be rubbed out afterwards'],
   'Pencil does not dissolve in the solvent',
   'What would happen to a line drawn in ink?',
   'Ink would dissolve and travel up the paper, adding spots of its own. Pencil is insoluble and stays where it was drawn.'],

  ['g9s-sts-c017', 'applications_of_chromatography', 3,
   'Why must the solvent level start below the pencil line?',
   ['The spots would dissolve into the solvent',
    'The paper would not absorb the solvent',
    'The solvent would evaporate far too fast',
    'The line would be washed off the paper first'],
   'The spots would dissolve into the solvent',
   'Think about a spot sitting in the liquid.',
   'If the line is below the solvent, the spots dissolve into the liquid in the beaker instead of travelling up the paper.'],

  ['g9s-sts-c018', 'applications_of_chromatography', 2,
   'The chromatogram shows a food colouring X beside three known dyes. How many dyes are in X?<br>' + CHROMA,
   ['Two', 'One', 'Three', 'Four'],
   'Two',
   'Count the separate spots in that lane.',
   'Each spot is one substance, so a lane carrying two spots means the colouring is a mixture of two dyes.'],

  ['g9s-sts-c019', 'applications_of_chromatography', 3,
   'On a chromatogram, how is one of the dyes in an unknown identified?<br>' + CHROMA,
   ['Its spot rises to the same height as a known one',
    'Its spot is the darkest of all the spots shown',
    'Its spot is nearest to the pencil line at the base',
    'Its spot is the last one to appear on the paper'],
   'Its spot rises to the same height as a known one',
   'Compare each lane with the known ones beside it.',
   'A substance travels the same distance under the same conditions, so a spot level with a known dye identifies it.'],

  ['g9s-sts-c020', 'applications_of_chromatography', 2,
   'A sample gives a single spot on a chromatogram. What does that show?',
   ['The sample is a pure substance',
    'The sample contains two dyes',
    'The sample did not dissolve at all',
    'The solvent was the wrong one'],
   'The sample is a pure substance',
   'One substance gives one spot.',
   'A single spot means only one substance is present, so the sample is pure. A mixture separates into two or more spots.'],

  ['g9s-sts-c021', 'applications_of_chromatography', 3,
   'How is chromatography used to test an athlete for banned drugs?',
   ['The sample is compared with known drug spots',
    'The sample is weighed against a known mass',
    'The sample is heated until the drug burns off',
    'The sample is timed as it runs up the paper'],
   'The sample is compared with known drug spots',
   'A known reference is run alongside it.',
   'The sample is separated and each spot compared with reference samples of the banned substances. A matching spot shows the drug is present.'],

  ['g9s-sts-c022', 'applications_of_chromatography', 3,
   'How does chromatography help check food for pesticide residues?',
   ['It separates the extract so residues show up',
    'It destroys any pesticide that is present',
    'It measures how much the food itself weighs',
    'It shows how long the food will stay fresh'],
   'It separates the extract so residues show up',
   'Residues are present in tiny amounts inside a mixture.',
   'An extract of the food is separated so that traces of pesticide appear as spots of their own and can be identified.'],

  ['g9s-sts-c023', 'applications_of_chromatography', 2,
   'Which industry uses chromatography to check that a medicine is pure?',
   ['The pharmaceutical industry', 'The construction industry',
    'The textile industry', 'The shipping industry'],
   'The pharmaceutical industry',
   'It is the industry that makes medicines.',
   'Medicine manufacturers use chromatography to show that a batch contains the drug itself and no unwanted extra substances.'],

  ['g9s-sts-c024', 'applications_of_chromatography', 3,
   'How is chromatography used by a forensic scientist?',
   ['To compare ink from a note with known pens',
    'To measure the mass of the note that was left',
    'To find out when the note was actually written',
    'To read writing that has been rubbed out'],
   'To compare ink from a note with known pens',
   'Inks are mixtures of dyes.',
   'Ink is a mixture of dyes, so its chromatogram acts like a fingerprint and can be matched to a particular pen.'],

  ['g9s-sts-c025', 'applications_of_chromatography', 2,
   'What is the solvent front on a chromatogram?',
   ['The furthest the solvent has travelled',
    'The line on which the spots were placed',
    'The edge of the paper nearest the beaker',
    'The point at which two spots overlap'],
   'The furthest the solvent has travelled',
   'It is marked as soon as the paper is taken out.',
   'The solvent front is the highest level the solvent reached. Distances are measured from the pencil line up to it.'],

  ['g9s-sts-c026', 'applications_of_chromatography', 4,
   'A drink is tested and gives a spot level with a dye that is banned in food. What can be concluded?',
   ['The drink contains that banned dye',
    'The drink contains only that one dye',
    'The drink has no colouring in it at all',
    'The drink is safe because it was tested'],
   'The drink contains that banned dye',
   'A matching spot identifies a substance.',
   'A spot at the same height as a known dye identifies it. It does not show that nothing else is present, and testing alone does not make a drink safe.'],

  ['g9s-sts-c027', 'applications_of_chromatography', 4,
   'Two dyes in a mixture do not separate on the paper. What should be tried next?',
   ['A different solvent for the same mixture',
    'A shorter piece of paper than before',
    'A smaller spot of the same mixture',
    'A cooler place to stand the beaker in'],
   'A different solvent for the same mixture',
   'How far a dye travels depends on the liquid.',
   'Different solvents carry dyes different distances, so changing the solvent is the usual way to separate substances that ran together.'],

  // ── climate_change ──────────────────────────────────────────────────────
  ['g9s-sts-c031', 'climate_change', 2,
   'Which gas released by burning fossil fuels contributes most to the greenhouse effect?',
   ['Carbon dioxide', 'Sulfur dioxide', 'Carbon monoxide', 'Nitrogen dioxide'],
   'Carbon dioxide',
   'It is the product of burning carbon completely.',
   'Carbon dioxide is released in enormous quantities when fossil fuels burn and is the main greenhouse gas from human activity.'],

  ['g9s-sts-c032', 'climate_change', 2,
   'Which greenhouse gas comes mainly from cattle and from flooded rice fields?',
   ['Methane', 'Ozone', 'Krypton', 'Hydrogen'],
   'Methane',
   'It is the main gas in natural gas.',
   'Methane is produced by cattle and by flooded rice fields, and traps far more heat per molecule than carbon dioxide does.'],

  ['g9s-sts-c033', 'climate_change', 3,
   'How does cutting down a forest add to global warming?',
   ['Fewer trees remove carbon dioxide from the air',
    'Fewer trees means the soil becomes much colder',
    'Fewer trees allow more oxygen to reach the sea',
    'Fewer trees make the wind blow much harder'],
   'Fewer trees remove carbon dioxide from the air',
   'What do trees do with carbon dioxide?',
   'Trees absorb carbon dioxide as they photosynthesise. Removing them leaves more of it in the atmosphere, and burning them releases still more.'],

  ['g9s-sts-c034', 'climate_change', 3,
   'Carbon dioxide dissolves in seawater. What is the chemical effect on the ocean?',
   ['It becomes more acidic', 'It becomes more alkaline',
    'It becomes much saltier', 'It becomes far less dense'],
   'It becomes more acidic',
   'What does a dissolved acidic gas do to pH?',
   'Carbon dioxide dissolves to form carbonic acid, lowering the pH. This ocean acidification makes it harder for corals and shellfish to build their shells.'],

  ['g9s-sts-c035', 'climate_change', 2,
   'Which of these is a renewable source of electricity?',
   ['Solar panels', 'Coal furnaces', 'Diesel engines', 'Gas turbines'],
   'Solar panels',
   'Which one does not run out?',
   'Sunlight is renewable and releases no carbon dioxide in use. Coal, diesel and natural gas are all fossil fuels.'],

  ['g9s-sts-c036', 'climate_change', 3,
   'Why does bagasse count as a better fuel than coal for the climate?',
   ['The cane regrows and takes the gas back in',
    'Bagasse gives out no heat when it is burned',
    'Bagasse contains no carbon of any kind at all',
    'Bagasse burns without needing any oxygen'],
   'The cane regrows and takes the gas back in',
   'The crop is grown again each year.',
   'Sugar cane absorbs carbon dioxide as it grows, so burning the bagasse returns carbon taken from the air only months earlier. Coal releases carbon stored for millions of years.'],

  ['g9s-sts-c037', 'climate_change', 2,
   'How does using an electric bus instead of a diesel bus help a town?',
   ['No exhaust gases are given off in the town',
    'No electricity is needed to run the vehicle',
    'No metal is needed to build the vehicle',
    'No passengers have to pay for the journey'],
   'No exhaust gases are given off in the town',
   'Think about what comes out of the exhaust pipe.',
   'An electric bus releases no exhaust gases where it runs. How clean it is overall still depends on how the electricity was generated.'],

  ['g9s-sts-c038', 'climate_change', 3,
   'What is meant by carbon capture and storage?',
   ['Carbon dioxide is trapped and stored underground',
    'Carbon dioxide is burned to make it harmless',
    'Carbon dioxide is released high in the atmosphere',
    'Carbon dioxide is turned into oxygen by a machine'],
   'Carbon dioxide is trapped and stored underground',
   'It is taken out before it ever reaches the air.',
   'The gas is captured at the power station and stored in rock deep underground, so that it does not enter the atmosphere at all.'],

  ['g9s-sts-c039', 'climate_change', 3,
   'Which hazard of a warming climate most threatens a coral reef?',
   ['Warmer seawater causes bleaching',
    'Warmer seawater makes it grow faster',
    'Warmer seawater becomes far less salty',
    'Warmer seawater becomes much clearer'],
   'Warmer seawater causes bleaching',
   'Corals lose the algae that live inside them.',
   'When the sea warms, corals expel the algae that feed them and turn white. A bleached reef can die, taking its fish with it.'],

  ['g9s-sts-c040', 'climate_change', 3,
   'Why does a rising sea level threaten Mauritius more than a large inland country?',
   ['Most of its towns and roads are on the coast',
    'Its land is entirely below the level of the sea',
    'It has no rivers to carry the extra water away',
    'It receives far less rain than a large country'],
   'Most of its towns and roads are on the coast',
   'Think about where the people actually live.',
   'An island has a long coastline, and most of its people, roads and hotels sit close to the sea, so flooding and erosion reach them first.'],

  ['g9s-sts-c041', 'climate_change', 4,
   'A family wants to cut its carbon footprint. Which change does most?',
   ['Fitting a solar water heater on the roof',
    'Leaving the lights on only at night time',
    'Buying bottled water instead of tap water',
    'Washing the car with a hose every weekend'],
   'Fitting a solar water heater on the roof',
   'Which one replaces a fuel with sunlight?',
   'A solar heater replaces electricity or gas with sunlight for a large daily energy demand. The other three save nothing, or use more.'],

  ['g9s-sts-c042', 'climate_change', 4,
   'A country replaces a coal power station with a wind farm. What is the main effect?',
   ['Less carbon dioxide is released each year',
    'More carbon dioxide is released each year',
    'The same carbon dioxide is released as before',
    'No electricity can be generated at any time'],
   'Less carbon dioxide is released each year',
   'Which of the two burns a fuel?',
   'A wind farm burns nothing, so replacing coal generation cuts the carbon dioxide released, although the output varies with the wind.'],

  // ── interpreting_climate_data ───────────────────────────────────────────
  ['g9s-sts-c046', 'interpreting_climate_data', 2,
   'The table shows the carbon dioxide in the air. What does it show between 1960 and 2020?<br>' + CO2,
   ['A steady rise in every reading',
    'A steady fall in every reading',
    'No change over the whole period',
    'A rise and then a fall again'],
   'A steady rise in every reading',
   'Read the second column downwards.',
   'Each value is larger than the one above it, so the concentration has risen throughout the period.'],

  ['g9s-sts-c047', 'interpreting_climate_data', 3,
   'Using the table, between which two readings is the increase the largest?<br>' + CO2,
   ['1980 to 2000', '1960 to 1980', '2000 to 2010', '2010 to 2020'],
   '1980 to 2000',
   'Work out each difference in turn.',
   'The differences are 22, 30, 20 and 25 ppm, so the largest rise was the 30 ppm between 1980 and 2000.'],

  ['g9s-sts-c048', 'interpreting_climate_data', 2,
   'What does <b>ppm</b> mean when carbon dioxide in the air is measured?',
   ['Parts per million', 'Parts per minute',
    'Pressure per metre', 'Percent per month'],
   'Parts per million',
   'It is a way of writing a very small proportion.',
   'ppm means parts per million: 414 ppm is 414 molecules of carbon dioxide in every million molecules of air.'],

  ['g9s-sts-c049', 'interpreting_climate_data', 3,
   'A pupil says a graph of temperature and carbon dioxide proves that the gas caused the warming. What is wrong with that?',
   ['A graph shows a link, not what caused it',
    'A graph cannot show two lines at one time',
    'The two lines are measured in the same unit',
    'Temperature cannot be plotted against a year'],
   'A graph shows a link, not what caused it',
   'Two lines rising together - what does that alone tell you?',
   'The graph shows a correlation. Cause is established by the physics of how carbon dioxide traps heat, together with other evidence, not by the shape of two lines.'],

  ['g9s-sts-c050', 'interpreting_climate_data', 3,
   'Why are climate records averaged over thirty years?',
   ['One cold year does not mean the trend has ended',
    'Thirty years of data is quicker to collect',
    'Older readings are always more accurate',
    'A shorter record cannot be drawn on a graph at all'],
   'One cold year does not mean the trend has ended',
   'Weather varies a great deal from year to year.',
   'Climate is weather averaged over decades. A single cool year is ordinary variation and says nothing about the long-term trend.'],

  ['g9s-sts-c051', 'interpreting_climate_data', 2,
   'The bar chart shows where a country&rsquo;s carbon dioxide comes from. Which source releases the most?<br>' + BARS,
   ['Electricity', 'Transport', 'Industry', 'Homes'],
   'Electricity',
   'Find the tallest bar.',
   'The tallest bar is electricity generation, so that is the largest single source in this country.'],

  ['g9s-sts-c052', 'interpreting_climate_data', 3,
   'Using that bar chart, which two sources together release more than half the total?<br>' + BARS,
   ['Electricity and transport', 'Industry and homes',
    'Transport and homes', 'Industry and transport'],
   'Electricity and transport',
   'Add each pair and compare it with the whole.',
   'Electricity (40) and transport (25) total 65 out of 100, which is more than half. No other pair reaches that.'],

  ['g9s-sts-c053', 'interpreting_climate_data', 3,
   'A country cut its emissions but the world total still rose. What does that show?',
   ['Other countries increased theirs by more',
    'The country did not really cut anything',
    'The world total cannot ever be measured',
    'Cutting emissions has no effect on totals'],
   'Other countries increased theirs by more',
   'The world total is a sum of every country.',
   'A world total is the sum of all countries. One country falling while the total rises means increases elsewhere outweighed that cut.'],

  ['g9s-sts-c054', 'interpreting_climate_data', 3,
   'A graph of sea level rises by 3 mm each year. What does the gradient of the line represent?',
   ['How fast the sea level is rising',
    'How high the sea level has become',
    'How long the readings were taken for',
    'How many places were measured'],
   'How fast the sea level is rising',
   'A steeper line means a faster change.',
   'The gradient is the change in sea level divided by the time, which is the rate at which the sea is rising.'],

  ['g9s-sts-c055', 'interpreting_climate_data', 2,
   'Why are measurements of carbon dioxide taken far away from any city?',
   ['City air would give a local reading only',
    'Cities have no equipment that could be used',
    'The gas cannot be measured inside a city',
    'Cities are always warmer than the countryside'],
   'City air would give a local reading only',
   'The aim is a value for the whole atmosphere.',
   'Traffic and industry raise the concentration locally. A remote station measures the well-mixed background value that represents the atmosphere.'],

  ['g9s-sts-c056', 'interpreting_climate_data', 4,
   'A projection shows three possible temperatures for the year 2100. Why is more than one line drawn?',
   ['Future emissions are not yet decided',
    'Three different instruments were used',
    'Temperature can be measured three ways',
    'Three separate countries made the graph'],
   'Future emissions are not yet decided',
   'The future depends on what people do next.',
   'Each line is a scenario for a different level of future emissions, so the spread shows how much the outcome depends on the choices made now.'],

  ['g9s-sts-c057', 'interpreting_climate_data', 4,
   'One year in a long temperature record is much cooler than those around it. How should it be treated?',
   ['Kept in the record and explained if possible',
    'Removed so the rising trend looks clearer',
    'Replaced by the average of the years beside it',
    'Used on its own to show the world is cooling'],
   'Kept in the record and explained if possible',
   'A single year is not a trend, but it is still data.',
   'The reading is real and is kept. A large volcanic eruption, for example, cools a single year. Removing it would hide evidence.'],

  ['g9s-sts-c058', 'interpreting_climate_data', 3,
   'Two countries of very different size are compared. Which figure allows a fair comparison?',
   ['The emissions for each person',
    'The emissions for the whole country',
    'The area of land the country covers',
    'The number of people in the country'],
   'The emissions for each person',
   'One country may have far more people than the other.',
   'Emissions per person allow countries of very different sizes to be compared. A total on its own largely reflects population.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const NUM = [
  ['g9s-sts-c059', 'interpreting_climate_data', 3,
   'Use the table. Calculate the increase in carbon dioxide from 1960 to 2020, in ppm.<br>' + CO2,
   '97', ['97'],
   'Subtract the 1960 value from the 2020 value.',
   '414 &minus; 317 = 97 ppm. That is a rise of nearly a third in sixty years.'],

  ['g9s-sts-c060', 'interpreting_climate_data', 2,
   'Use the table. Calculate the increase in carbon dioxide from 2000 to 2020, in ppm.<br>' + CO2,
   '45', ['45'],
   'Subtract the 2000 value from the 2020 value.',
   '414 &minus; 369 = 45 ppm in twenty years, which is faster than the 22 ppm of the twenty years to 1980.'],
];

NUM.forEach(([id, subsection, difficulty, question, answer, acceptableAnswers, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeNum({ id, chapterId: CH, subsection, difficulty,
    question, answer, acceptableAnswers, hint, explanation }));
});

const SHORT = [
  ['g9s-sts-c013', 'applications_of_distillation', 2,
   'Name the part of a distillation apparatus in which vapour is turned back into a liquid.',
   'Condenser', ['the condenser', 'liebig condenser', 'a condenser'],
   'Cold water flows through its outer jacket.',
   'The condenser cools the vapour so that it condenses and runs down into the receiver.'],

  ['g9s-sts-c014', 'applications_of_distillation', 2,
   'Name the gas obtained from liquid air that is given to patients in hospital.',
   'Oxygen', ['o2', 'oxygen gas'],
   'It makes up about a fifth of the air.',
   'Oxygen is separated from liquid air and supplied to patients who cannot take in enough of it from the air.'],

  ['g9s-sts-c015', 'applications_of_distillation', 3,
   'Name the process used to obtain essential oils from plants using steam.',
   'Steam distillation', ['distillation', 'steam-distillation'],
   'Steam carries the oil over as a vapour.',
   'Steam distillation carries the oil off as a vapour, which is condensed and then separated from the water.'],

  ['g9s-sts-c028', 'applications_of_chromatography', 2,
   'Name the technique that separates the dyes in a food colouring.',
   'Chromatography', ['paper chromatography', 'chromatograph'],
   'The dyes travel up a strip of paper.',
   'Chromatography separates a mixture into its components as a solvent carries them different distances.'],

  ['g9s-sts-c029', 'applications_of_chromatography', 2,
   'A sample gives one spot on a chromatogram. State what this tells you about the sample.',
   'It is pure', ['pure', 'it is a pure substance', 'the sample is pure'],
   'One substance gives one spot.',
   'One spot means one substance, so the sample is pure.'],

  ['g9s-sts-c030', 'applications_of_chromatography', 3,
   'Name the line, drawn in pencil, on which the spots are placed at the start.',
   'Baseline', ['base line', 'the baseline', 'starting line', 'pencil line', 'start line'],
   'It is drawn before any spot is added.',
   'The baseline, or start line, is drawn in pencil because pencil does not dissolve in the solvent.'],

  ['g9s-sts-c043', 'climate_change', 2,
   'Name the greenhouse gas produced when a fossil fuel burns completely.',
   'Carbon dioxide', ['co2', 'carbon dioxide gas'],
   'Limewater turns milky with it.',
   'Complete combustion of a fossil fuel produces carbon dioxide, the main greenhouse gas from human activity.'],

  ['g9s-sts-c044', 'climate_change', 2,
   'Name the greenhouse gas released by cattle and by flooded rice fields.',
   'Methane', ['ch4', 'methane gas'],
   'It is the main gas in natural gas.',
   'Methane traps far more heat per molecule than carbon dioxide, although there is much less of it in the air.'],

  ['g9s-sts-c045', 'climate_change', 3,
   'Name the effect on seawater of carbon dioxide dissolving in it.',
   'Ocean acidification',
   ['acidification', 'the sea becomes more acidic', 'it becomes more acidic',
    'acidification of the ocean'],
   'It lowers the pH of the sea.',
   'Dissolved carbon dioxide forms carbonic acid and lowers the pH of the sea. This is called ocean acidification.'],

  ['g9s-sts-c061', 'interpreting_climate_data', 2,
   'Give, written in full, the unit used for the amount of carbon dioxide in the air.',
   'Parts per million', ['ppm', 'part per million'],
   'Its short form is ppm.',
   'Concentrations this small are given in parts per million.'],

  ['g9s-sts-c062', 'interpreting_climate_data', 3,
   'Two quantities rise together on a graph. Give the word for that relationship.',
   'Correlation', ['a correlation', 'correlated', 'positive correlation'],
   'It is not the same thing as cause.',
   'A correlation means the two change together; showing that one causes the other needs further evidence.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

})();
