'use strict';
// Science Labs: the science the Forces & Pressure lab is allowed to show.
//
// Checks: all pressure calculations (P = F/A, unit Pa = N/m²); weight formula
// (W = m×g); every discovery has a valid recipe; every hazard/result card is
// complete; every mission has 5+ questions with 4 distinct options and a reason;
// every guide is valid; Grade 8 tagging; and the EXPERIMENTS (LAB_SPEC §10):
// every token is one the bench performs, every See number is what a replay of
// the tokens through OBJECTS / calcPressure really gives, every ask names its
// answer and every check resolves.
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
  if (k === 'val')  return D.VALUES_N.includes(+a);
  if (k === 'name') return !!D.NAMED_FORCES[a];
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
  const bad = G.steps.filter(s => !tokenOk(s.on) || !s.say);
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

// ── Experiments (lab_experiment.js) ──────────
console.log('\nExperiments');
const EX = D.EXPERIMENTS;
ok('EXPERIMENTS is exported', Array.isArray(EX) && EX.length > 0);
const ex8 = D.forGrade(EX || [], 8);
ok(`3 to 5 experiments at Grade 8 (${ex8.length})`, ex8.length >= 3 && ex8.length <= 5);
ok('experiment ids are unique', new Set(EX.map(e => e.id)).size === EX.length);
ok('every experiment teaches g8s-forces or g8s-pressure at Grade 8',
  EX.every(e => ['g8s-forces', 'g8s-pressure'].includes(e.chapter) && Array.isArray(e.grades) && e.grades.join() === '8'));
ok('both chapters get an experiment', ['g8s-forces', 'g8s-pressure'].every(ch => EX.some(e => e.chapter === ch)));
ok('the shelf no longer prints the weight the balance is about to show (meta is the mass only)',
  Object.values(D.OBJECTS).every(o => !/\bN\b/.test(o.meta)), Object.values(D.OBJECTS).map(o => o.meta));
ok('VALUES_N are exactly the four safe object weights', D.VALUES_N.slice().sort((a, b) => a - b).join() ===
  [...new Set(objs.filter(([, o]) => o.maxSafe && o.weight >= 1).map(([, o]) => o.weight))].sort((a, b) => a - b).join(), D.VALUES_N);
ok('NAMED_FORCES has gravity, tension, friction and upthrust, each with a label and a meaning',
  ['gravity', 'tension', 'friction', 'upthrust'].every(id => D.NAMED_FORCES[id] && D.NAMED_FORCES[id].label && D.NAMED_FORCES[id].desc.length > 15)
  && D.SHELF_NAMES.every(id => D.NAMED_FORCES[id]));

// The visible label of the control a token belongs to (lab_forces.js _renderShelf / _shellHTML).
const labelFor = on => {
  const [k, a] = on.split(':');
  if (k === 'mode') return a === 'bench' ? 'Force Bench' : 'Pressure Pad';
  if (k === 'obj') return D.OBJECTS[a].name;
  if (k === 'pad') return D.PADS[a].name;
  if (k === 'force' || k === 'val') return a + ' N';
  if (k === 'name') return D.NAMED_FORCES[a].label;
  if (k === 'apply') return 'Apply force';
  if (k === 'read') return 'Record';
  if (k === 'remove') return 'Remove';
  return null;
};
const plain = x => String(x).replace(/[\u{1F000}-\u{1FAFF}\u{2300}-\u{27BF}\u{FE0F}]/gu, '').replace(/\s+/g, ' ').trim().toLowerCase();
const stepToks = st => st.options || st.any || (st.on ? [st.on] : []);
const num = s => Number(String(s).replace(/[\s,]/g, ''));

// Replay the set-up and the right path of every step through the data's own
// model - OBJECTS for the bench, calcPressure for the pad - exactly as the
// bench performs them (lab_forces.js _do). What it records is what See may claim.
function replay(e) {
  const st = { mode: 'bench', hook: null, pad: 'flat', force: 10, applied: false, reads: [], errs: [] };
  const run = (on, phase) => {
    const [k, a] = on.split(':');
    if (k === 'mode') { st.mode = a; st.hook = null; st.applied = false; }
    else if (k === 'obj') { if (!D.OBJECTS[a].maxSafe) st.errs.push(`${phase}: ${on} overloads the spring`); else { st.mode = 'bench'; st.hook = a; st.applied = false; } }
    else if (k === 'remove') st.hook = null;
    else if (k === 'pad') { st.pad = a; st.applied = false; }
    else if (k === 'force') { st.force = +a; st.applied = false; }
    else if (k === 'apply') { if (st.mode !== 'pressure') st.errs.push(`${phase}: apply on the force bench`); else st.applied = true; }
    else if (k === 'read') {
      if (st.mode === 'bench') { if (!st.hook) st.errs.push(`${phase}: read with nothing on the hook`); else st.reads.push({ kind: 'bench', obj: st.hook, mass: D.OBJECTS[st.hook].mass, weight: D.OBJECTS[st.hook].weight }); }
      else { if (!st.applied) st.errs.push(`${phase}: read before the force was applied`); else { const r = D.calcPressure(st.force, st.pad); st.reads.push({ kind: 'pressure', pad: st.pad, force: st.force, pa: r.pa, depth: D.indentDepth(r.pa) }); } }
    }
    else if (k === 'val') { if (st.mode !== 'bench' || !st.hook) st.errs.push(`${phase}: a reading with nothing hung`); else if (D.OBJECTS[st.hook].weight !== +a) st.errs.push(`${phase}: the right answer ${on} is not what the ${st.hook} weighs`); else run('read', phase); }
    else if (k === 'name') { /* says what the word means; records nothing */ }
    else st.errs.push(`${phase}: unknown token ${on}`);
  };
  (e.setup || []).forEach(on => run(on, 'setup'));
  (e.steps || []).forEach((s, i) => run(s.any ? s.any[0] : s.on, `step ${i + 1}`));
  return st;
}
// Every "<number> N", "<number> Pa" and "<number> kg" in the See text must be
// a fact the replay produced (a recorded weight, mass, force or pressure).
const factsOf = st => {
  const f = new Set();
  st.reads.forEach(r => { if (r.kind === 'bench') { f.add(r.weight + ' N'); f.add(r.mass + ' kg'); } else { f.add(r.force + ' N'); f.add(r.pa + ' Pa'); } });
  return f;
};
const claimsOf = text => [...String(text).matchAll(/(\d[\d\s,.]*?)\s?(N|Pa|kg)\b/g)].map(m => num(m[1]) + ' ' + m[2]);

for (const e of EX) {
  const t = e.id;
  ok(`${t}: the title is a question a child can say back and the aim is short`, /\?$/.test(e.title) && e.title.length <= 60 && e.aim.length >= 20 && e.aim.length <= 200, { title: e.title, aim: e.aim.length });
  const badSetup = (e.setup || []).filter(on => !tokenOk(on));
  ok(`${t}: every set-up token is one the bench performs`, Array.isArray(e.setup) && badSetup.length === 0, badSetup);
  const badStep = e.steps.filter(st => !stepToks(st).every(tokenOk) || !(st.say || st.ask));
  ok(`${t}: every step token is real and each step says something`, badStep.length === 0, badStep);
  ok(`${t}: 1 to 5 steps, each under 25 words`, e.steps.length >= 1 && e.steps.length <= 5 && e.steps.every(st => String(st.say || st.ask).split(/\s+/).length <= 25), e.steps.map(st => String(st.say || st.ask).split(/\s+/).length));
  const asks = e.steps.filter(st => st.ask);
  ok(`${t}: every ask lists its answer among 2+ options, and every wrong option is a listed, different option that explains itself`,
    asks.every(st => Array.isArray(st.options) && st.options.length >= 2 && (st.any ? st.any.every(x => st.options.includes(x)) : st.options.includes(st.on))
      && Object.keys(st.wrong || {}).every(k => st.options.includes(k) && k !== st.on && !(st.any || []).includes(k) && st.wrong[k].length > 15)), asks.map(st => st.ask));
  ok(`${t}: at least one step is a decision`, asks.length >= 1);
  ok(`${t}: no step exists only to switch mode (that belongs in setup)`, !e.steps.some(st => stepToks(st).some(x => x.startsWith('mode:'))));
  const unnamed = e.steps.filter(st => st.say && st.on).filter(st => { const l = labelFor(st.on); return !l || !plain(st.say).includes(plain(l)); });
  ok(`${t}: every instruction names the control it points at`, unnamed.length === 0, unnamed.map(st => st.say));
  // the whole experiment's controls fit the runner's focus budget (test-labs-experiments.js counts <= 6 at a one-token step)
  const allToks = new Set(e.steps.flatMap(stepToks));
  ok(`${t}: at most 6 distinct controls across its steps (${allToks.size})`, allToks.size <= 6, [...allToks]);
  const w = replay(e);
  ok(`${t}: the set-up and the right path work on the bench (nothing read empty, no overload, every right answer is the true reading)`, w.errs.length === 0, w.errs);
  ok(`${t}: something is recorded for the notebook (See shows evidence)`, w.reads.length >= 1, w.reads);
  const facts = factsOf(w), claims = claimsOf(e.see.saw);
  const untrue = claims.filter(c => !facts.has(c));
  ok(`${t}: every number in See (${claims.join(', ')}) is one the replay really produced`, claims.length > 0 && untrue.length === 0, { untrue, facts: [...facts] });
  ok(`${t}: See says what was learnt`, typeof e.see.learn === 'string' && e.see.learn.length > 20);
  const p = e.predict;
  ok(`${t}: the prediction has 2-4 tappable options and its answer is one of them`, p && p.options.length >= 2 && p.options.length <= 4 && p.options.every(o => o.id && o.label) && p.options.some(o => o.id === p.answer), p);
  const qs = e.check.map(ref => typeof ref === 'object' ? ref : (M => M && M.quiz[+ref.split(':')[1]])(D.MISSIONS.find(M => M.id === ref.split(':')[0])));
  ok(`${t}: 2-3 check questions resolve, each with 4 distinct options and a reason`,
    e.check.length >= 2 && e.check.length <= 3 && qs.every(q => q && q.q && Array.isArray(q.options) && q.options.length === 4 && new Set(q.options.map(optLabel)).size === 4 && q.why), e.check.map(r => typeof r === 'object' ? 'inline' : r));
  ok(`${t}: an exam line, with no paper reference invented`, typeof e.exam === 'string' && e.exam.length > 10 && !/20\d\d Q\d/.test(e.exam) && /exam/i.test(e.exam));
}

// The arithmetic behind each See and each prediction, checked against the model.
const byId = id => EX.find(e => e.id === id);
const R = id => replay(byId(id));
{
  const e = byId('weigh_bottle'), w = R('weigh_bottle');
  ok('weigh_bottle: reads the bottle then the stone, and the prediction is the bottle\'s true weight in N',
    !!e && w.reads.map(r => r.obj).join() === 'bottle,stone' && w.reads[0].weight === 10 && w.reads[1].weight === 3 && String(D.OBJECTS.bottle.weight) === e.predict.answer, w.reads);
  ok('weigh_bottle: 1 kg × 10 = 10 N and 0.3 kg × 10 = 3 N, as the See says', D.OBJECTS.bottle.mass * D.G_EARTH === 10 && D.OBJECTS.stone.mass * D.G_EARTH === 3 && /10 N/.test(e.see.saw) && /3 N/.test(e.see.saw));
  ok('weigh_bottle: every wrong reading really is not the object\'s weight', e.steps.filter(s => s.ask).every((s, i) => Object.keys(s.wrong).every(k => +k.split(':')[1] !== w.reads[i].weight)));
}
{
  const e = byId('which_pad'), w = R('which_pad');
  const flat = w.reads.find(r => r.pad === 'flat'), heel = w.reads.find(r => r.pad === 'heel');
  ok('which_pad: the plate is pressed in the set-up (the Aim already shows the dent), then read; then the heel at the SAME force',
    !!e && e.setup.includes('apply') && flat && heel && flat.force === heel.force && flat.force === 10, w.reads);
  ok('which_pad: 10 ÷ 0.01 = 1 000 Pa and 10 ÷ 0.0002 = 50 000 Pa, 50 times more', flat && heel && flat.pa === 1000 && heel.pa === 50000 && heel.pa / flat.pa === 50 && /50 times/.test(e.see.learn));
  ok('which_pad: the heel\'s dent is deeper on the canvas (indentDepth), so "sank much deeper" is what the bench shows', heel && flat && heel.depth > flat.depth + 5, { flat: flat && flat.depth, heel: heel && heel.depth });
  ok('which_pad: the prediction answer is the pad with the higher pressure', e.predict.answer === 'heel');
  const fair = e.steps.find(s => s.ask && s.on === 'force:10');
  ok('which_pad: the fair-test decision offers a different force and explains why it is wrong', !!fair && Object.keys(fair.wrong).some(k => k.startsWith('force:') && k !== 'force:10') && /fair test/i.test(Object.values(fair.wrong)[0]));
}
{
  const e = byId('more_force'), w = R('more_force');
  const [a, b] = w.reads;
  ok('more_force: two readings on the same tile, 10 N then 50 N', !!e && w.reads.length === 2 && a.pad === 'tile' && b.pad === 'tile' && a.force === 10 && b.force === 50, w.reads);
  ok('more_force: 10 ÷ 0.0025 = 4 000 Pa and 50 ÷ 0.0025 = 20 000 Pa, exactly five times', a && b && a.pa === 4000 && b.pa === 20000 && b.pa / a.pa === 5 && /five times/.test(e.see.saw) && e.predict.answer === 'x5');
  ok('more_force: the second dent is deeper (indentDepth grows with pressure)', a && b && b.depth > a.depth, { a: a && a.depth, b: b && b.depth });
  ok('more_force: the learn line reaches pressure in fluids (deeper water, more force above)', /water/i.test(e.see.learn) && /depth|deep/i.test(e.see.learn));
}
{
  const e = byId('which_force'), w = R('which_force');
  ok('which_force: the bottle hangs from the set-up, both asks are force names, and the reading is 10 N',
    !!e && e.setup.includes('obj:bottle') && e.steps.filter(s => s.ask).every(s => s.on.startsWith('name:') && s.options.every(o => o.startsWith('name:'))) && w.reads.length === 1 && w.reads[0].weight === 10, w.reads);
  ok('which_force: down is gravity, up is tension, and the See says both are 10 N (balanced)', e.steps[0].on === 'name:gravity' && e.steps[1].on === 'name:tension' && e.predict.answer === 'gravity' && (e.see.saw.match(/10 N/g) || []).length === 2);
  ok('which_force: every option of the ask steps is a named force the shelf shows', e.steps.filter(s => s.ask).every(s => s.options.every(o => D.SHELF_NAMES.includes(o.split(':')[1]))));
}
ok('the first experiment is the exam-shaped one: reading a spring balance in newtons', EX[0].id === 'weigh_bottle' && EX[0].chapter === 'g8s-forces');
const inlineQ = EX.flatMap(e => e.check.filter(r => typeof r === 'object').map(r => r.q));
ok('no inline check question repeats a mission question or another inline one', new Set(inlineQ).size === inlineQ.length && !inlineQ.some(q => D.MISSIONS.some(M => M.quiz.some(x => x.q === q))));
const refQ = EX.flatMap(e => e.check.filter(r => typeof r === 'string'));
ok('no mission question is used as a check twice', new Set(refQ).size === refQ.length, refQ);
ok('the bench exports the experiment adapter (list, question, reset, apply, guide, stop, evidence, focus, selector, hooks)',
  ['list', 'question', 'reset', 'apply', 'guide', 'stop', 'evidence', 'focus', 'selector', 'hooks'].every(k => new RegExp('\\b' + k + ':').test(bench.slice(bench.indexOf('const experiment = {')))) && /return \{ study, experiment,/.test(bench));
ok('the bench hears every token before matching, matches `any`, glows every option, and hands Done to the runner',
  /experiment\.hooks\.token\(token, s\)/.test(bench) && /s\.any\.includes\(token\)/.test(bench) && /experiment\.hooks\.done\(\)/.test(bench) && /experiment\.hooks\.step\(_guide\.step\)/.test(bench) && /s\.options \|\| s\.any \|\| \(s\.on \? \[s\.on\] : \[\]\)/.test(bench));
ok('a listed wrong option is heard but not acted on (pad, force, reading, object, apply, read)',
  ["_expWrong('obj:' + id)", "_expWrong('pad:' + id)", "_expWrong('force:' + n)", "_expWrong('val:' + n)", "_expWrong('apply')", "_expWrong('read')"].every(k => bench.includes(k)));
ok('set-up is silent: no discovery toast and no first-time card while _silent', /if \(_silent\) return;/.test(bench) && (bench.match(/!_exp\(\) && !_silent/g) || []).length === 2);
ok('the force buttons use data-fn (the parser lowercases data-fN, so dataset.fN never matched)', !/data-fN|dataset\.fN/.test(bench) && /dataset\.fn/.test(bench));

// ── Grade 8 tagging ───────────────────────────
console.log('\nGrade 8');
ok('GRADES is [8]', D.GRADES.join() === '8');
const tagged = [...D.GUIDES, ...D.MISSIONS, ...D.DISCOVERIES];
ok('every guide, mission and discovery is tagged Grade 8',
  tagged.every(x => Array.isArray(x.grades) && x.grades.join() === '8'),
  tagged.filter(x => !x.grades || x.grades.join() !== '8').map(x => x.id));
ok('the bench never records practice answers', !/\b(recordAnswer|_recordDaily)\s*\(/.test(bench.replace(/^\s*\/\/.*$/gm, '')));
ok('at least 12 science facts for the 💡 button',
  D.FACTS.length >= 12 && D.FACTS.every(f => typeof f === 'string' && f.length > 20));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
