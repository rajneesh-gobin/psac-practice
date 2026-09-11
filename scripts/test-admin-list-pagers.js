'use strict';
// Admin › Teachers, Reports, Roles and the Question Manager: numbered pages
// (« First · ‹ Prev · [Page X of Y] · Next › · Last »), measured in a real
// browser. Members has its own, deeper test (test-admin-members-pager.js); this
// one proves the shared pager is wired into every other paged list the same way.
//
// For each list, with 70 fake rows served by stubs of the real data calls:
// page 1 reads "Showing 1–N of 70", the pager says "Page 1 of Y" with First/Prev
// disabled, Next REPLACES the rows rather than appending, Last disables
// Next/Last, and the pager fits a 360px phone.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-admin-list-pagers.js
// ⚠ Served over file:// (Chrome for Testing here cannot reach 127.0.0.1), and
//   the page target's URL is asserted before anything is driven.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9393;
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0;
const ok = (label, cond, detail) => { if (cond) { checks++; console.log('OK   ' + label); } else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail) : '')); } };

const LISTS = [
  { name: 'Teachers', load: 'AdminPanel.loadTeachers(1)', go: 'AdminPanel.teachersPage', prefix: 'admin-teachers',
    count: 'admin-teachers-count', list: 'admin-teachers-list', size: 30, noun: 'teachers', mark: 'Person' },
  { name: 'Roles', load: 'AdminPanel.loadRoles(1)', go: 'AdminPanel.rolesPage', prefix: 'admin-roles',
    count: 'admin-roles-count', list: 'admin-roles-list', size: 40, noun: 'administrators', mark: 'Person' },
  { name: 'Reports', load: 'AdminPanel.loadReports(1)', go: 'AdminPanel.reportsPage', prefix: 'admin-reports',
    count: 'admin-reports-count', list: 'admin-reports-list', size: 30, noun: 'reports', mark: 'Report' },
  { name: 'Question Manager', load: 'AdminPanel.qmSearch()', go: 'AdminPanel.qmPage', prefix: 'qm',
    count: 'qm-count', list: 'qm-list', size: 50, noun: 'questions', mark: 'Question' },
];

(async () => {
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG,
    '--user-data-dir=' + fs.mkdtempSync(path.join(os.tmpdir(), 'psac-listpagers-')),
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
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof RoleModules !== 'undefined' && typeof _sb !== 'undefined' && !!_sb"); } catch (_) {} }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: the page target is ' + url + ', not the file we navigated to.'); quit(1); }
  ok('app loaded with a Supabase client to stub', ready === true);
  await sleep(2000);
  ok('the admin module loads', await ev(`new Promise(res => {
    RoleModules.withGroup('admin', () => res(typeof AdminPanel !== 'undefined'));
    setTimeout(() => res(typeof AdminPanel !== 'undefined'), 8000);
  })`));

  // Stubs of the real data calls: profiles (Teachers, Roles), questions (QM),
  // and the two Store calls Reports go through. Everything else is the real code.
  await ev(`(() => {
    window.__total = 70;
    const pad = i => String(i).padStart(3, '0');
    const profile = i => ({ id: '00000000-0000-4000-8000-' + String(i).padStart(12, '0'), full_name: 'Person ' + pad(i),
      role: 'teacher', is_super_admin: false, disabled: false, expires_at: null,
      created_at: new Date(Date.UTC(2026, 0, 1) - i * 864e5).toISOString(), teacher_status: 'approved', teacher_tier: 'unverified' });
    const question = i => ({ id: 'q-' + pad(i), subject_id: 'grade5-english', chapter_id: 'g5e-grammar', difficulty: 2,
      data: { question: 'Question ' + pad(i) + ' text', options: ['a', 'b'], answer: 'a' }, protected: false });
    _sb.from = table => {
      let from = 0, to = 999;
      const q = {
        then(res, rej) {
          let out = { data: [], count: 0, error: null };
          if (table === 'profiles' || table === 'questions') {
            const rows = [];
            for (let i = from; i <= Math.min(to, window.__total - 1); i++) rows.push(table === 'questions' ? question(i + 1) : profile(i + 1));
            out = { data: rows, count: window.__total, error: null };
          }
          return Promise.resolve(out).then(res, rej);
        },
        range(a, b) { from = a; to = b; return q; },
      };
      ['select','in','order','or','eq','ilike','is','limit','neq','not','gte','lte','filter','match']
        .forEach(m => { q[m] = () => q; });
      q.maybeSingle = () => q; q.single = () => q;
      return q;
    };
    Auth.isSuperAdmin = () => true;
    if (typeof QuestionLoader !== 'undefined') QuestionLoader.loadAllForGrade = async () => {};
    Store.countReports = async () => window.__total;
    Store.loadReports = async (offset, limit) => {
      const rows = [];
      for (let i = offset; i < Math.min(offset + limit, window.__total); i++)
        rows.push({ id: 'r-' + pad(i + 1), question_id: 'Report ' + pad(i + 1), question_text: 'x', message: 'm',
                    status: 'open', report_type: 'wrong_answer', created_at: new Date().toISOString(), students: null });
      return rows;
    };
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    ${JSON.stringify(LISTS.map(l => l.list))}.forEach(id => {
      for (let n = document.getElementById(id); n; n = n.parentElement) n.classList.remove('hidden');
    });
    return true;
  })()`);

  for (const L of LISTS) {
    const state = () => ev(`(() => {
      const p = ${JSON.stringify(L.prefix)};
      const sel = document.getElementById(p + '-page'), pager = document.getElementById(p + '-pager');
      const btn = k => document.getElementById(p + '-' + k);
      const marks = [...new Set((document.getElementById(${JSON.stringify(L.list)}).textContent
        .match(/${L.mark} \\d{3}/g) || []))].sort();
      const rights = [...pager.querySelectorAll('button, select')].map(e => e.getBoundingClientRect().right);
      return { count: document.getElementById(${JSON.stringify(L.count)}).textContent,
               shown: !pager.classList.contains('hidden') && pager.getBoundingClientRect().height > 0,
               label: sel.selectedOptions[0]?.textContent || null,
               first: btn('first').disabled, prev: btn('prev').disabled, next: btn('next').disabled, last: btn('last').disabled,
               firstMark: marks[0] || null, rows: marks.length,
               maxRight: Math.max(...rights), vw: innerWidth };
    })()`);
    const pages = Math.ceil(70 / L.size), n = L.size;
    const pad = i => String(i).padStart(3, '0');
    console.log('\n-- ' + L.name);

    await ev(L.load);
    let s = await state();
    ok(`${L.name}: page 1 says "Showing 1–${n} of 70 ${L.noun}"`, s.count === `Showing 1–${n} of 70 ${L.noun}`, s.count);
    ok(`${L.name}: the pager shows "Page 1 of ${pages}"`, s.shown && s.label === `Page 1 of ${pages}`, s);
    ok(`${L.name}: page 1 lists rows 001–${pad(n)}`, s.firstMark === `${L.mark} 001` && s.rows === n, s);
    ok(`${L.name}: First/Prev disabled, Next/Last enabled`, s.first && s.prev && !s.next && !s.last, s);
    ok(`${L.name}: the pager fits a 360px phone`, s.maxRight <= s.vw, s);

    await ev(`${L.go}('next')`);
    s = await state();
    ok(`${L.name}: Next shows page 2 in place of page 1`,
       s.label === `Page 2 of ${pages}` && s.firstMark === `${L.mark} ${pad(n + 1)}` && s.rows === Math.min(n, 70 - n), s);

    await ev(`${L.go}('last')`);
    s = await state();
    const from = (pages - 1) * n + 1;
    ok(`${L.name}: Last shows "Showing ${from}–70 of 70" with Next/Last disabled`,
       s.count === `Showing ${from}–70 of 70 ${L.noun}` && s.next && s.last && !s.first, s);

    await ev(`${L.go}('first')`);
    s = await state();
    ok(`${L.name}: First goes back to page 1`, s.label === `Page 1 of ${pages}` && s.firstMark === `${L.mark} 001`, s);
  }

  // Reports: the total is re-read on every page, so a page emptied by deletes
  // lands on the last real one instead of "Page 3 of 1".
  console.log('\n-- Reports after deletes');
  await ev("AdminPanel.reportsPage('last')");
  await ev("window.__total = 25; AdminPanel.loadReports()");
  const after = await ev(`({ count: document.getElementById('admin-reports-count').textContent,
    shown: !document.getElementById('admin-reports-pager').classList.contains('hidden') })`);
  ok('a report page emptied by deletes lands on the last real page', after.count === 'Showing 1–25 of 25 reports' && !after.shown, after);

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  ws.close();
  quit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
