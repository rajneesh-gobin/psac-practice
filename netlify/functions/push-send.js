// Sends a Web Push notification to one or more students.
// POST body: { studentIds: [...], title, body, url? }
// Internal use only — not exposed publicly (requires service key header check).

import webpush from 'web-push';

const SUPABASE_URL  = 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SUPABASE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;
const VAPID_PUBLIC  = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY;
const VAPID_EMAIL   = process.env.VAPID_EMAIL || 'mailto:admin@psacpractice.mu';

webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC, VAPID_PRIVATE);

async function getSubscriptions(studentIds) {
  const ids = studentIds.map(id => `student_id.eq.${id}`).join(',');
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/push_subscriptions?or=(${ids})&select=student_id,subscription`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  );
  return res.ok ? res.json() : [];
}

async function removeStaleSubscription(studentId) {
  await fetch(
    `${SUPABASE_URL}/rest/v1/push_subscriptions?student_id=eq.${studentId}`,
    { method: 'DELETE', headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  );
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };

  // Internal guard — only callable from other Netlify functions or with service key
  const authHeader = event.headers['x-service-key'] || '';
  if (authHeader !== SUPABASE_KEY) return { statusCode: 403, body: 'Forbidden' };

  let studentIds, title, body, url;
  try {
    ({ studentIds, title, body, url } = JSON.parse(event.body));
    if (!studentIds?.length || !title || !body) throw new Error('bad payload');
  } catch {
    return { statusCode: 400, body: 'Invalid payload' };
  }

  const subs = await getSubscriptions(studentIds);
  const payload = JSON.stringify({ title, body, url: url || '/', icon: '/icons/icon-192.png', badge: '/icons/icon-192.png' });

  const results = await Promise.allSettled(
    subs.map(async ({ student_id, subscription }) => {
      try {
        await webpush.sendNotification(subscription, payload);
      } catch (err) {
        // 410 Gone = subscription expired or unsubscribed — clean up
        if (err.statusCode === 410 || err.statusCode === 404) await removeStaleSubscription(student_id);
        else throw err;
      }
    })
  );

  const sent   = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;
  return { statusCode: 200, body: JSON.stringify({ sent, failed }) };
}
