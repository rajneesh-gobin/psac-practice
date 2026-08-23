'use strict';
// Grade 6 History — Chapter: Independence & National Symbols
// IDs format: g6hg-ind-NNN

// Mauritius flag SVG (four horizontal stripes: red, blue, yellow, green)
const _SVG_FLAG = `<svg viewBox="0 0 180 100" width="180" height="100" style="display:block;margin:6px auto;border-radius:6px;border:1px solid #cbd5e1">
  <rect x="0" y="0" width="180" height="25" fill="#dc2626"/>
  <rect x="0" y="25" width="180" height="25" fill="#1e40af"/>
  <rect x="0" y="50" width="180" height="25" fill="#fbbf24"/>
  <rect x="0" y="75" width="180" height="25" fill="#16a34a"/>
  <text x="90" y="14" text-anchor="middle" font-size="8" fill="white" font-weight="bold">RED — independence struggle</text>
  <text x="90" y="39" text-anchor="middle" font-size="8" fill="white" font-weight="bold">BLUE — Indian Ocean</text>
  <text x="90" y="63" text-anchor="middle" font-size="8" fill="#78350f" font-weight="bold">YELLOW — light / sun</text>
  <text x="90" y="88" text-anchor="middle" font-size="8" fill="white" font-weight="bold">GREEN — agriculture / nature</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6hg-ind-001', chapterId:'g6-independence', difficulty:1,
    question:'In which year did Mauritius gain independence from Britain?',
    options:['1810','1835','1948','1968'],
    answer:'1968',
    hint:'Mauritius became independent on 12 March — now celebrated as National Day.',
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
    hint:'Look at the diagram — the meaning of each colour is labelled.',
    explanation:'The <b>blue stripe</b> represents the <b>Indian Ocean</b> that surrounds Mauritius. The four colours represent: red (struggle for independence), blue (Indian Ocean), yellow (light of independence/new hope/the sun), green (agriculture and the lush vegetation of the island).' }),

  makeMCQ({ id:'g6hg-ind-004', chapterId:'g6-independence', difficulty:2,
    question:`${_SVG_FLAG}What does the RED stripe on the Mauritian flag represent?`,
    options:['The blood of early settlers','The red soil of Mauritius','The struggle for independence','The warmth of the tropical climate'],
    answer:'The struggle for independence',
    hint:'Red is a colour often associated with struggle and sacrifice.',
    explanation:'The <b>red stripe</b> represents the <b>struggle for independence</b> — a reminder of the sacrifices made to achieve freedom from colonial rule. It honours those who fought for Mauritius\'s sovereignty.' }),

  makeMCQ({ id:'g6hg-ind-005', chapterId:'g6-independence', difficulty:1,
    question:'What is the motto on the Coat of Arms of Mauritius?',
    options:['"Freedom and Justice"','Stella Clavisque Maris Indici — "Star and Key of the Indian Ocean"','God Save the King','L\'union fait la force'],
    answer:'Stella Clavisque Maris Indici — "Star and Key of the Indian Ocean"',
    hint:'This Latin motto reflects Mauritius\'s strategic position in the Indian Ocean.',
    explanation:'The Mauritian Coat of Arms bears the Latin motto <b>Stella Clavisque Maris Indici</b> — meaning "<b>Star and Key of the Indian Ocean</b>". This reflects Mauritius\'s historically important strategic position as a stepping stone in the Indian Ocean trade routes.' }),

  makeMCQ({ id:'g6hg-ind-006', chapterId:'g6-independence', difficulty:2,
    question:'In which year did Mauritius become a REPUBLIC?',
    options:['1968','1992','2000','2010'],
    answer:'1992',
    hint:'This happened exactly 24 years after independence.',
    explanation:'Mauritius became a <b>Republic on 12 March 1992</b> — exactly 24 years after independence. The country remained within the Commonwealth but replaced the British monarch as head of state with a President. Sir Veerasamy Ringadoo became the first President.' }),

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
    explanation:'The <b>Dodo</b> appears on the Coat of Arms of Mauritius as a supporter — one of two animals flanking the shield (the other is a sambar deer). Even though the Dodo is extinct, it remains one of the most powerful and recognised symbols of Mauritius.' }),

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
    explanation:'The <b>green stripe</b> represents the <b>agriculture and lush vegetation</b> of Mauritius — its sugar cane fields, forests and tropical nature. Agriculture, particularly sugar, has been central to the island\'s economy and identity.' })

);
