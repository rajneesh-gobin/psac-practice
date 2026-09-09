'use strict';
(function () {

// Chemistry multi-year NCE paper patterns — drawn from 2021, 2023, 2024 papers
// IDs: g9s-cmy-001 to g9s-cmy-040

// ── C1 · Atmosphere & Environment ─────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-001', chapterId: 'g9s-c1-atmosphere', difficulty: 1,
  subsection: 'greenhouse_gases',
  question: 'Which one of the following is a <b>greenhouse</b> gas?',
  options: ['Methane', 'Hydrogen', 'Nitrogen', 'Oxygen'],
  answer: 'Methane',
  explanation: 'Methane (CH₄) is a potent greenhouse gas produced by decomposition of organic matter, livestock digestion and rice paddy cultivation. It traps infrared radiation from the Earth.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-002', chapterId: 'g9s-c1-atmosphere', difficulty: 2,
  subsection: 'greenhouse_gases',
  question: 'A diagram shows a factory with smoke rising from chimneys, releasing carbon dioxide into the atmosphere. By which process does the factory release carbon dioxide?',
  options: ['Combustion', 'Eutrophication', 'Photosynthesis', 'Respiration'],
  answer: 'Combustion',
  explanation: 'Combustion of fossil fuels (coal, oil, gas) in factories releases carbon dioxide. Complete combustion: fuel + oxygen → carbon dioxide + water.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-003', chapterId: 'g9s-c1-atmosphere', difficulty: 2,
  subsection: 'air_pollutants',
  question: 'The ozone layer is depleted by ……………………… .',
  options: ['Chlorofluorocarbons', 'Carbon monoxide', 'Oxides of nitrogen', 'Sulfur dioxide'],
  answer: 'Chlorofluorocarbons',
  explanation: 'CFCs (chlorofluorocarbons), once used in refrigerants and aerosols, release chlorine radicals that catalytically destroy ozone (O₃) molecules in the stratosphere.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-004', chapterId: 'g9s-c1-atmosphere', difficulty: 2,
  subsection: 'eutrophication',
  question: 'Which of the following will cause <b>eutrophication</b>?',
  options: ['Fertilisers from agriculture', 'Smoke from factories', 'Oil spillage from ships', 'Plastic objects in rivers'],
  answer: 'Fertilisers from agriculture',
  explanation: 'Excess fertilisers (nitrates and phosphates) wash into water bodies, causing rapid algal growth (algal bloom), which depletes oxygen and kills aquatic life — a process called eutrophication.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-005', chapterId: 'g9s-c1-atmosphere', difficulty: 2,
  subsection: 'air_pollutants',
  question: 'A car is fitted with a catalytic converter. Which pollutant does it mainly remove from exhaust gases?',
  options: ['Carbon monoxide', 'Carbon dioxide', 'Nitrogen', 'Water vapour'],
  answer: 'Carbon monoxide',
  explanation: 'Catalytic converters convert toxic carbon monoxide (CO) to carbon dioxide (CO₂), and nitrogen oxides (NOₓ) to nitrogen, reducing harmful emissions.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-006', chapterId: 'g9s-c1-atmosphere', difficulty: 2,
  subsection: 'greenhouse_gases',
  question: 'Which process produces methane in the atmosphere?',
  options: ['Decay of vegetable matter', 'Combustion of petrol', 'Respiration of animals', 'Evaporation of water'],
  answer: 'Decay of vegetable matter',
  explanation: 'When plant matter decomposes anaerobically (without oxygen), micro-organisms produce methane as a by-product — for example in waterlogged soils and landfill sites.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-007', chapterId: 'g9s-c1-atmosphere', difficulty: 2,
  subsection: 'water_pollution',
  question: 'Which sequence correctly describes the harmful effects of eutrophication in a lake?',
  options: ['Fertilisers enter lake → algae multiply → oxygen depleted → fish die', 'Algae enter lake → fertilisers increase → fish multiply → oxygen rises', 'Fish die → algae decrease → oxygen increases → water clears', 'Oxygen increases → algae die → fish multiply → water becomes clean'],
  answer: 'Fertilisers enter lake → algae multiply → oxygen depleted → fish die',
  explanation: 'Eutrophication: excess fertilisers cause algal blooms. Algae block sunlight, plants below die. Bacteria decomposing dead material consume oxygen, suffocating fish and other aquatic life.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-008', chapterId: 'g9s-c1-atmosphere', difficulty: 2,
  subsection: 'global_warming',
  question: 'Which human activity contributes <b>most</b> to the increase in atmospheric carbon dioxide?',
  options: ['Burning of fossil fuels', 'Using electric cars', 'Planting forests', 'Using solar panels'],
  answer: 'Burning of fossil fuels',
  explanation: 'Burning coal, oil and natural gas for energy releases vast amounts of CO₂ stored over millions of years, rapidly increasing the greenhouse effect and global temperatures.'
}));

// ── C2 · Separation Techniques ────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-009', chapterId: 'g9s-c2-mixtures', difficulty: 1,
  subsection: 'apparatus_diagrams',
  question: 'A diagram shows a cylindrical glass container with graduation marks on the side, labelled 100 ml, 200 ml, 300 ml, 400 ml, 500 ml. What does the diagram show?',
  options: ['A beaker', 'A condenser', 'A conical flask', 'A distillation flask'],
  answer: 'A beaker',
  explanation: 'A beaker is a cylindrical, flat-bottomed container with graduation marks, used for holding, heating and mixing liquids in the laboratory.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-010', chapterId: 'g9s-c2-mixtures', difficulty: 1,
  subsection: 'distillation',
  question: 'Which separation technique is used to obtain <b>pure water</b> from sea water?',
  options: ['Distillation', 'Crystallisation', 'Sublimation', 'Filtration'],
  answer: 'Distillation',
  explanation: 'Distillation separates a liquid from dissolved solids by boiling the mixture. Water evaporates, is condensed and collected, leaving salts behind.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-011', chapterId: 'g9s-c2-mixtures', difficulty: 2,
  subsection: 'sublimation',
  question: 'Which technique would you use to separate <b>iodine</b> from a mixture of iodine and sand?',
  options: ['Sublimation', 'Crystallisation', 'Distillation', 'Filtration'],
  answer: 'Sublimation',
  explanation: 'Iodine sublimes — it changes from solid directly to vapour on heating. The vapour is collected and solidifies, leaving sand behind. This technique only works for substances that sublime.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-012', chapterId: 'g9s-c2-mixtures', difficulty: 2,
  subsection: 'sublimation',
  question: 'In a sublimation experiment, a mixture of iodine and sand is heated. The solid that collects at the top of the apparatus is called the',
  options: ['Sublimate', 'Filtrate', 'Residue', 'Distillate'],
  answer: 'Sublimate',
  explanation: 'When a substance sublimes, the vapour rises and solidifies in a cooler region. The solid deposit formed is called the sublimate. Iodine forms a purple sublimate.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-013', chapterId: 'g9s-c2-mixtures', difficulty: 1,
  subsection: 'apparatus_diagrams',
  question: 'Which piece of apparatus is used to measure <b>temperature</b>?',
  options: ['Thermometer', 'U-tube', 'Funnel', 'Measuring cylinder'],
  answer: 'Thermometer',
  explanation: 'A thermometer measures temperature. In the lab, mercury or alcohol thermometers are common, though digital probes are also used in modern investigations.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-014', chapterId: 'g9s-c2-mixtures', difficulty: 1,
  subsection: 'choosing_a_technique',
  question: 'Air is best described as a',
  options: ['Mixture', 'Compound', 'Element', 'Pure substance'],
  answer: 'Mixture',
  explanation: 'Air is a mixture of gases (mainly nitrogen and oxygen) with variable composition. Its components retain their own properties and can be separated by physical means such as fractional distillation.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-015', chapterId: 'g9s-c2-mixtures', difficulty: 2,
  subsection: 'distillation',
  question: 'Boiling chips are added to the flask during distillation. What is the purpose of boiling chips?',
  options: ['To ensure smooth, even boiling and prevent bumping', 'To increase the boiling point of the liquid', 'To filter impurities from the liquid', 'To cool the liquid faster'],
  answer: 'To ensure smooth, even boiling and prevent bumping',
  explanation: 'Boiling chips (anti-bumping granules) provide nucleation sites for bubble formation, ensuring smooth boiling without sudden violent surges (bumping) which could break glassware or cause spills.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-016', chapterId: 'g9s-c2-mixtures', difficulty: 2,
  subsection: 'crystallisation',
  question: 'A student wants to obtain pure copper sulfate crystals from a copper sulfate solution. Which technique should be used?',
  options: ['Crystallisation', 'Distillation', 'Sublimation', 'Filtration'],
  answer: 'Crystallisation',
  explanation: 'Crystallisation separates a dissolved solid from its solution by evaporating the solvent slowly. As the solution cools, pure crystals of copper sulfate form.'
}));

// ── C3 · Language of Chemistry ────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-017', chapterId: 'g9s-c3-language', difficulty: 2,
  subsection: 'formulae_of_compounds',
  question: 'A diagram shows a molecule of ammonia with one nitrogen atom bonded to three hydrogen atoms. How many <b>hydrogen</b> atoms are there in a molecule of ammonia?',
  options: ['3', '1', '2', '4'],
  answer: '3',
  explanation: 'Ammonia has the formula NH₃ — one nitrogen atom bonded to three hydrogen atoms. This gives it a pyramidal molecular shape.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-018', chapterId: 'g9s-c3-language', difficulty: 1,
  subsection: 'formulae_of_compounds',
  question: 'What is the <b>valency</b> of aluminium?',
  options: ['3', '1', '2', '4'],
  answer: '3',
  explanation: 'Aluminium has a valency of 3, meaning each aluminium atom can form 3 bonds. Its ion is Al³⁺. This is used to work out formulas: e.g. Al₂O₃.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-019', chapterId: 'g9s-c3-language', difficulty: 2,
  subsection: 'formulae_of_compounds',
  question: 'A diagram shows a central carbon atom bonded to four hydrogen atoms arranged symmetrically. What is the <b>formula</b> of this molecule?',
  options: ['CH₄', 'C₂H', 'C₄H', 'CH₂'],
  answer: 'CH₄',
  explanation: 'A carbon atom with 4 hydrogen atoms bonded to it is methane — formula CH₄. Carbon has a valency of 4, matching the four C–H bonds shown.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-020', chapterId: 'g9s-c3-language', difficulty: 1,
  subsection: 'formulae_of_compounds',
  question: 'What is the <b>valency</b> of hydrogen?',
  options: ['1', '2', '3', '4'],
  answer: '1',
  explanation: 'Hydrogen has a valency of 1, forming one covalent bond. In compounds it always appears once per bond (e.g. HCl, H₂O where each H forms one bond).'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-021', chapterId: 'g9s-c3-language', difficulty: 2,
  subsection: 'formulae_of_compounds',
  question: 'A diagram shows a water molecule with one oxygen atom bonded to two hydrogen atoms. How many <b>atoms</b> combine to form a water molecule?',
  options: ['3', '2', '4', '6'],
  answer: '3',
  explanation: 'Water (H₂O) is made of 2 hydrogen atoms and 1 oxygen atom — a total of 3 atoms per molecule.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-022', chapterId: 'g9s-c3-language', difficulty: 2,
  subsection: 'formulae_of_compounds',
  question: 'A student is shown four diagrams of diatomic molecules: (H)(H), (Cl)(Cl), (F)(F), (O)(O). Which diagram represents an <b>oxygen</b> molecule?',
  options: ['(O)(O)', '(H)(H)', '(Cl)(Cl)', '(F)(F)'],
  answer: '(O)(O)',
  explanation: 'An oxygen molecule (O₂) consists of two oxygen atoms bonded together. It is a diatomic molecule, like hydrogen (H₂), chlorine (Cl₂) and fluorine (F₂).'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-023', chapterId: 'g9s-c3-language', difficulty: 2,
  subsection: 'formulae_of_compounds',
  question: 'Using the valency method, what is the correct formula of <b>calcium chloride</b>?',
  options: ['CaCl₂', 'CaCl', 'Ca₂Cl', 'Ca₂Cl₂'],
  answer: 'CaCl₂',
  explanation: 'Calcium has valency 2 and chlorine has valency 1. Using the crossover rule: Ca²⁺Cl₁⁻ → CaCl₂. Two chloride ions balance one calcium ion.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-024', chapterId: 'g9s-c3-language', difficulty: 2,
  subsection: 'formulae_of_compounds',
  question: 'Match the element symbol <b>Hg</b> to its correct name.',
  options: ['Mercury', 'Hydrogen', 'Manganese', 'Magnesium'],
  answer: 'Mercury',
  explanation: 'Hg is the chemical symbol for mercury, derived from its Latin name Hydrargyrum meaning "water silver". It is the only metal that is liquid at room temperature.'
}));

// ── C4 · Metals ────────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-025', chapterId: 'g9s-c4-metals', difficulty: 1,
  subsection: 'metals_with_oxygen',
  question: 'A piece of magnesium ribbon is held in tongs and heated in a Bunsen burner flame. What colour is the flame produced?',
  options: ['White', 'Blue', 'Green', 'Red'],
  answer: 'White',
  explanation: 'Magnesium burns vigorously in air with an intensely bright white flame, producing white magnesium oxide (MgO). Students must never look directly at burning magnesium.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-026', chapterId: 'g9s-c4-metals', difficulty: 2,
  subsection: 'metals_with_oxygen',
  question: 'Which one of the following metals does <b>NOT</b> burn or glow when heated?',
  options: ['Copper', 'Iron', 'Magnesium', 'Zinc'],
  answer: 'Copper',
  explanation: 'Copper does not burn or glow when heated in air — it merely develops a black surface layer of copper oxide (CuO). It is low in the reactivity series compared to magnesium, iron and zinc.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-027', chapterId: 'g9s-c4-metals', difficulty: 2,
  subsection: 'metals_with_acids',
  question: 'A piece of zinc is placed in dilute hydrochloric acid. Bubbles of gas appear. Which gas is produced?',
  options: ['Hydrogen', 'Oxygen', 'Sulfur dioxide', 'Carbon dioxide'],
  answer: 'Hydrogen',
  explanation: 'Zinc reacts with dilute hydrochloric acid: Zn + 2HCl → ZnCl₂ + H₂. Hydrogen gas is produced, which can be tested with a lit splint — it burns with a squeaky pop.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-028', chapterId: 'g9s-c4-metals', difficulty: 2,
  subsection: 'metals_with_acids',
  question: 'What are the products when magnesium reacts with sulfuric acid?',
  options: ['Magnesium sulfate and hydrogen', 'Magnesium oxide and water', 'Magnesium chloride and hydrogen', 'Magnesium sulfate and carbon dioxide'],
  answer: 'Magnesium sulfate and hydrogen',
  explanation: 'Magnesium + sulfuric acid → magnesium sulfate + hydrogen. This is a typical metal + acid reaction: the metal displaces hydrogen from the acid, forming a salt and hydrogen gas.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-029', chapterId: 'g9s-c4-metals', difficulty: 1,
  subsection: 'equations_for_metals',
  question: 'Complete the word equation: calcium + oxygen →',
  options: ['Calcium oxide', 'Calcium chloride', 'Calcium hydroxide', 'Calcium carbonate'],
  answer: 'Calcium oxide',
  explanation: 'When calcium burns in oxygen it forms calcium oxide: 2Ca + O₂ → 2CaO. The product is a metal oxide — a general rule for metal + oxygen reactions.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-030', chapterId: 'g9s-c4-metals', difficulty: 1,
  subsection: 'equations_for_metals',
  question: 'Complete the word equation: sodium + chlorine →',
  options: ['Sodium chloride', 'Sodium oxide', 'Sodium hydroxide', 'Sodium carbonate'],
  answer: 'Sodium chloride',
  explanation: 'Sodium reacts vigorously with chlorine gas to form sodium chloride: 2Na + Cl₂ → 2NaCl. Sodium chloride is common salt — the product of sodium and a halogen (chlorine).'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-031', chapterId: 'g9s-c4-metals', difficulty: 2,
  subsection: 'equations_for_metals',
  question: 'Complete the word equation: aluminium + chlorine →',
  options: ['Aluminium chloride', 'Aluminium oxide', 'Aluminium sulfate', 'Aluminium hydroxide'],
  answer: 'Aluminium chloride',
  explanation: 'Aluminium reacts with chlorine to form aluminium chloride: 2Al + 3Cl₂ → 2AlCl₃. Aluminium has valency 3 and chlorine has valency 1, giving the formula AlCl₃.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-032', chapterId: 'g9s-c4-metals', difficulty: 3,
  subsection: 'reactivity_series',
  question: 'A student adds iron to a solution of copper sulfate. A reddish-brown solid coats the iron. What does this demonstrate?',
  options: ['Iron is more reactive than copper and displaces it from its salt', 'Copper is more reactive than iron', 'Iron and copper have the same reactivity', 'Copper is too reactive to be displaced by iron'],
  answer: 'Iron is more reactive than copper and displaces it from its salt',
  explanation: 'Iron displaces copper from copper sulfate solution: Fe + CuSO₄ → FeSO₄ + Cu. The reddish-brown deposit is copper metal. This demonstrates iron is higher than copper in the reactivity series.'
}));

// ── C5 · Salts ─────────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-033', chapterId: 'g9s-c5-salts', difficulty: 1,
  subsection: 'neutralisation',
  question: 'What are the products of a <b>neutralisation</b> reaction?',
  options: ['Salt and water', 'Acid and base', 'Acid and salt', 'Base and water'],
  answer: 'Salt and water',
  explanation: 'Neutralisation: acid + base → salt + water. For example, hydrochloric acid + sodium hydroxide → sodium chloride + water.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-034', chapterId: 'g9s-c5-salts', difficulty: 2,
  subsection: 'uses_of_salts',
  question: 'Which salt is used to make <b>plaster of Paris</b>?',
  options: ['Calcium sulfate', 'Ammonium nitrate', 'Magnesium sulfate', 'Potassium nitrate'],
  answer: 'Calcium sulfate',
  explanation: 'Plaster of Paris is calcium sulfate hemihydrate (CaSO₄·½H₂O). It sets hard when mixed with water, making it useful for casts in medicine and construction.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-035', chapterId: 'g9s-c5-salts', difficulty: 2,
  subsection: 'neutralisation_in_daily_life',
  question: 'A wasp sting is alkaline. Which substance would be most suitable to treat it?',
  options: ['Vinegar', 'Baking soda', 'Quicklime', 'Slaked lime'],
  answer: 'Vinegar',
  explanation: 'Vinegar (dilute ethanoic acid) neutralises the alkaline wasp venom. Baking soda, quicklime and slaked lime are all alkaline and would worsen an alkaline sting.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-036', chapterId: 'g9s-c5-salts', difficulty: 2,
  subsection: 'neutralisation_in_daily_life',
  question: 'Which substance is used to <b>control the acidity</b> of soil?',
  options: ['Calcium hydroxide', 'Ammonium sulfate', 'Potassium nitrate', 'Nitric acid'],
  answer: 'Calcium hydroxide',
  explanation: 'Calcium hydroxide (slaked lime) is an alkali spread on acidic soil to neutralise excess acidity, raising the pH to a level suitable for crop growth.'
}));

// ── Scientific Inquiry ─────────────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-037', chapterId: 'g9s-inquiry', difficulty: 2,
  subsection: 'recording_data',
  question: 'A student investigates how the volume of gas produced changes with temperature when zinc reacts with hydrochloric acid. Which graph is most suitable?',
  options: ['A line graph with temperature on the x-axis and volume of gas on the y-axis', 'A bar chart with gas type on the x-axis', 'A pie chart showing percentages of gases', 'A scatter graph with time on both axes'],
  answer: 'A line graph with temperature on the x-axis and volume of gas on the y-axis',
  explanation: 'A line graph is used when both variables are continuous (temperature and volume). The independent variable (temperature) goes on the x-axis and the dependent variable (volume of gas) on the y-axis.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-038', chapterId: 'g9s-inquiry', difficulty: 1,
  subsection: 'lab_safety',
  question: 'During an experiment using dilute hydrochloric acid, a student accidentally spills acid on their skin. What should they do FIRST?',
  options: ['Rinse the affected area immediately with plenty of water', 'Wipe it off with a dry cloth', 'Apply baking soda directly from the container', 'Continue the experiment and report it later'],
  answer: 'Rinse the affected area immediately with plenty of water',
  explanation: 'Acids should be rinsed immediately with large amounts of water to dilute them and reduce damage to skin. Dry wiping can spread the acid; applying chemicals directly without diluting first can cause further injury.'
}));

// ── Science, Technology & Society ─────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-039', chapterId: 'g9s-sts', difficulty: 2,
  subsection: 'evaluating_information',
  question: 'A company claims its product removes all pollutants from water instantly. How should a scientist evaluate this claim?',
  options: ['By demanding peer-reviewed experimental evidence and independent testing', 'By accepting it because it is printed on the packaging', 'By assuming it is true if the product is expensive', 'By asking friends if the product works'],
  answer: 'By demanding peer-reviewed experimental evidence and independent testing',
  explanation: 'Scientific claims must be backed by reproducible experimental evidence evaluated by independent experts (peer review). Commercial packaging is not a reliable source of scientific evidence.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cmy-040', chapterId: 'g9s-sts', difficulty: 3,
  subsection: 'ethics_of_science',
  question: 'Some scientists argue that carbon capture technology should be developed to reduce climate change. Which is the strongest ethical argument IN FAVOUR?',
  options: ['It may prevent harm to future generations who cannot consent to the consequences of current pollution', 'It is cheaper than reducing fossil fuel use', 'It allows countries to continue burning coal without any changes', 'Scientists have a right to develop any technology they choose'],
  answer: 'It may prevent harm to future generations who cannot consent to the consequences of current pollution',
  explanation: 'The ethical principle of intergenerational justice argues that current generations must not impose irreversible harm on future generations. Carbon capture technology directly addresses this by reducing greenhouse gas concentrations.'
}));

})();
