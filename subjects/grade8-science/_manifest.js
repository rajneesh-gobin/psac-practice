'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 8 - Science   ·   SYLLABUS ONLY, NO QUESTIONS YET
//
//  Chapters below are the real MIE lower-secondary syllabus, taken from the
//  National Curriculum Framework / Teaching and Learning Syllabus, Grades 7 to 9
//  (Nine-Year Continuous Basic Education, MIE). The exam at the end of Grade 9
//  is the NCE, not the PSAC.
//
//  ⚠ comingSoon STAYS true until real questions land. It makes
//    activateSubjectPack() refuse the pack, keeps it out of QuestionLoader's
//    per-grade fetch and out of assembleExamPaper(), and renders the grade card
//    as "Coming Soon" and disabled. Real chapters are NOT on their own a reason
//    to flip it - a child opening a chapter with no questions is worse than a
//    card that says the pack is not ready.
//
//  TO FILL THIS IN
//    1. Write questions/ch01_*.js files, using subjects/grade4-maths as the
//       model. IDs: g8s-<chapter>-001 style. Every question needs a
//       `subsection:` tag, and every tagged id must also be declared in
//       G8SC_SYLLABUS below - the two must match exactly per chapter.
//    2. Add each new file to LOCAL_FILES in engine/question_loader.js (file://
//       dev only - production auto-discovers) and bump _CACHE_VERSION.
//    3. Delete questions/ch01_sample.js.
//    4. Set comingSoon: false only once every chapter above has questions.
// ══════════════════════════════════════════════════════════════════════════

// Sub-topics for the Syllabus screen. Deliberately EMPTY: a subsection id
// declared here with no questions behind it advertises a topic that opens
// empty. Add ids only as questions are written and tagged.
const G8SC_SYLLABUS = {};

registerSubject({
  id: 'grade8-science', name: 'Science', grade: 8, icon: '🔬', subject: 'Science',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: true,
  practiceble: true, notesBased: false, level4Label: 'Word Problems',
  syllabus: G8SC_SYLLABUS,
  chapters: [
    { id: 'g8s-inquiry',                name: 'Scientific Inquiry',                         icon: '🔍', examWeight: 2,
      syllabus: 'Frame questions for further investigation. Work safely in the laboratory. Record data in tables, diagrams, charts and graphs. Report apparatus, method, results and conclusions. Determine the volume of an irregular solid and the density of liquids and solids.' },
    { id: 'g8s-food',                   name: 'Food & Nutrients',                           icon: '🥗', examWeight: 3,
      syllabus: 'Identify the main food groups and the nutrients they provide. Relate diet to health and to deficiency diseases. Test a food sample to identify its components. Plan a balanced diet.' },
    { id: 'g8s-mixtures',               name: 'Mixtures & Separation Techniques',           icon: '⚗️', examWeight: 3,
      syllabus: 'Recognise mixtures and their composition. Relate the uses of substances to their properties. Separate mixtures by filtration, decantation and evaporation. Explain the principle behind each technique.' },
    { id: 'g8s-digestive',              name: 'The Digestive System',                       icon: '🍽️', examWeight: 3,
      syllabus: 'Identify the parts of the human digestive system. Describe ingestion, digestion, absorption and egestion. Explain mechanical and chemical digestion. Relate the structure of the gut to its function.' },
    { id: 'g8s-respiratory',            name: 'The Respiratory System',                     icon: '🫁', examWeight: 3,
      syllabus: 'Identify the parts of the human respiratory system. Describe gas exchange in the lungs. Explain the processes of inspiration and expiration. Compare respiration in different organisms.' },
    { id: 'g8s-chem-language',          name: 'Language of Chemistry',                      icon: '🧪', examWeight: 3,
      syllabus: 'Write symbols and formulae for elements and compounds. Recognise common radicals and their valencies. Use valencies to work out chemical formulae. Write and balance word and chemical equations.' },
    { id: 'g8s-diseases',               name: 'Communicable & Non-Communicable Diseases',   icon: '🦠', examWeight: 3,
      syllabus: 'Distinguish communicable from non-communicable diseases. Describe how communicable diseases spread. Discuss substance abuse and its effects on the body. Explain measures for prevention and control.' },
    { id: 'g8s-acids',                  name: 'Acids, Bases & Salts',                       icon: '🧫', examWeight: 3,
      syllabus: 'Identify common acids and bases. Use indicators and recognise their colours in acidic and basic solutions. Investigate the reactions of acids with metals and with bases. Understand neutralisation and the formation of salts.' },
    { id: 'g8s-forces',                 name: 'Forces in Nature',                           icon: '🧲', examWeight: 3,
      syllabus: 'Understand force and how it is measured. Measure force using a spring balance. Identify the forces found in nature. Explain the effect of gravity on a mass.' },
    { id: 'g8s-pressure',               name: 'Pressure',                                   icon: '🌡️', examWeight: 2,
      syllabus: 'Define pressure and state its unit of measurement. Investigate pressure in solids, liquids and gases. Relate pressure to force and area. Solve simple problems involving pressure.' },
    { id: 'g8s-magnetism',              name: 'Magnetism & its Uses',                       icon: '🧭', examWeight: 2,
      syllabus: 'Recognise magnetic and non-magnetic materials. Investigate magnetic poles and magnetic fields. Describe the everyday uses of magnets. Carry out simple investigations on magnetism.' },
    { id: 'g8s-work-energy',            name: 'Work, Energy & Power',                       icon: '⚙️', examWeight: 3,
      syllabus: 'Define work as a force acting through a displacement. Calculate the work done. Understand power as the rate of doing work. Relate work, energy and power in everyday examples.' },
    { id: 'g8s-sts',                    name: 'Science, Technology & Society',              icon: '🌍', examWeight: 2,
      syllabus: 'Discuss the impact of diseases on society. Appreciate the role of neutralisation in medicine and in agriculture. Recognise the contribution of science and technology to humanity. Discuss the limitations of science and technology.' },
  ],
});
