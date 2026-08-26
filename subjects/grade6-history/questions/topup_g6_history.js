'use strict';
// Grade 6 History & Geography — top-up questions.

// --- g6-map-skills (6 questions: g6h-map-050..055) ---
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g6h-map-050', chapterId:'g6-map-skills', difficulty:1,
    question:'On a contour map, what do closely spaced contour lines indicate?',
    options:['A gentle, almost flat slope','A steep slope or cliff','A wide river valley','A flat coastal plain'],
    answer:'A steep slope or cliff',
    hint:'Think about how far apart the lines need to be to show a gradual rise.',
    explanation:'Contour lines join points of equal height. When lines are close together, the land rises steeply over a short distance. Widely spaced contours show a gentle gradient.' }),

  makeMCQ({ id:'g6h-map-051', chapterId:'g6-map-skills', difficulty:1,
    question:'When reading a grid reference on a map, which coordinate do you read FIRST?',
    options:['The row number (northing — up the side)','The column number (easting — along the bottom)','The highest contour line number','The map scale'],
    answer:'The column number (easting — along the bottom)',
    hint:'Remember: "along the corridor, then up the stairs."',
    explanation:'Grid references are always read easting first (the column, read along the bottom), then northing (the row, read up the side). The phrase "along the corridor, then up the stairs" helps you remember.' }),

  makeMCQ({ id:'g6h-map-052', chapterId:'g6-map-skills', difficulty:2,
    question:'Latitude lines on a map run in which direction, and what do they measure?',
    options:[
      'North to south; they measure distance east or west of the Prime Meridian',
      'East to west (horizontally); they measure distance north or south of the equator',
      'Diagonally; they measure distance from the nearest coast',
      'East to west; they measure altitude above sea level'],
    answer:'East to west (horizontally); they measure distance north or south of the equator',
    hint:'The equator is 0° latitude and runs horizontally around the globe.',
    explanation:'Latitude lines (parallels) run horizontally (east to west) on a map and measure how far north or south a place is from the equator. The equator is 0°; the poles are 90°N and 90°S.' }),

  makeMCQ({ id:'g6h-map-053', chapterId:'g6-map-skills', difficulty:2,
    question:'A map has a scale of 1 cm : 5 km. If two towns are 3 cm apart on the map, what is the real distance between them?',
    options:['3 km','5 km','15 km','53 km'],
    answer:'15 km',
    hint:'Multiply the map distance by the scale factor.',
    explanation:'Scale 1 cm = 5 km. Real distance = 3 cm × 5 km = 15 km. The scale tells you how many real-world kilometres are represented by each centimetre on the map.' }),

  makeMCQ({ id:'g6h-map-054', chapterId:'g6-map-skills', difficulty:1,
    question:'Mauritius is located at approximately which latitude and longitude?',
    options:['20°N, 57°E','20°S, 57°W','20°S, 57°E','57°S, 20°E'],
    answer:'20°S, 57°E',
    hint:'Mauritius is south of the equator and east of the Prime Meridian.',
    explanation:'Mauritius lies at approximately 20°S (south of the equator) and 57°E (east of the Prime Meridian), placing it in the southern Indian Ocean.' }),

  makeMCQ({ id:'g6h-map-055', chapterId:'g6-map-skills', difficulty:3,
    question:'What is the difference between a physical map and a political map?',
    options:[
      'A physical map shows country borders and capitals; a political map shows mountains and rivers',
      'A physical map shows natural features such as mountains, rivers, and height; a political map shows countries, capitals, and borders',
      'Both types of map show exactly the same information in different colours',
      'A political map is used for navigation; a physical map is used for elections'],
    answer:'A physical map shows natural features such as mountains, rivers, and height; a political map shows countries, capitals, and borders',
    hint:'One shows what nature made; the other shows what humans created.',
    explanation:'A physical map shows natural features — mountains, rivers, plains, and elevation. A political map shows human-made divisions — country borders, capitals, cities, and regions.' })
);

// --- g6enr-symbols (12 questions: g6h-enr-sym-050..061) ---
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g6h-enr-sym-050', chapterId:'g6enr-symbols', difficulty:1,
    question:'How many horizontal stripes does the national flag of Mauritius have?',
    options:['2','3','4','5'],
    answer:'4',
    hint:'Count the number of different-coloured bands on the national flag.',
    explanation:'The Mauritian flag has 4 equal horizontal stripes: red at the top, then blue, yellow, and green at the bottom. Each colour has a specific meaning related to the country\'s identity.' }),

  makeMCQ({ id:'g6h-enr-sym-051', chapterId:'g6enr-symbols', difficulty:2,
    question:'What does the BLUE stripe on the flag of Mauritius represent?',
    options:['The struggle for independence from Britain','The Indian Ocean surrounding the island','New light and a bright future','The lush agriculture and vegetation'],
    answer:'The Indian Ocean surrounding the island',
    hint:'Think about what surrounds the island of Mauritius.',
    explanation:'The blue stripe on the Mauritian flag represents the Indian Ocean, which surrounds the island. Blue is placed second from the top, between the red and yellow stripes.' }),

  makeMCQ({ id:'g6h-enr-sym-052', chapterId:'g6enr-symbols', difficulty:2,
    question:'What does the RED stripe at the top of the Mauritius flag represent?',
    options:['The Indian Ocean','The lush green vegetation','The struggle for independence','The brightness of a new era'],
    answer:'The struggle for independence',
    hint:'Red often symbolises struggle, courage, and sacrifice in national flags.',
    explanation:'The red stripe represents the blood shed and the struggle for independence. Independence was achieved on 12 March 1968, and red commemorates those sacrifices.' }),

  makeMCQ({ id:'g6h-enr-sym-053', chapterId:'g6enr-symbols', difficulty:2,
    question:'What does the Mauritian motto "Stella Clavisque Maris Indici" mean in English?',
    options:['Land of the Free Indian Ocean','Peace and Prosperity of the Indian Ocean','Star and Key of the Indian Ocean','Island of Stars in the Indian Ocean'],
    answer:'Star and Key of the Indian Ocean',
    hint:'Break the Latin words into parts: what does "stella" mean? What does "clavis" mean?',
    explanation:'"Stella Clavisque Maris Indici" translates as "Star and Key of the Indian Ocean." The motto reflects Mauritius\'s historic strategic importance as a crossroads of Indian Ocean trade routes.' }),

  makeMCQ({ id:'g6h-enr-sym-054', chapterId:'g6enr-symbols', difficulty:1,
    question:'What is the national bird of Mauritius, even though it has been extinct since the 17th century?',
    options:['Echo Parakeet','Pink Pigeon','Dodo','Mauritius Kestrel'],
    answer:'Dodo',
    hint:'Only one of these birds cannot be found anywhere on Earth today.',
    explanation:'The Dodo (Raphus cucullarius) is the national bird of Mauritius. It was endemic to the island and became extinct around 1681 due to hunting by sailors and predation by introduced animals.' }),

  makeMCQ({ id:'g6h-enr-sym-055', chapterId:'g6enr-symbols', difficulty:2,
    question:'What does the Dodo on the Mauritius coat of arms represent?',
    options:[
      'The country\'s strength in war',
      'Mauritius\'s unique endemic wildlife — now sadly extinct',
      'The fishing industry of Mauritius',
      'The island\'s connection to Africa'],
    answer:'Mauritius\'s unique endemic wildlife — now sadly extinct',
    hint:'The Dodo lived only in Mauritius and nowhere else on Earth.',
    explanation:'The Dodo on the coat of arms represents Mauritius\'s unique biodiversity and its endemic heritage. It serves as a reminder of the importance of conservation — the Dodo was driven to extinction by human activity.' }),

  makeMCQ({ id:'g6h-enr-sym-056', chapterId:'g6enr-symbols', difficulty:2,
    question:'In which year was the Aapravasi Ghat in Port Louis declared a UNESCO World Heritage Site?',
    options:['1999','2004','2006','2008'],
    answer:'2006',
    hint:'It was inscribed in the mid-2000s.',
    explanation:'The Aapravasi Ghat was inscribed as a UNESCO World Heritage Site in 2006. It was the immigration depot where indentured labourers arrived from India, Africa, and elsewhere after the abolition of slavery.' }),

  makeMCQ({ id:'g6h-enr-sym-057', chapterId:'g6enr-symbols', difficulty:2,
    question:'What is the political relationship between Rodrigues and Mauritius?',
    options:[
      'Rodrigues is an independent country',
      'Rodrigues is a French overseas territory',
      'Rodrigues is an autonomous region of the Republic of Mauritius',
      'Rodrigues is a British crown dependency'],
    answer:'Rodrigues is an autonomous region of the Republic of Mauritius',
    hint:'Rodrigues has its own Regional Assembly but is part of the same republic.',
    explanation:'Rodrigues is an autonomous region of the Republic of Mauritius. It has its own Regional Assembly and Commissioner but is governed under the Mauritian constitution.' }),

  makeMCQ({ id:'g6h-enr-sym-058', chapterId:'g6enr-symbols', difficulty:1,
    question:'What is the national flower of Mauritius?',
    options:['Bougainvillea','Lotus','Trochetia boutoniana','Hibiscus'],
    answer:'Trochetia boutoniana',
    hint:'It is an endemic plant also called "Boucle d\'oreille."',
    explanation:'Trochetia boutoniana, commonly called "Boucle d\'oreille," is the national flower of Mauritius. It is endemic to Mauritius and is found in the Black River Gorges region.' }),

  makeMCQ({ id:'g6h-enr-sym-059', chapterId:'g6enr-symbols', difficulty:3,
    question:'The star on the Mauritius coat of arms represents which aspect of the country\'s administrative structure?',
    options:[
      'The 4 cardinal directions plus the centre of the island',
      'The 7 districts of Mauritius plus the island of Rodrigues',
      'The 8 planets of the Solar System',
      'The 6 administrative regions of Rodrigues'],
    answer:'The 7 districts of Mauritius plus the island of Rodrigues',
    hint:'Mauritius is divided into districts; Rodrigues is a separate island region.',
    explanation:'The star on the coat of arms has points representing the 7 districts of mainland Mauritius plus Rodrigues, reflecting the country\'s administrative divisions and the inclusion of Rodrigues.' }),

  makeMCQ({ id:'g6h-enr-sym-060', chapterId:'g6enr-symbols', difficulty:2,
    question:'Why are the Blue Penny and Red Penny stamps of 1847 considered among the most valuable stamps in the world?',
    options:[
      'They are made of real silver and gold',
      'They are among the world\'s rarest stamps, with very few surviving examples in existence',
      'They were the very first postage stamps ever printed anywhere in the world',
      'They are the largest postage stamps ever produced'],
    answer:'They are among the world\'s rarest stamps, with very few surviving examples in existence',
    hint:'Rarity is the main reason stamps become extremely valuable.',
    explanation:'The 1847 Blue Penny and Red Penny of Mauritius are among the rarest and most valuable stamps in the world because only a very small number survive. They were among the first stamps issued in the British Empire.' }),

  makeMCQ({ id:'g6h-enr-sym-061', chapterId:'g6enr-symbols', difficulty:2,
    question:'In which year was Le Morne Brabant inscribed as a UNESCO World Heritage Site, recognising it as a symbol of resistance to slavery?',
    options:['2001','2004','2006','2008'],
    answer:'2008',
    hint:'It was inscribed later in the 2000s than the Aapravasi Ghat.',
    explanation:'Le Morne Brabant was inscribed as a UNESCO World Heritage Site in 2008. The mountain was a refuge for escaped slaves (Maroons) who hid in its caves and cliffs, making it a powerful symbol of freedom and resistance.' })
);

// --- g6enr-world (12 questions: g6h-enr-wld-050..061) ---
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g6h-enr-wld-050', chapterId:'g6enr-world', difficulty:1,
    question:'What is the capital city of Madagascar?',
    options:['Nairobi','Maputo','Antananarivo','Moroni'],
    answer:'Antananarivo',
    hint:'Madagascar is the large island off the east coast of Africa.',
    explanation:'The capital of Madagascar is Antananarivo (sometimes called Tana). Madagascar is the fourth largest island in the world and lies in the Indian Ocean, west of Mauritius.' }),

  makeMCQ({ id:'g6h-enr-wld-051', chapterId:'g6enr-world', difficulty:1,
    question:'What is the capital city of the Seychelles?',
    options:['Malé','Victoria','Port Louis','Saint-Denis'],
    answer:'Victoria',
    hint:'It is one of the world\'s smallest capital cities, on the main island of the Seychelles.',
    explanation:'The capital of the Seychelles is Victoria, located on the main island of Mahé. It is one of the smallest capital cities in the world. The Seychelles is an archipelago in the northern Indian Ocean.' }),

  makeMCQ({ id:'g6h-enr-wld-052', chapterId:'g6enr-world', difficulty:1,
    question:'What is the capital city of the Maldives?',
    options:['Colombo','Malé','Victoria','Moroni'],
    answer:'Malé',
    hint:'It is on a tiny island and is one of the world\'s most densely populated cities.',
    explanation:'The capital of the Maldives is Malé. The Maldives is an archipelago nation in the Indian Ocean, south-west of Sri Lanka, and is famous for its low-lying coral atolls.' }),

  makeMCQ({ id:'g6h-enr-wld-053', chapterId:'g6enr-world', difficulty:2,
    question:'Which region of Africa includes the countries of Kenya, Tanzania, and Ethiopia?',
    options:['North Africa','West Africa','East Africa','Southern Africa'],
    answer:'East Africa',
    hint:'These countries are on the right-hand (eastern) side of the African continent.',
    explanation:'Kenya, Tanzania, and Ethiopia are all in East Africa. This region borders the Indian Ocean and includes the Great Rift Valley, the source of many of Africa\'s major rivers and lakes.' }),

  makeMCQ({ id:'g6h-enr-wld-054', chapterId:'g6enr-world', difficulty:2,
    question:'Nigeria, Senegal, and Ghana are all countries in which region of Africa?',
    options:['North Africa','West Africa','East Africa','Central Africa'],
    answer:'West Africa',
    hint:'These countries are on the left-hand (western) side of Africa, facing the Atlantic Ocean.',
    explanation:'Nigeria, Senegal, and Ghana are all located in West Africa, along the Atlantic coast. Nigeria is the most populous country in Africa. West Africa also includes countries such as Mali, Ivory Coast, and Burkina Faso.' }),

  makeMCQ({ id:'g6h-enr-wld-055', chapterId:'g6enr-world', difficulty:1,
    question:'Which is the longest river in Africa?',
    options:['Congo','Zambezi','Niger','Nile'],
    answer:'Nile',
    hint:'This river is famous for its connection to ancient Egyptian civilization.',
    explanation:'The Nile is the longest river in Africa (approximately 6,650 km) and is one of the longest in the world. It flows northwards through Uganda, Sudan, and Egypt before reaching the Mediterranean Sea.' }),

  makeMCQ({ id:'g6h-enr-wld-056', chapterId:'g6enr-world', difficulty:1,
    question:'Which is the largest continent in the world by area?',
    options:['Africa','North America','Asia','Europe'],
    answer:'Asia',
    hint:'It contains China, India, Russia (the Asian part), and the Middle East.',
    explanation:'Asia is the largest continent by area, covering approximately 44.6 million km². It is home to about 60% of the world\'s population and includes the world\'s highest peak, Mount Everest.' }),

  makeMCQ({ id:'g6h-enr-wld-057', chapterId:'g6enr-world', difficulty:1,
    question:'Which continent is the smallest in the world by area?',
    options:['Europe','Antarctica','South America','Australia/Oceania'],
    answer:'Australia/Oceania',
    hint:'The key word is "smallest" — think about which of these options covers the least area.',
    explanation:'Australia/Oceania is the smallest continent by area (approximately 8.5 million km²). It includes Australia, New Zealand, Papua New Guinea, and thousands of Pacific islands.' }),

  makeMCQ({ id:'g6h-enr-wld-058', chapterId:'g6enr-world', difficulty:2,
    question:'Which river carries the greatest volume of fresh water of any river in the world?',
    options:['Nile','Amazon','Yangtze','Mississippi'],
    answer:'Amazon',
    hint:'It flows through the world\'s largest tropical rainforest.',
    explanation:'The Amazon in South America carries more water than any other river in the world — about 20% of all fresh water that flows into the oceans comes from the Amazon. It flows eastwards through Brazil into the Atlantic.' }),

  makeMCQ({ id:'g6h-enr-wld-059', chapterId:'g6enr-world', difficulty:1,
    question:'What is the capital city of Sri Lanka, the island nation in the Indian Ocean near southern India?',
    options:['Mumbai','Delhi','Colombo','Dhaka'],
    answer:'Colombo',
    hint:'It is on the south-west coast of the island.',
    explanation:'Colombo is the commercial capital and largest city of Sri Lanka. (Sri Jayawardenepura Kotte is the legislative capital, but Colombo is the main city.) Sri Lanka is located south-east of the tip of India.' }),

  makeMCQ({ id:'g6h-enr-wld-060', chapterId:'g6enr-world', difficulty:2,
    question:'Which of the following countries is located in SOUTHERN Africa?',
    options:['Morocco','Nigeria','Ethiopia','South Africa'],
    answer:'South Africa',
    hint:'Its name includes its geographic position on the continent.',
    explanation:'South Africa is in the southern tip of the African continent. Morocco is in North Africa; Nigeria is in West Africa; Ethiopia is in East Africa. Southern Africa also includes Zimbabwe and Mozambique.' }),

  makeMCQ({ id:'g6h-enr-wld-061', chapterId:'g6enr-world', difficulty:2,
    question:'What is the capital of Réunion, the French overseas territory located near Mauritius in the Indian Ocean?',
    options:['Saint-Pierre','Saint-Denis','Saint-Paul','Fort-de-France'],
    answer:'Saint-Denis',
    hint:'It is on the northern coast of the island.',
    explanation:'Saint-Denis is the capital and largest city of Réunion. Réunion is a French overseas territory east of Madagascar and south-west of Mauritius. Fort-de-France is the capital of Martinique, not Réunion.' })
);

// --- g6enr-personalities (9 questions: g6h-enr-per-050..058) ---
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g6h-enr-per-050', chapterId:'g6enr-personalities', difficulty:1,
    question:'Sir Seewoosagur Ramgoolam is known as the "Father of the Nation" of Mauritius. What was his historic role?',
    options:[
      'First President of the Republic of Mauritius',
      'First Prime Minister of independent Mauritius at independence in 1968',
      'First Governor-General appointed by the British',
      'First Mayor of Port Louis'],
    answer:'First Prime Minister of independent Mauritius at independence in 1968',
    hint:'He led Mauritius to independence on 12 March 1968.',
    explanation:'Sir Seewoosagur Ramgoolam (SSR) was the first Prime Minister of independent Mauritius. He led the country to independence from Britain on 12 March 1968 and is celebrated as the Father of the Nation.' }),

  makeMCQ({ id:'g6h-enr-per-051', chapterId:'g6enr-personalities', difficulty:2,
    question:'Barthélemy d\'Epinay was an important figure in Mauritian history. What is he best known for?',
    options:[
      'Founding the city of Port Louis as the main harbour',
      'Defending the rights of freed slaves after the abolition of slavery in 1835',
      'Leading Mauritius to independence from Britain in 1968',
      'Being the first Prime Minister of Mauritius'],
    answer:'Defending the rights of freed slaves after the abolition of slavery in 1835',
    hint:'His work is linked to the period after slavery was abolished in 1835.',
    explanation:'Barthélemy d\'Epinay was a lawyer who played a key role defending the legal rights of freed slaves after the abolition of slavery in the British Empire in 1835, helping to shape post-slavery Mauritian society.' }),

  makeMCQ({ id:'g6h-enr-per-052', chapterId:'g6enr-personalities', difficulty:2,
    question:'Bertrand François Mahé de Labourdonnais was a key figure in Mauritius\'s early history. What is he most remembered for?',
    options:[
      'Abolishing slavery in Mauritius',
      'Founding Port Louis as the island\'s main city and harbour',
      'Leading Mauritius to independence from Britain',
      'Writing the first constitution of Mauritius'],
    answer:'Founding Port Louis as the island\'s main city and harbour',
    hint:'Port Louis is named after King Louis XV of France; Labourdonnais built it up.',
    explanation:'Labourdonnais was a French colonial governor who developed Port Louis into the main city and harbour of Mauritius (then called Île de France) in the 18th century. He built the city\'s infrastructure and fortifications.' }),

  makeMCQ({ id:'g6h-enr-per-053', chapterId:'g6enr-personalities', difficulty:2,
    question:'Who was the first British Governor of Mauritius after Britain took control of the island in 1810?',
    options:['General Decaen','Sir Anerood Jugnauth','Robert Farquhar','Barthélemy d\'Epinay'],
    answer:'Robert Farquhar',
    hint:'He took charge immediately after the British captured the island from the French.',
    explanation:'Robert Farquhar was appointed the first British Governor of Mauritius in 1810 after Britain defeated France at the Battle of Grand Port and captured the island. He governed until 1823 and worked to abolish the slave trade.' }),

  makeMCQ({ id:'g6h-enr-per-054', chapterId:'g6enr-personalities', difficulty:2,
    question:'Sookdeo Bissoondoyal was a significant leader in Mauritius. Which of the following best describes his contribution?',
    options:[
      'He led the campaign against deforestation in Mauritius',
      'He promoted education and the Hindu cultural awakening, and was a key political leader',
      'He founded the first newspaper in Mauritius',
      'He designed the Mauritian national flag'],
    answer:'He promoted education and the Hindu cultural awakening, and was a key political leader',
    hint:'He worked in education and politics, especially with the Indo-Mauritian community.',
    explanation:'Sookdeo Bissoondoyal was an educator and political leader who championed the cause of Hindu cultural identity, promoted education for the working class, and founded the Independent Forward Bloc political party.' }),

  makeMCQ({ id:'g6h-enr-per-055', chapterId:'g6enr-personalities', difficulty:2,
    question:'Rémy Ollier was an important social activist in 19th-century Mauritius. What cause did he champion?',
    options:[
      'Independence from Britain',
      'Equal rights and an end to racial discrimination in Mauritius',
      'The construction of Port Louis harbour',
      'The abolition of the sugar cane industry'],
    answer:'Equal rights and an end to racial discrimination in Mauritius',
    hint:'He worked in the decades after slavery was abolished, fighting for equal treatment.',
    explanation:'Rémy Ollier was a journalist and social activist who campaigned against racial discrimination and for equal civil rights for Mauritians of all backgrounds in the 1840s. He founded a newspaper to spread his ideas.' }),

  makeMCQ({ id:'g6h-enr-per-056', chapterId:'g6enr-personalities', difficulty:2,
    question:'Sir Anerood Jugnauth served Mauritius as both Prime Minister and President. Which statement about his service is correct?',
    options:[
      'He was the first Prime Minister of independent Mauritius',
      'He served for only a short term as Prime Minister',
      'He was the longest-serving Prime Minister and also served as President of Mauritius',
      'He was only ever President and never served as Prime Minister'],
    answer:'He was the longest-serving Prime Minister and also served as President of Mauritius',
    hint:'He held the top government position for many years across multiple terms.',
    explanation:'Sir Anerood Jugnauth (SAJ) served as Prime Minister of Mauritius for many years across several terms, making him the longest-serving PM. He later became President of Mauritius (2003–2012) and served again as PM thereafter.' }),

  makeMCQ({ id:'g6h-enr-per-057', chapterId:'g6enr-personalities', difficulty:3,
    question:'General Decaen and Robert Farquhar were both governors of Mauritius. Which statement correctly describes their roles?',
    options:[
      'Both were French governors during the colonial period',
      'Decaen was the last French governor of the island; Farquhar was the first British governor',
      'Both were British governors who governed the island in the 20th century',
      'Decaen founded Port Louis; Farquhar abolished slavery across the empire'],
    answer:'Decaen was the last French governor of the island; Farquhar was the first British governor',
    hint:'Think about when France and Britain each controlled the island.',
    explanation:'General Charles Decaen was the last French governor of Île de France (Mauritius). When Britain captured the island in 1810, Robert Farquhar became the first British governor. This marked the change from French to British rule.' }),

  makeMCQ({ id:'g6h-enr-per-058', chapterId:'g6enr-personalities', difficulty:2,
    question:'Navin Ramgoolam has served as Prime Minister of Mauritius. What family connection does he have to another famous Mauritian leader?',
    options:[
      'He is the brother of Sir Anerood Jugnauth',
      'He is the son of Sir Seewoosagur Ramgoolam, the first Prime Minister of Mauritius',
      'He is the grandson of Barthélemy d\'Epinay',
      'He is the nephew of Sookdeo Bissoondoyal'],
    answer:'He is the son of Sir Seewoosagur Ramgoolam, the first Prime Minister of Mauritius',
    hint:'Both share the same family name for a reason.',
    explanation:'Navin Ramgoolam is the son of Sir Seewoosagur Ramgoolam (SSR), the Father of the Nation and first Prime Minister of Mauritius. Navin has himself served as Prime Minister, continuing his father\'s political legacy.' })
);
