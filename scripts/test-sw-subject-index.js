'use strict';
// Can the app still find its subjects when the one request they all depend on
// fails?
//
// ⚠ THE BUG THIS EXISTS TO STOP WAS A CACHE-NAME MISMATCH, not a missing file.
//   `install` precaches /subjects/_index.js into SHELL_CACHE; the /subjects/
//   branch of the fetch handler reads DATA_CACHE. So on a device that had never
//   completed one successful fetch of that file - a NEW laptop, whose first
//   load is uncontrolled and therefore writes nothing to DATA_CACHE - the
//   precached copy was never consulted and the request went to the network on
//   every load. One failure there leaves SUBJECT_PACKS EMPTY, and the app boots
//   looking perfectly healthy with no content in it: the practice hub reports
//   "No subjects available for Grade 5 yet" on the FALLBACK grade, because
//   GradeAccess.liveGrades() derives from the same empty array and collapses
//   the grade picker to 5.
//
// ⚠ Reported from a real account 2026-09-26: every subject present on the old
//   PC (which had the file in DATA_CACHE from an earlier visit) and none at all
//   on a new laptop.
//
// Loads the REAL sw.js into a fake ServiceWorkerGlobalScope, puts the file in
// the shell cache ONLY, fails every network request, and asserts on what came
// back.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const ORIGIN = 'https://nouklass.com';
const INDEX = `${ORIGIN}/subjects/_index.js`;

let failures = 0;
const fail = (msg) => { failures++; console.log(`  ✗ ${msg}`); };
const pass = (msg) => console.log(`  ✓ ${msg}`);

// caches: { '<cache name>': Set of urls it holds }. `online` false makes every
// fetch reject, the way an offline device or a blocked request does.
function loadWorker({ shellHas = [], dataHas = [], online = false } = {}) {
  const listeners = {};
  const held = {
    shell: new Set(shellHas.map(u => `${ORIGIN}${u}`)),
    data:  new Set(dataHas.map(u => `${ORIGIN}${u}`)),
  };
  const body = url => ({ body: `cached:${url}`, status: 200, ok: true, clone() { return this; } });
  const cacheFor = which => ({
    addAll: async (urls) => { urls.forEach(u => held[which].add(`${ORIGIN}${u}`)); },
    put: async (req, res) => { held[which].add(String(req && req.url || req)); return res; },
    match: async (req) => {
      const url = String(req && req.url || req);
      return held[which].has(url) ? body(url) : undefined;
    },
    keys: async () => [],
    delete: async () => true,
  });

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
    Response: class { constructor(b, init) { this.body = b; Object.assign(this, init || {}); this.ok = this.status === undefined || this.status < 400; } },
    Request: class { constructor(url) { this.url = url; this.method = 'GET'; } },
    fetch: async (req) => {
      if (!online) throw new Error('offline');
      const url = String(req && req.url || req);
      return { ok: true, status: 200, url, clone() { return this; }, body: `network:${url}` };
    },
    caches: {
      open: async (name) => cacheFor(String(name).includes('data') ? 'data' : 'shell'),
      // The global match searches EVERY cache - this is the whole point.
      match: async (req) => {
        const url = String(req && req.url || req);
        return (held.shell.has(url) || held.data.has(url)) ? body(url) : undefined;
      },
      keys: async () => [],
      delete: async () => true,
    },
    setTimeout, clearTimeout,
  };
  sandbox.self.caches = sandbox.caches;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8'), sandbox, { filename: 'sw.js' });
  if (!listeners.fetch || !listeners.fetch.length) throw new Error('sw.js registered no fetch listener');
  return { listeners, held };
}

async function get(worker, url) {
  let out = null;
  const event = {
    request: { url: url.startsWith('http') ? url : `${ORIGIN}${url}`, method: 'GET' },
    respondWith: (p) => { out = p; },
    waitUntil: () => {},
  };
  for (const fn of worker.listeners.fetch) await fn(event);
  return out ? await out : null;
}

(async () => {
  console.log('Service worker: the subject index survives a failed request\n');

  // ── 1 · The precache is what makes any of this possible ────────────────────
  const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  if (/'\/subjects\/_index\.js'/.test(sw)) pass('/subjects/_index.js is still in SHELL_FILES');
  else fail('/subjects/_index.js has left SHELL_FILES - nothing can fall back to it');

  // ── 2 · The reported failure: shell cache has it, data cache does not ──────
  {
    const worker = loadWorker({ shellHas: ['/subjects/_index.js'], dataHas: [], online: false });
    const res = await get(worker, '/subjects/_index.js');
    if (res && res.status === 200 && String(res.body).startsWith('cached:')) {
      pass('a device that precached the index but never cached it as DATA still gets it');
    } else {
      fail('the precached subject index was not served - SUBJECT_PACKS stays empty and '
        + `every subject disappears (got ${res ? res.status : 'no response'})`);
    }
  }

  // ── 3 · The cheap path is unchanged: DATA_CACHE still answers first ────────
  {
    const worker = loadWorker({ shellHas: [], dataHas: ['/subjects/_index.js'], online: false });
    const res = await get(worker, '/subjects/_index.js');
    if (res && res.status === 200) pass('a device with it in the data cache is unaffected');
    else fail('the data-cache hit stopped working');
  }

  // ── 4 · A pack manifest nobody has ever opened is still a network miss ─────
  //    The fallback must not invent content: only what a cache actually holds.
  {
    const worker = loadWorker({ shellHas: ['/subjects/_index.js'], dataHas: [], online: false });
    const res = await get(worker, '/subjects/grade5-maths/_manifest.js');
    if (res && res.status === 503) pass('an uncached pack manifest offline is still a 503, not a fake hit');
    else fail(`an uncached pack manifest should fail honestly (got ${res ? res.status : 'no response'})`);
  }

  // ── 5 · Online, the network still wins the revalidate ──────────────────────
  {
    const worker = loadWorker({ shellHas: [], dataHas: [], online: true });
    const res = await get(worker, '/subjects/_index.js');
    if (res && String(res.body).startsWith('network:')) pass('with no cached copy the network is used as before');
    else fail('the online path changed');
  }

  console.log(failures ? `\n✗ ${failures} check(s) failed` : '\n✓ all checks passed');
  process.exit(failures ? 1 : 0);
})();
