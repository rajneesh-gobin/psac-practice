'use strict';
// The pending-report panel in the Questions tab: who reported it, which
// question it is, and collapsed by default.
//
// WHY THIS EXISTS
// The panel used to select five columns - id, question_id, question_text,
// message, created_at - and render every report fully expanded. Measured
// against three real open reports, that produced a screen an admin could not
// act on:
//   - NO REPORTER anywhere on the card. The row carried no students join and
//     the code never read reporter_id or student_id, so there was nothing to
//     print even when the database knew who it was.
//   - "Question preview unavailable. Open Reports to investigate this ID."
//     whenever question_text was not stored - which is the admin being sent to
//     a different screen to find out what they are looking at. The full
//     Reports tab had been resolving the stem out of STATIC_QUESTIONS the whole
//     time.
//   - Every card fully expanded, so three reports filled the screen and the
//     "+ Add question" controls above them were pushed out of reach. The
//     Reports tab had already been through this and uses <details>; its own
//     comment says a full card "is close to a screenful".
//   - Only status = 'open' was counted, by the badge AND by this panel. A
//     report an admin picked up moves to 'in_review' and fell out of both,
//     visible then only on the full Reports screen. Measured: a real bug report
//     from a Grade 5 pupil ("The scratch pad doesnt work") sat at in_review for
//     five days, counted nowhere.
//
// ⚠ This drives the REAL _loadPendingReports() with a stubbed Supabase and a
//   stubbed element, and asserts on the HTML it actually writes. Reading the
//   source and reasoning about what it would render is what let the panel drift
//   away from the Reports tab in the first place.
//
//   node scripts/test-admin-pending-reports.js

const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const src = fs.readFileSync('engine/admin.js', 'utf8').replace(/\r/g, '');

function slice(startNeedle, endNeedle) {
  const a = src.indexOf(startNeedle);
  assert.ok(a >= 0, 'anchor not found: ' + startNeedle);
  const b = src.indexOf(endNeedle, a);
  assert.ok(b > a, 'end anchor not found: ' + endNeedle);
  return src.slice(a, b);
}

// The real code, lifted out and run for real.
// ⚠ The badge block carries _REPORT_UNFINISHED, which the panel also uses. It
//   goes into BOTH contexts, which is the point: if the two ever stop sharing
//   one definition, the panel context stops resolving it and this test dies
//   loudly rather than quietly measuring two different queues.
const TYPE_LABELS  = slice('  const _REPORT_TYPE_LABELS = {', '  function _diffBadge(');
const BADGE_BLOCK  = slice("  // ⚠ 'open' IS NOT THE WHOLE QUEUE.", '  function _escRpt(s)');
const ESC_BLOCK    = slice('  function _escRpt(s)', '\n\n');
const PANEL_BLOCK  = slice('  const _qmReportsOpen = new Set();', '  async function qmResolveReport(');
const blocks = [TYPE_LABELS, BADGE_BLOCK, ESC_BLOCK, PANEL_BLOCK].join('\n');

// Five reports shaped like the real ones that exposed each defect: two written
// by a policy probe with no student and no stored stem, one pupil report whose
// stem has to be recovered from the question bank, one carrying the full
// __meta__ blob Store.reportQuestion writes, and one already at in_review.
const ROWS = [
  { id: 'r1', question_id: 'test-policy-check', question_text: null, message: 'policy test',
    created_at: '2026-09-09T08:00:00Z', report_type: 'other',
    chapter_id: null, student_id: null, reporter_id: 'ab12cd34-0000-0000-0000-000000000000', students: null },
  { id: 'r2', question_id: 'test-policy-check', question_text: '', message: 'policy test - ignore',
    created_at: '2026-09-09T09:00:00Z', report_type: 'typo',
    chapter_id: null, student_id: null, reporter_id: null, students: null },
  // No stored stem: this one must be recovered from STATIC_QUESTIONS, figure and all.
  { id: 'r3', question_id: 'g5eng-psg-010', question_text: null, message: 'dsfsf',
    created_at: '2026-09-10T07:00:00Z', report_type: 'wrong_answer',
    chapter_id: 'g5eng-passages', student_id: 'ff99ee88-0000-0000-0000-000000000000',
    reporter_id: null, students: { display_name: 'Anaya', grade: 5 } },
  // Shaped exactly as Store.reportQuestion writes one: the stem, then the
  // __meta__ blob carrying studentName, mode, options and answer.
  { id: 'r4', question_id: 'g5eng-psg-011', message: 'the second option is the same as the third',
    question_text: 'Which word means the same as “tired”?'
      + '\n__meta__' + JSON.stringify({ studentName: 'Shanvi', mode: 'exam', options: ['weary','sleepy','sleepy','busy'], answer: 'weary' }),
    created_at: '2026-09-10T08:00:00Z', report_type: 'wrong_options', status: 'open',
    chapter_id: 'g5eng-passages', student_id: 'ff99ee88-0000-0000-0000-000000000000',
    reporter_id: null, students: null },
  // Picked up by an admin but not finished. This is the row that used to fall
  // out of the badge and out of this panel the moment its status changed - a
  // real one sat here for five days, counted nowhere.
  { id: 'r5', question_id: 'g5e-cov-future-1', question_text: null,
    message: 'The scratch pad doesnt work',
    created_at: '2026-09-05T06:41:39Z', report_type: 'other', status: 'in_review',
    chapter_id: null, student_id: 'aa11bb22-0000-0000-0000-000000000000',
    reporter_id: null, students: { display_name: 'shaan', grade: 5 } },
];

function run(rows) {
  let selected = null;
  const filters = [];
  const q = {
    select(cols, opts) { selected = cols; this._opts = opts; return this; },
    eq(col, val) { filters.push(['eq', col, val]); return this; },
    in(col, vals) { filters.push(['in', col, vals.slice().sort().join('|')]); return this; },
    order() { return this; },
    limit() { return Promise.resolve({ data: rows, error: null, count: rows.length }); },
  };
  const el = { id: 'qm-reports-section', innerHTML: '', querySelectorAll: () => [] };
  const ctx = vm.createContext({
    _sb: { from: () => q },
    document: { getElementById: id => (id === 'qm-reports-section' ? el : null) },
    // The stem is innerHTML and, since the Grade 1-2 visual banks, can be a
    // whole inline <svg>. The panel must not print that markup at the admin.
    STATIC_QUESTIONS: [{
      id: 'g5eng-psg-010', chapterId: 'g5eng-passages',
      question: '<div aria-label="a letter"><svg viewBox="0 0 10 10"><rect x="0" y="0" width="10" height="10" fill="#fff"/></svg></div>'
        + 'Read the letter, then answer the question. <b>Dear Grandma</b>, thank you for the parcel.',
    }],
    SUBJECT_PACKS: [{ id: 'grade5-english', name: 'English', grade: 5, chapters: [{ id: 'g5eng-passages', name: 'Passages & Text Types' }] }],
    QM: { qmOpenForm() {} },
    console,
  });
  vm.runInContext(blocks, ctx, { filename: 'admin.js (pending-report panel)' });
  return { ctx, el, filters, run: ctx._loadPendingReports().then(() => ({ html: el.innerHTML, selected, filters })) };
}

// The badge is a second query against the same idea. It gets the same stub, so
// the test can assert the two agree rather than trusting that they do.
function runBadge() {
  const filters = [];
  let n = null;
  const q = {
    select(cols, opts) { this._opts = opts; return this; },
    eq(col, val) { filters.push(['eq', col, val]); return this; },
    in(col, vals) { filters.push(['in', col, vals.slice().sort().join('|')]); return this; },
    then(resolve) { resolve({ count: 7, error: null }); },
  };
  const badge = { textContent: '', classList: { toggle(_c, on) { badge._hidden = on; } } };
  const ctx = vm.createContext({
    _sb: { from: () => q },
    document: { getElementById: id => (id === 'admin-reports-badge' ? badge : null) },
    console,
  });
  vm.runInContext(BADGE_BLOCK, ctx, { filename: 'admin.js (report badge)' });
  return ctx._loadReportBadge().then(() => ({ filters, badge, n }));
}

let pass = 0, fail = 0;
const ok = (cond, msg) => { if (cond) pass++; else { fail++; console.log('  FAIL ' + msg); } };

(async () => {
  const { run: pending } = run(ROWS);
  const { html, selected, filters } = await pending;

  console.log('\nthe queue is open AND in_review, in both places');
  const statusFilter = filters.find(f => f[1] === 'status');
  ok(statusFilter && statusFilter[0] === 'in',
    'the panel still filters a single status - an in_review report drops off this screen');
  ok(statusFilter && statusFilter[2] === 'in_review|open',
    'the panel queue is not exactly {open, in_review}, got ' + JSON.stringify(statusFilter));
  const badge = await runBadge();
  const badgeFilter = badge.filters.find(f => f[1] === 'status');
  ok(badgeFilter && badgeFilter[0] === 'in' && badgeFilter[2] === 'in_review|open',
    'the badge counts a different set of statuses than the list under it');
  ok(!/\bopen\b/.test(badge.badge.textContent),
    'the badge still says "open" while counting in_review too: ' + badge.badge.textContent);
  ok(/^7 /.test(badge.badge.textContent), 'the badge does not show the count it fetched');
  ok(badge.badge._hidden === false, 'a non-zero badge stayed hidden');
  ok(/\bstatus\b/.test(selected), 'the panel does not fetch status, so it cannot label a card');

  console.log('\nthe row it fetches carries the reporter');
  ok(/students!student_id\(display_name,grade\)/.test(selected),
    'the select() has no students join - the card cannot name a pupil');
  ok(/\breporter_id\b/.test(selected), 'the select() does not ask for reporter_id');
  ok(/\bstudent_id\b/.test(selected), 'the select() does not ask for student_id');
  ok(/\breport_type\b/.test(selected), 'the select() does not ask for report_type');
  ok(/\bchapter_id\b/.test(selected), 'the select() does not ask for chapter_id');

  console.log('\nevery card says who reported it');
  const cards = html.split('<details').slice(1);
  ok(cards.length === 5, 'expected 5 cards, got ' + cards.length);
  ok(cards.every(c => /Reported by /.test(c)), 'a card has no "Reported by" line');
  ok(/Reported by Anaya \(Grade 5\)/.test(html), 'the joined pupil name is not shown');
  ok(/Reported by Account ab12cd34…/.test(html),
    'a row with no student still has an account id to chase, and it is not shown');
  ok(/Reported by Not recorded/.test(html),
    'a row with nothing identifying should say so plainly');
  ok(!/Reported by (undefined|null)/.test(html), 'a missing reporter rendered as undefined/null');
  // A real report also stores the name in __meta__. When the students join comes
  // back empty - a deleted pupil, or a row RLS could not follow - that blob is
  // the last thing standing between the admin and "Not recorded".
  ok(/Reported by Shanvi/.test(html),
    'meta.studentName is not used when the students join is empty');

  console.log('\nthe mode the report was filed in survives');
  // Whether a wrong answer was met in practice or in a timed paper changes how
  // urgent it is. Store.reportQuestion records it; the panel has to show it.
  ok(/\(exam\)/.test(html),
    'practice vs exam is captured by Store.reportQuestion but not shown');
  ok(!/\((undefined|null)\)/.test(html),
    'a row with no mode rendered an empty bracket instead of omitting it');
  ok((html.match(/\((?:practice|exam)\)/g) || []).length === 1,
    'mode was shown for a row that never recorded one');

  console.log('\nevery card says which question it is');
  ok(/Passages &amp; Text Types/.test(html) || /Passages & Text Types/.test(html),
    'the chapter name is not shown for a question that resolves');
  ok(/English · Grade 5/.test(html), 'the subject and grade are not shown');
  ok(/Read the letter, then answer the question\./.test(html),
    'the stem was not recovered from STATIC_QUESTIONS');
  ok(!/Question preview unavailable/.test(html),
    'the panel still sends the admin to another screen instead of showing what it knows');
  ok(/is not in the question bank loaded here/.test(html),
    'an unresolvable id should say WHY there is no preview, not just that there is none');

  console.log('\nthe stem is stripped of markup, then escaped');
  ok(!/<svg/.test(html.replace(/<summary[\s\S]*?<\/summary>/g, '')),
    'a raw <svg> from a question stem reached the panel');
  ok(/\[figure\]/.test(html), 'an inline figure should be marked, not silently dropped');
  ok(!/<b>Dear Grandma<\/b>/.test(html), 'stem markup was not stripped');
  // Stripping must run BEFORE escaping, and escaping must still happen: an
  // ampersand in a chapter name is the cheapest proof that it did.
  ok(/Passages &amp; Text Types/.test(html),
    'text is not HTML-escaped - an & in a chapter name reached the page raw');
  ok(!/[^&]lt;|[^&]gt;/.test(html.replace(/<[^>]*>/g, '')),
    'escaped angle brackets leaked into the visible text');

  console.log('\ncollapsed by default, and it remembers what you opened');
  ok(cards.length === 5 && cards.every(c => !/^[^>]*\sopen[\s>]/.test(c)),
    'a card is expanded on first render - the reports fill the screen');
  ok((html.match(/<summary class="rep-sum">/g) || []).length === 5,
    'the cards do not use the shared rep-sum summary the Reports tab uses');
  ok(/ontoggle="AdminPanel\.toggleQmReportOpen\(/.test(html),
    'opening a card is not recorded, so resolving one collapses the rest');

  // open one, re-render, and it should come back open
  const second = run(ROWS);
  second.ctx.toggleQmReportOpen('r3', true);
  const again = await second.ctx._loadPendingReports().then(() => second.el.innerHTML);
  const r3card = again.split('<details').find(c => /g5eng-psg-010/.test(c));
  ok(/\sopen[\s>]/.test(r3card || ''), 'a card opened by the admin closed itself on re-render');

  console.log('\na mixed queue labels which reports are already picked up');
  ok(/>in review</.test(html), 'an in_review report is not labelled as such');
  ok((html.match(/>open</g) || []).length === 4, 'the open reports are not labelled');
  ok(/shaan/.test(html), 'the in_review report is not listed at all');

  console.log('\nthe summary is enough to triage without opening');
  ok(/❌ Wrong answer/.test(html) && /✏️ Typo/.test(html),
    'the report type is not on the summary');
  ok(/g5eng-psg-010/.test(html) && /test-policy-check/.test(html),
    'the question id is not on the summary');
  ok(/dsfsf/.test(html), 'the first line of the message is not on the summary');

  console.log('\nthe report-type map is shared with the Reports tab');
  ok((src.match(/wrong_answer:'❌ Wrong answer'/g) || []).length === 1,
    'the report-type label map is defined twice - the two screens can describe one row differently');

  console.log('\nno reports means no panel');
  const empty = await run([]).run;
  ok(empty.html === '', 'an empty queue should render nothing, not an empty box');

  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  process.exitCode = fail ? 1 : 0;
})();
