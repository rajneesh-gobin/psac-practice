'use strict';
// Materials must be findable inside a classroom.
//
// It used to live only in the classroom's ⋯ More menu, and a teacher looking for
// "where do I put a file for this class" has no reason to open a menu labelled
// More. It is now a primary section beside Overview / Work / Pupils, with two
// more in-context routes: a Materials tile in the Overview stats, and a "Files
// shared with this class" block on Work that appears even when there are none.
//
// The nav is a horizontal scroller on phones, which is the trap: an element
// scrolled out of a scroller passes an ordinary overflow check while being
// invisible to the user (the same defect that once hid 2 of 5 tabs in
// .pd-tabbar). So this measures REACHABILITY — every section inside the nav's
// client box with no scrolling — across the phone widths, not just overflow.
//
// Run:  node scripts/test-classroom-materials-access.js
// ⚠ Wait for document.fonts.ready before measuring. Caveat is much narrower than
//   the fallback: measured before it loads, the row reports 453px wide instead
//   of 393px and invents a clipping band that does not exist.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os'), assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const PORT = 8827, DBG = 9367;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
  const name = path.resolve(root, '.' + p);
  if (!name.startsWith(root + path.sep) || !fs.existsSync(name) || fs.statSync(name).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(name)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(name).pipe(res);
});
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));

let checks = 0;
const ok = (label, cond, detail) => { assert(cond, label + (detail === undefined ? '' : ' — ' + JSON.stringify(detail))); checks++; console.log('✓ ' + label); };

// ── Source-level routes: the two in-context entry points ───────────────────
const detail = fs.readFileSync(path.join(root, 'engine/teacher_classroom_detail.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const overlay = html.slice(html.indexOf('<div id="tc-classroom-detail"'), html.indexOf('<!-- ══════════ ASSIGNMENT ENTRANCE'));

ok('Materials is a primary nav section, not a More entry',
  /class="tc-cd-nav-btn" role="tab" data-sec="materials"/.test(overlay)
  && !/role="menuitem" data-sec="materials"/.test(overlay));
ok('More keeps only results and settings',
  [...overlay.matchAll(/role="menuitem" data-sec="([a-z]+)"/g)].map(m => m[1]).join() === 'results,settings');
ok('the More button no longer lights up for materials',
  /MORE_SECTIONS = \['results', 'settings'\]/.test(detail));
ok('the classroom header count for files is the route to them',
  /class="tc-cd-stat" onclick="TeacherClassroomDetail\.showSection\('materials'\)"[\s\S]{0,120}id="tc-cd-stat-materials"/.test(overlay));
ok('the Work tab routes to Materials even with no files yet',
  /_workFilter === 'active' \? `<h4 class="tc-work-subhead">📁 Files shared with this class/.test(detail)
  && /No files yet/.test(detail));

// ── Geometry: every section reachable, on every phone width ────────────────
const PROBE = `(() => {
  const nav = document.querySelector('.tc-cd-nav');
  const r = nav.getBoundingClientRect();
  const btns = [...nav.querySelectorAll('.tc-cd-nav-btn')].map(b => {
    const br = b.getBoundingClientRect(), s = getComputedStyle(b.querySelector('span') || b);
    return { sec: b.dataset.sec || b.id, right: br.right, bottom: br.bottom, h: br.height, labelShown: s.display !== 'none', label: (b.querySelector('span') || {}).textContent || '' };
  });
  return { boxRight: r.left + nav.clientWidth, boxBottom: r.top + nav.clientHeight, btns };
})()`;

(async () => {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG, '--user-data-dir=' + fs.mkdtempSync(path.join(os.tmpdir(), 'psac-cdnav-')), '--no-first-run', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });
  let version; for (let i = 0; i < 40 && !version; i++) { try { version = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); } }
  assert(version, 'Chrome starts');
  const ws = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let serial = 0; const waiting = new Map();
  ws.onmessage = e => { const m = JSON.parse(e.data); if (waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); } };
  const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
    const id = ++serial, t = setTimeout(() => { waiting.delete(id); rej(Error('Timeout ' + method)); }, 20000);
    waiting.set(id, m => { clearTimeout(t); m.error ? rej(Error(m.error.message)) : res(m.result); });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
  const target = await send('Target.createTarget', { url: 'about:blank' });
  const session = await send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
  const call = (m, p) => send(m, p, session.sessionId);
  await call('Page.enable'); await call('Runtime.enable'); await call('Network.enable');
  await call('Network.setBypassServiceWorker', { bypass: true }); await call('Network.setCacheDisabled', { cacheDisabled: true });
  const ev = async expr => {
    const r = await call('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    assert(!r.exceptionDetails, String(r.exceptionDetails && r.exceptionDetails.exception && r.exceptionDetails.exception.description || '').slice(0, 400));
    return r.result.value;
  };
  await call('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/' });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && !!document.querySelector('.tc-cd-nav')"); } catch (_) {} }
  assert(ready, 'classroom overlay markup present');
  await sleep(600);
  await ev('document.fonts.ready.then(() => 1)');
  await sleep(300);

  // 393px is where the full-width row stops fitting; 430/431 straddle the
  // breakpoint that keeps it compact. Both bands are measured on purpose.
  for (const width of [320, 360, 375, 390, 393, 412, 430, 431, 480, 700, 1280]) {
    await call('Emulation.setDeviceMetricsOverride', { width, height: 780, deviceScaleFactor: 1, mobile: width < 700 });
    await ev("document.getElementById('tc-classroom-detail').classList.remove('hidden'); true");
    await sleep(320);
    const m = await ev(PROBE);
    const secs = m.btns.map(b => b.sec);
    assert.deepEqual(secs, ['overview', 'work', 'pupils', 'materials', 'tc-cd-more-btn'], width + 'px: five sections in order');
    const unreachable = m.btns.filter(b => b.right > m.boxRight + 1 || b.bottom > m.boxBottom + 1).map(b => b.sec);
    const small = m.btns.filter(b => b.h < 43.5).map(b => b.sec + ':' + Math.round(b.h));
    const unlabelled = m.btns.filter(b => !b.labelShown).map(b => b.sec);
    ok(width + 'px: every section reachable without scrolling the nav', unreachable.length === 0, unreachable);
    ok(width + 'px: every section is at least 44px tall', small.length === 0, small);
    ok(width + 'px: every section keeps a readable word, not a bare emoji', unlabelled.length === 0, unlabelled);
    const mat = m.btns.find(b => b.sec === 'materials');
    ok(width + 'px: the Materials button says so', /Materials/.test(mat.label), mat.label);
  }

  console.log('\nClassroom materials access: ' + checks + ' checks passed.');
  ws.close(); chrome.kill(); server.close(); process.exit(0);
})().catch(e => { console.error(e.message || e); process.exit(1); });
