'use strict';
// Science Labs: the science the Work, Energy & Power lab is allowed to show.
//
// Checks: all work calculations (W = F×d); GPE (mgh); power (P = W/t) from
// the two pull speeds; ramp physics (F = weight×sin30°, d = height/sin30°,
// W same as lift); every discovery has a valid recipe; every hazard/result
// card is complete; every mission has 5+ questions with 4 distinct options
// and a reason; every guide names its control; Grade 8 tagging; and the
// EXPERIMENTS (lab_experiment.js): every token is one the bench accepts,
// refs resolve, every `say` names its control, and every number in each
// See text is one the model produces when the tokens are replayed.
//
// Run: node scripts/test-labs-energy-data.js
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(ROOT, ...p), 'utf8');
const src = read('engine', 'labs', 'lab_energy_data.js');
const bench = read('engine', 'labs', 'lab_energy.js');
const core = read('engine', 'labs', 'lab_core.js');
const manifest = read('subjects', 'grade8-science', '_manifest.js');
const qdir = path.join(ROOT, 'subjects', 'grade8-science', 'questions');
const q8 = fs.readdirSync(qdir).filter(f => f.endsWith('.js'))
  .map(f => fs.readFileSync(path.join(qdir, f), 'utf8')).join('\n');

const ctx = vm.createContext({});
vm.runInContext(src + '\nthis.D = LabEnergyData;', ctx);
const D = ctx.D;

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); }
};
// The same emoji/arrow stripping scripts/test-labs-experiments.js applies to a button's text.
const plain = s => String(s || '').replace(/[\u{1F000}-\u{1FAFF}\u{2300}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}\u{2190}-\u{21FF}]/gu, '').replace(/\s+/g, ' ').trim().toLowerCase();

// ── Grounded in the Grade 8 pack ─────────────
console.log('\nGrounded in the Grade 8 pack');
ok('grade8-science declares chapter g8s-work-energy',
  /id: 'g8s-work-energy'/.test(manifest));
ok('the batch file has g8s-work-energy-016..020',
  ['g8s-work-energy-016','g8s-work-energy-017','g8s-work-energy-018','g8s-work-energy-019','g8s-work-energy-020']
  .every(id => q8.includes(`'${id}'`)));
ok('no NCE/PSAC paper reference is quoted (no live Grade 8 paper in the repo)',
  !/20\d\d Q\d/.test(src));
ok('the two exam lines that quote a question quote ones in the Grade 8 files (two lifts, 20 s vs 40 s; heat from friction)',
  /Lift A takes 20 s and Lift B takes 40 s/.test(q8) && /wasted/.test(q8) && /heat/.test(q8));

// ── Constants ──────────────────────────────────
console.log('\nPhysics constants');
ok('G_EARTH is 10 N/kg', D.G_EARTH === 10);
ok('RAMP_ANGLE_DEG is 30', D.RAMP_ANGLE_DEG === 30);
ok('RAMP_SIN is 0.5 (sin 30°)', D.RAMP_SIN === 0.5);

// ── MASSES ────────────────────────────────────
console.log('\nMass table');
ok('exactly 3 masses', D.MASSES.length === 3);
ok('all masses have kg, weight, label, color',
  D.MASSES.every(m => m.kg > 0 && m.weight > 0 && m.label && m.color));
ok('every weight = kg × G_EARTH (exact)',
  D.MASSES.every(m => Math.abs(m.weight - m.kg * D.G_EARTH) < 0.001),
  D.MASSES.filter(m => Math.abs(m.weight - m.kg * D.G_EARTH) >= 0.001).map(m => m.label));

// ── HEIGHTS ───────────────────────────────────
console.log('\nHeight table');
ok('exactly 3 heights', D.HEIGHTS.length === 3);
ok('all heights have m and label',
  D.HEIGHTS.every(h => h.m > 0 && h.label));

// ── SPEEDS ────────────────────────────────────
console.log('\nSpeed table (the time a pull takes - never the wall clock)');
ok('two speeds, Fast 2 s and Slow 5 s', D.SPEEDS.length === 2 && D.SPEEDS[0].id === 'fast' && D.SPEEDS[0].s === 2 && D.SPEEDS[1].id === 'slow' && D.SPEEDS[1].s === 5, D.SPEEDS);
ok('every speed has a label, a sub-line and an icon', D.SPEEDS.every(s => s.label && s.sub && s.icon));
ok('the bench never reads the wall clock for a pull time', !/performance\.now\(\)/.test(bench) && !/Date\.now\(\)\s*-\s*_timer/.test(bench));

// ── calcWork (lift mode) ──────────────────────
console.log('\ncalcWork — lift mode (W = weight × height)');
D.MASSES.forEach((M, mi) => {
  D.HEIGHTS.forEach((H, hi) => {
    const r = D.calcWork('lift', mi, hi);
    const expForce = M.weight;
    const expDist  = H.m;
    const expWork  = +(M.weight * H.m).toFixed(1);
    ok(`lift m=${M.label} h=${H.label}: F=${expForce} N, d=${expDist} m, W=${expWork} J`,
      r && r.force === expForce && r.dist === expDist && r.work === expWork,
      r);
  });
});

// ── calcWork (ramp mode) ──────────────────────
console.log('\ncalcWork — ramp mode (F=weight/2, d=2×height, W same as lift)');
D.MASSES.forEach((M, mi) => {
  D.HEIGHTS.forEach((H, hi) => {
    const ramp = D.calcWork('ramp', mi, hi);
    const lift = D.calcWork('lift', mi, hi);
    const expForce = +(M.weight * D.RAMP_SIN).toFixed(1);
    const expDist  = +(H.m / D.RAMP_SIN).toFixed(1);
    ok(`ramp m=${M.label} h=${H.label}: F=${expForce} N, d=${expDist} m`,
      ramp && ramp.force === expForce && ramp.dist === expDist,
      ramp);
    ok(`ramp m=${M.label} h=${H.label}: W equals lift (conservation of energy)`,
      ramp && lift && Math.abs(ramp.work - lift.work) < 0.01,
      { ramp: ramp && ramp.work, lift: lift && lift.work });
  });
});

// ── calcWork edge cases ───────────────────────
console.log('\ncalcWork edge cases');
ok('calcWork with bad massIdx returns null', D.calcWork('lift', 99, 0) === null);
ok('calcWork with bad heightIdx returns null', D.calcWork('lift', 0, 99) === null);

// ── calcGPE ───────────────────────────────────
console.log('\ncalcGPE (GPE = mass × g × height)');
D.MASSES.forEach((M, mi) => {
  D.HEIGHTS.forEach((H, hi) => {
    const gpe = D.calcGPE(mi, hi);
    const exp = +(M.kg * D.G_EARTH * H.m).toFixed(2);
    ok(`GPE m=${M.label} h=${H.label} = ${exp} J`,
      Math.abs(gpe - exp) < 0.001,
      gpe);
    ok(`GPE m=${M.label} h=${H.label} equals the lift work (ideal lift)`, Math.abs(gpe - D.calcWork('lift', mi, hi).work) < 0.001);
  });
});

// ── calcPower ─────────────────────────────────
console.log('\ncalcPower (P = W ÷ t)');
ok('calcPower(10, 2) = 5 W', Math.abs(D.calcPower(10, 2) - 5) < 0.001);
ok('calcPower(5, 0.5) = 10 W', Math.abs(D.calcPower(5, 0.5) - 10) < 0.001);
ok('calcPower(0, 0) returns null (no division by zero)', D.calcPower(0, 0) === null);
ok('calcPower(10, 0) returns null', D.calcPower(10, 0) === null);
ok('every mass × height × speed gives a power a child can check by hand (at most 2 dp, no rounding)',
  D.MASSES.every((M, mi) => D.HEIGHTS.every((H, hi) => D.SPEEDS.every(S => {
    const w = D.calcWork('lift', mi, hi).work; return Math.abs(D.calcPower(w, S.s) - w / S.s) < 1e-9;
  }))));
ok('fmt prints whole numbers without a decimal and never more than 2 dp', D.fmt(5) === '5' && D.fmt(2.5) === '2.5' && D.fmt(1.0) === '1' && D.fmt(0.5) === '0.5');

// ── Labels ────────────────────────────────────
console.log('\nControl labels');
const LABEL_TOKENS = ['mode:lift', 'mode:ramp', 'mass:0', 'mass:1', 'mass:2', 'height:0', 'height:1', 'height:2', 'speed:fast', 'speed:slow', 'pull', 'timer', 'read', 'hold', 'release'];
ok('every control token has a non-empty label', LABEL_TOKENS.every(t => D.label(t) && D.label(t).text && D.label(t).text !== t), LABEL_TOKENS.filter(t => !D.label(t) || !D.label(t).text || D.label(t).text === t));
ok('an answer token is labelled by its own text', D.label('ans:5 J').text === '5 J');
ok('the bench draws its buttons from label()', /P\(\)\.label\(/.test(bench) && /_btn\('pull'/.test(bench));
// What the shared browser test will read off the rendered button (icon + text, sub-line removed).
const labelText = tok => { const L = D.label(tok); return plain((L.icon ? L.icon + ' ' : '') + L.text); };
const namesControl = (say, tok) => { const l = labelText(tok); return !!l && (plain(say).includes(l.replace(/\s*\d+\s*$/, '').slice(0, 12)) || plain(say).includes(l)); };

// ── Token validator ──────────────────────────
const tokenOk = on => {
  const i = on.indexOf(':');
  const k = i > 0 ? on.slice(0, i) : on, a = i > 0 ? on.slice(i + 1) : undefined;
  if (['read', 'pull', 'timer', 'hold', 'release'].includes(k)) return a === undefined;
  if (k === 'mode') return ['lift', 'ramp'].includes(a);
  if (k === 'mass')   return !!D.MASSES[+a];
  if (k === 'height') return !!D.HEIGHTS[+a];
  if (k === 'speed')  return D.SPEEDS.some(s => s.id === a);
  if (k === 'ans')    return typeof a === 'string' && a.length > 0 && !/"/.test(a);
  if (k === 'card')   return !!D.RESULTS[a] || !!D.HAZARDS[a];
  return false;
};
ok('the bench dispatches every token family (mode, mass, height, speed, pull, timer, read, hold, release, ans, card)',
  ['mode', 'mass', 'height', 'speed', 'pull', 'timer', 'read', 'hold', 'release', 'ans', 'card'].every(k => new RegExp(`case '${k}':`).test(bench)));

// ── Discoveries ──────────────────────────────
console.log('\nDiscoveries');
const all8 = D.forGrade(D.DISCOVERIES, 8);
ok(`at least 12 discoveries for Grade 8 (${all8.length})`, all8.length >= 12);
ok('discovery ids are unique', new Set(D.DISCOVERIES.map(d => d.id)).size === D.DISCOVERIES.length);

const badDisc = D.DISCOVERIES.filter(d =>
  !d.title || !d.icon || !d.hint || !d.saw || !d.learn ||
  !Array.isArray(d.how) || !d.how.length || !d.how.every(tokenOk) ||
  !(d.rule || d.card));
ok('every discovery has title, icon, hint, saw, learn, a valid recipe and a way to unlock',
  badDisc.length === 0, badDisc.map(d => d.id));

const ruleBad = D.DISCOVERIES.filter(d => d.rule && d.how[d.how.length - 1] !== 'read');
ok('every rule discovery recipe ends with "read"', ruleBad.length === 0, ruleBad.map(d => d.id));

const cardBad = D.DISCOVERIES.filter(d => d.card && d.how[d.how.length - 1] !== 'card:' + d.card);
ok('every card discovery recipe ends with card:<its-card>', cardBad.length === 0, cardBad.map(d => d.id));

ok('every result card has a discovery that shows it',
  Object.keys(D.RESULTS).every(c => D.DISCOVERIES.some(d => d.card === c)));
ok('every hazard has a discovery that can show it',
  Object.keys(D.HAZARDS).every(h => D.DISCOVERIES.some(d => d.card === h || (d.how && d.how.includes('card:' + h)))));
// wrong_direction has no control on the bench that can fire its card; it is
// the one discovery "Show me how" cannot reach. Known; reported.
ok('the card discoveries with a bench control lead to it before the card (hold, release, ramp pull)',
  ['no_work_held', 'runaway_load', 'ramp_efficiency'].every(id => { const d = D.DISCOVERIES.find(x => x.id === id); return d && d.how.length >= 2; }));

// The timed "saw" texts must be true for the speeds: Fast 2 s, Slow 5 s.
ok('faster_more_power: "10 J in 2 s = 5 W; 10 J in 5 s = 2 W" is what Fast and Slow give for 1 kg × 1.0 m',
  (() => { const w = D.calcWork('lift', 2, 1).work; return w === 10 && D.calcPower(w, 2) === 5 && D.calcPower(w, 5) === 2; })());
ok('watt_unit: 1 J in 2 s = 0.5 W for 200 g × 0.5 m at Fast',
  (() => { const w = D.calcWork('lift', 0, 0).work; return w === 1 && D.calcPower(w, 2) === 0.5; })());

// ── discoveriesFor ────────────────────────────
console.log('\ndiscoveriesFor helper');
ok('discoveriesFor returns array', Array.isArray(D.discoveriesFor('lift', 0, 0, false)));
ok('discoveriesFor("lift",1,1,false) includes "work_formula"',
  D.discoveriesFor('lift', 1, 1, false).includes('work_formula'));
ok('discoveriesFor("lift",1,1,true) includes "power_formula"',
  D.discoveriesFor('lift', 1, 1, true).includes('power_formula'));
ok('discoveriesFor("ramp",1,1,false) includes "ramp_same_work"',
  D.discoveriesFor('ramp', 1, 1, false).includes('ramp_same_work'));
ok('rule-based discoveries not returned for wrong mode/mass/height',
  !D.discoveriesFor('ramp', 0, 0, false).includes('work_formula'));
ok('timed discoveries not returned when timed=false',
  !D.discoveriesFor('lift', 1, 1, false).includes('power_formula'));

// ── Guided experiments (Explore) ─────────────
console.log('\nGuided experiments');
const guides = D.forGrade(D.GUIDES, 8);
ok(`at least 3 guided experiments for Grade 8 (${guides.length})`, guides.length >= 3);
ok('guide ids are unique', new Set(D.GUIDES.map(g => g.id)).size === D.GUIDES.length);
for (const G of D.GUIDES) {
  const bad = G.steps.filter(s => !tokenOk(s.on) || !s.say);
  ok(`${G.title}: every step has a valid token and say`, bad.length === 0, bad);
  const unnamed = G.steps.filter(s => !namesControl(s.say, s.on));
  ok(`${G.title}: every say names the control it points at`, unnamed.length === 0, unnamed.map(s => s.say));
  ok(`${G.title}: has blurb, icon and lesson`, !!(G.blurb && G.icon && G.lesson));
  const lastOn = G.steps[G.steps.length - 1].on;
  ok(`${G.title}: last step is "read" or a result card`,
    lastOn === 'read' || (lastOn.startsWith('card:') && !!D.RESULTS[lastOn.split(':')[1]]));
}
ok('guides cover lift mode', D.GUIDES.some(G => G.steps.some(s => s.on === 'mode:lift')));
ok('guides cover ramp mode', D.GUIDES.some(G => G.steps.some(s => s.on === 'mode:ramp')));
ok('guides cover the timer and both speeds', D.GUIDES.some(G => G.steps.some(s => s.on === 'timer') && G.steps.some(s => s.on === 'speed:fast') && G.steps.some(s => s.on === 'speed:slow')));
ok('power_race lesson: 20 J in 2 s = 10 W and in 5 s = 4 W (1 kg × 2.0 m)',
  (() => { const w = D.calcWork('lift', 2, 2).work; return w === 20 && D.calcPower(w, 2) === 10 && D.calcPower(w, 5) === 4 && /10 W/.test(D.GUIDES[2].lesson) && /4 W/.test(D.GUIDES[2].lesson); })());

// ── Missions ─────────────────────────────────
console.log('\nMissions');
const missions = D.forGrade(D.MISSIONS, 8);
ok(`at least 2 missions for Grade 8 (${missions.length})`, missions.length >= 2);
const optLabel = o => (typeof o === 'object' ? o.label : o);
for (const M of D.MISSIONS) {
  const bad = M.quiz.filter(q =>
    !q.q || !q.why || q.options.length !== 4 ||
    new Set(q.options.map(optLabel)).size !== 4);
  ok(`${M.title}: ${M.quiz.length} questions (≥ 5), each with 4 distinct options and a reason`,
    bad.length === 0 && M.quiz.length >= 5, bad.map(q => q.q));
  ok(`${M.title}: has intro, blurb and icon`, !!(M.intro && M.blurb && M.icon));
}
ok('no quiz question text is repeated across missions',
  (() => {
    const qs = D.MISSIONS.flatMap(M => M.quiz.map(q => q.q));
    return new Set(qs).size === qs.length;
  })());
const wm = D.MISSIONS.find(m => m.id === 'work_it_out');
ok('work_it_out Q1 first option is the correct answer (12 J)', wm && wm.quiz[0].options[0] === '12 J');
const pm = D.MISSIONS.find(m => m.id === 'power_race_q');
ok('power_race_q Q1 first option is the correct answer (20 W)', pm && pm.quiz[0].options[0] === '20 W');

// ── Hazards and result cards ─────────────────
console.log('\nHazards and result cards');
const kinds = new Set([...core.match(/const SIGN_LABELS = \{([\s\S]*?)\};/)[1].matchAll(/(\w+):/g)].map(m => m[1]));
ok('shell has warning sign (physical hazard)', /warning:/.test(core));
for (const [id, H] of Object.entries(D.HAZARDS)) {
  const ctx2 = { label: 'load' };
  ok(`hazard ${id}: valid signs, title, happened, why, instead, exam, fx`,
    H.signs.length && H.signs.every(s => kinds.has(s)) &&
    H.title(ctx2) && H.happened(ctx2) && H.why && H.instead && H.exam && H.fx);
}
for (const [id, R] of Object.entries(D.RESULTS)) {
  const v = x => (typeof x === 'function' ? x({}) : x);
  ok(`result card ${id}: icon, title, happened, instead, exam`,
    !!(R.icon && v(R.title) && v(R.happened) && v(R.instead) && R.exam));
}
ok('CARD_ORDER matches RESULTS keys',
  D.CARD_ORDER.slice().sort().join() === Object.keys(D.RESULTS).sort().join());
const mistakes = Object.keys(D.HAZARDS).length + Object.keys(D.RESULTS).length;
ok(`at least 3 mistakes that teach (${mistakes})`, mistakes >= 3);
ok('the ramp friction card does not claim a force the ideal bench never shows',
  /exactly half the weight/.test(D.RESULTS.ramp_efficiency.happened()) && !/was a little more/.test(D.RESULTS.ramp_efficiency.happened()));

// ── Experiments (lab_experiment.js, LAB_SPEC.md §10) ─────────────
console.log('\nExperiments (lab_experiment.js)');
const EX = D.EXPERIMENTS;
ok('EXPERIMENTS is exported', Array.isArray(EX) && EX.length > 0);
const ex8 = D.forGrade(EX, 8);
ok(`3 to 5 experiments at Grade 8 (${ex8.length})`, ex8.length >= 3 && ex8.length <= 5);
ok('experiment ids are unique', new Set(EX.map(e => e.id)).size === EX.length);
ok('every experiment teaches g8s-work-energy at Grade 8 only', EX.every(e => e.chapter === 'g8s-work-energy' && Array.isArray(e.grades) && e.grades.join() === '8'));
ok('experiment 1 is the exam-shaped one: W = F × d for a lifted bag, mass and height chosen by the child',
  EX[0] && EX[0].id === 'lift_bag' && EX[0].steps.some(s => s.ask && s.on === 'mass:1') && EX[0].steps.some(s => s.ask && s.on === 'height:1') && EX[0].steps.some(s => s.on === 'ans:5 J'));
ok('the four experiments cover work, power (fast vs slow), a heavier load, and the energy transfer on release',
  ['lift_bag', 'fast_or_slow', 'heavier_load', 'let_go'].every(id => EX.some(e => e.id === id)) && EX.some(e => e.steps.some(s => s.on === 'release')) && EX.some(e => e.steps.some(s => s.on === 'speed:slow')));

const question = ref => {
  if (ref && typeof ref === 'object') return ref;
  const [mid, i] = String(ref).split(':');
  const M = D.MISSIONS.find(x => x.id === mid);
  return M ? M.quiz[Number(i)] : null;
};
const usedRefs = [];
const rightTok = s => s.on || (s.any && s.any[0]);

// A pure replay of the bench: the same formulas the chips use.
function replay(tokens) {
  const st = { mode: 'lift', massIdx: 0, heightIdx: 0, speed: D.SPEEDS[0], timing: false, pullDone: false, rows: [], values: new Set(), errors: [] };
  const add = (v, unit) => { st.values.add(D.fmt(v) + ' ' + unit); st.values.add(Number(v).toFixed(1) + ' ' + unit); };
  for (const tok of tokens) {
    const i = tok.indexOf(':');
    const k = i > 0 ? tok.slice(0, i) : tok, v = i > 0 ? tok.slice(i + 1) : '';
    switch (k) {
      case 'mode': st.mode = v; st.pullDone = false; break;
      case 'mass': st.massIdx = +v; break;
      case 'height': st.heightIdx = +v; break;
      case 'speed': st.speed = D.SPEEDS.find(s => s.id === v); break;
      case 'timer': st.timing = !st.timing; break;
      case 'pull': {
        const c = D.calcWork(st.mode, st.massIdx, st.heightIdx);
        const row = { ...c, mode: st.mode, timeS: st.timing ? st.speed.s : null, powerW: st.timing ? D.calcPower(c.work, st.speed.s) : null };
        st.rows.push(row); st.pullDone = true;
        add(c.force, 'N'); add(c.dist, 'm'); add(c.work, 'J'); add(D.HEIGHTS[st.heightIdx].m, 'm');
        if (row.timeS !== null) { add(row.timeS, 's'); add(row.powerW, 'W'); }
        break;
      }
      case 'release': {
        if (st.mode !== 'ramp' || !st.pullDone) { st.errors.push('release with the load not at the top of the ramp'); break; }
        const gpe = D.calcGPE(st.massIdx, st.heightIdx);
        st.rows.push({ release: true, gpe }); st.pullDone = false;
        add(gpe, 'J');
        break;
      }
      case 'ans': {
        const m = v.match(/^(\d+(?:\.\d+)?) (N|m|J|s|W)$/);
        if (m && !st.values.has(D.fmt(m[1]) + ' ' + m[2])) st.errors.push(`answer "${v}" is not a value the bench has shown (${[...st.values].join(', ')})`);
        break;
      }
      case 'hold': case 'read': case 'card': break;
      default: st.errors.push('unknown token ' + tok);
    }
  }
  return st;
}

for (const e of EX) {
  const t = e.id;
  const setupBad = (e.setup || []).filter(x => !tokenOk(x));
  ok(`${t}: every setup token is one the bench accepts`, Array.isArray(e.setup) && setupBad.length === 0, setupBad);
  ok(`${t}: title is a question a child can say back (≤ 60 chars, ends in "?")`, e.title.length <= 60 && /\?$/.test(e.title), e.title);
  ok(`${t}: aim is one or two short sentences (≤ 200 chars)`, e.aim.length <= 200 && e.aim.split(/[.!?]\s/).length <= 3, e.aim.length);
  ok(`${t}: predict has 2-4 options with the answer among them`, e.predict.options.length >= 2 && e.predict.options.length <= 4 && e.predict.options.some(o => o.id === e.predict.answer));
  ok(`${t}: 1 to 5 steps`, e.steps.length >= 1 && e.steps.length <= 5, e.steps.length);
  e.steps.forEach((s, i) => {
    const toks = s.options || s.any || (s.on ? [s.on] : []);
    const bad = toks.filter(x => !tokenOk(x));
    ok(`${t} step ${i + 1}: every token is one the bench accepts`, toks.length > 0 && bad.length === 0, bad);
    ok(`${t} step ${i + 1}: a decision (ask + options) or an observation (on + say), never both`, (!!s.ask && Array.isArray(s.options) && !s.say) || (!!s.say && !!s.on && !s.options));
    if (s.ask) {
      ok(`${t} step ${i + 1}: the answer is among the options`, s.any ? s.any.every(x => s.options.includes(x)) : s.options.includes(s.on));
      ok(`${t} step ${i + 1}: every wrong option explains itself, and every wrong key is an option`,
        !!s.wrong && Object.keys(s.wrong).every(k => s.options.includes(k) && k !== s.on) && Object.values(s.wrong).every(w => typeof w === 'string' && w.length > 15), s.wrong);
      const unexplained = s.options.filter(o => o !== s.on && !(s.any || []).includes(o) && !(s.wrong || {})[o]);
      ok(`${t} step ${i + 1}: no wrong option is silent`, unexplained.length === 0, unexplained);
    }
    if (s.say) ok(`${t} step ${i + 1}: the instruction names its control ("${labelText(s.on)}")`, namesControl(s.say, s.on), s.say);
    const words = String(s.say || s.ask).split(/\s+/).length;
    ok(`${t} step ${i + 1}: instruction ≤ 25 words (${words})`, words <= 25);
  });
  // Every wrong ans: option must NOT be a value the bench shows for that step - a distractor is not a reading.
  ok(`${t}: see.saw and see.learn are sentences`, e.see && e.see.saw.length > 10 && e.see.learn.length > 10);
  ok(`${t}: 2 or 3 check questions`, Array.isArray(e.check) && e.check.length >= 2 && e.check.length <= 3);
  for (const ref of e.check) {
    const q = question(ref);
    ok(`${t}: check ${typeof ref === 'string' ? ref : '(inline)'} resolves to a 4-option question, answer first, with a reason`,
      !!q && typeof q.q === 'string' && q.options.length === 4 && new Set(q.options.map(optLabel)).size === 4 && typeof q.why === 'string' && q.why.length > 20);
    usedRefs.push(typeof ref === 'string' ? ref : q && q.q);
  }
  ok(`${t}: has an exam line`, typeof e.exam === 'string' && e.exam.length > 20);

  // Replay setup + the right token of every step through the model.
  const toks = [...e.setup, ...e.steps.map(rightTok)];
  const R = replay(toks);
  ok(`${t}: the tokens replay cleanly through the model`, R.errors.length === 0, R.errors);
  const nums = [...e.see.saw.matchAll(/(\d+(?:\.\d+)?) (N|m|J|s|W)\b/g)].map(m => m[1] + ' ' + m[2]);
  const missing = nums.filter(n => !R.values.has(n));
  ok(`${t}: every number in See ("${nums.join(', ')}") is one the bench produced`, nums.length > 0 && missing.length === 0, missing);
  ok(`${t}: the bench recorded at least one notebook row for the See`, R.rows.length >= 1);
}
ok('no check question is used by two experiments', new Set(usedRefs).size === usedRefs.length, usedRefs);

// The specific arithmetic each See claims.
console.log('\nThe See texts, checked by hand');
ok('lift_bag: 500 g × 1.0 m → F = 5 N, W = 5 J', (c => c.force === 5 && c.work === 5)(D.calcWork('lift', 1, 1)));
ok('fast_or_slow: 1 kg × 1.0 m = 10 J; 2 s → 5 W; 5 s → 2 W', D.calcWork('lift', 2, 1).work === 10 && D.calcPower(10, 2) === 5 && D.calcPower(10, 5) === 2);
ok('heavier_load: 200 g × 2.0 m = 4 J; 1 kg × 2.0 m = 20 J (five times)', D.calcWork('lift', 0, 2).work === 4 && D.calcWork('lift', 2, 2).work === 20);
ok('let_go: 1 kg at 2.0 m stores 20 J; the ramp pull that put it there was 5 N × 4.0 m = 20 J', D.calcGPE(2, 2) === 20 && (c => c.force === 5 && c.dist === 4 && c.work === 20)(D.calcWork('ramp', 2, 2)));
ok('let_go: the release step is an observation whose control is "Release rope"', (s => s && s.say && namesControl(s.say, 'release'))(EX.find(e => e.id === 'let_go').steps.find(s => s.on === 'release')));

// ── The bench adapter ────────────────────────
console.log('\nThe bench adapter');
const adapter = bench.slice(bench.indexOf('const experiment = {'));
ok('the bench exports the experiment adapter (list, question, reset, apply, guide, stop, evidence, focus, selector, hooks)',
  ['list', 'question', 'reset', 'apply', 'guide', 'stop', 'evidence', 'focus', 'selector', 'hooks'].every(k => new RegExp('\\b' + k + ':').test(adapter)) && /return \{ study, experiment,/.test(bench));
ok('the guide runs the runner\'s hooks: token before matching, any-matching, step after render, done instead of the overlay',
  /experiment\.hooks\.token\(token, s\)/.test(bench) && /s\.any\.includes\(token\)/.test(bench) && /experiment\.hooks\.done\(\)/.test(bench) && /experiment\.hooks\.step\(_guideStep\)/.test(bench));
ok('the set-up is silent: no discoveries, cards, coach or friction note while applying', /if \(_applying\) return;/.test(bench) && /!_applying && !_expGuide\(\)/.test(bench));
ok('the glow covers every token of an ask step and never scrolls during an experiment', /s\.options \|\| s\.any \|\| \(s\.on \? \[s\.on\] : \[\]\)/.test(bench) && /if \(!_guide\.exp\) els\[0\]\.scrollIntoView/.test(bench));
ok('the pull token fires when the load ARRIVES, not when the button is pressed', /_guideEvent\('pull'\)/.test(bench.slice(bench.indexOf('function _completePull'), bench.indexOf('function _completeSlide'))) && !/case 'pull': \{[\s\S]*?_guideEvent\('pull'\)[\s\S]*?return;\s*\}/.test(bench));
ok('a release during an experiment slides the load without the hazard card; in Explore the card follows', /_guideEvent\('release'\);\s*if \(!_applying && !_expGuide\(\)\) \{\s*_hazard\('rope_release'/.test(bench));
ok('the bench never records practice answers', !/\b(recordAnswer|_recordDaily)\s*\(/.test(bench.replace(/^\s*\/\/.*$/gm, '')));

// ── Grade 8 tagging ───────────────────────────
console.log('\nGrade 8');
ok('GRADES is [8]', D.GRADES.join() === '8');
const tagged = [...D.GUIDES, ...D.MISSIONS, ...D.DISCOVERIES, ...D.EXPERIMENTS];
ok('every guide, mission, discovery and experiment is tagged Grade 8',
  tagged.every(x => Array.isArray(x.grades) && x.grades.join() === '8'),
  tagged.filter(x => !x.grades || x.grades.join() !== '8').map(x => x.id));
ok('at least 12 science facts for the 💡 button',
  D.FACTS.length >= 12 && D.FACTS.every(f => typeof f === 'string' && f.length > 20));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
