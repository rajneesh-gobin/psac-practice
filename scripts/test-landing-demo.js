'use strict';
// The landing-page demo, in a real browser.
//
// Run: node scripts/test-landing-demo.js
//
// ⚠ WHY A BROWSER. Every claim here is about what a stranger actually sees:
//   the catalogue is rendered at runtime from SUBJECT_PACKS, the question card
//   is written by innerHTML long after the Tailwind CDN has scanned the page,
//   and the one invariant that matters most — that none of this records
//   anything — can only be observed by running it.
// ⚠ Fresh Chrome profile + service-worker bypass + cache disabled, or a stale
//   shell measures the PREVIOUS engine/demo.js and reports a fix that never
//   landed.
const http = require('http');
const fs   = require('fs');
const path = require('path');
const os   = require('os');
const { spawn } = require('child_process');

const ROOT   = path.resolve(__dirname, '..');
const PORT   = 8799;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

let checks = 0, fails = 0;
const ok = (label, cond, extra) => {
  checks++;
  if (cond) { console.log('  ok    ' + label); return; }
  fails++;
  console.log('  FAIL  ' + label + (extra ? '\n          ' + extra : ''));
};

const MIME = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css',
  '.json':'application/json', '.svg':'image/svg+xml', '.png':'image/png',
  '.jpg':'image/jpeg', '.webmanifest':'application/manifest+json', '.ico':'image/x-icon' };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404); res.end('not found'); return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream',
                       'Cache-Control': 'no-store' });
  fs.createReadStream(file).pipe(res);
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function getJson(url) {
  return new Promise((res, rej) => {
    http.get(url, (r) => { let b = ''; r.on('data', (c) => { b += c; }); r.on('end', () => res(JSON.parse(b))); })
      .on('error', rej);
  });
}

(async function () {
  await new Promise((r) => server.listen(PORT, '127.0.0.1', r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-demo-'));
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=9343',
    '--user-data-dir=' + profile, '--no-first-run', '--no-default-browser-check',
    '--disable-gpu', '--window-size=420,900', 'about:blank'], { stdio: 'ignore' });

  let ver = null;
  for (let i = 0; i < 80 && !ver; i++) {
    try { ver = await getJson('http://127.0.0.1:9343/json/version'); } catch (_) { await sleep(250); }
  }
  if (!ver) throw new Error('Chrome never came up');

  const ws = new globalThis.WebSocket(ver.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 0;
  const pending = new Map();
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const q = pending.get(m.id); pending.delete(m.id);
      if (m.error) q.reject(new Error(m.error.message)); else q.resolve(m.result);
    }
  };
  const send = (method, params, sessionId) => {
    const mid = ++id;
    return new Promise((resolve, reject) => {
      const t = setTimeout(() => { pending.delete(mid); reject(new Error('CDP timeout: ' + method)); }, 25000);
      pending.set(mid, { resolve: (r) => { clearTimeout(t); resolve(r); },
                         reject: (e) => { clearTimeout(t); reject(e); } });
      ws.send(JSON.stringify({ id: mid, method, params: params || {}, sessionId }));
    });
  };

  const t1 = await send('Target.createTarget', { url: 'about:blank' });
  const t2 = await send('Target.attachToTarget', { targetId: t1.targetId, flatten: true });
  const S  = (m, p) => send(m, p, t2.sessionId);
  const js = async (expr) => (await S('Runtime.evaluate',
    { expression: expr, returnByValue: true, awaitPromise: true })).result.value;

  await S('Page.enable'); await S('Runtime.enable'); await S('Network.enable');
  await S('Network.setCacheDisabled', { cacheDisabled: true });
  for (const dom of ['Network.setBypassServiceWorker', 'Page.setBypassServiceWorker']) {
    try { await S(dom, { bypass: true }); break; } catch (_) {}
  }
  await S('Emulation.setDeviceMetricsOverride', { width: 412, height: 900, deviceScaleFactor: 1, mobile: true });
  await S('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/index.html' });

  // Wait for the demo to paint its first question rather than sleeping blind.
  let ready = false;
  for (let i = 0; i < 40 && !ready; i++) {
    await sleep(500);
    ready = await js('!!document.querySelector("#demo-card .demo-opt")');
  }

  console.log('\n══ the demo renders ══');
  ok('a question card painted with options', ready);
  if (!ready) {
    const why = await js('document.getElementById("demo-card") ? document.getElementById("demo-card").textContent.trim().slice(0,200) : "NO #demo-card"');
    console.log('          #demo-card said: ' + why);
  }

  // ── the picker ────────────────────────────────────────────────────────────
  const gradeInfo = await js(`(() => {
    const live = SUBJECT_PACKS.filter(p => !p.comingSoon);
    const want = [...new Set(live.map(p => p.grade))].sort((a,b)=>a-b);
    const rows = [...document.querySelectorAll('[data-demo-grades]')];
    const got  = [...rows[0].querySelectorAll('.demo-grade-chip')]
      .map(b => Number((b.textContent.match(/G(\\d+)/)||[])[1]));
    return { want, got, rows: rows.length, on: rows[0].querySelectorAll('.is-on').length,
             allRowsSame: rows.every(r => r.querySelectorAll('.demo-grade-chip').length === got.length) };
  })()`);
  ok('a chip for every live grade, in order',
    JSON.stringify(gradeInfo.want) === JSON.stringify(gradeInfo.got),
    'want ' + JSON.stringify(gradeInfo.want) + ' got ' + JSON.stringify(gradeInfo.got));
  ok('exactly one grade is selected', gradeInfo.on === 1, 'selected: ' + gradeInfo.on);
  ok('every picker row renders the same grades', gradeInfo.allRowsSame, 'rows: ' + gradeInfo.rows);

  // ── comingSoon never reaches a parent ─────────────────────────────────────
  const soon = await js(`(() => {
    const cs = SUBJECT_PACKS.filter(p => p.comingSoon);
    const txt = (document.getElementById('demo')||{}).textContent || '';
    // Only meaningful for a comingSoon pack of the grade being shown.
    const here = cs.filter(p => p.grade === Demo.grade()).map(p => p.subject || p.name);
    return { csPacks: cs.length, shown: here.filter(n => txt.includes(n)) };
  })()`);
  ok('comingSoon packs exist to be filtered (guard is live)', soon.csPacks > 0,
    'none found — this check proves nothing until one exists');
  ok('no comingSoon subject is offered', soon.shown.length === 0, JSON.stringify(soon.shown));

  // ── subject list matches the registry ─────────────────────────────────────
  const subs = await js(`(() => {
    const g = Demo.grade();
    const packs = SUBJECT_PACKS.filter(p => p.grade === g && !p.comingSoon);
    const chips = [...document.querySelectorAll('#demo-subjects .demo-subj')];
    return { packs: packs.length, chips: chips.length,
             names: chips.map(c => c.querySelector('.demo-subj-n').textContent.trim()),
             want: packs.map(p => p.subject || p.name).sort(),
             on: document.querySelectorAll('#demo-subjects .is-on').length };
  })()`);
  ok('one subject chip per live pack of the grade', subs.chips === subs.packs,
    subs.chips + ' chips for ' + subs.packs + ' packs');
  ok('the subject names come from the registry',
    JSON.stringify([...subs.names].sort()) === JSON.stringify(subs.want),
    JSON.stringify(subs.names));
  ok('exactly one subject is selected', subs.on === 1, 'selected: ' + subs.on);

  // ── chapters: EVERY declared one listed, only the open ones clickable ─────
  const chs = await js(`(() => {
    const p = SUBJECT_PACKS.find(x => x.id === Demo.subject());
    const declared = (p._chapters || p.chapters || []);
    const rows = [...document.querySelectorAll('#demo-chapters .demo-ch')];
    const open = rows.filter(r => r.classList.contains('is-open'));
    const shut = rows.filter(r => r.classList.contains('is-shut'));
    return {
      declared: declared.length, rows: rows.length,
      open: open.length, shut: shut.length,
      openAreButtons: open.every(r => r.tagName === 'BUTTON'),
      shutAreNotButtons: shut.every(r => r.tagName !== 'BUTTON'),
      order: rows.map(r => r.querySelector('.demo-ch-n').textContent.trim()),
      want:  declared.map(c => c.name || c.id),
      openFirst: open.length ? rows.indexOf(open[open.length - 1]) < rows.length : false,
      selected: document.querySelectorAll('#demo-chapters .demo-ch.is-on').length,
    };
  })()`);
  ok('every declared chapter is listed', chs.rows === chs.declared,
    chs.rows + ' rows for ' + chs.declared + ' declared');
  ok('chapters keep the pack\'s declared order',
    JSON.stringify(chs.order) === JSON.stringify(chs.want));
  ok('at most 3 chapters are open', chs.open > 0 && chs.open <= 3, 'open: ' + chs.open);
  ok('open chapters are real buttons', chs.openAreButtons);
  // ⚠ A shut chapter must NOT be a disabled <button>: a disabled control is
  //   skipped by a screen reader and invites a tap that does nothing.
  ok('shut chapters are not buttons at all', chs.shutAreNotButtons);
  ok('exactly one chapter is selected', chs.selected === 1, 'selected: ' + chs.selected);

  const shutClick = await js(`(() => {
    const row = document.querySelector('#demo-chapters .demo-ch.is-shut');
    if (!row) return 'no shut chapter';
    const before = Demo.chapter();
    const id = [...(SUBJECT_PACKS.find(x => x.id === Demo.subject())._chapters || [])]
      .map(c => c.id).find(cid => !document.querySelector('#demo-chapters .demo-ch.is-open'));
    Demo.setChapter('definitely-not-a-chapter');
    return Demo.chapter() === before ? 'held' : 'changed';
  })()`);
  ok('setChapter refuses a chapter that is not open', shutClick === 'held', String(shutClick));

  // ── the copy rule: a shut chapter EXISTS ──────────────────────────────────
  const banned = await js(`(() => {
    const zone = (document.getElementById('demo') || {}).textContent.toLowerCase();
    const bad = ['coming soon','not available','unavailable','free until','expires','trial ends'];
    return bad.filter(w => zone.includes(w));
  })()`);
  ok('no "coming soon" / "not available" anywhere in the preview', banned.length === 0,
    'found: ' + JSON.stringify(banned));
  ok('no free-access deadline in the preview copy',
    !banned.includes('free until') && !banned.includes('expires'));
  const promise = await js(`(() => {
    const t = (document.getElementById('demo') || {}).textContent.toLowerCase();
    return { preview: t.includes('this is a preview'),
             unlock: /register free/.test(t),
             progress: /progress/.test(t) };
  })()`);
  ok('the preview says so, at the top', promise.preview);
  ok('the preview offers a free account', promise.unlock);
  ok('the preview says an account tracks progress', promise.progress);

  // ── answering ─────────────────────────────────────────────────────────────
  console.log('\n══ answering ══');
  // ⚠ The one invariant that matters: a stranger tapping a sales demo must
  //   never reach the mastery / mistake / daily figures a parent later reads.
  await js(`(() => {
    window.__guard = { rec: 0, daily: 0, coach: 0, save: 0 };
    for (const [name, key] of [['recordAnswer','rec'], ['_recordDaily','daily']]) {
      const f = window[name];
      window[name] = function () { window.__guard[key]++; return f ? f.apply(this, arguments) : undefined; };
    }
    if (window.LearningCoach && LearningCoach.record) {
      const f = LearningCoach.record.bind(LearningCoach);
      LearningCoach.record = function () { window.__guard.coach++; return f.apply(this, arguments); };
    }
    if (window.Store && Store.saveStudentProgress) {
      const f = Store.saveStudentProgress.bind(Store);
      Store.saveStudentProgress = function () { window.__guard.save++; return f.apply(this, arguments); };
    }
    window.__dbBefore = JSON.stringify(window.DB || null);
    window.__lsBefore = Object.keys(localStorage).sort().join('|');
    return true;
  })()`);

  const answered = await js(`(() => {
    const card = document.getElementById('demo-card');
    const before = card.querySelector('.demo-qcount').textContent.trim();
    const opts = [...card.querySelectorAll('.demo-opt')];
    opts[0].click();
    const after = {
      verdict:  !!card.querySelector('.demo-verdict'),
      explains: (card.querySelector('.demo-verdict-x')||{}).textContent ? true : false,
      marksRight: card.querySelectorAll('.demo-opt.is-right').length === 1,
      disabled: [...card.querySelectorAll('.demo-opt')].every(b => b.disabled),
      nextBtn:  !!card.querySelector('.demo-btn-go'),
      // ⚠ Captured HERE too. The nudge fires once, on the FIRST wrong answer —
      //   which may well be this one. Watching only the later loop made the
      //   check fail whenever question 1 happened to be answered wrongly.
      nudge:    !!card.querySelector('.demo-nudge'),
      before,
    };
    return after;
  })()`);
  ok('picking an option shows a verdict', answered.verdict);
  ok('the explanation is shown, not just right/wrong', answered.explains);
  ok('the correct option is marked exactly once', answered.marksRight);
  ok('options lock after the answer', answered.disabled);
  ok('a Next button appears', answered.nextBtn);

  const advanced = await js(`(() => {
    const card = document.getElementById('demo-card');
    card.querySelector('.demo-btn-go').click();
    return { count: card.querySelector('.demo-qcount') ? card.querySelector('.demo-qcount').textContent.trim() : null,
             fresh: [...card.querySelectorAll('.demo-opt')].every(b => !b.disabled) };
  })()`);
  ok('Next advances to question 2', /^2 \//.test((advanced.count || '').trim()), 'got ' + advanced.count);
  ok('the new question is unanswered', advanced.fresh);

  // ⚠ Answer deliberately WRONG, by reading the right answer out of the deck
  //   and avoiding it. Clicking "the last option" looked equivalent and is not:
  //   makeMCQ shuffles, so the last option is the correct one about a quarter
  //   of the time and this ran green while never once exercising the
  //   wrong-answer nudge it claims to test.
  const finished = await js(`(() => {
    const card = document.getElementById('demo-card');
    const deckOf = () => (window.PSAC_DEMO_DECKS[Demo.grade()].packs[Demo.subject()] || {})[Demo.chapter()] || [];
    let sawNudge = false, guard = 0, asked = 0;
    while (card.querySelector('.demo-opt') && guard++ < 40) {
      const opts = [...card.querySelectorAll('.demo-opt')];
      const right = (deckOf()[asked] || {}).a;
      const wrong = opts.findIndex(b => b.textContent.replace(/^[A-D]/,'').trim() !== String(right || '').replace(/<[^>]*>/g,'').trim());
      opts[wrong >= 0 ? wrong : 0].click();
      asked++;
      if (card.querySelector('.demo-nudge')) sawNudge = true;
      const go = card.querySelector('.demo-btn-go');
      if (!go) break;
      go.click();
    }
    const fin = card.querySelector('.demo-finish');
    return { sawNudge, asked, finished: !!fin,
             score: fin ? (card.querySelector('.demo-finish-score')||{}).textContent : null,
             copy:  fin ? card.textContent.replace(/\\s+/g,' ').trim() : '' };
  })()`);
  ok('a nudge appeared after a wrong answer (earned, not timed)',
    finished.sawNudge || answered.nudge,
    finished.asked + ' questions answered in the loop; first answer nudged: ' + answered.nudge);
  ok('the deck ends on a finish card', finished.finished);
  ok('the finish card shows a score out of the chapter length',
    /^\d+\/\d+$/.test((finished.score || '').trim()), 'score read: ' + finished.score);
  ok('the finish card names the grade chapter total and asks for a free account',
    /one chapter of \d+/i.test(finished.copy) && /[Rr]egister free/.test(finished.copy),
    finished.copy.slice(0, 160));
  ok('the finish card promises progress tracking', /track|progress/i.test(finished.copy));
  ok('the finish card says nothing was saved', /not linked to any account/i.test(finished.copy));

  // ── the deck ──────────────────────────────────────────────────────────────
  // ⚠ Run BEFORE the "nothing is recorded" block below, so the guard installed
  //   further up covers the game slide too. The whole point of a purpose-built
  //   Billionaire preview is that it cannot reach DB.games or the points RPC;
  //   that claim is only worth anything if it is checked after actually playing.
  console.log('\n══ the deck ══');

  const deck = await js(`(() => {
    const track = document.getElementById('demo-track');
    const panes = [...track.children];
    const tabs  = [...document.querySelectorAll('#demo-tabs .demo-tab')];
    return {
      panes: panes.length,
      tabs: tabs.length,
      selected: tabs.filter((t) => t.getAttribute('aria-selected') === 'true').length,
      inert: panes.map((p) => !!p.inert),
      labelled: panes.every((p) => !!p.getAttribute('aria-labelledby')),
      dots: document.querySelectorAll('#demo-dots .demo-dot').length,
    };
  })()`);
  ok('one tab per slide, and a dot for each', deck.tabs === deck.panes && deck.dots === deck.panes,
    JSON.stringify(deck));
  ok('exactly one tab is selected', deck.selected === 1, 'selected: ' + deck.selected);
  ok('every pane is labelled by its tab', deck.labelled);
  // ⚠ Without inert, Tab walks into the off-screen slides and the track scrolls
  //   sideways on its own. Invisible with a mouse, which is why it is asserted.
  ok('every slide but the open one is inert',
    deck.inert.filter((x) => !x).length === 1, JSON.stringify(deck.inert));

  await js(`(() => { Demo.show('play'); return true; })()`);
  await sleep(900);
  const moved = await js(`(() => {
    const track = document.getElementById('demo-track');
    const panes = [...track.children];
    const i = panes.findIndex((p) => !p.inert);
    return {
      slide: Demo.slide(),
      scrolled: track.scrollLeft > 10,
      openIndex: i,
      want: [...document.querySelectorAll('#demo-tabs .demo-tab')]
        .findIndex((t) => t.id === 'demo-tab-play'),
      trackH: Math.round(track.getBoundingClientRect().height),
      paneH: panes.map((p) => Math.ceil(p.scrollHeight)),
      tabOn: (document.querySelector('#demo-tabs .demo-tab.is-on .demo-tab-t') || {}).textContent,
    };
  })()`);
  // ⚠ DERIVED, never hard-coded. This read `openIndex === 1` and `paneH[1]`,
  //   which was true only while Play happened to be the second slide; inserting
  //   one slide above it broke two checks that had nothing to do with the
  //   change. The deck is ordered by the SLIDES registry and that order is
  //   allowed to change.
  ok('Demo.show() opens the slide it names',
    moved.slide === 'play' && moved.openIndex === moved.want,
    JSON.stringify(moved));
  ok('the track actually scrolled to it', moved.scrolled, 'scrollLeft: ' + moved.scrolled);
  ok('the tab strip followed', /play/i.test(moved.tabOn || ''), 'tab: ' + moved.tabOn);
  // ⚠ Sized to the ACTIVE pane, never the tallest. Measured at 390px the
  //   practise slide is ~1120px and the game ~560, so without this the game sat
  //   above half a phone screen of empty board.
  // ⚠ Asserts ONLY that the track matches the OPEN pane. The 'not the tallest'
  //   half used to be , which assumed the practise slide is
  //   always taller than the game — true at 390px, a coin-flip at the suite's
  //   own window width, and the check flapped between runs. The real claim is
  //   asserted once every slide is mounted, further down, where a taller pane is
  //   guaranteed to exist.
  // ⚠ A TOLERANT check here, an exact one further down. Two reasons this one
  //   cannot be exact: it fires ~900ms after a smooth scroll, while the pane is
  //   still settling (the lifeline row rewraps, Caveat arrives); and it compares
  //   the track's getBoundingClientRect().height against a pane's scrollHeight,
  //   which are not the same quantity — scrollHeight's treatment of bottom
  //   padding differs, and .demo-slide carries 1.6rem of it. Measured drift:
  //   930 vs 895. The claim that matters — sized to the OPEN slide and not to
  //   the tallest — is asserted exactly in the "every slide" block, once every
  //   pane is mounted and settled.
  ok('the track is close to the open slide, not to the tallest',
    Math.abs(moved.trackH - moved.paneH[moved.want]) <= 48
      && moved.trackH < Math.max.apply(null, moved.paneH) - 48,
    JSON.stringify({ track: moved.trackH, want: moved.want, panes: moved.paneH }));

  // ⚠ A resize rewrites every offsetLeft while scrollLeft keeps its pixel value,
  //   so the scroll handler finds pane 0 nearest and the tour silently rewinds.
  //   On a phone that is every rotation.
  await js(`(() => { window.dispatchEvent(new Event('resize')); return true; })()`);
  await sleep(500);
  ok('a resize does not rewind the deck', (await js('Demo.slide()')) === 'play');

  // ── the game slide ────────────────────────────────────────────────────────
  console.log('\n══ the game slide ══');

  const bq = await js(`(() => {
    const rungs = [...document.querySelectorAll('#demo-play .bq-rung')];
    const lifes = [...document.querySelectorAll('#demo-play .bq-life')];
    return {
      rungs: rungs.length,
      first: (rungs[0].querySelector('b') || {}).textContent,
      last: (rungs[rungs.length - 1].querySelector('b') || {}).textContent,
      on: rungs.filter((r) => r.classList.contains('now')).length,
      onLabel: (rungs.find((r) => r.classList.contains('now')) || {}).textContent,
      safe: rungs.filter((r) => r.classList.contains('safe')).length,
      lifes: lifes.length,
      openLifes: lifes.filter((l) => !l.classList.contains('bq-life-lock')).length,
      opts: document.querySelectorAll('#demo-play .bq-opt').length,
      chip: (document.querySelector('#demo-play .bq-prize-now') || {}).textContent,
      stage: !!document.querySelector('#demo-play .bq-stage'),
    };
  })()`);
  // ⚠ The ladder is the REAL one, copied from minigame.js. A preview that quotes
  //   different money is simply a lie about the product.
  ok('the ladder is the real twenty rungs', bq.rungs === 20, 'rungs: ' + bq.rungs);
  ok('it climbs upwards — top prize first',
    /1 Billion/.test(bq.first || '') && /Rs 100$/.test((bq.last || '').trim()),
    JSON.stringify({ first: bq.first, last: bq.last }));
  ok('three safe havens, as in the real ladder', bq.safe === 3, 'safe: ' + bq.safe);
  // ⚠ The stage is the REAL game's, class for class. A preview drawn in its own
  //   approximation of the studio is a picture of a product that does not exist.
  ok('the studio is the real .bq-stage, not a lookalike', bq.stage);
  ok('exactly one rung is current, and it is rung 1',
    bq.on === 1 && /Rs 100/.test(bq.onLabel || ''), JSON.stringify({ on: bq.on, label: bq.onLabel }));
  ok('four lifelines, one of them usable', bq.lifes === 4 && bq.openLifes === 1,
    JSON.stringify({ lifes: bq.lifes, open: bq.openLifes }));
  ok('the question carries four options and its prize', bq.opts === 4 && /Rs 100/.test(bq.chip || ''),
    JSON.stringify({ opts: bq.opts, chip: bq.chip }));

  // ⚠ A locked lifeline is a real button, unlike a shut chapter, which is a
  //   listing. A child WILL tap it, and the tap has to answer them.
  const locked = await js(`(() => {
    const shut = document.querySelector('#demo-play .bq-life.bq-life-lock');
    shut.click();
    const note = document.querySelector('#demo-play .demo-bq-note');
    return { note: note ? note.textContent.replace(/\\s+/g, ' ').trim() : '' };
  })()`);
  ok('a locked lifeline explains itself instead of doing nothing',
    /register free/i.test(locked.note), 'note: ' + locked.note.slice(0, 120));

  const fifty = await js(`(() => {
    document.querySelector('#demo-play .bq-life:not(.bq-life-lock)').click();
    const opts = [...document.querySelectorAll('#demo-play .bq-opt')];
    const gone = opts.filter((o) => o.classList.contains('gone'));
    return { gone: gone.length, left: opts.length - gone.length,
             goneDisabled: gone.every((o) => o.disabled) };
  })()`);
  ok('Half & Half takes away exactly two answers', fifty.gone === 2 && fifty.left === 2,
    JSON.stringify(fifty));
  ok('the two it removes cannot be clicked', fifty.goneDisabled);

  // ⚠ The answer is never one of the two it removes. Checked by answering what
  //   is left: one of the two survivors must be the one marked right.
  const played = await js(`(() => {
    const live = [...document.querySelectorAll('#demo-play .bq-opt')].filter((o) => !o.disabled);
    live[0].click();
    const card = document.getElementById('demo-play');
    return {
      right: card.querySelectorAll('.bq-opt.right').length,
      verdict: !!card.querySelector('.demo-bq-verdict'),
      explains: !!(card.querySelector('.demo-bq-verdict-x') || {}).textContent,
    };
  })()`);
  ok('Half & Half never removes the answer', played.right === 1, 'marked right: ' + played.right);
  ok('answering shows a verdict with the explanation', played.verdict && played.explains);

  // Play the remaining rungs out to the wall.
  const finishedBq = await js(`(() => {
    const card = document.getElementById('demo-play');
    let guard = 0, jump = '', gkTier = false;
    while (card.querySelector('.demo-btn-gold') && guard++ < 10) {
      card.querySelector('.demo-btn-gold').click();
      const j = card.querySelector('.demo-bq-jump');
      if (j) jump = j.textContent.replace(/\\s+/g, ' ').trim();
      const tier = card.querySelector('.bq-tier.gk');
      if (tier) gkTier = true;
      const live = [...card.querySelectorAll('.bq-opt')].filter((o) => !o.disabled);
      if (live.length) live[0].click();
      if (card.querySelector('.demo-bq-end')) break;
    }
    const fin = card.querySelector('.demo-bq-end');
    return { finished: !!fin, jump, gkTier,
             copy: fin ? fin.textContent.replace(/\\s+/g, ' ').trim() : '' };
  })()`);
  // ⚠ The jump to rung 16 is LABELLED, never silent: the last five rungs really
  //   are general knowledge, and a preview that skipped there quietly would be
  //   claiming the ladder is easier than it is.
  ok('the jump to the general-knowledge rungs is labelled',
    /rung 16/i.test(finishedBq.jump) && /general knowledge/i.test(finishedBq.jump),
    'jump: ' + finishedBq.jump.slice(0, 120));
  // ⚠ The real game labels a general-knowledge question with .bq-tier.gk. The
  //   preview's third rung comes from that same bank, so it must carry it too.
  ok('the general-knowledge rung is labelled as one', finishedBq.gkTier);
  ok('the game ends on a wall, not a dead end', finishedBq.finished);
  ok('the wall names the real top prize and asks for a free account',
    /1 Billion/.test(finishedBq.copy) && /register free/i.test(finishedBq.copy),
    finishedBq.copy.slice(0, 160));
  ok('the wall says nothing was saved', /no score, no account/i.test(finishedBq.copy),
    finishedBq.copy.slice(0, 160));

  // ⚠ THE COPY RULE IS PER PAGE, and the check further up ran when only slide
  //   one had ever been rendered — every slide mounted later went unexamined.
  //   Re-read the whole zone now that the game is in the DOM.
  const bannedAll = await js(`(() => {
    const zone = (document.getElementById('demo') || {}).textContent.toLowerCase();
    return ['coming soon','not available','unavailable','free until','expires','trial ends']
      .filter((w) => zone.includes(w));
  })()`);
  ok('the copy rule holds on every slide, not only the first', bannedAll.length === 0,
    'found: ' + JSON.stringify(bannedAll));

  const fineprint = await js(`(() => ((document.getElementById('demo-slide-play') || {}).textContent || '').toLowerCase())()`);
  ok('the studio says the money is pretend', /rupees are pretend/.test(fineprint));

  await js(`(() => { Demo.show('practise'); return true; })()`);
  await sleep(700);

  // ── every slide, mounted ──────────────────────────────────────────────────
  // ⚠ The checks above only ever see the slides they happen to visit. These
  //   mount EVERY registered slide and then re-assert the rules that apply to
  //   the whole zone — the copy rule, the tap-target floor, and the record
  //   guard. A slide added later is covered the moment it is registered.
  console.log('\n══ every slide ══');

  const all = await js(`(async () => {
    const ids = [];
    for (const t of document.querySelectorAll('#demo-tabs .demo-tab')) {
      ids.push(t.id.replace('demo-tab-', ''));
    }
    for (const id of ids) {
      Demo.show(id);
      await new Promise((r) => setTimeout(r, 420));
    }
    Demo.show('practise');
    await new Promise((r) => setTimeout(r, 900));
    return ids;
  })()`);
  ok('every registered slide can be opened', all.length >= 2, JSON.stringify(all));

  const mounted = await js(`(() => {
    const panes = [...document.getElementById('demo-track').children];
    return {
      panes: panes.length,
      empty: panes.filter((p) => p.textContent.replace(/\\s+/g, '').length < 40).map((p) => p.id),
      tabs: document.querySelectorAll('#demo-tabs .demo-tab').length,
      dots: document.querySelectorAll('#demo-dots .demo-dot').length,
    };
  })()`);
  ok('a tab and a dot for every pane, still',
    mounted.tabs === mounted.panes && mounted.dots === mounted.panes, JSON.stringify(mounted));
  // ⚠ A registered slide whose renderer never ran is a blank panel behind a
  //   working tab — the exact failure the registry comment warns about.
  ok('no slide rendered empty', mounted.empty.length === 0, JSON.stringify(mounted.empty));

  // ⚠ THE CLAIM THE FLAPPING CHECK WAS TRYING TO MAKE, asserted where it is
  //   deterministic: with every slide mounted, at least one is taller than the
  //   open one, so a track sized to the tallest would be visibly wrong.
  const sized = await js(`(() => {
    const t = document.getElementById('demo-track');
    const panes = [...t.children];
    const i = panes.findIndex((p) => !p.inert);
    const hs = panes.map((p) => Math.ceil(p.scrollHeight));
    return {
      track: Math.round(t.getBoundingClientRect().height),
      open: hs[i] || 0,
      max: Math.max.apply(null, hs),
    };
  })()`);
  ok('the track matches the open slide, not the tallest of them all',
    Math.abs(sized.track - sized.open) <= 2 && sized.max >= sized.open,
    JSON.stringify(sized));

  const bannedEvery = await js(`(() => {
    const zone = (document.getElementById('demo') || {}).textContent.toLowerCase();
    return ['coming soon','not available','unavailable','free until','expires','trial ends']
      .filter((w) => zone.includes(w));
  })()`);
  ok('the copy rule holds with every slide mounted', bannedEvery.length === 0,
    'found: ' + JSON.stringify(bannedEvery));

  const tapAll = await js(`(() => {
    const small = [];
    for (const b of document.querySelectorAll('#demo button')) {
      const r = b.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      if (b.classList.contains('demo-nudge-a')) continue;
      if (r.height < 40) small.push(b.className.toString().slice(0, 34) + ':' + Math.round(r.height));
    }
    return small.slice(0, 8);
  })()`);
  ok('every control on every slide clears 40px', tapAll.length === 0, JSON.stringify(tapAll));

  // ── the shelf is a PUBLISHING decision, not a formatting one ──────────────
  // ⚠ assets/demo/shelf.js is world-readable forever. .library/catalogue.json
  //   carries sha256 sums and `source` paths like D:\past-papers\... — none of
  //   that may ever reach the public extract. Asserted on the SHIPPED file, not
  //   on the generator, because the generator is not what gets deployed.
  const shelfSrc = fs.existsSync(path.join(ROOT, 'assets/demo/shelf.js'))
    ? fs.readFileSync(path.join(ROOT, 'assets/demo/shelf.js'), 'utf8') : '';
  ok('the public shelf extract exists', !!shelfSrc);
  if (shelfSrc) {
    const leaks = ['sha256', 'hold_reason', 'unresolved', 'pack_id', 'past-papers']
      .filter((w) => shelfSrc.indexOf(w) >= 0);
    ok('the shelf leaks no catalogue internals', leaks.length === 0, JSON.stringify(leaks));
    ok('the shelf leaks no local path', shelfSrc.indexOf('D:' + String.fromCharCode(92)) < 0
      && shelfSrc.indexOf(String.fromCharCode(92, 92)) < 0);
    ok('the shelf leaks no file hash', !/[0-9a-f]{40,}/.test(shelfSrc));
    const fields = new Set();
    (shelfSrc.match(/"[a-z_]+":/g) || []).forEach((m) => fields.add(m.slice(1, -2)));
    const allowed = new Set(['grade', 'subject', 'year', 'doc_type', 'title', 'filename',
      'totals', 'docs', 'documents', 'byType', 'minYear', 'maxYear', 'subjects', 'grades',
      'exam', 'paper', 'practice', 'specimen']);
    const extra = [...fields].filter((f) => !allowed.has(f));
    ok('the shelf carries only the allow-listed fields', extra.length === 0, JSON.stringify(extra));
  }

  // ── the two newest slides ─────────────────────────────────────────────────
  console.log('\n══ game zone and coverage ══');

  // ⚠ THE TILE COUNT IS THE CLAIM. engine/minigame.js builds its hub as inline
  //   HTML with no table to read, so the twelve titles on the slide are a copy
  //   and check.js cannot catch one that drifts. What it CAN catch is a game
  //   added or removed — the same authority scripts/test-landing-subjects.js
  //   uses, mg-card-live.
  const mgSrc = fs.readFileSync(path.join(ROOT, 'engine/minigame.js'), 'utf8');
  const liveGames = (mgSrc.match(/mg-card-live/g) || []).length;
  await js(`(() => { Demo.show('games'); return true; })()`);
  await sleep(900);
  const gz = await js(`(() => ({
    tiles: document.querySelectorAll('#demo-arcade .demo-gz-tile').length,
    lit: document.querySelectorAll('#demo-arcade .demo-gz-tile.is-on').length,
    opts: document.querySelectorAll('#demo-arcade .qf-opt').length,
    dots: document.querySelectorAll('#demo-arcade .ex-dot').length,
    dotsEmpty: [...document.querySelectorAll('#demo-arcade .ex-dot')].filter((d) => !d.textContent.trim()).length,
  }))()`);
  ok('the Game Zone shows one tile per live game', gz.tiles === liveGames,
    'tiles ' + gz.tiles + ' vs mg-card-live ' + liveGames);
  ok('exactly one tile is lit — the one being played', gz.lit === 1, 'lit: ' + gz.lit);
  ok('the Explorer taste deals four options', gz.opts === 4, 'opts: ' + gz.opts);
  // ⚠ .ex-dot is sized by font-size, so an EMPTY dot collapses and the route
  //   renders as one solid green bar. Every dot must carry its icon.
  ok('every route dot carries a face', gz.dots > 0 && gz.dotsEmpty === 0,
    JSON.stringify({ dots: gz.dots, empty: gz.dotsEmpty }));

  // ⚠ NEVER the phrase "<word> learning games" in #demo: 
  //   test-landing-subjects.js matches the FIRST occurrence of it in the whole
  //   landing page, and this deck sits above the Game Zone section it checks.
  const gamesPhrase = await js(`(() => /\b[a-z]+ learning games\b/.test(((document.getElementById('demo') || {}).textContent || '').toLowerCase()))()`);
  ok('the deck never says "<word> learning games"', gamesPhrase === false);

  await js(`(() => { Demo.show('cover'); return true; })()`);
  await sleep(1100);
  const cv = await js(`(() => ({
    picks: document.querySelectorAll('#demo-cover .demo-cv-pick').length,
    rows: document.querySelectorAll('#demo-cover .demo-cv-row').length,
    zeros: [...document.querySelectorAll('#demo-cover .demo-cv-q')].filter((e) => e.textContent.trim() === '0').length,
    named: [...document.querySelectorAll('#demo-cover .demo-cv-name')].filter((e) => e.textContent.trim().length > 1).length,
    text: (document.getElementById('demo-cover') || {}).textContent || '',
  }))()`);
  ok('the coverage slide offers several chapters', cv.picks >= 3, 'picks: ' + cv.picks);
  ok('the open chapter lists its sub-topics', cv.rows >= 5, 'rows: ' + cv.rows);
  ok('every sub-topic is named', cv.named === cv.rows, JSON.stringify({ named: cv.named, rows: cv.rows }));
  // ⚠⚠ A declared sub-topic with no questions is the exact lie this slide
  //   claims to disprove. The generator refuses to publish one; assert it here
  //   too, because the generator is not what ships.
  ok('no sub-topic on the slide is empty', cv.zeros === 0, 'zero rows: ' + cv.zeros);
  // ⚠ totals.taggedQuestions counts stored rows with a sub-topic tag — raw
  //   tasks and past papers included — and is NOT the site's practisable total.
  //   It must never appear beside the words "practice questions".
  ok('the coverage slide never calls tagged rows practice questions',
    !/practice questions/i.test(cv.text), cv.text.slice(0, 120));

  await js(`(() => { Demo.show('practise'); return true; })()`);
  await sleep(900);
  // ── nothing was recorded ──────────────────────────────────────────────────
  console.log('\n══ nothing is recorded ══');
  const guard = await js('({ ...window.__guard, dbSame: JSON.stringify(window.DB||null) === window.__dbBefore, newKeys: Object.keys(localStorage).sort().filter(k => !window.__lsBefore.split("|").includes(k)) })');
  ok('recordAnswer() was never called', guard.rec === 0, 'calls: ' + guard.rec);
  ok('_recordDaily() was never called', guard.daily === 0, 'calls: ' + guard.daily);
  ok('LearningCoach.record() was never called', guard.coach === 0, 'calls: ' + guard.coach);
  ok('Store.saveStudentProgress() was never called', guard.save === 0, 'calls: ' + guard.save);
  ok('the progress blob is untouched', guard.dbSame);
  ok('nothing new in localStorage but the remembered grade',
    guard.newKeys.every((k) => k === 'ps_demo_grade'), 'new keys: ' + JSON.stringify(guard.newKeys));

  // ── switching grade ───────────────────────────────────────────────────────
  console.log('\n══ switching grade ══');
  const other = await js(`(() => {
    const live = [...new Set(SUBJECT_PACKS.filter(p=>!p.comingSoon).map(p=>p.grade))].sort((a,b)=>a-b);
    return live.find(g => g !== Demo.grade());
  })()`);
  await js(`Demo.setGrade(${other})`);
  let swapped = false;
  for (let i = 0; i < 30 && !swapped; i++) {
    await sleep(300);
    swapped = await js('!!document.querySelector("#demo-card .demo-opt")');
  }
  const after = await js(`(() => {
    const g = Demo.grade();
    const packs = SUBJECT_PACKS.filter(p => p.grade === g && !p.comingSoon);
    return { grade: g, cards: document.querySelectorAll('#demo-subjects .demo-subj').length,
             packs: packs.length,
             count: (document.querySelector('#demo-card .demo-qcount')||{}).textContent,
             saved: localStorage.getItem('ps_demo_grade'),
             onChips: [...document.querySelectorAll('[data-demo-grades]')]
               .map(r => (r.querySelector('.is-on .demo-grade-chip-g')||{}).textContent) };
  })()`);
  ok('the deck reloads for the new grade', swapped && /^1 \//.test((after.count || '').trim()),
    'counter: ' + after.count);
  ok('the subject list follows the new grade', after.cards === after.packs,
    after.cards + ' cards for ' + after.packs + ' packs');
  ok('both picker rows show the new grade selected',
    after.onChips.every((t) => t === 'G' + after.grade), JSON.stringify(after.onChips));
  ok('the chosen grade is remembered', after.saved === String(after.grade));

  // ── 360px: nothing cropped ────────────────────────────────────────────────
  console.log('\n══ 360px layout ══');
  await S('Emulation.setDeviceMetricsOverride', { width: 360, height: 780, deviceScaleFactor: 1, mobile: true });
  // ⚠ html.ps-booting carries `#screen-landing { display: none }` until
  //   protect.js reveals the page. Measuring before that returns zero-sized
  //   rects for everything, so every layout check below would PASS on a page
  //   that was never drawn — the worst kind of green.
  let revealed = false;
  for (let i = 0; i < 40 && !revealed; i++) {
    await sleep(300);
    revealed = await js('!document.documentElement.classList.contains("ps-booting")');
  }
  ok('the landing page was actually revealed before measuring it', revealed);
  await sleep(400);
  // ⚠⚠ THE TAB STRIP SCROLLS AT THIS WIDTH, so it has to follow the deck.
  //   Measured at 390px on the sixth slide BEFORE the fix: the active tab sat
  //   at 522-641px inside a 358px strip whose scrollLeft was 2 — entirely
  //   off-screen, so a visitor who swiped to the last slides saw a tab strip
  //   with nothing highlighted. It only appeared once there were six slides;
  //   with two, every tab fitted and nothing was wrong.
  const lastId = await js(`(() => {
    const tabs = [...document.querySelectorAll('#demo-tabs .demo-tab')];
    return tabs.length ? tabs[tabs.length - 1].id.replace('demo-tab-', '') : '';
  })()`);
  await js(`(() => { Demo.show(${JSON.stringify(lastId)}); return true; })()`);
  await sleep(900);
  const strip = await js(`(() => {
    const s = document.getElementById('demo-tabs');
    const on = s.querySelector('.demo-tab.is-on');
    if (!on) return { on: false };
    const sr = s.getBoundingClientRect(), r = on.getBoundingClientRect();
    return {
      on: true, overflows: s.scrollWidth > s.clientWidth + 4,
      visible: r.left >= sr.left - 2 && r.right <= sr.right + 2,
      left: Math.round(r.left - sr.left), right: Math.round(r.right - sr.left),
      width: Math.round(sr.width), scrollLeft: Math.round(s.scrollLeft),
    };
  })()`);
  ok('the last slide still has a highlighted tab', strip.on);
  ok('the tab strip scrolls the active tab into view', !strip.overflows || strip.visible,
    JSON.stringify(strip));
  await js(`(() => { Demo.show('practise'); return true; })()`);
  await sleep(700);

  const over = await js(`(() => {
    const inScroller = (el) => {
      for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
        const o = getComputedStyle(p).overflowX;
        if (o === 'auto' || o === 'scroll') return true;
      }
      return false;
    };
    const out = [];
    for (const root of ['demo']) {
      const host = document.getElementById(root);
      if (!host) continue;
      for (const el of host.querySelectorAll('*')) {
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden') continue;
        if (r.right - 360 <= 4 && -r.left <= 4) continue;
        if (inScroller(el)) continue;
        out.push({ root, cls: el.className.toString().slice(0,50),
                   w: Math.round(r.width), over: Math.round(Math.max(r.right - 360, -r.left)) });
      }
    }
    return out.slice(0, 6);
  })()`);
  ok('nothing in the demo is cropped at 360px', over.length === 0, JSON.stringify(over, null, 1));

  // ⚠ ONE exemption, by name: .demo-nudge-a is a link inside a sentence, and
  //   padding it to 44px would break the line it sits in. Every place it
  //   appears also carries a full-size "Register free" button, so a thumb that
  //   misses it has a proper target beside it. Nothing else may be added here
  //   without the same argument — see the rule's comment in style.css.
  const tap = await js(`(() => {
    const small = [], inlineLinks = [];
    for (const b of document.querySelectorAll('#demo button')) {
      const r = b.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      const row = { cls: b.className.toString().slice(0,40), h: Math.round(r.height) };
      if (b.classList.contains('demo-nudge-a')) { inlineLinks.push(row); continue; }
      if (r.height < 40) small.push(row);
    }
    return { small: small.slice(0, 6), inlineLinks };
  })()`);
  ok('every standalone demo control is at least 40px tall',
    tap.small.length === 0, JSON.stringify(tap.small));
  ok('the exempt inline links still clear 30px',
    tap.inlineLinks.every((l) => l.h >= 30), JSON.stringify(tap.inlineLinks));

  const errs = await js('(window.__pageErrors||[]).length');
  ok('no page errors surfaced during the run', !errs);

  // ── file:// — HOW_TO_RUN_LOCALLY.md option 1 ──────────────────────────────
  // ⚠⚠ THIS SECTION EXISTS BECAUSE EVERYTHING ABOVE PASSED WHILE THE DEMO WAS
  //   BROKEN. The decks were first written as JSON loaded with fetch(), which
  //   works over http and is blocked outright under file:// — so a maintainer
  //   double-clicking index.html (the documented quickest way to run this app)
  //   got "could not reach them" on every single grade. A served harness
  //   cannot see that. Reported from a real local run, not found here.
  console.log('\n══ file:// (double-clicked index.html) ══');
  const fileUrl = 'file:///' + ROOT.replace(/\\/g, '/').replace(/^\/+/, '') + '/index.html';
  await S('Page.navigate', { url: fileUrl });
  let fileReady = false;
  for (let i = 0; i < 40 && !fileReady; i++) {
    await sleep(500);
    fileReady = await js('!!document.querySelector("#demo-card .demo-opt")');
  }
  ok('the demo deals a question when opened as a local file', fileReady, fileUrl);
  if (fileReady) {
    const fq = await js(`(() => {
      const c = document.getElementById('demo-card');
      return { opts: c.querySelectorAll('.demo-opt').length,
               count: (c.querySelector('.demo-qcount')||{}).textContent,
               subject: (c.querySelector('.demo-qchip')||{}).textContent };
    })()`);
    ok('the file:// question is complete (4 options, counter, subject)',
      fq.opts === 4 && /\d+\s*\/\s*\d+/.test(fq.count || '') && !!(fq.subject || '').trim(),
      JSON.stringify(fq));
    const other2 = await js('(()=>{const g=Demo.grade();return g===5?6:5})()');
    await js(`Demo.setGrade(${other2})`);
    let swapped2 = false;
    for (let i = 0; i < 30 && !swapped2; i++) {
      await sleep(300);
      swapped2 = await js(`!!document.querySelector("#demo-card .demo-opt") && Demo.grade() === ${other2}`);
    }
    ok('switching grade works under file:// too', swapped2, 'grade ' + other2);
  } else {
    const why = await js('(()=>{const c=document.getElementById("demo-card");return c?c.textContent.replace(/\\s+/g," ").trim().slice(0,160):"NO #demo-card"})()');
    console.log('          #demo-card said: ' + why);
  }

  ws.close(); chrome.kill(); server.close();
  console.log('\n' + (fails ? `${fails} of ${checks} checks FAILED` : `all ${checks} checks passed`));
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); try { server.close(); } catch (_) {} process.exit(1); });
