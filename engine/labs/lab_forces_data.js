'use strict';
// ══════════════════════════════════════════════
//  Science Labs › Forces & Pressure — the science.
//
//  Every number, formula, hazard, guide, discovery and mission lives HERE.
//  lab_forces.js only animates and draws. Fix a wrong reading here, not there.
//
//  Grounded in subjects/grade8-science:
//    g8s-forces  — types_forces, measuring_force, gravity_effects
//    g8s-pressure — pressure_definition, pressure_in_fluids, pressure_calculations
//    batch2_forces.js: g8s-forces-016..020, g8s-pressure-016..020
//
//  Formula: P = F ÷ A  (Pa = N ÷ m²)
//  Weight:  W = m × g  (g = 10 N/kg on Earth)
// ══════════════════════════════════════════════
const LabForcesData = (() => {

  const GRADES = [8];
  const forGrade = (list, g) => list.filter(x => (x.grades || [8]).includes(g));
  const G_EARTH = 10;   // N/kg — gravitational field strength, Grade 8 value

  // ── Objects for the spring balance ──────────
  // weight = mass × G_EARTH (all exact integers or one decimal)
  const OBJECTS = {
    feather: { name: 'Feather',        short: 'feather',  mass: 0.005, weight: 0.05, swatch: '#F5F0E8', icon: '🪶',
               meta: '0.005 kg · 0.05 N', maxSafe: true,
               desc: 'Almost too light to read on a basic spring balance.' },
    wooden:  { name: 'Wooden block',   short: 'wood',     mass: 0.1,   weight: 1,    swatch: '#C8A26A', icon: '🟫',
               meta: '100 g · 1 N', maxSafe: true,
               desc: 'A light block of dry wood.' },
    stone:   { name: 'Small stone',    short: 'stone',    mass: 0.3,   weight: 3,    swatch: '#8A9BA3', icon: '🪨',
               meta: '300 g · 3 N', maxSafe: true,
               desc: 'A smooth pebble from the beach.' },
    iron:    { name: 'Iron block',     short: 'iron',     mass: 0.5,   weight: 5,    swatch: '#6E7E85', icon: '⬛',
               meta: '500 g · 5 N', maxSafe: true,
               desc: 'Dense and heavy for its size.' },
    bottle:  { name: 'Water bottle',   short: 'bottle',   mass: 1.0,   weight: 10,   swatch: '#A0D4F5', icon: '🍶',
               meta: '1 kg · 10 N', maxSafe: true,
               desc: 'A full 1-litre bottle of water.' },
    brick:   { name: 'Brick',          short: 'brick',    mass: 2.5,   weight: 25,   swatch: '#C47C4A', icon: '🧱',
               meta: '2.5 kg · 25 N — TOO HEAVY', maxSafe: false,
               desc: 'Way beyond the spring balance\'s 10 N limit.' },
  };
  const SHELF_OBJECTS = ['feather', 'wooden', 'stone', 'iron', 'bottle', 'brick'];

  // Spring balance limits
  const SPRING = {
    maxSafe: 10,   // N — maximum load before permanent deformation
    maxPx: 72,     // px extension at full safe load (used by the canvas)
    pxPerN: 7.2,   // 72 / 10
  };

  // ── Pressure pads ────────────────────────────
  // area in cm² and m² (1 cm² = 0.0001 m²)
  const PADS = {
    flat:  { name: 'Wide flat plate', short: 'flat plate', areaCm2: 100, areaM2: 0.01,   swatch: '#A8C5B5', icon: '▬',
             desc: 'A wide surface spreads the force.' },
    tile:  { name: 'Square tile',     short: 'square tile', areaCm2: 25, areaM2: 0.0025,  swatch: '#D4C29A', icon: '⬜',
             desc: 'Medium area — moderate pressure.' },
    heel:  { name: 'Stiletto heel',   short: 'stiletto',  areaCm2: 2,   areaM2: 0.0002,  swatch: '#E8949A', icon: '👠',
             desc: 'A tiny heel tip concentrates the force.' },
    nail:  { name: 'Sharp nail tip',  short: 'nail tip',   areaCm2: 1,   areaM2: 0.0001,  swatch: '#8A8A8A', icon: '📌',
             desc: 'An extremely small point — very high pressure.' },
  };
  const SHELF_PADS = ['flat', 'tile', 'heel', 'nail'];
  const FORCES_N = [10, 20, 50];

  // P = F / A — all values exact; unit is Pa (N/m²)
  // 1 cm² = 0.0001 m², so 1 N/cm² = 10 000 Pa
  function calcPressure(forceN, padId) {
    const pad = PADS[padId];
    if (!forceN || !pad) return null;
    const pa = Math.round(forceN / pad.areaM2);
    const nPerCm2 = forceN / pad.areaCm2;
    return { pa, nPerCm2: +nPerCm2.toFixed(4), forceN, areaCm2: pad.areaCm2, areaM2: pad.areaM2 };
  }

  // Indentation depth for the canvas (logarithmic so all pressures are visible)
  function indentDepth(pa) {
    return Math.min(58, Math.max(3, 10 + 9 * Math.log10(Math.max(10, pa / 100))));
  }

  // ── Hazards ─────────────────────────────────
  const HAZARDS = {
    overload: {
      signs: ['warning'], fx: 'spring_snap',
      title: () => 'Stop — the spring balance is overloaded',
      happened: c => `You hung the ${c.obj} (${c.weight} N) on a spring balance rated to ${SPRING.maxSafe} N. The spring stretched beyond its elastic limit and will not return to its original length.`,
      why: 'A spring obeys Hooke\'s Law only up to its elastic limit. Beyond that the coils are pulled apart permanently — the scale reads wrongly ever after.',
      instead: `Check the maximum load printed on the spring balance before you use it. This one is rated to ${SPRING.maxSafe} N. The brick weighs 25 N — use scales or a newtonmeter rated for heavier objects.`,
      exam: 'A spring balance (newtonmeter) measures force in newtons. It has a maximum load: exceeding it gives inaccurate readings and damages the spring permanently.',
    },
  };

  // ── Result cards (wrong but safe) ────────────
  const RESULTS = {
    mass_weight: {
      icon: '⚖️',
      title: () => 'Mass and weight are not the same thing',
      happened: c => `You recorded the ${c.obj} as "${c.mass} newtons" — but newtons measure force (weight), not mass. Its mass is ${c.mass} kg and its weight is ${c.weight} N.`,
      instead: 'Mass (kg) is the amount of matter. Weight (N) is the gravitational force on that mass. W = m × g. On Earth (g = 10 N/kg), a 1 kg mass weighs 10 N.',
      exam: 'Weight = mass × g. Weight is a force measured in newtons (N); mass is measured in kilograms (kg). They are different quantities.',
    },
    wrong_units: {
      icon: '📐',
      title: () => 'Pressure units: N/cm² is not Pa',
      happened: c => `You wrote the pressure as ${c.nPerCm2} N/cm² without converting to Pa. In the NCE exam all pressures are in pascals (Pa = N/m²).`,
      instead: '1 cm² = 0.0001 m², so 1 N/cm² = 10 000 Pa. Always convert the area to m² before dividing: P (Pa) = F (N) ÷ A (m²).',
      exam: 'The SI unit of pressure is the pascal (Pa). 1 Pa = 1 N/m². Convert area to m² before calculating.',
    },
  };
  const CARD_ORDER = ['mass_weight', 'wrong_units'];

  // ── Discoveries ──────────────────────────────
  // how: recipe in guide-event tokens (see WAITS below and the lab vocab)
  // rule: unlocks on a finished, correct reading
  // card: unlocks when its result card is shown
  const D8 = [8];
  const DISCOVERIES = [
    { id: 'force_changes', icon: '🔄', title: 'Forces change motion and shape', hint: 'Hang something and watch the spring', grades: D8,
      rule: { obj: 'wooden' },
      how: ['mode:bench', 'obj:wooden', 'read'],
      saw: 'The spring stretched when the wooden block hung on it.',
      learn: 'A force is a push or a pull. Forces can change an object\'s speed, direction or shape. The hanging block stretches the spring — a force acting downward.' },

    { id: 'weight_formula', icon: '🌍', title: 'W = m × g: weight is a force', hint: 'Measure the stone and work backwards', grades: D8,
      rule: { obj: 'stone' },
      how: ['mode:bench', 'obj:stone', 'read'],
      saw: 'The stone read 3 N. Its mass is 0.3 kg. 0.3 × 10 = 3 N.',
      learn: 'Weight is the gravitational force on a mass. W = m × g. On Earth g = 10 N/kg, so every 1 kg weighs 10 N. Weight is a force measured in newtons — not a mass in kilograms.' },

    { id: 'spring_proportional', icon: '🌀', title: 'Bigger force, bigger stretch', hint: 'Compare two different objects', grades: D8,
      rule: { obj: 'iron' },
      how: ['mode:bench', 'obj:iron', 'read'],
      saw: 'The iron block (5 N) stretched the spring twice as far as the stone (3 N… well, nearly). The heavier the object, the longer the spring.',
      learn: 'Within its elastic limit a spring stretches in proportion to the force. That is Hooke\'s Law. A spring balance uses this — each newton adds the same extra stretch.' },

    { id: 'gravity_down', icon: '🍎', title: 'Gravity always pulls downward', hint: 'Watch the direction the spring stretches', grades: D8,
      rule: { obj: 'bottle' },
      how: ['mode:bench', 'obj:bottle', 'read'],
      saw: 'The spring always stretched downward, whatever the object. Gravity pulls toward the centre of the Earth.',
      learn: 'Gravity is a force that pulls every object toward the Earth\'s centre. The weight of an object acts vertically downward — that is why a spring balance hangs vertically.' },

    { id: 'mass_vs_weight', icon: '🌙', title: 'Mass stays the same; weight depends on gravity', hint: 'Think about the astronaut on the Moon', grades: D8,
      card: 'mass_weight',
      how: ['mode:bench', 'obj:stone', 'read', 'card:mass_weight'],
      saw: 'Reading "3 newtons" for the stone — and nearly writing its mass as 3 N instead of 0.3 kg.',
      learn: 'Mass (kg) is the amount of matter in an object — it never changes. Weight (N) is the gravitational pull on that mass: it changes if g changes. On the Moon (g ≈ 1.6 N/kg) the stone would weigh only about 0.48 N, but its mass is still 0.3 kg.' },

    { id: 'spring_limit', icon: '💥', title: 'Every spring has a limit', hint: 'Try the heaviest object on the shelf', grades: D8,
      card: 'overload',
      how: ['mode:bench', 'obj:brick', 'card:overload'],
      saw: 'The spring balance was wrecked by the brick — 25 N is way over its 10 N limit.',
      learn: 'A spring obeys Hooke\'s Law up to its elastic limit only. Exceed it and the coils are permanently pulled apart: the balance reads wrongly. Always check the maximum load before using a newtonmeter.' },

    { id: 'pressure_def', icon: '📐', title: 'P = F ÷ A: pressure is force per area', hint: 'Press a pad and read the formula chips', grades: D8,
      rule: { padId: 'tile', forceN: 20 },
      how: ['mode:pressure', 'pad:tile', 'force:20', 'apply', 'read'],
      saw: '20 N on 25 cm² (0.0025 m²) gave 8 000 Pa.',
      learn: 'Pressure = force ÷ area. The unit is the pascal (Pa), which equals 1 N/m². The same force on a smaller area gives a higher pressure — the force is more concentrated.' },

    { id: 'small_area', icon: '📌', title: 'Small area, high pressure', hint: 'Try the nail tip with any force', grades: D8,
      rule: { padId: 'nail' },
      how: ['mode:pressure', 'pad:nail', 'force:10', 'apply', 'read'],
      saw: 'The nail tip (1 cm²) with just 10 N gave 100 000 Pa — as much as the atmosphere!',
      learn: 'A drawing pin penetrates wood because its tiny tip concentrates the force onto a tiny area. The same finger force on a flat thumb pushes less than 1 000 Pa: the thumb doesn\'t go in.' },

    { id: 'stiletto_effect', icon: '👠', title: 'Why high heels damage soft ground', hint: 'Compare the stiletto and the flat plate at the same force', grades: D8,
      rule: { padId: 'heel' },
      how: ['mode:pressure', 'pad:heel', 'force:10', 'apply', 'read'],
      saw: 'A 10 N stiletto heel (2 cm²) gave 50 000 Pa. The same force on the flat plate (100 cm²) gave only 1 000 Pa.',
      learn: 'A 50 kg person standing on one stiletto heel exerts about 2 500 000 Pa on soft ground — enough to sink into grass or soil. Flat shoes spread the weight and cause far less damage. This is also why wide tyres are used on soft ground.' },

    { id: 'pressure_fluids', icon: '🌊', title: 'Pressure in a liquid increases with depth', hint: 'Think about a dam — why is it thicker at the bottom?', grades: D8,
      rule: { padId: 'flat', forceN: 50 },
      how: ['mode:pressure', 'pad:flat', 'force:50', 'apply', 'read'],
      saw: 'Greater force → greater pressure. In a liquid, deeper water has more water above it, giving more pressure.',
      learn: 'In a liquid, pressure increases with depth because more liquid is above. A dam is thicker at the base because the water pressure there is greatest. That is also why submarines must be built very strong.' },

    { id: 'unit_conversion', icon: '🔢', title: '1 cm² = 0.0001 m²: always convert', hint: 'Get the unit wrong and see what happens', grades: D8,
      card: 'wrong_units',
      how: ['mode:pressure', 'pad:flat', 'force:10', 'apply', 'read', 'card:wrong_units'],
      saw: '10 N on 100 cm² seemed like 0.1 N/cm². But in Pa (N/m²) it is 1 000 Pa.',
      learn: '1 cm = 0.01 m, so 1 cm² = (0.01)² = 0.0001 m². Forgetting to convert gives a pressure 10 000 times too small. Always convert area to m² before using P = F/A.' },

    { id: 'atmospheric', icon: '🌬️', title: 'Atmospheric pressure is about 100 000 Pa', hint: 'The nail tip at 10 N reaches about that…', grades: D8,
      rule: { padId: 'nail', forceN: 10 },
      how: ['mode:pressure', 'pad:nail', 'force:10', 'apply', 'read'],
      saw: 'The nail tip with 10 N gives 100 000 Pa — roughly one atmosphere.',
      learn: 'The atmosphere pushes on everything with about 100 000 Pa (100 kPa = 1 atm). That is the weight of all the air above a 1 m² patch of ground. We don\'t feel it because the pressure inside our bodies is the same.' },

    { id: 'hydraulics', icon: '🏗️', title: 'Pascal\'s principle: pressure transmits through liquids', hint: 'Pressure pads in a liquid — press one, all feel it', grades: D8,
      rule: { padId: 'heel', forceN: 50 },
      how: ['mode:pressure', 'pad:heel', 'force:50', 'apply', 'read'],
      saw: '50 N on 2 cm² gave 250 000 Pa — enough to push a hydraulic piston hard.',
      learn: 'Pressure applied to a fluid spreads equally in all directions. That is Pascal\'s principle. A car hydraulic brake: a small force on the pedal (small area, high pressure) is transmitted through the fluid to a large piston, producing a large force at the brakes.' },
  ];

  // Which rule discoveries a completed reading unlocks
  function discoveriesFor(obj, padId, forceN) {
    return DISCOVERIES.filter(d => {
      if (!d.rule) return false;
      if (d.rule.obj && d.rule.obj !== obj) return false;
      if (d.rule.padId && d.rule.padId !== padId) return false;
      // forceN match is optional — any force unlocks pad-based discoveries unless specified
      if (d.rule.forceN && d.rule.forceN !== forceN) return false;
      return true;
    }).map(d => d.id);
  }

  // ── Guided experiments ─────────────────────────
  // Tokens: mode:<bench|pressure> · obj:<id> · remove · read · pad:<id> · force:<n> · apply · card:<id>
  // WAITS: none in this lab (all actions are student-initiated)
  const WAITS = [];   // kept for harness compatibility
  const GUIDES = [
    { id: 'weigh_objects', icon: '⚖️', title: 'Measure the weight of objects', grades: D8,
      blurb: 'Hang each object on the spring balance, read the scale in N, and record it.',
      lesson: 'Each object stretches the spring by a different amount. Heavier objects pull down harder. Weight (N) = mass (kg) × 10.',
      steps: [
        { on: 'mode:bench',  say: 'Tap ⚖️ Force Bench to switch mode.' },
        { on: 'obj:wooden',  say: 'Tap the 🟫 wooden block to hang it on the spring balance.' },
        { on: 'read',        say: 'Tap 📋 Record to save the reading.' },
        { on: 'obj:stone',   say: 'Tap the 🪨 stone to hang it next.' },
        { on: 'read',        say: 'Tap 📋 Record.' },
        { on: 'obj:iron',    say: 'Tap the ⬛ iron block.' },
        { on: 'read',        say: 'Tap 📋 Record.' },
        { on: 'obj:bottle',  say: 'Tap the 🍶 water bottle.' },
        { on: 'read',        say: 'Tap 📋 Record — then compare all four weights.' },
      ] },

    { id: 'flat_vs_heel', icon: '👠', title: 'High heels or flat shoes?', grades: D8,
      blurb: 'Same force on two pad shapes. Which causes more pressure — and more damage to soft ground?',
      lesson: 'The same force concentrated into a tiny area gives far more pressure. A stiletto heel sinks into soft ground; a flat shoe spreads the force and stays on top.',
      steps: [
        { on: 'mode:pressure', say: 'Tap 📐 Pressure Pad to switch mode.' },
        { on: 'pad:flat',      say: 'Tap ▬ the wide flat plate.' },
        { on: 'force:10',      say: 'Tap 10 N to set the force.' },
        { on: 'apply',         say: 'Tap ▼ Apply Force — watch the indentation.' },
        { on: 'read',          say: 'Tap 📋 Record the pressure.' },
        { on: 'pad:heel',      say: 'Tap 👠 the stiletto heel.' },
        { on: 'force:10',      say: 'Tap 10 N again — same force.' },
        { on: 'apply',         say: 'Tap ▼ Apply Force.' },
        { on: 'read',          say: 'Tap 📋 Record — compare the two pressures!' },
      ] },

    { id: 'predict_pressure', icon: '🧮', title: 'Predict the pressure first', grades: D8,
      blurb: 'Use P = F ÷ A to predict the pressure, then test it.',
      lesson: 'P = F ÷ A. Convert the area to m² first: 25 cm² = 0.0025 m². 20 N ÷ 0.0025 m² = 8 000 Pa.',
      steps: [
        { on: 'mode:pressure', say: 'Tap 📐 Pressure Pad to switch mode.' },
        { on: 'pad:tile',      say: 'Tap ⬜ the square tile (25 cm²).' },
        { on: 'force:20',      say: 'Tap 20 N to set the force.' },
        { on: 'apply',         say: 'Tap ▼ Apply Force. Does it match your prediction?' },
        { on: 'read',          say: 'Tap 📋 Record the result.' },
        { on: 'pad:nail',      say: 'Tap 📌 the nail tip (1 cm²). Predict the pressure first!' },
        { on: 'force:20',      say: 'Tap 20 N — same force.' },
        { on: 'apply',         say: 'Tap ▼ Apply Force.' },
        { on: 'read',          say: 'Tap 📋 Record — was P = F ÷ A correct?' },
      ] },
  ];

  // ── Missions ────────────────────────────────
  // First option is the answer; Labs.quiz() shuffles.
  const MISSIONS = [
    { id: 'spring_survey', icon: '⚖️', title: 'Spring balance survey', grades: D8,
      blurb: 'Measure 4 objects, fill the results table, then answer exam-style questions.',
      intro: 'Spring balance survey! Hang each object and record its weight in N. When you\'ve measured all four, answer the questions.',
      needs: ['wooden', 'stone', 'iron', 'bottle'],
      quiz: [
        { q: 'What instrument is used to measure force?',
          options: ['A spring balance (newtonmeter)', 'A ruler', 'A thermometer', 'A balance scale'],
          why: 'A spring balance (newtonmeter) measures force in newtons by how much the spring stretches. A balance scale compares masses, not forces.' },
        { q: 'What is the unit of force?',
          options: ['Newton (N)', 'Kilogram (kg)', 'Pascal (Pa)', 'Joule (J)'],
          why: 'Force is measured in newtons (N), named after Sir Isaac Newton. Kilograms measure mass, pascals measure pressure and joules measure energy.' },
        { q: 'A mass of 3 kg rests on a table. What is its weight? (g = 10 N/kg)',
          options: ['30 N', '3 N', '300 N', '0.3 N'],
          why: 'W = m × g = 3 × 10 = 30 N. Multiplying by 1 gives the mass itself, not the weight.' },
        { q: 'A stone weighs 3 N on Earth. What is its mass?',
          options: ['0.3 kg', '3 kg', '30 kg', '300 kg'],
          why: 'W = m × g, so m = W ÷ g = 3 ÷ 10 = 0.3 kg. Confusing 3 N with 3 kg forgets to divide by g.' },
        { q: 'An astronaut on the Moon (g = 1.6 N/kg) carries a 2 kg rock. What is its weight on the Moon?',
          options: ['3.2 N', '20 N', '2 N', '12.5 N'],
          why: 'W = m × g = 2 × 1.6 = 3.2 N. The mass stays 2 kg, but gravity is weaker on the Moon so the weight is less.' },
      ] },

    { id: 'pressure_detective', icon: '🔍', title: 'Pressure detective', grades: D8,
      blurb: 'Calculate pressure for 3 scenarios and rank them. Then answer the quiz.',
      intro: 'Pressure detective! Use the pad to investigate three scenarios. Which setup gives the highest pressure? Calculate P = F ÷ A for each, then answer the questions.',
      scenarios: [
        { padId: 'flat', forceN: 50, label: 'Elephant foot (50 N, 100 cm²)' },
        { padId: 'heel', forceN: 20, label: 'Stiletto heel (20 N, 2 cm²)' },
        { padId: 'nail', forceN: 10, label: 'Drawing pin (10 N, 1 cm²)' },
      ],
      quiz: [
        { q: 'A force of 30 N presses on an area of 0.003 m². What is the pressure in Pa?',
          options: ['10 000 Pa', '90 Pa', '0.0001 Pa', '30 000 Pa'],
          why: 'P = F ÷ A = 30 ÷ 0.003 = 10 000 Pa. Multiplying gives 0.09 — not the formula for pressure.' },
        { q: 'A drawing pin penetrates wood more easily than a flat thumb. Why?',
          options: ['The pin concentrates the same force over a tiny area, giving a much higher pressure',
                    'The pin is made of harder metal than the thumb',
                    'The thumb is too wet to create friction with the wood',
                    'The pin has a greater force applied to it'],
          why: 'P = F/A. Same force, but the pin\'s area is tiny — the pressure is enormous. A flat thumb spreads the force over a large area, so the pressure is low.' },
        { q: 'Why is it easier to walk on soft sand with a surfboard under your feet than with bare feet?',
          options: ['The surfboard spreads your weight over a larger area, reducing pressure on the sand',
                    'The surfboard weighs less than you do',
                    'The surfboard has a stronger force on it',
                    'The sand sticks to the surfboard and holds you up'],
          why: 'The surfboard spreads F over a large area — pressure drops. Bare feet have a small area, so pressure is high and you sink in.' },
        { q: 'A girl of mass 50 kg balances on one stiletto heel with contact area 0.0002 m². What pressure does she exert? (g = 10 N/kg)',
          options: ['2 500 000 Pa', '250 000 Pa', '25 000 Pa', '500 Pa'],
          why: 'W = 50 × 10 = 500 N. P = 500 ÷ 0.0002 = 2 500 000 Pa. That\'s 25 times atmospheric pressure — no wonder heels damage soft floors.' },
        { q: 'Which unit is equivalent to one pascal (1 Pa)?',
          options: ['1 N/m²', '1 kg/m²', '1 N·m', '1 N/cm²'],
          why: 'Pressure = force ÷ area. The SI unit is N/m², which is called one pascal (Pa). N/cm² is not SI; it must be converted (1 N/cm² = 10 000 Pa).' },
      ] },
  ];

  // Quick science facts for the 💡 button
  const FACTS = [
    'A force is a push or a pull. Forces are measured in newtons (N), named after Sir Isaac Newton.',
    'Weight is the gravitational force on a mass: W = m × g. On Earth g = 10 N/kg.',
    'Mass (kg) measures the amount of matter. Weight (N) measures the gravitational pull. They are different.',
    'On the Moon gravity is about one-sixth of Earth\'s, so you would weigh six times less — but your mass stays the same.',
    'A spring balance (newtonmeter) works because a spring stretches in proportion to the force on it.',
    'Every spring has an elastic limit. Beyond it the coils are pulled apart permanently — the spring doesn\'t return to its original length.',
    'Pressure = force ÷ area. The same force on a smaller area gives higher pressure.',
    'One pascal (Pa) = one newton per square metre (1 N/m²). Named after Blaise Pascal.',
    'Atmospheric pressure at sea level is about 100 000 Pa (100 kPa). It is the weight of the air column above every 1 m² of ground.',
    'A stiletto heel can exert more pressure on a floor than a fully loaded elephant — because the area is so tiny.',
    'Pressure in a liquid increases with depth. That is why dams are built thicker at the base.',
    'Pascal\'s principle: pressure applied to a fluid spreads equally in all directions. Hydraulic brakes and lifts use this.',
    'A drawing pin has a flat head and a sharp point. The same push on the head gives enormous pressure at the point.',
    'Friction is a force that opposes sliding motion between surfaces. It acts in the direction opposite to movement.',
    'Upthrust (buoyancy) is an upward force from a fluid. An object floats when upthrust equals its weight.',
  ];

  return {
    GRADES, forGrade,
    G_EARTH, SPRING,
    OBJECTS, SHELF_OBJECTS,
    PADS, SHELF_PADS, FORCES_N,
    calcPressure, indentDepth,
    HAZARDS, RESULTS, CARD_ORDER,
    DISCOVERIES, discoveriesFor,
    WAITS, GUIDES, MISSIONS,
    FACTS,
  };
})();
if (typeof window !== 'undefined') window.LabForcesData = LabForcesData;
