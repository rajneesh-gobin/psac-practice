'use strict';
// ══════════════════════════════════════════════
//  Supabase client - shared singleton
//  Loaded before all other engine files.
// ══════════════════════════════════════════════
const SB_URL = 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SB_KEY = 'sb_publishable_wERRrZnvoWhM5faN2AaYpQ_CpTNHFkL';
const _sb = (typeof supabase !== 'undefined')
  ? supabase.createClient(SB_URL, SB_KEY, {
      auth: { persistSession: true, storageKey: 'mm_sb_auth' }
    })
  : null;

// ── Student session token ──────────────────────────────────────────────────
// Students are not Supabase Auth users, so RLS cannot key off auth.uid().
// mint_student_session() issues an opaque token; we send it on every PostgREST
// request as `x-student-token`, and current_student_id() resolves it inside the
// database. Policies then read as  student_id = current_student_id().
//
// _sb.rest is the PostgrestClient. Its `headers` object is read at request-build
// time, so mutating it here affects every subsequent .from() and .rpc() call —
// no need to recreate the client and invalidate existing references to _sb.
const SB_STUDENT_TOKEN_HEADER = 'x-student-token';

let _sbTokenWarned = false;

function setStudentToken(token) {
  if (!_sb) return;
  if (!_sb.rest || !_sb.rest.headers) {
    // Fail loudly: if this ever stops working (supabase-js internals change),
    // every student RLS check silently sees NULL and the app looks empty
    // rather than broken. Better to see it in the console immediately.
    if (!_sbTokenWarned) {
      _sbTokenWarned = true;
      console.error('[supabase] _sb.rest.headers unavailable - the x-student-token header cannot be set. Student data access will fail.');
    }
    return;
  }
  if (token) _sb.rest.headers[SB_STUDENT_TOKEN_HEADER] = token;
  else       delete _sb.rest.headers[SB_STUDENT_TOKEN_HEADER];
}

function getStudentToken() {
  return (_sb && _sb.rest && _sb.rest.headers)
    ? (_sb.rest.headers[SB_STUDENT_TOKEN_HEADER] || null)
    : null;
}
