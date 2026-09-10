'use strict';
(function () {

// Grade 3 SSEE — Unit 8: Weather
// Source: MIE SSEE Grade 3 Part 2 pp.96-130
// IDs: g3ssee-wth-001 onwards

// ── types_of_weather (001-030) ────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g3ssee-wth-001', chapterId:'g3ssee-weather', difficulty:1, subsection:'types_of_weather',
    question:'What is WEATHER?',
    options:['The state of the air at a place and time','The number of rivers found in a country','The kind of soil found in a certain place','The kind of plants growing in a place'],
    answer:'The state of the air at a place and time',
    hint:'Weather changes from day to day.',
    explanation:'<b>Weather</b> is the state of the atmosphere at one place and one time — sunny, cloudy, rainy, windy or stormy — and it can change from day to day.'}),

  makeMCQ({ id:'g3ssee-wth-002', chapterId:'g3ssee-weather', difficulty:1, subsection:'types_of_weather',
    question:'Which of the following is a TYPE of weather experienced in Mauritius?',
    options:['Sunny weather','Heavy snowstorms','Dense sandstorms','Winter frost'],
    answer:'Sunny weather',
    hint:'Mauritius is a tropical island.',
    explanation:'Mauritius has a tropical climate: <b>sunny</b>, cloudy, rainy, windy and sometimes stormy (cyclone) weather. Snow, sandstorms and hard frost do not occur here.'}),

  makeTF({ id:'g3ssee-wth-003', chapterId:'g3ssee-weather', difficulty:1, subsection:'types_of_weather',
    question:'Mauritius has a tropical climate with a hot, wet season and a cooler, drier season.',
    answer:true,
    explanation:'Yes! Mauritius has a <b>tropical climate</b>: a <b>hot, wet season</b> from roughly November to April (summer) and a <b>cooler, drier season</b> from May to October (winter).' }),

  makeMCQ({ id:'g3ssee-wth-004', chapterId:'g3ssee-weather', difficulty:1, subsection:'types_of_weather',
    question:'Which months are the HOTTEST and WETTEST in Mauritius?',
    options:['November to April','May to October','January to March','July to August'],
    answer:'November to April',
    explanation:'In Mauritius <b>November to April</b> is the summer, or wet season — the hottest months, with the most rain and the highest cyclone risk.'}),

  makeMCQ({ id:'g3ssee-wth-005', chapterId:'g3ssee-weather', difficulty:1, subsection:'types_of_weather',
    question:'Which months form the COOLER, DRIER season in Mauritius?',
    options:['May to October','November to April','January to March','June to July'],
    answer:'May to October',
    explanation:'<b>May to October</b> is the Mauritian winter, or dry season — cooler, with less rain and stronger south-east trade winds.'}),

  makeMCQ({ id:'g3ssee-wth-006', chapterId:'g3ssee-weather', difficulty:2, subsection:'types_of_weather',
    question:'What is CLIMATE?',
    options:['The average weather over many years','The weather on one single day only','The temperature of the warm ocean','A type of very strong stormy wind'],
    answer:'The average weather over many years',
    hint:'Climate and weather are different — one is long-term, one is short-term.',
    explanation:'<b>Climate</b> is the average weather of a place over a long period, usually 30 years. Weather changes daily; climate changes very slowly. Mauritius has a tropical climate.'}),

  makeMCQ({ id:'g3ssee-wth-007', chapterId:'g3ssee-weather', difficulty:2, subsection:'types_of_weather',
    question:'A child says "It was sunny yesterday but it is raining today." This describes the ___.',
    options:['Weather — short-term conditions','Climate — long-term patterns','Season — a part of the year','Cyclone — a tropical storm'],
    answer:'Weather — short-term conditions',
    hint:'Weather changes from day to day.',
    explanation:'Day-to-day changes are <b>weather</b> — the short-term state of the atmosphere. Climate is the long-term average and does not change from one day to the next.'}),

  makeMCQ({ id:'g3ssee-wth-008', chapterId:'g3ssee-weather', difficulty:1, subsection:'types_of_weather',
    question:'What type of weather does a THERMOMETER measure?',
    options:['Temperature','Rainfall','Wind speed','Wind direction'],
    answer:'Temperature',
    hint:'A thermometer has a scale in degrees Celsius.',
    explanation:'A <b>thermometer</b> measures <b>temperature</b> — how hot or cold the air is, measured in degrees Celsius (°C).' }),

  makeMCQ({ id:'g3ssee-wth-009', chapterId:'g3ssee-weather', difficulty:2, subsection:'types_of_weather',
    question:'Why is it important for farmers in Mauritius to know the WEATHER FORECAST?',
    options:['To plan planting, watering and harvest','To choose their own favourite weather','To decide what to wear to a big party','To predict when the earthquakes happen'],
    answer:'To plan planting, watering and harvest',
    explanation:'Farmers use the forecast to decide when to plant, when to irrigate and when to harvest, and to protect crops from heavy rain or strong wind. Too little or too much rain ruins a crop.'}),

  makeTF({ id:'g3ssee-wth-010', chapterId:'g3ssee-weather', difficulty:1, subsection:'types_of_weather',
    question:'Weather can affect what clothes we wear and what activities we do.',
    answer:true,
    explanation:'Yes! <b>Weather directly affects daily life</b>. On sunny days we wear light clothes; on cool days we wear jumpers; on rainy days we carry an umbrella. Outdoor activities, sports and transport are all affected by weather.' }),

  makeMCQ({ id:'g3ssee-wth-011', chapterId:'g3ssee-weather', difficulty:2, subsection:'types_of_weather',
    question:'Mauritius experiences more frequent HEAVY RAINFALL in the central plateau region than on the coasts. Why?',
    options:['Moist air is forced up the mountains','The plateau simply has more rivers','The coast is always covered in cloud','The plateau lies much closer to the sea'],
    answer:'Moist air is forced up the mountains',
    hint:'Altitude (height) affects temperature and rainfall.',
    explanation:'The central plateau is higher. Moist trade winds meeting the mountains are forced to <b>rise, cool and condense</b>, so more rain falls there than on the lower coast.'}),

  makeMCQ({ id:'g3ssee-wth-012', chapterId:'g3ssee-weather', difficulty:1, subsection:'types_of_weather',
    question:'Which of the following is NOT a type of weather?',
    options:['Magnetism','Rainfall','Sunshine','Snowfall'],
    answer:'Magnetism',
    explanation:'<b>Magnetism</b> is a force, not a type of weather. Rainfall, sunshine and snowfall are all weather, though snow never falls in Mauritius.'}),

  makeMCQ({ id:'g3ssee-wth-013', chapterId:'g3ssee-weather', difficulty:2, subsection:'types_of_weather',
    question:'What is FOG?',
    options:['A cloud sitting at ground level','A type of very heavy rainfall','A very strong and gusty wind','Snow that is falling gently'],
    answer:'A cloud sitting at ground level',
    explanation:'<b>Fog</b> is a cloud at ground level: water vapour condenses into tiny droplets near the surface and visibility drops. It happens in the Mauritian highlands early in the morning.'}),

  makeMCQ({ id:'g3ssee-wth-014', chapterId:'g3ssee-weather', difficulty:3, subsection:'types_of_weather',
    question:'A family in Mauritius is planning a beach trip for the coming weekend. They check the weather forecast and see "partly cloudy with a chance of afternoon showers." What should they do?',
    options:['Take sunscreen and a raincoat, and check again','Cancel the trip because it will rain all day','Take only sunscreen — showers will not happen','Go with no preparation, forecasts are wrong'],
    answer:'Take sunscreen and a raincoat, and check again',
    hint:'A forecast gives a probability, not a certainty.',
    explanation:'"Partly cloudy with a chance of showers" means rain is <b>possible</b>, not certain. The sensible plan is to prepare for both sun and rain and check the forecast again nearer the day.'}),

  makeTF({ id:'g3ssee-wth-015', chapterId:'g3ssee-weather', difficulty:1, subsection:'types_of_weather',
    question:'Sunshine (solar radiation) is a form of weather.',
    answer:true,
    explanation:'Yes! <b>Sunshine</b> (the amount of sunlight reaching the surface) is an important element of weather. Meteorologists measure sunshine hours, temperature, rainfall, wind speed and direction.' }),

// ── weather_instruments (016-045) ────────────────────────────────────────

  makeMCQ({ id:'g3ssee-wth-016', chapterId:'g3ssee-weather', difficulty:1, subsection:'weather_instruments',
    question:'What does a THERMOMETER measure?',
    options:['Temperature','Air pressure','Rainfall','Wind direction'],
    answer:'Temperature',
    hint:'The word "thermo" means heat.',
    explanation:'A <b>thermometer</b> measures temperature in degrees Celsius (°C). A barometer measures air pressure, a rain gauge measures rainfall and a wind vane shows wind direction.'}),

  makeMCQ({ id:'g3ssee-wth-017', chapterId:'g3ssee-weather', difficulty:1, subsection:'weather_instruments',
    question:'What does a RAIN GAUGE (pluviomètre) measure?',
    options:['Rainfall','Air pressure','Temperature','Wind speed'],
    answer:'Rainfall',
    hint:'It collects and measures rain.',
    explanation:'A <b>rain gauge</b> (pluviomètre) collects rain and measures how much has fallen, in millimetres or centimetres.'}),

  makeMCQ({ id:'g3ssee-wth-018', chapterId:'g3ssee-weather', difficulty:1, subsection:'weather_instruments',
    question:'What does a WIND VANE (girouette) show?',
    options:['The direction the wind comes from','The speed of the blowing wind today','The amount of rain that fell last night','The temperature of the air outside'],
    answer:'The direction the wind comes from',
    hint:'It turns to point into the wind.',
    explanation:'A <b>wind vane</b> (girouette) turns to point into the wind, showing the direction the wind is blowing FROM. Pointing north means a northerly wind.'}),

  makeMCQ({ id:'g3ssee-wth-019', chapterId:'g3ssee-weather', difficulty:1, subsection:'weather_instruments',
    question:'What does an ANEMOMETER measure?',
    options:['Wind speed','Wind direction','Rainfall','Temperature'],
    answer:'Wind speed',
    hint:'An anemometer has spinning cups that turn faster in stronger wind.',
    explanation:'An <b>anemometer</b> measures <b>wind speed</b> — usually in kilometres per hour (km/h) or metres per second (m/s). It has spinning cups that rotate faster as wind speed increases.' }),

  makeMCQ({ id:'g3ssee-wth-020', chapterId:'g3ssee-weather', difficulty:2, subsection:'weather_instruments',
    question:'A weather station records 120 mm of rainfall in January. Which instrument was used to collect this data?',
    options:['A rain gauge','A thermometer','An anemometer','A wind vane'],
    answer:'A rain gauge',
    hint:'This instrument collects and measures precipitation.',
    explanation:'Rainfall is measured with a <b>rain gauge</b> (pluviomètre): 120 mm means that 120 millimetres of rain were collected in the gauge during January.'}),

  makeMCQ({ id:'g3ssee-wth-021', chapterId:'g3ssee-weather', difficulty:1, subsection:'weather_instruments',
    question:'Which instrument would a meteorologist use to find the TEMPERATURE of the air?',
    options:['A thermometer','A rain gauge','An anemometer','A wind vane'],
    answer:'A thermometer',
    explanation:'A <b>meteorologist (weather scientist)</b> uses a <b>thermometer</b> to measure the temperature of the air in degrees Celsius (°C).' }),

  makeMCQ({ id:'g3ssee-wth-022', chapterId:'g3ssee-weather', difficulty:2, subsection:'weather_instruments',
    question:'A meteorologist at the Mauritius Meteorological Services records that the wind is blowing at 80 km/h. Which instrument gave this reading?',
    options:['An anemometer','A thermometer','A rain gauge','A barometer'],
    answer:'An anemometer',
    explanation:'Wind speed in km/h is measured by an <b>anemometer</b>. At 80 km/h, the wind would be quite strong — approaching gale force.' }),

  makeMCQ({ id:'g3ssee-wth-023', chapterId:'g3ssee-weather', difficulty:2, subsection:'weather_instruments',
    question:'The wind vane at a Mauritius weather station is pointing SOUTH-EAST. What does this tell the meteorologist?',
    options:['The wind is blowing FROM the south-east','The wind is blowing TOWARDS the south-east','It is raining over in the south-east','The air temperature is falling fast'],
    answer:'The wind is blowing FROM the south-east',
    hint:'A wind is named after where it comes FROM.',
    explanation:'A wind vane points INTO the wind — towards where the wind comes <b>from</b>. Pointing south-east means a south-easterly wind, the common trade wind of Mauritius.'}),

  makeTF({ id:'g3ssee-wth-024', chapterId:'g3ssee-weather', difficulty:1, subsection:'weather_instruments',
    question:'A barometer measures air pressure.',
    answer:true,
    explanation:'Yes! A <b>barometer</b> measures <b>air pressure</b>. Falling air pressure often signals approaching stormy weather; rising pressure indicates clearing skies.' }),

  makeMCQ({ id:'g3ssee-wth-025', chapterId:'g3ssee-weather', difficulty:3, subsection:'weather_instruments',
    question:'A class records the daily temperature in Mauritius for one month. They find January has an average of 28°C and July has an average of 20°C. What can they CONCLUDE?',
    options:['Mauritius is warmer in January than in July','The thermometer must have broken in January','July is the hottest month of the whole year','The temperature never changes in Mauritius'],
    answer:'Mauritius is warmer in January than in July',
    hint:'Use the data to draw a conclusion about seasons.',
    explanation:'January averages 28°C and July 20°C, so Mauritius is <b>warmer in January</b> — its summer, or wet season — than in July, its winter, or dry season.'}),

// ── cyclones_in_mauritius (026-075) ───────────────────────────────────────

  makeMCQ({ id:'g3ssee-wth-026', chapterId:'g3ssee-weather', difficulty:1, subsection:'cyclones_in_mauritius',
    question:'What is a TROPICAL CYCLONE?',
    options:['A powerful storm formed over warm ocean','A light breeze during the summer months','A cold spell of weather during winter','A type of low grey cloud in the sky'],
    answer:'A powerful storm formed over warm ocean',
    hint:'Cyclones form over warm ocean water.',
    explanation:'A <b>tropical cyclone</b> is an intense rotating storm with winds above 120 km/h that forms over warm tropical ocean water. The same storm is called a typhoon in the Pacific and a hurricane in the Atlantic.'}),

  makeMCQ({ id:'g3ssee-wth-027', chapterId:'g3ssee-weather', difficulty:1, subsection:'cyclones_in_mauritius',
    question:'When is the CYCLONE SEASON in Mauritius?',
    options:['November to April','May to October','Only in December','All the year round'],
    answer:'November to April',
    hint:'Cyclones need warm ocean water to form.',
    explanation:'The cyclone season runs from <b>November to April</b>, when the ocean is warmest and gives cyclones the energy they need to form.'}),

  makeMCQ({ id:'g3ssee-wth-028', chapterId:'g3ssee-weather', difficulty:2, subsection:'cyclones_in_mauritius',
    question:'Which organisation in Mauritius warns the public about approaching cyclones?',
    options:['The Meteorological Services','The Central Water Authority','The Ministry of Education','The Fire Services Unit'],
    answer:'The Meteorological Services',
    hint:'They track weather and issue forecasts and warnings.',
    explanation:'The <b>Mauritius Meteorological Services</b> watches the weather and issues the cyclone bulletins and warnings that the public hears.'}),

  makeMCQ({ id:'g3ssee-wth-029', chapterId:'g3ssee-weather', difficulty:1, subsection:'cyclones_in_mauritius',
    question:'What does a CLASS 1 CYCLONE WARNING in Mauritius mean?',
    options:['A cyclone may come within 36 hours','The cyclone is passing overhead now','The danger has passed — it is all clear','Only a small rain shower is expected'],
    answer:'A cyclone may come within 36 hours',
    hint:'Class 1 is the first and least severe warning level.',
    explanation:'A <b>Class 1</b> warning means a cyclone could reach Mauritius within about 36 hours, with gusts up to 120 km/h. It is an alert stage: prepare and keep listening to the bulletins.'}),

  makeMCQ({ id:'g3ssee-wth-030', chapterId:'g3ssee-weather', difficulty:2, subsection:'cyclones_in_mauritius',
    question:'What does a CLASS 4 CYCLONE WARNING in Mauritius mean?',
    options:['A very intense cyclone is about to strike','Only some light rain is expected to fall','It is quite safe to stay out at the beach','The cyclone season has only just begun'],
    answer:'A very intense cyclone is about to strike',
    hint:'Class 4 is the highest and most dangerous warning level.',
    explanation:'<b>Class 4</b> is the highest warning in Mauritius: a very intense cyclone is about to strike, with winds well above 200 km/h. Everyone must stay indoors and away from windows.'}),

  makeMCQ({ id:'g3ssee-wth-031', chapterId:'g3ssee-weather', difficulty:1, subsection:'cyclones_in_mauritius',
    question:'What is the EYE of a cyclone?',
    options:['The calm, clear centre of the storm','The rain band around the outside edge','The part with the very strongest winds','A type of tall white cloud formation'],
    answer:'The calm, clear centre of the storm',
    hint:'The eye is in the middle of the storm.',
    explanation:'The <b>eye</b> is the calm, clear centre of a cyclone — the winds there are light and the sky can even be blue. The eye wall just outside it carries the most violent winds of the whole storm.'}),

  makeTF({ id:'g3ssee-wth-032', chapterId:'g3ssee-weather', difficulty:1, subsection:'cyclones_in_mauritius',
    question:'During a cyclone, people should stay indoors and away from windows.',
    answer:true,
    explanation:'Yes! During a cyclone, staying <b>indoors away from windows</b> is essential. Flying debris and broken glass are major dangers. Going outside during a cyclone is very dangerous.' }),

  makeMCQ({ id:'g3ssee-wth-033', chapterId:'g3ssee-weather', difficulty:2, subsection:'cyclones_in_mauritius',
    question:'What should a family do to PREPARE before a cyclone arrives in Mauritius?',
    options:['Stock food and water and secure the house','Open all the windows to let the wind pass','Go down to the beach to watch the waves','Leave all of their food out in the garden'],
    answer:'Stock food and water and secure the house',
    hint:'Think about what you will need if the power goes off and you cannot leave home.',
    explanation:'Preparation means stocking food, water, candles and medicines, securing or bringing in outdoor furniture, checking the roof and windows, and following the bulletins from the Mauritius Meteorological Services.'}),

  makeMCQ({ id:'g3ssee-wth-034', chapterId:'g3ssee-weather', difficulty:2, subsection:'cyclones_in_mauritius',
    question:'Cyclones bring HEAVY RAINFALL as well as strong winds. What hazard does this cause in Mauritius?',
    options:['Flooding and landslides in hilly areas','Only some damage to a few of the trees','Only small puddles on the village roads','Only wind damage and no flooding at all'],
    answer:'Flooding and landslides in hilly areas',
    hint:'Heavy rain on steep slopes can cause more than just puddles.',
    explanation:'Cyclone rain overwhelms the drains, so low-lying areas <b>flood</b> and steep hillsides can give way in <b>landslides</b>. Both are serious dangers during and after a cyclone.'}),

  makeMCQ({ id:'g3ssee-wth-035', chapterId:'g3ssee-weather', difficulty:3, subsection:'cyclones_in_mauritius',
    question:'A cyclone is approaching Mauritius. A Class 3 warning is announced. A family lives near the beach. What should they do?',
    options:['Follow official instructions and shelter safely','Stay on the beach to watch the cyclone come in','Open the windows to balance the air pressure','Go out shopping before the shops all close'],
    answer:'Follow official instructions and shelter safely',
    hint:'Coastal areas are especially dangerous due to storm surge.',
    explanation:'A coast facing a cyclone also faces <b>storm surge</b> — sea water pushed inland by the wind. At Class 3 the family must follow official instructions: evacuate to a shelter if told to, and otherwise stay indoors.'}),

  makeMCQ({ id:'g3ssee-wth-036', chapterId:'g3ssee-weather', difficulty:1, subsection:'cyclones_in_mauritius',
    question:'After a cyclone passes, what is the FIRST thing authorities check before allowing people to go outside?',
    options:['That it is safe — no downed lines or debris','That the sun is shining brightly once again','That all of the food shops have opened again','That the schools can reopen almost immediately'],
    answer:'That it is safe — no downed lines or debris',
    hint:'Even after the wind stops, there are still dangers outside.',
    explanation:'After a cyclone the first check is <b>safety</b>: downed power lines, fallen trees blocking roads, damaged buildings and contaminated water. Authorities inspect and clear before giving the all-clear.'}),

  makeMCQ({ id:'g3ssee-wth-037', chapterId:'g3ssee-weather', difficulty:2, subsection:'cyclones_in_mauritius',
    question:'What is the STORM SURGE associated with a cyclone?',
    options:['A rise in sea level pushed by the wind','Heavy rain falling in the mountains','Lightning from the cyclone clouds','The eye of the cyclone reaching land'],
    answer:'A rise in sea level pushed by the wind',
    explanation:'A <b>storm surge</b> is an abnormal rise in sea level driven by a cyclone\'s winds pushing ocean water towards the coast. It causes severe coastal flooding and is often the deadliest part of a cyclone.'}),

  makeTF({ id:'g3ssee-wth-038', chapterId:'g3ssee-weather', difficulty:1, subsection:'cyclones_in_mauritius',
    question:'Cyclones in the Indian Ocean rotate clockwise in the Southern Hemisphere.',
    answer:true,
    explanation:'Yes! In the <b>Southern Hemisphere</b>, cyclones rotate <b>clockwise</b> due to the Coriolis effect (Earth\'s rotation). In the Northern Hemisphere, hurricanes and typhoons rotate anticlockwise.' }),

  makeMCQ({ id:'g3ssee-wth-039', chapterId:'g3ssee-weather', difficulty:2, subsection:'cyclones_in_mauritius',
    question:'How does the Mauritius Meteorological Services TRACK approaching cyclones?',
    options:['Using satellites, radar and weather stations','By looking at the colour of the sky only','By asking the public what they can see','By reading very old maps of the island'],
    answer:'Using satellites, radar and weather stations',
    hint:'Modern technology helps predict cyclone paths.',
    explanation:'The Mauritius Meteorological Services tracks a cyclone with <b>satellites, weather radar and a network of stations</b>, monitoring its position, strength and likely path so that warnings go out in time.'}),

  makeMCQ({ id:'g3ssee-wth-040', chapterId:'g3ssee-weather', difficulty:3, subsection:'cyclones_in_mauritius',
    question:'Cyclone Freddy (2023) passed through Mauritius. It was one of the longest-lasting cyclones ever recorded. What can scientists study from this event to better prepare Mauritius in future?',
    options:['Its path, wind strength, rainfall and damage','Only the highest wind speed it ever reached','Only the total amount of rain that it brought','Nothing — every cyclone is completely unique'],
    answer:'Its path, wind strength, rainfall and damage',
    hint:'Learning from past events helps reduce harm in future events.',
    explanation:'Studying a real cyclone\'s path, speed, wind strength, rainfall and the damage it did lets scientists improve forecasting models, building rules and emergency plans — which saves lives next time.'})

);

})();
