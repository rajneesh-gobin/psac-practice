'use strict';
// PSAC Grade 6 Science 2022 — past-paper questions adapted to MCQ format.
// Sources: Modular 2021-2022 Q1 + Private Candidates 2021-2022 Q1.
STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6sc-pp22-001', chapterId:'g6-animals', subsection:'habitats', difficulty:1,
    question:'In a diagram of human teeth, the flat cutting teeth at the very front are labelled <b>T</b>. What are these teeth called?',
    options:['A canine','An incisor','A molar','A pre-molar'], answer:'An incisor',
    hint:'These front teeth are used to bite and cut food.',
    explanation:'Incisors are the flat, chisel-shaped teeth at the front of the mouth used to cut food. Canines are the pointed teeth beside them; molars and pre-molars are the flat back teeth used for grinding.' }),

  makeMCQ({ id:'g6sc-pp22-002', chapterId:'g6-air', subsection:'breathing', difficulty:1,
    question:'Which one of the following gases is used to <b>put out fires</b>?',
    options:['Carbon dioxide','Nitrogen','Oxygen','Water vapour'], answer:'Carbon dioxide',
    hint:'Fire extinguishers contain this gas — it smothers flames by removing oxygen.',
    explanation:'Carbon dioxide (CO₂) is used in fire extinguishers because it displaces oxygen around the fire, removing one of the three conditions needed for burning.' }),

  makeMCQ({ id:'g6sc-pp22-003', chapterId:'g6-animals', subsection:'habitats', difficulty:1,
    question:'Which one of the following meals is a <b>balanced meal</b>?',
    options:['Bread, fish, lettuce','Fish, red beans, rice','Red beans, lettuce, carrots','Red beans, fish, bread'], answer:'Bread, fish, lettuce',
    hint:'A balanced meal must contain food for energy, food for growth, AND food for health.',
    explanation:'Bread (energy) + fish (growth) + lettuce (health/vitamins) covers all three food groups. The other options lack one group — B and D have no health food; C has no food for energy.' }),

  makeMCQ({ id:'g6sc-pp22-004', chapterId:'g6-air', subsection:'wind_pressure', difficulty:2,
    question:'A suction cup is pressed onto a window pane and sticks firmly. Which statement about air pressure is true?',
    options:['Air pressure inside the suction cup is greater than outside','Air pressure inside equals air pressure outside','Air pressure inside the suction cup is less than outside','There is no air pressure outside the suction cup'], answer:'Air pressure inside the suction cup is less than outside',
    hint:'When you press the suction cup, air is pushed out. The cup sticks because of this pressure difference.',
    explanation:'Pressing the suction cup removes air from inside, so air pressure inside drops below the air pressure outside. The greater outside pressure holds the cup firmly against the surface.' }),

  makeMCQ({ id:'g6sc-pp22-005', chapterId:'g6-solar-system', subsection:'planets', difficulty:1,
    question:'What causes <b>day and night</b> on Earth?',
    options:['The rotation of the Moon around the Earth','The rotation of the Earth around the Sun','The rotation of the Moon on its axis','The rotation of the Earth on its axis'], answer:'The rotation of the Earth on its axis',
    hint:'Day and night happen every 24 hours as Earth spins.',
    explanation:'Earth rotates on its own axis once every 24 hours — one half faces the Sun (day) while the other half is in shadow (night). The revolution around the Sun causes seasons, not day and night.' }),

  makeMCQ({ id:'g6sc-pp22-006', chapterId:'g6-animals', subsection:'life_cycle', difficulty:2,
    question:'Animal Y has wings, lays eggs, has three pairs of legs, has NO feathers, and has NO hard outer shell. What is Animal Y?',
    options:['A pigeon','A butterfly','A penguin','A bat'], answer:'A butterfly',
    hint:'Three pairs of legs is the key clue — that is a feature of one animal group.',
    explanation:'Three pairs of legs (6 legs) means Animal Y is an insect — a butterfly. Pigeons and penguins are birds (feathers, 2 legs). Bats are mammals (give birth, no eggs).' }),

  makeMCQ({ id:'g6sc-pp22-007', chapterId:'g6-animals', subsection:'habitats', difficulty:1,
    question:'How many teeth are there in a full set of <b>permanent teeth</b>?',
    options:['10','16','20','32'], answer:'32',
    hint:'Milk teeth = 20. Permanent teeth = more.',
    explanation:'Adults have 32 permanent teeth: 8 incisors, 4 canines, 8 pre-molars, and 12 molars (including 4 wisdom teeth). Children have 20 milk teeth.' }),

  makeMCQ({ id:'g6sc-pp22-008', chapterId:'g6-materials', subsection:'properties', difficulty:2,
    question:'Which one of the following materials is <b>impermeable</b> (water cannot pass through it)?',
    options:['Cotton','Nylon','Silk','Wool'], answer:'Nylon',
    hint:'Impermeable materials are used to make raincoats and waterproof bags.',
    explanation:'Nylon is a synthetic (man-made) material that does not allow water to pass through — it is impermeable. Cotton, silk, and wool are natural fibres that absorb water.' }),

  makeMCQ({ id:'g6sc-pp22-009', chapterId:'g6-plants', subsection:'growth', difficulty:1,
    question:'Which one of the following is an <b>aquatic plant</b> (a plant that grows in water)?',
    options:['Fern','Lotus','Moss','Mugut'], answer:'Lotus',
    hint:'You can see this plant floating on ponds and lakes.',
    explanation:'The lotus grows rooted in pond mud with its leaves and flowers on the water surface — it is an aquatic plant. Fern and moss grow on damp land; mugut (lily of the valley) grows on dry land.' }),

  makeMCQ({ id:'g6sc-pp22-010', chapterId:'g6-plants', subsection:'parts', difficulty:2,
    question:'A diagram shows a hibiscus flower. Part <b>S</b> is at the very top of the flower\'s central column. What is the function of Part S?',
    options:['It produces pollen','It manufactures food','It attracts insects','It receives pollen'], answer:'It receives pollen',
    hint:'The very top of the central column is the female part — the stigma.',
    explanation:'Part S is the stigma (top of the pistil / female part). Its function is to receive pollen during pollination. The anthers (male part) produce pollen; petals attract insects; leaves manufacture food.' }),

  makeMCQ({ id:'g6sc-pp22-011', chapterId:'g6-ecosystems', subsection:'habitats', difficulty:1,
    question:'In the water cycle, water vapour rises, cools, and forms clouds. Water then falls from clouds back to Earth. What is this process called?',
    options:['Condensation','Evaporation','Melting','Precipitation'], answer:'Precipitation',
    hint:'This process is what we call rain or snow.',
    explanation:'Precipitation is the process of water falling from clouds as rain, hail, or snow. Evaporation is water turning to vapour; condensation is vapour turning to water droplets (forming clouds).' }),

  makeMCQ({ id:'g6sc-pp22-012', chapterId:'g6-solar-system', subsection:'day_night', difficulty:1,
    question:'Which one of the following movements is completed in <b>one year</b>?',
    options:['One complete rotation of the Moon around the Earth','One complete rotation of the Earth on its axis','One complete rotation of the Earth around the Sun','One complete rotation of the Moon on its axis'], answer:'One complete rotation of the Earth around the Sun',
    hint:'A year is the time Earth takes to travel all the way around the Sun.',
    explanation:'One complete revolution of the Earth around the Sun takes 365¼ days — one year. Earth\'s rotation on its axis takes 24 hours (day/night). The Moon orbits Earth in about 28 days.' }),

  makeMCQ({ id:'g6sc-pp22-013', chapterId:'g6-energy', subsection:'sources', difficulty:1,
    question:'Solar panels convert sunlight into electricity. Which <b>form of energy</b> do solar panels use?',
    options:['Chemical energy','Heat energy','Light energy','Movement energy'], answer:'Light energy',
    hint:'Solar panels need sunshine to work.',
    explanation:'Solar panels use light energy from the Sun and convert it directly into electrical energy. They do not need heat — they work even on cold, bright days.' }),

  makeMCQ({ id:'g6sc-pp22-014', chapterId:'g6-ecosystems', subsection:'habitats', difficulty:2,
    question:'Which one of the following birds found in Mauritius is an <b>exotic</b> (introduced, non-native) bird?',
    options:['Echo Parakeet','Pink Pigeon','Solitaire','Sparrow'], answer:'Sparrow',
    hint:'Exotic means the bird did not originally evolve in Mauritius — it was brought from elsewhere.',
    explanation:'The Sparrow is an introduced (exotic) species brought to Mauritius from other countries. The Echo Parakeet, Pink Pigeon, and Solitaire are all native or endemic to the Mascarene islands.' }),

  makeMCQ({ id:'g6sc-pp22-015', chapterId:'g6-air', subsection:'composition', difficulty:2,
    question:'Ahmad places a live cockroach in a closed jar. After some time, what happens to the amounts of oxygen and carbon dioxide in the jar?',
    options:['Oxygen decreases; carbon dioxide decreases','Oxygen increases; carbon dioxide increases','Oxygen increases; carbon dioxide decreases','Oxygen decreases; carbon dioxide increases'], answer:'Oxygen decreases; carbon dioxide increases',
    hint:'The cockroach is alive and breathing inside the sealed jar.',
    explanation:'The cockroach breathes — it uses up oxygen and releases carbon dioxide through respiration. In a closed jar, oxygen decreases and carbon dioxide increases over time.' })

);
window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g6sc-pp22-pdf-001', needsArtwork:true, chapterId:'g6-animals', marks:3, year:2022, grade:6, subject:'Science',
    question:'A diagram shows a shark, a hen, and a bat. Classify each animal into the correct group (Bird / Mammal / Fish) in a table.', type:'table' },
  { id:'g6sc-pp22-pdf-002', needsArtwork:true, chapterId:'g6-materials', marks:1, year:2022, grade:6, subject:'Science',
    question:'A diagram of a car shows the windshield, body, and bumper. One part is made of rubber. Label Part R (the rubber part) on the diagram.', type:'label' },
  { id:'g6sc-pp22-pdf-003', needsArtwork:true, chapterId:'g6-energy', marks:3, year:2022, grade:6, subject:'Science',
    question:'A diagram of a lit television set shows electrical energy as input and three arrows for output. Write down three forms of energy at the output of the television set.', type:'short' },
  { id:'g6sc-pp22-pdf-004', needsArtwork:true, chapterId:'g6-ecosystems', marks:2, year:2022, grade:6, subject:'Science',
    question:'Using the ecosystem diagram (grass, grasshoppers, chameleon, river), complete the food chain boxes: [___] feeds on grasshoppers feeds on [___].', type:'fill' }
);
