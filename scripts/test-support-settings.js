'use strict';
// SupportSettings (engine/helpers.js): the rules that decide what a child's
// device keeps when its parent-control settings are refreshed from the server,
// and what Admin › Members tells a super admin about why a chapter is closed.
//
// ⚠ Both fail silently if they break. A refresh that drops a device-only key
//   resets state nobody set; one that keeps a stale parent key leaves a lock in
//   place the parent lifted - or lifts one the parent set. And an explainer
//   that names one reason hides the second fix a support call needs.
//
// Also checks, by reading the source, that the pieces are wired where the
// feature depends on them - a helper nobody calls tests green forever.
//
// Run: node scripts/test-support-settings.js
const fs = require('node:fs');
const path = require('node:path');
const ROOT = path.resolve(__dirname, '..');
const { SupportSettings: SS } = require(path.join(ROOT, 'engine/helpers.js'));

let checks = 0, fails = 0;
const ok = (cond, msg) => { checks++; if (!cond) { fails++; console.log('  FAIL ' + msg); } };
const eq = (a, b, msg) => ok(JSON.stringify(a) === JSON.stringify(b),
  msg + ' (got ' + JSON.stringify(a) + ', want ' + JSON.stringify(b) + ')');

ok(SS && typeof SS.mergeServer === 'function', 'SupportSettings is exported from helpers.js');

// ── mergeServer ──
{
  const local = { lockedChapters: ['a'], maxDifficulty: 2, examDisabled: true, pin_attempts: 2, games: { mode: 'x' } };
  const server = { lockedChapters: [], maxDifficulty: 4, examDisabled: false };
  const m = SS.mergeServer(local, server);
  eq(m.lockedChapters, [], 'server wins on lockedChapters');
  eq(m.maxDifficulty, 4, 'server wins on maxDifficulty');
  eq(m.examDisabled, false, 'server wins on examDisabled');
  eq(m.pin_attempts, 2, 'a device-only key survives the refresh');
  ok(!('games' in m), 'a parent key the server no longer holds is dropped, not kept stale');
  eq(SS.mergeServer(null, {}).lockedChapters, [], 'lockedChapters is always an array');
  eq(SS.mergeServer({ lockedChapters: ['x'] }, null).lockedChapters, [], 'a non-object server is an empty master, never a crash');
  eq(local.lockedChapters, ['a'], 'the local object is not mutated');
}

// ── differs ──
{
  ok(!SS.differs({ games: { b: 1, a: 2 } }, { games: { a: 2, b: 1 } }), 'key order inside games is not a difference');
  ok(SS.differs({ lockedChapters: [] }, { lockedChapters: ['x'] }), 'a new lock is a difference');
  ok(!SS.differs({ pin_attempts: 1 }, { pin_attempts: 5 }), 'device-only keys are never a difference');
  ok(SS.differs({}, { examDisabled: true }), 'a key appearing is a difference');
}

// ── describe ──
{
  eq(SS.describe({ lockedChapters: [], maxDifficulty: 4, examDisabled: false }), [], 'defaults describe as nothing');
  const d = SS.describe({ examDisabled: true, hintsDisabled: true, minigamesDisabled: true, maxDifficulty: 2,
    lockedChapters: ['a', 'b'], allowedGrades: [4, 6], games: {} });
  ok(d.includes('Exam mode is switched off'), 'exam off named');
  ok(d.includes('Questions stop at Level 2 (Medium)'), 'difficulty cap named with its word');
  ok(d.includes('2 chapters locked by the parent'), 'lock count named');
  ok(d.includes('Extra grades unlocked: 4, 6'), 'extra grades named');
  ok(SS.describe({ crossGradePractice: true }).includes('Every other grade unlocked (older setting)'), 'legacy flag named');
  eq(SS.describe({ allowedGrades: [], crossGradePractice: true }), [], 'an explicit empty list beats the legacy flag, as GradeAccess.granted does');
  eq(SS.describe({ lockedChapters: ['a'] }), ['1 chapter locked by the parent'], 'singular');
}

// ── explainChapter ──
{
  const base = { chapterId: 'g5m-frac', packId: 'grade5-maths', packGrade: 5, childGrade: 5,
    settings: {}, grantedGrades: [], global: {}, planAllowed: null, entitled: false,
    expired: false, free: false, accountDisabled: false, blockedUntil: null, now: '2026-09-11T10:00:00Z' };
  const x = over => SS.explainChapter(Object.assign({}, base, over));
  ok(x({}).open, 'nothing set: open');
  ok(!x({ settings: { lockedChapters: ['g5m-frac'] } }).open, 'parent lock closes it');
  const two = x({ settings: { lockedChapters: ['g5m-frac'] }, global: { disabled_chapters: ['g5m-frac'] } });
  eq(two.reasons.length, 2, 'two layers closing it are both named');
  ok(!x({ packGrade: 6 }).open, 'another grade not granted: closed');
  ok(x({ packGrade: 6, grantedGrades: [6] }).open, 'another grade granted: open');
  ok(!x({ global: { disabled_grades: [5] } }).open, 'grade kill switch');
  ok(!x({ global: { disabled_subjects: ['grade5-maths'] } }).open, 'subject kill switch');
  ok(x({ planAllowed: ['other'] }).open, 'plan list ignored while enforcement is off');
  ok(!x({ planAllowed: ['other'], global: { plan_enforcement_enabled: true } }).open, 'plan list applies when enforcement is on');
  ok(x({ planAllowed: ['other'], global: { plan_enforcement_enabled: 'true' } }).open, 'a string "true" is not enforcement (the switch is compared as a boolean)');
  ok(x({ planAllowed: ['other'], global: { plan_enforcement_enabled: true }, entitled: true }).open, 'a bought chapter beats the plan list');
  ok(!x({ expired: true }).open, 'expired: closed');
  ok(x({ expired: true, entitled: true }).open, 'expired but bought: open');
  ok(x({ expired: true, free: true }).open, 'free grades ignore expiry');
  ok(!x({ expired: true, free: true, global: { disabled_chapters: ['g5m-frac'] } }).open, 'free grades still obey the kill switch');
  ok(!x({ accountDisabled: true }).open, 'disabled account');
  ok(!x({ blockedUntil: '2026-09-12T00:00:00Z' }).open, 'blocked account');
  ok(x({ blockedUntil: '2026-09-01T00:00:00Z' }).open, 'an old block does not count');
}

// ── Wiring, read from source ──
{
  const auth = fs.readFileSync(path.join(ROOT, 'engine/auth.js'), 'utf8');
  const admin = fs.readFileSync(path.join(ROOT, 'engine/admin.js'), 'utf8');
  const mig = fs.readFileSync(path.join(ROOT, 'migrations/20260911_admin_support_panel.sql'), 'utf8');
  ok(/_refreshChildSettings\(sess\.id, true\)/.test(auth), 'resume refreshes the settings');
  ok(/session_version === version\) _refreshChildSettings\(studentId\)/.test(auth), 'the session guard refreshes the settings');
  ok(/_onTimedScreen\(\)/.test(auth) && /screen-exam/.test(auth), 'a refresh never lands mid-exam');
  ok(/\.select\('settings'\)/.test(auth), 'the refresh reads only the settings column');
  ok(/rpc\('admin_patch_student_settings'/.test(admin), 'admin writes go through the patch function');
  ok(!/from\('students'\)\.update\(\{ settings/.test(admin), 'admin never writes the whole settings object');
  ok(/toggleChildSettings, patchChildSettings, toggleChildChapter, toggleChildGrade, resetChildPin/.test(admin), 'admin exports the new actions');
  ok(/created_at, settings'/.test(admin), 'the children query reads settings');
  ok(/REVOKE ALL ON FUNCTION public\.admin_patch_student_settings\(uuid, jsonb, text\) FROM PUBLIC, anon;/.test(mig), 'migration names anon in the revoke');
  ok(/NOT public\.is_super_admin\(\)/.test(mig), 'the role guard requires a super admin');
}

console.log(`${checks - fails}/${checks} support-settings checks passed`);
process.exit(fails ? 1 : 0);
