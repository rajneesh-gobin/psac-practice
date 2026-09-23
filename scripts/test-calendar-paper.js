'use strict';
// Setting a past paper for one child, from the day the parent tapped.
//
//   node scripts/test-calendar-paper.js
//
// The reported gap: a parent could only produce a calendar note by tapping a
// day, while setting a paper meant leaving for the Past Exam Papers tab and
// typing the date again — the same complaint the teacher's class calendar had.
//
// Driven in a real browser against the real functions. Supabase is stubbed at
// `_sb.from` (the client is a const, its methods are not), so the real
// Calendar.setPaper() and Library.assign() run end to end without a family.
//
// ⚠ THE POINT OF THIS TEST IS THAT THERE IS NO SECOND ASSIGN FLOW. It asserts
//   the calendar reaches the LIBRARY'S OWN picker and the LIBRARY'S OWN sheet,
//   carrying the day and the child into them. If someone later copies that
//   sheet into calendar.js, the prefill checks below keep passing while the
//   partial-failure reporting and the double-press guard quietly do not exist.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const PORT = 8841, DBG = 9381;
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
const ok = (label, cond, detail) => { assert(cond, label + (detail === undefined ? '' : ' — ' + JSON.stringify(detail).slice(0, 500))); checks++; console.log('✓ ' + label); };

// The day the parent taps. Fixed and in the future, so a run at 23:59 local
// cannot roll onto a different day between the tap and the assert.
const DAY = '2027-03-11';

(async () => {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-calpaper-'));
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG, '--user-data-dir=' + profile,
    '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });

  let version;
  for (let i = 0; i < 60 && !version; i++) {
    try { version = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); }
  }
  if (!version) { console.error('FAIL Chrome did not start'); process.exit(1); }

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
  await call('Page.enable'); await call('Runtime.enable'); await call('Network.enable');
  // ⚠ The service worker serves a stale shell; without this the run measures
  //   the PREVIOUS calendar.js and reports a fix that never landed.
  await call('Network.setBypassServiceWorker', { bypass: true });
  await call('Network.setCacheDisabled', { cacheDisabled: true });
  await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });

  const ev = async expr => {
    const r = await call('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) {
      throw new Error(String((r.exceptionDetails.exception && r.exceptionDetails.exception.description)
        || r.exceptionDetails.text).slice(0, 800));
    }
    return r.result.value;
  };

  let exitCode = 0;
  try {
    await call('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html` });
    for (let i = 0; i < 120; i++) {
      if (await ev(`typeof Calendar !== 'undefined' && typeof Library !== 'undefined'`)) break;
      await sleep(200);
    }
    for (let i = 0; i < 120; i++) {
      if (await ev(`[...document.querySelectorAll('.screen')].some(s => !s.classList.contains('hidden'))`)) break;
      await sleep(200);
    }
    await sleep(500);

    // ── the world: one adult, TWO children, one paper on the shelf ──────────
    // ⚠ Two children on purpose. With one child the library's own "tick the
    //   only option" shortcut would pass this test without the calendar ever
    //   naming a child, and the bug it hides — the paper going to the wrong
    //   sibling — is exactly the one worth catching.
    await ev(`(() => {
      window.__made = [];
      Auth.getParentProfile = () => ({ id: 'p1', role: 'parent' });
      Auth.getFamily = () => ({ id: 'f1' });
      Store.getAccounts = () => ([
        { id: 'kidA', name: 'Ana', grade: 6, avatar: '🧒' },
        { id: 'kidB', name: 'Ben', grade: 4, avatar: '👦' },
      ]);
      Store.getFamilyStudents = async () => ([
        { id: 'kidA', display_name: 'Ana', grade: 6, avatar: '🧒' },
        { id: 'kidB', display_name: 'Ben', grade: 4, avatar: '👦' },
      ]);
      Store.createAssignments = async (ids, parentId, opts) => {
        window.__made.push({ ids, parentId, opts });
        return { ok: true, assigned: ids.length, results: ids.map(id => ({ studentId: id, ok: true })) };
      };
      const rows = {
        library_sections: [{ id: 'sec6', parent_id: null, slug: 'g6', name: 'Grade 6', grade: 6, icon: '📗', sort_order: 1, pack_id: null, status: 'published' }],
        library_documents: [{ id: 'doc1', section_id: 'sec6', filename: 'psac-2019-maths.pdf', storage: 'seeded',
          title: 'PSAC 2019 Mathematics', doc_type: 'past_paper', board: 'MES', year: 2019, subject: 'Mathematics',
          grade: 6, pages: 12, bytes: 900000, pack_id: null, credit_name: null, source: null, search_text: 'psac 2019 maths' }],
      };
      // One chainable builder for every table: anything not seeded answers with
      // no rows rather than throwing, so a new read inside render() cannot fail
      // this test for a reason that has nothing to do with papers.
      const builder = (table) => {
        const b = {};
        for (const m of ['select','eq','neq','not','in','is','gte','lte','lt','gt','order','limit','filter','or','contains']) b[m] = () => b;
        b.single = () => Promise.resolve({ data: null, error: null });
        b.then = (res, rej) => Promise.resolve({ data: rows[table] || [], error: null }).then(res, rej);
        return b;
      };
      _sb.from = table => builder(table);
      return true;
    })()`);

    await ev(`Calendar.setStudent('kidB')`);
    await ev(`Calendar.render()`);
    await sleep(400);

    // ══ 1. A day offers the paper, not just a note ═════════════════════════
    const adultRow = await ev(`(() => {
      Calendar.openDay('${DAY}');
      const list = document.getElementById('day-events-list');
      const btns = [...list.querySelectorAll('button')].map(b => b.textContent.trim());
      return { btns, html: list.innerHTML.length };
    })()`);
    ok('tapping a day still offers + Add Event', adultRow.btns.some(t => /Add Event/.test(t)), adultRow.btns);
    ok('and now offers a past paper on that day', adultRow.btns.some(t => /Set a past paper/.test(t)), adultRow.btns);

    // ══ 2. A CHILD opening the same modal is offered no such thing ═════════
    // ⚠ The calendar screen is the child's too. Library.canAssign() is the
    //   adult check; without it a child sets their own homework.
    const kidRow = await ev(`(() => {
      const real = Auth.getParentProfile;
      Auth.getParentProfile = () => null;
      Calendar.openDay('${DAY}');
      const btns = [...document.getElementById('day-events-list').querySelectorAll('button')].map(b => b.textContent.trim());
      Auth.getParentProfile = real;
      return btns;
    })()`);
    ok('a child is not offered the paper button', !kidRow.some(t => /past paper/i.test(t)), kidRow);
    ok('but the child still sees + Add Event', kidRow.some(t => /Add Event/.test(t)), kidRow);

    // ══ 3. The picker is the library's own, opened on the child's grade ════
    await ev(`Calendar.openDay('${DAY}'); Calendar.setPaper('${DAY}')`);
    for (let i = 0; i < 60; i++) {
      if (await ev(`!!document.querySelector('#cal-paper-shelf .lb-choose')`)) break;
      await sleep(200);
    }
    const picker = await ev(`(() => {
      const m = document.getElementById('modal-cal-paper');
      const choose = document.querySelector('#cal-paper-shelf .lb-choose');
      return {
        open: m && !m.classList.contains('hidden'),
        dayClosed: document.getElementById('modal-day-events').classList.contains('hidden'),
        title: (document.getElementById('cal-paper-title') || {}).textContent || '',
        hint: (document.getElementById('cal-paper-hint') || {}).textContent || '',
        choose: !!choose,
        shelfHasAssign: !!document.querySelector('#cal-paper-shelf .lb-assign'),
      };
    })()`);
    ok('the paper sheet opens and the day modal closes behind it', picker.open && picker.dayClosed, picker);
    ok('it names the child it is for', /Ben/.test(picker.title), picker.title);
    ok('and the day it is due, in words', /March/.test(picker.hint) && /11/.test(picker.hint), picker.hint);
    ok('the shelf is the library picker — Choose, not Assign', picker.choose && !picker.shelfHasAssign, picker);

    // ══ 4. Choosing carries the day AND the child into the library's sheet ══
    await ev(`Library.pick('doc1')`);
    await sleep(500);
    const sheet = await ev(`(() => {
      const wrap = document.getElementById('lb-as-when');
      const pressed = [...(wrap ? wrap.querySelectorAll('[data-when]') : [])]
        .filter(b => b.getAttribute('aria-pressed') === 'true').map(b => b.dataset.when);
      const ticked = [...document.querySelectorAll('#lb-as-who input:checked')].map(b => b.value);
      return {
        assignOpen: !document.getElementById('modal-library-assign').classList.contains('hidden'),
        pickerClosed: document.getElementById('modal-cal-paper').classList.contains('hidden'),
        date: (document.getElementById('lb-as-date') || {}).value || '',
        dateRowShown: !document.getElementById('lb-as-date-row').classList.contains('hidden'),
        pressed, ticked,
        title: (document.getElementById('lb-as-title') || {}).textContent || '',
      };
    })()`);
    ok('the library assign sheet opens, picker gone', sheet.assignOpen && sheet.pickerClosed, sheet);
    ok('it names the paper that was chosen', /PSAC 2019/.test(sheet.title), sheet.title);
    ok('"Pick a day" is the pressed choice, not Tomorrow', sheet.pressed.length === 1 && sheet.pressed[0] === 'pick', sheet.pressed);
    ok('the date box carries the tapped day and is visible', sheet.date === DAY && sheet.dateRowShown, sheet);
    ok('the named child is ticked — and only that child', sheet.ticked.length === 1 && sheet.ticked[0] === 'kidB', sheet.ticked);

    // ══ 5. Set work writes ONE dated library assignment ════════════════════
    await ev(`Library.confirmAssign()`);
    await sleep(600);
    const made = await ev(`window.__made`);
    ok('exactly one assignment was created', made.length === 1, made);
    ok('for the child whose calendar it was', made[0] && made[0].ids.length === 1 && made[0].ids[0] === 'kidB', made[0]);
    ok('carrying the paper and the day', made[0] && made[0].opts.libraryDocumentId === 'doc1' && made[0].opts.dueDate === DAY, made[0] && made[0].opts);
    ok('and no chapter — a paper is not a chapter drill', made[0] && !made[0].opts.chapterId, made[0] && made[0].opts);
    const closed = await ev(`document.getElementById('modal-library-assign').classList.contains('hidden')`);
    ok('the sheet closes, so Set work cannot be pressed twice', closed === true);

    console.log(`\n${checks} checks passed`);
  } catch (e) {
    console.error('\nFAIL ' + (e && e.message ? e.message : e));
    exitCode = 1;
  } finally {
    try { ws.close(); } catch (_) {}
    try { chrome.kill(); } catch (_) {}
    server.close();
  }
  process.exit(exitCode);
})();
