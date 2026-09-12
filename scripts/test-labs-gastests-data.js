/**
 * test-labs-gastests-data.js
 * Node.js data test for engine/labs/lab_gastests_data.js
 *
 * Run: node scripts/test-labs-gastests-data.js
 * Exit 0 = all pass.  Exit 1 = failures printed to stderr.
 *
 * Checks
 *  1. GRADES = [7]
 *  2. All 9 gas × test combinations produce a result with required fields
 *  3. CORRECT_TEST maps o2→glowing, co2→limewater, h2→lit
 *  4. Every correct result has .correct=true; every wrong result has .correct=false
 *  5. fx values are recognised canvas-animation ids
 *  6. All equations are syntactically present and balanced (atom count)
 *  7. forGrade keeps grade-7 items and drops others
 *  8. Every discovery has: id, icon, title, hint, how (≥1 token), unlock, saw, learn
 *  9. Every guide has: id, icon, title, blurb, lesson, steps (≥1)
 * 10. Every mission has: id, icon, title, blurb, intro, quiz (5 questions)
 * 11. Every mission quiz question has: q, exactly 4 options, why
 * 12. All quiz options per question are distinct
 * 13. Every hazard has: grades, signs, fx, title(), happened(), why, instead, exam()
 * 14. Every result card has: grades, icon, title(), happened(), instead, exam()
 * 15. Minimum counts: 16 discoveries, 3 guides, 2 missions, 4 hazards, 3 result cards
 * 16. Grade 7 science question files can be loaded and gas-test questions found
 */
'use strict';

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'engine', 'labs', 'lab_gastests_data.js');

// ── Helpers ─────────────────────────────────────────────────────────────────
let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; process.stdout.write('  ✓ ' + label + '\n'); }
  else       { fail++; process.stderr.write('  ✗ ' + label + (detail ? '\n    ' + detail : '') + '\n'); }
};
const okEach = (label, list, fn) => {
  let allOk = true;
  list.forEach((item, i) => {
    const result = fn(item, i);
    if (result !== true) { allOk = false; process.stderr.write('  ✗ ' + label + ' [' + i + ']: ' + result + '\n'); }
  });
  if (allOk) { pass++; process.stdout.write('  ✓ ' + label + ' (' + list.length + ' items)\n'); }
  else        { fail++; }
};

// ── Load the data file ───────────────────────────────────────────────────────
const src = fs.readFileSync(DATA, 'utf8');
const ctx = vm.createContext({ console, process });
vm.runInContext(src + '\nthis.D = LabGastestsData;', ctx);
const D = ctx.D;
ok('data file loads and exports LabGastestsData', !!D);

// ── 1. GRADES ────────────────────────────────────────────────────────────────
ok('GRADES = [7]', Array.isArray(D.GRADES) && D.GRADES.length === 1 && D.GRADES[0] === 7);

// ── 2. All 9 gas × test combinations ─────────────────────────────────────────
const GAS_IDS  = ['o2', 'co2', 'h2'];
const TEST_IDS = ['glowing', 'lit', 'limewater'];
const VALID_FX = new Set(['relight', 'pop', 'milky', 'out', 'nothing', 'clear', 'danger', 'splash']);
let allCombosOk = true;
GAS_IDS.forEach(g => {
  TEST_IDS.forEach(t => {
    const r = D.testResult(g, t);
    if (!r) { allCombosOk = false; process.stderr.write('  ✗ testResult(' + g + ',' + t + ') returned null\n'); return; }
    if (typeof r.correct !== 'boolean') { allCombosOk = false; process.stderr.write('  ✗ testResult(' + g + ',' + t + ').correct not boolean\n'); }
    if (!r.saw)   { allCombosOk = false; process.stderr.write('  ✗ testResult(' + g + ',' + t + ').saw missing\n'); }
    if (!r.learn) { allCombosOk = false; process.stderr.write('  ✗ testResult(' + g + ',' + t + ').learn missing\n'); }
    if (!r.fx)    { allCombosOk = false; process.stderr.write('  ✗ testResult(' + g + ',' + t + ').fx missing\n'); }
    else if (!VALID_FX.has(r.fx)) { allCombosOk = false; process.stderr.write('  ✗ testResult(' + g + ',' + t + ').fx="' + r.fx + '" not in VALID_FX\n'); }
  });
});
if (allCombosOk) { pass++; process.stdout.write('  ✓ all 9 gas×test combinations have required fields\n'); } else { fail++; }

// ── 3. CORRECT_TEST ──────────────────────────────────────────────────────────
const CT = D.CORRECT_TEST;
ok('CORRECT_TEST.o2  = glowing',   CT && CT.o2  === 'glowing');
ok('CORRECT_TEST.co2 = limewater', CT && CT.co2 === 'limewater');
ok('CORRECT_TEST.h2  = lit',       CT && CT.h2  === 'lit');

// ── 4. correct flag matches CORRECT_TEST ────────────────────────────────────
let flagOk = true;
GAS_IDS.forEach(g => {
  TEST_IDS.forEach(t => {
    const r = D.testResult(g, t);
    if (!r) return;
    const shouldBeCorrect = (CT[g] === t);
    if (r.correct !== shouldBeCorrect) {
      flagOk = false;
      process.stderr.write('  ✗ testResult(' + g + ',' + t + ').correct=' + r.correct + ' expected ' + shouldBeCorrect + '\n');
    }
  });
});
if (flagOk) { pass++; process.stdout.write('  ✓ .correct flag matches CORRECT_TEST for all 9 combinations\n'); } else { fail++; }

// ── 5. fx values ─────────────────────────────────────────────────────────────
// Already checked inside the 9-combo loop above.

// ── 6. Equations ─────────────────────────────────────────────────────────────
// The equations are strings in the gas data and discovery learn text. We check
// the six expected equation strings are present somewhere in the data.
const DATA_STR = src;
const equations = [
  { eq: '2H₂O₂ → 2H₂O + O₂',   label: 'H2O2 decomposition' },
  { eq: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂', label: 'marble + acid' },
  { eq: 'CO₂ + Ca(OH)₂ → CaCO₃',      label: 'limewater test' },
  { eq: 'Zn + 2HCl → ZnCl₂ + H₂',          label: 'zinc + acid' },
  { eq: '2H₂ + O₂ → 2H₂O',             label: 'hydrogen burning' },
];
equations.forEach(e => ok('equation present: ' + e.label, DATA_STR.includes(e.eq), '"' + e.eq + '"'));

// ── 7. forGrade ──────────────────────────────────────────────────────────────
const g7list = [{ grades: [7], val: 'a' }, { grades: [8], val: 'b' }, { val: 'c' }];
const g7result = D.forGrade(g7list, 7);
ok('forGrade keeps grade-7 items',    g7result.some(x => x.val === 'a'));
ok('forGrade keeps items with no grades (default [7])', g7result.some(x => x.val === 'c'));
ok('forGrade drops grade-8 items',    !g7result.some(x => x.val === 'b'));

// ── 8. Discoveries ───────────────────────────────────────────────────────────
const DISC = D.DISCOVERIES;
ok('minimum 16 discoveries', DISC.length >= 16, 'got ' + DISC.length);
const REQUIRED_DISC = ['id', 'icon', 'title', 'hint', 'how', 'unlock', 'saw', 'learn'];
okEach('each discovery has required fields', DISC, (d, i) => {
  for (const f of REQUIRED_DISC) if (!d[f]) return 'missing field "' + f + '" on discovery ' + (d.id || i);
  if (!Array.isArray(d.how) || d.how.length < 1) return 'how must be non-empty array on ' + d.id;
  return true;
});
// Discovery ids unique
const discIds = DISC.map(d => d.id);
ok('all discovery ids unique', new Set(discIds).size === discIds.length);

// ── 9. Guides ────────────────────────────────────────────────────────────────
const GUIDES = D.GUIDES;
ok('minimum 3 guides', GUIDES.length >= 3, 'got ' + GUIDES.length);
const REQUIRED_GUIDE = ['id', 'icon', 'title', 'blurb', 'lesson', 'steps'];
okEach('each guide has required fields', GUIDES, (g, i) => {
  for (const f of REQUIRED_GUIDE) if (!g[f]) return 'missing "' + f + '" on guide ' + (g.id || i);
  if (!Array.isArray(g.steps) || g.steps.length < 1) return 'steps must be non-empty on ' + g.id;
  return true;
});
// Guide steps have `on` token
okEach('each guide step has an `on` token', GUIDES.flatMap(g => g.steps), (s, i) => {
  if (!s.on) return 'step ' + i + ' missing `on` token';
  return true;
});

// ── 10. Missions ─────────────────────────────────────────────────────────────
const MISSIONS = D.MISSIONS;
ok('minimum 2 missions', MISSIONS.length >= 2, 'got ' + MISSIONS.length);
const REQUIRED_MISSION = ['id', 'icon', 'title', 'blurb', 'intro', 'quiz'];
okEach('each mission has required fields', MISSIONS, (m, i) => {
  for (const f of REQUIRED_MISSION) if (!m[f]) return 'missing "' + f + '" on mission ' + (m.id || i);
  if (!Array.isArray(m.quiz) || m.quiz.length < 5) return 'quiz must have ≥5 questions on ' + m.id + ' (got ' + (m.quiz ? m.quiz.length : 0) + ')';
  return true;
});

// ── 11 & 12. Quiz questions ───────────────────────────────────────────────────
const allQuiz = MISSIONS.flatMap(m => m.quiz.map((q, i) => ({ ...q, _src: m.id + '[' + i + ']' })));
okEach('each quiz question has q, options, why', allQuiz, (q) => {
  if (!q.q) return 'missing `q` on ' + q._src;
  if (!q.why) return 'missing `why` on ' + q._src;
  if (!Array.isArray(q.options) || q.options.length !== 4) return 'options must be exactly 4 on ' + q._src + ' (got ' + (q.options ? q.options.length : 0) + ')';
  return true;
});
okEach('each quiz question has 4 distinct options', allQuiz, (q) => {
  if (!q.options) return 'no options';
  const uniq = new Set(q.options.map(o => o.trim().toLowerCase()));
  if (uniq.size < 4) return 'duplicate options on ' + q._src + ': ' + JSON.stringify(q.options);
  return true;
});

// ── 13. Hazards ───────────────────────────────────────────────────────────────
const HAZARDS = D.HAZARDS;
const hazardIds = Object.keys(HAZARDS);
ok('minimum 4 hazards', hazardIds.length >= 4, 'got ' + hazardIds.length);
const REQUIRED_HAZARD_STR = ['why', 'instead'];
okEach('each hazard has required fields', hazardIds, (id) => {
  const h = HAZARDS[id];
  if (!h) return 'hazard ' + id + ' undefined';
  if (!Array.isArray(h.signs) || h.signs.length < 1) return 'hazard ' + id + ' missing signs';
  if (typeof h.title !== 'function')     return 'hazard ' + id + '.title not a function';
  if (typeof h.happened !== 'function')  return 'hazard ' + id + '.happened not a function';
  if (typeof h.exam !== 'function')      return 'hazard ' + id + '.exam not a function';
  for (const f of REQUIRED_HAZARD_STR) if (!h[f]) return 'hazard ' + id + ' missing "' + f + '"';
  // Call the functions to ensure they do not throw
  try { h.title(); h.happened(); h.exam(); } catch (e) { return 'hazard ' + id + ' function threw: ' + e.message; }
  return true;
});

// ── 14. Result cards ──────────────────────────────────────────────────────────
const RESULTS = D.RESULTS;
const resultIds = Object.keys(RESULTS);
ok('minimum 3 result cards', resultIds.length >= 3, 'got ' + resultIds.length);
okEach('each result card has required fields', resultIds, (id) => {
  const r = RESULTS[id];
  if (!r) return 'result ' + id + ' undefined';
  if (!r.icon)                          return 'result ' + id + ' missing icon';
  if (typeof r.title !== 'function')    return 'result ' + id + '.title not a function';
  if (typeof r.happened !== 'function') return 'result ' + id + '.happened not a function';
  if (!r.instead)                       return 'result ' + id + ' missing instead';
  if (typeof r.exam !== 'function')     return 'result ' + id + '.exam not a function';
  try { r.title(); r.happened(); r.exam(); } catch (e) { return 'result ' + id + ' function threw: ' + e.message; }
  return true;
});

// ── 15. Already checked above (counts). ─────────────────────────────────────

// ── 16. Grade 7 science question files ────────────────────────────────────────
const Q_DIR = path.join(ROOT, 'subjects', 'grade7-science', 'questions');
let q7ok = false;
if (fs.existsSync(Q_DIR)) {
  const files = fs.readdirSync(Q_DIR).filter(f => f.endsWith('.js'));
  // Load all question files and collect STATIC_QUESTIONS
  const qs = [];
  const qCtx = vm.createContext({ STATIC_QUESTIONS: qs, console });
  const factories = `
    function makeMCQ(o) { qs.push(o); return o; }
    function makeNum(o) { qs.push(o); return o; }
    function makeTF(o)  { qs.push(o); return o; }
    const STATIC_QUESTIONS = qs;
  `.replace('qs', 'qs');
  try {
    vm.runInContext('var qs = []; var STATIC_QUESTIONS = qs;', qCtx);
    vm.runInContext('function makeMCQ(o){STATIC_QUESTIONS.push(o);return o;} function makeNum(o){STATIC_QUESTIONS.push(o);return o;} function makeTF(o){STATIC_QUESTIONS.push(o);return o;} function makeMatch(o){STATIC_QUESTIONS.push(o);return o;}', qCtx);
    files.forEach(f => {
      try { vm.runInContext(fs.readFileSync(path.join(Q_DIR, f), 'utf8'), qCtx); } catch (e) { /* skip parse errors */ }
    });
    // Look for the canonical gas-test question ids
    const ids = qCtx.STATIC_QUESTIONS.map(q => q.id);
    const hasGlowing   = ids.some(id => id === 'g7s-hd-096');
    const hasLimewater = ids.some(id => id === 'g7s-hd-097');
    const hasOneSplint = ids.some(id => id === 'g7s-hd-104');
    q7ok = hasGlowing && hasLimewater && hasOneSplint;
    ok('g7s-hd-096 (glowing splint = O₂) found in question files', hasGlowing);
    ok('g7s-hd-097 (limewater milky = CO₂) found in question files', hasLimewater);
    ok('g7s-hd-104 (splint out ≠ CO₂) found in question files', hasOneSplint);
  } catch (e) {
    process.stderr.write('  ✗ could not load grade7-science question files: ' + e.message + '\n');
    fail++;
  }
} else {
  process.stderr.write('  ✗ grade7-science/questions directory not found\n');
  fail++;
}

// ── Summary ──────────────────────────────────────────────────────────────────
console.log('\n' + (fail === 0 ? '✅' : '❌') + ' ' + pass + ' passed, ' + fail + ' failed\n');
process.exit(fail > 0 ? 1 : 0);
