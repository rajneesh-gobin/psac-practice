'use strict';
// Fix My Mistakes — the drill that serves a child's own wrong answers back.
//
// Every wrong answer has been recorded since this app shipped (_recordMistake)
// and then only ever LISTED. The rows now carry the question id and pack that
// make them practisable, a repeat miss updates the existing row instead of
// filling the 60-row cap with copies of one question, and two correct answers
// from anywhere retire a mistake for good.
//
// Driven in a real browser against the real functions, with synthetic questions
// pushed into STATIC_QUESTIONS and a scripted DB — the packs fetch their
// questions from a Netlify function that does not exist on a static server, so
// a test that waited for real content would measure nothing.
//
// ⚠ DB / ACTIVE_STUDENT_ID / STATIC_QUESTIONS are script-scoped `let`/`const`,
//   NOT properties of window. Runtime.evaluate can see and assign them; a probe
//   written as `window.DB` reads undefined and passes vacuously.
//
// Run:  node scripts/test-fix-my-mistakes.js
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os'), assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const PORT = 8829, DBG = 9369;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
  const name = path.resolve(root, '.' + p);
  if (!name.startsWith(root + path.sep) || !fs.existsSync(name) || fs.statSync(name).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(name)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(name).pipe(res);
});
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));

let checks = 0;
const ok = (label, cond, detail) => { assert(cond, label + (detail === undefined ? '' : ' — ' + JSON.stringify(detail))); checks++; console.log('✓ ' + label); };

// Six synthetic MCQs in two packs, so the cross-pack path is exercised.
const SEED = `(() => {
  ACTIVE_STUDENT_ID = 'test-child';
  DB.mistakes = [];
  DB.restrictions = {};
  DB.chapters = DB.chapters || {};
  window.PLAN_ENFORCEMENT = false;
  const made = [];
  for (let i = 1; i <= 6; i++) {
    const q = {
      id: 'tst-q' + i, chapterId: i <= 3 ? 'tst-ch-a' : 'tst-ch-b', difficulty: i === 6 ? 4 : 2,
      type: 'mcq', question: 'Synthetic question ' + i, options: ['A', 'B', 'C', 'D'], answer: 'B',
      hint: 'h', explanation: 'e',
    };
    STATIC_QUESTIONS.push(q); made.push(q);
  }
  window.__q = made;
  return STATIC_QUESTIONS.length;
})()`;

// Record all six as mistakes through the REAL recorder, newest last.
const RECORD = `(() => {
  window.__q.forEach(q => _recordMistake(q, 'A', q.chapterId, 'practice'));
  return DB.mistakes.map(m => ({ id: m.id, n: m.n, fix: m.fix }));
})()`;

(async () => {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG, '--user-data-dir=' + fs.mkdtempSync(path.join(os.tmpdir(), 'psac-fix-')), '--no-first-run', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });
  let version; for (let i = 0; i < 40 && !version; i++) { try { version = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); } }
  assert(version, 'Chrome starts');
  const ws = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let serial = 0; const waiting = new Map();
  ws.onmessage = e => { const m = JSON.parse(e.data); if (waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); } };
  const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
    const id = ++serial, t = setTimeout(() => { waiting.delete(id); rej(Error('Timeout ' + method)); }, 20000);
    waiting.set(id, m => { clearTimeout(t); m.error ? rej(Error(m.error.message)) : res(m.result); });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
  const target = await send('Target.createTarget', { url: 'about:blank' });
  const session = await send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
  const call = (m, p) => send(m, p, session.sessionId);
  await call('Page.enable'); await call('Runtime.enable'); await call('Network.enable');
  await call('Network.setBypassServiceWorker', { bypass: true }); await call('Network.setCacheDisabled', { cacheDisabled: true });
  const ev = async expr => {
    const r = await call('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    assert(!r.exceptionDetails, String(r.exceptionDetails && r.exceptionDetails.exception && r.exceptionDetails.exception.description || '').slice(0, 500));
    return r.result.value;
  };
  await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 850, deviceScaleFactor: 1, mobile: true });
  await call('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/' });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof startMistakeDrill === 'function'"); } catch (_) {} }
  assert(ready, 'app loaded and startMistakeDrill exists');
  await sleep(600);

  ok('the drill is a global the markup can call', await ev("typeof startMistakeDrill === 'function' && typeof _retireMistake === 'function'"));

  await ev(SEED);
  let rows = await ev(RECORD);
  ok('six mistakes recorded, newest first', rows.length === 6 && rows[0].id === 'tst-q6' && rows[5].id === 'tst-q1', rows.map(r => r.id));
  ok('every row carries the question id and pack fields', await ev("DB.mistakes.every(m => 'id' in m && 'pk' in m && 'n' in m && 'fix' in m)"));

  // ── repeat miss updates the row instead of duplicating it ────────────────
  const again = await ev("(() => { _recordMistake(window.__q[0], 'C', 'tst-ch-a', 'practice'); const m = DB.mistakes.filter(x => x.id === 'tst-q1'); return { count: DB.mistakes.length, copies: m.length, n: m[0].n, first: DB.mistakes[0].id }; })()");
  ok('missing the same question again does not duplicate the row', again.count === 6 && again.copies === 1, again);
  ok('the repeat is counted and moved to the front', again.n === 2 && again.first === 'tst-q1', again);

  // ── retirement takes two correct answers, not one ────────────────────────
  const r1 = await ev("(() => ({ retired: _retireMistake('tst-q1'), fix: (DB.mistakes.find(m => m.id === 'tst-q1') || {}).fix }))()");
  ok('one correct answer does not retire a mistake', r1.retired === false && r1.fix === 1, r1);
  const r2 = await ev("(() => ({ retired: _retireMistake('tst-q1'), still: DB.mistakes.some(m => m.id === 'tst-q1'), left: DB.mistakes.length }))()");
  ok('the second correct answer retires it', r2.retired === true && r2.still === false && r2.left === 5, r2);
  ok('retiring an unknown id is harmless', await ev("_retireMistake('nope') === false && _retireMistake('') === false && _retireMistake(undefined) === false"));

  // ── legacy rows (no id) are listed but never drilled ─────────────────────
  const legacy = await ev("(() => { DB.mistakes.push({ d: new Date().toISOString(), ch: 'old', chn: 'Old chapter', q: 'legacy' }); return { total: DB.mistakes.length, practisable: _practisableMistakes().length }; })()");
  ok('a row with no question id is kept in the list but not practisable', legacy.total === 6 && legacy.practisable === 5, legacy);

  // ── the drill itself ─────────────────────────────────────────────────────
  await ev('startMistakeDrill()');
  await sleep(500);
  const drill = await ev(`(() => ({
    screen: [...document.querySelectorAll('.screen')].filter(s => !s.classList.contains('hidden')).map(s => s.id),
    chapterId: S.practice.chapterId,
    n: S.practice.qs.length,
    ids: S.practice.qs.map(q => q.id),
    title: document.getElementById('practice-ch-name').textContent,
    back: document.getElementById('practice-back-btn').textContent,
    backHidden: document.getElementById('practice-back-btn').classList.contains('hidden'),
  }))()`);
  ok('the drill opens the practice screen', drill.screen.includes('screen-practice'), drill.screen);
  ok('it runs under its own synthetic chapter id', drill.chapterId === 'fix-mistakes', drill.chapterId);
  ok('it serves only the practisable mistakes, newest first',
    drill.ids.join() === 'tst-q6,tst-q5,tst-q4,tst-q3,tst-q2', drill.ids);
  ok('the screen names the drill and offers a way out', /Fix My Mistakes/.test(drill.title) && /Home/.test(drill.back) && !drill.backHidden, drill);

  // ── the parent's difficulty cap is honoured ──────────────────────────────
  await ev("DB.restrictions.maxDifficulty = 3; startMistakeDrill()");
  await sleep(400);
  ok('a level-4 mistake is withheld when the parent caps difficulty at 3',
    !(await ev('S.practice.qs.map(q => q.id)')).includes('tst-q6'), await ev('S.practice.qs.map(q => q.id)'));

  // ── a locked chapter is withheld ─────────────────────────────────────────
  await ev("DB.restrictions = { lockedChapters: ['tst-ch-a'] }; startMistakeDrill()");
  await sleep(400);
  const lockedIds = await ev('S.practice.qs.map(q => q.id)');
  ok('mistakes in a chapter the parent locked are withheld',
    lockedIds.every(id => ['tst-q4', 'tst-q5', 'tst-q6'].includes(id)) && lockedIds.length > 0, lockedIds);

  // ── a drill is never written to the resume store ─────────────────────────
  await ev("DB.restrictions = {}; startMistakeDrill()");
  await sleep(400);
  const resumed = await ev("(() => { _saveResume(); const raw = localStorage.getItem(_resumeKey()); const store = raw ? JSON.parse(raw) : { practice: {} }; return Object.keys(store.practice || {}); })()");
  ok('a mistake drill is never saved as a resumable round', !resumed.includes('fix-mistakes'), resumed);

  // ── answering correctly inside the drill counts toward retirement ────────
  const flow = await ev(`(() => {
    const before = DB.mistakes.length;
    const q = S.practice.qs[0];
    _logPracticeAnswer(q, 'B', true, false);
    const fixAfterOne = (DB.mistakes.find(m => m.id === q.id) || {}).fix;
    _logPracticeAnswer(q, 'B', true, false);
    return { id: q.id, before, fixAfterOne, gone: !DB.mistakes.some(m => m.id === q.id), fixed: S.practice.session.fixed, after: DB.mistakes.length };
  })()`);
  ok('a correct answer in the drill counts once, then retires the mistake',
    flow.fixAfterOne === 1 && flow.gone === true && flow.after === flow.before - 1, flow);
  ok('the round counts what it actually fixed', flow.fixed === 1, flow);

  // ── a wrong answer files the mistake under the REAL chapter ──────────────
  const attrib = await ev(`(() => {
    const q = S.practice.qs.find(x => !DB.mistakes.some(m => m.id === x.id)) || S.practice.qs[1];
    _logPracticeAnswer(q, 'D', false, false);
    const row = DB.mistakes.find(m => m.id === q.id);
    return { ch: row && row.ch, chapterId: q.chapterId, sessionChapter: S.practice.chapterId };
  })()`);
  ok('a wrong answer during a drill is filed under the real chapter, never "fix-mistakes"',
    attrib.ch === attrib.chapterId && attrib.ch !== 'fix-mistakes', attrib);

  // ── the child's home offers it, and only when there is something to fix ──
  const card = await ev(`(() => {
    _renderShMissions();
    const on = document.querySelector('.sh-mission-fix');
    const shown = { present: !!on, text: on ? on.textContent.replace(/\\s+/g, ' ').trim() : '' };
    const keep = DB.mistakes;
    DB.mistakes = [];
    _renderShMissions();
    shown.hiddenWhenNone = !document.querySelector('.sh-mission-fix');
    DB.mistakes = keep;
    _renderShMissions();
    return shown;
  })()`);
  ok('the child\'s home shows a "Fix my mistakes" mission with a live count',
    card.present && /Fix my mistakes/.test(card.text) && /\d+ question/.test(card.text), card);
  ok('the card disappears when there is nothing to fix', card.hiddenWhenNone === true, card);

  // ── the round-complete modal reports the repair ──────────────────────────
  const modal = await ev(`(() => {
    S.practice.session = { attempted: 4, correct: 3, fixed: 2, log: [] };
    _showRoundComplete();
    const fixEl = document.getElementById('rc-fixed');
    const out = { chapter: document.getElementById('rc-chapter').textContent, fixed: fixEl.textContent, fixedHidden: fixEl.classList.contains('hidden'), next: document.getElementById('rc-next-btn').textContent, back: document.getElementById('rc-back-btn').textContent };
    S.practice.session = { attempted: 4, correct: 4, fixed: 0, log: [] };
    _showRoundComplete();
    out.hiddenWhenZero = document.getElementById('rc-fixed').classList.contains('hidden');
    document.getElementById('modal-round-complete').classList.add('hidden');
    return out;
  })()`);
  ok('the round-complete modal names the drill and reports what was fixed',
    /Fix My Mistakes/.test(modal.chapter) && /2 mistakes fixed/.test(modal.fixed) && !modal.fixedHidden, modal);
  ok('it says nothing when nothing was fixed', modal.hiddenWhenZero === true, modal);
  ok('its buttons are relabelled for the drill', /Fix more/.test(modal.next) && /Home/.test(modal.back), modal);

  // ── and relabelled BACK for an ordinary round ────────────────────────────
  const relabel = await ev(`(() => {
    S.practice.chapterId = 'tst-ch-a';
    S.practice.session = { attempted: 1, correct: 1, fixed: 0, log: [] };
    _showRoundComplete();
    const out = { next: document.getElementById('rc-next-btn').textContent, back: document.getElementById('rc-back-btn').textContent };
    document.getElementById('modal-round-complete').classList.add('hidden');
    return out;
  })()`);
  ok('an ordinary round gets its own wording back', /Practice Again/.test(relabel.next) && /Chapters/.test(relabel.back), relabel);

  console.log('\nFix My Mistakes: ' + checks + ' checks passed.');
  ws.close(); chrome.kill(); server.close(); process.exit(0);
})().catch(e => { console.error(e.message || e); process.exit(1); });
