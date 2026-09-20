'use strict';
(function () {
// Real reasons, keyed by id. Every question in this file used to carry only
// "<b>X</b> is correct.", which restates the answer and teaches nothing.
const G4HG_EXPL = {
  'g4hg-cov-reasons-0': "Different places produced different goods, so traders crossed the ocean <b>to trade goods with others</b> and get what they could not grow or make at home.",
  'g4hg-cov-reasons-1': "Before refrigerators, spices were used for <b>flavouring and preserving food</b>, which made them worth a great deal.",
  'g4hg-cov-reasons-2': "India and the East Indies produced spices, silk and other <b>valuable goods to sell</b> in Europe at a high profit.",
  'g4hg-cov-reasons-3': "Trade is <b>buying and selling goods</b> — exchanging one thing for another, or for money.",
  'g4hg-cov-reasons-4': "A merchant is someone who makes a living by <b>buying and selling goods</b>.",
  'g4hg-cov-reasons-5': "A ship could carry far more than any cart, so sea routes <b>connected distant places</b> that land travel could not.",
  'g4hg-cov-reasons-6': "<b>Spices such as pepper</b> were light, kept well on a long voyage and sold for a lot, so they were ideal for trade.",
  'g4hg-cov-reasons-7': "Sailing ships were pushed by the wind, so with helpful winds <b>sailing was much easier</b> and far quicker.",
  'g4hg-cov-reasons-8': "A port gives ships a safe place to <b>load and unload goods</b> between land and sea.",
  'g4hg-cov-reasons-9': "Each country had something the others lacked, so traders visited them <b>to exchange goods</b>.",
  'g4hg-cov-reasons-10': "A trader brought home <b>goods from another place</b> — things that could not be got at home, and so were worth selling.",
  'g4hg-cov-reasons-11': "The Indian Ocean linked Africa and Asia, and also the <b>islands</b> in between, Mauritius among them.",
  'g4hg-cov-reasons-12': "Before setting out, a sailor had to know <b>where they were going</b>, because there is nothing at sea to follow.",
  'g4hg-cov-reasons-13': "Out of sight of land there are no landmarks, so ships carried maps <b>to help find the route</b>.",
  'g4hg-cov-reasons-14': "A trade route is <b>a path used to move goods</b>, by sea or by land, used again and again.",
  'g4hg-cov-reasons-15': "Trade is about moving and exchanging things, so <b>keeping goods in one place</b> is the opposite of trading.",
  'g4hg-cov-reasons-16': "After weeks at sea a crew was short of food and water, so an island let <b>sailors rest and eat</b> before going on.",
  'g4hg-cov-reasons-17': "Trade lets a place get <b>things it does not produce</b> itself, by giving something it has plenty of in exchange.",
  'g4hg-cov-ships-0': "Out of sight of land, sailors steered by <b>a compass and the stars</b>, which point the same way wherever you are.",
  'g4hg-cov-ships-1': "Traditional sailing ships had no engine. They were pushed by <b>the wind</b> alone.",
  'g4hg-cov-ships-2': "A sail is a large sheet spread to <b>catch the wind</b> and turn it into movement.",
  'g4hg-cov-ships-3': "The captain is the person who <b>leads the ship and the crew</b> and is responsible for both.",
  'g4hg-cov-ships-4': "The hull is the body of the ship. It must be strong enough to hold back the sea, so the ship can <b>travel safely on water</b>.",
  'g4hg-cov-ships-5': "Navigation is <b>finding the way at sea</b> — working out where you are and which way to steer.",
  'g4hg-cov-ships-6': "The stars move in a known pattern across the sky, so at night they helped sailors <b>find their direction</b>.",
  'g4hg-cov-ships-7': "A harbour is sheltered from the open sea, so ships can <b>shelter safely from storms</b> there.",
  'g4hg-cov-ships-8': "A voyage could last months with nothing to buy on the way, so a ship carried <b>fresh water and food</b>.",
  'g4hg-cov-ships-9': "A map used at sea is called <b>a chart</b>. It shows depths, rocks and coastlines rather than roads.",
  'g4hg-cov-ships-10': "A sailing ship cannot outrun bad weather easily, so sailors watched the sky because <b>storms could be dangerous</b>.",
  'g4hg-cov-ships-11': "The crew is <b>the people who work on the ship</b>, each with their own job.",
  'g4hg-cov-ships-12': "A compass shows <b>the directions</b> — north, south, east and west — wherever the ship happens to be.",
  'g4hg-cov-ships-13': "An anchor grips the sea bed, which holds the ship and lets it <b>stay in one place</b> instead of drifting.",
  'g4hg-cov-ships-14': "A torn sail cannot hold the wind properly, so <b>a damaged sail catches less wind</b> and the ship slows.",
  'g4hg-cov-ships-15': "In rough weather the safest thing is to <b>listen to the captain</b>, who knows the ship and has to decide for everyone.",
  'g4hg-cov-relief-0': "The shape and height of the land is called its <b>relief</b>.",
  'g4hg-cov-relief-1': "A high area with a fairly flat top is a <b>plateau</b>, unlike a mountain, which rises to a peak.",
  'g4hg-cov-relief-2': "The central plateau lies in <b>the centre of Mauritius</b>, higher and cooler than the coast.",
  'g4hg-cov-relief-3': "<b>Pieter Both</b> is one of the best-known mountain peaks in Mauritius, easily recognised by the boulder on its summit.",
  'g4hg-cov-relief-4': "<b>Piton de la Petite Rivière Noire</b> is the highest point in Mauritius, at about 828 m.",
  'g4hg-cov-relief-5': "Coastal plains are the <b>low, flat land near the coast</b>, between the sea and the higher ground inland.",
  'g4hg-cov-water-0': "A river is water that <b>flows across the land</b>, always running downhill.",
  'g4hg-cov-water-1': "<b>Grand River South East</b> is one of the longest rivers in Mauritius.",
  'g4hg-cov-water-2': "Water keeps running downhill until it can go no further, which on an island means <b>into the sea</b>.",
  'g4hg-cov-water-3': "A lake is a body of water <b>surrounded by land</b>, unlike the sea, which is open.",
  'g4hg-cov-water-4': "Rivers matter because <b>they give water to people</b>, for drinking, washing and watering crops.",
  'g4hg-cov-water-5': "<b>Rubbish and plastic</b> poison the water and harm the animals in it, and it does not simply wash away.",
  'g4hg-cov-water-6': "The river mouth is the end of the river, where it <b>meets the sea</b>.",
  'g4hg-cov-water-7': "When more rain falls than the channel can carry, the river overflows and causes <b>flooding along its banks</b>.",
  'g4hg-cov-water-8': "<b>Keeping rubbish out</b> is the simplest protection, because once it is in the water it is very hard to remove.",
  'g4hg-cov-water-9': "A waterfall forms where the river <b>falls over a steep edge</b>, usually where hard rock meets softer rock.",
  'g4hg-cov-water-10': "Plants along a bank hold the soil and shelter animals, so they <b>help support habitats</b>.",
  'g4hg-cov-water-11': "Rivière Noire is French for <b>Black River</b>, in the west of the island.",
  'g4hg-cov-water-12': "River water used carefully is valuable for <b>farming and watering crops</b>, as long as enough is left in the river.",
  'g4hg-cov-water-13': "Polluted water carries germs and chemicals, so <b>animals and people can get sick</b> from drinking or swimming in it.",
  'g4hg-cov-water-14': "A stream is <b>smaller than a river</b>. Streams often join together to make one.",
  'g4hg-cov-water-15': "<b>A river or a stream</b> is made by nature. A canal or a dam is built by people.",
  'g4hg-cov-coast-0': "The coast is the edge of the land, where it meets <b>the sea</b>.",
  'g4hg-cov-coast-1': "A lagoon is the <b>shallow water inside a reef</b>, between the reef and the shore.",
  'g4hg-cov-coast-2': "The reef breaks the force of the waves before they reach land, so it protects the coast from <b>strong ocean waves</b>.",
  'g4hg-cov-coast-3': "Beaches are <b>habitats for wildlife</b> — crabs, sea birds and turtles that come ashore to nest.",
  'g4hg-cov-coast-4': "Rubbish left on a beach blows into the sea and harms the animals there, so visitors should <b>take it home</b>.",
  'g4hg-cov-coast-5': "A coral reef gives many sea animals <b>a home and shelter</b>, which is why so much sea life is found around it.",
  'g4hg-cov-coast-6': "<b>Pollution and rubbish</b> smother and poison coral, and coral grows back only very slowly.",
  'g4hg-cov-coast-7': "In Mauritius the lagoon is the calm water <b>inside the coral reef</b>, which is what makes it safe for swimming.",
  'g4hg-cov-coast-8': "Coral is a living animal and breaks easily, so <b>not stepping on it</b> protects the reef directly.",
  'g4hg-cov-coast-9': "A clean beach <b>protects wildlife and people</b> alike: animals are not harmed, and people can use it safely.",
  'g4hg-cov-coast-10': "Outside the reef there is nothing to break the waves, so the water is <b>deeper and much rougher</b>.",
  'g4hg-cov-natural-0': "<b>A mountain</b> was formed by nature, not built by people, and it can be climbed.",
  'g4hg-cov-natural-1': "<b>A road</b> is built by people to carry traffic, so it is man-made.",
  'g4hg-cov-natural-2': "<b>A river</b> is a natural channel of flowing water.",
  'g4hg-cov-natural-3': "<b>A bridge</b> is built by people to cross a river, a valley or a road.",
  'g4hg-cov-natural-4': "<b>A beach</b> is made by the sea wearing down rock and shell into sand over a very long time.",
  'g4hg-cov-natural-5': "<b>A school</b> is built by people for learning, so it is man-made.",
  'g4hg-cov-natural-6': "<b>A forest</b> grows naturally, without anyone planting it.",
  'g4hg-cov-natural-7': "<b>A dam</b> is built by people across a river to hold back and store water.",
  'g4hg-cov-natural-8': "<b>A waterfall</b> forms naturally where a river drops over a steep edge.",
  'g4hg-cov-natural-9': "<b>A harbour wall</b> is built by people to keep waves out and shelter the ships inside.",
  'g4hg-cov-natural-10': "<b>A coral reef</b> is built up over thousands of years by tiny living sea animals, so it is natural.",
  'g4hg-cov-natural-11': "<b>A house</b> is built by people to live in.",
  'g4hg-cov-natural-12': "Natural features are made by <b>nature</b>, without people building them.",
  'g4hg-cov-natural-13': "Man-made features are built by <b>people</b>, for a purpose they have chosen.",
  'g4hg-cov-natural-14': "A bridge lets people and vehicles <b>cross a river</b> without going a long way round or getting wet.",
  'g4hg-cov-natural-15': "Forests, rivers and reefs <b>support life</b> — they give food, water and shelter to plants, animals and people.",
};
  const add = (id, chapterId, subsection, question, options, answer, hint, explanation) => STATIC_QUESTIONS.push(makeMCQ({ id, chapterId, subsection, difficulty: 2, question, options, answer, hint, explanation: G4HG_EXPL[id] || explanation }));
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
