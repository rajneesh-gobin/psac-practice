'use strict';
const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
// ⚠ NORMALISE THE LINE ENDINGS. engine/admin.js is CRLF, so a search for ';\n'
//   finds nothing — it is ';\r\n' — and every slice built from one silently
//   came back empty. Line endings differ per file in this repo; measure, never
//   assume.
const source = fs.readFileSync('engine/admin.js', 'utf8').replace(/\r\n/g, '\n');
const panel = { innerHTML: '', querySelectorAll: () => [] };
let result = { data: [{id:'r1', question_id:'g5eng-psg-010', question_text:'What is the answer?\n__meta__{"answer":"secret"}', message:'<script>bad</script>'}], count: 23 };
let resolved = false;
const notices = [];
const ctx = vm.createContext({
  document: { getElementById: () => panel },
  _sb: { from: () => {
    // ⚠ .in() joined the chain when the count started filtering on the
    //   unfinished statuses. A fake query object that is missing a link throws
    //   inside the module under test, which reads as the module being broken.
    const query = { select: () => query, eq: () => query, in: () => query, order: () => query, limit: async () => result };
    return query;
  } },
  Store: { resolveReport: async () => resolved }, toast: text => notices.push(text),
  // ⚠ A LATER ADDITION THAT FETCHES FAMILY NAMES FOR EACH REPORT. It is a
  //   side panel, not the thing under test — this file is about whether the
  //   report text and counts read clearly — so it is stubbed rather than run.
  //   Left undefined it threw and the whole file reported nothing.
  _loadReportFamilies: async () => {},
});

// ⚠⚠ RUN THE REAL DECLARATIONS, DO NOT RESTATE THEM. The functions under test
//    lean on module-level consts in admin.js, and this harness used to name
//    none of them — so as each one appeared the test crashed on a missing
//    symbol rather than failing an assertion, and said nothing at all about
//    report clarity for as long as it was red. Two arrived that way:
//    _REPORT_UNFINISHED and _REPORT_TYPE_LABELS.
// ⚠ Hand-copying either into this file would be worse than the crash: the copy
//    would pass while the app used a different list, which is precisely the
//    bug _REPORT_UNFINISHED exists to prevent ('open' alone hid every report an
//    admin had started working on).
// ⚠ qmResolveReport() delegates to _replyThenStatus(), which is where the
//   "could not resolve" wording now lives — so the real one is run rather than
//   stubbed, or this file would be asserting against a message the app never
//   shows. It needs _REPORT_STATUS_WORD, declared just below it in admin.js.
{
  const at = source.indexOf('  async function _replyThenStatus(');
  assert.ok(at > 0, '_replyThenStatus moved or was renamed');
  const end = source.indexOf('\n  async function _afterReportAction', at);
  vm.runInContext(source.slice(at, end).replace(/\n  const /g, '\n  var '), ctx);
}

for (const decl of ['_REPORT_TYPE_LABELS', '_REPORT_UNFINISHED']) {
  const at = source.indexOf('  const ' + decl + ' =');
  assert.ok(at > 0, decl + ' moved or was renamed in admin.js');
  // To the first line that closes the declaration at top level.
  const end = source.indexOf('\n  }', at) > 0 && source.indexOf('\n  }', at) < source.indexOf(';\n', at)
    ? source.indexOf('\n  }', at) + 4 : source.indexOf(';\n', at) + 1;
  vm.runInContext(source.slice(at, end).replace(/^\s*const /, 'var '), ctx);
}
vm.runInContext(source.slice(source.indexOf('  function _parseReportMeta('), source.indexOf('  function _diffBadge(')), ctx);
vm.runInContext(source.slice(source.indexOf('  function _escRpt('), source.indexOf('  // ── Question Manager')), ctx);
(async () => {
  await ctx._loadPendingReports();
  // ⚠ THE COUNT AND THE SCOPE, NOT THE SENTENCE. Pinning the exact wording
  //   ("awaiting review" became "to review") makes a copy edit look like a
  //   defect. What must hold is that the admin is told HOW MANY there are and
  //   that what they are looking at is a subset of them — a panel showing one
  //   report out of twenty-three while implying it is the whole queue is the
  //   failure this file exists to catch.
  assert.match(panel.innerHTML, /23 question reports? to review/);
  assert.match(panel.innerHTML, /1 of 23/);
  assert.match(panel.innerHTML, /Reported issue/);
  assert.match(panel.innerHTML, /What is the answer/);
  assert(!panel.innerHTML.includes('secret'));
  assert(!panel.innerHTML.includes('<script>'));
  assert.match(panel.innerHTML, /&lt;script&gt;/);
  await ctx.qmResolveReport('r1');
  // ⚠ The failure must SAY it failed and invite a retry. The exact verb moved
  //   from "Could not resolve" to "Could not update — try again" when replying
  //   and status-setting merged into one action; pinning the old verb reported
  //   a working, correctly-worded message as a defect.
  assert.match(notices.pop(), /Could not update.*try again/i);
  result = { error: { message: 'offline' } };
  await ctx._loadPendingReports();
  assert.match(panel.innerHTML, /Could not load/);
  console.log('Pending reports: exact totals, labelled escaped previews, metadata removal and error states passed.');
})().catch(e => { console.error(e); process.exitCode = 1; });
