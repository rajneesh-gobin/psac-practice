'use strict';
// ══════════════════════════════════════════════
//  Science Labs - the science behind Food Tests (Science, Grade 8).
//
//  ⚠ THE SCIENCE LIVES HERE, NOT IN THE ANIMATION. Every food, every reagent
//    colour, every "which food gives which result", every time, hazard, fact,
//    guide, discovery, mission and quiz question comes from this file.
//    lab_food.js only moves time along and draws it. If a tube shows the wrong
//    colour, fix it HERE.
//  ⚠ Grounded ONLY in the app's Grade 8 pack (subjects/grade8-science):
//    chapter g8s-food ("Test a food sample to identify its components"),
//    g8s-food-016 (Benedict's blue → brick-red for glucose; iodine blue-black
//    for starch; Biuret purple for protein; grease-spot or ethanol test for
//    fat), g8s-food-011 (iodine orange-brown → blue-black; the emulsion test),
//    g8s-hd-015 (one test answers one question), g8s-hd-022 (a small sample is
//    enough), g8s-inquiry-001 (chemicals are never tasted), g8s-hd-008
//    (corrosive: protect skin and eyes). scripts/test-labs-food-data.js checks
//    every one of those ids still exists.
//  ⚠ Colours are always carried by WORDS too (colour-blind pupils).
//
//  Time-lapse: 1 second on the bench is about 1 minute in a real lab.
// ══════════════════════════════════════════════
const LabFoodData = (() => {

  const GRADES = [8];
  const forGrade = (list, g) => list.filter(x => (x.grades || [8]).includes(g));
  const ROOM = 25;                 // °C, a Mauritian school lab
  const TIME_LAPSE = '1 second here = about 1 minute in a real lab';
  const SLOTS = 6;                 // test tubes in the rack

  // ── The reagents' colours ───────────────────
  // Benedict's runs up a ladder as it is heated: the more reducing sugar, the
  // further up it goes. Green = a little, brick-red = a lot.
  const C = {
    iodine: '#B8651B', blueBlack: '#141633',
    bBlue: '#2E6FD6', bGreen: '#3E9A45', bYellow: '#E3C428', bOrange: '#E27A22', bBrick: '#A63A1F',
    biuretBlue: '#5B86D6', lilac: '#A58BD8', purple: '#7B3FA8',
    clear: '#DCEBF2', cloudy: '#F4F4EE',
    paper: '#F7F3E6', spot: '#D9CFA8', wet: '#C9D5DA',
  };
  const LADDER = [
    { word: 'blue',      hex: C.bBlue },
    { word: 'green',     hex: C.bGreen },
    { word: 'yellow',    hex: C.bYellow },
    { word: 'orange',    hex: C.bOrange },
    { word: 'brick-red', hex: C.bBrick },
  ];

  // ── Foods ────────────────────────────────────
  // Levels: starch/protein/fat 0-3, sugar (REDUCING sugar) 0-4 - the step of
  // the Benedict's ladder it reaches. A food a test cannot "see" is 0.
  const FOODS = {
    water:    { name: 'Distilled water', short: 'water', swatch: '#CFE8F3', starch: 0, sugar: 0, protein: 0, fat: 0,
                meta: 'The CONTROL - no nutrients', rich: 'nothing: it is the control' },
    cornflour:{ name: 'Cornflour', short: 'cornflour', swatch: '#F3F1EA', starch: 3, sugar: 0, protein: 0, fat: 0,
                meta: 'White powder, stirred into water', rich: 'starch (a carbohydrate)' },
    glucose:  { name: 'Glucose solution', short: 'glucose', swatch: '#E4EEF0', starch: 0, sugar: 4, protein: 0, fat: 0,
                meta: 'A sugar dissolved in water', rich: 'reducing sugar (a carbohydrate)' },
    sucrose:  { name: 'Table sugar solution', short: 'table sugar', swatch: '#E8EEF0', starch: 0, sugar: 0, protein: 0, fat: 0,
                meta: 'Sucrose dissolved in water', rich: 'sucrose - a sugar Benedict\'s cannot see (beyond the Grade 8 syllabus)', nonReducing: true },
    gelatine: { name: 'Gelatine solution', short: 'gelatine', swatch: '#EFE3C8', starch: 0, sugar: 0, protein: 3, fat: 0,
                meta: 'Gelatine powder dissolved in warm water', rich: 'protein' },
    oil:      { name: 'Cooking oil', short: 'oil', swatch: '#E8C84A', starch: 0, sugar: 0, protein: 0, fat: 3,
                meta: 'A few drops', rich: 'fat (lipid)' },
    milk:     { name: 'Milk', short: 'milk', swatch: '#F7F6F0', starch: 0, sugar: 3, protein: 2, fat: 1,
                meta: 'One food, several nutrients', rich: 'protein, fat and a reducing sugar (lactose)' },
    // Only on the shelf during "The mystery powder".
    mystery:  { name: 'Mystery powder X', short: 'powder X', swatch: '#F1EEE4', starch: 3, sugar: 4, protein: 0, fat: 0,
                meta: 'What is in it? Test it and see', rich: 'starch and reducing sugar', missionOnly: 'mystery' },
  };
  const SHELF_FOODS = ['cornflour', 'glucose', 'gelatine', 'oil', 'milk', 'sucrose', 'water'];

  const NUTRIENTS = { starch: 'starch', sugar: 'reducing sugar', protein: 'protein', fat: 'fat' };

  // ── Tests ────────────────────────────────────
  const TESTS = {
    iodine:    { name: 'Iodine solution', short: 'iodine', nutrient: 'starch', swatch: C.iodine,
                 before: 'orange-brown', after: 'blue-black',
                 how: 'Add a few drops of orange-brown iodine solution.',
                 meta: 'Tests for starch', eq: 'Iodine solution: orange-brown → blue-black = starch' },
    benedicts: { name: 'Benedict\'s solution', short: 'Benedict\'s', nutrient: 'sugar', swatch: C.bBlue,
                 before: 'blue', after: 'brick-red',
                 how: 'Add blue Benedict\'s solution, then heat in a hot water bath.',
                 meta: 'Tests for reducing sugar · must be heated', eq: 'Benedict\'s solution, heated: blue → green → yellow → orange → brick-red = reducing sugar' },
    biuret:    { name: 'Biuret solution', short: 'Biuret', nutrient: 'protein', swatch: C.biuretBlue, corrosive: true,
                 before: 'blue', after: 'purple',
                 how: 'Add blue Biuret solution and wait a few minutes.',
                 meta: 'Tests for protein · corrosive', eq: 'Biuret solution: blue → purple (lilac) = protein' },
    paper:     { name: 'Grease-spot test', short: 'grease spot', nutrient: 'fat', swatch: C.paper, paper: true,
                 before: 'no spot', after: 'translucent spot',
                 how: 'Rub the food on filter paper, let it dry, hold it up to the light.',
                 meta: 'Tests for fat · let it dry', eq: 'Grease-spot test: a translucent (see-through) spot that stays when dry = fat' },
    ethanol:   { name: 'Ethanol (emulsion) test', short: 'ethanol', nutrient: 'fat', swatch: C.clear, flammable: true,
                 before: 'clear', after: 'cloudy white',
                 how: 'Shake the food with ethanol, then pour the ethanol into water.',
                 meta: 'Tests for fat · flammable', eq: 'Ethanol test: the water turns cloudy white (an emulsion) = fat' },
  };
  const SHELF_TESTS = ['iodine', 'benedicts', 'biuret', 'paper', 'ethanol'];

  // ── Times and temperatures (bench seconds = lab minutes) ──
  const BATH = { temp: 80, warm: 18, cool: 8 };      // °C; °C per second up and down
  const BENEDICT = { minT: 70, heatFor: 4 };        // must be above 70 °C for about 4 minutes
  const BIURET = { develop: 3, readAfter: 2 };      // full colour after 3 minutes; read before 2 is too soon
  const PAPER = { dry: 5 };                         // a wet spot dries in about 5 minutes

  // How much of a nutrient the tube really has: its own, or a trace carried in
  // on a dirty spatula (a trace is always level 1 - a little).
  function levels(food, trace, n) {
    const own = (FOODS[food] || {})[n] || 0;
    const tr = trace && FOODS[trace] ? Math.min(1, FOODS[trace][n] || 0) : 0;
    return { own, tr, lvl: Math.max(own, tr), fromTrace: own === 0 && tr > 0 };
  }

  // What a tube shows. st = { heat: minutes above 70 °C, t: minutes since the
  // reagent went in, dry: the paper has dried }.
  function resultFor(test, food, trace, st) {
    const T = TESTS[test];
    if (!T || !FOODS[food]) return null;
    st = st || {};
    const { lvl, fromTrace } = levels(food, trace, T.nutrient);
    const nut = NUTRIENTS[T.nutrient];
    const out = (hex, word, positive, finished, extra) => Object.assign({
      hex, word, positive, finished, fromTrace: positive && fromTrace,
      meaning: !finished ? 'not finished yet' : positive ? `${nut} present` : `no ${nut}`,
    }, extra || {});
    if (test === 'iodine') {
      return lvl > 0 ? out(C.blueBlack, lvl >= 2 ? 'blue-black' : 'blue-black (faint)', true, true)
                     : out(C.iodine, 'orange-brown', false, true);
    }
    if (test === 'benedicts') {
      const p = Math.min(1, (st.heat || 0) / BENEDICT.heatFor);
      const step = Math.min(lvl, Math.floor(p * lvl + 1e-9));
      const L = LADDER[step];
      return out(L.hex, L.word, step > 0, p >= 1, { heated: p, unheated: !(st.heat > 0) });
    }
    if (test === 'biuret') {
      const q = Math.min(1, (st.t || 0) / BIURET.develop);
      if (lvl === 0) return out(C.biuretBlue, 'blue', false, q >= 1);
      if (q < 0.34) return out(C.biuretBlue, 'blue', false, false);
      if (q < 1) return out(C.lilac, 'lilac (still changing)', true, false);
      return lvl >= 2 ? out(C.purple, 'purple', true, true) : out(C.lilac, 'lilac (pale purple)', true, true);
    }
    if (test === 'paper') {
      if (!st.dry) return out(C.wet, 'a wet, see-through spot', false, false, { wet: true });
      if (lvl >= 2) return out(C.spot, 'a translucent spot', true, true);
      if (lvl === 1) return out(C.spot, 'a faint translucent spot', true, true);
      return out(C.paper, 'no spot - the water dried away', false, true);
    }
    if (test === 'ethanol') {
      if (lvl >= 2) return out(C.cloudy, 'cloudy white', true, true);
      if (lvl === 1) return out(C.cloudy, 'slightly cloudy white', true, true);
      return out(C.clear, 'clear', false, true);
    }
    return null;
  }

  // ── Mistakes that stop the experiment ─────────
  const HAZARDS = {
    flame_heat: {
      signs: ['hot', 'goggles'], fx: 'spit',
      title: () => 'Stop - never heat a test tube straight in the flame',
      happened: c => `You held tube ${c.tube} straight in the Bunsen flame. The liquid at the bottom boiled all at once and shot hot liquid out of the mouth of the tube.`,
      why: 'Heating the bottom of a narrow tube makes it boil suddenly. Hot Benedict\'s solution can burn your skin and your eyes - and whoever the tube is pointing at.',
      instead: 'Heat food tests in a hot water bath, never in the flame. Wear goggles, and point the mouth of the tube away from yourself and everyone else.',
      exam: '"State one safety precaution for the Benedict\'s test" - Heat the tube in a water bath and point it away from people. Wear safety goggles.',
    },
    biuret_eyes: {
      signs: ['corrosive', 'goggles'], fx: 'splash',
      title: () => 'Stop - protect your eyes',
      happened: () => 'You added Biuret solution without safety goggles. A drop splashed up towards your face as it went in.',
      why: 'Biuret solution contains sodium hydroxide, which is corrosive, and copper sulfate. A splash can burn skin and damage an eye for good.',
      instead: 'Put on safety goggles before you use Biuret solution. If any gets on your skin, wash it off at once with plenty of water and tell your teacher.',
      exam: 'A corrosive hazard symbol means: protect your skin and eyes, and handle it carefully over a tray.',
    },
    ethanol_flame: {
      signs: ['flammable'], fx: 'fire',
      title: () => 'Fire - ethanol and a flame',
      happened: c => c.lit
        ? 'You lit the Bunsen burner while there was ethanol on the bench. The ethanol vapour caught fire.'
        : 'You used ethanol while the Bunsen burner was still lit. The ethanol vapour caught fire.',
      why: 'Ethanol is flammable. Its vapour spreads across the bench and catches fire from a flame even a long way from the bottle.',
      instead: 'Turn off every Bunsen burner before the ethanol test. Keep the ethanol bottle closed and far from any heat.',
      exam: 'A flammable hazard symbol means: keep it away from flames and heat.',
    },
    tasting: {
      signs: ['toxic'], fx: 'taste',
      title: () => 'Stop - never taste anything in the lab',
      happened: c => `You were about to taste the ${c.food}. In the lab, even a food is not safe to eat.`,
      why: 'Lab glassware, spatulas and benches carry chemicals such as iodine, copper sulfate and sodium hydroxide. A food in the lab may be contaminated with them.',
      instead: 'Never taste, eat or drink in the lab. Find out what a food contains with the food tests instead.',
      exam: 'Chemicals are never tasted in a laboratory. Read the safety rules before you start.',
    },
  };

  // ── Wrong but safe ──────────────────────────
  const RESULTS = {
    dirty: {
      icon: '🥄', title: 'A dirty spatula spoiled the test',
      happened: c => `Tube ${c.tube} (${c.food}) turned ${c.word} - but ${c.food} has no ${c.nutrient}. The spatula still had ${c.trace} on it from the last food, and that trace gave the colour.`,
      instead: 'Rinse and dry the spatula (or dropper) between foods, or use a clean one for each food. Then each result belongs to its own food.',
      exam: 'Sources of error: contamination from unwashed apparatus can give a false positive result.',
    },
    no_control: {
      icon: '🧪', title: 'No control tube to compare with',
      happened: c => `You compared ${c.n} foods with ${c.test}, but there was no tube of water tested the same way. Without it you cannot be sure what "no change" looks like.`,
      instead: 'Set up a control: a tube of water with the same reagent, treated in exactly the same way. A real change is a colour different from the control.',
      exam: 'A control shows what happens when the nutrient is NOT there, so the test is fair.',
    },
    not_heated: {
      icon: '🥶', title: 'Benedict\'s was never heated',
      happened: c => `Tube ${c.tube} (${c.food}) is still blue. ${c.Food} does contain reducing sugar - but Benedict's solution only changes colour when it is hot. A blue result here is a false negative.`,
      instead: 'Put the tube in a hot water bath (about 80 °C) for a few minutes, then read the colour.',
      exam: 'Benedict\'s test: heat the food with Benedict\'s solution in a water bath. Blue → brick-red shows reducing sugar.',
    },
    too_soon: {
      icon: '⏱️', title: 'You read the Biuret test too soon',
      happened: c => `You read tube ${c.tube} (${c.food}) after less than ${BIURET.readAfter} minutes. It was still ${c.word} - the purple had not finished coming through.`,
      instead: `Wait a few minutes after adding Biuret solution (about ${BIURET.develop} minutes here), then compare with the control.`,
      exam: 'Biuret test: blue → purple shows protein. Give the colour time to develop.',
    },
    wet_spot: {
      icon: '💧', title: 'You read the spot while it was wet',
      happened: c => `The spot from ${c.food} looked see-through - but it was only wet. Any liquid makes paper see-through until it dries.`,
      instead: `Let the paper dry (about ${PAPER.dry} minutes), then hold it up to the light. Only a spot made by fat stays translucent when dry.`,
      exam: 'Grease-spot test: a translucent spot that stays after drying shows fat.',
    },
  };
  const CARD_ORDER = ['dirty', 'not_heated', 'too_soon', 'wet_spot', 'no_control'];

  // ── Discoveries ─────────────────────────────
  // `how` is a recipe in the guide vocabulary (see GUIDES). A rule discovery
  // unlocks on a finished, mistake-free reading that matches `rule`; a card
  // discovery unlocks when its result card is shown.
  const D8 = [8];
  const DISCOVERIES = [
    { id: 'starch_iodine', icon: '🌽', title: 'Starch turns iodine blue-black', hint: 'A white powder and a brown reagent', grades: D8,
      rule: { test: 'iodine', food: 'cornflour' }, how: ['slot:1', 'food:cornflour', 'test:iodine', 'read'],
      saw: 'The orange-brown iodine solution turned blue-black as soon as it touched the cornflour.',
      learn: 'Blue-black with iodine is the test for starch. Cornflour is almost pure starch, a carbohydrate that gives energy.' },
    { id: 'iodine_neg', icon: '🟠', title: 'No starch, no change', hint: 'Iodine on a sugar', grades: D8,
      rule: { test: 'iodine', food: 'glucose' }, how: ['slot:1', 'food:glucose', 'test:iodine', 'read'],
      saw: 'The iodine solution stayed orange-brown in the glucose solution.',
      learn: 'Glucose is a carbohydrate, but it is not starch. Iodine only sees starch - one test answers one question.' },
    { id: 'sugar_brick', icon: '🧱', title: 'Brick-red for glucose', hint: 'Benedict\'s, a sugar and some heat', grades: D8,
      rule: { test: 'benedicts', food: 'glucose' }, how: ['goggles', 'slot:1', 'food:glucose', 'test:benedicts', 'bath', 'heated', 'read'],
      saw: 'In the hot water bath the blue Benedict\'s went green, yellow, orange and finally brick-red.',
      learn: 'Glucose is a reducing sugar. Heated with Benedict\'s solution it gives a brick-red colour - lots of sugar.' },
    { id: 'milk_sugar', icon: '🥛', title: 'Milk is sugary too', hint: 'Heat milk with Benedict\'s', grades: D8,
      rule: { test: 'benedicts', food: 'milk' }, how: ['goggles', 'slot:1', 'food:milk', 'test:benedicts', 'bath', 'heated', 'read'],
      saw: 'The Benedict\'s solution climbed from blue to orange, but not all the way to brick-red.',
      learn: 'Milk contains a reducing sugar called lactose. The colour tells you roughly how much: green a little, brick-red a lot.' },
    { id: 'sucrose_blue', icon: '🍬', title: 'The sugar that stays blue', hint: 'Table sugar with Benedict\'s', grades: D8,
      rule: { test: 'benedicts', food: 'sucrose' }, how: ['goggles', 'slot:1', 'food:sucrose', 'test:benedicts', 'bath', 'heated', 'read'],
      saw: 'Even after heating, the Benedict\'s solution stayed blue.',
      learn: 'Table sugar (sucrose) is a sugar, but not a reducing sugar, so Benedict\'s cannot see it. (Why is beyond the Grade 8 syllabus.)' },
    { id: 'protein_purple', icon: '🟣', title: 'Protein turns Biuret purple', hint: 'Biuret and a wobbly food', grades: D8,
      rule: { test: 'biuret', food: 'gelatine' }, how: ['goggles', 'slot:1', 'food:gelatine', 'test:biuret', 'developed', 'read'],
      saw: 'Over a few minutes the blue Biuret solution turned purple.',
      learn: 'Purple with Biuret solution is the test for protein. Gelatine is a protein - protein builds and repairs the body.' },
    { id: 'milk_protein', icon: '🧀', title: 'One food, many nutrients', hint: 'Milk with Biuret', grades: D8,
      rule: { test: 'biuret', food: 'milk' }, how: ['goggles', 'slot:1', 'food:milk', 'test:biuret', 'developed', 'read'],
      saw: 'Milk turned the Biuret solution purple.',
      learn: 'Milk has protein AND sugar AND fat. Most foods contain several nutrients, so you need several tests.' },
    { id: 'fat_spot', icon: '🧈', title: 'The grease spot', hint: 'Oil on filter paper', grades: D8,
      rule: { test: 'paper', food: 'oil' }, how: ['slot:1', 'food:oil', 'test:paper', 'dry', 'read'],
      saw: 'After drying, the oil left a translucent spot: light shone through it.',
      learn: 'Fat does not dry away. A spot that stays translucent after drying shows the food contains fat.' },
    { id: 'water_spot', icon: '💨', title: 'Water dries away', hint: 'Water on filter paper - wait for it', grades: D8,
      rule: { test: 'paper', noFat: true }, how: ['slot:1', 'food:water', 'test:paper', 'dry', 'read'],
      saw: 'The wet spot dried and disappeared. No spot was left.',
      learn: 'Water (and foods without fat) make a spot only while wet. That is why you wait for the paper to dry.' },
    { id: 'fat_emulsion', icon: '☁️', title: 'A cloudy emulsion', hint: 'Oil, ethanol and water - no flames', grades: D8,
      rule: { test: 'ethanol', food: 'oil' }, how: ['goggles', 'burner-off', 'slot:1', 'food:oil', 'test:ethanol', 'read'],
      saw: 'When the ethanol was poured into the water, the water went cloudy white.',
      learn: 'Fat dissolves in ethanol but not in water. In the water it breaks into tiny droplets - an emulsion - which looks cloudy white.' },
    { id: 'control', icon: '⚖️', title: 'The control', hint: 'Test something with nothing in it', grades: D8,
      rule: { food: 'water' }, how: ['slot:1', 'food:water', 'test:iodine', 'read'],
      saw: 'The water gave no change: the reagent kept its own colour.',
      learn: 'A tube of water tested in the same way is the control. It shows what "no nutrient" looks like, so you can compare.' },
    { id: 'no_heat', icon: '🥶', title: 'Cold Benedict\'s tells you nothing', hint: 'Benedict\'s without the water bath', grades: D8,
      card: 'not_heated', how: ['goggles', 'slot:1', 'food:glucose', 'test:benedicts', 'read', 'card:not_heated'],
      saw: 'Glucose with Benedict\'s stayed blue because it was never heated.',
      learn: 'Benedict\'s only works hot. Unheated, even a sugary food stays blue - a false negative.' },
    { id: 'too_soon', icon: '⏱️', title: 'Patience with Biuret', hint: 'Read the protein test straight away', grades: D8,
      card: 'too_soon', how: ['goggles', 'slot:1', 'food:gelatine', 'test:biuret', 'read', 'card:too_soon'],
      saw: 'Read at once, the Biuret test still looked blue.',
      learn: 'The purple takes a few minutes to come through. Reading too early can miss the protein.' },
    { id: 'wet_spot', icon: '💧', title: 'A wet spot fools you', hint: 'Read the grease spot straight away', grades: D8,
      card: 'wet_spot', how: ['slot:1', 'food:water', 'test:paper', 'read', 'card:wet_spot'],
      saw: 'A spot of plain water looked translucent - while it was wet.',
      learn: 'Any liquid makes paper see-through. Only a spot that stays after drying shows fat.' },
    { id: 'dirty_spatula', icon: '🥄', title: 'Contamination', hint: 'Two foods, one unwashed spatula', grades: D8,
      card: 'dirty', how: ['goggles', 'slot:1', 'food:glucose', 'slot:2', 'food:cornflour', 'test:benedicts', 'bath', 'heated', 'read', 'card:dirty'],
      saw: 'Cornflour gave a green Benedict\'s result - from glucose left on the spatula.',
      learn: 'A trace of one food carried into the next gives a false positive. Clean apparatus between samples.' },
    { id: 'no_control', icon: '❓', title: 'Compared with nothing', hint: 'Two foods, one test, no water tube', grades: D8,
      card: 'no_control', how: ['slot:1', 'food:cornflour', 'test:iodine', 'rinse', 'slot:2', 'food:glucose', 'test:iodine', 'read', 'card:no_control'],
      saw: 'Two foods were compared, but there was no control tube.',
      learn: 'Always test a tube of water the same way. It is the fair comparison.' },
  ];

  // Which rule discoveries a finished, mistake-free reading unlocks.
  function discoveriesFor(test, food, res) {
    if (!res || !res.finished) return [];
    return DISCOVERIES.filter(d => d.rule && (!d.rule.test || d.rule.test === test)
      && (!d.rule.food || d.rule.food === food)
      && (!d.rule.noFat || (FOODS[food].fat === 0 && !res.positive))).map(d => d.id);
  }

  // ── Guided experiments ──────────────────────
  // One action per step. `on` is what completes it:
  //   goggles · slot:<n> · food:<id> · test:<id> · bath (tube into the water bath,
  //   which lights the burner) · burner-off · rinse (the spatula) · read · clean
  //   (a fresh rack) · heated (a Benedict's tube has been hot long enough) ·
  //   developed (a Biuret colour has come through) · dry (a grease spot has dried) ·
  //   card:<id> (a result card was read and closed).
  // A step with `btn` gets a button under the rack; the same control glows.
  const WAITS = ['heated', 'developed', 'dry'];
  const GUIDES = [
    { id: 'starch', icon: '🌽', title: 'Test for starch', grades: D8,
      blurb: 'Iodine solution, cornflour - and a control tube of water.',
      lesson: 'Iodine solution turns from orange-brown to blue-black when starch is there. The water control stayed orange-brown, so the change in tube 1 was real.',
      steps: [
        { on: 'slot:1',         say: 'Tap tube 1 in the rack to select it.' },
        { on: 'food:cornflour', say: 'Tap 🌽 cornflour to add a small sample to tube 1.' },
        { on: 'test:iodine',    say: 'Tap 🟠 iodine solution to add a few drops.' },
        { on: 'read',           say: 'Tap 🔎 Read result — look at the colour in tube 1.' },
        { on: 'rinse',          say: 'Tap 🧽 Rinse the spatula before the next sample.' },
        { on: 'slot:2',         say: 'Tap tube 2 to select it — this will be the control.' },
        { on: 'food:water',     say: 'Tap 💧 water — the control has no nutrients.' },
        { on: 'test:iodine',    say: 'Tap 🟠 iodine solution to add drops to the control too.' },
        { on: 'read',           say: 'Tap 🔎 Read result — compare tube 2 with tube 1.' },
      ] },
    { id: 'sugar', icon: '🧱', title: 'Test for sugar', grades: D8,
      blurb: 'Benedict\'s solution, glucose and a hot water bath.',
      lesson: 'Heated with Benedict\'s solution, glucose went from blue through green, yellow and orange to brick-red. That shows a reducing sugar. No heat, no colour change.',
      steps: [
        { on: 'goggles',         say: 'Tap 🥽 goggles first — this test uses heat!' },
        { on: 'slot:1',          say: 'Tap tube 1 to select it.' },
        { on: 'food:glucose',    say: 'Tap 🍯 glucose to add it to tube 1.' },
        { on: 'test:benedicts',  say: 'Tap 🔵 Benedict\'s solution to add it.' },
        { on: 'bath',            say: 'Tap 🛁 water bath — never heat the tube directly in a flame!' },
        { on: 'heated',          say: 'Watch the colour change as it heats…' },
        { on: 'read',            say: 'Tap 🔎 Read result — the colour has stopped changing.' },
        { on: 'burner-off',      say: 'Tap 🧯 to turn the Bunsen burner off.' },
      ] },
    { id: 'protein', icon: '🟣', title: 'Test for protein', grades: D8,
      blurb: 'Biuret solution and gelatine - then wait.',
      lesson: 'Biuret solution turned from blue to purple over a few minutes. Purple shows protein.',
      steps: [
        { on: 'goggles',       say: 'Tap 🥽 goggles first — Biuret solution is corrosive!' },
        { on: 'slot:1',        say: 'Tap tube 1 to select it.' },
        { on: 'food:gelatine', say: 'Tap 🍮 gelatine to add it to tube 1.' },
        { on: 'test:biuret',   say: 'Tap 🔷 Biuret solution to add it.' },
        { on: 'developed',     say: 'Wait a few minutes for the colour to develop…' },
        { on: 'read',          say: 'Tap 🔎 Read result — what colour is it now?' },
      ] },
    { id: 'fat', icon: '🧈', title: 'Test for fat: the grease spot', grades: D8,
      blurb: 'Oil and water on filter paper. Which spot stays?',
      lesson: 'Both spots looked see-through while wet. After drying, the water spot vanished but the oil spot stayed translucent. That shows fat.',
      steps: [
        { on: 'slot:1',     say: 'Tap place 1 to select it.' },
        { on: 'food:oil',   say: 'Tap 🫒 cooking oil to take a drop.' },
        { on: 'test:paper', say: 'Tap 📄 filter paper to rub the oil onto it.' },
        { on: 'dry',        say: 'Leave the paper to dry…' },
        { on: 'read',       say: 'Tap 🔎 Read result — hold the paper to the light.' },
        { on: 'rinse',      say: 'Tap 🧽 Rinse the spatula before the next sample.' },
        { on: 'slot:2',     say: 'Tap place 2 for the control.' },
        { on: 'food:water', say: 'Tap 💧 water — the control has no fat.' },
        { on: 'test:paper', say: 'Tap 📄 filter paper to rub the water spot.' },
        { on: 'dry',        say: 'Leave it to dry…' },
        { on: 'read',       say: 'Tap 🔎 Read result — compare both spots to the light.' },
      ] },
    { id: 'emulsion', icon: '☁️', title: 'Test for fat: the ethanol test', grades: D8,
      blurb: 'Shake oil with ethanol, pour into water. No flames!',
      lesson: 'The water went cloudy white: an emulsion. That shows fat. Ethanol is flammable, so every burner was off.',
      steps: [
        { on: 'goggles',      say: 'Tap 🥽 goggles first!' },
        { on: 'burner-off',   say: 'Tap 🧯 to turn the Bunsen burner off — ethanol is flammable!' },
        { on: 'slot:1',       say: 'Tap tube 1 to select it.' },
        { on: 'food:oil',     say: 'Tap 🫒 cooking oil to add a few drops.' },
        { on: 'test:ethanol', say: 'Tap 🍶 to shake with ethanol and pour into water.' },
        { on: 'read',         say: 'Tap 🔎 Read result — is the water cloudy?' },
      ] },
  ];

  // ── Missions ────────────────────────────────
  // A question's FIRST option is the answer; Labs.quiz() shuffles them.
  // Picture options show a tube; the label always names the colour in words.
  function tubeSvg(hex, cloudy) {
    return `<svg viewBox="0 0 40 64" width="40" height="64" aria-hidden="true">`
      + `<path d="M12 4v44a8 8 0 0 0 16 0V4" fill="none" stroke="#37474F" stroke-width="2.5"/>`
      + `<path d="M13.5 26v22a6.5 6.5 0 0 0 13 0V26z" fill="${hex}"/>`
      + (cloudy ? '<path d="M13.5 26v22a6.5 6.5 0 0 0 13 0V26z" fill="#FFFFFF" opacity=".55"/>' : '')
      + `<path d="M10 4h20" stroke="#37474F" stroke-width="2.5" stroke-linecap="round"/></svg>`;
  }
  const MISSIONS = [
    { id: 'name_it', icon: '🔍', title: 'Name that nutrient', grades: D8,
      blurb: 'Find the main nutrient in cornflour, glucose, gelatine and oil.',
      intro: 'Name that nutrient! Test cornflour, glucose, gelatine and cooking oil. Choose the right test for each, and read a positive result.',
      foods: { cornflour: ['iodine'], glucose: ['benedicts'], gelatine: ['biuret'], oil: ['paper', 'ethanol'] },
      quiz: [
        { q: 'Iodine solution was added to four foods. Which tube shows that starch is present?',
          options: [{ label: 'Blue-black', svg: tubeSvg(C.blueBlack) }, { label: 'Orange-brown', svg: tubeSvg(C.iodine) },
                    { label: 'Brick-red', svg: tubeSvg(C.bBrick) }, { label: 'Purple', svg: tubeSvg(C.purple) }],
          why: 'Iodine turns from orange-brown to blue-black with starch. Brick-red is Benedict\'s and purple is Biuret.' },
        { q: 'Which reagent is used to test a food for protein?',
          options: ['Biuret solution', 'Benedict\'s solution', 'Iodine solution', 'Ethanol'],
          why: 'Biuret solution turns purple with protein. Benedict\'s is for reducing sugar, iodine for starch and ethanol for fat.' },
        { q: 'Why is the Benedict\'s tube put in a hot water bath?',
          options: ['It only changes colour when it is heated', 'The heat kills germs in the food', 'The heat makes the food dissolve', 'It stops the colour from changing'],
          why: 'Cold Benedict\'s stays blue even with sugar. It must be heated to show green, yellow, orange or brick-red.' },
        { q: 'A food leaves a translucent spot on filter paper that stays after the paper dries. Which nutrient does it contain?',
          options: ['Fat', 'Starch', 'Protein', 'Reducing sugar'],
          why: 'Fat does not dry away, so its spot stays see-through. A spot of water disappears as it dries.' },
        { q: 'A pupil tests glucose with iodine solution and it stays orange-brown. What can she conclude?',
          options: ['Glucose contains no starch', 'Glucose contains no sugar', 'Glucose contains protein', 'The iodine was not heated'],
          why: 'Iodine only tests for starch. One test answers one question - it tells you nothing about sugar.' },
      ] },
    { id: 'mystery', icon: '🕵️', title: 'The mystery powder', grades: D8,
      blurb: 'Run all four food tests on powder X - with a control.',
      intro: 'The mystery powder! Test powder X for starch, reducing sugar, protein and fat. Test a tube of water as a control too.',
      needs: ['iodine', 'benedicts', 'biuret', 'fat'],
      quiz: [
        { q: 'Powder X: iodine turned blue-black, Benedict\'s turned brick-red, Biuret stayed blue and there was no grease spot. What does powder X contain?',
          options: ['Starch and reducing sugar', 'Protein and fat', 'Starch only', 'Reducing sugar and protein'],
          why: 'Blue-black shows starch and brick-red shows reducing sugar. Biuret stayed blue (no protein) and no spot means no fat.' },
        { q: 'Why was a tube of water tested alongside the food?',
          options: ['It shows the colour when no nutrient is there', 'It dilutes the reagent so it works', 'It cools down the water bath', 'It makes the colour change faster'],
          why: 'The water tube is the control. A real result is a colour different from the control.' },
        { q: 'These tubes were heated with Benedict\'s solution. Which one contains the MOST reducing sugar?',
          options: [{ label: 'Brick-red', svg: tubeSvg(C.bBrick) }, { label: 'Yellow', svg: tubeSvg(C.bYellow) },
                    { label: 'Green', svg: tubeSvg(C.bGreen) }, { label: 'Blue', svg: tubeSvg(C.bBlue) }],
          why: 'Benedict\'s climbs from blue (none) through green and yellow to orange and brick-red (a lot).' },
        { q: 'Why must the spatula be rinsed between one food and the next?',
          options: ['So one food does not contaminate the next', 'So the reagent works more quickly', 'To keep the spatula warm', 'Because water is a nutrient'],
          why: 'A trace of the last food can give a false positive in the next test.' },
        { q: 'Why must every Bunsen burner be off during the ethanol test?',
          options: ['Ethanol is flammable and catches fire easily', 'Heat turns the fat into starch', 'A flame makes the emulsion clear', 'The flame uses up the ethanol'],
          why: 'Ethanol vapour catches fire from a flame. Burners off, bottle closed.' },
      ] },
  ];

  // Short, true facts for the 💡 button, from the g8s-food chapter.
  const FACTS = [
    'Carbohydrates - starch and sugars - are the body\'s main source of energy.',
    'Protein is needed for growth and for repairing body tissues. Fish, eggs, dal and milk are rich in it.',
    'Fats give about twice as much energy per gram as carbohydrates, so the body stores energy as fat.',
    'Vitamins A, D, E and K dissolve in fat. A diet with no fat at all can leave you short of them.',
    'Fibre is not digested. It keeps food moving through the gut and helps you feel full.',
    'Water gives no energy, but every reaction in your body happens in water.',
    'Vitamins are needed only in tiny amounts - but without vitamin C you get scurvy.',
    'A balanced diet has the right amount of every nutrient, not the same amount of every food.',
    'One food test answers one question: iodine sees starch, and nothing else.',
    'A food test needs only a small sample. It shows whether a nutrient is there, not how much food you have.',
    'Iodine the MINERAL (in iodised salt) keeps your thyroid healthy. Iodine SOLUTION is a lab reagent - never eat it.',
    'Milk contains protein, fat, a sugar called lactose, and calcium for strong bones and teeth.',
  ];

  return { GRADES, forGrade, ROOM, TIME_LAPSE, SLOTS, COLORS: C, LADDER, FOODS, SHELF_FOODS, NUTRIENTS, TESTS, SHELF_TESTS,
           BATH, BENEDICT, BIURET, PAPER, levels, resultFor, HAZARDS, RESULTS, CARD_ORDER, DISCOVERIES, discoveriesFor,
           WAITS, GUIDES, MISSIONS, tubeSvg, FACTS };
})();
if (typeof window !== 'undefined') window.LabFoodData = LabFoodData;
