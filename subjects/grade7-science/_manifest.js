'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 7 - Science   ·   SYLLABUS ONLY, NO QUESTIONS YET
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
//       model. IDs: g7s-<chapter>-001 style. Every question needs a
//       `subsection:` tag, and every tagged id must also be declared in
//       G7SC_SYLLABUS below - the two must match exactly per chapter.
//    2. Add each new file to LOCAL_FILES in engine/question_loader.js (file://
//       dev only - production auto-discovers) and bump _CACHE_VERSION.
//    3. Delete questions/ch01_sample.js.
//    4. Set comingSoon: false only once every chapter above has questions.
// ══════════════════════════════════════════════════════════════════════════

// Sub-topics for the Syllabus screen. Deliberately EMPTY: a subsection id
// declared here with no questions behind it advertises a topic that opens
// empty. Add ids only as questions are written and tagged.
const G7SC_SYLLABUS = {
  'g7s-inquiry': { subsections: [
    { id:'lab_safety',       name:'Lab Safety' },
    { id:'investigations',   name:'Scientific Investigations' },
    { id:'data_recording',   name:'Recording Data' },
  ]},
  'g7s-measurement': { subsections: [
    { id:'si_units',                 name:'SI Units' },
    { id:'measuring_instruments',    name:'Measuring Instruments' },
    { id:'calculating_measurements', name:'Calculating Measurements' },
  ]},
  'g7s-cells': { subsections: [
    { id:'cell_characteristics', name:'Cell Characteristics' },
    { id:'cell_parts',           name:'Cell Parts & Functions' },
    { id:'animal_plant_cells',   name:'Animal vs Plant Cells' },
  ]},
  'g7s-matter': { subsections: [
    { id:'states_of_matter',  name:'States of Matter' },
    { id:'properties_states', name:'Properties of States' },
    { id:'changes_of_state',  name:'Changes of State' },
  ]},
  'g7s-solar-system': { subsections: [
    { id:'planets',               name:'The Planets' },
    { id:'solar_system_structure',name:'Solar System Structure' },
    { id:'planet_characteristics',name:'Planet Characteristics' },
  ]},
  'g7s-electricity': { subsections: [
    { id:'circuit_parts',   name:'Circuit Components' },
    { id:'circuit_symbols', name:'Circuit Symbols' },
    { id:'simple_circuits', name:'Simple Circuits' },
  ]},
  'g7s-ecosystem': { subsections: [
    { id:'ecosystem_types',   name:'Types of Ecosystems' },
    { id:'ecosystem_balance', name:'Ecosystem Balance' },
    { id:'human_impact',      name:'Human Impact' },
  ]},
  'g7s-elements': { subsections: [
    { id:'elements_symbols', name:'Elements & Symbols' },
    { id:'periodic_table',   name:'The Periodic Table' },
    { id:'metals_nonmetals', name:'Metals vs Non-metals' },
  ]},
  'g7s-air': { subsections: [
    { id:'composition_air',   name:'Composition of Air' },
    { id:'oxygen_co2_tests',  name:'Tests for Oxygen & CO₂' },
    { id:'air_properties',    name:'Properties of Air' },
  ]},
  'g7s-biodiversity': { subsections: [
    { id:'classifying_organisms',       name:'Classifying Organisms' },
    { id:'vertebrates_invertebrates',   name:'Vertebrates & Invertebrates' },
    { id:'plant_types',                 name:'Types of Plants' },
  ]},
  'g7s-food-chains': { subsections: [
    { id:'feeding_relationships', name:'Feeding Relationships' },
    { id:'food_chains',           name:'Food Chains & Webs' },
    { id:'energy_flow',           name:'Energy Flow' },
  ]},
  'g7s-changes': { subsections: [
    { id:'physical_changes',  name:'Physical Changes' },
    { id:'chemical_changes',  name:'Chemical Changes' },
    { id:'examples_changes',  name:'Examples of Changes' },
  ]},
  'g7s-energy': { subsections: [
    { id:'forms_energy',           name:'Forms of Energy' },
    { id:'energy_transformation',  name:'Energy Transformation' },
    { id:'renewable_nonrenewable', name:'Renewable & Non-renewable Sources' },
  ]},
  'g7s-sts': { subsections: [
    { id:'science_technology', name:'Science & Technology' },
    { id:'discoveries',        name:'Key Discoveries' },
    { id:'sustainability',     name:'Sustainability' },
  ]},
};

registerSubject({
  id: 'grade7-science', name: 'Science', grade: 7, icon: '🔬', subject: 'Science',
  curriculum: 'MIE Mauritius (NCF Grades 7-9)', comingSoon: false,
  practiceble: true, notesBased: false, level4Label: 'Word Problems',
  syllabus: G7SC_SYLLABUS,
  chapters: [
    { id: 'g7s-inquiry',                name: 'Scientific Inquiry',               icon: '🔍', examWeight: 2,
      syllabus: 'Understand the different fields of science. Work safely in the laboratory and in the field. Ask meaningful questions and carry out simple investigations. Record and represent data in tables, diagrams, charts and graphs. Draw inferences and conclusions from evidence.' },
    { id: 'g7s-measurement',            name: 'Measurement',                      icon: '📏', examWeight: 3,
      syllabus: 'Understand fundamental physical quantities and their SI units. Choose the right instrument for each quantity. Measure length, mass, time, volume and temperature. Calculate area and volume from measurements.' },
    { id: 'g7s-cells',                  name: 'Cells & Cell Structures',          icon: '🔬', examWeight: 3,
      syllabus: 'State the basic characteristics of living things. Recognise that all living organisms are made of cells. Identify the parts of animal and plant cells under a microscope. Compare the structure of animal and plant cells. Describe the organisation from cell to organism.' },
    { id: 'g7s-matter',                 name: 'Matter',                           icon: '🧊', examWeight: 3,
      syllabus: 'Recognise that everything around us is made of matter. Understand that matter has mass and occupies space. Investigate the properties of the three states of matter. Explain changes of state using particle models.' },
    { id: 'g7s-solar-system',           name: 'The Solar System',                 icon: '🪐', examWeight: 2,
      syllabus: 'Describe the Sun, the planets, planetary satellites, comets and asteroids. Draw a labelled diagram of the solar system. Compare the characteristics of the planets. Use two- and three-dimensional models of the solar system.' },
    { id: 'g7s-electricity',            name: 'Electricity',                      icon: '⚡', examWeight: 3,
      syllabus: 'Discuss the importance and main uses of electricity. Identify the main parts of an electric circuit. Recognise cells, batteries, bulbs, switches and resistors. Draw circuits using conventional symbols. Investigate the workings of simple circuits.' },
    { id: 'g7s-ecosystem',              name: 'Ecosystems',                       icon: '🌿', examWeight: 3,
      syllabus: 'Explain the basic concepts of an ecosystem. Identify aquatic, terrestrial and wetland ecosystems. List the factors that affect the balance of an ecosystem. Discuss the impact of human activities. Suggest ways an ecosystem can be protected.' },
    { id: 'g7s-elements',               name: 'Elements, Compounds & Mixtures',   icon: '⚗️', examWeight: 3,
      syllabus: 'Identify elements as the building blocks of matter. Use chemical symbols to represent elements. Recognise the Periodic Table as a classification of elements. Compare the properties of metals and non-metals. Distinguish between mixtures and compounds.' },
    { id: 'g7s-air',                    name: 'Air',                              icon: '💨', examWeight: 2,
      syllabus: 'Identify the components of pure air and their percentage composition. Describe the laboratory preparation of oxygen and carbon dioxide. Test for the presence of oxygen and carbon dioxide.' },
    { id: 'g7s-biodiversity',           name: 'Biodiversity',                     icon: '🦋', examWeight: 3,
      syllabus: 'Classify living organisms into five main groups. Distinguish vertebrates from invertebrates. Classify vertebrates into five classes. Group plants as flowering and non-flowering.' },
    { id: 'g7s-food-chains',            name: 'Food Chains & Food Webs',          icon: '🍃', examWeight: 3,
      syllabus: 'Identify the different types of interaction within an ecosystem. Recognise feeding relationships in a food chain and a food web. Construct and draw food chains and food webs. Describe energy flow in a given ecosystem.' },
    { id: 'g7s-changes',                name: 'Physical & Chemical Changes',      icon: '🔥', examWeight: 3,
      syllabus: 'Distinguish between physical and chemical changes. Recognise that a chemical change forms new substances. Explain why changes of state are physical changes. Explain why burning, rusting, respiration and photosynthesis are chemical changes.' },
    { id: 'g7s-energy',                 name: 'Energy',                           icon: '🔋', examWeight: 3,
      syllabus: 'Define energy and list its different forms. Understand that energy is transformed rather than created or destroyed. State the law of conservation of energy. Classify energy sources as renewable or non-renewable. Discuss sustainable energy production.' },
    { id: 'g7s-sts',                    name: 'Science, Technology & Society',    icon: '🌍', examWeight: 2,
      syllabus: 'Appreciate the discovery of the cell and the microscope. Discuss the uses and conservation of common metals. Recognise astronomy as a science. Appreciate the role of satellites in modern weather forecasting.' },
  ],
});
