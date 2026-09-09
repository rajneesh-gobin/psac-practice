'use strict';
// Learning-materials sorting: the shared comparator, the wiring on all three
// surfaces, and the two controls measured in REAL headless Chrome.
//
//   1. engine/helpers.js sortMaterials/materialSortBar, in a VM
//   2. source assertions for the wiring that cannot be driven headlessly
//   3. the teacher Materials tab (index.html, _sb stubbed)
//   4. the pupil's resources list (guest.html, fetch stubbed)
//
// Run: node scripts/test-materials-sort.js
//
// ⚠ SW bypass + cache disabled, or this measures the previous style.css.
// ⚠ Overflow is judged per element; body carries overflow-x: clip.
// ⚠ Contrast composites translucent layers - the teacher board and the guest
//   cards are both tinted panels over another ground.
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const vm = require('vm');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8816;
const DEBUG_PORT = 9366;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

let pass = 0, fail = 0;
const bad = [];
const check = (ok, label, detail) => {
  if (ok) { pass++; console.log('  ok   ' + label); return; }
  fail++; bad.push(label + (detail ? ' — ' + detail : ''));
  console.log('  FAIL ' + label + (detail ? ' — ' + detail : ''));
};

// ── 1 · the comparator, in a VM ───────────────────────────────────────────
console.log('— shared comparator (engine/helpers.js) —');
const store = {};
const sandbox = {
  console,
  window: {}, document: { createElement: () => ({ style: {} }) },
  localStorage: {
    getItem: k => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: k => { delete store[k]; },
  },
};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'engine/helpers.js'), 'utf8'), sandbox, { filename: 'helpers.js' });

const H = sandbox;
check(typeof H.sortMaterials === 'function' && typeof H.materialSortBar === 'function',
  'helpers.js exposes sortMaterials and materialSortBar');

const rows = [
  { id: 'a', title: 'Zebra worksheet', subject: 'science', grade: 5, created_at: '2026-08-01T09:00:00Z', shared_at: '2026-09-01T09:00:00Z' },
  { id: 'b', title: 'Apple notes',     subject: 'maths',   grade: 6, created_at: '2026-09-04T09:00:00Z' },
  { id: 'c', title: 'Middle paper',    subject: null,      grade: null, created_at: '2026-09-02T09:00:00Z' },
  { id: 'd', title: 'apple extras',    subject: 'maths',   grade: 4, created_at: '2026-07-01T09:00:00Z', shared_at: '2026-09-03T09:00:00Z' },
];
const ids = list => list.map(r => r.id).join('');

check(ids(H.sortMaterials(rows, 'recent')) === 'bdca', 'newest first uses shared_at over created_at', ids(H.sortMaterials(rows, 'recent')));
check(ids(H.sortMaterials(rows, 'oldest')) === 'acdb', 'oldest is the exact reverse of newest', ids(H.sortMaterials(rows, 'oldest')));
check(ids(H.sortMaterials(rows, 'subject')) === 'dbac', 'subject A–Z, untagged LAST, ties broken by title', ids(H.sortMaterials(rows, 'subject')));
check(ids(H.sortMaterials(rows, 'grade')) === 'dabc', 'grade ascending, ungraded last', ids(H.sortMaterials(rows, 'grade')));
check(ids(H.sortMaterials(rows, 'title')) === 'dbca', 'title A–Z is case-insensitive', ids(H.sortMaterials(rows, 'title')));
check(ids(H.sortMaterials(rows, 'nonsense')) === ids(H.sortMaterials(rows, 'recent')), 'an unknown key falls back to newest');
check(H.sortMaterials(rows, 'title') !== rows && ids(rows) === 'abcd', 'sorting returns a copy and never reorders the caller\'s array');
check(ids(H.sortMaterials(null, 'recent')) === '' && ids(H.sortMaterials(undefined, 'title')) === '',
  'a missing list sorts to empty rather than throwing');
check(ids(H.sortMaterials([{ id: 'x', title: 'x' }, { id: 'y', title: 'y' }], 'recent')) === 'xy',
  'rows with no date at all keep a stable, title-ordered result');

const bar = H.materialSortBar('subject', 'TeacherMaterials.setSort', ['recent', 'subject', 'title']);
check((bar.match(/<button/g) || []).length === 3, 'the bar renders one button per key');
check(/aria-pressed="true"[^>]*onclick="TeacherMaterials\.setSort\('subject'\)"/.test(bar.replace(/\s+/g, ' ')),
  'the current key is the pressed one and calls the handler it was given');
check((bar.match(/aria-pressed="true"/g) || []).length === 1, 'exactly one button is pressed');
check(/role="group"/.test(bar) && /aria-label="Sort materials"/.test(bar), 'the group is labelled for a screen reader');

check(H.readMaterialSort() === 'recent', 'with nothing stored the sort defaults to newest');
H.writeMaterialSort('subject');
check(H.readMaterialSort() === 'subject', 'a chosen sort is remembered');
H.writeMaterialSort('not-a-key');
check(H.readMaterialSort() === 'subject', 'a junk key is refused rather than stored');
check(H.fmtMaterialDate('') === '' && H.fmtMaterialDate('nonsense') === '',
  'a missing date renders as nothing, never "Invalid Date"');
check(/\d/.test(H.fmtMaterialDate('2026-09-02T09:00:00Z')), 'a real date renders');

// ── 2 · wiring that cannot be driven headlessly ───────────────────────────
console.log('\n— wiring —');
const teacherSrc = fs.readFileSync(path.join(ROOT, 'engine/teacher.js'), 'utf8');
const detailSrc  = fs.readFileSync(path.join(ROOT, 'engine/teacher_classroom_detail.js'), 'utf8');
const guestSrc   = fs.readFileSync(path.join(ROOT, 'guest.js'), 'utf8');
const fnSrc      = fs.readFileSync(path.join(ROOT, 'netlify/functions/classroom-materials.js'), 'utf8');

check(/setMaterialSort/.test(detailSrc) && /setMaterialSort,/.test(detailSrc),
  'the classroom Materials section exposes setMaterialSort');
check(/\.select\('assigned_at, learning_materials\(\*\)'\)/.test(detailSrc),
  'the classroom query asks for assigned_at — when the file was shared with THIS class');
check(/shared_at: r\.assigned_at/.test(detailSrc), 'assigned_at is mapped onto each row as shared_at');
check(/sortMaterials\(files, _matSort\)/.test(detailSrc), 'the classroom list is ordered by the shared comparator');
check(/sortMaterials\(_materials, 'recent'\)\.slice\(0, 6\)/.test(detailSrc),
  'the Work tab preview stays newest-first whatever sort the Materials tab is on');
check(/materialSortBar\(_matSort, 'TeacherClassroomDetail\.setMaterialSort'/.test(detailSrc),
  'the classroom section renders the shared sort bar');
check(/files\.length > 1 \? materialSortBar/.test(detailSrc),
  'one file gets no sort control');
check(/materialSortBar\(_sort, 'TeacherMaterials\.setSort'/.test(teacherSrc),
  'the Materials tab renders the shared sort bar');
// ⚠ The guard is on the FILTERED rows now, not the raw list: with a search box
// the question is "is there more than one thing on screen", not "in the library".
check(/shown\.length > 1/.test(teacherSrc),
  'the Materials tab hides the sort control when one material is shown');
check(/fmtMaterialDate\(f\.created_at\)/.test(teacherSrc),
  'the Materials tab shows the date it is sorting by');
check(/setSort,/.test(teacherSrc), 'TeacherMaterials exposes setSort');

check(/\.order\('assigned_at', \{ ascending: false \}\)/.test(fnSrc),
  'the API orders by share date, so two identical requests agree');
check(/shared_at:\s+f\.shared_at \|\| f\.created_at/.test(fnSrc), 'the API returns shared_at to the pupil');
check(/created_at/.test(fnSrc), 'the API selects created_at as the fallback date');
check(/sortMats/.test(guestSrc) && /MAT_SORT_STORE/.test(guestSrc), 'guest.js carries its own copy of the sort');
check(/engine\/helpers\.js/.test(guestSrc), 'guest.js names the twin it must be kept in step with');

// ── the browser half ──────────────────────────────────────────────────────
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.geojson': 'application/json',
  '.webmanifest': 'application/manifest+json', '.ico': 'image/x-icon' };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404); res.end('not found'); return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream',
    'Cache-Control': 'no-store' });
  fs.createReadStream(file).pipe(res);
});

const getJson = url => new Promise((ok, no) => {
  http.get(url, r => { let b = ''; r.on('data', c => { b += c; }); r.on('end', () => ok(JSON.parse(b))); }).on('error', no);
});
const sleep = ms => new Promise(r => setTimeout(r, ms));

const CONTRAST = `const rgb = v => (String(v).match(/[0-9.]+/g) || []).map(Number);
  const lum = c => { const f = x => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
  const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
  // ⚠ A gradient is a background IMAGE: its computed backgroundColor is
  // transparent, so a naive walk sails past the chalkboard and measures chalk
  // on white at 1:1. Same KNOWN-surface table the command-centre harness uses.
  const KNOWN = [['.ta-tab-content', ['#243f26', '#101010']]];
  const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16), 1];
  const bgOf = el => {
    const dark = document.documentElement.classList.contains('dark');
    const layers = []; let n = el;
    while (n && n.nodeType === 1) {
      const c = rgb(getComputedStyle(n).backgroundColor);
      const a = c.length > 3 ? c[3] : 1;
      const known = KNOWN.find(k => n.matches(k[0]));
      if (known && a < 1) { layers.push(hex(known[1][dark ? 1 : 0])); break; }
      if (a > 0) layers.push([c[0], c[1], c[2], a]);
      if (a === 1) break;
      n = n.parentElement;
    }
    let base = document.documentElement.classList.contains('dark') ? [17, 24, 39] : [255, 255, 255];
    for (let i = layers.length - 1; i >= 0; i--) {
      const [r, g, b, a] = layers[i];
      base = [r * a + base[0] * (1 - a), g * a + base[1] * (1 - a), b * a + base[2] * (1 - a)];
    }
    return base;
  };
  const contrast = el => Math.round(ratio(rgb(getComputedStyle(el).color), bgOf(el)) * 10) / 10;`;

const MATS = [
  { id: 'm1', title: 'Zebra worksheet', subject: 'science', description: 'Animals', file_name: 'a.pdf',
    file_size: 12000, shared_at: '2026-09-01T09:00:00Z', created_at: '2026-08-01T09:00:00Z', url: 'https://example.invalid/a.pdf' },
  { id: 'm2', title: 'Apple notes', subject: 'maths', description: null, file_name: 'b.pdf',
    file_size: 22000, shared_at: '2026-09-04T09:00:00Z', created_at: '2026-09-04T09:00:00Z', url: 'https://example.invalid/b.pdf' },
  { id: 'm3', title: 'Middle paper', subject: null, description: null, file_name: 'c.png',
    file_size: 32000, shared_at: '2026-09-02T09:00:00Z', created_at: '2026-09-02T09:00:00Z', url: 'https://example.invalid/c.png' },
];
const TEACHER_ROWS = MATS.map((m, i) => ({
  id: m.id, title: m.title, subject: m.subject, grade: [5, 6, null][i],
  description: m.description, file_path: 'x/' + m.id, file_name: m.file_name,
  file_size: m.file_size, created_at: m.created_at, link_expiry_seconds: 3600,
}));

(async function () {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-mat-'));
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + DEBUG_PORT,
    '--user-data-dir=' + profile, '--no-first-run', '--no-default-browser-check',
    '--disable-gpu', '--window-size=400,900', 'about:blank'], { stdio: 'ignore' });

  let ver = null;
  for (let i = 0; i < 80 && !ver; i++) {
    try { ver = await getJson('http://127.0.0.1:' + DEBUG_PORT + '/json/version'); } catch (e) { await sleep(250); }
  }
  if (!ver) throw new Error('Chrome never came up');

  const ws = new globalThis.WebSocket(ver.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 0;
  const pending = new Map();
  ws.onmessage = ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const q = pending.get(m.id); pending.delete(m.id);
      if (m.error) q.reject(new Error(m.error.message)); else q.resolve(m.result);
    }
  };
  function send(method, params, sessionId) {
    const mid = ++id;
    return new Promise((resolve, reject) => {
      const t = setTimeout(() => { pending.delete(mid); reject(new Error('CDP timeout: ' + method)); }, 20000);
      pending.set(mid, { resolve: r => { clearTimeout(t); resolve(r); }, reject: e => { clearTimeout(t); reject(e); } });
      ws.send(JSON.stringify({ id: mid, method, params: params || {}, sessionId }));
    });
  }

  const t1 = await send('Target.createTarget', { url: 'about:blank' });
  const t2 = await send('Target.attachToTarget', { targetId: t1.targetId, flatten: true });
  const S = (m, p) => send(m, p, t2.sessionId);
  await S('Page.enable'); await S('Runtime.enable'); await S('Network.enable');
  await S('Network.setCacheDisabled', { cacheDisabled: true });
  for (const dom of ['Network.setBypassServiceWorker', 'Page.setBypassServiceWorker']) {
    try { await S(dom, { bypass: true }); break; } catch (_) {}
  }
  await S('Emulation.setDeviceMetricsOverride', { width: 360, height: 900, deviceScaleFactor: 1, mobile: true });

  const evalIn = async expr => {
    const r = await S('Runtime.evaluate', { returnByValue: true, awaitPromise: true, expression: expr });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || 'page threw');
    return r.result.value;
  };
  const overflowIn = sel => evalIn(`(() => {
    const vw = document.documentElement.clientWidth, out = [];
    document.querySelectorAll('${sel} *').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width && r.height && (r.right > vw + 1 || r.left < -1)) out.push(el.className + ' ' + Math.round(r.right));
    });
    return out.slice(0, 5);
  })()`);

  // ── 3 · the teacher Materials tab ───────────────────────────────────────
  console.log('\n— teacher Materials tab (360px, real board CSS) —');
  await S('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/index.html' });
  let ready = false;
  for (let i = 0; i < 40 && !ready; i++) {
    await sleep(500);
    // ⚠ TeacherMaterials ships inside the lazy teacher group, so ASK for it.
    //   Polling for the global alone never resolves: nothing on a child's path
    //   loads those files any more (scripts/test-role-modules.js).
    ready = await evalIn("RoleModules.ensure('teacher').then(() => typeof TeacherMaterials !== 'undefined' && typeof sortMaterials === 'function')").catch(() => false);
  }
  check(!!ready, 'index.html loads with TeacherMaterials and the shared comparator');
  if (!ready) { ws.close(); chrome.kill(); server.close(); process.exit(1); }
  await sleep(500);

  // _sb is a const: its METHODS are stubbed, the binding is left alone.
  await evalIn(`(async () => {
    const rows = ${JSON.stringify(TEACHER_ROWS)};
    const table = name => {
      const res = name === 'learning_materials' ? { data: rows, error: null }
                : name === 'classroom_materials' ? { data: [{ material_id: 'm1', classroom_id: 'c1' }], error: null }
                : { data: [], error: null };
      const chain = {
        select: () => chain, eq: () => chain, order: () => chain,
        then: (ok) => Promise.resolve(res).then(ok),
      };
      return chain;
    };
    _sb.from = table;
    _sb.rpc = async () => ({ data: { classes: [{ id: 'c1', name: '5 Blue', active: true }] }, error: null });
    try { localStorage.removeItem('psac_material_sort_v1'); } catch (_) {}
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById('screen-teacher').classList.remove('hidden');
    document.querySelectorAll('#screen-teacher .ta-tab-content').forEach(p => p.classList.add('hidden'));
    document.querySelector('#screen-teacher .ta-tab-content[data-tab="materials"]').classList.remove('hidden');
    await TeacherMaterials.load();
    return true;
  })()`);

  check(await evalIn('document.querySelectorAll("#tm-list .tm-file-row").length') === 3,
    'the three stub files are listed');
  check(await evalIn('!!document.querySelector("#tm-controls .mat-sort")'), 'the sort bar renders above the list');
  check(await evalIn('document.querySelectorAll("#tm-controls .mat-sort-btn").length') === 5,
    'five sorts are offered: newest, oldest, subject, grade, title');
  // ⚠ The title line now leads with a type icon (file / image / video / link),
  // so the icon span is stripped before comparing. Reading textContent straight
  // off the <p> compares "📄Apple notes" against "Apple notes" and fails on a
  // change that is purely cosmetic.
  const titlesNow = () => evalIn(`[...document.querySelectorAll('#tm-list .tm-file-row p:first-child')].map(p => {
    const c = p.cloneNode(true); const k = c.querySelector('.tm-kind'); if (k) k.remove();
    return c.textContent.trim();
  })`);
  check(JSON.stringify(await titlesNow()) === JSON.stringify(['Apple notes', 'Middle paper', 'Zebra worksheet']),
    'the default order is newest upload first');
  // The meta line is built from parts now (subject · grade · size · date), so
  // the word "Uploaded" has gone. The DATE is what this assertion was about.
  check(await evalIn('/\\d{1,2}\\s+\\w{3}/.test(document.querySelector("#tm-list .tm-file-row").textContent)'),
    'each row shows the date the list is sorted by');
  check(await evalIn('!!document.querySelector("#tm-list .tm-file-row .tm-kind")'),
    'each row shows whether it is a file, an image, a video or a link');

  await evalIn(`[...document.querySelectorAll('#tm-controls .mat-sort-btn')].find(b => /Subject/.test(b.textContent)).click(); true`);
  check(JSON.stringify(await titlesNow()) === JSON.stringify(['Apple notes', 'Zebra worksheet', 'Middle paper']),
    'sorting by subject reorders the list and puts the untagged file last');
  check(await evalIn('localStorage.getItem("psac_material_sort_v1")') === 'subject',
    'the teacher\'s choice is remembered');
  check(await evalIn(`[...document.querySelectorAll('#tm-controls .mat-sort-btn')].filter(b => b.getAttribute('aria-pressed') === 'true').length`) === 1,
    'exactly one chip stays pressed after a re-render');
  await evalIn(`[...document.querySelectorAll('#tm-controls .mat-sort-btn')].find(b => /Title/.test(b.textContent)).click(); true`);
  check(JSON.stringify(await titlesNow()) === JSON.stringify(['Apple notes', 'Middle paper', 'Zebra worksheet']),
    'sorting by title is A–Z');
  await evalIn(`[...document.querySelectorAll('#tm-controls .mat-sort-btn')].find(b => /Oldest/.test(b.textContent)).click(); true`);
  check(JSON.stringify(await titlesNow()) === JSON.stringify(['Zebra worksheet', 'Middle paper', 'Apple notes']),
    'oldest first is the exact reverse');
  check(await evalIn('document.querySelectorAll("#tm-list .tm-assign-btn").length') === 3,
    'the assign buttons survive a re-sort');

  const tHeights = await evalIn(`[...document.querySelectorAll('#tm-controls .mat-sort-btn')].map(b => Math.round(b.getBoundingClientRect().height))`);
  check(Math.min(...tHeights) >= 44, 'every sort chip is at least 44px tall', tHeights.join(','));
  const tOver = await overflowIn('#tm-list');
  check(tOver.length === 0, 'the teacher list fits 360px', tOver.join(' | '));

  for (const theme of ['light', 'dark']) {
    await evalIn(`document.documentElement.classList.toggle('dark', ${theme === 'dark'}); true`);
    await sleep(80);
    const worst = await evalIn(`(() => { ${CONTRAST}
      const rows = [];
      ['.mat-sort-label', '.mat-sort-btn', '.mat-sort-btn.is-on'].forEach(s => {
        const el = document.querySelector('#tm-controls ' + s); if (el) rows.push([s, contrast(el)]);
      });
      return rows.sort((a, b) => a[1] - b[1]);
    })()`);
    const under = worst.filter(r => r[1] < 4.5);
    check(under.length === 0, `the sort control clears 4.5:1 on the board in ${theme} mode`,
      under.map(r => r[0] + ' ' + r[1] + ':1').join(', '));
    console.log('       ' + worst.map(r => r[0] + ' ' + r[1] + ':1').join(', '));
  }
  await evalIn('document.documentElement.classList.remove("dark"); true');

  // ── 4 · the pupil's resources list (guest.html) ─────────────────────────
  console.log('\n— pupil resources (guest.html, 360px) —');
  // fetch is replaced BEFORE guest.js runs; everything in that file is inside
  // an IIFE and cannot be reached from outside afterwards.
  await S('Page.addScriptToEvaluateOnNewDocument', { source: `
    window.__calls = [];
    window.fetch = async (url, opts) => {
      const body = JSON.parse((opts && opts.body) || '{}');
      window.__calls.push(String(url));
      let out = { ok: false };
      if (String(url).includes('assignment-open')) {
        out = body.info
          ? { ok: true, title: 'Fractions homework', access_mode: 'nickname', classroom_id: 'c1' }
          : { ok: true, name: body.name, token: 't', assignment: { title: 'Fractions homework' },
              questions: [{ id: 'q1', question: '1+1?', options: ['1','2'], answer: '2' }] };
      } else if (String(url).includes('classroom-materials')) {
        // ⚠ Driven from localStorage, not by reassigning fetch afterwards: this
        // script re-runs on every navigation and would overwrite such a stub.
        let one = false;
        try { one = localStorage.getItem('__mat_single') === '1'; } catch (_) {}
        out = { ok: true, materials: one ? ${JSON.stringify([MATS[0]])} : ${JSON.stringify(MATS)} };
      }
      return { ok: true, status: 200, json: async () => out };
    };
  ` });
  await S('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/guest.html?code=ABC123' });
  let gready = false;
  for (let i = 0; i < 40 && !gready; i++) {
    await sleep(400);
    gready = await evalIn('!!document.getElementById("g-go") && !document.getElementById("g-go").disabled').catch(() => false);
  }
  check(!!gready, 'the guest gate opens with the stubbed assignment');

  await evalIn(`document.getElementById('g-name').value = 'Ana'; document.getElementById('g-go').click(); true`);
  await sleep(600);
  check(await evalIn('document.getElementById("s-home").classList.contains("on")'), 'the pupil reaches the home screen');
  check(await evalIn('document.getElementById("h-res").style.display !== "none"'), 'the resources section is shown');
  check(await evalIn('document.querySelectorAll("#h-res-list .res-card").length') === 3, 'all three files are listed');
  check(await evalIn('!!document.querySelector("#h-res-list .res-sort")'), 'the pupil gets a sort control');
  check(await evalIn('document.querySelectorAll("#h-res-list .res-sort-btn").length') === 3,
    'three sorts are offered: newest, subject, name');
  const gTitles = () => evalIn(`[...document.querySelectorAll('#h-res-list .res-title')].map(t => t.textContent.trim())`);
  check(JSON.stringify(await gTitles()) === JSON.stringify(['Apple notes', 'Middle paper', 'Zebra worksheet']),
    'the default order is the most recently shared first');
  check(await evalIn('/Shared/.test(document.querySelector("#h-res-list .res-date").textContent)'),
    'each card says when the teacher shared it');
  check(await evalIn('document.querySelectorAll("#h-res-list .res-date").length') === 3,
    'every card carries its share date');

  await evalIn(`[...document.querySelectorAll('#h-res-list .res-sort-btn')].find(b => /Subject/.test(b.textContent)).click(); true`);
  check(JSON.stringify(await gTitles()) === JSON.stringify(['Apple notes', 'Zebra worksheet', 'Middle paper']),
    'sorting by subject works for the pupil too, untagged last');
  check(await evalIn('localStorage.getItem("psac_guest_mat_sort")') === 'subject',
    'the pupil\'s choice is remembered on their device');
  await evalIn(`[...document.querySelectorAll('#h-res-list .res-sort-btn')].find(b => /Name/.test(b.textContent)).click(); true`);
  check(JSON.stringify(await gTitles()) === JSON.stringify(['Apple notes', 'Middle paper', 'Zebra worksheet']),
    'sorting by name is A–Z');
  check(await evalIn('document.querySelectorAll("#h-res-list .res-open").length') === 3,
    'every card still has its Open link after re-sorting');

  const gHeights = await evalIn(`[...document.querySelectorAll('#h-res-list .res-sort-btn')].map(b => Math.round(b.getBoundingClientRect().height))`);
  check(Math.min(...gHeights) >= 44, 'every pupil sort chip is at least 44px tall', gHeights.join(','));
  const gOver = await overflowIn('#s-home');
  check(gOver.length === 0, 'the pupil home screen fits 360px', gOver.join(' | '));

  const gWorst = await evalIn(`(() => { ${CONTRAST}
    const rows = [];
    ['.res-sort-label', '.res-sort-btn', '.res-sort-btn.on', '.res-date', '.res-title', '.res-sub'].forEach(s => {
      const el = document.querySelector('#h-res-list ' + s); if (el) rows.push([s, contrast(el)]);
    });
    return rows.sort((a, b) => a[1] - b[1]);
  })()`);
  const gUnder = gWorst.filter(r => r[1] < 4.5);
  check(gUnder.length === 0, 'every pupil resource text clears 4.5:1',
    gUnder.map(r => r[0] + ' ' + r[1] + ':1').join(', '));
  console.log('       lowest: ' + gWorst.slice(0, 3).map(r => r[0] + ' ' + r[1] + ':1').join(', '));

  // One file must not get a control at all.
  await evalIn(`localStorage.setItem('__mat_single', '1'); true`);
  await S('Page.reload', { ignoreCache: true });
  for (let i = 0; i < 40; i++) {
    await sleep(400);
    if (await evalIn('!!document.getElementById("g-go") && !document.getElementById("g-go").disabled').catch(() => false)) break;
  }
  await evalIn(`document.getElementById('g-name').value = 'Ana'; document.getElementById('g-go').click(); true`);
  await sleep(600);
  check(await evalIn('document.querySelectorAll("#h-res-list .res-card").length') === 1, 'the single-file case renders');
  check(await evalIn('!document.querySelector("#h-res-list .res-sort")'),
    'one file gets no sort control — it would only be something else to read');

  console.log(`\n${pass} passed, ${fail} failed`);
  if (fail) console.log('\nFailures:\n  - ' + bad.join('\n  - '));
  ws.close(); chrome.kill(); server.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
