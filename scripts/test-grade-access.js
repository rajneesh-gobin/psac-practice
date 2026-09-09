'use strict';
// Which grades a child may use — the parent's per-grade grant (GradeAccess in
// engine/helpers.js) and the child's own Game Zone control (GameSettings).
//
// ⚠ Two rules here are the whole feature, and both fail silently and
//   permissively if they break:
//     1. a grade the parent has NOT granted must never reach a child, and
//     2. a child may send their games UP, never down.
//   Neither is visible in the UI when it goes wrong: the child simply gets
//   questions, and nobody can tell which grade they came from.
//
// ⚠ Legacy blobs carry `crossGradeSearch` / `crossGradePractice`, which meant
//   "every other grade". They migrate on READ, so a family that had cross-grade
//   revision on must not lose it the moment this ships — that is measured here
//   too, because a silent revocation reads to a parent as an app bug.
//
// Run: node scripts/test-grade-access.js
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
let checks = 0, fails = 0;
const ok = (cond, msg) => { checks++; if (!cond) { fails++; console.log('  FAIL ' + msg); } };
const eq = (a, b, msg) => ok(JSON.stringify(a) === JSON.stringify(b),
  msg + ' (got ' + JSON.stringify(a) + ', want ' + JSON.stringify(b) + ')');

// ── Fixture: grades 4, 5 and 6 live, grade 7 a comingSoon placeholder ──
const SUBJ = [['maths', 'Mathematics'], ['english', 'English'], ['science', 'Science']];
const packs = [];
const questions = [];
for (const grade of [4, 5, 6, 7]) {
  for (const [key, label] of SUBJ) {
    const id = `grade${grade}-${key}`;
    const chapters = [1, 2].map(n => ({ id: `g${grade}${key[0]}-ch${n}`, name: `Chapter ${n}` }));
    packs.push({ id, grade, subject: label, comingSoon: grade === 7, _chapters: chapters });
    for (const ch of chapters) {
      for (let i = 0; i < 8; i++) {
        questions.push({
          id: `${ch.id}-${i}`, type: 'mcq', chapterId: ch.id, difficulty: (i % 4) + 1,
          question: `G${grade} ${key} ${i}?`,
          options: ['a' + i, 'b' + i, 'c' + i, 'd' + i], answer: 'a' + i,
        });
      }
    }
  }
}

function makeCtx(opts) {
  opts = opts || {};
  const els = {};
  const stubEl = id => els[id] || (els[id] = { id, innerHTML: '', value: '', disabled: false, style: {} });
  const ctx = vm.createContext({
    window: { save(db) { ctx.saved.push(JSON.parse(JSON.stringify(db.games || {}))); } },
    document: { getElementById: stubEl, querySelectorAll: () => [], querySelector: () => null },
    localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    setTimeout: fn => { fn(); return 0; }, clearTimeout() {}, setInterval: () => 0, clearInterval() {},
    navigator: {}, location: { protocol: 'https:', hostname: 'example.test' },
    console: { warn() {}, log() {}, error() {} },
    toast: m => { ctx.toasts.push(m); },
    toasts: [], saved: [],
    SUBJECT_PACKS: opts.packs || packs,
    STATIC_QUESTIONS: opts.questions || questions,
    DB: opts.DB || { restrictions: {}, games: {}, chapters: {} },
    Auth: { getActiveAccount: () => ({ id: 'kid-1', grade: opts.grade || 5 }) },
  });
  for (const f of ['engine/helpers.js', 'engine/game_settings.js']) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/^﻿/, ''), ctx, { filename: f });
  }
  ctx.GradeAccess = vm.runInContext('GradeAccess', ctx);
  ctx.GameSettings = vm.runInContext('GameSettings', ctx);
  return ctx;
}

// ── 1. Live grades exclude a comingSoon placeholder ─────────────
{
  const c = makeCtx({});
  eq(c.GradeAccess.liveGrades(), [4, 5, 6], 'a comingSoon pack is not a grade a parent can grant');
}

// ── 2. Nothing granted: the child has their own grade and nothing else ──
{
  const c = makeCtx({});
  eq(c.GradeAccess.granted(), [], 'no grant by default');
  eq(c.GradeAccess.allowed(), [5], 'own grade only');
  ok(c.GradeAccess.allows(5), 'own grade is always allowed');
  ok(!c.GradeAccess.allows(6), 'an ungranted grade is refused');
}

// ── 3. Legacy booleans migrate to "every live grade", on read ───
{
  const c = makeCtx({ DB: { restrictions: { crossGradePractice: true }, games: {}, chapters: {} } });
  eq(c.GradeAccess.allowed(), [4, 5, 6], 'a family that had cross-grade revision keeps every grade');
  const c2 = makeCtx({ DB: { restrictions: { crossGradeSearch: true }, games: {}, chapters: {} } });
  eq(c2.GradeAccess.allowed(), [4, 5, 6], 'cross-grade SEARCH alone migrates the same way');
  const c3 = makeCtx({ DB: { restrictions: { crossGradePractice: true, allowedGrades: [6] }, games: {}, chapters: {} } });
  eq(c3.GradeAccess.allowed(), [5, 6], 'once the parent has chosen grades, the legacy boolean is ignored');
}

// ── 4. A grant only counts while the grade is still live ────────
{
  const c = makeCtx({ DB: { restrictions: { allowedGrades: [4, 7, 9] }, games: {}, chapters: {} } });
  eq(c.GradeAccess.allowed(), [4, 5], 'a comingSoon grade and a grade that does not exist both drop out');
}

// ── 5. The child may go up, never down ──────────────────────────
{
  const c = makeCtx({ DB: { restrictions: { allowedGrades: [4, 6] }, games: {}, chapters: {} } });
  eq(c.GradeAccess.allowed(), [4, 5, 6], 'the parent granted a lower grade AND a higher one');
  eq(c.GradeAccess.childChoices(), [5, 6], 'the child is offered their own grade and above only');
}

// ── 6. Games default to the child's own grade, whatever the parent granted ──
{
  const c = makeCtx({ DB: { restrictions: { allowedGrades: [4, 6] }, games: {}, chapters: {} } });
  eq(c.GradeAccess.gameGrades(), [5], 'unlocking a grade does not by itself change a single game');
  eq(c.GameSettings.context('quickfire').grades, [5], 'and the games read the same answer');
}

// ── 7. The child's pick is honoured, and only within what was granted ──
{
  const mk = sourceGrades => makeCtx({
    DB: { restrictions: { allowedGrades: [4, 6] }, games: { sourceGrades }, chapters: {} },
  });
  eq(mk([6]).GradeAccess.gameGrades(), [5, 6], 'a granted higher grade the child chose is included');
  eq(mk([4]).GradeAccess.gameGrades(), [5], 'a granted LOWER grade cannot be chosen by the child');
  eq(mk([9]).GradeAccess.gameGrades(), [5], 'a grade that is not live is ignored');
  eq(mk([6, 6]).GradeAccess.gameGrades(), [5, 6], 'a duplicated pick is still one grade');
  // The parent revokes Grade 6 while the child's pick still names it.
  const revoked = makeCtx({ DB: { restrictions: { allowedGrades: [] }, games: { sourceGrades: [6] }, chapters: {} } });
  eq(revoked.GradeAccess.gameGrades(), [5], 'revoking a grade takes it out of games with no write to the child blob');
}

// ── 8. The pool honours the grade list, and every chosen grade is first-class ──
{
  const c = makeCtx({ DB: { restrictions: { allowedGrades: [6] }, games: { sourceGrades: [6] }, chapters: {} } });
  const GS = c.GameSettings;
  const own = GS.buildPool({ questions: c.STATIC_QUESTIONS, packs: c.SUBJECT_PACKS, grade: 5, minOptions: 4, grades: [5] });
  ok(own.length > 0, 'the own-grade pool is not empty');
  ok(own.every(e => e.chapterId.startsWith('g5')), 'grades:[5] admits grade 5 only');

  const both = GS.buildPool({ questions: c.STATIC_QUESTIONS, packs: c.SUBJECT_PACKS, grade: 5, minOptions: 4, grades: [5, 6] });
  ok(both.some(e => e.chapterId.startsWith('g6')), 'the grade the child chose is in the pool');
  ok(!both.some(e => e.chapterId.startsWith('g4')), 'a grade nobody chose stays out');
  ok(both.every(e => e.own === true),
    'every chosen grade is first-class - marking grade 6 "not own" would make it a last resort, which is not what the child asked for');

  // The legacy boolean path still tiers the way it always did.
  const legacy = GS.buildPool({ questions: c.STATIC_QUESTIONS, packs: c.SUBJECT_PACKS, grade: 5, minOptions: 4, crossGrade: true });
  ok(legacy.some(e => e.chapterId.startsWith('g6') && e.own === false), 'crossGrade:true still marks other grades not-own');
}

// ── 9. A real round actually deals the grade the child chose ────
{
  const c = makeCtx({ DB: { restrictions: { allowedGrades: [6] }, games: { sourceGrades: [6] }, chapters: {} } });
  const res = c.GameSettings.pickForGame('quickfire', 20, {});
  ok(res.questions.length === 20, 'a full round is dealt');
  ok(res.questions.some(q => q._chapterId.startsWith('g6')), 'grade 6 questions reach the child who asked for them');
  ok(res.questions.every(q => !q._chapterId.startsWith('g4')), 'grade 4 never does');

  const plain = makeCtx({ DB: { restrictions: { allowedGrades: [6] }, games: {}, chapters: {} } });
  const res2 = plain.GameSettings.pickForGame('quickfire', 20, {});
  ok(res2.questions.every(q => q._chapterId.startsWith('g5')),
    'and a child who chose nothing still plays entirely in their own grade');
}

// ── 10. The child's control refuses what it does not draw ───────
{
  const c = makeCtx({ DB: { restrictions: { allowedGrades: [4, 6] }, games: {}, chapters: {} } });
  const GS = c.GameSettings;
  GS.toggleSourceGrade(4);
  eq(c.DB.games.sourceGrades, undefined, 'a lower grade is refused even though the parent granted it');
  GS.toggleSourceGrade(9);
  eq(c.DB.games.sourceGrades, undefined, 'a grade that is not live is refused');
  GS.toggleSourceGrade(5);
  eq(c.DB.games.sourceGrades, undefined, 'the own grade cannot be switched off');
  ok(c.saved.length === 0, 'a refused toggle writes nothing at all');

  GS.toggleSourceGrade(6);
  eq(c.DB.games.sourceGrades, [6], 'a granted higher grade is added');
  ok(c.saved.length === 1, 'and persisted through the blob writer, not students.settings');
  GS.toggleSourceGrade(6);
  eq(c.DB.games.sourceGrades, [], 'tapping it again removes it');
}

// ── 11. The chips appear only when there is a choice to make ────
{
  const none = makeCtx({ DB: { restrictions: {}, games: {}, chapters: {} } });
  eq(none.GameSettings.childGradeBar(), '', 'no grant, no row - an unusable control is clutter');

  const lower = makeCtx({ DB: { restrictions: { allowedGrades: [4] }, games: {}, chapters: {} } });
  eq(lower.GameSettings.childGradeBar(), '',
    'a grant the child can never act on shows nothing either');

  const c = makeCtx({ DB: { restrictions: { allowedGrades: [6] }, games: { sourceGrades: [6] }, chapters: {} } });
  const bar = c.GameSettings.childGradeBar();
  ok(/Grade 5/.test(bar) && /Grade 6/.test(bar), 'both choices are drawn');
  ok(/disabled/.test(bar), 'the own-grade chip cannot be switched off');
  ok((bar.match(/aria-pressed="true"/g) || []).length === 2, 'both grades read as on');
  ok(/GameSettings\.toggleSourceGrade\(6\)/.test(bar) && !/toggleSourceGrade\(5\)/.test(bar),
    'only the optional grade carries a handler');
}

// ── 12. Every edited file parses ────────────────────────────────
{
  const { execFileSync } = require('node:child_process');
  for (const f of ['engine/helpers.js', 'engine/game_settings.js', 'engine/minigame.js',
                   'engine/app.js', 'engine/auth.js', 'engine/search.js', 'sw.js']) {
    let good = true;
    try { execFileSync(process.execPath, ['--check', path.join(ROOT, f)], { stdio: 'pipe' }); } catch (_) { good = false; }
    ok(good, f + ' passes node --check');
  }
}

console.log(`Grade access: ${checks - fails}/${checks} checks passed.`);
if (fails) process.exitCode = 1;
