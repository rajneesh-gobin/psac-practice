'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Science - C1 · The Atmosphere & Environment Around Us  (weight 3)
//
//  ⚠ THE PAPERS USE PHOTOGRAPHS HERE AND THIS REPO HAS NONE. blueprint-science
//    §X.5 records algal blooms, polar bears, drought and flooding as supplied
//    stimulus in the real Chemistry papers. There is no bundled Grade 9
//    artwork, so those items are written from a DESCRIBED situation or from a
//    supplied data table drawn as inline SVG instead. The photo-dependent
//    variants stay unwritten rather than faked with a caption.
//
//  ⚠ SUPPLIED DATA TABLES ARE THE SECOND-COMMONEST VISUAL in every science,
//    every year (§X.5.2), and unlike a photograph a table CAN be built here.
//    Two are drawn below and questions read values off them.
//
//  ⚠ THE MECHANISM MATTERS, NOT THE SLOGAN. "Greenhouse gases trap heat" is
//    the mark; "global warming is bad" is not. Items ask which gas, which
//    source, which effect - the way the papers award the marks.
//
//  ⚠ NO MOLE, Mr OR REACTING-MASS CHEMISTRY ANYWHERE IN THIS PACK. The
//    supplied Periodic Table carries no atomic numbers and no relative atomic
//    masses, and five years of papers contain none of it (§M.6.6).
//
//  Source: NCE Science (Chemistry) 2021-2025; NCF Grades 7-9 §C1.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-c1-atmosphere';

// ── A small supplied data table, drawn as SVG so it renders identically
//    everywhere and can be read off exactly. rows = [[label, value], ...]
const dataTable = (title, head, rows) => {
  const W = 250, X0 = 12, RH = 20;
  const H = 26 + RH * (rows.length + 1) + 6;
  let g = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="270" role="img" aria-label="a table of data">';
  g += '<text x="' + (W / 2) + '" y="14" font-size="10" text-anchor="middle" fill="#0f172a">' + title + '</text>';
  const top = 22;
  const colX = X0 + 140;
  g += '<rect x="' + X0 + '" y="' + top + '" width="' + (W - 2 * X0) + '" height="' + (RH * (rows.length + 1)) +
       '" fill="none" stroke="#0f172a" stroke-width="1.5"/>';
  g += '<line x1="' + colX + '" y1="' + top + '" x2="' + colX + '" y2="' + (top + RH * (rows.length + 1)) +
       '" stroke="#0f172a" stroke-width="1.5"/>';
  g += '<line x1="' + X0 + '" y1="' + (top + RH) + '" x2="' + (W - X0) + '" y2="' + (top + RH) +
       '" stroke="#0f172a" stroke-width="1.5"/>';
  g += '<text x="' + (X0 + 6) + '" y="' + (top + 14) + '" font-size="9" fill="#0f172a">' + head[0] + '</text>';
  g += '<text x="' + (colX + 6) + '" y="' + (top + 14) + '" font-size="9" fill="#0f172a">' + head[1] + '</text>';
  rows.forEach((r, i) => {
    const y = top + RH * (i + 1);
    if (i) g += '<line x1="' + X0 + '" y1="' + y + '" x2="' + (W - X0) + '" y2="' + y + '" stroke="#cbd5e1" stroke-width="1"/>';
    g += '<text x="' + (X0 + 6) + '" y="' + (y + 14) + '" font-size="9" fill="#334155">' + r[0] + '</text>';
    g += '<text x="' + (colX + 6) + '" y="' + (y + 14) + '" font-size="9" fill="#334155">' + r[1] + '</text>';
  });
  return g + '</svg>';
};

const T_POLLUTANTS = dataTable('Gases released by four sources', ['Source', 'Main gas released'], [
  ['Car exhaust', 'carbon monoxide'],
  ['Coal power station', 'sulfur dioxide'],
  ['Cattle and rice fields', 'methane'],
  ['Old refrigerators', 'CFCs'],
]);

const T_RIVER = dataTable('Oxygen in a river below a farm', ['Distance downstream', 'Oxygen / units'], [
  ['0 km (above the farm)', '9'],
  ['1 km', '6'],
  ['2 km', '3'],
  ['4 km', '8'],
]);

const MCQ = [
  ['g9s-c1-001', 'water_pollution', 1,
   'Which of these is a cause of water pollution?',
   ['Untreated sewage released into a river',
    'Rainwater falling onto a clean river',
    'Fish swimming in a river',
    'Sunlight reaching the surface of a river'],
   'Untreated sewage released into a river',
   'Pollution means something harmful being added.',
   'Untreated sewage adds harmful material to the water, which is water pollution.'],

  ['g9s-c1-002', 'water_pollution', 2,
   'Fertiliser washed off a field into a river is a pollutant because it:',
   ['Adds nutrients that upset the balance of life in the water',
    'Makes the water flow much more quickly downstream',
    'Turns the water permanently into acid',
    'Removes all the salt from the water'],
   'Adds nutrients that upset the balance of life in the water',
   'Fertiliser feeds plants - including the ones in the river.',
   'Fertiliser adds nitrates and phosphates, which feed algae and set off the chain of events called eutrophication.'],

  ['g9s-c1-003', 'water_pollution', 2,
   'Which of these would best reduce water pollution from a factory?',
   ['Treating the waste water before it is released',
    'Releasing the waste at night instead of by day',
    'Releasing the waste further downstream',
    'Using a wider pipe to release the waste'],
   'Treating the waste water before it is released',
   'Only one of these changes what is in the water.',
   'Treatment removes the harmful material; moving it or diluting it leaves the pollutant in the river.'],

  ['g9s-c1-004', 'water_pollution', 3,
   'Why is an oil spill at sea so damaging to sea birds?',
   ['Oil coats their feathers so they can no longer keep warm or float',
    'Oil makes the sea water too salty for them to drink',
    'Oil removes all of the light from the surface of the sea',
    'Oil makes the sea water freeze around them'],
   'Oil coats their feathers so they can no longer keep warm or float',
   'Think about what the feathers normally do.',
   'Feathers trap air for warmth and buoyancy; oil destroys that, so the birds become cold and cannot float.'],

  ['g9s-c1-005', 'eutrophication', 2,
   'What is <b>eutrophication</b>?',
   ['Excess nutrients cause algae to grow rapidly in water',
    'Salt builds up in a river until fish cannot live',
    'Water becomes acidic because of acid rain',
    'A river dries up completely during a drought'],
   'Excess nutrients cause algae to grow rapidly in water',
   'It starts with fertiliser reaching the water.',
   'Eutrophication begins when extra nutrients make algae grow rapidly, forming a bloom on the surface.'],

  ['g9s-c1-006', 'eutrophication', 3,
   'Put the stages of eutrophication in the right order.',
   ['Nutrients enter, algae bloom, algae die and decay, oxygen falls, fish die',
    'Algae bloom, nutrients enter, oxygen rises, fish die, algae decay',
    'Oxygen falls, nutrients enter, fish die, algae bloom, algae decay',
    'Fish die, oxygen falls, algae bloom, nutrients enter, algae decay'],
   'Nutrients enter, algae bloom, algae die and decay, oxygen falls, fish die',
   'Follow the chain from the fertiliser to the fish.',
   'Nutrients feed an algal bloom; when the algae die, decay bacteria use up the oxygen, and the fish suffocate.'],

  ['g9s-c1-007', 'eutrophication', 3,
   'Why do fish die during eutrophication even though nothing poisonous was added?',
   ['Bacteria decaying the dead algae use up the dissolved oxygen',
    'The algae feed on the fish directly as they grow',
    'The water becomes far too cold for the fish to survive',
    'The algae remove all of the salt dissolved in the water'],
   'Bacteria decaying the dead algae use up the dissolved oxygen',
   'The fish are short of something they need, not poisoned.',
   'Decay bacteria respire and consume the dissolved oxygen, so the fish suffocate.'],

  ['g9s-c1-008', 'eutrophication', 3,
   'The table shows the oxygen in a river below a farm. Where is the water most polluted?<br>' + T_RIVER,
   ['At 2 km, where the oxygen is lowest',
    'At 0 km, where the oxygen is highest',
    'At 4 km, where the oxygen has recovered',
    'At 1 km, where the oxygen is 6 units'],
   'At 2 km, where the oxygen is lowest',
   'Low dissolved oxygen is the sign of pollution here.',
   'Oxygen falls to 3 units at 2 km, the lowest value in the table, so that is where the pollution is worst.'],

  ['g9s-c1-009', 'eutrophication', 3,
   'Reading the same table, what does the value at 4 km show?<br>' + T_RIVER,
   ['The river is recovering as it flows further downstream',
    'The pollution becomes worse the further it flows',
    'The river is equally polluted all the way along',
    'The farm is releasing more waste at 4 km'],
   'The river is recovering as it flows further downstream',
   'Compare 4 km with 2 km.',
   'Oxygen rises from 3 units at 2 km to 8 units at 4 km, so the river is recovering downstream.'],

  ['g9s-c1-010', 'air_pollutants', 1,
   'Which gas is produced when a fuel burns in too little air?',
   ['Carbon monoxide', 'Oxygen', 'Nitrogen', 'Water vapour'],
   'Carbon monoxide',
   'Incomplete burning gives a gas with one oxygen atom.',
   'Burning in a limited supply of air is incomplete combustion, which produces poisonous carbon monoxide.'],

  ['g9s-c1-011', 'air_pollutants', 2,
   'Why is carbon monoxide so dangerous?',
   ['It stops the blood from carrying oxygen, and it has no smell',
    'It has a very strong smell that quickly causes headaches',
    'It burns the skin as soon as it is touched',
    'It makes the air far too cold to breathe'],
   'It stops the blood from carrying oxygen, and it has no smell',
   'Think about what it does in the blood, and why it is not noticed.',
   'Carbon monoxide binds to haemoglobin in place of oxygen, and being colourless and odourless it gives no warning.'],

  ['g9s-c1-012', 'air_pollutants', 2,
   'Which pollutant is released mainly by burning coal that contains sulfur?',
   ['Sulfur dioxide', 'Carbon monoxide', 'Methane', 'CFCs'],
   'Sulfur dioxide',
   'The sulfur in the fuel combines with oxygen.',
   'Sulfur in the coal burns to sulfur dioxide, one of the two main causes of acid rain.'],

  ['g9s-c1-013', 'air_pollutants', 3,
   'Read the table. A power station burning coal releases which gas?<br>' + T_POLLUTANTS,
   ['Sulfur dioxide', 'Carbon monoxide', 'Methane', 'CFCs'],
   'Sulfur dioxide',
   'Find the row for the coal power station.',
   'The table gives sulfur dioxide as the main gas released by a coal power station.'],

  ['g9s-c1-014', 'air_pollutants', 3,
   'Read the table. Which source is given for CFCs?<br>' + T_POLLUTANTS,
   ['Old refrigerators', 'Car exhaust', 'Coal power station', 'Cattle and rice fields'],
   'Old refrigerators',
   'Find CFCs in the right-hand column and read across.',
   'The table gives old refrigerators as the source of CFCs.'],

  ['g9s-c1-015', 'air_pollutants', 3,
   'Why were CFCs banned in most countries?',
   ['They damage the ozone layer that shields us from ultraviolet light',
    'They make the rain far more acidic than it used to be',
    'They turn directly into carbon monoxide once in the air',
    'They cause the level of the sea to rise very quickly'],
   'They damage the ozone layer that shields us from ultraviolet light',
   'Their damage is high in the atmosphere.',
   'CFCs break down ozone in the upper atmosphere, thinning the layer that absorbs harmful ultraviolet radiation.'],

  ['g9s-c1-016', 'greenhouse_gases', 1,
   'Which of these is a greenhouse gas?',
   ['Carbon dioxide', 'Nitrogen', 'Oxygen', 'Argon'], 'Carbon dioxide',
   'It is released whenever a carbon fuel burns.',
   'Carbon dioxide absorbs heat radiated from the Earth, so it is a greenhouse gas. Nitrogen and oxygen are not.'],

  ['g9s-c1-017', 'greenhouse_gases', 2,
   'How does a greenhouse gas warm the Earth?',
   ['It absorbs heat radiated from the Earth instead of letting it escape',
    'It stops the sunlight from reaching the surface of the Earth',
    'It produces heat of its own high inside the atmosphere',
    'It pushes the Earth slowly closer to the Sun over time'],
   'It absorbs heat radiated from the Earth instead of letting it escape',
   'The energy arrives as light and tries to leave as heat.',
   'Sunlight passes in and warms the surface; greenhouse gases absorb the heat radiated back out, keeping it in the atmosphere.'],

  ['g9s-c1-018', 'greenhouse_gases', 2,
   'Read the table. Which greenhouse gas comes from cattle and rice fields?<br>' + T_POLLUTANTS,
   ['Methane', 'Sulfur dioxide', 'Carbon monoxide', 'CFCs'], 'Methane',
   'Find the row for cattle and rice fields.',
   'The table gives methane, a powerful greenhouse gas, for cattle and rice fields.'],

  ['g9s-c1-019', 'greenhouse_gases', 3,
   'Which human activity has added most carbon dioxide to the atmosphere?',
   ['Burning fossil fuels', 'Planting forests',
    'Fishing in the open sea', 'Building roads out of stone'],
   'Burning fossil fuels',
   'Which of these releases carbon that was locked away?',
   'Burning coal, oil and gas releases carbon that had been stored underground for millions of years.'],

  ['g9s-c1-020', 'acid_rain', 1,
   'Which two gases are the main causes of acid rain?',
   ['Sulfur dioxide and oxides of nitrogen',
    'Carbon monoxide and methane gas',
    'Oxygen and nitrogen from the air',
    'CFCs and ordinary water vapour'],
   'Sulfur dioxide and oxides of nitrogen',
   'Both are released when fuels burn.',
   'Sulfur dioxide and nitrogen oxides dissolve in rain water to form sulfuric and nitric acids.'],

  ['g9s-c1-021', 'acid_rain', 2,
   'How does acid rain form?',
   ['Pollutant gases dissolve in water droplets in the clouds',
    'Rain water becomes acidic as it soaks into the soil',
    'The Sun heats rain water until it turns to acid',
    'Sea water evaporates and carries acid into the clouds'],
   'Pollutant gases dissolve in water droplets in the clouds',
   'The acid is made in the air, before the rain falls.',
   'Sulfur dioxide and nitrogen oxides dissolve in cloud droplets, forming acids that fall as rain.'],

  ['g9s-c1-022', 'acid_rain', 2,
   'Which of these is a harmful effect of acid rain?',
   ['Lakes become too acidic for fish to survive',
    'Lakes become far too warm for fish to survive',
    'Rivers dry up completely in summer',
    'The soil becomes too salty for any crop'],
   'Lakes become too acidic for fish to survive',
   'The clue is in the word acid.',
   'Acid rain lowers the pH of lakes and rivers until fish and other water life can no longer survive.'],

  ['g9s-c1-023', 'acid_rain', 3,
   'Acid rain damages limestone statues and buildings. Why?',
   ['The acid reacts with the limestone and wears it away',
    'The acid freezes inside the stone and cracks it',
    'The acid makes the stone much heavier than before',
    'The acid changes the colour of the stone only'],
   'The acid reacts with the limestone and wears it away',
   'Limestone is a carbonate, and acids react with carbonates.',
   'Limestone is calcium carbonate; acid reacts with it, dissolving the surface and eroding the detail.'],

  ['g9s-c1-024', 'acid_rain', 3,
   'Which measure would most directly reduce acid rain?',
   ['Removing sulfur from fuels before they are burned',
    'Building the chimneys of power stations taller',
    'Burning the same fuel more quickly',
    'Adding lime to the chimneys of every house'],
   'Removing sulfur from fuels before they are burned',
   'Deal with the cause, not with where it lands.',
   'Taking the sulfur out before burning stops the sulfur dioxide being made at all; a taller chimney only moves it.'],

  ['g9s-c1-025', 'global_warming', 2,
   'What is meant by <b>global warming</b>?',
   ['A rise in the average temperature of the Earth',
    'A rise in temperature in one country only',
    'The hot weather that comes every summer',
    'The warming of water in a kettle'],
   'A rise in the average temperature of the Earth',
   'Global means worldwide, and it is an average.',
   'Global warming is the rise in the average temperature of the whole Earth over many years.'],

  ['g9s-c1-026', 'global_warming', 2,
   'Which of these is a consequence of global warming?',
   ['Sea levels rise as ice melts and water expands',
    'The Earth moves further from the Sun',
    'The atmosphere loses all its oxygen',
    'Days become longer than nights everywhere'],
   'Sea levels rise as ice melts and water expands',
   'Think about ice, and about what warm water does.',
   'Warming melts land ice and makes sea water expand, so sea levels rise - a serious risk for an island like Mauritius.'],

  ['g9s-c1-027', 'global_warming', 3,
   'Why is a rising sea level a particular concern for Mauritius?',
   ['Much of the population and infrastructure is near the coast',
    'The island would drift further from Africa',
    'The lagoon water would become fresh instead of salty',
    'The island would become permanently colder'],
   'Much of the population and infrastructure is near the coast',
   'Think about where people live on a small island.',
   'A small island has most of its people, roads, hotels and farmland close to the shore, so coastal flooding and erosion matter greatly.'],

  ['g9s-c1-028', 'global_warming', 3,
   'Which action would do most to slow global warming?',
   ['Generating electricity from renewable sources instead of coal',
    'Fitting air conditioners into a great many more buildings',
    'Cutting down more forest to make additional farmland',
    'Using private cars instead of buses and public transport'],
   'Generating electricity from renewable sources instead of coal',
   'The cause is carbon dioxide from burning fuels.',
   'Replacing fossil fuels with renewables cuts carbon dioxide emissions at their largest source.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const SHORT = [
  ['g9s-c1-029', 'eutrophication', 2,
   'Give the term for the rapid growth of algae caused by excess nutrients entering water.',
   'Eutrophication', ['eutrophication.', 'eutrophisation'],
   'It begins with fertiliser reaching a river.',
   'Eutrophication is the enrichment of water by nutrients, causing algae to grow rapidly.'],
  ['g9s-c1-030', 'air_pollutants', 1,
   'Name the poisonous gas formed when a fuel burns in too little air.',
   'Carbon monoxide', ['carbon-monoxide', 'co'],
   'It has no smell and no colour.',
   'Incomplete combustion produces carbon monoxide.'],
  ['g9s-c1-031', 'acid_rain', 2,
   'Name the gas released by burning coal that is a main cause of acid rain.',
   'Sulfur dioxide', ['sulphur dioxide', 'so2', 'sulfur-dioxide'],
   'It comes from the sulfur in the fuel.',
   'Sulfur dioxide dissolves in rain water to form an acid.'],
  ['g9s-c1-032', 'greenhouse_gases', 1,
   'Name the greenhouse gas released whenever a carbon fuel is burned.',
   'Carbon dioxide', ['co2', 'carbon-dioxide'],
   'Two words.', 'Burning a carbon fuel releases carbon dioxide.'],
  ['g9s-c1-033', 'global_warming', 2,
   'State one effect of global warming on the sea.',
   'Sea levels rise',
   ['the sea level rises', 'rising sea levels', 'sea level rise',
    'the sea gets warmer', 'coral bleaching'],
   'Think about ice melting and water expanding.',
   'Melting land ice and the expansion of warming water both raise sea levels.'],
  ['g9s-c1-034', 'water_pollution', 2,
   'State one way of reducing water pollution from a factory.',
   'Treat the waste water before releasing it',
   ['treat the waste', 'treat the water', 'treatment of waste water',
    'do not release untreated waste'],
   'Change what is in the water, not where it goes.',
   'Treating waste water removes the harmful material before it reaches the river.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

})();
