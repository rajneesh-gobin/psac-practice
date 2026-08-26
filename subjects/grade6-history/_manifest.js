'use strict';

// Sub-topics for the Syllabus screen. GENERATED from the questions' own
// `subsection:` tags — every id here has questions behind it, and every tagged
// question has an id here. Trailing comments are the count at generation time.
const G6HG_SYLLABUS = {
  'g6-slaves-immigrants': { subsections: [
    { id:'aapravasi',       name:'Aapravasi Ghat & Le Morne' },  // 8
    { id:'abolition',       name:'Abolition of Slavery' },  // 6
    { id:'indentured',      name:'Indentured Labourers' },  // 9
    { id:'chinese',         name:'Chinese Immigrants' },  // 4
    { id:'slavery',         name:'Slavery' },  // 14
    { id:'colonial_rule',   name:'Dutch, French & British Rule' },  // 4
  ]},
  'g6-independence': { subsections: [
    { id:'flag',            name:'The National Flag' },  // 12
    { id:'coat_of_arms',    name:'The Coat of Arms' },  // 11
    { id:'symbols',         name:'Map Symbols & Key' },  // 8
    { id:'star_key',        name:'Star & Key of the Indian Ocean' },  // 2
    { id:'independence',    name:'Independence & Leaders' },  // 11
  ]},
  'g6-cultural-heritage': { subsections: [
    { id:'unesco',          name:'UNESCO World Heritage' },  // 7
    { id:'sites',           name:'Historic Sites' },  // 22
    { id:'rodrigues',       name:'Rodrigues' },  // 2
    { id:'protection',      name:'Why We Protect Them' },  // 1
    { id:'diversity',       name:'Our Diverse Island' },  // 2
  ]},
  'g6-land-use': { subsections: [
    { id:'agriculture',     name:'Agriculture' },  // 26
    { id:'industry',        name:'Industry' },  // 4
    { id:'tourism',         name:'Tourism' },  // 5
    { id:'change',          name:'Then & Now' },  // 1
    { id:'sustainability',  name:'Sustainable Land Use' },  // 1
  ]},
  'g6-natural-hazards': { subsections: [
    { id:'cyclones',        name:'Cyclones & Warnings' },  // 16
    { id:'volcanoes',       name:'Volcanoes' },  // 4
    { id:'earthquakes',     name:'Earthquakes' },  // 3
    { id:'tsunami',         name:'Tsunamis' },  // 2
    { id:'floods',          name:'Floods' },  // 4
    { id:'drought',         name:'Drought' },  // 1
    { id:'preparedness',    name:'Being Prepared' },  // 1
  ]},
  'g6-map-skills': { subsections: [
    { id:'contours',        name:'Contours & Relief Maps' },  // 7
    { id:'coordinates',     name:'Coordinates & Grids' },  // 7
    { id:'scale',           name:'Scale & Distance' },  // 4
    { id:'directions',      name:'Compass Directions' },  // 2
    { id:'symbols',         name:'Map Symbols & Key' },  // 1
    { id:'using_map',       name:'Using a Map' },  // 10
  ]},
  'g6enr-personalities': { subsections: [
    { id:'portraits',       name:'Who Is This? (Photos)' },  // 3
    { id:'independence',    name:'Independence & Leaders' },  // 21
    { id:'colonial',        name:'The Colonial Era' },  // 7
  ]},
  'g6enr-symbols': { subsections: [
    { id:'flag',            name:'The National Flag' },  // 9
    { id:'coat_of_arms',    name:'The Coat of Arms' },  // 8
    { id:'unesco',          name:'UNESCO World Heritage' },  // 5
    { id:'national',        name:'National Symbols' },  // 9
  ]},
  'g6enr-world': { subsections: [
    { id:'migration',       name:'Migration & Origins' },  // 14
    { id:'hazards',         name:'Natural Hazards' },  // 4
    { id:'trade',           name:'Trade & Goods' },  // 1
    { id:'geography',       name:'World Geography' },  // 12
  ]},
};

// Grade 6 History & Geography - MIE Mauritius Syllabus (Grades 3-6, 2015)
// HISTORY: Settlers/Slaves/Immigrants, Independence, Cultural Heritage
// GEOGRAPHY: Land Use, Natural Hazards, Map Skills
registerSubject({
  id: 'grade6-history', name: 'History & Geography', grade: 6, icon: '🌍', subject: 'History & Geography',
  curriculum: 'MIE Mauritius', comingSoon: false,
  practiceble: true, notesBased: false, noDifficulty: true,
  syllabus: G6HG_SYLLABUS,
  chapters: [
    // ── HISTORY ────────────────────────────────────────────────────────────────
    { id: 'g6-slaves-immigrants', name: 'Settlers, Slaves & Immigrants',       icon: '📜', examWeight: 5,
      syllabus: 'Where settlers, slaves and immigrants came from (India, China, Africa, Madagascar). Life and work of slaves: sugar cane fields, harsh conditions, abolition 1835. Indian indentured labourers (1834–1924): life, work, contributions to agriculture and culture. Chinese immigrants: trade, contribution. Aapravasi Ghat (UNESCO). Social and cultural life during Dutch, French and British rule.' },
    { id: 'g6-independence',      name: 'Celebrating Independence',             icon: '🎊', examWeight: 4,
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
    { id: 'g6enr-symbols',       name: 'Mauritius: Identity & Symbols',    icon: '🏝', enrichment: true, examWeight: 2,
      enrichmentNote: 'National flag colours, coat of arms, national flower, UNESCO sites (Aapravasi Ghat, Le Morne), national motto - derived from Independence and Cultural Heritage chapters.' },
    { id: 'g6enr-world',         name: 'Global Connections',               icon: '🌐', enrichment: true, examWeight: 2,
      enrichmentNote: 'How Mauritius connects to India, Africa and China through immigration and trade; natural hazards around the world - derived from Settlers/Immigrants and Natural Hazards chapters.' },
  ],
});

