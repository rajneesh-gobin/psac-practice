'use strict';
// ── Teacher tier: ONE vocabulary, checked against the database's own ───────
// Run: node scripts/test-teacher-tier.js
//
// ⚠⚠ TWO DIFFERENT THINGS ARE CALLED "TIER" in this project:
//      profiles.teacher_tier  — 'unverified' | 'verified'. A TRUST level. It
//                               gates guest-class creation and nothing else.
//      the subscription plan  — free / premium / school. What the family pays.
//    The Teachers tab select was built from the SECOND list while writing the
//    FIRST column, so:
//      · 'verified' was not offered at all — the one thing the control exists
//        to do could not be done from it;
//      · every option it DID offer wrote a value nothing recognises.
//        admin_set_teacher_status() answers `bad_tier` for them, but the select
//        bypassed it with a raw .update(), and guest_assignment_limits() reads
//        `CASE WHEN v_tier = 'verified' … ELSE 'unverified'` — so free, premium
//        and school all silently meant UNVERIFIED, with no error anywhere.
//    Found 2026-09-17 by an admin who went looking for "Make verified" and
//    could not find it. Nobody had used the broken select (checked in
//    production: zero rows held any of the three).
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const admin = fs.readFileSync(path.join(ROOT, 'engine/admin.js'), 'utf8');
const sql = fs.readFileSync(path.join(ROOT, 'supabase-schema.sql'), 'utf8');

let checks = 0, fails = 0;
const ok = (label, cond, detail) => {
  checks++;
  if (cond) return;
  fails++;
  console.log('FAIL ' + label + (detail === undefined ? '' : `\n     ${JSON.stringify(detail)}`));
};

// ── 1. The database decides what the words are ─────────────────────────────
// Read them OUT of the schema rather than writing them here a third time.
const allowed = (sql.match(/p_tier NOT IN \(([^)]*)\)/) || [])[1];
ok('admin_set_teacher_status() validates the tier', !!allowed, allowed);
const WORDS = (allowed || '').split(',').map(s => s.trim().replace(/'/g, '')).filter(Boolean).sort();
ok('the schema allows exactly two tiers', WORDS.length === 2, WORDS);
ok("and they are 'unverified' and 'verified'",
  WORDS.join('|') === 'unverified|verified', WORDS);

// The SQL that actually spends the value has to speak the same language.
ok('guest_assignment_limits is keyed on the same word',
  /v_tier = 'verified'/.test(sql));
ok("everything that is not 'verified' falls back to 'unverified'",
  /THEN 'verified' ELSE 'unverified' END/.test(sql));

// ── 2. The select offers those words and no others ─────────────────────────
const selAt = admin.indexOf('AdminPanel.teacherChangeTier(');
const sel = admin.slice(selAt, admin.indexOf('</select>', selAt));
ok('the teacher tier control exists', selAt > 0);
const options = [...sel.matchAll(/<option value="([a-z]+)"/g)].map(m => m[1]).sort();
ok('it offers exactly the tiers the database accepts',
  options.join('|') === WORDS.join('|'), { options, WORDS });
// ⚠ Named individually: these three are the subscription plan, and a plan word
//   appearing in this control is the exact bug this file exists for.
for (const plan of ['free', 'premium', 'school']) {
  ok(`the subscription word "${plan}" is not an option here`, !options.includes(plan));
}
ok('the control says which "tier" it means', /trust level/i.test(sel), sel.slice(0, 200));

// ── 3. The write goes through the RPC that validates ───────────────────────
const fnAt = admin.indexOf('async function teacherChangeTier(');
const fn = admin.slice(fnAt, admin.indexOf('\n  }', fnAt));
ok('teacherChangeTier() exists', fnAt > 0);
ok('it calls admin_set_teacher_status', /rpc\('admin_set_teacher_status'/.test(fn));
ok('it no longer writes profiles.teacher_tier directly',
  !/from\('profiles'\)\.update\(\{\s*teacher_tier/.test(admin));
ok('it refuses a value the database would refuse', /\['unverified', 'verified'\]\.includes\(tier\)/.test(fn));
ok('it checks data.ok, not just the absence of an error', /!data\?\.ok/.test(fn));
// ⚠ setTeacherStatus() emails a teacher it believes is newly approved, and it
//   decides "newly" from a cache that is empty until the Members tab has
//   loaded. Routing a tier change through it re-sends that email.
ok('it does NOT go through setTeacherStatus (which would re-send the approval email)',
  !/setTeacherStatus\(/.test(fn));

// ── 4. A null column reads as the lower tier, not as a plan ────────────────
ok("a missing teacher_tier displays as 'unverified'",
  /t\.teacher_tier \|\| 'unverified'/.test(admin));
ok("and never as 'free'", !/teacher_tier \|\| 'free'/.test(admin));

// ── 5. The client's limit defaults use the same two keys ───────────────────
// ⚠ GUEST_LIMIT_DEFAULTS is one of the copies CLAUDE.md lists as duplicated
//   (admin.js ↔ guest_assignment_limits() ↔ the seeded mm_data row). The
//   numbers may differ from production on purpose; the KEYS may not.
const defAt = admin.indexOf('GUEST_LIMIT_DEFAULTS');
const defs = admin.slice(defAt, defAt + 300);
for (const w of WORDS) {
  ok(`GUEST_LIMIT_DEFAULTS has a "${w}" entry`, new RegExp(`\\b${w}\\s*:`).test(defs), defs.slice(0, 160));
}

console.log(fails ? `\n${fails} of ${checks} checks FAILED.` : `\nAll ${checks} checks passed.`);
process.exit(fails ? 1 : 0);
