'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  What a CHILD sees on their own question report.
//
//  WHY THIS EXISTS — question_report_messages is admin-only (a child has no
//  JWT: they are anon plus an x-student-token), so the pupil's inbox rendered
//  get_student_reports().last_admin_message — ONE message. Two consequences,
//  both live until 2026-09-23:
//    · a second admin reply REPLACED the first, so a follow-up correction
//      silently overwrote the message it was correcting;
//    · the child's OWN follow-ups were never shown to them. add_report_message
//      has always let them post one — the textarea is right there in the modal
//      — and nothing read them back, so a child sent a message and watched it
//      disappear. _sendThreadReply() then CLOSED the modal, which is what made
//      it read as "nothing happened".
//  get_student_report_thread() is the read side that was missing.
//
//  ⚠ The RPC half is verified separately and against PRODUCTION, over the real
//    anon + x-student-token path (ownership isolation, expiry, and that an
//    unknown id answers exactly as a non-owned one so the error is not an
//    existence oracle). This file covers the RENDER half.
//
//  ⚠ Same extraction technique as test-report-parent-line.js: the renderer's
//    own source text is pulled out of engine/app.js and run against a fake DOM,
//    rather than reimplemented here — a harness copy would stay green while the
//    app drifted.
//
//  Run:  node scripts/test-student-report-thread.js
// ══════════════════════════════════════════════════════════════════════════

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const APP = fs.readFileSync(path.resolve(__dirname, '../engine/app.js'), 'utf8');
const STORE = fs.readFileSync(path.resolve(__dirname, '../engine/store.js'), 'utf8');

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('OK   ' + label); }
  else { fail++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail).slice(0, 400) : '')); }
};

function extract(src, decl) {
  const needle = '\n' + decl + '(';
  const starts = [];
  let from = 0, at;
  while ((at = src.indexOf(needle, from)) !== -1) { starts.push(at); from = at + 1; }
  if (starts.length !== 1) return { src: null, count: starts.length };
  let i = src.indexOf('{', starts[0] + needle.length), depth = 0, end = -1;
  for (let j = i; j < src.length; j++) {
    const c = src[j];
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { end = j; break; } }
  }
  return { src: src.slice(starts[0] + 1, end + 1), count: 1 };
}

const REPORT_ID = 'rep-1';
const baseReport = {
  id: REPORT_ID, report_type: 'wrong_answer', status: 'resolved',
  created_at: '2026-09-22T17:09:27.500Z',
  question_text: 'Which sentence uses a SIMILE to describe something?\n__meta__{"studentName":"Samaira"}',
};

// Build a context that runs the real _renderReportThread against a fake DOM.
function run({ report = baseReport, messages = [], modalId = REPORT_ID, haveModal = true } = {}) {
  const got = extract(APP, 'async function _renderReportThread');
  if (!got.src) return { missing: got.count };
  const threadEl = { innerHTML: '', scrollTop: 0, scrollHeight: 999 };
  const modal = { dataset: { reportId: modalId } };
  const ctx = vm.createContext({
    console,
    _inboxCache: [report],
    ACTIVE_STUDENT_ID: 'kid-1',
    Store: { loadStudentReportThread: async () => messages },
    _REPORT_TYPE_LABELS: { wrong_answer: '❌ Wrong answer' },
    _attr: s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'),
    document: {
      getElementById: id => id === 'modal-report-thread' ? (haveModal ? modal : null)
        : id === 'thread-messages' ? threadEl : null,
    },
  });
  vm.runInContext(got.src + '\nthis.f = _renderReportThread;', ctx);
  return { el: threadEl, done: ctx.f(REPORT_ID) };
}

(async () => {
  {
    const got = extract(APP, 'async function _renderReportThread');
    ok('_renderReportThread() is defined exactly once in engine/app.js', got.count === 1, got.count);
  }

  // ── the whole conversation, in order ───────────────────────────────────
  {
    const r = run({ messages: [
      { id: 'm1', author_type: 'admin',   message: 'First admin reply',  created_at: '2026-09-23T04:40:00Z' },
      { id: 'm2', author_type: 'student', message: 'Thank you!',         created_at: '2026-09-23T05:00:00Z' },
      { id: 'm3', author_type: 'admin',   message: 'Second admin reply', created_at: '2026-09-23T06:00:00Z' },
    ] });
    await r.done;
    const html = r.el.innerHTML;
    ok('the FIRST admin reply is still shown, not replaced by the second',
      /First admin reply/.test(html), html.slice(0, 300));
    ok('the second admin reply is shown too', /Second admin reply/.test(html));
    ok("the child's own follow-up is shown back to them", /Thank you!/.test(html));
    ok('they appear oldest first, so the conversation reads downward',
      html.indexOf('First admin reply') < html.indexOf('Thank you!')
      && html.indexOf('Thank you!') < html.indexOf('Second admin reply'), html.slice(0, 200));
    ok('the question under discussion is shown at the top',
      html.indexOf('SIMILE') < html.indexOf('First admin reply'));
    ok('an admin message is not labelled as the child',
      /Teacher/.test(html) && !/Admin/.test(html), html.slice(0, 200));
    ok('the view scrolls to the newest message', r.el.scrollTop === r.el.scrollHeight);
  }

  // ── the reason chip is not a message the child typed ───────────────────
  // submitReport() sends `msg || reportType`, so a report filed with nothing
  // typed carries its own slug. Showing the child "wrong_answer" as their own
  // words is the same defect the admin panel had.
  {
    const r = run({ report: { ...baseReport, message: 'wrong_answer' } });
    await r.done;
    ok('a report filed with no comment shows the reason, never the raw slug',
      /Wrong answer/.test(r.el.innerHTML) && !/wrong_answer/.test(r.el.innerHTML), r.el.innerHTML.slice(0, 300));
  }
  {
    const r = run({ report: { ...baseReport, message: 'The answer looks wrong to me' } });
    await r.done;
    ok('a comment the child really typed is shown as theirs',
      /The answer looks wrong to me/.test(r.el.innerHTML));
  }

  // ── nothing back yet ───────────────────────────────────────────────────
  {
    const r = run({ messages: [{ id: 'm1', author_type: 'student', message: 'Any news?', created_at: '2026-09-23T05:00:00Z' }] });
    await r.done;
    ok('a thread with only the child talking still says no reply yet',
      /No reply yet/.test(r.el.innerHTML), r.el.innerHTML.slice(0, 300));
  }
  {
    const r = run({ messages: [{ id: 'm1', author_type: 'admin', message: 'Looking into it', created_at: '2026-09-23T05:00:00Z' }] });
    await r.done;
    ok('once an admin has replied it does not', !/No reply yet/.test(r.el.innerHTML));
  }

  // ── the stale-window guard ─────────────────────────────────────────────
  // ⚠ The fetch is async. If the child closed the modal or opened a different
  //   report meanwhile, painting would drop one conversation into another's
  //   window.
  {
    const r = run({ modalId: 'a-different-report', messages: [{ id: 'm1', author_type: 'admin', message: 'leaked', created_at: '2026-09-23T05:00:00Z' }] });
    await r.done;
    ok("a reply never paints into a window showing another report's thread",
      r.el.innerHTML === '', r.el.innerHTML);
  }
  {
    const r = run({ haveModal: false, messages: [{ id: 'm1', author_type: 'admin', message: 'leaked', created_at: '2026-09-23T05:00:00Z' }] });
    await r.done;
    ok('nor into a modal the child has already closed', r.el.innerHTML === '', r.el.innerHTML);
  }

  // ── escaping ───────────────────────────────────────────────────────────
  {
    const r = run({ messages: [{ id: 'm1', author_type: 'admin', message: '<img src=x onerror=alert(1)>', created_at: '2026-09-23T05:00:00Z' }] });
    await r.done;
    ok('an admin message is escaped, not rendered as markup',
      !/<img src=x/.test(r.el.innerHTML) && /&lt;img/.test(r.el.innerHTML), r.el.innerHTML.slice(0, 300));
  }

  // ── the wiring ─────────────────────────────────────────────────────────
  ok('the modal records which report it belongs to',
    /modal\.dataset\.reportId = reportId/.test(APP));
  // ⚠ It used to close the modal on send, which is why a child's own message
  //   appeared to go nowhere.
  {
    const body = APP.slice(APP.indexOf('async function _sendThreadReply'));
    const fn = body.slice(0, body.indexOf('\n}') + 2);
    ok('sending a follow-up no longer closes the window',
      !/modal-report-thread'\)\?\.remove\(\)/.test(fn), fn);
    ok('and repaints the thread so the child sees their own message land',
      /await _renderReportThread\(reportId\)/.test(fn));
    ok('the inbox cache is rebuilt BEFORE the repaint reads the report out of it',
      fn.indexOf('await renderStudentInbox()') < fn.indexOf('await _renderReportThread(reportId)'));
  }
  ok('Store exposes the thread reader', /loadStudentReportThread/.test(STORE)
    && /replyToReport, loadReportMessages, loadStudentReports, loadStudentReportThread/.test(STORE));
  ok('it calls the RPC, not the admin-only table',
    /rpc\('get_student_report_thread'/.test(STORE));
  // ⚠ A parent previewing has a JWT and no student token; the RPC needs the id.
  ok('it passes the student id so a previewing parent gets the thread too',
    /p_student_id: studentId/.test(STORE));

  console.log(`\nStudent report thread: ${pass} passed, ${fail} failed.`);
  process.exit(fail ? 1 : 0);
})();
