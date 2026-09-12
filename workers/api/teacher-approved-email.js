// POST /api/teacher-approved-email — notifies a teacher their account was approved.

import { requireAdmin, json } from '../lib/admin-auth.js';

async function sendEmail({ to, subject, html, text }) {
  const r = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: 'noreply@psac-practice.com', name: 'PSAC Practice' },
      subject,
      content: [
        ...(html ? [{ type: 'text/html', value: html }] : []),
        ...(text ? [{ type: 'text/plain', value: text }] : []),
      ],
    }),
  });
  return { ok: r.ok, error: r.ok ? null : 'send_failed' };
}

function _he(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

export default async function handler(request, env) {
  if (request.method !== 'POST') return json(405, { ok: false, error: 'Method not allowed' });

  const gate = await requireAdmin(request, env);
  if (gate.error) return gate.error;
  const { sbUrl, sbKey } = gate;
  const sbH = { apikey: sbKey, Authorization: `Bearer ${sbKey}` };

  if (!env.MAILCHANNELS_ENABLED) return json(503, { ok: false, error: 'not_configured' });

  let body;
  try { body = await request.json(); } catch { return json(400, { ok: false, error: 'Invalid request.' }); }
  const userId = String(body.user_id || '');
  if (!/^[0-9a-f-]{36}$/i.test(userId)) return json(400, { ok: false, error: 'Invalid request.' });

  const profileRes = await fetch(`${sbUrl}/rest/v1/profiles?id=eq.${userId}&select=full_name,role,teacher_status&limit=1`, { headers: sbH });
  const profiles = profileRes.ok ? await profileRes.json() : [];
  const profile = profiles[0];
  if (!profile || profile.role !== 'teacher' || profile.teacher_status !== 'approved') {
    return json(409, { ok: false, error: 'not_approved' });
  }

  const userRes = await fetch(`${sbUrl}/auth/v1/admin/users/${userId}`, { headers: sbH });
  if (!userRes.ok) return json(404, { ok: false, error: 'no_email' });
  const email = (await userRes.json())?.email || null;
  if (!email) return json(404, { ok: false, error: 'no_email' });

  const siteUrl = (env.SITE_URL || 'https://nouklass.workers.dev').replace(/\/+$/, '');
  const first = String(profile.full_name || '').trim().split(/\s+/)[0] || 'there';
  const subject = 'Your PSAC Exam Practice teacher account is approved';
  const text = `Hello ${first},\n\nYour teacher account on PSAC Exam Practice has been approved.\n\nSign in at ${siteUrl}/ - your teacher tools are ready.\n\nPSAC Exam Practice`;
  const html = `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:520px;margin:24px auto;background:#ffffff;border-radius:16px;overflow:hidden">
    <div style="background:#4f46e5;color:#ffffff;padding:20px 24px">
      <p style="margin:0;font-size:20px;font-weight:bold">&#x1F469;&#x200D;&#x1F3EB; You're approved</p>
    </div>
    <div style="padding:24px;color:#1f2937;font-size:15px;line-height:1.5">
      <p style="margin:0 0 12px">Hello ${_he(first)},</p>
      <p style="margin:0 0 12px">Your teacher account on <b>PSAC Exam Practice</b> has been approved.</p>
      <p style="margin:0 0 20px">Sign in and your teacher tools are ready: create a classroom, share a link with your pupils and set them work.</p>
      <a href="${_he(siteUrl)}/" style="display:inline-block;background:#4f46e5;color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 20px;border-radius:10px">Sign in &rarr;</a>
    </div>
  </div>
</body></html>`;

  const res = await sendEmail({ to: email, subject, html, text });
  if (!res.ok) return json(502, { ok: false, error: 'send_failed' });
  return json(200, { ok: true, sent: true });
}
