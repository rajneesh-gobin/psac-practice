'use strict';
// PSAC Grade 5 Science October 2017 — past-paper questions adapted to MCQ format.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g5sc-pp17-001', chapterId:'plants', subsection:'parts', difficulty:1,
    question:'Which part of a plant <strong>holds the seeds</strong>?',
    options:['Flower','Fruit','Leaf','Stem'], answer:'Fruit',
    hint:'After the flower is pollinated, this part develops and contains the seeds inside.',
    explanation:'The fruit develops from the fertilised flower and holds (contains) the seeds. Examples: mango, apple, and tomato are all fruits containing seeds.' }),

  makeMCQ({ id:'g5sc-pp17-002', chapterId:'water-matter', subsection:'states', difficulty:1,
    question:'In the water cycle, what is the <strong>source of energy</strong> that causes evaporation?',
    options:['The cloud','The river','The sea','The sun'], answer:'The sun',
    hint:'Heat energy drives evaporation — this source powers everything on Earth.',
    explanation:'The sun provides the heat energy that causes water to evaporate from the surfaces of oceans, seas, rivers, and lakes into the atmosphere.' }),

  makeMCQ({ id:'g5sc-pp17-003', chapterId:'water-matter', subsection:'states', difficulty:1,
    question:'What is the <strong>temperature of ice cubes</strong> taken from a freezer?',
    options:['Above 100°C','Between 60°C and 100°C','Between 25°C and 60°C','Below 4°C'], answer:'Below 4°C',
    hint:'Water freezes at 0°C — ice from a freezer is colder than this.',
    explanation:'Ice cubes from a freezer are typically at around −18°C, which is below 4°C (and well below 0°C, the freezing point of water). The correct answer is D (below 4°C).' }),

  makeMCQ({ id:'g5sc-pp17-004', chapterId:'energy', subsection:'forms', difficulty:2,
    question:'A torch converts battery energy into light. What is the <strong>energy transformation</strong> in a torch?',
    options:['Chemical energy → movement energy','Chemical energy → light energy','Light energy → sound energy','Light energy → chemical energy'], answer:'Chemical energy → light energy',
    hint:'A torch battery stores chemical energy, and the torch produces light.',
    explanation:'In a torch, chemical energy stored in the battery is converted into electrical energy, which then becomes light energy in the bulb. The main transformation is chemical → light.' }),

  makeMCQ({ id:'g5sc-pp17-005', chapterId:'animals', subsection:'habitats', difficulty:2,
    question:'The Cape Ground Squirrel lives in open, dry, sandy environments in Africa. What is its natural <strong>habitat</strong>?',
    options:['Deserts','Rivers','Inside caves','Dense forests'], answer:'Deserts',
    hint:'This squirrel digs burrows in sandy, dry ground far from trees.',
    explanation:'The Cape Ground Squirrel lives in deserts and arid (very dry) grasslands in southern Africa. It is adapted to hot, dry conditions and digs burrows to escape the heat.' }),

  makeMCQ({ id:'g5sc-pp17-006', chapterId:'energy', subsection:'transfer', difficulty:2,
    question:'A girl plucks the strings of a guitar. Movement energy is transformed into _____ energy.',
    options:['Chemical','Electrical','Light','Sound'], answer:'Sound',
    hint:'What do you hear when she plays the guitar?',
    explanation:'When the guitar strings are plucked (movement), they vibrate and produce sound energy. The movement (kinetic) energy of her fingers becomes sound energy.' }),

  makeMCQ({ id:'g5sc-pp17-007', chapterId:'energy', subsection:'renewable', difficulty:2,
    question:'Coal is a fossil fuel. Which of the following is <strong>also a fossil fuel</strong>?',
    options:['Bagasse','Natural gas','Solar energy','Wind energy'], answer:'Natural gas',
    hint:'Among the options, which one is a fossil fuel formed from ancient organic remains found underground?',
    explanation:'Natural gas (methane) is a fossil fuel formed from ancient organic matter. Bagasse is a sugarcane by-product (biomass); solar and wind are renewable energy sources, not fossil fuels.' }),

  makeMCQ({ id:'g5sc-pp17-008', chapterId:'energy', subsection:'sources', difficulty:2,
    question:'Kevin is sick and cannot eat. Which source of energy does the <strong>human body use</strong> to carry out daily activities?',
    options:['Chemical energy (from food)','Electrical energy','Nuclear energy','Solar energy'], answer:'Chemical energy (from food)',
    hint:'The body is like a machine that runs on fuel — what is its fuel?',
    explanation:'The human body obtains energy from food, which contains chemical energy. This chemical energy is released by the body\'s cells and used for movement, warmth, and other activities.' }),

  makeMCQ({ id:'g5sc-pp17-009', chapterId:'water-matter', subsection:'states', difficulty:3,
    question:'Salt pans produce <strong>less salt in winter</strong> than in summer. Why?',
    options:['The sea contains less salt in winter.','There is less wind in winter.','There is more rain in winter which dilutes the salt pans.','There is less sunlight and heat in winter, so evaporation is slower.'], answer:'There is less sunlight and heat in winter, so evaporation is slower.',
    hint:'Salt is obtained by evaporating sea water — what affects how fast it evaporates?',
    explanation:'Salt pans work by evaporating sea water using the sun\'s heat. In winter, there is less sunlight and lower temperatures, so evaporation is slower, and less salt is obtained than in hot, sunny summer months.' }),

  makeMCQ({ id:'g5sc-pp17-010', chapterId:'electricity', subsection:'circuits', difficulty:1,
    question:'Which component of an electric circuit <strong>provides electrical energy</strong> to the circuit?',
    options:['Bulb','Dry cell (battery)','Switch','Wire'], answer:'Dry cell (battery)',
    hint:'This is the power source — without it, the circuit does not work.',
    explanation:'A dry cell (battery) provides the electrical energy needed to drive the current around the circuit. It converts chemical energy into electrical energy.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g5sc-pp17-pdf-001', chapterId:'energy', marks:4, year:2017, grade:5, subject:'Science',
    question:'Name the energy transformation for each of the following: (a) a burning candle, (b) a hydroelectric power station, (c) a solar panel on a roof, (d) a human running a race.', type:'write' },
  { id:'g5sc-pp17-pdf-002', needsArtwork:true, chapterId:'plants', marks:3, year:2017, grade:5, subject:'Science',
    question:'The diagram shows a plant in the dark for 24 hours and the same plant in sunlight for 24 hours. (a) What gas does the plant in sunlight take in? (b) What gas does it produce? (c) Why does the plant in the dark not produce food?', type:'write' },
  { id:'g5sc-pp17-pdf-003', chapterId:'water-matter', marks:3, year:2017, grade:5, subject:'Science',
    question:'Name the three states of matter that water can exist in and give an example of each. Name the process that changes water from liquid to gas.', type:'write' }
);
