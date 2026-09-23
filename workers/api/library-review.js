// GET/POST /api/library-review — the admin queue for community submissions.
//
//   GET  ?status=pending&limit=25   list submissions, each with a short-lived
//                                   preview URL and any duplicate hints
//   POST { action, id, ... }        approve | reject | remove | reclassify
//
// ⚠ APPROVING IS THE ONLY THING THAT PUBLISHES, and it is the only place
//   `published_at` is written for a community document. The shelf requires both
//   `status = 'published'` AND `published_at`, so a row can never appear on a
//   shelf because someone edited one column by hand.
//
// ⚠ RECLASSIFYING IS FREE, and that is by design: grade and subject live in the
//   database, never in the storage key. Moving a document between shelves is one
//   UPDATE, not a file copy.
//
// ⚠ NOTHING IS EVER DELETED. Reject and remove set a status and keep the row —
//   which keeps the sha256, and that is what lets /api/library-submit recognise
//   a previously removed file on sight instead of relying on an admin to
//   remember it at 11pm. The stored OBJECT is deleted; the record is not.
import { requireAdmin, json, logAdminAction } from '../lib/admin-auth.js';
import { sendMail, wrap, escapeHtml, siteUrl, mailConfigured, mailFromHuman, mailReplyTo, replyNoteText } from '../lib/mailer.js';

const BUCKET = 'library-uploads';
const PREVIEW_SECONDS = 900;   // ⚠ shorter than a published link: this is unreviewed content
const MAX_NOTE = 500;

const ACTIONS = new Set(['approve', 'reject', 'remove', 'reclassify', 'dismiss_report']);

async function signPreview(sbUrl, sbH, key) {
  if (!key) return null;
  const res = await fetch(`${sbUrl}/storage/v1/object/sign/${BUCKET}/${key}`, {
    method: 'POST', headers: { ...sbH, 'Content-Type': 'application/json' },
    body: JSON.stringify({ expiresIn: PREVIEW_SECONDS }),
  });
  if (!res.ok) return null;
  const { signedURL } = await res.json();
  return signedURL ? `${sbUrl}/storage/v1${signedURL}` : null;
}

// ⚠ The exact-hash duplicate is already refused at submission time, so what is
//   useful HERE is the softer signal: what else is already on this shelf for
//   this year. Shown, never acted on — it might be Paper 2 or a marking scheme.
async function slotMates(sbUrl, sbH, doc) {
  if (!doc.section_id) return [];
  const year = doc.year ? `&year=eq.${doc.year}` : '';
  const res = await fetch(
    `${sbUrl}/rest/v1/library_documents?section_id=eq.${doc.section_id}${year}` +
    `&status=eq.published&id=neq.${doc.id}&select=id,title,year&limit=5`, { headers: sbH });
  return res.ok ? await res.json() : [];
}

async function emailDecision(env, { to, name, title, approved, note }) {
  if (!mailConfigured(env) || !to) return 'not_configured';
  const site = siteUrl(env);
  const first = String(name || '').trim().split(/\s+/)[0] || 'there';
  const subject = approved ? 'Your document is now in the Nou Klass library'
                           : 'About the document you shared with Nou Klass';
  const bodyHtml = approved
    ? `<p style="margin:0 0 14px">Hello ${escapeHtml(first)},</p>
       <p style="margin:0 0 14px">Thank you for sharing <b>${escapeHtml(title)}</b>. It has been approved and is now in the library for other families to use.</p>
       <p style="margin:0 0 6px"><a href="${site}/" style="display:inline-block;background:#4f46e5;color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:10px">Open the library</a></p>`
    : `<p style="margin:0 0 14px">Hello ${escapeHtml(first)},</p>
       <p style="margin:0 0 14px">Thank you for sharing <b>${escapeHtml(title)}</b>. We are not able to add it to the library.</p>
       ${note ? `<p style="margin:0 0 14px"><b>Reason:</b> ${escapeHtml(note)}</p>` : ''}
       <p style="margin:0 0 14px">You are very welcome to share something else.</p>`;
  const text = (approved
    ? `Hello ${first},\n\nThank you for sharing "${title}". It has been approved and is now in the library.\n\n${site}/`
    : `Hello ${first},\n\nThank you for sharing "${title}". We are not able to add it to the library.`
      + (note ? `\n\nReason: ${note}` : '')) + '\n\n—\n' + replyNoteText(env, { monitored: true });

  const res = await sendMail(env, {
    to, subject, text,
    html: wrap({ env, monitored: true, title: approved ? 'Your document is live' : 'About your document', bodyHtml,
      footerHtml: 'You are receiving this because you shared a document with the Nou Klass library.' }),
    // A person decided this, so it comes from the monitored address, not noreply@.
    from: mailFromHuman(env), replyTo: mailReplyTo(env),
  });
  return res.ok ? 'sent' : (res.error || 'send_failed');
}

export default async function handler(request, env) {
  if (!['GET', 'POST'].includes(request.method)) return json(405, { ok: false, error: 'Method not allowed' });

  const gate = await requireAdmin(request, env);
  if (gate.error) return gate.error;
  const { sbUrl, sbKey } = gate;
  const sbH = { apikey: sbKey, Authorization: `Bearer ${sbKey}` };

  // ── The queue ───────────────────────────────────────────────────────────
  if (request.method === 'GET') {
    const url = new URL(request.url);

    // ⚠ THE REPORTS VIEW. Readers could file a report, the row was stored and
    //   the counter incremented — and nothing in the app ever read the table.
    //   A child flagging something unsuitable reached nobody. This is that
    //   missing half.
    if (url.searchParams.get('view') === 'reports') {
      const state = url.searchParams.get('state') === 'all' ? null : 'open';
      const q = state ? `&status=eq.${state}` : '';
      const res = await fetch(
        `${sbUrl}/rest/v1/library_reports?select=id,document_id,reporter_kind,reason,detail,status,created_at${q}` +
        `&order=created_at.desc&limit=100`, { headers: sbH });
      if (!res.ok) return json(502, { ok: false, error: 'Could not read the reports.' });
      const reports = await res.json();

      // One lookup for the documents they point at, not one per report.
      const ids = [...new Set(reports.map(r => r.document_id))];
      const docs = {};
      if (ids.length) {
        const dr = await fetch(
          `${sbUrl}/rest/v1/library_documents?id=in.(${ids.join(',')})` +
          `&select=id,title,status,storage,storage_key,filename,report_count,section_id`, { headers: sbH });
        if (dr.ok) for (const d of await dr.json()) docs[d.id] = d;
      }

      const out = [];
      for (const r of reports) {
        const d = docs[r.document_id] || null;
        out.push({
          ...r,
          document: d ? {
            id: d.id, title: d.title, status: d.status, report_count: d.report_count,
            // ⚠ The key never leaves the server; a signed preview does.
            preview_url: d.storage === 'supabase' ? await signPreview(sbUrl, sbH, d.storage_key) : `/library/${d.filename}`,
          } : null,
        });
      }
      return json(200, { ok: true, view: 'reports', count: out.length, reports: out });
    }

    const status = ['pending', 'published', 'rejected', 'removed'].includes(url.searchParams.get('status'))
      ? url.searchParams.get('status') : 'pending';
    const limit = Math.min(50, Math.max(1, Number(url.searchParams.get('limit')) || 25));

    const res = await fetch(
      `${sbUrl}/rest/v1/library_documents?status=eq.${status}&source=eq.community` +
      `&select=id,title,description,doc_type,year,bytes,pages,filename,storage,storage_key,section_id,` +
      `submitted_by,submitted_name,credit_name,created_at,review_note,sha256,report_count,pii_flags` +
      `&order=created_at.asc&limit=${limit}`, { headers: sbH });
    if (!res.ok) return json(502, { ok: false, error: 'Could not read the review queue.' });
    const docs = await res.json();

    // One section lookup for the whole page rather than one per row.
    const sectionIds = [...new Set(docs.map(d => d.section_id).filter(Boolean))];
    const sections = {};
    if (sectionIds.length) {
      const sr = await fetch(`${sbUrl}/rest/v1/library_sections?id=in.(${sectionIds.join(',')})&select=id,name,parent_id`, { headers: sbH });
      if (sr.ok) for (const s of await sr.json()) sections[s.id] = s;
    }

    const out = [];
    for (const d of docs) {
      out.push({
        ...d,
        storage_key: undefined,                       // never leaves the server
        section_name: sections[d.section_id]?.name || null,
        preview_url: d.storage === 'supabase' ? await signPreview(sbUrl, sbH, d.storage_key) : `/library/${d.filename}`,
        also_in_slot: await slotMates(sbUrl, sbH, d),
      });
    }
    return json(200, { ok: true, status, count: out.length, documents: out });
  }

  // ── A decision ──────────────────────────────────────────────────────────
  let body;
  try { body = await request.json(); } catch { return json(400, { ok: false, error: 'Invalid request.' }); }

  const action = String(body.action || '');
  const id = String(body.id || '');

  // ⚠ DISMISS ACTS ON THE REPORT, not the document. "Looked at it, it is fine"
  //   is a first-class outcome — a queue with no way to say that grows until
  //   nobody opens it. The document is untouched.
  if (action === 'dismiss_report') {
    if (!/^[0-9a-f-]{36}$/i.test(id)) return json(400, { ok: false, error: 'Invalid report.' });
    const upd = await fetch(`${sbUrl}/rest/v1/library_reports?id=eq.${id}`, {
      method: 'PATCH',
      headers: { ...sbH, 'Content-Type': 'application/json', Prefer: 'return=representation' },
      body: JSON.stringify({
        status: 'dismissed', handled_by: gate.caller.id, handled_at: new Date().toISOString(),
        handler_note: String(body.note || '').trim().slice(0, MAX_NOTE) || null,
      }),
    });
    if (!upd.ok) return json(502, { ok: false, error: 'Could not dismiss that report.' });
    const saved = (await upd.json())[0];
    if (!saved || saved.status !== 'dismissed') {
      return json(500, { ok: false, error: 'The report did not change. Nothing was done.' });
    }
    await logAdminAction(gate, { action: 'library_report_dismiss', detail: { report: id } });
    return json(200, { ok: true, id, status: 'dismissed' });
  }
  const note = String(body.note || '').trim().slice(0, MAX_NOTE);
  const sectionId = String(body.section_id || '').trim();

  if (!ACTIONS.has(action)) return json(400, { ok: false, error: 'Unknown action.' });
  if (!/^[0-9a-f-]{36}$/i.test(id)) return json(400, { ok: false, error: 'Invalid document.' });

  const cur = await fetch(`${sbUrl}/rest/v1/library_documents?id=eq.${id}&select=*&limit=1`, { headers: sbH });
  if (!cur.ok) return json(502, { ok: false, error: 'Could not read that document.' });
  const doc = (await cur.json())[0];
  if (!doc) return json(404, { ok: false, error: 'That document no longer exists.' });

  const now = new Date().toISOString();
  const patch = { reviewed_by: gate.caller.id, reviewed_at: now, review_note: note || null };

  if (action === 'reclassify') {
    if (!/^[0-9a-f-]{36}$/i.test(sectionId)) return json(400, { ok: false, error: 'Choose a shelf.' });
    const sr = await fetch(`${sbUrl}/rest/v1/library_sections?id=eq.${sectionId}&select=id,grade&limit=1`, { headers: sbH });
    const sec = sr.ok ? (await sr.json())[0] : null;
    if (!sec) return json(400, { ok: false, error: 'That shelf does not exist.' });
    patch.section_id = sec.id;
    patch.grade = sec.grade ?? null;
  }

  if (action === 'approve') {
    // Reclassify on the way in, when the admin has corrected the shelf.
    if (/^[0-9a-f-]{36}$/i.test(sectionId)) {
      const sr = await fetch(`${sbUrl}/rest/v1/library_sections?id=eq.${sectionId}&select=id,grade&limit=1`, { headers: sbH });
      const sec = sr.ok ? (await sr.json())[0] : null;
      if (sec) { patch.section_id = sec.id; patch.grade = sec.grade ?? null; }
    }
    patch.status = 'published';
    // ⚠ The FACT, written only here. The shelf requires it, so a hand-edited
    //   status column alone can never put a document in front of a reader.
    patch.published_at = now;
    patch.hold_reason = null;
  }
  if (action === 'reject') { patch.status = 'rejected'; patch.published_at = null; }
  if (action === 'remove') { patch.status = 'removed'; patch.published_at = null; }

  const upd = await fetch(`${sbUrl}/rest/v1/library_documents?id=eq.${id}`, {
    method: 'PATCH',
    headers: { ...sbH, 'Content-Type': 'application/json', Prefer: 'return=representation' },
    body: JSON.stringify(patch),
  });
  if (!upd.ok) {
    const why = await upd.text().catch(() => '');
    console.error(`[library-review] ${action} failed ${upd.status} ${why.slice(0, 200)}`);
    return json(502, { ok: false, error: `Could not ${action} that document.` });
  }
  const saved = (await upd.json())[0];
  // ⚠ READ-AFTER-WRITE. A 200 from PostgREST is not proof the row moved, and the
  //   symptom of believing it is the one this project has already shipped once:
  //   the toast says approved and the row is still in the queue on refresh.
  if (action === 'approve' && (saved.status !== 'published' || !saved.published_at)) {
    return json(500, { ok: false, error: 'The document did not publish. Nothing was changed.' });
  }

  // ── The stored object ───────────────────────────────────────────────────
  // ⚠ Deleted for a rejection or a removal, kept for an approval. The ROW stays
  //   either way: it carries the sha256 that makes the dedupe index a blocklist.
  let fileRemoved = false;
  if ((action === 'reject' || action === 'remove') && doc.storage === 'supabase' && doc.storage_key) {
    const del = await fetch(`${sbUrl}/storage/v1/object/${BUCKET}/${doc.storage_key}`, { method: 'DELETE', headers: sbH });
    fileRemoved = del.ok;
  }

  // ⚠ ACTING ON A DOCUMENT CLOSES ITS OPEN REPORTS. Otherwise the queue still
  //   shows complaints about a file that has already gone, and the next admin
  //   re-reviews something that was dealt with.
  if (action === 'remove' || action === 'reject') {
    await fetch(`${sbUrl}/rest/v1/library_reports?document_id=eq.${id}&status=eq.open`, {
      method: 'PATCH',
      headers: { ...sbH, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({ status: 'actioned', handled_by: gate.caller.id, handled_at: now }),
    }).catch(() => {});
  }

  // ── Tell the contributor ────────────────────────────────────────────────
  // ⚠ Silence after a decision reads as a bug or an insult, and this is the same
  //   person you want contributing next month. Never fails the decision.
  let emailed = 'skipped';
  if ((action === 'approve' || action === 'reject') && doc.submitted_by) {
    try {
      const ur = await fetch(`${sbUrl}/auth/v1/admin/users/${doc.submitted_by}`, { headers: sbH });
      const user = ur.ok ? await ur.json() : null;
      if (user?.email) {
        emailed = await emailDecision(env, {
          to: user.email, name: doc.submitted_name || user.user_metadata?.full_name,
          title: doc.title, approved: action === 'approve', note,
        });
      } else emailed = 'no_address';
    } catch (e) { emailed = 'failed:' + String(e && e.message || e).slice(0, 60); }
  }

  console.log(`[library-review] ${gate.caller.email} ${action} "${doc.title}" (email: ${emailed})`);
  await logAdminAction(gate, {
    action: `library_${action}`,
    targetUser: doc.submitted_by || null,
    detail: {
      document: id, title: doc.title, sha256: doc.sha256,
      ...(patch.section_id ? { moved_to: patch.section_id } : {}),
      ...(note ? { note } : {}),
      file_removed: fileRemoved, emailed,
    },
  });

  return json(200, { ok: true, id, status: saved.status, emailed, file_removed: fileRemoved });
}
