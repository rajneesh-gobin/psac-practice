'use strict';
// Grade 4 Geography — Chapter: Weather
// IDs format: g4ge-weather-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4ge-weather-001', chapterId:'g4ge-weather', difficulty:1,
    question:'How many main seasons does Mauritius have?',
    options:['Four (spring, summer, autumn, winter)','Two (summer and winter)','Three (wet, dry, cyclone)','One (it is always hot)'],
    answer:'Two (summer and winter)',
    hint:'Mauritius is a tropical island — it does not have four seasons like countries in Europe.',
    explanation:'Mauritius has <b>two main seasons</b>: a <b>summer</b> (November to April) which is hot and rainy, and a <b>winter</b> (May to October) which is cooler and drier.' }),

  makeMCQ({ id:'g4ge-weather-002', chapterId:'g4ge-weather', difficulty:1,
    question:'When is summer in Mauritius?',
    options:['May to October','November to April','January to June','July to December'],
    answer:'November to April',
    hint:'Mauritius\'s summer falls during the months when other countries in the northern hemisphere have winter.',
    explanation:'<b>Summer</b> in Mauritius runs from <b>November to April</b>. It is hot and rainy, with temperatures that can reach 30°C or more. This is also the cyclone season.' }),

  makeMCQ({ id:'g4ge-weather-003', chapterId:'g4ge-weather', difficulty:1,
    question:'When is winter in Mauritius?',
    options:['November to April','May to October','December to February','March to August'],
    answer:'May to October',
    hint:'Winter in Mauritius is the opposite time of year to summer.',
    explanation:'<b>Winter</b> in Mauritius runs from <b>May to October</b>. It is cooler and drier than summer, with temperatures around 17–24°C. There are cool south-east trade winds during this season.' }),

  makeTF({ id:'g4ge-weather-004', chapterId:'g4ge-weather', difficulty:1,
    question:'Mauritius has heavy snow in winter, just like countries in Europe.',
    answer:false,
    hint:'Mauritius is a tropical island in the Indian Ocean.',
    explanation:'Mauritius does <b>not</b> have snow. It is a <b>tropical island</b> near the Equator. Its "winter" (May–October) is simply cooler and drier — temperatures stay between 17–24°C — nowhere near cold enough for snow.' }),

  makeMCQ({ id:'g4ge-weather-005', chapterId:'g4ge-weather', difficulty:1,
    question:'A thermometer is used to measure which weather condition?',
    options:['Rainfall','Wind direction','Temperature','Wind speed'],
    answer:'Temperature',
    hint:'Thermo means heat.',
    explanation:'A <b>thermometer</b> measures <b>temperature</b> — how hot or cold the air is. Temperature is measured in degrees Celsius (°C).' }),

  makeMCQ({ id:'g4ge-weather-006', chapterId:'g4ge-weather', difficulty:1,
    question:'Which instrument measures how much rain has fallen?',
    options:['Thermometer','Anemometer','Wind vane','Rain gauge'],
    answer:'Rain gauge',
    hint:'Its name tells you exactly what it measures.',
    explanation:'A <b>rain gauge</b> collects and measures the amount of <b>rainfall</b>. It is a cylinder that catches rainwater and has markings in millimetres (mm) to show how much rain has fallen.' }),

  makeMCQ({ id:'g4ge-weather-007', chapterId:'g4ge-weather', difficulty:1,
    question:'What does a wind vane measure?',
    options:['Temperature','Wind speed','Wind direction','Rainfall'],
    answer:'Wind direction',
    hint:'A vane spins or points to show which way the wind is blowing FROM.',
    explanation:'A <b>wind vane</b> (also called a weather vane) shows the <b>direction the wind is blowing from</b>. For example, a "south-east wind" blows from the south-east. Wind vanes often have a rooster or arrow shape on top.' }),

  makeMCQ({ id:'g4ge-weather-008', chapterId:'g4ge-weather', difficulty:1,
    question:'An anemometer is used to measure which weather condition?',
    options:['Temperature','Rainfall','Wind direction','Wind speed'],
    answer:'Wind speed',
    hint:'An anemometer has little cups that spin faster when the wind is stronger.',
    explanation:'An <b>anemometer</b> measures <b>wind speed</b>. It has cups that spin in the wind — the faster the cups spin, the stronger the wind. Wind speed is measured in km/h or knots.' }),

  makeTF({ id:'g4ge-weather-009', chapterId:'g4ge-weather', difficulty:2,
    question:'A rain gauge measures wind speed.',
    answer:false,
    hint:'Think about what a rain gauge collects.',
    explanation:'A <b>rain gauge</b> measures <b>rainfall</b> — not wind speed. Wind speed is measured by an <b>anemometer</b>. The rain gauge is a cylinder that catches and measures the amount of rain that falls.' }),

  makeMCQ({ id:'g4ge-weather-010', chapterId:'g4ge-weather', difficulty:2,
    question:'Farmers in Mauritius need to listen to the weather forecast. Why is the forecast useful to them?',
    options:[
      'To decide what clothes to wear',
      'To know when to plant, water or harvest crops, and to prepare for heavy rain or drought',
      'To plan which TV programmes to watch',
      'To decide which route to drive to work'
    ],
    answer:'To know when to plant, water or harvest crops, and to prepare for heavy rain or drought',
    hint:'A farmer\'s work depends entirely on the weather.',
    explanation:'Weather forecasts are very important to <b>farmers</b>. Knowing about rain helps them decide when to plant or irrigate crops. Warnings of drought help them save water. Storm warnings allow them to protect crops and animals. Weather directly affects food production.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4ge-weather-011', chapterId:'g4ge-weather', difficulty:2,
    question:'How does heavy DROUGHT affect people\'s lives in Mauritius?',
    options:[
      'It brings cool, fresh water for everyone',
      'It causes water shortages — crops die, reservoirs dry up and people may have limited water supply',
      'It makes rivers flood and damages buildings',
      'It brings lots of rain that helps farmers grow more crops'
    ],
    answer:'It causes water shortages — crops die, reservoirs dry up and people may have limited water supply',
    hint:'A drought means too little rain for a long time.',
    explanation:'A <b>drought</b> is a long period with little or no rain. It causes <b>water shortages</b> — crops wither and die, reservoirs (water storage lakes) dry up, animals suffer and people may face restrictions on water use. In Mauritius, droughts can seriously damage the sugar cane and vegetable industries.' }),

  makeMCQ({ id:'g4ge-weather-012', chapterId:'g4ge-weather', difficulty:2,
    question:'How does a CYCLONE affect people in Mauritius?',
    options:[
      'It brings a gentle breeze and light rain that helps crops grow',
      'It causes strong winds and heavy rain that can damage buildings, uproot trees and cause flooding',
      'It makes the sea very calm and safe for swimming',
      'It makes temperatures drop below 0°C and causes snow'
    ],
    answer:'It causes strong winds and heavy rain that can damage buildings, uproot trees and cause flooding',
    hint:'Cyclones are tropical storms with very powerful spinning winds.',
    explanation:'A <b>cyclone</b> is a powerful tropical storm with violent spinning winds and heavy rain. In Mauritius, cyclones can <b>destroy buildings, uproot trees, damage crops, flood roads and cut off electricity</b>. Mauritius has a cyclone warning system to protect people.' }),

  makeMCQ({ id:'g4ge-weather-013', chapterId:'g4ge-weather', difficulty:1,
    question:'During which season in Mauritius is the risk of cyclones greatest?',
    options:['Winter (May–October)','Summer (November–April)','All year equally','Only in June'],
    answer:'Summer (November–April)',
    hint:'Cyclones form over warm tropical seas — when are the seas warmest around Mauritius?',
    explanation:'Cyclones are most likely during Mauritius\'s <b>summer season (November to April)</b>. This is when the sea water is warmest, providing the energy for tropical storms and cyclones to form and develop.' }),

  makeTF({ id:'g4ge-weather-014', chapterId:'g4ge-weather', difficulty:2,
    question:'Weather forecasts are only useful for deciding what to wear each day.',
    answer:false,
    hint:'Think about farmers, fishermen, pilots and people preparing for cyclones.',
    explanation:'Weather forecasts are important for many reasons beyond clothing — <b>farmers</b> plan planting and harvesting; <b>fishermen</b> check sea conditions for safety; <b>pilots and sailors</b> plan routes; and <b>everyone</b> uses storm warnings to prepare for cyclones and flooding.' }),

  makeMCQ({ id:'g4ge-weather-015', chapterId:'g4ge-weather', difficulty:2,
    question:'Which weather instrument would you use to find out if the wind is blowing from the south-east?',
    options:['Thermometer','Rain gauge','Wind vane','Anemometer'],
    answer:'Wind vane',
    hint:'You need to know the direction the wind is blowing from.',
    explanation:'A <b>wind vane</b> shows the <b>direction</b> the wind is blowing from. If you want to know whether the wind is coming from the south-east, you check the wind vane. An anemometer tells you how fast it is blowing.' }),

  makeMCQ({ id:'g4ge-weather-016', chapterId:'g4ge-weather', difficulty:1,
    question:'What does a weather forecast tell us?',
    options:[
      'What the weather was like last year',
      'What the weather is expected to be like in the coming days',
      'The exact temperature 100 years ago',
      'Only the wind direction'
    ],
    answer:'What the weather is expected to be like in the coming days',
    hint:'Forecast = prediction of future weather.',
    explanation:'A <b>weather forecast</b> predicts what the weather will be like in the near future — for example tomorrow or the next few days. It includes predictions about temperature, rainfall, wind and any severe weather like storms or cyclones.' }),

  makeTF({ id:'g4ge-weather-017', chapterId:'g4ge-weather', difficulty:1,
    question:'Summer in Mauritius is generally hotter and rainier than winter.',
    answer:true,
    hint:'Think about which season brings cyclones and heavy rain.',
    explanation:'<b>Summer (November–April)</b> in Mauritius is hotter (up to 30°C+) and rainier than winter. It is also the cyclone season. <b>Winter (May–October)</b> is cooler (17–24°C) and drier.' }),

  makeMCQ({ id:'g4ge-weather-018', chapterId:'g4ge-weather', difficulty:3,
    question:'A school trip to the beach is planned for tomorrow. The weather forecast shows "strong south-east winds, choppy seas and heavy showers." What should the school do and why?',
    options:[
      'Go ahead — the weather usually changes anyway',
      'Postpone the trip — strong winds and heavy showers make the sea unsafe for children and the trip unpleasant',
      'Go ahead but bring extra food',
      'Ignore the forecast because forecasts are always wrong'
    ],
    answer:'Postpone the trip — strong winds and heavy showers make the sea unsafe for children and the trip unpleasant',
    hint:'The weather forecast is there to help us make safe decisions.',
    explanation:'The school should <b>postpone the trip</b>. Strong winds create rough, choppy seas that are <b>dangerous for children swimming</b>. Heavy showers make outdoor activities unpleasant and could cause flash flooding. Using the weather forecast to make safety decisions is a key reason forecasts are important.' }),

  makeMCQ({ id:'g4ge-weather-019', chapterId:'g4ge-weather', difficulty:2,
    question:'Which of the four weather instruments measures TEMPERATURE?',
    options:['Rain gauge','Anemometer','Wind vane','Thermometer'],
    answer:'Thermometer',
    hint:'Thermo = heat.',
    explanation:'The <b>thermometer</b> measures temperature. The four main weather instruments are: <b>thermometer</b> (temperature), <b>rain gauge</b> (rainfall), <b>wind vane</b> (wind direction) and <b>anemometer</b> (wind speed).' })

);
