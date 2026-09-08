'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  The practice Check/Next bar, and the MCQ option layout.
//
//  ⚠ WHY THIS EXISTS. `.pr-actions` was `position: fixed`, which pinned it to
//  the bottom of the VIEWPORT however short the question was. On a phone that
//  is right — the content fills the screen. On a desktop browser the primary
//  action floated in empty space: measured 2026-09-08 with a one-line MCQ,
//  449px of empty gap at 1920x1080 and 809px at 2560x1440, putting Check
//  Answer ~620px below the last option it belongs to.
//
//  The bug is INVISIBLE on a phone, which is why it survived: it only appears
//  when the viewport is taller than the content. So this test measures the gap
//  at desktop sizes, not just mobile ones.
//
//  Run: node scripts/test-practice-action-bar.js
//  Exit: 0 clean, 1 problems found.
// ══════════════════════════════════════════════════════════════════════════

const http  = require('http');
const fs    = require('fs');
const os    = require('os');
const path  = require('path');
const { spawn } = require('child_process');

// ⚠ path.resolve, NOT a forward-slash literal. path.join() returns backslashes
// on Windows, so a ROOT written with forward slashes fails the startsWith()
// guard below and the server 404s every request — the page then loads empty and
// every measurement silently reads zero.
const ROOT   = path.resolve(__dirname, '..');
const PORT   = 8806;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

let pass = 0, fail = 0;
const ck = (label, ok, detail) => {
  if (ok) { pass++; return true; }
  fail++;
  console.log('  FAIL  ' + label + (detail ? '  [' + detail + ']' : ''));
  return false;
};
const section = t => console.log('\n── ' + t + ' ──');

// ── 1. Source-level guards ────────────────────────────────────────────────
// Cheap, and they name the exact line to put back if someone reverts the fix.
section('the rules that produce the layout');
{
  const css  = fs.readFileSync(path.join(ROOT, 'style.css'), 'utf8');
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const app  = fs.readFileSync(path.join(ROOT, 'engine/app.js'), 'utf8');

  const barRule = (css.match(/\n\.pr-actions \{[^}]*\}/) || [''])[0];
  ck('.pr-actions is position: sticky', /position:\s*sticky/.test(barRule), barRule.slice(0, 120));
  ck('…and NOT position: fixed — that is the whole bug', !/position:\s*fixed/.test(barRule));
  ck('…and keeps margin-inline so the phone bar stays edge-to-edge',
    /margin-inline:\s*-1rem/.test(barRule), barRule.slice(0, 160));

  const wrapRule = (css.match(/\n\.pr-wrap \{[^}]*\}/) || [''])[0];
  ck('.pr-wrap carries NO padding-bottom reserve (it would become a hole)',
    !/padding-bottom/.test(wrapRule), wrapRule);
  ck('body.has-bottom-nav no longer pads .pr-wrap either',
    !/body\.has-bottom-nav \.pr-wrap/.test(css));

  ck('the pause button says "Continue later", not "Pause"',
    /id="practice-pause-btn"[^>]*>[^<]*Continue later/.test(html),
    (html.match(/id="practice-pause-btn"[\s\S]{0,220}?<\/button>/) || [''])[0].slice(-70));

  const pauseFn = (app.match(/function pausePracticeForLater\(\)[\s\S]*?\n\}/) || [''])[0];
  ck('pausePracticeForLater no longer dumps the child on the dashboard',
    !/showScreen\('dashboard'\)/.test(pauseFn), pauseFn.slice(0, 200));
  ck('…it returns to the chapter list instead',
    /SubjectHub\.back\(\)/.test(pauseFn) && /showScreen\('chapter-select'\)/.test(pauseFn));
  ck('…and still saves the resume slot', /_saveResume\(\)/.test(pauseFn));
  ck('…without clearing it the way the Back button does',
    !/_clearPracticeResume/.test(pauseFn));

  ck('renderAnswerArea clears .pr-answers-pair before branching on type',
    /cont\.classList\.remove\('pr-answers-pair'\)/.test(app));
}

// ── 2. Measured in a real browser ─────────────────────────────────────────
const MIME = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css',
  '.json':'application/json', '.svg':'image/svg+xml', '.png':'image/png',
  '.jpg':'image/jpeg', '.geojson':'application/json',
  '.webmanifest':'application/manifest+json', '.ico':'image/x-icon' };

const server = http.createServer(function (req, res) {
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
const getJson = u => new Promise((ok, no) => {
  http.get(u, r => { let b = ''; r.on('data', c => { b += c; }); r.on('end', () => ok(JSON.parse(b))); }).on('error', no);
});
const sleep = ms => new Promise(r => setTimeout(r, ms));

const SHORT_OPTS = ['180', '160', '200', '120'];
const LONG_OPTS  = [
  'Because the reef breaks the waves before they reach the shore',
  'Because the lagoon is shallow and warm all through the year',
  'Because the mountains block the wind coming off the open sea',
  'Because the sand absorbs the force of the water as it lands',
];

// Runs in the page. Reveals practice, renders a question through the app's OWN
// renderAnswerArea (never hand-written markup — that measures the harness, not
// the app), and reports geometry at rest and at full scroll.
const PROBE = `
(function (spec) {
  for (const s of document.querySelectorAll('.screen')) s.classList.add('hidden');
  const scr = document.getElementById('screen-practice');
  scr.classList.remove('hidden'); scr.style.display = 'block';
  document.body.classList.remove('has-bottom-nav');

  document.getElementById('practice-ch-name').textContent = 'Fractions';
  document.getElementById('practice-q-counter').textContent = 'Question 3 of 10';
  document.getElementById('practice-q-text').innerHTML = spec.stem;
  renderAnswerArea({ type: 'mcq', answer: spec.options[0], options: spec.options },
    'practice-answer-area', '', false);

  const fb = document.getElementById('practice-feedback');
  if (spec.feedback) {
    fb.classList.remove('hidden');
    fb.className = 'pr-feedback feedback-wrong';
    fb.innerHTML = '<b>Not quite.</b> Three quarters of 240 is 180, so 60 are left; '
      + 'a third of 60 is 20, leaving 40 to share between 4 crates.';
  } else { fb.classList.add('hidden'); fb.innerHTML = ''; }

  const bar     = document.querySelector('#screen-practice .pr-actions');
  const answers = document.getElementById('practice-answer-area');
  const note    = document.getElementById('practice-error-note');
  const check   = document.getElementById('practice-submit-btn');
  const main    = document.querySelector('main');
  const doc     = document.documentElement;
  const R = el => { const b = el.getBoundingClientRect();
    return { t: Math.round(b.top), b: Math.round(b.bottom), l: Math.round(b.left),
             r: Math.round(b.right), w: Math.round(b.width), h: Math.round(b.height) }; };

  window.scrollTo(0, 0);
  // Lowest real content on the screen, excluding the bar itself.
  let contentBottom = 0;
  for (const el of scr.querySelectorAll('*')) {
    if (bar === el || bar.contains(el)) continue;
    const b = el.getBoundingClientRect();
    if (b.height < 1 || b.width < 1) continue;
    if (b.bottom > contentBottom) contentBottom = b.bottom;
  }
  const rest = { bar: R(bar), answers: R(answers), check: R(check),
                 contentBottom: Math.round(contentBottom) };

  window.scrollTo(0, doc.scrollHeight);
  const end = { barT: Math.round(bar.getBoundingClientRect().top),
                noteB: Math.round(note.getBoundingClientRect().bottom),
                fbB: spec.feedback ? Math.round(fb.getBoundingClientRect().bottom) : -Infinity };
  window.scrollTo(0, 0);

  // ⚠ Measure the options NOW, into plain numbers. Reading them lazily in the
  // return object below measures elements the numeric re-render has already
  // detached, and a detached element reports 0x0 — which reads as "the layout
  // collapsed" rather than "the harness asked too late".
  const opts = [...answers.querySelectorAll('.mcq-opt')];
  const cols = [...new Set(opts.map(o => Math.round(o.getBoundingClientRect().left)))];
  const optCount = opts.length;
  const optCols  = cols.length;
  const optW = optCount ? Math.round(opts[0].getBoundingClientRect().width) : 0;
  const optH = optCount ? Math.round(opts[0].getBoundingClientRect().height) : 0;
  const paired = answers.classList.contains('pr-answers-pair');

  // A non-MCQ rendered straight afterwards must not inherit the pair layout.
  renderAnswerArea({ type: 'numeric', answer: '4', acceptableAnswers: ['4'] },
    'practice-answer-area', '', false);
  const pairedAfterNumeric = answers.classList.contains('pr-answers-pair');

  return {
    vw: window.innerWidth, vh: window.innerHeight,
    position: getComputedStyle(bar).position,
    scrolls: doc.scrollHeight > window.innerHeight,
    rest: rest,
    gapAtRest: rest.bar.t - rest.contentBottom,
    mainW: Math.round(main.getBoundingClientRect().width),
    noteClearsBarAtEnd: end.barT - end.noteB,
    feedbackClearsBarAtEnd: end.barT - end.fbB,
    optCount: optCount, optCols: optCols, optW: optW, optH: optH, paired: paired,
    pairedAfterNumeric: pairedAfterNumeric,
    checkH: rest.check.h,
  };
})`;

const SIZES = [
  { label: 'phone   360x740',   w: 360,  h: 740,  mobile: true,  phone: true },
  { label: 'phone   414x896',   w: 414,  h: 896,  mobile: true,  phone: true },
  { label: 'tablet  768x1024',  w: 768,  h: 1024, mobile: false, phone: false },
  { label: 'laptop  1280x800',  w: 1280, h: 800,  mobile: false, phone: false },
  { label: 'desktop 1920x1080', w: 1920, h: 1080, mobile: false, phone: false },
  { label: 'desktop 2560x1440', w: 2560, h: 1440, mobile: false, phone: false },
];

// The gap the fixed bar used to leave. 8px of slack absorbs sub-pixel rounding
// and the bar's own top border; the failure this guards against was 449-809px,
// so the band does not need to be tight to catch it.
const MAX_GAP = 8;

(async function () {
  await new Promise(r => server.listen(PORT, r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'prbar-test-'));
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=9348',
    '--user-data-dir=' + profile, '--no-first-run', '--no-default-browser-check',
    '--disable-gpu', '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });

  let ver = null;
  for (let i = 0; i < 80 && !ver; i++) {
    try { ver = await getJson('http://127.0.0.1:9348/json/version'); } catch (e) { await sleep(250); }
  }
  if (!ver) { console.error('Chrome never came up'); process.exit(1); }

  const ws = new globalThis.WebSocket(ver.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 0; const pending = new Map();
  ws.onmessage = function (ev) {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { const q = pending.get(m.id); pending.delete(m.id);
      if (m.error) q.reject(new Error(m.error.message)); else q.resolve(m.result); }
  };
  // ⚠ Every CDP call gets its own timeout. An infinite loop in page JS blocks
  // the renderer's message loop, and without this you cannot tell a wedged page
  // from a broken harness.
  function send(method, params, sessionId) {
    const mid = ++id;
    return new Promise(function (resolve, reject) {
      const t = setTimeout(() => { pending.delete(mid); reject(new Error('CDP timeout: ' + method)); }, 25000);
      pending.set(mid, { resolve: r => { clearTimeout(t); resolve(r); },
                         reject: e => { clearTimeout(t); reject(e); } });
      ws.send(JSON.stringify({ id: mid, method, params: params || {}, sessionId }));
    });
  }
  const t1 = await send('Target.createTarget', { url: 'about:blank' });
  const t2 = await send('Target.attachToTarget', { targetId: t1.targetId, flatten: true });
  const S = (m, p) => send(m, p, t2.sessionId);
  await S('Page.enable'); await S('Runtime.enable'); await S('Network.enable');
  // ⚠ The service worker serves a stale shell. Without both of these you
  // measure the previous style.css and report a fix that never landed.
  await S('Network.setCacheDisabled', { cacheDisabled: true });
  for (const dom of ['Network.setBypassServiceWorker', 'Page.setBypassServiceWorker']) {
    try { await S(dom, { bypass: true }); break; } catch (_) {}
  }

  async function measure(size, spec) {
    await S('Emulation.setDeviceMetricsOverride',
      { width: size.w, height: size.h, deviceScaleFactor: 1, mobile: size.mobile });
    await S('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/index.html' });
    // ⚠ Poll for the RENDERER, not for the static markup. .pr-actions exists in
    // index.html from the first byte, so waiting on it races app.js and the
    // probe then throws "renderAnswerArea is not defined" at some widths only.
    let ready = false;
    for (let i = 0; i < 40 && !ready; i++) {
      await sleep(500);
      const q = await S('Runtime.evaluate', { returnByValue: true,
        expression: 'typeof renderAnswerArea === "function" && !!document.querySelector("#screen-practice .pr-actions")' });
      ready = q.result.value;
    }
    if (!ready) return { error: 'app.js never finished loading' };
    const res = await S('Runtime.evaluate', { returnByValue: true,
      expression: '(' + PROBE + ')(' + JSON.stringify(spec) + ')' });
    if (res.exceptionDetails) {
      const d = res.exceptionDetails;
      return { error: String((d.exception && d.exception.description) || d.text).split('\n')[0] };
    }
    return res.result.value;
  }

  section('the bar sits with the content, not at the bottom of the window');
  console.log('  size                 position   gap   bar span        opts');
  for (const size of SIZES) {
    const m = await measure(size, { stem: 'What is <b>3/4</b> of 240?', options: SHORT_OPTS, feedback: false });
    if (m.error) { ck(size.label + ' measures', false, m.error); continue; }
    console.log('  ' + size.label.padEnd(20) + m.position.padEnd(10)
      + (m.gapAtRest + 'px').padStart(6) + '   ' + (m.rest.bar.l + '..' + m.rest.bar.r).padEnd(15)
      + m.optCount + ' in ' + m.optCols + ' col' + (m.optCols > 1 ? 's' : ''));

    ck(size.label + ': the bar is sticky', m.position === 'sticky', m.position);
    ck(size.label + ': no empty gap between content and bar',
      m.gapAtRest >= -1 && m.gapAtRest <= MAX_GAP, m.gapAtRest + 'px');
    if (size.phone) {
      ck(size.label + ': the bar is still edge-to-edge',
        m.rest.bar.l === 0 && m.rest.bar.r === m.vw, m.rest.bar.l + '..' + m.rest.bar.r + ' of ' + m.vw);
    } else {
      ck(size.label + ': the bar does not stripe the whole desktop window',
        m.rest.bar.w <= m.mainW + 2, 'bar ' + m.rest.bar.w + ' vs main ' + m.mainW);
    }
    ck(size.label + ': Check Answer clears 44px',
      m.checkH >= 44, m.checkH + 'px');
    ck(size.label + ': a non-MCQ does not inherit the paired layout',
      m.pairedAfterNumeric === false);
  }

  section('short options pair up on a wide screen, long ones never do');
  for (const size of SIZES) {
    const short = await measure(size, { stem: 'What is <b>3/4</b> of 240?', options: SHORT_OPTS, feedback: false });
    const long  = await measure(size, { stem: 'Why is the lagoon calm?', options: LONG_OPTS, feedback: false });
    if (short.error || long.error) { ck(size.label + ' measures', false, short.error || long.error); continue; }
    ck(size.label + ': short options are tagged pairable', short.paired === true);
    ck(size.label + ': long options are NOT tagged pairable', long.paired === false,
      'a sentence must keep a full row');
    if (size.w >= 700) {
      ck(size.label + ': short options render in 2 columns', short.optCols === 2, short.optCols + ' column(s)');
      ck(size.label + ': long options stay one per row', long.optCols === 1, long.optCols + ' column(s)');
      ck(size.label + ': a paired option is no longer a full-width bar',
        short.optW < long.optW, short.optW + ' vs ' + long.optW);
    } else {
      // ⚠ Below 700px the class is present but the CSS is inactive. Two 160px
      // cells on a 360px phone is under the tap-target guidance and wraps
      // "November to April" onto three lines.
      ck(size.label + ': the phone keeps one option per row', short.optCols === 1, short.optCols + ' column(s)');
    }
    ck(size.label + ': every option clears 44px', short.optH >= 44 && long.optH >= 44,
      short.optH + ' / ' + long.optH);
  }

  section('nothing is unreachable under the pinned bar');
  console.log('  Long question + four long options + the feedback panel open, scrolled to the end.');
  for (const size of SIZES) {
    const m = await measure(size, {
      stem: 'A shop sells 3/4 of its 240 mangoes on Monday and 1/3 of the rest on Tuesday. '
          + 'The owner then divides the mangoes that are left equally between 4 crates. '
          + 'How many mangoes are in each crate? Show all of your working clearly.',
      options: LONG_OPTS, feedback: true });
    if (m.error) { ck(size.label + ' measures', false, m.error); continue; }
    ck(size.label + ': the error note clears the bar at full scroll',
      m.noteClearsBarAtEnd >= 0, m.noteClearsBarAtEnd + 'px');
    ck(size.label + ': the explanation clears the bar at full scroll',
      m.feedbackClearsBarAtEnd >= 0, m.feedbackClearsBarAtEnd + 'px');
  }

  ws.close(); chrome.kill(); server.close();
  console.log('\n' + (fail ? 'FAILED' : 'PASSED') + ': ' + pass + ' checks passed, ' + fail + ' failed.');
  process.exit(fail ? 1 : 0);
})().catch(function (e) { console.error('HARNESS FAIL:', e.message); process.exit(1); });
