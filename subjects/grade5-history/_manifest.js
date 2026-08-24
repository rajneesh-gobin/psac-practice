'use strict';
// Grade 5 History & Geography - MIE Mauritius Syllabus (Grades 3-6, 2015)
// HISTORY: Discovery of Mauritius, Settlement, Trade/Agriculture, Port Louis
// GEOGRAPHY: Natural Environment, Volcanic Origin, Environmental Problems, Map Skills
registerSubject({
  id: 'grade5-history', name: 'History & Geography', grade: 5, icon: '🌍', subject: 'History & Geography',
  curriculum: 'MIE Mauritius', comingSoon: false,
  practiceble: true, notesBased: false, noDifficulty: true,
  chapters: [
    // ── HISTORY ────────────────────────────────────────────────────────────────
    { id: 'discovery',    name: 'Discovery of Mauritius & Rodrigues',       icon: '⛵', examWeight: 4,
      syllabus: 'Mascarene Islands (Mauritius, Réunion, Rodrigues) in the Indian Ocean. Routes taken by Europeans to reach India/East Indies. Portuguese and Dutch explorers (15th-16th century). Fauna and flora before human settlement. Arab traders and early explorers.' },
    { id: 'settlement',   name: 'Settlement by Dutch, French & British',     icon: '⚓', examWeight: 4,
      syllabus: 'Dutch settlement 1638 in south-east (Van Warwyck). Reasons for Dutch failure. French settlement 1715 (Île de France). Reasons for each nation to settle. British conquest 1810 (Battle of Grand Port). Changes brought by each settler group.' },
    { id: 'trade-agri',   name: 'Trade, Agriculture & Key Personalities',   icon: '🌾', examWeight: 4,
      syllabus: 'Crops cultivated by settlers (sugar cane, spices, ebony). Trade goods. Infrastructure: roads, port development. Key personalities: Mahé de Labourdonnais (harbour, capital), Pierre Poivre (spices, Pamplemousses Gardens), Charles Decaen (French governor), Sir Robert Farquhar (British governor). Battle of Grand Port.' },
    { id: 'port-louis',   name: 'Port Louis: Capital of Mauritius',         icon: '🏛️', examWeight: 3,
      syllabus: 'History of Port Louis. French governor who made Port Louis the capital. Key historical buildings: Citadel (Fort Adelaide), Government House, Aapravasi Ghat, Blue Penny Museum, Natural History Museum, Theatre. Harbour development by Labourdonnais. Port Louis as trading and commercial centre, past and present.' },
    // ── GEOGRAPHY ──────────────────────────────────────────────────────────────
    { id: 'natural-env',  name: 'Natural Environment of Mauritius',         icon: '🏔️', examWeight: 4,
      syllabus: 'Natural features vs man-made features. Relief features: mountain ranges (Black River Gorges, Moka Range), peaks (Piton de la Petite Rivière Noire - highest), central plateau, plains, river valleys, gorges. Rodrigues: central ridge, sloping lands. Coastal features: beaches, lagoons, coral reefs, cliffs.' },
    { id: 'volcanism',    name: 'Volcanic Origin & Relief',                  icon: '🌋', examWeight: 3,
      syllabus: 'Mauritius and Rodrigues formed by volcanic activity. Dormant volcanoes in Mauritius: Trou aux Cerfs, Grand Bassin, Bassin Blanc. Active volcanoes in region: Karthala (Comoros), La Fournaise (Réunion). Alluvium (river deposits), limestone (Rodrigues), tuffs. Map reading: locating relief features.' },
    { id: 'env-problems', name: 'Environmental Problems & Conservation',    icon: '🌊', examWeight: 3,
      syllabus: 'Beach erosion (causes: waves, human activities; measures: groins, mangroves). Soil erosion (causes: rain, deforestation; measures: terracing, tree planting). Pollution: water, air, land (causes and effects). Natural sites and nature reserves of value. Reasons to protect them.' },
    { id: 'map-skills',   name: 'Map Skills & Coordinates',                 icon: '🗺️', examWeight: 2,
      syllabus: 'Reading a map: title, key/legend, scale, compass/direction. Latitude and longitude (lines on a globe). Equator (0° latitude). Greenwich Meridian (0° longitude). Locating places on a map using grid references. Mascarene Islands on a world map. Indian Ocean.' },
    { id: 'g5ge-weather', name: 'Weather (Grade 5)',                        icon: '🌦️', examWeight: 3,
      syllabus: 'Revision of seasons and weather instruments. How weather affects farming, tourism and fishing. Cyclone warning signals in Mauritius (Class 1-4) and precautions. Difference between weather and climate. Climate of Rodrigues.' },

    // ── ENRICHMENT ────────────────────────────────────────────────────────────────
    // @enrichment - These chapters are DERIVED from syllabus topics, NOT direct MIE chapters.
    // DO NOT remove during syllabus alignment audits - they are intentional bonus content.
    // They are recognisable by enrichment:true and display with a gold "✨ BONUS" badge in the UI.
    { id: 'g5enr-personalities', name: 'Key Historical Personalities',   icon: '👤', enrichment: true, examWeight: 0,
      enrichmentNote: 'Famous governors, explorers and figures from Grade 5 History: Mahé de Labourdonnais, Pierre Poivre, Farquhar, Van Warwyck, Decaen and others.' },
    { id: 'g5enr-landmarks',     name: 'Mauritius Landmarks & Heritage', icon: '🏛️', enrichment: true, examWeight: 0,
      enrichmentNote: 'Port Louis buildings, volcanic features, Trou aux Cerfs, Grand Bassin, Pamplemousses Botanical Garden - derived from Port Louis and Volcanism chapters.' },
    { id: 'g5enr-world',         name: 'Indian Ocean & Volcanoes',       icon: '🌋', enrichment: true, examWeight: 0,
      enrichmentNote: 'Mascarene Islands, active volcanoes in the region (Karthala, La Fournaise), Indian Ocean world map - derived from Volcanism and Map Skills chapters.' },
  ],
});
