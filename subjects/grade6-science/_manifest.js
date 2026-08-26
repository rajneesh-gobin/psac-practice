'use strict';

// Sub-topics for the Syllabus screen. GENERATED from the questions' own
// `subsection:` tags — every id here has questions behind it, and every tagged
// question has an id here. Trailing comments are the count at generation time.
const G6SC_SYLLABUS = {
  'g6-air': { subsections: [
    { id:'diagrams',        name:'Diagrams to Label' },  // 1
    { id:'properties',      name:'Properties' },  // 8
    { id:'composition',     name:'What Air Is Made Of' },  // 8
    { id:'breathing',       name:'Breathing & Burning' },  // 9
    { id:'pollution',       name:'Pollution' },  // 2
    { id:'wind_pressure',   name:'Wind & Air Pressure' },  // 5
  ]},
  'g6-materials': { subsections: [
    { id:'natural_manmade', name:'Natural or Man-made?' },  // 12
    { id:'properties',      name:'Properties' },  // 8
    { id:'rusting',         name:'Rusting & How to Stop It' },  // 8
    { id:'waste',           name:'Waste & Recycling' },  // 2
  ]},
  'g6-animals': { subsections: [
    { id:'photos',          name:'In Pictures' },  // 2
    { id:'endangered',      name:'Endangered & Endemic Species' },  // 1
    { id:'habitats',        name:'Habitats' },  // 20
    { id:'classification',  name:'Grouping & Classifying' },  // 12
    { id:'life_cycle',      name:'Life Cycles' },  // 1
  ]},
  'g6-plants': { subsections: [
    { id:'diagrams',        name:'Diagrams to Label' },  // 3
    { id:'photosynthesis',  name:'Photosynthesis' },  // 6
    { id:'reproduction',    name:'Flowers, Seeds & Germination' },  // 1
    { id:'parts',           name:'Parts & Their Jobs' },  // 17
    { id:'growth',          name:'What Plants Need' },  // 2
  ]},
  'g6-energy': { subsections: [
    { id:'photos',          name:'In Pictures' },  // 1
    { id:'renewable',       name:'Renewable & Non-renewable' },  // 6
    { id:'sources',         name:'Sources of Energy' },  // 17
    { id:'forms',           name:'Forms of Energy' },  // 4
    { id:'transfer',        name:'Energy Changes' },  // 2
    { id:'saving',          name:'Saving Energy' },  // 1
  ]},
  'g6-ecosystems': { subsections: [
    { id:'photos',          name:'In Pictures' },  // 1
    { id:'food_webs',       name:'Food Chains & Webs' },  // 3
    { id:'habitats',        name:'Habitats' },  // 20
  ]},
  'g6-conservation': { subsections: [
    { id:'pollution',       name:'Pollution' },  // 22
    { id:'deforestation',   name:'Trees & Deforestation' },  // 2
    { id:'recycling',       name:'Reduce, Reuse, Recycle' },  // 1
    { id:'endangered',      name:'Endangered & Endemic Species' },  // 3
    { id:'why_protect',     name:'Why We Protect It' },  // 2
  ]},
  'g6-solar-system': { subsections: [
    { id:'photos',          name:'In Pictures' },  // 2
    { id:'planets',         name:'The Planets' },  // 22
    { id:'sun_moon',        name:'The Sun & the Moon' },  // 5
    { id:'day_night',       name:'Day, Night & Seasons' },  // 1
  ]},
  'g6sci-enr-ecosystems': { subsections: [
    { id:'photos',          name:'In Pictures' },  // 7
    { id:'food_webs',       name:'Food Chains & Webs' },  // 10
    { id:'habitats',        name:'Habitats' },  // 14
  ]},
  'g6sci-enr-solar': { subsections: [
    { id:'photos',          name:'In Pictures' },  // 10
    { id:'planets',         name:'The Planets' },  // 19
    { id:'sun_moon',        name:'The Sun & the Moon' },  // 1
    { id:'space',           name:'Stars & Space' },  // 1
  ]},
};

// Grade 6 Science - MIE Mauritius Syllabus (Grades 3-6, 2015)
// Grade 6 introduces: Air pressure, Rusting, Food groups/teeth, Ecosystems, Solar System
registerSubject({
  id: 'grade6-science', name: 'Science', grade: 6, icon: '🔬', subject: 'Science',
  curriculum: 'MIE Mauritius', comingSoon: false,
  practiceble: true, notesBased: false, noDifficulty: true,
  syllabus: G6SC_SYLLABUS,
  chapters: [
    { id: 'g6-air',          name: 'Air',                                    icon: '🌬️', examWeight: 4,
      syllabus: 'Air is a mixture of gases: nitrogen, oxygen, carbon dioxide, water vapour. Importance of air for breathing and combustion. Air pressure and its uses. Extinguishing fires (removing oxygen). Types of air pollution (noise, vehicle emissions, factory smoke). Causes and effects of air pollution. Measures to reduce air pollution.' },
    { id: 'g6-materials',    name: 'Materials in Our Environment',            icon: '⚗️', examWeight: 4,
      syllabus: 'Natural materials vs man-made materials. Useful properties: hard, flexible, transparent, waterproof, conductor, insulator. Relating properties to uses. Rusting of iron: what is rust, conditions needed (water + air/oxygen), how to prevent rusting (painting, galvanising, greasing). Environmental waste: types and disposal. Importance of caring for planet Earth.' },
    { id: 'g6-animals',      name: 'Animals - Food, Teeth & Classification', icon: '🐾', examWeight: 4,
      syllabus: 'Ways animals obtain food (herbivore, carnivore, omnivore). The 5 food groups: carbohydrates, proteins, fats, vitamins and minerals, water. Importance of a balanced diet. Human teeth: milk teeth vs permanent teeth. Types of teeth: incisors, canines, premolars, molars. Functions of each type of tooth. Animal classification groups.' },
    { id: 'g6-plants',       name: 'Plants & Ecosystems',                    icon: '🌱', examWeight: 3,
      syllabus: 'Photosynthesis (light + water + CO₂ → food + oxygen). Life cycle of a plant. Food chains and food webs. Ecosystems of forests and lagoons in Mauritius. Interdependence of living things. Endemic plants and animals of Mauritius.' },
    { id: 'g6-energy',       name: 'Energy',                                 icon: '⚡', examWeight: 3,
      syllabus: 'Renewable energy sources: solar, wind, water (hydro), biomass. Non-renewable: fossil fuels (coal, oil, gas). Advantages of renewable energy. How electricity is generated (thermal power, solar panels). Energy saving at home and at school.' },
    { id: 'g6-ecosystems',   name: 'Ecosystems of Forests & Lagoons',        icon: '🌊', examWeight: 3,
      syllabus: 'What is an ecosystem? Importance of forests and lagoons in Mauritius. Living things in a forest/lagoon and how they depend on each other. Threats to these ecosystems (deforestation, pollution). Measures to protect forests and lagoons.' },
    { id: 'g6-conservation', name: 'Protection & Conservation',              icon: '♻️', examWeight: 3,
      syllabus: 'Environmental pollution: types, causes, effects on living things. Deforestation and consequences. Recycling and waste management. Conservation efforts in Mauritius and Rodrigues. Why biodiversity is important.' },
    { id: 'g6-solar-system', name: 'Earth, Moon & Sun in Our Solar System',  icon: '🪐', examWeight: 3,
      syllabus: 'The solar system: Sun, 8 planets, Moon. Earth\'s rotation (causes day and night). Earth\'s revolution around the Sun (causes seasons). Phases of the Moon. Gravity. Eclipses (solar and lunar). Space exploration basics.' },
    // ── ENRICHMENT ────────────────────────────────────────────────────────────────
    // @enrichment — These chapters are DERIVED from syllabus topics, NOT direct MIE chapters.
    // DO NOT remove during syllabus alignment audits — they are intentional bonus content.
    { id: 'g6sci-enr-ecosystems', name: 'Ecosystems in Pictures',  icon: '🌿', enrichment: true, examWeight: 2,
      enrichmentNote: 'Photo identification of ecosystem types and habitats — derived from the Ecosystems and Conservation chapters.' },
    { id: 'g6sci-enr-solar',      name: 'Our Solar System',        icon: '🪐', enrichment: true, examWeight: 2,
      enrichmentNote: 'Identify planets and space features by photo — derived from the Solar System chapter.' },
  ],
});

