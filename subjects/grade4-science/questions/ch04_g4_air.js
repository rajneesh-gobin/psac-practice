'use strict';
// Grade 4 Science — Chapter: Air
// IDs format: g4s-air-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4s-air-001', chapterId:'g4sci-air', difficulty:1,
    question:'What colour is air?',
    options:['White','Blue','Grey','It has no colour (colourless)'],
    answer:'It has no colour (colourless)',
    hint:'Look around you — can you see air?',
    explanation:'Air is <b>colourless</b> — it has no colour, which is why we cannot see it. Air is also <b>odourless</b> (no smell) and <b>tasteless</b>. Clean air is invisible, but we know it is there because we can feel wind (moving air) and we breathe it.' }),

  makeMCQ({ id:'g4s-air-002', chapterId:'g4sci-air', difficulty:1,
    question:'Which gas from air do humans and animals need to BREATHE?',
    options:['Nitrogen','Carbon dioxide','Oxygen','Hydrogen'],
    answer:'Oxygen',
    hint:'This gas is used by your body cells to release energy from food.',
    explanation:'Humans and animals need <b>oxygen</b> to breathe. We breathe in air, and our lungs take oxygen from it into our blood. The blood carries oxygen to all body cells, which use it to release energy from food (respiration). We breathe out carbon dioxide as a waste gas.' }),

  makeTF({ id:'g4s-air-003', chapterId:'g4sci-air', difficulty:1,
    question:'Air takes up space.',
    answer:true,
    hint:'Try pushing air into a balloon — what happens?',
    explanation:'<b>True.</b> Air takes up space, just like any other matter. When you blow up a balloon, air fills the space inside. You can also see a plastic bag inflate when you trap air inside it. Air has both <b>mass</b> and <b>volume</b> — it is a real substance, not "nothing".' }),

  makeMCQ({ id:'g4s-air-004', chapterId:'g4sci-air', difficulty:1,
    question:'What is WIND?',
    options:['Rain falling from clouds','Moving air','A type of gas different from air','Steam rising from hot water'],
    answer:'Moving air',
    hint:'Wind is simply air that is in motion.',
    explanation:'<b>Wind</b> is <b>moving air</b>. When air moves from one place to another, we feel it as wind. Wind is caused by differences in temperature — warm air rises and cool air moves in to replace it. Wind is used in windmills and wind turbines to generate electricity.' }),

  makeMCQ({ id:'g4s-air-005', chapterId:'g4sci-air', difficulty:2,
    question:'A burning candle is placed under a glass jar. After a few minutes, the flame goes out. Why?',
    options:[
      'The jar became too hot',
      'The candle used up all the oxygen in the jar and the flame could not burn without it',
      'The glass jar blew out the flame',
      'Candles can only burn for a few minutes'
    ],
    answer:'The candle used up all the oxygen in the jar and the flame could not burn without it',
    hint:'What gas is needed for things to burn?',
    explanation:'Burning (combustion) requires <b>oxygen</b>. In the sealed jar, the candle used up all the available oxygen. Once the oxygen was gone, the flame could no longer burn and went out. This proves that <b>oxygen is needed for combustion</b>.' }),

  makeMCQ({ id:'g4s-air-006', chapterId:'g4sci-air', difficulty:2,
    question:'Which is a CAUSE of air pollution?',
    options:[
      'Plants releasing oxygen',
      'Vehicles releasing exhaust fumes',
      'Wind blowing through trees',
      'Rain washing streets'
    ],
    answer:'Vehicles releasing exhaust fumes',
    hint:'Pollution means harmful substances are released into the environment.',
    explanation:'<b>Vehicles releasing exhaust fumes</b> is a major cause of air pollution. Car engines burn petrol or diesel, releasing harmful gases (carbon monoxide, nitrogen oxides, carbon dioxide) and soot into the air. Other causes: factories, burning of waste, deforestation.' }),

  makeMCQ({ id:'g4s-air-007', chapterId:'g4sci-air', difficulty:2,
    question:'What is ONE effect of breathing POLLUTED air?',
    options:['Better eyesight','Coughing and breathing problems','Stronger muscles','Faster growth'],
    answer:'Coughing and breathing problems',
    hint:'The lungs are directly exposed to whatever is in the air you breathe.',
    explanation:'Breathing polluted air causes <b>coughing, asthma attacks and breathing difficulties</b>. Pollutants irritate the lining of the airways and lungs. Long-term exposure can cause serious lung diseases. Children and the elderly are especially at risk.' }),

  makeMCQ({ id:'g4s-air-008', chapterId:'g4sci-air', difficulty:2,
    question:'Which is a good way to REDUCE air pollution?',
    options:[
      'Burn more rubbish in open areas',
      'Use more private cars',
      'Plant more trees and use public transport',
      'Cut down forests for factories'
    ],
    answer:'Plant more trees and use public transport',
    hint:'Trees help clean the air; fewer cars means less exhaust fumes.',
    explanation:'<b>Planting trees</b> helps because trees absorb carbon dioxide (a greenhouse gas) and release oxygen. <b>Using public transport</b> reduces the number of vehicles on the road, cutting exhaust pollution. Other ways: use renewable energy, avoid burning waste, walk or cycle short distances.' }),

  makeMCQ({ id:'g4s-air-009', chapterId:'g4sci-air', difficulty:3,
    question:'Why do PLANTS need air?',
    options:[
      'To cool down their leaves',
      'To absorb carbon dioxide for photosynthesis',
      'To produce oxygen for burning',
      'Plants do not need air'
    ],
    answer:'To absorb carbon dioxide for photosynthesis',
    hint:'Remember what plants use as one of the three ingredients for photosynthesis.',
    explanation:'Plants need air to absorb <b>carbon dioxide (CO₂)</b>, which they use in <b>photosynthesis</b> to make food. During photosynthesis: carbon dioxide + water + sunlight → food (glucose) + oxygen. So plants take in CO₂ from air and release oxygen — the opposite of what animals do when they breathe.' }),

  makeMCQ({ id:'g4s-air-010', chapterId:'g4sci-air', difficulty:4,
    question:'A factory opens near a town. Within one year, reports show a 25% increase in asthma cases among children, and measurements show high levels of sulphur dioxide in the air. What is the MOST LIKELY conclusion?',
    options:[
      'The children are getting asthma from eating too much sugar',
      'The factory\'s sulphur dioxide emissions are likely polluting the air and contributing to the rise in asthma cases',
      'The increase in asthma is unrelated to the factory because factories are far away',
      'Sulphur dioxide is harmless and the asthma increase is a coincidence'
    ],
    answer:'The factory\'s sulphur dioxide emissions are likely polluting the air and contributing to the rise in asthma cases',
    hint:'Two events happened at the same time: factory opened AND asthma cases rose. What is the likely link?',
    explanation:'The timing and evidence suggest a strong link: the factory releases <b>sulphur dioxide</b> (a known air pollutant that irritates airways), and asthma cases rose after it opened. The most reasonable conclusion is that the <b>factory\'s pollution is contributing to the health problems</b>. This is why factories must have emission controls to protect public health.' })

);
