'use strict';

(function () {

const CH = 'g8s-chem-language';

STATIC_QUESTIONS.push(

  makeText({
    id: 'g8s-chem-language-021', chapterId: CH, difficulty: 2, subsection: 'symbols_formulae',
    question: 'Gold has been prized for thousands of years. Its chemical symbol comes from the Latin word <i>aurum</i>. What is the symbol for gold?',
    answer: 'Au',
    alsoAccept: ['au'],
    hint: 'Take the first two letters of the Latin name.',
    explanation: 'Gold is <b>Au</b>, from Latin <i>aurum</i>. "Go" and "Gd" do not exist as symbols — Gd is gadolinium — and "Gl" is not used either. Whenever an English name gives no clue, look to the Latin.'
  }),

  makeText({
    id: 'g8s-chem-language-022', chapterId: CH, difficulty: 2, subsection: 'symbols_formulae',
    question: 'Lead was widely used in Roman plumbing, which is why its chemical symbol comes from the Latin word <i>plumbum</i>. Give the symbol for lead.',
    answer: 'Pb',
    alsoAccept: ['pb'],
    hint: 'Take the first and third letters of the Latin name.',
    explanation: 'Lead is <b>Pb</b>, from <i>plumbum</i> — the same root that gives us the word "plumber". "Le" and "Ld" are not element symbols; answering from the English name will not help here.'
  }),

  makeMCQ({
    id: 'g8s-chem-language-023', chapterId: CH, difficulty: 2, subsection: 'symbols_formulae',
    question: 'Which pair correctly matches a metal to its chemical symbol?',
    options: ['Copper → Cu', 'Copper → Co', 'Silver → Si', 'Potassium → Pt'],
    answer: 'Copper → Cu',
    hint: 'Copper\'s symbol comes from the Latin name for Cyprus, where it was mined.',
    explanation: 'Copper is <b>Cu</b> from Latin <i>cuprum</i>. Co is cobalt, Si is silicon (a non-metal), and Pt is platinum — not potassium. Potassium\'s symbol is K from the Latin <i>kalium</i>.'
  }),

  makeMCQ({
    id: 'g8s-chem-language-024', chapterId: CH, difficulty: 1, subsection: 'symbols_formulae',
    question: 'Several elements exist as diatomic molecules — pairs of atoms bonded together — when they are in their natural state. Which of the following is a diatomic molecule?',
    options: ['O₂', 'O₃', 'Na', 'Fe'],
    answer: 'O₂',
    hint: 'Diatomic means two atoms of the same element joined together.',
    explanation: 'Oxygen exists naturally as <b>O₂</b>, two oxygen atoms bonded together. O₃ is ozone (triatomic), while sodium (Na) and iron (Fe) exist as single-atom lattices, not as diatomic molecules.'
  }),

  makeMCQ({
    id: 'g8s-chem-language-025', chapterId: CH, difficulty: 2, subsection: 'symbols_formulae',
    question: 'In a chemical equation the symbol (aq) after a formula means the substance is dissolved in water. What does the symbol (g) mean?',
    options: ['The substance is a gas', 'The substance is green', 'The substance is a solid', 'The substance is glowing'],
    answer: 'The substance is a gas',
    hint: 'State symbols describe the physical state — solid, liquid, gas or aqueous solution.',
    explanation: '(g) stands for <b>gas</b>. The four state symbols are (s) solid, (l) liquid, (g) gas and (aq) aqueous (dissolved in water). Colour and appearance are not shown by state symbols.'
  }),

  makeMCQ({
    id: 'g8s-chem-language-026', chapterId: CH, difficulty: 2, subsection: 'valencies_radicals',
    question: 'Magnesium has a valency of 2 and chlorine has a valency of 1. What is the formula of magnesium chloride?',
    options: ['MgCl₂', 'MgCl', 'Mg₂Cl', 'Mg₂Cl₂'],
    answer: 'MgCl₂',
    hint: 'Swap the valencies over — the valency of one element becomes the subscript of the other.',
    explanation: 'Swapping gives Mg<sub>1</sub>Cl<sub>2</sub>, which simplifies to <b>MgCl₂</b>. Two chlorine atoms (valency 1 each) are needed to balance one magnesium atom (valency 2). MgCl leaves magnesium\'s valency unsatisfied, and Mg₂Cl does the swap the wrong way round.'
  }),

  makeMCQ({
    id: 'g8s-chem-language-027', chapterId: CH, difficulty: 3, subsection: 'valencies_radicals',
    question: 'Aluminium has a valency of 3 and oxygen has a valency of 2. What is the formula of aluminium oxide?',
    options: ['Al₂O₃', 'AlO', 'Al₃O₂', 'Al₂O₂'],
    answer: 'Al₂O₃',
    hint: 'Swap the valencies: aluminium\'s valency (3) becomes oxygen\'s subscript, and oxygen\'s valency (2) becomes aluminium\'s subscript.',
    explanation: 'Swapping gives Al<sub>2</sub>O<sub>3</sub>: 2 aluminium atoms provide 6 valency bonds (2×3), and 3 oxygen atoms consume 6 valency bonds (3×2) — exactly balanced. AlO leaves both valencies unmet, Al₃O₂ swaps them the wrong way, and Al₂O₂ ignores the valencies altogether.'
  }),

  makeText({
    id: 'g8s-chem-language-028', chapterId: CH, difficulty: 2, subsection: 'valencies_radicals',
    question: 'The sulphate radical is SO₄ and it has a valency of 2. Copper also has a valency of 2. Write the formula of copper sulphate.',
    answer: 'CuSO₄',
    alsoAccept: ['CuSO4', 'Cu SO4', 'Cu SO₄'],
    hint: 'When two parts have equal valency, one of each is enough.',
    explanation: 'Because Cu and SO₄ both have valency 2, swapping gives Cu<sub>1</sub>(SO₄)<sub>1</sub>, which is simply <b>CuSO₄</b>. Equal valencies cancel to give a 1:1 ratio. Brackets are only written when the subscript on a radical is greater than 1.'
  }),

  makeNum({
    id: 'g8s-chem-language-029', chapterId: CH, difficulty: 3, subsection: 'balancing_equations',
    question: 'Hydrogen burns in oxygen: __H₂ + O₂ → 2H₂O. What number goes in the blank in front of H₂?',
    answer: 2,
    hint: 'Count hydrogen atoms on the right first: 2H₂O contains 4 hydrogen atoms.',
    explanation: '2H₂O has 4 hydrogen atoms. Each H₂ molecule supplies 2 hydrogen atoms, so 2 molecules of H₂ are needed: <b>2H₂ + O₂ → 2H₂O</b>. Check oxygen: 1 O₂ gives 2 oxygen atoms, and 2H₂O also needs 2 oxygen atoms — balanced.'
  }),

  makeMCQ({
    id: 'g8s-chem-language-030', chapterId: CH, difficulty: 3, subsection: 'balancing_equations',
    question: 'Iron rusts by reacting with oxygen: 4Fe + __O₂ → 2Fe₂O₃. What number goes in the blank?',
    options: ['3', '2', '4', '6'],
    answer: '3',
    hint: 'Count oxygen atoms on the right side first: 2Fe₂O₃ contains how many oxygen atoms in total?',
    explanation: '2Fe₂O₃ contains 2×3 = 6 oxygen atoms. Each O₂ molecule supplies 2 oxygen atoms, so 3 molecules of O₂ are needed to provide 6. Check iron: 4 Fe on the left matches 2×2 = 4 Fe on the right. The balanced equation is 4Fe + <b>3</b>O₂ → 2Fe₂O₃.'
  }),

  makeMCQ({
    id: 'g8s-chem-language-031', chapterId: CH, difficulty: 2, subsection: 'balancing_equations',
    question: 'Calcium reacts with hydrochloric acid: Ca + 2HCl → CaCl₂ + __. What is the missing product?',
    options: ['H₂', 'H₂O', 'O₂', 'CO₂'],
    answer: 'H₂',
    hint: 'Count the hydrogen atoms on the left; they must appear somewhere on the right.',
    explanation: '2HCl gives 2 hydrogen atoms. These leave as <b>H₂</b> gas. CaCl₂ accounts for the calcium and the two chlorines, and the 2 hydrogen atoms pair up as hydrogen gas. Water would require an oxygen source that is not present; oxygen and carbon dioxide contain atoms not present on the left side.'
  }),

  makeMCQ({
    id: 'g8s-chem-language-032', chapterId: CH, difficulty: 2, subsection: 'balancing_equations',
    question: 'An acid reacts with a base. What are the products of this neutralisation reaction?',
    options: ['A salt and water', 'A salt and carbon dioxide', 'A metal and water', 'An oxide and hydrogen'],
    answer: 'A salt and water',
    hint: 'Neutralisation always makes two products: one ionic compound and one very common liquid.',
    explanation: 'When an acid neutralises a base, the products are always <b>a salt and water</b>. For example, hydrochloric acid + sodium hydroxide → sodium chloride + water. Carbon dioxide is released when an acid reacts with a carbonate, not a base, and no metal is produced in neutralisation.'
  })

);

})();
