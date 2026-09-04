'use strict';
const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
const source = fs.readFileSync('engine/admin.js', 'utf8');
const panel = { innerHTML: '', querySelectorAll: () => [] };
let result = { data: [{id:'r1', question_id:'g5eng-psg-010', question_text:'What is the answer?\n__meta__{"answer":"secret"}', message:'<script>bad</script>'}], count: 23 };
let resolved = false;
const notices = [];
const ctx = vm.createContext({
  document: { getElementById: () => panel },
  _sb: { from: () => {
    const query = { select: () => query, eq: () => query, order: () => query, limit: async () => result };
    return query;
  } },
  Store: { resolveReport: async () => resolved }, toast: text => notices.push(text)
});
vm.runInContext(source.slice(source.indexOf('  function _parseReportMeta('), source.indexOf('  function _diffBadge(')), ctx);
vm.runInContext(source.slice(source.indexOf('  function _escRpt('), source.indexOf('  // ── Question Manager')), ctx);
(async () => {
  await ctx._loadPendingReports();
  assert.match(panel.innerHTML, /23 question reports awaiting review/);
  assert.match(panel.innerHTML, /latest 1 of 23/);
  assert.match(panel.innerHTML, /Reported issue/);
  assert.match(panel.innerHTML, /What is the answer/);
  assert(!panel.innerHTML.includes('secret'));
  assert(!panel.innerHTML.includes('<script>'));
  assert.match(panel.innerHTML, /&lt;script&gt;/);
  await ctx.qmResolveReport('r1');
  assert.match(notices.pop(), /Could not resolve/);
  result = { error: { message: 'offline' } };
  await ctx._loadPendingReports();
  assert.match(panel.innerHTML, /Could not load/);
  console.log('Pending reports: exact totals, labelled escaped previews, metadata removal and error states passed.');
})().catch(e => { console.error(e); process.exitCode = 1; });
