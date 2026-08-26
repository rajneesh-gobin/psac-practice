'use strict';
// Grade 5 History & Geography - Chapter: Weather (Grade 5)
// IDs format: g5ge-weather-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5ge-weather-001', chapterId:'g5ge-weather', subsection:'seasons', difficulty:1,
    question:'How many seasons does Mauritius have?',
    options:['One','Two','Three','Four'],
    answer:'Two',
    hint:'Think about the hot months and the cooler months.',
    explanation:'Mauritius has <b>two seasons</b>: summer (November to April - hot and rainy) and winter (May to October - cooler and drier).' }),

  makeMCQ({ id:'g5ge-weather-002', chapterId:'g5ge-weather', subsection:'seasons', difficulty:1,
    question:'Which months make up summer in Mauritius?',
    options:['May to October','November to April','June to September','January to June'],
    answer:'November to April',
    hint:'Summer is the hot and rainy part of the year.',
    explanation:'Summer in Mauritius lasts from <b>November to April</b>. This period is hot, humid and rainy, and is also the cyclone season.' }),

  makeMCQ({ id:'g5ge-weather-003', chapterId:'g5ge-weather', subsection:'instruments', difficulty:1,
    question:'Which instrument measures temperature?',
    options:['Rain gauge','Anemometer','Wind vane','Thermometer'],
    answer:'Thermometer',
    hint:'The word contains "thermo" which means heat.',
    explanation:'A <b>thermometer</b> measures temperature (how hot or cold the air is). Temperature is recorded in degrees Celsius (°C).' }),

  makeMCQ({ id:'g5ge-weather-004', chapterId:'g5ge-weather', subsection:'instruments', difficulty:1,
    question:'What does a rain gauge measure?',
    options:['Wind speed','Rainfall (the amount of rain)','Wind direction','Air pressure'],
    answer:'Rainfall (the amount of rain)',
    hint:'The name contains "rain" - what does it measure?',
    explanation:'A <b>rain gauge</b> measures the amount of rainfall (precipitation) over a period of time. Rainfall is usually recorded in millimetres (mm).' }),

  makeMCQ({ id:'g5ge-weather-005', chapterId:'g5ge-weather', subsection:'instruments', difficulty:1,
    question:'What instrument shows which direction the wind is blowing from?',
    options:['Anemometer','Thermometer','Rain gauge','Wind vane'],
    answer:'Wind vane',
    hint:'It spins or points to show direction.',
    explanation:'A <b>wind vane</b> (or weather vane) shows the direction that the wind is blowing from. For example, a north wind blows from the north towards the south.' }),

  makeMCQ({ id:'g5ge-weather-006', chapterId:'g5ge-weather', subsection:'instruments', difficulty:2,
    question:'What does an anemometer measure?',
    options:['Temperature','Rainfall','Wind direction','Wind speed'],
    answer:'Wind speed',
    hint:'It has spinning cups that spin faster when the wind is stronger.',
    explanation:'An <b>anemometer</b> measures wind speed. It has spinning cups - the faster they spin, the stronger the wind. Wind speed is usually measured in km/h.' }),

  makeTF({ id:'g5ge-weather-007', chapterId:'g5ge-weather', subsection:'seasons', difficulty:1,
    question:'During winter in Mauritius, the weather is mainly hot and rainy.',
    answer:false,
    hint:'Think about what summer vs winter feels like.',
    explanation:'False. Winter in Mauritius (May–October) is <b>cooler and drier</b>. It is the summer season (November–April) that is hot and rainy.' }),

  makeMCQ({ id:'g5ge-weather-008', chapterId:'g5ge-weather', subsection:'cyclones', difficulty:2,
    question:'A cyclone is approaching Mauritius. A Class 1 cyclone warning is issued. What does Class 1 mean?',
    options:[
      'The cyclone is about to make landfall',
      'A cyclone is within 200 km of Mauritius',
      'A cyclone is within 50 km of Mauritius',
      'Schools and businesses must close immediately'
    ],
    answer:'A cyclone is within 200 km of Mauritius',
    hint:'Class 1 is the first warning - the cyclone is still far away.',
    explanation:'A <b>Class 1</b> cyclone warning means a cyclone is within approximately <b>200 km</b> of Mauritius. It is an early warning; people should watch for updates but normal activities can continue.' }),

  makeMCQ({ id:'g5ge-weather-009', chapterId:'g5ge-weather', subsection:'cyclones', difficulty:2,
    question:'Which cyclone warning class means the cyclone is very close and people must stay indoors?',
    options:['Class 1','Class 2','Class 3','Class 4'],
    answer:'Class 3',
    hint:'The higher the class number, the closer (and more dangerous) the cyclone.',
    explanation:'A <b>Class 3</b> warning means the cyclone is very close to Mauritius and wind speeds are dangerous. Schools and most businesses close and people are advised to stay indoors.' }),

  makeMCQ({ id:'g5ge-weather-010', chapterId:'g5ge-weather', subsection:'cyclones', difficulty:2,
    question:'A Class 4 cyclone warning is the most serious. Which of the following best describes Class 4 conditions?',
    options:[
      'Slight rain and strong breezes expected',
      'Cyclone is 200 km away - watch for updates',
      'Cyclone is about to hit with extremely strong, destructive winds',
      'All schools are closed but shops remain open'
    ],
    answer:'Cyclone is about to hit with extremely strong, destructive winds',
    hint:'Class 4 is the highest level - the most dangerous situation.',
    explanation:'A <b>Class 4</b> warning means the cyclone centre is about to pass over or very close to Mauritius with extremely destructive winds. Everyone must remain sheltered until the warning is lifted.' }),

  makeMCQ({ id:'g5ge-weather-011', chapterId:'g5ge-weather', subsection:'cyclones', difficulty:2,
    question:'How does a cyclone affect farming in Mauritius?',
    options:[
      'It improves crop growth by bringing extra sunshine',
      'It destroys crops and uproots trees with strong winds and heavy rain',
      'It has no effect on farming',
      'It brings useful cold temperatures for vegetables'
    ],
    answer:'It destroys crops and uproots trees with strong winds and heavy rain',
    hint:'Think about what very strong winds and heavy rain do to plants.',
    explanation:'Cyclones can cause major damage to farming: <b>strong winds flatten and destroy crops</b> (sugar cane, vegetables), uproot trees, and flooding washes away soil. This can lead to food shortages and economic losses.' }),

  makeMCQ({ id:'g5ge-weather-012', chapterId:'g5ge-weather', subsection:'impact', difficulty:2,
    question:'How does bad weather affect fishing in Mauritius?',
    options:[
      'Rough seas and cyclones prevent fishing boats from going out safely',
      'Rainy weather brings more fish to the surface',
      'Cold weather makes fish swim faster and easier to catch',
      'Cyclones push fish closer to the shore for easier fishing'
    ],
    answer:'Rough seas and cyclones prevent fishing boats from going out safely',
    hint:'Think about the danger of going to sea in a storm.',
    explanation:'During rough weather, strong waves and high winds make the sea <b>very dangerous</b> for fishing boats. Fishermen cannot go out to sea, which means less fish is caught and sold.' }),

  makeMCQ({ id:'g5ge-weather-013', chapterId:'g5ge-weather', subsection:'impact', difficulty:2,
    question:'How does weather affect tourism in Mauritius?',
    options:[
      'Tourists prefer Mauritius only in winter because it is cold',
      'Bad weather such as cyclones causes tourists to cancel trips and hotels lose income',
      'Rainy weather has no effect on tourists',
      'Cyclones attract tourists who want to experience adventure'
    ],
    answer:'Bad weather such as cyclones causes tourists to cancel trips and hotels lose income',
    hint:'Think about what tourists come to Mauritius for.',
    explanation:'Tourists come to Mauritius for <b>sunshine, beaches and warm weather</b>. Cyclones and heavy rain cause tourists to cancel holidays, flights are disrupted and hotels lose income. Good weather is essential for a healthy tourism industry.' }),

  makeMCQ({ id:'g5ge-weather-014', chapterId:'g5ge-weather', subsection:'elements', difficulty:2,
    question:'What is the difference between "weather" and "climate"?',
    options:[
      'They mean exactly the same thing',
      'Weather is what happens day to day; climate is the long-term pattern of weather in a region',
      'Climate is what happens each day; weather is the seasonal pattern',
      'Weather only refers to rain; climate refers to sunshine'
    ],
    answer:'Weather is what happens day to day; climate is the long-term pattern of weather in a region',
    hint:'One is short-term; one is long-term.',
    explanation:'<b>Weather</b> is the short-term condition of the atmosphere (today\'s rain, wind, temperature). <b>Climate</b> is the average or typical weather pattern of a region over many years. For example: "It is raining today" is weather; "Mauritius has a tropical climate" is climate.' }),

  makeTF({ id:'g5ge-weather-015', chapterId:'g5ge-weather', subsection:'elements', difficulty:1,
    question:'Rodrigues has exactly the same climate as Mauritius.',
    answer:false,
    hint:'Think about the size and location differences.',
    explanation:'False. Although both Mauritius and Rodrigues have tropical climates, <b>Rodrigues is generally drier and windier</b> than Mauritius. It receives less rainfall and experiences stronger trade winds due to its more exposed position in the Indian Ocean.' }),

  makeMCQ({ id:'g5ge-weather-016', chapterId:'g5ge-weather', subsection:'elements', difficulty:3,
    question:'A farmer has heard that a drought is coming. What should the farmer do to prepare?',
    options:[
      'Plant more crops immediately to take advantage of the dry weather',
      'Store water in tanks and choose drought-resistant crops',
      'Remove all the soil to prevent it drying out',
      'Wait for the drought to pass before doing anything'
    ],
    answer:'Store water in tanks and choose drought-resistant crops',
    hint:'Droughts mean less water - how do you prepare for less water?',
    explanation:'During a <b>drought</b> (a long period without enough rain), water is scarce. Farmers can prepare by <b>storing water</b> for irrigation, choosing <b>drought-resistant crop varieties</b>, and using water-saving techniques like drip irrigation.' }),

  makeMCQ({ id:'g5ge-weather-017', chapterId:'g5ge-weather', subsection:'elements', difficulty:3,
    question:'Why is it important for Mauritius to have an accurate weather forecast service?',
    options:[
      'So that people know what clothes to wear each day',
      'So that farmers, fishermen, airline pilots and emergency services can plan ahead and stay safe',
      'Because weather forecasting is required by law in all island nations',
      'So that schools can plan their sports days'
    ],
    answer:'So that farmers, fishermen, airline pilots and emergency services can plan ahead and stay safe',
    hint:'Many different groups depend on knowing what the weather will be.',
    explanation:'Accurate weather forecasts help <b>many sectors</b>: farmers plan watering and harvesting; fishermen decide when it is safe to go to sea; airlines plan routes; emergency services prepare for cyclones and floods. Early warnings save lives and reduce economic damage.' }),

  makeMCQ({ id:'g5ge-weather-018', chapterId:'g5ge-weather', subsection:'cyclones', difficulty:3,
    question:'During which season is Mauritius most at risk from cyclones?',
    options:['Winter (May–October)','Summer (November–April)','All year equally','Spring (September–October) only'],
    answer:'Summer (November–April)',
    hint:'Cyclones form over warm ocean water - in which season is the sea warmest?',
    explanation:'Cyclones form over <b>warm ocean water</b>. The Indian Ocean around Mauritius is warmest in summer (November–April), making this the <b>cyclone season</b>. Sea surface temperatures must be above 26 °C for cyclones to develop.' }),

  makeTF({ id:'g5ge-weather-019', chapterId:'g5ge-weather', subsection:'cyclones', difficulty:2,
    question:'A Class 2 cyclone warning means stronger and closer danger than a Class 1 warning.',
    answer:true,
    hint:'Higher class numbers mean the cyclone is closer and more dangerous.',
    explanation:'True. Cyclone warnings go from <b>Class 1</b> (cyclone within ~200 km - early warning) to <b>Class 4</b> (cyclone about to hit - maximum danger). Class 2 means the cyclone is within ~100 km and conditions are deteriorating.' })

);
