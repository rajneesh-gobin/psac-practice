'use strict';
STATIC_QUESTIONS.push(
  makeText({
    id: 'g7s-ecosystem-017', chapterId: 'g7s-ecosystem', difficulty: 1,
    subsection: 'ecosystem_types',
    question: 'What single word names the place where a particular organism lives, such as the lagoon for a sea urchin?',
    answer: 'habitat', alsoAccept: ['its habitat', 'a habitat'],
    hint: 'It is the address of the organism, not the whole community.',
    explanation: 'A habitat is where one kind of organism lives. The ecosystem is the whole set of living and non-living things together, and a population is all the members of one species in that place.'
  }),
  makeMCQ({
    id: 'g7s-ecosystem-018', chapterId: 'g7s-ecosystem', difficulty: 2,
    subsection: 'ecosystem_balance',
    question: 'Which of these is a <b>biotic</b> factor in a Mauritian lagoon?',
    options: ['Seagrass', 'Salinity', 'Sunlight', 'Temperature'],
    answer: 'Seagrass',
    hint: 'Biotic comes from the same root as "biology".',
    explanation: 'Seagrass is alive, so it is biotic. Salinity, sunlight and temperature are physical conditions of the water — abiotic factors that affect the living things but are not alive themselves.'
  }),
  makeMCQ({
    id: 'g7s-ecosystem-019', chapterId: 'g7s-ecosystem', difficulty: 3,
    subsection: 'human_impact',
    question: 'Fertiliser from cane fields washes into a lagoon. Algae grow thickly and block the light reaching the sea floor. What happens to the corals?',
    options: ['They get less light and die', 'They grow faster than before', 'They turn into seagrass beds', 'They move to deeper water'],
    answer: 'They get less light and die',
    hint: 'Corals depend on tiny algae inside them that need sunlight.',
    explanation: 'Corals house algae that photosynthesise, so cutting off the light starves the coral and it dies. Extra fertiliser feeds the floating algae, not the coral; and coral is fixed in place, so it cannot move or change into another organism.'
  }),
  makeNum({
    id: 'g7s-ecosystem-020', chapterId: 'g7s-ecosystem', difficulty: 3,
    subsection: 'ecosystem_balance',
    question: 'In a survey of a 10 m² patch of shore, 4 crabs were counted. If the crabs are spread evenly, how many would be expected in 250 m²?',
    answer: 100, acceptableAnswers: ['100'],
    hint: 'First work out how many 10 m² patches fit into 250 m².',
    explanation: '250 ÷ 10 = 25 patches, and 25 × 4 = 100 crabs. Multiplying 250 by 4 gives 1000, which would only be right if 4 crabs lived in every square metre.'
  })
);
