'use strict';
// Admin › Members — the family usage readings, and the Teachers list shape.
//
// ⚠ THE FAILURE THAT MATTERS HERE IS A MISLEADING NUMBER, not a crash.
//   Measured on production 2026-09-16: of 6,658 points, 6,440 (97%) are kind
//   'legacy' — a ONE-OFF carry-forward of XP from before points were minted in
//   the database. One family showed 530 points having answered NOTHING, and the
//   most active family (75 questions) showed 3,043. Leading a "how much is this
//   being used" column with total points ranks families by history and answers
//   the opposite question. So `questions` leads, `earned` excludes legacy, and
//   the raw total appears only in the expanded row where it is labelled.
//
// Run: node scripts/test-admin-family-usage.js
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
let checks = 0, fails = 0;
const ok = (label, cond) => { checks++; if (!cond) { fails++; console.log('  FAIL  ' + label); } };

const adminSrc = fs.readFileSync(path.join(ROOT, 'engine/admin.js'), 'utf8');
const htmlSrc  = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const cssSrc   = fs.readFileSync(path.join(ROOT, 'style.css'), 'utf8');
const sqlSrc   = fs.readFileSync(path.join(ROOT, 'migrations/20260916_admin_family_points.sql'), 'utf8');

// ── The SQL keeps the three numbers apart ───────────────────────────────────
ok('legacy is excluded from `earned`', /kind <> 'legacy'/.test(sqlSrc));
ok('`questions` counts only first-correct answers', /FILTER \(WHERE e\.kind = 'question'\)/.test(sqlSrc));
ok('the grand total is still returned for reconciliation', /'points',\s+x\.points/.test(sqlSrc));
ok('admin gate is the FIRST act of the function',
  sqlSrc.indexOf('IF NOT public.is_admin()') < sqlSrc.indexOf('SELECT coalesce(jsonb_object_agg'));
ok('it cannot enumerate — it answers only for ids passed in', /f\.parent_id = ANY\(p_parents\)/.test(sqlSrc));
ok('and is capped to a page', /> 200/.test(sqlSrc));
// ⚠ LEFT JOIN throughout: a family with no children, or children who never
//   answered, must return 0 rather than be absent — absent forces the client to
//   guess, and "unknown" and "none" are different answers.
ok('families with no activity still come back as 0 (LEFT JOIN)',
  (sqlSrc.match(/LEFT JOIN/g) || []).length >= 2);
ok('anon is revoked explicitly, not just left to PUBLIC',
  /REVOKE ALL ON FUNCTION public\.admin_family_points\(uuid\[\]\) FROM PUBLIC, anon;/.test(sqlSrc));
ok('granted to authenticated (an admin is authenticated)',
  /GRANT EXECUTE ON FUNCTION public\.admin_family_points\(uuid\[\]\) TO authenticated/.test(sqlSrc));

// ── The client leads with the honest number ─────────────────────────────────
const summary = adminSrc.slice(adminSrc.indexOf('function _memberUsageSummary'),
                               adminSrc.indexOf('function _memberUsageDetail'));
ok('the summary row shows questions answered', /answered/.test(summary));
ok('the summary uses `earned`, never the raw total', /usage\.earned/.test(summary) && !/usage\.points/.test(summary));
ok('a family that has done nothing says so, rather than showing 0 points',
  /not started/.test(summary));

const detail = adminSrc.slice(adminSrc.indexOf('function _memberUsageDetail'),
                              adminSrc.indexOf('function _memberChildrenSummary'));
ok('the expanded row labels legacy XP as not activity', /legacy XP, not activity/.test(detail));
ok('legacy is derived as total minus earned', /Number\(u\.points \|\| 0\) - Number\(u\.earned \|\| 0\)/.test(detail));

// ⚠ "unavailable" and "zero" must not render the same. An un-migrated database
//   has no function; that is unknown, not inactive.
ok('an unavailable RPC reads as unknown, not as zero usage',
  /usage === undefined/.test(summary) && /Usage unavailable/.test(detail));
ok('a failed usage read never empties the member list',
  /could not load|family usage unavailable/i.test(adminSrc));

// ── It goes through the RPC, because the table is unreadable from a browser ──
ok('usage comes from the admin RPC', /rpc\('admin_family_points'/.test(adminSrc));
ok('nothing selects student_points directly from the client',
  !/from\('student_points'\)/.test(adminSrc));

// ── Teachers list now matches Members ───────────────────────────────────────
ok('teachers rows expand and collapse', /function toggleTeacherRow/.test(adminSrc));
ok('teachers have their OWN open set, not the members one',
  /const _openTeachers = new Set\(\)/.test(adminSrc));
ok('teachers use the shared grid pattern', /adm-teacher-grid/.test(adminSrc));
ok('.adm-teacher-grid is a real class in style.css', /\.adm-teacher-grid\s*\{/.test(cssSrc));
ok('it has a wide variant for desktop',
  /@media \(min-width: 640px\)[\s\S]{0,400}\.adm-teacher-grid/.test(cssSrc));
ok('teachers carry a selection checkbox', /toggleSelectAllTeachers/.test(adminSrc));
ok('the checkbox reuses the members pick set (one send, not two)',
  /AdminPanel\.toggleMemberPick\('\$\{t\.id\}'/.test(adminSrc));
ok('a single teacher can be emailed from their row', /function emailOneMember/.test(adminSrc));
ok('and that goes through the same Bcc broadcast path',
  /function emailOneMember[\s\S]{0,400}openBroadcast\(\)/.test(adminSrc));

// ── The selection bar is painted in BOTH tabs ───────────────────────────────
ok('the bar is selected by attribute, not by one id',
  /querySelectorAll\('\[data-selection-bar\]'\)/.test(adminSrc));
ok('there are two bars in the markup',
  (htmlSrc.match(/<div data-selection-bar/g) || []).length === 2);
ok('the old single-id bar is gone', !/admin-member-selection/.test(htmlSrc) && !/admin-member-selection/.test(adminSrc));

// ── Every new handler is exported ───────────────────────────────────────────
for (const fn of ['toggleTeacherRow', 'toggleSelectAllTeachers', 'emailOneMember']) {
  const ret = adminSrc.slice(adminSrc.lastIndexOf('return { render,'));
  ok(`${fn} is exported on AdminPanel`, ret.includes(fn));
}

console.log(`${checks - fails}/${checks} admin family-usage checks passed`);
process.exit(fails ? 1 : 0);
