'use strict';
// Grade 4 Science — MIE Mauritius Curriculum
registerSubject({
  id: 'grade4-science', name: 'Science', grade: 4, icon: '🔬', subject: 'Science',
  curriculum: 'MIE Mauritius', comingSoon: false,
  practiceble: true, notesBased: false,
  chapters: [
    { id: 'g4sci-living',    name: 'Living & Non-Living Things',  icon: '🌿', examWeight: 3,
      syllabus: 'Characteristics of living things (MRS GREN: Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition). Differences between living and non-living things. What living things need to survive.' },
    { id: 'g4sci-plants',    name: 'Plants',                      icon: '🌱', examWeight: 4,
      syllabus: 'Parts of a plant (roots, stem, leaves, flowers, fruit, seeds) and their functions. Conditions needed for plants to grow well (water, sunlight, air, warmth, minerals). Roots absorb water; stem carries water; leaves make food using sunlight (photosynthesis).' },
    { id: 'g4sci-animals',   name: 'Animals & Habitats',          icon: '🐾', examWeight: 4,
      syllabus: 'Habitats: sea, forest, pond, grassland. Herbivores, carnivores and omnivores. Food chains (producer → herbivore → carnivore). Endemic and endangered animals of Mauritius: Pink Pigeon, Echo Parakeet. Dodo — extinct. Measures to protect animals.' },
    { id: 'g4sci-air',       name: 'Air',                         icon: '🌬️', examWeight: 3,
      syllabus: 'Properties of air (colourless, odourless, tasteless, takes up space). Oxygen for breathing and combustion. Wind = moving air. Air pollution: causes (vehicles, factories, burning waste) and effects. Ways to reduce pollution.' },
    { id: 'g4sci-water',     name: 'Water',                       icon: '💧', examWeight: 3,
      syllabus: 'Properties of water (colourless, tasteless, no smell, flows downhill). States of matter: solid (ice), liquid (water), gas (steam/water vapour). Changes of state: melting, freezing, evaporation, condensation. Simple water cycle. Importance of water and conservation.' },
    { id: 'g4sci-materials', name: 'Materials & Properties',      icon: '⚗️', examWeight: 3,
      syllabus: 'Natural materials (wood, stone, cotton, rubber, clay) vs man-made (plastic, glass, metal). Properties: hard/soft, transparent/opaque, waterproof, magnetic, flexible/rigid. Choosing materials based on properties. Magnets attract iron and steel.' },
  ],
});
