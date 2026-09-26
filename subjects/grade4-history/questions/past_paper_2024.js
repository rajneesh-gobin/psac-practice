'use strict';
// PSAC Grade 4 History & Geography 2024.
// Q1A (5 Mauritius map MCQs) + Q1B (2 Rodrigues tick MCQs) → STATIC_QUESTIONS.
// Everything else → PSAC_PDF_QUESTIONS.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g4hist-pp24-001', chapterId:'g4ge-map-skills', subsection:'using_map', difficulty:2,
    question:'<img src="assets/past-papers/g4-history-2024/map1.png" alt="Labeled map of Mauritius" style="max-width:100%;margin-bottom:8px"><br>Study Map 1 (Mauritius). Mountain range <strong>Q</strong> is the ___.',
    options:['Black River Range','Grand Port Range','Moka Range','Savanne Range'],
    answer:'Moka Range',
    hint:'Range Q is in the centre of the map.',
    explanation:'Mountain range Q is the Moka Range, situated in the central region of Mauritius. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g4hist-pp24-002', chapterId:'g4ge-map-skills', subsection:'using_map', difficulty:2,
    question:'<img src="assets/past-papers/g4-history-2024/map1.png" alt="Labeled map of Mauritius" style="max-width:100%;margin-bottom:8px"><br>Study Map 1 (Mauritius). Which mountain peak is found in mountain range <strong>Q</strong>?',
    options:['Corps de Garde','Le Pouce','Lion Mountain','Piton Savanne'],
    answer:'Le Pouce',
    hint:'Le Pouce is one of the most recognisable peaks in central Mauritius.',
    explanation:'Le Pouce is a mountain peak found in the Moka Range (range Q) in central Mauritius. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g4hist-pp24-003', chapterId:'g4ge-map-skills', subsection:'using_map', difficulty:2,
    question:'<img src="assets/past-papers/g4-history-2024/map1.png" alt="Labeled map of Mauritius" style="max-width:100%;margin-bottom:8px"><br>Study Map 1 (Mauritius). Plain <strong>N</strong> is ___.',
    options:['Flacq Plain','Grand Port Plain','Northern Plains','Plaine St. Pierre'],
    answer:'Flacq Plain',
    hint:'Plain N is on the eastern side of the island.',
    explanation:'Plain N is the Flacq Plain, located in the eastern district of Mauritius. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g4hist-pp24-004', chapterId:'g4ge-map-skills', subsection:'using_map', difficulty:2,
    question:'<img src="assets/past-papers/g4-history-2024/map1.png" alt="Labeled map of Mauritius" style="max-width:100%;margin-bottom:8px"><br>Study Map 1 (Mauritius). The nature reserve <strong>P</strong> is ___.',
    options:['Black River Gorges National Park','Blue Bay Marine Park','Ile aux Aigrettes','Vallée de Ferney'],
    answer:'Black River Gorges National Park',
    hint:'P is in the south-west, in the highlands area.',
    explanation:'The nature reserve P is Black River Gorges National Park in the Black River district. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g4hist-pp24-005', chapterId:'g4ge-map-skills', subsection:'using_map', difficulty:2,
    question:'<img src="assets/past-papers/g4-history-2024/map1.png" alt="Labeled map of Mauritius" style="max-width:100%;margin-bottom:8px"><br>Study Map 1 (Mauritius). Le Morne is found to the ___ of Trois Mamelles.',
    options:['North East','North West','South East','South West'],
    answer:'South West',
    hint:'Le Morne is on the south-western tip of Mauritius; Trois Mamelles is more central.',
    explanation:'Le Morne is to the South West of Trois Mamelles on the map of Mauritius. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g4hist-pp24-006', chapterId:'g4ge-map-skills', subsection:'symbols', difficulty:1,
    question:'<img src="assets/past-papers/g4-history-2024/map2.png" alt="Labeled map of Rodrigues" style="max-width:100%;margin-bottom:8px"><br>Study Map 2 (Rodrigues). From the key, the dotted symbol on Map 2 shows a ___.',
    options:['mount','plain','river'],
    answer:'plain',
    hint:'Check the key — each symbol matches a landscape feature.',
    explanation:'The dotted pattern in the map key represents a plain in Rodrigues. 📄 PSAC 2024 exam.' }),

  makeMCQ({ id:'g4hist-pp24-007', chapterId:'g4ge-map-skills', subsection:'using_map', difficulty:1,
    question:'<img src="assets/past-papers/g4-history-2024/map2.png" alt="Labeled map of Rodrigues" style="max-width:100%;margin-bottom:8px"><br>Study Map 2 (Rodrigues). The distance from Port Mathurin to Mont Grenade is ___.',
    options:['3 km','5 km','7 km'],
    answer:'5 km',
    hint:'Use the scale on the map to measure the distance.',
    explanation:'Using the map scale, the distance from Port Mathurin to Mont Grenade is 5 km. 📄 PSAC 2024 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g4hist-pp24-pdf-001', chapterId:'g4hist-voyages', marks:4, year:2024, grade:4, subject:'History & Geography',
    question:'Q2: Study the pictures. (a) Name the activity shown in each picture (swimming, growing cinnamon). (b) Name an animal that lived only in Mauritius and is now extinct. (c) Name a museum where you can learn about Mauritius history.', type:'write', needsArtwork: true },
  { id:'g4hist-pp24-pdf-002', chapterId:'g4hist-community', marks:4, year:2024, grade:4, subject:'History & Geography',
    question:'Q3: Write about your community. (i) Name your community type (urban/rural). (ii) Write TWO services in your community. (iii) How do people work together in your community?', type:'write' },
  { id:'g4hist-pp24-pdf-003', chapterId:'g4ge-natural-env', marks:4, year:2024, grade:4, subject:'History & Geography',
    question:'Q4: Fill in the blanks. Words: instruments, confluence, mountain, summer, native, pavements.', type:'write' },
  { id:'g4hist-pp24-pdf-004', chapterId:'g4ge-weather', marks:4, year:2024, grade:4, subject:'History & Geography',
    question:'Q5: Write about the weather in Mauritius. (i) Name TWO seasons in Mauritius. (ii) What is a cyclone? (iii) Write ONE way people protect themselves during a cyclone.', type:'write' }
);
