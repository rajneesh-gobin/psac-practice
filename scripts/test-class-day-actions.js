'use strict';
// Tapping a day on the class calendar, and whether its labels can be read.
//
//   node scripts/test-class-day-actions.js
//
// Both reported from the live app:
//   · the section labels were a joined handwriting face at ten pixels;
//   · tapping a day could only produce a calendar note, while a worksheet, a
//     past paper, questions on screen and a shared file were a section away,
//     each with its own date field to fill in again.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const http = require('node:http');
const { spawn } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8915;
const DBG = 9349;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const get = (url) => new Promise((res, rej) => http.get(url, r => {
  let d = ''; r.on('data', c => d += c); r.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(e); } });
}).on('error', rej));

const MIME = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.pdf': 'application/pdf',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.woff': 'font/woff',
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
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-day-'));
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
      if (await ev(`typeof TeacherClassroomDetail !== 'undefined'`)) break;
      await sleep(200);
    }
    for (let i = 0; i < 120; i++) {
      if (await ev(`[...document.querySelectorAll('.screen')].some(s => !s.classList.contains('hidden'))`)) break;
      await sleep(200);
    }
    await sleep(700);

    const day = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
    await ev(`TeacherClassroomDetail.__seed({ className: 'Grade 6 Maths', classGrade: 6,
      assignments: [], events: [], physicalHomework: [] })`);
    await ev(`TeacherClassroomDetail.showSection('work')`);
    await sleep(350);

    // ══ 1. The section labels are readable ════════════════════════════════
    // ⚠ Caveat is this app's identity and is used everywhere — but everywhere
    //   ELSE at 1rem and up. At .62–.7rem a joined handwriting face is not a
    //   style choice, it is illegible.
    const labels = await ev(`(() => {
      const spans = [...document.querySelectorAll('.tc-cd-nav-btn span')];
      return spans.map(s => {
        const cs = getComputedStyle(s);
        return { text: s.textContent.trim(), px: parseFloat(cs.fontSize),
                 family: cs.fontFamily, weight: cs.fontWeight };
      });
    })()`);
    // ⚠ FIVE, not four: the ⋯ More button carries a label span as well, and it
    //   has to be as readable as the rest.
    ok('every section label is present, More included', labels.length === 5, labels.map(l => l.text));
    ok('⚠ none is under 12px', labels.every(l => l.px >= 12), labels.map(l => l.text + ' ' + l.px + 'px'));
    ok('⚠ and none uses the handwriting face',
      labels.every(l => !/caveat/i.test(l.family)), labels.map(l => l.family));
    ok('they are bold enough to scan', labels.every(l => Number(l.weight) >= 600), labels.map(l => l.weight));

    // The chalk face must survive where it has the size to work.
    const chalkKept = await ev(`(() => {
      const t = document.querySelector('#screen-teacher .ta-tab strong');
      const cs = t ? getComputedStyle(t) : null;
      return cs ? { px: parseFloat(cs.fontSize), family: cs.fontFamily } : null;
    })()`);
    ok('⚠ the chalk face is kept on the board tabs, where it is 1.1rem',
      chalkKept && /caveat/i.test(chalkKept.family) && chalkKept.px >= 16, chalkKept);

    // ══ 2. Tapping a day asks what is happening ═══════════════════════════
    const friday = day(3);
    await ev(`TeacherClassroomDetail.calendarPickDate(${JSON.stringify(friday)})`);
    await sleep(300);
    const chooser = await ev(`(() => {
      const o = document.getElementById('tc-hw-choice');
      if (!o) return { open: false };
      const cards = [...o.querySelectorAll('.tc-hw-choice-card')];
      return { open: true, header: o.querySelector('.tc-hw-choice-header span')?.textContent.trim(),
               n: cards.length, titles: cards.map(c => c.querySelector('strong')?.textContent.trim()) };
    })()`);
    // ⚠ Before, this filled the event form's date box and scrolled to it.
    ok('⚠ tapping a day opens the chooser, not just the note form', chooser.open, chooser);
    ok('and it names the day it is about', /\d/.test(chooser.header || ''), chooser.header);
    ok('five things can go on a day', chooser.n === 5, chooser.titles);
    for (const want of [/Questions on screen/i, /Worksheet/i, /past exam paper/i, /file or link/i, /note on the calendar/i]) {
      ok('  … ' + String(want).slice(1, -2), chooser.titles.some(t => want.test(t || '')), chooser.titles);
    }

    // ══ 3. The day travels with the choice ════════════════════════════════
    // ⚠ Each route used to open its own date field at its own default, so the
    //   day the teacher tapped and the day the work landed on could disagree.
    await ev(`TeacherClassroomDetail._chooseWorksheet()`);
    await sleep(300);
    ok('⚠ the worksheet form opens on the day that was tapped',
      await ev(`document.getElementById('phw-due')?.value`) === friday,
      await ev(`document.getElementById('phw-due')?.value`));
    await ev(`document.getElementById('tc-phw-form')?.remove()`);

    await ev(`TeacherClassroomDetail.calendarPickDate(${JSON.stringify(friday)})`);
    await sleep(200);
    // ⚠ The shelf is real data over the network. Wait for a card to exist, or
    //   this measures an empty picker and blames the flow for it.
    await ev(`Library.load()`);
    await ev(`TeacherClassroomDetail._choosePaper()`);
    for (let i = 0; i < 90; i++) {
      if (await ev(`!!document.querySelector('#tc-paper-shelf .lb-choose')`)) break;
      await sleep(200);
    }
    const paperDay = await ev(`(() => {
      const b = document.querySelector('#tc-paper-shelf .lb-choose');
      if (!b) return { noShelf: true };
      b.click();
      return { when: [...document.querySelectorAll('#tc-paper-when .lb-when.is-on')].map(x => x.dataset.when).join(),
               date: document.getElementById('tc-paper-date')?.value,
               rowShown: !document.getElementById('tc-paper-date-row').classList.contains('hidden') };
    })()`);
    if (paperDay.noShelf) {
      ok('the paper shelf loaded', false, paperDay);
    } else {
      ok('⚠ the paper flow opens on that day, not on "Tomorrow"',
        paperDay.when === 'pick' && paperDay.date === friday, paperDay);
      ok('and shows the date box so the day is visible', paperDay.rowShown, paperDay);
    }
    await ev(`TeacherClassroomDetail.closePaperPick()`);

    // ⚠ A past day may be tapped to look at it; work must never be backdated.
    const past = day(-5);
    const backdate = await ev(`(() => {
      const el = document.getElementById('ta-due');
      if (!el) return { noField: true };
      el.value = '';
      TeacherMode.setDueDate(${JSON.stringify(past)});
      return { value: el.value };
    })()`);
    ok('⚠ work is never backdated onto a past day',
      backdate.noField || backdate.value === '', backdate);

    // ══ 4. The note card still does what a day used to do ═════════════════
    await ev(`TeacherClassroomDetail.calendarPickDate(${JSON.stringify(friday)})`);
    await sleep(200);
    await ev(`TeacherClassroomDetail._chooseNote()`);
    await sleep(400);
    ok('the note card fills the calendar form with that day',
      await ev(`document.getElementById('tc-cd-ev-date')?.value`) === friday,
      await ev(`document.getElementById('tc-cd-ev-date')?.value`));

    const shot = await call('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(os.tmpdir(), 'class-day-actions.png'), Buffer.from(shot.data, 'base64'));
    console.log('     screenshot: ' + path.join(os.tmpdir(), 'class-day-actions.png'));

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
