// Crop a diagram out of a past-paper PDF, using headless Chrome's own PDF
// viewer plus CDP Page.captureScreenshot with a clip rectangle.
//
// WHY THIS EXISTS
// The MES papers are heavily diagram-driven — the 2024 Grade 6 Science modular
// paper alone makes 31 references to a Diagram/Picture/Table — and reading a
// diagram is a separately assessed skill. Describing one in prose removes that
// skill, and in Q2(a)(i) it also stated the answer outright. No PDF rasteriser
// or image library is installed on this machine (no pdfimages, pdftoppm or
// ImageMagick), so this uses what the project already drives for its harnesses.
//
//   node scripts/pdf-crop.js <pdf> <page> <out.png> [x y w h] [scale]
//
// Shoot the whole page first (omit x/y/w/h) to read the coordinates off it,
// then re-run with the clip. Coordinates are CSS px of the rendered page at
// deviceScaleFactor 2, so the page is 1400x1900. Follow with png-gray.js:
// these are black line art and Chrome emits RGBA, which costs ~2x for nothing.
//
// ⚠ Past papers are Mauritius Examinations Syndicate material. Cropping their
//   artwork into the app is a rights decision, not a technical one.

const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 8811;

const [, , PDF, PAGE, OUT, CX, CY, CW, CH, SCALE] = process.argv;
if (!PDF || !PAGE || !OUT) { console.error('usage: node scripts/pdf-crop.js <pdf> <page> <out.png> [x y w h] [scale]'); process.exit(2); }

const ROOT = path.dirname(path.resolve(PDF));
const FILE = path.basename(PDF);
const sleep = ms => new Promise(r => setTimeout(r, ms));

const server = http.createServer((req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
  const f = path.join(ROOT, p);
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': 'application/pdf', 'Cache-Control': 'no-store' });
  fs.createReadStream(f).pipe(res);
});

const getJson = url => new Promise((ok, no) => {
  http.get(url, r => { let b = ''; r.on('data', c => b += c); r.on('end', () => ok(JSON.parse(b))); }).on('error', no);
});

(async () => {
  await new Promise(r => server.listen(PORT, r));
  const chrome = spawn(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars',
    '--remote-debugging-port=9333', '--no-first-run', '--no-default-browser-check',
    '--user-data-dir=' + path.join(require('os').tmpdir(), 'pdfshot-profile'),
    '--window-size=1400,1900', 'about:blank',
  ], { stdio: 'ignore' });

  let ver, tries = 0;
  while (tries++ < 40) { try { ver = await getJson('http://127.0.0.1:9333/json/version'); break; } catch { await sleep(250); } }
  if (!ver) { console.error('chrome did not start'); process.exit(1); }

  const ws = new globalThis.WebSocket(ver.webSocketDebuggerUrl);
  await new Promise(r => { ws.onopen = r; });
  let id = 0; const pending = new Map();
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result || m.error); pending.delete(m.id); }
  };
  const send = (method, params, sessionId) => new Promise(ok => {
    const mid = ++id; pending.set(mid, ok);
    ws.send(JSON.stringify({ id: mid, method, params: params || {}, sessionId }));
  });

  const t1 = await send('Target.createTarget', { url: 'about:blank' });
  const t2 = await send('Target.attachToTarget', { targetId: t1.targetId, flatten: true });
  const S = (m, p) => send(m, p, t2.sessionId);

  await S('Page.enable');
  await S('Emulation.setDeviceMetricsOverride', { width: 1400, height: 1900, deviceScaleFactor: 2, mobile: false });
  const url = `http://127.0.0.1:${PORT}/${encodeURIComponent(FILE)}#page=${PAGE}&zoom=125&toolbar=0&view=Fit`;
  await S('Page.navigate', { url });
  await sleep(4500);

  const shot = await S('Page.captureScreenshot', {
    format: 'png',
    ...(CX !== undefined ? { clip: { x: +CX, y: +CY, width: +CW, height: +CH, scale: +(SCALE||1) } } : {}),
    captureBeyondViewport: false,
  });
  if (!shot || !shot.data) { console.error('screenshot failed:', JSON.stringify(shot)); process.exit(1); }
  fs.writeFileSync(OUT, Buffer.from(shot.data, 'base64'));
  console.log('wrote ' + OUT + '  (' + fs.statSync(OUT).size + ' bytes)');

  ws.close(); chrome.kill(); server.close(); process.exit(0);
})();
