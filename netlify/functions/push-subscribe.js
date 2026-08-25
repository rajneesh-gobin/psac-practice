// Saves/updates a student's push subscription and optional reminder time.
// POST { studentId, subscription? }           → upsert subscription
// POST { studentId, reminderTime: "HH:MM"|null } → update reminder time only
// GET  ?studentId=...&action=get              → return current reminder_time
//
// This function holds the service-role key, so it bypasses the deny-all RLS on
// push_subscriptions. Every request must therefore prove it is allowed to touch
// the studentId it names — see _callerOwns(). Without that check, anyone could
// read a child's reminder time or repoint their push subscription at their own
// endpoint and push arbitrary content to that child's device.

const SUPABASE_URL = 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANON_KEY     = process.env.SUPABASE_ANON_KEY || 'sb_publishable_wERRrZnvoWhM5faN2AaYpQ_CpTNHFkL';

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

// Same shape owns_student_txt() accepts, so a value that passes here is one the
// database would also recognise. Also the injection guard: studentId is
// interpolated into a PostgREST filter below, and anything matching this pattern
// cannot carry a `&` or an operator prefix.
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Resolve the caller's identity in the database rather than re-implementing the
// ownership rules here. Students already send an opaque session token on every
// PostgREST request (current_student_id() hashes and resolves it); parents send
// a Supabase JWT (owns_student() joins students → families → auth.uid()). Both
// functions are SECURITY DEFINER and granted to anon/authenticated, so this adds
// no new SQL surface.
async function _callerOwns(event, studentId) {
  const h     = event.headers || {};
  const token = (h['x-student-token'] || '').trim();
  const jwt   = (h['authorization'] || '').replace(/^Bearer\s+/i, '').trim();

  // Either credential is sufficient, and both are tried: a parent's device can
  // legitimately hold a live parent session AND a stale student token from an
  // earlier login. Short-circuiting on the first one present would 403 that case.
  if (token) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/current_student_id`, {
      method: 'POST',
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
        'Content-Type': 'application/json',
        'x-student-token': token,
      },
      body: '{}',
    });
    if (res.ok) {
      const resolved = await res.json();
      // A student may only ever act on their own row.
      if (typeof resolved === 'string' && resolved.toLowerCase() === studentId.toLowerCase()) return true;
    }
  }

  if (jwt) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/owns_student`, {
      method: 'POST',
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ p_student: studentId }),
    });
    if (res.ok && (await res.json()) === true) return true;
  }

  return false;
}

export async function handler(event) {
  if (!SUPABASE_KEY) {
    console.error('[push-subscribe] SUPABASE_SERVICE_ROLE_KEY is not set');
    return { statusCode: 503, body: 'Not configured' };
  }

  // ── GET: return current reminder_time ──
  if (event.httpMethod === 'GET') {
    const studentId = event.queryStringParameters?.studentId;
    if (!studentId || !UUID_RE.test(studentId)) return { statusCode: 400, body: 'Missing or invalid studentId' };
    if (!await _callerOwns(event, studentId)) return { statusCode: 403, body: 'Forbidden' };

    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/push_subscriptions?student_id=eq.${studentId}&select=reminder_time`,
      { headers }
    );
    const rows = res.ok ? await res.json() : [];
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rows[0] || {}) };
  }

  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };

  let studentId, subscription, reminderTime;
  try {
    ({ studentId, subscription, reminderTime } = JSON.parse(event.body));
    if (!studentId) throw new Error('missing studentId');
  } catch {
    return { statusCode: 400, body: 'Invalid payload' };
  }

  if (!UUID_RE.test(studentId)) return { statusCode: 400, body: 'Invalid studentId' };
  if (!await _callerOwns(event, studentId)) return { statusCode: 403, body: 'Forbidden' };

  // ── Update reminder_time only (no subscription payload) ──
  if (reminderTime !== undefined && !subscription) {
    if (reminderTime !== null && !/^([01]\d|2[0-3]):[0-5]\d$/.test(reminderTime)) {
      return { statusCode: 400, body: 'Invalid reminderTime' };
    }
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/push_subscriptions?student_id=eq.${studentId}`,
      { method: 'PATCH', headers, body: JSON.stringify({ reminder_time: reminderTime }) }
    );
    return { statusCode: res.ok ? 200 : 500, body: res.ok ? 'OK' : 'DB error' };
  }

  // ── Upsert subscription (and optionally reminder_time) ──
  if (!subscription?.endpoint) return { statusCode: 400, body: 'Invalid subscription' };

  const payload = { student_id: studentId, subscription };
  if (reminderTime !== undefined) payload.reminder_time = reminderTime;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/push_subscriptions`, {
    method: 'POST',
    headers: { ...headers, Prefer: 'resolution=merge-duplicates' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error('[push-subscribe] Supabase error:', await res.text());
    return { statusCode: 500, body: 'DB error' };
  }

  return { statusCode: 200, body: 'OK' };
}
