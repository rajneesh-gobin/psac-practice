'use strict';
// PSAC Grade 6 Science 2021 — past-paper questions adapted to MCQ format.
// Source: Modular December 2020 paper (sat as part of PSAC 2021 session).
STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6sc-pp21-001', chapterId:'g6-materials', subsection:'natural_manmade', difficulty:1,
    question:'Which one of the following is a <b>metal</b>?',
    options:['Cotton','Gold','Leather','Wool'], answer:'Gold',
    hint:'Metals are shiny, conduct electricity, and come from the earth.',
    explanation:'Gold is a metal — it is shiny, conducts electricity and heat, and is mined from the earth. Cotton and wool are plant/animal fibres; leather is an animal material.' }),

  makeMCQ({ id:'g6sc-pp21-002', chapterId:'g6-animals', subsection:'classification', difficulty:1,
    question:'Which one of the following animals is an <b>insect</b>?',
    options:['Ant','Crab','Pigeon','Spider'], answer:'Ant',
    hint:'Insects have 6 legs and 3 body parts (head, thorax, abdomen).',
    explanation:'Ants are insects — 6 legs, 3 body sections, antennae. Crabs are crustaceans (10 legs); pigeons are birds; spiders are arachnids (8 legs).' }),

  makeMCQ({ id:'g6sc-pp21-003', chapterId:'g6-plants', subsection:'parts', difficulty:1,
    question:'Which part of a plant is <b>mainly responsible</b> for manufacturing food?',
    options:['Flower','Fruit','Leaf','Root'], answer:'Leaf',
    hint:'This green part contains chlorophyll and uses sunlight.',
    explanation:'Leaves carry out photosynthesis — they contain chlorophyll that captures sunlight to convert water and carbon dioxide into food (glucose). Flowers, fruits, and roots have other roles.' }),

  makeMCQ({ id:'g6sc-pp21-004', chapterId:'g6-energy', subsection:'forms', difficulty:1,
    question:'Which form of energy is at the <b>input</b> of a television set?',
    options:['Electrical energy','Heat energy','Movement energy','Sound energy'], answer:'Electrical energy',
    hint:'You plug the television into a socket. What comes from the socket?',
    explanation:'A television is powered by electrical energy from the socket. It converts that into light, sound, and heat energy as outputs.' }),

  makeMCQ({ id:'g6sc-pp21-005', chapterId:'g6-air', subsection:'breathing', difficulty:2,
    question:'Four identical candles P, Q, R, and S are lit at the same time. Candles P, Q, and R are covered with jars of different sizes; candle S is left <b>uncovered</b>. Which candle will burn for the <b>longest</b> time?',
    options:['Candle P','Candle Q','Candle R','Candle S'], answer:'Candle S',
    hint:'Burning requires oxygen. Which candle has the most oxygen available?',
    explanation:'Candle S is uncovered and has unlimited oxygen from the surrounding air, so it burns the longest. Candles P, Q, and R will each extinguish when their limited oxygen inside the jar runs out.' }),

  makeMCQ({ id:'g6sc-pp21-006', chapterId:'g6-air', subsection:'composition', difficulty:2,
    question:'A pie chart shows the gases in dry air labelled as: Nitrogen, Carbon dioxide, Other gases, and Gas X. What is <b>Gas X</b>?',
    options:['Argon','Carbon monoxide','Nitrogen dioxide','Oxygen'], answer:'Oxygen',
    hint:'This gas makes up about 21% of air and is needed for breathing and burning.',
    explanation:'Gas X is oxygen — it makes up about 21% of air, the second-largest portion after nitrogen (78%). Oxygen is essential for respiration and combustion.' }),

  makeMCQ({ id:'g6sc-pp21-007', chapterId:'g6-air', subsection:'properties', difficulty:1,
    question:'Which gas is present in the <b>largest amount</b> in dry air?',
    options:['Carbon dioxide','Nitrogen','Oxygen','Water vapour'], answer:'Nitrogen',
    hint:'This gas makes up about 78% of the air we breathe.',
    explanation:'Nitrogen makes up approximately 78% of dry air — the largest proportion. Oxygen is next at 21%; carbon dioxide is only 0.04%; water vapour varies but is much less than nitrogen.' }),

  makeMCQ({ id:'g6sc-pp21-008', chapterId:'g6-air', subsection:'breathing', difficulty:1,
    question:'Which gas is released by <b>fire extinguishers</b> to put out fires?',
    options:['Carbon dioxide','Nitrogen','Oxygen','Water vapour'], answer:'Carbon dioxide',
    hint:'This gas smothers flames by cutting off their oxygen supply.',
    explanation:'Fire extinguishers release carbon dioxide (CO₂). It forms a blanket over the fire, displacing oxygen and extinguishing the flame by removing one of the three requirements for burning.' }),

  makeMCQ({ id:'g6sc-pp21-009', chapterId:'g6-animals', subsection:'classification', difficulty:1,
    question:'A whale and a fish both live in water. Which one is a <b>mammal</b>?',
    options:['Both the whale and the fish','The fish only','The whale only','Neither — both are fish'], answer:'The whale only',
    hint:'Mammals give birth to live young and feed them milk.',
    explanation:'The whale is a mammal — it breathes air through a blowhole, gives birth to live young, and feeds them milk. Fish breathe through gills and reproduce by laying eggs.' }),

  makeMCQ({ id:'g6sc-pp21-010', chapterId:'g6-materials', subsection:'properties', difficulty:2,
    question:'An airplane body is made of <b>aluminium</b>. Why is aluminium chosen for this part?',
    options:['It is cheap and easy to find','It is light and strong','It is transparent so pilots can see through it','It is waterproof and flexible'], answer:'It is light and strong',
    hint:'Aeroplanes must not be too heavy or they cannot fly efficiently.',
    explanation:'Aluminium is used for the airplane body because it is light (low density) and strong. Being lightweight reduces fuel consumption without sacrificing structural strength.' }),

  makeMCQ({ id:'g6sc-pp21-011', chapterId:'g6-energy', subsection:'renewable', difficulty:2,
    question:'In Mauritius, electricity is also produced using falling water. Why is falling water considered a <b>renewable</b> source of energy?',
    options:['It produces no waste at all','It is naturally replenished by the water cycle','It is cheaper than coal','It can be stored in batteries easily'], answer:'It is naturally replenished by the water cycle',
    hint:'Think about where the water in rivers and reservoirs comes from.',
    explanation:'Falling water is renewable because it is continuously replenished by the water cycle — rain refills rivers and reservoirs. It is not a fossil fuel and will not run out as long as the water cycle continues.' }),

  makeMCQ({ id:'g6sc-pp21-012', chapterId:'g6-materials', subsection:'natural_manmade', difficulty:2,
    question:'An iron nail is placed in a glass of water. After a few days a reddish-brown layer forms on the nail. What is this reddish-brown substance?',
    options:['Gold dust','Limestone','Rust','Salt'], answer:'Rust',
    hint:'Iron + water + oxygen → a reddish-brown coating.',
    explanation:'The reddish-brown substance is rust — it forms when iron reacts with both water and oxygen. This process is called rusting (or corrosion).' })

);
window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g6sc-pp21-pdf-001', needsArtwork:true, chapterId:'g6-animals', marks:3, year:2021, grade:6, subject:'Science',
    question:'A diagram shows three types of teeth (wide flat molar, pointed canine, flat chisel incisor). Write the correct tooth name under each tooth using: Canine / Incisor / Molar / Premolar.', type:'label' },
  { id:'g6sc-pp21-pdf-002', needsArtwork:true, chapterId:'g6-energy', marks:2, year:2021, grade:6, subject:'Science',
    question:'A diagram of a thermal power station shows: Heat Energy → [___] Energy → [___] Energy. Fill in the two missing forms of energy in the transformation chain.', type:'fill' },
  { id:'g6sc-pp21-pdf-003', needsArtwork:true, chapterId:'g6-materials', marks:2, year:2021, grade:6, subject:'Science',
    question:'A diagram of an airplane labels its body, windscreen, and tyres. Complete the table: Body of plane = Aluminium; Windscreen = [?]; Tyres = [?] using the materials (Rubber / Glass / Gold).', type:'table' },
  { id:'g6sc-pp21-pdf-004', chapterId:'g6-materials', marks:2, year:2021, grade:6, subject:'Science',
    question:'(i) Explain why the iron nail in a glass of water is rusting. (ii) Give two ways in which rusting can be prevented.', type:'short' },
  { id:'g6sc-pp21-pdf-005', chapterId:'g6-plants', marks:2, year:2021, grade:6, subject:'Science',
    question:'Plants are living things that manufacture their own food. Describe the process by which plants make food — include what is used and what is produced.', type:'short' }
);
