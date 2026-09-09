'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Chemistry — Paper-Inspired Questions (2025 NCE N530 patterns)
//
//  IDs: g9s-cpi-001 … g9s-cpi-060
//  Covers: C1 Atmosphere (001-018), C4 Metals (019-035),
//          C5 Salts (036-050), C3 Language / mixed (051-060)
//
//  ⚠ REACTIVITY SERIES in this app is the SUPPLIED ladder:
//    K > Na > Ca > Mg > Zn > Fe > Cu > Au  (no Al/Sn/Pb/Ag).
//    Do not reference metals outside that list as if their position is known.
//  ⚠ SOLUBILITY RULES are supplied in the real papers — any question that
//    needs a rule states it in the stem.
//  ⚠ No moles, no relative atomic masses, no reacting-mass calculations.
// ══════════════════════════════════════════════════════════════════════════

(function () {

// ── C1 · THE ATMOSPHERE (001-018) ─────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-001',
  chapterId: 'g9s-c1-atmosphere',
  subsection: 'air_pollutants',
  difficulty: 1,
  question: 'Which of the following is the main source of chlorofluorocarbons (CFCs) released into the atmosphere?',
  options: [
    'Refrigerants and aerosol spray cans',
    'Car exhausts and vehicle engines',
    'Coal-fired power stations',
    'Cattle and landfill sites',
  ],
  answer: 'Refrigerants and aerosol spray cans',
  explanation: 'CFCs are released from old refrigerators, air-conditioning units and aerosol spray cans when they leak or are disposed of.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-002',
  chapterId: 'g9s-c1-atmosphere',
  subsection: 'air_pollutants',
  difficulty: 1,
  question: 'What is the main harmful effect of CFCs released into the upper atmosphere?',
  options: [
    'They deplete the ozone layer, allowing more UV radiation to reach Earth',
    'They dissolve in rainwater to form acid rain',
    'They trap heat and cause the greenhouse effect',
    'They are directly poisonous to fish and other aquatic life',
  ],
  answer: 'They deplete the ozone layer, allowing more UV radiation to reach Earth',
  explanation: 'CFCs break down ozone (O₃) molecules in the stratosphere, thinning the ozone layer that shields Earth from harmful ultraviolet radiation.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-003',
  chapterId: 'g9s-c1-atmosphere',
  subsection: 'air_pollutants',
  difficulty: 1,
  question: 'Which of the following is the main source of nitrogen monoxide (NO) pollution in the air?',
  options: [
    'Car exhausts',
    'Coal-fired power stations',
    'Cattle and rice fields',
    'Refrigerants and aerosols',
  ],
  answer: 'Car exhausts',
  explanation: 'At the high temperatures inside car engines, nitrogen and oxygen in the air react to form nitrogen monoxide (NO).',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-004',
  chapterId: 'g9s-c1-atmosphere',
  subsection: 'air_pollutants',
  difficulty: 2,
  question: 'A table of atmospheric pollutants lists nitrogen monoxide (NO) with its source as car exhausts. What harmful effect should appear in the same row?',
  options: [
    'It is a poisonous gas harmful to living organisms',
    'It depletes the ozone layer in the stratosphere',
    'It causes the greenhouse effect and global warming',
    'It reacts with water to form hydrochloric acid',
  ],
  answer: 'It is a poisonous gas harmful to living organisms',
  explanation: 'NO is a toxic gas. It also converts to NO₂ in air, which contributes to acid rain, but its primary listed harmful effect is that it is poisonous.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-005',
  chapterId: 'g9s-c1-atmosphere',
  subsection: 'air_pollutants',
  difficulty: 1,
  question: 'Burning coal in a power station releases large amounts of which atmospheric pollutant?',
  options: [
    'Sulfur dioxide (SO₂)',
    'Methane (CH₄)',
    'Chlorofluorocarbons (CFCs)',
    'Nitrogen monoxide (NO)',
  ],
  answer: 'Sulfur dioxide (SO₂)',
  explanation: 'Coal contains sulfur impurities. When coal burns, sulfur is oxidised: S + O₂ → SO₂. This sulfur dioxide is a major air pollutant from power stations.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-006',
  chapterId: 'g9s-c1-atmosphere',
  subsection: 'acid_rain',
  difficulty: 2,
  question: 'Sulfur dioxide from coal-fired power stations dissolves in cloud droplets. Which acid does this form, causing acid rain?',
  options: [
    'Sulfurous acid (H₂SO₃)',
    'Sulfuric acid (H₂SO₄)',
    'Hydrochloric acid (HCl)',
    'Nitric acid (HNO₃)',
  ],
  answer: 'Sulfurous acid (H₂SO₃)',
  explanation: 'SO₂ + H₂O → H₂SO₃. Sulfur dioxide reacts with water vapour in clouds to produce sulfurous acid, which falls as acid rain.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-007',
  chapterId: 'g9s-c1-atmosphere',
  subsection: 'greenhouse_gases',
  difficulty: 1,
  question: 'Which atmospheric pollutant is produced mainly by cattle digestion and the decomposition of waste in landfill sites?',
  options: [
    'Methane (CH₄)',
    'Sulfur dioxide (SO₂)',
    'Nitrogen monoxide (NO)',
    'Carbon monoxide (CO)',
  ],
  answer: 'Methane (CH₄)',
  explanation: 'Cattle release methane during digestion (enteric fermentation). Anaerobic decomposition of organic waste in landfill sites also produces methane.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-008',
  chapterId: 'g9s-c1-atmosphere',
  subsection: 'greenhouse_gases',
  difficulty: 1,
  question: 'What is the main environmental concern caused by increased levels of methane (CH₄) in the atmosphere?',
  options: [
    'It is a greenhouse gas that contributes to global warming',
    'It depletes the ozone layer and allows more UV radiation through',
    'It dissolves in rainwater to form acid rain',
    'It is directly toxic to fish in rivers and lakes',
  ],
  answer: 'It is a greenhouse gas that contributes to global warming',
  explanation: 'Methane is a potent greenhouse gas — it absorbs heat radiated from the Earth and traps it in the atmosphere, intensifying the greenhouse effect.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-009',
  chapterId: 'g9s-c1-atmosphere',
  subsection: 'global_warming',
  difficulty: 2,
  question: 'Which of the following is a direct consequence of global warming for a coastal island like Mauritius?',
  options: [
    'Rising sea levels leading to coastal flooding',
    'Heavier snowfall in highland areas',
    'A reduction in the number of hurricanes',
    'A thickening of the polar ice sheets',
  ],
  answer: 'Rising sea levels leading to coastal flooding',
  explanation: 'Global warming melts land ice and causes seawater to expand. Both effects raise sea levels, threatening low-lying coastal areas and islands.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-010',
  chapterId: 'g9s-c1-atmosphere',
  subsection: 'global_warming',
  difficulty: 2,
  question: 'Which of the following is NOT a consequence of global warming?',
  options: [
    'Thickening of the polar ice caps',
    'Coral bleaching in warm ocean water',
    'Loss of natural habitats for wildlife',
    'More frequent and intense extreme weather events',
  ],
  answer: 'Thickening of the polar ice caps',
  explanation: 'Global warming causes polar ice caps to melt and thin — not thicken. Coral bleaching, habitat loss and increased extreme weather events are all real consequences.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-011',
  chapterId: 'g9s-c1-atmosphere',
  subsection: 'eutrophication',
  difficulty: 3,
  question: 'Fertiliser from a farm is washed into a river. The correct sequence of events in eutrophication is:<br>1. Algae grow rapidly and form a bloom<br>2. Algal bloom blocks sunlight from reaching underwater plants<br>3. Underwater plants die<br>4. Bacteria decompose the dead plants<br>5. Fish die<br><br>What is the correct reason why fish die at step 5?',
  options: [
    'Bacteria use up dissolved oxygen, leaving none for fish to breathe',
    'The algae release toxins that poison the fish directly',
    'Fertiliser chemicals in the water are directly lethal to fish',
    'Sunlight blocked by algae warms the water, making it too hot for fish',
  ],
  answer: 'Bacteria use up dissolved oxygen, leaving none for fish to breathe',
  explanation: 'Aerobic bacteria decompose dead plants, consuming dissolved oxygen in the process. When oxygen levels fall too low, fish suffocate and die.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-012',
  chapterId: 'g9s-c1-atmosphere',
  subsection: 'eutrophication',
  difficulty: 3,
  question: 'In an eutrophication event, why do underwater plants die shortly after an algal bloom forms on the river surface?',
  options: [
    'The algal bloom blocks sunlight so underwater plants cannot photosynthesise',
    'Fertiliser chemicals dissolve in the water and poison the plant roots',
    'The algae absorb all the water minerals, starving the other plants',
    'Warmer water caused by the algae kills the plants by overheating them',
  ],
  answer: 'The algal bloom blocks sunlight so underwater plants cannot photosynthesise',
  explanation: 'The dense mat of algae on the surface intercepts light. Without sunlight, submerged plants cannot photosynthesise and eventually die.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-013',
  chapterId: 'g9s-c1-atmosphere',
  subsection: 'acid_rain',
  difficulty: 2,
  question: 'Acid rain slowly damages the surfaces of limestone statues. What is the correct explanation for this?',
  options: [
    'The acid reacts with calcium carbonate in the limestone and dissolves it',
    'The acid freezes inside cracks and splits the stone apart',
    'The acid coats the surface with a hard layer that flakes off',
    'The acid neutralises the alkaline limestone without causing any damage',
  ],
  answer: 'The acid reacts with calcium carbonate in the limestone and dissolves it',
  explanation: 'Acid rain (containing H₂SO₃ and HNO₃) reacts with calcium carbonate (CaCO₃) in limestone and marble, gradually dissolving the material.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-014',
  chapterId: 'g9s-c1-atmosphere',
  subsection: 'air_pollutants',
  difficulty: 2,
  question: 'When CFCs deplete the ozone layer, what type of radiation reaches the Earth\'s surface in greater amounts?',
  options: [
    'Ultraviolet (UV) radiation',
    'Infrared (heat) radiation',
    'Microwave radiation',
    'Visible light',
  ],
  answer: 'Ultraviolet (UV) radiation',
  explanation: 'The ozone layer absorbs UV radiation from the Sun. When CFCs thin this layer, more UV reaches the surface, harming living organisms.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-015',
  chapterId: 'g9s-c1-atmosphere',
  subsection: 'air_pollutants',
  difficulty: 2,
  question: 'Depletion of the ozone layer leads to increased UV radiation reaching Earth. Which health effects does this cause in humans?',
  options: [
    'Increased risk of skin cancer and cataracts',
    'Increased risk of respiratory disease and asthma',
    'Vitamin D deficiency and weakened bones',
    'Reduced blood pressure and circulation problems',
  ],
  answer: 'Increased risk of skin cancer and cataracts',
  explanation: 'UV radiation damages DNA in skin cells (raising skin cancer risk) and damages the lens of the eye (causing cataracts).',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-016',
  chapterId: 'g9s-c1-atmosphere',
  subsection: 'air_pollutants',
  difficulty: 2,
  question: 'A catalytic converter fitted to a car converts toxic carbon monoxide (CO) into which product?',
  options: [
    'Carbon dioxide (CO₂)',
    'Methane (CH₄)',
    'Solid carbon (soot)',
    'Carbonic acid (H₂CO₃)',
  ],
  answer: 'Carbon dioxide (CO₂)',
  explanation: 'Inside the catalytic converter: 2CO + O₂ → 2CO₂. The toxic CO is oxidised to CO₂, which is less harmful at these concentrations.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-017',
  chapterId: 'g9s-c1-atmosphere',
  subsection: 'air_pollutants',
  difficulty: 2,
  question: 'A catalytic converter also converts nitrogen monoxide (NO) from car exhausts into which harmless gas?',
  options: [
    'Nitrogen gas (N₂)',
    'Nitrogen dioxide (NO₂)',
    'Ammonia (NH₃)',
    'Dinitrogen oxide (N₂O)',
  ],
  answer: 'Nitrogen gas (N₂)',
  explanation: '2NO → N₂ + O₂. The catalytic converter reduces NO back to harmless nitrogen gas, which makes up 78% of the atmosphere.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-018',
  chapterId: 'g9s-c1-atmosphere',
  subsection: 'water_pollution',
  difficulty: 1,
  question: 'Chlorine is added to water during the water treatment process. What is the purpose of this step?',
  options: [
    'To kill harmful bacteria and other microorganisms',
    'To remove suspended solid particles from the water',
    'To neutralise the acidity of the water',
    'To remove dissolved salts from the water',
  ],
  answer: 'To kill harmful bacteria and other microorganisms',
  explanation: 'Chlorination is the final stage of water treatment. Chlorine acts as a disinfectant, killing bacteria and pathogens that would otherwise cause disease.',
}));

// ── C4 · METALS & THE REACTIVITY SERIES (019-035) ────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-019',
  chapterId: 'g9s-c4-metals',
  subsection: 'reactivity_series',
  difficulty: 1,
  question: 'The reactivity series of metals is shown below, from most to least reactive:<br>potassium → sodium → calcium → magnesium → zinc → iron → copper → gold<br><br>Which metal in this series is the LEAST reactive?',
  options: [
    'Gold',
    'Copper',
    'Iron',
    'Zinc',
  ],
  answer: 'Gold',
  explanation: 'Gold is at the bottom of the reactivity series, meaning it is the least reactive. It does not react with oxygen, water or dilute acids under normal conditions.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-020',
  chapterId: 'g9s-c4-metals',
  subsection: 'reactivity_series',
  difficulty: 1,
  question: 'The reactivity series is: K > Na > Ca > Mg > Zn > Fe > Cu > Au.<br><br>Which metal sits directly BETWEEN zinc and copper?',
  options: [
    'Iron',
    'Magnesium',
    'Calcium',
    'Gold',
  ],
  answer: 'Iron',
  explanation: 'Reading the series: … Zn > Fe > Cu … . Iron sits between zinc (above it) and copper (below it).',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-021',
  chapterId: 'g9s-c4-metals',
  subsection: 'metals_with_water_steam',
  difficulty: 2,
  question: 'A small piece of sodium is carefully placed on water. Which set of observations is correct?',
  options: [
    'It floats on the surface, moves around rapidly and fizzes vigorously',
    'It sinks slowly to the bottom and produces a steady stream of bubbles',
    'It dissolves quietly without producing any gas',
    'It glows brightly, sinks and the water turns blue',
  ],
  answer: 'It floats on the surface, moves around rapidly and fizzes vigorously',
  explanation: 'Sodium is less dense than water so it floats. The reaction 2Na + 2H₂O → 2NaOH + H₂ is vigorous, producing hydrogen gas, which makes it fizz and dart around.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-022',
  chapterId: 'g9s-c4-metals',
  subsection: 'equations_for_metals',
  difficulty: 2,
  question: 'Calcium reacts with cold water to produce calcium hydroxide and hydrogen gas. Which of the following is the correctly balanced equation for this reaction?',
  options: [
    'Ca + 2H₂O → Ca(OH)₂ + H₂',
    'Ca + H₂O → CaO + H₂',
    '2Ca + 2H₂O → 2CaO + 2H₂',
    'Ca + 2H₂O → Ca(OH)₂ + H₂O',
  ],
  answer: 'Ca + 2H₂O → Ca(OH)₂ + H₂',
  explanation: 'One calcium atom reacts with two water molecules to give one formula unit of calcium hydroxide and one molecule of hydrogen gas.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-023',
  chapterId: 'g9s-c4-metals',
  subsection: 'metals_with_water_steam',
  difficulty: 2,
  question: 'Which statement correctly describes how magnesium reacts with water?',
  options: [
    'It reacts very slowly with cold water but reacts vigorously with steam',
    'It reacts explosively with cold water, like sodium',
    'It does not react with water or steam under any conditions',
    'It reacts at the same rate with both cold water and steam',
  ],
  answer: 'It reacts very slowly with cold water but reacts vigorously with steam',
  explanation: 'Magnesium barely reacts with cold water. With steam it reacts well: Mg + H₂O(g) → MgO + H₂. This shows it is less reactive than calcium but more than iron.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-024',
  chapterId: 'g9s-c4-metals',
  subsection: 'metals_with_acids',
  difficulty: 2,
  question: 'Iron is added to dilute hydrochloric acid and reacts to form iron(II) chloride solution. What colour is this solution?',
  options: [
    'Pale green',
    'Deep blue',
    'Colourless',
    'Orange-brown',
  ],
  answer: 'Pale green',
  explanation: 'Fe + 2HCl → FeCl₂ + H₂. Iron(II) chloride (FeCl₂) dissolves to give a characteristic pale green solution.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-025',
  chapterId: 'g9s-c4-metals',
  subsection: 'metals_with_acids',
  difficulty: 1,
  question: 'What happens when copper is added to dilute hydrochloric acid?',
  options: [
    'No reaction occurs',
    'Copper dissolves and hydrogen gas bubbles off',
    'A blue solution of copper chloride slowly forms',
    'The acid is neutralised and copper oxide forms',
  ],
  answer: 'No reaction occurs',
  explanation: 'Copper lies below hydrogen in the reactivity series. Only metals above hydrogen can displace it from an acid. Copper does not react with dilute HCl.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-026',
  chapterId: 'g9s-c4-metals',
  subsection: 'equations_for_metals',
  difficulty: 2,
  question: 'Magnesium reacts with dilute sulfuric acid to produce magnesium sulfate and hydrogen gas. Which equation is correctly balanced?',
  options: [
    'Mg + H₂SO₄ → MgSO₄ + H₂',
    'Mg + H₂SO₄ → MgSO₃ + H₂O',
    '2Mg + H₂SO₄ → Mg₂SO₄ + H₂',
    'Mg + 2H₂SO₄ → MgSO₄ + 2H₂',
  ],
  answer: 'Mg + H₂SO₄ → MgSO₄ + H₂',
  explanation: 'One magnesium atom replaces two hydrogen atoms from one molecule of sulfuric acid, giving magnesium sulfate and one molecule of hydrogen gas.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-027',
  chapterId: 'g9s-c4-metals',
  subsection: 'predicting_reactions',
  difficulty: 2,
  question: 'A piece of zinc is placed into a blue solution of copper(II) sulfate. What observation is expected?',
  options: [
    'A reddish-brown solid deposits on the zinc and the blue colour fades',
    'No reaction occurs because zinc is less reactive than copper',
    'The zinc dissolves and the blue colour intensifies',
    'Zinc sulfate crystals form immediately and the solution turns colourless',
  ],
  answer: 'A reddish-brown solid deposits on the zinc and the blue colour fades',
  explanation: 'Zn + CuSO₄ → ZnSO₄ + Cu. Zinc is more reactive than copper, so it displaces copper from its salt. Copper metal (reddish-brown) deposits and the Cu²⁺ blue colour fades.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-028',
  chapterId: 'g9s-c4-metals',
  subsection: 'predicting_reactions',
  difficulty: 2,
  question: 'Iron nails are placed into a colourless solution of silver nitrate. Using the reactivity series (Fe is above Cu, Cu is above Au), what would you expect to observe?',
  options: [
    'A grey/silver solid forms on the iron nails',
    'No reaction, because iron is less reactive than silver',
    'The iron dissolves and the solution turns blue',
    'The solution turns pale green immediately',
  ],
  answer: 'A grey/silver solid forms on the iron nails',
  explanation: 'Iron is above copper in the series, and silver is below copper, so iron is more reactive than silver. Fe displaces Ag: Fe + 2AgNO₃ → Fe(NO₃)₂ + 2Ag. Silver metal deposits on the iron.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-029',
  chapterId: 'g9s-c4-metals',
  subsection: 'metals_with_oxygen',
  difficulty: 1,
  question: 'Which of the following metals burns with a brilliant white flame when heated in oxygen?',
  options: [
    'Magnesium',
    'Copper',
    'Iron',
    'Gold',
  ],
  answer: 'Magnesium',
  explanation: 'Magnesium burns vigorously in oxygen with a dazzling white flame: 2Mg + O₂ → 2MgO. Copper only forms a black oxide slowly; gold does not react with oxygen.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-030',
  chapterId: 'g9s-c4-metals',
  subsection: 'metals_with_acids',
  difficulty: 2,
  question: 'Zinc is added to dilute hydrochloric acid. Which products form?',
  options: [
    'Zinc chloride solution and hydrogen gas',
    'Zinc chloride solution and water',
    'Zinc oxide and hydrogen gas',
    'Zinc hydroxide and chlorine gas',
  ],
  answer: 'Zinc chloride solution and hydrogen gas',
  explanation: 'Zn + 2HCl → ZnCl₂ + H₂. Zinc displaces hydrogen from the acid, forming zinc chloride in solution and hydrogen gas, which can be tested with a lighted splint.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-031',
  chapterId: 'g9s-c4-metals',
  subsection: 'reactivity_series',
  difficulty: 3,
  question: 'Three unknown metals W, X and Y are tested:<br>• W reacts vigorously with cold water<br>• X reacts with steam but not with cold water<br>• Y does not react with dilute acid at all<br><br>Which correctly shows these metals in order of reactivity, from most to least reactive?',
  options: [
    'W > X > Y',
    'X > W > Y',
    'Y > X > W',
    'W > Y > X',
  ],
  answer: 'W > X > Y',
  explanation: 'Reacting with cold water shows high reactivity (like Na or Ca). Reacting with steam but not cold water is intermediate (like Mg). Not reacting with acid is low reactivity (like Cu or Au).',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-032',
  chapterId: 'g9s-c4-metals',
  subsection: 'metals_with_water_steam',
  difficulty: 1,
  question: 'Which of the following metals from the reactivity series reacts most vigorously with cold water?',
  options: [
    'Potassium',
    'Magnesium',
    'Zinc',
    'Iron',
  ],
  answer: 'Potassium',
  explanation: 'Potassium is at the top of the reactivity series and reacts violently with cold water: 2K + 2H₂O → 2KOH + H₂. The hydrogen produced ignites immediately.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-033',
  chapterId: 'g9s-c4-metals',
  subsection: 'predicting_reactions',
  difficulty: 3,
  question: 'Iron filings are stirred into a blue solution of copper(II) sulfate. A student notices the blue colour gradually fades and a reddish-brown solid forms. Which statement correctly explains BOTH observations?',
  options: [
    'Iron displaces copper from the solution; Fe²⁺ ions replace Cu²⁺ ions, removing the blue colour and depositing copper metal',
    'Copper displaces iron from the solution because copper is more reactive than iron',
    'The iron reacts with oxygen in the water to form rust, which turns the solution brown',
    'Iron and copper react together in solution to form a new alloy, which is reddish-brown',
  ],
  answer: 'Iron displaces copper from the solution; Fe²⁺ ions replace Cu²⁺ ions, removing the blue colour and depositing copper metal',
  explanation: 'Fe + CuSO₄ → FeSO₄ + Cu. Iron (more reactive) displaces copper. Cu²⁺ (blue) is removed from solution and replaced by Fe²⁺ (pale green/colourless), while copper metal deposits.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-034',
  chapterId: 'g9s-c4-metals',
  subsection: 'reactivity_series',
  difficulty: 1,
  question: 'Why is copper the preferred metal for household electrical wiring?',
  options: [
    'It is an excellent conductor of electricity and does not corrode easily in air',
    'It is the strongest metal and resists physical damage in walls',
    'It is more reactive than other metals, so it carries current more easily',
    'It is cheaper than all other suitable metals',
  ],
  answer: 'It is an excellent conductor of electricity and does not corrode easily in air',
  explanation: 'Copper has very high electrical conductivity and good resistance to corrosion. These two properties together make it ideal for long-lasting electrical wiring.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-035',
  chapterId: 'g9s-c4-metals',
  subsection: 'equations_for_metals',
  difficulty: 2,
  question: 'Sodium reacts vigorously with water to produce sodium hydroxide and hydrogen gas. Which of the following is the correctly balanced equation?',
  options: [
    '2Na + 2H₂O → 2NaOH + H₂',
    'Na + H₂O → NaOH + H₂',
    '2Na + H₂O → Na₂O + H₂',
    'Na + 2H₂O → Na(OH)₂ + H₂',
  ],
  answer: '2Na + 2H₂O → 2NaOH + H₂',
  explanation: 'Two sodium atoms react with two water molecules to give two moles of sodium hydroxide and one mole of hydrogen gas. Both sides must balance in atoms.',
}));

// ── C5 · SALTS (036-050) ─────────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-036',
  chapterId: 'g9s-c5-salts',
  subsection: 'soluble_insoluble',
  difficulty: 1,
  question: 'The solubility rule states: <em>all nitrates are soluble in water</em>. Using this rule, which of the following salts dissolves in water?',
  options: [
    'Potassium nitrate (KNO₃)',
    'Barium sulfate (BaSO₄)',
    'Silver chloride (AgCl)',
    'Lead carbonate (PbCO₃)',
  ],
  answer: 'Potassium nitrate (KNO₃)',
  explanation: 'Because all nitrates are soluble, KNO₃ dissolves. BaSO₄, AgCl and PbCO₃ are insoluble exceptions in their respective salt groups.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-037',
  chapterId: 'g9s-c5-salts',
  subsection: 'soluble_insoluble',
  difficulty: 2,
  question: 'The solubility rule states: <em>most chlorides are soluble, except silver chloride and lead chloride.</em> Which of the following chlorides is INSOLUBLE in water?',
  options: [
    'Silver chloride (AgCl)',
    'Sodium chloride (NaCl)',
    'Potassium chloride (KCl)',
    'Magnesium chloride (MgCl₂)',
  ],
  answer: 'Silver chloride (AgCl)',
  explanation: 'The rule names AgCl as an insoluble exception. Sodium, potassium and magnesium chlorides are all soluble.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-038',
  chapterId: 'g9s-c5-salts',
  subsection: 'soluble_insoluble',
  difficulty: 2,
  question: 'The solubility rule states: <em>most sulfates are soluble, except barium sulfate, lead sulfate and calcium sulfate.</em> Which of the following sulfates is INSOLUBLE?',
  options: [
    'Barium sulfate (BaSO₄)',
    'Copper(II) sulfate (CuSO₄)',
    'Zinc sulfate (ZnSO₄)',
    'Magnesium sulfate (MgSO₄)',
  ],
  answer: 'Barium sulfate (BaSO₄)',
  explanation: 'BaSO₄ is one of the named insoluble exceptions. Copper, zinc and magnesium sulfates are all soluble and dissolve readily in water.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-039',
  chapterId: 'g9s-c5-salts',
  subsection: 'soluble_insoluble',
  difficulty: 2,
  question: 'The solubility rule states: <em>most carbonates are insoluble, except sodium carbonate, potassium carbonate and ammonium carbonate.</em> Which of the following carbonates IS soluble?',
  options: [
    'Sodium carbonate (Na₂CO₃)',
    'Copper(II) carbonate (CuCO₃)',
    'Calcium carbonate (CaCO₃)',
    'Iron(II) carbonate (FeCO₃)',
  ],
  answer: 'Sodium carbonate (Na₂CO₃)',
  explanation: 'The rule lists sodium carbonate as a soluble exception. Copper, calcium and iron carbonates are all insoluble and form precipitates in water.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-040',
  chapterId: 'g9s-c3-language',
  subsection: 'formulae_of_compounds',
  difficulty: 1,
  question: 'Sodium has valency 1 and the nitrate group (NO₃) has valency 1. What is the correct formula of sodium nitrate?',
  options: [
    'NaNO₃',
    'NaNO₂',
    'Na₂NO₃',
    'Na(NO₃)₂',
  ],
  answer: 'NaNO₃',
  explanation: 'When two groups both have valency 1, they combine in a 1:1 ratio. One Na⁺ balances one NO₃⁻, giving NaNO₃.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-041',
  chapterId: 'g9s-c3-language',
  subsection: 'formulae_of_compounds',
  difficulty: 2,
  question: 'Potassium has valency 1 and the sulfate group (SO₄) has valency 2. What is the correct formula of potassium sulfate?',
  options: [
    'K₂SO₄',
    'KSO₄',
    'K₂SO₃',
    'K(SO₄)₂',
  ],
  answer: 'K₂SO₄',
  explanation: 'Valency 1 (K⁺) and valency 2 (SO₄²⁻) cross over: two K⁺ ions are needed to balance one SO₄²⁻, giving K₂SO₄.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-042',
  chapterId: 'g9s-c3-language',
  subsection: 'formulae_of_compounds',
  difficulty: 2,
  question: 'Iron(III) has valency 3 and chloride has valency 1. What is the correct formula of iron(III) chloride?',
  options: [
    'FeCl₃',
    'FeCl₂',
    'Fe₂Cl₃',
    'FeCl',
  ],
  answer: 'FeCl₃',
  explanation: 'Fe³⁺ (valency 3) requires three Cl⁻ ions (valency 1 each) to balance the charge: FeCl₃.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-043',
  chapterId: 'g9s-c5-salts',
  subsection: 'uses_of_salts',
  difficulty: 1,
  question: 'Magnesium sulfate (MgSO₄), commonly known as Epsom salt, is used in medicine. What is its main use?',
  options: [
    'As a laxative to relieve constipation',
    'As a fertiliser to improve crop growth',
    'As a building material in plaster and casts',
    'As a food preservative to extend shelf life',
  ],
  answer: 'As a laxative to relieve constipation',
  explanation: 'Magnesium sulfate (Epsom salt) is used medically as a laxative. It is also dissolved in bath water to soothe muscle pain.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-044',
  chapterId: 'g9s-c5-salts',
  subsection: 'uses_of_salts',
  difficulty: 1,
  question: 'Calcium sulfate (CaSO₄) is used to make plaster of Paris. What is plaster of Paris mainly used for?',
  options: [
    'Setting broken bones and making moulds and casts',
    'Treating acidic soil in agriculture',
    'Manufacturing glass and ceramic products',
    'Producing fertilisers for crops',
  ],
  answer: 'Setting broken bones and making moulds and casts',
  explanation: 'Plaster of Paris (CaSO₄·½H₂O) sets hard when mixed with water. It is used in medical casts for fractures and in making moulds and sculptures.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-045',
  chapterId: 'g9s-c5-salts',
  subsection: 'neutralisation',
  difficulty: 2,
  question: 'A student prepares copper(II) sulfate by reacting copper(II) oxide with a dilute acid. Which acid should be used?',
  options: [
    'Dilute sulfuric acid (H₂SO₄)',
    'Dilute hydrochloric acid (HCl)',
    'Dilute nitric acid (HNO₃)',
    'Dilute carbonic acid (H₂CO₃)',
  ],
  answer: 'Dilute sulfuric acid (H₂SO₄)',
  explanation: 'The anion in the salt tells you which acid to use. Sulfate (SO₄²⁻) comes from sulfuric acid: CuO + H₂SO₄ → CuSO₄ + H₂O.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-046',
  chapterId: 'g9s-c5-salts',
  subsection: 'neutralisation',
  difficulty: 2,
  question: 'A metal oxide is neutralised with a dilute acid to produce a chloride salt. Which acid was used?',
  options: [
    'Hydrochloric acid (HCl)',
    'Sulfuric acid (H₂SO₄)',
    'Nitric acid (HNO₃)',
    'Phosphoric acid (H₃PO₄)',
  ],
  answer: 'Hydrochloric acid (HCl)',
  explanation: 'The anion of the salt determines the acid: chloride salts come from hydrochloric acid (HCl), sulfate salts from sulfuric acid, and nitrate salts from nitric acid.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-047',
  chapterId: 'g9s-c5-salts',
  subsection: 'neutralisation',
  difficulty: 2,
  question: 'Sodium hydroxide solution is added gradually to hydrochloric acid containing a pH indicator. What happens to the pH as the NaOH is added?',
  options: [
    'The pH starts below 7 and rises towards 7, then continues above 7 as excess NaOH is added',
    'The pH starts above 7 and falls steadily to 7 at neutralisation',
    'The pH stays at 7 throughout because a salt forms',
    'The pH falls from above 7 to below 7 as the NaOH is consumed',
  ],
  answer: 'The pH starts below 7 and rises towards 7, then continues above 7 as excess NaOH is added',
  explanation: 'HCl is acidic (pH < 7). NaOH neutralises it: HCl + NaOH → NaCl + H₂O. At the exact neutralisation point pH = 7; further NaOH makes the solution alkaline (pH > 7).',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-048',
  chapterId: 'g9s-c5-salts',
  subsection: 'soluble_insoluble',
  difficulty: 3,
  question: 'A student needs to prepare a sample of barium sulfate (BaSO₄), which is insoluble. The rule states: <em>insoluble salts are made by mixing two soluble solutions that each contain one of the required ions.</em> Which two solutions should be mixed?',
  options: [
    'Barium chloride (BaCl₂) and sodium sulfate (Na₂SO₄)',
    'Barium oxide (BaO) and sulfuric acid (H₂SO₄)',
    'Barium carbonate (BaCO₃) and sodium sulfate (Na₂SO₄)',
    'Barium nitrate (Ba(NO₃)₂) and sodium chloride (NaCl)',
  ],
  answer: 'Barium chloride (BaCl₂) and sodium sulfate (Na₂SO₄)',
  explanation: 'BaCl₂ supplies Ba²⁺ and Na₂SO₄ supplies SO₄²⁻. When mixed: Ba²⁺ + SO₄²⁻ → BaSO₄↓. Both starting solutions must be soluble — BaO and BaCO₃ are not soluble salts.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-049',
  chapterId: 'g9s-c5-salts',
  subsection: 'uses_of_salts',
  difficulty: 1,
  question: 'Potassium nitrate (KNO₃) is used as a fertiliser. Why is it particularly valuable for plant growth?',
  options: [
    'It supplies both potassium and nitrogen, which are essential nutrients for plants',
    'It makes the soil more acidic, which benefits most crops',
    'It provides calcium and phosphorus for strong root development',
    'It is the only salt soluble enough to be absorbed by plant roots',
  ],
  answer: 'It supplies both potassium and nitrogen, which are essential nutrients for plants',
  explanation: 'KNO₃ is a dual-nutrient fertiliser. Potassium (K⁺) aids enzyme function and disease resistance; nitrogen (as NO₃⁻) is needed for protein and chlorophyll synthesis.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-050',
  chapterId: 'g9s-c5-salts',
  subsection: 'neutralisation',
  difficulty: 3,
  question: 'When a strong acid reacts with a strong alkali, the reaction can be summarised by a net ionic equation. Which of the following is that net ionic equation?',
  options: [
    'H⁺(aq) + OH⁻(aq) → H₂O(l)',
    'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)',
    'H₂O(l) → H⁺(aq) + OH⁻(aq)',
    'Na⁺(aq) + Cl⁻(aq) → NaCl(s)',
  ],
  answer: 'H⁺(aq) + OH⁻(aq) → H₂O(l)',
  explanation: 'The full equation includes spectator ions (Na⁺ and Cl⁻). Cancelling them leaves only the reacting ions: H⁺ from the acid combines with OH⁻ from the alkali to form water.',
}));

// ── C3 · LANGUAGE OF CHEMISTRY — Formulae, Valency & Chemical Change (051-060)

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-051',
  chapterId: 'g9s-c3-language',
  subsection: 'formulae_of_compounds',
  difficulty: 2,
  question: 'The hydroxide group has the formula OH. It carries one negative charge (OH⁻). What is the valency of the hydroxide group?',
  options: [
    '1',
    '2',
    '3',
    '4',
  ],
  answer: '1',
  explanation: 'Valency equals the number of charges. OH⁻ carries one negative charge, so its valency is 1. Example: Ca(OH)₂ needs two OH groups to balance Ca²⁺.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-052',
  chapterId: 'g9s-c3-language',
  subsection: 'formulae_of_compounds',
  difficulty: 2,
  question: 'The carbonate group has the formula CO₃. It carries two negative charges (CO₃²⁻). What is the valency of the carbonate group?',
  options: [
    '2',
    '1',
    '3',
    '4',
  ],
  answer: '2',
  explanation: 'CO₃²⁻ carries two negative charges, so its valency is 2. Example: CaCO₃ — one CO₃²⁻ (valency 2) balances one Ca²⁺ (valency 2) in a 1:1 ratio.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-053',
  chapterId: 'g9s-c3-language',
  subsection: 'formulae_of_compounds',
  difficulty: 2,
  question: 'Calcium has valency 2. The hydroxide group (OH) has valency 1. What is the correct formula of calcium hydroxide?',
  options: [
    'Ca(OH)₂',
    'CaOH',
    'Ca₂OH',
    'Ca(OH)₃',
  ],
  answer: 'Ca(OH)₂',
  explanation: 'Valency 2 (Ca²⁺) and valency 1 (OH⁻) cross over: two OH groups are needed to balance one Ca²⁺, giving Ca(OH)₂.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-054',
  chapterId: 'g9s-c3-language',
  subsection: 'formulae_of_compounds',
  difficulty: 2,
  question: 'Magnesium has valency 2. The carbonate group (CO₃) has valency 2. What is the correct formula of magnesium carbonate?',
  options: [
    'MgCO₃',
    'Mg₂CO₃',
    'Mg(CO₃)₂',
    'MgC₂O₃',
  ],
  answer: 'MgCO₃',
  explanation: 'When both groups have the same valency (both 2), they combine in a 1:1 ratio. One Mg²⁺ balances one CO₃²⁻: MgCO₃.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-055',
  chapterId: 'g9s-c3-language',
  subsection: 'formulae_of_compounds',
  difficulty: 2,
  question: 'Some elements exist as diatomic molecules (pairs of atoms bonded together) under normal conditions. Which of the following exists as a diatomic molecule?',
  options: [
    'Chlorine (Cl₂)',
    'Sulfur (S₈)',
    'Carbon (forms a giant structure)',
    'Zinc (single metal atoms)',
  ],
  answer: 'Chlorine (Cl₂)',
  explanation: 'The diatomic elements are H₂, N₂, O₂, F₂, Cl₂, Br₂ and I₂. Sulfur forms S₈ rings, carbon forms giant covalent lattices, and zinc is a metal with individual atoms in a lattice.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-056',
  chapterId: 'g9s-c3-language',
  subsection: 'formulae_of_compounds',
  difficulty: 1,
  question: 'Oxygen (O₂), hydrogen (H₂) and nitrogen (N₂) all exist as diatomic molecules. Which of the following does NOT exist as a diatomic molecule under normal conditions?',
  options: [
    'Carbon',
    'Oxygen',
    'Hydrogen',
    'Nitrogen',
  ],
  answer: 'Carbon',
  explanation: 'Carbon forms giant covalent structures (diamond and graphite) — not diatomic molecules. O₂, H₂ and N₂ are all diatomic.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-057',
  chapterId: 'g9s-c3-language',
  subsection: 'rearrangement_of_atoms',
  difficulty: 2,
  question: 'Which of the following is an example of a CHEMICAL change?',
  options: [
    'Iron rusting in moist air to form iron oxide',
    'Ice melting into liquid water',
    'Sugar dissolving in hot water',
    'A glass rod being cut into shorter pieces',
  ],
  answer: 'Iron rusting in moist air to form iron oxide',
  explanation: 'Rusting is a chemical change — a new substance (iron oxide) forms through an irreversible chemical reaction. Melting, dissolving and cutting are physical changes; no new substance is formed.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-058',
  chapterId: 'g9s-c3-language',
  subsection: 'formulae_of_compounds',
  difficulty: 1,
  question: 'The ammonium group has the formula NH₄. It carries one positive charge (NH₄⁺). What is the valency of the ammonium group?',
  options: [
    '1',
    '2',
    '3',
    '4',
  ],
  answer: '1',
  explanation: 'NH₄⁺ carries one positive charge, so its valency is 1. Example: (NH₄)₂SO₄ needs two NH₄⁺ ions to balance one SO₄²⁻ (valency 2).',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-059',
  chapterId: 'g9s-c3-language',
  subsection: 'formulae_of_compounds',
  difficulty: 1,
  question: 'The sulfate group has the formula SO₄. It carries two negative charges (SO₄²⁻). What is the valency of the sulfate group?',
  options: [
    '2',
    '1',
    '3',
    '4',
  ],
  answer: '2',
  explanation: 'SO₄²⁻ carries two negative charges, so its valency is 2. Example: Na₂SO₄ — two Na⁺ ions (valency 1 each) balance one SO₄²⁻.',
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-cpi-060',
  chapterId: 'g9s-c3-language',
  subsection: 'formulae_of_compounds',
  difficulty: 3,
  question: 'The ammonium group (NH₄) has valency 1 and the sulfate group (SO₄) has valency 2. What is the correct formula of ammonium sulfate?',
  options: [
    '(NH₄)₂SO₄',
    'NH₄SO₄',
    'NH₄(SO₄)₂',
    '(NH₄)₂(SO₄)₂',
  ],
  answer: '(NH₄)₂SO₄',
  explanation: 'Valency 1 (NH₄⁺) and valency 2 (SO₄²⁻) cross over: two NH₄⁺ are needed to balance one SO₄²⁻, giving (NH₄)₂SO₄.',
}));

})();
