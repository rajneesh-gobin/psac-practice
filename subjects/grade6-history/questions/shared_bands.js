'use strict';
// Grade 6 History & Geography - the three bands Grade 6 shares with Grade 5
//
// ⚠ THIS IS NOT THE GRADE 5 PACK COPIED ACROSS. Grade 6 has its own syllabus:
// settlers and immigrants, independence and symbols, cultural heritage, land use,
// natural hazards, map skills. It has no discovery chapter, no settlement
// chapter, no Port Louis chapter and no rainfall chapter, so almost nothing from
// the Grade 5 notes belongs here. Measured 2026-09-17 across both packs:
// `mascarene` g5=19 g6=0, `corsair` g5=7 g6=0, `isohyet` g5=5 g6=0 - absent
// because they are not Grade 6 content, not because they were forgotten.
//
// Three bands ARE shared, and in each one Grade 6 declares the topic in its own
// chapter syllabus and was thin or silent:
//   1. World geography  - g6-map-skills declares latitude/longitude/coordinates
//      and g6enr-world declares global connections; the continents, the oceans,
//      the tropics and the Greenwich Meridian were absent (Tropic of Cancer 0,
//      Antarctica 0, five oceans 0, globe 0).
//   2. Volcanoes        - g6-natural-hazards declares them and held 8 questions,
//      five of which were the same "volcanic soil is fertile" point. No magma,
//      no crater, no lava-to-basalt, no crater lake.
//   3. Climate change   - g6-land-use declares sustainability and land-use change
//      and held 22 questions on farming practice; climate change appeared once,
//      renewable energy once, fossil fuels and carbon dioxide never.
//
// Facts follow the Grade 5 source (notes/Historyetgeography.pdf) because the two
// grades teach the same physical geography; the WORDING is written for Grade 6.
// IDs: g6hg-shared-NNN

STATIC_QUESTIONS.push(

  // ── Band 1: the world, its continents, oceans and great lines ──────────────
  makeMCQ({ id:'g6hg-shared-001', chapterId:'g6enr-world', subsection:'geography', difficulty:1,
    question:'How many continents are there on Earth?',
    options:['Seven','Five','Six','Nine'],
    answer:'Seven',
    hint:'Asia, Africa, North America, South America, Europe, Australia and one more.',
    explanation:'There are <b>seven continents</b>: Asia, Africa, North America, South America, Europe, Australia and Antarctica. Asia is the largest.' }),

  makeMCQ({ id:'g6hg-shared-002', chapterId:'g6enr-world', subsection:'geography', difficulty:2,
    question:'Which continent lies at the far south of the Earth and is covered in ice?',
    options:['Antarctica','Australia','South America','Europe'],
    answer:'Antarctica',
    hint:'Its name begins like the Antarctic Circle.',
    explanation:'<b>Antarctica</b> surrounds the South Pole. It is the coldest continent, covered by thick ice, and it has no permanent population.' }),

  makeMCQ({ id:'g6hg-shared-003', chapterId:'g6enr-world', subsection:'geography', difficulty:1,
    question:'How many oceans are there on Earth?',
    options:['Five','Three','Four','Seven'],
    answer:'Five',
    hint:'Pacific, Atlantic, Indian, and two more at the ends of the Earth.',
    explanation:'The <b>five oceans</b> are the Pacific, the Atlantic, the Indian, the Arctic and the Southern Ocean. Mauritius lies in the <b>Indian</b> Ocean.' }),

  makeMCQ({ id:'g6hg-shared-004', chapterId:'g6enr-world', subsection:'geography', difficulty:1,
    question:'Which is the largest ocean in the world?',
    options:['The Pacific Ocean','The Indian Ocean','The Atlantic Ocean','The Arctic Ocean'],
    answer:'The Pacific Ocean',
    hint:'It lies between Asia and the Americas.',
    explanation:'The <b>Pacific</b> is the largest ocean. The Indian Ocean, where Mauritius lies, is bordered by Africa, Asia and Australia.' }),

  makeMCQ({ id:'g6hg-shared-005', chapterId:'g6enr-world', subsection:'geography', difficulty:2,
    question:'Which ocean surrounds the continent of Antarctica?',
    options:['The Southern Ocean','The Arctic Ocean','The Atlantic Ocean','The Indian Ocean'],
    answer:'The Southern Ocean',
    hint:'It is named after the end of the Earth it circles.',
    explanation:'The <b>Southern Ocean</b> circles Antarctica; the <b>Arctic Ocean</b> lies at the opposite end of the Earth, around the North Pole.' }),

  makeMCQ({ id:'g6hg-shared-006', chapterId:'g6enr-world', subsection:'geography', difficulty:2,
    question:'The Indian Ocean is bordered by Asia, Australia and which other continent?',
    options:['Africa','Europe','South America','Antarctica'],
    answer:'Africa',
    hint:'Mauritius lies east of Madagascar, which is itself off that continent.',
    explanation:'The <b>Indian Ocean</b> is bordered by <b>Africa, Asia and Australia</b>. That position on the sea route between Europe and the East is why Mauritius mattered to every colonial power.' }),

  makeMCQ({ id:'g6hg-shared-007', chapterId:'g6enr-world', subsection:'geography', difficulty:1,
    question:'About what fraction of the Earth’s surface is covered by seas and oceans?',
    options:['About 70%','About 30%','About 50%','About 90%'],
    answer:'About 70%',
    hint:'Rather more than two thirds — it is why Earth looks blue from space.',
    explanation:'Seas and oceans cover about <b>70%</b> of the Earth’s surface, which is why the planet appears blue from space.' }),

  makeMCQ({ id:'g6hg-shared-008', chapterId:'g6enr-world', subsection:'geography', difficulty:2,
    question:'The Atlantic Ocean lies between South America and which continent?',
    options:['Africa','Asia','Australia','Antarctica'],
    answer:'Africa',
    hint:'Look between the west coast of Africa and the east coast of South America.',
    explanation:'The <b>Atlantic Ocean</b> lies between South America and <b>Africa</b>. Ships from Europe crossed it and rounded the Cape of Good Hope to reach the Indian Ocean.' }),

  makeMCQ({ id:'g6hg-shared-009', chapterId:'g6-map-skills', subsection:'using_map', difficulty:1,
    question:'What is a <b>globe</b>?',
    options:['A model of the Earth','A flat map of one country',
             'A line joining places of equal height','A tool for measuring distance'],
    answer:'A model of the Earth',
    hint:'It is round, and it turns.',
    explanation:'A <b>globe</b> is a model of the Earth. On it the large land areas are the <b>continents</b> and the large sea areas are the <b>oceans</b>.' }),

  makeMCQ({ id:'g6hg-shared-010', chapterId:'g6-map-skills', subsection:'coordinates', difficulty:2,
    question:'The line of longitude at 0&deg; is called the ___.',
    options:['Greenwich Meridian','Equator','Tropic of Cancer','Arctic Circle'],
    answer:'Greenwich Meridian',
    hint:'It passes through London, and longitudes are numbered from it.',
    explanation:'The <b>Greenwich Meridian</b> is 0&deg; longitude and passes through <b>London</b>. Longitudes are numbered from it, 0&deg; to 180&deg; East and West. The <b>Equator</b> is the 0&deg; line of latitude.' }),

  makeMCQ({ id:'g6hg-shared-011', chapterId:'g6-map-skills', subsection:'coordinates', difficulty:2,
    question:'Which line of latitude lies at 23.5&deg; <b>South</b>, close to Mauritius?',
    options:['The Tropic of Capricorn','The Tropic of Cancer','The Antarctic Circle','The Greenwich Meridian'],
    answer:'The Tropic of Capricorn',
    hint:'It passes through Madagascar, just west of us.',
    explanation:'The <b>Tropic of Capricorn</b> lies at 23.5&deg; South, passes through Madagascar and runs close to Mauritius. That is why Mauritius has a tropical climate with two seasons rather than four.' }),

  makeMCQ({ id:'g6hg-shared-012', chapterId:'g6-map-skills', subsection:'coordinates', difficulty:2,
    question:'Which line of latitude lies at 23.5&deg; <b>North</b> of the Equator?',
    options:['The Tropic of Cancer','The Tropic of Capricorn','The Arctic Circle','The Equator'],
    answer:'The Tropic of Cancer',
    hint:'It is the northern twin of the one near Mauritius.',
    explanation:'The <b>Tropic of Cancer</b> lies at 23.5&deg; North and crosses North America, Africa and Asia. Together with the Tropic of Capricorn it marks the edges of the tropics.' }),

  makeMCQ({ id:'g6hg-shared-013', chapterId:'g6-map-skills', subsection:'coordinates', difficulty:1,
    question:'Mauritius and Rodrigues lie in which hemisphere?',
    options:['The Southern Hemisphere','The Northern Hemisphere',
             'The Eastern Hemisphere only','The Western Hemisphere only'],
    answer:'The Southern Hemisphere',
    hint:'They sit below the Equator, at about 20&deg;S.',
    explanation:'Both islands lie in the <b>Southern Hemisphere</b>, near the Tropic of Capricorn. That is why our summer falls in December and our winter in July — the reverse of Europe.' }),

  // ── Band 2: volcanoes ──────────────────────────────────────────────────────
  makeMCQ({ id:'g6hg-shared-014', chapterId:'g6-natural-hazards', subsection:'volcanoes', difficulty:2,
    question:'What is <b>magma</b>?',
    options:['Hot molten rock inside the Earth','Ash and dust thrown into the air',
             'Rock that has cooled and hardened','Steam escaping from a crater'],
    answer:'Hot molten rock inside the Earth',
    hint:'It has a different name once it reaches the surface.',
    explanation:'<b>Magma</b> is hot molten rock inside the Earth. Once it reaches the surface and flows down the slope it is called <b>lava</b>.' }),

  makeMCQ({ id:'g6hg-shared-015', chapterId:'g6-natural-hazards', subsection:'volcanoes', difficulty:2,
    question:'Where is magma stored before it rises up through the pipe?',
    options:['In a magma chamber','In the crater at the top',
             'In the lava flow outside','In the soil around the volcano'],
    answer:'In a magma chamber',
    hint:'It waits in a large space deep inside the volcano.',
    explanation:'Magma is stored in a <b>magma chamber</b>. It rises through the <b>pipe</b>, leaves by the <b>crater</b> and flows down the slope as <b>lava</b>.' }),

  makeMCQ({ id:'g6hg-shared-016', chapterId:'g6-natural-hazards', subsection:'volcanoes', difficulty:1,
    question:'What is the bowl-shaped opening at the top of a volcano called?',
    options:['The crater','The pipe','The chamber','The cone'],
    answer:'The crater',
    hint:'Trou aux Cerfs in Curepipe is one.',
    explanation:'The <b>crater</b> is the bowl-shaped hollow at the top of a volcano, where the lava leaves. Trou aux Cerfs, in Curepipe, is a well-preserved crater.' }),

  makeMCQ({ id:'g6hg-shared-017', chapterId:'g6-natural-hazards', subsection:'volcanoes', difficulty:2,
    question:'When lava cools and hardens, which rock does it form?',
    options:['Basalt','Limestone','Tuff','Sandstone'],
    answer:'Basalt',
    hint:'It is the dark, hard rock used for walls all over Mauritius.',
    explanation:'Cooled lava becomes <b>basalt</b>, the dark rock found all over Mauritius. Ash and dust that settle and solidify form a different rock, <b>tuff</b>.' }),

  makeMCQ({ id:'g6hg-shared-018', chapterId:'g6-natural-hazards', subsection:'volcanoes', difficulty:3,
    question:'Ash and dust from an eruption settle and solidify into which rock?',
    options:['Tuff','Basalt','Granite','Coral'],
    answer:'Tuff',
    hint:'It is softer than the rock formed by a lava flow.',
    explanation:'<b>Tuff</b> forms where ash and dust accumulate and solidify. It is softer than basalt, which is why rivers cut deep valleys through the tuffs of Rodrigues.' }),

  makeMCQ({ id:'g6hg-shared-019', chapterId:'g6-natural-hazards', subsection:'volcanoes', difficulty:2,
    question:'What is an <b>active</b> volcano?',
    options:['One that is erupting or may erupt at any time','One that has not erupted for many centuries',
             'One that can never erupt again','One that has lost its crater'],
    answer:'One that is erupting or may erupt at any time',
    hint:'Compare it with a dormant volcano, which is quiet for now.',
    explanation:'An <b>active</b> volcano is erupting or may erupt at any time — Piton de la Fournaise on R&eacute;union and Karthala in the Comoros. A <b>dormant</b> volcano is inactive now but may erupt again.' }),

  makeMCQ({ id:'g6hg-shared-020', chapterId:'g6-natural-hazards', subsection:'volcanoes', difficulty:2,
    question:'Grand Bassin and Bassin Blanc are examples of what volcanic feature?',
    options:['Crater lakes','Active volcanoes','Lava plateaus','Limestone caves'],
    answer:'Crater lakes',
    hint:'The word "bassin" is the clue — a basin holding water.',
    explanation:'<b>Grand Bassin</b> and <b>Bassin Blanc</b> are <b>crater lakes</b> — craters that have filled with water. Both are dormant volcanic features and heritage sites of Mauritius.' }),

  makeMCQ({ id:'g6hg-shared-021', chapterId:'g6-natural-hazards', subsection:'volcanoes', difficulty:3,
    question:'How were Mauritius, Rodrigues and R&eacute;union formed?',
    options:['By repeated eruptions on the ocean floor','By coral growing upwards over millions of years',
             'By sand carried out to sea by rivers','By pieces breaking away from Africa'],
    answer:'By repeated eruptions on the ocean floor',
    hint:'Each eruption laid another layer on the last.',
    explanation:'All three <b>Mascarene Islands</b> are volcanic, built by <b>repeated eruptions on the ocean floor</b> until the pile rose above the sea. R&eacute;union still erupts; Mauritius has not done so in recorded history.' }),

  // ── Band 3: climate change and sustainable land use ───────────────────────
  makeMCQ({ id:'g6hg-shared-022', chapterId:'g6-land-use', subsection:'sustainability', difficulty:2,
    question:'What does <b>climate change</b> mean?',
    options:['Long-term changes in temperature and rainfall','The change from summer to winter each year',
             'The change in the weather from day to day','The change from day to night in one place'],
    answer:'Long-term changes in temperature and rainfall',
    hint:'The key word is long-term, not day to day.',
    explanation:'<b>Climate change</b> means <b>long-term changes</b> in temperature, rainfall and weather conditions around the world. The change from summer to winter is an ordinary seasonal change.' }),

  makeMCQ({ id:'g6hg-shared-023', chapterId:'g6-land-use', subsection:'sustainability', difficulty:3,
    question:'What is the main cause of climate change?',
    options:['Pollution from burning fossil fuels such as coal and oil',
             'Volcanoes erupting on the floor of the ocean',
             'The Earth moving closer to the Sun each year',
             'Too many trees being planted in the towns and villages'],
    answer:'Pollution from burning fossil fuels such as coal and oil',
    hint:'Think about vehicles, factories and power stations.',
    explanation:'The main cause is <b>pollution from human activities</b>. Burning <b>fossil fuels</b> such as coal and oil, and fumes from vehicles and factories, release carbon dioxide, which warms the Earth.' }),

  makeMCQ({ id:'g6hg-shared-024', chapterId:'g6-land-use', subsection:'sustainability', difficulty:2,
    question:'Which gas released by burning coal and oil warms the Earth?',
    options:['Carbon dioxide','Oxygen','Nitrogen','Water vapour'],
    answer:'Carbon dioxide',
    hint:'Plants take this gas in as they grow.',
    explanation:'Burning fossil fuels releases <b>carbon dioxide</b>, which warms the Earth. Trees take it in as they grow, which is one reason planting them helps.' }),

  makeMCQ({ id:'g6hg-shared-025', chapterId:'g6-land-use', subsection:'sustainability', difficulty:2,
    question:'Which of these is a source of <b>renewable</b> energy?',
    options:['The wind','Coal','Oil','Petrol'],
    answer:'The wind',
    hint:'Three of them run out once burnt.',
    explanation:'Energy from the <b>Sun, wind and water</b> is <b>renewable</b> and reduces the use of fossil fuels. Coal, oil and petrol are fossil fuels: once burnt, they are gone.' }),

  makeMCQ({ id:'g6hg-shared-026', chapterId:'g6-land-use', subsection:'sustainability', difficulty:3,
    question:'How does using solar and wind energy help the environment?',
    options:['It reduces the fossil fuels that must be burnt','It increases the amount of land used for farming',
             'It removes the need to recycle any waste','It stops cyclones from reaching the island'],
    answer:'It reduces the fossil fuels that must be burnt',
    hint:'Less fuel burnt means less of the gas that warms the Earth.',
    explanation:'Renewable energy from the Sun, wind and water <b>reduces the use of fossil fuels</b>, and so reduces the carbon dioxide released. It is part of using our island sustainably.' }),

  makeMCQ({ id:'g6hg-shared-027', chapterId:'g6-land-use', subsection:'sustainability', difficulty:2,
    question:'Which action by a family helps to slow climate change?',
    options:['Switching off lights and appliances when not in use',
             'Leaving the tap running while brushing teeth',
             'Throwing kitchen waste into the nearest river',
             'Cutting down the trees around the house'],
    answer:'Switching off lights and appliances when not in use',
    hint:'Electricity not used is fuel not burnt.',
    explanation:'Families can <b>switch off lights and appliances when not in use</b>, save water, avoid waste and plant trees. Each action is small, but the electricity not used is fuel not burnt.' }),

  makeMCQ({ id:'g6hg-shared-028', chapterId:'g6-land-use', subsection:'sustainability', difficulty:4,
    question:'Why does climate change matter to farmers in Mauritius and Rodrigues?',
    options:['Rainfall patterns change, bringing drought or floods',
             'The soil becomes volcanic and cannot be ploughed',
             'The island moves further away from the Equator',
             'Sugar cane stops growing when the sea is warm'],
    answer:'Rainfall patterns change, bringing drought or floods',
    hint:'A farmer plans a year around when the rain comes.',
    explanation:'As the climate changes, <b>rainfall patterns change</b>: some places get heavier rain while others face more severe drought, and extreme weather occurs more often. A farmer who cannot rely on the rains cannot plan a planting season.' })

);
