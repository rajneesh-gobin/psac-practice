'use strict';
// Grade 4 Science — Chapter: Water
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
    explanation:'Water flows downhill because of <b>gravity</b> — the force that pulls everything towards the Earth\'s centre. This is why rivers always flow from high ground (mountains) down to lower ground (valleys and sea). Gravity is the reason water always flows to the lowest available point.' }),

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
    explanation:'The warm air around the bottle contains <b>water vapour</b>. When water vapour touches the cold surface of the bottle, it <b>cools down and condenses</b> into liquid water droplets. This is the same process that forms dew on grass in the morning. The water came from the air — not from inside the bottle.' }),

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
