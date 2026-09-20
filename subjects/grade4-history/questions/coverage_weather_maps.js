'use strict';
(function () {
// Real reasons, keyed by id. Every question in this file used to carry only
// "<b>X</b> is correct.", which restates the answer and teaches nothing.
const G4HG_EXPL = {
  'g4hg-cov-season-0': "Summer in Mauritius runs from about <b>November to April</b>.",
  'g4hg-cov-season-1': "Winter runs from about <b>May to October</b>.",
  'g4hg-cov-season-2': "Mauritian summer is <b>hot and rainy</b>, and it is also the cyclone season.",
  'g4hg-cov-season-3': "Winter is <b>cooler and much drier</b>, with the south-east trade winds blowing steadily.",
  'g4hg-cov-season-4': "Cyclones form over warm ocean water, so they are far more likely in the <b>warm summer season</b>.",
  'g4hg-cov-season-5': "If rain is forecast, take <b>an umbrella or raincoat</b> and you will stay dry whether or not it falls.",
  'g4hg-cov-season-6': "Crops need the right rain and warmth at the right time, so farmers watch the seasons because <b>weather affects crops</b>.",
  'g4hg-cov-season-7': "Summer ends in April, so what follows is <b>the cooler winter season</b>.",
  'g4hg-cov-season-8': "Hot, humid days belong to <b>summer</b>, when the air is warm and holds much more moisture.",
  'g4hg-cov-season-9': "Cooler, dry days belong to <b>winter</b>, when the air is cooler and carries less rain.",
  'g4hg-cov-season-10': "Air grows cooler with height, so <b>higher areas</b> such as the central plateau are cooler and wetter than the coast.",
  'g4hg-cov-season-11': "A season is <b>a time of year with its own kind of weather</b>, returning in the same months each year.",
  'g4hg-cov-instrument-0': "A <b>thermometer</b> measures temperature, in degrees Celsius.",
  'g4hg-cov-instrument-1': "A <b>rain gauge</b> collects falling rain so the depth can be measured.",
  'g4hg-cov-instrument-2': "A <b>wind vane</b> turns freely and points to show the wind's direction.",
  'g4hg-cov-instrument-3': "An <b>anemometer</b> has cups that spin in the wind; the faster they spin, the stronger the wind.",
  'g4hg-cov-instrument-4': "<b>Temperature</b> is the measurement written in degrees Celsius (°C).",
  'g4hg-cov-instrument-5': "A <b>rain gauge</b> has to stand out in the open to catch the rain — that is the whole point of it.",
  'g4hg-cov-instrument-6': "A wind vane points towards <b>where the wind is coming from</b>, which is how winds are named: a north wind blows from the north.",
  'g4hg-cov-element-0': "Rainfall is <b>the amount of rain that falls</b> on a place, usually measured in millimetres.",
  'g4hg-cov-element-1': "Temperature tells us <b>how hot or cold the air is</b>.",
  'g4hg-cov-element-2': "Wind is simply <b>moving air</b>.",
  'g4hg-cov-element-3': "Cloud cover describes <b>how much of the sky is covered by cloud</b>.",
  'g4hg-cov-element-4': "A forecast is a prediction, so it tells us what the weather <b>may do in the next few days</b> — not what it must do.",
  'g4hg-cov-element-5': "Strong wind raises big waves, which makes travelling by sea <b>rough and dangerous</b>, especially in a small boat.",
  'g4hg-cov-element-6': "Knowing the weather ahead lets people <b>plan the day safely</b> — what to wear, whether to travel, whether to go to sea.",
  'g4hg-cov-element-7': "A sunny symbol means clear skies, so <b>there is little or no rain</b> expected.",
  'g4hg-cov-element-8': "When more rain falls than the ground and drains can take, the water collects and causes <b>flooding of low land</b>.",
  'g4hg-cov-element-9': "A drought is a long spell with <b>very little rain</b>, so the ground dries out and crops suffer.",
  'g4hg-cov-element-10': "Plants need <b>suitable rain and sunshine</b> — too little or too much of either and the crop fails.",
  'g4hg-cov-element-11': "A cyclone warning gives people time to <b>prepare and stay safe</b> before the weather arrives.",
  'g4hg-cov-element-12': "<b>Wind speed</b> describes how fast the air is moving, and it is measured with an anemometer.",
  'g4hg-cov-element-13': "<b>A very low temperature</b> is what makes you reach for a coat.",
  'g4hg-cov-cyclone-0': "The official warning is based on where the cyclone actually is, so a family should <b>follow official safety advice</b>.",
  'g4hg-cov-cyclone-1': "Strong wind throws branches, sheets of roofing and other debris, so staying indoors <b>avoids being injured</b>.",
  'g4hg-cov-cyclone-2': "Supplies can be cut off for days, so <b>safe drinking water</b> should be stored before the cyclone arrives.",
  'g4hg-cov-cyclone-3': "Anything loose outside can be <b>blown away</b> and become dangerous, so it should be brought in or tied down.",
  'g4hg-cov-cyclone-4': "<b>The official weather service</b> has the measurements and the responsibility, so its advice is the one to trust.",
  'g4hg-cov-cyclone-5': "Flood water hides holes, sharp objects and live wires, and it moves faster than it looks, so <b>it can be dangerous</b>.",
  'g4hg-cov-cyclone-6': "A cyclone brings <b>strong winds and heavy rain</b> together, which is why it can cause both damage and flooding.",
  'g4hg-cov-cyclone-7': "<b>A torch</b> is safe in the dark. Candles can be knocked over and start a fire.",
  'g4hg-cov-cyclone-8': "A plan made in advance means <b>everyone knows what to do</b>, even if people are apart when the warning comes.",
  'g4hg-cov-cyclone-9': "<b>Going outside to look</b> is the most dangerous thing you can do: flying debris causes many cyclone injuries.",
  'g4hg-cov-cyclone-10': "A fallen or damaged wire may still be live, and <b>it can be dangerous</b> even when it looks harmless.",
  'g4hg-cov-cyclone-11': "Children should stay with <b>a trusted adult</b> throughout, so that no one is alone if something goes wrong.",
  'g4hg-cov-cyclone-12': "Officials close roads because of <b>hazards</b> such as flooding, fallen trees or broken power lines.",
  'g4hg-cov-cyclone-13': "Low-lying land has nowhere for water to drain to, so heavy rain <b>causes flooding</b> there first.",
  'g4hg-cov-cyclone-14': "A warning is given early on purpose, so that people can <b>act early and safely</b> rather than at the last moment.",
  'g4hg-cov-cyclone-15': "<b>A first-aid kit and a torch</b> cover the two most likely problems: an injury, and no electricity.",
  'g4hg-cov-direction-0': "North and <b>south</b> are opposite each other on the compass.",
  'g4hg-cov-direction-1': "East and <b>west</b> are opposite each other on the compass.",
  'g4hg-cov-direction-2': "By convention the top of a map points <b>north</b>, which is why the north arrow usually points up.",
  'g4hg-cov-direction-3': "Directions reverse when you look the other way, so if the school is east of the park, the park is <b>west of the school</b>.",
  'g4hg-cov-direction-4': "The Sun rises in the <b>east</b>, every day, everywhere.",
  'g4hg-cov-direction-5': "The Sun sets in the <b>west</b>, opposite where it rose.",
  'g4hg-cov-direction-6': "A compass rose is the small star on a map that shows the <b>directions</b>.",
  'g4hg-cov-direction-7': "Turning right is a quarter turn clockwise. From north, that brings you to face <b>east</b>.",
  'g4hg-cov-symbol-0': "A map is far smaller than the real place, so symbols <b>show features simply</b> in the space available.",
  'g4hg-cov-symbol-1': "The <b>key</b>, or legend, lists each symbol and says what it means.",
  'g4hg-cov-symbol-2': "Blue stands for water on a map, so a blue line usually shows <b>a river or stream</b>.",
  'g4hg-cov-symbol-3': "A small plane marks <b>an airport or airfield</b> — the picture suggests what is there.",
  'g4hg-cov-symbol-4': "A cross is the usual symbol for <b>a hospital or clinic</b>.",
  'g4hg-cov-symbol-5': "A star usually marks <b>a capital or an important place</b>, so it stands out from ordinary towns.",
  'g4hg-cov-symbol-6': "<b>Symbols can differ from map to map</b>, so you must check the key rather than assume you already know.",
  'g4hg-cov-symbol-7': "A road is usually drawn as <b>a line</b>, with its thickness or colour showing what kind of road it is.",
  'g4hg-cov-symbol-8': "A symbol you can recognise at a glance lets you <b>find the school quickly</b> without reading every label.",
  'g4hg-cov-symbol-9': "<b>\"river — blue line\"</b> names the feature and the symbol together, which is exactly what a key entry should do.",
  'g4hg-cov-symbol-10': "A symbol only works if it is <b>clear and easy to recognise</b>; a complicated one is no quicker than words.",
  'g4hg-cov-symbol-11': "Green usually marks vegetation, so a green area may show <b>a forest or a park</b>.",
  'g4hg-cov-symbol-12': "A map key is also called <b>a legend</b>. The two words mean the same thing.",
  'g4hg-cov-symbol-13': "<b>A small wave symbol</b> suggests the sea at once, so it suits a beach.",
  'g4hg-cov-symbol-14': "On a small map <b>there is very little room</b>, so a symbol says in one mark what words could not fit.",
  'g4hg-cov-part-0': "<b>The title</b> tells you what the map is about, before you read anything else on it.",
  'g4hg-cov-part-1': "<b>The key</b>, or legend, explains what each symbol stands for.",
  'g4hg-cov-part-2': "<b>The north arrow</b> shows which way is north, so you can orient the map.",
  'g4hg-cov-part-3': "<b>The scale</b> tells you how map distance relates to real distance.",
  'g4hg-cov-part-4': "Without a title you would not know what you were looking at, so it <b>tells the map's subject</b>.",
  'g4hg-cov-part-5': "A map can be turned any way round, so the north arrow <b>shows the direction</b> and fixes which way it should be read.",
  'g4hg-cov-part-6': "A scale lets you turn a measurement on the paper into <b>the real distance</b> on the ground.",
  'g4hg-cov-part-7': "\"Map of Mauritius\" says what the map shows, so it is <b>the title</b>.",
  'g4hg-cov-part-8': "\"1 cm = 1 km\" compares map distance with real distance, so it is <b>the scale</b>.",
  'g4hg-cov-part-9': "Every map needs <b>a clear title</b>, because without one the reader cannot tell what it shows.",
  'g4hg-cov-part-10': "A legend explains <b>the symbols</b> used on the map.",
  'g4hg-cov-part-11': "A north arrow is a <b>direction guide</b>: it tells the reader which way the map is facing.",
  'g4hg-cov-part-12': "You use a scale <b>to work out real distance</b> from the distance measured on the map.",
  'g4hg-cov-part-13': "Without a key the symbols mean nothing to the reader, so the map is <b>hard to understand</b>.",
  'g4hg-cov-part-14': "A good title is <b>short and accurate</b>: long enough to say what the map shows, short enough to read at a glance.",
  'g4hg-cov-part-15': "The compass lets a reader turn the map until it matches the ground, which is how you <b>orient it to north</b>.",
  'g4hg-cov-usemap-0': "Read <b>the title and key</b> first: they tell you what the map shows and what its symbols mean.",
  'g4hg-cov-usemap-1': "If the shop is north of the school, then from the school you travel <b>north</b> to reach it.",
  'g4hg-cov-usemap-2': "Look up the feature's <b>symbol in the key</b> first, then search the map for that symbol.",
  'g4hg-cov-usemap-3': "A simple drawing of the way shows the turnings in order, which <b>helps others follow it</b>.",
  'g4hg-cov-usemap-4': "A visitor does not know the area, so a map helps them <b>find places easily</b> without having to ask.",
  'g4hg-cov-usemap-5': "Each centimetre stands for 1 km, so 3 cm stands for <b>3 km</b> on the ground.",
  'g4hg-cov-usemap-6': "<b>Important places</b> should be labelled, so a reader can tell what each symbol on your map represents.",
  'g4hg-cov-usemap-7': "<b>A line with arrows</b> shows both the way to go and the direction to travel along it.",
  'g4hg-cov-usemap-8': "A map is only useful if it can be read, so keeping it neat means <b>people can read it</b>.",
  'g4hg-cov-usemap-9': "A map of a neighbourhood shows <b>where places are</b> and how they sit in relation to each other.",
};
  const add = (id, c, s, question, options, answer, hint) => STATIC_QUESTIONS.push(makeMCQ({ id, chapterId:c, subsection:s, difficulty:2, question, options, answer, hint, explanation: G4HG_EXPL[id] || `<b>${answer}</b> is correct.` }));

  // --- seasons ---
  const H = 'Think about Mauritius\'s two main seasons.';
  add('g4hg-cov-season-0','g4ge-weather','seasons','Which months are usually summer in Mauritius?',['usually November to April','usually May to October','usually January to June','usually July to December'],'usually November to April',H);
  add('g4hg-cov-season-1','g4ge-weather','seasons','Which months are usually winter in Mauritius?',['usually May to October','usually November to April','usually February to July','usually August to January'],'usually May to October',H);
  add('g4hg-cov-season-2','g4ge-weather','seasons','Mauritian summer is usually…',['usually hot and rainy','cooler and much drier','cold and windy','dry and very warm'],'usually hot and rainy',H);
  add('g4hg-cov-season-3','g4ge-weather','seasons','Mauritian winter is usually…',['cooler and much drier','usually hot and rainy','cold and snowy','warm and very wet'],'cooler and much drier',H);
  add('g4hg-cov-season-4','g4ge-weather','seasons','During which season are cyclones more likely?',['the warm summer season','the cooler winter season','the dry spring season','the cold autumn season'],'the warm summer season',H);
  add('g4hg-cov-season-5','g4ge-weather','seasons','What should you take when rain is forecast?',['an umbrella or raincoat','a hat and sunglasses','a scarf and warm gloves','a water bottle and snack'],'an umbrella or raincoat',H);
  add('g4hg-cov-season-6','g4ge-weather','seasons','Why do farmers watch the seasons?',['the weather affects crops','rain never falls in summer','all seasons feel the same','crops grow without any rain'],'the weather affects crops',H);
  add('g4hg-cov-season-7','g4ge-weather','seasons','Which season comes after April?',['the cooler winter season','the warm summer season','the wet rainy season','the hot dry period'],'the cooler winter season',H);
  add('g4hg-cov-season-8','g4ge-weather','seasons','A hot, humid day is more common in…',['the warm summer season','the cooler winter season','the early dry season','the mild spring period'],'the warm summer season',H);
  add('g4hg-cov-season-9','g4ge-weather','seasons','A cooler, dry day is more common in…',['the cooler winter season','the warm summer season','the wet cyclone season','the hot rainy period'],'the cooler winter season',H);
  add('g4hg-cov-season-10','g4ge-weather','seasons','Why can weather vary from one place to another?',['some areas are higher up','the sun only warms the coast','rain always falls in the south','the ocean blocks the wind'],'some areas are higher up',H);
  add('g4hg-cov-season-11','g4ge-weather','seasons','A season is…',['a time of year with its weather','a type of weather instrument','a kind of map symbol','a daily weather forecast'],'a time of year with its weather',H);

  // --- instruments ---
  const HI = 'Match the instrument with what it measures.';
  add('g4hg-cov-instrument-0','g4ge-weather','instruments','Which instrument measures temperature?',['a thermometer','a rain gauge','a wind vane','an anemometer'],'a thermometer',HI);
  add('g4hg-cov-instrument-1','g4ge-weather','instruments','Which instrument measures rainfall?',['a rain gauge','a thermometer','a wind vane','an anemometer'],'a rain gauge',HI);
  add('g4hg-cov-instrument-2','g4ge-weather','instruments','Which instrument shows wind direction?',['a wind vane','an anemometer','a rain gauge','a thermometer'],'a wind vane',HI);
  add('g4hg-cov-instrument-3','g4ge-weather','instruments','Which instrument measures wind speed?',['an anemometer','a wind vane','a thermometer','a rain gauge'],'an anemometer',HI);
  add('g4hg-cov-instrument-4','g4ge-weather','instruments','Which measurement is written in degrees Celsius?',['the temperature','the rainfall','the wind speed','the cloud cover'],'the temperature',HI);
  add('g4hg-cov-instrument-5','g4ge-weather','instruments','Which instrument is placed in the open to collect rain?',['a rain gauge','a thermometer','a wind vane','an anemometer'],'a rain gauge',HI);
  add('g4hg-cov-instrument-6','g4ge-weather','instruments','A wind vane points towards…',['where wind comes from','where wind is going to','the nearest body of water','the highest recorded temperature'],'where wind comes from',HI);

  // --- elements ---
  const HE = 'Use the meaning of each weather word.';
  add('g4hg-cov-element-0','g4ge-weather','elements','Rainfall is the amount of…',['rain that falls on a place','wind that blows over the sea','cloud that covers the sky','heat held in the air'],'rain that falls on a place',HE);
  add('g4hg-cov-element-1','g4ge-weather','elements','Temperature tells us how…',['hot or cold the air is','fast the wind is blowing','much rain has fallen today','cloudy the sky looks'],'hot or cold the air is',HE);
  add('g4hg-cov-element-2','g4ge-weather','elements','Wind is moving…',['air over the land','water in a river','cloud across the sky','rain through the clouds'],'air over the land',HE);
  add('g4hg-cov-element-3','g4ge-weather','elements','Cloud cover describes…',['how much sky has clouds','how fast the wind blows','how warm the air is','how much rain has fallen'],'how much sky has clouds',HE);
  add('g4hg-cov-element-4','g4ge-weather','elements','A weather forecast tells us what weather may…',['happen in the next days','have occurred last week','only occur in summer','stay the same for years'],'happen in the next days',HE);
  add('g4hg-cov-element-5','g4ge-weather','elements','Strong winds can make travelling by sea…',['rough and dangerous','calm and easy','fast and comfortable','warm and pleasant'],'rough and dangerous',HE);
  add('g4hg-cov-element-6','g4ge-weather','elements','Why do people check the weather forecast?',['to plan their day safely','to change the weather','to measure the rainfall','to find a map symbol'],'to plan their day safely',HE);
  add('g4hg-cov-element-7','g4ge-weather','elements','A sunny symbol on a forecast usually means…',['there is little or no rain','a cyclone is approaching','winds will be very strong','there will be heavy flooding'],'there is little or no rain',HE);
  add('g4hg-cov-element-8','g4ge-weather','elements','Heavy rainfall can cause…',['flooding of low land','very strong sunshine','high temperatures all day','a cool and dry period'],'flooding of low land',HE);
  add('g4hg-cov-element-9','g4ge-weather','elements','A drought happens when there is…',['very little rain for weeks','too much cloud in the sky','very strong wind every day','an unusually hot single day'],'very little rain for weeks',HE);
  add('g4hg-cov-element-10','g4ge-weather','elements','Weather affects farmers because plants need…',['suitable rain and sunshine','cold winters only','windy weather all year','very dry soil at all times'],'suitable rain and sunshine',HE);
  add('g4hg-cov-element-11','g4ge-weather','elements','A cyclone warning helps people…',['prepare and stay safe','enjoy the strong winds','travel to higher ground immediately','go outside to look at the sky'],'prepare and stay safe',HE);
  add('g4hg-cov-element-12','g4ge-weather','elements','Which element describes how fast air moves?',['the speed of the wind','the amount of rainfall','the level of cloud cover','the air temperature'],'the speed of the wind',HE);
  add('g4hg-cov-element-13','g4ge-weather','elements','Which element might make you put on a coat?',['a very low temperature','a very heavy rainfall','a very cloudy sky','a very strong wind'],'a very low temperature',HE);

  // --- cyclones ---
  const HC = 'Choose the action that keeps people safe.';
  add('g4hg-cov-cyclone-0','g4ge-weather','cyclones','What should a family do when an official cyclone warning is given?',['follow official safety advice','go to the beach to watch','ignore it and carry on','wait until the storm arrives'],'follow official safety advice',HC);
  add('g4hg-cov-cyclone-1','g4ge-weather','cyclones','Why should people stay indoors during dangerous winds?',['to avoid being injured','to keep the house cool','to save electricity','to check on garden plants'],'to avoid being injured',HC);
  add('g4hg-cov-cyclone-2','g4ge-weather','cyclones','What should be stored before a cyclone arrives?',['safe drinking water','a map and compass','a weather thermometer','extra clothing only'],'safe drinking water',HC);
  add('g4hg-cov-cyclone-3','g4ge-weather','cyclones','Why should loose objects be secured before a cyclone?',['wind can blow them away','rain can rust them quickly','they might block the doorway','animals may take them inside'],'wind can blow them away',HC);
  add('g4hg-cov-cyclone-4','g4ge-weather','cyclones','Which source gives the most trustworthy cyclone advice?',['the official weather service','a neighbour\'s opinion','a social media post','a guess from a friend'],'the official weather service',HC);
  add('g4hg-cov-cyclone-5','g4ge-weather','cyclones','Why should people avoid walking through flooded water?',['it can be dangerous','it is always very cold','it smells unpleasant','it moves very slowly'],'it can be dangerous',HC);
  add('g4hg-cov-cyclone-6','g4ge-weather','cyclones','A cyclone can bring…',['strong winds and heavy rain','clear skies and bright sunshine','cold dry air and light frost','warm breezes and light cloud'],'strong winds and heavy rain',HC);
  add('g4hg-cov-cyclone-7','g4ge-weather','cyclones','What should you use safely if electricity goes off during a cyclone?',['use a torch safely','light many candles indoors','go outside to find daylight','open all windows wide'],'use a torch safely',HC);
  add('g4hg-cov-cyclone-8','g4ge-weather','cyclones','Why should a family make an emergency plan before a cyclone?',['so everyone knows what to do','to track the cyclone\'s exact path','to contact the weather service','to store enough food only'],'so everyone knows what to do',HC);
  add('g4hg-cov-cyclone-9','g4ge-weather','cyclones','What should you NOT do during a cyclone?',['go outside to look','stay inside and rest','drink stored water','listen to the radio'],'go outside to look',HC);
  add('g4hg-cov-cyclone-10','g4ge-weather','cyclones','After a cyclone, why should you check for damaged wires?',['they can be dangerous','they need to be washed','they may block the footpath','they fall only into the sea'],'they can be dangerous',HC);
  add('g4hg-cov-cyclone-11','g4ge-weather','cyclones','Who should children stay with during a cyclone emergency?',['a trusted adult at all times','a group of other children','alone in their bedroom','their school teacher only'],'a trusted adult at all times',HC);
  add('g4hg-cov-cyclone-12','g4ge-weather','cyclones','Why should roads be avoided when officials give the warning?',['there may be hazards','traffic is always very heavy','the road is being repaired','it is the law in every case'],'there may be hazards',HC);
  add('g4hg-cov-cyclone-13','g4ge-weather','cyclones','What can heavy rain do to low-lying land?',['cause flooding of the land','bring cooler temperatures only','improve crop growth quickly','clear blocked drains quickly'],'cause flooding of the land',HC);
  add('g4hg-cov-cyclone-14','g4ge-weather','cyclones','A cyclone warning is meant to help people…',['act early and safely','watch the storm as it arrives','ignore the bad weather','stay calm and do nothing'],'act early and safely',HC);
  add('g4hg-cov-cyclone-15','g4ge-weather','cyclones','What is a good item to have in an emergency supply?',['a first-aid kit and a torch','a compass and a map','a thermometer and a wind vane','an umbrella and a calendar'],'a first-aid kit and a torch',HC);

  // --- directions ---
  const HD = 'Use the compass directions: north, south, east and west.';
  add('g4hg-cov-direction-0','g4ge-map-skills','directions','Which direction is opposite north?',['south','east','west','north-east'],'south',HD);
  add('g4hg-cov-direction-1','g4ge-map-skills','directions','Which direction is opposite east?',['west','north','south','north-west'],'west',HD);
  add('g4hg-cov-direction-2','g4ge-map-skills','directions','On most maps, the top of the map points to…',['north','south','east','west'],'north',HD);
  add('g4hg-cov-direction-3','g4ge-map-skills','directions','If the school is east of the park, then the park is…',['west of the school','north of the school','south of the school','east of the school'],'west of the school',HD);
  add('g4hg-cov-direction-4','g4ge-map-skills','directions','The sun rises in the…',['east','west','north','south'],'east',HD);
  add('g4hg-cov-direction-5','g4ge-map-skills','directions','The sun sets in the…',['west','east','north','south'],'west',HD);
  add('g4hg-cov-direction-6','g4ge-map-skills','directions','A compass rose on a map shows…',['directions','distances','symbols','the map scale'],'directions',HD);
  add('g4hg-cov-direction-7','g4ge-map-skills','directions','If you walk north and then turn right, you face…',['east','west','south','north'],'east',HD);

  // --- symbols ---
  const HS = 'Look at what each symbol represents.';
  add('g4hg-cov-symbol-0','g4ge-map-skills','symbols','Why does a map use symbols instead of pictures?',['to show features simply','to make the map colourful','to replace the map title','to measure distances'],'to show features simply',HS);
  add('g4hg-cov-symbol-1','g4ge-map-skills','symbols','Where do you find the meaning of map symbols?',['in the key or legend','in the map title','on the north arrow','next to the scale bar'],'in the key or legend',HS);
  add('g4hg-cov-symbol-2','g4ge-map-skills','symbols','A blue line on a map often shows…',['a river or stream','a main road','a railway line','a forest boundary'],'a river or stream',HS);
  add('g4hg-cov-symbol-3','g4ge-map-skills','symbols','A small plane symbol on a map may show…',['an airport or airfield','a hospital or clinic','a capital city','a park or forest'],'an airport or airfield',HS);
  add('g4hg-cov-symbol-4','g4ge-map-skills','symbols','A cross symbol on a map may show…',['a hospital or clinic','an airport or airfield','a school or library','a market or shop'],'a hospital or clinic',HS);
  add('g4hg-cov-symbol-5','g4ge-map-skills','symbols','A star symbol on a map can be used to show…',['a capital or important place','a river or stream','a forest or park','a road or footpath'],'a capital or important place',HS);
  add('g4hg-cov-symbol-6','g4ge-map-skills','symbols','Why must you always check the map key?',['symbols can differ on maps','the scale is hidden in the key','colours never carry meaning','the title is found inside the key'],'symbols can differ on maps',HS);
  add('g4hg-cov-symbol-7','g4ge-map-skills','symbols','A road is often shown on a map by…',['a line on the map','a blue wavy symbol','a green shaded area','a small plane picture'],'a line on the map',HS);
  add('g4hg-cov-symbol-8','g4ge-map-skills','symbols','A map symbol for a school helps you…',['find the school quickly','measure the distance to school','read the name of the school','draw the school building'],'find the school quickly',HS);
  add('g4hg-cov-symbol-9','g4ge-map-skills','symbols','Which is a good example of a map key entry?',['river - blue line','road - green square','school - red circle','forest - black dot'],'river - blue line',HS);
  add('g4hg-cov-symbol-10','g4ge-map-skills','symbols','What should a good map symbol be?',['clear and easy to recognise','large enough to fill the map','the same on every map','written in words only'],'clear and easy to recognise',HS);
  add('g4hg-cov-symbol-11','g4ge-map-skills','symbols','A green shaded area on a map may show…',['a forest or a park','a river or a lake','a road or a path','a town or a village'],'a forest or a park',HS);
  add('g4hg-cov-symbol-12','g4ge-map-skills','symbols','A map key is also called a…',['a legend on the map','a north arrow','a scale bar','a map title'],'a legend on the map',HS);
  add('g4hg-cov-symbol-13','g4ge-map-skills','symbols','Which symbol would best suit a beach on a map?',['a small wave symbol','a small plane symbol','a green tree symbol','a cross symbol'],'a small wave symbol',HS);
  add('g4hg-cov-symbol-14','g4ge-map-skills','symbols','Why are symbols especially useful on small maps?',['there is little room on them','they make the map more colourful','they replace the scale bar','they always show distances'],'there is little room on them',HS);

  // --- parts of a map ---
  const HP = 'Think about what each map part helps a reader do.';
  add('g4hg-cov-part-0','g4ge-map-skills','parts_of_map','What tells you what a map is about?',['the map title','the north arrow','the map scale','the key or legend'],'the map title',HP);
  add('g4hg-cov-part-1','g4ge-map-skills','parts_of_map','What part of a map explains its symbols?',['the key or legend','the map title','the north arrow','the map scale'],'the key or legend',HP);
  add('g4hg-cov-part-2','g4ge-map-skills','parts_of_map','What shows which way is north on a map?',['the north arrow','the map title','the map scale','the key or legend'],'the north arrow',HP);
  add('g4hg-cov-part-3','g4ge-map-skills','parts_of_map','What helps you compare map distance with real distance?',['the map scale','the north arrow','the key or legend','the map title'],'the map scale',HP);
  add('g4hg-cov-part-4','g4ge-map-skills','parts_of_map','Why is a map title important?',['it tells the map subject','it shows the direction','it lists the symbols','it measures distances'],'it tells the map subject',HP);
  add('g4hg-cov-part-5','g4ge-map-skills','parts_of_map','Why is a north arrow important on a map?',['it shows the direction','it lists the symbols','it measures distances','it names the map subject'],'it shows the direction',HP);
  add('g4hg-cov-part-6','g4ge-map-skills','parts_of_map','A scale helps you work out…',['the real distance','what the symbols mean','which way is north','what the map is about'],'the real distance',HP);
  add('g4hg-cov-part-7','g4ge-map-skills','parts_of_map','Which map part would say "Map of Mauritius"?',['the map title','the key or legend','the north arrow','the map scale'],'the map title',HP);
  add('g4hg-cov-part-8','g4ge-map-skills','parts_of_map','Which map part might show "1 cm = 1 km"?',['the map scale','the map title','the north arrow','the key or legend'],'the map scale',HP);
  add('g4hg-cov-part-9','g4ge-map-skills','parts_of_map','Which map part should every map include?',['a clear title','a detailed key','a distance scale','a direction guide'],'a clear title',HP);
  add('g4hg-cov-part-10','g4ge-map-skills','parts_of_map','What does a map legend explain?',['the map symbols','the north direction','the real distance','the map subject'],'the map symbols',HP);
  add('g4hg-cov-part-11','g4ge-map-skills','parts_of_map','A north arrow is a type of…',['direction guide','symbol list','distance measure','map title'],'direction guide',HP);
  add('g4hg-cov-part-12','g4ge-map-skills','parts_of_map','Why do you use a map scale?',['to work out distance','to find north on the map','to read the map symbols','to understand the map title'],'to work out distance',HP);
  add('g4hg-cov-part-13','g4ge-map-skills','parts_of_map','A map without a key can be…',['hard to understand','very easy to read','larger than normal','missing a north arrow'],'hard to understand',HP);
  add('g4hg-cov-part-14','g4ge-map-skills','parts_of_map','What should a clear map title be?',['short and accurate','long and detailed','written in symbols','placed at the bottom'],'short and accurate',HP);
  add('g4hg-cov-part-15','g4ge-map-skills','parts_of_map','The compass on a map helps a reader…',['orient the map north','measure the distance','read the symbols','understand the title'],'orient the map north',HP);

  // --- using a map ---
  const HU = 'Use the title, key, directions and scale together.';
  add('g4hg-cov-usemap-0','g4ge-map-skills','using_map','Before using a map, what should you read first?',['the title and key','the north arrow only','the scale bar only','the symbols at the edge'],'the title and key',HU);
  add('g4hg-cov-usemap-1','g4ge-map-skills','using_map','If a shop is north of the school, which direction do you travel from school?',['towards the north','towards the south','towards the east','towards the west'],'towards the north',HU);
  add('g4hg-cov-usemap-2','g4ge-map-skills','using_map','To find a feature on a map, first look for its…',['symbol in the key','name in the title','colour on the north arrow','number on the scale'],'symbol in the key',HU);
  add('g4hg-cov-usemap-3','g4ge-map-skills','using_map','Why draw a simple map of your route?',['to help others follow it','to measure the exact distance','to replace the map title','to add symbols to the key'],'to help others follow it',HU);
  add('g4hg-cov-usemap-4','g4ge-map-skills','using_map','A map can help a visitor to…',['find places easily','change the weather forecast','read the season names','measure air temperature'],'find places easily',HU);
  add('g4hg-cov-usemap-5','g4ge-map-skills','using_map','If the scale says 1 cm = 1 km, what does 3 cm on the map represent?',['3 km on the ground','1 km on the ground','6 km on the ground','30 km on the ground'],'3 km on the ground',HU);
  add('g4hg-cov-usemap-6','g4ge-map-skills','using_map','What should be labelled on a simple map you draw?',['important places','the weather forecast','the temperature reading','the cyclone warning level'],'important places',HU);
  add('g4hg-cov-usemap-7','g4ge-map-skills','using_map','How can you show a route on a map?',['draw a line with arrows','write the distance in words','shade the whole area green','put a cross at each turning'],'draw a line with arrows',HU);
  add('g4hg-cov-usemap-8','g4ge-map-skills','using_map','Why should a map be kept neat?',['so people can read it','so it looks colourful','so it shows the weather','so it fits on one page'],'so people can read it',HU);
  add('g4hg-cov-usemap-9','g4ge-map-skills','using_map','What can a map of a neighbourhood show?',['where places are','what the weather will be','who lives in each house','how high the temperature is'],'where places are',HU);
})();
