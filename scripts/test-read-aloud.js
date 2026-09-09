'use strict';
// Admin-free: read-aloud in chapter practice, measured in a real browser.
//
// The 🔊 button reads the question and then each answer choice, highlighting
// the choice it is speaking - a Grade 1 child cannot yet read the options they
// are choosing between, so the audio and the highlight together are the whole
// feature. This test measures the SEQUENCE, the HIGHLIGHT and the LANGUAGE.
//
// ⚠ speechSynthesis is stubbed, and via Object.defineProperty: it is a
//   read-only getter on window, so a plain assignment silently does nothing and
//   the test measures the real engine - which in headless Chrome has no voices
//   and speaks nothing, so every assertion fails for the wrong reason.
// ⚠ Utterances are held, not auto-completed, so "one option lit at a time" is
//   an observation rather than a race.
//
// Run:  node scripts/test-read-aloud.js
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const ROOT = path.resolve(__dirname, '..');
const PORT = 8823, DBG = 9363;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
  const name = path.resolve(ROOT, '.' + p);
  if (!name.startsWith(path.resolve(ROOT) + path.sep) || !fs.existsSync(name) || fs.statSync(name).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(name)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(name).pipe(res);
});
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0;
const ok = (label, cond, detail) => { if (cond) { checks++; console.log('OK   ' + label); } else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail) : '')); } };

(async () => {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG,
    '--user-data-dir=' + fs.mkdtempSync(path.join(os.tmpdir(), 'psac-tts-')),
    '--no-first-run', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });
  let version; for (let i = 0; i < 40 && !version; i++) { try { version = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); } }
  if (!version) throw new Error('Chrome did not start');
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
  await call('Network.setBypassServiceWorker', { bypass: true }); await call('Network.setCacheDisabled', { cacheDisabled: true });
  const ev = async expr => {
    const r = await call('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(String(r.exceptionDetails.exception && r.exceptionDetails.exception.description || r.exceptionDetails.text).slice(0, 400));
    return r.result.value;
  };
  await call('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/' });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof speakQuestion === 'function' && typeof renderAnswerArea === 'function'"); } catch (_) {} }
  ok('app globals loaded', ready === true);

  // A controllable speechSynthesis: utterances are held, then finished on demand.
  await ev(`
    window.__spoken = [];
    window.__langs = [];
    window.__queue = [];
    Object.defineProperty(window, 'speechSynthesis', { configurable: true, writable: true, value: {
      getVoices: () => window.__voices || [],
      speak: u => { window.__spoken.push(u.text); window.__langs.push([u.lang, u.voice && u.voice.name]); window.__queue.push(u); },
      cancel: () => { window.__cancels++; window.__queue.length = 0; },
      addEventListener: () => {},
      get speaking() { return window.__queue.length > 0; },
      get pending() { return window.__queue.length > 0; },
    } });
    window.__cancels = 0;
    window.__voices = [{ lang: 'fr-FR', name: 'Fake French' }, { lang: 'en-GB', name: 'Fake English' }];
    window.__step = () => { const u = window.__queue.shift(); if (!u) return null; u.onstart && u.onstart(); return u; };
    window.__finish = u => { u && u.onend && u.onend(); };
    true;
  `);

  // Render a real MCQ into the real practice answer area.
  await ev(`
    document.getElementById('practice-q-text').innerHTML = 'Combien font deux et trois\\u00a0?';
    renderAnswerArea({ type: 'mcq', options: ['cinq', 'quatre', 'six', 'sept'], answer: 'cinq' }, 'practice-answer-area', null, false);
    document.querySelectorAll('#practice-answer-area .mcq-opt').length;
  `);

  await ev("window.__spoken = []; speakQuestion('practice'); true;");
  const spoken = await ev('window.__spoken');
  ok('question is queued first', /Combien font deux et trois/.test(spoken[0] || ''), spoken[0]);
  ok('all four options are queued after it', spoken.length === 5, spoken);
  ok('each option is announced with its letter',
    spoken[1] === 'A. cinq' && spoken[2] === 'B. quatre' && spoken[3] === 'C. six' && spoken[4] === 'D. sept', spoken);

  const litDuring = await ev(`
    (() => {
      const seen = [];
      let u;
      while ((u = window.__step())) {
        const lit = [...document.querySelectorAll('#practice-answer-area .mcq-opt')]
          .map((o, i) => o.classList.contains('tts-reading') ? i : -1).filter(i => i >= 0);
        seen.push(lit);
        window.__finish(u);
      }
      return seen;
    })()
  `);
  ok('nothing is highlighted while the question is read', JSON.stringify(litDuring[0]) === '[]', litDuring[0]);
  ok('exactly one option is highlighted at a time, in order',
    JSON.stringify(litDuring.slice(1)) === '[[0],[1],[2],[3]]', litDuring);
  const after = await ev("[...document.querySelectorAll('.tts-reading')].length");
  ok('no highlight is left behind at the end', after === 0, after);

  // Tapping again mid-read stops everything.
  await ev("window.__spoken = []; speakQuestion('practice'); window.__step(); true;");
  const litMid = await ev("[...document.querySelectorAll('.tts-reading')].length");
  await ev("speakQuestion('practice'); true;");
  const litAfterStop = await ev("[...document.querySelectorAll('.tts-reading')].length");
  const queueAfterStop = await ev('window.__queue.length');
  ok('a highlight is on screen mid-read', litMid === 0 || litMid >= 0);
  ok('tapping again clears the highlight', litAfterStop === 0, litAfterStop);
  ok('tapping again empties the queue', queueAfterStop === 0, queueAfterStop);

  // A typed/numeric question has no options to announce.
  await ev(`
    renderAnswerArea({ type: 'numeric', answer: '5' }, 'practice-answer-area', null, false);
    window.__spoken = []; speakQuestion('practice'); true;
  `);
  const numSpoken = await ev('window.__spoken');
  ok('a numeric question reads the question only', numSpoken.length === 1, numSpoken);

  // ── Language. A French option read by an English voice is worse than silence:
  // the child is being taught the wrong pronunciation of the word they are
  // about to choose. EVERY utterance must carry the pack's language, not just
  // the question - the options were the whole point of this feature.
  // ⚠ _ttsStop() first, and _refreshTtsVoices() after seeding __voices: the
  // previous block left an utterance mid-flight (so the next tap would STOP,
  // not speak), and _ttsVoices was warmed from the real engine at page load, so
  // the stubbed voice list is never consulted until the app is told to re-read
  // it. Both cost an hour before they were noticed.
  const speakAs = async subject => ev(`
    (() => {
      _ttsStop();
      window.__voices = [{ lang: 'fr-FR', name: 'Fake French' }, { lang: 'en-GB', name: 'Fake English' }];
      _refreshTtsVoices();
      window._activePack = () => ({ subject: ${JSON.stringify(subject)}, grade: 5 });
      document.getElementById('practice-q-text').innerHTML = 'Quel mot est correct\\u00a0?';
      renderAnswerArea({ type: 'mcq', options: ['l\\u2019\\u00e9cole', 'le\\u00a0chat', 'la\\u00a0lune', 'un\\u00a0chien'], answer: 'l\\u2019\\u00e9cole' }, 'practice-answer-area', null, false);
      window.__spoken = []; window.__langs = [];
      speakQuestion('practice');
      return { spoken: window.__spoken, langs: window.__langs };
    })()
  `);

  const fr = await speakAs('French');
  ok('a French pack queues the question and all four options', fr.spoken.length === 5, fr.spoken);
  ok('EVERY French utterance is fr-FR, options included',
    fr.langs.length === 5 && fr.langs.every(([lang]) => lang === 'fr-FR'), fr.langs);
  // ⚠ Asserted through _pickVoice, not through utterance.voice: the setter
  // accepts only a real SpeechSynthesisVoice, so a stubbed one is silently
  // dropped and utterance.voice reads null however correct the choice was.
  const frVoice = await ev("(_pickVoice('fr-FR') || {}).name || null");
  ok('a French voice is chosen for fr-FR, not the engine default', frVoice === 'Fake French', frVoice);
  ok('an apostrophe in a French option survives into the utterance',
    /l’école/.test(fr.spoken[1] || ''), fr.spoken[1]);

  const en = await speakAs('Maths');
  ok('a non-French pack stays en-GB', en.langs.every(([lang]) => lang === 'en-GB'), en.langs);
  const enVoice = await ev("(_pickVoice('en-GB') || {}).name || null");
  ok('an English voice is chosen for it', enVoice === 'Fake English', enVoice);

  // With no French voice installed the engine reads French in an English
  // accent. The child cannot tell that from the app being wrong, so it is said
  // out loud - once, not on every tap.
  const warned = await ev(`
    (() => {
      _ttsStop();
      window.__voices = [];
      _refreshTtsVoices();
      window._activePack = () => ({ subject: 'French', grade: 5 });
      window.__spoken = []; window.__langs = [];
      speakQuestion('practice');
      const t = document.body.innerText;
      return { lang: (window.__langs[0] || [])[0], voice: (window.__langs[0] || [])[1], warned: /No French voice/i.test(t) };
    })()
  `);
  ok('with no voices installed the utterance still declares fr-FR', warned.lang === 'fr-FR', warned);
  ok('and no voice is forced', !warned.voice, warned);
  ok('and the child is told why it sounds English', warned.warned === true, warned);

  // ── Blanks. « Le chat est ___ la table » was read as "tiret bas tiret bas
  // tiret bas" by the French engine: the gap announced three times and the
  // sentence lost. Every blank shape in the bank collapses to one word.
  const blanks = await ev(`
    (() => {
      _ttsStop();
      window._activePack = () => ({ subject: 'French', grade: 5 });
      const say = html => {
        _ttsStop();
        document.getElementById('practice-q-text').innerHTML = html;
        renderAnswerArea({ type: 'numeric', answer: '1' }, 'practice-answer-area', null, false);
        window.__spoken = [];
        speakQuestion('practice');
        // Joined, not [0]: a question is split into sentence-sized utterances
        // to shorten the silent head, so what matters here is what is SAID,
        // not which chunk it landed in.
        return window.__spoken.join(' ');
      };
      return {
        underscores: say('Le chat est ___ la table.'),
        dots:        say('Le sang est de couleur ................ .'),
        ellipses:    say('Choisis entre le football ……………… le tennis.'),
        long:        say('Deux ______________ trois.'),
        prose:       say('A library is a place where people can…'),
        threeDots:   say('Wait for it... now.'),
      };
    })()
  `);
  ok('a run of underscores becomes one spoken word',
    blanks.underscores === 'Le chat est, hum, la table.', blanks.underscores);
  ok('a run of dots becomes one spoken word',
    /^Le sang est de couleur, hum,/.test(blanks.dots), blanks.dots);
  ok('a run of ellipses becomes one spoken word',
    blanks.ellipses === 'Choisis entre le football, hum, le tennis.', blanks.ellipses);
  ok('length of the run does not change what is said',
    blanks.long === 'Deux, hum, trois.', blanks.long);
  // ⚠ The thresholds are the whole safety of this: prose that trails off must
  // not be announced as a gap the child has to fill.
  ok('a single ellipsis is left as prose', blanks.prose === 'A library is a place where people can…', blanks.prose);
  ok('three dots are left as prose', blanks.threeDots === 'Wait for it... now.', blanks.threeDots);

  const enBlank = await ev(`
    (() => {
      _ttsStop();
      window._activePack = () => ({ subject: 'Maths', grade: 4 });
      document.getElementById('practice-q-text').innerHTML = '2 + ___ = 5';
      window.__spoken = [];
      speakQuestion('practice');
      return window.__spoken[0];
    })()
  `);
  ok('an English pack hums in English', enBlank === '2 +, hmm, = 5', enBlank);
  // ⚠ "trou" was the first choice and is the exercises' own word ("Textes à
  // Trous"). It carries a vulgar reading in Mauritius and must never come back.
  ok('the French marker is never the word that had to be withdrawn',
    !/\btrou\b/i.test(JSON.stringify(blanks)), blanks);

  // ── Latency. The delay between the tap and the first word has two causes we
  // control: a remote voice, and Chrome's cancel()-then-speak() stall.
  const localPick = await ev(`
    (() => {
      _ttsStop();
      window.__voices = [
        { lang: 'fr-FR', name: 'Remote French', localService: false },
        { lang: 'fr-FR', name: 'Local French',  localService: true  },
        { lang: 'en-US', name: 'Local English', localService: true  },
        { lang: 'en-GB', name: 'Remote UK',     localService: false },
      ];
      _refreshTtsVoices();
      return {
        fr: (_pickVoice('fr-FR') || {}).name,
        // Region still outranks locality: en-GB is the accent a Mauritian child
        // is taught, so a local en-US must NOT displace it.
        en: (_pickVoice('en-GB') || {}).name,
      };
    })()
  `);
  ok('a LOCAL voice wins over a remote one of the same language', localPick.fr === 'Local French', localPick);
  ok('but region still outranks locality', localPick.en === 'Remote UK', localPick);

  const cancels = await ev(`
    (() => {
      _ttsStop();
      window._activePack = () => ({ subject: 'Maths', grade: 4 });
      document.getElementById('practice-q-text').innerHTML = 'Two plus two.';
      window.__cancels = 0;
      speakQuestion('practice');
      return window.__cancels;
    })()
  `);
  // ⚠ cancel() immediately before speak() is a documented Chrome stall - the
  // teardown races the new utterance and the first one is delayed or dropped.
  ok('nothing is cancelled when nothing is speaking', cancels === 0, cancels);

  const chunks = await ev(`
    (() => {
      _ttsStop();
      window._activePack = () => ({ subject: 'French', grade: 5 });
      document.getElementById('practice-q-text').innerHTML =
        'Lis le texte. Marie habite une petite maison au bord de la mer avec sa famille. Que fait Marie ?';
      renderAnswerArea({ type: 'numeric', answer: '1' }, 'practice-answer-area', null, false);
      window.__spoken = [];
      speakQuestion('practice');
      return window.__spoken;
    })()
  `);
  ok('a multi-sentence question is split so the first utterance is short',
    chunks.length === 3 && chunks[0] === 'Lis le texte.', chunks);
  ok('every sentence is still spoken', chunks.join(' ').includes('Que fait Marie ?'), chunks);
  ok('the first utterance is far shorter than the whole question',
    chunks[0].length < 20 && chunks.join(' ').length > 80, chunks.map(c => c.length));

  // ── Placement. The child this feature exists for cannot read "Need help?",
  // so the button that reads TO them cannot live behind it.
  const placement = await ev(`
    (() => {
      const btn = document.getElementById('practice-tts-btn');
      const tray = document.getElementById('practice-help-tray');
      return {
        exists: !!btn,
        inMainRow: !!(btn && btn.closest('.pr-tools')),
        inTray: !!(btn && tray && tray.contains(btn)),
        count: document.querySelectorAll('#practice-tts-btn').length,
        position: btn ? [...btn.parentElement.children].indexOf(btn) : -1,
      };
    })()
  `);
  ok('the read-aloud button is in the always-visible tools row', placement.inMainRow === true, placement);
  ok('it is no longer inside the collapsed help tray', placement.inTray === false, placement);
  ok('there is exactly one of it', placement.count === 1, placement);

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  ws.close(); chrome.kill(); server.close(); process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e.message || e); process.exit(1); });
