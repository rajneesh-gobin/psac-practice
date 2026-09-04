// ══════════════════════════════════════════════
//  The one place a Netlify function sends mail from.
//
//  notify.js and weekly-digest.js each POSTed to api.resend.com with their own
//  copy of the from-address and their own error handling.
//
//  ⚠ MEASURED 2026-09-04: RESEND_API_KEY was never set on the Netlify site
//  at all — it held only SUPABASE_URL, SUPABASE_ANON_KEY and
//  SUPABASE_SERVICE_ROLE_KEY. Both functions therefore hit their own
//  `not_configured` guard and NEVER ATTEMPTED A SEND in production, so no
//  parent has ever received an assignment notification or a weekly digest.
//  The separate 403 finding (unverified `from` domain) is real but was
//  measured against the Resend API directly; it is not what production hit.
//
//  They now share this module and go out through the same Gmail account GoTrue
//  authenticates as, so there is exactly ONE sender to configure, one place a
//  credential can be wrong, and one set of words for a failure.
//
//  Required Netlify environment variables:
//    GMAIL_USER          psacpractice@gmail.com
//    GMAIL_APP_PASSWORD  the 16-character Google App Password (NOT the account
//                        password — Google has refused those over SMTP since
//                        2022 and answers 535-5.7.8)
//    MAIL_FROM_NAME      optional display name, default "PSAC Exam Practice"
// ══════════════════════════════════════════════
'use strict';

const nodemailer = require('nodemailer');

const USER = process.env.GMAIL_USER;
const PASS = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '');
const NAME = process.env.MAIL_FROM_NAME || 'PSAC Exam Practice';

// ⚠ The From address must BE the authenticated account. Gmail rewrites From to
// the account it authenticated, so a different address is either replaced
// silently or refused — which is how you end up debugging a "delivered" email
// nobody sent. Not configurable on purpose.
const FROM = USER ? `${NAME} <${USER}>` : null;

let _transport = null;
function _t() {
  if (_transport) return _transport;
  _transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: USER, pass: PASS },
    // A Lambda is killed when the handler returns, so a pooled connection buys
    // nothing and a hung socket would hold the invocation open to its timeout.
    pool: false,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
  return _transport;
}

function isConfigured() { return !!(USER && PASS); }

// Returns {ok, id?, error?} and NEVER throws — every caller here is either
// fire-and-forget from a child's browser or a cron fanning out over families,
// and one bad address must not take down the rest of the run.
//
// ⚠ Report the reason. The Resend version returned a bare 502 and dropped the
// response body, so a refused send and a delivered one looked identical in the
// logs for months.
async function sendMail({ to, subject, html, text }) {
  if (!isConfigured()) return { ok: false, error: 'not_configured' };
  if (!to) return { ok: false, error: 'no_recipient' };
  try {
    const info = await _t().sendMail({ from: FROM, to, subject, html, text });
    return { ok: true, id: info.messageId, accepted: info.accepted || [] };
  } catch (e) {
    // 535 = bad credential (almost always an account password where an App
    // Password belongs, or one that has been revoked). 550/552 = the recipient
    // or the quota. Worth separating: only the first is a deploy-time mistake.
    const msg = String(e && e.message || e);
    const code = /\b(5\d\d)[ -]/.exec(msg)?.[1] || e?.responseCode || '';
    return { ok: false, error: msg.slice(0, 300), code: String(code) };
  }
}

// Used by both callers so the log line reads the same wherever it comes from.
function logFailure(tag, res, to) {
  const hint = res.code === '535'
    ? ' - GMAIL_APP_PASSWORD is wrong or revoked; it must be a 16-character Google App Password, not the account password.'
    : res.error === 'not_configured'
      ? ' - set GMAIL_USER and GMAIL_APP_PASSWORD in the Netlify environment.'
      : '';
  console.error(`[${tag}] send failed:`, res.code || '', res.error, '| to =', to, hint);
}

module.exports = { sendMail, isConfigured, logFailure, FROM };
