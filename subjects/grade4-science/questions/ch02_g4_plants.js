'use strict';
// Grade 4 Science — Chapter: Plants
// IDs format: g4s-plt-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4s-plt-001', chapterId:'g4sci-plants', difficulty:1,
    question:'Which part of a plant ABSORBS water and minerals from the soil?',
    options:['Leaves','Stem','Roots','Flowers'],
    answer:'Roots',
    hint:'This part of the plant is underground and holds the plant in the soil.',
    explanation:'<b>Roots</b> have two functions: (1) they <b>anchor</b> the plant firmly in the soil, and (2) they <b>absorb water and minerals</b> from the soil. The absorbed water travels up to the rest of the plant through the stem.' }),

  makeMCQ({ id:'g4s-plt-002', chapterId:'g4sci-plants', difficulty:1,
    question:'What is the main function of LEAVES?',
    options:['To absorb water from the soil','To make food for the plant using sunlight','To carry water from roots to the rest of the plant','To produce seeds'],
    answer:'To make food for the plant using sunlight',
    hint:'Leaves are green and face the sun. What process happens inside them?',
    explanation:'The main function of leaves is to <b>make food</b> for the plant through <b>photosynthesis</b>. Leaves use sunlight, water (from the roots) and carbon dioxide (from the air) to produce food (glucose) and oxygen.' }),

  makeTF({ id:'g4s-plt-003', chapterId:'g4sci-plants', difficulty:1,
    question:'The FLOWER of a plant is used for reproduction.',
    answer:true,
    hint:'Flowers attract insects for pollination, which leads to seed formation.',
    explanation:'<b>True.</b> Flowers are used for <b>reproduction</b>. They attract insects (through colour and scent), which carry pollen from one flower to another (pollination). After pollination, the flower develops into a fruit containing seeds, which grow into new plants.' }),

  makeMCQ({ id:'g4s-plt-004', chapterId:'g4sci-plants', difficulty:1,
    question:'What does the STEM of a plant do?',
    options:[
      'Absorbs water from the soil',
      'Makes food using sunlight',
      'Carries water and food through the plant and supports it',
      'Produces seeds for new plants'
    ],
    answer:'Carries water and food through the plant and supports it',
    hint:'The stem connects the roots to the leaves. What must travel between them?',
    explanation:'The <b>stem</b> has two functions: (1) it <b>supports</b> the plant and holds the leaves up towards the sunlight; (2) it <b>carries</b> water and minerals (from the roots) up to the leaves, and carries food (made by the leaves) down to the rest of the plant.' }),

  makeMCQ({ id:'g4s-plt-005', chapterId:'g4sci-plants', difficulty:2,
    question:'Which conditions does a plant need to grow WELL?',
    options:[
      'Darkness, cold temperature and no water',
      'Water, sunlight, air and warmth',
      'Only water — nothing else',
      'Sunlight and sand — no water needed'
    ],
    answer:'Water, sunlight, air and warmth',
    hint:'Think about what a plant uses to make food and what it needs to stay alive.',
    explanation:'Plants need <b>water</b> (absorbed by roots), <b>sunlight</b> (for photosynthesis), <b>air</b> (carbon dioxide for photosynthesis, oxygen for respiration), and <b>warmth</b> (for chemical reactions in the plant to work). Soil minerals/nutrients are also important for healthy growth.' }),

  makeMCQ({ id:'g4s-plt-006', chapterId:'g4sci-plants', difficulty:2,
    question:'A plant is kept in a completely DARK cupboard for two weeks. What will most likely happen to it?',
    options:[
      'It will grow faster because it is warm inside',
      'It will stay the same — plants do not need light',
      'It will wilt, turn yellow and die because it cannot photosynthesise',
      'It will grow bigger because of the darkness'
    ],
    answer:'It will wilt, turn yellow and die because it cannot photosynthesise',
    hint:'What does a plant need light for?',
    explanation:'Without sunlight, the plant <b>cannot photosynthesise</b> (make food). Leaves will turn yellow (chlorophyll breaks down without light), the plant will wilt and eventually die. This shows that <b>sunlight is essential</b> for plant growth.' }),

  makeMCQ({ id:'g4s-plt-007', chapterId:'g4sci-plants', difficulty:2,
    question:'What is the function of SEEDS?',
    options:['To absorb water','To support the plant','To make food','To grow into new plants'],
    answer:'To grow into new plants',
    hint:'Seeds are produced by plants for one main purpose.',
    explanation:'Seeds contain a baby plant (embryo) inside them. When conditions are right (water, warmth, air), the seed <b>germinates</b> and grows into a new plant. Seeds are how most plants reproduce and spread to new places.' }),

  makeMCQ({ id:'g4s-plt-008', chapterId:'g4sci-plants', difficulty:2,
    question:'What are the THREE things leaves need for photosynthesis?',
    options:[
      'Water, oxygen and warmth',
      'Sunlight, water and carbon dioxide',
      'Soil, sunlight and oxygen',
      'Air, minerals and darkness'
    ],
    answer:'Sunlight, water and carbon dioxide',
    hint:'Photosynthesis = the process of making food in leaves. What goes IN to make food?',
    explanation:'Photosynthesis uses: <b>sunlight</b> (energy), <b>water</b> (from the soil, carried by the stem) and <b>carbon dioxide</b> (from the air). The leaf uses these three things to produce food (glucose) and releases <b>oxygen</b> as a by-product — the oxygen we breathe!' }),

  makeMCQ({ id:'g4s-plt-009', chapterId:'g4sci-plants', difficulty:3,
    question:'If the STEM of a plant is cut through, what will happen to the leaves? Why?',
    options:[
      'Nothing will happen — leaves get water directly from the air',
      'The leaves will droop and wilt because water from the roots can no longer reach them',
      'The leaves will grow faster because they are free from the stem',
      'The leaves will absorb water from the soil directly'
    ],
    answer:'The leaves will droop and wilt because water from the roots can no longer reach them',
    hint:'Remember the stem\'s job — what happens if that transport route is broken?',
    explanation:'Cutting the stem breaks the <b>transport system</b>. Water absorbed by the roots can no longer travel up to the leaves. Without water, the leaves cannot photosynthesise and will <b>droop, wilt and die</b>. This demonstrates that the stem is the vital water-transport link between roots and leaves.' }),

  makeMCQ({ id:'g4s-plt-010', chapterId:'g4sci-plants', difficulty:4,
    question:'Mira places two identical plants in the same room. Plant A gets water every day and sits near a sunny window. Plant B gets NO water but also sits near the window. After two weeks, Plant A is healthy and growing. Plant B has wilted and turned brown. What conclusion can Mira draw?',
    options:[
      'Sunlight alone is enough for plants to survive',
      'Water is essential for plant survival even when sunlight is available',
      'Both plants will eventually grow the same way',
      'Plant B wilted because it had too much sunlight'
    ],
    answer:'Water is essential for plant survival even when sunlight is available',
    hint:'Both plants had the same sunlight. The only difference was water. What does that tell you?',
    explanation:'The only variable that differed between the two plants was <b>water</b>. Plant A (with water) thrived; Plant B (without water) wilted. This is a fair test and Mira can conclude that <b>water is essential for plant survival</b>, even when sunlight is present. Without water, the plant cannot photosynthesise or carry out other life processes.' })

);
