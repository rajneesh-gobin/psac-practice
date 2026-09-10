'use strict';
STATIC_QUESTIONS.push(
  makeMCQ({
    id: 'g7s-food-chains-017', chapterId: 'g7s-food-chains', difficulty: 3,
    subsection: 'food_chains',
    question: 'Study the food web below. Which organism is eaten by <b>two</b> different consumers?' +
      '<svg viewBox="0 0 300 140" width="300" role="img" aria-label="a food web with five organisms joined by arrows">' +
      '<text x="42" y="76" font-size="11" text-anchor="middle" fill="#0f172a">Sugar cane</text>' +
      '<text x="150" y="36" font-size="11" text-anchor="middle" fill="#0f172a">Insect</text>' +
      '<text x="150" y="110" font-size="11" text-anchor="middle" fill="#0f172a">Rat</text>' +
      '<text x="255" y="36" font-size="11" text-anchor="middle" fill="#0f172a">Bird</text>' +
      '<text x="255" y="110" font-size="11" text-anchor="middle" fill="#0f172a">Mongoose</text>' +
      '<line x1="78" y1="66" x2="128" y2="42" stroke="#334155" stroke-width="1.8"/>' +
      '<polygon points="128,42 121.6,49.5 118.2,42.3" fill="#334155"/>' +
      '<line x1="78" y1="80" x2="130" y2="104" stroke="#334155" stroke-width="1.8"/>' +
      '<polygon points="130,104 120.1,103.8 123.5,96.6" fill="#334155"/>' +
      '<line x1="174" y1="32" x2="228" y2="32" stroke="#334155" stroke-width="1.8"/>' +
      '<polygon points="228,32 220,28 220,36" fill="#334155"/>' +
      '<line x1="170" y1="106" x2="224" y2="106" stroke="#334155" stroke-width="1.8"/>' +
      '<polygon points="224,106 216,102 216,110" fill="#334155"/>' +
      '</svg>',
    options: ['Sugar cane', 'Rat', 'Insect', 'Mongoose'],
    answer: 'Sugar cane',
    hint: 'Count the arrows that start at each organism.',
    explanation: 'Two arrows leave the sugar cane, one to the insect and one to the rat, so both consumers feed on it. The insect and the rat each have only one arrow leaving them, and no arrow leaves the mongoose at all.'
  }),
  makeNum({
    id: 'g7s-food-chains-018', chapterId: 'g7s-food-chains', difficulty: 3,
    subsection: 'energy_flow',
    question: 'Producers in a field trap 10 000 J of energy. Only about 10% passes on at each step of the chain. How many joules reach the <b>secondary</b> consumer?',
    answer: 100, acceptableAnswers: ['100', '100 J'],
    hint: 'The primary consumer comes first — take 10% twice.',
    explanation: '10% of 10 000 J is 1000 J for the primary consumer, and 10% of that is 100 J for the secondary consumer. 1000 J is only the first step, and the rest of the energy is lost as heat.'
  }),
  makeText({
    id: 'g7s-food-chains-019', chapterId: 'g7s-food-chains', difficulty: 1,
    subsection: 'feeding_relationships',
    question: 'What single word describes an animal that is hunted and eaten by another animal?',
    answer: 'prey', alsoAccept: ['the prey'],
    hint: 'It is the opposite partner to a predator.',
    explanation: 'The animal that is hunted is the prey, and the hunter is the predator. A herbivore describes what an animal eats, not whether it is hunted.'
  }),
  makeMCQ({
    id: 'g7s-food-chains-020', chapterId: 'g7s-food-chains', difficulty: 3,
    subsection: 'food_chains',
    question: 'A pupil writes this food chain: <b>hawk → lizard → grasshopper → grass</b>. What is wrong with it?',
    options: ['The arrows point the wrong way', 'The animals are the wrong ones', 'The grass should not be there', 'There are too many links in it'],
    answer: 'The arrows point the wrong way',
    hint: 'What does an arrow in a food chain actually mean?',
    explanation: 'An arrow means "is eaten by", so energy must flow from grass to hawk, not backwards. The four organisms and the number of links are perfectly reasonable — only the direction is wrong.'
  })
);
