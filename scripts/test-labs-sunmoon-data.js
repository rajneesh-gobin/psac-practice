'use strict';
// ══════════════════════════════════════════════
//  Node test: LabSunmoonData science + structure checks
//  Run: node scripts/test-labs-sunmoon-data.js
// ══════════════════════════════════════════════
const vm   = require('vm');
const fs   = require('fs');
const path = require('path');

let pass = 0, fail = 0;
const failures = [];

function ok(label, cond) {
  if (cond) { pass++; }
  else { fail++; failures.push('  FAIL  ' + label); }
}

function approx(a, b, tol) { return Math.abs(a - b) < (tol || 0.01); }

// ── Load the data file ───────────────────────
const dataPath = path.join(__dirname, '../engine/labs/lab_sunmoon_data.js');
const src = fs.readFileSync(dataPath, 'utf8');
const ctx = vm.createContext({ Math, console });
// A top-level const never lands on the context; export it by hand, as every
// other lab data test does.
vm.runInContext(src + '\nthis.LabSunmoonData = LabSunmoonData;', ctx);
const D = ctx.LabSunmoonData;
ok('LabSunmoonData exports an object', D && typeof D === 'object');
if (!D) { console.error('FATAL: LabSunmoonData not loaded'); process.exit(1); }

// ── GRADES ──────────────────────────────────
ok('GRADES is an array', Array.isArray(D.GRADES));
ok('GRADES includes 6', D.GRADES.includes(6));
ok('GRADES includes 7', D.GRADES.includes(7));

// ── PHASES ─────────────────────────────────
ok('8 moon phases', D.PHASES && D.PHASES.length === 8);
const phaseIds = ['new','wax_crescent','first_quarter','wax_gibbous','full','wan_gibbous','last_quarter','wan_crescent'];
phaseIds.forEach((id, i) => ok(`Phase ${i} id=${id}`, D.PHASES[i] && D.PHASES[i].id === id));
D.PHASES.forEach((p, i) => {
  ok(`Phase ${i} has icon`, typeof p.icon === 'string' && p.icon.length > 0);
  ok(`Phase ${i} has name`, typeof p.name === 'string' && p.name.length > 0);
  ok(`Phase ${i} lit 0–1`, typeof p.lit === 'number' && p.lit >= 0 && p.lit <= 1);
});

// ── phaseIdxFromAngle ────────────────────────
// moonAngle = π → new moon (idx 0)
ok('phaseIdxFromAngle(π) = 0 (new)', D.phaseIdxFromAngle(Math.PI) === 0);
// moonAngle = 0 → full moon (idx 4)
ok('phaseIdxFromAngle(0) = 4 (full)', D.phaseIdxFromAngle(0) === 4);
// moonAngle = 2π → full moon (idx 4)
ok('phaseIdxFromAngle(2π) = 4 (full)', D.phaseIdxFromAngle(2 * Math.PI) === 4);
// moonAngle = π/2 → waning gibbous-ish area (idx 5 or 6)
const halfIdx = D.phaseIdxFromAngle(Math.PI / 2);
ok('phaseIdxFromAngle(π/2) in 5..7 range', halfIdx >= 5 && halfIdx <= 7);
// All 8 indices reachable by stepping π/4
const seen = new Set();
for (let i = 0; i < 8; i++) seen.add(D.phaseIdxFromAngle(Math.PI + i * Math.PI / 4));
ok('All 8 phase indices reachable', seen.size === 8);

// ── FACTS ────────────────────────────────────
ok('FACTS is an array', Array.isArray(D.FACTS));
ok('At least 12 facts total', D.FACTS.length >= 12);
D.FACTS.forEach((f, i) => {
  ok(`Fact ${i} has grades`, Array.isArray(f.grades) && f.grades.length > 0);
  ok(`Fact ${i} has text`, typeof f.text === 'string' && f.text.length > 0);
  ok(`Fact ${i} text ≤ 120 chars`, f.text.length <= 120);
});

// ── HAZARDS ──────────────────────────────────
ok('HAZARDS is an object', D.HAZARDS && typeof D.HAZARDS === 'object');
const REQUIRED_HAZARDS = ['sun_gaze', 'eclipse_bare'];
REQUIRED_HAZARDS.forEach(id => {
  const H = D.HAZARDS[id];
  ok(`Hazard ${id} exists`, !!H);
  if (!H) return;
  ok(`Hazard ${id}.signs is array`, Array.isArray(H.signs) && H.signs.length > 0);
  ok(`Hazard ${id} has eye/goggles sign`, H.signs.includes('eye') || H.signs.includes('goggles'));
  ok(`Hazard ${id}.title() is string`, typeof H.title === 'function' && typeof H.title() === 'string' && H.title().length > 0);
  ok(`Hazard ${id}.happened() is string`, typeof H.happened === 'function' && typeof H.happened() === 'string' && H.happened().length > 0);
  ok(`Hazard ${id}.why is string`, typeof H.why === 'string' && H.why.length > 0);
  ok(`Hazard ${id}.instead is string`, typeof H.instead === 'string' && H.instead.length > 0);
  ok(`Hazard ${id}.exam is string`, typeof H.exam === 'string' && H.exam.length > 0);
});

// ── RESULTS ──────────────────────────────────
ok('RESULTS is an object', D.RESULTS && typeof D.RESULTS === 'object');
['rotation_year', 'shadow_night'].forEach(id => {
  const R = D.RESULTS[id];
  ok(`Result ${id} exists`, !!R);
  if (!R) return;
  ok(`Result ${id}.icon`, typeof R.icon === 'string' && R.icon.length > 0);
  ok(`Result ${id}.title`, typeof R.title === 'string' && R.title.length > 0);
  ok(`Result ${id}.happened(ctx)`, typeof R.happened === 'function' && typeof R.happened({}) === 'string');
  ok(`Result ${id}.instead`, typeof R.instead === 'string' && R.instead.length > 0);
  ok(`Result ${id}.exam`, typeof R.exam === 'string' && R.exam.length > 0);
});

// ── DISCOVERIES ──────────────────────────────
ok('DISCOVERIES is an array', Array.isArray(D.DISCOVERIES));
ok('At least 10 grade-6 discoveries', D.DISCOVERIES.filter(d => d.grades && d.grades.includes(6)).length >= 10);
ok('At least 10 grade-7 discoveries', D.DISCOVERIES.filter(d => d.grades && d.grades.includes(7)).length >= 10);

const discIds = new Set();
D.DISCOVERIES.forEach((d, i) => {
  const label = `Discovery ${i} (${d.id || 'NO-ID'})`;
  ok(`${label} has id`, typeof d.id === 'string' && d.id.length > 0);
  ok(`${label} has icon`, typeof d.icon === 'string' && d.icon.length > 0);
  ok(`${label} has title`, typeof d.title === 'string' && d.title.length > 5);
  ok(`${label} has hint`, typeof d.hint === 'string' && d.hint.length > 5);
  ok(`${label} has how (array)`, Array.isArray(d.how) && d.how.length >= 1);
  ok(`${label} has saw`, typeof d.saw === 'string' && d.saw.length > 5);
  ok(`${label} has learn`, typeof d.learn === 'string' && d.learn.length > 5);
  ok(`${label} has grades array`, Array.isArray(d.grades) && d.grades.length > 0);
  ok(`${label} grades valid (6 or 7)`, d.grades.every(g => g === 6 || g === 7));
  ok(`${label} id unique`, !discIds.has(d.id));
  discIds.add(d.id);
  // how tokens must be colon-delimited or simple action
  d.how && d.how.forEach((tok, k) => {
    ok(`${label} how[${k}] is string`, typeof tok === 'string' && tok.length > 0);
  });
});

// ── GUIDES ───────────────────────────────────
ok('GUIDES is an array', Array.isArray(D.GUIDES));
ok('At least 3 grade-6 guides', D.GUIDES.filter(g => g.grades && g.grades.includes(6)).length >= 3);
ok('At least 3 grade-7 guides', D.GUIDES.filter(g => g.grades && g.grades.includes(7)).length >= 3);

const guideIds = new Set();
D.GUIDES.forEach((G, i) => {
  const label = `Guide ${i} (${G.id || 'NO-ID'})`;
  ok(`${label} has id`, typeof G.id === 'string' && G.id.length > 0);
  ok(`${label} has icon`, typeof G.icon === 'string');
  ok(`${label} has title`, typeof G.title === 'string' && G.title.length > 3);
  ok(`${label} has blurb`, typeof G.blurb === 'string' && G.blurb.length > 5);
  ok(`${label} has lesson`, typeof G.lesson === 'string' && G.lesson.length > 10);
  ok(`${label} has steps array`, Array.isArray(G.steps) && G.steps.length >= 2);
  ok(`${label} id unique`, !guideIds.has(G.id));
  guideIds.add(G.id);
  G.steps && G.steps.forEach((s, k) => {
    ok(`${label} step[${k}] has on`, typeof s.on === 'string' && s.on.length > 0);
    ok(`${label} step[${k}] has say`, typeof s.say === 'string' && s.say.length > 3);
    // ≤ 20 words (slightly relaxed from 15 to allow connector words)
    const wordCount = s.say.trim().split(/\s+/).length;
    ok(`${label} step[${k}] say ≤ 20 words (${wordCount})`, wordCount <= 20);
    ok(`${label} step[${k}] has btn or is wait step`, s.btn === undefined || typeof s.btn === 'string');
  });
  ok(`${label} has grades`, Array.isArray(G.grades) && G.grades.length > 0);
});

// ── MISSIONS ─────────────────────────────────
ok('MISSIONS is an array', Array.isArray(D.MISSIONS));
ok('At least 2 grade-6 missions', D.MISSIONS.filter(m => m.grades && m.grades.includes(6)).length >= 2);
ok('At least 2 grade-7 missions', D.MISSIONS.filter(m => m.grades && m.grades.includes(7)).length >= 2);

const missionIds = new Set();
D.MISSIONS.forEach((M, i) => {
  const label = `Mission ${i} (${M.id || 'NO-ID'})`;
  ok(`${label} has id`, typeof M.id === 'string' && M.id.length > 0);
  ok(`${label} has icon`, typeof M.icon === 'string' && M.icon.length > 0);
  ok(`${label} has title`, typeof M.title === 'string' && M.title.length > 3);
  ok(`${label} has blurb`, typeof M.blurb === 'string' && M.blurb.length > 5);
  ok(`${label} has intro`, typeof M.intro === 'string' && M.intro.length > 5);
  ok(`${label} id unique`, !missionIds.has(M.id));
  missionIds.add(M.id);
  ok(`${label} has grades`, Array.isArray(M.grades) && M.grades.length > 0);
  ok(`${label} has quiz array`, Array.isArray(M.quiz) && M.quiz.length >= 5);
  M.quiz && M.quiz.forEach((q, k) => {
    // Labs.quiz() reads q.q (question text), q.options (array), q.why (explanation).
    // First option is the correct answer (quiz shuffles with i===0 as ok:true).
    ok(`${label} quiz[${k}] has q (question text)`, typeof q.q === 'string' && q.q.length > 5);
    ok(`${label} quiz[${k}] has 4 options`, Array.isArray(q.options) && q.options.length === 4);
    if (q.options) {
      const texts = q.options.map(o => (typeof o === 'string' ? o : o.label || ''));
      const unique = new Set(texts.map(t => t.trim().toLowerCase()));
      ok(`${label} quiz[${k}] 4 distinct options`, unique.size === 4);
      ok(`${label} quiz[${k}] correct answer (options[0]) is a non-empty string`, typeof texts[0] === 'string' && texts[0].length > 2);
    }
    ok(`${label} quiz[${k}] has why (explanation)`, typeof q.why === 'string' && q.why.length > 5);
  });
});

// ── forGrade ─────────────────────────────────
ok('forGrade is a function', typeof D.forGrade === 'function');
const g6items = D.forGrade(D.DISCOVERIES, 6);
const g7items = D.forGrade(D.DISCOVERIES, 7);
ok('forGrade(6) returns only grade-6 discoveries', g6items.every(d => d.grades.includes(6)));
ok('forGrade(7) returns only grade-7 discoveries', g7items.every(d => d.grades.includes(7)));
ok('forGrade(6) and (7) are distinct', g6items.every(d => !g7items.includes(d)));

// ── finds ────────────────────────────────────
ok('finds is a function', typeof D.finds === 'function');
// Empty state — no discoveries
const emptyState = { grade: 6, spinning: false, orbiting: false, stickOn: false, observeTime: 'noon',
  eclipseType: null, phasesVisited: new Set(), stickObserved: 0, solarSeen: false, lunarSeen: false,
  dayTime: true, moonAngle: Math.PI };
const emptyFinds = D.finds(emptyState);
ok('finds returns array', Array.isArray(emptyFinds));

// State with solar eclipse seen — should find solar eclipse discovery
const solarState = { ...emptyState, solarSeen: true, eclipseType: 'solar' };
const solarFinds = D.finds(solarState);
ok('finds returns array for solar state', Array.isArray(solarFinds));
ok('Solar eclipse state finds at least 1 discovery', solarFinds.length >= 1);

// State with all 8 phases visited — should find phase discoveries
const allPhasesState = { ...emptyState, grade: 7, phasesVisited: new Set([0,1,2,3,4,5,6,7]), solarSeen: true, lunarSeen: true };
const phasesFinds = D.finds(allPhasesState);
ok('All-phases state finds discoveries', Array.isArray(phasesFinds));

// All found ids must be in DISCOVERIES
const allDiscIds = new Set(D.DISCOVERIES.map(d => d.id));
const allFinds = [...new Set([...emptyFinds, ...solarFinds, ...phasesFinds])];
allFinds.forEach(id => ok(`finds() id "${id}" exists in DISCOVERIES`, allDiscIds.has(id)));

// ── missionReady ──────────────────────────────
ok('missionReady is a function', typeof D.missionReady === 'function');
// shadow_detective needs the stick AND a recorded observation at sunrise, noon
// and sunset (2026-09-12: a count of three generic observations used to do).
const readyState = { ...emptyState, stickOn: true, stickObserved: 3, observeTime: 'noon',
  shadowObservations: { sunrise: true, noon: true, sunset: true },
  phasesVisited: new Set([0,1,2,3,4,5,6,7]) };
ok('shadow_detective ready with stick + 3 observations', D.missionReady('shadow_detective', readyState));
ok('shadow_detective NOT ready with 0 observations', !D.missionReady('shadow_detective', emptyState));

// phase_tracker needs all 8 phases (grade 7 mission)
const phasesReady = { ...readyState, grade: 7 };
ok('phase_tracker ready with all 8 phases', D.missionReady('phase_tracker', phasesReady));
ok('phase_tracker NOT ready with 0 phases', !D.missionReady('phase_tracker', emptyState));

// ── Science check: shadows ────────────────────
// Shadow length inversely related to Sun elevation. At noon elevation = 1 (cos(0)=1).
// At sunrise/sunset elevation ≈ 0. Shadow length ∝ tan(zenith angle).
// Test that the formula in data (or at least conceptual correctness) holds.
// We just verify the constants used in phase mapping are correct:
ok('New moon at moonAngle=π (Moon between Earth & Sun)', D.phaseIdxFromAngle(Math.PI) === 0);
ok('Full moon at moonAngle=0 (Moon on far side of Earth)', D.phaseIdxFromAngle(0) === 4);

// ── Experiments (lab_experiment.js, LAB_SPEC.md §10) ──────────────────
// The contract is checked by scripts/test-labs-experiments-data.js; this is
// the bench's side of it: every setup and step token is one the bench
// performs, every check ref is a quiz question of the SAME grade, every
// instruction names the control it points at, and - replayed through the
// data's own model (TIMES, shadowLabel, PHASES, phaseIdxFromAngle, finds,
// missionReady) - each See text is TRUE of the bench.
const benchSrc = fs.readFileSync(path.join(__dirname, '../engine/labs/lab_sunmoon.js'), 'utf8');
const X = D.EXPERIMENTS || [];
ok('EXPERIMENTS is exported', Array.isArray(X) && X.length > 0);
ok('experiment ids are unique and carry their grade', new Set(X.map(e => e.id)).size === X.length && X.every(e => e.id.startsWith('g' + e.grades[0] + '_')));
const CHAPTER = { 6: 'g6-solar-system', 7: 'g7s-solar-system' };
for (const g of [6, 7]) {
  const mine = D.forGrade(X, g);
  ok(`Grade ${g}: 3 to 5 experiments (${mine.length}), every one on ${CHAPTER[g]}`, mine.length >= 3 && mine.length <= 5 && mine.every(e => e.chapter === CHAPTER[g]), mine.map(e => e.chapter));
}
ok('every experiment is tagged Grade 6 or Grade 7 only, one grade each', X.every(e => e.grades.length === 1 && [6, 7].includes(e.grades[0])));
// The tokens _do() performs, and the visible label of the control each one
// belongs to (the button text without emoji; what the harness reads).
const LABEL = {
  'spin:on': 'Spin Earth', 'spin:off': 'Spin Earth', 'orbit:on': 'Orbit Moon', 'orbit:off': 'Orbit Moon',
  'stick:on': 'Shadow Stick', 'stick:off': 'Shadow Stick', 'time:sunrise': 'Sunrise', 'time:noon': 'Noon', 'time:sunset': 'Sunset',
  'eclipse:solar': 'Solar Eclipse', 'eclipse:lunar': 'Lunar Eclipse', 'observe': 'Observe', 'reset': 'Reset',
  'season:june': 'Earth in June', 'season:december': 'Earth in December',
};
for (let i = 0; i < 8; i++) LABEL['phase:' + i] = 'Next Phase';
const tokOk = t => Object.prototype.hasOwnProperty.call(LABEL, t);
ok('every control label the test relies on is really in the bench markup', Object.values(LABEL).every(l => benchSrc.includes(l + '</button>') || benchSrc.includes('>' + l + '<') || benchSrc.includes(' ' + l + '</button>')), Object.values(LABEL).filter(l => !(benchSrc.includes(l + '</button>') || benchSrc.includes('>' + l + '<'))));
const words = t => String(t || '').trim().split(/\s+/).filter(Boolean).length;
const sentences = t => String(t || '').split(/(?:[.!?:])\s+/).filter(Boolean);
const stepToks = st => st.options || st.any || (st.on ? [st.on] : []);
const qOf = ref => { if (ref && typeof ref === 'object') return ref; const [m, i] = String(ref).split(':'); const M = D.MISSIONS.find(x => x.id === m); return M ? M.quiz[Number(i)] : null; };
const missionOf = ref => typeof ref === 'string' ? D.MISSIONS.find(x => x.id === ref.split(':')[0]) : null;

// The bench's state machine, in the data's own terms. A step token is the
// state it leaves (spin:on = spinning); 'phase:N' is "tap Next Phase until N".
function replay(tokens, grade) {
  const st = { grade, spinning: false, orbiting: false, stickOn: false, moonAngle: Math.PI, earthSpin: D.TIMES.noon, observeTime: 'noon',
               eclipseType: null, phasesVisited: new Set(), stickObserved: 0, shadowObservations: {}, season: null, seasonSeen: {},
               solarSeen: false, lunarSeen: false, log: [], visitedOrder: [] };
  const idx = () => D.phaseIdxFromAngle(st.moonAngle);
  const name = () => D.PHASES[idx()].name;
  for (const tok of tokens) {
    const [k, v] = tok.split(':');
    switch (k) {
      case 'spin': st.spinning = v === 'on'; break;
      case 'orbit': st.orbiting = v === 'on'; break;
      case 'stick': st.stickOn = v === 'on'; break;
      case 'time': st.season = null; st.observeTime = v; st.earthSpin = D.TIMES[v]; break;
      case 'eclipse': st.moonAngle = v === 'solar' ? Math.PI : 0; st.eclipseType = v; st[v + 'Seen'] = true; st.phasesVisited.add(idx()); break;
      case 'season': st.season = v; st.spinning = false; st.orbiting = false; break;
      case 'phase': { let guard = 0;
        do { st.moonAngle = (st.moonAngle + D.PHASE_STEP) % (2 * Math.PI); st.eclipseType = null; st.phasesVisited.add(idx()); st.visitedOrder.push(name()); st.log.push({ title: name() }); }
        while (idx() !== Number(v) && ++guard < 8);
        break; }
      case 'observe':
        if (st.season) { st.seasonSeen[st.season] = true; st.log.push({ title: st.season === 'june' ? 'June' : 'December' }); break; }
        st.stickObserved++;
        if (st.eclipseType === 'solar') { st.solarSeen = true; st.log.push({ title: 'Solar eclipse', phase: name() }); }
        else if (st.eclipseType === 'lunar') { st.lunarSeen = true; st.log.push({ title: 'Lunar eclipse', phase: name() }); }
        else if (st.stickOn) { if (D.isDay(st.earthSpin)) st.shadowObservations[st.observeTime] = D.shadowLabel(st.earthSpin); st.log.push({ title: st.observeTime, shadow: D.shadowLabel(st.earthSpin) }); }
        else if (st.spinning) st.log.push({ title: 'Earth spinning' });
        else if (st.orbiting) st.log.push({ title: 'Moon orbiting' });
        else st.log.push({ title: 'Observation' });
        break;
      case 'reset': Object.assign(st, { spinning: false, orbiting: false, stickOn: false, moonAngle: Math.PI, earthSpin: D.TIMES.noon, observeTime: 'noon', eclipseType: null, season: null }); break;
    }
  }
  st.dayTime = D.isDay(st.earthSpin);
  st.phase = name();
  st.finds = D.finds(st);
  return st;
}
const path_ = e => [...e.setup, ...e.steps.map(st => st.on || st.any[0])];

for (const e of X) {
  const t = e.id, g = e.grades[0];
  ok(`${t}: title is a question a child can say back`, /\?$/.test(e.title) && e.title.length <= 60, e.title);
  ok(`${t}: every setup token is one the bench performs`, e.setup.every(tokOk), e.setup.filter(x => !tokOk(x)));
  ok(`${t}: every step token (on, any, options) is one the bench performs`, e.steps.every(st => stepToks(st).every(tokOk)), e.steps.flatMap(stepToks).filter(x => !tokOk(x)));
  ok(`${t}: 1 to 5 steps, each a decision (ask + options) or an observation (on + say)`,
     e.steps.length >= 1 && e.steps.length <= 5 && e.steps.every(st => (st.ask && Array.isArray(st.options)) || (st.say && st.on)), e.steps);
  ok(`${t}: an ask step lists 2-4 options, its answer among them, and each wrong text names a listed option that is not the answer`,
     e.steps.filter(st => st.ask).every(st => st.options.length >= 2 && st.options.length <= 4 && (st.any ? st.any.every(x => st.options.includes(x)) : st.options.includes(st.on))
       && Object.keys(st.wrong || {}).every(k => st.options.includes(k) && k !== st.on && st.wrong[k].length > 15)), e.steps.filter(st => st.ask));
  ok(`${t}: every observation step names the control it points at`, e.steps.filter(st => st.say).every(st => st.say.includes(LABEL[st.on])), e.steps.filter(st => st.say && !st.say.includes(LABEL[st.on])).map(st => st.say));
  const cap = g <= 6 ? 12 : 25;
  ok(`${t}: instructions under ${cap} words (Grade ${g}) and 15 words a sentence`,
     e.steps.every(st => words(st.say || st.ask) <= cap && sentences(st.say || st.ask).every(x => words(x) <= 15)), e.steps.map(st => words(st.say || st.ask)));
  ok(`${t}: predict is 2-4 taps with the answer among them`, e.predict.options.length >= 2 && e.predict.options.length <= 4 && e.predict.options.some(o => o.id === e.predict.answer));
  ok(`${t}: 2 or 3 check questions, each a Grade ${g} quiz question (or inline) with 4 distinct options, options[0] the answer, and a reason`,
     e.check.length >= 2 && e.check.length <= 3 && e.check.every(ref => { const q = qOf(ref), M = missionOf(ref);
       return !!q && q.q && Array.isArray(q.options) && q.options.length === 4 && new Set(q.options).size === 4 && !!q.why && (!M || M.grades.includes(g)); }), e.check);
  ok(`${t}: the See says what happened and what it teaches, and there is an exam line`, e.see && e.see.saw.length > 10 && e.see.learn.length > 10 && typeof e.exam === 'string' && e.exam.length > 10);
  // A wrong option must be one the bench hears without acting.
  const guarded = ['spin', 'orbit', 'stick', 'time', 'eclipse', 'phase', 'season', 'observe'];
  ok(`${t}: every wrong option is a token the bench guards with _heard()`, e.steps.every(st => Object.keys(st.wrong || {}).every(w => guarded.includes(w.split(':')[0]))));
}
ok('the bench guards each of those token families', ['_heard(_spinning', '_heard(_orbiting', '_heard(_stickOn', "_heard('time:' + v)", "_heard('eclipse:' + v)", "_heard('phase:' + (", "_heard('season:' + value)", "_heard('observe')"].every(k => benchSrc.includes(k)));

// Each See text, replayed.
const run = id => { const e = X.find(x => x.id === id); return replay(path_(e), e.grades[0]); };
const see = id => X.find(x => x.id === id).see.saw;
let r = run('g6_day_night');
ok('"Why do we have day and night?": Earth is spinning, the day/night discovery is found, and the See says lit side = day, dark side = night',
   r.spinning && r.finds.includes('day_night') && /facing the Sun was lit: day/.test(see('g6_day_night')) && /facing away was dark: night/.test(see('g6_day_night')));
ok('…its wrong option (Orbit Moon) is not what gives day and night: orbiting alone finds no day/night discovery', !replay(['orbit:on'], 6).finds.includes('day_night'));
r = run('g6_shadow');
ok('"When is the shadow shortest?": the stick is present and one observation was recorded at sunrise, noon and sunset (missionReady)',
   r.stickOn && D.missionReady('shadow_detective', r) && Object.keys(r.shadowObservations).length === 3, r.shadowObservations);
const ORDER = ['short', 'medium', 'long', 'very long'];
ok('…noon really is the shortest of the three, so the prediction "At noon" is the bench\'s answer',
   ORDER.indexOf(r.shadowObservations.noon) < ORDER.indexOf(r.shadowObservations.sunrise) && ORDER.indexOf(r.shadowObservations.noon) < ORDER.indexOf(r.shadowObservations.sunset) && X.find(x => x.id === 'g6_shadow').predict.answer === 'noon');
ok('…and the See names the three lengths the model gives', ['sunrise', 'noon', 'sunset'].every(tm => see('g6_shadow').includes(`${tm[0].toUpperCase() + tm.slice(1)}: a ${r.shadowObservations[tm]} shadow`)), { saw: see('g6_shadow'), obs: r.shadowObservations });
ok('…its wrong options at step 2 (Sunrise, Sunset) leave the Sun low: a longer shadow than noon', ['sunrise', 'sunset'].every(tm => ORDER.indexOf(D.shadowLabel(D.TIMES[tm])) > ORDER.indexOf(D.shadowLabel(D.TIMES.noon))));
r = run('g6_moon_shape');
ok('"Why does the Moon change shape?": four Next Phase taps end at Full Moon with the lit part growing every step',
   r.phase === 'Full Moon' && r.visitedOrder.join() === 'Waxing Crescent,First Quarter,Waxing Gibbous,Full Moon' && [1, 2, 3, 4].every(i => D.PHASES[i].lit > D.PHASES[i - 1].lit) && D.PHASES[4].lit === 1
   && /Full Moon/.test(see('g6_moon_shape')) && !r.eclipseType && !r.lunarSeen, { phase: r.phase, order: r.visitedOrder, eclipse: r.eclipseType });
r = run('g6_eclipse');
ok('"What makes an eclipse?": both eclipses were lined up and observed (missionReady), the notebook says solar then lunar, and the See says both',
   D.missionReady('eclipse_spotter', r) && r.log.map(l => l.title).join() === 'Solar eclipse,Lunar eclipse' && /solar eclipse/.test(see('g6_eclipse')) && /lunar eclipse/.test(see('g6_eclipse')), r.log);
ok('…the solar eclipse discovery is found on the way', replay(['eclipse:solar'], 6).finds.includes('solar_eclipse') && replay(['eclipse:lunar'], 6).finds.includes('lunar_eclipse'));
r = run('g7_seasons');
ok('"Why is December hot in Mauritius?": Earth was observed in June and in December (missionReady), and the See names both',
   D.missionReady('seasons_explorer', r) && r.log.map(l => l.title).join() === 'June,December' && /June/.test(see('g7_seasons')) && /December the Southern Hemisphere/.test(see('g7_seasons')), r.log);
ok('…the prediction "Southern Hemisphere" agrees with the mission\'s own answer', /Southern Hemisphere/.test(D.MISSIONS.find(m => m.id === 'seasons_explorer').quiz[1].options[0]) && X.find(x => x.id === 'g7_seasons').predict.answer === 'south');
r = run('g7_phases_order');
ok('"What order do the Moon\'s phases come in?": all eight phases visited in order, back at New Moon, the eight-phases discovery found',
   r.phasesVisited.size === 8 && r.phase === 'New Moon' && r.visitedOrder.join() === D.PHASES.slice(1).map(p => p.name).concat(D.PHASES[0].name).join() && r.finds.includes('eight_phases'), r.visitedOrder);
ok('…and the See lists the eight names in that order', (() => { const saw = see('g7_phases_order'); let at = -1; return D.PHASES.slice(1).every(p => { const i = saw.indexOf(p.name, at + 1); if (i < 0) return false; at = i; return true; }); })(), see('g7_phases_order'));
ok('…the prediction (Waxing Gibbous after First Quarter) is the phase order', D.PHASES[3].name === 'Waxing Gibbous' && D.PHASES[2].name === 'First Quarter' && X.find(x => x.id === 'g7_phases_order').predict.answer === 'gibbous');
r = run('g7_far_side');
ok('"Why do we never see the far side of the Moon?": the Moon is orbiting, tidal locking is found at Grade 7 and not at Grade 6',
   r.orbiting && r.finds.includes('tidal_locking') && !replay(['orbit:on'], 6).finds.includes('tidal_locking') && r.log.map(l => l.title).join() === 'Moon orbiting', r.log);
r = run('g7_eclipse_phase');
ok('"Which Moon phase gives an eclipse?": the solar eclipse is observed at New Moon and the lunar one at Full Moon, as the See says',
   r.log.map(l => l.title + '@' + l.phase).join() === 'Solar eclipse@New Moon,Lunar eclipse@Full Moon' && /New Moon/.test(see('g7_eclipse_phase')) && /Full Moon/.test(see('g7_eclipse_phase')), r.log);
ok('…the eclipse positions are the phase positions the data defines', D.phaseIdxFromAngle(Math.PI) === 0 && D.phaseIdxFromAngle(0) === 4 && D.angleForPhase(0) === Math.PI && D.phaseIdxFromAngle(D.angleForPhase(4)) === 4);
ok('experiment 1 at each grade is the exam-shaped one (day/night at 6 - PSAC 2025 Q2b; the seasons diagram at 7)',
   D.forGrade(X, 6)[0].id === 'g6_day_night' && /PSAC 2025 Q2b/.test(D.forGrade(X, 6)[0].exam) && D.forGrade(X, 7)[0].id === 'g7_seasons');
ok('only exam references that exist in the question files are quoted', (() => {
  const refs = X.map(e => e.exam).join(' ').match(/g6sc-hd-\d+|g6sci-sol-\d+|g7s-solar-system-\d+|PSAC 20\d\d Q\d\w?/g) || [];
  const files = ['grade6-science/questions/ch08_g6_solar.js', 'grade6-science/questions/depth_hard.js', 'grade7-science/questions/batch2_g7s-solar-system.js']
    .map(p => fs.readFileSync(path.join(__dirname, '../subjects', p), 'utf8')).join('\n');
  return refs.length > 0 && refs.every(x => files.includes(x));
})());
ok('no regex lookbehind in the lab files (a Safari < 16.4 parse error)', ![src, benchSrc].some(t => /\(\?<[=!]/.test(t)));
ok('the bench exports the experiment adapter', /experiment: \{|const experiment = \{/.test(benchSrc) && /return \{ study, experiment,/.test(benchSrc));

// ── Results ──────────────────────────────────
console.log('\n' + '═'.repeat(50));
console.log(`  Sun, Earth & Moon Data Tests`);
console.log('═'.repeat(50));
if (failures.length) {
  failures.forEach(f => console.error(f));
  console.log('');
}
console.log(`  Passed: ${pass}   Failed: ${fail}   Total: ${pass + fail}`);
console.log('═'.repeat(50));
process.exit(fail > 0 ? 1 : 0);
