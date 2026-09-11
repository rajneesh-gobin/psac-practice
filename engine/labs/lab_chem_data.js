'use strict';
// ══════════════════════════════════════════════
//  Science Labs - the chemistry behind the Mixing Bench (NCE Grade 9).
//
//  ⚠ THE SCIENCE LIVES HERE, NOT IN THE ANIMATION. Every outcome the bench can
//    show - which metals fizz, how fast, what forms, what colour - comes from
//    this file. lab_mixing.js only moves amounts over time and draws them. If a
//    reaction looks wrong on screen, fix it HERE.
//  ⚠ Reviewed against the NCE Grade 9 Chemistry chapters (metals_with_acids,
//    metals_with_water_steam, reactivity_series, neutralisation, soluble_insoluble):
//    reactivity series K > Na > Ca > Mg > Al > Zn > Fe > (H) > Cu. The rates
//    below are ordered to match it, and scripts/test-labs-chem-data.js fails if
//    they stop matching.
//
//  Units: amounts in mmol and volumes in cm³, so mmol/cm³ is mol/dm³ and
//  pH = -log10 of that. Dilute acid and alkali are 1.0 mol/dm³ (of H⁺ / OH⁻).
// ══════════════════════════════════════════════
const LabChem = (() => {

  const LIQUIDS = {
    hcl:       { name: 'Dilute hydrochloric acid', short: 'Hydrochloric acid', formula: 'HCl(aq)',   pour: 5,    h: 1.0, oh: 0,   anion: 'chloride', corrosive: true, swatch: '#D9EEF6', meta: '1.0 mol/dm³ · 5 cm³' },
    // 0.5 mol/dm³ H₂SO₄ gives 1.0 mol/dm³ of H⁺ - the same acidity as the HCl, so a comparison is fair.
    h2so4:     { name: 'Dilute sulfuric acid',     short: 'Sulfuric acid',     formula: 'H₂SO₄(aq)', pour: 5,    h: 1.0, oh: 0,   anion: 'sulfate',  corrosive: true, swatch: '#E3E6F4', meta: '0.5 mol/dm³ · 5 cm³' },
    water:     { name: 'Distilled water',          short: 'Water',             formula: 'H₂O',       pour: 5,    h: 0,   oh: 0,                                        swatch: '#CFE8F3', meta: '5 cm³' },
    naoh:      { name: 'Dilute sodium hydroxide',  short: 'Sodium hydroxide',  formula: 'NaOH(aq)',  pour: 5,    h: 0,   oh: 1.0,                   corrosive: true, swatch: '#E6F1EC', meta: '1.0 mol/dm³ · 5 cm³' },
    indicator: { name: 'Universal indicator',      short: 'Indicator',         formula: '3 drops',   pour: 0.15, h: 0,   oh: 0,   indicator: true,                     swatch: '#6DBE45', meta: '3 drops' },
  };

  // piece = mmol of metal in one piece. rank = position in the reactivity series.
  const METALS = {
    potassium: { name: 'Potassium', sym: 'K',  rank: 1, piece: 0.5, look: 'lump',     color: '#B9C1C8', alkali: true, meta: 'Teacher only · stored under oil' },
    sodium:    { name: 'Sodium',    sym: 'Na', rank: 2, piece: 0.5, look: 'lump',     color: '#C9CED3', alkali: true, meta: 'Teacher only · stored under oil' },
    calcium:   { name: 'Calcium',   sym: 'Ca', rank: 3, piece: 1.0, look: 'granule',  color: '#DAD6CC', meta: 'Granules' },
    magnesium: { name: 'Magnesium', sym: 'Mg', rank: 4, piece: 1.5, look: 'ribbon',   color: '#C7CCD2', meta: 'Ribbon, 3 cm' },
    aluminium: { name: 'Aluminium', sym: 'Al', rank: 5, piece: 1.0, look: 'foil',     color: '#D5DADE', meta: 'Foil' },
    zinc:      { name: 'Zinc',      sym: 'Zn', rank: 6, piece: 1.5, look: 'granule',  color: '#9DA6AD', meta: 'Granules' },
    iron:      { name: 'Iron',      sym: 'Fe', rank: 7, piece: 1.5, look: 'filings',  color: '#5B6166', meta: 'Filings' },
    copper:    { name: 'Copper',    sym: 'Cu', rank: 8, piece: 1.5, look: 'turnings', color: '#C0693A', meta: 'Turnings' },
  };

  const MEDIUM_NAMES = {
    hcl: 'dilute hydrochloric acid', h2so4: 'dilute sulfuric acid', water: 'water',
    naoh: 'sodium hydroxide solution', dry: 'a dry tube',
  };

  // kind: 'react' | 'none' | 'demo' (teacher demonstration behind a screen)
  // rate  mmol of metal per second while there is plenty of reagent
  // lag / lagRate        a slow start (aluminium's oxide layer)
  // stopAfter / lateRate a fast start that chokes (an insoluble coating)
  // uses 'h' | 'oh' and per: H⁺ or OH⁻ used per mmol of metal
  // makesOH: OH⁻ made per mmol of metal (metal + water)
  // h2: mmol of hydrogen per mmol of metal
  const R = o => Object.assign({ kind: 'react', rate: 0, uses: null, per: 0, makesOH: 0, h2: 0 }, o);
  const NONE = (obs, disc) => ({ kind: 'none', rate: 0, obs, disc: disc || null });

  const REACTIONS = {
    'magnesium|hcl':   R({ rate: 0.10, uses: 'h', per: 2, h2: 1, warm: true, disc: 'mg_hcl',
      obs: 'Vigorous fizzing. The tube gets warm and the magnesium ribbon shrinks until it disappears.',
      word: 'magnesium + hydrochloric acid → magnesium chloride + hydrogen', sym: 'Mg + 2HCl → MgCl₂ + H₂' }),
    'magnesium|h2so4': R({ rate: 0.10, uses: 'h', per: 2, h2: 1, warm: true, disc: 'mg_h2so4',
      obs: 'Vigorous fizzing. The tube gets warm and the magnesium ribbon shrinks until it disappears.',
      word: 'magnesium + sulfuric acid → magnesium sulfate + hydrogen', sym: 'Mg + H₂SO₄ → MgSO₄ + H₂' }),
    'zinc|hcl':        R({ rate: 0.025, uses: 'h', per: 2, h2: 1, disc: 'zn_hcl',
      obs: 'Steady fizzing. The zinc granules slowly get smaller.',
      word: 'zinc + hydrochloric acid → zinc chloride + hydrogen', sym: 'Zn + 2HCl → ZnCl₂ + H₂' }),
    'zinc|h2so4':      R({ rate: 0.025, uses: 'h', per: 2, h2: 1, disc: 'zn_h2so4',
      obs: 'Steady fizzing. The zinc granules slowly get smaller.',
      word: 'zinc + sulfuric acid → zinc sulfate + hydrogen', sym: 'Zn + H₂SO₄ → ZnSO₄ + H₂' }),
    'iron|hcl':        R({ rate: 0.006, uses: 'h', per: 2, h2: 1, ion: '#BFDC9E', disc: 'fe_hcl',
      obs: 'Slow bubbling. The solution slowly turns pale green - that colour is iron(II) chloride.',
      word: 'iron + hydrochloric acid → iron(II) chloride + hydrogen', sym: 'Fe + 2HCl → FeCl₂ + H₂' }),
    'iron|h2so4':      R({ rate: 0.006, uses: 'h', per: 2, h2: 1, ion: '#BFDC9E', disc: 'fe_h2so4',
      obs: 'Slow bubbling. The solution slowly turns pale green - that colour is iron(II) sulfate.',
      word: 'iron + sulfuric acid → iron(II) sulfate + hydrogen', sym: 'Fe + H₂SO₄ → FeSO₄ + H₂' }),
    'aluminium|hcl':   R({ rate: 0.04, lag: 8, lagRate: 0.0008, uses: 'h', per: 3, h2: 1.5, disc: 'al_acid',
      obs: 'Almost nothing at first - a thin layer of aluminium oxide protects the metal. Then the fizzing speeds up.',
      word: 'aluminium + hydrochloric acid → aluminium chloride + hydrogen', sym: '2Al + 6HCl → 2AlCl₃ + 3H₂' }),
    'aluminium|h2so4': R({ rate: 0.04, lag: 8, lagRate: 0.0008, uses: 'h', per: 3, h2: 1.5, disc: 'al_acid',
      obs: 'Almost nothing at first - a thin layer of aluminium oxide protects the metal. Then the fizzing speeds up.',
      word: 'aluminium + sulfuric acid → aluminium sulfate + hydrogen', sym: '2Al + 3H₂SO₄ → Al₂(SO₄)₃ + 3H₂' }),
    'calcium|hcl':     R({ rate: 0.12, uses: 'h', per: 2, h2: 1, warm: true, disc: 'ca_hcl',
      obs: 'Very vigorous fizzing. The calcium disappears quickly and the tube gets warm.',
      word: 'calcium + hydrochloric acid → calcium chloride + hydrogen', sym: 'Ca + 2HCl → CaCl₂ + H₂' }),
    'calcium|h2so4':   R({ rate: 0.12, stopAfter: 3, lateRate: 0.003, uses: 'h', per: 2, h2: 1, cloudy: true, disc: 'ca_h2so4',
      obs: 'Fizzes hard for a moment, then almost stops: calcium sulfate barely dissolves, so it coats the metal and shuts the acid out.',
      word: 'calcium + sulfuric acid → calcium sulfate + hydrogen', sym: 'Ca + H₂SO₄ → CaSO₄ + H₂' }),
    'copper|hcl':      NONE('No reaction - not a single bubble. Copper is below hydrogen in the reactivity series, so it cannot push hydrogen out of the acid.', 'cu_acid'),
    'copper|h2so4':    NONE('No reaction - not a single bubble. Copper is below hydrogen in the reactivity series, so it cannot push hydrogen out of the acid.', 'cu_acid'),

    'calcium|water':   R({ rate: 0.04, makesOH: 2, h2: 1, cloudy: true, disc: 'ca_water',
      obs: 'Steady fizzing. The water turns cloudy white as calcium hydroxide forms, and the solution becomes alkaline.',
      word: 'calcium + water → calcium hydroxide + hydrogen', sym: 'Ca + 2H₂O → Ca(OH)₂ + H₂' }),
    'magnesium|water': R({ rate: 0.0006, makesOH: 2, h2: 1, disc: 'mg_water',
      obs: 'Only a few tiny bubbles - magnesium reacts with cold water very, very slowly. (With steam it reacts much faster.)',
      word: 'magnesium + water → magnesium hydroxide + hydrogen', sym: 'Mg + 2H₂O → Mg(OH)₂ + H₂' }),
    'aluminium|water': NONE('No reaction - the layer of aluminium oxide on its surface protects it from water.'),
    'zinc|water':      NONE('No visible reaction with cold water.'),
    'iron|water':      NONE('No bubbles. (Left for days, iron slowly rusts in water and air - but that is a different, much slower reaction.)'),
    'copper|water':    NONE('No reaction.'),
    'sodium|water':    R({ kind: 'demo', rate: 0.15, makesOH: 1, h2: 0.5, disc: 'na_water',
      obs: 'Teacher demo: the sodium floats, melts into a shiny ball and whizzes across the surface, fizzing, until it is gone. The water becomes alkaline.',
      word: 'sodium + water → sodium hydroxide + hydrogen', sym: '2Na + 2H₂O → 2NaOH + H₂' }),
    'potassium|water': R({ kind: 'demo', rate: 0.25, makesOH: 1, h2: 0.5, flame: '#B58CFF', disc: 'k_water',
      obs: 'Teacher demo: the potassium floats, melts and bursts into a lilac flame as it races around the surface. The water becomes alkaline.',
      word: 'potassium + water → potassium hydroxide + hydrogen', sym: '2K + 2H₂O → 2KOH + H₂' }),

    'aluminium|naoh':  R({ rate: 0.03, uses: 'oh', per: 1, h2: 1.5, disc: 'al_naoh',
      obs: 'Fizzing! Aluminium is unusual: it reacts with alkalis as well as with acids. (True, but beyond the NCE syllabus.)',
      word: 'aluminium + sodium hydroxide + water → sodium aluminate + hydrogen', sym: '' }),
    'zinc|naoh':       NONE('Hardly anything - cold dilute alkali attacks zinc far too slowly to see.'),
    'magnesium|naoh':  NONE('No reaction - magnesium does not react with alkalis.'),
    'iron|naoh':       NONE('No reaction - iron does not react with alkalis.'),
    'copper|naoh':     NONE('No reaction - copper does not react with alkalis.'),
  };

  const DRY = { kind: 'dry', rate: 0, obs: 'Nothing happens - in a dry tube there is nothing for the metal to react with.' };

  // ⚠ Alkali metals only ever meet pure water, as a teacher demo. Anything else
  //   is the alkali_metal hazard, decided by the bench before it gets here.
  function reaction(metal, medium) {
    if (medium === 'dry') return DRY;
    // Calcium in an alkaline solution still reacts with the WATER in it.
    if (metal === 'calcium' && medium === 'naoh') return REACTIONS['calcium|water'];
    return REACTIONS[metal + '|' + medium] || null;
  }

  // How fast the notebook says it fizzed, 0-4, from the reaction's main rate.
  function fizzRating(rx) {
    const r = rx && rx.kind !== 'none' ? rx.rate : 0;
    if (r >= 0.08) return 4;
    if (r >= 0.02) return 3;
    if (r >= 0.004) return 2;
    if (r > 0) return 1;
    return 0;
  }
  const FIZZ_WORDS = ['No bubbles', 'A few bubbles', 'Slow bubbling', 'Steady fizzing', 'Vigorous fizzing'];

  const NEUTRAL = {
    hcl:   { salt: 'sodium chloride', word: 'hydrochloric acid + sodium hydroxide → sodium chloride + water', sym: 'HCl + NaOH → NaCl + H₂O' },
    h2so4: { salt: 'sodium sulfate',  word: 'sulfuric acid + sodium hydroxide → sodium sulfate + water',     sym: 'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O' },
  };

  // ── pH and universal indicator ─────────────────
  function pH(h, oh, v) {
    if (!(v > 0)) return null;
    const net = (h - oh) / v;                 // mol/dm³ of excess H⁺ (negative: excess OH⁻)
    if (net > 1e-7)  return Math.max(0, -Math.log10(net));
    if (net < -1e-7) return Math.min(14, 14 + Math.log10(-net));
    return 7;
  }
  // The same fourteen colours as the plan's indicator strip; pH 0 shares pH 1's red.
  const INDICATOR = ['#D81E24', '#E0242B', '#EA4A2A', '#F07A2A', '#F6A623', '#F4CF2A', '#C8D82C',
                     '#6DBE45', '#2FA36B', '#1F8F8E', '#2476B5', '#2F5AA8', '#45459A', '#5B3A8E', '#6B2C84'];
  function indicatorColor(p) { return INDICATOR[Math.max(0, Math.min(14, Math.round(p)))]; }
  function indicatorName(p) {
    const r = Math.round(p);
    if (r <= 2) return 'red';
    if (r <= 4) return 'orange';
    if (r === 5) return 'yellow';
    if (r === 6) return 'yellow-green';
    if (r === 7) return 'green';
    if (r <= 9) return 'blue-green';
    if (r <= 11) return 'blue';
    return 'purple';
  }
  function pHMeaning(p) {
    if (p < 3) return 'strongly acidic';
    if (p < 6.5) return 'weakly acidic';
    if (p <= 7.5) return 'neutral';
    if (p <= 11) return 'weakly alkaline';
    return 'strongly alkaline';
  }

  // ── Discoveries: things a pupil can find by experimenting ───
  // Each one can be opened from the Discoveries tab: a FOUND card shows what the
  // pupil saw (the reaction's own `obs`, or `saw`), its equations and `learn`;
  // a LOCKED card shows `how` - the steps, in the guide vocabulary below - and
  // "Show me how" runs them as a guide. scripts/test-labs-mixing.js follows
  // every `how` and fails if any of them does not actually unlock its card.
  const G = 'goggles', HCL = 'liquid:hcl', H2SO4 = 'liquid:h2so4', NAOH = 'liquid:naoh',
        WATER = 'liquid:water', IND = 'liquid:indicator', SEE = 'observe';
  const DISCOVERIES = [
    { id: 'mg_hcl',   icon: '⚡', title: 'Magnesium in hydrochloric acid', hint: 'A reactive metal in an acid',
      rx: 'magnesium|hcl', how: [G, HCL, 'metal:magnesium', SEE],
      learn: 'Magnesium is high in the reactivity series, so it pushes hydrogen out of the acid fast. The fizzing is hydrogen gas.' },
    { id: 'mg_h2so4', icon: '⚡', title: 'Magnesium in sulfuric acid', hint: 'The same metal, a different acid',
      rx: 'magnesium|h2so4', how: [G, H2SO4, 'metal:magnesium', SEE],
      learn: 'The same kind of reaction as with hydrochloric acid - but sulfuric acid makes a sulfate, not a chloride.' },
    { id: 'zn_hcl',   icon: '🫧', title: 'Zinc in hydrochloric acid', hint: 'A middle-of-the-series metal in acid',
      rx: 'zinc|hcl', how: [G, HCL, 'metal:zinc', SEE],
      learn: 'Zinc is below magnesium in the reactivity series, so it reacts more gently: steady fizzing instead of vigorous.' },
    { id: 'zn_h2so4', icon: '🫧', title: 'Zinc in sulfuric acid', hint: 'Try zinc with the other acid',
      rx: 'zinc|h2so4', how: [G, H2SO4, 'metal:zinc', SEE],
      learn: 'Zinc with sulfuric acid makes zinc sulfate and hydrogen - the same pattern: metal + acid → salt + hydrogen.' },
    { id: 'fe_hcl',   icon: '🟢', title: 'Iron turns it green', hint: 'Iron filings and an acid - watch the colour',
      rx: 'iron|hcl', how: [G, HCL, 'metal:iron', SEE],
      learn: 'Iron is lower in the series, so it bubbles slowly. The pale green colour comes from iron(II) ions dissolving into the solution.' },
    { id: 'fe_h2so4', icon: '🟢', title: 'Iron in sulfuric acid', hint: 'Iron with the other acid',
      rx: 'iron|h2so4', how: [G, H2SO4, 'metal:iron', SEE],
      learn: 'Iron(II) sulfate is pale green too - the colour belongs to the iron, not to the acid.' },
    { id: 'al_acid',  icon: '🛡️', title: 'Aluminium’s secret shield', hint: 'Aluminium in an acid - be patient',
      rx: 'aluminium|hcl', how: [G, HCL, 'metal:aluminium', SEE],
      learn: 'Aluminium is quite reactive, but a thin, tough layer of aluminium oxide covers it. Once the acid eats through that layer, the reaction speeds up.' },
    { id: 'ca_hcl',   icon: '🔥', title: 'Calcium in hydrochloric acid', hint: 'The most reactive metal allowed in acid',
      rx: 'calcium|hcl', how: [G, HCL, 'metal:calcium', SEE],
      learn: 'Calcium is above magnesium in the reactivity series, so it reacts even more vigorously with acid.' },
    { id: 'ca_h2so4', icon: '🧱', title: 'The coating that stops a reaction', hint: 'Calcium with sulfuric acid',
      rx: 'calcium|h2so4', how: [G, H2SO4, 'metal:calcium', SEE],
      learn: 'Calcium sulfate hardly dissolves. It coats the calcium and shuts the acid out, so the reaction almost stops.' },
    { id: 'cu_acid',  icon: '🟤', title: 'Copper refuses', hint: 'An unreactive metal in acid',
      rx: 'copper|hcl', how: [G, HCL, 'metal:copper', SEE],
      learn: 'Copper is below hydrogen in the reactivity series, so it cannot push hydrogen out of an acid.' },
    { id: 'ca_water', icon: '☁️', title: 'Calcium clouds the water', hint: 'Calcium in plain water',
      rx: 'calcium|water', how: [WATER, 'metal:calcium', SEE],
      learn: 'Calcium is reactive enough to react with cold water. The calcium hydroxide it makes barely dissolves, so it clouds the water.' },
    { id: 'mg_water', icon: '🐢', title: 'Magnesium barely bothers', hint: 'Magnesium in plain water',
      rx: 'magnesium|water', how: [WATER, 'metal:magnesium', SEE],
      learn: 'Magnesium reacts with cold water only very slowly. Heated in steam it reacts quickly, making magnesium oxide and hydrogen.' },
    { id: 'na_water', icon: '🏃', title: 'Sodium on the run', hint: 'Teacher demo: an alkali metal in water',
      rx: 'sodium|water', how: [WATER, 'metal:sodium', 'demo-end'],
      learn: 'Sodium is so reactive that it reacts fiercely with cold water. It is less dense than water, so it floats as it reacts.' },
    { id: 'k_water',  icon: '💜', title: 'The lilac flame', hint: 'Teacher demo: the most reactive metal, in water',
      rx: 'potassium|water', how: [WATER, 'metal:potassium', 'demo-end'],
      learn: 'Potassium is the most reactive metal here. The reaction is hot enough to set the hydrogen alight, and potassium colours the flame lilac.' },
    { id: 'al_naoh',  icon: '🤯', title: 'Aluminium beats the rule', hint: 'Aluminium in an alkali',
      rx: 'aluminium|naoh', how: [G, NAOH, 'metal:aluminium', SEE],
      learn: 'Most metals do not react with alkalis, but aluminium does. It is beyond the NCE syllabus - you will meet the reason in later years.' },
    { id: 'neutralise', icon: '⚖️', title: 'Neutralisation', hint: 'Mix an acid with an alkali',
      eq: 'hcl', how: [G, HCL, NAOH],
      saw: 'Nothing fizzed and nothing changed colour - but the tube got slightly warm.',
      learn: 'An acid and an alkali cancel each other out: acid + alkali → salt + water. You only SEE it happen if universal indicator is in the tube.' },
    { id: 'ind_acid',   icon: '🔴', title: 'Indicator goes red', hint: 'Universal indicator in an acid',
      how: [G, HCL, IND], saw: 'The universal indicator turned red.',
      learn: 'Universal indicator is red in a strong acid (pH 1-2) and orange or yellow in a weak acid.' },
    { id: 'ind_alkali', icon: '🟣', title: 'Indicator goes purple', hint: 'Universal indicator in an alkali',
      how: [G, NAOH, IND], saw: 'The universal indicator turned purple.',
      learn: 'Universal indicator is purple in a strong alkali (pH 12-14) and blue in a weaker one.' },
    { id: 'ind_neutral', icon: '🟩', title: 'Exactly neutral', hint: 'Get universal indicator to green',
      eq: 'hcl', how: [G, HCL, NAOH, IND], saw: 'The universal indicator turned green: pH 7.',
      learn: 'Green means pH 7, exactly neutral. This much acid and this much alkali cancel each other out completely, leaving salt water.' },
    { id: 'pop_test',   icon: '💥', title: 'The squeaky pop', hint: 'Test the gas with a lighted splint',
      how: [G, HCL, 'metal:magnesium', SEE, 'pop'], saw: 'A squeaky pop at the mouth of the tube.',
      learn: 'Hydrogen burns with a squeaky pop when a lighted splint is held at the mouth of the tube. It is THE test for hydrogen.' },
    { id: 'glowing_h2', icon: '🕯️', title: 'Not oxygen', hint: 'Test the gas with a glowing splint',
      how: [G, HCL, 'metal:magnesium', SEE, 'glow'], saw: 'The glowing splint did not relight.',
      learn: 'A glowing splint relights only in oxygen. It did not relight, so this gas is not oxygen - ruling a gas out is part of testing it.' },
  ];

  // ── Hazards: the mistakes that stop the experiment ───
  // Each explains what happened, why it is dangerous, what to do instead, and
  // where the same point earns marks on the NCE paper.
  const HAZARDS = {
    no_goggles: {
      signs: ['corrosive'], fx: 'splash',
      title: () => 'Stop - protect your eyes',
      happened: c => `You reached for ${c.what} without safety goggles. As it went in, a drop splashed up towards your face.`,
      why: 'Acids and alkalis are corrosive: they attack living tissue. A single splash in the eye can damage it permanently - and alkalis are even worse for eyes than acids.',
      instead: 'Put on safety goggles before you touch any acid or alkali, and keep them on until the bench is cleared. Tap 🥽 at the top.',
      exam: '“State one safety precaution” - Wear safety goggles, because the acid is corrosive.',
    },
    alkali_metal: {
      signs: ['explosive', 'flammable'], fx: 'explode', reset: true,
      title: c => `Explosive reaction - ${c.metal.toLowerCase()} must never go in there`,
      happened: c => c.medium === 'naoh'
        ? `${c.metal} reacted violently with the water in the solution. It spat hot, corrosive alkali out of the tube and the hydrogen caught fire.`
        : `${c.metal} hit the acid and reacted explosively. Hydrogen was made so fast that it ignited and blew acid out of the tube.`,
      why: 'Potassium and sodium are at the very top of the reactivity series. Even in water they react fiercely; in acid the reaction is far too violent to control.',
      instead: 'Alkali metals are never added to acids, and pupils never handle them. A teacher may show a piece the size of a grain of rice in a large trough of WATER, behind a safety screen.',
      exam: 'The higher a metal is in the reactivity series (K, Na, Ca, Mg, Al, Zn, Fe, Cu), the more violently it reacts with water and acids.',
    },
    sealed_tube: {
      signs: ['pressure'], fx: 'bung',
      title: () => 'Pressure build-up - never seal a tube that is making gas',
      happened: () => 'Hydrogen kept being made but had nowhere to go. The pressure built up until it fired the bung out of the tube, with acid spraying behind it.',
      why: 'A reaction that gives off a gas will keep pushing until something gives - the bung, or the glass.',
      instead: 'Leave the tube open while it fizzes. To test the gas, hold a lighted splint at the mouth; to collect it, hold an empty tube upside down over the mouth.',
      exam: 'A stoppered tube is only safe when the reaction has finished. Hydrogen is tested with a lighted splint - it burns with a squeaky pop.',
    },
  };

  const SIGN_LABELS = { corrosive: 'Corrosive', explosive: 'Explosive', flammable: 'Flammable', pressure: 'Gas under pressure' };

  // Short, true facts for the 💡 button. Tied to the chapters, never trivia for its own sake.
  const FACTS = [
    'Your stomach makes hydrochloric acid - around pH 1 to 2 - to help digest food.',
    'Indigestion is too much stomach acid. An antacid is a base: it neutralises the extra acid.',
    'Farmers spread lime, a base, on soil that has become too acidic for their crops.',
    'Toothpaste is slightly alkaline, to neutralise the acid bacteria make on your teeth.',
    'A metal above hydrogen in the reactivity series can push hydrogen out of an acid. Copper, below hydrogen, cannot.',
    'Hydrogen is the lightest gas there is. Early airships were filled with it - until one caught fire.',
    'Iron(II) compounds are pale green. That is why the tube turns green when iron reacts with acid.',
    'Every metal-and-acid reaction follows one pattern: metal + acid → salt + hydrogen.',
    'Acid + alkali → salt + water. Hydrochloric acid makes chlorides; sulfuric acid makes sulfates.',
    'Acid rain is mostly sulfuric and nitric acid. It eats away limestone buildings and statues.',
    'A fair test changes ONE thing only. Same acid, same volume, same size of metal - only the metal changes.',
    'Universal indicator is a mixture of dyes, so it shows a different colour at every pH from 1 to 14.',
  ];

  // ── Missions ──
  // A question's FIRST option is the answer; the quiz shuffles them.
  const MISSIONS = [
    {
      id: 'race', icon: '🏁', title: 'Reactivity Race',
      blurb: 'Test magnesium, zinc, iron and copper in the same acid, then rank them.',
      metals: ['magnesium', 'zinc', 'iron', 'copper'], liquid: 'hcl',
      intro: 'Reactivity Race! Goggles on, then for each metal: pour dilute hydrochloric acid, add the metal, watch. Empty & rinse between metals so it’s a fair test.',
      quiz: [
        { q: 'Which list puts the metals from MOST to LEAST reactive?',
          options: ['Magnesium, zinc, iron, copper', 'Zinc, magnesium, copper, iron', 'Copper, iron, zinc, magnesium', 'Magnesium, iron, zinc, copper'],
          why: 'The faster the fizzing, the more reactive the metal: magnesium was vigorous, zinc steady, iron slow and copper did nothing.' },
        { q: 'Name the gas given off when a metal reacts with dilute hydrochloric acid.',
          options: ['Hydrogen', 'Oxygen', 'Carbon dioxide', 'Chlorine'],
          why: 'metal + acid → salt + hydrogen. The hydrogen comes from the acid.' },
        { q: 'How do you test for this gas?',
          options: ['A lighted splint burns it with a squeaky pop', 'A glowing splint relights', 'It turns limewater milky', 'It bleaches damp litmus paper'],
          why: 'Squeaky pop = hydrogen. A glowing splint relighting is the test for oxygen; limewater is for carbon dioxide.' },
        { q: 'Complete the word equation: zinc + hydrochloric acid → …',
          options: ['zinc chloride + hydrogen', 'zinc oxide + water', 'zinc sulfate + hydrogen', 'zinc chloride + water'],
          why: 'Hydrochloric acid makes chlorides. Sulfates come from sulfuric acid, and water comes from acid + alkali.' },
        { q: 'Which variable did you keep the SAME to make it a fair test?',
          options: ['The volume and concentration of the acid', 'The type of metal', 'How many bubbles you saw', 'The colour of the metal'],
          why: 'The metal is what you changed on purpose. Everything else - the acid, its volume, its concentration - stays the same.' },
        { q: 'Why must you wear goggles for this experiment?',
          options: ['The acid is corrosive and could splash into your eyes', 'So you can see the bubbles more clearly', 'To keep the metal clean', 'Because hydrogen is poisonous to eyes'],
          why: 'Dilute acid is still corrosive. Fizzing can throw tiny droplets out of the tube.' },
      ],
    },
    {
      id: 'neutral', icon: '🎯', title: 'Hit pH 7',
      blurb: 'Neutralise hydrochloric acid with sodium hydroxide, one drop at a time.',
      intro: 'Hit pH 7! The tube holds hydrochloric acid with universal indicator - it’s red. Add sodium hydroxide drop by drop until it turns exactly green.',
      quiz: [
        { q: 'What is the reaction between an acid and an alkali called?',
          options: ['Neutralisation', 'Oxidation', 'Displacement', 'Combustion'],
          why: 'An acid and an alkali cancel each other out: acid + alkali → salt + water.' },
        { q: 'What colour is universal indicator at pH 7?',
          options: ['Green', 'Red', 'Purple', 'Yellow'],
          why: 'Red is strongly acidic, green is neutral and purple is strongly alkaline.' },
        { q: 'Which salt forms when hydrochloric acid reacts with sodium hydroxide?',
          options: ['Sodium chloride', 'Sodium sulfate', 'Hydrogen chloride', 'Sodium hydroxide'],
          why: 'HCl + NaOH → NaCl + H₂O. Sodium chloride is ordinary salt.' },
        { q: 'Why do you add the alkali one drop at a time near the end?',
          options: ['One drop can change it from acidic to alkaline', 'Drops react faster than a big pour', 'It makes more salt', 'So the indicator does not run out'],
          why: 'Near pH 7 the change is sudden: one drop took the tube from red all the way to purple.' },
        { q: 'Someone has indigestion (too much stomach acid). What should they take?',
          options: ['An antacid, which is a base', 'Vinegar', 'Lemon juice', 'A glass of cola'],
          why: 'The antacid neutralises the extra acid. Vinegar, lemon juice and cola are all acidic.' },
      ],
    },
  ];

  // ── Guided experiments: "I landed here - what do I do?" ──
  // One action per step. `on` is what completes it: 'goggles', 'liquid:<id>',
  // 'metal:<id>', 'rinse', 'observe' (a metal's reaction is recorded), 'pop'
  // (a successful lighted-splint test) or 'demo-end'. A step with `btn` gets a
  // button under the tube that does it; the same item glows on the shelf.
  const GUIDES = [
    { id: 'fizz', icon: '🫧', title: 'Make it fizz',
      blurb: 'Drop a metal into acid, then test the gas it makes.',
      lesson: 'Metal + acid → salt + hydrogen. Magnesium fizzed because it is reactive, and the lighted splint’s squeaky pop proved the gas is hydrogen.',
      steps: [
        { on: 'goggles',          say: 'Safety first: put on your goggles.',                                 btn: '🥽 Put on goggles' },
        { on: 'liquid:hcl',       say: 'Pour dilute hydrochloric acid into the test tube.',                  btn: '🧪 Pour hydrochloric acid' },
        { on: 'liquid:indicator', say: 'Add universal indicator - its colour tells you how acidic the tube is.', btn: '🌈 Add universal indicator' },
        { on: 'metal:magnesium',  say: 'Red means strongly acidic. Now drop in a piece of magnesium ribbon.', btn: '⚡ Add magnesium' },
        { on: 'observe',          say: 'Watch the tube for a few seconds. What is happening to the magnesium?' },
        { on: 'pop',              say: 'Bubbles of gas! Test it: hold a lighted splint at the mouth of the tube.', btn: '🔥 Use the lighted splint' },
      ] },
    { id: 'acidalk', icon: '🌈', title: 'Acid or alkali?',
      blurb: 'Use universal indicator to tell an acid from an alkali.',
      lesson: 'Universal indicator is red in a strong acid, green when neutral and purple in a strong alkali. The pH number goes with it: below 7 acidic, 7 neutral, above 7 alkaline.',
      steps: [
        { on: 'goggles',          say: 'Put on your goggles - acids and alkalis are both corrosive.',  btn: '🥽 Put on goggles' },
        { on: 'liquid:hcl',       say: 'Pour dilute hydrochloric acid into the tube.',                 btn: '🧪 Pour hydrochloric acid' },
        { on: 'liquid:indicator', say: 'Add universal indicator. What colour does it turn?',           btn: '🌈 Add universal indicator' },
        { on: 'rinse',            say: 'Red: a strong acid. Now empty and rinse the tube.',            btn: '🧽 Empty & rinse' },
        { on: 'liquid:naoh',      say: 'Pour dilute sodium hydroxide - an alkali.',                    btn: '🧪 Pour sodium hydroxide' },
        { on: 'liquid:indicator', say: 'Add universal indicator again. Compare the colour.',           btn: '🌈 Add universal indicator' },
      ] },
    { id: 'copper', icon: '🟤', title: 'The metal that refuses',
      blurb: 'Put copper in acid and find out why nothing happens.',
      lesson: 'Copper is below hydrogen in the reactivity series, so it cannot push hydrogen out of an acid - no bubbles, no reaction.',
      steps: [
        { on: 'goggles',       say: 'Goggles on first.',                                  btn: '🥽 Put on goggles' },
        { on: 'liquid:hcl',    say: 'Pour dilute hydrochloric acid into the tube.',       btn: '🧪 Pour hydrochloric acid' },
        { on: 'metal:copper',  say: 'Drop in some copper turnings.',                      btn: '🟤 Add copper' },
        { on: 'observe',       say: 'Watch closely for a few seconds. Any bubbles?' },
      ] },
    { id: 'sodium', icon: '🏃', title: 'Teacher demo: sodium',
      blurb: 'Watch sodium race across water - safely, behind a screen.',
      lesson: 'Sodium + water → sodium hydroxide + hydrogen. The water became an alkali (purple indicator). Sodium is so reactive that only a teacher ever handles it.',
      steps: [
        { on: 'liquid:water',     say: 'Pour some water into the tube.',                                         btn: '💧 Pour water' },
        { on: 'metal:sodium',     say: 'Your teacher adds a tiny piece of sodium - behind a safety screen.',     btn: '🏃 Add sodium (teacher demo)' },
        { on: 'demo-end',         say: 'Watch it fizz and race around until it is all gone…' },
        { on: 'liquid:indicator', say: 'Is the water still neutral? Add universal indicator to find out.',       btn: '🌈 Add universal indicator' },
      ] },
  ];

  return { LIQUIDS, METALS, MEDIUM_NAMES, REACTIONS, reaction, fizzRating, FIZZ_WORDS, NEUTRAL,
           pH, indicatorColor, indicatorName, pHMeaning, INDICATOR,
           DISCOVERIES, HAZARDS, SIGN_LABELS, FACTS, MISSIONS, GUIDES };
})();
if (typeof window !== 'undefined') window.LabChem = LabChem;
