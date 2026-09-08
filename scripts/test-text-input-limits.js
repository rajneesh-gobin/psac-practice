'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Limits on the text a user can write.
//
//  ⚠ READ THIS BEFORE ADDING "SANITISATION". Two things are deliberately NOT
//  done in this codebase, and both are decisions rather than omissions:
//
//    1. NO SQL ESCAPING. The app issues no SQL. Every write goes through
//       PostgREST or a SECURITY DEFINER function with typed parameters, so a
//       value is data at every step and can never become syntax. Measured
//       2026-09-08: 0 raw SQL strings in engine/ or netlify/. Filtering
//       quotes or the word "DROP" out of a child's name would protect nothing
//       and would imply the real defence is string matching rather than
//       parameterisation. This file asserts that no raw SQL appears.
//
//    2. NO ESCAPING AT WRITE TIME. A stored `<script>` is inert until something
//       renders it unescaped, and escaping on the way in corrupts legitimate
//       text — a teacher writing "5 < 7" in a description would see "5 &lt; 7"
//       forever. Escaping belongs at render, in _attr()/esc().
//
//  What IS enforced: LENGTH, in the database, where a browser cannot bypass it.
//  `text` in Postgres is unbounded, and several of these columns are written by
//  the browser directly through PostgREST, where an HTML maxlength attribute is
//  otherwise the only limit.
//
//  Run: node scripts/test-text-input-limits.js
// ══════════════════════════════════════════════════════════════════════════

const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
let pass = 0, fail = 0;
const ck = (label, ok, detail) => {
  if (ok) { pass++; return; }
  fail++; console.log('  FAIL  ' + label + (detail ? '  [' + detail + ']' : ''));
};
const section = t => console.log('\n── ' + t + ' ──');

const mig    = fs.readFileSync(path.join(ROOT, 'migrations/20260908_text_length_caps.sql'), 'utf8');
const schema = fs.readFileSync(path.join(ROOT, 'supabase-schema.sql'), 'utf8');
const guest  = fs.readFileSync(path.join(ROOT, 'guest.js'), 'utf8');

// ── 1 · the app issues no SQL ─────────────────────────────────────────────
section('SQL injection is not reachable, and that is why nothing filters for it');
{
  const dirs = ['engine', 'netlify/functions', 'netlify/lib'];
  const files = [];
  for (const d of dirs) {
    const p = path.join(ROOT, d);
    if (!fs.existsSync(p)) continue;
    for (const f of fs.readdirSync(p)) if (f.endsWith('.js')) files.push(path.join(p, f));
  }
  files.push(path.join(ROOT, 'guest.js'));

  // A SQL driver would be the thing that made injection possible at all.
  const drivers = /require\(['"](pg|mysql2?|sqlite3|knex|sequelize|better-sqlite3)['"]\)/;
  const offenders = files.filter(f => drivers.test(fs.readFileSync(f, 'utf8')));
  ck('no SQL driver is used anywhere in the app', offenders.length === 0,
    offenders.map(f => path.basename(f)).join(', '));

  // String-built SQL: the actual injection shape.
  // ⚠ Case-SENSITIVE, and a second clause keyword is required. A loose
  //   case-insensitive /SELECT/ matches the button label "Select an
  //   assignment…" and the toast "Select and copy the list below" — it reported
  //   four files as building SQL when none of them do, which is exactly the
  //   kind of false positive that gets a security assertion deleted.
  const built = [];
  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8');
    const sqlish = /\bSELECT\b[\s\S]{0,120}\bFROM\b[\s\S]{0,80}['"`]\s*\+/.test(src)
      || /\bINSERT\s+INTO\b[\s\S]{0,120}\bVALUES\b[\s\S]{0,80}['"`]\s*\+/.test(src)
      || /\bUPDATE\b[\s\S]{0,80}\bSET\b[\s\S]{0,80}['"`]\s*\+/.test(src)
      || /\bDELETE\s+FROM\b[\s\S]{0,80}\bWHERE\b[\s\S]{0,80}['"`]\s*\+/.test(src);
    if (sqlish) built.push(path.basename(f));
  }
  ck('no SQL statement is built by string concatenation', built.length === 0, built.join(', '));
  ck('the migration says plainly that this is not SQLi defence', /NOT SQL-injection defence/.test(mig));
  ck('…and that escaping at write time is deliberately not done',
    /NOT XSS defence either/.test(mig));
}

// ── 2 · the caps exist, in the schema the database reports ────────────────
section('length caps are in the database, not just the form');
{
  // ⚠ Asserted against supabase-schema.sql, which is REGENERATED from the live
  //   database — so this passes only if the constraint is actually deployed,
  //   not merely written in a migration file.
  const expect = [
    ['learning_materials', 'title', 200], ['learning_materials', 'description', 500],
    ['learning_materials', 'external_url', 2000], ['learning_materials', 'file_name', 260],
    ['learning_materials', 'subject', 60],
    ['teacher_guest_classes', 'name', 80], ['teacher_guest_pupils', 'name', 80],
    ['guest_assignments', 'title', 200], ['guest_assignments', 'teacher_label', 120],
    ['guest_assignments', 'classroom_label', 120],
    ['profiles', 'full_name', 120],
    ['students', 'display_name', 80], ['students', 'username', 60],
    ['schedule_entries', 'notes', 1000],
    ['forum_posts', 'title', 200], ['forum_posts', 'body', 5000],
    ['forum_replies', 'body', 5000],
  ];
  for (const [tbl, col, cap] of expect) {
    const name = tbl + '_' + col + '_len_ck';
    const present = schema.includes(name);
    ck(tbl + '.' + col + ' is capped', present, 'constraint ' + name + ' not in the regenerated schema');
    if (present) {
      const line = schema.split('\n').find(l => l.includes(name) && l.includes('length'));
      ck('…at ' + cap + ' characters', !!line && line.includes('<= ' + cap),
        (line || '').trim().slice(0, 110));
    }
  }
  // ⚠ NULL must stay allowed: most of these columns are optional, and a cap
  //   that rejected NULL would break every row that simply has no description.
  ck('a cap never makes an optional column required',
    /IS NULL OR length/.test(mig));
}

// ── 3 · the migration refuses rather than truncates ───────────────────────
section('applying a cap can never shorten real data');
{
  ck('it measures the longest existing value first', /SELECT coalesce\(max\(length/.test(mig));
  ck('…and raises instead of truncating', /RAISE EXCEPTION 'existing/.test(mig));
  ck('a missing column is skipped, not fatal', /skip %\.% \(no such column\)/.test(mig));
  ck('it is idempotent', /SELECT 1 FROM pg_constraint WHERE conname = v_name/.test(mig));
  // ⚠ Caps above the UI limit on purpose: a cap set to the current maxlength
  //   turns a later copy change into a database error.
  ck('caps are documented as generous, not product rules',
    /CAPS ARE DELIBERATELY GENEROUS/.test(mig));
}

// ── 4 · escaping still happens at render ──────────────────────────────────
section('the limit is length; the XSS guard is still escaping at render');
{
  // The pupil page is the one an anonymous person reaches from a WhatsApp link.
  ck('guest.js escapes the material title', /esc\(m\.title\)/.test(guest));
  ck('guest.js escapes the combined subject/host/description line', /esc\(sub\)/.test(guest));
  ck('guest.js escapes the date', /esc\(when\)/.test(guest));
  ck('guest.js escapes the link href', /esc\(safe\)/.test(guest));
  // ⚠ And the href is scheme-checked, because escaping does not stop
  //   javascript: — that is a different failure and needs its own guard.
  ck('…and the href scheme is checked as well as escaped',
    /\^https\?:\\\/\\\//.test(guest) || /\/\^https\?:\\\/\\\//.test(guest),
    'no http(s) scheme test found');
  ck('guest.js has an esc() helper at all', /function esc\(/.test(guest));
}

console.log('\n' + (fail ? 'FAILED' : 'PASSED') + ': ' + pass + ' checks passed, ' + fail + ' failed.');
process.exitCode = fail ? 1 : 0;
