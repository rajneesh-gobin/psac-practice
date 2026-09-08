'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Science - P3 · Energy, Heat & Temperature   (examWeight 3)
//
//  ⚠ MAURITIUS IS THE CONTEXT, NOT DECORATION. blueprint-science.md §X.7 finds
//    localised content in the real papers, and energy is where it belongs here:
//    bagasse from sugar cane, the wind farm, hydro at Tamarind Falls, imported
//    coal and heavy fuel oil. Every such fact is real and checkable; a made-up
//    local statistic in a science bank is worse than none.
//
//  ⚠ ENERGY IS CONSERVED, NEVER "USED UP" - the syllabus outcome is
//    "conservation of energy in simple systems", and the falling-object and
//    pendulum items are written as transfers between stores, which is how the
//    papers ask them.
//
//  ⚠ NO NUMERICAL POTENTIAL/KINETIC ENERGY FORMULAE. mgh and ½mv² are not in
//    the Grade 9 syllabus outcomes and do not appear in four years of papers;
//    the transfers are asked qualitatively. Authoring them would rehearse the
//    wrong exam, the same reason blueprint §M.6.6 forbids mole chemistry.
//
//  ⚠ <i> IS AN HTML BREAKOUT TAG AND MUST NEVER APPEAR INSIDE AN <svg>.
//
//  Source: NCE Science (Physics) 2021-2023, 2025; NCF Grades 7-9 §P3.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-p3-energy';

// ── A pendulum drawn at one of three positions, for the transfer items.
//    'left' and 'right' are the ends of the swing; 'bottom' is the lowest point.
const pendulum = (at) => {
  const PX = 125, PY = 16, L = 92;
  const ang = at === 'bottom' ? 0 : (at === 'left' ? -38 : 38);
  const rad = ang * Math.PI / 180;
  const bx = PX + L * Math.sin(rad), by = PY + L * Math.cos(rad);
  let g = '<svg viewBox="0 0 250 140" width="260" role="img" aria-label="a pendulum bob on a string">';
  g += '<line x1="70" y1="16" x2="180" y2="16" stroke="#0f172a" stroke-width="3"/>';
  g += '<line x1="' + PX + '" y1="' + PY + '" x2="' + PX + '" y2="' + (PY + L) + '" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4 4"/>';
  g += '<path d="M ' + (PX - L * Math.sin(38 * Math.PI / 180)).toFixed(1) + ' ' + (PY + L * Math.cos(38 * Math.PI / 180)).toFixed(1) +
       ' Q ' + PX + ' ' + (PY + L + 16) + ' ' + (PX + L * Math.sin(38 * Math.PI / 180)).toFixed(1) + ' ' +
       (PY + L * Math.cos(38 * Math.PI / 180)).toFixed(1) + '" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>';
  g += '<line x1="' + PX + '" y1="' + PY + '" x2="' + bx.toFixed(1) + '" y2="' + by.toFixed(1) + '" stroke="#0f172a" stroke-width="1.5"/>';
  g += '<circle cx="' + bx.toFixed(1) + '" cy="' + by.toFixed(1) + '" r="10" fill="#64748b" stroke="#0f172a" stroke-width="1.5"/>';
  return g + '</svg>';
};

const MCQ = [
  ['g9s-p3-001', 'conservation_of_energy', 1,
   'What does the law of conservation of energy state?',
   ['Energy can be transferred but never created or destroyed',
    'Energy is always destroyed when it is used',
    'Energy can be created whenever it is needed',
    'Energy disappears once a machine stops working'],
   'Energy can be transferred but never created or destroyed',
   'Think about the total amount before and after.',
   'Energy is never created or destroyed; it only moves from one store to another, so the total stays the same.'],

  ['g9s-p3-002', 'conservation_of_energy', 2,
   'A ball is held above the ground and then dropped. As it falls, energy is transferred:',
   ['From the gravitational store to the kinetic store',
    'From the kinetic store to the gravitational store',
    'From the thermal store to the kinetic store',
    'From the chemical store to the gravitational store'],
   'From the gravitational store to the kinetic store',
   'It is losing height and gaining speed.',
   'As it falls the ball loses height and gains speed, so energy moves from the gravitational store to the kinetic store.'],

  ['g9s-p3-003', 'conservation_of_energy', 2,
   'A torch is switched on. Which transfer describes it best?',
   ['Chemical store in the cell to light and thermal stores',
    'Kinetic store in the cell to a chemical store',
    'Light store in the bulb to a chemical store',
    'Gravitational store in the cell to light'],
   'Chemical store in the cell to light and thermal stores',
   'What is in a cell before it is used?',
   'The chemical store in the cell is transferred by the circuit to light and, unavoidably, to heat.'],

  ['g9s-p3-004', 'conservation_of_energy', 3,
   'A ball bounces lower each time it hits the ground. Has energy been destroyed?',
   ['No, some has been transferred to heat and sound',
    'Yes, a little is destroyed at every bounce',
    'Yes, all of it is destroyed at the last bounce',
    'No, the ball keeps all of its energy every time'],
   'No, some has been transferred to heat and sound',
   'Listen to the bounce, and think about the warm floor.',
   'Energy is conserved: what leaves the ball has gone to heating the ball and the ground and to the sound of the bounce.'],

  ['g9s-p3-005', 'energy_problems', 2,
   'The pendulum bob is shown at the end of its swing, where it is momentarily still. Which store holds the most energy at that moment?<br>' + pendulum('left'),
   ['The gravitational store, because the bob is highest',
    'The kinetic store, because the bob moves fastest here',
    'The thermal store, because the string is warm',
    'The chemical store, because the bob is made of metal'],
   'The gravitational store, because the bob is highest',
   'The bob is not moving at this instant.',
   'At the end of the swing the bob is highest and momentarily still, so the energy is in the gravitational store.'],

  ['g9s-p3-006', 'energy_problems', 2,
   'The pendulum bob is shown at the lowest point of its swing. What is true there?<br>' + pendulum('bottom'),
   ['It is moving fastest, so the kinetic store is greatest',
    'It is momentarily still, so the kinetic store is zero',
    'It is at its highest, so the gravitational store is greatest',
    'All of its energy has been destroyed'],
   'It is moving fastest, so the kinetic store is greatest',
   'This is the bottom of the swing.',
   'At the lowest point the bob has fallen furthest and moves fastest, so the kinetic store is at its largest.'],

  ['g9s-p3-007', 'energy_problems', 3,
   'A pendulum is released and swings freely. Why does it eventually stop?',
   ['Energy is transferred to the air and the support as heat',
    'The energy in the bob is destroyed as it swings',
    'Gravity switches off after a few swings',
    'The string becomes shorter each swing'],
   'Energy is transferred to the air and the support as heat',
   'Energy is conserved, so where has it gone?',
   'Friction with the air and at the pivot transfers energy away as heat and sound, so the swing dies down.'],

  ['g9s-p3-008', 'energy_problems', 3,
   'A stone is thrown straight upwards. At the highest point of its path:',
   ['Its kinetic store is at its smallest and its gravitational store at its largest',
    'Both its kinetic and gravitational stores are at their largest',
    'Its kinetic store is at its largest and its gravitational store at its smallest',
    'Both of its stores are empty at that instant'],
   'Its kinetic store is at its smallest and its gravitational store at its largest',
   'How fast is it moving at the very top?',
   'At the top the stone is momentarily still and at its greatest height, so the transfer to the gravitational store is complete.'],

  ['g9s-p3-009', 'electricity_production', 2,
   'In most power stations, what turns the generator?',
   ['A turbine', 'A transformer', 'A battery', 'A switch'], 'A turbine',
   'It is spun by steam, water or wind.',
   'A turbine is made to spin, and it turns the generator that produces the electricity.'],

  ['g9s-p3-010', 'electricity_production', 2,
   'In a coal-fired power station, what is the coal used for?',
   ['To heat water and produce steam',
    'To cool the generator down',
    'To carry the electricity to homes',
    'To turn the generator directly'],
   'To heat water and produce steam',
   'The steam is what reaches the turbine.',
   'Burning coal heats water into steam; the steam drives the turbine, which turns the generator.'],

  ['g9s-p3-011', 'electricity_production', 3,
   'Put these in the right order for a thermal power station: turbine, generator, fuel burned, steam produced.',
   ['Fuel burned, steam produced, turbine, generator',
    'Generator, turbine, steam produced, fuel burned',
    'Steam produced, fuel burned, generator, turbine',
    'Turbine, generator, fuel burned, steam produced'],
   'Fuel burned, steam produced, turbine, generator',
   'Follow the energy from the fuel to the wires.',
   'The fuel is burned, the heat makes steam, the steam spins the turbine and the turbine turns the generator.'],

  ['g9s-p3-012', 'renewable_sources', 1,
   'Which of these is a <b>renewable</b> energy source?',
   ['Wind', 'Coal', 'Petrol', 'Heavy fuel oil'], 'Wind',
   'A renewable source is not used up.',
   'Wind is renewable: it keeps being replaced. Coal, petrol and fuel oil are finite.'],

  ['g9s-p3-013', 'renewable_sources', 2,
   'Which renewable source produces electricity in Mauritius from a by-product of the sugar cane industry?',
   ['Bagasse', 'Coal', 'Natural gas', 'Diesel'], 'Bagasse',
   'It is what is left after the cane is crushed.',
   'Bagasse, the fibre left after crushing sugar cane, is burned in Mauritius to generate electricity.'],

  ['g9s-p3-014', 'renewable_sources', 2,
   'Which renewable source uses falling or flowing water to turn a turbine?',
   ['Hydroelectric power', 'Solar power', 'Wind power', 'Geothermal power'],
   'Hydroelectric power',
   'The prefix means water.',
   'Hydroelectric power uses moving water to spin the turbine.'],

  ['g9s-p3-015', 'renewable_sources', 2,
   'What is the main drawback of solar panels as a source of electricity?',
   ['They produce nothing at night and less when it is cloudy',
    'They give off a great deal of smoke as they work',
    'They can only be used inside a building, never outdoors',
    'They release the gases that cause acid rain as they work'],
   'They produce nothing at night and less when it is cloudy',
   'Think about when they can and cannot work.',
   'Solar output depends on sunshine, so it falls at night and in cloudy weather - the supply is not constant.'],

  ['g9s-p3-016', 'non_renewable_sources', 1,
   'Which of these is a <b>non-renewable</b> energy source?',
   ['Coal', 'Wind', 'Solar', 'Bagasse'], 'Coal',
   'A non-renewable source cannot be replaced once it is used.',
   'Coal took millions of years to form and cannot be replaced, so it is non-renewable.'],

  ['g9s-p3-017', 'non_renewable_sources', 2,
   'Which group are all <b>fossil fuels</b>?',
   ['Coal, oil and natural gas', 'Wind, waves and sunlight',
    'Bagasse, wood and straw', 'Water, wind and sunlight'],
   'Coal, oil and natural gas',
   'They all formed from the remains of living things long ago.',
   'Coal, oil and natural gas formed from ancient organisms and are the three fossil fuels.'],

  ['g9s-p3-018', 'non_renewable_sources', 3,
   'Why is burning fossil fuels a problem for the atmosphere?',
   ['It releases carbon dioxide, a greenhouse gas',
    'It releases oxygen, which traps heat',
    'It removes all the nitrogen from the air',
    'It cools the atmosphere too quickly'],
   'It releases carbon dioxide, a greenhouse gas',
   'Which gas is given off when a carbon fuel burns?',
   'Burning fossil fuels releases carbon dioxide, which traps heat in the atmosphere and drives global warming.'],

  ['g9s-p3-019', 'comparing_energy_sources', 2,
   'Which is the main advantage of renewable sources over fossil fuels?',
   ['They do not run out and pollute far less',
    'They are always cheaper to build',
    'They produce electricity at a constant rate',
    'They need no equipment of any kind'],
   'They do not run out and pollute far less',
   'Think about supply and about pollution together.',
   'Renewables are replaced naturally and release little or no pollution, unlike finite, polluting fossil fuels.'],

  ['g9s-p3-020', 'comparing_energy_sources', 3,
   'Which is a genuine drawback of wind power?',
   ['No electricity is generated when the wind drops',
    'It releases large amounts of carbon dioxide',
    'It can only be used at night',
    'It uses up the wind permanently'],
   'No electricity is generated when the wind drops',
   'The honest drawback is about reliability.',
   'Wind is free and clean but not constant, so the output varies and can fall to nothing.'],

  ['g9s-p3-021', 'comparing_energy_sources', 3,
   'Which pair correctly classifies the two sources?',
   ['Bagasse renewable, heavy fuel oil non-renewable',
    'Bagasse non-renewable, heavy fuel oil renewable',
    'Both bagasse and heavy fuel oil are renewable',
    'Both bagasse and heavy fuel oil are non-renewable'],
   'Bagasse renewable, heavy fuel oil non-renewable',
   'One is regrown every year; the other is a fossil fuel.',
   'Bagasse comes from a crop grown each year and is renewable; heavy fuel oil comes from crude oil and is not.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const SHORT = [
  ['g9s-p3-022', 'conservation_of_energy', 1,
   'Complete the law: energy cannot be created or ______.',
   'Destroyed', ['destroy', 'destroyed.'],
   'The opposite of created.', 'Energy cannot be created or destroyed, only transferred.'],
  ['g9s-p3-023', 'renewable_sources', 2,
   'Name the fibre left after crushing sugar cane that is burned to generate electricity in Mauritius.',
   'Bagasse', ['the bagasse'],
   'It is a by-product of the sugar industry.',
   'Bagasse is burned in Mauritian power stations to generate electricity.'],
  ['g9s-p3-024', 'non_renewable_sources', 1,
   'Give the general name for coal, oil and natural gas.',
   'Fossil fuels', ['fossil fuel', 'fossil-fuels'],
   'They formed from the remains of living things.',
   'Coal, oil and natural gas are the fossil fuels.'],
  ['g9s-p3-025', 'electricity_production', 2,
   'Name the part of a power station that is spun in order to turn the generator.',
   'Turbine', ['the turbine', 'a turbine'],
   'Steam, water or wind spins it.',
   'The turbine is spun and drives the generator that produces the electricity.'],
  ['g9s-p3-026', 'comparing_energy_sources', 2,
   'State one advantage of a renewable energy source over a fossil fuel.',
   'It does not run out',
   ['it is renewable', 'it causes less pollution', 'it does not pollute',
    'it will never run out', 'less pollution'],
   'Think about supply, or about pollution.',
   'Renewables are replaced naturally and release far less pollution than fossil fuels.'],
  ['g9s-p3-027', 'renewable_sources', 2,
   'Name the renewable source that uses moving water to turn a turbine.',
   'Hydroelectric', ['hydroelectric power', 'hydro', 'hydro power', 'water power'],
   'The prefix means water.',
   'Hydroelectric power uses flowing or falling water to spin a turbine.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

})();
