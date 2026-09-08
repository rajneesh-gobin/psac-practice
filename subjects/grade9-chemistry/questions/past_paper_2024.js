'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  NCE 2024 Science - past-paper questions adapted to MCQ format, plus the
//  written questions for the past-papers screen.
//  Source: Mauritius Examinations Syndicate,
//    past-papers/nce/science-biology/2024-Biology.pdf    (N530, 50 marks)
//    past-papers/nce/science-chemistry/2024-Chemistry.pdf (50 marks)
//
//  ⚠⚠ PHYSICS 2024 IS NOT IN THIS REPOSITORY. The NCE assesses Science as
//     three separate papers (Biology, Chemistry, Physics) and this pack
//     carries the exam's own B/C/P split, but past-papers/nce/science-physics/
//     holds only 2021, 2022, 2023 and 2025 - there is no 2024 paper to read.
//     So this file covers TWO of the three 2024 papers, and the g9s-p1..p5
//     chapters get nothing from it. Do not read the absence as "physics was
//     not examined in 2024"; the paper is simply missing here.
//
//  ⚠ Nine figures are cropped into assets/past-papers/g9-science-2024/. They
//    were rendered through Chrome's PDF viewer over CDP and cropped with
//    Page.captureScreenshot's `clip` (scratchpad/pdf-crop.js) - poppler on this
//    machine is pdftotext ONLY, with no pdftoppm or pdftocairo.
//
//  ⚠⚠ ONE QUESTION DELIBERATELY DID NOT BECOME A PRACTICE ITEM. Biology
//     Q4(e)(ii) gives a white blood cell "with a magnification of x 8000" and
//     asks for its ACTUAL size - the child measures the printed drawing with a
//     ruler and divides. A crop displayed at whatever size the browser picks is
//     a different measurement, so a practice version of it would mark a correct
//     reading wrong. It is kept as a written item whose mark scheme teaches the
//     METHOD (actual = image size / magnification), and the adapted item asks
//     for that method rather than for a number.
//
//  ⚠ Alt text never names the answer.
// ══════════════════════════════════════════════════════════════════════════

// ⚠ THIS NAME MUST BE UNIQUE ACROSS EVERY PACK. Question files are plain
//   scripts and several harnesses (and file:// dev) execute the whole corpus in
//   ONE context, so a bare top-level const collides the moment a second pack
//   declares it - which is exactly what the science split caused when all three
//   copies inherited _g9sc24. Same collision class as CHAPTERS and SYLLABUS.
const _g9chem24 = (file, alt) =>
  `<img src="assets/past-papers/g9-science-2024/${file}.png" alt="${alt}"` +
  ` style="display:block;margin:8px auto;max-width:min(100%,420px);height:auto;` +
  `border-radius:6px;background:#fff">`;

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp24c-002', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:1,
    question:'The diagram shows a molecule of ammonia. How many <b>hydrogen atoms</b> are there in one molecule?' +
      _g9chem24('c2-ammonia', 'A diagram of one central atom joined by short lines to several smaller atoms'),
    options:['3','1','2','4'], answer:'3',
    hint:'Count only the circles labelled H.',
    explanation:'The nitrogen atom is joined to <b>three</b> hydrogen atoms, which is why ammonia is written NH<sub>3</sub>.' }),
  makeMCQ({ id:'g9s-pp24c-003', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:2,
    question:'What is the <b>valency of aluminium</b>?',
    options:['3','1','2','4'], answer:'3',
    hint:'Aluminium is in Group III of the periodic table.',
    explanation:'Aluminium is in Group III, so it loses three electrons and has a valency of <b>3</b> - which is why its oxide is Al<sub>2</sub>O<sub>3</sub>.' }),
  makeMCQ({ id:'g9s-pp24c-004', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:1,
    question:'A methane molecule is one carbon atom joined to four hydrogen atoms. What is its <b>formula</b>?',
    options:['CH<sub>4</sub>','CH<sub>2</sub>','C<sub>2</sub>H','C<sub>4</sub>H'], answer:'CH<sub>4</sub>',
    hint:'The small number goes after the atom it counts.',
    explanation:'One carbon and four hydrogens is written <b>CH<sub>4</sub></b>. The subscript follows the symbol it belongs to, so C<sub>4</sub>H would mean four carbons and one hydrogen.' }),
  makeMCQ({ id:'g9s-pp24c-005', chapterId:'g9s-c1-atmosphere', subsection:'air_pollutants', difficulty:2,
    question:'The <b>ozone layer</b> is depleted by ...........',
    options:['chlorofluorocarbons','carbon monoxide','oxides of nitrogen','sulfur dioxide'], answer:'chlorofluorocarbons',
    hint:'These were once used in fridges and aerosol cans, and are known by their initials.',
    explanation:'<b>Chlorofluorocarbons (CFCs)</b> release chlorine high in the atmosphere, which breaks ozone apart. Sulfur dioxide and oxides of nitrogen cause acid rain instead.' }),
  makeMCQ({ id:'g9s-pp24c-006', chapterId:'g9s-c1-atmosphere', subsection:'eutrophication', difficulty:2,
    question:'Which of the following will cause <b>eutrophication</b>?',
    options:['Fertilisers from agriculture','Smoke from factories','Oil spillage from ships','Plastic objects in rivers'],
    answer:'Fertilisers from agriculture',
    hint:'Eutrophication starts with too many nutrients in the water.',
    explanation:'<b>Fertiliser</b> washed into a river adds nitrates and phosphates. Algae grow rapidly, block the light, then die and decay - and the decay uses up the dissolved oxygen, killing the fish.' }),
  makeMCQ({ id:'g9s-pp24c-007', chapterId:'g9s-c4-metals', subsection:'metals_with_acids', difficulty:2,
    question:'Which gas is produced when <b>zinc reacts with dilute hydrochloric acid</b>?',
    options:['Hydrogen','Oxygen','Sulfur dioxide','Carbon dioxide'], answer:'Hydrogen',
    hint:'A metal plus an acid always gives a salt and one particular gas.',
    explanation:'Metal + acid &rarr; salt + <b>hydrogen</b>. Here zinc + hydrochloric acid gives zinc chloride and hydrogen, which is tested with a lighted splint and a squeaky pop.' }),
  makeMCQ({ id:'g9s-pp24c-008', chapterId:'g9s-c4-metals', subsection:'metals_with_oxygen', difficulty:3,
    question:'Which one of the following metals <b>does not burn or glow</b> when heated in air?',
    options:['Copper','Iron','Magnesium','Zinc'], answer:'Copper',
    hint:'The least reactive metal of the four reacts with oxygen least readily.',
    explanation:'<b>Copper</b> is the least reactive here: heated in air it only forms a black coating of copper oxide, without burning or glowing. Magnesium burns with a brilliant white flame, and iron and zinc glow.' }),
  makeMCQ({ id:'g9s-pp24c-009', chapterId:'g9s-c5-salts', subsection:'neutralisation_in_daily_life', difficulty:2,
    question:'Which substance is used to <b>control the acidity of soil</b>?',
    options:['Calcium hydroxide','Ammonium sulfate','Potassium nitrate','Nitric acid'], answer:'Calcium hydroxide',
    hint:'To cancel an acid you add the opposite kind of substance.',
    explanation:'<b>Calcium hydroxide</b> (slaked lime) is a base, so it neutralises acid in the soil and raises the pH. Nitric acid would make the soil more acidic, and the other two are fertilisers.' }),
  makeMCQ({ id:'g9s-pp24c-010', chapterId:'g9s-c5-salts', subsection:'soluble_insoluble', difficulty:2,
    question:'Which one of the following salts is <b>insoluble</b> in water?',
    options:['Magnesium carbonate','Ammonium hydroxide','Calcium nitrate','Zinc sulfate'], answer:'Magnesium carbonate',
    hint:'All nitrates are soluble, and so are almost all sulfates. Most carbonates are not.',
    explanation:'Most <b>carbonates are insoluble</b>, and magnesium carbonate is one of them. All nitrates dissolve, ammonium compounds all dissolve, and zinc sulfate is soluble too.' }),

  // ── Questions 2-5: adapted from the written parts ───────────────────────,
  makeMCQ({ id:'g9s-pp24c-011', chapterId:'g9s-c2-mixtures', subsection:'choosing_a_technique', difficulty:2,
    question:'Which separation technique is used to obtain <b>water from sea water</b>?',
    options:['Distillation','Crystallisation','Sublimation','Filtration'], answer:'Distillation',
    hint:'You want the LIQUID back, not the salt.',
    explanation:'<b>Distillation</b> boils the water off and condenses the vapour back to pure liquid water, leaving the salt behind. Crystallisation would keep the salt and lose the water.' }),
  makeMCQ({ id:'g9s-pp24c-012', chapterId:'g9s-c2-mixtures', subsection:'choosing_a_technique', difficulty:3,
    question:'Which separation technique is used to obtain <b>iodine from a mixture of iodine and sand</b>?',
    options:['Sublimation','Distillation','Crystallisation','Filtration'], answer:'Sublimation',
    hint:'Iodine turns straight from solid to vapour when heated, without melting.',
    explanation:'Iodine <b>sublimes</b> - it goes from solid to vapour and back to solid without becoming a liquid - while sand does not. Heating the mixture and collecting the deposit separates them.' }),
  makeMCQ({ id:'g9s-pp24c-013', chapterId:'g9s-c2-mixtures', subsection:'sublimation', difficulty:3,
    question:'During <b>sublimation</b>, what precaution prevents the vapour from escaping?',
    options:['Cover the dish with an inverted funnel','Heat the mixture as strongly as possible','Leave the apparatus open to the air','Add water to the mixture before heating'],
    answer:'Cover the dish with an inverted funnel',
    hint:'The vapour has to be trapped somewhere it can cool and turn solid again.',
    explanation:'An <b>inverted funnel</b> over the dish catches the vapour so it re-solidifies on the cool inside surface, and a <b>cotton wool plug</b> in the stem stops any escaping. Leaving it open loses the product - and iodine vapour is harmful.' }),
  makeMCQ({ id:'g9s-pp24c-014', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:2,
    question:'What are the <b>symbols</b> for potassium and oxygen?',
    options:['K and O','P and O','Po and Ox','K and Ox'], answer:'K and O',
    hint:'Potassium takes its symbol from its Latin name, kalium.',
    explanation:'Potassium is <b>K</b> (from <i>kalium</i>) and oxygen is <b>O</b>. P is the symbol for phosphorus, which is why potassium cannot use it.' }),
  makeMCQ({ id:'g9s-pp24c-015', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:3,
    question:'Potassium has a valency of 1 and oxygen a valency of 2. What is the formula of <b>potassium oxide</b>?',
    options:['K<sub>2</sub>O','KO','KO<sub>2</sub>','K<sub>2</sub>O<sub>2</sub>'], answer:'K<sub>2</sub>O',
    hint:'Swap the valencies: each element takes the other’s number as its subscript.',
    explanation:'Potassium (valency 1) and oxygen (valency 2) cross over to give <b>K<sub>2</sub>O</b> - two potassium atoms are needed to balance one oxygen atom.' }),
  makeMCQ({ id:'g9s-pp24c-016', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:3,
    question:'What is the formula of <b>calcium chloride</b>? (Calcium has valency 2, chlorine valency 1.)',
    options:['CaCl<sub>2</sub>','CaCl','Ca<sub>2</sub>Cl','Ca<sub>2</sub>Cl<sub>2</sub>'], answer:'CaCl<sub>2</sub>',
    hint:'Cross the valencies over.',
    explanation:'Calcium’s valency of 2 needs <b>two</b> chlorine atoms of valency 1, giving <b>CaCl<sub>2</sub></b>.' }),
  makeMCQ({ id:'g9s-pp24c-017', chapterId:'g9s-c3-language', subsection:'formulae_of_compounds', difficulty:4,
    question:'What is the formula of <b>iron (III) sulfate</b>? (The sulfate ion is SO<sub>4</sub> with valency 2.)',
    options:['Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>','FeSO<sub>4</sub>','Fe<sub>3</sub>(SO<sub>4</sub>)<sub>2</sub>','Fe(SO<sub>4</sub>)<sub>3</sub>'],
    answer:'Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>',
    hint:'“Iron (III)” tells you iron’s valency is 3. Cross it with the sulfate’s valency of 2, and bracket the sulfate group.',
    explanation:'Iron (III) has valency 3 and sulfate has valency 2, so crossing over gives two iron and three sulfate groups: <b>Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub></b>. The brackets are essential - without them the 3 would apply only to the oxygen.' }),
  makeMCQ({ id:'g9s-pp24c-018', chapterId:'g9s-c3-language', subsection:'word_equations', difficulty:2,
    question:'Complete the word equation: <b>Magnesium + Oxygen &rarr; ...........</b>',
    options:['Magnesium oxide','Magnesium hydroxide','Magnesium peroxide','Magnesium carbonate'], answer:'Magnesium oxide',
    hint:'A metal burning in oxygen forms one simple product.',
    explanation:'A metal plus oxygen gives a metal <b>oxide</b>, so magnesium + oxygen &rarr; magnesium oxide. Magnesium burns with a brilliant white flame and leaves a white ash.' }),
  makeMCQ({ id:'g9s-pp24c-019', chapterId:'g9s-c3-language', subsection:'word_equations', difficulty:2,
    question:'Complete the word equation: <b>Aluminium + Chlorine &rarr; ...........</b>',
    options:['Aluminium chloride','Aluminium chlorate','Aluminium chlorine','Aluminium hydroxide'], answer:'Aluminium chloride',
    hint:'A metal plus a halogen gives a salt whose name ends in -ide.',
    explanation:'Metal + chlorine gives a metal <b>chloride</b>, so the product is aluminium chloride. Names ending in -ate (such as chlorate) contain oxygen as well.' }),
  makeMCQ({ id:'g9s-pp24c-020', chapterId:'g9s-c3-language', subsection:'word_equations', difficulty:2,
    question:'Complete the word equation: <b>Hydrogen + Oxygen &rarr; ...........</b>',
    options:['Water','Hydrogen oxide gas','Hydroxide','Hydrogen peroxide'], answer:'Water',
    hint:'The product is the most familiar compound there is.',
    explanation:'Hydrogen burns in oxygen to form <b>water</b> (H<sub>2</sub>O). Hydrogen peroxide is H<sub>2</sub>O<sub>2</sub>, a different compound made a different way.' }),
  makeMCQ({ id:'g9s-pp24c-021', chapterId:'g9s-c1-atmosphere', subsection:'greenhouse_gases', difficulty:2,
    question:'Carbon dioxide in the atmosphere measured 230 ppm in 1950 and 450 ppm in 2000. What was the <b>increase</b>?',
    options:['220 ppm','680 ppm','450 ppm','120 ppm'], answer:'220 ppm',
    hint:'An increase is the later figure minus the earlier one.',
    explanation:'450 &minus; 230 = <b>220 ppm</b>. Adding the two figures would give the meaningless total of 680.' }),
  makeMCQ({ id:'g9s-pp24c-022', chapterId:'g9s-c1-atmosphere', subsection:'greenhouse_gases', difficulty:2,
    question:'What is a <b>greenhouse gas</b>?',
    options:['A gas that traps heat in the atmosphere','A gas used to grow plants in a greenhouse','A gas that destroys the ozone layer','A gas that makes rainwater acidic'],
    answer:'A gas that traps heat in the atmosphere',
    hint:'The name describes what it does to heat, not to plants.',
    explanation:'A greenhouse gas lets sunlight through but <b>absorbs the heat radiated back</b> from the surface, warming the atmosphere. Ozone depletion and acid rain are caused by different gases.' }),
  makeMCQ({ id:'g9s-pp24c-023', chapterId:'g9s-c1-atmosphere', subsection:'greenhouse_gases', difficulty:2,
    question:'Apart from carbon dioxide, which of these is a <b>greenhouse gas</b>?',
    options:['Methane','Nitrogen','Oxygen','Argon'], answer:'Methane',
    hint:'It is given off by cattle, paddy fields and rubbish tips.',
    explanation:'<b>Methane</b> is a powerful greenhouse gas. Nitrogen, oxygen and argon make up most of the air but do not trap heat in this way.' }),
  makeMCQ({ id:'g9s-pp24c-024', chapterId:'g9s-c1-atmosphere', subsection:'global_warming', difficulty:3,
    question:'Which pair of activities has <b>increased the amount of carbon dioxide</b> in the atmosphere?',
    options:['Burning fossil fuels and deforestation','Planting trees and using solar panels','Recycling paper and cycling to school','Using wind turbines and public transport'],
    answer:'Burning fossil fuels and deforestation',
    hint:'One releases carbon dioxide; the other removes what would have absorbed it.',
    explanation:'<b>Burning fossil fuels</b> releases carbon dioxide, and <b>deforestation</b> removes the trees that would have absorbed it - so the two act together. Every other option reduces emissions.' }),
  makeMCQ({ id:'g9s-pp24c-025', chapterId:'g9s-c4-metals', subsection:'metals_with_water_steam', difficulty:2,
    question:'Sodium reacts with water to form sodium hydroxide and a gas. Which <b>gas</b> is produced?',
    options:['Hydrogen','Oxygen','Carbon dioxide','Chlorine'], answer:'Hydrogen',
    hint:'A metal reacting with water gives a hydroxide and one gas.',
    explanation:'Metal + water &rarr; metal hydroxide + <b>hydrogen</b>. With sodium the reaction is vigorous enough that the hydrogen often ignites.' }),
  makeMCQ({ id:'g9s-pp24c-026', chapterId:'g9s-c4-metals', subsection:'metals_with_water_steam', difficulty:3,
    question:'Which observation is made when <b>sodium reacts with water</b>?',
    options:['It floats and moves rapidly on the surface, fizzing','It sinks to the bottom and stays still','It turns black and gives off a brown gas','It dissolves slowly with no visible change'],
    answer:'It floats and moves rapidly on the surface, fizzing',
    hint:'Sodium is less dense than water, and a gas is being produced.',
    explanation:'Sodium <b>floats</b> (it is less dense than water), melts into a ball from the heat released, and <b>darts about fizzing</b> as hydrogen is given off. The solution formed turns red litmus blue.' }),
  makeMCQ({ id:'g9s-pp24c-027', chapterId:'g9s-c3-language', subsection:'balancing_equations', difficulty:4,
    question:'Which is the <b>balanced</b> equation for sodium reacting with water?',
    options:['2Na + 2H<sub>2</sub>O &rarr; 2NaOH + H<sub>2</sub>','Na + H<sub>2</sub>O &rarr; NaOH + H<sub>2</sub>','2Na + H<sub>2</sub>O &rarr; 2NaOH + H<sub>2</sub>','Na + 2H<sub>2</sub>O &rarr; NaOH + 2H<sub>2</sub>'],
    answer:'2Na + 2H<sub>2</sub>O &rarr; 2NaOH + H<sub>2</sub>',
    hint:'Count each kind of atom on both sides - they must match.',
    explanation:'<b>2Na + 2H<sub>2</sub>O &rarr; 2NaOH + H<sub>2</sub></b> balances: 2 Na, 4 H and 2 O on each side. The unbalanced version leaves hydrogen unequal.' }),
  makeMCQ({ id:'g9s-pp24c-028', chapterId:'g9s-c5-salts', subsection:'neutralisation', difficulty:2,
    question:'What name is given to the reaction between <b>sodium hydroxide and an acid</b>?',
    options:['Neutralisation','Combustion','Oxidation','Sublimation'], answer:'Neutralisation',
    hint:'A base cancelling an acid produces a salt and water.',
    explanation:'An acid reacting with a base is <b>neutralisation</b>: acid + base &rarr; salt + water. Here it gives a sodium salt and water.' }),
  makeMCQ({ id:'g9s-pp24c-029', chapterId:'g9s-c4-metals', subsection:'reactivity_series', difficulty:4,
    question:'Metal X does <b>not</b> react with cold water but <b>does</b> react with steam. Metal Y reacts with <b>neither</b>. Which pair could X and Y be?',
    options:['X = iron, Y = copper','X = copper, Y = iron','X = sodium, Y = magnesium','X = potassium, Y = sodium'],
    answer:'X = iron, Y = copper',
    hint:'Place the metals on the reactivity series: the more reactive a metal, the more readily it attacks water.',
    explanation:'<b>Iron</b> is unreactive enough to ignore cold water but does react with steam, while <b>copper</b> sits low enough to react with neither. Sodium and potassium react violently with cold water, so neither can be X or Y.' }),
  makeMCQ({ id:'g9s-pp24c-030', chapterId:'g9s-c5-salts', subsection:'uses_of_salts', difficulty:2,
    question:'Which salt is used <b>for enhancement of taste</b> in food?',
    options:['Sodium chloride','Calcium sulfate','Sodium hydrogen carbonate','Magnesium carbonate'], answer:'Sodium chloride',
    hint:'It is on every kitchen table.',
    explanation:'<b>Sodium chloride</b> is common table salt, used to season food. Sodium hydrogen carbonate is baking soda and calcium sulfate is plaster of Paris.' }),
  makeMCQ({ id:'g9s-pp24c-031', chapterId:'g9s-c5-salts', subsection:'uses_of_salts', difficulty:3,
    question:'Which salt is used in <b>baking</b>?',
    options:['Sodium hydrogen carbonate','Sodium chloride','Calcium sulfate','Magnesium carbonate'], answer:'Sodium hydrogen carbonate',
    hint:'It gives off carbon dioxide when heated, which makes a cake rise.',
    explanation:'<b>Sodium hydrogen carbonate</b> (baking soda) decomposes on heating and releases carbon dioxide, and those bubbles make the mixture rise.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp24c-pdf-001', chapterId:'g9s-c2-mixtures', marks:7, year:2024, grade:9, subject:'Science (Chemistry)', type:'written',
    image:'assets/past-papers/g9-science-2024/c3-sublimation.png',
    imageAlt:'Laboratory apparatus on a tripod above a burner, with four empty label boxes and a list of words above it',
    question:'Question 2. Three separation techniques are given: Crystallisation, Sublimation, Distillation. (a) Choose the technique used to obtain (i) water from sea water; (ii) iodine from a mixture of iodine and sand. [2] (b)(i) Label the diagram by filling the empty boxes using the words given: Evaporating dish, Bunsen burner, tripod, sublimate, beaker. There is one extra word. [4] (b)(ii) What precaution needs to be taken during sublimation to prevent vapours from escaping? [1]',
    markScheme:'(a)(i) Distillation. (a)(ii) Sublimation. (b)(i) Top right box = sublimate (the solid re-forming on the cool upper surface); middle right box = evaporating dish (holding the mixture); left box = tripod; lower right box = Bunsen burner. “beaker” is the extra word. (b)(ii) Cover the dish with an inverted funnel and plug the stem with cotton wool, so the vapour condenses inside instead of escaping.' },
  { id:'g9s-pp24c-pdf-002', chapterId:'g9s-c3-language', marks:10, year:2024, grade:9, subject:'Science (Chemistry)', type:'written',
    question:'Question 3. (a)(i) Complete the table giving the Symbol and Valency of Potassium and of Oxygen. [4] (a)(ii) Hence work out the formula of potassium oxide. [1] (b) Work out the formula of (i) calcium chloride [1] and (ii) iron (III) sulfate. [1] (c) Complete the word equations: (i) Aluminium + Chlorine → ; (ii) Magnesium + Oxygen → ; (iii) Hydrogen + Oxygen → . [3]',
    markScheme:'(a)(i) Potassium: symbol K, valency 1. Oxygen: symbol O, valency 2. (a)(ii) K2O. (b)(i) CaCl2. (b)(ii) Fe2(SO4)3 - the brackets matter, or the 3 would apply only to the oxygen. (c)(i) Aluminium chloride. (c)(ii) Magnesium oxide. (c)(iii) Water.' },
  { id:'g9s-pp24c-pdf-003', chapterId:'g9s-c1-atmosphere', marks:11, year:2024, grade:9, subject:'Science (Chemistry)', type:'written',
    needsArtwork:true,
    question:'Question 4. Table 1 shows the amount of carbon dioxide in the atmosphere: 1800 = 100 ppm, 1850 = 150, 1900 = 200, 1950 = 230, 2000 = 450. (a) Calculate the increase from 1950 to 2000. [1] (b)(i) Plot a graph of the amount of carbon dioxide against year on the grid provided. [2] (b)(ii) Using the graph, describe the trend from 1800 to 2000. [2] (c)(i) What is a greenhouse gas? [1] (c)(ii) Name another greenhouse gas. [1] (d) Give two activities that have contributed to an increase in the amount of carbon dioxide. [2] (e) Give two ways in which an increase in carbon dioxide impacts the environment negatively. [2]',
    markScheme:'(a) 450 - 230 = 220 ppm. (b)(i) Year on the horizontal axis, amount on the vertical, points plotted accurately and joined. (b)(ii) The amount rises throughout, slowly and steadily from 1800 to 1950 and then very sharply between 1950 and 2000. (c)(i) A gas that absorbs heat radiated from the Earth’s surface and warms the atmosphere. (c)(ii) Methane (also accepted: water vapour, nitrous oxide, CFCs). (d) Any two of: burning fossil fuels, deforestation, industry, motor vehicles, electricity generation. (e) Any two of: global warming, melting ice caps and rising sea level, more frequent or severe cyclones and droughts, coral bleaching, loss of habitats and species.' },
  { id:'g9s-pp24c-pdf-004', chapterId:'g9s-c4-metals', marks:12, year:2024, grade:9, subject:'Science (Chemistry)', type:'written',
    question:'Question 5. (a) Sodium reacts with water to form sodium hydroxide and a gas. (i) Name the gas produced. [1] (ii) Give two observations when sodium reacts with water. [2] (iii) Write down a balanced chemical equation for the reaction. [2] (iv) What is the name given to the reaction between sodium hydroxide and an acid? [1] (b) Metal X: no reaction with cold water, reacts with steam. Metal Y: no reaction with either. Name metal X and metal Y. [2] (c) Complete Table 2 (Name of salt / Use of salt / Solubility). The first row is given: Sodium chloride, for enhancement of taste, soluble. Second row: use = baking. Third row: name = calcium sulfate. [4]',
    markScheme:'(a)(i) Hydrogen. (a)(ii) Any two of: the sodium floats, it melts into a ball, it moves rapidly about the surface, it fizzes, it may catch fire with a yellow flame, it gradually disappears. (a)(iii) 2Na + 2H2O -> 2NaOH + H2. (a)(iv) Neutralisation. (b) X = iron (zinc or magnesium also accepted); Y = copper (silver, gold or lead also accepted). (c) Row 2: sodium hydrogen carbonate (baking soda), soluble. Row 3: calcium sulfate, used to make plaster of Paris / plaster casts / blackboard chalk, insoluble.' }
);
