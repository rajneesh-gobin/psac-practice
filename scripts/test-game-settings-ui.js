'use strict';
// The parent "Game settings" card and the child's Game Zone mix line, MEASURED
// in headless Chrome at 360px in both themes:
//   • every text style in the open panel clears 4.5:1 against what it sits on
//   • nothing protrudes past the viewport, no horizontal scroll
//   • cards, buttons and toggles are touch-sized
//   • selection is marked by a ✓ and a word, not colour alone
//   • the collapsed card carries the one-line summary + "Customise games"
// Run: node scripts/test-game-settings-ui.js
//
// WARNING Runs on a FRESH Chrome profile with the service worker bypassed — a
//   stale shell would report a style fix as landed when it is not.
const http = require('http');
const fs   = require('fs');
const path = require('path');
const os   = require('os');
const { spawn } = require('child_process');

const ROOT   = path.resolve(__dirname, '..');
const PORT   = 8797;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const MIN_RATIO = 4.5;
const PHONE_W   = 360;

const MIME = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css',
  '.json':'application/json', '.svg':'image/svg+xml', '.png':'image/png',
  '.webmanifest':'application/manifest+json', '.ico':'image/x-icon' };

const server = http.createServer(function (req, res) {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404); res.end('not found'); return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(file).pipe(res);
});
function getJson(url) {
  return new Promise(function (ok, no) {
    http.get(url, function (r) { let b = ''; r.on('data', c => { b += c; }); r.on('end', () => ok(JSON.parse(b))); }).on('error', no);
  });
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

// Nothing here signs in: the parent screen is revealed directly and the card is
// rendered for a stub child with no id (so it matches the signed-out account).
const PROBE = [
  '(() => {',
  '  const rgb = v => (String(v).match(/[0-9.]+/g) || []).map(Number);',
  '  const lum = c => { const f = c.slice(0, 3).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });',
  '    return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2]; };',
  '  const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return Math.round(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)) * 100) / 100; };',
  '  const bgOf = el => { let e = el; while (e && e !== document.documentElement) { const c = rgb(getComputedStyle(e).backgroundColor); if (c.length === 3 || (c.length === 4 && c[3] > 0.99)) return c; e = e.parentElement; }',
  '    const c = rgb(getComputedStyle(document.body).backgroundColor); return (c.length >= 3 && (c.length === 3 || c[3] > 0.99)) ? c : [255, 255, 255]; };',
  '  const measureTheme = theme => {',
  '    document.documentElement.classList.toggle("dark", theme === "dark");',
  '    if (theme === "dark") document.body.style.background = getComputedStyle(document.documentElement).backgroundColor === "rgba(0, 0, 0, 0)" ? "#111827" : "";',
  '    else document.body.style.background = "";',
  '    const rows = [];',
  '    const sel = [".gs-lead", ".gs-h", ".gs-note", ".gs-card.on .gs-card-body b", ".gs-card:not(.on) .gs-card-body b", ".gs-card.on .gs-card-body > span", ".gs-card:not(.on) .gs-card-body > span", ".gs-card.on .gs-card-mark", ".gs-row-label", ".gs-row-val", ".gs-toggle-text b", ".gs-toggle-text span", ".gs-onoff", ".gs-btn-primary", ".gs-which summary", ".mg-mix-line", ".gs-warn"];',
  '    for (const s of sel) { const el = document.querySelector(s); if (!el) { rows.push({ sel: s, missing: true }); continue; }',
  '      const cs = getComputedStyle(el); rows.push({ sel: s, ratio: ratio(rgb(cs.color), bgOf(el)), text: (el.textContent || "").trim().slice(0, 40) }); }',
  '    return rows;',
  '  };',
  '  const screen = document.getElementById("screen-parent");',
  '  if (!screen) return { error: "no #screen-parent" };',
  '  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));',
  '  screen.classList.remove("hidden"); screen.style.display = "block";',
  '  const detail = document.getElementById("pd-detail-panel"); if (detail) { detail.classList.remove("hidden"); detail.style.display = "block"; }',
  '  document.querySelectorAll(".pd-tab-content").forEach(t => t.classList.toggle("hidden", t.getAttribute("data-tab") !== "controls"));',
  '  const controls = document.querySelector(".pd-tab-content[data-tab=controls]"); if (controls) controls.style.display = "block";',
  '  DB.restrictions = {};',
  '  GameSettings.renderParentCard({ grade: 5 });',
  '  const host = document.getElementById("pd-game-settings");',
  '  const collapsed = host ? host.innerHTML : "";',
  '  const measureCollapsed = theme => { document.documentElement.classList.toggle("dark", theme === "dark"); return ["#gs-summary", ".gs-btn-open"].map(s => { const el = document.querySelector(s); const cs = getComputedStyle(el); return { sel: s, ratio: ratio(rgb(cs.color), bgOf(el)) }; }); };',
  '  const collapsedLight = measureCollapsed("light"), collapsedDark = measureCollapsed("dark");',
  '  GameSettings.openCard();',
  '  GameSettings.setMode("custom");',
  '  GameSettings.toggleSubject("french"); GameSettings.toggleSubject("french");',
  '  const docW = document.documentElement.clientWidth;',
  '  const overflow = [];',
  '  host.querySelectorAll("*").forEach(el => { const r = el.getBoundingClientRect(); if (r.width > 0 && (r.right > docW + 1 || r.left < -1)) overflow.push({ tag: el.tagName, cls: el.className && String(el.className).slice(0, 40), right: Math.round(r.right) }); });',
  '  const cardH = Array.from(host.querySelectorAll(".gs-card")).map(el => el.getBoundingClientRect().height);',
  '  const btnH = Array.from(host.querySelectorAll(".gs-btn")).map(el => ({ h: el.getBoundingClientRect().height, sm: el.classList.contains("gs-btn-sm") }));',
  '  const togH = Array.from(host.querySelectorAll(".gs-toggle")).map(el => el.getBoundingClientRect().height);',
  '  const marks = Array.from(host.querySelectorAll(".gs-card.on .gs-card-mark")).map(el => el.textContent.trim());',
  '  const onWords = Array.from(host.querySelectorAll(".gs-card.on .gs-card-body > span")).map(el => el.textContent.trim());',
  '  const sliders = Array.from(host.querySelectorAll("input[type=range]")).map(el => ({ label: el.getAttribute("aria-label"), vt: el.getAttribute("aria-valuetext") }));',
  '  const total = (document.getElementById("gs-pct-total") || {}).textContent;',
  '  // Game Zone hub line for the child.',
  '  const mg = document.getElementById("screen-minigames"); mg.classList.remove("hidden"); mg.style.display = "block";',
  '  try { MiniGames.renderHub(); } catch (e) { return { error: "renderHub: " + e.message }; }',
  '  const mixLine = (document.querySelector(".mg-mix-line") || {}).textContent;',
  '  const light = measureTheme("light").concat(collapsedLight), dark = measureTheme("dark").concat(collapsedDark);',
  '  document.documentElement.classList.remove("dark");',
  '  const chain = []; { let e = document.querySelector(".gs-h"); while (e && e !== document.documentElement) { chain.push((e.id ? "#" + e.id : e.tagName.toLowerCase()) + "=" + getComputedStyle(e).backgroundColor); e = e.parentElement; } }',
  '  return { collapsedHasSummary: /Balanced questions · All subjects · Medium difficulty · 10 questions per round/.test(collapsed), collapsedHasButton: /Customise games/.test(collapsed),',
  '    chain, docW, scrollW: document.documentElement.scrollWidth, overflow, cardH, btnH, togH, marks, onWords, sliders, total, mixLine, light, dark,',
  '    reducedMotionRule: Array.from(document.styleSheets).some(ss => { try { return Array.from(ss.cssRules).some(r => r.media && /prefers-reduced-motion/.test(r.media.mediaText) && Array.from(r.cssRules).some(x => /gs-switch/.test(x.selectorText || ""))); } catch (_) { return false; } }) };',
  '})()',
].join(String.fromCharCode(10));

(async function () {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-gs-'));
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=9347', '--user-data-dir=' + profile,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--window-size=' + PHONE_W + ',900', 'about:blank'], { stdio: 'ignore' });
  let ver = null;
  for (let i = 0; i < 80 && !ver; i++) { try { ver = await getJson('http://127.0.0.1:9347/json/version'); } catch (e) { await sleep(250); } }
  if (!ver) throw new Error('Chrome never came up');
  const ws = new globalThis.WebSocket(ver.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 0; const pending = new Map();
  ws.onmessage = ev => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { const q = pending.get(m.id); pending.delete(m.id); m.error ? q.reject(new Error(m.error.message)) : q.resolve(m.result); } };
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
  for (const dom of ['Network.setBypassServiceWorker', 'Page.setBypassServiceWorker']) { try { await S(dom, { bypass: true }); break; } catch (_) {} }
  await S('Emulation.setDeviceMetricsOverride', { width: PHONE_W, height: 900, deviceScaleFactor: 1, mobile: true });
  await S('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/index.html' });
  await sleep(6000);
  const res = await S('Runtime.evaluate', { returnByValue: true, expression: PROBE });
  const m = res.result.value;
  ws.close(); chrome.kill(); server.close();
  if (!m || m.error) { console.error('HARNESS FAIL:', (m && m.error) || JSON.stringify(res.result).slice(0, 300)); process.exit(1); }

  let fails = 0;
  const ck = (name, ok, detail) => { if (ok) { console.log('  ok   ' + name); return; } fails++; console.log('  FAIL ' + name + (detail ? '  -> ' + detail : '')); };
  console.log('measured at ' + PHONE_W + 'px');
  if (process.env.DEBUG_CHAIN) console.log('light bg chain for .gs-h: ' + m.chain.join(' > '));
  ck('collapsed card shows the one-line summary', m.collapsedHasSummary);
  ck('collapsed card offers "Customise games"', m.collapsedHasButton);
  ck('no element protrudes past the viewport', m.overflow.length === 0, JSON.stringify(m.overflow.slice(0, 3)));
  ck('no horizontal scroll', m.scrollW <= m.docW + 1, m.scrollW + ' > ' + m.docW);
  ck('every choice card is at least 44px tall (' + m.cardH.length + ' cards)', m.cardH.length >= 14 && m.cardH.every(h => h >= 44), JSON.stringify(m.cardH.map(Math.round)));
  ck('every button is touch-sized (44px, 40px for the small one)', m.btnH.length >= 3 && m.btnH.every(b => b.h >= (b.sm ? 40 : 44)), JSON.stringify(m.btnH));
  ck('every toggle row is at least 44px tall', m.togH.length === 4 && m.togH.every(h => h >= 44), JSON.stringify(m.togH.map(Math.round)));
  ck('selected cards carry a ✓ mark, not colour alone', m.marks.length >= 4 && m.marks.every(t => t === '✓'), JSON.stringify(m.marks));
  ck('selected subject cards also say "Included"', m.onWords.some(w => w === 'Included'), JSON.stringify(m.onWords));
  ck('every slider has an accessible label and a spoken percentage', m.sliders.length === 5 && m.sliders.every(s => s.label && /%$/.test(s.vt)), JSON.stringify(m.sliders));
  ck('custom percentages show a 100% total', m.total === '100%', String(m.total));
  ck('the Game Zone hub shows the child\'s mix line', /Your game mix: all subjects · Medium/.test(m.mixLine || ''), String(m.mixLine));
  ck('the switch animation is suppressed under prefers-reduced-motion', m.reducedMotionRule === true);
  for (const theme of ['light', 'dark']) {
    const rows = m[theme];
    const missing = rows.filter(r => r.missing).map(r => r.sel);
    ck(theme + ': every probed style is present on the page', missing.length === 0, JSON.stringify(missing));
    const low = rows.filter(r => !r.missing && r.ratio < MIN_RATIO);
    ck(theme + ': all ' + rows.filter(r => !r.missing).length + ' text styles clear ' + MIN_RATIO + ':1', low.length === 0, JSON.stringify(low.map(r => r.sel + '=' + r.ratio)));
  }
  console.log('');
  console.log(fails ? fails + ' check(s) failed' : 'all checks passed');
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error('HARNESS FAIL:', e.message); process.exit(1); });
