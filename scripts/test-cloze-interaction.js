'use strict';
// End-to-end check of the Textes à Trous player in REAL headless Chrome, at a
// 360px phone width — the real engine/cloze.js, the real style.css, the real
// screens in index.html.
//
// Run: node scripts/test-cloze-interaction.js
//
// ⚠ Fresh Chrome profile + SW bypass + cache disabled, or this measures the
//   PREVIOUS style.css and reports a fix that never landed.
// ⚠ Every CDP call carries its own timeout: an infinite loop in page JS blocks
//   the renderer's message loop, and without one you cannot tell "page wedged"
//   from "harness bug".
// ⚠ Overflow is measured per element. body carries overflow-x: clip, so a
//   scrollWidth check reports every page as clean while content is cut off.
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8801;
const DEBUG_PORT = 9351;
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
const bad = [];
const check = (ok, label, detail) => {
  if (ok) { pass++; console.log('  ok   ' + label); return; }
  fail++; bad.push(label + (detail ? ' — ' + detail : ''));
  console.log('  FAIL ' + label + (detail ? ' — ' + detail : ''));
};

(async function () {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-cloze-'));
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

  // The 45 blocking manifests can still be parsing — poll rather than sleep.
  let ready = false;
  for (let i = 0; i < 40 && !ready; i++) {
    await sleep(500);
    ready = await evalIn('typeof ClozeText !== "undefined" && typeof STATIC_QUESTIONS !== "undefined"').catch(() => false);
  }
  check(!!ready, 'engine/cloze.js loads and defines ClozeText in the real page');
  if (!ready) { ws.close(); chrome.kill(); server.close(); process.exit(1); }

  // Feed the real built bundle in, exactly as QuestionLoader would, and stub
  // only what talks to the network/progress store.
  const bundle = JSON.parse(fs.readFileSync(path.join(ROOT, 'netlify/question-bundles/grade5-french.json'), 'utf8'))
    .filter(q => q.chapterId === 'g5fr-textes-trous');
  await evalIn(`
    window.__recorded = [];
    window.__saved = 0;
    STATIC_QUESTIONS.push(...${JSON.stringify(bundle)});
    window.DB = { chapters: {}, cloze: {}, restrictions: { lockedChapters: [], maxDifficulty: 4 }, stats: {} };
    window.recordAnswer = (ch, ok, src, qid) => window.__recorded.push([ch, ok, src, qid]);
    window.save = () => { window.__saved++; };
    window.toast = () => {};
    if (!Array.isArray(window.CHAPTERS)) window.CHAPTERS = [];
    CHAPTERS.length = 0;
    CHAPTERS.push({ id: 'g5fr-textes-trous', name: 'Textes à Trous', icon: '🧩', enrichment: true });
    true;`);

  check(await evalIn('STATIC_QUESTIONS.filter(q => q.type === "cloze").length') === 20,
    'the 20 built Grade 5 texts are in the pool');

  // ── The list ──
  await evalIn('ClozeText.open("g5fr-textes-trous")');
  // ⚠ Auth.init() routes asynchronously on load and can re-hide the screen a
  // beat later. Settle before measuring, or this reports a bug that is really
  // the harness racing the app's own start-up.
  await sleep(400);
  await evalIn('ClozeText.open("g5fr-textes-trous")');
  check(await evalIn('!document.getElementById("screen-cloze-list").classList.contains("hidden")'),
    'open() shows the list screen');
  check(await evalIn('document.querySelectorAll("#cloze-list-body .clz-item").length') === 20,
    'the list shows all 20 texts');
  check(await evalIn('document.querySelectorAll("#cloze-list-body .clz-badge.is-new").length') === 20,
    'every text starts as "Pas encore fait" (no ticks yet)');

  // ── Open one and inspect the player ──
  await evalIn('document.querySelectorAll("#cloze-list-body .clz-item")[0].click()');
  check(await evalIn('!document.getElementById("screen-cloze-play").classList.contains("hidden")'),
    'tapping a text opens the player');
  check(await evalIn('document.querySelectorAll("#clz-text .clz-gap").length') === 10, 'the text shows 10 gaps');
  check(await evalIn('document.querySelectorAll("#clz-bank .clz-word").length') === 11, 'the bank shows 11 words');
  check(await evalIn('document.getElementById("clz-check").disabled') === true,
    'Check is disabled while gaps remain empty');

  // ── Tap-to-place: the primary mechanic ──
  await evalIn('document.querySelectorAll("#clz-bank .clz-word")[0].click()');
  check(await evalIn('document.querySelectorAll("#clz-text .clz-gap.is-filled").length') === 1,
    'tapping a word fills the first empty gap (no aiming required)');
  check(await evalIn('document.querySelectorAll("#clz-bank .clz-word.is-used").length') === 1,
    'the used word is struck out in the bank');
  const firstWord = await evalIn('ClozeText._texts("g5fr-textes-trous")[0].bank[0]');
  check(await evalIn('document.querySelector("#clz-text .clz-gap.is-filled").textContent.trim()') === firstWord,
    'the gap shows the word that was tapped');

  // ── Tapping a filled gap returns the word ──
  await evalIn('document.querySelector("#clz-text .clz-gap.is-filled").click()');
  check(await evalIn('document.querySelectorAll("#clz-text .clz-gap.is-filled").length') === 0,
    'tapping a filled gap takes the word back out');
  check(await evalIn('document.querySelectorAll("#clz-bank .clz-word.is-used").length') === 0,
    'the word returns to the bank');

  // ── A word cannot be used twice ──
  await evalIn(`
    const b = document.querySelectorAll("#clz-bank .clz-word");
    b[0].click(); b[0].click();
    true;`);
  check(await evalIn('document.querySelectorAll("#clz-text .clz-gap.is-filled").length') === 1,
    'a word already placed cannot be placed a second time');
  await evalIn('ClozeText.clearAll()');
  check(await evalIn('document.querySelectorAll("#clz-text .clz-gap.is-filled").length') === 0,
    '"Tout effacer" empties every gap');

  // ── Overflow at 360px, on a fully filled player ──
  const fillCorrectly = `
    (function () {
      const q = ClozeText._texts("g5fr-textes-trous")[0];
      ClozeText.clearAll();
      for (let g = 0; g < q.gaps; g++) {
        const bi = q.bank.indexOf(q.gapAnswers[g]);
        ClozeText.tapWord(bi);
        // tapWord fills the first EMPTY gap, which is g because we go in order.
      }
      return document.querySelectorAll("#clz-text .clz-gap.is-filled").length;
    })()`;
  check(await evalIn(fillCorrectly) === 10, 'all ten gaps can be filled in order');

  const OVERFLOW = `
    (function (vw) {
      const screen = document.getElementById('screen-cloze-play');
      const inScroller = el => {
        for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
          const o = getComputedStyle(p).overflowX;
          if (o === 'auto' || o === 'scroll' || o === 'hidden' || o === 'clip') return true;
        }
        return false;
      };
      const out = [];
      for (const el of screen.querySelectorAll('*')) {
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden') continue;
        if (r.right - vw <= 8 && -r.left <= 8) continue;
        if (inScroller(el)) continue;
        out.push((el.className || el.tagName) + ' right=' + Math.round(r.right));
      }
      return out;
    })(${VW})`;
  const over = await evalIn(OVERFLOW);
  check(over.length === 0, 'nothing protrudes past 360px on the player screen', over.slice(0, 3).join('; '));

  // Tap targets. iOS/Android guidance is 44px; 40 is the floor this CSS sets.
  // ⚠ offsetHeight, NOT getBoundingClientRect().height. The gaps carry a
  // scale(.82) pop animation, and a rect captured mid-flight reports the VISUAL
  // size — 29px for an element that is really 35.7px tall. That is a
  // measurement artefact, not a tap target a thumb can miss.
  const small = await evalIn(`
    Array.from(document.querySelectorAll('#clz-bank .clz-word, #clz-text .clz-gap'))
      .map((el, i) => ({ i, h: el.offsetHeight, w: el.offsetWidth, t: el.textContent.trim() }))
      .filter(o => o.h < 32)`);
  check(small.length === 0, 'every word chip and gap is at least 32px tall', JSON.stringify(small));

  // ── Marking ──
  await evalIn('ClozeText.check()');
  check(await evalIn('document.querySelectorAll("#clz-text .clz-gap.is-right").length') === 10,
    'a perfect answer marks all ten gaps right');
  check(/10\s*\/\s*10/.test(await evalIn('document.querySelector(".clz-score").textContent')),
    'the score reads 10 / 10');
  check(await evalIn('document.querySelectorAll(".clz-r-list li").length') === 10,
    'the review lists an explanation for every gap');
  check(await evalIn('document.querySelectorAll("#clz-bank .clz-word.is-spare").length') === 1,
    'the one spare word is called out after marking');
  check(await evalIn('window.__recorded.length') === 10,
    'ten gaps recorded as ten answers (one gap = one mark)');
  check(await evalIn('window.__recorded.every(r => r[0] === "g5fr-textes-trous" && r[1] === true && r[3] === "g5fr-clz-001")'),
    'each answer is attributed to the chapter and to the text id');
  check(await evalIn('window.__saved > 0'), 'progress is saved');
  check(await evalIn('DB.cloze["g5fr-clz-001"] && DB.cloze["g5fr-clz-001"].best') === 10,
    'DB.cloze records the best score');

  // ── A wrong answer marks wrong ──
  await evalIn(`
    ClozeText.start("g5fr-clz-002");
    const q = ClozeText._texts("g5fr-textes-trous").find(t => t.id === "g5fr-clz-002");
    // Deliberately place the spare word first, then the rest in order.
    const spare = q.bank.findIndex(w => !q.gapAnswers.includes(w));
    ClozeText.tapWord(spare);
    for (let g = 1; g < q.gaps; g++) ClozeText.tapWord(q.bank.indexOf(q.gapAnswers[g]));
    ClozeText.check();
    true;`);
  check(await evalIn('document.querySelectorAll("#clz-text .clz-gap.is-wrong").length') === 1,
    'a misplaced word is marked wrong');
  check(await evalIn('document.querySelectorAll("#clz-text .clz-gap.is-right").length') === 9,
    'the other nine stay right');
  check(await evalIn('document.querySelectorAll(".clz-r-list li.is-wrong .clz-r-mine").length') === 1,
    'the review shows what the child put instead');
  check(await evalIn('window.__recorded.filter(r => r[1] === false).length') === 1,
    'exactly one wrong answer is recorded');

  // ── Back to the list: the tick ──
  await evalIn('ClozeText.backToList()');
  const ticked = await evalIn('document.querySelectorAll("#cloze-list-body .clz-item.is-attempted").length');
  check(ticked === 2, 'both attempted texts now carry a tick', 'got ' + ticked);
  check(await evalIn('document.querySelectorAll("#cloze-list-body .clz-badge.is-full").length') === 1,
    'the perfect one is badged differently from the partial one');
  check(/[✓]/.test(await evalIn('document.querySelector("#cloze-list-body .clz-item.is-attempted .clz-badge").textContent')),
    'the badge is a visible tick');
  check(await evalIn('document.querySelectorAll("#cloze-list-body .clz-badge.is-new").length') === 18,
    'the other 18 still read "Pas encore fait", so a child can pick another');

  const overList = await evalIn(OVERFLOW.replace('screen-cloze-play', 'screen-cloze-list'));
  check(overList.length === 0, 'nothing protrudes past 360px on the list screen', overList.slice(0, 3).join('; '));

  // ══ Grade 6: the TWO-PART shape — 6A placed, 6B typed ═══════════════════
  // The half this whole exercise exists for. Everything above measures the
  // one-part Grade 5 player; none of it would have caught a Grade 6 pack that
  // silently had no part B at all.
  const g6 = JSON.parse(fs.readFileSync(path.join(ROOT, 'netlify/question-bundles/grade6-french.json'), 'utf8'))
    .filter(q => q.chapterId === 'g6fr-textes-trous');
  await evalIn(`
    STATIC_QUESTIONS.push(...${JSON.stringify(g6)});
    CHAPTERS.push({ id: 'g6fr-textes-trous', name: 'Textes à Trous', icon: '🧩', enrichment: true });
    window.__recorded = [];
    true;`);

  await evalIn('ClozeText.open("g6fr-textes-trous")');
  check(await evalIn('document.querySelectorAll("#cloze-list-body .clz-item").length') === 20,
    'the Grade 6 list shows all 20 two-part texts');
  check(/6A/.test(await evalIn('document.querySelector("#cloze-list-body .clz-item-meta").textContent')),
    'the card says up front that the text has a 6A and a 6B half');

  await evalIn('ClozeText.start("g6fr-clz-001")');
  check(await evalIn('document.querySelectorAll("#clz-text .clz-gap").length') === 5,
    'part A shows five placed gaps');
  check(await evalIn('document.querySelectorAll("#clz-bank .clz-word").length') === 6,
    'part A offers six words for five gaps — one spare, as on the paper');
  check(await evalIn('document.querySelectorAll("#clz-text-b .clz-input").length') === 5,
    'part B shows five TYPED gaps');
  check(await evalIn('document.querySelectorAll("#clz-text-b .clz-word, #clz-text-b .clz-gap").length') === 0,
    'part B offers no word list at all — that is the entire point of it');
  check(/6A/.test(await evalIn('document.querySelectorAll(".clz-part-h")[0].textContent'))
    && /6B/.test(await evalIn('document.querySelectorAll(".clz-part-h")[1].textContent')),
    "the two halves carry the paper's own 6A / 6B labels");

  // ⚠ An input sized to its own answer prints the answer's length on screen.
  const widths = await evalIn('[...new Set(Array.from(document.querySelectorAll(".clz-input")).map(el => el.offsetWidth))]');
  check(widths.length === 1, 'every typed gap is the SAME width — the box must not leak the answer length',
    JSON.stringify(widths));
  const fontPx = await evalIn('parseFloat(getComputedStyle(document.querySelector(".clz-input")).fontSize)');
  check(fontPx >= 16, 'typed gaps are at least 16px, or iOS zooms in and never back out', fontPx + 'px');
  const shortB = await evalIn("Array.from(document.querySelectorAll('.clz-input')).map(el => el.offsetHeight).filter(h => h < 32)");
  check(shortB.length === 0, 'every typed gap is at least 32px tall', JSON.stringify(shortB));

  // A bank word belongs to part A and can never end up in part B.
  await evalIn('ClozeText.clearAll(); document.querySelectorAll("#clz-bank .clz-word")[0].click();');
  check(await evalIn('document.querySelectorAll("#clz-text .clz-gap.is-filled").length') === 1,
    'tapping a word still fills the first empty part-A gap');
  check(await evalIn('Array.from(document.querySelectorAll("#clz-text-b .clz-input")).every(el => el.value === "")'),
    'a bank word can never land in a part-B gap');

  // ⚠ THE ONE THAT MATTERS. renderPlayer() rebuilds the host's innerHTML; if
  // typing triggered it, the input the child is typing into would be destroyed
  // and the caret would vanish between two letters.
  const caret = await evalIn(`
    (function () {
      const el = document.querySelectorAll('#clz-text-b .clz-input')[0];
      el.focus();
      for (const v of ['r', 'ren', 'rentr', 'rentrer']) {
        el.value = v;
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }
      return {
        sameNode: document.querySelectorAll('#clz-text-b .clz-input')[0] === el,
        focused: document.activeElement === el,
        value: el.value,
      };
    })()`);
  check(caret.sameNode && caret.focused && caret.value === 'rentrer',
    'typing never re-renders: the same input node keeps focus and its value', JSON.stringify(caret));
  check(await evalIn('document.getElementById("clz-check").disabled') === true,
    'Check stays disabled while part B is still unfinished');

  // Fill it correctly — but answer gap 6 with an ACCEPTED ALTERNATIVE.
  const filled6 = await evalIn(`
    (function () {
      const q = ClozeText._texts('g6fr-textes-trous').find(t => t.id === 'g6fr-clz-001');
      ClozeText.clearAll();
      for (let g = 0; g < q.gapsA; g++) ClozeText.tapWord(q.bank.indexOf(q.gapAnswers[g]));
      const typed = q.gapAlts.slice(q.gapsA).map((a, i) => (i === 0 ? a[1] : a[0]));
      typed.forEach((v, i) => ClozeText.typeGap(q.gapsA + i, v));
      return { placed: document.querySelectorAll('#clz-text .clz-gap.is-filled').length, typed: typed };
    })()`);
  check(filled6.placed === 5, 'all five part-A gaps can be filled in order');
  check(await evalIn('document.getElementById("clz-check").disabled') === false,
    'Check enables only once all ten gaps are done');
  await evalIn('ClozeText.check()');
  check(/10\s*\/\s*10/.test(await evalIn('document.querySelector(".clz-score").textContent')),
    'an accepted alternative in part B still scores 10 / 10', 'typed "' + filled6.typed[0] + '" for "rentrer"');
  check(await evalIn('window.__recorded.filter(r => r[3] === "g6fr-clz-001").length') === 10,
    'ten gaps recorded as ten answers on a two-part text too (one gap = one mark)');
  check(await evalIn('document.querySelectorAll(".clz-r-list li").length') === 10,
    'the review explains all ten gaps, across both parts');
  check(await evalIn('document.querySelectorAll("#clz-bank .clz-word.is-spare").length') === 1,
    'the one spare word is still called out, and only from part A');

  // ⚠ An accent a phone keyboard will not produce is a device problem, not a
  // French mistake. g6fr-clz-018 gap 9 is « gardés ».
  await evalIn(`
    ClozeText.start('g6fr-clz-018');
    (function () {
      const q = ClozeText._texts('g6fr-textes-trous').find(t => t.id === 'g6fr-clz-018');
      for (let g = 0; g < q.gapsA; g++) ClozeText.tapWord(q.bank.indexOf(q.gapAnswers[g]));
      const b = q.gapAlts.slice(q.gapsA).map(a => a[0]);
      b[3] = 'gardes';
      b.forEach((v, i) => ClozeText.typeGap(q.gapsA + i, v));
      ClozeText.check();
    })();
    true;`);
  check(/10\s*\/\s*10/.test(await evalIn('document.querySelector(".clz-score").textContent')),
    'a missing accent still counts as right');
  check(await evalIn('document.querySelectorAll("#clz-text-b .clz-tgap.is-slip").length') === 1,
    'the accent slip is flagged on the gap itself');
  check(await evalIn('document.querySelectorAll(".clz-r-slip").length') === 1,
    'and the review shows the accented spelling with a nudge');

  // A genuinely wrong typed word costs exactly one mark.
  await evalIn(`
    ClozeText.start('g6fr-clz-003');
    (function () {
      const q = ClozeText._texts('g6fr-textes-trous').find(t => t.id === 'g6fr-clz-003');
      for (let g = 0; g < q.gapsA; g++) ClozeText.tapWord(q.bank.indexOf(q.gapAnswers[g]));
      const b = q.gapAlts.slice(q.gapsA).map(a => a[0]);
      b[0] = 'zzz';
      b.forEach((v, i) => ClozeText.typeGap(q.gapsA + i, v));
      ClozeText.check();
    })();
    true;`);
  check(await evalIn('document.querySelectorAll("#clz-text-b .clz-tgap.is-wrong").length') === 1,
    'a wrong typed word is marked wrong');
  check(/9\s*\/\s*10/.test(await evalIn('document.querySelector(".clz-score").textContent')),
    'and costs exactly one of the ten marks');
  check(await evalIn('document.querySelectorAll(".clz-r-list li.is-wrong .clz-r-mine").length') === 1,
    'the review shows what the child typed instead');
  check(await evalIn('document.querySelectorAll(".clz-r-alt").length') >= 1,
    'the review names the other answers that would also have been accepted');

  const over6 = await evalIn(OVERFLOW);
  check(over6.length === 0, 'nothing protrudes past 360px on the two-part player', over6.slice(0, 3).join('; '));

  ws.close(); chrome.kill(); server.close();
  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('harness error:', e.message); process.exit(1); });
