'use strict';
// End-to-end check of the Chasse aux Erreurs player in REAL headless Chrome at
// a 360px phone width — the real engine/errorhunt.js, the real style.css, the
// real screens in index.html, and the real built bundle.
//
// Run: node scripts/test-error-hunt-interaction.js
//
// THE ONE THING THIS EXISTS FOR:
//   Vérifier must report a COUNT and change nothing else. The moment a checked
//   word looks different from an unchecked one, Vérifier has answered the
//   question instead of the child, and the whole exercise collapses into
//   "click everything, press check, read the colours". So the text's markup is
//   captured before and after a check and asserted BYTE-IDENTICAL.
//
// ⚠ Fresh Chrome profile + SW bypass + cache disabled, or this measures the
//   PREVIOUS style.css and reports a fix that never landed.
// ⚠ Every CDP call carries its own timeout: an infinite loop in page JS blocks
//   the renderer's message loop, and without one you cannot tell "page wedged"
//   from "harness bug".
// ⚠ Poll for `typeof ErrorHunt === "object"`, NOT for #screen-hunt-play, which
//   is in index.html from the first byte and so races the engine scripts.
// ⚠ Overflow is measured per element: body carries overflow-x: clip, so a
//   scrollWidth check reports every page as clean while content is cut off.
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
const bad = [];
const check = (ok, label, detail) => {
  if (ok) { pass++; console.log('  ok   ' + label); return; }
  fail++; bad.push(label + (detail ? ' — ' + detail : ''));
  console.log('  FAIL ' + label + (detail ? ' — ' + detail : ''));
};

(async function () {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-hunt-'));
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

  console.log('\nChasse aux Erreurs — real browser, 360px\n');

  let ready = false;
  for (let i = 0; i < 40 && !ready; i++) {
    await sleep(500);
    ready = await evalIn('typeof ErrorHunt !== "undefined" && typeof STATIC_QUESTIONS !== "undefined"').catch(() => false);
  }
  check(!!ready, 'engine/errorhunt.js loads and defines ErrorHunt in the real page');

  // ⚠ WAIT FOR BOOT TO SETTLE before driving the module. Auth.init() routes to
  //   a screen of its own some time after the engine files parse, and it will
  //   happily hide the player out from under a harness that started too early.
  //   That reads as 'the player screen is shown: FAIL' and then as 0px word
  //   buttons, because a hidden element measures 0 - a boot race dressed up as
  //   a layout collapse. Poll until the visible screen stops changing.
  {
    let last = null, stable = 0;
    for (let i = 0; i < 40 && stable < 3; i++) {
      await sleep(300);
      const now = await evalIn('(document.querySelector(".screen:not(.hidden)") || {}).id || ""');
      stable = now && now === last ? stable + 1 : 0;
      last = now;
    }
    check(stable >= 3, 'the app finished booting and settled on ' + last);
  }
  if (!ready) { ws.close(); chrome.kill(); server.close(); process.exit(1); }

  // Feed the real built bundle in, exactly as QuestionLoader would, and stub
  // only what talks to the network or the progress store.
  const bundle = JSON.parse(fs.readFileSync(path.join(ROOT, 'netlify/question-bundles/grade6-french.json'), 'utf8'))
    .filter(q => q.chapterId === 'g6fr-chasse-erreurs');
  await evalIn(`
    window.__recorded = [];
    window.__saved = 0;
    STATIC_QUESTIONS.push(...${JSON.stringify(bundle)});
    // ⚠ DB is a script-scoped let-binding in engine/app.js, NOT a window property.
    //   Assigning window.DB makes a SECOND object the module never sees, and
    //   the probe then reads back undefined from a stub while the real feature
    //   worked perfectly. Mutate the real binding instead. (Same trap as
    //   ACTIVE_STUDENT_ID and CHAPTERS.)
    DB.chapters = {}; DB.hunt = {}; DB.stats = {};
    DB.restrictions = { lockedChapters: [], maxDifficulty: 4 };
    window.recordAnswer = (ch, ok, src, qid) => window.__recorded.push([ch, ok, src, qid]);
    window.save = () => { window.__saved++; };
    window.toast = m => { window.__toast = m; };
    window.launchConfetti = () => {};
    if (!Array.isArray(window.CHAPTERS)) window.CHAPTERS = [];
    CHAPTERS.length = 0;
    CHAPTERS.push({ id: 'g6fr-chasse-erreurs', name: 'Chasse aux Erreurs', icon: '🔍', enrichment: true });
    true;`);

  check(await evalIn('STATIC_QUESTIONS.filter(q => q.type === "errorhunt").length') === 20,
    'the 20 built Grade 6 texts are in the pool');

  // ── the list ─────────────────────────────────────────────────────────────
  console.log('\n— the list —');
  await evalIn('ErrorHunt.open("g6fr-chasse-erreurs")');
  await sleep(150);
  check(await evalIn('!document.getElementById("screen-hunt-list").classList.contains("hidden")'),
    'the list screen is shown');
  check(await evalIn('document.querySelectorAll("#hunt-list-body .eh-item").length') === 20,
    'the list offers all 20 texts');
  check(await evalIn('/12 erreurs cachées/.test(document.querySelector(".eh-item-meta").textContent)'),
    'each card says how many errors are hidden in that text');

  // ── the player ───────────────────────────────────────────────────────────
  console.log('\n— the player —');
  const firstId = await evalIn('ErrorHunt._texts("g6fr-chasse-erreurs")[0].id');
  await evalIn(`ErrorHunt.start("${firstId}")`);
  await sleep(150);
  check(await evalIn('!document.getElementById("screen-hunt-play").classList.contains("hidden")'),
    'the player screen is shown');

  const nWords = await evalIn('document.querySelectorAll("#eh-text .eh-w").length');
  const qWords = await evalIn(`STATIC_QUESTIONS.find(q => q.id === "${firstId}").words.length`);
  check(nWords === qWords, 'EVERY word is a clickable button', nWords + ' buttons for ' + qWords + ' words');
  check(await evalIn('[...document.querySelectorAll("#eh-text .eh-w")].every(b => b.tagName === "BUTTON" && !b.disabled)'),
    'every word button is enabled before the child finishes');

  // Nothing may hint at the answers before Terminer.
  check(await evalIn('document.querySelectorAll("#eh-text .is-found, #eh-text .is-missed, #eh-text .is-false").length') === 0,
    'no verdict is painted on any word at the start');
  check(await evalIn('!/eh-review/.test(document.getElementById("hunt-play-body").innerHTML)'),
    'the answers panel is absent at the start');

  // ── tapping ──────────────────────────────────────────────────────────────
  console.log('\n— tapping —');
  await evalIn('ErrorHunt.tap(0)');
  check(await evalIn('document.querySelector(\'.eh-w[data-w="0"]\').classList.contains("is-picked")'),
    'tapping a word marks it as picked');
  check(await evalIn('document.querySelector(\'.eh-w[data-w="0"]\').getAttribute("aria-pressed") === "true"'),
    'the picked state is exposed to a screen reader');
  await evalIn('ErrorHunt.tap(0)');
  check(await evalIn('!document.querySelector(\'.eh-w[data-w="0"]\').classList.contains("is-picked")'),
    'tapping the same word again un-picks it');

  // ⚠ A tap must not re-render the host. If it does, the button under the
  //   finger is destroyed and the page jumps to the top of the text.
  await evalIn('window.__probe = document.querySelector(\'.eh-w[data-w="3"]\'); ErrorHunt.tap(3); true;');
  check(await evalIn('window.__probe === document.querySelector(\'.eh-w[data-w="3"]\')'),
    'a tap does NOT rebuild the text — the same DOM node survives it');
  await evalIn('ErrorHunt.tap(3)');

  // ── Vérifier: a number, and nothing else ────────────────────────────────
  console.log('\n— Vérifier reveals only a count —');
  // Pick every real error plus three correct words, so a leak would be obvious.
  const picked = await evalIn(`(function(){
    const q = STATIC_QUESTIONS.find(x => x.id === "${firstId}");
    const wrong = [];
    for (let i = 0; i < q.words.length && wrong.length < 3; i++) if (!q.errAt.includes(i)) wrong.push(i);
    const take = q.errAt.slice(0, 5).concat(wrong);
    take.forEach(i => ErrorHunt.tap(i));
    return { hits: q.errAt.slice(0, 5).length, total: q.errors, picks: take.length };
  })()`);

  const before = await evalIn('document.getElementById("eh-text").innerHTML');
  await evalIn('ErrorHunt.check()');
  await sleep(80);
  const after = await evalIn('document.getElementById("eh-text").innerHTML');
  check(before === after,
    'THE TEXT IS BYTE-IDENTICAL AFTER Vérifier — no word is coloured, marked or disabled');
  check(await evalIn('document.querySelectorAll("#eh-text .is-found, #eh-text .is-missed, #eh-text .is-false").length') === 0,
    'still no verdict class on any word after Vérifier');
  check(await evalIn('!/eh-review/.test(document.getElementById("hunt-play-body").innerHTML)'),
    'the answers panel is still absent after Vérifier');

  const progress = await evalIn('document.getElementById("eh-progress").textContent');
  check(new RegExp(picked.hits + ' / ' + picked.total).test(progress),
    'the count is reported: "' + picked.hits + ' / ' + picked.total + '"', progress);
  check(/dernière vérification/.test(progress),
    'the last result stays on screen, so a check need not be re-spent to re-read it');

  // ── the three-check cap ──────────────────────────────────────────────────
  console.log('\n— the cap on Vérifier —');
  check(/\(2\)/.test(await evalIn('document.getElementById("eh-check").textContent')),
    'the button shows how many checks are left');
  await evalIn('ErrorHunt.check()');
  await evalIn('ErrorHunt.check()');
  check(await evalIn('document.getElementById("eh-check").disabled') === true,
    'Vérifier is disabled after the third press — a count you can ask for freely is an oracle');
  const countBefore = await evalIn('document.getElementById("eh-progress").textContent');
  await evalIn('ErrorHunt.check()');
  check(await evalIn('document.getElementById("eh-progress").textContent') === countBefore,
    'a fourth call changes nothing');

  // ── Terminer: everything is revealed ─────────────────────────────────────
  console.log('\n— Terminer reveals everything —');
  await evalIn('ErrorHunt.finish()');
  await sleep(150);
  const shape = await evalIn(`(function(){
    const q = STATIC_QUESTIONS.find(x => x.id === "${firstId}");
    return {
      found:  document.querySelectorAll("#eh-text .is-found").length,
      missed: document.querySelectorAll("#eh-text .is-missed").length,
      falsey: document.querySelectorAll("#eh-text .is-false").length,
      rows:   document.querySelectorAll(".eh-r-list li").length,
      score:  (document.querySelector(".eh-score b") || {}).textContent,
      correct:(document.querySelector(".eh-correct") || {}).textContent,
      want:   q.correct,
      errors: q.errors,
      locked: [...document.querySelectorAll("#eh-text .eh-w")].every(b => b.disabled),
      recorded: window.__recorded.length,
      oks: window.__recorded.filter(r => r[1]).length,
      saved: window.__saved,
      best: (DB.hunt["${firstId}"] || {}).best,
    };
  })()`);
  check(shape.found === 5, 'the 5 errors the child found are marked found', 'got ' + shape.found);
  check(shape.missed === shape.errors - 5, 'the errors they missed are marked missed', 'got ' + shape.missed);
  check(shape.falsey === 3, 'the 3 correct words they wrongly accused are marked', 'got ' + shape.falsey);
  check(shape.rows === shape.errors, 'the answers panel lists every error with its correction and rule',
    shape.rows + ' rows for ' + shape.errors + ' errors');
  check(shape.score === '5 / ' + shape.errors, 'the score is shown', shape.score);
  check(shape.correct === shape.want, 'the fully corrected text is printed at the end');
  check(shape.locked, 'every word is locked once the text is finished');

  // ⚠ Same contract as ClozeText: one recordAnswer per error, because one error
  //   is one mark, and the TEXT id is passed so answeredIds gains it once.
  check(shape.recorded === shape.errors, 'recordAnswer runs once per error', shape.recorded + ' calls');
  check(shape.oks === 5, 'exactly the found errors are recorded as correct', shape.oks + ' correct');
  check(await evalIn(`window.__recorded.every(r => r[0] === "g6fr-chasse-erreurs" && r[2] === "errorhunt" && r[3] === "${firstId}")`),
    'every record carries the chapter, the source and the TEXT id');
  check(shape.saved > 0 && shape.best === 5, 'the best score is stored in DB.hunt and saved', 'best=' + shape.best);

  // ── layout at 360px ──────────────────────────────────────────────────────
  console.log('\n— layout on a 360px phone —');
  const layout = await evalIn(`(function(){
    const ws = [...document.querySelectorAll("#eh-text .eh-w")];
    // ⚠ offsetHeight, not getBoundingClientRect: a transformed element reports
    //   its scaled size and that reads as a collapsed layout.
    const h = ws.map(b => b.offsetHeight), w = ws.map(b => b.offsetWidth);
    const over = [];
    document.querySelectorAll("#screen-hunt-play *").forEach(el => {
      let p = el.parentElement, clipped = false;
      while (p && p !== document.body) {
        const o = getComputedStyle(p);
        if (/auto|scroll|hidden|clip/.test(o.overflowX + o.overflowY)) { clipped = true; break; }
        p = p.parentElement;
      }
      if (clipped) return;
      const r = el.getBoundingClientRect();
      if (r.width && r.right > ${VW} + 1) over.push(el.className + ' right=' + Math.round(r.right));
    });
    return { minH: Math.min(...h), minW: Math.min(...w), over: over.slice(0, 4),
             docW: document.documentElement.scrollWidth };
  })()`);
  // ⚠ 44px is bent here, deliberately and only here: every word in a flowing
  //   text is a button, and 44px-tall words turn a 110-word passage into six
  //   phone screens. 40px, with min-width holding the narrow words.
  check(layout.minH >= 38, 'the smallest word button is at least 38px tall', layout.minH + 'px');
  check(layout.minW >= 38, 'even a one-letter word is at least 38px wide', layout.minW + 'px');
  check(layout.over.length === 0, 'nothing protrudes past 360px', layout.over.join(' | '));
  check(layout.docW <= VW + 1, 'the page does not scroll sideways', layout.docW + 'px');

  // ── contrast of the picked state, both themes ────────────────────────────
  console.log('\n— contrast —');
  for (const theme of ['light', 'dark']) {
    // ⚠ Set the theme and MEASURE IN A SEPARATE CALL. Setting data-theme and
    //   reading getComputedStyle in one expression measured the theme that was
    //   there before: the page's own theme code writes this attribute too, and
    //   the probe read a light-mode colour against a dark-mode background and
    //   reported a flat 1:1 on styling that is actually fine. The measured
    //   theme is returned so a failure names which one was really applied.
    await evalIn("document.documentElement.setAttribute('data-theme', '" + theme + "')");
    await sleep(120);
    const c = await evalIn(`(function(){
      const el = document.querySelector('#eh-text .eh-w.is-found') || document.querySelector('#eh-text .eh-w');
      const cs = getComputedStyle(el);
      const num = s => (s.match(/[\\d.]+/g) || []).map(Number);
      const lum = ([r, g, b]) => { const fn = v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); };
        return .2126 * fn(r) + .7152 * fn(g) + .0722 * fn(b); };
      let bg = num(cs.backgroundColor), p = el.parentElement;
      while ((bg.length > 3 && bg[3] === 0) && p) { bg = num(getComputedStyle(p).backgroundColor); p = p.parentElement; }
      const L1 = lum(num(cs.color)), L2 = lum(bg);
      return { ratio: Math.round(((Math.max(L1, L2) + .05) / (Math.min(L1, L2) + .05)) * 100) / 100,
               fg: cs.color, bg: cs.backgroundColor,
               theme: document.documentElement.getAttribute('data-theme') };
    })()`);
    check(c.theme === theme, 'the ' + theme + ' theme actually applied', JSON.stringify(c));
    check(c.ratio >= 4.5, 'a marked word clears 4.5:1 in ' + theme, JSON.stringify(c));
  }
  await evalIn("document.documentElement.removeAttribute('data-theme')");

  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  if (bad.length) { console.log('\nfailures:'); bad.forEach(b => console.log('  - ' + b)); }

  ws.close(); chrome.kill(); server.close();
  try { fs.rmSync(profile, { recursive: true, force: true }); } catch (_) {}
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
