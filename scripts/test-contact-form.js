'use strict';
// The public contact form: the Lambda's rules with a stubbed PostgREST, the
// form itself in REAL headless Chrome at 360px, and the guest card the admin
// actually sees.
//
// Run: node scripts/test-contact-form.js
//
// ⚠ Nothing here touches the live database: global fetch is replaced inside
//   this process, and the browser half stubs window.fetch before the page runs.
// ⚠ SW bypass + cache disabled, or this measures the previous style.css.
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const FN = path.join(ROOT, 'netlify/functions/contact-message.js');
const PORT = 8820;
const DEBUG_PORT = 9370;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

let pass = 0, fail = 0;
const bad = [];
const check = (ok, label, detail) => {
  if (ok) { pass++; console.log('  ok   ' + label); return; }
  fail++; bad.push(label + (detail ? ' — ' + detail : ''));
  console.log('  FAIL ' + label + (detail ? ' — ' + detail : ''));
};

// ── 1 · the function ──────────────────────────────────────────────────────
console.log('— /api/contact-message —');

const realFetch = globalThis.fetch;
let calls = [];
let selectRows = [];          // what a count query answers with
let insertOk = true;
let selectOk = true;          // false = the count query itself failed

function stubFetch() {
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), method: (init && init.method) || 'GET', body: init && init.body });
    if (!init || init.method !== 'POST') {
      return { ok: selectOk, status: selectOk ? 200 : 500, json: async () => selectRows, text: async () => JSON.stringify(selectRows) };
    }
    return { ok: insertOk, status: insertOk ? 201 : 500, json: async () => ({}), text: async () => 'db said no' };
  };
}
function loadFn() { delete require.cache[require.resolve(FN)]; return require(FN); }

// elapsedMs is part of every honest submission — the form has been on screen.
const BODY = { type: 'bug', message: 'The Grade 5 maths chapter will not open on my phone.', name: 'Ana', email: 'ana@example.com', elapsedMs: 9000 };
const ev = (over = {}) => ({
  httpMethod: 'POST',
  headers: { 'x-nf-client-connection-ip': '203.0.113.9', 'user-agent': 'Mozilla/5.0 (TestPhone)' },
  body: JSON.stringify(BODY),
  ...over,
});
const withBody = extra => ({ body: JSON.stringify({ ...BODY, ...extra }) });
const run = async (fn, over) => { calls = []; const r = await fn.handler(ev(over)); return { r, out: JSON.parse(r.body || '{}') }; };

(async function () {
  stubFetch();

  // ⚠ Fails closed with no service key — a missing key must never mean "skip".
  const savedKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  {
    const fn = loadFn();
    const { r } = await run(fn);
    check(r.statusCode === 503, 'no service key ⇒ 503, never an open endpoint', 'got ' + r.statusCode);
    check(calls.length === 0, 'and nothing is written');
  }
  process.env.SUPABASE_SERVICE_ROLE_KEY = savedKey || 'test-key';
  const fn = loadFn();

  {
    const r = await fn.handler({ httpMethod: 'GET', headers: {} });
    check(r.statusCode === 405, 'GET is refused');
    const o = await fn.handler({ httpMethod: 'OPTIONS', headers: {} });
    check(o.statusCode === 204 && /Access-Control-Allow-Origin/.test(Object.keys(o.headers).join(',')),
      'OPTIONS answers the CORS preflight');
  }

  {
    const { r, out } = await run(fn, { body: 'not json' });
    check(r.statusCode === 400 && out.error === 'bad_json', 'malformed JSON is refused');
  }
  {
    const { r, out } = await run(fn, withBody({ message: 'hi' }));
    check(r.statusCode === 400 && out.error === 'message_too_short', 'a two-character message is refused');
    check(!calls.some(c => c.method === 'POST'), 'and nothing is written');
  }
  {
    const { r, out } = await run(fn, withBody({ message: 'A real message here please help', email: 'not-an-email' }));
    check(r.statusCode === 400 && out.error === 'bad_email', 'a malformed email is refused');
  }
  {
    const { out } = await run(fn, withBody({ message: 'A real message here please help', website: 'spam.example' }));
    check(out.ok === true, 'the honeypot answers a plain success, so a bot learns nothing');
    check(!calls.some(c => c.method === 'POST'), 'but nothing is written for it');
  }

  // The happy path
  {
    selectRows = [];
    const { r, out } = await run(fn);
    check(r.statusCode === 200 && out.ok === true, 'a real message is accepted');
    check(out.replyByEmail === true, 'and says a reply is possible');
    const post = calls.find(c => c.method === 'POST');
    check(!!post && /\/question_reports$/.test(post.url), 'it lands in the same admin queue as every other report');
    const row = JSON.parse(post.body);
    check(row.report_type === 'contact' && row.question_id === '__contact__', 'tagged as a contact-form row');
    check(row.status === 'open', 'and opens as open');
    check(row.student_id === null && row.chapter_id === null, 'with no student or chapter attached');
    check(row.message === 'The Grade 5 maths chapter will not open on my phone.', 'the message is stored as written');
    const meta = JSON.parse(row.question_text.split('\n__meta__')[1]);
    check(meta.guestEmail === 'ana@example.com' && meta.guestName === 'Ana', 'the sender\'s name and email are kept');
    check(meta.studentName === 'Ana', 'and reuse the existing meta field the admin card already reads');
    check(meta.ua === 'Mozilla/5.0 (TestPhone)', 'the browser string is kept — the one line that makes a bug findable');
    check(/🐛/.test(row.question_text), 'the row says in words what kind of message it is');
    check(!post.body.includes('203.0.113.9'), 'the raw IP address is NEVER stored');
    check(typeof meta.iph === 'string' && meta.iph.length === 16, 'only a salted hash of it, for counting');
  }
  {
    const { out } = await run(fn, withBody({ message: 'Hello there admins', type: 'nonsense' }));
    check(out.ok === true, 'an unknown type is accepted');
    const row = JSON.parse(calls.find(c => c.method === 'POST').body);
    check(JSON.parse(row.question_text.split('\n__meta__')[1]).contactType === 'message',
      'and falls back to a plain message rather than storing the junk');
  }
  {
    const { out } = await run(fn, withBody({ message: 'The chapter will not open ' + 'x'.repeat(5000), email: '' }));
    const row = JSON.parse(calls.find(c => c.method === 'POST').body);
    check(row.message.length === 2000, 'a very long message is capped, not refused', String(row.message.length));
    check(out.replyByEmail === false, 'with no email, the answer says so');
  }

  // Throttles
  {
    selectRows = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const { r, out } = await run(fn);
    check(r.statusCode === 429 && out.error === 'rate_limited', 'a fourth message from one address inside 15 minutes is throttled');
    check(!calls.some(c => c.method === 'POST'), 'and is not written');
    const q = calls[0].url;
    check(/report_type=eq\.contact/.test(q) && /question_text=ilike/.test(q), 'the per-sender count is scoped to contact rows from that sender');
  }
  {
    // Same IP header, so the per-sender check passes and the hourly one bites.
    selectRows = new Array(40).fill({ id: 1 });
    const fn2 = loadFn();
    const orig = globalThis.fetch;
    let n = 0;
    globalThis.fetch = async (u, i) => {
      calls.push({ url: String(u), method: (i && i.method) || 'GET', body: i && i.body });
      if (!i || i.method !== 'POST') { n++; return { ok: true, status: 200, json: async () => (n === 1 ? [] : selectRows) }; }
      return { ok: true, status: 201, json: async () => ({}), text: async () => '' };
    };
    calls = [];
    const r = await fn2.handler(ev());
    globalThis.fetch = orig;
    const out = JSON.parse(r.body);
    check(r.statusCode === 429 && out.error === 'busy', 'a global flood is braked as well', r.statusCode + ' ' + out.error);
    check(!calls.some(c => c.method === 'POST'), 'and nothing is written during a flood');
  }

  // ── The bot filters (added after the first spam review) ─────────────────
  {
    selectRows = [];
    const { r, out } = await run(fn, withBody({ elapsedMs: 400 }));
    check(r.statusCode === 400 && out.error === 'too_fast', 'a form sent in under 3 seconds is refused');
    check(!calls.some(c => c.method === 'POST'), 'and never written');
  }
  {
    const { out } = await run(fn, withBody({ elapsedMs: undefined }));
    check(out.error === 'too_fast', 'a caller that sends no fill time at all is treated as instant');
  }
  {
    const { out } = await run(fn, withBody({ elapsedMs: 99 * 24 * 3600 * 1000 }));
    check(out.error === 'too_fast', 'an absurd fill time is not accepted as proof of patience');
  }
  {
    const { out } = await run(fn, withBody({ elapsedMs: 3000 }));
    check(out.ok === true, 'exactly three seconds is enough');
    const meta = JSON.parse(JSON.parse(calls.find(c => c.method === 'POST').body).question_text.split('\n__meta__')[1]);
    check(meta.fillMs === 3000, 'and how long it took is kept, as a signal for the admin');
  }
  {
    const { r, out } = await run(fn, withBody({
      message: 'Cheap deals http://a.example http://b.example www.c.example buy now',
    }));
    check(r.statusCode === 400 && out.error === 'too_many_links', 'three links in one message is refused');
  }
  {
    const { out } = await run(fn, withBody({
      message: 'The chapter will not open, here is a screenshot https://imgur.example/x',
    }));
    check(out.ok === true, 'but ONE link in a real report is fine — refusing a genuine report is worse than a spam row');
  }
  {
    const { r, out } = await run(fn, withBody({ message: 'https://spam.example/buy' }));
    check(r.statusCode === 400 && out.error === 'not_enough_words', 'a bare URL with no words is refused');
  }
  {
    const { out } = await run(fn, withBody({ message: 'aaaaaaaaaaaaaaaaa' }));
    check(out.error === 'not_enough_words', 'and so is a wall of one repeated word');
  }

  // ── The unknown-sender bucket ───────────────────────────────────────────
  {
    // ⚠ No IP header at all: this used to skip the per-sender check entirely.
    selectRows = [{ id: 1 }, { id: 2 }];
    const { r, out } = await run(fn, { headers: { 'user-agent': 'curl/8' } });
    check(r.statusCode === 429 && out.error === 'rate_limited',
      'a caller with no IP header is counted, and on a TIGHTER cap');
  }
  {
    selectRows = [{ id: 1 }];
    const { out } = await run(fn, { headers: { 'user-agent': 'curl/8' } });
    check(out.ok === true, 'one message from an unknown sender still gets through');
    const meta = JSON.parse(JSON.parse(calls.find(c => c.method === 'POST').body).question_text.split('\n__meta__')[1]);
    check(meta.iph === 'noip000000000000', 'they all share one bucket, marked as unknown rather than hashed');
  }

  // ── The counter failing must not lift the limit ──────────────────────────
  {
    selectRows = [];
    selectOk = false;
    const { r, out } = await run(fn);
    check(r.statusCode === 503 && out.error === 'busy',
      'a rate-limit query that fails refuses the message — it does NOT fail open');
    check(!calls.some(c => c.method === 'POST'), 'and writes nothing');
    selectOk = true;
  }
  {
    selectRows = [];
    insertOk = false;
    const { r, out } = await run(fn);
    check(r.statusCode === 500 && out.error === 'save_failed', 'a refused insert is reported, never swallowed as success');
    insertOk = true;
  }
  globalThis.fetch = realFetch;

  // ── 2 · wiring ──────────────────────────────────────────────────────────
  console.log('\n— wiring —');
  const toml = fs.readFileSync(path.join(ROOT, 'netlify.toml'), 'utf8');
  check(/from\s+=\s+"\/api\/contact-message"/.test(toml), '/api/contact-message is routed to the function');
  const schema = fs.readFileSync(path.join(ROOT, 'supabase-schema.sql'), 'utf8');
  const appSrc = fs.readFileSync(path.join(ROOT, 'engine/app.js'), 'utf8');
  check(/fetch\('\/api\/contact-message'/.test(appSrc),
    'the browser reaches the queue through the function, not through the table');
  check(!/from('question_reports')/.test(appSrc), 'and app.js never writes that table itself');
  // ⚠ MEASURED, not assumed: the dump still carries an anon INSERT policy with
  // WITH CHECK (true) plus a full INSERT grant, so a tokenless visitor can
  // already write this table directly from a console and skip every throttle
  // below. That is PRE-EXISTING, not something this form introduced — but it
  // is what makes the throttle advisory rather than binding, so the harness
  // says so out loud instead of asserting a tidier world.
  const anonInsertPolicy = /CREATE POLICY "anon can insert question reports"[\s\S]{0,200}?WITH CHECK \(true\)/.test(schema);
  const anonGrant = (schema.match(/GRANT[^;]*question_reports[^;]*TO anon;/gi) || []).some(g => /INSERT/i.test(g));
  if (anonInsertPolicy || anonGrant) {
    console.log('  WARN anon can still INSERT question_reports directly (policy "anon can insert question reports",');
    console.log('       WITH CHECK (true) + a full grant). Pre-existing; see CLAUDE.md → Pending. The function\'s');
    console.log('       throttle only binds callers who use the form.');
  } else {
    check(true, 'anon has no direct insert path — the function is the only way in');
  }
  const adminSrc = fs.readFileSync(path.join(ROOT, 'engine/admin.js'), 'utf8');
  check(/isContact/.test(adminSrc) && /contact:'🌐 Guest contact'/.test(adminSrc),
    'the admin card knows what a contact row is');
  check(/isOpen && !isContact/.test(adminSrc),
    'the in-app reply box is hidden for a guest, who has no inbox to read it in');
  check(/mailto:\$\{_esc\(meta\.guestEmail\)\}/.test(adminSrc), 'and the admin gets a mailto instead');

  // ── 3 · the form in a browser ───────────────────────────────────────────
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
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    fs.createReadStream(file).pipe(res);
  });
  const getJson = url => new Promise((ok, no) => {
    http.get(url, r => { let b = ''; r.on('data', c => { b += c; }); r.on('end', () => ok(JSON.parse(b))); }).on('error', no);
  });
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));

  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-contact-'));
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
  ws.onmessage = evt => {
    const m = JSON.parse(evt.data);
    if (m.id && pending.has(m.id)) {
      const q = pending.get(m.id); pending.delete(m.id);
      if (m.error) q.reject(new Error(m.error.message)); else q.resolve(m.result);
    }
  };
  const send = (method, params, sessionId) => {
    const mid = ++id;
    return new Promise((resolve, reject) => {
      const t = setTimeout(() => { pending.delete(mid); reject(new Error('CDP timeout: ' + method)); }, 20000);
      pending.set(mid, { resolve: r => { clearTimeout(t); resolve(r); }, reject: e => { clearTimeout(t); reject(e); } });
      ws.send(JSON.stringify({ id: mid, method, params: params || {}, sessionId }));
    });
  };
  const t1 = await send('Target.createTarget', { url: 'about:blank' });
  const t2 = await send('Target.attachToTarget', { targetId: t1.targetId, flatten: true });
  const S = (m, p) => send(m, p, t2.sessionId);
  await S('Page.enable'); await S('Runtime.enable'); await S('Network.enable');
  await S('Network.setCacheDisabled', { cacheDisabled: true });
  for (const dom of ['Network.setBypassServiceWorker', 'Page.setBypassServiceWorker']) {
    try { await S(dom, { bypass: true }); break; } catch (_) {}
  }
  await S('Emulation.setDeviceMetricsOverride', { width: 360, height: 900, deviceScaleFactor: 1, mobile: true });
  await S('Page.addScriptToEvaluateOnNewDocument', { source: `
    window.__posted = [];
    window.__mode = 'ok';
    window.fetch = async (url, opts) => {
      if (!String(url).includes('/api/contact-message')) return { ok: true, status: 200, headers: { get: () => 'application/json' }, json: async () => ({}) };
      window.__posted.push(JSON.parse(opts.body));
      if (window.__mode === 'html404') {
        return { ok: false, status: 404, headers: { get: () => 'text/html; charset=utf-8' }, text: async () => '<!doctype html>' };
      }
      if (window.__mode === 'rate') {
        return { ok: false, status: 429, headers: { get: () => 'application/json' }, json: async () => ({ ok: false, error: 'rate_limited' }) };
      }
      return { ok: true, status: 200, headers: { get: () => 'application/json' }, json: async () => ({ ok: true, replyByEmail: true }) };
    };
  ` });
  await S('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/index.html' });
  const evalIn = async expr => {
    const r = await S('Runtime.evaluate', { returnByValue: true, awaitPromise: true, expression: expr });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || 'page threw');
    return r.result.value;
  };
  let ready = false;
  for (let i = 0; i < 40 && !ready; i++) {
    await sleep(500);
    ready = await evalIn('typeof submitContactMessage === "function"').catch(() => false);
  }
  console.log('\n— the form (360px, not signed in) —');
  check(!!ready, 'index.html exposes submitContactMessage to the page');
  if (!ready) { ws.close(); chrome.kill(); server.close(); process.exit(1); }
  await sleep(500);
  await evalIn(`showScreen('contact'); true`);
  await sleep(300);

  check(await evalIn('!document.getElementById("screen-contact").classList.contains("hidden")'),
    'a visitor can open the contact screen with no account');
  check(await evalIn('!!document.getElementById("contact-form")'), 'the form is there');
  check(await evalIn(`['contact-type','contact-message','contact-name','contact-email']
    .every(id => { const el = document.getElementById(id); return el && !!document.querySelector('label[for="' + id + '"]'); })`),
    'every field has a real <label for>');
  const fontSizes = await evalIn(`['contact-type','contact-message','contact-name','contact-email']
    .map(id => parseFloat(getComputedStyle(document.getElementById(id)).fontSize))`);
  check(Math.min(...fontSizes) >= 16, 'no field is under 16px — iOS zooms in on those and never back out', fontSizes.join(','));
  const hp = await evalIn(`(() => { const r = document.getElementById('contact-website').getBoundingClientRect();
    return { left: Math.round(r.left), w: Math.round(r.width) }; })()`);
  check(hp.left < -1000, 'the honeypot is off-screen, not display:none — a bot fills it either way', JSON.stringify(hp));
  const btnH = await evalIn('Math.round(document.getElementById("contact-submit").getBoundingClientRect().height)');
  check(btnH >= 44, 'the send button is at least 44px tall', btnH + 'px');
  const over = await evalIn(`(() => {
    const vw = document.documentElement.clientWidth, out = [];
    document.querySelectorAll('#screen-contact *').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width && r.height && (r.right > vw + 1 || r.left < -1) && el.id !== 'contact-website' && !el.closest('.contact-hp')) {
        out.push((el.id || el.className) + ' ' + Math.round(r.right));
      }
    });
    return out.slice(0, 5);
  })()`);
  check(over.length === 0, 'nothing on the contact screen protrudes past 360px', over.join(' | '));

  // Short message is stopped in the browser too, before a request is made.
  await evalIn(`document.getElementById('contact-message').value = 'hi'; submitContactMessage(); true`);
  await sleep(150);
  check(await evalIn('window.__posted.length') === 0, 'a two-character message never reaches the network');
  check(await evalIn('!document.getElementById("contact-status").classList.contains("hidden")')
     || await evalIn('!!document.getElementById("contact-status").textContent'),
    'and the visitor is told why');

  // The real send
  await evalIn(`document.getElementById('contact-message').value = 'The Grade 5 science chapter will not open.';
    document.getElementById('contact-name').value = 'Ana';
    document.getElementById('contact-email').value = 'ana@example.com';
    document.getElementById('contact-type').value = 'bug';
    submitContactMessage(); true`);
  await sleep(400);
  const posted = await evalIn('window.__posted[0]');
  check(!!posted && posted.type === 'bug' && posted.email === 'ana@example.com' && posted.name === 'Ana',
    'the form posts what was typed', JSON.stringify(posted));
  check(posted.message === 'The Grade 5 science chapter will not open.', 'including the message itself');
  check(posted.website === '', 'and the empty honeypot');
  check(typeof posted.elapsedMs === 'number' && posted.elapsedMs >= 0,
    'and how long the form was on screen, for the too-fast check', String(posted && posted.elapsedMs));
  check(await evalIn('/Message sent/.test(document.getElementById("contact-done").textContent)'),
    'the form is replaced by a confirmation');
  check(await evalIn('/reply to your email/.test(document.getElementById("contact-done").textContent)'),
    'which says a reply is coming, because an address was left');

  // ⚠ The SPA-fallback trap: an undeployed /api route answers HTML with a 404.
  check(await evalIn('document.getElementById("contact-form").classList.contains("hidden")'),
    'the form is hidden, not destroyed');
  await evalIn(`window.__mode = 'html404'; showScreen('landing'); showScreen('contact'); true`);
  await sleep(200);
  check(await evalIn('!document.getElementById("contact-form").classList.contains("hidden")')
     && await evalIn('document.getElementById("contact-done").classList.contains("hidden")'),
    'reopening the screen brings the form back — the receipt does not outlive the visit');
  check(await evalIn('document.getElementById("contact-message").value') === '',
    'and the message box is empty again');
  await evalIn(`document.getElementById('contact-message').value = 'Testing the undeployed case.'; submitContactMessage(); true`);
  await sleep(400);
  check(await evalIn('/not available here \\(HTTP 404\\)/.test(document.getElementById("contact-status").textContent)'),
    'an HTML 404 is reported as "not available", never as the server refusing');
  check(await evalIn('!document.getElementById("contact-submit").disabled'),
    'and the button is given back so the visitor can retry');

  await evalIn(`window.__mode = 'rate'; submitContactMessage(); true`);
  await sleep(400);
  check(await evalIn('/wait about 15 minutes/.test(document.getElementById("contact-status").textContent)'),
    'a throttled sender is told how long to wait');

  const worst = await evalIn(`(() => {
    const rgb = v => (String(v).match(/[0-9.]+/g) || []).map(Number);
    const lum = c => { const f = x => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); };
      return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
    const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
    // The panel is a translucent white card over a dark indigo gradient; #2a2060
    // is the measured ground behind it.
    const base = [42, 32, 96];
    const rows = [];
    document.querySelectorAll('#screen-contact label, #screen-contact p, #screen-contact h1, #screen-contact .contact-field, #screen-contact #contact-submit')
      .forEach(el => {
        if (el.closest('.contact-hp')) return;
        const r = el.getBoundingClientRect(); if (!r.width || !r.height) return;
        const cs = getComputedStyle(el);
        const bg = rgb(cs.backgroundColor);
        const a = bg.length > 3 ? bg[3] : 1;
        const ground = a > 0 ? [bg[0]*a + base[0]*(1-a), bg[1]*a + base[1]*(1-a), bg[2]*a + base[2]*(1-a)] : base;
        rows.push([(el.id || el.tagName + '.' + String(el.className).split(' ')[0]).slice(0, 30), Math.round(ratio(rgb(cs.color), ground) * 10) / 10]);
      });
    return rows.sort((a, b) => a[1] - b[1]);
  })()`);
  const under = worst.filter(r => r[1] < 4.5);
  check(under.length === 0, 'every text on the contact screen clears 4.5:1',
    under.map(r => r[0] + ' ' + r[1] + ':1').join(', '));
  console.log('       lowest: ' + worst.slice(0, 3).map(r => r[0] + ' ' + r[1] + ':1').join(', '));

  // ── 4 · the card the admin sees ─────────────────────────────────────────
  console.log('\n— the admin card —');
  const row = {
    id: '11111111-1111-1111-1111-111111111111',
    created_at: new Date().toISOString(),
    question_id: '__contact__',
    question_text: 'Guest contact — 🐛 Bug report\n__meta__' + JSON.stringify({
      studentName: 'Ana', mode: 'contact', guestName: 'Ana', guestEmail: 'ana@example.com',
      contactType: 'bug', ua: 'Mozilla/5.0 (TestPhone)', iph: 'abcdef0123456789',
    }),
    message: 'The Grade 5 science chapter will not open.',
    status: 'open', report_type: 'contact', student_id: null, chapter_id: null,
  };
  // ⚠ AdminPanel arrives with the lazy admin group, which the real app loads
  //   on the admin route. Without the ensure() this reads 'no-admin' forever.
  const rendered = await evalIn(`(async () => {
    await RoleModules.ensure('admin');
    if (typeof AdminPanel === 'undefined' || !AdminPanel.loadReports) return 'no-admin';
    if (typeof QuestionLoader !== 'undefined') QuestionLoader.loadAllForGrade = async () => [];
    Store.countReports = async () => 1;
    Store.loadReports = async () => [${JSON.stringify(row)}];
    await AdminPanel.loadReports(true);
    return document.getElementById('admin-reports-list').innerHTML;
  })()`);
  check(rendered !== 'no-admin', 'AdminPanel renders the reports list');
  check(/Guest contact/.test(rendered), 'the row is badged as a guest contact');
  check(/mailto:ana@example\.com/.test(rendered), 'the sender\'s email is a mailto the admin can click');
  check(/Mozilla\/5\.0 \(TestPhone\)/.test(rendered), 'the browser string is shown for a bug report');
  check(!/Reply to student/.test(rendered), 'no in-app reply box — a guest has no inbox to read it in');
  check(/Replying in the app will not reach them/.test(rendered), 'and the admin is told why');
  check(/Their message/.test(rendered) && /The Grade 5 science chapter will not open\./.test(rendered),
    'the message itself is shown');
  check(/Ana/.test(rendered), 'the sender is named');
  check(!/abcdef0123456789/.test(rendered), 'the address hash is never displayed — it is only for counting');

  const noEmail = await evalIn(`(async () => {
    const r = ${JSON.stringify(row)};
    r.question_text = 'Guest contact — 💬 Message\\n__meta__' + JSON.stringify({ studentName: 'Guest', mode: 'contact', contactType: 'message' });
    Store.loadReports = async () => [r];
    await AdminPanel.loadReports(true);
    return document.getElementById('admin-reports-list').innerHTML;
  })()`);
  check(/no way to reply/.test(noEmail), 'a message with no email says plainly that it cannot be answered');
  check(!/mailto:/.test(noEmail), 'and offers no dead mailto link');

  // ── 5 · filtering and clearing a spam run ───────────────────────────────
  console.log('\n— admin filter + bulk delete —');
  await evalIn(`(async () => {
    window.__loadArgs = [];
    window.__deleted = null;
    window.__toasts = [];
    const rows = [];
    for (let i = 0; i < 4; i++) rows.push({
      id: '2222222' + i + '-2222-2222-2222-222222222222',
      created_at: new Date().toISOString(),
      question_id: '__contact__',
      question_text: 'Guest contact — 💬 Message\\n__meta__' + JSON.stringify({ studentName: 'Spammer ' + i, mode: 'contact', contactType: 'message' }),
      message: 'buy things', status: 'open', report_type: 'contact', student_id: null, chapter_id: null,
    });
    Store.countReports = async (kind) => { window.__loadArgs.push(['count', kind]); return rows.length; };
    Store.loadReports  = async (off, lim, kind) => { window.__loadArgs.push(['load', kind]); return rows; };
    Store.deleteReports = async (ids) => { window.__deleted = ids.slice(); return { deleted: ids.length, requested: ids.length }; };
    const t = window.toast; window.toast = (m) => { window.__toasts.push(m); if (t) t(m, 500); };
    await AdminPanel.loadReports(true);
    return true;
  })()`);
  check(await evalIn('document.querySelectorAll("#admin-reports-list .rep-pick").length') === 4,
    'every row carries a selection box');
  check(await evalIn('document.getElementById("rep-bulk-delete").disabled') === true,
    'with nothing selected, Delete selected is disabled');

  await evalIn(`AdminPanel.setReportKind('contact'); true`);
  await sleep(200);
  check(await evalIn(`window.__loadArgs.filter(a => a[0] === 'load' && a[1] === 'contact').length`) >= 1,
    'the filter is passed to the QUERY, not applied to one page after the fact');
  check(await evalIn(`window.__loadArgs.some(a => a[0] === 'count' && a[1] === 'contact')`),
    'and the "showing N of M" count is filtered the same way');
  check(await evalIn('document.getElementById("rep-kind-contact").getAttribute("aria-pressed")') === 'true'
     && await evalIn('document.getElementById("rep-kind-all").getAttribute("aria-pressed")') === 'false',
    'the active chip is the pressed one');

  await evalIn('AdminPanel.toggleSelectAllReports(); true');
  check(await evalIn('document.querySelectorAll("#admin-reports-list .rep-pick:checked").length') === 4,
    'Select all shown ticks every row');
  check(await evalIn('/Delete 4 selected/.test(document.getElementById("rep-bulk-delete").textContent)'),
    'and the button counts them');
  await evalIn('AdminPanel.toggleSelectAllReports(); true');
  check(await evalIn('document.querySelectorAll("#admin-reports-list .rep-pick:checked").length') === 0
     && await evalIn('document.getElementById("rep-bulk-delete").disabled') === true,
    'tapping it again clears the selection');

  await evalIn(`AdminPanel.toggleSelectAllReports();
    AdminPanel.deleteSelectedReports(); true`);
  await sleep(200);
  check(await evalIn('!document.getElementById("modal-confirm").classList.contains("hidden")'),
    'a bulk delete asks first');
  check(await evalIn('/Permanently delete 4 reports/.test(document.getElementById("modal-confirm-msg").textContent)'),
    'and says how many, and that it cannot be undone');
  await evalIn('document.getElementById("modal-confirm-cancel").click(); true');
  await sleep(150);
  check(await evalIn('window.__deleted') === null, 'cancelling deletes nothing');

  await evalIn(`AdminPanel.deleteSelectedReports(); true`);
  await sleep(200);
  await evalIn('document.getElementById("modal-confirm-ok").click(); true');
  await sleep(400);
  const deleted = await evalIn('window.__deleted');
  check(Array.isArray(deleted) && deleted.length === 4, 'confirming deletes exactly the selected rows',
    JSON.stringify(deleted && deleted.length));
  check(Array.isArray(deleted) && deleted.every(id => /^2222222\d-/.test(id)), 'and only ids that were on screen');
  check(await evalIn('window.__toasts.some(t => /4 reports deleted/.test(t))'),
    'the admin is told what actually went, from the count the delete returned');

  console.log(`\n${pass} passed, ${fail} failed`);
  if (fail) console.log('\nFailures:\n  - ' + bad.join('\n  - '));
  ws.close(); chrome.kill(); server.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
