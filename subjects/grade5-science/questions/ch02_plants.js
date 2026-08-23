'use strict';
// Grade 5 Science — Chapter: Plants
// Uses STATIC_QUESTIONS + helpers from engine/helpers.js
// IDs format: g5sci-pl-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5sci-pl-001', chapterId:'plants', difficulty:1,
    question:'What is the main function of the leaf in a plant?',
    options:['It absorbs water from the soil','It makes food for the plant','It holds the plant firmly in the soil','It protects the seed'],
    answer:'It makes food for the plant',
    hint:'The leaf carries out photosynthesis.',
    explanation:'The leaf makes food for the plant through photosynthesis — using sunlight, water and carbon dioxide to produce glucose and oxygen.' }),

  makeMCQ({ id:'g5sci-pl-002', chapterId:'plants', difficulty:1,
    question:'Which part of the plant anchors it firmly in the soil AND absorbs water and minerals?',
    options:['The stem','The leaf','The root','The flower'],
    answer:'The root',
    hint:'This part is underground.',
    explanation:'The root anchors the plant in the soil and absorbs water and minerals from the soil.' }),

  makeTF({ id:'g5sci-pl-003', chapterId:'plants', difficulty:1,
    question:'The leaf of a plant is responsible for absorbing water from the soil.',
    answer:false,
    hint:'Which part of the plant is underground?',
    explanation:'The <b>root</b> absorbs water from the soil. The leaf makes food through photosynthesis.' }),

  makeMCQ({ id:'g5sci-pl-004', chapterId:'plants', difficulty:1,
    question:'What is the main function of the stem in a plant?',
    options:['It absorbs sunlight','It produces seeds','It transports water from roots to leaves','It absorbs water from the soil'],
    answer:'It transports water from roots to leaves',
    hint:'The stem acts like a pipe.',
    explanation:'The stem transports water and minerals from the roots up to the leaves, and carries food made in the leaves down to other parts of the plant.' }),

  makeMCQ({ id:'g5sci-pl-005', chapterId:'plants', difficulty:2,
    question:'Which conditions are needed for a seed to germinate?',
    options:['Water, warmth and air','Sunlight, soil and water','Water, air and fertiliser','Sunlight, warmth and soil'],
    answer:'Water, warmth and air',
    hint:'A seed does not need light to germinate.',
    explanation:'Seeds need water (to activate enzymes), warmth (for chemical reactions) and air/oxygen (for respiration) to germinate. Sunlight is NOT needed for germination.' }),

  makeTF({ id:'g5sci-pl-006', chapterId:'plants', difficulty:1,
    question:'Sunlight is needed for a seed to germinate.',
    answer:false,
    hint:'Think about what a seed buried deep in the ground needs to start growing.',
    explanation:'Seeds do not need sunlight to germinate. They need water, warmth and air. Sunlight is needed later, for the seedling to make food.' }),

  makeMCQ({ id:'g5sci-pl-007', chapterId:'plants', difficulty:1,
    question:'What is soil erosion?',
    options:[
      'The process of planting new trees',
      'The removal of topsoil by wind or water',
      'The mixing of soil with fertilisers',
      'The process of soil becoming hard'
    ],
    answer:'The removal of topsoil by wind or water',
    hint:'Erosion means wearing away — something is being removed.',
    explanation:'Soil erosion is the removal and transport of topsoil by wind, running water or waves, leaving the land less fertile.' }),

  makeMCQ({ id:'g5sci-pl-008', chapterId:'plants', difficulty:2,
    question:'Which measure helps to PREVENT soil erosion on slopes?',
    options:[
      'Cutting down all trees on the slope',
      'Leaving land bare after harvesting',
      'Planting trees and plants on slopes',
      'Using heavy machinery on slopes'
    ],
    answer:'Planting trees and plants on slopes',
    hint:'Plant roots hold the soil in place.',
    explanation:'Planting trees and plants on slopes prevents soil erosion because the roots bind the soil together and prevent it from being washed or blown away.' }),

  makeMCQ({ id:'g5sci-pl-009', chapterId:'plants', difficulty:2,
    question:'What happens during pollination?',
    options:[
      'Pollen is transferred from the male part to the female part of a flower',
      'A seed is transferred to the soil',
      'Water is transferred from roots to leaves',
      'Pollen is transferred from the female part to the male part'
    ],
    answer:'Pollen is transferred from the male part to the female part of a flower',
    hint:'Pollination is needed for seeds to form.',
    explanation:'Pollination is the transfer of pollen from the stamen (male part) to the stigma (female part) of a flower, enabling fertilisation and seed formation.' }),

  makeMCQ({ id:'g5sci-pl-010', chapterId:'plants', difficulty:1,
    question:'Which part of a plant is responsible for reproduction — producing seeds?',
    options:['Root','Stem','Leaf','Flower'],
    answer:'Flower',
    hint:'Seeds develop after this part does its job.',
    explanation:'The flower is the reproductive organ of a plant. After pollination, the flower produces seeds that can grow into new plants.' }),

  makeMatch({ id:'g5sci-pl-011', chapterId:'plants', difficulty:1,
    leftItem:'Root',
    allRights:['Absorbs water and minerals from the soil','Transports water from roots to leaves','Makes food through photosynthesis','Produces seeds through reproduction'],
    correctRight:'Absorbs water and minerals from the soil',
    hint:'The root is underground.',
    explanation:'The root absorbs water and minerals from the soil and anchors the plant.' }),

  makeMatch({ id:'g5sci-pl-012', chapterId:'plants', difficulty:1,
    leftItem:'Stem',
    allRights:['Absorbs water and minerals from the soil','Transports water from roots to leaves','Makes food through photosynthesis','Produces seeds through reproduction'],
    correctRight:'Transports water from roots to leaves',
    hint:'The stem acts like a pipe or straw.',
    explanation:'The stem transports water and nutrients between the roots and leaves.' }),

  makeMCQ({ id:'g5sci-pl-013', chapterId:'plants', difficulty:2,
    question:'A farmer notices that heavy rain is washing away the topsoil from his field. What should he plant to help prevent this?',
    options:['More crops that leave the soil bare between rows','Trees and grass along the edges of the field','Large stones to block rainwater','Nothing — rain erosion cannot be stopped'],
    answer:'Trees and grass along the edges of the field',
    hint:'Roots are nature\'s anchor for soil.',
    explanation:'Trees and grass have extensive root systems that bind soil particles together, reducing the impact of rain and preventing topsoil from being washed away.' })

);
