'use strict';
// ══════════════════════════════════════════════
//  Science Labs - the biology behind the Photosynthesis Lab (NCE Grade 9).
//
//  ⚠ THE SCIENCE LIVES HERE, NOT IN THE ANIMATION. How many bubbles the
//    pondweed gives off, which parts of a leaf hold starch, what the iodine
//    shows, every hazard, card, fact, guide, discovery and quiz question comes
//    from this file. lab_photo.js only moves things over time and draws them.
//  ⚠ Grounded in the live chapter g9s-b4-plant-nutrition (subsections
//    photosynthesis, word_equation, leaf_adaptation, factors_for_photosynthesis,
//    photosynthesis_experiments, mineral_nutrition) and g9s-inquiry
//    (hypothesis_testing). The syllabus asks for the WORD equation; the
//    balanced symbol equation is shown only with a "beyond the NCE syllabus"
//    label. scripts/test-labs-photo-data.js checks the maths and the outcomes.
//
//  The pondweed model (a limiting-factor model, the one the syllabus teaches):
//    light      L = 10000 / d²   (d = lamp distance in cm; 0 with the lamp off)
//                                 - the inverse square law, beyond the syllabus
//    rate (bubbles per minute) = min( 1.2 × L ,  CO₂cap × tf(T) )
//    CO₂cap: boiled-and-cooled water 0 · pond water 12 · + sodium hydrogencarbonate 36
//    tf(T):  enzyme-controlled - rises to an optimum at 30 °C, falls when too hot
//            (enzymes are beyond the NCE syllabus, and labelled so).
//  So: no light, no bubbles; closer lamp, more bubbles until another factor
//  limits; more CO₂ helps only when CO₂ was the limiting factor.
// ══════════════════════════════════════════════
const LabPhotoData = (() => {

  // ── Pondweed rig ───────────────────────────────
  const DISTANCES = [10, 15, 20, 30, 40, 50];              // cm from the lamp to the pondweed
  const TEMPS = [15, 20, 25, 30, 35, 40, 45];              // °C, set by the water bath
  const ROOM_TEMP = 25;
  const LIGHT_K = 1.2;                                     // bubbles/min per unit of light
  const WATERS = {
    none: { name: 'Boiled and cooled water', short: 'No CO₂', cap: 0,
            meta: 'Boiling drove the dissolved carbon dioxide out' },
    low:  { name: 'Pond water', short: 'A little CO₂', cap: 12,
            meta: 'Only a little dissolved carbon dioxide' },
    high: { name: 'Water + sodium hydrogencarbonate', short: 'Plenty of CO₂', cap: 36,
            meta: 'Gives off plenty of carbon dioxide' },
  };
  // Temperature factor on the CO₂-and-enzyme side of the model. Linear between points.
  const TF = [[5, 0.1], [10, 0.25], [15, 0.45], [20, 0.65], [25, 0.85], [30, 1.0], [35, 0.95], [40, 0.6], [45, 0.25], [50, 0]];
  // °C the lamp adds to the water during one count when there is NO heat shield.
  const LAMP_HEAT = { 10: 6, 15: 3, 20: 1, 30: 0, 40: 0, 50: 0 };
  const HEAT_CARD_AT = 3;       // a rise this big is worth stopping for
  const GAS_FOR_SPLINT = 20;    // bubbles collected before a glowing-splint test works

  function light(d, lampOn) {
    if (!lampOn || !(d > 0)) return 0;
    return 10000 / (d * d);
  }
  function tempFactor(T) {
    if (T <= TF[0][0]) return TF[0][1];
    for (let i = 1; i < TF.length; i++) {
      const [t1, f1] = TF[i], [t0, f0] = TF[i - 1];
      if (T <= t1) return f0 + (f1 - f0) * (T - t0) / (t1 - t0);
    }
    return 0;
  }
  // Exact rate, bubbles per minute.
  function rate(c) {
    const L = light(c.dist, c.lampOn);
    const lightRate = LIGHT_K * L;
    const co2Rate = WATERS[c.water].cap * tempFactor(c.temp);
    return Math.max(0, Math.min(lightRate, co2Rate));
  }
  // Which factor is holding the rate back: 'light' | 'co2' | 'temp'.
  function limiting(c) {
    const L = light(c.dist, c.lampOn);
    if (L <= 0) return 'light';
    if (WATERS[c.water].cap <= 0) return 'co2';
    if (tempFactor(c.temp) <= 0.3) return 'temp';
    return LIGHT_K * L < WATERS[c.water].cap * tempFactor(c.temp) ? 'light' : 'co2';
  }
  const LIMIT_WORDS = { light: 'light intensity', co2: 'carbon dioxide', temp: 'temperature' };

  // One timed count of one minute. Without a heat shield a close lamp warms the
  // water during the count, and the reading is taken at the average temperature.
  function countRun(c) {
    const heat = (!c.shield && c.lampOn) ? (LAMP_HEAT[c.dist] || 0) : 0;
    const mid = c.temp + heat / 2;
    const bubbles = Math.round(rate({ dist: c.dist, lampOn: c.lampOn, water: c.water, temp: mid }));
    return { dist: c.dist, lampOn: !!c.lampOn, water: c.water, temp: c.temp, tempEnd: c.temp + heat,
             shield: !!c.shield, light: light(c.dist, c.lampOn), bubbles, heated: heat >= HEAT_CARD_AT };
  }

  // The three variables a pupil can change. Two changed between two readings
  // is not a fair test.
  const VAR_NAMES = { light: 'the light (lamp distance)', co2: 'the carbon dioxide', temp: 'the temperature' };
  function changedVars(a, b) {
    if (!a || !b) return [];
    const out = [];
    if (Math.abs(a.light - b.light) > 1e-9) out.push('light');
    if (a.water !== b.water) out.push('co2');
    if (a.temp !== b.temp) out.push('temp');
    return out;
  }

  // What one count unlocks, given the reading before it.
  function pondDiscoveries(prev, cur) {
    const out = [];
    if (cur.lampOn && cur.bubbles > 0) out.push('bubbles');
    if (!cur.lampOn) out.push('dark_stop');
    if (cur.lampOn && cur.water === 'none') out.push('no_co2');
    if (cur.lampOn && cur.water === 'high' && cur.temp >= 40) out.push('too_hot');
    const ch = changedVars(prev, cur);
    if (prev && ch.length === 1 && !prev.heated && !cur.heated) {
      if (ch[0] === 'light' && cur.light > prev.light && prev.lampOn) {
        if (cur.bubbles > prev.bubbles) out.push('closer_faster');
        else if (cur.bubbles === prev.bubbles && cur.bubbles > 0) out.push('plateau');
      }
      if (ch[0] === 'co2' && prev.water === 'low' && cur.water === 'high' && cur.bubbles > prev.bubbles) out.push('co2_boost');
      if (ch[0] === 'temp' && cur.temp > prev.temp && cur.temp <= 35 && cur.bubbles > prev.bubbles) out.push('warmer');
    }
    return out;
  }

  // ── Leaf and starch test ───────────────────────
  // A leaf is a 9 × 6 grid; cells outside the leaf outline are not leaf.
  const LEAF_W = 9, LEAF_H = 6;
  const PLANTS = {
    green:      { name: 'Green plant', meta: 'Green all over', icon: '🌿' },
    variegated: { name: 'Variegated plant', meta: 'Green middle, white edges', icon: '🪴' },
  };
  const COVERS = {
    none:     { name: 'Nothing', meta: 'The leaf is left as it is' },
    foil:     { name: 'Foil strip', meta: 'Foil over the middle of one leaf' },
    sodalime: { name: 'Flask + soda lime', meta: 'Soda lime absorbs carbon dioxide' },
    flask:    { name: 'Flask, no soda lime', meta: 'The control for the soda-lime leaf' },
  };
  function cellInfo(c, r, plant, cover) {
    const x = (c - 4) / 4.5, y = (r - 2.5) / 3;
    const leaf = x * x + y * y <= 1;
    const ix = (c - 4) / 3.1, iy = (r - 2.5) / 1.9;
    const green = leaf && (plant !== 'variegated' || ix * ix + iy * iy <= 1);
    const covered = leaf && cover === 'foil' && c >= 3 && c <= 5;
    return { leaf, green, covered };
  }
  // setup = { plant, destarched, cover, day }  day: null | 'light' | 'dark'
  // Starch is there if it was stored before (a plant that was never destarched,
  // in its green parts) or was made during a day in the light - which needs
  // chlorophyll, light AND carbon dioxide in that part of the leaf.
  function starchMap(s) {
    const rows = [];
    for (let r = 0; r < LEAF_H; r++) {
      const row = [];
      for (let c = 0; c < LEAF_W; c++) {
        const k = cellInfo(c, r, s.plant, s.cover);
        const old = !s.destarched && k.green;
        const made = s.day === 'light' && k.green && !k.covered && s.cover !== 'sodalime';
        row.push({ leaf: k.leaf, green: k.green, covered: k.covered, starch: k.leaf && (old || made) });
      }
      rows.push(row);
    }
    return rows;
  }

  // The starch test, in its only right order: boil → ethanol (water bath) →
  // rinse → iodine. steps = the order the pupil actually did them.
  //   'clear'  the result can be read
  //   'masked' no ethanol: the green chlorophyll hides the colour
  //   'no_boil' no boiling before the ethanol: membranes intact, the ethanol
  //             and the iodine cannot get in
  function starchReading(steps) {
    const iE = steps.indexOf('ethanol'), iB = steps.indexOf('boil');
    if (iE < 0) return 'masked';
    if (iB < 0 || iB > iE) return 'no_boil';
    return 'clear';
  }
  const IODINE = { starch: '#1C1B3A', none: '#C9782C', brown: '#B8692A' };

  function _groups(map) {
    const g = { lit: [0, 0], covered: [0, 0], white: [0, 0] };
    map.forEach(row => row.forEach(k => {
      if (!k.leaf) return;
      const key = !k.green ? 'white' : k.covered ? 'covered' : 'lit';
      g[key][0]++; if (k.starch) g[key][1]++;
    }));
    return g;
  }
  // What the iodine shows, in words.
  function describe(s, map) {
    const g = _groups(map);
    const all = (x) => x[0] > 0 && x[1] === x[0], none = x => x[0] > 0 && x[1] === 0;
    const total = g.lit[0] + g.covered[0] + g.white[0], st = g.lit[1] + g.covered[1] + g.white[1];
    if (st === 0) return 'Orange-brown all over: no starch anywhere in the leaf.';
    if (st === total && g.covered[0]) return 'Blue-black all over - even under the foil: starch everywhere in the leaf.';
    if (st === total) return 'Blue-black all over: starch everywhere in the leaf.';
    const parts = [];
    if (g.covered[0] && none(g.covered) && all(g.lit)) parts.push('blue-black where the leaf had light, orange-brown under the foil');
    else if (g.covered[0] && none(g.covered)) parts.push('orange-brown under the foil');
    if (g.covered[0] && all(g.covered)) parts.push('blue-black even under the foil');
    if (g.white[0] && none(g.white) && all(g.lit) && !g.covered[0]) parts.push('blue-black where the leaf was green, orange-brown where it was white');
    else if (g.white[0] && none(g.white)) parts.push('orange-brown where the leaf was white');
    if (!parts.length) parts.push('blue-black in some parts and orange-brown in others');
    const s0 = parts.join('; ');
    return s0.charAt(0).toUpperCase() + s0.slice(1) + '.';
  }

  // The setups that are experiments (they test one factor), not just "is there starch?"
  const isExperiment = s => s.cover !== 'none' || s.plant === 'variegated';

  // What a clear reading unlocks.
  function leafDiscoveries(s) {
    const out = [];
    if (s.plant === 'green' && s.cover === 'none' && !s.destarched) out.push('starch_yes');
    if (s.plant === 'green' && s.cover === 'none' && s.destarched && s.day !== 'light') out.push('destarched');
    if (s.plant === 'green' && s.cover === 'none' && s.destarched && s.day === 'light') out.push('starch_made');
    if (s.destarched && s.day === 'light') {
      if (s.plant === 'variegated' && s.cover === 'none') out.push('variegated');
      if (s.plant === 'green' && s.cover === 'foil') out.push('foil');
      if (s.plant === 'green' && s.cover === 'sodalime') out.push('sodalime');
      if (s.plant === 'green' && s.cover === 'flask') out.push('control');
    }
    return out;
  }

  // ── The equation ────────────────────────────────
  const EQUATION = {
    word: 'carbon dioxide + water → glucose + oxygen',
    over: 'light energy, absorbed by chlorophyll',
    sym: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',
    symNote: 'The balanced symbol equation is beyond the NCE syllabus - the paper asks for the word equation (Biology 2024 Q5(c)(i)).',
  };

  // ── Discoveries ─────────────────────────────────
  // how = guide tokens (see GUIDES below). A FOUND card shows `saw`, the
  // equation when `eq`, and `learn`. scripts/test-labs-photo.js follows every
  // `how` from a fresh bench and fails if it does not unlock its own card.
  const POND = ['rig:pond'];
  const TEST = ['bunsen:on', 'boil', 'bunsen:off', 'ethanol', 'rinse', 'iodine'];
  const DISCOVERIES = [
    { id: 'bubbles', icon: '🫧', title: 'The pondweed bubbles', hint: 'Pondweed in the light - count what comes off it',
      how: [...POND, 'water:high', 'dist:20', 'count'], eq: true,
      saw: 'Streams of small bubbles rose from the cut stem of the pondweed and collected at the top of the tube.',
      learn: 'The bubbles are mostly oxygen, a product of photosynthesis. The more bubbles per minute, the faster the pondweed is photosynthesising.' },
    { id: 'dark_stop', icon: '🌑', title: 'No light, no bubbles', hint: 'Switch the lamp off in the dark room',
      how: [...POND, 'water:high', 'lamp:off', 'count'],
      saw: 'With the lamp off in the dark room, not a single bubble came off in a whole minute.',
      learn: 'Photosynthesis needs light energy. Without it the pondweed stops making oxygen - light is an essential factor.' },
    { id: 'closer_faster', icon: '💡', title: 'Closer lamp, more bubbles', hint: 'Count, then move the lamp closer and count again',
      how: [...POND, 'water:high', 'shield:on', 'dist:40', 'count', 'dist:20', 'count'],
      saw: 'Moving the lamp from 40 cm to 20 cm made the bubbles come much faster.',
      learn: 'A closer lamp means brighter light. More light energy gives a faster rate of photosynthesis - while light is the limiting factor.' },
    { id: 'plateau', icon: '📈', title: 'It levels off', hint: 'Pond water: bring the lamp very close - does it keep rising?',
      how: [...POND, 'water:low', 'shield:on', 'dist:20', 'count', 'dist:10', 'count'],
      saw: 'The lamp came closer but the number of bubbles per minute stayed the same.',
      learn: 'Once there is plenty of light, something else holds the rate back - here, the small amount of carbon dioxide in pond water. The factor in shortest supply is the LIMITING factor.' },
    { id: 'co2_boost', icon: '🧂', title: 'More carbon dioxide, faster', hint: 'Lamp close, pond water - then add sodium hydrogencarbonate',
      how: [...POND, 'shield:on', 'dist:10', 'water:low', 'count', 'water:high', 'count'],
      saw: 'Adding sodium hydrogencarbonate to the water tripled the bubbles per minute.',
      learn: 'Sodium hydrogencarbonate gives off carbon dioxide in the water. With bright light, carbon dioxide was the limiting factor - so more of it sped photosynthesis up.' },
    { id: 'no_co2', icon: '🚫', title: 'No carbon dioxide, no bubbles', hint: 'Bright light, but water with no carbon dioxide',
      how: [...POND, 'shield:on', 'dist:10', 'water:none', 'count'],
      saw: 'Even with the lamp close, pondweed in boiled and cooled water gave off no bubbles.',
      learn: 'Boiling drives the dissolved carbon dioxide out of water. Carbon dioxide is a raw material of photosynthesis, so without it there is none.' },
    { id: 'warmer', icon: '🌡️', title: 'Warmer water, faster', hint: 'Compare cool water with warm water',
      how: [...POND, 'water:high', 'shield:on', 'dist:10', 'temp:15', 'count', 'temp:30', 'count'],
      saw: 'At 30 °C the pondweed gave off more than twice as many bubbles as at 15 °C.',
      learn: 'Warmth speeds up the chemical reactions of photosynthesis, up to an optimum temperature - around 30 °C for this pondweed.' },
    { id: 'too_hot', icon: '🥵', title: 'Too hot to work', hint: 'Plenty of light and CO₂ - but very hot water',
      how: [...POND, 'water:high', 'shield:on', 'dist:10', 'temp:45', 'count'],
      saw: 'At 45 °C the bubbles slowed right down, even with bright light and plenty of carbon dioxide.',
      learn: 'Above the optimum temperature the rate falls. The reactions are controlled by enzymes, which are damaged by heat (enzymes are beyond the NCE syllabus).' },
    { id: 'oxygen', icon: '🪵', title: 'The gas is oxygen', hint: 'Collect the gas, then test it with a glowing splint',
      how: [...POND, 'water:high', 'shield:on', 'dist:10', 'count', 'splint'], eq: true,
      saw: 'The glowing splint relit in the gas collected from the pondweed.',
      learn: 'A glowing splint relights in oxygen - the test for oxygen. The oxygen comes from photosynthesis: carbon dioxide + water → glucose + oxygen.' },
    { id: 'starch_yes', icon: '🔵', title: 'Starch in a leaf', hint: 'Test a leaf from a plant that has been in the sun',
      how: ['rig:leaf', 'plant:green', 'pick', ...TEST], eq: true,
      saw: 'After the iodine, the whole leaf turned blue-black.',
      learn: 'Iodine solution turns blue-black with starch. The leaf stores the glucose it makes by photosynthesis as starch, so starch in a leaf is the sign it has been photosynthesising.' },
    { id: 'chlorophyll_out', icon: '🟢', title: 'The green comes out', hint: 'Boil a leaf, then warm it in ethanol in a water bath',
      how: ['rig:leaf', 'plant:green', 'pick', 'bunsen:on', 'boil', 'bunsen:off', 'ethanol'],
      saw: 'In the hot ethanol the leaf turned white and the ethanol turned green.',
      learn: 'Ethanol dissolves chlorophyll out of the leaf. With the green gone, the colour of the iodine test can be seen clearly.' },
    { id: 'destarched', icon: '🌑', title: 'A destarched leaf', hint: 'Keep a plant in the dark for 48 hours, then test a leaf',
      how: ['rig:leaf', 'plant:green', 'destarch', 'pick', ...TEST],
      saw: 'After 48 hours in the dark, the leaf stayed orange-brown with iodine: no starch.',
      learn: 'In the dark a plant cannot photosynthesise, so it uses up the starch stored in its leaves. Destarching makes sure any starch found later was made during the experiment.' },
    { id: 'starch_made', icon: '☀️', title: 'Starch made in a day', hint: 'Destarch a plant, then give it a day in sunlight',
      how: ['rig:leaf', 'plant:green', 'destarch', 'day:light', 'pick', ...TEST], eq: true,
      saw: 'The destarched plant, after a day in sunlight, had a blue-black leaf again.',
      learn: 'In one day of light the leaf made glucose by photosynthesis and stored it as starch - starch that was not there before.' },
    { id: 'variegated', icon: '🪴', title: 'Chlorophyll is needed', hint: 'A variegated leaf - destarched, then a day in the light',
      how: ['rig:leaf', 'plant:variegated', 'destarch', 'day:light', 'pick', ...TEST],
      saw: 'Only the parts that were green turned blue-black. The white edges stayed orange-brown.',
      learn: 'The white parts of a variegated leaf have no chlorophyll, so they cannot photosynthesise and make no starch. Chlorophyll is essential for photosynthesis.' },
    { id: 'foil', icon: '🔲', title: 'Light is needed', hint: 'Cover part of a destarched leaf with foil for a day',
      how: ['rig:leaf', 'plant:green', 'destarch', 'cover:foil', 'day:light', 'pick', ...TEST],
      saw: 'The part that was under the foil stayed orange-brown; the uncovered parts turned blue-black.',
      learn: 'The covered part got no light, so it made no starch. Light is essential for photosynthesis - and the uncovered part of the same leaf is the control.' },
    { id: 'sodalime', icon: '⚗️', title: 'Carbon dioxide is needed', hint: 'A destarched leaf in a flask with soda lime',
      how: ['rig:leaf', 'plant:green', 'destarch', 'cover:sodalime', 'day:light', 'pick', ...TEST],
      saw: 'The leaf from the soda-lime flask stayed orange-brown all over: no starch.',
      learn: 'Soda lime absorbs carbon dioxide. With no carbon dioxide the leaf could not photosynthesise, so carbon dioxide is essential.' },
    { id: 'control', icon: '⚖️', title: 'The control leaf', hint: 'The same flask, but WITHOUT soda lime',
      how: ['rig:leaf', 'plant:green', 'destarch', 'cover:flask', 'day:light', 'pick', ...TEST],
      saw: 'The leaf in the flask without soda lime turned blue-black.',
      learn: 'The control is identical except for the one factor being tested. Because it made starch, the soda-lime leaf’s result must be due to the missing carbon dioxide - not the flask.' },
  ];

  // ── Hazards: the mistakes that stop the experiment ───
  const HAZARDS = {
    ethanol_flame: {
      signs: ['flammable'],
      title: () => 'Fire! Ethanol must never go over a flame',
      happened: () => 'You held the tube of ethanol over the Bunsen flame. Ethanol boils at only 78 °C: its vapour poured out of the tube, met the flame and caught fire.',
      why: 'Ethanol is highly flammable - its vapour catches fire very easily. A burning tube can be dropped and spread burning ethanol across the bench, onto hands and clothes.',
      instead: 'Boil the water first, TURN OFF the Bunsen, then stand the tube of ethanol in the hot water - a water bath. The hot water is enough to make ethanol boil.',
      exam: '“Why is the ethanol heated in a water bath and not over a flame?” - Ethanol is flammable (it catches fire easily).',
    },
    ethanol_lit: {
      signs: ['flammable'],
      title: () => 'Fire! The Bunsen was still burning',
      happened: () => 'You stood the ethanol in the water bath while the Bunsen was still lit underneath. Ethanol vapour rising from the tube drifted down to the flame and flashed into fire.',
      why: 'A water bath only keeps ethanol safe if there is no naked flame nearby. Ethanol vapour is heavier than air and can travel to a flame some distance away.',
      instead: 'Turn the Bunsen OFF before the ethanol comes anywhere near the bench. The water is already hot enough.',
      exam: 'A safety precaution for the starch test: switch off the Bunsen burner before using ethanol, and heat the ethanol only in a water bath.',
    },
  };

  // ── Wrong but safe: what went wrong and what to do instead ───
  const RESULTS = {
    no_ethanol: { icon: '🟢', title: 'The green hid the colour',
      happened: () => 'You added iodine to a leaf that was still green. The dark green of the chlorophyll masks the colour change, so you cannot tell blue-black from orange-brown.',
      instead: 'After boiling, warm the leaf in ethanol in a water bath until it turns white. The chlorophyll dissolves into the ethanol, and the iodine result shows clearly.',
      exam: '“Why is the leaf placed in hot ethanol?” - To remove the chlorophyll (decolourise the leaf) so the colour change with iodine can be seen.' },
    no_boil: { icon: '🍃', title: 'The iodine could not get in',
      happened: c => c.late
        ? 'You boiled the leaf AFTER the ethanol. While it was in the ethanol its cells were still alive with their membranes whole, so hardly any chlorophyll came out, and the iodine could not reach the starch: the leaf stayed pale green with faint patches.'
        : 'You skipped boiling the leaf. Its cells were still alive with their membranes whole, so the ethanol removed only a little chlorophyll and the iodine could not reach the starch: the leaf stayed pale green with faint patches.',
      instead: 'Boil the leaf in water FIRST, for about a minute. It kills the cells and breaks their membranes, so the ethanol and then the iodine can get in. Then ethanol, then rinse, then iodine.',
      exam: 'Putting the steps of a procedure in order is an NCE question shape (Biology 2025 Q5(c)). Boiling stops the reactions and makes the leaf permeable to iodine.' },
    not_destarched: { icon: '🌑', title: 'Not a fair test - the starch was already there',
      happened: c => c.cover === 'foil' ? 'Even the part that was under the foil turned blue-black. That starch was made BEFORE the foil went on - the plant was never destarched.'
        : c.cover === 'sodalime' ? 'The leaf in the soda-lime flask turned blue-black, even with no carbon dioxide. That starch was already in the leaf - the plant was never destarched.'
        : c.cover === 'flask' ? 'The control leaf turned blue-black - but it would have done anyway: the starch was already in it, because the plant was never destarched.'
        : 'The green parts turned blue-black - but that starch may have been made days ago, before the experiment began. The plant was never destarched.',
      instead: 'Destarch the plant first: keep it in the dark for 48 hours so it uses up the starch in its leaves. Then any starch you find must have been made during the experiment.',
      exam: '“Why is the plant kept in the dark for 48 hours first?” - To destarch it: to remove the starch already in its leaves. (Do not confuse it with removing chlorophyll, which is done later in ethanol.)' },
    two_vars_leaf: { icon: '⚖️', title: 'Two things changed at once',
      happened: () => 'You covered a VARIEGATED leaf with foil. The white edges had no chlorophyll AND the middle had no light, so when parts stayed orange-brown you cannot tell which factor was missing.',
      instead: 'Test one factor at a time: a plain green leaf with a foil strip tests light; a variegated leaf with no foil tests chlorophyll.',
      exam: 'A fair test changes only ONE variable. “Name a controlled variable” is a paper question (Biology 2024 Q5(b)(i)).' },
    two_vars: { icon: '⚖️', title: 'Not a fair test - two things changed',
      happened: c => `Between your last two counts you changed ${c.list}. The bubbles went from ${c.a} to ${c.b} per minute - but which change caused it? There is no way to tell.`,
      instead: 'Change ONE variable (the independent variable), measure the bubbles per minute (the dependent variable) and keep everything else the same (the controlled variables).',
      exam: '“Give one variable that needs to be kept constant” - Biology 2024 Q5(b)(i): the temperature of the water, the distance of the lamp, the type and size of pondweed.' },
    lamp_heat: { icon: '🌡️', title: 'The lamp heated the water',
      happened: c => `With the lamp only ${c.dist} cm away and no heat shield, the water warmed from ${c.t0} °C to ${c.t1} °C during the count. The temperature changed as well as the light, so this reading is not a fair test.`,
      instead: 'Put a heat shield - a glass tank of water - between the lamp and the tube, and check the thermometer before and after every count.',
      exam: '“Suggest an improvement to the set-up” - Biology 2024 Q5(b)(iii): use a heat shield or water bath to keep the temperature constant.' },
  };

  // Short, true facts for the 💡 button. Tied to the chapter, never trivia for its own sake.
  const FACTS = [
    'Photosynthesis happens in the chloroplasts, which hold the green pigment chlorophyll.',
    'Carbon dioxide gets into a leaf through tiny pores called stomata, mostly on its lower surface.',
    'A leaf stores the glucose it makes as starch - that is why we test leaves for starch.',
    'The palisade layer, just under the upper surface of a leaf, is packed with chloroplasts to catch the light.',
    'A leaf is broad for a big surface to catch light, and thin so gases have only a short way to diffuse.',
    'Word equation: carbon dioxide + water → glucose + oxygen, using light energy absorbed by chlorophyll.',
    'The factor in shortest supply holds the rate back - the limiting factor. Improve anything else and nothing changes.',
    'A lamp twice as far away gives about a quarter of the light (the inverse square law - beyond the NCE syllabus).',
    'A fair test changes ONE variable (independent), measures one (dependent) and keeps the rest the same (controlled).',
    'Plants need minerals too: nitrate for proteins and growth, magnesium to make chlorophyll, phosphate for healthy roots.',
    'A plant short of magnesium cannot make enough chlorophyll, so its leaves turn yellow.',
    'Sugar cane, grown all over Mauritius, stores the sugar it makes by photosynthesis in its stems.',
    'Plants respire all the time, day and night. In bright light they photosynthesise faster, so they give out more oxygen than they use.',
    'Iodine solution is brown-orange. It turns blue-black only where there is starch.',
  ];

  // ── Missions ── A question's FIRST option is the answer; the quiz shuffles them.
  const MISSIONS = [
    {
      id: 'light', icon: '💡', title: 'Light and bubbles', rig: 'pond', need: 4,
      blurb: 'Change only the lamp distance, count the bubbles, and read your results table.',
      intro: 'Hypothesis: the closer the lamp, the faster the pondweed photosynthesises. Add sodium hydrogencarbonate, put the heat shield in place, then count the bubbles at 4 different distances - changing ONLY the distance.',
      quiz: [
        { q: 'In your experiment, which was the independent variable (the one you changed on purpose)?',
          options: ['The distance of the lamp from the pondweed', 'The number of bubbles per minute', 'The temperature of the water', 'The amount of sodium hydrogencarbonate'],
          why: 'You moved the lamp on purpose. The bubbles are what you measured (dependent); temperature and CO₂ were kept the same (controlled).' },
        { q: 'Give one variable that was kept constant (a controlled variable).',
          options: ['The temperature of the water', 'The distance of the lamp', 'The number of bubbles per minute', 'The light intensity'],
          why: 'Biology 2024 Q5(b)(i). Temperature, the type and size of pondweed and the amount of carbon dioxide are all controlled variables. Distance and light intensity are what you changed.' },
        { q: 'Describe the trend in your results table.',
          options: ['As the lamp came closer, the bubbles per minute rose, then levelled off', 'As the lamp came closer, the bubbles per minute fell', 'The bubbles per minute were the same at every distance', 'The bubbles per minute rose steadily and never levelled off'],
          why: 'Far away, each step closer gave many more bubbles; very close, the rate stopped rising - the levelling off is part of the trend.' },
        { q: 'Why did the rate stop rising when the lamp was very close?',
          options: ['Another factor, such as carbon dioxide or temperature, became limiting', 'The bright light damaged the pondweed', 'The pondweed ran out of chlorophyll', 'The lamp stopped giving out light'],
          why: 'Once there is plenty of light, the rate is held back by whichever factor is now in shortest supply - the limiting factor.' },
        { q: 'Why was a heat shield (a tank of water) put between the lamp and the tube?',
          options: ['To stop the lamp heating the water, so the temperature stays constant', 'To make the light brighter', 'To give the pondweed more carbon dioxide', 'To collect the bubbles more easily'],
          why: 'A close lamp warms the water. Temperature also changes the rate, so it must be kept constant for a fair test.' },
        { q: 'Did your results support the hypothesis “the closer the lamp, the faster the pondweed photosynthesises”?',
          options: ['Yes, up to a point: the rate rose as the lamp came closer, then levelled off', 'No: the rate fell as the lamp came closer', 'Yes: the rate rose at every distance without stopping', 'A hypothesis cannot be tested by counting bubbles'],
          why: 'The data support it while light is the limiting factor. Saying “up to a point” is what a careful scientist would write.' },
        { q: 'Which gas makes up most of the bubbles?',
          options: ['Oxygen', 'Carbon dioxide', 'Hydrogen', 'Nitrogen'],
          why: 'carbon dioxide + water → glucose + oxygen. Oxygen is given off; a glowing splint relights in it.' },
      ],
    },
    {
      id: 'needs', icon: '🔬', title: 'What does a plant need?', rig: 'pond',
      blurb: 'The 2024 paper’s experiment: light and carbon dioxide, each present or absent.',
      intro: 'Biology 2024 Q5(b), in a dark room whose only light is the lamp. Run four tests - light with and without carbon dioxide, and no light with and without it. Use boiled and cooled water for “no CO₂” and sodium hydrogencarbonate for “CO₂”. Keep the lamp distance and temperature the same.',
      tests: [
        { lampOn: true, co2: false, label: 'Light ✓ · CO₂ ✗' },
        { lampOn: false, co2: true, label: 'Light ✗ · CO₂ ✓' },
        { lampOn: true, co2: true, label: 'Light ✓ · CO₂ ✓' },
        { lampOn: false, co2: false, label: 'Light ✗ · CO₂ ✗' },
      ],
      quiz: [
        { q: 'Give one variable that needs to be kept constant in each test.',
          options: ['The temperature of the water', 'Whether the lamp is switched on', 'Whether carbon dioxide is added', 'The number of bubbles per minute'],
          why: 'Biology 2024 Q5(b)(i). Light and carbon dioxide were changed on purpose, and the bubbles were measured. Temperature, lamp distance and the pondweed stay the same.' },
        { q: 'Which conclusion can be drawn from the four tests?',
          options: ['Photosynthesis needs both light and carbon dioxide', 'Light alone is enough for photosynthesis', 'Carbon dioxide alone is enough for photosynthesis', 'Neither light nor carbon dioxide affects photosynthesis'],
          why: 'Biology 2024 Q5(b)(ii). Bubbles came only when BOTH were present; take either away and there were none.' },
        { q: 'Why was the investigation done in a dark room?',
          options: ['So the lamp was the only source of light', 'So the bubbles were easier to see', 'To keep the water cold', 'Because pondweed only grows in the dark'],
          why: 'Daylight from a window would light the “no light” tests too, and the comparison would be spoiled.' },
        { q: 'How was the carbon dioxide removed from the water?',
          options: ['The water was boiled and then cooled', 'Iodine solution was added', 'Salt was dissolved in it', 'The lamp was switched off'],
          why: 'Boiling drives dissolved gases out of water. It is cooled again so the temperature matches the other tests.' },
        { q: 'How could you show that the gas given off is oxygen?',
          options: ['It relights a glowing splint', 'It turns limewater milky', 'It burns with a squeaky pop', 'It turns iodine blue-black'],
          why: 'A glowing splint relights in oxygen. Limewater is the test for carbon dioxide, the squeaky pop for hydrogen, and iodine for starch.' },
        { q: 'Complete the word equation: carbon dioxide + water → …',
          options: ['glucose + oxygen', 'starch + carbon dioxide', 'glucose + water', 'oxygen + carbon dioxide'],
          why: 'Biology 2024 Q5(c)(i). Carbon dioxide and water are the raw materials; glucose and oxygen are the products, with light energy absorbed by chlorophyll.' },
      ],
    },
    {
      id: 'starch', icon: '🪴', title: 'Is there starch?', rig: 'leaf',
      blurb: 'Destarch a variegated plant, give it a day of light, then test a leaf - in the right order.',
      intro: 'Does a leaf need chlorophyll to make starch? Choose the variegated plant, destarch it (48 hours in the dark), give it a day in sunlight, pick a leaf and test it for starch: boil, ethanol in a water bath, rinse, iodine.',
      quiz: [
        { q: 'Why was the plant kept in the dark for 48 hours before the experiment?',
          options: ['To remove the starch already in its leaves', 'To remove the chlorophyll from its leaves', 'To make the leaves take up more iodine', 'To kill the cells in the leaves'],
          why: 'Destarching means any starch found afterwards was made during the experiment. Chlorophyll is removed later, in ethanol.' },
        { q: 'Why is the leaf boiled in water first?',
          options: ['To kill the cells and soften the leaf so the iodine can get in', 'To remove the chlorophyll from the leaf', 'To add starch to the leaf', 'To turn the starch into glucose'],
          why: 'Boiling breaks the cell membranes, so ethanol and iodine can reach inside the cells.' },
        { q: 'Why is the ethanol warmed in a water bath and not over a flame?',
          options: ['Ethanol is flammable and could catch fire', 'A flame is not hot enough to warm ethanol', 'A water bath dissolves the chlorophyll faster than a flame', 'A flame would turn the ethanol into starch'],
          why: 'Ethanol catches fire very easily. Heat the water, turn off the Bunsen, then stand the ethanol in the hot water.' },
        { q: 'Put the steps of the starch test in the right order.',
          options: ['Boil in water → ethanol in a water bath → rinse in warm water → iodine', 'Iodine → boil in water → ethanol → rinse', 'Ethanol → boil in water → iodine → rinse', 'Rinse → iodine → ethanol → boil in water'],
          why: 'Boil first (cells killed), then ethanol (chlorophyll out), then rinse (softens the brittle leaf), then iodine.' },
        { q: 'What colour did the white parts of the leaf turn with iodine?',
          options: ['Orange-brown', 'Blue-black', 'Green', 'Milky white'],
          why: 'No starch, so the iodine keeps its own orange-brown colour. Blue-black means starch.' },
        { q: 'What does the result show?',
          options: ['Chlorophyll is needed for photosynthesis', 'Light is needed for photosynthesis', 'Carbon dioxide is needed for photosynthesis', 'Water is needed for photosynthesis'],
          why: 'The green and white parts had the same light, air and water. Only chlorophyll differed - and only the green parts made starch.' },
      ],
    },
  ];

  // ── Guided experiments: "I landed here - what do I do?" ──
  // One action per step. `on` is what completes it:
  //   rig:pond|leaf · dist:<cm> · lamp:on|off · water:none|low|high · temp:<°C>
  //   shield:on|off · count (a one-minute count has finished) · splint
  //   plant:green|variegated · destarch · cover:none|foil|sodalime|flask
  //   day:light|dark · pick · bunsen:on|off · boil · ethanol · rinse · iodine
  // A step whose setting is already in place is skipped.
  const GUIDES = [
    { id: 'bubbles', icon: '🫧', title: 'Make it bubble',
      blurb: 'Shine a lamp on pondweed and count the bubbles it gives off.',
      lesson: 'The bubbles are oxygen from photosynthesis. With the lamp closer the light was brighter, and the pondweed gave off more bubbles per minute: more light, faster photosynthesis.',
      steps: [
        { on: 'rig:pond', say: 'Go to the pondweed rig.', btn: '🌿 Pondweed rig' },
        { on: 'water:high', say: 'Add sodium hydrogencarbonate, so the pondweed has plenty of carbon dioxide.', btn: '🧂 Add sodium hydrogencarbonate' },
        { on: 'shield:on', say: 'Put the heat shield between the lamp and the tube, so the lamp cannot warm the water.', btn: '🧊 Heat shield in' },
        { on: 'dist:30', say: 'Put the lamp 30 cm from the pondweed.', btn: '💡 Lamp at 30 cm' },
        { on: 'count', say: 'Count the bubbles for one minute.', btn: '⏱ Count for 1 minute' },
        { on: 'dist:10', say: 'Now bring the lamp in to 10 cm. Change nothing else.', btn: '💡 Lamp at 10 cm' },
        { on: 'count', say: 'Count again. More bubbles, or fewer?', btn: '⏱ Count for 1 minute' },
      ] },
    { id: 'starch', icon: '🔵', title: 'Test a leaf for starch',
      blurb: 'Boil, ethanol in a water bath, rinse, iodine - in the right order.',
      lesson: 'Iodine turned the leaf blue-black, so it held starch - made from the glucose of photosynthesis. Boiling let the chemicals in, ethanol removed the green, and the water bath kept the ethanol away from any flame.',
      steps: [
        { on: 'rig:leaf', say: 'Go to the starch-test bench.', btn: '🍃 Starch-test bench' },
        { on: 'plant:green', say: 'Choose the green plant that has been in the sun.', btn: '🌿 Green plant' },
        { on: 'pick', say: 'Pick a leaf.', btn: '✂️ Pick a leaf' },
        { on: 'bunsen:on', say: 'Light the Bunsen burner to boil the water in the beaker.', btn: '🔥 Light the Bunsen' },
        { on: 'boil', say: 'Boil the leaf in the water for about a minute. It kills the cells so chemicals can get in.', btn: '♨️ Boil the leaf' },
        { on: 'bunsen:off', say: 'Turn the Bunsen OFF - ethanol is next, and ethanol is flammable.', btn: '⭕ Turn the Bunsen off' },
        { on: 'ethanol', say: 'Put the leaf in a tube of ethanol and stand it in the hot water: a water bath.', btn: '🧴 Ethanol in the water bath' },
        { on: 'rinse', say: 'The leaf is white and brittle. Dip it in warm water to soften it.', btn: '🚿 Rinse in warm water' },
        { on: 'iodine', say: 'Spread it on a white tile and add iodine solution.', btn: '🟤 Add iodine solution' },
      ] },
    { id: 'foilexp', icon: '🔲', title: 'Does a leaf need light?',
      blurb: 'Cover part of a destarched leaf with foil, then test it for starch.',
      lesson: 'Only the parts that had light made starch. The part under the foil stayed orange-brown, so light is needed for photosynthesis. Destarching first made it a fair test.',
      steps: [
        { on: 'rig:leaf', say: 'Go to the starch-test bench.', btn: '🍃 Starch-test bench' },
        { on: 'plant:green', say: 'Choose the green plant.', btn: '🌿 Green plant' },
        { on: 'destarch', say: 'Destarch it: 48 hours in a dark cupboard uses up the starch in its leaves.', btn: '🌑 Destarch (48 h dark)' },
        { on: 'cover:foil', say: 'Fix a strip of foil across the middle of one leaf.', btn: '🔲 Foil strip on' },
        { on: 'day:light', say: 'Give the plant a day in sunlight.', btn: '☀️ A day in sunlight' },
        { on: 'pick', say: 'Pick the foil-covered leaf and take the foil off.', btn: '✂️ Pick the leaf' },
        { on: 'bunsen:on', say: 'Light the Bunsen to boil the water.', btn: '🔥 Light the Bunsen' },
        { on: 'boil', say: 'Boil the leaf for about a minute.', btn: '♨️ Boil the leaf' },
        { on: 'bunsen:off', say: 'Turn the Bunsen OFF before the ethanol comes out.', btn: '⭕ Turn the Bunsen off' },
        { on: 'ethanol', say: 'Warm the leaf in ethanol in the water bath.', btn: '🧴 Ethanol in the water bath' },
        { on: 'rinse', say: 'Rinse it in warm water.', btn: '🚿 Rinse in warm water' },
        { on: 'iodine', say: 'Add iodine solution. Where is the starch?', btn: '🟤 Add iodine solution' },
      ] },
    { id: 'limit', icon: '📈', title: 'The limiting factor',
      blurb: 'Find the point where more light stops helping - and what fixes it.',
      lesson: 'In pond water, bringing the lamp closer stopped helping: carbon dioxide was the limiting factor. Adding sodium hydrogencarbonate gave more carbon dioxide, and the rate jumped.',
      steps: [
        { on: 'rig:pond', say: 'Go to the pondweed rig.', btn: '🌿 Pondweed rig' },
        { on: 'water:low', say: 'Use ordinary pond water - it has only a little carbon dioxide.', btn: '💧 Pond water' },
        { on: 'shield:on', say: 'Put the heat shield in, so the temperature stays the same.', btn: '🧊 Heat shield in' },
        { on: 'dist:20', say: 'Put the lamp 20 cm away.', btn: '💡 Lamp at 20 cm' },
        { on: 'count', say: 'Count the bubbles for one minute.', btn: '⏱ Count for 1 minute' },
        { on: 'dist:10', say: 'Bring the lamp closer, to 10 cm.', btn: '💡 Lamp at 10 cm' },
        { on: 'count', say: 'Count again. Did brighter light help this time?', btn: '⏱ Count for 1 minute' },
        { on: 'water:high', say: 'Now give it more carbon dioxide: add sodium hydrogencarbonate.', btn: '🧂 Add sodium hydrogencarbonate' },
        { on: 'count', say: 'Count one more time.', btn: '⏱ Count for 1 minute' },
      ] },
  ];

  return { DISTANCES, TEMPS, ROOM_TEMP, LIGHT_K, WATERS, TF, LAMP_HEAT, HEAT_CARD_AT, GAS_FOR_SPLINT,
           light, tempFactor, rate, limiting, LIMIT_WORDS, countRun, VAR_NAMES, changedVars, pondDiscoveries,
           LEAF_W, LEAF_H, PLANTS, COVERS, cellInfo, starchMap, starchReading, IODINE, describe, isExperiment, leafDiscoveries,
           EQUATION, DISCOVERIES, HAZARDS, RESULTS, FACTS, MISSIONS, GUIDES };
})();
if (typeof window !== 'undefined') window.LabPhotoData = LabPhotoData;
