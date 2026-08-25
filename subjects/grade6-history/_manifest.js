'use strict';
// Grade 6 History & Geography - MIE Mauritius Syllabus (Grades 3-6, 2015)
// HISTORY: Settlers/Slaves/Immigrants, Independence, Cultural Heritage
// GEOGRAPHY: Land Use, Natural Hazards, Map Skills
registerSubject({
  id: 'grade6-history', name: 'History & Geography', grade: 6, icon: '🌍', subject: 'History & Geography',
  curriculum: 'MIE Mauritius', comingSoon: false,
  practiceble: true, notesBased: false, noDifficulty: true,
  chapters: [
    // ── HISTORY ────────────────────────────────────────────────────────────────
    { id: 'g6-slaves-immigrants', name: 'Settlers, Slaves & Immigrants',       icon: '📜', examWeight: 5,
      syllabus: 'Where settlers, slaves and immigrants came from (India, China, Africa, Madagascar). Life and work of slaves: sugar cane fields, harsh conditions, abolition 1835. Indian indentured labourers (1834–1924): life, work, contributions to agriculture and culture. Chinese immigrants: trade, contribution. Aapravasi Ghat (UNESCO). Social and cultural life during Dutch, French and British rule.' },
    { id: 'g6-independence',      name: 'Celebrating Independence',             icon: '🇲🇺', examWeight: 4,
      syllabus: 'Why Mauritius is called "the Star and Key of the Indian Ocean". National Flag of Mauritius: four colours and their meanings (red=freedom, blue=Indian Ocean, yellow=light/independence, green=agriculture). Coat of Arms of Mauritius: features and symbols. Coat of Arms of Rodrigues. National flower (Trochetia boutoniana). Significance of national symbols in building identity.' },
    { id: 'g6-cultural-heritage', name: 'Our Cultural Heritage',               icon: '🏛️', examWeight: 4,
      syllabus: 'Places of historical interest in Mauritius: Aapravasi Ghat (Port Louis), Le Morne Brabant (UNESCO), Eureka House, Pamplemousses Botanical Garden, Citadel/Fort Adelaide, Blue Penny Museum. Places of historical interest in Rodrigues. Why historical sites need to be protected and preserved. Cultural diversity of Mauritius.' },
    // ── GEOGRAPHY ──────────────────────────────────────────────────────────────
    { id: 'g6-land-use',          name: 'Land Use in Mauritius & Rodrigues',   icon: '🌾', examWeight: 4,
      syllabus: 'Types of land use: agriculture (sugar cane, vegetables, fruits), agro-industry (sugar factories, tea factories), tourism (hotels, beaches). How land use has changed over time. Impact of tourism on the environment. Sustainable land use. Comparison of land use in Mauritius and Rodrigues.' },
    { id: 'g6-natural-hazards',   name: 'Natural Hazards',                     icon: '🌀', examWeight: 3,
      syllabus: 'Cyclones: what they are, how they form in the Indian Ocean, cyclone warning signals in Mauritius (Class 1–4), precautions. Earthquakes: causes (tectonic plates), effects. Tsunamis: causes and effects. Floods: causes in Mauritius, effects, precautions. Drought and its effects. Disaster preparedness.' },
    { id: 'g6-map-skills',        name: 'Map Skills',                           icon: '🗺️', examWeight: 2,
      syllabus: 'Reading a relief map: contour lines, spot heights. Identifying relief features from a map. Latitude, longitude and coordinates. Scale and distance. Grid references. Maps of Mauritius, Rodrigues and the Indian Ocean region. Compass directions and bearings.' },

    // ── ENRICHMENT ────────────────────────────────────────────────────────────────
    // @enrichment - These chapters are DERIVED from syllabus topics, NOT direct MIE chapters.
    // DO NOT remove during syllabus alignment audits - they are intentional bonus content.
    // They are recognisable by enrichment:true and display with a gold "✨ BONUS" badge in the UI.
    { id: 'g6enr-personalities', name: 'Famous Figures of Mauritius',      icon: '👤', enrichment: true, examWeight: 2,
      enrichmentNote: 'Independence leaders (Sir Seewoosagur Ramgoolam), historical figures from slaves/immigration era, cultural contributors - derived from Grade 6 History chapters.' },
    { id: 'g6enr-symbols',       name: 'Mauritius: Identity & Symbols',    icon: '🇲🇺', enrichment: true, examWeight: 2,
      enrichmentNote: 'National flag colours, coat of arms, national flower, UNESCO sites (Aapravasi Ghat, Le Morne), national motto - derived from Independence and Cultural Heritage chapters.' },
    { id: 'g6enr-world',         name: 'Global Connections',               icon: '🌐', enrichment: true, examWeight: 2,
      enrichmentNote: 'How Mauritius connects to India, Africa and China through immigration and trade; natural hazards around the world - derived from Settlers/Immigrants and Natural Hazards chapters.' },
  ],
});

