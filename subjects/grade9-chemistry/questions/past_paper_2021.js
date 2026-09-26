'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  NCE 2021 Science — Chemistry component (N530, 50 marks, 45 minutes)
//  Source: Mauritius Examinations Syndicate
//    library/g9-2021-science-chemistry-8dea3b.pdf  (question paper)
//    library/g9-2021-chemistry-13ab05.pdf           (examiners' report)
//
//  Q1(f) requires the molecular-diagram figure → PSAC_PDF_QUESTIONS only.
//  Q2 sublimation apparatus and chromatogram need artwork.
//  Q4 uses a graph → needsArtwork.
//  Q5 uses Fig 5.1 (relative bubble levels) to compare reactivity.
//
//  ⚠ Alt text never names the answer.
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(
  // ── Q1 direct MCQs (excluding Q1f which requires the molecule diagram) ──
  makeMCQ({ id:'g9s-pp21c-001', chapterId:'g9s-c1-atmosphere', subsection:'greenhouse_gases', difficulty:1,
    question:'Which process can increase the amount of <b>oxygen</b> in air?',
    options:['Photosynthesis','Respiration','Combustion','Lightning'], answer:'Photosynthesis',
    hint:'Plants carry out this process during daylight hours.',
    explanation:'<b>Photosynthesis</b> uses carbon dioxide and produces oxygen, so it adds oxygen to the atmosphere. Respiration and combustion both consume oxygen, and lightning produces oxides of nitrogen. 📄 NCE 2021 exam.' }),

  makeMCQ({ id:'g9s-pp21c-002', chapterId:'g9s-c1-atmosphere', subsection:'air_pollutants', difficulty:2,
    question:'Which harmful gas can be removed from the exhaust gases of a petrol-powered car by its <b>catalytic converter</b>?',
    options:['Nitrogen','Steam','Carbon dioxide','Carbon monoxide'], answer:'Carbon monoxide',
    hint:'This gas is poisonous because it binds to haemoglobin in the blood.',
    explanation:'The catalytic converter converts <b>carbon monoxide</b> into carbon dioxide. Carbon dioxide already passes through unchanged, and nitrogen and steam are not harmful in the same way. 📄 NCE 2021 exam.' }),

  makeMCQ({ id:'g9s-pp21c-003', chapterId:'g9s-c1-atmosphere', subsection:'greenhouse_gases', difficulty:2,
    question:'Which pollutant is <b>mostly produced by the decay of vegetable matter and animals</b>?',
    options:['Sulfur dioxide','Methane','Carbon monoxide','Nitrogen dioxide'], answer:'Methane',
    hint:'This gas is also released from paddy fields and cattle.',
    explanation:'<b>Methane</b> is produced naturally during the decomposition of organic matter in swamps, landfills, and by cattle. Sulfur dioxide comes mainly from burning fossil fuels; carbon monoxide from incomplete combustion. 📄 NCE 2021 exam.' }),

  makeMCQ({ id:'g9s-pp21c-004', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:1,
    question:'Which of the following is a <b>metal</b>?',
    options:['Phosphorus','Iodine','Aluminium','Sulfur'], answer:'Aluminium',
    hint:'Metals conduct electricity and are found on the left and centre of the periodic table.',
    explanation:'<b>Aluminium</b> is a metal in Group III of the periodic table. Phosphorus, iodine and sulfur are all non-metals found in the upper right of the periodic table. 📄 NCE 2021 exam.' }),

  makeMCQ({ id:'g9s-pp21c-005', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:2,
    question:'What is the correct name for the compound with the formula <b>Fe(NO<sub>3</sub>)<sub>3</sub></b>?',
    options:['Iron (II) nitrate','Iron (III) nitrate','Iron (II) nitride','Iron (III) nitride'], answer:'Iron (III) nitrate',
    hint:'Count the NO₃ groups to find iron\'s valency; the ending -ate means oxygen is present.',
    explanation:'There are <b>three</b> nitrate (NO<sub>3</sub>) groups, so iron has valency 3 → <b>Iron (III)</b>. The -ate ending (not -ide) tells you it is a nitrate. 📄 NCE 2021 exam.' }),

  makeMCQ({ id:'g9s-pp21c-006', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:3,
    question:'What is the <b>total number of atoms</b> in the formula Cu(NO<sub>3</sub>)<sub>2</sub>?',
    options:['5','7','8','9'], answer:'9',
    hint:'Multiply atoms inside the bracket by the subscript outside it.',
    explanation:'Cu(NO<sub>3</sub>)<sub>2</sub> = 1 Cu + 2 N + 6 O = <b>9 atoms</b>. The subscript 2 outside the bracket doubles everything inside: 2 N and 2 × 3 = 6 O. 📄 NCE 2021 exam.' }),

  makeMCQ({ id:'g9s-pp21c-007', chapterId:'g9s-c2-mixtures', subsection:'choosing_a_technique', difficulty:1,
    question:'Which one of the following substances is a <b>mixture</b>?',
    options:['Water','Ethanol','Air','Salt'], answer:'Air',
    hint:'A mixture contains more than one substance not chemically combined.',
    explanation:'<b>Air</b> is a mixture of nitrogen, oxygen, argon, carbon dioxide and other gases. Water (H<sub>2</sub>O), ethanol (C<sub>2</sub>H<sub>5</sub>OH) and salt (NaCl) are all pure compounds with a fixed composition. 📄 NCE 2021 exam.' }),

  makeMCQ({ id:'g9s-pp21c-008', chapterId:'g9s-c2-mixtures', subsection:'distillation', difficulty:2,
    question:'During <b>distillation</b>, why are boiling chips added to the mixture?',
    options:['To increase the boiling point of the mixture','To ensure smooth boiling of the mixture',
             'To decrease the boiling point of the mixture','To keep the boiling point unchanged'],
    answer:'To ensure smooth boiling of the mixture',
    hint:'Superheating causes sudden, violent bubbling.',
    explanation:'Boiling chips provide tiny rough surfaces where bubbles can form steadily, so they <b>ensure smooth boiling</b> and prevent bumping (violent superheating). They do not change the boiling point. 📄 NCE 2021 exam.' }),

  makeMCQ({ id:'g9s-pp21c-009', chapterId:'g9s-c2-mixtures', subsection:'choosing_a_technique', difficulty:1,
    question:'Which method is suitable for obtaining <b>pure water from sea water</b>?',
    options:['Chromatography','Filtration','Decantation','Distillation'], answer:'Distillation',
    hint:'You want the liquid, not the dissolved solid.',
    explanation:'<b>Distillation</b> boils water off and condenses the vapour, leaving dissolved salts behind. Filtration and decantation remove suspended solids, not dissolved ones; chromatography separates dissolved mixtures on paper. 📄 NCE 2021 exam.' }),

  // ── Adapted from Q2 (Separation techniques) ─────────────────────────────
  makeMCQ({ id:'g9s-pp21c-010', chapterId:'g9s-c2-mixtures', subsection:'sublimation', difficulty:2,
    question:'Ammonium chloride is separated from sodium chloride by heating the mixture under an inverted funnel. The ammonium chloride re-solidifies inside the funnel. What is the name of this <b>separation technique</b>?',
    options:['Distillation','Sublimation','Chromatography','Crystallisation'], answer:'Sublimation',
    hint:'The solid turns straight to vapour, bypassing the liquid state.',
    explanation:'<b>Sublimation</b> — ammonium chloride changes from solid to vapour when heated, then re-solidifies on the cooler funnel, leaving the sodium chloride behind. 📄 NCE 2021 exam.' }),

  // ── Adapted from Q3 (Language of Chemistry) ─────────────────────────────
  makeMCQ({ id:'g9s-pp21c-011', chapterId:'g9s-c3-language', subsection:'word_equations', difficulty:2,
    question:'Complete the word equation: <b>Zinc + ………… → Zinc chloride + Hydrogen</b>',
    options:['Hydrochloric acid','Sulfuric acid','Nitric acid','Sodium hydroxide'],
    answer:'Hydrochloric acid',
    hint:'The product is a chloride, so the acid contains chloride ions.',
    explanation:'Zinc reacts with <b>hydrochloric acid</b> to give zinc chloride and hydrogen. The chloride in the product tells you the acid is hydrochloric (HCl). 📄 NCE 2021 exam.' }),

  makeMCQ({ id:'g9s-pp21c-012', chapterId:'g9s-c5-salts', subsection:'neutralisation', difficulty:2,
    question:'Complete the word equation: <b>………… + Sulfuric acid → Sodium sulfate + Water</b>',
    options:['Sodium hydroxide','Sodium chloride','Sodium oxide','Sodium carbonate'],
    answer:'Sodium hydroxide',
    hint:'A base reacting with an acid to give a salt and water — this is neutralisation.',
    explanation:'<b>Sodium hydroxide</b> (a base) + sulfuric acid → sodium sulfate + water. This is a neutralisation reaction. 📄 NCE 2021 exam.' }),

  makeMCQ({ id:'g9s-pp21c-013', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:2,
    question:'Using the valency cross-over method (calcium = 2, iodine = 1), what is the formula of <b>calcium iodide</b>?',
    options:['CaI<sub>2</sub>','CaI','Ca<sub>2</sub>I','CaI<sub>3</sub>'],
    answer:'CaI<sub>2</sub>',
    hint:'Swap the valencies: calcium\'s 2 becomes the subscript for iodine.',
    explanation:'Ca (valency 2) and I (valency 1) cross over to give <b>CaI<sub>2</sub></b> — two iodine atoms balance one calcium. 📄 NCE 2021 exam.' }),

  makeMCQ({ id:'g9s-pp21c-014', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:3,
    question:'Using the valency cross-over method (aluminium = 3, oxygen = 2), what is the formula of <b>aluminium oxide</b>?',
    options:['Al<sub>2</sub>O<sub>3</sub>','AlO','AlO<sub>3</sub>','Al<sub>3</sub>O<sub>2</sub>'],
    answer:'Al<sub>2</sub>O<sub>3</sub>',
    hint:'Swap the valencies: 3 becomes the subscript for O, 2 becomes the subscript for Al.',
    explanation:'Al (valency 3) and O (valency 2) cross over: 3 goes under O and 2 goes under Al → <b>Al<sub>2</sub>O<sub>3</sub></b>. 📄 NCE 2021 exam.' }),

  makeMCQ({ id:'g9s-pp21c-015', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:2,
    question:'Iron(II) has valency 2 and sulfur has valency 2. What is the formula of <b>iron(II) sulfide</b>?',
    options:['FeS','Fe<sub>2</sub>S','FeS<sub>2</sub>','Fe<sub>2</sub>S<sub>2</sub>'],
    answer:'FeS',
    hint:'When both valencies are equal, the subscripts both become 1 and can be omitted.',
    explanation:'Fe (valency 2) and S (valency 2) — equal valencies simplify to 1:1, giving <b>FeS</b>. 📄 NCE 2021 exam.' }),

  makeMCQ({ id:'g9s-pp21c-016', chapterId:'g9s-c3-language', subsection:'balancing_equations', difficulty:3,
    question:'In the balanced equation <b>__ Na + __ H<sub>2</sub>O → __ NaOH + H<sub>2</sub></b>, what coefficient goes in front of H<sub>2</sub>O?',
    options:['1','2','3','4'], answer:'2',
    hint:'Count sodium atoms on both sides to find the first coefficient, then balance hydrogen.',
    explanation:'2 Na + <b>2</b>H<sub>2</sub>O → 2NaOH + H<sub>2</sub>: 2 Na on each side, 4 H on each side, 2 O on each side — fully balanced. 📄 NCE 2021 exam.' }),

  makeMCQ({ id:'g9s-pp21c-017', chapterId:'g9s-c3-language', subsection:'balancing_equations', difficulty:3,
    question:'What coefficient in front of <b>HCl</b> balances the equation: CaCO<sub>3</sub> + __ HCl → CaCl<sub>2</sub> + H<sub>2</sub>O + CO<sub>2</sub>?',
    options:['1','2','3','4'], answer:'2',
    hint:'CaCl₂ needs two Cl atoms, so you need two HCl molecules.',
    explanation:'CaCO<sub>3</sub> + <b>2</b>HCl → CaCl<sub>2</sub> + H<sub>2</sub>O + CO<sub>2</sub>: 2 Cl, 2 H, 1 Ca, 1 C, 3 O on each side — balanced. 📄 NCE 2021 exam.' }),

  // ── Adapted from Q4 (Atmosphere) ─────────────────────────────────────────
  makeMCQ({ id:'g9s-pp21c-018', chapterId:'g9s-c1-atmosphere', subsection:'air_pollutants', difficulty:2,
    question:'Give one source of <b>oxides of nitrogen</b> that results from human activities.',
    options:['Motor vehicle engines','Volcanic eruptions','Photosynthesis','Evaporation of seawater'],
    answer:'Motor vehicle engines',
    hint:'High temperatures inside engines cause nitrogen and oxygen in air to react.',
    explanation:'<b>Motor vehicle engines</b> reach temperatures high enough to cause nitrogen and oxygen to combine, producing oxides of nitrogen. Volcanic eruptions are a natural source. 📄 NCE 2021 exam.' }),

  makeMCQ({ id:'g9s-pp21c-019', chapterId:'g9s-c1-atmosphere', subsection:'air_pollutants', difficulty:2,
    question:'What is the main <b>importance of the ozone layer</b> in the upper atmosphere?',
    options:['It absorbs ultraviolet radiation from the Sun','It traps heat radiated from the Earth',
             'It produces oxygen for living organisms to breathe','It filters out acid rain'],
    answer:'It absorbs ultraviolet radiation from the Sun',
    hint:'Without it, more UV reaches the surface and causes skin damage.',
    explanation:'The ozone layer <b>absorbs ultraviolet (UV) radiation</b> from the Sun, protecting living organisms from UV-induced skin cancer and cataracts. It is not the same as the greenhouse effect. 📄 NCE 2021 exam.' }),

  makeMCQ({ id:'g9s-pp21c-020', chapterId:'g9s-c1-atmosphere', subsection:'air_pollutants', difficulty:2,
    question:'Which type of compound is mainly responsible for <b>ozone depletion</b>?',
    options:['Chlorofluorocarbons (CFCs)','Carbon dioxide','Sulfur dioxide','Methane'],
    answer:'Chlorofluorocarbons (CFCs)',
    hint:'These were once used in refrigerators and aerosol sprays.',
    explanation:'<b>CFCs</b> (chlorofluorocarbons) release chlorine atoms in the upper atmosphere that break down ozone molecules. CO₂ and CH₄ cause the greenhouse effect instead. 📄 NCE 2021 exam.' }),

  // ── Adapted from Q5 (Metals) ─────────────────────────────────────────────
  makeMCQ({ id:'g9s-pp21c-021', chapterId:'g9s-c4-metals', subsection:'metals_with_acids', difficulty:3,
    question:'What is the colour of the solution produced when <b>iron reacts with dilute hydrochloric acid</b>?',
    options:['Blue','Colourless','Pale green','Yellow'], answer:'Pale green',
    hint:'The salt formed is iron(II) chloride, which has a characteristic colour.',
    explanation:'Iron + dilute hydrochloric acid → iron(II) chloride + hydrogen. The iron(II) chloride solution is <b>pale green</b>. 📄 NCE 2021 exam.' }),

  makeMCQ({ id:'g9s-pp21c-022', chapterId:'g9s-c4-metals', subsection:'predicting_reactions', difficulty:2,
    question:'A student adds powdered zinc to a copper sulfate solution. What is the <b>solid product deposited</b> at the end of the reaction?',
    options:['Zinc oxide','Zinc sulfate','Copper','Copper oxide'], answer:'Copper',
    hint:'The more reactive metal displaces the less reactive one.',
    explanation:'Zinc is more reactive than copper, so it <b>displaces copper</b> from the solution: Zn + CuSO<sub>4</sub> → ZnSO<sub>4</sub> + Cu. The copper solid is deposited as a red/brown coating. 📄 NCE 2021 exam.' }),

  makeMCQ({ id:'g9s-pp21c-pdf-001', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:2,
    question:'<img src="assets/past-papers/g9-chemistry-2021/q1f.png" alt="Molecular structure diagram with filled circles representing one element and hollow circles representing another, linked in a ring-like geometric pattern" style="max-width:100%;margin-bottom:8px"><br>The diagram (Figure 1.1) shows a molecule of a compound. Filled circles represent phosphorus atoms; hollow circles represent oxygen atoms. What is the formula of this molecule?',
    options:['P<sub>4</sub>O<sub>6</sub>','PO<sub>4</sub>','P<sub>6</sub>O<sub>4</sub>','PO<sub>6</sub>'],
    answer:'P<sub>4</sub>O<sub>6</sub>',
    hint:'Count the filled circles and the hollow circles separately.',
    explanation:'The diagram shows 4 phosphorus atoms (filled circles) and 6 oxygen atoms (hollow circles), giving the formula <b>P<sub>4</sub>O<sub>6</sub></b>. 📄 NCE 2021 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp21c-pdf-002', chapterId:'g9s-c2-mixtures', marks:10, year:2021, grade:9, subject:'Science (Chemistry)', type:'written',
    image:'assets/past-papers/g9-chemistry-2021/q2a.png',
    question:'Question 2. (a) Fig. 2.1 shows the process used to separate a mixture of sodium chloride and ammonium chloride. (i) Fill in boxes A to D with words from: Funnel, Burner, Sodium Chloride, Cotton wool plug, Ammonium chloride, Evaporating dish. [4] (ii) Name the process used in this separation technique. [1] (b) Fig. 2.2 shows a chromatogram of single substances A, B, C, D and two mixtures X and Y. (i) Name this type of experiment. [1] (ii) What does line R in Fig. 2.2 represent? [1] (iii) Why should the start line be drawn in pencil and not in ink? [1] (iv) Using Fig. 2.2, state which of substances A, B, C and D are present in mixture X and in mixture Y. [2]',
    markScheme:'(a)(i) A = Cotton wool plug; B = Ammonium chloride (sublimate); C = Funnel; D = Burner. (a)(ii) Sublimation. (b)(i) Chromatography. (b)(ii) Line R is the solvent front (the furthest point reached by the solvent). (b)(iii) Ink would dissolve in the solvent and travel up the paper, giving false results; pencil is insoluble. (b)(iv) From the chromatogram dot positions: Mixture X contains A and C; Mixture Y contains B, C and D (accept answers consistent with the figure).' },

  { id:'g9s-pp21c-pdf-003', chapterId:'g9s-c3-language', marks:7, year:2021, grade:9, subject:'Science (Chemistry)', type:'written',
    question:'Question 3. (a) Fill in the blanks using the correct name of the reactant: (i) Zinc + __________ → Zinc chloride + Hydrogen [1]; (ii) __________ + Sulfuric acid → Sodium Sulfate + Water [1]. (b) Using Table 3.1 (elements with symbols and valencies: K=1, Al=3, O=2, I=1, N=3, Ca=2, S=2,4,6, Fe=2,3), write the formula of: (i) Calcium iodide [1]; (ii) Aluminium oxide [1]; (iii) Iron(II) sulfide [1]. (c) Fill in the blanks to balance: (i) __Na + __H₂O → __NaOH + H₂ [1]; (ii) CaCO₃ + __HCl → CaCl₂ + H₂O + CO₂ [1].',
    markScheme:'(a)(i) Hydrochloric acid. (a)(ii) Sodium hydroxide. (b)(i) CaI₂. (b)(ii) Al₂O₃. (b)(iii) FeS. (c)(i) 2Na + 2H₂O → 2NaOH + H₂. (c)(ii) CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂.' },

  { id:'g9s-pp21c-pdf-004', chapterId:'g9s-c1-atmosphere', marks:9, year:2021, grade:9, subject:'Science (Chemistry)', type:'written',
    image:'assets/past-papers/g9-chemistry-2021/q4a.png',
    question:'Question 4. Fig. 4.1 shows the concentration of oxides of nitrogen in a city over a 24-hour period. The concentration peaks at about 12 noon and reaches a maximum of 0.25 ppm. (a)(i) What is the maximum concentration of oxides of nitrogen? [1] (a)(ii) At what time of day is the concentration highest? [1] (a)(iii) Give one source of oxides of nitrogen resulting from human activities. [1] (b) Fig. 4.2 shows the ozone layer in the upper atmosphere. (i) State the importance of the ozone layer. [1] (ii) Name one type of compound responsible for ozone depletion. [1] (iii) Name one harmful effect of ozone depletion on human health. [1] (c) Water in ponds and lakes is often polluted by nitrates and phosphates. (i) State one source of these pollutants. [1] (ii) What is the name of the undesirable process caused by excess dissolved pollutants? [1] (iii) How is this process harmful to aquatic life? [1]',
    markScheme:'(a)(i) 0.25 ppm. (a)(ii) 12 noon (12 p.m.). (a)(iii) Motor vehicle engines / combustion engines / burning fossil fuels. (b)(i) Absorbs ultraviolet (UV) radiation from the Sun, protecting living organisms. (b)(ii) Chlorofluorocarbons (CFCs). (b)(iii) Skin cancer / cataracts / eye damage. (c)(i) Fertilisers washed from agricultural land / sewage. (c)(ii) Eutrophication. (c)(iii) Algae grow rapidly, block sunlight, then die and decompose; decomposition by bacteria uses up dissolved oxygen, causing fish and other aquatic organisms to suffocate.' },

  { id:'g9s-pp21c-pdf-005', chapterId:'g9s-c4-metals', marks:14, year:2021, grade:9, subject:'Science (Chemistry)', type:'written',
    image:'assets/past-papers/g9-chemistry-2021/q5.png',
    question:'Question 5. Four metals — Calcium, Zinc, Magnesium and Iron — are placed in separate test tubes containing dilute hydrochloric acid. Bubbles of gas are seen in Fig. 5.1 (bubble levels show relative reactivity). (a)(i) 1. Which metal is most reactive? [1] 2. Which metal is least reactive? [1] (a)(ii) What observation allowed you to reach this conclusion? [1] (a)(iii) What is the colour of the solution when iron reacts with hydrochloric acid? [1] (a)(iv) Arrange the four metals in order starting with the most reactive. [1] (b) A student adds powdered zinc to a copper sulfate solution. (i) What is the colour change of the solution during the reaction (from … to …)? [2] (ii) What is the solid product deposited? [1] (iii) Name the chemical reaction which occurs. [1]',
    markScheme:'(a)(i) 1. Calcium (most vigorous bubbling). 2. Iron (least bubbling). (a)(ii) The metal producing the most bubbles is most reactive (more vigorous reaction = more hydrogen produced faster). (a)(iii) Pale green. (a)(iv) Calcium, Magnesium, Zinc, Iron. (b)(i) From blue to colourless (the copper sulfate is used up). (b)(ii) Copper (red/brown solid). (b)(iii) Displacement reaction.' }
);
