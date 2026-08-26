'use strict';

// Sub-topics for the Syllabus screen. GENERATED from the questions' own
// `subsection:` tags — every id here has questions behind it, and every tagged
// question has an id here. Trailing comments are the count at generation time.
const G4SC_SYLLABUS = {
  'g4sci-living': { subsections: [
    { id:'mrs_gren',        name:'MRS GREN' },  // 7
    { id:'living_nonliving', name:'Living or Non-living?' },  // 21
    { id:'classification',  name:'Grouping & Classifying' },  // 3
  ]},
  'g4sci-plants': { subsections: [
    { id:'diagrams',        name:'Diagrams to Label' },  // 4
    { id:'photosynthesis',  name:'Photosynthesis' },  // 2
    { id:'reproduction',    name:'Flowers, Seeds & Germination' },  // 7
    { id:'parts',           name:'Parts & Their Jobs' },  // 15
    { id:'growth',          name:'What Plants Need' },  // 3
  ]},
  'g4sci-animals': { subsections: [
    { id:'photos',          name:'In Pictures' },  // 4
    { id:'endangered',      name:'Endangered & Endemic Species' },  // 4
    { id:'food_chains',     name:'Food Chains' },  // 14
    { id:'habitats',        name:'Habitats' },  // 6
    { id:'classification',  name:'Grouping & Classifying' },  // 3
  ]},
  'g4sci-air': { subsections: [
    { id:'properties',      name:'Properties' },  // 16
    { id:'composition',     name:'What Air Is Made Of' },  // 4
    { id:'breathing',       name:'Breathing & Burning' },  // 5
    { id:'pollution',       name:'Pollution' },  // 4
    { id:'wind_pressure',   name:'Wind & Air Pressure' },  // 2
  ]},
  'g4sci-water': { subsections: [
    { id:'states',          name:'States of Matter' },  // 20
    { id:'water_cycle',     name:'The Water Cycle' },  // 6
    { id:'uses',            name:'How We Use It' },  // 4
    { id:'pollution',       name:'Pollution' },  // 1
  ]},
  'g4sci-materials': { subsections: [
    { id:'natural_manmade', name:'Natural or Man-made?' },  // 12
    { id:'properties',      name:'Properties' },  // 18
    { id:'waste',           name:'Waste & Recycling' },  // 1
  ]},
  'g4sci-energy': { subsections: [
    { id:'renewable',       name:'Renewable & Non-renewable' },  // 5
    { id:'sources',         name:'Sources of Energy' },  // 12
    { id:'forms',           name:'Forms of Energy' },  // 9
    { id:'transfer',        name:'Energy Changes' },  // 3
    { id:'saving',          name:'Saving Energy' },  // 2
  ]},
  'g4sci-protect': { subsections: [
    { id:'pollution',       name:'Pollution' },  // 19
    { id:'deforestation',   name:'Trees & Deforestation' },  // 3
    { id:'recycling',       name:'Reduce, Reuse, Recycle' },  // 5
    { id:'endangered',      name:'Endangered & Endemic Species' },  // 2
    { id:'why_protect',     name:'Why We Protect It' },  // 2
  ]},
  'g4sci-enr-animals': { subsections: [
    { id:'photos',          name:'In Pictures' },  // 6
    { id:'endangered',      name:'Endangered & Endemic Species' },  // 3
    { id:'food_chains',     name:'Food Chains' },  // 3
    { id:'habitats',        name:'Habitats' },  // 5
    { id:'classification',  name:'Grouping & Classifying' },  // 1
    { id:'adaptation',      name:'Adaptation' },  // 1
  ]},
  'g4sci-enr-equipment': { subsections: [
    { id:'photos',          name:'In Pictures' },  // 7
    { id:'measuring',       name:'Measuring Instruments' },  // 12
  ]},
};

// Grade 4 Science - MIE Mauritius Curriculum
registerSubject({
  id: 'grade4-science', name: 'Science', grade: 4, icon: '🔬', subject: 'Science',
  curriculum: 'MIE Mauritius', comingSoon: false,
  practiceble: true, notesBased: false, noDifficulty: true,
  syllabus: G4SC_SYLLABUS,
  chapters: [
    { id: 'g4sci-living',    name: 'Living & Non-Living Things',  icon: '🌿', examWeight: 3,
      syllabus: 'Characteristics of living things (MRS GREN: Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition). Differences between living and non-living things. What living things need to survive.' },
    { id: 'g4sci-plants',    name: 'Plants',                      icon: '🌱', examWeight: 4,
      syllabus: 'Parts of a plant (roots, stem, leaves, flowers, fruit, seeds) and their functions. Conditions needed for plants to grow well (water, sunlight, air, warmth, minerals). Roots absorb water; stem carries water; leaves make food using sunlight (photosynthesis).' },
    { id: 'g4sci-animals',   name: 'Animals & Habitats',          icon: '🐾', examWeight: 4,
      syllabus: 'Habitats: sea, forest, pond, grassland. Herbivores, carnivores and omnivores. Food chains (producer → herbivore → carnivore). Endemic and endangered animals of Mauritius: Pink Pigeon, Echo Parakeet. Dodo - extinct. Measures to protect animals.' },
    { id: 'g4sci-air',       name: 'Air',                         icon: '🌬️', examWeight: 3,
      syllabus: 'Properties of air (colourless, odourless, tasteless, takes up space). Oxygen for breathing and combustion. Wind = moving air. Air pollution: causes (vehicles, factories, burning waste) and effects. Ways to reduce pollution.' },
    { id: 'g4sci-water',     name: 'Water',                       icon: '💧', examWeight: 3,
      syllabus: 'Properties of water (colourless, tasteless, no smell, flows downhill). States of matter: solid (ice), liquid (water), gas (steam/water vapour). Changes of state: melting, freezing, evaporation, condensation. Simple water cycle. Importance of water and conservation.' },
    { id: 'g4sci-materials', name: 'Materials & Properties',      icon: '⚗️', examWeight: 3,
      syllabus: 'Natural materials (wood, stone, cotton, rubber, clay) vs man-made (plastic, glass, metal). Properties: hard/soft, transparent/opaque, waterproof, magnetic, flexible/rigid. Choosing materials based on properties. Magnets attract iron and steel.' },
    { id: 'g4sci-energy',   name: 'Energy',                       icon: '⚡', examWeight: 3,
      syllabus: 'Sources of energy: sun (solar), wind, water (hydro), wood/charcoal, petrol/oil. Forms of energy: light, heat, sound, mechanical (movement). How we use energy in daily life (cooking, transport, lighting). Renewable sources (sun, wind, water) vs non-renewable sources (petrol, coal).' },
    { id: 'g4sci-protect',  name: 'Protection & Conservation',    icon: '♻️', examWeight: 3,
      syllabus: 'Human activities that harm the environment: cutting trees, dumping rubbish, burning, using chemicals. Types of pollution: air pollution, water/sea pollution, land/soil pollution. Effects of pollution on plants, animals and people. What we can do: reduce, reuse, recycle; picking up litter; planting trees; saving water.' },
    // ── ENRICHMENT ────────────────────────────────────────────────────────────────
    // @enrichment — These chapters are DERIVED from syllabus topics, NOT direct MIE chapters.
    // DO NOT remove during syllabus alignment audits — they are intentional bonus content.
    { id: 'g4sci-enr-animals',   name: 'Animals in Pictures',       icon: '🦜', enrichment: true, examWeight: 2,
      enrichmentNote: 'Photo identification of Mauritius endemic and common animals — derived from the Living Things and Animals chapters.' },
    { id: 'g4sci-enr-equipment', name: 'Science Tools & Instruments', icon: '🔬', enrichment: true, examWeight: 2,
      enrichmentNote: 'Identify weather and science instruments by photo — derived from Weather and Science Process chapters.' },
  ],
});
