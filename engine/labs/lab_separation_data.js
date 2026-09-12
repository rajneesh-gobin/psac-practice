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
  // the dangerous ones stop it first. An error\'s id is the id of the card it shows.
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
      signs: ['hot', 'goggles'], fx: 'spit',
      title: () => 'Stop - protect your eyes',
      happened: c => `You lit the burner under ${c.what} without safety goggles. As it heated, hot liquid spat out towards your face.`,
      why: 'Heated liquids spit and boil over, and glass can crack when it is heated. A drop of boiling liquid in the eye can blind.',
      instead: 'Put on safety goggles before you heat anything, and keep them on until the apparatus has cooled. Tap 🥽 at the top.',
      exam: g => g >= 9
        ? 'Safety precautions are asked on almost every paper (Chemistry 2021 Q5(c)(ii), 2022 Q5(a)(ii), 2025 Q3(b)(iii)): "Wear safety goggles when heating."'
        : 'In the science exam: you may be asked to name a safety precaution when heating — "wear safety goggles" is always a correct answer.',
    },
    bumping: {
      signs: ['hot'], fx: 'bump', card: 'bumping',
      title: () => 'Bumping - the flask boiled over violently',
      happened: () => 'With no anti-bumping granules, the liquid heated past its boiling point without bubbling - then boiled all at once. It surged up the neck and spat scalding water out of the flask.',
      why: 'Boiling water causes serious burns, and the jolt can crack the flask and let the whole lot out.',
      instead: 'Put a few anti-bumping granules (boiling chips) in the flask BEFORE heating. They give bubbles a place to form, so it boils smoothly. Never add them to a liquid that is already hot - let it cool first.',
      exam: g => g >= 9
        ? 'Chemistry 2025 Q5(b)(iv) asks why boiling chips are added: to make the liquid boil smoothly and stop bumping.'
        : 'In the science exam: you may be asked why anti-bumping granules (boiling chips) are added to the flask before heating.',
    },
    sealed: {
      signs: ['pressure'], fx: 'burst', card: 'sealed', reset: true,
      title: () => 'Explosion risk - the apparatus was sealed',
      happened: () => 'The conical flask was sealed with a bung, so the whole rig was closed. Steam kept being made with nowhere to go, the pressure rose, and the glassware blew apart.',
      why: `1 cm³ of water turns into about ${STEAM_PER_CM3} cm³ of steam. In a closed apparatus that pressure keeps building until the glass shatters and throws sharp pieces and scalding steam.`,
      instead: 'Never heat a closed system. The receiver end of a distillation rig must be open to the air - no bung in the conical flask.',
      exam: g => g >= 9
        ? 'Chemistry 2025 Q5(b)(iii) asks for two errors in a distillation rig. A sealed apparatus is one to look for - with the thermometer bulb and the condenser water.'
        : 'In the science exam: you may be asked to spot errors in a distillation rig — a sealed receiver (bung in the conical flask) is always an error.',
    },
    fumes: {
      signs: ['irritant'], fx: 'haze', card: 'fumes',
      title: c => `Harmful fumes - ${c.solid} heated on the open bench`,
      happened: c => `${c.fumes} Everyone nearby breathed it in.`,
      why: 'Iodine vapour - and the ammonia and hydrogen chloride from ammonium chloride - irritate the eyes, nose, throat and lungs, and are harmful if breathed in.',
      instead: 'Heat a subliming solid only in a fume cupboard, gently, with an inverted funnel over the dish and a cotton wool plug in its stem.',
      exam: g => g >= 9
        ? 'Chemistry 2024 Q2(b)(ii): the precaution to stop the vapour escaping during sublimation - cover the dish with an inverted funnel and plug its stem with cotton wool.'
        : 'In the science exam: you may be asked what precaution prevents vapour from escaping when heating a subliming solid.',
    },
  };

  // ── Wrong-but-safe: what went wrong ───
  const RESULTS = {
    water_top: { icon: '🔄', title: 'The condenser never filled',
      happened: () => 'The cold water went in at the top and ran straight out of the lower outlet, so the jacket held only a trickle. Most of the steam passed through the hot inner tube without condensing and puffed out of the end - hardly any distillate collected.',
      instead: 'Connect the cold water IN at the BOTTOM of the condenser and OUT at the TOP. The jacket then stays completely full, and the coldest water meets the vapour just before it leaves.',
      exam: g => g >= 9
        ? 'Chemistry 2022 Q3(b): draw an arrow to show where water enters the condenser - at the LOWER end, nearer the receiver.'
        : 'In the science exam: you may be asked where the cooling water should enter a condenser — at the lower (bottom) end.' },
    thermo_liquid: { icon: '📍', title: 'The thermometer read the wrong thing',
      happened: c => c.elev
        ? `The bulb was down in the flask, so it read ${c.reading} °C - the boiling salty water, which is above 100 °C and keeps rising as the salt gets more concentrated. It did not tell you the temperature of the vapour going over, which is pure water at 100 °C.`
        : `The bulb was down in the flask, so it read the boiling LIQUID (${c.reading} °C - only close to 100 °C because inky water is nearly pure water). It did not measure the vapour going over into the condenser, which is what the reading is for.`,
      instead: 'Put the thermometer bulb level with the side arm (the opening to the condenser). There it sits in the vapour and reads the boiling point of what is distilling: 100 °C for water.',
      exam: g => g >= 9
        ? 'A thermometer bulb dipping into the liquid is a classic error in "spot the errors in this distillation rig" (Chemistry 2025 Q5(b)(iii)).'
        : 'In the science exam: you may be asked to spot errors in a distillation rig — a thermometer bulb dipping into the liquid instead of sitting in the vapour is a classic mistake.' },
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
      exam: g => g >= 9
        ? 'Chemistry 2024 Q2(b)(i) labels this rig from a word bank: evaporating dish, Bunsen burner, tripod, sublimate ("beaker" is the extra word).'
        : 'In the science exam: you may be asked to identify the equipment needed for sublimation — an inverted funnel over the dish, with a cotton wool plug in its stem.' },
    no_plug: { icon: '☁️', title: 'Vapour escaped up the stem',
      happened: c => `Some ${c.solid} re-formed on the funnel, but a stream of ${c.vapour} escaped out of the open stem, so part of it was lost.`,
      instead: 'Push a cotton wool plug into the stem of the funnel so the vapour cannot escape.',
      exam: g => g >= 9
        ? 'Chemistry 2024 Q2(b)(ii): "What precaution needs to be taken during sublimation to prevent vapours from escaping?" - an inverted funnel with a cotton wool plug.'
        : 'In the science exam: you may be asked what precaution stops vapour from escaping during sublimation — a cotton wool plug in the stem of the funnel.' },
    wrong_tech: { icon: '🧰', title: 'Not the right technique',
      happened: c => c.why,
      instead: c => `Use ${TECHNIQUES[c.right].name.toLowerCase()}: ${PRINCIPLES[TECH_PRINCIPLE[c.right]]}`,
      exam: g => g >= 9
        ? 'Chemistry 2024 Q2(a): choose the technique used to obtain (i) water from sea water - distillation; (ii) iodine from iodine and sand - sublimation.'
        : 'In the science exam: you may be asked to choose the correct separation technique for a given mixture.' },
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
  // A question\'s FIRST option is the answer; the quiz shuffles them.
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
        { q: 'A pupil\'s rig has two errors: the conical flask is sealed with a bung, and the water enters the condenser at the top. Which corrections are right?',
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
          why: 'The solid that re-forms from the vapour is the sublimate. In Chemistry 2024 Q2(b)(i), "beaker" is the extra word.' },
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
        { on: 'mode:distil',          say: 'Tap ⚗️ Distillation bench to open it.' },
        { on: 'part:flask:sea',       say: 'Tap ⚗️ Flask of sea water — salty water you want to purify.' },
        { on: 'part:granules:yes',    say: 'Tap ⚪ Add anti-bumping granules so it boils smoothly.' },
        { on: 'part:thermo:arm',      say: 'Tap 🌡️ Bulb level with the side arm — in the vapour, not the liquid.' },
        { on: 'part:condenser:bottom',say: 'Tap 🧊 Water in at the bottom — cold water must flow in at the bottom.' },
        { on: 'part:receiver:open',   say: 'Tap 🫙 Open conical flask — never seal the receiver end.' },
        { on: 'part:burner:yes',      say: 'Tap 🔥 Burner under the flask — heat goes under the round-bottom flask.' },
        { on: 'goggles',              say: 'Tap 🥽 Put on goggles — always wear goggles before heating.' },
        { on: 'heat',                 say: 'Tap 🔥 Start heating to light the burner.' },
        { on: 'wait:boil',            say: 'Watch the thermometer and the flask… it is warming up.' },
        { on: 'wait:distillate',      say: 'It is boiling! Follow the steam into the condenser — watch the drops collect.' },
      ] },
    { id: 'grow', icon: '💎', title: 'Grow copper sulfate crystals',
      blurb: 'Evaporate, find the crystallisation point with a glass rod, then cool.',
      lesson: 'Crystallisation: heating evaporates water until the solution is saturated (the glass-rod test). As it cools, copper(II) sulfate becomes less soluble, so the extra comes out of solution as blue crystals. Cooling slowly gives big crystals.',
      steps: [
        { on: 'mode:crystal', say: 'Tap 💎 Crystallisation bench to open it.' },
        { on: 'goggles',      say: 'Tap 🥽 Put on goggles — hot solutions spit.' },
        { on: 'heat',         say: 'Tap 🔥 Start heating to evaporate some water.' },
        { on: 'rod',          say: 'Tap 🥢 Test with the glass rod — if crystals form on it, stop heating.' },
        { on: 'heat-off',     say: 'Crystals on the rod! Tap 🧯 Turn off the heat — do not heat to dryness.' },
        { on: 'cool:slow',    say: 'Tap 🐢 Leave to cool slowly for large crystals.' },
        { on: 'wait:crystals',say: 'Watch the crystals grow as it cools (time-lapse)…' },
      ] },
    { id: 'iodine', icon: '🟣', title: 'Make iodine sublime',
      blurb: 'Separate iodine from sand without ever melting it.',
      lesson: 'Sublimation: iodine turns straight from solid to vapour when heated, and back to solid on the cool funnel - the sublimate. Sand does not sublime, so it stays in the dish. The fume cupboard and the cotton wool plug keep the harmful vapour in.',
      steps: [
        { on: 'mode:sublime',           say: 'Tap 🟣 Sublimation bench to open it.' },
        { on: 'part:mixture:iodine',    say: 'Tap 🥣 Iodine + sand to put the mixture in the evaporating dish.' },
        { on: 'part:place:hood',        say: 'Tap 🏠 Fume cupboard — iodine vapour is harmful.' },
        { on: 'part:cover:funnel_plug', say: 'Tap 🔻 Funnel + cotton wool plug to cover the dish.' },
        { on: 'goggles',                say: 'Tap 🥽 Put on goggles before heating.' },
        { on: 'heat',                   say: 'Tap 🔥 Heat gently — iodine sublimes at a low temperature.' },
        { on: 'wait:sublimate',         say: 'Watch the violet vapour — and the cool funnel above it…' },
      ] },
    { id: 'which', icon: '🤔', title: 'Which technique?',
      blurb: 'Match a mixture to the technique that separates it - and say why.',
      lesson: 'Choose by asking what you want to keep. Want the liquid? Distil. Want a dissolved solid as crystals? Crystallise. Does one solid sublime? Sublime. An insoluble solid in a liquid? Filter.',
      steps: [
        { on: 'mode:choose',      say: 'Tap 🤔 Which technique? to open the chooser.' },
        { on: 'choose:sea_water', say: 'Tap ⚗️ Distillation — sea water has different boiling points (water vs salt).' },
        { on: 'choose:iodine_sand', say: 'Tap 🟣 Sublimation — iodine sublimes, sand does not.' },
      ] },
  ];

  const SIGN_LABELS = { hot: 'Hot surface', pressure: 'Gas under pressure', irritant: 'Harmful', sharp: 'Sharp - can cut' };

  // ══════════════════════════════════════════════
  //  GRADE LEVELS (LAB_SPEC §9). Everything above this line is the original
  //  Grade 9 level and carries no `grades` tag. Grades 7 and 8 are their own
  //  levels, grounded only in the app\'s own packs:
  //  · Grade 8 - g8s-mixtures "Mixtures & Separation Techniques"
  //    (subjects/grade8-science/_manifest.js: "Separate mixtures by filtration,
  //    decantation and evaporation. Explain the principle behind each
  //    technique."), and its questions g8s-mixtures-001…020, g8s-hd-025…035:
  //    filtrate/residue, a torn filter paper, magnet + iron/sulphur,
  //    chromatography of inks, slow evaporation, decantation, distillation.
  //  · Grade 7 - g7s-elements ("Distinguish between mixtures and compounds";
  //    g7s-elements-016, -018, g7s-hd-106) and g7s-changes (dissolving and
  //    evaporating are physical changes, burning is chemical: g7s-changes-008,
  //    -017, -020, g7s-hd-131, g7s-hd-135), plus g7s-hd-047 (sugar dissolves,
  //    the mass does not change).
  //  Every new guide, mission and discovery id starts g7_ / g8_ so a lower
  //  grade\'s progress never collides with Grade 9\'s.
  // ══════════════════════════════════════════════
  const GRADES = [7, 8, 9];
  const forGrade = (list, g) => list.filter(x => (x.grades || [9]).includes(g));
  const MODES_BY_GRADE = {
    9: ['distil', 'crystal', 'sublime', 'choose'],
    8: ['filter', 'evap', 'chroma', 'choose'],
    7: ['dissolve', 'evap', 'distil', 'choose'],
  };

  // A part table\'s missing parts and the errors its wrong choices cause.
  // Hazards (listed in `first`) come before wrong-but-safe result cards.
  function checkParts(table, order, parts, first) {
    const p = parts || {};
    const missing = order.filter(k => !p[k]);
    const errors = [];
    order.forEach(k => { const w = table[k].wrong && table[k].wrong[p[k]]; if (w) errors.push(w); });
    const rank = e => ((first || []).includes(e) ? 0 : 1);
    errors.sort((a, b) => rank(a) - rank(b));
    return { missing, errors, ok: !missing.length && !errors.length };
  }

  // ══ Grade 8 · Filtration ═════════════════════
  const FIL_MIXES = {
    muddy:    { name: 'Muddy water', residue: 'mud', residueColor: '#7A5A3A', liquid: '#9C8466', filtrate: 'clear water', salty: false },
    sandsalt: { name: 'Sand and salt in water', residue: 'sand', residueColor: '#D8C08A', liquid: '#D6CFB6', filtrate: 'clear, salty water', salty: true },
    salt:     { name: 'Salt water', residue: null, residueColor: null, liquid: '#CFE3EA', filtrate: 'salty water', salty: true },
  };
  const FIL_PARTS = {
    fmix:    { name: 'Mixture to filter', icon: '🥤', hint: '50 cm³ in a beaker. What will you filter?',
               options: { muddy: 'Muddy water', sandsalt: 'Sand + salt in water', salt: 'Salt water' }, ok: ['muddy', 'sandsalt', 'salt'] },
    paper:   { name: 'Filter paper in the funnel', icon: '🧻', hint: 'Fold it into a cone that fits the funnel.',
               options: { cone: 'Folded into a cone', torn: 'A torn paper' }, ok: ['cone'], wrong: { torn: 'g8_torn' } },
    fbeaker: { name: 'Beaker under the funnel', icon: '🫙', hint: 'It catches the filtrate.',
               options: { sound: 'A clean beaker', cracked: 'A cracked beaker' }, ok: ['sound'], wrong: { cracked: 'g8_cracked' } },
    pouring: { name: 'How you pour', icon: '🥢', hint: 'Keep the liquid below the top of the paper.',
               options: { rod: 'Slowly, down a glass rod', fast: 'All at once' }, ok: ['rod'], wrong: { fast: 'g8_overflow' } },
  };
  const FIL_ORDER = ['fmix', 'paper', 'fbeaker', 'pouring'];
  const FILTER = {
    vol: 50,          // cm³ of mixture
    pourRod: 0.2,     // fraction of the beaker poured per second, down a rod
    pourFast: 1.2,    // …tipped in all at once
    flow: 7,          // cm³ per second through the paper
    wet: 2,           // cm³ the wet paper and the residue keep
    cardAt: 0.6,      // fraction poured before a torn paper or an overflow shows
  };
  const checkFilter = parts => checkParts(FIL_PARTS, FIL_ORDER, parts, ['g8_cracked']);

  // ══ Grades 7 and 8 · Evaporation ═════════════
  // Solubility in g per 100 g of water (standard tables): salt (sodium chloride)
  // 36 g at 20 °C and 39 g at 100 °C - it hardly changes, which is why salt is
  // got back by EVAPORATING the water, not by cooling. Sugar (sucrose) about
  // 200 g at 20 °C and 487 g at 100 °C. Sugar melts at about 186 °C and then
  // breaks down: caramel, then black carbon (a chemical change).
  const EVAP_MIXES = {
    salt:     { name: 'Salt water', water: 50, grams: 5, sol: 36, solHot: 39, color: '#CFE3EA', solid: 'salt', crystal: '#FFFFFF' },
    sugarsol: { name: 'Sugar water', water: 50, grams: 10, sol: 200, solHot: 487, color: '#F1E6C2', solid: 'sugar', crystal: '#FFF6DC', chars: true },
    sugar:    { name: 'Dry sugar', water: 0, grams: 10, sol: 200, solHot: 487, color: '#F1E6C2', solid: 'sugar', crystal: '#FFF6DC', chars: true },
  };
  const EVA_PARTS = {
    emix: { name: 'In the evaporating basin', icon: '🥣', hint: 'What will you heat?',
            options: { salt: 'Salt water', sugarsol: 'Sugar water', sugar: 'Dry sugar' }, ok: ['salt', 'sugarsol', 'sugar'],
            optGrades: { salt: [7, 8], sugarsol: [7], sugar: [7] } },
  };
  const EVA_ORDER = ['emix'];
  const EVAP = {
    heatRate: 20,     // °C per second
    boils: 100,
    evap: 2,          // cm³ per second while it boils
    leave: 1,         // cm³ per second left somewhere warm (time-lapse: really a day or two)
    dry: 0.5,         // cm³ - below this the basin is dry
    sugarMelts: 186,  // °C
    charAt: 230,      // °C - by now the sugar has turned black
  };
  // Water left when the first crystals appear at the edge of the BOILING liquid.
  const edgePoint = m => EVAP_MIXES[m].grams * 100 / EVAP_MIXES[m].solHot;

  // ══ Grade 8 · Chromatography ═════════════════
  // `rf`: how far a dye travels compared with the water (the solvent front).
  // A dye that dissolves better in the solvent is carried further.
  const INKS = {
    green: { name: 'Green ink', color: '#2E8B57', dyes: [{ name: 'blue', color: '#2F6FD0', rf: 0.8 }, { name: 'yellow', color: '#E0B81E', rf: 0.45 }] },
    black: { name: 'Black felt-tip ink', color: '#26262B', dyes: [{ name: 'blue', color: '#2F6FD0', rf: 0.85 }, { name: 'red', color: '#D23C3C', rf: 0.6 }, { name: 'yellow', color: '#E0B81E', rf: 0.35 }] },
    red:   { name: 'Red food colouring', color: '#D23C3C', dyes: [{ name: 'red', color: '#D23C3C', rf: 0.55 }] },
  };
  const CHR_PARTS = {
    ink:   { name: 'Ink spot', icon: '🖊️', hint: 'A small spot on the start line.',
             options: { green: 'Green ink', black: 'Black ink', red: 'Red food colouring' }, ok: ['green', 'black', 'red'] },
    line:  { name: 'Start line', icon: '✏️', hint: 'A line across the paper, near the bottom.',
             options: { pencil: 'Drawn in pencil', pen: 'Drawn in felt-tip pen' }, ok: ['pencil'], wrong: { pen: 'g8_pen' } },
    level: { name: 'Water in the beaker', icon: '💧', hint: 'The solvent. Where is it compared with the start line?',
             options: { low: 'Below the start line', high: 'Above the start line' }, ok: ['low'], wrong: { high: 'g8_under' } },
  };
  const CHR_ORDER = ['ink', 'line', 'level'];
  const CHROMA = { rise: 0.12, top: 0.9, underAt: 1.5, penAt: 0.45 };
  const checkChroma = parts => checkParts(CHR_PARTS, CHR_ORDER, parts, []);

  // ══ Grade 7 · Dissolving ═════════════════════
  const SOLIDS = {
    salt:  { name: 'Salt', grams: 5, dissolves: true, rate: 0.35, color: '#FFFFFF', solution: 'a clear, colourless salt solution' },
    sugar: { name: 'Sugar', grams: 5, dissolves: true, rate: 0.25, color: '#FFF6DC', solution: 'a clear, colourless sugar solution' },
    sand:  { name: 'Sand', grams: 5, dissolves: false, rate: 0, color: '#D8C08A', solution: null },
  };
  const DIS_PARTS = {
    solid:   { name: 'Solid on the weighing boat', icon: '🥄', hint: '5 g of it, weighed out.',
               options: { salt: '5 g of salt', sugar: '5 g of sugar', sand: '5 g of sand' }, ok: ['salt', 'sugar', 'sand'] },
    dbeaker: { name: 'Beaker of water on the balance', icon: '🫙', hint: '100 g of water.',
               options: { sound: 'A beaker of water', cracked: 'A cracked beaker of water' }, ok: ['sound'], wrong: { cracked: 'g7_cracked' } },
  };
  const DIS_ORDER = ['solid', 'dbeaker'];
  const DISSOLVE = { water: 100, stirFor: 5 };
  const checkDissolve = parts => checkParts(DIS_PARTS, DIS_ORDER, parts, ['g7_cracked']);
  // The balance reads the beaker\'s contents: the mass does not change on dissolving.
  const massOnBalance = (solid, added) => DISSOLVE.water + (added && SOLIDS[solid] ? SOLIDS[solid].grams : 0);

  // ══ Which technique? (Grade 8) ═══════════════
  const TECH8 = {
    filtration:     { name: 'Filtration',          icon: '🧻', gets: 'an insoluble solid, and a clear liquid' },
    decantation:    { name: 'Decantation',         icon: '🫗', gets: 'a liquid poured off a solid that has settled' },
    evaporation:    { name: 'Evaporation',         icon: '♨️', gets: 'a dissolved solid (the liquid is lost)' },
    magnet:         { name: 'Magnetic separation', icon: '🧲', gets: 'a magnetic solid' },
    chromatography: { name: 'Chromatography',      icon: '🌈', gets: 'the different dyes in a colour' },
    distillation:   { name: 'Distillation',        icon: '⚗️', gets: 'the pure liquid' },
  };
  const PRIN8 = {
    insoluble:  'The solid does not dissolve, so its particles are too big to pass through the filter paper.',
    settles:    'The solid is heavy and settles to the bottom quickly, so the liquid can be poured off the top.',
    evaporates: 'The liquid evaporates when it is heated but the dissolved solid does not, so the solid is left behind.',
    magnetic:   'One solid is attracted to a magnet and the other is not.',
    dyes:       'The dyes dissolve in the solvent by different amounts, so they are carried different distances up the paper.',
    bp:         'The liquid boils off and is cooled back into a liquid; the dissolved solid stays behind.',
  };
  const TP8 = { filtration: 'insoluble', decantation: 'settles', evaporation: 'evaporates', magnet: 'magnetic', chromatography: 'dyes', distillation: 'bp' };
  const MIX8 = [
    { id: 'muddy_water', name: 'Muddy water', want: 'clear water', tech: 'filtration', look: { liquid: '#9C8466', other: '#7A5A3A' },
      wrong: {
        decantation: 'Fine mud stays floating in the water and does not settle quickly, so the water you pour off is still cloudy.',
        evaporation: 'Evaporation would lose the water to the air and leave dried mud - but it is the water you want.',
        magnet: 'Mud is not magnetic, so a magnet picks up nothing.',
        chromatography: 'Chromatography separates the dyes in a colour. It cannot clear the mud out of a beaker of water.',
        distillation: 'Distillation would give pure water in the end, but it is slow and uses a lot of energy. Mud does not dissolve, so a filter paper traps it in minutes.' } },
    { id: 'settled_sand', name: 'Sand under water, settled', want: 'the water, quickly', tech: 'decantation', look: { liquid: '#C9DFE8', other: '#D8C08A' },
      wrong: {
        filtration: 'Filtering would work, but it is slow. The sand has already settled at the bottom, so you can simply pour the water off the top.',
        evaporation: 'Evaporation loses the water to the air - and the water is what you want.',
        magnet: 'Neither sand nor water is magnetic.',
        chromatography: 'There are no dyes to separate - just sand and water.',
        distillation: 'Boiling away all that water to collect it is slow and wastes energy when the sand has already settled.' } },
    { id: 'salt_solution', name: 'Salt water', want: 'the salt', tech: 'evaporation', look: { liquid: '#CFE3EA' },
      wrong: {
        filtration: 'The salt is dissolved, so it passes straight through the filter paper with the water.',
        decantation: 'Nothing settles: dissolved salt stays spread all through the water.',
        magnet: 'Salt is not magnetic.',
        chromatography: 'Salt is not a dye. Chromatography would not give you the salt back.',
        distillation: 'Distillation also leaves the salt behind, but it needs a whole rig to catch the water. You only want the salt, so just let the water evaporate.' } },
    { id: 'sea_drink', name: 'Sea water', want: 'pure water to drink', tech: 'distillation', look: { liquid: '#BFD9E2' },
      wrong: {
        filtration: 'The salt is dissolved, so it goes through the filter paper. The water would still be salty.',
        decantation: 'Dissolved salt never settles, so the water you pour off is still salty.',
        evaporation: 'Evaporation lets the water escape into the air and keeps the salt - but you want the water.',
        magnet: 'Neither salt nor water is magnetic.',
        chromatography: 'Chromatography shows the dyes in a colour. It cannot make drinking water.' } },
    { id: 'iron_sulphur', name: 'Iron filings and sulphur', want: 'the iron', tech: 'magnet', look: { solid: '#5B6167', other: '#E6CF3A' },
      wrong: {
        filtration: 'There is no liquid - these are two dry powders.',
        decantation: 'There is no liquid to pour off.',
        evaporation: 'There is no liquid to evaporate.',
        chromatography: 'Neither is a dye, and neither dissolves in water.',
        distillation: 'There is no liquid to boil off - these are two solids.' } },
    { id: 'green_ink', name: 'Green ink', want: 'to find out which dyes are in it', tech: 'chromatography', look: { liquid: '#2E8B57' },
      wrong: {
        filtration: 'The dyes are dissolved, so they all pass through the filter paper together.',
        decantation: 'Dissolved dyes never settle.',
        evaporation: 'Evaporation leaves all the dyes mixed together as a dry smear.',
        magnet: 'Dyes are not magnetic.',
        distillation: 'Distillation gives the water back but leaves all the dyes mixed together in the flask.' } },
  ];

  // ══ Element, compound or mixture? (Grade 7) ══
  const KIND7 = {
    element:  { name: 'Element',  icon: '🔹', gets: 'one kind of atom' },
    compound: { name: 'Compound', icon: '🔗', gets: 'elements chemically joined' },
    mixture:  { name: 'Mixture',  icon: '🥣', gets: 'substances just mixed together' },
  };
  const PRIN7 = {
    one_atom:   'It is made of only one kind of atom, so it cannot be split into anything simpler.',
    joined:     'Two or more elements are chemically joined in a fixed amount. Only a chemical reaction can split them.',
    not_joined: 'Two or more substances are mixed but not chemically joined, so they can be separated by physical means.',
  };
  const KP7 = { element: 'one_atom', compound: 'joined', mixture: 'not_joined' };
  const MIX7 = [
    { id: 'iron', name: 'Iron', want: 'Fe - a grey metal', tech: 'element', look: { solid: '#6B7178' },
      wrong: { compound: 'Iron is made of iron atoms only (symbol Fe). A compound needs two or more different elements joined together.',
               mixture: 'Pure iron is one substance on its own - nothing is mixed into it.' } },
    { id: 'oxygen', name: 'Oxygen', want: 'O₂ - a gas in the air', tech: 'element', look: {},
      wrong: { compound: 'Oxygen gas has only oxygen atoms. They go round in pairs, but both atoms are the same kind.',
               mixture: 'Pure oxygen is one substance on its own.' } },
    { id: 'water', name: 'Water', want: 'H₂O', tech: 'compound', look: { liquid: '#BFD9E2' },
      wrong: { element: 'Water contains two kinds of atom, hydrogen and oxygen (H₂O), so it is not an element.',
               mixture: 'The hydrogen and oxygen in water are chemically joined in a fixed amount. You cannot filter or boil them apart.' } },
    { id: 'salt', name: 'Salt (sodium chloride)', want: 'NaCl', tech: 'compound', look: { solid: '#F4F4F0' },
      wrong: { element: 'Salt is made of two elements, sodium and chlorine.',
               mixture: 'Sodium and chlorine are chemically joined in salt. No physical method pulls them apart.' } },
    { id: 'air', name: 'Air', want: 'what we breathe', tech: 'mixture', look: {},
      wrong: { element: 'Air contains several different gases - nitrogen, oxygen, argon, carbon dioxide and more.',
               compound: 'The gases in air are not joined together and their amounts can vary. Air can be separated by physical means.' } },
    { id: 'sea7', name: 'Sea water', want: 'from the lagoon', tech: 'mixture', look: { liquid: '#BFD9E2' },
      wrong: { element: 'Sea water contains water and dissolved salts - more than one substance.',
               compound: 'The salt is not joined to the water: evaporate the water and the salt is left behind.' } },
  ];

  // One "choose" bench per grade. Grade 9 is the original.
  const CHOOSE = {
    9: { kinds: TECHNIQUES, principles: PRINCIPLES, kindPrinciple: TECH_PRINCIPLE, items: MIXTURES, card: 'wrong_tech',
         modeLabel: 'Which technique?', q1: 'Which technique?', q2: n => `Why does ${n} work here?`, getsLabel: 'Keeps', wantLabel: 'You want',
         noun: 'mixtures', discRight: 'ch_right', discAll: 'ch_all' },
    8: { kinds: TECH8, principles: PRIN8, kindPrinciple: TP8, items: MIX8, card: 'wrong_tech8',
         modeLabel: 'Which technique?', q1: 'Which technique?', q2: n => `Why does ${n} work here?`, getsLabel: 'Gets', wantLabel: 'You want',
         noun: 'mixtures', discRight: 'g8_sort_right', discAll: 'g8_sort_all' },
    7: { kinds: KIND7, principles: PRIN7, kindPrinciple: KP7, items: MIX7, card: 'wrong_kind7',
         modeLabel: 'Element or mixture?', q1: 'Element, compound or mixture?', q2: n => `Why is it ${/^[aeiou]/i.test(n) ? 'an' : 'a'} ${n}?`, getsLabel: 'Made of', wantLabel: 'Clue',
         noun: 'substances', discRight: 'g7_kind_right', discAll: 'g7_kind_all' },
  };

  // Which discovery a finished experiment unlocks, per grade.
  const DONE_DISC = {
    filter:   { muddy: 'g8_residue', sandsalt: 'g8_salt_through', salt: 'g8_clear' },
    evap:     { 7: { salt: 'g7_salt_back', sugarsol: 'g7_sugar_back' }, 8: { salt: 'g8_salt_back' } },
    chroma:   { green: 'g8_dyes', black: 'g8_black', red: 'g8_one' },
    dissolve: { salt: 'g7_dissolve', sugar: 'g7_mass', sand: 'g7_sand' },
    distil:   { 7: { sea: 'g7_water_back' } },
  };
  const DRY_CARD = { 7: 'g7_dry', 8: 'g8_dry' };

  // ── Hazards and result cards for Grades 7 and 8 ──
  Object.assign(HAZARDS, {
    lo_goggles: {
      grades: [7, 8], signs: ['hot', 'goggles'], fx: 'spit',
      title: () => 'Stop - protect your eyes',
      happened: c => `You started heating ${c.what} without safety goggles. It spat - hot drops flew out towards your face.`,
      why: 'A heated liquid can spurt out suddenly. A drop of boiling liquid, or hot solid, in the eye can badly burn it.',
      instead: 'Put on safety goggles before you heat anything, and keep them on until everything has cooled down. Tap 🥽 at the top.',
      exam: 'Lab-safety questions ask for a precaution when heating: wear safety goggles, because hot liquid can spurt out suddenly.',
    },
    g8_cracked: {
      grades: [8], signs: ['sharp'], fx: 'crack', card: 'g8_cracked',
      title: () => 'Broken glass - the beaker was cracked',
      happened: () => 'You put a cracked beaker under the funnel. As the filtrate ran into it, the crack spread and the beaker split - liquid and sharp pieces of glass all over the bench.',
      why: 'Broken glass cuts. A beaker that splits also spills whatever is in it, and that could be hot or harmful.',
      instead: 'Check glassware before you use it and never use a cracked or chipped beaker - give it to your teacher. If glass breaks, do not touch it: tell the teacher, who clears it with a brush and dustpan.',
      exam: 'Lab-safety questions: check apparatus for cracks before you use it, and report breakages - never pick up broken glass with your fingers.',
    },
    g7_cracked: {
      grades: [7], signs: ['sharp'], fx: 'crack', card: 'g7_cracked',
      title: () => 'Broken glass - the beaker was cracked',
      happened: () => 'Your glass rod knocked the side of a cracked beaker while you stirred. The crack spread, the beaker split, and the water ran across the balance and the bench, full of sharp pieces of glass.',
      why: 'Broken glass cuts, and water spilt over an electric balance is dangerous too.',
      instead: 'Look at a beaker before you use it. A cracked one goes back to the teacher. Never pick up broken glass with your fingers - tell the teacher.',
      exam: 'Lab-safety questions: check apparatus for cracks before use, and tell the teacher about any breakage.',
    },
  });
  Object.assign(RESULTS, {
    g8_torn: { icon: '🧻', title: 'The filtrate came out cloudy',
      happened: c => `The filter paper was torn, so the ${c.residue} slipped straight through the hole. The liquid in the beaker underneath is cloudy - it was never filtered.`,
      instead: 'Use a whole filter paper. Fold it in half, then in half again, and open it into a cone that fits the funnel. Wet it so it sticks to the glass.',
      exam: 'A cloudy filtrate is a classic "what went wrong?" question: a torn filter paper, or liquid poured over the top of the paper.' },
    g8_overflow: { icon: '🫗', title: 'It went over the top',
      happened: c => `You tipped it all in at once. The liquid rose above the top of the filter paper and ran down between the paper and the funnel, carrying ${c.residue} with it. The filtrate is cloudy.`,
      instead: 'Pour slowly, down a glass rod, and keep the liquid below the top edge of the filter paper.',
      exam: 'Why must the liquid stay below the top of the filter paper? So none of it runs round the paper without being filtered.' },
    g8_dry: { icon: '💥', title: 'Heated to dryness - the salt spat',
      happened: () => 'You kept heating after the water had gone. The last drops boiled in bursts and hot salt spat out of the basin. What was left was a crust of tiny crystals, and some of your salt was lost.',
      instead: 'Heat only until the first crystals appear at the edge of the liquid. Then turn off the heat and leave the basin somewhere warm, so the rest of the water evaporates slowly. Slow evaporation gives bigger crystals.',
      exam: 'Why not heat to dryness? The solid spits out of the basin, and slow evaporation gives larger crystals.' },
    g8_under: { icon: '🌊', title: 'The spots washed away',
      happened: () => 'The water in the beaker was above your start line, so the ink spot dissolved straight into the water in the beaker. Nothing travelled up the paper.',
      instead: 'Put the spot on a pencil start line near the bottom of the paper, and keep the water level BELOW the line.',
      exam: 'Chromatography set-ups: the solvent must start below the spots, or the spots dissolve into the solvent.' },
    g8_pen: { icon: '🖊️', title: 'The start line ran',
      happened: () => 'Your start line was drawn in felt-tip pen. Its ink dissolved in the water as well and ran up the paper with your dyes, so you cannot tell which colours came from the ink you were testing.',
      instead: 'Always draw the start line in pencil. Pencil (graphite) does not dissolve in the solvent, so it stays where it is.',
      exam: 'Why is the start line drawn in pencil? Because pencil does not dissolve in the solvent.' },
    g7_dry: { icon: '💥', title: 'The salt spat out',
      happened: () => 'You kept heating until the basin was dry. The last of the water boiled away in bursts and hot salt spat out of the basin.',
      instead: 'Stop heating when the first crystals appear at the edge. Leave the basin to finish drying on its own - the salt still comes back.',
      exam: 'A dissolved solid comes back when the water evaporates - a physical change. Stop heating before it is dry.' },
    g7_charred: { icon: '⚫', title: 'The sugar turned black',
      happened: c => `You heated ${c.what} until it was dry and very hot. The sugar melted, turned brown, then black, and gave off smoke. The black solid is mostly carbon - it is not sugar any more, and nothing will turn it back.`,
      instead: 'That was a chemical change: new substances were made. To get dissolved sugar back, let sugar water evaporate slowly, without heating it dry - a physical change.',
      exam: 'Physical or chemical change? Dissolving and evaporating can be undone; burning and charring make new substances and cannot.' },
    wrong_tech8: { icon: '🧰', title: 'Not the right technique',
      happened: c => c.why,
      instead: c => `Use ${TECH8[c.right].name.toLowerCase()}: ${PRIN8[TP8[c.right]]}`,
      exam: 'Questions give a mixture and ask for the technique AND the reason. Say which property it uses: size, settling, evaporating, magnetism, how well dyes dissolve, or boiling point.' },
    wrong_kind7: { icon: '🔍', title: 'Look again',
      happened: c => c.why,
      instead: c => `It is ${c.right === 'element' ? 'an' : 'a'} ${KIND7[c.right].name.toLowerCase()}. ${PRIN7[KP7[c.right]]}`,
      exam: 'You may be asked to sort substances into elements, compounds and mixtures - and to say how a mixture differs from a compound.' },
  });
  Object.assign(CARD_DISC, {
    g8_cracked: 'g8_cracked', g8_torn: 'g8_torn', g8_overflow: 'g8_overflow', g8_dry: 'g8_dry', g8_under: 'g8_under', g8_pen: 'g8_pen',
    g7_cracked: 'g7_cracked', g7_dry: 'g7_dry', g7_charred: 'g7_charred',
  });

  // ── Discoveries, Grades 7 and 8 ──
  const MF = 'mode:filter', ME = 'mode:evap', MR = 'mode:chroma', MV = 'mode:dissolve';
  const FIL = (mix, paper, beaker, pour) => [MF, 'part:fmix:' + mix, 'part:paper:' + (paper || 'cone'), 'part:fbeaker:' + (beaker || 'sound'), 'part:pouring:' + (pour || 'rod'), 'pour'];
  const CHR = (ink, line, level) => [MR, 'part:ink:' + ink, 'part:line:' + (line || 'pencil'), 'part:level:' + (level || 'low'), 'run'];
  const DIS = (solid, beaker) => [MV, 'part:solid:' + solid, 'part:dbeaker:' + (beaker || 'sound'), 'add', 'stir'];
  DISCOVERIES.push(
    { id: 'g8_residue', grades: [8], icon: '🟤', title: 'Residue and filtrate', hint: 'Filter muddy water',
      how: [...FIL('muddy'), 'wait:filtrate'],
      saw: 'The mud stayed on the filter paper and clear water dripped into the beaker below.',
      learn: 'Filtration: the solid left on the paper is the RESIDUE; the liquid that runs through is the FILTRATE. Mud does not dissolve, and its particles are too big for the tiny holes in the paper.' },
    { id: 'g8_salt_through', grades: [8], icon: '🧂', title: 'The salt went through', hint: 'Filter sand and salt stirred in water',
      how: [...FIL('sandsalt'), 'wait:filtrate'],
      saw: 'The sand stayed on the paper, but the salt did not: the clear filtrate was still salty.',
      learn: 'Dissolved salt is split up into particles far smaller than the holes in the paper, so it passes through. Filtration only catches INSOLUBLE solids. To get the salt, evaporate the filtrate.' },
    { id: 'g8_clear', grades: [8], icon: '🔎', title: 'Clear is not pure', hint: 'Filter salt water',
      how: [...FIL('salt'), 'wait:filtrate'],
      saw: 'Nothing at all was left on the filter paper, and the filtrate was just as salty as before.',
      learn: 'A clear liquid can still have things dissolved in it. Filtering never makes pure water - for that you need distillation.' },
    { id: 'g8_torn', grades: [8], icon: '🧻', title: 'A torn filter paper', hint: 'Filter muddy water through a torn paper',
      how: [...FIL('muddy', 'torn'), 'card:g8_torn'],
      saw: 'The mud slipped through the hole in the paper and the filtrate came out cloudy.',
      learn: 'A cloudy filtrate means solid got past the paper - usually a torn paper, or liquid poured over the top.' },
    { id: 'g8_overflow', grades: [8], icon: '🫗', title: 'Over the top', hint: 'Tip the muddy water in all at once',
      how: [...FIL('muddy', 'cone', 'sound', 'fast'), 'card:g8_overflow'],
      saw: 'The liquid rose above the paper and ran down the side of the funnel, taking mud with it.',
      learn: 'Pour slowly down a glass rod and keep the liquid below the top of the filter paper.' },
    { id: 'g8_cracked', grades: [8], icon: '🩹', title: 'Cracked glassware', hint: 'Filter into a cracked beaker',
      how: [...FIL('muddy', 'cone', 'cracked'), 'card:g8_cracked'],
      saw: 'The cracked beaker split as the liquid ran in, and broken glass went across the bench.',
      learn: 'Check glassware before you use it. Cracked glass goes to the teacher, and broken glass is never picked up by hand.' },
    { id: 'g8_salt_back', grades: [8], icon: '💠', title: 'Salt from salt water', hint: 'Evaporate salt water, then leave it to dry',
      how: [ME, 'part:emix:salt', G, HEAT, 'wait:edge', 'heat-off', 'leave', 'wait:dry'],
      saw: 'The water boiled away until crystals appeared at the edge. Left to dry slowly, the basin filled with white salt crystals.',
      learn: 'Evaporation: the water turns to vapour and escapes, the dissolved salt cannot, so it is left behind. Salt dissolves about as well in cold water as in hot, so you evaporate the water - cooling would not work.' },
    { id: 'g8_dry', grades: [8], icon: '💥', title: 'Heated to dryness', hint: 'Keep heating salt water until the basin is dry',
      how: [ME, 'part:emix:salt', G, HEAT, 'card:g8_dry'],
      saw: 'As the last water went, hot salt spat out of the basin and only a crust of tiny crystals was left.',
      learn: 'Stop heating when the first crystals appear, then let the rest dry slowly: it does not spit, and slow evaporation gives bigger crystals.' },
    { id: 'g8_dyes', grades: [8], icon: '🌈', title: 'Green is two colours', hint: 'Run a chromatogram of green ink',
      how: [...CHR('green'), 'wait:chromatogram'],
      saw: 'As the water climbed the paper, the green spot split into a blue spot (high up) and a yellow spot (lower down).',
      learn: 'Chromatography: each dye dissolves in the water by a different amount, so each is carried a different distance. Two spots means the ink is a mixture of two dyes.' },
    { id: 'g8_black', grades: [8], icon: '🖤', title: 'The colours in black', hint: 'Run a chromatogram of black ink',
      how: [...CHR('black'), 'wait:chromatogram'],
      saw: 'The black spot split into blue, red and yellow spots at different heights.',
      learn: 'Black felt-tip ink is a mixture of several coloured dyes. The dye that dissolves best in the water travels furthest.' },
    { id: 'g8_one', grades: [8], icon: '🔴', title: 'Just one spot', hint: 'Run a chromatogram of red food colouring',
      how: [...CHR('red'), 'wait:chromatogram'],
      saw: 'The red spot moved up the paper but stayed as one spot.',
      learn: 'One spot means one dye: this colouring is not a mixture of dyes.' },
    { id: 'g8_under', grades: [8], icon: '🌊', title: 'Washed away', hint: 'Start with the water above the start line',
      how: [...CHR('green', 'pencil', 'high'), 'card:g8_under'],
      saw: 'The ink spot dissolved into the water in the beaker and nothing climbed the paper.',
      learn: 'The solvent must start BELOW the start line, so it rises up to the spots and carries them.' },
    { id: 'g8_pen', grades: [8], icon: '🖊️', title: 'The line that ran', hint: 'Draw the start line in felt-tip pen',
      how: [...CHR('green', 'pen'), 'card:g8_pen'],
      saw: 'The start line itself ran up the paper as a coloured smear.',
      learn: 'Draw the start line in pencil - it does not dissolve in the solvent.' },
    { id: 'g8_sort_right', grades: [8], icon: '🧲', title: 'A magnet does it', hint: 'Choose a technique for iron and sulphur',
      how: ['mode:choose', 'choose:iron_sulphur'],
      saw: 'Iron and sulphur → magnetic separation: iron is attracted to a magnet and sulphur is not.',
      learn: 'To choose a technique, ask: what do I want to keep, and how are the substances different - size, settling, dissolving, magnetism or boiling point?' },
    { id: 'g8_sort_all', grades: [8], icon: '🏅', title: 'Separation expert', hint: 'Choose the right technique for every mixture',
      how: ['mode:choose', 'choose:muddy_water', 'choose:settled_sand', 'choose:salt_solution', 'choose:sea_drink', 'choose:iron_sulphur', 'choose:green_ink'],
      saw: 'Filtration for muddy water, decantation for settled sand, evaporation for salt, distillation for drinking water, a magnet for iron, chromatography for ink.',
      learn: 'Each technique uses one difference between the substances in the mixture. Name that difference and you have the principle.' },

    { id: 'g7_dissolve', grades: [7], icon: '🧂', title: 'Salt dissolves', hint: 'Stir salt into water',
      how: [...DIS('salt'), 'wait:dissolved'],
      saw: 'The salt grains got smaller and disappeared. The water stayed clear - a salt solution.',
      learn: 'The salt DISSOLVED: it is SOLUBLE. The salt is the solute, the water is the solvent, and together they make a solution. The salt is still there, spread out between the water particles.' },
    { id: 'g7_mass', grades: [7], icon: '⚖️', title: 'Nothing is lost', hint: 'Watch the balance while sugar dissolves',
      how: [...DIS('sugar'), 'wait:dissolved'],
      saw: 'The balance read 105.0 g before the sugar dissolved and still 105.0 g after it had disappeared.',
      learn: 'Dissolving does not destroy anything: 100 g of water + 5 g of sugar = 105 g of sugar solution. The mass stays the same, so the sugar is still there.' },
    { id: 'g7_sand', grades: [7], icon: '🏖️', title: 'Sand will not dissolve', hint: 'Stir sand into water',
      how: [...DIS('sand'), 'wait:settled'],
      saw: 'However much it was stirred, the sand stayed as grains and sank to the bottom when the stirring stopped.',
      learn: 'Sand is INSOLUBLE in water. Sand and water make a mixture, but not a solution.' },
    { id: 'g7_cracked', grades: [7], icon: '🩹', title: 'Cracked glassware', hint: 'Stir in a cracked beaker',
      how: [...DIS('salt', 'cracked'), 'card:g7_cracked'],
      saw: 'The glass rod knocked the cracked beaker and it split, spilling water and glass.',
      learn: 'Look at glassware before you use it - a cracked beaker goes back to the teacher.' },
    { id: 'g7_salt_back', grades: [7], icon: '💠', title: 'The salt comes back', hint: 'Evaporate salt water',
      how: [ME, 'part:emix:salt', G, HEAT, 'wait:edge', 'heat-off', 'leave', 'wait:dry'],
      saw: 'The water evaporated and white salt crystals were left in the basin.',
      learn: 'Dissolving is a PHYSICAL change: no new substance was made, and evaporating the water gets the salt back, unchanged.' },
    { id: 'g7_sugar_back', grades: [7], icon: '🍬', title: 'Sugar crystals again', hint: 'Leave sugar water to evaporate - no heating',
      how: [ME, 'part:emix:sugarsol', 'leave', 'wait:dry'],
      saw: 'Left somewhere warm, the water slowly evaporated and sugar crystals formed in the basin.',
      learn: 'Gentle evaporation undoes dissolving: the sugar comes back as sugar. That is what makes it a physical change.' },
    { id: 'g7_dry', grades: [7], icon: '💥', title: 'Spitting salt', hint: 'Heat salt water until the basin is dry',
      how: [ME, 'part:emix:salt', G, HEAT, 'card:g7_dry'],
      saw: 'As the last water boiled away, hot salt spat out of the basin.',
      learn: 'Stop heating when the first crystals appear at the edge and let the rest dry on its own.' },
    { id: 'g7_charred', grades: [7], icon: '⚫', title: 'A change you cannot undo', hint: 'Heat dry sugar strongly',
      how: [ME, 'part:emix:sugar', G, HEAT, 'card:g7_charred'],
      saw: 'The sugar melted, turned brown, then black, and gave off smoke.',
      learn: 'Heating sugar strongly is a CHEMICAL change: new substances (mostly black carbon, and water vapour) are made, and you cannot get the sugar back.' },
    { id: 'g7_water_back', grades: [7], icon: '💧', title: 'The water comes back too', hint: 'Distil sea water on a ready-made rig',
      how: ['mode:distil', 'build:correct', G, HEAT, 'wait:distillate'],
      saw: 'The sea water boiled, the steam cooled in the condenser, and clear water dripped into the conical flask. The salt stayed in the flask.',
      learn: 'Distillation is two changes of state - liquid to gas (boiling), then gas to liquid (condensing). Both are physical changes, so you get back pure water AND the salt.' },
    { id: 'g7_kind_right', grades: [7], icon: '🔹', title: 'An element', hint: 'Sort iron',
      how: ['mode:choose', 'choose:iron'],
      saw: 'Iron → element: it is made of iron atoms only (Fe).',
      learn: 'An element has one kind of atom. A compound has elements chemically joined. A mixture has substances that are not joined.' },
    { id: 'g7_kind_all', grades: [7], icon: '🏅', title: 'Sorting expert', hint: 'Sort all six substances',
      how: ['mode:choose', 'choose:iron', 'choose:oxygen', 'choose:water', 'choose:salt', 'choose:air', 'choose:sea7'],
      saw: 'Iron and oxygen are elements; water and salt are compounds; air and sea water are mixtures.',
      learn: 'A mixture can be separated by physical means (filtering, evaporating, distilling). A compound can only be split by a chemical reaction.' },
  );

  // ── Picture options for "pick the apparatus" questions ──
  const S = 'fill="#E3EEF2" stroke="#34525E" stroke-width="2" stroke-linejoin="round"';
  const svg = body => `<svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">${body}</svg>`;
  const PIC = {
    funnel:   svg(`<path d="M7 9h34L27 27v15h-6V27z" ${S}/>`),
    conical:  svg(`<path d="M19 5h10v12l11 25H8l11-25z" ${S}/>`),
    basin:    svg(`<path d="M5 18h38c0 12-8 20-19 20S5 30 5 18z" ${S}/>`),
    cylinder: svg(`<path d="M17 5h14v35H17z" ${S}/><path d="M12 42h24M17 12h6M17 18h6M17 24h6M17 30h6" stroke="#34525E" stroke-width="2"/>`),
    balance:  svg(`<rect x="5" y="28" width="38" height="14" rx="3" ${S}/><rect x="9" y="22" width="30" height="4" ${S}/><rect x="15" y="32" width="18" height="6" fill="#1F3A2E"/>`),
    thermo:   svg(`<rect x="21" y="4" width="6" height="32" rx="3" fill="#fff" stroke="#34525E" stroke-width="2"/><circle cx="24" cy="39" r="5.5" fill="#D0312D"/><rect x="23" y="16" width="2" height="21" fill="#D0312D"/>`),
  };
  const chrPic = (waterY, spotY, paperBottom) => svg(
    `<rect x="20" y="3" width="8" height="${paperBottom - 3}" fill="#FFFFFF" stroke="#34525E" stroke-width="1.5"/>`
    + `<rect x="9" y="${waterY}" width="30" height="${43 - waterY}" fill="#9FC8E6" opacity="0.8"/>`
    + `<path d="M8 12v31h32V12" fill="none" stroke="#34525E" stroke-width="2"/>`
    + `<circle cx="24" cy="${spotY}" r="2.6" fill="#2E8B57"/>`);

  MISSIONS.push(
    {
      id: 'g8_clear', grades: [8], icon: '🧻', title: 'Clear water from muddy water', mode: 'filter', goal: { fmix: 'muddy' },
      blurb: 'Set up a filter funnel and get clear water out of muddy water.',
      intro: 'Clear water from muddy water! Set up the filter on the shelf - a whole paper, a sound beaker, and pour slowly down a glass rod - then pour.',
      good: 'Filtered right first time. 🧻', bad: 'Something went wrong with the filter - set it up right first time for another star.',
      quiz: [
        { q: 'Which piece of apparatus holds the filter paper?',
          options: [{ label: 'Filter funnel', svg: PIC.funnel }, { label: 'Conical flask', svg: PIC.conical }, { label: 'Evaporating basin', svg: PIC.basin }, { label: 'Measuring cylinder', svg: PIC.cylinder }],
          why: 'The filter paper is folded into a cone and sits inside a filter funnel.' },
        { q: 'In filtration, what is the solid left on the filter paper called?',
          options: ['The residue', 'The filtrate', 'The solvent', 'The solution'],
          why: 'The solid trapped on the paper is the residue; the liquid that passes through is the filtrate.' },
        { q: 'Why does filtration separate mud from water?',
          options: ['The mud particles are too big to pass through the paper', 'The mud dissolves in the filter paper', 'The water is heavier than the mud', 'The paper reacts with the mud'],
          why: 'Mud is insoluble. Its particles are too big for the tiny holes in the paper; water passes through.' },
        { q: 'Why should the liquid never come above the top of the filter paper?',
          options: ['It runs round the paper without being filtered', 'It makes the filter paper dissolve', 'It makes the filtrate salty', 'It cools the mixture down'],
          why: 'Liquid over the top runs down between the paper and the funnel, carrying solid into the filtrate.' },
        { q: 'The filtrate from muddy water is clear. Is it pure water?',
          options: ['No - dissolved substances pass through the paper', 'Yes - filtration removes everything', 'Yes - clear water is always pure', 'No - filtering adds salt to it'],
          why: 'Only insoluble solids are caught. Anything dissolved goes through; to get pure water you would distil the filtrate.' },
      ],
    },
    {
      id: 'g8_ink', grades: [8], icon: '🌈', title: 'Ink detective', mode: 'chroma', goal: { ink: 'black' },
      blurb: 'Run a chromatogram of black ink and find the dyes hiding in it.',
      intro: 'Ink detective! Which dyes are in black ink? Set up the paper correctly - start line, spot and water level - then stand it in the water.',
      good: 'Chromatogram set up right first time. 🌈', bad: 'The set-up had a mistake - get it right first time for another star.',
      quiz: [
        { q: 'Why is the start line drawn in pencil, not in ink?',
          options: ['Pencil does not dissolve and run up the paper', 'Pencil lines are easier to see', 'Ink would tear the paper', 'Pencil makes the water rise faster'],
          why: 'Pencil (graphite) does not dissolve in the solvent, so the line stays put.' },
        { q: 'Which set-up will separate the dyes in the ink spot?',
          options: [{ label: 'Spot just above the water', svg: chrPic(36, 31, 42) }, { label: 'Spot under the water', svg: chrPic(27, 34, 42) },
                    { label: 'Paper not touching the water', svg: chrPic(38, 28, 33) }, { label: 'Spot at the top of the paper', svg: chrPic(36, 8, 42) }],
          why: 'The paper dips into the water, and the spot sits just above it, so the rising water carries the dyes up.' },
        { q: 'Black ink gives three coloured spots. What does this show?',
          options: ['The ink is a mixture of three dyes', 'The ink changed into new substances', 'The paper added colours to it', 'The ink is a pure substance'],
          why: 'Each spot is a different dye. A pure dye would give one spot.' },
        { q: 'One dye travels further up the paper than another. Why?',
          options: ['It dissolves better in the solvent', 'It is a heavier dye', 'It was put on the paper first', 'It is a darker colour'],
          why: 'The better a dye dissolves in the solvent, the further the solvent carries it.' },
        { q: 'What is the solvent in this experiment?',
          options: ['The water', 'The ink', 'The paper', 'The pencil line'],
          why: 'The water dissolves the dyes and carries them up the paper, so it is the solvent.' },
      ],
    },
    {
      id: 'g8_sort', grades: [8], icon: '🤔', title: 'Choose the technique', mode: 'choose',
      blurb: 'Six mixtures. Pick the right technique for each - and the reason it works.',
      intro: 'Choose the technique! For each mixture, pick the technique that gets you what you want - then the reason it works.',
      good: 'Sorted with hardly a slip. 🧰', bad: 'More than one wrong pick - one slip is allowed for the star.',
      quiz: [
        { q: 'Which technique separates iron filings from sulphur?',
          options: ['Magnetic separation', 'Filtration', 'Evaporation', 'Chromatography'],
          why: 'Iron is attracted to a magnet; sulphur is not.' },
        { q: 'Sand has settled at the bottom of a beaker of water. What is the quickest way to get most of the water?',
          options: ['Decantation', 'Distillation', 'Chromatography', 'Evaporation'],
          why: 'The sand has already settled, so you simply pour the water off the top.' },
        { q: 'Why can filtration not get the salt out of salt water?',
          options: ['The salt is dissolved, so it passes through the paper', 'The salt is too big to fit through', 'The salt reacts with the paper', 'The salt is magnetic'],
          why: 'Dissolved particles are far smaller than the holes in filter paper.' },
        { q: 'Which technique gives pure drinking water from sea water?',
          options: ['Distillation', 'Filtration', 'Decantation', 'Evaporation'],
          why: 'The water boils off and is condensed back to liquid; the salt stays behind.' },
        { q: 'When evaporating salt water, why stop heating before the basin is dry?',
          options: ['The salt spits out, and slow drying gives bigger crystals', 'The salt would turn into a gas', 'The basin would melt', 'The water would come back'],
          why: 'Heating to dryness makes hot salt spit; letting the last water evaporate slowly is safer and gives bigger crystals.' },
      ],
    },
    {
      id: 'g7_where', grades: [7], icon: '🧂', title: 'Where did the salt go?', mode: 'dissolve', goal: { solid: 'salt' },
      blurb: 'Dissolve salt in water and watch the balance - is anything lost?',
      intro: 'Where did the salt go? Choose the salt and a beaker of water on the balance, tip it in and stir until it dissolves. Keep an eye on the balance.',
      good: 'Safe and careful all the way. ⚖️', bad: 'Something went wrong on the way - do it cleanly for another star.',
      quiz: [
        { q: 'Salt is stirred into water and disappears. What has happened to it?',
          options: ['It has dissolved to make a solution', 'It has turned into water', 'It has been destroyed', 'It has become a gas'],
          why: 'The salt is still there, split into tiny particles spread through the water.' },
        { q: 'In salt water, which is the solvent?',
          options: ['The water', 'The salt', 'The salt water', 'The beaker'],
          why: 'The solvent does the dissolving (water); the solute is what dissolves (salt); together they make the solution.' },
        { q: '100 g of water and 5 g of salt are weighed. The salt dissolves. What is the mass of the salt water?',
          options: ['105 g', '100 g', '95 g', '5 g'],
          why: 'Nothing is lost when a solid dissolves, so the mass stays 100 g + 5 g = 105 g.' },
        { q: 'Sand is stirred into water but stays as grains at the bottom. Sand is…',
          options: ['Insoluble in water', 'Soluble in water', 'A solution', 'A solvent'],
          why: 'A solid that does not dissolve is insoluble.' },
        { q: 'Which apparatus measures mass?',
          options: [{ label: 'Balance', svg: PIC.balance }, { label: 'Measuring cylinder', svg: PIC.cylinder }, { label: 'Thermometer', svg: PIC.thermo }, { label: 'Filter funnel', svg: PIC.funnel }],
          why: 'A balance measures mass in grams. A measuring cylinder measures volume; a thermometer measures temperature.' },
      ],
    },
    {
      id: 'g7_back', grades: [7], icon: '💠', title: 'Get the salt back', mode: 'evap', goal: { emix: 'salt' },
      blurb: 'Evaporate salt water and get the salt back - without letting it spit.',
      intro: 'Get the salt back! Put salt water in the basin, goggles on, heat until the first crystals appear at the edge - then turn off the heat and leave it to dry.',
      good: 'Stopped at exactly the right moment. 💠', bad: 'Heated it dry - stop at the first crystals for another star.',
      quiz: [
        { q: 'How can you get dissolved salt back from salt water?',
          options: ['Evaporate the water', 'Filter it through paper', 'Stir it for longer', 'Put it in the fridge'],
          why: 'The water evaporates; the salt cannot, so it is left behind.' },
        { q: 'Getting the salt back by evaporating the water is…',
          options: ['A physical change - no new substance is made', 'A chemical change - a new substance is made', 'A chemical change - the salt is destroyed', 'A physical change - the salt turns into water'],
          why: 'The salt comes back unchanged, so dissolving and evaporating are physical changes.' },
        { q: 'Why should you stop heating before the basin is completely dry?',
          options: ['Hot salt spits out of the basin', 'The salt catches fire', 'The basin turns into salt', 'The water comes back'],
          why: 'The last drops boil in bursts and throw hot salt out. Let the rest dry on its own.' },
        { q: 'Sugar heated on its own turns black and gives off smoke. This is…',
          options: ['A chemical change - new substances are made', 'A physical change - it can be undone', 'A change of state - melting', 'A physical change - evaporation'],
          why: 'The black carbon is a new substance and cannot be turned back into sugar.' },
        { q: 'Which apparatus holds a solution while it is evaporated?',
          options: [{ label: 'Evaporating basin', svg: PIC.basin }, { label: 'Filter funnel', svg: PIC.funnel }, { label: 'Measuring cylinder', svg: PIC.cylinder }, { label: 'Conical flask', svg: PIC.conical }],
          why: 'A wide, shallow evaporating basin gives the water a big surface to evaporate from.' },
      ],
    },
    {
      id: 'g7_sort', grades: [7], icon: '🤔', title: 'Element, compound or mixture?', mode: 'choose',
      blurb: 'Sort six substances - and say why each belongs where it does.',
      intro: 'Element, compound or mixture? Sort each substance, then pick the reason.',
      good: 'Sorted with hardly a slip. 🔹', bad: 'More than one wrong pick - one slip is allowed for the star.',
      quiz: [
        { q: 'Which of these is an element?',
          options: ['Iron', 'Water', 'Air', 'Salt'],
          why: 'Iron is made of one kind of atom (Fe). Water and salt are compounds; air is a mixture.' },
        { q: 'Water (H₂O) is a compound because…',
          options: ['Hydrogen and oxygen are chemically joined in it', 'It is a liquid', 'It has only one kind of atom', 'Other things are dissolved in it'],
          why: 'A compound is two or more elements chemically joined in a fixed amount.' },
        { q: 'Why is sea water a mixture?',
          options: ['The salt and water are not chemically joined', 'The salt and water have reacted', 'It has only one kind of atom', 'It is found in nature'],
          why: 'The salt is just dissolved in the water - evaporate the water and the salt is left.' },
        { q: 'Which can be separated by physical means, such as evaporating or filtering?',
          options: ['A mixture', 'A compound', 'An element', 'Any pure substance'],
          why: 'The parts of a mixture are not joined, so physical methods separate them.' },
        { q: 'Carbon dioxide has the formula CO₂. It is…',
          options: ['A compound of carbon and oxygen', 'An element', 'A mixture of carbon and oxygen', 'A metal'],
          why: 'Two elements, carbon and oxygen, chemically joined: a compound.' },
      ],
    },
  );

  GUIDES.push(
    { id: 'g8_filter', grades: [8], icon: '🧻', title: 'Filter muddy water',
      blurb: 'Fold a filter paper, pour slowly - and find the residue and the filtrate.',
      lesson: 'Filtration: mud does not dissolve, and its particles are too big for the tiny holes in the filter paper. The mud stays on the paper (the residue) and clear water runs through (the filtrate).',
      steps: [
        { on: 'mode:filter',          say: 'Tap 🧻 Filtration bench to open it.' },
        { on: 'part:fmix:muddy',      say: 'Tap 🥤 Muddy water — soil stirred into water.' },
        { on: 'part:paper:cone',      say: 'Tap 🧻 Folded into a cone — fold the filter paper and open it into the funnel.' },
        { on: 'part:fbeaker:sound',   say: 'Tap 🫙 A clean beaker — place it under the funnel to catch the filtrate.' },
        { on: 'part:pouring:rod',     say: 'Tap 🥢 Slowly, down a glass rod — keep the liquid below the top of the paper.' },
        { on: 'pour',                 say: 'Tap 🫗 Pour to pour the muddy water through.' },
        { on: 'wait:filtrate',        say: 'Watch the paper and the beaker underneath…' },
      ] },
    { id: 'g8_salt', grades: [8], icon: '💠', title: 'Salt from salt water',
      blurb: 'Evaporate the water, stop at the right moment, then let it dry.',
      lesson: 'Evaporation: heating turns the water into vapour, which escapes; the dissolved salt cannot, so it is left behind. Stop heating when crystals appear at the edge, and let the rest dry slowly - it will not spit, and the crystals grow bigger.',
      steps: [
        { on: 'mode:evap',        say: 'Tap ♨️ Evaporation bench to open it.' },
        { on: 'part:emix:salt',   say: 'Tap 🥣 Salt water — 5 g of salt in 50 cm³ of water.' },
        { on: 'goggles',          say: 'Tap 🥽 Put on goggles — a heated basin can spit.' },
        { on: 'heat',             say: 'Tap 🔥 Start heating to evaporate the water.' },
        { on: 'wait:edge',        say: 'Watch the edge of the liquid — stop as soon as the first crystals appear…' },
        { on: 'heat-off',         say: 'Crystals at the edge! Tap 🧯 Turn off the heat — do not heat it dry.' },
        { on: 'leave',            say: 'Tap 🪟 Leave it to dry — the rest evaporates slowly.' },
        { on: 'wait:dry',         say: 'Watch the salt crystals appear as it dries (time-lapse)…' },
      ] },
    { id: 'g8_ink', grades: [8], icon: '🌈', title: 'Separate the dyes in ink',
      blurb: 'Paper chromatography: find out which dyes make green ink.',
      lesson: 'Chromatography: the water soaks up the paper and dissolves the dyes in the ink spot. Each dye dissolves by a different amount, so each is carried a different distance - two spots means two dyes.',
      steps: [
        { on: 'mode:chroma',       say: 'Tap 🌈 Chromatography bench to open it.' },
        { on: 'part:ink:green',    say: 'Tap 🖊️ Green ink to put a spot on the paper.' },
        { on: 'part:line:pencil',  say: 'Tap ✏️ Drawn in pencil — always use pencil, not pen, for the start line.' },
        { on: 'part:level:low',    say: 'Tap 💧 Below the start line — water level must be below the ink spot.' },
        { on: 'run',               say: 'Tap 💧 Stand it in the water to lower the paper into the beaker.' },
        { on: 'wait:chromatogram', say: 'Watch the water climb the paper — and the spot…' },
      ] },
    { id: 'g8_which', grades: [8], icon: '🤔', title: 'Which technique?',
      blurb: 'Match a mixture to the technique that separates it - and say why.',
      lesson: 'Choose by asking what you want to keep and how the substances differ. Insoluble solid? Filter. Settled solid? Decant. Dissolved solid? Evaporate. Magnetic? Magnet. Dyes? Chromatography. The pure liquid? Distil.',
      steps: [
        { on: 'mode:choose',          say: 'Tap 🤔 Which technique? to open the chooser.' },
        { on: 'choose:iron_sulphur',  say: 'Tap 🧲 Magnetic separation — iron filings are magnetic, sulphur is not.' },
        { on: 'choose:muddy_water',   say: 'Tap 🧻 Filtration — mud is insoluble and cannot pass through filter paper.' },
      ] },

    { id: 'g7_dissolve', grades: [7], icon: '🧂', title: 'Dissolve salt and weigh it',
      blurb: 'Stir salt into water on a balance. Where does it go - and is anything lost?',
      lesson: 'Dissolving: the salt (the solute) splits into tiny particles that spread through the water (the solvent), making a solution. The balance still reads 105 g - nothing is lost, so the salt is still there.',
      steps: [
        { on: 'mode:dissolve',       say: 'Tap 🥄 Dissolving bench to open it.' },
        { on: 'part:solid:salt',     say: 'Tap 🥄 5 g of salt to weigh it out on a weighing boat.' },
        { on: 'part:dbeaker:sound',  say: 'Tap 🫙 A beaker of water — 100 g of water on the balance.' },
        { on: 'add',                 say: 'Tap 🥄 Tip it in — tip the salt into the water and watch the balance.' },
        { on: 'stir',                say: 'Tap 🥢 Stir with a glass rod.' },
        { on: 'wait:dissolved',      say: 'Watch the salt grains — and the balance…' },
      ] },
    { id: 'g7_back', grades: [7], icon: '💠', title: 'Get the salt back',
      blurb: 'Evaporate salt water - is dissolving a change you can undo?',
      lesson: 'The water evaporates and the salt is left behind, unchanged. Dissolving is a physical change: it can be undone, and no new substance is made.',
      steps: [
        { on: 'mode:evap',        say: 'Tap ♨️ Evaporation bench to open it.' },
        { on: 'part:emix:salt',   say: 'Tap 🥣 Salt water to pour it into the basin.' },
        { on: 'goggles',          say: 'Tap 🥽 Put on goggles — a heated basin can spit.' },
        { on: 'heat',             say: 'Tap 🔥 Start heating the basin.' },
        { on: 'wait:edge',        say: 'Watch the edge of the liquid for the first crystals…' },
        { on: 'heat-off',         say: 'Crystals! Tap 🧯 Turn off the heat now.' },
        { on: 'leave',            say: 'Tap 🪟 Leave it to dry somewhere warm.' },
        { on: 'wait:dry',         say: 'Watch the salt come back (time-lapse)…' },
      ] },
    { id: 'g7_water', grades: [7], icon: '💧', title: 'Get the water back too',
      blurb: 'Distil sea water: boil it, cool the steam - two changes of state.',
      lesson: 'Distillation: the water boils (liquid → gas), the steam is cooled in the condenser (gas → liquid) and pure water drips out. The salt stays behind. Both changes of state are physical changes.',
      steps: [
        { on: 'mode:distil',    say: 'Tap ⚗️ Distillation bench to open it.' },
        { on: 'build:correct',  say: 'Tap 🔧 Set up the rig — the rig will be assembled with sea water.' },
        { on: 'goggles',        say: 'Tap 🥽 Put on goggles before heating.' },
        { on: 'heat',           say: 'Tap 🔥 Start heating the flask.' },
        { on: 'wait:distillate',say: 'Follow the steam into the cold condenser — and watch the drops of water…' },
      ] },
    { id: 'g7_kinds', grades: [7], icon: '🔹', title: 'Element, compound or mixture?',
      blurb: 'Sort substances by what they are made of - and say why.',
      lesson: 'An element has one kind of atom. A compound has two or more elements chemically joined. A mixture has substances that are not joined, so they can be separated by physical means.',
      steps: [
        { on: 'mode:choose',   say: 'Tap 🔹 Element or mixture? to open the sorting bench.' },
        { on: 'choose:iron',   say: 'Tap 🔹 Element — iron has only iron atoms (symbol Fe).' },
        { on: 'choose:air',    say: 'Tap 🥣 Mixture — air has nitrogen, oxygen and other gases, not chemically joined.' },
      ] },
  );

  // 💡 facts for Grades 7 and 8.
  const FACTS_LOW = [
    'At Tamarin, sea water is left in shallow pans so the Sun evaporates it - the salt stays behind.',
    'Salt dissolves about as well in cold water as in hot: 36 g in 100 g of water at 20 °C, 39 g at 100 °C.',
    'Sugar is far more soluble than salt: about 200 g dissolves in 100 g of water at 20 °C.',
    'A tea bag is a filter: the hot water and the dissolved flavour pass through, the leaves stay inside.',
    'Water works let mud settle out of river water and then filter it - decantation and filtration on a giant scale.',
    'Scrap yards lift iron and steel out of mixed scrap with huge electromagnets.',
    'Scientists use chromatography to compare inks - for example, to check whether a signature was forged.',
    'Air is a mixture: about 78% nitrogen, 21% oxygen and small amounts of argon, carbon dioxide and other gases.',
    'When sugar dissolves, its particles spread out between the water particles - and the mass stays the same.',
    'Filter paper is full of tiny holes: water and dissolved particles fit through, grains of sand and mud do not.',
    'Heating sugar strongly turns it into caramel and then black carbon - a chemical change you cannot undo.',
    'Everything in the Periodic Table is an element - 118 of them are known.',
  ];

  return { ROOM, TIME_LAPSE, POINTS, STEAM_PER_CM3, FLASKS, DISTIL, PARTS, PART_ORDER, ERROR_ORDER, checkRig, RIGS, liquidBoils,
           SOLUBILITY, solubility, saturatedAt, crystalsAt, CRYSTAL, crystalPoint, crustPoint,
           SUBLIME_MIXES, SUB_PARTS, SUB_ORDER, SUB, checkSublime, CATCH,
           TECHNIQUES, PRINCIPLES, TECH_PRINCIPLE, MIXTURES,
           DISCOVERIES, HAZARDS, RESULTS, CARD_DISC, FACTS, MISSIONS, GUIDES, SIGN_LABELS,
           GRADES, forGrade, MODES_BY_GRADE, checkParts,
           FIL_MIXES, FIL_PARTS, FIL_ORDER, FILTER, checkFilter,
           EVAP_MIXES, EVA_PARTS, EVA_ORDER, EVAP, edgePoint,
           INKS, CHR_PARTS, CHR_ORDER, CHROMA, checkChroma,
           SOLIDS, DIS_PARTS, DIS_ORDER, DISSOLVE, checkDissolve, massOnBalance,
           TECH8, PRIN8, TP8, MIX8, KIND7, PRIN7, KP7, MIX7, CHOOSE, DONE_DISC, DRY_CARD, FACTS_LOW, PIC };
})();
if (typeof window !== 'undefined') window.LabSeparationData = LabSeparationData;
