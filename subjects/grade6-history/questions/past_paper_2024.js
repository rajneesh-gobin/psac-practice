'use strict';
// PSAC Grade 6 History & Geography August 2024 - past-paper questions adapted to MCQ format.
//
// The paper's maps and pictures are cropped from the MES PDF into
// assets/past-papers/g6-history-2024/. This paper makes 20 references to a
// Map/Picture, and several of its questions ("to the ... of Mauritius",
// "which type of farming is shown") cannot be asked at all without them.
//
// ⚠ Alt text and file names must never give the answer away.
const _g6hg24 = (file, alt) =>
  `<img src="assets/past-papers/g6-history-2024/${file}.png" alt="${alt}"` +
  ` style="display:block;margin:8px auto;max-width:min(100%,420px);height:auto;` +
  `border-radius:6px;background:#fff">`;

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g6h-pp24-001', chapterId:'g6-land-use', subsection:'agriculture', difficulty:1,
    question:'Which of the following crops is grown on terraces in Rodrigues?',
    options:['Coconut','Maize','Rice','Tea'], answer:'Maize',
    hint:'Terracing is used on hillsides in Rodrigues to grow food crops.',
    explanation:'Maize is grown on terraced hillsides in Rodrigues because the land is steep and terracing prevents soil erosion.' }),
  makeMCQ({ id:'g6h-pp24-002', chapterId:'g6-slaves-immigrants', subsection:'chinese', difficulty:1,
    question:'Where did the early Chinese immigrants settle when they first arrived in Mauritius?',
    options:['Ferney','Mahebourg','Port Louis','Souillac'], answer:'Port Louis',
    hint:'They settled near the main port and market of Mauritius.',
    explanation:'Early Chinese immigrants settled in Port Louis, mainly in the China Town area, where they set up shops and businesses.' }),
  makeMCQ({ id:'g6h-pp24-003', chapterId:'g6-land-use', subsection:'agriculture', difficulty:1,
    question:'Which of the following materials is <b>non-biodegradable</b>?',
    options:['Food waste','Paper','Plastic','Garden cuttings'], answer:'Plastic',
    hint:'Non-biodegradable means it cannot be broken down by nature.',
    explanation:'Plastic is non-biodegradable - it does not decompose naturally and can remain in the environment for hundreds of years.' }),
  makeMCQ({ id:'g6h-pp24-004', chapterId:'g6-independence', subsection:'coat_of_arms', difficulty:2,
    question:'Which bird is shown on the Coat of Arms of Rodrigues?',
    options:['Dodo','Pink pigeon','Red rail','Solitaire'], answer:'Solitaire',
    hint:'This bird was once found only in Rodrigues and is now extinct.',
    explanation:'The Solitaire (Rodrigues solitaire) is shown on the Coat of Arms of Rodrigues. It was a large flightless bird that lived only in Rodrigues and became extinct.' }),
  makeMCQ({ id:'g6h-pp24-005', chapterId:'g6-slaves-immigrants', subsection:'indentured', difficulty:1,
    question:'Country <b>A</b> on <b>Map 2</b>, from which indentured labourers came to Mauritius, is …' +
      _g6hg24('map2-world', 'A world map with one country shaded and labelled A') +
      'Which country is <b>A</b>?',
    options:['China','India','Madagascar','Mozambique'], answer:'India',
    hint:'The Aapravasi Ghat in Port Louis was built to receive these workers.',
    explanation:'Most indentured labourers came from India. They arrived through the Aapravasi Ghat in Port Louis between 1834 and 1924.' }),
  makeMCQ({ id:'g6h-pp24-006', chapterId:'g6-slaves-immigrants', subsection:'slavery', difficulty:1,
    question:'In the 19th century, Mauritius became a colony of which country?',
    options:['British','Dutch','French','Portuguese'], answer:'British',
    hint:'Control of the island changed hands in 1810, at the end of a naval campaign.',
    explanation:'In the 19th century (from 1810), Mauritius became a British colony after the British defeated the French at the Battle of Grand Port.' }),
  makeMCQ({ id:'g6h-pp24-007', chapterId:'g6-independence', subsection:'independence', difficulty:2,
    question:'Who was the <b>first President</b> of the Republic of Mauritius?',
    options:['Sir Abdool Raman Osman','Sir Gaetan Duval','Sir Seewoosagur Ramgoolam','Sir Veerasamy Ringadoo'], answer:'Sir Veerasamy Ringadoo',
    hint:'Mauritius became a Republic in 1992.',
    explanation:'Sir Veerasamy Ringadoo became the first President of the Republic of Mauritius when the country became a republic on 12 March 1992.' }),
  makeMCQ({ id:'g6h-pp24-008', chapterId:'g6-land-use', subsection:'agriculture', difficulty:1,
    question:'Sugarcane is grown on <b>large areas</b> in Mauritius. What type of agriculture is this called?',
    options:['Market gardening','Mixed farming','Pastoral farming','Plantation agriculture'], answer:'Plantation agriculture',
    hint:'This type of farming involves growing one crop on a very large scale.',
    explanation:'Plantation agriculture involves growing one crop on large areas. Sugar cane is the main plantation crop in Mauritius.' }),
  makeMCQ({ id:'g6h-pp24-009', chapterId:'g6-land-use', subsection:'agriculture', difficulty:2,
    question:'Which of the following is a <b>physical</b> factor that influences farming in Mauritius?',
    options:['Market price of crops','Labour cost','Rainfall','Government subsidy'], answer:'Rainfall',
    hint:'Physical factors are natural conditions, not human decisions.',
    explanation:'Rainfall is a physical factor that influences farming - crops need water to grow. Other physical factors include soil type, relief (slope of land), and temperature.' }),
  makeMCQ({ id:'g6h-pp24-010', chapterId:'g6-land-use', subsection:'tourism', difficulty:1,
    question:'<b>Picture 2</b> shows a tourist hotel in Mauritius.' +
      _g6hg24('pic2-hotel', 'A photograph of a hotel among trees beside the sea') +
      'Where are most tourist hotels in Mauritius situated?',
    options:['Central plateau','Coastal regions','Hilly areas','River valleys'], answer:'Coastal regions',
    hint:'Tourists are attracted to the sea, beaches and lagoons.',
    explanation:'Most tourist hotels in Mauritius are situated in coastal regions because tourists are attracted by the beaches, lagoons, and sea activities.' }),
  makeMCQ({ id:'g6h-pp24-011', chapterId:'g6-slaves-immigrants', subsection:'slavery', difficulty:2,
    question:'During the French period, French governors brought slaves to work in Ile de France. From which of the following African countries were slaves brought?',
    options:['China','India','Madagascar','France'], answer:'Madagascar',
    hint:'Slaves were brought from Africa and nearby islands to work on the plantations.',
    explanation:'Slaves were brought from African countries including Madagascar, Mozambique, Senegal, and other parts of Africa to work on sugar cane plantations in Ile de France (Mauritius).' }),
  makeMCQ({ id:'g6h-pp24-012', chapterId:'g6-slaves-immigrants', subsection:'indentured', difficulty:2,
    question:'Indentured labourers in Mauritius lived in camps and received food rations from the planters. Which of the following was a food item given as a ration?',
    options:['Rice','Tea','Sugar cane','Cotton'], answer:'Rice',
    hint:'This is a basic staple food still eaten in Mauritius today.',
    explanation:'Rice was one of the basic food items given as ration to indentured labourers. They also received dried fish and other basic provisions.' }),
  makeMCQ({ id:'g6h-pp24-013', chapterId:'g6-natural-hazards', subsection:'preparedness', difficulty:2,
    question:'Which of the following is a sensible precaution to take during torrential rains in Mauritius?',
    options:['Go to the beach to watch the waves','Stay indoors and away from flood-prone areas','Drive through flooded roads as quickly as possible','Open all windows to let in fresh air'], answer:'Stay indoors and away from flood-prone areas',
    hint:'Safety during heavy rain means avoiding dangerous areas.',
    explanation:'During torrential rains, people should stay indoors and away from rivers, drains, and low-lying flood-prone areas to avoid being swept away by flash floods.' }),
  makeMCQ({ id:'g6h-pp24-014', chapterId:'g6-natural-hazards', subsection:'floods', difficulty:2,
    question:'Why has Mauritius experienced more flash floods in recent years?',
    options:['Deforestation and building on flood plains', 'More earthquakes are now occurring', 'The sea level around us has fallen', 'Fewer cyclones now bring less rain'], answer:'Deforestation and building on flood plains',
    hint:'Think about how trees and open land help absorb rainwater.',
    explanation:'Deforestation removes trees that absorb rainwater, and building on flood plains means water cannot drain away naturally. These human activities cause more frequent flash floods.' }),
  makeMCQ({ id:'g6h-pp24-015', chapterId:'g6-independence', subsection:'symbols', difficulty:1,
    question:'What is the <b>national flower</b> of Mauritius?',
    options:['Hibiscus','Orchid','Rose','Trochetia boutoniana'], answer:'Trochetia boutoniana',
    hint:'This flower is unique to Mauritius and appears on the national symbols.',
    explanation:'The Trochetia boutoniana (also known as the "Boucle d\'oreille") is the national flower of Mauritius. It is a small, bell-shaped pink flower found mainly in the Black River Gorges.' }),
  makeMCQ({ id:'g6h-pp24-016', chapterId:'g6-cultural-heritage', subsection:'sites', difficulty:2,
    question:'The Slave Route Monument is found at the foot of which mountain in Mauritius?',
    options:['Corps de Garde','Le Morne Brabant','Pieter Both','Trois Mamelles'], answer:'Le Morne Brabant',
    hint:'This mountain is a UNESCO World Heritage Site and a symbol of slave resistance.',
    explanation:'The Slave Route Monument is at the foot of Le Morne Brabant mountain. Le Morne was a refuge for runaway slaves (maroons) and is a UNESCO World Heritage Site.' }),
  makeMCQ({ id:'g6h-pp24-017', chapterId:'g6-cultural-heritage', subsection:'sites', difficulty:2,
    question:'<b>Picture 7</b> shows the National History Museum in Mauritius.' +
      _g6hg24('pic7-museum', 'A photograph of a two-storey colonial building with palm trees in front') +
      'Where is this museum situated in Mauritius?',
    options:['Curepipe','Mahebourg','Port Louis','Quatre Bornes'], answer:'Mahebourg',
    hint:'This town is in the south-east of Mauritius, near Grand Port Bay.',
    explanation:'The National History Museum (Chateau de Mahebourg) is situated in Mahebourg, in the south-east of Mauritius. It houses artefacts from the Battle of Grand Port (1810).' }),
  makeMCQ({ id:'g6h-pp24-018', chapterId:'g6-cultural-heritage', subsection:'sites', difficulty:2,
    question:'Which sugar mill in the <b>north</b> of Mauritius has been converted into a museum?',
    options:['Alma','Beau Plan','Medine','Mon Loisir'], answer:'Beau Plan',
    hint:'This converted sugar mill is now a popular heritage attraction.',
    explanation:'The Beau Plan sugar mill in the north of Mauritius has been converted into a museum (L\'Aventure du Sucre), celebrating the history of the sugar industry in Mauritius.' }),
  // ── Items that need a map or picture, so they had no entry until the
  //    diagrams were cropped from the paper.

  makeMCQ({ id:'g6h-pp24-019', chapterId:'g6-natural-hazards', subsection:'cyclones', difficulty:2,
    question:'<b>Map 1</b> shows the track of cyclone Belal.' +
      _g6hg24('map1-cyclone-track', 'A map of the south-west Indian Ocean with a curved track marked with dates, and a compass rose') +
      'On the <b>14th of January 2024</b>, cyclone Belal was situated to the …………… of Mauritius.',
    options:['North West','North East','South East','South West'], answer:'North West',
    hint:'Find the point marked 14 Jan, then find Mauritius. Use the compass rose.',
    explanation:'The 14 Jan position is above Mauritius (further north) and to its left (further west), so the cyclone was to the <b>North West</b> of the island.' }),

  makeMCQ({ id:'g6h-pp24-020', chapterId:'g6-land-use', subsection:'agriculture', difficulty:1,
    question:'<b>Picture 1</b> shows one type of farming practised in Mauritius.' +
      _g6hg24('pic1-farming', 'A drawing of a person tending rows of different vegetables in a small plot') +
      'Which type of farming is shown in <b>Picture 1</b>?',
    options:['Market gardening','Mixed farming','Plantation farming','Terrace farming'], answer:'Market gardening',
    hint:'Look at how many different crops are growing, and how small the plot is.',
    explanation:'<b>Market gardening</b> is the growing of vegetables, fruit and flowers on small plots for sale at local markets. Mixed farming would also include animals; plantation farming grows one crop over a large area.' }),

  makeMCQ({ id:'g6h-pp24-021', chapterId:'g6-land-use', subsection:'agriculture', difficulty:2,
    question:'<b>Picture 1</b> shows one type of farming practised in Mauritius.' +
      _g6hg24('pic1-farming', 'A drawing of a person tending rows of different vegetables in a small plot') +
      'Which pair of crops is generally grown in this type of farming?',
    options:['Tomatoes and lettuce','Sugar cane and tea','Coconut and coffee','Wheat and barley'], answer:'Tomatoes and lettuce',
    hint:'Name two crops you can actually see growing in the rows.',
    explanation:'Market gardening grows vegetables such as <b>tomatoes, lettuce, carrots and cabbages</b> for local markets. Sugar cane and tea are plantation crops; wheat and barley are not grown in Mauritius.' }),

  makeMCQ({ id:'g6h-pp24-022', chapterId:'g6-independence', subsection:'coat_of_arms', difficulty:1,
    question:'The pictures below show some national symbols of Mauritius.' +
      _g6hg24('pic3-6-symbols', 'Four framed pictures labelled Picture 3 to Picture 6, each showing a different national emblem') +
      'What is the national symbol shown in <b>Picture 5</b>?',
    options:['The Coat of Arms','The national flag','The national flower','The Dodo'], answer:'The Coat of Arms',
    hint:'Picture 3 is the Dodo - that one is given as the example. Which of the others carries a Latin motto on a ribbon?',
    explanation:'<b>Picture 5</b> is the <b>Coat of Arms of Mauritius</b>, showing a dodo and a Sambar deer holding a shield, with the motto <i>Stella Clavisque Maris Indici</i>. Picture 4 is the national flag and Picture 6 is the Trochetia, the national flower.' })

);
window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g6h-pp24-pdf-001', chapterId:'g6-natural-hazards', marks:1, year:2024, grade:6, subject:'History & Geography',
    question:'<b>Map 1</b> shows the track of cyclone Belal. On the 14th of January 2024, cyclone Belal was situated to the ............................ of Mauritius. (Circle: North East / North West / South East / South West)' +
      _g6hg24('map1-cyclone-track', 'A map of the south-west Indian Ocean with a curved track marked with dates, and a compass rose'),
    markScheme:'North West.', type:'map-mcq' },
  { id:'g6h-pp24-pdf-002', chapterId:'g6-land-use', marks:1, year:2024, grade:6, subject:'History & Geography',
    question:'<b>Picture 1</b> shows one type of farming practised in Mauritius. Which type of farming is shown? Tick the correct box: Market gardening / Mixed farming' +
      _g6hg24('pic1-farming', 'A drawing of a person tending rows of different vegetables in a small plot'),
    markScheme:'Market gardening.', type:'picture-tick' },
  { id:'g6h-pp24-pdf-003', chapterId:'g6-land-use', marks:2, year:2024, grade:6, subject:'History & Geography',
    question:'Name <b>two</b> crops that are generally grown in the type of farming shown in <b>Picture 1</b>.' +
      _g6hg24('pic1-farming', 'A drawing of a person tending rows of different vegetables in a small plot'),
    markScheme:'Any two of: tomatoes, lettuce, carrots, cabbages, onions, beans (1 mark each).', type:'short-answer' },
  { id:'g6h-pp24-pdf-004', chapterId:'g6-independence', marks:3, year:2024, grade:6, subject:'History & Geography',
    question:'The pictures below show some national symbols of Mauritius. Picture 3 has been done for you (the Dodo). Identify <b>Picture 4</b>, <b>Picture 5</b> and <b>Picture 6</b>.' +
      _g6hg24('pic3-6-symbols', 'Four framed pictures labelled Picture 3 to Picture 6, each showing a different national emblem'),
    markScheme:'Picture 4: the national flag. Picture 5: the Coat of Arms. Picture 6: the Trochetia (boucle d\'oreille), the national flower. (1 mark each.)', type:'identify-pictures' }
);
