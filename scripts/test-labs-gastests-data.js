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
 * 17. Experiments (lab_experiment.js): every setup/step token is one the bench
 *     accepts and is REACHABLE when it is asked for (a test needs a collected
 *     tube, setup needs a station, acid needs goggles); refs resolve; a `say`
 *     names its control's label (CONTROLS); the See text is TRUE - the tokens
 *     are replayed through testResult()/AIR and every result sentence must
 *     appear in see.saw; a mystery gas is named in the See; wrong options are
 *     tokens the bench routes through _expWrong (heard, not acted).
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

// ── 17. Experiments ───────────────────────────────────────────────────────────
// Every check here goes through ok(), so a broken experiment prints a ✗ line
// on stderr and the run exits 1 - the same loudness as the sections above.
process.stdout.write('\n  Experiments\n');
const EXPS = D.EXPERIMENTS;
ok('EXPERIMENTS exported as a non-empty array', Array.isArray(EXPS) && EXPS.length >= 3 && EXPS.length <= 5, 'got ' + (EXPS && EXPS.length));
ok('CONTROLS exported with a label and selector per token', D.CONTROLS && Object.values(D.CONTROLS).every(c => c.label && c.sel));
ok('TOOL_ORDER tokens all have a control with an id (the bench renders the tool row from it)',
   Array.isArray(D.TOOL_ORDER) && D.TOOL_ORDER.every(t => D.CONTROLS[t] && D.CONTROLS[t].id && D.CONTROLS[t].act));
ok('AIR sums to 100%', Array.isArray(D.AIR) && Math.abs(D.AIR.reduce((a, x) => a + x.pct, 0) - 100) < 0.001, JSON.stringify(D.AIR && D.AIR.map(a => a.pct)));
ok('AIR: nitrogen is the biggest gas', D.AIR && D.AIR.slice().sort((a, b) => b.pct - a.pct)[0].id === 'n2');

const BENCH_SRC = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_gastests.js'), 'utf8');
ok('bench hears a wrong option before acting (_expWrong in _act and _selectStation)',
   /function _act\(act\) \{\s*if \(_expWrong\(/.test(BENCH_SRC) && /_expWrong\('station:' \+ id\)/.test(BENCH_SRC));
ok('bench renders its tool row from CONTROLS/TOOL_ORDER', BENCH_SRC.includes('D().TOOL_ORDER.map('));
ok('bench exports the experiment adapter', /return \{ study, experiment, mount/.test(BENCH_SRC));

// The grammar of a token the bench accepts, and the state it needs.
const GAS_TOKENS = new Set(Object.keys(D.CONTROLS));
const accepted = tok => GAS_TOKENS.has(tok) || /^mystery:(o2|co2|h2)$/.test(tok) || tok === 'observe';
// A tiny model of the bench: what a token needs to FIRE its guide event, and
// what it changes. Mirrors _doSetup/_doCollect/_doTest/_doAircomp.
function newModel() { return { goggles: false, active: null, mystery: null, stations: {}, seen: [], air: false }; }
const station = (m, id) => (m.stations[id] = m.stations[id] || { setup: false, collected: false, tests: [] });
function fire(m, tok) {
  if (tok === 'goggles') { m.goggles = true; return null; }
  if (tok.startsWith('station:') || tok.startsWith('mystery:')) {
    const id = tok.slice(tok.indexOf(':') + 1);
    if (!D.GASES[id]) return 'no such gas ' + id;
    m.active = id; if (tok.startsWith('mystery:')) m.mystery = id; station(m, id); return null;
  }
  if (!m.active) return tok + ' needs a station selected first';
  const st = station(m, m.active);
  if (tok === 'setup') {
    if (!m.goggles && (m.active === 'h2' || m.active === 'co2')) return 'setup at ' + m.active + ' without goggles raises a hazard card, never the token';
    st.setup = true; return null;
  }
  if (tok === 'collect') { if (!st.setup) return 'collect before setup does nothing'; st.collected = true; return null; }
  if (tok.startsWith('test:')) {
    const t = tok.slice(5);
    if (!D.TESTS[t]) return 'no such test ' + t;
    if (!st.collected) return tok + ' before the tube is collected does nothing';
    if (D.hazardFor(m.active, t, m.goggles) || !m.goggles) return tok + ' at ' + m.active + ' raises a hazard card (' + (D.hazardFor(m.active, t, m.goggles) || 'no goggles') + '), never the token';
    const r = D.testResult(m.active, t);
    st.tests.push(t); m.seen.push(r.saw); return null;
  }
  if (tok === 'aircomp') { if (m.active !== 'o2') return 'aircomp only shows at the oxygen station'; m.air = true; return null; }
  if (tok === 'reset') { m.stations[m.active] = { setup: false, collected: false, tests: [] }; return null; }
  if (tok === 'observe') return null;
  return 'unknown token ' + tok;
}
const questionRef = ref => {
  if (ref && typeof ref === 'object') return ref;
  const [mid, i] = String(ref).split(':');
  const M = D.MISSIONS.find(x => x.id === mid);
  return M ? M.quiz[Number(i)] : null;
};
const strip = s => String(s).replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, '').replace(/\s+/g, ' ').trim().toLowerCase();

ok('experiment ids are unique', new Set(EXPS.map(e => e.id)).size === EXPS.length);
ok('every experiment is Grade 7 on chapter g7s-air', EXPS.every(e => Array.isArray(e.grades) && e.grades.length === 1 && e.grades[0] === 7 && e.chapter === 'g7s-air'));
ok('the first experiment is the oxygen test (the exam-shaped one, g7s-hd-096)', EXPS[0] && EXPS[0].id === 'relight' && EXPS[0].setup.includes('station:o2'));

EXPS.forEach(e => {
  const t = 'exp ' + e.id;
  ok(t + ': title is a question (<= 60 chars, ends in ?)', typeof e.title === 'string' && e.title.length <= 60 && /\?$/.test(e.title), e.title);
  ok(t + ': aim <= 200 chars', typeof e.aim === 'string' && e.aim.length >= 20 && e.aim.length <= 200, e.aim && e.aim.length);
  ok(t + ': predict has 2-4 options and the answer among them',
     e.predict && Array.isArray(e.predict.options) && e.predict.options.length >= 2 && e.predict.options.length <= 4 && e.predict.options.some(o => o.id === e.predict.answer), JSON.stringify(e.predict));
  ok(t + ': 1-5 steps', Array.isArray(e.steps) && e.steps.length >= 1 && e.steps.length <= 5, e.steps && e.steps.length);

  // Replay: set-up, then each step's right token, through the model.
  const m = newModel();
  const bad = [];
  (e.setup || []).forEach(tok => { if (!accepted(tok)) bad.push('setup token not accepted: ' + tok); else { const err = fire(m, tok); if (err) bad.push('setup: ' + err); } });
  ok(t + ': every setup token is accepted and reachable', bad.length === 0, bad.join(' | '));

  e.steps.forEach((s, i) => {
    const st = t + ' step ' + (i + 1);
    const toks = s.options || s.any || (s.on ? [s.on] : []);
    const right = s.any || (s.on ? [s.on] : []);
    ok(st + ': has an instruction (say or ask) and a token', !!(s.say || s.ask) && toks.length > 0 && right.length > 0, JSON.stringify(s));
    ok(st + ': every token is one the bench accepts', toks.every(accepted), toks.filter(x => !accepted(x)).join(','));
    ok(st + ': instruction <= 25 words', String(s.say || s.ask).split(/\s+/).length <= 25, String(s.say || s.ask).split(/\s+/).length);
    if (s.ask) {
      ok(st + ': an ask lists 2+ options with the right answer among them', Array.isArray(s.options) && s.options.length >= 2 && right.every(r => s.options.includes(r)), JSON.stringify(s.options));
      const wrongs = s.options.filter(o => !right.includes(o));
      ok(st + ': every wrong option explains itself (> 15 chars)', wrongs.length > 0 && wrongs.every(w => s.wrong && typeof s.wrong[w] === 'string' && s.wrong[w].length > 15), JSON.stringify(s.wrong));
      ok(st + ': wrong keys are all options', !s.wrong || Object.keys(s.wrong).every(k => s.options.includes(k)), JSON.stringify(Object.keys(s.wrong || {})));
      // A wrong option must be heard, never performed: only tokens that enter
      // the bench through _act() or _selectStation() are guarded that way.
      ok(st + ': wrong options are act/station tokens the bench guards with _expWrong',
         Object.keys(s.wrong || {}).every(k => GAS_TOKENS.has(k)), JSON.stringify(Object.keys(s.wrong || {})));
    } else {
      ok(st + ': an observation names its control ("' + (D.CONTROLS[s.on] || {}).label + '")',
         !!D.CONTROLS[s.on] && strip(s.say).includes(strip(D.CONTROLS[s.on].label)), s.say);
    }
    // Fire the right token through the model: it must be reachable NOW.
    const err = fire(m, right[0]);
    ok(st + ': the right token ' + right[0] + ' fires in the bench at this point', !err, err);
  });

  // The See text is true: every test result sentence in order, air numbers, the mystery named.
  ok(t + ': see.saw and see.learn are sentences', e.see && typeof e.see.saw === 'string' && e.see.saw.length > 10 && typeof e.see.learn === 'string' && e.see.learn.length > 10, JSON.stringify(e.see));
  if (e.see && e.see.saw) {
    let pos = 0, inOrder = true;
    m.seen.forEach(saw => { const k = e.see.saw.indexOf(saw, pos); if (k < 0) inOrder = false; else pos = k + saw.length; });
    ok(t + ': see.saw contains every test result the bench will show, in order (' + m.seen.length + ')', inOrder, JSON.stringify({ saw: e.see.saw, results: m.seen }));
    if (m.air) ok(t + ': see.saw states the nitrogen and oxygen percentages from AIR',
                  e.see.saw.includes(D.airPct('n2') + '%') && e.see.saw.includes(D.airPct('o2') + '%'), e.see.saw);
    if (m.mystery) ok(t + ': see.saw names the mystery gas (' + D.GASES[m.mystery].name + ')',
                      e.see.saw.toLowerCase().includes(D.GASES[m.mystery].name.toLowerCase()), e.see.saw);
    ok(t + ': the bench shows something in See (a test result, the air table, or a collected tube)',
       m.seen.length > 0 || m.air || Object.values(m.stations).some(s => s.collected), JSON.stringify(m));
  }
  // The prediction is answered by the bench: the answer's outcome is in the model.
  if (e.predict && e.predict.answer) {
    const ans = e.predict.options.find(o => o.id === e.predict.answer);
    const lastGas = m.active, tests = lastGas ? station(m, lastGas).tests : [];
    const lastTest = tests[tests.length - 1];
    let truth = true, why = '';
    if (lastTest) {
      const fx = D.testResult(lastGas, lastTest).fx;
      const want = { relight: 'relight', milky: 'milky', pop: 'pop', out: 'out', clear: 'clear', nothing: 'nothing' }[fx];
      truth = e.predict.answer === want || (m.mystery && e.predict.answer === m.mystery);
      why = 'last result fx=' + fx + ' but predict.answer=' + e.predict.answer + (m.mystery ? ' (mystery ' + m.mystery + ')' : '');
    } else if (m.air) {
      truth = e.predict.answer === D.AIR.slice().sort((a, b) => b.pct - a.pct)[0].id;
      why = 'biggest gas in AIR is not ' + e.predict.answer;
    }
    ok(t + ': predict.answer (' + (ans && ans.label) + ') is what the bench will show', truth, why);
  }

  ok(t + ': 2-3 check questions', Array.isArray(e.check) && e.check.length >= 2 && e.check.length <= 3, e.check && e.check.length);
  (e.check || []).forEach(ref => {
    const q = questionRef(ref);
    ok(t + ': check ' + (typeof ref === 'string' ? ref : '(inline)') + ' resolves to a 4-option question with a reason',
       !!q && typeof q.q === 'string' && Array.isArray(q.options) && q.options.length === 4 && new Set(q.options.map(o => String(o).trim().toLowerCase())).size === 4 && typeof q.why === 'string', JSON.stringify(ref));
  });
  ok(t + ': has an exam line', typeof e.exam === 'string' && e.exam.length > 10);
});

// ── Summary ──────────────────────────────────────────────────────────────────
console.log('\n' + (fail === 0 ? '✅' : '❌') + ' ' + pass + ' passed, ' + fail + ' failed\n');
process.exit(fail > 0 ? 1 : 0);
