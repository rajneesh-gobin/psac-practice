'use strict';
(function () {
  const add = (id, c, s, question, options, answer, hint) => STATIC_QUESTIONS.push(makeMCQ({ id, chapterId:c, subsection:s, difficulty:2, question, options, answer, hint, explanation:`<b>${answer}</b> is correct.` }));
  const rows = (p,c,s,data,options,hint) => data.forEach(([q,a],i)=>add(`g4hg-cov-${p}-${i}`,c,s,q,options,a,hint));
  rows('season','g4ge-weather','seasons',[
    ['Which months are usually summer in Mauritius?','November to April'],['Which months are usually winter in Mauritius?','May to October'],
    ['Mauritian summer is usually…','hot and rainy'],['Mauritian winter is usually…','cooler and drier'],['During which season are cyclones more likely?','summer'],
    ['What should you take when rain is forecast?','an umbrella or raincoat'],['Why do farmers watch the seasons?','weather affects crops'],['Which season comes after April?','winter'],
    ['A hot, humid day is more common in…','summer'],['A cooler, dry day is more common in…','winter'],['Why can weather vary from one place to another?','some areas are higher or nearer the coast'],['A season is…','a time of year with usual weather patterns']
  ],['November to April','May to October','hot and rainy','cooler and drier','summer','an umbrella or raincoat','weather affects crops','winter','some areas are higher or nearer the coast','a time of year with usual weather patterns'],'Think about Mauritius\'s two main seasons.');
  rows('instrument','g4ge-weather','instruments',[
    ['Which instrument measures temperature?','thermometer'],['Which instrument measures rainfall?','rain gauge'],['Which instrument shows wind direction?','wind vane'],
    ['Which instrument measures wind speed?','anemometer'],['Which measurement is written in degrees Celsius?','temperature'],['Which instrument might be outside in the rain?','rain gauge'],
    ['A wind vane points towards…','the direction the wind comes from']
  ],['thermometer','rain gauge','wind vane','anemometer','temperature','the direction the wind comes from'],'Match the instrument with what it measures.');
  rows('element','g4ge-weather','elements',[
    ['Rainfall is the amount of…','rain that falls'],['Temperature tells us how…','hot or cold it is'],['Wind is moving…','air'],
    ['Cloud cover describes…','how much of the sky has clouds'],['A weather forecast tells us what weather may…','happen soon'],['Strong winds can make travelling by sea…','dangerous'],
    ['Why do people check the forecast?','to plan safely'],['A sunny symbol on a forecast usually means…','little or no rain'],['Heavy rainfall can cause…','flooding'],
    ['A drought happens when there is…','very little rain'],['Weather affects farmers because plants need…','suitable rain and sunshine'],['A cyclone warning helps people…','prepare and stay safe'],
    ['Which element describes how fast air moves?','wind speed'],['Which element might make you wear a coat?','low temperature']
  ],['rain that falls','hot or cold it is','air','how much of the sky has clouds','happen soon','dangerous','to plan safely','little or no rain','flooding','very little rain','suitable rain and sunshine','prepare and stay safe','wind speed','low temperature'],'Use the meaning of each weather word.');
  rows('cyclone','g4ge-weather','cyclones',[
    ['What should a family do when an official cyclone warning is given?','follow official safety advice'],['Why should people stay indoors during dangerous winds?','to avoid injury'],
    ['What should be stored before a cyclone?','safe drinking water'],['Why should loose objects be secured?','wind can blow them away'],['Which source gives trustworthy cyclone advice?','official weather and emergency services'],
    ['Why should people avoid flooded water?','it can be dangerous'],['A cyclone can bring…','strong winds and heavy rain'],['What should you do if electricity goes off?','use a torch safely'],
    ['Why should a family make an emergency plan?','so everyone knows what to do'],['What should you not do during a cyclone?','go outside to look'],
    ['After a cyclone, why check for damaged wires?','they can be dangerous'],['Who should children stay with during an emergency?','a trusted adult'],
    ['Why should roads be avoided if officials say so?','there may be hazards'],['What can heavy rain do to low-lying land?','cause flooding'],
    ['A warning is meant to help people…','act early and safely'],['What is a good emergency supply?','a first-aid kit']
  ],['follow official safety advice','to avoid injury','safe drinking water','wind can blow them away','official weather and emergency services','it can be dangerous','strong winds and heavy rain','use a torch safely','so everyone knows what to do','go outside to look','they can be dangerous','a trusted adult','there may be hazards','cause flooding','act early and safely','a first-aid kit'],'Choose the action that keeps people safe.');
  rows('direction','g4ge-map-skills','directions',[
    ['Which direction is opposite north?','south'],['Which direction is opposite east?','west'],['On most maps, the top points to…','north'],['If the school is east of the park, the park is…','west of the school'],
    ['The sun rises in the…','east'],['The sun sets in the…','west'],['A compass rose shows…','directions'],['If you walk north then turn right, you face…','east']
  ],['south','west','north','west of the school','east','directions'],'Use the compass directions: north, south, east and west.');
  rows('symbol','g4ge-map-skills','symbols',[
    ['Why does a map use symbols?','to show features simply'],['Where do you find the meaning of map symbols?','in the key or legend'],['A blue line on a map often shows…','a river'],
    ['A small plane symbol may show…','an airport'],['A cross symbol may show…','a hospital'],['A star can be used to show…','a capital or important place'],
    ['Why must you check the map key?','symbols can have different meanings'],['A road is often shown by…','a line'],['A map symbol for a school helps you…','find the school quickly'],
    ['Which is a good map key label?','river — blue line'],['What should a symbol be?','clear and easy to recognise'],['A green area may show…','a forest or park'],
    ['A map key is also called a…','legend'],['Which symbol would best suit a beach?','a wave symbol'],['Why are symbols useful on small maps?','there is not room to draw everything']
  ],['to show features simply','in the key or legend','a river','an airport','a hospital','a capital or important place','symbols can have different meanings','a line','find the school quickly','river — blue line','clear and easy to recognise','a forest or park','legend','a wave symbol','there is not room to draw everything'],'Look at what each symbol represents.');
  rows('part','g4ge-map-skills','parts_of_map',[
    ['What tells you what a map is about?','the title'],['What explains symbols on a map?','the key or legend'],['What shows north on a map?','the north arrow'],
    ['What helps compare map distance with real distance?','the scale'],['Why is a title important?','it tells the map\'s subject'],['Why is a north arrow important?','it helps you know direction'],
    ['A scale helps you estimate…','real distance'],['Which part would say "Map of Mauritius"?','the title'],['Which part might show "1 cm = 1 km"?','the scale'],
    ['Which map part should every map have?','a title'],['What does a legend explain?','map symbols'],['A north arrow is a type of…','direction guide'],
    ['Why use a scale?','to work out distance'],['A map without a key can be…','hard to understand'],['What should a clear title be?','short and accurate'],
    ['The compass on a map helps a reader…','orient the map']
  ],['the title','the key or legend','the north arrow','the scale','it tells the map\'s subject','it helps you know direction','real distance','a title','map symbols','direction guide','to work out distance','hard to understand','short and accurate','orient the map'],'Think about what each map part helps a reader do.');
  rows('usemap','g4ge-map-skills','using_map',[
    ['Before using a map, what should you read first?','the title and key'],['If a shop is north of the school, which direction do you travel from school?','north'],
    ['To find a feature, look for its…','symbol in the key'],['Why draw a simple map of your route?','to help others follow it'],['A map can help a visitor…','find places'],
    ['If the scale says 1 cm = 1 km, 3 cm represents…','3 km'],['What should be labelled on a simple map?','important places'],['How can you show a route on a map?','draw a line with arrows'],
    ['Why should a map be neat?','so people can read it'],['What can a map show about a neighbourhood?','where places are']
  ],['the title and key','north','symbol in the key','to help others follow it','find places','3 km','important places','draw a line with arrows','so people can read it','where places are'],'Use the title, key, directions and scale together.');
})();
