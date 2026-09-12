'use strict';
// ══════════════════════════════════════════════
//  Science Labs - the science behind Air & Burning (PSAC Grades 4 and 6).
//
//  ⚠ THE SCIENCE LIVES HERE, NOT IN THE ANIMATION. Every burn time, oxygen
//    reading, fire-and-method outcome, hazard, discovery, quiz question and
//    fact comes from this file. Even the rules of the bench live here:
//    apply(state, token, grade) is the whole experiment as a pure function,
//    and lab_air.js only animates what it returns. The data test runs the
//    very same function, so a recipe that works in the test works on screen.
//  ⚠ Two LEVELS, not one level in two wordings (docs/labs/LAB_SPEC.md §9):
//    - Grade 4 (g4sci-air: properties, breathing & burning): air is there,
//      takes up space (g4sci-hd-019) and has weight (g4s-air-013); a flame
//      under a jar goes out (g4s-air-005) and sooner under a small jar
//      (g4sci-hd-021); a puff cools a small flame (g4sci-hd-022).
//    - Grade 6 (g6-air: composition, breathing & burning): the fire triangle
//      (g6sci-air-001), water removes heat (-009), foam and CO₂ remove oxygen
//      (-002), CO₂ for electrical fires (-003), air is 78.1% nitrogen, 21%
//      oxygen, 0.03% CO₂ (-012, MIE Table 2), and the PSAC papers:
//      PSAC 2021 - candles P, Q, R under jars and S uncovered (g6sc-pp21-005);
//      PSAC 2024 Q1 - the gas needed for burning (g6sc-pp24-004);
//      PSAC 2019, 2021, 2022 - the gas used to put out fires (pp19-001,
//      pp21-008, pp22-002). Burning makes water and carbon dioxide, and the
//      limewater test, are Grade 6 only.
//  ⚠ Burn times are ROUGH classroom times for one small candle: about 24 s
//    per litre of air, half that for a big flame. Real jars vary; what is
//    true, and what the tests check, is the pattern: twice the air, about
//    twice the time; a bigger flame, a shorter time; no jar, no end.
//  ⚠ A flame goes out while some oxygen is still left - at about 16%, not 0%
//    (Grade 6 shows the reading). The Grade 4 questions say "used up the
//    oxygen"; the lab says "used up the oxygen it needs", which is true.
//  ⚠ The "water rises one fifth" candle demo (g4sci-hd-023) is left out on
//    purpose: most of that rise is the hot gas cooling, not oxygen used up.
// ══════════════════════════════════════════════
const LabAirData = (() => {
  const GRADES = [4, 6];
  const forGrade = (list, g) => list.filter(x => !x.grades || x.grades.includes(g));

  // ── The test stations ──────────────────────────
  const STATIONS = [
    { id: 'jars',     icon: '🕯️', name: 'Candle & jars',     grades: [4, 6], ask: 'How long will the flame burn?',
      how: 'Pick a jar. The teacher lights the candle. Then put the jar on.' },
    { id: 'space',    icon: '🥛', name: 'Glass in water',     grades: [4],    ask: 'Is an "empty" glass really empty?',
      how: 'Push the glass into the water. Watch the tissue inside.' },
    { id: 'weight',   icon: '🎈', name: 'Balloon balance',    grades: [4],    ask: 'Does air weigh anything?',
      how: 'Blow up both balloons. Then let the air out of one.' },
    { id: 'fire',     icon: '🧯', name: 'Fire safety yard',   grades: [6],    ask: 'How do you put out each fire?',
      how: 'A firefighter lights a fire in the safe yard. You choose how to put it out.' },
    { id: 'products', icon: '🫙', name: 'What burning makes', grades: [6],    ask: 'What does a flame make?',
      how: 'Hold a cold jar over the flame. Then test the gas with limewater.' },
  ];
  const station = id => STATIONS.find(s => s.id === id) || null;

  // ── Candles and jars ───────────────────────────
  // `letter`: the PSAC 2021 paper calls them candles P, Q, R (under jars) and S (no jar).
  const JARS = {
    none:   { id: 'none',   name: 'No jar',       size: 'no',     ml: null, letter: 'S' },
    small:  { id: 'small',  name: 'Small jar',    size: 'small',  ml: 250,  letter: 'P' },
    medium: { id: 'medium', name: 'Medium jar',   size: 'medium', ml: 500,  letter: 'Q' },
    large:  { id: 'large',  name: 'Large jar',    size: 'large',  ml: 1000, letter: 'R' },
  };
  const JAR_ORDER = ['none', 'small', 'medium', 'large'];
  const CANDLES = {
    small: { id: 'small', name: 'Small candle', flame: 'a small flame', rate: 1 },
    big:   { id: 'big',   name: 'Big candle',   flame: 'a big flame',   rate: 2 },
  };
  const SECONDS_PER_LITRE = 24;   // one small candle, roughly
  const UNCOVERED_CAP = 40;       // the open candle is timed this long - and is still burning
  const LATE_S = 2;               // a stopwatch started late misses this much
  const SPEED = 5;                // the bench plays burns 5 times faster than real life
  const O2_AIR = 21, O2_OUT = 16; // % oxygen: fresh air, and when the flame dies
  // Dry air, MIE Grade 6 Pupil's Book Table 2 (g6sci-air-012).
  const AIR = [
    { gas: 'Nitrogen', pct: 78.1 }, { gas: 'Oxygen', pct: 21.0 },
    { gas: 'Carbon dioxide', pct: 0.03 }, { gas: 'Other gases (argon)', pct: 0.87 },
  ];

  // Seconds until the flame goes out, or null: with no jar it keeps burning.
  function burnTime(jarId, candleId) {
    const j = JARS[jarId], c = CANDLES[candleId];
    if (!j || !c || !j.ml) return null;
    return Math.round((j.ml / 1000) * SECONDS_PER_LITRE / c.rate);
  }
  // The oxygen reading under the jar, `frac` of the way through the burn.
  const o2At = frac => Math.round((O2_AIR - (O2_AIR - O2_OUT) * Math.max(0, Math.min(1, frac))) * 10) / 10;
  const jarName = (id, g) => {
    const j = JARS[id];
    if (!j) return '';
    if (g === 6) return id === 'none' ? 'No jar (candle S)' : `Jar ${j.letter} (${j.size})`;
    return j.name;
  };

  // ── The fire safety yard (Grade 6) ─────────────
  const FIRES = {
    wood: { id: 'wood', icon: '🪵', name: 'Wood fire',       where: 'in a metal fire tray' },
    oil:  { id: 'oil',  icon: '🍳', name: 'Pan of oil',      where: 'on a camping stove, outside' },
    elec: { id: 'elec', icon: '🔌', name: 'Electrical fire', where: 'on an old plug on the training wall' },
  };
  const METHODS = {
    water:   { id: 'water',   icon: '💧', name: 'Throw water' },
    blanket: { id: 'blanket', icon: '🟫', name: 'Fire blanket' },
    co2:     { id: 'co2',     icon: '🧯', name: 'CO₂ extinguisher' },
    fueloff: { id: 'fueloff', icon: '⛔', name: 'Cut off the fuel' },
  };
  // "Cut off the fuel" means a different thing for each fire.
  const FUEL_OFF = { wood: 'Rake the wood away', oil: 'Turn off the stove', elec: 'Switch off the power' };
  const methodName = (m, fire) => (m === 'fueloff' && FUEL_OFF[fire]) || (METHODS[m] ? METHODS[m].name : '');
  // side: the side of the fire triangle removed. best: the way a firefighter would do it.
  function fireResult(fire, method, off) {
    const T = {
      wood: {
        water:   { out: true, side: 'heat',   best: true, say: 'Hiss! The water cooled the wood. The fire went out.' },
        blanket: { out: true, side: 'oxygen', best: true, say: 'The blanket cut off the air. With no oxygen, the fire went out.' },
        co2:     { out: true, side: 'oxygen', best: true, say: 'The carbon dioxide pushed the air away. With no oxygen, the fire went out.' },
        fueloff: { out: true, side: 'fuel',   best: true, say: 'The firefighter raked the unburnt wood away. With no fuel left, the fire died.' },
      },
      oil: {
        water:   { hazard: 'oil_water', say: 'Whoosh! A ball of burning oil shot up.' },
        blanket: { out: true, side: 'oxygen', best: true, say: 'The fire blanket cut off the oxygen. The fire went out. The pan stays covered to cool.' },
        co2:     { out: true, side: 'oxygen', best: false, say: 'It went out. But the blast can splash burning oil. A fire blanket is safer.' },
        fueloff: { out: false, side: 'heat', best: false, say: 'The stove is off, but the oil is still hot enough to burn. Cover the pan too.' },
      },
      elec: {
        water:   { hazard: 'elec_water', say: 'Stop! Water and electricity together can kill.' },
        blanket: off
          ? { out: true, side: 'oxygen', best: true, say: 'The power is off, and the blanket cut off the oxygen. The fire went out.' }
          : { out: false, side: 'oxygen', best: false, say: 'The live wire keeps heating it, so it will not stay out. Switch off the power first.' },
        co2:     off
          ? { out: true, side: 'oxygen', best: true, say: 'The power is off, and the carbon dioxide cut off the oxygen. The fire went out.' }
          : { out: true, side: 'oxygen', best: false, say: 'It went out. But the power is still on, so it could start again. Switch off first.' },
        fueloff: { out: false, side: 'heat', best: true, off: true, say: 'The power is off. It is still burning, but now the extinguisher is safe to use.' },
      },
    };
    return (T[fire] && T[fire][method]) || null;
  }

  // ── The bench, as one pure function ────────────
  // Tokens: station:<id> safety:on|off watch:ready jar:<id> candle:<id> light
  //   burn blow reset lift tap peek | push tilt bottle | fill letout
  //   fire:<id> method:<id> | jartemp:cold|warm hold lime control
  const TOK_STATION = {
    watch: ['jars'], jar: ['jars'], candle: ['jars'], burn: ['jars'], blow: ['jars'], reset: ['jars'], lift: ['jars'], tap: ['jars'], peek: ['jars'],
    light: ['jars', 'products'], push: ['space'], tilt: ['space'], bottle: ['space'], fill: ['weight'], letout: ['weight'],
    fire: ['fire'], method: ['fire'], jartemp: ['products'], hold: ['products'], lime: ['products'], control: ['products'],
  };
  const LIFT = 'The teacher let the jar cool, then lifted it off with a cloth. ';
  function newState(g) {
    const first = STATIONS.find(s => s.grades.includes(g)) || STATIONS[0];
    return { station: first.id, safety: false, watch: 'off', jar: 'small', candle: 'small', lit: false, jarOn: false, hot: false,
             prev: null, running: null, glass: 'up', balloons: 'empty', fire: null, fireOut: false, off: false, jartemp: 'cold' };
  }
  function _lift(st) { if (!st.jarOn) return false; st.jarOn = false; st.hot = false; return true; }

  // Runs one action. Returns { ok, say, events, hazard?, result?, ctx?, anim?, cancel? }.
  // ⚠ A burn sets state.running; the bench calls settle() when its animation ends.
  function apply(st, tok, g) {
    const [k, v] = String(tok).split(':');
    const R = o => Object.assign({ ok: true, events: [] }, o);
    const no = say => ({ ok: false, say, events: [] });
    if (k === 'station') {
      const S = station(v);
      if (!S || !S.grades.includes(g)) return no('That test is not part of your grade.');
      const lifted = st.station === 'jars' && v !== 'jars' && _lift(st);
      st.station = v;
      return R({ say: `${lifted ? LIFT : ''}${S.icon} ${S.name}. ${S.how}` });
    }
    if (k === 'safety') { st.safety = v === 'on'; return R({ say: st.safety ? 'Hair tied back, sleeves rolled up. Now you are safe near a flame.' : 'Your hair is loose again. Tie it back before any flame is lit.' }); }
    const where = TOK_STATION[k];
    if (!where) return no('');
    if (!where.includes(st.station)) return no(`Choose ${where.map(w => station(w).name).join(' or ')} first.`);
    switch (k) {
      case 'watch': st.watch = 'ready'; return R({ say: 'The stopwatch is ready. It starts the moment the jar touches the table.' });
      case 'jar': {
        if (!JARS[v]) return no('');
        const lifted = _lift(st);
        st.jar = v;
        return R({ say: `${lifted ? LIFT : ''}${jarName(v, g)}${JARS[v].ml ? `: ${JARS[v].ml} mL of air.` : '. The candle has all the air in the room.'}` });
      }
      case 'candle': {
        if (!CANDLES[v]) return no('');
        const lifted = _lift(st);
        if (st.candle !== v) st.lit = false;
        st.candle = v;
        return R({ say: `${lifted ? LIFT : ''}${CANDLES[v].name}. It makes ${CANDLES[v].flame}.` });
      }
      case 'light': {
        if (st.lit) return R({ say: 'The candle is already lit.' });
        if (!st.safety) return R({ hazard: 'hair', say: 'Stop! Loose hair and sleeves must not go near a flame.' });
        const lifted = _lift(st);
        st.lit = true;
        return R({ say: `${lifted ? LIFT : ''}The teacher lit the candle. Look at the flame!`, anim: { type: 'light' } });
      }
      case 'burn': {
        if (st.jarOn) return no('The jar is still on. Let it cool and lift it off first.');
        if (!st.lit) return no('Ask the teacher to light the candle first.');
        const late = st.watch !== 'ready';
        st.watch = 'off';
        const covered = st.jar !== 'none';
        const t = covered ? burnTime(st.jar, st.candle) : UNCOVERED_CAP;
        const measured = late ? Math.max(0, t - LATE_S) : t;
        const prev = st.prev;
        const fair = !(covered && prev && prev.jar !== st.jar && prev.candle !== st.candle);
        const ev = { kind: 'run', covered, jar: st.jar, candle: st.candle, time: t, measured, good: !late, fair,
                     prev: prev ? { jar: prev.jar, candle: prev.candle, time: prev.time } : null, o2End: covered ? O2_OUT : O2_AIR };
        st.running = { prevBefore: prev };
        if (covered) { st.jarOn = true; st.hot = true; st.lit = false; if (!late) st.prev = { jar: st.jar, candle: st.candle, time: t }; }
        const say = covered
          ? `The flame went out after ${measured} seconds.${g === 6 ? ` The oxygen fell to about ${O2_OUT}%.` : ''}`
          : `After ${measured} seconds the open candle is still burning. It has fresh air all the time.`;
        return R({ events: [ev], say, result: late ? 'late' : fair ? null : 'unfair',
                   ctx: { jar: jarName(st.jar, g).toLowerCase(), candle: CANDLES[st.candle].name.toLowerCase(), time: t, measured, late: LATE_S },
                   anim: { type: 'burn', sim: t, covered, late: late ? LATE_S : 0 } });
      }
      case 'peek': {
        if (!st.running) return no('');
        st.prev = st.running.prevBefore;
        st.running = null; st.jarOn = false; st.hot = false; st.lit = true;
        return R({ result: 'peek', cancel: true, say: 'You lifted the jar. Fresh air rushed in, and the flame grew again.' });
      }
      case 'blow':
        if (!st.lit || st.jarOn) return no('Blow on a lit candle with no jar on it.');
        st.lit = false;
        return R({ events: [{ kind: 'blow' }], say: 'Puff! Your breath cooled the small flame, and it went out.', anim: { type: 'blow' } });
      case 'reset':
        if (!_lift(st)) return no('There is no jar on the candle.');
        return R({ say: LIFT.trim() });
      case 'lift':
        if (!st.jarOn) return no('There is no jar on the candle.');
        if (st.hot) return R({ hazard: 'hot_jar', say: 'Ouch! The jar is hot.' });
        _lift(st);
        return R({ say: 'You lifted the cool jar off.' });
      case 'tap':
        if (!st.jarOn) return no('There is no jar on the candle.');
        st.jarOn = false; st.hot = false;
        return R({ hazard: 'crack', say: 'Crack! The hot glass broke.', anim: { type: 'crack' } });
      case 'push':
        st.glass = 'pushed';
        return R({ events: [{ kind: 'space', act: 'push' }], say: 'The water stayed low in the glass. The tissue is still dry!', anim: { type: 'push' } });
      case 'tilt':
        st.glass = 'tilted';
        return R({ events: [{ kind: 'space', act: 'tilt' }], say: 'Bubbles of air escaped. Water rushed in, and the tissue got wet.', anim: { type: 'tilt' } });
      case 'bottle':
        return R({ events: [{ kind: 'space', act: 'bottle' }], say: 'Bubbles came out of the "empty" bottle. It was full of air!', anim: { type: 'bottle' } });
      case 'fill':
        st.balloons = 'full';
        return R({ events: [{ kind: 'weight', act: 'fill' }], say: 'Both balloons are full. The stick hangs level.', anim: { type: 'fill' } });
      case 'letout':
        if (st.balloons !== 'full') return no('Blow up both balloons first.');
        st.balloons = 'one';
        return R({ events: [{ kind: 'weight', act: 'letout' }], say: 'The side with the full balloon went down. The air in it has weight!', anim: { type: 'letout' } });
      case 'fire': {
        const F = FIRES[v];
        if (!F) return no('');
        st.fire = v; st.fireOut = false; st.off = false;
        return R({ say: `The firefighter lit a ${F.name.toLowerCase()} ${F.where}. How will you put it out?`, anim: { type: 'ignite' } });
      }
      case 'method': {
        if (!st.fire || st.fireOut) return no('Ask the firefighter for a fire first.');
        const r = fireResult(st.fire, v, st.off);
        if (!r) return no('');
        const fire = st.fire;
        if (r.hazard) {
          st.fireOut = true;
          return R({ hazard: r.hazard, say: r.say, anim: { type: 'method', fire, method: v, hazard: true } });
        }
        if (r.off) st.off = true;
        if (r.out) st.fireOut = true;
        return R({ events: [{ kind: 'fire', fire, method: v, out: r.out, best: !!r.best, side: r.side, off: st.off }], say: r.say,
                   anim: { type: 'method', fire, method: v, out: r.out } });
      }
      case 'jartemp':
        if (v !== 'cold' && v !== 'warm') return no('');
        st.jartemp = v;
        return R({ say: v === 'cold' ? 'A cold, dry jar from the fridge.' : 'A warm jar, fresh from hot water.' });
      case 'hold': {
        if (!st.lit) return no('Ask the teacher to light the candle first.');
        const warm = st.jartemp === 'warm';
        return R({ events: [{ kind: 'prod', act: 'hold', warm }], result: warm ? 'warm_jar' : null,
                   say: warm ? 'No mist this time. The jar was too warm.' : 'Look! Tiny drops of water misted the inside of the cold jar.',
                   anim: { type: 'hold', warm } });
      }
      case 'lime':
        if (!st.lit) return no('Ask the teacher to light the candle first.');
        return R({ events: [{ kind: 'prod', act: 'lime' }], say: 'The limewater turned milky. The flame made carbon dioxide!', anim: { type: 'lime' } });
      case 'control':
        return R({ events: [{ kind: 'prod', act: 'control' }], say: 'In fresh air the limewater stayed clear. Air has too little carbon dioxide to show.', anim: { type: 'control' } });
    }
    return no('');
  }
  function settle(st) { st.running = null; }
  // A new set of tests (a mission starts, the notebook is cleared): there is
  // no earlier run to compare with, so nothing can be "not a fair test" yet.
  function newSeries(st) { st.prev = null; }

  // A guide step already true on the bench is skipped.
  function satisfied(st, tok) {
    const [k, v] = String(tok).split(':');
    switch (k) {
      case 'station': return st.station === v;
      case 'safety': return v === 'on' ? st.safety : !st.safety;
      case 'watch': return st.watch === 'ready';
      case 'jar': return st.jar === v && !st.jarOn;
      case 'candle': return st.candle === v && !st.jarOn;
      case 'light': return st.lit;
      case 'jartemp': return st.jartemp === v;
      case 'fill': return st.balloons === 'full';
      case 'fire': return st.fire === v && !st.fireOut;
    }
    return false;
  }

  // What a pupil is told to do for a token, and the button that does it.
  // `st` (optional) gives context: which jar, which fire.
  function stepText(tok, g, st) {
    const [k, v] = String(tok).split(':');
    const s = st || {};
    switch (k) {
      case 'station': { const S = station(v); return { say: `Choose ${S.name}.`, btn: `${S.icon} ${S.name}` }; }
      case 'safety': return { say: 'Tie your hair back and roll up your sleeves.', btn: '🎀 Tie hair back' };
      case 'watch': return { say: 'Get the stopwatch ready. It starts when the jar goes on.', btn: '⏱ Stopwatch ready' };
      case 'jar': return v === 'none'
        ? { say: g === 6 ? 'Pick "No jar". This is candle S.' : 'Pick "No jar".', btn: `🫙 ${jarName(v, g)}` }
        : { say: `Pick the ${JARS[v].size} jar.${g === 6 ? ` It is jar ${JARS[v].letter}.` : ''}`, btn: `🫙 ${jarName(v, g)}` };
      case 'candle': return { say: `Pick the ${CANDLES[v].name.toLowerCase()}.`, btn: `🕯️ ${CANDLES[v].name}` };
      case 'light': return { say: 'Ask the teacher to light the candle.', btn: '🧑‍🏫 Ask the teacher to light it' };
      case 'burn': return s.jar === 'none'
        ? { say: 'Start the stopwatch. Watch the open candle.', btn: '⏱ Time the open candle' }
        : { say: 'Put the jar over the candle. Watch the flame.', btn: '🫙 Put the jar on' };
      case 'blow': return { say: 'Blow gently on the flame.', btn: '💨 Blow it out' };
      case 'reset': return { say: 'Let the jar cool. The teacher lifts it off with a cloth.', btn: '⏳ Let it cool, then lift it' };
      case 'push': return { say: 'Push the glass straight down into the water.', btn: '⬇️ Push it straight down' };
      case 'tilt': return { say: 'Now tilt the glass under the water.', btn: '↘️ Tilt the glass' };
      case 'bottle': return { say: 'Squeeze the "empty" bottle under the water.', btn: '🧴 Squeeze the bottle' };
      case 'fill': return { say: 'Blow up both balloons to the same size.', btn: '🎈 Blow up both' };
      case 'letout': return { say: 'Let the air out of one balloon.', btn: '💨 Let the air out of one' };
      case 'fire': return { say: `Ask the firefighter for the ${FIRES[v].name.toLowerCase()}.`, btn: `${FIRES[v].icon} ${FIRES[v].name}` };
      case 'method': return { say: `Put it out: ${methodName(v, s.fire).toLowerCase()}.`, btn: `${METHODS[v].icon} ${methodName(v, s.fire)}` };
      case 'jartemp': return v === 'cold' ? { say: 'Use a cold, dry jar.', btn: '❄️ Cold jar' } : { say: 'Use a warm jar.', btn: '♨️ Warm jar' };
      case 'hold': return { say: 'Hold the jar upside down over the flame.', btn: '🫙 Hold the jar over the flame' };
      case 'lime': return { say: 'Pour limewater into the jar of gas and shake it.', btn: '🥛 Add limewater and shake' };
      case 'control': return { say: 'Now shake limewater in a jar of fresh air.', btn: '🌬️ Limewater in fresh air' };
    }
    return { say: '', btn: '' };
  }
  // Every step of a recipe, worded with the jar and fire it will have by then.
  function recipeTexts(tokens, g) {
    const s = { jar: 'small', fire: null };
    return tokens.map(t => {
      const [k, v] = t.split(':');
      if (k === 'jar') s.jar = v;
      if (k === 'fire') s.fire = v;
      return stepText(t, g, s);
    });
  }

  // ── Discoveries ────────────────────────────────
  // unlock: an event the bench emits must match every field given. `compare`
  // needs a fair, well-timed run and the last well-timed covered run (`prev`):
  //   jar    - same candle, another jar
  //   double - same candle, a jar with twice (or half) the air
  //   candle - same jar, the big candle after the small one
  //   open   - the open candle after a covered one
  const Dsc = (id, grades, icon, title, hint, how, unlock, saw, rule, learn) => ({ id, grades, icon, title, hint, how, unlock, saw, rule, learn });
  const JAR_RUN = (jar, candle) => [...(candle ? [`candle:${candle}`] : []), `jar:${jar}`, 'light', 'watch:ready', 'burn'];
  const SAFE = ['station:jars', 'safety:on'];
  const DISCOVERIES = [
    // Grade 4
    Dsc('flame_out', [4], '🕯️', 'A jar puts the flame out', 'Cover a lit candle with a jar',
      [...SAFE, ...JAR_RUN('medium')], { kind: 'run', covered: true },
      'The flame got smaller and smaller. Then it went out.',
      'no fresh air → the flame goes out',
      'A flame needs air. Under the jar it used up the oxygen it needs, so it went out.'),
    Dsc('small_jar', [4], '🥃', 'Out in a flash', 'Time the candle under the small jar',
      [...SAFE, ...JAR_RUN('small')], { kind: 'run', covered: true, jar: 'small', good: true },
      'Under the small jar the flame went out very quickly.',
      'small jar → little air → short flame',
      'A small jar holds only a little air, so there is only a little oxygen.'),
    Dsc('big_jar', [4], '🫙', 'The big jar wins', 'Time the candle under the large jar',
      [...SAFE, ...JAR_RUN('large')], { kind: 'run', covered: true, jar: 'large', good: true },
      'Under the large jar the flame burned for much longer.',
      'big jar → more air → longer flame',
      'A large jar holds more air, so the flame has more oxygen to use.'),
    Dsc('fair_test', [4], '⚖️', 'A fair test', 'Time two jar sizes with the same candle',
      [...SAFE, ...JAR_RUN('small', 'small'), ...JAR_RUN('large')], { kind: 'run', compare: 'jar' },
      'You kept the same candle and changed only the jar.',
      'change ONE thing, keep the rest the same',
      'Only the jar changed, so the jar made the difference. That is a fair test.'),
    Dsc('open_air', [4], '🌬️', 'No jar, no end', 'Time a candle with no jar on it',
      [...SAFE, ...JAR_RUN('none')], { kind: 'run', covered: false, good: true },
      'With no jar, the candle kept on burning.',
      'fresh air all the time → the flame keeps burning',
      'An open candle has fresh air all the time. It only stops when the wax runs out.'),
    Dsc('big_candle', [4], '🔥', 'Big flame, short time', 'Try a big candle under the same jar',
      [...SAFE, ...JAR_RUN('medium', 'small'), ...JAR_RUN('medium', 'big')], { kind: 'run', compare: 'candle' },
      'Under the same jar, the big candle went out sooner.',
      'bigger flame → uses the oxygen faster',
      'A big flame uses up the oxygen faster, so it goes out sooner.'),
    Dsc('blow_out', [4], '💨', 'One puff', 'Blow out a lit candle',
      ['station:jars', 'safety:on', 'light', 'blow'], { kind: 'blow' },
      'One gentle puff and the small flame went out.',
      'a puff cools a small flame',
      'Your breath cools a small flame, so it cannot keep burning. (Ask an adult first.)'),
    Dsc('space_dry', [4], '🧻', 'The dry tissue', 'Push a glass with a tissue into water',
      ['station:space', 'push'], { kind: 'space', act: 'push' },
      'The glass went under the water, but the tissue stayed dry.',
      'air takes up space',
      'The "empty" glass was full of air. The air kept the water out.'),
    Dsc('space_bubbles', [4], '🫧', 'Air escapes', 'Tilt the glass under the water',
      ['station:space', 'tilt'], { kind: 'space', act: 'tilt' },
      'Bubbles of air came out. Then water came in and wet the tissue.',
      'air out → water in',
      'When the air left, the water could take its place.'),
    Dsc('bottle_bubbles', [4], '🧴', 'Not so empty', 'Squeeze an "empty" bottle under water',
      ['station:space', 'bottle'], { kind: 'space', act: 'bottle' },
      'A stream of bubbles came out of the bottle.',
      '"empty" things are full of air',
      'An "empty" bottle is full of air. Squeezing it pushes the air out.'),
    Dsc('weight_level', [4], '🎈', 'Level start', 'Blow up both balloons on the balance',
      ['station:weight', 'fill'], { kind: 'weight', act: 'fill' },
      'Two full balloons, and the stick hung level.',
      'same air each side → level',
      'Start level. Then any change you see comes from the air.'),
    Dsc('weight_heavy', [4], '⚖️', 'Air has weight', 'Let the air out of one balloon',
      ['station:weight', 'fill', 'letout'], { kind: 'weight', act: 'letout' },
      'The side with the full balloon went down.',
      'air has weight',
      'The full balloon is heavier because the air inside it has weight.'),
    // Grade 6
    Dsc('oxygen_left', [6], '🫧', 'Not all the oxygen', 'Watch the oxygen reading under a jar',
      [...SAFE, ...JAR_RUN('large')], { kind: 'run', covered: true, good: true },
      'The oxygen fell from 21% to about 16%. Then the flame went out.',
      'the flame dies at about 16% oxygen',
      'A flame needs enough oxygen. When too little is left, it goes out.'),
    Dsc('double_time', [6], '✖️', 'Twice the air, twice the time', 'Time jar Q, then jar R, with one candle',
      [...SAFE, ...JAR_RUN('medium', 'small'), ...JAR_RUN('large')], { kind: 'run', compare: 'double' },
      'Jar R holds twice as much air as jar Q. Its flame burned about twice as long.',
      'burning time grows with the amount of air',
      'Twice the air means twice the oxygen, so the flame lasts about twice as long.'),
    Dsc('candle_s', [6], '🏁', 'Candle S lasts longest', 'Time a covered candle, then candle S',
      [...SAFE, ...JAR_RUN('small', 'small'), ...JAR_RUN('none')], { kind: 'run', compare: 'open' },
      'The covered candle went out. Candle S, with no jar, was still burning.',
      'no jar → unlimited oxygen → longest flame',
      'This is the PSAC 2021 question: the uncovered candle burns longest.'),
    Dsc('triangle_heat', [6], '💧', 'Take away the heat', 'Throw water on the wood fire',
      ['station:fire', 'fire:wood', 'method:water'], { kind: 'fire', fire: 'wood', method: 'water', out: true },
      'The water hissed and cooled the wood. The fire went out.',
      'water → removes HEAT',
      'Water cools the fuel. Without enough heat, it cannot burn.'),
    Dsc('triangle_oxygen', [6], '🟫', 'Take away the oxygen', 'Smother the wood fire',
      ['station:fire', 'fire:wood', 'method:blanket'], { kind: 'fire', fire: 'wood', method: 'blanket', out: true },
      'The blanket covered the fire, and it went out.',
      'cover it → removes OXYGEN',
      'A blanket, a lid or sand stops fresh air reaching the fire.'),
    Dsc('triangle_fuel', [6], '🪵', 'Take away the fuel', 'Rake the wood away from the fire',
      ['station:fire', 'fire:wood', 'method:fueloff'], { kind: 'fire', fire: 'wood', method: 'fueloff', out: true },
      'With the unburnt wood raked away, the fire died down.',
      'no fuel → no fire',
      'Firefighters clear strips of land called firebreaks, so a fire runs out of fuel.'),
    Dsc('co2_ext', [6], '🧯', 'The carbon dioxide extinguisher', 'Use the CO₂ extinguisher on the wood fire',
      ['station:fire', 'fire:wood', 'method:co2'], { kind: 'fire', method: 'co2', out: true },
      'A white cloud of carbon dioxide covered the fire, and it went out.',
      'CO₂ pushes the air away → removes OXYGEN',
      'Carbon dioxide does not burn and is heavier than air. PSAC 2019, 2021 and 2022 ask about it.'),
    Dsc('oil_lid', [6], '🍳', 'Smother the pan', 'Put out the pan of oil the safe way',
      ['station:fire', 'fire:oil', 'method:blanket'], { kind: 'fire', fire: 'oil', method: 'blanket', out: true },
      'The fire blanket covered the pan, and the flames went out.',
      'burning oil → cover it, never water',
      'Covering the pan cuts off the oxygen. Water would throw burning oil everywhere.'),
    Dsc('elec_off', [6], '🔌', 'Power off first', 'Switch off, then put out the electrical fire',
      ['station:fire', 'fire:elec', 'method:fueloff', 'method:co2'], { kind: 'fire', fire: 'elec', method: 'co2', out: true, off: true },
      'The power went off first. Then the carbon dioxide put the fire out.',
      'electrical fire → power off, then CO₂',
      'Switching off stops the heating. Carbon dioxide does not carry electricity.'),
    Dsc('water_made', [6], '💦', 'Burning makes water', 'Hold a cold jar over the flame',
      ['station:products', 'safety:on', 'jartemp:cold', 'light', 'hold'], { kind: 'prod', act: 'hold', warm: false },
      'Tiny drops of water misted the inside of the cold jar.',
      'candle wax + oxygen → carbon dioxide + water',
      'Burning wax makes water vapour. It turns to drops on the cold glass.'),
    Dsc('co2_made', [6], '🥛', 'Burning makes carbon dioxide', 'Test the gas from the flame with limewater',
      ['station:products', 'safety:on', 'light', 'lime'], { kind: 'prod', act: 'lime' },
      'The clear limewater turned milky.',
      'carbon dioxide turns limewater milky',
      'Limewater is the test for carbon dioxide. The flame made plenty of it.'),
    Dsc('control_clear', [6], '🌬️', 'The control jar', 'Test limewater in fresh air',
      ['station:products', 'control'], { kind: 'prod', act: 'control' },
      'In a jar of fresh air, the limewater stayed clear.',
      'a control: the same test without the flame',
      'Fresh air has only 0.03% carbon dioxide. So the flame made the difference.'),
  ];

  // Does this bench event unlock this discovery?
  function unlocks(u, ev) {
    if (!u || !ev || u.kind !== ev.kind) return false;
    for (const f of ['covered', 'jar', 'candle', 'act', 'fire', 'method', 'out', 'off', 'warm']) {
      if (f in u && u[f] !== ev[f]) return false;
    }
    if (u.good && !ev.good) return false;
    if (u.compare) {
      const p = ev.prev;
      if (!ev.good || !ev.fair || !p) return false;
      if (u.compare === 'jar') return ev.covered && p.candle === ev.candle && p.jar !== ev.jar;
      if (u.compare === 'double') {
        const a = JARS[p.jar].ml, b = JARS[ev.jar].ml;
        return ev.covered && p.candle === ev.candle && !!a && !!b && (a === 2 * b || b === 2 * a);
      }
      if (u.compare === 'candle') return ev.covered && p.jar === ev.jar && p.candle === 'small' && ev.candle === 'big';
      if (u.compare === 'open') return !ev.covered;
      return false;
    }
    return true;
  }

  // ── Hazards: mistakes that stop the experiment ─
  const HAZARDS = {
    hair: {
      signs: ['hot', 'warning'], fx: 'flare', grades: [4, 6],
      title: () => 'Stop! Tie your hair back',
      happened: () => 'The teacher came to light the candle. Your hair was loose and your sleeves were down.',
      why: 'Loose hair and floppy sleeves can swing into a flame. They catch fire very fast.',
      instead: 'Tie long hair back and roll up your sleeves. Only an adult lights the candle.',
      exam: 'Exam tip: near a flame, tie long hair back. Never leave a flame alone.',
      after: 'Tap 🎀 to tie your hair back. Then ask the teacher again.',
    },
    hot_jar: {
      signs: ['hot'], fx: null, grades: [4, 6],
      title: () => 'Ouch! The jar is hot',
      happened: () => 'You grabbed the jar with your bare hand, just after the flame went out.',
      why: 'The flame heated the glass. A hot jar can burn your fingers.',
      instead: 'Wait a few minutes for the jar to cool. Then ask an adult to lift it with a cloth.',
      exam: 'Exam tip: after a candle experiment the jar is hot. Let it cool before anyone touches it.',
      after: 'Tap "Let it cool, then lift it". The teacher will use a cloth.',
    },
    crack: {
      signs: ['sharp', 'hot'], fx: 'crack', grades: [4, 6],
      title: () => 'Crack! The hot jar broke',
      happened: () => 'You held the hot jar under the cold tap. The glass cracked into sharp pieces.',
      why: 'Hot glass can crack when cold water hits it suddenly. Broken glass can cut you badly.',
      instead: 'Let hot glass cool slowly in the air. If glass breaks, keep away and tell an adult.',
      exam: 'Exam tip: a safety precaution with glass - never cool hot glass quickly with cold water.',
      after: 'The teacher swept up the glass and put out a new jar.',
    },
    oil_water: {
      signs: ['flammable', 'hot'], fx: 'fireball', grades: [6],
      title: () => 'Whoosh! Never throw water on burning oil',
      happened: () => 'You threw water on the burning pan of oil. A huge ball of fire shot up.',
      why: 'The water sinks under the hot oil and boils at once. The steam throws burning oil everywhere.',
      instead: 'An adult turns off the heat and slides a lid or fire blanket over the pan. Then leave it covered.',
      exam: 'Exam tip: covering a fire removes the oxygen - one side of the fire triangle.',
      after: 'The firefighter smothered it with a fire blanket. Everyone is safe.',
    },
    elec_water: {
      signs: ['electric'], fx: 'zap', grades: [6],
      title: () => 'Stop! Never use water on an electrical fire',
      happened: () => 'You aimed water at the burning plug. Water carries electricity, so the shock could reach you.',
      why: 'Water conducts electricity. An electric shock from the mains can kill.',
      instead: 'An adult switches off the power first. Then they use a carbon dioxide extinguisher.',
      exam: 'Exam tip: a carbon dioxide extinguisher is safe on electrical fires. It does not conduct electricity.',
      after: 'The firefighter switched off the power and put the fire out.',
    },
  };

  // ── Wrong but safe ─────────────────────────────
  const RESULTS = {
    unfair: {
      icon: '⚖️', grades: [4, 6],
      title: () => 'Not a fair test',
      happened: c => `You changed the jar AND the candle. The ${c.jar} with the ${c.candle} took ${c.time} seconds.`,
      instead: 'Change only one thing at a time. Keep the same candle, and change only the jar.',
      exam: 'Exam tip: in a fair test you change one thing and keep everything else the same.',
    },
    late: {
      icon: '⏱️', grades: [4, 6],
      title: () => 'You started timing late',
      happened: c => `The stopwatch was not ready. It started ${c.late} seconds late, so it showed ${c.measured} s, not ${c.time} s.`,
      instead: 'Get the stopwatch ready first. It must start the moment the jar touches the table.',
      exam: 'Exam tip: start timing at the same moment every time, or the results cannot be compared.',
    },
    peek: {
      icon: '👀', grades: [4, 6],
      title: () => 'You lifted the jar',
      happened: () => 'You lifted the jar a little to look. Fresh air rushed in, and the flame grew again.',
      instead: 'Keep the jar still on the table until the flame goes out. Watch through the glass.',
      exam: 'Exam tip: the jar must trap the air. Letting fresh air in spoils the result.',
    },
    warm_jar: {
      icon: '🌡️', grades: [6],
      title: () => 'The jar was warm',
      happened: () => 'You held a warm jar over the flame. No mist appeared, so you could not see the water.',
      instead: 'Use a cold, dry jar. Water vapour only turns into drops on something cold.',
      exam: 'Exam tip: water vapour condenses on a cold surface. That is how you show a flame makes water.',
    },
  };

  // ── Facts for the 💡 button ────────────────────
  const F = (grades, t) => ({ grades, t });
  const FACTS = [
    F([4, 6], 'Air is all around us. You cannot see it, smell it or taste it.'),
    F([4], 'Air takes up space. That is why a balloon gets bigger when you blow into it.'),
    F([4], 'Air has weight. One litre of air weighs about 1.2 grams.'),
    F([4, 6], 'Oxygen is the part of the air that we breathe. A flame needs it too.'),
    F([4, 6], 'Only an adult should light a candle or a match.'),
    F([4, 6], 'Never leave a candle burning on its own. An adult puts it out first.'),
    F([4], 'Wind is moving air. You can feel it, but you cannot see it.'),
    F([4, 6], 'About one-fifth of the air is oxygen. Most of the rest is nitrogen.'),
    F([4], 'Divers carry air in tanks on their backs, so they can breathe under water.'),
    F([4], 'A bicycle tyre is full of air. The air holds the bike up.'),
    F([6], 'Dry air is 78.1% nitrogen, 21% oxygen and 0.03% carbon dioxide.'),
    F([6], 'A fire needs fuel, heat and oxygen. This is called the fire triangle.'),
    F([6], 'Carbon dioxide does not burn and is heavier than air. It is used in fire extinguishers.'),
    F([6], 'Limewater turns milky when carbon dioxide bubbles through it.'),
    F([6], 'In Mauritius, call the fire service on 115.'),
    F([6], 'Firefighters clear strips of land called firebreaks. A fire stops when it runs out of fuel.'),
    F([6], 'Your body uses oxygen too. You breathe out more carbon dioxide than you breathe in.'),
    F([6], 'Never throw water on burning oil or on an electrical fire.'),
  ];

  // ── Missions ───────────────────────────────────
  // A req key comes from keyOf(event). `run:<jar>` reqs must all be met with
  // the SAME candle - that is what makes the comparison fair.
  // A question's FIRST option is the answer; Labs.quiz shuffles them.
  const MISSIONS = [
    {
      id: 'jar_race', grades: [4], icon: '🏁', title: 'Jar race', station: 'jars',
      blurb: 'Time one candle under a small, a medium and a large jar.',
      intro: 'Jar race! Time the same candle under all three jars. Get the stopwatch ready each time.',
      reqs: [{ label: 'Time the small jar', key: 'run:small' }, { label: 'Time the medium jar', key: 'run:medium' },
             { label: 'Time the large jar', key: 'run:large' }],
      quiz: [
        { q: 'A candle burns under a small jar and under a large jar. Which goes out first?',
          options: ['The candle under the small jar', 'The candle under the large jar', 'They go out together', 'Neither of them goes out'],
          why: 'The small jar holds less air, so there is less oxygen for the flame.' },
        { q: 'Why does the flame go out under the jar?',
          options: ['It used up the oxygen it needs', 'The jar blew the flame out', 'The glass was too cold', 'Candles only burn for one minute'],
          why: 'A flame needs oxygen from the air. The jar stops fresh air getting in.' },
        { q: 'Which gas in the air does a flame need?',
          options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Water vapour'],
          why: 'Burning needs oxygen. We need oxygen to breathe, too.' },
        { q: 'In the jar race, what must stay the same every time?',
          options: ['The candle', 'The size of the jar', 'The time on the stopwatch', 'The number of jars'],
          why: 'Only the jar changes. Keeping the same candle makes it a fair test.' },
        { q: 'Who should light the candle?',
          options: ['An adult', 'You, with a match', 'A friend', 'Nobody - it lights itself'],
          why: 'Flames can burn. Always ask an adult to light a candle.' },
      ],
    },
    {
      id: 'air_there', grades: [4], icon: '🔎', title: 'Air is really there', station: 'space',
      blurb: 'Prove that air takes up space and has weight.',
      intro: 'Air is really there! Do all three glass-in-water tests. Then use the balloon balance.',
      reqs: [{ label: 'Push the glass straight down', key: 'space:push' }, { label: 'Tilt the glass', key: 'space:tilt' },
             { label: 'Squeeze the bottle', key: 'space:bottle' }, { label: 'Let the air out of one balloon', key: 'weight:letout' }],
      quiz: [
        { q: 'A tissue is in a glass. You push the glass upside down into water. Why does the tissue stay dry?',
          options: ['The air in the glass takes up the space', 'Tissue can never get wet', 'The water is too cold', 'The glass is magic'],
          why: 'The glass was full of air. The air kept the water out.' },
        { q: 'You squeeze an "empty" bottle under water. What comes out?',
          options: ['Bubbles of air', 'Nothing at all', 'Drops of oil', 'Sand'],
          why: 'The bottle was full of air. Squeezing it pushed the air out as bubbles.' },
        { q: 'A full balloon and an empty balloon hang on a balance. Which side goes down?',
          options: ['The full balloon', 'The empty balloon', 'Neither - it stays level', 'Both sides go up'],
          why: 'The full balloon holds more air, and air has weight.' },
        { q: 'What does the balloon balance show?',
          options: ['Air has weight', 'Air has a colour', 'Air is a liquid', 'Air is nothing at all'],
          why: 'The side with more air went down, so air must weigh something.' },
        { q: 'Which sentence about air is TRUE?',
          options: ['It has no colour, but it takes up space', 'You can see air easily', 'Air has no weight at all', 'Air is only found outside'],
          why: 'Air is colourless, but it is real: it takes up space and has weight.' },
      ],
    },
    {
      id: 'pqrs', grades: [6], icon: '🏁', title: 'Candles P, Q, R and S', station: 'jars',
      blurb: 'The PSAC 2021 question, for real. Which candle burns longest?',
      intro: 'Candles P, Q, R and S! Time one candle under jars P, Q and R, and with no jar.',
      reqs: [{ label: 'Time candle P (small jar)', key: 'run:small' }, { label: 'Time candle Q (medium jar)', key: 'run:medium' },
             { label: 'Time candle R (large jar)', key: 'run:large' }, { label: 'Time candle S (no jar)', key: 'run:none' }],
      quiz: [
        { q: 'Candles P, Q and R are under jars of different sizes. Candle S has no jar. Which burns longest?',
          options: ['Candle S, with no jar', 'The candle under the smallest jar', 'The candle under the largest jar', 'They all burn for the same time'],
          why: 'Candle S has fresh air all the time, so it never runs short of oxygen. (PSAC 2021)' },
        { q: 'Which gas in the air is needed for burning?',
          options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Water vapour'],
          why: 'Oxygen supports burning. Carbon dioxide puts fires out. (PSAC 2024 Q1)' },
        { q: 'About how much of dry air is oxygen?',
          options: ['21%', '78%', '0.03%', '50%'],
          why: 'Dry air is 78.1% nitrogen, 21% oxygen and 0.03% carbon dioxide.' },
        { q: 'In this experiment, which ONE thing did you change?',
          options: ['The size of the jar', 'The candle', 'The stopwatch', 'The table'],
          why: 'Only the jar changed. The candle stayed the same, so the test was fair.' },
        { q: 'The flame under a jar has just gone out. What is true about the air inside?',
          options: ['It has less oxygen and more carbon dioxide', 'It has no gas left at all', 'It is now pure oxygen', 'It is exactly the same as before'],
          why: 'The flame used some oxygen and made carbon dioxide. It went out at about 16% oxygen.' },
      ],
    },
    {
      id: 'fire_officer', grades: [6], icon: '👩‍🚒', title: 'Fire safety officer', station: 'fire',
      blurb: 'Put out a wood fire, a pan of oil and an electrical fire - the right way.',
      intro: 'Fire safety officer! Put out all three fires the way a firefighter would.',
      reqs: [{ label: 'Put out the wood fire', key: 'fire:wood' }, { label: 'Put out the pan of oil safely', key: 'fire:oil' },
             { label: 'Put out the electrical fire safely', key: 'fire:elec' }],
      quiz: [
        { q: 'What three things does a fire need?',
          options: ['Fuel, heat and oxygen', 'Fuel, water and smoke', 'Carbon dioxide, heat and fuel', 'Nitrogen, oxygen and heat'],
          why: 'These are the three sides of the fire triangle. Remove one and the fire goes out.' },
        { q: 'A fire blanket is thrown over a fire. Which side of the fire triangle does it remove?',
          options: ['Oxygen', 'Heat', 'Fuel', 'Nitrogen'],
          why: 'The blanket stops fresh air reaching the fire, so it has no oxygen.' },
        { q: 'Why must you never throw water on a burning pan of oil?',
          options: ['The water boils at once and throws burning oil out', 'Water makes the oil turn into ice', 'Water is too heavy for the pan', 'The oil will turn into water'],
          why: 'The water sinks, boils into steam at once, and blasts burning oil everywhere.' },
        { q: 'Once the power is off, what is safe to use on an electrical fire?',
          options: ['A carbon dioxide extinguisher', 'A bucket of water', 'A garden hose', 'A wet towel'],
          why: 'Carbon dioxide does not conduct electricity. Water does.' },
        { q: 'Which gas is used in fire extinguishers?',
          options: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Water vapour'],
          why: 'Carbon dioxide does not burn and pushes the air away. (PSAC 2019, 2021 and 2022)' },
      ],
    },
    {
      id: 'burn_makes', grades: [6], icon: '🫙', title: 'What does burning make?', station: 'products',
      blurb: 'Find the two things a candle flame makes.',
      intro: 'What does burning make? Look for the mist, test with limewater, and do a control.',
      reqs: [{ label: 'See the mist on a cold jar', key: 'prod:hold' }, { label: 'Test the flame gas with limewater', key: 'prod:lime' },
             { label: 'Test fresh air with limewater', key: 'prod:control' }],
      quiz: [
        { q: 'A cold jar held over a candle turns misty inside. What is the mist?',
          options: ['Water', 'Smoke', 'Wax', 'Oxygen'],
          why: 'Burning makes water vapour. It condenses into drops on the cold glass.' },
        { q: 'Limewater turns milky. Which gas is there?',
          options: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Water vapour'],
          why: 'Limewater is the test for carbon dioxide.' },
        { q: 'Why test limewater in a jar of fresh air too?',
          options: ['To compare - so we know the flame made the difference', 'To make the limewater colder', 'To use up the limewater faster', 'Because fresh air turns limewater milky'],
          why: 'A control is the same test without the flame. It stayed clear.' },
        { q: 'Which two things does a burning candle make?',
          options: ['Carbon dioxide and water', 'Oxygen and nitrogen', 'Oxygen and water', 'Nitrogen and smoke'],
          why: 'Candle wax burns in oxygen to make carbon dioxide and water.' },
        { q: 'Why must the jar be cold to see the water?',
          options: ['Water vapour turns to drops on something cold', 'Cold glass makes the flame bigger', 'Warm glass soaks up the water', 'Cold jars hold more oxygen'],
          why: 'Water vapour condenses on a cold surface. On a warm jar it stays a gas.' },
      ],
    },
  ];

  // The mission key a bench event earns, or null.
  function keyOf(ev) {
    if (!ev) return null;
    if (ev.kind === 'run') return ev.good ? `run:${ev.jar}:${ev.candle}` : null;
    if (ev.kind === 'space' || ev.kind === 'weight') return `${ev.kind}:${ev.act}`;
    if (ev.kind === 'fire') return ev.out && ev.best && (ev.fire !== 'elec' || ev.off) ? `fire:${ev.fire}` : null;
    if (ev.kind === 'prod') return ev.act === 'hold' && ev.warm ? null : `prod:${ev.act}`;
    return null;
  }
  function missionProgress(M, keys) {
    const has = k => keys.has(k);
    const runReqs = M.reqs.filter(r => r.key.startsWith('run:'));
    let candle = 'small';
    if (runReqs.length) {
      let best = -1;
      Object.keys(CANDLES).forEach(c => { const n = runReqs.filter(r => has(`${r.key}:${c}`)).length; if (n > best) { best = n; candle = c; } });
    }
    const rows = M.reqs.map(r => ({ label: r.label, done: r.key.startsWith('run:') ? has(`${r.key}:${candle}`) : has(r.key) }));
    return { rows, done: rows.every(r => r.done), candle };
  }

  // ── Guided experiments ─────────────────────────
  const G = (id, grades, icon, title, blurb, lesson, steps) => ({ id, grades, icon, title, blurb, lesson, steps });
  const GUIDES = [
    G('jars', [4], '🕯️', 'Candle under a jar', 'What happens to a flame under a jar?',
      'The flame went out under each jar - sooner under the small jar. A flame needs the oxygen in the air.',
      [...SAFE, ...JAR_RUN('small', 'small'), ...JAR_RUN('large')]),
    G('space', [4], '🥛', 'Is the glass empty?', 'Push a glass into water. Does the tissue get wet?',
      'The tissue stayed dry because air filled the glass. When the air bubbled out, water came in. Air takes up space.',
      ['station:space', 'push', 'tilt', 'bottle']),
    G('weight', [4], '🎈', 'Balloon balance', 'Does air weigh anything?',
      'With both balloons full, the stick was level. Let the air out of one, and the full side went down. Air has weight.',
      ['station:weight', 'fill', 'letout']),
    G('candles', [4], '🔥', 'Big flame, small flame', 'A big candle, a small candle - and one puff.',
      'The big candle went out sooner: a bigger flame uses the oxygen faster. A puff cools a small flame, so it goes out.',
      [...SAFE, ...JAR_RUN('medium', 'small'), ...JAR_RUN('medium', 'big'), 'jar:none', 'light', 'blow']),
    G('pqrs', [6], '🏁', 'Candles P, Q, R and S', 'The PSAC four-candle question, for real.',
      'P went out first and R last. S, with no jar, kept burning. More air means more oxygen, so a longer flame.',
      [...SAFE, ...JAR_RUN('small', 'small'), ...JAR_RUN('medium'), ...JAR_RUN('large'), ...JAR_RUN('none')]),
    G('triangle', [6], '🔺', 'The fire triangle', 'Put out a wood fire three different ways.',
      'Water took away the heat. The blanket took away the oxygen. Raking the wood away took away the fuel.',
      ['station:fire', 'fire:wood', 'method:water', 'fire:wood', 'method:blanket', 'fire:wood', 'method:fueloff']),
    G('danger', [6], '🧯', 'Oil and electrical fires', 'Two fires where water is the wrong answer.',
      'A fire blanket smothers burning oil. For an electrical fire, switch off the power, then use carbon dioxide.',
      ['station:fire', 'fire:oil', 'method:blanket', 'fire:elec', 'method:fueloff', 'method:co2']),
    G('products', [6], '🫙', 'What does burning make?', 'Find the two things a flame makes.',
      'The cold jar misted up: burning makes water. The limewater turned milky: burning makes carbon dioxide.',
      ['station:products', 'safety:on', 'jartemp:cold', 'light', 'hold', 'lime', 'control']),
  ];

  return { GRADES, STATIONS, JARS, JAR_ORDER, CANDLES, SECONDS_PER_LITRE, UNCOVERED_CAP, LATE_S, SPEED, O2_AIR, O2_OUT, AIR,
           FIRES, METHODS, FUEL_OFF, DISCOVERIES, HAZARDS, RESULTS, FACTS, MISSIONS, GUIDES, TOK_STATION,
           forGrade, station, burnTime, o2At, jarName, methodName, fireResult, newState, apply, settle, newSeries, satisfied,
           stepText, recipeTexts, unlocks, keyOf, missionProgress };
})();
if (typeof window !== 'undefined') window.LabAirData = LabAirData;
