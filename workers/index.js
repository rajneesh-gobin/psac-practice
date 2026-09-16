// Cloudflare Worker entry point.
// Routes /api/* to the appropriate handler; everything else falls through to static assets.

import questionsHandler          from './api/questions.js';
import checkAnswerHandler        from './api/check-answer.js';
import submitExamHandler         from './api/submit-exam.js';
import assignmentOpenHandler     from './api/assignment-open.js';
import assignmentCleanupHandler  from './api/assignment-cleanup.js';
import classroomMaterialsHandler from './api/classroom-materials.js';
import classroomPurgeHandler     from './api/classroom-purge.js';
import contactMessageHandler     from './api/contact-message.js';
import createUserHandler         from './api/create-user.js';
import guestDeviceHandler        from './api/guest-device.js';
import materialDoneHandler       from './api/material-done.js';
import materialsLibraryHandler   from './api/materials-library.js';
import notifyHandler             from './api/notify.js';
import parentPinSigninHandler    from './api/parent-pin-signin.js';
import paymentWebhookHandler     from './api/payment-webhook.js';
import pendingRegistrationsHandler from './api/pending-registrations.js';
import profileIconHandler        from './api/profile-icon.js';
import profileManifestHandler    from './api/profile-manifest.js';
import pupilNameHandler          from './api/pupil-name.js';
import pushRemindersHandler      from './api/push-reminders.js';
import pushSendHandler           from './api/push-send.js';
import pushSubscribeHandler      from './api/push-subscribe.js';
import teacherApprovedEmailHandler from './api/teacher-approved-email.js';
import weeklyDigestHandler       from './api/weekly-digest.js';
import adminAccountRecoveryHandler from './api/admin-account-recovery.js';
import adminDeleteAccountHandler   from './api/admin-delete-account.js';
import adminMemberEmailsHandler    from './api/admin-member-emails.js';
import adminTeacherActivityHandler from './api/admin-teacher-activity.js';
import adminBroadcastHandler       from './api/admin-broadcast.js';
import emailPrefsHandler           from './api/email-prefs.js';

import { scheduled as cleanupScheduled } from './api/assignment-cleanup.js';
import { scheduled as purgeScheduled    } from './api/classroom-purge.js';
import { scheduled as digestScheduled   } from './api/weekly-digest.js';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Student-Token',
  'Access-Control-Max-Age':       '86400',
};

// Security headers applied to every response (HTML, JS, assets).
// Previously in netlify.toml [[headers]] — Cloudflare ignores that file.
// CDN allowances removed from script-src/style-src: Tailwind and Supabase
// are now self-hosted in engine/tailwind-play.min.js and supabase-client.min.js.
const SECURITY_HEADERS = {
  'X-Frame-Options':           'DENY',
  'X-Content-Type-Options':    'nosniff',
  'Referrer-Policy':           'strict-origin-when-cross-origin',
  // ⚠ camera=(SELF), not camera=(). An empty allowlist denies the camera to
  //   this origin too, which would kill the QR scanner (openQRScanner() ->
  //   Html5Qrcode -> getUserMedia) with a permissions error no toast explains.
  //   It never showed because this header was not reaching any page. Microphone
  //   and geolocation stay fully denied — nothing in the app asks for either,
  //   and read-aloud is speech OUTPUT, which needs no permission.
  'Permissions-Policy':        'camera=(self), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy':
    "default-src 'self'; " +
    // ⚠ cdn.jsdelivr.net is here for ONE thing: the html5-qrcode SCANNER, loaded
    //   on demand by _loadScriptOnce() in app.js when a child opens the QR
    //   reader. Tailwind and Supabase were self-hosted to drop their CDN
    //   allowances and this one was missed — it never showed, because the CSP
    //   was not reaching any page. The QR ENCODER is already self-hosted
    //   (assets/vendor/qrcode.mjs); self-hosting the scanner too would let this
    //   line go, and that is the right end state.
    "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; " +
    "style-src 'self' 'unsafe-inline'; " +
    "connect-src 'self' https://*.supabase.co https://accounts.google.com; " +
    "img-src 'self' data: https:; " +
    // ⚠ youtube-NOCOOKIE, not youtube.com. Same player, but it sets no tracking
    //   cookie until the child actually presses play, and it is the narrower
    //   grant — youtube.com would also permit every other youtube.com frame.
    //   Needed for the inline player on /m/<CODE> and /a/<CODE>; without it the
    //   iframe is blocked SILENTLY, with nothing in the UI to explain it.
    "frame-src https://accounts.google.com https://www.youtube-nocookie.com; " +
    "frame-ancestors 'none'; " +
    "object-src 'none'",
};

function addSecurityHeaders(response) {
  const r = new Response(response.body, response);
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) r.headers.set(k, v);
  return r;
}

// The client (question_loader.js, app.js) calls /.netlify/functions/* URLs.
// We alias every route under both /api/* and /.netlify/functions/* so the
// existing client code works on Cloudflare without modification.
function makeRoutes(map) {
  const out = {};
  for (const [path, handler] of Object.entries(map)) {
    out[path] = handler;
    // e.g. /api/questions → /.netlify/functions/questions
    out['/.netlify/functions/' + path.replace('/api/', '')] = handler;
  }
  return out;
}

const ROUTES = makeRoutes({
  '/api/questions':               questionsHandler,
  '/api/check-answer':            checkAnswerHandler,
  '/api/submit-exam':             submitExamHandler,
  '/api/assignment-open':         assignmentOpenHandler,
  '/api/assignment-cleanup':      assignmentCleanupHandler,
  '/api/classroom-materials':     classroomMaterialsHandler,
  '/api/classroom-purge':         classroomPurgeHandler,
  '/api/contact-message':         contactMessageHandler,
  '/api/create-user':             createUserHandler,
  '/api/guest-device':            guestDeviceHandler,
  '/api/material-done':           materialDoneHandler,
  '/api/materials-library':       materialsLibraryHandler,
  '/api/notify':                  notifyHandler,
  '/api/parent-pin-signin':       parentPinSigninHandler,
  '/api/payment-webhook':         paymentWebhookHandler,
  '/api/pending-registrations':   pendingRegistrationsHandler,
  '/api/profile-icon':            profileIconHandler,
  '/api/profile-manifest':        profileManifestHandler,
  '/api/pupil-name':              pupilNameHandler,
  '/api/push-reminders':          pushRemindersHandler,
  '/api/push-send':               pushSendHandler,
  '/api/push-subscribe':          pushSubscribeHandler,
  '/api/teacher-approved-email':  teacherApprovedEmailHandler,
  '/api/weekly-digest':           weeklyDigestHandler,
  '/api/admin-account-recovery':  adminAccountRecoveryHandler,
  '/api/admin-delete-account':    adminDeleteAccountHandler,
  '/api/admin-member-emails':     adminMemberEmailsHandler,
  '/api/admin-teacher-activity':  adminTeacherActivityHandler,
  '/api/admin-broadcast':         adminBroadcastHandler,
  '/api/email-prefs':             emailPrefsHandler,
});

// path prefix → the standalone page that serves it
const SHARE_ROUTES = {
  '/a/': '/guest.html',
  '/m/': '/materials.html',
  '/v/': '/vote.html',
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS' &&
        (url.pathname.startsWith('/api/') || url.pathname.startsWith('/.netlify/functions/'))) {
      return new Response('', { status: 200, headers: CORS_HEADERS });
    }

    const handler = ROUTES[url.pathname];
    if (handler) return addSecurityHeaders(await handler(request, env, ctx));

    // ⚠ The three share-link REWRITES from netlify.toml. They were not ported
    //   with the functions, so /v/<CODE>, /m/<CODE> and /a/<CODE> answered 404
    //   on Cloudflare - every Ask-the-Crowd link, class hub link and guest
    //   homework link already in circulation was dead. Measured on production,
    //   not inferred.
    //   status 200 rewrite, NOT a redirect: the URL the child was sent on
    //   WhatsApp must stay in the address bar, because each page reads its own
    //   code out of location.pathname.
    const rewrite = SHARE_ROUTES[url.pathname.slice(0, 3)];
    if (rewrite && url.pathname.length > 3) {
      const asset = await env.ASSETS.fetch(new URL(rewrite, url.origin));
      const r = new Response(asset.body, asset);
      for (const [k, v] of Object.entries(SECURITY_HEADERS)) r.headers.set(k, v);
      r.headers.set('Cache-Control', 'no-store');
      return r;
    }

    if (url.pathname.startsWith('/api/')) {
      return addSecurityHeaders(new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      }));
    }

    // Static assets — add security headers and long-cache for question images / fonts
    const asset = await env.ASSETS.fetch(request);
    const r = new Response(asset.body, asset);
    for (const [k, v] of Object.entries(SECURITY_HEADERS)) r.headers.set(k, v);
    if (url.pathname.startsWith('/assets/questions/') || url.pathname.startsWith('/fonts/')) {
      r.headers.set('Cache-Control', 'public, max-age=2592000'); // 30 days
    }
    return r;
  },

  // Cloudflare Cron Triggers — add to wrangler.toml:
  //   [triggers]
  //   crons = ["17 2 * * *", "0 3 * * *", "0 9 * * SUN"]
  async scheduled(event, env, ctx) {
    const cron = event.cron;
    if (cron === '17 2 * * *') await cleanupScheduled(event, env, ctx);
    else if (cron === '0 3 * * *') await purgeScheduled(event, env, ctx);
    // ⚠ Must match wrangler.toml EXACTLY - dispatch is a string compare, and
    //   Cloudflare will not accept '0 9 * * 0' for Sunday (it wants SUN or 7).
    else if (cron === '0 9 * * SUN') await digestScheduled(event, env, ctx);
  },
};
