'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Chemistry - C3 · Language of Chemistry — Volume Bank
//  35 questions  ·  IDs g9s-c3-v001 … g9s-c3-v035
//  Subsections: rearrangement_of_atoms · formulae_of_compounds ·
//               word_equations · balancing_equations
//  Source: NCE Science (Chemistry) 2021-2025; NCF Grades 7-9 §C3.
// ══════════════════════════════════════════════════════════════════════════
(function () {

const CH = 'g9s-c3-language';

// ── rearrangement_of_atoms ───────────────────────────────────────────────
STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v001', chapterId: CH, subsection: 'rearrangement_of_atoms', difficulty: 1,
  question: 'Which statement best describes what happens to atoms during a chemical reaction?',
  options: [
    'Atoms are rearranged to form new substances but are neither created nor destroyed',
    'Atoms are created from energy when two substances react',
    'Atoms are destroyed and replaced by energy during the reaction',
    'Atoms change their identity to become different elements during the reaction'],
  answer: 'Atoms are rearranged to form new substances but are neither created nor destroyed',
  hint: 'Think about conservation of mass.',
  explanation: 'The law of conservation of mass states that atoms are neither created nor destroyed in a chemical reaction — they are rearranged into different combinations to form the products.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v002', chapterId: CH, subsection: 'rearrangement_of_atoms', difficulty: 1,
  question: 'In the reaction 2H₂ + O₂ → 2H₂O, which statement about mass is correct?',
  options: [
    'The total mass of the products equals the total mass of the reactants',
    'The products weigh more because oxygen is heavier than hydrogen',
    'The mass increases because the reaction releases energy',
    'The mass decreases because some atoms are lost as heat'],
  answer: 'The total mass of the products equals the total mass of the reactants',
  hint: 'Atoms are just rearranged, not destroyed.',
  explanation: 'Conservation of mass: 4 H atoms and 2 O atoms appear in the reactants and the same 4 H atoms and 2 O atoms appear in the 2 H₂O molecules on the product side.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v003', chapterId: CH, subsection: 'rearrangement_of_atoms', difficulty: 2,
  question: 'A student burns 12 g of carbon completely in oxygen and collects the gas produced. What mass of carbon dioxide is formed? (Relative atomic masses: C = 12, O = 16)',
  options: ['44 g', '12 g', '32 g', '56 g'],
  answer: '44 g',
  hint: 'C + O₂ → CO₂. One mole of C gives one mole of CO₂.',
  explanation: 'C + O₂ → CO₂. 12 g of C is 1 mole; 1 mole of CO₂ = 12 + 2(16) = 44 g. By conservation of mass, 12 g C + 32 g O₂ → 44 g CO₂.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v004', chapterId: CH, subsection: 'rearrangement_of_atoms', difficulty: 2,
  question: 'Why does a piece of iron that rusts appear to gain mass?',
  options: [
    'It combines with oxygen from the air, and the oxygen adds to the mass of the iron',
    'Rusting releases energy that is converted to mass',
    'Water from the air replaces the iron atoms and adds extra mass',
    'The rust is more tightly packed than iron so the density increases the apparent mass'],
  answer: 'It combines with oxygen from the air, and the oxygen adds to the mass of the iron',
  hint: 'Rusting is a chemical reaction — where does the extra element come from?',
  explanation: 'Rusting: 4Fe + 3O₂ + 2H₂O → iron oxide (rust). The oxygen and water from the air become part of the product, adding their mass to the iron, consistent with conservation of mass.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v005', chapterId: CH, subsection: 'rearrangement_of_atoms', difficulty: 2,
  question: 'Magnesium burns in oxygen: 2Mg + O₂ → 2MgO. A student starts with 24 g of Mg and burns it completely. How much oxygen is used? (Mg = 24, O = 16)',
  options: ['16 g', '24 g', '32 g', '8 g'],
  answer: '16 g',
  hint: '2 moles Mg react with 1 mole O₂.',
  explanation: '24 g of Mg = 1 mole Mg (but the equation shows 2 mol Mg per 1 mol O₂, so 1 mol Mg reacts with 0.5 mol O₂ = 0.5 × 32 = 16 g of O₂).'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v006', chapterId: CH, subsection: 'rearrangement_of_atoms', difficulty: 3,
  question: 'In a closed container, 4 g of hydrogen and 32 g of oxygen react to form water. What is the total mass inside the container after the reaction?',
  options: ['36 g', '32 g', '4 g', '40 g'],
  answer: '36 g',
  hint: 'No atoms enter or leave a closed container.',
  explanation: 'Conservation of mass in a closed system: total mass before = 4 + 32 = 36 g; total mass after = 36 g (all converted to water). No mass is lost.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v007', chapterId: CH, subsection: 'rearrangement_of_atoms', difficulty: 3,
  question: 'When wood burns in air it seems to lose mass. What is the correct explanation?',
  options: [
    'Gaseous products (CO₂ and H₂O vapour) escape into the air; the mass of solid ash left is less than wood plus oxygen consumed',
    'Atoms in the wood are destroyed by the energy of combustion',
    'The carbon in the wood is converted to energy, reducing the mass',
    'Mass is lost as heat energy radiates from the fire'],
  answer: 'Gaseous products (CO₂ and H₂O vapour) escape into the air; the mass of solid ash left is less than wood plus oxygen consumed',
  hint: 'The system is open — gases escape.',
  explanation: 'In an open system, CO₂ and water vapour escape; weighed correctly (closed system), the total mass of products equals wood mass plus oxygen consumed. The apparent loss is because the gaseous products are not collected.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v008', chapterId: CH, subsection: 'rearrangement_of_atoms', difficulty: 2,
  question: 'How many atoms are present in total in one molecule of glucose, C₆H₁₂O₆?',
  options: ['24', '6', '12', '18'],
  answer: '24',
  hint: 'Add up all the subscript numbers.',
  explanation: '6 carbon + 12 hydrogen + 6 oxygen = 24 atoms in one molecule of glucose.'
}));

// ── formulae_of_compounds ────────────────────────────────────────────────
STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v009', chapterId: CH, subsection: 'formulae_of_compounds', difficulty: 1,
  question: 'What is the chemical formula of water?',
  options: ['H₂O', 'HO', 'H₂O₂', 'OH'],
  answer: 'H₂O',
  hint: 'Two hydrogen atoms and one oxygen atom.',
  explanation: 'Water contains 2 hydrogen atoms and 1 oxygen atom per molecule: H₂O.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v010', chapterId: CH, subsection: 'formulae_of_compounds', difficulty: 1,
  question: 'Calcium has valency 2 and chlorine has valency 1. What is the formula of calcium chloride?',
  options: ['CaCl₂', 'CaCl', 'Ca₂Cl', 'CaCl₃'],
  answer: 'CaCl₂',
  hint: 'Cross the valencies to get the subscripts.',
  explanation: 'Ca²⁺ requires two Cl⁻ ions to balance the charges: CaCl₂.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v011', chapterId: CH, subsection: 'formulae_of_compounds', difficulty: 2,
  question: 'Aluminium has valency 3 and oxygen has valency 2. What is the formula of aluminium oxide?',
  options: ['Al₂O₃', 'AlO', 'Al₃O₂', 'AlO₃'],
  answer: 'Al₂O₃',
  hint: 'Cross-multiply the valencies and simplify if needed.',
  explanation: 'Al has valency 3 and O has valency 2: crossing gives Al₂O₃ (2 × 3 = 3 × 2 = 6 positive and negative charges balanced).'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v012', chapterId: CH, subsection: 'formulae_of_compounds', difficulty: 2,
  question: 'Which formula correctly represents iron(III) sulfate? (Fe³⁺, SO₄²⁻)',
  options: ['Fe₂(SO₄)₃', 'FeSO₄', 'Fe₃(SO₄)₂', 'Fe₂SO₄'],
  answer: 'Fe₂(SO₄)₃',
  hint: 'Total positive charge must equal total negative charge.',
  explanation: '2 × Fe³⁺ = +6; 3 × SO₄²⁻ = −6. Balanced: Fe₂(SO₄)₃.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v013', chapterId: CH, subsection: 'formulae_of_compounds', difficulty: 2,
  question: 'What does the small number 2 represent in the formula H₂SO₄?',
  options: ['Two hydrogen atoms in one molecule of sulfuric acid', 'Two molecules of sulfuric acid', 'The valency of sulfur', 'Two atoms of sulfur'],
  answer: 'Two hydrogen atoms in one molecule of sulfuric acid',
  hint: 'A subscript after a symbol refers to that element only.',
  explanation: 'In H₂SO₄, the subscript 2 after H means there are 2 hydrogen atoms in each molecule; S appears once (1 atom) and O appears 4 times.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v014', chapterId: CH, subsection: 'formulae_of_compounds', difficulty: 3,
  question: 'How many atoms in total are in the formula unit Ca₃(PO₄)₂?',
  options: ['13', '9', '7', '11'],
  answer: '13',
  hint: 'Multiply the subscript outside the bracket by each element inside.',
  explanation: 'Ca₃ = 3 Ca atoms; (PO₄)₂ = 2P + 8O = 10 atoms; total = 3 + 2 + 8 = 13 atoms.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v015', chapterId: CH, subsection: 'formulae_of_compounds', difficulty: 2,
  question: 'What is the chemical formula of sodium carbonate?',
  options: ['Na₂CO₃', 'NaCO₃', 'Na₂CO₄', 'NaCO'],
  answer: 'Na₂CO₃',
  hint: 'Na⁺ has valency 1; CO₃²⁻ has valency 2.',
  explanation: 'Na⁺ (valency 1) and CO₃²⁻ (valency 2): two Na⁺ are needed to balance one CO₃²⁻, giving Na₂CO₃.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v016', chapterId: CH, subsection: 'formulae_of_compounds', difficulty: 3,
  question: 'A compound has the empirical formula CH₂. Its relative molecular mass is 56. What is its molecular formula? (C = 12, H = 1)',
  options: ['C₄H₈', 'CH₂', 'C₂H₄', 'C₃H₆'],
  answer: 'C₄H₈',
  hint: 'Find the mass of the empirical unit, then divide the Mr by it.',
  explanation: 'Mass of CH₂ = 12 + 2 = 14. 56 ÷ 14 = 4, so molecular formula = (CH₂)₄ = C₄H₈.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v017', chapterId: CH, subsection: 'formulae_of_compounds', difficulty: 1,
  question: 'The formula MgSO₄ represents magnesium sulfate. How many elements does this compound contain?',
  options: ['3', '1', '2', '4'],
  answer: '3',
  hint: 'Count the number of different chemical symbols.',
  explanation: 'MgSO₄ contains Mg (magnesium), S (sulfur) and O (oxygen) — 3 different elements.'
}));

// ── word_equations ───────────────────────────────────────────────────────
STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v018', chapterId: CH, subsection: 'word_equations', difficulty: 1,
  question: 'Which of these is the correct word equation for the burning of methane?',
  options: [
    'Methane + oxygen → carbon dioxide + water',
    'Methane + nitrogen → carbon dioxide + water',
    'Methane + oxygen → carbon monoxide only',
    'Methane → carbon + hydrogen + oxygen'],
  answer: 'Methane + oxygen → carbon dioxide + water',
  hint: 'Complete combustion of a hydrocarbon in excess oxygen.',
  explanation: 'Complete combustion: CH₄ + 2O₂ → CO₂ + 2H₂O; the word equation names the reactants and products.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v019', chapterId: CH, subsection: 'word_equations', difficulty: 1,
  question: 'What is the word equation for the neutralisation of sodium hydroxide by hydrochloric acid?',
  options: [
    'Sodium hydroxide + hydrochloric acid → sodium chloride + water',
    'Sodium + chlorine → sodium chloride',
    'Hydrochloric acid + water → sodium hydroxide + chlorine',
    'Sodium hydroxide → sodium + hydroxide + water'],
  answer: 'Sodium hydroxide + hydrochloric acid → sodium chloride + water',
  hint: 'Acid + alkali → salt + water.',
  explanation: 'The general rule for neutralisation: acid + base → salt + water. NaOH + HCl → NaCl + H₂O.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v020', chapterId: CH, subsection: 'word_equations', difficulty: 2,
  question: 'Write the word equation for the reaction between zinc and sulfuric acid.',
  options: [
    'Zinc + sulfuric acid → zinc sulfate + hydrogen',
    'Zinc + sulfuric acid → zinc oxide + water',
    'Zinc + sulfuric acid → zinc chloride + sulfur',
    'Zinc + sulfuric acid → zinc hydroxide + sulfur dioxide'],
  answer: 'Zinc + sulfuric acid → zinc sulfate + hydrogen',
  hint: 'Metal + acid → salt + hydrogen gas.',
  explanation: 'Zn + H₂SO₄ → ZnSO₄ + H₂. The salt is zinc sulfate (metal + sulfate from H₂SO₄) and hydrogen gas is released.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v021', chapterId: CH, subsection: 'word_equations', difficulty: 2,
  question: 'What are the products when calcium carbonate reacts with hydrochloric acid?',
  options: [
    'Calcium chloride, carbon dioxide, and water',
    'Calcium chloride and hydrogen',
    'Calcium hydroxide and carbon dioxide',
    'Calcium oxide, chlorine, and water'],
  answer: 'Calcium chloride, carbon dioxide, and water',
  hint: 'Metal carbonate + acid → salt + water + carbon dioxide.',
  explanation: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. The carbonate ion reacts with acid to give CO₂ as well as the salt and water.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v022', chapterId: CH, subsection: 'word_equations', difficulty: 2,
  question: 'The thermal decomposition of copper carbonate gives two products. What are they?',
  options: [
    'Copper oxide and carbon dioxide',
    'Copper and oxygen and carbon dioxide',
    'Copper hydroxide and carbon monoxide',
    'Copper and carbonic acid'],
  answer: 'Copper oxide and carbon dioxide',
  hint: 'Decomposition of a metal carbonate on heating.',
  explanation: 'CuCO₃ → CuO + CO₂. Metal carbonates decompose on heating to give the metal oxide and carbon dioxide.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v023', chapterId: CH, subsection: 'word_equations', difficulty: 3,
  question: 'Iron reacts with steam to form iron oxide (Fe₃O₄) and hydrogen. Write the word equation.',
  options: [
    'Iron + steam → iron(II,III) oxide + hydrogen',
    'Iron + water → iron hydroxide + oxygen',
    'Iron + steam → iron chloride + hydrogen',
    'Iron + steam → iron + water + oxygen'],
  answer: 'Iron + steam → iron(II,III) oxide + hydrogen',
  hint: 'Iron reacts with steam but not cold water.',
  explanation: '3Fe + 4H₂O → Fe₃O₄ + 4H₂. The product iron(II,III) oxide (magnetite) is the specific oxide formed with steam.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v024', chapterId: CH, subsection: 'word_equations', difficulty: 2,
  question: 'What does the symbol "(g)" mean in a chemical equation?',
  options: ['The substance is in the gaseous state', 'The substance is dissolved in water (aqueous)', 'The substance is a solid', 'The substance is a liquid'],
  answer: 'The substance is in the gaseous state',
  hint: 'State symbols: (s) solid, (l) liquid, (g) gas, (aq) aqueous.',
  explanation: 'State symbols indicate the physical state: (s) = solid, (l) = liquid, (g) = gas, (aq) = dissolved in water (aqueous solution).'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v025', chapterId: CH, subsection: 'word_equations', difficulty: 3,
  question: 'Which word equation describes the reaction used to make ammonia industrially?',
  options: [
    'Nitrogen + hydrogen → ammonia',
    'Nitrogen + oxygen → ammonia',
    'Nitrogen + water → ammonia + oxygen',
    'Nitrogen oxide + hydrogen → ammonia + water'],
  answer: 'Nitrogen + hydrogen → ammonia',
  hint: 'The Haber process uses atmospheric nitrogen and hydrogen from natural gas.',
  explanation: 'N₂ + 3H₂ ⇌ 2NH₃. The Haber process combines nitrogen from the air and hydrogen from natural gas over an iron catalyst under high pressure and temperature.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v026', chapterId: CH, subsection: 'word_equations', difficulty: 2,
  question: 'Sodium reacts vigorously with water. What are the products?',
  options: [
    'Sodium hydroxide and hydrogen',
    'Sodium oxide and hydrogen',
    'Sodium hydroxide and oxygen',
    'Sodium chloride and hydrogen'],
  answer: 'Sodium hydroxide and hydrogen',
  hint: 'Alkali metal + water → metal hydroxide + hydrogen gas.',
  explanation: '2Na + 2H₂O → 2NaOH + H₂. Sodium reacts with water to give sodium hydroxide (an alkali) and hydrogen gas, which often ignites due to the heat produced.'
}));

// ── balancing_equations ───────────────────────────────────────────────────
STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v027', chapterId: CH, subsection: 'balancing_equations', difficulty: 1,
  question: 'Which of these equations is correctly balanced?',
  options: [
    'Mg + 2HCl → MgCl₂ + H₂',
    'Mg + HCl → MgCl + H₂',
    '2Mg + HCl → MgCl₂ + H',
    'Mg + HCl₂ → MgCl₂ + H'],
  answer: 'Mg + 2HCl → MgCl₂ + H₂',
  hint: 'Count Mg, H and Cl atoms on both sides.',
  explanation: 'Left: 1 Mg, 2 H, 2 Cl. Right: 1 Mg, 2 Cl (in MgCl₂), 2 H (in H₂). Balanced.'
}));

STATIC_QUESTIONS.push(makeNum({
  id: 'g9s-c3-v028', chapterId: CH, subsection: 'balancing_equations', difficulty: 2,
  question: 'Balance the equation: _Fe + _O₂ → _Fe₂O₃. What coefficient goes in front of Fe?',
  answer: '4',
  acceptableAnswers: ['4'],
  hint: 'Start with Fe₂O₃ and balance Fe, then O.',
  explanation: '4Fe + 3O₂ → 2Fe₂O₃. Four Fe atoms on each side (2 × 2 = 4); six O atoms on each side (3 × 2 = 6). Coefficient in front of Fe is 4.'
}));

STATIC_QUESTIONS.push(makeNum({
  id: 'g9s-c3-v029', chapterId: CH, subsection: 'balancing_equations', difficulty: 2,
  question: 'Balance: _H₂ + _O₂ → _H₂O. What is the coefficient in front of H₂O?',
  answer: '2',
  acceptableAnswers: ['2'],
  hint: 'Start by balancing oxygen: you need an even number of O atoms on the right.',
  explanation: '2H₂ + O₂ → 2H₂O. Two water molecules contain 4 H and 2 O, matching 2 H₂ and 1 O₂ on the left.'
}));

STATIC_QUESTIONS.push(makeNum({
  id: 'g9s-c3-v030', chapterId: CH, subsection: 'balancing_equations', difficulty: 2,
  question: 'Balance: _Ca + _H₂O → _Ca(OH)₂ + _H₂. What is the coefficient in front of H₂O?',
  answer: '2',
  acceptableAnswers: ['2'],
  hint: 'How many OH groups are needed for Ca(OH)₂?',
  explanation: 'Ca + 2H₂O → Ca(OH)₂ + H₂. Ca(OH)₂ needs 2 OH, so 2 H₂O are required; this releases 1 H₂.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v031', chapterId: CH, subsection: 'balancing_equations', difficulty: 2,
  question: 'What does a large number placed in FRONT of a formula in a balanced equation represent?',
  options: [
    'The number of formula units (molecules or moles) of that substance',
    'The number of atoms in one molecule of the substance',
    'The valency of the substance',
    'The number of electrons transferred in the reaction'],
  answer: 'The number of formula units (molecules or moles) of that substance',
  hint: 'In 3H₂O, the 3 is in front, not a subscript.',
  explanation: 'A large number (coefficient) in front of a formula multiplies the entire formula unit; it is the number of molecules (or moles) of that substance involved in the reaction, not a change to the formula itself.'
}));

STATIC_QUESTIONS.push(makeNum({
  id: 'g9s-c3-v032', chapterId: CH, subsection: 'balancing_equations', difficulty: 3,
  question: 'Balance: _C₃H₈ + _O₂ → _CO₂ + _H₂O. What is the coefficient in front of O₂?',
  answer: '5',
  acceptableAnswers: ['5'],
  hint: 'Balance C and H first, then count the O atoms needed.',
  explanation: 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. 3 C → 3CO₂; 8 H → 4H₂O; O needed = 6 + 4 = 10 O atoms = 5 O₂.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v033', chapterId: CH, subsection: 'balancing_equations', difficulty: 3,
  question: 'Which balanced equation correctly represents the combustion of ethanol, C₂H₅OH?',
  options: [
    'C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O',
    'C₂H₅OH + O₂ → 2CO₂ + H₂O',
    'C₂H₅OH + 2O₂ → CO₂ + 3H₂O',
    '2C₂H₅OH + 3O₂ → 4CO + 6H₂O'],
  answer: 'C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O',
  hint: 'Count C, H and O on both sides.',
  explanation: 'Left: 2 C, 6 H, 1 O (in ethanol) + 6 O (in 3O₂) = 7 O total. Right: 2 CO₂ (4 O) + 3 H₂O (3 O) = 7 O, 2 C, 6 H. Balanced.'
}));

STATIC_QUESTIONS.push(makeNum({
  id: 'g9s-c3-v034', chapterId: CH, subsection: 'balancing_equations', difficulty: 3,
  question: 'Balance: _Al + _HCl → _AlCl₃ + _H₂. What is the smallest whole-number coefficient for Al?',
  answer: '2',
  acceptableAnswers: ['2'],
  hint: 'Al needs 3 Cl, but H₂ has 2 H — find the LCM.',
  explanation: '2Al + 6HCl → 2AlCl₃ + 3H₂. LCM of 2 and 3 for H and Cl: 6 HCl provides 6 Cl (for 2 AlCl₃) and 6 H (for 3 H₂); 2 Al balances 2 Al on the right.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-c3-v035', chapterId: CH, subsection: 'balancing_equations', difficulty: 3,
  question: 'A student writes: 2H₂ + 2O₂ → 2H₂O. Why is this equation incorrect even though atoms appear balanced?',
  options: [
    'The coefficients are not in the simplest whole-number ratio; the correct equation is 2H₂ + O₂ → 2H₂O',
    'Hydrogen and oxygen cannot react at room temperature so the equation is physically wrong',
    'The arrow should point both ways because the reaction is reversible',
    'The product should be H₂O₂ not H₂O because two oxygen atoms react'],
  answer: 'The coefficients are not in the simplest whole-number ratio; the correct equation is 2H₂ + O₂ → 2H₂O',
  hint: 'A balanced equation should use the simplest whole-number ratios.',
  explanation: '2H₂ + 2O₂ → 2H₂O has all coefficients divisible by 2; dividing through gives 2H₂ + O₂ → 2H₂O, the conventional balanced equation. An equation with non-simplest ratios is technically not wrong for atom count but is not the standard form.'
}));

})();
