'use strict';
// ══════════════════════════════════════════════
//  Science Labs - the chemistry behind the Separation Station (NCE Grade 9).
//
//  ⚠ THE SCIENCE LIVES HERE, NOT IN THE ANIMATION. Every temperature, rate,
//    rig check, outcome, hazard, fact, guide, discovery, mission and quiz
//    question the bench can show comes from this file. lab_separation.js only
//    moves amounts over time and draws them. If something looks wrong on
//    screen, fix it HERE.
//  ⚠ Reviewed against C2 · Mixtures & Separation Techniques
//    (subjects/grade9-chemistry/_manifest.js: distillation, crystallization,
//    sublimation, apparatus_diagrams, choosing_a_technique) and the paper
//    shapes in docs/nce-grade9/blueprint-science.md. The NCF names three
//    techniques at Grade 9 - crystallisation, sublimation, distillation;
//    filtration is Grade 8 and appears here only in "Which technique?".
//    scripts/test-labs-separation-data.js checks the numbers.
//
//  Time-lapse: 1 second on the bench is 1 minute in a real lab.
//  Units: volumes in cm³ (1 cm³ of water ≈ 1 g), masses in g, temperatures in °C.
// ══════════════════════════════════════════════
const LabSeparationData = (() => {

  const ROOM = 25;               // °C, a Mauritian school lab
  const TIME_LAPSE = '1 second here = about 1 minute in a real lab';

  // ── Boiling and subliming points (at normal atmospheric pressure) ──
  const POINTS = {
    water:  { name: 'Water',                 boils: 100 },
    salt:   { name: 'Salt (sodium chloride)', melts: 801, boils: 1413 },
    // Iodine does melt if heated strongly (113.7 °C) - which is why the bench says
    // "heat gently". That detail is beyond the NCE syllabus.
    iodine: { name: 'Iodine', sublimes: true, melts: 113.7, boils: 184.3 },
    // Ammonium chloride "sublimes" at about 338 °C: really it splits into ammonia and
    // hydrogen chloride, which join up again on the cold surface (beyond the syllabus).
    nh4cl:  { name: 'Ammonium chloride', sublimes: true, sublimesAt: 338 },
    sand:   { name: 'Sand (silicon dioxide)', melts: 1710 },
  };

  // Steam made by 1 cm³ (1 g) of water at 100 °C and normal pressure:
  // (1 / 18.02 mol) × 0.08206 × 373.15 K ≈ 1.70 dm³ = about 1700 cm³.
  const STEAM_PER_CM3 = 1700;

  // ══ Distillation ═════════════════════════════
  // The mixtures the flask can hold. `elev` is how far the dissolved solid raises
  // the boiling point of the LIQUID at 100 cm³ (it grows as the flask is boiled
  // down). 3.5 g of salt in 100 cm³ is real sea water (35 g per litre) and boils
  // at about 100.6 °C - beyond the NCE syllabus, but it is why a thermometer bulb
  // left in the liquid reads the wrong thing. The VAPOUR is always pure water.
  const FLASKS = {
    sea: { name: 'Sea water', long: 'sea water (salty water)', vol: 100, solute: 'salt', grams: 3.5, elev: 0.6,
           color: '#BFD9E2', residue: 'white salt crystals', meta: '100 cm³ · 3.5 g of salt dissolved' },
    ink: { name: 'Inky water', long: 'inky water', vol: 100, solute: 'ink dye', grams: 1, elev: 0,
           color: '#3346A8', residue: 'a dark smear of dye', meta: '100 cm³ · water with a dissolved dye' },
  };

  const DISTIL = {
    heatRate: 18,        // °C per second while the burner heats the flask
    coolRate: 6,         // °C per second when the burner is off
    evap: 2.5,           // cm³ boiled off per second
    vapourDelay: 0.8,    // s for the first vapour to reach the side arm
    target: 25,          // cm³ of distillate that finishes a run
    minLeft: 40,         // cm³ - never boil the flask dry
    fillRate: 0.6,       // condenser jacket fills at this fraction per second
    topFill: 0.2,        // water in at the TOP drains straight out: the jacket stays this full
    condenseFull: 1,     // fraction of vapour condensed by a full jacket
    condenseTop: 0.1,    // …and by a nearly empty one
    burstAt: 1.5,        // cm³ of water turned to steam inside a sealed rig before it gives
    cardWaterTop: 4,     // s of boiling before the "water in at the top" card
    cardThermo: 3,       // s of boiling before the "bulb in the liquid" card
    readEvery: 2,        // s between rows of the readings table
  };

  // Each part of a simple distillation rig and the choices a pupil can make.
  // `ok` lists the right choices; a wrong one names the error it causes.
  const PARTS = {
    flask:     { name: 'Round-bottom flask', icon: '⚗️', hint: 'Holds the mixture you heat.',
                 options: { sea: 'Sea water', ink: 'Inky water' }, ok: ['sea', 'ink'] },
    granules:  { name: 'Anti-bumping granules', icon: '⚪', hint: 'A few go in the flask before heating.',
                 options: { yes: 'Add a few', no: 'Leave out' }, ok: ['yes'], wrong: { no: 'bumping' } },
    thermo:    { name: 'Thermometer', icon: '🌡️', hint: 'Where does the bulb go?',
                 options: { arm: 'Bulb level with the side arm', liquid: 'Bulb in the liquid' }, ok: ['arm'], wrong: { liquid: 'thermo_liquid' } },
    condenser: { name: 'Liebig condenser', icon: '🧊', hint: 'Which end does the cold water go in?',
                 options: { bottom: 'Water IN at the bottom', top: 'Water IN at the top' }, ok: ['bottom'], wrong: { top: 'water_top' } },
    receiver:  { name: 'Conical flask (receiver)', icon: '🫙', hint: 'Collects the distillate.',
                 options: { open: 'Open', sealed: 'Sealed with a bung' }, ok: ['open'], wrong: { sealed: 'sealed' } },
    burner:    { name: 'Bunsen burner, tripod & gauze', icon: '🔥', hint: 'Heat goes under the flask.',
                 options: { yes: 'Put under the flask' }, ok: ['yes'] },
  };
  const PART_ORDER = ['flask', 'granules', 'thermo', 'condenser', 'receiver', 'burner'];

  // The order the bench deals with errors in when a faulty rig is heated:
  // the dangerous ones stop it first. An error's id is the id of the card it shows.
  const ERROR_ORDER = ['sealed', 'bumping', 'water_top', 'thermo_liquid'];

  // parts: { flask: 'sea' | … | null, … } → what is missing, and which errors it has.
  function checkRig(parts) {
    const p = parts || {};
    const missing = PART_ORDER.filter(k => !p[k]);
    const errors = [];
    PART_ORDER.forEach(k => {
      const w = PARTS[k].wrong && PARTS[k].wrong[p[k]];
      if (w) errors.push(w);
    });
    errors.sort((a, b) => ERROR_ORDER.indexOf(a) - ERROR_ORDER.indexOf(b));
    return { missing, errors, ok: !missing.length && !errors.length };
  }

  // Ready-made rigs for guides ("build:<id>") and the tests.
  const GOOD = { flask: 'sea', granules: 'yes', thermo: 'arm', condenser: 'bottom', receiver: 'open', burner: 'yes' };
  const RIGS = {
    correct:       { label: 'a correct rig with sea water', parts: Object.assign({}, GOOD) },
    ink:           { label: 'a correct rig with inky water', parts: Object.assign({}, GOOD, { flask: 'ink' }) },
    water_top:     { label: 'a rig with the cooling water going in at the TOP', parts: Object.assign({}, GOOD, { condenser: 'top' }) },
    thermo_liquid: { label: 'a rig with the thermometer bulb down in the liquid', parts: Object.assign({}, GOOD, { thermo: 'liquid' }) },
    sealed:        { label: 'a rig with the receiver sealed by a bung', parts: Object.assign({}, GOOD, { receiver: 'sealed' }) },
    no_granules:   { label: 'a rig with no anti-bumping granules', parts: Object.assign({}, GOOD, { granules: 'no' }) },
    two_errors:    { label: 'a rig with two errors in it', parts: Object.assign({}, GOOD, { condenser: 'top', thermo: 'liquid' }) },
  };

  // Boiling point of the liquid in the flask, which rises as it is boiled down.
  function liquidBoils(flask, vol) {
    const F = FLASKS[flask];
    if (!F || !(vol > 0)) return POINTS.water.boils;
    return Math.round((POINTS.water.boils + F.elev * (F.vol / vol)) * 10) / 10;
  }

  // ══ Crystallisation ══════════════════════════
  // Solubility of copper(II) sulfate: grams of anhydrous CuSO₄ that dissolve in
  // 100 g of water (standard data tables). It rises steeply with temperature -
  // the principle behind crystallisation.
  const SOLUBILITY = [[0, 14.3], [20, 20.7], [40, 28.5], [60, 40.0], [80, 55.0], [100, 75.4]];
  function solubility(T) {
    const s = SOLUBILITY;
    if (T <= s[0][0]) return s[0][1];
    for (let i = 1; i < s.length; i++) {
      if (T <= s[i][0]) {
        const [t0, v0] = s[i - 1], [t1, v1] = s[i];
        return v0 + (v1 - v0) * (T - t0) / (t1 - t0);
      }
    }
    return s[s.length - 1][1];
  }
  // The temperature at which a solution of `grams` in `water` cm³ becomes saturated
  // (crystals start to appear as it cools), or null if it never does above 0 °C.
  function saturatedAt(grams, water) {
    const need = grams * 100 / water;
    const s = SOLUBILITY;
    if (need <= s[0][1]) return null;
    if (need > s[s.length - 1][1]) return s[s.length - 1][0];
    for (let i = 1; i < s.length; i++) {
      const [t0, v0] = s[i - 1], [t1, v1] = s[i];
      if (need <= v1) return t0 + (t1 - t0) * (need - v0) / (v1 - v0);
    }
    return null;
  }
  // Grams of copper(II) sulfate (anhydrous basis) that come out of solution at T.
  function crystalsAt(grams, water, T) { return Math.max(0, grams - solubility(T) * water / 100); }

  const CRYSTAL = {
    solute: 'copper(II) sulfate', formula: 'CuSO₄', hydrate: 'CuSO₄·5H₂O',
    grams: 9,            // g dissolved (anhydrous basis)
    water: 60,           // cm³ of water to start with
    color: '#2A7FD4',
    heatRate: 20,        // °C per second
    boils: 100,
    evap: 1.5,           // cm³ of water per second while it boils
    dry: 1,              // cm³ - below this, the basin is dry
    coolSlow: 7,         // °C per second, time-lapse ("leave it on the windowsill")
    coolFast: 30,        // °C per second (the basin stood in cold water)
    rodMinT: 60,         // °C - the glass-rod test only means something on a hot solution
  };
  // Water left when a drop on a glass rod first crystallises as it cools to room
  // temperature: the CRYSTALLISATION POINT. 9 g needs 22.65 g/100 g at 25 °C → 39.7 cm³.
  const crystalPoint = () => CRYSTAL.grams * 100 / solubility(ROOM);
  // Water left when even the BOILING solution is saturated: a crust forms and it spits.
  const crustPoint = () => CRYSTAL.grams * 100 / solubility(CRYSTAL.boils);

  // ══ Sublimation ══════════════════════════════
  const SUBLIME_MIXES = {
    iodine: { name: 'Iodine and sand', short: 'iodine', solid: 'iodine', grams: 2, rate: 0.25, onset: 1.5,
              solidColor: '#3A3446', vapourColor: '#8E44AD', deposit: '#4A3F5C', other: 'sand', otherColor: '#D8C08A',
              heat: 'Heat gently', meta: 'Grey-black iodine mixed with sand',
              vapour: 'violet iodine vapour', sublimate: 'shiny grey-black crystals of iodine',
              fumes: 'Violet iodine vapour spread out of the dish into the room.' },
    nh4cl:  { name: 'Ammonium chloride and salt', short: 'ammonium chloride', solid: 'ammonium chloride', grams: 2, rate: 0.2, onset: 2.5,
              solidColor: '#F2F2EE', vapourColor: '#E9EDF0', deposit: '#FFFFFF', other: 'salt', otherColor: '#E1E6EA',
              heat: 'Heat', meta: 'White ammonium chloride mixed with salt',
              vapour: 'white fumes', sublimate: 'a white solid of ammonium chloride',
              fumes: 'White fumes of ammonia and hydrogen chloride spread out of the dish into the room.' },
  };
  const SUB_PARTS = {
    mixture: { name: 'Mixture in an evaporating dish', icon: '🥣', hint: 'What will you separate?',
               options: { iodine: 'Iodine + sand', nh4cl: 'Ammonium chloride + salt' }, ok: ['iodine', 'nh4cl'] },
    place:   { name: 'Where to work', icon: '🏠', hint: 'The vapour is harmful.',
               options: { hood: 'Fume cupboard', bench: 'Open bench' }, ok: ['hood'], wrong: { bench: 'fumes' } },
    cover:   { name: 'Over the dish', icon: '🔻', hint: 'How will you catch the vapour?',
               options: { funnel_plug: 'Funnel + cotton wool plug', funnel: 'Funnel only', none: 'Nothing' },
               ok: ['funnel_plug'], wrong: { funnel: 'no_plug', none: 'no_funnel' } },
  };
  const SUB_ORDER = ['mixture', 'place', 'cover'];
  const SUB = { cardAfter: 3 };   // s of subliming before "vapour escaping" cards
  function checkSublime(parts) {
    const p = parts || {};
    const missing = SUB_ORDER.filter(k => !p[k]);
    const errors = [];
    SUB_ORDER.forEach(k => { const w = SUB_PARTS[k].wrong && SUB_PARTS[k].wrong[p[k]]; if (w) errors.push(w); });
    return { missing, errors, ok: !missing.length && !errors.length };
  }
  // Fraction of the vapour caught as sublimate for each cover.
  const CATCH = { funnel_plug: 1, funnel: 0.55, none: 0 };

  // ══ Which technique? ═════════════════════════
  const TECHNIQUES = {
    distillation:    { name: 'Distillation',    icon: '⚗️', gets: 'the LIQUID (the solvent)', grade: 9 },
    crystallisation: { name: 'Crystallisation', icon: '💎', gets: 'the dissolved SOLID, as crystals', grade: 9 },
    sublimation:     { name: 'Sublimation',     icon: '🟣', gets: 'the solid that sublimes', grade: 9 },
    filtration:      { name: 'Filtration',      icon: '🧻', gets: 'an insoluble solid (you met it in Grade 8)', grade: 8 },
  };
  const PRINCIPLES = {
    bp:         'The liquid boils off at its boiling point and is condensed; the dissolved solid has a far higher boiling point, so it stays behind.',
    solubility: 'The solid is less soluble in cold water than in hot, so crystals form as a hot saturated solution cools.',
    sublimes:   'One solid turns straight into a gas when heated and back into a solid on a cold surface; the other does not.',
    insoluble:  'The solid does not dissolve, so its particles are too big to pass through the filter paper.',
  };
  const TECH_PRINCIPLE = { distillation: 'bp', crystallisation: 'solubility', sublimation: 'sublimes', filtration: 'insoluble' };

  // Every wrong choice says what would really happen.
  const MIXTURES = [
    { id: 'sea_water', name: 'Sea water', want: 'pure water to drink', tech: 'distillation', look: { liquid: '#BFD9E2' },
      wrong: {
        crystallisation: 'Crystallisation keeps the salt and lets the water escape into the air - but it is the WATER you want.',
        sublimation: 'Neither salt nor water sublimes, so there is nothing to catch on a cold surface.',
        filtration: 'The salt is dissolved, so it passes straight through the filter paper. You would still have salty water.' } },
    { id: 'ink', name: 'Ink', want: 'the water it is made with', tech: 'distillation', look: { liquid: '#3346A8' },
      wrong: {
        crystallisation: 'That would keep the dye and lose the water to the air - the opposite of what you want.',
        sublimation: 'Ink is a liquid; nothing in it sublimes.',
        filtration: 'The dye is dissolved: it runs through the filter paper with the water, which stays inky.' } },
    { id: 'cuso4', name: 'Copper(II) sulfate solution', want: 'crystals of copper(II) sulfate', tech: 'crystallisation', look: { liquid: '#2A7FD4' },
      wrong: {
        distillation: 'Distillation would give you the water and leave the copper(II) sulfate baked onto the flask - not the crystals you want.',
        sublimation: 'Copper(II) sulfate does not sublime. Heated strongly it loses its water and turns into a white powder.',
        filtration: 'The copper(II) sulfate is dissolved, so it goes straight through the filter paper with the water.' } },
    { id: 'iodine_sand', name: 'Iodine and sand', want: 'pure iodine', tech: 'sublimation', look: { solid: '#3A3446', other: '#D8C08A' },
      wrong: {
        distillation: 'There is no liquid to boil off - these are two solids.',
        crystallisation: 'Iodine barely dissolves in water, so there is no solution to crystallise from.',
        filtration: 'Filtration needs a liquid to carry one solid through the paper. Iodine sublimes; sand does not - use that.' } },
    { id: 'nh4cl_salt', name: 'Ammonium chloride and salt', want: 'the two solids apart', tech: 'sublimation', look: { solid: '#F2F2EE', other: '#E1E6EA' },
      wrong: {
        distillation: 'Neither solid is a liquid you could boil off and condense.',
        crystallisation: 'Both solids dissolve in water, so crystallising the solution would give you the two mixed up again.',
        filtration: 'Both dissolve in water, so both would pass through the paper together.' } },
    { id: 'sand_water', name: 'Sand and water', want: 'the sand', tech: 'filtration', look: { liquid: '#C9DFE8', other: '#D8C08A' },
      wrong: {
        distillation: 'You would get the sand back in the end, but boiling away all that water just to recover sand wastes time and energy. Sand does not dissolve - a filter paper catches it in a minute.',
        crystallisation: 'Sand does not dissolve, so there is no dissolved solid to crystallise.',
        sublimation: 'Neither sand nor water sublimes.' } },
  ];

  // ── Discoveries ─────────────────────────────
  // `how` is written in the guide vocabulary (see GUIDES below) and "Show me how"
  // runs it as a guide. scripts/test-labs-separation.js follows every `how` from a
  // clean bench and fails if it does not unlock its own card.
  const G = 'goggles', MD = 'mode:distil', MC = 'mode:crystal', MS = 'mode:sublime', MK = 'mode:choose', HEAT = 'heat';
  const DISCOVERIES = [
    { id: 'd_sea', icon: '💧', title: 'Pure water from sea water', hint: 'Distil sea water',
      how: [MD, 'build:correct', G, HEAT, 'wait:distillate'],
      saw: 'The sea water boiled, steam went along the side arm into the condenser, and clear drops of distillate ran into the conical flask. The salt stayed in the flask.',
      learn: 'Distillation: water boils at 100 °C, but salt only boils at 1413 °C. So only the water leaves as vapour; the cold condenser turns it back into liquid - pure water, the distillate.' },
    { id: 'd_ink', icon: '🖋️', title: 'Clear water from ink', hint: 'Distil inky water',
      how: [MD, 'build:ink', G, HEAT, 'wait:distillate'],
      saw: 'Dark blue ink boiled in the flask, but the distillate dripping into the conical flask was clear and colourless. The dye stayed behind and the ink got darker.',
      learn: 'The dye in ink does not boil at 100 °C, so it cannot travel with the steam. Distillation gets the SOLVENT back from any solution.' },
    { id: 'd_100', icon: '🌡️', title: 'Steady at 100 °C', hint: 'Watch the thermometer while water distils',
      how: [MD, 'build:correct', G, HEAT, 'wait:100'],
      saw: 'The thermometer stayed at room temperature until the steam reached it, then climbed to 100 °C and stayed there while the water distilled.',
      learn: 'With its bulb level with the side arm, the thermometer sits in the vapour going over. A steady 100 °C tells you the liquid distilling is pure water.' },
    { id: 'd_residue', icon: '🔍', title: 'No residue', hint: 'Test a drop of your distillate',
      how: [MD, 'build:correct', G, HEAT, 'wait:distillate', 'drop'],
      saw: 'A drop of distillate evaporated on a watch glass and left nothing behind. A drop of the sea water left a ring of white salt crystals.',
      learn: 'A dissolved solid is left behind when water evaporates. No residue means nothing was dissolved in the distillate: it is pure water.' },
    { id: 'm_water_top', icon: '🔄', title: 'Water in at the top', hint: 'Plumb the condenser the wrong way round',
      how: [MD, 'build:water_top', G, HEAT, 'card:water_top'],
      saw: 'The water ran straight out of the lower outlet, so the condenser jacket never filled. Steam went straight through and puffed out of the end.',
      learn: 'Cold water must go IN at the BOTTOM of the condenser and OUT at the TOP, so the jacket stays full and cools the vapour all the way along.' },
    { id: 'm_thermo', icon: '📍', title: 'Bulb in the wrong place', hint: 'Put the thermometer bulb in the liquid',
      how: [MD, 'build:thermo_liquid', G, HEAT, 'card:thermo_liquid'],
      saw: 'The thermometer read the temperature of the boiling salty water - above 100 °C and still rising - not the temperature of the vapour going to the condenser.',
      learn: 'The bulb goes level with the side arm, in the vapour. That is the temperature at which the substance you are collecting boils.' },
    { id: 'm_bump', icon: '💥', title: 'Bumping', hint: 'Heat the flask with no granules in it',
      how: [MD, 'build:no_granules', G, HEAT, 'card:bumping'],
      saw: 'The liquid got hotter than its boiling point without bubbling, then boiled all at once in a violent surge that spat hot water out of the flask.',
      learn: 'Anti-bumping granules give bubbles rough places to form, so the liquid boils smoothly. Add them BEFORE heating, never to a hot liquid.' },
    { id: 'm_sealed', icon: '🧨', title: 'Never heat a closed system', hint: 'Seal the receiver with a bung, then heat',
      how: [MD, 'build:sealed', G, HEAT, 'card:sealed'],
      saw: 'With the receiver sealed, the steam had nowhere to go. The pressure rose until the glassware blew apart.',
      learn: '1 cm³ of water makes about 1700 cm³ of steam. A distillation rig must always be open to the air at the receiver end.' },
    { id: 'c_rod', icon: '🥢', title: 'The crystallisation point', hint: 'Test the hot solution with a glass rod',
      how: [MC, G, HEAT, 'rod'],
      saw: 'A drop of the hot solution on the glass rod grew tiny blue crystals as it cooled in the air.',
      learn: 'When a drop crystallises on a cool rod, the solution is saturated enough to crystallise as it cools. That is the moment to stop heating.' },
    { id: 'c_big', icon: '💎', title: 'Big blue crystals', hint: 'Cool the saturated solution slowly',
      how: [MC, G, HEAT, 'rod', 'heat-off', 'cool:slow', 'wait:crystals'],
      saw: 'As the solution slowly cooled, a few large, well-shaped blue crystals of copper(II) sulfate grew in the basin.',
      learn: 'Copper(II) sulfate is much less soluble in cold water (about 23 g per 100 g at 25 °C) than in hot (about 75 g at 100 °C). As it cools, the extra comes out as crystals - slowly cooled, they grow big.' },
    { id: 'c_small', icon: '✨', title: 'Tiny crystals', hint: 'Cool the saturated solution quickly',
      how: [MC, G, HEAT, 'rod', 'heat-off', 'cool:fast', 'wait:crystals'],
      saw: 'Cooled quickly in cold water, the solution filled with lots of tiny blue crystals.',
      learn: 'Fast cooling starts many crystals at once, so none of them has time to grow. For big crystals, cool slowly.' },
    { id: 'm_dry', icon: '⚪', title: 'Heated to dryness', hint: 'Keep heating the solution until it is dry',
      how: [MC, G, HEAT, 'card:dryness'],
      saw: 'As the last water went, the solid spat out of the basin, and the blue crystals turned into a white powder.',
      learn: 'Blue copper(II) sulfate crystals contain water of crystallisation. Heating to dryness drives it off, leaving white powder - so stop at the crystallisation point and let it cool.' },
    { id: 'm_early', icon: '🫙', title: 'Stopped too soon', hint: 'Cool the solution before it is saturated',
      how: [MC, G, HEAT, 'heat-off', 'cool:slow', 'card:too_early'],
      saw: 'The solution cooled right down to room temperature and not a single crystal formed.',
      learn: 'At room temperature that much water could still hold all the copper(II) sulfate. Evaporate until the glass-rod test works, then cool.' },
    { id: 's_iodine', icon: '🟣', title: 'Iodine sublimes', hint: 'Heat iodine and sand under a funnel',
      how: [MS, 'part:mixture:iodine', 'part:place:hood', 'part:cover:funnel_plug', G, HEAT, 'wait:sublimate'],
      saw: 'Violet vapour rose from the dish and shiny grey-black crystals formed on the cool inside of the funnel. The sand stayed in the dish.',
      learn: 'Iodine sublimes: it turns straight from solid to gas, and back to solid on a cold surface (the sublimate). Sand does not, so the two separate.' },
    { id: 's_nh4cl', icon: '🤍', title: 'Ammonium chloride sublimes', hint: 'Heat ammonium chloride and salt under a funnel',
      how: [MS, 'part:mixture:nh4cl', 'part:place:hood', 'part:cover:funnel_plug', G, HEAT, 'wait:sublimate'],
      saw: 'White fumes rose and a white solid formed on the cool funnel. The salt stayed in the dish.',
      learn: 'Ammonium chloride sublimes on heating and salt does not, so sublimation separates them. (Strictly, it splits into two gases that re-join on the cold surface - beyond the NCE syllabus.)' },
    { id: 'm_fumes', icon: '😷', title: 'Fumes in the lab', hint: 'Heat iodine on the open bench',
      how: [MS, 'part:mixture:iodine', 'part:place:bench', 'part:cover:funnel_plug', G, HEAT, 'card:fumes'],
      saw: 'Violet iodine vapour escaped into the room.',
      learn: 'Iodine vapour is harmful and irritates the eyes, nose and lungs. Heat it only in a fume cupboard.' },
    { id: 'm_nofunnel', icon: '🌫️', title: 'Nothing to catch it', hint: 'Heat iodine with nothing over the dish',
      how: [MS, 'part:mixture:iodine', 'part:place:hood', 'part:cover:none', G, HEAT, 'card:no_funnel'],
      saw: 'The vapour rose straight up and away; nothing re-formed as a solid.',
      learn: 'Sublimation needs a cold surface above the dish - an inverted funnel - for the vapour to turn back into a solid on.' },
    { id: 'm_plug', icon: '☁️', title: 'The missing plug', hint: 'Use a funnel with no cotton wool plug',
      how: [MS, 'part:mixture:iodine', 'part:place:hood', 'part:cover:funnel', G, HEAT, 'card:no_plug'],
      saw: 'Some iodine re-formed on the funnel, but a violet stream escaped out of the open stem.',
      learn: 'A cotton wool plug in the stem of the funnel stops the vapour escaping (Chemistry 2024 Q2(b)(ii)).' },
    { id: 'ch_right', icon: '🎯', title: 'Right technique, right reason', hint: 'Choose a technique for sea water',
      how: [MK, 'choose:sea_water'],
      saw: 'Sea water → distillation, because water boils at 100 °C and salt does not.',
      learn: 'To choose a technique, ask two things: what do I want to keep, and how are the two substances different (boiling point, solubility, subliming, dissolving at all)?' },
    { id: 'ch_all', icon: '🏅', title: 'Sorting expert', hint: 'Choose the right technique for every mixture',
      how: [MK, 'choose:sea_water', 'choose:ink', 'choose:cuso4', 'choose:iodine_sand', 'choose:nh4cl_salt', 'choose:sand_water'],
      saw: 'Every mixture sorted: distillation for sea water and ink, crystallisation for copper(II) sulfate, sublimation for iodine and for ammonium chloride, filtration for sand.',
      learn: 'Distillation keeps the liquid; crystallisation keeps the dissolved solid; sublimation separates a solid that sublimes; filtration catches an insoluble solid.' },
  ];

  // ── Hazards: the mistakes that stop the experiment ───
  const HAZARDS = {
    no_goggles: {
      signs: ['hot'], fx: 'spit',
      title: () => 'Stop - protect your eyes',
      happened: c => `You lit the burner under ${c.what} without safety goggles. As it heated, hot liquid spat out towards your face.`,
      why: 'Heated liquids spit and boil over, and glass can crack when it is heated. A drop of boiling liquid in the eye can blind.',
      instead: 'Put on safety goggles before you heat anything, and keep them on until the apparatus has cooled. Tap 🥽 at the top.',
      exam: 'Safety precautions are asked on almost every paper (Chemistry 2021 Q5(c)(ii), 2022 Q5(a)(ii), 2025 Q3(b)(iii)): “Wear safety goggles when heating.”',
    },
    bumping: {
      signs: ['hot'], fx: 'bump', card: 'bumping',
      title: () => 'Bumping - the flask boiled over violently',
      happened: () => 'With no anti-bumping granules, the liquid heated past its boiling point without bubbling - then boiled all at once. It surged up the neck and spat scalding water out of the flask.',
      why: 'Boiling water causes serious burns, and the jolt can crack the flask and let the whole lot out.',
      instead: 'Put a few anti-bumping granules (boiling chips) in the flask BEFORE heating. They give bubbles a place to form, so it boils smoothly. Never add them to a liquid that is already hot - let it cool first.',
      exam: 'Chemistry 2025 Q5(b)(iv) asks why boiling chips are added: to make the liquid boil smoothly and stop bumping.',
    },
    sealed: {
      signs: ['pressure'], fx: 'burst', card: 'sealed', reset: true,
      title: () => 'Explosion risk - the apparatus was sealed',
      happened: () => 'The conical flask was sealed with a bung, so the whole rig was closed. Steam kept being made with nowhere to go, the pressure rose, and the glassware blew apart.',
      why: `1 cm³ of water turns into about ${STEAM_PER_CM3} cm³ of steam. In a closed apparatus that pressure keeps building until the glass shatters and throws sharp pieces and scalding steam.`,
      instead: 'Never heat a closed system. The receiver end of a distillation rig must be open to the air - no bung in the conical flask.',
      exam: 'Chemistry 2025 Q5(b)(iii) asks for two errors in a distillation rig. A sealed apparatus is one to look for - with the thermometer bulb and the condenser water.',
    },
    fumes: {
      signs: ['irritant'], fx: 'haze', card: 'fumes',
      title: c => `Harmful fumes - ${c.solid} heated on the open bench`,
      happened: c => `${c.fumes} Everyone nearby breathed it in.`,
      why: 'Iodine vapour - and the ammonia and hydrogen chloride from ammonium chloride - irritate the eyes, nose, throat and lungs, and are harmful if breathed in.',
      instead: 'Heat a subliming solid only in a fume cupboard, gently, with an inverted funnel over the dish and a cotton wool plug in its stem.',
      exam: 'Chemistry 2024 Q2(b)(ii): the precaution to stop the vapour escaping during sublimation - cover the dish with an inverted funnel and plug its stem with cotton wool.',
    },
  };

  // ── Wrong-but-safe: what went wrong ───
  const RESULTS = {
    water_top: { icon: '🔄', title: 'The condenser never filled',
      happened: () => 'The cold water went in at the top and ran straight out of the lower outlet, so the jacket held only a trickle. Most of the steam passed through the hot inner tube without condensing and puffed out of the end - hardly any distillate collected.',
      instead: 'Connect the cold water IN at the BOTTOM of the condenser and OUT at the TOP. The jacket then stays completely full, and the coldest water meets the vapour just before it leaves.',
      exam: 'Chemistry 2022 Q3(b): draw an arrow to show where water enters the condenser - at the LOWER end, nearer the receiver.' },
    thermo_liquid: { icon: '📍', title: 'The thermometer read the wrong thing',
      happened: c => c.elev
        ? `The bulb was down in the flask, so it read ${c.reading} °C - the boiling salty water, which is above 100 °C and keeps rising as the salt gets more concentrated. It did not tell you the temperature of the vapour going over, which is pure water at 100 °C.`
        : `The bulb was down in the flask, so it read the boiling LIQUID (${c.reading} °C - only close to 100 °C because inky water is nearly pure water). It did not measure the vapour going over into the condenser, which is what the reading is for.`,
      instead: 'Put the thermometer bulb level with the side arm (the opening to the condenser). There it sits in the vapour and reads the boiling point of what is distilling: 100 °C for water.',
      exam: 'A thermometer bulb dipping into the liquid is a classic error in “spot the errors in this distillation rig” (Chemistry 2025 Q5(b)(iii)).' },
    dryness: { icon: '⚪', title: 'Heated to dryness',
      happened: () => 'You kept heating until the water had gone. The last of it spat hot solid out of the basin, and the blue crystals lost their water of crystallisation and turned into a white powder (anhydrous copper(II) sulfate).',
      instead: 'Heat only until the crystallisation point - when a drop on a glass rod forms crystals as it cools. Then turn the heat off and let the solution cool slowly.',
      exam: 'Crystallisation: evaporate to the crystallisation point, not to dryness, then leave to cool so crystals form.' },
    too_early: { icon: '🫙', title: 'No crystals - you stopped too soon',
      happened: c => `You stopped heating with ${c.water} cm³ of water still in the basin. Even at room temperature (${ROOM} °C) that much water can hold all ${CRYSTAL.grams} g of copper(II) sulfate, so nothing crystallised.`,
      instead: 'Keep heating and test with a glass rod every so often. When crystals form on the rod as it cools, stop heating - then leave it to cool.',
      exam: 'The principle of crystallisation: a solid is less soluble in cold water, so a HOT SATURATED solution forms crystals as it cools.' },
    no_funnel: { icon: '🌫️', title: 'Nothing was collected',
      happened: c => `With nothing over the dish, the ${c.vapour} rose straight up the fume cupboard and was lost. Nothing re-formed as a solid.`,
      instead: 'Cover the dish with an inverted funnel. Its cool inside is where the vapour turns back into a solid - the sublimate. Plug the stem with cotton wool.',
      exam: 'Chemistry 2024 Q2(b)(i) labels this rig from a word bank: evaporating dish, Bunsen burner, tripod, sublimate (“beaker” is the extra word).' },
    no_plug: { icon: '☁️', title: 'Vapour escaped up the stem',
      happened: c => `Some ${c.solid} re-formed on the funnel, but a stream of ${c.vapour} escaped out of the open stem, so part of it was lost.`,
      instead: 'Push a cotton wool plug into the stem of the funnel so the vapour cannot escape.',
      exam: 'Chemistry 2024 Q2(b)(ii): “What precaution needs to be taken during sublimation to prevent vapours from escaping?” - an inverted funnel with a cotton wool plug.' },
    wrong_tech: { icon: '🧰', title: 'Not the right technique',
      happened: c => c.why,
      instead: c => `Use ${TECHNIQUES[c.right].name.toLowerCase()}: ${PRINCIPLES[TECH_PRINCIPLE[c.right]]}`,
      exam: 'Chemistry 2024 Q2(a): choose the technique used to obtain (i) water from sea water - distillation; (ii) iodine from iodine and sand - sublimation.' },
  };

  // Which discovery each hazard or result card unlocks when it is shown.
  const CARD_DISC = {
    bumping: 'm_bump', sealed: 'm_sealed', fumes: 'm_fumes',
    water_top: 'm_water_top', thermo_liquid: 'm_thermo', dryness: 'm_dry', too_early: 'm_early',
    no_funnel: 'm_nofunnel', no_plug: 'm_plug',
  };

  const FACTS = [
    'The salt pans at Tamarin make sea salt by letting the Sun evaporate sea water - crystallisation on a huge scale.',
    'Rum is made in Mauritius by distilling fermented sugar-cane juice or molasses.',
    `1 cm³ of water turns into about ${STEAM_PER_CM3} cm³ of steam. That is why a sealed flask being heated can explode.`,
    'Salt only boils at 1413 °C - that is why it stays behind when sea water is distilled.',
    'Pure water boils at 100 °C at sea level. High on a mountain, where the air pressure is lower, it boils at a lower temperature.',
    'Iodine is a shiny grey-black solid, but its vapour is a beautiful violet colour.',
    'Dry ice (solid carbon dioxide) sublimes at about -78 °C - it turns straight into a gas without melting.',
    'Mothballs slowly sublime. That is why they shrink in a wardrobe without leaving a puddle.',
    'Anti-bumping granules are small pieces of porous pot or glass. Their rough surface gives bubbles a place to form.',
    'Blue copper(II) sulfate crystals contain water of crystallisation. Heat it away and a white powder is left.',
    'The slower a solution cools, the bigger its crystals grow.',
    'Crude oil is separated into petrol, diesel and more by fractional distillation - the same idea on a giant scale.',
    'Many perfumes use essential oils taken from plants by steam distillation.',
    'The Liebig condenser is named after the German chemist Justus von Liebig, who made it popular in the 1800s.',
  ];

  // ── Missions ──
  // A question's FIRST option is the answer; the quiz shuffles them.
  const MISSIONS = [
    {
      id: 'seawater', icon: '🌊', title: 'Pure water from sea water', mode: 'distil',
      blurb: 'Build a distillation rig piece by piece and collect 25 cm³ of pure water.',
      intro: 'Pure water from sea water! Build the distillation rig from the shelf - every part in the right place - then goggles on and heat until 25 cm³ of distillate has collected.',
      quiz: [
        { q: 'Label the rig. Word bank: round-bottom flask · thermometer · condenser · conical flask. Which word goes on the part where the steam turns back into liquid water?',
          options: ['Condenser', 'Round-bottom flask', 'Thermometer', 'Conical flask'],
          why: 'The condenser is the long tube with cold water flowing round it. It cools the vapour back into a liquid.' },
        { q: 'Using the same word bank, which word labels the vessel that collects the distillate?',
          options: ['Conical flask', 'Round-bottom flask', 'Condenser', 'Thermometer'],
          why: 'The distillate drips out of the end of the condenser into the conical flask (the receiver).' },
        { q: 'Where should the cooling water ENTER the condenser?',
          options: ['At the lower end, nearer the receiver', 'At the upper end, nearer the flask', 'Either end - it makes no difference', 'Through the side arm of the flask'],
          why: 'In at the bottom, out at the top keeps the jacket full of cold water. Chemistry 2022 Q3(b) asks you to draw this arrow.' },
        { q: 'Where should the bulb of the thermometer be?',
          options: ['Level with the side arm', 'Down in the boiling liquid', 'Touching the bottom of the flask', 'Inside the conical flask'],
          why: 'At the side arm the bulb is in the vapour going to the condenser, so it reads the boiling point of what is distilling.' },
        { q: 'Why does the salt stay behind in the flask?',
          options: ['Its boiling point is far higher than 100 °C', 'It is too heavy for the steam to carry', 'It reacts with the glass of the flask', 'It dissolves in the cold condenser water'],
          why: 'Salt boils at 1413 °C. At 100 °C only the water turns to vapour.' },
        { q: 'A pupil’s rig has two errors: the conical flask is sealed with a bung, and the water enters the condenser at the top. Which corrections are right?',
          options: ['Remove the bung; connect the water in at the bottom', 'Add a second bung; connect the water in at the bottom', 'Remove the bung; turn the cooling water off', 'Add more granules; heat the flask more strongly'],
          why: 'A heated rig must be open at the receiver end, and the cooling water goes in at the bottom. Chemistry 2025 Q5(b)(iii) asks for two errors like these.' },
        { q: 'Why are anti-bumping granules added to the flask?',
          options: ['So the liquid boils smoothly', 'So the liquid boils at a lower temperature', 'So the salt dissolves faster', 'So the distillate comes out colourless'],
          why: 'They give bubbles a place to form, stopping sudden violent boiling (bumping). Chemistry 2025 Q5(b)(iv).' },
      ],
    },
    {
      id: 'crystals', icon: '💎', title: 'Grow crystals', mode: 'crystal',
      blurb: 'Evaporate copper(II) sulfate solution to the crystallisation point, then grow big crystals.',
      intro: 'Grow crystals! Goggles on, heat the copper(II) sulfate solution, test it with the glass rod - then turn the heat off at the right moment and cool it slowly for big crystals.',
      quiz: [
        { q: 'How do you know the solution has reached its crystallisation point?',
          options: ['Crystals form on a glass rod dipped in it and taken out', 'The solution turns colourless', 'The solution starts to boil', 'All of the water has evaporated'],
          why: 'A drop on the cool rod crystallises only once the solution is saturated enough.' },
        { q: 'Why do crystals form as the hot solution cools?',
          options: ['The solid is less soluble in cold water than in hot', 'Cold water reacts with the solid', 'Cooling makes more water evaporate', 'The solid is more soluble in cold water'],
          why: 'About 75 g dissolves in 100 g of water at 100 °C but only about 23 g at 25 °C. The rest comes out as crystals.' },
        { q: 'Why should you NOT heat the solution to dryness?',
          options: ['It spits, and the crystals lose their water and become a powder', 'It makes the crystals grow bigger', 'It makes the solution more dilute', 'It turns the copper(II) sulfate into a gas'],
          why: 'Heating to dryness spits hot solid and drives off the water of crystallisation - blue crystals turn into white powder.' },
        { q: 'How do you get LARGE crystals?',
          options: ['Let the saturated solution cool slowly', 'Cool it quickly in ice-cold water', 'Keep stirring it hard while it cools', 'Heat it to dryness as fast as possible'],
          why: 'Slow cooling lets a few crystals grow big. Fast cooling makes many tiny ones.' },
        { q: 'Which piece of apparatus holds the solution while it is heated?',
          options: ['Evaporating basin', 'Conical flask', 'Liebig condenser', 'Measuring cylinder'],
          why: 'A wide, shallow evaporating basin on a tripod and gauze lets the water evaporate quickly.' },
        { q: 'Crystallisation is the best technique to obtain…',
          options: ['Copper(II) sulfate crystals from its solution', 'Pure water from sea water', 'Iodine from iodine and sand', 'Sand from sand and water'],
          why: 'Crystallisation recovers a DISSOLVED solid. Water from sea water needs distillation; iodine needs sublimation; sand needs filtration.' },
      ],
    },
    {
      id: 'sorter', icon: '🤔', title: 'Choose the technique', mode: 'choose',
      blurb: 'Six mixtures. Pick the right technique for each - and the reason it works.',
      intro: 'Choose the technique! For each mixture, pick the technique that gets you what you want - then the principle it uses.',
      quiz: [
        { q: 'Which technique is used to obtain water from sea water?',
          options: ['Distillation', 'Crystallisation', 'Sublimation', 'Filtration'],
          why: 'The water boils off and is condensed; the salt stays behind. Chemistry 2024 Q2(a)(i).' },
        { q: 'Which technique is used to obtain iodine from a mixture of iodine and sand?',
          options: ['Sublimation', 'Distillation', 'Crystallisation', 'Filtration'],
          why: 'Iodine sublimes and sand does not. Chemistry 2024 Q2(a)(ii).' },
        { q: 'What is sublimation?',
          options: ['A solid turning straight into a gas without melting', 'A liquid turning into a gas', 'A gas turning into a liquid', 'A solid dissolving in water'],
          why: 'Solid → gas directly, and gas → solid again on a cold surface.' },
        { q: 'Label the sublimation rig. Word bank: evaporating dish · Bunsen burner · tripod · sublimate · beaker. What is the solid that forms on the cool funnel called?',
          options: ['Sublimate', 'Evaporating dish', 'Tripod', 'Beaker'],
          why: 'The solid that re-forms from the vapour is the sublimate. In Chemistry 2024 Q2(b)(i), “beaker” is the extra word.' },
        { q: 'What precaution stops the vapour escaping during sublimation?',
          options: ['An inverted funnel over the dish, with a cotton wool plug in its stem', 'Heating the mixture as strongly as possible', 'Leaving the dish uncovered', 'Adding water to the mixture first'],
          why: 'The funnel gives a cool surface to catch the vapour and the plug stops it escaping. Chemistry 2024 Q2(b)(ii).' },
        { q: 'What is the principle behind distillation?',
          options: ['The substances have different boiling points', 'One of the solids sublimes', 'Insoluble particles cannot pass through filter paper', 'A solid is less soluble when the solution is cold'],
          why: 'The one with the lower boiling point boils off first and is condensed.' },
      ],
    },
  ];

  // ── Guided experiments ──
  // One action per step. `on` is what completes it:
  //   goggles · mode:<distil|crystal|sublime|choose> · part:<part>:<option> ·
  //   build:<rig> · heat · heat-off · rod (a POSITIVE glass-rod test) ·
  //   cool:<slow|fast> · drop · reset · choose:<mixture> ·
  //   wait:<boil|100|distillate|crystals|sublimate> (watch - no button) ·
  //   card:<id> (a hazard or result card was read and closed - no button).
  // A step with `btn` gets a button in the yellow box that does it; the same
  // control glows on the bench.
  const GUIDES = [
    { id: 'rig', icon: '⚗️', title: 'Build a distillation rig',
      blurb: 'Put it together piece by piece, then turn sea water into pure water.',
      lesson: 'Distillation: the sea water boils, the steam goes along the side arm into the condenser, the cold jacket turns it back into liquid, and pure water (the distillate) drips into the conical flask. The salt stays in the flask. The thermometer at the side arm reads 100 °C - the boiling point of water.',
      steps: [
        { on: 'mode:distil',          say: 'Open the distillation bench.',                                                         btn: '⚗️ Distillation bench' },
        { on: 'part:flask:sea',       say: 'Start with a round-bottom flask of sea water - salty water. You want the water back out of it.', btn: '⚗️ Flask of sea water' },
        { on: 'part:granules:yes',    say: 'Drop in a few anti-bumping granules so it will boil smoothly.',                          btn: '⚪ Add anti-bumping granules' },
        { on: 'part:thermo:arm',      say: 'Fit the thermometer so its bulb is level with the side arm - in the vapour, not the liquid.', btn: '🌡️ Bulb level with the side arm' },
        { on: 'part:condenser:bottom',say: 'Attach the Liebig condenser. Cold water goes IN at the BOTTOM and OUT at the TOP.',        btn: '🧊 Water in at the bottom' },
        { on: 'part:receiver:open',   say: 'Put an open conical flask at the end to catch the distillate. Never seal it.',            btn: '🫙 Open conical flask' },
        { on: 'part:burner:yes',      say: 'Put the Bunsen burner, tripod and gauze under the flask.',                               btn: '🔥 Burner under the flask' },
        { on: 'goggles',              say: 'Safety first: goggles on before you heat anything.',                                     btn: '🥽 Put on goggles' },
        { on: 'heat',                 say: 'Light the burner and heat the flask.',                                                   btn: '🔥 Start heating' },
        { on: 'wait:boil',            say: 'Watch the thermometer and the flask… it is warming up.' },
        { on: 'wait:distillate',      say: 'It is boiling! Follow the steam into the condenser - and watch the drops collect.' },
      ] },
    { id: 'grow', icon: '💎', title: 'Grow copper sulfate crystals',
      blurb: 'Evaporate, find the crystallisation point with a glass rod, then cool.',
      lesson: 'Crystallisation: heating evaporates water until the solution is saturated (the glass-rod test). As it cools, copper(II) sulfate becomes less soluble, so the extra comes out of solution as blue crystals. Cooling slowly gives big crystals.',
      steps: [
        { on: 'mode:crystal', say: 'Open the crystallisation bench: a basin of blue copper(II) sulfate solution on a tripod.', btn: '💎 Crystallisation bench' },
        { on: 'goggles',      say: 'Goggles on - hot solutions spit.',                                           btn: '🥽 Put on goggles' },
        { on: 'heat',         say: 'Heat the solution to evaporate some of the water.',                          btn: '🔥 Start heating' },
        { on: 'rod',          say: 'Every so often, dip a glass rod in and take it out. If crystals form on it as it cools, stop! If not, keep heating and test again.', btn: '🥢 Test with the glass rod' },
        { on: 'heat-off',     say: 'Crystals on the rod: this is the crystallisation point. Turn the heat off NOW - not to dryness.', btn: '🧯 Turn off the heat' },
        { on: 'cool:slow',    say: 'Leave the basin to cool slowly.',                                            btn: '🐢 Leave to cool slowly' },
        { on: 'wait:crystals',say: 'Watch the crystals grow as it cools (time-lapse)…' },
      ] },
    { id: 'iodine', icon: '🟣', title: 'Make iodine sublime',
      blurb: 'Separate iodine from sand without ever melting it.',
      lesson: 'Sublimation: iodine turns straight from solid to vapour when heated, and back to solid on the cool funnel - the sublimate. Sand does not sublime, so it stays in the dish. The fume cupboard and the cotton wool plug keep the harmful vapour in.',
      steps: [
        { on: 'mode:sublime',           say: 'Open the sublimation bench.',                                                    btn: '🟣 Sublimation bench' },
        { on: 'part:mixture:iodine',    say: 'Put the mixture of iodine and sand in an evaporating dish.',                     btn: '🥣 Iodine + sand' },
        { on: 'part:place:hood',        say: 'Iodine vapour is harmful - work in the fume cupboard.',                          btn: '🏠 Fume cupboard' },
        { on: 'part:cover:funnel_plug', say: 'Cover the dish with an inverted funnel, with a cotton wool plug in its stem.',    btn: '🔻 Funnel + cotton wool plug' },
        { on: 'goggles',                say: 'Goggles on.',                                                                    btn: '🥽 Put on goggles' },
        { on: 'heat',                   say: 'Heat the dish gently.',                                                          btn: '🔥 Heat gently' },
        { on: 'wait:sublimate',         say: 'Watch the violet vapour - and the cool funnel above it…' },
      ] },
    { id: 'which', icon: '🤔', title: 'Which technique?',
      blurb: 'Match a mixture to the technique that separates it - and say why.',
      lesson: 'Choose by asking what you want to keep. Want the liquid? Distil. Want a dissolved solid as crystals? Crystallise. Does one solid sublime? Sublime. An insoluble solid in a liquid? Filter.',
      steps: [
        { on: 'mode:choose',      say: 'Open the technique chooser.',                                                        btn: '🤔 Which technique?' },
        { on: 'choose:sea_water', say: 'Sea water - you want pure water. The salt is dissolved, and water boils at 100 °C. Which technique?', btn: '⚗️ Distillation - different boiling points' },
        { on: 'choose:iodine_sand', say: 'Iodine and sand - you want the iodine. One of them sublimes. Which technique?',       btn: '🟣 Sublimation - iodine sublimes' },
      ] },
  ];

  const SIGN_LABELS = { hot: 'Hot surface', pressure: 'Gas under pressure', irritant: 'Harmful' };

  return { ROOM, TIME_LAPSE, POINTS, STEAM_PER_CM3, FLASKS, DISTIL, PARTS, PART_ORDER, ERROR_ORDER, checkRig, RIGS, liquidBoils,
           SOLUBILITY, solubility, saturatedAt, crystalsAt, CRYSTAL, crystalPoint, crustPoint,
           SUBLIME_MIXES, SUB_PARTS, SUB_ORDER, SUB, checkSublime, CATCH,
           TECHNIQUES, PRINCIPLES, TECH_PRINCIPLE, MIXTURES,
           DISCOVERIES, HAZARDS, RESULTS, CARD_DISC, FACTS, MISSIONS, GUIDES, SIGN_LABELS };
})();
if (typeof window !== 'undefined') window.LabSeparationData = LabSeparationData;
