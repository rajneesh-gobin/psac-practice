'use strict';
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const storeSource = fs.readFileSync('engine/store.js', 'utf8');
const adminSource = fs.readFileSync('engine/admin.js', 'utf8');
// supabase-schema.sql was folded into the one consolidated schema, so
// the admin-only DELETE rule is asserted where it now lives.
const sql = fs.readFileSync('supabase-schema.sql', 'utf8');
// Just the policy, so "DELETE FROM" inside an unrelated function body cannot
// satisfy - or break - the assertions below.
const deletePolicy = (sql.match(
  /CREATE POLICY reports_delete_admin ON public\.question_reports[\s\S]*?;/) || [''])[0];

// Exercise the real Store helper in isolation with Supabase-shaped responses.
const fnStart = storeSource.indexOf('  async function deleteReport(id)');
const fnEnd = storeSource.indexOf('  async function setReportStatus', fnStart);
assert(fnStart >= 0 && fnEnd > fnStart);
async function runDelete(response, id = 'report-1') {
  let requestedTable = null, requestedId = null;
  const query = {
    delete() { return query; },
    eq(column, value) { assert.equal(column, 'id'); requestedId = value; return query; },
    async select(column) { assert.equal(column, 'id'); return response; },
  };
  const ctx = vm.createContext({
    _sb: { from(table) { requestedTable = table; return query; } },
    console: { error() {} },
  });
  vm.runInContext(storeSource.slice(fnStart, fnEnd), ctx);
  const ok = await ctx.deleteReport(id);
  assert.equal(requestedTable, 'question_reports');
  assert.equal(requestedId, id);
  return ok;
}

(async () => {
  assert.equal(await runDelete({ data: [{ id: 'report-1' }], error: null }), true);
  assert.equal(await runDelete({ data: [], error: null }), false, 'RLS/no-row delete must not claim success');
  assert.equal(await runDelete({ data: null, error: { message: 'denied' } }), false);
  const storeExports = storeSource.split(/\r?\n/).find(l => l.includes('reportQuestion,') && l.includes('loadReports,'));
  assert.ok(storeExports, 'Store report API export line not found');
  for (const fn of ['resolveReport', 'deleteReport', 'deleteReports', 'setReportStatus'])
    assert.ok(storeExports.includes(fn), 'Store must export ' + fn);
  assert.match(adminSource, /id="report-delete-\$\{safeId\}"/);
  assert.match(adminSource, /AdminPanel\.deleteReport\('\$\{safeId\}'\)/);
  assert.match(adminSource, /Its conversation and replies will also be deleted/);
  assert.match(adminSource, /Deleting the report does not delete the question itself/);
  assert.match(adminSource, /okLabel: 'Delete report'/);
  const adminExports = adminSource.split(/\r?\n/).find(l => l.includes('loadReports,') && l.includes('setReportStatus'));
  assert.ok(adminExports, 'AdminPanel report API export line not found');
  for (const fn of ['resolveReport', 'deleteReport', 'deleteSelectedReports', 'setReportStatus'])
    assert.ok(adminExports.includes(fn), 'AdminPanel must export ' + fn);
  assert.ok(deletePolicy, 'reports_delete_admin policy missing from supabase-schema.sql');
  // ⚠ pg_policies deparses is_admin() UNQUALIFIED, because the schema pins
  //   search_path. Matching /public\.is_admin/ here would fail on a correct file.
  assert.match(deletePolicy, /FOR DELETE[\s\S]*TO authenticated[\s\S]*USING \(is_admin\(\)\)/);
  // Grants are emitted aggregated per table/grantee, not one privilege per line.
  assert.match(sql, /GRANT [A-Z, ]*\bDELETE\b[A-Z, ]* ON public\.question_reports TO authenticated;/);
  assert.doesNotMatch(deletePolicy, /DELETE\s+FROM/i, 'The rule must not itself remove reports');
  assert.doesNotMatch(sql, /DELETE\s+FROM\s+public\.question_reports/i,
    'Nothing in the schema may delete existing reports');
  console.log('Admin reports: confirmed permanent delete UI, verified DB result and the admin-only rule in supabase-schema.sql passed.');
})().catch(error => { console.error(error); process.exitCode = 1; });
