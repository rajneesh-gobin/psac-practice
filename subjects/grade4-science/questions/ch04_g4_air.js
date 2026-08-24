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

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4s-air-011', chapterId:'g4sci-air', difficulty:1,
    question:'Air is a mixture of gases. Which gas makes up the LARGEST proportion of air (about 78%)?',
    options:['Oxygen','Carbon dioxide','Nitrogen','Hydrogen'],
    answer:'Nitrogen',
    hint:'It is NOT the gas we breathe for energy. Air is mostly this other gas.',
    explanation:'Air is approximately <b>78% nitrogen</b>, 21% oxygen, and about 1% other gases (argon, carbon dioxide, etc.). <b>Nitrogen</b> is the most abundant gas in air, even though oxygen is the gas we need for breathing and combustion.' }),

  makeMCQ({ id:'g4s-air-012', chapterId:'g4sci-air', difficulty:1,
    question:'Which gas in air do PLANTS use for photosynthesis?',
    options:['Oxygen','Nitrogen','Carbon dioxide','Hydrogen'],
    answer:'Carbon dioxide',
    hint:'Plants take in this gas through their stomata and combine it with water and sunlight.',
    explanation:'Plants absorb <b>carbon dioxide (CO₂)</b> from the air through tiny pores called stomata. They use CO₂ + water + sunlight to make food (photosynthesis). Animals breathe out CO₂ as waste, and plants use it.' }),

  makeTF({ id:'g4s-air-013', chapterId:'g4sci-air', difficulty:1,
    question:'Air has MASS (it weighs something).',
    answer:true,
    hint:'If you blow up a balloon, does it become heavier or lighter than when it was empty?',
    explanation:'<b>True.</b> Air has <b>mass</b> — a blown-up balloon is slightly heavier than an empty one because it contains more air. Air is a physical substance with weight, not "nothing".' }),

  makeMCQ({ id:'g4s-air-014', chapterId:'g4sci-air', difficulty:2,
    question:'What is the ATMOSPHERE?',
    options:[
      'The water in the ocean',
      'The layer of gases (mainly air) that surrounds the Earth',
      'The soil on the Earth\'s surface',
      'The space between planets'
    ],
    answer:'The layer of gases (mainly air) that surrounds the Earth',
    hint:'The atmosphere is like a blanket of air surrounding our planet.',
    explanation:'The <b>atmosphere</b> is the layer of gases surrounding the Earth. It contains the air we breathe (nitrogen, oxygen and other gases) and protects us from harmful radiation. Without the atmosphere, there would be no air, no weather, and life would be impossible.' }),

  makeMCQ({ id:'g4s-air-015', chapterId:'g4sci-air', difficulty:2,
    question:'Why could humans NOT survive on the Moon without a spacesuit?',
    options:[
      'Because the Moon is too far from Earth',
      'Because there is no atmosphere on the Moon, so there is no oxygen to breathe',
      'Because the Moon is too cold to walk on',
      'Because there is no gravity on the Moon'
    ],
    answer:'Because there is no atmosphere on the Moon, so there is no oxygen to breathe',
    hint:'Without an atmosphere, what essential gas would be missing?',
    explanation:'The Moon has almost no <b>atmosphere</b> — there is no air and therefore <b>no oxygen to breathe</b>. Astronauts must carry their own oxygen supply in spacesuits. The lack of breathable air is the primary reason humans cannot survive on the Moon without protection.' }),

  makeMCQ({ id:'g4s-air-016', chapterId:'g4sci-air', difficulty:2,
    question:'What happens to the percentage of OXYGEN in the air when a candle burns in a sealed container?',
    options:[
      'Oxygen percentage increases',
      'Oxygen percentage stays the same',
      'Oxygen percentage decreases as the candle uses it for combustion',
      'Nitrogen replaces all the oxygen'
    ],
    answer:'Oxygen percentage decreases as the candle uses it for combustion',
    hint:'Burning (combustion) requires oxygen and uses it up.',
    explanation:'As the candle burns, it <b>uses up oxygen</b> (combustion: fuel + oxygen → carbon dioxide + water + heat). In a sealed container, the oxygen percentage <b>decreases</b> until it is too low to support the flame — the candle goes out. This shows oxygen is consumed during combustion.' }),

  makeTF({ id:'g4s-air-017', chapterId:'g4sci-air', difficulty:2,
    question:'Greenhouse gases like carbon dioxide help trap heat in the Earth\'s atmosphere.',
    answer:true,
    hint:'Think of a greenhouse — glass lets sunlight in but traps heat inside.',
    explanation:'<b>True.</b> Greenhouse gases (including carbon dioxide, water vapour and methane) absorb heat from the Earth\'s surface and trap it — like the glass of a greenhouse. A moderate greenhouse effect keeps Earth warm. Too much CO₂ from burning fossil fuels increases this effect, causing global warming.' }),

  makeMCQ({ id:'g4s-air-018', chapterId:'g4sci-air', difficulty:3,
    question:'Which statement BEST describes the relationship between plants and animals regarding AIR?',
    options:[
      'Plants and animals both take in only oxygen and release only carbon dioxide.',
      'Animals breathe in oxygen and breathe out carbon dioxide; plants take in carbon dioxide and release oxygen during photosynthesis.',
      'Only animals use air — plants do not need air at all.',
      'Plants and animals both take in carbon dioxide and release oxygen.'
    ],
    answer:'Animals breathe in oxygen and breathe out carbon dioxide; plants take in carbon dioxide and release oxygen during photosynthesis.',
    hint:'Think about what each one takes IN and gives OUT.',
    explanation:'Animals breathe in <b>oxygen</b> and breathe out <b>carbon dioxide</b>. During photosynthesis, plants take in <b>carbon dioxide</b> and release <b>oxygen</b>. This is a complementary relationship — animals produce the CO₂ that plants need, and plants produce the O₂ that animals need.' }),

  makeMCQ({ id:'g4s-air-019', chapterId:'g4sci-air', difficulty:4,
    question:'A city council must choose: plant 500 new trees along the main road OR build a new car park. Which option BETTER reduces air pollution, and why?',
    options:[
      'Car park — more cars can park and they produce fewer fumes when stationary',
      'Trees — they absorb carbon dioxide, release oxygen, and filter dust particles from the air',
      'Neither — trees and car parks have the same effect on air quality',
      'Car park — because fewer people will drive if there is parking nearby'
    ],
    answer:'Trees — they absorb carbon dioxide, release oxygen, and filter dust particles from the air',
    hint:'Think about what trees do to air quality versus what a car park encourages.',
    explanation:'<b>Planting trees</b> directly improves air quality: trees absorb CO₂ (a greenhouse gas), release O₂, and filter dust particles through their leaves. A car park encourages more driving → more exhaust → worse air quality. Trees are a proven natural solution to urban air pollution.' })

);
