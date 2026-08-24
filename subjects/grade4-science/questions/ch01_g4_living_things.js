'use strict';
// Grade 4 Science — Chapter: Living & Non-Living Things
// IDs format: g4s-liv-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4s-liv-001', chapterId:'g4sci-living', difficulty:1,
    question:'Which of these is a LIVING thing?',
    options:['A rock','A glass bottle','A cat','A plastic bag'],
    answer:'A cat',
    hint:'Living things grow, breathe, move and reproduce. Which one in the list does all of these?',
    explanation:'A <b>cat</b> is a living thing — it grows, breathes, moves, feeds and can reproduce. A rock, glass bottle and plastic bag are non-living — they do not breathe, grow or reproduce.' }),

  makeMCQ({ id:'g4s-liv-002', chapterId:'g4sci-living', difficulty:1,
    question:'What do ALL living things do?',
    options:['Make their own food','Grow and reproduce','Live in water','Live on land'],
    answer:'Grow and reproduce',
    hint:'Think about what every single living thing — plant or animal — must do.',
    explanation:'All living things <b>grow and reproduce</b> (make more of their own kind). Not all living things make their own food (animals eat food, only plants make it). Not all live in water or on land.' }),

  makeTF({ id:'g4s-liv-003', chapterId:'g4sci-living', difficulty:1,
    question:'A rock is a living thing.',
    answer:false,
    hint:'Does a rock breathe, grow, feed or reproduce?',
    explanation:'<b>False.</b> A rock is a <b>non-living thing</b> — it does not breathe, grow, feed, move on its own or reproduce. Non-living things include: rocks, water, glass, plastic, soil and air.' }),

  makeMCQ({ id:'g4s-liv-004', chapterId:'g4sci-living', difficulty:1,
    question:'What do living things need to SURVIVE?',
    options:['Only sunlight','Only water','Food, water and air','Glass and plastic'],
    answer:'Food, water and air',
    hint:'Think about what would happen to an animal or plant if it was given none of these.',
    explanation:'All living things need <b>food, water and air</b> to survive. Plants make their own food using sunlight, water and air (photosynthesis). Animals get food by eating plants or other animals.' }),

  makeMCQ({ id:'g4s-liv-005', chapterId:'g4sci-living', difficulty:2,
    question:'The letters MRS GREN help us remember the characteristics of living things. What does the "R" stand for?',
    options:['Running','Respiration','Reproducing','Reacting'],
    answer:'Respiration',
    hint:'MRS GREN = Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition.',
    explanation:'In MRS GREN, R stands for <b>Respiration</b> — living things breathe/take in air to release energy from food. MRS GREN: <b>M</b>ovement, <b>R</b>espiration, <b>S</b>ensitivity, <b>G</b>rowth, <b>R</b>eproduction, <b>E</b>xcretion, <b>N</b>utrition.' }),

  makeNum({ id:'g4s-liv-006', chapterId:'g4sci-living', difficulty:2,
    question:'MRS GREN lists 7 characteristics of living things. How many letters are in MRS GREN? Write a number.',
    answer:'7', acceptableAnswers:['7'],
    hint:'Count the letters: M-R-S-G-R-E-N.',
    explanation:'MRS GREN has <b>7</b> letters, representing 7 characteristics: Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition. Every living thing shows all 7 of these characteristics.' }),

  makeMCQ({ id:'g4s-liv-007', chapterId:'g4sci-living', difficulty:2,
    question:'A fire burns, grows bigger and gives off heat. Is a fire a LIVING thing?',
    options:['Yes — because it grows and moves','No — because it cannot feed, reproduce or excrete','Yes — because it needs oxygen','No — because it is hot'],
    answer:'No — because it cannot feed, reproduce or excrete',
    hint:'A fire grows and moves, but check all 7 characteristics of MRS GREN.',
    explanation:'A fire is <b>not living</b>. Although fire grows and moves, it cannot <b>feed</b> (take in nutrients), <b>reproduce</b> (make new fires on its own) or <b>excrete</b> waste products. It does not show all the characteristics of MRS GREN, so it is not a living thing.' }),

  makeMCQ({ id:'g4s-liv-008', chapterId:'g4sci-living', difficulty:2,
    question:'Why are plants classified as LIVING things even though they cannot walk?',
    options:[
      'They are not living — they cannot move',
      'They show all MRS GREN characteristics: they grow, respire, reproduce, respond to light, and absorb nutrients',
      'They are living only because they are green',
      'They are living because they have roots'
    ],
    answer:'They show all MRS GREN characteristics: they grow, respire, reproduce, respond to light, and absorb nutrients',
    hint:'Living things do not need to walk. What matters is showing all the MRS GREN characteristics.',
    explanation:'Plants are <b>living things</b> because they show all 7 MRS GREN characteristics. They move (leaves turn towards light), respire, are sensitive (react to light and touch), grow, reproduce (seeds), excrete waste gases, and take in nutrition (photosynthesis). Movement does not have to mean walking.' }),

  makeMCQ({ id:'g4s-liv-009', chapterId:'g4sci-living', difficulty:3,
    question:'Which statement is TRUE about ALL living things?',
    options:[
      'All living things have legs',
      'All living things live in the ocean',
      'All living things produce waste',
      'All living things make their own food'
    ],
    answer:'All living things produce waste',
    hint:'Excretion (E in MRS GREN) means removing waste. Which of these applies to ALL living things?',
    explanation:'All living things <b>produce waste</b> (excretion). Animals produce waste like urine and carbon dioxide. Plants produce oxygen as a waste product of photosynthesis. Not all living things have legs, live in the ocean, or make their own food (animals eat, not make their food).' }),

  makeMCQ({ id:'g4s-liv-010', chapterId:'g4sci-living', difficulty:4,
    question:'Priya finds an object on the beach. It is hard, has no colour, never changes shape, does not eat, and has been there for 1,000 years. Her friend says it must be living because "it has been there so long". Is her friend correct? Why?',
    options:[
      'Yes — because very old things are always living',
      'No — because it does not show any MRS GREN characteristics such as growth, respiration or reproduction',
      'Yes — because it is on a beach where living things are found',
      'No — because living things cannot be hard'
    ],
    answer:'No — because it does not show any MRS GREN characteristics such as growth, respiration or reproduction',
    hint:'Age does not determine whether something is living. What characteristics must a living thing show?',
    explanation:'Her friend is <b>not correct</b>. Being very old does not make something living. The object shows <b>none of the MRS GREN characteristics</b> — it does not grow, breathe, feed, move, reproduce, excrete or respond to its environment. These characteristics are what determine if something is living, not its age.' })

);
