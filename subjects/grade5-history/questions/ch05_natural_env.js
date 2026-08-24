'use strict';
// Grade 5 History & Geography - Chapter: Natural Environment of Mauritius
// IDs format: g5hg-ne-NNN

// Relief cross-section diagram of Mauritius (simplified, not to scale)
const _SVG_RELIEF = `<svg viewBox="0 0 290 105" width="290" height="105" style="display:block;margin:6px auto;background:#f0fdf4;border-radius:8px;border:1px solid #86efac">
  <rect x="0" y="72" width="42" height="33" fill="#bae6fd"/>
  <rect x="248" y="72" width="42" height="33" fill="#bae6fd"/>
  <text x="4" y="92" font-size="7" fill="#0369a1" font-weight="bold">SEA</text>
  <text x="252" y="92" font-size="7" fill="#0369a1" font-weight="bold">SEA</text>
  <polygon points="42,72 60,58 82,38 106,22 145,16 184,22 208,38 230,58 248,72 248,105 42,105"
    fill="#4ade80" stroke="#15803d" stroke-width="1.5"/>
  <polygon points="90,40 106,22 145,16 184,22 200,40 200,72 90,72"
    fill="#86efac" stroke="#15803d" stroke-width="1"/>
  <text x="126" y="14" font-size="7.5" fill="#14532d" font-weight="bold" text-anchor="middle">Central Plateau</text>
  <text x="65" y="54" font-size="6.5" fill="#14532d">Mountains</text>
  <text x="210" y="50" font-size="6.5" fill="#14532d">Mountains</text>
  <text x="44" y="70" font-size="6" fill="#166534">Coastal</text>
  <text x="44" y="77" font-size="6" fill="#166534">plain</text>
  <text x="232" y="70" font-size="6" fill="#166534">Coastal</text>
  <text x="232" y="77" font-size="6" fill="#166534">plain</text>
  <text x="145" y="100" font-size="6" fill="#64748b" text-anchor="middle">Cross-section of Mauritius (simplified, W to E)</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5hg-ne-001', chapterId:'natural-env', difficulty:1,
    question:'What is the highest mountain peak in Mauritius?',
    options:['Corps de Garde','Le Morne Brabant','Piton de la Petite Rivière Noire','Trou aux Cerfs'],
    answer:'Piton de la Petite Rivière Noire',
    hint:'At 828 metres, it stands in the south-west of the island.',
    explanation:'<b>Piton de la Petite Rivière Noire</b> (828 m) in the Black River district is the highest mountain in Mauritius. It is part of the Black River Gorges area in the south-west.' }),

  makeMCQ({ id:'g5hg-ne-002', chapterId:'natural-env', difficulty:1,
    question:`${_SVG_RELIEF}Looking at the cross-section diagram, what is the elevated flat region found in the centre of Mauritius called?`,
    options:['The coastal plain','The central plateau','The mountain range','The lagoon'],
    answer:'The central plateau',
    hint:'It sits between the mountain ranges and is higher than the coastal areas.',
    explanation:'The <b>central plateau</b> is the elevated flat area in the centre of Mauritius, roughly 500–700 m above sea level. Cities like Curepipe, Vacoas and Rose Hill are situated on it.' }),

  makeMCQ({ id:'g5hg-ne-003', chapterId:'natural-env', difficulty:1,
    question:'The coastline of Mauritius is protected by a coral reef. What does the coral reef create between itself and the shore?',
    options:['A river delta','A deep ocean trench','A shallow lagoon','A waterfall'],
    answer:'A shallow lagoon',
    hint:'The calm, clear, shallow water you see at Mauritian beaches sits between the reef and the shore.',
    explanation:'The <b>coral reef</b> surrounding most of Mauritius creates a sheltered, shallow body of calm water called a <b>lagoon</b> between the reef and the shore. The reef also protects the coast from large ocean waves.' }),

  makeTF({ id:'g5hg-ne-004', chapterId:'natural-env', difficulty:1,
    question:'The coastal plains of Mauritius are higher in altitude than the central plateau.',
    answer:false,
    hint:'Look at the cross-section diagram again - which area is higher?',
    explanation:'The <b>central plateau</b> is higher in altitude than the coastal plains. The coastal plains are low-lying areas near the sea, while the central plateau sits at about 500–700 m above sea level.' }),

  makeMCQ({ id:'g5hg-ne-005', chapterId:'natural-env', difficulty:2,
    question:'Mauritius has a tropical climate with two main seasons. What are they?',
    options:[
      'Spring and autumn',
      'Hot wet summer (November–April) and cool dry winter (May–October)',
      'Rainy season (all year) and dry season (never)',
      'Hot dry summer and cold snowy winter'
    ],
    answer:'Hot wet summer (November–April) and cool dry winter (May–October)',
    hint:'Being in the tropics near the Equator, Mauritius does not have the four seasons of Europe.',
    explanation:'Mauritius has <b>two main seasons</b>: a <b>hot, wet summer</b> from November to April (cyclone season) and a <b>cooler, drier winter</b> from May to October. Summer temperatures reach 30°C+; winter temperatures are around 17–24°C.' }),

  makeMCQ({ id:'g5hg-ne-006', chapterId:'natural-env', difficulty:2,
    question:'Which part of Mauritius generally receives the MOST rainfall?',
    options:['The eastern coast','The western coast','The central plateau and south-east','The northern coast'],
    answer:'The central plateau and south-east',
    hint:'Mountains and high land force wet air to rise, cool and rain.',
    explanation:'The <b>central plateau and south-east</b> of Mauritius receive the most rainfall because the mountains force the south-east trade winds to rise, cool and drop their moisture. The west and north of the island are drier (rain shadow effect).' }),

  makeMCQ({ id:'g5hg-ne-007', chapterId:'natural-env', difficulty:1,
    question:'Le Morne Brabant is a rocky peninsula and UNESCO World Heritage Site. Where is it located in Mauritius?',
    options:['North','East','South-west','Centre'],
    answer:'South-west',
    hint:'It is a dramatic rocky mountain at the far tip of the island, near the lagoon.',
    explanation:'<b>Le Morne Brabant</b> is located in the <b>south-west</b> of Mauritius. It is a UNESCO World Heritage Site, significant as a symbol of the resistance of enslaved people, who used its caves as refuge.' }),

  makeMCQ({ id:'g5hg-ne-008', chapterId:'natural-env', difficulty:2,
    question:'Why is the western coast of Mauritius generally drier and less rainy than the south-east coast?',
    options:[
      'The west coast has fewer trees',
      'The central mountains block the south-east trade winds, creating a rain shadow on the west',
      'The sea is warmer on the west coast',
      'The west coast has a coral reef that stops rain'
    ],
    answer:'The central mountains block the south-east trade winds, creating a rain shadow on the west',
    hint:'This weather effect is called a "rain shadow".',
    explanation:'The <b>central mountains</b> block the south-east trade winds. As the wind rises over the mountains it drops its rain on the windward (south-east) side. The west gets the dry, descending air - a classic <b>rain shadow</b> effect.' }),

  makeMCQ({ id:'g5hg-ne-009', chapterId:'natural-env', difficulty:1,
    question:'What is a lagoon?',
    options:[
      'A deep ocean trench far from shore',
      'A shallow body of calm water enclosed between the shore and a coral reef',
      'A freshwater lake in the mountains',
      'A fast-flowing river in a gorge'
    ],
    answer:'A shallow body of calm water enclosed between the shore and a coral reef',
    hint:'Think about the beautiful, calm turquoise water you see at Mauritian beaches.',
    explanation:'A <b>lagoon</b> is a shallow area of calm sea water separated from the open ocean by a barrier such as a coral reef. Mauritius\'s coral reef creates a lagoon around much of the island, protecting beaches from strong waves.' }),

  makeMCQ({ id:'g5hg-ne-010', chapterId:'natural-env', difficulty:2,
    question:'Rivers in Mauritius generally flow FROM the central plateau TOWARDS the coast. Why?',
    options:[
      'Because rain only falls on the coast',
      'Because the central plateau is higher, so water naturally flows downhill to the sea',
      'Because the sea is higher than the land',
      'Because wind pushes the rivers towards the coast'
    ],
    answer:'Because the central plateau is higher, so water naturally flows downhill to the sea',
    hint:'Water always flows downhill due to gravity.',
    explanation:'Water always flows from <b>higher ground to lower ground</b> due to gravity. Since the central plateau is elevated, rivers flow outward and downhill from the plateau toward the coastal plains and into the sea.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5hg-ne-011', chapterId:'natural-env', difficulty:2,
    question:'What is the highest mountain on the island of Rodrigues?',
    options:['Piton de la Petite Rivière Noire','Le Morne Brabant','Mont Limon','Corps de Garde'],
    answer:'Mont Limon',
    hint:'Rodrigues has its own set of hills - this is the highest of them.',
    explanation:'<b>Mont Limon</b> is the highest point on the island of Rodrigues, reaching 393 metres. Unlike Mauritius\'s Piton de la Petite Rivière Noire (828 m), Rodrigues is much smaller and lower in elevation.' }),

  makeMCQ({ id:'g5hg-ne-012', chapterId:'natural-env', difficulty:2,
    question:'Rodrigues has two distinct geological zones. What are they?',
    options:[
      'A northern sandy desert and a southern jungle',
      'A western limestone plateau (Plaine Corail) and a central/eastern volcanic ridge',
      'An eastern coral atoll and a western volcanic peak',
      'A northern basalt plain and a southern limestone coast'
    ],
    answer:'A western limestone plateau (Plaine Corail) and a central/eastern volcanic ridge',
    hint:'One part is made of coral/limestone, the other from old volcanic rock.',
    explanation:'Rodrigues has two geological zones: <b>Plaine Corail</b> in the west - a flat limestone plateau formed from ancient coral reefs raised above sea level; and the <b>Central Ridge</b> in the centre and east - composed of volcanic basalt rock, the island\'s oldest geological formation.' }),

  makeTF({ id:'g5hg-ne-013', chapterId:'natural-env', difficulty:2,
    question:'Plaine Corail in Rodrigues is made of volcanic rock similar to the rest of the island.',
    answer:false,
    hint:'Its name refers to coral.',
    explanation:'<b>Plaine Corail</b> is made of <b>limestone</b>, not volcanic rock. It was formed from ancient coral reefs that were gradually uplifted above sea level. This makes it geologically different from the volcanic basalt rock that dominates the rest of Rodrigues.' }),

  makeMCQ({ id:'g5hg-ne-014', chapterId:'natural-env', difficulty:2,
    question:'What is an ISOHYET on a rainfall map?',
    options:[
      'A line joining places of the same altitude',
      'A line joining places that receive the same amount of rainfall',
      'A line joining places with the same temperature',
      'A line showing the path of a cyclone'
    ],
    answer:'A line joining places that receive the same amount of rainfall',
    hint:'The prefix "iso" means equal; "hyeto" relates to rain.',
    explanation:'An <b>isohyet</b> is a line on a map that connects all places receiving the <b>same amount of rainfall</b>. By drawing isohyets, geographers can map patterns of rainfall distribution across a region.' }),

  makeMCQ({ id:'g5hg-ne-015', chapterId:'natural-env', difficulty:2,
    question:'What is OROGRAPHIC (relief) rainfall?',
    options:[
      'Rain caused by the sun heating the ground, making warm air rise rapidly',
      'Rain that forms when moist air is forced up over a mountain range, cools and releases moisture',
      'Rain that forms over the sea and blows inland without rising',
      'Rain caused by cold and warm air masses meeting at a weather front'
    ],
    answer:'Rain that forms when moist air is forced up over a mountain range, cools and releases moisture',
    hint:'The word "orographic" comes from the Greek word for mountain.',
    explanation:'<b>Orographic (relief) rainfall</b> occurs when moist air is forced to rise over hills or mountains. As it rises, it cools, and water vapour condenses and falls as rain on the windward side. The sheltered leeward side gets little rain - the <b>rain shadow</b> effect. This is the main cause of the heavy rainfall on the south-east of Mauritius.' }),

  makeMCQ({ id:'g5hg-ne-016', chapterId:'natural-env', difficulty:1,
    question:'What is CONVECTIONAL rainfall?',
    options:[
      'Rain caused by moist air being forced over mountains',
      'Rain caused by intense heating of the ground, making warm moist air rise rapidly, cool and condense',
      'Rain caused by cold ocean currents chilling the air above',
      'Rain blown in from the sea without rising'
    ],
    answer:'Rain caused by intense heating of the ground, making warm moist air rise rapidly, cool and condense',
    hint:'Think about heavy afternoon storms on a very hot, sunny day in a tropical area.',
    explanation:'<b>Convectional rainfall</b> occurs when the sun heats the land intensely, causing warm moist air to rise rapidly. As it rises and cools, water vapour condenses into clouds and heavy rain (often with thunder) falls. This type is common in tropical areas, especially on hot afternoons.' }),

  makeMCQ({ id:'g5hg-ne-017', chapterId:'natural-env', difficulty:2,
    question:'As you climb from the coastal plain to the central plateau of Mauritius, what happens to the temperature?',
    options:[
      'Temperature increases because you are closer to the sun',
      'Temperature stays the same regardless of altitude',
      'Temperature decreases - it gets cooler at higher altitudes',
      'Temperature first increases then decreases above 400 m'
    ],
    answer:'Temperature decreases - it gets cooler at higher altitudes',
    hint:'This is why Curepipe (on the plateau) is noticeably cooler than coastal towns.',
    explanation:'<b>Temperature decreases with altitude</b>. On average, it drops about 6.5°C for every 1,000 m gained. This is why towns on the central plateau (like Curepipe at ~550 m) are noticeably cooler than coastal towns like Grand Baie or Mahébourg at sea level.' }),

  makeMCQ({ id:'g5hg-ne-018', chapterId:'natural-env', difficulty:3,
    question:'A school group drives from the coast at Mahébourg up to Curepipe on the central plateau. They notice it becomes cloudier, cooler and starts raining. Explain this change using geographical knowledge.',
    options:[
      'Curepipe is closer to the sea so it receives sea spray',
      'As they drove uphill, the air cooled with altitude, and the plateau forces trade winds to rise and drop their moisture - making Curepipe much cloudier and wetter than the coast',
      'The plateau has more trees which attract clouds and cause rain',
      'The car journey created vibrations that disturbed the clouds overhead'
    ],
    answer:'As they drove uphill, the air cooled with altitude, and the plateau forces trade winds to rise and drop their moisture - making Curepipe much cloudier and wetter than the coast',
    hint:'Apply both the altitude-temperature relationship AND the orographic rainfall concept.',
    explanation:'Two processes explain the change: (1) <b>Altitude and temperature</b> - driving uphill, temperature drops (about 6.5°C per 1,000 m), making it cooler; (2) <b>Orographic rainfall</b> - the plateau forces the south-east trade winds to rise. As they rise and cool, moisture condenses and rain falls. Curepipe is one of the rainiest towns in Mauritius for exactly these reasons.' }),

  makeMCQ({ id:'g5hg-ne-019', chapterId:'natural-env', difficulty:4,
    question:'Curepipe (central plateau, 550 m, windward) receives 3,000 mm of rain per year. Flic en Flac (west coast, 10 m, leeward) receives 800 mm. Using geographical concepts, explain this large difference.',
    options:[
      'Curepipe is closer to the clouds; Flic en Flac is further from the sky',
      'The plateau intercepts south-east trade winds - orographic rain falls on the windward side (Curepipe); air descends dry on the leeward west coast (rain shadow), giving Flic en Flac far less rain. Higher altitude also makes Curepipe cooler, aiding condensation.',
      'Flic en Flac is on the coast so sea winds dry it; Curepipe is inland so it traps rain',
      'The difference is purely because Curepipe has more trees that attract rain'
    ],
    answer:'The plateau intercepts south-east trade winds - orographic rain falls on the windward side (Curepipe); air descends dry on the leeward west coast (rain shadow), giving Flic en Flac far less rain. Higher altitude also makes Curepipe cooler, aiding condensation.',
    hint:'Apply orographic rainfall AND rain shadow to the two sides of the island.',
    explanation:'The dramatic difference reflects two concepts: (1) <b>Orographic rainfall</b> - south-east trade winds carry moisture across the Indian Ocean and rise over the central mountains/plateau, cooling and raining heavily on the windward (south-east/central) side; (2) <b>Rain shadow</b> - air descending on the leeward west coast warms and dries, suppressing rain at Flic en Flac. The 550 m altitude of Curepipe also keeps temperatures lower, making condensation easier.' })

);
