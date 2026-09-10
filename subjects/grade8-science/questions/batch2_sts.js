'use strict';

(function () {

const CH = 'g8s-sts';

STATIC_QUESTIONS.push(

  makeMCQ({
    id: 'g8s-sts-016', chapterId: CH, difficulty: 2, subsection: 'science_society',
    question: 'The Mauritius Meteorological Services can now warn the country days before a cyclone arrives. Which technology made that possible?',
    options: ['Weather satellites', 'Electron microscopes', 'Magnetic compasses', 'Hydraulic presses'],
    answer: 'Weather satellites',
    hint: 'A cyclone forms far out in the Indian Ocean, where no one is standing to watch it.',
    explanation: 'Satellites photograph storms over open ocean and track their path towards the island, so warnings can be issued in advance. Microscopes look at what is very small, compasses only give direction, and hydraulic presses are machines for exerting large forces.'
  }),

  makeMCQ({
    id: 'g8s-sts-017', chapterId: CH, difficulty: 3, subsection: 'technology_impact',
    question: 'Sugar factories in Mauritius burn bagasse, the crushed cane fibre left after the juice is taken out, to generate electricity. What is the main benefit?',
    options: ['Waste becomes energy', 'Sugar tastes sweeter', 'Rain becomes heavier', 'Cane grows faster'],
    answer: 'Waste becomes energy',
    hint: 'Ask what would happen to the bagasse if it were not burned.',
    explanation: 'Bagasse would otherwise be a waste heap; burning it supplies a useful share of the national electricity and saves imported coal. Burning it happens after the sugar is made, so it cannot change the taste, and it affects neither rainfall nor the growth of the next crop.'
  }),

  makeText({
    id: 'g8s-sts-018', chapterId: CH, difficulty: 2, subsection: 'contributions_humanity',
    question: 'Louis Pasteur showed that gently heating milk kills most of the microbes in it, so the milk keeps far longer. Name the process, which is called after him.',
    answer: 'pasteurisation',
    alsoAccept: ['pasteurization', 'pasteurising', 'pasteurizing'],
    hint: 'The name of the process is built directly from the scientist’s own name.',
    explanation: 'Pasteurisation is heating a liquid enough to kill most microbes without spoiling it, and it made milk safe for millions of people. Sterilisation destroys every microbe but needs far higher temperatures, and refrigeration only slows microbes down instead of killing them.'
  }),

  makeMCQ({
    id: 'g8s-sts-019', chapterId: CH, difficulty: 3, subsection: 'technology_impact',
    question: 'Old phones, screens and batteries thrown into ordinary household bins in Mauritius are a growing problem. Why?',
    options: ['They contain toxic metals', 'They are very light to carry', 'They cost nothing to make', 'They burn without any smoke'],
    answer: 'They contain toxic metals',
    hint: 'Think about what leaks out of a battery once its case rots in a landfill.',
    explanation: 'Electronic waste holds lead, mercury and cadmium, which leak into soil and groundwater from a landfill, so it must be collected separately. Being light is no reason to worry, these devices are expensive rather than free to make, and burning them releases dangerous fumes rather than none.'
  }),

  makeMCQ({
    id: 'g8s-sts-020', chapterId: CH, difficulty: 2, subsection: 'contributions_humanity',
    question: 'Vaccination, antibiotics and piped clean water were all introduced within about a century. Which change did they bring about together?',
    options: ['Longer life expectancy', 'Cheaper mobile phones', 'Warmer global climate', 'Faster air travel'],
    answer: 'Longer life expectancy',
    hint: 'All three attack the same thing: death from infection, especially in children.',
    explanation: 'All three cut deaths from infectious disease, so far more people now survive childhood and live into old age. Cheap phones and fast aircraft came from engineering that has nothing to do with disease, and a warmer climate comes from burning fossil fuels.'
  })

);

})();
