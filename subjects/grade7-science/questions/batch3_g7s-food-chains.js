'use strict';

(function () {

const CH = 'g7s-food-chains';

STATIC_QUESTIONS.push(

  makeMCQ({
    id: 'g7s-food-chains-021', chapterId: CH, difficulty: 1, subsection: 'feeding_relationships',
    question: 'Which term describes an organism that makes its own food using sunlight, water and carbon dioxide?',
    options: ['Producer', 'Consumer', 'Decomposer', 'Predator'],
    answer: 'Producer',
    hint: 'This organism does not need to eat anything — it manufactures its own food by photosynthesis.',
    explanation: 'A <b>producer</b> uses photosynthesis to make glucose from sunlight, water and CO₂. Consumers must eat other organisms, decomposers break down dead matter, and a predator is a type of consumer that hunts live prey.'
  }),

  makeMCQ({
    id: 'g7s-food-chains-022', chapterId: CH, difficulty: 1, subsection: 'feeding_relationships',
    question: 'An animal that eats only plants is called a —',
    options: ['Herbivore', 'Carnivore', 'Omnivore', 'Decomposer'],
    answer: 'Herbivore',
    hint: 'The Latin root <i>herba</i> means plant.',
    explanation: 'A <b>herbivore</b> feeds exclusively on plant material. A carnivore eats only animals, an omnivore eats both, and a decomposer (such as a fungus or bacterium) breaks down dead organic matter rather than eating living organisms.'
  }),

  makeText({
    id: 'g7s-food-chains-023', chapterId: CH, difficulty: 1, subsection: 'feeding_relationships',
    question: 'In a food chain, what name is given to an organism that breaks down the bodies of dead plants and animals, returning nutrients to the soil?',
    answer: 'decomposer',
    alsoAccept: ['decomposers', 'a decomposer', 'detritivore'],
    hint: 'Think about what happens to a fallen leaf after several weeks on the forest floor.',
    explanation: '<b>Decomposers</b> — mainly bacteria and fungi — digest dead organic matter outside their bodies and absorb the nutrients. This returns minerals to the soil so producers can use them again, completing the cycle.'
  }),

  makeMCQ({
    id: 'g7s-food-chains-024', chapterId: CH, difficulty: 2, subsection: 'food_chains',
    question: 'Study this food chain: <b>sea grass → fish → shark</b>. Which organism is the primary consumer?',
    options: ['Fish', 'Sea grass', 'Shark', 'There is no primary consumer'],
    answer: 'Fish',
    hint: 'The primary consumer eats the producer directly.',
    explanation: 'Sea grass is the producer. The fish eats the sea grass directly, so it is the <b>primary consumer</b>. The shark eats the fish and is therefore the secondary consumer. There is no organism with no feeding role in a food chain.'
  }),

  makeMCQ({
    id: 'g7s-food-chains-025', chapterId: CH, difficulty: 2, subsection: 'food_chains',
    question: 'Which food chain is correctly written?',
    options: [
      'Mango tree → bulbul → mongoose',
      'Mongoose → bulbul → mango tree',
      'Bulbul → mango tree → mongoose',
      'Mongoose → mango tree → bulbul'
    ],
    answer: 'Mango tree → bulbul → mongoose',
    hint: 'The chain must start with a producer, and arrows show the direction energy flows.',
    explanation: 'A food chain starts with the producer (mango tree), then the primary consumer (bulbul eats the fruit), then the secondary consumer (mongoose eats the bulbul). Arrows point in the direction energy travels — from eaten to eater. Any chain starting with an animal and pointing back to a plant reverses the energy flow.'
  }),

  makeMCQ({
    id: 'g7s-food-chains-026', chapterId: CH, difficulty: 2, subsection: 'food_chains',
    question: 'In a food web, the mongoose population suddenly decreases due to disease. What is the most likely immediate effect on the gecko population?',
    options: ['Gecko numbers increase', 'Gecko numbers decrease', 'Gecko numbers stay the same', 'Geckos become producers'],
    answer: 'Gecko numbers increase',
    hint: 'If fewer mongooses are eating geckos, what happens to the geckos?',
    explanation: 'With fewer mongooses hunting them, geckos face less predation and their numbers are likely to rise. This shows how the removal of one species can trigger a chain reaction through a food web — a concept ecologists call a trophic cascade.'
  }),

  makeMCQ({
    id: 'g7s-food-chains-027', chapterId: CH, difficulty: 2, subsection: 'feeding_relationships',
    question: 'A food chain has four links: grass → grasshopper → lizard → kestrel. What is the kestrel\'s correct feeding label?',
    options: ['Tertiary consumer', 'Primary consumer', 'Secondary consumer', 'Producer'],
    answer: 'Tertiary consumer',
    hint: 'Count how many feeding steps separate the kestrel from the producer.',
    explanation: 'Grasshopper = primary consumer, lizard = secondary consumer, kestrel = <b>tertiary consumer</b>. The number in the label counts how many consumers are between the organism and the producer. The kestrel is not a producer — it cannot make its own food.'
  }),

  makeTF({
    id: 'g7s-food-chains-028', chapterId: CH, difficulty: 2, subsection: 'food_chains',
    question: 'A food web shows more feeding relationships than a single food chain because it shows how many organisms eat more than one type of food.',
    answer: true,
    hint: 'Think about what a food chain and a food web each show.',
    explanation: '<b>True.</b> A food chain shows one straight-line feeding sequence, while a food web links many overlapping chains and shows that most animals have more than one food source. The web is a more realistic picture of feeding relationships in an ecosystem.'
  }),

  makeNum({
    id: 'g7s-food-chains-029', chapterId: CH, difficulty: 3, subsection: 'energy_flow',
    question: 'A food chain has four trophic levels. Producers capture 50 000 J of energy. Using the 10% rule, how many joules reach the <b>tertiary</b> consumer?',
    answer: 50,
    hint: 'Apply 10% three times in a row: producers → primary → secondary → tertiary.',
    explanation: 'Producers: 50 000 J. Primary consumer: 10% = 5000 J. Secondary consumer: 10% = 500 J. Tertiary consumer: 10% = <b>50 J</b>. Each step keeps only a tenth of the energy from the level before; the rest is lost mainly as heat.'
  }),

  makeMCQ({
    id: 'g7s-food-chains-030', chapterId: CH, difficulty: 3, subsection: 'energy_flow',
    question: 'Why do food chains in nature rarely have more than four or five links?',
    options: [
      'Too little energy remains to support another level of consumers',
      'Predators refuse to eat secondary consumers',
      'There are not enough different species on Earth',
      'Producers cannot grow fast enough to start a longer chain'
    ],
    answer: 'Too little energy remains to support another level of consumers',
    hint: 'Remember that only about 10% of energy passes from one level to the next.',
    explanation: 'With only 10% transferred at each step, energy falls dramatically: 100% → 10% → 1% → 0.1%. By the fourth or fifth link, so little energy is left that it cannot sustain a viable population of the next consumer. The other options do not reflect the real biological constraint.'
  }),

  makeMCQ({
    id: 'g7s-food-chains-031', chapterId: CH, difficulty: 3, subsection: 'energy_flow',
    question: 'A pyramid of numbers for a woodland food chain shows a very wide base and a very narrow top. What does this shape tell us?',
    options: [
      'There are many more producers than top predators',
      'Producers are bigger than top predators',
      'Top predators eat the most food',
      'The producers get the least energy'
    ],
    answer: 'There are many more producers than top predators',
    hint: 'The width of each bar represents the number of organisms at that level.',
    explanation: 'Each bar\'s width represents the count of organisms at that trophic level. A wide base means vast numbers of producers (e.g. thousands of grass plants) and the progressively narrowing bars show fewer organisms at each level — ultimately just a handful of top predators. Producers capture the most energy; top predators receive the least.'
  }),

  makeMCQ({
    id: 'g7s-food-chains-032', chapterId: CH, difficulty: 2, subsection: 'feeding_relationships',
    question: 'A vulture feeds on animals that have already died. What feeding label best describes it?',
    options: ['Scavenger', 'Producer', 'Herbivore', 'Decomposer'],
    answer: 'Scavenger',
    hint: 'It eats dead animals but does not break them down the way fungi or bacteria do.',
    explanation: 'A <b>scavenger</b> feeds on the carcasses of dead animals but does not digest them externally like a decomposer does. Decomposers are mainly bacteria and fungi. A vulture is not a producer (it cannot photosynthesise) and not a herbivore (it eats animals, not plants).'
  })

);

})();
