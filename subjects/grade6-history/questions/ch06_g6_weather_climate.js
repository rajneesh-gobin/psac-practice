'use strict';
// Grade 6 History & Geography — Chapter: Weather & Climate
// IDs format: g6hg-wc-NNN

const _SVG_INSTRUMENTS = `<svg viewBox="0 0 280 95" width="280" height="95" style="display:block;margin:6px auto;background:#f0f9ff;border-radius:8px;border:1px solid #bae6fd">
  <rect x="5" y="8" width="56" height="40" rx="4" fill="#bfdbfe" stroke="#3b82f6" stroke-width="1.2"/>
  <text x="33" y="22" text-anchor="middle" font-size="7.5" fill="#1e40af" font-weight="bold">Thermometer</text>
  <text x="33" y="33" text-anchor="middle" font-size="6.5" fill="#1e40af">temperature</text>
  <text x="33" y="42" text-anchor="middle" font-size="6" fill="#3b82f6">(°C)</text>
  <rect x="70" y="8" width="56" height="40" rx="4" fill="#c4b5fd" stroke="#7c3aed" stroke-width="1.2"/>
  <text x="98" y="22" text-anchor="middle" font-size="7.5" fill="#3b0764" font-weight="bold">Barometer</text>
  <text x="98" y="33" text-anchor="middle" font-size="6.5" fill="#4c1d95">air pressure</text>
  <text x="98" y="42" text-anchor="middle" font-size="6" fill="#6d28d9">(hPa)</text>
  <rect x="135" y="8" width="56" height="40" rx="4" fill="#fde68a" stroke="#f59e0b" stroke-width="1.2"/>
  <text x="163" y="22" text-anchor="middle" font-size="7.5" fill="#78350f" font-weight="bold">Anemometer</text>
  <text x="163" y="33" text-anchor="middle" font-size="6.5" fill="#92400e">wind speed</text>
  <text x="163" y="42" text-anchor="middle" font-size="6" fill="#b45309">(km/h)</text>
  <rect x="200" y="8" width="74" height="40" rx="4" fill="#bbf7d0" stroke="#22c55e" stroke-width="1.2"/>
  <text x="237" y="22" text-anchor="middle" font-size="7.5" fill="#14532d" font-weight="bold">Rain Gauge</text>
  <text x="237" y="33" text-anchor="middle" font-size="6.5" fill="#166534">rainfall amount</text>
  <text x="237" y="42" text-anchor="middle" font-size="6" fill="#15803d">(mm)</text>
  <text x="140" y="80" text-anchor="middle" font-size="6.5" fill="#64748b">A wind vane measures wind DIRECTION | Hygrometer measures HUMIDITY</text>
  <text x="140" y="90" text-anchor="middle" font-size="6" fill="#94a3b8">Weather instruments at a meteorological station</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6hg-wc-001', chapterId:'g6-weather-climate', difficulty:2,
    question:'What is the difference between WEATHER and CLIMATE?',
    options:[
      'Weather and climate are exactly the same thing',
      'Weather is the day-to-day conditions of the atmosphere; climate is the average weather pattern over many years',
      'Weather lasts for months; climate changes every day',
      'Weather is measured only in winter; climate is measured only in summer'
    ],
    answer:'Weather is the day-to-day conditions of the atmosphere; climate is the average weather pattern over many years',
    hint:'Think: weather is what you wear today; climate is what clothes you keep in your wardrobe.',
    explanation:'<b>Weather</b> is the day-to-day state of the atmosphere (temperature, rainfall, wind today). <b>Climate</b> is the average pattern of weather over a long period (usually 30 years) for a particular region. Mauritius has a tropical climate, even if individual days vary.' }),

  makeMCQ({ id:'g6hg-wc-002', chapterId:'g6-weather-climate', difficulty:1,
    question:`${_SVG_INSTRUMENTS}According to the diagram, which instrument measures TEMPERATURE?`,
    options:['Barometer','Anemometer','Rain gauge','Thermometer'],
    answer:'Thermometer',
    hint:'Look at the blue box in the diagram.',
    explanation:'A <b>thermometer</b> measures temperature in degrees Celsius (°C). In Mauritius, temperatures are recorded at meteorological stations around the island and used to monitor daily weather and climate trends.' }),

  makeMCQ({ id:'g6hg-wc-003', chapterId:'g6-weather-climate', difficulty:1,
    question:`${_SVG_INSTRUMENTS}Which instrument in the diagram measures wind SPEED?`,
    options:['Barometer','Rain gauge','Anemometer','Thermometer'],
    answer:'Anemometer',
    hint:'It has rotating cups that spin faster as the wind blows harder.',
    explanation:'An <b>anemometer</b> measures wind speed in kilometres per hour (km/h) or knots. It typically has three or four cups that rotate in the wind — the faster they spin, the stronger the wind. Wind speed is crucial for cyclone tracking.' }),

  makeMCQ({ id:'g6hg-wc-004', chapterId:'g6-weather-climate', difficulty:1,
    question:'What does a RAIN GAUGE measure?',
    options:['The speed of rain falling','The size of raindrops','The amount (depth) of rainfall in millimetres','The temperature during rainfall'],
    answer:'The amount (depth) of rainfall in millimetres',
    hint:'It is a simple cylindrical container that collects and measures rainfall.',
    explanation:'A <b>rain gauge</b> measures the <b>amount of rainfall</b> in millimetres (mm). It collects rainwater in a graduated cylinder, and meteorologists read it daily to monitor rainfall patterns. The central plateau of Mauritius receives the highest annual rainfall.' }),

  makeMCQ({ id:'g6hg-wc-005', chapterId:'g6-weather-climate', difficulty:1,
    question:'What does a WIND VANE measure?',
    options:['Wind speed','Rainfall direction','Wind direction','Air humidity'],
    answer:'Wind direction',
    hint:'A wind vane has an arrow that points into the direction the wind is coming FROM.',
    explanation:'A <b>wind vane</b> (or weather vane) indicates the <b>direction from which the wind is blowing</b>. It has an arrow that swings to point into the wind. Mauritian weather is largely influenced by the South-East Trade Winds.' }),

  makeMCQ({ id:'g6hg-wc-006', chapterId:'g6-weather-climate', difficulty:2,
    question:'Mauritius has two main seasons. Which description matches the SUMMER season?',
    options:[
      'Cool, dry, with winds from the south-east (May to October)',
      'Hot, humid, with heavy rainfall and risk of cyclones (November to April)',
      'Very cold with frost in the mornings (June to August)',
      'Warm and dry all year round with no seasonal difference'
    ],
    answer:'Hot, humid, with heavy rainfall and risk of cyclones (November to April)',
    hint:'Summer in the Southern Hemisphere is from November to April.',
    explanation:'Mauritius\'s <b>summer</b> (November–April) is hot, humid and wet, with temperatures up to 35°C. This is also the <b>cyclone season</b>. The <b>winter</b> (May–October) is cooler and drier, with comfortable temperatures around 17–24°C and the refreshing south-east trade winds.' }),

  makeMCQ({ id:'g6hg-wc-007', chapterId:'g6-weather-climate', difficulty:2,
    question:'How does CLIMATE CHANGE affect Mauritius?',
    options:[
      'It makes Mauritius colder and reduces rainfall',
      'It causes rising sea levels, more intense cyclones and coral bleaching',
      'It has no effect on a small island',
      'It increases crop yields and makes farming easier'
    ],
    answer:'It causes rising sea levels, more intense cyclones and coral bleaching',
    hint:'A warmer planet means warmer seas — which affects both weather and marine life.',
    explanation:'Climate change threatens Mauritius with: <b>rising sea levels</b> (threatening low-lying coastal areas and beaches), <b>more intense cyclones</b> (warmer seas fuel stronger storms), and <b>coral bleaching</b> (warmer water kills the coral, damaging the reef ecosystem and tourism).' }),

  makeMCQ({ id:'g6hg-wc-008', chapterId:'g6-weather-climate', difficulty:1,
    question:'The SOUTH-EAST TRADE WINDS are important for Mauritius because they:',
    options:[
      'Bring cyclones to the island every year',
      'Bring cool, fresh breezes during winter and carry moisture that falls as rain on the east and south-east',
      'Create deserts on the western coast of the island',
      'Are responsible for all floods in Mauritius'
    ],
    answer:'Bring cool, fresh breezes during winter and carry moisture that falls as rain on the east and south-east',
    hint:'These are the dominant winds in the southern Indian Ocean.',
    explanation:'The <b>South-East Trade Winds</b> blow consistently across the Indian Ocean. They bring <b>moisture and rainfall</b> to the windward (east and south-east) side of Mauritius, and <b>cool refreshing breezes</b> during the winter. The west coast is sheltered (leeward) and drier.' }),

  makeTF({ id:'g6hg-wc-009', chapterId:'g6-weather-climate', difficulty:1,
    question:'A barometer is used to measure the amount of rainfall in Mauritius.',
    answer:false,
    hint:'Look at the instruments diagram — which one measures air pressure?',
    explanation:'A <b>barometer</b> measures <b>air pressure</b> (in hectopascals, hPa), not rainfall. Rainfall is measured by a <b>rain gauge</b>. Falling air pressure measured by a barometer often indicates that a storm or cyclone is approaching.' }),

  makeMCQ({ id:'g6hg-wc-010', chapterId:'g6-weather-climate', difficulty:2,
    question:'Which part of Mauritius receives the HIGHEST annual rainfall, and why?',
    options:[
      'The northern coast — because it is closest to Africa',
      'The central plateau and south-east — because mountains force moist trade winds to rise and cool',
      'The western coast — because it faces the prevailing winds',
      'All parts of Mauritius receive exactly the same rainfall'
    ],
    answer:'The central plateau and south-east — because mountains force moist trade winds to rise and cool',
    hint:'Rising air cools and releases its moisture as rain — this is the orographic effect.',
    explanation:'The <b>central plateau and south-east</b> of Mauritius receive the most rainfall (over 3,500 mm/year in some areas). The South-East Trade Winds carry moisture; when they hit the mountains, the air rises, cools and drops its moisture as rain on the windward side (south-east). This is the <b>orographic effect</b>.' })

);
