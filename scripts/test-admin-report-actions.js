'use strict';
// What an admin can DO with a report, and in what order.
//
// WHY THIS EXISTS
// A spam report arrived on the Questions tab looking like this:
//
//   g5eng-psg-010 · 💬 Other · open · "dsfsf" · Reported by Shanvi (Grade 5)
//   [ Edit question ]  [ Mark as resolved ]
//
// Two buttons, neither of which is what you do with spam. Delete and Won't fix
// existed the whole time — on the OTHER screen, behind a "Review all reports →"
// link an admin had to already know meant "the actions are over there".
//
// And on that other screen the reply box was rendered only while the report was
// still `open`:
//     ${isOpen && !isContact ? `<textarea id="report-reply-…">` : ''}
// so pressing ✅ Resolved removed the only way to tell the child why — the two
// were separate actions and the order was a trap nothing warned about.
//
// What this pins down:
//  - one action: the message goes to the child's inbox, THEN the status moves;
//  - a failed message never moves the status, and a failed status never reports
//    itself as a send — 'message sent, status unchanged' is a real outcome and
//    must not read like success;
//  - the panel on the Questions tab can resolve, reject AND delete;
//  - the two panels use DIFFERENT textarea ids, because both can be in the DOM
//    at once and two elements with one id means getElementById returns the
//    wrong box.
//
//   node scripts/test-admin-report-actions.js

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

// The real code, lifted out and run for real — not read and reasoned about.
const ACTIONS = slice('  // ⚠ THE REPLY AND THE STATUS USED TO BE TWO SEPARATE ACTIONS', '  function deleteReport(id, label) {');
const STATUS  = slice('  async function setReportStatus(id, status) {', '  async function sendAdminReply(');
const QM_ACTS = slice('  async function qmResolveReport(id) {', '  // ── Question Manager');
const PANEL   = slice('  const _qmReportsOpen = new Set();', '  async function qmResolveReport(');
const LABELS  = slice('  const _REPORT_TYPE_LABELS = {', '  function _diffBadge(');
const BADGE   = slice("  // ⚠ 'open' IS NOT THE WHOLE QUEUE.", '  function _escRpt(s)');
const ESC     = slice('  function _escRpt(s)', '\n\n');

let checks = 0;
const ok = (label, cond, detail) => { assert(cond, label + (detail ? ' — ' + JSON.stringify(detail) : '')); checks++; console.log('✓ ' + label); };

// ── The action functions ────────────────────────────────────────────────────
function makeCtx({ replyOk = true, statusOk = true, boxes = {} } = {}) {
  const calls = [];
  const toasts = [];
  const els = {};
  for (const [id, value] of Object.entries(boxes)) els[id] = { value };
  const ctx = vm.createContext({
    console,
    document: { getElementById: id => els[id] || null },
    toast: m => toasts.push(String(m)),
    Store: {
      replyToReport: async (id, msg) => { calls.push(['reply', id, msg]); return { ok: replyOk }; },
      resolveReport: async id => { calls.push(['resolve', id]); return statusOk; },
      setReportStatus: async (id, s) => { calls.push(['status', id, s]); return statusOk; },
    },
    loadReports: async () => { calls.push(['refresh:reports']); },
    _loadReportBadge: async () => { calls.push(['refresh:badge']); },
    _loadPendingReports: async () => { calls.push(['refresh:panel']); },
  });
  vm.runInContext([ACTIONS, STATUS, QM_ACTS].join('\n'), ctx, { filename: 'admin.js (report actions)' });
  return { ctx, calls, toasts, els };
}

(async () => {
  // 1 · The message goes first, then the status.
  {
    const t = makeCtx({ boxes: { 'report-reply-r1': '  Thanks — fixed the typo.  ' } });
    await t.ctx.resolveReport('r1');
    ok('resolving sends the typed message before it moves the status',
      JSON.stringify(t.calls.slice(0, 2)) === JSON.stringify([['reply', 'r1', 'Thanks — fixed the typo.'], ['resolve', 'r1']]), t.calls);
    ok('the box is cleared so a second press cannot send it twice', t.els['report-reply-r1'].value === '', t.els);
    ok('all three surfaces refresh', ['refresh:reports', 'refresh:badge', 'refresh:panel']
      .every(c => t.calls.some(x => x[0] === c)), t.calls);
  }

  // 2 · An empty box is not a message.
  {
    const t = makeCtx({ boxes: { 'report-reply-r1': '   ' } });
    await t.ctx.resolveReport('r1');
    ok('an empty box sends nothing and still resolves',
      !t.calls.some(c => c[0] === 'reply') && t.calls.some(c => c[0] === 'resolve'), t.calls);
  }

  // 3 · ⚠ A message that did not send must not move the status. The child would
  //     see a report closed with no explanation, and the admin would believe
  //     they had explained it.
  {
    const t = makeCtx({ replyOk: false, boxes: { 'report-reply-r1': 'This is spam.' } });
    await t.ctx.resolveReport('r1');
    ok('a failed message leaves the status alone',
      !t.calls.some(c => c[0] === 'resolve' || c[0] === 'status'), t.calls);
    ok('and says the status was NOT changed', /NOT changed/.test(t.toasts.join(' ')), t.toasts);
    ok('nothing is refreshed, because nothing happened',
      !t.calls.some(c => String(c[0]).startsWith('refresh')), t.calls);
  }

  // 4 · ⚠ The two writes fail independently. Claiming both worked is the bug.
  {
    const t = makeCtx({ statusOk: false, boxes: { 'report-reply-r1': 'Sorry about that.' } });
    await t.ctx.resolveReport('r1');
    ok('a sent message with a failed status says exactly that',
      /Message sent, but the status did not change/.test(t.toasts.join(' ')), t.toasts);
  }

  // 5 · Won't fix carries a message the same way.
  {
    const t = makeCtx({ boxes: { 'report-reply-r9': 'Not a problem with the question.' } });
    await t.ctx.setReportStatus('r9', 'wont_fix');
    ok("Won't fix sends its message too, then sets the status",
      JSON.stringify(t.calls.slice(0, 2)) === JSON.stringify([
        ['reply', 'r9', 'Not a problem with the question.'], ['status', 'r9', 'wont_fix']]), t.calls);
  }

  // 6 · ⚠ The Questions panel reads ITS OWN box. Both panels can be in the DOM,
  //     and one id on two elements means getElementById returns the wrong one.
  {
    const t = makeCtx({ boxes: { 'qm-report-reply-r3': 'Checked — the question is fine.', 'report-reply-r3': 'WRONG BOX' } });
    await t.ctx.qmRejectReport('r3');
    ok('the Questions panel reads qm-report-reply-<id>, not the Reports tab box',
      t.calls[0][2] === 'Checked — the question is fine.', t.calls);
    ok('rejecting sets wont_fix, not resolved — resolved claims something was done',
      t.calls[1][0] === 'status' && t.calls[1][2] === 'wont_fix', t.calls);
  }
  {
    const t = makeCtx({ boxes: { 'qm-report-reply-r3': 'Fixed the options.' } });
    await t.ctx.qmResolveReport('r3');
    ok('resolving from the Questions panel reads the same box',
      t.calls[0][2] === 'Fixed the options.' && t.calls[1][0] === 'resolve', t.calls);
  }

  // ── The panel's own markup ────────────────────────────────────────────────
  {
    const rows = [{
      id: 'r1', question_id: 'g5eng-psg-010', question_text: null, message: 'dsfsf',
      created_at: '2026-08-26T07:00:00Z', report_type: 'other', status: 'open',
      chapter_id: null, student_id: null, reporter_id: null,
      students: { display_name: 'Shanvi', grade: 5 },
    }];
    const q = {
      select() { return this; }, eq() { return this; }, in() { return this; }, order() { return this; },
      limit: () => Promise.resolve({ data: rows, error: null, count: rows.length }),
    };
    const el = { id: 'qm-reports-section', innerHTML: '', querySelectorAll: () => [] };
    const ctx = vm.createContext({
      console,
      _sb: { from: () => q },
      document: { getElementById: id => (id === 'qm-reports-section' ? el : null) },
      STATIC_QUESTIONS: [], SUBJECT_PACKS: [], QM: { qmOpenForm() {} },
    });
    vm.runInContext([LABELS, BADGE, ESC, PANEL].join('\n'), ctx, { filename: 'admin.js (panel)' });
    await ctx._loadPendingReports();
    const html = el.innerHTML;
    ok('the panel offers a way to reject a report', /data-report-reject/.test(html));
    ok('and a way to delete one', /data-report-delete/.test(html));
    ok('and a box to say why', /id="qm-report-reply-r1"/.test(html));
    ok('the box id is not the Reports tab id', !/id="report-reply-r1"/.test(html));
    ok('the message is described as optional, so a quick resolve stays quick',
      /optional/.test(html), html.slice(0, 0));
  }

  console.log('\nAdmin report actions: ' + checks + ' checks passed.');
})().catch(e => { console.error(e.message || e); process.exit(1); });
