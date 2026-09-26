'use strict';
// PSAC Grade 4 History & Geography 2023.
// Q1A (5 map MCQs) + Q1B (3 Rodrigues MCQs) → STATIC_QUESTIONS.
// Everything else → PSAC_PDF_QUESTIONS.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g4hist-pp23-001', chapterId:'g4ge-map-skills', subsection:'using_map', difficulty:2,
    question:'<img src="assets/past-papers/g4-history-2023/map1.png" alt="Labeled map of Mauritius" style="max-width:100%;margin-bottom:8px"><br>Study Map 1 (Mauritius). District <strong>L</strong> is ___.',
    options:['Black River','Flacq','Port Louis','Savanne'],
    answer:'Flacq',
    hint:'L is on the eastern side of the island.',
    explanation:'District L is Flacq, located on the eastern coast of Mauritius. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g4hist-pp23-002', chapterId:'g4ge-map-skills', subsection:'using_map', difficulty:2,
    question:'<img src="assets/past-papers/g4-history-2023/map1.png" alt="Labeled map of Mauritius" style="max-width:100%;margin-bottom:8px"><br>Study Map 1 (Mauritius). River <strong>M</strong> is ___.',
    options:['Grand River North West','Grand River South East','Rempart River','Rivière du Poste'],
    answer:'Grand River South East',
    hint:'River M flows towards the south-east of the island.',
    explanation:'River M is the Grand River South East, one of the longest rivers in Mauritius. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g4hist-pp23-003', chapterId:'g4ge-map-skills', subsection:'using_map', difficulty:2,
    question:'<img src="assets/past-papers/g4-history-2023/map1.png" alt="Labeled map of Mauritius" style="max-width:100%;margin-bottom:8px"><br>Study Map 1 (Mauritius). Mountain Range <strong>N</strong> is ___.',
    options:['Black River Range','Grand Port Range','Moka Range','Savanne Range'],
    answer:'Grand Port Range',
    hint:'Range N is in the south-east of Mauritius.',
    explanation:'Mountain Range N is the Grand Port Range, located in the south-east of Mauritius. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g4hist-pp23-004', chapterId:'g4ge-map-skills', subsection:'using_map', difficulty:2,
    question:'<img src="assets/past-papers/g4-history-2023/map1.png" alt="Labeled map of Mauritius" style="max-width:100%;margin-bottom:8px"><br>Study Map 1 (Mauritius). The plain <strong>O</strong> is ___.',
    options:['Grand Port Plain','Flacq Plain','Plaine St. Pierre','Northern Plains'],
    answer:'Northern Plains',
    hint:'Plain O is at the top of the map, in the north.',
    explanation:'Plain O is the Northern Plains, situated in the northern part of Mauritius. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g4hist-pp23-005', chapterId:'g4ge-map-skills', subsection:'using_map', difficulty:2,
    question:'<img src="assets/past-papers/g4-history-2023/map1.png" alt="Labeled map of Mauritius" style="max-width:100%;margin-bottom:8px"><br>Study Map 1 (Mauritius). Trou d\'Eau Douce is found to the ___ of Souillac.',
    options:['North East','North West','South East','South West'],
    answer:'North East',
    hint:'Locate both towns on the map and use the north point to work out the direction.',
    explanation:'Trou d\'Eau Douce is on the east coast and Souillac is on the south coast, so Trou d\'Eau Douce is to the North East of Souillac. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g4hist-pp23-006', chapterId:'g4ge-natural-env', subsection:'relief', difficulty:1,
    question:'<img src="assets/past-papers/g4-history-2023/map2.png" alt="Labeled map of Rodrigues" style="max-width:100%;margin-bottom:8px"><br>Study Map 2 (Rodrigues). The area shaded with the diagonal pattern is ___.',
    options:['the Central Ridge','the highlands','Plaine Corail'],
    answer:'Plaine Corail',
    hint:'Look at the key to understand what the shading represents.',
    explanation:'The diagonally shaded area on the Rodrigues map is Plaine Corail, a plain in the south-west of the island. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g4hist-pp23-007', chapterId:'g4ge-natural-env', subsection:'relief', difficulty:1,
    question:'<img src="assets/past-papers/g4-history-2023/map2.png" alt="Labeled map of Rodrigues" style="max-width:100%;margin-bottom:8px"><br>Study Map 2 (Rodrigues). The nature reserve at <strong>P</strong> is ___.',
    options:['Grande Montagne Nature Reserve','Giant Tortoise Nature Reserve','Ile Cocos Nature Reserve'],
    answer:'Grande Montagne Nature Reserve',
    hint:'P is marked on the Rodrigues map near a hill in the north.',
    explanation:'The nature reserve at P is Grande Montagne Nature Reserve in Rodrigues. 📄 PSAC 2023 exam.' }),

  makeMCQ({ id:'g4hist-pp23-008', chapterId:'g4ge-map-skills', subsection:'parts_of_map', difficulty:1,
    question:'Which item on a map helps to <strong>measure distance</strong>?',
    options:['The Key','The North Point','The Scale'],
    answer:'The Scale',
    hint:'One part of the map tells you how far a centimetre on the map represents in real life.',
    explanation:'The Scale on a map shows the relationship between map distance and real distance, so it is used to measure distances. 📄 PSAC 2023 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g4hist-pp23-pdf-001', chapterId:'g4ge-weather', marks:4, year:2023, grade:4, subject:'History & Geography',
    question:'Q2: Fill in the blanks using the words in the box. Words: meteorological, scavengers, Rodrigues, bank, Indonesia, spices.', type:'write' },
  { id:'g4hist-pp23-pdf-002', chapterId:'g4hist-voyages', marks:4, year:2023, grade:4, subject:'History & Geography',
    question:'Q3: Answer in complete sentences about the voyages of discovery. (i) Name TWO things explorers were searching for. (ii) What did explorers bring back to Europe? (iii) Why was Mauritius important to sailors?', type:'write' },
  { id:'g4hist-pp23-pdf-003', chapterId:'g4hist-locality', marks:4, year:2023, grade:4, subject:'History & Geography',
    question:'Q4: Study the pictures. (i) Name the type of community shown. (ii) Write ONE service provided in your community. (iii) How do people travel to school/work in your area?', type:'write' },
  { id:'g4hist-pp23-pdf-004', chapterId:'g4ge-natural-env', marks:4, year:2023, grade:4, subject:'History & Geography',
    question:'Q5: (i) Name TWO natural features of Mauritius. (ii) Describe the Central Plateau. (iii) Write ONE reason why mountains are important.', type:'write' }
);
