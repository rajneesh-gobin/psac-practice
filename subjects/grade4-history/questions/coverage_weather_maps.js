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
  const rows = (p,c,s,data,options,hint) => data.forEach(([q,a],i)=>add(`g4hg-cov-${p}-${i}`,c,s,q,options,a,hint));
  rows('season','g4ge-weather','seasons',[
    ['Which months are usually summer in Mauritius?','usually November to April'],['Which months are usually winter in Mauritius?','usually May to October'],
    ['Mauritian summer is usually…','usually hot and rainy'],['Mauritian winter is usually…','cooler and much drier'],['During which season are cyclones more likely?','the warm summer season'],
    ['What should you take when rain is forecast?','an umbrella or raincoat'],['Why do farmers watch the seasons?','the weather affects crops'],['Which season comes after April?','the cooler winter season'],
    ['A hot, humid day is more common in…','the warm summer season'],['A cooler, dry day is more common in…','the cooler winter season'],['Why can weather vary from one place to another?','some areas are higher up'],['A season is…','a time of year with its weather']
  ],['usually November to April','usually May to October','usually hot and rainy','cooler and much drier','the warm summer season','an umbrella or raincoat','the weather affects crops','the cooler winter season','some areas are higher up','a time of year with its weather'],'Think about Mauritius\'s two main seasons.');
  rows('instrument','g4ge-weather','instruments',[
    ['Which instrument measures temperature?','a thermometer'],['Which instrument measures rainfall?','a rain gauge'],['Which instrument shows wind direction?','a wind vane'],
    ['Which instrument measures wind speed?','an anemometer'],['Which measurement is written in degrees Celsius?','the temperature'],['Which instrument might be outside in the rain?','a rain gauge'],
    ['A wind vane points towards…','where wind comes from']
  ],['a thermometer','a rain gauge','a wind vane','an anemometer','the temperature','where wind comes from'],'Match the instrument with what it measures.');
  rows('element','g4ge-weather','elements',[
    ['Rainfall is the amount of…','rain that falls on a place'],['Temperature tells us how…','hot or cold the air is'],['Wind is moving…','air over the land'],
    ['Cloud cover describes…','how much sky has clouds'],['A weather forecast tells us what weather may…','happen in the next days'],['Strong winds can make travelling by sea…','rough and dangerous'],
    ['Why do people check the forecast?','to plan their day safely'],['A sunny symbol on a forecast usually means…','there is little or no rain'],['Heavy rainfall can cause…','flooding of low land'],
    ['A drought happens when there is…','very little rain for weeks'],['Weather affects farmers because plants need…','suitable rain and sunshine'],['A cyclone warning helps people…','prepare and stay safe'],
    ['Which element describes how fast air moves?','the speed of the wind'],['Which element might make you wear a coat?','a very low temperature']
  ],['rain that falls on a place','hot or cold the air is','air over the land','how much sky has clouds','happen in the next days','rough and dangerous','to plan their day safely','there is little or no rain','flooding of low land','very little rain for weeks','suitable rain and sunshine','prepare and stay safe','the speed of the wind','a very low temperature'],'Use the meaning of each weather word.');
  rows('cyclone','g4ge-weather','cyclones',[
    ['What should a family do when an official cyclone warning is given?','follow official safety advice'],['Why should people stay indoors during dangerous winds?','to avoid being injured'],
    ['What should be stored before a cyclone?','safe drinking water'],['Why should loose objects be secured?','wind can blow them away'],['Which source gives trustworthy cyclone advice?','the official weather service'],
    ['Why should people avoid flooded water?','it can be dangerous'],['A cyclone can bring…','strong winds and heavy rain'],['What should you do if electricity goes off?','use a torch safely'],
    ['Why should a family make an emergency plan?','so everyone knows what to do'],['What should you not do during a cyclone?','go outside to look'],
    ['After a cyclone, why check for damaged wires?','they can be dangerous'],['Who should children stay with during an emergency?','a trusted adult at all times'],
    ['Why should roads be avoided if officials say so?','there may be hazards'],['What can heavy rain do to low-lying land?','cause flooding of the land'],
    ['A warning is meant to help people…','act early and safely'],['What is a good emergency supply?','a first-aid kit and a torch']
  ],['follow official safety advice','to avoid being injured','safe drinking water','wind can blow them away','the official weather service','it can be dangerous','strong winds and heavy rain','use a torch safely','so everyone knows what to do','go outside to look','they can be dangerous','a trusted adult at all times','there may be hazards','cause flooding of the land','act early and safely','a first-aid kit and a torch'],'Choose the action that keeps people safe.');
  rows('direction','g4ge-map-skills','directions',[
    ['Which direction is opposite north?','south'],['Which direction is opposite east?','west'],['On most maps, the top points to…','north'],['If the school is east of the park, the park is…','west of the school'],
    ['The sun rises in the…','east'],['The sun sets in the…','west'],['A compass rose shows…','directions'],['If you walk north then turn right, you face…','east']
  ],['south','west','north','west of the school','east','directions'],'Use the compass directions: north, south, east and west.');
  rows('symbol','g4ge-map-skills','symbols',[
    ['Why does a map use symbols?','to show features simply'],['Where do you find the meaning of map symbols?','in the key or legend'],['A blue line on a map often shows…','a river or stream'],
    ['A small plane symbol may show…','an airport or airfield'],['A cross symbol may show…','a hospital or clinic'],['A star can be used to show…','a capital or important place'],
    ['Why must you check the map key?','symbols can differ on maps'],['A road is often shown by…','a line on the map'],['A map symbol for a school helps you…','find the school quickly'],
    ['Which is a good map key label?','river - blue line'],['What should a symbol be?','clear and easy to recognise'],['A green area may show…','a forest or a park'],
    ['A map key is also called a…','a legend on the map'],['Which symbol would best suit a beach?','a small wave symbol'],['Why are symbols useful on small maps?','there is little room on them']
  ],['to show features simply','in the key or legend','a river or stream','an airport or airfield','a hospital or clinic','a capital or important place','symbols can differ on maps','a line on the map','find the school quickly','river - blue line','clear and easy to recognise','a forest or a park','a legend on the map','a small wave symbol','there is little room on them'],'Look at what each symbol represents.');
  rows('part','g4ge-map-skills','parts_of_map',[
    ['What tells you what a map is about?','the map title'],['What explains symbols on a map?','the key or legend'],['What shows north on a map?','the north arrow'],
    ['What helps compare map distance with real distance?','the map scale'],['Why is a title important?','it tells the map subject'],['Why is a north arrow important?','it shows the direction'],
    ['A scale helps you estimate…','the real distance'],['Which part would say "Map of Mauritius"?','the map title'],['Which part might show "1 cm = 1 km"?','the map scale'],
    ['Which map part should every map have?','a clear title'],['What does a legend explain?','the map symbols'],['A north arrow is a type of…','direction guide'],
    ['Why use a scale?','to work out distance'],['A map without a key can be…','hard to understand'],['What should a clear title be?','short and accurate'],
    ['The compass on a map helps a reader…','orient the map north']
  ],['the map title','the key or legend','the north arrow','the map scale','it tells the map subject','it shows the direction','the real distance','a clear title','the map symbols','direction guide','to work out distance','hard to understand','short and accurate','orient the map north'],'Think about what each map part helps a reader do.');
  rows('usemap','g4ge-map-skills','using_map',[
    ['Before using a map, what should you read first?','the title and key'],['If a shop is north of the school, which direction do you travel from school?','towards the north'],
    ['To find a feature, look for its…','symbol in the key'],['Why draw a simple map of your route?','to help others follow it'],['A map can help a visitor…','find places easily'],
    ['If the scale says 1 cm = 1 km, 3 cm represents…','3 km on the ground'],['What should be labelled on a simple map?','important places'],['How can you show a route on a map?','draw a line with arrows'],
    ['Why should a map be neat?','so people can read it'],['What can a map show about a neighbourhood?','where places are']
  ],['the title and key','towards the north','symbol in the key','to help others follow it','find places easily','3 km on the ground','important places','draw a line with arrows','so people can read it','where places are'],'Use the title, key, directions and scale together.');
})();
