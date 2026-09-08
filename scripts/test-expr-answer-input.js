'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  The algebraic answer input (question type 'expr'): its keypad, and the
//  legibility of every helper the typed-answer branches draw.
//
//  ── PART A. THE KEYPAD ─────────────────────────────────────────────────
//  `expr` needs inputmode="text" — the answer contains letters — which hands
//  a phone a QWERTY, where `^` is three layers down (123 → #+= → ^). The hint
//  under the box says "use ^" and the keyboard under THAT could barely produce
//  one, because this branch shipped with no pad while the numeric branch has
//  had one since the beginning. Reported by a user on Coordinates & Straight
//  Lines: "normally a small keypad button appears but here it didn't".
//
//  ── PART B. THE COLOURS ────────────────────────────────────────────────
//  ⚠ WHY THIS EXISTS. `#screen-practice` is a BLACKBOARD in both themes, and
//  every colour inside it has to be written by hand — there is no `.dark`
//  variant that covers it, because it is dark in light mode too. Four classes
//  that render inside `#practice-answer-area` carried no `color` at all:
//
//      .expr-hint          "Use ^ for a power - type a^8 for a⁸."
//      .slot-label         "x = ", "y = "
//      .slot-score         "2 of 3 marks."
//      .answer-unsupported "This question can't be answered on screen."
//
//  They inherited the SHEET colour, which in light mode is near-black — so the
//  caret hint under an algebra input was black on a blackboard. Reported by a
//  user on the Grade 9 indices chapter, the first content to ship type 'expr'.
//  The hint is not decoration: a child who types "a8" instead of "a^8" is
//  marked wrong for a notation they were never told.
//
//  ⚠ The board's background is a GRADIENT, so its computed backgroundColor is
//  transparent and a naive contrast probe reads chalk-on-white at 1:1. The
//  ground is composited from a known base (#1e1e1e plus the .08 rule line,
//  whichever is worse) with every ancestor's own translucent fill over it.
//
//  Run: node scripts/test-expr-answer-input.js
//  Exit: 0 clean, 1 problems found.
// ══════════════════════════════════════════════════════════════════════════

const http  = require('http');
const fs    = require('fs');
const os    = require('os');
const path  = require('path');
const { spawn } = require('child_process');

const ROOT   = path.resolve(__dirname, '..');
const PORT   = 8811;
// 44px on the SHORTEST side. The pad's keys are wider than they are tall, so
// height is what this actually tests.
const MIN_TAP = 44;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const MIN    = 4.5;

let pass = 0, fail = 0;
const ck = (label, ok, detail) => {
  if (ok) { pass++; return true; }
  fail++;
  console.log('  FAIL  ' + label + (detail ? '  [' + detail + ']' : ''));
  return false;
};
const section = t => console.log('\n── ' + t + ' ──');

// ── 1. Source guards ──────────────────────────────────────────────────────
section('every helper class carries a colour of its own');
{
  const css = fs.readFileSync(path.join(ROOT, 'style.css'), 'utf8');
  for (const cls of ['expr-hint', 'slot-label', 'slot-score', 'answer-unsupported']) {
    const base = (css.match(new RegExp('\\n\\.' + cls + ' \\{[^}]*\\}')) || [''])[0];
    ck('.' + cls + ' sets a colour on the sheet', /color:/.test(base), base.trim().slice(0, 90));
    ck('#screen-practice .' + cls + ' overrides it for the board',
      new RegExp('#screen-practice \\.' + cls + ' \\{[^}]*color:').test(css));
  }
  ck('.expr-hint no longer dims itself with opacity as well as a colour',
    !/\n\.expr-hint \{[^}]*opacity:/.test(css));
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

// ⚠ KNOWN-SURFACE TABLE. A screen painted with a gradient reports
// `backgroundColor: rgba(0,0,0,0)`, so the walk has to be told what it is
// standing on. #1e1e1e is the board; the repeating rule line lays
// rgba(180,180,180,.08) over it, which is the LIGHTER of the two and therefore
// the worse ground for chalk-coloured text.
const PROBE = `
(function (spec) {
  const KNOWN = { 'screen-practice': [42, 42, 42] };

  const parse = s => {
    const m = String(s).match(/rgba?\\(([^)]+)\\)/);
    if (!m) return null;
    const p = m[1].split(',').map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const over = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
  const lum = c => {
    const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  const ratio = (a, b) => {
    const l1 = lum(a), l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };
  // Collect every translucent fill from the element up, then composite them
  // outermost-first onto the known ground. Taking the first non-transparent
  // background instead reads a .08 tint as solid near-black.
  const ground = el => {
    const stack = [];
    let base = { r: 255, g: 255, b: 255, a: 1 };
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      if (KNOWN[n.id]) { base = { r: KNOWN[n.id][0], g: KNOWN[n.id][1], b: KNOWN[n.id][2], a: 1 }; break; }
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0) { if (c.a >= 0.999) { base = c; break; } stack.push(c); }
    }
    let out = base;
    for (let i = stack.length - 1; i >= 0; i--) out = over(stack[i], out);
    return out;
  };
  // The element's own colour, dimmed by every inherited opacity above it.
  const ink = el => {
    const c = parse(getComputedStyle(el).color) || { r: 0, g: 0, b: 0, a: 1 };
    let a = c.a;
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      a *= parseFloat(getComputedStyle(n).opacity || '1');
    }
    return { r: c.r, g: c.g, b: c.b, a: a };
  };

  document.documentElement.classList.toggle('dark', !!spec.dark);
  for (const s of document.querySelectorAll('.screen')) s.classList.add('hidden');
  const scr = document.getElementById(spec.screen);
  scr.classList.remove('hidden'); scr.style.display = 'block';
  // ⚠ .screen carries 'animation: fadeSlideIn .3s ease both', whose 0% frame
  // is opacity 0. A screen revealed and measured in the same task is still on
  // that frame, so every inherited alpha is zero and every ratio reads 1:1 —
  // a perfect score that means nothing. Kill the animation, don't race it.
  scr.style.animation = 'none';

  const dim = el => { const o=[]; for (let n=el;n&&n!==document.documentElement;n=n.parentElement){ const v=parseFloat(getComputedStyle(n).opacity||'1'); if(v<1) o.push((n.id||n.tagName+'.'+n.className)+'='+v); } return o; };
  const area = spec.screen === 'screen-practice' ? 'practice-answer-area' : 'exam-answer-area';
  const out = [];
  const shot = (key, sel) => {
    const el = document.querySelector('#' + area + ' ' + sel);
    if (!el) { out.push({ key: key, missing: true }); return; }
    const fg = ink(el), bg = ground(el);
    out.push({ key: key,
      color: getComputedStyle(el).color,
      ratio: Math.round(ratio(over(fg, bg), bg) * 100) / 100,
      dim: dim(el).join(' '),
      bg: 'rgb(' + [bg.r, bg.g, bg.b].map(Math.round).join(',') + ')' });
  };

  renderAnswerArea({ type: 'expr', answer: 'y = 2x - 1', acceptableAnswers: ['y = 2x - 1'] }, area, '', false);
  shot('expr-hint', '.expr-hint');

  renderAnswerArea({ type: 'slots', marks: 2,
    slotResponse: { labels: ['x', 'y'], answer: ['3', '5'] } }, area, '', false);
  shot('slot-label', '.slot-label');
  // .slot-score only exists once the part has been marked.
  renderAnswerArea({ type: 'slots', marks: 2,
    slotResponse: { labels: ['x', 'y'], answer: ['3', '5'] } }, area, '["3","9"]', true);
  shot('slot-score', '.slot-score');

  renderAnswerArea({ type: 'construction', answer: '' }, area, '', false);
  shot('answer-unsupported', '.answer-unsupported');

  return out;
})`;

// Drives the real pad through the app's own renderAnswerArea and its own
// insertSymbol/numPadBackspace/numPadClear — never hand-written markup, which
// would measure the harness rather than the app.
const PAD_PROBE = `
(function (spec) {
  for (const s of document.querySelectorAll('.screen')) s.classList.add('hidden');
  const scr = document.getElementById(spec.screen);
  scr.classList.remove('hidden'); scr.style.display = 'block'; scr.style.animation = 'none';

  const area = spec.screen === 'screen-practice' ? 'practice-answer-area' : 'exam-answer-area';
  renderAnswerArea({ type: 'expr', answer: 'y = 2x - 1', acceptableAnswers: ['y = 2x - 1'] },
    area, '', spec.disabled);

  const pad = document.querySelector('#' + area + ' .num-pad-5col');
  const toggle = document.querySelector('#' + area + ' .numpad-toggle');
  if (!pad) return { pad: false, toggle: !!toggle };

  const keys = [...pad.querySelectorAll('.num-pad-btn')];
  const labels = keys.map(b => b.textContent.trim());
  let minW = Infinity, minH = Infinity;
  for (const b of keys) {
    const r = b.getBoundingClientRect();
    minW = Math.min(minW, r.width); minH = Math.min(minH, r.height);
  }
  const padR = pad.getBoundingClientRect();

  // Type through the pad the way a child would, then read the box back.
  const inp = document.getElementById('num-ans-' + area);
  numPadClear(area);
  for (const t of ['y', '=', '2', 'x', '^', '2', '-', '1']) insertSymbol(area, t);
  const typed = inp.value;
  numPadBackspace(area);
  const afterDel = inp.value;
  numPadClear(area);
  insertSymbol(area, 'pi');
  insertSymbol(area, 'sqrt(');
  const words = inp.value;
  numPadClear(area);
  const afterClear = inp.value;

  return {
    pad: true, toggle: !!toggle,
    open: getComputedStyle(pad.parentElement).display !== 'none',
    count: keys.length, labels: labels.join(''),
    minW: Math.round(minW), minH: Math.round(minH),
    right: Math.round(padR.right), vw: window.innerWidth,
    docW: document.documentElement.scrollWidth,
    typed: typed, afterDel: afterDel, words: words, afterClear: afterClear,
  };
})`;

(async function () {
  await new Promise(r => server.listen(PORT, r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'exprhint-test-'));
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=9351',
    '--user-data-dir=' + profile, '--no-first-run', '--no-default-browser-check',
    '--disable-gpu', '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });

  let ver = null;
  for (let i = 0; i < 80 && !ver; i++) {
    try { ver = await getJson('http://127.0.0.1:9351/json/version'); } catch (e) { await sleep(250); }
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
  // ⚠ Every CDP call gets its own timeout, or a wedged renderer is
  // indistinguishable from a broken harness.
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
  // ⚠ The service worker serves a stale shell — without both of these you
  // measure the previous style.css and report a fix that never landed.
  await S('Network.setCacheDisabled', { cacheDisabled: true });
  for (const dom of ['Network.setBypassServiceWorker', 'Page.setBypassServiceWorker']) {
    try { await S(dom, { bypass: true }); break; } catch (_) {}
  }
  await S('Emulation.setDeviceMetricsOverride', { width: 360, height: 740, deviceScaleFactor: 1, mobile: true });

  async function measure(spec) {
    await S('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/index.html' });
    // ⚠ Poll for the RENDERER, not for markup that is in index.html from the
    // first byte — that races app.js and the probe throws at some sizes only.
    let ready = false;
    for (let i = 0; i < 40 && !ready; i++) {
      await sleep(500);
      const q = await S('Runtime.evaluate', { returnByValue: true,
        expression: 'typeof renderAnswerArea === "function"'
          // ⚠ index.html ships <body style="opacity:0"> and Auth.init() reveals it
          //   when routing settles. Probe before that and every inherited alpha is
          //   zero, so every contrast ratio reads a flawless 1:1.
          + ' && getComputedStyle(document.body).opacity === "1"' });
      ready = q.result.value;
    }
    if (!ready) return { error: 'app.js never finished loading' };
    const res = await S('Runtime.evaluate', { returnByValue: true,
      expression: '(' + (spec.probe || PROBE) + ')(' + JSON.stringify(spec) + ')' });
    if (res.exceptionDetails) {
      const d = res.exceptionDetails;
      return { error: String((d.exception && d.exception.description) || d.text).split('\n')[0] };
    }
    return res.result.value;
  }

  const CASES = [
    { screen: 'screen-practice', dark: false, label: 'practice board · light theme' },
    { screen: 'screen-practice', dark: true,  label: 'practice board · dark theme' },
    { screen: 'screen-exam',     dark: false, label: 'exam sheet     · light theme' },
    { screen: 'screen-exam',     dark: true,  label: 'exam sheet     · dark theme' },
  ];

  section('an algebraic answer has a keypad that can actually type ^');
  for (const c of [{ screen: 'screen-practice', label: 'practice' },
                   { screen: 'screen-exam',     label: 'exam    ' }]) {
    const m = await measure({ screen: c.screen, disabled: false, probe: PAD_PROBE });
    if (m.error) { ck(c.label + ' keypad', false, m.error); continue; }
    if (!ck(c.label + ': the ⌨️ Keypad toggle is drawn', m.toggle === true)) continue;
    if (!ck(c.label + ': the algebra pad is drawn', m.pad === true)) continue;

    console.log('  ' + c.label + '  ' + m.count + ' keys, ' + m.minW + 'x' + m.minH
      + 'px smallest, right edge ' + m.right + ' of ' + m.vw);
    console.log('    keys: ' + m.labels);

    ck(c.label + ': it is open on a phone without a second tap', m.open === true);
    ck(c.label + ': 25 keys', m.count === 25, String(m.count));
    // The ones a child cannot reasonably reach on a phone QWERTY.
    for (const k of ['^', '(', ')', '/', '=', '−', 'π', '√'])
      ck(c.label + ': the pad carries ' + k, m.labels.includes(k), m.labels);
    for (const k of ['x', 'y', 'n', '⌫', 'C'])
      ck(c.label + ': the pad carries ' + k, m.labels.includes(k), m.labels);

    ck(c.label + ': every key clears ' + MIN_TAP + 'px on its shortest side',
      Math.min(m.minW, m.minH) >= MIN_TAP, m.minW + 'x' + m.minH);
    ck(c.label + ': the pad does not run off a 360px phone',
      m.right <= m.vw && m.docW <= m.vw, 'right ' + m.right + ', doc ' + m.docW + ', vw ' + m.vw);

    // ⚠ Type through the pad and read the BOX back. Asserting the button
    //   exists passes whether or not it puts anything in the input.
    ck(c.label + ': tapping the keys types the answer',
      m.typed === 'y=2x^2-1', JSON.stringify(m.typed));
    ck(c.label + ': ⌫ removes one character', m.afterDel === 'y=2x^2-', JSON.stringify(m.afterDel));
    // ⚠ π and √ must insert what markExpression() normalises. The GLYPH would
    //   never match an authored answer, and the child would be marked wrong
    //   for using the key the app gave them.
    ck(c.label + ': π types "pi" and √ types "sqrt(", not the glyphs',
      m.words === 'pisqrt(', JSON.stringify(m.words));
    ck(c.label + ': C empties the box', m.afterClear === '', JSON.stringify(m.afterClear));
  }
  {
    const m = await measure({ screen: 'screen-practice', disabled: true, probe: PAD_PROBE });
    ck('a marked question shows no keypad', m.pad === false && m.toggle === false,
      'pad ' + m.pad + ', toggle ' + m.toggle);
  }

  section('the helper text is readable wherever renderAnswerArea draws it');
  for (const c of CASES) {
    const rows = await measure(c);
    if (rows.error) { ck(c.label, false, rows.error); continue; }
    console.log('  ' + c.label);
    for (const r of rows) {
      if (r.missing) { ck(c.label + ' → ' + r.key + ' rendered', false, 'not in the DOM'); continue; }
      console.log('    ' + r.key.padEnd(20) + String(r.ratio).padStart(6) + ':1   '
        + r.color.padEnd(26) + ' on ' + r.bg + (r.dim ? '   dimmed by ' + r.dim : ''));
      ck(c.label + ' → ' + r.key + ' clears ' + MIN + ':1', r.ratio >= MIN, r.ratio + ':1');
    }
  }

  try { ws.close(); } catch (_) {}
  try { chrome.kill(); } catch (_) {}
  server.close();

  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
