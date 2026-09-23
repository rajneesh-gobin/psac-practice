'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  The admin report card's two text lines, run from the REAL source.
//
//    · "Reporter's comment"  — must not print the report-type slug as though
//      the reporter had written it.
//    · "Parent: …"           — the adult behind the reporting child.
//
//  WHY THIS SHAPE — both helpers live inside the AdminPanel IIFE
//  (`const AdminPanel = (() => { … })()`), so nothing about them is reachable
//  from outside, and the screens that use them need an admin session and a
//  live database. Re-implementing them in the harness would be circular: the
//  test would then assert against its own copy and stay green while the app
//  drifted. So this EXTRACTS each function's source text from engine/admin.js
//  and runs THAT, against a fake DOM. The bytes under test are the shipped
//  bytes; only the surroundings are fake.
//
//  ⚠ If a function is renamed or duplicated the extraction fails loudly rather
//    than silently testing nothing — that is the first check in each block.
//
//  Run:  node scripts/test-report-parent-line.js
// ══════════════════════════════════════════════════════════════════════════

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const SRC = fs.readFileSync(path.resolve(__dirname, '../engine/admin.js'), 'utf8');

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('OK   ' + label); }
  else { fail++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail).slice(0, 400) : '')); }
};

// Pull one `function name(...) { … }` out of the file by brace balance, so the
// body may contain anything (template literals, nested braces, regexes).
function extract(name) {
  const needle = '\n  function ' + name + '(';
  const starts = [];
  let from = 0, at;
  while ((at = SRC.indexOf(needle, from)) !== -1) { starts.push(at); from = at + 1; }
  if (starts.length !== 1) return { src: null, count: starts.length };
  let i = SRC.indexOf('{', starts[0] + needle.length), depth = 0, end = -1;
  for (let j = i; j < SRC.length; j++) {
    const c = SRC[j];
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { end = j; break; } }
  }
  return { src: SRC.slice(starts[0] + 1, end + 1), count: 1 };
}

// ── 1 · "Reporter's comment" ─────────────────────────────────────────────
// The pupil's report modal makes the comment box OPTIONAL, and submitReport()
// in app.js sends `msg || reportType`. A report filed with nothing typed
// therefore arrives with its own type slug as the message, and printing that
// raw put "wrong_answer" directly under the "❌ Wrong answer" chip — it reads
// as a complaint the reporter never made. Measured on the g3eng-wrt-011
// report, 2026-09-22, which is what sent this whole investigation off.
{
  const got = extract('_reportComment');
  ok('_reportComment() is defined exactly once in engine/admin.js', got.count === 1, got.count);
  if (got.src) {
    const ctx = vm.createContext({});
    vm.runInContext(got.src + '\nthis.f = _reportComment;', ctx);
    const f = ctx.f;
    const cases = [
      ['the slug fallback is not a comment', { message: 'wrong_answer', report_type: 'wrong_answer' }, null],
      ['a real comment survives', { message: 'Strange answers', report_type: 'wrong_answer' }, 'Strange answers'],
      ['typed text that merely resembles the label survives', { message: 'Wrong answer', report_type: 'wrong_answer' }, 'Wrong answer'],
      ['an empty message is not a comment', { message: '', report_type: 'typo' }, null],
      ['whitespace is not a comment', { message: '   ', report_type: 'typo' }, null],
      ['a slug with stray whitespace is still not a comment', { message: ' typo ', report_type: 'typo' }, null],
      ['a missing message is not a comment', { report_type: 'typo' }, null],
      ['a comment with no type survives', { message: 'looks odd' }, 'looks odd'],
    ];
    for (const [label, row, want] of cases) ok(label, f(row) === want, { got: f(row), want });
  }
}

// ── 2 · the parent line ──────────────────────────────────────────────────
// A report carries a student_id and a name snapshot and nothing else, so an
// admin acting on one had to go and hand-search the Members tab for a child
// whose name does not appear in it.
{
  const got = extract('_paintReportFamilies');
  ok('_paintReportFamilies() is defined exactly once in engine/admin.js', got.count === 1, got.count);
  if (got.src) {
    // A fake DOM: just enough for querySelectorAll + dataset + the two writes.
    const make = id => ({ dataset: { reportFamily: id }, textContent: '', innerHTML: '' });
    const els = {
      resolved: make('kid-1'),   // a child with a family
      gone:     make('kid-2'),   // a family that no longer exists
      pending:  make('kid-3'),   // not looked up yet
      hostile:  make('kid-4'),   // a family name that must not become markup
    };
    const ctx = vm.createContext({
      document: { querySelectorAll: () => Object.values(els) },
      _esc: str => String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'),
      _memberEmails: { 'parent-1': 'nush@example.com' },
      _reportFamilies: {
        'kid-1': { parentId: 'parent-1', parentName: 'Nush K', familyName: 'Kurmoo', familyCode: '3FDE9A' },
        'kid-2': null,
        // 'kid-3' deliberately absent — never looked up
        'kid-4': { parentId: 'p<4', parentName: '<img src=x onerror=alert(1)>', familyName: 'A & B', familyCode: 'ZZ' },
      },
    });
    vm.runInContext(got.src + '\nthis.f = _paintReportFamilies;', ctx);
    ctx.f();

    ok('the parent is named', /Parent: Nush K/.test(els.resolved.innerHTML), els.resolved.innerHTML);
    ok('the family name and code are shown, so an admin can find the account',
      /Kurmoo/.test(els.resolved.innerHTML) && /3FDE9A/.test(els.resolved.innerHTML), els.resolved.innerHTML);
    ok('the email span carries data-member-email so the existing painter fills it',
      /data-member-email="parent-1"/.test(els.resolved.innerHTML), els.resolved.innerHTML);
    ok('and it is seeded from the cache the Members tab may already have filled',
      /nush@example\.com/.test(els.resolved.innerHTML), els.resolved.innerHTML);

    ok('a child whose family is gone says so rather than showing a blank',
      /no family/.test(els.gone.textContent), els.gone);

    // ⚠ The whole point of distinguishing undefined from null: a row still in
    //   flight must not be painted as "no parent" for the split second before
    //   the lookup lands, nor left saying that if the lookup fails.
    ok('a row that has not been looked up yet is left untouched',
      els.pending.innerHTML === '' && els.pending.textContent === '', els.pending);

    ok('a hostile family name is escaped, not rendered',
      !/<img/.test(els.hostile.innerHTML) && /&lt;img/.test(els.hostile.innerHTML), els.hostile.innerHTML);
    ok('and a quote-bearing id cannot break out of the attribute',
      !/data-member-email="p<4"/.test(els.hostile.innerHTML), els.hostile.innerHTML);
  }
}

// ── 3 · the wiring ───────────────────────────────────────────────────────
// The lookup is fired from the reports render and must stay that way.
ok('the reports render kicks off the family lookup',
  /_loadReportFamilies\(_reportsAll\)/.test(SRC));
// ⚠ BOTH report surfaces, or an admin reads one answer on the dashboard and a
//   different one on the Reports screen for the same row.
ok('the pending-reports panel kicks it off too',
  /_loadReportFamilies\(data\)/.test(SRC));
ok('both cards carry the placeholder the painter writes into',
  (SRC.match(/data-report-family="\$\{_esc\(r\.student_id\)\}"/g) || []).length === 2,
  (SRC.match(/data-report-family=[^\n]*/g) || []));
// ⚠ Caching a failed lookup as "no parent" would blank every row for the rest
//   of the session over one dropped connection.
ok('a failed lookup caches nothing and returns',
  /could not resolve the families behind these reports[\s\S]{0,120}return;/.test(SRC));

// ── 4 · the question bank the report card falls back to ──────────────────
// It preloaded grades 4, 5 and 6 by literal, written when those were the only
// live ones. Every grade 1-9 has been live since 2026-09-16, so a report on
// any other grade rendered "is not in the question bank loaded here" — which
// reads as a missing question rather than an unloaded grade. Samaira's Grade 3
// report is exactly that case.
{
  const block = SRC.slice(SRC.indexOf('if (!_reportsBankLoaded)'), SRC.indexOf('_reportsBankLoaded = true;'));
  ok('the reports bank preload names no grade by literal',
    !/loadAllForGrade\(\s*\d/.test(block), block.match(/loadAllForGrade\([^)]*\)/g));
  ok('it derives the grades from the live packs instead',
    /SUBJECT_PACKS[\s\S]{0,300}comingSoon[\s\S]{0,300}loadAllForGrade\(g\)/.test(block));
}

// ── 5 · the reply an admin just sent must be visible ─────────────────────
// sendAdminReply() succeeded and called loadReports(), which REBUILDS every
// card and empties #report-thread-<id> back to a bare "Load message thread"
// button. The card itself stays open (_reportsOpen), so the reply simply
// vanished and it read as though nothing had been saved. It had been: the
// pupil's inbox carried it the whole time (get_student_reports returns
// reply_count and last_admin_message).
{
  const body = SRC.slice(SRC.indexOf('async function sendAdminReply'));
  const fn = body.slice(0, body.indexOf('\n  }') + 4);
  ok('sendAdminReply awaits the rebuild', /await loadReports\(\)/.test(fn), fn.slice(0, 200));
  ok('and then repaints the thread, so the reply is on screen',
    /await loadReportThread\(id\)/.test(fn));
  ok('the rebuild is awaited BEFORE the thread is painted into it',
    fn.indexOf('await loadReports()') < fn.indexOf('await loadReportThread(id)'));
}

// The button said the same thing whether there were five messages or none.
{
  const got = extract('_paintReportThreadCounts');
  ok('_paintReportThreadCounts() is defined exactly once', got.count === 1, got.count);
  if (got.src) {
    const btns = [
      { dataset: { reportThreadBtn: 'rep-1' }, textContent: 'Load message thread' },
      { dataset: { reportThreadBtn: 'rep-2' }, textContent: 'Load message thread' },
      { dataset: { reportThreadBtn: 'rep-3' }, textContent: 'Load message thread' },
    ];
    const ctx = vm.createContext({
      document: { querySelectorAll: () => btns },
      _reportThreadCounts: { 'rep-1': 2, 'rep-2': 0 },   // rep-3 not counted yet
    });
    vm.runInContext(got.src + '\nthis.f = _paintReportThreadCounts;', ctx);
    ctx.f();
    ok('a report with replies says how many', /\(2\)/.test(btns[0].textContent), btns[0].textContent);
    ok('a report with none says so instead of inviting a pointless load',
      /No follow-up/.test(btns[1].textContent), btns[1].textContent);
    ok('a report not yet counted keeps its original label',
      btns[2].textContent === 'Load message thread', btns[2].textContent);
  }
  ok('the reports render kicks off the count', /_loadReportThreadCounts\(_reportsAll\)/.test(SRC));
  ok('the thread button carries the attribute the painter matches on',
    /data-report-thread-btn="\$\{safeId\}"/.test(SRC));
}

console.log(`\nReport parent line: ${pass} passed, ${fail} failed.`);
process.exit(fail ? 1 : 0);
