'use strict';
(function () {
  const add = (id, chapterId, subsection, question, options, answer, hint, explanation) => STATIC_QUESTIONS.push(makeMCQ({ id, chapterId, subsection, difficulty: 2, question, options, answer, hint, explanation }));
  const rows = (prefix, chapterId, subsection, data, options, hint) => data.forEach(([question, answer], i) => add(`g4hg-cov-${prefix}-${i}`, chapterId, subsection, question, options, answer, hint, `<b>${answer}</b> is correct.`));

  rows('reasons', 'g4hist-voyages', 'reasons', [
    ['Why did traders travel across the Indian Ocean long ago?', 'to trade goods'], ['Spices were valuable because people used them for…', 'flavouring and preserving food'],
    ['Traders travelled to India and the East Indies mainly to find…', 'valuable goods'], ['What is trade?', 'buying and selling goods'],
    ['A merchant is a person who…', 'buys and sells goods'], ['Why were sea routes important to traders?', 'they connected distant places'],
    ['Which item could be traded long ago?', 'spices'], ['Traders travelled when winds were helpful because…', 'sailing was easier'],
    ['A port is useful because ships can…', 'load and unload goods'], ['Why did traders visit different countries?', 'to exchange goods'],
    ['What might a trader bring back from a voyage?', 'goods from another place'], ['The Indian Ocean linked Africa, Asia and…', 'islands such as Mauritius'],
    ['What did sailors need to know before a long voyage?', 'where they were going'], ['Why did ships carry maps?', 'to help find routes'],
    ['A trade route is…', 'a path used to move goods'], ['Which is not a reason for trade?', 'to keep every good in one place'],
    ['Why were islands useful stopping places for ships?', 'sailors could rest and get supplies'], ['Trading can help different places get…', 'things they do not produce themselves']
  ], ['to trade goods', 'flavouring and preserving food', 'valuable goods', 'buying and selling goods', 'buys and sells goods', 'they connected distant places', 'spices', 'sailing was easier', 'load and unload goods', 'to exchange goods', 'goods from another place', 'islands such as Mauritius', 'where they were going', 'to help find routes', 'a path used to move goods', 'to keep every good in one place', 'sailors could rest and get supplies', 'things they do not produce themselves'], 'Think about goods, routes and journeys.',);

  rows('ships', 'g4hist-voyages', 'ships', [
    ['What helped sailors know which way to travel?', 'a compass'], ['What pushed traditional sailing ships?', 'wind'],
    ['A sail is used to…', 'catch the wind'], ['A captain is the person who…', 'leads a ship'],
    ['Why did ships need a strong hull?', 'to travel safely on water'], ['What is navigation?', 'finding the way when travelling'],
    ['Stars could help sailors at night to…', 'find direction'], ['A harbour is a place where ships can…', 'shelter safely'],
    ['What should sailors take on a long trip?', 'fresh water and food'], ['A map used at sea is called a…', 'chart'],
    ['Why did sailors watch the weather?', 'storms could be dangerous'], ['A crew is…', 'the people who work on a ship'],
    ['What can a compass show?', 'directions'], ['A ship\'s anchor helps it…', 'stay in one place'],
    ['Why did sailors repair sails?', 'damaged sails cannot catch wind well'], ['Which is safest in rough weather?', 'listen to the captain and secure the ship']
  ], ['a compass', 'wind', 'catch the wind', 'leads a ship', 'to travel safely on water', 'finding the way when travelling', 'find direction', 'shelter safely', 'fresh water and food', 'chart', 'storms could be dangerous', 'the people who work on a ship', 'directions', 'stay in one place', 'damaged sails cannot catch wind well', 'listen to the captain and secure the ship'], 'Think about what a ship and its crew need at sea.');

  rows('relief', 'g4ge-natural-env', 'relief', [
    ['What is the name for the shape and height of land?', 'relief'], ['A high area with a fairly flat top is a…', 'plateau'],
    ['The central plateau is found in…', 'Mauritius'], ['Which is a mountain peak in Mauritius?', 'Pieter Both'],
    ['Piton de la Petite Rivière Noire is known as…', 'the highest peak in Mauritius'], ['Coastal plains are found…', 'near the coast']
  ], ['relief', 'plateau', 'Mauritius', 'Pieter Both', 'the highest peak in Mauritius', 'near the coast'], 'Think about mountains, flat land and where they are found.');

  rows('water', 'g4ge-natural-env', 'water', [
    ['A river is water that…', 'flows across land'], ['Which river is in Mauritius?', 'Grand River South East'],
    ['Where does a river often flow into?', 'the sea'], ['A lake is a body of water…', 'surrounded by land'],
    ['Why are rivers important?', 'they provide water for people and nature'], ['What should we not throw into a river?', 'rubbish'],
    ['A river mouth is where a river…', 'meets the sea'], ['What can heavy rain cause in a river?', 'flooding'],
    ['Which action helps protect rivers?', 'keeping rubbish out of them'], ['A waterfall is formed where river water…', 'falls over a steep edge'],
    ['Why do plants near rivers need protection?', 'they help support habitats'], ['Rivière Noire is also called…', 'Black River'],
    ['Water from rivers can be used carefully for…', 'farming'], ['What can happen if a river is polluted?', 'animals and people can be harmed'],
    ['A stream is usually…', 'smaller than a river'], ['Which water feature is natural?', 'a river']
  ], ['flows across land', 'Grand River South East', 'the sea', 'surrounded by land', 'they provide water for people and nature', 'rubbish', 'meets the sea', 'flooding', 'keeping rubbish out of them', 'falls over a steep edge', 'they help support habitats', 'Black River', 'farming', 'animals and people can be harmed', 'smaller than a river', 'a river'], 'Use what you know about flowing water and caring for nature.');

  rows('coast', 'g4ge-natural-env', 'coast', [
    ['The coast is where land meets…', 'the sea'], ['A lagoon is usually…', 'shallow water between land and a reef'],
    ['A coral reef helps protect the coast from…', 'strong waves'], ['Why are beaches important?', 'they are habitats and places for people to enjoy'],
    ['What should visitors do at the beach?', 'take their rubbish home'], ['Coral is important because it gives many sea animals…', 'a home'],
    ['What can damage a coral reef?', 'pollution'], ['A lagoon in Mauritius is often found…', 'inside the coral reef'],
    ['Which activity protects the coast?', 'not stepping on coral'], ['Why should we keep beaches clean?', 'to protect wildlife and people'],
    ['The sea water outside a reef can be…', 'deeper and rougher']
  ], ['the sea', 'shallow water between land and a reef', 'strong waves', 'they are habitats and places for people to enjoy', 'take their rubbish home', 'a home', 'pollution', 'inside the coral reef', 'not stepping on coral', 'to protect wildlife and people', 'deeper and rougher'], 'Think about the coastline, lagoon and reef.');

  rows('natural', 'g4ge-natural-env', 'natural_manmade', [
    ['Which natural feature can be climbed?', 'a mountain'], ['Which man-made feature carries traffic?', 'a road'],
    ['Which natural feature carries flowing water?', 'a river'], ['Which man-made feature crosses an obstacle?', 'a bridge'],
    ['Which natural feature is made of sand by the sea?', 'a beach'], ['Which man-made feature is built for learning?', 'a school'],
    ['Which natural feature contains many trees?', 'a forest'], ['Which man-made feature can store water?', 'a dam'],
    ['Which natural feature has falling water?', 'a waterfall'], ['Which man-made feature helps protect a harbour?', 'a harbour wall'],
    ['Which natural feature is formed by tiny sea animals?', 'a coral reef'], ['Which man-made feature is built for a family to live in?', 'a house'],
    ['Natural features are made by…', 'nature'], ['Man-made features are built by…', 'people'],
    ['Why might people build a bridge?', 'to cross a river or road'], ['Why should we protect natural features?', 'they support living things']
  ], ['a mountain', 'a road', 'a river', 'a bridge', 'a beach', 'a school', 'a forest', 'a dam', 'a waterfall', 'a harbour wall', 'a coral reef', 'a house', 'nature', 'people', 'to cross a river or road', 'they support living things'], 'Ask whether people built it or nature formed it.');
})();
