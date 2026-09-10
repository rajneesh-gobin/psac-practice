'use strict';

(function () {

const CH = 'g8s-chem-language';

STATIC_QUESTIONS.push(

  makeMCQ({
    id: 'g8s-chem-language-016', chapterId: CH, difficulty: 3, subsection: 'balancing_equations',
    question: 'Methane burns in oxygen to give carbon dioxide and water. Which equation is correctly balanced?',
    options: ['CH₄ + 2O₂ → CO₂ + 2H₂O', 'CH₄ + O₂ → CO₂ + H₂O', 'CH₄ + 2O₂ → CO₂ + H₂O', '2CH₄ + O₂ → 2CO₂ + 4H₂O'],
    answer: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
    hint: 'Count carbon first, then hydrogen, then oxygen — and count oxygen last because it appears in both products.',
    explanation: 'In CH₄ + 2O₂ → CO₂ + 2H₂O there is 1 C, 4 H and 4 O on each side. CH₄ + O₂ → CO₂ + H₂O has 2 O on the left and 3 on the right; CH₄ + 2O₂ → CO₂ + H₂O leaves 4 H on the left against 2 on the right; and 2CH₄ + O₂ → 2CO₂ + 4H₂O has 2 O on the left against 8 on the right.'
  }),

  makeNum({
    id: 'g8s-chem-language-017', chapterId: CH, difficulty: 3, subsection: 'balancing_equations',
    question: 'Nitrogen reacts with hydrogen to make ammonia: N₂ + __H₂ → 2NH₃. Which number belongs in the gap in front of H₂?',
    answer: 3,
    hint: 'The right-hand side is already fixed at 2NH₃, so count the hydrogen atoms there first.',
    explanation: '2NH₃ contains 6 hydrogen atoms, and each H₂ supplies 2, so 3 molecules of H₂ are needed: N₂ + 3H₂ → 2NH₃. Putting 2 gives only 4 hydrogen atoms and putting 6 gives 12, neither of which matches the ammonia.'
  }),

  makeMCQ({
    id: 'g8s-chem-language-018', chapterId: CH, difficulty: 2, subsection: 'valencies_radicals',
    question: 'Sodium has a valency of 1 and the carbonate radical CO₃ has a valency of 2. What is the formula of sodium carbonate?',
    options: ['Na₂CO₃', 'NaCO₃', 'Na(CO₃)₂', 'Na₃CO₂'],
    answer: 'Na₂CO₃',
    hint: 'Swap the valencies over: each valency becomes the other part’s subscript.',
    explanation: 'Sodium (1) and carbonate (2) swap over to give Na₂CO₃, so two sodium atoms balance one carbonate. NaCO₃ leaves the carbonate unbalanced, Na(CO₃)₂ swaps them the wrong way round, and Na₃CO₂ breaks up the carbonate radical, which must stay as CO₃.'
  }),

  makeText({
    id: 'g8s-chem-language-019', chapterId: CH, difficulty: 2, subsection: 'symbols_formulae',
    question: 'Some symbols come from the element’s old Latin name rather than its English one. Give the chemical symbol for iron.',
    answer: 'Fe',
    hint: 'The Latin name is <i>ferrum</i>, and the symbol has two letters.',
    explanation: 'Iron is Fe, from the Latin <i>ferrum</i>. "Ir" is the symbol for iridium and "I" is iodine, so writing the symbol from the English name would name the wrong element altogether.'
  }),

  makeNum({
    id: 'g8s-chem-language-020', chapterId: CH, difficulty: 2, subsection: 'symbols_formulae',
    question: 'Calcium hydroxide has the formula Ca(OH)₂. How many atoms are there in total in one formula unit?',
    answer: 5,
    hint: 'The subscript 2 outside the bracket multiplies everything inside it.',
    explanation: 'There is 1 calcium atom, plus 2 oxygen and 2 hydrogen atoms from the two OH groups: 1 + 2 + 2 = 5. Answering 3 counts Ca, O and H once each and ignores the bracket; answering 4 forgets the calcium.'
  })

);

})();
