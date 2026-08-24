'use strict';
// Grade 6 Science — MIE Mauritius Syllabus (Grades 3-6, 2015)
// Grade 6 introduces: Air pressure, Rusting, Food groups/teeth, Ecosystems, Solar System
registerSubject({
  id: 'grade6-science', name: 'Science', grade: 6, icon: '🔬', subject: 'Science',
  curriculum: 'MIE Mauritius', comingSoon: false,
  practiceble: true, notesBased: false, noDifficulty: true,
  chapters: [
    { id: 'g6-air',          name: 'Air',                                    icon: '🌬️', examWeight: 4,
      syllabus: 'Air is a mixture of gases: nitrogen, oxygen, carbon dioxide, water vapour. Importance of air for breathing and combustion. Air pressure and its uses. Extinguishing fires (removing oxygen). Types of air pollution (noise, vehicle emissions, factory smoke). Causes and effects of air pollution. Measures to reduce air pollution.' },
    { id: 'g6-materials',    name: 'Materials in Our Environment',            icon: '⚗️', examWeight: 4,
      syllabus: 'Natural materials vs man-made materials. Useful properties: hard, flexible, transparent, waterproof, conductor, insulator. Relating properties to uses. Rusting of iron: what is rust, conditions needed (water + air/oxygen), how to prevent rusting (painting, galvanising, greasing). Environmental waste: types and disposal. Importance of caring for planet Earth.' },
    { id: 'g6-animals',      name: 'Animals — Food, Teeth & Classification', icon: '🐾', examWeight: 4,
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
  ],
});
