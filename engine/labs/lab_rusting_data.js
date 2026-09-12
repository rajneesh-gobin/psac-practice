'use strict';
// ══════════════════════════════════════════════
//  Science Labs - the science behind the Rusting Lab (PSAC Grade 6).
//
//  ⚠ THE SCIENCE LIVES HERE, NOT IN THE ANIMATION. How fast each nail rusts,
//    on which day rust can first be seen, what each set-up teaches, every
//    hazard, card, fact, guide, discovery and quiz question comes from this
//    file. lab_rusting.js only moves time along and draws it.
//  ⚠ Grounded in grade6-science chapter g6-materials, subsection `rusting`
//    ("Rusting of iron: what is rust, conditions needed (water + air/oxygen),
//    how to prevent rusting (painting, galvanising, greasing)") and in the
//    PSAC 2024 paper, Q4, Diagram 6 (questions/past_paper_2024.js,
//    g6sc-pp24-013/014): tube A holds oil over water, tube B water, tube C
//    dry air under a cork. "Which pin will change colour?" - Pin B only.
//    The lab keeps the PAPER\'s letters, so its answer is the paper\'s answer.
//  ⚠ Primary lab (docs/labs/LAB_SPEC.md §8): every guide, mission and
//    discovery carries `grades`, and every sentence is written for a
//    9-11-year-old. scripts/test-labs-rusting-data.js checks both.
//
//  The model (the one the syllabus teaches): a nail rusts only where it
//  meets BOTH water and air (oxygen). rust(days) = min(cap, rate × days), as a
//  share of the nail\'s surface; rust can be seen from 5 %.
//    tap water, open to the air       0.15 a day   (covered by day 7)
//    salt water, open to the air      0.30 a day   (twice as fast)
//    boiled water, no oil             0.08 a day   (air mixes back in slowly)
//    unboiled water under oil         0.04 a day, stops at 12 % (its air runs out)
//    "dry" air that was not kept dry  0.03 a day, stops at 15 % (water vapour)
//    boiled water under oil; dry air with a drying agent AND a cork; a nail
//    that is painted, greased, plastic-coated or galvanised: no rust at all.
//    Painted but scratched: only the scratch rusts, at most 15 % of the nail.
//  The rates are illustrative - real ones depend on the nail and the weather.
//  The ORDER and the zeros are the science, and the data test checks them.
// ══════════════════════════════════════════════
const LabRustingData = (() => {
  const GRADES = [6];
  const DAYS = 7;
  const HOUR = 1 / 24;
  const VISIBLE = 0.05;        // rust shows as orange-brown spots from here
  const FLAKY = 0.2;           // enough rust to flake off under the tweezers
  const SCRATCH_CAP = 0.15;    // a scratch is a small part of the nail
  const TUBES = ['A', 'B', 'C', 'D'];
  const JARS = ['1', '2', '3', '4', '5'];

  const WATERS = {
    none:   { name: 'Nothing (just air)', short: 'Air', meta: 'No water at all' },
    boiled: { name: 'Boiled water', short: 'Boiled water', meta: 'Boiled, then cooled. The air is driven out.' },
    tap:    { name: 'Tap water', short: 'Tap water', meta: 'Ordinary water, with air mixed in' },
    salt:   { name: 'Salt water', short: 'Salt water', meta: 'Tap water with salt, like the sea' },
  };
  const JAR_WATERS = {
    tap:  { name: 'Tap water', icon: '💧' },
    salt: { name: 'Salt water', icon: '🧂' },
  };
  const COATS = {
    none:      { name: 'Bare nail', short: 'Bare', icon: '🔩', meta: 'Nothing on it', protect: false, color: '#8E979E' },
    paint:     { name: 'Painted', short: 'Paint', icon: '🎨', meta: 'A coat of paint', protect: true, color: '#2F6FD0' },
    grease:    { name: 'Greased', short: 'Grease', icon: '🚲', meta: 'Covered in grease', protect: true, color: '#3C3A2E' },
    plastic:   { name: 'Plastic-coated', short: 'Plastic', icon: '🧴', meta: 'A plastic skin', protect: true, color: '#2F9E5B' },
    zinc:      { name: 'Galvanised', short: 'Zinc', icon: '🏠', meta: 'Coated with zinc', protect: true, color: '#BCC6CC' },
    scratched: { name: 'Painted, then scratched', short: 'Scratched', icon: '🩹', meta: 'The scratch shows bare iron', protect: false, color: '#2F6FD0' },
  };
  const RATES = {
    none:   { rate: 0,    cap: 0 },
    fast:   { rate: 0.30, cap: 1 },
    normal: { rate: 0.15, cap: 1 },
    slow:   { rate: 0.08, cap: 1 },
    little: { rate: 0.04, cap: 0.12 },
    damp:   { rate: 0.03, cap: 0.15 },
  };

  const blankTube = () => ({ water: 'none', oil: false, dryer: false, cork: false, coat: 'none' });
  const blankJar = () => ({ water: 'tap', oil: false, dryer: false, cork: false, coat: 'none' });
  function newItems(rig) {
    const out = {};
    (rig === 'tubes' ? TUBES : JARS).forEach(id => { out[id] = rig === 'tubes' ? blankTube() : blankJar(); });
    return out;
  }
  // A tube is in the experiment once something has been put in it. Every jar is.
  const isOn = s => s.water !== 'none' || !!s.oil || !!s.dryer || !!s.cork;
  function activeItems(rig, items) {
    return Object.keys(items).filter(id => rig === 'coats' || isOn(items[id])).map(id => ({ id, s: items[id] }));
  }

  // What reaches the nail: 'yes' | 'no' | 'little'.
  function conditions(s) {
    let water, air;
    if (s.water === 'none') { water = (s.dryer && s.cork) ? 'no' : 'little'; air = 'yes'; }
    else {
      water = 'yes';
      air = s.oil ? (s.water === 'boiled' ? 'no' : 'little') : 'yes';
    }
    return { water, air };
  }

  function outcome(s) {
    const coat = s.coat || 'none';
    if (COATS[coat].protect) return { key: 'coated', rate: 0, cap: 0, where: 'none' };
    const c = conditions(s);
    let key;
    if (c.water === 'no' || c.air === 'no') key = 'none';
    else if (c.water === 'little') key = 'damp';
    else if (c.air === 'little') key = 'little';
    else if (s.water === 'boiled') key = 'slow';
    else if (s.water === 'salt') key = 'fast';
    else key = 'normal';
    const r = RATES[key];
    if (coat === 'scratched' && r.rate > 0) return { key: 'scratch', rate: r.rate, cap: Math.min(r.cap, SCRATCH_CAP), where: 'scratch' };
    return { key, rate: r.rate, cap: r.cap, where: r.rate > 0 ? 'all' : 'none' };
  }
  // Share of the nail covered in rust after `days` (may be a fraction of a day).
  function rustAt(s, days) {
    const o = outcome(s);
    return Math.round(Math.min(o.cap, o.rate * Math.max(0, days)) * 1000) / 1000;
  }
  const visible = (s, days) => rustAt(s, days) >= VISIBLE;

  // Which job a tube is doing in the three-tube experiment.
  function role(s) {
    if (s.water === 'boiled' && s.oil) return 'no_air';
    if (s.water === 'none' && s.dryer && s.cork) return 'dry';
    if (s.water === 'tap' && !s.oil) return 'water_air';
    if (s.water === 'salt' && !s.oil) return 'salt_air';
    return isOn(s) ? 'other' : 'empty';
  }

  // ── Words ──────────────────────────────────────
  function seen(s, days) {
    const f = rustAt(s, days);
    if (f < VISIBLE) return 'Still shiny. No rust you can see.';
    if (outcome(s).where === 'scratch') return 'Rust along the scratch only. The paint around it is fine.';
    if (f < 0.2) return 'A few orange-brown spots of rust.';
    if (f < 0.5) return 'Orange-brown rust in patches.';
    if (f < 0.95) return 'Lots of rust. Some flakes in the water.';
    return 'Covered in rust. Flakes have fallen off.';
  }
  function short(s, days) {
    const f = rustAt(s, days);
    if (f < VISIBLE) return 'No rust';
    if (outcome(s).where === 'scratch') return 'Rust at the scratch';
    if (f < 0.2) return 'A few rust spots';
    if (f < 0.5) return 'Some rust';
    if (f < 0.95) return 'Lots of rust';
    return 'Covered in rust';
  }
  function setupWords(rig, s) {
    if (rig === 'coats') return `${COATS[s.coat].name} nail in ${JAR_WATERS[s.water].name.toLowerCase()}`;
    if (!isOn(s)) return 'Empty - not in the test';
    const bits = [s.water === 'none' ? 'Air' : WATERS[s.water].name];
    if (s.oil) bits.push('oil layer');
    if (s.dryer) bits.push('drying agent');
    if (s.cork) bits.push('cork');
    return bits.join(' + ');
  }
  // Two short lines under each tube or jar on the picture.
  function label(rig, s) {
    if (rig === 'coats') return [COATS[s.coat].short, s.water === 'salt' ? 'salt water' : 'tap water'];
    if (!isOn(s)) return ['empty', ''];
    if (s.water === 'none') return s.dryer && s.cork ? ['dry air', '+ cork'] : s.dryer ? ['drying agent', 'no cork'] : ['air', '+ cork'];
    const w = s.water === 'boiled' ? 'boiled water' : s.water === 'salt' ? 'salt water' : 'tap water';
    return [w, s.oil ? '+ oil' : (s.water === 'boiled' ? 'no oil' : '')];
  }

  // What the coach says after a change to the set-up.
  const SAY = {
    'water:none': 'No water in this tube. Just air.',
    'water:boiled': 'An adult boiled the water and let it cool. Boiling drives the air out of water.',
    'water:tap': 'Tap water. It has air mixed into it.',
    'water:salt': 'Salt water: tap water with salt stirred in. Like the sea.',
    'oil:on': 'A thin layer of oil floats on top. It keeps air out of the water.',
    'oil:off': 'No oil layer. Air can mix into the water from the top.',
    'dryer:on': 'A drying agent is in. It soaks up the water from the air.',
    'dryer:off': 'No drying agent. Air holds a little water, called water vapour.',
    'cork:on': 'The cork closes the tube. Damp air cannot get in.',
    'cork:off': 'No cork. Air from the room can get in.',
    'coat:none': 'A bare nail. Nothing protects it.',
    'coat:paint': 'A coat of paint covers the nail.',
    'coat:grease': 'The nail is covered in grease, like a bicycle chain.',
    'coat:plastic': 'The nail is coated in plastic.',
    'coat:zinc': 'A galvanised nail: it is coated with zinc.',
    'coat:scratched': 'A painted nail with a scratch. The scratch shows bare iron.',
    'jwater:tap': 'Tap water in this jar.',
    'jwater:salt': 'Salt water in this jar, like sea spray.',
  };

  // One change to one tube or jar. Returns { s } (the new set-up), { refuse }
  // (a reason to say) or { hazard } (a mistake that stops the experiment).
  function applySet(rig, s, k, v, adult) {
    const n = Object.assign({}, s);
    if (rig === 'tubes') {
      if (k === 'water') {
        if (!WATERS[v]) return { refuse: 'That is not something to put in a tube.' };
        if (v === 'boiled' && !adult) return { hazard: 'kettle' };
        n.water = v;
        if (v !== 'none') n.dryer = false;
        if (v === 'none') n.oil = false;
        return { s: n };
      }
      if (k === 'oil') {
        if (v === 'on' && s.water === 'none') return { refuse: 'Oil floats on water. Put water in the tube first.' };
        n.oil = v === 'on'; return { s: n };
      }
      if (k === 'dryer') {
        if (v === 'on' && s.water !== 'none') return { refuse: 'A drying agent goes in a tube with NO water. Choose "Nothing (just air)" first.' };
        n.dryer = v === 'on'; return { s: n };
      }
      if (k === 'cork') { n.cork = v === 'on'; return { s: n }; }
    } else {
      if (k === 'coat' && COATS[v]) { n.coat = v; return { s: n }; }
      if (k === 'jwater' && JAR_WATERS[v]) { n.water = v; return { s: n }; }
    }
    return { refuse: 'That does not go here.' };
  }

  // ── What a look at the nails unlocks ─────────────
  // items = [{ id, s }] in the experiment; day = days waited;
  // extra = { singles: one-day waits so far, tweezers: a close look }.
  function finds(rig, items, day, extra) {
    const x = extra || {};
    const out = [];
    const r = it => rustAt(it.s, day);
    const vis = it => r(it) >= VISIBLE;
    const bare = it => (it.s.coat || 'none') === 'none';
    if (items.some(it => bare(it) && vis(it) && outcome(it.s).where === 'all')) out.push('first_rust');
    if (rig === 'tubes') {
      const dry = items.find(it => role(it.s) === 'dry');
      const noAir = items.find(it => role(it.s) === 'no_air');
      const wet = items.find(it => (role(it.s) === 'water_air' || role(it.s) === 'salt_air') && vis(it));
      if (day >= 3 && dry) out.push('dry_air');
      if (day >= 3 && noAir) out.push('no_air');
      if (day >= 3 && dry && noAir && wet) out.push('needs_both');
    } else {
      ['paint', 'grease', 'plastic', 'zinc'].forEach(c => {
        const it = items.find(y => y.s.coat === c);
        if (day >= 3 && it && r(it) === 0 && items.some(y => bare(y) && y.s.water === it.s.water && vis(y))) out.push(c);
      });
      if (day >= 2 && items.some(y => y.s.coat === 'scratched' && vis(y))) out.push('scratch');
    }
    const salt = items.find(it => bare(it) && it.s.water === 'salt' && !it.s.oil);
    const tap = items.find(it => bare(it) && it.s.water === 'tap' && !it.s.oil);
    if (day >= 1 && salt && tap && r(salt) > r(tap)) out.push('salt_faster');
    if ((x.singles || 0) >= 3 && items.some(vis)) out.push('day_by_day');
    if (x.tweezers && items.some(it => r(it) >= FLAKY)) out.push('flaky');
    return out;
  }

  // ── Mistakes that teach: which result cards a look at the nails earns ──
  function mistakes(rig, items, day, extra) {
    const x = extra || {};
    const out = [];
    if (x.hour) out.push({ id: 'too_soon', ctx: {} });
    items.forEach(it => {
      const s = it.s;
      if (rustAt(s, day) < VISIBLE || rig !== 'tubes') return;
      if (s.oil && s.water !== 'boiled') out.push({ id: 'not_boiled', ctx: { tube: it.id } });
      else if (s.water === 'boiled' && !s.oil) out.push({ id: 'no_oil', ctx: { tube: it.id } });
      else if (s.water === 'none') out.push({ id: 'damp_air', ctx: { tube: it.id, dryer: !!s.dryer, cork: !!s.cork } });
    });
    if (rig === 'coats' && day >= 1) {
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          const a = items[i], b = items[j];
          if (a.s.coat !== b.s.coat && a.s.water !== b.s.water) {
            const w = it => `Jar ${it.id}: ${COATS[it.s.coat].name.toLowerCase()} nail, ${JAR_WATERS[it.s.water].name.toLowerCase()}.`;
            out.push({ id: 'two_vars', ctx: { a: w(a), b: w(b) } });
            return out;
          }
        }
      }
    }
    return out;
  }

  function missionReady(id, rig, items, day) {
    if (day < 3) return false;
    if (id === 'needs') {
      const roles = items.map(it => role(it.s));
      return rig === 'tubes' && ['no_air', 'water_air', 'dry'].every(x => roles.includes(x));
    }
    if (id === 'stop') {
      if (rig !== 'coats' || !items.length) return false;
      const sameWater = items.every(it => it.s.water === items[0].s.water);
      const kinds = new Set(items.filter(it => COATS[it.s.coat].protect).map(it => it.s.coat));
      return sameWater && items.some(it => it.s.coat === 'none') && kinds.size >= 3;
    }
    return false;
  }

  // ── Discoveries ─────────────────────────────────
  // how = guide tokens (see GUIDES). scripts/test-labs-rusting.js follows every
  // `how` from a fresh bench and fails if it does not unlock its own card.
  const THREE = ['rig:tubes', 'adult:on', 'tube:A', 'water:boiled', 'oil:on', 'tube:B', 'water:tap', 'tube:C', 'dryer:on', 'cork:on'];
  const DISCOVERIES = [
    { id: 'first_rust', icon: '🟠', title: 'Rust appears', grades: [6],
      hint: 'A nail in tap water, open to the air. Wait one day.',
      how: ['rig:tubes', 'tube:B', 'water:tap', 'wait'],
      saw: 'After one day, orange-brown spots grew on the nail in tap water.',
      learn: 'This is rust. Iron joins with oxygen from the air and with water. Rust is reddish-brown.',
      psac: 'PSAC 2021 asked why an iron nail in a glass of water rusts. It has water AND air.' },
    { id: 'dry_air', icon: '🏜️', title: 'Dry air: no rust', grades: [6],
      hint: 'A nail in air with NO water. Keep the air dry.',
      how: ['rig:tubes', 'tube:C', 'dryer:on', 'cork:on', 'week'],
      saw: 'After 7 days, the nail in dry air was still shiny.',
      learn: 'The drying agent soaked up the water from the air. The cork kept damp air out. No water, so no rust.',
      psac: 'In PSAC 2024 Diagram 6, tube C holds dry air under a cork. Pin C does not change colour.' },
    { id: 'no_air', icon: '🛢️', title: 'No air: no rust', grades: [6],
      hint: 'Water with no air in it. Seal it with oil.',
      how: ['rig:tubes', 'adult:on', 'tube:A', 'water:boiled', 'oil:on', 'week'],
      saw: 'After 7 days, the nail under boiled water and oil was still shiny.',
      learn: 'Boiling drove the air out of the water. The oil stopped air getting back in. No air, so no rust.',
      psac: 'PSAC 2024 Q4: pin A does not change colour. The oil stops air reaching the iron.' },
    { id: 'needs_both', icon: '🔑', title: 'Iron needs air AND water', grades: [6],
      hint: 'Set up all three tubes, like Diagram 6. Then wait.',
      how: THREE.concat(['week']),
      saw: 'Only nail B rusted. Nail A had no air and nail C had no water. Both stayed shiny.',
      learn: 'Take away the air, or take away the water, and iron does not rust. Iron needs BOTH to rust.',
      psac: 'PSAC 2024 Q4, Diagram 6: which pin will change colour? Pin B only.' },
    { id: 'salt_faster', icon: '🌊', title: 'Salt water rusts faster', grades: [6],
      hint: 'Compare a nail in tap water with a nail in salt water.',
      how: ['rig:tubes', 'tube:B', 'water:tap', 'tube:D', 'water:salt', 'wait'],
      saw: 'After one day, the nail in salt water had twice as much rust. The tap-water nail had less.',
      learn: 'Salt makes iron rust faster. That is why gates and roofs near the sea rust quickly.' },
    { id: 'day_by_day', icon: '📅', title: 'Rust grows day by day', grades: [6],
      hint: 'Wait one day at a time. Watch the rust grow.',
      how: ['rig:tubes', 'tube:B', 'water:tap', 'wait', 'wait', 'wait'],
      saw: 'Each day there was more rust on the nail in tap water.',
      learn: 'Rusting is slow. It takes days to see, and years to eat through a gate. Always wait long enough.' },
    { id: 'flaky', icon: '🍂', title: 'Rust is weak and flaky', grades: [6],
      hint: 'Let a nail get very rusty. Look at it with the tweezers.',
      how: ['rig:tubes', 'tube:B', 'water:tap', 'week', 'tweezers'],
      saw: 'Rust flaked off when the tweezers touched it. The nail under it looked thinner.',
      learn: 'Rust is weak. It flakes off, and the iron underneath rusts next. Rusty tools and gates become weak.',
      psac: 'A question asks why rust is a problem for a farmer. Rusted tools become weak and break.' },
    { id: 'paint', icon: '🎨', title: 'Paint stops rust', grades: [6],
      hint: 'Paint one nail. Keep one bare. Wait a week.',
      how: ['rig:coats', 'jar:2', 'coat:paint', 'week'],
      saw: 'The painted nail stayed shiny. The bare nail next to it rusted.',
      learn: 'Paint covers the iron. Air and water cannot reach it, so it cannot rust. That is why gates are painted.',
      psac: 'PSAC 2021 asked for two ways to prevent rusting. Painting is one.' },
    { id: 'grease', icon: '🚲', title: 'Grease keeps rust away', grades: [6],
      hint: 'Grease one nail. Keep one bare. Wait a week.',
      how: ['rig:coats', 'jar:2', 'coat:grease', 'week'],
      saw: 'The greased nail stayed shiny. The bare nail rusted.',
      learn: 'Grease keeps out air and water. Bicycle chains are greased, so they stay rust-free and move smoothly.' },
    { id: 'plastic', icon: '🧴', title: 'A plastic coat', grades: [6],
      hint: 'Coat one nail in plastic. Keep one bare. Wait a week.',
      how: ['rig:coats', 'jar:2', 'coat:plastic', 'week'],
      saw: 'The plastic-coated nail stayed shiny. The bare nail rusted.',
      learn: 'Plastic keeps air and water off the iron. Dish racks and garden wire are often coated in plastic.' },
    { id: 'zinc', icon: '🏠', title: 'Galvanised iron', grades: [6],
      hint: 'Coat one nail with zinc. Keep one bare. Wait a week.',
      how: ['rig:coats', 'jar:2', 'coat:zinc', 'week'],
      saw: 'The galvanised nail stayed shiny. The bare nail rusted.',
      learn: 'Galvanising means coating iron with zinc. The corrugated iron roofs on many Mauritian houses are galvanised.' },
    { id: 'scratch', icon: '🩹', title: 'Rust at the scratch', grades: [6],
      hint: 'Paint a nail, then scratch the paint. Wait a week.',
      how: ['rig:coats', 'jar:2', 'coat:scratched', 'week'],
      saw: 'The scratched nail rusted only along the scratch. The painted part stayed shiny.',
      learn: 'A scratch lets air and water reach the iron again. Rust starts at the scratch. Repaint scratches quickly!' },
  ];

  // ── Hazards: the mistakes that stop the experiment ───
  const HAZARDS = {
    kettle: {
      signs: ['hot'],
      title: () => 'Hot! Boiling water can burn you',
      happened: () => 'You tried to boil the kettle on your own. Hot steam and boiling water spilled out.',
      why: 'Boiling water and steam burn skin badly. A hot kettle can tip over.',
      instead: 'Ask an adult to boil the water and pour it for you. Tap "Adult helper" first.',
      exam: 'Tube A needs boiled water. Boiling drives the air out of the water. An adult does this part.',
    },
    sharp: {
      signs: ['sharp'],
      title: () => 'Ouch! A rusty nail can cut you',
      happened: () => 'You picked up a rusty nail with your fingers. Its point scratched your skin.',
      why: 'Rusty nails can be sharp and dirty. Germs can get into a cut.',
      instead: 'Lift nails out with tweezers. If you cut yourself, tell an adult. Wash the cut with clean water and cover it.',
      exam: 'Rust makes iron weak. That is one reason rusting is a problem for farmers and their tools.',
    },
  };

  // ── Wrong but safe: what went wrong and what to do instead ───
  const RESULTS = {
    too_soon: { icon: '⏱', title: 'Too soon to tell!',
      happened: () => 'You looked after only one hour. Every nail was still shiny. So it seemed that nothing rusts.',
      instead: 'Rusting is slow. Wait a few days, then look again. Look every day and write down what you see.',
      exam: 'PSAC 2024 Q4 asks what happens "after a few days". Rust takes days to show.' },
    not_boiled: { icon: '💧', title: 'The water still had air in it',
      happened: c => `Nail ${c.tube} rusted a little, even under the oil. The water was not boiled, so it still had air in it.`,
      instead: 'Ask an adult to boil the water, then let it cool. Boiling drives the air out. Then add the oil.',
      exam: 'For a tube with no air, use boiled water AND a layer of oil.' },
    no_oil: { icon: '🛢️', title: 'You forgot the oil layer',
      happened: c => `Nail ${c.tube} rusted slowly. The boiled water had no air at first. But air from the top mixed back in.`,
      instead: 'Pour a thin layer of oil on the boiled water. Oil floats on top and keeps the air out.',
      exam: 'PSAC 2024 Q4: the oil stops air reaching the iron. So pin A does not change colour.' },
    damp_air: { icon: '🌫️', title: 'The air was not dry',
      happened: c => c.cork
        ? `Nail ${c.tube} got a few rust spots. You used a cork but no drying agent. The air inside was damp.`
        : `Nail ${c.tube} got a few rust spots. You used a drying agent but no cork. Damp air kept coming in.`,
      instead: 'Use a drying agent AND a cork. The drying agent soaks up water. The cork keeps damp air out.',
      exam: 'In PSAC 2024 Diagram 6, tube C holds dry air and is closed with a cork.' },
    two_vars: { icon: '⚖️', title: 'Not a fair test: two things changed',
      happened: c => `${c.a} ${c.b} Two things were different. So you cannot tell which one made the difference.`,
      instead: 'Change only ONE thing. Put every nail in the same water. Only the coating should change.',
      exam: 'A fair test changes one thing and keeps everything else the same.' },
  };

  // Short, true facts for the 💡 button, at a Grade 6 reading level.
  const FACTS = [
    'Rust is the everyday name for iron oxide. Iron makes it with oxygen and water.',
    'Steel is made mostly from iron. So steel rusts too.',
    'Gold does not rust. That is why old gold jewellery still shines.',
    'Rust is weak and flaky. It falls off, and the iron under it rusts next.',
    'Salt water makes iron rust faster. Gates and roofs near the sea rust quickly.',
    'Many roofs in Mauritius are galvanised iron sheets. Galvanised means coated with zinc.',
    'A bicycle chain is greased, not painted. Grease keeps rust away and helps the chain move.',
    'Food cans are steel coated with tin. The tin keeps the steel from rusting.',
    'Stainless steel spoons do not rust. Other metals are mixed into the steel.',
    'A drying agent, such as calcium chloride, soaks up water from the air.',
    'Boiling water drives out the air that is mixed in it.',
    'A fair test changes only ONE thing. Everything else stays the same.',
    'Rust is reddish-brown. That colour on an old gate or roof means rust.',
  ];

  // ── Missions ── A question\'s FIRST option is the answer; the quiz shuffles them.
  const MISSIONS = [
    {
      id: 'needs', icon: '🔑', title: 'What does iron need to rust?', rig: 'tubes', grades: [6],
      blurb: 'Set up the three tubes from the PSAC 2024 paper. Which nail rusts?',
      intro: 'Set up three tubes like Diagram 6. A: boiled water with oil on top. B: tap water. C: dry air, with a drying agent and a cork. Then wait at least 3 days.',
      quiz: [
        { q: 'Look at the three tubes. After a few days, which nail changes colour?',
          options: ['Nail B only', 'Nail A only', 'Nail C only', 'Nails A and B'],
          why: 'PSAC 2024 Q4, Diagram 6. Only nail B has water AND air, so only nail B rusts.' },
        { q: 'Nail A does not rust. Why not?',
          options: ['The oil stops air reaching the iron', 'There is far too much water there', 'Iron does not rust when it is cold', 'Oil is a conductor of electricity'],
          why: 'PSAC 2024 Q4. The oil floats on the water and keeps the air out.' },
        { q: 'Why was the water in tube A boiled first?',
          options: ['To drive the air out of the water', 'To make the water warm for the nail', 'To make the nail soft and bendy', 'To turn the water into salt water'],
          why: 'Boiling drives out the air mixed in the water. The oil then stops it coming back.' },
        { q: 'Nail C does not rust. Why not?',
          options: ['The air in the tube is dry', 'There is no air in the tube', 'The cork makes the nail cold', 'The nail is made of gold'],
          why: 'The drying agent soaked up the water, and the cork kept damp air out. No water, no rust.' },
        { q: 'What does iron need to rust?',
          options: ['Air and water', 'Air and light', 'Water and salt', 'Light and heat'],
          why: 'Take away either one, as in tubes A and C, and the iron stays shiny.' },
        { q: 'What colour is rust?',
          options: ['Reddish-brown', 'Silver-grey', 'Shiny black', 'Dark green'],
          why: 'PSAC 2025 asked this. Rust is a reddish-brown, flaky layer on iron.' },
      ],
    },
    {
      id: 'stop', icon: '🛡️', title: 'Stop the rust!', rig: 'coats', grades: [6],
      blurb: 'Protect nails in different ways. Keep one bare. Which ones rust?',
      intro: 'Keep jar 1 bare. Protect three or more nails in different ways: paint, grease, plastic or zinc. Use the same water in every jar. Then wait at least 3 days.',
      quiz: [
        { q: 'Which nail rusted?',
          options: ['The bare nail', 'The painted nail', 'The greased nail', 'The galvanised nail'],
          why: 'Only the bare nail met air and water. Every coating kept them away.' },
        { q: 'How does paint stop an iron gate from rusting?',
          options: ['It keeps air and water off the iron', 'It makes the iron too hard to rust', 'It keeps the iron nice and warm', 'It adds more oxygen to the iron'],
          why: 'Paint is a barrier. No air and no water can reach the iron, so it cannot rust.' },
        { q: 'Why is a bicycle chain greased and not painted?',
          options: ['Grease stops rust and lets it move', 'Paint would make the chain rust faster', 'Grease adds water to the chain', 'Paint is too heavy for a bicycle'],
          why: 'Grease keeps out air and water, like paint. It also keeps the moving chain smooth.' },
        { q: 'Galvanising covers iron with a layer of which metal?',
          options: ['Zinc', 'Gold', 'Copper', 'Silver'],
          why: 'Galvanised iron is coated with zinc. Many roofs in Mauritius are galvanised sheets.' },
        { q: 'A painted gate gets a deep scratch. What happens?',
          options: ['It rusts at the scratch', 'It never rusts at all', 'The paint grows back', 'The whole gate turns to zinc'],
          why: 'The scratch lets air and water reach the iron. Rust starts there, so repaint it soon.' },
        { q: 'Why do iron roofs near the sea rust faster?',
          options: ['Salt from the sea speeds up rusting', 'Sea air has no oxygen in it', 'Sea air is much drier', 'The sun is hotter near the sea'],
          why: 'Sea spray carries salt. Salt water makes iron rust much faster.' },
      ],
    },
  ];

  // ── Guided experiments: one action per step ──
  // `on` is what completes a step:
  //   rig:tubes|coats · adult:on|off · tube:A-D · water:none|boiled|tap|salt
  //   oil|dryer|cork:on|off · jar:1-5 · coat:<COATS> · jwater:tap|salt
  //   wait (one day) · week (to day 7) · hour · tweezers · hand · reset
  // A step whose setting is already in place is skipped.
  const GUIDES = [
    { id: 'three_tubes', icon: '🧪', title: 'The three test tubes', grades: [6],
      blurb: 'The PSAC 2024 experiment. Which nail rusts?',
      lesson: 'Only nail B rusted. It had water AND air. Nail A had no air. Nail C had no water. So iron needs both air and water to rust.',
      steps: [
        { on: 'rig:tubes', say: 'Tap 🧪 Test tubes to go to the test-tube rack.' },
        { on: 'adult:on', say: 'Tap 🧑 Ask an adult to help — boiling water is very hot.' },
        { on: 'tube:A', say: 'Tap Tube A to select it.' },
        { on: 'water:boiled', say: 'Tap ♨️ Boiled water — boiling drives the dissolved air out.' },
        { on: 'oil:on', say: 'Tap 🛢️ Add an oil layer — oil floats on water and keeps air away.' },
        { on: 'tube:B', say: 'Tap Tube B to select it.' },
        { on: 'water:tap', say: 'Tap 💧 Tap water — air can dissolve in tap water.' },
        { on: 'tube:C', say: 'Tap Tube C to select it.' },
        { on: 'dryer:on', say: 'Tap 🧂 Add a drying agent — it soaks up water from the air.' },
        { on: 'cork:on', say: 'Tap 🍾 Put the cork in — seals the dry air inside.' },
        { on: 'week', say: 'Tap ⏩ Wait 7 days — watch the three nails.' },
      ] },
    { id: 'salt', icon: '🌊', title: 'Salt water and rust', grades: [6],
      blurb: 'Tap water or salt water: which rusts faster?',
      lesson: 'Both nails rusted, but the nail in salt water rusted faster. That is why iron near the sea rusts quickly.',
      steps: [
        { on: 'rig:tubes', say: 'Tap 🧪 Test tubes to go to the test-tube rack.' },
        { on: 'tube:B', say: 'Tap Tube B to select it.' },
        { on: 'water:tap', say: 'Tap 💧 Tap water to fill tube B.' },
        { on: 'tube:D', say: 'Tap Tube D to select it.' },
        { on: 'water:salt', say: 'Tap 🧂 Salt water to fill tube D.' },
        { on: 'wait', say: 'Tap 🌙 Wait 1 day — which nail has more rust?' },
        { on: 'wait', say: 'Tap 🌙 Wait 1 more day — compare the two nails.' },
      ] },
    { id: 'stop', icon: '🛡️', title: 'Stop the rust!', grades: [6],
      blurb: 'Paint, grease, plastic and zinc. Which ones stop rust?',
      lesson: 'Only the bare nail rusted. Paint, grease, plastic and zinc all keep air and water away from the iron.',
      steps: [
        { on: 'rig:coats', say: 'Tap 🛡️ The five jars — each nail sits half in water, half in air.' },
        { on: 'jar:2', say: 'Tap Jar 2 to select it (jar 1 stays bare).' },
        { on: 'coat:paint', say: 'Tap 🎨 Paint to coat the nail in jar 2.' },
        { on: 'jar:3', say: 'Tap Jar 3 to select it.' },
        { on: 'coat:grease', say: 'Tap 🚲 Grease to cover the nail in jar 3.' },
        { on: 'jar:4', say: 'Tap Jar 4 to select it.' },
        { on: 'coat:plastic', say: 'Tap 🧴 Plastic coat on the nail in jar 4.' },
        { on: 'jar:5', say: 'Tap Jar 5 to select it.' },
        { on: 'coat:zinc', say: 'Tap 🏠 Zinc (galvanised) — zinc coats the nail in jar 5.' },
        { on: 'week', say: 'Tap ⏩ Wait 7 days — which nails rust?' },
      ] },
    { id: 'scratch', icon: '🩹', title: 'A scratch in the paint', grades: [6],
      blurb: 'What happens when paint gets scratched?',
      lesson: 'The painted nail stayed shiny. The scratched one rusted along the scratch. Air and water got in there.',
      steps: [
        { on: 'rig:coats', say: 'Tap 🛡️ The five jars to go to the coating bench.' },
        { on: 'jar:2', say: 'Tap Jar 2 to select it.' },
        { on: 'coat:paint', say: 'Tap 🎨 Paint to coat the nail in jar 2.' },
        { on: 'jar:3', say: 'Tap Jar 3 to select it.' },
        { on: 'coat:scratched', say: 'Tap 🩹 Paint, then scratch — paint it, then scratch through.' },
        { on: 'week', say: 'Tap ⏩ Wait 7 days — look closely at jar 3.' },
      ] },
  ];

  return { GRADES, DAYS, HOUR, VISIBLE, FLAKY, SCRATCH_CAP, TUBES, JARS, WATERS, JAR_WATERS, COATS, RATES,
           blankTube, blankJar, newItems, isOn, activeItems, conditions, outcome, rustAt, visible, role,
           seen, short, setupWords, label, SAY, applySet, finds, mistakes, missionReady,
           DISCOVERIES, HAZARDS, RESULTS, FACTS, MISSIONS, GUIDES };
})();
if (typeof window !== 'undefined') window.LabRustingData = LabRustingData;
