// POST/GET /api/push-subscribe — save or retrieve a student's push subscription.

const SB_URL  = 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const ANON_KEY = 'sb_publishable_wERRrZnvoWhM5faN2AaYpQ_CpTNHFkL';
const UUID_RE  = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function _planAllowsPush(studentId, headers) {
  try {
    const res = await fetch(`${SB_URL}/rest/v1/rpc/plan_features_for_student`, {
      method: 'POST', headers, body: JSON.stringify({ p_student: studentId }),
    });
    if (!res.ok) return true;
    const features = await res.json();
    if (!features || typeof features !== 'object') return true;
    return features.push_reminders !== false;
  } catch { return true; }
}

async function _callerOwns(request, studentId, sbKey) {
  const token = (request.headers.get('x-student-token') || '').trim();
  const jwt   = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '').trim();

  if (token) {
    const res = await fetch(`${SB_URL}/rest/v1/rpc/current_student_id`, {
      method: 'POST',
      headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}`, 'Content-Type': 'application/json', 'x-student-token': token },
      body: '{}',
    });
    if (res.ok) {
      const resolved = await res.json();
      if (typeof resolved === 'string' && resolved.toLowerCase() === studentId.toLowerCase()) return true;
    }
  }

  if (jwt) {
    const res = await fetch(`${SB_URL}/rest/v1/rpc/owns_student`, {
      method: 'POST',
      headers: { apikey: ANON_KEY, Authorization: `Bearer ${jwt}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_student: studentId }),
    });
    if (res.ok && (await res.json()) === true) return true;
  }
  return false;
}

export default async function handler(request, env) {
  const sbKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!sbKey) return new Response('Not configured', { status: 503 });

  const headers = { apikey: sbKey, Authorization: `Bearer ${sbKey}`, 'Content-Type': 'application/json' };

  if (request.method === 'GET') {
    const url = new URL(request.url);
    const studentId = url.searchParams.get('studentId');
    if (!studentId || !UUID_RE.test(studentId)) return new Response('Missing or invalid studentId', { status: 400 });
    if (!await _callerOwns(request, studentId, sbKey)) return new Response('Forbidden', { status: 403 });

    const res = await fetch(`${SB_URL}/rest/v1/push_subscriptions?student_id=eq.${studentId}&select=reminder_time`, { headers });
    const rows = res.ok ? await res.json() : [];
    return new Response(JSON.stringify(rows[0] || {}), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  let studentId, subscription, reminderTime;
  try {
    ({ studentId, subscription, reminderTime } = await request.json());
    if (!studentId) throw new Error('missing studentId');
  } catch { return new Response('Invalid payload', { status: 400 }); }

  if (!UUID_RE.test(studentId)) return new Response('Invalid studentId', { status: 400 });
  if (!await _callerOwns(request, studentId, sbKey)) return new Response('Forbidden', { status: 403 });

  if (reminderTime !== undefined && reminderTime !== null) {
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(reminderTime)) return new Response('Invalid reminderTime', { status: 400 });
    if (!await _planAllowsPush(studentId, headers)) return new Response('Daily reminders are not included in this plan.', { status: 402 });
  }

  if (reminderTime !== undefined && !subscription) {
    const res = await fetch(`${SB_URL}/rest/v1/push_subscriptions?student_id=eq.${studentId}`,
      { method: 'PATCH', headers, body: JSON.stringify({ reminder_time: reminderTime }) });
    return new Response(res.ok ? 'OK' : 'DB error', { status: res.ok ? 200 : 500 });
  }

  if (!subscription?.endpoint) return new Response('Invalid subscription', { status: 400 });

  const payload = { student_id: studentId, subscription };
  if (reminderTime !== undefined) payload.reminder_time = reminderTime;

  const res = await fetch(`${SB_URL}/rest/v1/push_subscriptions`, {
    method: 'POST',
    headers: { ...headers, Prefer: 'resolution=merge-duplicates' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error('[push-subscribe] Supabase error:', await res.text());
    return new Response('DB error', { status: 500 });
  }

  return new Response('OK', { status: 200 });
}
