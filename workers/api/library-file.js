// GET /api/library-file?id=<uuid> — open a COMMUNITY-contributed library document.
//
// ⚠ ONLY community uploads come through here. A seed document is a static asset
//   at /library/<filename>, which Cloudflare serves free and unmetered — routing
//   those through a Worker would spend a request per download and lose the CDN
//   for the 600-document bulk of the library. The row's `storage` column says
//   which, and engine/library.js links accordingly.
//
// ⚠ THE SERVER DECIDES WHAT A READER RECEIVES. The status is re-read here with
//   the service role on every single request, so revoking a document takes
//   effect immediately: no new signed URL is minted from the moment the row
//   changes, and the ones already handed out expire on their own.
//
// ⚠ It answers 302 to a short-lived signed URL rather than streaming the bytes.
//   Streaming would put every megabyte of every download through the Worker;
//   the redirect keeps the transfer between the reader and Supabase.
import { json } from '../lib/admin-auth.js';

// Long enough to open and read on a slow connection, short enough that a
// forwarded link is not a permanent public URL for a document we may remove.
const SIGN_SECONDS = 900;

export default async function handler(request, env) {
  if (request.method !== 'GET') return json(405, { ok: false, error: 'Method not allowed' });

  const sbUrl = env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
  const sbKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!sbKey) return json(500, { ok: false, error: 'Server is missing SUPABASE_SERVICE_ROLE_KEY' });
  const sbH = { apikey: sbKey, Authorization: `Bearer ${sbKey}` };

  const id = new URL(request.url).searchParams.get('id') || '';
  if (!/^[0-9a-f-]{36}$/i.test(id)) return json(400, { ok: false, error: 'Invalid document.' });

  const res = await fetch(
    `${sbUrl}/rest/v1/library_documents?id=eq.${id}&select=storage,storage_key,filename,status,published_at&limit=1`,
    { headers: sbH });
  if (!res.ok) return json(502, { ok: false, error: 'Could not look up that document.' });
  const doc = (await res.json())[0];

  // ⚠ "Not published" and "does not exist" answer IDENTICALLY. A 404 that fires
  //   only for rows that exist is an existence oracle for everything in the
  //   review queue.
  if (!doc || doc.status !== 'published' || !doc.published_at) {
    return json(404, { ok: false, error: 'That document is not available.' });
  }

  if (doc.storage === 'static') {
    // Belt and braces: the client links straight to the asset, but if anything
    // ever sends a static document here, send it where it actually lives.
    return Response.redirect(new URL('/library/' + doc.filename, request.url).toString(), 302);
  }
  if (!doc.storage_key) return json(500, { ok: false, error: 'That document is missing its file.' });

  const signRes = await fetch(`${sbUrl}/storage/v1/object/sign/library-uploads/${doc.storage_key}`, {
    method: 'POST',
    headers: { ...sbH, 'Content-Type': 'application/json' },
    body: JSON.stringify({ expiresIn: SIGN_SECONDS }),
  });
  if (!signRes.ok) {
    const why = await signRes.text().catch(() => '');
    console.error(`[library-file] sign failed ${signRes.status} ${why.slice(0, 160)}`);
    return json(502, { ok: false, error: 'That document could not be opened. Please try again.' });
  }
  const { signedURL } = await signRes.json();
  if (!signedURL) return json(502, { ok: false, error: 'That document could not be opened.' });

  const out = Response.redirect(`${sbUrl}/storage/v1${signedURL}`, 302);
  return out;
}
