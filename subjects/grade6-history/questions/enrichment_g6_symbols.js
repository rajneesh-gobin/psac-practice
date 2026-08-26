'use strict';
// Grade 6 History & Geography - Enrichment: Mauritius Identity & Symbols
// Bonus content: national flag, coat of arms, UNESCO sites, national symbols
// IDs format: g6enr-sym-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6enr-sym-001', chapterId:'g6enr-symbols', subsection:'national', difficulty:1,
    question:'What is the national flower of Mauritius?',
    options:['Hibiscus','Rose','Trochetia boutoniana (boucle d\'oreille)','Bird of Paradise'],
    answer:'Trochetia boutoniana (boucle d\'oreille)',
    hint:'It is an endangered flower found only in Mauritius, often called "boucle d\'oreille" in French.',
    explanation:'The national flower of Mauritius is the <b>Trochetia boutoniana</b>, nicknamed "boucle d\'oreille" (earring) because of its shape; it is an endemic and endangered species found only on the island.' }),

  makeMCQ({ id:'g6enr-sym-002', chapterId:'g6enr-symbols', subsection:'national', difficulty:1,
    question:'On which date does Mauritius celebrate its National Day (Independence Day)?',
    options:['1 January','12 March','12 June','12 August'],
    answer:'12 March',
    hint:'Mauritius gained independence in 1968 on this date.',
    explanation:'Mauritius celebrates National Day on <b>12 March</b>, the date it gained independence from Britain in <b>1968</b>; the same date in 1992 also marks when Mauritius became a Republic.' }),

  makeMCQ({ id:'g6enr-sym-003', chapterId:'g6enr-symbols', subsection:'flag', difficulty:1,
    question:'How many horizontal colour stripes does the Mauritian national flag have?',
    options:['Two','Three','Four','Five'],
    answer:'Four',
    hint:'Each stripe represents something important about the nation.',
    explanation:'The Mauritian national flag has <b>four</b> horizontal stripes - red, blue, yellow and green - each representing a different aspect of the nation\'s identity and history.' }),

  makeMCQ({ id:'g6enr-sym-004', chapterId:'g6enr-symbols', subsection:'flag', difficulty:1,
    question:'Which colour appears at the TOP of the Mauritian national flag, representing freedom from oppression and slavery?',
    options:['Blue','Yellow','Green','Red'],
    answer:'Red',
    hint:'This colour is traditionally associated with revolution and liberation worldwide.',
    explanation:'<b>Red</b> is the top stripe of the Mauritian flag and represents <b>freedom from oppression and slavery</b> - a reference to the island\'s history of colonialism and the abolition of slavery.' }),

  makeMCQ({ id:'g6enr-sym-005', chapterId:'g6enr-symbols', subsection:'national', difficulty:1,
    question:'What famous phrase describes Mauritius\'s important position in the Indian Ocean?',
    options:['Pearl of the Indian Ocean','Gateway to Africa','Star and Key of the Indian Ocean','Heart of the Southern Seas'],
    answer:'Star and Key of the Indian Ocean',
    hint:'This phrase also appears as the translation of Mauritius\'s national motto.',
    explanation:'Mauritius is called the <b>"Star and Key of the Indian Ocean"</b> - a phrase that describes its strategic importance as a midpoint between Africa, India and Asia, also reflected in its national motto.' }),

  makeMCQ({ id:'g6enr-sym-006', chapterId:'g6enr-symbols', subsection:'flag', difficulty:2,
    question:'What does the BLUE stripe on the Mauritian national flag represent?',
    options:['The sky above Mauritius','The Indian Ocean that surrounds the island','The rivers of Mauritius','Peace between communities'],
    answer:'The Indian Ocean that surrounds the island',
    hint:'Mauritius is a small island entirely surrounded by this large body of water.',
    explanation:'The <b>blue</b> stripe on the Mauritian flag represents the <b>Indian Ocean</b>, which surrounds the island and has shaped its entire history as a trading post and colony.' }),

  makeMCQ({ id:'g6enr-sym-007', chapterId:'g6enr-symbols', subsection:'flag', difficulty:2,
    question:'What does the GREEN stripe at the BOTTOM of the Mauritian flag represent?',
    options:['The mountains of Mauritius','Agriculture and the lush vegetation of the island','The green sea around Rodrigues','The Indian community'],
    answer:'Agriculture and the lush vegetation of the island',
    hint:'Sugar cane and other crops have been central to Mauritius\'s economy for centuries.',
    explanation:'The <b>green</b> stripe represents Mauritius\'s <b>agriculture and lush tropical vegetation</b>, reflecting the island\'s rich natural environment and the central role of sugar cane farming in its history and economy.' }),

  makeMCQ({ id:'g6enr-sym-008', chapterId:'g6enr-symbols', subsection:'flag', difficulty:2,
    question:'What does the YELLOW stripe on the Mauritian flag represent?',
    options:['Gold found in Mauritius','The beaches of Mauritius','The light of independence and the golden future of the nation','The Chinese community'],
    answer:'The light of independence and the golden future of the nation',
    hint:'Yellow is often used in flags to symbolise hope and prosperity.',
    explanation:'The <b>yellow</b> stripe represents the <b>light of independence and the bright, golden future</b> of Mauritius, symbolising the optimism and hope that came with becoming an independent nation in 1968.' }),

  makeMCQ({ id:'g6enr-sym-009', chapterId:'g6enr-symbols', subsection:'national', difficulty:2,
    question:'On which date did Mauritius become a Republic, replacing the Governor-General with a President as Head of State?',
    options:['12 March 1968','12 March 1979','12 March 1992','12 March 2000'],
    answer:'12 March 1992',
    hint:'This happened exactly 24 years after independence, on the same date.',
    explanation:'Mauritius became a <b>Republic on 12 March 1992</b>, exactly 24 years after independence, replacing the Governor-General (the British monarch\'s representative) with a Mauritian President as Head of State.' }),

  makeMCQ({ id:'g6enr-sym-010', chapterId:'g6enr-symbols', subsection:'coat_of_arms', difficulty:2,
    question:'The Mauritius national motto "Stella Clavisque Maris Indici" is written in which ancient language?',
    options:['French','Hindi','Arabic','Latin'],
    answer:'Latin',
    hint:'This language was used by the Roman Empire and is still used for official mottoes and scientific names.',
    explanation:'The Mauritian national motto is written in <b>Latin</b> - "Stella Clavisque Maris Indici" - which translates to "Star and Key of the Indian Ocean," reflecting the island\'s strategic importance.' }),

  makeMCQ({ id:'g6enr-sym-011', chapterId:'g6enr-symbols', subsection:'unesco', difficulty:3,
    question:'In which year was Aapravasi Ghat inscribed as a UNESCO World Heritage Site?',
    options:['1998','2002','2006','2010'],
    answer:'2006',
    hint:'Le Morne Brabant was inscribed two years later, in 2008.',
    explanation:'<b>Aapravasi Ghat</b> was inscribed as a UNESCO World Heritage Site in <b>2006</b>, recognised for its outstanding universal value as the site where the modern system of indentured labour began after the abolition of slavery.' }),

  makeMCQ({ id:'g6enr-sym-012', chapterId:'g6enr-symbols', subsection:'unesco', difficulty:3,
    question:'In which year was Le Morne Brabant inscribed as a UNESCO World Heritage Site, and why?',
    options:[
      '2003 - because it is Mauritius\'s highest mountain',
      '2006 - because it is where indentured labourers first landed',
      '2008 - as a symbol of slave resistance and the memory of runaway slaves who sought refuge there',
      '2012 - because it is a protected marine reserve'
    ],
    answer:'2008 - as a symbol of slave resistance and the memory of runaway slaves who sought refuge there',
    hint:'Le Morne is a dramatic peninsula on the south-west coast of Mauritius with a deep historical meaning.',
    explanation:'<b>Le Morne Brabant</b> was inscribed as a UNESCO World Heritage Site in <b>2008</b> as a symbol of <b>slave resistance</b> - runaway slaves (maroons) hid on its slopes, and the mountain became a powerful symbol of the struggle for freedom.' }),

  makeMCQ({ id:'g6enr-sym-013', chapterId:'g6enr-symbols', subsection:'coat_of_arms', difficulty:3,
    question:'What is the correct translation of the Mauritius national motto "Stella Clavisque Maris Indici"?',
    options:[
      'Light and Hope of the Indian Ocean',
      'Star and Key of the Indian Ocean',
      'Gateway and Jewel of the Southern Seas',
      'Heart and Soul of the Indian Ocean'
    ],
    answer:'Star and Key of the Indian Ocean',
    hint:'"Stella" means star, "Clavis" means key, and "Maris Indici" means of the Indian Ocean.',
    explanation:'The motto <b>"Stella Clavisque Maris Indici"</b> translates as <b>"Star and Key of the Indian Ocean"</b> - "stella" = star, "clavisque" = and key, "maris Indici" = of the Indian Ocean.' }),

  makeMCQ({ id:'g6enr-sym-014', chapterId:'g6enr-symbols', subsection:'coat_of_arms', difficulty:3,
    question:'The Dodo appears on the Mauritius Coat of Arms. Which statement about the Dodo is correct?',
    options:[
      'The Dodo is still found in small numbers in Rodrigues',
      'The Dodo was a large flightless bird that became extinct, largely due to hunting by Dutch settlers and introduced animals',
      'The Dodo is Mauritius\'s national bird and can be seen in national parks today',
      'The Dodo was brought to Mauritius from Africa by Portuguese sailors'
    ],
    answer:'The Dodo was a large flightless bird that became extinct, largely due to hunting by Dutch settlers and introduced animals',
    hint:'The Dodo has not been seen alive since the late 17th century.',
    explanation:'The <b>Dodo</b> was a large flightless bird unique to Mauritius that became <b>extinct</b> - likely by the late 1600s - due to hunting by Dutch settlers and predation by introduced animals such as rats, pigs and monkeys.' }),

  makeMCQ({ id:'g6enr-sym-015', chapterId:'g6enr-symbols', subsection:'coat_of_arms', difficulty:3,
    question:'The Mauritius Coat of Arms has four quadrants. Which of the following is NOT one of the four elements shown?',
    options:['A Dodo','A sailing ship','A palm tree','A key'],
    answer:'A palm tree',
    hint:'The four quadrants show symbols connected to the island\'s history, geography and motto.',
    explanation:'The four quadrants of the Mauritius Coat of Arms show a <b>Dodo</b>, a <b>sailing ship</b>, a <b>key</b> and <b>sugar cane stalks</b> - there is no palm tree; a <b>palm tree</b> appears on some other island flags but not Mauritius\'s Coat of Arms.' }),

  makeMCQ({ id:'g6enr-sym-016', chapterId:'g6enr-symbols', subsection:'unesco', difficulty:4,
    question:'Mauritius has TWO UNESCO World Heritage Sites - Aapravasi Ghat and Le Morne Brabant. Both relate to forced migration and slavery. What does having two such sites tell us about Mauritius\'s history?',
    options:[
      'It means Mauritius was the only country in the world to have slavery',
      'It shows that the suffering and resistance connected to slavery and indentured labour are central to Mauritius\'s national identity and memory',
      'UNESCO sites are given only to countries with the most beautiful landscapes',
      'It tells us that slavery ended in Mauritius much later than anywhere else'
    ],
    answer:'It shows that the suffering and resistance connected to slavery and indentured labour are central to Mauritius\'s national identity and memory',
    hint:'UNESCO inscribes sites of outstanding universal value - consider what value these sites represent.',
    explanation:'Having <b>two UNESCO sites</b> connected to slavery and forced migration shows that <b>remembering and honouring this painful history</b> is central to Mauritius\'s national identity, helping ensure future generations understand the real human cost of colonialism.' }),

  makeMCQ({ id:'g6enr-sym-017', chapterId:'g6enr-symbols', subsection:'national', difficulty:4,
    question:'The Trochetia boutoniana is described as both "endemic" and "endangered." What do these two words tell us about this national flower?',
    options:[
      'It is found across the whole of Africa and is at risk of being over-harvested',
      'It grows only in Mauritius and nowhere else in the world, and its survival is threatened',
      'It was introduced to Mauritius from India and is now rare',
      'It is common in Mauritius but rare in the rest of Africa'
    ],
    answer:'It grows only in Mauritius and nowhere else in the world, and its survival is threatened',
    hint:'"Endemic" relates to where a species is found; "endangered" relates to its population status.',
    explanation:'"<b>Endemic</b>" means the <b>Trochetia boutoniana</b> is found <b>only in Mauritius</b> and nowhere else naturally; "<b>endangered</b>" means its population is small enough that it <b>risks extinction</b> without conservation efforts.' }),

  makeMCQ({ id:'g6enr-sym-018', chapterId:'g6enr-symbols', subsection:'coat_of_arms', difficulty:4,
    question:'The Rodrigues Coat of Arms is different from the Mauritius Coat of Arms. Why is it important for Rodrigues to have its own Coat of Arms?',
    options:[
      'Rodrigues is an independent country and must have its own symbols by international law',
      'Because Rodrigues is an autonomous region with its own regional government, its own Coat of Arms reflects its distinct identity and heritage',
      'Rodrigues refused to use the same symbols as Mauritius after a dispute in 1968',
      'All islands in the Indian Ocean are required by UNESCO to have separate Coats of Arms'
    ],
    answer:'Because Rodrigues is an autonomous region with its own regional government, its own Coat of Arms reflects its distinct identity and heritage',
    hint:'Rodrigues has its own Regional Assembly, which is different from a fully independent government.',
    explanation:'Rodrigues has its own <b>Regional Assembly</b> and <b>autonomous status</b> within Mauritius; its separate Coat of Arms reflects its <b>distinct cultural identity</b> and history, even though it remains part of the Republic of Mauritius.' }),

  makeMCQ({ id:'g6enr-sym-019', chapterId:'g6enr-symbols', subsection:'flag', difficulty:4,
    question:'The four colours of the Mauritius flag - red, blue, yellow, green - each represent a different aspect of the nation. Which combination of flag colour and meaning is INCORRECT?',
    options:[
      'Red - freedom from oppression and slavery',
      'Blue - the Indian Ocean',
      'Yellow - the light of independence and a golden future',
      'Green - the sky and the air of the island'
    ],
    answer:'Green - the sky and the air of the island',
    hint:'Green is the bottom stripe; think about what covers most of Mauritius\'s land surface.',
    explanation:'<b>Green</b> on the Mauritian flag represents <b>agriculture and lush vegetation</b>, not the sky (which would be blue); the sky is not specifically represented by any stripe - blue stands for the Indian Ocean.' })

);
