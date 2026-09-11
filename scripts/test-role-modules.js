'use strict';
// The admin, teacher and forum code is NOT on a child's first load — and still
// arrives the moment someone opens one of those screens.
//
// Run: node scripts/test-role-modules.js
//
// Eight files, 0.48 MB of source (126 KB brotli), used to be blocking <script>
// tags in index.html and entries in SHELL_FILES. Every child downloaded and
// parsed them on first load, for screens they can never open. They are now
// injected by RoleModules (engine/registry.js) on demand.
//
// ⚠ The danger in a change like this is not the loading, it is the REFERENCES.
//   A global that used to exist at parse time now appears later, so anything
//   touching it at boot breaks for everyone. This asserts the app boots clean
//   with none of them defined, then that each group really does arrive.
// ⚠ It also asserts the ORDER inside the teacher group. That used to be
//   guaranteed by <script> tag order and is now a list in one file: teacher.js
//   depends on the four modules above it, and teacher_classroom_detail.js on
//   teacher.js. Load them alphabetically and the app breaks in a way no
//   syntax check would catch.
// ⚠ Console errors are captured from the REAL boot, not inferred. A missing
//   global throws asynchronously inside a handler and leaves the page looking
//   fine until someone taps the thing that is broken.

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8853;
const DBG = 9373;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif',
  '.geojson': 'application/json', '.webmanifest': 'application/manifest+json',
  '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.md': 'text/markdown' };

const GROUPS = {
  admin: ['AdminPanel'],
  forum: ['Forum'],
  teacher: ['TeacherInsights', 'TeacherHome', 'TeacherWorkspace', 'TeacherGuestClasses',
    'TeacherMode', 'TeacherClassroomDetail'],
  // Science Labs (NCE only) - engine/labs/, docs/labs/PLAN.md.
  labs: ['Labs'],
};

let pass = 0;
const failures = [];
const ok = (cond, label, detail) => {
  if (cond) { pass++; console.log('  ok   ' + label); }
  else { failures.push(label + (detail ? ' — ' + detail : '')); console.log('  FAIL ' + label + (detail ? ' — ' + detail : '')); }
};

const getJson = url => new Promise((res, rej) => {
  http.get(url, r => { let b = ''; r.on('data', c => { b += c; }); r.on('end', () => { try { res(JSON.parse(b)); } catch (e) { rej(e); } }); }).on('error', rej);
});

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/html', 'Cache-Control': 'no-store' });
    res.end('<!doctype html><title>not found</title>');
    return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': 'no-store' });
  fs.createReadStream(file).pipe(res);
});

(async () => {
  console.log('\nRole modules — off a child\'s first load, on demand afterwards\n');

  // ── 1. the source contract ─────────────────────────────────────────────────
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  const shellArr = (sw.match(/const SHELL_FILES = \[([\s\S]*?)\n\];/) || [])[1] || '';
  const reg = fs.readFileSync(path.join(ROOT, 'engine', 'registry.js'), 'utf8');
  const files = Object.values((reg.match(/const GROUPS = \{([\s\S]*?)\n  \};/) || [, ''])[1].match(/'([^']+\.js)'/g) || [])
    .map(s => s.replace(/'/g, ''));

  // 8 role files (admin, forum, six teacher) + the Science Labs shell (each lab
  // then loads its own files through Labs, not through RoleModules).
  ok(files.length === 9, 'RoleModules lists all nine files', files.length + ' found');

  const stillTagged = files.filter(f => html.includes('<script src="' + f + '"'));
  ok(stillTagged.length === 0, 'none of them is a blocking <script> in index.html', stillTagged.join(', '));

  const stillShell = files.filter(f => shellArr.includes("'/" + f + "'"));
  ok(stillShell.length === 0, 'none of them is in the all-or-nothing pre-cache list', stillShell.join(', '));

  const onDisk = files.filter(f => !fs.existsSync(path.join(ROOT, f)));
  ok(onDisk.length === 0, 'every listed file exists', onDisk.join(', '));

  // ⚠ The order is load-bearing and is now data, not tag order.
  const tOrder = GROUPS.teacher.length;
  const listed = files.filter(f => f.includes('teacher'));
  ok(listed.length === tOrder
     && listed[listed.length - 2] === 'engine/teacher.js'
     && listed[listed.length - 1] === 'engine/teacher_classroom_detail.js',
    'teacher.js loads after its four helpers, and the classroom detail last',
    listed.join(' -> '));

  // ── 2. a real boot ─────────────────────────────────────────────────────────
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-role-'));
  const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-first-run',
    '--no-default-browser-check', '--remote-debugging-port=' + DBG,
    '--user-data-dir=' + profile, 'about:blank'], { stdio: 'ignore' });

  let ver = null;
  for (let i = 0; i < 80 && !ver; i++) {
    try { ver = await getJson('http://127.0.0.1:' + DBG + '/json/version'); } catch { await sleep(250); }
  }
  if (!ver) { ok(false, 'chrome started'); return report(chrome, profile); }

  const ws = new globalThis.WebSocket(ver.webSocketDebuggerUrl);
  await new Promise(r => { ws.onopen = r; });
  let id = 0; const pending = new Map();
  const errors = [];
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result || m.error); pending.delete(m.id); return; }
    if (m.method === 'Runtime.exceptionThrown') {
      const d = m.params.exceptionDetails || {};
      errors.push((d.exception && d.exception.description) || d.text || 'exception');
    }
    if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') {
      errors.push(m.params.entry.text);
    }
  };
  const send = (method, params, sessionId) => new Promise((res, rej) => {
    const mid = ++id; pending.set(mid, res);
    ws.send(JSON.stringify({ id: mid, method, params: params || {}, sessionId }));
    setTimeout(() => { if (pending.has(mid)) { pending.delete(mid); rej(new Error('CDP timeout: ' + method)); } }, 60000);
  });
  const t1 = await send('Target.createTarget', { url: 'about:blank' });
  const t2 = await send('Target.attachToTarget', { targetId: t1.targetId, flatten: true });
  const S = (m, p) => send(m, p, t2.sessionId);
  await S('Runtime.enable');
  await S('Log.enable');
  await S('Page.enable');
  await S('Page.setBypassServiceWorker', { bypass: true });
  await S('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/' });
  await sleep(6000);

  const ev = async expr => {
    const r = await S('Runtime.evaluate', { awaitPromise: true, returnByValue: true, expression: expr });
    if (r && r.exceptionDetails) return { __err: (r.exceptionDetails.exception || {}).description || 'threw' };
    return r && r.result ? r.result.value : undefined;
  };

  ok(await ev('typeof RoleModules') === 'object' || await ev('typeof RoleModules') === 'undefined' ? await ev('typeof RoleModules === "object"') : false,
    'RoleModules exists at boot');

  // ⚠ Test by BARE IDENTIFIER, never `window[name]`. These modules declare
  //   `const AdminPanel = (() => {…})()` at the top level of a classic script,
  //   which lands in the global LEXICAL environment and never on `window` —
  //   only TeacherHome and TeacherInsights assign themselves across. Probing
  //   `window.AdminPanel` reports "not loaded" for a module that is loaded and
  //   working, which is exactly what it did on the first run of this file.
  const definedList = names =>
    `[${names.map(n => `["${n}", typeof ${n} !== 'undefined']`).join(',')}].filter(p => p[1]).map(p => p[0])`;

  const allGlobals = Object.values(GROUPS).flat();
  const definedAtBoot = await ev(definedList(allGlobals));
  ok(Array.isArray(definedAtBoot) && definedAtBoot.length === 0,
    'none of the ' + allGlobals.length + ' role globals is defined at boot',
    JSON.stringify(definedAtBoot));

  // ⚠ Anchor on the engine/ path. A bare /(admin|teacher|forum)\.js/ also
  //   matches engine/nce_paper_admin.js, which is a different, always-loaded
  //   file — and reports a clean boot as a failure.
  const ROLE_SRC = `/engine\\/(admin|forum|teacher)(_[a-z_]+)?\\.js/`;
  const scriptsAtBoot = await ev(`[...document.querySelectorAll('script[src]')].filter(s => ${ROLE_SRC}.test(s.src)).length`);
  ok(scriptsAtBoot === 0, 'no role module was fetched on first load', String(scriptsAtBoot));

  // ⚠ Real errors from the real boot — a missing global throws inside a handler
  //   and leaves the page looking perfectly fine.
  const bootErrors = errors.filter(e => !/favicon|manifest|Failed to load resource/i.test(e));
  ok(bootErrors.length === 0, 'the app boots with no console errors',
    bootErrors.slice(0, 3).join(' | '));

  // ── 3. each group arrives on demand ────────────────────────────────────────
  for (const [group, globals] of Object.entries(GROUPS)) {
    const before = errors.length;
    const got = await ev(`RoleModules.ensure('${group}').then(ok => ({ ok, defined: ${definedList(globals)} }))`);
    const okLoaded = got && got.ok === true && got.defined && got.defined.length === globals.length;
    ok(okLoaded, "RoleModules.ensure('" + group + "') defines " + globals.join(', '),
      JSON.stringify(got));
    const newErrors = errors.slice(before).filter(e => !/favicon|Failed to load resource/i.test(e));
    ok(newErrors.length === 0, 'loading the ' + group + ' group raises no error',
      newErrors.slice(0, 2).join(' | '));
  }

  // ── 4. it loads once, not per call ─────────────────────────────────────────
  const tags = await ev(`(async () => {
    const before = [...document.querySelectorAll('script[src]')].filter(s => ${ROLE_SRC}.test(s.src)).length;
    await Promise.all([RoleModules.ensure('teacher'), RoleModules.ensure('teacher'), RoleModules.ensure('admin')]);
    const after = [...document.querySelectorAll('script[src]')].filter(s => ${ROLE_SRC}.test(s.src)).length;
    return { before, after };
  })()`);
  ok(tags && tags.before === tags.after,
    'a repeat ensure() injects nothing further', JSON.stringify(tags));

  ok(await ev(`RoleModules.ensure('nope').then(r => r === false)`) === true,
    'an unknown group resolves false rather than throwing');

  // ── 5. showScreen routes through the loader ────────────────────────────────
  ok(/RoleModules\.withGroup\('teacher'/.test(fs.readFileSync(path.join(ROOT, 'engine', 'app.js'), 'utf8')),
    'showScreen loads the teacher group before rendering it');
  ok(/RoleModules\.withGroup\('forum'/.test(fs.readFileSync(path.join(ROOT, 'engine', 'app.js'), 'utf8')),
    'showScreen loads the forum group before rendering it');
  const auth = fs.readFileSync(path.join(ROOT, 'engine', 'auth.js'), 'utf8');
  ok((auth.match(/RoleModules\.withGroup\('admin'/g) || []).length === 2,
    'both admin entry points in auth.js load it first');
  ok(/RoleModules\.withGroup\('teacher'/.test(auth),
    'the teacher dashboard entry in auth.js loads it first');
  ok(!/typeof (AdminPanel|TeacherMode) !== 'undefined'/.test(auth),
    'no stale typeof guard left behind in auth.js');

  report(chrome, profile, ws);

  function report(ch, prof, sock) {
    if (sock) { try { sock.close(); } catch {} }
    if (ch) ch.kill();
    try { server.close(); } catch {}
    if (prof) { try { fs.rmSync(prof, { recursive: true, force: true }); } catch {} }
    console.log('\n  ' + pass + ' passed, ' + failures.length + ' failed');
    if (failures.length) { console.log('\n  failures:'); for (const f of failures) console.log('    ✗ ' + f); }
    process.exit(failures.length ? 1 : 0);
  }
})().catch(e => { console.error('\n  harness error: ' + e.stack); process.exit(1); });
