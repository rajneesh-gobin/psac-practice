'use strict';
// Grade 6 History - Chapter: Independence & National Symbols
// IDs format: g6hg-ind-NNN

// Mauritius flag SVG (four horizontal stripes: red, blue, yellow, green)
const _SVG_FLAG = `<svg viewBox="0 0 180 100" width="180" height="100" style="display:block;margin:6px auto;border-radius:6px;border:1px solid #cbd5e1">
  <rect x="0" y="0" width="180" height="25" fill="#dc2626"/>
  <rect x="0" y="25" width="180" height="25" fill="#1e40af"/>
  <rect x="0" y="50" width="180" height="25" fill="#fbbf24"/>
  <rect x="0" y="75" width="180" height="25" fill="#16a34a"/>
  <text x="90" y="14" text-anchor="middle" font-size="8" fill="white" font-weight="bold">RED - independence struggle</text>
  <text x="90" y="39" text-anchor="middle" font-size="8" fill="white" font-weight="bold">BLUE - Indian Ocean</text>
  <text x="90" y="63" text-anchor="middle" font-size="8" fill="#78350f" font-weight="bold">YELLOW - light / sun</text>
  <text x="90" y="88" text-anchor="middle" font-size="8" fill="white" font-weight="bold">GREEN - agriculture / nature</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6hg-ind-001', chapterId:'g6-independence', difficulty:1,
    question:'In which year did Mauritius gain independence from Britain?',
    options:['1810','1835','1948','1968'],
    answer:'1968',
    hint:'Mauritius became independent on 12 March - now celebrated as National Day.',
    explanation:'Mauritius gained <b>independence on 12 March 1968</b>. This date is celebrated annually as <b>National Day</b>. Mauritius had been a British colony since 1810.' }),

  makeMCQ({ id:'g6hg-ind-002', chapterId:'g6-independence', difficulty:1,
    question:'Who was the first Prime Minister of Mauritius at independence in 1968?',
    options:['Sir Anerood Jugnauth','Sir Gaëtan Duval','Sir Seewoosagur Ramgoolam','Sir Abdool Razack Mohamed'],
    answer:'Sir Seewoosagur Ramgoolam',
    hint:'He is known as the "Father of the Nation."',
    explanation:'<b>Sir Seewoosagur Ramgoolam (SSR)</b> was the first Prime Minister of independent Mauritius. He led the country to independence and is widely revered as the "Father of the Nation." The international airport and the SSR Botanical Garden are named after him.' }),

  makeMCQ({ id:'g6hg-ind-003', chapterId:'g6-independence', difficulty:2,
    question:`${_SVG_FLAG}The national flag of Mauritius has four horizontal stripes. What does the BLUE stripe represent?`,
    options:['The sugar cane fields','The Indian Ocean surrounding the island','The blood shed for independence','The sky above Mauritius'],
    answer:'The Indian Ocean surrounding the island',
    hint:'Look at the diagram - the meaning of each colour is labelled.',
    explanation:'The <b>blue stripe</b> represents the <b>Indian Ocean</b> that surrounds Mauritius. The four colours represent: red (struggle for independence), blue (Indian Ocean), yellow (light of independence/new hope/the sun), green (agriculture and the lush vegetation of the island).' }),

  makeMCQ({ id:'g6hg-ind-004', chapterId:'g6-independence', difficulty:2,
    question:`${_SVG_FLAG}What does the RED stripe on the Mauritian flag represent?`,
    options:['The blood of early settlers','The red soil of Mauritius','The struggle for independence','The warmth of the tropical climate'],
    answer:'The struggle for independence',
    hint:'Red is a colour often associated with struggle and sacrifice.',
    explanation:'The <b>red stripe</b> represents the <b>struggle for independence</b> - a reminder of the sacrifices made to achieve freedom from colonial rule. It honours those who fought for Mauritius\'s sovereignty.' }),

  makeMCQ({ id:'g6hg-ind-005', chapterId:'g6-independence', difficulty:1,
    question:'What is the motto on the Coat of Arms of Mauritius?',
    options:['"Freedom and Justice"','Stella Clavisque Maris Indici - "Star and Key of the Indian Ocean"','God Save the King','L\'union fait la force'],
    answer:'Stella Clavisque Maris Indici - "Star and Key of the Indian Ocean"',
    hint:'This Latin motto reflects Mauritius\'s strategic position in the Indian Ocean.',
    explanation:'The Mauritian Coat of Arms bears the Latin motto <b>Stella Clavisque Maris Indici</b> - meaning "<b>Star and Key of the Indian Ocean</b>". This reflects Mauritius\'s historically important strategic position as a stepping stone in the Indian Ocean trade routes.' }),

  makeMCQ({ id:'g6hg-ind-006', chapterId:'g6-independence', difficulty:2,
    question:'In which year did Mauritius become a REPUBLIC?',
    options:['1968','1992','2000','2010'],
    answer:'1992',
    hint:'This happened exactly 24 years after independence.',
    explanation:'Mauritius became a <b>Republic on 12 March 1992</b> - exactly 24 years after independence. The country remained within the Commonwealth but replaced the British monarch as head of state with a President. Sir Veerasamy Ringadoo became the first President.' }),

  makeTF({ id:'g6hg-ind-007', chapterId:'g6-independence', difficulty:1,
    question:'The national flag of Mauritius has four horizontal stripes of equal width.',
    answer:true,
    hint:'Look at the flag diagram.',
    explanation:'True. The national flag of Mauritius consists of <b>four horizontal stripes of equal width</b>: red (top), blue, yellow and green (bottom). It was adopted at independence on 12 March 1968.' }),

  makeMCQ({ id:'g6hg-ind-008', chapterId:'g6-independence', difficulty:2,
    question:'The Coat of Arms of Mauritius features four quarter panels with different symbols. Which animal, associated with Mauritius, appears on it?',
    options:['The Pink Pigeon','The Dodo','The Echo Parakeet','The Flying Fox'],
    answer:'The Dodo',
    hint:'This extinct flightless bird is one of the most famous symbols of Mauritius.',
    explanation:'The <b>Dodo</b> appears on the Coat of Arms of Mauritius as a supporter - one of two animals flanking the shield (the other is a sambar deer). Even though the Dodo is extinct, it remains one of the most powerful and recognised symbols of Mauritius.' }),

  makeMCQ({ id:'g6hg-ind-009', chapterId:'g6-independence', difficulty:1,
    question:'What is the name of the national ANTHEM of Mauritius?',
    options:['God Save the King','La Marseillaise','Motherland','L\'Union fait la force'],
    answer:'Motherland',
    hint:'The anthem was composed by Philippe Gentil, with words by Jean Georges Prosper.',
    explanation:'The national anthem of Mauritius is called <b>"Motherland"</b> (in English). It was composed by Philippe Gentil with lyrics by Jean Georges Prosper, and was adopted at independence in 1968.' }),

  makeMCQ({ id:'g6hg-ind-010', chapterId:'g6-independence', difficulty:2,
    question:'What does the GREEN stripe on the Mauritian flag represent?',
    options:['The Indian Ocean','The struggle for independence','The agriculture and lush vegetation of Mauritius','The sky and hope for the future'],
    answer:'The agriculture and lush vegetation of Mauritius',
    hint:'Mauritius is known for its sugar cane fields and tropical forests.',
    explanation:'The <b>green stripe</b> represents the <b>agriculture and lush vegetation</b> of Mauritius - its sugar cane fields, forests and tropical nature. Agriculture, particularly sugar, has been central to the island\'s economy and identity.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6hg-ind-011', chapterId:'g6-independence', difficulty:1,
    question:'What is Mauritius\'s national FLOWER?',
    options:['The rose','Trochetia boutoniana (Boucle d\'oreille)','The hibiscus','The lotus'],
    answer:'Trochetia boutoniana (Boucle d\'oreille)',
    hint:'It is an endemic pink flower named after the botanist who described it.',
    explanation:'The national flower of Mauritius is <b>Trochetia boutoniana</b>, popularly known as <b>Boucle d\'oreille</b> (earring) because of its distinctive petal shape. It is endemic to Mauritius (found nowhere else) and grows mainly on the slopes of Pieter Both mountain. It represents the island\'s unique natural heritage.' }),

  makeMCQ({ id:'g6hg-ind-012', chapterId:'g6-independence', difficulty:1,
    question:'Mauritius is often called "the Star and Key of the Indian Ocean." What does KEY refer to?',
    options:[
      'Mauritius has many locks that need keys',
      'Mauritius\'s strategic location made it essential for controlling trade routes and naval power in the Indian Ocean',
      'Mauritius is the key producer of sugar in the world',
      'The island is key because it is the smallest in the Indian Ocean'
    ],
    answer:'Mauritius\'s strategic location made it essential for controlling trade routes and naval power in the Indian Ocean',
    hint:'Think about why colonial powers (Dutch, French, British) all wanted to control this island.',
    explanation:'Mauritius\'s motto <b>Stella Clavisque Maris Indici</b> ("Star and Key of the Indian Ocean") reflects its <b>strategic location</b>. Positioned on the main sea route between Europe, India and East Asia, whoever controlled Mauritius had a powerful base to dominate Indian Ocean trade and naval operations - hence "key." Today it remains a strategic hub for shipping.' }),

  makeMCQ({ id:'g6hg-ind-013', chapterId:'g6-independence', difficulty:2,
    question:'What does the YELLOW stripe on the Mauritian flag represent?',
    options:['The struggle for independence','The Indian Ocean','The light of independence / new hope / the sun','The agriculture and vegetation'],
    answer:'The light of independence / new hope / the sun',
    hint:'Yellow is often associated with light, hope and a bright future.',
    explanation:'The <b>yellow stripe</b> represents the <b>light of independence</b> - the new hope and bright future that independence brought to Mauritius. It also symbolises the <b>sun</b> shining on a prosperous nation. Together, the four colours tell the story of independence (red), the ocean environment (blue), hope (yellow) and the land\'s fertility (green).' }),

  makeMCQ({ id:'g6hg-ind-014', chapterId:'g6-independence', difficulty:2,
    question:'What animal OTHER than the Dodo appears on the Coat of Arms of Mauritius?',
    options:['A dolphin','A sambar deer','A mongoose','A flying fox (fruit bat)'],
    answer:'A sambar deer',
    hint:'Two animals flank the shield as supporters - one is extinct, the other is a large deer.',
    explanation:'The Coat of Arms of Mauritius has two supporters flanking the central shield: the <b>Dodo</b> (extinct, left side) and the <b>sambar deer</b> (right side). The sambar deer was introduced to Mauritius and became part of its wildlife heritage. The shield contains four quarters depicting a ship, a key, a palm tree and the Red Cross of St George.' }),

  makeTF({ id:'g6hg-ind-015', chapterId:'g6-independence', difficulty:1,
    question:'Mauritius gained independence on 12 March 1968, and this date is now celebrated as National Day.',
    answer:true,
    hint:'National Day commemorates the moment the Mauritian flag was first raised as an independent nation.',
    explanation:'<b>True.</b> <b>12 March 1968</b> is celebrated annually as <b>National Day</b> in Mauritius. On this day in 1968, the Union Jack was lowered and the new Mauritian flag was raised for the first time, marking independence from British colonial rule. Sir Seewoosagur Ramgoolam became the first Prime Minister.' }),

  makeMCQ({ id:'g6hg-ind-016', chapterId:'g6-independence', difficulty:2,
    question:'What is the Coat of Arms of RODRIGUES designed to represent?',
    options:[
      'It is identical to the Mauritius Coat of Arms',
      'It features symbols specific to Rodrigues - including a Rodrigues fruit bat and a Rodrigues warbler',
      'It shows only the British crown',
      'Rodrigues does not have its own Coat of Arms'
    ],
    answer:'It features symbols specific to Rodrigues - including a Rodrigues fruit bat and a Rodrigues warbler',
    hint:'Rodrigues has its own unique identity within the Republic of Mauritius.',
    explanation:'Rodrigues has its own <b>Coat of Arms</b> that reflects its unique identity. It features animals and plants endemic to Rodrigues, including the <b>Rodrigues fruit bat</b> and the <b>Rodrigues warbler</b>. Rodrigues is an autonomous region of Mauritius with its own Regional Assembly, and its symbols celebrate its distinct natural and cultural heritage.' }),

  makeMCQ({ id:'g6hg-ind-017', chapterId:'g6-independence', difficulty:2,
    question:'Before independence, which MAJOR POLITICAL FIGURE strongly opposed independence and preferred a link with Britain?',
    options:[
      'Sir Seewoosagur Ramgoolam',
      'Sir Gaëtan Duval, who argued for a free association with Britain',
      'Sir Anerood Jugnauth',
      'Paul Bérenger'
    ],
    answer:'Sir Gaëtan Duval, who argued for a free association with Britain',
    hint:'He was known as the "King of the Creoles" and had a different vision for Mauritius\'s future.',
    explanation:'<b>Sir Gaëtan Duval</b>, leader of the PMSD (Parti Mauricien Social Démocrate), strongly opposed full independence and argued instead for <b>free association with Britain</b> - a form of autonomy rather than full sovereignty. He feared that independence would disadvantage the Creole community. Despite losing the political debate, he later served in government alongside SSR.' }),

  makeMCQ({ id:'g6hg-ind-018', chapterId:'g6-independence', difficulty:3,
    question:'Why did Mauritius choose to become a REPUBLIC in 1992, even though it had been independent since 1968?',
    options:[
      'Britain asked Mauritius to become a republic and sever all ties',
      'Becoming a republic replaced the British monarch as head of state with a Mauritian President, completing full sovereignty',
      'A republic meant Mauritius could leave the Commonwealth of Nations',
      'It was required by the United Nations for small island states'
    ],
    answer:'Becoming a republic replaced the British monarch as head of state with a Mauritian President, completing full sovereignty',
    hint:'At independence, the Queen of England was still technically the head of state - a republic changes this.',
    explanation:'At independence in 1968, Mauritius was a <b>constitutional monarchy</b> - the British monarch (Queen Elizabeth II) was still the head of state, represented by a Governor-General. Becoming a <b>republic in 1992</b> replaced this with a Mauritian <b>President</b> as head of state, completing full national sovereignty. Mauritius remained within the Commonwealth of Nations.' }),

  makeMCQ({ id:'g6hg-ind-019', chapterId:'g6-independence', difficulty:4,
    question:'The Mauritian flag\'s four colours are often said to tell the COMPLETE STORY of the nation. Which interpretation is MOST accurate?',
    options:[
      'The four colours represent the four seasons of the year in Mauritius',
      'The four colours represent the four compass directions around the island',
      'The four colours represent the struggle (red), the environment (blue), the hope (yellow) and the land (green) - telling the story of a nation born from hardship into independence',
      'The four colours were chosen randomly by the designers'
    ],
    answer:'The four colours represent the struggle (red), the environment (blue), the hope (yellow) and the land (green) - telling the story of a nation born from hardship into independence',
    hint:'Each colour has a specific symbolic meaning that reflects Mauritius\'s history and identity.',
    explanation:'The four stripes form a narrative: <b>Red</b> = the blood and struggle for independence (colonial hardship, activism); <b>Blue</b> = the Indian Ocean that defines the island\'s geography and identity; <b>Yellow</b> = the light of freedom, a bright future; <b>Green</b> = the fertile agricultural land, particularly the sugar cane that shaped the island\'s economy and culture. Together they are a symbolic autobiography of the nation.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6hg-ind-020', chapterId:'g6-independence', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Flag_of_Mauritius.svg" alt="a flag with four horizontal stripes of different colours" style="max-height:220px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>What do the four colours of the Mauritius national flag represent (from top to bottom)?</b>',
    options:[
      'Sun, sea, soil, sky',
      'Struggle for independence, Indian Ocean, light of independence/sun, agriculture and vegetation',
      'Blood of settlers, sky, gold mines, forests',
      'The four communities: Hindus, Muslims, Creoles, Chinese'
    ],
    answer:'Struggle for independence, Indian Ocean, light of independence/sun, agriculture and vegetation',
    hint:'Think about what each colour symbolises — red is at the top, green at the bottom.',
    explanation:'The four horizontal stripes of the Mauritius flag represent: <b>Red</b> (top) = the struggle for independence; <b>Blue</b> = the Indian Ocean; <b>Yellow</b> = the light of independence and the sun; <b>Green</b> (bottom) = the agriculture and lush vegetation of the island. The flag was adopted at independence on 12 March 1968.' }),

  makeMCQ({ id:'g6hg-ind-021', chapterId:'g6-independence', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Coat_of_arms_of_Mauritius.svg" alt="a coat of arms with a shield and two animals as supporters" style="max-height:220px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>Which famous extinct bird of Mauritius appears as a supporter on the Coat of Arms?</b>',
    options:['Pink Pigeon','Echo Parakeet','Dodo','Mauritius Kestrel'],
    answer:'Dodo',
    hint:'This flightless bird went extinct around 1681 and is now a symbol of Mauritius.',
    explanation:'The <b>Dodo</b> appears on the Coat of Arms of Mauritius as one of the two supporters flanking the central shield (the other is a sambar deer). Although the Dodo is extinct, it remains one of the most powerful and recognised symbols of Mauritius, reminding us of the importance of protecting endemic species.' }),

  makeMCQ({ id:'g6hg-ind-022', chapterId:'g6-independence', difficulty:1,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Trochetia_boutoniana.jpg" alt="a pink flowering plant on a rocky slope" style="max-height:220px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>This beautiful endemic flower is the national flower of Mauritius. What is its name?</b>',
    options:['Hibiscus','Lotus','Rose','Trochetia boutoniana (Boucle d\'oreille)'],
    answer:'Trochetia boutoniana (Boucle d\'oreille)',
    hint:'Its nickname means "earring" in French because of the shape of its petals.',
    explanation:'<b>Trochetia boutoniana</b>, popularly called <b>Boucle d\'oreille</b> (earring in French), is the national flower of Mauritius. It is endemic to Mauritius — found naturally only on this island — and grows mainly on the slopes of Pieter Both mountain. It represents the island\'s unique and irreplaceable natural heritage.' }),

  makeMCQ({ id:'g6hg-ind-023', chapterId:'g6-independence', difficulty:2,
    question:'<div style="text-align:center;margin-bottom:12px"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Mauritius_satellite.jpg" alt="a satellite view of a small island in the ocean" style="max-height:220px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.15)"></div><b>This satellite image shows Mauritius in the Indian Ocean. Which Latin motto on the Coat of Arms reflects this strategic island location?</b>',
    options:[
      '"In God We Trust"',
      '"Liberté, Égalité, Fraternité"',
      'Stella Clavisque Maris Indici — "Star and Key of the Indian Ocean"',
      '"Unity, Faith, Discipline"'
    ],
    answer:'Stella Clavisque Maris Indici — "Star and Key of the Indian Ocean"',
    hint:'The motto is in Latin and refers to Mauritius\'s position in the Indian Ocean.',
    explanation:'The Coat of Arms of Mauritius bears the Latin motto <b>Stella Clavisque Maris Indici</b> — meaning <b>"Star and Key of the Indian Ocean."</b> This reflects Mauritius\'s historically important strategic position: whoever controlled this island in the centre of the Indian Ocean could dominate the sea trade routes between Europe, Africa and Asia — hence "star" (guiding light) and "key" (gateway).' })

);
