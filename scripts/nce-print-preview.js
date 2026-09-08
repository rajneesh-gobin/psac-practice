'use strict';
// Print an NCE paper / mark scheme to real A4 PDF via headless Chrome, then
// render every page to PNG so it can be LOOKED AT.
//
// ⚠ Programmatic checks are not visual QA. A paper can pass every assertion in
//   test-nce-paper.js and still print with a question split across a page
//   break, an answer line stranded from its prompt, a diagram off the edge, or
//   half a page of white space. The only way to know is to look at the pages.
//
//   node scripts/nce-print-preview.js <file.html> [outDir]

const { spawn } = require('child_process');
const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const http = require('http');
const os = require('os');

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const POPPLER = process.env.POPPLER_BIN ||
  'C:/Users/rajneesh.gobin/AppData/Local/Microsoft/WinGet/Packages/oschwartz10612.Poppler_Microsoft.Winget.Source_8wekyb3d8bbwe/poppler-25.07.0/Library/bin';
const CDP_PORT = 9351;

const src = process.argv[2];
if (!src) { console.error('usage: node scripts/nce-print-preview.js <file.html> [outDir]'); process.exit(2); }
const outDir = process.argv[3] || path.join(os.tmpdir(), 'nce-preview');
fs.mkdirSync(outDir, { recursive: true });

const sleep = ms => new Promise(r => setTimeout(r, ms));
const getJSON = url => new Promise((res, rej) => {
  http.get(url, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(e); } }); }).on('error', rej);
});

(async () => {
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${CDP_PORT}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu',
    `--user-data-dir=${path.join(os.tmpdir(), 'nce-preview-profile')}`, 'about:blank'], { stdio: 'ignore' });
  const stop = () => { try { chrome.kill(); } catch {} };
  process.on('exit', stop);
  try {
    let ver = null;
    for (let i = 0; i < 40 && !ver; i++) { await sleep(250); try { ver = await getJSON(`http://127.0.0.1:${CDP_PORT}/json/version`); } catch {} }
    if (!ver) throw new Error('Chrome did not start');
    const ws = new globalThis.WebSocket(ver.webSocketDebuggerUrl);
    await new Promise((r, j) => { ws.onopen = r; ws.onerror = () => j(new Error('CDP socket failed')); });

    let id = 0, sessionId = null;
    const rpc = (method, params, useSession) => new Promise((resolve, reject) => {
      const mid = ++id;
      const timer = setTimeout(() => { cleanup(); reject(new Error('CDP timeout: ' + method)); }, 30000);
      const onMsg = ev => {
        let m; try { m = JSON.parse(ev.data); } catch { return; }
        if (m.id !== mid) return;
        cleanup();
        m.error ? reject(new Error(method + ': ' + m.error.message)) : resolve(m.result);
      };
      const cleanup = () => { clearTimeout(timer); ws.removeEventListener('message', onMsg); };
      ws.addEventListener('message', onMsg);
      const msg = { id: mid, method, params: params || {} };
      if (useSession && sessionId) msg.sessionId = sessionId;
      ws.send(JSON.stringify(msg));
    });

    const { targetId } = await rpc('Target.createTarget', { url: 'about:blank' });
    ({ sessionId } = await rpc('Target.attachToTarget', { targetId, flatten: true }));
    await rpc('Page.enable', {}, true);
    await rpc('Page.navigate', { url: 'file:///' + path.resolve(src).replace(/\\/g, '/') }, true);
    await sleep(1500);

    // A4 at 8.27 x 11.69in, with the @page margins the stylesheet declares.
    const { data } = await rpc('Page.printToPDF', {
      paperWidth: 8.27, paperHeight: 11.69, printBackground: true,
      marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
    }, true);

    const base = path.basename(src, '.html');
    const pdf = path.join(outDir, base + '.pdf');
    fs.writeFileSync(pdf, Buffer.from(data, 'base64'));

    const info = execFileSync(path.join(POPPLER, 'pdfinfo.exe'), [pdf], { encoding: 'utf8' });
    const pages = +info.match(/^Pages:\s+(\d+)/m)[1];
    execFileSync(path.join(POPPLER, 'pdftoppm.exe'),
      ['-png', '-r', '100', pdf, path.join(outDir, base)]);

    console.log(`${base}: ${pages} A4 page(s)`);
    for (const f of fs.readdirSync(outDir).filter(f => f.startsWith(base) && f.endsWith('.png')).sort()) {
      console.log('  ' + path.join(outDir, f));
    }
  } catch (e) {
    console.error('preview failed: ' + e.message);
    process.exitCode = 1;
  } finally { stop(); }
})();
