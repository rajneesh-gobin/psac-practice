'use strict';
// Tells a teacher their application was approved - the only email in the
// teacher-approval flow. The admin panel calls it after a MANUAL approval
// (admin_set_teacher_status() / the Teachers tab) has already succeeded.
//
// ⚠ The SERVER decides whether and what. The caller sends a user id and nothing
//   else, the words are fixed here, and nothing goes out unless profiles says
//   that account is an approved teacher right now - so an admin session cannot
//   use this to mail arbitrary text, or to mail anyone who is not a teacher.
// ⚠ Not for auto-approval. With "Approve teachers automatically" on,
//   request_teacher_access() approves the teacher during the sign-in that
//   follows their verification click, so they are already looking at their
//   teacher tools and an email would only repeat it.
// ⚠ Each send spends one message from the shared ~500/day Gmail quota that
//   sign-ups and password resets also draw on.

const { requireAdmin, json } = require('../lib/admin-auth');
const { sendMail, logFailure } = require('../lib/mailer');

const SITE_URL = (process.env.URL || 'https://nouklass.com').replace(/\/+$/, '');

function _he(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { ok: false, error: 'Method not allowed' });

  const gate = await requireAdmin(event);
  if (gate.error) return gate.error;
  const { sb } = gate;

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch (_) { return json(400, { ok: false, error: 'Invalid request.' }); }
  const userId = String(body.user_id || '');
  if (!/^[0-9a-f-]{36}$/i.test(userId)) return json(400, { ok: false, error: 'Invalid request.' });

  const { data: profile, error: pErr } = await sb.from('profiles')
    .select('full_name, role, teacher_status').eq('id', userId).maybeSingle();
  if (pErr) return json(502, { ok: false, error: 'Could not read that account.' });
  if (!profile || profile.role !== 'teacher' || profile.teacher_status !== 'approved') {
    return json(409, { ok: false, error: 'not_approved' });
  }

  let email = null;
  try {
    const { data, error } = await sb.auth.admin.getUserById(userId);
    if (!error) email = data?.user?.email || null;
  } catch (_) { /* reported as no_email below */ }
  if (!email) return json(404, { ok: false, error: 'no_email' });

  const first = String(profile.full_name || '').trim().split(/\s+/)[0] || 'there';
  const subject = 'Your Nou Klass teacher account is approved';
  const text = `Hello ${first},\n\n`
    + 'Your teacher account on Nou Klass has been approved.\n\n'
    + `Sign in at ${SITE_URL}/ - your teacher tools are ready: create a classroom, `
    + 'share a link with your pupils and set them work.\n\n'
    + 'Nou Klass';
  const html = `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:520px;margin:24px auto;background:#ffffff;border-radius:16px;overflow:hidden">
    <div style="background:#4f46e5;color:#ffffff;padding:20px 24px">
      <p style="margin:0;font-size:20px;font-weight:bold">&#x1F469;&#x200D;&#x1F3EB; You're approved</p>
    </div>
    <div style="padding:24px;color:#1f2937;font-size:15px;line-height:1.5">
      <p style="margin:0 0 12px">Hello ${_he(first)},</p>
      <p style="margin:0 0 12px">Your teacher account on <b>Nou Klass</b> has been approved.</p>
      <p style="margin:0 0 20px">Sign in and your teacher tools are ready: create a classroom,
        share a link with your pupils and set them work.</p>
      <a href="${_he(SITE_URL)}/" style="display:inline-block;background:#4f46e5;color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 20px;border-radius:10px">Sign in &rarr;</a>
      <p style="margin:24px 0 0;color:#9ca3af;font-size:12px">
        You received this because you applied for a teacher account on Nou Klass.
      </p>
    </div>
  </div>
</body></html>`;

  const res = await sendMail({ to: email, subject, html, text });
  if (!res.ok) {
    logFailure('teacher-approved-email', res, email);
    return json(502, { ok: false, error: res.error === 'not_configured' ? 'not_configured' : 'send_failed' });
  }
  return json(200, { ok: true, sent: true });
};
