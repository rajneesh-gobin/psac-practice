'use strict';
// Science Labs: the science the Forces & Pressure lab is allowed to show.
//
// Checks: all pressure calculations (P = F/A, unit Pa = N/m²); weight formula
// (W = m×g); every discovery has a valid recipe; every hazard/result card is
// complete; every mission has 5+ questions with 4 distinct options and a reason;
// every guide is valid; and Grade 8 tagging.
//
// Run: node scripts/test-labs-forces-data.js
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const read = (...p) => fs.readFileSync(path.join(ROOT, ...p), 'utf8');
const src = read('engine', 'labs', 'lab_forces_data.js');
const bench = read('engine', 'labs', 'lab_forces.js');
const core = read('engine', 'labs', 'lab_core.js');
const manifest = read('subjects', 'grade8-science', '_manifest.js');
const qdir = path.join(ROOT, 'subjects', 'grade8-science', 'questions');
const q8 = fs.readdirSync(qdir).filter(f => f.endsWith('.js'))
  .map(f => fs.readFileSync(path.join(qdir, f), 'utf8')).join('\n');

const ctx = vm.createContext({});
vm.runInContext(src + '\nthis.D = LabForcesData;', ctx);
const D = ctx.D;

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); }
};

// ── Grounded in the Grade 8 pack ─────────────
console.log('\nGrounded in the Grade 8 pack');
ok('grade8-science declares chapter g8s-forces', /id: 'g8s-forces'/.test(manifest));
ok('grade8-science declares chapter g8s-pressure', /id: 'g8s-pressure'/.test(manifest));
ok('the batch file has g8s-forces-016..020 and g8s-pressure-016..020',
  ['g8s-forces-016','g8s-forces-017','g8s-forces-018','g8s-forces-019','g8s-forces-020',
   'g8s-pressure-016','g8s-pressure-017','g8s-pressure-018','g8s-pressure-019','g8s-pressure-020']
  .every(id => q8.includes(`'${id}'`)));
ok('no NCE/PSAC paper reference is quoted (no live Grade 8 paper in the repo)',
  !/20\d\d Q\d/.test(src));

// ── Weight formula W = m × g ──────────────────
console.log('\nWeight formula (W = m × g, g = 10)');
ok('G_EARTH is 10 N/kg', D.G_EARTH === 10);
const objs = Object.entries(D.OBJECTS);
ok('every object weight = mass × 10 (exact)',
  objs.every(([, o]) => Math.abs(o.weight - o.mass * D.G_EARTH) < 0.0001),
  objs.filter(([, o]) => Math.abs(o.weight - o.mass * D.G_EARTH) >= 0.0001).map(([id, o]) => `${id}: mass=${o.mass} weight=${o.weight}`));
ok('exactly one object exceeds the spring safe limit (the brick)',
  objs.filter(([, o]) => !o.maxSafe).length === 1 &&
  objs.find(([, o]) => !o.maxSafe)[0] === 'brick');
ok('brick weight (25 N) is above SPRING.maxSafe (10 N)',
  D.OBJECTS.brick.weight > D.SPRING.maxSafe);
ok('all safe objects are at or under SPRING.maxSafe',
  objs.filter(([, o]) => o.maxSafe).every(([, o]) => o.weight <= D.SPRING.maxSafe));
ok('spring px-per-N is consistent (maxPx / maxSafe)',
  Math.abs(D.SPRING.pxPerN - D.SPRING.maxPx / D.SPRING.maxSafe) < 0.001);

// ── Pressure calculations P = F/A ─────────────
console.log('\nPressure calculations (P = F ÷ A)');
ok('1 cm² = 0.0001 m² for every pad',
  Object.values(D.PADS).every(p => Math.abs(p.areaM2 - p.areaCm2 * 0.0001) < 1e-10));

const pressure_checks = [
  ['flat', 10, 1000], ['flat', 20, 2000], ['flat', 50, 5000],
  ['tile', 10, 4000], ['tile', 20, 8000], ['tile', 50, 20000],
  ['heel', 10, 50000], ['heel', 20, 100000], ['heel', 50, 250000],
  ['nail', 10, 100000], ['nail', 20, 200000], ['nail', 50, 500000],
];
pressure_checks.forEach(([padId, f, expected]) => {
  const r = D.calcPressure(f, padId);
  ok(`P = ${f} N ÷ ${D.PADS[padId].areaCm2} cm² (${D.PADS[padId].areaM2} m²) = ${expected} Pa`,
    r && r.pa === expected, r && r.pa);
});

ok('calcPressure returns pa, nPerCm2, forceN, areaCm2, areaM2',
  ['pa','nPerCm2','forceN','areaCm2','areaM2'].every(k => D.calcPressure(10,'flat')[k] !== undefined));
ok('calcPressure(undefined, padId) returns null', D.calcPressure(undefined, 'flat') === null);
ok('indentDepth grows with pressure',
  D.indentDepth(100000) > D.indentDepth(1000) &&
  D.indentDepth(500000) > D.indentDepth(100000));
ok('indentDepth is clamped (>= 3, <= 58)',
  D.indentDepth(1) >= 3 && D.indentDepth(1e9) <= 58);

// ── Discoveries ──────────────────────────────
console.log('\nDiscoveries');
const all8 = D.forGrade(D.DISCOVERIES, 8);
ok(`at least 12 discoveries for Grade 8 (${all8.length})`, all8.length >= 12);
ok('discovery ids are unique', new Set(D.DISCOVERIES.map(d => d.id)).size === D.DISCOVERIES.length);

// Token validator
const tokenOk = on => {
  const [k, a] = on.split(':');
  if (['read','apply','remove'].includes(k)) return a === undefined;
  if (k === 'mode') return ['bench','pressure'].includes(a);
  if (k === 'obj')  return !!D.OBJECTS[a];
  if (k === 'pad')  return !!D.PADS[a];
  if (k === 'force')return D.FORCES_N.includes(+a);
  if (k === 'card') return !!D.RESULTS[a] || !!D.HAZARDS[a];
  return false;
};

const badDisc = D.DISCOVERIES.filter(d =>
  !d.title || !d.icon || !d.hint || !d.saw || !d.learn ||
  !Array.isArray(d.how) || !d.how.length || !d.how.every(tokenOk) ||
  !(d.rule || d.card));
ok('every discovery has title, clue, saw, learn, a valid recipe and a way to unlock',
  badDisc.length === 0, badDisc.map(d => d.id));

// Rule discoveries: recipe must end with 'read' and discoveriesFor must include this id
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

// ── Guided experiments ───────────────────────
console.log('\nGuided experiments');
const guides = D.forGrade(D.GUIDES, 8);
ok(`at least 3 guided experiments for Grade 8 (${guides.length})`, guides.length >= 3);
ok('guide ids are unique', new Set(D.GUIDES.map(g => g.id)).size === D.GUIDES.length);
for (const G of D.GUIDES) {
  const bad = G.steps.filter(s => !tokenOk(s.on) || !s.say || !s.btn);
  ok(`${G.title}: every step has a valid action token, a "say" text and a button`, bad.length === 0, bad);
  ok(`${G.title}: has blurb, icon and lesson`, !!(G.blurb && G.icon && G.lesson));
  ok(`${G.title}: last step is "read" or a card`, ['read', ...Object.keys(D.RESULTS).map(c => 'card:' + c)].includes(G.steps[G.steps.length - 1].on));
}
// Bench guide covers weight measurement; pressure guide covers P = F/A
ok('guides cover Force Bench (mode:bench)',
  D.GUIDES.some(G => G.steps.some(s => s.on === 'mode:bench')));
ok('guides cover Pressure Pad (mode:pressure)',
  D.GUIDES.some(G => G.steps.some(s => s.on === 'mode:pressure')));
ok('guides include a comparison (flat plate vs stiletto heel)',
  D.GUIDES.some(G => {
    const ons = G.steps.map(s => s.on);
    return ons.includes('pad:flat') && ons.includes('pad:heel');
  }));

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
ok('spring_survey mission needs wooden, stone, iron, bottle',
  D.MISSIONS.find(M => M.id === 'spring_survey').needs.join() === 'wooden,stone,iron,bottle');
ok('spring_survey objects all exist and are safe',
  D.MISSIONS.find(M => M.id === 'spring_survey').needs.every(id => D.OBJECTS[id] && D.OBJECTS[id].maxSafe));
ok('pressure_detective has 3 scenarios, each with a valid pad and force',
  (() => {
    const M = D.MISSIONS.find(m => m.id === 'pressure_detective');
    return M && M.scenarios.length === 3 &&
      M.scenarios.every(s => D.PADS[s.padId] && D.FORCES_N.includes(s.forceN));
  })());
// Verify pressure_detective scenario pressures are correct
const pd = D.MISSIONS.find(m => m.id === 'pressure_detective');
if (pd) {
  pd.scenarios.forEach(s => {
    const r = D.calcPressure(s.forceN, s.padId);
    ok(`pressure_detective scenario "${s.label}": P = ${r && r.pa} Pa`,
      r && r.pa > 0);
  });
}
ok('no quiz question is repeated across missions',
  (() => {
    const qs = D.MISSIONS.flatMap(M => M.quiz.map(q => q.q));
    return new Set(qs).size === qs.length;
  })());

// ── Hazards and result cards ─────────────────
console.log('\nHazards and result cards');
const kinds = new Set([...core.match(/const SIGN_LABELS = \{([\s\S]*?)\};/)[1].matchAll(/(\w+):/g)].map(m => m[1]));
ok('shell has warning sign (physical hazard)', /warning:/.test(core));
for (const [id, H] of Object.entries(D.HAZARDS)) {
  const ctx = { obj: 'iron block', weight: 5 };
  ok(`hazard ${id}: valid signs, title, happened, why, instead, exam, fx`,
    H.signs.length && H.signs.every(s => kinds.has(s)) &&
    H.title(ctx) && H.happened(ctx) && H.why && H.instead && H.exam && H.fx);
}
ok('overload hazard uses "warning" sign (not chemical hazard)',
  D.HAZARDS.overload.signs.includes('warning') && !D.HAZARDS.overload.signs.includes('corrosive'));
ok('overload is the only hazard (dropping was merged into a result card)',
  Object.keys(D.HAZARDS).length === 1 && !!D.HAZARDS.overload);
for (const [id, R] of Object.entries(D.RESULTS)) {
  const ctx2 = { obj: 'stone', mass: 0.3, weight: 3, nPerCm2: 0.1 };
  const v = x => (typeof x === 'function' ? x(ctx2) : x);
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
