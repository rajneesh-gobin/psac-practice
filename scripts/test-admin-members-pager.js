'use strict';
// Admin › Members: numbered pages ("Page 3 of 22", First/Prev/Next/Last),
// measured in a real browser with the Supabase client's .from() stubbed.
//
// It replaced "Load more", which appended rows without end and never said how
// far there was to go. Asserted here: the count and the pager agree with the
// database's total, the edge buttons disable, the page <select> jumps, a slow
// earlier page cannot paint over a newer one, a page that stops existing lands
// on the last real one, and the pager fits a 360px phone.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-admin-members-pager.js
// ⚠ Served over file:// (Chrome for Testing here cannot reach 127.0.0.1), and
//   the page target's URL is asserted before anything is driven.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9392;
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0;
const ok = (label, cond, detail) => { if (cond) { checks++; console.log('OK   ' + label); } else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail) : '')); } };

(async () => {
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG,
    '--user-data-dir=' + fs.mkdtempSync(path.join(os.tmpdir(), 'psac-memberspager-')),
    '--allow-file-access-from-files', '--no-first-run', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });
  const quit = code => { try { chrome.kill(); } catch (_) {} process.exit(code); };
  let version; for (let i = 0; i < 40 && !version; i++) { try { version = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); } }
  if (!version) throw new Error('Chrome did not start');
  const ws = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let serial = 0; const waiting = new Map();
  ws.onmessage = e => { const m = JSON.parse(e.data); if (waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); } };
  const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
    const id = ++serial, t = setTimeout(() => { waiting.delete(id); rej(Error('Timeout ' + method)); }, 30000);
    waiting.set(id, m => { clearTimeout(t); m.error ? rej(Error(m.error.message)) : res(m.result); });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
  const target = await send('Target.createTarget', { url: 'about:blank' });
  const session = await send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
  const call = (m, p) => send(m, p, session.sessionId);
  await call('Page.enable'); await call('Runtime.enable');
  await call('Emulation.setDeviceMetricsOverride', { width: 360, height: 780, deviceScaleFactor: 2, mobile: true });
  const ev = async expr => {
    const r = await call('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(String(r.exceptionDetails.exception && r.exceptionDetails.exception.description || r.exceptionDetails.text).slice(0, 400));
    return r.result.value;
  };

  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof RoleModules !== 'undefined' && typeof _sb !== 'undefined'"); } catch (_) {} }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: the page target is ' + url + ', not the file we navigated to.'); quit(1); }
  ok('app loaded', ready === true);
  ok('the Supabase client exists (the stub needs something to stub)', await ev('!!_sb'));
  await sleep(2000);

  // Load the admin module the way the app does, then stub the database: 70
  // members, each page served with its real range and an exact count.
  const loaded = await ev(`new Promise(res => {
    RoleModules.withGroup('admin', () => res(typeof AdminPanel !== 'undefined'));
    setTimeout(() => res(typeof AdminPanel !== 'undefined'), 8000);
  })`);
  ok('the admin module loads', loaded === true);
  await ev(`(() => {
    window.__total = 70; window.__delay = {}; window.__ranges = [];
    const member = i => ({ id: '00000000-0000-4000-8000-' + String(i).padStart(12, '0'),
      full_name: 'Member ' + String(i).padStart(2, '0'), role: 'parent', is_super_admin: false,
      disabled: false, expires_at: null, created_at: new Date(Date.UTC(2026, 0, 1) - i * 864e5).toISOString(),
      teacher_status: 'none', referral_code: null, credits: 0, blocked_until: null });
    _sb.from = table => {
      let from = 0, to = 999;
      const q = {
        then(res, rej) {
          let out;
          if (table === 'profiles') {
            window.__ranges.push([from, to]);
            const rows = [];
            for (let i = from; i <= Math.min(to, window.__total - 1); i++) rows.push(member(i + 1));
            out = { data: rows, count: window.__total, error: null };
          } else out = { data: [], count: 0, error: null };
          const d = table === 'profiles' ? (window.__delay[from / 30 + 1] || 0) : 0;
          return new Promise(r => setTimeout(() => r(out), d)).then(res, rej);
        },
        range(a, b) { from = a; to = b; return q; },
      };
      ['select','in','order','or','eq','ilike','is','limit','neq','not','gte','lte','filter','match']
        .forEach(m => { q[m] = () => q; });
      q.maybeSingle = () => q; q.single = () => q;
      return q;
    };
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    for (let n = document.getElementById('admin-members-list'); n; n = n.parentElement) n.classList.remove('hidden');
    return true;
  })()`);

  const state = () => ev(`(() => {
    const sel = document.getElementById('admin-members-page');
    const pager = document.getElementById('admin-members-pager');
    const btns = ['first','prev','next','last'].map(k => document.getElementById('admin-members-' + k));
    const rights = [...pager.querySelectorAll('button, select')].map(e => e.getBoundingClientRect().right);
    return {
      count: document.getElementById('admin-members-count').textContent,
      pagerShown: !pager.classList.contains('hidden') && pager.getBoundingClientRect().height > 0,
      page: sel.value, label: sel.selectedOptions[0]?.textContent, options: sel.options.length,
      disabled: Object.fromEntries(btns.map((b, i) => [['first','prev','next','last'][i], b.disabled])),
      firstRow: document.querySelector('#admin-members-list')?.textContent.match(/Member \\d\\d/)?.[0] || null,
      rows: (document.querySelector('#admin-members-list')?.textContent.match(/Member \\d\\d/g) || []).length,
      maxRight: Math.max(...rights), vw: innerWidth,
      pagerFontPx: parseFloat(getComputedStyle(btns[0]).fontSize), pagerBorder: getComputedStyle(btns[0]).borderTopWidth,
    };
  })()`);

  // ── Page 1
  await ev('AdminPanel.loadMembers(1)');
  let s = await state();
  ok('page 1 says "Showing 1–30 of 70 accounts"', s.count === 'Showing 1–30 of 70 accounts', s.count);
  ok('the pager is shown, on "Page 1 of 3"', s.pagerShown && s.label === 'Page 1 of 3' && s.options === 3, s);
  ok('page 1 lists members 01–30', s.firstRow === 'Member 01' && s.rows === 30, s);
  ok('First and Prev are disabled on page 1, Next and Last are not',
     s.disabled.first && s.disabled.prev && !s.disabled.next && !s.disabled.last, s.disabled);
  ok('the pager is styled (its classes exist in the Tailwind scan)', s.pagerBorder !== '0px' && s.pagerFontPx > 0, s);
  ok('the pager fits a 360px phone', s.maxRight <= s.vw, s);

  // ── Next, Last, First, and the <select>
  await ev("AdminPanel.membersPage('next')");
  s = await state();
  ok('Next goes to page 2: "Showing 31–60 of 70 accounts"', s.count === 'Showing 31–60 of 70 accounts' && s.label === 'Page 2 of 3', s);
  ok('page 2 replaces page 1 rather than appending to it', s.firstRow === 'Member 31' && s.rows === 30, s);

  await ev("AdminPanel.membersPage('last')");
  s = await state();
  ok('Last goes to page 3: "Showing 61–70 of 70 accounts"', s.count === 'Showing 61–70 of 70 accounts' && s.rows === 10, s);
  ok('Next and Last are disabled on the last page', s.disabled.next && s.disabled.last && !s.disabled.first, s.disabled);

  await ev("AdminPanel.membersPage('first')");
  s = await state();
  ok('First goes back to page 1', s.label === 'Page 1 of 3' && s.firstRow === 'Member 01', s);

  await ev("(() => { const sel = document.getElementById('admin-members-page'); sel.value = '3'; sel.dispatchEvent(new Event('change')); return true; })()");
  await sleep(300);
  s = await state();
  ok('choosing "Page 3" in the dropdown jumps there', s.label === 'Page 3 of 3' && s.firstRow === 'Member 61', s);

  await ev("AdminPanel.membersPage('next')");
  ok('Next on the last page asks the server for nothing', (await ev('window.__ranges.length')) === 5, await ev('window.__ranges'));

  // ── A slow earlier page must not paint over a newer one.
  await ev("window.__delay = { 2: 600 }; true");
  await ev("(async () => { const slow = AdminPanel.loadMembers(2); const fast = AdminPanel.loadMembers(1); await Promise.all([slow, fast]); return true; })()");
  s = await state();
  ok('a slow page 2 answering after page 1 does not replace it', s.label === 'Page 1 of 3' && s.firstRow === 'Member 01', s);
  await ev("window.__delay = {}; true");

  // ── The page disappears under the admin (accounts deleted): land on the last real one.
  await ev("AdminPanel.membersPage('last')");
  await ev("window.__total = 45; AdminPanel.loadMembers()");
  s = await state();
  ok('when page 3 stops existing, the reload lands on page 2 of 2', s.label === 'Page 2 of 2' && s.count === 'Showing 31–45 of 45 accounts', s);

  // ── The filters go back to page 1 (and must not throw: they once assigned a
  //    variable the pager removed, which strict mode turns into a ReferenceError).
  await ev("window.__total = 70; AdminPanel.membersPage('last')");
  let threw = null;
  try { await ev("(async () => { AdminPanel.setMemberVisibilityFilters(); await new Promise(r => setTimeout(r, 300)); return true; })()"); }
  catch (e) { threw = e.message; }
  s = await state();
  ok('changing a visibility filter returns to page 1 without an error', !threw && s.label === 'Page 1 of 3', threw || s);
  threw = null;
  try { await ev("AdminPanel.setMemberStatusFilter('active'); true"); } catch (e) { threw = e.message; }
  ok('changing the status filter does not throw', !threw, threw);
  await sleep(300);

  // ── One page: no pager.
  await ev("window.__total = 12; AdminPanel.loadMembers(1)");
  s = await state();
  ok('a single page shows no pager', !s.pagerShown && s.count === 'Showing 1–12 of 12 accounts', s);

  await ev("window.__total = 0; AdminPanel.loadMembers(1)");
  s = await state();
  ok('no members: "No accounts found." and no pager', !s.pagerShown && s.count === 'No accounts found.', s);

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  ws.close();
  quit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
