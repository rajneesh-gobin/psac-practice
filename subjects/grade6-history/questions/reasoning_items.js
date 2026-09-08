'use strict';
// Grade 6 History & Geography - REASON-GIVING questions.
//
// WHY THIS FILE EXISTS
// Measured 2026-09-09, classifying the HG 2024 modular paper against its own
// mark allocations and a random 40-item sample of the bank against the same
// scheme:
//
//              recall   apply (read a map/picture)   explain
//   paper        48%              12%                  40%
//   bank       72.5%              15%                12.5%
//
// ⚠ THIS PACK'S GAP IS NOT THE SAME AS SCIENCE'S. Science was short of
//   diagram-reading (17.5% against 30%); History is already AT the paper's
//   apply level and is short of REASONS by 27.5 points. Writing diagram items
//   here would have been the wrong work - which is why the pack was measured
//   before anything was written rather than after.
//
// The paper is full of "give two reasons why", "give two ways", "give two
// advantages", and pays 2-4 marks each: Q3(a)(ii) hotels on the coast [4],
// Q5 precautions/floods/volcanoes [8], Q2(b)(iii) sustainable farming [2],
// Q6(b) why symbols matter [2], Q7(a)(ii) why museums matter [2].
//
// ⚠ An MCQ cannot make a child PRODUCE a reason, only recognise one - the
//   paper wants it written. These narrow the gap; they do not close it. The
//   distractors are therefore all plausible-sounding reasons, so recognising
//   the right one still requires knowing why.

STATIC_QUESTIONS.push(

  // ── Land use: tourism, farming, sustainability ──────────────────────────

  makeMCQ({ id:'g6h-why-001', chapterId:'g6-land-use', subsection:'tourism', difficulty:3,
    question:'Most tourist hotels in Mauritius are built in <b>coastal</b> regions. Give one reason why.',
    options:['Tourists come for the beaches and lagoon','The coast has the most fertile soil','Coastal land is the cheapest to buy','The coast is cooler than inland areas'],
    answer:'Tourists come for the beaches and lagoon',
    hint:'Think about what visitors actually come to Mauritius to do.',
    explanation:'Hotels are built on the coast because that is where the <b>beaches, lagoon and water sports</b> are - the main reason tourists visit. Inland land is often more fertile and is used for farming instead.' }),

  makeMCQ({ id:'g6h-why-002', chapterId:'g6-land-use', subsection:'sustainability', difficulty:3,
    question:'Give one way in which farmers in Mauritius practise <b>sustainable</b> agriculture.',
    options:['They make compost from farm waste','They clear forest for new fields','They burn the waste after harvest','They plant the same crop every year'],
    answer:'They make compost from farm waste',
    hint:'Sustainable means the land can still be farmed by the next generation.',
    explanation:'Making <b>compost</b> returns nutrients to the soil without chemicals. Clearing forest, burning waste and growing one crop repeatedly all damage the soil or the environment.' }),

  makeMCQ({ id:'g6h-why-003', chapterId:'g6-land-use', subsection:'sustainability', difficulty:3,
    question:'Why is <b>organic farming</b> encouraged in Mauritius and Rodrigues?',
    options:['It avoids chemicals that harm soil and water','It always produces a much larger harvest','It needs no watering during dry months','It is the cheapest way to farm land'],
    answer:'It avoids chemicals that harm soil and water',
    hint:'Think about what organic farming leaves OUT.',
    explanation:'Organic farming uses no chemical pesticides or fertilisers, so the <b>soil, rivers and lagoon are not contaminated</b>. It is usually more expensive and lower-yielding, not less.' }),

  makeMCQ({ id:'g6h-why-004', chapterId:'g6-land-use', subsection:'sustainability', difficulty:3,
    question:'Why can the heavy use of <b>fertilisers and pesticides</b> harm the environment?',
    options:['Rain washes them into rivers and the lagoon','They make the soil too hard to plough','They stop rain from soaking into the ground','They attract more insects to the fields'],
    answer:'Rain washes them into rivers and the lagoon',
    hint:'Where do the chemicals go when it rains on a field?',
    explanation:'Rainwater dissolves the chemicals and carries them off the fields into <b>rivers and the lagoon</b>, poisoning fish and damaging coral. This is why organic methods are encouraged.' }),

  makeMCQ({ id:'g6h-why-005', chapterId:'g6-land-use', subsection:'agriculture', difficulty:3,
    question:'On the steep slopes of Rodrigues, crops are grown on <b>terraces</b>. Give one reason why.',
    options:['Terraces stop the soil washing away','Terraces make the crops ripen sooner','Terraces keep animals off the fields','Terraces need no watering at all'],
    answer:'Terraces stop the soil washing away',
    hint:'What happens to loose soil on a steep slope when it rains hard?',
    explanation:'Terracing cuts a slope into flat steps so rainwater cannot run straight down it. That prevents <b>soil erosion</b> and holds water where the roots are.' }),

  makeMCQ({ id:'g6h-why-006', chapterId:'g6-land-use', subsection:'sustainability', difficulty:2,
    question:'Why have some kinds of <b>plastic bag</b> been banned in Mauritius?',
    options:['They do not rot and they choke wildlife','They are more expensive than paper bags','They cannot be carried in the rain','They are too weak to hold shopping'],
    answer:'They do not rot and they choke wildlife',
    hint:'Think about what happens to a plastic bag thrown into a river.',
    explanation:'Plastic bags are <b>non-biodegradable</b>: they last for centuries, block drains and are swallowed by turtles and fish that mistake them for food.' }),

  makeMCQ({ id:'g6h-why-007', chapterId:'g6-land-use', subsection:'change', difficulty:3,
    question:'The area of land under sugar cane in Mauritius has <b>fallen</b> over recent decades. Give one reason why.',
    options:['Land has been taken for housing and hotels','Sugar cane no longer grows in our climate','The government has banned sugar exports','Sugar cane needs soil found only abroad'],
    answer:'Land has been taken for housing and hotels',
    hint:'Look at what has been built on former cane fields.',
    explanation:'As the population and the tourist industry grew, cane land was converted to <b>housing, roads, hotels and industrial estates</b>. The economy also diversified away from depending on sugar alone.' }),

  makeMCQ({ id:'g6h-why-008', chapterId:'g6-land-use', subsection:'tourism', difficulty:2,
    question:'In Rodrigues, many guest houses and small hotels are found at <b>Port Mathurin</b>. Give one reason why.',
    options:['It is the main town and port of the island','It is the highest point on the island','It is the only place with farmland','It is the coldest part of the island'],
    answer:'It is the main town and port of the island',
    hint:'Where do visitors to Rodrigues arrive, and where are the shops?',
    explanation:'Port Mathurin is the <b>capital and main port</b> of Rodrigues, so it has the harbour, the market, the shops and the transport links visitors need.' }),

  // ── Natural hazards ─────────────────────────────────────────────────────

  makeMCQ({ id:'g6h-why-009', chapterId:'g6-natural-hazards', subsection:'floods', difficulty:3,
    question:'Mauritius has suffered <b>more flash floods</b> in recent years. Give one reason why.',
    options:['Concrete and buildings cover more ground','The island receives far less rain now','The rivers have been made much wider','More forest has been planted on slopes'],
    answer:'Concrete and buildings cover more ground',
    hint:'Rain that cannot soak into the ground has to go somewhere.',
    explanation:'Building on flood plains and covering ground with concrete stops rain soaking in, so it runs off fast and floods low areas. <b>Deforestation and blocked drains</b> make it worse.' }),

  makeMCQ({ id:'g6h-why-010', chapterId:'g6-natural-hazards', subsection:'preparedness', difficulty:2,
    question:'Give one <b>precaution</b> a family should take during torrential rain.',
    options:['Stay indoors and away from rivers','Go outside to watch the water rise','Drive through flooded roads quickly','Shelter under a large tree'],
    answer:'Stay indoors and away from rivers',
    hint:'The danger is fast-moving water. What keeps you away from it?',
    explanation:'Staying indoors and away from rivers, drains and flooded roads is the safest action. Flood water moves faster and deeper than it looks, and sheltering under a tree risks lightning and falling branches.' }),

  makeMCQ({ id:'g6h-why-011', chapterId:'g6-natural-hazards', subsection:'volcanoes', difficulty:3,
    question:'Volcanoes can be <b>useful</b> to people. Give one advantage.',
    options:['Volcanic soil is very fertile for crops','Volcanoes keep the climate cool','Volcanoes stop earthquakes happening','Volcanic rock cannot be used at all'],
    answer:'Volcanic soil is very fertile for crops',
    hint:'Why do farmers settle near volcanoes despite the danger?',
    explanation:'Lava and ash break down into <b>very fertile soil</b>, which is why Mauritius grows cane so well. Volcanic areas also attract tourists and provide building stone and geothermal heat.' }),

  makeMCQ({ id:'g6h-why-012', chapterId:'g6-natural-hazards', subsection:'cyclones', difficulty:3,
    question:'Why is a tropical cyclone considered a <b>natural hazard</b>?',
    options:['Its winds and rain can destroy property','It is caused by people cutting down trees','It always arrives without any warning','It happens only once in a century now'],
    answer:'Its winds and rain can destroy property',
    hint:'A hazard is something that can cause harm to people and property.',
    explanation:'Cyclones bring violent winds, torrential rain, flooding and storm surge, which <b>damage homes, crops, roads and power lines</b> and can cost lives. They are forecast in advance, but the danger remains.' }),

  makeMCQ({ id:'g6h-why-013', chapterId:'g6-natural-hazards', subsection:'preparedness', difficulty:2,
    question:'Why does the Meteorological Services issue cyclone <b>warning classes</b>?',
    options:['To give people time to prepare and shelter','To decide which villages will be flooded','To measure how much rain has fallen','To record the cyclone for the history books'],
    answer:'To give people time to prepare and shelter',
    hint:'The classes are issued BEFORE the cyclone arrives. Why?',
    explanation:'Each class tells people how much time is left, so they can stock food and water, secure loose objects and get indoors. Class IV means the dangerous winds have already begun.' }),

  // ── Slaves, immigrants and the colonial period ──────────────────────────

  makeMCQ({ id:'g6h-why-014', chapterId:'g6-slaves-immigrants', subsection:'indentured', difficulty:3,
    question:'After 1840 the British brought many <b>Indian workers</b> to Mauritius. Give one reason why.',
    options:['Freed slaves had left the sugar estates','The island had no farmers of its own','Sugar cane had just been introduced','The French had taken all the workers'],
    answer:'Freed slaves had left the sugar estates',
    hint:'Slavery was abolished in 1835. What did the freed people do next?',
    explanation:'When slavery was abolished in 1835, most freed people <b>refused to keep working on the estates</b> and moved away. The planters needed a new workforce, so indentured labourers were recruited from India.' }),

  makeMCQ({ id:'g6h-why-015', chapterId:'g6-slaves-immigrants', subsection:'indentured', difficulty:3,
    question:'Many indentured labourers chose to <b>stay</b> in Mauritius after their contract ended. Give one reason why.',
    options:['They had built families and homes here','The ship home had been lost at sea','They were forbidden ever to leave','They were paid to return to India'],
    answer:'They had built families and homes here',
    hint:'A five-year contract is long enough for a life to take root.',
    explanation:'Many had married, had children and been given or had bought small plots of land. Returning meant giving that up for the poverty they had left, so most <b>settled permanently</b>.' }),

  makeMCQ({ id:'g6h-why-016', chapterId:'g6-slaves-immigrants', subsection:'slavery', difficulty:3,
    question:'Give one reason why some enslaved people <b>ran away</b> from the estates.',
    options:['To escape harsh treatment and long hours','Because they were given too much food','Because the estates were closing down','To take up paid work in the towns'],
    answer:'To escape harsh treatment and long hours',
    hint:'Think about the conditions on a sugar estate under slavery.',
    explanation:'Enslaved people worked from dawn to dusk, were poorly fed and were punished severely. Those who escaped were called <b>maroons</b>, and many hid in the mountains, including Le Morne.' }),

  makeMCQ({ id:'g6h-why-017', chapterId:'g6-slaves-immigrants', subsection:'chinese', difficulty:2,
    question:'Why did most early <b>Chinese immigrants</b> settle in Port Louis?',
    options:['It was the port and centre of trade','It had the best farmland on the island','It was the coolest place to live','It was the only town with a school'],
    answer:'It was the port and centre of trade',
    hint:'They came as traders and shopkeepers, not as field workers.',
    explanation:'Chinese immigrants came mainly to <b>trade</b>, so they settled where the harbour, the market and the customers were. The area they built is still called Chinatown.' }),

  // ── Heritage and identity ───────────────────────────────────────────────

  makeMCQ({ id:'g6h-why-018', chapterId:'g6-cultural-heritage', subsection:'sites', difficulty:3,
    question:'Why are <b>museums</b> important to a country?',
    options:['They keep objects from the past for everyone','They are the cheapest buildings to run','They replace the need for history lessons','They are only useful to visiting tourists'],
    answer:'They keep objects from the past for everyone',
    hint:'What would be lost if a country had no museum at all?',
    explanation:'A museum <b>preserves objects, documents and specimens</b> that cannot be replaced, and puts them where everyone - pupils, researchers and visitors - can learn from them.' }),

  makeMCQ({ id:'g6h-why-019', chapterId:'g6-cultural-heritage', subsection:'protection', difficulty:3,
    question:'Why must historical sites such as Aapravasi Ghat be <b>protected</b>?',
    options:['Once destroyed they cannot be rebuilt','They are the only old buildings left','The law requires all old walls to stay','They are needed for building materials'],
    answer:'Once destroyed they cannot be rebuilt',
    hint:'What makes an original site different from a copy of it?',
    explanation:'A historical site is the <b>actual place</b> where events happened. A replica is not the same thing, so once the original is lost the evidence and the memory go with it.' }),

  makeMCQ({ id:'g6h-why-020', chapterId:'g6-independence', subsection:'symbols', difficulty:3,
    question:'Why is it important for citizens to know their country\'s <b>national symbols</b>?',
    options:['They stand for the country\'s history and identity','They are needed to travel to other countries','They decide which language people speak','They are printed on every school textbook'],
    answer:'They stand for the country\'s history and identity',
    hint:'What does a flag or a coat of arms actually tell you about a nation?',
    explanation:'The flag, coat of arms, anthem and national flower carry the <b>story and values of the nation</b> - its struggle, its ocean, its wildlife. Knowing them is part of belonging to the country.' })

);
