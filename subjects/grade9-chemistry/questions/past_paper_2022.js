'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  NCE 2022 Science — Chemistry component (N530, 50 marks, 45 minutes)
//  Source: Mauritius Examinations Syndicate
//    library/g9-2022-science-chemistry-2021-2022-36d4f0.pdf  (question paper)
//    library/g9-2022-chemistry-072d19.pdf                    (examiners' report)
//
//  Q1 item 4 requires a molecular-diagram figure (four diagrams of diatomic
//  molecules) → PSAC_PDF_QUESTIONS only.
//  Q3 labels a distillation apparatus diagram and matches diagrams to names.
//
//  ⚠ Alt text never names the answer.
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(
  // ── Q1 direct MCQs (excluding Q1.4 which requires the molecule diagrams) ─
  makeMCQ({ id:'g9s-pp22c-001', chapterId:'g9s-c1-atmosphere', subsection:'greenhouse_gases', difficulty:1,
    question:'A plant takes in carbon dioxide and sunlight, and releases oxygen. By which process do <b>plants manufacture their own food</b>?',
    options:['Combustion','Eutrophication','Photosynthesis','Respiration'], answer:'Photosynthesis',
    hint:'This process uses light energy to convert CO₂ and water into glucose.',
    explanation:'<b>Photosynthesis</b> converts carbon dioxide and water into glucose using sunlight, releasing oxygen as a by-product. Respiration is the reverse: it uses oxygen and releases CO₂. 📄 NCE 2022 exam.' }),

  makeMCQ({ id:'g9s-pp22c-002', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:1,
    question:'What is the name of the element with symbol <b>Cu</b>?',
    options:['Calcium','Carbon','Chromium','Copper'], answer:'Copper',
    hint:'Its symbol comes from the Latin word "cuprum".',
    explanation:'<b>Copper</b> (symbol Cu) takes its symbol from the Latin <i>cuprum</i>. Calcium is Ca, Carbon is C, and Chromium is Cr. 📄 NCE 2022 exam.' }),

  makeMCQ({ id:'g9s-pp22c-003', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:2,
    question:'What is the <b>valency of zinc</b>?',
    options:['1','2','3','4'], answer:'2',
    hint:'Zinc is in Group II of the periodic table.',
    explanation:'Zinc has a valency of <b>2</b>. It is in Group II and loses two electrons when it forms compounds, which is why zinc chloride is ZnCl<sub>2</sub>. 📄 NCE 2022 exam.' }),

  makeMCQ({ id:'g9s-pp22c-004', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:2,
    question:'What is the formula of <b>iron(II) chloride</b>? (Iron(II) has valency 2, chlorine has valency 1.)',
    options:['FeCl','FeCl<sub>2</sub>','Fe<sub>2</sub>Cl','Fe<sub>2</sub>Cl<sub>2</sub>'],
    answer:'FeCl<sub>2</sub>',
    hint:'Cross the valencies: iron\'s 2 becomes the subscript for Cl.',
    explanation:'Fe (valency 2) and Cl (valency 1) cross over to give <b>FeCl<sub>2</sub></b> — two chlorine atoms balance one iron(II) atom. 📄 NCE 2022 exam.' }),

  makeMCQ({ id:'g9s-pp22c-005', chapterId:'g9s-c3-language', subsection:'balancing_equations', difficulty:2,
    question:'Which chemical equation is correctly <b>balanced</b>?',
    options:['H<sub>2</sub> + Cl<sub>2</sub> &rarr; HCl',
             'H<sub>2</sub> + Cl<sub>2</sub> &rarr; 2HCl',
             'H<sub>2</sub> + Cl<sub>2</sub> &rarr; 3HCl',
             'H<sub>2</sub> + Cl<sub>2</sub> &rarr; 4HCl'],
    answer:'H<sub>2</sub> + Cl<sub>2</sub> &rarr; 2HCl',
    hint:'Count hydrogen and chlorine atoms on each side.',
    explanation:'H<sub>2</sub> + Cl<sub>2</sub> &rarr; <b>2HCl</b>: 2 H and 2 Cl on each side — balanced. The unbalanced version HCl has only 1 of each. 📄 NCE 2022 exam.' }),

  makeMCQ({ id:'g9s-pp22c-006', chapterId:'g9s-c4-metals', subsection:'metals_with_water_steam', difficulty:2,
    question:'Which metal <b>reacts readily with cold water</b>?',
    options:['Calcium','Copper','Gold','Silver'], answer:'Calcium',
    hint:'This metal is in Group II and sits high in the reactivity series.',
    explanation:'<b>Calcium</b> reacts vigorously with cold water: Ca + 2H<sub>2</sub>O → Ca(OH)<sub>2</sub> + H<sub>2</sub>. Copper, gold and silver are unreactive with water. 📄 NCE 2022 exam.' }),

  makeMCQ({ id:'g9s-pp22c-007', chapterId:'g9s-c2-mixtures', subsection:'choosing_a_technique', difficulty:2,
    question:'Which separation technique is used to <b>separate different dyes present in ink</b>?',
    options:['Chromatography','Distillation','Filtration','Crystallisation'],
    answer:'Chromatography',
    hint:'This technique exploits differences in solubility and how far dyes travel up paper.',
    explanation:'<b>Chromatography</b> separates dyes by their different affinities for the solvent and paper. Distillation separates liquids by boiling point; filtration and crystallisation work on solid-liquid mixtures. 📄 NCE 2022 exam.' }),

  makeMCQ({ id:'g9s-pp22c-008', chapterId:'g9s-c5-salts', subsection:'soluble_insoluble', difficulty:2,
    question:'Which salt is <b>insoluble</b> in water?',
    options:['Barium nitrate','Potassium carbonate','Silver chloride','Zinc sulfate'],
    answer:'Silver chloride',
    hint:'All nitrates are soluble; most carbonates and some chlorides are exceptions.',
    explanation:'<b>Silver chloride</b> is one of the few chlorides that is insoluble. All nitrates dissolve, potassium carbonate is soluble, and zinc sulfate is soluble. 📄 NCE 2022 exam.' }),

  makeMCQ({ id:'g9s-pp22c-009', chapterId:'g9s-c5-salts', subsection:'uses_of_salts', difficulty:1,
    question:'Which salt is used in <b>baking</b>?',
    options:['Ammonium nitrate','Calcium sulfate','Magnesium sulfate','Sodium bicarbonate'],
    answer:'Sodium bicarbonate',
    hint:'It releases carbon dioxide when heated, making mixtures rise.',
    explanation:'<b>Sodium bicarbonate</b> (sodium hydrogen carbonate / baking soda) decomposes on heating to release CO<sub>2</sub>, which causes dough and cakes to rise. Calcium sulfate is plaster of Paris. 📄 NCE 2022 exam.' }),

  // ── Adapted from Q2 (Air pollutants, greenhouse gases, acid rain) ─────────
  makeMCQ({ id:'g9s-pp22c-010', chapterId:'g9s-c1-atmosphere', subsection:'greenhouse_gases', difficulty:2,
    question:'What is the main <b>source of methane</b> as an air pollutant?',
    options:['Propellants in aerosol sprays','Oil spill from ships',
             'Decay of vegetation and animals','Lightning'],
    answer:'Decay of vegetation and animals',
    hint:'Methane is released when organic matter decomposes without oxygen.',
    explanation:'<b>Decay of vegetation and animals</b> (anaerobic decomposition) produces methane. Aerosol sprays are a source of CFCs; lightning produces oxides of nitrogen. 📄 NCE 2022 exam.' }),

  makeMCQ({ id:'g9s-pp22c-011', chapterId:'g9s-c1-atmosphere', subsection:'greenhouse_gases', difficulty:2,
    question:'Carbon dioxide is a greenhouse gas. Name <b>another greenhouse gas</b>.',
    options:['Nitrogen','Methane','Argon','Oxygen'], answer:'Methane',
    hint:'It is produced by cattle and in paddy fields.',
    explanation:'<b>Methane</b> is a potent greenhouse gas. Nitrogen, oxygen and argon make up most of the atmosphere but do not absorb infrared radiation in the same way. 📄 NCE 2022 exam.' }),

  makeMCQ({ id:'g9s-pp22c-012', chapterId:'g9s-c1-atmosphere', subsection:'acid_rain', difficulty:2,
    question:'Sulfur dioxide dissolves in rain to form acid rain. Which is a <b>harmful effect of acid rain</b> on the environment?',
    options:['It kills fish and corrodes limestone buildings',
             'It increases dissolved oxygen levels in rivers',
             'It removes soil nutrients and improves crop growth',
             'It depletes the ozone layer'],
    answer:'It kills fish and corrodes limestone buildings',
    hint:'Acid rain lowers the pH of soil and water, damaging both living and non-living things.',
    explanation:'Acid rain <b>lowers the pH</b> of rivers and lakes, killing fish, and attacks limestone and marble buildings and statues. Ozone depletion is caused by CFCs, not acid rain. 📄 NCE 2022 exam.' }),

  // ── Adapted from Q3 (Separation techniques) ──────────────────────────────
  makeMCQ({ id:'g9s-pp22c-013', chapterId:'g9s-c2-mixtures', subsection:'choosing_a_technique', difficulty:1,
    question:'Which technique is used to separate a mixture of <b>sand and water</b>?',
    options:['Filtration','Sublimation','Distillation','Chromatography'],
    answer:'Filtration',
    hint:'Sand is an insoluble solid suspended in water.',
    explanation:'<b>Filtration</b> separates an insoluble solid from a liquid. The sand stays on the filter paper while the water passes through. 📄 NCE 2022 exam.' }),

  makeMCQ({ id:'g9s-pp22c-014', chapterId:'g9s-c2-mixtures', subsection:'sublimation', difficulty:2,
    question:'Which technique is used to separate a mixture of <b>iodine and sand</b>?',
    options:['Filtration','Sublimation','Distillation','Crystallisation'],
    answer:'Sublimation',
    hint:'Iodine changes directly from solid to vapour when heated.',
    explanation:'<b>Sublimation</b> — iodine sublimes (solid → vapour) while sand does not. The iodine vapour is collected on a cold surface, leaving the sand behind. 📄 NCE 2022 exam.' }),

  // ── Adapted from Q4 (Language of Chemistry) ──────────────────────────────
  makeMCQ({ id:'g9s-pp22c-015', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:1,
    question:'The formula of sodium bromide is NaBr. Which pair of <b>elements</b> forms this compound?',
    options:['Nitrogen and Beryllium','Sodium and Bromine','Neon and Barium','Nitrogen and Barium'],
    answer:'Sodium and Bromine',
    hint:'Na is the symbol for sodium (from Latin Natrium); Br is bromine.',
    explanation:'Na = <b>Sodium</b> and Br = <b>Bromine</b>. N is nitrogen (not sodium), and Ba is barium (not bromine). 📄 NCE 2022 exam.' }),

  makeMCQ({ id:'g9s-pp22c-016', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:3,
    question:'Calcium has valency 2 and hydroxide (OH) has valency 1. What is the formula of <b>calcium hydroxide</b>?',
    options:['CaOH','Ca(OH)<sub>2</sub>','Ca<sub>2</sub>OH','CaOH<sub>2</sub>'],
    answer:'Ca(OH)<sub>2</sub>',
    hint:'Cross the valencies; bracket the polyatomic OH group before adding the subscript.',
    explanation:'Ca (valency 2) and OH (valency 1) cross to give two OH groups: <b>Ca(OH)<sub>2</sub></b>. Brackets are needed around OH before the subscript 2. 📄 NCE 2022 exam.' }),

  makeMCQ({ id:'g9s-pp22c-017', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:4,
    question:'Aluminium has valency 3 and sulfate (SO<sub>4</sub>) has valency 2. What is the formula of <b>aluminium sulfate</b>?',
    options:['AlSO<sub>4</sub>','Al<sub>2</sub>SO<sub>4</sub>','Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>','Al(SO<sub>4</sub>)<sub>3</sub>'],
    answer:'Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>',
    hint:'Cross the valencies 3 and 2; bracket the SO₄ group before adding the subscript.',
    explanation:'Al (valency 3) and SO<sub>4</sub> (valency 2) cross to give <b>Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub></b>. The brackets around SO<sub>4</sub> are essential — without them the 3 would only apply to oxygen. 📄 NCE 2022 exam.' }),

  makeMCQ({ id:'g9s-pp22c-018', chapterId:'g9s-c3-language', subsection:'balancing_equations', difficulty:4,
    question:'What coefficient, placed in <b>both</b> empty boxes, balances: Pb(NO<sub>3</sub>)<sub>2</sub> + [ ] KI &rarr; PbI<sub>2</sub> + [ ] KNO<sub>3</sub>?',
    options:['1','2','3','4'], answer:'2',
    hint:'PbI₂ needs 2 I atoms, so 2 KI are needed; check the K and NO₃ counts match.',
    explanation:'Pb(NO<sub>3</sub>)<sub>2</sub> + <b>2</b>KI &rarr; PbI<sub>2</sub> + <b>2</b>KNO<sub>3</sub>: 2 K, 2 I, 2 NO<sub>3</sub> on each side — balanced. 📄 NCE 2022 exam.' }),

  // ── Adapted from Q5 (Metals) ─────────────────────────────────────────────
  makeMCQ({ id:'g9s-pp22c-019', chapterId:'g9s-c4-metals', subsection:'metals_with_oxygen', difficulty:1,
    question:'What is the colour of the flame when <b>magnesium burns in oxygen</b>?',
    options:['Blue','Green','Red','White'], answer:'White',
    hint:'Magnesium ribbon produces a very bright flame of a distinctive colour.',
    explanation:'Magnesium burns with a dazzlingly <b>bright white flame</b>, producing a white powder of magnesium oxide. 📄 NCE 2022 exam.' }),

  makeMCQ({ id:'g9s-pp22c-020', chapterId:'g9s-c5-salts', subsection:'neutralisation', difficulty:2,
    question:'Metal oxides react with hydrochloric acid to form a salt and water. What <b>type of reaction</b> is this?',
    options:['Combustion','Displacement','Neutralisation','Sublimation'],
    answer:'Neutralisation',
    hint:'A base reacting with an acid always produces a salt and water.',
    explanation:'A metal oxide is a <b>base</b>, so its reaction with an acid is <b>neutralisation</b>: base + acid → salt + water. 📄 NCE 2022 exam.' }),

  makeMCQ({ id:'g9s-pp22c-021', chapterId:'g9s-c4-metals', subsection:'metals_with_acids', difficulty:2,
    question:'What is the missing product in the word equation: <b>Magnesium oxide + hydrochloric acid → magnesium chloride + _____</b>?',
    options:['Hydrogen','Water','Oxygen','Carbon dioxide'], answer:'Water',
    hint:'Acid + base (metal oxide) → salt + this.',
    explanation:'MgO + 2HCl → MgCl<sub>2</sub> + <b>water</b>. This is neutralisation: a base plus an acid gives a salt and water (not hydrogen, since the metal is already oxidised). 📄 NCE 2022 exam.' }),

  makeMCQ({ id:'g9s-pp22c-022', chapterId:'g9s-c4-metals', subsection:'reactivity_series', difficulty:3,
    question:'A reactivity series lists: Magnesium &gt; Zinc &gt; X &gt; Copper. Which metal could <b>X</b> be?',
    options:['Calcium','Copper','Iron','Sodium'], answer:'Iron',
    hint:'Iron sits between zinc and copper in the standard reactivity series.',
    explanation:'<b>Iron</b> (or lead) sits between zinc and copper in the reactivity series. Calcium and sodium are above magnesium, not between zinc and copper. 📄 NCE 2022 exam.' }),

  makeMCQ({ id:'g9s-pp22c-023', chapterId:'g9s-c4-metals', subsection:'equations_for_metals', difficulty:4,
    question:'What is the <b>balanced chemical equation</b> for magnesium reacting with copper(II) sulfate solution?',
    options:['Mg + CuSO<sub>4</sub> &rarr; MgSO<sub>4</sub> + Cu',
             'Mg + CuSO<sub>4</sub> &rarr; MgO + CuS',
             '2Mg + CuSO<sub>4</sub> &rarr; 2MgO + Cu',
             'Mg + Cu + SO<sub>4</sub> &rarr; MgSO<sub>4</sub>'],
    answer:'Mg + CuSO<sub>4</sub> &rarr; MgSO<sub>4</sub> + Cu',
    hint:'This is a displacement reaction; both sides must have the same atoms.',
    explanation:'<b>Mg + CuSO<sub>4</sub> → MgSO<sub>4</sub> + Cu</b> — magnesium displaces copper, and the equation is already balanced (1 Mg, 1 Cu, 1 S, 4 O on each side). 📄 NCE 2022 exam.' }),

  makeMCQ({ id:'g9s-pp22c-pdf-001', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:2,
    question:'<img src="assets/past-papers/g9-chemistry-2022/q1d.png" alt="Four molecular diagrams labeled A, B, C and D, each showing different arrangements and numbers of atoms" style="max-width:100%;margin-bottom:8px"><br>Which diagram represents a <b>carbon dioxide</b> molecule?',
    options:['A','B','C','D'], answer:'D',
    hint:'Carbon dioxide (CO₂) has one carbon atom bonded to two oxygen atoms.',
    explanation:'Carbon dioxide (CO<sub>2</sub>) has a linear O–C–O arrangement of three atoms. Diagram <b>D</b> shows this: two oxygen atoms flanking one carbon atom. 📄 NCE 2022 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp22c-pdf-002', chapterId:'g9s-c1-atmosphere', marks:8, year:2022, grade:9, subject:'Science (Chemistry)', type:'written',
    question:'Question 2. (a) Match each air pollutant to its corresponding main source: Sulfur dioxide, Methane, Nitrogen dioxide, CFCs, Carbon monoxide — to sources: Propellants in aerosol sprays; Oil spill from ships; Decay of vegetation and animals; Lightning; Volcanic eruptions; Incomplete combustion of fossil fuels. An example is given. [4] (b)(i) Name another greenhouse gas (besides carbon dioxide). [1] (b)(ii) Give two consequences of global warming on the environment. [2] (c) Sulfur dioxide causes acid rain. Give one harmful effect of acid rain on the environment. [1]',
    markScheme:'(a) Sulfur dioxide → Volcanic eruptions; Methane → Decay of vegetation and animals; Nitrogen dioxide → Lightning; CFCs → Propellants in aerosol sprays; Carbon monoxide → Incomplete combustion of fossil fuels. (b)(i) Methane (also accept water vapour, nitrous oxide). (b)(ii) Any two of: melting of polar ice caps, rise in sea level, more frequent droughts/floods, coral bleaching, loss of biodiversity, stronger cyclones. (c) Kills aquatic life / corrodes limestone buildings / damages crops / lowers soil pH.' },

  { id:'g9s-pp22c-pdf-003', chapterId:'g9s-c2-mixtures', marks:11, year:2022, grade:9, subject:'Science (Chemistry)', type:'written',
    image:'assets/past-papers/g9-chemistry-2022/q3.png',
    question:'Question 3. Fig. 3.1 shows a distillation set-up. (a) Label boxes 1–5 using words from: Beaker, Distillation flask, Thermometer, Distillate, Filtrate, Conical flask, Bunsen burner. [5] (b) Using an arrow on Fig. 3.1, show where water enters the condenser. [1] (c) Match each illustration in Column A to its correct separation technique name in Column B: (three diagrams — sublimation apparatus, filtration funnel, crystallisation evaporating dish — matched to Filtration, Sublimation, Crystallisation, Chromatography). [3] (d) Name the separation technique used to separate: (i) sand and water [1]; (ii) iodine and sand [1].',
    markScheme:'(a) Box 1 = Thermometer; Box 2 = Distillation flask; Box 3 = Bunsen burner; Box 4 = Conical flask; Box 5 = Distillate. (b) Arrow pointing at the lower opening of the condenser (water enters at the bottom). (c) Sublimation apparatus → Sublimation; funnel-and-flask → Filtration; evaporating dish → Crystallisation. (d)(i) Filtration. (d)(ii) Sublimation.' },

  { id:'g9s-pp22c-pdf-004', chapterId:'g9s-c3-language', marks:10, year:2022, grade:9, subject:'Science (Chemistry)', type:'written',
    question:'Question 4. (a) Classify the following as Symbol or Formula: H₂SO₄, Pb, Ca, CO, K₂O. [5] (b) Name the two elements which form the compound with formula NaBr. [2] (c) Write the formula of: (i) Calcium hydroxide; (ii) Aluminium sulfate. [2] (d) Fill in the boxes to balance: Pb(NO₃)₂ + [ ]KI → PbI₂ + [ ]KNO₃. [1]',
    markScheme:'(a) Symbols: Pb, Ca. Formulae: H₂SO₄, CO, K₂O. (b) Sodium and Bromine. (c)(i) Ca(OH)₂. (c)(ii) Al₂(SO₄)₃. (d) Both boxes = 2.' },

  { id:'g9s-pp22c-pdf-005', chapterId:'g9s-c4-metals', marks:11, year:2022, grade:9, subject:'Science (Chemistry)', type:'written',
    question:'Question 5. (a) Fig. 5.1 illustrates the burning of magnesium in oxygen. (i) What is the colour of the flame when magnesium burns in oxygen? [1] (ii) Give one safety precaution when burning magnesium. [1] (b) Metal oxides react with hydrochloric acid to form salt and water. (i) Name this type of reaction. [1] (ii) Write the word equation for the reaction between magnesium oxide and hydrochloric acid. [1] (c) Table 5.1 lists four metals in decreasing order of reactivity: Magnesium, Zinc, X, Copper. (i) Which metal could X be? [1] (ii) Indicate whether a displacement reaction occurs for: 1. X and magnesium sulfate solution; 2. Zinc and copper(II) nitrate solution. [2] (d)(i) Write a balanced equation for the reaction between magnesium and copper(II) sulfate. [2] (d)(ii) Give two observations for this reaction. [2]',
    markScheme:'(a)(i) White (bright white). (a)(ii) Do not look directly at the flame / use dark goggles. (b)(i) Neutralisation. (b)(ii) Magnesium oxide + hydrochloric acid → magnesium chloride + water. (c)(i) Iron (or lead). (c)(ii) 1. X and magnesium sulfate: No (X is below Mg). 2. Zinc and copper nitrate: Yes (Zn is above Cu). (d)(i) Mg + CuSO₄ → MgSO₄ + Cu. (d)(ii) Any two of: blue colour of solution fades / solution turns colourless; red/brown solid (copper) appears on the magnesium; magnesium gradually disappears.' }
);
