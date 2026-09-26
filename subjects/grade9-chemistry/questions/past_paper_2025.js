'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  NCE 2025 Science — Chemistry component (N530, 50 marks, 45 minutes)
//  Source: Mauritius Examinations Syndicate
//    library/g9-2025-science-chemistry-XXXX.pdf  (question paper)
//    library/g9-2025-chemistry-ec93f3.pdf         (examiners' report)
//
//  All 10 Q1 MCQs are knowledge-based (no diagram identification required)
//  and go directly into STATIC_QUESTIONS. Q3 has a metal-burning
//  observations table; Q5 refers to a distillation apparatus diagram —
//  both are described fully in PSAC_PDF_QUESTIONS.
//
//  ⚠ Alt text never names the answer.
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(
  // ── Q1 direct MCQs (all 10 are knowledge-based, no artwork) ─────────────
  makeMCQ({ id:'g9s-pp25c-001', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:2,
    question:'Which <b>element</b> exists as a <b>diatomic molecule</b>?',
    options:['Carbon','Nitrogen','Sulfur','Zinc'], answer:'Nitrogen',
    hint:'Diatomic molecules contain two atoms of the same element bonded together.',
    explanation:'<b>Nitrogen</b> exists as N<sub>2</sub>, a diatomic molecule. Carbon forms giant covalent structures, sulfur forms S<sub>8</sub> rings, and zinc is a metal that does not form diatomic molecules. 📄 NCE 2025 exam.' }),

  makeMCQ({ id:'g9s-pp25c-002', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:2,
    question:'Which compound contains exactly <b>three different elements</b>?',
    options:['K<sub>2</sub>O','MgCl<sub>2</sub>','NaHCO<sub>3</sub>','Na<sub>2</sub>CO<sub>3</sub>'],
    answer:'Na<sub>2</sub>CO<sub>3</sub>',
    hint:'Count the types of element (not the number of atoms) in each formula.',
    explanation:'Na<sub>2</sub>CO<sub>3</sub> contains <b>three</b> elements: sodium (Na), carbon (C) and oxygen (O). K<sub>2</sub>O and MgCl<sub>2</sub> each have two, while NaHCO<sub>3</sub> has four (Na, H, C, O). 📄 NCE 2025 exam.' }),

  makeMCQ({ id:'g9s-pp25c-003', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:3,
    question:'Metal X forms the compound XCl<sub>2</sub>. What is the <b>formula of X hydroxide</b>?',
    options:['X(OH)<sub>2</sub>','XOH<sub>2</sub>','X<sub>2</sub>OH','XOH'],
    answer:'X(OH)<sub>2</sub>',
    hint:'If X forms XCl₂, its valency is 2. Cross the valencies with hydroxide (valency 1).',
    explanation:'XCl<sub>2</sub> shows X has valency 2. Hydroxide OH has valency 1. Crossing valencies gives <b>X(OH)<sub>2</sub></b>. Brackets are required because two OH groups are needed. 📄 NCE 2025 exam.' }),

  makeMCQ({ id:'g9s-pp25c-004', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:3,
    question:'A table shows polyatomic ions and their valencies. Which row is <b>correct</b>?',
    options:['Carbonate (CO<sub>3</sub>) — valency 1',
             'Ammonium (NH<sub>4</sub>) — valency 2',
             'Hydroxide (OH) — valency 1',
             'Nitrate (NO<sub>3</sub>) — valency 2'],
    answer:'Hydroxide (OH) — valency 1',
    hint:'Hydroxide is OH⁻ — one negative charge means valency 1.',
    explanation:'<b>Hydroxide (OH)</b> has valency 1 (one negative charge). Carbonate is CO<sub>3</sub><sup>2−</sup> (valency 2), ammonium is NH<sub>4</sub><sup>+</sup> (valency 1), and nitrate is NO<sub>3</sub><sup>−</sup> (valency 1). 📄 NCE 2025 exam.' }),

  makeMCQ({ id:'g9s-pp25c-005', chapterId:'g9s-c1-atmosphere', subsection:'air_pollutants', difficulty:2,
    question:'A car is fitted with a <b>catalytic converter</b>. Which gas is changed by the catalytic converter?',
    options:['Carbon monoxide','Oxygen','Nitrogen','Water vapour'],
    answer:'Carbon monoxide',
    hint:'The converter reduces a poisonous gas produced by incomplete combustion.',
    explanation:'Catalytic converters convert <b>carbon monoxide</b> (CO) — a toxic gas from incomplete combustion — into carbon dioxide (CO<sub>2</sub>). They also convert oxides of nitrogen into N<sub>2</sub>. 📄 NCE 2025 exam.' }),

  makeMCQ({ id:'g9s-pp25c-006', chapterId:'g9s-c4-metals', subsection:'reactivity_series', difficulty:2,
    question:'Four metals — Ca, Fe, Mg and Zn — are added to cold water. Which reacts <b>most vigorously</b>?',
    options:['Ca','Fe','Mg','Zn'], answer:'Ca',
    hint:'Use the reactivity series to find the most reactive of the four.',
    explanation:'In the reactivity series, <b>calcium</b> (Ca) is the most reactive of the four metals listed — it reacts vigorously with cold water, producing calcium hydroxide and hydrogen gas. Mg reacts only slowly with cold water; Fe and Zn react very slowly or not at all with cold water. 📄 NCE 2025 exam.' }),

  makeMCQ({ id:'g9s-pp25c-007', chapterId:'g9s-c1-atmosphere', subsection:'eutrophication', difficulty:3,
    question:'During <b>eutrophication</b>, algae cover the water surface. Which gas <b>decreases</b> in the water?',
    options:['Carbon dioxide','Methane','Nitrogen','Oxygen'],
    answer:'Oxygen',
    hint:'Algae block sunlight, aquatic plants die, and decomposition by bacteria consumes a gas.',
    explanation:'Eutrophication causes dense algal blooms that block sunlight. Aquatic plants die; bacteria decomposing dead matter consume dissolved <b>oxygen</b>, causing oxygen levels to fall (deoxygenation). 📄 NCE 2025 exam.' }),

  makeMCQ({ id:'g9s-pp25c-008', chapterId:'g9s-c5-salts', subsection:'soluble_insoluble', difficulty:2,
    question:'Which salt is <b>insoluble</b> in water?',
    options:['Ammonium nitrate','Barium sulfate','Sodium bicarbonate','Sodium chloride'],
    answer:'Barium sulfate',
    hint:'Most sulfates are soluble, but there are important exceptions.',
    explanation:'<b>Barium sulfate</b> (BaSO<sub>4</sub>) is insoluble in water. The other three — ammonium nitrate, sodium bicarbonate and sodium chloride — are all soluble. 📄 NCE 2025 exam.' }),

  makeMCQ({ id:'g9s-pp25c-009', chapterId:'g9s-c1-atmosphere', subsection:'air_pollutants', difficulty:3,
    question:'Lightning in the atmosphere causes nitrogen and oxygen to combine. Which gas is formed <b>during lightning</b>?',
    options:['Carbon monoxide','Carbon dioxide','Nitrogen dioxide','Sulfur dioxide'],
    answer:'Nitrogen dioxide',
    hint:'The high temperature of a lightning bolt is enough to make nitrogen react with oxygen.',
    explanation:'Lightning provides enough energy for N<sub>2</sub> + O<sub>2</sub> → 2NO (nitrogen monoxide), which oxidises further to <b>nitrogen dioxide (NO<sub>2</sub>)</b> in the atmosphere. NO<sub>2</sub> contributes to acid rain. 📄 NCE 2025 exam.' }),

  makeMCQ({ id:'g9s-pp25c-010', chapterId:'g9s-c4-metals', subsection:'metals_with_acids', difficulty:2,
    question:'Metal Y is added to hydrochloric acid. The resulting solution turns <b>pale green</b>. What is metal Y?',
    options:['Aluminium','Copper','Iron','Zinc'], answer:'Iron',
    hint:'The pale green colour identifies the salt formed in solution.',
    explanation:'Iron reacts with HCl to form <b>iron(II) chloride</b> (FeCl<sub>2</sub>), which gives the solution its characteristic <b>pale green</b> colour. Copper does not react with HCl; aluminium gives a colourless solution; zinc gives a colourless solution. 📄 NCE 2025 exam.' }),

  // ── Adapted from Q2 (Salts — formulae, uses, neutralisation) ─────────────
  makeMCQ({ id:'g9s-pp25c-011', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:3,
    question:'Iron(III) has valency 3 and chloride has valency 1. What is the formula of <b>iron(III) chloride</b>?',
    options:['FeCl','FeCl<sub>2</sub>','FeCl<sub>3</sub>','Fe<sub>3</sub>Cl'],
    answer:'FeCl<sub>3</sub>',
    hint:'Cross the valencies: iron valency 3, chloride valency 1.',
    explanation:'Crossing valencies: Fe (3) and Cl (1) gives <b>FeCl<sub>3</sub></b>. Three chloride ions balance one iron(III) ion. 📄 NCE 2025 exam.' }),

  makeMCQ({ id:'g9s-pp25c-012', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:2,
    question:'Potassium has valency 1 and sulfate (SO<sub>4</sub>) has valency 2. What is the formula of <b>potassium sulfate</b>?',
    options:['KSO<sub>4</sub>','K<sub>2</sub>SO<sub>4</sub>','K(SO<sub>4</sub>)<sub>2</sub>','K<sub>2</sub>(SO<sub>4</sub>)<sub>2</sub>'],
    answer:'K<sub>2</sub>SO<sub>4</sub>',
    hint:'Cross the valencies 1 and 2.',
    explanation:'K (valency 1) and SO<sub>4</sub> (valency 2) cross to give <b>K<sub>2</sub>SO<sub>4</sub></b>. Two potassium ions balance one sulfate ion. 📄 NCE 2025 exam.' }),

  makeMCQ({ id:'g9s-pp25c-013', chapterId:'g9s-c5-salts', subsection:'uses_of_salts', difficulty:1,
    question:'Which salt is used as a <b>laxative</b> in medicine?',
    options:['Calcium sulfate','Magnesium sulfate','Potassium nitrate','Sodium chloride'],
    answer:'Magnesium sulfate',
    hint:'It is sold as Epsom salt.',
    explanation:'<b>Magnesium sulfate</b> (MgSO<sub>4</sub>), known as Epsom salt, is used as a laxative. Calcium sulfate is plaster of Paris; potassium nitrate is a fertiliser; sodium chloride is table salt. 📄 NCE 2025 exam.' }),

  makeMCQ({ id:'g9s-pp25c-014', chapterId:'g9s-c5-salts', subsection:'neutralisation', difficulty:2,
    question:'Which <b>acid</b> would you use to prepare <b>magnesium nitrate</b>?',
    options:['Hydrochloric acid','Nitric acid','Sulfuric acid','Carbonic acid'],
    answer:'Nitric acid',
    hint:'The salt name tells you which acid was used — the acid radical matches.',
    explanation:'Magnesium nitrate contains the nitrate ion, which comes from <b>nitric acid</b>: Mg + HNO<sub>3</sub> → Mg(NO<sub>3</sub>)<sub>2</sub> + H<sub>2</sub>. 📄 NCE 2025 exam.' }),

  // ── Adapted from Q3 (Metals) ──────────────────────────────────────────────
  makeMCQ({ id:'g9s-pp25c-015', chapterId:'g9s-c4-metals', subsection:'metals_with_oxygen', difficulty:1,
    question:'When a metal burns in oxygen it forms a <b>metal oxide</b>. What class of compound is a metal oxide?',
    options:['Acid','Base','Indicator','Salt'],
    answer:'Base',
    hint:'Metal oxides react with acids to form salts and water.',
    explanation:'Metal oxides are <b>bases</b> — they react with acids in neutralisation reactions to produce a salt and water. 📄 NCE 2025 exam.' }),

  makeMCQ({ id:'g9s-pp25c-016', chapterId:'g9s-c4-metals', subsection:'reactivity_series', difficulty:3,
    question:'Three metals P, Q and R were heated in oxygen. P glows with yellow sparks; Q burns with a white flame leaving white ash; R does not burn and produces a black solid. Which metal is the <b>most reactive</b>?',
    options:['P','Q','R','Cannot tell'], answer:'Q',
    hint:'The metal that burns most vigorously and completely is the most reactive.',
    explanation:'<b>Q</b> burns with a brilliant white flame producing white ash (consistent with magnesium), showing it reacts most vigorously with oxygen and is the most reactive. R does not burn at all and is therefore the least reactive (consistent with copper). 📄 NCE 2025 exam.' }),

  makeMCQ({ id:'g9s-pp25c-017', chapterId:'g9s-c4-metals', subsection:'metals_with_acids', difficulty:1,
    question:'Magnesium is added to sulfuric acid. What <b>gas</b> is produced?',
    options:['Carbon dioxide','Chlorine','Hydrogen','Oxygen'],
    answer:'Hydrogen',
    hint:'All metals above hydrogen in the reactivity series release this gas with acids.',
    explanation:'Mg + H<sub>2</sub>SO<sub>4</sub> → MgSO<sub>4</sub> + <b>H<sub>2</sub></b>. Any reactive metal displaces hydrogen from an acid, releasing hydrogen gas. 📄 NCE 2025 exam.' }),

  makeMCQ({ id:'g9s-pp25c-018', chapterId:'g9s-c4-metals', subsection:'predicting_reactions', difficulty:2,
    question:'Which metal <b>does not react</b> with dilute sulfuric acid?',
    options:['Aluminium','Copper','Iron','Zinc'], answer:'Copper',
    hint:'Metals below hydrogen in the reactivity series cannot displace hydrogen from acids.',
    explanation:'<b>Copper</b> is below hydrogen in the reactivity series and cannot displace hydrogen from acids, so it does not react with dilute sulfuric acid. 📄 NCE 2025 exam.' }),

  // ── Adapted from Q4 (Air pollution — pollutant sources and effects) ────────
  makeMCQ({ id:'g9s-pp25c-019', chapterId:'g9s-c1-atmosphere', subsection:'air_pollutants', difficulty:2,
    question:'What is the <b>main source</b> of <b>chlorofluorocarbons (CFCs)</b> in the atmosphere?',
    options:['Burning of fossil fuels','Coolants and aerosol sprays','Volcanic eruptions','Vehicle exhaust'],
    answer:'Coolants and aerosol sprays',
    hint:'CFCs are synthetic chemicals used in refrigerators and old spray cans.',
    explanation:'<b>CFCs</b> are released from old refrigerators (as coolant), air conditioners and aerosol sprays. They destroy the ozone layer, increasing UV radiation reaching Earth. 📄 NCE 2025 exam.' }),

  makeMCQ({ id:'g9s-pp25c-020', chapterId:'g9s-c1-atmosphere', subsection:'greenhouse_gases', difficulty:2,
    question:'What is the main <b>harmful effect</b> of <b>methane (CH<sub>4</sub>)</b> in the atmosphere?',
    options:['It causes acid rain','It depletes the ozone layer','It contributes to the greenhouse effect','It is directly poisonous to humans'],
    answer:'It contributes to the greenhouse effect',
    hint:'Methane absorbs outgoing infrared radiation from Earth.',
    explanation:'<b>Methane</b> is a potent greenhouse gas: it absorbs infrared radiation re-emitted from Earth's surface, trapping heat and contributing to global warming (the <b>greenhouse effect</b>). 📄 NCE 2025 exam.' }),

  // ── Adapted from Q5 (Separation techniques and distillation) ─────────────
  makeMCQ({ id:'g9s-pp25c-021', chapterId:'g9s-c2-mixtures', subsection:'choosing_a_technique', difficulty:2,
    question:'Lead sulfate (PbSO<sub>4</sub>) is an <b>insoluble solid</b> mixed with water. Which technique would you use to separate them?',
    options:['Crystallisation','Distillation','Filtration','Sublimation'],
    answer:'Filtration',
    hint:'The technique for separating an insoluble solid from a liquid.',
    explanation:'<b>Filtration</b> is used to separate an insoluble solid from a liquid. The water passes through the filter paper while the PbSO<sub>4</sub> is retained as a residue. 📄 NCE 2025 exam.' }),

  makeMCQ({ id:'g9s-pp25c-022', chapterId:'g9s-c2-mixtures', subsection:'choosing_a_technique', difficulty:2,
    question:'A solution of zinc sulfate (ZnSO<sub>4</sub>) in water is available. Which technique gives you <b>ZnSO<sub>4</sub> crystals</b>?',
    options:['Crystallisation','Distillation','Filtration','Sublimation'],
    answer:'Crystallisation',
    hint:'The technique involves evaporating the solvent slowly so a solid forms from solution.',
    explanation:'<b>Crystallisation</b> is used to obtain a solid solute from its solution by controlled evaporation of the solvent. As the solution becomes concentrated, ZnSO<sub>4</sub> crystals form. 📄 NCE 2025 exam.' }),

  makeMCQ({ id:'g9s-pp25c-023', chapterId:'g9s-c2-mixtures', subsection:'distillation', difficulty:2,
    question:'In a distillation apparatus, the <b>condenser</b> is the part that …',
    options:['Heats the liquid to boiling','Collects the distillate','Converts vapour back to liquid','Measures the temperature'],
    answer:'Converts vapour back to liquid',
    hint:'Cool water flows around the inner tube of the condenser.',
    explanation:'The <b>condenser</b> has cold water flowing around the outside of an inner tube; this cools the vapour passing through and converts it back to liquid (the distillate). 📄 NCE 2025 exam.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp25c-pdf-001', chapterId:'g9s-c5-salts', marks:11, year:2025, grade:9, subject:'Science (Chemistry)', type:'written',
    question:'Question 2. (a) Write the chemical formula for each of the following salts. Use the valency table provided. (i) Sodium nitrate [1]; (ii) Potassium sulfate [1]; (iii) Iron(III) chloride [1]. (b) Match each salt to its correct use: Calcium sulfate, Sodium chloride, Potassium nitrate, Magnesium sulfate. Uses: laxative, enhance taste of food, promote plant growth, make plaster of Paris. [4] (c) Define neutralisation. [1] (d) Name a substance used to reduce the amount of sulfur dioxide released from coal-fired power stations. [1] (e) State which acid you would use to prepare: (i) Magnesium nitrate [1]; (ii) Sodium chloride [1].',
    markScheme:'(a)(i) NaNO₃. (a)(ii) K₂SO₄. (a)(iii) FeCl₃. (b) Calcium sulfate → make plaster of Paris; Sodium chloride → enhance taste of food; Potassium nitrate → promote plant growth; Magnesium sulfate → laxative. (c) A reaction between an acid and a base (alkali) to produce a salt and water only / a reaction in which the pH is brought to 7. (d) Calcium carbonate (limestone / lime). (e)(i) Nitric acid. (e)(ii) Hydrochloric acid.' },

  { id:'g9s-pp25c-pdf-002', chapterId:'g9s-c4-metals', marks:10, year:2025, grade:9, subject:'Science (Chemistry)', type:'written',
    question:'Question 3. Three metals P, Q and R were heated in oxygen. Their observations are: Metal P — glows with yellow sparks; Metal Q — burns with a white flame, leaves white ash; Metal R — does not burn, leaves a black solid. (a) State the class of compound formed when a metal burns in oxygen. [1] (b) Which metal is most reactive? Explain your answer. [2] (c) Which metal is least reactive? Give its name. [1] (d) State one safety precaution when heating metals. [1] (e) Magnesium ribbon is added to sulfuric acid. (i) Name the gas produced. [1] (f) Name a metal that would NOT react with dilute sulfuric acid. [1] (g) Calcium reacts with cold water. (i) Write the word equation for this reaction. [1] (ii) Write a balanced chemical equation for this reaction. [2]',
    markScheme:'(a) Metal oxide (a base). (b) Q is the most reactive; it burns most vigorously, producing a white flame and white ash (magnesium). (c) R is the least reactive — it does not burn and forms a black solid (copper/copper oxide). (d) Any valid precaution: wear safety goggles / use tongs / do not look directly at the flame. (e)(i) Hydrogen. (f) Copper (or silver or mercury). (g)(i) Calcium + water → calcium hydroxide + hydrogen. (g)(ii) Ca + 2H₂O → Ca(OH)₂ + H₂.' },

  { id:'g9s-pp25c-pdf-003', chapterId:'g9s-c1-atmosphere', marks:10, year:2025, grade:9, subject:'Science (Chemistry)', type:'written',
    question:'Question 4. (a) A table of air pollutants is shown. Complete the missing source or effect for each pollutant. (i) CFCs — source: ……… [1]; (ii) NO — effect: ……… [1]; (iii) SO₂ — source: ……… [1]; (iv) CH₄ — effect: ……… [1]. (b) Global warming causes sea levels to rise and the climate to change. Describe TWO effects of global warming on beaches and the marine environment. [4] (c) Give TWO measures that governments can take to reduce global warming. [2]',
    markScheme:'(a)(i) CFCs source: coolants in refrigerators / air conditioners / aerosol sprays. (a)(ii) NO effect: poisonous / toxic to living organisms. (a)(iii) SO₂ source: coal-fired power stations / burning fossil fuels containing sulfur / volcanic eruptions. (a)(iv) CH₄ effect: greenhouse effect / global warming. (b) Any two of: beaches may be submerged / loss of coastal habitats / coral bleaching / increased sea temperature harms marine life / more frequent storms and flooding / species loss. (c) Any two of: use renewable energy sources / plant trees / reduce use of fossil fuels / use public transport / impose carbon taxes / develop electric vehicles.' },

  { id:'g9s-pp25c-pdf-004', chapterId:'g9s-c2-mixtures', marks:9, year:2025, grade:9, subject:'Science (Chemistry)', type:'written',
    image:'assets/past-papers/g9-chemistry-2025/q5.png',
    question:'Question 5. (a) State the best separation technique for each mixture: (i) A mixture of lead sulfate (PbSO₄) and water [1]; (ii) Obtaining zinc sulfate crystals (ZnSO₄) from its solution [1]; (iii) A mixture of iodine, sand and sodium chloride (to collect pure iodine) [1]. (b) Fig. 5.1 shows a distillation apparatus. Part A is the round-bottomed flask and Part B is the glass tube surrounded by cold water. (i) What is the name of part A? [1] (ii) What is the name of part B? [1] (iii) State the function of part B. [1] (iv) Two mistakes are present in the diagram — identify them. [2] (v) Explain why boiling chips are added to the flask. [1]',
    markScheme:'(a)(i) Filtration. (a)(ii) Crystallisation. (a)(iii) Sublimation. (b)(i) Distillation flask (round-bottomed flask). (b)(ii) Condenser (Liebig condenser). (b)(iii) The condenser cools the vapour and converts it back into a liquid (the distillate). (b)(iv) Any two of: thermometer bulb not at the side-arm opening / condenser water flowing in the wrong direction (should enter at bottom, exit at top) / collection flask sealed (should be open to atmosphere) / thermometer touching the liquid. (b)(v) Boiling chips provide nucleation points that prevent bumping (superheating), ensuring smooth and even boiling.' }
);
