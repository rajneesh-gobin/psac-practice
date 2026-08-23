'use strict';
// Grade 5 Science — Chapter: Air
// IDs format: g5sci-air-NNN

// Simple bar diagram showing air composition
const _SVG_AIR = `<svg viewBox="0 0 220 90" width="220" height="90" style="display:block;margin:6px auto;background:#f0f9ff;border-radius:8px;border:1px solid #bae6fd">
  <rect x="10" y="20" width="125" height="28" rx="4" fill="#93c5fd" stroke="#3b82f6" stroke-width="1"/>
  <text x="72" y="39" text-anchor="middle" font-size="9" fill="#1e3a8a" font-weight="bold">Nitrogen (~78%)</text>
  <rect x="10" y="55" width="36" height="22" rx="4" fill="#6ee7b7" stroke="#10b981" stroke-width="1"/>
  <text x="28" y="70" text-anchor="middle" font-size="8" fill="#064e3b" font-weight="bold">O&#8322;</text>
  <text x="10" y="88" font-size="7" fill="#065f46">(~21% oxygen)</text>
  <rect x="150" y="55" width="10" height="22" rx="2" fill="#fca5a5" stroke="#ef4444" stroke-width="1"/>
  <text x="147" y="88" font-size="6.5" fill="#7f1d1d">(~1% other</text>
  <text x="147" y="95" font-size="6.5" fill="#7f1d1d">gases)</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5sci-air-001', chapterId:'air', difficulty:1,
    question:'What type of substance is air?',
    options:['A pure element','A mixture of gases','A liquid','A single gas'],
    answer:'A mixture of gases',
    hint:'Air contains more than one type of gas.',
    explanation:'Air is a <b>mixture of gases</b>. It contains mainly nitrogen and oxygen, plus small amounts of carbon dioxide and other gases.' }),

  makeMCQ({ id:'g5sci-air-002', chapterId:'air', difficulty:1,
    question:'Which gas in air do humans (and animals) need in order to breathe?',
    options:['Nitrogen','Carbon dioxide','Oxygen','Hydrogen'],
    answer:'Oxygen',
    hint:'When you breathe in, your lungs take this gas into your blood.',
    explanation:'Humans and animals breathe in <b>oxygen</b>. The oxygen is absorbed into the blood and used by cells to release energy from food (respiration).' }),

  makeMCQ({ id:'g5sci-air-003', chapterId:'air', difficulty:2,
    question:`${_SVG_AIR}Looking at the diagram above, which gas makes up the LARGEST proportion of air?`,
    options:['Oxygen','Carbon dioxide','Nitrogen','Hydrogen'],
    answer:'Nitrogen',
    hint:'Look at the biggest blue bar in the diagram.',
    explanation:'<b>Nitrogen</b> makes up approximately <b>78%</b> of air — the largest proportion. Oxygen accounts for about 21%, and the remaining 1% is other gases including carbon dioxide.' }),

  makeMCQ({ id:'g5sci-air-004', chapterId:'air', difficulty:2,
    question:'Which gas do humans breathe OUT in greater amounts than they breathe in?',
    options:['Nitrogen','Oxygen','Carbon dioxide','Helium'],
    answer:'Carbon dioxide',
    hint:'This is the waste gas produced during respiration inside your cells.',
    explanation:'During respiration, cells use oxygen and release <b>carbon dioxide</b> as a waste product. We breathe out more carbon dioxide than we breathe in.' }),

  makeTF({ id:'g5sci-air-005', chapterId:'air', difficulty:1,
    question:'Air is made of only one gas — oxygen.',
    answer:false,
    hint:'Think about all the gases you have learned that make up air.',
    explanation:'Air is a <b>mixture</b> of several gases, not just one. It contains approximately 78% nitrogen, 21% oxygen and about 1% other gases (such as carbon dioxide and argon).' }),

  makeMCQ({ id:'g5sci-air-006', chapterId:'air', difficulty:1,
    question:'What is wind?',
    options:[
      'Rain clouds moving across the sky',
      'Moving air caused by differences in air temperature and pressure',
      'A type of gas that is different from air',
      'Steam rising from the ocean'
    ],
    answer:'Moving air caused by differences in air temperature and pressure',
    hint:'Wind is simply air that is in motion.',
    explanation:'<b>Wind</b> is moving air. It is caused by differences in temperature across the Earth\'s surface, which create differences in air pressure. Air moves from high pressure to low pressure, creating wind.' }),

  makeTF({ id:'g5sci-air-007', chapterId:'air', difficulty:1,
    question:'Oxygen is needed for things to burn (combust).',
    answer:true,
    hint:'Try to think of why a fire goes out if you cover it.',
    explanation:'True. <b>Oxygen</b> is essential for combustion (burning). Without oxygen, a fire will go out. This is why covering a small fire with a damp cloth smothers it — it cuts off the oxygen supply.' }),

  makeMCQ({ id:'g5sci-air-008', chapterId:'air', difficulty:2,
    question:'Which of the following is a CAUSE of air pollution?',
    options:[
      'Plants releasing oxygen through photosynthesis',
      'Factories releasing smoke and harmful gases',
      'Wind turbines generating electricity',
      'Rain washing dust off roads'
    ],
    answer:'Factories releasing smoke and harmful gases',
    hint:'Pollution means harmful substances are added to the environment.',
    explanation:'<b>Air pollution</b> occurs when harmful substances (smoke, dust, toxic gases) are released into the air. Factories, cars, burning of rubbish and fossil fuels are major causes of air pollution.' }),

  makeMCQ({ id:'g5sci-air-009', chapterId:'air', difficulty:2,
    question:'How does breathing polluted air affect human health?',
    options:[
      'It has no effect on humans',
      'It can cause breathing problems, asthma and lung diseases',
      'It makes people grow taller',
      'It improves the immune system'
    ],
    answer:'It can cause breathing problems, asthma and lung diseases',
    hint:'The lungs are directly exposed to whatever is in the air we breathe.',
    explanation:'Breathing polluted air can cause <b>breathing difficulties, asthma, coughing and lung diseases</b>. Long-term exposure to air pollution can seriously damage the lungs and other organs.' }),

  makeMCQ({ id:'g5sci-air-010', chapterId:'air', difficulty:2,
    question:'Which of the following helps to REDUCE air pollution?',
    options:[
      'Burning more coal to produce electricity',
      'Using more private cars',
      'Using solar panels and wind turbines instead of fossil fuels',
      'Cutting down more trees'
    ],
    answer:'Using solar panels and wind turbines instead of fossil fuels',
    hint:'Renewable energy does not produce smoke or harmful gases.',
    explanation:'Using <b>renewable energy</b> (solar, wind) instead of fossil fuels reduces the burning of coal and oil, which are the main sources of air-polluting gases like carbon dioxide and sulphur dioxide.' })

);
