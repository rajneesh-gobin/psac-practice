'use strict';
// Stage 3: the classroom stops being a full-screen modal and becomes a real
// screen, with history and the teacher's other classes in reach.
//
//   node scripts/test-classroom-screen.js
//
// ⚠ THE RISK IN THIS STAGE IS HISTORY, not layout. A dialog owns no history,
//   so Back used to jump straight out of the class — and out of the board
//   behind it. Now each section is a step. The checks that matter are the Back
//   sequence and the guards: a screen can be navigated to by anything that
//   names it, which a dialog could not.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const http = require('node:http');
const { spawn } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8911;
const DBG = 9345;
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
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-clsscreen-'));
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

  const phone = () => call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  const wide  = () => call('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });

  try {
    await phone();
    await call('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html` });
    for (let i = 0; i < 100; i++) {
      if (await ev(`typeof RoleModules !== 'undefined'`)) break;
      await sleep(200);
    }
    await ev(`window.addEventListener('error', e => __report('error: ' + e.message));
              window.addEventListener('unhandledrejection', e => __report('reject: ' + (e.reason && e.reason.message || e.reason)));`);
    await ev(`RoleModules.ensure('teacher')`);
    for (let i = 0; i < 100; i++) {
      if (await ev(`typeof TeacherClassroomDetail !== 'undefined'`)) break;
      await sleep(200);
    }
    for (let i = 0; i < 120; i++) {
      if (await ev(`[...document.querySelectorAll('.screen')].some(s => !s.classList.contains('hidden'))`)) break;
      await sleep(200);
    }
    await sleep(700);

    // ⚠⚠ STAND IN AN ADULT CONTEXT FIRST. _ADULT_ONLY_SCREENS is checked at the
    //   TOP of showScreen(), before the classroom-specific guard, so without
    //   this every navigation to the class bounces to the landing page and a
    //   dozen checks fail for one reason that has nothing to do with them.
    //   That the guard fires at all is the point of the check below it.
    await ev(`window._isParentSession = () => true;`);

    // ══ 1. It is a screen, not a dialog ═══════════════════════════════════
    const shape = await ev(`(() => {
      const scr = document.getElementById('screen-classroom');
      const inner = document.getElementById('tc-classroom-detail');
      const cs = inner ? getComputedStyle(inner) : {};
      return {
        isScreen: !!scr && scr.classList.contains('screen'),
        innerKept: !!inner,
        dialogRole: scr ? scr.getAttribute('role') : null,
        position: cs.position,
        zIndex: cs.zIndex,
      };
    })()`);
    ok('#screen-classroom exists and is a .screen', shape.isScreen, shape);
    // ⚠ Dozens of callers and the whole CSS file name the inner element.
    ok('the inner #tc-classroom-detail id was kept', shape.innerKept, shape);
    ok('⚠ it is no longer a modal dialog', !shape.dialogRole, shape);
    // ⚠ position:fixed; inset:0 is what made it swallow the app.
    ok('⚠ and no longer position:fixed over everything',
      shape.position !== 'fixed', shape);

    // ⚠ A child session must not be able to reach a class roster and its PINs.
    ok('⚠ classroom is an adult-only screen',
      await ev(`_ADULT_ONLY_SCREENS.has('classroom')`));
    // ⚠ Landing here cold (after a reload, or a restored psac-last-screen)
    //   would show a header reading "Classroom" over four dashes and nothing
    //   else, because the screen name survives but the module's _classId does
    //   not. The guard sends the teacher to their class list.
    // ⚠ ASSERT THAT IT LEAVES, NOT WHERE IT ARRIVES. The guard calls
    //   showScreen('teacher'), and TeacherMode.render() then refuses to draw
    //   for anyone Auth.isTeacher() says is not a teacher — which, in a test
    //   with no real approved teacher session, lands on 'landing'. Pinning the
    //   destination would be asserting the teacher-approval chain, not this
    //   guard. Without the guard the screen would simply STAY on 'classroom'.
    await ev(`showScreen('classroom')`);
    ok('⚠ opening it with no class loaded does not strand you on an empty shell',
      await ev(`S.currentScreen`) !== 'classroom', await ev(`S.currentScreen`));

    // ══ 2. The app shell survives ═════════════════════════════════════════
    await ev(`TeacherClassroomDetail.__seed({ className: 'Grade 6 Maths', classGrade: 6,
      assignments: [], events: [], physicalHomework: [] })`);
    await ev(`showScreen('classroom')`);
    await sleep(300);
    const shell = await ev(`(() => {
      const hdr = document.querySelector('header') || document.getElementById('app-header');
      const r = hdr ? hdr.getBoundingClientRect() : null;
      return { headerVisible: !!r && r.height > 0,
               bodyOverflow: document.body.style.overflow,
               screenShown: !document.getElementById('screen-classroom').classList.contains('hidden'),
               teacherHidden: document.getElementById('screen-teacher').classList.contains('hidden') };
    })()`);
    ok('the classroom screen is showing', shell.screenShown && shell.teacherHidden, shell);
    // ⚠ The modal locked body scrolling and, left behind, made the page
    //   unscrollable for good.
    ok('⚠ body scrolling is not locked', !shell.bodyOverflow, shell);
    ok('the app header is still on screen', shell.headerVisible, shell);

    // ══ 3. The rail: other classes stay in reach ══════════════════════════
    await ev(`(() => {
      window.__cls = [
        { id: 'c1', name: 'Grade 6 Maths', grade: 6, active: true },
        { id: 'c2', name: 'Grade 5 English', grade: 5, active: true },
        { id: 'c3', name: 'Old class', grade: 4, active: false },
      ];
      TeacherGuestClasses.getClasses = () => window.__cls;
      TeacherClassroomDetail.renderRail();
    })()`);
    await sleep(150);
    const rail = await ev(`(() => {
      const items = [...document.querySelectorAll('#tc-rail-list .tc-rail-item')];
      const r = document.querySelector('.tc-rail').getBoundingClientRect();
      return { n: items.length, names: items.map(b => b.textContent.replace(/\\s+/g, ' ').trim()),
               onTop: r.top < 400, visible: r.height > 0 };
    })()`);
    // Two active classes + the "All classes" way out. The archived one is not offered.
    ok('the rail lists the active classes', rail.n === 3, rail);
    ok('⚠ an archived class is not offered', !rail.names.some(n => /Old class/.test(n)), rail);
    ok('and it is visible on a phone', rail.visible, rail);

    // ══ 4. Layout: a sidebar on a wide screen ═════════════════════════════
    await wide();
    await sleep(250);
    const wideLayout = await ev(`(() => {
      const page = document.getElementById('tc-classroom-detail');
      const railR = document.querySelector('.tc-rail').getBoundingClientRect();
      const mainR = document.querySelector('.tc-cd-main').getBoundingClientRect();
      return { cols: getComputedStyle(page).gridTemplateColumns,
               sideBySide: railR.right <= mainR.left + 2 && railR.top < mainR.bottom,
               railW: Math.round(railR.width) };
    })()`);
    ok('⚠ on a wide screen the class list sits BESIDE the class, not behind it',
      wideLayout.sideBySide, wideLayout);
    ok('and the rail is a sensible width', wideLayout.railW > 150 && wideLayout.railW < 280, wideLayout);

    await phone();
    await sleep(250);
    const phoneLayout = await ev(`(() => {
      const railR = document.querySelector('.tc-rail').getBoundingClientRect();
      const mainR = document.querySelector('.tc-cd-main').getBoundingClientRect();
      return { stacked: railR.bottom <= mainR.top + 2, railW: Math.round(railR.width),
               scrolls: getComputedStyle(document.querySelector('.tc-rail-list')).overflowX };
    })()`);
    ok('⚠ on a phone it becomes a strip above the class', phoneLayout.stacked, phoneLayout);
    ok('…that scrolls sideways rather than wrapping', phoneLayout.scrolls === 'auto', phoneLayout);

    // ══ 5. Switching class does not stack history ═════════════════════════
    const before = await ev(`history.length`);
    await ev(`TeacherClassroomDetail.switchTo('c2')`);
    await sleep(400);
    const after = await ev(`history.length`);
    ok('switching class keeps you on the classroom screen',
      await ev(`S.currentScreen`) === 'classroom');
    // ⚠ Each class browsed must not become a Back step, or Back walks every
    //   class the teacher glanced at before leaving.
    ok('⚠ switching class adds at most one history step', after - before <= 1, { before, after });

    // ══ 6. BACK WALKS THE SECTIONS ════════════════════════════════════════
    // ⚠ THE POINT OF THE STAGE. A dialog owns no history: Back used to leave
    //   the class outright, and before the board history fix, the board too.
    await ev(`TeacherClassroomDetail.showSection('overview')`);
    await sleep(120);
    await ev(`TeacherClassroomDetail.showSection('work')`);
    await sleep(120);
    await ev(`TeacherClassroomDetail.showSection('pupils')`);
    await sleep(120);
    ok('we are on Pupils', await ev(`TeacherClassroomDetail.__section()`) === 'pupils');

    await ev(`history.back()`); await sleep(350);
    ok('Back goes Pupils → Work', await ev(`TeacherClassroomDetail.__section()`) === 'work',
      await ev(`TeacherClassroomDetail.__section()`));
    ok('…and stays inside the classroom', await ev(`S.currentScreen`) === 'classroom');

    await ev(`history.back()`); await sleep(350);
    ok('Back again goes Work → Today', await ev(`TeacherClassroomDetail.__section()`) === 'overview',
      await ev(`TeacherClassroomDetail.__section()`));

    // ══ 7. Plain words a new teacher can predict ══════════════════════════
    const nav = await ev(`(() => {
      const b = [...document.querySelectorAll('.tc-cd-nav-btn[data-sec]')];
      return { labels: b.map(x => x.querySelector('span')?.textContent.trim()),
               titles: b.map(x => x.getAttribute('title')) };
    })()`);
    ok('the sections are named in plain words',
      JSON.stringify(nav.labels) === JSON.stringify(['Today', 'Work', 'Pupils', 'Files']), nav.labels);
    // ⚠ A new teacher must be able to predict what a tab holds BEFORE tapping.
    ok('⚠ and every one says what it is for', nav.titles.every(t => t && t.length > 12), nav.titles);

    // ⚠ Two strings sent teachers to a "Classrooms tab" that has not existed
    //   since the list moved onto Home.
    const src = fs.readFileSync(path.join(ROOT, 'engine', 'teacher.js'), 'utf8');
    ok('⚠ nothing points at a tab that does not exist', !/Classrooms tab/.test(src));

    const shot = await call('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(os.tmpdir(), 'classroom-screen.png'), Buffer.from(shot.data, 'base64'));
    await wide(); await sleep(250);
    const shot2 = await call('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(os.tmpdir(), 'classroom-screen-wide.png'), Buffer.from(shot2.data, 'base64'));
    console.log('     screenshots: ' + path.join(os.tmpdir(), 'classroom-screen.png') + ' (+ -wide)');

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
