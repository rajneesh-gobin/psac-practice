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

import { scheduled as cleanupScheduled } from './api/assignment-cleanup.js';
import { scheduled as purgeScheduled    } from './api/classroom-purge.js';
import { scheduled as digestScheduled   } from './api/weekly-digest.js';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Student-Token',
  'Access-Control-Max-Age':       '86400',
};

const ROUTES = {
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
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS' && url.pathname.startsWith('/api/')) {
      return new Response('', { status: 200, headers: CORS_HEADERS });
    }

    const handler = ROUTES[url.pathname];
    if (handler) return handler(request, env, ctx);

    if (url.pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return env.ASSETS.fetch(request);
  },

  // Cloudflare Cron Triggers — add to wrangler.toml:
  //   [triggers]
  //   crons = ["17 2 * * *", "0 3 * * *", "0 9 * * 0"]
  async scheduled(event, env, ctx) {
    const cron = event.cron;
    if (cron === '17 2 * * *') await cleanupScheduled(event, env, ctx);
    else if (cron === '0 3 * * *') await purgeScheduled(event, env, ctx);
    else if (cron === '0 9 * * 0') await digestScheduled(event, env, ctx);
  },
};
