'use strict';
// Grade 5 Science — Chapter: Water & States of Matter
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
    hint:'Think about ice, water and steam — what are these three forms called?',
    explanation:'Matter exists in three states: <b>solid</b> (e.g. ice), <b>liquid</b> (e.g. water) and <b>gas</b> (e.g. steam/water vapour).' }),

  makeMCQ({ id:'g5sci-wm-002', chapterId:'water-matter', difficulty:1,
    question:'What is the state of water when it is in the form of ice?',
    options:['Liquid','Gas','Solid','Vapour'],
    answer:'Solid',
    hint:'Ice is frozen water — very hard and rigid.',
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
    hint:'Think about what steam looks like — can you hold it?',
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
    hint:'The sun heats the water — what happens when water is heated?',
    explanation:'The sun\'s heat causes the water to <b>evaporate</b> — changing from liquid water into invisible water vapour in the air.' }),

  makeMCQ({ id:'g5sci-wm-011', chapterId:'water-matter', difficulty:2,
    question:'In the water cycle, water evaporates from the sea, rises, cools and forms clouds. What process forms the clouds?',
    options:['Freezing','Evaporation','Melting','Condensation'],
    answer:'Condensation',
    hint:'Clouds are made of tiny water droplets — water vapour has turned back into liquid.',
    explanation:'When water vapour rises high into the atmosphere and cools, it undergoes <b>condensation</b> — turning back into tiny liquid water droplets that form clouds.' }),

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
    explanation:'Butter is a solid that <b>melts</b> when warmed — it changes from solid to liquid. This is the same process as ice melting into water.' })

);
