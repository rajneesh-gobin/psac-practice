'use strict';
// Grade 4 Science - Chapter: Living & Non-Living Things
// IDs format: g4s-liv-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4s-liv-001', chapterId:'g4sci-living', subsection:'living_nonliving', difficulty:1,
    question:'Which of these is a LIVING thing?',
    options:['A rock','A glass bottle','A cat','A plastic bag'],
    answer:'A cat',
    hint:'Living things grow, breathe, move and reproduce. Which one in the list does all of these?',
    explanation:'A <b>cat</b> is a living thing - it grows, breathes, moves, feeds and can reproduce. A rock, glass bottle and plastic bag are non-living - they do not breathe, grow or reproduce.' }),

  makeMCQ({ id:'g4s-liv-002', chapterId:'g4sci-living', subsection:'living_nonliving', difficulty:1,
    question:'What do ALL living things do?',
    options:['Make their own food','Grow and reproduce','Live in water','Live on land'],
    answer:'Grow and reproduce',
    hint:'Think about what every single living thing - plant or animal - must do.',
    explanation:'All living things <b>grow and reproduce</b> (make more of their own kind). Not all living things make their own food (animals eat food, only plants make it). Not all live in water or on land.' }),

  makeTF({ id:'g4s-liv-003', chapterId:'g4sci-living', subsection:'living_nonliving', difficulty:1,
    question:'A rock is a living thing.',
    answer:false,
    hint:'Does a rock breathe, grow, feed or reproduce?',
    explanation:'<b>False.</b> A rock is a <b>non-living thing</b> - it does not breathe, grow, feed, move on its own or reproduce. Non-living things include: rocks, water, glass, plastic, soil and air.' }),

  makeMCQ({ id:'g4s-liv-004', chapterId:'g4sci-living', subsection:'living_nonliving', difficulty:1,
    question:'What do living things need to SURVIVE?',
    options:['Only sunlight','Only water','Food, water and air','Glass and plastic'],
    answer:'Food, water and air',
    hint:'Think about what would happen to an animal or plant if it was given none of these.',
    explanation:'All living things need <b>food, water and air</b> to survive. Plants make their own food using sunlight, water and air (photosynthesis). Animals get food by eating plants or other animals.' }),

  makeMCQ({ id:'g4s-liv-005', chapterId:'g4sci-living', subsection:'mrs_gren', difficulty:2,
    question:'The letters MRS GREN help us remember the characteristics of living things. What does the "R" stand for?',
    options:['Running','Respiration','Reproducing','Reacting'],
    answer:'Respiration',
    hint:'MRS GREN = Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition.',
    explanation:'In MRS GREN, R stands for <b>Respiration</b> - living things breathe/take in air to release energy from food. MRS GREN: <b>M</b>ovement, <b>R</b>espiration, <b>S</b>ensitivity, <b>G</b>rowth, <b>R</b>eproduction, <b>E</b>xcretion, <b>N</b>utrition.' }),

  makeNum({ id:'g4s-liv-006', chapterId:'g4sci-living', subsection:'mrs_gren', difficulty:2,
    question:'MRS GREN lists 7 characteristics of living things. How many letters are in MRS GREN? Write a number.',
    answer:'7', acceptableAnswers:['7'],
    hint:'Count the letters: M-R-S-G-R-E-N.',
    explanation:'MRS GREN has <b>7</b> letters, representing 7 characteristics: Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition. Every living thing shows all 7 of these characteristics.' }),

  makeMCQ({ id:'g4s-liv-007', chapterId:'g4sci-living', subsection:'living_nonliving', difficulty:2,
    question:'A fire burns, grows bigger and gives off heat. Is a fire a LIVING thing?',
    options:['Yes - because it grows and moves','No - because it cannot feed, reproduce or excrete','Yes - because it needs oxygen','No - because it is hot'],
    answer:'No - because it cannot feed, reproduce or excrete',
    hint:'A fire grows and moves, but check all 7 characteristics of MRS GREN.',
    explanation:'A fire is <b>not living</b>. Although fire grows and moves, it cannot <b>feed</b> (take in nutrients), <b>reproduce</b> (make new fires on its own) or <b>excrete</b> waste products. It does not show all the characteristics of MRS GREN, so it is not a living thing.' }),

  makeMCQ({ id:'g4s-liv-008', chapterId:'g4sci-living', subsection:'living_nonliving', difficulty:2,
    question:'Why are plants classified as LIVING things even though they cannot walk?',
    options:[
      'They are not living - they cannot move',
      'They show all MRS GREN characteristics: they grow, respire, reproduce, respond to light, and absorb nutrients',
      'They are living only because they are green',
      'They are living because they have roots'
    ],
    answer:'They show all MRS GREN characteristics: they grow, respire, reproduce, respond to light, and absorb nutrients',
    hint:'Living things do not need to walk. What matters is showing all the MRS GREN characteristics.',
    explanation:'Plants are <b>living things</b> because they show all 7 MRS GREN characteristics. They move (leaves turn towards light), respire, are sensitive (react to light and touch), grow, reproduce (seeds), excrete waste gases, and take in nutrition (photosynthesis). Movement does not have to mean walking.' }),

  makeMCQ({ id:'g4s-liv-009', chapterId:'g4sci-living', subsection:'living_nonliving', difficulty:3,
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

  makeMCQ({ id:'g4s-liv-010', chapterId:'g4sci-living', subsection:'living_nonliving', difficulty:4,
    question:'Priya finds an object on the beach. It is hard, has no colour, never changes shape, does not eat, and has been there for 1,000 years. Her friend says it must be living because "it has been there so long". Is her friend correct? Why?',
    options:[
      'Yes - because very old things are always living',
      'No - because it does not show any MRS GREN characteristics such as growth, respiration or reproduction',
      'Yes - because it is on a beach where living things are found',
      'No - because living things cannot be hard'
    ],
    answer:'No - because it does not show any MRS GREN characteristics such as growth, respiration or reproduction',
    hint:'Age does not determine whether something is living. What characteristics must a living thing show?',
    explanation:'Her friend is <b>not correct</b>. Being very old does not make something living. The object shows <b>none of the MRS GREN characteristics</b> - it does not grow, breathe, feed, move, reproduce, excrete or respond to its environment. These characteristics are what determine if something is living, not its age.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4s-liv-011', chapterId:'g4sci-living', subsection:'mrs_gren', difficulty:1,
    question:'In MRS GREN, what does the letter "G" stand for?',
    options:['Germination','Growth','Gas','Giving'],
    answer:'Growth',
    hint:'G is the fourth letter of MRS GREN: M, R, S, G…',
    explanation:'"G" stands for <b>Growth</b> - all living things grow. Bacteria grow, plants grow, animals grow. Non-living things do not grow biologically. MRS GREN: Movement, Respiration, Sensitivity, <b>Growth</b>, Reproduction, Excretion, Nutrition.' }),

  makeMCQ({ id:'g4s-liv-012', chapterId:'g4sci-living', subsection:'mrs_gren', difficulty:1,
    question:'In MRS GREN, what does the letter "N" stand for?',
    options:['Nature','Nutrition','Nitrogen','Nervousness'],
    answer:'Nutrition',
    hint:'N is the last letter of MRS GREN. It relates to food and feeding.',
    explanation:'"N" stands for <b>Nutrition</b> - all living things need and use food for energy and growth. Plants make their own food (photosynthesis); animals must eat. MRS GREN: Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, <b>Nutrition</b>.' }),

  makeTF({ id:'g4s-liv-013', chapterId:'g4sci-living', subsection:'living_nonliving', difficulty:1,
    question:'A mushroom is a living thing.',
    answer:true,
    hint:'Does a mushroom grow, reproduce and feed? Check MRS GREN.',
    explanation:'<b>True.</b> A mushroom is a living thing (a fungus). It grows, feeds on decaying matter, reproduces by releasing spores, and carries out all MRS GREN processes. Fungi are a separate group of living organisms - neither plants nor animals.' }),

  makeMCQ({ id:'g4s-liv-014', chapterId:'g4sci-living', subsection:'mrs_gren', difficulty:2,
    question:'What does "E" stand for in MRS GREN?',
    options:['Eating','Energy','Excretion','Expansion'],
    answer:'Excretion',
    hint:'E is the sixth letter. It is about removing waste from the body.',
    explanation:'"E" stands for <b>Excretion</b> - all living things remove waste products from their bodies. Animals excrete urine and breathe out carbon dioxide. Plants release oxygen and water vapour as waste. MRS GREN: Movement, Respiration, Sensitivity, Growth, Reproduction, <b>Excretion</b>, Nutrition.' }),

  makeMCQ({ id:'g4s-liv-015', chapterId:'g4sci-living', subsection:'mrs_gren', difficulty:2,
    question:'What does "S" stand for in MRS GREN?',
    options:['Size','Speed','Sensitivity','Survival'],
    answer:'Sensitivity',
    hint:'S is the third letter. It is about how living things respond to their surroundings.',
    explanation:'"S" stands for <b>Sensitivity</b> - living things react to changes in their environment (stimuli). A plant turns its leaves towards light. An animal jumps away from danger. MRS GREN: Movement, Respiration, <b>Sensitivity</b>, Growth, Reproduction, Excretion, Nutrition.' }),

  makeMCQ({ id:'g4s-liv-016', chapterId:'g4sci-living', subsection:'mrs_gren', difficulty:2,
    question:'What is the KEY difference between plants and animals regarding NUTRITION?',
    options:[
      'Animals make their own food; plants eat other organisms',
      'Plants make their own food using sunlight; animals must eat other organisms',
      'Both plants and animals make their own food',
      'Neither plants nor animals need food'
    ],
    answer:'Plants make their own food using sunlight; animals must eat other organisms',
    hint:'Which group uses photosynthesis to produce food from sunlight?',
    explanation:'<b>Plants make their own food</b> using sunlight (photosynthesis - they are producers). <b>Animals cannot make food</b> - they must eat plants or other animals (they are consumers). This is why plants are the foundation of all food chains.' }),

  makeMCQ({ id:'g4s-liv-017', chapterId:'g4sci-living', subsection:'living_nonliving', difficulty:2,
    question:'MICROORGANISMS (like bacteria) are:',
    options:[
      'Non-living chemicals',
      'Living things too small to be seen without a microscope',
      'Only found in dirty water',
      'Only found in hospitals'
    ],
    answer:'Living things too small to be seen without a microscope',
    hint:'Micro = very small. Organism = living thing.',
    explanation:'<b>Microorganisms</b> (microbes) are <b>living things so small they can only be seen with a microscope</b>. They include bacteria, viruses and fungi. They show MRS GREN characteristics. Some are helpful (making yoghurt); others cause disease.' }),

  makeMCQ({ id:'g4s-liv-018', chapterId:'g4sci-living', subsection:'living_nonliving', difficulty:3,
    question:'Which group correctly separates LIVING from NON-LIVING things?',
    options:[
      'Living: river, fish, tree | Non-living: rock, sand, cloud',
      'Living: fish, tree, mushroom | Non-living: river, rock, sand',
      'Living: river, rock, fish | Non-living: tree, sand, cloud',
      'Living: rock, tree, sand | Non-living: fish, mushroom, river'
    ],
    answer:'Living: fish, tree, mushroom | Non-living: river, rock, sand',
    hint:'A river moves but is not living - movement alone does not make something living.',
    explanation:'"Living: <b>fish, tree, mushroom</b>" - all show MRS GREN. "Non-living: <b>river, rock, sand</b>" - they do not breathe, grow, feed or reproduce. A river moves because of gravity, not because it is alive.' }),

  makeMCQ({ id:'g4s-liv-019', chapterId:'g4sci-living', subsection:'living_nonliving', difficulty:4,
    question:'Shan says: "A car moves, uses fuel for energy, and produces exhaust gas. It must be living." Which response CORRECTLY explains why a car is NOT living?',
    options:[
      'Cars are man-made, so they are never living.',
      'A car does not grow, cannot reproduce, and cannot respond to its environment on its own - it fails the MRS GREN test.',
      'Cars are living because they use fuel the same way animals use food.',
      'Cars are non-living because they cannot fly.'
    ],
    answer:'A car does not grow, cannot reproduce, and cannot respond to its environment on its own - it fails the MRS GREN test.',
    hint:'Apply ALL of MRS GREN: does a car grow? Can it reproduce? Does it respond to stimuli independently?',
    explanation:'A car moves and uses fuel, but it is <b>not living</b> because it does not: <b>grow</b> (stays the same size), <b>reproduce</b> (cannot make baby cars on its own), or <b>respond to its environment independently</b>. It fails multiple MRS GREN checks. All 7 characteristics must be present for something to be classified as living.' })

);
