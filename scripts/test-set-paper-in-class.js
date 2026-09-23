'use strict';
// Stage 1 of the teacher redesign: setting a past paper WITHOUT leaving the
// class. Driven in a real browser.
//
//   node scripts/test-set-paper-in-class.js
//
// ⚠ THE FAULT THIS COVERS IS STRUCTURAL. The library is mounted on the teacher
//   BOARD; the classroom is a separate role="dialog" overlay that could not
//   reach it. So a teacher planning for a class left the class, crossed the
//   board, found a paper, and then picked that same class out of a list. The
//   test that matters is therefore not "does a button exist" but "is the class
//   ever chosen twice", and "is the teacher's own shelf left as they had it".
//
// ⚠ Nothing here writes to the database: Library.setForClass is stubbed.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const http = require('node:http');
const { spawn } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8907;
const DBG = 9341;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const get = (url) => new Promise((res, rej) => http.get(url, r => {
  let d = ''; r.on('data', c => d += c); r.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(e); } });
}).on('error', rej));

const MIME = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.pdf': 'application/pdf',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2',
};
const server = http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const abs = path.join(ROOT, rel);
  if (!abs.startsWith(ROOT) || !fs.existsSync(abs) || fs.statSync(abs).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(abs).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(abs).pipe(res);
});

let checks = 0, failed = 0;
const ok = (label, cond, detail) => {
  if (cond) { checks++; console.log('OK   ' + label); }
  else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail).slice(0, 400) : '')); }
};

(async () => {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-setpaper-'));
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG, '--user-data-dir=' + profile,
    '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });

  let version;
  for (let i = 0; i < 60 && !version; i++) {
    try { version = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); }
  }
  if (!version) { console.log('FAIL Chrome did not start'); process.exit(1); }

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
  await call('Network.setBypassServiceWorker', { bypass: true });
  await call('Network.setCacheDisabled', { cacheDisabled: true });
  await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });

  const ev = async expr => {
    const r = await call('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) {
      throw new Error(String((r.exceptionDetails.exception && r.exceptionDetails.exception.description)
        || r.exceptionDetails.text).slice(0, 600));
    }
    return r.result.value;
  };

  const pageErrors = [];
  await call('Runtime.addBinding', { name: '__report' }).catch(() => {});
  ws.addEventListener('message', e => {
    const m = JSON.parse(e.data);
    if (m.method === 'Runtime.bindingCalled' && m.params?.name === '__report') pageErrors.push(m.params.payload);
  });

  try {
    await call('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html` });
    for (let i = 0; i < 100; i++) {
      if (await ev(`typeof Library !== 'undefined'`)) break;
      await sleep(200);
    }
    await ev(`window.addEventListener('error', e => __report('error: ' + e.message));
              window.addEventListener('unhandledrejection', e => __report('reject: ' + (e.reason && e.reason.message || e.reason)));`);

    // The classroom module is a ROLE MODULE, loaded on demand.
    // ⚠ Check by BARE IDENTIFIER — these are const X = (() => {…})() at classic
    //   script top level and never land on window.
    await ev(`typeof RoleModules !== 'undefined' && RoleModules.ensure ? RoleModules.ensure('teacher') : null`);
    for (let i = 0; i < 100; i++) {
      if (await ev(`typeof TeacherClassroomDetail !== 'undefined'`)) break;
      await sleep(200);
    }
    ok('the classroom module loads', await ev(`typeof TeacherClassroomDetail === 'object'`));

    // Wait for the library's own data.
    await ev(`Auth.getParentProfile = () => ({ id: 'parent-test' }); Auth.getFamily = () => ({ id: 'fam-test' });`);
    await ev(`Library.load()`);
    for (let i = 0; i < 120; i++) {
      if (await ev(`Library.countForPack ? true : false`) && await ev(`(() => { try { Library.render(); } catch(_) {} return true; })()`)) break;
      await sleep(200);
    }

    // ══ 1. The chooser offers the paper as a first-class source ═══════════
    await ev(`TeacherClassroomDetail.showHomeworkChoice()`);
    await sleep(250);
    const cards = await ev(`(() => {
      const c = [...document.querySelectorAll('#tc-hw-choice .tc-hw-choice-card')];
      return { n: c.length, titles: c.map(b => b.querySelector('strong')?.textContent.trim()),
               handlers: c.map(b => (b.getAttribute('onclick')||'')) };
    })()`);
    // ⚠ FIVE since tapping a calendar day started opening this same chooser:
    //   a plain calendar note joined the four kinds of work. Pinning the count
    //   at four made a later, deliberate addition look like a regression — so
    //   what matters is that a past paper is among them, which the next check
    //   asserts by name.
    ok('the create-activity chooser offers every kind of thing', cards.n === 5, cards);
    ok('one of them is a past exam paper',
      cards.titles.some(t => /past exam paper/i.test(t || '')), cards.titles);
    ok('and it goes to the new flow, not to Resources',
      cards.handlers.some(h => /_choosePaper/.test(h)), cards.handlers);
    // ⚠ The Resources card used to claim it handled past papers, which is how a
    //   teacher ended up in a file list looking for one.
    ok('⚠ the Resources card no longer claims to handle past papers',
      !cards.titles.concat(await ev(`[...document.querySelectorAll('#tc-hw-choice .tc-hw-choice-card small')].map(s=>s.textContent)`))
        .some(t => /past paper/i.test(t || '') && !/A past exam paper/i.test(t || '')) ||
      !(await ev(`[...document.querySelectorAll('#tc-hw-choice .tc-hw-choice-card')].some(b => /Resource for pupils/.test(b.textContent) && /past paper/i.test(b.textContent))`)));

    // ══ 2. Opening the picker mounts a real shelf inside the class ════════
    // Give the classroom module a class to be "in".
    await ev(`TeacherClassroomDetail._choosePaper()`);
    await sleep(900);
    const panel = await ev(`(() => {
      const p = document.getElementById('tc-paper-pick');
      if (!p) return { open: false };
      const shelf = document.getElementById('tc-paper-shelf');
      const r = p.querySelector('.tc-paper-panel')?.getBoundingClientRect();
      return {
        open: true,
        chooserGone: !document.getElementById('tc-hw-choice'),
        books: shelf ? shelf.querySelectorAll('.lb-book').length : 0,
        chooseBtns: shelf ? shelf.querySelectorAll('.lb-choose').length : 0,
        assignBtns: shelf ? shelf.querySelectorAll('.lb-assign').length : 0,
        shareBtns: shelf ? shelf.querySelectorAll('.lb-share').length : 0,
        reportBtns: shelf ? shelf.querySelectorAll('.lb-report').length : 0,
        width: r ? Math.round(r.width) : 0,
        fitsPhone: r ? r.width <= 390 : false,
      };
    })()`);
    ok('the picker opens', panel.open, panel);
    ok('and replaces the chooser rather than stacking on it', panel.chooserGone, panel);
    ok('a real shelf is mounted INSIDE the class panel', panel.books > 0, panel);
    // ⚠ Three actions for one job is the confusion the mode exists to remove.
    ok('⚠ cards offer Choose only — no Assign, Share or Report',
      panel.chooseBtns > 0 && !panel.assignBtns && !panel.shareBtns && !panel.reportBtns, panel);
    ok('the panel fits a phone', panel.fitsPhone, panel);

    // ══ 3. The shelf scrolls inside the panel, not the page ═══════════════
    const scrollable = await ev(`(() => {
      const s = document.getElementById('tc-paper-shelf');
      const cs = getComputedStyle(s);
      return { overflowY: cs.overflowY, maxH: cs.maxHeight,
               bounded: s.getBoundingClientRect().height < document.documentElement.clientHeight };
    })()`);
    ok('⚠ the shelf is bounded and scrolls itself — the Choose buttons stay reachable',
      scrollable.overflowY === 'auto' && scrollable.bounded, scrollable);

    // ══ 4. Choosing a paper moves to the day, class never re-chosen ═══════
    const chosen = await ev(`(() => {
      document.querySelector('#tc-paper-shelf .lb-choose').click();
      const s2 = document.getElementById('tc-paper-step2');
      return {
        step1Hidden: document.getElementById('tc-paper-step1').classList.contains('hidden'),
        step2Shown: !s2.classList.contains('hidden'),
        title: s2.querySelector('.tc-paper-chosen strong')?.textContent.trim(),
        // ⚠ THE WHOLE POINT: no class picker anywhere in this flow.
        classPickers: s2.querySelectorAll('select, input[type=checkbox]').length,
        whenOn: [...s2.querySelectorAll('.lb-when.is-on')].map(b => b.dataset.when),
        dateHidden: document.getElementById('tc-paper-date-row').classList.contains('hidden'),
      };
    })()`);
    ok('choosing a paper moves to the day step', chosen.step1Hidden && chosen.step2Shown, chosen);
    ok('and names the paper it is about', (chosen.title || '').length > 3, chosen);
    ok('⚠ the class is never chosen again — no picker in the flow',
      chosen.classPickers === 0, chosen);
    ok('⚠ Tomorrow is preselected, not Today', chosen.whenOn.join() === 'tomorrow', chosen);
    ok('the date box stays hidden until "Pick a day"', chosen.dateHidden, chosen);
    // A picture of the panel a teacher actually sees, at the step that matters.
    {
      const shot = await call('Page.captureScreenshot', { format: 'png' });
      const p = path.join(os.tmpdir(), 'set-paper-in-class.png');
      fs.writeFileSync(p, Buffer.from(shot.data, 'base64'));
      console.log('     screenshot: ' + p);
    }

    // ══ 5. What it refuses ════════════════════════════════════════════════
    await ev(`TeacherClassroomDetail.setPaperWhen('pick')`);
    await sleep(120);
    ok('"Pick a day" reveals the date box', await ev(
      `!document.getElementById('tc-paper-date-row').classList.contains('hidden')`));
    await ev(`document.getElementById('tc-paper-date').value = ''`);
    await ev(`TeacherClassroomDetail.savePaper()`);
    await sleep(250);
    ok('⚠ "Pick a day" with no date is refused, not treated as "no date"',
      await ev(`/Choose a day/.test(document.getElementById('tc-paper-status').textContent)`),
      await ev(`document.getElementById('tc-paper-status').textContent`));

    // ══ 6. It sends exactly what setForClass expects ══════════════════════
    const sent = await ev(`(async () => {
      window.__set = null;
      const real = Library.setForClass;
      Library.setForClass = async (o) => { window.__set = o; return { dated: !!o.dueDate }; };
      TeacherClassroomDetail.setPaperWhen('tomorrow');
      document.getElementById('tc-paper-note').value = 'Section A only';
      await TeacherClassroomDetail.savePaper();
      Library.setForClass = real;
      return window.__set;
    })()`);
    ok('the paper and the day are sent together',
      // ⚠ A PLAIN Node regex literal — not a string sent into the page. `\\d`
      //   here would match a literal backslash and fail on a correct date.
      sent && sent.doc && /^\d{4}-\d{2}-\d{2}$/.test(sent.dueDate || ''), sent && { doc: !!sent.doc, dueDate: sent.dueDate });
    ok('with the note', sent && sent.note === 'Section A only', sent && sent.note);

    // ══ 7. The teacher's own shelf is handed back untouched ═══════════════
    // ⚠ The picker borrows _target/_openShelf/_query/filters. Not restoring
    //   leaves the board's Past Exam Papers tab filtered to this class's grade
    //   with nothing on screen explaining why.
    const restored = await ev(`(() => {
      // Set a distinctive browsing position, open and close a picker, compare.
      Library.mountInto('library-body');
      Library.setYear('');
      Library.search('mathematics');
      const before = { target: 'library-body', q: 'mathematics' };
      Library.openPicker({ hostId: 'tc-paper-shelf', grade: 4, forLabel: 'x', onPick(){} });
      const during = document.getElementById('lb-search')?.value;
      Library.closePicker();
      Library.render();
      return { before, during, after: document.getElementById('lb-search')?.value,
               paintedBack: document.querySelectorAll('#library-body .lb-book, #library-body .lb-note').length > 0 };
    })()`);
    ok('⚠ the search the teacher typed survives a picker round trip',
      restored.after === 'mathematics', restored);
    ok('and the board shelf paints again afterwards', restored.paintedBack, restored);

    // ══ 8. Closing ════════════════════════════════════════════════════════
    await ev(`TeacherClassroomDetail._choosePaper()`);
    await sleep(600);
    await ev(`TeacherClassroomDetail.closePaperPick()`);
    await sleep(150);
    ok('the picker closes cleanly', await ev(`!document.getElementById('tc-paper-pick')`));


    await sleep(300);
    const real = pageErrors.filter(e => !/favicon|Failed to fetch|NetworkError|supabase|401|403/i.test(e));
    ok('no uncaught error during any of it', real.length === 0, real.slice(0, 5));

  } catch (e) {
    failed++;
    console.log('FAIL threw -- ' + e.message);
  }

  console.log(`\n${checks} passed, ${failed} failed`);
  ws.close(); chrome.kill(); server.close();
  process.exit(failed ? 1 : 0);
})();
