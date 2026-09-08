'use strict';
// Activity summary for the admin Teachers tab: what each teacher has actually
// done (classes, pupils, work set, results received, materials), when they
// last did anything, and when they last signed in.
//
// Why a function and not browser queries: the tables involved are owned by the
// teacher under RLS (owns_classroom / teacher_id = auth.uid()), an admin arm is
// not on all of them, and auth.users.last_sign_in_at - the single clearest
// "are they using this at all?" signal - is not readable from the browser at
// all. The service role reads them; requireAdmin decides who may ask.
//
// ⚠ Only for the ids asked for, only for an admin, capped - the same shape as
// admin-member-emails.js. Not a directory: it cannot list or search teachers,
// it only annotates ids the caller already has from public.profiles.

const { requireAdmin, json } = require('../lib/admin-auth');
const { fetchRows, summarise, WINDOW_DAYS } = require('../lib/teacher-activity');

const MAX_IDS = 30;
const BATCH   = 10;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });

  const gate = await requireAdmin(event);
  if (gate.error) return gate.error;
  const { sb } = gate;

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch (_) { return json(400, { error: 'Invalid request.' }); }

  const ids = [...new Set((Array.isArray(body.user_ids) ? body.user_ids : []).map(String))]
    .filter(id => /^[0-9a-f-]{36}$/i.test(id))
    .slice(0, MAX_IDS);
  if (!ids.length) return json(200, { ok: true, teachers: {}, partial: [] });

  // Both halves in parallel: the table reads and the auth lookups.
  const authP = (async () => {
    const auth = {};
    let failed = false;
    for (let i = 0; i < ids.length; i += BATCH) {
      const slice = ids.slice(i, i + BATCH);
      const got = await Promise.all(slice.map(async id => {
        try {
          const { data, error } = await sb.auth.admin.getUserById(id);
          if (error) { if (error.status !== 404 && error.code !== 'user_not_found') failed = true; return [id, null]; }
          const u = data && data.user;
          return [id, u ? { email: u.email || null, last_sign_in_at: u.last_sign_in_at || null } : null];
        } catch (_) { failed = true; return [id, null]; }
      }));
      got.forEach(([id, row]) => { auth[id] = row; });
    }
    return { auth, failed };
  })();

  const [rows, { auth, failed }] = await Promise.all([fetchRows(sb, ids), authP]);
  const partial = rows.partial.slice();
  if (failed) partial.push('sign_in');

  return json(200, {
    ok: true,
    window_days: WINDOW_DAYS,
    partial,
    teachers: summarise(ids, rows, auth, Date.now()),
  });
};
