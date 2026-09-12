'use strict';
// ══════════════════════════════════════════════
//  Science Labs — Work, Energy & Power (Grade 8).
//
//  Every formula, value, guide, discovery, mission, hazard and fact lives
//  here. lab_energy.js only animates and draws. Fix a wrong number here.
//
//  Grounded in subjects/grade8-science chapter g8s-work-energy (subsections
//  work_done, power_rate, work_energy_power) and batch2_work_energy.js
//  (g8s-work-energy-016..020).
//
//  Stage: an inclined plane at 30°. Two modes:
//    lift  — pull object straight up. F = m×g, d = height. W = F×d.
//    ramp  — pull object up the 30° slope. F = m×g×sin30° = weight/2,
//            d = height/sin30° = 2×height. W = F×d = same as lift.
//  g = 10 N/kg (school value). All W, GPE and P values are exact integers
//  or clean 1 dp for every offered mass × height combination.
// ══════════════════════════════════════════════
const LabEnergyData = (() => {

  const GRADES = [8];
  const forGrade = (list, g) => list.filter(x => (x.grades || [8]).includes(Number(g)));
  const G_EARTH = 10;   // N/kg

  // Ramp angle: 30°. sin(30°) = 0.5 exactly — keeps every value clean.
  const RAMP_ANGLE_DEG = 30;
  const RAMP_SIN = 0.5;

  // Available masses. weight = mass × G_EARTH (all exact integers).
  const MASSES = [
    { kg: 0.2, weight: 2,  label: '200 g', color: '#E07B54' },
    { kg: 0.5, weight: 5,  label: '500 g', color: '#5B8DD9' },
    { kg: 1.0, weight: 10, label: '1 kg',  color: '#4AAB68' },
  ];

  // Available heights (m). W = weight × height — checked below for every combo.
  const HEIGHTS = [
    { m: 0.5, label: '0.5 m' },
    { m: 1.0, label: '1.0 m' },
    { m: 2.0, label: '2.0 m' },
  ];

  // ── Core formulas ─────────────────────────────
  // Lift:  F = weight (N),        d = height (m),    W = weight × height (J)
  // Ramp:  F = weight × sin(30°), d = height/sin(30°), W = same
  function calcWork(mode, massIdx, heightIdx) {
    const M = MASSES[massIdx], H = HEIGHTS[heightIdx];
    if (!M || !H) return null;
    if (mode === 'lift') {
      return { force: M.weight, dist: H.m, work: +(M.weight * H.m).toFixed(1) };
    }
    const force = +(M.weight * RAMP_SIN).toFixed(1);
    const dist  = +(H.m / RAMP_SIN).toFixed(1);
    const work  = +(force * dist).toFixed(1);
    return { force, dist, work };
  }

  // GPE = m × g × h (ideal lifting — equals the lift work for every combo).
  function calcGPE(massIdx, heightIdx) {
    const M = MASSES[massIdx], H = HEIGHTS[heightIdx];
    if (!M || !H) return null;
    return +(M.kg * G_EARTH * H.m).toFixed(1);
  }

  // P = W / t. Returns null when t ≤ 0.
  function calcPower(workJ, timeS) {
    if (!timeS || timeS <= 0) return null;
    return +(workJ / timeS).toFixed(2);
  }

  // ── Hazards ──────────────────────────────────
  const HAZARDS = {
    rope_release: {
      signs: ['warning'], fx: 'slide',
      title: () => 'Stop — the load is out of control',
      happened: c => `You let go of the rope while the ${c.label || 'load'} was on the ramp. It slid back and hit the stop at the bottom.`,
      why: 'A mass raised on a ramp stores gravitational potential energy (GPE = mgh). Release the rope and all that GPE converts to kinetic energy — the load accelerates down the slope and can injure anyone near the base.',
      instead: 'Always keep the rope taut. Lower the load gently back to the start after the experiment, controlling it the whole way down.',
      exam: 'GPE = mgh. A raised mass on a ramp stores energy. When released without control, GPE converts to KE and the load accelerates down the slope. Loads on inclined planes must always be controlled.',
    },
  };

  // ── Result cards (wrong but safe) ────────────
  const RESULTS = {
    no_work_held: {
      icon: '🤲',
      title: () => 'Holding still = no work done (W = 0)',
      happened: () => 'You held the object at the top without letting it move. The Work chip stayed at 0 J even though your arm was tired.',
      instead: 'Work = force × distance. If the distance is zero, the work is zero — no matter how large the force or how long you hold it. Work is about movement, not effort.',
      exam: 'W = F × d. If d = 0 (the object does not move), W = 0 J. A person pushing hard against a wall does no work on the wall because the wall does not move.',
    },
    wrong_direction: {
      icon: '➡️',
      title: () => 'Force and displacement must be in the same direction',
      happened: () => 'The object moved horizontally but the force was vertical — the Work chip showed 0 J for that component.',
      instead: 'W = F × d only when the force and the displacement are parallel. Carrying a bag horizontally does no work against gravity because the bag does not move upward.',
      exam: 'Work = force × displacement in the direction of the force. Carrying a heavy bag horizontally does no work against gravity (vertical distance = 0), even though the carrier feels tired.',
    },
    ramp_efficiency: {
      icon: '♻️',
      title: () => 'Real ramps lose energy to friction — efficiency < 100%',
      happened: () => 'The actual force needed to pull up the ramp was a little more than the ideal 2.5 N the formula predicted.',
      instead: 'Efficiency = (useful output energy ÷ total input energy) × 100%. On an ideal frictionless ramp it is 100%. On a real ramp, friction converts some input energy into heat, so you must do more work than GPE alone requires.',
      exam: 'Efficiency = (useful output ÷ total input) × 100%. A machine is never 100% efficient because friction converts some energy into heat. Work input = GPE gained + heat from friction.',
    },
  };
  const CARD_ORDER = ['no_work_held', 'wrong_direction', 'ramp_efficiency'];

  // ── Discoveries ──────────────────────────────
  // rule: unlocked when a completed experiment matches the rule.
  // card: unlocked when that result/hazard card appears.
  // how:  guide recipe for "Show me how" (event tokens the lab understands).
  // All must have: title, icon, hint, saw, learn, how, and rule OR card.
  const D8 = [8];
  const DISCOVERIES = [
    { id: 'work_formula', grades: D8, icon: '💪', title: 'W = F × d: the work formula',
      hint: 'Pull the 500 g mass 1 m straight up',
      rule: { mode: 'lift', massIdx: 1, heightIdx: 1 },
      how: ['mode:lift', 'mass:1', 'height:1', 'pull', 'read'],
      saw: 'Force 5 N × distance 1.0 m = 5 J of work.',
      learn: 'Work (J) = force (N) × distance (m). Work is done only when a force moves an object. A larger force, or a longer distance, means more work.' },

    { id: 'joule_unit', grades: D8, icon: '🔩', title: '1 joule = 1 newton × 1 metre',
      hint: 'Lift 200 g exactly 0.5 m',
      rule: { mode: 'lift', massIdx: 0, heightIdx: 0 },
      how: ['mode:lift', 'mass:0', 'height:0', 'pull', 'read'],
      saw: '2 N × 0.5 m = 1.0 J exactly.',
      learn: 'The joule (J) is the unit of work and energy. 1 J = 1 N·m. James Joule showed in the 1840s that mechanical work and heat are both forms of energy.' },

    { id: 'gpe_formula', grades: D8, icon: '🌍', title: 'GPE = mgh: gravitational potential energy',
      hint: 'Lift 500 g a height of 2 m',
      rule: { mode: 'lift', massIdx: 1, heightIdx: 2 },
      how: ['mode:lift', 'mass:1', 'height:2', 'pull', 'read'],
      saw: 'Lifting 0.5 kg by 2 m: GPE = 0.5 × 10 × 2 = 10 J.',
      learn: 'Gravitational potential energy (GPE) = mass × g × height. On Earth g = 10 N/kg. Every metre you raise an object gives it mgh more joules of stored energy.' },

    { id: 'work_equals_gpe', grades: D8, icon: '⚖️', title: 'Work done lifting = GPE gained (ideal)',
      hint: 'Lift 1 kg by 2 m and compare work with GPE',
      rule: { mode: 'lift', massIdx: 2, heightIdx: 2 },
      how: ['mode:lift', 'mass:2', 'height:2', 'pull', 'read'],
      saw: 'Work done = 10 N × 2 m = 20 J. GPE gained = 1 × 10 × 2 = 20 J. Equal!',
      learn: 'On an ideal (frictionless) lift, all the work you do goes into GPE. Work done against gravity = mgh = GPE stored. Energy is conserved.' },

    { id: 'power_formula', grades: D8, icon: '⚡', title: 'P = W/t: the power formula',
      hint: 'Time how long it takes to lift 500 g by 1.0 m',
      rule: { mode: 'lift', massIdx: 1, heightIdx: 1, timed: true },
      how: ['mode:lift', 'mass:1', 'height:1', 'timer', 'pull', 'read'],
      saw: '5 J done in a certain time gave a power readout in watts.',
      learn: 'Power (W) = work done (J) ÷ time taken (s). Power measures how fast the work is done. A more powerful machine does the same job faster.' },

    { id: 'watt_unit', grades: D8, icon: '💡', title: '1 watt = 1 joule per second',
      hint: 'Time the 200 g lift to 0.5 m — aim for 1 second',
      rule: { mode: 'lift', massIdx: 0, heightIdx: 0, timed: true },
      how: ['mode:lift', 'mass:0', 'height:0', 'timer', 'pull', 'read'],
      saw: '1 J done in 1 s = 1 W.',
      learn: '1 W = 1 J/s (one joule per second). The watt is named after James Watt. A human at rest uses about 80 W; a cyclist at full effort about 400 W; a 60 W lamp converts 60 J every second.' },

    { id: 'faster_more_power', grades: D8, icon: '🏃', title: 'Same work, less time = more power',
      hint: 'Do the 1 kg, 1.0 m lift twice — once quickly, once slowly',
      rule: { mode: 'lift', massIdx: 2, heightIdx: 1, timed: true },
      how: ['mode:lift', 'mass:2', 'height:1', 'timer', 'pull', 'read'],
      saw: '10 J in 2 s = 5 W; 10 J in 5 s = 2 W. Same work, very different power.',
      learn: 'Power = work ÷ time. If the work is fixed, doing it in half the time doubles the power. Two workers doing identical jobs are not equally powerful if one takes twice as long.' },

    { id: 'ramp_same_work', grades: D8, icon: '📐', title: 'Ramp: less force, more distance, same work',
      hint: 'Pull 500 g up the 30° ramp to 1.0 m height',
      rule: { mode: 'ramp', massIdx: 1, heightIdx: 1 },
      how: ['mode:ramp', 'mass:1', 'height:1', 'pull', 'read'],
      saw: '2.5 N × 2.0 m = 5 J — same as 5 N × 1.0 m lifting straight up.',
      learn: 'A ramp is a simple machine. It halves the force needed but doubles the distance. Work = force × distance stays the same — the ramp saves force, not energy. This follows conservation of energy.' },

    { id: 'ramp_less_force', grades: D8, icon: '↗️', title: 'Ramp force = weight × sin(angle)',
      hint: 'Compare the Force chip in Lift mode then Ramp mode with the same load',
      rule: { mode: 'ramp', massIdx: 2, heightIdx: 1 },
      how: ['mode:lift', 'mass:2', 'height:1', 'pull', 'read', 'mode:ramp', 'mass:2', 'height:1', 'pull', 'read'],
      saw: 'Lift: force = 10 N. Ramp: force = 5 N. Half the force over twice the distance.',
      learn: 'Force needed on a 30° ramp = weight × sin(30°) = weight × 0.5. The ramp gives mechanical advantage: a smaller force moves a heavy object, but over a longer path. F_ramp × d_ramp = F_lift × d_lift.' },

    { id: 'gpe_to_ke', grades: D8, icon: '🎿', title: 'Sliding down: GPE converts to kinetic energy',
      hint: 'Pull 1 kg to 2 m on the ramp, then release gently',
      rule: { mode: 'ramp', massIdx: 2, heightIdx: 2 },
      how: ['mode:ramp', 'mass:2', 'height:2', 'pull', 'read'],
      saw: 'At the top: 20 J of GPE stored. Sliding down: that GPE becomes kinetic energy and speed.',
      learn: 'Energy is conserved: it changes form, never disappears. GPE = mgh at the top. Sliding down, height falls and speed rises: GPE → KE. KE = ½mv². Friction turns some of it into heat.' },

    { id: 'no_work_held', grades: D8, icon: '🤲', title: 'Holding still does no work (W = 0)',
      hint: 'Try to hold the object without it moving and watch the Work chip',
      card: 'no_work_held',
      how: ['card:no_work_held'],
      saw: 'Work stayed at 0 J even while holding up the full weight.',
      learn: 'W = F × d. Distance = 0 means work = 0. Your muscles tire but the physics definition is strict: no movement, no work done on the object. Work requires both a force AND a displacement.' },

    { id: 'wrong_direction', grades: D8, icon: '➡️', title: 'Work requires force in the direction of motion',
      hint: 'Apply a force that is at 90° to the movement',
      card: 'wrong_direction',
      how: ['card:wrong_direction'],
      saw: 'A horizontal force did zero work on a vertically moving object.',
      learn: 'W = F × d only when force and displacement are parallel. If they are at right angles, the force does zero work. A porter carrying a heavy tray horizontally does no work against gravity.' },

    { id: 'ramp_efficiency', grades: D8, icon: '♻️', title: 'Real ramps: efficiency less than 100%',
      hint: 'Notice the friction warning after pulling the ramp',
      card: 'ramp_efficiency',
      how: ['card:ramp_efficiency'],
      saw: 'The real force on the ramp was slightly more than the ideal formula predicted.',
      learn: 'Efficiency = (useful output ÷ total input) × 100%. Friction converts some input work into heat, so real machines always need more input than the ideal calculation. Lubrication, ball bearings and smooth surfaces all improve efficiency.' },

    { id: 'runaway_load', grades: D8, icon: '⚠️', title: 'A raised load stores energy — control it',
      hint: 'Find out what happens if the rope is released on the ramp',
      card: 'rope_release',
      how: ['card:rope_release'],
      saw: 'The load slid back down and hit the stop with a thud.',
      learn: 'GPE = mgh. A 1 kg load at 2 m height stores 20 J of GPE. Release the rope and all 20 J become kinetic energy — the object accelerates and can injure anyone at the bottom. Always lower loads with the rope taut.' },
  ];

  // Which rule discoveries a completed experiment unlocks.
  function discoveriesFor(mode, massIdx, heightIdx, timed) {
    return DISCOVERIES.filter(d => {
      if (!d.rule) return false;
      if (d.rule.mode !== undefined && d.rule.mode !== mode) return false;
      if (d.rule.massIdx !== undefined && d.rule.massIdx !== massIdx) return false;
      if (d.rule.heightIdx !== undefined && d.rule.heightIdx !== heightIdx) return false;
      if (d.rule.timed && !timed) return false;
      return true;
    }).map(d => d.id);
  }

  // ── Guided experiments ────────────────────────
  // Each step: on (event token), say (coach text), btn (button label for the guide).
  // Last step must be 'read' (tested). All steps tagged grades: D8.
  const GUIDES = [
    { id: 'how_much_work', icon: '💪', title: 'How much work?', grades: D8,
      blurb: 'Set the mass and height, pull straight up, and calculate W = F × d.',
      lesson: 'Force 5 N × distance 1.0 m = 5 J of work. The formula W = F × d tells you exactly how much work was done.',
      steps: [
        { on: 'mode:lift',  say: 'Tap ↕️ Lift straight up in the mode bar.' },
        { on: 'mass:1',     say: 'Tap 500 g in the mass selector.' },
        { on: 'height:1',   say: 'Tap 1.0 m in the height selector.' },
        { on: 'pull',       say: 'Press Pull ⬆️ and watch the Force and Work numbers!' },
        { on: 'read',       say: 'Tap 📋 Record to save your result.' },
      ] },

    { id: 'same_job_less_force', icon: '⬇️', title: 'Same job, less force', grades: D8,
      blurb: 'Lift the same load to the same height two ways and compare the work done.',
      lesson: 'Direct lift: 5 N × 1.0 m = 5 J. Ramp: 2.5 N × 2.0 m = 5 J. A ramp saves force — but not energy.',
      steps: [
        { on: 'mode:lift',  say: 'Tap ↕️ Lift straight up in the mode bar.' },
        { on: 'mass:1',     say: 'Tap 500 g in the mass selector.' },
        { on: 'height:1',   say: 'Tap 1.0 m in the height selector.' },
        { on: 'pull',       say: 'Press Pull ⬆️ — note the Force and Work values.' },
        { on: 'read',       say: 'Tap 📋 Record, then switch to Ramp mode.' },
        { on: 'mode:ramp',  say: 'Tap ⬇️ Pull up ramp in the mode bar.' },
        { on: 'pull',       say: 'Press Pull ⬆️ again — does it take less force?' },
        { on: 'read',       say: 'Tap 📋 Record — is the work the same?' },
      ] },

    { id: 'power_race', icon: '⏱️', title: "Who's more powerful?", grades: D8,
      blurb: 'Do the same job in different times and compare the power outputs.',
      lesson: 'Same 20 J of work — the person who does it faster has more power. P = W ÷ t.',
      steps: [
        { on: 'mode:lift',  say: 'Tap ↕️ Lift straight up in the mode bar.' },
        { on: 'mass:2',     say: 'Tap 1 kg in the mass selector.' },
        { on: 'height:2',   say: 'Tap 2.0 m in the height selector.' },
        { on: 'timer',      say: 'Tap ⏱️ Start timer — then pull straight away!' },
        { on: 'pull',       say: 'Press Pull ⬆️ and watch the clock.' },
        { on: 'read',       say: 'Tap 📋 Record — check the Power chip!' },
      ] },
  ];

  // ── Missions ─────────────────────────────────
  // First option is the answer; Labs.quiz() shuffles before presenting.
  const MISSIONS = [
    { id: 'work_it_out', icon: '💪', title: 'Work it out', grades: D8,
      blurb: 'Calculate W = F × d for five real situations. Remember: no movement = no work.',
      intro: 'Work it out! Use W = F × d to answer each question. Work is only done when a force moves an object in the direction of the force.',
      quiz: [
        { q: 'A boy pushes a toy car with a 4 N force, moving it 3 m along the floor. How much work does he do?',
          options: ['12 J', '7 J', '43 J', '1.3 J'],
          why: 'W = F × d = 4 × 3 = 12 J. Adding force and distance gives 7; reversing the digits gives 43; dividing (not multiplying) gives 1.3.' },
        { q: 'A crane applies 500 N to lift a crate 8 m. How much work does the crane do?',
          options: ['4000 J', '508 J', '62.5 J', '500 J'],
          why: 'W = 500 × 8 = 4000 J. Adding gives 508; dividing gives 62.5; and 500 J forgets to multiply by the height.' },
        { q: 'A 2 kg book is lifted 2 m. How much work is done against gravity? (g = 10 N/kg)',
          options: ['40 J', '4 J', '22 J', '400 J'],
          why: 'Weight = 2 × 10 = 20 N. W = 20 × 2 = 40 J. Forgetting g gives 4 J; adding gives 22; an extra zero gives 400.' },
        { q: 'A girl stands still holding a 20 N bag for 5 minutes. How much work has she done on the bag?',
          options: ['0 J', '100 J', '300 J', '20 J'],
          why: 'W = F × d = 20 × 0 = 0 J. The bag does not move, so d = 0 and no work is done, however tired she feels.' },
        { q: 'A 1 kg mass is raised 2.5 m. How much work is done? (g = 10 N/kg)',
          options: ['25 J', '12.5 J', '2.5 J', '250 J'],
          why: 'Weight = 10 N. W = 10 × 2.5 = 25 J. Half that is 12.5; just the height is 2.5; an extra zero gives 250.' },
      ] },

    { id: 'power_race_q', icon: '⚡', title: 'Power race', grades: D8,
      blurb: 'Calculate P = W ÷ t and decide which machine or person is more powerful.',
      intro: 'Power race! Use P = W ÷ t to find power in watts. A watt (W) is one joule per second.',
      quiz: [
        { q: 'A motor does 60 J of work in 3 seconds. What is its power?',
          options: ['20 W', '63 W', '57 W', '180 W'],
          why: 'P = W ÷ t = 60 ÷ 3 = 20 W. Adding gives 63; subtracting gives 57; multiplying gives 180.' },
        { q: 'Machine A does 200 J in 40 s. Machine B does 120 J in 20 s. Which is more powerful?',
          options: ['Machine B (6 W)', 'Machine A (5 W)', 'Both equally powerful', 'Machine A (200 W)'],
          why: 'A: 200 ÷ 40 = 5 W. B: 120 ÷ 20 = 6 W. B is more powerful. More work done does not always mean more power.' },
        { q: 'A 0.5 kg ball is lifted 2 m in 0.5 s. What is the power? (g = 10 N/kg)',
          options: ['20 W', '10 W', '5 W', '2 W'],
          why: 'Weight = 5 N. W = 5 × 2 = 10 J. P = 10 ÷ 0.5 = 20 W. Forgetting to divide by t gives 10; further halving gives 5.' },
        { q: 'What does 1 watt (1 W) equal?',
          options: ['1 J/s', '1 N/m', '1 J·m', '1 N·s'],
          why: '1 W = 1 J/s (one joule per second). 1 N/m is a spring constant; J·m and N·s are not standard physics units.' },
        { q: 'A pump with 50 W power runs for 4 s. How much work does it do?',
          options: ['200 J', '12.5 J', '54 J', '46 J'],
          why: 'W = P × t = 50 × 4 = 200 J. Dividing gives 12.5; adding gives 54; subtracting gives 46.' },
      ] },
  ];

  // ── Science facts for the 💡 button ──────────
  const FACTS = [
    'Work = force × distance. No movement = no work, even with a huge force.',
    'The joule (J) is the unit of energy and work. 1 J = 1 N × 1 m.',
    'James Joule (1818–1889) proved that heat is a form of energy — he stirred water with a paddle and measured the temperature rise.',
    'On Earth, g = 10 N/kg. Every 1 kg weighs 10 N at the surface.',
    'GPE = mgh. Lift a 2 kg mass 3 m and it gains 60 J of gravitational potential energy.',
    'Power = work ÷ time. The watt (W) is named after James Watt, who improved the steam engine in the 1760s.',
    'A human at rest uses about 80 W — that keeps the heart beating, lungs breathing and brain thinking.',
    'A racing cyclist at full effort can reach about 400 W; a professional sprinter over 1000 W for a few seconds.',
    'A 60 W lightbulb converts 60 J of electrical energy every second — mostly into heat, not light.',
    'A ramp reduces the pulling force needed but increases the distance — the total work is the same.',
    'Efficiency = (useful output ÷ total input) × 100%. No machine is 100% efficient: friction converts some energy into heat.',
    'Energy is conserved: GPE converts to KE as an object slides down a ramp. KE = ½mv².',
    'Elastic potential energy is stored in a stretched spring or rubber band. It converts to KE when released.',
    'A roller coaster at the top of a hill has maximum GPE. At the bottom it has maximum KE — minus the heat lost to friction.',
  ];

  return {
    GRADES, forGrade,
    G_EARTH, RAMP_ANGLE_DEG, RAMP_SIN,
    MASSES, HEIGHTS,
    calcWork, calcGPE, calcPower,
    HAZARDS, RESULTS, CARD_ORDER,
    DISCOVERIES, discoveriesFor,
    GUIDES, MISSIONS,
    FACTS,
  };
})();
if (typeof window !== 'undefined') window.LabEnergyData = LabEnergyData;
