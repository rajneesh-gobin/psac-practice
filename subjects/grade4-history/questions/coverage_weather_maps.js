'use strict';
(function () {
  const add = (id, c, s, question, options, answer, hint) => STATIC_QUESTIONS.push(makeMCQ({ id, chapterId:c, subsection:s, difficulty:2, question, options, answer, hint, explanation:`<b>${answer}</b> is correct.` }));
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
