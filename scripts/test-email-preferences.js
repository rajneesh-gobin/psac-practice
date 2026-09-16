'use strict';
// The rules that decide whether a person receives an email.
//
// ⚠ Every failure here is silent and one-directional. A preference misread as
//   "on" spends someone's inbox against their explicit wish, which is the kind
//   of mistake that gets a sending domain blocked; misread as "off", a parent
//   stops hearing about their child and nothing anywhere reports it. Neither
//   shows up in a log.
//
// ⚠ There are TWO copies of this logic and they must agree: workers/lib/mailer.js
//   decides what is actually SENT, and `_emailPrefs()` in engine/app.js decides
//   what the parent is SHOWN. A parent reading one answer and receiving the
//   other is worse than either being wrong on its own, so the last block checks
//   the browser copy against the server copy on the same inputs.
//
// Run: node scripts/test-email-preferences.js
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
let checks = 0, fails = 0;

function ok(label, cond) {
  checks++;
  if (!cond) { fails++; console.log('  FAIL  ' + label); }
}
function eq(label, got, want) {
  ok(`${label} — got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`, got === want);
}

(async () => {
  const mailerPath = path.join(ROOT, 'workers/lib/mailer.js');
  const M = await import('file://' + mailerPath.split(path.sep).join('/'));
  const { emailPrefs, wantsEmail, digestDue, EMAIL_DEFAULTS, DIGEST_EVERY_DAYS, escapeHtml } = M;

  // ── Defaults ────────────────────────────────────────────────────────────
  // An account that has never touched a setting must get the product's default,
  // not "off" — a new parent who hears nothing assumes the app is broken.
  eq('no preferences at all → digest weekly', emailPrefs(undefined).digest, 'weekly');
  eq('no preferences at all → enabled', emailPrefs(undefined).enabled, true);
  eq('empty object → weekly', emailPrefs({}).digest, 'weekly');
  eq('null → weekly', emailPrefs(null).digest, 'weekly');
  eq('junk (a string) → weekly', emailPrefs('nonsense').digest, 'weekly');
  eq('junk email sub-object → weekly', emailPrefs({ email: 'nope' }).digest, 'weekly');

  // ── The legacy boolean ──────────────────────────────────────────────────
  // `weekly_digest` predates the email object and is still what older deployed
  // clients write. An explicit false there is a parent who has ALREADY opted
  // out, and the new shape must not quietly re-subscribe them.
  eq('legacy weekly_digest:false → off', emailPrefs({ weekly_digest: false }).digest, 'off');
  eq('legacy weekly_digest:true → weekly', emailPrefs({ weekly_digest: true }).digest, 'weekly');
  eq('explicit new value beats legacy false',
    emailPrefs({ weekly_digest: false, email: { digest: 'monthly' } }).digest, 'monthly');
  eq('legacy false + explicit weekly wins for the new one',
    emailPrefs({ weekly_digest: false, email: { digest: 'weekly' } }).digest, 'weekly');

  // ── An unknown frequency must fail CLOSED ───────────────────────────────
  // A typo or a value from a future version must not be treated as "send".
  eq('unknown frequency → off', emailPrefs({ email: { digest: 'hourly' } }).digest, 'off');
  eq('null frequency → off', emailPrefs({ email: { digest: null } }).digest, 'off');
  eq('numeric frequency → off', emailPrefs({ email: { digest: 7 } }).digest, 'off');

  // ── The master switch beats everything ──────────────────────────────────
  eq('enabled:false kills the digest', wantsEmail({ email: { enabled: false, digest: 'weekly' } }, 'digest'), false);
  eq('enabled:false kills announcements', wantsEmail({ email: { enabled: false, announcements: true } }, 'announcement'), false);
  eq('enabled:false kills homework', wantsEmail({ email: { enabled: false, homework: true } }, 'homework'), false);
  eq('enabled:false kills an unknown kind', wantsEmail({ email: { enabled: false } }, 'anything'), false);
  eq('enabled defaults on', wantsEmail({}, 'announcement'), true);

  // ── Per-kind flags ──────────────────────────────────────────────────────
  eq('digest off → no digest', wantsEmail({ email: { digest: 'off' } }, 'digest'), false);
  eq('digest monthly → yes for the digest kind', wantsEmail({ email: { digest: 'monthly' } }, 'digest'), true);
  eq('announcements:false', wantsEmail({ email: { announcements: false } }, 'announcement'), false);
  eq('homework:false', wantsEmail({ email: { homework: false } }, 'homework'), false);
  eq('announcements:false does NOT stop homework', wantsEmail({ email: { announcements: false } }, 'homework'), true);
  eq('homework:false does NOT stop the digest', wantsEmail({ email: { homework: false } }, 'digest'), true);

  // ── digestDue: frequency is enforced by LAST SENT, not by the cron ──────
  // The cron fires weekly. Fortnightly and monthly only exist because this
  // function says no on the weeks in between.
  const now = new Date('2026-09-16T09:00:00Z');
  const daysAgo = n => new Date(now.getTime() - n * 86400000).toISOString();

  eq('never sent → due', digestDue({ email: { digest: 'weekly' } }, null, now), true);
  eq('unparseable last-sent → due', digestDue({ email: { digest: 'weekly' } }, 'not a date', now), true);
  eq('weekly, 7 days ago → due', digestDue({ email: { digest: 'weekly' } }, daysAgo(7), now), true);
  eq('weekly, 2 days ago → not due', digestDue({ email: { digest: 'weekly' } }, daysAgo(2), now), false);
  eq('fortnightly, 7 days ago → NOT due', digestDue({ email: { digest: 'fortnightly' } }, daysAgo(7), now), false);
  eq('fortnightly, 14 days ago → due', digestDue({ email: { digest: 'fortnightly' } }, daysAgo(14), now), true);
  eq('monthly, 14 days ago → NOT due', digestDue({ email: { digest: 'monthly' } }, daysAgo(14), now), false);
  eq('monthly, 30 days ago → due', digestDue({ email: { digest: 'monthly' } }, daysAgo(30), now), true);
  eq('off is never due', digestDue({ email: { digest: 'off' } }, null, now), false);
  eq('master switch off is never due', digestDue({ email: { enabled: false } }, null, now), false);

  // ⚠ The one-day slack. A cron at 09:00 that ran three minutes late last time
  //   must not push a fortnightly parent out by a whole extra fortnight — the
  //   failure mode is a parent silently dropping to monthly, then to never.
  eq('weekly, 6 days 23h ago → still due (slack)',
    digestDue({ email: { digest: 'weekly' } }, new Date(now.getTime() - (7 * 86400000 - 3600000)).toISOString(), now), true);
  eq('fortnightly, 13 days ago → due (slack)',
    digestDue({ email: { digest: 'fortnightly' } }, daysAgo(13), now), true);
  eq('fortnightly, 11 days ago → not due', digestDue({ email: { digest: 'fortnightly' } }, daysAgo(11), now), false);

  // ── Escaping ────────────────────────────────────────────────────────────
  // Admin broadcast bodies and child display names both reach a mail template.
  eq('escapes a tag', escapeHtml('<script>x</script>'), '&lt;script&gt;x&lt;/script&gt;');
  eq('escapes quotes', escapeHtml('a"b\'c'), 'a&quot;b&#39;c');
  eq('escapes ampersand first', escapeHtml('&lt;'), '&amp;lt;');
  eq('null is empty, not "null"', escapeHtml(null), '');

  // ── The browser copy must agree with the server copy ────────────────────
  // engine/app.js `_emailPrefs()` reads `_parentPrefs`, so it is lifted out and
  // run against the same inputs. If these ever diverge, the Settings screen and
  // the mail server are telling a parent two different things.
  const appSrc = fs.readFileSync(path.join(ROOT, 'engine/app.js'), 'utf8');
  const start = appSrc.indexOf('const _EMAIL_PREF_DEFAULTS');
  const end = appSrc.indexOf('async function _saveEmailPrefs');
  ok('found _emailPrefs() in engine/app.js', start > 0 && end > start);
  if (start > 0 && end > start) {
    const sandbox = { _parentPrefs: {}, Object };
    vm.createContext(sandbox);
    vm.runInContext(appSrc.slice(start, end), sandbox);

    const cases = [
      undefined, {}, null,
      { weekly_digest: false },
      { weekly_digest: true },
      { weekly_digest: false, email: { digest: 'monthly' } },
      { email: { digest: 'hourly' } },
      { email: { digest: 'fortnightly' } },
      { email: { enabled: false } },
      { email: { announcements: false, homework: false } },
    ];
    for (const input of cases) {
      sandbox._parentPrefs = (input && typeof input === 'object') ? input : {};
      const client = sandbox._emailPrefs();
      const server = emailPrefs(input);
      for (const key of ['enabled', 'digest', 'announcements', 'homework']) {
        eq(`client/server agree on ${key} for ${JSON.stringify(input)}`, client[key], server[key]);
      }
    }
    // ⚠ Read back by EVALUATING the name, not off the sandbox object. A top-level
    //   `const` lives in the context's declarative record and never becomes a
    //   property of the global - the same reason admin.js and the teacher modules
    //   must be checked by bare identifier rather than `window.X`.
    const clientDefaults = vm.runInContext('_EMAIL_PREF_DEFAULTS', sandbox);
    eq('both use the same default frequency', clientDefaults.digest, EMAIL_DEFAULTS.digest);
    eq('both default to enabled', clientDefaults.enabled, EMAIL_DEFAULTS.enabled);
  }

  // ── The wiring the feature depends on ───────────────────────────────────
  // A helper nobody calls tests green forever.
  const digestSrc = fs.readFileSync(path.join(ROOT, 'workers/api/weekly-digest.js'), 'utf8');
  ok('weekly-digest uses digestDue()', /digestDue\(/.test(digestSrc));
  // ⚠ Anchor on the CALL, not the name: markDigestSent is declared near the top
  //   of the file, so a bare indexOf('markDigestSent') finds the definition and
  //   the assertion passes or fails on where the helper happens to sit.
  ok('weekly-digest records last_digest_at only after a send',
    digestSrc.indexOf('await markDigestSent(') > digestSrc.indexOf('if (_res.ok) {'));
  ok('weekly-digest POST is gated', /requireAdmin|CRON_SECRET/.test(digestSrc));

  const notifySrc = fs.readFileSync(path.join(ROOT, 'workers/api/notify.js'), 'utf8');
  ok('notify honours the homework preference', /wantsEmail\([^)]*'homework'\)/.test(notifySrc));
  ok('notify reads the preference server-side, not from the request body',
    notifySrc.indexOf('rest/v1/profiles?id=eq.${family.parent_id}&select=preferences') > 0);

  const bcSrc = fs.readFileSync(path.join(ROOT, 'workers/api/admin-broadcast.js'), 'utf8');
  ok('broadcast sends Bcc, never To', /bcc: batch\.map/.test(bcSrc));
  ok('broadcast honours announcements unless essential', /!essential && !wantsEmail/.test(bcSrc));
  ok('broadcast escapes the body', /escapeHtml\(block\)/.test(bcSrc));

  ok('every documented frequency has a day count',
    ['weekly', 'fortnightly', 'monthly'].every(k => typeof DIGEST_EVERY_DAYS[k] === 'number'));

  console.log(`${checks - fails}/${checks} email-preference checks passed`);
  process.exit(fails ? 1 : 0);
})();
