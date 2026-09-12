// POST /api/admin-member-emails — resolve account emails for admin members list.

import { requireAdmin, json } from '../lib/admin-auth.js';

const MAX_IDS = 100, BATCH = 10;

export default async function handler(request, env) {
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed' });

  const gate = await requireAdmin(request, env);
  if (gate.error) return gate.error;
  const { sbUrl, sbKey } = gate;
  const sbH = { apikey: sbKey, Authorization: `Bearer ${sbKey}` };

  let body;
  try { body = await request.json(); } catch { return json(400, { error: 'Invalid request.' }); }

  const ids = Array.isArray(body.user_ids) ? body.user_ids : [];
  const clean = [...new Set(ids.map(String))].filter(id => /^[0-9a-f-]{36}$/i.test(id)).slice(0, MAX_IDS);
  if (!clean.length) return json(200, { ok: true, emails: {} });

  const emails = {};
  let lookupFailed = false;

  for (let i = 0; i < clean.length; i += BATCH) {
    const slice = clean.slice(i, i + BATCH);
    const results = await Promise.all(slice.map(async id => {
      try {
        const res = await fetch(`${sbUrl}/auth/v1/admin/users/${id}`, { headers: sbH });
        if (!res.ok) { if (res.status !== 404) lookupFailed = true; return [id, null]; }
        const data = await res.json();
        return [id, data?.email || null];
      } catch { lookupFailed = true; return [id, null]; }
    }));
    results.forEach(([id, email]) => { if (email) emails[id] = email; });
  }

  return json(200, { ok: true, emails, partial: lookupFailed });
}
