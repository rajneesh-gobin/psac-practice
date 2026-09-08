'use strict';
(function () {
  const add = (id, chapterId, subsection, question, options, answer, hint, explanation) => STATIC_QUESTIONS.push(makeMCQ({ id, chapterId, subsection, difficulty: 2, question, options, answer, hint, explanation }));
  const rows = (prefix, chapterId, subsection, data, options, hint) => data.forEach(([question, answer], i) => add(`g4hg-cov-${prefix}-${i}`, chapterId, subsection, question, options, answer, hint, `<b>${answer}</b> is correct.`));

  rows('reasons', 'g4hist-voyages', 'reasons', [
    ['Why did traders travel across the Indian Ocean long ago?', 'to trade goods with others'], ['Spices were valuable because people used them for…', 'flavouring and preserving food'],
    ['Traders travelled to India and the East Indies mainly to find…', 'valuable goods to sell'], ['What is trade?', 'buying and selling goods'],
    ['A merchant is a person who…', 'buys and sells goods'], ['Why were sea routes important to traders?', 'they connected distant places'],
    ['Which item could be traded long ago?', 'spices such as pepper'], ['Traders travelled when winds were helpful because…', 'sailing was much easier'],
    ['A port is useful because ships can…', 'load and unload goods'], ['Why did traders visit different countries?', 'to exchange goods there'],
    ['What might a trader bring back from a voyage?', 'goods from another place'], ['The Indian Ocean linked Africa, Asia and…', 'islands such as Mauritius'],
    ['What did sailors need to know before a long voyage?', 'where they were going'], ['Why did ships carry maps?', 'to help them find routes'],
    ['A trade route is…', 'a path used to move goods'], ['Which is not a reason for trade?', 'to keep goods in one place'],
    ['Why were islands useful stopping places for ships?', 'sailors could rest and eat'], ['Trading can help different places get…', 'things they do not produce']
  ], ['to trade goods with others', 'flavouring and preserving food', 'valuable goods to sell', 'buying and selling goods', 'buys and sells goods', 'they connected distant places', 'spices such as pepper', 'sailing was much easier', 'load and unload goods', 'to exchange goods there', 'goods from another place', 'islands such as Mauritius', 'where they were going', 'to help them find routes', 'a path used to move goods', 'to keep goods in one place', 'sailors could rest and eat', 'things they do not produce'], 'Think about goods, routes and journeys.',);

  rows('ships', 'g4hist-voyages', 'ships', [
    ['What helped sailors know which way to travel?', 'a compass and the stars'], ['What pushed traditional sailing ships?', 'the power of the wind'],
    ['A sail is used to…', 'catch the wind for power'], ['A captain is the person who…', 'leads a ship and crew'],
    ['Why did ships need a strong hull?', 'to travel safely on water'], ['What is navigation?', 'finding the way at sea'],
    ['Stars could help sailors at night to…', 'find their direction'], ['A harbour is a place where ships can…', 'shelter safely from storms'],
    ['What should sailors take on a long trip?', 'fresh water and food'], ['A map used at sea is called a…', 'a chart or sea map'],
    ['Why did sailors watch the weather?', 'storms could be dangerous'], ['A crew is…', 'the people who work on a ship'],
    ['What can a compass show?', 'the four directions'], ['A ship\'s anchor helps it…', 'stay in one place'],
    ['Why did sailors repair sails?', 'damaged sails catch less wind'], ['Which is safest in rough weather?', 'listen to the captain']
  ], ['a compass and the stars', 'the power of the wind', 'catch the wind for power', 'leads a ship and crew', 'to travel safely on water', 'finding the way at sea', 'find their direction', 'shelter safely from storms', 'fresh water and food', 'a chart or sea map', 'storms could be dangerous', 'the people who work on a ship', 'the four directions', 'stay in one place', 'damaged sails catch less wind', 'listen to the captain'], 'Think about what a ship and its crew need at sea.');

  rows('relief', 'g4ge-natural-env', 'relief', [
    ['What is the name for the shape and height of land?', 'the relief of the land'], ['A high area with a fairly flat top is a…', 'a plateau of high land'],
    ['The central plateau is found in…', 'the centre of Mauritius'], ['Which is a mountain peak in Mauritius?', 'Pieter Both mountain'],
    ['Piton de la Petite Rivière Noire is known as…', 'the highest peak of all'], ['Coastal plains are found…', 'in low land near the coast']
  ], ['the relief of the land', 'a plateau of high land', 'the centre of Mauritius', 'Pieter Both mountain', 'the highest peak of all', 'in low land near the coast'], 'Think about mountains, flat land and where they are found.');

  rows('water', 'g4ge-natural-env', 'water', [
    ['A river is water that…', 'flows across land'], ['Which river is in Mauritius?', 'Grand River South East'],
    ['Where does a river often flow into?', 'into the sea or ocean'], ['A lake is a body of water…', 'surrounded by land'],
    ['Why are rivers important?', 'they give water to people'], ['What should we not throw into a river?', 'rubbish or plastic'],
    ['A river mouth is where a river…', 'meets the sea or ocean'], ['What can heavy rain cause in a river?', 'flooding along its banks'],
    ['Which action helps protect rivers?', 'keeping rubbish out of them'], ['A waterfall is formed where river water…', 'falls over a steep edge'],
    ['Why do plants near rivers need protection?', 'they help support habitats'], ['Rivière Noire is also called…', 'the Black River in the west'],
    ['Water from rivers can be used carefully for…', 'farming and watering crops'], ['What can happen if a river is polluted?', 'animals and people get sick'],
    ['A stream is usually…', 'smaller than a river'], ['Which water feature is natural?', 'a river or a stream']
  ], ['flows across land', 'Grand River South East', 'into the sea or ocean', 'surrounded by land', 'they give water to people', 'rubbish or plastic', 'meets the sea or ocean', 'flooding along its banks', 'keeping rubbish out of them', 'falls over a steep edge', 'they help support habitats', 'the Black River in the west', 'farming and watering crops', 'animals and people get sick', 'smaller than a river', 'a river or a stream'], 'Use what you know about flowing water and caring for nature.');

  rows('coast', 'g4ge-natural-env', 'coast', [
    ['The coast is where land meets…', 'the sea or the ocean'], ['A lagoon is usually…', 'shallow water inside a reef'],
    ['A coral reef helps protect the coast from…', 'the strong ocean waves'], ['Why are beaches important?', 'they are habitats for wildlife'],
    ['What should visitors do at the beach?', 'take their rubbish home'], ['Coral is important because it gives many sea animals…', 'a home and safe shelter'],
    ['What can damage a coral reef?', 'pollution and rubbish'], ['A lagoon in Mauritius is often found…', 'inside the coral reef'],
    ['Which activity protects the coast?', 'not stepping on coral'], ['Why should we keep beaches clean?', 'to protect wildlife and people'],
    ['The sea water outside a reef can be…', 'deeper and much rougher']
  ], ['the sea or the ocean', 'shallow water inside a reef', 'the strong ocean waves', 'they are habitats for wildlife', 'take their rubbish home', 'a home and safe shelter', 'pollution and rubbish', 'inside the coral reef', 'not stepping on coral', 'to protect wildlife and people', 'deeper and much rougher'], 'Think about the coastline, lagoon and reef.');

  rows('natural', 'g4ge-natural-env', 'natural_manmade', [
    ['Which natural feature can be climbed?', 'a high mountain'], ['Which man-made feature carries traffic?', 'a main road'],
    ['Which natural feature carries flowing water?', 'a long river'], ['Which man-made feature crosses an obstacle?', 'a stone bridge'],
    ['Which natural feature is made of sand by the sea?', 'a sandy beach'], ['Which man-made feature is built for learning?', 'a village school'],
    ['Which natural feature contains many trees?', 'a green forest'], ['Which man-made feature can store water?', 'a large dam'],
    ['Which natural feature has falling water?', 'a tall waterfall'], ['Which man-made feature helps protect a harbour?', 'a harbour wall'],
    ['Which natural feature is formed by tiny sea animals?', 'a long coral reef'], ['Which man-made feature is built for a family to live in?', 'a family house'],
    ['Natural features are made by…', 'nature itself'], ['Man-made features are built by…', 'people at work'],
    ['Why might people build a bridge?', 'to cross a river'], ['Why should we protect natural features?', 'they support life']
  ], ['a high mountain', 'a main road', 'a long river', 'a stone bridge', 'a sandy beach', 'a village school', 'a green forest', 'a large dam', 'a tall waterfall', 'a harbour wall', 'a long coral reef', 'a family house', 'nature itself', 'people at work', 'to cross a river', 'they support life'], 'Ask whether people built it or nature formed it.');
})();
