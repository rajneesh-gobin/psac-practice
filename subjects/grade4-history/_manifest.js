'use strict';

// Sub-topics for the Syllabus screen. GENERATED from the questions' own
// `subsection:` tags — every id here has questions behind it, and every tagged
// question has an id here. Trailing comments are the count at generation time.
const G4HG_SYLLABUS = {
  'g4hist-locality': { subsections: [
    { id:'types_locality',  name:'Town, Village & Coast' },  // 18
    { id:'change',          name:'Then & Now' },  // 7
    { id:'buildings',       name:'Buildings & Landmarks' },  // 6
  ]},
  'g4hist-community': { subsections: [
    { id:'festivals',       name:'Festivals & Celebrations' },  // 15
    { id:'religions',       name:'Religions' },  // 3
    { id:'food_dress',      name:'Food & Dress' },  // 4
    { id:'languages',       name:'Languages' },  // 2
    { id:'diversity',       name:'Our Diverse Island' },  // 7
  ]},
  'g4hist-voyages': { subsections: [
    { id:'traders',         name:'Traders of the Indian Ocean' },  // 25
    { id:'reasons',         name:'Why They Travelled' },  // 2
    { id:'ships',           name:'Ships & Navigation' },  // 4
  ]},
  'g4ge-natural-env': { subsections: [
    { id:'relief',          name:'Mountains & Relief' },  // 14
    { id:'water',           name:'Rivers & Lakes' },  // 4
    { id:'coast',           name:'Coast, Reef & Lagoon' },  // 9
    { id:'natural_manmade', name:'Natural or Man-made?' },  // 4
  ]},
  'g4ge-weather': { subsections: [
    { id:'seasons',         name:'The Two Seasons' },  // 8
    { id:'instruments',     name:'Weather Instruments' },  // 13
    { id:'elements',        name:'Elements of Weather' },  // 6
    { id:'cyclones',        name:'Cyclones & Warnings' },  // 4
  ]},
  'g4ge-map-skills': { subsections: [
    { id:'directions',      name:'Compass Directions' },  // 12
    { id:'symbols',         name:'Map Symbols & Key' },  // 5
    { id:'parts_of_map',    name:'Parts of a Map' },  // 4
    { id:'using_map',       name:'Using a Map' },  // 10
  ]},
  'g4enr-explorers': { subsections: [
    { id:'portraits',       name:'Who Is This? (Photos)' },  // 3
    { id:'explorers',       name:'Famous Explorers' },  // 24
    { id:'mauritian',       name:'Mauritian Figures' },  // 4
  ]},
  'g4enr-mauritius': { subsections: [
    { id:'places',          name:'Places of Mauritius' },  // 5
    { id:'symbols',         name:'Map Symbols & Key' },  // 9
    { id:'facts',           name:'Facts About Mauritius' },  // 17
  ]},
  'g4enr-world': { subsections: [
    { id:'continents',      name:'The Continents' },  // 22
    { id:'oceans',          name:'Oceans & Seas' },  // 9
  ]},
};

// Grade 4 History & Geography - MIE Mauritius Syllabus (Grades 3-6, 2015)
registerSubject({
  id: 'grade4-history', name: 'History & Geography', grade: 4, icon: '🌍', subject: 'History & Geography',
  curriculum: 'MIE Mauritius', comingSoon: false,
  practiceble: true, notesBased: false, noDifficulty: true,
  syllabus: G4HG_SYLLABUS,
  chapters: [
    { id: 'g4hist-locality',  name: 'Locality: Past & Present',  icon: '🏙️', examWeight: 4,
      syllabus: 'Types of locality: urban (town/city), rural (village/countryside) and coastal. Change and continuity: comparing old and new buildings, monuments, places of worship, means of transport. Using evidence (photographs, drawings, objects) to compare the past with the present. Simple timeline of events in the locality.' },
    { id: 'g4hist-community', name: 'People in Our Community',   icon: '🎉', examWeight: 4,
      syllabus: 'Cultural diversity of Mauritius: different religions, foods, clothing and ways of life. Traditions and celebrations of common festivals: Divali, Eid ul-Fitr, Christmas, Chinese Spring Festival, Maha Shivaratri, Ugadi. Lives of people in the past compared with today: homes, food, clothing, transport, games and leisure. Appreciation and respect for cultural diversity.' },
    { id: 'g4hist-voyages',   name: 'Voyages of Discovery',      icon: '⛵', examWeight: 4,
      syllabus: 'Countries trading in the Indian Ocean in the past: Arab, Chinese, Indian and Portuguese traders. Reasons people travelled the Indian Ocean (spice trade, route to India and East Indies). Mauritius before human beings arrived: endemic fauna (Dodo, giant tortoise, Pink Pigeon, Echo Parakeet, Flying Fox) and flora (Ebony, Trochetia, endemic palms, Café Marron). Impact of human arrival: deforestation, hunting, extinction of the Dodo. Nature reserves: Black River Gorges National Park, Ile aux Aigrettes, Casela Nature Park - why they are important.' },
    // ── GEOGRAPHY ──────────────────────────────────────────────────────────────
    { id: 'g4ge-natural-env', name: 'Our Natural Environment',    icon: '🏔️', examWeight: 3,
      syllabus: 'Natural features vs man-made features. Relief of Mauritius: central plateau, mountain peaks (Piton de la Petite Rivière Noire, Corps de Garde, Pieter Both), coastal plains. Coastal features: beaches, lagoons, coral reef. Rivers: Rivière du Rempart, Rivière Noire (Black River), Grand River South East. The island of Rodrigues: location, central ridge, lagoon.' },
    { id: 'g4ge-weather',     name: 'Weather',                    icon: '🌦️', examWeight: 3,
      syllabus: 'Two seasons in Mauritius: summer (November–April - hot and rainy) and winter (May–October - cooler and drier). Weather instruments: thermometer (temperature), rain gauge (rainfall), wind vane (wind direction), anemometer (wind speed). Reading and using a weather forecast. How weather affects daily life: effects of rainfall, drought and cyclones on people, farming and transport.' },
    { id: 'g4ge-map-skills',  name: 'Map Skills',                 icon: '🗺️', examWeight: 3,
      syllabus: 'What a map is. Parts of a map: title, legend/key, scale, north arrow. Map symbols and what they represent. Compass directions: North, South, East, West. Using scale to calculate real distances. Locating features on a simple map. Drawing and labelling a simple map of a familiar area.' },

    // ── ENRICHMENT ────────────────────────────────────────────────────────────────
    // @enrichment - These chapters are DERIVED from syllabus topics, NOT direct MIE chapters.
    // DO NOT remove during syllabus alignment audits - they are intentional bonus content.
    // They are recognisable by enrichment:true and display with a gold "✨ BONUS" badge in the UI.
    { id: 'g4enr-explorers', name: 'Famous Explorers & Figures', icon: '🧭', enrichment: true, examWeight: 2,
      enrichmentNote: 'Key historical figures mentioned across Grade 4 History: Arab and Portuguese traders, Indian Ocean explorers, early visitors to Mauritius.' },
    { id: 'g4enr-mauritius', name: 'Know Your Mauritius',        icon: '🏝️', enrichment: true, examWeight: 2,
      enrichmentNote: 'Mountains, rivers, coasts, nature reserves and physical features of Mauritius - derived from the Natural Environment and Geography chapters.' },
    { id: 'g4enr-world',     name: 'World at a Glance',          icon: '🌏', enrichment: true, examWeight: 2,
      enrichmentNote: 'Continents, oceans, major rivers and countries - broad global awareness that supports the Indian Ocean trade and Map Skills topics.' },
  ],
});
