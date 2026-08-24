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

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4s-plt-011', chapterId:'g4sci-plants', difficulty:1,
    question:'Photosynthesis makes food (glucose) for the plant. What GAS is also released as a by-product?',
    options:['Carbon dioxide','Nitrogen','Oxygen','Hydrogen'],
    answer:'Oxygen',
    hint:'The gas released by plants during photosynthesis is the same gas we need to breathe.',
    explanation:'Photosynthesis: sunlight + water + CO₂ → glucose + <b>oxygen</b>. Plants release <b>oxygen</b> as a by-product — this is where almost all the oxygen in our air comes from. This is why forests and other plant life are so important for all living creatures.' }),

  makeMCQ({ id:'g4s-plt-012', chapterId:'g4sci-plants', difficulty:1,
    question:'What is GERMINATION?',
    options:[
      'The process of a flower producing pollen',
      'The process of a seed sprouting and growing into a new plant',
      'The process of leaves making food',
      'The process of roots absorbing water'
    ],
    answer:'The process of a seed sprouting and growing into a new plant',
    hint:'Think about what happens when you plant a seed in soil and water it.',
    explanation:'<b>Germination</b> is the process where a <b>seed sprouts</b> and begins growing into a new plant. The seed absorbs water, swells, and a tiny root (radicle) pushes out first, followed by a tiny shoot. Germination needs water, warmth and air.' }),

  makeMCQ({ id:'g4s-plt-013', chapterId:'g4sci-plants', difficulty:2,
    question:'What THREE conditions does a seed need to GERMINATE?',
    options:[
      'Sunlight, soil and fertiliser',
      'Water, warmth and air (oxygen)',
      'Darkness, cold and dry conditions',
      'Light, water and soil only'
    ],
    answer:'Water, warmth and air (oxygen)',
    hint:'A seed in a frozen, dry, airless environment will not germinate.',
    explanation:'Seeds need: (1) <b>Water</b> — to activate enzymes and start growth; (2) <b>Warmth</b> — for chemical reactions to work; (3) <b>Air (oxygen)</b> — for respiration. Note: seeds do NOT need sunlight to germinate — the seedling uses food stored inside the seed.' }),

  makeMCQ({ id:'g4s-plt-014', chapterId:'g4sci-plants', difficulty:2,
    question:'What is POLLINATION?',
    options:[
      'The process of seeds sprouting in soil',
      'The transfer of pollen from one flower to another, usually by insects or wind',
      'The process of leaves making food',
      'The process of water moving up the stem'
    ],
    answer:'The transfer of pollen from one flower to another, usually by insects or wind',
    hint:'Pollination leads to seed formation. How does pollen move between flowers?',
    explanation:'<b>Pollination</b> is the <b>transfer of pollen</b> from the male part (anther) of a flower to the female part (stigma), usually by <b>insects</b> (bees, butterflies — attracted by colour and scent) or by <b>wind</b>. After pollination, seeds develop inside the flower.' }),

  makeTF({ id:'g4s-plt-015', chapterId:'g4sci-plants', difficulty:2,
    question:'Seeds can be dispersed (spread to new places) by wind, water and animals.',
    answer:true,
    hint:'Think about dandelion seeds blowing away, coconuts floating in water, and seeds sticking to fur.',
    explanation:'<b>True.</b> Seed dispersal methods: <b>wind</b> (dandelion, sycamore — light or winged seeds), <b>water</b> (coconut — floats), <b>animals</b> (berries eaten and seeds excreted; seeds that stick to fur). Dispersal allows plants to spread to new growing areas away from the parent plant.' }),

  makeMCQ({ id:'g4s-plt-016', chapterId:'g4sci-plants', difficulty:2,
    question:'What gives leaves their GREEN colour?',
    options:['Water inside the leaf','Sunlight hitting the leaf','Chlorophyll — a green pigment inside leaf cells','Minerals from the soil'],
    answer:'Chlorophyll — a green pigment inside leaf cells',
    hint:'This green substance also captures sunlight energy for photosynthesis.',
    explanation:'Leaves are green because of <b>chlorophyll</b> — a green pigment found inside the leaf cells (in structures called chloroplasts). Chlorophyll <b>absorbs sunlight</b> and uses that energy for photosynthesis. When leaves yellow in autumn, the chlorophyll breaks down.' }),

  makeMCQ({ id:'g4s-plt-017', chapterId:'g4sci-plants', difficulty:2,
    question:'Leaves have tiny pores called STOMATA. What is their main function?',
    options:[
      'To absorb water from rain',
      'To allow gases (carbon dioxide and oxygen) to move in and out of the leaf',
      'To trap insects for food',
      'To reflect sunlight away from the leaf'
    ],
    answer:'To allow gases (carbon dioxide and oxygen) to move in and out of the leaf',
    hint:'Stomata are like tiny doors for gases. What gases does a leaf need for photosynthesis?',
    explanation:'<b>Stomata</b> are tiny pores (usually on the underside of leaves). They allow: <b>carbon dioxide</b> to enter for photosynthesis, <b>oxygen</b> to exit as a by-product, and water vapour to exit (transpiration). Stomata can open and close to control gas exchange.' }),

  makeMCQ({ id:'g4s-plt-018', chapterId:'g4sci-plants', difficulty:3,
    question:'If ALL the leaves are removed from a healthy plant, what will most likely happen?',
    options:[
      'The plant will grow faster because energy is not wasted on leaves',
      'The plant will survive — roots can make food instead',
      'The plant will die because it can no longer photosynthesise to make food',
      'The plant will grow new leaves immediately and be unaffected'
    ],
    answer:'The plant will die because it can no longer photosynthesise to make food',
    hint:'Leaves are the plant\'s food factories. What happens if the factory is removed?',
    explanation:'Without leaves, the plant cannot <b>photosynthesise</b> — it has no way to make food. Without food, the plant cannot carry out its life processes and will <b>weaken and die</b>. Roots cannot make food — they only absorb water and minerals.' }),

  makeMCQ({ id:'g4s-plt-019', chapterId:'g4sci-plants', difficulty:4,
    question:'Sasha grows two identical pots of grass. Both get the same water and warmth. Pot A gets sunlight. Pot B is covered with a black cloth. After one week, Pot A is green and healthy. Pot B has turned yellow and is wilting. What can Sasha conclude?',
    options:[
      'The black cloth caused the yellowing because black is a dark colour.',
      'Sunlight is essential for plants to make food (photosynthesis) and stay healthy.',
      'Watering is more important than sunlight for grass.',
      'Both pots will recover equally once the cloth is removed.'
    ],
    answer:'Sunlight is essential for plants to make food (photosynthesis) and stay healthy.',
    hint:'Everything was the same EXCEPT sunlight. What does the difference in results tell you?',
    explanation:'This is a <b>fair test</b> — the only variable that differed was sunlight. Pot A (with sunlight) was healthy; Pot B (without sunlight) turned yellow because chlorophyll breaks down without light and photosynthesis cannot occur. Sasha concludes: <b>sunlight is essential for plant health</b>.' })

);
