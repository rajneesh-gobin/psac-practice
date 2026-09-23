'use strict';
// /api/library-submit — a parent or teacher contributes a PDF.
//
// ⚠ THIS IS THE ONE ENDPOINT WHERE AN ORDINARY USER SENDS US A FILE, so its
//   refusals are the feature. What is asserted here:
//     · nothing can be published by the submitter — every row lands 'pending'
//       and no field in the request can change that
//     · a file is a PDF because its BYTES say so, not its name
//     · the 6 MB cap is enforced on the server, not only in the browser
//     · the disclaimer is matched by VERSION, so a stale tab cannot pass
//     · a duplicate is recognised, and a previously REMOVED file is refused —
//       the dedupe index doubles as a blocklist
//     · a locked shelf takes nothing
//     · a failed insert does not leave the uploaded object orphaned
//
// The real handler runs with its imports stubbed; nothing is delivered and no
// live database is touched.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
let failures = 0;
const pass = (m) => console.log('  ✓ ' + m);
const fail = (m) => { failures++; console.log('  ✗ ' + m); };
const check = (ok, m, d) => ok ? pass(m) : fail(m + (d !== undefined ? ' — ' + JSON.stringify(d).slice(0, 200) : ''));

const ENV = { SUPABASE_URL: 'https://db.example.com', SUPABASE_SERVICE_ROLE_KEY: 'service-key' };
const SECTION = '11111111-1111-1111-1111-111111111111';
const LOCKED = '22222222-2222-2222-2222-222222222222';

async function load() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-libsub-'));
  fs.writeFileSync(path.join(dir, 'admin-auth.mjs'),
    "export const json = (s, b) => new Response(JSON.stringify(b), { status: s, headers: { 'Content-Type': 'application/json' } });\n");
  const src = fs.readFileSync(path.join(ROOT, 'workers', 'api', 'library-submit.js'), 'utf8')
    .replace("'../lib/admin-auth.js'", "'./admin-auth.mjs'");
  fs.writeFileSync(path.join(dir, 'handler.mjs'), src);
  const mod = await import('file://' + path.join(dir, 'handler.mjs').replace(/\\/g, '/'));
  return { handler: mod.default, VERSION: mod.DISCLAIMER_VERSION };
}

// A fake Supabase: GoTrue user, profiles, library_documents, sections, storage.
function makeFetch({ role = 'parent', disabled = false, duplicate = null, sectionStatus = 'active', insertFails = false } = {}) {
  const calls = { uploads: [], deletes: [], inserts: [] };
  return {
    calls,
    fetch: async (url, init = {}) => {
      const u = String(url);
      const R = (b, s = 200) => new Response(JSON.stringify(b), { status: s });
      if (u.includes('/auth/v1/user')) return R({ id: 'user-1', email: 'parent@example.com' });
      if (u.includes('/rest/v1/profiles')) return R([{ role, disabled, full_name: 'A Parent' }]);
      if (u.includes('/rest/v1/library_documents') && (init.method || 'GET') === 'GET') {
        return R(duplicate ? [duplicate] : []);
      }
      if (u.includes('/rest/v1/library_sections')) {
        const id = (u.match(/id=eq\.([0-9a-f-]+)/) || [])[1];
        if (id === LOCKED) return R([{ id: LOCKED, name: 'Grade 6 Maths', grade: 6, status: sectionStatus === 'active' ? 'locked' : sectionStatus }]);
        return R([{ id: SECTION, name: 'Grade 6 Maths', grade: 6, status: 'active' }]);
      }
      if (u.includes('/storage/v1/object/')) {
        if (init.method === 'DELETE') { calls.deletes.push(u); return R({}); }
        calls.uploads.push(u);
        return R({ Key: 'ok' });
      }
      if (u.includes('/rest/v1/library_documents')) {
        const row = JSON.parse(init.body);
        calls.inserts.push(row);
        if (insertFails) return new Response('boom', { status: 500 });
        return R([{ ...row, id: 'doc-1' }]);
      }
      throw new Error('unexpected fetch: ' + u);
    },
  };
}

function pdf(bytes = 2048, magic = '%PDF-') {
  const b = new Uint8Array(bytes);
  for (let i = 0; i < magic.length; i++) b[i] = magic.charCodeAt(i);
  return b;
}

async function submit(ctx, fake, fields = {}, { auth = 'Bearer jwt' } = {}) {
  const body = new FormData();
  const file = fields.file === null ? null
    : new File([fields.file || pdf()], fields.filename || 'paper.pdf', { type: 'application/pdf' });
  if (file) body.append('file', file);
  const defaults = {
    title: 'Fractions revision', section_id: SECTION, doc_type: 'worksheet',
    disclaimer: ctx.VERSION, year: '2025',
  };
  for (const [k, v] of Object.entries({ ...defaults, ...fields })) {
    if (k === 'file' || k === 'filename' || v === undefined || v === null) continue;
    body.append(k, String(v));
  }
  const real = globalThis.fetch;
  globalThis.fetch = fake.fetch;
  try {
    const res = await ctx.handler(new Request('https://nouklass.com/api/library-submit', {
      method: 'POST', body, headers: auth ? { Authorization: auth } : {},
    }), ENV);
    return { status: res.status, body: await res.json() };
  } finally { globalThis.fetch = real; }
}

(async () => {
  console.log('/api/library-submit — contributing a document\n');
  const ctx = await load();

  // ── The happy path, and what it is NOT allowed to do ────────────────────
  let fake = makeFetch();
  let r = await submit(ctx, fake);
  check(r.status === 200 && r.body.ok, 'a valid PDF from a parent is accepted', r.body);
  const row = fake.calls.inserts[0] || {};
  check(row.status === 'pending', 'it lands PENDING, never published', row.status);
  check(row.source === 'community', 'it is recorded as community-contributed');
  check(row.submitted_by === 'user-1', 'the uploader is the JWT holder, not a form field');
  check(!!row.disclaimer_version && !!row.disclaimer_accepted_at,
    'the disclaimer is stored with its version and timestamp', row.disclaimer_version);
  check(/^pending\//.test(row.storage_key) && row.storage === 'supabase',
    'it is stored in Supabase under a pending key', row.storage_key);

  // ⚠ The attack this guards: a caller setting status themselves.
  fake = makeFetch();
  r = await submit(ctx, fake, { status: 'published', source: 'seed', submitted_by: 'somebody-else' });
  check(fake.calls.inserts[0].status === 'pending', 'a caller cannot set status=published');
  check(fake.calls.inserts[0].source === 'community', 'a caller cannot claim to be seed content');
  check(fake.calls.inserts[0].submitted_by === 'user-1', 'a caller cannot attribute it to someone else');

  // ── Refusals ────────────────────────────────────────────────────────────
  fake = makeFetch();
  r = await submit(ctx, fake, { file: new Uint8Array([60, 104, 116, 109, 108]) }); // "<html"
  check(r.status === 400 && fake.calls.uploads.length === 0,
    'a non-PDF is refused on its BYTES, and never stored', r.body.error);

  fake = makeFetch();
  r = await submit(ctx, fake, { file: pdf(7 * 1024 * 1024) });
  check(r.status === 413 && fake.calls.uploads.length === 0, 'over 6 MB is refused server-side');
  check(/black-and-white/.test(r.body.error || ''), 'and the refusal says how to fix it');

  fake = makeFetch();
  r = await submit(ctx, fake, { disclaimer: 'library-2020-01-01' });
  check(r.status === 400 && fake.calls.uploads.length === 0,
    'a STALE disclaimer version is refused', r.body.error);

  fake = makeFetch();
  r = await submit(ctx, fake, { title: '' });
  check(r.status === 400, 'a missing title is refused');

  fake = makeFetch();
  r = await submit(ctx, fake, { section_id: LOCKED });
  check(r.status === 409 && fake.calls.uploads.length === 0, 'a LOCKED shelf takes nothing', r.body.error);

  // ── Duplicates, and the blocklist ───────────────────────────────────────
  fake = makeFetch({ duplicate: { id: 'x', title: 'Already here', status: 'published' } });
  r = await submit(ctx, fake);
  check(r.status === 409 && r.body.duplicate && fake.calls.uploads.length === 0,
    'a file we already publish is refused before upload', r.body.error);

  fake = makeFetch({ duplicate: { id: 'x', title: 'Taken down', status: 'removed' } });
  r = await submit(ctx, fake);
  check(r.status === 409 && !/already have this one/.test(r.body.error || ''),
    '⚠ a previously REMOVED file is refused — the dedupe index is a blocklist', r.body.error);

  // ── Who may submit ──────────────────────────────────────────────────────
  fake = makeFetch();
  r = await submit(ctx, fake, {}, { auth: null });
  check(r.status === 401, 'a signed-out caller is refused');

  fake = makeFetch({ disabled: true });
  r = await submit(ctx, fake);
  check(r.status === 403, 'a disabled account is refused');

  fake = makeFetch({ role: 'student' });
  r = await submit(ctx, fake);
  check(r.status === 403, 'a role we do not trust is refused');

  // ── A failed insert must not leave an orphan in storage ─────────────────
  fake = makeFetch({ insertFails: true });
  r = await submit(ctx, fake);
  check(r.status === 500, 'a failed insert reports failure');
  check(fake.calls.deletes.length === 1,
    '⚠ and the already-uploaded object is deleted, not left orphaned', fake.calls.deletes.length);

  console.log(failures ? `\n✗ ${failures} failure(s)` : '\n✓ all checks passed');
  process.exit(failures ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
