'use strict';

// Sub-topics for the Syllabus screen. GENERATED from the questions' own
// `subsection:` tags - every id here has questions behind it, and every tagged
// question has an id here. Trailing comments are the count at generation time.
const G5HG_SYLLABUS = {
  'discovery': { subsections: [
    { id:'mascarene',       name:'The Mascarene Islands' },  // 13
    { id:'portuguese',      name:'The Portuguese' },  // 9
    { id:'dutch',           name:'The Dutch' },  // 1
    { id:'routes',          name:'Sea Routes' },  // 7
  ]},
  'settlement': { subsections: [
    { id:'dutch',           name:'The Dutch' },  // 16
    { id:'french',          name:'The French' },  // 13
    { id:'british',         name:'The British' },  // 7
  ]},
  'trade-agri': { subsections: [
    { id:'crops',           name:'Crops & Plantations' },  // 23
    { id:'personalities',   name:'Key Personalities' },  // 10
  ]},
  'port-louis': { subsections: [
    { id:'buildings',       name:'Buildings & Landmarks' },  // 25
    { id:'history',         name:'How It Began' },  // 4
    { id:'today',           name:'Port Louis Today' },  // 1
  ]},
  'natural-env': { subsections: [
    { id:'relief',          name:'Mountains & Relief' },  // 24
    { id:'water',           name:'Rivers & Lakes' },  // 1
    { id:'coast',           name:'Coast, Reef & Lagoon' },  // 4
  ]},
  'volcanism': { subsections: [
    { id:'craters',         name:'Craters & Dormant Volcanoes' },  // 6
    { id:'active',          name:'Active Volcanoes' },  // 9
    { id:'formation',       name:'How the Islands Formed' },  // 14
    { id:'rocks_soil',      name:'Rocks & Soil' },  // 2
  ]},
  'env-problems': { subsections: [
    { id:'beach_erosion',   name:'Beach Erosion' },  // 8
    { id:'soil_erosion',    name:'Soil Erosion' },  // 7
    { id:'pollution',       name:'Pollution & Waste' },  // 14
    { id:'conservation',    name:'Conservation' },  // 1
  ]},
  'map-skills': { subsections: [
    { id:'coordinates',     name:'Coordinates & Grids' },  // 13
    { id:'directions',      name:'Compass Directions' },  // 5
    { id:'scale',           name:'Scale & Distance' },  // 2
    { id:'symbols',         name:'Map Symbols & Key' },  // 2
    { id:'using_map',       name:'Using a Map' },  // 18
  ]},
  'g5ge-weather': { subsections: [
    { id:'cyclones',        name:'Cyclones & Warnings' },  // 7
    { id:'instruments',     name:'Weather Instruments' },  // 5
    { id:'seasons',         name:'The Two Seasons' },  // 3
    { id:'impact',          name:'Weather & Our Work' },  // 2
    { id:'elements',        name:'Elements of Weather' },  // 10
  ]},
  'g5enr-personalities': { subsections: [
    { id:'portraits',       name:'Who Is This? (Portrait Quiz)' },  // 8
    { id:'independence',    name:'Independence & Leaders' },  // 11
    { id:'colonial',        name:'The Colonial Era' },  // 8
  ]},
  'g5enr-landmarks': { subsections: [
    { id:'unesco',          name:'UNESCO World Heritage' },  // 3
    { id:'buildings',       name:'Buildings & Landmarks' },  // 23
    { id:'nature',          name:'Gardens & Natural Sites' },  // 5
  ]},
  'g5enr-world': { subsections: [
    { id:'volcanoes',       name:'Volcanoes' },  // 5
    { id:'indian_ocean',    name:'Around the Indian Ocean' },  // 15
    { id:'world',           name:'Around the World' },  // 11
  ]},
};

// Grade 5 History & Geography - MIE Mauritius Syllabus (Grades 3-6, 2015)
// HISTORY: Discovery of Mauritius, Settlement, Trade/Agriculture, Port Louis
// GEOGRAPHY: Natural Environment, Volcanic Origin, Environmental Problems, Map Skills
registerSubject({
  id: 'grade5-history', name: 'History & Geography', grade: 5, icon: '🌍', subject: 'History & Geography',
  curriculum: 'MIE Mauritius', comingSoon: false,
  // ⚠ noDifficulty REMOVED 2026-09-10, and only after the content existed.
  // The flag hid the L1-L4 ladder, and getMixedQuestions() draws across every
  // level at once — so with 88% of this pack sitting at L1/L2 the mix WAS the
  // experience and no control existed, for child or parent, to ask for harder.
  // Turning the ladder on before the stock is there deals a Hard round of three
  // questions and looks broken, so the order is always content first:
  // depth_hard.js took every chapter to at least 15 items at L3/L4.
  // ⚠ level4Label MUST be set whenever this flag is dropped. It defaults to
  // "Challenge", but L4 is maths-shaped and "Word Problems" is meaningless in
  // History — the label is the whole reason the flag was set on this pack and
  // the 11 others like it (PROJECT_OVERVIEW.md §7.1).
  practiceble: true, notesBased: false, level4Label: 'Applied Reasoning',
  syllabus: G5HG_SYLLABUS,
  // examWeight is a chapter's share of a 40-question exam. These are measured
  // from the real 2024 and 2025 papers, question by question: every
  // mark goes to the chapter that teaches it. Papers used: 2024 and 2025 (50 marks each).
  //
  //   settlement               24 marks   24.0%  ->  weight 9
  //   g5ge-weather             14 marks   14.0%  ->  weight 5
  //   map-skills                9 marks    9.0%  ->  weight 4
  //   discovery                 9 marks    9.0%  ->  weight 4
  //   port-louis                9 marks    9.0%  ->  weight 3
  //   volcanism                 8 marks    8.0%  ->  weight 3
  //   env-problems              8 marks    8.0%  ->  weight 3
  //   g5enr-world               8 marks    8.0%  ->  weight 3
  //   natural-env               7 marks    7.0%  ->  weight 3
  //   g5enr-personalities       3 marks    3.0%  ->  weight 1
  //   trade-agri                1 marks    1.0%  ->  weight 1
  //
  //   g5enr-landmarks       not scored           ->  weight 1
  //
  // ⚠ g5ge-weather is the second-largest topic in the paper (14%) and was
  // weighted 3. Rainfall type, season and rainfall graphs are asked every year.
  // ⚠ trade-agri earns 1 mark in two papers, against a weight of 4.
  // ⚠ g5enr-world is a ✨ BONUS chapter earning 8% - continents, oceans and
  // world volcanoes are asked every year.
  // scripts/test-exam-paper-shape.js holds the delivered mix against these.
  chapters: [
    // ── HISTORY ────────────────────────────────────────────────────────────────
    { id: 'discovery',    name: 'Discovery of Mauritius & Rodrigues',       icon: '⛵', examWeight: 4,
      syllabus: 'Mascarene Islands (Mauritius, Réunion, Rodrigues) in the Indian Ocean. Routes taken by Europeans to reach India/East Indies. Portuguese and Dutch explorers (15th-16th century). Fauna and flora before human settlement. Arab traders and early explorers.' },
    { id: 'settlement',   name: 'Settlement by Dutch, French & British',     icon: '⚓', examWeight: 9,
      syllabus: 'Dutch settlement 1638 in south-east (Van Warwyck). Reasons for Dutch failure. French settlement 1715 (Île de France). Reasons for each nation to settle. British conquest 1810 (Battle of Grand Port). Changes brought by each settler group.' },
    { id: 'trade-agri',   name: 'Trade, Agriculture & Key Personalities',   icon: '🌾', examWeight: 1,
      syllabus: 'Crops cultivated by settlers (sugar cane, spices, ebony). Trade goods. Infrastructure: roads, port development. Key personalities: Mahé de Labourdonnais (harbour, capital), Pierre Poivre (spices, Pamplemousses Gardens), Charles Decaen (French governor), Sir Robert Farquhar (British governor). Battle of Grand Port.' },
    { id: 'port-louis',   name: 'Port Louis: Capital of Mauritius',         icon: '🏛️', examWeight: 3,
      syllabus: 'History of Port Louis. French governor who made Port Louis the capital. Key historical buildings: Citadel (Fort Adelaide), Government House, Aapravasi Ghat, Blue Penny Museum, Natural History Museum, Theatre. Harbour development by Labourdonnais. Port Louis as trading and commercial centre, past and present.' },
    // ── GEOGRAPHY ──────────────────────────────────────────────────────────────
    { id: 'natural-env',  name: 'Natural Environment of Mauritius',         icon: '🏔️', examWeight: 3,
      syllabus: 'Natural features vs man-made features. Relief features: mountain ranges (Black River Gorges, Moka Range), peaks (Piton de la Petite Rivière Noire - highest), central plateau, plains, river valleys, gorges. Rodrigues: central ridge, sloping lands. Coastal features: beaches, lagoons, coral reefs, cliffs.' },
    { id: 'volcanism',    name: 'Volcanic Origin & Relief',                  icon: '🌋', examWeight: 3,
      syllabus: 'Mauritius and Rodrigues formed by volcanic activity. Dormant volcanoes in Mauritius: Trou aux Cerfs, Grand Bassin, Bassin Blanc. Active volcanoes in region: Karthala (Comoros), La Fournaise (Réunion). Alluvium (river deposits), limestone (Rodrigues), tuffs. Map reading: locating relief features.' },
    { id: 'env-problems', name: 'Environmental Problems & Conservation',    icon: '🌊', examWeight: 3,
      syllabus: 'Beach erosion (causes: waves, human activities; measures: groins, mangroves). Soil erosion (causes: rain, deforestation; measures: terracing, tree planting). Pollution: water, air, land (causes and effects). Natural sites and nature reserves of value. Reasons to protect them.' },
    { id: 'map-skills',   name: 'Map Skills & Coordinates',                 icon: '🗺️', examWeight: 4,
      syllabus: 'Reading a map: title, key/legend, scale, compass/direction. Latitude and longitude (lines on a globe). Equator (0° latitude). Greenwich Meridian (0° longitude). Locating places on a map using grid references. Mascarene Islands on a world map. Indian Ocean.' },
    { id: 'g5ge-weather', name: 'Weather (Grade 5)',                        icon: '🌦️', examWeight: 5,
      syllabus: 'Revision of seasons and weather instruments. How weather affects farming, tourism and fishing. Cyclone warning signals in Mauritius (Class 1-4) and precautions. Difference between weather and climate. Climate of Rodrigues.' },

    // ── ENRICHMENT ────────────────────────────────────────────────────────────────
    // @enrichment - These chapters are DERIVED from syllabus topics, NOT direct MIE chapters.
    // DO NOT remove during syllabus alignment audits - they are intentional bonus content.
    // They are recognisable by enrichment:true and display with a gold "✨ BONUS" badge in the UI.
    { id: 'g5enr-personalities', name: 'Key Historical Personalities',   icon: '👤', enrichment: true, examWeight: 1,
      enrichmentNote: 'Famous governors, explorers and figures from Grade 5 History: Mahé de Labourdonnais, Pierre Poivre, Farquhar, Van Warwyck, Decaen and others.' },
    { id: 'g5enr-landmarks',     name: 'Mauritius Landmarks & Heritage', icon: '🏛️', enrichment: true, examWeight: 1,
      enrichmentNote: 'Port Louis buildings, volcanic features, Trou aux Cerfs, Grand Bassin, Pamplemousses Botanical Garden - derived from Port Louis and Volcanism chapters.' },
    { id: 'g5enr-world',         name: 'Indian Ocean & Volcanoes',       icon: '🌋', enrichment: true, examWeight: 3,
      enrichmentNote: 'Mascarene Islands, active volcanoes in the region (Karthala, La Fournaise), Indian Ocean world map - derived from Volcanism and Map Skills chapters.' },
  ],
});
