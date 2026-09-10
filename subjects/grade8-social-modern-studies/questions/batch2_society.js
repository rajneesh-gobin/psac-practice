'use strict';

(function () {

const CH = 'g8sms-society';

STATIC_QUESTIONS.push(

  makeMCQ({
    id: 'g8sms-society-016', chapterId: CH, difficulty: 2, subsection: 'post_ww1_conditions',
    question: 'Malaria outbreaks in Mauritius in the 1920s and 1930s hit one group of people hardest. Which group?',
    options: ['Plantation workers', 'Colonial officials', 'Ship passengers', 'Sugar exporters'],
    answer: 'Plantation workers',
    hint: 'The disease spread where housing was poorest and standing water was closest.',
    explanation: 'Labourers lived in crowded camps beside the cane fields and irrigation ditches, where mosquitoes bred, and could rarely afford treatment. Officials lived in better-drained upland houses, exporters were merchants in town, and passengers were only briefly on the island.'
  }),

  makeText({
    id: 'g8sms-society-017', chapterId: CH, difficulty: 2, subsection: 'social_economic_changes',
    question: 'From the 1920s to the 1960s the Mauritian economy depended almost entirely on one crop, grown across most of the island. Name that crop.',
    answer: 'sugar cane',
    alsoAccept: ['sugarcane', 'sugar-cane', 'sugar', 'cane', 'canne', 'canne à sucre'],
    hint: 'It is still grown across much of the island today, and it is crushed rather than eaten.',
    explanation: 'Sugar cane covered most cultivated land, and nearly every job, export and tax revenue depended on it — which is why a fall in the world sugar price hurt everyone. Tea and tobacco were grown too, but on a far smaller scale.'
  }),

  makeMCQ({
    id: 'g8sms-society-018', chapterId: CH, difficulty: 2, subsection: 'mauritian_society',
    question: 'Kreol, Bhojpuri, Hakka, French and English are all in daily use in Mauritius. What does this show about the country?',
    options: ['Multilingual', 'Monolingual', 'Uninhabited', 'Landlocked'],
    answer: 'Multilingual',
    hint: 'The prefix tells you how many languages are meant.',
    explanation: 'Multilingual means many languages are used side by side, which is exactly what this list shows. Monolingual would mean only one, uninhabited means nobody lives there, and landlocked means a country has no coast — the opposite of an island.'
  }),

  makeMCQ({
    id: 'g8sms-society-019', chapterId: CH, difficulty: 3, subsection: 'post_ww1_conditions',
    question: 'When the world price of sugar fell sharply in the 1930s, ordinary Mauritian families suffered badly. Why did one price matter so much?',
    options: ['Most jobs depended on sugar', 'Sugar was the only food eaten', 'Sugar paid for all schooling', 'Sugar was imported at the time'],
    answer: 'Most jobs depended on sugar',
    hint: 'Think about what almost every working adult on the island did for a living.',
    explanation: 'With one crop supporting almost all employment, a fall in its price meant wage cuts and lay-offs that spread through the whole society — the danger of depending on a single product. Mauritians ate rice, maize and fish as well as sugar, schooling was not funded by sugar alone, and sugar was exported from the island, not imported into it.'
  }),

  makeMCQ({
    id: 'g8sms-society-020', chapterId: CH, difficulty: 3, subsection: 'social_economic_changes',
    question: 'The Export Processing Zone opened many textile factories from the 1970s. Which group entered paid work in the largest numbers because of it?',
    options: ['Women', 'Sailors', 'Planters', 'Fishermen'],
    answer: 'Women',
    hint: 'Ask which group had mostly worked unpaid at home before the factories opened.',
    explanation: 'Textile factories recruited women in very large numbers, and paid work outside the home changed family incomes and women’s place in Mauritian society. Sailors, planters and fishermen were already in paid work and were not what the new factories were hiring for.'
  })

);

})();
