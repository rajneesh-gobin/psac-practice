// POST /api/library-report — a reader flags a library document.
//
// ⚠ BOTH KINDS OF READER, because the library is browsable by children and a
//   child is the person most likely to open something that should not be there.
//   An adult carries a Supabase JWT; a child carries `x-student-token` and has
//   no JWT at all, so the two identities are resolved by different means and
//   recorded as different `reporter_kind`s.
//
// ⚠ A CREDENTIAL IS REQUIRED EITHER WAY. An open report endpoint is a way to
//   bury a document under invented complaints, and this one bumps a counter an
//   admin sorts by. Anonymous reports would make that counter meaningless.
//
// ⚠ REPORTING IS NOT REMOVING. It records a row and raises a count; a document
//   comes down only when an admin acts on it in /api/library-review. Nothing
//   here writes to library_documents.status, so a coordinated pile-on cannot
//   take anything off the shelf on its own.
import { json } from '../lib/admin-auth.js';
import { resolveStudent } from '../lib/student-auth.js';

const MAX_DETAIL = 600;
// The reasons an admin can act on. Free text alone produces "bad" and "wrong",
// which tells a reviewer nothing about what to look at.
const REASONS = new Set([
  'wrong-subject', 'wrong-grade', 'duplicate', 'poor-quality',
  'personal-details', 'copyright', 'inappropriate', 'other',
]);
// ⚠ One person cannot report the same document twice, and cannot report more
//   than this many documents in a day. Both caps are per reporter, checked
//   server-side, and exist for the same reason the endpoint needs a credential.
const DAILY_CAP = 20;

export default async function handler(request, env) {
  if (request.method !== 'POST') return json(405, { ok: false, error: 'Method not allowed' });

  const sbUrl = env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
  const sbKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!sbKey) return json(500, { ok: false, error: 'Server is missing SUPABASE_SERVICE_ROLE_KEY' });
  const sbH = { apikey: sbKey, Authorization: `Bearer ${sbKey}` };

  let body;
  try { body = await request.json(); } catch { return json(400, { ok: false, error: 'Invalid request.' }); }

  const documentId = String(body.document_id || '');
  const reason = String(body.reason || '');
  const detail = String(body.detail || '').trim().slice(0, MAX_DETAIL);
  if (!/^[0-9a-f-]{36}$/i.test(documentId)) return json(400, { ok: false, error: 'Invalid document.' });
  if (!REASONS.has(reason)) return json(400, { ok: false, error: 'Choose a reason.' });

  // ── Who is reporting ────────────────────────────────────────────────────
  let reporterId = null;
  let reporterKind = null;
  // ⚠ A student token is a HEADER, not a bearer token — it must never be sent
  //   to /auth/v1/, which is why the two paths are separate rather than one
  //   "whatever credential is present" helper.
  const jwt = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '').trim();
  if (jwt) {
    const ures = await fetch(`${sbUrl}/auth/v1/user`, { headers: { apikey: sbKey, Authorization: `Bearer ${jwt}` } });
    if (!ures.ok) return json(401, { ok: false, error: 'Your sign-in session has expired.' });
    const user = await ures.json();
    if (!user?.id) return json(401, { ok: false, error: 'Your sign-in session has expired.' });
    reporterId = user.id;
    const pr = await fetch(`${sbUrl}/rest/v1/profiles?id=eq.${user.id}&select=role&limit=1`, { headers: sbH });
    const role = pr.ok ? (await pr.json())[0]?.role : null;
    reporterKind = role === 'teacher' ? 'teacher' : role === 'admin' ? 'admin' : 'parent';
  } else if (request.headers.get('x-student-token')) {
    const who = await resolveStudent(request.headers, { supabaseUrl: sbUrl, serviceKey: sbKey });
    if (!who.ok) return json(who.status || 401, { ok: false, error: 'Please sign in again.' });
    // ⚠ The child's id is NOT written to reporter_id: that column is a FK to
    //   profiles, and a student is not a profile. The kind records that a pupil
    //   raised it; who they are is deliberately not carried into an
    //   append-only table a child cannot later ask us to clear.
    reporterKind = 'student';
  } else {
    return json(401, { ok: false, error: 'Please sign in to report a document.' });
  }

  // ── The document has to exist and be on a shelf ─────────────────────────
  const dres = await fetch(`${sbUrl}/rest/v1/library_documents?id=eq.${documentId}&select=id,title,status,report_count&limit=1`, { headers: sbH });
  if (!dres.ok) return json(502, { ok: false, error: 'Could not look up that document.' });
  const doc = (await dres.json())[0];
  if (!doc || doc.status !== 'published') return json(404, { ok: false, error: 'That document is not available.' });

  // ── Caps ────────────────────────────────────────────────────────────────
  if (reporterId) {
    const already = await fetch(
      `${sbUrl}/rest/v1/library_reports?document_id=eq.${documentId}&reporter_id=eq.${reporterId}&select=id&limit=1`,
      { headers: sbH });
    if (already.ok && (await already.json()).length) {
      // ⚠ Answered as SUCCESS on purpose. "You already reported this" is a fine
      //   thing to know, and there is nothing for the reader to do differently.
      return json(200, { ok: true, already: true, message: 'You have already reported this document. Thank you.' });
    }
    const since = new Date(Date.now() - 86400000).toISOString();
    const today = await fetch(
      `${sbUrl}/rest/v1/library_reports?reporter_id=eq.${reporterId}&created_at=gte.${since}&select=id`,
      { headers: sbH });
    if (today.ok && (await today.json()).length >= DAILY_CAP) {
      return json(429, { ok: false, error: 'You have reported a lot today. Please write to us instead.' });
    }
  }

  const ins = await fetch(`${sbUrl}/rest/v1/library_reports`, {
    method: 'POST',
    headers: { ...sbH, 'Content-Type': 'application/json', Prefer: 'return=representation' },
    body: JSON.stringify({ document_id: documentId, reporter_id: reporterId, reporter_kind: reporterKind, reason, detail: detail || null }),
  });
  if (!ins.ok) {
    const why = await ins.text().catch(() => '');
    console.error(`[library-report] insert failed ${ins.status} ${why.slice(0, 200)}`);
    return json(502, { ok: false, error: 'That report could not be sent. Please try again.' });
  }

  // ⚠ Not awaited into the answer's success. The report IS recorded; failing the
  //   reader's thank-you because a counter did not move would be the wrong way
  //   round, and the count is a convenience for sorting, not the record itself.
  const count = (Number(doc.report_count) || 0) + 1;
  fetch(`${sbUrl}/rest/v1/library_documents?id=eq.${documentId}`, {
    method: 'PATCH',
    headers: { ...sbH, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({ report_count: count }),
  }).catch(() => {});

  console.log(`[library-report] ${reporterKind} reported "${doc.title}" (${reason}) — now ${count}`);
  return json(200, { ok: true, message: 'Thank you. An administrator will take a look.' });
}
