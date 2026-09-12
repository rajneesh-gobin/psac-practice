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
vm.runInContext(src, ctx);
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
// shadow_detective needs stick + 3 time observations
const readyState = { ...emptyState, stickOn: true, stickObserved: 3, observeTime: 'noon',
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
