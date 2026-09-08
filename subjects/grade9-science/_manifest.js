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

// Sub-topics for the Syllabus screen.
//
// ⚠ These are TAGGING TARGETS, declared ahead of the questions on purpose.
//   Every id below is transcribed from the "Proposed subsections" lines in
//   docs/nce-grade9/syllabus-science.md, which derives them outcome by outcome
//   from the NCF Grades 7-9 syllabus with the printed/PDF page recorded against
//   each chapter. Nothing here is invented, and the names are the syllabus's
//   own wording rather than a title-cased version of the id.
//
// ⚠ THIS PACK MUST NOT GO LIVE UNTIL EVERY ID BELOW HAS QUESTIONS. A declared
//   subsection with nothing behind it advertises a topic that opens empty —
//   which is why this map used to be `{}`. It is safe now only because
//   comingSoon keeps the whole pack out of activateSubjectPack(), the per-grade
//   fetch and assembleExamPaper(). scripts/test-subsection-invariant.js checks
//   LIVE packs only, so it starts enforcing this the moment the flag flips:
//   every declared id must have questions AND every tagged id must be declared.
//   Delete an id you decide not to cover; do not leave it here empty.
//
// ⚠ audit-content-coverage.js reports any declared subsection under 20
//   questions as a permanent gap. 92 subsections is therefore a target of
//   ~1,840 questions if every one is filled to that bar.
//
// ⚠⚠ examWeight WAS REDERIVED 2026-09-08. It had been hand-set — almost every
//   chapter at 3 — and summed to 47, not 40.
//   ⚠ A sum over 40 is not cosmetic. assembleExamPaper() reconciles with
//   `while (total > count) { const i = weights.findIndex(w => w.n > 1); … }`,
//   which always decrements the FIRST chapter in list order, so the surplus is
//   shed off the top of the list rather than spread. Measured on grade9-maths
//   the same day: at a sum of 52 its heaviest chapter was dealt ONE question
//   instead of eight, while test-exam-paper-shape.js passed throughout because
//   the paper still totalled 40. The distortion is in the distribution.
//
//   THE DERIVATION. Biology, Chemistry and Physics are THREE SEPARATE NCE
//   papers, so they take equal shares — 12 each, 36 in total — and Scientific
//   Inquiry and STS take the remaining 4 between them. Within each component the
//   split is the measured five-year topic weighting from blueprint-science.md
//   (§B.5, §C.5, §P.5), largest-remainder to 12.
//   ⚠ Biology's five measured topics map onto four chapters: "Disease, HIV/AIDS
//   & STDs" (8.8%) is folded into B2 Reproductive, where the `stds` subsection
//   already lives — 18.0 + 8.8 = 26.8%.
//   ⚠ C5 Salts drops to the floor of 1 on 9.6%, and that number is rising every
//   year (0 → 4 → 5 → 7 → 8 marks, the only clear directional trend in the whole
//   corpus). Revisit it when a 2026 paper exists rather than treating 1 as settled.
const G9SC_SYLLABUS = {
  'g9s-inquiry': { subsections: [
    { id: 'hypothesis_testing',    name: 'Developing and testing a simple hypothesis' },
    { id: 'lab_safety',            name: 'Conducting investigations safely and cooperatively' },
    { id: 'recording_data',        name: 'Recording data in tables, diagrams, charts and graphs' },
    { id: 'interpreting_results',  name: 'Processing, interpreting and evaluating results' },
    { id: 'formula_rearrangement', name: 'Finding a missing quantity from a simple relationship' },
    { id: 'reporting_findings',    name: 'Communicating steps and results in reports and presentations' },
    { id: 'research_and_ict',      name: 'Using print, electronic and ICT resources' },
  ] },
  'g9s-c1-atmosphere': { subsections: [
    { id: 'water_pollution',  name: 'Causes and effects of water pollution, and how to prevent it' },
    { id: 'eutrophication',   name: 'Eutrophication and its harmful effects' },
    { id: 'air_pollutants',   name: 'Air pollutants: carbon monoxide, oxides of nitrogen, sulfur dioxide, CFCs and smoke' },
    { id: 'greenhouse_gases', name: 'Greenhouse gases: carbon dioxide, methane and heat retention' },
    { id: 'acid_rain',        name: 'Causes and harmful effects of acid rain' },
    { id: 'global_warming',   name: 'Global warming, its mechanism, and climate change' },
  ] },
  'g9s-c2-mixtures': { subsections: [
    { id: 'crystallization',       name: 'Crystallization' },
    { id: 'sublimation',           name: 'Sublimation' },
    { id: 'distillation',          name: 'Distillation' },
    { id: 'apparatus_diagrams',    name: 'Labelled illustrations of each technique' },
    { id: 'choosing_a_technique',  name: 'Choosing a technique, and the principle behind it' },
  ] },
  'g9s-c3-language': { subsections: [
    { id: 'rearrangement_of_atoms', name: 'Chemical reactions as a rearrangement of atoms' },
    { id: 'formulae_of_compounds',  name: 'Working out formulae of compounds' },
    { id: 'word_equations',         name: 'Converting word equations to chemical equations' },
    { id: 'balancing_equations',    name: 'Writing and balancing chemical equations' },
  ] },
  'g9s-c4-metals': { subsections: [
    { id: 'metals_with_oxygen',      name: 'Reactions of metals with oxygen' },
    { id: 'metals_with_acids',       name: 'Reactions of metals with acids' },
    { id: 'metals_with_water_steam', name: 'Reactions of metals with water and steam' },
    { id: 'reactivity_series',       name: 'The reactivity series of metals' },
    { id: 'predicting_reactions',    name: 'Using the reactivity series to explain reactions with air, water and dilute acids' },
    { id: 'equations_for_metals',    name: 'Balanced equations for reactions of metals' },
  ] },
  'g9s-c5-salts': { subsections: [
    { id: 'neutralisation',               name: 'Defining neutralisation' },
    { id: 'soluble_insoluble',            name: 'Soluble and insoluble salts' },
    { id: 'neutralisation_in_daily_life', name: 'Neutralisation in indigestion, insect stings, agriculture and acid rain' },
    { id: 'uses_of_salts',                name: 'Applications of named salts' },
  ] },
  'g9s-p1-measurements': { subsections: [
    { id: 'si_units',                name: 'SI units for length, mass, volume, time and temperature' },
    { id: 'measuring_instruments',   name: 'Choosing the right instrument for each quantity' },
    { id: 'accuracy_of_instruments', name: 'Comparing the accuracy of simple instruments' },
    { id: 'measurement_errors',      name: 'Parallax error and zero (end) error' },
  ] },
  'g9s-p2-light': { subsections: [
    { id: 'luminous_objects',        name: 'Luminous and non-luminous objects' },
    { id: 'light_and_vision',        name: 'Light and vision; stars, planets and moons' },
    { id: 'rectilinear_propagation', name: 'Light travels in straight lines in a uniform medium' },
    { id: 'reflection',              name: 'Reflection of light' },
    { id: 'laws_of_reflection',      name: 'The laws of reflection' },
    { id: 'ray_diagrams',            name: 'Ray diagrams' },
  ] },
  'g9s-p3-energy': { subsections: [
    { id: 'conservation_of_energy',   name: 'Conservation of energy in simple systems' },
    { id: 'energy_problems',          name: 'Energy problems: falling objects and the pendulum' },
    { id: 'electricity_production',   name: 'How electricity is produced' },
    { id: 'renewable_sources',        name: 'Renewable energy sources' },
    { id: 'non_renewable_sources',    name: 'Non-renewable energy sources' },
    { id: 'comparing_energy_sources', name: 'Polluting and non-polluting sources: advantages and drawbacks' },
  ] },
  'g9s-p4-motion': { subsections: [
    { id: 'scalars_vectors',       name: 'Scalars and vectors' },
    { id: 'distance_displacement', name: 'Distance and displacement' },
    { id: 'speed_velocity',        name: 'Speed and velocity' },
    { id: 'acceleration',          name: 'Acceleration' },
    { id: 'speed_time_graphs',     name: 'Plotting and interpreting speed-time graphs' },
    { id: 'motion_problems',       name: 'Problems on the motion of objects' },
  ] },
  'g9s-p5-electricity': { subsections: [
    { id: 'circuit_symbols',            name: 'Circuit components and standard symbols' },
    { id: 'series_circuits',            name: 'Setting up simple series circuits' },
    { id: 'measuring_current_voltage',  name: 'Measuring current with an ammeter and voltage with a voltmeter' },
    { id: 'current_voltage_resistance', name: 'Current, voltage, emf and resistance' },
    { id: 'charge_and_current',         name: 'Current as the rate of flow of charge: Q = It' },
    { id: 'potential_difference',       name: 'Potential difference as work done per unit charge: W = QV' },
    { id: 'dc_circuit_problems',        name: 'Problems on simple DC series circuits' },
  ] },
  'g9s-b1-circulatory': { subsections: [
    { id: 'circulatory_overview',     name: 'Blood, the heart and the blood vessels' },
    { id: 'components_of_blood',      name: 'Plasma, red cells, white cells and platelets' },
    { id: 'blood_vessels',            name: 'Arteries, veins and capillaries: structure and function' },
    { id: 'magnification',            name: 'Calculating the magnification of drawings of blood cells' },
    { id: 'pulse',                    name: 'Defining a pulse and locating a pulse point' },
    { id: 'cardiovascular_disease',   name: 'Stroke and heart attack: contributing factors and prevention' },
    { id: 'interpreting_health_data', name: 'Interpreting graphs on cardiovascular disease' },
  ] },
  'g9s-b2-reproductive': { subsections: [
    { id: 'reproduction_basics',       name: 'Defining reproduction and its importance' },
    { id: 'sexual_asexual',            name: 'Sexual and asexual reproduction' },
    { id: 'male_reproductive_system',  name: 'Parts and functions of the male reproductive system' },
    { id: 'female_reproductive_system',name: 'Parts and functions of the female reproductive system' },
    { id: 'stds',                      name: 'STDs, including HIV/AIDS and syphilis' },
    { id: 'interpreting_health_data',  name: 'Interpreting graphs related to STDs' },
  ] },
  'g9s-b3-biodiversity': { subsections: [
    { id: 'what_is_biodiversity',       name: 'What biodiversity is' },
    { id: 'importance_of_biodiversity', name: 'Why biodiversity matters' },
    { id: 'quadrat_sampling',           name: 'Using quadrats to estimate species in an ecosystem' },
    { id: 'natural_threats',            name: 'Natural calamities: cyclones and droughts' },
    { id: 'human_threats',              name: 'Deforestation, pollution, habitat degradation and invasive alien species' },
  ] },
  'g9s-b4-plant-nutrition': { subsections: [
    { id: 'photosynthesis',             name: 'Photosynthesis: how green plants make their food' },
    { id: 'word_equation',              name: 'The word equation for photosynthesis' },
    { id: 'leaf_adaptation',            name: 'How a leaf is adapted for photosynthesis' },
    { id: 'factors_for_photosynthesis', name: 'The factors essential for photosynthesis' },
    { id: 'photosynthesis_experiments', name: 'Simple experiments showing why those factors matter' },
  ] },
  'g9s-sts': { subsections: [
    { id: 'christiaan_barnard',             name: 'Heart transplant and the work of Christiaan Barnard' },
    { id: 'applications_of_distillation',   name: 'Distillation: crude oil, air, essential oils and distilleries' },
    { id: 'applications_of_chromatography', name: 'Chromatography: drugs in sport, pesticides, food contaminants and purity' },
    { id: 'climate_change',                 name: 'Global warming and climate change: impacts, hazards and measures' },
    { id: 'interpreting_climate_data',      name: 'Correlating global temperature with atmospheric carbon dioxide' },
    { id: 'evaluating_information',         name: 'Evaluating information from searches and investigations critically' },
    { id: 'ethics_of_science',              name: 'Ethical issues in applications of science and technology' },
    { id: 'optical_fibres',                 name: 'Optical fibres in medicine and communications' },
  ] },
};

registerSubject({
  id: 'grade9-science', name: 'Science', grade: 9, icon: '🔬', subject: 'Science',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: false,
  practiceble: true, notesBased: false, level4Label: 'Word Problems',
  syllabus: G9SC_SYLLABUS,
  chapters: [
    { id: 'g9s-inquiry',                name: 'Scientific Inquiry',                            icon: '🔍', examWeight: 2,
      syllabus: 'Develop a simple hypothesis and test it. Conduct investigations safely in cooperation with others. Record data using appropriate tables, diagrams, charts and graphs. Process, interpret and evaluate the results of an investigation. Communicate findings in written reports and oral presentations.' },
    { id: 'g9s-c1-atmosphere',          name: 'C1 · The Atmosphere & Environment Around Us',   icon: '🌍', examWeight: 3,
      syllabus: 'Describe the causes and effects of water pollution. Explain eutrophication and its harmful effects. Identify the main air pollutants and their sources. Define greenhouse gases and relate them to global warming. Discuss measures to prevent air and water pollution.' },
    { id: 'g9s-c2-mixtures',            name: 'C2 · Mixtures & Separation Techniques',         icon: '⚗️', examWeight: 2,
      syllabus: 'Separate mixtures by crystallisation, sublimation and distillation. Draw labelled diagrams showing how each technique is carried out. Explain the principle behind each method. Choose a suitable technique for a given mixture.' },
    { id: 'g9s-c3-language',            name: 'C3 · Language of Chemistry',                    icon: '🧪', examWeight: 3,
      syllabus: 'Recognise that chemical reactions involve a rearrangement of atoms. Work out the formulae of compounds. Convert word equations into chemical equations. Write and balance chemical equations.' },
    { id: 'g9s-c4-metals',              name: 'C4 · Metals & the Reactivity Series',           icon: '🔩', examWeight: 3,
      syllabus: 'Describe the reactions of metals with oxygen, acids, water and steam. Write balanced equations for these reactions. Infer that different metals differ in reactivity. Use the reactivity series to explain and predict reactions.' },
    { id: 'g9s-c5-salts',               name: 'C5 · Salts',                                    icon: '🧂', examWeight: 1,
      syllabus: 'Define a neutralisation reaction. Identify soluble and insoluble salts. Appreciate the importance of neutralisation in everyday life. State the applications of common salts.' },
    { id: 'g9s-p1-measurements',        name: 'P1 · Measurements',                             icon: '📏', examWeight: 3,
      syllabus: 'State the SI units for length, mass, volume, time and temperature. Use appropriate instruments to measure each quantity. Compare the accuracy of simple measuring instruments. Recognise parallax error and zero error.' },
    { id: 'g9s-p2-light',               name: 'P2 · Light',                                    icon: '💡', examWeight: 2,
      syllabus: 'Distinguish between luminous and non-luminous objects. Investigate the importance of light for vision. Show that light travels in straight lines in a uniform medium. Describe reflection and state the laws of reflection. Use ray diagrams to demonstrate reflection.' },
    { id: 'g9s-p3-energy',              name: 'P3 · Energy, Heat & Temperature',               icon: '🔥', examWeight: 2,
      syllabus: 'Solve problems on the conservation of energy in simple systems. Describe electricity production from renewable and non-renewable sources. Classify energy sources as polluting or non-polluting. Compare the advantages and drawbacks of each source.' },
    { id: 'g9s-p4-motion',              name: 'P4 · Motion',                                   icon: '🏃', examWeight: 3,
      syllabus: 'Distinguish between scalars and vectors. Define distance, displacement, speed, velocity and acceleration. Plot and interpret speed-time graphs. Recognise the nature of motion from a speed-time graph. Solve problems on the motion of objects.' },
    { id: 'g9s-p5-electricity',         name: 'P5 · Electricity',                              icon: '⚡', examWeight: 2,
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
