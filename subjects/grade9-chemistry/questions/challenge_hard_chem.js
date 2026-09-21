'use strict';
(function () {

const C1 = 'g9s-c1-atmosphere';
const C2 = 'g9s-c2-mixtures';
const C3 = 'g9s-c3-language';
const C4 = 'g9s-c4-metals';
const C5 = 'g9s-c5-salts';

STATIC_QUESTIONS.push(

  makeMCQ({
    id: 'g9s-chard-001', chapterId: C4, subsection: 'predicting_reactions', difficulty: 3,
    question: 'Zinc is placed in copper sulfate solution. A reddish coating forms on the zinc and the blue colour of the solution fades. Which statement correctly explains this observation?',
    options: [
      'Zinc is less reactive than copper, so copper displaces zinc from solution',
      'Zinc is more reactive than copper, so zinc displaces copper from the solution',
      'Both metals react equally with the sulfate ion to exchange places',
      'The blue colour fades because zinc sulfate solution is also blue'
    ],
    answer: 'Zinc is more reactive than copper, so zinc displaces copper from the solution',
    hint: 'A more reactive metal can displace a less reactive metal from its salt solution.',
    explanation: 'Zinc sits above copper in the reactivity series, making it more reactive. It displaces copper ions from copper sulfate solution: Zn + CuSO₄ → ZnSO₄ + Cu. The reddish copper metal coats the zinc; the blue colour fades as Cu²⁺ ions are replaced by colourless Zn²⁺ ions.'
  }),

  makeMCQ({
    id: 'g9s-chard-002', chapterId: C4, subsection: 'predicting_reactions', difficulty: 3,
    question: 'Four metals W, X, Y and Z are tested with dilute acid and with cold water. W reacts violently with cold water. X reacts slowly with dilute acid but not with cold water. Y shows no reaction with either. Z reacts vigorously with dilute acid but not with cold water. Which order, most reactive first, is correct?',
    options: [
      'W, Z, X, Y',
      'X, W, Z, Y',
      'Y, X, Z, W',
      'W, X, Z, Y'
    ],
    answer: 'W, Z, X, Y',
    hint: 'Metals that react with cold water are more reactive than those that react only with acid. Within the acid group, faster reaction means higher reactivity.',
    explanation: 'W reacts violently with water — very high reactivity (like potassium or sodium). Z reacts vigorously with acid (but not water) — moderately reactive (like magnesium or zinc). X reacts slowly with acid — less reactive (like iron). Y shows no reaction at all — least reactive (like copper or gold). Order: W > Z > X > Y.'
  }),

  makeMCQ({
    id: 'g9s-chard-003', chapterId: C4, subsection: 'predicting_reactions', difficulty: 4,
    question: 'A student adds iron filings to a blue copper sulfate solution. After 20 minutes the solution turns pale green and a reddish-brown solid coats the iron. Which equation best represents this reaction?',
    options: [
      'Fe + CuSO₄ → FeSO₄ + Cu',
      'Cu + FeSO₄ → CuSO₄ + Fe',
      'Fe + Cu → FeCu (alloy formed directly)',
      'CuSO₄ → Cu + SO₄ (decomposition only)'
    ],
    answer: 'Fe + CuSO₄ → FeSO₄ + Cu',
    hint: 'Iron is above copper in the reactivity series. The green colour comes from iron(II) sulfate; the reddish solid is copper metal.',
    explanation: 'Iron displaces copper from copper sulfate solution because iron is more reactive: Fe + CuSO₄ → FeSO₄ + Cu. The blue Cu²⁺ ions are replaced by pale-green Fe²⁺ ions (iron(II) sulfate), and copper metal is deposited as a reddish-brown solid on the iron.'
  }),

  makeMCQ({
    id: 'g9s-chard-004', chapterId: C4, subsection: 'predicting_reactions', difficulty: 3,
    question: 'Magnesium ribbon is added to dilute hydrochloric acid and a gas is produced. A lighted splint is held near the mouth of the test tube. What is observed and what does this confirm?',
    options: [
      'The splint is extinguished — confirms carbon dioxide is produced',
      'A squeaky pop sound is heard — confirms hydrogen is produced',
      'The splint burns more brightly — confirms oxygen is produced',
      'A yellow flame is produced — confirms sodium is present in the acid'
    ],
    answer: 'A squeaky pop sound is heard — confirms hydrogen is produced',
    hint: 'The test for hydrogen is the squeaky pop. Metal + acid → salt + hydrogen.',
    explanation: 'Magnesium reacts with hydrochloric acid: Mg + 2HCl → MgCl₂ + H₂. The hydrogen gas produced burns with a characteristic squeaky pop when a lit splint is applied. (CO₂ extinguishes a flame; O₂ relights a glowing splint; a yellow flame indicates sodium, not the gas produced here.)'
  }),

  makeMCQ({
    id: 'g9s-chard-005', chapterId: C4, subsection: 'predicting_reactions', difficulty: 4,
    question: 'Rusting of iron requires both oxygen and water. A student sets up three experiments: A — iron nail in dry air sealed in a tube; B — iron nail in boiled water sealed with a layer of oil; C — iron nail in salt water open to air. After one week, which shows the MOST rusting?',
    options: [
      'A, because air contains the most oxygen',
      'B, because water is present',
      'C, because salt water accelerates rusting and both oxygen and water are present',
      'A and B equally, because both have either air or water'
    ],
    answer: 'C, because salt water accelerates rusting and both oxygen and water are present',
    hint: 'Rusting needs both oxygen AND water. Salt acts as an electrolyte and speeds up the electrochemical process of rusting.',
    explanation: 'Experiment A has oxygen but no water — minimal rusting. Experiment B has water but the oil layer and boiling remove dissolved oxygen — minimal rusting. Experiment C has oxygen (open to air), water AND salt. Salt is an electrolyte that greatly accelerates the electrochemical rusting process. C shows by far the most rust.'
  }),

  makeMCQ({
    id: 'g9s-chard-006', chapterId: C3, subsection: 'balancing_equations', difficulty: 3,
    question: 'Which is the correctly balanced symbol equation for iron reacting with oxygen to form iron(III) oxide (Fe₂O₃)?',
    options: [
      'Fe + O₂ → Fe₂O₃',
      '4Fe + 3O₂ → 2Fe₂O₃',
      '2Fe + O₂ → Fe₂O₃',
      'Fe₂ + O₃ → Fe₂O₃'
    ],
    answer: '4Fe + 3O₂ → 2Fe₂O₃',
    hint: 'Count Fe and O atoms on each side. Fe₂O₃ has 2 Fe and 3 O per formula unit. You need an even number of O atoms on the left (O₂ comes in pairs).',
    explanation: 'Checking 4Fe + 3O₂ → 2Fe₂O₃: Left: 4 Fe, 6 O. Right: 4 Fe (2×2), 6 O (2×3). Balanced ✓. The key is that O₂ gives 2 oxygen atoms at a time, so you need 3 molecules of O₂ to supply 6 oxygen atoms for 2 formula units of Fe₂O₃.'
  }),

  makeMCQ({
    id: 'g9s-chard-007', chapterId: C3, subsection: 'word_equations', difficulty: 3,
    question: 'Methane (CH₄) burns completely in a plentiful supply of oxygen. What are the products of this complete combustion?',
    options: [
      'Carbon monoxide and water',
      'Carbon dioxide and water',
      'Carbon (soot) and water vapour only',
      'Carbon dioxide and hydrogen gas'
    ],
    answer: 'Carbon dioxide and water',
    hint: 'Complete combustion of any hydrocarbon in excess oxygen always produces carbon dioxide and water.',
    explanation: 'Complete combustion: CH₄ + 2O₂ → CO₂ + 2H₂O. All the carbon is fully oxidised to CO₂ and all the hydrogen is oxidised to H₂O. Incomplete combustion (limited oxygen) produces CO or carbon (soot) instead of CO₂, but the question specifies complete combustion.'
  }),

  makeNum({
    id: 'g9s-chard-008', chapterId: C3, subsection: 'balancing_equations', difficulty: 3,
    question: 'The balanced equation for aluminium reacting with chlorine is: 2Al + 3Cl₂ → 2AlCl₃. How many molecules of Cl₂ are needed to react completely with 6 atoms of aluminium?',
    answer: 9,
    hint: 'Use the mole ratio from the balanced equation: 2 Al reacts with 3 Cl₂. Scale up proportionally.',
    explanation: 'From the equation, 2 Al requires 3 Cl₂. For 6 Al (which is 3 times as many): 3 × 3 = 9 molecules of Cl₂ are needed. The ratio is always 2 : 3 (Al : Cl₂).'
  }),

  makeMCQ({
    id: 'g9s-chard-009', chapterId: C5, subsection: 'neutralisation', difficulty: 3,
    question: 'A student carefully adds sodium hydroxide solution to dilute hydrochloric acid, using a pH meter to monitor the reaction. When exactly the right amount of sodium hydroxide has been added to neutralise all the acid, what pH does the meter read?',
    options: [
      '0, because hydrochloric acid is a strong acid',
      '7, because the salt solution formed is neutral',
      '14, because sodium hydroxide is a strong alkali',
      '3, because only partial neutralisation occurs'
    ],
    answer: '7, because the salt solution formed is neutral',
    hint: 'At the point of neutralisation, all the acid and all the alkali have reacted. The product is sodium chloride solution, which is neutral.',
    explanation: 'HCl + NaOH → NaCl + H₂O. Sodium chloride (common salt) dissolves to give a neutral solution with pH 7. The acid (pH < 7) and alkali (pH > 7) have completely reacted with each other; at the exact equivalence point, neither excess acid nor excess alkali remains.'
  }),

  makeMCQ({
    id: 'g9s-chard-010', chapterId: C5, subsection: 'soluble_insoluble', difficulty: 4,
    question: 'To prepare pure copper(II) sulfate crystals, excess copper oxide powder is stirred into warm dilute sulfuric acid until no more dissolves. The mixture is then filtered. Why is excess copper oxide used?',
    options: [
      'To produce more gas and speed up the reaction',
      'To ensure all the acid is used up so no acid remains in the final product',
      'To increase the surface area and act as a catalyst',
      'Because copper oxide is soluble and adds colour to the crystals'
    ],
    answer: 'To ensure all the acid is used up so no acid remains in the final product',
    hint: 'Any unreacted acid left in the solution would contaminate the copper sulfate crystals when they are dried.',
    explanation: 'CuO + H₂SO₄ → CuSO₄ + H₂O. Using excess copper oxide ensures all the sulfuric acid reacts completely. If acid remained, it would be present in the crystals as a contaminant. The excess CuO that did not dissolve is easily removed by filtering, leaving pure copper sulfate solution behind. (CuO is insoluble in water, only in acid, so the filter removes unreacted CuO cleanly.)'
  }),

  makeMCQ({
    id: 'g9s-chard-011', chapterId: C5, subsection: 'neutralisation', difficulty: 3,
    question: 'A farmer tests his soil and finds it has a pH of 5. He wants to grow crops that thrive at pH 6.5 to 7. What should he add to the soil to raise the pH?',
    options: [
      'Dilute sulfuric acid, because acids lower pH',
      'Powdered limestone (calcium carbonate), because it is an alkali that neutralises the acid in the soil',
      'More water, to dilute the acidity',
      'Copper sulfate solution, because it is used as a pesticide and will help crops'
    ],
    answer: 'Powdered limestone (calcium carbonate), because it is an alkali that neutralises the acid in the soil',
    hint: 'To raise pH (make less acidic), you need to add something alkaline. Limestone (CaCO₃) reacts with the acid in the soil.',
    explanation: 'The soil is acidic (pH 5). Adding powdered limestone (CaCO₃) neutralises the excess acid: CaCO₃ + 2H⁺ → Ca²⁺ + H₂O + CO₂. This raises the pH towards neutral. Adding more acid or water would not raise the pH. Copper sulfate is a pesticide/fungicide, not a soil pH corrector.'
  }),

  makeMCQ({
    id: 'g9s-chard-012', chapterId: C5, subsection: 'soluble_insoluble', difficulty: 3,
    question: 'Solutions of barium chloride and sodium sulfate are mixed together. A dense white precipitate forms immediately. What is this precipitate?',
    options: [
      'Sodium chloride (NaCl)',
      'Barium sulfate (BaSO₄)',
      'Barium carbonate (BaCO₃)',
      'Sodium hydroxide (NaOH)'
    ],
    answer: 'Barium sulfate (BaSO₄)',
    hint: 'BaCl₂ + Na₂SO₄ → ? + NaCl. Which product is insoluble and forms a precipitate?',
    explanation: 'When barium chloride reacts with sodium sulfate: BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl. Barium sulfate is highly insoluble in water and precipitates immediately as a dense white solid. Sodium chloride remains dissolved. This reaction is used as a test for sulfate ions: add dilute HCl then barium chloride solution — a white precipitate of BaSO₄ confirms the presence of sulfate.'
  }),

  makeMCQ({
    id: 'g9s-chard-013', chapterId: C1, subsection: 'composition', difficulty: 3,
    question: 'A glowing (not burning) wooden splint is inserted into a test tube containing an unknown colourless gas. The splint immediately bursts back into flame. Which gas is present in the test tube?',
    options: [
      'Carbon dioxide — it supports combustion of glowing materials',
      'Nitrogen — it relights glowing splints',
      'Oxygen — it relights glowing splints because it supports combustion',
      'Hydrogen — it burns with a pop when a lit splint is used'
    ],
    answer: 'Oxygen — it relights glowing splints because it supports combustion',
    hint: 'Remember the four gas tests: O₂ relights a glowing splint; H₂ burns with a squeaky pop; CO₂ turns limewater milky; NH₃ turns moist red litmus blue.',
    explanation: 'Oxygen supports combustion. A glowing splint does not have enough energy to relight in air (21% O₂), but in pure or concentrated oxygen it relights immediately. CO₂ and N₂ both extinguish flames. H₂ burns with a squeaky pop when a lit (burning) splint is used — not a glowing one.'
  }),

  makeMCQ({
    id: 'g9s-chard-014', chapterId: C1, subsection: 'pollution', difficulty: 4,
    question: 'Burning fossil fuels releases sulfur dioxide (SO₂) into the atmosphere. This SO₂ dissolves in cloud droplets, forming sulfurous and sulfuric acid, which falls as acid rain. What is the most serious environmental effect of acid rain on freshwater lakes and rivers in Mauritius?',
    options: [
      'It increases biodiversity by supplying sulfur as a plant nutrient',
      'It lowers the pH of the water, making conditions too acidic for fish, invertebrates and aquatic plants',
      'It raises the pH of the water, causing toxic algal blooms to form',
      'It has no significant effect because river water naturally neutralises the acid'
    ],
    answer: 'It lowers the pH of the water, making conditions too acidic for fish, invertebrates and aquatic plants',
    hint: 'Acid rain makes water more acidic (lower pH). Most freshwater organisms can only survive within a narrow pH range around neutral.',
    explanation: 'SO₂ + H₂O → H₂SO₃ (sulfurous acid), which further oxidises to H₂SO₄. This acid rain lowers lake pH, often to below 5. Fish die at pH below 5, invertebrates and amphibians are lost at slightly higher acidity, and plant growth is disrupted. Rivers do buffer some acid naturally (via dissolved calcium carbonate in limestone areas), but this capacity is easily overwhelmed by heavy acid rain.'
  }),

  makeMCQ({
    id: 'g9s-chard-015', chapterId: C1, subsection: 'composition', difficulty: 3,
    question: 'A student passes an unknown gas through a test tube of clear limewater (calcium hydroxide solution). The limewater turns milky white. What does this confirm?',
    options: [
      'The gas is oxygen, which oxidises the calcium hydroxide to form a white solid',
      'The gas is carbon dioxide, which reacts with calcium hydroxide to form a white precipitate of calcium carbonate',
      'The gas is hydrogen chloride, which neutralises the limewater',
      'The gas is nitrogen dioxide, which always turns limewater white'
    ],
    answer: 'The gas is carbon dioxide, which reacts with calcium hydroxide to form a white precipitate of calcium carbonate',
    hint: 'The limewater test is the standard test for CO₂. A milky white precipitate means CO₂ is present.',
    explanation: 'CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O. Carbon dioxide reacts with calcium hydroxide solution to form calcium carbonate, which is insoluble and appears as a white milky precipitate. If excess CO₂ is passed through, the precipitate redissolves (forming soluble calcium hydrogen carbonate), and the solution goes clear again — a further confirmation that CO₂ was the gas.'
  })

);

})();
