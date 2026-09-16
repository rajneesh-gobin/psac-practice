'use strict';
// A pupil seeing their OWN past marks on the class hub (/m/<CODE>).
//
// ⚠ THIS NARROWS A DELIBERATE OMISSION, it does not overturn one.
//   materials_library_open() had always withheld the score, and its own comment
//   gave the reason: "a mark belongs on the teacher screen until they have
//   looked at it, and children comparing marks on a shared tablet is exactly
//   what this must not enable." Both halves were right:
//     • SHARED PIN / open link — the identity is a NAME anyone in the room can
//       type. A mark shown there is a mark shown to whoever typed it. So it is
//       still withheld, and this file fails if that ever changes.
//     • PER-PUPIL PIN — the identity is that pupil's row id and it takes their
//       own PIN to reach. A child sees only their own.
//   ⚠ And nothing NEW is disclosed: guest.js already shows this exact
//     percentage the moment the child submits.
//
// Run: node scripts/test-class-hub-marks.js
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
let checks = 0, fails = 0;
const ok = (label, cond) => { checks++; if (!cond) { fails++; console.log('  FAIL  ' + label); } };

const sql  = fs.readFileSync(path.join(ROOT, 'migrations/20260916_class_hub_own_marks.sql'), 'utf8');
const mat  = fs.readFileSync(path.join(ROOT, 'materials.js'), 'utf8');
const html = fs.readFileSync(path.join(ROOT, 'materials.html'), 'utf8');

// ── The gate: every mark field, without exception ───────────────────────────
for (const field of ['score', 'total', 'pct', 'submitted_at']) {
  const i = sql.indexOf("'" + field + "',");
  ok(`${field} is returned`, i > 0);
  ok(`${field} is gated on a per-pupil classroom`,
    i > 0 && sql.slice(i, i + 260).includes("access_type <> 'shared'"));
}

// ⚠ What must STILL never leave the server.
ok('answers are still absent', !/'answers'/.test(sql));
ok('question_ids are still absent', !/'question_ids'/.test(sql));
// ⚠ Only the pupil's own row: name_key is the identity and every lookup uses it.
const marks = sql.slice(sql.indexOf("'score',"), sql.indexOf("'submitted_at',") + 600);
ok('every mark lookup is keyed to this pupil',
  (marks.match(/g\.name_key = v_key/g) || []).length === 4);
// ⚠ Latest attempt only — a retry should read as the result that stands, not a
//   history a child can be judged on.
ok('latest attempt only', (sql.match(/ORDER BY g\.submitted_at DESC LIMIT 1/g) || []).length === 4);

// ── The reasoning is recorded, not just the code ────────────────────────────
ok('the migration explains why shared-PIN stays withheld',
  /shared tablet|typed name anyone in the room/i.test(sql));
ok('and that the child has already seen this number',
  /already shows this exact percentage|nothing NEW is disclosed/i.test(sql));

// ── The client ──────────────────────────────────────────────────────────────
ok('the card shows the mark only when the server sent one', /a\.done && a\.pct != null/.test(mat));
// ⚠ NEVER a red band on a child's own screen. A mark is a fact, not a verdict —
//   the same rule that stops the daily goal breaking a streak.
ok('a strong mark is celebrated', /mark-good/.test(mat));
ok('there is no failing/red style for a mark',
  !/mark-bad|mark-late|tag\.mark[^}]*#991b1b/.test(mat + html));
ok('the mark tag is styled', /\.tag\.mark\{/.test(html));
// ⚠ These pages key dark styles on html.dark now, matching index.html's own
//   contract — they used to follow prefers-color-scheme alone, so a child whose
//   app was dark (the default) opened a light homework page.
ok('and has a dark-mode variant, like the tags beside it',
  /html\.dark \.tag\.mark\{/.test(html));
ok('the submitted date is shown too', /a\.submitted_at/.test(mat));

// ⚠ The client must NOT try to decide who may see a mark. The server withholds
//   it, so `pct` is simply absent — any client-side access_type branch would be
//   a second, weaker copy of the rule.
ok('the client never branches on access_type', !/access_type/.test(mat));

console.log(`${checks - fails}/${checks} class-hub-mark checks passed`);
process.exit(fails ? 1 : 0);
