'use strict';
// Security headers on STATIC pages.
//
// ⚠⚠ THEY WERE NOT BEING APPLIED AT ALL. workers/index.js wraps every asset
//    response in SECURITY_HEADERS, and that code is unreachable: Cloudflare
//    serves static assets from its own layer without invoking the Worker.
//    Measured on production 2026-09-16 — /api/questions carried the full CSP,
//    HSTS, X-Frame-Options and nosniff; `/`, `/style.css` and `/guest.js`
//    carried NONE. Every HTML page ran with no clickjacking protection and no
//    script-source restriction, while the code said otherwise.
//
// ⚠ `_headers` fixes it for free. `run_worker_first = true` would also work and
//   would turn every image, font and question bundle into a Worker invocation
//   against the 100k/day budget.
//
// ⚠ THE FILE IS DERIVED FROM workers/index.js, NEVER RETYPED. Two hand-kept
//   copies of a CSP drift, and the drift is invisible until something is
//   blocked on one path and allowed on the other.
//
// Run: node scripts/test-security-headers.js   (run prepare-deploy.js first)
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
let checks = 0, fails = 0;
const ok = (label, cond) => { checks++; if (!cond) { fails++; console.log('  FAIL  ' + label); } };

const worker = fs.readFileSync(path.join(ROOT, 'workers/index.js'), 'utf8');
const prep   = fs.readFileSync(path.join(ROOT, 'scripts/prepare-deploy.js'), 'utf8');
const hdrPath = path.join(ROOT, '.deploy/_headers');

ok('prepare-deploy.js generates _headers', /_headers written/.test(prep));
ok('it DERIVES the policy from the worker, not a second copy',
  /SECURITY_HEADERS from workers\/index\.js|const SECURITY_HEADERS = \\\{/.test(prep)
  || /workers\/index\.js'\), 'utf8'\)/.test(prep));
// ⚠ A parse failure must fail the BUILD. Shipping a publish directory with no
//   headers, silently, is exactly the state this test exists to end.
ok('a failed parse fails the build rather than shipping bare',
  /fail\('could not read SECURITY_HEADERS/.test(prep));

if (!fs.existsSync(hdrPath)) {
  ok('.deploy/_headers exists (run scripts/prepare-deploy.js first)', false);
} else {
  const h = fs.readFileSync(hdrPath, 'utf8');

  ok('applies to every path', /^\/\*$/m.test(h));
  for (const name of ['X-Frame-Options', 'X-Content-Type-Options', 'Referrer-Policy',
                      'Permissions-Policy', 'Strict-Transport-Security', 'Content-Security-Policy']) {
    ok('carries ' + name, new RegExp('^\\s+' + name + ':', 'm').test(h));
  }

  // ── The two allowances that exist for a REASON, each easy to remove by tidy ──
  // ⚠ The QR SCANNER is loaded at runtime from jsdelivr by _loadScriptOnce().
  //   Tailwind and Supabase were self-hosted to drop their CDN allowances and
  //   this one was missed; removing it breaks camera-based friend-code scanning.
  ok('script-src still allows the QR scanner CDN', /script-src[^;]*https:\/\/cdn\.jsdelivr\.net/.test(h));
  // ⚠ camera=(SELF). An empty allowlist denies the camera to this origin too,
  //   which kills the QR scanner with a permissions error nothing explains.
  ok('camera is allowed to this origin', /Permissions-Policy:[^\n]*camera=\(self\)/.test(h));
  ok('microphone and geolocation stay denied',
    /microphone=\(\)/.test(h) && /geolocation=\(\)/.test(h));
  // The inline video player.
  ok('frame-src allows the nocookie player', /frame-src[^;]*youtube-nocookie\.com/.test(h));

  // ── The protections themselves ──────────────────────────────────────────
  ok('clickjacking is blocked two ways', /X-Frame-Options: DENY/.test(h) && /frame-ancestors 'none'/.test(h));
  ok('plugins are refused', /object-src 'none'/.test(h));
  ok('default-src is self', /default-src 'self'/.test(h));
  ok('supabase is reachable, or the whole app stops',
    /connect-src[^;]*https:\/\/\*\.supabase\.co/.test(h));

  // ── It matches the Worker, header for header ────────────────────────────
  // ⚠ This is the check that catches a Worker-side edit nobody re-staged.
  const csp = (h.match(/Content-Security-Policy: (.+)/) || [])[1] || '';
  for (const directive of ['default-src', 'script-src', 'style-src', 'connect-src',
                           'img-src', 'frame-src', 'frame-ancestors', 'object-src']) {
    const inWorker = new RegExp('"' + directive + '[^"]*"').test(worker)
                  || new RegExp(directive + '[^;"]*').test(worker);
    ok(`${directive} appears in both the worker and _headers`,
      inWorker && csp.includes(directive));
  }

  // Long-cache for filename-identified content, mirroring the Worker.
  ok('question images are cached hard', /\/assets\/questions\/\*/.test(h));
  ok('fonts are cached hard', /\/fonts\/\*/.test(h));
  ok('and nothing else is', !/^\/\*\n[\s\S]*Cache-Control/m.test(h.split('/assets/questions')[0]));
}

console.log(`${checks - fails}/${checks} security-header checks passed`);
process.exit(fails ? 1 : 0);
