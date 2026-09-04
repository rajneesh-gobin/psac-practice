'use strict';
const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
const source = fs.readFileSync('engine/admin.js', 'utf8');
const fn = source.slice(source.indexOf('  async function copyMemberEmails()'), source.indexOf('  function _memberStatusBadge'));
async function test(status, blocked = false) {
  const nodes = {};
  for (const id of ['admin-copy-emails','admin-member-search','admin-copy-emails-output','admin-copy-emails-status']) {
    nodes[id] = { value: '', classList: { add() {}, remove() {} }, focus() {}, select() {} };
  }
  nodes['admin-member-search'].value = 'Alice';
  let copied = '', pages = 0, pending = 0;
  const filters = [];
  const ctx = vm.createContext({
    document: { getElementById: id => nodes[id] }, _memberStatusFilter: status,
    _memberVisibility: () => ({ admins: false, expired: false, disabled: false }),
    _sb: { from() {
      const q = {};
      for (const method of ['select','in','order','or','eq','ilike']) q[method] = (...args) => { filters.push([method,...args]); return q; };
      q.range = offset => { pages++; q.offset = offset; return q; };
      q.then = resolve => resolve({ data: Array.from({ length: q.offset === 0 ? 100 : 1 }, (_, i) => ({ id: q.offset + i })) });
      return q;
    } },
    _copyEmailBatch: async ids => {
      assert(ids.length <= 20);
      return { emails: Object.fromEntries(ids.map(id => [id, `member${id}@example.com`])) };
    },
    _pendingRegistrationRequest: async () => {
      pending++;
      return { registrations: [{ email: pending === 1 ? 'MEMBER0@example.com' : 'pending@example.com' }], next_cursor: pending === 1 ? '1:100' : null };
    },
    navigator: { clipboard: { writeText: async text => { if (blocked) throw Error('denied'); copied = text; } } },
  });
  vm.runInContext(fn, ctx);
  await ctx.copyMemberEmails();
  const expected = status === 'active' ? 101 : status === 'pending' ? 2 : 102;
  assert.equal(nodes['admin-copy-emails-output'].value.split(', ').length, expected);
  assert.equal(pages, status === 'pending' ? 0 : 2);
  assert.equal(pending, status === 'active' ? 0 : 2);
  assert.equal(nodes['admin-copy-emails'].disabled, false);
  if (!blocked) assert.equal(copied, nodes['admin-copy-emails-output'].value);
  else assert.match(nodes['admin-copy-emails-status'].textContent, /Select and copy/);
  if (pages) {
    assert(filters.some(f => f[0] === 'in' && f[2].join() === 'parent'));
    assert(filters.some(f => f[0] === 'eq' && f[1] === 'disabled' && f[2] === false));
    assert(filters.some(f => f[0] === 'or' && f[1].includes('expires_at')));
    assert(filters.some(f => f[0] === 'ilike' && f[2] === '%Alice%'));
  }
}
(async () => {
  await test('active'); await test('pending'); await test('all'); await test('all', true);
  console.log('Member email copy: filters, all pages, pending queue, deduplication and clipboard fallback passed.');
})().catch(e => { console.error(e); process.exitCode = 1; });
