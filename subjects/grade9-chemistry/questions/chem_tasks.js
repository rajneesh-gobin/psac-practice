'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Chemistry — SHAPE batch: multi-part structured tasks
//  18 tasks  ·  IDs g9s-ctask-001 … g9s-ctask-018
//  Format: makeTask() — see engine/helpers.js and ch04_volume.js
//  Source: NCE Science (Chemistry) 2021-2025 structured question patterns.
// ══════════════════════════════════════════════════════════════════════════
(function () {

// ── Task 1: Eutrophication data question ─────────────────────────────────
STATIC_QUESTIONS.push(makeTask({
  id: 'g9s-ctask-001',
  chapterId: 'g9s-c1-atmosphere',
  subsection: 'eutrophication',
  difficulty: 3,
  source: 'NCE Chemistry C1 structured data-interpretation pattern.',
  intro: 'A student monitored dissolved oxygen (DO) levels at four points along a river below a farm that uses nitrate fertiliser.',
  stimulus: {
    html: '<svg viewBox="0 0 320 130" width="320" role="img" aria-label="a table of dissolved oxygen data at four river sampling points">'
        + '<text x="160" y="14" font-size="10" text-anchor="middle" fill="#0f172a">Dissolved Oxygen Along the River</text>'
        + '<rect x="10" y="20" width="300" height="105" fill="none" stroke="#0f172a" stroke-width="1.5"/>'
        + '<line x1="130" y1="20" x2="130" y2="125" stroke="#0f172a" stroke-width="1.5"/>'
        + '<line x1="10" y1="41" x2="310" y2="41" stroke="#0f172a" stroke-width="1.5"/>'
        + '<text x="16" y="35" font-size="9" fill="#0f172a">Sampling point</text>'
        + '<text x="136" y="35" font-size="9" fill="#0f172a">DO (mg/L)</text>'
        + '<line x1="10" y1="62" x2="310" y2="62" stroke="#cbd5e1" stroke-width="1"/>'
        + '<line x1="10" y1="83" x2="310" y2="83" stroke="#cbd5e1" stroke-width="1"/>'
        + '<line x1="10" y1="104" x2="310" y2="104" stroke="#cbd5e1" stroke-width="1"/>'
        + '<text x="16" y="56" font-size="9" fill="#334155">A (500 m above farm)</text>'
        + '<text x="136" y="56" font-size="9" fill="#334155">9.2</text>'
        + '<text x="16" y="77" font-size="9" fill="#334155">B (200 m below farm)</text>'
        + '<text x="136" y="77" font-size="9" fill="#334155">4.1</text>'
        + '<text x="16" y="98" font-size="9" fill="#334155">C (800 m below farm)</text>'
        + '<text x="136" y="98" font-size="9" fill="#334155">1.8</text>'
        + '<text x="16" y="119" font-size="9" fill="#334155">D (2 km below farm)</text>'
        + '<text x="136" y="119" font-size="9" fill="#334155">7.5</text>'
        + '</svg>',
    altText: 'a table showing dissolved oxygen at four river points above and below a farm'
  },
  parts: [
    {
      label: 'a',
      prompt: 'State the dissolved oxygen reading at point A.',
      marks: 1,
      hint: 'Read the value from the table for point A.',
      explanation: 'Point A, 500 m above the farm, shows 9.2 mg/L — the baseline before any farm runoff.',
      response: { kind: 'number', answer: '9.2', unit: 'mg/L' }
    },
    {
      label: 'b',
      prompt: 'Between which two points is the dissolved oxygen the <b>lowest</b>? Suggest why.',
      marks: 2,
      hint: 'Find the minimum value, then explain what causes oxygen to fall near the farm.',
      explanation: 'Point C (1.8 mg/L) is the lowest. After the fertiliser enters the river, algae bloom; the algae die and are decomposed by bacteria whose aerobic respiration removes oxygen, reaching the lowest level at C before the river recovers at D.',
      response: { kind: 'expression', answer: 'B and C', accept: ['between B and C', 'B to C', 'at C'] }
    },
    {
      label: 'c',
      prompt: 'The dissolved oxygen at D (2 km from the farm) has risen to 7.5 mg/L. Explain this observation.',
      marks: 2,
      hint: 'The river has had more distance to recover — what processes restore oxygen?',
      explanation: 'Further downstream the organic matter is fully decomposed, bacterial activity falls, and the river re-oxygenates by diffusion of atmospheric oxygen and photosynthesis by recovering aquatic plants. This is called the oxygen sag recovery.',
      response: { kind: 'written' },
      rubric: '1 mark each, to a maximum of 2: the organic matter has been fully decomposed so bacterial respiration falls; oxygen re-enters the water by diffusion from the atmosphere; aquatic plants recovering downstream add oxygen by photosynthesis; this is the recovery limb of the oxygen sag curve.'
    },
    {
      label: 'd',
      prompt: 'Name the process by which excess fertiliser in a river causes fish to die. Describe the chain of events.',
      marks: 3,
      hint: 'Nutrient enrichment → algae → decomposition → deoxygenation.',
      explanation: 'Eutrophication. Nitrates/phosphates from the fertiliser stimulate rapid algal growth (algal bloom). The bloom shades submerged plants, which die; then the algae die and decomposer bacteria use up dissolved oxygen by aerobic respiration, leaving too little O₂ for fish to survive (deoxygenation).',
      response: { kind: 'written' },
      rubric: '1 mark for naming eutrophication. Then 1 mark each, to a maximum of 2 more, for the chain: nitrates and phosphates enrich the water and stimulate an algal bloom; the bloom shades submerged plants, which die; decomposer bacteria break down the dead algae and plants and their aerobic respiration removes dissolved oxygen; the fish die of deoxygenation.'
    }
  ]
}));

// ── Task 2: Apparatus diagram — distillation ─────────────────────────────
STATIC_QUESTIONS.push(makeTask({
  id: 'g9s-ctask-002',
  chapterId: 'g9s-c2-mixtures',
  subsection: 'apparatus_diagrams',
  difficulty: 2,
  source: 'NCE Chemistry C2 apparatus question pattern.',
  intro: 'The diagram below shows the apparatus used to separate a salt solution by distillation. Parts are labelled A–D.',
  stimulus: {
    html: '<svg viewBox="0 0 340 200" width="340" role="img" aria-label="a labelled distillation apparatus diagram">'
        + '<ellipse cx="80" cy="140" rx="55" ry="40" fill="none" stroke="#0f172a" stroke-width="2"/>'
        + '<line x1="135" y1="115" x2="230" y2="85" stroke="#0f172a" stroke-width="2"/>'
        + '<rect x="215" y="65" width="80" height="30" rx="4" fill="none" stroke="#0f172a" stroke-width="2"/>'
        + '<line x1="295" y1="80" x2="320" y2="100" stroke="#0f172a" stroke-width="2"/>'
        + '<ellipse cx="325" cy="108" rx="12" ry="8" fill="none" stroke="#0f172a" stroke-width="2"/>'
        + '<rect x="5" y="155" width="150" height="10" rx="3" fill="#fde68a" stroke="#b45309" stroke-width="1"/>'
        + '<text x="60" y="125" font-size="10" fill="#0f172a" font-weight="bold">A</text>'
        + '<text x="120" y="75" font-size="10" fill="#0f172a" font-weight="bold">B</text>'
        + '<text x="248" y="60" font-size="10" fill="#0f172a" font-weight="bold">C</text>'
        + '<text x="312" y="60" font-size="10" fill="#0f172a" font-weight="bold">D</text>'
        + '<text x="60" y="178" font-size="9" fill="#78350f">Heat source</text>'
        + '</svg>',
    altText: 'a distillation apparatus with parts A (flask), B (side arm/still-head), C (condenser), D (receiving flask) labelled'
  },
  parts: [
    {
      label: 'a',
      prompt: 'Identify part C in the diagram.',
      marks: 1,
      hint: 'The long slanted tube where vapour is cooled.',
      explanation: 'Part C is the condenser (Liebig condenser). Cold water flows through its outer jacket to cool and condense the vapour back into a liquid.',
      response: { kind: 'expression', answer: 'condenser', accept: ['Liebig condenser', 'water condenser'] }
    },
    {
      label: 'b',
      prompt: 'State the purpose of part A in this experiment.',
      marks: 1,
      hint: 'Where is the mixture placed?',
      explanation: 'Part A is the distillation flask (round-bottomed flask) where the salt solution is placed and heated. The mixture boils in this vessel.',
      response: { kind: 'expression', answer: 'distillation flask', accept: ['flask', 'round-bottomed flask', 'container for the mixture'] }
    },
    {
      label: 'c',
      prompt: 'Explain why the thermometer should be positioned at the junction of the side arm (B) rather than immersed in the boiling liquid.',
      marks: 2,
      hint: 'What does the thermometer measure, and why is vapour temperature the important quantity?',
      explanation: 'The thermometer measures the boiling point of the vapour entering the condenser, which equals the boiling point of the substance being collected as distillate. If placed in the liquid, it would record the temperature of the whole mixture (which is higher), not just the component that is distilling over.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: The thermometer measures the boiling point of the vapour entering the condenser, which equals the boiling point of the substance being collected as distillate; If placed in the liquid, it would record the temperature of the whole mixture (which is higher), not just the component that is distilling over.'
    },
    {
      label: 'd',
      prompt: 'After distillation, the student tests the distillate and finds it conducts electricity poorly. What does this confirm?',
      marks: 2,
      hint: 'Pure water vs. salt solution: which conducts?',
      explanation: 'Pure water is a very poor conductor of electricity because it contains very few ions; the salt solution conducts because dissolved Na⁺ and Cl⁻ ions carry charge. Poor conductivity in the distillate confirms that the salt was separated and the distillate is (essentially) pure water.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: Pure water is a very poor conductor of electricity because it contains very few ions; the salt solution conducts because dissolved Na⁺ and Cl⁻ ions carry charge; Poor conductivity in the distillate confirms that the salt was separated and the distillate is (essentially) pure water.'
    }
  ]
}));

// ── Task 3: Balancing equations — metals with acids ──────────────────────
STATIC_QUESTIONS.push(makeTask({
  id: 'g9s-ctask-003',
  chapterId: 'g9s-c4-metals',
  subsection: 'equations_for_metals',
  difficulty: 3,
  source: 'NCE Chemistry C3/C4 equation-writing structured question pattern.',
  intro: 'A student investigates the reactions of three metals — magnesium, iron and copper — with dilute hydrochloric acid.',
  parts: [
    {
      label: 'a',
      prompt: 'Write a balanced equation for the reaction of magnesium with dilute hydrochloric acid.',
      marks: 2,
      hint: 'Metal + HCl → metal chloride + hydrogen gas.',
      explanation: 'Mg + 2HCl → MgCl₂ + H₂. Mg²⁺ needs two Cl⁻ ions; two HCl provide two Cl and two H, forming one H₂.',
      response: { kind: 'expression', answer: 'Mg + 2HCl → MgCl₂ + H₂', accept: ['Mg+2HCl→MgCl2+H2'] }
    },
    {
      label: 'b',
      prompt: 'Write a balanced equation for the reaction of iron with dilute hydrochloric acid.',
      marks: 2,
      hint: 'Iron forms Fe²⁺ with dilute acid.',
      explanation: 'Fe + 2HCl → FeCl₂ + H₂. Iron(II) chloride is formed because Fe loses 2 electrons to become Fe²⁺.',
      response: { kind: 'expression', answer: 'Fe + 2HCl → FeCl₂ + H₂', accept: ['Fe+2HCl→FeCl2+H2'] }
    },
    {
      label: 'c',
      prompt: 'Explain why copper does not react with dilute hydrochloric acid.',
      marks: 2,
      hint: 'Use the reactivity series.',
      explanation: 'Copper is below hydrogen in the reactivity series. A metal can only displace hydrogen from an acid if it is more reactive than hydrogen. Since Cu < H in reactivity, it cannot displace H⁺ ions from HCl.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: Copper is below hydrogen in the reactivity series; A metal can only displace hydrogen from an acid if it is more reactive than hydrogen; Since Cu < H in reactivity, it cannot displace H⁺ ions from HCl.'
    },
    {
      label: 'd',
      prompt: 'The student measures the time taken to collect 20 cm³ of hydrogen from excess magnesium in 50 cm³ of 1 mol/dm³ HCl: 45 seconds. She then repeats with 0.5 mol/dm³ HCl. Predict whether the new time will be greater or smaller than 45 s. Explain.',
      marks: 2,
      hint: 'How does halving the acid concentration affect the rate of reaction?',
      explanation: 'The time will be greater (longer). Halving the concentration reduces the number of H⁺ ions per unit volume, decreasing the frequency of successful collisions between H⁺ and Mg surface atoms, so the rate of H₂ production is lower and it takes longer to collect 20 cm³.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: The time will be greater (longer); Halving the concentration reduces the number of H⁺ ions per unit volume, decreasing the frequency of successful collisions between H⁺ and Mg surface atoms, so the rate of H₂ production is lower and it takes longer to collect 20 cm³.'
    }
  ]
}));

// ── Task 4: Reactivity series experiment ────────────────────────────────
STATIC_QUESTIONS.push(makeTask({
  id: 'g9s-ctask-004',
  chapterId: 'g9s-c4-metals',
  subsection: 'reactivity_series',
  difficulty: 3,
  source: 'NCE Chemistry C4 reactivity series structured question.',
  intro: 'A class carries out displacement reactions to determine a reactivity order. Their results are shown in the table below (✓ = reaction, ✗ = no reaction).',
  stimulus: {
    html: '<svg viewBox="0 0 360 160" width="360" role="img" aria-label="a results table for displacement reactions between four metals and three salt solutions">'
        + '<text x="180" y="14" font-size="10" text-anchor="middle" fill="#0f172a">Displacement Reaction Results</text>'
        + '<rect x="10" y="20" width="340" height="135" fill="none" stroke="#0f172a" stroke-width="1.5"/>'
        + '<line x1="100" y1="20" x2="100" y2="155" stroke="#0f172a" stroke-width="1.5"/>'
        + '<line x1="190" y1="20" x2="190" y2="155" stroke="#0f172a" stroke-width="1.5"/>'
        + '<line x1="275" y1="20" x2="275" y2="155" stroke="#0f172a" stroke-width="1.5"/>'
        + '<line x1="10" y1="47" x2="350" y2="47" stroke="#0f172a" stroke-width="1.5"/>'
        + '<line x1="10" y1="80" x2="350" y2="80" stroke="#cbd5e1" stroke-width="1"/>'
        + '<line x1="10" y1="113" x2="350" y2="113" stroke="#cbd5e1" stroke-width="1"/>'
        + '<text x="16" y="40" font-size="9" fill="#0f172a">Metal</text>'
        + '<text x="106" y="34" font-size="9" fill="#0f172a">CuSO₄ solution</text>'
        + '<text x="196" y="34" font-size="9" fill="#0f172a">FeSO₄ solution</text>'
        + '<text x="281" y="34" font-size="9" fill="#0f172a">ZnSO₄ solution</text>'
        + '<text x="16" y="70" font-size="9" fill="#334155">Zinc (Zn)</text>'
        + '<text x="140" y="70" font-size="9" fill="#15803d">✓</text>'
        + '<text x="230" y="70" font-size="9" fill="#15803d">✓</text>'
        + '<text x="310" y="70" font-size="9" fill="#6b7280">✗</text>'
        + '<text x="16" y="103" font-size="9" fill="#334155">Iron (Fe)</text>'
        + '<text x="140" y="103" font-size="9" fill="#15803d">✓</text>'
        + '<text x="230" y="103" font-size="9" fill="#6b7280">✗</text>'
        + '<text x="310" y="103" font-size="9" fill="#6b7280">✗</text>'
        + '<text x="16" y="136" font-size="9" fill="#334155">Copper (Cu)</text>'
        + '<text x="140" y="136" font-size="9" fill="#6b7280">✗</text>'
        + '<text x="230" y="136" font-size="9" fill="#6b7280">✗</text>'
        + '<text x="310" y="136" font-size="9" fill="#6b7280">✗</text>'
        + '</svg>',
    altText: 'a results table for displacement reactions between zinc, iron, copper and solutions of copper sulfate, iron sulfate, zinc sulfate'
  },
  parts: [
    {
      label: 'a',
      prompt: 'Write the order of reactivity of these three metals, from most reactive to least reactive, using the data in the table.',
      marks: 2,
      hint: 'The most reactive metal displaces the most other metals from their solutions.',
      explanation: 'Zn displaces both Cu and Fe (2 reactions). Fe displaces only Cu (1 reaction). Cu displaces none (0). Order: Zn > Fe > Cu.',
      response: { kind: 'expression', answer: 'Zn > Fe > Cu', accept: ['Zinc > Iron > Copper'] }
    },
    {
      label: 'b',
      prompt: 'Write a balanced ionic equation for the reaction of zinc with copper sulfate solution.',
      marks: 2,
      hint: 'Spectator ions do not appear in the ionic equation.',
      explanation: 'Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s). The SO₄²⁻ ion is a spectator ion and is omitted.',
      response: { kind: 'expression', answer: 'Zn + Cu²⁺ → Zn²⁺ + Cu', accept: ['Zn(s)+Cu2+(aq)→Zn2+(aq)+Cu(s)'] }
    },
    {
      label: 'c',
      prompt: 'Predict what would be observed if silver wire were placed into zinc sulfate solution. Explain your reasoning.',
      marks: 2,
      hint: 'Where does Ag sit relative to Zn in the reactivity series?',
      explanation: 'No visible reaction. Silver is less reactive than zinc (Ag < Zn); a less reactive metal cannot displace a more reactive metal from its salt solution. The wire remains unchanged and the solution stays colourless.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: No visible reaction; Silver is less reactive than zinc (Ag < Zn); a less reactive metal cannot displace a more reactive metal from its salt solution; The wire remains unchanged and the solution stays colourless.'
    },
    {
      label: 'd',
      prompt: 'Iron is used to galvanise steel (coat it). How does this protect the steel from rusting, even when the coating is scratched?',
      marks: 2,
      hint: 'Wait — is it iron or zinc used for galvanising? Which is more reactive?',
      explanation: 'Galvanising uses ZINC, not iron. Zinc is more reactive than iron; when both metals are exposed at a scratch, zinc is preferentially oxidised (sacrificial protection), protecting the iron from corrosion. The zinc acts as a sacrificial anode.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: Galvanising uses ZINC, not iron; Zinc is more reactive than iron; when both metals are exposed at a scratch, zinc is preferentially oxidised (sacrificial protection), protecting the iron from corrosion; The zinc acts as a sacrificial anode.'
    }
  ]
}));

// ── Task 5: Acid rain — multi-part ───────────────────────────────────────
STATIC_QUESTIONS.push(makeTask({
  id: 'g9s-ctask-005',
  chapterId: 'g9s-c1-atmosphere',
  subsection: 'acid_rain',
  difficulty: 3,
  source: 'NCE Chemistry C1 acid rain structured question.',
  intro: 'Acid rain is formed when sulfur dioxide and oxides of nitrogen dissolve in atmospheric water droplets.',
  parts: [
    {
      label: 'a',
      prompt: 'Name the two main gaseous pollutants that cause acid rain and state one source of each.',
      marks: 4,
      hint: 'SO₂ and NOₓ — where does each come from?',
      explanation: 'SO₂: burning of sulfur-containing coal in power stations. NOₓ (nitrogen monoxide/dioxide): high-temperature combustion in car engines, where atmospheric N₂ and O₂ react.',
      response: { kind: 'written' },
      rubric: '4 marks. Award one mark per point, to a maximum of 4: SO₂: burning of sulfur-containing coal in power stations; NOₓ (nitrogen monoxide/dioxide): high-temperature combustion in car engines, where atmospheric N₂ and O₂ react.'
    },
    {
      label: 'b',
      prompt: 'Write the equation for the formation of sulfuric acid from sulfur dioxide in the atmosphere.',
      marks: 2,
      hint: 'SO₂ + water + oxygen → an acid.',
      explanation: '2SO₂ + O₂ + 2H₂O → 2H₂SO₄. (Or acceptably: SO₂ + H₂O → H₂SO₃, then H₂SO₃ + ½O₂ → H₂SO₄.)',
      response: { kind: 'expression', answer: '2SO₂ + O₂ + 2H₂O → 2H₂SO₄', accept: ['SO2+H2O+1/2O2→H2SO4'] }
    },
    {
      label: 'c',
      prompt: 'Give <b>two</b> harmful effects of acid rain on the environment.',
      marks: 2,
      hint: 'Think about effects on lakes, forests and buildings.',
      explanation: 'Any two from: (1) lowers pH of lakes and rivers, killing fish and aquatic life; (2) damages forests by leaching essential minerals from the soil and destroying leaf cuticles; (3) erodes limestone and marble buildings and statues; (4) acidifies soil, reducing crop yields.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: Any two from: (1) lowers pH of lakes and rivers, killing fish and aquatic life; (2) damages forests by leaching essential minerals from the soil and destroying leaf cuticles; (3) erodes limestone and marble buildings and statues; (4) acidifies soil, reducing crop yields.'
    },
    {
      label: 'd',
      prompt: 'Suggest one industrial and one agricultural measure that would reduce acid rain.',
      marks: 2,
      hint: 'Reduce emissions OR neutralise the acid.',
      explanation: 'Industrial: fit flue-gas desulfurisation (scrubbers) to power stations to remove SO₂ before it is emitted. Agricultural: apply lime (CaCO₃ or Ca(OH)₂) to acidified farmland and lakes to neutralise the acid.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: Industrial: fit flue-gas desulfurisation (scrubbers) to power stations to remove SO₂ before it is emitted; Agricultural: apply lime (CaCO₃ or Ca(OH)₂) to acidified farmland and lakes to neutralise the acid.'
    }
  ]
}));

// ── Task 6: Salts preparation — neutralisation ───────────────────────────
STATIC_QUESTIONS.push(makeTask({
  id: 'g9s-ctask-006',
  chapterId: 'g9s-c5-salts',
  subsection: 'neutralisation',
  difficulty: 3,
  source: 'NCE Chemistry C5 salt preparation structured question.',
  intro: 'A student wishes to prepare pure copper sulfate crystals starting from copper oxide and dilute sulfuric acid.',
  parts: [
    {
      label: 'a',
      prompt: 'Write the balanced equation for the reaction of copper oxide with sulfuric acid.',
      marks: 2,
      hint: 'Base + acid → salt + water.',
      explanation: 'CuO + H₂SO₄ → CuSO₄ + H₂O.',
      response: { kind: 'expression', answer: 'CuO + H₂SO₄ → CuSO₄ + H₂O', accept: ['CuO+H2SO4→CuSO4+H2O'] }
    },
    {
      label: 'b',
      prompt: 'Explain why excess copper oxide is added to the acid rather than the exact stoichiometric amount.',
      marks: 2,
      hint: 'What happens if excess acid remains in the product?',
      explanation: 'Excess solid CuO ensures all the acid is neutralised; any remaining acid would contaminate the final crystals. The excess CuO (undissolved solid) can then be removed by filtration, leaving a pure CuSO₄ solution.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: Excess solid CuO ensures all the acid is neutralised; any remaining acid would contaminate the final crystals; The excess CuO (undissolved solid) can then be removed by filtration, leaving a pure CuSO₄ solution.'
    },
    {
      label: 'c',
      prompt: 'Describe how the student would obtain dry copper sulfate crystals from the pure CuSO₄ solution.',
      marks: 3,
      hint: 'Evaporate, then cool, then dry.',
      explanation: 'Gently heat the solution in an evaporating dish until a saturated solution is produced (test by dipping a cooled glass rod — crystals form on it). Remove from heat and allow to cool slowly — crystals form. Filter off the crystals. Pat dry between sheets of filter paper or leave in a warm oven at low temperature (not too hot, or crystals lose water of crystallisation and turn white).',
      response: { kind: 'written' },
      rubric: '3 marks. Award one mark per point, to a maximum of 3: Gently heat the solution in an evaporating dish until a saturated solution is produced (test by dipping a cooled glass rod — crystals form on it); Remove from heat and allow to cool slowly — crystals form; Filter off the crystals; Pat dry between sheets of filter paper or leave in a warm oven at low temperature (not too hot, or crystals lose water of crystallisation and turn white).'
    },
    {
      label: 'd',
      prompt: 'The student notices her crystals are blue. A friend says anhydrous copper sulfate is white. Explain the difference.',
      marks: 2,
      hint: 'What is different about the two forms?',
      explanation: 'The blue crystals are CuSO₄·5H₂O (copper sulfate pentahydrate); they contain five water molecules of crystallisation chemically incorporated into the crystal lattice, which gives the blue colour. Anhydrous CuSO₄ (CuSO₄ with no water) is white because the absence of water changes the coordination environment of the Cu²⁺ ion.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: The blue crystals are CuSO₄·5H₂O (copper sulfate pentahydrate); they contain five water molecules of crystallisation chemically incorporated into the crystal lattice, which gives the blue colour; Anhydrous CuSO₄ (CuSO₄ with no water) is white because the absence of water changes the coordination environment of the Cu²⁺ ion.'
    }
  ]
}));

// ── Task 7: Greenhouse gases — data interpretation ───────────────────────
STATIC_QUESTIONS.push(makeTask({
  id: 'g9s-ctask-007',
  chapterId: 'g9s-c1-atmosphere',
  subsection: 'greenhouse_gases',
  difficulty: 3,
  source: 'NCE Chemistry C1 global warming structured question.',
  intro: 'The table shows the global warming potential (GWP) and atmospheric lifetime of four greenhouse gases, relative to CO₂ over a 100-year period.',
  stimulus: {
    html: '<svg viewBox="0 0 360 145" width="360" role="img" aria-label="a table of greenhouse gas properties">'
        + '<text x="180" y="14" font-size="10" text-anchor="middle" fill="#0f172a">Greenhouse Gas Properties</text>'
        + '<rect x="8" y="20" width="344" height="120" fill="none" stroke="#0f172a" stroke-width="1.5"/>'
        + '<line x1="120" y1="20" x2="120" y2="140" stroke="#0f172a" stroke-width="1.5"/>'
        + '<line x1="225" y1="20" x2="225" y2="140" stroke="#0f172a" stroke-width="1.5"/>'
        + '<line x1="8" y1="44" x2="352" y2="44" stroke="#0f172a" stroke-width="1.5"/>'
        + '<line x1="8" y1="68" x2="352" y2="68" stroke="#cbd5e1" stroke-width="1"/>'
        + '<line x1="8" y1="92" x2="352" y2="92" stroke="#cbd5e1" stroke-width="1"/>'
        + '<line x1="8" y1="116" x2="352" y2="116" stroke="#cbd5e1" stroke-width="1"/>'
        + '<text x="14" y="37" font-size="9" fill="#0f172a">Gas</text>'
        + '<text x="126" y="37" font-size="9" fill="#0f172a">GWP (100 yr)</text>'
        + '<text x="231" y="37" font-size="9" fill="#0f172a">Lifetime (years)</text>'
        + '<text x="14" y="60" font-size="9" fill="#334155">Carbon dioxide (CO₂)</text>'
        + '<text x="148" y="60" font-size="9" fill="#334155">1</text>'
        + '<text x="270" y="60" font-size="9" fill="#334155">varies (50–200)</text>'
        + '<text x="14" y="84" font-size="9" fill="#334155">Methane (CH₄)</text>'
        + '<text x="148" y="84" font-size="9" fill="#334155">28</text>'
        + '<text x="270" y="84" font-size="9" fill="#334155">12</text>'
        + '<text x="14" y="108" font-size="9" fill="#334155">Nitrous oxide (N₂O)</text>'
        + '<text x="148" y="108" font-size="9" fill="#334155">265</text>'
        + '<text x="270" y="108" font-size="9" fill="#334155">114</text>'
        + '<text x="14" y="132" font-size="9" fill="#334155">SF₆</text>'
        + '<text x="148" y="132" font-size="9" fill="#334155">23,500</text>'
        + '<text x="270" y="132" font-size="9" fill="#334155">3,200</text>'
        + '</svg>',
    altText: 'a table showing global warming potential and atmospheric lifetime of CO2, methane, nitrous oxide and SF6'
  },
  parts: [
    {
      label: 'a',
      prompt: 'Which gas in the table has the highest global warming potential per molecule?',
      marks: 1,
      hint: 'Read the GWP column.',
      explanation: 'SF₆ has the highest GWP (23,500 times that of CO₂ over 100 years).',
      response: { kind: 'expression', answer: 'SF₆', accept: ['sulfur hexafluoride', 'SF6'] }
    },
    {
      label: 'b',
      prompt: 'Methane has a shorter atmospheric lifetime than CO₂ but a much higher GWP. Explain the significance of this for climate policy.',
      marks: 3,
      hint: 'Short lifetime = fast results; high GWP = large impact while present.',
      explanation: 'Methane is 28× more potent than CO₂ while present. Its short lifetime (12 years) means that if methane emissions are cut sharply, atmospheric concentrations drop relatively quickly, giving faster climate benefit than CO₂ reduction (which takes centuries to clear). This makes methane a high-priority short-term target for slowing near-term warming.',
      response: { kind: 'written' },
      rubric: '3 marks. Award one mark per point, to a maximum of 3: Methane is 28× more potent than CO₂ while present; Its short lifetime (12 years) means that if methane emissions are cut sharply, atmospheric concentrations drop relatively quickly, giving faster climate benefit than CO₂ reduction (which takes centuries to clear); This makes methane a high-priority short-term target for slowing near-term warming.'
    },
    {
      label: 'c',
      prompt: 'State one human activity that produces nitrous oxide (N₂O) and explain why this makes it an environmental concern.',
      marks: 2,
      hint: 'N₂O is produced in agriculture.',
      explanation: 'N₂O is produced by nitrification and denitrification of nitrogen fertilisers in soil. It is a concern because it has a GWP of 265 and an atmospheric lifetime of 114 years, so even small amounts make a large long-term contribution to warming; it also destroys stratospheric ozone.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: N₂O is produced by nitrification and denitrification of nitrogen fertilisers in soil; It is a concern because it has a GWP of 265 and an atmospheric lifetime of 114 years, so even small amounts make a large long-term contribution to warming; it also destroys stratospheric ozone.'
    }
  ]
}));

// ── Task 8: Separation technique choice ─────────────────────────────────
STATIC_QUESTIONS.push(makeTask({
  id: 'g9s-ctask-008',
  chapterId: 'g9s-c2-mixtures',
  subsection: 'choosing_a_technique',
  difficulty: 2,
  source: 'NCE Chemistry C2 separation choice structured question.',
  intro: 'A student has the following four mixtures to separate. She must choose the best technique for each.',
  parts: [
    {
      label: 'a',
      prompt: 'Mixture 1: Iodine crystals mixed with sodium chloride powder. Name the separation technique and explain the principle.',
      marks: 2,
      hint: 'Only one substance changes state when gently heated.',
      explanation: 'Sublimation. Iodine sublimes (converts directly from solid to vapour) when gently heated; sodium chloride does not sublime. The iodine vapour is collected as pure crystals on a cold surface, leaving NaCl behind.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: Sublimation; Iodine sublimes (converts directly from solid to vapour) when gently heated; sodium chloride does not sublime; The iodine vapour is collected as pure crystals on a cold surface, leaving NaCl behind.'
    },
    {
      label: 'b',
      prompt: 'Mixture 2: Salt dissolved in water. Name the technique to recover PURE WATER (not the salt).',
      marks: 1,
      hint: 'You need to collect the water, not the salt.',
      explanation: 'Distillation. The water is evaporated from the solution and condensed as pure distillate; the salt remains in the flask.',
      response: { kind: 'expression', answer: 'distillation', accept: ['simple distillation'] }
    },
    {
      label: 'c',
      prompt: 'Mixture 3: Copper sulfate dissolved in water. Name the technique to obtain copper sulfate crystals.',
      marks: 1,
      hint: 'You want the solid, not the liquid.',
      explanation: 'Crystallisation (evaporation to saturation followed by cooling). The solution is evaporated to a saturated solution and then cooled slowly; CuSO₄·5H₂O crystals form and are collected by filtration.',
      response: { kind: 'expression', answer: 'crystallisation', accept: ['crystallization', 'evaporation and crystallisation'] }
    },
    {
      label: 'd',
      prompt: 'Mixture 4: Ethanol (b.p. 78 °C) and water (b.p. 100 °C) — both liquids, fully miscible. Name the most effective technique.',
      marks: 2,
      hint: 'They are both liquids with different but fairly close boiling points.',
      explanation: 'Fractional distillation. Because the boiling points are different but relatively close (22 °C apart), a fractionating column is needed to achieve good separation — the more volatile ethanol is enriched at the top of the column and collected first.',
      response: { kind: 'expression', answer: 'fractional distillation', accept: ['fractionation'] }
    }
  ]
}));

// ── Task 9: Predicting metal reactions ───────────────────────────────────
STATIC_QUESTIONS.push(makeTask({
  id: 'g9s-ctask-009',
  chapterId: 'g9s-c4-metals',
  subsection: 'predicting_reactions',
  difficulty: 3,
  source: 'NCE Chemistry C4 prediction and explanation structured question.',
  intro: 'Use the reactivity series (K > Na > Ca > Mg > Al > Zn > Fe > Sn > Pb > H > Cu > Hg > Ag > Au) to answer the following questions.',
  parts: [
    {
      label: 'a',
      prompt: 'Predict whether the following reaction will occur and explain why:<br>Cu(s) + ZnSO₄(aq) → ?',
      marks: 2,
      hint: 'Compare positions of Cu and Zn in the reactivity series.',
      explanation: 'No reaction. Cu is less reactive than Zn (Cu < Zn), so it cannot displace Zn from zinc sulfate solution. Only a more reactive metal can displace a less reactive one.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: No reaction; Cu is less reactive than Zn (Cu < Zn), so it cannot displace Zn from zinc sulfate solution; Only a more reactive metal can displace a less reactive one.'
    },
    {
      label: 'b',
      prompt: 'Predict the products and write a balanced equation for: Mg(s) + 2AgNO₃(aq) → ?',
      marks: 3,
      hint: 'Mg > Ag in reactivity; Mg²⁺ will form.',
      explanation: 'Mg + 2AgNO₃ → Mg(NO₃)₂ + 2Ag. Magnesium displaces silver: Mg gives 2 electrons to 2 Ag⁺ ions, forming Mg²⁺ and 2 Ag atoms. Silvery solid (Ag) deposits on the magnesium; the solution becomes colourless as Ag⁺ is removed.',
      response: { kind: 'expression', answer: 'Mg + 2AgNO₃ → Mg(NO₃)₂ + 2Ag', accept: ['Mg+2AgNO3→Mg(NO3)2+2Ag'] }
    },
    {
      label: 'c',
      prompt: 'A student places a tin strip into lead nitrate solution. She observes a grey deposit on the tin. Which metal is the grey deposit and what does this tell us about the relative reactivity of tin and lead?',
      marks: 2,
      hint: 'The deposited metal is the one displaced from solution.',
      explanation: 'The grey deposit is lead (Pb). Tin has displaced lead from lead nitrate solution, which means Sn > Pb in reactivity. The tin is more reactive and loses electrons to Pb²⁺ ions: Sn + Pb(NO₃)₂ → Sn(NO₃)₂ + Pb.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: The grey deposit is lead (Pb); Tin has displaced lead from lead nitrate solution, which means Sn > Pb in reactivity; The tin is more reactive and loses electrons to Pb²⁺ ions: Sn + Pb(NO₃)₂ → Sn(NO₃)₂ + Pb.'
    }
  ]
}));

// ── Task 10: Water pollution — causes, effects and remedies ──────────────
STATIC_QUESTIONS.push(makeTask({
  id: 'g9s-ctask-010',
  chapterId: 'g9s-c1-atmosphere',
  subsection: 'water_pollution',
  difficulty: 3,
  source: 'NCE Chemistry C1 water pollution structured question.',
  intro: 'The diagram below represents a cross-section of a river receiving inputs from three sources (labelled X, Y and Z).',
  stimulus: {
    html: '<svg viewBox="0 0 320 100" width="320" role="img" aria-label="a river cross-section diagram with three pollution sources labelled X Y and Z">'
        + '<path d="M0,60 Q80,50 160,65 Q240,80 320,55" fill="none" stroke="#3b82f6" stroke-width="8"/>'
        + '<line x1="60" y1="20" x2="60" y2="55" stroke="#dc2626" stroke-width="2"/>'
        + '<text x="55" y="15" font-size="11" fill="#dc2626" font-weight="bold">X</text>'
        + '<text x="30" y="13" font-size="9" fill="#334155">Factory</text>'
        + '<line x1="150" y1="15" x2="150" y2="58" stroke="#16a34a" stroke-width="2"/>'
        + '<text x="145" y="10" font-size="11" fill="#16a34a" font-weight="bold">Y</text>'
        + '<text x="118" y="8" font-size="9" fill="#334155">Farm runoff</text>'
        + '<line x1="250" y1="20" x2="245" y2="52" stroke="#f59e0b" stroke-width="2"/>'
        + '<text x="248" y="15" font-size="11" fill="#f59e0b" font-weight="bold">Z</text>'
        + '<text x="215" y="13" font-size="9" fill="#334155">Sewage outflow</text>'
        + '</svg>',
    altText: 'a river with three pollution sources: X is a factory, Y is farm runoff, Z is a sewage outflow'
  },
  parts: [
    {
      label: 'a',
      prompt: 'Identify the pollutant most likely released from source X (the factory).',
      marks: 1,
      hint: 'Factories can release heavy metals, toxic chemicals or hot water.',
      explanation: 'Likely pollutants from a factory include heavy metals (e.g. lead, mercury), toxic organic chemicals (e.g. pesticides, solvents) or thermal pollution (hot water reducing dissolved oxygen). Any one of these with a brief explanation is acceptable.',
      response: { kind: 'written' },
      rubric: '1 mark. Award the mark for: Likely pollutants from a factory include heavy metals (e.g; lead, mercury), toxic organic chemicals (e.g; pesticides, solvents) or thermal pollution (hot water reducing dissolved oxygen); Any one of these with a brief explanation is acceptable.'
    },
    {
      label: 'b',
      prompt: 'Explain how the runoff from source Y (the farm) can lead to fish dying in the river even though the fertiliser itself is not directly toxic to fish.',
      marks: 3,
      hint: 'Nutrient enrichment → algae → decomposition → oxygen depletion.',
      explanation: 'Farm runoff carries nitrate/phosphate fertilisers into the river. These nutrients trigger an algal bloom. The algae die; decomposer bacteria break down the algal biomass by aerobic respiration, consuming dissolved oxygen. The dissolved oxygen falls so low that fish suffocate (deoxygenation). This chain of events is eutrophication.',
      response: { kind: 'written' },
      rubric: '3 marks. Award one mark per point, to a maximum of 3: Farm runoff carries nitrate/phosphate fertilisers into the river; These nutrients trigger an algal bloom; The algae die; decomposer bacteria break down the algal biomass by aerobic respiration, consuming dissolved oxygen; The dissolved oxygen falls so low that fish suffocate (deoxygenation); This chain of events is eutrophication.'
    },
    {
      label: 'c',
      prompt: 'State one biological indicator organism that would be found in abundance near source Z (sewage) and one that would be absent. Explain.',
      marks: 2,
      hint: 'Pollution-tolerant organisms thrive in low-oxygen, organic-rich water.',
      explanation: 'Present: sludge worms (rat-tailed maggots / Tubifex worms) — they tolerate very low dissolved oxygen. Absent: stonefly larvae / mayfly larvae — these require well-oxygenated, clean water and cannot survive in sewage-polluted conditions.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: Present: sludge worms (rat-tailed maggots / Tubifex worms) — they tolerate very low dissolved oxygen; Absent: stonefly larvae / mayfly larvae — these require well-oxygenated, clean water and cannot survive in sewage-polluted conditions.'
    }
  ]
}));

// ── Task 11: Balancing equations — combustion ────────────────────────────
STATIC_QUESTIONS.push(makeTask({
  id: 'g9s-ctask-011',
  chapterId: 'g9s-c3-language',
  subsection: 'balancing_equations',
  difficulty: 3,
  source: 'NCE Chemistry C3 balancing and equation-writing structured question.',
  intro: 'A student investigates the combustion of different fuels.',
  parts: [
    {
      label: 'a',
      prompt: 'Write the balanced equation for the complete combustion of butane, C₄H₁₀.',
      marks: 3,
      hint: 'Balance C, then H, then O. Oxygen is always the last to balance.',
      explanation: '2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O. C: 8 on each side; H: 20 on each side; O: 26 on each side (from 13O₂). Note: multiplying through by 2 avoids fractions.',
      response: { kind: 'expression', answer: '2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O', accept: ['C4H10+13/2O2→4CO2+5H2O'] }
    },
    {
      label: 'b',
      prompt: 'The student burns methane (CH₄) in a limited air supply. Name the two carbon-containing products that form and explain why both can be present.',
      marks: 3,
      hint: 'What happens when there is not enough oxygen for complete combustion?',
      explanation: 'Carbon monoxide (CO) and carbon dioxide (CO₂). In limited air, some CH₄ undergoes complete combustion (→ CO₂) but where oxygen is depleted, incomplete combustion occurs (→ CO, and sometimes C as soot). Both products can coexist because different regions of the flame have different oxygen concentrations.',
      response: { kind: 'written' },
      rubric: '3 marks. Award one mark per point, to a maximum of 3: Carbon monoxide (CO) and carbon dioxide (CO₂); In limited air, some CH₄ undergoes complete combustion (→ CO₂) but where oxygen is depleted, incomplete combustion occurs (→ CO, and sometimes C as soot); Both products can coexist because different regions of the flame have different oxygen concentrations.'
    },
    {
      label: 'c',
      prompt: 'Why is carbon monoxide dangerous, and how is it detected in a home?',
      marks: 2,
      hint: 'Colour? Smell? What does it do in the blood?',
      explanation: 'CO is colourless and odourless, giving no sensory warning; it binds to haemoglobin about 200 times more strongly than oxygen, preventing oxygen transport and causing death by asphyxiation. It is detected using an electronic carbon monoxide alarm that sounds when CO reaches a dangerous concentration.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: CO is colourless and odourless, giving no sensory warning; it binds to haemoglobin about 200 times more strongly than oxygen, preventing oxygen transport and causing death by asphyxiation; It is detected using an electronic carbon monoxide alarm that sounds when CO reaches a dangerous concentration.'
    }
  ]
}));

// ── Task 12: Neutralisation titration calculation ────────────────────────
STATIC_QUESTIONS.push(makeTask({
  id: 'g9s-ctask-012',
  chapterId: 'g9s-c5-salts',
  subsection: 'neutralisation',
  difficulty: 3,
  source: 'NCE Chemistry C5 titration structured question.',
  intro: 'A student titrates 25.0 cm³ of sodium hydroxide solution of unknown concentration with 0.10 mol/dm³ hydrochloric acid. The mean titre is 22.4 cm³.',
  parts: [
    {
      label: 'a',
      prompt: 'Write the balanced equation for the reaction between HCl and NaOH.',
      marks: 1,
      explanation: 'HCl + NaOH → NaCl + H₂O.',
      response: { kind: 'expression', answer: 'HCl + NaOH → NaCl + H₂O' }
    },
    {
      label: 'b',
      prompt: 'Calculate the number of moles of HCl used in the titration.',
      marks: 2,
      hint: 'n = c × V (remember to convert cm³ to dm³).',
      explanation: 'n(HCl) = 0.10 mol/dm³ × (22.4/1000) dm³ = 0.10 × 0.0224 = 0.00224 mol.',
      response: { kind: 'number', answer: '0.00224', accept: ['2.24e-3', '0.00224', '2.24×10⁻³'], unit: 'mol' }
    },
    {
      label: 'c',
      prompt: 'Using your answer to part (b), calculate the concentration of the NaOH solution. Show your working.',
      marks: 2,
      hint: 'Moles of NaOH = moles of HCl (1:1 ratio). Then c = n/V.',
      explanation: 'n(NaOH) = n(HCl) = 0.00224 mol. c(NaOH) = 0.00224 ÷ 0.025 = 0.0896 mol/dm³ ≈ 0.090 mol/dm³.',
      response: { kind: 'number', answer: '0.0896', accept: ['0.090', '0.09'], unit: 'mol/dm³' }
    },
    {
      label: 'd',
      prompt: 'The student uses phenolphthalein indicator. State the colour change at the end point when acid is added to alkali.',
      marks: 1,
      explanation: 'Pink to colourless (at the point of neutralisation, when the last drop of acid decolorises the solution permanently).',
      response: { kind: 'expression', answer: 'pink to colourless', accept: ['pink to clear', 'pink to pale pink', 'from pink to colourless'] }
    }
  ]
}));

// ── Task 13: Crystallisation procedure evaluation ────────────────────────
STATIC_QUESTIONS.push(makeTask({
  id: 'g9s-ctask-013',
  chapterId: 'g9s-c2-mixtures',
  subsection: 'crystallization',
  difficulty: 3,
  source: 'NCE Chemistry C2 practical skills structured question.',
  intro: 'Two students each prepare copper sulfate crystals from copper oxide and dilute sulfuric acid. Their procedures are compared below.',
  stimulus: {
    html: '<svg viewBox="0 0 380 120" width="380" role="img" aria-label="a table comparing two students crystallisation procedures">'
        + '<rect x="8" y="8" width="364" height="108" fill="none" stroke="#0f172a" stroke-width="1.5"/>'
        + '<line x1="130" y1="8" x2="130" y2="116" stroke="#0f172a" stroke-width="1.5"/>'
        + '<line x1="255" y1="8" x2="255" y2="116" stroke="#0f172a" stroke-width="1.5"/>'
        + '<line x1="8" y1="32" x2="372" y2="32" stroke="#0f172a" stroke-width="1.5"/>'
        + '<line x1="8" y1="74" x2="372" y2="74" stroke="#cbd5e1" stroke-width="1"/>'
        + '<text x="14" y="25" font-size="9" fill="#0f172a">Step</text>'
        + '<text x="136" y="25" font-size="9" fill="#0f172a">Student A</text>'
        + '<text x="261" y="25" font-size="9" fill="#0f172a">Student B</text>'
        + '<text x="14" y="56" font-size="9" fill="#334155">Adding CuO</text>'
        + '<text x="136" y="56" font-size="9" fill="#334155">Added exact amount</text>'
        + '<text x="261" y="56" font-size="9" fill="#334155">Added excess CuO</text>'
        + '<text x="14" y="96" font-size="9" fill="#334155">Drying crystals</text>'
        + '<text x="136" y="96" font-size="9" fill="#334155">Heated strongly in oven</text>'
        + '<text x="261" y="96" font-size="9" fill="#334155">Patted dry between filter papers</text>'
        + '</svg>',
    altText: 'a table comparing procedures of two students making copper sulfate crystals'
  },
  parts: [
    {
      label: 'a',
      prompt: 'Whose method of adding CuO is better — Student A or B? Explain.',
      marks: 2,
      hint: 'What happens if excess acid remains in the product?',
      explanation: 'Student B. Adding excess CuO ensures all the H₂SO₄ is neutralised; excess solid CuO can be removed by filtration, leaving only the pure CuSO₄ solution. Student A\'s exact amount risks leaving unreacted acid, which would contaminate the final crystals.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: Student B; Adding excess CuO ensures all the H₂SO₄ is neutralised; excess solid CuO can be removed by filtration, leaving only the pure CuSO₄ solution; Student A\'s exact amount risks leaving unreacted acid, which would contaminate the final crystals.'
    },
    {
      label: 'b',
      prompt: 'Whose method of drying is better — Student A or B? Explain.',
      marks: 2,
      hint: 'Blue copper sulfate crystals contain water of crystallisation.',
      explanation: 'Student B. Strong heating in an oven (Student A) drives off the water of crystallisation, converting the blue CuSO₄·5H₂O to white anhydrous CuSO₄, destroying the crystals. Gentle patting between filter papers preserves the water of crystallisation and the crystalline form.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: Student B; Strong heating in an oven (Student A) drives off the water of crystallisation, converting the blue CuSO₄·5H₂O to white anhydrous CuSO₄, destroying the crystals; Gentle patting between filter papers preserves the water of crystallisation and the crystalline form.'
    },
    {
      label: 'c',
      prompt: 'Student A obtained 4.2 g of crystals; Student B obtained 3.9 g. Does the lower yield of Student B necessarily mean her method is worse? Explain.',
      marks: 2,
      hint: 'Think about purity vs. yield.',
      explanation: 'No. Student B\'s lower yield may be because some product remained dissolved in the mother liquor or was lost during washing — but her crystals are purer. Student A\'s higher yield may be contaminated with residual acid or anhydrous CuSO₄ from overheating. Yield and purity are two different criteria.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: No; Student B\'s lower yield may be because some product remained dissolved in the mother liquor or was lost during washing — but her crystals are purer; Student A\'s higher yield may be contaminated with residual acid or anhydrous CuSO₄ from overheating; Yield and purity are two different criteria.'
    }
  ]
}));

// ── Task 14: Reactions of metals with water and steam ────────────────────
STATIC_QUESTIONS.push(makeTask({
  id: 'g9s-ctask-014',
  chapterId: 'g9s-c4-metals',
  subsection: 'metals_with_water_steam',
  difficulty: 3,
  source: 'NCE Chemistry C4 metals with water/steam structured question.',
  intro: 'The table summarises the reactions of five metals with cold water and with steam.',
  stimulus: {
    html: '<svg viewBox="0 0 350 155" width="350" role="img" aria-label="a table showing reactions of calcium sodium magnesium iron and copper with cold water and steam">'
        + '<text x="175" y="14" font-size="10" text-anchor="middle" fill="#0f172a">Metal reactions with water and steam</text>'
        + '<rect x="8" y="20" width="334" height="130" fill="none" stroke="#0f172a" stroke-width="1.5"/>'
        + '<line x1="90" y1="20" x2="90" y2="150" stroke="#0f172a" stroke-width="1.5"/>'
        + '<line x1="220" y1="20" x2="220" y2="150" stroke="#0f172a" stroke-width="1.5"/>'
        + '<line x1="8" y1="44" x2="342" y2="44" stroke="#0f172a" stroke-width="1.5"/>'
        + '<line x1="8" y1="68" x2="342" y2="68" stroke="#cbd5e1" stroke-width="1"/>'
        + '<line x1="8" y1="92" x2="342" y2="92" stroke="#cbd5e1" stroke-width="1"/>'
        + '<line x1="8" y1="116" x2="342" y2="116" stroke="#cbd5e1" stroke-width="1"/>'
        + '<line x1="8" y1="130" x2="342" y2="130" stroke="#cbd5e1" stroke-width="1"/>'
        + '<text x="14" y="37" font-size="9" fill="#0f172a">Metal</text>'
        + '<text x="96" y="37" font-size="9" fill="#0f172a">With cold water</text>'
        + '<text x="226" y="37" font-size="9" fill="#0f172a">With steam</text>'
        + '<text x="14" y="60" font-size="9" fill="#334155">Sodium</text>'
        + '<text x="96" y="60" font-size="9" fill="#334155">Vigorous reaction</text>'
        + '<text x="226" y="60" font-size="9" fill="#334155">Very vigorous (dangerous)</text>'
        + '<text x="14" y="84" font-size="9" fill="#334155">Calcium</text>'
        + '<text x="96" y="84" font-size="9" fill="#334155">Steady reaction</text>'
        + '<text x="226" y="84" font-size="9" fill="#334155">Vigorous reaction</text>'
        + '<text x="14" y="108" font-size="9" fill="#334155">Magnesium</text>'
        + '<text x="96" y="108" font-size="9" fill="#334155">Very slow / negligible</text>'
        + '<text x="226" y="108" font-size="9" fill="#334155">Vigorous reaction</text>'
        + '<text x="14" y="124" font-size="9" fill="#334155">Iron</text>'
        + '<text x="96" y="124" font-size="9" fill="#334155">No reaction</text>'
        + '<text x="226" y="124" font-size="9" fill="#334155">Slow reaction</text>'
        + '<text x="14" y="144" font-size="9" fill="#334155">Copper</text>'
        + '<text x="96" y="144" font-size="9" fill="#334155">No reaction</text>'
        + '<text x="226" y="144" font-size="9" fill="#334155">No reaction</text>'
        + '</svg>',
    altText: 'a table showing reactions of sodium, calcium, magnesium, iron and copper with cold water and steam'
  },
  parts: [
    {
      label: 'a',
      prompt: 'Write the balanced equation for the reaction of calcium with cold water.',
      marks: 2,
      explanation: 'Ca + 2H₂O → Ca(OH)₂ + H₂.',
      response: { kind: 'expression', answer: 'Ca + 2H₂O → Ca(OH)₂ + H₂', accept: ['Ca+2H2O→Ca(OH)2+H2'] }
    },
    {
      label: 'b',
      prompt: 'Use the table to deduce the order of reactivity of the five metals (most reactive first).',
      marks: 2,
      hint: 'Compare the vigour and conditions needed.',
      explanation: 'Sodium > Calcium > Magnesium > Iron > Copper. Sodium reacts with cold water most vigorously; copper does not react with water or steam at all.',
      response: { kind: 'expression', answer: 'Na > Ca > Mg > Fe > Cu', accept: ['Sodium > Calcium > Magnesium > Iron > Copper'] }
    },
    {
      label: 'c',
      prompt: 'Write the balanced equation for the reaction of iron with steam.',
      marks: 2,
      explanation: '3Fe + 4H₂O → Fe₃O₄ + 4H₂. (Note: the product is iron(II,III) oxide, Fe₃O₄, not Fe₂O₃.)',
      response: { kind: 'expression', answer: '3Fe + 4H₂O → Fe₃O₄ + 4H₂', accept: ['3Fe+4H2O→Fe3O4+4H2'] }
    },
    {
      label: 'd',
      prompt: 'Explain why the reaction of sodium with steam is described as "dangerous" in the table.',
      marks: 2,
      hint: 'Two hazards: the gas and the product.',
      explanation: 'Steam provides more energy than cold water, making the already vigorous sodium-water reaction extremely exothermic; the hydrogen gas produced ignites immediately from the heat of the reaction, causing an explosion. The sodium hydroxide produced is also strongly corrosive.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: Steam provides more energy than cold water, making the already vigorous sodium-water reaction extremely exothermic; the hydrogen gas produced ignites immediately from the heat of the reaction, causing an explosion; The sodium hydroxide produced is also strongly corrosive.'
    }
  ]
}));

// ── Task 15: Global warming mechanism and consequences ───────────────────
STATIC_QUESTIONS.push(makeTask({
  id: 'g9s-ctask-015',
  chapterId: 'g9s-c1-atmosphere',
  subsection: 'global_warming',
  difficulty: 3,
  source: 'NCE Chemistry C1 global warming mechanism structured question.',
  parts: [
    {
      label: 'a',
      prompt: 'Describe the mechanism of the enhanced greenhouse effect, starting with sunlight arriving at the Earth.',
      marks: 4,
      hint: 'Sunlight in → Earth warms → infrared out → greenhouse gases absorb → re-radiate back.',
      explanation: '(1) Short-wave solar radiation passes through the atmosphere and is absorbed by the Earth\'s surface, warming it. (2) The warmed surface emits long-wave infrared (heat) radiation. (3) Greenhouse gases (CO₂, CH₄, H₂O, N₂O) absorb this outgoing infrared instead of letting it escape to space. (4) The gases re-radiate the energy in all directions, including back to the surface, warming it further. The enhanced effect is due to increased concentrations of greenhouse gases from human activities.',
      response: { kind: 'written' },
      rubric: '4 marks. Award one mark per point, to a maximum of 4: (1) Short-wave solar radiation passes through the atmosphere and is absorbed by the Earth\'s surface, warming it; (2) The warmed surface emits long-wave infrared (heat) radiation; (3) Greenhouse gases (CO₂, CH₄, H₂O, N₂O) absorb this outgoing infrared instead of letting it escape to space; (4) The gases re-radiate the energy in all directions, including back to the surface, warming it further; The enhanced effect is due to increased concentrations of greenhouse gases from human activities.'
    },
    {
      label: 'b',
      prompt: 'Give <b>two</b> consequences of global warming on natural ecosystems.',
      marks: 2,
      hint: 'Ice, sea level, species ranges, weather patterns.',
      explanation: 'Any two from: (1) melting of polar ice caps and glaciers, reducing habitat for species such as polar bears; (2) rising sea levels threatening coastal and island ecosystems; (3) coral bleaching due to ocean warming and acidification; (4) poleward and uphill shifts in species ranges, disrupting ecosystems; (5) increased frequency and severity of droughts and floods affecting biodiversity.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: Any two from: (1) melting of polar ice caps and glaciers, reducing habitat for species such as polar bears; (2) rising sea levels threatening coastal and island ecosystems; (3) coral bleaching due to ocean warming and acidification; (4) poleward and uphill shifts in species ranges, disrupting ecosystems; (5) increased frequency and severity of droughts and floods affecting biodiversity.'
    },
    {
      label: 'c',
      prompt: 'State <b>two</b> actions that individuals or governments could take to reduce greenhouse gas emissions.',
      marks: 2,
      hint: 'Reduce, switch fuel, capture, plant.',
      explanation: 'Any two from: (1) switch electricity generation to renewable sources (solar, wind, hydroelectric); (2) improve insulation and energy efficiency of buildings; (3) use electric or hydrogen-powered vehicles instead of petrol/diesel; (4) reduce deforestation and plant new forests; (5) adopt carbon capture and storage (CCS) at power stations; (6) reduce methane from agriculture by changing livestock diet or rice cultivation practices.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: Any two from: (1) switch electricity generation to renewable sources (solar, wind, hydroelectric); (2) improve insulation and energy efficiency of buildings; (3) use electric or hydrogen-powered vehicles instead of petrol/diesel; (4) reduce deforestation and plant new forests; (5) adopt carbon capture and storage (CCS) at power stations; (6) reduce methane from agriculture by changing livestock diet or rice cultivation practices.'
    }
  ]
}));

// ── Task 16: Uses of salts in context ───────────────────────────────────
STATIC_QUESTIONS.push(makeTask({
  id: 'g9s-ctask-016',
  chapterId: 'g9s-c5-salts',
  subsection: 'uses_of_salts',
  difficulty: 2,
  source: 'NCE Chemistry C5 uses of salts structured question.',
  intro: 'Match each named salt to its use and explain the chemistry behind each application.',
  parts: [
    {
      label: 'a',
      prompt: 'Sodium chloride (NaCl) is spread on icy roads in winter. Explain the chemical reason it melts ice.',
      marks: 2,
      hint: 'Dissolving a solute changes the freezing point of the solvent.',
      explanation: 'NaCl dissolves in any surface water, dissociating into Na⁺ and Cl⁻ ions. The dissolved ions lower the freezing point of the solution below 0 °C (freezing-point depression), so the mixture does not freeze at normal winter temperatures and ice is melted.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: NaCl dissolves in any surface water, dissociating into Na⁺ and Cl⁻ ions; The dissolved ions lower the freezing point of the solution below 0 °C (freezing-point depression), so the mixture does not freeze at normal winter temperatures and ice is melted.'
    },
    {
      label: 'b',
      prompt: 'Barium sulfate (BaSO₄) is used as a barium meal for X-ray imaging of the gut. Explain why its insolubility is essential to its safe use.',
      marks: 2,
      hint: 'Ba²⁺ ions are toxic — what happens if the salt dissolves?',
      explanation: 'Ba²⁺ ions are highly poisonous. BaSO₄ is almost completely insoluble (Ksp ≈ 10⁻¹⁰), so essentially no Ba²⁺ enters the bloodstream from the gut. Its insolubility makes it safe to swallow; it also blocks X-rays effectively, providing contrast for imaging.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: Ba²⁺ ions are highly poisonous; BaSO₄ is almost completely insoluble (Ksp ≈ 10⁻¹⁰), so essentially no Ba²⁺ enters the bloodstream from the gut; Its insolubility makes it safe to swallow; it also blocks X-rays effectively, providing contrast for imaging.'
    },
    {
      label: 'c',
      prompt: 'Potassium nitrate (KNO₃) is used as a fertiliser. State which two nutrients it provides and explain why these are important for plant growth.',
      marks: 2,
      explanation: 'Potassium (K) — needed for flower and fruit development, and to regulate water in cells. Nitrogen (N) — needed for synthesis of amino acids and proteins, promoting leaf and stem growth. Both are macronutrients essential for healthy plant development.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: Potassium (K) — needed for flower and fruit development, and to regulate water in cells; Nitrogen (N) — needed for synthesis of amino acids and proteins, promoting leaf and stem growth; Both are macronutrients essential for healthy plant development.'
    }
  ]
}));

// ── Task 17: Formulae, equations and the language of chemistry ───────────
STATIC_QUESTIONS.push(makeTask({
  id: 'g9s-ctask-017',
  chapterId: 'g9s-c3-language',
  subsection: 'formulae_of_compounds',
  difficulty: 3,
  source: 'NCE Chemistry C3 language of chemistry structured question.',
  parts: [
    {
      label: 'a',
      prompt: 'Work out the formula of magnesium nitrate given that Mg has valency 2 and NO₃ has valency 1.',
      marks: 2,
      hint: 'Cross the valencies: Mg²⁺ needs two NO₃⁻ ions.',
      explanation: 'Mg²⁺ and NO₃⁻ (valency 1): two nitrate ions balance one Mg²⁺ ion. Formula: Mg(NO₃)₂.',
      response: { kind: 'expression', answer: 'Mg(NO₃)₂', accept: ['Mg(NO3)2'] }
    },
    {
      label: 'b',
      prompt: 'How many atoms are in one formula unit of Mg(NO₃)₂?',
      marks: 1,
      hint: 'Expand the bracket first.',
      explanation: '1 Mg + 2 N + 6 O = 9 atoms.',
      response: { kind: 'number', answer: '9', unit: 'atoms' }
    },
    {
      label: 'c',
      prompt: 'Explain the difference between the formulae 2H₂O and H₂O₂.',
      marks: 2,
      hint: 'One has a large number in front; one has a subscript.',
      explanation: '2H₂O means two molecules of water, each containing 2 hydrogen atoms and 1 oxygen atom (total: 4 H, 2 O). H₂O₂ is one molecule of hydrogen peroxide, containing 2 hydrogen atoms and 2 oxygen atoms (total: 2 H, 2 O) — a completely different substance.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: 2H₂O means two molecules of water, each containing 2 hydrogen atoms and 1 oxygen atom (total: 4 H, 2 O); H₂O₂ is one molecule of hydrogen peroxide, containing 2 hydrogen atoms and 2 oxygen atoms (total: 2 H, 2 O) — a completely different substance.'
    },
    {
      label: 'd',
      prompt: 'Write a word equation for the thermal decomposition of calcium carbonate.',
      marks: 2,
      hint: 'What two products are formed when CaCO₃ is heated strongly?',
      explanation: 'Calcium carbonate → calcium oxide + carbon dioxide. (CaCO₃ → CaO + CO₂)',
      response: { kind: 'expression', answer: 'calcium carbonate → calcium oxide + carbon dioxide', accept: ['CaCO3→CaO+CO2'] }
    }
  ]
}));

// ── Task 18: Air pollutants — identification and impact ──────────────────
STATIC_QUESTIONS.push(makeTask({
  id: 'g9s-ctask-018',
  chapterId: 'g9s-c1-atmosphere',
  subsection: 'air_pollutants',
  difficulty: 3,
  source: 'NCE Chemistry C1 air pollutants structured question.',
  intro: 'Five air pollutants are shown in the table. Use the table to answer the questions below.',
  stimulus: {
    html: '<svg viewBox="0 0 380 155" width="380" role="img" aria-label="a table of five air pollutants, their sources and one effect each">'
        + '<text x="190" y="13" font-size="10" text-anchor="middle" fill="#0f172a">Air Pollutants</text>'
        + '<rect x="8" y="18" width="364" height="134" fill="none" stroke="#0f172a" stroke-width="1.5"/>'
        + '<line x1="85" y1="18" x2="85" y2="152" stroke="#0f172a" stroke-width="1.5"/>'
        + '<line x1="200" y1="18" x2="200" y2="152" stroke="#0f172a" stroke-width="1.5"/>'
        + '<line x1="8" y1="40" x2="372" y2="40" stroke="#0f172a" stroke-width="1.5"/>'
        + '<line x1="8" y1="63" x2="372" y2="63" stroke="#cbd5e1" stroke-width="1"/>'
        + '<line x1="8" y1="86" x2="372" y2="86" stroke="#cbd5e1" stroke-width="1"/>'
        + '<line x1="8" y1="109" x2="372" y2="109" stroke="#cbd5e1" stroke-width="1"/>'
        + '<line x1="8" y1="130" x2="372" y2="130" stroke="#cbd5e1" stroke-width="1"/>'
        + '<text x="14" y="33" font-size="9" fill="#0f172a">Pollutant</text>'
        + '<text x="91" y="33" font-size="9" fill="#0f172a">Main source</text>'
        + '<text x="206" y="33" font-size="9" fill="#0f172a">Key effect</text>'
        + '<text x="14" y="56" font-size="9" fill="#334155">CO</text>'
        + '<text x="91" y="56" font-size="9" fill="#334155">Car engines (incomplete combustion)</text>'
        + '<text x="206" y="56" font-size="9" fill="#334155">Blocks oxygen in blood</text>'
        + '<text x="14" y="79" font-size="9" fill="#334155">SO₂</text>'
        + '<text x="91" y="79" font-size="9" fill="#334155">Coal power stations</text>'
        + '<text x="206" y="79" font-size="9" fill="#334155">Acid rain</text>'
        + '<text x="14" y="102" font-size="9" fill="#334155">NO₂</text>'
        + '<text x="91" y="102" font-size="9" fill="#334155">Car engines (high temp combustion)</text>'
        + '<text x="206" y="102" font-size="9" fill="#334155">Acid rain and smog</text>'
        + '<text x="14" y="125" font-size="9" fill="#334155">CFCs</text>'
        + '<text x="91" y="125" font-size="9" fill="#334155">Old refrigerators / aerosols</text>'
        + '<text x="206" y="125" font-size="9" fill="#334155">Ozone layer destruction</text>'
        + '<text x="14" y="148" font-size="9" fill="#334155">CO₂</text>'
        + '<text x="91" y="148" font-size="9" fill="#334155">Burning fossil fuels</text>'
        + '<text x="206" y="148" font-size="9" fill="#334155">Enhanced greenhouse effect</text>'
        + '</svg>',
    altText: 'a table showing five air pollutants (CO, SO2, NO2, CFCs, CO2) with their sources and key effects'
  },
  parts: [
    {
      label: 'a',
      prompt: 'Explain why carbon monoxide (CO) is so dangerous to humans.',
      marks: 2,
      hint: 'What does it do in the blood? Why is it not noticed?',
      explanation: 'CO is colourless and odourless, giving no sensory warning. It binds to haemoglobin about 200 times more strongly than oxygen, forming carboxyhaemoglobin, which cannot carry oxygen. This causes oxygen starvation of tissues and, at high concentrations, death.',
      response: { kind: 'written' },
      rubric: '2 marks. Award one mark per point, to a maximum of 2: CO is colourless and odourless, giving no sensory warning; It binds to haemoglobin about 200 times more strongly than oxygen, forming carboxyhaemoglobin, which cannot carry oxygen; This causes oxygen starvation of tissues and, at high concentrations, death.'
    },
    {
      label: 'b',
      prompt: 'Name the acid produced when sulfur dioxide reacts with water in the atmosphere.',
      marks: 1,
      explanation: 'Sulfuric acid (H₂SO₄). (Also accept sulfurous acid H₂SO₃ as an intermediate.)',
      response: { kind: 'expression', answer: 'sulfuric acid', accept: ['H₂SO₄', 'H2SO4', 'sulphuric acid'] }
    },
    {
      label: 'c',
      prompt: 'Explain the mechanism by which CFCs destroy the ozone layer.',
      marks: 3,
      hint: 'UV breaks the CFC, releasing chlorine atoms that catalytically destroy ozone.',
      explanation: 'UV radiation in the upper atmosphere breaks a C–Cl bond in the CFC molecule, releasing a chlorine radical (Cl•). The chlorine radical reacts with ozone: Cl• + O₃ → ClO• + O₂. Then ClO• reacts with O to regenerate Cl•: ClO• + O → Cl• + O₂. The Cl• is regenerated and can destroy thousands more ozone molecules — acting as a catalyst. Overall: O₃ + O → 2O₂ (each Cl• repeating many times).',
      response: { kind: 'written' },
      rubric: '3 marks. Award one mark per point, to a maximum of 3: UV radiation in the upper atmosphere breaks a C–Cl bond in the CFC molecule, releasing a chlorine radical (Cl•); The chlorine radical reacts with ozone: Cl• + O₃ → ClO• + O₂; Then ClO• reacts with O to regenerate Cl•: ClO• + O → Cl• + O₂; The Cl• is regenerated and can destroy thousands more ozone molecules — acting as a catalyst; Overall: O₃ + O → 2O₂ (each Cl• repeating many times).'
    },
    {
      label: 'd',
      prompt: 'Suggest one method used industrially to reduce SO₂ emissions from coal-fired power stations.',
      marks: 1,
      hint: 'The technique involves spraying an alkaline substance into the flue gases.',
      explanation: 'Flue-gas desulfurisation (FGD / wet scrubbing): spraying calcium hydroxide solution (or limestone slurry) into the exhaust gases to react with SO₂ — SO₂ + Ca(OH)₂ → CaSO₃ + H₂O — removing up to 95% of SO₂ before it reaches the atmosphere.',
      response: { kind: 'expression', answer: 'flue-gas desulfurisation', accept: ['wet scrubbing', 'calcium hydroxide scrubber', 'limestone scrubber', 'FGD'] }
    }
  ]
}));

})();
