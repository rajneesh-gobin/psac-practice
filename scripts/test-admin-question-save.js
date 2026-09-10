'use strict';
// Admin › Question bank — what a SAVE writes, measured in a real browser.
//
// qmSave() used to rebuild `data` from the form's own fields:
//     { id, chapterId, difficulty, type, question, options, answer,
//       acceptableAnswers:[answer], subsection?, hint?, explanation? }
// Every other field in the row was destroyed on save. Measured across the built
// bundles at the time: 33,171 questions, 34 distinct `type` values and 66
// distinct fields, against a form that offered 3 types and wrote 11 fields. So
// opening a `slots` question to fix a typo silently dropped its `marks` and
// `slotResponse`; a French `text` item lost `confusables` and `strictAccents`;
// every multi-value `acceptableAnswers` collapsed to one; `learnMore`,
// `imageAlt` and `unit` went the same way. The save now MERGES.
//
// Three more defects in the same function, all fixed and pinned here:
//  - the Type control offered `tf`, which no renderAnswerArea() branch handles
//    (makeTF() has always produced an mcq) — the pupil got "can't be answered
//    on screen";
//  - the id was editable on an existing question, so upsert() wrote a SECOND
//    row and left the original behind;
//  - "must match one of the options exactly" was placeholder text and nothing
//    enforced it — an answer matching no option is a question no child can win.
//
// Run:  node scripts/test-admin-question-save.js
// ⚠ Service worker bypassed and cache disabled, or this measures the previous
//   admin.js and reports a fix that never landed.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os'), assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const PORT = 8825, DBG = 9365;
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

// Rows shaped like the real ones. Every field below the form's eleven is here
// because the bundle census says the corpus carries it.
const FIXTURES = [
  { id: 'g9m-slots-001', subject_id: 'grade9-maths', chapter_id: 'algebra', grade: 9, difficulty: 3, protected: false, is_past_paper: false,
    data: { id: 'g9m-slots-001', chapterId: 'algebra', type: 'slots', difficulty: 3, subsection: 'equations',
      question: 'Solve for x and y.', answer: ['3', '5'], marks: 2, unit: 'cm',
      slotResponse: { answer: ['3', '5'], labels: ['x', 'y'] },
      hint: 'Substitute.', explanation: 'x = 3, y = 5.' } },
  { id: 'g5fr-text-002', subject_id: 'grade5-french', chapter_id: 'vocabulaire', grade: 5, difficulty: 2, protected: false, is_past_paper: false,
    data: { id: 'g5fr-text-002', chapterId: 'vocabulaire', type: 'text', difficulty: 2, subsection: 'mots',
      question: 'Écris le mot : l\u2019oiseau vole dans le ___.', answer: 'ciel',
      acceptableAnswers: ['ciel', 'le ciel'], confusables: ['sel'], strictAccents: true,
      learnMore: 'https://example.org/ciel', hint: 'Regarde en haut.', explanation: 'Le ciel.' } },
  { id: 'g5sc-mcq-003', subject_id: 'grade5-science', chapter_id: 'plants', grade: 5, difficulty: 1, protected: false, is_past_paper: false,
    data: { id: 'g5sc-mcq-003', chapterId: 'plants', type: 'mcq', difficulty: 1,
      question: 'Which part makes food? <img src="leaf.png" alt="a plant part">',
      options: ['Leaf', 'Root', 'Stem', 'Flower'], answer: 'Leaf', acceptableAnswers: ['Leaf'],
      imageAlt: 'a plant part', learnMore: 'https://example.org/photosynthesis',
      hint: 'It is green.', explanation: 'Leaves photosynthesise.' } },
];

(async () => {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG, '--user-data-dir=' + fs.mkdtempSync(path.join(os.tmpdir(), 'psac-qms-')), '--no-first-run', '--hide-scrollbars', 'about:blank',
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

  // ⚠ The rows arrive, and the write leaves, through the client's own fetch.
  //   Reaching into the module would test a save path production never runs.
  //   PostgREST answers a single-row read as an OBJECT when the caller asks for
  //   one (`Accept: …pgrst.object+json`) and an ARRAY otherwise; both shapes are
  //   served here so the stub does not depend on postgrest-js's version.
  await ev([
    '(() => {',
    '  const orig = window.fetch.bind(window);',
    '  const rows = ' + JSON.stringify(FIXTURES) + ';',
    '  window.__writes = [];',
    '  window.fetch = (input, init) => {',
    '    const url = typeof input === "string" ? input : (input && input.url) || "";',
    '    const opt = init || {};',
    '    if (!url.includes("/rest/v1/questions")) return orig(input, init);',
    '    if ((opt.method || "GET").toUpperCase() !== "GET") {',
    '      window.__writes.push({ method: opt.method, body: JSON.parse(opt.body) });',
    '      return Promise.resolve(new Response("[]", { status: 201, headers: { "Content-Type": "application/json" } }));',
    '    }',
    '    const m = url.match(/id=eq\\.([^&]+)/);',
    '    const hit = m ? rows.filter(r => r.id === decodeURIComponent(m[1])) : rows;',
    '    const hdrs = new Headers((opt.headers) || {});',
    '    const wantsObject = String(hdrs.get("Accept") || "").includes("pgrst.object");',
    '    const payload = wantsObject ? (hit[0] || null) : hit;',
    '    return Promise.resolve(new Response(JSON.stringify(payload), { status: 200, headers: {',
    '      "Content-Type": "application/json", "content-range": "0-" + Math.max(0, hit.length - 1) + "/" + hit.length } }));',
    '  };',
    '})()',
  ].join('\n'));

  await ev('AdminPanel.qmSearch()');
  await sleep(400);

  const formState = () => ev([
    '(() => ({',
    "  type: document.getElementById('qmf-type').value,",
    "  question: document.getElementById('qmf-question').value,",
    "  answer: document.getElementById('qmf-answer').value,",
    "  accept: document.getElementById('qmf-accept').value,",
    "  answerReadOnly: document.getElementById('qmf-answer').readOnly,",
    "  idReadOnly: document.getElementById('qmf-id').readOnly,",
    "  noteShown: !document.getElementById('qmf-type-note').classList.contains('hidden'),",
    "  optionsHidden: document.getElementById('qmf-options-block').classList.contains('hidden'),",
    '}))()',
  ].join('\n'));
  const setField = (id, v) => ev("(() => { const e = document.getElementById('" + id + "'); e.value = " + JSON.stringify(v) + "; e.dispatchEvent(new Event('input')); e.dispatchEvent(new Event('change')); })()");
  const lastWrite = () => ev('window.__writes.length ? window.__writes[window.__writes.length - 1] : null');
  const writeCount = () => ev('window.__writes.length');
  const openAndWait = async id => { await ev('AdminPanel.qmOpenForm(' + JSON.stringify(id) + ')'); await sleep(350); };
  const save = async () => { await ev('AdminPanel.qmSave()'); await sleep(350); };

  // ── 1. A type this form cannot author ─────────────────────────────────────
  await openAndWait('g9m-slots-001');
  let f = await formState();
  ok('an unknown type is carried, not blanked to ""', f.type === 'slots', f);
  ok('it says so, hides the options and locks the answer',
    f.noteShown && f.optionsHidden && f.answerReadOnly, f);
  ok('the id of an existing question is read-only', f.idReadOnly, f);

  // ⚠ The save and the preview compose the SAME object. When they were two
  //   builders the preview drew this question with no slotResponse — an empty
  //   row, telling the author it was broken while the save kept it intact.
  await ev('AdminPanel.qmPreviewForm()'); await sleep(300);
  const slotPreview = await ev([
    '(() => ({',
    "  slots: document.querySelectorAll('#qmp-answers .slot-input').length,",
    "  labels: [...document.querySelectorAll('#qmp-answers .slot-label')].map(e => e.textContent.trim()),",
    '}))()',
  ].join('\n'));
  ok('the form preview draws the stored slots, not an empty answer area',
    slotPreview.slots === 2 && slotPreview.labels.length === 2, slotPreview);
  await ev('AdminPanel.qmClosePreview()'); await sleep(150);

  await setField('qmf-question', 'Solve for x and y. (corrected)');
  await save();
  let w = await lastWrite();
  ok('a slots question keeps marks, slotResponse and unit through an edit',
    w && w.body.data.marks === 2 && w.body.data.unit === 'cm'
    && JSON.stringify(w.body.data.slotResponse) === JSON.stringify(FIXTURES[0].data.slotResponse), w && w.body.data);
  ok('its array answer is not flattened into the form\'s text box',
    Array.isArray(w.body.data.answer) && w.body.data.answer.join(',') === '3,5', w.body.data.answer);
  ok('its type is written back unchanged', w.body.data.type === 'slots', w.body.data.type);
  ok('the edit itself lands', /corrected/.test(w.body.data.question), w.body.data.question);

  // ── 2. A French text item: the accept list is now visible and kept ─────────
  await openAndWait('g5fr-text-002');
  f = await formState();
  ok('the rest of the accept list is shown, not silently dropped', f.accept === 'le ciel', f);
  ok('an editable type unlocks the answer and hides the note', !f.answerReadOnly && !f.noteShown, f);

  await setField('qmf-answer', 'le ciel bleu');
  await save();
  w = await lastWrite();
  ok('confusables, strictAccents and learnMore survive an answer change',
    JSON.stringify(w.body.data.confusables) === '["sel"]' && w.body.data.strictAccents === true
    && w.body.data.learnMore === 'https://example.org/ciel', w.body.data);
  ok('the new answer leads the accept list and the extras follow',
    JSON.stringify(w.body.data.acceptableAnswers) === '["le ciel bleu","le ciel"]', w.body.data.acceptableAnswers);

  // ── 3. An MCQ: options, and the answer-must-be-an-option rule ─────────────
  await openAndWait('g5sc-mcq-003');
  const before = await writeCount();
  await setField('qmf-answer', 'Petal');
  await save();
  ok('an answer that matches no option is refused, not written',
    (await writeCount()) === before);

  await setField('qmf-answer', 'Root');
  await save();
  w = await lastWrite();
  ok('imageAlt and learnMore survive an ordinary MCQ edit',
    w.body.data.imageAlt === 'a plant part' && w.body.data.learnMore === 'https://example.org/photosynthesis', w.body.data);
  ok('the options the form shows are the options it writes',
    JSON.stringify(w.body.data.options) === '["Leaf","Root","Stem","Flower"]', w.body.data.options);
  ok('the id is the one it was opened with, so upsert cannot fork the row',
    w.body.id === 'g5sc-mcq-003', w.body.id);

  // A cleared field must actually clear. The old save only ever wrote a value
  // it found, so a hint could be added but never taken away.
  await setField('qmf-hint', '');
  await save();
  w = await lastWrite();
  ok('clearing the hint removes it instead of leaving the old one',
    !('hint' in w.body.data), Object.keys(w.body.data));

  // ── 4. True / False is stored as an MCQ ──────────────────────────────────
  await ev('AdminPanel.qmOpenForm(null)'); await sleep(300);
  await ev("(() => { const g = document.getElementById('qmf-grade'); g.value = '5'; g.dispatchEvent(new Event('change')); })()");
  await ev("(() => { const s = document.getElementById('qmf-subject'); s.value = 'grade5-science'; s.dispatchEvent(new Event('change')); })()");
  await setField('qmf-type', 'tf');
  await setField('qmf-question', 'Plants need light.');
  await setField('qmf-answer', 'True');
  await save();
  w = await lastWrite();
  // ⚠ NOT type:'tf'. renderAnswerArea() has no branch for it, so such a row
  //   showed the pupil "this question can't be answered on screen".
  ok('a True / False question is stored as an mcq the renderer can draw',
    w.body.data.type === 'mcq' && JSON.stringify(w.body.data.options) === '["True","False"]', w.body.data);

  await ev('AdminPanel.qmOpenForm(null)'); await sleep(300);
  await ev("(() => { const g = document.getElementById('qmf-grade'); g.value = '5'; g.dispatchEvent(new Event('change')); })()");
  await ev("(() => { const s = document.getElementById('qmf-subject'); s.value = 'grade5-french'; s.dispatchEvent(new Event('change')); })()");
  await setField('qmf-type', 'tf');
  await setField('qmf-question', 'Les plantes ont besoin de lumière.');
  await setField('qmf-id', 'g5fr-tf-999');
  await setField('qmf-answer', 'Vrai');
  await save();
  w = await lastWrite();
  // Same rule as makeTF() in engine/helpers.js — the id prefix is the only
  // language marker a factory can see.
  ok('a French pack gets Vrai / Faux, as makeTF() has always given it',
    JSON.stringify(w.body.data.options) === '["Vrai","Faux"]', w.body.data.options);

  console.log('\nAdmin question save: ' + checks + ' checks passed.');
  ws.close(); chrome.kill(); server.close(); process.exit(0);
})().catch(e => { console.error(e.message || e); process.exit(1); });
