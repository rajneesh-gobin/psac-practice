'use strict';
// ══════════════════════════════════════════════
//  Science Labs - the science behind Water & States (PSAC Grade 4).
//
//  ⚠ THE SCIENCE LIVES HERE, NOT IN THE ANIMATION. Every temperature, rate,
//    amount, outcome, hazard, card, fact, guide, discovery and quiz question
//    comes from this file. lab_water.js only moves time along and draws it.
//  ⚠ Grounded in grade4-science chapter g4sci-water ("States of matter: solid
//    (ice), liquid (water), gas (steam/water vapour). Changes of state:
//    melting, freezing, evaporation, condensation. Simple water cycle."),
//    subsections `states` and `water_cycle`: 0 °C and 100 °C (g4s-wat-011/012,
//    g4sc-wat-050/051), drops on a cold glass (g4s-wat-009, g4sci-hd-027),
//    heat + wind + a spread-out surface dry a shirt faster (g4sci-hd-028),
//    evaporation → condensation → precipitation (g4s-wat-018).
//    The one PSAC paper reference is PSAC 2022 Question 1 (grade6-science
//    past_paper_2022.js, g6sc-pp22-011): water falling from clouds is
//    PRECIPITATION.
//  ⚠ Primary lab (docs/labs/LAB_SPEC.md §8): every guide, mission and
//    discovery carries `grades`, and every sentence is written for a
//    9-year-old. scripts/test-labs-water-data.js checks both.
//
//  The three benches:
//   HEAT  - 100 g of water in a glass beaker, as ice (from the freezer, -10 °C)
//           or tap water (20 °C). Each minute on the hot plate: ice warms 5 °C
//           to 0 °C, then 25 g melts; water warms 20 °C to 100 °C, then 20 g
//           boils away. The temperature STAYS at 0 °C while ice melts and at
//           100 °C while water boils (true; the plateau is beyond Grade 4).
//           On the table (25 °C) ice melts slowly; in the freezer (-18 °C)
//           water cools to 0 °C and freezes.
//   DRY   - three dishes of water. Evaporation per hour = 1 ml × 3 for a wide
//           plate × 2 in the sun × 2 with a fan; a lid stops water escaping.
//   JAR   - a glass jar: warm water evaporates, the vapour condenses under a
//           cold lid, and the drops fall as "rain" once they are big enough.
//  The rates are illustrative - real ones depend on the room and the weather.
//  0 °C, 100 °C, the ORDER of the rates and the zeros are the science, and
//  the data test checks them.
// ══════════════════════════════════════════════
const LabWaterData = (() => {
  const GRADES = [4];

  // ── HEAT: ice, water and steam ─────────────────
  const MASS = 100;            // grams of water in the beaker
  const MELT_C = 0;            // ice melts (and water freezes) at 0 °C
  const BOIL_C = 100;          // water boils at 100 °C
  const ROOM_C = 25;           // a warm Mauritian classroom
  const FREEZER_C = -18;       // a home freezer
  const ICE_C = -10;           // ice straight from the freezer
  const TAP_C = 20;            // tap water
  const STEAMY_C = 80;         // steam can be seen rising from here
  const PARALLAX_C = 4;        // how far off a reading from above looks
  const HEAT = {
    hot:     { warmIce: 5, melt: 25, warmWater: 20, boil: 20 },
    table:   { warmIce: 2, melt: 5, warmWater: 2, coolWater: 5 },
    freezer: { coolWater: 10, freeze: 20, coolIce: 4 },
  };
  const PLACES = {
    table:   { name: 'On the table', icon: '🪑', meta: 'A warm room, 25 °C' },
    hot:     { name: 'On the hot plate', icon: '🔥', meta: 'An adult switches it on' },
    freezer: { name: 'In the freezer', icon: '❄️', meta: 'Very cold: −18 °C' },
  };
  const STARTS = {
    ice:   { name: 'Ice cubes', icon: '🧊', meta: 'From the freezer' },
    water: { name: 'Tap water', icon: '💧', meta: 'From the tap' },
  };

  const fmtC = t => (t < 0 ? '−' + (-t) : String(t)) + ' °C';

  function heatNew(start) {
    return start === 'water'
      ? { start: 'water', ice: 0, water: MASS, T: TAP_C, min: 0, place: 'table', gone: 0 }
      : { start: 'ice', ice: MASS, water: 0, T: ICE_C, min: 0, place: 'table', gone: 0 };
  }

  // One minute passes. Returns a NEW state; `off` is set when the hot plate
  // is switched off because the beaker boiled dry.
  function heatTick(s0) {
    const s = Object.assign({}, s0, { min: s0.min + 1, off: false });
    if (s.place === 'hot') {
      const r = HEAT.hot;
      if (s.ice > 0 && s.T < MELT_C) s.T = Math.min(MELT_C, s.T + r.warmIce);
      else if (s.ice > 0) { const m = Math.min(s.ice, r.melt); s.ice -= m; s.water += m; s.T = MELT_C; }
      else if (s.water > 0 && s.T < BOIL_C) s.T = Math.min(BOIL_C, s.T + r.warmWater);
      else if (s.water > 0) { const b = Math.min(s.water, r.boil); s.water -= b; s.gone += b; s.T = BOIL_C; }
      if (s.ice === 0 && s.water === 0) { s.place = 'table'; s.off = true; }
    } else if (s.place === 'freezer') {
      const r = HEAT.freezer;
      if (s.water > 0 && s.T > MELT_C) s.T = Math.max(MELT_C, s.T - r.coolWater);
      else if (s.water > 0) { const f = Math.min(s.water, r.freeze); s.water -= f; s.ice += f; s.T = MELT_C; }
      else if (s.ice > 0) s.T = Math.max(FREEZER_C, s.T - r.coolIce);
    } else {
      const r = HEAT.table;
      if (s.ice > 0 && s.T < MELT_C) s.T = Math.min(MELT_C, s.T + r.warmIce);
      else if (s.ice > 0) { const m = Math.min(s.ice, r.melt); s.ice -= m; s.water += m; s.T = MELT_C; }
      else if (s.water > 0 && s.T < ROOM_C) s.T = Math.min(ROOM_C, s.T + r.warmWater);
      else if (s.water > 0 && s.T > ROOM_C) s.T = Math.max(ROOM_C, s.T - r.coolWater);
    }
    return s;
  }
  function heatRun(s, minutes) {
    const frames = [];
    let x = s;
    for (let i = 0; i < minutes; i++) { x = heatTick(x); frames.push(x); }
    return frames;
  }

  function phase(s) {
    if (s.ice > 0 && s.water > 0) return s.place === 'freezer' ? 'freezing' : 'melting';
    if (s.ice > 0) return 'solid';
    if (s.water > 0) return s.place === 'hot' && s.T >= BOIL_C ? 'boiling' : 'liquid';
    return 'empty';
  }
  const steamy = s => s.water > 0 && s.T >= STEAMY_C;
  const angleRead = t => t + PARALLAX_C;

  // Which state of matter is in the beaker - the words the notebook uses.
  const STATE_OF = {
    solid: 'Solid (ice)', melting: 'Solid and liquid', liquid: 'Liquid (water)',
    boiling: 'Liquid, and gas (steam)', freezing: 'Liquid and solid', empty: 'Nothing left',
  };
  function heatSeen(s) {
    switch (phase(s)) {
      case 'solid': return s.T < MELT_C ? 'Solid ice. It is colder than 0 °C.' : 'Solid ice, at 0 °C.';
      case 'melting': return 'The ice is melting. Water is forming around it.';
      case 'freezing': return 'The water is freezing. Ice is forming.';
      case 'boiling': return 'The water is boiling! Big bubbles. Steam rises.';
      case 'empty': return 'The beaker is empty. All the water boiled away.';
    }
    if (steamy(s)) return 'The water is very hot. A little steam rises.';
    return s.T <= ROOM_C ? 'Liquid water.' : 'Warm liquid water.';
  }
  function heatShort(s) {
    return { solid: 'Ice', melting: 'Ice melting', liquid: steamy(s) ? 'Very hot water' : 'Water', boiling: 'Boiling',
             freezing: 'Water freezing', empty: 'Empty' }[phase(s)];
  }

  // One change on the heat bench: { s } | { hazard } | { refuse }.
  function applyHeat(s, k, v, adult) {
    if (k === 'start') return STARTS[v] ? { s: heatNew(v) } : { refuse: 'Start with ice or with water.' };
    if (k === 'place') {
      if (!PLACES[v]) return { refuse: 'The beaker cannot go there.' };
      if (v === 'hot' && !adult) return { hazard: 'hotplate' };
      if (v === 'hot' && s.ice === 0 && s.water === 0) return { refuse: 'The beaker is empty. Start again first.' };
      return { s: Object.assign({}, s, { place: v, off: false }) };
    }
    return { refuse: 'That does not go here.' };
  }

  // What a wait on the heat bench unlocks (prev = before, s = after).
  function heatFinds(prev, s) {
    const out = [];
    if (prev.ice > 0 && s.ice === 0 && s.water > 0) out.push('melt');
    if (s.place === 'table' && prev.ice > 0 && s.water > prev.water) out.push('melt_room');
    if (s.place === 'freezer' && prev.water > 0 && s.water === 0 && s.ice > 0) out.push('freeze');
    if (prev.water > 0 && s.water === 0 && s.ice === 0) out.push('boiled_away');
    return out;
  }
  // What a reading of the thermometer (at eye level) unlocks.
  function readFinds(s) {
    const p = phase(s);
    if (p === 'melting' || p === 'freezing') return ['zero'];
    if (p === 'boiling') return ['boil'];
    return [];
  }

  // ── DRY: what speeds up evaporation ─────────────
  const DISHES = ['A', 'B', 'C'];
  const DRY = { base: 1, plate: 3, sun: 2, fan: 2 };   // ml per hour, and the multipliers
  const DRY_HOURS = 6;
  const AMTS = [30, 60];
  const CONTS = {
    cup:   { name: 'Narrow cup', icon: '🥛', meta: 'A small water surface' },
    plate: { name: 'Wide plate', icon: '🍽️', meta: 'A big water surface' },
  };
  const SPOTS = {
    shade: { name: 'In the shade', icon: '🌳' },
    sun:   { name: 'In the sun', icon: '☀️' },
  };
  const FACTORS = ['cont', 'spot', 'fan', 'lid', 'amt'];
  const FACTOR_DISC = { spot: 'sun_dries', fan: 'wind_dries', cont: 'wide_dries', lid: 'lid_stops' };
  const FACTOR_WORDS = {
    cont: d => (d.cont === 'plate' ? 'a wide plate' : 'a narrow cup'),
    spot: d => (d.spot === 'sun' ? 'the sun' : 'the shade'),
    fan: d => (d.fan ? 'the fan' : 'no fan'),
    lid: d => (d.lid ? 'a lid' : 'no lid'),
    amt: d => `${d.amt} ml of water`,
  };

  const blankDish = () => ({ cont: 'cup', spot: 'shade', fan: false, lid: false, amt: 30 });
  function newDishes() { const o = {}; DISHES.forEach(id => { o[id] = blankDish(); }); return o; }
  function dryRate(d) {
    if (d.lid) return 0;
    return DRY.base * (d.cont === 'plate' ? DRY.plate : 1) * (d.spot === 'sun' ? DRY.sun : 1) * (d.fan ? DRY.fan : 1);
  }
  const dryLeft = (d, h) => Math.max(0, Math.round((d.amt - dryRate(d) * Math.max(0, h)) * 10) / 10);
  const diffs = (a, b) => FACTORS.filter(f => a[f] !== b[f]);
  const dishList = items => DISHES.filter(id => items[id]).map(id => ({ id, d: items[id] }));

  function dishWords(d) {
    const bits = [CONTS[d.cont].name, SPOTS[d.spot].name.toLowerCase()];
    if (d.fan) bits.push('fan on');
    if (d.lid) bits.push('lid on');
    bits.push(`${d.amt} ml`);
    return bits.join(', ');
  }
  function dishLabel(d) {
    return [d.cont === 'plate' ? 'plate' : 'cup', [d.spot === 'sun' ? 'sun' : 'shade', d.fan ? 'fan' : '', d.lid ? 'lid' : ''].filter(Boolean).join(' + ')];
  }

  function applyDry(d, k, v) {
    const n = Object.assign({}, d);
    if (k === 'cont' && CONTS[v]) n.cont = v;
    else if (k === 'spot' && SPOTS[v]) n.spot = v;
    else if (k === 'fan' && (v === 'on' || v === 'off')) n.fan = v === 'on';
    else if (k === 'lid' && (v === 'on' || v === 'off')) n.lid = v === 'on';
    else if (k === 'amt' && AMTS.includes(Number(v))) n.amt = Number(v);
    else return { refuse: 'That does not go here.' };
    return { s: n };
  }

  // Factors tested fairly: a pair of dishes that differ in exactly this ONE thing.
  function fairFactors(items) {
    const L = dishList(items), out = new Set();
    for (let i = 0; i < L.length; i++) for (let j = i + 1; j < L.length; j++) {
      const df = diffs(L[i].d, L[j].d);
      if (df.length === 1) out.add(df[0]);
    }
    return [...out];
  }
  function dryFinds(items, h) {
    if (h < 2) return [];
    return fairFactors(items).map(f => FACTOR_DISC[f]).filter(Boolean);
  }
  // Unfair: a dish with no partner that differs from it in only one thing.
  function dryMistakes(items, h) {
    if (h < 1) return [];
    const L = dishList(items);
    for (const x of L) {
      let best = null;
      L.forEach(y => { if (y !== x) { const df = diffs(x.d, y.d); if (!best || df.length < best.df.length) best = { y, df }; } });
      if (!best || best.df.length < 2) continue;
      if (best.df.includes('amt')) return [{ id: 'amounts', ctx: { dish: x.id, amt: x.d.amt, other: best.y.id, otherAmt: best.y.d.amt } }];
      return [{ id: 'two_vars', ctx: { dish: x.id, other: best.y.id, n: best.df.length, what: best.df.map(f => FACTOR_WORDS[f](x.d)).join(' and ') } }];
    }
    return [];
  }

  // ── JAR: a water cycle in a jar ─────────────────
  const JAR_STEP = 10;         // minutes per wait
  const JAR_STEPS = 3;         // 30 minutes in all
  const RAIN_AT = 6;           // drops this big fall back down
  const JAR_WATERS = {
    none:    { name: 'No water', icon: '🫙', vap: 0 },
    cold:    { name: 'Cold water', icon: '🧊', vap: 1 },
    warm:    { name: 'Warm water', icon: '♨️', vap: 3 },
    boiling: { name: 'Boiling water', icon: '🫖', vap: 0 },
  };
  const JAR_LIDS = {
    none: { name: 'No lid', icon: '⭕', cool: 0 },
    film: { name: 'Cling film', icon: '🎞️', cool: 0.5 },
    ice:  { name: 'Plate of ice', icon: '🧊', cool: 1 },
  };
  const JAR_SPOTS = {
    shade: { name: 'In the shade', icon: '🌳', sun: 0 },
    sun:   { name: 'Sunny window', icon: '☀️', sun: 1 },
  };
  const blankJar = () => ({ water: 'none', lid: 'none', spot: 'shade' });
  const jarVapour = j => (j.water === 'none' || j.water === 'boiling' ? 0 : JAR_WATERS[j.water].vap + JAR_SPOTS[j.spot].sun);
  const jarDrops = (j, steps) => Math.round(jarVapour(j) * JAR_LIDS[j.lid].cool * Math.max(0, steps) * 100) / 100;
  function jarStage(j, steps) {
    if (j.water === 'none') return 'dry';
    if (steps <= 0) return 'start';
    if (j.lid === 'none') return 'escape';
    const d = jarDrops(j, steps);
    if (d >= RAIN_AT) return 'rain';
    if (d >= 3) return 'many';
    if (d > 0) return 'few';
    return 'none';
  }
  const JAR_SEEN = {
    dry: 'The jar is empty.',
    start: 'Nothing has happened yet.',
    escape: 'The vapour floats out of the open jar. No drops.',
    none: 'No drops under the lid.',
    few: 'A few tiny drops under the lid.',
    many: 'Lots of drops under the lid. That is condensation.',
    rain: 'Big drops fall back into the water, like rain!',
  };
  const JAR_SHORT = { dry: 'Empty', start: 'Not started', escape: 'No drops', none: 'No drops', few: 'A few drops', many: 'Lots of drops', rain: 'Rain!' };
  const jarWords = j => `${JAR_WATERS[j.water].name}, ${JAR_LIDS[j.lid].name.toLowerCase()}, ${JAR_SPOTS[j.spot].name.toLowerCase()}`;

  function applyJar(j, k, v, adult) {
    const n = Object.assign({}, j);
    if (k === 'jwater') {
      if (!JAR_WATERS[v]) return { refuse: 'That does not go in the jar.' };
      if (v === 'boiling') return { hazard: adult ? 'crack' : 'kettle' };
      n.water = v; return { s: n };
    }
    if (k === 'jlid' && JAR_LIDS[v]) { n.lid = v; return { s: n }; }
    if (k === 'jplace' && JAR_SPOTS[v]) { n.spot = v; return { s: n }; }
    return { refuse: 'That does not go here.' };
  }
  function jarFinds(j, steps) {
    const out = [], st = jarStage(j, steps);
    if (st === 'rain' && j.water === 'warm') out.push('jar_cycle');
    if (st === 'rain' && j.water === 'cold' && j.spot === 'sun') out.push('sun_jar');
    if (steps >= JAR_STEPS && j.water === 'cold' && j.spot === 'shade' && (st === 'few' || st === 'many')) out.push('cold_jar');
    return out;
  }
  function jarMistakes(j, steps) {
    return steps >= 1 && jarStage(j, steps) === 'escape' ? [{ id: 'no_lid', ctx: {} }] : [];
  }

  // What the coach says after a change to the set-up.
  const SAY = {
    'start:ice': 'A beaker of ice cubes, fresh from the freezer. Ice is solid water.',
    'start:water': 'A beaker of tap water. Water is a liquid. It flows.',
    'place:table': 'The beaker is on the table. The room is warm, about 25 °C.',
    'place:hot': 'An adult switched on the hot plate. The beaker is heating up.',
    'place:freezer': 'The beaker is in the freezer. It is very cold in there.',
    'cont:cup': 'A narrow cup. Only a small water surface meets the air.',
    'cont:plate': 'A wide plate. A big water surface meets the air.',
    'spot:shade': 'In the shade. Cool, out of the sun.',
    'spot:sun': 'In the sun. The sun warms the water.',
    'fan:on': 'A fan blows air over the water.',
    'fan:off': 'No fan. The air is still.',
    'lid:on': 'A lid covers the dish.',
    'lid:off': 'No lid. The water is open to the air.',
    'amt:30': '30 ml of water in this dish.',
    'amt:60': '60 ml of water in this dish. That is twice as much.',
    'jwater:none': 'The jar is empty.',
    'jwater:cold': 'Cold water from the fridge.',
    'jwater:warm': 'Warm tap water. Warm, not boiling.',
    'jlid:none': 'No lid. The jar is open.',
    'jlid:film': 'Cling film is stretched over the top.',
    'jlid:ice': 'A plate on top, with ice cubes on it. The plate gets very cold.',
    'jplace:shade': 'The jar is in the shade.',
    'jplace:sun': 'The jar is on a sunny window sill.',
  };

  // ── Missions ── A question's FIRST option is the answer; the quiz shuffles them.
  function missionReady(id, c) {
    if (id === 'states') { const f = c.flags || {}; return !!(f.zero && f.boil && f.steam && f.caught); }
    if (id === 'race') return c.h >= 3 && !dryMistakes(c.items, c.h).length && fairFactors(c.items).filter(f => f !== 'amt').length >= 2;
    if (id === 'cycle') return jarStage(c.j, c.steps) === 'rain' && c.j.lid !== 'none';
    return false;
  }

  const MISSIONS = [
    {
      id: 'states', icon: '🌡️', title: 'Ice to steam', rig: 'heat', grades: [4],
      blurb: 'Heat ice until it boils. Read the thermometer. Catch the steam.',
      intro: 'Ask an adult to help. Heat the ice. Read the thermometer as it melts, and as it boils. Then name the steam and catch it.',
      quiz: [
        { q: 'At what temperature does ice melt?',
          options: ['0 °C', '100 °C', '37 °C', '50 °C'],
          why: 'Ice melts at 0 °C. Water also freezes at 0 °C.' },
        { q: 'At what temperature does water boil?',
          options: ['100 °C', '0 °C', '37 °C', '200 °C'],
          why: 'Water boils at 100 °C. It stays at 100 °C while it boils.' },
        { q: 'What is steam?',
          options: ['Water as a gas', 'A kind of smoke', 'Very hot ice', 'Air from the hot plate'],
          why: 'Steam is water vapour, a gas. Smoke comes from things that burn.' },
        { q: 'Steam touches a cold plate. What forms on the plate?',
          options: ['Drops of water', 'Tiny ice cubes', 'Grey smoke', 'Nothing at all'],
          why: 'Steam cools and turns back into water. This is condensation.' },
        { q: 'What do we call ice turning into water?',
          options: ['Melting', 'Freezing', 'Boiling', 'Condensation'],
          why: 'Melting turns a solid into a liquid. Freezing is the opposite.' },
        { q: 'Which one is water in its solid state?',
          options: ['Ice', 'Steam', 'Rain', 'Water vapour'],
          why: 'Ice is solid water. Rain is liquid. Steam and water vapour are gas.' },
      ],
    },
    {
      id: 'race', icon: '☀️', title: 'The drying race', rig: 'dry', grades: [4],
      blurb: 'What makes water evaporate faster? Run a fair test.',
      intro: 'Keep dish A as it is. Change ONE thing in dish B. Change a different thing in dish C. Then wait 3 hours or more.',
      quiz: [
        { q: 'Wet clothes dry faster on a sunny day. Why?',
          options: ['Heat makes water evaporate faster', 'The sun pulls the clothes tight', 'Sunlight turns the water into ice', 'Clothes cannot get wet in the sun'],
          why: 'Heat speeds up evaporation. The water turns into vapour faster.' },
        { q: 'Why does a windy day dry clothes faster?',
          options: ['Moving air carries the vapour away', 'The wind makes the clothes colder', 'The wind pushes water back in', 'The wind stops the sun shining'],
          why: 'Moving air takes the water vapour away. So more water can evaporate.' },
        { q: 'The same water is in a cup and on a plate. Which dries first?',
          options: ['The plate: it has a bigger surface', 'The cup: its water is deeper', 'Both dry at the same speed', 'Neither of them ever dries'],
          why: 'Water evaporates from its surface. A wide plate has a bigger surface.' },
        { q: 'In a fair test, how many things do you change?',
          options: ['Only one thing', 'Two things', 'Three things', 'Everything'],
          why: 'Change one thing and keep the rest the same. Then you know what made the difference.' },
        { q: 'A puddle dries up on a hot day. Where did the water go?',
          options: ['Into the air, as water vapour', 'Deep down into the rock', 'Up into the sun', 'Nowhere: heat destroyed it'],
          why: 'The water evaporated. It is still there, as vapour in the air.' },
        { q: 'Why does a dish with a lid keep its water?',
          options: ['The vapour cannot escape', 'The lid makes the water freeze', 'The lid soaks up the water', 'Water never evaporates indoors'],
          why: 'The vapour hits the lid, turns back into drops, and falls back in.' },
      ],
    },
    {
      id: 'cycle', icon: '🌧️', title: 'Rain in a jar', rig: 'jar', grades: [4],
      blurb: 'Make the water cycle happen inside a jar.',
      intro: 'Put warm water in the jar. Cover it, with ice on top. Wait until it rains inside the jar.',
      quiz: [
        { q: 'Warm water in the jar turns into vapour. What is this called?',
          options: ['Evaporation', 'Condensation', 'Precipitation', 'Freezing'],
          why: 'Evaporation turns liquid water into water vapour, a gas.' },
        { q: 'Vapour turns into drops under the cold lid. What is this called?',
          options: ['Condensation', 'Evaporation', 'Melting', 'Boiling'],
          why: 'Condensation turns water vapour back into liquid water. Clouds form this way.' },
        { q: 'Water falls from clouds back to Earth. What is this called?',
          options: ['Precipitation', 'Condensation', 'Evaporation', 'Melting'],
          why: 'PSAC 2022, Question 1 asked this. Rain, hail and snow are precipitation.' },
        { q: 'Which is the right order for the water cycle?',
          options: ['Evaporation, condensation, precipitation', 'Precipitation, evaporation, condensation', 'Condensation, precipitation, evaporation', 'Melting, freezing, boiling'],
          why: 'Water evaporates, condenses into clouds, then falls as rain. Then it starts again.' },
        { q: 'What does the ice on the lid do?',
          options: ['It cools the vapour into drops', 'It warms up the water', 'It makes the water salty', 'It stops the water evaporating'],
          why: 'Cold turns vapour back into water. High in the sky, cold air does the same.' },
        { q: 'In the real water cycle, what heats the sea?',
          options: ['The sun', 'The moon', 'The wind', 'The rain'],
          why: 'The sun heats the sea, rivers and lakes. That makes the water evaporate.' },
      ],
    },
  ];

  // ── Discoveries ─────────────────────────────────
  // how = guide tokens (see GUIDES). scripts/test-labs-water.js follows every
  // `how` from a fresh bench and fails if it does not unlock its own card.
  const TO_BOIL = ['rig:heat', 'adult:on', 'place:hot', 'five', 'five', 'min'];
  const DISCOVERIES = [
    { id: 'melt', icon: '🧊', title: 'Ice melts', grades: [4],
      hint: 'Heat a beaker of ice. Keep going until no ice is left.',
      how: ['rig:heat', 'adult:on', 'place:hot', 'five', 'five'],
      saw: 'The ice cubes got smaller and smaller. Then there was only water.',
      rule: 'solid ice → liquid water: melting',
      learn: 'Heat makes ice melt. Melting turns a solid into a liquid.' },
    { id: 'melt_room', icon: '🪑', title: 'A warm room melts ice too', grades: [4],
      hint: 'Leave the ice on the table. Wait 10 minutes.',
      how: ['rig:heat', 'place:table', 'five', 'five'],
      saw: 'Water formed around the ice. There was no hot plate at all.',
      rule: 'room (25 °C) is warmer than 0 °C → ice melts slowly',
      learn: 'The room is warmer than 0 °C. Heat from the air melts the ice, slowly.' },
    { id: 'zero', icon: '🌡️', title: 'Ice melts at 0 °C', grades: [4],
      hint: 'Read the thermometer while there is ice AND water in the beaker.',
      how: ['rig:heat', 'adult:on', 'place:hot', 'five', 'read'],
      saw: 'The thermometer said 0 °C while the ice was melting.',
      rule: 'ice melts at 0 °C · water freezes at 0 °C',
      learn: 'Ice melts at 0 °C. Water freezes at the same temperature, 0 °C.' },
    { id: 'boil', icon: '🫧', title: 'Water boils at 100 °C', grades: [4],
      hint: 'Heat water until big bubbles come. Then read the thermometer.',
      how: TO_BOIL.concat(['read']),
      saw: 'Big bubbles rose in the water. The thermometer said 100 °C.',
      rule: 'water boils at 100 °C',
      learn: 'Water boils at 100 °C. Bonus fact, beyond Grade 4: it stays at 100 °C while it boils.' },
    { id: 'steam', icon: '☁️', title: 'Steam is water as a gas', grades: [4],
      hint: 'When the water boils, name what rises from it.',
      how: TO_BOIL.concat(['name:steam']),
      saw: 'A white cloud rose from the boiling water. You named it: steam.',
      rule: 'liquid water → water vapour (a gas): boiling',
      learn: 'Steam is water as a gas. The white cloud is tiny drops, made as the steam cools.' },
    { id: 'condense', icon: '💧', title: 'Steam turns back into water', grades: [4],
      hint: 'Hold a cold plate over boiling water.',
      how: TO_BOIL.concat(['catch']),
      saw: 'Drops of water formed under the cold plate.',
      rule: 'water vapour → liquid water: condensation',
      learn: 'The steam cooled on the cold plate and became water again. This is condensation.' },
    { id: 'freeze', icon: '❄️', title: 'Water freezes', grades: [4],
      hint: 'Put tap water in the freezer. Wait 10 minutes.',
      how: ['rig:heat', 'start:water', 'place:freezer', 'five', 'five'],
      saw: 'The water turned into solid ice. Then it got colder than 0 °C.',
      rule: 'liquid water → solid ice: freezing (at 0 °C)',
      learn: 'Cold makes water freeze at 0 °C. Freezing is the opposite of melting.' },
    { id: 'boiled_away', icon: '🫗', title: 'Where did the water go?', grades: [4],
      hint: 'Keep the water boiling until the beaker is empty.',
      how: ['rig:heat', 'adult:on', 'place:hot', 'five', 'five', 'five', 'five'],
      saw: 'The water level fell as it boiled. At last the beaker was empty.',
      rule: 'boiling water → steam, which mixes into the air',
      learn: 'The water was not destroyed. It became steam and mixed into the air.' },
    { id: 'sun_dries', icon: '☀️', title: 'Heat speeds up evaporation', grades: [4],
      hint: 'Put one dish in the sun. Keep one in the shade.',
      how: ['rig:dry', 'dish:B', 'spot:sun', 'six'],
      saw: 'The dish in the sun lost its water faster than the dish in the shade.',
      rule: 'more heat → faster evaporation',
      learn: 'Evaporation is water slowly turning into vapour. Heat makes it happen faster.' },
    { id: 'wind_dries', icon: '🌀', title: 'Wind speeds up evaporation', grades: [4],
      hint: 'Put a fan next to one dish. Keep one in still air.',
      how: ['rig:dry', 'dish:B', 'fan:on', 'six'],
      saw: 'The dish with the fan lost its water faster.',
      rule: 'moving air → faster evaporation',
      learn: 'Moving air carries the water vapour away. So washing dries fast on a windy day.' },
    { id: 'wide_dries', icon: '🍽️', title: 'Spread it out!', grades: [4],
      hint: 'Put the same water in a cup and on a plate.',
      how: ['rig:dry', 'dish:B', 'cont:plate', 'six'],
      saw: 'The water on the wide plate dried much faster than the water in the cup.',
      rule: 'bigger surface → faster evaporation',
      learn: 'Water evaporates from its top surface. A wide plate has a much bigger surface.' },
    { id: 'lid_stops', icon: '🥫', title: 'A lid keeps the water in', grades: [4],
      hint: 'Put a lid on one dish. Leave one open.',
      how: ['rig:dry', 'dish:B', 'lid:on', 'six'],
      saw: 'The covered dish still had all its water. The open dish lost some.',
      rule: 'covered → the vapour cannot escape',
      learn: 'Under the lid, vapour turns back into drops and falls back in. No water escapes.' },
    { id: 'jar_cycle', icon: '🌧️', title: 'Rain in a jar', grades: [4],
      hint: 'Warm water in a jar. Ice on the lid. Wait.',
      how: ['rig:jar', 'jwater:warm', 'jlid:ice', 'ten', 'ten'],
      saw: 'Drops formed under the lid. They grew, then fell like rain.',
      rule: 'evaporation → condensation → precipitation',
      learn: 'This is the water cycle. The sun warms the sea. Vapour cools into clouds. Rain falls.',
      psac: 'PSAC 2022, Question 1: water falling from clouds is called precipitation.' },
    { id: 'sun_jar', icon: '🌤️', title: 'The sun can do it too', grades: [4],
      hint: 'Cold water in a jar with ice on the lid. Put it on a sunny window.',
      how: ['rig:jar', 'jwater:cold', 'jlid:ice', 'jplace:sun', 'ten', 'ten', 'ten'],
      saw: 'Even cold water made rain in the jar, on the sunny window.',
      rule: 'sunlight warms the water → more evaporation',
      learn: 'The sun heats the sea, rivers and lakes. The sun drives the real water cycle.' },
    { id: 'cold_jar', icon: '🥶', title: 'Cold water is slow', grades: [4],
      hint: 'Cold water in a jar with ice on the lid, in the shade. Wait 30 minutes.',
      how: ['rig:jar', 'jwater:cold', 'jlid:ice', 'ten', 'ten', 'ten'],
      saw: 'After 30 minutes there were only a few tiny drops. No rain.',
      rule: 'less heat → less evaporation',
      learn: 'Cold water evaporates slowly. Warm water makes much more vapour.' },
  ];

  // ── Hazards: the mistakes that stop the experiment ───
  const HAZARDS = {
    hotplate: {
      signs: ['hot'], fx: 'steam',
      title: () => 'Hot! Ask an adult to use the hot plate',
      happened: () => 'You switched on the hot plate on your own. Your hand touched its hot top.',
      why: 'A hot plate burns skin badly. It stays hot after it is switched off.',
      instead: 'Ask an adult to switch it on. Tap “Adult helper” first. Keep your hands away.',
      exam: 'Heating is a job for an adult. Keep hands away from hot things.',
    },
    steam: {
      signs: ['hot'], fx: 'steam',
      title: () => 'Ouch! Steam burns',
      happened: () => 'You held your hand over the boiling water. The steam burned your skin.',
      why: 'Steam from boiling water is as hot as 100 °C. It burns skin in a moment.',
      instead: 'Never put your hand over a boiling pan. Catch steam on a cold plate, with an oven glove.',
      exam: 'Steam is water as a gas. It is very hot, so keep away from it.',
    },
    kettle: {
      signs: ['hot'], fx: 'steam',
      title: () => 'Hot! Boiling water can burn you',
      happened: () => 'You tried to pour boiling water from the kettle on your own. It splashed.',
      why: 'Boiling water burns skin badly. A full kettle is heavy and can tip over.',
      instead: 'Ask an adult to use the kettle. For the jar, warm tap water works well.',
      exam: 'Warm water is enough. It evaporates, and the jar still makes rain.',
    },
    crack: {
      signs: ['sharp'], fx: 'crack',
      title: () => 'Crack! The glass jar broke',
      happened: () => 'The adult poured boiling water into the cold glass jar. The glass cracked with a snap.',
      why: 'Sudden heat can crack ordinary glass. Broken glass is sharp and can cut you.',
      instead: 'Use warm water, not boiling water. Never touch broken glass. Let an adult clear it up.',
      exam: 'Warm water is enough for a water cycle in a jar.',
    },
  };

  // ── Wrong but safe: what went wrong and what to do instead ───
  const RESULTS = {
    angle: { icon: '👀', title: 'You read it from above',
      happened: c => `From above, the thermometer seemed to say ${fmtC(c.seen)}. The real temperature was ${fmtC(c.real)}.`,
      instead: 'Bend down. Keep your eyes level with the top of the red line. Then read the number.',
      exam: 'Exam questions ask you to read a thermometer. Look straight at the line.' },
    smoke: { icon: '🌫️', title: 'That is not smoke',
      happened: () => 'You called the white cloud smoke. But nothing is burning. It is water.',
      instead: 'Call it steam. Steam is water as a gas. The white cloud is tiny drops of water.',
      exam: 'Smoke comes from burning. Steam comes from boiling water.' },
    two_vars: { icon: '⚖️', title: 'Not a fair test: two things changed',
      happened: c => `Dish ${c.dish} was different from dish ${c.other} in ${c.n} ways: ${c.what}. So you cannot tell which one mattered.`,
      instead: 'Change only ONE thing in each dish. Keep dish A as it is, to compare.',
      exam: 'A fair test changes one thing. Everything else stays the same.' },
    amounts: { icon: '💧', title: 'Not the same amount of water',
      happened: c => `Dish ${c.dish} started with ${c.amt} ml. Dish ${c.other} started with ${c.otherAmt} ml. Something else changed too.`,
      instead: 'Put the same amount of water in every dish. Then change only one thing.',
      exam: 'In a fair test, keep the amount the same. Change only one thing.' },
    no_lid: { icon: '🫙', title: 'The vapour escaped',
      happened: () => 'The jar had no lid. The water vapour floated away into the room. No drops, no rain.',
      instead: 'Cover the jar. A plate of ice on top works best. Cold turns the vapour into drops.',
      exam: 'In the water cycle, vapour cools high in the sky. It forms clouds, then rain.' },
  };

  // Short, true facts for the 💡 button, at a Grade 4 reading level.
  const FACTS = [
    'Water can be a solid, a liquid or a gas.',
    'Ice is solid water. Steam is water as a gas.',
    'Ice melts at 0 °C. Water boils at 100 °C.',
    'Pure water has no colour, no taste and no smell.',
    'Clouds are made of tiny drops of water.',
    'Dew on the grass in the morning is condensation.',
    'Drops on a cold glass of juice come from the air around it.',
    'The sun drives the water cycle. It heats the sea, rivers and lakes.',
    'Curepipe, high on the plateau, gets much more rain than Port Louis.',
    'Washing dries fastest when it is hot, windy and spread out.',
    'A fair test changes only ONE thing. Everything else stays the same.',
    'Most water on Earth is salty sea water. We cannot drink it.',
    'Water flows downhill because gravity pulls it down.',
  ];

  // ── Guided experiments: one action per step ──
  // `on` is what completes a step:
  //   rig:heat|dry|jar · adult:on|off
  //   start:ice|water · place:table|hot|freezer · name:steam|smoke
  //   min (1 minute) · five (5 minutes) · read · angle · catch · hand
  //   dish:A-C · cont:cup|plate · spot:shade|sun · fan|lid:on|off · amt:30|60
  //   hour · six (to 6 hours) · jwater:<JAR_WATERS> · jlid:<JAR_LIDS>
  //   jplace:shade|sun · ten (10 minutes) · reset
  // A step whose setting is already in place is skipped.
  const GUIDES = [
    { id: 'ice_steam', icon: '🔥', title: 'From ice to steam', grades: [4],
      blurb: 'Melt ice, boil water, then catch the steam.',
      lesson: 'Ice melted at 0 °C. Water boiled at 100 °C. The steam turned back into water on the cold plate.',
      steps: [
        { on: 'rig:heat', say: 'Tap 🔥 Heat & cool to go to the heating bench.' },
        { on: 'adult:on', say: 'Tap 🧑 Ask an adult to help — the hot plate gets very hot.' },
        { on: 'place:hot', say: 'Tap 🔥 On the hot plate to put the beaker of ice on it.' },
        { on: 'five', say: 'Tap ⏩ Wait 5 minutes and watch the ice.' },
        { on: 'read', say: 'Tap 🌡️ Read the thermometer — keep your eyes level with the scale.' },
        { on: 'five', say: 'Tap ⏩ Wait 5 minutes and watch the water.' },
        { on: 'min', say: 'Tap ⏱ Wait 1 minute — look for big bubbles forming.' },
        { on: 'read', say: 'Tap 🌡️ Read the thermometer again — the water is boiling now.' },
        { on: 'name:steam', say: 'Tap 🏷️ It is steam — name what rises from the water.' },
        { on: 'catch', say: 'Tap 🍽️ Hold a cold plate over it — wear an oven glove.' },
      ] },
    { id: 'freeze', icon: '❄️', title: 'Freeze it', grades: [4],
      blurb: 'Put water in the freezer. When does it turn into ice?',
      lesson: 'The water cooled down to 0 °C. Then it froze into ice. Freezing is the opposite of melting.',
      steps: [
        { on: 'rig:heat', say: 'Tap 🔥 Heat & cool to go to the heating bench.' },
        { on: 'start:water', say: 'Tap 💧 Tap water to start with a beaker of tap water.' },
        { on: 'place:freezer', say: 'Tap ❄️ In the freezer to put the beaker in.' },
        { on: 'five', say: 'Tap ⏩ Wait 5 minutes and watch the water.' },
        { on: 'read', say: 'Tap 🌡️ Read the thermometer — ice is forming.' },
        { on: 'five', say: 'Tap ⏩ Wait 5 more minutes.' },
      ] },
    { id: 'drying', icon: '☀️', title: 'The drying race', grades: [4],
      blurb: 'Sun, shade and a fan. Which dish dries first?',
      lesson: 'Dish A, in the shade, lost the least water. The sun and the fan both made water evaporate faster.',
      steps: [
        { on: 'rig:dry', say: 'Tap ☀️ Drying race to go to the drying bench.' },
        { on: 'dish:B', say: 'Tap Dish B — dish A stays as the control.' },
        { on: 'spot:sun', say: 'Tap ☀️ In the sun to put dish B in sunlight.' },
        { on: 'dish:C', say: 'Tap Dish C.' },
        { on: 'fan:on', say: 'Tap 🌀 Fan on — the fan blows air over dish C.' },
        { on: 'six', say: 'Tap ⏩ Wait 6 hours — which dish has the least water left?' },
      ] },
    { id: 'jar', icon: '🫙', title: 'A water cycle in a jar', grades: [4],
      blurb: 'Warm water, a lid and some ice. Make it rain inside.',
      lesson: 'Warm water evaporated. The vapour cooled under the icy lid and condensed. The drops fell like rain.',
      steps: [
        { on: 'rig:jar', say: 'Tap 🫙 Water cycle to go to the glass jar.' },
        { on: 'jwater:warm', say: 'Tap ♨️ Warm water — pour warm (not boiling) tap water into the jar.' },
        { on: 'jlid:ice', say: 'Tap 🧊 Plate of ice to cover the jar with a cold plate.' },
        { on: 'ten', say: 'Tap ⏱ Wait 10 minutes and look under the lid.' },
        { on: 'ten', say: 'Tap ⏱ Wait 10 more minutes — watch the drops.' },
      ] },
  ];

  return { GRADES, MASS, MELT_C, BOIL_C, ROOM_C, FREEZER_C, ICE_C, TAP_C, STEAMY_C, PARALLAX_C, HEAT, PLACES, STARTS,
           fmtC, heatNew, heatTick, heatRun, phase, steamy, angleRead, STATE_OF, heatSeen, heatShort, applyHeat, heatFinds, readFinds,
           DISHES, DRY, DRY_HOURS, AMTS, CONTS, SPOTS, FACTORS, blankDish, newDishes, dryRate, dryLeft, diffs, dishWords, dishLabel,
           applyDry, fairFactors, dryFinds, dryMistakes,
           JAR_STEP, JAR_STEPS, RAIN_AT, JAR_WATERS, JAR_LIDS, JAR_SPOTS, blankJar, jarVapour, jarDrops, jarStage, JAR_SEEN, JAR_SHORT,
           jarWords, applyJar, jarFinds, jarMistakes,
           SAY, missionReady, MISSIONS, DISCOVERIES, HAZARDS, RESULTS, FACTS, GUIDES };
})();
if (typeof window !== 'undefined') window.LabWaterData = LabWaterData;
