'use strict';
// Sharing a material or an assignment link to WhatsApp, from anywhere, at any
// time — measured in REAL headless Chrome against the real index.html.
//
// Run: node scripts/test-teacher-share.js
//
// ⚠ SW bypass + cache disabled, or this measures the previous style.css.
// ⚠ navigator.share is stubbed PRESENT for part of the run: the whole point of
//   the change is that WhatsApp is still on screen when a native sheet exists.
// ⚠ No real family, no real storage: _sb's methods are stubbed, so no signed
//   URL is ever minted against production.
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const vm = require('vm');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8818;
const DEBUG_PORT = 9368;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

let pass = 0, fail = 0;
const bad = [];
const check = (ok, label, detail) => {
  if (ok) { pass++; console.log('  ok   ' + label); return; }
  fail++; bad.push(label + (detail ? ' — ' + detail : ''));
  console.log('  FAIL ' + label + (detail ? ' — ' + detail : ''));
};

// ── 1 · the message, in a VM ──────────────────────────────────────────────
console.log('— share message (engine/helpers.js) —');
const sandbox = { console, window: {}, document: { createElement: () => ({ style: {} }) },
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} } };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'engine/helpers.js'), 'utf8'), sandbox, { filename: 'helpers.js' });

const F = { title: 'Fractions worksheet', subject: 'maths', grade: 5, description: 'For Friday',
  link_expiry_seconds: 604800 };
const msg = sandbox.materialShareMessage(F, 'https://files.invalid/a.pdf');
check(msg.includes('Fractions worksheet'), 'the message names the file');
check(msg.includes('https://files.invalid/a.pdf'), 'the message carries the link');
check(msg.includes('maths') && msg.includes('Grade 5'), 'the message says which subject and grade');
check(/works for 1 week/.test(msg), 'the message says how long the link lasts', msg.split('\n').pop());
check(sandbox.fmtMaterialExpiry(3600) === '1 hour' && sandbox.fmtMaterialExpiry(604800) === '1 week'
   && sandbox.fmtMaterialExpiry(2592000) === '1 month' && sandbox.fmtMaterialExpiry(31536000) === '1 year',
  'every expiry the upload form offers reads as words');
check(sandbox.fmtMaterialExpiry(undefined) === '1 hour', 'a missing expiry falls back to the signed-URL default');
const bare = sandbox.materialShareMessage({ title: 'Notes' }, 'https://x.invalid/f');
check(!/undefined|null/.test(bare), 'a file with no subject, grade or description leaves no gaps in the message', bare);
check(bare.split('\n').length === 3, 'and the message stays short', JSON.stringify(bare));

// ── 2 · wiring ────────────────────────────────────────────────────────────
console.log('\n— wiring —');
const wsSrc = fs.readFileSync(path.join(ROOT, 'engine/teacher_workspace.js'), 'utf8');
const tSrc  = fs.readFileSync(path.join(ROOT, 'engine/teacher.js'), 'utf8');
const dSrc  = fs.readFileSync(path.join(ROOT, 'engine/teacher_classroom_detail.js'), 'utf8');

check(/function shareText\(title, text, url\) \{\s*_sharePanel\(title, text, url\);\s*\}/.test(wsSrc),
  'shareText always opens the panel — never navigator.share instead of it');
check(!/navigator\.share\(url \? \{ title, text, url \} : \{ title, text \}\)\.catch\(err =>/.test(wsSrc),
  'the old "native replaces the panel" path is gone');
check(/data-native/.test(wsSrc) && /navigator\.share\(url \?/.test(wsSrc),
  'the native sheet is still offered, as one more button on the panel');
check(/_showSharePanel\(a\.title, url, `https:\/\/wa\.me/.test(dSrc),
  'the classroom assignment share opens its panel directly too');
check(/TeacherMaterials\.share\('/.test(tSrc) && /share,/.test(tSrc),
  'the Materials tab has a share button wired to an exported handler');
check(/TeacherClassroomDetail\.shareMaterial\('/.test(dSrc) && /shareMaterial,/.test(dSrc),
  'the classroom Materials section has one too');
check(/Number\(f\?\.link_expiry_seconds\) \|\| 3600/.test(tSrc) || /Number\(f\?*\.?link_expiry_seconds\)/.test(tSrc),
  'the teacher tab signs a link for the row\'s OWN expiry, not a hard-coded hour');
check(/materialShareMessage\(f, url\)/.test(tSrc) && /materialShareMessage\(f, url\)/.test(dSrc),
  'both surfaces build the same message');

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

const ROWS = [
  { id: 'm1', title: 'Fractions worksheet', subject: 'maths', grade: 5, description: 'For Friday',
    file_path: 'teacher/1.pdf', file_name: '1.pdf', file_size: 120000,
    created_at: '2026-09-04T09:00:00Z', link_expiry_seconds: 604800 },
  { id: 'm2', title: '<script>alert(1)</script>', subject: null, grade: null, description: null,
    file_path: 'teacher/2.png', file_name: '2.png', file_size: 2000,
    created_at: '2026-09-02T09:00:00Z', link_expiry_seconds: 3600 },
];

(async function () {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-share-'));
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
  await S('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/index.html' });

  const evalIn = async expr => {
    const r = await S('Runtime.evaluate', { returnByValue: true, awaitPromise: true, expression: expr });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || 'page threw');
    return r.result.value;
  };

  let ready = false;
  for (let i = 0; i < 40 && !ready; i++) {
    await sleep(500);
    ready = await evalIn('typeof TeacherMaterials !== "undefined" && typeof TeacherWorkspace !== "undefined"').catch(() => false);
  }
  check(!!ready, 'index.html loads with TeacherMaterials and TeacherWorkspace');
  if (!ready) { ws.close(); chrome.kill(); server.close(); process.exit(1); }
  await sleep(500);

  // ⚠ navigator.share is stubbed PRESENT for the whole run — the change under
  // test is that WhatsApp survives a device that has a native sheet.
  await evalIn(`(async () => {
    window.__signed = [];
    window.__native = 0;
    Object.defineProperty(navigator, 'share', { configurable: true, value: async () => { window.__native++; } });
    const rows = ${JSON.stringify(ROWS)};
    const table = name => {
      const res = name === 'learning_materials' ? { data: rows, error: null } : { data: [], error: null };
      const chain = { select: () => chain, eq: () => chain, order: () => chain, then: ok => Promise.resolve(res).then(ok) };
      return chain;
    };
    _sb.from = table;
    _sb.rpc = async () => ({ data: { classes: [] }, error: null });
    _sb.storage = { from: () => ({
      createSignedUrl: async (p, secs) => { window.__signed.push([p, secs]); return { data: { signedUrl: 'https://files.invalid/' + p + '?token=abc' }, error: null }; },
    }) };
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById('screen-teacher').classList.remove('hidden');
    document.querySelectorAll('#screen-teacher .ta-tab-content').forEach(p => p.classList.add('hidden'));
    document.querySelector('#screen-teacher .ta-tab-content[data-tab="materials"]').classList.remove('hidden');
    await TeacherMaterials.load();
    return true;
  })()`);

  // ── 3 · sharing a material ──────────────────────────────────────────────
  console.log('\n— sharing a material —');
  check(await evalIn('document.querySelectorAll("#tm-list .tm-file-row").length') === 2, 'the stub files are listed');
  check(await evalIn('[...document.querySelectorAll("#tm-list button")].filter(b => /Share/.test(b.textContent)).length') === 2,
    'every file has its own Share button');

  await evalIn(`[...document.querySelectorAll('#tm-list button')].find(b => /Share/.test(b.textContent)).click(); true`);
  await sleep(400);
  check(await evalIn('!!document.getElementById("ta-share-text-panel")'), 'sharing a file opens the share panel');
  check(JSON.stringify(await evalIn('window.__signed[0]')) === JSON.stringify(['teacher/1.pdf', 604800]),
    'the link is signed for the file\'s own expiry, not a hard-coded hour');
  const waHref = await evalIn('document.querySelector("#ta-share-text-panel .tc-share-wa-btn")?.getAttribute("href") || ""');
  check(waHref.startsWith('https://wa.me/?text='), 'the panel offers a real wa.me link');
  const waText = decodeURIComponent(waHref.replace('https://wa.me/?text=', ''));
  check(waText.includes('Fractions worksheet') && waText.includes('https://files.invalid/teacher/1.pdf'),
    'the WhatsApp message carries the title and the signed link');
  check(waText.includes('works for 1 week'), 'and says how long the link lasts');
  check(await evalIn('document.querySelector("#ta-share-text-panel .tc-share-wa-btn").target') === '_blank',
    'WhatsApp opens in a new tab rather than replacing the teacher\'s work');
  check(await evalIn('/noopener/.test(document.querySelector("#ta-share-text-panel .tc-share-wa-btn").rel)'),
    'and carries rel=noopener');
  check(await evalIn('!!document.querySelector("#ta-share-text-panel [data-copy]")')
     && await evalIn('!!document.querySelector("#ta-share-text-panel [data-copy-link]")'),
    'Copy message and Copy link are both offered');
  check(await evalIn('!!document.querySelector("#ta-share-text-panel [data-native]")'),
    'the native sheet is offered as an extra, since this device has one');
  await evalIn('document.querySelector("#ta-share-text-panel [data-native]").click(); true');
  await sleep(120);
  check(await evalIn('window.__native') === 1, 'More apps calls navigator.share inside the click');

  const heights = await evalIn(`[...document.querySelectorAll('#ta-share-text-panel a, #ta-share-text-panel button')]
    .filter(b => !b.classList.contains('tc-share-close'))
    .map(b => Math.round(b.getBoundingClientRect().height))`);
  check(Math.min(...heights) >= 44, 'every share action is at least 44px tall', heights.join(','));
  const over = await evalIn(`(() => {
    const vw = document.documentElement.clientWidth, out = [];
    document.querySelectorAll('#ta-share-text-panel *').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width && r.height && (r.right > vw + 1 || r.left < -1)) out.push(el.className + ' ' + Math.round(r.right));
    });
    return out.slice(0, 5);
  })()`);
  check(over.length === 0, 'the panel fits a 360px phone', over.join(' | '));

  const worst = await evalIn(`(() => {
    const rgb = v => (String(v).match(/[0-9.]+/g) || []).map(Number);
    const lum = c => { const f = x => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); };
      return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
    const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
    // The panel is a solid gradient sheet; #1d3a1f is its darker stop.
    const base = [29, 58, 31];
    const blend = (c) => { const a = c.length > 3 ? c[3] : 1; return [c[0]*a + base[0]*(1-a), c[1]*a + base[1]*(1-a), c[2]*a + base[2]*(1-a)]; };
    // ⚠ A gradient is a background IMAGE: the gold Copy button computes a
    // transparent backgroundColor, and measuring its dark ink against the dark
    // panel reports 1.3:1 for text that is nearly black on gold.
    const KNOWN = { '.tc-share-copy-btn': [229, 189, 58] };
    const rows = [];
    ['.tc-share-title', '.ta-share-textarea', '.tc-share-copy-btn', '.tc-share-wa-btn', '.tc-share-hint'].forEach(s => {
      const el = document.querySelector('#ta-share-text-panel ' + s);
      if (!el) return;
      const cs = getComputedStyle(el);
      const bg = rgb(cs.backgroundColor);
      const ground = KNOWN[s] || ((bg.length > 3 ? bg[3] : 1) > 0 ? blend(bg) : base);
      rows.push([s, Math.round(ratio(rgb(cs.color), ground) * 10) / 10]);
    });
    return rows.sort((a, b) => a[1] - b[1]);
  })()`);
  const under = worst.filter(r => r[1] < 4.5);
  check(under.length === 0, 'every text on the share panel clears 4.5:1',
    under.map(r => r[0] + ' ' + r[1] + ':1').join(', '));
  console.log('       lowest: ' + worst.slice(0, 3).map(r => r[0] + ' ' + r[1] + ':1').join(', '));

  // A title is teacher-typed text and reaches the panel.
  await evalIn('document.getElementById("ta-share-text-panel").remove(); true');
  await evalIn(`[...document.querySelectorAll('#tm-list button')].filter(b => /Share/.test(b.textContent))[1].click(); true`);
  await sleep(400);
  check(await evalIn('!!document.getElementById("ta-share-text-panel")'), 'the second file shares too');
  check(await evalIn('document.querySelectorAll("#ta-share-text-panel script").length') === 0
     && await evalIn('/<script>/.test(document.querySelector("#ta-share-text-panel .ta-share-textarea").value)'),
    'a title containing markup is escaped, not executed');
  check(JSON.stringify(await evalIn('window.__signed[1]')) === JSON.stringify(['teacher/2.png', 3600]),
    'the one-hour file is signed for one hour');

  // ── 4 · the same panel for an assignment link ───────────────────────────
  console.log('\n— sharing an assignment link —');
  await evalIn('document.getElementById("ta-share-text-panel")?.remove(); window.__native = 0; true');
  await evalIn(`TeacherWorkspace.shareText('Fractions homework',
    'Fractions homework\\n10 questions\\nhttps://psac.invalid/a/ABC123\\nPIN: 1234',
    'https://psac.invalid/a/ABC123'); true`);
  await sleep(200);
  check(await evalIn('!!document.getElementById("ta-share-text-panel")'),
    'an assignment link opens the panel even though navigator.share exists');
  check(await evalIn('window.__native') === 0, 'and the native sheet is NOT opened over the top of it');
  const aHref = await evalIn('document.querySelector("#ta-share-text-panel .tc-share-wa-btn").getAttribute("href")');
  check(decodeURIComponent(aHref).includes('https://psac.invalid/a/ABC123'),
    'the WhatsApp message carries the assignment link');
  check(await evalIn('!!document.querySelector("#ta-share-text-panel [data-copy-link]")'),
    'the bare link can be copied on its own');
  await evalIn('document.getElementById("ta-share-text-panel").click(); true');
  await sleep(120);
  check(await evalIn('!document.getElementById("ta-share-text-panel")'), 'tapping the backdrop closes the panel');

  // Without a url there is no link button, and nothing renders "undefined".
  await evalIn(`TeacherWorkspace.shareText('Reminder', 'Please finish your homework'); true`);
  await sleep(150);
  check(await evalIn('!document.querySelector("#ta-share-text-panel [data-copy-link]")'),
    'a reminder with no link offers no Copy link button');
  check(await evalIn('!/undefined/.test(document.getElementById("ta-share-text-panel").textContent)'),
    'and nothing on the panel reads "undefined"');
  check(await evalIn('!!document.querySelector("#ta-share-text-panel .tc-share-wa-btn")'),
    'a reminder can still go out on WhatsApp');

  console.log(`\n${pass} passed, ${fail} failed`);
  if (fail) console.log('\nFailures:\n  - ' + bad.join('\n  - '));
  ws.close(); chrome.kill(); server.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
