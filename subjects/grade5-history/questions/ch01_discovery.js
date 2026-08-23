'use strict';
// Grade 5 History & Geography — Chapter: Discovery of the Mascarene Islands
// Uses STATIC_QUESTIONS + helpers from engine/helpers.js
// IDs format: g5hg-disc-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5hg-disc-001', chapterId:'discovery', difficulty:1,
    question:'Which group of European explorers was the FIRST to discover the Mascarene Islands (Mauritius, Rodrigues, Réunion)?',
    options:['The French','The British','The Portuguese','The Dutch'],
    answer:'The Portuguese',
    hint:'They were great sea explorers in the 15th and 16th centuries.',
    explanation:'The Portuguese were the first European explorers to discover the Mascarene Islands in the early 16th century. They did not settle them permanently, but they named and mapped the islands.' }),

  makeMCQ({ id:'g5hg-disc-002', chapterId:'discovery', difficulty:1,
    question:'What was the Mascarene Islands called by the Portuguese who first discovered them?',
    options:['The Spice Islands','The Mascarenhas Islands','The Golden Islands','The Indian Islands'],
    answer:'The Mascarenhas Islands',
    hint:'The islands were named after a Portuguese navigator.',
    explanation:'The Portuguese navigator Pedro de Mascarenhas gave his name to the island group, which became known as the Mascarenhas (Mascarene) Islands.' }),

  makeMCQ({ id:'g5hg-disc-003', chapterId:'discovery', difficulty:2,
    question:'When Portuguese explorers first arrived, Mauritius was uninhabited. What does "uninhabited" mean?',
    options:['Full of dangerous animals','No people lived there','Very difficult to reach','Covered in thick forest'],
    answer:'No people lived there',
    hint:'The "in-" prefix means not, and "inhabited" means lived in.',
    explanation:'"Uninhabited" means that no people lived there. When the Portuguese first arrived, Mauritius, Rodrigues and Réunion had no human population.' }),

  makeMCQ({ id:'g5hg-disc-004', chapterId:'discovery', difficulty:1,
    question:'Which famous extinct bird was found living in Mauritius when European explorers first arrived?',
    options:['Pink Pigeon','Flamingo','Dodo','Echo Parakeet'],
    answer:'Dodo',
    hint:'This large, flightless bird later became a symbol of extinction.',
    explanation:'The Dodo (Raphus cucullatus) was a large flightless bird found only in Mauritius. It was discovered by explorers and later became extinct due to hunting and introduced predators.' }),

  makeMCQ({ id:'g5hg-disc-005', chapterId:'discovery', difficulty:2,
    question:'What was the main reason European explorers sailed to find new routes and lands in the 15th and 16th centuries?',
    options:[
      'To escape cold weather in Europe',
      'To find spices, trade goods and wealth',
      'To establish holiday resorts',
      'To escape wars in Europe'
    ],
    answer:'To find spices, trade goods and wealth',
    hint:'The spice trade was very valuable in those times.',
    explanation:'European explorers — especially the Portuguese — explored new sea routes to find spices (pepper, cinnamon, cloves), gold and other trade goods that were extremely valuable in Europe.' }),

  makeTF({ id:'g5hg-disc-006', chapterId:'discovery', difficulty:1,
    question:'The Dutch were the first Europeans to discover the Mascarene Islands.',
    answer:false,
    hint:'Another European nation sailed these waters first.',
    explanation:'The Portuguese were the first Europeans to discover the Mascarene Islands in the early 16th century, not the Dutch. The Dutch arrived later and were the first to settle in Mauritius.' }),

  makeMCQ({ id:'g5hg-disc-007', chapterId:'discovery', difficulty:2,
    question:'François Leguat was a French explorer who arrived in Rodrigues in 1691. What is he known for writing about?',
    options:[
      'The weather patterns of the Indian Ocean',
      'The wildlife of Rodrigues, including the Rodrigues Solitaire',
      'The best routes from Portugal to India',
      'The arrival of enslaved workers in Mauritius'
    ],
    answer:'The wildlife of Rodrigues, including the Rodrigues Solitaire',
    hint:'He carefully wrote down what he observed about the animals of Rodrigues.',
    explanation:'François Leguat settled in Rodrigues in 1691 and wrote detailed accounts of the island\'s wildlife, including the Rodrigues Solitaire — a large flightless bird that is now extinct.' }),

  makeMCQ({ id:'g5hg-disc-008', chapterId:'discovery', difficulty:2,
    question:'Which sea route did Portuguese explorers use to reach the Mascarene Islands in the Indian Ocean?',
    options:[
      'Across the Atlantic Ocean through the Panama Canal',
      'Around the Cape of Good Hope (southern tip of Africa)',
      'Through the Mediterranean Sea and Suez Canal',
      'Directly east across the Pacific Ocean'
    ],
    answer:'Around the Cape of Good Hope (southern tip of Africa)',
    hint:'The route goes around the bottom of a large continent.',
    explanation:'Portuguese explorers sailed around the Cape of Good Hope at the southern tip of Africa, opening the sea route to the Indian Ocean, the Mascarene Islands and the spice-rich lands of Asia.' })

);
