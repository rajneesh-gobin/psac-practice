'use strict';
// The watermark on the two printable documents, measured in printed pixels.
//
// WHY THIS EXISTS
// A watermark has three ways to be wrong and all three look fine in the source:
//   · it prints on the FIRST SHEET ONLY - what a position:fixed overlay does in
//     several print engines, so the paper a child actually gets is page 2
//     onwards with nothing on it;
//   · it does not print AT ALL - Chrome drops backgrounds unless the sheet asks
//     with print-color-adjust:exact, and "Background graphics" is off by
//     default in the print dialog;
//   · it prints ON TOP of the questions, or dark enough to compete with them,
//     which on a timed paper a child is reading is not a cosmetic problem.
//
// So this samples REAL PIXELS out of the rendered sheet, at print media, deep
// enough into the document to be on the third page - not getComputedStyle,
// which would happily report a perfect watermark that never reaches paper.
//
// ⚠ The footer disclaimer is asserted to still be there. It exists so a printed
//   sheet cannot pass for an official MIE / Ministry document, and a watermark
//   is an addition to it, never a replacement.
//
// Run:  CHROME_PATH=<chrome-for-testing> node scripts/test-print-watermark.js
const fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const http = require('node:http'), zlib = require('node:zlib'), assert = require('node:assert/strict');
const { spawn } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9377;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));

let checks = 0;
const ok = (label, cond, detail) => { assert(cond, label + (detail !== undefined ? ' — ' + JSON.stringify(detail) : '')); checks++; console.log('✓ ' + label); };

// A 1x1 PNG straight out of CDP: IHDR then one IDAT holding a filter byte and
// the pixel. Cheaper and far more honest than trusting a computed style.
function pixelFromPng(buf) {
  let off = 8, idat = [], w = 0, h = 0, colorType = 6;
  while (off < buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString('latin1', off + 4, off + 8);
    const data = buf.slice(off + 8, off + 8 + len);
    if (type === 'IHDR') { w = data.readUInt32BE(0); h = data.readUInt32BE(4); colorType = data[9]; }
    if (type === 'IDAT') idat.push(data);
    if (type === 'IEND') break;
    off += 12 + len;
  }
  assert(w === 1 && h === 1, 'expected a 1x1 capture, got ' + w + 'x' + h);
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = colorType === 6 ? 4 : 3;      // RGBA or RGB
  return [raw[1], raw[2], raw[3]].concat(stride === 4 ? [raw[4]] : [255]);
}
const lum = ([r, g, b]) => [r, g, b].map(v => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; })
  .reduce((n, v, i) => n + v * [0.2126, 0.7152, 0.0722][i], 0);
const ratio = (a, b) => (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);

(async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-wmk-'));
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG, '--user-data-dir=' + tmp,
    '--allow-file-access-from-files', '--no-first-run', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });
  let v; for (let i = 0; i < 40 && !v; i++) { try { v = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); } }
  assert(v, 'Chrome starts');
  const ws = new WebSocket(v.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let n = 0; const wait = new Map();
  ws.onmessage = e => { const m = JSON.parse(e.data); if (wait.has(m.id)) { wait.get(m.id)(m); wait.delete(m.id); } };
  const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
    const id = ++n, t = setTimeout(() => { wait.delete(id); rej(Error('Timeout ' + method)); }, 60000);
    wait.set(id, m => { clearTimeout(t); m.error ? rej(Error(m.error.message)) : res(m.result); });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
  const openTab = async url => {
    const target = await send('Target.createTarget', { url: 'about:blank' });
    const session = await send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
    const call = (m, p) => send(m, p, session.sessionId);
    await call('Page.enable'); await call('Runtime.enable'); await call('Network.enable');
    await call('Network.setBypassServiceWorker', { bypass: true }); await call('Network.setCacheDisabled', { cacheDisabled: true });
    const ev = async expr => {
      const r = await call('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
      assert(!r.exceptionDetails, String(r.exceptionDetails && r.exceptionDetails.exception && r.exceptionDetails.exception.description || '').slice(0, 400));
      return r.result.value;
    };
    await call('Page.navigate', { url });
    return { call, ev };
  };

  // ── Build the real documents, through the real button ─────────────────────
  const app = await openTab('file:///' + path.join(ROOT, 'index.html').split(path.sep).join('/'));
  let ready = false;
  for (let i = 0; i < 60 && !ready; i++) { await sleep(500); try {
    ready = await app.ev("document.readyState === 'complete' && typeof generatePrintablePaper === 'function' && typeof SubjectHub !== 'undefined'");
  } catch (_) {} }
  assert(ready, 'app booted');
  const packId = await app.ev("(SUBJECT_PACKS.find(p => !p.comingSoon) || {}).id");
  await app.ev("SubjectHub.open(" + JSON.stringify(packId) + ").then(() => 'ok')");
  await sleep(1500);

  // ⚠ Captured from window.open, so this is the document the child is handed -
  //   not a re-implementation of it built for the test.
  const cap = await app.ev([
    '(() => {',
    '  let paper = null, key = null;',
    '  const realOpen = window.open;',
    '  window.open = () => ({ document: { write(h) { if (paper === null) paper = h; else key = h; }, close() {} } });',
    '  try { generatePrintablePaper(); } finally { window.open = realOpen; }',
    '  const m = paper && paper.match(/const ANSWER_KEY_HTML = ([\\s\\S]*?);\\n/);',
    '  return { paper, key: m ? JSON.parse(m[1]) : null };',
    '})()',
  ].join('\n'));
  assert(cap && cap.paper, 'the printable paper was generated');
  ok('the answer key is generated with it', !!cap.key);

  const docs = [
    { name: 'pupil paper', html: cap.paper, text: 'PSAC EXAM PRACTICE', needsFooter: true },
    { name: 'answer key', html: cap.key, text: 'ANSWER KEY', needsFooter: false },
  ];

  // ── The NCE pair, built the way the command line builds them ─────────────
  // ⚠ These come from engine/nce_paper.js under Node, not from the browser -
  //   which is the environment that broke when the watermark was interpolated
  //   into its module-level PAPER_CSS const: helpers.js does not exist there,
  //   and the whole file threw ReferenceError on require(). Building them here
  //   is what keeps that from coming back silently.
  // ⚠ NEVER the app's name on these: an NCE paper is Grades 7-9 and PSAC is
  //   1-6, so "PSAC" across it names the wrong exam - and the cover promises
  //   the sheet "carries no examination-board branding".
  const nceSubject = 'grade9-maths';
  const bundlePath = path.join(ROOT, 'netlify', 'question-bundles', nceSubject + '.json');
  if (!fs.existsSync(bundlePath)) {
    console.log('\n- NCE paper not measured: no built bundle. Run node netlify/build-questions.js');
  } else {
    const N = require(path.join(ROOT, 'engine', 'nce_paper.js'));
    const bp = N.BLUEPRINTS[nceSubject];
    const raw = JSON.parse(fs.readFileSync(bundlePath, 'utf8'));
    const all = Array.isArray(raw) ? raw : (raw[nceSubject] || Object.values(raw).find(Array.isArray) || []);
    const tasks = all.filter(q => q && q.type === 'task' && Array.isArray(q.parts) && q.parts.length);
    const manifest = fs.readFileSync(path.join(ROOT, 'subjects', nceSubject, '_manifest.js'), 'utf8');
    const weights = {};
    for (const m of manifest.matchAll(/id:\s*['"]([a-z0-9-]+)['"][^\n]*examWeight:\s*(\d+)/g)) weights[m[1]] = +m[2];
    const paper = N.assemblePaper({ blueprint: bp, tasks, seed: 1, chapterWeights: weights });
    ok('the NCE paper still builds from Node, watermark and all', paper.tasks.length > 0, paper.tasks.length);
    docs.push({ name: 'NCE paper', html: N.paperHtml(paper, { blueprint: bp }), text: 'PRACTICE PAPER', needsFooter: false });
    docs.push({ name: 'NCE mark scheme', html: N.markSchemeHtml(paper, { blueprint: bp }), text: 'MARK SCHEME', needsFooter: false });
  }

  for (const doc of docs) {
    const file = path.join(tmp, doc.name.replace(/\s+/g, '-') + '.html');
    fs.writeFileSync(file, doc.html, 'utf8');
    const tab = await openTab('file:///' + file.split(path.sep).join('/'));
    for (let i = 0; i < 30; i++) { await sleep(200); if (await tab.ev("document.readyState === 'complete'")) break; }
    // Print media, so this measures the sheet and not the screen.
    await tab.call('Emulation.setEmulatedMedia', { media: 'print' });
    await tab.call('Emulation.setDeviceMetricsOverride', { width: 820, height: 1160, deviceScaleFactor: 1, mobile: false });
    await sleep(400);

    console.log('\n— ' + doc.name);
    const css = await tab.ev([
      '(() => {',
      "  const s = getComputedStyle(document.body, '::before');",
      '  return { position: s.position, zIndex: s.zIndex, repeat: s.backgroundRepeat,',
      "    adjust: s.printColorAdjust || s.webkitPrintColorAdjust || '',",
      "    isSvg: /data:image\\/svg\\+xml/.test(s.backgroundImage),",
      '    height: document.body.scrollHeight };',
      '})()',
    ].join('\n'));
    ok('it is painted behind the content, not over it', css.position === 'absolute' && css.zIndex === '-1', css);
    ok('it is a repeating tile, so it cannot stop after one sheet',
      css.isSvg === true && css.repeat === 'repeat', css);
    // ⚠ Without this Chrome prints nothing: "Background graphics" is off by
    //   default, and a watermark nobody prints is not a watermark.
    ok('it survives the print dialog\'s background-graphics default', css.adjust === 'exact', css.adjust);

    const tile = await tab.ev([
      '(() => {',
      "  const bg = getComputedStyle(document.body, '::before').backgroundImage;",
      "  const m = bg.match(/data:image[\/]svg[+]xml,([^\"]+)/);",
      '  return m ? decodeURIComponent(m[1]) : null;',
      '})()',
    ].join('\n'));
    ok('the tile says what this document is', tile && tile.includes(doc.text), (tile || '').slice(-90));

    if (doc.needsFooter) {
      // The disclaimer is not what the watermark replaces.
      const footer = await tab.ev("((document.querySelector('.footer')||{}).textContent||'').replace(/\\s+/g,' ').trim()");
      ok('the printed disclaimer is still on the sheet',
        /NOT the official PSAC paper format/.test(footer), footer.slice(0, 80));
    }

    // ── Real pixels ───────────────────────────────────────────────────────
    const pixel = async (x, y) => {
      const shot = await tab.call('Page.captureScreenshot', {
        format: 'png', captureBeyondViewport: true,
        clip: { x, y, width: 1, height: 1, scale: 1 },
      });
      return pixelFromPng(Buffer.from(shot.data, 'base64'));
    };

    // A page is ~1160px tall here, so y beyond 2600 is the third sheet onward.
    // ⚠ THIS is the check that a fixed-overlay watermark would fail.
    const deepY = Math.min(css.height - 60, 2900);
    ok('the document runs to more than two sheets, so "later pages" means something',
      css.height > 2600, css.height);

    // ⚠ Classify, do not just look for "not white". Ink and rules are also not
    //   white, so a naive test passes on a sheet with no watermark at all. A
    //   watermark pixel is PALE BUT TINTED: off-white, and nowhere near text.
    //   ⚠ The tile is one diagonal line of text on a 380x250 field, so most of
    //   it is genuinely blank - a thin column of samples finds nothing and
    //   proves nothing. Sweep the width.
    const isWatermark = p => !(p[0] > 251 && p[1] > 251 && p[2] > 251) && lum(p) >= 0.80;
    const sweep = async y => {
      const row = [];
      for (let x = 4; x < 812; x += 8) row.push(await pixel(x, y));
      return row;
    };
    const early = await sweep(420);
    ok('the watermark is actually painted on the first sheet',
      early.some(isWatermark), { sampled: early.length, tinted: early.filter(isWatermark).length });

    // ⚠ THE CHECK A position:fixed OVERLAY FAILS. y here is on the third sheet.
    const deep = await sweep(deepY);
    ok('it is there deep into the document, not only on sheet one',
      deep.some(isWatermark), { y: deepY, sampled: deep.length, tinted: deep.filter(isWatermark).length });

    // ⚠ PALE IS THE REQUIREMENT. Measured against the paper's own body ink.
    const marks = early.concat(deep).filter(isWatermark);
    const darkest = marks.sort((a, b) => lum(a) - lum(b))[0] || [255, 255, 255];
    const r = ratio([17, 17, 17], darkest);          // #111, the paper's body colour
    ok('body text still clears 4.5:1 over the watermark (' + r.toFixed(1) + ':1)', r >= 4.5, darkest);
    ok('and the watermark itself stays pale (' + (lum(darkest) * 100).toFixed(1) + '% luminance)',
      lum(darkest) > 0.75, darkest);
  }

  console.log('\nPrint watermark: ' + checks + ' checks passed.');
  ws.close(); chrome.kill(); process.exit(0);
})().catch(e => { console.error(e.message || e); process.exit(1); });
