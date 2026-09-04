// Netlify Function - Assignment Completion Notifier
// Called by the student's browser when they finish an assignment.
// Looks up the parent's email and sends a summary through the shared Gmail
// sender in ../lib/mailer.js - the same account GoTrue authenticates as.
//
// Required Netlify environment variables:
//   SUPABASE_SERVICE_ROLE_KEY  - service role key (never in frontend)
//   GMAIL_USER / GMAIL_APP_PASSWORD - see ../lib/mailer.js
//
// ⚠ This used to POST to api.resend.com. RESEND_API_KEY was never set on the
// Netlify site (measured 2026-09-04), so the guard below answered
// 'not_configured' and this function has never sent a single notification.
// The from-address is no longer a variable here: Gmail rewrites From to the
// authenticated account, so there is only one correct answer and mailer.js
// holds it.

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://xawvjwsiqhtxgpocdqgm.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const { sendMail, isConfigured, logFailure } = require('../lib/mailer');

function _he(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

async function sbGet(path) {
  const res = await fetch(`${SUPABASE_URL}${path}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  return res.ok ? res.json() : null;
}

const { resolveStudent } = require('../lib/student-auth');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 };

  // Silently skip when email is not configured - never crash the student's flow
  if (!isConfigured() || !SUPABASE_KEY) return { statusCode: 200, body: 'not_configured' };

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return { statusCode: 400 }; }

  const { assignmentLabel, score, total, pct } = body;

  // ⚠ This check used to be:
  //     if (!headerStudentId || headerStudentId !== studentId) return 403;
  // which compared a client-supplied HEADER against a client-supplied BODY
  // FIELD. Both are attacker-controlled, so setting them to the same value
  // passed — anyone could trigger email to any family's parent, with an
  // attacker-chosen assignment label and score.
  //
  // The student is now resolved FROM THE SESSION TOKEN and the body's own
  // studentId is ignored entirely. There is nothing left for a caller to
  // assert about who they are.
  const _auth = await resolveStudent(event.headers, { supabaseUrl: SUPABASE_URL, serviceKey: SUPABASE_KEY });
  if (!_auth.ok) return { statusCode: _auth.status };
  const studentId = _auth.studentId;

  // Fetch student
  const students = await sbGet(`/rest/v1/students?id=eq.${studentId}&select=display_name,family_id`);
  const student  = students?.[0];
  if (!student) return { statusCode: 200 };

  // Fetch family owner
  const families = await sbGet(`/rest/v1/families?id=eq.${student.family_id}&select=parent_id`);
  const family   = families?.[0];
  if (!family) return { statusCode: 200 };

  // Fetch parent email via Supabase Auth admin API
  const authUser   = await sbGet(`/auth/v1/admin/users/${family.parent_id}`);
  const parentEmail = authUser?.email;
  if (!parentEmail) return { statusCode: 200 };

  const safeLabel       = _he(String(assignmentLabel || 'an assignment'));
  const safeDisplayName = _he(student.display_name);
  const safePct         = Number(pct) || 0;
  const safeScore = Number(score) || 0;
  const safeTotal = Number(total) || 0;

  const gradeMsg  = safePct >= 80 ? '🌟 Excellent work!'
    : safePct >= 60 ? '👍 Good effort!'
    : safePct >= 40 ? '📚 Keep practising!'
    : '💪 Needs more practice';

  const barPct    = Math.min(100, Math.max(0, safePct));
  const barColor  = safePct >= 80 ? '#22c55e' : safePct >= 60 ? '#f59e0b' : '#ef4444';

  const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:sans-serif">
  <div style="max-width:480px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)">
    <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:24px 28px;color:#fff">
      <div style="font-size:22px;font-weight:bold">📊 Assignment Complete!</div>
      <div style="opacity:.85;margin-top:4px;font-size:14px">PSAC Exam Practice - Parent Notification</div>
    </div>
    <div style="padding:24px 28px">
      <p style="margin:0 0 16px;color:#374151;font-size:15px">
        <strong>${safeDisplayName}</strong> just finished <strong>${safeLabel}</strong>.
      </p>
      <div style="background:#f8fafc;border-radius:12px;padding:20px;text-align:center;margin-bottom:20px">
        <div style="font-size:48px;font-weight:800;color:#4f46e5;line-height:1">${safePct}%</div>
        <div style="color:#6b7280;font-size:14px;margin-top:4px">${safeScore} / ${safeTotal} correct</div>
        <div style="margin-top:8px;font-size:18px">${gradeMsg}</div>
        <div style="background:#e5e7eb;border-radius:99px;height:8px;margin-top:12px;overflow:hidden">
          <div style="height:100%;width:${barPct}%;background:${barColor};border-radius:99px;transition:width .4s"></div>
        </div>
      </div>
      <a href="https://psac-practice.netlify.app/"
        style="display:block;text-align:center;background:#4f46e5;color:#fff;text-decoration:none;padding:12px 24px;border-radius:10px;font-weight:600;font-size:15px">
        View Full Dashboard →
      </a>
      <p style="margin:16px 0 0;color:#9ca3af;font-size:12px;text-align:center">
        You received this because you are a parent on PSAC Exam Practice.<br>
        To unsubscribe, remove your email in account settings.
      </p>
    </div>
  </div>
</body></html>`;

  const res = await sendMail({
    to:      parentEmail,
    subject: `${safeDisplayName} completed: ${safeLabel} - ${safePct}%`,
    html,
  });

  // ⚠ Say WHY it failed. This used to return a bare 502 and drop the provider's
  // response, and the caller is fire-and-forget - so a send the server refused
  // outright looked exactly like a send that worked.
  if (!res.ok) logFailure('notify', res, parentEmail);
  return { statusCode: res.ok ? 200 : 502 };
};
