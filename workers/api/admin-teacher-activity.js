// POST /api/admin-teacher-activity — per-teacher activity summary for admin Teachers tab.

import { requireAdmin, json } from '../lib/admin-auth.js';
import { fetchRows, summarise, WINDOW_DAYS } from '../lib/teacher-activity.js';

const MAX_IDS = 30, BATCH = 10;

export default async function handler(request, env) {
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed' });

  const gate = await requireAdmin(request, env);
  if (gate.error) return gate.error;
  const { sbUrl, sbKey } = gate;
  const sbH = { apikey: sbKey, Authorization: `Bearer ${sbKey}` };

  let body;
  try { body = await request.json(); } catch { return json(400, { error: 'Invalid request.' }); }

  const ids = [...new Set((Array.isArray(body.user_ids) ? body.user_ids : []).map(String))]
    .filter(id => /^[0-9a-f-]{36}$/i.test(id)).slice(0, MAX_IDS);
  if (!ids.length) return json(200, { ok: true, teachers: {}, partial: [] });

  const sbFetch = (path) => fetch(`${sbUrl}${path}`, { headers: sbH });

  const authP = (async () => {
    const auth = {};
    let failed = false;
    for (let i = 0; i < ids.length; i += BATCH) {
      const slice = ids.slice(i, i + BATCH);
      const got = await Promise.all(slice.map(async id => {
        try {
          const res = await fetch(`${sbUrl}/auth/v1/admin/users/${id}`, { headers: sbH });
          if (!res.ok) { if (res.status !== 404) failed = true; return [id, null]; }
          const u = await res.json();
          return [id, u ? { email: u.email || null, last_sign_in_at: u.last_sign_in_at || null } : null];
        } catch { failed = true; return [id, null]; }
      }));
      got.forEach(([id, row]) => { auth[id] = row; });
    }
    return { auth, failed };
  })();

  const [rows, { auth, failed }] = await Promise.all([fetchRows(sbFetch, ids), authP]);
  const partial = rows.partial.slice();
  if (failed) partial.push('sign_in');

  return json(200, { ok: true, window_days: WINDOW_DAYS, partial, teachers: summarise(ids, rows, auth, Date.now()) });
}
