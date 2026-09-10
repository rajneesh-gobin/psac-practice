'use strict';
(function () {

STATIC_QUESTIONS.push(

  // ── Our Islands & their Landforms — islands_republic ─────────────────────

  makeMCQ({ id:'g7sms-islands-013', chapterId:'g7sms-islands', difficulty:2, subsection:'islands_republic',
    question:'Saint Brandon (Cargados Carajos Shoals) is important to Mauritius mainly because it:',
    options:['It extends the maritime zone','It holds the largest population','It is the closest to Africa','It has the highest mountains'],
    answer:'It extends the maritime zone',
    hint:'Remote island territories often have strategic value for ocean resources.',
    explanation:'<b>Saint Brandon</b> is a group of low-lying coral islets about 400 km north of Mauritius. While largely uninhabited, it is important for <b>extending Mauritius\'s maritime zone</b> and for fishing operations in the surrounding waters.' }),

  makeMCQ({ id:'g7sms-islands-014', chapterId:'g7sms-islands', difficulty:1, subsection:'islands_republic',
    question:'Rodrigues has its own Regional Assembly. This means Rodrigues is:',
    options:['An autonomous region','A fully independent state','A dependency of France','A part of the mainland'],
    answer:'An autonomous region',
    hint:'Rodrigues has its own local government but is still part of Mauritius.',
    explanation:'Rodrigues is an <b>autonomous region of Mauritius</b> with its own <b>Rodrigues Regional Assembly</b> that manages local affairs. It is not independent — it remains part of the Republic of Mauritius, represented in the National Assembly.' }),

  makeMCQ({ id:'g7sms-islands-015', chapterId:'g7sms-islands', difficulty:2, subsection:'island_types',
    question:'Agaléga is classified as a coral island because:',
    options:['It is low, made of coral','It has active volcanoes','It is ringed by icebergs','It was made by a meteor'],
    answer:'It is low, made of coral',
    hint:'Coral islands are flat and made of compacted coral material.',
    explanation:'<b>Agaléga</b> is a <b>coral island</b> — flat and low-lying, made from coral limestone. Unlike Mauritius island (volcanic, mountainous), Agaléga has no significant elevation. The two islands (North and South) are connected by a sandbank at low tide.' }),

  makeMCQ({ id:'g7sms-islands-016', chapterId:'g7sms-islands', difficulty:3, subsection:'island_types',
    question:'What is the main environmental threat to coral atolls like Saint Brandon?',
    options:['Rising seas from global warming','Growing volcanic activity','Only invading foreign species','The mining of coral rock'],
    answer:'Rising seas from global warming',
    hint:'Low-lying islands have very little elevation above sea level.',
    explanation:'<b>Rising sea levels</b> due to global warming pose an existential threat to low-lying coral islands and atolls. Saint Brandon sits only a metre or two above sea level — a rise of 1–2 metres could <b>permanently submerge</b> much of it.' }),

  makeMCQ({ id:'g7sms-islands-017', chapterId:'g7sms-islands', difficulty:2, subsection:'landforms',
    question:'The lagoon of Mauritius is found between the coastline and:',
    options:['The coral reef','The central plateau','The river mouths','The mountain peaks'],
    answer:'The coral reef',
    hint:'A lagoon is the calm, shallow water trapped between the coast and the reef.',
    explanation:'Mauritius has a <b>fringing coral reef</b> that encircles most of the island. The calm, shallow water between the coast and the reef is the <b>lagoon</b>. It is important for tourism, fishing and provides natural protection against waves.' }),

  makeMCQ({ id:'g7sms-islands-018', chapterId:'g7sms-islands', difficulty:1, subsection:'landforms',
    question:'The highest point of Mauritius island rises to about:',
    options:['828 metres','820 metres','811 metres','556 metres'],
    answer:'828 metres',
    hint:'It is Piton de la Petite Rivière Noire, above the Black River Gorges.',
    explanation:'<b>Piton de la Petite Rivière Noire</b> reaches <b>828 m</b> and is the highest point on the island. <b>Pieter Both</b> (820 m) is second and is the easiest to recognise, because of the round boulder at its summit; <b>Le Pouce</b> is 811 m and <b>Le Morne Brabant</b> 556 m.' }),

  makeMCQ({ id:'g7sms-islands-019', chapterId:'g7sms-islands', difficulty:2, subsection:'landforms',
    question:'Rivers in Mauritius are generally short because:',
    options:['The island is small and steep','Mauritius gets very little rain','Colonists drained the rivers','The rock soaks up all water'],
    answer:'The island is small and steep',
    hint:'The size and shape of the island determines river length.',
    explanation:'Mauritius is a small island (about 65 km × 45 km) and its mountains are relatively central, close to all coasts. As a result, <b>rivers are short</b> — they flow quickly from the highlands to the coast, which can cause <b>flash flooding</b> after heavy rain.' }),

  makeTF({ id:'g7sms-islands-020', chapterId:'g7sms-islands', difficulty:1, subsection:'islands_republic',
    question:'Mauritius and La Réunion are both part of the Republic of Mauritius.',
    answer:'False',
    hint:'La Réunion belongs to another European country.',
    explanation:'<b>False.</b> La Réunion is a <b>French overseas territory (département)</b>, not part of the Republic of Mauritius. The Republic of Mauritius consists of Mauritius island, Rodrigues, Agaléga and Saint Brandon (Cargados Carajos Shoals).' }),

  makeTF({ id:'g7sms-islands-021', chapterId:'g7sms-islands', difficulty:2, subsection:'island_types',
    question:'Mauritius island was formed by volcanic activity on the ocean floor.',
    answer:'True',
    hint:'The presence of lava rock and the extinct Trou aux Cerfs crater are evidence.',
    explanation:'<b>True.</b> Mauritius is a <b>volcanic island</b>, formed by lava erupting from the ocean floor over millions of years. Evidence includes basalt rock across the island and the extinct volcanic crater <b>Trou aux Cerfs</b> in Curepipe.' }),

  // ── Origins, Heritage & Identity — historical_significance ───────────────

  makeMCQ({ id:'g7sms-origins-013', chapterId:'g7sms-origins', difficulty:1, subsection:'historical_significance',
    question:'The Dutch abandoned Mauritius in 1710. What did they introduce that had a lasting impact?',
    options:['Sugarcane and deer','Cotton and cattle','Tobacco and horses','Rice and elephants'],
    answer:'Sugarcane and deer',
    hint:'Both of these can still be found in Mauritius today.',
    explanation:'The Dutch introduced <b>sugarcane</b> to Mauritius — which became the foundation of the island\'s economy for centuries. They also introduced <b>deer</b>, which still inhabit the forests of Mauritius. They also contributed to the extinction of the dodo through over-hunting.' }),

  makeMCQ({ id:'g7sms-origins-014', chapterId:'g7sms-origins', difficulty:2, subsection:'historical_significance',
    question:'The Treaty of Paris in 1814 was significant for Mauritius because:',
    options:['It gave Mauritius to Britain','It granted independence','It ended all sugar taxes','It opened the first schools'],
    answer:'It gave Mauritius to Britain',
    hint:'Treaties after wars formalise the transfer of territories.',
    explanation:'The <b>Treaty of Paris (1814)</b> formally handed Mauritius — captured by Britain in 1810 during the Napoleonic Wars — from France to Britain. The British were allowed to keep it in exchange for restoring other French territories. This began the British period (1810–1968).' }),

  makeMCQ({ id:'g7sms-origins-015', chapterId:'g7sms-origins', difficulty:3, subsection:'historical_significance',
    question:'During the French period, Mauritius (Île de France) was important to France primarily as:',
    options:['A naval base for French fleets','A holiday spot for the rich','A source of gold and diamonds','A centre of French schooling'],
    answer:'A naval base for French fleets',
    hint:'The French navy used Mauritius to challenge British control of Indian Ocean trade.',
    explanation:'The French valued Mauritius (Île de France) as a key <b>naval and strategic base</b>. French privateers and warships used Port-Louis as their base to disrupt British trade in the Indian Ocean. This strategic value made the island worth capturing during the Napoleonic Wars.' }),

  makeMCQ({ id:'g7sms-origins-016', chapterId:'g7sms-origins', difficulty:2, subsection:'settlers_origins',
    question:'Franco-Mauritians are descendants of:',
    options:['French colonists and planters','Enslaved Africans and Malagasy','Indian indentured workers','Dutch settlers who stayed on'],
    answer:'French colonists and planters',
    hint:'The prefix "Franco-" indicates a connection to France.',
    explanation:'<b>Franco-Mauritians</b> are descendants of French and other European colonists who settled in Mauritius mainly during the French period (1715–1810). Many were plantation owners. Though small in number, they have historically played an important role in the economy.' }),

  makeMCQ({ id:'g7sms-origins-017', chapterId:'g7sms-origins', difficulty:2, subsection:'settlers_origins',
    question:'The Creole community of Mauritius is mainly descended from:',
    options:['Enslaved Africans and Malagasy','French plantation owners','Indian indentured workers','Chinese traders and shopkeepers'],
    answer:'Enslaved Africans and Malagasy',
    hint:'The word "Creole" in this context refers to those of African/Malagasy heritage born in Mauritius.',
    explanation:'The <b>Creole community</b> of Mauritius is mainly descended from <b>enslaved Africans and Malagasy people</b> brought to Mauritius during the French and British colonial periods. Kreol Morisien, the national language, developed from their linguistic contact with the French colonists.' }),

  makeMCQ({ id:'g7sms-origins-018', chapterId:'g7sms-origins', difficulty:1, subsection:'cultural_diversity',
    question:'Which festival celebrated in Mauritius has its origins in the Indian Hindu tradition?',
    options:['Diwali','Christmas','Eid-ul-Fitr','Chinese New Year'],
    answer:'Diwali',
    hint:'Diwali involves lighting lamps and is celebrated by Hindus.',
    explanation:'<b>Diwali</b> (Festival of Lights) is a major Hindu festival celebrated in Mauritius by the Hindu community. It involves lighting clay lamps (diyas), fireworks and prayers to the goddess Lakshmi. It is a national public holiday in Mauritius.' }),

  makeMCQ({ id:'g7sms-origins-019', chapterId:'g7sms-origins', difficulty:2, subsection:'cultural_diversity',
    question:'The Mauritian national motto "Stella Clavisque Maris Indici" means:',
    options:['"Star and Key of the Indian Ocean"','"Guardian of the Southern Ocean"','"Pearl of the Great Indian Ocean"','"Land of Peace and Many Peoples"'],
    answer:'"Star and Key of the Indian Ocean"',
    hint:'It refers to Mauritius\'s strategic position in the Indian Ocean.',
    explanation:'The Mauritian national motto in Latin means <b>"Star and Key of the Indian Ocean"</b>. It reflects Mauritius\'s historical importance as a strategic island — a "key" for controlling trade routes across the Indian Ocean, and a "star" guiding navigators.' }),

  makeMCQ({ id:'g7sms-origins-020', chapterId:'g7sms-origins', difficulty:3, subsection:'cultural_diversity',
    question:'Which of the following best illustrates the concept of cultural syncretism in Mauritius?',
    options:['Seggae, blending Sega and Reggae','The English language in schools','The growing of sugarcane here','The celebration of Christmas'],
    answer:'Seggae, blending Sega and Reggae',
    hint:'Syncretism means blending elements from different cultures into something new.',
    explanation:'<b>Cultural syncretism</b> is the blending of different cultural elements. <b>Seggae</b> — created by Kaya — perfectly illustrates this: it merges <b>Mauritian Sega</b> (African roots) with <b>Jamaican Reggae</b> to create a uniquely Mauritian genre. Mauritius\'s cuisine, architecture and festivals also show cultural mixing.' }),

  makeTF({ id:'g7sms-origins-021', chapterId:'g7sms-origins', difficulty:1, subsection:'settlers_origins',
    question:'People of Indian origin form the largest community in Mauritius today.',
    answer:'True',
    hint:'This is related to the large number of indentured workers who arrived from 1834.',
    explanation:'<b>True.</b> People of <b>Indian origin</b> (Hindu and Muslim) form approximately 70% of the Mauritian population, making them the largest community. This is the direct result of the mass immigration of Indian indentured labourers between 1834 and 1920.' }),

  // ── Our Country, Our People — contributions_mauritians ───────────────────

  makeMCQ({ id:'g7sms-people-013', chapterId:'g7sms-people', difficulty:1, subsection:'contributions_mauritians',
    question:'Sir Seewoosagur Ramgoolam (SSR) is remembered as the Father of the Nation. He was a trained:',
    options:['Doctor','Engineer','Lawyer','Teacher'],
    answer:'Doctor',
    hint:'He trained in medicine in London before entering politics.',
    explanation:'<b>Sir SSR Ramgoolam</b> trained as a <b>medical doctor</b> at University College London before returning to Mauritius and entering politics. He founded the Mauritius Labour Party and led Mauritius to independence in 1968, becoming the country\'s first Prime Minister.' }),

  makeMCQ({ id:'g7sms-people-014', chapterId:'g7sms-people', difficulty:2, subsection:'contributions_mauritians',
    question:'Bruno Julie contributed to Mauritius as:',
    options:['A boxer','A politician','A painter','A biologist'],
    answer:'A boxer',
    hint:'He brought home the first Olympic medal Mauritius had ever won.',
    explanation:'<b>Bruno Julie</b> won a <b>bronze medal in boxing</b> at the <b>2008 Beijing Olympics</b> — the first Olympic medal ever won by Mauritius. He competed in the bantamweight division.' }),

  makeMCQ({ id:'g7sms-people-015', chapterId:'g7sms-people', difficulty:2, subsection:'achievements_arts_sport',
    question:'The ravane is an instrument central to which Mauritian cultural tradition?',
    options:['Sega music and dance','Classical Western music','Indian classical music','Chinese opera'],
    answer:'Sega music and dance',
    hint:'The ravane is a traditional Mauritian drum.',
    explanation:'The <b>ravane</b> is a large, shallow frame drum central to <b>Sega music</b>, Mauritius\'s traditional music form with African roots. The ravane\'s rhythm, combined with the maravane (rattle) and triangle, creates the distinctive sound of Sega.' }),

  makeMCQ({ id:'g7sms-people-016', chapterId:'g7sms-people', difficulty:2, subsection:'achievements_arts_sport',
    question:'The Indian Ocean Island Games (IOIG) are held every four years between:',
    options:['Indian Ocean island nations','All countries of Africa','All South Asian countries','Pacific Ocean countries'],
    answer:'Indian Ocean island nations',
    hint:'The games are a regional sporting event for Indian Ocean islands.',
    explanation:'The <b>Indian Ocean Island Games (IOIG)</b> are a multi-sport event held every four years among <b>island nations and territories of the Indian Ocean</b>. Mauritius has hosted the games and regularly medals in athletics, swimming, boxing and weightlifting.' }),

  makeMCQ({ id:'g7sms-people-017', chapterId:'g7sms-people', difficulty:3, subsection:'individuals_country',
    question:'Why is it important that Mauritius celebrates contributions from people of all communities?',
    options:['It builds a shared identity','It matters only for exams','It honours the majority only','It is required by world law'],
    answer:'It builds a shared identity',
    hint:'Inclusive recognition of all communities strengthens national unity.',
    explanation:'Celebrating contributions from <b>all communities</b> (Creole, Indian, Chinese, European) reinforces a <b>shared Mauritian identity</b>, reduces communal tensions and acknowledges that nation-building is a collective achievement — not the work of one group alone.' }),

  makeMCQ({ id:'g7sms-people-018', chapterId:'g7sms-people', difficulty:2, subsection:'individuals_country',
    question:'Sir Anerood Jugnauth contributed to Mauritius by:',
    options:['Serving as PM and President','Writing the national anthem','Discovering the Mauritian EEZ','Winning an Olympic medal'],
    answer:'Serving as PM and President',
    hint:'He was one of the longest-serving political figures in Mauritian history.',
    explanation:'<b>Sir Anerood Jugnauth</b> served as Prime Minister of Mauritius multiple times and later as President. He oversaw significant economic reforms and infrastructure development, and was one of the most influential political figures in post-independence Mauritius.' }),

  makeTF({ id:'g7sms-people-019', chapterId:'g7sms-people', difficulty:1, subsection:'achievements_arts_sport',
    question:'Sega Tipik was inscribed on the UNESCO Intangible Cultural Heritage list in 2014.',
    answer:'True',
    hint:'UNESCO recognises outstanding cultural traditions from around the world.',
    explanation:'<b>True.</b> <b>Sega Tipik</b>, the traditional Sega of Mauritius, was inscribed on the <b>UNESCO Representative List of the Intangible Cultural Heritage of Humanity in 2014</b>. This recognition highlights its unique cultural value and African roots.' }),

  // ── Where People Live — settlement_factors ────────────────────────────────

  makeMCQ({ id:'g7sms-settlement-013', chapterId:'g7sms-settlement', difficulty:2, subsection:'settlement_factors',
    question:'Which of the following is an economic factor that attracts people to a settlement?',
    options:['Jobs in shops and factories','The height of the land here','The number of rivers nearby','The amount of yearly rainfall'],
    answer:'Jobs in shops and factories',
    hint:'Economic factors are about earning a living.',
    explanation:'<b>Economic factors</b> that attract settlement include: job opportunities in factories, shops or offices, the presence of markets, and access to trade routes. People settle where they can earn a living — which is why industrial areas and port cities grow quickly.' }),

  makeMCQ({ id:'g7sms-settlement-014', chapterId:'g7sms-settlement', difficulty:1, subsection:'settlement_factors',
    question:'Which physical factor makes coastal plains more attractive for settlement than steep mountain slopes?',
    options:['Flat land is easier to build on','Slopes get no sunlight at all','The coast has more fresh water','Slopes are flooded every year'],
    answer:'Flat land is easier to build on',
    hint:'Think about the practicalities of construction and farming.',
    explanation:'<b>Flat land</b> (like coastal plains) is far easier to build houses and roads on, and to plough for farming. Steep slopes make construction difficult and dangerous, and farming is harder because soil can be washed away by rain (erosion).' }),

  makeMCQ({ id:'g7sms-settlement-015', chapterId:'g7sms-settlement', difficulty:2, subsection:'physical_historical',
    question:'Curepipe became a major town on the central plateau of Mauritius because:',
    options:['Its cool climate drew residents','It had the best sugarcane land','It had the largest harbour','It was the first Dutch capital'],
    answer:'Its cool climate drew residents',
    hint:'Malaria epidemics pushed people to higher, cooler areas.',
    explanation:'<b>Curepipe</b> grew significantly in the 19th century after <b>malaria epidemics</b> in Port-Louis encouraged the colonial middle class to relocate to the cooler, healthier central plateau. Its higher elevation and cooler temperatures made it preferable for the bourgeoisie.' }),

  makeMCQ({ id:'g7sms-settlement-016', chapterId:'g7sms-settlement', difficulty:3, subsection:'settlement_evolution',
    question:'The growth of the tourism industry in coastal areas of Mauritius has led to:',
    options:['New hotels changing land use','Coastal villages emptying out','The coast closed to residents','No change in settlement at all'],
    answer:'New hotels changing land use',
    hint:'Tourism development can have negative effects on local communities.',
    explanation:'Tourism development in coastal Mauritius has changed <b>land use patterns</b> — converting former fishing villages and agricultural land into hotel complexes. This has <b>raised property prices</b>, displaced local fishermen and changed the character of traditional coastal communities.' }),

  makeMCQ({ id:'g7sms-settlement-017', chapterId:'g7sms-settlement', difficulty:2, subsection:'settlement_factors',
    question:'Why is soil quality an important factor in settlement patterns?',
    options:['Fertile soil supports farming','Only rocky soil is built on','Soil makes no difference here','Only towns need good soil'],
    answer:'Fertile soil supports farming',
    hint:'Farming communities depend on the quality of the land.',
    explanation:'<b>Fertile soil</b> supports agriculture — providing food for the community and income for farmers. In Mauritius, areas with deep, fertile volcanic soils were ideal for sugarcane, which drew plantation owners, workers and supporting communities to settle nearby.' }),

  makeMCQ({ id:'g7sms-settlement-018', chapterId:'g7sms-settlement', difficulty:2, subsection:'settlement_evolution',
    question:'Smart City developments (like Beau Plan) in Mauritius represent:',
    options:['Planned mixed-use urban areas','Modernised fishing villages','Restored colonial settlements','Sugar estates made museums'],
    answer:'Planned mixed-use urban areas',
    hint:'Smart cities aim to be efficient and sustainable urban environments.',
    explanation:'<b>Smart City</b> developments such as Beau Plan and Côte d\'Or are modern, <b>planned urban areas</b> that combine homes, offices, shops and leisure facilities. They aim to create sustainable, efficient communities and reduce pressure on existing urban centres like Port-Louis.' }),

  makeTF({ id:'g7sms-settlement-019', chapterId:'g7sms-settlement', difficulty:1, subsection:'physical_historical',
    question:'Port-Louis, the capital of Mauritius, grew because of its natural harbour.',
    answer:'True',
    hint:'Ports need sheltered water for ships to dock.',
    explanation:'<b>True.</b> Port-Louis developed because it has a <b>natural, sheltered harbour</b>. This made it ideal for trade and colonial administration. Ships could dock safely in the bay, and the town grew as the main port and commercial centre of the island.' }),

  // ── People, Places & the Environment — natural_resources ─────────────────

  makeMCQ({ id:'g7sms-resources-013', chapterId:'g7sms-resources', difficulty:1, subsection:'natural_resources',
    question:'Which of the following is a renewable natural resource found in Mauritius?',
    options:['River water','Coal deposits','Crude oil','Diamonds'],
    answer:'River water',
    hint:'Freshwater is replenished by rainfall.',
    explanation:'<b>Freshwater</b> in Mauritius\'s rivers and reservoirs (like La Nicolière and Mare aux Vacoas) is a <b>renewable resource</b>, replenished by rainfall. However, it must be carefully managed — overuse or pollution can make it scarce.' }),

  makeMCQ({ id:'g7sms-resources-014', chapterId:'g7sms-resources', difficulty:2, subsection:'resource_types',
    question:'The sea around Mauritius is a resource from the hydrosphere. How is it used?',
    options:['Fishing, tourism and transport','Drinking water and nothing else','Cooling power stations only','Naval training grounds only'],
    answer:'Fishing, tourism and transport',
    hint:'The ocean around Mauritius serves many purposes.',
    explanation:'The <b>Indian Ocean surrounding Mauritius</b> is a vital resource: it supports the <b>fishing industry</b>, provides beaches and reefs for <b>tourism</b>, and serves as a <b>transport and trade route</b>. Marine resources are also central to food security.' }),

  makeMCQ({ id:'g7sms-resources-015', chapterId:'g7sms-resources', difficulty:2, subsection:'resource_types',
    question:'Mauritius has increased its use of renewable energy sources such as:',
    options:['Solar panels and wind farms','Nuclear power stations','Coal-fired power plants','Diesel and oil refineries'],
    answer:'Solar panels and wind farms',
    hint:'Renewables come from naturally replenishing sources like the sun and wind.',
    explanation:'Mauritius has been increasing its use of <b>solar panels</b> and <b>wind turbines</b> to generate electricity from the atmosphere (solar energy and wind). These reduce reliance on imported fossil fuels and lower greenhouse gas emissions.' }),

  makeMCQ({ id:'g7sms-resources-016', chapterId:'g7sms-resources', difficulty:3, subsection:'resources_settlement',
    question:'The fishing industry in Rodrigues is important to settlement there because:',
    options:['It gives jobs and food locally','It has drawn large factories','It made Rodrigues the richest','It is the only fresh water there'],
    answer:'It gives jobs and food locally',
    hint:'Resources support the local economy, which in turn supports settlement.',
    explanation:'The <b>fishing industry</b> is central to Rodrigues — it provides <b>employment and food</b> for the island\'s 43,000 people. Without these marine resources, the isolated island could not support its population, and settlement there would not be viable.' }),

  makeMCQ({ id:'g7sms-resources-017', chapterId:'g7sms-resources', difficulty:2, subsection:'natural_resources',
    question:'The sugarcane plant is valuable as a natural resource because:',
    options:['It gives sugar, power and fuel','It is used to build houses','It is our main drinking water','It is woven into cloth'],
    answer:'It gives sugar, power and fuel',
    hint:'Sugarcane has multiple uses beyond just producing sugar.',
    explanation:'Sugarcane is a versatile resource: its juice produces <b>sugar for export</b>, the crushed fibre (bagasse) is burnt to <b>generate electricity</b>, and the plant can be processed into <b>ethanol</b> (biofuel). This makes it far more valuable than a single-use crop.' }),

  makeMCQ({ id:'g7sms-resources-018', chapterId:'g7sms-resources', difficulty:2, subsection:'resources_settlement',
    question:'The development of the financial services sector in Mauritius is an example of how a country can:',
    options:['Shift to a knowledge economy','Use up more natural resources','Reduce its own population','Go back to a fishing economy'],
    answer:'Shift to a knowledge economy',
    hint:'Economic development often involves diversification beyond primary resources.',
    explanation:'Mauritius has successfully diversified from a <b>sugar-dependent economy</b> to one that includes <b>financial services, ICT and tourism</b>. This shows that a country\'s economic resources are not just natural ones — human skills and knowledge are also resources.' }),

  makeTF({ id:'g7sms-resources-019', chapterId:'g7sms-resources', difficulty:2, subsection:'natural_resources',
    question:'The Exclusive Economic Zone (EEZ) of Mauritius is smaller than its land area.',
    answer:'False',
    hint:'The EEZ extends 200 nautical miles into the ocean from the coastline.',
    explanation:'<b>False.</b> The Mauritian EEZ covers approximately <b>2.3 million km²</b> — vastly larger than Mauritius\'s land area of about 2,040 km². The ocean zone is over 1,000 times larger than the land area, making it an enormous resource for fisheries and potential seabed mining.' })

);

})();
