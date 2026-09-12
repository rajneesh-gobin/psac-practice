'use strict';
// Science Labs: the science the Work, Energy & Power lab is allowed to show.
//
// Checks: all work calculations (W = F×d); GPE (mgh); power (P = W/t);
// ramp physics (F = weight×sin30°, d = height/sin30°, W same as lift);
// every discovery has a valid recipe; every hazard/result card is complete;
// every mission has 5+ questions with 4 distinct options and a reason;
// every guide is valid; and Grade 8 tagging.
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

// ── Grounded in the Grade 8 pack ─────────────
console.log('\nGrounded in the Grade 8 pack');
ok('grade8-science declares chapter g8s-work-energy',
  /id: 'g8s-work-energy'/.test(manifest));
ok('the batch file has g8s-work-energy-016..020',
  ['g8s-work-energy-016','g8s-work-energy-017','g8s-work-energy-018','g8s-work-energy-019','g8s-work-energy-020']
  .every(id => q8.includes(`'${id}'`)));
ok('no NCE/PSAC paper reference is quoted (no live Grade 8 paper in the repo)',
  !/20\d\d Q\d/.test(src));

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
  });
});

// ── calcPower ─────────────────────────────────
console.log('\ncalcPower (P = W ÷ t)');
ok('calcPower(10, 2) = 5 W', Math.abs(D.calcPower(10, 2) - 5) < 0.001);
ok('calcPower(5, 0.5) = 10 W', Math.abs(D.calcPower(5, 0.5) - 10) < 0.001);
ok('calcPower(0, 0) returns null (no division by zero)', D.calcPower(0, 0) === null);
ok('calcPower(10, 0) returns null', D.calcPower(10, 0) === null);

// ── Discoveries ──────────────────────────────
console.log('\nDiscoveries');
const all8 = D.forGrade(D.DISCOVERIES, 8);
ok(`at least 12 discoveries for Grade 8 (${all8.length})`, all8.length >= 12);
ok('discovery ids are unique', new Set(D.DISCOVERIES.map(d => d.id)).size === D.DISCOVERIES.length);

// Token validator for energy lab
const tokenOk = on => {
  const [k, a] = on.split(':');
  if (['read','pull','timer'].includes(k)) return a === undefined;
  if (k === 'mode') return ['lift','ramp'].includes(a);
  if (k === 'mass')   return Number(a) >= 0 && Number(a) <= 2;
  if (k === 'height') return Number(a) >= 0 && Number(a) <= 2;
  if (k === 'card')   return !!D.RESULTS[a] || !!D.HAZARDS[a];
  return false;
};

const badDisc = D.DISCOVERIES.filter(d =>
  !d.title || !d.icon || !d.hint || !d.saw || !d.learn ||
  !Array.isArray(d.how) || !d.how.length || !d.how.every(tokenOk) ||
  !(d.rule || d.card));
ok('every discovery has title, icon, hint, saw, learn, a valid recipe and a way to unlock',
  badDisc.length === 0, badDisc.map(d => d.id));

// Rule discoveries: recipe must end with 'read'
const ruleBad = D.DISCOVERIES.filter(d => d.rule && (
  d.how[d.how.length - 1] !== 'read'
));
ok('every rule discovery recipe ends with "read"', ruleBad.length === 0, ruleBad.map(d => d.id));

// Card discoveries: recipe must end with card:<id>
const cardBad = D.DISCOVERIES.filter(d => d.card && d.how[d.how.length - 1] !== 'card:' + d.card);
ok('every card discovery recipe ends with card:<its-card>', cardBad.length === 0, cardBad.map(d => d.id));

ok('every result card has a discovery that shows it',
  Object.keys(D.RESULTS).every(c => D.DISCOVERIES.some(d => d.card === c)));
ok('every hazard has a discovery that can show it',
  Object.keys(D.HAZARDS).every(h => D.DISCOVERIES.some(d => d.card === h || (d.how && d.how.includes('card:' + h)))));

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

// ── Guided experiments ───────────────────────
console.log('\nGuided experiments');
const guides = D.forGrade(D.GUIDES, 8);
ok(`at least 3 guided experiments for Grade 8 (${guides.length})`, guides.length >= 3);
ok('guide ids are unique', new Set(D.GUIDES.map(g => g.id)).size === D.GUIDES.length);
for (const G of D.GUIDES) {
  const bad = G.steps.filter(s => !tokenOk(s.on) || !s.say || !s.btn);
  ok(`${G.title}: every step has a valid token, say and btn`, bad.length === 0, bad);
  ok(`${G.title}: has blurb, icon and lesson`, !!(G.blurb && G.icon && G.lesson));
  const lastOn = G.steps[G.steps.length - 1].on;
  ok(`${G.title}: last step is "read" or a result card`,
    lastOn === 'read' || (lastOn.startsWith('card:') && !!D.RESULTS[lastOn.split(':')[1]]));
}
ok('guides cover lift mode', D.GUIDES.some(G => G.steps.some(s => s.on === 'mode:lift')));
ok('guides cover ramp mode', D.GUIDES.some(G => G.steps.some(s => s.on === 'mode:ramp')));
ok('guides cover the timer', D.GUIDES.some(G => G.steps.some(s => s.on === 'timer')));

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

// Work mission: verify answer is always first option
const wm = D.MISSIONS.find(m => m.id === 'work_it_out');
if (wm) {
  ok('work_it_out mission exists', true);
  // Spot-check first question: W = F×d
  const q0 = wm.quiz[0];
  ok('work_it_out Q1 first option is the correct answer (12 J)',
    q0 && q0.options[0] === '12 J', q0 && q0.options[0]);
}

// Power mission
const pm = D.MISSIONS.find(m => m.id === 'power_race_q');
if (pm) {
  ok('power_race_q mission exists', true);
  const q0 = pm.quiz[0];
  ok('power_race_q Q1 first option is the correct answer (20 W)',
    q0 && q0.options[0] === '20 W', q0 && q0.options[0]);
}

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

// ── Grade 8 tagging ───────────────────────────
console.log('\nGrade 8');
ok('GRADES is [8]', D.GRADES.join() === '8');
const tagged = [...D.GUIDES, ...D.MISSIONS, ...D.DISCOVERIES];
ok('every guide, mission and discovery is tagged Grade 8',
  tagged.every(x => Array.isArray(x.grades) && x.grades.join() === '8'),
  tagged.filter(x => !x.grades || x.grades.join() !== '8').map(x => x.id));
ok('the bench never records practice answers', !/recordAnswer|_recordDaily/.test(bench));
ok('at least 12 science facts for the 💡 button',
  D.FACTS.length >= 12 && D.FACTS.every(f => typeof f === 'string' && f.length > 20));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
