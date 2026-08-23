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
    explanation:'A caterpillar is a living thing — it grows, breathes, feeds and will reproduce (as a butterfly). A wooden chair, river and cloud are all non-living.' })

);
