'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice - Supabase client - shared singleton
//  Loaded before all other engine files.
// ══════════════════════════════════════════════
const SB_URL = 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SB_KEY = 'sb_publishable_wERRrZnvoWhM5faN2AaYpQ_CpTNHFkL';

// ── Student session token ──────────────────────────────────────────────────
// Students are not Supabase Auth users, so RLS cannot key off auth.uid().
// mint_student_session() issues an opaque token; we send it on every
// PostgREST request as `x-student-token`, and current_student_id() resolves
// it inside the database. Policies then read as student_id = current_student_id().
//
// This used to mutate `_sb.rest.headers` directly - an UNDOCUMENTED internal
// of the bundled PostgrestClient. The CDN script tag pins only the major
// version (@2), so it silently floats to whatever the latest 2.x.x release is
// on every page load with no commit in this repo to point at - and that
// internal shape is not part of supabase-js's public contract. It can (and,
// evidenced by students suddenly getting 401s on every write - progress,
// question reports, login_events - the moment they logged in, did) stop
// actually reaching outgoing requests without ever throwing or logging
// anything, because `_sb.rest.headers` staying a defined, mutable-looking
// object is not proof that mutating it still affects a request built later.
//
// A custom `fetch` passed via the client's own `global.fetch` option is,
// by contrast, documented, stable public API: SupabaseClient threads
// `this.fetch` through to every sub-client it builds, including PostgREST,
// Storage and Realtime. Every request the client ever makes runs through
// this function, and the current token (if any) is read fresh and attached
// on every single call - there is no cached object to go stale, get replaced,
// or silently stop mattering on some future version bump.
const SB_STUDENT_TOKEN_HEADER = 'x-student-token';
let _studentToken = null;

// ⚠ NEVER on /auth/v1/. This attached x-student-token to EVERY request the
// client made, including the parent's own token refresh
// (POST /auth/v1/token?grant_type=refresh_token).
//
// x-student-token is not a CORS-safelisted header, so adding it turns that
// refresh into a preflighted request: the browser first sends OPTIONS and will
// only proceed if GoTrue answers with x-student-token in
// Access-Control-Allow-Headers. PostgREST is configured to accept the header —
// that is how student sessions work at all — but the auth service is a separate
// service with its own CORS configuration and no reason to know about it.
//
// The failure that produces is silent and delayed, which is why it was hard to
// see: nothing goes wrong while the access token is still valid. About an hour
// after a student token is installed on the device, the parent's session tries
// to refresh, the refresh cannot complete, supabase-js retries and then drops
// the session — and the next time the parent taps 🔒 Parent and types a correct
// PIN, getSession() returns null and they are told their sign-in has expired on
// the only device they own. Measured: one refreshSession() call produced EIGHT
// refresh attempts, every one of them carrying the header.
//
// The student token is only ever meaningful to PostgREST, where
// current_student_id() reads it. A deny-list on the auth path rather than an
// allow-list on /rest/v1/, deliberately: this keeps every other route the
// client may use behaving exactly as it does today, and fixes precisely the one
// that was broken.
function _sbIsAuthRequest(input) {
  try {
    const url = typeof input === 'string' ? input
              : (input && typeof input.url === 'string') ? input.url
              : String(input || '');
    return url.indexOf('/auth/v1/') !== -1;
  } catch (_) {
    // Unparseable target: assume auth and leave the header off. The cost of
    // being wrong that way is a student request without its token, which fails
    // loudly and locally; the cost of being wrong the other way is the silent,
    // hour-later session loss described above.
    return true;
  }
}

function _sbFetch(input, init = {}) {
  const headers = new Headers(init.headers || {});
  if (_studentToken && !_sbIsAuthRequest(input)) headers.set(SB_STUDENT_TOKEN_HEADER, _studentToken);
  else headers.delete(SB_STUDENT_TOKEN_HEADER);
  return fetch(input, Object.assign({}, init, { headers }));
}

const _sb = (typeof supabase !== 'undefined')
  ? supabase.createClient(SB_URL, SB_KEY, {
      auth: { persistSession: true, storageKey: 'mm_sb_auth' },
      global: { fetch: _sbFetch },
    })
  : null;

function setStudentToken(token) {
  _studentToken = token || null;
}

function getStudentToken() {
  return _studentToken;
}
