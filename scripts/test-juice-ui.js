#!/usr/bin/env node
'use strict';
// ═══════════════════════════════════════════════════════════════════════════
//  The Juice payment screens, in a real browser at 360px.
//
//  Three things this proves that a source test cannot:
//    1. With Juice OFF — today's state — the plans modal is EXACTLY what it
//       was: the "everything is free right now" banner, and no Buy button.
//    2. With Juice ON, the banner is gone and the Buy button appears only on
//       plans that cost something.
//    3. The instructions render the reference the server returned, and
//       "I have sent the money" changes nothing but the wording.
//
//  ⚠ _sb.rpc is stubbed, so nothing here proves the SQL. That is
//    scripts/sql-tests/run-juice-tests.sh, which runs the real functions on a
//    real postgres. This proves the SCREEN.
//
//  Usage: CHROME_PATH=... node scripts/test-juice-ui.js [--shots DIR]
// ═══════════════════════════════════════════════════════════════════════════
const http = require('node:http'), fs = require('node:fs'), path = require('node:path');
const os = require('node:os'), assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const shotsDir = (() => { const i = process.argv.indexOf('--shots'); return i > 0 ? process.argv[i + 1] : ''; })();
if (shotsDir) fs.mkdirSync(shotsDir, { recursive: true });
const PORT = 8799, DBG = 9345;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.mjs': 'text/javascript' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
  const name = path.resolve(root, '.' + p);
  if (!name.startsWith(root + path.sep) || !fs.existsSync(name) || fs.statSync(name).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(name)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(name).pipe(res);
});
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = url => new Promise((resolve, reject) => http.get(url, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { resolve(JSON.parse(s)); } catch (e) { reject(e); } }); }).on('error', reject));

// juiceOn is flipped between the two passes; everything else stays put.
const MOCK = on => `
(() => {
  window.__juiceOn = ${on};
  window.__started = [];
  window.__sent = false;
  _sb.rpc = async (name, args) => {
    if (name === 'payment_settings') return { data: {
      juice_enabled: window.__juiceOn, juice_number: '5789 1234',
      juice_name: 'PSAC Practice', juice_note: 'Put the reference in the message.' }, error: null };
    if (name === 'payment_start_juice') {
      window.__started.push(args);
      return { data: { ok: true, reused: false, payment_id: 'pay-1', reference: 'K7M2QD',
        amount_mur: 450, months: 1, status: 'pending', plan_name: 'Family',
        juice_number: '5789 1234', juice_name: 'PSAC Practice',
        juice_note: 'Put the reference in the message.' }, error: null };
    }
    if (name === 'payment_mark_sent') { window.__sent = true; return { data: { ok: true, status: 'sent' }, error: null }; }
    return { data: null, error: null };
  };
  const chain = rows => { const p = Promise.resolve({ data: rows, error: null });
    const c = { then: p.then.bind(p), catch: p.catch.bind(p), finally: p.finally.bind(p) };
    ['select','eq','in','order','limit','maybeSingle','single'].forEach(k => c[k] = () => c); return c; };
  // No payment exists until Buy is tapped, and it becomes 'sent' when the
  // parent says so - exactly what pay_select would return them.
  _sb.from = () => chain(window.__started.length
    ? [{ id: 'pay-1', plan_id: 'family', amount_mur: 450, months: 1,
         reference: 'K7M2QD', status: window.__sent ? 'sent' : 'pending',
         created_at: new Date().toISOString() }]
    : []);
  Store.listPlans = async () => ([
    { id: 'free',   name: 'Free',   price_mur: 0,   max_children: 1, features: {} },
    { id: 'family', name: 'Family', price_mur: 450, max_children: 3, features: {} },
  ]);
  Store.getUserPlan = async () => ({ plan_id: 'free' });
  Auth.getParentProfile = () => ({ id: 'parent-1', full_name: 'Mrs Devi', role: 'parent' });
  window.prompt = () => '';
})();`;

let chrome, ws;
(async () => {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG, '--user-data-dir=' + fs.mkdtempSync(path.join(os.tmpdir(), 'psac-juice-')),
    '--no-first-run', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });
  let version;
  for (let i = 0; i < 40 && !version; i++) { try { version = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); } }
  assert(version, 'Chrome starts');
  const WebSocket = globalThis.WebSocket;
  ws = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let serial = 0; const waiting = new Map();
  ws.onmessage = e => { const m = JSON.parse(e.data); if (waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); } };
  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    const id = ++serial, t = setTimeout(() => { waiting.delete(id); reject(Error('Timeout ' + method)); }, 20000);
    waiting.set(id, m => { clearTimeout(t); m.error ? reject(Error(m.error.message)) : resolve(m.result); });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
  const target = await send('Target.createTarget', { url: 'about:blank' });
  const session = await send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
  const call = (m, p) => send(m, p, session.sessionId);
  await call('Page.enable'); await call('Runtime.enable'); await call('Network.enable');
  await call('Network.setBypassServiceWorker', { bypass: true }); await call('Network.setCacheDisabled', { cacheDisabled: true });
  const ev = async (expression, awaitPromise = false) => {
    const r = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise });
    assert(!r.exceptionDetails, JSON.stringify(r.exceptionDetails?.exception?.description || r.exceptionDetails));
    return r.result.value;
  };
  const shot = async name => {
    if (!shotsDir) return;
    const r = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    fs.writeFileSync(path.join(shotsDir, name + '.png'), Buffer.from(r.data, 'base64'));
  };

  await call('Emulation.setDeviceMetricsOverride', { width: 360, height: 800, deviceScaleFactor: 1, mobile: true });
  await call('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/' });
  let ready = false;
  for (let i = 0; i < 120 && !ready; i++) {
    await sleep(500);
    try { ready = await ev("typeof _sb !== 'undefined' && !!_sb && typeof openPlansModal === 'function' && document.readyState === 'complete'"); } catch (_) {}
  }
  assert(ready, 'app globals loaded');

  let checks = 0;
  const ok = (cond, msg) => { assert(cond, msg); checks++; console.log('✓ ' + msg); };

  // ── Pass 1: Juice OFF. This is today's behaviour and must not change. ─────
  await ev(MOCK(false));
  await ev('_juiceCfg = null; openPlansModal();', false);
  await sleep(700);
  const off = await ev(`({
    banner:  !document.querySelector('#modal-plans [data-free-banner]').classList.contains('hidden'),
    buy:     document.querySelectorAll('#plans-list button:not([disabled])').length,
    later:   document.querySelectorAll('#plans-list button[disabled]').length,
    payBox:  document.getElementById('juice-pay').classList.contains('hidden'),
  })`);
  ok(off.banner, 'Juice off: the "everything is free right now" banner is shown');
  ok(off.buy === 0, 'Juice off: no plan has a Buy button');
  ok(off.later >= 1, 'Juice off: paid plans still say "Available later"');
  ok(off.payBox, 'Juice off: the instructions panel is hidden');
  await shot('juice-off-360');

  // ── Pass 2: Juice ON. ────────────────────────────────────────────────────
  await ev(MOCK(true));
  await ev('_juiceCfg = null; openPlansModal();', false);
  await sleep(700);
  const on = await ev(`({
    banner: document.querySelector('#modal-plans [data-free-banner]').classList.contains('hidden'),
    buys:   [...document.querySelectorAll('#plans-list button')].filter(b => /Juice/.test(b.textContent)).length,
    onFree: [...document.querySelectorAll('#plans-list > div')].filter(d => /Free/.test(d.textContent) && /Juice/.test(d.textContent)).length,
  })`);
  ok(on.banner, 'Juice on: the free-right-now banner comes down');
  ok(on.buys === 1, 'Juice on: exactly the one paid plan has a Buy button');
  ok(on.onFree === 0, 'Juice on: the free plan does not');
  await shot('juice-on-360');

  // ── The instructions ─────────────────────────────────────────────────────
  await ev("[...document.querySelectorAll('#plans-list button')].find(b => /Juice/.test(b.textContent)).click();");
  await sleep(500);
  const ins = await ev(`(() => {
    const box = document.getElementById('juice-pay');
    const t = box.textContent.replace(/\\s+/g, ' ');
    return { hidden: box.classList.contains('hidden'), text: t,
             ref: box.querySelector('code')?.textContent || '',
             sentBtn: /I have sent the money/.test(t),
             sentArgs: JSON.stringify(window.__started) };
  })()`);
  ok(!ins.hidden, 'tapping Buy shows the instructions');
  ok(ins.ref === 'K7M2QD', 'the reference the server returned is shown: ' + ins.ref);
  ok(/Rs\s*450/.test(ins.text), 'and the amount the server priced: ' + (ins.text.match(/Rs\s*[\d,]+/) || [''])[0]);
  ok(/5789 1234/.test(ins.text), 'and the Juice number to send it to');
  ok(ins.sentBtn, 'with a button to say it has been sent');
  // ⚠ The browser must send a plan and a month count, never an amount.
  ok(!/amount/i.test(ins.sentArgs) && /p_plan_id/.test(ins.sentArgs),
    'and the call carried no amount: ' + ins.sentArgs);
  await shot('juice-instructions-360');

  await ev("markJuiceSent('pay-1');", false);
  await sleep(600);
  const after = await ev(`document.getElementById('juice-pay').textContent.replace(/\\s+/g,' ')`);
  ok(/checking your transfer/.test(after), 'saying it has been sent only changes the wording');
  ok(!/I have sent the money/.test(after), 'and the button goes away');
  await shot('juice-sent-360');

  // Nothing on this screen may claim access has been given.
  ok(!/unlocked|activated|access opened|you now have/i.test(after),
     'the parent is never told access is open before an admin has confirmed');

  console.log(`\nJuice payment screens: ${checks} checks passed at 360px.`);
  ws.close(); chrome.kill(); server.close(); process.exit(0);
})().catch(e => {
  console.error(e.message || e);
  try { ws && ws.close(); chrome && chrome.kill(); server.close(); } catch (_) {}
  process.exit(1);
});
