'use strict';
// Parent-controlled Game Zone settings — measured through the REAL modules
// (engine/game_settings.js + engine/minigame.js) in a VM. Covers:
//   defaults for existing children · save/reload per child · at-least-one
//   subject · custom % always 100 · excluded subjects get nothing · 40/30/30
//   → 4/3/3 · no duplicates · difficulty cap · adaptive never above cap ·
//   weak-topic mode reads real progress · small pools fall back only to
//   included subjects · invalid MCQs rejected · single-subject games ignore
//   the mix · a child session has no save path · every game still opens and
//   completes · every edited JS file parses.
// Run: node scripts/test-game-settings.js
const fs = require('node:fs'), vm = require('node:vm'), path = require('node:path'), assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const ROOT = path.resolve(__dirname, '..');
let checks = 0, fails = 0;
const ok = (cond, msg) => { checks++; if (!cond) { fails++; console.log('  FAIL ' + msg); } };
const eq = (a, b, msg) => ok(JSON.stringify(a) === JSON.stringify(b), msg + ' (got ' + JSON.stringify(a) + ', want ' + JSON.stringify(b) + ')');

// ── 18. Syntax of every edited file ─────────────────────────────
for (const f of ['engine/game_settings.js', 'engine/minigame.js', 'engine/auth.js', 'engine/app.js', 'sw.js']) {
  let good = true;
  try { execFileSync(process.execPath, ['--check', path.join(ROOT, f)], { stdio: 'pipe' }); } catch (_) { good = false; }
  ok(good, f + ' passes node --check');
}

// ── A VM context that looks enough like the browser ─────────────
function makeCtx(opts) {
  const els = {};
  const stubEl = id => els[id] || (els[id] = {
    id, innerHTML: '', textContent: '', disabled: false, style: {}, value: '',
    classList: { _s: new Set(), add(...c) { c.forEach(x => this._s.add(x)); }, remove(...c) { c.forEach(x => this._s.delete(x)); }, toggle(c, on) { on ? this._s.add(c) : this._s.delete(c); }, contains(c) { return this._s.has(c); } },
    setAttribute() {}, appendChild() {}, remove() {}, focus() {},
  });
  const storage = {};
  const ctx = vm.createContext({
    window: {},
    document: { body: stubEl('body'), getElementById: stubEl, querySelectorAll: () => [], querySelector: () => null, createElement: () => stubEl('_tmp' + Math.random()) },
    sessionStorage: { getItem: k => (k in storage ? storage[k] : null), setItem: (k, v) => { storage[k] = String(v); }, removeItem: k => { delete storage[k]; } },
    setTimeout: fn => { fn(); return 0; }, clearTimeout: () => {}, setInterval: () => 0, clearInterval: () => {},
    navigator: {}, location: { protocol: 'https:', hostname: 'example.test', origin: 'https://example.test' },
    confirm: () => true, toast: (m) => { ctx.toasts.push(m); }, launchConfetti: () => {}, save: () => { ctx.saves++; },
    toasts: [], saves: 0,
    DB: opts.DB || { stats: { totalAttempted: 0 }, games: {}, restrictions: {}, chapters: {} },
    acct: { id: 'kid-1', grade: 5 },
    Auth: opts.Auth || { getActiveAccount: () => ctx.acct },
    SUBJECT_PACKS: opts.packs, STATIC_QUESTIONS: opts.questions,
    console: { warn: (...a) => { ctx.warnings.push(a); }, log() {}, error() {} }, warnings: [],
  });
  ctx.els = els; ctx.storage = storage;
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'engine/game_settings.js'), 'utf8'), ctx, { filename: 'game_settings.js' });
  for (const f of ['minigame_gk', 'minigame_words', 'minigame_geo', 'minigame_time', 'minigame'])
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'engine', f + '.js'), 'utf8'), ctx, { filename: f + '.js' });
  // Top-level const declarations never land on the context object; fetch them.
  ctx.GameSettings = vm.runInContext('GameSettings', ctx);
  ctx.MiniGames = vm.runInContext('MiniGames', ctx);
  return ctx;
}

// Five grade-5 packs, 3 chapters each; plus one grade-6 pack the child must never see.
const SUBJ = [['maths', 'Mathematics'], ['english', 'English'], ['french', 'French'], ['science', 'Science'], ['histgeo', 'History & Geography']];
const packs = SUBJ.map(([k, name]) => ({ id: 'grade5-' + k, grade: 5, subject: name, name, icon: '📘', comingSoon: false,
  chapters: [0, 1, 2].map(i => ({ id: `g5${k}-ch${i}`, name: `${name} chapter ${i}` })) }));
packs.push({ id: 'grade6-maths', grade: 6, subject: 'Mathematics', name: 'Mathematics', comingSoon: false, chapters: [{ id: 'g6maths-ch0', name: 'G6 maths' }] });
function bank(perChapterPerLevel) {
  const qs = [];
  for (const p of packs) for (const c of p.chapters) for (let d = 1; d <= 4; d++) for (let i = 0; i < perChapterPerLevel; i++)
    qs.push({ id: `${c.id}-d${d}-${i}`, chapterId: c.id, type: 'mcq', difficulty: d, subsection: 'x',
      question: `Q ${c.id} d${d} #${i}`, options: ['w1', 'w2', 'w3', 'RIGHT'], answer: 'RIGHT' });
  return qs;
}
const subjectOfId = id => id.replace(/^g\d/, '').replace(/-.*$/, '');
// The card re-renders from Auth.getActiveAccount(), so the stub must agree with the id shown.
const show = (c, id) => { c.acct = { id, grade: 5 }; c.GameSettings.renderParentCard(c.acct); };
const seeded = (seed) => () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };

// ── 1. Existing children (no saved settings) get safe defaults ──
{
  const c = makeCtx({ packs, questions: bank(3) });
  const GS = c.GameSettings;
  const avail = GS.availableSubjects(GS.gradePacks(5, packs)).map(a => a.key);
  eq(avail, ['maths', 'english', 'french', 'science', 'histgeo'], 'grade 5 exposes exactly its five subjects');
  const s = GS.normalise(undefined, avail);
  eq(s, { mode: 'balanced', difficulty: 'medium', roundLength: 10, weakChapters: false, avoidRecent: true, generalKnowledge: false, subjects: avail, percents: null }, 'defaults: balanced, all subjects, medium, 10, weak off, avoid-recent on, GK off');
  eq(GS.normalise({ mode: 'bogus', difficulty: 'nope', roundLength: 7, subjects: ['klingon'] }, avail).mode, 'balanced', 'garbage normalises to defaults');
  ok(GS.summary(s, GS.availableSubjects(GS.gradePacks(5, packs))) === 'Balanced questions · All subjects · Medium difficulty · 10 questions per round', 'collapsed summary reads as specified');
  ok(GS.capLevel(s, {}) === 3, 'Medium tops out at level 3');
  ok(GS.capLevel(GS.normalise({ difficulty: 'challenging' }, avail), { maxDifficulty: 2 }) === 2, 'the practice cap still wins over Challenging');
  ok(GS.capLevel(GS.normalise({ difficulty: 'adaptive' }, avail), { maxDifficulty: 1 }) === 1, 'Adaptive respects a Level-1 practice cap');
}

// ── 2 … 14 run inside an async block so saves can be awaited ──
(async () => {
  {
    const writes = [];
    const c = makeCtx({ packs, questions: bank(2) });
    c.ACTIVE_STUDENT_ID = 'kid-1';
    c.Store = { updateStudent: async (id, u) => { writes.push({ id, settings: JSON.parse(JSON.stringify(u.settings)) }); return { ok: writes.length !== 2 }; } };
    vm.runInContext(`
      var PD = { refreshControls() {} };
      Auth.saveGameSettings = async function(next) {
        const prev = JSON.stringify(DB.restrictions);
        DB.restrictions.games = next;
        const res = await Store.updateStudent(ACTIVE_STUDENT_ID, { settings: DB.restrictions });
        if (!res.ok) { DB.restrictions = JSON.parse(prev); return false; }
        return true;
      };`, c);
    const GS = c.GameSettings;
    show(c, 'kid-1');
    GS.openCard();
    GS.setMode('custom'); GS.toggleSubject('french'); GS.setDifficulty('challenging'); GS.setRound(15); GS.toggleFlag('weakChapters');
    await GS.save();
    ok(writes.length === 1 && writes[0].id === 'kid-1', 'save writes the selected child only');
    const saved = writes[0].settings.games;
    ok(saved.mode === 'custom' && !saved.subjects.includes('french') && saved.difficulty === 'challenging' && saved.roundLength === 15 && saved.weakChapters === true, 'saved object carries every edited field');
    ok(Object.values(saved.percents).reduce((a, b) => a + b, 0) === 100 && !('french' in saved.percents), 'saved percentages total 100 and omit the excluded subject');
    ok(!GS._debug().open && c.els['pd-game-settings'].innerHTML.includes('Custom mix'), 'card collapses and its summary updates immediately after a successful save');
    // Reload for THIS child: what the child's DB.restrictions.games will hold.
    const reloaded = GS.normalise(saved, ['maths', 'english', 'french', 'science', 'histgeo']);
    eq(reloaded.subjects, ['maths', 'english', 'science', 'histgeo'], 'reload restores the subject list');
    // A different child: no bleed-through — fresh defaults.
    c.DB.restrictions = {};
    show(c, 'kid-2');
    ok(c.els['pd-game-settings'].innerHTML.includes('Balanced questions · All subjects'), 'switching to another child shows that child\'s (default) settings, not the last draft');
    // Network failure: nothing pretends to be saved.
    c.DB.restrictions = {};
    show(c, 'kid-3');
    GS.openCard(); GS.setRound(20);
    await GS.save();
    ok(writes.length === 2 && GS._debug().open && c.els['pd-game-settings'].innerHTML.includes('Not saved'), 'a refused write keeps the panel open and says "Not saved"');
    ok(!c.DB.restrictions.games, 'a refused write rolls the in-memory settings back');
  }

  // ── 3. At least one subject must remain ─────────────────────────
  {
    const c = makeCtx({ packs, questions: bank(1) });
    const GS = c.GameSettings;
    show(c, 'k'); GS.openCard();
    for (const k of ['maths', 'english', 'french', 'science']) GS.toggleSubject(k);
    eq(GS._debug().draft.subjects, ['histgeo'], 'four subjects can be turned off');
    GS.toggleSubject('histgeo');
    eq(GS._debug().draft.subjects, ['histgeo'], 'the last subject cannot be turned off');
    ok(c.els['pd-game-settings'].innerHTML.includes('Keep at least one subject on'), 'and the parent is told why in plain words');
    ok(GS.normalise({ subjects: [] }, ['maths', 'english']).subjects.length === 2, 'an empty saved list normalises to all subjects');
  }

  // ── 4. Custom percentages always total 100 ──────────────────────
  {
    const c = makeCtx({ packs, questions: bank(1) });
    const GS = c.GameSettings;
    const keys = ['maths', 'english', 'french', 'science', 'histgeo'];
    const sum = p => Object.values(p).reduce((a, b) => a + b, 0);
    eq(GS.equalSplit(keys), { maths: 20, english: 20, french: 20, science: 20, histgeo: 20 }, 'equal split of five');
    eq(GS.equalSplit(['a', 'b', 'c']), { a: 34, b: 33, c: 33 }, 'equal split of three still totals 100 with integers');
    let p = GS.equalSplit(keys);
    const rng = seeded(7);
    for (let i = 0; i < 300; i++) {
      const k = keys[Math.floor(rng() * keys.length)];
      p = GS.rebalance(p, k, Math.round(rng() * 100), keys);
      if (sum(p) !== 100 || Object.values(p).some(v => v < 0 || !Number.isInteger(v))) { ok(false, 'rebalance drifted at step ' + i + ': ' + JSON.stringify(p)); break; }
    }
    ok(sum(p) === 100, '300 random slider moves: total is always exactly 100 with integer shares');
    p = GS.rebalance({ maths: 40, english: 30, science: 30 }, 'maths', 60, ['maths', 'english', 'science']);
    eq(p, { maths: 60, english: 20, science: 20 }, 'raising one share lowers the others in proportion');
    p = GS.rebalance({ maths: 100, english: 0, science: 0 }, 'maths', 70, ['maths', 'english', 'science']);
    eq(p, { maths: 70, english: 15, science: 15 }, 'others at zero share the remainder equally');
    eq(GS.rebalance({}, 'maths', 40, ['maths']), { maths: 100 }, 'a single subject is always 100');
    const n = GS.normalise({ mode: 'custom', percents: { maths: 50, english: 50, french: 50 }, subjects: ['maths', 'english', 'french'] }, keys);
    ok(sum(n.percents) === 100, 'a saved over-100 set normalises back to 100');
    const n2 = GS.normalise({ mode: 'custom', percents: { maths: 40, english: 60, french: 30 }, subjects: ['maths', 'english'] }, keys);
    ok(!('french' in n2.percents) && sum(n2.percents) === 100, 'an excluded subject never keeps a share');
  }

  // ── 5 + 6 + 7. Excluded subjects get nothing; 40/30/30 → 4/3/3; no duplicates ──
  {
    const c = makeCtx({ packs, questions: bank(3) });
    const GS = c.GameSettings;
    const pool = GS.buildPool({ questions: c.STATIC_QUESTIONS, packs: GS.gradePacks(5, packs), grade: 5, minOptions: 4 });
    ok(pool.length === 5 * 3 * 4 * 3, 'the pool holds every valid grade-5 question and none from grade 6');
    const settings = GS.normalise({ mode: 'custom', subjects: ['maths', 'english', 'science'], percents: { maths: 40, english: 30, science: 30 } }, ['maths', 'english', 'french', 'science', 'histgeo']);
    const rng = seeded(11);
    let exact = 0;
    for (let run = 0; run < 50; run++) {
      const res = GS.pick({ count: 10, pool, settings, cap: 3, caps: GS.GAMES.quickfire, rng });
      const counts = {}; res.questions.forEach(q => { counts[q._subject] = (counts[q._subject] || 0) + 1; });
      if (counts.maths === 4 && counts.english === 3 && counts.science === 3 && !counts.french && !counts.histgeo) exact++;
      ok(new Set(res.questions.map(q => q._id)).size === res.questions.length, 'run ' + run + ': no duplicate question ids');
      ok(res.questions.every(q => subjectOfId(q._id) === q._subject), 'run ' + run + ': tagged subject matches the chapter');
    }
    ok(exact === 50, '40/30/30 on a 10-question round is 4/3/3 in all 50 runs (got ' + exact + ')');
    const res = GS.pick({ count: 20, pool, settings: GS.normalise({ subjects: ['french'] }, ['maths', 'english', 'french', 'science', 'histgeo']), cap: 4, caps: GS.GAMES.billionaire, rng });
    ok(res.questions.length === 20 && res.questions.every(q => q._subject === 'french'), 'French-only settings yield 20 French questions and nothing else');
    // Spread: the parent's 4 maths are not the first four questions.
    const spread = GS.spread({ maths: 4, english: 3, science: 3 });
    ok(spread.slice(0, 4).filter(s => s === 'maths').length < 4, 'subjects are interleaved through the round, not clumped');
    eq(spread.length, 10, 'spread covers every slot');
  }

  // ── 8 + 9. Difficulty cap and adaptive never above it ───────────
  {
    const c = makeCtx({ packs, questions: bank(3) });
    const GS = c.GameSettings;
    const pool = GS.buildPool({ questions: c.STATIC_QUESTIONS, packs: GS.gradePacks(5, packs), grade: 5, minOptions: 4 });
    const avail = ['maths', 'english', 'french', 'science', 'histgeo'];
    for (const [diff, capR, want] of [['basic', 4, 2], ['medium', 4, 3], ['challenging', 4, 4], ['challenging', 2, 2], ['adaptive', 4, 4], ['adaptive', 1, 1]]) {
      const s = GS.normalise({ difficulty: diff }, avail);
      const cap = GS.capLevel(s, { maxDifficulty: capR });
      ok(cap === want, `${diff} with practice cap ${capR} → level ${want}`);
      const res = GS.pick({ count: 20, pool, settings: s, cap, caps: GS.GAMES.quickfire, rng: seeded(3), adaptiveLevel: 4 });
      ok(res.questions.length === 20 && res.questions.every(q => q._level <= cap), `${diff}/${capR}: every picked level ≤ ${cap}`);
    }
    // A game ladder asking for level 4 is clamped too.
    const s = GS.normalise({ difficulty: 'basic' }, avail);
    const res = GS.pick({ count: 6, pool, settings: s, cap: 2, caps: GS.GAMES.billionaire, levels: [4, 4, 4, 3, 3, 1], rng: seeded(5) });
    ok(res.questions.every(q => q._level <= 2), 'a ladder that asks for level 4 gets level 2 under a Basic cap');
    // Adaptive state machine.
    c.DB.games = {};
    for (let i = 0; i < 9; i++) GS.adaptiveAnswer(true, 3);
    ok(c.DB.games.adaptive.level === 3, 'nine correct in a row climb to the cap (3)…');
    for (let i = 0; i < 9; i++) GS.adaptiveAnswer(true, 3);
    ok(c.DB.games.adaptive.level === 3, '…and never past it');
    GS.adaptiveAnswer(false, 3); GS.adaptiveAnswer(false, 3);
    ok(c.DB.games.adaptive.level === 2, 'two wrong in a row step down one level');
    for (let i = 0; i < 10; i++) GS.adaptiveAnswer(false, 3);
    ok(c.DB.games.adaptive.level === 1, 'never below level 1');
    ok(GS.adaptiveLevel(1) === 1 && GS.adaptiveLevel(4) === 1, 'the read side clamps to the cap as well');
    // The plan itself: adaptive at level 4 under cap 2 uses only 1–2.
    eq(Array.from(new Set(GS.levelPlan(10, GS.normalise({ difficulty: 'adaptive' }, avail), 2, 4))).sort(), [1, 2], 'adaptive plan under cap 2 uses only levels 1–2');
  }

  // ── 10. Weak-topic mode uses real progress data ─────────────────
  {
    const c = makeCtx({ packs, questions: bank(5) });   // 45 maths questions under the Medium cap: enough for a 40-long stream
    const GS = c.GameSettings;
    const pool = GS.buildPool({ questions: c.STATIC_QUESTIONS, packs: GS.gradePacks(5, packs), grade: 5, minOptions: 4 });
    const avail = ['maths', 'english', 'french', 'science', 'histgeo'];
    const progress = {
      'g5maths-ch0': { attempted: 40, correct: 8 },    // struggling in maths
      'g5maths-ch1': { attempted: 20, correct: 4 },
      'g5english-ch0': { attempted: 40, correct: 39 }, // mastered english
      'g5english-ch1': { attempted: 20, correct: 20 },
    };
    const s = GS.normalise({ mode: 'weak', subjects: ['maths', 'english'] }, avail);
    let maths = 0, eng = 0;
    for (let r = 0; r < 40; r++) { const res = GS.pick({ count: 10, pool, settings: s, cap: 3, caps: GS.GAMES.quickfire, progress, rng: seeded(r + 1) }); res.questions.forEach(q => q._subject === 'maths' ? maths++ : eng++); }
    ok(maths > eng * 2, `weak mode: struggling maths gets more than twice the mastered english (${maths} vs ${eng})`);
    const sBal = GS.normalise({ mode: 'balanced', subjects: ['maths', 'english'] }, avail);
    const bal = GS.pick({ count: 10, pool, settings: sBal, cap: 3, caps: GS.GAMES.quickfire, progress, rng: seeded(2) });
    ok(bal.questions.filter(q => q._subject === 'maths').length === 5, 'balanced mode ignores progress: 5/5');
    // Weak chapters inside a subject: ch0/ch1 weak, ch2 unknown → ch2 is drawn least.
    const sCh = GS.normalise({ subjects: ['maths'], weakChapters: true }, avail);
    const chCount = { 'g5maths-ch0': 0, 'g5maths-ch1': 0, 'g5maths-ch2': 0 };
    const prog2 = { 'g5maths-ch0': { attempted: 30, correct: 3 }, 'g5maths-ch1': { attempted: 30, correct: 29 } };
    for (let r = 0; r < 60; r++) GS.pick({ count: 8, pool, settings: sCh, cap: 4, caps: GS.GAMES.quickfire, progress: prog2, rng: seeded(r + 100) }).questions.forEach(q => chCount[q._chapterId]++);
    ok(chCount['g5maths-ch0'] > chCount['g5maths-ch1'] * 1.5, `weak-chapter focus prefers the 10% chapter over the 97% one (${chCount['g5maths-ch0']} vs ${chCount['g5maths-ch1']})`);
    // Recent avoidance: with enough fresh questions, none of the recent ones appear.
    const recent = pool.filter(e => e.subject === 'science').slice(0, 30).map(e => e.id);
    const r1 = GS.pick({ count: 10, pool, settings: GS.normalise({ subjects: ['science'] }, avail), cap: 4, caps: GS.GAMES.quickfire, recent, rng: seeded(9) });
    ok(r1.questions.every(q => !recent.includes(q._id)), 'recent questions are avoided while fresh ones remain');
    const r2 = GS.pick({ count: 10, pool, settings: GS.normalise({ subjects: ['science'], avoidRecent: false }, avail), cap: 4, caps: GS.GAMES.quickfire, recent, rng: seeded(9) });
    ok(r2.questions.some(q => recent.includes(q._id)), 'with the toggle off they are not avoided');
    c.DB.games = {};
    GS.markUsed(Array.from({ length: 200 }, (_, i) => 'id' + i));
    ok(c.DB.games.recent.length === 150 && c.DB.games.recent[0] === 'id50', 'the recent list is capped at 150, newest kept');
  }

  // ── 11. Small pools fall back only to INCLUDED subjects ─────────
  {
    const c = makeCtx({ packs, questions: bank(3) });
    const GS = c.GameSettings;
    // Only two French questions exist; French asked for 50%.
    const qs = c.STATIC_QUESTIONS.filter(q => subjectOfId(q.id) !== 'french').concat(c.STATIC_QUESTIONS.filter(q => subjectOfId(q.id) === 'french').slice(0, 2));
    const pool = GS.buildPool({ questions: qs, packs: GS.gradePacks(5, packs), grade: 5, minOptions: 4 });
    const s = GS.normalise({ mode: 'custom', subjects: ['french', 'science'], percents: { french: 50, science: 50 } }, ['maths', 'english', 'french', 'science', 'histgeo']);
    const res = GS.pick({ count: 10, pool, settings: s, cap: 4, caps: GS.GAMES.quickfire, rng: seeded(4) });
    ok(res.questions.length === 10, 'the round is still full (10)');
    ok(res.questions.filter(q => q._subject === 'french').length === 2, 'both French questions were used');
    ok(res.questions.filter(q => q._subject === 'science').length === 8, 'the shortfall came from Science, the other INCLUDED subject');
    ok(res.questions.every(q => q._subject !== 'maths' && q._subject !== 'english' && q._subject !== 'histgeo'), 'never from an excluded subject');
    ok(res.warnings.length === 3 && res.warnings.every(w => w.wanted === 'french' && w.used === 'science'), 'each fallback slot is reported for developers');
    ok(new Set(res.questions.map(q => q._id)).size === 10, 'still no duplicates');
    // Nothing usable at all → the readable reason, not an empty crash.
    const none = GS.pick({ count: 10, pool, settings: GS.normalise({ subjects: ['histgeo'] }, ['histgeo']), cap: 4, caps: GS.GAMES.quickfire, rng: seeded(1) });
    const poolNoHist = pool.filter(e => e.subject !== 'histgeo');
    const empty = GS.pick({ count: 10, pool: poolNoHist, settings: GS.normalise({ subjects: ['histgeo'] }, ['histgeo']), cap: 4, caps: GS.GAMES.quickfire, rng: seeded(1) });
    ok(none.questions.length === 10 && empty.questions.length === 0 && empty.reason === GS.NO_QUESTIONS_MSG, 'an empty included subject returns the parent-facing reason');
    ok(/Try another game or ask your parent to adjust Game Settings/.test(GS.NO_QUESTIONS_MSG), 'the reason text is the specified one');
    // Grade scoping: grade-6 questions never appear without cross-grade permission.
    const g6 = GS.buildPool({ questions: c.STATIC_QUESTIONS, packs, grade: 5, minOptions: 4, crossGrade: false });
    ok(g6.every(e => !e.id.startsWith('g6')), 'grade-6 questions are excluded from a grade-5 child\'s pool');
    const g6x = GS.buildPool({ questions: c.STATIC_QUESTIONS, packs, grade: 5, minOptions: 4, crossGrade: true });
    ok(g6x.some(e => e.id.startsWith('g6') && e.own === false), 'with cross-grade permission they are present but marked not-own (used last)');
  }

  // ── 12. Invalid MCQs are rejected ───────────────────────────────
  {
    const c = makeCtx({ packs, questions: [] });
    const GS = c.GameSettings;
    const good = { id: 'a', type: 'mcq', question: 'Q?', options: ['1', '2', '3', '4'], answer: '3' };
    ok(GS.isValidMCQ(good, 4), 'a well-formed MCQ passes');
    ok(!GS.isValidMCQ(Object.assign({}, good, { answer: '9' }), 4), 'answer not among options → rejected');
    ok(!GS.isValidMCQ(Object.assign({}, good, { options: ['1', '2', '3', '3'], answer: '3' }), 4), 'duplicate options → rejected');
    ok(!GS.isValidMCQ(Object.assign({}, good, { options: ['1', '', '3', '4'] }), 4), 'an empty option → rejected');
    ok(!GS.isValidMCQ(Object.assign({}, good, { options: ['1', '2', '3'] }), 4), 'three options where the game shows four → rejected');
    ok(GS.isValidMCQ(Object.assign({}, good, { options: ['1', '2'], answer: '2' }), 2), '…but fine for a two-option game');
    ok(!GS.isValidMCQ(Object.assign({}, good, { options: ['1', '2', '3', '4', '5'], answer: '5' }), 4), 'answer sitting fifth (never shown) → rejected');
    ok(!GS.isValidMCQ(Object.assign({}, good, { question: '<img src=x>' }), 4), 'no readable question text → rejected');
    ok(!GS.isValidMCQ(Object.assign({}, good, { type: 'num' }), 4), 'a numeric question → rejected');
    ok(!GS.isValidMCQ(Object.assign({}, good, { id: undefined }), 4), 'no id → rejected (cannot dedupe or track)');
    ok(!GS.isValidMCQ(null, 4), 'null → rejected');
  }

  // ── 13. Subject-specific games ignore the mix ───────────────────
  {
    const c = makeCtx({ packs, questions: bank(5) });   // 45 maths questions under the Medium cap: enough for a 40-long stream
    const GS = c.GameSettings, MG = c.MiniGames;
    for (const [k, g] of Object.entries(GS.GAMES))
      ok(['supportsSubjectMix', 'supportsDifficulty', 'supportsRoundLength', 'supportsWeakTopics', 'supportsGeneralKnowledge', 'supportsRecentAvoidance'].every(f => typeof g[f] === 'boolean'), k + ': every capability flag declared');
    ok(GS.GAMES.billionaire.supportsSubjectMix && GS.GAMES.quickfire.supportsSubjectMix && GS.GAMES.battle.supportsSubjectMix, 'the three quiz games take the subject mix');
    ok(!GS.GAMES.wordbuilder.supportsSubjectMix && !GS.GAMES.timetravel.supportsSubjectMix && !GS.GAMES.explorer.supportsSubjectMix && !GS.GAMES.ninja.supportsSubjectMix, 'single-subject and no-question games do not');
    ok(!GS.GAMES.explorer.supportsDifficulty && !GS.GAMES.ninja.supportsDifficulty, 'Explorer and Ninja take no question settings at all');
    // Word Builder with English EXCLUDED still runs (its words are its own bank) and honours round length + difficulty.
    c.DB.restrictions = { games: { subjects: ['maths'], mode: 'custom', percents: { maths: 100 }, roundLength: 15, difficulty: 'basic' } };
    MG.startWords();
    const w = MG._wbDebug();
    ok(w && !w.over && w.idx === 0, 'Word Builder opens with English excluded from the quiz mix');
    ok(JSON.parse(c.storage['psac-mg-state:anon']).wb.words.length === 15, 'Word Builder uses the 15-question round length');
    const bands = JSON.parse(c.storage['psac-mg-state:anon']).wb.words.map(x => x.band);
    ok(bands.every(b => b <= 2) && bands.filter(b => b === 1).length >= 10, 'Basic difficulty keeps the crossing mostly band-1 words');
    MG.wbQuit();
    c.DB.restrictions = { games: { roundLength: 5, difficulty: 'challenging' } };
    MG.startWords();
    const b2 = JSON.parse(c.storage['psac-mg-state:anon']).wb.words.map(x => x.band);
    ok(b2.length === 5 && b2.every(b => b >= 2), 'Challenging + 5 = five band-2/3 words');
    MG.wbQuit();
    // Time Traveller: Basic keeps to band 1, Challenging starts at band 2.
    c.DB.restrictions = { games: { difficulty: 'basic' } };
    let rounds = MG._pickTimeTravel();
    const T = c.window.MINIGAME_TIME, bandOf = label => T.find(f => f.label === label).band;
    const n1 = T.filter(f => f.band === 1).length, used1 = rounds ? rounds.flat().filter(f => bandOf(f.label) === 1).length : 0;
    ok(rounds && used1 >= Math.min(n1, rounds.flat().length) - 3, 'Time Traveller on Basic uses up the band-1 events before falling back (' + used1 + ' of ' + n1 + ')');
    c.DB.restrictions = { games: { difficulty: 'challenging' } };
    rounds = MG._pickTimeTravel();
    ok(rounds && rounds.flat().filter(f => bandOf(f.label) >= 2).length > rounds.flat().length * 0.7, 'Time Traveller on Challenging is mostly band 2–3 (bank falls back only when short)');
    // Mixed games: the percentages reach the game. Quick Fire with a maths-only mix.
    c.DB.restrictions = { games: { subjects: ['maths'] } };
    MG.startQuick();
    const qf = MG._qfDebug();
    ok(qf && qf.pool.length === 40 && qf.pool.every(q => subjectOfId(q.id) === 'maths'), 'Quick Fire stream is 40 questions, all maths');
    ok(c.DB.games.recent.length === 40, 'a started game records its questions as recent');
    MG.qfQuit();
  }

  // ── 14. Children cannot edit parent Game Settings (client side) ─
  {
    // The only write path is Auth.saveGameSettings → Store.updateStudent →
    // students.settings, which RLS restricts to the family's adults
    // (scripts/sql-tests/game-settings-rls.js proves the server half).
    const c = makeCtx({ packs, questions: bank(1) });
    const GS = c.GameSettings;
    const hub = fs.readFileSync(path.join(ROOT, 'engine/minigame.js'), 'utf8');
    ok(!/GameSettings\.(save|setMode|toggleSubject|setPercent|setDifficulty|setRound|toggleFlag|openCard)\b/.test(hub), 'the child-facing games never call a settings mutator');
    ok(!/DB\.restrictions\.games\s*=/.test(hub), 'minigame.js never assigns DB.restrictions.games');
    show(c, 'k'); GS.openCard(); GS.setRound(20);
    return GS.save().then(() => {
      ok(GS._debug().status === 'error' && GS._debug().open, 'with no Auth.saveGameSettings (a child session) Save cannot succeed and says so');
      const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
      const mgScreen = html.slice(html.indexOf('id="screen-minigames"'), html.indexOf('id="screen-analytics"'));
      ok(!/pd-game-settings|GameSettings\./.test(mgScreen), 'the Game Zone screen carries no parent controls');
      const ctrl = html.slice(html.indexOf('data-tab="controls"'), html.indexOf('<!-- Study reminder -->'));
      ok(ctrl.includes('id="pd-game-settings"') && ctrl.includes('🎯 Game settings'), 'the card sits inside the child\'s Controls tab');
      ok(html.indexOf('engine/game_settings.js') < html.indexOf('engine/minigame_gk.js'), 'game_settings.js loads before the games');
      const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
      ok(sw.includes("'/engine/game_settings.js'"), 'game_settings.js is in the SW shell list');
      const auth = fs.readFileSync(path.join(ROOT, 'engine/auth.js'), 'utf8');
      ok(/async function saveGameSettings\(next\)[\s\S]*?_saveRestrictions\(prev/.test(auth) && /toggleMinigamesDisabled, saveGameSettings,/.test(auth), 'Auth.saveGameSettings goes through _saveRestrictions (rollback on failure) and is exported');
    });
  }
})().then(() => {
  // ── 15. Every game still opens and completes ────────────────────
  const c = makeCtx({ packs, questions: bank(3) });
  const MG = c.MiniGames, GS = c.GameSettings;
  MG.renderHub();
  const hub = c.els['mg-hub'].innerHTML;
  ok(hub.includes('Your game mix: all subjects · Medium'), 'hub shows the friendly one-line mix summary');
  ok((hub.match(/PLAY ›/g) || []).length === 7, 'seven playable cards');
  ok(!hub.includes('brainy general knowledge'), 'hub does not promise GK questions when the parent has them off');
  // Billionaire: 20 rungs filled, GK off → 20 textbook; answer all correctly.
  MG.startBillionaire();
  let d = MG._debug();
  ok(d && d.rung === 0 && !d.over, 'Billionaire starts');
  const g = JSON.parse(c.storage['psac-mg-state:anon']).g;
  ok(g.qs.length === 20 && g.qs.every(q => !q._gk), 'GK off: all 20 rungs are textbook questions');
  ok(g.qs.every(q => q._level <= 3), 'default Medium: no rung above level 3');
  ok(g.qs.slice(0, 5).every(q => q._level <= 2), 'the first rungs are the easy ones');
  for (let i = 0; i < 25 && !MG._debug().over; i++) { const q = JSON.parse(c.storage['psac-mg-state:anon'] || '{"g":{"qs":[]}}').g; const cur = g.qs[MG._debug().rung]; MG.answer(cur.options.indexOf(cur.answer)); void q; }
  ok(c.DB.games.billionaire && c.DB.games.billionaire.bestPrize === 1000000000, 'a perfect climb wins the billion');
  ok(c.DB.games.adaptive && c.DB.games.adaptive.level === 3, 'adaptive level climbed with the streak but stopped at the Medium cap (3)');
  // GK on: the last five are GK from included subjects only.
  c.DB.restrictions = { games: { generalKnowledge: true, subjects: ['maths', 'science'] } };
  MG.startBillionaire();
  const g2 = JSON.parse(c.storage['psac-mg-state:anon']).g;
  ok(g2.qs.length === 20 && g2.qs.slice(15).every(q => q._gk) && g2.qs.slice(0, 15).every(q => !q._gk), 'GK on: rungs 16–20 are general knowledge');
  const GK = c.window.MINIGAME_GK;
  ok(g2.qs.slice(15).every(q => ['maths', 'science'].includes(GK.find(x => x.question === q.question).subject)), 'GK questions come only from the included subjects');
  MG.confirmQuit();
  // Quick Fire completes.
  c.DB.restrictions = {};
  MG.startQuick();
  for (let i = 0; i < 12; i++) { const q = MG._qfDebug(); if (!q || q.over) break; MG.qfAnswer(3); }
  ok(MG._qfDebug() && MG._qfDebug().score > 0, 'Quick Fire scores correct answers');
  MG.qfQuit();
  // Brain Battle: 5 rounds by default (round length 10), 8 by round length 15.
  let bb = MG._pickBattle();
  ok(bb.rounds === 5 && bb.qs.length === 16, 'round length 10 → a 5-round duel with 3 sudden-death spares');
  c.DB.restrictions = { games: { roundLength: 20 } };
  bb = MG._pickBattle();
  ok(bb.rounds === 10 && bb.qs.length === 26, 'round length 20 → a 10-round duel');
  ok(bb.qs.every((q, i, a) => i % 2 || q._level === a[i + 1]._level), 'each round\'s pair shares one level');
  c.DB.restrictions = {};
  MG.startBattle();
  ok(MG._bbDebug() && MG._bbDebug().phase === 'ready', 'Brain Battle opens on the handover screen');
  MG.bbQuit();
  // Explorer, Ninja, Time Traveller untouched by settings.
  MG.startExplorer(); ok(MG._exDebug() && !MG._exDebug().over, 'Island Explorer opens'); MG.exQuit();
  MG.startNinja(); ok(MG._njDebug() && !MG._njDebug().over, 'Number Ninja opens'); MG.njQuit();
  MG.startTimeTravel(); ok(MG._ttDebug() && !MG._ttDebug().over, 'Time Traveller opens'); MG.ttQuit();
  // The "not enough questions" path: a subject with no bank behind it.
  c.STATIC_QUESTIONS.length = 0;
  c.STATIC_QUESTIONS.push({ id: 'only-1', chapterId: 'g5english-ch0', type: 'mcq', difficulty: 1, question: 'Only one', options: ['a', 'b', 'c', 'd'], answer: 'a' });
  c.DB.restrictions = { games: { subjects: ['maths'] } };
  c.toasts.length = 0;
  MG.startQuick();
  ok(c.toasts.length === 1 && c.toasts[0] === GS.NO_QUESTIONS_MSG, 'a loaded bank with nothing for the chosen subject shows the parent-facing message');
  ok(!MG._qfDebug(), 'and no game starts (no blank screen)');
  c.STATIC_QUESTIONS.length = 0; c.toasts.length = 0;
  MG.startQuick();
  ok(c.toasts[0] && /still loading/.test(c.toasts[0]), 'an empty bank says "still loading" instead');

  console.log(`\nGame settings: ${checks - fails}/${checks} checks passed${fails ? ' — ' + fails + ' FAILED' : ''}.`);
  process.exit(fails ? 1 : 0);
}).catch(e => { console.error('HARNESS FAIL:', e); process.exit(1); });
