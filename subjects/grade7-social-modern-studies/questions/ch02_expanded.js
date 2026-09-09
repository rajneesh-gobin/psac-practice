'use strict';
(function () {

STATIC_QUESTIONS.push(

  // ── Our Islands & their Landforms — islands_republic ─────────────────────

  makeMCQ({ id:'g7sms-islands-013', chapterId:'g7sms-islands', difficulty:2, subsection:'islands_republic',
    question:'Saint Brandon (Cargados Carajos Shoals) is important to Mauritius mainly because it:',
    options:['Extends Mauritius\'s maritime zone and is used for fishing','Has the largest population of the republic','Is the closest island to Africa','Is a volcanic island with high mountains'],
    answer:'Extends Mauritius\'s maritime zone and is used for fishing',
    hint:'Remote island territories often have strategic value for ocean resources.',
    explanation:'<b>Saint Brandon</b> is a group of low-lying coral islets about 400 km north of Mauritius. While largely uninhabited, it is important for <b>extending Mauritius\'s maritime zone</b> and for fishing operations in the surrounding waters.' }),

  makeMCQ({ id:'g7sms-islands-014', chapterId:'g7sms-islands', difficulty:1, subsection:'islands_republic',
    question:'Rodrigues has its own Regional Assembly. This means Rodrigues is:',
    options:['An autonomous region within the Republic of Mauritius','A completely independent country','A dependency of France','A part of mainland Africa'],
    answer:'An autonomous region within the Republic of Mauritius',
    hint:'Rodrigues has its own local government but is still part of Mauritius.',
    explanation:'Rodrigues is an <b>autonomous region of Mauritius</b> with its own <b>Rodrigues Regional Assembly</b> that manages local affairs. It is not independent — it remains part of the Republic of Mauritius, represented in the National Assembly.' }),

  makeMCQ({ id:'g7sms-islands-015', chapterId:'g7sms-islands', difficulty:2, subsection:'island_types',
    question:'Agaléga is classified as a coral island because:',
    options:['It is low-lying and made of coral limestone rather than volcanic rock','It has active volcanoes','It is surrounded by icebergs','It was formed by a meteor impact'],
    answer:'It is low-lying and made of coral limestone rather than volcanic rock',
    hint:'Coral islands are flat and made of compacted coral material.',
    explanation:'<b>Agaléga</b> is a <b>coral island</b> — flat and low-lying, made from coral limestone. Unlike Mauritius island (volcanic, mountainous), Agaléga has no significant elevation. The two islands (North and South) are connected by a sandbank at low tide.' }),

  makeMCQ({ id:'g7sms-islands-016', chapterId:'g7sms-islands', difficulty:3, subsection:'island_types',
    question:'What is the main environmental threat to coral atolls like Saint Brandon?',
    options:['Rising sea levels caused by global warming, which could submerge low-lying coral islands','Increasing volcanic activity','Invasion by non-native species only','Mining of the coral rock'],
    answer:'Rising sea levels caused by global warming, which could submerge low-lying coral islands',
    hint:'Low-lying islands have very little elevation above sea level.',
    explanation:'<b>Rising sea levels</b> due to global warming pose an existential threat to low-lying coral islands and atolls. Saint Brandon sits only a metre or two above sea level — a rise of 1–2 metres could <b>permanently submerge</b> much of it.' }),

  makeMCQ({ id:'g7sms-islands-017', chapterId:'g7sms-islands', difficulty:2, subsection:'landforms',
    question:'The lagoon of Mauritius is found between the coastline and:',
    options:['The coral reef','The central plateau','The river mouths','The mountain peaks'],
    answer:'The coral reef',
    hint:'A lagoon is the calm, shallow water trapped between the coast and the reef.',
    explanation:'Mauritius has a <b>fringing coral reef</b> that encircles most of the island. The calm, shallow water between the coast and the reef is the <b>lagoon</b>. It is important for tourism, fishing and provides natural protection against waves.' }),

  makeMCQ({ id:'g7sms-islands-018', chapterId:'g7sms-islands', difficulty:1, subsection:'landforms',
    question:'The highest peak of Mauritius island is:',
    options:['Pieter Both (820 m)','Le Morne (556 m)','Trou aux Cerfs','The central plateau (400 m)'],
    answer:'Pieter Both (820 m)',
    hint:'This peak has a distinctive round boulder at its summit.',
    explanation:'<b>Pieter Both</b> at 820 m is the highest peak on Mauritius island, followed by Le Pouce (811 m). It is named after a Dutch East India Company governor. The distinctive round rock at its summit makes it recognisable from a distance.' }),

  makeMCQ({ id:'g7sms-islands-019', chapterId:'g7sms-islands', difficulty:2, subsection:'landforms',
    question:'Rivers in Mauritius are generally short because:',
    options:['The island is small and the mountains are close to the coast, giving rivers little distance to flow','Mauritius has very low rainfall','Rivers were drained by colonists','The volcanic rock absorbs all water underground'],
    answer:'The island is small and the mountains are close to the coast, giving rivers little distance to flow',
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
    options:['Sugarcane and deer','Cotton plantations and cattle','Tobacco farming and horses','Rice cultivation and elephants'],
    answer:'Sugarcane and deer',
    hint:'Both of these can still be found in Mauritius today.',
    explanation:'The Dutch introduced <b>sugarcane</b> to Mauritius — which became the foundation of the island\'s economy for centuries. They also introduced <b>deer</b>, which still inhabit the forests of Mauritius. They also contributed to the extinction of the dodo through over-hunting.' }),

  makeMCQ({ id:'g7sms-origins-014', chapterId:'g7sms-origins', difficulty:2, subsection:'historical_significance',
    question:'The Treaty of Paris in 1814 was significant for Mauritius because:',
    options:['It formally ceded Mauritius from France to Britain','It granted Mauritius independence','It ended the slave trade','It established the first schools in Mauritius'],
    answer:'It formally ceded Mauritius from France to Britain',
    hint:'Treaties after wars formalise the transfer of territories.',
    explanation:'The <b>Treaty of Paris (1814)</b> formally handed Mauritius — captured by Britain in 1810 during the Napoleonic Wars — from France to Britain. The British were allowed to keep it in exchange for restoring other French territories. This began the British period (1810–1968).' }),

  makeMCQ({ id:'g7sms-origins-015', chapterId:'g7sms-origins', difficulty:3, subsection:'historical_significance',
    question:'During the French period, Mauritius (Île de France) was important to France primarily as:',
    options:['A strategic naval base and supply point for French fleets in the Indian Ocean','A holiday destination for French nobility','A source of precious metals and diamonds','A centre for French education in the Indian Ocean'],
    answer:'A strategic naval base and supply point for French fleets in the Indian Ocean',
    hint:'The French navy used Mauritius to challenge British control of Indian Ocean trade.',
    explanation:'The French valued Mauritius (Île de France) as a key <b>naval and strategic base</b>. French privateers and warships used Port-Louis as their base to disrupt British trade in the Indian Ocean. This strategic value made the island worth capturing during the Napoleonic Wars.' }),

  makeMCQ({ id:'g7sms-origins-016', chapterId:'g7sms-origins', difficulty:2, subsection:'settlers_origins',
    question:'Franco-Mauritians are descendants of:',
    options:['French colonists and plantation owners who settled in Mauritius during the French period','Enslaved Africans brought to Mauritius','Indian indentured workers who arrived after 1834','Dutch settlers who remained after 1710'],
    answer:'French colonists and plantation owners who settled in Mauritius during the French period',
    hint:'The prefix "Franco-" indicates a connection to France.',
    explanation:'<b>Franco-Mauritians</b> are descendants of French and other European colonists who settled in Mauritius mainly during the French period (1715–1810). Many were plantation owners. Though small in number, they have historically played an important role in the economy.' }),

  makeMCQ({ id:'g7sms-origins-017', chapterId:'g7sms-origins', difficulty:2, subsection:'settlers_origins',
    question:'The Creole community of Mauritius is mainly descended from:',
    options:['Enslaved Africans and Malagasy people brought during the colonial period','French plantation owners','Indian indentured workers','Chinese traders'],
    answer:'Enslaved Africans and Malagasy people brought during the colonial period',
    hint:'The word "Creole" in this context refers to those of African/Malagasy heritage born in Mauritius.',
    explanation:'The <b>Creole community</b> of Mauritius is mainly descended from <b>enslaved Africans and Malagasy people</b> brought to Mauritius during the French and British colonial periods. Kreol Morisien, the national language, developed from their linguistic contact with the French colonists.' }),

  makeMCQ({ id:'g7sms-origins-018', chapterId:'g7sms-origins', difficulty:1, subsection:'cultural_diversity',
    question:'Which festival celebrated in Mauritius has its origins in the Indian Hindu tradition?',
    options:['Diwali (Festival of Lights)','Christmas','Eid-ul-Fitr','Chinese New Year'],
    answer:'Diwali (Festival of Lights)',
    hint:'Diwali involves lighting lamps and is celebrated by Hindus.',
    explanation:'<b>Diwali</b> (Festival of Lights) is a major Hindu festival celebrated in Mauritius by the Hindu community. It involves lighting clay lamps (diyas), fireworks and prayers to the goddess Lakshmi. It is a national public holiday in Mauritius.' }),

  makeMCQ({ id:'g7sms-origins-019', chapterId:'g7sms-origins', difficulty:2, subsection:'cultural_diversity',
    question:'The Mauritian national motto "Stella Clavisque Maris Indici" means:',
    options:['"Star and Key of the Indian Ocean"','"Land of Diversity and Unity"','"Freedom and Justice"','"Home of the Dodo"'],
    answer:'"Star and Key of the Indian Ocean"',
    hint:'It refers to Mauritius\'s strategic position in the Indian Ocean.',
    explanation:'The Mauritian national motto in Latin means <b>"Star and Key of the Indian Ocean"</b>. It reflects Mauritius\'s historical importance as a strategic island — a "key" for controlling trade routes across the Indian Ocean, and a "star" guiding navigators.' }),

  makeMCQ({ id:'g7sms-origins-020', chapterId:'g7sms-origins', difficulty:3, subsection:'cultural_diversity',
    question:'Which of the following best illustrates the concept of cultural syncretism in Mauritius?',
    options:['Seggae music, which blends traditional Sega with Jamaican Reggae','The English language being used in schools','The growing of sugarcane','The celebration of Christmas'],
    answer:'Seggae music, which blends traditional Sega with Jamaican Reggae',
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
    options:['Medical doctor','Engineer','Lawyer','Teacher'],
    answer:'Medical doctor',
    hint:'He trained in medicine in London before entering politics.',
    explanation:'<b>Sir SSR Ramgoolam</b> trained as a <b>medical doctor</b> at University College London before returning to Mauritius and entering politics. He founded the Mauritius Labour Party and led Mauritius to independence in 1968, becoming the country\'s first Prime Minister.' }),

  makeMCQ({ id:'g7sms-people-014', chapterId:'g7sms-people', difficulty:2, subsection:'contributions_mauritians',
    question:'Michaëlla Bécane contributed to Mauritius as:',
    options:['A world-ranking tennis player','A political leader','A famous painter','A marine biologist'],
    answer:'A world-ranking tennis player',
    hint:'She competed in international tournaments and brought Mauritius recognition in tennis.',
    explanation:'<b>Michaëlla Bécane</b> (née Krajicek) has Mauritian heritage and achieved a high ranking on the <b>WTA professional tennis circuit</b>. She is one of the Mauritian athletes who has competed at the highest international level.' }),

  makeMCQ({ id:'g7sms-people-015', chapterId:'g7sms-people', difficulty:2, subsection:'achievements_arts_sport',
    question:'The ravane is an instrument central to which Mauritian cultural tradition?',
    options:['Sega music and dance','Classical Western music','Indian classical music','Chinese opera'],
    answer:'Sega music and dance',
    hint:'The ravane is a traditional Mauritian drum.',
    explanation:'The <b>ravane</b> is a large, shallow frame drum central to <b>Sega music</b>, Mauritius\'s traditional music form with African roots. The ravane\'s rhythm, combined with the maravane (rattle) and triangle, creates the distinctive sound of Sega.' }),

  makeMCQ({ id:'g7sms-people-016', chapterId:'g7sms-people', difficulty:2, subsection:'achievements_arts_sport',
    question:'The Indian Ocean Island Games (IOIG) are held every four years between:',
    options:['Islands and island nations of the Indian Ocean including Mauritius, Madagascar, Seychelles, Maldives, Réunion and Comoros','All countries of Africa','All countries of the Indian subcontinent','Countries of the Pacific Ocean'],
    answer:'Islands and island nations of the Indian Ocean including Mauritius, Madagascar, Seychelles, Maldives, Réunion and Comoros',
    hint:'The games are a regional sporting event for Indian Ocean islands.',
    explanation:'The <b>Indian Ocean Island Games (IOIG)</b> are a multi-sport event held every four years among <b>island nations and territories of the Indian Ocean</b>. Mauritius has hosted the games and regularly medals in athletics, swimming, boxing and weightlifting.' }),

  makeMCQ({ id:'g7sms-people-017', chapterId:'g7sms-people', difficulty:3, subsection:'individuals_country',
    question:'Why is it important that Mauritius celebrates contributions from people of all communities?',
    options:['It builds a shared national identity, reduces communal tensions and shows that all groups have contributed to nation-building','It is only important for school exams','It is a way to celebrate only the majority community','It is required by international law'],
    answer:'It builds a shared national identity, reduces communal tensions and shows that all groups have contributed to nation-building',
    hint:'Inclusive recognition of all communities strengthens national unity.',
    explanation:'Celebrating contributions from <b>all communities</b> (Creole, Indian, Chinese, European) reinforces a <b>shared Mauritian identity</b>, reduces communal tensions and acknowledges that nation-building is a collective achievement — not the work of one group alone.' }),

  makeMCQ({ id:'g7sms-people-018', chapterId:'g7sms-people', difficulty:2, subsection:'individuals_country',
    question:'Sir Anerood Jugnauth contributed to Mauritius by:',
    options:['Serving as both Prime Minister and President, and overseeing major economic reforms','Writing the national anthem','Discovering the Mauritius EEZ','Leading the 1834 independence movement'],
    answer:'Serving as both Prime Minister and President, and overseeing major economic reforms',
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
    options:['The availability of jobs in industry, commerce or services','The height of land above sea level','The presence of rivers','The amount of annual rainfall'],
    answer:'The availability of jobs in industry, commerce or services',
    hint:'Economic factors are about earning a living.',
    explanation:'<b>Economic factors</b> that attract settlement include: job opportunities in factories, shops or offices, the presence of markets, and access to trade routes. People settle where they can earn a living — which is why industrial areas and port cities grow quickly.' }),

  makeMCQ({ id:'g7sms-settlement-014', chapterId:'g7sms-settlement', difficulty:1, subsection:'settlement_factors',
    question:'Which physical factor makes coastal plains more attractive for settlement than steep mountain slopes?',
    options:['Flat land is easier to build on and farm','Mountain slopes have no sunlight','Coasts have more freshwater','Slopes are always flooded'],
    answer:'Flat land is easier to build on and farm',
    hint:'Think about the practicalities of construction and farming.',
    explanation:'<b>Flat land</b> (like coastal plains) is far easier to build houses and roads on, and to plough for farming. Steep slopes make construction difficult and dangerous, and farming is harder because soil can be washed away by rain (erosion).' }),

  makeMCQ({ id:'g7sms-settlement-015', chapterId:'g7sms-settlement', difficulty:2, subsection:'physical_historical',
    question:'Curepipe became a major town on the central plateau of Mauritius because:',
    options:['Its cool climate attracted colonial residents, especially after the malaria epidemic in Port-Louis','It had the most fertile land for sugarcane','It had the largest harbour','It was chosen as the first capital by the Dutch'],
    answer:'Its cool climate attracted colonial residents, especially after the malaria epidemic in Port-Louis',
    hint:'Malaria epidemics pushed people to higher, cooler areas.',
    explanation:'<b>Curepipe</b> grew significantly in the 19th century after <b>malaria epidemics</b> in Port-Louis encouraged the colonial middle class to relocate to the cooler, healthier central plateau. Its higher elevation and cooler temperatures made it preferable for the bourgeoisie.' }),

  makeMCQ({ id:'g7sms-settlement-016', chapterId:'g7sms-settlement', difficulty:3, subsection:'settlement_evolution',
    question:'The growth of the tourism industry in coastal areas of Mauritius has led to:',
    options:['New hotels and resorts changing land use patterns, displacing local fishermen and driving up property prices','The permanent depopulation of coastal villages','Coastal areas being declared off-limits to all residents','No noticeable change in settlement patterns'],
    answer:'New hotels and resorts changing land use patterns, displacing local fishermen and driving up property prices',
    hint:'Tourism development can have negative effects on local communities.',
    explanation:'Tourism development in coastal Mauritius has changed <b>land use patterns</b> — converting former fishing villages and agricultural land into hotel complexes. This has <b>raised property prices</b>, displaced local fishermen and changed the character of traditional coastal communities.' }),

  makeMCQ({ id:'g7sms-settlement-017', chapterId:'g7sms-settlement', difficulty:2, subsection:'settlement_factors',
    question:'Why is soil quality an important factor in settlement patterns?',
    options:['Fertile soil supports farming which provides food and income, attracting settlers','Only rocky soil is used for building','Soil quality has no effect on where people live','Only cities need fertile soil'],
    answer:'Fertile soil supports farming which provides food and income, attracting settlers',
    hint:'Farming communities depend on the quality of the land.',
    explanation:'<b>Fertile soil</b> supports agriculture — providing food for the community and income for farmers. In Mauritius, areas with deep, fertile volcanic soils were ideal for sugarcane, which drew plantation owners, workers and supporting communities to settle nearby.' }),

  makeMCQ({ id:'g7sms-settlement-018', chapterId:'g7sms-settlement', difficulty:2, subsection:'settlement_evolution',
    question:'Smart City developments (like Beau Plan) in Mauritius represent:',
    options:['Planned urban areas combining residential, commercial and work spaces to reduce urban sprawl','Traditional fishing villages being modernised','Historical colonial settlements being restored','Sugar estate villages being converted to museums'],
    answer:'Planned urban areas combining residential, commercial and work spaces to reduce urban sprawl',
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
    options:['Freshwater from rivers and reservoirs','Coal deposits','Crude oil','Diamonds'],
    answer:'Freshwater from rivers and reservoirs',
    hint:'Freshwater is replenished by rainfall.',
    explanation:'<b>Freshwater</b> in Mauritius\'s rivers and reservoirs (like La Nicolière and Mare aux Vacoas) is a <b>renewable resource</b>, replenished by rainfall. However, it must be carefully managed — overuse or pollution can make it scarce.' }),

  makeMCQ({ id:'g7sms-resources-014', chapterId:'g7sms-resources', difficulty:2, subsection:'resource_types',
    question:'The sea around Mauritius is a resource from the hydrosphere. How is it used?',
    options:['For fishing, tourism (beaches and water sports) and as a transport route','Only for drinking water','Only for cooling power stations','Only for military purposes'],
    answer:'For fishing, tourism (beaches and water sports) and as a transport route',
    hint:'The ocean around Mauritius serves many purposes.',
    explanation:'The <b>Indian Ocean surrounding Mauritius</b> is a vital resource: it supports the <b>fishing industry</b>, provides beaches and reefs for <b>tourism</b>, and serves as a <b>transport and trade route</b>. Marine resources are also central to food security.' }),

  makeMCQ({ id:'g7sms-resources-015', chapterId:'g7sms-resources', difficulty:2, subsection:'resource_types',
    question:'Mauritius has increased its use of renewable energy sources such as:',
    options:['Solar panels and wind turbines','Nuclear power stations','Coal-fired power plants','Oil refineries'],
    answer:'Solar panels and wind turbines',
    hint:'Renewables come from naturally replenishing sources like the sun and wind.',
    explanation:'Mauritius has been increasing its use of <b>solar panels</b> and <b>wind turbines</b> to generate electricity from the atmosphere (solar energy and wind). These reduce reliance on imported fossil fuels and lower greenhouse gas emissions.' }),

  makeMCQ({ id:'g7sms-resources-016', chapterId:'g7sms-resources', difficulty:3, subsection:'resources_settlement',
    question:'The fishing industry in Rodrigues is important to settlement there because:',
    options:['It provides employment and food for the local population, making settlement sustainable','It has attracted large factories to Rodrigues','It has made Rodrigues the wealthiest island of Mauritius','It is the only source of freshwater on Rodrigues'],
    answer:'It provides employment and food for the local population, making settlement sustainable',
    hint:'Resources support the local economy, which in turn supports settlement.',
    explanation:'The <b>fishing industry</b> is central to Rodrigues — it provides <b>employment and food</b> for the island\'s 43,000 people. Without these marine resources, the isolated island could not support its population, and settlement there would not be viable.' }),

  makeMCQ({ id:'g7sms-resources-017', chapterId:'g7sms-resources', difficulty:2, subsection:'natural_resources',
    question:'The sugarcane plant is valuable as a natural resource because:',
    options:['It produces sugar for export, generates electricity from bagasse and can be used to make ethanol','It is used to build homes','It is the main source of drinking water','It is used to make clothing'],
    answer:'It produces sugar for export, generates electricity from bagasse and can be used to make ethanol',
    hint:'Sugarcane has multiple uses beyond just producing sugar.',
    explanation:'Sugarcane is a versatile resource: its juice produces <b>sugar for export</b>, the crushed fibre (bagasse) is burnt to <b>generate electricity</b>, and the plant can be processed into <b>ethanol</b> (biofuel). This makes it far more valuable than a single-use crop.' }),

  makeMCQ({ id:'g7sms-resources-018', chapterId:'g7sms-resources', difficulty:2, subsection:'resources_settlement',
    question:'The development of the financial services sector in Mauritius is an example of how a country can:',
    options:['Move from dependence on natural resources (like sugar) to knowledge-based economic resources','Use more of its natural resources','Reduce its population','Return to a fishing economy'],
    answer:'Move from dependence on natural resources (like sugar) to knowledge-based economic resources',
    hint:'Economic development often involves diversification beyond primary resources.',
    explanation:'Mauritius has successfully diversified from a <b>sugar-dependent economy</b> to one that includes <b>financial services, ICT and tourism</b>. This shows that a country\'s economic resources are not just natural ones — human skills and knowledge are also resources.' }),

  makeTF({ id:'g7sms-resources-019', chapterId:'g7sms-resources', difficulty:2, subsection:'natural_resources',
    question:'The Exclusive Economic Zone (EEZ) of Mauritius is smaller than its land area.',
    answer:'False',
    hint:'The EEZ extends 200 nautical miles into the ocean from the coastline.',
    explanation:'<b>False.</b> The Mauritian EEZ covers approximately <b>2.3 million km²</b> — vastly larger than Mauritius\'s land area of about 2,040 km². The ocean zone is over 1,000 times larger than the land area, making it an enormous resource for fisheries and potential seabed mining.' })

);

})();
