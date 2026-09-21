'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Subject certificates, measured in a REAL browser.
//
//  scripts/test-certificates.js already proves the ladder, the record builder
//  and the artwork's XML. Three things it cannot prove, and all three are
//  silent failures rather than errors:
//
//   1. THE PNG. The shared certificate is the SVG rasterised through an <img>
//      with a data: URL onto a canvas. If the markup referenced anything
//      external, or the canvas were tainted, the parent gets a blank picture
//      and nothing throws. So this actually rasterises one and looks at the
//      pixels.
//   2. THE TEXT FITS. SVG has no text flow. A long name, or a six-figure
//      question count, runs off the certificate and out of the viewBox with
//      no error. Every <text> element's real bounding box is measured.
//   3. NO SIDEWAYS SCROLL at phone width, on a screen whose main content is a
//      fixed-ratio picture and a table.
//
//  ⚠ Chrome is launched with its own fresh --user-data-dir. Reusing the
//    installed profile attaches the debugger to the user's live browser.
//  ⚠ Page.setBypassServiceWorker AND a cache-disabled reload, or this measures
//    the previously cached style.css and reports a fix that never landed.
//
//  Run:  node scripts/test-certificate-render.js
//  Env:  CHROME_PATH to point at another Chrome.
// ══════════════════════════════════════════════════════════════════════════

const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8831, DBG = 9371;
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

let checks = 0, failed = 0;
const ok = (label, cond, detail) => {
  if (cond) { checks++; console.log('OK   ' + label); }
  else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail).slice(0, 300) : '')); }
};

(async () => {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-cert-'));
  const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG,
    '--user-data-dir=' + profile,
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
  await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });

  const ev = async expr => {
    const r = await call('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) {
      throw new Error(String((r.exceptionDetails.exception && r.exceptionDetails.exception.description)
        || r.exceptionDetails.text).slice(0, 500));
    }
    return r.result.value;
  };

  try {
    await call('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html` });
    for (let i = 0; i < 80; i++) {
      if (await ev(`typeof Certificates !== 'undefined' && typeof PracticeSelector !== 'undefined'`)) break;
      await sleep(200);
    }

    // ── the module and its markup are actually there ────────────────────
    ok('Certificates module loaded', await ev(`typeof Certificates === 'object'`));
    ok('#screen-certificates exists', await ev(`!!document.getElementById('screen-certificates')`));
    ok('#cert-body exists', await ev(`!!document.getElementById('cert-body')`));
    ok('viewer modal exists', await ev(`!!document.getElementById('modal-certificate')`));
    ok('info modal exists', await ev(`!!document.getElementById('modal-certificate-info')`));
    ok('the screen is hidden until it is opened',
       await ev(`document.getElementById('screen-certificates').classList.contains('hidden')`));

    // ⚠ The warning is the one thing on this screen that must never be behind
    //   a disclosure. It is in the markup, visible, above #cert-body.
    const warn = await ev(`(() => {
      const w = document.querySelector('#screen-certificates .cert-warn');
      const b = document.getElementById('cert-body');
      if (!w || !b) return null;
      return { text: w.textContent.replace(/\\s+/g, ' ').trim(),
               beforeBody: !!(w.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING),
               hidden: w.hasAttribute('hidden') || w.closest('details') !== null };
    })()`);
    ok('the warning sits above the certificates', warn && warn.beforeBody, warn);
    ok('the warning is not collapsed behind a disclosure', warn && !warn.hidden);
    ok('the warning names the Examinations Syndicate',
       !!warn && /Mauritius Examinations Syndicate/.test(warn.text));
    ok('the warning says the certificates are not recognised',
       !!warn && /not.{0,30}recognised/i.test(warn.text), warn && warn.text.slice(0, 160));

    // ── a record we control, for every level ────────────────────────────
    await ev(`window.__certCounts = { 'grade5-maths': { ch1: [200,200,100,100], ch2: [150,150,50,50] } };
      window.__rec = (mastered) => Certificates.buildRecord('grade5-maths', window.__certCounts,
        { ch1: { explored: mastered, secure: mastered, attempts: mastered, correct: mastered } });
      true;`);

    const tiers = await ev(`Certificates.TIERS.map(t => t.key)`);

    // ⚠ The widest realistic name, not "Ana". A name that fits is not a test.
    const LONG_NAME = 'Marie-Christelle Ramsamy-Appadoo';

    for (const key of tiers) {
      const r = await ev(`(() => {
        const t = Certificates.TIERS.find(x => x.key === ${JSON.stringify(key)});
        const rec = Object.assign(window.__rec(600), { tier: t, name: 'Mathematics', grade: 5 });
        const host = document.getElementById('cert-body');
        host.innerHTML = '<div class="cert-sheet">' + Certificates.svg(rec,
          { name: ${JSON.stringify(LONG_NAME)}, serial: 'NK-ZZZ9999-L' + t.idx, issued: '2026-09-21' }) + '</div>';
        document.getElementById('screen-certificates').classList.remove('hidden');
        const svg = host.querySelector('svg');
        if (!svg) return { err: 'no svg' };
        const vb = svg.viewBox.baseVal;
        let worst = 0, worstText = '';
        for (const t2 of svg.querySelectorAll('text')) {
          const b = t2.getBBox();
          const over = Math.max(vb.x - b.x, (b.x + b.width) - (vb.x + vb.width),
                                vb.y - b.y, (b.y + b.height) - (vb.y + vb.height));
          if (over > worst) { worst = over; worstText = t2.textContent.trim().slice(0, 50); }
        }
        return {
          overflow: Math.round(worst),
          worstText,
          texts: svg.querySelectorAll('text').length,
          docScroll: document.documentElement.scrollWidth,
          win: window.innerWidth,
        };
      })()`);
      ok(`"${key}": every line of text stays on the certificate`, r && r.overflow <= 0,
         r && { overflow: r.overflow, text: r.worstText });
      ok(`"${key}": no sideways scroll at 390px`, r && r.docScroll <= r.win + 1,
         r && { scrollWidth: r.docScroll, innerWidth: r.win });
    }

    // ── all nine on ONE page, which is what the screen actually does ────
    //  ⚠ THE FAILURE THIS EXISTS FOR: <defs> ids are document-wide. With every
    //    certificate carrying id="cg" they all painted with the FIRST one's
    //    gradient, so the dark Subject Master design came out on a pale ground
    //    with gold text on it. Nothing threw. The check is the PAINTED colour,
    //    not the markup: only the browser resolves url(#…).
    const together = await ev(`(() => {
      const host = document.getElementById('cert-body');
      host.innerHTML = Certificates.TIERS.map(t => {
        const rec = Object.assign(window.__rec(600), { tier: t, name: 'Mathematics', grade: 5 });
        return '<div class="cert-sheet" data-k="' + t.key + '">' +
          Certificates.svg(rec, { name: 'Ana Devi', serial: 'NK-AAA1111-L' + t.idx, issued: '2026-09-21' }) +
          '</div>';
      }).join('');
      document.getElementById('screen-certificates').classList.remove('hidden');
      const ids = [...host.querySelectorAll('[id]')].map(e => e.id);
      const grounds = [...host.querySelectorAll('.cert-sheet')].map(d => {
        const svg = d.querySelector('svg');
        const rect = svg.querySelector('rect');
        const fill = rect.getAttribute('fill');
        const refId = (fill.match(/url\\(#([^)]+)\\)/) || [])[1];
        const def = refId ? svg.querySelector('#' + CSS.escape(refId)) : null;
        const stop = def ? def.querySelector('stop') : null;
        return { k: d.dataset.k, refId, ownsDef: !!(def && svg.contains(def)),
                 paper: stop ? stop.getAttribute('stop-color') : null };
      });
      return { ids, dupIds: ids.length - new Set(ids).size, grounds };
    })()`);
    ok('nine certificates on one page share no element id',
       together && together.dupIds === 0, together && { dup: together.dupIds });
    ok('every certificate resolves its own gradient',
       together && together.grounds.every(g => g.ownsDef),
       together && together.grounds.filter(g => !g.ownsDef));
    ok('the dark Subject Master design keeps its own dark paper',
       together && (together.grounds.find(g => g.k === 'master') || {}).paper === '#101a33',
       together && together.grounds.map(g => g.k + ':' + g.paper));
    ok('the nine designs use different papers',
       together && new Set(together.grounds.map(g => g.paper)).size === 10,
       together && new Set(together.grounds.map(g => g.paper)).size);

    // ── the PNG a parent actually forwards ──────────────────────────────
    const png = await ev(`(async () => {
      const rec = Object.assign(window.__rec(600), { tier: Certificates.TIERS[8], name: 'Mathematics', grade: 5 });
      const markup = Certificates.svg(rec, { name: ${JSON.stringify(LONG_NAME)}, serial: 'NK-ZZZ9999-L8', issued: '2026-09-21' });
      try {
        const blob = await Certificates.toPngBlob(markup, 1);
        const bmp = await createImageBitmap(blob);
        const cv = document.createElement('canvas');
        cv.width = bmp.width; cv.height = bmp.height;
        const ctx = cv.getContext('2d');
        ctx.drawImage(bmp, 0, 0);
        const d = ctx.getImageData(0, 0, cv.width, cv.height).data;
        // How much of the picture is NOT the paper colour? A blank rasterisation
        // (the classic symptom of an external reference) is uniform.
        let ink = 0;
        for (let i = 0; i < d.length; i += 4 * 97) {
          if (d[i] < 200 || d[i + 1] < 200 || d[i + 2] < 200) ink++;
        }
        return { bytes: blob.size, type: blob.type, w: bmp.width, h: bmp.height,
                 sampled: Math.floor(d.length / (4 * 97)), ink };
      } catch (e) { return { err: String(e && e.message || e) }; }
    })()`);
    ok('the certificate rasterises to a PNG', png && !png.err && png.type === 'image/png', png);
    ok('the PNG is the full certificate', png && png.w === 1000 && png.h === 707, png);
    ok('the PNG is more than a header', png && png.bytes > 15000, png && { bytes: png.bytes });
    // ⚠ The failure this catches: a blank or near-blank picture, which is what
    //   an external font or image reference produces, with no error anywhere.
    ok('the PNG actually has the artwork on it', png && png.ink > png.sampled * 0.02,
       png && { ink: png.ink, sampled: png.sampled });

    // ── the info sheet ───────────────────────────────────────────────────
    const info = await ev(`(() => {
      // Certificates.info() reads the module's own record list, so drive it
      // the way the screen does rather than reaching inside.
      const rec = window.__rec(430);
      return { pct: rec.pct, tier: rec.tier.key, chapters: rec.chapters.length,
               toNext: rec.toNext, next: rec.nextTier && rec.nextTier.key };
    })()`);
    ok('a real record reaches the right level in the browser too',
       info && info.tier === 'achiever' && info.pct === 43, info);
    ok('the record lists both chapters', info && info.chapters === 2, info);

    // ── the whole screen, end to end, against the REAL pack list ────────
    //  ⚠ Not a mock of the render. Certificates.render() resolves the child,
    //    injects the real subjects/_counts.js, calls the real RPC (which
    //    answers 403 no_student without a token, exactly as it should), falls
    //    back to the cached rows seeded below and paints. Everything except
    //    the identity and the progress rows is production code.
    const painted = await ev(`(async () => {
      // ⚠ BARE assignments, not window.X. Auth is  at
      //   classic-script top level and never lands on window (CLAUDE.md's
      //   role-module rule), so a window.Auth stub would be a different object
      //   that certificates.js never reads - which is exactly how this test
      //   first passed while painting nothing.
      _isParentContext = () => false;
      Auth.getActiveAccount = () => ({ id: 'cert-test-kid', name: 'Marie-Christelle Ramsamy-Appadoo', grade: 5 });
      Auth.getStudents = () => [];
      // The cached aggregate a real child would have. Chapter ids are read
      // from the live pack so this cannot drift with the content.
      const pack = SUBJECT_PACKS.find(p => p.id === 'grade5-maths');
      const chs = (pack._chapters || pack.chapters).map(c => c.id);
      const rows = chs.slice(0, 4).map((id, i) => ({
        pack_id: 'grade5-maths', chapter_id: id,
        explored: 30 + i, secure: 20 + i, improved: 1, needs: 4, legacy: 0,
        attempts: 40 + i, correct: 24 + i, last_at: '2026-09-20T09:00:00Z',
      }));
      localStorage.setItem('psac_cert_prog_v1_cert-test-kid', JSON.stringify({ at: Date.now(), rows }));
      await Certificates.render();
      const host = document.getElementById('cert-body');
      const cards = [...host.querySelectorAll('.cert-card')];
      const maths = cards.find(c => /Math/i.test(c.querySelector('.cert-card-title').textContent));
      return {
        cards: cards.length,
        titles: cards.map(c => c.querySelector('.cert-card-title').textContent.trim()),
        thumbs: host.querySelectorAll('.cert-thumb svg').length,
        stale: !!host.querySelector('.cert-stale'),
        mathsTier: maths ? maths.querySelector('.cert-card-tier').textContent.trim() : null,
        mathsNum: maths ? maths.querySelector('.cert-card-num').textContent.replace(/\\s+/g, ' ').trim() : null,
        docScroll: document.documentElement.scrollWidth, win: window.innerWidth,
        subject: Certificates.subject(),
      };
    })()`);
    ok('the screen paints a card for every live subject of the grade',
       painted && painted.cards >= 5, painted && { cards: painted.cards, titles: painted.titles });
    ok('every card carries its certificate artwork',
       painted && painted.thumbs === painted.cards, painted && { thumbs: painted.thumbs, cards: painted.cards });
    ok('a subject with no progress still gets a card',
       painted && painted.cards > 1 && painted.titles.length === painted.cards);
    ok('an un-reachable server is reported, not rendered as zero progress',
       painted && painted.stale === true, painted && { stale: painted.stale });
    ok('the practised subject shows a real level',
       painted && painted.mathsTier && !/Not started/.test(painted.mathsTier), painted && painted.mathsTier);
    ok('the practised subject shows mastered-of-total',
       painted && /of [\d,]+ questions mastered/.test(painted.mathsNum || ''), painted && painted.mathsNum);
    ok('the painted screen does not scroll sideways at 390px',
       painted && painted.docScroll <= painted.win + 1,
       painted && { scrollWidth: painted.docScroll, innerWidth: painted.win });

    // The viewer and the info sheet, opened the way a child opens them.
    const opened = await ev(`(() => {
      Certificates.view('grade5-maths');
      const host = document.getElementById('modal-certificate');
      const svg = host.querySelector('#cert-view-body svg');
      const acts = [...host.querySelectorAll('#cert-view-body .cert-btn')].map(b => b.textContent.trim());
      const shown = !host.classList.contains('hidden');
      Certificates.info('grade5-maths');
      const ih = document.getElementById('modal-certificate-info');
      const body = ih.querySelector('#cert-info-body');
      const r = {
        viewerShown: shown, viewerHasArtwork: !!svg, actions: acts,
        infoShown: !ih.classList.contains('hidden'),
        infoRows: body.querySelectorAll('.cert-table tbody tr').length,
        infoStats: body.querySelectorAll('.cert-stats > div').length,
        hasNext: !!body.querySelector('.cert-next'),
        disclaimer: (body.querySelector('.cert-disclaim') || {}).textContent || '',
        tableScrolls: getComputedStyle(body.querySelector('.cert-table')).overflowX,
        docScroll: document.documentElement.scrollWidth, win: window.innerWidth,
      };
      Certificates.close();
      return r;
    })()`);
    ok('the viewer opens with the certificate in it',
       opened && opened.viewerShown && opened.viewerHasArtwork, opened);
    ok('the viewer offers share, image, PDF and more info',
       opened && opened.actions.length === 4, opened && opened.actions);
    ok('"More info" opens', opened && opened.infoShown);
    ok('"More info" lists every chapter', opened && opened.infoRows >= 15, opened && { rows: opened.infoRows });
    ok('"More info" shows the six headline numbers', opened && opened.infoStats === 6, opened && opened.infoStats);
    ok('"More info" says what the next level needs', opened && opened.hasNext);
    ok('"More info" repeats the disclaimer',
       opened && /Mauritius Examinations Syndicate/.test(opened.disclaimer));
    // ⚠ The chapter table is the one thing here that can be wider than a phone.
    ok('the chapter table scrolls on its own', opened && opened.tableScrolls === 'auto', opened && opened.tableScrolls);
    ok('opening the sheets does not scroll the page sideways',
       opened && opened.docScroll <= opened.win + 1, opened && { s: opened.docScroll, w: opened.win });

    // ── the Fix button must actually DO something ─────────────────
    //  WARNING - REPORTED AS 'I click and nothing happens'. Two faults, both
    //  silent:
    //   1. PracticeJourney picks its set from QuestionProgress.forChapter(),
    //      a LOCAL CACHE that only loadChapter() fills. The chapter screens
    //      fill it on the way in; this entry point did not, so every question
    //      bucketed as 'unseen', 'needs' was empty, and a Fix tap selected
    //      nothing. Measured: 12 eligible, 0 progress rows.
    //   2. The empty state then wrote its explanation into the options
    //      sheet's body - correct for every OTHER caller, all of which open
    //      that sheet first - so 241 characters landed in a hidden element
    //      and the button read as dead.
    const fixbtn = await ev(`(async () => {
      _isParentContext = () => false;
      const CH = 'fixprobe-ch';
      // a known bank, so the question supply is not the variable
      for (let i = 1; i <= 12; i++) {
        STATIC_QUESTIONS.push({ id: 'fixprobe-' + i, chapterId: CH, difficulty: 1, type: 'mcq',
          question: 'Q' + i, options: ['a', 'b', 'c', 'd'], answer: 'a' });
      }
      const sheet = document.getElementById('modal-practice-options');
      const body  = document.getElementById('pj-sheet-body');
      const out = {};

      // (a) the old shape: ask to fix with nothing marked wrong, sheet closed.
      sheet.classList.add('hidden');
      body.innerHTML = '';
      window.__toasts = [];
      const realToast = window.toast;
      window.toast = (m) => { window.__toasts.push(String(m)); };
      PracticeJourney.start(CH, 'fix');
      out.hiddenSheetWrote = body.innerHTML.length;
      out.hiddenSheetToast = window.__toasts.slice();

      // (b) the button's own route, with the progress load stubbed to mark one
      //     question as needing practice - what the server would really say.
      window.__loadedChapters = [];
      const realLoad = QuestionProgress.loadChapter;
      QuestionProgress.loadChapter = async (who, ch) => {
        window.__loadedChapters.push(ch);
        return QuestionProgress.all();
      };
      const realStart = PracticeJourney.start;
      window.__started = [];
      PracticeJourney.start = (ch, mode) => { window.__started.push(ch + ':' + mode); };
      Certificates.records().push({ packId: 'fixprobe-pack', name: 'Probe', grade: 5, locked: false,
        ownGrade: true, chapters: [], tier: Certificates.TIERS[1] });
      window.__toasts = [];
      await Certificates.practise('fixprobe-pack', CH, 'fix');
      out.loadedChapters = window.__loadedChapters.slice();
      out.started = window.__started.slice();
      out.toasts = window.__toasts.slice();


      // (c) the case the button is FOR: a question really is wrong. The mode
      //     must stay 'fix', and the set must be exactly that question.
      const realForChapter = QuestionProgress.forChapter;
      QuestionProgress.forChapter = (ch) => (ch === CH
        ? { 'fixprobe-7': { chapterId: CH, state: 'needs_practice', attempts: 1, correctAttempts: 0,
                            wrongAttempts: 1, consecutiveCorrect: 0, everWrong: true, lastSeenAt: Date.now() } }
        : realForChapter(ch));
      window.__started = []; window.__toasts = [];
      await Certificates.practise('fixprobe-pack', CH, 'fix');
      out.realFixStarted = window.__started.slice();
      out.realFixToasts = window.__toasts.slice();
      // …and what the selector would actually deal for it
      const sel = PracticeSelector.select({ mode: 'fix', questions: PracticeJourney.eligible(CH),
        progress: QuestionProgress.forChapter(CH), size: 20, rng: Math.random });
      out.realFixSet = sel.ids.slice();
      QuestionProgress.forChapter = realForChapter;

      PracticeJourney.start = realStart;
      QuestionProgress.loadChapter = realLoad;
      window.toast = realToast;
      return out;
    })()`);

    // 1. the root cause: the chapter's per-question progress is fetched
    ok('the Fix route loads that chapter\u2019s per-question progress',
       fixbtn && fixbtn.loadedChapters.includes('fixprobe-ch'), fixbtn && fixbtn.loadedChapters);
    // 2. it always starts SOMETHING - never a dead tap
    ok('the Fix route always starts a set', fixbtn && fixbtn.started.length === 1, fixbtn && fixbtn.started);
    // 3. with nothing wrong to fix it falls back, and says why
    ok('with nothing to fix it falls back to a practice set',
       fixbtn && fixbtn.started[0] === 'fixprobe-ch:smart', fixbtn && fixbtn.started);
    ok('and explains the fallback instead of failing silently',
       fixbtn && fixbtn.toasts.some(t => /nothing left to fix/i.test(t)), fixbtn && fixbtn.toasts);
    // 4. the hardening: an empty state with the sheet closed toasts
    ok('an empty set with the options sheet closed speaks up',
       fixbtn && fixbtn.hiddenSheetToast.length > 0, fixbtn && fixbtn.hiddenSheetToast);
    ok('and writes nothing into the hidden sheet',
       fixbtn && fixbtn.hiddenSheetWrote === 0, fixbtn && { wrote: fixbtn.hiddenSheetWrote });
    // 5. and the case the button exists for: a real wrong answer waiting.
    ok('with a wrong answer waiting the mode stays "fix"',
       fixbtn && fixbtn.realFixStarted[0] === 'fixprobe-ch:fix', fixbtn && fixbtn.realFixStarted);
    ok('and it does not explain a fallback that did not happen',
       fixbtn && !fixbtn.realFixToasts.some(t => /nothing left to fix/i.test(t)), fixbtn && fixbtn.realFixToasts);
    ok('the fix set is exactly the question that was wrong',
       fixbtn && fixbtn.realFixSet.length === 1 && fixbtn.realFixSet[0] === 'fixprobe-7',
       fixbtn && fixbtn.realFixSet);
    // ── 'where do I go to get that one point back?' ────────────────
    //  The case this section exists for, in the words it was reported in: a
    //  child who has done 89 of 90 questions in one chapter and got one wrong
    //  should not have to hunt for it. The full table used to be the only view
    //  and was sorted by the MOST remaining, so that chapter - the single
    //  cheapest point in the whole subject - was the LAST row on the screen.
    const worknext = await ev(`(async () => {
      _isParentContext = () => false;
      Auth.getActiveAccount = () => ({ id: 'wn-kid', name: 'Devi', grade: 5 });
      Auth.getStudents = () => [];
      DB.restrictions = Object.assign({}, DB.restrictions, { allowedGrades: [] });
      if (typeof SUBJECT_QUESTION_COUNTS === 'undefined') {
        await new Promise((res, rej) => { const t = document.createElement('script');
          t.src = 'subjects/_counts.js'; t.onload = res; t.onerror = rej; document.head.appendChild(t); });
      }
      const counts = SUBJECT_QUESTION_COUNTS['grade5-maths'];
      const ids = Object.keys(counts);
      const sizeOf = id => counts[id].reduce((a, b) => a + b, 0);
      // One chapter one question short, with that question WRONG; one three
      // short with nothing wrong; every other chapter untouched.
      const nearly = ids.find(id => sizeOf(id) > 40);
      const second = ids.find(id => id !== nearly && sizeOf(id) > 40);
      const rows = [
        { pack_id: 'grade5-maths', chapter_id: nearly, explored: sizeOf(nearly), secure: sizeOf(nearly) - 1,
          improved: 0, needs: 1, legacy: 0, attempts: sizeOf(nearly) + 4, correct: sizeOf(nearly) - 1,
          last_at: '2026-09-20T09:00:00Z' },
        { pack_id: 'grade5-maths', chapter_id: second, explored: sizeOf(second) - 3, secure: sizeOf(second) - 3,
          improved: 0, needs: 0, legacy: 0, attempts: sizeOf(second), correct: sizeOf(second) - 3,
          last_at: '2026-09-20T09:00:00Z' },
      ];
      localStorage.setItem('psac_cert_prog_v1_wn-kid', JSON.stringify({ at: Date.now(), rows }));
      await Certificates.render(undefined, 'cert-body');
      Certificates.info('grade5-maths');
      const body = document.getElementById('cert-info-body');
      const items = [...body.querySelectorAll('.cert-fx')].map(li => ({
        name: ((li.querySelector('.cert-fx-name') || {}).textContent || '').trim(),
        sub:  ((li.querySelector('.cert-fx-sub') || {}).textContent || '').replace(/\\s+/g, ' ').trim(),
        btn:  ((li.querySelector('.cert-fx-go') || {}).textContent || '').trim(),
        call: (li.querySelector('.cert-fx-go') || {}).outerHTML || '',
      }));
      const firstTableRow = ((body.querySelector('.cert-table tbody tr') || {}).textContent || '')
        .replace(/\\s+/g, ' ').trim();
      return { nearly, second, items, firstTableRow };
    })()`);

    ok('the nearly-finished chapter is the FIRST thing offered',
       worknext && worknext.items.length > 0 && worknext.items[0].call.includes(worknext.nearly),
       worknext && worknext.items.map(i => i.name + ' | ' + i.sub));
    ok('it says one question is left',
       worknext && /^1 question left/.test(worknext.items[0].sub), worknext && worknext.items[0].sub);
    ok('it names the wrong answer waiting',
       worknext && /1 to fix/.test(worknext.items[0].sub), worknext && worknext.items[0].sub);
    // The button goes to the FIX set, not to a fresh 20-question round.
    ok('the button offers to fix exactly that one question',
       worknext && worknext.items[0].btn === 'Fix 1 \u2192', worknext && worknext.items[0].btn);
    ok('the button starts the fix set for that chapter',
       worknext && worknext.items[0].call.indexOf('Certificates.practise(') >= 0
                && worknext.items[0].call.indexOf("'fix'") >= 0,
       worknext && worknext.items[0].call);
    ok('the three-short chapter comes next, not before',
       worknext && worknext.items[1] && worknext.items[1].call.includes(worknext.second)
                && /^3 questions left/.test(worknext.items[1].sub),
       worknext && worknext.items.slice(0, 2).map(i => i.sub));
    ok('an untouched chapter offers plain practice, not a fix',
       worknext && worknext.items.slice(2).every(i => i.btn === 'Practise \u2192'),
       worknext && worknext.items.slice(2).map(i => i.btn));
    // The full table is ordered the same way, so the two views agree.
    ok('the full table leads with the same chapter',
       worknext && worknext.firstTableRow.includes('1 left'), worknext && worknext.firstTableRow);
    // ── two renders in flight at once ────────────────────────────
    //  WARNING - THE DEFECT THIS EXISTS FOR: Certificates.open() called
    //  showScreen('certificates'), and the render dispatch at the foot of
    //  showScreen() calls render() as well. Both awaited the same rpc and both
    //  pushed into one shared array, so a child tapping My Certificates saw
    //  EVERY SUBJECT TWICE and a summary reading '2 of 10 Grade 5 subjects
    //  started - 850 questions mastered' for 5 subjects and 425. It failed
    //  silently and it was timing-dependent, which is the worst combination.
    const reentrant = await ev(`(async () => {
      _isParentContext = () => false;
      Auth.getActiveAccount = () => ({ id: 'xg-kid', name: 'Devi', grade: 5 });
      Auth.getStudents = () => [];
      DB.restrictions = Object.assign({}, DB.restrictions, { allowedGrades: [6] });
      // The same three packs the cross-grade block uses: 5 own-grade subjects
      // plus two started elsewhere = 7 cards when drawn ONCE.
      const rowsFor = (pid, n) => {
        const pack = SUBJECT_PACKS.find(p => p.id === pid);
        return (pack._chapters || pack.chapters).slice(0, n).map(c => ({
          pack_id: pid, chapter_id: c.id, explored: 30, secure: 25, improved: 1,
          needs: 3, legacy: 0, attempts: 40, correct: 27, last_at: '2026-09-20T09:00:00Z' }));
      };
      localStorage.setItem('psac_cert_prog_v1_xg-kid', JSON.stringify({ at: Date.now(),
        rows: [].concat(rowsFor('grade5-maths', 6), rowsFor('grade6-maths', 8), rowsFor('grade4-french', 3)) }));
      const host = document.getElementById('cert-body');

      // 1. the real route a child takes: the board note calls open().
      Certificates.open();
      await new Promise(r => setTimeout(r, 900));
      const viaOpen = host.querySelectorAll('.cert-card').length;
      const openSummary = ((host.querySelector('.cert-summary') || {}).textContent || '').replace(/\\s+/g, ' ').trim();

      // 2. the blunt version: two renders started together.
      await Promise.all([Certificates.render(undefined, 'cert-body'),
                         Certificates.render(undefined, 'cert-body')]);
      await new Promise(r => setTimeout(r, 400));
      const viaRace = host.querySelectorAll('.cert-card').length;

      // 3. and a burst, the way a stabbed Refresh button behaves.
      Certificates.render(undefined, 'cert-body');
      Certificates.render(undefined, 'cert-body');
      await Certificates.render(undefined, 'cert-body');
      await new Promise(r => setTimeout(r, 400));
      const viaBurst = host.querySelectorAll('.cert-card').length;

      return { viaOpen, viaRace, viaBurst, openSummary,
               records: Certificates.records().length,
               onScreen: !document.getElementById('screen-certificates').classList.contains('hidden') };
    })()`);

    ok('open() lands on the certificates screen', reentrant && reentrant.onScreen, reentrant);
    ok('open() draws each subject once, not twice',
       reentrant && reentrant.viaOpen === 6, reentrant && { cards: reentrant.viaOpen });
    ok('the summary after open() counts the own grade once',
       reentrant && /1 of 5 Grade 5 subjects started/.test(reentrant.openSummary || ''),
       reentrant && reentrant.openSummary);
    ok('two renders racing draw one set of cards',
       reentrant && reentrant.viaRace === 6, reentrant && { cards: reentrant.viaRace });
    ok('a burst of renders draws one set of cards',
       reentrant && reentrant.viaBurst === 6, reentrant && { cards: reentrant.viaBurst });
    ok('the record list never accumulates',
       reentrant && reentrant.records === 7, reentrant && { records: reentrant.records });
    // ── a child practising OUTSIDE their own grade ───────────────────
    //  A parent can unlock extra grades (GradeAccess: own grade, plus
    //  restrictions.allowedGrades) and a child who stretches upward earns a
    //  real certificate there.
    //  WARNING - THE DEFECT THIS EXISTS FOR: two packs can share a NAME across
    //  grades. A Grade 5 child who has practised Grade 6 Maths saw TWO cards
    //  both titled 'Mathematics', distinguished only inside the certificate
    //  thumbnail at about four pixels tall. Measured, not reasoned about.
    const cross = await ev(`(async () => {
      _isParentContext = () => false;
      Auth.getActiveAccount = () => ({ id: 'xg2-kid', name: 'Devi', grade: 5 });
      Auth.getStudents = () => [];
      DB.restrictions = Object.assign({}, DB.restrictions, { allowedGrades: [6] });
      const rowsFor = (pid, n, when) => {
        const pack = SUBJECT_PACKS.find(p => p.id === pid);
        return (pack._chapters || pack.chapters).slice(0, n).map(c => ({
          pack_id: pid, chapter_id: c.id, explored: 30, secure: 25, improved: 1,
          needs: 3, legacy: 0, attempts: 40, correct: 27, last_at: when }));
      };
      // own grade, an UNLOCKED higher grade practised TODAY, and a grade the
      // parent has revoked, last touched months ago.
      const rows = [].concat(rowsFor('grade5-maths', 6, '2026-09-20T09:00:00Z'),
                             rowsFor('grade6-maths', 8, '2026-09-21T08:00:00Z'),
                             rowsFor('grade4-french', 3, '2026-05-02T09:00:00Z'));
      localStorage.setItem('psac_cert_prog_v1_xg2-kid', JSON.stringify({ at: Date.now(), rows }));
      await Certificates.render(undefined, 'cert-body');
      const host = document.getElementById('cert-body');
      const grids = [...host.querySelectorAll('.cert-grid')];
      const card = el => ({
        title: el.querySelector('.cert-card-title').textContent.replace(/\\s+/g, ' ').trim(),
        grade: (el.querySelector('.cert-card-grade') || {}).textContent || null,
        next:  el.querySelector('.cert-card-next').textContent.replace(/\\s+/g, ' ').trim(),
      });
      return {
        grids: grids.length,
        heading: (host.querySelector('.cert-group-h') || {}).textContent || null,
        summary: (host.querySelector('.cert-summary') || {}).textContent.replace(/\\s+/g, ' ').trim(),
        ownCards: grids[0] ? [...grids[0].querySelectorAll('.cert-card')].map(card) : [],
        otherCards: grids[1] ? [...grids[1].querySelectorAll('.cert-card')].map(card) : [],
        tabs: [...host.querySelectorAll('.cert-gradetab')].map(b => b.textContent.replace(/\\s+/g, ' ').trim()),
        tabOn: (host.querySelector('.cert-gradetab.is-on') || {}).textContent || null,
        // Each tab, read in turn, so no assertion depends on which one opened.
        tabCards: (() => {
          const out = {};
          for (const g of [4, 6]) {
            Certificates.otherTab(g);
            const grid = [...document.getElementById('cert-body').querySelectorAll('.cert-grid')][1];
            out[g] = grid ? [...grid.querySelectorAll('.cert-card')].map(card) : [];
          }
          return out;
        })(),
        records: Certificates.records().map(r => ({ id: r.packId, g: r.grade, own: r.ownGrade, locked: r.locked })),
      };
    })()`);

    ok('own-grade and other-grade certificates are in separate groups',
       cross && cross.grids === 2 && /Other grades/i.test(cross.heading || ''), cross && { grids: cross.grids, heading: cross.heading });
    ok('every own-grade subject is shown',
       cross && cross.ownCards.length === 5, cross && cross.ownCards.map(c => c.title));
    ok('other grades get a tab each', cross && cross.tabs.length === 2, cross && cross.tabs);
    // WARNING: one grade at a time. A child who has practised three other
    // grades would otherwise scroll past two dozen full-size certificates.
    ok('only the chosen grade is drawn', cross && cross.otherCards.length === 1, cross && cross.otherCards.map(c => c.title));
    // The most RECENTLY practised grade opens, not the numerically smallest:
    // both rows carry the same last_at here, so grade 6 wins on order.
    ok('the tab strip counts what is behind each tab',
       cross && cross.tabs.every(t => /Grade \d 1/.test(t)), cross && cross.tabs);
    // WARNING: the MOST RECENTLY practised grade opens, not the lowest. Grade 6
    // was practised today here and Grade 4 months ago.
    ok('the most recently practised grade opens first',
       cross && /Grade 6/.test(cross.tabOn || ''), cross && cross.tabOn);
    ok('switching grade redraws that grade',
       cross && cross.tabCards[4].length === 1 && /Grade 4/.test(cross.tabCards[4][0].grade || '')
             && cross.tabCards[6].length === 1 && /Grade 6/.test(cross.tabCards[6][0].grade || ''),
       cross && { g4: cross.tabCards[4].map(c => c.grade), g6: cross.tabCards[6].map(c => c.grade) });
    // The assertion that matters: no own-grade card wears a grade chip, and
    // every other-grade card does.
    ok('own-grade cards carry no grade chip',
       cross && cross.ownCards.every(c => !c.grade), cross && cross.ownCards.filter(c => c.grade));
    ok('every other-grade card names its grade on the card itself',
       cross && cross.otherCards.every(c => /Grade \d/.test(c.grade || '')), cross && cross.otherCards.map(c => c.grade));
    ok('two subjects sharing a name are told apart',
       cross && (() => {
         const all = cross.ownCards.concat(cross.otherCards).map(c => c.title);
         return new Set(all).size === all.length;
       })(), cross && cross.ownCards.concat(cross.otherCards).map(c => c.title));
    // The denominator is the child's OWN grade: a cross-grade pack is only here
    // BECAUSE it was started, so counting it inflates both halves.
    ok('the summary counts the own grade, and names it',
       cross && /1 of 5 Grade 5 subjects started/.test(cross.summary || ''), cross && cross.summary);
    ok('the summary reports the other grades separately',
       cross && /2 from other grades/.test(cross.summary || ''), cross && cross.summary);
    // A grade the parent has since revoked keeps its certificate, but must not
    // nag the child toward a level they cannot currently practise for.
    ok('a revoked grade is marked locked, an unlocked one is not',
       cross && (() => {
         const by = Object.fromEntries(cross.records.map(r => [r.id, r]));
         return by['grade4-french'] && by['grade4-french'].locked === true
             && by['grade6-maths'] && by['grade6-maths'].locked === false
             && by['grade5-maths'] && by['grade5-maths'].own === true;
       })(), cross && cross.records.filter(r => !r.own));
    ok('a locked grade says so instead of nudging',
       cross && cross.tabCards[4].some(c => /not unlocked right now/i.test(c.next)),
       cross && cross.tabCards[4].map(c => c.next));
    ok('an unlocked other grade still shows the next level',
       cross && cross.tabCards[6].some(c => /more to reach/i.test(c.next)),
       cross && cross.tabCards[6].map(c => c.next));
    // ── the parent dashboard tab, and the handover after it ─────────────
    //  ⚠ THE REGRESSION THIS EXISTS FOR: PD._mountPanel() — how the shop and
    //    the calendar panels are built — MOVES a screen's markup into the
    //    dashboard permanently. Used here it would empty the child's own
    //    My Certificates screen the moment a parent looked at the tab, and
    //    switching to student mode never reloads the page, so the child would
    //    find a blank screen with nothing explaining it. The panel therefore
    //    has its own body element. This checks BOTH survive.
    const parent = await ev(`(async () => {
      _isParentContext = () => true;
      // WARNING: THE REAL COLUMN NAMES. Auth.getStudents() returns raw
      //   students rows and there is NO "name" column — it is display_name,
      //   with username as the fallback. This stub used to invent "name", so it
      //   asserted the shape the test expected rather than the shape the
      //   database has, and shipped a screen that called every child "Your
      //   child". A stub that is kinder than production is not a test.
      Auth.getStudents = () => [
        { id: 'cert-test-kid', display_name: 'Marie-Christelle Ramsamy-Appadoo', username: 'marie5', grade: 5, avatar: '👧' },
        { id: 'cert-test-kid2', display_name: 'Anil', username: 'anil4', grade: 4, avatar: '🧒' },
        // display_name is nullable; username is what the app falls back to.
        { id: 'cert-test-kid3', display_name: null, username: 'priya6', grade: 6, avatar: '🧒' },
      ];
      await Certificates.render('cert-test-kid', 'pd-cert-body');
      const panel = document.getElementById('pd-cert-body');
      const screenBody = document.getElementById('cert-body');
      return {
        panelExists: !!panel,
        panelCards: panel ? panel.querySelectorAll('.cert-card').length : -1,
        kidPicker: panel ? panel.querySelectorAll('.cert-kid').length : -1,
        chosen: panel ? (panel.querySelector('.cert-kid.is-on') || {}).textContent : null,
        pickerText: panel ? [...panel.querySelectorAll('.cert-kid')].map(b => b.textContent.trim()).join(' | ') : null,
        certName: panel ? [...panel.querySelectorAll('.cert-thumb svg text')].map(t => t.textContent).join(' | ') : null,
        // the child's own screen must be untouched and still have its body
        screenBodyExists: !!screenBody,
        screenStillHasWarning: !!document.querySelector('#screen-certificates .cert-warn'),
        panelHasWarning: !!document.querySelector('#pd-panel-certificates .cert-warn'),
        subject: Certificates.subject() && Certificates.subject().id,
      };
    })()`);
    // WARNING: a parent must never be handed a button into a kid screen.
    // showScreen() bounces an adult off practice, so the tap would throw them
    // back to their own dashboard with nothing explaining it. The buttons are
    // simply not drawn for them; the ranked list still is, as a read.
    const parentGuard = await ev(`(() => {
      Certificates.info('grade5-maths');
      const body = document.getElementById('cert-info-body');
      const r = {
        rows: body.querySelectorAll('.cert-fx').length,
        buttons: body.querySelectorAll('.cert-fx-go').length,
        note: ((body.querySelector('.cert-note') || {}).textContent || '').replace(/\\s+/g, ' ').trim(),
      };
      Certificates.closeInfo();
      return r;
    })()`);
    ok('a parent still sees the ranked list of where to work',
       parentGuard && parentGuard.rows > 0, parentGuard);
    ok('a parent is given no button into a kid screen',
       parentGuard && parentGuard.buttons === 0, parentGuard);
    ok('and is told to hand the device over instead',
       parentGuard && /hand the device over/i.test(parentGuard.note), parentGuard && parentGuard.note);
    ok('the parent panel paints into its own body',
       parent && parent.panelExists && parent.panelCards >= 5, parent);
    ok('the parent sees a picker for each child', parent && parent.kidPicker === 3, parent && parent.kidPicker);
    // ⚠ The assertions that actually matter: a real name, from the real column.
    ok('a picker chip shows the child\u2019s real name, not a placeholder',
       parent && /Marie-Christelle/.test(parent.pickerText || '') && !/Your child|>Child</.test(parent.pickerText || ''),
       parent && parent.pickerText);
    ok('a child with no display_name falls back to their username',
       parent && /priya6/.test(parent.pickerText || ''), parent && parent.pickerText);
    ok('the certificate itself carries the child\u2019s real name',
       parent && /Marie-Christelle/.test(parent.certName || '') , parent && parent.certName);
    ok('the chosen child is the one the dashboard has in focus',
       parent && /Marie-Christelle/.test(parent.chosen || ''), parent && parent.chosen);
    ok('the parent panel repeats the warning', parent && parent.panelHasWarning);
    ok('the child\u2019s own screen still has its body element', parent && parent.screenBodyExists, parent);
    ok('the child\u2019s own screen still carries its warning', parent && parent.screenStillHasWarning, parent);

    // …and the child can still open their own screen after the parent looked.
    const afterHandover = await ev(`(async () => {
      _isParentContext = () => false;
      await Certificates.render(undefined, 'cert-body');
      const b = document.getElementById('cert-body');
      return { cards: b ? b.querySelectorAll('.cert-card').length : -1,
               picker: b ? b.querySelectorAll('.cert-kid').length : -1 };
    })()`);
    ok('the child still gets their certificates after a parent viewed them',
       afterHandover && afterHandover.cards >= 5, afterHandover);
    ok('the child is never shown a child picker',
       afterHandover && afterHandover.picker === 0, afterHandover);

    // ── nothing on the page threw ────────────────────────────────────────
    const errs = await ev(`(window.__errs || []).slice(0, 5)`);
    ok('no page errors collected', !errs || !errs.length, errs);

  } catch (e) {
    failed++;
    console.log('FAIL harness -- ' + (e && e.message));
  } finally {
    try { ws.close(); } catch (_) {}
    try { chrome.kill(); } catch (_) {}
    server.close();
  }

  console.log(`\ncertificate render: ${checks} passed, ${failed} failed`);
  process.exit(failed ? 1 : 0);
})();
