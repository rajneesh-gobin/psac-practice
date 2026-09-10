'use strict';
STATIC_QUESTIONS.push(
  makeMCQ({
    id: 'g7s-biodiversity-017', chapterId: 'g7s-biodiversity', difficulty: 2,
    subsection: 'vertebrates_invertebrates',
    question: 'Which class of vertebrates has dry scaly skin and lays its eggs on land?',
    options: ['Reptiles', 'Amphibians', 'Mammals', 'Fish'],
    answer: 'Reptiles',
    hint: 'The Telfair\'s skink of Round Island belongs to this class.',
    explanation: 'Reptiles have dry scales and shelled eggs laid on land. Amphibians need water and have moist skin, fish live in water and have wet scales, and mammals have hair and feed their young on milk.'
  }),
  makeText({
    id: 'g7s-biodiversity-018', chapterId: 'g7s-biodiversity', difficulty: 2,
    subsection: 'classifying_organisms',
    question: 'Name the flightless Mauritian bird, hunted to extinction in the 1600s, that now appears on the national coat of arms.',
    answer: 'dodo', alsoAccept: ['the dodo', 'dodo bird'],
    hint: 'Its scientific name is <i>Raphus cucullatus</i>.',
    explanation: 'The dodo was endemic to Mauritius and was extinct within a century of people arriving. The pink pigeon and the kestrel are also Mauritian birds, but both still survive today.'
  }),
  makeMCQ({
    id: 'g7s-biodiversity-019', chapterId: 'g7s-biodiversity', difficulty: 3,
    subsection: 'plant_types',
    question: 'Mosses have no true roots and no tubes to carry water. Where would you expect to find them growing?',
    options: ['In damp, shady places', 'On dry, open rocks', 'Deep under the sea', 'Inside other animals'],
    answer: 'In damp, shady places',
    hint: 'They must take in water over their whole surface.',
    explanation: 'Without roots or tubes a moss absorbs water directly through its surface, so it needs constant damp and shade. Dry rock would kill it, it is not a marine plant, and it is not a parasite.'
  }),
  makeNum({
    id: 'g7s-biodiversity-020', chapterId: 'g7s-biodiversity', difficulty: 2,
    subsection: 'vertebrates_invertebrates',
    question: 'A pupil sorts 30 small animals collected in a garden and finds that 18 of them have a backbone. How many are invertebrates?',
    answer: 12, acceptableAnswers: ['12'],
    hint: 'Every animal is in one group or the other.',
    explanation: '30 − 18 = 12 animals with no backbone, and those are the invertebrates. 18 is the number of vertebrates, the group that was counted first.'
  })
);
