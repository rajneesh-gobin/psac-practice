'use strict';
// Resolves account emails for the admin members list.
//
// public.profiles has NO email column - the address lives in auth.users, which
// the browser cannot read and should not be able to. So an administrator had no
// way to tell two accounts apart except by a display name they typed themselves,
// which is exactly the problem when the thing you are trying to do is delete the
// right test account.
//
// ⚠ Emails are returned ONLY for the ids asked for, and only to an admin. This
// is not a directory endpoint: it does not list, search or page, so it cannot be
// used to enumerate the user base. The caller already has the ids - they come
// from profiles, which admins can read - and this adds nothing but the address.

const { requireAdmin, json } = require('../lib/admin-auth');

// One admin API call per id, so the cap is what stops a single request turning
// into hundreds of round trips. The members list pages 25 at a time.
const MAX_IDS = 100;
const BATCH   = 10;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });

  const gate = await requireAdmin(event);
  if (gate.error) return gate.error;
  const { sb } = gate;

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch (_) { return json(400, { error: 'Invalid request.' }); }

  const ids = Array.isArray(body.user_ids) ? body.user_ids : [];
  const clean = [...new Set(ids.map(String))]
    .filter(id => /^[0-9a-f-]{36}$/i.test(id))
    .slice(0, MAX_IDS);
  if (!clean.length) return json(200, { ok: true, emails: {} });

  const emails = {};
  for (let i = 0; i < clean.length; i += BATCH) {
    const slice = clean.slice(i, i + BATCH);
    const results = await Promise.all(slice.map(async id => {
      try {
        const { data, error } = await sb.auth.admin.getUserById(id);
        // A missing user is a normal answer here, not a failure: profiles can
        // outlive auth.users if one was ever removed directly.
        if (error || !data?.user) return [id, null];
        return [id, data.user.email || null];
      } catch (_) { return [id, null]; }
    }));
    results.forEach(([id, email]) => { if (email) emails[id] = email; });
  }

  return json(200, { ok: true, emails });
};
