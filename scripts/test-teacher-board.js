'use strict';
// Stage 4: the teacher board collapses by MERGING, not by hiding.
//
//   node scripts/test-teacher-board.js
//
// ⚠⚠ THE TRAP THIS STAGE CARRIES: switchTab() rejects any name not in ALL_TABS
//    and silently falls back to 'home'. A teacher's saved location
//    (psac_teacher_loc_v1) can hold a tab that no longer has a button, so every
//    retired name must still RESOLVE — to wherever its content moved — or they
//    come back to the app and land somewhere they did not choose with nothing
//    explaining why.
//
// ⚠ AND THE ONE THIS STAGE MUST NOT REPEAT: index.html records that these tools
//   were deliberately promoted OUT of a "⋯ More" menu, because that was "one tap
//   and one guess in front of every one of them". The count comes down by
//   merging destinations, never by hiding them again.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const http = require('node:http');
const { spawn } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8913;
const DBG = 9347;
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
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-board-'));
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
      if (await ev(`typeof RoleModules !== 'undefined'`)) break;
      await sleep(200);
    }
    await ev(`window.addEventListener('error', e => __report('error: ' + e.message));
              window.addEventListener('unhandledrejection', e => __report('reject: ' + (e.reason && e.reason.message || e.reason)));`);
    await ev(`RoleModules.ensure('teacher')`);
    for (let i = 0; i < 100; i++) {
      if (await ev(`typeof TeacherMode !== 'undefined' && typeof TeacherMaterials !== 'undefined'`)) break;
      await sleep(200);
    }
    for (let i = 0; i < 120; i++) {
      if (await ev(`[...document.querySelectorAll('.screen')].some(s => !s.classList.contains('hidden'))`)) break;
      await sleep(200);
    }
    await sleep(600);
    // ⚠⚠ STAND ON THE TEACHER SCREEN, AS A TEACHER. Two guards sit in front of
    //   it and both must be satisfied or everything below measures hidden DOM:
    //   showScreen() refuses 'teacher' to a non-adult (_ADULT_ONLY_SCREENS),
    //   and TeacherMode.render() refuses to draw for anyone Auth.isTeacher()
    //   says is not a teacher, bouncing to the landing page. A panel inside a
    //   hidden screen still answers every structural query correctly and has
    //   zero height — which is how a green run can be measuring nothing.
    await ev(`window._isParentSession = () => true; Auth.isTeacher = () => true;`);
    await ev(`showScreen('teacher')`);
    await sleep(300);
    ok('the teacher module loads', await ev(`typeof TeacherMode === 'object'`));
    ok('and we are standing on the teacher board',
      await ev(`!document.getElementById('screen-teacher').classList.contains('hidden')`));

    // ══ 1. The strip is short, and nothing went behind a menu ═════════════
    const strip = await ev(`(() => {
      const b = [...document.querySelectorAll('#screen-teacher .teacher-navigation .ta-tab')];
      return { n: b.length,
               labels: b.map(x => x.textContent.trim()),
               tabs: b.map(x => x.dataset.tab),
               titles: b.map(x => x.getAttribute('title')),
               moreMenu: !!document.querySelector('#screen-teacher .ta-more-menu, #screen-teacher [data-more-menu]') };
    })()`);
    ok('the board is down to three destinations', strip.n === 3, strip);
    ok('and they are My classes, Library and Test papers',
      JSON.stringify(strip.tabs) === JSON.stringify(['home', 'library', 'papers']), strip.tabs);
    // ⚠ index.html records why a ⋯ More menu was removed: one tap and one guess
    //   in front of every tool. Reducing the count by re-hiding them would undo
    //   a decision someone already made for a stated reason.
    ok('⚠ nothing was pushed back behind a "More" menu', !strip.moreMenu, strip);
    ok('every tab says what it holds',
      strip.titles.filter(Boolean).length >= 2 && strip.titles.every(t => t === null || t.length > 15), strip.titles);

    // ══ 2. The Library holds both kinds of document ═══════════════════════
    await ev(`TeacherMode.switchTab('library')`);
    await sleep(400);
    const shelves = await ev(`(() => {
      const btns = [...document.querySelectorAll('.ta-shelf-btn')];
      const panels = [...document.querySelectorAll('[data-shelf-panel]')];
      return { btns: btns.map(b => b.dataset.shelf), labels: btns.map(b => b.textContent.trim()),
               panels: panels.map(p => p.dataset.shelfPanel),
               shown: panels.filter(p => !p.classList.contains('hidden')).map(p => p.dataset.shelfPanel),
               on: btns.filter(b => b.classList.contains('is-on')).map(b => b.dataset.shelf) };
    })()`);
    ok('the Library has two shelves', shelves.btns.join() === 'papers,files', shelves);
    ok('past papers is the one showing first', shelves.shown.join() === 'papers' && shelves.on.join() === 'papers', shelves);

    await ev(`TeacherMode.shelf('files')`);
    await sleep(300);
    const filesShelf = await ev(`(() => {
      const panels = [...document.querySelectorAll('[data-shelf-panel]')];
      const host = document.querySelector('[data-shelf-panel="files"]');
      return { shown: panels.filter(p => !p.classList.contains('hidden')).map(p => p.dataset.shelfPanel),
               hasAddForm: !!host.querySelector('.tm-source-row'),
               hasList: !!host.querySelector('#tm-list, .tm-list, [id^=tm-]'),
               onscreen: host.getBoundingClientRect().height > 0 };
    })()`);
    ok('switching to My files shows the files shelf only', filesShelf.shown.join() === 'files', filesShelf);
    // ⚠ The whole materials panel moved, not a link to it — the upload form has
    //   to have come with it or a teacher can browse but not add.
    ok('⚠ the upload form came with it', filesShelf.hasAddForm, filesShelf);
    ok('and the shelf is actually on screen', filesShelf.onscreen, filesShelf);

    // ══ 3. Retired names still resolve ════════════════════════════════════
    // ⚠ THE ONE THAT BITES. A saved location can still say 'materials'.
    await ev(`TeacherMode.switchTab('home')`);
    await sleep(250);
    await ev(`TeacherMode.switchTab('materials')`);
    await sleep(400);
    const legacy = await ev(`(() => {
      const t = document.querySelector('#screen-teacher .ta-tab[aria-selected="true"]');
      const shown = [...document.querySelectorAll('[data-shelf-panel]')]
        .filter(p => !p.classList.contains('hidden')).map(p => p.dataset.shelfPanel);
      return { tab: t ? t.dataset.tab : null, shelf: shown.join() };
    })()`);
    ok('⚠ the retired name "materials" lands on the Library…',
      legacy.tab === 'library', legacy);
    ok('…on the My files shelf, not on past papers', legacy.shelf === 'files', legacy);
    // Anything not in ALL_TABS falls back to home; the retired name must not.
    ok('⚠ it did NOT silently fall back to home', legacy.tab !== 'home', legacy);

    // ══ 4. The shelf is a filter, not a history step ══════════════════════
    const h0 = await ev(`history.length`);
    await ev(`TeacherMode.shelf('papers')`);
    await ev(`TeacherMode.shelf('files')`);
    await ev(`TeacherMode.shelf('papers')`);
    await sleep(250);
    const h1 = await ev(`history.length`);
    ok('⚠ flipping shelves adds no Back steps', h1 === h0, { h0, h1 });

    // ══ 5. Nothing was orphaned ═══════════════════════════════════════════
    // ⚠ A panel nothing can reach is dead DOM; a button pointing at a panel
    //   that no longer exists is worse.
    // ⚠ TWO NAMES ARE DELIBERATE ALIASES AND HAVE NO PANEL OF THEIR OWN:
    //   'classes' → 'home' (from when the classroom list was its own tab) and
    //   'materials' → the Library's files shelf (this stage). Both are kept
    //   precisely because saved locations still hold them, so listing them here
    //   is the point, not an exemption — anything ELSE without a panel is a
    //   button that quietly lands on home.
    const orphans = await ev(`(() => {
      const ALIASES = ['classes', 'materials'];
      const panels = [...document.querySelectorAll('#screen-teacher .ta-tab-content[data-tab]')].map(p => p.dataset.tab);
      const named = [...document.querySelectorAll('#screen-teacher [onclick*="switchTab"]')]
        .map(b => (b.getAttribute('onclick').match(/switchTab\\('([a-z-]+)'/) || [])[1]).filter(Boolean);
      return { panels, named, aliases: ALIASES,
               missingPanel: named.filter(n => !panels.includes(n) && !ALIASES.includes(n)) };
    })()`);
    ok('every tab a button names has a panel, or is a documented alias',
      orphans.missingPanel.length === 0, orphans);

    // ⚠⚠ AND THE REVERSE, WHICH IS THE ONE THAT BIT. The first version of this
    //    test only checked button → panel, so removing "Marks book" and "Past
    //    work" from the strip passed cleanly while leaving both panels with
    //    NOTHING anywhere pointing at them. Deleting a tab is only a
    //    simplification if the thing behind it still has a door; otherwise it
    //    is hiding a feature, which is exactly what taking away the old "⋯
    //    More" menu was meant to stop. Check reachability, not tidiness.
    const unreachable = await ev(`(() => {
      // Panels the app opens for you rather than ones you pick: 'create' and
      // 'results' are reached from a class, per teacher.js:14.
      const OPENED_FOR_YOU = ['create', 'results'];
      const panels = [...document.querySelectorAll('#screen-teacher .ta-tab-content[data-tab]')].map(p => p.dataset.tab);
      const reachable = new Set([...document.querySelectorAll('#screen-teacher [onclick*="switchTab"]')]
        .map(b => (b.getAttribute('onclick').match(/switchTab\\('([a-z-]+)'/) || [])[1]).filter(Boolean));
      return { panels, reachable: [...reachable],
               stranded: panels.filter(p => !reachable.has(p) && !OPENED_FOR_YOU.includes(p)) };
    })()`);
    ok('⚠ no panel is stranded with nothing pointing at it',
      unreachable.stranded.length === 0, unreachable);

    // And the two that lost their tabs are reachable from My classes.
    await ev(`TeacherMode.switchTab('home')`);
    await sleep(250);
    const across = await ev(`(() => {
      const btns = [...document.querySelectorAll('.ta-across-btn')];
      return { n: btns.length, labels: btns.map(b => b.querySelector('strong')?.textContent.trim()),
               onscreen: btns.every(b => b.getBoundingClientRect().height > 0) };
    })()`);
    ok('Marks book and Past work have a door on My classes',
      across.n === 2 && across.onscreen, across);
    // ⚠ The words must say WHICH LEVEL, or they collide with the class section
    //   doing the same job — the fault this whole redesign started from.
    const levelWords = await ev(`document.querySelector('.ta-across-head')?.textContent.trim()`);
    ok('⚠ and the heading says which level they are', /across all/i.test(levelWords || ''), levelWords);

    // Each must land somewhere with a way back out.
    for (const t of ['gradebook', 'assignments']) {
      const back = await ev(`(() => {
        TeacherMode.switchTab(${JSON.stringify(t)});
        const panel = document.querySelector('#screen-teacher .ta-tab-content[data-tab=' + JSON.stringify(${JSON.stringify(t)}) + ']');
        return { shown: panel && !panel.classList.contains('hidden'),
                 hasBack: !!panel?.querySelector('.tr-back') };
      })()`);
      ok(`"${t}" opens and offers a way back`, back.shown && back.hasBack, back);
    }
    await ev(`TeacherMode.switchTab('library')`);
    await sleep(200);
    // ⚠ And the aliases must actually resolve, not merely be excused.
    for (const alias of ['classes', 'materials']) {
      const landed = await ev(`(() => {
        TeacherMode.switchTab(${JSON.stringify(alias)});
        const t = document.querySelector('#screen-teacher .ta-tab[aria-selected="true"]');
        return t ? t.dataset.tab : null;
      })()`);
      ok(`the alias "${alias}" resolves to a real tab`,
        landed === (alias === 'classes' ? 'home' : 'library'), { alias, landed });
    }

    const shot = await call('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(os.tmpdir(), 'teacher-board.png'), Buffer.from(shot.data, 'base64'));
    console.log('     screenshot: ' + path.join(os.tmpdir(), 'teacher-board.png'));

    await sleep(300);
    const real = pageErrors.filter(e => !/favicon|Failed to fetch|NetworkError|supabase|401|403/i.test(e));
    ok('no uncaught error through any of it', real.length === 0, real.slice(0, 5));

  } catch (e) {
    failed++;
    console.log('FAIL threw -- ' + e.message);
  }

  console.log(`\n${checks} passed, ${failed} failed`);
  ws.close(); chrome.kill(); server.close();
  process.exit(failed ? 1 : 0);
})();
