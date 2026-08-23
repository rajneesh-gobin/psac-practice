'use strict';
// Grade 5 Science — MIE Mauritius Syllabus (Grades 3-6, 2015)
// Topics for Grade 5: Living/Non-Living Things, Plants, Animals, Energy,
//   Water/States of Matter, Simple Electric Circuit, Materials, Air, Conservation
registerSubject({
  id: 'grade5-science', name: 'Science', grade: 5, icon: '🔬', subject: 'Science',
  curriculum: 'MIE Mauritius', comingSoon: false,
  practiceble: true, notesBased: false,
  chapters: [
    { id: 'living-nonliving', name: 'Living & Non-Living Things',         icon: '🌿', examWeight: 3,
      syllabus: 'Characteristics of living things. Differences between living and non-living. Habitats and why animals live there.' },
    { id: 'plants',           name: 'Plants',                              icon: '🌱', examWeight: 4,
      syllabus: 'Flowering and non-flowering plants. Parts of a plant (root, stem, leaf, flower, fruit, seed) and their functions. Functions of root and stem (absorb/transport water). Germination — conditions needed. Conditions for plants to grow well. Soil erosion: causes and measures.' },
    { id: 'animals',          name: 'Animals & Habitats',                  icon: '🐾', examWeight: 4,
      syllabus: 'Different habitats and the animals that live in them. Endangered and rare animals of Mauritius and Rodrigues (Dodo, Pink Pigeon, Echo Parakeet, Rodrigues Solitaire). Endemic animals. Measures to protect endangered animals. Nature reserves.' },
    { id: 'energy',           name: 'Energy Sources',                      icon: '⚡', examWeight: 4,
      syllabus: 'Types of energy: solar (sun), wind, water, fossil fuels (petrol, coal). Renewable vs non-renewable energy sources. Solar panels. Thermal power stations. Ways to save electricity at home.' },
    { id: 'water-matter',     name: 'Water & States of Matter',            icon: '💧', examWeight: 3,
      syllabus: 'Three states of matter: solid, liquid, gas. Changes of state: melting (solid→liquid), freezing (liquid→solid), boiling/evaporation (liquid→gas), condensation (gas→liquid). Temperature and state changes. Water cycle.' },
    { id: 'electricity',      name: 'Simple Electric Circuit',             icon: '🔋', examWeight: 3,
      syllabus: 'Components of a simple circuit: battery, bulb, wire, switch. Open and closed circuits. Conductors and insulators. Safety with electricity.' },
    { id: 'materials',        name: 'Materials in Our Environment',        icon: '⚗️', examWeight: 3,
      syllabus: 'Natural materials (wood, cotton, rubber, stone, clay) vs man-made materials (plastic, glass, metal). Properties: hard, soft, flexible, rigid, transparent, waterproof. Uses of materials based on their properties.' },
    { id: 'air',              name: 'Air',                                 icon: '🌬️', examWeight: 2,
      syllabus: 'Air is all around us. We need air to breathe. Oxygen supports combustion. Air pollution: causes, types and effects. Measures to reduce air pollution.' },
    { id: 'conservation',     name: 'Protection & Conservation',           icon: '♻️', examWeight: 2,
      syllabus: 'Importance of protecting the environment. Pollution: types (water, air, land), causes and effects. Ways to protect and conserve habitats. Recycling. Deforestation and consequences.' },
  ],
});
