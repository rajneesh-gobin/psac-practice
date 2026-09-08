'use strict';
// Database accounting for the question importer, against a mock PostgREST.
// Loader parity, type validation and round-trip preservation live in
// scripts/test-question-import-parity.js.
const assert = require('node:assert/strict');
const { createImporter, contentMatches, newStats, statProtected,
        buildReport, printReport, accountingProblems, redactedReport } = require('../netlify/lib/question-import');
const log = { log() {}, error() {} };
const row = (id, extra = {}) => ({ id, subject_id: 'grade5-history', chapter_id: 'world', grade: 5, difficulty: 1, is_past_paper: false,
  data: { id, question: 'Which ocean is largest?', options: ['Pacific', 'Atlantic'], answer: 'Pacific', acceptableAnswers: ['Pacific'] }, ...extra });
function fakeDatabase(initial, config = {}) {
  const db = new Map(initial.map(r => [r.id, r]));
  const writes = [];
  let reads = 0;
  const fetchImpl = async (url, options) => {
    if (options.method === 'POST') {
      const batch = JSON.parse(options.body);
      writes.push(batch);
      if (config.writeError) throw new Error('Connection lost');
      if (config.writeHttpError) return new Response('', { status: 500 });
      if (!config.dropWrite) batch.forEach(r => db.set(r.id, { ...r, protected: false }));
      return new Response(JSON.stringify(config.badWrite ? [] : batch), { status: 201 });
    }
    reads++;
    if (config.readError) throw new Error('Offline');
    if (config.readHttpError) return new Response('', { status: 403 });
    if (config.invalidJson) return new Response('not JSON', { headers: { 'content-range': '0-0/1' } });
    const params = new URL(url).searchParams;
    const ids = JSON.parse(`[${params.get('id').slice(4, -1)}]`);
    const matches = ids.filter(id => db.has(id)).map(id => db.get(id));
    const offset = Number(params.get('offset'));
    const page = matches.slice(offset, offset + (config.pageSize || 50));
    return new Response(JSON.stringify(page), { headers: config.noCount ? {} : { 'content-range': `${page.length ? `${offset}-${offset + page.length - 1}` : '*'}/${matches.length}` } });
  };
  return { importer: createImporter({ url: 'https://test.invalid', key: 'fake', fetchImpl, log }), writes, db, get reads() { return reads; } };
}
const preflightOf = over => ({ ok: true, packs: 1, files: 1, filesLoaded: 1, filesSkipped: 0,
  practice: 10, papers: 2, byType: { mcq: 10 }, byGrade: { 5: 12 }, bySubject: { 'grade5-history': 10 },
  errors: [], ...over });

(async () => {
  const unchanged = row('same');
  const updated = row('changed');
  const protectedRow = row('protected', { protected: true });
  const db = fakeDatabase([{ ...unchanged, protected: false }, { ...updated, protected: false }, protectedRow]);
  const changed = { ...updated, data: { ...updated.data, options: ['Pacific', 'Indian'] } };
  const written = [];
  const stats = await db.importer.importRows([row('new'), { ...unchanged, data: { ...unchanged.data, options: ['Atlantic', 'Pacific'] } }, changed,
    { ...protectedRow, data: { ...protectedRow.data, hint: 'Different' } }], 'test', () => true, r => written.push(r.id));
  assert.deepEqual(stats, { scanned: 4, added: 1, updated: 1, unchanged: 1, protectedUnchanged: 0, protectedConflict: 1,
    failed: 0, patched: 1, patchWarnings: 0 });
  assert.equal(statProtected(stats), 1);
  assert.deepEqual(db.writes.flat().map(r => r.id), ['new', 'changed']);
  assert.deepEqual(written, ['new', 'changed'], 'only genuinely written rows are collected for verification');
  assert(!contentMatches({ options: ['a', 'A'] }, { options: ['a', 'a'] }), 'Case matters');
  assert(!contentMatches({ answer: [[1, 2]] }, { answer: [[2, 1]] }), 'Coordinates must retain order');
  assert(!contentMatches({ acceptableAnswers: ['x'] }, { acceptableAnswers: ['y'] }));

  // ⚠ Protected UNCHANGED is not an error; protected CONFLICT is.
  {
    const same = row('p', { protected: true });
    const only = fakeDatabase([same]);
    const s = await only.importer.importRows([row('p')], 'protected-same', () => true);
    assert.equal(s.protectedUnchanged, 1);
    assert.equal(s.protectedConflict, 0);
    assert.equal(s.patched, 0, 'an identical protected row must not trigger a source rewrite');
    assert.equal(only.writes.length, 0);
  }
  // A protected row the write-back refuses becomes a warning, never a write.
  {
    const conflicting = row('p2', { protected: true });
    const only = fakeDatabase([conflicting]);
    const s = await only.importer.importRows([row('p2', { data: { ...conflicting.data, hint: 'x' } })], 'protected-refused', () => false);
    assert.equal(s.protectedConflict, 1);
    assert.equal(s.patchWarnings, 1);
    assert.equal(only.writes.length, 0, 'the database version wins — nothing is written');
  }

  for (const config of [{ readError: true }, { readHttpError: true }, { invalidJson: true }, { noCount: true }]) {
    const broken = fakeDatabase([], config);
    const result = await broken.importer.importRows([row('x')], 'blocked');
    assert.equal(result.failed, 1);
    assert.equal(broken.writes.length, 0);
  }
  for (const config of [{ writeError: true }, { writeHttpError: true }, { badWrite: true }]) {
    const broken = fakeDatabase([], config);
    const collected = [];
    const result = await broken.importer.importRows([row('x')], 'failed', null, r => collected.push(r.id));
    assert.equal(result.failed, 1);
    assert.equal(result.added + result.updated, 0);
    assert.deepEqual(collected, [], 'a failed write is never handed to verification as written');
  }
  const pagedRows = Array.from({ length: 121 }, (_, i) => row(`q${i}`, { protected: false }));
  const paged = fakeDatabase(pagedRows, { pageSize: 7 });
  assert.equal((await paged.importer.importRows(pagedRows, 'paged')).unchanged, 121);
  assert(paged.reads > 3);
  assert.equal(paged.writes.length, 0);
  const duplicate = fakeDatabase([]);
  assert.equal((await duplicate.importer.importRows([row('x'), row('x')], 'duplicate')).failed, 2);
  assert.equal(duplicate.writes.length, 0);
  const papers = fakeDatabase([row('paper', { protected: true, is_past_paper: true })]);
  assert.equal(statProtected(await papers.importer.importRows([row('paper', { is_past_paper: true })], 'papers')), 1);
  assert.equal(papers.writes.length, 0);
  const many = fakeDatabase([]);
  const manyStats = await many.importer.importRows(Array.from({ length: 401 }, (_, i) => row(`new${i}`)), 'many');
  assert.equal(manyStats.added, 401);
  assert.deepEqual(many.writes.map(batch => batch.length), [200, 200, 1]);

  // ── classifyRows: the dry-run path writes nothing at all ────────────────
  {
    const dry = fakeDatabase([{ ...unchanged, protected: false }, row('prot', { protected: true })]);
    const split = await dry.importer.classifyRows([row('new1'), unchanged, row('prot'), row('new2')], 'dry');
    assert.equal(split.stats.added, 2);
    assert.equal(split.stats.unchanged, 1);
    assert.equal(split.stats.protectedUnchanged, 1);
    assert.equal(dry.writes.length, 0, 'a dry run must never POST');
  }

  // ── read-after-write verification changes the outcome ───────────────────
  {
    const good = fakeDatabase([]);
    const rows = [row('v1'), row('v2')];
    await good.importer.importRows(rows, 'verify');
    const okResult = await good.importer.verifyRows(rows);
    assert.equal(okResult.ok, true);
    assert.equal(okResult.checked, 2);

    // A write whose response looked fine but never landed must be caught.
    const lying = fakeDatabase([], { dropWrite: true });
    const rows2 = [row('v3')];
    const s2 = await lying.importer.importRows(rows2, 'lying');
    assert.equal(s2.added, 1, 'the write response claimed success');
    const bad = await lying.importer.verifyRows(rows2);
    assert.equal(bad.ok, false, 'reading the row back is what exposes it');
    assert.deepEqual(bad.missing, ['v3']);
  }

  // ── the summary: totals must balance, and say what happened ─────────────
  const capture = () => { const lines = []; return { lines, log: { log: t => lines.push(t) } }; };
  // Derived, not typed in — a hand-written fixture that does not balance tests
  // the assertion instead of the code.
  const dbBlock = over => {
    const d = { added: 5, updated: 3, unchanged: 2, protectedUnchanged: 1, protectedConflict: 0, failed: 1, ...over };
    return { ...d,
      candidates: d.added + d.updated + d.unchanged + d.protectedUnchanged + d.protectedConflict + d.failed,
      attempted: d.added + d.updated + d.failed,
      verified: d.added + d.updated,
      ...over };
  };

  {
    const r = buildReport({ mode: 'check', preflight: preflightOf(), elapsedSeconds: 1 });
    assert.deepEqual(r.accounting, [], 'a check report balances');
    assert.equal(r.outcome, 'CHECK PASSED — nothing was written');
    assert.equal(r.exitCode, 0);
    const c = capture();
    assert.equal(printReport(r, c.log), 0);
    assert(c.lines.some(l => l.includes('CHECK ONLY')));
    assert(c.lines.some(l => /Questions loaded/.test(l) && /12/.test(l)), 'the corpus total is printed');
    assert(!c.lines.some(l => l.includes('Database result')), 'a check reports no database result');
  }
  {
    const r = buildReport({ mode: 'check', preflight: preflightOf({ ok: false, filesSkipped: 1,
      errors: [{ kind: 'source', where: 'grade4-french/x.js', message: 'makeCloze is not defined' }] }) });
    assert.equal(r.outcome, 'CHECK FAILED — nothing was written');
    assert.equal(r.exitCode, 1);
    assert(r.nextAction.includes('No database rows were touched'));
    const c = capture();
    assert.equal(printReport(r, c.log), 1);
    assert(c.lines.some(l => l.includes('makeCloze is not defined')), 'the reason is shown, not just a count');
  }
  {
    const r = buildReport({ mode: 'dry-run', target: 'example.supabase.co', preflight: preflightOf(),
      database: dbBlock({ failed: 0 }) });
    assert.deepEqual(r.accounting, []);
    assert.equal(r.outcome, 'DRY RUN COMPLETE — nothing was written');
    assert.equal(r.exitCode, 0);
    const c = capture();
    printReport(r, c.log);
    assert(c.lines.some(l => l.includes('DRY RUN')));
    assert(c.lines.some(l => l.includes('example.supabase.co')));
    assert(c.lines.some(l => l.includes('would be attempted')), 'a dry run never claims writes happened');
  }
  {
    const r = buildReport({ mode: 'live', target: 't', preflight: preflightOf(),
      database: dbBlock({ failed: 0 }),
      verification: { ran: true, ok: true, checked: 8, missing: [], mismatched: [], error: null },
      patch: { patched: 0, warnings: 0, backupDir: null, conflictReport: null } });
    assert.equal(r.outcome, 'SUCCESS — all changes verified');
    assert.equal(r.exitCode, 0);
    const c = capture();
    printReport(r, c.log);
    assert(c.lines.some(l => l.includes('Database verification')));
    assert(c.lines.some(l => l.includes('every intended write was read back')));
  }
  {
    const r = buildReport({ mode: 'live', target: 't', preflight: preflightOf(),
      database: dbBlock({ added: 0, updated: 0, unchanged: 12, protectedUnchanged: 0, failed: 0 }),
      verification: { ran: true, ok: true, checked: 0, missing: [], mismatched: [], error: null } });
    assert.equal(r.outcome, 'NO CHANGES NEEDED');
    assert.equal(r.exitCode, 0);
  }
  {
    const r = buildReport({ mode: 'live', target: 't', preflight: preflightOf(), database: dbBlock(),
      verification: { ran: true, ok: true, checked: 8, missing: [], mismatched: [], error: null } });
    assert.equal(r.outcome, 'IMPORT INCOMPLETE — review required');
    assert.equal(r.exitCode, 1, 'a failed/unverified write is never a success');
    assert(r.nextAction.includes('idempotent'));
  }
  {
    const r = buildReport({ mode: 'live', target: 't', preflight: preflightOf(),
      database: dbBlock({ failed: 0 }),
      verification: { ran: true, ok: false, checked: 8, missing: ['a'], mismatched: [], error: null } });
    assert.equal(r.exitCode, 1, 'verification alone can fail the run');
    assert.equal(r.outcome, 'IMPORT INCOMPLETE — review required');
  }
  {
    const r = buildReport({ mode: 'live', target: 't', preflight: preflightOf(),
      database: dbBlock({ protectedConflict: 2, failed: 0 }),
      patch: { patched: 1, warnings: 1, backupDir: '/b', conflictReport: '/c.json' },
      verification: { ran: true, ok: true, checked: 8, missing: [], mismatched: [], error: null } });
    assert.equal(r.exitCode, 1, 'an unresolved protected conflict is not a clean run');
    const c = capture();
    printReport(r, c.log);
    assert(c.lines.some(l => l.includes('Protected unchanged')));
    assert(c.lines.some(l => l.includes('Protected conflicts')));
    assert(c.lines.some(l => l.includes('/c.json')), 'the conflict artefact is named');
    assert(c.lines.some(l => l.includes('gitignored')));
  }
  {
    // Deliberately inconsistent totals must be caught, not printed.
    const r = buildReport({ mode: 'live', target: 't', preflight: preflightOf(),
      database: dbBlock({ verified: 99 }) });
    assert(r.accounting.length, 'mutually inconsistent totals are detected');
    assert.equal(r.exitCode, 1);
    const c = capture();
    printReport(r, c.log);
    assert(c.lines.some(l => l.startsWith('ACCOUNTING ERROR')));
  }
  {
    const r = buildReport({ mode: 'live', preflight: preflightOf({ practice: 3, papers: 4 }) });
    r.preflight.total = 99;
    assert(accountingProblems(r).some(p => p.includes('corpus total')));
  }
  {
    // Bounded error output, pointing at the full report.
    const errors = Array.from({ length: 55 }, (_, i) => ({ kind: 'question', where: 'p · q' + i, message: 'bad' }));
    const r = buildReport({ mode: 'check', preflight: preflightOf({ ok: false, errors }), reportPath: 'out.json' });
    const c = capture();
    printReport(r, c.log);
    const shown = c.lines.filter(l => l.includes('bad')).length;
    assert(shown <= 20, `error output is bounded (${shown} lines)`);
    assert(c.lines.some(l => l.includes('and 35 more') && l.includes('out.json')));
  }
  {
    // The machine-readable report is versioned and carries no answers.
    const r = buildReport({ mode: 'live', target: 't', preflight: preflightOf(), database: dbBlock({ failed: 0 }),
      verification: { ran: true, ok: true, checked: 8, missing: [], mismatched: [], error: null } });
    const json = JSON.stringify(redactedReport(r));
    assert.equal(redactedReport(r).schemaVersion, 1);
    assert(!/Pacific/.test(json), 'no answer text reaches the JSON report');
    assert(!/rows/.test(JSON.stringify(redactedReport(r).preflight)), 'the row payload is not dumped');
    assert(!/fake|service_role|Bearer/.test(json), 'no credential reaches the JSON report');
  }
  {
    // An aborted run never reports success, whatever the partial totals say.
    const r = buildReport({ mode: 'live', target: 't', preflight: preflightOf(), aborted: true,
      database: dbBlock({ failed: 0 }) });
    assert.equal(r.exitCode, 1);
    assert.equal(r.outcome, 'IMPORT INCOMPLETE — review required');
  }
  assert.deepEqual(Object.keys(newStats()).sort(),
    ['added', 'failed', 'patchWarnings', 'patched', 'protectedConflict', 'protectedUnchanged', 'scanned', 'unchanged', 'updated']);
  console.log('Question import accounting tests passed (mock database only).');
})().catch(error => { console.error(error); process.exitCode = 1; });
