'use strict';
// Grade 6 History & Geography - depth for the chapters the real papers lean on.
//
// WHY THIS FILE EXISTS
// examWeight is now set from the 2022/2023/2024 papers (see the block above
// `chapters:` in _manifest.js). Land Use alone takes 28.7% of the marks and now
// supplies 11 questions of every 40-question exam from a pool of 47 - four mock
// exams and a child had seen the chapter out. Measured 2026-09-08.
//
// ⚠ Options are written ANSWER FIRST in the table purely so the item is easy
//   to read and check: options[0] is always the answer. It does NOT set where
//   the answer appears on screen - makeMCQ() shuffles the options itself
//   (engine/helpers.js), so the A/B/C/D spread comes from that Fisher-Yates
//   shuffle, not from anything here. What DOES matter is keeping all four
//   options the same grammatical shape and length: the real papers average a
//   6.8-character spread, and scripts/test-option-parity.js measures it.

(function () {
  let n = 0;
  const q = (chapterId, subsection, difficulty, question, options, hint, explanation) => {
    n += 1;
    STATIC_QUESTIONS.push(makeMCQ({
      id: `g6hg-dep-${String(n).padStart(3, '0')}`,
      chapterId, subsection, difficulty, question,
      options,
      answer: options[0], hint, explanation
    }));
  };

  // ══ g6-land-use ═════════════════════════════════════════════════════════
  // agriculture (15)
  q('g6-land-use', 'agriculture', 1, 'Growing one single crop over a large area is called ...',
    ['plantation agriculture', 'market gardening', 'mixed farming', 'pastoral farming'],
    'Think of the sugar cane fields.',
    '<b>Plantation agriculture</b> is the growing of one crop, such as sugar cane or tea, over a large area.');
  q('g6-land-use', 'agriculture', 1, 'Which crop covers the largest area of farmland in Mauritius?',
    ['Sugar cane', 'Tea', 'Maize', 'Onion'],
    'It has shaped the island\'s landscape for centuries.',
    '<b>Sugar cane</b> covers by far the largest area of agricultural land in Mauritius.');
  q('g6-land-use', 'agriculture', 1, 'Growing vegetables in small plots to sell is called ...',
    ['market gardening', 'plantation agriculture', 'pastoral farming', 'forestry'],
    'The crops are taken straight to the market.',
    '<b>Market gardening</b> is the growing of vegetables on small plots for sale at the market.');
  q('g6-land-use', 'agriculture', 2, 'Which crops are usually grown in market gardening?',
    ['Tomatoes and carrots', 'Sugar cane and tea', 'Pine and eucalyptus', 'Cotton and rubber'],
    'They are the vegetables sold at the bazaar.',
    'Market gardeners grow vegetables such as <b>tomatoes and carrots</b>, along with beans, cabbage and onions.');
  q('g6-land-use', 'agriculture', 2, 'Rearing animals together with growing crops on the same farm is called ...',
    ['mixed farming', 'plantation agriculture', 'market gardening', 'shifting cultivation'],
    'The farm does two things at once.',
    '<b>Mixed farming</b> combines crops and livestock, so the animals provide manure and the crops provide fodder.');
  q('g6-land-use', 'agriculture', 2, 'Which crop is grown on terraces in Rodrigues?',
    ['Maize', 'Rice', 'Tea', 'Coconut'],
    'It is a cereal grown on the island\'s slopes.',
    '<b>Maize</b> is grown on terraces cut into the slopes of Rodrigues, together with beans and onions.');
  q('g6-land-use', 'agriculture', 2, 'Why are terraces built on sloping land?',
    ['To reduce soil erosion', 'To make the slope steeper', 'To drain away all rain', 'To keep animals out'],
    'Think about what rain does to a bare slope.',
    'Terraces make flat steps on a slope, so rainwater runs off slowly and <b>soil erosion is reduced</b>.');
  q('g6-land-use', 'agriculture', 2, 'Name one physical factor that influences farming.',
    ['Rainfall', 'Bank loans', 'Market prices', 'Government policy'],
    'A physical factor comes from nature.',
    '<b>Rainfall</b> is a physical factor, along with soil, temperature and relief. The others are human factors.');
  q('g6-land-use', 'agriculture', 2, 'Market gardening in Rodrigues is often practised in river valleys because ...',
    ['the soil there is fertile', 'the slopes are steepest', 'the land is nearest hotels', 'the wind is strongest'],
    'Rivers deposit something useful.',
    'Rivers deposit alluvium, so <b>the soil is fertile</b> and there is water close at hand for the crops.');
  q('g6-land-use', 'agriculture', 2, 'Mud carried and deposited by a river along its banks is called ...',
    ['alluvium', 'basalt', 'limestone', 'coral'],
    'It makes the flat land beside a river fertile.',
    '<b>Alluvium</b> is the fine fertile mud left behind by a river, which is why alluvial land is good farmland.');
  q('g6-land-use', 'agriculture', 3, 'Why is sugar cane well suited to the climate of Mauritius?',
    ['It needs heat and heavy rain', 'It needs cold and dry air', 'It needs frost each winter', 'It needs no rain at all'],
    'Think about the island\'s summer.',
    'Sugar cane <b>needs heat and heavy rain</b>, which the tropical climate of Mauritius provides.');
  q('g6-land-use', 'agriculture', 3, 'Tea is grown mainly in the central plateau of Mauritius because that area is ...',
    ['cool and wet', 'hot and dry', 'flat and sandy', 'close to the sea'],
    'Tea likes highland conditions.',
    'The central plateau is higher, so it is <b>cool and wet</b>, which suits tea bushes.');
  q('g6-land-use', 'agriculture', 3, 'A farmer keeps cattle beside his vegetable plots. Give one advantage.',
    ['The manure enriches the soil', 'The cattle eat the vegetables', 'The plots need no water', 'The soil becomes sandy'],
    'What do the animals give back to the land?',
    'The animals produce manure, and <b>the manure enriches the soil</b>, so less chemical fertiliser is needed.');
  q('g6-land-use', 'agriculture', 3, 'Why do farmers in Rodrigues grow several different crops rather than one?',
    ['If one fails they still have others', 'One crop grows faster that way', 'It uses up all the water', 'It makes the soil harder'],
    'Think about the risk of a drought or a pest.',
    'Growing several crops spreads the risk: <b>if one fails they still have others</b> to eat and to sell.');
  q('g6-land-use', 'agriculture', 3, 'Land used for growing crops and rearing animals is described as ... land use.',
    ['agricultural', 'industrial', 'residential', 'recreational'],
    'Match the word to the activity.',
    'Farming is <b>agricultural</b> land use. Houses are residential, factories industrial, and parks recreational.');

  // tourism (12)
  q('g6-land-use', 'tourism', 1, 'Where are most tourist hotels in Mauritius situated?',
    ['In coastal regions', 'In inland regions', 'On the central plateau', 'In the sugar factories'],
    'Think about what tourists come for.',
    'Most hotels are built <b>in coastal regions</b>, close to the beaches and the lagoon.');
  q('g6-land-use', 'tourism', 2, 'Give one reason why hotels are built along the coast.',
    ['Tourists want the beaches', 'The land there is highest', 'The soil there is richest', 'The rain there is heaviest'],
    'What is the main attraction?',
    'Hotels are built on the coast because <b>tourists want the beaches</b>, the warm lagoon and water sports.');
  q('g6-land-use', 'tourism', 2, 'Which service is provided to tourists inside a hotel?',
    ['Meals and rooms', 'Cane harvesting', 'Fishing licences', 'Bus timetables'],
    'Think about what a hotel actually sells.',
    'A hotel provides <b>meals and rooms</b>, as well as entertainment, transport and excursions.');
  q('g6-land-use', 'tourism', 2, 'Using land to build tourist hotels is known as ... land use.',
    ['infrastructural', 'agricultural', 'residential', 'pastoral'],
    'It is building, not farming or housing.',
    'Building hotels, roads and airports is <b>infrastructural</b> land use.');
  q('g6-land-use', 'tourism', 2, 'Tourism based on visiting natural areas without harming them is called ...',
    ['ecotourism', 'agro-tourism', 'mass tourism', 'urban tourism'],
    'The word begins like "ecology".',
    '<b>Ecotourism</b> takes visitors to natural areas in a way that protects rather than damages them.');
  q('g6-land-use', 'tourism', 2, 'Which is a site for ecotourism in Mauritius?',
    ['Ile aux Aigrettes', 'The Blue Penny Museum', 'China Town', 'Port Louis harbour'],
    'It is a small island nature reserve.',
    '<b>Ile aux Aigrettes</b> is a nature reserve where endemic plants and animals are protected and shown to visitors.');
  q('g6-land-use', 'tourism', 2, 'In Rodrigues, many guest houses are found at Port Mathurin because it is ...',
    ['the main town and port', 'the highest point', 'the driest area', 'the only farmland'],
    'Where do visitors arrive and find services?',
    'Port Mathurin is <b>the main town and port</b>, so visitors arrive there and shops and transport are close by.');
  q('g6-land-use', 'tourism', 3, 'Give one benefit of tourism to Mauritius.',
    ['It creates many jobs', 'It reduces the rainfall', 'It enlarges the island', 'It removes all pollution'],
    'Think about work for local people.',
    'Tourism <b>creates many jobs</b> in hotels, transport and craft, and brings foreign money into the country.');
  q('g6-land-use', 'tourism', 3, 'Give one harmful effect of tourism on the coast.',
    ['Lagoons become polluted', 'Beaches grow much wider', 'Coral grows more quickly', 'Fish become more common'],
    'Think about waste and building near the sea.',
    'Waste water and boat traffic mean <b>lagoons become polluted</b>, and building destroys the natural coastline.');
  q('g6-land-use', 'tourism', 3, 'Why do hotels sometimes cause a shortage of beach space for local people?',
    ['They occupy long stretches of coast', 'They are built on the plateau', 'They keep the beaches empty', 'They add sand to the shore'],
    'Think about how much coast a large hotel takes.',
    'Large hotels <b>occupy long stretches of coast</b>, leaving fewer public beaches for residents.');
  q('g6-land-use', 'tourism', 3, 'Which activity in a lagoon damages coral the most?',
    ['Anchoring boats on the reef', 'Swimming near the shore', 'Walking along the beach', 'Watching birds from land'],
    'Coral is easily broken.',
    '<b>Anchoring boats on the reef</b> breaks the coral, which takes many years to grow back.');
  q('g6-land-use', 'tourism', 3, 'Give one way tourism can be made less harmful to the environment.',
    ['Treat hotel waste water', 'Build hotels closer together', 'Remove the coral reef', 'Cut down coastal trees'],
    'Deal with what the hotel puts into the sea.',
    'Treating <b>hotel waste water</b> before it is released stops the lagoon being polluted.');

  // industry (12)
  q('g6-land-use', 'industry', 1, 'A sugar factory turns sugar cane into ...',
    ['sugar', 'cloth', 'paper', 'cement'],
    'The name of the factory is the clue.',
    'A sugar factory crushes cane and produces <b>sugar</b>, along with molasses and bagasse.');
  q('g6-land-use', 'industry', 1, 'Land used to build factories is known as ... land use.',
    ['industrial', 'agricultural', 'residential', 'recreational'],
    'Match the word to the activity.',
    'Factories occupy <b>industrial</b> land, which is often placed away from housing.');
  q('g6-land-use', 'industry', 2, 'An industry that processes farm produce is called ...',
    ['agro-industry', 'heavy industry', 'mining industry', 'service industry'],
    'The prefix means "farm".',
    '<b>Agro-industry</b> processes what farms produce, such as sugar factories and tea factories.');
  q('g6-land-use', 'industry', 2, 'What is bagasse, the fibre left after cane is crushed, used for?',
    ['Producing electricity', 'Making window glass', 'Building stone walls', 'Feeding sea fish'],
    'It is burned in the power plant beside the factory.',
    'Bagasse is burned to <b>produce electricity</b>, which makes it a renewable energy source for the island.');
  q('g6-land-use', 'industry', 2, 'The Beau Plan sugar mill has been converted into a ...',
    ['museum', 'factory', 'hotel', 'hospital'],
    'It now tells the story of sugar.',
    'Beau Plan is now <b>a museum</b>, L\'Aventure du Sucre, which explains the history of sugar in Mauritius.');
  q('g6-land-use', 'industry', 2, 'Which industry makes clothes for export in Mauritius?',
    ['The textile industry', 'The fishing industry', 'The tea industry', 'The cement industry'],
    'Think about shirts and trousers.',
    'The <b>textile industry</b> produces clothing for export and employs many people in Mauritius.');
  q('g6-land-use', 'industry', 2, 'A tea factory is usually built close to the tea plantations because ...',
    ['leaves must be processed quickly', 'the land there is cheapest', 'the workers live far away', 'the roads there are widest'],
    'Fresh leaves do not keep.',
    'Tea leaves lose their quality soon after picking, so <b>they must be processed quickly</b> nearby.');
  q('g6-land-use', 'industry', 3, 'Give one advantage of building factories in an industrial zone.',
    ['Housing is kept away from noise', 'The factories pay no wages', 'The land becomes farmland', 'The workers need no transport'],
    'Think about the people living nearby.',
    'Putting factories together keeps <b>housing away from noise</b>, smoke and heavy traffic.');
  q('g6-land-use', 'industry', 3, 'Give one harmful effect of factories on the environment.',
    ['They release smoke into the air', 'They increase the rainfall', 'They enlarge the forests', 'They cool the whole island'],
    'Think about the chimney and the drain.',
    'Factories <b>release smoke into the air</b> and waste water into rivers, polluting both.');
  q('g6-land-use', 'industry', 3, 'Why has the number of working sugar factories in Mauritius fallen?',
    ['Small factories were merged', 'Sugar cane stopped growing', 'Sugar is no longer sold', 'Factories were flooded'],
    'Fewer, larger factories are cheaper to run.',
    'Many <b>small factories were merged</b> into a few large ones, which crush the cane more cheaply.');
  q('g6-land-use', 'industry', 3, 'Molasses, a by-product of the sugar factory, is used to make ...',
    ['rum', 'glass', 'cement', 'paper'],
    'It is a thick dark syrup that can be fermented.',
    'Molasses is fermented and distilled to make <b>rum</b>, another export of Mauritius.');
  q('g6-land-use', 'industry', 3, 'Why is the port important to industry in Mauritius?',
    ['Goods are imported and exported', 'It provides farmland', 'It stops cyclones forming', 'It supplies drinking water'],
    'The island depends on the sea for trade.',
    'Almost everything the country buys and sells passes through the port, so <b>goods are imported and exported</b> there.');

  // change over time (9)
  q('g6-land-use', 'change', 2, 'The area of land under sugar cane in Mauritius has ...',
    ['decreased over the years', 'increased every year', 'stayed exactly the same', 'doubled since 2000'],
    'Think about what has been built on old cane fields.',
    'The area under cane has <b>decreased</b>, as fields have been used for housing, roads, hotels and other crops.');
  q('g6-land-use', 'change', 2, 'Land used to build houses is known as ... land use.',
    ['residential', 'industrial', 'agricultural', 'recreational'],
    'Where do people live?',
    'Housing is <b>residential</b> land use.');
  q('g6-land-use', 'change', 2, 'Land used for parks and playgrounds is described as ... land use.',
    ['recreational', 'residential', 'industrial', 'agricultural'],
    'It is land for leisure.',
    'Parks, gardens and sports grounds are <b>recreational</b> land use.');
  q('g6-land-use', 'change', 2, 'The growth of towns over the surrounding countryside is called ...',
    ['urbanisation', 'deforestation', 'irrigation', 'reclamation'],
    'The word comes from "urban".',
    '<b>Urbanisation</b> is the spread of towns, which in Mauritius has taken over former cane land.');
  q('g6-land-use', 'change', 3, 'Give one reason why cane fields have been turned into housing estates.',
    ['The population has grown', 'Cane stopped growing there', 'The soil became too rich', 'The rainfall increased'],
    'More people need more homes.',
    '<b>The population has grown</b>, so more houses are needed, and flat cane land is easy to build on.');
  q('g6-land-use', 'change', 3, 'Give one problem caused by building on former farmland.',
    ['Less land is left for food', 'More rain falls each year', 'The soil becomes deeper', 'Rivers flow more slowly'],
    'What can the land no longer do?',
    'Once built on, land cannot be farmed again, so <b>less land is left for growing food</b> and more must be imported.');
  q('g6-land-use', 'change', 3, 'Why does covering land with concrete make flooding worse?',
    ['Rain cannot soak into the ground', 'Rain falls more heavily', 'Rivers become much deeper', 'The soil holds more water'],
    'Where does the rain go on a hard surface?',
    'On concrete <b>rain cannot soak into the ground</b>, so it runs off quickly and fills drains and rivers at once.');
  q('g6-land-use', 'change', 3, 'Compared with Mauritius, farmland in Rodrigues is mostly ...',
    ['small plots on slopes', 'large flat plantations', 'covered by sugar cane', 'used for tea only'],
    'Think about the shape of the land there.',
    'Rodrigues is hilly and dry, so farming is on <b>small plots on slopes</b> and in valleys, not large plantations.');
  q('g6-land-use', 'change', 3, 'Which land use has grown fastest along the coast of Mauritius in recent years?',
    ['Hotels and villas', 'Sugar cane fields', 'Tea plantations', 'Cattle pastures'],
    'Think about what tourists need.',
    '<b>Hotels and villas</b> have spread rapidly along the coast, replacing beaches, marshes and small farms.');

  // sustainability (15)
  q('g6-land-use', 'sustainability', 2, 'Farming without chemical fertilisers and pesticides is called ...',
    ['organic farming', 'plantation farming', 'intensive farming', 'pastoral farming'],
    'The produce is sold as chemical-free.',
    '<b>Organic farming</b> uses compost and natural methods instead of chemicals, which protects soil and health.');
  q('g6-land-use', 'sustainability', 2, 'Give one advantage of organic farming.',
    ['It protects soil and water', 'It needs no land at all', 'It uses more pesticides', 'It removes all rainfall'],
    'Think about what chemicals do to the land.',
    'Organic farming <b>protects soil and water</b>, because no chemicals wash off the fields into rivers.');
  q('g6-land-use', 'sustainability', 2, 'Rainwater can dissolve pesticides and then ...',
    ['contaminate ground water', 'make the soil deeper', 'stop plants from growing', 'increase the rainfall'],
    'Where does the rainwater go after it soaks in?',
    'Rainwater carries the chemicals down into the ground and can <b>contaminate ground water</b> that people drink.');
  q('g6-land-use', 'sustainability', 2, 'Watering crops drop by drop at the roots is called ...',
    ['drip irrigation', 'flood irrigation', 'spray irrigation', 'canal irrigation'],
    'It wastes almost no water.',
    '<b>Drip irrigation</b> delivers water straight to the roots, so very little is lost to evaporation.');
  q('g6-land-use', 'sustainability', 2, 'Growing a different crop in a field each season is called ...',
    ['crop rotation', 'crop spraying', 'crop harvesting', 'crop grading'],
    'The crops take turns.',
    '<b>Crop rotation</b> keeps the soil fertile and stops pests and diseases building up in one field.');
  q('g6-land-use', 'sustainability', 2, 'Which material is non-biodegradable?',
    ['Plastic', 'Paper', 'Food waste', 'Garden cuttings'],
    'Which one does not rot away?',
    '<b>Plastic</b> does not rot away, so it stays in the soil and the sea for hundreds of years.');
  q('g6-land-use', 'sustainability', 2, 'Newspapers can be recycled to make ...',
    ['paper bags', 'glass jars', 'metal cans', 'plastic bottles'],
    'A material is recycled into the same material.',
    'Old newspapers are pulped and made into new <b>paper bags</b> and cardboard, which saves trees.');
  q('g6-land-use', 'sustainability', 3, 'Give one reason why some plastic bags have been banned in Mauritius.',
    ['They block drains and pollute', 'They cost too much to buy', 'They tear far too easily', 'They rot away too quickly'],
    'Think about what happens after they are thrown away.',
    'Plastic bags <b>block drains and pollute</b> the land and sea, and animals swallow them and die.');
  q('g6-land-use', 'sustainability', 3, 'Why is waste dumping harmful to farmland?',
    ['Chemicals poison the soil', 'The soil becomes richer', 'More crops can be grown', 'The land holds more water'],
    'Think about what leaks out of a rubbish heap.',
    'Liquids leak from the waste and <b>chemicals poison the soil</b>, so crops will not grow well there.');
  q('g6-land-use', 'sustainability', 3, 'What does sustainable land use mean?',
    ['Using land without exhausting it', 'Using all the land at once', 'Leaving land completely unused', 'Selling land to other countries'],
    'It must still be useful for our children.',
    'Sustainable land use means <b>using land without exhausting it</b>, so future generations can still farm and live on it.');
  q('g6-land-use', 'sustainability', 3, 'Give one way a farmer can protect soil on a steep slope.',
    ['Plant trees along the slope', 'Remove all the grass', 'Plough straight downhill', 'Burn the topsoil'],
    'Roots hold soil in place.',
    '<b>Planting trees</b> and grass holds the soil with roots and slows the rain, so less soil is washed away.');
  q('g6-land-use', 'sustainability', 3, 'Why should forests on hill slopes not be cleared?',
    ['Soil would be washed away', 'Rain would stop falling', 'The hills would grow taller', 'Rivers would run cleaner'],
    'What holds the soil on a slope?',
    'Tree roots hold the soil. Without them <b>soil is washed away</b>, and the mud silts up rivers and lagoons.');
  q('g6-land-use', 'sustainability', 3, 'Which practice best conserves water on a farm?',
    ['Collecting rainwater in tanks', 'Watering fields at midday', 'Leaving taps running', 'Clearing all shade trees'],
    'Store it when it is plentiful.',
    '<b>Collecting rainwater in tanks</b> stores water from the wet season for use when the weather is dry.');
  q('g6-land-use', 'sustainability', 3, 'Composting kitchen waste helps a farmer because it ...',
    ['returns nutrients to the soil', 'kills all the earthworms', 'makes the soil more sandy', 'stops the rain soaking in'],
    'Rotted plant waste feeds the land.',
    'Compost <b>returns nutrients to the soil</b>, so less chemical fertiliser is needed and less waste is dumped.');
  q('g6-land-use', 'sustainability', 3, 'Give one way the government helps farmers in Rodrigues.',
    ['Providing water tanks', 'Removing their land', 'Banning all farming', 'Closing the markets'],
    'Water is the island\'s main difficulty.',
    'Rodrigues is dry, so the government supplies <b>water tanks</b> and seeds, and helps farmers reach markets.');

  // ══ g6-slaves-immigrants ════════════════════════════════════════════════
  // slavery (8)
  q('g6-slaves-immigrants', 'slavery', 1, 'From which continent were most slaves brought to Ile de France?',
    ['Africa', 'Europe', 'Asia', 'America'],
    'Think of Madagascar and Mozambique.',
    'Most slaves were brought from <b>Africa</b>, mainly from Madagascar and Mozambique.');
  q('g6-slaves-immigrants', 'slavery', 1, 'Name one country from which slaves were brought to Mauritius.',
    ['Mozambique', 'Portugal', 'England', 'Australia'],
    'It is on the east coast of Africa.',
    'Slaves were brought from <b>Mozambique</b> and Madagascar, and some from West Africa and India.');
  q('g6-slaves-immigrants', 'slavery', 2, 'Name one type of work done by slaves on the plantations.',
    ['Cutting sugar cane', 'Teaching in schools', 'Selling in shops', 'Running the government'],
    'They worked in the fields.',
    'Slaves did the hardest field work, such as <b>cutting sugar cane</b>, planting and carrying the harvest.');
  q('g6-slaves-immigrants', 'slavery', 2, 'Name one type of work done by slaves in Port Louis.',
    ['Loading ships at the port', 'Governing the island', 'Owning the plantations', 'Commanding the soldiers'],
    'Think about the harbour.',
    'In Port Louis slaves worked as dockers <b>loading ships</b>, and as masons, carpenters and domestic servants.');
  q('g6-slaves-immigrants', 'slavery', 2, 'Slaves who ran away from their masters were called ...',
    ['maroons', 'settlers', 'corsairs', 'planters'],
    'The name is linked to Le Morne.',
    'Runaway slaves were called <b>maroons</b>. They hid in the mountains and forests of the island.');
  q('g6-slaves-immigrants', 'slavery', 2, 'Where did runaway slaves usually hide?',
    ['In the mountains and forests', 'In the harbour warehouses', 'In the sugar factories', 'In the government offices'],
    'They needed places hard to reach.',
    'They hid <b>in the mountains and forests</b>, especially at Le Morne Brabant, which was difficult to climb.');
  q('g6-slaves-immigrants', 'slavery', 3, 'Give one reason why slaves ran away from their masters.',
    ['They were treated harshly', 'They were paid too much', 'They owned the plantation', 'They worked too few hours'],
    'Think about their living conditions.',
    'Slaves ran away because <b>they were treated harshly</b>: long hours, punishment and no freedom.');
  q('g6-slaves-immigrants', 'slavery', 3, 'After 1835, how did many freed slaves earn a living in the interior?',
    ['By fishing and small farming', 'By owning sugar factories', 'By governing the island', 'By commanding ships'],
    'They left the plantations behind.',
    'Many refused to return to the estates and lived <b>by fishing and small farming</b> in coastal villages and the interior.');

  // indentured labourers (8)
  q('g6-slaves-immigrants', 'indentured', 1, 'From which country did most indentured labourers come?',
    ['India', 'China', 'Madagascar', 'Mozambique'],
    'They arrived at the Aapravasi Ghat.',
    'Most indentured labourers came from <b>India</b>, arriving in Mauritius from 1834 onwards.');
  q('g6-slaves-immigrants', 'indentured', 2, 'Indentured labourers came to Mauritius to work mainly ...',
    ['in the cane fields', 'in the government', 'as ship captains', 'as plantation owners'],
    'They replaced the freed slaves.',
    'They were brought to work <b>in the cane fields</b> after the abolition of slavery left the estates short of labour.');
  q('g6-slaves-immigrants', 'indentured', 2, 'Name one port in India from which indentured labourers embarked.',
    ['Calcutta', 'Colombo', 'Shanghai', 'Zanzibar'],
    'It is in the north-east of India.',
    'Most sailed from <b>Calcutta</b>, and others from Madras and Bombay.');
  q('g6-slaves-immigrants', 'indentured', 2, 'Name one food item given to indentured labourers as rations.',
    ['Rice', 'Bread', 'Cheese', 'Butter'],
    'It was the staple of their diet.',
    'Rations included <b>rice</b>, dhal, salted fish, oil and salt.');
  q('g6-slaves-immigrants', 'indentured', 2, 'Indentured labourers lived on the estates in ...',
    ['camps', 'hotels', 'castles', 'caves'],
    'They were long buildings divided into rooms.',
    'They lived in <b>camps</b>, rows of small rooms built on the estate near the fields.');
  q('g6-slaves-immigrants', 'indentured', 3, 'How did indentured labour differ from slavery?',
    ['Labourers signed a contract', 'Labourers were never paid', 'Labourers could be sold', 'Labourers had no families'],
    'Something was agreed before they came.',
    'Indentured labourers <b>signed a contract</b> for a fixed number of years and were paid a wage, although conditions were still very hard.');
  q('g6-slaves-immigrants', 'indentured', 3, 'Give one contribution of Indian immigrants to Mauritius.',
    ['They developed the sugar industry', 'They discovered the island', 'They built the first fort', 'They brought the dodo'],
    'Think about the fields and the culture.',
    'They <b>developed the sugar industry</b> with their labour, and later bought land and brought languages, festivals and religions.');
  q('g6-slaves-immigrants', 'indentured', 3, 'When Indian labourers had finished their contracts, many of them ...',
    ['bought small plots of land', 'returned to Africa', 'became ship owners', 'left for Australia'],
    'This is how the "grand morcellement" began.',
    'Many <b>bought small plots of land</b> from the estates and grew their own cane, becoming small planters.');

  // Aapravasi Ghat (5)
  q('g6-slaves-immigrants', 'aapravasi', 1, 'Where is the Aapravasi Ghat located?',
    ['Port Louis', 'Mahebourg', 'Souillac', 'Curepipe'],
    'It is beside the harbour of the capital.',
    'The Aapravasi Ghat is in <b>Port Louis</b>, at the place where immigrants landed.');
  q('g6-slaves-immigrants', 'aapravasi', 1, 'What is the Aapravasi Ghat?',
    ['The immigration depot', 'A sugar factory', 'A military fort', 'A royal palace'],
    'It is where new arrivals were received.',
    'It was <b>the immigration depot</b> where indentured labourers first landed and were registered.');
  q('g6-slaves-immigrants', 'aapravasi', 2, 'On which date is the arrival of Indian indentured labourers commemorated?',
    ['2nd November', '1st February', '12th March', '15th August'],
    'It is a public holiday in Mauritius.',
    'Arrival of Indentured Labourers Day is <b>2 November</b>, marking the first arrivals in 1834.');
  q('g6-slaves-immigrants', 'aapravasi', 2, 'The Aapravasi Ghat has been listed by UNESCO as a ...',
    ['World Heritage Site', 'nature reserve', 'national park', 'marine park'],
    'It is protected for the whole world.',
    'It was inscribed as a <b>World Heritage Site</b> in 2006, because it is where modern indenture began.');
  q('g6-slaves-immigrants', 'aapravasi', 3, 'Why is the Aapravasi Ghat important to Mauritians today?',
    ['Many trace their ancestors there', 'It is the largest sugar mill', 'It is the highest mountain', 'It is the busiest airport'],
    'Think about family history.',
    'Nearly half a million labourers passed through it, so <b>many Mauritians trace their ancestors there</b>.');

  // abolition (4)
  q('g6-slaves-immigrants', 'abolition', 1, 'In which year was slavery abolished in Mauritius?',
    ['1835', '1715', '1810', '1968'],
    'It happened under British rule.',
    'Slavery was abolished on 1 February <b>1835</b>, under British rule.');
  q('g6-slaves-immigrants', 'abolition', 2, 'The abolition of slavery is commemorated each year on ...',
    ['1st February', '2nd November', '12th March', '3rd October'],
    'It is a public holiday early in the year.',
    'Abolition of Slavery Day is <b>1 February</b>, the date slavery ended in 1835.');
  q('g6-slaves-immigrants', 'abolition', 2, 'After abolition the planters faced a shortage of ...',
    ['field labour', 'sugar cane', 'rainfall', 'ships'],
    'The freed slaves left the estates.',
    'Freed slaves refused to go on working in the fields, so the planters lacked <b>field labour</b> and brought in indentured workers.');
  q('g6-slaves-immigrants', 'abolition', 3, 'Which monument in Mauritius recalls the struggle of slaves for freedom?',
    ['The Slave Route Monument', 'The Blue Penny Museum', 'The Citadel of Port Louis', 'The Pamplemousses Garden'],
    'It stands at the foot of a mountain in the south-west.',
    'The <b>Slave Route Monument</b> stands at the foot of Le Morne Brabant, where maroons took refuge.');

  // Chinese immigrants (3)
  q('g6-slaves-immigrants', 'chinese', 1, 'Where did the early Chinese immigrants settle in Mauritius?',
    ['Port Louis', 'Mahebourg', 'Souillac', 'Ferney'],
    'The area is still called China Town.',
    'The early Chinese settled in <b>Port Louis</b>, in the area now known as China Town.');
  q('g6-slaves-immigrants', 'chinese', 2, 'What was the main occupation of the Chinese immigrants?',
    ['Trade and shopkeeping', 'Cutting sugar cane', 'Building the roads', 'Commanding the ships'],
    'Think of the village shop.',
    'Most Chinese immigrants went into <b>trade and shopkeeping</b>, opening shops in towns and villages.');
  q('g6-slaves-immigrants', 'chinese', 3, 'Give one cultural contribution of the Chinese community to Mauritius.',
    ['The Spring Festival', 'The Aapravasi Ghat', 'The sega dance', 'The Creole language'],
    'It is celebrated with firecrackers.',
    'The <b>Spring Festival</b>, or Chinese New Year, is a public holiday celebrated across Mauritius.');

  // colonial rule (3)
  q('g6-slaves-immigrants', 'colonial_rule', 2, 'In the 19th century Mauritius was a ... colony.',
    ['British', 'Dutch', 'French', 'Portuguese'],
    'The British took the island in 1810.',
    'Mauritius was a <b>British</b> colony from 1810 until independence in 1968.');
  q('g6-slaves-immigrants', 'colonial_rule', 2, 'Who was responsible for the protection of Ile de France?',
    ['Soldiers', 'Farmers', 'Traders', 'Settlers'],
    'They manned the forts and batteries.',
    '<b>Soldiers</b> defended the island, stationed in forts and barracks built around the coast.');
  q('g6-slaves-immigrants', 'colonial_rule', 3, 'Give one change the British brought to Mauritius.',
    ['They abolished slavery', 'They founded Port Louis', 'They planted the first cane', 'They named the island Ile de France'],
    'It happened in 1835.',
    'The British <b>abolished slavery</b> in 1835 and later brought in indentured labour from India.');

  // ══ g6-natural-hazards ══════════════════════════════════════════════════
  // cyclones (6)
  q('g6-natural-hazards', 'cyclones', 1, 'In which season do cyclones affect Mauritius?',
    ['Summer', 'Winter', 'Spring', 'Autumn'],
    'They come in the hot, wet months.',
    'Cyclones form in <b>summer</b>, between November and April, when the sea is warm.');
  q('g6-natural-hazards', 'cyclones', 2, 'A tropical cyclone forms over ...',
    ['warm ocean water', 'cold mountain air', 'dry desert land', 'frozen polar ice'],
    'It draws its energy from the sea.',
    'A cyclone forms over <b>warm ocean water</b>, which supplies the heat and moisture that drive it.');
  q('g6-natural-hazards', 'cyclones', 2, 'Which cyclone warning class means the danger is imminent?',
    ['Class 3', 'Class 1', 'Class 2', 'Class 4'],
    'Class 4 means the storm has already struck.',
    '<b>Class 3</b> warns that gusts of 120 km/h are expected within six hours. Class 4 means they have already occurred.');
  q('g6-natural-hazards', 'cyclones', 2, 'What does a Class 1 cyclone warning tell the population?',
    ['A cyclone may threaten in 36 hours', 'Gusts have already reached 120 km/h', 'The danger has completely passed', 'Schools will reopen at once'],
    'It is the earliest warning.',
    'Class 1 is issued when <b>a cyclone may threaten Mauritius within 36 hours</b>, so people begin to prepare.');
  q('g6-natural-hazards', 'cyclones', 3, 'Give one precaution to take before a cyclone.',
    ['Store food and water', 'Open all the windows', 'Go out to the beach', 'Cut down the shutters'],
    'You may be shut in for a day or more.',
    '<b>Storing food and water</b> is essential, because shops close and the water supply may be cut off.');
  q('g6-natural-hazards', 'cyclones', 3, 'Why is a tropical cyclone considered a natural hazard?',
    ['It destroys homes and crops', 'It brings the harvest early', 'It cools the island gently', 'It fills the reservoirs safely'],
    'A hazard threatens life and property.',
    'A cyclone <b>destroys homes and crops</b> with violent wind and flooding, and can cost lives.');

  // floods (5)
  q('g6-natural-hazards', 'floods', 2, 'Flash floods in Mauritius are caused by ...',
    ['heavy rain falling suddenly', 'light rain over many weeks', 'strong wind without rain', 'a long dry season'],
    'The word "flash" is the clue.',
    'A flash flood happens when <b>heavy rain falls suddenly</b> and the drains and rivers cannot carry the water away.');
  q('g6-natural-hazards', 'floods', 2, 'Give one reason why flash floods have become more frequent in Mauritius.',
    ['Drains are blocked by rubbish', 'Rainfall has stopped entirely', 'More forests have been planted', 'Rivers have been widened'],
    'Think about what stops water flowing away.',
    'Rubbish <b>blocks the drains</b>, so water cannot escape and floods the roads and houses.');
  q('g6-natural-hazards', 'floods', 3, 'How does building on flat land increase the risk of flooding?',
    ['Water cannot soak into concrete', 'Rain falls more heavily there', 'Rivers dry up completely', 'The soil absorbs more water'],
    'Compare a field with a car park.',
    'Concrete and tarmac are hard surfaces, so <b>water cannot soak in</b> and runs straight into drains and rivers.');
  q('g6-natural-hazards', 'floods', 3, 'Give one precaution to take during torrential rain.',
    ['Stay away from rivers', 'Cross flooded roads quickly', 'Shelter under a lone tree', 'Swim in the swollen river'],
    'Moving water is stronger than it looks.',
    '<b>Stay away from rivers</b> and flooded roads: even shallow moving water can sweep away a person or a car.');
  q('g6-natural-hazards', 'floods', 3, 'Which measure best reduces flooding in a town?',
    ['Cleaning the drains regularly', 'Paving over all the gardens', 'Dumping waste in canals', 'Building on the riverbank'],
    'Keep the water moving away.',
    '<b>Cleaning the drains regularly</b> lets rainwater flow away instead of backing up into the streets.');

  // tsunami (3)
  q('g6-natural-hazards', 'tsunami', 2, 'Which natural hazard is caused by an earthquake below the ocean floor?',
    ['Tsunami', 'Cyclone', 'Drought', 'Landslide'],
    'It arrives as a series of huge waves.',
    'A <b>tsunami</b> is a series of very large waves caused by an earthquake or a landslide under the sea.');
  q('g6-natural-hazards', 'tsunami', 3, 'What is often the first sign of an approaching tsunami on a beach?',
    ['The sea draws back suddenly', 'The wind stops blowing', 'The sand becomes hotter', 'Birds gather on the shore'],
    'The water leaves before it returns.',
    '<b>The sea draws back suddenly</b>, exposing the sea bed. Anyone on the beach should move inland at once.');
  q('g6-natural-hazards', 'tsunami', 3, 'What should a person on the coast do if a tsunami warning is given?',
    ['Move to higher ground', 'Run down to the beach', 'Swim out to a boat', 'Stand and watch the sea'],
    'Get above the water.',
    'The only safe action is to <b>move to higher ground</b>, away from the shore, as quickly as possible.');

  // earthquakes (3)
  q('g6-natural-hazards', 'earthquakes', 2, 'Earthquakes are caused by the movement of ...',
    ['tectonic plates', 'ocean currents', 'trade winds', 'river water'],
    'The Earth\'s crust is broken into pieces.',
    'The crust is made of <b>tectonic plates</b>. When they slip past each other the ground shakes.');
  q('g6-natural-hazards', 'earthquakes', 2, 'Which instrument records the strength of an earthquake?',
    ['A seismograph', 'A barometer', 'A rain gauge', 'A thermometer'],
    'The name comes from the Greek for shaking.',
    'A <b>seismograph</b> records the shaking of the ground and shows how strong an earthquake was.');
  q('g6-natural-hazards', 'earthquakes', 3, 'Give one effect of a strong earthquake on a town.',
    ['Buildings collapse', 'Rainfall increases', 'The soil becomes richer', 'Rivers flow faster'],
    'Think about what shaking does to walls.',
    'Violent shaking makes <b>buildings collapse</b>, which is the main cause of death in an earthquake.');

  // volcanoes (2)
  q('g6-natural-hazards', 'volcanoes', 2, 'Give one advantage of volcanoes to people.',
    ['They create fertile soil', 'They stop all rainfall', 'They cause flash floods', 'They destroy farmland'],
    'Think about what lava becomes after many years.',
    'Weathered lava breaks down into rich soil, so volcanoes <b>create fertile soil</b> for farming.');
  q('g6-natural-hazards', 'volcanoes', 3, 'Which volcano is still active in the Indian Ocean region?',
    ['Karthala', 'Trou aux Cerfs', 'Le Pouce', 'Bassin Blanc'],
    'It is in the Comoros.',
    '<b>Karthala</b>, in the Comoro Islands, is still active. The Mauritian craters are long extinct.');

  // drought (2)
  q('g6-natural-hazards', 'drought', 2, 'A long period with very little rain is called a ...',
    ['drought', 'cyclone', 'tsunami', 'flood'],
    'It is the opposite of a flood.',
    'A <b>drought</b> is a long spell of dry weather that empties reservoirs and kills crops.');
  q('g6-natural-hazards', 'drought', 3, 'Give one effect of drought on farmers in Rodrigues.',
    ['Crops wither and die', 'Fields are washed away', 'Soil becomes waterlogged', 'Rivers overflow the banks'],
    'What do plants lack?',
    'Without water <b>crops wither and die</b>, so farmers lose their harvest and animals go short of fodder.');

  // preparedness (2)
  q('g6-natural-hazards', 'preparedness', 2, 'Which item is most useful in a cyclone emergency kit?',
    ['A torch and batteries', 'A pair of sunglasses', 'A beach umbrella', 'A bicycle pump'],
    'The electricity is likely to fail.',
    'A <b>torch and batteries</b> are essential, because power cuts are common during and after a cyclone.');
  q('g6-natural-hazards', 'preparedness', 3, 'Why should a family agree on a plan before the cyclone season?',
    ['There is no time once it starts', 'Cyclones never reach Mauritius', 'The plan stops the wind', 'Warnings are never issued'],
    'Preparation has to happen early.',
    'Once a warning is issued <b>there is no time</b> to shop, repair a roof or find a shelter, so the plan must be ready.');

  // ══ g6-cultural-heritage (4) ════════════════════════════════════════════
  q('g6-cultural-heritage', 'unesco', 1, 'Which mountain in Mauritius is a UNESCO World Heritage Site?',
    ['Le Morne Brabant', 'Pieter Both', 'Le Pouce', 'Corps de Garde'],
    'Maroons took refuge on it.',
    '<b>Le Morne Brabant</b> was inscribed in 2008 as a symbol of the slaves\' resistance and their fight for freedom.');
  q('g6-cultural-heritage', 'sites', 2, 'The Frederick Hendrick Museum is found at ...',
    ['Vieux Grand Port', 'Port Louis', 'Mahebourg', 'Curepipe'],
    'It marks the first Dutch settlement.',
    'The museum is at <b>Vieux Grand Port</b>, where the Dutch landed in 1598 and settled in 1638.');
  q('g6-cultural-heritage', 'rodrigues', 2, 'Which cave is a well-known heritage attraction in Rodrigues?',
    ['Caverne Patate', 'Trou aux Cerfs', 'Grand Bassin', 'Le Souffleur'],
    'It lies in the limestone of Plaine Corail.',
    '<b>Caverne Patate</b> is a limestone cave at Plaine Corail, one of the main attractions of Rodrigues.');
  q('g6-cultural-heritage', 'protection', 3, 'Why is it important to protect historical sites?',
    ['They tell us about our past', 'They increase the rainfall', 'They provide farmland', 'They stop cyclones forming'],
    'Think about what is lost if they disappear.',
    'Historical sites <b>tell us about our past</b>. Once destroyed they cannot be replaced, and the story they carry is lost.');

})();
