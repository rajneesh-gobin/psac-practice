// POST /api/notify — assignment completion notifier. Sends email to parent via Mailchannels.

import { resolveStudent } from '../lib/student-auth.js';

const SB_URL_DEFAULT = 'https://xawvjwsiqhtxgpocdqgm.supabase.co';

function _he(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

async function sendEmail({ to, subject, html }) {
  const r = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: 'noreply@psac-practice.com', name: 'Nou Klass' },
      subject,
      content: [{ type: 'text/html', value: html }],
    }),
  });
  return { ok: r.ok, status: r.status };
}

export default async function handler(request, env) {
  if (request.method !== 'POST') return new Response('', { status: 405 });

  const sbUrl = env.SUPABASE_URL || SB_URL_DEFAULT;
  const sbKey = env.SUPABASE_SERVICE_ROLE_KEY;
  const mailEnabled = !!env.MAILCHANNELS_ENABLED;

  if (!mailEnabled || !sbKey) return new Response('not_configured', { status: 200 });

  let body;
  try { body = await request.json(); } catch { return new Response('', { status: 400 }); }

  const { assignmentLabel, score, total, pct } = body;

  const _auth = await resolveStudent(request.headers, { supabaseUrl: sbUrl, serviceKey: sbKey });
  if (!_auth.ok) return new Response('', { status: _auth.status });
  const studentId = _auth.studentId;

  const sbH = { apikey: sbKey, Authorization: `Bearer ${sbKey}` };

  const studentsRes = await fetch(`${sbUrl}/rest/v1/students?id=eq.${studentId}&select=display_name,family_id`, { headers: sbH });
  const students = studentsRes.ok ? await studentsRes.json() : [];
  const student = students[0];
  if (!student) return new Response('', { status: 200 });

  const familiesRes = await fetch(`${sbUrl}/rest/v1/families?id=eq.${student.family_id}&select=parent_id`, { headers: sbH });
  const families = familiesRes.ok ? await familiesRes.json() : [];
  const family = families[0];
  if (!family) return new Response('', { status: 200 });

  const authUserRes = await fetch(`${sbUrl}/auth/v1/admin/users/${family.parent_id}`, { headers: sbH });
  const authUser = authUserRes.ok ? await authUserRes.json() : null;
  const parentEmail = authUser?.email;
  if (!parentEmail) return new Response('', { status: 200 });

  const safeLabel = _he(String(assignmentLabel || 'an assignment'));
  const safeDisplayName = _he(student.display_name);
  const safePct   = Number(pct)   || 0;
  const safeScore = Number(score) || 0;
  const safeTotal = Number(total) || 0;

  const gradeMsg = safePct >= 80 ? '🌟 Excellent work!' : safePct >= 60 ? '👍 Good effort!' : safePct >= 40 ? '📚 Keep practising!' : '💪 Needs more practice';
  const barPct   = Math.min(100, Math.max(0, safePct));
  const barColor = safePct >= 80 ? '#22c55e' : safePct >= 60 ? '#f59e0b' : '#ef4444';

  const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:sans-serif">
  <div style="max-width:480px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)">
    <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:24px 28px;color:#fff">
      <div style="font-size:22px;font-weight:bold">📊 Assignment Complete!</div>
      <div style="opacity:.85;margin-top:4px;font-size:14px">Nou Klass - Parent Notification</div>
    </div>
    <div style="padding:24px 28px">
      <p style="margin:0 0 16px;color:#374151;font-size:15px"><strong>${safeDisplayName}</strong> just finished <strong>${safeLabel}</strong>.</p>
      <div style="background:#f8fafc;border-radius:12px;padding:20px;text-align:center;margin-bottom:20px">
        <div style="font-size:48px;font-weight:800;color:#4f46e5;line-height:1">${safePct}%</div>
        <div style="color:#6b7280;font-size:14px;margin-top:4px">${safeScore} / ${safeTotal} correct</div>
        <div style="margin-top:8px;font-size:18px">${gradeMsg}</div>
        <div style="background:#e5e7eb;border-radius:99px;height:8px;margin-top:12px;overflow:hidden">
          <div style="height:100%;width:${barPct}%;background:${barColor};border-radius:99px"></div>
        </div>
      </div>
      <a href="https://nouklass.com/" style="display:block;text-align:center;background:#4f46e5;color:#fff;text-decoration:none;padding:12px 24px;border-radius:10px;font-weight:600;font-size:15px">View Full Dashboard →</a>
    </div>
  </div>
</body></html>`;

  const res = await sendEmail({ to: parentEmail, subject: `${safeDisplayName} completed: ${safeLabel} - ${safePct}%`, html });
  if (!res.ok) console.error('[notify] send failed', res.status, parentEmail);
  return new Response('', { status: res.ok ? 200 : 502 });
}
