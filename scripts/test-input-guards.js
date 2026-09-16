'use strict';
// Length and blank guards on user-supplied text.
//
// ⚠ THE UI's maxlength IS NOT A VALIDATION and this file exists to keep that
//   distinction from eroding. Every one of these columns is reachable by a
//   direct PostgREST call with whatever the caller likes; `maxlength="40"` stops
//   a typist, not an attacker. The CHECK constraint is the guard, the client
//   message is a courtesy, and both are asserted here so neither quietly leaves.
//
// ⚠ Measured on production 2026-09-16 BEFORE the constraints existed:
//     families.family_name  100,000 chars ACCEPTED, "        " ACCEPTED
//     profiles.teacher_note 100,000 chars ACCEPTED
//     students.display_name "     " ACCEPTED (the length cap was already there)
//   family_name is the worst of these: children type it at login, so a blank one
//   locks every child in that family out of the account.
//
// Run: node scripts/test-input-guards.js
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
let checks = 0, fails = 0;
const ok = (label, cond) => { checks++; if (!cond) { fails++; console.log('  FAIL  ' + label); } };

const sql     = fs.readFileSync(path.join(ROOT, 'migrations/20260916_input_length_guards.sql'), 'utf8');
const authSrc = fs.readFileSync(path.join(ROOT, 'engine/auth.js'), 'utf8');
const htmlSrc = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const appSrc  = fs.readFileSync(path.join(ROOT, 'engine/app.js'), 'utf8');

// ── The database is the guard ───────────────────────────────────────────────
ok('families.family_name is bounded', /families_name_len/.test(sql));
// ⚠ btrim inside the CHECK, not a bare length test: "   " has length 3 and
//   passes `length >= 1` while being unusable as a login credential.
ok('...and rejects whitespace-only (btrim, not bare length)',
  /length\(btrim\(family_name\)\) BETWEEN 1 AND 60/.test(sql));
ok('profiles.teacher_note is bounded', /profiles_teacher_note_len/.test(sql));
ok('students.display_name cannot be blank',
  /students_display_name_notblank[\s\S]{0,200}length\(btrim\(display_name\)\) >= 1/.test(sql));
ok('students.username cannot be blank',
  /students_username_notblank[\s\S]{0,200}length\(btrim\(username\)\) >= 1/.test(sql));
ok('question_reports.message is bounded', /question_reports_message_len/.test(sql));
ok('question_reports.admin_note is bounded', /question_reports_admin_note_len/.test(sql));

// ⚠ `col IS NULL OR (...)` throughout: these columns are nullable today and a
//   NOT NULL smuggled in as a length guard would reject rows the app writes.
const constraints = sql.match(/CHECK \([^;]+\)/g) || [];
ok('every guard tolerates NULL', constraints.every(c => /IS NULL OR/.test(c)));
ok('the migration is re-runnable', (sql.match(/IF NOT EXISTS \(SELECT 1 FROM pg_constraint/g) || []).length >= 7);

// ── The client is a courtesy, and says so ───────────────────────────────────
const signup = authSrc.slice(authSrc.indexOf('async function emailSignUp'),
                             authSrc.indexOf('async function emailSignUp') + 4000);
ok('signup trims before testing emptiness', /auth-name'\)\?\.value\s+\|\| ''\)\.trim\(\)/.test(signup));
ok('signup caps the name', /name\.length > 120/.test(signup));
ok('signup caps the email', /email\.length > 254/.test(signup));
ok('signup checks the email shape', /\[\^\\s@\]\+@\[\^\\s@\]\+/.test(signup));
ok('signup caps the password', /pass\.length > 72/.test(signup));
ok('the comment says the DB is what actually holds', /that is what actually holds/i.test(signup));

// ── maxlength on the fields a real person types into ────────────────────────
for (const [id, max] of [['auth-name', 120], ['auth-signup-email', 254],
                         ['auth-signup-pass', 72], ['auth-signup-pass-confirm', 72]]) {
  const tag = (htmlSrc.match(new RegExp('<input[^>]*id="' + id + '"[^>]*>', 's')) || [])[0] || '';
  ok(`${id} carries maxlength=${max}`, new RegExp('maxlength="' + max + '"').test(tag));
}
// Built by innerHTML in app.js rather than static markup.
ok('set-family-name carries a maxlength', /id="set-family-name"[^>]*maxlength="\d+"/s.test(appSrc));

// ── No regex lookbehind anywhere (Safari <16.4 parse error) ─────────────────
// ⚠ A lookbehind is a PARSE error, not a runtime one: it takes the whole file
//   down rather than one validation.
ok('no lookbehind in the new validation', !/\(\?<[=!]/.test(signup));

console.log(`${checks - fails}/${checks} input-guard checks passed`);
process.exit(fails ? 1 : 0);
