'use strict';
(function () {

STATIC_QUESTIONS.push(

  // ── Molecule ball-and-stick diagram (2021 NCE Chem Fig 1.1) ───────────────
  // 4 grey (phosphorus) atoms + 6 white (oxygen) atoms bonded → P₄O₆

  makeMCQ({ id: 'g9s-cdm-001', chapterId: 'g9s-c3-language', subsection: 'formulae_of_compounds', difficulty: 2,
    question: 'The diagram below shows a ball-and-stick model of a molecule. The grey filled circles represent <b>Phosphorus (P)</b> atoms and the white circles represent <b>Oxygen (O)</b> atoms.<br><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="200" height="160" style="display:block;margin:8px auto">' +
      '<line x1="100" y1="25" x2="60" y2="65" stroke="#555" stroke-width="2"/>' +
      '<line x1="100" y1="25" x2="140" y2="65" stroke="#555" stroke-width="2"/>' +
      '<line x1="60" y1="65" x2="40" y2="110" stroke="#555" stroke-width="2"/>' +
      '<line x1="140" y1="65" x2="160" y2="110" stroke="#555" stroke-width="2"/>' +
      '<line x1="40" y1="110" x2="100" y2="135" stroke="#555" stroke-width="2"/>' +
      '<line x1="160" y1="110" x2="100" y2="135" stroke="#555" stroke-width="2"/>' +
      '<line x1="60" y1="65" x2="100" y2="85" stroke="#555" stroke-width="2"/>' +
      '<line x1="140" y1="65" x2="100" y2="85" stroke="#555" stroke-width="2"/>' +
      '<line x1="40" y1="110" x2="70" y2="110" stroke="#555" stroke-width="2"/>' +
      '<line x1="160" y1="110" x2="130" y2="110" stroke="#555" stroke-width="2"/>' +
      '<circle cx="100" cy="25" r="12" fill="#777" stroke="#333" stroke-width="1.5"/>' +
      '<circle cx="40" cy="110" r="12" fill="#777" stroke="#333" stroke-width="1.5"/>' +
      '<circle cx="160" cy="110" r="12" fill="#777" stroke="#333" stroke-width="1.5"/>' +
      '<circle cx="100" cy="135" r="12" fill="#777" stroke="#333" stroke-width="1.5"/>' +
      '<circle cx="60" cy="65" r="10" fill="#fff" stroke="#555" stroke-width="1.5"/>' +
      '<circle cx="140" cy="65" r="10" fill="#fff" stroke="#555" stroke-width="1.5"/>' +
      '<circle cx="100" cy="85" r="10" fill="#fff" stroke="#555" stroke-width="1.5"/>' +
      '<circle cx="70" cy="110" r="10" fill="#fff" stroke="#555" stroke-width="1.5"/>' +
      '<circle cx="130" cy="110" r="10" fill="#fff" stroke="#555" stroke-width="1.5"/>' +
      '<circle cx="70" cy="148" r="10" fill="#777" stroke="#333" stroke-width="1.5"/>' +
      '<circle cx="90" cy="148" r="10" fill="#fff" stroke="#555" stroke-width="1.5"/>' +
      '<text x="103" y="153" font-size="10" fill="#333">= Phosphorus</text>' +
      '<text x="103" y="144" font-size="10" fill="#333">= Oxygen</text>' +
      '</svg>What is the <b>formula</b> of this molecule?',
    options: ['P₄O₆', 'P₆O₄', 'PO₄', 'P₄O₄'],
    answer: 'P₄O₆',
    hint: 'Count the grey atoms for P and the white atoms for O separately.',
    explanation: 'The diagram shows <b>4 grey phosphorus atoms</b> and <b>6 white oxygen atoms</b>, giving the formula <b>P₄O₆</b>. Subscripts show the number of each atom type in one formula unit. This is the formula for phosphorus(III) oxide.' }),

  // ── Simple distillation apparatus (2021 NCE Chem Fig 1.2) ─────────────────
  // Round-bottom flask with mixture + boiling chips, Bunsen burner below.

  makeMCQ({ id: 'g9s-cdm-002', chapterId: 'g9s-c2-mixtures', subsection: 'distillation', difficulty: 2,
    question: 'A diagram of a <b>simple distillation</b> apparatus shows a round-bottom flask labelled "Mixture + boiling chips" being heated by a Bunsen burner. Why are <b>boiling chips</b> added to the mixture?',
    options: [
      'To ensure smooth boiling of the mixture',
      'To increase the boiling point of the mixture',
      'To decrease the boiling point of the mixture',
      'To prevent the mixture from cooling down'
    ],
    answer: 'To ensure smooth boiling of the mixture',
    hint: 'Without them, the liquid may "bump" violently instead of boiling smoothly.',
    explanation: '<b>Boiling chips (anti-bumping granules)</b> are added to ensure <b>smooth, even boiling</b>. They provide nucleation sites for bubbles to form gradually. Without them, the liquid can become superheated and suddenly boil violently ("bumping"), which could break the glassware or cause spillage.' }),

  // ── Sublimation apparatus (2021 NCE Chem Fig 2.1) ─────────────────────────
  // Funnel (inverted) over mixture on evaporating dish, burner below.
  // A = cotton wool plug (at funnel tip), B = funnel, C = NaCl (residue), D = burner.

  makeMCQ({ id: 'g9s-cdm-003', chapterId: 'g9s-c2-mixtures', subsection: 'sublimation', difficulty: 2,
    question: 'A diagram shows the separation of a mixture of sodium chloride and ammonium chloride. A large funnel is placed inverted over the mixture on a dish with a Bunsen burner below. Label <b>A</b> is at the very tip (top) of the inverted funnel. Choose from: Funnel, Burner, Cotton wool plug, Ammonium chloride, Evaporating dish. What is label A?',
    options: ['Cotton wool plug', 'Evaporating dish', 'Funnel', 'Ammonium chloride'],
    answer: 'Cotton wool plug',
    hint: 'It sits at the top of the funnel to prevent ammonium chloride vapour from escaping.',
    explanation: 'Label A is the <b>cotton wool plug</b> placed at the tip of the inverted funnel. It traps the ammonium chloride vapour that sublimates (turns directly from solid to gas when heated), allowing it to cool and re-solidify on the inside of the funnel. Sodium chloride does not sublime and stays in the evaporating dish.' }),

  // ── Paper chromatography result (2021 NCE Chem Fig 2.2) ───────────────────
  // Paper strip with start line, spots A–D and mixtures X, Y, solvent front R.

  makeMCQ({ id: 'g9s-cdm-004', chapterId: 'g9s-c2-mixtures', subsection: 'choosing_a_technique', difficulty: 1,
    question: 'An experiment separates the components of mixtures X and Y using a paper strip. The strip is placed in a solvent. The different substances travel different distances up the paper. The results show spots at various heights. What is the name of this separation technique?',
    options: ['Paper chromatography', 'Distillation', 'Filtration', 'Evaporation'],
    answer: 'Paper chromatography',
    hint: 'It uses paper and a moving solvent to separate substances based on how far they travel.',
    explanation: '<b>Paper chromatography</b> separates mixtures based on how strongly each component is attracted to the stationary phase (paper) compared to the mobile phase (solvent). Components that are more soluble in the solvent travel farther up the paper. It is used to identify dyes, inks, pigments and other mixtures.' }),

  makeMCQ({ id: 'g9s-cdm-005', chapterId: 'g9s-c2-mixtures', subsection: 'apparatus_diagrams', difficulty: 2,
    question: 'In a chromatography diagram, a horizontal line labelled <b>R</b> is drawn across the top of the paper, above all the coloured spots. What does line R represent?',
    options: ['The solvent front', 'The start line', 'A baseline marker', 'A separation band'],
    answer: 'The solvent front',
    hint: 'It marks the highest point the solvent reached during the experiment.',
    explanation: 'Line <b>R</b> is the <b>solvent front</b> — the highest point reached by the solvent on the chromatography paper. It is important for calculating the Rf value: Rf = distance moved by substance ÷ distance moved by solvent front. The solvent front is drawn immediately when the paper is removed from the solvent (before it evaporates).' }),

  // ── NOₓ concentration 24-hour graph (2021 NCE Chem Fig 4.1) ──────────────
  // Graph: x-axis = time (midnight to midnight), y-axis = concentration (ppm).
  // Peak at ~12 noon at 0.25 ppm.

  makeMCQ({ id: 'g9s-cdm-006', chapterId: 'g9s-c1-atmosphere', subsection: 'air_pollutants', difficulty: 2,
    question: 'A graph shows the concentration of oxides of nitrogen in a city over 24 hours. The concentration is lowest at midnight (~0.05 ppm), rises through the morning, reaches a <b>peak at 12 noon (~0.25 ppm)</b>, then falls through the afternoon and evening. At what time of day is the concentration of oxides of nitrogen <b>highest</b>?',
    options: ['12 noon', '4 a.m.', '4 p.m.', '12 midnight'],
    answer: '12 noon',
    hint: 'The peak corresponds to maximum traffic and industrial activity.',
    explanation: 'The concentration of oxides of nitrogen (NOₓ) is highest at <b>12 noon</b> (0.25 ppm). This coincides with peak traffic levels — vehicles emit NOₓ through combustion of fuels. At midnight, traffic is minimal so concentrations fall to their lowest. NOₓ gases contribute to photochemical smog and acid rain.' }),

  // ── Metals in HCl test tubes (2021 NCE Chem Fig 5.1) ─────────────────────
  // Ca: many bubbles (most reactive), Zn: moderate, Mg: many, Fe: fewest.

  makeMCQ({ id: 'g9s-cdm-007', chapterId: 'g9s-c4-metals', subsection: 'reactivity_series', difficulty: 2,
    question: 'Four test tubes each contain the same volume of dilute hydrochloric acid. A different metal is placed in each: <b>Calcium, Zinc, Magnesium</b> and <b>Iron</b>. Calcium produces the most bubbles of gas and Iron produces the fewest. Which metal is the <b>most reactive</b>?',
    options: ['Calcium', 'Magnesium', 'Zinc', 'Iron'],
    answer: 'Calcium',
    hint: 'The number of gas bubbles produced indicates how vigorously the metal reacts.',
    explanation: '<b>Calcium</b> is the most reactive metal in this experiment, producing the most bubbles of hydrogen gas. The more vigorous the reaction with acid, the higher the metal\'s position in the reactivity series. Order from most to least reactive: Ca > Mg > Zn > Fe. Calcium reacts so vigorously it may cause the acid to froth.' }),

  makeMCQ({ id: 'g9s-cdm-008', chapterId: 'g9s-c4-metals', subsection: 'reactivity_series', difficulty: 2,
    question: 'In the same experiment with Calcium, Zinc, Magnesium and Iron in dilute hydrochloric acid, Iron produces the fewest bubbles of hydrogen gas. Which metal is the <b>least reactive</b>?',
    options: ['Iron', 'Calcium', 'Zinc', 'Magnesium'],
    answer: 'Iron',
    hint: 'Fewer bubbles = slower reaction = lower position in the reactivity series.',
    explanation: '<b>Iron</b> is the least reactive of the four metals tested. It reacts slowly with dilute hydrochloric acid, producing very few hydrogen bubbles. Reactivity order (most → least reactive): Ca > Mg > Zn > Fe. Iron\'s lower reactivity means it does not corrode as quickly as calcium or magnesium, though it does rust when exposed to water and oxygen.' })

);

})();
