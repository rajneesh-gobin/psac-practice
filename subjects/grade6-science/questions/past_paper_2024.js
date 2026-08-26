'use strict';
// PSAC Grade 6 Science 2024 (Modular) — past-paper questions adapted to MCQ format.
// Source: Mauritius Examinations Syndicate (mauritiuspapers.co.mu).

STATIC_QUESTIONS.push(

  // ── Q1: 5 MCQs (circle the correct answer) ──────────────────────────────

  makeMCQ({ id:'g6sc-pp24-001', chapterId:'g6-animals', subsection:'habitats', difficulty:1,
    question:'Tigers eat the flesh of other animals. What type of animal is the tiger?',
    options:['Carnivorous','Granivorous','Herbivorous','Omnivorous'], answer:'Carnivorous',
    hint:'An animal that eats only meat/flesh has a specific name.',
    explanation:'Carnivorous animals eat other animals\' flesh. (Herbivores eat plants; omnivores eat both.)',
    learnMore:'Tigers are the largest wild cats in the world. They are <b>apex predators</b> — no other animal hunts them in the wild. Their striped coat acts as camouflage in tall grass.<br><br>In food chains, carnivores are always <b>secondary or tertiary consumers</b>. Without them, herbivore populations would grow unchecked, overgrazing plants and collapsing ecosystems. This is why protecting predators is important for the whole food web.' }),

  makeMCQ({ id:'g6sc-pp24-002', chapterId:'g6-materials', subsection:'natural_manmade', difficulty:1,
    question:'An umbrella has a fabric canopy stretched over metal ribs. Which material is <b>most appropriate</b> to make the fabric canopy of the umbrella?',
    options:['Glass','Plastic','Silk','Wool'], answer:'Plastic',
    hint:'The canopy must be waterproof and flexible.',
    explanation:'Plastic (synthetic fabric like nylon) is waterproof and light — ideal for an umbrella canopy. Glass breaks; wool and silk absorb water.' }),

  makeMCQ({ id:'g6sc-pp24-003', chapterId:'g6-energy', subsection:'forms', difficulty:1,
    question:'What is the form of energy <b>at the output</b> when a television set is switched on?',
    options:['Chemical','Electrical','Light','Movement'], answer:'Light',
    hint:'What can you see and hear from a television?',
    explanation:'A television converts electrical energy into light energy (and sound). Light is the visible output.' }),

  makeMCQ({ id:'g6sc-pp24-004', chapterId:'g6-air', subsection:'breathing', difficulty:1,
    question:'Which one of the following gases is necessary for <b>burning</b> to take place?',
    options:['Carbon dioxide','Nitrogen','Oxygen','Water vapour'], answer:'Oxygen',
    hint:'Fire needs this gas to burn — and it is also needed for breathing.',
    explanation:'Oxygen supports combustion (burning). Carbon dioxide actually extinguishes fires.',
    learnMore:'This explains how CO₂ fire extinguishers work: they smother the fire by <b>replacing oxygen</b> around the flame, so burning cannot continue.<br><br>Air is approximately 21% oxygen and 78% nitrogen. Nitrogen does not support burning, which is why a room full of air doesn\'t burst into flames — the nitrogen "dilutes" the oxygen. A fire in a sealed container will go out once it has used up all the available oxygen.' }),

  makeMCQ({ id:'g6sc-pp24-005', chapterId:'g6-animals', subsection:'habitats', difficulty:2,
    question:'A breakfast meal consists of cereals and milk. Which of the following food items should be added to make it a <b>balanced</b> meal?',
    options:['Apple','Bread','Lentils','Cheese'], answer:'Lentils',
    hint:'Cereals provide carbohydrates. Milk provides dairy/fats. What food group is still missing?',
    explanation:'Lentils provide protein, which is the missing food group. Apple and bread add more carbohydrates; cheese adds more fat/dairy.' }),

  // ── Q2: Air composition — MCQ-convertible sub-questions ─────────────────

  makeMCQ({ id:'g6sc-pp24-006', chapterId:'g6-air', subsection:'composition', difficulty:2,
    question:'The percentage composition of gases in dry air is approximately: nitrogen 78.1%, oxygen 21.0%, and other gases (carbon dioxide 0.03%, argon 0.87%). What is the percentage of <b>carbon dioxide</b> found in dry air?',
    options:['0.03%','0.87%','21.0%','78.1%'], answer:'0.03%',
    hint:'Carbon dioxide is a trace gas — very small amount.',
    explanation:'Carbon dioxide makes up only 0.03% of dry air.' }),

  makeMCQ({ id:'g6sc-pp24-007', chapterId:'g6-air', subsection:'properties', difficulty:2,
    question:'In dry air, one of the gases labelled <b>P</b> makes up 21.0% of the air. What is gas P?',
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
    question:'Which animal shown — a pigeon, a bee, and a bat — is a <b>mammal</b>?',
    options:['Pigeon','Bee','Bat','All three'], answer:'Bat',
    hint:'Mammals give birth to live young and feed them with milk.',
    explanation:'Bats are mammals — they are warm-blooded, have fur, and suckle their young. Pigeons are birds; bees are insects.',
    learnMore:'Bats are the <b>only mammals capable of true, powered flight</b>. They navigate in the dark using <b>echolocation</b> — sending out high-pitched sound pulses and listening to the echo to build a 3D map of their surroundings.<br><br>Mauritius has its own bat: the <b>Mauritius Flying Fox</b> (<i>Pteropus niger</i>), a large fruit bat. It is a vital pollinator and seed disperser for native forest trees, and it is now endangered. Protecting it matters for the health of Mauritian forests.' }),

  makeMCQ({ id:'g6sc-pp24-010', chapterId:'g6-animals', subsection:'habitats', difficulty:1,
    question:'To which group of animals does the <b>bee</b> belong?',
    options:['Birds','Insects','Mammals','Reptiles'], answer:'Insects',
    hint:'The bee has 6 legs and 3 body parts.',
    explanation:'Bees are insects: they have 6 legs, 3 body parts (head, thorax, abdomen), and an exoskeleton.' }),

  makeMCQ({ id:'g6sc-pp24-011', chapterId:'g6-animals', subsection:'classification', difficulty:2,
    question:'How do <b>birds and reptiles</b> reproduce?',
    options:['By giving birth to live young','By budding','By laying eggs','By spores'], answer:'By laying eggs',
    hint:'Think about what comes out of a hen or a lizard.',
    explanation:'Both birds and reptiles are oviparous — they reproduce by laying eggs.' }),

  // ── Q4: Materials ────────────────────────────────────────────────────────

  makeMCQ({ id:'g6sc-pp24-012', chapterId:'g6-materials', subsection:'natural_manmade', difficulty:1,
    question:'Which of the following materials is <b>man-made</b> (not natural)?',
    options:['Glass','Leather','Cotton','Steel'], answer:'Steel',
    hint:'Think about which material is processed from iron ore in a factory.',
    explanation:'Steel is man-made (an alloy of iron and carbon). Glass can also be man-made but is derived from natural sand; steel is entirely manufactured.' }),

  makeMCQ({ id:'g6sc-pp24-013', chapterId:'g6-materials', subsection:'rusting', difficulty:2,
    question:'Iron pins are placed in three jars: Jar A (oil + water), Jar B (water only), Jar C (dry air, corked). After a few days, which pin will <b>change colour</b> (rust)?',
    options:['Pin A only','Pin B only','Pin C only','Pins A and B'], answer:'Pin B only',
    hint:'Rusting requires both water AND air/oxygen to be in contact with iron.',
    explanation:'Pin B (in water open to air) rusts — it has both water and oxygen. Pin A is protected by the oil layer. Pin C has dry air only, no water.',
    learnMore:'Rusting is a chemical reaction: iron + water + oxygen → iron oxide (rust). The formula is <b>4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃</b>, which slowly becomes the red-brown powder we see.<br><br>Ways to prevent rusting in real life: <b>painting</b> (keeps air and water out), <b>oiling/greasing</b> (same principle as Pin A), <b>galvanising</b> (coating iron with zinc — zinc reacts with oxygen first, protecting the iron underneath), and using <b>stainless steel</b> (an alloy that resists rust).' }),

  makeMCQ({ id:'g6sc-pp24-014', chapterId:'g6-materials', subsection:'rusting', difficulty:2,
    question:'Pin A (in oil + water) does NOT rust. Which of the following best explains why?',
    options:['Oil is a conductor','The oil layer prevents air from reaching the iron','There is too much water','Iron does not rust in cold conditions'], answer:'The oil layer prevents air from reaching the iron',
    hint:'Rusting needs both oxygen (air) and water. What does the oil layer do?',
    explanation:'The oil layer sits on top of the water and acts as a barrier, preventing oxygen from reaching the iron — so rusting cannot occur.' }),

  // ── Q5: Energy ───────────────────────────────────────────────────────────

  makeMCQ({ id:'g6sc-pp24-015', chapterId:'g6-energy', subsection:'sources', difficulty:1,
    question:'A power station burns <b>heavy oil</b> to generate electricity. What type of power station is this?',
    options:['Hydroelectric','Nuclear','Solar','Thermal'], answer:'Thermal',
    hint:'Burning fuel to produce heat, which drives turbines.',
    explanation:'A thermal power station burns fuel (heavy oil, coal, gas) to produce heat, which generates steam to drive turbines.',
    learnMore:'Mauritius generates most of its electricity from <b>thermal power stations</b> burning coal and heavy oil. The island is working towards more renewable energy — it has solar farms, bagasse (sugarcane waste) plants, and wind projects.<br><br>Energy transformations in a thermal station: <b>Chemical → Heat → Kinetic (steam turbine) → Electrical</b>. Each step loses some energy as waste heat, which is why power stations are only about 35–40% efficient.' }),

  makeMCQ({ id:'g6sc-pp24-016', chapterId:'g6-energy', subsection:'transfer', difficulty:2,
    question:'In a thermal power station using heavy oil, the energy transformation is: <b>___ energy → movement energy → ___ energy</b>. Which pair of words correctly fills the blanks?',
    options:['Solar → electrical','Chemical → electrical','Nuclear → light','Electrical → chemical'], answer:'Chemical → electrical',
    hint:'Burning oil releases stored energy. The final product of a power station is electricity.',
    explanation:'Heavy oil (fossil fuel) contains chemical energy. Burning it → heat → steam → movement (kinetic) → electrical energy.' }),

  makeMCQ({ id:'g6sc-pp24-017', chapterId:'g6-energy', subsection:'sources', difficulty:2,
    question:'Give one <b>disadvantage</b> of a thermal power station that burns heavy oil.',
    options:['It produces clean energy','It releases greenhouse gases and pollutes the air','It uses a renewable source of energy','It is very cheap to build'], answer:'It releases greenhouse gases and pollutes the air',
    hint:'Think about what burning oil releases into the atmosphere.',
    explanation:'Burning fossil fuels releases CO₂ and other pollutants — contributing to air pollution and climate change. Oil is also non-renewable.' })

);

// ── PDF-only pool ──────────────────────────────────────────────────────────
window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g6sc-pp24-pdf-q2b', needsArtwork:true, chapterId:'g6-air', marks:1, year:2024, grade:6, subject:'Science',
    question:'On the pie chart of dry air composition, shade the part that represents nitrogen gas.',
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
