// Saves/updates a student's push subscription and optional reminder time.
// POST { studentId, subscription? }           → upsert subscription
// POST { studentId, reminderTime: "HH:MM"|null } → update reminder time only
// GET  ?studentId=...&action=get              → return current reminder_time

const SUPABASE_URL = 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

export async function handler(event) {
  // ── GET: return current reminder_time ──
  if (event.httpMethod === 'GET') {
    const studentId = event.queryStringParameters?.studentId;
    if (!studentId) return { statusCode: 400, body: 'Missing studentId' };
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

  // ── Update reminder_time only (no subscription payload) ──
  if (reminderTime !== undefined && !subscription) {
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
