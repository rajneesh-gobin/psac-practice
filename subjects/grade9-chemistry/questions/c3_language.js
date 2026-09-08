'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Science - C3 · Language of Chemistry   (weight 3)
//
//  ⚠ BALANCING IS A COUNTING TASK AND IT IS FULLY MARKABLE HERE. The syllabus
//    outcome is "write and balance chemical equations", and the papers ask for
//    the missing coefficient or for the balanced form to be picked from a list.
//    Both shapes are written below; nothing asks a child to type a whole
//    equation with subscripts, which this engine could not mark fairly.
//
//  ⚠ NO MOLE, Mr OR REACTING-MASS WORK - the hard rule for this pack
//    (blueprint-science §M.6.6). The supplied Periodic Table in the real exam
//    carries no atomic numbers and no relative atomic masses, and five years of
//    papers contain none of it. Formulae and balancing are in scope; masses in
//    grams reacting are not.
//
//  ⚠ SUBSCRIPTS ARE <sub> IN HTML AND THAT IS FINE HERE - these questions carry
//    NO inline svg, so the breakout rule does not apply. Never put a <sub>
//    inside an <svg>; use <tspan baseline-shift="sub"> there.
//
//  ⚠ "REARRANGEMENT OF ATOMS" IS THE POINT OF THE CHAPTER. Atoms are neither
//    created nor destroyed, which is exactly WHY an equation must balance - the
//    items are written so the two ideas connect rather than sitting apart.
//
//  Source: NCE Science (Chemistry) 2021-2025; NCF Grades 7-9 §C3.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-c3-language';

const MCQ = [
  ['g9s-c3-001', 'rearrangement_of_atoms', 1,
   'What happens to the atoms during a chemical reaction?',
   ['They are rearranged into new substances',
    'Some of them are destroyed completely',
    'New atoms are created from nothing',
    'They stay joined exactly as they were'],
   'They are rearranged into new substances',
   'Nothing is created and nothing is lost.',
   'A chemical reaction rearranges the same atoms into different combinations; none is created or destroyed.'],

  ['g9s-c3-002', 'rearrangement_of_atoms', 2,
   'Why must the total mass be the same before and after a reaction in a sealed container?',
   ['The same atoms are present, only joined differently',
    'Some atoms are destroyed and replaced by others',
    'The container adds mass as the reaction proceeds',
    'Gases have no mass, so nothing is lost'],
   'The same atoms are present, only joined differently',
   'Count the atoms before and after.',
   'Because the atoms are only rearranged, the same atoms - and so the same mass - are present at the end.'],

  ['g9s-c3-003', 'rearrangement_of_atoms', 3,
   'A candle burns and seems to lose mass. Has mass been destroyed?',
   ['No, gases escape into the air and carry the mass away',
    'Yes, mass is destroyed whenever something burns',
    'No, the mass is stored inside the flame',
    'Yes, but only the mass of the wick is lost'],
   'No, gases escape into the air and carry the mass away',
   'Where do the products of burning go?',
   'Carbon dioxide and water vapour escape into the air; weigh them too and the total mass is unchanged.'],

  ['g9s-c3-004', 'rearrangement_of_atoms', 2,
   'In a chemical equation, the substances on the left are the:',
   ['Reactants', 'Products', 'Catalysts', 'Solvents'], 'Reactants',
   'They are the ones present at the start.',
   'The starting substances on the left are the reactants; the substances formed on the right are the products.'],

  ['g9s-c3-005', 'formulae_of_compounds', 1,
   'What is the formula of water?',
   ['H<sub>2</sub>O', 'HO<sub>2</sub>', 'H<sub>2</sub>O<sub>2</sub>', 'HO'],
   'H<sub>2</sub>O',
   'Two hydrogen atoms joined to one oxygen atom.',
   'A water molecule has two hydrogen atoms and one oxygen atom, so its formula is H<sub>2</sub>O.'],

  ['g9s-c3-006', 'formulae_of_compounds', 1,
   'What is the formula of carbon dioxide?',
   ['CO<sub>2</sub>', 'CO', 'C<sub>2</sub>O', 'CaO'], 'CO<sub>2</sub>',
   'The prefix "di" tells you how many oxygen atoms.',
   'Carbon dioxide has one carbon atom and two oxygen atoms: CO<sub>2</sub>.'],

  ['g9s-c3-007', 'formulae_of_compounds', 2,
   'How many atoms in total are there in one molecule of H<sub>2</sub>SO<sub>4</sub>?',
   ['7', '4', '6', '3'], '7',
   'Add up 2 hydrogen, 1 sulfur and 4 oxygen.',
   '2 + 1 + 4 = 7 atoms in total.'],

  ['g9s-c3-008', 'formulae_of_compounds', 2,
   'How many oxygen atoms are there in one formula unit of Ca(OH)<sub>2</sub>?',
   ['2', '1', '3', '4'], '2',
   'The bracket subscript multiplies everything inside it.',
   'The 2 outside the bracket applies to both the O and the H, so there are 2 oxygen atoms.'],

  ['g9s-c3-009', 'formulae_of_compounds', 3,
   'How many atoms in total are there in one formula unit of Ca(OH)<sub>2</sub>?',
   ['5', '4', '3', '6'], '5',
   'One calcium, plus twice everything inside the bracket.',
   '1 calcium + 2 oxygen + 2 hydrogen = 5 atoms.'],

  ['g9s-c3-010', 'formulae_of_compounds', 3,
   'In the formula 2H<sub>2</sub>O, how many hydrogen atoms are represented?',
   ['4', '2', '3', '6'], '4',
   'The big number in front multiplies the whole formula.',
   'Each molecule has 2 hydrogen atoms and there are 2 molecules, so 2 &times; 2 = 4.'],

  ['g9s-c3-011', 'formulae_of_compounds', 2,
   'Which formula represents an <b>element</b> rather than a compound?',
   ['O<sub>2</sub>', 'CO<sub>2</sub>', 'H<sub>2</sub>O', 'NaCl'],
   'O<sub>2</sub>',
   'An element contains only one kind of atom.',
   'O<sub>2</sub> contains only oxygen atoms, so it is an element; the others contain two different elements each.'],

  ['g9s-c3-012', 'word_equations', 1,
   'In a word equation, what separates the reactants from the products?',
   ['An arrow', 'An equals sign', 'A plus sign', 'A full stop'],
   'An arrow',
   'It shows the direction of the change.',
   'An arrow separates reactants from products and shows which way the reaction goes.'],

  ['g9s-c3-013', 'word_equations', 2,
   'Magnesium burns in oxygen to form magnesium oxide. Which word equation is correct?',
   ['magnesium + oxygen &rarr; magnesium oxide',
    'magnesium oxide &rarr; magnesium + oxygen',
    'magnesium + magnesium oxide &rarr; oxygen',
    'oxygen &rarr; magnesium + magnesium oxide'],
   'magnesium + oxygen &rarr; magnesium oxide',
   'The starting substances go on the left of the arrow.',
   'Magnesium and oxygen are the reactants and magnesium oxide is the product.'],

  ['g9s-c3-014', 'word_equations', 2,
   'Which word equation describes zinc reacting with hydrochloric acid?',
   ['zinc + hydrochloric acid &rarr; zinc chloride + hydrogen',
    'zinc + hydrochloric acid &rarr; zinc chloride + oxygen',
    'zinc chloride + hydrogen &rarr; zinc + hydrochloric acid',
    'zinc + hydrogen &rarr; zinc chloride + hydrochloric acid'],
   'zinc + hydrochloric acid &rarr; zinc chloride + hydrogen',
   'A metal and an acid give a salt and hydrogen.',
   'Metal + acid gives a salt plus hydrogen: zinc chloride and hydrogen here.'],

  ['g9s-c3-015', 'word_equations', 3,
   'Which chemical equation matches "carbon + oxygen &rarr; carbon dioxide"?',
   ['C + O<sub>2</sub> &rarr; CO<sub>2</sub>',
    'C + O &rarr; CO<sub>2</sub>',
    'C<sub>2</sub> + O<sub>2</sub> &rarr; CO<sub>2</sub>',
    'C + CO<sub>2</sub> &rarr; O<sub>2</sub>'],
   'C + O<sub>2</sub> &rarr; CO<sub>2</sub>',
   'Oxygen gas exists as O<sub>2</sub>.',
   'Carbon is C, oxygen gas is O<sub>2</sub> and carbon dioxide is CO<sub>2</sub>, and the equation already balances.'],

  ['g9s-c3-016', 'balancing_equations', 1,
   'Why must a chemical equation be balanced?',
   ['Atoms are not created or destroyed, so each kind must balance',
    'It makes the equation look tidier and easier to read',
    'The products always weigh more than the reactants did',
    'Every equation must contain the same number of substances on each side'],
   'Atoms are not created or destroyed, so each kind must balance',
   'Think about what a reaction does to atoms.',
   'A reaction only rearranges atoms, so every kind of atom must appear the same number of times on each side.'],

  ['g9s-c3-017', 'balancing_equations', 2,
   'Which equation is correctly balanced?',
   ['2H<sub>2</sub> + O<sub>2</sub> &rarr; 2H<sub>2</sub>O',
    'H<sub>2</sub> + O<sub>2</sub> &rarr; H<sub>2</sub>O',
    '2H<sub>2</sub> + O<sub>2</sub> &rarr; H<sub>2</sub>O',
    'H<sub>2</sub> + 2O<sub>2</sub> &rarr; 2H<sub>2</sub>O'],
   '2H<sub>2</sub> + O<sub>2</sub> &rarr; 2H<sub>2</sub>O',
   'Count hydrogen and oxygen on each side.',
   '4 hydrogen and 2 oxygen appear on both sides, so this one balances.'],

  ['g9s-c3-018', 'balancing_equations', 2,
   'What number is missing? ___Mg + O<sub>2</sub> &rarr; 2MgO',
   ['2', '1', '3', '4'], '2',
   'Count the magnesium atoms on the right.',
   '2MgO contains 2 magnesium atoms, so 2 magnesium atoms are needed on the left.'],

  ['g9s-c3-019', 'balancing_equations', 3,
   'What number is missing? N<sub>2</sub> + ___H<sub>2</sub> &rarr; 2NH<sub>3</sub>',
   ['3', '2', '1', '6'], '3',
   'Count the hydrogen atoms on the right.',
   '2NH<sub>3</sub> contains 6 hydrogen atoms, and each H<sub>2</sub> gives 2, so 3 are needed.'],

  ['g9s-c3-020', 'balancing_equations', 3,
   'What number is missing? 2H<sub>2</sub>O &rarr; 2H<sub>2</sub> + ___O<sub>2</sub>',
   ['1', '2', '3', '4'], '1',
   'Count the oxygen atoms on the left.',
   '2H<sub>2</sub>O contains 2 oxygen atoms, which is exactly one O<sub>2</sub> molecule.'],

  ['g9s-c3-021', 'balancing_equations', 3,
   'Which is the balanced equation for calcium reacting with oxygen?',
   ['2Ca + O<sub>2</sub> &rarr; 2CaO',
    'Ca + O<sub>2</sub> &rarr; CaO',
    'Ca + O &rarr; CaO',
    '2Ca + 2O<sub>2</sub> &rarr; 2CaO'],
   '2Ca + O<sub>2</sub> &rarr; 2CaO',
   'Oxygen gas comes as O<sub>2</sub>, so two CaO are needed.',
   'One O<sub>2</sub> supplies two oxygen atoms, making two CaO, so two Ca are needed on the left.'],

  ['g9s-c3-022', 'balancing_equations', 3,
   'In balancing an equation, which of these may you change?',
   ['The big numbers in front of the formulae',
    'The small subscript numbers inside a formula',
    'The arrow, into an equals sign',
    'The identity of any product you choose'],
   'The big numbers in front of the formulae',
   'Changing a subscript changes what the substance is.',
   'Only the coefficients may be changed; altering a subscript turns the substance into a different one.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

// ⚠ Numeric answers only where the answer really is a number - a coefficient or
//   an atom count. Never a whole equation: this engine marks a typed string
//   literally, and H2O, H₂O and H<sub>2</sub>O are all the same chemistry.
const NUM = [
  ['g9s-c3-023', 'formulae_of_compounds', 2,
   'How many atoms in total are there in one molecule of CH<sub>4</sub>?',
   5, 'One carbon and four hydrogen.', '1 + 4 = 5 atoms.'],
  ['g9s-c3-024', 'formulae_of_compounds', 2,
   'How many oxygen atoms are there in one formula unit of CaCO<sub>3</sub>?',
   3, 'Read the subscript after the O.', 'The subscript 3 gives 3 oxygen atoms.'],
  ['g9s-c3-025', 'formulae_of_compounds', 3,
   'How many hydrogen atoms are represented by 3H<sub>2</sub>SO<sub>4</sub>?',
   6, 'Multiply the 2 hydrogen in the formula by the 3 in front.',
   '3 &times; 2 = 6 hydrogen atoms.'],
  ['g9s-c3-026', 'formulae_of_compounds', 3,
   'How many atoms in total are there in one formula unit of Mg(NO<sub>3</sub>)<sub>2</sub>?',
   9, 'One magnesium, then twice everything inside the bracket.',
   '1 Mg + 2 N + 6 O = 9 atoms.'],
  ['g9s-c3-027', 'balancing_equations', 2,
   'What number balances this equation? ___H<sub>2</sub> + O<sub>2</sub> &rarr; 2H<sub>2</sub>O',
   2, 'Count the hydrogen atoms on the right.',
   '2H<sub>2</sub>O has 4 hydrogen atoms, and each H<sub>2</sub> supplies 2, so 2 are needed.'],
  ['g9s-c3-028', 'balancing_equations', 3,
   'What number balances this equation? 2Na + Cl<sub>2</sub> &rarr; ___NaCl',
   2, 'Count the sodium atoms on the left.',
   '2 sodium atoms and 2 chlorine atoms give 2NaCl.'],
  ['g9s-c3-029', 'balancing_equations', 3,
   'What number balances this equation? CH<sub>4</sub> + ___O<sub>2</sub> &rarr; CO<sub>2</sub> + 2H<sub>2</sub>O',
   2, 'Count the oxygen atoms on the right: 2 in CO<sub>2</sub> and 2 in 2H<sub>2</sub>O.',
   'The right-hand side has 4 oxygen atoms, and each O<sub>2</sub> supplies 2, so 2 are needed.'],
];

NUM.forEach(([id, subsection, difficulty, question, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeNum({ id, chapterId: CH, subsection, difficulty,
    question, answer, hint, explanation }));
});

const SHORT = [
  ['g9s-c3-030', 'rearrangement_of_atoms', 1,
   'Give the name for the starting substances in a chemical reaction.',
   'Reactants', ['reactant', 'the reactants'],
   'They are written on the left of the arrow.',
   'The substances present at the start are the reactants.'],
  ['g9s-c3-031', 'rearrangement_of_atoms', 1,
   'Give the name for the new substances formed in a chemical reaction.',
   'Products', ['product', 'the products'],
   'They are written on the right of the arrow.',
   'The substances formed are the products.'],
  ['g9s-c3-032', 'word_equations', 2,
   'Complete the word equation: magnesium + oxygen &rarr; ______',
   'Magnesium oxide', ['magnesium oxide', 'mgo'],
   'A metal burning in oxygen gives its oxide.',
   'Magnesium burns in oxygen to form magnesium oxide.'],
  ['g9s-c3-033', 'word_equations', 3,
   'Complete the word equation: zinc + hydrochloric acid &rarr; zinc chloride + ______',
   'Hydrogen', ['hydrogen gas', 'h2'],
   'A metal and an acid always give a salt and one gas.',
   'Metal + acid gives a salt plus hydrogen.'],
  ['g9s-c3-034', 'formulae_of_compounds', 1,
   'Give the chemical formula of water.',
   'H2O', ['h2o', 'H₂O', 'h₂o'],
   'Two hydrogen atoms and one oxygen atom.',
   'Water is H<sub>2</sub>O.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

})();
