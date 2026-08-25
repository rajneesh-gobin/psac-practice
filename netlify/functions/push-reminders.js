// Netlify Scheduled Function — runs every 15 minutes.
// Checks which students have a study reminder due in this 15-min window and sends push notifications.
// Schedule declared in netlify.toml: [functions."push-reminders"] schedule = "*/15 * * * *"
//
// Required env vars:
//   SUPABASE_SERVICE_ROLE_KEY
//   VAPID_PUBLIC_KEY
//   VAPID_PRIVATE_KEY
//   VAPID_EMAIL  (optional, defaults to mailto:admin@psacpractice.mu)

import webpush from 'web-push';

const SUPABASE_URL  = 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SUPABASE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;
const VAPID_PUBLIC  = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY;
const VAPID_EMAIL   = process.env.VAPID_EMAIL || 'mailto:admin@psacpractice.mu';

webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC, VAPID_PRIVATE);

function sb(path) {
  return fetch(`${SUPABASE_URL}${path}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  }).then(r => r.ok ? r.json() : []);
}

async function removeStale(studentId) {
  await fetch(`${SUPABASE_URL}/rest/v1/push_subscriptions?student_id=eq.${studentId}`, {
    method: 'DELETE',
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
}

export async function handler() {
  if (!VAPID_PUBLIC || !VAPID_PRIVATE || !SUPABASE_KEY) {
    console.error('[push-reminders] Missing env vars');
    return;
  }

  // Current UTC time — window covers ±7 min around current HH:MM
  const now     = new Date();
  const utcH    = now.getUTCHours();
  const utcM    = now.getUTCMinutes();
  const curMins = utcH * 60 + utcM;

  // Mauritius is UTC+4 (no DST)
  const muMins  = (curMins + 4 * 60) % (24 * 60);
  const muH     = Math.floor(muMins / 60);
  const muM     = muMins % 60;

  // Build list of HH:MM strings within this 15-min window (±7 min)
  const targetTimes = [];
  for (let delta = -7; delta <= 7; delta++) {
    const t   = (muMins + delta + 24 * 60) % (24 * 60);
    const hh  = String(Math.floor(t / 60)).padStart(2, '0');
    const mm  = String(t % 60).padStart(2, '0');
    targetTimes.push(`${hh}:${mm}`);
  }

  // Fetch subscriptions with a reminder_time in this window
  const filter = targetTimes.map(t => `reminder_time.eq.${t}`).join(',');
  const rows   = await sb(`/rest/v1/push_subscriptions?or=(${filter})&select=student_id,subscription,reminder_time`);
  if (!rows.length) { console.log(`[push-reminders] No reminders at MU ${muH}:${String(muM).padStart(2,'0')}`); return; }

  console.log(`[push-reminders] Sending ${rows.length} reminder(s) at MU time ${muH}:${String(muM).padStart(2,'0')}`);

  const payload = JSON.stringify({
    title: '📚 Study time!',
    body:  "It's time for your PSAC practice. Let's go! 🇲🇺",
    url:   '/',
    icon:  '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
  });

  await Promise.allSettled(
    rows.map(async ({ student_id, subscription }) => {
      try {
        await webpush.sendNotification(subscription, payload);
      } catch (err) {
        if (err.statusCode === 410 || err.statusCode === 404) await removeStale(student_id);
        else console.error('[push-reminders] Send error:', err.message);
      }
    })
  );
}
