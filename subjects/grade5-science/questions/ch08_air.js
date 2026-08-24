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
    explanation:'Using <b>renewable energy</b> (solar, wind) instead of fossil fuels reduces the burning of coal and oil, which are the main sources of air-polluting gases like carbon dioxide and sulphur dioxide.' }),

  makeMCQ({ id:'g5sci-air-011', chapterId:'air', difficulty:1,
    question:'What form of energy does a sailing boat use to move across the water?',
    options:['Chemical energy (petrol)','Electrical energy','Wind (movement) energy','Solar energy'],
    answer:'Wind (movement) energy',
    hint:'Look at the sails — what fills them?',
    explanation:'A sailing boat uses <b>wind energy</b>. The moving air (wind) pushes against the sails, providing the force needed to move the boat across the water. Wind energy is a form of kinetic (movement) energy.' }),

  makeNum({ id:'g5sci-air-012', chapterId:'air', difficulty:2,
    question:'Air is made up of approximately 78% nitrogen, 21% __________ and about 1% other gases. (One word)',
    answer:'oxygen', acceptableAnswers:['oxygen'],
    hint:'This is the gas that humans need to breathe to survive.',
    explanation:'Air is composed of approximately 78% <b>nitrogen</b>, 21% <b>oxygen</b>, and about 1% other gases (including carbon dioxide and argon). Oxygen is the gas that living things use for respiration.' }),

  makeMCQ({ id:'g5sci-air-013', chapterId:'air', difficulty:2,
    question:'Why do trees and plants help to REDUCE air pollution?',
    options:[
      'They release carbon dioxide which cleans the air',
      'They absorb carbon dioxide and release oxygen during photosynthesis',
      'They produce wind which blows pollution away',
      'They absorb oxygen and release carbon dioxide'
    ],
    answer:'They absorb carbon dioxide and release oxygen during photosynthesis',
    hint:'What gas do plants take in, and what do they give out, during photosynthesis?',
    explanation:'During photosynthesis, plants <b>absorb carbon dioxide</b> (a greenhouse gas and air pollutant) from the air and <b>release oxygen</b>. This helps to clean the air and reduce the concentration of carbon dioxide, which is a major cause of climate change and air pollution.' }),

  makeMCQ({ id:'g5sci-air-014', chapterId:'air', difficulty:3,
    question:'A sealed room contains a burning candle and a mouse. After some time, the candle goes out AND the mouse becomes distressed. What is the BEST explanation?',
    options:[
      'The room gets too hot for the candle to burn',
      'The candle and the mouse both use up oxygen; when oxygen runs out the flame dies and the mouse cannot breathe',
      'The mouse blows out the candle by moving around',
      'Carbon dioxide makes the candle flame burn and oxygen makes the mouse breathe — they compete'
    ],
    answer:'The candle and the mouse both use up oxygen; when oxygen runs out the flame dies and the mouse cannot breathe',
    hint:'Both combustion (burning) and respiration need the same gas.',
    explanation:'Both the candle (combustion) and the mouse (respiration) use up <b>oxygen</b>. In a sealed room, the oxygen is gradually used up. First the candle flame goes out (combustion needs oxygen), then the mouse becomes distressed (respiration needs oxygen). This shows that both burning and breathing depend on oxygen.' }),

  makeMCQ({ id:'g5sci-air-015', chapterId:'air', difficulty:3,
    question:'Factories near a school release smoke that contains sulphur dioxide and soot particles. Students at the school report increased coughing and asthma attacks. What does this suggest about the link between air quality and health?',
    options:[
      'Coughing at school is caused by the noise of the factories',
      'Breathing air containing smoke, soot and sulphur dioxide irritates the lungs and can trigger respiratory problems',
      'Students are allergic to the colour of the factory buildings',
      'Asthma is caused by studying too hard, not by pollution'
    ],
    answer:'Breathing air containing smoke, soot and sulphur dioxide irritates the lungs and can trigger respiratory problems',
    hint:'What enters the body every time a student breathes near the factory?',
    explanation:'When students breathe air containing <b>smoke, soot and sulphur dioxide</b>, these particles and gases irritate and damage the lining of the airways and lungs. This can trigger <b>coughing, asthma attacks and other respiratory illnesses</b>. This illustrates the direct link between poor air quality and poor health.' }),

  makeMCQ({ id:'g5sci-air-016', chapterId:'air', difficulty:4,
    question:'Town A plants 10,000 trees along its streets and parks over 5 years. Measurements show that carbon dioxide levels in the air decreased by 12% and respiratory illness rates dropped by 8%. What TWO conclusions can be reasonably drawn from this data?',
    options:[
      'Trees absorb CO₂ and improve air quality, AND better air quality appears to reduce respiratory illness rates in the town',
      'Trees cause illness by releasing pollen, AND CO₂ levels fell because fewer cars were used',
      'The data proves trees are the only solution to air pollution, AND all towns must plant exactly 10,000 trees',
      'CO₂ levels fell due to rainfall, AND the illness drop was a coincidence'
    ],
    answer:'Trees absorb CO₂ and improve air quality, AND better air quality appears to reduce respiratory illness rates in the town',
    hint:'Look at what changed and what also changed — but remember, correlation does not always equal causation.',
    explanation:'Two reasonable conclusions: (1) <b>Trees absorb CO₂</b> — the 12% reduction in CO₂ levels is consistent with trees absorbing it during photosynthesis; (2) <b>Better air quality is associated with fewer respiratory illnesses</b> — the 8% drop in illness rates after air quality improved suggests a link. Note: we cannot prove trees CAUSED the illness drop without ruling out other factors (confounding variables), but the data is consistent with this conclusion.' })

);
