'use strict';
STATIC_QUESTIONS.push(
  makeText({
    id: 'g7s-changes-017', chapterId: 'g7s-changes', difficulty: 2,
    subsection: 'physical_changes',
    question: 'Name the process that gets pure water out of sea water by boiling it and then cooling the steam.',
    answer: 'distillation', alsoAccept: ['distilling', 'simple distillation'],
    hint: 'The apparatus used for it is called a still.',
    explanation: 'Distillation boils the water off and condenses it again, leaving the salt behind — a physical change, because the water is unchanged. Filtration would not remove dissolved salt, and evaporation alone loses the water as steam.'
  }),
  makeMCQ({
    id: 'g7s-changes-018', chapterId: 'g7s-changes', difficulty: 3,
    subsection: 'chemical_changes',
    question: 'Which observation on its own is <b>not</b> proof that a chemical change has happened?',
    options: ['A rise in temperature', 'A new gas given off', 'A permanent colour change', 'A new solid appearing'],
    answer: 'A rise in temperature',
    hint: 'Think of something warming up with no new substance formed.',
    explanation: 'Heating a pot of water raises its temperature and forms nothing new, so temperature alone proves nothing. A new gas, a permanent colour change or a new solid all mean new substances have been made.'
  }),
  makeNum({
    id: 'g7s-changes-019', chapterId: 'g7s-changes', difficulty: 3,
    subsection: 'examples_changes',
    question: 'A pupil burns 50 g of iron wool in air. The grey ash left behind has a mass of 66 g. By how many grams did the mass increase?',
    answer: 16, acceptableAnswers: ['16', '16 g'],
    hint: 'Compare the mass before with the mass after.',
    explanation: '66 − 50 = 16 g, and that extra mass is the oxygen from the air that joined with the iron — evidence of a chemical change. 66 g is the final mass, not the gain.'
  }),
  makeMCQ({
    id: 'g7s-changes-020', chapterId: 'g7s-changes', difficulty: 3,
    subsection: 'physical_changes',
    question: 'A pupil says that dissolving salt makes a new substance because the salt disappears. Why is he wrong?',
    options: ['The salt can be got back', 'The salt turns into water', 'The salt reacts with water', 'The salt loses all its mass'],
    answer: 'The salt can be got back',
    hint: 'What is left in the pan when the water boils away?',
    explanation: 'Boiling the water off leaves the salt unchanged, so nothing new was made and the change is physical. The salt does not become water or react with it, and the mass of the solution equals the salt plus the water.'
  })
);
