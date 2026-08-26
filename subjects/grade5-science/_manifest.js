'use strict';

// Sub-topics for the Syllabus screen. GENERATED from the questions' own
// `subsection:` tags — every id here has questions behind it, and every tagged
// question has an id here. Trailing comments are the count at generation time.
const G5SC_SYLLABUS = {
  'plants': { subsections: [
    { id:'diagrams',        name:'Diagrams to Label' },  // 5
    { id:'photosynthesis',  name:'Photosynthesis' },  // 1
    { id:'reproduction',    name:'Flowers, Seeds & Germination' },  // 11
    { id:'parts',           name:'Parts & Their Jobs' },  // 26
    { id:'growth',          name:'What Plants Need' },  // 14
  ]},
  'animals': { subsections: [
    { id:'photos',          name:'In Pictures' },  // 5
    { id:'endangered',      name:'Endangered & Endemic Species' },  // 11
    { id:'habitats',        name:'Habitats' },  // 15
    { id:'classification',  name:'Grouping & Classifying' },  // 12
  ]},
  'energy': { subsections: [
    { id:'renewable',       name:'Renewable & Non-renewable' },  // 8
    { id:'sources',         name:'Sources of Energy' },  // 20
    { id:'forms',           name:'Forms of Energy' },  // 7
    { id:'transfer',        name:'Energy Changes' },  // 6
  ]},
  'water-matter': { subsections: [
    { id:'diagrams',        name:'Diagrams to Label' },  // 2
    { id:'states',          name:'States of Matter' },  // 35
    { id:'water_cycle',     name:'The Water Cycle' },  // 1
    { id:'properties',      name:'Properties' },  // 3
  ]},
  'electricity': { subsections: [
    { id:'diagrams',        name:'Diagrams to Label' },  // 9
    { id:'circuits',        name:'Circuits: Open & Closed' },  // 24
    { id:'components',      name:'Circuit Components' },  // 3
    { id:'conductors',      name:'Conductors & Insulators' },  // 6
  ]},
  'conservation': { subsections: [
    { id:'pollution',       name:'Pollution' },  // 12
    { id:'deforestation',   name:'Trees & Deforestation' },  // 7
    { id:'recycling',       name:'Reduce, Reuse, Recycle' },  // 4
    { id:'endangered',      name:'Endangered & Endemic Species' },  // 5
    { id:'why_protect',     name:'Why We Protect It' },  // 1
  ]},
  'g5sci-enr-endemic': { subsections: [
    { id:'photos',          name:'In Pictures' },  // 6
    { id:'endangered',      name:'Endangered & Endemic Species' },  // 7
    { id:'habitats',        name:'Habitats' },  // 3
    { id:'adaptation',      name:'Adaptation' },  // 1
  ]},
  'g5sci-enr-energy': { subsections: [
    { id:'photos',          name:'In Pictures' },  // 5
    { id:'renewable',       name:'Renewable & Non-renewable' },  // 4
    { id:'sources',         name:'Sources of Energy' },  // 8
  ]},
};

// Grade 5 Science - MIE Mauritius Syllabus (Grades 3-6, 2015)
// Topics for Grade 5: Plants, Animals, Energy, Water/States of Matter,
//   Simple Electric Circuit, Protection & Conservation
// NOTE: Living/Non-Living Things, Materials, and Air are Grade 3-4 topics (removed per MIE scope table)
registerSubject({
  id: 'grade5-science', name: 'Science', grade: 5, icon: '🔬', subject: 'Science',
  curriculum: 'MIE Mauritius', comingSoon: false,
  practiceble: true, notesBased: false, noDifficulty: true,
  syllabus: G5SC_SYLLABUS,
  chapters: [
    { id: 'plants',           name: 'Plants',                              icon: '🌱', examWeight: 4,
      syllabus: 'Flowering and non-flowering plants. Parts of a plant (root, stem, leaf, flower, fruit, seed) and their functions. Functions of root and stem (absorb/transport water). Germination - conditions needed. Conditions for plants to grow well. Soil erosion: causes and measures.' },
    { id: 'animals',          name: 'Animals & Habitats',                  icon: '🐾', examWeight: 4,
      syllabus: 'Different habitats and the animals that live in them. Endangered and rare animals of Mauritius and Rodrigues (Dodo, Pink Pigeon, Echo Parakeet, Rodrigues Solitaire). Endemic animals. Measures to protect endangered animals. Nature reserves.' },
    { id: 'energy',           name: 'Energy Sources',                      icon: '⚡', examWeight: 4,
      syllabus: 'Types of energy: solar (sun), wind, water, fossil fuels (petrol, coal). Renewable vs non-renewable energy sources. Energy transformation (one form to another). Ways to conserve energy. Solar panels. Thermal power stations.' },
    { id: 'water-matter',     name: 'Water & States of Matter',            icon: '💧', examWeight: 3,
      syllabus: 'Three states of matter: solid, liquid, gas. Changes of state: melting (solid→liquid), freezing (liquid→solid), boiling/evaporation (liquid→gas), condensation (gas→liquid). Temperature and state changes. Water cycle. Conserving water.' },
    { id: 'electricity',      name: 'Simple Electric Circuit',             icon: '🔋', examWeight: 3,
      syllabus: 'Components of a simple circuit: battery, bulb, wire, switch. Open and closed circuits. Conductors and insulators. Safety with electricity.' },
    { id: 'conservation',     name: 'Protection & Conservation',           icon: '♻️', examWeight: 2,
      syllabus: 'Importance of protecting the environment. Pollution: types (water, air, land), causes and effects. Ways to protect and conserve habitats. Recycling. Deforestation and consequences.' },

    // ── ENRICHMENT ────────────────────────────────────────────────────────────────
    // @enrichment — These chapters are DERIVED from syllabus topics, NOT direct MIE chapters.
    // DO NOT remove during syllabus alignment audits — they are intentional bonus content.
    { id: 'g5sci-enr-endemic', name: 'Mauritius Endemic Species',  icon: '🦜', enrichment: true, examWeight: 2,
      enrichmentNote: 'Photo identification of rare and endemic Mauritius animals and plants — derived from the Animals & Habitats and Conservation chapters.' },
    { id: 'g5sci-enr-energy',  name: 'Energy Sources in Pictures', icon: '⚡', enrichment: true, examWeight: 2,
      enrichmentNote: 'Identify renewable and non-renewable energy sources by photo — derived from the Energy Sources chapter.' },
  ],
});
