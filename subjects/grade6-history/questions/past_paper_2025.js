'use strict';
// PSAC 2025 Grade 6 History & Geography — past-paper questions adapted to MCQ format.
// Source: Mauritius Examinations Syndicate.
// ⚠ Alt text never names the answer.

STATIC_QUESTIONS.push(

  // ── Q1: MCQ (8 marks, 1 mark each) ──────────────────────────────────────

  makeMCQ({ id:'g6hg-pp25-001', chapterId:'g6-land-use', subsection:'industry', difficulty:1,
    question:'Which of the following is an example of <b>industrial</b> land use?',
    options:['Hotels','Shops','Houses','Factories'],
    answer:'Factories',
    hint:'Industry involves manufacturing or processing goods.',
    explanation:'Factories are used for manufacturing — this is industrial land use. Hotels are tourism; shops are commercial; houses are residential.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6hg-pp25-002', chapterId:'g6-independence', subsection:'independence', difficulty:1,
    question:'Up to what age is education <b>compulsory</b> in Mauritius?',
    options:['14','15','16','17'],
    answer:'16',
    hint:'Compulsory education in Mauritius was extended after independence.',
    explanation:'Education is compulsory in Mauritius up to the age of 16.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6hg-pp25-003', chapterId:'g6-slaves-immigrants', subsection:'colonial_rule', difficulty:2,
    question:'The French brought skilled workers from which country to Mauritius?',
    options:['India','Madagascar','China','Mozambique'],
    answer:'Madagascar',
    hint:'The French colony relied on workers from a nearby island.',
    explanation:'During French rule, skilled workers were brought from Madagascar to work in Mauritius.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6hg-pp25-004', chapterId:'g6enr-symbols', subsection:'national', difficulty:2,
    question:'Who <b>composed the music</b> of the National Anthem of Mauritius?',
    options:['Jean Georges Prosper','Reverend Jean Lebrun','Philippe Gentil','Louis Bouton'],
    answer:'Jean Georges Prosper',
    hint:'The words and music of the national anthem were composed by different people.',
    explanation:'Jean Georges Prosper composed the music of the Mauritian National Anthem "Glory to thee, Motherland" and also wrote its lyrics.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6hg-pp25-005', chapterId:'g6-slaves-immigrants', subsection:'slavery', difficulty:2,
    question:'Which governor brought the first slaves to Mauritius?',
    options:['Mahé de Labourdonnais','Sir Robert Farquhar','Van Der Stel','Denis De Nyon'],
    answer:'Van Der Stel',
    hint:'The first slaves arrived during the Dutch period.',
    explanation:'Van Der Stel was the Dutch governor who brought the first slaves to Mauritius.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6hg-pp25-006', chapterId:'g6-natural-hazards', subsection:'floods', difficulty:2,
    question:'Torrential rainfall is defined as rainfall exceeding <b>___ mm in 12 hours</b>.',
    options:['90 mm','100 mm','110 mm','120 mm'],
    answer:'100 mm',
    hint:'The threshold is a round number between 90 and 120 mm.',
    explanation:'In Mauritius, torrential rainfall is officially defined as rainfall exceeding 100 mm within 12 hours.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6hg-pp25-007', chapterId:'g6-cultural-heritage', subsection:'sites', difficulty:1,
    question:'Where is the <b>Blue Penny Museum</b> located?',
    options:['Beau Plan','Vieux Grand Port','Mahebourg','Port Louis'],
    answer:'Port Louis',
    hint:'The Blue Penny Museum is in the capital city.',
    explanation:'The Blue Penny Museum, which houses the famous Blue Penny and Red Penny stamps, is located in Port Louis.',
    learnMore:'📄 PSAC 2025 exam.' }),

  makeMCQ({ id:'g6hg-pp25-008', chapterId:'g6-independence', subsection:'independence', difficulty:2,
    question:'Who was the <b>first Governor General</b> of Mauritius after independence?',
    options:['Sir Abdool Raman Osman','Sir John Shaw Rennie','Sir Gaëtan Duval','Sir Veerasamy Ringadoo'],
    answer:'Sir Abdool Raman Osman',
    hint:'The first Governor General was a Mauritian, not a British representative.',
    explanation:'Sir Abdool Raman Osman became Mauritius\'s first Governor General when the country gained independence in 1968.',
    learnMore:'📄 PSAC 2025 exam.' })

);

// ── PDF-only pool ──────────────────────────────────────────────────────────
window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(

  { id:'g6hg-pp25-pdf-q2', chapterId:'g6-land-use', marks:7, year:2025, grade:6, subject:'History & Geography',
    question:'(a) Name ONE type of pollution caused by the use of pesticides. (b) Name TWO ways of reducing waste besides Reuse. (c) How can you reuse household waste at home? Give ONE example.',
    type:'short' },

  { id:'g6hg-pp25-pdf-q3', chapterId:'g6-map-skills', marks:9, year:2025, grade:6, subject:'History & Geography',
    question:'Study the map showing tourist hotel locations. (a) In which area are most tourist hotels located? (b) Name ONE leisure activity found in Grand Baie. (c) What is ecotourism? Name ONE place in Mauritius and ONE place in Rodrigues where ecotourism is practised.',
    type:'short' },

  { id:'g6hg-pp25-pdf-q4', chapterId:'g6-slaves-immigrants', marks:7, year:2025, grade:6, subject:'History & Geography',
    question:'Complete using the words: manioc, Camp, 1835, Marrons, Le Morne. (a) Slaves mainly ate ___ as it was easy to grow. (b) Runaway slaves lived in groups in places called ___ des Noirs. (c) In ___, slavery was abolished. (d) Runaway slaves were called ___. (e) These slaves hid on the mountain of ___.',
    type:'fill-in' },

  { id:'g6hg-pp25-pdf-q5', chapterId:'g6-natural-hazards', marks:6, year:2025, grade:6, subject:'History & Geography',
    question:'(a) Explain how a volcano can be dangerous. Give TWO reasons. (b) In 2010, airports in Europe were closed. Explain why, using the word "ash cloud".',
    type:'short' },

  { id:'g6hg-pp25-pdf-q6', chapterId:'g6-independence', marks:7, year:2025, grade:6, subject:'History & Geography',
    question:'Study the Coat of Arms of Mauritius and Rodrigues. (a) The shield of the Mauritian Coat of Arms is divided into four quarters. Describe what is shown in ONE of the quarters. (b) Name ONE animal and ONE agricultural product shown on the Coat of Arms of Rodrigues.',
    type:'short' },

  { id:'g6hg-pp25-pdf-q7', chapterId:'g6-land-use', marks:6, year:2025, grade:6, subject:'History & Geography',
    question:'(a) What type of farming is pastoral farming? (b) Give ONE human factor that affects farming. (c) What type of commercial farming is practised in Rodrigues? (d) Why do farmers in hilly areas build terraces? (e) Give ONE way the government helps farmers.',
    type:'short' }

);
