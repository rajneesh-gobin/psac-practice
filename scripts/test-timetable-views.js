'use strict';
// My Timetable: list ⇄ calendar, measured in REAL headless Chrome against the
// real index.html / style.css / engine/app.js at a 360px phone and a 768px
// tablet, in both themes.
//
// Run: node scripts/test-timetable-views.js
//
// ⚠ SW bypass + cache disabled, or this measures the PREVIOUS style.css and
//   reports a fix that never landed.
// ⚠ Overflow is judged per element: body carries overflow-x: clip, so a
//   scrollWidth check calls every page clean while content is cut off.
// ⚠ Every CDP call carries its own timeout - a wedged renderer never answers.
// ⚠ No real family is touched: Calendar's three read methods are stubbed, so
//   nothing signs in and no pin_attempts counter moves.
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8814;
const DEBUG_PORT = 9364;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

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
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream',
    'Cache-Control': 'no-store' });
  fs.createReadStream(file).pipe(res);
});

const getJson = url => new Promise((ok, no) => {
  http.get(url, r => { let b = ''; r.on('data', c => { b += c; }); r.on('end', () => ok(JSON.parse(b))); }).on('error', no);
});
const sleep = ms => new Promise(r => setTimeout(r, ms));

let pass = 0, fail = 0;
const bad = [];
const check = (ok, label, detail) => {
  if (ok) { pass++; console.log('  ok   ' + label); return; }
  fail++; bad.push(label + (detail ? ' — ' + detail : ''));
  console.log('  FAIL ' + label + (detail ? ' — ' + detail : ''));
};

// Two in-month days that are never today, so the month grid always holds them.
const now = new Date();
const pad = n => String(n).padStart(2, '0');
const dkey = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
const TODAY = dkey(now.getFullYear(), now.getMonth(), now.getDate());
const inMonth = [3, 12, 22, 26].filter(d => d !== now.getDate()
  && d <= new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate());
const DAY_A = dkey(now.getFullYear(), now.getMonth(), inMonth[0]);
const DAY_B = dkey(now.getFullYear(), now.getMonth(), inMonth[1]);

const ENTRIES = [
  { id: 1, date: TODAY, label: 'Fractions', minutes: 30, notes: 'Bring your ruler',
    subjectId: 'grade5-maths', subjectName: 'Mathematics', chapterId: 'fractions', icon: '📐' },
  { id: 2, date: TODAY, label: 'Plants', minutes: 20, notes: null,
    subjectId: 'grade5-science', subjectName: 'Science', chapterId: 'plants', icon: '🌱' },
  { id: 3, date: DAY_A, label: 'Decimals', minutes: 30, notes: null,
    subjectId: 'grade5-maths', subjectName: 'Mathematics', chapterId: 'decimals', icon: '📐' },
  { id: 4, date: DAY_A, label: 'Comprehension', minutes: 25, notes: null,
    subjectId: 'grade5-english', subjectName: 'English', chapterId: 'comprehension', icon: '📖' },
  { id: 5, date: DAY_A, label: 'Verbes', minutes: 25, notes: null,
    subjectId: 'grade5-french', subjectName: 'French', chapterId: 'verbes', icon: '🇫🇷' },
  // No chapterId: the row is still shown, with no start button, exactly as the
  // list view has always shown it.
  { id: 6, date: DAY_B, label: 'Revision', minutes: null, notes: null,
    subjectId: 'grade5-maths', subjectName: 'Mathematics', chapterId: null, icon: '📚' },
];
const ACTIVITY = [
  { kind: 'practice', date: TODAY, title: 'Fractions', detail: '12 questions', pct: 75,
    icon: '📝', label: 'Practice', subjectName: 'Mathematics', subjectIcon: '📐', isToday: true },
];

const RGB = `const rgb = v => (String(v).match(/[0-9.]+/g) || []).map(Number);
  const lum = c => { const f = x => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
  const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
  // ⚠ Composite the translucent layers. Taking the first background with any
  // alpha at all reads rgba(15,23,42,.07) - a barely-there tint - as a solid
  // near-black, and then reports 1.2:1 for text that is perfectly legible.
  const bgOf = el => {
    const layers = []; let n = el;
    while (n && n.nodeType === 1) {
      const c = rgb(getComputedStyle(n).backgroundColor);
      const a = c.length > 3 ? c[3] : 1;
      if (a > 0) layers.push([c[0], c[1], c[2], a]);
      if (a === 1) break;
      n = n.parentElement;
    }
    let base = document.documentElement.classList.contains('dark') ? [17, 24, 39] : [255, 255, 255];
    for (let i = layers.length - 1; i >= 0; i--) {
      const [r, g, b, a] = layers[i];
      base = [r * a + base[0] * (1 - a), g * a + base[1] * (1 - a), b * a + base[2] * (1 - a)];
    }
    return base;
  };
  const contrast = el => Math.round(ratio(rgb(getComputedStyle(el).color), bgOf(el)) * 10) / 10;`;

(async function () {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-tt-'));
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
  ws.onmessage = ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const q = pending.get(m.id); pending.delete(m.id);
      if (m.error) q.reject(new Error(m.error.message)); else q.resolve(m.result);
    }
  };
  function send(method, params, sessionId) {
    const mid = ++id;
    return new Promise((resolve, reject) => {
      const t = setTimeout(() => { pending.delete(mid); reject(new Error('CDP timeout: ' + method)); }, 20000);
      pending.set(mid, { resolve: r => { clearTimeout(t); resolve(r); }, reject: e => { clearTimeout(t); reject(e); } });
      ws.send(JSON.stringify({ id: mid, method, params: params || {}, sessionId }));
    });
  }

  const t1 = await send('Target.createTarget', { url: 'about:blank' });
  const t2 = await send('Target.attachToTarget', { targetId: t1.targetId, flatten: true });
  const S = (m, p) => send(m, p, t2.sessionId);
  await S('Page.enable'); await S('Runtime.enable'); await S('Network.enable');
  await S('Network.setCacheDisabled', { cacheDisabled: true });
  for (const dom of ['Network.setBypassServiceWorker', 'Page.setBypassServiceWorker']) {
    try { await S(dom, { bypass: true }); break; } catch (_) {}
  }
  const setW = w => S('Emulation.setDeviceMetricsOverride',
    { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 600 });
  await setW(360);
  await S('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/index.html' });

  const evalIn = async expr => {
    const r = await S('Runtime.evaluate', { returnByValue: true, awaitPromise: true, expression: expr });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || 'page threw');
    return r.result.value;
  };

  let ready = false;
  for (let i = 0; i < 40 && !ready; i++) {
    await sleep(500);
    ready = await evalIn('typeof renderSchedule === "function" && typeof Calendar !== "undefined"').catch(() => false);
  }
  check(!!ready, 'the real page loads with renderSchedule and Calendar defined');
  if (!ready) { ws.close(); chrome.kill(); server.close(); process.exit(1); }

  // Auth.init() routes asynchronously and can re-hide a screen a beat later.
  await sleep(600);

  // Wrapped: Runtime.evaluate is not an async context of its own.
  const showTimetable = "(async () => {" +
    "document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));" +
    "document.getElementById('screen-schedule').classList.remove('hidden');" +
    "await renderSchedule(); return true; })()";

  await evalIn(`(async () => {
    window.__started = [];
    window.toast = () => {};
    ACTIVE_STUDENT_ID = 'harness-child';
    DB.restrictions = { lockedChapters: [], maxDifficulty: 4 };
    DB.chapters = { fractions: { attempted: 8, correct: 6, answeredIds: [] } };
    const ENTRIES = ${JSON.stringify(ENTRIES)}.map(e => ({ ...e, isToday: e.date === '${TODAY}' }));
    Calendar.getUpcoming = async () => ENTRIES.filter(e => e.date >= '${TODAY}');
    Calendar.getBacklog = async () => ENTRIES.filter(e => e.date <= '${TODAY}');
    Calendar.getRecentActivity = async () => ${JSON.stringify(ACTIVITY)};
    window.startScheduledSession = (s, c, d) => { window.__started.push([s, c, d]); };
    try { localStorage.removeItem('psac_timetable_view_v1'); } catch (_) {}
    return await ${showTimetable};
  })()`);

  // ── The toggle, and the list view it defaults to ────────────────────────
  console.log('\n— toggle + list view —');
  check(await evalIn('!!document.getElementById("tt-view-list") && !!document.getElementById("tt-view-calendar")'),
    'both view buttons exist on the timetable screen');
  check(await evalIn('document.getElementById("tt-view-list").classList.contains("is-on")'),
    'list is the default view with nothing stored');
  check(await evalIn('document.getElementById("tt-view-list").getAttribute("aria-pressed")') === 'true'
     && await evalIn('document.getElementById("tt-view-calendar").getAttribute("aria-pressed")') === 'false',
    'aria-pressed states the current view');
  check(await evalIn('document.querySelectorAll("#schedule-body .sch-section-backlog").length') === 1,
    'the list still renders its Today & Backlog section');
  check(await evalIn('/Fractions/.test(document.getElementById("schedule-body").textContent)'),
    "today's sessions are listed by name");
  check(await evalIn('/What you have done/.test(document.getElementById("schedule-done").textContent)'),
    'the list view still paints the activity recap below it');
  const btnH = await evalIn('Math.round(document.getElementById("tt-view-list").getBoundingClientRect().height)');
  check(btnH >= 44, 'view buttons are at least 44px tall at 360px', btnH + 'px');

  // ── The calendar view ───────────────────────────────────────────────────
  console.log('\n— calendar view (360px) —');
  await evalIn('setTimetableView("calendar"); true');
  check(await evalIn('document.getElementById("tt-view-calendar").classList.contains("is-on")'),
    'the calendar button becomes the active one');
  check(await evalIn('!!document.querySelector("#schedule-body .tt-grid")'), 'the month grid renders');
  check(await evalIn('document.querySelectorAll("#schedule-body .tt-dow span").length') === 7,
    'seven weekday headings, Monday first');
  check(await evalIn('document.querySelector("#schedule-body .tt-dow span").textContent') === 'Mon',
    'the week starts on Monday');
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  check(await evalIn('document.querySelectorAll("#schedule-body .tt-day:not(.is-blank)").length') === daysInMonth,
    'every day of the month gets a square', daysInMonth + ' expected');
  check(await evalIn('getComputedStyle(document.querySelector("#schedule-body .tt-grid")).gridTemplateColumns.split(" ").length') === 7,
    'the grid computes to seven columns');
  check(await evalIn('document.querySelectorAll("#schedule-body .tt-day.is-today").length') === 1,
    'today is marked, once');
  check(await evalIn(`document.querySelector('#schedule-body .tt-day.is-today .tt-date').textContent === '${now.getDate()}'`),
    'the today square shows the right date number');
  const dateSize = await evalIn('parseFloat(getComputedStyle(document.querySelector("#schedule-body .tt-date")).fontSize)');
  check(dateSize >= 18, 'dates are large (>=18px) at 360px', dateSize + 'px');
  check(await evalIn(`document.querySelector('[onclick="openTimetableDay(\\'${TODAY}\\')"]').querySelectorAll('.tt-chip').length`) === 2,
    "today's square carries a chip per session");
  check(await evalIn(`/\\+1 more/.test(document.querySelector('[onclick="openTimetableDay(\\'${DAY_A}\\')"]').textContent)`),
    'a day with three sessions shows two chips and "+1 more"');
  check(await evalIn(`!!document.querySelector('[onclick="openTimetableDay(\\'${TODAY}\\')"] .tt-done-mark')`),
    'a day with recorded work carries a ✓ marker');
  check(await evalIn('document.querySelectorAll("#schedule-body .tt-legend-item").length') === 4,
    'the legend names every subject in the month');
  check(await evalIn('document.getElementById("schedule-done").innerHTML.trim() === ""'),
    'the recap is cleared in calendar view (each day popup carries its own)');
  // Chips are emoji-only on a phone: 46px of square cannot hold readable words.
  check(await evalIn('getComputedStyle(document.querySelector("#schedule-body .tt-chip-txt")).display') === 'none',
    'chip labels are hidden below 520px, where they could not be read anyway');

  const overflow = await evalIn(`(() => {
    const vw = document.documentElement.clientWidth, out = [];
    document.querySelectorAll('#screen-schedule *').forEach(el => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      if (r.right > vw + 1 || r.left < -1) out.push((el.className || el.tagName) + ' ' + Math.round(r.left) + '..' + Math.round(r.right));
    });
    return out.slice(0, 5);
  })()`);
  check(overflow.length === 0, 'nothing in the calendar protrudes past 360px', overflow.join(' | '));

  // ── Month navigation ────────────────────────────────────────────────────
  console.log('\n— month navigation —');
  const title0 = await evalIn('document.querySelector("#schedule-body .tt-cal-title").textContent');
  await evalIn('ttShiftMonth(1); true');
  const title1 = await evalIn('document.querySelector("#schedule-body .tt-cal-title").textContent');
  check(title1 !== title0, 'the next-month button moves the grid on', title0 + ' -> ' + title1);
  check(await evalIn('document.querySelectorAll("#schedule-body .tt-day.is-today").length') === 0,
    'another month has no "today" square');
  await evalIn('ttGoToday(); true');
  check(await evalIn('document.querySelector("#schedule-body .tt-cal-title").textContent') === title0,
    'Today returns to the current month');

  // ── The day popup ───────────────────────────────────────────────────────
  console.log('\n— day popup —');
  await evalIn(`document.querySelector('[onclick="openTimetableDay(\\'${TODAY}\\')"]').click(); true`);
  await sleep(120);
  check(await evalIn('!document.getElementById("modal-tt-day").classList.contains("hidden")'),
    'tapping a day opens the popup');
  // _Dialogs puts the contract on the PANEL, not the overlay.
  check(await evalIn('document.querySelector("#modal-tt-day > div").getAttribute("role")') === 'dialog'
     && await evalIn('document.querySelector("#modal-tt-day > div").getAttribute("aria-modal")') === 'true',
    'the popup gets the shared dialog contract from _Dialogs');
  check(await evalIn('document.querySelector("#modal-tt-day > div").getAttribute("aria-labelledby")') === 'tt-day-title',
    'the dialog is labelled by the day it is showing');
  check(await evalIn('/session/.test(document.getElementById("tt-day-sub").textContent)'),
    'the popup subtitle counts the day\'s sessions');
  check(await evalIn('document.querySelectorAll("#tt-day-body .tt-sess").length') === 2,
    'both of today\'s sessions are detailed');
  check(await evalIn('/Bring your ruler/.test(document.getElementById("tt-day-body").textContent)'),
    'the parent\'s note for a session is shown');
  check(await evalIn('/75% correct so far/.test(document.getElementById("tt-day-body").textContent)'),
    'a practised chapter reports accuracy, worded as "correct"');
  check(await evalIn('/Not started yet/.test(document.getElementById("tt-day-body").textContent)'),
    'a chapter with no attempts is "not started", never 0%');
  check(await evalIn('document.querySelectorAll("#tt-day-body .tt-start").length') === 2,
    'each session offers Start practice');
  check(await evalIn('document.querySelectorAll("#tt-day-body .tt-sess:first-child .tt-diff").length') === 4,
    'all four levels are offered under the parent cap of 4');
  const smallest = await evalIn(`Math.min(...[...document.querySelectorAll('#tt-day-body button')]
    .map(b => Math.round(b.getBoundingClientRect().height)))`);
  check(smallest >= 44, 'every button in the popup is at least 44px tall', smallest + 'px');
  const popOverflow = await evalIn(`(() => {
    const vw = document.documentElement.clientWidth, out = [];
    document.querySelectorAll('#modal-tt-day *').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width && r.height && (r.right > vw + 1 || r.left < -1)) out.push(el.className + ' ' + Math.round(r.right));
    });
    return out.slice(0, 5);
  })()`);
  check(popOverflow.length === 0, 'the popup fits 360px', popOverflow.join(' | '));

  // Escape closes through the modal's OWN close control, so its cleanup runs.
  await evalIn("document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); true");
  await sleep(80);
  check(await evalIn('document.getElementById("modal-tt-day").classList.contains("hidden")'),
    'Escape closes the popup');
  await evalIn(`openTimetableDay('${TODAY}'); true`);
  await sleep(80);

  // ── Starting work from the popup ────────────────────────────────────────
  console.log('\n— starting work from a day —');
  await evalIn('document.querySelector("#tt-day-body .tt-start").click(); true');
  check(await evalIn('JSON.stringify(window.__started[0])') === JSON.stringify(['grade5-maths', 'fractions', null]),
    'Start practice launches the scheduled session as a mixed round');
  check(await evalIn('document.getElementById("modal-tt-day").classList.contains("hidden")'),
    'the popup closes when a session starts');
  await evalIn(`openTimetableDay('${TODAY}'); document.querySelectorAll('#tt-day-body .tt-diff')[3].click(); true`);
  check(await evalIn('JSON.stringify(window.__started[1])') === JSON.stringify(['grade5-maths', 'fractions', 4]),
    'picking a level passes that level through to the practice round');

  // ── The parent's difficulty cap ─────────────────────────────────────────
  await evalIn(`DB.restrictions.maxDifficulty = 2; openTimetableDay('${TODAY}'); true`);
  check(await evalIn('document.querySelectorAll("#tt-day-body .tt-sess:first-child .tt-diff").length') === 2,
    'levels above the parent cap are not offered at all');
  await evalIn('DB.restrictions.maxDifficulty = 4; true');

  // ── A day with nothing on it, and one with no topic ─────────────────────
  console.log('\n— empty day / unstartable row —');
  const emptyDay = dkey(now.getFullYear(), now.getMonth(), inMonth[2] || 28);
  await evalIn(`openTimetableDay('${emptyDay}'); true`);
  check(await evalIn('/Nothing is planned/.test(document.getElementById("tt-day-body").textContent)'),
    'an empty day says so rather than opening blank');
  check(await evalIn('!!document.querySelector("#tt-day-body .tt-choose")'),
    'an empty day still offers a chapter to practise');
  await evalIn(`openTimetableDay('${DAY_B}'); true`);
  check(await evalIn('document.querySelectorAll("#tt-day-body .tt-start").length') === 0
     && await evalIn('/no topic set/.test(document.getElementById("tt-day-body").textContent)'),
    'a row with no chapter is shown, with no start button and an honest reason');
  await evalIn('closeTimetableDay(); true');

  // ── The choice persists ─────────────────────────────────────────────────
  console.log('\n— persistence + reset rules —');
  check(await evalIn('localStorage.getItem("psac_timetable_view_v1")') === 'calendar',
    'the chosen view is remembered');
  await evalIn(`ttShiftMonth(2); ${showTimetable}`);
  check(await evalIn('!!document.querySelector("#schedule-body .tt-grid")'),
    'reopening the screen keeps the calendar view');
  check(await evalIn('document.querySelector("#schedule-body .tt-cal-title").textContent') === title0,
    'but the month resets to the current one — module state reset in the render');
  await evalIn('setTimetableView("list"); true');
  check(await evalIn('!!document.querySelector("#schedule-body .sch-section-backlog")')
     && await evalIn('/What you have done/.test(document.getElementById("schedule-done").textContent)'),
    'switching back to list repaints the list and its recap');

  // ── Wider screen ────────────────────────────────────────────────────────
  console.log('\n— 768px —');
  await setW(768);
  await evalIn('setTimetableView("calendar"); true');
  await sleep(150);
  check(await evalIn('getComputedStyle(document.querySelector("#schedule-body .tt-chip-txt")).display') !== 'none',
    'chip labels are written into the squares once there is room');
  check(await evalIn('/Fractions/.test(document.querySelector(".tt-day.is-today").textContent)'),
    'the square names the session at 768px');
  const wideDate = await evalIn('parseFloat(getComputedStyle(document.querySelector("#schedule-body .tt-date")).fontSize)');
  check(wideDate >= 22, 'dates grow with the squares', wideDate + 'px');

  // ── Contrast, both themes ───────────────────────────────────────────────
  console.log('\n— contrast —');
  for (const theme of ['light', 'dark']) {
    await evalIn(`document.documentElement.classList.toggle('dark', ${theme === 'dark'});
      setTimetableView('calendar'); openTimetableDay('${TODAY}'); true`);
    await sleep(120);
    const worst = await evalIn(`(() => { ${RGB}
      const sel = ['.tt-cal-title', '.tt-date', '.tt-chip', '.tt-more', '.tt-hint', '.tt-legend-item',
                   '.tt-dow span', '.tt-viewbtn', '.tt-nav', '.tt-today-btn', '.tt-day.is-today .tt-date',
                   '.tt-cal-count', '.tt-viewbtn.is-on', '.tt-sess-title', '.tt-sess-meta',
                   '.tt-sess-note', '.tt-diff', '.tt-start', '.tt-diffs-label', '.tt-choose',
                   '.tt-didsec-head', '.tt-did-title', '.tt-did-meta'];
      const rows = [];
      sel.forEach(s => { const el = document.querySelector(s); if (el) rows.push([s, contrast(el)]); });
      return rows.sort((a, b) => a[1] - b[1]);
    })()`);
    const under = worst.filter(r => r[1] < 4.5);
    check(under.length === 0, `every timetable text clears 4.5:1 in ${theme} mode`,
      under.map(r => r[0] + ' ' + r[1] + ':1').join(', '));
    console.log('       lowest: ' + worst.slice(0, 3).map(r => r[0] + ' ' + r[1] + ':1').join(', '));
    check(worst.length >= 20, `measured ${worst.length} ${theme} styles`);
  }
  await evalIn('document.documentElement.classList.remove("dark"); closeTimetableDay(); true');

  console.log(`\n${pass} passed, ${fail} failed`);
  if (fail) console.log('\nFailures:\n  - ' + bad.join('\n  - '));
  ws.close(); chrome.kill(); server.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
