'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 - Science   ·   SYLLABUS ONLY, NO QUESTIONS YET
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
//       model. IDs: g9s-<chapter>-001 style. Every question needs a
//       `subsection:` tag, and every tagged id must also be declared in
//       G9SC_SYLLABUS below - the two must match exactly per chapter.
//    2. Add each new file to LOCAL_FILES in engine/question_loader.js (file://
//       dev only - production auto-discovers) and bump _CACHE_VERSION.
//    3. Delete questions/ch01_sample.js.
//    4. Set comingSoon: false only once every chapter above has questions.
// ══════════════════════════════════════════════════════════════════════════

// Sub-topics for the Syllabus screen. Deliberately EMPTY: a subsection id
// declared here with no questions behind it advertises a topic that opens
// empty. Add ids only as questions are written and tagged.
const G9SC_SYLLABUS = {};

registerSubject({
  id: 'grade9-science', name: 'Science', grade: 9, icon: '🔬', subject: 'Science',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: true,
  practiceble: true, notesBased: false, level4Label: 'Word Problems',
  syllabus: G9SC_SYLLABUS,
  chapters: [
    { id: 'g9s-inquiry',                name: 'Scientific Inquiry',                            icon: '🔍', examWeight: 2,
      syllabus: 'Develop a simple hypothesis and test it. Conduct investigations safely in cooperation with others. Record data using appropriate tables, diagrams, charts and graphs. Process, interpret and evaluate the results of an investigation. Communicate findings in written reports and oral presentations.' },
    { id: 'g9s-c1-atmosphere',          name: 'C1 · The Atmosphere & Environment Around Us',   icon: '🌍', examWeight: 3,
      syllabus: 'Describe the causes and effects of water pollution. Explain eutrophication and its harmful effects. Identify the main air pollutants and their sources. Define greenhouse gases and relate them to global warming. Discuss measures to prevent air and water pollution.' },
    { id: 'g9s-c2-mixtures',            name: 'C2 · Mixtures & Separation Techniques',         icon: '⚗️', examWeight: 3,
      syllabus: 'Separate mixtures by crystallisation, sublimation and distillation. Draw labelled diagrams showing how each technique is carried out. Explain the principle behind each method. Choose a suitable technique for a given mixture.' },
    { id: 'g9s-c3-language',            name: 'C3 · Language of Chemistry',                    icon: '🧪', examWeight: 3,
      syllabus: 'Recognise that chemical reactions involve a rearrangement of atoms. Work out the formulae of compounds. Convert word equations into chemical equations. Write and balance chemical equations.' },
    { id: 'g9s-c4-metals',              name: 'C4 · Metals & the Reactivity Series',           icon: '🔩', examWeight: 3,
      syllabus: 'Describe the reactions of metals with oxygen, acids, water and steam. Write balanced equations for these reactions. Infer that different metals differ in reactivity. Use the reactivity series to explain and predict reactions.' },
    { id: 'g9s-c5-salts',               name: 'C5 · Salts',                                    icon: '🧂', examWeight: 3,
      syllabus: 'Define a neutralisation reaction. Identify soluble and insoluble salts. Appreciate the importance of neutralisation in everyday life. State the applications of common salts.' },
    { id: 'g9s-p1-measurements',        name: 'P1 · Measurements',                             icon: '📏', examWeight: 2,
      syllabus: 'State the SI units for length, mass, volume, time and temperature. Use appropriate instruments to measure each quantity. Compare the accuracy of simple measuring instruments. Recognise parallax error and zero error.' },
    { id: 'g9s-p2-light',               name: 'P2 · Light',                                    icon: '💡', examWeight: 3,
      syllabus: 'Distinguish between luminous and non-luminous objects. Investigate the importance of light for vision. Show that light travels in straight lines in a uniform medium. Describe reflection and state the laws of reflection. Use ray diagrams to demonstrate reflection.' },
    { id: 'g9s-p3-energy',              name: 'P3 · Energy, Heat & Temperature',               icon: '🔥', examWeight: 3,
      syllabus: 'Solve problems on the conservation of energy in simple systems. Describe electricity production from renewable and non-renewable sources. Classify energy sources as polluting or non-polluting. Compare the advantages and drawbacks of each source.' },
    { id: 'g9s-p4-motion',              name: 'P4 · Motion',                                   icon: '🏃', examWeight: 4,
      syllabus: 'Distinguish between scalars and vectors. Define distance, displacement, speed, velocity and acceleration. Plot and interpret speed-time graphs. Recognise the nature of motion from a speed-time graph. Solve problems on the motion of objects.' },
    { id: 'g9s-p5-electricity',         name: 'P5 · Electricity',                              icon: '⚡', examWeight: 4,
      syllabus: 'Recognise and draw circuit components using standard symbols. Set up simple series circuits. Measure current with an ammeter and voltage with a voltmeter. Understand current, voltage, electromotive force and resistance. Solve problems on direct current series circuits.' },
    { id: 'g9s-b1-circulatory',         name: 'B1 · Blood Circulatory System',                 icon: '🫀', examWeight: 3,
      syllabus: 'State that the circulatory system consists of blood, the heart and the blood vessels. List the components of blood and outline their functions. Compare the structure of arteries, veins and capillaries. Relate the function of each blood vessel to its structure. Discuss cardiovascular disease and its prevention.' },
    { id: 'g9s-b2-reproductive',        name: 'B2 · Reproductive System',                      icon: '👶', examWeight: 3,
      syllabus: 'Define reproduction and state its importance in living things. Distinguish between sexual and asexual reproduction. Identify and label the parts of the human reproductive systems. Understand sexually transmitted diseases and how they are prevented.' },
    { id: 'g9s-b3-biodiversity',        name: 'B3 · Biodiversity',                             icon: '🦋', examWeight: 3,
      syllabus: 'Recognise the variety of living organisms. Classify organisms using observable characteristics. Explain the importance of biodiversity. Discuss threats to biodiversity and the need for conservation.' },
    { id: 'g9s-b4-plant-nutrition',     name: 'B4 · Nutrition in Plants',                      icon: '🌱', examWeight: 3,
      syllabus: 'State that photosynthesis is the process by which green plants make their food. Write the word equation for photosynthesis. Describe how a leaf is adapted for photosynthesis. List the factors essential for photosynthesis. Carry out simple experiments to show the importance of these factors.' },
    { id: 'g9s-sts',                    name: 'Science, Technology & Society',                 icon: '🌍', examWeight: 2,
      syllabus: 'Evaluate critically the information obtained through searches and investigations. Express and justify views that are consistent with scientific evidence. Identify ethical issues associated with science and technology. Describe applications such as optical fibres in medicine and communications.' },
  ],
});
