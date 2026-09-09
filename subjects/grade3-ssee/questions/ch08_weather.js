'use strict';
(function () {

// Grade 3 SSEE — Unit 8: Weather
// Source: MIE SSEE Grade 3 Part 2 pp.96-130
// IDs: g3ssee-wth-001 onwards

// ── types_of_weather (001-030) ────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g3ssee-wth-001', chapterId:'g3ssee-weather', difficulty:1, subsection:'types_of_weather',
    question:'What is WEATHER?',
    options:['The condition of the atmosphere at a particular place and time — such as sunny, rainy or windy','The type of soil in a place','The type of plants in a place','The number of rivers in a country'],
    answer:'The condition of the atmosphere at a particular place and time — such as sunny, rainy or windy',
    hint:'Weather changes from day to day.',
    explanation:'<b>Weather</b> describes the condition of the <b>atmosphere</b> at a specific place and time. It can be sunny, cloudy, rainy, windy or stormy, and it changes daily.' }),

  makeMCQ({ id:'g3ssee-wth-002', chapterId:'g3ssee-weather', difficulty:1, subsection:'types_of_weather',
    question:'Which of the following is a TYPE of weather experienced in Mauritius?',
    options:['Sunny weather (bright sun, clear sky)','Snowstorms','Extreme frost every winter','Dense sandstorms'],
    answer:'Sunny weather (bright sun, clear sky)',
    hint:'Mauritius is a tropical island.',
    explanation:'Mauritius has <b>tropical weather</b>. Types of weather experienced include <b>sunny</b>, cloudy, rainy, windy and sometimes stormy (cyclone) weather. Snowstorms and heavy frost are NOT typical in Mauritius.' }),

  makeTF({ id:'g3ssee-wth-003', chapterId:'g3ssee-weather', difficulty:1, subsection:'types_of_weather',
    question:'Mauritius has a tropical climate with a hot, wet season and a cooler, drier season.',
    answer:true,
    explanation:'Yes! Mauritius has a <b>tropical climate</b>: a <b>hot, wet season</b> from roughly November to April (summer) and a <b>cooler, drier season</b> from May to October (winter).' }),

  makeMCQ({ id:'g3ssee-wth-004', chapterId:'g3ssee-weather', difficulty:1, subsection:'types_of_weather',
    question:'Which months are the HOTTEST and WETTEST in Mauritius?',
    options:['November to April (summer/wet season)','May to October (winter/dry season)','Only December','Only March'],
    answer:'November to April (summer/wet season)',
    explanation:'In Mauritius, <b>November to April</b> is the <b>summer (wet season)</b> — the hottest months with the most rainfall and the highest cyclone risk.' }),

  makeMCQ({ id:'g3ssee-wth-005', chapterId:'g3ssee-weather', difficulty:1, subsection:'types_of_weather',
    question:'Which months form the COOLER, DRIER season in Mauritius?',
    options:['May to October (winter/dry season)','November to April','January to March','Only July'],
    answer:'May to October (winter/dry season)',
    explanation:'In Mauritius, <b>May to October</b> is the <b>winter (dry season)</b> — cooler temperatures and less rainfall. The south-east trade winds are stronger during this period.' }),

  makeMCQ({ id:'g3ssee-wth-006', chapterId:'g3ssee-weather', difficulty:2, subsection:'types_of_weather',
    question:'What is CLIMATE?',
    options:['The average weather conditions of a place over a long period (many years)','The weather on a single day','A type of strong wind','The temperature of the ocean'],
    answer:'The average weather conditions of a place over a long period (many years)',
    hint:'Climate and weather are different — one is long-term, one is short-term.',
    explanation:'<b>Climate</b> is the average weather of a place measured over a <b>long period (usually 30 years)</b>. Weather can change daily; climate changes very slowly. Mauritius has a <b>tropical climate</b>.' }),

  makeMCQ({ id:'g3ssee-wth-007', chapterId:'g3ssee-weather', difficulty:2, subsection:'types_of_weather',
    question:'A child says "It was sunny yesterday but it is raining today." This describes the ___.',
    options:['Weather — short-term atmospheric conditions','Climate — long-term patterns','Season only','Cyclone'],
    answer:'Weather — short-term atmospheric conditions',
    hint:'Weather changes from day to day.',
    explanation:'This describes <b>weather</b> — the daily, short-term conditions of the atmosphere. Climate is the long-term average and does not change daily.' }),

  makeMCQ({ id:'g3ssee-wth-008', chapterId:'g3ssee-weather', difficulty:1, subsection:'types_of_weather',
    question:'What type of weather does a THERMOMETER measure?',
    options:['Temperature','Rainfall','Wind speed','Wind direction'],
    answer:'Temperature',
    hint:'A thermometer has a scale in degrees Celsius.',
    explanation:'A <b>thermometer</b> measures <b>temperature</b> — how hot or cold the air is, measured in degrees Celsius (°C).' }),

  makeMCQ({ id:'g3ssee-wth-009', chapterId:'g3ssee-weather', difficulty:2, subsection:'types_of_weather',
    question:'Why is it important for farmers in Mauritius to know the WEATHER FORECAST?',
    options:['To plan irrigation, planting and harvest — too little or too much rain affects their crops','To decide what to wear to a party','To choose their favourite weather','To predict earthquakes'],
    answer:'To plan irrigation, planting and harvest — too little or too much rain affects their crops',
    explanation:'Farmers rely on <b>weather forecasts</b> to plan when to plant and harvest crops, when to irrigate (if it is too dry), and when to protect crops from heavy rain or strong winds.' }),

  makeTF({ id:'g3ssee-wth-010', chapterId:'g3ssee-weather', difficulty:1, subsection:'types_of_weather',
    question:'Weather can affect what clothes we wear and what activities we do.',
    answer:true,
    explanation:'Yes! <b>Weather directly affects daily life</b>. On sunny days we wear light clothes; on cool days we wear jumpers; on rainy days we carry an umbrella. Outdoor activities, sports and transport are all affected by weather.' }),

  makeMCQ({ id:'g3ssee-wth-011', chapterId:'g3ssee-weather', difficulty:2, subsection:'types_of_weather',
    question:'Mauritius experiences more frequent HEAVY RAINFALL in the central plateau region than on the coasts. Why?',
    options:['The mountains cause moist air to rise, cool and condense, leading to more rainfall','The central plateau is closer to the sea','The central plateau has more rivers','The coast is always covered in clouds'],
    answer:'The mountains cause moist air to rise, cool and condense, leading to more rainfall',
    hint:'Altitude (height) affects temperature and rainfall.',
    explanation:'The <b>central plateau</b> is higher in altitude. When moist trade winds hit the mountains, the air is forced to <b>rise, cool and condense</b>, producing more rainfall than at lower coastal areas.' }),

  makeMCQ({ id:'g3ssee-wth-012', chapterId:'g3ssee-weather', difficulty:1, subsection:'types_of_weather',
    question:'Which of the following is NOT a type of weather?',
    options:['Magnetism','Sunny','Rainy','Windy'],
    answer:'Magnetism',
    explanation:'<b>Magnetism</b> is a force, not a type of weather. Types of weather include sunny, cloudy, rainy, windy, stormy and foggy.' }),

  makeMCQ({ id:'g3ssee-wth-013', chapterId:'g3ssee-weather', difficulty:2, subsection:'types_of_weather',
    question:'What is FOG?',
    options:['A cloud at ground level — tiny water droplets suspended in the air near the surface','A type of very heavy rain','A very strong wind','Falling snow'],
    answer:'A cloud at ground level — tiny water droplets suspended in the air near the surface',
    explanation:'<b>Fog</b> is essentially a <b>cloud at ground level</b>. It forms when water vapour condenses into tiny droplets near the surface, reducing visibility. In Mauritius, it can occur in the central highlands early in the morning.' }),

  makeMCQ({ id:'g3ssee-wth-014', chapterId:'g3ssee-weather', difficulty:3, subsection:'types_of_weather',
    question:'A family in Mauritius is planning a beach trip for the coming weekend. They check the weather forecast and see "partly cloudy with a chance of afternoon showers." What should they do?',
    options:['Bring sunscreen AND an umbrella or raincoat, and check the forecast again closer to the day','Cancel the trip entirely because it will definitely rain all day','Go without any preparations because the forecast is always wrong','Only bring sunscreen because showers will not happen'],
    answer:'Bring sunscreen AND an umbrella or raincoat, and check the forecast again closer to the day',
    hint:'A forecast gives a probability, not a certainty.',
    explanation:'A forecast of "partly cloudy with a chance of showers" means it MIGHT rain in the afternoon — it is not certain. The best plan is to prepare for both sun AND rain and check the forecast again closer to the day, as conditions can change.' }),

  makeTF({ id:'g3ssee-wth-015', chapterId:'g3ssee-weather', difficulty:1, subsection:'types_of_weather',
    question:'Sunshine (solar radiation) is a form of weather.',
    answer:true,
    explanation:'Yes! <b>Sunshine</b> (the amount of sunlight reaching the surface) is an important element of weather. Meteorologists measure sunshine hours, temperature, rainfall, wind speed and direction.' }),

// ── weather_instruments (016-045) ────────────────────────────────────────

  makeMCQ({ id:'g3ssee-wth-016', chapterId:'g3ssee-weather', difficulty:1, subsection:'weather_instruments',
    question:'What does a THERMOMETER measure?',
    options:['Temperature (in degrees Celsius)','Rainfall','Wind direction','Air pressure'],
    answer:'Temperature (in degrees Celsius)',
    hint:'The word "thermo" means heat.',
    explanation:'A <b>thermometer</b> measures <b>temperature</b> in degrees Celsius (°C). A clinical thermometer measures body temperature; a weather thermometer measures air temperature.' }),

  makeMCQ({ id:'g3ssee-wth-017', chapterId:'g3ssee-weather', difficulty:1, subsection:'weather_instruments',
    question:'What does a RAIN GAUGE (pluviomètre) measure?',
    options:['The amount of rainfall (in mm or cm)','Wind speed','Temperature','Air pressure'],
    answer:'The amount of rainfall (in mm or cm)',
    hint:'It collects and measures rain.',
    explanation:'A <b>rain gauge (pluviomètre)</b> is a cylindrical container that collects rain and measures the <b>amount of rainfall</b> in millimetres (mm) or centimetres (cm).' }),

  makeMCQ({ id:'g3ssee-wth-018', chapterId:'g3ssee-weather', difficulty:1, subsection:'weather_instruments',
    question:'What does a WIND VANE (girouette) show?',
    options:['The direction the wind is blowing FROM','The speed of the wind','The temperature of the wind','The amount of rainfall'],
    answer:'The direction the wind is blowing FROM',
    hint:'It turns to point into the wind.',
    explanation:'A <b>wind vane (girouette)</b> is an arrow that rotates and points into the wind, showing the <b>direction the wind is blowing from</b>. If it points north, the wind is a "northerly" (blowing from the north).' }),

  makeMCQ({ id:'g3ssee-wth-019', chapterId:'g3ssee-weather', difficulty:1, subsection:'weather_instruments',
    question:'What does an ANEMOMETER measure?',
    options:['Wind speed','Wind direction','Rainfall','Temperature'],
    answer:'Wind speed',
    hint:'An anemometer has spinning cups that turn faster in stronger wind.',
    explanation:'An <b>anemometer</b> measures <b>wind speed</b> — usually in kilometres per hour (km/h) or metres per second (m/s). It has spinning cups that rotate faster as wind speed increases.' }),

  makeMCQ({ id:'g3ssee-wth-020', chapterId:'g3ssee-weather', difficulty:2, subsection:'weather_instruments',
    question:'A weather station records 120 mm of rainfall in January. Which instrument was used to collect this data?',
    options:['A rain gauge (pluviomètre)','A thermometer','A wind vane','An anemometer'],
    answer:'A rain gauge (pluviomètre)',
    hint:'This instrument collects and measures precipitation.',
    explanation:'Rainfall is measured with a <b>rain gauge (pluviomètre)</b>. The 120 mm means that 120 millimetres of rain fell and was collected in the gauge during January.' }),

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
    options:['The wind is blowing FROM the south-east (a south-easterly wind)','The wind is blowing TOWARDS the south-east','It is raining in the south-east','The temperature is falling'],
    answer:'The wind is blowing FROM the south-east (a south-easterly wind)',
    hint:'A wind is named after where it comes FROM.',
    explanation:'A wind vane points INTO the wind — where the wind is coming FROM. If it points <b>south-east</b>, the wind is a <b>south-easterly</b> — blowing from the south-east. These are the common trade winds of Mauritius.' }),

  makeTF({ id:'g3ssee-wth-024', chapterId:'g3ssee-weather', difficulty:1, subsection:'weather_instruments',
    question:'A barometer measures air pressure.',
    answer:true,
    explanation:'Yes! A <b>barometer</b> measures <b>air pressure</b>. Falling air pressure often signals approaching stormy weather; rising pressure indicates clearing skies.' }),

  makeMCQ({ id:'g3ssee-wth-025', chapterId:'g3ssee-weather', difficulty:3, subsection:'weather_instruments',
    question:'A class records the daily temperature in Mauritius for one month. They find January has an average of 28°C and July has an average of 20°C. What can they CONCLUDE?',
    options:['Mauritius is warmer in January (summer/wet season) than in July (winter/dry season)','July is the hottest month in Mauritius','Temperature does not change in Mauritius','The thermometer was broken in January'],
    answer:'Mauritius is warmer in January (summer/wet season) than in July (winter/dry season)',
    hint:'Use the data to draw a conclusion about seasons.',
    explanation:'The data shows that <b>January is warmer (28°C)</b> and <b>July is cooler (20°C)</b>. This confirms that Mauritius has a warmer summer season (November–April) and a cooler winter season (May–October).' }),

// ── cyclones_in_mauritius (026-075) ───────────────────────────────────────

  makeMCQ({ id:'g3ssee-wth-026', chapterId:'g3ssee-weather', difficulty:1, subsection:'cyclones_in_mauritius',
    question:'What is a TROPICAL CYCLONE?',
    options:['A very powerful storm with very strong winds that forms over warm tropical ocean water','A light summer breeze','A type of cloud','A cold weather event'],
    answer:'A very powerful storm with very strong winds that forms over warm tropical ocean water',
    hint:'Cyclones form over warm ocean water.',
    explanation:'A <b>tropical cyclone</b> is an intense rotating storm system with very strong winds (above 120 km/h) that forms over <b>warm tropical ocean water</b>. In the Indian Ocean it is called a <b>cyclone</b>; in the Pacific it is called a typhoon; in the Atlantic, a hurricane.' }),

  makeMCQ({ id:'g3ssee-wth-027', chapterId:'g3ssee-weather', difficulty:1, subsection:'cyclones_in_mauritius',
    question:'When is the CYCLONE SEASON in Mauritius?',
    options:['November to April (the wet/summer season)','May to October (the dry/winter season)','Only in December','All year round'],
    answer:'November to April (the wet/summer season)',
    hint:'Cyclones need warm ocean water to form.',
    explanation:'The <b>cyclone season</b> in Mauritius runs from <b>November to April</b>. During this period, ocean water is warmer, providing the energy cyclones need to form and intensify.' }),

  makeMCQ({ id:'g3ssee-wth-028', chapterId:'g3ssee-weather', difficulty:2, subsection:'cyclones_in_mauritius',
    question:'Which organisation in Mauritius warns the public about approaching cyclones?',
    options:['The Mauritius Meteorological Services','The Ministry of Education','The Central Water Authority','The Fire Services'],
    answer:'The Mauritius Meteorological Services',
    hint:'They track weather and issue forecasts and warnings.',
    explanation:'The <b>Mauritius Meteorological Services (MMS)</b> monitors weather conditions and issues <b>cyclone bulletins and warnings</b> to inform the public about approaching cyclones.' }),

  makeMCQ({ id:'g3ssee-wth-029', chapterId:'g3ssee-weather', difficulty:1, subsection:'cyclones_in_mauritius',
    question:'What does a CLASS 1 CYCLONE WARNING in Mauritius mean?',
    options:['A cyclone may be approaching within 36 hours; winds up to 120 km/h possible — be alert','The cyclone is passing directly overhead right now','Danger has passed — all clear','A small rain shower is expected'],
    answer:'A cyclone may be approaching within 36 hours; winds up to 120 km/h possible — be alert',
    hint:'Class 1 is the first and least severe warning level.',
    explanation:'In Mauritius, a <b>Class 1 warning</b> means a cyclone is within about 36 hours and wind gusts of up to 120 km/h are possible. It is an <b>alert stage</b> — prepare, monitor updates, and be ready to take precautions.' }),

  makeMCQ({ id:'g3ssee-wth-030', chapterId:'g3ssee-weather', difficulty:2, subsection:'cyclones_in_mauritius',
    question:'What does a CLASS 4 CYCLONE WARNING in Mauritius mean?',
    options:['Extremely dangerous conditions — a very intense cyclone is about to strike; stay indoors immediately','The cyclone season has begun','Light rain is expected','Stay at the beach for safety'],
    answer:'Extremely dangerous conditions — a very intense cyclone is about to strike; stay indoors immediately',
    hint:'Class 4 is the highest and most dangerous warning level.',
    explanation:'A <b>Class 4 warning</b> is the highest level in Mauritius. It means a very intense cyclone is imminent, with winds well above 200 km/h. Everyone must <b>stay indoors immediately and away from windows</b>.' }),

  makeMCQ({ id:'g3ssee-wth-031', chapterId:'g3ssee-weather', difficulty:1, subsection:'cyclones_in_mauritius',
    question:'What is the EYE of a cyclone?',
    options:['The calm, clear centre of the cyclone where winds are light','The most dangerous part with the strongest winds','A type of cloud formation','The rain band around the storm'],
    answer:'The calm, clear centre of the cyclone where winds are light',
    hint:'The eye is in the middle of the storm.',
    explanation:'The <b>eye</b> of a cyclone is the calm, clear centre — winds there are light and the sky may even be blue. However, the <b>eye wall</b> surrounding the eye has the most violent winds in the entire storm.' }),

  makeTF({ id:'g3ssee-wth-032', chapterId:'g3ssee-weather', difficulty:1, subsection:'cyclones_in_mauritius',
    question:'During a cyclone, people should stay indoors and away from windows.',
    answer:true,
    explanation:'Yes! During a cyclone, staying <b>indoors away from windows</b> is essential. Flying debris and broken glass are major dangers. Going outside during a cyclone is very dangerous.' }),

  makeMCQ({ id:'g3ssee-wth-033', chapterId:'g3ssee-weather', difficulty:2, subsection:'cyclones_in_mauritius',
    question:'What should a family do to PREPARE before a cyclone arrives in Mauritius?',
    options:['Stock up on food, water, candles and medicines; check that the house is secure; listen to official weather bulletins','Go to the beach to watch the waves','Leave their food in the garden','Open all windows to let the wind pass through'],
    answer:'Stock up on food, water, candles and medicines; check that the house is secure; listen to official weather bulletins',
    hint:'Think about what you will need if the power goes off and you cannot leave home.',
    explanation:'Cyclone preparation includes: stocking <b>food, water, candles and first aid supplies</b>; securing or bringing in outdoor furniture; checking roof and windows; and <b>following official advice</b> from the Mauritius Meteorological Services and authorities.' }),

  makeMCQ({ id:'g3ssee-wth-034', chapterId:'g3ssee-weather', difficulty:2, subsection:'cyclones_in_mauritius',
    question:'Cyclones bring HEAVY RAINFALL as well as strong winds. What hazard does this cause in Mauritius?',
    options:['Flooding and landslides, especially in hilly areas','Only minor puddles on roads','Only wind damage with no flooding','Only damage to trees'],
    answer:'Flooding and landslides, especially in hilly areas',
    hint:'Heavy rain on steep slopes can cause more than just puddles.',
    explanation:'Heavy cyclone rain can overwhelm drainage systems and cause <b>flooding</b> in low-lying areas and <b>landslides</b> on steep hillsides. These are serious dangers during and after cyclones in Mauritius.' }),

  makeMCQ({ id:'g3ssee-wth-035', chapterId:'g3ssee-weather', difficulty:3, subsection:'cyclones_in_mauritius',
    question:'A cyclone is approaching Mauritius. A Class 3 warning is announced. A family lives near the beach. What should they do?',
    options:['Follow official instructions — if told to evacuate, leave the coastal area and go to a shelter; if not, stay indoors','Stay on the beach to watch the cyclone approach','Open windows to balance air pressure','Go shopping before the stores close'],
    answer:'Follow official instructions — if told to evacuate, leave the coastal area and go to a shelter; if not, stay indoors',
    hint:'Coastal areas are especially dangerous due to storm surge.',
    explanation:'Coastal areas face <b>storm surge</b> (a wall of sea water pushed inland by cyclone winds) in addition to wind and rain. A Class 3 warning means dangerous conditions are expected. Families near the beach should follow all <b>official evacuation or shelter-in-place instructions</b>.' }),

  makeMCQ({ id:'g3ssee-wth-036', chapterId:'g3ssee-weather', difficulty:1, subsection:'cyclones_in_mauritius',
    question:'After a cyclone passes, what is the FIRST thing authorities check before allowing people to go outside?',
    options:['That it is safe — no downed power lines, fallen trees blocking roads, or structural damage','That the sun is shining','That all food shops are open','That schools can reopen immediately'],
    answer:'That it is safe — no downed power lines, fallen trees blocking roads, or structural damage',
    hint:'Even after the wind stops, there are still dangers outside.',
    explanation:'After a cyclone, <b>downed power lines</b> (electrocution risk), <b>fallen trees</b> blocking roads, structural damage and contaminated water all remain dangerous. Authorities inspect and clear before giving the all-clear signal.' }),

  makeMCQ({ id:'g3ssee-wth-037', chapterId:'g3ssee-weather', difficulty:2, subsection:'cyclones_in_mauritius',
    question:'What is the STORM SURGE associated with a cyclone?',
    options:['A rise in sea level caused by the cyclone\'s powerful winds pushing water towards the shore','Heavy rain in the mountains','Lightning from the cyclone\'s clouds','The eye of the cyclone reaching land'],
    answer:'A rise in sea level caused by the cyclone\'s powerful winds pushing water towards the shore',
    explanation:'A <b>storm surge</b> is an abnormal rise in sea level driven by a cyclone\'s winds pushing ocean water towards the coast. This can cause severe <b>coastal flooding</b> — often the deadliest aspect of a cyclone.' }),

  makeTF({ id:'g3ssee-wth-038', chapterId:'g3ssee-weather', difficulty:1, subsection:'cyclones_in_mauritius',
    question:'Cyclones in the Indian Ocean rotate clockwise in the Southern Hemisphere.',
    answer:true,
    explanation:'Yes! In the <b>Southern Hemisphere</b>, cyclones rotate <b>clockwise</b> due to the Coriolis effect (Earth\'s rotation). In the Northern Hemisphere, hurricanes and typhoons rotate anticlockwise.' }),

  makeMCQ({ id:'g3ssee-wth-039', chapterId:'g3ssee-weather', difficulty:2, subsection:'cyclones_in_mauritius',
    question:'How does the Mauritius Meteorological Services TRACK approaching cyclones?',
    options:['Using satellites, radar and weather stations to monitor position, strength and path','By asking the public to report what they see','By looking at the colour of the sky only','By reading old maps'],
    answer:'Using satellites, radar and weather stations to monitor position, strength and path',
    hint:'Modern technology helps predict cyclone paths.',
    explanation:'The <b>Mauritius Meteorological Services</b> uses <b>satellites</b>, <b>weather radar</b> and a network of <b>weather stations</b> to track cyclones — monitoring their position, intensity and predicted path to issue timely warnings.' }),

  makeMCQ({ id:'g3ssee-wth-040', chapterId:'g3ssee-weather', difficulty:3, subsection:'cyclones_in_mauritius',
    question:'Cyclone Freddy (2023) passed through Mauritius. It was one of the longest-lasting cyclones ever recorded. What can scientists study from this event to better prepare Mauritius in future?',
    options:['The cyclone\'s path, speed, wind strength, rainfall, damage caused — to improve forecasting, building codes and emergency plans','Nothing — each cyclone is unique and cannot be studied','Only the amount of rain it brought','Only the maximum wind speed at its peak'],
    answer:'The cyclone\'s path, speed, wind strength, rainfall, damage caused — to improve forecasting, building codes and emergency plans',
    hint:'Learning from past events helps reduce harm in future events.',
    explanation:'Studying historical cyclones like <b>Freddy (2023)</b> helps scientists improve <b>weather forecasting models</b>, update <b>building standards</b> to withstand stronger storms, refine <b>evacuation plans</b>, and better prepare communities — saving lives in future events.' })

);

})();
