'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  NCE 2023 Science — Chemistry component (N530, 50 marks, 45 minutes)
//  Source: Mauritius Examinations Syndicate
//    library/g9-2023-science-chemistry-e1beab.pdf  (question paper)
//    library/g9-2023-chemistry-775e6b.pdf           (examiners' report)
//
//  Q1 items 1 and 4 are figure-identification questions:
//    • Item 1 asks students to identify a piece of apparatus from a picture
//    • Item 4 asks students to identify the oxygen molecule from four diagrams
//    Both go to PSAC_PDF_QUESTIONS only (needsArtwork).
//  Q3 requires photos of global warming effects.
//  Q4 uses a chromatogram (Fig. 4.1) and a sublimation diagram (Fig. 4.2).
//
//  ⚠ Alt text never names the answer.
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(
  // ── Q1 direct MCQs (items 1 and 4 excluded — they require figures) ───────
  makeMCQ({ id:'g9s-pp23c-001', chapterId:'g9s-c1-atmosphere', subsection:'air_pollutants', difficulty:2,
    question:'A factory releases carbon dioxide into the air. By which <b>process</b> does the factory release carbon dioxide?',
    options:['Combustion','Eutrophication','Photosynthesis','Respiration'], answer:'Combustion',
    hint:'Burning fossil fuels in furnaces and boilers.',
    explanation:'Factories burn fossil fuels, which is <b>combustion</b>. Combustion releases CO<sub>2</sub> as a product. Photosynthesis is the reverse — it absorbs CO<sub>2</sub>. 📄 NCE 2023 exam.' }),

  makeMCQ({ id:'g9s-pp23c-002', chapterId:'g9s-c1-atmosphere', subsection:'greenhouse_gases', difficulty:1,
    question:'Which one of the following is a <b>greenhouse gas</b>?',
    options:['Hydrogen','Methane','Nitrogen','Oxygen'], answer:'Methane',
    hint:'It is produced by cattle, paddy fields and decomposing organic waste.',
    explanation:'<b>Methane</b> (CH<sub>4</sub>) is a greenhouse gas. Nitrogen, oxygen and hydrogen are major components of air but do not absorb infrared radiation in the same way. 📄 NCE 2023 exam.' }),

  makeMCQ({ id:'g9s-pp23c-003', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:2,
    question:'How many <b>atoms</b> combine to form a water molecule (H<sub>2</sub>O)?',
    options:['2','4','3','6'], answer:'3',
    hint:'Count every atom in the formula, not just the types.',
    explanation:'H<sub>2</sub>O has 2 hydrogen atoms and 1 oxygen atom = <b>3 atoms</b> in total. Option A (2) is a common error caused by confusing "number of elements" with "number of atoms". 📄 NCE 2023 exam.' }),

  makeMCQ({ id:'g9s-pp23c-004', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:1,
    question:'What is the <b>valency of hydrogen</b>?',
    options:['1','2','3','4'], answer:'1',
    hint:'Hydrogen forms just one bond with other atoms.',
    explanation:'Hydrogen has a valency of <b>1</b>. The subscript 2 in H<sub>2</sub> is the number of hydrogen atoms in the molecule, not its valency. 📄 NCE 2023 exam.' }),

  makeMCQ({ id:'g9s-pp23c-005', chapterId:'g9s-c4-metals', subsection:'metals_with_oxygen', difficulty:1,
    question:'What is the <b>colour of the flame</b> when magnesium burns in air?',
    options:['Blue','Green','Red','White'], answer:'White',
    hint:'Magnesium produces a brilliantly bright flame that can damage eyesight.',
    explanation:'Magnesium burns with a <b>brilliant white flame</b>, forming a white powder of magnesium oxide. Do not look directly at burning magnesium. 📄 NCE 2023 exam.' }),

  makeMCQ({ id:'g9s-pp23c-006', chapterId:'g9s-c5-salts', subsection:'neutralisation_in_daily_life', difficulty:2,
    question:'A wasp sting is alkaline. Which of the following can be used to <b>treat a wasp sting</b>?',
    options:['Baking soda','Quicklime','Slaked lime','Vinegar'], answer:'Vinegar',
    hint:'To neutralise an alkali you need an acid.',
    explanation:'Wasp sting is alkaline, so an <b>acid</b> is needed to neutralise it. <b>Vinegar</b> is a weak acid. Baking soda, quicklime and slaked lime are all alkaline, so they would not neutralise a wasp sting (they treat bee stings, which are acidic). 📄 NCE 2023 exam.' }),

  makeMCQ({ id:'g9s-pp23c-007', chapterId:'g9s-c5-salts', subsection:'uses_of_salts', difficulty:2,
    question:'Which salt is used to make <b>plaster of Paris</b>?',
    options:['Ammonium nitrate','Calcium sulfate','Magnesium sulfate','Potassium nitrate'],
    answer:'Calcium sulfate',
    hint:'It is used for casts on broken bones.',
    explanation:'<b>Calcium sulfate</b> (hydrated form = gypsum; partially dehydrated form = plaster of Paris) is used to make casts and moulds. 📄 NCE 2023 exam.' }),

  makeMCQ({ id:'g9s-pp23c-008', chapterId:'g9s-c5-salts', subsection:'neutralisation', difficulty:1,
    question:'What are the <b>products of a neutralisation reaction</b>?',
    options:['Acid and base','Acid and salt','Base and water','Salt and water'],
    answer:'Salt and water',
    hint:'Acid + base → ? + ?',
    explanation:'Neutralisation: acid + base → <b>salt + water</b>. Acid and base are the reactants, not the products. 📄 NCE 2023 exam.' }),

  // ── Adapted from Q2 (Language of Chemistry — symbols and word equations) ──
  makeMCQ({ id:'g9s-pp23c-009', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:2,
    question:'Which symbol correctly represents the element <b>chlorine</b>?',
    options:['C','Cl','H','N'], answer:'Cl',
    hint:'The symbol uses two letters — capital letter followed by a lower-case letter.',
    explanation:'Chlorine is <b>Cl</b>. C is carbon, H is hydrogen, and N is nitrogen. When a symbol has two letters, only the first is capitalised. 📄 NCE 2023 exam.' }),

  makeMCQ({ id:'g9s-pp23c-010', chapterId:'g9s-c3-language', subsection:'word_equations', difficulty:2,
    question:'Complete the word equation: <b>Calcium + Oxygen &rarr; ………</b>',
    options:['Calcium oxide','Calcium chloride','Calcium carbonate','Calcium hydroxide'],
    answer:'Calcium oxide',
    hint:'A metal burning in oxygen always forms a metal oxide.',
    explanation:'Calcium + oxygen → <b>calcium oxide</b>. A metal burning in oxygen always produces a metal oxide. The name ends in -oxide because oxygen is the only non-metal in the compound. 📄 NCE 2023 exam.' }),

  makeMCQ({ id:'g9s-pp23c-011', chapterId:'g9s-c3-language', subsection:'word_equations', difficulty:2,
    question:'Complete the word equation: <b>Sulfur + Oxygen &rarr; ………</b>',
    options:['Sodium oxide','Sulfur dioxide','Sulfur trioxide','Sulfur monoxide'],
    answer:'Sulfur dioxide',
    hint:'The common product of burning sulfur has the formula SO₂.',
    explanation:'Sulfur burns in oxygen to produce <b>sulfur dioxide</b> (SO<sub>2</sub>). Sulfur trioxide (SO<sub>3</sub>) can form in further reactions but is not the immediate product of burning. 📄 NCE 2023 exam.' }),

  makeMCQ({ id:'g9s-pp23c-012', chapterId:'g9s-c4-metals', subsection:'metals_with_acids', difficulty:2,
    question:'Complete the word equation: <b>Magnesium + Sulfuric acid &rarr; ………… + Hydrogen</b>',
    options:['Magnesium chloride','Magnesium sulfate','Magnesium carbonate','Magnesium hydroxide'],
    answer:'Magnesium sulfate',
    hint:'The salt formed takes the name of the metal and the acid radical.',
    explanation:'Magnesium + sulfuric acid → <b>magnesium sulfate</b> + hydrogen. Sulfuric acid contains sulfate ions, so the salt formed is a sulfate. 📄 NCE 2023 exam.' }),

  // ── Adapted from Q3 (Atmosphere — air pollutants and water pollution) ─────
  makeMCQ({ id:'g9s-pp23c-013', chapterId:'g9s-c1-atmosphere', subsection:'air_pollutants', difficulty:2,
    question:'Which pair of substances are <b>air pollutants</b>?',
    options:['Oxygen and Nitrogen','CFCs and Smoke','Oxygen and Smoke','CFCs and Nitrogen'],
    answer:'CFCs and Smoke',
    hint:'Both cause harm to the atmosphere; the others are natural components of air.',
    explanation:'<b>CFCs</b> deplete the ozone layer and <b>smoke</b> causes respiratory problems. Oxygen and nitrogen are the main natural components of air and are not pollutants. 📄 NCE 2023 exam.' }),

  makeMCQ({ id:'g9s-pp23c-014', chapterId:'g9s-c1-atmosphere', subsection:'air_pollutants', difficulty:3,
    question:'The statement "Carbon monoxide is a <b>water pollutant</b>" is …',
    options:['True — CO dissolves in water and pollutes rivers',
             'False — CO is an air pollutant, not a water pollutant',
             'True — CO is released from burning and enters waterways',
             'False — CO is not a pollutant at all'],
    answer:'False — CO is an air pollutant, not a water pollutant',
    hint:'Carbon monoxide is produced by incomplete combustion and harms animals by binding to blood.',
    explanation:'Carbon monoxide is an <b>air pollutant</b>, not a water pollutant. It is produced by incomplete combustion of fuels in vehicles and factories and affects organisms through inhalation. 📄 NCE 2023 exam.' }),

  // ── Adapted from Q4 (Separation techniques) ──────────────────────────────
  makeMCQ({ id:'g9s-pp23c-015', chapterId:'g9s-c2-mixtures', subsection:'choosing_a_technique', difficulty:3,
    question:'In a chromatogram, food colouring Q shows only <b>one spot</b>. What does this show about Q?',
    options:['Q is a mixture of many dyes','Q is a pure dye (single component)',
             'Q is soluble in all solvents','Q cannot be separated from the baseline'],
    answer:'Q is a pure dye (single component)',
    hint:'A pure substance produces only one spot in chromatography.',
    explanation:'A single spot means all the colour has moved together as one component — Q is a <b>pure dye</b>. Multiple spots would indicate a mixture of dyes with different solubilities. 📄 NCE 2023 exam.' }),

  makeMCQ({ id:'g9s-pp23c-016', chapterId:'g9s-c2-mixtures', subsection:'sublimation', difficulty:2,
    question:'During sublimation, a solid <b>changes directly</b> into …',
    options:['A liquid','A gas','A plasma','An aqueous solution'], answer:'A gas',
    hint:'No liquid stage occurs during sublimation.',
    explanation:'Sublimation is the change of state directly from <b>solid to gas (vapour)</b> without passing through the liquid phase. Iodine and ammonium chloride are common examples. 📄 NCE 2023 exam.' }),

  // ── Adapted from Q5 (Language of Chemistry + Metals) ─────────────────────
  makeMCQ({ id:'g9s-pp23c-017', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:4,
    question:'Aluminium has valency 3 and sulfate (SO<sub>4</sub>) has valency 2. What is the formula of <b>aluminium sulfate</b>?',
    options:['AlSO<sub>4</sub>','Al(SO<sub>4</sub>)<sub>2</sub>','Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>','Al<sub>3</sub>SO<sub>4</sub>'],
    answer:'Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>',
    hint:'Cross the valencies and bracket the SO₄ group.',
    explanation:'Al (valency 3) and SO<sub>4</sub> (valency 2) cross to give <b>Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub></b>. Brackets are essential around SO<sub>4</sub>. 📄 NCE 2023 exam.' }),

  makeMCQ({ id:'g9s-pp23c-018', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:3,
    question:'Iron(III) has valency 3 and nitrate (NO<sub>3</sub>) has valency 1. What is the formula of <b>iron(III) nitrate</b>?',
    options:['FeNO<sub>3</sub>','Fe(NO<sub>3</sub>)<sub>2</sub>','Fe(NO<sub>3</sub>)<sub>3</sub>','Fe<sub>3</sub>NO<sub>3</sub>'],
    answer:'Fe(NO<sub>3</sub>)<sub>3</sub>',
    hint:'Cross the valencies 3 and 1; bracket the NO₃ group.',
    explanation:'Fe(III) (valency 3) and NO<sub>3</sub> (valency 1) cross to give <b>Fe(NO<sub>3</sub>)<sub>3</sub></b>. Three nitrate groups balance one iron(III). 📄 NCE 2023 exam.' }),

  makeMCQ({ id:'g9s-pp23c-019', chapterId:'g9s-c3-language', subsection:'balancing_equations', difficulty:3,
    question:'What coefficient in front of <b>HCl</b> balances: CaCO<sub>3</sub> + __ HCl &rarr; CaCl<sub>2</sub> + H<sub>2</sub>O + CO<sub>2</sub>?',
    options:['1','2','3','4'], answer:'2',
    hint:'CaCl₂ needs 2 Cl atoms, so 2 HCl are needed.',
    explanation:'CaCO<sub>3</sub> + <b>2</b>HCl → CaCl<sub>2</sub> + H<sub>2</sub>O + CO<sub>2</sub>: 2 Cl, 2 H, 1 Ca, 1 C, 3 O on each side — balanced. 📄 NCE 2023 exam.' }),

  makeMCQ({ id:'g9s-pp23c-020', chapterId:'g9s-c4-metals', subsection:'predicting_reactions', difficulty:2,
    question:'An iron nail is placed in copper(II) sulfate solution. What is the <b>solid deposited</b> on the nail?',
    options:['Iron oxide','Copper','Iron sulfate','Copper sulfate'], answer:'Copper',
    hint:'The more reactive metal displaces the less reactive one from its compound.',
    explanation:'Iron is more reactive than copper, so it displaces copper: Fe + CuSO<sub>4</sub> → FeSO<sub>4</sub> + <b>Cu</b>. The copper deposits as a red/brown solid on the iron nail. 📄 NCE 2023 exam.' }),

  makeMCQ({ id:'g9s-pp23c-021', chapterId:'g9s-c4-metals', subsection:'predicting_reactions', difficulty:2,
    question:'When an iron nail is placed in copper(II) sulfate solution, what is the <b>name of this type</b> of chemical reaction?',
    options:['Combustion','Decomposition','Displacement','Neutralisation'],
    answer:'Displacement',
    hint:'One metal takes the place of another in a compound.',
    explanation:'This is a <b>displacement reaction</b>: a more reactive metal (iron) pushes out a less reactive metal (copper) from its salt solution. 📄 NCE 2023 exam.' }),

  makeMCQ({ id:'g9s-pp23c-022', chapterId:'g9s-c2-mixtures', subsection:'choosing_a_technique', difficulty:1,
    question:'<img src="assets/past-papers/g9-chemistry-2023/q1-item1.png" alt="Laboratory glassware with volume markings from 100 ml to 500 ml shown in Fig. 1.1" style="max-width:100%;margin-bottom:8px"><br>What does <b>Fig. 1.1</b> show?',
    options:['A beaker','A condenser','A conical flask','A distillation flask'], answer:'A beaker',
    hint:'This type of glassware has a flat bottom, straight cylindrical sides and a wide mouth.',
    explanation:'Fig. 1.1 shows <b>a beaker</b> — a wide-mouthed cylindrical glass container with graduated volume markings. A conical flask is narrower at the top; a distillation flask has a round bottom with a side arm. 📄 NCE 2023 exam.' }),

  makeMCQ({ id:'g9s-pp23c-023', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:1,
    question:'<img src="assets/past-papers/g9-chemistry-2023/q1-item4.png" alt="Four diagrams labeled A to D, each showing two atoms bonded together with different atomic symbols" style="max-width:100%;margin-bottom:8px"><br>Which one of the diagrams represents an <b>oxygen</b> molecule?',
    options:['A','B','C','D'], answer:'D',
    hint:'An oxygen molecule consists of two oxygen atoms bonded together.',
    explanation:'An oxygen molecule is O<sub>2</sub> — two oxygen atoms bonded together. Diagram <b>D</b> shows two circles labelled O joined together. Diagrams A (H–H), B (Cl–Cl) and C (F–F) represent hydrogen, chlorine and fluorine molecules respectively. 📄 NCE 2023 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp23c-pdf-002', chapterId:'g9s-c3-language', marks:9, year:2023, grade:9, subject:'Science (Chemistry)', type:'written',
    question:'Question 2. (a) Match the symbol of each element to its correct name. Symbols: N, C, Cl, H, Hg. Names: mercury, hydrogen, nitrogen, sodium, chlorine, carbon. [5] (b) Complete the following word equations by choosing the correct compound in brackets: (i) Calcium + Oxygen → (calcium oxide, calcium chloride) [1]; (ii) Sodium + Chlorine → (sodium oxide, sodium chloride) [1]; (iii) Sulfur + Oxygen → (sodium oxide, sulfur dioxide) [1]; (iv) Magnesium + Sulfuric acid → __________ + Hydrogen (magnesium chloride, magnesium sulfate) [1].',
    markScheme:'(a) N = nitrogen; C = carbon; Cl = chlorine; H = hydrogen; Hg = mercury. (b)(i) Calcium oxide. (b)(ii) Sodium chloride. (b)(iii) Sulfur dioxide. (b)(iv) Magnesium sulfate.' },

  { id:'g9s-pp23c-pdf-003', chapterId:'g9s-c1-atmosphere', marks:9, year:2023, grade:9, subject:'Science (Chemistry)', type:'written',
    image:'assets/past-papers/g9-chemistry-2023/q3.png',
    question:'Question 3. (a) Identify the effects of global warming shown in each picture below. Fill in the blanks using: Melting of ice-caps, Depletion of ozone layer, Droughts, Flash floods. Picture 1 shows a dried-up cracked landscape; Picture 2 shows a polar bear on shrinking ice; Picture 3 shows flooded city streets. [3] (b) Circle the two air pollutants from: CFCs, Oxygen, Smoke, Nitrogen. [2] (c) Write TRUE or FALSE: (i) Sewage contains harmful bacteria. (ii) During volcanic eruptions, sulfur dioxide is released. (iii) Carbon monoxide is a water pollutant. (iv) Oil spill is a cause of water pollution. [4]',
    markScheme:'(a) 1 = Droughts; 2 = Melting of ice-caps; 3 = Flash floods. (b) CFCs and Smoke. (c)(i) TRUE. (c)(ii) TRUE. (c)(iii) FALSE (CO is an air pollutant, not a water pollutant). (c)(iv) TRUE.' },

  { id:'g9s-pp23c-pdf-004', chapterId:'g9s-c2-mixtures', marks:10, year:2023, grade:9, subject:'Science (Chemistry)', type:'written',
    image:'assets/past-papers/g9-chemistry-2023/q4a.png',
    question:'Question 4. Fig. 4.1 shows a chromatogram of four food colourings P, Q, R, S. P has 3 dots (spots) at different heights; Q has 1 dot; R has 2 dots; S has a dot on the baseline only. (a)(i) How many dyes are present in food colouring P? [1] (a)(ii) What shows that dye Q is a pure dye? [1] (a)(iii) Why has food colouring S not been separated during chromatography? [1] (b)(i) One precaution is to ensure the spot of food colouring is small. Explain why. [1] (b)(ii) Give another precaution during chromatography. [1] Fig. 4.2 shows a sublimation apparatus (labelled: Cotton wool, Funnel, Mixture). (c)(i) What is the change of state during sublimation? [1] (c)(ii) Give an example of a mixture separated by sublimation. [1] (c)(iii) Why should the narrow end of the funnel be closed with cotton wool? [1] (d) Name two insoluble salts. [2]',
    markScheme:'(a)(i) 3 dyes (three spots). (a)(ii) Q shows only one spot, indicating it is a single component (pure dye). (a)(iii) S is insoluble in the solvent, so it does not move from the baseline. (b)(i) A small spot prevents the dyes overlapping and mixing on the chromatogram. (b)(ii) Draw the baseline in pencil (not ink) / use a lid to prevent solvent evaporation / do not let the baseline touch the solvent. (c)(i) Solid to gas (direct). (c)(ii) Ammonium chloride and sodium chloride / iodine and sand. (c)(iii) To prevent the sublimed vapour from escaping (so it condenses back to a solid on the funnel). (d) Any two of: silver chloride, barium sulfate, lead iodide, calcium carbonate, lead sulfate.' },

  { id:'g9s-pp23c-pdf-005', chapterId:'g9s-c4-metals', marks:12, year:2023, grade:9, subject:'Science (Chemistry)', type:'written',
    question:'Question 5. (a) Write the chemical formula for: (i) Aluminium sulfate [1]; (ii) Iron(III) nitrate [1]. (b) Balance the following chemical equations: (i) CaCO₃ + HCl → CaCl₂ + CO₂ + H₂O [1]; (ii) CH₄ + O₂ → CO₂ + H₂O [1]; (iii) Fe + O₂ → Fe₂O₃ [1]. (c) An iron nail is placed in a boiling tube containing copper(II) sulfate solution (Fig. 5.1). (i) At the end of the reaction a solid is deposited on the iron nail. Name this solid. [1] (ii) What is the name given to this type of chemical reaction? [1] (d) Magnesium ribbon is heated in steam. (i) Write the word equation for this reaction. [1] (ii) Name the white solid formed. [1] (iii) Explain why copper would not react with steam. [2]',
    markScheme:'(a)(i) Al₂(SO₄)₃. (a)(ii) Fe(NO₃)₃. (b)(i) CaCO₃ + 2HCl → CaCl₂ + CO₂ + H₂O. (b)(ii) CH₄ + 2O₂ → CO₂ + 2H₂O. (b)(iii) 4Fe + 3O₂ → 2Fe₂O₃. (c)(i) Copper (red/brown solid). (c)(ii) Displacement reaction. (d)(i) Magnesium + steam → magnesium oxide + hydrogen. (d)(ii) Magnesium oxide (white solid). (d)(iii) Copper is less reactive than hydrogen / copper is below hydrogen in the reactivity series, so it cannot displace hydrogen from steam.' }
);
