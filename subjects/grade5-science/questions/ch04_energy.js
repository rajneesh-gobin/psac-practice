'use strict';
// Grade 5 Science — Chapter: Energy Sources
// Uses STATIC_QUESTIONS + helpers from engine/helpers.js
// IDs format: g5sci-en-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5sci-en-001', chapterId:'energy', difficulty:1,
    question:'What energy source does a sailing boat use to move?',
    options:['Petrol','Wind','Solar panels','Water'],
    answer:'Wind',
    hint:'Think about what fills the sails of a boat.',
    explanation:'A sailing boat uses wind energy — the wind pushes against the sails, moving the boat through the water.' }),

  makeMCQ({ id:'g5sci-en-002', chapterId:'energy', difficulty:1,
    question:'Which of the following is a RENEWABLE energy source?',
    options:['Coal','Oil','Natural gas','Solar energy'],
    answer:'Solar energy',
    hint:'Renewable energy comes from a source that will not run out.',
    explanation:'Solar energy from the sun is renewable — it will not run out. Coal, oil and natural gas are fossil fuels — they are non-renewable.' }),

  makeMCQ({ id:'g5sci-en-003', chapterId:'energy', difficulty:1,
    question:'Which of the following is a NON-RENEWABLE energy source?',
    options:['Wind energy','Solar energy','Petrol','Water (hydro) energy'],
    answer:'Petrol',
    hint:'Non-renewable means it was formed millions of years ago and will eventually run out.',
    explanation:'Petrol is made from oil, which is a fossil fuel. Fossil fuels are non-renewable because they take millions of years to form and will eventually run out.' }),

  makeMCQ({ id:'g5sci-en-004', chapterId:'energy', difficulty:2,
    question:'Which form of energy from the sun is captured by solar panels?',
    options:['Sound energy','Light energy','Kinetic energy','Nuclear energy'],
    answer:'Light energy',
    hint:'Solar panels use one specific form of energy that comes from the sun.',
    explanation:'Solar panels convert light energy (sunlight) from the sun into electrical energy.' }),

  makeMCQ({ id:'g5sci-en-005', chapterId:'energy', difficulty:2,
    question:'Why is using solar panels better than using fossil fuels for producing electricity?',
    options:[
      'Solar panels produce more electricity than fossil fuels',
      'Solar energy is renewable and does not cause air pollution',
      'Solar panels are cheaper to build than power stations',
      'Solar panels work well on cloudy days too'
    ],
    answer:'Solar energy is renewable and does not cause air pollution',
    hint:'Think about the effect of burning fossil fuels on the environment.',
    explanation:'Solar panels use sunlight which is renewable and free, and do not produce greenhouse gases or air pollution. Burning fossil fuels causes air pollution and contributes to climate change.' }),

  makeMCQ({ id:'g5sci-en-006', chapterId:'energy', difficulty:1,
    question:'Which of the following is a way to SAVE electricity at home?',
    options:[
      'Leave lights on all night',
      'Use air conditioning with the windows open',
      'Switch off lights and fans when leaving a room',
      'Charge all devices even when the battery is full'
    ],
    answer:'Switch off lights and fans when leaving a room',
    hint:'Saving electricity means using less of it.',
    explanation:'Switching off lights and fans when leaving a room saves electricity. Leaving devices on unnecessarily wastes energy.' }),

  makeNum({ id:'g5sci-en-007', chapterId:'energy', difficulty:2,
    question:'Thermal power stations burn __________ such as coal, oil or gas to produce electricity. (Two words)',
    answer:'fossil fuels', acceptableAnswers:['fossil fuels','fuel','fuels'],
    hint:'These are fuels formed from ancient living things millions of years ago.',
    explanation:'Thermal power stations burn <b>fossil fuels</b> (coal, oil, gas) to heat water, produce steam, spin turbines and generate electricity.' }),

  makeTF({ id:'g5sci-en-008', chapterId:'energy', difficulty:1,
    question:'Wind is a renewable source of energy because it will never run out.',
    answer:true,
    hint:'Think about what causes wind.',
    explanation:'Wind is caused by the uneven heating of the Earth\'s surface by the sun. As long as the sun shines, there will be wind — making it renewable.' }),

  makeMCQ({ id:'g5sci-en-009', chapterId:'energy', difficulty:1,
    question:'Which energy source does a motorcycle use?',
    options:['Wind','Solar energy','Water','Petrol'],
    answer:'Petrol',
    hint:'Motorcycles have a fuel tank.',
    explanation:'A motorcycle uses petrol (a fossil fuel) as its energy source. Petrol is burned in the engine to produce the energy needed to move the motorcycle.' }),

  makeMCQ({ id:'g5sci-en-010', chapterId:'energy', difficulty:2,
    question:'What type of fuel is used in thermal power stations to produce electricity in Mauritius?',
    options:['Solar energy','Coal and heavy oil','Wind energy','Water (hydropower)'],
    answer:'Coal and heavy oil',
    hint:'The name "thermal" comes from the word for heat.',
    explanation:'Thermal power stations in Mauritius burn coal and heavy oil (fossil fuels) to produce heat, create steam, and generate electricity through turbines.' })

);
