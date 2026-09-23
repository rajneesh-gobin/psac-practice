'use strict';
// Assigning a paper, driven in a REAL browser.
//
//   node scripts/test-assign-a-paper-browser.js
//
// ⚠ WHY A BROWSER. The static test proves the source reads correctly; it cannot
//   prove the button appears, that the sheet opens, that the chips repaint, or
//   that .lb-assign has any colour at all. The Tailwind Play CDN only generates
//   rules for classes present at its INITIAL scan, so a card injected by
//   innerHTML can carry a perfectly good class name and be styled by nothing —
//   which is invisible in the source and obvious on screen.
//
// ⚠ Fresh --user-data-dir, service worker bypassed, cache disabled: otherwise
//   you measure the previous shell and report a fix that never landed.
//
// ⚠ Nothing here writes to the database. The two confirm paths are exercised
//   with Store and Supabase stubbed, so this can run against production safely.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const http = require('node:http');
const { spawn } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8901;
const DBG = 9335;
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
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-assign-'));
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG,
    '--user-data-dir=' + profile,
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

  // ⚠ A thrown error inside a render is the failure mode this whole file is
  //   for — _esc() not existing in app.js threw at render time and passed every
  //   static check. Collect them and fail on any.
  const pageErrors = [];
  await call('Runtime.addBinding', { name: '__report' }).catch(() => {});
  ws.addEventListener('message', e => {
    const m = JSON.parse(e.data);
    if (m.method === 'Runtime.bindingCalled' && m.params?.name === '__report') pageErrors.push(m.params.payload);
  });

  try {
    await call('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html` });
    for (let i = 0; i < 100; i++) {
      if (await ev(`typeof Library !== 'undefined' && typeof Store !== 'undefined'`)) break;
      await sleep(200);
    }
    await ev(`window.addEventListener('error', e => __report('error: ' + e.message));
              window.addEventListener('unhandledrejection', e => __report('reject: ' + (e.reason && e.reason.message || e.reason)));`);

    ok('Library and Store both loaded', await ev(`typeof Library === 'object' && typeof Store === 'object'`));

    // ══ 1. The sheet exists and is closed ═════════════════════════════════
    ok('the assign sheet is in the document and starts hidden', await ev(
      `!!document.getElementById('modal-library-assign')
       && document.getElementById('modal-library-assign').classList.contains('hidden')`));

    // ══ 2. Only adults get the button ═════════════════════════════════════
    // ⚠ canAssign() reads Auth.getParentProfile(). A signed-out reader, and
    //   every child, must not see it.
    const asChild = await ev(`Library.canAssign()`);
    ok('a signed-out reader cannot assign', asChild === false, { canAssign: asChild });

    await ev(`window.__realProfile = Auth.getParentProfile;
              Auth.getParentProfile = () => ({ id: 'parent-test' });
              Auth.getFamily = () => ({ id: 'fam-test' });`);
    ok('an adult can', await ev(`Library.canAssign()`) === true);

    // ══ 3. The button appears ON a card, and is styled ════════════════════
    for (let i = 0; i < 100; i++) {
      if (await ev(`[...document.querySelectorAll('.screen')].some(s => !s.classList.contains('hidden'))`)) break;
      await sleep(200);
    }
    await sleep(500);
    await ev(`Library.open()`);
    for (let i = 0; i < 120; i++) {
      if (await ev(`document.querySelectorAll('#library-body .lb-book').length > 0`)) break;
      await sleep(200);
    }
    // Repaint now that canAssign() answers true.
    await ev(`Library.render()`);
    await sleep(300);

    const btn = await ev(`(() => {
      const b = document.querySelector('#library-body .lb-assign');
      if (!b) return { found: false, cards: document.querySelectorAll('#library-body .lb-book').length };
      const cs = getComputedStyle(b);
      const r = b.getBoundingClientRect();
      return { found: true, text: b.textContent.trim(), colour: cs.color, weight: cs.fontWeight,
               cursor: cs.cursor, w: Math.round(r.width), h: Math.round(r.height) };
    })()`);
    ok('an Assign button is rendered on a card', btn.found, btn);
    // ⚠ THE TAILWIND TRAP: an unstyled button inherits and reads as plain text.
    //   rgb(0,0,0) or the shelf's own chalk colour would mean the rule did not
    //   apply at all.
    ok('and it actually has its own colour — the CSS rule applied',
      btn.found && btn.colour !== 'rgb(0, 0, 0)' && btn.weight === '700', btn);
    ok('and it is big enough to tap', btn.found && btn.w > 40 && btn.h >= 12, btn);

    // ══ 4. Opening the sheet ══════════════════════════════════════════════
    const firstId = await ev(`(() => {
      const b = document.querySelector('#library-body .lb-assign');
      return (b.getAttribute('onclick').match(/'([^']+)'/) || [])[1];
    })()`);
    await ev(`Library.assign(${JSON.stringify(firstId)})`);
    await sleep(400);
    const open = await ev(`(() => {
      const m = document.getElementById('modal-library-assign');
      return { shown: !m.classList.contains('hidden'),
               title: document.getElementById('lb-as-title').textContent.trim(),
               dateRowHidden: document.getElementById('lb-as-date-row').classList.contains('hidden'),
               pressed: [...document.querySelectorAll('#lb-as-when [data-when]')]
                 .filter(b => b.getAttribute('aria-pressed') === 'true').map(b => b.dataset.when) };
    })()`);
    ok('the sheet opens', open.shown, open);
    ok('and names the paper', open.title.length > 3, open);
    // ⚠ Tomorrow, not today: work set for today is overdue the moment it exists.
    ok('⚠ Tomorrow is preselected', open.pressed.join() === 'tomorrow', open);
    ok('and the date box is hidden until "Pick a day"', open.dateRowHidden, open);

    // ══ 5. The chips ══════════════════════════════════════════════════════
    await ev(`Library.setAssignWhen('pick')`);
    const picked = await ev(`({
      dateRowHidden: document.getElementById('lb-as-date-row').classList.contains('hidden'),
      value: document.getElementById('lb-as-date').value,
      pressed: [...document.querySelectorAll('#lb-as-when [data-when]')]
        .filter(b => b.getAttribute('aria-pressed') === 'true').map(b => b.dataset.when),
      onCount: document.querySelectorAll('#lb-as-when .is-on').length,
    })`);
    ok('"Pick a day" reveals the date box', !picked.dateRowHidden, picked);
    ok('prefilled with tomorrow rather than empty', /^\d{4}-\d{2}-\d{2}$/.test(picked.value), picked);
    ok('exactly one chip is lit at a time', picked.onCount === 1 && picked.pressed.join() === 'pick', picked);

    await ev(`Library.setAssignWhen('anytime')`);
    ok('and choosing "Any time" hides it again', await ev(
      `document.getElementById('lb-as-date-row').classList.contains('hidden')`));

    // ⚠ WAIT OUT THE TRANSITION BEFORE MEASURING. .lb-when carries
    //   "transition: background .12s", and getComputedStyle() during a
    //   transition returns the CURRENT animated value — measured immediately
    //   after the class change it reports the OLD colour exactly, so the lit and
    //   unlit chips compare equal and the assertion fails on working CSS. This
    //   cost a round of chasing a specificity bug that did not exist.
    await sleep(250);
    // The lit chip must be visibly different, not just aria-marked.
    const chipPaint = await ev(`(() => {
      const on = document.querySelector('#lb-as-when .is-on');
      const off = [...document.querySelectorAll('#lb-as-when [data-when]')].find(b => !b.classList.contains('is-on'));
      return { on: on && getComputedStyle(on).backgroundColor, off: off && getComputedStyle(off).backgroundColor };
    })()`);
    ok('the chosen chip is painted differently from the rest',
      chipPaint.on && chipPaint.off && chipPaint.on !== chipPaint.off, chipPaint);

    // ⚠ BUILD THE LIST THROUGH THE REAL assign(), not by injecting markup. A
    //   hand-written stub proves nothing about the classes the real code emits
    //   — and the Tailwind Play CDN only generates rules for classes present at
    //   its initial scan, so whether an injected label stacks or runs inline is
    //   exactly the kind of thing only the real path can answer.
    await ev(`Store.getFamilyStudents = async () => ([
      { id: 'k1', display_name: 'Aanya', avatar: '🦊', grade: 6 },
      { id: 'k2', display_name: 'Vikram', avatar: '🐼', grade: 4 },
    ])`);
    await ev(`Library.assign(${JSON.stringify(firstId)})`);
    await sleep(600);

    const whoLayout = await ev(`(() => {
      const labels = [...document.querySelectorAll('#lb-as-who label')];
      return {
        n: labels.length,
        display: labels.map(l => getComputedStyle(l).display),
        tops: labels.map(l => Math.round(l.getBoundingClientRect().top)),
        names: labels.map(l => l.textContent.trim()),
      };
    })()`);
    ok('both children are listed by name and grade',
      whoLayout.n === 2 && /Aanya/.test(whoLayout.names[0]) && /Grade 6/.test(whoLayout.names[0]), whoLayout);
    // ⚠ ONE PER LINE. Two children running together on one row is unreadable,
    //   and it is a tap target problem before it is a beauty problem.
    ok('⚠ each child is on its own line',
      whoLayout.tops.length === 2 && whoLayout.tops[1] > whoLayout.tops[0], whoLayout);

    {
      const shot = await call('Page.captureScreenshot', { format: 'png' });
      const p = require('node:path').join(require('node:os').tmpdir(), 'assign-sheet.png');
      fs.writeFileSync(p, Buffer.from(shot.data, 'base64'));
      console.log('     screenshot: ' + p);
    }

    // ══ 6. What it refuses ════════════════════════════════════════════════
    await ev(`document.querySelectorAll('#lb-as-who input').forEach(i => i.checked = false)`);
    await ev(`Library.confirmAssign()`);
    await sleep(250);
    ok('assigning to nobody is refused, with a reason on screen', await ev(
      `/Tick at least one/.test(document.getElementById('lb-as-status').textContent)`),
      await ev(`document.getElementById('lb-as-status').textContent`));

    // ⚠ "Pick a day" with the date cleared must NOT fall through to "any time".
    await ev(`(() => {
      const host = document.getElementById('lb-as-who');
      host.innerHTML = '<label><input type="checkbox" data-kind="child" value="kid-1" checked></label>';
      Library.setAssignWhen('pick');
      document.getElementById('lb-as-date').value = '';
    })()`);
    await ev(`Library.confirmAssign()`);
    await sleep(250);
    ok('⚠ "Pick a day" with no date is refused, not silently treated as "any time"',
      await ev(`/Choose a day/.test(document.getElementById('lb-as-status').textContent)`),
      await ev(`document.getElementById('lb-as-status').textContent`));

    // ══ 7. A real assign call, with the Store stubbed ═════════════════════
    const sent = await ev(`(async () => {
      window.__sent = null;
      const real = Store.createAssignments;
      Store.createAssignments = async (ids, pid, opts) => {
        window.__sent = { ids, pid, opts };
        return { ok: true, assigned: ids.length, results: [] };
      };
      document.getElementById('lb-as-who').innerHTML =
        '<label><input type="checkbox" data-kind="child" value="kid-1" checked></label>' +
        '<label><input type="checkbox" data-kind="child" value="kid-2" checked></label>';
      Library.setAssignWhen('tomorrow');
      document.getElementById('lb-as-note').value = 'Section A only';
      await Library.confirmAssign();
      Store.createAssignments = real;
      return window.__sent;
    })()`);
    ok('both ticked children are sent in ONE call', sent && sent.ids.join() === 'kid-1,kid-2', sent);
    ok('the paper travels as libraryDocumentId, never as a chapter',
      sent && sent.opts.libraryDocumentId === firstId && !sent.opts.chapterId, sent);
    ok('the due date is a plain YYYY-MM-DD, not an ISO timestamp',
      sent && /^\d{4}-\d{2}-\d{2}$/.test(sent.opts.dueDate), sent && sent.opts.dueDate);
    ok('the note is carried', sent && sent.opts.note === 'Section A only', sent);
    ok('and the sheet closes on success', await ev(
      `document.getElementById('modal-library-assign').classList.contains('hidden')`));

    // ⚠ A partial failure must be REPORTED, not rounded up to success.
    const partial = await ev(`(async () => {
      const real = Store.createAssignments;
      Store.createAssignments = async (ids) => ({ ok: false, assigned: 1, results: [] });
      await Library.assign(${JSON.stringify(firstId)});
      document.getElementById('lb-as-who').innerHTML =
        '<label><input type="checkbox" data-kind="child" value="a" checked></label>' +
        '<label><input type="checkbox" data-kind="child" value="b" checked></label>' +
        '<label><input type="checkbox" data-kind="child" value="c" checked></label>';
      await Library.confirmAssign();
      const txt = document.getElementById('lb-as-status').textContent;
      const stillOpen = !document.getElementById('modal-library-assign').classList.contains('hidden');
      Store.createAssignments = real;
      return { txt, stillOpen };
    })()`);
    ok('⚠ "1 of 3 children" is said out loud, and the sheet stays open',
      /Only 1 of 3/.test(partial.txt) && partial.stillOpen, partial);
    await ev(`Library.closeAssign()`);

    // ══ 8. The child's card ═══════════════════════════════════════════════
    const card = await ev(`(async () => {
      const real = Store.loadAssignments;
      const today = (typeof _muDayKey === 'function') ? _muDayKey()
        : new Date(Date.now() + 4*3600*1000).toISOString().slice(0,10);
      const yest = new Date(new Date(today + 'T00:00:00Z').getTime() - 86400000).toISOString().slice(0,10);
      Store.loadAssignments = async () => ([
        { id: 'a1', library_document_id: 'doc-1', due_date: yest, note: 'Do Section A',
          document: { id: 'doc-1', title: 'PSAC 2019 Mathematics', filename: 'g6-2019-maths.pdf',
                      storage: 'static', doc_type: 'exam-paper', year: 2019, pages: 12 } },
        { id: 'a2', library_document_id: 'doc-2', due_date: null,
          document: { id: 'doc-2', title: 'Contributed paper', filename: null, storage: 'r2',
                      doc_type: 'practice', year: null, pages: null } },
        { id: 'a3', library_document_id: 'doc-3', due_date: today, document: null },
        { id: 'a4', subject_id: 'grade6-maths', chapter_id: 'ratio', difficulty: 2, due_date: today },
      ]);
      document.getElementById('dash-assignments')?.classList.remove('hidden');
      await _renderStudentAssignments('kid-1');
      Store.loadAssignments = real;
      const list = document.getElementById('dash-assignments-list');
      const cards = [...list.children];
      return {
        count: cards.length,
        order: cards.map(c => (c.textContent.match(/[A-Za-z0-9 ]+/) || [''])[0].trim()).slice(0, 4),
        html: list.innerHTML,
        links: [...list.querySelectorAll('a[href]')].map(a => a.getAttribute('href')),
        chips: [...list.querySelectorAll('span')].map(s => s.textContent.trim())
                 .filter(t => /Overdue|Due/.test(t)),
      };
    })()`);
    ok('every assignment renders a card', card.count === 4, { count: card.count });
    ok('a seeded paper links to /library/<filename>',
      card.links.includes('/library/g6-2019-maths.pdf'), card.links);
    // ⚠ A CONTRIBUTED paper must go through the worker, which re-checks it is
    //   still published. Serving it as a static asset would leak an unpublished
    //   file.
    ok('⚠ a contributed paper links to the worker, not to /library/',
      card.links.some(h => h.startsWith('/api/library-file?id=doc-2')), card.links);
    ok('the paper title is shown, not "Subject - Any Chapter"',
      /PSAC 2019 Mathematics/.test(card.html) && !/Any Chapter/.test(card.html));
    ok('an overdue paper is badged Overdue', card.chips.includes('Overdue'), card.chips);
    ok('and one due today says so', card.chips.includes('Due today'), card.chips);
    // ⚠ A withdrawn document must not render a button that goes nowhere.
    ok('a withdrawn paper says so and offers no open button',
      /no longer available/.test(card.html) && card.links.length === 2, card.links);
    // ⚠ THREE, not two: a1 is overdue, a3 is due today and a4 (ordinary chapter
    //   practice) is ALSO due today — dating chapter work is half of what this
    //   change fixed, so it having a chip is the feature, not a leak. Only a2,
    //   which carries no due_date, goes unbadged.
    ok('an undated assignment gets no due chip, and dated ones all do',
      card.chips.length === 3 && !/Contributed paper[\s\S]{0,200}?(Overdue|Due )/.test(card.html),
      { chips: card.chips });
    ok('the note is shown to the child', /Do Section A/.test(card.html));

    // ══ 9. Nothing threw ══════════════════════════════════════════════════
    await sleep(300);
    // ⚠ This is the check that would have caught _esc() not existing.
    const real = pageErrors.filter(e => !/favicon|Failed to fetch|NetworkError|supabase/i.test(e));
    ok('no uncaught error during any render', real.length === 0, real.slice(0, 5));

  } catch (e) {
    failed++;
    console.log('FAIL threw -- ' + e.message);
  }

  console.log(`\n${checks} passed, ${failed} failed`);
  ws.close(); chrome.kill(); server.close();
  process.exit(failed ? 1 : 0);
})();
