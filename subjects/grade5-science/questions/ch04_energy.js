'use strict';
// Grade 5 Science - Chapter: Energy Sources
// Uses STATIC_QUESTIONS + helpers from engine/helpers.js
// IDs format: g5sci-en-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5sci-en-001', chapterId:'energy', difficulty:1,
    question:'What energy source does a sailing boat use to move?',
    options:['Petrol','Wind','Solar panels','Water'],
    answer:'Wind',
    hint:'Think about what fills the sails of a boat.',
    explanation:'A sailing boat uses wind energy - the wind pushes against the sails, moving the boat through the water.' }),

  makeMCQ({ id:'g5sci-en-002', chapterId:'energy', difficulty:1,
    question:'Which of the following is a RENEWABLE energy source?',
    options:['Coal','Oil','Natural gas','Solar energy'],
    answer:'Solar energy',
    hint:'Renewable energy comes from a source that will not run out.',
    explanation:'Solar energy from the sun is renewable - it will not run out. Coal, oil and natural gas are fossil fuels - they are non-renewable.' }),

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
    explanation:'Wind is caused by the uneven heating of the Earth\'s surface by the sun. As long as the sun shines, there will be wind - making it renewable.' }),

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
    explanation:'Thermal power stations in Mauritius burn coal and heavy oil (fossil fuels) to produce heat, create steam, and generate electricity through turbines.' }),

  makeMCQ({ id:'g5sci-en-011', chapterId:'energy', difficulty:1,
    question:'When a girl runs in a park, what energy transformation takes place in her body?',
    options:[
      'Light energy → Sound energy',
      'Chemical energy (from food) → Kinetic (movement) energy',
      'Electrical energy → Heat energy',
      'Kinetic energy → Chemical energy'
    ],
    answer:'Chemical energy (from food) → Kinetic (movement) energy',
    hint:'The girl gets energy from food - what type of energy does food store?',
    explanation:'When a girl runs, <b>chemical energy</b> stored in food is converted into <b>kinetic (movement) energy</b>. The body also releases some heat energy during this process.' }),

  makeMCQ({ id:'g5sci-en-012', chapterId:'energy', difficulty:2,
    question:'A tree uses sunlight to make its own food (photosynthesis). What energy transformation takes place?',
    options:[
      'Chemical energy → Light energy',
      'Light energy → Chemical energy (stored in glucose)',
      'Kinetic energy → Electrical energy',
      'Heat energy → Sound energy'
    ],
    answer:'Light energy → Chemical energy (stored in glucose)',
    hint:'The tree captures light and stores it as food - a form of chemical energy.',
    explanation:'During photosynthesis, the tree converts <b>light energy</b> from the sun into <b>chemical energy</b> stored in glucose (sugar). This stored chemical energy is later used by the plant for growth and life processes.' }),

  makeMCQ({ id:'g5sci-en-013', chapterId:'energy', difficulty:2,
    question:'Which of the following is NOT a fossil fuel?',
    options:['Petrol','Coal','Natural gas','Bagasse'],
    answer:'Bagasse',
    hint:'Fossil fuels formed from ancient living things millions of years ago - which of these comes from a current crop?',
    explanation:'<b>Bagasse</b> is NOT a fossil fuel - it is the fibrous material left after sugarcane is crushed to extract juice. It is a <b>biofuel</b> (renewable). Petrol, coal and natural gas are fossil fuels formed over millions of years from ancient plants and animals.' }),

  makeMCQ({ id:'g5sci-en-014', chapterId:'energy', difficulty:2,
    question:'Solar street lamps have panels on top that charge batteries during the day, and light the street at night. What is the COMPLETE energy chain from day to night?',
    options:[
      'Light → Electrical → Chemical (stored in battery) → Electrical → Light',
      'Heat → Sound → Light → Kinetic',
      'Chemical → Light → Heat → Electrical',
      'Wind → Kinetic → Sound → Light'
    ],
    answer:'Light → Electrical → Chemical (stored in battery) → Electrical → Light',
    hint:'During the day: sun → panels → battery. At night: battery → lamp.',
    explanation:'The complete chain is: <b>Light energy</b> (sun) → solar panels convert it to <b>Electrical energy</b> → stored as <b>Chemical energy</b> in battery → at night, battery releases <b>Electrical energy</b> → bulb produces <b>Light energy</b>.' }),

  makeNum({ id:'g5sci-en-015', chapterId:'energy', difficulty:2,
    question:'When an electric kettle is switched on, electrical energy is transformed into __________ energy to heat the water. (One word)',
    answer:'heat', acceptableAnswers:['heat','thermal'],
    hint:'What do you feel coming from a kettle while it boils?',
    explanation:'In an electric kettle, <b>electrical energy</b> is converted into <b>heat energy</b> (thermal energy). This heat energy warms the water until it boils.' }),

  makeMCQ({ id:'g5sci-en-016', chapterId:'energy', difficulty:3,
    question:'A drilling machine produces sound energy. The construction worker using it wears ear protection every day. Why is this precaution important?',
    options:[
      'Sound energy is too beautiful to be wasted',
      'Continuous exposure to loud sound can cause hearing damage or deafness',
      'Ear protection makes the worker work faster',
      'Sound cannot travel through ear protection'
    ],
    answer:'Continuous exposure to loud sound can cause hearing damage or deafness',
    hint:'What does very loud noise do to our ears over time?',
    explanation:'The drilling machine produces very loud sound energy. <b>Continuous exposure to high levels of sound</b> can damage the sensitive cells in the inner ear, leading to partial or total hearing loss (deafness). This is why ear protection (earmuffs) must be worn.' }),

  makeMCQ({ id:'g5sci-en-017', chapterId:'energy', difficulty:3,
    question:'A country currently uses coal to produce all its electricity. It decides to switch entirely to solar and wind energy. Give TWO environmental advantages of this change.',
    options:[
      'Solar and wind produce no air pollution AND they are renewable so they will not run out',
      'Solar energy is cheaper to produce AND wind turbines are silent',
      'Coal produces more electricity AND solar panels work better at night',
      'Wind energy is stored in batteries AND coal is cleaner than oil'
    ],
    answer:'Solar and wind produce no air pollution AND they are renewable so they will not run out',
    hint:'Think about pollution AND sustainability.',
    explanation:'Two environmental advantages: (1) Solar and wind energy produce <b>no air pollution</b> - no smoke, carbon dioxide or other harmful gases are released; (2) They are <b>renewable</b> - they will never run out because the sun and wind are continuously available, unlike coal which will eventually be exhausted.' }),

  makeMCQ({ id:'g5sci-en-018', chapterId:'energy', difficulty:4,
    question:'A pupil burns a candle and notes: the candle gets smaller, wax melts, light is produced and the area gets warmer. Identify the energy INPUT and list ALL energy OUTPUTS.',
    options:[
      'Input: Chemical energy (in wax). Outputs: Light energy and Heat energy',
      'Input: Heat energy. Outputs: Chemical energy and Light energy',
      'Input: Electrical energy. Outputs: Light energy only',
      'Input: Light energy. Outputs: Chemical energy and Sound energy'
    ],
    answer:'Input: Chemical energy (in wax). Outputs: Light energy and Heat energy',
    hint:'The wax stores energy - what type? The flame produces two forms of energy - what are they?',
    explanation:'The <b>chemical energy</b> stored in the wax is the input. When the candle burns, this chemical energy is converted into two outputs: <b>light energy</b> (the flame produces light) and <b>heat energy</b> (the flame warms the surroundings). The shrinking candle shows stored chemical energy being released.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5sci-en-019', chapterId:'energy', difficulty:4,
    question:'Trace the energy journey: the Sun heats a lake → water evaporates and falls as rain on mountains → water flows downhill through a pipe → it spins a turbine → electricity is produced. How many energy TRANSFORMATIONS occur in this chain?',
    options:[
      'One - the turbine converts water movement to electricity',
      'Two - the Sun heats the water, then the turbine spins',
      'Three - light energy → potential energy (raised water) → kinetic energy (flowing water) → electrical energy',
      'None - energy just moves without changing form'
    ],
    answer:'Three - light energy → potential energy (raised water) → kinetic energy (flowing water) → electrical energy',
    hint:'Count every time energy changes from one form to another along the chain.',
    explanation:'The chain has <b>three transformations</b>: (1) <b>Light energy</b> from the Sun evaporates water, which rises and is stored as <b>potential energy</b> (water held at height); (2) potential energy converts to <b>kinetic energy</b> as water rushes downhill through the pipe and spins the turbine; (3) kinetic energy converts to <b>electrical energy</b> in the generator. This is how <b>hydroelectric power</b> works - tracing all the way back to the Sun as the original energy source.' })

);
