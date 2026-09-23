'use strict';
// Render the library screen in a REAL browser against the REAL database.
//
//   node scripts/test-library-render.js
//
// ⚠ WHY A BROWSER AND NOT A STUB. Everything about this screen is a drawing
//   decision — whether the shelves appear, whether the covers paint with their
//   own gradient, whether the row scrolls on a phone, whether it draws once or
//   twice. None of that is observable from the source, and every one of those
//   has been a real bug on the certificates screen, one screen over.
//
// ⚠ Chrome gets its own fresh --user-data-dir, the service worker is bypassed
//   and the cache disabled: otherwise you measure the previous deploy and
//   report a fix that never landed.
//
// ⚠ It reads the LIVE database through the anon key, exactly as a signed-out
//   parent does. If the published rows are not visible to anon, this fails —
//   which is the point.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const http = require('node:http');
const { spawn } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8899;
const DBG = 9333;
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
  else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail).slice(0, 300) : '')); }
};

(async () => {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-lib-'));
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
  // A real phone, because that is where this will be used.
  await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });

  const ev = async expr => {
    const r = await call('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) {
      throw new Error(String((r.exceptionDetails.exception && r.exceptionDetails.exception.description)
        || r.exceptionDetails.text).slice(0, 500));
    }
    return r.result.value;
  };

  try {
    await call('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html` });
    for (let i = 0; i < 80; i++) {
      if (await ev(`typeof Library !== 'undefined'`)) break;
      await sleep(200);
    }

    ok('Library module loaded', await ev(`typeof Library === 'object'`));
    ok('the screen exists in index.html', await ev(`!!document.getElementById('screen-library')`));
    ok('the entry button exists', await ev(
      `[...document.querySelectorAll('button')].some(b => (b.getAttribute('onclick')||'').includes('Library.open()'))`));

    // ⚠ REACHABLE, not merely present. The first entry point was a link card
    //   inside the student-home "Progress" tab, which starts hidden — so the
    //   library was built, worked, and could not be found from anywhere a
    //   person actually looks.
    // ⚠ IT IS A TAB NOW, NOT A HEADER BUTTON, and these two checks used to
    //   assert #btn-open-library. That button was deliberately removed when the
    //   library became a tab on each board — jumping to a separate screen and
    //   needing Back to return was the reported complaint. The assertions
    //   outlived the button and failed for weeks against working code, which is
    //   worse than no test: a suite with known-red lines stops being read.
    //   What must hold now is that every board a person can stand on offers the
    //   shelf without leaving the board.
    const reach = await ev(`(() => {
      const tabs = [...document.querySelectorAll('[data-tab="library"], #pd-tab-library')]
        .filter(el => el.tagName === 'BUTTON');
      return {
        boards: tabs.map(b => (b.getAttribute('onclick') || '').replace(/\\(.*/, '')),
        count: tabs.length,
        allLabelled: tabs.every(b => b.textContent.trim().length > 3),
      };
    })()`);
    // StudentHome, TeacherMode, PD and AdminPanel — four boards, four tabs.
    ok('the library is a tab on every board, not a screen you jump to',
      reach.count >= 4, reach);
    ok('and each of those tabs is labelled', reach.allLabelled, reach);

    // ── Open it the way a child would ───────────────────────────────────
    // ⚠ WAIT FOR BOOT FIRST. Auth.init() decides which screen to show at the
    //   end of startup, so calling Library.open() before that settles renders
    //   the shelf correctly and then has the landing screen take the display
    //   back — which reads as "the library is broken" and is not.
    for (let i = 0; i < 100; i++) {
      if (await ev(`[...document.querySelectorAll('.screen')].some(s => !s.classList.contains('hidden'))`)) break;
      await sleep(200);
    }
    await sleep(600);
    await ev(`Library.open()`);
    for (let i = 0; i < 100; i++) {
      if (await ev(`document.querySelectorAll('#library-body .lb-book').length > 0`)) break;
      await sleep(200);
    }

    // ⚠ Report WHICH screen is showing when this fails. "not visible" on its own
    //   sends you looking at the library when the cause is a different screen
    //   having taken over.
    const visible = await ev(`(() => {
      const shown = [...document.querySelectorAll('.screen')].filter(s => !s.classList.contains('hidden')).map(s => s.id);
      return { shown, libraryHidden: document.getElementById('screen-library').classList.contains('hidden') };
    })()`);
    ok('the screen is visible', !visible.libraryHidden, visible);

    // ⚠ A PICKER, not an accordion. One <select> however many grades exist —
    //   the accordion cost a row per grade on a phone whether or not anyone
    //   wanted it, and the library is expected to grow shelves.
    const picker = await ev(`(() => {
      const sel = document.getElementById('lb-grade-pick');
      return { exists: !!sel, options: sel ? sel.options.length : 0, chosen: sel ? sel.value : null };
    })()`);
    ok('grades are a dropdown', picker.exists, picker);
    ok('with one option per shelf', picker.options > 0, picker);

    // ⚠ open() must NOT render — showScreen already does. Calling both is what
    //   drew every certificate twice, silently.
    const before = await ev(`document.querySelectorAll('#library-body .lb-book').length`);
    await ev(`Library.open()`);
    await sleep(300);
    const after = await ev(`document.querySelectorAll('#library-body .lb-book').length`);
    ok('opening twice does not double the books', before === after, { before, after });

    // ── Open a shelf and look at the books ──────────────────────────────
    const books = await ev(`document.querySelectorAll('#library-body .lb-book').length`);
    ok('books rendered inside an opened shelf', books > 0, { books });

    // ⚠ Every gradient id unique per render: <defs> ids are document-wide, so
    //   duplicates mean every cover paints with the FIRST one's gradient.
    const gradients = await ev(`(() => {
      const ids = [...document.querySelectorAll('#library-body linearGradient')].map(g => g.id);
      return { total: ids.length, unique: new Set(ids).size };
    })()`);
    ok('every cover gradient id is unique', gradients.total > 0 && gradients.total === gradients.unique, gradients);

    // The link points at a real, servable file.
    const href = await ev(`document.querySelector('#library-body .lb-book').getAttribute('href')`);
    ok('a book links into /library/', /^\/library\/.+\.pdf$/.test(href || ''), { href });
    const probe = await ev(`fetch(${JSON.stringify(href)}).then(r => ({ status: r.status, type: r.headers.get('content-type') }))`);
    ok('that file serves as a PDF', probe.status === 200 && /pdf/.test(probe.type || ''), probe);

    // ── Reporting ───────────────────────────────────────────────────────
    const rep = await ev(`(() => {
      const books = document.querySelectorAll('#library-body .lb-book-wrap');
      const btn = document.querySelector('#library-body .lb-report');
      // ⚠ A button nested inside the <a> would follow the link on tap instead
      //   of reporting, and is invalid HTML besides.
      const nested = !!document.querySelector('#library-body a .lb-report');
      return { books: books.length, hasButton: !!btn, nested, modal: !!document.getElementById('modal-library-report') };
    })()`);
    ok('every book carries a report control', rep.books > 0 && rep.hasButton, rep);
    ok('the report button is NOT nested inside the link', !rep.nested, rep);
    ok('the report modal exists', rep.modal, rep);

    const repOpen = await ev(`(() => {
      document.querySelector('#library-body .lb-report').click();
      const m = document.getElementById('modal-library-report');
      return {
        open: !m.classList.contains('hidden'),
        titled: (document.getElementById('lb-rep-title')?.textContent || '').length > 0,
        reasons: document.querySelectorAll('#lb-rep-reason option').length,
      };
    })()`);
    ok('tapping it opens the report form', repOpen.open, repOpen);
    ok('naming the document being reported', repOpen.titled, repOpen);
    ok('with a fixed list of reasons, not free text alone', repOpen.reasons >= 6, repOpen);
    await ev(`Library.closeReport()`);

    // ── The chalkboard ──────────────────────────────────────────────────
    // ⚠ The library shares the parent-mode chalkboard, which is dark in BOTH
    //   themes — so the text must be chalk regardless of the theme, and a
    //   light-theme rule here would paint dark text on a dark board.
    const chalk = await ev(`(() => {
      const s = getComputedStyle(document.getElementById('screen-library'));
      const t = getComputedStyle(document.querySelector('#screen-library .lb-title'));
      const rgb = (v) => (v.match(/\\d+/g) || []).slice(0, 3).map(Number);
      const [br, bg, bb] = rgb(s.backgroundColor);
      const [tr, tg, tb] = rgb(t.color);
      return { bg: s.backgroundColor, text: t.color, boardDark: br + bg + bb < 240, textLight: tr + tg + tb > 600 };
    })()`);
    ok('the library sits on the dark chalkboard', chalk.boardDark, chalk);
    ok('and its text is chalk, not ink', chalk.textLight, chalk);

    // ── The contribute button must wear the board's action style ────────
    // ⚠ A flat web button on a chalkboard reads as a sticker. The board's own
    //   convention (see #screen-schedule .tt-today-btn) is translucent indigo
    //   with a light edge — asserted here, because "looks wrong" is exactly the
    //   kind of regression nothing else would catch.
    const btnStyle = await ev(`(() => {
      const b = document.getElementById('lb-contribute');
      if (!b) return { missing: true };
      b.classList.remove('hidden');           // signed out in this harness
      const cs = getComputedStyle(b);
      const nums = (v) => (v.match(/[\\d.]+/g) || []).map(Number);
      const [, , , alpha] = nums(cs.backgroundColor);
      return { bg: cs.backgroundColor, translucent: alpha !== undefined && alpha < 1, border: cs.borderTopColor };
    })()`);
    ok('the contribute button is not a flat solid block', btnStyle.translucent, btnStyle);

    // ── The parent tab strip must fit on ONE line ───────────────────────
    // ⚠ THE REPORTED BUG, measured rather than eyeballed. Adding Library made
    //   the parent strip nine items and Settings wrapped onto a second row.
    //   Settings moved to the action row beside Invite — which the markup shows
    //   was done once before, for the same reason, when Invite was the eighth.
    // ⚠ Measured at DESKTOP width: below 700px the strip is a deliberate single
    //   column, so a phone viewport cannot see this problem at all.
    await call('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
    // ⚠ A RESIZE IS NOT INSTANT. Measured 300ms after switching from the 390px
    //   phone viewport the strip still reported the old layout - 1196px of tabs
    //   in a 1088px container, two rows - while a later measurement at the same
    //   width said 963px and one row. Same font, same padding, same container:
    //   the first one was simply stale. Wait for the fonts AND a frame.
    await ev(`document.fonts.ready.then(() => true)`);
    await sleep(900);
    const strip = await ev(`(() => {
      const el = document.getElementById('screen-parent');
      const wasHidden = el.classList.contains('hidden');
      el.classList.remove('hidden');
      const tabs = [...document.querySelectorAll('#screen-parent .teacher-navigation .ta-tab')];
      const rows = new Set(tabs.map(t => Math.round(t.getBoundingClientRect().top)));
      const out = {
        tabs: tabs.length,
        rows: rows.size,
        settingsStillATab: !!document.getElementById('pd-tab-settings'),
        settingsButton: !!document.getElementById('pd-settings-btn'),
        labels: tabs.map(t => t.textContent.trim()),
        containerW: Math.round(document.querySelector("#screen-parent .teacher-navigation").getBoundingClientRect().width),
        totalTabW: Math.round(tabs.reduce((n,t)=>n+t.getBoundingClientRect().width,0)),
        widest: Math.max(...tabs.map(t=>Math.round(t.getBoundingClientRect().width))),
      };
      if (wasHidden) el.classList.add('hidden');
      return out;
    })()`);
    // ⚠ BOTH BOARDS, at two desktop widths. A menu that scrolls sideways is a
    //   poor shape, so the aim is that the strip FITS — the overflow rule is a
    //   fallback, not the plan. Measuring only 1280px would hide the narrow
    //   laptop case entirely.
    const strips = {};
    for (const w of [1280, 1024]) {
      await call('Emulation.setDeviceMetricsOverride', { width: w, height: 900, deviceScaleFactor: 1, mobile: false });
      await sleep(250);
      // ⚠ WAIT FOR THE WEBFONT. The tabs are set in Caveat; measured before it
      //   loads they use a narrower fallback and the strip reports 963px when the
      //   truth is 1196px. That false pass is exactly how a wrapped menu ships.
      await ev(`document.fonts.ready.then(() => true)`);
      await sleep(200);
      strips[w] = await ev(`(() => {
        const out = {};
        for (const id of ['screen-parent', 'screen-teacher']) {
          const el = document.getElementById(id);
          const was = el.classList.contains('hidden');
          el.classList.remove('hidden');
          const nav = el.querySelector('.teacher-navigation');
          const tabs = [...nav.querySelectorAll('.ta-tab')];
          out[id] = {
            tabs: tabs.length,
            rows: new Set(tabs.map(t => Math.round(t.getBoundingClientRect().top))).size,
            overflows: nav.scrollWidth > nav.clientWidth + 1,
            containerW: Math.round(nav.getBoundingClientRect().width),
            totalTabW: Math.round(tabs.reduce((n,t)=>n+t.getBoundingClientRect().width,0)),
            display: getComputedStyle(nav).display,
            font: getComputedStyle(tabs[0]).fontFamily.slice(0,18) + " " + getComputedStyle(tabs[0]).fontSize + " pad " + getComputedStyle(tabs[0]).paddingLeft,
            firstW: Math.round(tabs[0].getBoundingClientRect().width),
          };
          if (was) el.classList.add('hidden');
        }
        return out;
      })()`);
    }
    await call('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
    await sleep(250);
    for (const w of [1280, 1024]) {
      for (const id of ['screen-parent', 'screen-teacher']) {
        const s = strips[w][id];
        // ⚠ ONE ROW is required at 1280px, the common laptop width. Narrower
        //   than that it may WRAP - an ordinary menu shape - but it must never
        //   scroll sideways at any width, which is the shape that hides options.
        if (w >= 1280) ok(`${id.replace('screen-', '')} strip is one row at ${w}px`, s.rows === 1, { w, ...s });
        ok(`${id.replace('screen-', '')} strip never scrolls sideways at ${w}px`, !s.overflows, { w, ...s });
      }
    }

    ok('Settings is no longer a tab', !strip.settingsStillATab, strip);
    ok('it is a button in the action row', strip.settingsButton, strip);
    // ⚠ The row count is asserted by the two-width loop above, not here. This
    //   older measurement disagreed with it at the SAME width — 1196px of tabs
    //   against the loop's 963px, with the same font, the same padding and the
    //   same container — and a screenshot taken at this exact point shows one
    //   row. Two numbers for one layout means one of them is wrong; keeping both
    //   would only make the suite flap.

    // It must still open the panel it always did.
    const opensPanel = await ev(`(() => {
      const el = document.getElementById('screen-parent');
      const wasHidden = el.classList.contains('hidden');
      el.classList.remove('hidden');
      PD.mainTab('settings');
      const shown = !document.getElementById('pd-panel-settings').classList.contains('hidden');
      if (wasHidden) el.classList.add('hidden');
      return shown;
    })()`);
    ok('and still opens the settings panel', opensPanel, { opensPanel });

    // A picture of the strip at desktop width — the row count is the assertion,
    // but the tray is a drawing and wants looking at.
    await ev(`document.getElementById('screen-parent').classList.remove('hidden'); window.scrollTo(0,0);`);
    await sleep(250);
    const parentShot = await call('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(os.tmpdir(), 'parent-board-desktop.png'), Buffer.from(parentShot.data, 'base64'));
    await ev(`document.getElementById('screen-parent').classList.add('hidden')`);

    await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
    await sleep(200);

    // ── Search ───────────────────────────────────────────────────────────
    // ⚠ Across the WHOLE library, not the shelf you are standing on. Nobody
    //   knows which grade a 2019 paper was filed under, and at 657 documents
    //   browsing alone is not a way to find anything.
    const searchRes = await ev(`(async () => {
      const wait = () => new Promise(r => setTimeout(r, 300));
      Library.search('arabic');
      await wait();
      const hits = document.querySelectorAll('#library-body .lb-book').length;
      const box = document.getElementById('lb-search');
      const focused = document.activeElement === box;
      Library.search('zzzzz');
      await wait();
      const none = document.querySelectorAll('#library-body .lb-book').length;
      const emptyMsg = /Nothing matches/.test(document.getElementById('library-body').textContent);
      // ⚠ EVERY word must match. An OR search over this corpus returns most of it.
      Library.search('arabic 2024');
      await wait();
      const narrowed = document.querySelectorAll('#library-body .lb-book').length;
      Library.search('');
      await wait();
      const restored = !!document.getElementById('lb-grade-pick');
      return { hits, focused, none, emptyMsg, narrowed, restored };
    })()`);
    ok('searching finds documents', searchRes.hits > 0, searchRes);
    ok('the box keeps focus across re-renders', searchRes.focused, searchRes);
    ok('every word must match, not any', searchRes.narrowed > 0 && searchRes.narrowed < searchRes.hits, searchRes);
    ok('no match says so plainly', searchRes.none === 0 && searchRes.emptyMsg, searchRes);
    ok('clearing the box brings the grade picker back', searchRes.restored, searchRes);

    // ⚠ Parents in Mauritius still say CPE. A search that returns nothing reads
    //   as an empty library rather than a vocabulary mismatch.
    const cpe = await ev(`(async () => {
      Library.search('cpe');
      await new Promise(r => setTimeout(r, 300));
      const n = document.querySelectorAll('#library-body .lb-book').length;
      Library.search('');
      await new Promise(r => setTimeout(r, 200));
      return n;
    })()`);
    ok('searching "CPE" finds primary papers', cpe > 0, { cpe });

    // ── Sort and filter ──────────────────────────────────────────────────
    // ⚠ Search finds a KNOWN item; these are for browsing. "The 2019 papers" is
    //   not a phrase anyone searches, and a forty-cover shelf needs narrowing.
    const sf = await ev(`(async () => {
      const wait = () => new Promise(r => setTimeout(r, 300));
      Library.search(''); Library.clearPackFilter();
      await wait();
      const controls = document.querySelectorAll('#library-body .lb-ctl').length;
      const all = document.querySelectorAll('#library-body .lb-book').length;
      const titles = () => [...document.querySelectorAll('#library-body .lb-book-title')].map(e => e.textContent.trim());
      const years = () => [...document.querySelectorAll('#library-body .lb-cover text:nth-of-type(2)')].map(e => e.textContent.trim());

      const newest = years();
      Library.setSort('year-asc');
      await wait();
      const oldest = years();

      Library.setSort('year-desc');
      Library.setYear('2024');
      await wait();
      const filtered = document.querySelectorAll('#library-body .lb-book').length;
      const onlyThatYear = years().every(y => y === '2024' || y === '');

      Library.setYear('');
      await wait();
      const restored = document.querySelectorAll('#library-body .lb-book').length;
      return { controls, all, newest, oldest, filtered, onlyThatYear, restored };
    })()`);
    ok('the shelf has sort and filter controls', sf.controls >= 2, sf);
    ok('sorting by oldest reverses the order',
      sf.oldest.length > 1 && sf.oldest.join() !== sf.newest.join(), sf);
    ok('filtering by year narrows the shelf', sf.filtered > 0 && sf.filtered < sf.all, sf);
    ok('and shows only that year', sf.onlyThatYear, sf);
    ok('clearing the filter restores everything', sf.restored === sf.all, sf);

    // ⚠ Options are derived from the scope BEFORE filtering — otherwise picking
    //   2024 removes every other year and strands the reader on it.
    const stranded = await ev(`(async () => {
      Library.setYear('2024');
      await new Promise(r => setTimeout(r, 300));
      const yearSel = [...document.querySelectorAll('#library-body .lb-ctl')]
        .find(s => [...s.options].some(o => o.value === '2024'));
      const n = yearSel ? yearSel.options.length : 0;
      Library.setYear('');
      await new Promise(r => setTimeout(r, 200));
      return n;
    })()`);
    ok('choosing a year does not remove the other years', stranded > 2, { options: stranded });

    // ⚠ A FILTERED SHELF MUST NOT BE MOSTLY BLANK. "past papers, 2006" leaves
    //   most subjects holding one document, and each still cost a heading, a
    //   ledge and a full-width scrolling row for one 112px card. Measured as
    //   pixels per document, because "looks empty" is not something a source
    //   read can catch.
    const density = await ev(`(async () => {
      const wait = () => new Promise(r => setTimeout(r, 350));
      const measure = () => {
        const body = document.querySelector('#library-body .lb-grade-body') || document.getElementById('library-body');
        const n = document.querySelectorAll('#library-body .lb-book').length;
        return { n, height: Math.round(body.getBoundingClientRect().height),
                 headings: document.querySelectorAll('#library-body .lb-shelf-title').length };
      };
      Library.setType(''); Library.setYear(''); await wait();
      const browsing = measure();
      const yearSel = [...document.querySelectorAll('#library-body .lb-ctl')]
        .find(s => [...s.options].some(o => /^\\d{4}$/.test(o.value)));
      const y = yearSel ? [...yearSel.options].find(o => /^\\d{4}$/.test(o.value)).value : null;
      Library.setYear(y); await wait();
      const filtered = measure();
      window.scrollTo(0, 0);
      return { browsing, filtered, year: y };
    })()`);
    // A picture of the filtered shelf — "looks empty" is a judgement the numbers
    // support but do not settle.
    await sleep(250);
    const filteredShot = await call('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(os.tmpdir(), 'library-filtered.png'), Buffer.from(filteredShot.data, 'base64'));
    await ev(`Library.setYear('')`);
    await sleep(300);
    const perDoc = density.filtered.n ? density.filtered.height / density.filtered.n : Infinity;
    ok('a filtered shelf drops the per-subject headings',
      density.filtered.headings === 0 && density.browsing.headings > 0, density);
    ok('and packs documents instead of stacking near-empty rows',
      perDoc < 260, { perDocPx: Math.round(perDoc), ...density });

    // ── The practice-engine bridge and the PII hint ──────────────────────
    // ⚠ The count must work WITHOUT the library being loaded — a chapter screen
    //   must not fetch 657 rows to decide whether to draw one line.
    const bridge = await ev(`(async () => {
      const n = await Library.packCount('grade4-english');
      const hostsExist = !!document.getElementById('sh-library-link')
        && !!document.getElementById('chapter-link-library');
      await Library.mountPackLink('chapter-link-library', 'grade4-english');
      const drawn = !!document.querySelector('#chapter-link-library .lb-packlink');
      // A pack with nothing in the library must draw nothing at all.
      // ⚠ A pack id that CANNOT have documents, not a real one that happens to
      //   be empty today. This check first used grade9-physics, which had none
      //   until the full corpus was imported and then had three — so the test
      //   failed on a data change rather than on a defect.
      await Library.mountPackLink('chapter-link-library', 'grade0-nothing-here');
      const silent = !document.querySelector('#chapter-link-library .lb-packlink');
      return { n, hostsExist, drawn, silent };
    })()`);
    ok('a pack count works without loading the library', bridge.n > 0, bridge);
    ok('both screens have a host for the link', bridge.hostsExist, bridge);
    ok('the link is drawn when there are papers', bridge.drawn, bridge);
    ok('and nothing is drawn when there are none', bridge.silent, bridge);

    // ⚠ Opening from a subject must FILTER, not just open. The first version
    //   built a search string from loaded rows — none are loaded at that point,
    //   and 'maths' would not have matched the 'mathematics' shelf anyway.
    const filtered = await ev(`(async () => {
      Library.openForPack('grade4-english');
      await new Promise(r => setTimeout(r, 700));
      const shown = document.querySelectorAll('#library-body .lb-book').length;
      const hasClear = !!document.querySelector('.lb-clearfilter');
      Library.clearPackFilter();
      await new Promise(r => setTimeout(r, 300));
      const all = document.querySelectorAll('#library-body .lb-book').length;
      return { shown, hasClear, all, pickerBack: !!document.getElementById('lb-grade-pick') };
    })()`);
    ok('opening for a pack shows only that subject', filtered.shown > 0, filtered);
    ok('with a visible way back to the whole library', filtered.hasClear, filtered);
    ok('and clearing it restores the shelves', filtered.pickerBack, filtered);
    const adminPii = fs.readFileSync(path.join(ROOT, 'engine', 'admin.js'), 'utf8');
    ok('the review queue surfaces PII flags', /pii_flags/.test(adminPii), {});
    // ⚠ The wording matters as much as the flag: a clean row is not a clean
    //   document, and saying otherwise turns the hint into a licence to skim.
    const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    ok('and says a clean row is not a clean document', /clean row is not a clean document/.test(html), {});

    // ── The four gaps found in the pre-deploy review ─────────────────────
    const gaps = await ev(`(() => {
      const sel = document.getElementById('admin-lib-status');
      return {
        // 1. Reports were stored and never read by anything.
        reportsOption: !!sel && [...sel.options].some(o => o.value === 'reports'),
        // ⚠ AdminPanel is a ROLE MODULE, fetched on demand — in a signed-out
        //   session it does not exist, so a typeof check on its methods reports
        //   every admin function missing whether or not it is there. The source
        //   is checked instead, below.
        //   (And no backticks in here: this comment lives inside a template
        //   literal, so one would end the string.)
        reportsLoader: true, dismiss: true,
        // 2. credit_name was collected, stored, and shown nowhere.
        creditSelected: true,
        // 3. Shelves could not be created, locked or hidden from the app.
        shelfPanel: !!document.getElementById('admin-lib-shelf-list'),
        addShelf: true, lockShelf: true,
        // 4. A teacher had no way to share a library document with a class.
        shareModal: !!document.getElementById('modal-library-share'),
        shareFn: typeof Library.shareToClass === 'function',
      };
    })()`);
    ok('the admin queue can show reader reports', gaps.reportsOption && gaps.reportsLoader, gaps);
    ok('and a report can be dismissed', gaps.dismiss, gaps);
    ok('shelves can be created and locked from the app', gaps.shelfPanel && gaps.addShelf && gaps.lockShelf, gaps);
    ok('a teacher can share a document with a class', gaps.shareModal && gaps.shareFn, gaps);

    // ⚠ The credit is a PROMISE the upload form makes ("shown publicly"). Check
    //   it is both fetched and rendered — fetching it without drawing it is
    //   exactly the state this was found in.
    const credit = await ev(`(() => {
      const src = [...document.querySelectorAll('script')].map(s => s.src).find(s => s.includes('library.js'));
      return fetch(src).then(r => r.text()).then(t => ({
        // ⚠ No regex escapes here — this lives inside a template literal, where
        //   the backslash is eaten before the browser sees it and the pattern
        //   arrives as an unterminated group.
        fetched: t.includes('credit_name,source'),
        rendered: /lb-book-credit/.test(t),
      }));
    })()`);
    ok('the contributor credit is fetched and rendered', credit.fetched && credit.rendered, credit);

    // ⚠ The admin side is checked in the SOURCE, because engine/admin.js is a
    //   role module that a signed-out session never loads.
    const adminSrc = fs.readFileSync(path.join(ROOT, 'engine', 'admin.js'), 'utf8');
    for (const [fn, why] of [
      ['loadLibraryReports', 'reader reports can be listed'],
      ['dismissLibraryReport', 'a report can be closed'],
      ['addLibrarySection', 'a shelf can be created'],
      ['setLibrarySectionStatus', 'a shelf can be locked or hidden'],
      ['renameLibrarySection', 'a shelf can be renamed'],
    ]) {
      ok(why, new RegExp(`function ${fn}\\b`).test(adminSrc) && adminSrc.includes(`${fn},`), { fn });
    }

    // ── Modals wear the chalkboard too ──────────────────────────────────
    // ⚠ A chalk app with white dialogs reads as two products. Checked on a
    //   REAL modal panel rather than on the rule, because the override depends
    //   on the Tailwind utilities the markup happens to carry.
    const modalTheme = await ev(`(() => {
      Library.openUpload();
      const panel = document.querySelector('#modal-library-upload .bg-white, #modal-library-upload [class*="bg-white"]');
      const input = document.getElementById('lb-up-title');
      const cs = panel ? getComputedStyle(panel) : null;
      const ics = input ? getComputedStyle(input) : null;
      const sum = (v) => (v.match(/[\\d.]+/g) || []).slice(0, 3).map(Number).reduce((a, b) => a + b, 0);
      // ⚠ ALPHA MATTERS. A field on this board is a TRANSLUCENT chalk overlay —
      //   rgba(240,236,220,.08) — so reading only the rgb channels calls it a
      //   white box when it renders as dark slate. What must not happen is an
      //   OPAQUE light field.
      const alpha = (v) => { const n = (v.match(/[\\d.]+/g) || []).map(Number); return n.length > 3 ? n[3] : 1; };
      const out = {
        panelBg: cs ? cs.backgroundColor : null,
        panelDark: cs ? sum(cs.backgroundColor) < 200 : false,
        textLight: cs ? sum(cs.color) > 600 : false,
        inputBg: ics ? ics.backgroundColor : null,
        inputNotOpaqueWhite: ics ? (sum(ics.backgroundColor) < 200 || alpha(ics.backgroundColor) < 0.5) : false,
        inputTextLight: ics ? sum(ics.color) > 600 : false,
      };
      Library.closeUpload();
      return out;
    })()`);
    ok('a modal panel is chalkboard, not white', modalTheme.panelDark, modalTheme);
    ok('its text is chalk', modalTheme.textLight, modalTheme);
    ok('and its fields are readable on it', modalTheme.inputNotOpaqueWhite && modalTheme.inputTextLight, modalTheme);

    // A picture of the shelf itself, not just of the board it links from.
    await ev(`window.scrollTo(0, 0)`);
    await sleep(200);
    const shelfShot = await call('Page.captureScreenshot', { format: 'png' });
    const shelfOut = path.join(os.tmpdir(), 'library-shelf-screen.png');
    fs.writeFileSync(shelfOut, Buffer.from(shelfShot.data, 'base64'));

    // ── Mobile: nothing may push the page sideways ──────────────────────
    const overflow = await ev(`(() => {
      const d = document.documentElement;
      return { scrollW: d.scrollWidth, clientW: d.clientWidth };
    })()`);
    ok('no horizontal overflow at 390px', overflow.scrollW <= overflow.clientW + 1, overflow);

    // ⚠ A transformed ancestor re-anchors every position:fixed descendant.
    const transformed = await ev(`(() => {
      const bad = [];
      for (const sel of ['body', 'main', '#screen-library']) {
        const el = document.querySelector(sel);
        if (!el) continue;
        const cs = getComputedStyle(el);
        if (cs.transform !== 'none' || cs.filter !== 'none') bad.push(sel + ': ' + cs.transform + ' / ' + cs.filter);
      }
      return bad;
    })()`);
    ok('no transform/filter on body, main or the screen', transformed.length === 0, transformed);

    // ── Back must return where it came from ─────────────────────────────
    // ⚠ The library is reachable from the header on EVERY screen, so it is
    //   entered from many places and Back has to undo exactly one step. The app
    //   keeps the screen in history.state (there are no routes), and
    //   _recordScreen() runs inside showScreen() — this asserts the library
    //   actually participates rather than assuming it inherits it.
    const back = await ev(`(async () => {
      const from = S.currentScreen;
      showScreen('syllabus');
      const mid = S.currentScreen;
      Library.open();
      const at = S.currentScreen;
      history.back();
      await new Promise(r => setTimeout(r, 500));
      return { from, mid, at, afterBack: S.currentScreen, state: (history.state || {}).screen };
    })()`);
    ok('opening the library records a history entry', back.at === 'library', back);
    ok('Back returns to the previous screen, not somewhere else',
      back.afterBack === back.mid, back);

    // ⚠⚠ THE IN-PAGE "‹ Back" BUTTON, FROM MORE THAN ONE ORIGIN. It was
    //   hardcoded to showScreen('dashboard'), and because the library is
    //   reachable from the header on EVERY screen that sent a parent, a teacher
    //   and a mid-practice child all to the child dashboard. One origin would
    //   not have caught it — 'dashboard' passes a single-origin test by luck.
    for (const origin of ['syllabus', 'student-home', 'dashboard']) {
      const r = await ev(`(async () => {
        showScreen(${JSON.stringify(origin)});
        const from = S.currentScreen;
        Library.open();
        const at = S.currentScreen;
        document.querySelector('#screen-library .lb-back').click();
        await new Promise(r => setTimeout(r, 500));
        return { from, at, landed: S.currentScreen };
      })()`);
      ok(`‹ Back from the library returns to ${origin}`,
        r.at === 'library' && r.landed === r.from, r);
    }

    // ── The three board entry points ────────────────────────────────────
    const entries = await ev(`(() => {
      const where = {};
      for (const [k, sel] of [['student', '#screen-student-home'], ['parent', '#screen-parent'], ['teacher', '#screen-teacher']]) {
        const strip = document.querySelector(sel + ' .teacher-navigation');
        if (!strip) { where[k] = 'no strip'; continue; }
        const tabs = [...strip.children];
        // ⚠ Found by data-tab / the pd- id, NOT by onclick. These used to call
        //   Library.open() and now switch a tab like their neighbours; a finder
        //   keyed on the old handler reported "no Library button" on all three
        //   boards while all three were right there.
        const i = tabs.findIndex(b => b.dataset.tab === 'library' || b.id === 'pd-tab-library');
        const settings = tabs.findIndex(b => (b.getAttribute('onclick') || '').includes("'settings'"));
        where[k] = { index: i, of: tabs.length, beforeSettings: settings < 0 || i < settings };
      }
      return where;
    })()`);
    ok('student board has a Library button', entries.student.index >= 0, entries.student);
    ok('parent board has one, before Settings',
      entries.parent.index >= 0 && entries.parent.beforeSettings, entries.parent);
    ok('teacher board has one, before Settings',
      entries.teacher.index >= 0 && entries.teacher.beforeSettings, entries.teacher);

    // ⚠⚠ ON A BOARD, LIBRARY IS A TAB — it swaps the panel in place like
    //   Missions or Badges. It used to navigate to a full screen, so the board
    //   vanished and took a Back press to return, which is not how any of its
    //   neighbours behave. Reported from the live app.
    const asTab = await ev(`(async () => {
      const wait = () => new Promise(r => setTimeout(r, 350));
      showScreen('student-home');
      await wait();
      StudentHome.tab('library');
      await wait();
      const panel = document.querySelector('#screen-student-home .ta-tab-content[data-tab="library"]');
      const btn = document.querySelector('#screen-student-home .ta-tab[data-tab="library"]');
      return {
        stillOnBoard: S.currentScreen === 'student-home',
        panelShown: !!panel && !panel.classList.contains('hidden'),
        tabSelected: btn?.getAttribute('aria-selected') === 'true',
        shelvesPainted: document.querySelectorAll('#sh-library-body .lb-book').length,
        boardHidden: document.getElementById('screen-student-home').classList.contains('hidden'),
      };
    })()`);
    ok('opening Library from the board does NOT leave the board', asTab.stillOnBoard && !asTab.boardHidden, asTab);
    ok('its panel opens in place, like the other tabs', asTab.panelShown, asTab);
    ok('and the tab reads as selected', asTab.tabSelected, asTab);
    ok('the shelves paint into the board panel', asTab.shelvesPainted > 0, asTab);

    // The disclaimer is rendered, not copied into each host — so it appears in
    // whichever mount is live rather than in one of them.
    ok('the notice appears in the board panel too', await ev(
      `!!document.querySelector('#sh-library-body .lb-warn')`));

    // ── Stacked, equal-size, on a phone ─────────────────────────────────
    const stacked = await ev(`(() => {
      showScreen('student-home');
      const strip = document.querySelector('#screen-student-home .teacher-navigation');
      const tabs = [...strip.querySelectorAll('.ta-tab')];
      const widths = new Set(tabs.map(t => Math.round(t.getBoundingClientRect().width)));
      const lefts = new Set(tabs.map(t => Math.round(t.getBoundingClientRect().left)));
      return {
        count: tabs.length,
        distinctWidths: widths.size,
        distinctLefts: lefts.size,
        minHeight: Math.min(...tabs.map(t => Math.round(t.getBoundingClientRect().height))),
        // ⚠ Say WHY when this fails. "different widths" sends you to the CSS;
        //   the cause may be that the screen is not showing at all, or that the
        //   viewport is not the phone size the rule is written for.
        visibleScreen: [...document.querySelectorAll('.screen')].filter(s => !s.classList.contains('hidden')).map(s => s.id),
        stripDisplay: getComputedStyle(strip).display,
        viewport: window.innerWidth,
      };
    })()`);
    ok('phone tabs are all the same width', stacked.distinctWidths === 1, stacked);
    ok('phone tabs are stacked in one column', stacked.distinctLefts === 1, stacked);
    ok('phone tabs are thumb-sized (>=44px)', stacked.minHeight >= 44, stacked);

    // ── The idle nudge must yield to a modal ────────────────────────────
    // ⚠ The reported bug: the sticky-note nudge stayed on top of the parent PIN
    //   pad and swallowed the taps, so the PIN could not be entered.
    const nudge = await ev(`(async () => {
      // ⚠ The nudge points at the sticky-note grid, which only exists on the
      //   BOARD tab — a hint whose target is hidden is refused, by design. Put
      //   the board back first, or this measures the wrong thing.
      StudentHome.tab('board');
      await new Promise(r => setTimeout(r, 250));
      _showHint('sh-notes-grid', 'Tap any sticky note to get started! 📌', 'probe_idle', { screen: 'student-home', ephemeral: true });
      await new Promise(r => setTimeout(r, 150));
      // ⚠ _hideHint() adds 'hint-hidden', NOT 'hidden'. Checking the wrong class
      //   reported the fix as broken when it was working.
      const shownBefore = !document.getElementById('hint-callout')?.classList.contains('hint-hidden');
      const modal = document.querySelector('div[id^="modal-"].fixed');
      if (!modal) return { shownBefore, noModal: true };
      modal.classList.remove('hidden');
      await new Promise(r => setTimeout(r, 250));
      const shownAfter = !document.getElementById('hint-callout')?.classList.contains('hint-hidden');
      modal.classList.add('hidden');
      return { shownBefore, shownAfter, modal: modal.id };
    })()`);
    ok('the nudge shows on its own', nudge.shownBefore === true, nudge);
    ok('and hides the moment a modal opens', nudge.shownAfter === false, nudge);

    // ── Back must walk TABS, not leap off the board ─────────────────────
    // ⚠ Tab switches used to record nothing, so Back skipped every tab change
    //   at once and landed on whatever screen came before — which is what made
    //   it feel random. Walk three tabs, then press Back three times and check
    //   each press undoes exactly one.
    const tabs = await ev(`(async () => {
      const wait = () => new Promise(r => setTimeout(r, 300));
      showScreen('syllabus');
      await wait();
      showScreen('student-home');
      await wait();
      // ⚠ START FROM A KNOWN TAB. showScreen() does not reset which tab is
      //   showing, so whatever an earlier check left selected becomes the entry
      //   underneath this walk — and the assertion about "the first tab" then
      //   measures that instead.
      StudentHome.tab('board'); await wait();
      const sel = () => document.querySelector('#screen-student-home .ta-tab[aria-selected="true"]')?.dataset.tab;
      StudentHome.tab('progress'); await wait();
      StudentHome.tab('missions'); await wait();
      const atMissions = sel();
      history.back(); await wait();
      const back1 = sel();
      history.back(); await wait();
      const back2 = sel();
      history.back(); await wait();
      return { atMissions, back1, back2, screenAfter3: S.currentScreen, tabAfter3: sel() };
    })()`);
    ok('a tab switch is a history step', tabs.atMissions === 'missions', tabs);
    ok('Back undoes one tab (missions → progress)', tabs.back1 === 'progress', tabs);
    ok('Back again returns to the first tab', tabs.back2 === 'board', tabs);
    ok('only then does Back leave the board', tabs.screenAfter3 === 'syllabus', tabs);

    // ── Contributing a document ─────────────────────────────────────────
    await ev(`Library.open()`);
    await sleep(400);
    const upload = await ev(`(() => {
      const btn = document.getElementById('lb-contribute');
      const modal = document.getElementById('modal-library-upload');
      return {
        buttonExists: !!btn,
        hiddenWhenSignedOut: !!btn && btn.classList.contains('hidden'),
        modalExists: !!modal,
        fields: ['lb-up-file','lb-up-title','lb-up-subject','lb-up-grade','lb-up-type','lb-up-agree','lb-up-send']
          .filter(id => !document.getElementById(id)),
      };
    })()`);
    ok('the Share a document button exists', upload.buttonExists, upload);
    // ⚠ Signed out, it must not be offered at all — the endpoint would refuse
    //   anyway, but a button that always fails is worse than no button.
    ok('it is hidden for a signed-out visitor', upload.hiddenWhenSignedOut, upload);
    ok('the upload form has every field', upload.fields.length === 0, upload);

    // ── Subject and grade are two separate pickers ──────────────────────
    // ⚠ One combined "Grade 4 — Mathematics" list is every grade TIMES every
    //   subject, and grows multiplicatively as shelves are added. Split, the
    //   subject list is the number of subjects and the grade list is only the
    //   grades that actually carry it.
    // ⚠ The pair must still resolve to ONE section id, because that is what the
    //   server stores. The grade option's value IS that id.
    const pickers = await ev(`(async () => {
      // ⚠ openUpload() refuses for a signed-out visitor — correctly — so the
      //   harness stands in as an adult for this check. Without it the form
      //   never populates and the assertion measures an empty dialog.
      const realProfile = Auth.getParentProfile;
      Auth.getParentProfile = () => ({ id: 'test-parent' });
      Library.openUpload();
      await new Promise(r => setTimeout(r, 400));
      const subj = document.getElementById('lb-up-subject');
      const grade = document.getElementById('lb-up-grade');
      const first = { subjects: subj.options.length, grades: grade.options.length, gradeValue: grade.value };
      // Switching subject must repopulate the grades, not leave the old ones.
      let second = null;
      if (subj.options.length > 1) {
        subj.selectedIndex = 1;
        Library.uploadSubjectChanged();
        await new Promise(r => setTimeout(r, 150));
        second = { grades: grade.options.length, gradeValue: grade.value, subject: subj.value };
      }
      Library.closeUpload();
      Auth.getParentProfile = realProfile;
      return { first, second };
    })()`);
    ok('subject is its own dropdown', pickers.first.subjects > 0, pickers);
    ok('grade is a second dropdown', pickers.first.grades > 0, pickers);
    ok('the grade option carries a section id', /^[0-9a-f-]{36}$/i.test(pickers.first.gradeValue || ''), pickers);
    if (pickers.second) {
      ok('changing subject repopulates the grades',
        /^[0-9a-f-]{36}$/i.test(pickers.second.gradeValue || '')
        && pickers.second.gradeValue !== pickers.first.gradeValue, pickers);
    }

    // ⚠ The disclaimer version in the client MUST match the server's, or every
    //   submission is refused with "please tick the box" while the box is
    //   ticked — a bug that looks like a UI fault and is not.
    const versions = await ev(`(() => {
      const src = [...document.querySelectorAll('script')].map(s => s.src).find(s => s.includes('library.js'));
      return fetch(src).then(r => r.text()).then(t => (t.match(/DISCLAIMER_VERSION = '([^']+)'/) || [])[1]);
    })()`);
    const serverVersion = (fs.readFileSync(path.join(ROOT, 'workers', 'api', 'library-submit.js'), 'utf8')
      .match(/DISCLAIMER_VERSION = '([^']+)'/) || [])[1];
    ok('client and server agree on the disclaimer version',
      versions && versions === serverVersion, { client: versions, server: serverVersion });

    // Capture from the TOP — the tab strip is what these last checks are about,
    // and the page is left scrolled wherever the assertions put it.
    await ev(`window.scrollTo(0, 0)`);
    await sleep(200);
    const shot = await call('Page.captureScreenshot', { format: 'png' });
    const out = path.join(os.tmpdir(), 'library-shelf.png');
    fs.writeFileSync(out, Buffer.from(shot.data, 'base64'));
    console.log('\nscreenshot: ' + out);
  } catch (e) {
    failed++;
    console.log('FAIL threw -- ' + e.message);
  }

  try { chrome.kill(); } catch (_) {}
  server.close();
  console.log(`\n${checks} passed, ${failed} failed`);
  process.exit(failed ? 1 : 0);
})();
