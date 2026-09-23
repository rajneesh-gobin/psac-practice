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

// ── The admin panel reopens where it was left ───────────────────────────────
// ⚠ render() used to call showTab('members') unconditionally, so a refresh —
//   which restores screen-admin and calls render() again — threw the admin back
//   to the member list from wherever they were. Reported from the Teachers tab.
ok('a tab is remembered when it is opened', /function _rememberTab/.test(adminSrc));
ok('and restored on render', /showTab\(_restoreTab\(isSA\)\)/.test(adminSrc));
ok('render no longer hard-codes members', !/showTab\('members'\);/.test(adminSrc));
ok('it persists in localStorage, like teacher mode does',
  /localStorage\.setItem\(ADMIN_TAB_KEY/.test(adminSrc));
ok('storage access is wrapped (it throws in some privacy modes)',
  /try \{ localStorage\.setItem\(ADMIN_TAB_KEY, name\); \} catch \(_\) \{\}/.test(adminSrc));

// ⚠ A remembered super-admin tab must NOT be restored for an ordinary admin:
//   they would land on a panel whose button is hidden, with no way back to it.
ok('super-admin-only tabs are listed', /ADMIN_SA_TABS = \['roles', 'plans', 'create'\]/.test(adminSrc));
ok('and are refused to a non-super-admin',
  /if \(!isSuperAdmin && ADMIN_SA_TABS\.includes\(name\)\) return 'members';/.test(adminSrc));
ok('an unknown or absent tab falls back to members',
  /if \(!name \|\| !ADMIN_TABS\.includes\(name\)\) return 'members';/.test(adminSrc));

// ⚠ Button visibility must be decided BEFORE the panel is chosen, or the tab is
//   restored while the buttons still say something else.
{
  const render = adminSrc.slice(adminSrc.indexOf('async function render()'),
                                adminSrc.indexOf('// ── Syllabus preview'));
  ok('the super-admin check runs before showTab',
    render.indexOf('const isSA') < render.indexOf('showTab(_restoreTab'));
  ok('and so does the button toggling',
    render.indexOf('createBtn.classList.toggle') < render.indexOf('showTab(_restoreTab'));
}

// The refresh path that exposed this.
{
  const authSrc = fs.readFileSync(path.join(ROOT, 'engine/auth.js'), 'utf8');
  ok('a refresh on the admin screen really does re-enter render()',
    /lastScreen === 'admin'[\s\S]{0,200}AdminPanel\.render\(\)/.test(authSrc));
}

// ── Every new handler is exported ───────────────────────────────────────────
for (const fn of ['toggleTeacherRow', 'toggleSelectAllTeachers', 'emailOneMember',
                  'copyTeacherEmails', 'teacherAudience']) {
  const ret = adminSrc.slice(adminSrc.lastIndexOf('return { render,'));
  ok(`${fn} is exported on AdminPanel`, ret.includes(fn));
}

// ── "not started" vs "practised, got nothing right" ─────────────────────────
// ⚠ THIS SECTION EXISTS BECAUSE A STRING GREP WAS NOT ENOUGH. The check above
//   ("a family that has done nothing says so") only asserted the phrase "not
//   started" appeared somewhere in the function. When the label was renamed to
//   "none correct yet" to cover a DIFFERENT family — a child who practised and
//   missed everything, who earns no points and so reads as 0 on every
//   points-derived number — that grep went red and the rename shipped anyway.
//   The result was reported from the admin panel: a parent row saying
//   "✏️ none correct yet" three lines above their child's "Has not practised
//   yet." Both lines described the same family and disagreed.
//
//   So run the real functions and read what they actually say.
//
// ⚠ Both states exist on production — measured 2026-09-23: 17 students hold a
//   progress row, 19 hold a 'question' point event, and 2 (Child2, Vilena) have
//   attempts with no correct answer at all. The shapes below are those rows.
{
  const vm = require('node:vm');
  const grab = (start, end) => {
    const a = adminSrc.indexOf(start);
    const b = adminSrc.indexOf(end, a);
    if (a < 0 || b < 0) throw new Error('could not extract ' + start);
    return adminSrc.slice(a, b);
  };
  const ctx = { out: null };
  vm.createContext(ctx);
  vm.runInContext(
    grab('const _num =', 'function _memberUsageSummary') +
    grab('function _memberUsageSummary', 'function _memberChildrenSummary') +
    'function _esc(s){return String(s==null?"":s);}' +
    'out = { summary: _memberUsageSummary, detail: _memberUsageDetail };', ctx);
  const { summary: sum, detail: det } = ctx.out;

  // The three real shapes, exactly as admin_family_points() returns them.
  const NEVER   = { usage: { points: 0, earned: 0, questions: 0, attempted: 0, children: 1, last_seen: null } };
  const TRIED   = { usage: { points: 0, earned: 0, questions: 0, attempted: 1, children: 1, last_seen: '2026-09-23T12:36:19Z' } };
  const ACTIVE  = { usage: { points: 0, earned: 40, questions: 27, attempted: 121, children: 3, last_seen: '2026-09-23T03:20:02Z' } };
  const UNKNOWN = { usage: { points: 0, earned: 0, questions: 0, children: 1, last_seen: null } };  // pre-migration RPC

  const sNever = sum(NEVER), sTried = sum(TRIED), sActive = sum(ACTIVE);
  ok('a family that has never opened a question says "not started"', /not started/.test(sNever));
  ok('and does NOT claim they got something wrong', !/none right|none correct/.test(sNever));

  ok('a family that tried and got nothing right says so', /none right yet/.test(sTried));
  ok('it names how many they tried', />1 tried|1 tried/.test(sTried));
  ok('and does NOT say "not started"', !/not started/.test(sTried));

  // ⚠ The whole point: these two must not render the same text.
  ok('the two states produce DIFFERENT chips', sNever.replace(/\s+/g, '') !== sTried.replace(/\s+/g, ''));

  ok('an active family still leads with questions answered', /27 answered/.test(sActive));
  ok('an active family is not labelled as idle', !/not started|none right/.test(sActive));

  // ⚠ Unknown is not zero. An un-migrated database returns no `attempted`, and
  //   guessing "not started" there is the exact wrong claim this fix removes.
  ok('a pre-migration RPC reading falls back to the non-committal wording',
    /none correct yet/.test(sum(UNKNOWN)) && !/not started/.test(sum(UNKNOWN)));

  // The expanded row prints the denominator ON the line, so the two counts
  // explain each other rather than disagreeing.
  ok('the detail line pairs correct with tried', /0<\/b> of <b>1<\/b> tried/.test(det(TRIED)));
  ok('a never-started family reads "nothing attempted yet"', /nothing attempted yet/.test(det(NEVER)));
  ok('a never-started family is not given a fake denominator', !/of <b>0<\/b>/.test(det(NEVER)));
  ok('an active family shows both numbers', /27<\/b> of <b>121<\/b> tried/.test(det(ACTIVE)));
  ok('"last active" is still reported', /last active/.test(det(NEVER)));

  // ⚠ The chip and the child panel are the two lines that contradicted each
  //   other. The child panel's wording lives in app.js; keep them in step.
  const appSrc = fs.readFileSync(path.join(ROOT, 'engine/app.js'), 'utf8');
  ok('the child panel still has its own "has not practised" wording',
    /[Hh]as not practised yet/.test(appSrc) || /[Hh]as not practised yet/.test(adminSrc));
}

// ── The migration that supplies `attempted` ─────────────────────────────────
// ⚠ Read the NEWEST migration, not the original — the live function is the
//   union of both, and the 2026-09-16 file above no longer describes it.
{
  const add = fs.readFileSync(path.join(ROOT, 'migrations/20260923_family_attempted.sql'), 'utf8');
  ok('the RPC returns `attempted`', /'attempted',\s+x\.attempted/.test(add));
  ok('attempted counts progress rows, not point events',
    /FROM public\.student_question_progress pr[\s\S]{0,120}pr\.attempts > 0/.test(add));
  // ⚠ Inferring "did they practise" from last_seen is wrong: it folds in
  //   student_points.updated_at, and 97% of points on production are legacy XP,
  //   so a family with carried-forward points and zero attempts would read as
  //   having practised.
  ok('it does not infer practice from last_seen', /Not inferred from `last_seen`/.test(add));
  ok('the admin gate is still the first act', add.indexOf('IF NOT public.is_admin()') < add.indexOf('SELECT coalesce(jsonb_object_agg'));
  ok('it still cannot enumerate', /f\.parent_id = ANY\(p_parents\)/.test(add));
  ok('and is still capped to a page', /> 200/.test(add));
}

console.log(`${checks - fails}/${checks} admin family-usage checks passed`);
process.exit(fails ? 1 : 0);
