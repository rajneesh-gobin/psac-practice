'use strict';
// PSAC Grade 6 Science 2024 (Modular) - past-paper questions adapted to MCQ format.
// Source: Mauritius Examinations Syndicate (mauritiuspapers.co.mu).
//
// The paper's nine diagrams are cropped from the MES PDF and live in
// assets/past-papers/g6-science-2024/. They are shown rather than described:
// reading a diagram is a separately assessed skill in this paper (it makes 31
// references to a Diagram/Picture/Table), and describing one in prose both
// removes that skill and, in Q2(a)(i), used to state the answer outright.
//
// ⚠ Alt text must never name the answer - these say what a reader would see,
// not what the question is testing.
const _g6sc24 = (file, alt) =>
  `<img src="assets/past-papers/g6-science-2024/${file}.png" alt="${alt}"` +
  ` style="display:block;margin:8px auto;max-width:min(100%,420px);height:auto;` +
  `border-radius:6px;background:#fff">`;

STATIC_QUESTIONS.push(

  // ── Q1: 5 MCQs (circle the correct answer) ──────────────────────────────

  makeMCQ({ id:'g6sc-pp24-001', chapterId:'g6-animals', subsection:'habitats', difficulty:1,
    question:'Tigers eat the flesh of other animals. What type of animal is the tiger?',
    options:['Carnivorous','Granivorous','Herbivorous','Omnivorous'], answer:'Carnivorous',
    hint:'An animal that eats only meat/flesh has a specific name.',
    explanation:'Carnivorous animals eat other animals\' flesh. (Herbivores eat plants; omnivores eat both.)',
    learnMore:'Tigers are the largest wild cats in the world. They are <b>apex predators</b> - no other animal hunts them in the wild. Their striped coat acts as camouflage in tall grass.<br><br>In food chains, carnivores are always <b>secondary or tertiary consumers</b>. Without them, herbivore populations would grow unchecked, overgrazing plants and collapsing ecosystems. This is why protecting predators is important for the whole food web.' }),

  makeMCQ({ id:'g6sc-pp24-002', chapterId:'g6-materials', subsection:'natural_manmade', difficulty:1,
    question:'<b>Diagram 1</b> shows an umbrella. It protects us against rain.' +
      _g6sc24('d1-umbrella', 'A drawing of an open umbrella with one part labelled X') +
      'Which material is <b>most appropriate</b> to make part <b>X</b> of the umbrella?',
    options:['Glass','Plastic','Silk','Wool'], answer:'Plastic',
    hint:'The canopy must be waterproof and flexible.',
    explanation:'Plastic (synthetic fabric like nylon) is waterproof and light - ideal for an umbrella canopy. Glass breaks; wool and silk absorb water.' }),

  makeMCQ({ id:'g6sc-pp24-003', chapterId:'g6-energy', subsection:'forms', difficulty:1,
    question:'What is the form of energy <b>at the output</b> when a television set is switched on?',
    options:['Chemical','Electrical','Light','Movement'], answer:'Light',
    hint:'What can you see and hear from a television?',
    explanation:'A television converts electrical energy into light energy (and sound). Light is the visible output.' }),

  makeMCQ({ id:'g6sc-pp24-004', chapterId:'g6-air', subsection:'breathing', difficulty:1,
    question:'Which one of the following gases is necessary for <b>burning</b> to take place?',
    options:['Carbon dioxide','Nitrogen','Oxygen','Water vapour'], answer:'Oxygen',
    hint:'Fire needs this gas to burn - and it is also needed for breathing.',
    explanation:'Oxygen supports combustion (burning). Carbon dioxide actually extinguishes fires.',
    learnMore:'This explains how CO₂ fire extinguishers work: they smother the fire by <b>replacing oxygen</b> around the flame, so burning cannot continue.<br><br>Air is approximately 21% oxygen and 78% nitrogen. Nitrogen does not support burning, which is why a room full of air doesn\'t burst into flames - the nitrogen "dilutes" the oxygen. A fire in a sealed container will go out once it has used up all the available oxygen.' }),

  makeMCQ({ id:'g6sc-pp24-005', chapterId:'g6-animals', subsection:'habitats', difficulty:2,
    question:'<b>Diagram 2</b> shows a meal for breakfast.' +
      _g6sc24('d2-breakfast', 'A drawing of a breakfast on a plate, with two items labelled') +
      'Which of the following food items should be added to the meal to make it a <b>balanced</b> meal?',
    options:['Apple','Bread','Lentils','Cheese'], answer:'Lentils',
    hint:'Cereals provide carbohydrates. Milk provides dairy/fats. What food group is still missing?',
    explanation:'Lentils provide protein, which is the missing food group. Apple and bread add more carbohydrates; cheese adds more fat/dairy.' }),

  // ── Q2: Air composition - MCQ-convertible sub-questions ─────────────────

  makeMCQ({ id:'g6sc-pp24-006', chapterId:'g6-air', subsection:'composition', difficulty:2,
    question:'<b>Diagram 3</b> shows the percentage composition of gases in dry air.' +
      _g6sc24('d3-air-pie', 'A pie chart of dry air divided into four parts, each labelled with a percentage, one slice labelled Gas P') +
      'What is the percentage of <b>carbon dioxide</b> found in dry air?',
    options:['0.03%','0.87%','21.0%','78.1%'], answer:'0.03%',
    hint:'Carbon dioxide is a trace gas - very small amount.',
    explanation:'Carbon dioxide makes up only 0.03% of dry air.' }),

  makeMCQ({ id:'g6sc-pp24-007', chapterId:'g6-air', subsection:'properties', difficulty:2,
    question:'<b>Diagram 3</b> shows the percentage composition of gases in dry air.' +
      _g6sc24('d3-air-pie', 'A pie chart of dry air divided into four parts, each labelled with a percentage, one slice labelled Gas P') +
      'Name the gas labelled <b>P</b>.',
    options:['Argon','Carbon dioxide','Nitrogen','Oxygen'], answer:'Oxygen',
    hint:'The second most common gas in air, needed for breathing and combustion.',
    explanation:'Oxygen makes up 21% of dry air. Nitrogen is ~78%, argon ~0.87%, CO₂ ~0.03%.' }),

  makeMCQ({ id:'g6sc-pp24-008', chapterId:'g6-air', subsection:'properties', difficulty:1,
    question:'Which gas is <b>absent</b> in dry air?',
    options:['Argon','Carbon dioxide','Nitrogen','Water vapour'], answer:'Water vapour',
    hint:'"Dry air" means the water has been removed.',
    explanation:'Dry air by definition contains no water vapour. All the others (nitrogen, oxygen, argon, CO₂) are present in dry air.' }),

  // ── Q3: Animals ─────────────────────────────────────────────────────────

  makeMCQ({ id:'g6sc-pp24-009', chapterId:'g6-animals', subsection:'classification', difficulty:1,
    question:'<b>Diagram 5</b> shows three animals.' +
      _g6sc24('d5-animals', 'Drawings of three animals side by side: a pigeon, a bee and a bat') +
      'Which animal in <b>Diagram 5</b> is a <b>mammal</b>?',
    options:['Pigeon','Bee','Bat','All three'], answer:'Bat',
    hint:'Mammals give birth to live young and feed them with milk.',
    explanation:'Bats are mammals - they are warm-blooded, have fur, and suckle their young. Pigeons are birds; bees are insects.',
    learnMore:'Bats are the <b>only mammals capable of true, powered flight</b>. They navigate in the dark using <b>echolocation</b> - sending out high-pitched sound pulses and listening to the echo to build a 3D map of their surroundings.<br><br>Mauritius has its own bat: the <b>Mauritius Flying Fox</b> (<i>Pteropus niger</i>), a large fruit bat. It is a vital pollinator and seed disperser for native forest trees, and it is now endangered. Protecting it matters for the health of Mauritian forests.' }),

  makeMCQ({ id:'g6sc-pp24-010', chapterId:'g6-animals', subsection:'habitats', difficulty:1,
    question:'To which group of animals does the <b>bee</b> belong?',
    options:['Birds','Insects','Mammals','Reptiles'], answer:'Insects',
    hint:'The bee has 6 legs and 3 body parts.',
    explanation:'Bees are insects: they have 6 legs, 3 body parts (head, thorax, abdomen), and an exoskeleton.' }),

  makeMCQ({ id:'g6sc-pp24-011', chapterId:'g6-animals', subsection:'classification', difficulty:2,
    question:'How do <b>birds and reptiles</b> reproduce?',
    options:['By giving birth to live young','By budding','By laying eggs','By spores'], answer:'By laying eggs',
    hint:'Think about what comes out of a hen or a lizard.',
    explanation:'Both birds and reptiles are oviparous - they reproduce by laying eggs.' }),

  // ── Q4: Materials ────────────────────────────────────────────────────────

  makeMCQ({ id:'g6sc-pp24-012', chapterId:'g6-materials', subsection:'natural_manmade', difficulty:1,
    question:'Which of the following materials is <b>man-made</b> (not natural)?',
    options:['Glass','Leather','Cotton','Steel'], answer:'Steel',
    hint:'Think about which material is processed from iron ore in a factory.',
    explanation:'Steel is man-made (an alloy of iron and carbon). Glass can also be man-made but is derived from natural sand; steel is entirely manufactured.' }),

  makeMCQ({ id:'g6sc-pp24-013', chapterId:'g6-materials', subsection:'rusting', difficulty:2,
    question:'An experiment is set up as shown in <b>Diagram 6</b>. All the pins are made of the same material.' +
      _g6sc24('d6-rusting', 'Three test tubes side by side, each holding a pin, with the contents of each tube labelled') +
      'After a few days, which pin will <b>change colour</b>?',
    options:['Pin A only','Pin B only','Pin C only','Pins A and B'], answer:'Pin B only',
    hint:'Rusting requires both water AND air/oxygen to be in contact with iron.',
    explanation:'Pin B (in water open to air) rusts - it has both water and oxygen. Pin A is protected by the oil layer. Pin C has dry air only, no water.',
    learnMore:'Rusting is a chemical reaction: iron + water + oxygen → iron oxide (rust). The formula is <b>4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃</b>, which slowly becomes the red-brown powder we see.<br><br>Ways to prevent rusting in real life: <b>painting</b> (keeps air and water out), <b>oiling/greasing</b> (same principle as Pin A), <b>galvanising</b> (coating iron with zinc - zinc reacts with oxygen first, protecting the iron underneath), and using <b>stainless steel</b> (an alloy that resists rust).' }),

  makeMCQ({ id:'g6sc-pp24-014', chapterId:'g6-materials', subsection:'rusting', difficulty:3,
    question:'In <b>Diagram 6</b>, Pin A does not change colour.' +
      _g6sc24('d6-rusting', 'Three test tubes side by side, each holding a pin, with the contents of each tube labelled') +
      'Which of the following best explains why?',
    options:['The oil stops air reaching the iron', 'There is far too much water present', 'Iron does not rust when it is cold', 'Oil is a conductor of electricity'], answer:'The oil stops air reaching the iron',
    hint:'Rusting needs both air and water. Pin A still has water around it - so what must be missing?',
    explanation:'The oil layer sits on top of the water and acts as a barrier, preventing oxygen from reaching the iron - so rusting cannot occur.' }),

  // ── Q5: Energy ───────────────────────────────────────────────────────────

  makeMCQ({ id:'g6sc-pp24-015', chapterId:'g6-energy', subsection:'sources', difficulty:1,
    question:'<b>Diagram 7</b> shows a power station which uses heavy oil.' +
      _g6sc24('d7-power-station', 'A photograph of an industrial site with buildings and a tall chimney') +
      'What type of power station is shown in <b>Diagram 7</b>?',
    options:['Hydroelectric','Nuclear','Solar','Thermal'], answer:'Thermal',
    hint:'Burning fuel to produce heat, which drives turbines.',
    explanation:'A thermal power station burns fuel (heavy oil, coal, gas) to produce heat, which generates steam to drive turbines.',
    learnMore:'Mauritius generates most of its electricity from <b>thermal power stations</b> burning coal and heavy oil. The island is working towards more renewable energy - it has solar farms, bagasse (sugarcane waste) plants, and wind projects.<br><br>Energy transformations in a thermal station: <b>Chemical → Heat → Kinetic (steam turbine) → Electrical</b>. Each step loses some energy as waste heat, which is why power stations are only about 35–40% efficient.' }),

  makeMCQ({ id:'g6sc-pp24-016', chapterId:'g6-energy', subsection:'transfer', difficulty:2,
    question:'In a thermal power station using heavy oil, the energy transformation is: <b>___ energy → movement energy → ___ energy</b>. Which pair of words correctly fills the blanks?',
    options:['Solar → electrical','Chemical → electrical','Nuclear → light','Electrical → chemical'], answer:'Chemical → electrical',
    hint:'Burning oil releases stored energy. The final product of a power station is electricity.',
    explanation:'Heavy oil (fossil fuel) contains chemical energy. Burning it → heat → steam → movement (kinetic) → electrical energy.' }),

  makeMCQ({ id:'g6sc-pp24-017', chapterId:'g6-energy', subsection:'sources', difficulty:2,
    question:'Give one <b>disadvantage</b> of a thermal power station that burns heavy oil.',
    options:['It pollutes the air with waste gases', 'It produces completely clean energy', 'It uses a renewable energy source', 'It is very cheap to build and run'], answer:'It pollutes the air with waste gases',
    hint:'Think about what burning oil releases into the atmosphere.',
    explanation:'Burning fossil fuels releases CO₂ and other pollutants - contributing to air pollution and climate change. Oil is also non-renewable.' }),

  // ── Q2(c), Q5(b) and Q6(a): paper items that had no entry at all until the
  //    diagrams existed. Each of these is unanswerable without its picture,
  //    which is why they were skipped when the set was first written.

  makeMCQ({ id:'g6sc-pp24-018', chapterId:'g6-air', subsection:'pollution', difficulty:1,
    question:'<b>Diagram 4</b> shows a polluted area.' +
      _g6sc24('d4-pollution', 'A street scene with vehicles, people and a factory in the background') +
      'What <b>type of pollution</b> is shown in Diagram 4?',
    options:['Air pollution','Water pollution','Noise pollution','Soil pollution'], answer:'Air pollution',
    hint:'Look at what is coming out of the chimneys and the vehicles.',
    explanation:'The smoke from the factory chimneys and the exhaust fumes from the bus and cars release gases and soot into the air, so this is <b>air pollution</b>.' }),

  makeMCQ({ id:'g6sc-pp24-019', chapterId:'g6-air', subsection:'pollution', difficulty:2,
    question:'<b>Diagram 4</b> shows a polluted area.' +
      _g6sc24('d4-pollution', 'A street scene with vehicles, people and a factory in the background') +
      'Give one <b>source</b> of the pollution shown in Diagram 4.',
    options:['Exhaust fumes from vehicles','Rubbish dumped in a river','Loudspeakers in the street','Fertiliser washed off a field'],
    answer:'Exhaust fumes from vehicles',
    hint:'A source is the thing the pollution comes OUT of. Name one you can see in the picture.',
    explanation:'The bus and cars give off <b>exhaust fumes</b>, and the factory chimneys give off smoke. Both put gases and soot into the air. The other options are real kinds of pollution, but none of them is shown here.' }),

  makeMCQ({ id:'g6sc-pp24-020', chapterId:'g6-energy', subsection:'sources', difficulty:1,
    question:'<b>Diagram 8</b> shows solar panels on a roof.' +
      _g6sc24('d8-solar-panels', 'A drawing of a house with panels covering one side of the roof') +
      'What is the <b>form of energy used</b> by solar panels?',
    options:['Light energy','Heat energy from the ground','Movement energy from the wind','Chemical energy from fuel'],
    answer:'Light energy',
    hint:'What do the panels need to be pointed at to work?',
    explanation:'Solar panels convert <b>light energy</b> from the Sun into electrical energy. They stop producing electricity at night, which is their main limitation.' }),

  makeMCQ({ id:'g6sc-pp24-021', chapterId:'g6-ecosystems', subsection:'food_webs', difficulty:2,
    question:'<b>Diagram 9</b> shows an ecosystem.' +
      _g6sc24('d9-ecosystem', 'A labelled diagram of an ecosystem') +
      'Using Diagram 9, complete the food chain: <b>___ → feeds on → small fish → feeds on → ___</b>',
    options:['Algae, then big fish','Big fish, then algae','Tree, then bird','Water, then sun'],
    answer:'Algae, then big fish',
    hint:'Work out what the small fish eats, and what eats the small fish.',
    explanation:'The small fish feed on the <b>algae</b> (the producer), and the <b>big fish</b> feed on the small fish. Energy flows in the direction of the arrows, from producer to consumer.' }),

  makeMCQ({ id:'g6sc-pp24-022', chapterId:'g6-ecosystems', subsection:'habitats', difficulty:2,
    question:'<b>Diagram 9</b> shows an ecosystem.' +
      _g6sc24('d9-ecosystem', 'A labelled diagram of an ecosystem') +
      'Name one <b>non-living thing</b> in Diagram 9 on which the bird depends to survive.',
    options:['Water','Small fish','Algae','The tree'],
    answer:'Water',
    hint:'A non-living thing was never alive. Three of these four are living things.',
    explanation:'<b>Water</b> is the non-living thing the bird depends on - it drinks it and hunts in it. The small fish, the algae and the tree are all living things. The Sun is the other non-living thing shown.' })

);

// ── PDF-only pool ──────────────────────────────────────────────────────────
window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  // Was hidden behind needsArtwork until Diagram 3 was cropped from the paper -
  // "shade the part that represents nitrogen" is meaningless without the chart.
  { id:'g6sc-pp24-pdf-q2b', chapterId:'g6-air', marks:1, year:2024, grade:6, subject:'Science',
    question:'On <b>Diagram 3</b>, shade the part of the chart that represents <b>nitrogen gas</b>.' +
      _g6sc24('d3-air-pie', 'A pie chart of dry air divided into four parts, each labelled with a percentage, one slice labelled Gas P'),
    markScheme:'The largest slice - the one labelled 78.1%.',
    type:'draw' },
  { id:'g6sc-pp24-pdf-q3b', chapterId:'g6-animals', marks:3, year:2024, grade:6, subject:'Science',
    question:'State the body cover of a pigeon, a bee, and a bat (fill in table).',
    type:'short' },
  { id:'g6sc-pp24-pdf-q3d-ii', chapterId:'g6-animals', marks:2, year:2024, grade:6, subject:'Science',
    question:'Apart from its body cover, give two reasons why the bee is classified as an insect.',
    type:'short' },
  { id:'g6sc-pp24-pdf-q4a', chapterId:'g6-materials', marks:4, year:2024, grade:6, subject:'Science',
    question:'Tick (✓) whether each material is natural or man-made: Glass, Leather, Cotton, Steel.',
    type:'tick' }
);
