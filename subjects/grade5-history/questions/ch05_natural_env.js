'use strict';
// Grade 5 History & Geography — Chapter: Natural Environment of Mauritius
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
    hint:'Look at the cross-section diagram again — which area is higher?',
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
    explanation:'The <b>central mountains</b> block the south-east trade winds. As the wind rises over the mountains it drops its rain on the windward (south-east) side. The west gets the dry, descending air — a classic <b>rain shadow</b> effect.' }),

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
