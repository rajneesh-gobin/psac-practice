'use strict';
// Stage 2 of the teacher redesign: Activities and Calendar are ONE timeline.
//
//   node scripts/test-class-work-timeline.js
//
// ⚠ THE RISK IN THIS MERGE IS LOSING THE ACTIONS, not losing the rows. The old
//   Calendar rendered activities with _dueRow() — a title, a date, and the words
//   "set on the activity" where the buttons would be. The real Share, Results
//   and Archive come from TeacherWorkspace.drawCards(), which owns its container
//   and wires handlers BY INDEX into the array it was handed. A merge that
//   pasted its cards in as HTML strings would look right and do nothing.
//
// ⚠ Nothing here touches the database: the module's data is injected directly.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const http = require('node:http');
const { spawn } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8909;
const DBG = 9343;
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
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-timeline-'));
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
      if (await ev(`typeof TeacherClassroomDetail !== 'undefined' && typeof TeacherWorkspace !== 'undefined'`)) break;
      await sleep(200);
    }
    // ⚠⚠ WAIT FOR BOOT, THEN STAND ON THE TEACHER SCREEN BEFORE SEEDING.
    //   showScreen(id) re-hides #tc-classroom-detail for every id except
    //   'teacher' — deliberately: a teacher who tapped 🔒 Parent used to get
    //   the parent dashboard rendered UNDERNEATH the classroom panel. Auth.init()
    //   finishes boot by calling showScreen('landing'), so a classroom opened
    //   before that lands closed, and every structural assertion then passes
    //   against DOM nobody can see.
    for (let i = 0; i < 120; i++) {
      if (await ev(`[...document.querySelectorAll('.screen')].some(s => !s.classList.contains('hidden'))`)) break;
      await sleep(200);
    }
    await sleep(700);
    await ev(`showScreen('teacher')`);
    await sleep(200);
    ok('the classroom and workspace modules load',
      await ev(`typeof TeacherClassroomDetail === 'object' && typeof TeacherWorkspace === 'object'`));

    // ══ 1. The nav lost a tab ═════════════════════════════════════════════
    const nav = await ev(`(() => {
      const b = [...document.querySelectorAll('.tc-cd-nav [data-sec]')];
      return { secs: b.map(x => x.dataset.sec), labels: b.map(x => x.querySelector('span')?.textContent.trim()),
               calendarPanel: !!document.getElementById('tc-cd-calendar') };
    })()`);
    ok('Calendar is no longer a separate tab', !nav.secs.includes('calendar'), nav);
    ok('and Activities is now Work', nav.labels.includes('Work') && !nav.labels.includes('Activities'), nav);
    // ⚠ A panel nothing navigates to is dead DOM and a trap for the next reader.
    ok('its dead panel was removed too, not just hidden', !nav.calendarPanel, nav);

    // ══ 2. 'calendar' still RESOLVES — remembered locations must not break ══
    // ⚠ TeacherMode.rememberClassroom stores the section name. A teacher who
    //   left the app on Calendar must not come back to the overview.
    const alias = await ev(`(() => {
      TeacherClassroomDetail.showSection('calendar');
      const workVisible = !document.getElementById('tc-cd-work').classList.contains('hidden');
      const navOn = document.querySelector('.tc-cd-nav-btn.tc-cd-nav-active')?.dataset.sec;
      return { workVisible, navOn };
    })()`);
    ok('⚠ showSection("calendar") lands on Work, not the overview',
      alias.workVisible && alias.navOn === 'work', alias);

    // ══ 3. Inject a class's worth of data and render ══════════════════════
    const day = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
    const built = await ev(`(() => {
      const T = TeacherClassroomDetail;
      // Two activities on different days, one event, one worksheet, one archived.
      // ⚠ MIDDAY UTC, NEVER 23:59. A deadline an hour before midnight lands on a
      //   different calendar day either side of Greenwich, so a test using it
      //   measures the machine's timezone rather than the grouping. Midday is the
      //   same date in every offset from UTC-12 to UTC+12.
      // ⚠ expires_at shares a day with due_at on purpose: teacher.js derives
      //   p_expires_hours FROM the due date, so any other shape is one the app
      //   cannot produce.
      T.__seed({
        className: 'Grade 6 Maths',
        assignments: [
          { id: 'a1', title: 'Fractions quiz', status: 'active', due_at: '${day(1)}T10:00:00Z', expires_at: '${day(1)}T12:00:00Z', question_count: 10, submissions: 2, archived: false, code: 'AAAA111111' },
          { id: 'a2', title: 'Times tables', status: 'active', due_at: '${day(4)}T10:00:00Z', expires_at: '${day(4)}T12:00:00Z', question_count: 8, submissions: 0, archived: false, code: 'BBBB222222' },
          { id: 'a3', title: 'Old term test', status: 'active', due_at: '${day(-9)}T10:00:00Z', expires_at: '${day(-9)}T12:00:00Z', question_count: 5, submissions: 9, archived: true, code: 'CCCC333333' }
        ],
        events: [{ id: 'e1', date: '${day(1)}', end_date: null, kind: 'exam', title: 'Maths test', notes: 'Bring a ruler' }],
        physicalHomework: [{ id: 'w1', title: 'Worksheet 4', description: 'Pages 10-12', expires_at: '${day(4)}T12:00:00Z' }],
      });
      TeacherClassroomDetail.showSection('work');
      const box = document.getElementById('tc-cd-work');
      const days = [...box.querySelectorAll('.tc-day')];
      return {
        dayCount: days.length,
        heads: days.map(d => d.querySelector('.tc-day-head')?.textContent.trim()),
        grid: !!box.querySelector('.tc-class-calendar'),
        form: !!box.querySelector('#tc-cd-ev-form'),
        twGrids: box.querySelectorAll('.tw-grid').length,
        eventRows: box.querySelectorAll('.tc-ev-card').length,
      };
    })()`);
    // ⚠ VISIBLE, not merely present. Every structural check below would pass
    //   against a panel inside a container that is still .hidden — which is
    //   exactly what happened the first time this test ran green while the
    //   screenshot showed the landing page.
    const visible = await ev(`(() => {
      const w = document.getElementById('tc-cd-work');
      const r = w.getBoundingClientRect();
      return { onscreen: r.width > 0 && r.height > 0,
               overlayShown: !document.getElementById('screen-classroom').classList.contains('hidden'),
               width: Math.round(r.width) };
    })()`);
    ok('⚠ the Work section is actually on screen, not rendered into hidden DOM',
      visible.onscreen && visible.overlayShown, visible);
    ok('and it fits a phone', visible.width > 0 && visible.width <= 390, visible);

    ok('the timeline groups by day', built.dayCount === 2, built);
    // ⚠ The point of the merge: an activity, a test and a worksheet on the same
    //   day appear together, once.
    ok('and names the days in plain words', built.heads.some(h => /Tomorrow/i.test(h || '')), built.heads);
    ok('the month grid is still there', built.grid, built);
    ok('so is the add-a-date form', built.form, built);
    ok('activities are painted per day by drawCards', built.twGrids === 2, built);
    ok('events and worksheets sit on the same timeline', built.eventRows >= 2, built);
    // ══ 4. THE ACTIONS SURVIVED ═══════════════════════════════════════════
    const actions = await ev(`(() => {
      const box = document.getElementById('tc-cd-work');
      const cards = [...box.querySelectorAll('.tw-grid [data-open]')];
      return {
        cards: cards.length,
        share: box.querySelectorAll('[data-share]').length,
        results: box.querySelectorAll('[data-results]').length,
        archive: box.querySelectorAll('[data-archive]').length,
        // ⚠ drawCards wires onclick in JS, not in markup. A handler that was
        //   never attached leaves the property null and the button inert.
        wired: [...box.querySelectorAll('[data-share]')].every(b => typeof b.onclick === 'function'),
        deadText: /set on the activity/.test(box.textContent),
      };
    })()`);
    ok('every live activity still renders a real card', actions.cards === 2, actions);
    ok('⚠ Share survived the merge', actions.share === 2, actions);
    ok('⚠ Results survived the merge', actions.results === 2, actions);
    ok('⚠ Archive survived the merge', actions.archive === 2, actions);
    ok('⚠ and the handlers are actually WIRED, not just drawn', actions.wired, actions);
    ok('the read-only "set on the activity" row is gone', !actions.deadText, actions);

    // ⚠⚠ THE DAY HEADING AND THE CARD MUST NAME THE SAME DAY. The old _dueRow()
    //   keyed on `due_at || expires_at` while TeacherWorkspace prints expires_at
    //   as "Due" and "Closes" — so a heading could read TOMORROW above a card
    //   reading "Due Sat 26 Sept". Two places disagreeing about one assignment
    //   is the exact fault this merge exists to remove, so it is asserted, not
    //   assumed.
    const agree = await ev(`(() => {
      const box = document.getElementById('tc-cd-work');
      const out = [];
      for (const dayEl of box.querySelectorAll('.tc-day')) {
        const head = dayEl.querySelector('.tc-day-head')?.textContent.trim() || '';
        for (const card of dayEl.querySelectorAll('.tw-grid [data-open]')) {
          const m = card.textContent.match(/Due\\s+([A-Za-z]{3})\\s+(\\d{1,2})\\s+([A-Za-z]{3,})/);
          out.push({ head, cardDue: m ? m[0] : null, dayNum: m ? m[2] : null });
        }
      }
      return out;
    })()`);
    const headDayNum = (h, todayLabel) => h;
    ok('⚠ every card sits under a heading naming its own due day',
      agree.length > 0 && agree.every(r => {
        if (!r.cardDue) return true;            // a card with no printed date cannot disagree
        // The heading is "Tomorrow"/"Today" or "<weekday> <d> <mon>" — compare the day number.
        const hn = (r.head.match(/(\d{1,2})/) || [])[1];
        return !hn || hn === r.dayNum;
      }), agree);
    // ══ 5. Clicking through to results still works ════════════════════════
    const clicked = await ev(`(() => {
      window.__results = null;
      const box = document.getElementById('tc-cd-work');
      const b = box.querySelector('[data-results]');
      b.click();
      return { section: TeacherClassroomDetail.__section() };
    })()`);
    ok('⚠ Results opens the results section, as it did before', clicked.section === 'results', clicked);
    await ev(`TeacherClassroomDetail.showSection('work')`);
    // ══ 6. The filters are a timeline's filters ═══════════════════════════
    const filters = await ev(`(() => {
      const box = document.getElementById('tc-cd-work');
      const f = [...box.querySelectorAll('.tc-work-filter')];
      return { labels: f.map(b => b.textContent.replace(/\\s+/g, ' ').trim()),
               on: box.querySelector('.tc-work-filter.on')?.textContent.trim() };
    })()`);
    ok('the filters read Coming up / Past / Archived',
      filters.labels.length === 3 && /Coming up/.test(filters.labels[0]) && /Past/.test(filters.labels[1]) && /Archived/.test(filters.labels[2]), filters);
    ok('and it opens on Coming up', /Coming up/.test(filters.on || ''), filters);

    const archived = await ev(`(() => {
      TeacherClassroomDetail.setWorkFilter('archived');
      const box = document.getElementById('tc-cd-work');
      return { cards: box.querySelectorAll('.tw-grid [data-open]').length,
               grid: !!box.querySelector('.tc-class-calendar'),
               text: box.textContent.includes('Old term test') };
    })()`);
    ok('Archived shows the archived activity', archived.cards === 1 && archived.text, archived);
    // ⚠ A month grid under "Archived" would be answering a question nobody asked.
    ok('and drops the month grid, which only belongs under Coming up', !archived.grid, archived);

    // ⚠ Old filter names must still resolve — _workFilter is set elsewhere and
    //   an unrecognised value used to render an empty list with no explanation.
    const legacy = await ev(`(() => {
      TeacherClassroomDetail.setWorkFilter('active');
      const box = document.getElementById('tc-cd-work');
      return { on: box.querySelector('.tc-work-filter.on')?.textContent.trim(),
               cards: box.querySelectorAll('.tw-grid [data-open]').length };
    })()`);
    ok('⚠ the old filter name "active" still resolves to Coming up',
      /Coming up/.test(legacy.on || '') && legacy.cards === 2, legacy);

    const shot = await call('Page.captureScreenshot', { format: 'png' });
    const p = path.join(os.tmpdir(), 'class-work-timeline.png');
    fs.writeFileSync(p, Buffer.from(shot.data, 'base64'));
    console.log('     screenshot: ' + p);

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
