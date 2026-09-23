'use strict';
// /api/library-review — the admin queue for community submissions.
//
// ⚠ APPROVING IS THE ONLY THING THAT PUBLISHES, so what matters here is that it
//   publishes exactly what was approved and nothing else:
//     · approve sets status AND published_at — the shelf requires both, so a
//       hand-edited status column alone can never put a document in front of a
//       reader
//     · a PostgREST 200 is not proof the row moved (read-after-write)
//     · reject/remove delete the stored OBJECT but keep the ROW, because the
//       row carries the sha256 that makes the dedupe index a blocklist
//     · reclassifying is a column change, never a file move
//     · a preview URL is short-lived, and the storage key never leaves the server
//     · the contributor is emailed, and a mail failure never fails the decision
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
let failures = 0;
const pass = (m) => console.log('  ✓ ' + m);
const fail = (m) => { failures++; console.log('  ✗ ' + m); };
const check = (ok, m, d) => ok ? pass(m) : fail(m + (d !== undefined ? ' — ' + JSON.stringify(d).slice(0, 220) : ''));

const ENV = { SUPABASE_URL: 'https://db.example.com', SUPABASE_SERVICE_ROLE_KEY: 'k', RESEND_API_KEY: 'r', SITE_URL: 'https://nouklass.com' };
const DOC = '11111111-1111-1111-1111-111111111111';
const SHELF = '22222222-2222-2222-2222-222222222222';

async function load() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-librev-'));
  fs.writeFileSync(path.join(dir, 'admin-auth.mjs'), `
export const json = (s, b) => new Response(JSON.stringify(b), { status: s, headers: { 'Content-Type': 'application/json' } });
export const requireAdmin = async (req, env) => ({ caller: { id: 'admin-1', email: 'admin@example.com' }, sbUrl: env.SUPABASE_URL, sbKey: env.SUPABASE_SERVICE_ROLE_KEY });
export const _audits = [];
export const logAdminAction = async (g, row) => { _audits.push(row); return true; };
`);
  const mailer = fs.readFileSync(path.join(ROOT, 'workers', 'lib', 'mailer.js'), 'utf8')
    .replace('export async function sendMail(', 'async function _realSendMail(');
  fs.writeFileSync(path.join(dir, 'mailer.mjs'), mailer + `
export const SENT = [];
export async function sendMail(env, opts) { SENT.push(opts); return { ok: true, id: 'm1' }; }
`);
  const src = fs.readFileSync(path.join(ROOT, 'workers', 'api', 'library-review.js'), 'utf8')
    .replace("'../lib/admin-auth.js'", "'./admin-auth.mjs'")
    .replace("'../lib/mailer.js'", "'./mailer.mjs'");
  fs.writeFileSync(path.join(dir, 'handler.mjs'), src);
  const u = (f) => 'file://' + path.join(dir, f).replace(/\\/g, '/');
  return {
    handler: (await import(u('handler.mjs'))).default,
    mailer: await import(u('mailer.mjs')),
    auth: await import(u('admin-auth.mjs')),
  };
}

function makeFetch({ doc = null, patchReturns = null, signFails = false } = {}) {
  const base = {
    id: DOC, title: 'Fractions revision', status: 'pending', source: 'community',
    storage: 'supabase', storage_key: 'pending/abc.pdf', sha256: 'a'.repeat(64),
    section_id: SHELF, grade: 6, doc_type: 'worksheet', year: 2025, bytes: 2048,
    submitted_by: 'user-1', submitted_name: 'A Parent', filename: 'f.pdf',
  };
  const row = { ...base, ...(doc || {}) };
  const calls = { patches: [], deletes: [], signs: [] };
  return {
    calls, row,
    fetch: async (url, init = {}) => {
      const u = String(url);
      const R = (b, s = 200) => new Response(JSON.stringify(b), { status: s });
      const m = init.method || 'GET';
      if (u.includes('/storage/v1/object/sign/')) {
        calls.signs.push(JSON.parse(init.body || '{}'));
        return signFails ? new Response('no', { status: 500 }) : R({ signedURL: '/object/sign/x?token=t' });
      }
      if (u.includes('/storage/v1/object/') && m === 'DELETE') { calls.deletes.push(u); return R({}); }
      if (u.includes('/rest/v1/library_sections')) return R([{ id: SHELF, name: 'Mathematics', grade: 6, parent_id: 'root' }]);
      if (u.includes('/auth/v1/admin/users/')) return R({ email: 'parent@example.com', user_metadata: { full_name: 'A Parent' } });
      if (u.includes('/rest/v1/library_documents') && m === 'PATCH') {
        const p = JSON.parse(init.body);
        calls.patches.push(p);
        return R([patchReturns ? { ...row, ...p, ...patchReturns } : { ...row, ...p }]);
      }
      if (u.includes('/rest/v1/library_documents')) {
        if (u.includes('id=neq.')) return R([{ id: 'other', title: 'Paper 2', year: 2025 }]);
        return R([row]);
      }
      throw new Error('unexpected fetch: ' + u);
    },
  };
}

async function call(ctx, fake, init) {
  const real = globalThis.fetch;
  globalThis.fetch = fake.fetch;
  try {
    const res = await ctx.handler(new Request('https://nouklass.com/api/library-review' + (init.q || ''), {
      method: init.method || 'GET',
      ...(init.body ? { body: JSON.stringify(init.body), headers: { 'Content-Type': 'application/json' } } : {}),
    }), ENV);
    return { status: res.status, body: await res.json() };
  } finally { globalThis.fetch = real; }
}

(async () => {
  console.log('/api/library-review — approving, rejecting, reclassifying\n');
  const ctx = await load();
  const SENT = ctx.mailer.SENT;
  const AUDITS = ctx.auth._audits;
  const reset = () => { SENT.length = 0; AUDITS.length = 0; };

  // ── The queue ───────────────────────────────────────────────────────────
  let fake = makeFetch();
  let r = await call(ctx, fake, { q: '?status=pending' });
  check(r.status === 200 && r.body.ok && r.body.documents.length === 1, 'the queue lists pending submissions');
  const listed = r.body.documents[0];
  check(listed.storage_key === undefined, '⚠ the storage key never leaves the server', listed.storage_key);
  check(!!listed.preview_url, 'each row carries a preview URL');
  check(fake.calls.signs[0]?.expiresIn <= 900, 'the preview link is short-lived', fake.calls.signs[0]);
  check((listed.also_in_slot || []).length === 1, 'and a hint about what is already on that shelf');

  // ── Approve ─────────────────────────────────────────────────────────────
  reset();
  fake = makeFetch();
  r = await call(ctx, fake, { method: 'POST', body: { action: 'approve', id: DOC } });
  const patch = fake.calls.patches[0] || {};
  check(r.status === 200 && r.body.ok, 'approve succeeds');
  check(patch.status === 'published', 'it sets status=published');
  check(!!patch.published_at, '⚠ and published_at — the shelf requires BOTH', patch.published_at);
  check(patch.reviewed_by === 'admin-1' && !!patch.reviewed_at, 'the reviewer and time are recorded');
  check(fake.calls.deletes.length === 0, 'an approved file is NOT deleted from storage');
  check(SENT.length === 1 && /now in the Nou Klass library/.test(SENT[0].subject), 'the contributor is emailed', SENT[0]?.subject);
  check(AUDITS[0]?.action === 'library_approve', 'an audit row is written', AUDITS[0]?.action);
  check(/^[a-z][a-z_]{2,39}$/.test(AUDITS[0]?.action || ''), 'with a name admin_log_action() accepts');

  // ⚠ A 200 from PostgREST is not proof the row moved.
  reset();
  fake = makeFetch({ patchReturns: { status: 'pending', published_at: null } });
  r = await call(ctx, fake, { method: 'POST', body: { action: 'approve', id: DOC } });
  check(r.status === 500 && !r.body.ok,
    '⚠ an approve that did not stick reports failure, not success', r.body.error);

  // ── Approve with a correction ───────────────────────────────────────────
  reset();
  fake = makeFetch();
  r = await call(ctx, fake, { method: 'POST', body: { action: 'approve', id: DOC, section_id: SHELF } });
  check(fake.calls.patches[0].section_id === SHELF && fake.calls.patches[0].grade === 6,
    'approving can move it to another shelf at the same time');
  check(fake.calls.deletes.length === 0, 'and reclassifying moves no file');

  // ── Reject ──────────────────────────────────────────────────────────────
  reset();
  fake = makeFetch();
  r = await call(ctx, fake, { method: 'POST', body: { action: 'reject', id: DOC, note: 'Contains pupil names' } });
  check(fake.calls.patches[0].status === 'rejected', 'reject sets the status');
  check(fake.calls.patches[0].published_at === null, 'and clears published_at');
  check(fake.calls.deletes.length === 1, 'the stored object IS deleted on rejection');
  check(!fake.calls.patches.some(p => p.sha256 === null),
    '⚠ the ROW is kept, so its sha256 still blocks a re-upload');
  check(SENT.length === 1 && /Contains pupil names/.test(SENT[0].text || ''),
    'the reason reaches the contributor', SENT[0]?.text?.slice(0, 80));

  // ── Remove a published document ─────────────────────────────────────────
  reset();
  fake = makeFetch({ doc: { status: 'published' } });
  r = await call(ctx, fake, { method: 'POST', body: { action: 'remove', id: DOC } });
  check(fake.calls.patches[0].status === 'removed' && fake.calls.patches[0].published_at === null,
    'remove unpublishes immediately');
  check(SENT.length === 0, 'a removal does not email (it is not a decision on a submission)');

  // ── Refusals ────────────────────────────────────────────────────────────
  for (const [body, what] of [
    [{ action: 'publish', id: DOC }, 'an unknown action'],
    [{ action: 'approve', id: 'nope' }, 'a malformed id'],
    [{ action: 'reclassify', id: DOC }, 'reclassify with no shelf'],
  ]) {
    fake = makeFetch();
    r = await call(ctx, fake, { method: 'POST', body });
    check(r.status === 400 && fake.calls.patches.length === 0, `${what} is refused and changes nothing`, r.body.error);
  }

  console.log(failures ? `\n✗ ${failures} failure(s)` : '\n✓ all checks passed');
  process.exit(failures ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
