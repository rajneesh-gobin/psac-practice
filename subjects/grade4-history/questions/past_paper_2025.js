'use strict';
// PSAC Grade 4 History & Geography 2025.
// Q1A (5 Mauritius map MCQs) + Q1B (3 Rodrigues tick MCQs) → STATIC_QUESTIONS.
// Everything else → PSAC_PDF_QUESTIONS.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g4hist-pp25-001', chapterId:'g4ge-map-skills', subsection:'using_map', difficulty:2,
    question:'<img src="assets/past-papers/g4-history-2025/map1.png" alt="Labeled map of Mauritius" style="max-width:100%;margin-bottom:8px"><br>Study Map 1 (Mauritius). District <strong>K</strong> is ___.',
    options:['Grand Port','Flacq','Savanne','Port Louis'],
    answer:'Savanne',
    hint:'District K is in the south of the island, shown with a dotted pattern.',
    explanation:'District K is Savanne, located in the southern part of Mauritius. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g4hist-pp25-002', chapterId:'g4ge-map-skills', subsection:'using_map', difficulty:2,
    question:'<img src="assets/past-papers/g4-history-2025/map1.png" alt="Labeled map of Mauritius" style="max-width:100%;margin-bottom:8px"><br>Study Map 1 (Mauritius). Shaded Plain <strong>L</strong> is ___.',
    options:['Grand Port Plain','Flacq Plain','Northern Plains','Plaine St. Pierre'],
    answer:'Plaine St. Pierre',
    hint:'Plain L is shown with diagonal shading in the centre-west of the map.',
    explanation:'Shaded Plain L is Plaine St. Pierre, located in the central-western area of Mauritius. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g4hist-pp25-003', chapterId:'g4ge-map-skills', subsection:'using_map', difficulty:2,
    question:'<img src="assets/past-papers/g4-history-2025/map1.png" alt="Labeled map of Mauritius" style="max-width:100%;margin-bottom:8px"><br>Study Map 1 (Mauritius). Mountain <strong>M</strong> is ___.',
    options:['Tourelle du Tamarin','Le Pouce','Lion Mountain','Piton Savanne'],
    answer:'Tourelle du Tamarin',
    hint:'Mountain M is in the Black River district on the western side of the map.',
    explanation:'Mountain M is Tourelle du Tamarin, a peak in the Black River district of Mauritius. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g4hist-pp25-004', chapterId:'g4ge-map-skills', subsection:'using_map', difficulty:2,
    question:'<img src="assets/past-papers/g4-history-2025/map1.png" alt="Labeled map of Mauritius" style="max-width:100%;margin-bottom:8px"><br>Study Map 1 (Mauritius). River Citron is found in the ___ of Mauritius.',
    options:['North East','North West','South East','South West'],
    answer:'North East',
    hint:'Locate River Citron on the map and use the north point to determine its position.',
    explanation:'River Citron is found in the North East of Mauritius. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g4hist-pp25-005', chapterId:'g4ge-map-skills', subsection:'using_map', difficulty:1,
    question:'<img src="assets/past-papers/g4-history-2025/map1.png" alt="Labeled map of Mauritius" style="max-width:100%;margin-bottom:8px"><br>Study Map 1 (Mauritius). The district of Port Louis is ___ district.',
    options:['an inland','a coastal','a rural','the biggest'],
    answer:'a coastal',
    hint:'Think about whether Port Louis is on the coast or in the middle of the island.',
    explanation:'Port Louis is the capital city of Mauritius and is a coastal district, situated on the west coast. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g4hist-pp25-006', chapterId:'g4ge-natural-env', subsection:'relief', difficulty:1,
    question:'<img src="assets/past-papers/g4-history-2025/map2.png" alt="Labeled map of Rodrigues" style="max-width:100%;margin-bottom:8px"><br>Study Map 2 (Rodrigues). The harbour of Rodrigues found at <strong>X</strong> is ___.',
    options:['Plaine Corail','Port Mathurin','Pointe Canon'],
    answer:'Port Mathurin',
    hint:'X is on the north coast of Rodrigues near the main town.',
    explanation:'The harbour at X is Port Mathurin, the main town and harbour of Rodrigues. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g4hist-pp25-007', chapterId:'g4ge-natural-env', subsection:'relief', difficulty:1,
    question:'<img src="assets/past-papers/g4-history-2025/map2.png" alt="Labeled map of Rodrigues" style="max-width:100%;margin-bottom:8px"><br>Study Map 2 (Rodrigues). The highest mount <strong>Z</strong> is ___.',
    options:['Mont Limon','Mont Malartic','Mont Lubin'],
    answer:'Mont Limon',
    hint:'Z is the tallest mountain marked on the Rodrigues map.',
    explanation:'Mont Limon is the highest point in Rodrigues at 398 m. 📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g4hist-pp25-008', chapterId:'g4ge-natural-env', subsection:'relief', difficulty:1,
    question:'<img src="assets/past-papers/g4-history-2025/map2.png" alt="Labeled map of Rodrigues" style="max-width:100%;margin-bottom:8px"><br>Study Map 2 (Rodrigues). A nature reserve in Rodrigues is ___.',
    options:['Ile aux Aigrettes','Blue Bay Marine Park','Ile Cocos Nature Reserve'],
    answer:'Ile Cocos Nature Reserve',
    hint:'This nature reserve is a small island off the coast of Rodrigues.',
    explanation:'Ile Cocos Nature Reserve is a nature reserve located near Rodrigues. Ile aux Aigrettes and Blue Bay Marine Park are near the main island of Mauritius. 📄 PSAC 2025 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g4hist-pp25-pdf-001', chapterId:'g4hist-voyages', marks:4, year:2025, grade:4, subject:'History & Geography',
    question:'Q2: Fill in the blanks. Words: Europeans, ebony, extinct, spices, kovil, sapsiwaye.', type:'write' },
  { id:'g4hist-pp25-pdf-002', chapterId:'g4hist-community', marks:4, year:2025, grade:4, subject:'History & Geography',
    question:'Q3: Write about communities. (i) Name TWO types of communities in Mauritius. (ii) What services can you find in an urban community? (iii) Name ONE religious building found in Mauritius.', type:'write' },
  { id:'g4hist-pp25-pdf-003', chapterId:'g4ge-natural-env', marks:4, year:2025, grade:4, subject:'History & Geography',
    question:'Q4: (i) Name TWO types of rocks or natural materials found in Mauritius. (ii) What is a plateau? (iii) Write ONE use of rivers in Mauritius.', type:'write' },
  { id:'g4hist-pp25-pdf-004', chapterId:'g4ge-weather', marks:4, year:2025, grade:4, subject:'History & Geography',
    question:'Q5B: Study the pictures. (i) Name the material used for the roof shown. (ii) Name the type of structure shown in the second picture. (iii) What kind of building is shown? (iv) Name an instrument that measures wind speed.', type:'write', needsArtwork: true }
);
