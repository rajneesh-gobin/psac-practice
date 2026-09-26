'use strict';
(function () {
// Real explanations, keyed by id. Every question in this file used to say
// only "<b>X</b> is correct.", which tells a child nothing.
const G5HG_EXPL = {
  'g5hg-cov-dutch-discovery-0': "The <b>Dutch</b> landed in 1598 and named the island. The Portuguese had seen it earlier but never settled or renamed it.",
  'g5hg-cov-dutch-discovery-1': "They named it after <b>Prince Maurits of Nassau</b>, the ruler of the Netherlands at the time. \"Mauritius\" is the Latin form of Maurits.",
  'g5hg-cov-dutch-discovery-2': "The Dutch claimed the island in <b>1598</b>. That is the 1500s, so it falls in the 16th century.",
  'g5hg-cov-dutch-discovery-3': "Claiming is not the same as living there. The first real Dutch settlement came forty years later, in <b>1638</b>.",
  'g5hg-cov-dutch-discovery-4': "The voyage between Europe and the East Indies was long, and ships ran short. Mauritius offered <b>fresh food and water</b> halfway.",
  'g5hg-cov-dutch-discovery-5': "The <b>Dodo</b> had no natural enemies, so it never learned to fear people and could not fly away. It was extinct within about a century.",
  'g5hg-cov-dutch-discovery-6': "<b>Ebony</b> is a hard, dark wood that sold for high prices in Europe, so the Dutch cut and shipped large amounts of it.",
  'g5hg-cov-dutch-discovery-7': "The settlement never had enough to live on: <b>cyclones, droughts and shortages</b> ruined crops and supplies again and again.",
  'g5hg-cov-dutch-discovery-8': "They gave up for the last time in <b>1710</b>, which falls in the 18th century.",
  'g5hg-cov-dutch-discovery-9': "<b>Rats</b> came ashore from the ships. The Dodo nested on the ground, so its eggs were easy for them to reach.",
  'g5hg-cov-dutch-discovery-10': "It was <b>the first European settlement</b> on the island, and it began the changes to the forests and wildlife that followed.",
  'g5hg-cov-dutch-discovery-11': "The Dutch came from <b>the Netherlands</b>, also called Holland, in north-west Europe.",
  'g5hg-cov-dutch-discovery-12': "Settlers cleared land for crops and cut ebony to sell, so <b>some of the forest was cut down</b> and never grew back the same way.",
  'g5hg-cov-dutch-discovery-13': "The Dodo and the ebony forests both disappeared within a short time, which shows that <b>human actions can affect nature</b> very quickly.",
  'g5hg-cov-dutch-discovery-14': "<b>An old map or written record</b> was made at the time, so it is evidence. A modern story about the period is not.",
  'g5hg-cov-dutch-discovery-15': "Because it was far from any mainland, Mauritius had many <b>endemic plants and animals</b> — species found naturally nowhere else.",
  'g5hg-cov-dutch-discovery-16': "A settlement is <b>a place where people live</b> and stay, rather than simply visit.",
  'g5hg-cov-dutch-discovery-17': "Voyages lasted months. An island stop let a crew <b>repair the ship and take on supplies</b> before continuing.",
  'g5hg-cov-dutch-discovery-18': "The order is Dutch, then French, then British. So the Dutch period came before <b>the French settlement</b>.",
  'g5hg-cov-port-history-0': "<b>Mahé de Labourdonnais</b>, the French governor from 1735, built the harbour works, warehouses and roads that made Port Louis a real port.",
  'g5hg-cov-port-history-1': "Port Louis became the capital under the <b>French</b>, who ruled from 1715 to 1810.",
  'g5hg-cov-port-history-2': "<b>A sheltered bay</b> protects ships from open-sea waves and from cyclonic winds, which is what a harbour needs.",
  'g5hg-cov-port-history-3': "A harbour is a safe place for ships to <b>load, unload and shelter</b> out of rough water.",
  'g5hg-cov-port-history-4': "The French renamed it <b>Île de France</b>, and it kept that name for the whole French period.",
  'g5hg-cov-port-history-5': "Port Louis served two purposes at once: <b>trade</b>, and a base for <b>naval ships</b> guarding the route to India.",
  'g5hg-cov-port-history-6': "<b>Le Pouce</b>, in the Moka range, rises directly behind the city. Its shape gives it its name — the thumb.",
  'g5hg-cov-port-history-7': "A capital is <b>the main city of government</b>, where the country is run from.",
  'g5hg-cov-port-history-8': "Almost everything the island bought or sold travelled by sea, so <b>goods arrived and left by ship</b> through the harbour.",
  'g5hg-cov-port-history-9': "Mauritius is an island, so the port is its link to <b>other countries overseas</b>.",
  'g5hg-cov-port-history-10': "<b>Fort Adelaide</b>, known as the Citadel, was built on a hill so its guns could cover both the harbour and the town.",
  'g5hg-cov-port-history-11': "They are evidence you can still stand in front of, so <b>they tell us about the past</b> in a way no copy can.",
  'g5hg-cov-port-history-12': "Government House has long been the seat of <b>government and administration</b>, which is why it stands in the capital.",
  'g5hg-cov-port-history-13': "A museum keeps and explains real objects, so it helps visitors understand <b>our history and heritage</b>.",
  'g5hg-cov-port-history-14': "Three things grew together: <b>shipping, trade and government</b>. Each brought more people to the town.",
  'g5hg-cov-port-history-15': "Once a historic building is lost it cannot be replaced, and <b>it is part of our heritage</b> — it belongs to everyone.",
  'g5hg-cov-port-today-0': "Port Louis is the <b>capital city of Mauritius</b> and has been since the French period.",
  'g5hg-cov-port-today-1': "The capital holds the head offices, the ministries and the harbour, so it matters for <b>business, government and trade</b>.",
  'g5hg-cov-port-today-2': "Shops, offices and the market fill the city centre, so <b>buying and selling goods</b> goes on all day.",
  'g5hg-cov-port-today-3': "The harbour is still how goods reach the island, linking Mauritius to <b>other countries overseas</b>.",
  'g5hg-cov-port-today-4': "Most people come in for a reason: <b>work, shopping and services</b> such as banks and government offices.",
  'g5hg-cov-port-today-5': "The Central Market is where people <b>buy and sell many products</b> — vegetables, fruit, fish, cloth and crafts.",
  'g5hg-cov-port-today-6': "<b>Roads and public transport</b> carry workers in each morning and out again in the evening.",
  'g5hg-cov-port-today-7': "Traffic builds because <b>many people travel there for work</b> at the same times of day.",
  'g5hg-cov-port-today-8': "The city holds both new towers and <b>historic old buildings</b>, so its past and present stand side by side.",
  'g5hg-cov-port-today-9': "The capital is where the country is run from, so you would expect <b>offices of the government</b>.",
  'g5hg-cov-port-today-10': "A city belongs to everybody who uses it, so keeping it clean <b>protects a shared public place</b>.",
  'g5hg-cov-port-today-11': "A commercial centre is a place for <b>business, trade and shops</b> rather than for farming or housing.",
  'g5hg-cov-port-today-12': "A port receives <b>ships carrying goods</b> — food, fuel, machinery and materials from abroad.",
  'g5hg-cov-port-today-13': "<b>A museum of local history</b> keeps real objects and records, so people can learn from the evidence itself.",
  'g5hg-cov-port-today-14': "Port Louis sits on the <b>north-west coast</b>, on the sheltered side of the island away from the south-east trade winds.",
  'g5hg-cov-port-today-15': "One bus carries many passengers, so public transport <b>moves many people efficiently</b> and keeps cars off the road.",
  'g5hg-cov-port-today-16': "Heritage sites are fragile and shared, so the respectful way to visit is to <b>follow the rules and do no damage</b>.",
  'g5hg-cov-port-today-17': "People move to where there are <b>jobs and useful services</b>, and that is how a city grows.",
  'g5hg-cov-port-today-18': "People travel in from <b>many parts of Mauritius</b> to work, trade and study, so the capital brings the island together.",
};
const G5HG_LEARN = {
  'g5hg-cov-dutch-discovery-5': 'The <b>Dodo</b> was a flightless bird unique to Mauritius. Because it had no natural predators, it had never learned to fear humans or other animals. When Dutch settlers arrived, the Dodo could be approached and killed easily. Rats from the ships also raided its ground-level nests. Within about a century it was completely extinct.',
  'g5hg-cov-dutch-discovery-13': '<b>Endemic</b> species are plants or animals found naturally in one place and nowhere else in the world. Islands like Mauritius evolve unique wildlife in isolation. When people arrive, they bring new animals, clear forests and hunt — changes that can cause endemic species to disappear forever, as happened with the Dodo.',
  'g5hg-cov-dutch-discovery-15': '<b>Endemic</b> species evolved in isolation on one island and exist nowhere else. Mauritius had unique birds, plants and reptiles before any humans arrived. These species had no defences against hunters, rats or habitat loss brought by settlers, making island endemics especially vulnerable to extinction.',
  'g5hg-cov-dutch-discovery-16': 'A <b>settlement</b> is a place where people make their permanent home, as opposed to a brief stop or a trading visit. The Dutch first claimed Mauritius in 1598, but they only established a settlement — with houses, farms and a community — forty years later, in 1638.',
  'g5hg-cov-port-history-0': '<b>Mahé de Labourdonnais</b> was French governor of Mauritius from 1735. He transformed Port Louis from a small anchorage into a working port and capital city, constructing a harbour wall, warehouses, a hospital and roads. Without his work, the island could not have served as a naval and trading base.',
  'g5hg-cov-port-history-7': 'A <b>capital city</b> is the seat of a country\'s government — the city where laws are made, where the head of state resides, and where main government offices are found. It is not always the largest city, but it is always the most politically important one.',
  'g5hg-cov-port-today-0': 'A <b>capital city</b> is where a country\'s national government is based — the centre of political power, home to ministries, parliament, and the courts. Port Louis has been Mauritius\'s capital since the French period in the 18th century, and today it is also the country\'s main business and trading hub.',
};
  const add=(id,c,s,q,o,a,h)=>STATIC_QUESTIONS.push(makeMCQ({id,chapterId:c,subsection:s,difficulty:2,question:q,options:o,answer:a,hint:h,explanation:G5HG_EXPL[id]||`<b>${a}</b> is correct.`,learnMore:G5HG_LEARN[id]||''}));
  const H='Think about the first settlers, their reasons for stopping, and their impact.';
  add('g5hg-cov-dutch-discovery-0','discovery','dutch','Which European nation gave Mauritius its present name?',['the Dutch, from Holland','the Portuguese, from Portugal','the French, from France','the British, from England'],'the Dutch, from Holland',H);
  add('g5hg-cov-dutch-discovery-1','discovery','dutch','Mauritius was named after…',['Prince Maurits of Nassau','King Louis XIV of France','Queen Victoria of England','Admiral Vasco da Gama'],'Prince Maurits of Nassau',H);
  add('g5hg-cov-dutch-discovery-2','discovery','dutch','The Dutch first claimed Mauritius in…',['1598, in the 16th century','1638, in the 17th century','1715, in the 18th century','1810, in the 19th century'],'1598, in the 16th century',H);
  add('g5hg-cov-dutch-discovery-3','discovery','dutch','The first Dutch settlement began in…',['1638, in the 17th century','1598, in the 16th century','1715, in the 18th century','1710, in the 18th century'],'1638, in the 17th century',H);
  add('g5hg-cov-dutch-discovery-4','discovery','dutch','Why did Dutch sailors use Mauritius as a stop?',['to get fresh food and water','to trade with local people','to find gold and silver','to build a permanent colony'],'to get fresh food and water',H);
  add('g5hg-cov-dutch-discovery-5','discovery','dutch','Which bird was hunted after Dutch settlement?',['the Dodo, a flightless bird','the flamingo, a wading bird','the parrot, a talking bird','the albatross, a seabird'],'the Dodo, a flightless bird',H);
  add('g5hg-cov-dutch-discovery-6','discovery','dutch','Which tree did the Dutch cut for valuable wood?',['ebony, a valuable wood','mahogany, a tropical wood','teak, a hardwood','bamboo, a fast-growing plant'],'ebony, a valuable wood',H);
  add('g5hg-cov-dutch-discovery-7','discovery','dutch','Why did the Dutch settlement face difficulties?',['cyclones, droughts and shortages','attacks by rival nations','disease and poisonous animals','earthquakes and floods'],'cyclones, droughts and shortages',H);
  add('g5hg-cov-dutch-discovery-8','discovery','dutch','The Dutch left Mauritius for the last time in…',['1710, in the 18th century','1638, in the 17th century','1810, in the 19th century','1598, in the 16th century'],'1710, in the 18th century',H);
  add('g5hg-cov-dutch-discovery-9','discovery','dutch','Which animal introduced by people harmed Dodo eggs?',['rats brought by the ships','dogs brought by settlers','cats kept on the island','mongooses released in forests'],'rats brought by the ships',H);
  add('g5hg-cov-dutch-discovery-10','discovery','dutch','Why is the Dutch period important?',['the first European settlement','the first time ships ever visited','the first time sugar was grown','the first permanent port built'],'the first European settlement',H);
  add('g5hg-cov-dutch-discovery-11','discovery','dutch','The Dutch came mainly from…',['the Netherlands, in Europe','France, in Europe','Portugal, in Europe','England, in Europe'],'the Netherlands, in Europe',H);
  add('g5hg-cov-dutch-discovery-12','discovery','dutch','What happened to much native forest during early settlement?',['some of it was cut down','it was burned for warmth','it was protected by law','it was left untouched'],'some of it was cut down',H);
  add('g5hg-cov-dutch-discovery-13','discovery','dutch','What can we learn from the Dutch period?',['human actions can affect nature','islands are easy to settle','European sailors always succeeded','nature always recovers quickly'],'human actions can affect nature',H);
  add('g5hg-cov-dutch-discovery-14','discovery','dutch','Which is a source about Dutch settlement?',['an old map or written record','a modern painting of the ships','a recent novel about the period','a film made today'],'an old map or written record',H);
  add('g5hg-cov-dutch-discovery-15','discovery','dutch','Before Dutch settlement, Mauritius had many…',['endemic plants and animals','large human settlements','wild domestic animals','foreign invasive plants'],'endemic plants and animals',H);
  add('g5hg-cov-dutch-discovery-16','discovery','dutch','What does "settlement" mean?',['a place where people live','a long sea voyage','a type of trade route','a kind of ship'],'a place where people live',H);
  add('g5hg-cov-dutch-discovery-17','discovery','dutch','Why did ships need an island stop on long voyages?',['to repair and take supplies','to pay taxes to local rulers','to trade goods with settlers','to hire new sailors'],'to repair and take supplies',H);
  add('g5hg-cov-dutch-discovery-18','discovery','dutch','The Dutch period came before which settlement?',['the French settlement','the British settlement','the Portuguese settlement','the Spanish settlement'],'the French settlement',H);

  const PH='Use the clues about the harbour, capital and old buildings.';
  add('g5hg-cov-port-history-0','port-louis','history','Who developed Port Louis as a major harbour?',['Mahé de Labourdonnais','Napoleon Bonaparte','Governor Robert Farquhar','Pierre Poivre'],'Mahé de Labourdonnais',PH);
  add('g5hg-cov-port-history-1','port-louis','history','Port Louis became the capital during the…',['French period, 1715-1810','Dutch period, 1638-1710','British period, 1810-1968','independence period, after 1968'],'French period, 1715-1810',PH);
  add('g5hg-cov-port-history-2','port-louis','history','Why was Port Louis a useful place for a harbour?',['it has a sheltered bay','it has a wide sandy beach','it is the highest point on the island','it has a river that flows to the sea'],'it has a sheltered bay',PH);
  add('g5hg-cov-port-history-3','port-louis','history','A harbour allows ships to…',['load, unload and shelter','fly flags and give signals','store food underground','repair engines in dry docks'],'load, unload and shelter',PH);
  add('g5hg-cov-port-history-4','port-louis','history','What was Mauritius called during French rule?',["Île de France, or Isle of France","La Belle Province de l'Est","Île aux Cerfs de l'Océan","Île Rodrigues de France"],'Île de France, or Isle of France',PH);
  add('g5hg-cov-port-history-5','port-louis','history','Why did the French develop Port Louis?',['for trade and naval ships','as a pleasure resort','for growing sugar on the coast','as a place for settlers to retire'],'for trade and naval ships',PH);
  add('g5hg-cov-port-history-6','port-louis','history','Which mountain overlooks Port Louis?',['Le Pouce, in the Moka range','Le Morne, in the south','Piton de la Petite Rivière Noire','Pieter Both, with a rocky top'],'Le Pouce, in the Moka range',PH);
  add('g5hg-cov-port-history-7','port-louis','history','What is a capital city?',['the main city of government','the largest city in the country','the oldest city in the country','the city nearest the sea'],'the main city of government',PH);
  add('g5hg-cov-port-history-8','port-louis','history','How did a harbour help the island\'s trade?',['goods arrive and leave by ship','prices were set by the governor','goods were stored underground','traders came overland from the interior'],'goods arrive and leave by ship',PH);
  add('g5hg-cov-port-history-9','port-louis','history','A port is important because it connects Mauritius with…',['other countries overseas','nearby towns and villages','farms in the interior','schools around the island'],'other countries overseas',PH);
  add('g5hg-cov-port-history-10','port-louis','history','Which was built to protect Port Louis?',['Fort Adelaide (the Citadel)','the Natural History Museum','Government House','the Central Market'],'Fort Adelaide (the Citadel)',PH);
  add('g5hg-cov-port-history-11','port-louis','history','Why are old Port Louis buildings important?',['they tell us about the past','they are made of steel and glass','they are cheaper to build today','they need no maintenance'],'they tell us about the past',PH);
  add('g5hg-cov-port-history-12','port-louis','history','Government House is linked with…',['government and administration','market trading and commerce','naval defence only','tourism and hotel services'],'government and administration',PH);
  add('g5hg-cov-port-history-13','port-louis','history','What can a museum help visitors understand?',['our history and heritage','how to cook local dishes','how to sail a boat','how to grow tropical plants'],'our history and heritage',PH);
  add('g5hg-cov-port-history-14','port-louis','history','Port Louis grew because of…',['shipping, trade and government','tourism, beaches and hotels','farming, fishing and forestry','mining, quarrying and industry'],'shipping, trade and government',PH);
  add('g5hg-cov-port-history-15','port-louis','history','A historical building should be cared for because…',['it is part of our heritage','it is always the cheapest to repair','modern buildings can replace it exactly','old buildings never need maintenance'],'it is part of our heritage',PH);

  const PT='Think about how a capital city works today.';
  add('g5hg-cov-port-today-0','port-louis','today','Port Louis is the…',['capital city of Mauritius','largest beach resort','oldest fishing village','industrial town of the south'],'capital city of Mauritius',PT);
  add('g5hg-cov-port-today-1','port-louis','today','Today Port Louis is important for…',['business, government and trade','farming, fishing and forestry','tourism, beaches and hotels','mining, quarrying and manufacturing'],'business, government and trade',PT);
  add('g5hg-cov-port-today-2','port-louis','today','Which activity is common in Port Louis?',['buying and selling goods','deep-sea fishing','farming sugar cane','growing spices in gardens'],'buying and selling goods',PT);
  add('g5hg-cov-port-today-3','port-louis','today','The harbour still connects Mauritius to…',['other countries overseas','nearby towns by road','farms in the interior','schools across the island'],'other countries overseas',PT);
  add('g5hg-cov-port-today-4','port-louis','today','Why do people visit Port Louis?',['for work, shopping and services','to enjoy quiet beaches','to visit sugar cane fields','to go hiking in the mountains'],'for work, shopping and services',PT);
  add('g5hg-cov-port-today-5','port-louis','today','The Central Market is a place where people…',['buy and sell many products','watch ships arrive and depart','attend government meetings','perform religious ceremonies'],'buy and sell many products',PT);
  add('g5hg-cov-port-today-6','port-louis','today','What helps workers travel to Port Louis?',['roads and public transport','boats along the coast','helicopters from other towns','horse-drawn carts'],'roads and public transport',PT);
  add('g5hg-cov-port-today-7','port-louis','today','Why can traffic be busy in Port Louis?',['many travel there for work','the roads are very narrow','there are no traffic lights','cars must park in the centre'],'many travel there for work',PT);
  add('g5hg-cov-port-today-8','port-louis','today','Port Louis has both modern offices and…',['historic old buildings','tall mountains on every side','wide sandy beaches','large farming fields'],'historic old buildings',PT);
  add('g5hg-cov-port-today-9','port-louis','today','Which service is likely found in a capital?',['offices of the government','remote jungle lodges','deep-sea fishing centres','mountain climbing clubs'],'offices of the government',PT);
  add('g5hg-cov-port-today-10','port-louis','today','Why should visitors keep the city clean?',['to protect a shared public place','because cleaners need less work','because streets clean themselves','because fines are very high'],'to protect a shared public place',PT);
  add('g5hg-cov-port-today-11','port-louis','today','A commercial centre is a place for…',['business, trade and shops','farming and growing food','camping and outdoor activities','military defence'],'business, trade and shops',PT);
  add('g5hg-cov-port-today-12','port-louis','today','What can a port receive from abroad?',['ships that carry goods','trains from other countries','planes carrying passengers only','rivers from the interior'],'ships that carry goods',PT);
  add('g5hg-cov-port-today-13','port-louis','today','Which place helps people learn about Mauritian history?',['a museum of local history','a shopping mall','a sports stadium','an outdoor market'],'a museum of local history',PT);
  add('g5hg-cov-port-today-14','port-louis','today','Port Louis is located on the…',['north-west coast of Mauritius','south-east coast of Mauritius','eastern coast of Mauritius','southern tip of Mauritius'],'north-west coast of Mauritius',PT);
  add('g5hg-cov-port-today-15','port-louis','today','Why is public transport useful in a city?',['it moves many people efficiently','it is always faster than cars','it is free for everyone','it stops traffic completely'],'it moves many people efficiently',PT);
  add('g5hg-cov-port-today-16','port-louis','today','What is one respectful way to visit heritage sites?',['follow the rules and do no damage','take small pieces as souvenirs','photograph signs without permission','climb on old walls for a better view'],'follow the rules and do no damage',PT);
  add('g5hg-cov-port-today-17','port-louis','today','A city can grow when it has…',['jobs and useful services','long sandy beaches','deep forests and rivers','cold weather and snow'],'jobs and useful services',PT);
  add('g5hg-cov-port-today-18','port-louis','today','Port Louis is a meeting place for people from…',['many parts of Mauritius','only the northern districts','only capital residents','other islands in the Indian Ocean'],'many parts of Mauritius',PT);
})();
