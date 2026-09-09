'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Chemistry — question FAMILIES
//  11 families · 47 items · IDs g9s-cfam-001-a … g9s-cfam-011-d
//
//  The id minus its -<variant> suffix IS the family id. No `family:` field
//  exists on any factory, and an unknown field is dropped from the built
//  bundle, so the id is the only place a family can be recorded.
//
//  Seeded by docs/nce-difficulty-audit/evidence.md:
//    g9s-inq-c100 (control of variables is the point, not the biggest number)
//    g9s-inq-c042 (evaluate competing evidence, not obviously silly options)
//    g9s-c5-v010  (insoluble bases DO prepare salts — family 001 teaches the
//                  three routes properly; the flawed item is left untouched
//                  and recorded in the ledger)
// ══════════════════════════════════════════════════════════════════════════
(function () {

const C1 = 'g9s-c1-atmosphere', C2 = 'g9s-c2-mixtures', C3 = 'g9s-c3-language',
      C4 = 'g9s-c4-metals', C5 = 'g9s-c5-salts', INQ = 'g9s-inquiry', STS = 'g9s-sts';

const push = o => STATIC_QUESTIONS.push(
  o.kind === 'num' ? makeNum(o) : o.kind === 'text' ? makeText(o) : makeMCQ(o));

// ── Family 001 · Preparing a pure dry salt: which route, and why ──────────
push({ id: 'g9s-cfam-001-a', chapterId: C5, subsection: 'neutralisation', difficulty: 3,
  question: 'A pupil has insoluble copper(II) hydroxide and dilute sulfuric acid, and wants a pure dry sample of copper(II) sulfate. What should the first stage be?',
  options: ['Add copper(II) hydroxide to the warm acid until no more dissolves',
            'Titrate the acid against copper(II) hydroxide using an indicator',
            'Add sodium hydroxide to the acid until the mixture turns neutral',
            'Add copper metal to the warm acid until no more of it dissolves'],
  answer: 'Add copper(II) hydroxide to the warm acid until no more dissolves',
  hint: 'A solid that will not dissolve can be added in excess and taken out again.',
  explanation: 'Cu(OH)₂ + H₂SO₄ → CuSO₄ + 2H₂O. The misconception is that “insoluble” rules a base out. It is the opposite: only a solid excess can be filtered off, so an insoluble base is the easiest to use. Add it until no more dissolves (all the acid is then used up), filter off the leftover solid, then crystallise the blue filtrate. Copper metal is below hydrogen, so it does not react with dilute sulfuric acid at all.' });

push({ id: 'g9s-cfam-001-b', chapterId: C5, subsection: 'neutralisation', difficulty: 3,
  question: 'Each salt below is made from an acid and a base. For which one must a <b>titration</b> be used, because the base cannot be filtered off?',
  options: ['Potassium nitrate', 'Copper(II) sulfate', 'Magnesium sulfate', 'Iron(III) chloride'],
  answer: 'Potassium nitrate',
  hint: 'Ask whether the base you would start from dissolves.',
  explanation: 'Potassium hydroxide is soluble, so any excess stays dissolved and cannot be filtered out; the acid and alkali must be measured against each other by titration. Copper(II) oxide, magnesium oxide and iron(III) hydroxide are all insoluble, so each can simply be added in excess and the leftover solid filtered off. The misconception is that the choice depends on the salt; it depends on whether the <i>base</i> dissolves.' });

push({ id: 'g9s-cfam-001-c', chapterId: C5, subsection: 'neutralisation', difficulty: 3, kind: 'text',
  question: 'In a salt preparation both the acid and the base are soluble, so no excess solid can be filtered off. Name the method that must be used instead.',
  answer: 'Titration',
  alsoAccept: ['titration method', 'the titration method', 'acid-alkali titration',
               'acid-base titration', 'titrate', 'by titration'],
  hint: 'The two solutions are measured against each other with a burette.',
  explanation: 'Titration finds exactly what volume of acid neutralises a measured volume of alkali. The mixture is then made again with those volumes and <i>no indicator</i>, and crystallised. Pupils often reach for “add excess and filter” every time, but that only works when the excess is a solid.' });

push({ id: 'g9s-cfam-001-d', chapterId: C5, subsection: 'neutralisation', difficulty: 4,
  question: 'A pupil filters off the excess copper(II) oxide and heats the blue filtrate over a flame until the basin is completely dry. The solid left behind is white. What went wrong?',
  options: ['Heating to dryness drove the water out of the crystals',
            'Filtering took out the copper and left the sulfate behind',
            'The excess copper(II) oxide neutralised the salt itself',
            'Too much sulfuric acid was used, so no salt could form'],
  answer: 'Heating to dryness drove the water out of the crystals',
  hint: 'Blue copper(II) sulfate crystals contain water; white powder does not.',
  explanation: 'CuSO₄·5H₂O is blue because water is built into the crystals. Heating to dryness drives that water off and leaves white anhydrous CuSO₄. The misconception is that “dry” means “heat until nothing is left”. Evaporate only until crystals start to appear at the edge, then leave the dish to cool so the crystals grow, and pat them dry between filter papers.' });

push({ id: 'g9s-cfam-001-e', chapterId: C5, subsection: 'neutralisation', difficulty: 4,
  question: 'Two pupils prepare zinc sulfate from zinc and dilute sulfuric acid. Ali adds zinc until no more of it dissolves. Bina adds acid until all her zinc has gone. Whose sample can be pure?',
  options: ['Ali, because the leftover zinc can be filtered off',
            'Bina, because using up the zinc leaves nothing to filter',
            'Both, because zinc sulfate crystallises out first anyway',
            'Neither, because zinc and sulfuric acid make no salt'],
  answer: 'Ali, because the leftover zinc can be filtered off',
  hint: 'Whichever reactant is left over must be one you can remove.',
  explanation: 'Zn + H₂SO₄ → ZnSO₄ + H₂. Ali ends with leftover <i>solid</i> zinc, which filters out. Bina ends with leftover <i>acid</i>, which stays in the solution and is left behind in the crystals when she evaporates. The misconception is that using a reactant up completely is always the tidier plan; what matters is that the excess is removable.' });

// ── Family 002 · Making an insoluble salt by precipitation ────────────────
push({ id: 'g9s-cfam-002-a', chapterId: C5, subsection: 'soluble_insoluble', difficulty: 2,
  question: 'All nitrates and all potassium salts are soluble. Which pair of solutions can be mixed to precipitate lead(II) iodide?',
  options: ['Lead(II) nitrate and potassium iodide',
            'Lead(II) sulfate and potassium iodide',
            'Lead(II) carbonate and silver iodide',
            'Lead(II) chloride and silver nitrate'],
  answer: 'Lead(II) nitrate and potassium iodide',
  hint: 'Both starting substances have to be in solution to begin with.',
  explanation: 'Pb(NO₃)₂ + 2KI → PbI₂ + 2KNO₃. The yellow PbI₂ is insoluble and drops out; the KNO₃ stays dissolved. The misconception is picking any two substances that contain the right elements: lead(II) sulfate, lead(II) carbonate and lead(II) chloride are all insoluble, so they cannot be poured in as solutions at all.' });

push({ id: 'g9s-cfam-002-b', chapterId: C5, subsection: 'soluble_insoluble', difficulty: 3, kind: 'text',
  question: 'Barium chloride solution is added to sodium sulfate solution and a white solid appears. Name the precipitate.',
  answer: 'Barium sulfate',
  alsoAccept: ['barium sulphate', 'baso4', 'barium sulfate (BaSO4)', 'barium sulphate (BaSO4)'],
  hint: 'Swap the partners over, then ask which of the two new salts is insoluble.',
  explanation: 'BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl. Swapping partners gives barium sulfate and sodium chloride; every sodium salt is soluble, so the solid can only be the barium sulfate. Pupils often name the salt that stayed dissolved, because it is the one whose name they met first.' });

push({ id: 'g9s-cfam-002-c', chapterId: C5, subsection: 'soluble_insoluble', difficulty: 4,
  question: 'The precipitate is filtered off. Why must it be washed with distilled water before it is dried?',
  options: ['Soluble salt from the mixture is left on the crystals and would dry with them',
            'Washing dissolves the precipitate and reforms it in a purer crystal shape',
            'Distilled water reacts with the precipitate and removes a coloured impurity',
            'The filter paper leaves fibres that only distilled water is able to lift off'],
  answer: 'Soluble salt from the mixture is left on the crystals and would dry with them',
  hint: 'Think about what else was in the liquid that drained through.',
  explanation: 'The liquid draining through carries the other product — here sodium chloride — and a film of it clings to the solid. Washing rinses that film away; drying without washing would leave it mixed into the sample. The misconception is that filtering by itself gives a pure solid. It separates solid from liquid, not solid from dissolved solid.' });

push({ id: 'g9s-cfam-002-d', chapterId: C5, subsection: 'soluble_insoluble', difficulty: 4,
  question: 'A pupil says: “Any salt of barium can be made by mixing two solutions and filtering.” Is this always, sometimes or never true?',
  options: ['Sometimes — only if the barium salt itself is insoluble in water',
            'Always — every barium salt comes out as a solid when solutions mix',
            'Sometimes — only if both starting solutions are completely colourless',
            'Never — barium salts are all far too soluble to be filtered off'],
  answer: 'Sometimes — only if the barium salt itself is insoluble in water',
  hint: 'Barium sulfate is insoluble; barium chloride is not.',
  explanation: 'Precipitation only works when the salt you want will not dissolve. Barium sulfate and barium carbonate are insoluble, so both can be made this way; barium chloride and barium nitrate are soluble and would simply stay in the solution with nothing to filter. The misconception is treating one metal as always behaving the same way — solubility belongs to the whole salt, not to the metal alone.' });

// ── Family 003 · Comparing heat released: what the rise can and cannot say ─
push({ id: 'g9s-cfam-003-a', chapterId: INQ, subsection: 'interpreting_results', difficulty: 2, kind: 'num',
  question: 'A neutralisation raises the temperature of the mixture by 6.8 °C. The highest reading on the thermometer is 29.2 °C. Calculate the starting temperature, in °C.',
  answer: 22.4, acceptableAnswers: ['22.4'],
  hint: 'The rise was added to the starting temperature to reach the highest reading.',
  explanation: '29.2 − 6.8 = 22.4 °C. The rise is the difference between the two temperatures, so working backwards means subtracting it from the final reading. Pupils who have only ever been asked for the rise sometimes add instead, and get 36.0 °C — a starting temperature hotter than the finish, which cannot be right for a reaction that gives out heat.' });

push({ id: 'g9s-cfam-003-b', chapterId: INQ, subsection: 'interpreting_results', difficulty: 4,
  question: 'Equal volumes of three acids are each neutralised by the same alkali. The temperature rises are 5.2, 6.8 and 4.1 °C. A pupil concludes that the second acid released the most heat. What else must be true for that conclusion to hold?',
  options: ['The three mixtures had the same mass and the same kind of cup',
            'The three acids were each poured from the same measuring cylinder',
            'The three mixtures were each stirred with the same glass rod',
            'The three thermometers all read the same value in cold water'],
  answer: 'The three mixtures had the same mass and the same kind of cup',
  hint: 'A temperature rise depends on how much stuff is being warmed, and on how much heat escapes.',
  explanation: 'A temperature rise only measures heat released if the same mass of liquid is being warmed and the same amount of heat leaks away. A smaller mass gets hotter on less heat, and a bare beaker loses more heat than a lidded polystyrene cup. The misconception is reading the biggest rise straight off as the most heat. That is a comparison, not a conclusion, until the mass and the insulation are known to match.' });

push({ id: 'g9s-cfam-003-c', chapterId: INQ, subsection: 'interpreting_results', difficulty: 4,
  question: 'Aisha and Ben each neutralise 25 cm³ of hydrochloric acid with excess sodium hydroxide, in identical cups. Aisha records a rise of 6.4 °C and Ben a rise of 3.2 °C. Both worked carefully. What best explains the difference?',
  options: ['Ben’s acid was half as concentrated, so half as much reacted',
            'Ben’s room was warmer, so his mixture started at a higher point',
            'Ben stirred his mixture, so the heat spread out through it faster',
            'Ben added his alkali more slowly, so less heat built up at once'],
  answer: 'Ben’s acid was half as concentrated, so half as much reacted',
  hint: 'Equal volumes are not equal amounts unless the concentrations match.',
  explanation: 'The heat given out depends on how much acid actually reacts. Half the concentration in the same volume means half as much acid, so half the heat warms the same mass of liquid and the rise halves: 6.4 ÷ 2 = 3.2 °C. The misconception is that measuring the same volume makes an experiment fair. Starting temperature, stirring and how slowly the alkali is added change how the reading behaves, but none of them changes the total heat released.' });

push({ id: 'g9s-cfam-003-d', chapterId: INQ, subsection: 'interpreting_results', difficulty: 3, kind: 'text',
  question: 'Two acids are compared by the temperature rise when each is neutralised. The pupil has already used the same volume of each acid. Name the other property of the acids that must be the same.',
  answer: 'Concentration',
  alsoAccept: ['the concentration', 'same concentration', 'concentration of the acid',
               'their concentration', 'the same concentration'],
  hint: 'Two bottles of acid can hold very different amounts of acid in the same volume.',
  explanation: 'Volume alone does not fix how much acid there is; concentration does. If one acid is twice as concentrated, twice as much reacts and more heat is released, whatever the acids themselves are like. Pupils commonly list volume as the only thing to keep the same, because it is the quantity they physically measured out.' });

push({ id: 'g9s-cfam-003-e', chapterId: INQ, subsection: 'interpreting_results', difficulty: 3, kind: 'num',
  question: 'Acid P: the mixture goes from 21.5 °C to 27.9 °C. Acid Q: the mixture goes from 23.0 °C to 29.4 °C. Calculate the difference between the two temperature rises, in °C.',
  answer: 0, acceptableAnswers: ['0', '0.0'],
  hint: 'Work out each rise first, then compare the rises — not the final readings.',
  explanation: 'P rises 27.9 − 21.5 = 6.4 °C and Q rises 29.4 − 23.0 = 6.4 °C, so the difference is 0 °C. The misconception is comparing the highest readings: Q finishes at 29.4 °C and looks hotter, but it also started 1.5 °C warmer. Only the rise tells you about the heat released.' });

// ── Family 004 · Placing an unknown metal in the reactivity series ─────────
push({ id: 'g9s-cfam-004-a', chapterId: C4, subsection: 'predicting_reactions', difficulty: 2,
  question: 'Metal X does not react with cold water, but it does react with steam, and it fizzes steadily in dilute hydrochloric acid. Where does X belong?',
  options: ['Below magnesium but above copper',
            'Above sodium but below potassium',
            'Below copper but above silver',
            'Above calcium but below potassium'],
  answer: 'Below magnesium but above copper',
  hint: 'Both results matter: what it does react with, and what it does not.',
  explanation: 'Reacting with steam but not cold water places X with zinc and iron. Fizzing in dilute acid puts it above hydrogen, so above copper. The misconception is using only one result: a metal above calcium would have reacted with cold water, and one below copper would not have fizzed in acid at all.' });

push({ id: 'g9s-cfam-004-b', chapterId: C4, subsection: 'predicting_reactions', difficulty: 4,
  question: 'Metal Y displaces copper from copper(II) sulfate solution, but it does not displace zinc from zinc sulfate solution. Where does Y belong?',
  options: ['Below zinc but above copper',
            'Above zinc but below magnesium',
            'Below copper but above silver',
            'Above magnesium but below calcium'],
  answer: 'Below zinc but above copper',
  hint: 'A metal can only push out a metal that is less reactive than itself.',
  explanation: 'Displacing copper means Y is more reactive than copper. Failing to displace zinc means Y is less reactive than zinc. Both facts together squeeze Y between them — iron sits there. The misconception is treating the failed test as no information: a reaction that does <i>not</i> happen fixes the upper limit just as firmly as one that does fixes the lower.' });

push({ id: 'g9s-cfam-004-c', chapterId: C4, subsection: 'predicting_reactions', difficulty: 4,
  question: 'Iron nails are placed in separate solutions of magnesium sulfate, copper(II) sulfate and zinc sulfate. In how many will a coating appear on the nail, and why?',
  options: ['One, because iron is above copper alone',
            'Three, because iron reacts with every solution',
            'Two, because iron is above copper and zinc',
            'None, because iron is below all three metals'],
  answer: 'One, because iron is above copper alone',
  hint: 'Check the nail against each dissolved metal in turn.',
  explanation: 'The order is magnesium &gt; zinc &gt; iron &gt; copper. Iron is below magnesium and below zinc, so nothing happens in those two; it is above copper, so a red-brown coating of copper forms in the copper(II) sulfate only. The misconception is that a reactive-looking metal reacts with everything — displacement is decided pair by pair.' });

push({ id: 'g9s-cfam-004-d', chapterId: C4, subsection: 'predicting_reactions', difficulty: 3, kind: 'text',
  question: 'Zinc fizzes in dilute hydrochloric acid but copper gives no reaction at all. Name the element that copper must be below in the reactivity series for this to be so.',
  answer: 'Hydrogen',
  alsoAccept: ['h', 'hydrogen (H)', 'the hydrogen', 'h2', 'hydrogen gas'],
  hint: 'Something has to be pushed out of the acid for a gas to appear.',
  explanation: 'A metal only fizzes in dilute acid if it can displace hydrogen from that acid, so any metal that reacts must sit above hydrogen. Copper does not react, so copper is below hydrogen. Pupils often answer “zinc”, which is true but does not explain the <i>no reaction</i>: plenty of metals are below zinc and still fizz.' });

// ── Family 005 · Balancing: what may be changed, and what may not ──────────
push({ id: 'g9s-cfam-005-a', chapterId: C3, subsection: 'balancing_equations', difficulty: 2, kind: 'num',
  question: 'Balance this equation: ___ Al + 3Cl₂ → 2AlCl₃. What number goes in the blank?',
  answer: 2, acceptableAnswers: ['2'],
  hint: 'Count the aluminium atoms on the right first.',
  explanation: '2Al + 3Cl₂ → 2AlCl₃. The right-hand side holds 2 Al and 6 Cl; 3Cl₂ already supplies the 6 chlorine atoms, so 2 aluminium atoms are needed. A common slip is to write 1 because there is a single Al in the formula — the coefficient must match the atoms in the product, not the look of the reactant.' });

push({ id: 'g9s-cfam-005-b', chapterId: C3, subsection: 'balancing_equations', difficulty: 3, kind: 'num',
  question: 'Balance this equation: Fe₂O₃ + ___ CO → 2Fe + 3CO₂. What number goes in the blank?',
  answer: 3, acceptableAnswers: ['3'],
  hint: 'Every carbon atom on the right came in as CO.',
  explanation: 'Fe₂O₃ + 3CO → 2Fe + 3CO₂. There are 3 carbon atoms on the right, so 3 CO are needed; that also balances oxygen at 3 + 3 = 6 on the left against 6 on the right. Pupils often balance carbon and stop, without checking that the oxygen then works out too.' });

push({ id: 'g9s-cfam-005-c', chapterId: C3, subsection: 'balancing_equations', difficulty: 3, kind: 'num',
  question: 'In the balanced equation Fe₂O₃ + 3CO → 2Fe + 3CO₂, how many oxygen atoms are there on the left-hand side?',
  answer: 6, acceptableAnswers: ['6'],
  hint: 'Oxygen appears in two different substances on that side.',
  explanation: 'Fe₂O₃ supplies 3 oxygen atoms and 3CO supplies 3 more, giving 6 in total — matching the 6 in 3CO₂. The misconception is counting only the substance whose name contains “oxide” and answering 3. Every formula containing O has to be counted, and its coefficient multiplies it.' });

push({ id: 'g9s-cfam-005-d', chapterId: C3, subsection: 'balancing_equations', difficulty: 4,
  question: 'To balance H₂ + O₂ → H₂O a pupil changes the product to H₂O₂ and says the equation now balances. Why is this wrong?',
  options: ['H₂O₂ is a different substance; only the front numbers change',
            'H₂O₂ has too many atoms, so the arrow must be turned round instead',
            'H₂O₂ is right here, but the front numbers must be changed too',
            'H₂O₂ cannot form because oxygen is written as one atom'],
  answer: 'H₂O₂ is a different substance; only the front numbers change',
  hint: 'The formula of a substance is a fact about it, not a number you may adjust.',
  explanation: 'H₂O₂ is hydrogen peroxide, a bleach — not water. Changing a subscript changes what the substance <i>is</i>, so it balances the wrong reaction. Only the coefficients written in front may change: 2H₂ + O₂ → 2H₂O. This is the single most common balancing error, and it is easy to spot — if you had to touch a small number inside a formula, you have gone wrong.' });

push({ id: 'g9s-cfam-005-e', chapterId: C3, subsection: 'balancing_equations', difficulty: 3,
  question: 'Calcium carbonate reacts with dilute hydrochloric acid to give calcium chloride, water and carbon dioxide. Which equation is correct <i>and</i> balanced?',
  options: ['CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂',
            'CaCO₃ + HCl → CaCl₂ + H₂O + CO₂',
            'CaCO₃ + 2HCl → CaCl + H₂O + 2CO₂',
            'Ca₂CO₃ + 2HCl → CaCl₂ + H₂O + CO₂'],
  answer: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂',
  hint: 'Check the formulae first, then count the atoms.',
  explanation: 'Calcium is 2+ and chloride 1−, so the salt is CaCl₂ and the carbonate is CaCO₃. Two HCl are then needed to supply the two chlorines. Counting: Ca 1 = 1, C 1 = 1, H 2 = 2, Cl 2 = 2, O 3 = 1 + 2 = 3. The misconception is balancing an equation whose formulae are already wrong — CaCl and Ca₂CO₃ do not exist, so no coefficient can rescue them.' });

// ── Family 006 · Working out a formula from the charges on the ions ────────
push({ id: 'g9s-cfam-006-a', chapterId: C3, subsection: 'formulae_of_compounds', difficulty: 2,
  question: 'Aluminium ions are Al³⁺ and oxide ions are O²⁻. What is the formula of aluminium oxide?',
  options: ['Al₂O₃', 'AlO₂', 'Al₃O₂', 'Al₂O₂'],
  answer: 'Al₂O₃',
  hint: 'The positive charges and the negative charges must cancel exactly.',
  explanation: 'Two Al³⁺ give 6+ and three O²⁻ give 6−, which cancel, so the formula is Al₂O₃. The misconception is writing the charges down in the order they are read and getting Al₃O₂ — the number of each ion is the <i>other</i> ion’s charge, so the 3 belongs to the oxide and the 2 to the aluminium.' });

push({ id: 'g9s-cfam-006-b', chapterId: C3, subsection: 'formulae_of_compounds', difficulty: 3, kind: 'text',
  question: 'Calcium ions are Ca²⁺ and nitrate ions are NO₃⁻. Write the formula of calcium nitrate. Type it with ordinary numbers, as in H2O.',
  answer: 'Ca(NO3)2',
  alsoAccept: ['Ca(NO₃)₂', 'ca(no3)2'],
  hint: 'Two nitrate ions are needed, and a nitrate ion is a group that must be kept whole.',
  explanation: 'One Ca²⁺ needs two NO₃⁻ ions to cancel its charge. The nitrate group must stay together, so it is bracketed and the 2 goes outside: Ca(NO3)2. The misconception is writing CaNO32 or CaN2O6, which break the group up; the bracket is what shows that the whole NO₃ unit is taken twice.' });

push({ id: 'g9s-cfam-006-c', chapterId: C3, subsection: 'formulae_of_compounds', difficulty: 3,
  question: 'A metal M forms a sulfate with the formula M₂SO₄. Sulfate ions are SO₄²⁻. What is the formula of the chloride of M?',
  options: ['MCl', 'MCl₂', 'M₂Cl', 'MCl₃'],
  answer: 'MCl',
  hint: 'Work out the charge on M first, then pair it with a chloride ion.',
  explanation: 'Two M ions balance one 2− sulfate ion, so each M carries 1+. A chloride ion is Cl⁻, so one of each cancels and the formula is MCl. The misconception is carrying the subscript across from one compound to the next and writing M₂Cl — the subscript belongs to the pair of ions, not to the metal.' });

push({ id: 'g9s-cfam-006-d', chapterId: C3, subsection: 'formulae_of_compounds', difficulty: 3,
  question: 'A pupil writes MgOH for magnesium hydroxide. Magnesium ions are Mg²⁺ and hydroxide ions are OH⁻. What is the correct formula?',
  options: ['Mg(OH)₂', 'Mg₂OH', 'MgO₂H', 'Mg(OH)₃'],
  answer: 'Mg(OH)₂',
  hint: 'One 2+ ion needs enough 1− ions to cancel it.',
  explanation: 'Mg²⁺ needs two OH⁻ ions, and because hydroxide is a group of two atoms it is bracketed: Mg(OH)₂. The misconception is pairing one ion with one ion whatever the charges are, which gives MgOH and leaves the compound with a leftover 1+ charge. Writing MgO₂H is a second version of the same slip — it breaks the OH group apart.' });

// ── Family 007 · Choosing a separation technique, and its order ────────────
push({ id: 'g9s-cfam-007-a', chapterId: C2, subsection: 'choosing_a_technique', difficulty: 2, kind: 'text',
  question: 'Name the technique used to obtain pure water from seawater.',
  answer: 'Distillation',
  alsoAccept: ['simple distillation', 'distilling', 'distil', 'distill', 'by distillation'],
  hint: 'The water is boiled off and the vapour is cooled back to a liquid.',
  explanation: 'Distillation boils the water off, leaving the dissolved salt in the flask, and a condenser cools the vapour back to pure liquid water. The misconception is answering “filtration”: a filter stops undissolved bits, but dissolved salt passes straight through with the water.' });

push({ id: 'g9s-cfam-007-b', chapterId: C2, subsection: 'choosing_a_technique', difficulty: 2, kind: 'text',
  question: 'Salt solution is warmed in an evaporating basin until crystals just begin to appear, then left to cool. Name this separation technique.',
  answer: 'Crystallisation',
  alsoAccept: ['crystallization', 'crystallisation by evaporation',
               'evaporation and crystallisation', 'evaporation', 'crystallise'],
  hint: 'The dissolved solid is the part you are keeping.',
  explanation: 'Crystallisation recovers the dissolved solid: warming removes some of the water until the solution is saturated, and cooling then makes crystals grow. The misconception is confusing it with distillation, which is used when the <i>liquid</i> is the part you want to keep.' });

push({ id: 'g9s-cfam-007-c', chapterId: C2, subsection: 'choosing_a_technique', difficulty: 4,
  question: 'A pupil must recover <b>both</b> the salt and clean water from a sample of muddy salt water. Which plan does that?',
  options: ['Filter off the mud, then distil and keep both the liquid and solid',
            'Distil the whole sample, then filter the mud out of the liquid part',
            'Filter off the mud, then evaporate the water away in an open basin',
            'Let the mud settle, pour off the top and use paper chromatography'],
  answer: 'Filter off the mud, then distil and keep both the liquid and solid',
  hint: 'Nothing you want may be allowed to escape into the air.',
  explanation: 'The mud is undissolved, so filtering removes it first; distilling then collects the water as distillate and leaves the salt in the flask, so both products are kept. The misconception is that evaporating is the same as distilling — evaporating in an open basin gives the salt but lets the water escape as vapour, and the question asks for both.' });

push({ id: 'g9s-cfam-007-d', chapterId: C2, subsection: 'choosing_a_technique', difficulty: 3,
  question: 'A mixture of ethanol (boiling point 78 °C) and water is distilled. A pupil says the first liquid collected is water, because there is more water in the mixture. What is wrong with that?',
  options: ['The liquid with the lower boiling point distils over first',
            'The liquid that is present in the larger amount boils first',
            'The two liquids always come over together as one mixture',
            'The thermometer must reach 100 °C before anything comes over'],
  answer: 'The liquid with the lower boiling point distils over first',
  hint: 'Ask which liquid needs less heating before it turns to vapour.',
  explanation: 'Ethanol boils at 78 °C, below water’s 100 °C, so the ethanol vaporises and is collected first while the thermometer holds near 78 °C. The misconception is that the substance present in the greater amount comes over first; how much there is affects how long each fraction takes to collect, not the order.' });

// ── Family 008 · Rain pH near a power station: conclusion versus cause ─────
push({ id: 'g9s-cfam-008-a', chapterId: C1, subsection: 'acid_rain', difficulty: 2, kind: 'text',
  question: 'Coal contains sulfur. Name the acidic gas formed when that sulfur burns in air.',
  answer: 'Sulfur dioxide',
  alsoAccept: ['sulphur dioxide', 'so2', 'sulfur dioxide (SO2)', 'sulphur dioxide (SO2)'],
  hint: 'Its formula is SO₂.',
  explanation: 'S + O₂ → SO₂. Sulfur dioxide dissolves in rain droplets and is oxidised to sulfuric acid, which is why coal smoke causes acid rain. Pupils often answer “carbon dioxide”, which does dissolve to make rain slightly acidic but is not what makes rain near a coal fire <i>unusually</i> acidic.' });

push({ id: 'g9s-cfam-008-b', chapterId: C1, subsection: 'acid_rain', difficulty: 2,
  question: 'Rain that has dissolved only carbon dioxide from clean air has a pH of about 5.6. Which reading below is acid rain?',
  options: ['pH 4.1', 'pH 5.6', 'pH 6.4', 'pH 7.0'],
  answer: 'pH 4.1',
  hint: 'Compare each reading with the value clean rain already has.',
  explanation: 'Acid rain means rain more acidic than the natural 5.6, so only pH 4.1 counts. The misconception is calling anything below pH 7 acid rain; ordinary clean rain is already below 7 because carbon dioxide dissolves in it, and pH 6.4 is <i>less</i> acidic than normal rain.' });

push({ id: 'g9s-cfam-008-c', chapterId: C1, subsection: 'acid_rain', difficulty: 4,
  question: 'Rainwater pH near a coal-burning power station: 0.5 km downwind 4.1 · 2 km downwind 4.6 · 5 km downwind 5.2 · 5 km upwind 5.6. Which conclusion do these readings support?',
  options: ['Rain is more acidic closer to the station on the downwind side',
            'Rain is more acidic on the upwind side than on the downwind side',
            'Every sample of rain within five kilometres counts as acid rain',
            'The station gives off more sulfur dioxide during the dry season'],
  answer: 'Rain is more acidic closer to the station on the downwind side',
  hint: 'Say only what the four numbers themselves show.',
  explanation: 'Along the downwind line the pH climbs 4.1 → 4.6 → 5.2 as distance grows, and the upwind sample at the same 5 km is 5.6, the value of clean rain. So acidity falls with distance downwind. The other options go beyond the data: the upwind reading is the <i>least</i> acidic, the 5 km upwind sample is not acid rain, and nothing here was measured across seasons at all.' });

push({ id: 'g9s-cfam-008-d', chapterId: C1, subsection: 'acid_rain', difficulty: 4,
  question: 'A pupil says those four readings prove the power station causes the acid rain. What further information is most needed before that claim can be made?',
  options: ['Rain pH at the same sites before the station was built',
            'The number of people living close to each of the four sites',
            'The height of the chimney the station uses to release its gas',
            'The temperature of the rain on the day each sample was taken'],
  answer: 'Rain pH at the same sites before the station was built',
  hint: 'What would the readings have looked like with no station there at all?',
  explanation: 'A pattern in space shows the two things go together; it does not by itself show one caused the other, because some other source could sit in the same direction. Readings from before the station give the comparison that is missing. The misconception is treating a strong correlation as proof of cause — the test is whether removing the suspected cause removes the effect.' });

// ── Family 009 · Carbon dioxide and temperature: reading the record ────────
push({ id: 'g9s-cfam-009-a', chapterId: STS, subsection: 'interpreting_climate_data', difficulty: 2, kind: 'num',
  question: 'Atmospheric carbon dioxide was measured at 350 ppm in 1988 and 420 ppm in 2023. Calculate the increase, in ppm.',
  answer: 70, acceptableAnswers: ['70'],
  hint: 'Take the earlier value away from the later one.',
  explanation: '420 − 350 = 70 ppm. An increase is always the difference between the two values, not either value on its own. Pupils sometimes write 420 because it is the number the record ends on.' });

push({ id: 'g9s-cfam-009-b', chapterId: STS, subsection: 'interpreting_climate_data', difficulty: 3, kind: 'num',
  question: 'Atmospheric carbon dioxide rose from 350 ppm to 420 ppm. Calculate the percentage increase.',
  answer: 20, acceptableAnswers: ['20', '20%'],
  hint: 'A percentage increase is always compared with the value you started from.',
  explanation: '70 ÷ 350 × 100 = 20%. The misconception is dividing by the final value, 70 ÷ 420 × 100 = 16.7%, which answers a different question — what fraction of today’s level the increase makes up. Percentage increase is measured against the starting value.' });

push({ id: 'g9s-cfam-009-c', chapterId: STS, subsection: 'interpreting_climate_data', difficulty: 4,
  question: 'Over the same years the mean global temperature rose from 14.3 °C to 15.0 °C. Taken on their own, what do the two records show?',
  options: ['The two rose together, which alone is not proof of a cause',
            'The rise in the gas is proved to be the cause of the warming',
            'The rise in temperature is proved to be the cause of the gas',
            'The two are unrelated because they are measured in different units'],
  answer: 'The two rose together, which alone is not proof of a cause',
  hint: 'Two things rising over the same years could still both be driven by a third.',
  explanation: 'Both records rise together, which is a correlation. A correlation is consistent with a cause but does not establish one, because either could drive the other or something else could drive both. The misconception is reading two rising lines as proof; different units are no obstacle at all, since the comparison is of trends, not of values.' });

push({ id: 'g9s-cfam-009-d', chapterId: STS, subsection: 'interpreting_climate_data', difficulty: 4,
  question: 'Which finding would do most to strengthen the claim that the rise in carbon dioxide is causing the warming?',
  options: ['Laboratory measurements showing the gas absorbs heat radiation',
            'A survey showing that most people believe the two are connected',
            'A longer record showing the same two lines for a further decade',
            'A report from one government naming the gas as a likely cause'],
  answer: 'Laboratory measurements showing the gas absorbs heat radiation',
  hint: 'What is missing from the record is a reason why one should affect the other.',
  explanation: 'Evidence of a mechanism — carbon dioxide absorbing the heat radiation leaving the Earth — explains <i>why</i> more of the gas would warm the surface, which the record alone cannot do. More of the same correlation strengthens the pattern but adds no mechanism, and opinion or authority is not evidence about the atmosphere. The misconception is ranking evidence by how many people or how important a body states it.' });

// ── Family 010 · Choosing the right neutraliser for the job ────────────────
push({ id: 'g9s-cfam-010-a', chapterId: C5, subsection: 'neutralisation_in_daily_life', difficulty: 2,
  question: 'Which substance is used in an indigestion tablet to treat excess stomach acid?',
  options: ['Magnesium hydroxide', 'Sodium chloride', 'Sulfuric acid', 'Ammonium nitrate'],
  answer: 'Magnesium hydroxide',
  hint: 'Acid is neutralised by a base.',
  explanation: 'Magnesium hydroxide is a mild base and neutralises hydrochloric acid in the stomach: Mg(OH)₂ + 2HCl → MgCl₂ + 2H₂O. The misconception is picking sodium chloride because it is the salt people know best — a salt is the <i>product</i> of neutralisation and cannot neutralise anything itself.' });

push({ id: 'g9s-cfam-010-b', chapterId: C5, subsection: 'neutralisation_in_daily_life', difficulty: 2, kind: 'text',
  question: 'A farmer’s soil is too acidic for a good crop. Name the substance, obtained from limestone, that is spread on the field to raise its pH.',
  answer: 'Lime',
  alsoAccept: ['calcium hydroxide', 'calcium oxide', 'slaked lime', 'quicklime',
               'ca(oh)2', 'cao', 'lime (calcium hydroxide)', 'agricultural lime'],
  hint: 'Limestone is heated to make it.',
  explanation: 'Lime — calcium oxide, or calcium hydroxide once water is added — is a base, so it neutralises the acid in the soil and raises the pH towards neutral. The misconception is naming a fertiliser instead; a fertiliser feeds the crop but does nothing about the acidity.' });

push({ id: 'g9s-cfam-010-c', chapterId: C5, subsection: 'neutralisation_in_daily_life', difficulty: 4,
  question: 'Sodium hydroxide neutralises acid faster and more completely than magnesium hydroxide. Why is it still never used in an indigestion tablet?',
  options: ['It is corrosive and would damage the lining of the stomach',
            'It is a solid, so it cannot be swallowed with a drink',
            'It reacts with stomach acid to give a gas that causes pain',
            'It is not a base, so it cannot neutralise the acid at all'],
  answer: 'It is corrosive and would damage the lining of the stomach',
  hint: 'Being good at the chemistry is not the only thing that decides a use.',
  explanation: 'Sodium hydroxide is a strong, corrosive alkali; it would attack the stomach lining long before it did any good, so a mild, sparingly soluble base is chosen instead. The misconception is that the best-performing substance is always the one used — safety, cost and side effects rule choices out. Note that NaOH + HCl gives only salt and water, no gas at all.' });

push({ id: 'g9s-cfam-010-d', chapterId: C5, subsection: 'neutralisation_in_daily_life', difficulty: 4,
  question: 'A bee sting is acidic and a wasp sting is alkaline. A pupil treats both stings with the same paste of baking soda. What is the result?',
  options: ['The bee sting is eased and the wasp sting is made worse',
            'Both stings are eased because baking soda is a mild base',
            'Both stings are made worse because baking soda is acidic',
            'The wasp sting is eased and the bee sting is made worse'],
  answer: 'The bee sting is eased and the wasp sting is made worse',
  hint: 'A base only helps where there is acid to neutralise.',
  explanation: 'Baking soda (sodium hydrogencarbonate) is a base, so it neutralises the acid of a bee sting; used on the alkaline wasp sting it makes the mixture more alkaline still. The wasp sting needs something acidic, such as vinegar. The misconception is applying a rule where its condition does not hold — “baking soda soothes stings” is only true for the acidic kind.' });

// ── Family 011 · Comparing two metals in acid: making it a fair test ───────
push({ id: 'g9s-cfam-011-a', chapterId: C4, subsection: 'metals_with_acids', difficulty: 2, kind: 'text',
  question: 'State the test that shows the gas given off when a metal reacts with dilute acid is hydrogen.',
  answer: 'A lighted splint gives a squeaky pop',
  alsoAccept: ['lighted splint gives a squeaky pop', 'a lit splint gives a squeaky pop',
               'squeaky pop with a lighted splint', 'a squeaky pop with a lighted splint',
               'it burns with a squeaky pop', 'squeaky pop', 'lighted splint pops',
               'burning splint gives a squeaky pop'],
  hint: 'Hold a flame at the mouth of the tube.',
  explanation: 'Hydrogen burns explosively in a small amount, giving the squeaky pop heard when a lighted splint is held at the mouth of the tube. The misconception is offering the limewater test, which detects carbon dioxide — that gas is given off by a <i>carbonate</i> and an acid, not by a metal and an acid.' });

push({ id: 'g9s-cfam-011-b', chapterId: C4, subsection: 'metals_with_acids', difficulty: 4,
  question: 'Powdered zinc fizzes faster in dilute acid than a strip of magnesium of the same mass. A pupil concludes that zinc is the more reactive metal. Which variable was not controlled?',
  options: ['The surface area of the two metal samples',
            'The volume of the dilute acid that was used',
            'The temperature of the acid in the two tubes',
            'The concentration of the acid in the two tubes'],
  answer: 'The surface area of the two metal samples',
  hint: 'One sample was a powder and the other a single strip.',
  explanation: 'A powder exposes far more surface to the acid than a strip of the same mass, so it reacts faster whatever metal it is made of. Magnesium is in fact above zinc in the reactivity series. The misconception is reading speed straight off as reactivity: speed depends on surface area, concentration and temperature as well, so all three must match before the metals can be compared.' });

push({ id: 'g9s-cfam-011-c', chapterId: C4, subsection: 'metals_with_acids', difficulty: 3,
  question: 'The test is repeated with both metals as strips of the same size and mass, in acid of the same concentration and temperature. Magnesium now fizzes faster. What can be concluded?',
  options: ['Magnesium is the more reactive of the two metals',
            'Zinc is the more reactive of the two metals tested',
            'Nothing can be concluded until a third metal is used',
            'Both metals are equally reactive with the dilute acid'],
  answer: 'Magnesium is the more reactive of the two metals',
  hint: 'With everything else matched, the difference left must be the metal.',
  explanation: 'Now that surface area, concentration and temperature all match, the only difference left is the metal itself, so the faster fizzing does show magnesium is more reactive. The misconception is holding on to the first result: an earlier conclusion drawn from an unfair test has to be dropped, not averaged with the new one.' });

push({ id: 'g9s-cfam-011-d', chapterId: C4, subsection: 'metals_with_acids', difficulty: 3, kind: 'num',
  question: 'Hydrogen from a metal and acid is collected in a gas syringe. The syringe reads 18 cm³ after 30 s and 42 cm³ after 60 s. Calculate the volume of gas collected <b>during the second 30 s</b>, in cm³.',
  answer: 24, acceptableAnswers: ['24'],
  hint: 'The syringe never empties, so each reading includes all the gas before it.',
  explanation: '42 − 18 = 24 cm³. A gas syringe reading is a running total, so the gas made in one interval is the difference between the readings at its two ends. The misconception is writing 42, which is everything collected since the start rather than the gas made in that interval. Subtracting is what turns a running total into a rate.' });

})();
