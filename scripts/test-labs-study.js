'use strict';
// Real browser smoke and recovery tests for every grade served by every lab.
// CHROME_PATH may override the installed Chrome. No student account is used.
const fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const assert = require('node:assert/strict');
const ROOT = path.resolve(__dirname, '..');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const PORT = 8891, DEBUG = 9437;
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-study-test-'));
let chrome, server, ws;
let failures = 0;
async function main() {
  server = spawn(process.execPath, ['dev-server.js', String(PORT)], { cwd: ROOT, stdio: 'ignore', windowsHide: true });
  chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--no-first-run', '--disable-extensions', '--remote-debugging-port=' + DEBUG,
    '--user-data-dir=' + profile, 'about:blank'
  ], { stdio: 'ignore', windowsHide: true });
  let version;
  for (let n = 0; n < 40 && !version; n++) { try { version = await (await fetch(`http://127.0.0.1:${DEBUG}/json/version`)).json(); } catch (_) { await sleep(250); } }
  assert(version, 'Chrome started');
  ws = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  let seq = 0; const pending = new Map(), errors = [];
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
    if (pending.has(m.id)) { const { resolve, reject, timeout } = pending.get(m.id); clearTimeout(timeout); pending.delete(m.id); m.error ? reject(Error(m.error.message)) : resolve(m.result); }
  };
  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    const id = ++seq, timeout = setTimeout(() => { pending.delete(id); reject(Error('Timeout: ' + method)); }, 15000);
    pending.set(id, { resolve, reject, timeout }); ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
  const target = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
  const call = (method, params) => send(method, params, sessionId);
  await call('Page.enable'); await call('Runtime.enable');
  await call('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 1, mobile: true });
  const ev = async expression => {
    const r = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
    return r.result.value;
  };
  async function open(id, grade) {
    errors.length = 0;
    await call('Page.navigate', { url: `http://127.0.0.1:${PORT}/scripts/labs-study-preview.html?lab=${id}&grade=${grade}` });
    for (let n = 0; n < 80; n++) {
      await sleep(50);
      if (await ev(`!!document.querySelector('#lab-study')`)) return;
      if (errors.length) throw Error(errors.join('\n'));
    }
    throw Error('Study entry did not appear: ' + await ev('document.body.innerText'));
  }
  const click = selector => ev(`(() => { const el = document.querySelector(${JSON.stringify(selector)}); if (!el || el.disabled || !el.getClientRects().length) throw Error('Missing/hidden control: '+${JSON.stringify(selector)}); el.click(); return true; })()`);
  await open('circuit', 6);
  const labs = await ev('Labs.LABS.map(l=>({id:l.id,grades:l.grades}))');
  for (const lab of labs) for (const grade of lab.grades) {
    try {
      await open(lab.id, grade);
      await click('[data-study-guide]');
      assert.equal(await ev('document.querySelector("#labs-root").dataset.studyMode'), 'predict');
      await click('[data-study="unsure"]');
      await sleep(80);
      assert.equal(await ev('document.querySelector("#labs-root").dataset.studyMode'), 'experiment');
      assert(await ev('!!document.querySelector("#lab-guide")'), 'instruction exists');
      await click('[data-study="pause"]');
      await click('[data-study="resume"]');
      await sleep(80);
      assert.equal(await ev('document.querySelector("#labs-root").dataset.studyMode'), 'experiment');
      // Reload the page and resume the saved apparatus, rather than just the title.
      const before = await ev(`JSON.stringify(Labs.store(${JSON.stringify(lab.id)}).study[${JSON.stringify(String(grade))}].attempts)`);
      await open(lab.id, grade); await click('[data-study="resume"]'); await sleep(80);
      assert.equal(await ev('document.querySelector("#labs-root").dataset.studyMode'), 'experiment');
      assert(before.includes('snapshot'), 'apparatus snapshot saved');
      assert(!errors.length, errors.join('\n'));
      assert(await ev('document.documentElement.scrollWidth <= innerWidth + 2'), 'phone layout overflows');
      console.log(`PASS ${lab.id} grade ${grade}: start, pause, reload/resume`);
    } catch (e) { failures++; console.log(`FAIL ${lab.id} grade ${grade}: ${e.message.slice(0, 800)}`); }
  }
  // Complete the circuit via actual highlighted student controls, with no action hooks.
  for (const [id, grade] of [['circuit',6],['sunmoon',6],['sunmoon',7],['periodic',9]]) {
    try {
      await open(id, grade); await click('[data-study-guide]'); await click('[data-study="unsure"]');
      for (let n = 0; n < 45 && await ev('document.querySelector("#labs-root").dataset.studyMode === "experiment"'); n++) {
        await ev(`(() => {
          const targets = [...document.querySelectorAll('#lab-guide [data-guide-do], .is-next')].filter(el=>el.getClientRects().length && !el.disabled);
          const el = targets.find(el => el.matches('[data-tool]')) || targets[0];
          if (!el) throw Error('No next control: '+document.querySelector('#lab-guide')?.innerText);
          el.click();
        })()`);
        await sleep(90);
      }
      assert.equal(await ev('document.querySelector("#labs-root").dataset.studyMode'), 'explain', 'experiment reaches its own questions');
      await click('[data-study="review"]'); await click('[data-study="finish"]');
      assert.equal(await ev('document.querySelector("#labs-root").dataset.studyMode'), 'complete');
      assert(!errors.length, errors.join('\n'));
      console.log(`PASS ${id} grade ${grade}: visible controls through completion`);
    } catch (e) { failures++; console.log(`FAIL completion ${id}/${grade}: ${e.message.slice(0, 800)}`); }
  }
  if (process.env.STUDY_SCREENSHOT) {
    await open('circuit',6);
    const shot = await call('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(process.env.STUDY_SCREENSHOT, Buffer.from(shot.data,'base64'));
  }
  console.log(`Study browser checks: ${failures} failures`);
}
main().catch(e => { failures++; console.error(e); }).finally(async () => {
  ws?.close(); chrome?.kill(); server?.kill();
  process.exitCode = failures ? 1 : 0;
});
