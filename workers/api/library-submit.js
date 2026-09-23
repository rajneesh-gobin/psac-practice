// POST /api/library-submit — a parent or teacher contributes a PDF to the library.
//
// multipart/form-data: file, title, section_id, doc_type, year, description,
//                      credit_name, disclaimer (must be the current version)
//
// ⚠ THE BYTES COME THROUGH THIS WORKER, they do not go browser → Supabase.
//   Every check that matters is here — the size cap, the %PDF- magic bytes, the
//   content hash, whether the shelf is locked, whether we already hold this
//   exact file. A direct-to-storage upload would put all of that in the browser,
//   where it is advice rather than enforcement.
//
// ⚠ NOTHING IS PUBLISHED BY THIS ENDPOINT. Every row lands `status = 'pending'`
//   and an admin decides. There is no field a caller can set to change that:
//   the insert is built here, field by field, and never spread from the request.
//
// ⚠ THE UPLOADER IS THE ONE HOLDING THE JWT, never a name in the form. The form
//   can say who to CREDIT publicly; it cannot say who is responsible.
import { json } from '../lib/admin-auth.js';

const BUCKET = 'library-uploads';
const MAX_BYTES = 6 * 1024 * 1024;
const MAX_TITLE = 160;
const MAX_DESC = 1000;

// ⚠ VERSIONED, and stored on the row with the timestamp. A ticked box that
//   leaves no trace of WHAT was agreed proves nothing later, which is the whole
//   reason for asking. Change the words → change the version.
export const DISCLAIMER_VERSION = 'library-2026-09-23';

const TYPES = new Set(['exam-paper', 'specimen-paper', 'practice', 'examiners-report', 'notes', 'worksheet']);

// A readable filename, the same shape the seed importer produces, because this
// is what the reader's device saves it as.
function slugify(s) {
  return String(s).toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
}

// ⚠ A HINT, NOT A VERDICT, and the review screen must say so. This reads the
//   RAW bytes, so it only sees text the PDF did not compress — and much of a
//   scanned corpus has no text layer at all. A clean result means "nothing
//   obvious", never "nothing there".
// ⚠ It NEVER blocks a submission. Personal data in a document is a judgement
//   about context — a teacher's own name on her worksheet is fine, a pupil's is
//   not — and a machine cannot make it. All this does is tell the reviewer
//   where to look, on the file most likely to be waved through at 11pm.
function scanForPersonalData(buf) {
  const text = new TextDecoder('latin1').decode(new Uint8Array(buf.slice(0, 2 * 1024 * 1024)));
  const flags = [];
  if (/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(text)) flags.push('email');
  // Mauritian mobiles are 5xxxxxxx and landlines 2xx xxxx; +230 is the country
  // code. Kept deliberately loose — a false positive costs one glance.
  if (/(?:\+?230[\s-]?)?[0-9][0-9\s-]{6,11}[0-9]/.test(text.replace(/[\r\n]/g, ' '))) flags.push('phone-number');
  if (/\b(?:NIC|N\.I\.C|national id)\b/i.test(text)) flags.push('id-number');
  return flags;
}

async function sha256Hex(buf) {
  const d = await crypto.subtle.digest('SHA-256', buf);
  return [...new Uint8Array(d)].map(b => b.toString(16).padStart(2, '0')).join('');
}

// Adults only, and the role comes from `profiles`, never from the request.
async function requireAdult(request, env) {
  const sbUrl = env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
  const sbKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!sbKey) return { error: json(500, { ok: false, error: 'Server is missing SUPABASE_SERVICE_ROLE_KEY' }) };

  const jwt = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '').trim();
  if (!jwt) return { error: json(401, { ok: false, error: 'Please sign in to share a document.' }) };

  const userRes = await fetch(`${sbUrl}/auth/v1/user`, { headers: { apikey: sbKey, Authorization: `Bearer ${jwt}` } });
  if (!userRes.ok) return { error: json(401, { ok: false, error: 'Your sign-in session has expired.' }) };
  const caller = await userRes.json();
  if (!caller?.id) return { error: json(401, { ok: false, error: 'Your sign-in session has expired.' }) };

  const pr = await fetch(`${sbUrl}/rest/v1/profiles?id=eq.${caller.id}&select=role,disabled,full_name&limit=1`,
    { headers: { apikey: sbKey, Authorization: `Bearer ${sbKey}` } });
  const profile = pr.ok ? (await pr.json())[0] : null;
  // ⚠ A child has no JWT at all, so this cannot be reached by one. The check is
  //   about a DISABLED adult, and about a role we have not decided to trust.
  if (!profile || profile.disabled) return { error: json(403, { ok: false, error: 'This account cannot share documents.' }) };
  if (!['parent', 'teacher', 'admin'].includes(profile.role)) {
    return { error: json(403, { ok: false, error: 'This account cannot share documents.' }) };
  }
  return { caller, profile, sbUrl, sbKey };
}

export default async function handler(request, env) {
  if (request.method !== 'POST') return json(405, { ok: false, error: 'Method not allowed' });

  const gate = await requireAdult(request, env);
  if (gate.error) return gate.error;
  const { caller, profile, sbUrl, sbKey } = gate;
  const sbH = { apikey: sbKey, Authorization: `Bearer ${sbKey}` };

  let form;
  try { form = await request.formData(); } catch { return json(400, { ok: false, error: 'Invalid submission.' }); }

  const file = form.get('file');
  const title = String(form.get('title') || '').trim().slice(0, MAX_TITLE);
  const sectionId = String(form.get('section_id') || '').trim();
  const docType = String(form.get('doc_type') || 'worksheet').trim();
  const yearRaw = Number(form.get('year'));
  const year = Number.isInteger(yearRaw) && yearRaw >= 1990 && yearRaw <= 2099 ? yearRaw : null;
  const description = String(form.get('description') || '').trim().slice(0, MAX_DESC);
  const creditName = String(form.get('credit_name') || '').trim().slice(0, 80);
  const disclaimer = String(form.get('disclaimer') || '').trim();

  if (!file || typeof file.arrayBuffer !== 'function') return json(400, { ok: false, error: 'Choose a PDF to share.' });
  if (!title) return json(400, { ok: false, error: 'Give the document a title.' });
  if (!/^[0-9a-f-]{36}$/i.test(sectionId)) return json(400, { ok: false, error: 'Choose a grade and subject.' });
  if (!TYPES.has(docType)) return json(400, { ok: false, error: 'Choose what kind of document this is.' });
  // ⚠ The disclaimer is checked by VERSION, not by truthiness. A stale client
  //   that agreed to older wording must not pass as having agreed to this one.
  if (disclaimer !== DISCLAIMER_VERSION) {
    return json(400, { ok: false, error: 'Please tick the box to confirm you may share this document.' });
  }

  const buf = await file.arrayBuffer();
  if (buf.byteLength === 0) return json(400, { ok: false, error: 'That file is empty.' });
  if (buf.byteLength > MAX_BYTES) {
    return json(413, {
      ok: false,
      error: `That file is ${(buf.byteLength / 1048576).toFixed(1)} MB and the limit is 6 MB. `
        + 'Scanning in black-and-white at 200 dpi usually gets a paper well under.',
    });
  }
  // ⚠ MAGIC BYTES, not the filename and not the browser's content type. A file
  //   renamed .pdf is the classic route to serving something else from your own
  //   origin.
  const head = new TextDecoder('latin1').decode(new Uint8Array(buf.slice(0, 5)));
  if (head !== '%PDF-') return json(400, { ok: false, error: 'That does not look like a PDF file.' });

  // ── Already have it? ────────────────────────────────────────────────────
  // ⚠ Checked against EVERY status, so a removed document is recognised on
  //   sight rather than being re-approved by a tired admin at 11pm. The dedupe
  //   index doubles as a blocklist.
  const sha256 = await sha256Hex(buf);
  const dupRes = await fetch(`${sbUrl}/rest/v1/library_documents?sha256=eq.${sha256}&select=id,title,status&limit=1`, { headers: sbH });
  const dup = dupRes.ok ? (await dupRes.json())[0] : null;
  if (dup) {
    if (dup.status === 'removed' || dup.status === 'rejected') {
      return json(409, { ok: false, error: 'This document was reviewed before and is not being shared.' });
    }
    return json(409, {
      ok: false, duplicate: true,
      error: dup.status === 'published'
        ? `We already have this one — it is in the library as “${dup.title}”.`
        : 'Thank you — this document is already waiting to be reviewed.',
    });
  }

  // ── The shelf has to be open ────────────────────────────────────────────
  const secRes = await fetch(`${sbUrl}/rest/v1/library_sections?id=eq.${sectionId}&select=id,name,grade,status,parent_id&limit=1`, { headers: sbH });
  const section = secRes.ok ? (await secRes.json())[0] : null;
  if (!section) return json(400, { ok: false, error: 'That shelf no longer exists.' });
  if (section.status !== 'active') {
    return json(409, { ok: false, error: `“${section.name}” is not accepting new documents at the moment.` });
  }

  // ── Store, then record ──────────────────────────────────────────────────
  // ⚠ The object key is the CONTENT HASH, so the same bytes can never occupy
  //   two objects and an approved file can never be swapped for different ones.
  const key = `pending/${sha256}.pdf`;
  const put = await fetch(`${sbUrl}/storage/v1/object/${BUCKET}/${key}`, {
    method: 'POST',
    headers: { ...sbH, 'Content-Type': 'application/pdf', 'x-upsert': 'true' },
    body: buf,
  });
  if (!put.ok) {
    const why = await put.text().catch(() => '');
    console.error(`[library-submit] upload failed ${put.status} ${why.slice(0, 200)}`);
    return json(502, { ok: false, error: 'The file could not be stored. Please try again.' });
  }

  const filename = `${slugify(title)}-${sha256.slice(0, 6)}.pdf`;
  const row = {
    sha256, filename,
    storage: 'supabase', storage_key: key,
    section_id: sectionId,
    grade: section.grade ?? null,
    doc_type: docType,
    year, title,
    description: description || null,
    bytes: buf.byteLength,
    status: 'pending',                       // ⚠ never from the request
    source: 'community',
    submitted_by: caller.id,
    submitted_name: profile.full_name || null,
    credit_name: creditName || null,
    pii_flags: scanForPersonalData(buf),
    disclaimer_version: DISCLAIMER_VERSION,
    disclaimer_accepted_at: new Date().toISOString(),
  };

  const ins = await fetch(`${sbUrl}/rest/v1/library_documents`, {
    method: 'POST',
    headers: { ...sbH, 'Content-Type': 'application/json', Prefer: 'return=representation' },
    body: JSON.stringify(row),
  });
  if (!ins.ok) {
    const why = await ins.text().catch(() => '');
    // ⚠ Put the orphan back. The object is already stored; leaving it there on a
    //   failed insert accumulates files nothing references and nothing can find.
    await fetch(`${sbUrl}/storage/v1/object/${BUCKET}/${key}`, { method: 'DELETE', headers: sbH }).catch(() => {});
    console.error(`[library-submit] insert failed ${ins.status} ${why.slice(0, 200)}`);
    return json(500, { ok: false, error: 'The document could not be recorded. Please try again.' });
  }
  const saved = (await ins.json())[0];

  console.log(`[library-submit] ${caller.email} submitted "${title}" (${(buf.byteLength / 1024).toFixed(0)} KB) to ${section.name}`);
  return json(200, {
    ok: true,
    id: saved.id,
    status: 'pending',
    message: 'Thank you. An administrator will review it before it appears in the library.',
  });
}
