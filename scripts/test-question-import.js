'use strict';
const assert = require('node:assert/strict');
const { createImporter, contentMatches, newStats, printSummary } = require('../netlify/lib/question-import');
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
      batch.forEach(r => db.set(r.id, { ...r, protected: false }));
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
  return { importer: createImporter({ url: 'https://test.invalid', key: 'fake', fetchImpl, log }), writes, get reads() { return reads; } };
}
(async () => {
  const unchanged = row('same');
  const updated = row('changed');
  const protectedRow = row('protected', { protected: true });
  const db = fakeDatabase([{ ...unchanged, protected: false }, { ...updated, protected: false }, protectedRow]);
  const changed = { ...updated, data: { ...updated.data, options: ['Pacific', 'Indian'] } };
  const stats = await db.importer.importRows([row('new'), { ...unchanged, data: { ...unchanged.data, options: ['Atlantic', 'Pacific'] } }, changed,
    { ...protectedRow, data: { ...protectedRow.data, hint: 'Different' } }], 'test', () => true);
  assert.deepEqual(stats, { scanned: 4, added: 1, updated: 1, unchanged: 1, protected: 1, failed: 0, patched: 1, patchWarnings: 0 });
  assert.deepEqual(db.writes.flat().map(r => r.id), ['new', 'changed']);
  assert(!contentMatches({ options: ['a', 'A'] }, { options: ['a', 'a'] }), 'Case matters');
  assert(!contentMatches({ answer: [[1, 2]] }, { answer: [[2, 1]] }), 'Coordinates must retain order');
  assert(!contentMatches({ acceptableAnswers: ['x'] }, { acceptableAnswers: ['y'] }));

  for (const config of [{ readError: true }, { readHttpError: true }, { invalidJson: true }, { noCount: true }]) {
    const broken = fakeDatabase([], config);
    const result = await broken.importer.importRows([row('x')], 'blocked');
    assert.equal(result.failed, 1);
    assert.equal(broken.writes.length, 0);
  }
  for (const config of [{ writeError: true }, { writeHttpError: true }, { badWrite: true }]) {
    const broken = fakeDatabase([], config);
    const result = await broken.importer.importRows([row('x')], 'failed');
    assert.equal(result.failed, 1);
    assert.equal(result.added + result.updated, 0);
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
  assert.equal((await papers.importer.importRows([row('paper', { is_past_paper: true })], 'papers')).protected, 1);
  assert.equal(papers.writes.length, 0);
  const many = fakeDatabase([]);
  const manyStats = await many.importer.importRows(Array.from({ length: 401 }, (_, i) => row(`new${i}`)), 'many');
  assert.equal(manyStats.added, 401);
  assert.deepEqual(many.writes.map(batch => batch.length), [200, 200, 1]);
  const lines = [];
  const totals = { practice: stats, papers: newStats() };
  assert.equal(printSummary(totals, 0, 3, { log: text => lines.push(text) }), false);
  assert(lines.some(line => line.includes('New questions added')));
  assert(lines.some(line => line.includes('Past papers')));
  assert.equal(printSummary(totals, 1, 3, log), true);
  assert.equal(printSummary({ ...totals, papers: { ...newStats(), failed: 2 } }, 0, 3, log), true);
  console.log('Question import regression tests passed (mock database only).');
})().catch(error => { console.error(error); process.exitCode = 1; });
