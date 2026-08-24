'use strict';
// Grade 4 Science - Chapter: Water
// IDs format: g4s-wat-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4s-wat-001', chapterId:'g4sci-water', difficulty:1,
    question:'What is the STATE of water at normal room temperature?',
    options:['Solid','Liquid','Gas','Plasma'],
    answer:'Liquid',
    hint:'Think about a glass of water sitting on a table.',
    explanation:'Water at normal room temperature is a <b>liquid</b>. It flows, takes the shape of its container, and can be poured. Water can also exist as a <b>solid</b> (ice, when frozen) and as a <b>gas</b> (water vapour/steam, when heated).' }),

  makeMCQ({ id:'g4s-wat-002', chapterId:'g4sci-water', difficulty:1,
    question:'What is ICE?',
    options:['Water in its liquid form','Water in its solid form','Water in its gas form','A type of rock'],
    answer:'Water in its solid form',
    hint:'Ice is what happens when water gets very cold.',
    explanation:'Ice is <b>water in its solid form</b>. When water cools to 0°C or below, it <b>freezes</b> and becomes ice. The process of liquid water becoming solid ice is called <b>freezing</b>.' }),

  makeTF({ id:'g4s-wat-003', chapterId:'g4sci-water', difficulty:1,
    question:'Pure water has no colour, taste or smell.',
    answer:true,
    hint:'Think about what clean drinking water looks, tastes and smells like.',
    explanation:'<b>True.</b> Pure (clean) water is <b>colourless</b> (no colour), <b>tasteless</b> (no taste) and <b>odourless</b> (no smell). Water that tastes, smells or looks coloured may contain impurities or be unsafe to drink.' }),

  makeMCQ({ id:'g4s-wat-004', chapterId:'g4sci-water', difficulty:1,
    question:'What do we call the process of liquid water turning into water vapour (gas)?',
    options:['Freezing','Condensation','Evaporation','Melting'],
    answer:'Evaporation',
    hint:'This is what happens to a puddle on a hot sunny day.',
    explanation:'<b>Evaporation</b> is the process where liquid water turns into water vapour (gas). It happens when water is heated by the sun or another heat source. Example: puddles disappear on a sunny day because the water evaporates into the air.' }),

  makeMCQ({ id:'g4s-wat-005', chapterId:'g4sci-water', difficulty:2,
    question:'What do we call the process of water vapour COOLING DOWN and turning back into liquid water?',
    options:['Evaporation','Melting','Condensation','Freezing'],
    answer:'Condensation',
    hint:'This is what happens when you see water droplets on the outside of a cold drink.',
    explanation:'<b>Condensation</b> is the process where water vapour (gas) cools down and turns back into liquid water. Example: water droplets on the outside of a cold glass, or dew on grass in the morning. In the water cycle, condensation forms clouds.' }),

  makeMCQ({ id:'g4s-wat-006', chapterId:'g4sci-water', difficulty:2,
    question:'What happens to ICE when it is heated?',
    options:['It turns into gas immediately','It melts and becomes liquid water','It becomes heavier','It disappears completely'],
    answer:'It melts and becomes liquid water',
    hint:'What process changes a solid to a liquid?',
    explanation:'When ice is heated, it <b>melts</b> and becomes liquid water. Melting occurs when temperature rises above 0°C. The process of solid becoming liquid is called <b>melting</b>. The opposite process (liquid becoming solid) is called <b>freezing</b>.' }),

  makeMCQ({ id:'g4s-wat-007', chapterId:'g4sci-water', difficulty:2,
    question:'In the water cycle, what happens AFTER water evaporates from the sea?',
    options:[
      'It sinks into the ground immediately',
      'It rises as water vapour, cools to form clouds, then falls back as rain',
      'It turns into ice in the sky',
      'It disappears permanently'
    ],
    answer:'It rises as water vapour, cools to form clouds, then falls back as rain',
    hint:'Follow the water: sea → evaporation → ? → clouds → ?',
    explanation:'Water cycle: (1) Water <b>evaporates</b> from the sea/rivers/land. (2) Water vapour <b>rises</b> into the atmosphere. (3) It <b>cools and condenses</b> to form clouds. (4) Water falls as <b>precipitation</b> (rain, hail or snow). (5) Water flows back to rivers and sea. The cycle repeats.' }),

  makeMCQ({ id:'g4s-wat-008', chapterId:'g4sci-water', difficulty:2,
    question:'Why does water flow DOWNHILL?',
    options:['Because water is cold','Because of gravity pulling it downwards','Because water is a liquid','Because wind pushes it down'],
    answer:'Because of gravity pulling it downwards',
    hint:'What force pulls all objects towards the ground?',
    explanation:'Water flows downhill because of <b>gravity</b> - the force that pulls everything towards the Earth\'s centre. This is why rivers always flow from high ground (mountains) down to lower ground (valleys and sea). Gravity is the reason water always flows to the lowest available point.' }),

  makeMCQ({ id:'g4s-wat-009', chapterId:'g4sci-water', difficulty:3,
    question:'A cold bottle of water is taken from the fridge and left on a table. Water droplets soon appear on the OUTSIDE of the bottle. What caused the droplets?',
    options:[
      'Water leaked from inside the bottle',
      'Water vapour in the air condensed on the cold surface of the bottle',
      'The bottle is sweating because it is nervous',
      'The table surface is wet'
    ],
    answer:'Water vapour in the air condensed on the cold surface of the bottle',
    hint:'The bottle is cold. What happens to water vapour in the warm air when it touches something cold?',
    explanation:'The warm air around the bottle contains <b>water vapour</b>. When water vapour touches the cold surface of the bottle, it <b>cools down and condenses</b> into liquid water droplets. This is the same process that forms dew on grass in the morning. The water came from the air - not from inside the bottle.' }),

  makeMCQ({ id:'g4s-wat-010', chapterId:'g4sci-water', difficulty:4,
    question:'A village collects rainwater in a large tank. In the dry season (no rain for 3 months), the tank is their only water source. The village has 200 people and uses 5,000 litres per day. Which action would BEST help the village survive the dry season?',
    options:[
      'Use more water for washing to keep the tank full',
      'Reduce water use and repair any leaking pipes to make the stored water last longer',
      'Empty the tank immediately so animals can also use it',
      'Pour the water into the sea to avoid it going bad'
    ],
    answer:'Reduce water use and repair any leaking pipes to make the stored water last longer',
    hint:'There is a fixed amount of water. What can the village do to make it last 3 months?',
    explanation:'With a fixed amount of water and no rain for 3 months, the village must <b>conserve water</b> to survive. Reducing daily use and fixing leaks are the most effective strategies to make the stored water last. This shows why <b>water conservation</b> is a critical life skill and why we should never waste water.' })

);

STATIC_QUESTIONS.push(

  makeNum({ id:'g4s-wat-011', chapterId:'g4sci-water', difficulty:1,
    question:'At what temperature (°C) does water BOIL?',
    answer:'100', acceptableAnswers:['100','100°C','100 degrees'],
    hint:'Water boils at a very high temperature - far above body temperature (37°C).',
    explanation:'Water boils at <b>100°C</b> at normal atmospheric pressure. At this temperature, liquid water turns rapidly into water vapour (steam). The boiling point of water is one of the two fixed points of the Celsius temperature scale.' }),

  makeNum({ id:'g4s-wat-012', chapterId:'g4sci-water', difficulty:1,
    question:'At what temperature (°C) does liquid water FREEZE and become ice?',
    answer:'0', acceptableAnswers:['0','0°C','0 degrees'],
    hint:'This temperature is also the melting point of ice.',
    explanation:'Water freezes at <b>0°C</b>. Below 0°C, water turns into ice (solid). At exactly 0°C, ice melts and water freezes - this is the freezing/melting point. The two fixed points of the Celsius scale: 0°C (freezing) and 100°C (boiling).' }),

  makeMCQ({ id:'g4s-wat-013', chapterId:'g4sci-water', difficulty:2,
    question:'What is PRECIPITATION in the water cycle?',
    options:[
      'Water evaporating from the sea',
      'Water vapour condensing to form clouds',
      'Water falling from clouds as rain, hail or snow',
      'Water soaking into the ground'
    ],
    answer:'Water falling from clouds as rain, hail or snow',
    hint:'Precipitation is any form of water that falls from the sky.',
    explanation:'<b>Precipitation</b> is water that falls from clouds to the Earth\'s surface as <b>rain, hail, sleet or snow</b>. In Mauritius, precipitation is mainly rain. Water cycle order: evaporation → condensation (clouds form) → precipitation (rain falls).' }),

  makeTF({ id:'g4s-wat-014', chapterId:'g4sci-water', difficulty:2,
    question:'Steam is water in its gas state (water vapour).',
    answer:true,
    hint:'Steam rises from boiling water - what state of matter is it?',
    explanation:'<b>True.</b> Steam is water that has been heated to 100°C and turned into <b>water vapour</b> (a gas). The visible white cloud above a boiling kettle is actually tiny water droplets formed as water vapour cools in the air - the actual steam (water vapour) is invisible.' }),

  makeMCQ({ id:'g4s-wat-015', chapterId:'g4sci-water', difficulty:2,
    question:'Why must we CONSERVE water?',
    options:[
      'Water is too cold to use every day',
      'Fresh water is limited - only a small fraction of Earth\'s water is fresh and drinkable',
      'Water is expensive because it falls as rain',
      'We only need water once a week'
    ],
    answer:'Fresh water is limited - only a small fraction of Earth\'s water is fresh and drinkable',
    hint:'Most of Earth\'s water is in the oceans. Can we drink salty ocean water?',
    explanation:'Although 70% of Earth is covered in water, over 97% is <b>salty ocean water</b> that cannot be drunk. Only about 3% is fresh water - and much of that is frozen in ice caps. <b>Fresh water is a limited resource</b>, which is why conservation matters.' }),

  makeMCQ({ id:'g4s-wat-016', chapterId:'g4sci-water', difficulty:2,
    question:'Why is dirty water DANGEROUS to drink?',
    options:[
      'Because dirty water is too cold',
      'Because dirty water contains harmful bacteria and chemicals that can cause disease',
      'Because dirty water has no taste',
      'Because dirty water is too warm'
    ],
    answer:'Because dirty water contains harmful bacteria and chemicals that can cause disease',
    hint:'What is in dirty water that clean water does not contain?',
    explanation:'Dirty water contains <b>harmful bacteria, viruses and chemicals</b> that can cause serious diseases (diarrhoea, cholera, typhoid). Clean drinking water must be <b>treated</b> (filtered and disinfected) before it is safe to drink. In Mauritius, the Central Water Authority (CWA) treats water before it reaches homes.' }),

  makeMCQ({ id:'g4s-wat-017', chapterId:'g4sci-water', difficulty:2,
    question:'What is FILTRATION in water treatment?',
    options:[
      'Adding chemicals to make water taste better',
      'Passing water through layers of material (sand, gravel) to remove particles and impurities',
      'Heating water to 100°C to kill germs',
      'Adding salt to purify water'
    ],
    answer:'Passing water through layers of material (sand, gravel) to remove particles and impurities',
    hint:'Imagine pouring muddy water through layers of sand and gravel - what comes out?',
    explanation:'<b>Filtration</b> removes solid particles and impurities from water by passing it through layers of sand, gravel and charcoal. It is one step in making water safe to drink. Filtration is followed by <b>disinfection</b> (adding chlorine or using UV light) to kill germs.' }),

  makeMCQ({ id:'g4s-wat-018', chapterId:'g4sci-water', difficulty:3,
    question:'Put the stages of the WATER CYCLE in the correct ORDER:',
    options:[
      'Precipitation → Evaporation → Condensation → Collection',
      'Evaporation → Condensation → Precipitation → Collection',
      'Condensation → Evaporation → Collection → Precipitation',
      'Collection → Condensation → Evaporation → Precipitation'
    ],
    answer:'Evaporation → Condensation → Precipitation → Collection',
    hint:'The cycle starts with water evaporating from the sea or land.',
    explanation:'Water cycle order: (1) <b>Evaporation</b> - sun heats water into vapour. (2) <b>Condensation</b> - vapour cools and forms clouds. (3) <b>Precipitation</b> - water falls as rain or snow. (4) <b>Collection</b> - water collects in rivers, lakes and sea. The cycle repeats.' }),

  makeMCQ({ id:'g4s-wat-019', chapterId:'g4sci-water', difficulty:4,
    question:'A family has a 10,000 litre water tank. They use 200 litres per day. No rain is expected for the next 40 days. Do they have enough water? What should they do?',
    options:[
      'No - 200 × 40 = 8,000 which is more than 10,000 litres.',
      'Yes, they have exactly enough - no changes needed.',
      'Yes, they have enough (200 × 40 = 8,000 < 10,000) - but they should still reduce usage in case the dry season lasts longer.',
      'They have enough - 200 × 50 = 10,000 litres.'
    ],
    answer:'Yes, they have enough (200 × 40 = 8,000 < 10,000) - but they should still reduce usage in case the dry season lasts longer.',
    hint:'Calculate: 200 litres/day × 40 days = ? Compare with 10,000 litres.',
    explanation:'200 × 40 = 8,000 litres needed. The tank holds 10,000 litres. They <b>do have enough</b> (8,000 < 10,000). However, they should <b>still conserve water</b> because the dry season might last longer than 40 days. Water conservation is always good practice.' })

);
