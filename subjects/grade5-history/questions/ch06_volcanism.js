'use strict';
// Grade 5 History & Geography — Chapter: Volcanism & Physical Features
// IDs format: g5hg-vol-NNN

// Cross-section diagram of an extinct volcanic crater (Trou aux Cerfs style)
const _SVG_CRATER = `<svg viewBox="0 0 240 100" width="240" height="100" style="display:block;margin:6px auto;background:#fef9ee;border-radius:8px;border:1px solid #fcd34d">
  <rect x="0" y="55" width="240" height="45" fill="#92400e" opacity="0.15"/>
  <line x1="0" y1="55" x2="240" y2="55" stroke="#92400e" stroke-width="1" stroke-dasharray="4,2"/>
  <text x="2" y="52" font-size="6.5" fill="#78350f">ground level</text>
  <polygon points="20,55 55,35 80,18 120,10 160,18 185,35 220,55 200,65 160,72 120,75 80,72 40,65 20,55"
    fill="#d97706" stroke="#92400e" stroke-width="1.5"/>
  <ellipse cx="120" cy="52" rx="38" ry="22" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
  <text x="120" y="55" text-anchor="middle" font-size="8" fill="#fef3c7" font-weight="bold">crater</text>
  <text x="42" y="55" font-size="7" fill="#92400e">rim</text>
  <text x="186" y="55" font-size="7" fill="#92400e">rim</text>
  <text x="120" y="93" text-anchor="middle" font-size="7" fill="#78350f">Trou aux Cerfs — extinct volcanic crater, Curepipe</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5hg-vol-001', chapterId:'volcanism', difficulty:1,
    question:'How was the island of Mauritius formed millions of years ago?',
    options:[
      'It was created by a massive earthquake',
      'It was formed by volcanic eruptions under the sea, building up layers of lava',
      'It was once connected to Africa and broke away',
      'It was built up from sand deposited by ocean currents'
    ],
    answer:'It was formed by volcanic eruptions under the sea, building up layers of lava',
    hint:'The black rock you see all over Mauritius is a clue.',
    explanation:'Mauritius is a <b>volcanic island</b>. It was formed millions of years ago by repeated underwater volcanic eruptions. Lava built up layer upon layer until it rose above the ocean surface, creating the island.' }),

  makeMCQ({ id:'g5hg-vol-002', chapterId:'volcanism', difficulty:1,
    question:`${_SVG_CRATER}What is Trou aux Cerfs, shown in the diagram above?`,
    options:[
      'A deep river gorge in the Black River district',
      'An extinct volcanic crater located in Curepipe',
      'An active volcano that last erupted in 1900',
      'A natural lake formed by rainwater'
    ],
    answer:'An extinct volcanic crater located in Curepipe',
    hint:'Its name means "Deer Hole" in French — it is a bowl-shaped depression in the centre of the island.',
    explanation:'<b>Trou aux Cerfs</b> is an <b>extinct volcanic crater</b> in the town of Curepipe, in the centre of Mauritius. Although it last erupted millions of years ago, the crater shape is still clearly visible today.' }),

  makeTF({ id:'g5hg-vol-003', chapterId:'volcanism', difficulty:1,
    question:'Trou aux Cerfs is an active volcano and could erupt again soon.',
    answer:false,
    hint:'What type of volcano is Trou aux Cerfs?',
    explanation:'Trou aux Cerfs is an <b>extinct</b> volcano — it has not erupted for millions of years and is not expected to erupt again. Mauritius has no active volcanoes today.' }),

  makeMCQ({ id:'g5hg-vol-004', chapterId:'volcanism', difficulty:1,
    question:'What type of rock is found all over Mauritius as a result of its volcanic origin?',
    options:['Limestone','Sandstone','Granite','Basalt'],
    answer:'Basalt',
    hint:'This rock is black and very hard. You often see it in walls and old buildings in Mauritius.',
    explanation:'<b>Basalt</b> is a dark, hard volcanic rock formed from cooled lava. It is found throughout Mauritius as evidence of the island\'s volcanic origin. Basalt is used in construction of walls and roads.' }),

  makeMCQ({ id:'g5hg-vol-005', chapterId:'volcanism', difficulty:2,
    question:'Why is the soil in Mauritius generally FERTILE and good for farming?',
    options:[
      'Because the island receives a lot of rainfall all year',
      'Because volcanic rock breaks down over time to create rich, mineral-laden soil',
      'Because farmers import special soil from Africa',
      'Because the coral reef keeps the soil rich'
    ],
    answer:'Because volcanic rock breaks down over time to create rich, mineral-laden soil',
    hint:'Volcanic islands are often known for their rich soils.',
    explanation:'When volcanic rock weathers and breaks down over thousands of years, it produces <b>rich, mineral-laden soil</b>. This is why Mauritius has fertile soil ideal for growing sugar cane and other crops.' }),

  makeMCQ({ id:'g5hg-vol-006', chapterId:'volcanism', difficulty:2,
    question:'What is "alluvium"?',
    options:[
      'A type of basalt rock found on mountain peaks',
      'Fine sediment (soil and rock particles) deposited by rivers, creating fertile flat land',
      'The hot liquid rock inside a volcano',
      'A type of coral found in the Mauritian lagoon'
    ],
    answer:'Fine sediment (soil and rock particles) deposited by rivers, creating fertile flat land',
    hint:'Rivers carry particles of rock and soil from the mountains and deposit them when they slow down.',
    explanation:'<b>Alluvium</b> is fine fertile sediment (sand, silt, clay) deposited by rivers as they slow down near the coast. Alluvial plains in Mauritius are very fertile, which is why sugar cane is grown on the flat coastal land.' }),

  makeMCQ({ id:'g5hg-vol-007', chapterId:'volcanism', difficulty:2,
    question:'Which nearby island has an ACTIVE volcano called Piton de la Fournaise that still erupts regularly?',
    options:['Rodrigues','Agalega','Réunion','Madagascar'],
    answer:'Réunion',
    hint:'This French overseas territory is visible from Mauritius on clear days.',
    explanation:'<b>Piton de la Fournaise</b> (Peak of the Furnace) is an active volcano on the island of <b>Réunion</b>, a French overseas territory located about 170 km south-west of Mauritius. It is one of the world\'s most active volcanoes.' }),

  makeMCQ({ id:'g5hg-vol-008', chapterId:'volcanism', difficulty:1,
    question:'What is a volcanic CRATER?',
    options:[
      'The tunnel through which lava flows underground',
      'The bowl-shaped depression at the top or mouth of a volcano',
      'A type of fertile soil found near volcanoes',
      'The flat plain at the base of a mountain'
    ],
    answer:'The bowl-shaped depression at the top or mouth of a volcano',
    hint:'Look at the diagram of Trou aux Cerfs — it has this shape.',
    explanation:'A <b>crater</b> is the bowl-shaped hollow at the top or vent of a volcano, formed by volcanic eruptions. Trou aux Cerfs in Curepipe is a good example of a well-preserved volcanic crater.' }),

  makeMCQ({ id:'g5hg-vol-009', chapterId:'volcanism', difficulty:2,
    question:'The Black River Gorges in Mauritius are deep valleys. How were they likely formed?',
    options:[
      'They were dug by early settlers to store water',
      'They were carved out by rivers cutting through volcanic rock over millions of years',
      'They were created by a massive earthquake',
      'They were formed when lava tubes collapsed'
    ],
    answer:'They were carved out by rivers cutting through volcanic rock over millions of years',
    hint:'Rivers are powerful enough to cut through rock over very long periods.',
    explanation:'The Black River Gorges were carved by rivers cutting through the volcanic basalt rock over <b>millions of years</b>. This process of river erosion creates deep valleys (gorges). The gorges now form a national park that protects Mauritius\'s remaining native forest.' }),

  makeTF({ id:'g5hg-vol-010', chapterId:'volcanism', difficulty:1,
    question:'Basalt is the main type of rock found in Mauritius, formed from cooled volcanic lava.',
    answer:true,
    hint:'You can see this black, hard rock in walls, fields and along roadsides across Mauritius.',
    explanation:'True. <b>Basalt</b> is a dark, dense volcanic rock formed from cooled lava. It makes up the majority of Mauritius\'s geology and is visible everywhere — in field walls, old buildings and rocky outcrops.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5hg-vol-011', chapterId:'volcanism', difficulty:2,
    question:'What is Karthala?',
    options:[
      'An extinct volcanic crater in the centre of Mauritius',
      'An active volcano on Grand Comore in the Comoro Islands, north of Madagascar',
      'A type of volcanic rock found only in Rodrigues',
      'A coral island near the coast of Mauritius'
    ],
    answer:'An active volcano on Grand Comore in the Comoro Islands, north of Madagascar',
    hint:'It is one of the largest active volcanoes in the Indian Ocean region.',
    explanation:'<b>Karthala</b> is an active volcano on Grand Comore, the largest of the Comoro Islands, located north of Madagascar in the Indian Ocean. It is one of the most active volcanoes in the world and erupts regularly — unlike the extinct volcanoes of Mauritius.' }),

  makeMCQ({ id:'g5hg-vol-012', chapterId:'volcanism', difficulty:2,
    question:'What is LAVA?',
    options:[
      'The molten rock INSIDE the Earth before it reaches the surface',
      'Molten rock that has erupted and reached the Earth\'s surface through a volcano',
      'The cloud of ash and gas released by a volcano',
      'The solid black rock found in fields in Mauritius'
    ],
    answer:'Molten rock that has erupted and reached the Earth\'s surface through a volcano',
    hint:'The same material is called "magma" underground and a different name above ground.',
    explanation:'<b>Lava</b> is molten rock that has erupted from a volcano and reached the Earth\'s surface. When still underground it is called <b>magma</b>. Once erupted and flowing on the surface it becomes <b>lava</b>. When lava cools and solidifies it forms rocks like <b>basalt</b>.' }),

  makeTF({ id:'g5hg-vol-013', chapterId:'volcanism', difficulty:1,
    question:'The island of Mauritius was formed by underwater volcanic eruptions.',
    answer:true,
    hint:'All the volcanic rock (basalt) in Mauritius is evidence of this.',
    explanation:'True. <b>Mauritius was formed by underwater volcanic eruptions</b> over millions of years. Lava built up on the ocean floor until it rose above sea level, creating the island. The basalt rock found everywhere is evidence of this volcanic origin.' }),

  makeMCQ({ id:'g5hg-vol-014', chapterId:'volcanism', difficulty:2,
    question:'Where in Mauritius is the most fertile volcanic soil found, and which crop benefits most from it?',
    options:[
      'Along the beach, mixed with coral sand — coconut trees grow best there',
      'On the central plateau and plains, where basalt has weathered into deep, rich red soil — ideal for sugar cane',
      'In the lagoon, where volcanic minerals dissolve in the water',
      'Only in the Black River Gorges, where trees keep the soil moist'
    ],
    answer:'On the central plateau and plains, where basalt has weathered into deep, rich red soil — ideal for sugar cane',
    hint:'The main agricultural crop of Mauritius grows best in this rich soil.',
    explanation:'The central plateau and surrounding plains have the <b>deepest, most fertile volcanic soil</b> from centuries of basalt weathering. This iron-rich, mineral-laden red soil is ideal for <b>sugar cane cultivation</b>, which is why the sugar industry developed mainly on the plateau and its slopes.' }),

  makeMCQ({ id:'g5hg-vol-015', chapterId:'volcanism', difficulty:3,
    question:'Mauritius has extinct volcanoes while Réunion (170 km away) has an active volcano. What best explains why one island is volcanically active and the other is not?',
    options:[
      'Réunion is newer and still sits over a volcanic hot spot; Mauritius is older and has drifted away from the hot spot as the tectonic plate moved',
      'Réunion is larger so it has more magma stored inside',
      'Mauritius used all its lava building the island; Réunion still has some left',
      'The coral reef around Mauritius prevents volcanic activity'
    ],
    answer:'Réunion is newer and still sits over a volcanic hot spot; Mauritius is older and has drifted away from the hot spot as the tectonic plate moved',
    hint:'Think about "hot spots" — fixed points of volcanic activity while tectonic plates move slowly above them.',
    explanation:'Both islands were created by a <b>volcanic hot spot</b> — a fixed plume of magma rising through the Earth\'s mantle. The African tectonic plate moves slowly over this hot spot. <b>Mauritius</b> formed first (~8 million years ago) and has drifted away — so its volcanoes are extinct. <b>Réunion</b> formed more recently and is still directly over the hot spot, so Piton de la Fournaise remains active.' }),

  makeMCQ({ id:'g5hg-vol-016', chapterId:'volcanism', difficulty:3,
    question:'A geologist finds basalt rocks near Tamarin with clear horizontal layers. What does this tell them about how the rock formed?',
    options:[
      'The basalt was deposited by a river, which created the horizontal layers',
      'The horizontal layers show repeated lava flows — each layer is a separate eruption that cooled before the next one flowed over it',
      'The basalt fell from the sky in horizontal layers',
      'The layering shows this is sedimentary rock, not volcanic'
    ],
    answer:'The horizontal layers show repeated lava flows — each layer is a separate eruption that cooled before the next one flowed over it',
    hint:'How are layers in rock generally formed?',
    explanation:'Horizontal layers (strata) in basalt reveal <b>repeated lava flows</b>. Each eruption produced a flow that spread across the land and cooled into solid basalt. The next eruption added another layer on top. These stacked layers record the volcanic history of the island — each layer represents an ancient eruption preserved in rock.' }),

  makeMCQ({ id:'g5hg-vol-017', chapterId:'volcanism', difficulty:2,
    question:'Why is the Black River Gorges National Park important for Mauritius\'s water supply?',
    options:[
      'The forests produce rain by releasing chemicals into the atmosphere',
      'Native forests absorb rainfall into the soil, filter it and slowly release it into rivers that supply drinking water',
      'The gorges collect rainwater in underground pools that can be pumped out',
      'The forests are important for tourism income, not water supply'
    ],
    answer:'Native forests absorb rainfall into the soil, filter it and slowly release it into rivers that supply drinking water',
    hint:'Think about what happens to rain when it falls on a forested hillside versus bare rock.',
    explanation:'Native forests act as a <b>"green water tower"</b>: trees and soil absorb heavy rainfall, preventing runoff. Water slowly percolates through the soil (which acts as a natural filter) and is released gradually into streams and rivers — providing a steady, clean water supply. Without forests, rain would run straight off the volcanic rock as flash floods.' }),

  makeMCQ({ id:'g5hg-vol-018', chapterId:'volcanism', difficulty:2,
    question:'What is a volcanic HOT SPOT?',
    options:[
      'A very hot beach near a volcano',
      'A fixed point of intense volcanic activity in the Earth\'s mantle that stays in place while tectonic plates move over it',
      'The crater at the top of a volcano which is the hottest part',
      'An area near a volcano where the ground temperature is warm'
    ],
    answer:'A fixed point of intense volcanic activity in the Earth\'s mantle that stays in place while tectonic plates move over it',
    hint:'Think about how Mauritius and Réunion formed — both from the same source, yet at different times.',
    explanation:'A <b>volcanic hot spot</b> is a plume of extremely hot magma rising from the Earth\'s mantle that remains fixed in position while the tectonic plate above it moves slowly. As the plate moves, a chain of volcanic islands or mountains is created over time — older ones become extinct (like Mauritius) as they drift away, while newer ones over the hot spot (like Réunion) remain active.' }),

  makeMCQ({ id:'g5hg-vol-019', chapterId:'volcanism', difficulty:4,
    question:'Mauritius has rich volcanic soil, no active volcanoes, a coral reef lagoon and rivers from the plateau. How do ALL FOUR features combine to support the sugar cane industry?',
    options:[
      'Volcanic soil provides nutrients; no active volcanoes means stable farmland; the reef protects the coast from erosion; rivers from the plateau provide irrigation water',
      'Volcanoes provide heat that warms the soil; the reef acts as a breakwater for ships; rivers water nothing; volcanic soil is too hard for farming',
      'None of these features matter for sugar cane — success was due only to labour',
      'The reef provides fish protein to workers; the soil needs volcanic ash added constantly; rivers flood the fields'
    ],
    answer:'Volcanic soil provides nutrients; no active volcanoes means stable farmland; the reef protects the coast from erosion; rivers from the plateau provide irrigation water',
    hint:'Think about what each geographical feature contributes to farming.',
    explanation:'Each feature plays a role: (1) <b>Volcanic soil</b> — rich in minerals from weathered basalt, ideal for sugar cane; (2) <b>No active volcanoes</b> — safe, stable farmland without eruption risk; (3) <b>Coral reef</b> — protects the coastline and flat alluvial farmland near the coast from wave erosion; (4) <b>Rivers from the plateau</b> — provide freshwater irrigation during dry season. Together, these make Mauritius geographically ideal for a sugar cane economy.' })

);
