'use strict';
// Admin › Question bank — the pupil preview, measured in a real browser.
//
// The list used to draw a stripped-HTML line, which is the one thing a question
// cannot be judged from: for a large part of the bank the markup IS the question
// (an <img>, an inline <svg>, a run of ___ blanks), so an admin read
// "A noun is a -" with the picture and the four options thrown away before the
// card was drawn. The modal goes further and draws through renderAnswerArea()
// itself, on the practice screen's own chalkboard rules.
//
// What this pins down, and why each one is here:
//  - a drawing SURVIVES into the list card and into the modal;
//  - the modal is the SAME renderer and the SAME rules as the practice screen —
//    a second copy of either would drift, and a drifted preview is worse than
//    none, so the board is asserted to be the chalkboard and the options to be
//    real .mcq-opt buttons;
//  - previewing does not decide how a REAL question is drawn later:
//    _shouldShowAsBlank() memoises a coin-flip per question id, so the preview
//    renders under a throwaway id;
//  - a numeric gets its keypad and a cloze is refused politely rather than
//    being handed a number pad.
//
// Run:  node scripts/test-admin-question-preview.js
// ⚠ Service worker bypassed and cache disabled, or this measures the previous
//   admin.js and reports a fix that never landed.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os'), assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const PORT = 8821, DBG = 9361;
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
const ok = (label, cond, detail) => { assert(cond, label + (detail ? ' — ' + JSON.stringify(detail) : '')); checks++; console.log('✓ ' + label); };

// Four rows shaped like the real ones: data.* is authoritative, the columns are
// the importer's copy. The SVG is inline on purpose — it cannot 404, so a
// missing drawing in the card is the renderer's fault and nothing else's.
const SVG = '<svg viewBox="0 0 40 40" width="40" height="40" role="img" aria-label="a shape">'
  + '<rect x="4" y="4" width="32" height="32" fill="none" stroke="#38bdf8" stroke-width="3"></rect></svg>';
const FIXTURES = [
  { id: 'g5m-prev-001', subject_id: 'grade5-maths', chapter_id: 'shapes', grade: 5, difficulty: 2, protected: false,
    data: { id: 'g5m-prev-001', chapterId: 'shapes', type: 'mcq', difficulty: 2,
      question: 'How many sides does this shape have? ' + SVG,
      options: ['3', '4', '5', '6'], answer: '4',
      hint: 'Count the straight edges.', explanation: 'A square has four equal sides.' } },
  { id: 'g5m-prev-002', subject_id: 'grade5-maths', chapter_id: 'shapes', grade: 5, difficulty: 1, protected: false,
    data: { id: 'g5m-prev-002', chapterId: 'shapes', type: 'mcq', difficulty: 1,
      question: 'A four-sided shape with equal sides is a ___.',
      options: ['square', 'circle', 'cone', 'line'], answer: 'square',
      explanation: 'Four equal sides and four right angles make a square.' } },
  { id: 'g5m-prev-003', subject_id: 'grade5-maths', chapter_id: 'shapes', grade: 5, difficulty: 2, protected: false,
    data: { id: 'g5m-prev-003', chapterId: 'shapes', type: 'numeric', difficulty: 2,
      question: 'What is 12 + 30?', options: [], answer: '42' } },
  { id: 'g5f-prev-004', subject_id: 'grade5-french', chapter_id: 'textes-trous', grade: 5, difficulty: 2, protected: false,
    data: { id: 'g5f-prev-004', chapterId: 'textes-trous', type: 'cloze', difficulty: 2,
      question: 'Complète le texte.', options: [], answer: 'le' } },
];

(async () => {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG, '--user-data-dir=' + fs.mkdtempSync(path.join(os.tmpdir(), 'psac-qmp-')), '--no-first-run', '--hide-scrollbars', 'about:blank',
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
    assert(!r.exceptionDetails, String(r.exceptionDetails && r.exceptionDetails.exception && r.exceptionDetails.exception.description || '').slice(0, 400));
    return r.result.value;
  };
  await call('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/' });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try {
    ready = await ev("document.readyState === 'complete' && typeof SUBJECT_PACKS !== 'undefined' "
      + "? RoleModules.ensure('admin').then(() => typeof AdminPanel !== 'undefined') : false"); } catch (_) {} }
  assert(ready, 'app globals loaded');
  await sleep(600);

  // ⚠ The LIST PATH is the point, so the rows arrive the way real rows do —
  //   through the client's own fetch — rather than by reaching into the module.
  //   Anything else tests a renderer that production never calls.
  await ev([
    '(() => {',
    '  const orig = window.fetch.bind(window);',
    '  const rows = ' + JSON.stringify(FIXTURES) + ';',
    '  window.fetch = (input, init) => {',
    '    const url = typeof input === "string" ? input : (input && input.url) || "";',
    '    if (url.includes("/rest/v1/questions")) {',
    '      return Promise.resolve(new Response(JSON.stringify(rows), { status: 200, headers: {',
    '        "Content-Type": "application/json", "content-range": "0-" + (rows.length - 1) + "/" + rows.length } }));',
    '    }',
    '    return orig(input, init);',
    '  };',
    '})()',
  ].join('\n'));

  await ev('AdminPanel.qmSearch()');
  await sleep(500);

  const listState = () => ev([
    '(() => {',
    "  const cards = [...document.querySelectorAll('#qm-list .qm-question-card')];",
    '  return {',
    '    cards: cards.length,',
    "    svgs: document.querySelectorAll('#qm-list .qm-kid .pr-q svg').length,",
    "    kidBlocks: document.querySelectorAll('#qm-list .qm-kid').length,",
    "    answerChips: document.querySelectorAll('#qm-list .qm-kid-opt.is-answer').length,",
    "    optChips: document.querySelectorAll('#qm-list .qm-kid-opt').length,",
    "    strippedLines: document.querySelectorAll('#qm-list .qm-question-preview').length,",
    "    previewButtons: document.querySelectorAll('#qm-list .qm-preview-button').length,",
    "    firstAnswerChip: (document.querySelector('#qm-list .qm-kid-opt.is-answer') || {}).textContent || '',",
    '  };',
    '})()',
  ].join('\n'));

  let s = await listState();
  ok('the list draws every row', s.cards === FIXTURES.length, s);
  ok('an inline drawing survives into the card', s.svgs === 1, s);
  // 4 + 4 options on the two MCQs; the numeric and the cloze have none.
  ok('the options are drawn, one marked as the answer per MCQ',
    s.optChips === 8 && s.answerChips === 2 && !s.strippedLines, s);
  ok('the marked chip is the authored answer', s.firstAnswerChip.trim().endsWith('4'), s);
  ok('every card offers the pupil preview', s.previewButtons === FIXTURES.length, s);

  // The toggle is a reading aid, not a fetch: turning it off must not reload.
  await ev("(() => { const e = document.getElementById('qm-preview-mode'); e.checked = false; e.dispatchEvent(new Event('change')); })()");
  s = await listState();
  ok('unticking the toggle returns the compact text list, with no refetch',
    s.strippedLines === FIXTURES.length && s.svgs === 0 && s.kidBlocks === 0 && s.cards === FIXTURES.length, s);
  await ev("(() => { const e = document.getElementById('qm-preview-mode'); e.checked = true; e.dispatchEvent(new Event('change')); })()");

  // ── The modal ──────────────────────────────────────────────────────────
  const openCard = n => ev("document.querySelectorAll('#qm-list .qm-preview-button')[" + n + "].click()");
  const modal = () => ev([
    '(() => {',
    "  const m = document.getElementById('modal-qm-preview');",
    "  const board = document.getElementById('qm-preview-board');",
    "  const q = document.getElementById('qmp-q');",
    "  const fb = document.getElementById('qmp-feedback');",
    "  const hints = document.getElementById('qmp-hints');",
    '  return {',
    "    open: !m.classList.contains('hidden'),",
    '    boardBg: getComputedStyle(board).backgroundColor,',
    '    qColour: getComputedStyle(q).color,',
    '    qText: q.textContent.trim(),',
    "    qSvgs: q.querySelectorAll('svg').length,",
    "    opts: document.querySelectorAll('#qmp-answers .mcq-opt').length,",
    "    optBg: (document.querySelector('#qmp-answers .mcq-opt') && getComputedStyle(document.querySelector('#qmp-answers .mcq-opt')).color) || '',",
    "    correct: document.querySelectorAll('#qmp-answers .mcq-opt.correct').length,",
    "    inputs: document.querySelectorAll('#qmp-answers input.num-input').length,",
    "    pads: document.querySelectorAll('#qmp-answers .num-pad').length,",
    "    unsupported: document.querySelectorAll('#qmp-answers .answer-unsupported').length,",
    "    unsupportedText: (document.querySelector('#qmp-answers .answer-unsupported') || {}).textContent || '',",
    "    fbShown: !fb.classList.contains('hidden'),",
    '    fbText: fb.textContent.trim(),',
    "    hintsShown: !hints.classList.contains('hidden'),",
    '    hintLines: hints.children.length,',
    "    blankRowShown: !document.getElementById('qmp-blank-row').classList.contains('hidden'),",
    "    meta: document.getElementById('qmp-meta').textContent,",
    '  };',
    '})()',
  ].join('\n'));

  await openCard(0); await sleep(200);
  let m = await modal();
  ok('the preview opens', m.open, m);
  // 30,30,30 is the chalkboard the practice screen paints. If this ever reads
  // as a white card, the shared selector list in style.css has been split.
  ok('the board is the practice screen\'s chalkboard, not a second theme',
    /^rgba?\(30, ?30, ?30/.test(m.boardBg), m);
  ok('the drawing is in the preview', m.qSvgs === 1 && /How many sides/.test(m.qText), m);
  ok('the answer area is drawn by renderAnswerArea (four real options)', m.opts === 4, m);
  ok('nothing is given away before the pupil answers', m.correct === 0 && !m.fbShown, m);
  ok('the meta line names the pack and the id', /Grade 5/.test(m.meta) && /g5m-prev-001/.test(m.meta), m);

  const lum = c => c.match(/[\d.]+/g).slice(0, 3).map(Number).map(v => { v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }).reduce((n, v, i) => n + v * [.2126, .7152, .0722][i], 0);
  const ratio = (a, b) => (Math.max(lum(a), lum(b)) + .05) / (Math.min(lum(a), lum(b)) + .05);
  const r1 = ratio(m.qColour, m.boardBg);
  ok('the question clears 4.5:1 on the board (' + r1.toFixed(2) + ':1)', r1 >= 4.5, [m.qColour, m.boardBg]);
  const r2 = ratio(m.optBg, m.boardBg);
  ok('an option clears 4.5:1 on the board (' + r2.toFixed(2) + ':1)', r2 >= 4.5, [m.optBg, m.boardBg]);

  const tickBox = (id, on) => ev("(() => { const e = document.getElementById('" + id + "'); e.checked = " + (!!on) + "; e.dispatchEvent(new Event('change')); })()");
  await tickBox('qmp-answered', true); m = await modal();
  ok('"after they answer" marks the answer and shows the explanation',
    m.correct === 1 && m.fbShown && /four equal sides/i.test(m.fbText), m);
  await tickBox('qmp-show-hints', true); m = await modal();
  ok('the three hints are the ones the pupil can ask for', m.hintsShown && m.hintLines === 3, m);

  // ⚠ The coin-flip that decides "four options or a typed box" is memoised per
  //   question id. A preview that memoised under the REAL id would settle how
  //   that question is drawn in a real session on this device.
  const memo = await ev("({ real: _blankQuestions.has('g5m-prev-002'), scratch: _blankQuestions.has('__qm_preview__') })");
  ok('previewing never decides how the real question is drawn later',
    memo.real === false && memo.scratch === true, memo);

  await ev('AdminPanel.qmClosePreview()');
  await openCard(1); await sleep(200); m = await modal();
  ok('a fresh preview opens unanswered, whatever the last one was left on',
    !m.fbShown && m.correct === 0 && !m.hintsShown, m);
  ok('a one-word MCQ offers its typed-blank face', m.blankRowShown, m);
  await tickBox('qmp-blank', true); m = await modal();
  ok('the typed-blank face is a text box, not four options', m.opts === 0 && m.inputs === 1, m);

  await ev('AdminPanel.qmClosePreview()');
  await openCard(2); await sleep(200); m = await modal();
  ok('a numeric gets its keypad', m.inputs === 1 && m.pads === 1 && m.opts === 0, m);

  await ev('AdminPanel.qmClosePreview()');
  await openCard(3); await sleep(200); m = await modal();
  // ⚠ Not the number pad, and not the "can't be answered on screen" card
  //   either — a cloze has its own French screen and is never dealt into a pool.
  ok('a cloze is explained, not handed a number pad',
    m.unsupported === 1 && m.pads === 0 && m.inputs === 0 && /French exercise/.test(m.unsupportedText), m);

  // Enter inside the preview must not reach practiceSubmit(): there is no
  // session behind it, and the real inputs carry that handler inline.
  await ev('AdminPanel.qmClosePreview()');
  await openCard(2); await sleep(200);
  const enterSafe = await ev([
    '(() => {',
    '  let called = false;',
    '  const was = window.practiceSubmit;',
    '  window.practiceSubmit = () => { called = true; };',
    "  const i = document.querySelector('#qmp-answers input.num-input');",
    "  i.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));",
    '  window.practiceSubmit = was;',
    '  return called;',
    '})()',
  ].join('\n'));
  ok('Enter in the preview cannot submit into a practice session', enterSafe === false);
  await ev('AdminPanel.qmClosePreview()');

  // ── The edit form ──────────────────────────────────────────────────────
  await ev('AdminPanel.qmOpenForm(null)');
  await sleep(200);
  await ev([
    '(() => {',
    "  const set = (id, v) => { const e = document.getElementById(id); e.value = v; e.dispatchEvent(new Event('input')); };",
    "  set('qmf-question', 'Which shape is this? " + SVG.replace(/'/g, "\\'") + "');",
    "  set('qmf-opt-a', 'square'); set('qmf-opt-b', 'circle');",
    "  set('qmf-opt-c', 'cone'); set('qmf-opt-d', 'line');",
    "  set('qmf-answer', 'square');",
    '})()',
  ].join('\n'));
  const form = await ev([
    '(() => ({',
    "  svgs: document.querySelectorAll('#qmf-preview .pr-q svg').length,",
    "  chips: document.querySelectorAll('#qmf-preview .qm-kid-opt').length,",
    "  marked: (document.querySelector('#qmf-preview .qm-kid-opt.is-answer') || {}).textContent || '',",
    '}))()',
  ].join('\n'));
  ok('the edit form previews the drawing and the options, not just the stem',
    form.svgs === 1 && form.chips === 4 && /square/.test(form.marked), form);

  await ev('AdminPanel.qmPreviewForm()');
  await sleep(200); m = await modal();
  ok('an unsaved question can be seen as the pupil will get it',
    m.open && m.opts === 4 && m.qSvgs === 1 && /not saved yet/.test(m.meta), m);

  console.log('\nAdmin question preview: ' + checks + ' checks passed.');
  ws.close(); chrome.kill(); server.close(); process.exit(0);
})().catch(e => { console.error(e.message || e); process.exit(1); });
