'use strict';
// PSAC Grade 6 Science 2023 — past-paper questions adapted to MCQ format.
// Sources: Modular (August 2023) Q1 + Private Candidates 2023 Q1.
STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6sc-pp23-001', chapterId:'g6-animals', subsection:'classification', difficulty:1,
    question:'Which one of the following is a <b>reptile</b>?',
    options:['Butterfly','Crocodile','Dolphin','Fish'], answer:'Crocodile',
    hint:'Reptiles have dry scaly skin and are cold-blooded.',
    explanation:'Crocodiles are reptiles — scaly skin, cold-blooded, lay eggs on land. Butterflies are insects, dolphins are mammals, and fish belong to their own class.' }),

  makeMCQ({ id:'g6sc-pp23-002', chapterId:'g6-animals', subsection:'habitats', difficulty:1,
    question:'How many <b>milk teeth</b> does a child have?',
    options:['20','22','32','40'], answer:'20',
    hint:'Children have fewer teeth than adults. Adults have 32.',
    explanation:'A child has 20 milk (deciduous) teeth. These fall out and are replaced by 32 permanent teeth in adulthood.' }),

  makeMCQ({ id:'g6sc-pp23-003', chapterId:'g6-energy', subsection:'renewable', difficulty:1,
    question:'Which one of the following is a <b>non-renewable</b> source of energy?',
    options:['Bagasse','Falling water','Heavy oil','Wind'], answer:'Heavy oil',
    hint:'Non-renewable sources are fossil fuels formed over millions of years.',
    explanation:'Heavy oil is a fossil fuel and non-renewable. Bagasse (from sugarcane), falling water (hydro), and wind are all renewable — they are naturally replenished.' }),

  makeMCQ({ id:'g6sc-pp23-004', chapterId:'g6-air', subsection:'properties', difficulty:2,
    question:'A pie chart shows the composition of gases in air. The second-largest section is labelled <b>Gas X</b>. What is Gas X?',
    options:['Carbon dioxide','Water vapour','Nitrogen','Oxygen'], answer:'Oxygen',
    hint:'Nitrogen fills 78 % of air. The next biggest portion is about 21 %.',
    explanation:'Air is 78 % nitrogen (the largest sector) and 21 % oxygen (the second-largest sector). Gas X — the second-largest section — is oxygen.' }),

  makeMCQ({ id:'g6sc-pp23-005', chapterId:'g6-energy', subsection:'sources', difficulty:2,
    question:'A diagram of a thermal power station shows steam turning a turbine, which drives a machine labelled <b>Y</b> that produces electricity. What is Y?',
    options:['Dam','Generator','Steam','Turbine'], answer:'Generator',
    hint:'The turbine spins something that converts movement energy into electrical energy.',
    explanation:'In a thermal power station: burning fuel → steam → turbine spins → generator produces electricity. Y is the generator.' }),

  makeMCQ({ id:'g6sc-pp23-006', chapterId:'g6-plants', subsection:'parts', difficulty:1,
    question:'A flower has a female part and a male part. Which part <b>contains the pollen</b>?',
    options:['Female part','Male part','Leaf','Petal'], answer:'Male part',
    hint:'Pollen is produced by the male reproductive organ (anther).',
    explanation:'The male part (stamen / anther) produces and contains pollen. The female part (pistil / stigma) receives pollen during pollination.' }),

  makeMCQ({ id:'g6sc-pp23-007', chapterId:'g6-plants', subsection:'parts', difficulty:1,
    question:'The edible <b>root</b> of which plant is commonly eaten as a vegetable?',
    options:['Carrot','Papaya','Sugarcane','Vetiver'], answer:'Carrot',
    hint:'This orange vegetable grows underground.',
    explanation:'The carrot is a root vegetable. We eat its swollen taproot. Papaya (fruit), sugarcane (stem juice), and vetiver (used for soil conservation) are not eaten as roots.' }),

  makeMCQ({ id:'g6sc-pp23-008', chapterId:'g6-animals', subsection:'classification', difficulty:1,
    question:'Which one of the following is an <b>amphibian</b>?',
    options:['Dog','Frog','Snake','Spider'], answer:'Frog',
    hint:'Amphibians live both on land and in water.',
    explanation:'Frogs are amphibians — moist skin, breathe through skin and lungs, and lay eggs in water. Dogs are mammals, snakes are reptiles, spiders are arachnids.' }),

  makeMCQ({ id:'g6sc-pp23-009', chapterId:'g6-conservation', subsection:'pollution', difficulty:1,
    question:'A factory releases <b>smoke</b> from its chimneys into the atmosphere. Which type of pollution is shown?',
    options:['Air pollution','Land pollution','Noise pollution','Water pollution'], answer:'Air pollution',
    hint:'Smoke enters the atmosphere — the layer of air around the Earth.',
    explanation:'Smoke containing harmful gases and particles causes air pollution. Land, noise, and water pollution each affect different parts of the environment.' }),

  makeMCQ({ id:'g6sc-pp23-010', chapterId:'g6-ecosystems', subsection:'habitats', difficulty:2,
    question:'Which one of the following birds is <b>endemic</b> to Rodrigues?',
    options:['Pigeon','Echo Parakeet','Cardinal Jaune','Sparrow'], answer:'Cardinal Jaune',
    hint:'Endemic means found naturally nowhere else in the world.',
    explanation:'The Cardinal Jaune (Rodrigues Cardinal) is endemic to Rodrigues — it evolved there and is found nowhere else. The Echo Parakeet is endemic to Mauritius island. Pigeons and sparrows are introduced species.' }),

  makeMCQ({ id:'g6sc-pp23-011', chapterId:'g6-conservation', subsection:'pollution', difficulty:1,
    question:'Which one of the following wastes can be turned into <b>compost</b>?',
    options:['Used cells','Tin cans','Plastic bottles','Dried leaves'], answer:'Dried leaves',
    hint:'Compost is made from organic (plant or animal) material.',
    explanation:'Dried leaves are organic matter — they decompose naturally to form compost and enrich the soil. Used cells, tin cans, and plastic bottles are non-organic and cannot be composted.' }),

  makeMCQ({ id:'g6sc-pp23-012', chapterId:'g6-energy', subsection:'renewable', difficulty:1,
    question:'Which one of the following is a <b>non-renewable</b> source of energy?',
    options:['Bagasse','Coal','Sun','Tides'], answer:'Coal',
    hint:'This black fossil fuel is mined from the ground.',
    explanation:'Coal is a fossil fuel formed over millions of years — once burned it cannot be replaced (non-renewable). Bagasse, the sun, and tides are renewable sources.' }),

  makeMCQ({ id:'g6sc-pp23-013', chapterId:'g6-solar-system', subsection:'planets', difficulty:1,
    question:'What does <b>one rotation</b> of the Earth on its axis cause?',
    options:['A month','A year','Summer and winter','Day and night'], answer:'Day and night',
    hint:'The Earth spins on its axis once every 24 hours.',
    explanation:'One rotation of Earth on its axis (24 hours) causes day and night — one side faces the Sun (day), the other is in shadow (night). One revolution around the Sun (365 days) causes seasons.' }),

  makeMCQ({ id:'g6sc-pp23-014', chapterId:'g6-solar-system', subsection:'planets', difficulty:1,
    question:'How many <b>planets</b> are there in the solar system?',
    options:['2','4','6','8'], answer:'8',
    hint:'Count them: Mercury, Venus, Earth, Mars, Jupiter…',
    explanation:'There are 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. Pluto was reclassified as a dwarf planet in 2006.' }),

  makeMCQ({ id:'g6sc-pp23-015', chapterId:'g6-conservation', subsection:'pollution', difficulty:2,
    question:'Which one of the following will <b>protect beaches</b> from erosion?',
    options:['Cutting down filao trees','Building gabions','Removing sand','Removing mangroves'], answer:'Building gabions',
    hint:'Erosion is caused by waves. What structure could break the force of waves?',
    explanation:'Gabions are rock-filled wire cages placed along the shore that absorb wave energy and slow erosion. Cutting trees, removing sand, and removing mangroves all increase erosion.' })

);
window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g6sc-pp23-pdf-001', chapterId:'g6-animals', marks:4, year:2023, grade:6, subject:'Science',
    question:'Classify the food items (Bread, Carrot, Fish, Lentils, Pasta) into a table with columns: Food for energy | Food for growth | Food for health.', type:'table' },
  { id:'g6sc-pp23-pdf-002', chapterId:'g6-materials', marks:4, year:2023, grade:6, subject:'Science',
    question:'Match each material (Nylon, Gold, Cotton, Aluminium) in Column A to its correct description in Column B (is obtained from an animal / is light and used to make aeroplanes / is obtained from a plant / is a precious metal used to make jewellery / is a special type of plastic).', type:'match' },
  { id:'g6sc-pp23-pdf-003', needsArtwork:true, chapterId:'g6-plants', marks:4, year:2023, grade:6, subject:'Science',
    question:'A diagram shows a plant with Gas A entering leaves and Gas B leaving. (i) Name Gas A and Gas B. (ii) Give two other conditions (besides Gas A) needed for photosynthesis to take place.', type:'label' },
  { id:'g6sc-pp23-pdf-004', chapterId:'g6-ecosystems', marks:4, year:2023, grade:6, subject:'Science',
    question:'For each living thing shown (Cactus, Whale, Water-Lily, Bird), choose its correct habitat from the list: Pond / Trees / Sea / Rocks / Desert.', type:'match' },
  { id:'g6sc-pp23-pdf-005', needsArtwork:true, chapterId:'g6-conservation', marks:3, year:2023, grade:6, subject:'Science',
    question:'A diagram shows three types of waste: waste from plants, used plastic bottles, used cells. (i) Which waste can be turned into compost? (ii) What can be done with used plastic bottles to make them useful? (iii) Why should used cells not be thrown into the environment?', type:'short' }
);
