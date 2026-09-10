'use strict';
// The guest homework runner (guest.html + guest.js) in REAL headless Chrome:
// does an authored option reach the server intact, and does authored markup
// render instead of being printed at the child?
//
// Run: node scripts/test-guest-answer-rendering.js
//
// ⚠ Needs Chrome for Testing, not the installed Chrome — on a developer box the
//   installed binary folds a --headless launch into the already-running browser
//   and the debug port answers for the user's own tabs. Install one with
//   `npx --yes @puppeteer/browsers install chrome@stable` (outside the repo —
//   publish = "." serves the project root) and point CHROME_PATH at it.
// ⚠ Loaded over file://, not a local server: Chrome for Testing could not reach
//   127.0.0.1 here, and the page silently never loaded. guest.html asks for
//   "/guest.js", which file:// resolves to the filesystem root, so the harness
//   copy rewrites that one src to the real file — the file under test is the
//   repo's own guest.js.
// ⚠ fetch is stubbed in Page.addScriptToEvaluateOnNewDocument so it is in place
//   BEFORE guest.js runs; stubbing after navigation races the gate's first call.
// ⚠ "#g-go is enabled" is NOT a readiness signal - the button ships enabled in
//   guest.html and initGate() attaches its click listener only after the
//   assignment metadata arrives. Clicking before that does nothing at all, and
//   the run then sits on the gate for 40 polls and reports the page as broken.
//   Measured: which side of that race a run landed on flipped with the size of
//   guest.js. Wait for the TITLE the stub sends.
//
// Three real authored questions carry the three traps. They are read from the
// built bundles, so this fails if the fixtures are edited away rather than
// quietly testing nothing:
//   g1mth-num-043  options contain a double quote  ('No — it should be "four"')
//   g8m-indices-016 options and answer are markup  (3<sup>6</sup>, not 36)
//   PW4_03         the explanation is markup       (= <b>256 books</b>)
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const DEBUG_PORT = 9362;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
// GUEST_JS points the harness at a COPY of guest.js — that is how this test was
// checked against the pre-fix file. ⚠ Never swap the repo's own guest.js to do
// that: a second session edits this working tree and the swap back overwrites
// whatever they have just written.
const GUEST_JS = process.env.GUEST_JS || path.join(ROOT, 'guest.js');

const FIXTURES = [
  ['grade1-maths', 'g1mth-num-043'],
  ['grade8-maths', 'g8m-indices-016'],
  ['grade5-maths', 'PW4_03'],
];

const getJson = url => new Promise((ok, no) => {
  http.get(url, r => { let b = ''; r.on('data', c => { b += c; }); r.on('end', () => ok(JSON.parse(b))); }).on('error', no);
});
const sleep = ms => new Promise(r => setTimeout(r, ms));

let ws = null;
let chrome = null;
const cleanup = () => {
  try { if (ws) ws.close(); } catch (_) { }
  try { if (chrome) chrome.kill(); } catch (_) { }
};

let pass = 0, fail = 0;
const bad = [];
const check = (ok, label, detail) => {
  if (ok) { pass++; console.log('  ok   ' + label); return; }
  fail++; bad.push(label + (detail ? ' — ' + detail : ''));
  console.log('  FAIL ' + label + (detail ? ' — ' + detail : ''));
};

function loadFixtures() {
  return FIXTURES.map(([pack, id]) => {
    const file = path.join(ROOT, 'netlify/question-bundles', pack + '.json');
    if (!fs.existsSync(file)) {
      throw new Error('Run `node netlify/build-questions.js` first — ' + pack + '.json is missing.');
    }
    const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
    const arr = Array.isArray(raw) ? raw : (raw.questions || []);
    const q = arr.find(x => x.id === id);
    if (!q) throw new Error('fixture gone: ' + id + ' is no longer in ' + pack);
    return q;
  });
}

(async function () {
  const QS = loadFixtures();
  check(QS[0].options.some(o => o.indexOf('"') >= 0), 'fixture 1 still has a quoted option');
  check(QS[1].options.filter(o => /<sup>/.test(o)).length === 4 && /<sup>/.test(QS[1].answer),
    'fixture 2 still has markup in every option and in its answer');
  check(/<b>/.test(QS[2].explanation), 'fixture 3 still has markup in its explanation');

  // The child's own typing, echoed back by the server the way assignment-submit
  // does. It must arrive as text, never as an element.
  const PUPIL_TEXT = '<img src=x onerror="window.__pwned = 1">';
  const SERVER_DETAIL = [
    { id: QS[0].id, userAnswer: PUPIL_TEXT, correctAnswer: QS[0].answer, correct: false },
    { id: QS[1].id, userAnswer: QS[1].answer, correctAnswer: QS[1].answer, correct: true },
    { id: QS[2].id, userAnswer: '255', correctAnswer: 'H<sub>2</sub>O', correct: false },
  ];

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-guest-'));
  const harness = path.join(tmp, 'guest.html');
  fs.writeFileSync(harness, fs.readFileSync(path.join(ROOT, 'guest.html'), 'utf8')
    .replace('src="/guest.js"', 'src="' + ('file:///' + path.resolve(GUEST_JS).replace(/\\/g, '/')) + '"'));

  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-guest-profile-'));
  chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + DEBUG_PORT,
    '--user-data-dir=' + profile, '--no-first-run', '--no-default-browser-check',
    '--disable-gpu', '--allow-file-access-from-files', 'about:blank'], { stdio: 'ignore' });

  let ver = null;
  for (let i = 0; i < 80 && !ver; i++) {
    try { ver = await getJson('http://127.0.0.1:' + DEBUG_PORT + '/json/version'); } catch (e) { await sleep(250); }
  }
  if (!ver) throw new Error('Chrome never came up — set CHROME_PATH to a Chrome for Testing binary.');

  ws = new globalThis.WebSocket(ver.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 0;
  const pending = new Map();
  ws.onmessage = ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const q = pending.get(m.id); pending.delete(m.id);
      if (m.error) q.reject(new Error(m.error.message)); else q.resolve(m.result);
    }
  };
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
  await S('Page.enable'); await S('Runtime.enable');

  // A page exception stops the flow dead, and every later check then reports
  // "never became true" — which reads as a harness bug rather than as the page
  // throwing. Collect them and print them with the failures.
  const pageErrors = [];
  ws.addEventListener('message', ev => {
    const m = JSON.parse(ev.data);
    if (m.method === 'Runtime.exceptionThrown') {
      const d = m.params.exceptionDetails;
      pageErrors.push(d.exception?.description || d.text);
    } else if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
      pageErrors.push((m.params.args || []).map(x => x.value ?? x.description).join(' '));
    }
  });
  await S('Emulation.setDeviceMetricsOverride', { width: 390, height: 900, deviceScaleFactor: 1, mobile: true });

  await S('Page.addScriptToEvaluateOnNewDocument', {
    source: `
      window.__posted = [];
      window.fetch = async (url, opts) => {
        const body = JSON.parse(opts.body);
        const p = String(url);
        let out = { ok: true };
        if (p.indexOf('assignment-open') >= 0) {
          out = body.info
            ? { ok: true, access_mode: 'nickname', title: 'Markup homework' }
            : { ok: true, name: 'Tester', submitName: 'Tester', token: 'tok',
                assignment: { code: 'TEST', title: 'Markup homework' },
                questions: ${JSON.stringify(QS)} };
        } else if (p.indexOf('assignment-submit') >= 0) {
          window.__posted.push(body);
          out = { ok: true, pct: 33, score: 1, total: 3, detail: ${JSON.stringify(SERVER_DETAIL)} };
        }
        return { ok: true, json: async () => out };
      };`,
  });

  const url = 'file:///' + harness.replace(/\\/g, '/') + '?code=TEST';
  await S('Page.navigate', { url });

  const evalIn = async expr => {
    const r = await S('Runtime.evaluate', { returnByValue: true, awaitPromise: true, expression: expr });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || 'page threw');
    return r.result.value;
  };
  const waitFor = async (expr, label) => {
    for (let i = 0; i < 40; i++) {
      if (await evalIn(expr).catch(() => false)) return true;
      await sleep(150);
    }
    check(false, label, 'never became true: ' + expr);
    return false;
  };

  const bail = async () => {
    const where = await evalIn('[...document.querySelectorAll(".screen")].filter(s => s.classList.contains("on")).map(s => s.id).join(",")').catch(() => '?');
    const gerr  = await evalIn('(document.getElementById("g-err") || {}).textContent || ""').catch(() => '');
    console.log('  screen: ' + where + (gerr ? ' · gate error: ' + gerr : ''));
    if (pageErrors.length) console.log('Page errors:' + pageErrors.map(e => '\n ! ' + e).join(''));
    cleanup();
    process.exit(1);
  };

  if (!await waitFor('document.getElementById("g-title").textContent === "Markup homework"'
    + ' && !document.getElementById("g-go").disabled',
    'the gate loads the assignment')) { await bail(); }

  await evalIn('document.getElementById("g-name").value = "Tester"; document.getElementById("g-go").click(); true;');
  if (!await waitFor('document.getElementById("s-home").classList.contains("on")', 'sign-in reaches the home screen')) { await bail(); }
  await evalIn('document.getElementById("h-start").click(); true;');
  if (!await waitFor('document.getElementById("s-quiz").classList.contains("on")', 'the quiz starts')) { await bail(); }

  // ── Q1 · an option with a double quote in it ──────────────────────────────
  // The whole defect: the option text used to be written into a data-v
  // attribute that esc() did not quote-escape, so the attribute closed early.
  check(await evalIn('document.querySelectorAll("#q-answers .opt").length') === 4,
    'Q1 draws four options');
  check(await evalIn('[...document.querySelectorAll("#q-answers .opt")].every(b => !b.hasAttribute("data-v"))'),
    'no option carries its own text in an attribute');
  const truncated = await evalIn(`(() => {
    const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const d = document.createElement('div');
    d.innerHTML = '<button data-v="' + esc(${JSON.stringify(QS[0].answer)}) + '">x</button>';
    return d.firstChild.dataset.v;
  })()`);
  check(truncated !== QS[0].answer,
    'the old data-v route really does truncate a quoted option in this parser',
    JSON.stringify(truncated));
  const labels = await evalIn('[...document.querySelectorAll("#q-answers .opt span:last-child")].map(s => s.textContent)');
  check(JSON.stringify(labels) === JSON.stringify(QS[0].options),
    'every option label survives the quote intact', JSON.stringify(labels));

  const clickCorrect = `(() => {
    const want = ${JSON.stringify(QS[0].answer)};
    const b = [...document.querySelectorAll("#q-answers .opt")]
      .find(x => x.querySelector("span:last-child").textContent === want);
    if (!b) return false;
    b.click(); document.getElementById("q-btn").click(); return true;
  })()`;
  check(await evalIn(clickCorrect), 'the correct option can be picked');
  check(await evalIn('document.getElementById("q-fb").className.indexOf("ok") >= 0'),
    'picking the right quoted option is marked correct, not wrong',
    await evalIn('document.getElementById("q-fb").className'));
  check((await evalIn('document.getElementById("q-fb").textContent')).indexOf('<b>') < 0,
    'Q1 feedback prints no raw tag');

  // ── Q2 · markup in the options and in the answer ──────────────────────────
  await evalIn('document.getElementById("q-btn").click(); true;');
  await waitFor('document.getElementById("q-count").textContent.indexOf("2 of") >= 0', 'Q2 is reached');
  check(await evalIn('document.querySelectorAll("#q-answers .opt sup").length') === 4,
    'each option renders its index as a <sup> element');
  check((await evalIn('document.getElementById("q-answers").textContent')).indexOf('<sup>') < 0,
    'no option prints a raw <sup> tag at the child');
  check(await evalIn(`(() => {
    const b = [...document.querySelectorAll("#q-answers .opt")]
      .find(x => x.querySelector("span:last-child").textContent === "36");
    if (!b) return false;
    b.click(); document.getElementById("q-btn").click();
    return document.getElementById("q-fb").className.indexOf("ok") >= 0;
  })()`), '3<sup>6</sup> is graded as the correct pick');

  // ── Q3 · markup in the explanation — the reported bug ─────────────────────
  await evalIn('document.getElementById("q-btn").click(); true;');
  await waitFor('document.getElementById("q-count").textContent.indexOf("3 of") >= 0', 'Q3 is reached');
  check(await evalIn(`(() => {
    const inp = document.getElementById("q-num");
    if (!inp) return false;
    inp.value = "255";
    document.getElementById("q-btn").click(); return true;
  })()`), 'the numeric answer box takes a wrong answer');
  const fb = await evalIn('document.getElementById("q-fb").textContent');
  check(fb.indexOf('<b>') < 0 && fb.indexOf('256 books') >= 0,
    'the worked explanation renders its bold instead of printing <b>', fb);
  check(await evalIn('document.querySelectorAll("#q-fb b").length') >= 2,
    'the explanation contributes a real <b> element');

  // ── Submit · what actually reaches the server ─────────────────────────────
  await evalIn('document.getElementById("q-btn").click(); true;');
  if (await waitFor('window.__posted.length === 1', 'the answers are submitted')) {
    const sent = await evalIn('window.__posted[0].answers');
    check(sent[0] && sent[0].answer === QS[0].options[QS[0].options.indexOf(QS[0].answer)],
      'the quoted option reaches the server whole — grading agrees with the child',
      JSON.stringify(sent[0]));
    check(sent[1] && sent[1].answer === QS[1].answer,
      'the markup option reaches the server whole', JSON.stringify(sent[1]));
  }

  // ── Review · authored answer renders, the pupil's own text never does ─────
  if (await waitFor('document.querySelectorAll("#d-reviewlist .rv").length === 3', 'the review list is built')) {
    check(await evalIn('document.querySelectorAll("#d-reviewlist sub").length') === 1,
      'a correct answer of H<sub>2</sub>O renders as a subscript');
    check((await evalIn('document.getElementById("d-reviewlist").textContent')).indexOf('<img') >= 0,
      "the pupil's own text is shown as text");
    check(await evalIn('document.querySelectorAll("#d-reviewlist img").length') === 0
       && await evalIn('window.__pwned === undefined'),
      "the pupil's own text is never parsed as markup");
  }

  cleanup();
  try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (_) { }

  console.log('\nGuest homework rendering: ' + pass + ' passed, ' + fail + ' failed.');
  if (pageErrors.length) console.log('Page errors:' + pageErrors.map(e => '\n ! ' + e).join(''));
  if (fail) { console.log(bad.map(b => ' · ' + b).join('\n')); process.exitCode = 1; }
})().catch(e => { console.error(e); process.exitCode = 1; cleanup(); });
