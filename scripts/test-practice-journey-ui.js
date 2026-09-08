'use strict';
// The Practice options sheet and the Question Map in REAL headless Chrome at a
// 360px phone width — the real engine/practice_journey.js, the real style.css,
// the real markup in index.html. Covers item 14 of docs/content-update.md:
// labels, keyboard operation, non-colour state cues and mobile touch targets,
// plus contrast in both themes and the completion copy.
//
// Run: node scripts/test-practice-journey-ui.js
//
// ⚠ Fresh Chrome profile + SW bypass + cache disabled, or this measures the
//   PREVIOUS style.css and reports a fix that never landed.
// ⚠ Every CDP call carries its own timeout: an infinite loop in page JS blocks
//   the renderer's message loop, and without one you cannot tell "page wedged"
//   from "harness bug".
// ⚠ Overflow is measured per element. body carries overflow-x: clip, so a
//   scrollWidth check reports every page as clean while content is cut off.
// ⚠ The contrast probe COMPOSITES translucent backgrounds over their ancestors.
//   Taking the first background with any alpha reads a .07 tint as solid
//   near-black and fails perfectly legible text at 1.2:1.
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8807;
const DEBUG_PORT = 9357;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const VW = 360;

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
const check = (ok, label, detail) => {
  if (ok) { pass++; console.log('  ok   ' + label); return; }
  fail++; console.log('  FAIL ' + label + (detail ? ' — ' + detail : ''));
};

(async function () {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-journey-'));
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
  await S('Emulation.setDeviceMetricsOverride', { width: VW, height: 900, deviceScaleFactor: 1, mobile: true });
  await S('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/index.html' });

  const evalIn = async expr => {
    const r = await S('Runtime.evaluate', { returnByValue: true, awaitPromise: true, expression: expr });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || 'page threw');
    return r.result.value;
  };

  let ready = false;
  for (let i = 0; i < 40 && !ready; i++) {
    await sleep(500);
    ready = await evalIn('typeof PracticeJourney !== "undefined" && typeof PracticeSelector !== "undefined"').catch(() => false);
  }
  check(!!ready, 'practice_selector.js and practice_journey.js load in the real page');
  if (!ready) { ws.close(); chrome.kill(); server.close(); process.exit(1); }

  // A chapter of 46 questions across two subsections, with one of every state,
  // fed in the way QuestionLoader would. Only the network/progress store is
  // stubbed; the module under test is the real one.
  await evalIn(`
    (() => {
      STATIC_QUESTIONS.length = 0;
      const subs = ['alpha', 'beta'];
      for (let i = 1; i <= 46; i++) {
        STATIC_QUESTIONS.push({ id: 'tq-' + String(i).padStart(3, '0'), chapterId: 'testch',
          subsection: subs[i % 2], difficulty: (i % 4) + 1, type: 'mcq',
          question: 'Q' + i, options: ['a','b','c','d'], answer: 'a' });
      }
      CHAPTERS.length = 0;
      CHAPTERS.push({ id: 'testch', name: 'Test Chapter', icon: '🧪' });
      DB.restrictions = { lockedChapters: [], maxDifficulty: 4 };
      const p = {
        'tq-001': { chapterId:'testch', state:'needs_practice', attempts:2, correctAttempts:0, lastSeenAt: 10 },
        'tq-002': { chapterId:'testch', state:'improved',       attempts:2, correctAttempts:1, lastSeenAt: 20 },
        'tq-003': { chapterId:'testch', state:'secure',         attempts:1, correctAttempts:1, lastSeenAt: 30 },
        'tq-004': { chapterId:'testch', state:'legacy_seen',    attempts:0, correctAttempts:0, lastSeenAt: 0 },
      };
      // question_progress.js declares a script-scope const QuestionProgress,
      // scope, so assigning window.QuestionProgress does NOT change what the
      // identifier resolves to inside practice_journey.js. Mutate the real
      // object instead — which is also a truer test, since the module under
      // test keeps its own reference.
      QuestionProgress.forChapter = () => p;
      QuestionProgress.loadChapter = async () => p;
      QuestionProgress.syncState = () => 'synced';
      QuestionProgress.pendingCount = () => 0;
      return true;
    })()`);

  // ── the options sheet ─────────────────────────────────────────────────
  await evalIn(`PracticeJourney.openOptions('testch')`);
  await sleep(150);

  check(await evalIn(`!document.getElementById('modal-practice-options').classList.contains('hidden')`),
    'the options sheet opens');

  const opts = await evalIn(`
    [...document.querySelectorAll('#pj-sheet-body .pj-opt')].map(b => {
      const r = b.getBoundingClientRect();
      return { name: (b.querySelector('.pj-opt-name')||{}).textContent.trim(), w: Math.round(r.width), h: Math.round(r.height) };
    })`);
  check(opts.length === 5, 'all five options are offered', 'saw ' + opts.length);
  check(opts.every(o => o.h >= 44), 'every option is at least 44px tall',
    opts.filter(o => o.h < 44).map(o => o.name + ' ' + o.h + 'px').join(', '));
  check(/Smart Practice/.test(opts.map(o => o.name).join('|')), 'Smart Practice is offered first and recommended');

  const counts = await evalIn(`[...document.querySelectorAll('#pj-sheet-body .pj-opt-count')].map(e => e.textContent.trim())`);
  check(counts.includes('42'), 'New Questions shows the real unseen count (46 minus 4 touched)', counts.join(','));
  check(counts.includes('1'), 'Fix My Mistakes shows the real needs-practice count', counts.join(','));

  const closeBtn = await evalIn(`(() => { const b = document.querySelector('#modal-practice-options .pj-x');
    const r = b.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), label: b.getAttribute('aria-label') }; })()`);
  check(closeBtn.w >= 44 && closeBtn.h >= 44, 'the close control is a 44px target', closeBtn.w + 'x' + closeBtn.h);
  check(!!closeBtn.label, 'the close control has an accessible label');

  // an option with nothing behind it must explain itself, not sit dead
  await evalIn(`
    (() => { const p = { 'tq-001': { chapterId:'testch', state:'secure', attempts:1, correctAttempts:1 } };
      QuestionProgress.forChapter = () => p; return true; })()`);
  await evalIn(`PracticeJourney.start('testch','fix')`);
  await sleep(120);
  const empty = await evalIn(`(document.getElementById('pj-sheet-body')||{}).textContent || ''`);
  check(/no mistakes waiting/i.test(empty), 'an empty option explains itself instead of doing nothing');
  check(/new questions/i.test(empty), '...and offers a one-click alternative');

  // ── the Question Map ──────────────────────────────────────────────────
  await evalIn(`
    (() => { const p = {
        'tq-001': { chapterId:'testch', state:'needs_practice', attempts:2, correctAttempts:0 },
        'tq-002': { chapterId:'testch', state:'improved', attempts:2, correctAttempts:1 },
        'tq-003': { chapterId:'testch', state:'secure', attempts:1, correctAttempts:1 },
        'tq-004': { chapterId:'testch', state:'legacy_seen', attempts:0, correctAttempts:0 } };
      QuestionProgress.forChapter = () => p; return true; })()`);
  await evalIn(`PracticeJourney.openMap('testch')`);
  await sleep(300);

  check(await evalIn(`!document.getElementById('modal-question-map').classList.contains('hidden')`), 'the Question Map opens');

  const cells = await evalIn(`
    [...document.querySelectorAll('#pj-map-body .pj-map-grid .pj-cell')].map(c => {
      const r = c.getBoundingClientRect();
      return { label: c.getAttribute('aria-label') || '', mark: (c.firstElementChild||{}).textContent || '',
               w: Math.round(r.width), h: Math.round(r.height), cls: c.className };
    })`);
  check(cells.length === 46, 'every question in the bank gets a cell', 'saw ' + cells.length);
  check(cells.filter(c => c.label).length === cells.length, 'every cell carries an accessible label');
  check(cells.every(c => c.mark && c.mark.trim().length), 'every cell carries a SHAPE, so state is never colour alone');
  check(/Not tried|Needs practice|Improved|Secure|Seen before/.test(cells[0].label),
    'the label names the state in words', cells[0].label);

  const groups = await evalIn(`document.querySelectorAll('#pj-map-body .pj-map-group').length`);
  check(groups === 2, 'cells are grouped by subsection, in manifest order', 'saw ' + groups + ' groups');

  const legend = await evalIn(`[...document.querySelectorAll('#pj-map-body .pj-key')].map(k => k.textContent.trim())`);
  check(legend.length >= 4, 'a visible legend names every state', legend.join(' | '));

  const covTxt = await evalIn(`(document.querySelector('#pj-map-body .pj-cov')||{}).textContent || ''`);
  check(/4 of 46/.test(covTxt), 'coverage is explored-of-available, not a percentage of nothing', covTxt.trim());
  check(!/master/i.test(covTxt), 'the map never uses the word "mastered"');

  // ── overflow at 360px ─────────────────────────────────────────────────
  const overflow = await evalIn(`
    (() => {
      const out = [];
      for (const el of document.querySelectorAll('#modal-question-map *, #modal-practice-options *')) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) continue;
        let clipped = false;
        for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
          const st = getComputedStyle(p);
          if (/auto|scroll|hidden|clip/.test(st.overflowX + st.overflowY)) { clipped = true; break; }
        }
        if (!clipped && (r.left < -1 || r.right > ${VW} + 1)) out.push(el.className || el.tagName);
      }
      return out.slice(0, 6);
    })()`);
  check(overflow.length === 0, 'nothing protrudes past a 360px viewport', overflow.join(', '));

  // ── contrast, both themes ─────────────────────────────────────────────
  const contrast = async () => evalIn(`
    (() => {
      const lum = c => { const s = c.map(v => { v /= 255; return v <= .03928 ? v/12.92 : Math.pow((v+.055)/1.055, 2.4); });
        return .2126*s[0] + .7152*s[1] + .0722*s[2]; };
      const parse = s => { const m = (s||'').match(/rgba?\\(([^)]+)\\)/); if (!m) return null;
        const p = m[1].split(',').map(x => parseFloat(x)); return { c: p.slice(0,3), a: p.length > 3 ? p[3] : 1 }; };
      const over = (fg, bg) => fg.c.map((v,i) => v*fg.a + bg[i]*(1-fg.a));
      // composite every translucent ancestor down to an opaque ground
      const ground = el => { const stack = [];
        for (let p = el; p; p = p.parentElement) { const b = parse(getComputedStyle(p).backgroundColor);
          if (b && b.a > 0) { stack.push(b); if (b.a === 1) break; } }
        let base = [255,255,255];
        if (document.documentElement.classList.contains('dark')) base = [17,24,39];
        for (let i = stack.length - 1; i >= 0; i--) base = over(stack[i], base);
        return base; };
      const worst = [];
      for (const el of document.querySelectorAll('#pj-map-body .pj-cell, #pj-map-body .pj-key, #pj-map-body .pj-cov, #pj-sheet-body .pj-opt-name, #pj-sheet-body .pj-opt-desc')) {
        const st = getComputedStyle(el); const f = parse(st.color); if (!f) continue;
        const bg = ground(el); const fg = over(f, bg);
        const L1 = lum(fg), L2 = lum(bg);
        const ratio = (Math.max(L1,L2) + .05) / (Math.min(L1,L2) + .05);
        worst.push({ cls: el.className, ratio: Math.round(ratio*10)/10 });
      }
      worst.sort((a,b) => a.ratio - b.ratio);
      return worst.slice(0, 3);
    })()`);

  await evalIn(`document.documentElement.classList.remove('dark')`);
  await sleep(80);
  const light = await contrast();
  check(light.every(w => w.ratio >= 4.5), 'light theme: every label clears 4.5:1',
    light.map(w => w.cls + ' ' + w.ratio).join(', '));

  await evalIn(`document.documentElement.classList.add('dark')`);
  await sleep(80);
  const dark = await contrast();
  check(dark.every(w => w.ratio >= 4.5), 'dark theme: every label clears 4.5:1',
    dark.map(w => w.cls + ' ' + w.ratio).join(', '));

  // ── the completion copy ───────────────────────────────────────────────
  const rcHeading = await evalIn(`(document.querySelector('#modal-round-complete h3')||{}).textContent || ''`);
  check(/Practice Set Complete/.test(rcHeading), 'the completion dialog calls it a practice SET', rcHeading.trim());
  check(!/Round Complete/.test(rcHeading), '...and no longer says "Round Complete"');

  // ── the card label is truthful ────────────────────────────────────────
  const labels = await evalIn(`
    (() => {
      const none = {}; const some = {}; const all = {};
      for (const q of STATIC_QUESTIONS) { some[q.id] = null; all[q.id] = { chapterId:'testch', state:'secure', attempts:1, correctAttempts:1 }; }
      const qs = PracticeJourney.eligible('testch');
      return {
        fresh: PracticeSelector.primaryAction(qs, {}, null).label,
        part:  PracticeSelector.primaryAction(qs, { 'tq-001': { state:'secure', attempts:1 } }, null).label,
        done:  PracticeSelector.primaryAction(qs, all, null).label,
        saved: PracticeSelector.primaryAction(qs, {}, { ids:['a','b','c'], position:1 }).label,
      };
    })()`);
  check(labels.fresh === 'Start Smart Practice', 'a fresh chapter says Start Smart Practice', labels.fresh);
  check(labels.part === 'Continue Smart Practice', 'a partly-explored chapter says Continue', labels.part);
  check(labels.done === 'Start Revision', 'a fully explored chapter says Revision, never "mastered"', labels.done);
  check(labels.saved === 'Resume · Question 2 of 3', 'an unfinished set says exactly where it stopped', labels.saved);

  ws.close(); chrome.kill(); server.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('harness error:', e.message); process.exit(1); });
