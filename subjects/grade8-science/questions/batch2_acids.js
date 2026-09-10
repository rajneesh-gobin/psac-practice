'use strict';

(function () {

const CH = 'g8s-acids';

STATIC_QUESTIONS.push(

  makeMCQ({
    id: 'g8s-acids-016', chapterId: CH, difficulty: 2, subsection: 'acids_bases_indicators',
    question: 'A few drops of universal indicator are added to a solution of pH 13. What colour appears?',
    options: ['Purple', 'Red', 'Orange', 'Green'],
    answer: 'Purple',
    hint: 'pH 13 is at the far alkaline end of the scale, well past 7.',
    explanation: 'Strong alkalis turn universal indicator purple. Red and orange belong to the acid end (pH 1 to 4) and green is neutral, pH 7.'
  }),

  makeText({
    id: 'g8s-acids-017', chapterId: CH, difficulty: 2, subsection: 'reactions_acids',
    question: 'Complete this word equation: acid + carbonate → salt + water + ______. Name the missing product.',
    answer: 'carbon dioxide',
    alsoAccept: ['carbon dioxide gas', 'co2', 'co₂'],
    hint: 'It is the gas that makes the mixture fizz, and it turns limewater milky.',
    explanation: 'Acids react with carbonates to give a salt, water and carbon dioxide, which is why marble chips fizz in acid. Hydrogen is the gas given off with a metal, not with a carbonate, and oxygen is not produced at all.'
  }),

  makeMCQ({
    id: 'g8s-acids-018', chapterId: CH, difficulty: 3, subsection: 'neutralisation',
    question: 'A bee sting leaves an acidic substance in the skin. Which household substance would ease the pain by neutralising it?',
    options: ['Baking soda', 'Vinegar', 'Lemon juice', 'Table salt'],
    answer: 'Baking soda',
    hint: 'To cancel out an acid you need something on the other side of pH 7.',
    explanation: 'Baking soda (sodium hydrogencarbonate) is a mild base, so it neutralises the acid of the sting. Vinegar and lemon juice are themselves acids and would make it worse, and table salt is neutral, so it changes nothing.'
  }),

  makeMCQ({
    id: 'g8s-acids-019', chapterId: CH, difficulty: 2, subsection: 'reactions_acids',
    question: 'Dilute hydrochloric acid is poured onto magnesium ribbon. Which salt is formed?',
    options: ['Magnesium chloride', 'Magnesium sulphate', 'Magnesium nitrate', 'Magnesium carbonate'],
    answer: 'Magnesium chloride',
    hint: 'The second half of a salt’s name comes from the acid that made it.',
    explanation: 'Hydrochloric acid always gives chloride salts, so magnesium + hydrochloric acid → magnesium chloride + hydrogen. Sulphates come from sulphuric acid and nitrates from nitric acid, while a carbonate is a starting material, not a product of this reaction.'
  }),

  makeMCQ({
    id: 'g8s-acids-020', chapterId: CH, difficulty: 3, subsection: 'acids_bases_indicators',
    question: 'A pupil dips red litmus paper into a colourless liquid and it stays red. What can she safely conclude?',
    options: ['It is not alkaline', 'It must be an acid', 'It must be water', 'It has a pH of 7'],
    answer: 'It is not alkaline',
    hint: 'Red litmus only changes colour for one kind of solution. What does "no change" rule out?',
    explanation: 'Red litmus turns blue only in an alkali, so no change rules out an alkali and nothing more — the liquid could be an acid or neutral. To tell those two apart she would need blue litmus or universal indicator, so claiming it is an acid, water, or exactly pH 7 goes beyond the evidence.'
  })

);

})();
