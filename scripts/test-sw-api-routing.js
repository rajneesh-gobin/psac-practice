'use strict';
// Does the service worker keep its hands off the live /api/ routes?
//
// ⚠ THIS IS A BEHAVIOURAL TEST, NOT A GREP. The bug it exists to stop was not a
//   missing string, it was a MISSING BRANCH: /api/… matched nothing in the fetch
//   handler and fell through to the cache-first shell default at the bottom, so
//   an admin's pending-registrations list was answered from disk for the life of
//   the SHELL_VERSION while the POST beside it talked to the live server. A
//   regex over the source would have passed the whole time the bug was live.
//
//   So this loads the REAL sw.js into a fake ServiceWorkerGlobalScope, dispatches
//   real fetch events, and asserts on what the handler DID: whether it called
//   respondWith at all, and whether anything reached a cache.
//
// ⚠ `Cache-Control: no-store` is not a defence here and must never be treated as
//   one - a service worker caches what it decides to cache. The only thing that
//   keeps a dynamic authenticated route honest is not intercepting it.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const ORIGIN = 'https://nouklass.com';

let failures = 0;
const fail = (msg) => { failures++; console.log(`  ✗ ${msg}`); };
const pass = (msg) => console.log(`  ✓ ${msg}`);

function loadWorker() {
  const listeners = {};
  const cachePuts = [];
  const cacheMatches = [];

  const fakeCache = {
    addAll: async () => {},
    put: async (req) => { cachePuts.push(String(req && req.url || req)); },
    match: async () => undefined,
    keys: async () => [],
    delete: async () => true,
  };

  const self = {
    addEventListener: (type, fn) => { (listeners[type] ||= []).push(fn); },
    location: { origin: ORIGIN },
    clients: { claim: async () => {}, matchAll: async () => [], openWindow: async () => {} },
    skipWaiting: async () => {},
    registration: { showNotification: async () => {} },
  };

  const sandbox = {
    self,
    console,
    URL,
    Response: class { constructor(body, init) { this.body = body; Object.assign(this, init || {}); this.ok = true; } },
    Request: class { constructor(url) { this.url = url; this.method = 'GET'; } },
    fetch: async (req) => ({ ok: true, clone: () => ({}), url: String(req && req.url || req) }),
    caches: {
      open: async () => fakeCache,
      match: async (req) => { cacheMatches.push(String(req && req.url || req)); return undefined; },
      keys: async () => [],
      delete: async () => true,
    },
    setTimeout, clearTimeout,
  };
  sandbox.self.caches = sandbox.caches;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8'), sandbox, { filename: 'sw.js' });

  if (!listeners.fetch || !listeners.fetch.length) throw new Error('sw.js registered no fetch listener');
  return { listeners, cachePuts, cacheMatches };
}

// Dispatch one fetch event and report whether the worker took the request over.
async function route(worker, url, method = 'GET') {
  let responded = false;
  const before = worker.cacheMatches.length;
  const event = {
    request: { url: `${url.startsWith('http') ? '' : ORIGIN}${url}`, method },
    respondWith: (p) => { responded = true; return p; },
    waitUntil: () => {},
  };
  for (const fn of worker.listeners.fetch) await fn(event);
  return { responded, looked: worker.cacheMatches.length > before };
}

(async () => {
  console.log('Service worker /api/ routing\n');
  const worker = loadWorker();

  // ── The routes production actually serves ──────────────────────────────────
  // Every one of these is dynamic and authenticated. None may be intercepted.
  const apiRoutes = [
    '/api/pending-registrations?limit=30&search=&cursor=',
    '/api/questions?subject=grade5-maths',
    '/api/profile-manifest',
    '/api/admin-member-emails',
    '/api/materials-library',
    '/api/assignment-open',
    '/api/check-answer',
    '/api/submit-exam',
    '/api/contact-message',
  ];
  for (const route_ of apiRoutes) {
    const { responded, looked } = await route(worker, route_);
    if (responded) fail(`${route_} was intercepted by the service worker — it must go straight to the network`);
    else if (looked) fail(`${route_} was looked up in a cache`);
    else pass(`${route_.split('?')[0]} goes straight to the network`);
  }

  // ⚠ The reported symptom, as a test. The SAME url twice must not become a
  //   cache write then a cache read: that is the admin activating six accounts
  //   and watching all six stay in the list.
  const listUrl = '/api/pending-registrations?limit=30&search=&cursor=';
  await route(worker, listUrl);
  const again = await route(worker, listUrl);
  if (again.responded || again.looked) fail('a repeated pending-registrations GET was served from the worker');
  else pass('a repeated pending-registrations GET still goes to the network');
  if (worker.cachePuts.some(u => u.includes('/api/'))) fail(`an /api/ response was written to a cache: ${worker.cachePuts.filter(u => u.includes('/api/')).join(', ')}`);
  else pass('no /api/ response was written to any cache');

  // ── /library/: the public shelf ─────────────────────────────────────────
  // ⚠ A 600 MB corpus must never reach SHELL_CACHE. Without its own branch a
  //   PDF falls through to the cache-first shell default, competes with the app
  //   for the browser's storage budget, and is wiped wholesale on the next
  //   SHELL_VERSION bump — re-downloading every paper a child has opened.
  for (const doc of ['/library/g6-2024-mathematics-a3f9c2.pdf', '/library/g9-2025-biology-27dd00.pdf']) {
    const { responded, looked } = await route(worker, doc);
    if (responded) fail(`${doc} was intercepted — a library PDF must go straight to the network`);
    else if (looked) fail(`${doc} was looked up in a cache`);
    else pass(`${doc.split('/').pop()} goes straight to the network`);
  }
  if (worker.cachePuts.some(u => u.includes('/library/'))) fail('a library PDF was written to a cache');
  else pass('no library PDF was written to any cache');

  // ── The shell must STILL be handled, or this test would pass on a worker
  //    that had simply stopped working. ─────────────────────────────────────
  for (const shell of ['/index.html', '/engine/app.js', '/style.css']) {
    const { responded } = await route(worker, shell);
    if (!responded) fail(`${shell} is no longer handled by the service worker`);
    else pass(`${shell} is still served by the worker`);
  }

  // A POST is never the worker's business.
  const post = await route(worker, '/api/pending-registrations', 'POST');
  if (post.responded) fail('a POST was intercepted');
  else pass('POST /api/… is not intercepted');

  // Cross-origin stays untouched (the CSP connect-src trap in sw.js).
  const cross = await route(worker, 'https://xawvjwsiqhtxgpocdqgm.supabase.co/rest/v1/profiles');
  if (cross.responded) fail('a cross-origin request was intercepted');
  else pass('cross-origin requests are not intercepted');

  console.log(failures ? `\n✗ ${failures} failure(s)` : '\n✓ all checks passed');
  process.exit(failures ? 1 : 0);
})();
