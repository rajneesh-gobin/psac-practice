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

  // ── Reasons for voyages ──────────────────────────────────────────────────
  add('g4hg-cov-reasons-0', 'g4hist-voyages', 'reasons', 'Why did traders travel across the Indian Ocean long ago?', ['to trade goods with others', 'to explore unknown islands', 'to escape bad weather at home', 'to find fresh drinking water'], 'to trade goods with others', 'Think about goods, routes and journeys.');
  add('g4hg-cov-reasons-1', 'g4hist-voyages', 'reasons', 'Spices were valuable because people used them for…', ['flavouring and preserving food', 'building stronger ships', 'making maps of the ocean', 'paying sailors their wages'], 'flavouring and preserving food', 'Think about goods, routes and journeys.');
  add('g4hg-cov-reasons-2', 'g4hist-voyages', 'reasons', 'Traders travelled to India and the East Indies mainly to find…', ['valuable goods to sell', 'new islands to settle on', 'better weather for farming', 'stronger wood for shipbuilding'], 'valuable goods to sell', 'Think about goods, routes and journeys.');
  add('g4hg-cov-reasons-3', 'g4hist-voyages', 'reasons', 'What is trade?', ['buying and selling goods', 'building roads for carts', 'catching fish from the sea', 'growing crops on land'], 'buying and selling goods', 'Think about goods, routes and journeys.');
  add('g4hg-cov-reasons-4', 'g4hist-voyages', 'reasons', 'A merchant is a person who…', ['buys and sells goods', 'builds and repairs ships', 'maps coastlines and rivers', 'grows and harvests crops'], 'buys and sells goods', 'Think about goods, routes and journeys.');
  add('g4hg-cov-reasons-5', 'g4hist-voyages', 'reasons', 'Why were sea routes important to traders?', ['they connected distant places', 'they were safer than any road', 'they made goods cheaper to buy', 'they kept goods fresh for longer'], 'they connected distant places', 'Think about goods, routes and journeys.');
  add('g4hg-cov-reasons-6', 'g4hist-voyages', 'reasons', 'Which item could be traded long ago?', ['spices such as pepper', 'plastic water bottles', 'electric machines', 'printed newspapers'], 'spices such as pepper', 'Think about goods, routes and journeys.');
  add('g4hg-cov-reasons-7', 'g4hist-voyages', 'reasons', 'Traders travelled when winds were helpful because…', ['sailing was much easier', 'the seas were always calm', 'goods cost less in summer', 'pirates stayed at home'], 'sailing was much easier', 'Think about goods, routes and journeys.');
  add('g4hg-cov-reasons-8', 'g4hist-voyages', 'reasons', 'A port is useful because ships can…', ['load and unload goods', 'sail faster in sheltered water', 'repair their sails for free', 'collect star charts there'], 'load and unload goods', 'Think about goods, routes and journeys.');
  add('g4hg-cov-reasons-9', 'g4hist-voyages', 'reasons', 'Why did traders visit different countries?', ['to exchange goods there', 'to learn the local language', 'to build new ports and harbours', 'to study the local weather'], 'to exchange goods there', 'Think about goods, routes and journeys.');
  add('g4hg-cov-reasons-10', 'g4hist-voyages', 'reasons', 'What might a trader bring back from a voyage?', ['goods from another place', 'maps drawn by the captain', 'sand from a foreign beach', 'a larger sailing ship'], 'goods from another place', 'Think about goods, routes and journeys.');
  add('g4hg-cov-reasons-11', 'g4hist-voyages', 'reasons', 'The Indian Ocean linked Africa, Asia and…', ['islands such as Mauritius', 'the Atlantic and Pacific', 'rivers of central Africa', 'mountains of Europe'], 'islands such as Mauritius', 'Think about goods, routes and journeys.');
  add('g4hg-cov-reasons-12', 'g4hist-voyages', 'reasons', 'What did sailors need to know before a long voyage?', ['where they were going', 'how many fish lived nearby', 'which captain was most famous', 'how old the ship was'], 'where they were going', 'Think about goods, routes and journeys.');
  add('g4hg-cov-reasons-13', 'g4hist-voyages', 'reasons', 'Why did ships carry maps?', ['to help them find routes', 'to show passengers the sights', 'to record the fish they caught', 'to draw new ports they visited'], 'to help them find routes', 'Think about goods, routes and journeys.');
  add('g4hg-cov-reasons-14', 'g4hist-voyages', 'reasons', 'A trade route is…', ['a path used to move goods', 'a tax paid at a port', 'a map of river mouths', 'a list of spice prices'], 'a path used to move goods', 'Think about goods, routes and journeys.');
  add('g4hg-cov-reasons-15', 'g4hist-voyages', 'reasons', 'Which is not a reason for trade?', ['to keep goods in one place', 'to get things you cannot make at home', 'to sell what you produce too much of', 'to connect distant peoples and places'], 'to keep goods in one place', 'Think about goods, routes and journeys.');
  add('g4hg-cov-reasons-16', 'g4hist-voyages', 'reasons', 'Why were islands useful stopping places for ships?', ['sailors could rest and eat', 'the water was always calm there', 'maps could be bought there', 'goods were always cheaper there'], 'sailors could rest and eat', 'Think about goods, routes and journeys.');
  add('g4hg-cov-reasons-17', 'g4hist-voyages', 'reasons', 'Trading can help different places get…', ['things they do not produce', 'bigger and stronger armies', 'more land to farm on', 'faster sailing ships'], 'things they do not produce', 'Think about goods, routes and journeys.');

  // ── Ships and the sea ────────────────────────────────────────────────────
  add('g4hg-cov-ships-0', 'g4hist-voyages', 'ships', 'What helped sailors know which way to travel?', ['a compass and the stars', 'the colour of the water', 'the shape of the clouds', 'a clock and a calendar'], 'a compass and the stars', 'Think about what a ship and its crew need at sea.');
  add('g4hg-cov-ships-1', 'g4hist-voyages', 'ships', 'What pushed traditional sailing ships?', ['the power of the wind', 'oars pulled by sailors', 'steam from burning coal', 'the current of the sea'], 'the power of the wind', 'Think about what a ship and its crew need at sea.');
  add('g4hg-cov-ships-2', 'g4hist-voyages', 'ships', 'A sail is used to…', ['catch the wind for power', 'keep rain off the crew', 'signal to other ships', 'carry goods in the hold'], 'catch the wind for power', 'Think about what a ship and its crew need at sea.');
  add('g4hg-cov-ships-3', 'g4hist-voyages', 'ships', 'A captain is the person who…', ['leads a ship and crew', 'repairs the sails and ropes', 'cooks meals for the sailors', 'draws maps of the coastline'], 'leads a ship and crew', 'Think about what a ship and its crew need at sea.');
  add('g4hg-cov-ships-4', 'g4hist-voyages', 'ships', 'Why did ships need a strong hull?', ['to travel safely on water', 'to carry a heavier anchor', 'to hold more cargo below deck', 'to go faster in calm weather'], 'to travel safely on water', 'Think about what a ship and its crew need at sea.');
  add('g4hg-cov-ships-5', 'g4hist-voyages', 'ships', 'What is navigation?', ['finding the way at sea', 'loading and unloading cargo', 'repairing a torn sail quickly', 'catching fish off the side'], 'finding the way at sea', 'Think about what a ship and its crew need at sea.');
  add('g4hg-cov-ships-6', 'g4hist-voyages', 'ships', 'Stars could help sailors at night to…', ['find their direction', 'predict the next day\'s weather', 'judge how deep the water was', 'estimate how far they had come'], 'find their direction', 'Think about what a ship and its crew need at sea.');
  add('g4hg-cov-ships-7', 'g4hist-voyages', 'ships', 'A harbour is a place where ships can…', ['shelter safely from storms', 'sell their goods to traders', 'buy maps and compasses', 'hire extra sailors cheaply'], 'shelter safely from storms', 'Think about what a ship and its crew need at sea.');
  add('g4hg-cov-ships-8', 'g4hist-voyages', 'ships', 'What should sailors take on a long trip?', ['fresh water and food', 'extra anchors and ropes', 'spare sails and oars', 'maps of every ocean'], 'fresh water and food', 'Think about what a ship and its crew need at sea.');
  add('g4hg-cov-ships-9', 'g4hist-voyages', 'ships', 'A map used at sea is called a…', ['a chart or sea map', 'a compass or dial', 'an anchor or guide', 'a log or record book'], 'a chart or sea map', 'Think about what a ship and its crew need at sea.');
  add('g4hg-cov-ships-10', 'g4hist-voyages', 'ships', 'Why did sailors watch the weather?', ['storms could be dangerous', 'sunny skies meant faster sailing', 'rain filled the water barrels', 'clouds showed where land was'], 'storms could be dangerous', 'Think about what a ship and its crew need at sea.');
  add('g4hg-cov-ships-11', 'g4hist-voyages', 'ships', 'A crew is…', ['the people who work on a ship', 'the ropes that hold the sails', 'the cargo carried below decks', 'the tools used by the captain'], 'the people who work on a ship', 'Think about what a ship and its crew need at sea.');
  add('g4hg-cov-ships-12', 'g4hist-voyages', 'ships', 'What can a compass show?', ['the four directions', 'the depth of the water below', 'the speed of the wind above', 'the distance to the next port'], 'the four directions', 'Think about what a ship and its crew need at sea.');
  add('g4hg-cov-ships-13', 'g4hist-voyages', 'ships', 'A ship\'s anchor helps it…', ['stay in one place', 'travel faster in calm weather', 'catch more wind in its sails', 'turn around in a small harbour'], 'stay in one place', 'Think about what a ship and its crew need at sea.');
  add('g4hg-cov-ships-14', 'g4hist-voyages', 'ships', 'Why did sailors repair sails?', ['damaged sails catch less wind', 'torn sails let in the rain', 'the captain demanded it each day', 'old sails were very expensive'], 'damaged sails catch less wind', 'Think about what a ship and its crew need at sea.');
  add('g4hg-cov-ships-15', 'g4hist-voyages', 'ships', 'Which is safest in rough weather?', ['listen to the captain', 'stand on the highest deck', 'pull in all the sails quickly', 'throw the cargo overboard'], 'listen to the captain', 'Think about what a ship and its crew need at sea.');

  // ── Relief of the land ───────────────────────────────────────────────────
  add('g4hg-cov-relief-0', 'g4ge-natural-env', 'relief', 'What is the name for the shape and height of land?', ['the relief of the land', 'the climate of the land', 'the soil of the land', 'the coast of the land'], 'the relief of the land', 'Think about mountains, flat land and where they are found.');
  add('g4hg-cov-relief-1', 'g4ge-natural-env', 'relief', 'A high area with a fairly flat top is a…', ['a plateau of high land', 'a steep tall mountain', 'a wide coastal plain', 'a deep river valley'], 'a plateau of high land', 'Think about mountains, flat land and where they are found.');
  add('g4hg-cov-relief-2', 'g4ge-natural-env', 'relief', 'The central plateau is found in…', ['the centre of Mauritius', 'the north of Mauritius', 'the south of Mauritius', 'near the east coast'], 'the centre of Mauritius', 'Think about mountains, flat land and where they are found.');
  add('g4hg-cov-relief-3', 'g4ge-natural-env', 'relief', 'Which is a mountain peak in Mauritius?', ['Pieter Both mountain', 'Grand River South East', 'the central plateau', 'the Blue Bay lagoon'], 'Pieter Both mountain', 'Think about mountains, flat land and where they are found.');
  add('g4hg-cov-relief-4', 'g4ge-natural-env', 'relief', 'Piton de la Petite Rivière Noire is known as…', ['the highest peak of all', 'the widest river island', 'the deepest harbour bay', 'the longest coastal plain'], 'the highest peak of all', 'Think about mountains, flat land and where they are found.');
  add('g4hg-cov-relief-5', 'g4ge-natural-env', 'relief', 'Coastal plains are found…', ['in low land near the coast', 'at the top of mountains', 'on high flat plateaux', 'deep inside the island'], 'in low land near the coast', 'Think about mountains, flat land and where they are found.');

  // ── Water features ───────────────────────────────────────────────────────
  add('g4hg-cov-water-0', 'g4ge-natural-env', 'water', 'A river is water that…', ['flows across land', 'sits still in a hollow', 'falls from a great height', 'rises up through the ground'], 'flows across land', 'Use what you know about flowing water and caring for nature.');
  add('g4hg-cov-water-1', 'g4ge-natural-env', 'water', 'Which river is in Mauritius?', ['Grand River South East', 'River Thames in the north', 'River Nile in the east', 'Amazon River in the west'], 'Grand River South East', 'Use what you know about flowing water and caring for nature.');
  add('g4hg-cov-water-2', 'g4ge-natural-env', 'water', 'Where does a river often flow into?', ['into the sea or ocean', 'into a high mountain peak', 'into a city or town', 'into a wide coastal plain'], 'into the sea or ocean', 'Use what you know about flowing water and caring for nature.');
  add('g4hg-cov-water-3', 'g4ge-natural-env', 'water', 'A lake is a body of water…', ['surrounded by land', 'flowing along a channel', 'falling over a steep edge', 'mixing with salt water'], 'surrounded by land', 'Use what you know about flowing water and caring for nature.');
  add('g4hg-cov-water-4', 'g4ge-natural-env', 'water', 'Why are rivers important?', ['they give water to people', 'they carry ships to the coast', 'they protect land from floods', 'they cool the air in summer'], 'they give water to people', 'Use what you know about flowing water and caring for nature.');
  add('g4hg-cov-water-5', 'g4ge-natural-env', 'water', 'What should we not throw into a river?', ['rubbish or plastic', 'leaves from nearby trees', 'rainwater from the sky', 'sand from the riverbed'], 'rubbish or plastic', 'Use what you know about flowing water and caring for nature.');
  add('g4hg-cov-water-6', 'g4ge-natural-env', 'water', 'A river mouth is where a river…', ['meets the sea or ocean', 'starts high in the mountains', 'widens into a large lake', 'flows fastest and deepest'], 'meets the sea or ocean', 'Use what you know about flowing water and caring for nature.');
  add('g4hg-cov-water-7', 'g4ge-natural-env', 'water', 'What can heavy rain cause in a river?', ['flooding along its banks', 'fish to swim upstream faster', 'the water to become cleaner', 'the river to slow right down'], 'flooding along its banks', 'Use what you know about flowing water and caring for nature.');
  add('g4hg-cov-water-8', 'g4ge-natural-env', 'water', 'Which action helps protect rivers?', ['keeping rubbish out of them', 'building more bridges across them', 'removing plants along the banks', 'deepening the river channel'], 'keeping rubbish out of them', 'Use what you know about flowing water and caring for nature.');
  add('g4hg-cov-water-9', 'g4ge-natural-env', 'water', 'A waterfall is formed where river water…', ['falls over a steep edge', 'slows down near the coast', 'meets a wide calm lake', 'widens across flat ground'], 'falls over a steep edge', 'Use what you know about flowing water and caring for nature.');
  add('g4hg-cov-water-10', 'g4ge-natural-env', 'water', 'Why do plants near rivers need protection?', ['they help support habitats', 'they block the path of boats', 'they stop rain reaching the river', 'they make the water taste better'], 'they help support habitats', 'Use what you know about flowing water and caring for nature.');
  add('g4hg-cov-water-11', 'g4ge-natural-env', 'water', 'Rivière Noire is also called…', ['the Black River in the west', 'the Blue River in the north', 'the Red River in the east', 'the White River in the south'], 'the Black River in the west', 'Use what you know about flowing water and caring for nature.');
  add('g4hg-cov-water-12', 'g4ge-natural-env', 'water', 'Water from rivers can be used carefully for…', ['farming and watering crops', 'building roads and bridges', 'making bricks for houses', 'printing maps of the island'], 'farming and watering crops', 'Use what you know about flowing water and caring for nature.');
  add('g4hg-cov-water-13', 'g4ge-natural-env', 'water', 'What can happen if a river is polluted?', ['animals and people get sick', 'the river flows much faster', 'more fish arrive to feed', 'the banks grow much wider'], 'animals and people get sick', 'Use what you know about flowing water and caring for nature.');
  add('g4hg-cov-water-14', 'g4ge-natural-env', 'water', 'A stream is usually…', ['smaller than a river', 'wider than an ocean bay', 'longer than a major river', 'deeper than a large lake'], 'smaller than a river', 'Use what you know about flowing water and caring for nature.');
  add('g4hg-cov-water-15', 'g4ge-natural-env', 'water', 'Which water feature is natural?', ['a river or a stream', 'a canal or a dam', 'a harbour or a pier', 'a well or a tap'], 'a river or a stream', 'Use what you know about flowing water and caring for nature.');

  // ── Coastal features ─────────────────────────────────────────────────────
  add('g4hg-cov-coast-0', 'g4ge-natural-env', 'coast', 'The coast is where land meets…', ['the sea or the ocean', 'a river or a stream', 'a lake or a lagoon', 'the sky or the clouds'], 'the sea or the ocean', 'Think about the coastline, lagoon and reef.');
  add('g4hg-cov-coast-1', 'g4ge-natural-env', 'coast', 'A lagoon is usually…', ['shallow water inside a reef', 'deep water beyond the reef', 'a river flowing to the sea', 'a lake high in the mountains'], 'shallow water inside a reef', 'Think about the coastline, lagoon and reef.');
  add('g4hg-cov-coast-2', 'g4ge-natural-env', 'coast', 'A coral reef helps protect the coast from…', ['the strong ocean waves', 'heavy rain from the sky', 'strong winds from the hills', 'pollution from the rivers'], 'the strong ocean waves', 'Think about the coastline, lagoon and reef.');
  add('g4hg-cov-coast-3', 'g4ge-natural-env', 'coast', 'Why are beaches important?', ['they are habitats for wildlife', 'they are built by fishermen', 'they block the ocean waves', 'they are where ships are built'], 'they are habitats for wildlife', 'Think about the coastline, lagoon and reef.');
  add('g4hg-cov-coast-4', 'g4ge-natural-env', 'coast', 'What should visitors do at the beach?', ['take their rubbish home', 'walk across the coral reef', 'build fires near the water', 'collect shells and coral pieces'], 'take their rubbish home', 'Think about the coastline, lagoon and reef.');
  add('g4hg-cov-coast-5', 'g4ge-natural-env', 'coast', 'Coral is important because it gives many sea animals…', ['a home and safe shelter', 'a supply of fresh water', 'a path to the open sea', 'a source of river fish'], 'a home and safe shelter', 'Think about the coastline, lagoon and reef.');
  add('g4hg-cov-coast-6', 'g4ge-natural-env', 'coast', 'What can damage a coral reef?', ['pollution and rubbish', 'gentle waves and sunlight', 'rain falling from the sky', 'ships passing in deep water'], 'pollution and rubbish', 'Think about the coastline, lagoon and reef.');
  add('g4hg-cov-coast-7', 'g4ge-natural-env', 'coast', 'A lagoon in Mauritius is often found…', ['inside the coral reef', 'beyond the open ocean', 'along the river banks', 'at the top of the plateau'], 'inside the coral reef', 'Think about the coastline, lagoon and reef.');
  add('g4hg-cov-coast-8', 'g4ge-natural-env', 'coast', 'Which activity protects the coast?', ['not stepping on coral', 'building more sea walls', 'fishing close to the reef', 'sailing boats in the lagoon'], 'not stepping on coral', 'Think about the coastline, lagoon and reef.');
  add('g4hg-cov-coast-9', 'g4ge-natural-env', 'coast', 'Why should we keep beaches clean?', ['to protect wildlife and people', 'to make the water colder', 'to attract more ocean fish', 'to build bigger sand dunes'], 'to protect wildlife and people', 'Think about the coastline, lagoon and reef.');
  add('g4hg-cov-coast-10', 'g4ge-natural-env', 'coast', 'The sea water outside a reef can be…', ['deeper and much rougher', 'warmer and much calmer', 'bluer and much cleaner', 'shallower and much greener'], 'deeper and much rougher', 'Think about the coastline, lagoon and reef.');

  // ── Natural vs man-made ──────────────────────────────────────────────────
  add('g4hg-cov-natural-0', 'g4ge-natural-env', 'natural_manmade', 'Which natural feature can be climbed?', ['a high mountain', 'a stone bridge', 'a brick school', 'a harbour wall'], 'a high mountain', 'Ask whether people built it or nature formed it.');
  add('g4hg-cov-natural-1', 'g4ge-natural-env', 'natural_manmade', 'Which man-made feature carries traffic?', ['a main road', 'a coral reef', 'a sandy beach', 'a flowing river'], 'a main road', 'Ask whether people built it or nature formed it.');
  add('g4hg-cov-natural-2', 'g4ge-natural-env', 'natural_manmade', 'Which natural feature carries flowing water?', ['a long river', 'a large dam', 'a stone bridge', 'a paved road'], 'a long river', 'Ask whether people built it or nature formed it.');
  add('g4hg-cov-natural-3', 'g4ge-natural-env', 'natural_manmade', 'Which man-made feature crosses an obstacle?', ['a stone bridge', 'a sandy beach', 'a tall waterfall', 'a dense forest'], 'a stone bridge', 'Ask whether people built it or nature formed it.');
  add('g4hg-cov-natural-4', 'g4ge-natural-env', 'natural_manmade', 'Which natural feature is made of sand by the sea?', ['a sandy beach', 'a village school', 'a harbour wall', 'a stone bridge'], 'a sandy beach', 'Ask whether people built it or nature formed it.');
  add('g4hg-cov-natural-5', 'g4ge-natural-env', 'natural_manmade', 'Which man-made feature is built for learning?', ['a village school', 'a tall waterfall', 'a coral reef', 'a sandy beach'], 'a village school', 'Ask whether people built it or nature formed it.');
  add('g4hg-cov-natural-6', 'g4ge-natural-env', 'natural_manmade', 'Which natural feature contains many trees?', ['a green forest', 'a large dam', 'a harbour wall', 'a stone bridge'], 'a green forest', 'Ask whether people built it or nature formed it.');
  add('g4hg-cov-natural-7', 'g4ge-natural-env', 'natural_manmade', 'Which man-made feature can store water?', ['a large dam', 'a coral reef', 'a tall waterfall', 'a long river'], 'a large dam', 'Ask whether people built it or nature formed it.');
  add('g4hg-cov-natural-8', 'g4ge-natural-env', 'natural_manmade', 'Which natural feature has falling water?', ['a tall waterfall', 'a village school', 'a stone bridge', 'a large dam'], 'a tall waterfall', 'Ask whether people built it or nature formed it.');
  add('g4hg-cov-natural-9', 'g4ge-natural-env', 'natural_manmade', 'Which man-made feature helps protect a harbour?', ['a harbour wall', 'a green forest', 'a sandy beach', 'a long river'], 'a harbour wall', 'Ask whether people built it or nature formed it.');
  add('g4hg-cov-natural-10', 'g4ge-natural-env', 'natural_manmade', 'Which natural feature is formed by tiny sea animals?', ['a long coral reef', 'a main road', 'a harbour wall', 'a large dam'], 'a long coral reef', 'Ask whether people built it or nature formed it.');
  add('g4hg-cov-natural-11', 'g4ge-natural-env', 'natural_manmade', 'Which man-made feature is built for a family to live in?', ['a family house', 'a tall waterfall', 'a green forest', 'a coral reef'], 'a family house', 'Ask whether people built it or nature formed it.');
  add('g4hg-cov-natural-12', 'g4ge-natural-env', 'natural_manmade', 'Natural features are made by…', ['nature itself', 'engineers and builders', 'farmers and fishermen', 'teachers and children'], 'nature itself', 'Ask whether people built it or nature formed it.');
  add('g4hg-cov-natural-13', 'g4ge-natural-env', 'natural_manmade', 'Man-made features are built by…', ['people at work', 'rivers and the sea', 'wind and the rain', 'animals and plants'], 'people at work', 'Ask whether people built it or nature formed it.');
  add('g4hg-cov-natural-14', 'g4ge-natural-env', 'natural_manmade', 'Why might people build a bridge?', ['to cross a river', 'to stop the waves at sea', 'to hold back river water', 'to shelter ships in a storm'], 'to cross a river', 'Ask whether people built it or nature formed it.');
  add('g4hg-cov-natural-15', 'g4ge-natural-env', 'natural_manmade', 'Why should we protect natural features?', ['they support life', 'they earn money for builders', 'they are easy to replace', 'they were built long ago'], 'they support life', 'Ask whether people built it or nature formed it.');
})();
