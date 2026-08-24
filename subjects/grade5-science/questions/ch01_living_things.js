'use strict';
// Grade 5 Science — Chapter: Living & Non-Living Things
// Uses STATIC_QUESTIONS + helpers (makeMCQ, makeTF, makeNum) from engine/helpers.js
// To add questions: append calls below, keeping IDs sequential (g5sci-liv-NNN).

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5sci-liv-001', chapterId:'living-nonliving', difficulty:1,
    question:'Which of the following is a characteristic of ALL living things?',
    options:['They can fly','They grow and reproduce','They are found in water','They are green'],
    answer:'They grow and reproduce',
    hint:'Think about what ALL animals, plants and humans have in common.',
    explanation:'All living things grow, reproduce, breathe, feed and excrete. Not all living things can fly or are green.' }),

  makeMCQ({ id:'g5sci-liv-002', chapterId:'living-nonliving', difficulty:1,
    question:'Which of the following is a NON-LIVING thing?',
    options:['A mushroom','A seed','A rock','A worm'],
    answer:'A rock',
    hint:'A non-living thing does not grow, move on its own, or reproduce.',
    explanation:'A rock is non-living. Mushrooms, seeds and worms are all living things — they grow and reproduce.' }),

  makeMCQ({ id:'g5sci-liv-003', chapterId:'living-nonliving', difficulty:1,
    question:'What is a habitat?',
    options:['A type of food eaten by animals','The natural home where a living thing lives','A body part of an animal','A type of plant'],
    answer:'The natural home where a living thing lives',
    hint:'Think about where animals live naturally in the wild.',
    explanation:'A habitat is the natural environment or home of a living thing, where it finds food, shelter and can reproduce.' }),

  makeTF({ id:'g5sci-liv-004', chapterId:'living-nonliving', difficulty:1,
    question:'A fish can survive out of water for a long time because it adapts to any habitat.',
    answer:false,
    hint:'Think about what a fish needs to survive.',
    explanation:'A fish is adapted to live in water. It breathes through gills and cannot survive for long out of water.' }),

  makeNum({ id:'g5sci-liv-005', chapterId:'living-nonliving', difficulty:2,
    question:'Animals live in habitats that are __________ for them, providing food, shelter and water. (One word)',
    answer:'suitable', acceptableAnswers:['suitable','appropriate'],
    hint:'Animals need the right conditions to survive in their habitat.',
    explanation:'Animals live in habitats that are <b>suitable</b> (appropriate) for them — providing the food, shelter and conditions they need.' }),

  makeMCQ({ id:'g5sci-liv-006', chapterId:'living-nonliving', difficulty:2,
    question:'Which of the following is a life process carried out by ALL living things?',
    options:['Swimming','Photosynthesis','Respiration','Laying eggs'],
    answer:'Respiration',
    hint:'All living things need to release energy from food.',
    explanation:'Respiration (releasing energy from food) is carried out by ALL living things — plants, animals, fungi and bacteria. Swimming and laying eggs are not universal, and photosynthesis is only done by plants.' }),

  makeMCQ({ id:'g5sci-liv-007', chapterId:'living-nonliving', difficulty:2,
    question:'What happens to an animal if its habitat is destroyed?',
    options:[
      'It immediately adapts to a new habitat',
      'It may struggle to find food and shelter and could die',
      'It becomes stronger and healthier',
      'Nothing happens — animals are very hardy'
    ],
    answer:'It may struggle to find food and shelter and could die',
    hint:'Animals depend on their habitat for survival.',
    explanation:'When a habitat is destroyed, animals lose their source of food, shelter and breeding grounds. This can lead to the death of individuals and even extinction of species.' }),

  makeMCQ({ id:'g5sci-liv-008', chapterId:'living-nonliving', difficulty:1,
    question:'Which of the following is a living thing?',
    options:['A wooden chair','A river','A caterpillar','A cloud'],
    answer:'A caterpillar',
    hint:'Living things grow, move, breathe and reproduce.',
    explanation:'A caterpillar is a living thing — it grows, breathes, feeds and will reproduce (as a butterfly). A wooden chair, river and cloud are all non-living.' }),

  makeMCQ({ id:'g5sci-liv-009', chapterId:'living-nonliving', difficulty:1,
    question:'A frog lives both in water and on land. What group of animals does it belong to?',
    options:['Reptile','Insect','Amphibian','Fish'],
    answer:'Amphibian',
    hint:'The word "amphi" means both — both land and water.',
    explanation:'Frogs are <b>amphibians</b>. Amphibians can live both on land and in water. They are born in water (as tadpoles), breathe through gills, then develop lungs and legs to live on land.' }),

  makeMCQ({ id:'g5sci-liv-010', chapterId:'living-nonliving', difficulty:1,
    question:'Which of the following is NOT a life process of living things?',
    options:['Growth','Reproduction','Rusting','Excretion'],
    answer:'Rusting',
    hint:'Rusting happens to metals — it is a chemical reaction, not a life process.',
    explanation:'Rusting is a chemical process that happens to iron and steel — it is NOT a life process. The life processes of living things are: movement, respiration, sensitivity, growth, reproduction, excretion and nutrition.' }),

  makeTF({ id:'g5sci-liv-011', chapterId:'living-nonliving', difficulty:1,
    question:'A seed is a living thing even though it does not appear to be growing or moving.',
    answer:true,
    hint:'Think about what a seed will do when given the right conditions.',
    explanation:'True. A seed is a living thing — it is dormant (resting) but alive. Given water, warmth and air, it will germinate and grow into a new plant. Living things can be temporarily inactive.' }),

  makeMCQ({ id:'g5sci-liv-012', chapterId:'living-nonliving', difficulty:2,
    question:'Which of the following shows that plants are living things?',
    options:[
      'They have a colourful appearance',
      'They grow, make their own food and reproduce',
      'They can be moved from place to place',
      'They feel pain when broken'
    ],
    answer:'They grow, make their own food and reproduce',
    hint:'Apply the characteristics of living things to plants.',
    explanation:'Plants are living things because they <b>grow</b> (they get bigger), <b>make their own food</b> (photosynthesis) and <b>reproduce</b> (produce seeds and new plants). They also respire and excrete.' }),

  makeMCQ({ id:'g5sci-liv-013', chapterId:'living-nonliving', difficulty:2,
    question:'A camel is adapted to live in the desert. What is its natural habitat?',
    options:['Sea','Forest','Desert','Soil'],
    answer:'Desert',
    hint:'Camels store fat in their humps and can go a long time without water.',
    explanation:'The natural <b>habitat</b> of a camel is the <b>desert</b>. Camels are adapted to this hot, dry environment — they have humps to store energy, and can go many days without drinking water.' }),

  makeMCQ({ id:'g5sci-liv-014', chapterId:'living-nonliving', difficulty:2,
    question:'Give the natural habitat of the following animal: a dolphin.',
    options:['Desert','Forest','Soil','Sea'],
    answer:'Sea',
    hint:'Dolphins breathe air but live in water.',
    explanation:'Dolphins are marine mammals — their natural habitat is the <b>sea</b> (ocean). They come to the surface to breathe air, but live and feed in the ocean.' }),

  makeMCQ({ id:'g5sci-liv-015', chapterId:'living-nonliving', difficulty:3,
    question:'Ryan puts a plant in a dark cupboard for 2 weeks. He notices the leaves turn yellow and the plant starts to wilt. What is the MOST LIKELY reason?',
    options:[
      'The plant got too much water',
      'Without light, the plant cannot make food (photosynthesis) and begins to die',
      'The plant was too cold inside the cupboard',
      'The plant ran out of soil minerals after 2 weeks'
    ],
    answer:'Without light, the plant cannot make food (photosynthesis) and begins to die',
    hint:'Leaves make food using light — what happens if there is no light?',
    explanation:'Leaves carry out <b>photosynthesis</b> using sunlight, water and carbon dioxide to produce glucose (food). Without light, photosynthesis stops, the plant cannot make food, the leaves turn yellow (chlorophyll breaks down) and the plant weakens and wilts.' }),

  makeMCQ({ id:'g5sci-liv-016', chapterId:'living-nonliving', difficulty:3,
    question:'A scientist drops a stone and a frog into two identical boxes with food and water. After two weeks, only one box shows signs of food having been eaten and waste produced. Which box and why?',
    options:[
      'The stone\'s box — stones absorb nutrients',
      'The frog\'s box — the frog eats, grows and excretes because it is living',
      'Both boxes — both objects need energy',
      'Neither box — living things in boxes cannot survive'
    ],
    answer:'The frog\'s box — the frog eats, grows and excretes because it is living',
    hint:'Which of the two carries out life processes?',
    explanation:'The <b>frog</b> is a living thing — it carries out life processes: it eats (nutrition), breathes (respiration), and produces waste (excretion). The stone is non-living and does none of these things.' }),

  makeMCQ({ id:'g5sci-liv-017', chapterId:'living-nonliving', difficulty:4,
    question:'A weed grows in a crack in a concrete pavement, pushes the concrete apart, and eventually drops seeds that grow into new plants nearby. Which THREE life processes does this show?',
    options:[
      'Movement, growth and reproduction',
      'Rusting, melting and evaporation',
      'Excretion, magnetism and reflection',
      'Condensation, freezing and boiling'
    ],
    answer:'Movement, growth and reproduction',
    hint:'Look at what the weed is doing: it moves (pushes concrete), it gets bigger, and it makes seeds.',
    explanation:'The weed demonstrates three life processes: <b>movement</b> (pushing apart the concrete), <b>growth</b> (getting larger and stronger) and <b>reproduction</b> (dropping seeds that grow into new plants). This shows that even small plants are fully living.' })

);
