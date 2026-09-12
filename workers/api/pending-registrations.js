// GET/POST /api/pending-registrations — admin view of unconfirmed sign-ups.

import { requireAdmin, json } from '../lib/admin-auth.js';

const AUTH_PAGE_SIZE = 1000;
const DEFAULT_PAGE_SIZE = 30;

function parseCursor(value) {
  const match = String(value || '').match(/^(\d+):(\d+)$/);
  if (!match) return { page: 1, index: 0 };
  return { page: Math.max(1, Number(match[1])), index: Math.max(0, Number(match[2])) };
}

function isPendingEmail(user) {
  return !!user?.email && !user.email_confirmed_at && !user.confirmed_at;
}

function publicRegistration(user) {
  return { id: user.id, email: user.email, full_name: user.user_metadata?.full_name || '', requested_role: user.user_metadata?.role || 'parent', created_at: user.created_at, confirmation_sent_at: user.confirmation_sent_at || null };
}

export default async function handler(request, env) {
  if (!['GET', 'POST'].includes(request.method)) return json(405, { error: 'Method not allowed' });

  const gate = await requireAdmin(request, env);
  if (gate.error) return gate.error;
  const { sbUrl, sbKey } = gate;
  const sbH = { apikey: sbKey, Authorization: `Bearer ${sbKey}` };

  if (request.method === 'GET') {
    const url = new URL(request.url);
    const limit = Math.min(100, Math.max(1, Number(url.searchParams.get('limit')) || DEFAULT_PAGE_SIZE));
    const term = String(url.searchParams.get('search') || '').trim().toLowerCase();
    let { page, index } = parseCursor(url.searchParams.get('cursor'));
    const registrations = [];
    let hasMore = true;

    while (registrations.length < limit && hasMore) {
      const res = await fetch(`${sbUrl}/auth/v1/admin/users?page=${page}&per_page=${AUTH_PAGE_SIZE}`, { headers: sbH });
      if (!res.ok) return json(500, { error: 'Could not read pending registrations.' });
      const data = await res.json();
      const users = data?.users || [];
      while (index < users.length && registrations.length < limit) {
        const user = users[index++];
        if (!isPendingEmail(user)) continue;
        const candidate = `${user.email || ''} ${user.user_metadata?.full_name || ''}`.toLowerCase();
        if (!term || candidate.includes(term)) registrations.push(publicRegistration(user));
      }
      if (index >= users.length) {
        if (users.length < AUTH_PAGE_SIZE) hasMore = false;
        else { page += 1; index = 0; }
      }
    }
    return json(200, { ok: true, registrations, next_cursor: hasMore ? `${page}:${index}` : null });
  }

  let body;
  try { body = await request.json(); } catch { return json(400, { error: 'Invalid request.' }); }
  if (body.action !== 'activate' || !/^[0-9a-f-]{36}$/i.test(String(body.user_id || ''))) {
    return json(400, { error: 'Invalid activation request.' });
  }

  const currentRes = await fetch(`${sbUrl}/auth/v1/admin/users/${body.user_id}`, { headers: sbH });
  if (!currentRes.ok) return json(404, { error: 'Registration was not found.' });
  const current = await currentRes.json();
  if (!isPendingEmail(current)) return json(409, { error: 'This account is already activated.' });

  const updateRes = await fetch(`${sbUrl}/auth/v1/admin/users/${body.user_id}`, {
    method: 'PUT',
    headers: { ...sbH, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email_confirm: true }),
  });
  if (!updateRes.ok) return json(500, { error: 'Could not activate this account.' });
  console.log(`[pending-registrations] ${gate.caller.email} manually activated ${current.email}`);
  return json(200, { ok: true, email: current.email });
}
