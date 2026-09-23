'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  The admin question editor's Subsection picker, measured in a REAL browser.
//
//  WHY THIS EXISTS — a parent reported g3eng-wrt-011 ("Which sentence uses a
//  SIMILE to describe something?") as a WRONG ANSWER. The answer is right in
//  the source, in the built bundle and in the live database, and the report's
//  own captured meta shows the app served and graded the right string. What
//  the admin actually saw on opening it was:
//
//      Subsection:  creative_writing — not declared in this chapter
//
//  creative_writing IS declared, and always was — test-subsection-invariant.js
//  passes 45/45. The editor was wrong, not the content, and it was wrong for
//  TWO independent reasons that each produced the identical empty dropdown:
//
//    1. it read `pack.SYLLABUS`. All 49 packs spell it `syllabus`, and
//       registerSubject() normalises to that name, so `.SYLLABUS` has never
//       existed on any pack object and read undefined everywhere.
//    2. subjects/_index.js is the LITE index and carries no syllabus at all,
//       so even spelled correctly it is {} until PackLoader.ensure() has
//       fetched the real manifest — which the question manager never did.
//
//  ⚠ Fixing EITHER ALONE still yields an empty dropdown, which is why this
//    test asserts both halves separately as well as the end result. A test
//    that only checked the final option list would pass on a half-fix on the
//    day the other half regressed.
//
//  ⚠ The danger was never cosmetic: an admin told that a correct tag is "not
//    declared" is being invited to clear it, and an untagged question drops
//    out of its subsection screen — the invariant in CLAUDE.md, from the
//    other side.
//
//  ⚠ Chrome is launched with its own fresh --user-data-dir. Reusing the
//    installed profile attaches the debugger to the user's live browser.
//
//  Run:  node scripts/test-admin-subsection-picker.js
//  Env:  CHROME_PATH to point at another Chrome.
// ══════════════════════════════════════════════════════════════════════════

const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8849, DBG = 9379;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
               '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
               '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2' };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const name = path.resolve(ROOT, '.' + p);
  if (!name.startsWith(path.resolve(ROOT) + path.sep) || !fs.existsSync(name) || fs.statSync(name).isDirectory()) {
    res.writeHead(404); res.end(); return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(name)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(name).pipe(res);
});

const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => {
  let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } });
}).on('error', rej));

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('OK   ' + label); }
  else { fail++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail).slice(0, 300) : '')); }
};

// The pack this was reported against, and the tag the editor called undeclared.
const PACK = 'grade3-english', CHAPTER = 'g3eng-writing', TAG = 'creative_writing';

(async () => {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-qmsub-'));
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG, '--user-data-dir=' + profile,
    '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });

  let version;
  for (let i = 0; i < 60 && !version; i++) {
    try { version = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); }
  }
  if (!version) { console.log('FAIL Chrome did not start'); process.exit(1); }

  const ws = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let serial = 0; const waiting = new Map();
  ws.onmessage = e => { const m = JSON.parse(e.data); if (waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); } };
  const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
    const id = ++serial, t = setTimeout(() => { waiting.delete(id); rej(Error('Timeout ' + method)); }, 30000);
    waiting.set(id, m => { clearTimeout(t); m.error ? rej(Error(m.error.message)) : res(m.result); });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
  const target = await send('Target.createTarget', { url: 'about:blank' });
  const session = await send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
  const call = (m, p) => send(m, p, session.sessionId);
  await call('Page.enable'); await call('Runtime.enable'); await call('Network.enable');
  await call('Network.setBypassServiceWorker', { bypass: true });
  await call('Network.setCacheDisabled', { cacheDisabled: true });

  const ev = async expr => {
    const r = await call('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) {
      throw new Error(String(r.exceptionDetails.exception?.description || r.exceptionDetails.text).slice(0, 400));
    }
    return r.result.value;
  };

  try {
    await call('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html` });
    for (let i = 0; i < 90; i++) {
      if (await ev(`typeof PackLoader !== 'undefined' && typeof SUBJECT_PACKS !== 'undefined'`)) break;
      await sleep(200);
    }
    // ⚠ Let boot settle. Auth.init() cannot reach Supabase from here and its
    //   catch lands on the landing screen a second or two in.
    await sleep(1200);

    // ── 1. the lite index: cause #2, stated on its own ────────────────────
    const lite = await ev(`(() => {
      const p = SUBJECT_PACKS.find(x => x.id === '${PACK}');
      return { lite: !!p._lite, subs: Object.keys(p.syllabus || {}).length };
    })()`);
    ok('the pack starts lazy, with no syllabus behind it',
      lite.lite === true && lite.subs === 0, lite);

    // ── 2. the key's real name: cause #1, stated on its own ───────────────
    const cased = await ev(`(async () => {
      await PackLoader.ensure('${PACK}');
      const p = SUBJECT_PACKS.find(x => x.id === '${PACK}');
      return {
        upper: p.SYLLABUS === undefined,
        lower: (p.syllabus?.['${CHAPTER}']?.subsections || []).map(s => s.id),
      };
    })()`);
    ok('pack.SYLLABUS does not exist - the name the editor used to read', cased.upper, cased);
    ok('pack.syllabus does, and declares the reported tag',
      cased.lower.includes(TAG), cased.lower);

    // ── 3. no pack anywhere carries the upper-case name ───────────────────
    const anyUpper = await ev(`SUBJECT_PACKS.filter(p => p.SYLLABUS !== undefined).map(p => p.id)`);
    ok('no pack in the registry carries SYLLABUS, so the old read could never work',
      anyUpper.length === 0, anyUpper);

    // ── 4. the real editor, driven the way the admin drives it ────────────
    const loaded = await ev(`RoleModules.ensure('admin').then(() => typeof AdminPanel === 'object')`);
    ok('the admin module loads on demand', loaded);

    const picked = await ev(`(async () => {
      document.getElementById('qmf-grade').value = '3';
      await AdminPanel.qmFormGradeChange();
      document.getElementById('qmf-subject').value = '${PACK}';
      await AdminPanel.qmFormSubjectChange();
      document.getElementById('qmf-chapter').value = '${CHAPTER}';
      await AdminPanel.qmFormChapterChange();
      const sel = document.getElementById('qmf-subsection');
      return { values: [...sel.options].map(o => o.value), labels: [...sel.options].map(o => o.textContent) };
    })()`);
    ok('the Subsection picker offers the chapter\'s declared subsections',
      picked.values.includes(TAG), picked.values);
    ok('it offers all three the chapter declares, not just the one carried in',
      picked.values.filter(Boolean).length === 3, picked.values);
    ok('and none of them is labelled "not declared in this chapter"',
      !picked.labels.some(l => /not declared/.test(l)), picked.labels);

    // ── 5. the cascade must survive a pack whose manifest is already in ───
    const second = await ev(`(async () => {
      document.getElementById('qmf-chapter').value = 'g3eng-grammar';
      await AdminPanel.qmFormChapterChange();
      const sel = document.getElementById('qmf-subsection');
      return [...sel.options].map(o => o.value).filter(Boolean);
    })()`);
    ok('switching chapter repopulates from that chapter, not the previous one',
      second.includes('parts_of_speech') && !second.includes(TAG), second);
  } catch (e) {
    fail++; console.log('FAIL harness -- ' + e.message);
  }

  console.log(`\nAdmin subsection picker: ${pass} passed, ${fail} failed.`);
  ws.close(); chrome.kill(); server.close();
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
