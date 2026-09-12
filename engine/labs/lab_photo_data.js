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
      learn: 'The control is identical except for the one factor being tested. Because it made starch, the soda-lime leaf\'s result must be due to the missing carbon dioxide - not the flask.' },
  ];

  // ── Hazards: the mistakes that stop the experiment ───
  const HAZARDS = {
    ethanol_flame: {
      signs: ['flammable'],
      title: () => 'Fire! Ethanol must never go over a flame',
      happened: () => 'You held the tube of ethanol over the Bunsen flame. Ethanol boils at only 78 °C: its vapour poured out of the tube, met the flame and caught fire.',
      why: 'Ethanol is highly flammable - its vapour catches fire very easily. A burning tube can be dropped and spread burning ethanol across the bench, onto hands and clothes.',
      instead: 'Boil the water first, TURN OFF the Bunsen, then stand the tube of ethanol in the hot water - a water bath. The hot water is enough to make ethanol boil.',
      exam: '"Why is the ethanol heated in a water bath and not over a flame?" - Ethanol is flammable (it catches fire easily).',
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
      exam: '"Why is the leaf placed in hot ethanol?" - To remove the chlorophyll (decolourise the leaf) so the colour change with iodine can be seen.' },
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
      exam: '"Why is the plant kept in the dark for 48 hours first?" - To destarch it: to remove the starch already in its leaves. (Do not confuse it with removing chlorophyll, which is done later in ethanol.)' },
    two_vars_leaf: { icon: '⚖️', title: 'Two things changed at once',
      happened: () => 'You covered a VARIEGATED leaf with foil. The white edges had no chlorophyll AND the middle had no light, so when parts stayed orange-brown you cannot tell which factor was missing.',
      instead: 'Test one factor at a time: a plain green leaf with a foil strip tests light; a variegated leaf with no foil tests chlorophyll.',
      exam: 'A fair test changes only ONE variable. "Name a controlled variable" is a paper question (Biology 2024 Q5(b)(i)).' },
    two_vars: { icon: '⚖️', title: 'Not a fair test - two things changed',
      happened: c => `Between your last two counts you changed ${c.list}. The bubbles went from ${c.a} to ${c.b} per minute - but which change caused it? There is no way to tell.`,
      instead: 'Change ONE variable (the independent variable), measure the bubbles per minute (the dependent variable) and keep everything else the same (the controlled variables).',
      exam: '"Give one variable that needs to be kept constant" - Biology 2024 Q5(b)(i): the temperature of the water, the distance of the lamp, the type and size of pondweed.' },
    lamp_heat: { icon: '🌡️', title: 'The lamp heated the water',
      happened: c => `With the lamp only ${c.dist} cm away and no heat shield, the water warmed from ${c.t0} °C to ${c.t1} °C during the count. The temperature changed as well as the light, so this reading is not a fair test.`,
      instead: 'Put a heat shield - a glass tank of water - between the lamp and the tube, and check the thermometer before and after every count.',
      exam: '"Suggest an improvement to the set-up" - Biology 2024 Q5(b)(iii): use a heat shield or water bath to keep the temperature constant.' },
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

  // ── Missions ── A question\'s FIRST option is the answer; the quiz shuffles them.
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
        { q: 'Did your results support the hypothesis "the closer the lamp, the faster the pondweed photosynthesises"?',
          options: ['Yes, up to a point: the rate rose as the lamp came closer, then levelled off', 'No: the rate fell as the lamp came closer', 'Yes: the rate rose at every distance without stopping', 'A hypothesis cannot be tested by counting bubbles'],
          why: 'The data support it while light is the limiting factor. Saying "up to a point" is what a careful scientist would write.' },
        { q: 'Which gas makes up most of the bubbles?',
          options: ['Oxygen', 'Carbon dioxide', 'Hydrogen', 'Nitrogen'],
          why: 'carbon dioxide + water → glucose + oxygen. Oxygen is given off; a glowing splint relights in it.' },
      ],
    },
    {
      id: 'needs', icon: '🔬', title: 'What does a plant need?', rig: 'pond',
      blurb: 'The 2024 paper\'s experiment: light and carbon dioxide, each present or absent.',
      intro: 'Biology 2024 Q5(b), in a dark room whose only light is the lamp. Run four tests - light with and without carbon dioxide, and no light with and without it. Use boiled and cooled water for "no CO₂" and sodium hydrogencarbonate for "CO₂". Keep the lamp distance and temperature the same.',
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
          why: 'Daylight from a window would light the "no light" tests too, and the comparison would be spoiled.' },
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
        { on: 'rig:pond',    say: 'Tap 🌿 Pondweed rig to switch to the experiment.' },
        { on: 'water:high',  say: 'Tap + to add sodium hydrogencarbonate (more CO₂ for the plant).' },
        { on: 'shield:on',   say: 'Tap 🧊 to put the heat shield in — keeps the temperature steady.' },
        { on: 'dist:30',     say: 'Set the lamp to 30 cm away using the distance control.' },
        { on: 'count',       say: 'Tap ⏱ Count to count bubbles for 1 minute.' },
        { on: 'dist:10',     say: 'Now bring the lamp to 10 cm — change nothing else.' },
        { on: 'count',       say: 'Tap ⏱ Count again — more bubbles, or fewer?' },
      ] },
    { id: 'starch', icon: '🔵', title: 'Test a leaf for starch',
      blurb: 'Boil, ethanol in a water bath, rinse, iodine - in the right order.',
      lesson: 'Iodine turned the leaf blue-black, so it held starch - made from the glucose of photosynthesis. Boiling let the chemicals in, ethanol removed the green, and the water bath kept the ethanol away from any flame.',
      steps: [
        { on: 'rig:leaf',    say: 'Tap 🍃 Starch-test bench at the top.' },
        { on: 'plant:green', say: 'Tap 🌿 to choose the green plant.' },
        { on: 'pick',        say: 'Tap ✂️ to pick a leaf.' },
        { on: 'bunsen:on',   say: 'Tap 🔥 to light the Bunsen burner.' },
        { on: 'boil',        say: 'Tap ♨️ to boil the leaf — it lets the chemicals in.' },
        { on: 'bunsen:off',  say: 'Tap ⭕ to turn the Bunsen OFF — ethanol comes next!' },
        { on: 'ethanol',     say: 'Tap 🧴 to put the leaf in the ethanol water bath.' },
        { on: 'rinse',       say: 'Tap 🚿 to rinse in warm water.' },
        { on: 'iodine',      say: 'Tap 🟤 to add iodine — what colour does the leaf go?' },
      ] },
    { id: 'foilexp', icon: '🔲', title: 'Does a leaf need light?',
      blurb: 'Cover part of a destarched leaf with foil, then test it for starch.',
      lesson: 'Only the parts that had light made starch. The part under the foil stayed orange-brown, so light is needed for photosynthesis. Destarching first made it a fair test.',
      steps: [
        { on: 'rig:leaf',    say: 'Tap 🍃 Starch-test bench at the top.' },
        { on: 'plant:green', say: 'Tap 🌿 to choose the green plant.' },
        { on: 'destarch',    say: 'Tap 🌑 to put the plant in the dark for 48 hours.' },
        { on: 'cover:foil',  say: 'Tap 🔲 to put a foil strip across part of a leaf.' },
        { on: 'day:light',   say: 'Tap ☀️ to give the plant a day in sunlight.' },
        { on: 'pick',        say: 'Tap ✂️ to pick the foil-covered leaf.' },
        { on: 'bunsen:on',   say: 'Tap 🔥 to light the Bunsen burner.' },
        { on: 'boil',        say: 'Tap ♨️ to boil the leaf.' },
        { on: 'bunsen:off',  say: 'Tap ⭕ to turn the Bunsen OFF before using ethanol!' },
        { on: 'ethanol',     say: 'Tap 🧴 to warm the leaf in the ethanol water bath.' },
        { on: 'rinse',       say: 'Tap 🚿 to rinse in warm water.' },
        { on: 'iodine',      say: 'Tap 🟤 to add iodine — where is the starch?' },
      ] },
    { id: 'limit', icon: '📈', title: 'The limiting factor',
      blurb: 'Find the point where more light stops helping - and what fixes it.',
      lesson: 'In pond water, bringing the lamp closer stopped helping: carbon dioxide was the limiting factor. Adding sodium hydrogencarbonate gave more carbon dioxide, and the rate jumped.',
      steps: [
        { on: 'rig:pond',   say: 'Tap 🌿 Pondweed rig to switch to the experiment.' },
        { on: 'water:low',  say: 'Tap 💧 to use ordinary pond water (low CO₂).' },
        { on: 'shield:on',  say: 'Tap 🧊 to put the heat shield in.' },
        { on: 'dist:20',    say: 'Set the lamp to 20 cm away.' },
        { on: 'count',      say: 'Tap ⏱ Count — count bubbles for 1 minute.' },
        { on: 'dist:10',    say: 'Bring the lamp to 10 cm.' },
        { on: 'count',      say: 'Tap ⏱ Count again — did brighter light help?' },
        { on: 'water:high', say: 'Tap + to add sodium hydrogencarbonate (more CO₂).' },
        { on: 'count',      say: 'Tap ⏱ Count one more time — what changed?' },
      ] },
  ];

  // ══════════════════════════════════════════════
  //  PRIMARY LEVELS - PSAC Grade 4 and Grade 6 (docs/labs/LAB_SPEC.md §8, §9)
  //
  //  ⚠ Not the Grade 9 level in easier words. Each grade has its own rigs,
  //    guides, missions and discoveries, tagged `grades: [4]` or `[6]`; anything
  //    untagged above is the original Grade 9 level. Ids carry the grade
  //    (g4_…, g6_…) so progress for different grades never shares a key in
  //    Labs.store('photo').
  //  ⚠ Grade 4 is grounded in g4sci-plants ("Conditions needed for plants to
  //    grow well (water, sunlight, air, warmth, minerals)", subsections growth,
  //    reproduction, photosynthesis): the dark cupboard, the wilted plant,
  //    compost and minerals, Mira\'s and Sasha\'s one-difference tests, and
  //    germination needing water, air and warmth but not light.
  //    Grade 6 is grounded in g6-plants ("Photosynthesis (light + water + CO₂ →
  //    food + oxygen)"): the leaf as the food factory, Gas A and Gas B, and the
  //    PSAC papers in subjects/grade6-science/questions/past_paper_*.js -
  //    2023 (Gas A and Gas B, two other conditions), 2021 (the leaf makes
  //    food; describe the process) and 2019 (dust blocks sunlight).
  //  ⚠ No starch test, no iodine, no ethanol, no Bunsen at these levels - that
  //    stays Grade 9. scripts/test-labs-photo-data.js fails if one creeps in.
  // ══════════════════════════════════════════════
  const GRADES = [4, 6, 9];
  const LEVELS = {
    4: { eyebrow: 'Science · Grade 4', rigs: ['pots', 'seeds'], first: 'g4_light' },
    6: { eyebrow: 'Science · Grade 6', rigs: ['pots', 'weed'], first: 'g6_bubbles' },
    9: { eyebrow: 'Biology · Grade 9', rigs: ['pond', 'leaf'], first: 'bubbles' },
  };
  const RIG_NAMES = { pond: '🌿 Pondweed &amp; lamp', leaf: '🍃 Starch test', pots: '🪴 Plant pots', seeds: '🌱 Seed dishes', weed: '🫧 Waterweed' };

  // ── Two plant pots and a week of growth ─────────
  const POT_START = 6;          // cm: a young bean plant on day 0
  const WEEK_DAYS = 7, SEED_DAYS = 4;
  const SPOTS = {
    sun:  { name: 'Sunny windowsill', short: 'Window', icon: '☀️', meta: 'Light and warmth' },
    dark: { name: 'Dark cupboard', short: 'Cupboard', icon: '🚪', meta: 'Warm, but no light' },
    lamp: { name: 'Under a hot lamp', short: 'Hot lamp', icon: '💡', meta: 'The bulb almost touches it' },
  };
  const DRINKS = {
    some:  { name: 'A little water', short: 'Watered', icon: '💧', meta: 'Every day' },
    none:  { name: 'No water', short: 'No water', icon: '🚫', meta: 'Never watered' },
    flood: { name: 'Far too much', short: 'Too much', icon: '🌊', meta: 'The pot stands in water' },
  };
  const SOILS = {
    rich: { name: 'Soil with compost', short: 'Compost', icon: '🟫', meta: 'Full of minerals' },
    sand: { name: 'Plain sand', short: 'Sand', icon: '🟨', meta: 'Hardly any minerals' },
  };
  const LEAVES = {
    on:  { name: 'Leaves on', short: 'Leaves on', icon: '🌿', meta: 'Green leaves' },
    off: { name: 'Leaves cut off', short: 'No leaves', icon: '✂️', meta: 'Every leaf removed' },
  };
  // What a pupil can change in a pot, per grade: soil and minerals are Grade 4;
  // the leaf as the food factory is Grade 6.
  const POT_VARS = { 4: ['spot', 'drink', 'soil'], 6: ['spot', 'drink', 'leaves'] };
  const POT_VAR_WORDS = { spot: 'where it stood', drink: 'the water', soil: 'the soil', leaves: 'the leaves' };
  const POT_TEST_VALUE = { spot: 'dark', drink: 'none', soil: 'sand', leaves: 'off' };
  const newPot = () => ({ spot: 'sun', drink: 'some', soil: 'rich', leaves: 'on' });
  const isNormal = p => p.spot === 'sun' && p.drink === 'some' && p.soil === 'rich' && p.leaves === 'on';
  const LEAF_COLOURS = { green: '#3FA052', pale: '#A9C766', yellow: '#D9C84E', brown: '#8C6B3E', scorched: '#4A3322', none: '#3FA052' };

  // One pot after a week. Order matters: the worst thing wins.
  //  - under a hot lamp the leaves scorch within a day (a hazard, see HAZARDS)
  //  - no water: it wilts and dries out
  //  - far too much water: the roots get no air and rot, the leaves yellow
  //  - no leaves: no food is made, so it cannot grow
  //  - dark: pale yellow leaves on a long thin stem (it stretches for light)
  //  - sand: few minerals, so small with pale green leaves
  function potResult(p) {
    const r = (grew, leaf, stem, words, fast) => ({ grew, height: POT_START + grew, leaf, stem, words, fast: !!fast,
                                                   healthy: leaf === 'green' && stem === 'strong' });
    if (p.spot === 'lamp') return r(0, 'scorched', 'droopy', 'Burnt brown leaves. The hot bulb scorched them.', true);
    if (p.drink === 'none') return r(0, 'brown', 'droopy', 'Wilted and brown. It dried out.');
    if (p.drink === 'flood') return r(1, 'yellow', 'droopy', 'Yellow and droopy. Its roots began to rot.');
    if (p.leaves === 'off') return r(0, 'none', 'thin', 'No new growth. With no leaves it made no food.');
    if (p.spot === 'dark') return r(p.soil === 'sand' ? 2 : 5, 'yellow', 'thin', 'Pale yellow leaves on a long, thin, floppy stem.');
    if (p.soil === 'sand') return r(3, 'pale', 'thin', 'Small, with pale green leaves.');
    return r(7, 'green', 'strong', 'Green and strong. It grew 7 cm.');
  }
  const potDiff = (g, a, b) => POT_VARS[g].filter(k => a[k] !== b[k]);

  // s = { A, B, twin }. What stops or spoils the week: the hot lamp first (it
  // stops the week), then the mistakes that teach.
  function potCheck(g, s) {
    const list = s.twin ? [s.A, s.B] : [s.A];
    if (list.some(p => p.spot === 'lamp')) return { hazard: 'hot_lamp' };
    if (list.some(p => p.drink === 'flood')) return { card: 'flood' };
    if (!s.twin) return isNormal(s.A) ? null : { card: 'no_control' };
    const ch = potDiff(g, s.A, s.B);
    if (ch.length >= 2) return { card: 'two_things', changed: ch };
    return null;
  }
  // What a clean week unlocks. A week with a card unlocks nothing: the test
  // was spoiled, so it shows nothing for certain.
  function potDiscoveries(g, s) {
    if (potCheck(g, s)) return [];
    const out = [], list = s.twin ? [s.A, s.B] : [s.A];
    list.forEach(p => {
      if (isNormal(p)) out.push(`g${g}_healthy`);
      const rest = POT_VARS[g].filter(k => p[k] !== newPot()[k]);
      if (rest.length !== 1) return;
      if (p.spot === 'dark') out.push(`g${g}_dark`);
      if (p.drink === 'none') out.push(`g${g}_dry`);
      if (g === 4 && p.soil === 'sand') out.push('g4_sand');
      if (g === 6 && p.leaves === 'off') out.push('g6_noleaf');
    });
    if (s.twin && potDiff(g, s.A, s.B).length === 1 && (isNormal(s.A) || isNormal(s.B))) out.push(`g${g}_fair`);
    return [...new Set(out)];
  }

  // ── Seed dishes (Grade 4): bean seeds on cotton wool ──
  const WETS = {
    damp:  { name: 'Damp cotton wool', short: 'Damp', icon: '💧', meta: 'Wet, with air around it' },
    dry:   { name: 'Dry cotton wool', short: 'Dry', icon: '🏜️', meta: 'No water at all' },
    drown: { name: 'Under water', short: 'Under water', icon: '🌊', meta: 'No air reaches the seeds' },
  };
  const PLACES = {
    cupboard: { name: 'Warm dark cupboard', short: 'Cupboard', icon: '🚪', meta: 'Warm, no light' },
    window:   { name: 'Sunny windowsill', short: 'Window', icon: '☀️', meta: 'Warm, with light' },
    fridge:   { name: 'Cold fridge', short: 'Fridge', icon: '❄️', meta: 'Cold and dark' },
  };
  const DISHES = [1, 2, 3, 4];
  const newDish = () => ({ wet: 'damp', place: 'cupboard' });
  // A seed needs water, air and warmth to sprout. It does NOT need light: it
  // lives on the food stored inside it until its leaves open.
  function seedNeeds(d) { return { water: d.wet !== 'dry', air: d.wet !== 'drown', warm: d.place !== 'fridge', light: d.place === 'window' }; }
  function seedSprouts(d) { const n = seedNeeds(d); return n.water && n.air && n.warm; }
  // 0 a hard dry seed · 1 swollen with water · 2 a root · 3 a shoot · 4 first leaves.
  // The root always comes first (g4sci-plants: "Which part of a seed appears first?").
  function seedStage(d, day) {
    if (d.wet === 'dry' || !(day > 0)) return 0;
    if (!seedSprouts(d)) return 1;
    return Math.max(1, Math.min(4, Math.floor(day)));
  }
  function seedResult(d) {
    const n = seedNeeds(d);
    if (!n.water) return { sprouted: false, words: 'Nothing happened. The seeds stayed hard and dry.' };
    if (seedSprouts(d)) return { sprouted: true, words: n.light ? 'Sprouted! A root, a shoot and small green leaves.' : 'Sprouted! A root, a shoot and pale yellow leaves.' };
    const why = [!n.air && 'no air reached them', !n.warm && 'it was too cold'].filter(Boolean).join(' and ');
    return { sprouted: false, words: `They swelled up but did not sprout: ${why}.` };
  }
  function seedDiscoveries(ds) {
    if (seedCheck(ds)) return [];
    const L = DISHES.map(i => ds[i]), out = [];
    const has = (w, p) => L.some(d => d.wet === w && d.place === p);
    if (L.some(seedSprouts)) out.push('g4_sprout');
    ['cupboard', 'window'].forEach(p => {
      if (has('damp', p) && has('dry', p)) out.push('g4_seed_water');
      if (has('damp', p) && has('drown', p)) out.push('g4_seed_air');
    });
    if (has('damp', 'cupboard') && has('damp', 'fridge')) out.push('g4_seed_warm');
    if (has('damp', 'cupboard') && has('damp', 'window')) out.push('g4_seed_dark');
    return [...new Set(out)];
  }
  // The classic unfair seed test: the fridge is cold AND dark, the windowsill
  // warm AND light - with no warm dark cupboard to compare, two things changed.
  function seedCheck(ds) {
    const L = DISHES.map(i => ds[i]);
    const has = (w, p) => L.some(d => d.wet === w && d.place === p);
    if (has('damp', 'fridge') && has('damp', 'window') && !has('damp', 'cupboard')) return { card: 'fridge_two' };
    return null;
  }

  // ── Waterweed (Grade 6): the same lamp and funnel, three settings ──
  // Uses the pondweed model above, at room temperature with no heat from the
  // lamp. Baking soda (sodium hydrogencarbonate) gives off carbon dioxide.
  const WEED_DISTS = [50, 30, 20];
  const WEED_WATERS = {
    soda:   { name: 'Pond water + baking soda', short: 'Has CO₂', icon: '🧂', meta: 'Baking soda adds carbon dioxide', model: 'high' },
    boiled: { name: 'Boiled and cooled water', short: 'No CO₂', icon: '♨️', meta: 'Boiling drove the carbon dioxide out', model: 'none' },
  };
  function weedRun(c) {
    const bubbles = Math.round(rate({ dist: c.dist, lampOn: c.lampOn, water: WEED_WATERS[c.water].model, temp: ROOM_TEMP }));
    return { dist: c.dist, lampOn: !!c.lampOn, water: c.water, bubbles };
  }
  const WEED_VAR_WORDS = { light: 'the light', water: 'the water' };
  function weedDiff(a, b) {
    if (!a || !b) return [];
    const out = [];
    if (a.lampOn !== b.lampOn || (a.lampOn && a.dist !== b.dist)) out.push('light');
    if (a.water !== b.water) out.push('water');
    return out;
  }
  // runs = every count so far, newest first (including cur).
  function weedDiscoveries(prev, cur, runs) {
    if (weedDiff(prev, cur).length >= 2) return [];
    const out = [];
    if (cur.lampOn && cur.bubbles > 0) out.push('g6_bubbles');
    if (cur.lampOn && cur.water === 'soda' && cur.dist === 50) out.push('g6_dim');
    if (!cur.lampOn) out.push('g6_nolight');
    if (cur.lampOn && cur.water === 'boiled') out.push('g6_noco2');
    if (prev && prev.lampOn && cur.lampOn && prev.water === cur.water && cur.dist < prev.dist && cur.bubbles > prev.bubbles) out.push('g6_closer');
    const seen = f => runs.some(f);
    if (seen(r => r.lampOn && r.water === 'soda' && r.bubbles > 0) && seen(r => !r.lampOn && r.water === 'soda' && r.bubbles === 0)
        && seen(r => r.lampOn && r.water === 'boiled' && r.bubbles === 0)) out.push('g6_both');
    return out;
  }

  // The Grade 6 syllabus: "light + water + CO₂ → food + oxygen".
  const PEQ = {
    word: 'carbon dioxide + water → food + oxygen',
    over: 'using sunlight, trapped by the green chlorophyll in the leaves',
  };

  // The words for every primary step. A guide step or a discovery\'s "how" is
  // one of these tokens; scripts/test-labs-photo-data.js checks every one.
  function primaryStep(on) {
    const [k, v] = String(on).split(':');
    const place = { sun: 'on the sunny windowsill', dark: 'in the dark cupboard', lamp: 'right under the hot lamp' };
    const where = { cupboard: 'in the warm dark cupboard', window: 'on the sunny windowsill', fridge: 'in the cold fridge' };
    switch (k) {
      case 'rig': return v === 'pots' ? { on, say: 'Go to the two plant pots.', btn: '🪴 Plant pots' }
        : v === 'seeds' ? { on, say: 'Go to the seed dishes.', btn: '🌱 Seed dishes' }
        : v === 'weed' ? { on, say: 'Go to the waterweed.', btn: '🫧 Waterweed' } : null;
      case 'pot': return SPOT_OK(v, ['A', 'B']) && { on, say: `Tap pot ${v}.`, btn: `Pot ${v}` };
      case 'spot': return SPOTS[v] ? { on, say: `Put the pot ${place[v]}.`, btn: `${SPOTS[v].icon} ${SPOTS[v].name}` } : null;
      case 'drink': return v === 'none' ? { on, say: 'Give it no water at all.', btn: '🚫 No water' }
        : v === 'some' ? { on, say: 'Give it a little water every day.', btn: '💧 A little water' }
        : v === 'flood' ? { on, say: 'Give it far too much water.', btn: '🌊 Far too much' } : null;
      case 'soil': return v === 'sand' ? { on, say: 'Grow it in plain sand.', btn: '🟨 Plain sand' }
        : v === 'rich' ? { on, say: 'Grow it in soil with compost.', btn: '🟫 Soil with compost' } : null;
      case 'leaves': return v === 'off' ? { on, say: 'Cut off all of its leaves.', btn: '✂️ Cut off the leaves' }
        : v === 'on' ? { on, say: 'Keep its leaves on.', btn: '🌿 Leaves on' } : null;
      case 'twin': return v === 'on' ? { on, say: 'Grow a second plant to compare.', btn: '🪴 Two plants' }
        : v === 'off' ? { on, say: 'Grow only one plant.', btn: 'One plant only' } : null;
      case 'week': return v === undefined ? { on, say: 'Fast-forward 7 days. Watch the plants!', btn: '⏩ Wait 7 days' } : null;
      case 'dish': return SPOT_OK(v, ['1', '2', '3', '4']) && { on, say: `Tap dish ${v}.`, btn: `Dish ${v}` };
      case 'wet': return v === 'dry' ? { on, say: 'Make the cotton wool dry. No water.', btn: '🏜️ Dry cotton wool' }
        : v === 'damp' ? { on, say: 'Make the cotton wool damp.', btn: '💧 Damp cotton wool' }
        : v === 'drown' ? { on, say: 'Cover the seeds with water. No air can reach them.', btn: '🌊 Under water' } : null;
      case 'place': return PLACES[v] ? { on, say: `Put the dish ${where[v]}.`, btn: `${PLACES[v].icon} ${PLACES[v].name}` } : null;
      case 'days': return v === undefined ? { on, say: 'Fast-forward 4 days. Which seeds sprout?', btn: '⏩ Wait 4 days' } : null;
      case 'look': return v === undefined ? { on, say: 'Look closely at a seed that sprouted.', btn: '🔍 Look closely' } : null;
      case 'wlamp': return v === 'off' ? { on, say: 'Switch the lamp off. The room goes dark.', btn: '🌑 Lamp off' }
        : v === 'on' ? { on, say: 'Switch the lamp on.', btn: '💡 Lamp on' } : null;
      case 'wdist': return WEED_DISTS.includes(+v) ? { on, say: `Put the lamp ${v} cm from the waterweed.`, btn: `💡 Lamp at ${v} cm` } : null;
      case 'wwater': return v === 'boiled' ? { on, say: 'Use boiled and cooled water. It has no carbon dioxide.', btn: '♨️ Boiled and cooled water' }
        : v === 'soda' ? { on, say: 'Use pond water with baking soda. It has carbon dioxide.', btn: '🧂 Pond water + baking soda' } : null;
      case 'wcount': return v === undefined ? { on, say: 'Count the bubbles for one minute.', btn: '⏱ Count 1 minute' } : null;
    }
    return null;
  }
  function SPOT_OK(v, list) { return list.includes(v); }
  // Which rig a primary token belongs to.
  function primaryRig(on) {
    const k = String(on).split(':')[0];
    if (k === 'rig') return String(on).split(':')[1];
    if (['pot', 'spot', 'drink', 'soil', 'leaves', 'twin', 'week'].includes(k)) return 'pots';
    if (['dish', 'wet', 'place', 'days', 'look'].includes(k)) return 'seeds';
    if (['wlamp', 'wdist', 'wwater', 'wcount'].includes(k)) return 'weed';
    return null;
  }

  // ── Primary discoveries ─────────────────────────
  const PD = (grade, id, icon, title, hint, how, saw, learn, eq) => ({ id, icon, title, hint, how, saw, learn, eq: !!eq, grades: [grade] });
  const PRIMARY_DISCOVERIES = [
    PD(4, 'g4_healthy', '🌱', 'A healthy plant', 'A sunny window, a little water, good soil',
      ['rig:pots', 'week'],
      'After a week on the sunny windowsill, the plant was green and strong. It grew 7 cm.',
      'It had light, water, air, warmth and minerals. So it had everything it needs to grow well.'),
    PD(4, 'g4_dark', '🚪', 'No light: pale and weak', 'Put one plant in a dark cupboard for a week',
      ['rig:pots', 'pot:B', 'spot:dark', 'week'],
      'The plant in the cupboard had pale yellow leaves. Its stem was long, thin and floppy.',
      'A plant needs light to make its food. In the dark it stretches to find light, and grows weak.'),
    PD(4, 'g4_dry', '🥀', 'No water: it wilts', 'Stop watering one plant',
      ['rig:pots', 'pot:B', 'drink:none', 'week'],
      'The plant with no water wilted. Its leaves went brown and dry.',
      'Roots take in water from the soil. Without water, a plant dries out and wilts.'),
    PD(4, 'g4_sand', '🟨', 'Minerals from the soil', 'Grow one plant in plain sand',
      ['rig:pots', 'pot:B', 'soil:sand', 'week'],
      'The plant in sand grew only 3 cm. Its leaves were pale green.',
      'Soil with compost is full of minerals. Sand has hardly any. Plants need minerals to grow well.'),
    PD(4, 'g4_fair', '⚖️', 'A fair test', 'Change ONE thing in pot B. Keep the rest the same.',
      ['rig:pots', 'pot:B', 'drink:none', 'week'],
      'The two pots were the same in every way but one. So that one thing caused the difference.',
      'A fair test changes only ONE thing. Everything else stays the same. Then you know what caused it.'),
    PD(4, 'g4_sprout', '🌱', 'The seeds sprout', 'Bean seeds on damp cotton wool, somewhere warm',
      ['rig:seeds', 'days'],
      'After 4 days on damp cotton wool, the bean seeds sprouted.',
      'When a seed starts to grow, it is called germination. The seed has its own food inside.'),
    PD(4, 'g4_root', '🔍', 'The root comes first', 'Look closely at a seed that has sprouted',
      ['rig:seeds', 'days', 'look'],
      'A white root came out first and grew down. Then a shoot grew up.',
      'The root comes first. It holds the young plant and takes in water. Then the shoot grows up.'),
    PD(4, 'g4_seed_water', '💧', 'Seeds need water', 'Compare a dry dish with a damp dish',
      ['rig:seeds', 'dish:2', 'wet:dry', 'days'],
      'Seeds on dry cotton wool stayed hard. Seeds on damp cotton wool sprouted.',
      'A seed soaks up water first. The water wakes up the tiny plant inside it.'),
    PD(4, 'g4_seed_warm', '❄️', 'Seeds need warmth', 'A cold fridge and a warm cupboard - both dark',
      ['rig:seeds', 'dish:2', 'place:fridge', 'days'],
      'Seeds in the cold fridge did not sprout. Seeds in the warm cupboard did.',
      'Seeds need warmth to sprout. The fridge and the cupboard are both dark, so only the warmth was different.'),
    PD(4, 'g4_seed_air', '🫧', 'Seeds need air', 'Cover some seeds with water',
      ['rig:seeds', 'dish:2', 'wet:drown', 'days'],
      'Seeds under water swelled up, but they did not sprout.',
      'Seeds need air to sprout. Water covering them keeps the air away.'),
    PD(4, 'g4_seed_dark', '🌑', 'No light needed to sprout', 'Compare the windowsill with the dark cupboard',
      ['rig:seeds', 'dish:2', 'place:window', 'days'],
      'Seeds sprouted in the dark cupboard AND on the windowsill.',
      'Seeds do not need light to sprout. The young plant needs light later, to make its food.'),

    PD(6, 'g6_healthy', '🌿', 'A plant making food', 'Sunlight, water and green leaves',
      ['rig:pots', 'week'],
      'With light, water and its leaves, the plant stayed green and grew 7 cm.',
      'Leaves use sunlight, water and carbon dioxide to make food. The plant uses the food to grow.', true),
    PD(6, 'g6_dark', '🚪', 'No light, no food', 'A week in a dark cupboard',
      ['rig:pots', 'pot:B', 'spot:dark', 'week'],
      'The plant in the cupboard turned pale yellow. Its stem grew thin and floppy.',
      'Leaves need sunlight to make food. With no light, no food is made and the plant grows weak.'),
    PD(6, 'g6_noleaf', '✂️', 'The leaf is the food factory', 'Cut all the leaves off one plant',
      ['rig:pots', 'pot:B', 'leaves:off', 'week'],
      'The plant with no leaves did not grow at all in a week.',
      'The leaves make the food. With no leaves, the plant cannot make food, so it cannot grow.'),
    PD(6, 'g6_dry', '🥀', 'Water is needed', 'Give one plant no water',
      ['rig:pots', 'pot:B', 'drink:none', 'week'],
      'The plant with no water wilted. Its leaves went brown.',
      'Water from the roots is one of the things the leaves use to make food.'),
    PD(6, 'g6_fair', '⚖️', 'A fair test', 'Change ONE thing in pot B. Keep the rest the same.',
      ['rig:pots', 'pot:B', 'drink:none', 'week'],
      'The two pots were the same in every way but one. So that one thing caused the difference.',
      'A fair test changes only ONE thing. Everything else stays the same.'),
    PD(6, 'g6_bubbles', '🫧', 'Bubbles of oxygen', 'Waterweed in the light',
      ['rig:weed', 'wcount'],
      'Small bubbles rose from the waterweed and collected at the top of the tube.',
      'The bubbles are oxygen. Plants give out oxygen when they make food.', true),
    PD(6, 'g6_dim', '🌥️', 'Dim light, few bubbles', 'Put the lamp far away',
      ['rig:weed', 'wdist:50', 'wcount'],
      'With the lamp 50 cm away, only 5 bubbles came in a minute.',
      'Dim light means slow food-making. So the plant gives out less oxygen.'),
    PD(6, 'g6_closer', '💡', 'More light, more bubbles', 'Count, then bring the lamp closer and count again',
      ['rig:weed', 'wdist:50', 'wcount', 'wdist:20', 'wcount'],
      'Moving the lamp from 50 cm to 20 cm gave 30 bubbles instead of 5.',
      'Brighter light makes the plant make food faster. So it gives out more oxygen.'),
    PD(6, 'g6_nolight', '🌑', 'No light, no bubbles', 'Switch the lamp off',
      ['rig:weed', 'wlamp:off', 'wcount'],
      'With the lamp off, not one bubble came in a whole minute.',
      'Plants need light to make food. In the dark they give out no oxygen.'),
    PD(6, 'g6_noco2', '♨️', 'No carbon dioxide, no bubbles', 'Waterweed in boiled and cooled water',
      ['rig:weed', 'wwater:boiled', 'wcount'],
      'In boiled and cooled water there were no bubbles, even with the lamp on.',
      'Boiling drives the carbon dioxide out of water. Plants need carbon dioxide to make food.'),
    PD(6, 'g6_both', '🔑', 'Light AND carbon dioxide', 'No carbon dioxide, then both, then no light',
      ['rig:weed', 'wwater:boiled', 'wcount', 'wwater:soda', 'wcount', 'wlamp:off', 'wcount'],
      'Bubbles came only when there was light AND carbon dioxide.',
      'A plant needs both to make food. Take either one away and it stops.', true),
  ];
  DISCOVERIES.push(...PRIMARY_DISCOVERIES);

  // ── Primary hazards and mistakes that teach ─────
  HAZARDS.hot_lamp = {
    signs: ['hot'],
    title: () => 'Too hot! The bulb burnt the leaves',
    happened: () => 'You put the plant right under a hot lamp. The bulb got hot and burnt the leaves brown.',
    why: 'A lamp bulb can get hot enough to burn your skin. Dry leaves or paper touching it could catch fire.',
    instead: 'Keep lamps well away from plants and hands. A sunny windowsill is best. Ask an adult to set up any lamp.',
    exam: 'Plants need light and warmth to grow. They do not need heat that burns them.',
  };
  RESULTS.flood = { icon: '🌊', title: 'Too much water',
    happened: () => 'The pot stood in water all week. The roots could not get air, so they began to rot. The leaves turned yellow.',
    instead: 'Give a little water each day. Let the extra water drain out of the hole in the pot.',
    exam: 'Roots need air too. Too much water harms a plant, just like too little.' };
  RESULTS.two_things = { icon: '⚖️', title: 'Not a fair test - two things changed',
    happened: c => (c && c.weed)
      ? `Between your last two counts you changed ${c.list}. Which change made the difference? You cannot tell.`
      : `Pot A and pot B were different in two ways: ${c && c.list}. Which one made the difference? You cannot tell.`,
    instead: 'Change only ONE thing. Keep everything else the same. That is a fair test.',
    exam: 'Exam questions often show two plants. Look for the ONE thing that is different.' };
  RESULTS.no_control = { icon: '🪴', title: 'Nothing to compare with',
    happened: () => 'You tested only one plant. Did your test change it? With nothing to compare, you cannot tell.',
    instead: 'Grow a second plant in normal conditions, next to it. This plant is called the control.',
    exam: 'A fair test compares two plants: the one you changed and the control.' };
  RESULTS.fridge_two = { icon: '❄️', title: 'Two things changed: cold AND dark',
    happened: () => 'The fridge seeds did not sprout. But the fridge is cold AND dark. The windowsill is warm AND light.',
    instead: 'Compare the fridge with the warm dark cupboard. Then only the warmth is different.',
    exam: 'A fair test changes one thing only. Here, change only the warmth.' };

  const FACTS_G = {
    4: [
      'Plants need water, sunlight, air, warmth and minerals to grow well.',
      'Roots take in water and minerals from the soil.',
      'The stem carries water up from the roots to the leaves.',
      'Leaves make the plant\'s food, using sunlight.',
      'Leaves are green because of chlorophyll. It traps sunlight.',
      'A seed has a tiny plant and a store of food inside it.',
      'Germination is when a seed starts to grow.',
      'A seed needs water, air and warmth to sprout - but not light.',
      'Compost and manure add minerals to the soil.',
      'Plants give out oxygen, the gas we breathe in.',
      'Too much water is bad for a plant. Its roots need air too.',
      'Sugar cane grows well in sunny, warm Mauritius.',
    ],
    6: [
      'Plants make their own food. This is called photosynthesis.',
      'Carbon dioxide + water, with sunlight, make food and oxygen.',
      'Carbon dioxide gets into a leaf through tiny holes called stomata.',
      'The leaf is the plant\'s food factory.',
      'Chlorophyll is the green colouring in leaves. It traps sunlight.',
      'Plants give out oxygen when they make food. Animals breathe it in.',
      'Plants respire day and night. They make food only in the light.',
      'Plants are producers. Every food chain starts with a green plant.',
      'The sun is the main source of energy for plants.',
      'Baking soda gives off carbon dioxide in water.',
      'Boiling water drives out the gases that were dissolved in it.',
      'Dust on leaves blocks sunlight, so the leaves make less food.',
    ],
  };

  // ── Primary missions ── A question\'s FIRST option is the answer; the quiz shuffles them.
  const PRIMARY_MISSIONS = [
    { id: 'g4_needs', icon: '🌞', title: 'Light and water', rig: 'pots', grades: [4], fair: ['spot', 'drink'],
      blurb: 'Two fair tests. Does a plant need light? Does it need water?',
      intro: 'Do two fair tests with pot B. First the dark cupboard, then no water. Change one thing each time.',
      steps: { spot: '🚪 Test 1: pot B in the dark cupboard. Change nothing else.',
               drink: '💧 Test 2: pot B back on the windowsill, with no water.' },
      quiz: [
        { q: 'Pot A was on the windowsill. Pot B was in the cupboard. What was different?',
          options: ['Only the light', 'Only the water', 'The soil and the water', 'Nothing at all'],
          why: 'Both pots had the same water and soil. Only the light was different.' },
        { q: 'What happened to the plant in the dark cupboard?',
          options: ['It turned pale yellow and weak', 'It turned darker green', 'It grew lots of flowers', 'It stayed exactly the same'],
          why: 'With no light, a plant cannot make its food. It turns pale and weak.' },
        { q: 'What happened to the plant with no water?',
          options: ['It wilted and turned brown', 'It grew faster than pot A', 'It turned bright blue', 'It grew more leaves'],
          why: 'A plant needs water. Without it, the plant dries out and wilts.' },
        { q: 'Why do we keep everything else the same?',
          options: ['So we know what caused the change', 'So the test is quicker', 'So the plants look nicer', 'So we need fewer pots'],
          why: 'Change ONE thing only. Then that one thing caused what you see. This is a fair test.' },
        { q: 'Which list shows what a plant needs to grow well?',
          options: ['Water, sunlight, air, warmth and minerals', 'Only water and darkness', 'Sand, cold air and no water', 'Only sunlight, nothing else'],
          why: 'A plant needs water, sunlight, air and warmth. It gets minerals from the soil.' },
        { q: 'Compost is mixed into the soil. What does it give the plant?',
          options: ['Minerals', 'Sunlight', 'Warmth', 'Air'],
          why: 'Compost adds minerals to the soil. The roots take them in with water.' },
      ] },
    { id: 'g4_seeds', icon: '🫘', title: 'Wake up the seeds', rig: 'seeds', grades: [4],
      finds: ['g4_seed_water', 'g4_seed_warm', 'g4_seed_air'],
      setup: { 1: { wet: 'damp', place: 'cupboard' }, 2: { wet: 'dry', place: 'cupboard' }, 3: { wet: 'damp', place: 'fridge' }, 4: { wet: 'drown', place: 'cupboard' } },
      blurb: 'Four dishes of bean seeds. Find the three things a seed needs.',
      intro: 'Dish 1 is the control: damp, in the warm cupboard. Change ONE thing in each other dish.',
      quiz: [
        { q: 'Seeds on DRY cotton wool did not sprout. What was missing?',
          options: ['Water', 'Light', 'Soil', 'Wind'],
          why: 'Dish 2 was just like dish 1, but dry. So the seeds needed water.' },
        { q: 'Seeds in the fridge did not sprout. What was missing?',
          options: ['Warmth', 'Water', 'Soil', 'Light'],
          why: 'The fridge and the cupboard are both dark. Only the cold was different.' },
        { q: 'Seeds under water did not sprout. What was missing?',
          options: ['Air', 'Water', 'Warmth', 'Light'],
          why: 'The water kept the air away from the seeds. Seeds need air to sprout.' },
        { q: 'Seeds sprouted in the dark cupboard. What does this show?',
          options: ['Seeds do not need light to sprout', 'Seeds need darkness to live', 'Seeds need soil to sprout', 'Seeds grow only at night'],
          why: 'A seed lives on its own stored food. It needs light later, for its leaves.' },
        { q: 'Which part comes out of a seed first?',
          options: ['The root', 'The flower', 'The fruit', 'The leaves'],
          why: 'The root comes first. It grows down and takes in water.' },
        { q: 'What is it called when a seed starts to grow?',
          options: ['Germination', 'Pollination', 'Evaporation', 'Melting'],
          why: 'Germination is when a seed starts to grow into a new plant.' },
      ] },
    { id: 'g6_gases', icon: '🫧', title: 'Gas A and Gas B', rig: 'weed', grades: [6],
      // In this order each count changes ONE thing from the one before it.
      tests: [
        { lampOn: true, water: 'boiled', label: '1 · Light ✓ · carbon dioxide ✗ (boiled water)' },
        { lampOn: true, water: 'soda', label: '2 · Light ✓ · carbon dioxide ✓ (baking soda)' },
        { lampOn: false, water: 'soda', label: '3 · Light ✗ · carbon dioxide ✓ (lamp off)' },
      ],
      blurb: 'The PSAC 2023 question: which gas goes in, which gas comes out?',
      intro: 'Do three counts, in this order: no carbon dioxide, then both, then no light. Keep the lamp in one place.',
      quiz: [
        { q: 'A leaf takes in Gas A from the air to make food. What is Gas A?',
          options: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Water vapour'],
          why: 'PSAC 2023 paper. Leaves take in carbon dioxide to make food.' },
        { q: 'The plant gives out Gas B. The bubbles were Gas B. What is it?',
          options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Smoke'],
          why: 'Plants give out oxygen when they make food. We breathe it in.' },
        { q: 'Give two OTHER conditions a plant needs to make food.',
          options: ['Sunlight and water', 'Darkness and sand', 'Wind and salt', 'Smoke and ice'],
          why: 'PSAC 2023 paper. Sunlight and water - and green chlorophyll in the leaves.' },
        { q: 'In boiled and cooled water there were no bubbles. Why?',
          options: ['Boiling took the carbon dioxide out', 'The water was far too hot', 'The lamp was switched off', 'Boiling added too much oxygen'],
          why: 'Boiling drives the carbon dioxide out. With no carbon dioxide, no food is made.' },
        { q: 'With the lamp off, what happened?',
          options: ['No bubbles: no light, no food-making', 'More bubbles than before', 'The waterweed turned red', 'The same number of bubbles'],
          why: 'Plants need light to make food. No food-making means no oxygen bubbles.' },
        { q: 'Why did the lamp stay in the same place for every count?',
          options: ['To make it a fair test', 'To make more bubbles', 'To keep the water cold', 'To save electricity'],
          why: 'Only the light or the carbon dioxide changed. Everything else stayed the same.' },
      ] },
    { id: 'g6_food', icon: '🏭', title: 'The leaf, the food factory', rig: 'pots', grades: [6], fair: ['leaves', 'spot'],
      blurb: 'Two fair tests. Does a plant need its leaves? Does it need light?',
      intro: 'Do two fair tests with pot B. First cut off its leaves, then try the dark cupboard. Change one thing each time.',
      steps: { leaves: '✂️ Test 1: cut all the leaves off pot B. Change nothing else.',
               spot: '🚪 Test 2: pot B keeps its leaves, but goes in the dark cupboard.' },
      quiz: [
        { q: 'Which part of a plant mainly makes its food?',
          options: ['The leaf', 'The root', 'The flower', 'The fruit'],
          why: 'PSAC 2021 paper. The green leaf is the plant\'s food factory.' },
        { q: 'The plant with no leaves did not grow. Why?',
          options: ['With no leaves, it could make no food', 'It had too much water', 'Its roots were cut off', 'It was too warm'],
          why: 'Leaves make the food. No leaves, no food, so no growth.' },
        { q: 'How does a plant make its food?',
          options: ['Carbon dioxide and water, with sunlight, make food and oxygen', 'Oxygen and soil make carbon dioxide', 'Food and oxygen make water', 'Sunlight and sand make soil'],
          why: 'PSAC 2021 paper asks this. Say what is used and what is made.' },
        { q: 'Dust from a stone crusher covers the leaves of trees. What happens?',
          options: ['Less sunlight reaches the leaves, so less food is made', 'The trees get more oxygen', 'The dust gives the leaves minerals', 'The trees grow faster'],
          why: 'PSAC 2019 paper. Dust blocks sunlight, so the leaves make less food.' },
        { q: 'The plant in the dark cupboard turned pale. What was missing?',
          options: ['Sunlight', 'Water', 'Soil', 'Air'],
          why: 'It had water, soil and air. Only the light was missing.' },
        { q: 'Pots A and B were the same except for ONE thing. What is this called?',
          options: ['A fair test', 'A food chain', 'Germination', 'Pollination'],
          why: 'A fair test changes one thing and keeps the rest the same.' },
      ] },
  ];
  MISSIONS.push(...PRIMARY_MISSIONS);

  // ── Primary guided experiments ──────────────────
  const PRIMARY_GUIDES = [
    { id: 'g4_light', icon: '☀️', title: 'Window or cupboard?', grades: [4],
      blurb: 'Does a plant need light? Put one plant in a dark cupboard.',
      lesson: 'The plant on the windowsill stayed green and strong. The plant in the cupboard turned pale and weak. Plants need light.',
      steps: [
        { on: 'rig:pots', say: 'Go to the two plant pots.', btn: '🪴 Plant pots' },
        { on: 'pot:B', say: 'Tap pot B. This is the one we will change.', btn: '🅱️ Choose pot B' },
        { on: 'spot:dark', say: 'Put pot B in the dark cupboard. Pot A stays on the sunny windowsill.', btn: '🚪 Pot B in the cupboard' },
        { on: 'week', say: 'Fast-forward one week. Watch both plants!', btn: '⏩ Wait 7 days' },
      ] },
    { id: 'g4_water', icon: '💧', title: 'Water or no water?', grades: [4],
      blurb: 'Stop watering one plant. What happens to it?',
      lesson: 'The plant with no water wilted and went brown. The watered plant stayed green. Plants need water.',
      steps: [
        { on: 'rig:pots', say: 'Go to the two plant pots.', btn: '🪴 Plant pots' },
        { on: 'pot:B', say: 'Tap pot B.', btn: '🅱️ Choose pot B' },
        { on: 'drink:none', say: 'Give pot B no water at all. Pot A gets a little every day.', btn: '🚫 No water for pot B' },
        { on: 'week', say: 'Fast-forward one week.', btn: '⏩ Wait 7 days' },
      ] },
    { id: 'g4_seeds', icon: '🫘', title: 'What does a seed need?', grades: [4],
      blurb: 'Four dishes of bean seeds. Change one thing in each.',
      lesson: 'Only dish 1 sprouted, in the dark. Seeds need water, air and warmth to sprout. They do not need light.',
      steps: [
        { on: 'rig:seeds', say: 'Go to the seed dishes. Each has bean seeds on damp cotton wool.', btn: '🌱 Seed dishes' },
        { on: 'dish:2', say: 'Tap dish 2.', btn: 'Dish 2' },
        { on: 'wet:dry', say: 'Make dish 2 DRY. No water on its cotton wool.', btn: '🏜️ Dry cotton wool' },
        { on: 'dish:3', say: 'Tap dish 3.', btn: 'Dish 3' },
        { on: 'place:fridge', say: 'Put dish 3 in the cold fridge.', btn: '❄️ Cold fridge' },
        { on: 'dish:4', say: 'Tap dish 4.', btn: 'Dish 4' },
        { on: 'wet:drown', say: 'Cover the seeds in dish 4 with water. No air can reach them.', btn: '🌊 Under water' },
        { on: 'days', say: 'Fast-forward 4 days. Which seeds sprout?', btn: '⏩ Wait 4 days' },
      ] },
    { id: 'g4_soil', icon: '🟫', title: 'Soil or sand?', grades: [4],
      blurb: 'Grow one plant in plain sand. Does it grow as well?',
      lesson: 'The plant in sand grew small, with pale leaves. Soil with compost has minerals. Plants need minerals.',
      steps: [
        { on: 'rig:pots', say: 'Go to the two plant pots.', btn: '🪴 Plant pots' },
        { on: 'pot:B', say: 'Tap pot B.', btn: '🅱️ Choose pot B' },
        { on: 'soil:sand', say: 'Grow pot B in plain sand. Pot A keeps its soil with compost.', btn: '🟨 Plain sand for pot B' },
        { on: 'week', say: 'Fast-forward one week.', btn: '⏩ Wait 7 days' },
      ] },
    { id: 'g6_bubbles', icon: '🫧', title: 'Waterweed bubbles', grades: [6],
      blurb: 'Shine a lamp on waterweed. Count the bubbles of oxygen.',
      lesson: 'The waterweed gave off bubbles of oxygen. With the lamp closer, it made more. More light, more food-making.',
      steps: [
        { on: 'rig:weed', say: 'Go to the waterweed. It sits under a funnel in water.', btn: '🫧 Waterweed' },
        { on: 'wdist:50', say: 'Put the lamp far away: 50 cm.', btn: '💡 Lamp at 50 cm' },
        { on: 'wcount', say: 'Count the bubbles for one minute.', btn: '⏱ Count 1 minute' },
        { on: 'wdist:20', say: 'Bring the lamp close: 20 cm. Change nothing else.', btn: '💡 Lamp at 20 cm' },
        { on: 'wcount', say: 'Count again. More bubbles, or fewer?', btn: '⏱ Count 1 minute' },
      ] },
    { id: 'g6_leaves', icon: '✂️', title: 'Leaves make the food', grades: [6],
      blurb: 'Cut all the leaves off one plant. Can it still grow?',
      lesson: 'The plant with no leaves did not grow. The leaf is where a plant makes its food.',
      steps: [
        { on: 'rig:pots', say: 'Go to the two plant pots.', btn: '🪴 Plant pots' },
        { on: 'pot:B', say: 'Tap pot B.', btn: '🅱️ Choose pot B' },
        { on: 'leaves:off', say: 'Cut all the leaves off pot B. Change nothing else.', btn: '✂️ Cut off the leaves' },
        { on: 'week', say: 'Fast-forward one week.', btn: '⏩ Wait 7 days' },
      ] },
    { id: 'g6_light', icon: '🚪', title: 'Light to make food', grades: [6],
      blurb: 'No light, no food? Test it with two plants.',
      lesson: 'In the dark the plant could not make food. It turned pale and weak. Light is needed to make food.',
      steps: [
        { on: 'rig:pots', say: 'Go to the two plant pots.', btn: '🪴 Plant pots' },
        { on: 'pot:B', say: 'Tap pot B.', btn: '🅱️ Choose pot B' },
        { on: 'spot:dark', say: 'Put pot B in the dark cupboard. Pot A stays in the sun.', btn: '🚪 Pot B in the cupboard' },
        { on: 'week', say: 'Fast-forward one week.', btn: '⏩ Wait 7 days' },
      ] },
    { id: 'g6_co2', icon: '♨️', title: 'Take away the carbon dioxide', grades: [6],
      blurb: 'Waterweed in boiled water. Will it still bubble?',
      lesson: 'In boiled and cooled water there were no bubbles. Plants need carbon dioxide to make food.',
      steps: [
        { on: 'rig:weed', say: 'Go to the waterweed.', btn: '🫧 Waterweed' },
        { on: 'wcount', say: 'First count the bubbles in pond water with baking soda.', btn: '⏱ Count 1 minute' },
        { on: 'wwater:boiled', say: 'Now use boiled and cooled water. It has no carbon dioxide.', btn: '♨️ Boiled and cooled water' },
        { on: 'wcount', say: 'Count again. Any bubbles?', btn: '⏱ Count 1 minute' },
      ] },
  ];
  GUIDES.push(...PRIMARY_GUIDES);

  // ── Welcome and help, per primary grade ─────────
  const PRIMARY_TEXT = {
    4: {
      welcome: [
        ['New here?', 'Tap "Show me how". I will show you what to tap, one step at a time.'],
        ['Two plant pots.', 'Move a plant, or change its water or soil. Then fast-forward a week.'],
        ['Seed dishes.', 'Bean seeds on cotton wool. Find out what makes them sprout.'],
        ['Be fair.', 'Change ONE thing at a time. Keep everything else the same.'],
        ['Hear it.', 'Tap 🔊 and the words are read out to you.'],
      ],
      help: [
        ['What a plant needs', ['Light, water, air, warmth and minerals from the soil.', 'Roots take in water. Leaves make the food, using light.']],
        ['Seeds', ['A seed needs water, air and warmth to sprout.', 'It does not need light. The root comes out first.']],
        ['A fair test', ['Change ONE thing only.', 'Keep everything else the same.', 'Grow a second plant to compare. It is called the control.']],
        ['Stay safe', ['Never put a plant right under a hot lamp. Bulbs get hot.', 'Ask an adult before you use a lamp.']],
      ],
      how: ['<b>Choose</b> a guided experiment or a mission.', '<b>Follow the yellow box</b>. The thing to tap glows yellow.', '<b>Watch</b>, then read your notebook.'],
    },
    6: {
      welcome: [
        ['New here?', 'Tap "Show me how". I will show you what to tap, one step at a time.'],
        ['Two plant pots.', 'Take away light, water or leaves. Then fast-forward a week.'],
        ['Waterweed.', 'Shine a lamp on it and count the bubbles of oxygen.'],
        ['Be fair.', 'Change ONE thing at a time. Keep everything else the same.'],
        ['Hear it.', 'Tap 🔊 and the words are read out to you.'],
      ],
      help: [
        ['Photosynthesis', ['Plants make their own food in their leaves.', 'They need sunlight, water, carbon dioxide and green chlorophyll.', 'They give out oxygen.']],
        ['The waterweed', ['The bubbles are oxygen.', 'A closer lamp gives brighter light.', 'Boiled and cooled water has no carbon dioxide.']],
        ['A fair test', ['Change ONE thing only.', 'Keep everything else the same.', 'Compare with a plant you did not change: the control.']],
        ['Stay safe', ['Never put a plant right under a hot lamp. Bulbs get hot.', 'Ask an adult before you use a lamp.']],
      ],
      how: ['<b>Choose</b> a guided experiment or a mission.', '<b>Follow the yellow box</b>. The thing to tap glows yellow.', '<b>Watch</b>, then read your notebook.'],
    },
  };

  return { DISTANCES, TEMPS, ROOM_TEMP, LIGHT_K, WATERS, TF, LAMP_HEAT, HEAT_CARD_AT, GAS_FOR_SPLINT,
           light, tempFactor, rate, limiting, LIMIT_WORDS, countRun, VAR_NAMES, changedVars, pondDiscoveries,
           LEAF_W, LEAF_H, PLANTS, COVERS, cellInfo, starchMap, starchReading, IODINE, describe, isExperiment, leafDiscoveries,
           EQUATION, DISCOVERIES, HAZARDS, RESULTS, FACTS, MISSIONS, GUIDES,
           GRADES, LEVELS, RIG_NAMES, POT_START, WEEK_DAYS, SEED_DAYS, SPOTS, DRINKS, SOILS, LEAVES, POT_VARS, POT_VAR_WORDS,
           POT_TEST_VALUE, newPot, isNormal, LEAF_COLOURS, potResult, potDiff, potCheck, potDiscoveries,
           WETS, PLACES, DISHES, newDish, seedNeeds, seedSprouts, seedStage, seedResult, seedDiscoveries, seedCheck,
           WEED_DISTS, WEED_WATERS, weedRun, WEED_VAR_WORDS, weedDiff, weedDiscoveries, PEQ,
           primaryStep, primaryRig, FACTS_G, PRIMARY_TEXT };
})();
if (typeof window !== 'undefined') window.LabPhotoData = LabPhotoData;
