'use strict';
// Grade 5 Science - Chapter: Water & States of Matter
// IDs format: g5sci-wm-NNN

// Inline SVG: states of matter transition diagram
const _SVG_STATES = `<svg viewBox="0 0 290 78" width="290" height="78" style="display:block;margin:6px auto;background:#f0f9ff;border-radius:8px;border:1px solid #bae6fd">
  <rect x="5" y="20" width="70" height="38" rx="5" fill="#bfdbfe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="40" y="36" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e40af">SOLID</text>
  <text x="40" y="49" text-anchor="middle" font-size="8" fill="#1e40af">e.g. ice</text>
  <rect x="110" y="20" width="70" height="38" rx="5" fill="#bbf7d0" stroke="#22c55e" stroke-width="1.5"/>
  <text x="145" y="36" text-anchor="middle" font-size="9" font-weight="bold" fill="#14532d">LIQUID</text>
  <text x="145" y="49" text-anchor="middle" font-size="8" fill="#14532d">e.g. water</text>
  <rect x="215" y="20" width="70" height="38" rx="5" fill="#fde68a" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="250" y="36" text-anchor="middle" font-size="9" font-weight="bold" fill="#78350f">GAS</text>
  <text x="250" y="49" text-anchor="middle" font-size="8" fill="#78350f">e.g. steam</text>
  <text x="83" y="30" font-size="10" fill="#dc2626">&#8594;</text>
  <text x="76" y="20" font-size="6.5" fill="#dc2626">melts</text>
  <text x="83" y="51" font-size="10" fill="#2563eb">&#8592;</text>
  <text x="74" y="67" font-size="6.5" fill="#2563eb">freezes</text>
  <text x="188" y="30" font-size="10" fill="#dc2626">&#8594;</text>
  <text x="177" y="20" font-size="6.5" fill="#dc2626">evaporates</text>
  <text x="188" y="51" font-size="10" fill="#2563eb">&#8592;</text>
  <text x="177" y="67" font-size="6.5" fill="#2563eb">condenses</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5sci-wm-001', chapterId:'water-matter', difficulty:1,
    question:'What are the three states of matter?',
    options:['Solid, liquid and gas','Hot, warm and cold','Ice, water and cloud','Hard, soft and rough'],
    answer:'Solid, liquid and gas',
    hint:'Think about ice, water and steam - what are these three forms called?',
    explanation:'Matter exists in three states: <b>solid</b> (e.g. ice), <b>liquid</b> (e.g. water) and <b>gas</b> (e.g. steam/water vapour).' }),

  makeMCQ({ id:'g5sci-wm-002', chapterId:'water-matter', difficulty:1,
    question:'What is the state of water when it is in the form of ice?',
    options:['Liquid','Gas','Solid','Vapour'],
    answer:'Solid',
    hint:'Ice is frozen water - very hard and rigid.',
    explanation:'Ice is water in its <b>solid</b> state. When water is cooled to 0°C or below, it freezes and becomes solid ice.' }),

  makeMCQ({ id:'g5sci-wm-003', chapterId:'water-matter', difficulty:1,
    question:'At what temperature does water freeze (change from liquid to solid)?',
    options:['100°C','50°C','0°C','−20°C'],
    answer:'0°C',
    hint:'The freezing point and melting point of water are the same temperature.',
    explanation:'Water freezes at <b>0°C</b> (zero degrees Celsius). Below this temperature, liquid water turns into solid ice.' }),

  makeMCQ({ id:'g5sci-wm-004', chapterId:'water-matter', difficulty:1,
    question:'At what temperature does water boil (change from liquid to gas)?',
    options:['0°C','37°C','80°C','100°C'],
    answer:'100°C',
    hint:'This is the boiling point of water at normal atmospheric pressure.',
    explanation:'Water boils at <b>100°C</b>. At this temperature, liquid water turns into water vapour (steam/gas).' }),

  makeTF({ id:'g5sci-wm-005', chapterId:'water-matter', difficulty:1,
    question:'Steam is water in its liquid state.',
    answer:false,
    hint:'Think about what steam looks like - can you hold it?',
    explanation:'Steam is water in its <b>gas</b> state, not liquid. Water becomes steam (water vapour) when it is heated to 100°C.' }),

  makeMCQ({ id:'g5sci-wm-006', chapterId:'water-matter', difficulty:1,
    question:'What do we call the process of water changing from a liquid to a gas?',
    options:['Freezing','Condensation','Evaporation','Melting'],
    answer:'Evaporation',
    hint:'The sun causes this to happen to water in puddles, rivers and the sea.',
    explanation:'<b>Evaporation</b> is the process by which liquid water changes into water vapour (gas) when heated.' }),

  makeMCQ({ id:'g5sci-wm-007', chapterId:'water-matter', difficulty:1,
    question:'What do we call the process of water vapour (gas) changing back into liquid water?',
    options:['Evaporation','Melting','Condensation','Boiling'],
    answer:'Condensation',
    hint:'Think about water droplets forming on a cold glass of water on a hot day.',
    explanation:'<b>Condensation</b> is the process by which water vapour (gas) cools down and turns back into liquid water. Clouds and morning dew form this way.' }),

  makeMCQ({ id:'g5sci-wm-008', chapterId:'water-matter', difficulty:2,
    question:`${_SVG_STATES}Looking at the diagram above, what process takes water from <b>liquid</b> to <b>solid</b>?`,
    options:['Evaporation','Condensation','Melting','Freezing'],
    answer:'Freezing',
    hint:'In the diagram, follow the blue arrow going from LIQUID back to SOLID.',
    explanation:'<b>Freezing</b> is the process of liquid water cooling to 0°C and turning into solid ice. In the diagram, the blue ← arrow from LIQUID to SOLID shows freezing.' }),

  makeMCQ({ id:'g5sci-wm-009', chapterId:'water-matter', difficulty:2,
    question:`${_SVG_STATES}According to the diagram, what process takes water from <b>solid</b> to <b>liquid</b>?`,
    options:['Condensation','Freezing','Melting','Evaporation'],
    answer:'Melting',
    hint:'Follow the red arrow from SOLID to LIQUID.',
    explanation:'<b>Melting</b> is the process of solid ice heating up to 0°C and turning into liquid water.' }),

  makeMCQ({ id:'g5sci-wm-010', chapterId:'water-matter', difficulty:2,
    question:'Why does water in a puddle on the road disappear on a sunny day even though no one drinks it?',
    options:[
      'The road absorbs the water',
      'The water evaporates into water vapour',
      'The water freezes into ice',
      'The water condenses into clouds directly'
    ],
    answer:'The water evaporates into water vapour',
    hint:'The sun heats the water - what happens when water is heated?',
    explanation:'The sun\'s heat causes the water to <b>evaporate</b> - changing from liquid water into invisible water vapour in the air.' }),

  makeMCQ({ id:'g5sci-wm-011', chapterId:'water-matter', difficulty:2,
    question:'In the water cycle, water evaporates from the sea, rises, cools and forms clouds. What process forms the clouds?',
    options:['Freezing','Evaporation','Melting','Condensation'],
    answer:'Condensation',
    hint:'Clouds are made of tiny water droplets - water vapour has turned back into liquid.',
    explanation:'When water vapour rises high into the atmosphere and cools, it undergoes <b>condensation</b> - turning back into tiny liquid water droplets that form clouds.' }),

  makeMCQ({ id:'g5sci-wm-012', chapterId:'water-matter', difficulty:2,
    question:'What happens to butter when it is left in a warm room?',
    options:[
      'It evaporates into the air',
      'It melts and becomes liquid',
      'It freezes and becomes harder',
      'It condenses into water'
    ],
    answer:'It melts and becomes liquid',
    hint:'Butter is a solid. What does heat do to solids?',
    explanation:'Butter is a solid that <b>melts</b> when warmed - it changes from solid to liquid. This is the same process as ice melting into water.' }),

  makeMCQ({ id:'g5sci-wm-013', chapterId:'water-matter', difficulty:2,
    question:'A cold glass of water is left on a table on a humid day. Small droplets of water appear on the OUTSIDE of the glass. By which process do these droplets form?',
    options:['Melting','Evaporation','Condensation','Freezing'],
    answer:'Condensation',
    hint:'The glass is cold - what happens to warm, moist air when it touches the cold surface?',
    explanation:'The water droplets on the outside of the cold glass form by <b>condensation</b>. Warm, moist air surrounding the glass is cooled when it touches the cold surface. This causes the water vapour in the air to change back into liquid water droplets.' }),

  makeMCQ({ id:'g5sci-wm-014', chapterId:'water-matter', difficulty:1,
    question:'What is the liquid found inside a thermometer?',
    options:['Alcohol or mercury','Petrol','Cooking oil','Salt water'],
    answer:'Alcohol or mercury',
    hint:'Traditional thermometers use one of two special liquids that expand and contract with temperature.',
    explanation:'Thermometers use either <b>alcohol</b> (usually red-coloured) or <b>mercury</b> (shiny silver liquid). Both expand when heated and contract when cooled, causing the liquid column to rise or fall and show the temperature.' }),

  makeMCQ({ id:'g5sci-wm-015', chapterId:'water-matter', difficulty:2,
    question:'What happens to the level of mercury inside a thermometer when the temperature INCREASES?',
    options:['It falls','It stays the same','It rises','It disappears'],
    answer:'It rises',
    hint:'Mercury expands when heated - if it takes up more space, which way does it go in the narrow tube?',
    explanation:'When temperature increases, the mercury (or alcohol) in the thermometer <b>expands</b> and takes up more volume. Since the tube is narrow, the liquid is pushed <b>upward</b>, causing the level to rise.' }),

  makeMCQ({ id:'g5sci-wm-016', chapterId:'water-matter', difficulty:2,
    question:'A table shows air temperatures measured at different times: 6 a.m. = 15°C, 10 a.m. = 18°C, 1 p.m. = 23°C, 4 p.m. = 21°C, 8 p.m. = 19°C. At what time was the temperature highest?',
    options:['6 a.m.','10 a.m.','1 p.m.','8 p.m.'],
    answer:'1 p.m.',
    hint:'Find the largest number in the table.',
    explanation:'The highest temperature was <b>23°C at 1 p.m.</b> This is because the sun is highest in the sky around midday, providing maximum heating. By the evening the temperature falls as the sun sets.' }),

  makeMCQ({ id:'g5sci-wm-017', chapterId:'water-matter', difficulty:3,
    question:'The temperature was lower at 6 a.m. than at 1 p.m. What is the BEST explanation for this?',
    options:[
      'It rains in the morning, making the temperature lower',
      'The sun has not been heating the ground for long at 6 a.m., so it is cooler',
      'The thermometer does not work properly in the morning',
      'Wind is stronger in the morning, making the temperature lower'
    ],
    answer:'The sun has not been heating the ground for long at 6 a.m., so it is cooler',
    hint:'During the night, no sunlight heats the ground. The sun only starts warming things after it rises.',
    explanation:'At <b>6 a.m.</b>, the sun has just risen (or not yet risen). The ground has been losing heat overnight with no sunlight to replace it, so the temperature is at its lowest point of the day. By 1 p.m., the sun has been heating the ground for several hours, making it the warmest time.' }),

  makeMCQ({ id:'g5sci-wm-018', chapterId:'water-matter', difficulty:3,
    question:'Ice cubes are put in a glass of water. After some time, the ice melts. What happens to the temperature of the water as the ice melts?',
    options:[
      'It increases because ice releases heat energy',
      'It decreases (becomes cooler) because melting ice absorbs heat from the surrounding water',
      'It stays exactly the same throughout',
      'It first increases then decreases rapidly'
    ],
    answer:'It decreases (becomes cooler) because melting ice absorbs heat from the surrounding water',
    hint:'The ice needs energy (heat) to melt - where does this energy come from?',
    explanation:'To melt, ice must <b>absorb heat energy</b>. This heat comes from the surrounding water. As heat is drawn out of the water, the water becomes <b>cooler</b>. This is why ice is used to keep drinks cold - the melting process removes heat from the liquid.' }),

  makeMCQ({ id:'g5sci-wm-019', chapterId:'water-matter', difficulty:2,
    question:'Give ONE property of ice that makes skating possible.',
    options:['Ice is hard','Ice is slippery','Ice is transparent','Ice is white'],
    answer:'Ice is slippery',
    hint:'Think about why you can slide on ice.',
    explanation:'Ice is <b>slippery</b> - this is the property that makes skating possible. Ice skate blades glide smoothly over the ice surface with very little friction, allowing the skater to slide.' }),

  makeMCQ({ id:'g5sci-wm-020', chapterId:'water-matter', difficulty:4,
    question:'A scientist puts identical ice cubes in three containers: one in a freezer (−10°C), one in a warm room (25°C) and one in boiling water (100°C). Rank them from slowest to fastest melting and explain WHY.',
    options:[
      'Freezer slowest (ice cannot melt at −10°C), warm room next, boiling water fastest (most heat available)',
      'Boiling water slowest, warm room next, freezer fastest',
      'All melt at the same speed regardless of temperature',
      'Warm room fastest because ice melts better in still air'
    ],
    answer:'Freezer slowest (ice cannot melt at −10°C), warm room next, boiling water fastest (most heat available)',
    hint:'Ice melts when it absorbs enough heat to reach 0°C. More heat available = faster melting.',
    explanation:'In the <b>freezer</b>, the temperature is below 0°C so ice does not melt - it stays frozen. In the <b>warm room</b> (25°C), heat slowly transfers from the air to the ice, melting it gradually. In <b>boiling water</b> (100°C), a large amount of heat transfers to the ice very quickly, melting it fastest. The rate of melting depends on the temperature difference between the ice and its surroundings.' })

);
