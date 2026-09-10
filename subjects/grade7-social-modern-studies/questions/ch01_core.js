'use strict';
// Grade 7 Social & Modern Studies — Core questions, all 5 chapters
// IDs: g7sms-islands-001…, g7sms-origins-001…, g7sms-people-001…,
//      g7sms-settlement-001…, g7sms-resources-001…

STATIC_QUESTIONS.push(

  // ── Our Islands & their Landforms — islands_republic ─────────────────────

  makeMCQ({ id:'g7sms-islands-001', chapterId:'g7sms-islands', difficulty:1, subsection:'islands_republic',
    question:'Which of the following is NOT one of the islands forming the Republic of Mauritius?',
    options:['La Réunion','Rodrigues','Agaléga','Saint Brandon'],
    answer:'La Réunion',
    hint:'La Réunion is a French overseas territory.',
    explanation:'The Republic of Mauritius comprises <b>Mauritius island, Rodrigues, Agaléga</b> and <b>Saint Brandon (Cargados Carajos Shoals)</b>. La Réunion is a French overseas territory, not part of Mauritius.' }),

  makeMCQ({ id:'g7sms-islands-002', chapterId:'g7sms-islands', difficulty:1, subsection:'islands_republic',
    question:'How many main island groups form the Republic of Mauritius?',
    options:['4','2','6','1'],
    answer:'4',
    hint:'Think of Mauritius, Rodrigues, Agaléga and Saint Brandon.',
    explanation:'The Republic of Mauritius comprises <b>four</b> island groups: (1) Mauritius island, (2) Rodrigues, (3) Agaléga, and (4) Saint Brandon (Cargados Carajos Shoals).' }),

  makeMCQ({ id:'g7sms-islands-003', chapterId:'g7sms-islands', difficulty:2, subsection:'islands_republic',
    question:'Rodrigues island is located approximately how many kilometres east of Mauritius?',
    options:['560 km','100 km','1,000 km','50 km'],
    answer:'560 km',
    hint:'Rodrigues is the most distant island of the republic from the main island.',
    explanation:'Rodrigues is located approximately <b>560 km east</b> of Mauritius island. It is an autonomous region within the Republic of Mauritius.' }),

  makeMCQ({ id:'g7sms-islands-004', chapterId:'g7sms-islands', difficulty:2, subsection:'islands_republic',
    question:'Agaléga consists of:',
    options:['Two flat coral islands','One volcanic island','Sixteen coral islands','A single sandy atoll'],
    answer:'Two flat coral islands',
    hint:'Agaléga has a North Island and a South Island.',
    explanation:'Agaléga consists of <b>two flat coral islands</b> — the North Island and the South Island — separated by a sandbank. They are located about 1,000 km north of Mauritius.' }),

  // ── Our Islands & their Landforms — island_types ─────────────────────────

  makeMCQ({ id:'g7sms-islands-005', chapterId:'g7sms-islands', difficulty:1, subsection:'island_types',
    question:'Mauritius island is a volcanic island. This means it was formed by:',
    options:['Lava from undersea eruptions','Coral growing above the sea','Sand carried by currents','Two plates colliding'],
    answer:'Lava from undersea eruptions',
    hint:'Volcanic islands rise from the sea floor through lava build-up.',
    explanation:'<b>Volcanic islands</b> like Mauritius are formed by underwater volcanic eruptions. Lava builds up over millions of years until it rises above sea level. Mauritius has the extinct Trou aux Cerfs crater.' }),

  makeMCQ({ id:'g7sms-islands-006', chapterId:'g7sms-islands', difficulty:2, subsection:'island_types',
    question:'Rodrigues is best described as a:',
    options:['A coralline island','A continental island','An active volcano','A coral atoll'],
    answer:'A coralline island',
    hint:'Rodrigues has a large lagoon and is surrounded by a coral reef.',
    explanation:'Rodrigues is a <b>coralline island</b> — formed from coral limestone — surrounded by a coral reef enclosing a large lagoon. This is different from the volcanic origin of Mauritius island.' }),

  makeMCQ({ id:'g7sms-islands-007', chapterId:'g7sms-islands', difficulty:2, subsection:'island_types',
    question:'A coral atoll is best described as:',
    options:['A ring of reef round a lagoon','A cone of lava with a crater','A strip of land near a coast','A flat bank of drifted sand'],
    answer:'A ring of reef round a lagoon',
    hint:'Think of a ring of coral around a central lagoon.',
    explanation:'A <b>coral atoll</b> is a ring-shaped coral reef (or a series of closely spaced coral islands) that encloses or nearly encloses a shallow lagoon. Saint Brandon (Cargados Carajos Shoals) is an example.' }),

  makeMCQ({ id:'g7sms-islands-008', chapterId:'g7sms-islands', difficulty:3, subsection:'island_types',
    question:'Why do volcanic islands like Mauritius generally have higher elevations than coral islands?',
    options:['Lava piles up into peaks','Coral is heavier than rock','Winds are stronger there','They are older than reefs'],
    answer:'Lava piles up into peaks',
    hint:'Lava can build up significantly over time.',
    explanation:'<b>Volcanic islands</b> have significant relief (mountains, ridges, peaks) because they are built from layers of solidified lava that pile up over millions of years. Mauritius has peaks like Le Pouce (811m) and Pieter Both (820m).' }),

  // ── Our Islands & their Landforms — landforms ────────────────────────────

  makeMCQ({ id:'g7sms-islands-009', chapterId:'g7sms-islands', difficulty:1, subsection:'landforms',
    question:'What type of landform is the central plateau of Mauritius?',
    options:['A high plateau','A coastal plain','A river delta','A mountain peak'],
    answer:'A high plateau',
    hint:'Mauritius has a raised central area that is flat at the top.',
    explanation:'The <b>central plateau</b> of Mauritius is a highland area at approximately 300–600m above sea level. It has a cooler climate than the coastal areas and is where the capital Port-Louis is situated nearby.' }),

  makeMCQ({ id:'g7sms-islands-010', chapterId:'g7sms-islands', difficulty:2, subsection:'landforms',
    question:'The coastal plains of Mauritius are important because they:',
    options:['Grow sugarcane and hold most towns','Are the highest land on the island','Stay flooded for most of the year','Have no farming or building on them'],
    answer:'Grow sugarcane and hold most towns',
    hint:'Flat coastal land is easier to farm and to build on.',
    explanation:'The <b>coastal plains</b> of Mauritius are low-lying and relatively flat. They are ideal for <b>sugarcane cultivation</b> and most towns, villages and infrastructure are found here.' }),

  makeMCQ({ id:'g7sms-islands-011', chapterId:'g7sms-islands', difficulty:2, subsection:'landforms',
    question:'The Black River Gorges in Mauritius is an example of which landform?',
    options:['A deep valley','A coral reef','A sand delta','A flat plain'],
    answer:'A deep valley',
    hint:'A gorge is a narrow, deep valley carved by a river.',
    explanation:'The <b>Black River Gorges</b> is a deep valley carved by rivers through the upland rock. It is the largest national park in Mauritius and is important for biodiversity.' }),

  makeMCQ({ id:'g7sms-islands-012', chapterId:'g7sms-islands', difficulty:3, subsection:'island_types',
    question:'Which characteristic distinguishes a continental island from a volcanic or coral island?',
    options:['It broke off a continent','It was built up by coral','It was built up by lava','It has no beaches at all'],
    answer:'It broke off a continent',
    hint:'Madagascar is an example of a continental island — it was once part of Africa.',
    explanation:'A <b>continental island</b> is a piece of a continent that became separated from the mainland as sea levels rose or through continental drift. It differs from volcanic islands (formed by lava) and coral islands (formed by reef growth).' }),

  // ── Origins, Heritage & Identity — historical_significance ───────────────

  makeMCQ({ id:'g7sms-origins-001', chapterId:'g7sms-origins', difficulty:1, subsection:'historical_significance',
    question:'Mauritius was uninhabited before the arrival of European settlers. When did permanent settlement begin?',
    options:['1638 by the Dutch','1000 AD by Arab traders','1810 by the British','1968 at independence'],
    answer:'1638 by the Dutch',
    hint:'The Dutch were the first to establish a settlement on the island.',
    explanation:'The <b>Dutch</b> made the first permanent settlement in Mauritius in <b>1638</b>, naming it after Prince Maurice of Nassau (hence "Mauritius"). They introduced sugarcane and deer but eventually abandoned the island in 1710.' }),

  makeMCQ({ id:'g7sms-origins-002', chapterId:'g7sms-origins', difficulty:2, subsection:'historical_significance',
    question:'The French colonised Mauritius (then known as Île de France) in which year?',
    options:['1715','1638','1810','1968'],
    answer:'1715',
    hint:'The French period lasted about a century before British rule.',
    explanation:'The <b>French</b> took possession of Mauritius in <b>1715</b>, renaming it "Île de France". They developed the island with plantation agriculture and brought enslaved Africans and Malagasy people to work the land.' }),

  makeMCQ({ id:'g7sms-origins-003', chapterId:'g7sms-origins', difficulty:2, subsection:'historical_significance',
    question:'During which war did Britain capture Mauritius from France?',
    options:['The Napoleonic Wars','World War I','World War II','The Seven Years\' War'],
    answer:'The Napoleonic Wars',
    hint:'Britain took control of Mauritius in 1810 during this conflict.',
    explanation:'Britain captured Mauritius from France in <b>1810</b> during the <b>Napoleonic Wars</b>. The Treaty of Paris (1814) formally ceded Mauritius to Britain. The British period lasted until independence in 1968.' }),

  makeMCQ({ id:'g7sms-origins-004', chapterId:'g7sms-origins', difficulty:3, subsection:'historical_significance',
    question:'Why is Mauritius described as a strategically important island in the Indian Ocean?',
    options:['It lay on the Europe-Asia sea route','It had the largest port on Earth','It was the first to grow sugarcane','It is the biggest island in the ocean'],
    answer:'It lay on the Europe-Asia sea route',
    hint:'Think of the trade routes in the age of sail.',
    explanation:'Mauritius\' location in the <b>Indian Ocean</b>, roughly midway between Africa and India, made it a crucial <b>strategic stopover</b> for ships transporting goods and troops between Europe, Africa and Asia. This is why European powers competed for control of the island.' }),

  // ── Origins, Heritage & Identity — settlers_origins ──────────────────────

  makeMCQ({ id:'g7sms-origins-005', chapterId:'g7sms-origins', difficulty:1, subsection:'settlers_origins',
    question:'People brought to Mauritius as enslaved workers during the French period came mainly from:',
    options:['Africa and Madagascar','India and China','Europe and America','Australia and New Zealand'],
    answer:'Africa and Madagascar',
    hint:'Enslaved people were brought to work on sugar plantations during the French period.',
    explanation:'During the French colonial period, <b>enslaved people</b> were brought primarily from <b>East Africa and Madagascar</b> to work on sugar plantations. After abolition in 1835, Indian indentured workers arrived.' }),

  makeMCQ({ id:'g7sms-origins-006', chapterId:'g7sms-origins', difficulty:2, subsection:'settlers_origins',
    question:'Indian indentured labourers began arriving in Mauritius from:',
    options:['1834','1715','1638','1968'],
    answer:'1834',
    hint:'They arrived shortly after the abolition of slavery.',
    explanation:'After the <b>abolition of slavery in 1835</b>, Indian indentured labourers began arriving in <b>1834</b>. They came to work on sugar plantations under contracts. Today, people of Indian origin form the majority of the Mauritian population.' }),

  makeMCQ({ id:'g7sms-origins-007', chapterId:'g7sms-origins', difficulty:2, subsection:'settlers_origins',
    question:'Chinese migrants came to Mauritius mainly to:',
    options:['Work as traders and shopkeepers','Work on the sugar plantations','Serve in the colonial army','Study in the island schools'],
    answer:'Work as traders and shopkeepers',
    hint:'The Chinese community is associated with commerce in Mauritius.',
    explanation:'Chinese migrants, who began arriving in the 19th century, came mainly as <b>traders</b> and established small businesses. The Sino-Mauritian community plays an important role in the commercial life of Mauritius.' }),

  // ── Origins, Heritage & Identity — cultural_diversity ────────────────────

  makeMCQ({ id:'g7sms-origins-008', chapterId:'g7sms-origins', difficulty:1, subsection:'cultural_diversity',
    question:'The phrase "Unity in Diversity" associated with Mauritius refers to:',
    options:['Many origins, one nation','Many landscapes, one island','Many languages, one school','Many parties, one leader'],
    answer:'Many origins, one nation',
    hint:'Mauritius has people from Africa, India, Europe and China all living together.',
    explanation:'"<b>Unity in Diversity</b>" describes how Mauritius — home to people from African, Indian, European and Chinese origins — functions as one united nation despite its multicultural makeup.' }),

  makeMCQ({ id:'g7sms-origins-009', chapterId:'g7sms-origins', difficulty:2, subsection:'cultural_diversity',
    question:'Which of the following languages is widely spoken in Mauritius as a mother tongue by a large part of the population?',
    options:['Kreol Morisien','Swiss German','Portuguese','Japanese'],
    answer:'Kreol Morisien',
    hint:'This language evolved from contact between French colonists and enslaved Africans.',
    explanation:'<b>Kreol Morisien</b> (Mauritian Creole) is the most widely spoken mother tongue in Mauritius. It evolved from French and African languages during the colonial period and is used as a lingua franca across communities.' }),

  makeMCQ({ id:'g7sms-origins-010', chapterId:'g7sms-origins', difficulty:2, subsection:'cultural_diversity',
    question:'The religious diversity of Mauritius is best shown by:',
    options:['Many faiths openly practised','One official state religion','No religion allowed in public','Only Hinduism is practised'],
    answer:'Many faiths openly practised',
    hint:'You can see temples, mosques, churches and pagodas across Mauritius.',
    explanation:'Mauritius is home to <b>multiple religious communities</b>: Hindus, Muslims, Christians (Catholics, Anglicans), Buddhists and others. Public holidays include festivals from different faiths — Diwali, Eid-ul-Fitr, Christmas, Chinese New Year.' }),

  makeMCQ({ id:'g7sms-origins-011', chapterId:'g7sms-origins', difficulty:3, subsection:'cultural_diversity',
    question:'The concept of "Mauritian identity" suggests that:',
    options:['Shared nation, many roots','Everyone shares one origin','Only the island-born belong','Ethnic group alone decides'],
    answer:'Shared nation, many roots',
    hint:'The national motto of Mauritius is "Stella Clavisque Maris Indici" (Star and Key of the Indian Ocean).',
    explanation:'<b>Mauritian identity</b> is the shared sense of belonging to the Mauritian nation — a common identity that transcends ethnic, religious and cultural differences. It is built on shared history, citizenship and a commitment to living together.' }),

  makeMCQ({ id:'g7sms-origins-012', chapterId:'g7sms-origins', difficulty:3, subsection:'historical_significance',
    question:'Why is the dodo bird significant to Mauritian heritage?',
    options:['An extinct bird, now a symbol','A living bird in our forests','A pet brought by the Dutch','The first bird to cross the sea'],
    answer:'An extinct bird, now a symbol',
    hint:'The dodo appears on the coat of arms of Mauritius.',
    explanation:'The <b>dodo</b> was a flightless bird endemic to Mauritius that became extinct in the late 17th century due to hunting and habitat destruction. It features on Mauritius\' <b>coat of arms</b> as a symbol of the island\'s unique natural heritage.' }),

  // ── Our Country, Our People — contributions_mauritians ───────────────────

  makeMCQ({ id:'g7sms-people-001', chapterId:'g7sms-people', difficulty:1, subsection:'contributions_mauritians',
    question:'Who is known as the "Father of the Nation" of Mauritius?',
    options:['Sir Seewoosagur Ramgoolam','Sir Abdool Razack Mohamed','Sir Veerasamy Ringadoo','Sir Anerood Jugnauth'],
    answer:'Sir Seewoosagur Ramgoolam',
    hint:'He led Mauritius to independence in 1968 and was the first Prime Minister.',
    explanation:'<b>Sir Seewoosagur Ramgoolam</b> (SSR) is called the "Father of the Nation". He was the first Prime Minister of independent Mauritius (1968) and led the country through independence negotiations with Britain.' }),

  makeMCQ({ id:'g7sms-people-002', chapterId:'g7sms-people', difficulty:2, subsection:'contributions_mauritians',
    question:'Mauritius has produced world-class athletes. In which sport did Stephan Buckland achieve international success?',
    options:['Athletics','Football','Cricket','Swimming'],
    answer:'Athletics',
    hint:'He competed at the Olympics and Commonwealth Games as a sprinter.',
    explanation:'<b>Stephan Buckland</b> is a celebrated Mauritian sprinter who competed at the <b>Commonwealth Games and Olympic Games</b>. He is one of the best-known Mauritian athletes internationally.' }),

  makeMCQ({ id:'g7sms-people-003', chapterId:'g7sms-people', difficulty:2, subsection:'contributions_mauritians',
    question:'Which field did Kaya (Joseph Réginald Topize) contribute to Mauritian culture?',
    options:['Music','Painting','Writing','Science'],
    answer:'Music',
    hint:'He blended Sega and Reggae to create a unique Mauritian musical genre.',
    explanation:'<b>Kaya</b> was a legendary Mauritian musician who created <b>Seggae</b>, a fusion of traditional Mauritian Sega music and Jamaican Reggae. He is an iconic figure in Mauritian popular culture.' }),

  // ── Our Country, Our People — achievements_arts_sport ────────────────────

  makeMCQ({ id:'g7sms-people-004', chapterId:'g7sms-people', difficulty:1, subsection:'achievements_arts_sport',
    question:'Sega is:',
    options:['A music and dance form','A spicy island dish','A ball game played here','A local spoken language'],
    answer:'A music and dance form',
    hint:'Sega has African roots and uses instruments like the ravane.',
    explanation:'<b>Sega</b> is a traditional Mauritian music and dance form with roots in the African and Malagasy heritage of enslaved people. It uses instruments such as the <b>ravane</b> (drum), the maravane and the triangle.' }),

  makeMCQ({ id:'g7sms-people-005', chapterId:'g7sms-people', difficulty:2, subsection:'achievements_arts_sport',
    question:'Which four colours appear on the flag of Mauritius, from top to bottom?',
    options:['Red, blue, yellow, green','Red, white, blue, green','Green, white, orange, red','Blue, yellow, green, white'],
    answer:'Red, blue, yellow, green',
    hint:'The Mauritius flag has four horizontal stripes of different colours.',
    explanation:'The Mauritian flag has <b>four horizontal stripes</b>: Red (independence and freedom), Blue (the Indian Ocean), Yellow (the bright future and light of independence), Green (the lush vegetation of the island).' }),

  makeMCQ({ id:'g7sms-people-006', chapterId:'g7sms-people', difficulty:2, subsection:'achievements_arts_sport',
    question:'In which sport has Mauritius won medals at the Indian Ocean Island Games?',
    options:['Athletics and boxing','Skiing and bobsleigh','Formula 1 and rallying','Ice hockey and curling'],
    answer:'Athletics and boxing',
    hint:'The Indian Ocean Island Games are a multi-sport event involving island nations of the Indian Ocean.',
    explanation:'Mauritius has won medals in sports including <b>athletics, swimming, boxing and cycling</b> at the Indian Ocean Island Games, a multi-sport event for islands of the Indian Ocean region.' }),

  // ── Our Country, Our People — individuals_country ────────────────────────

  makeMCQ({ id:'g7sms-people-007', chapterId:'g7sms-people', difficulty:1, subsection:'individuals_country',
    question:'How can an individual shape the life of a country?',
    options:['Through work in many fields','Only by becoming president','Only by becoming wealthy','Only by winning medals'],
    answer:'Through work in many fields',
    hint:'Think of leaders, artists, scientists and volunteers who made a difference.',
    explanation:'Individuals shape a country\'s life through their contributions in many fields: <b>political leadership, artistic creativity, sporting achievement, scientific discovery</b> and <b>community service</b>. Each person\'s contribution matters.' }),

  makeMCQ({ id:'g7sms-people-008', chapterId:'g7sms-people', difficulty:2, subsection:'individuals_country',
    question:'Who was the first President of the Republic of Mauritius (after Mauritius became a republic in 1992)?',
    options:['Sir Veerasamy Ringadoo','Sir Seewoosagur Ramgoolam','Sir Anerood Jugnauth','Navin Ramgoolam'],
    answer:'Sir Veerasamy Ringadoo',
    hint:'He served briefly as the first President when Mauritius became a republic.',
    explanation:'<b>Sir Veerasamy Ringadoo</b> became the first President of the Republic of Mauritius in March 1992 when the country transitioned from a constitutional monarchy to a republic. Sir Anerood Jugnauth succeeded him shortly after.' }),

  makeMCQ({ id:'g7sms-people-009', chapterId:'g7sms-people', difficulty:3, subsection:'contributions_mauritians',
    question:'Why is it important to learn about the contributions of Mauritians from all communities?',
    options:['It builds pride in one nation','Only one group contributed','The law requires us to do so','It helps us win at sport'],
    answer:'It builds pride in one nation',
    hint:'Learning about diverse contributors promotes a sense of shared heritage.',
    explanation:'Learning about contributions from <b>all communities</b> — Creole, Indian, Chinese, European — builds national pride, promotes <b>social cohesion</b> and shows that every cultural group has played a role in building Mauritius.' }),

  makeMCQ({ id:'g7sms-people-010', chapterId:'g7sms-people', difficulty:2, subsection:'achievements_arts_sport',
    question:'Which international prize has a connection to Mauritius through its cultural heritage?',
    options:['UNESCO heritage listing','The Nobel Prize in Physics','An Olympic gold medal','The FIFA World Cup'],
    answer:'UNESCO heritage listing',
    hint:'UNESCO recognises traditional practices that are of outstanding cultural value.',
    explanation:'<b>Sega Tipik</b>, the traditional Sega music of Mauritius, was inscribed on the <b>UNESCO Representative List of Intangible Cultural Heritage</b> in 2014, recognising its unique cultural value to humanity.' }),

  makeMCQ({ id:'g7sms-people-011', chapterId:'g7sms-people', difficulty:2, subsection:'individuals_country',
    question:'What is the role of a Member of Parliament (MP) in Mauritius?',
    options:['To make laws in Parliament','To run a private business','To manage a state school','To control the newspapers'],
    answer:'To make laws in Parliament',
    hint:'An MP is elected by citizens to speak and vote on their behalf.',
    explanation:'A <b>Member of Parliament (MP)</b> is elected by citizens to represent their constituency in the <b>National Assembly</b>. MPs debate and vote on new laws and hold the government accountable.' }),

  makeMCQ({ id:'g7sms-people-012', chapterId:'g7sms-people', difficulty:3, subsection:'achievements_arts_sport',
    question:'The literary tradition of Mauritius in French is significant because:',
    options:['It has world-known writers','It is the only language used','It replaced all oral tales','It began only after 1968'],
    answer:'It has world-known writers',
    hint:'Authors like J.M.G. Le Clézio (Nobel Prize winner) have connections to Mauritius.',
    explanation:'Mauritius has a rich <b>French literary tradition</b>. <b>J.M.G. Le Clézio</b>, winner of the Nobel Prize for Literature (2008), has deep Mauritian roots and has written extensively about Mauritian history and society.' }),

  // ── Where People Live — settlement_factors ────────────────────────────────

  makeMCQ({ id:'g7sms-settlement-001', chapterId:'g7sms-settlement', difficulty:1, subsection:'settlement_factors',
    question:'Which of the following is a physical factor that influences where people choose to settle?',
    options:['Availability of flat land','The location of schools','Government policies','Cultural traditions'],
    answer:'Availability of flat land',
    hint:'Flat land is easier to build on and farm.',
    explanation:'<b>Physical factors</b> that influence settlement include: availability of flat land, water sources, fertile soil and protection from floods or storms. <b>Flat land</b> is one of the most important — it is easier to build on and cultivate.' }),

  makeMCQ({ id:'g7sms-settlement-002', chapterId:'g7sms-settlement', difficulty:1, subsection:'settlement_factors',
    question:'Why do many settlements in Mauritius develop near rivers or water sources?',
    options:['People and crops need water','Rivers are the main roads here','The law says to build there','Rivers keep the land cool'],
    answer:'People and crops need water',
    hint:'Water is essential for drinking, cooking and farming.',
    explanation:'Settlements develop near <b>water sources</b> (rivers, springs) because water is essential for <b>drinking, cooking and farming</b>. Early settlers depended entirely on natural water sources for their survival.' }),

  makeMCQ({ id:'g7sms-settlement-003', chapterId:'g7sms-settlement', difficulty:2, subsection:'settlement_factors',
    question:'Port-Louis is the capital and largest city of Mauritius. Which factor best explains why it developed in its location?',
    options:['It has a natural harbour','It sits on the highest peak','It lies far from the coast','It has no river nearby'],
    answer:'It has a natural harbour',
    hint:'Many capital cities grew because of ports and trade routes.',
    explanation:'<b>Port-Louis</b> developed because of its excellent <b>natural harbour</b>, which made it the ideal centre for trade, commerce and colonial administration. Its sheltered bay allowed ships to dock safely.' }),

  // ── Where People Live — physical_historical ───────────────────────────────

  makeMCQ({ id:'g7sms-settlement-004', chapterId:'g7sms-settlement', difficulty:2, subsection:'physical_historical',
    question:'Sugar estates in Mauritius influenced settlement patterns by:',
    options:['Building worker camps near fields','Keeping people off fertile land','Pushing people into the mountains','Having no effect on settlement'],
    answer:'Building worker camps near fields',
    hint:'Plantation workers needed to live close to their workplace.',
    explanation:'Sugar estates had a major impact on settlement. <b>Labour camps</b> (camps) were created near plantations to house workers. Over time, these camps evolved into the villages and towns found across Mauritius today.' }),

  makeMCQ({ id:'g7sms-settlement-005', chapterId:'g7sms-settlement', difficulty:2, subsection:'physical_historical',
    question:'The central plateau of Mauritius has a cooler climate. How has this affected settlement?',
    options:['It attracted more settlers','It kept every settler away','It was left completely empty','It was used for industry only'],
    answer:'It attracted more settlers',
    hint:'European colonists sometimes preferred cooler highland areas.',
    explanation:'The <b>cooler central plateau</b> attracted colonial officials and settlers who found it more comfortable in the tropical climate. Towns like Curepipe and Quatre Bornes on the plateau were popular with the colonial bourgeoisie.' }),

  makeMCQ({ id:'g7sms-settlement-006', chapterId:'g7sms-settlement', difficulty:3, subsection:'physical_historical',
    question:'Why are most towns and cities in Mauritius found on the coast or coastal plains rather than in the mountains?',
    options:['Flat land, sea trade and fishing','Mountains are closed by law','The mountains are far too cold','The coast has more schools'],
    answer:'Flat land, sea trade and fishing',
    hint:'Think of the combined advantages of coastal locations.',
    explanation:'<b>Coastal locations</b> offer multiple advantages: flat land for construction, <b>access to the sea</b> for trade and fishing, river mouths for fresh water, and natural harbours. These factors explain why settlement is concentrated on the coasts.' }),

  // ── Where People Live — settlement_evolution ──────────────────────────────

  makeMCQ({ id:'g7sms-settlement-007', chapterId:'g7sms-settlement', difficulty:2, subsection:'settlement_evolution',
    question:'How have settlements in Mauritius changed since independence in 1968?',
    options:['Towns have grown quickly','Nothing at all has changed','Everyone has moved to the coast','Settlements have grown smaller'],
    answer:'Towns have grown quickly',
    hint:'Development and economic growth often leads to urbanisation.',
    explanation:'Since independence, <b>urbanisation</b> has increased significantly in Mauritius. People have migrated from rural areas (villages near sugar estates) to urban centres (Port-Louis, Ebène, Rose Hill) seeking employment and services.' }),

  makeMCQ({ id:'g7sms-settlement-008', chapterId:'g7sms-settlement', difficulty:2, subsection:'settlement_evolution',
    question:'The development of the Ebène Cybercity is an example of:',
    options:['A planned business city','A traditional fishing village','A sugar estate headquarters','A colonial historic quarter'],
    answer:'A planned business city',
    hint:'Ebène is associated with business parks and technology companies.',
    explanation:'<b>Ebène Cybercity</b> is a planned, modern urban development designed to attract <b>ICT, financial services and business process outsourcing</b> companies. It shows how economic development drives new settlement patterns.' }),

  makeMCQ({ id:'g7sms-settlement-009', chapterId:'g7sms-settlement', difficulty:3, subsection:'settlement_factors',
    question:'Which combination of factors best explains why Rodrigues has a much smaller population than Mauritius island?',
    options:['Distance, small size, few jobs','Cold weather and high mountains','A law limiting population growth','A complete lack of fresh water'],
    answer:'Distance, small size, few jobs',
    hint:'Think about the physical and economic factors that limit settlement on smaller, remote islands.',
    explanation:'Rodrigues has a smaller population because of its <b>isolation</b> (560 km from Mauritius), its <b>smaller size</b> and <b>fewer economic opportunities</b> (mainly fishing and small-scale farming). These factors have limited large-scale settlement.' }),

  makeMCQ({ id:'g7sms-settlement-010', chapterId:'g7sms-settlement', difficulty:2, subsection:'physical_historical',
    question:'A social factor that influences settlement is:',
    options:['Nearby schools and hospitals','The height of the land','The rock found underground','The pattern of the rainfall'],
    answer:'Nearby schools and hospitals',
    hint:'People tend to settle where they can access services for their families.',
    explanation:'<b>Social factors</b> include access to schools, hospitals, places of worship and community services. Families choose to live where these services are available, which is why towns with good services attract more settlers.' }),

  makeMCQ({ id:'g7sms-settlement-011', chapterId:'g7sms-settlement', difficulty:2, subsection:'settlement_evolution',
    question:'Rural-urban migration in Mauritius mainly happens because:',
    options:['Cities offer jobs and services','Villages have no natural beauty','Cities have a cooler climate','The government orders the move'],
    answer:'Cities offer jobs and services',
    hint:'People move to cities "pull" factors — what cities offer.',
    explanation:'<b>Rural-urban migration</b> is driven by <b>pull factors</b> in cities: more job opportunities (manufacturing, services, finance), better schools and hospitals, and higher living standards. The <b>push factor</b> from rural areas is reduced agricultural employment.' }),

  makeMCQ({ id:'g7sms-settlement-012', chapterId:'g7sms-settlement', difficulty:3, subsection:'settlement_evolution',
    question:'The village of Saint-Gilles in Rodrigues has remained small compared to Port-Mathurin. The main reason is:',
    options:['Port-Mathurin has the port','Saint-Gilles has better soil','Saint-Gilles refused to grow','Port-Mathurin is much cooler'],
    answer:'Port-Mathurin has the port',
    hint:'Administrative centres with ports attract commerce and services.',
    explanation:'<b>Port-Mathurin</b> is the capital of Rodrigues and has a port and administrative functions. These attract <b>commerce, services and jobs</b>, which in turn attract more people to settle there — making it grow larger than smaller villages like Saint-Gilles.' }),

  // ── People, Places & the Environment — natural_resources ─────────────────

  makeMCQ({ id:'g7sms-resources-001', chapterId:'g7sms-resources', difficulty:1, subsection:'natural_resources',
    question:'A natural resource is:',
    options:['Anything useful from nature','Only minerals from the ground','Only goods made in factories','Only animals in the forest'],
    answer:'Anything useful from nature',
    hint:'Natural resources are provided by nature — not made by people.',
    explanation:'A <b>natural resource</b> is anything found in nature that is useful to humans: water, soil, forests, minerals, fish, sunlight and air. They can be renewable or non-renewable.' }),

  makeMCQ({ id:'g7sms-resources-002', chapterId:'g7sms-resources', difficulty:2, subsection:'natural_resources',
    question:'Which of the following is a renewable natural resource?',
    options:['Sunlight','Coal','Petroleum','Diamonds'],
    answer:'Sunlight',
    hint:'Renewable resources can be replenished naturally.',
    explanation:'<b>Solar energy</b> is a renewable resource because sunlight is continuously available. Coal, petroleum and diamonds are <b>non-renewable</b> — they take millions of years to form and cannot be replenished on a human timescale.' }),

  makeMCQ({ id:'g7sms-resources-003', chapterId:'g7sms-resources', difficulty:2, subsection:'natural_resources',
    question:'Mauritius has an Exclusive Economic Zone (EEZ) of approximately:',
    options:['2.3 million km²','1.2 million km²','0.5 million km²','9.1 million km²'],
    answer:'2.3 million km²',
    hint:'The EEZ is the ocean area over which Mauritius has sovereign rights — it is much larger than the land area.',
    explanation:'Mauritius has an <b>Exclusive Economic Zone (EEZ)</b> of approximately <b>2.3 million km²</b> — a vast ocean area rich in fish, minerals and potential energy resources. This is far larger than Mauritius\' land area of about 2,040 km².' }),

  // ── People, Places & the Environment — resource_types ───────────────────

  makeMCQ({ id:'g7sms-resources-004', chapterId:'g7sms-resources', difficulty:1, subsection:'resource_types',
    question:'Water found in rivers, lakes and underground (aquifers) comes from which "sphere"?',
    options:['Hydrosphere','Lithosphere','Atmosphere','Biosphere'],
    answer:'Hydrosphere',
    hint:'"Hydro" means water.',
    explanation:'The <b>hydrosphere</b> includes all water on Earth: oceans, rivers, lakes, glaciers and underground water (aquifers). Mauritius\' rivers and reservoirs are part of the hydrosphere.' }),

  makeMCQ({ id:'g7sms-resources-005', chapterId:'g7sms-resources', difficulty:2, subsection:'resource_types',
    question:'Soil and minerals (like iron ore and basalt) come from which "sphere"?',
    options:['Lithosphere','Hydrosphere','Atmosphere','Biosphere'],
    answer:'Lithosphere',
    hint:'"Litho" comes from Greek meaning "stone" or "rock".',
    explanation:'The <b>lithosphere</b> is the solid outer layer of the Earth — it includes rocks, soils and minerals. In Mauritius, basalt rock (from volcanic activity) is an important lithospheric resource used in construction.' }),

  makeMCQ({ id:'g7sms-resources-006', chapterId:'g7sms-resources', difficulty:2, subsection:'resource_types',
    question:'Plants, animals and fish are natural resources found in the:',
    options:['Biosphere','Lithosphere','Hydrosphere','Atmosphere'],
    answer:'Biosphere',
    hint:'"Bio" means life.',
    explanation:'The <b>biosphere</b> includes all living organisms — plants, animals, fungi and microorganisms. Fish in Mauritius\' lagoons, forests of indigenous trees and sugarcane crops are all biosphere resources.' }),

  makeMCQ({ id:'g7sms-resources-007', chapterId:'g7sms-resources', difficulty:2, subsection:'resource_types',
    question:'Wind and solar energy come from which "sphere"?',
    options:['Atmosphere','Lithosphere','Hydrosphere','Biosphere'],
    answer:'Atmosphere',
    hint:'Wind and sunlight move through the air layer around Earth.',
    explanation:'The <b>atmosphere</b> — the layer of gases surrounding Earth — provides resources like wind (for wind turbines) and sunlight/solar radiation (for solar panels). Mauritius is increasingly harnessing these resources.' }),

  // ── People, Places & the Environment — resources_settlement ──────────────

  makeMCQ({ id:'g7sms-resources-008', chapterId:'g7sms-resources', difficulty:2, subsection:'resources_settlement',
    question:'Why did sugarcane become such an important natural resource for Mauritius?',
    options:['Rich soil, warmth and rain','No other resource existed','The British ordered it grown','The crop needs no water'],
    answer:'Rich soil, warmth and rain',
    hint:'The physical environment of Mauritius naturally suited sugarcane cultivation.',
    explanation:'Mauritius\' <b>fertile volcanic soil, warm climate and reliable rainfall</b> made it ideal for sugarcane cultivation. Sugar became the backbone of the Mauritian economy from the 18th to the 20th century.' }),

  makeMCQ({ id:'g7sms-resources-009', chapterId:'g7sms-resources', difficulty:2, subsection:'resources_settlement',
    question:'How have natural resources historically influenced where people live in Mauritius?',
    options:['Good land and water drew people','People settled quite at random','Resources changed nothing at all','People settled only near the sea'],
    answer:'Good land and water drew people',
    hint:'People followed the resources — farming and water shaped where villages grew.',
    explanation:'<b>Fertile land</b> for sugarcane and <b>water sources</b> (rivers, springs) attracted settlement in specific areas. Labour camps and villages grew near plantations, and these evolved into today\'s villages and towns.' }),

  makeMCQ({ id:'g7sms-resources-010', chapterId:'g7sms-resources', difficulty:3, subsection:'resources_settlement',
    question:'Mauritius\' tourism industry is a major economic resource. Which natural resource is most important to tourism?',
    options:['Reefs, lagoons and beaches','Coal seams underground','Glaciers on the mountains','Rainforest across the island'],
    answer:'Reefs, lagoons and beaches',
    hint:'Tourists come to Mauritius mainly for its marine environment and scenery.',
    explanation:'Tourism in Mauritius depends heavily on its <b>coral reefs, clear turquoise lagoons, white-sand beaches and biodiversity</b>. These natural resources attract millions of visitors and generate significant income for the country.' }),

  makeMCQ({ id:'g7sms-resources-011', chapterId:'g7sms-resources', difficulty:2, subsection:'natural_resources',
    question:'Which of the following is a non-renewable resource found in Mauritius?',
    options:['Basalt rock','Ocean fish','Rainwater','Sugarcane'],
    answer:'Basalt rock',
    hint:'Once basalt is quarried and used, it cannot be replaced quickly.',
    explanation:'<b>Basalt</b> is a volcanic rock widely used in Mauritius for road construction and buildings. It is a <b>non-renewable</b> resource because it takes millions of years to form. Fish, rainwater and sugarcane are renewable.' }),

  makeMCQ({ id:'g7sms-resources-012', chapterId:'g7sms-resources', difficulty:3, subsection:'resource_types',
    question:'Mauritius is developing offshore oil and mineral exploration in its EEZ. Why is the EEZ economically important?',
    options:['It gives rights over sea wealth','It lets any country fish there','It is only for military ships','It brings no money to Mauritius'],
    answer:'It gives rights over sea wealth',
    hint:'The EEZ gives a country exclusive rights to exploit ocean resources within 200 nautical miles.',
    explanation:'The <b>EEZ (Exclusive Economic Zone)</b> extends 200 nautical miles from Mauritius\' coastline. Within it, Mauritius has exclusive rights to <b>fish, seabed minerals, oil and gas exploration</b> — making it a huge economic asset for a small island nation.' })

);
