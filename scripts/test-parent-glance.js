'use strict';
// "Your children · today at a glance" — the parent dashboard's child cards, in
// a real browser, against synthetic children.
//
// Run: node scripts/test-parent-glance.js
//
// ⚠ WHY A BROWSER AND NOT A SANDBOX. The cards are built by innerHTML inside
//   renderParentDashboard(), 400-odd KB into app.js, and every claim here is
//   about what a parent ends up reading — which chip survives a filter, which
//   sentence appears once rather than three times. None of that is reachable
//   without rendering it.
// ⚠ THE CHILDREN ARE FAKE, THE CHAPTER IDS ARE NOT. They are read from the live
//   SUBJECT_PACKS at run time, because the card drops any chapter id it cannot
//   name — invent one and every assertion below passes on an empty list.
// ⚠ Auth and Store are top-level `const`s in classic scripts, so they never
//   land on window and cannot be replaced. Their METHODS can be, which is all
//   this needs: the card reads students through Auth and progress through Store.
const http = require('http');
const fs   = require('fs');
const path = require('path');
const os   = require('os');
const { spawn } = require('child_process');

const ROOT   = path.resolve(__dirname, '..');
const PORT   = 8823;
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
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'psac-glance-'));
  const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=9371',
    '--user-data-dir=' + profile, '--no-first-run', '--no-default-browser-check',
    '--disable-gpu', '--window-size=1400,1200', 'about:blank'], { stdio: 'ignore' });

  let ver = null;
  for (let i = 0; i < 80 && !ver; i++) {
    try { ver = await getJson('http://127.0.0.1:9371/json/version'); } catch (_) { await sleep(250); }
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
      const t = setTimeout(() => { pending.delete(mid); reject(new Error('CDP timeout: ' + method)); }, 30000);
      pending.set(mid, { resolve: (r) => { clearTimeout(t); resolve(r); },
                         reject: (e) => { clearTimeout(t); reject(e); } });
      ws.send(JSON.stringify({ id: mid, method, params: params || {}, sessionId }));
    });
  };

  const t1 = await send('Target.createTarget', { url: 'about:blank' });
  const t2 = await send('Target.attachToTarget', { targetId: t1.targetId, flatten: true });
  const S  = (m, p) => send(m, p, t2.sessionId);
  const js = async (expr) => {
    const r = await S('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) {
      throw new Error('page threw: ' +
        ((r.exceptionDetails.exception && r.exceptionDetails.exception.description) || r.exceptionDetails.text));
    }
    return r.result.value;
  };

  await S('Page.enable'); await S('Runtime.enable'); await S('Network.enable');
  await S('Network.setCacheDisabled', { cacheDisabled: true });
  for (const dom of ['Network.setBypassServiceWorker', 'Page.setBypassServiceWorker']) {
    try { await S(dom, { bypass: true }); break; } catch (_) {}
  }
  await S('Emulation.setDeviceMetricsOverride', { width: 1400, height: 1200, deviceScaleFactor: 1, mobile: false });
  await S('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/index.html' });

  let booted = false;
  for (let i = 0; i < 50 && !booted; i++) {
    await sleep(400);
    booted = await js('typeof renderParentDashboard === "function" && typeof SUBJECT_PACKS !== "undefined"');
  }
  console.log('\n══ the children grid renders ══');
  ok('the app booted far enough to render the dashboard', booted);
  if (!booted) { try { chrome.kill(); } catch (_) {} server.close(); process.exit(1); }

  // ⚠ THREE CHILDREN, EACH ONE A CASE THE CARD USED TO GET WRONG:
  //   strong  — every chapter at or above the green line. Must show NO weakness.
  //   fresh   — signed in a fortnight ago, never answered anything. Must not be
  //             warned about as lapsed, and must not print five kinds of zero.
  //   mixed   — a real spread, including two chapters it must NOT call weak.
  const seeded = await js(`(async () => {
    const live = (g) => Object.values(SUBJECT_PACKS)
      .filter(p => !p.comingSoon && String(p.grade) === String(g));
    const ids = [];
    live(5).forEach(p => (p._chapters || p.chapters || []).forEach(c => ids.push(c.id)));
    if (ids.length < 5) return { ok: false, why: 'grade 5 has fewer than 5 chapters' };
    const ch = (rows) => Object.fromEntries(rows.map(([i, att, cor]) => [ids[i], { attempted: att, correct: cor }]));
    const ago = (d) => new Date(Date.now() - d * 86400000).toDateString();
    // ⚠ REAL DATED HISTORY, keyed the way the app keys it. With an empty
    //   daily map the overview takes its "tracking starts with this update"
    //   branch, which renders no alerts at all — so a suite seeded without it
    //   would be testing the one path the family it describes is not on.
    const dayKey = (back) => _muDayKeyBack(back);
    const days = (rows) => Object.fromEntries(rows.map(([back, a, c]) => [dayKey(back), { a, c }]));

    const students = [
      { id: 'mixed',  display_name: 'Mixed',  username: 'mixed_kid',  grade: 5, avatar: '🧒' },
      { id: 'fresh',  display_name: 'Fresh',  username: 'fresh_kid',  grade: 4, avatar: '🧒' },
      { id: 'strong', display_name: 'Strong', username: 'strong_kid', grade: 5, avatar: '🧒' },
    ];
    const progress = {
      // 10%, 58% and 71% are weak; 100% and 93% are not, and used to be listed.
      mixed: { stats: { totalAttempted: 265, totalCorrect: 181, lastDate: ago(1), streak: 2 },
               daily: days([[1, 18, 12], [3, 9, 6], [5, 7, 7]]),
               mistakes: Array.from({ length: 45 }, () => ({ due: '2000-01-01' })), labs: {},
               chapters: ch([[0, 20, 2], [1, 24, 14], [2, 21, 15], [3, 30, 30], [4, 28, 26]]) },
      fresh: { stats: { totalAttempted: 0, totalCorrect: 0, lastDate: ago(15) },
               daily: {}, chapters: {}, mistakes: [], labs: {} },
      strong: { stats: { totalAttempted: 62, totalCorrect: 58, lastDate: ago(10) },
                daily: days([[10, 20, 19], [11, 42, 39]]),
                chapters: ch([[3, 30, 30], [4, 28, 26]]), mistakes: [{ due: '2000-01-01' }], labs: {} },
    };
    Auth.getStudents = () => students;
    Auth.getFamily = () => ({ family_name: 'test_family' });
    Auth.getParentProfile = () => null;
    Store.loadFamilyProgress = async () => progress;
    Store.loadStudentProgress = async (i) => progress[i];

    // ⚠⚠ THE SCREEN IS REVEALED BY HAND, NOT THROUGH showScreen('parent').
    //   'parent' is in _ADULT_ONLY_SCREENS, so with no signed-in adult the
    //   guard bounces straight back to the landing page — measured: the only
    //   visible screen was still #screen-landing and every rect came back 0.
    //   Chrome's innerText falls back to textContent on an unrendered element,
    //   so the text assertions below would have passed on a panel the browser
    //   had never laid out, and any geometry added later would read zeroes.
    //   Faking a parent session to satisfy the guard would be testing the
    //   guard; this reveals the screen and leaves the guard alone.
    document.documentElement.classList.remove('ps-booting');
    await renderParentDashboard();
    await new Promise((r) => setTimeout(r, 900));
    // ⚠ AFTER the render, not before: renderParentDashboard() puts the screens
    //   back the way it found them, so revealing first is undone by the time
    //   anything is measured.
    document.querySelectorAll('.screen').forEach((el) => el.classList.add('hidden'));
    document.getElementById('screen-parent').classList.remove('hidden');
    await new Promise((r) => setTimeout(r, 300));
    return { ok: true, cards: document.querySelectorAll('#pd-children-grid .pd-child-card').length,
             laidOut: document.getElementById('pd-children-heading').getBoundingClientRect().width > 100 };
  })()`);
  ok('three child cards painted', seeded.ok && seeded.cards === 3, JSON.stringify(seeded));
  // ⚠ A panel the browser never laid out still answers innerText, so this is
  //   what stops every check below from passing on an invisible screen.
  ok('the panel is actually laid out, not merely in the DOM', !!seeded.laidOut, JSON.stringify(seeded));

  const read = async (who, what) => js(`(() => {
    const cards = [...document.querySelectorAll('#pd-children-grid .pd-child-card')];
    const card = cards.find(c => /@${who}/.test(c.innerText));
    if (!card) return null;
    return (${what});
  })()`);

  // ── "needs practice" has to mean it ───────────────────────────────────────
  console.log('\n══ "needs practice" ══');
  // ⚠⚠ THE FILTER USED TO BE "the three weakest chapters", FULL STOP — no
  //   accuracy ceiling at all. A child doing well had, in orange, under a
  //   heading reading Needs practice: "Le Passé Composé 93%" and "Les Verbes -
  //   Présent 100%". A chapter the child has never once got wrong is not a
  //   weakness, and printing it as one costs every other orange chip on the
  //   screen its meaning.
  const weak = await read('mixed_kid', `[...card.querySelectorAll('.pd-weak-chip')]
    .map(el => ({ t: el.textContent.trim(), pct: Number((el.textContent.match(/(\\d+)%\\s*$/) || [])[1]) }))`);
  ok('the mixed child shows weak chapters at all', Array.isArray(weak) && weak.length > 0,
    JSON.stringify(weak));
  // ⚠ 80 is _repAccColour()'s own green boundary, not a number invented here:
  //   a chapter that prints green in the report must not print orange here.
  // ⚠ THIS CHECK IS NOT THE ONE THAT CATCHES A MISSING CEILING. The mixed child
  //   has five chapters and the three weakest are all under 80 anyway, so
  //   slice(0,3) hides the bug here — measured: pull the filter and this still
  //   passes. The `strong` child below is the discriminating case. Kept as the
  //   invariant it states, not as the guard.
  ok('nothing at or above the green line is called "needs practice"',
    Array.isArray(weak) && weak.every(w => w.pct < 80), JSON.stringify(weak));
  ok('the weakest chapter is listed first',
    Array.isArray(weak) && weak.every((w, i) => i === 0 || w.pct >= weak[i - 1].pct), JSON.stringify(weak));
  // ⚠ A bare "10%" is unreadable — one wrong out of ten reads the same as ninety
  //   out of a hundred. The working is on the chip's title.
  ok('each weak chip carries the counts behind the percentage',
    !!(await read('mixed_kid', `[...card.querySelectorAll('.pd-weak-chip')]
      .every(el => /\\d+ right out of \\d+ answered/.test(el.getAttribute('title') || ''))`)),
    JSON.stringify(await read('mixed_kid', `[...card.querySelectorAll('.pd-weak-chip')].map(el => el.getAttribute('title'))`)));

  const strongWeak = await read('strong_kid', `card.querySelectorAll('.pd-weak').length`);
  ok('a child with no weak chapter gets no "needs practice" block at all',
    strongWeak === 0, 'blocks: ' + strongWeak);

  // ── a child who has never started ─────────────────────────────────────────
  console.log('\n══ never started ══');
  // ⚠⚠ `lastDate` IS WRITTEN WHEN A CHILD IS ACTIVE, NOT WHEN THEY ANSWER. So a
  //   child who signed in once and never answered a question was labelled
  //   "⚠️ Last active 15d ago" in alarm orange — nothing had lapsed, because
  //   nothing had started — and under it sat 0 today, 0 this week, 0 all time
  //   and one "Not started" chip per subject. Nine lines for one fact, and the
  //   fact was wrong.
  const fresh = await read('fresh_kid', `card.innerText`);
  ok('it says not started, rather than warning about a lapse',
    /Not started yet/.test(fresh) && !/Last active/.test(fresh), JSON.stringify(fresh));
  // ⚠ The missing step is that the child has never SIGNED IN. The card hands
  //   over the two things that fix that, which no amount of zeroes would.
  ok('it names the username the child signs in with',
    /@fresh_kid/.test(fresh) && /PIN/.test(fresh), JSON.stringify(fresh));
  ok('it does not print the same zero five ways',
    !/0\/7 days practised/.test(fresh) && !/Not started<\/span>/.test(fresh)
      && !/all-time attempts/.test(fresh), JSON.stringify(fresh));

  // ── one fact, one place ───────────────────────────────────────────────────
  console.log('\n══ said once ══');
  // ⚠⚠ THE CAVEAT BELONGS TO THE COLUMN, NOT THE ROW. "Repeats count as
  //   attempts, not completed work" was written into every card, so a parent
  //   with three children read it three times on one screen.
  const note = await js(`(() => {
    const el = document.getElementById('pd-children-note');
    return { exists: !!el, hidden: !el || el.classList.contains('hidden'),
             onScreen: (document.getElementById('screen-parent').innerText
               .match(/Repeats count as attempts/g) || []).length };
  })()`);
  ok('the repeats caveat appears exactly once, and is visible',
    note.exists && !note.hidden && note.onScreen === 1, JSON.stringify(note));

  // ⚠ The activity pill already says "No activity yet today". A "Today —
  //   No practice recorded today yet." block directly underneath made the two
  //   most prominent lines on the card carry one fact between them.
  const doubled = await js(`(() => {
    return [...document.querySelectorAll('#pd-children-grid .pd-child-card')]
      .map(c => ({ who: (c.innerText.match(/@(\\S+)/) || [])[1],
                   says: (c.innerText.match(/No practice recorded today yet|No activity yet today/g) || []).length }))
      .filter(r => r.says > 1);
  })()`);
  ok('no card states "nothing today" twice', doubled.length === 0, JSON.stringify(doubled));

  // ── still a card ──────────────────────────────────────────────────────────
  console.log('\n══ nothing lost ══');
  const intact = await js(`(() => {
    const cards = [...document.querySelectorAll('#pd-children-grid .pd-child-card')];
    return cards.map(c => ({ who: (c.innerText.match(/@(\\S+)/) || [])[1],
      cta: /View progress & manage homework/.test(c.innerText),
      opens: /PD.selectChild/.test(c.getAttribute('onclick') || '') }));
  })()`);
  ok('every card still opens the child and still offers the way in',
    intact.length === 3 && intact.every(c => c.cta && c.opens), JSON.stringify(intact));
  ok('the working child still shows its history',
    /Last 7 days/.test(await read('mixed_kid', 'card.innerText'))
      && /All time: 265 answer attempts/.test(await read('mixed_kid', 'card.innerText')));

  // ── the glance comes before the detail ────────────────────────────────────
  console.log('\n══ the family report ══');
  // ⚠⚠ IT USED TO BE THE LAST THING ON THE SCREEN. The one view that reads
  //   every child at once — sorted by who needs looking at, carrying the
  //   "X has not practised in N days" alerts — sat collapsed BELOW three
  //   twelve-line cards, on a screen headed "today at a glance".
  const place = await js(`(() => {
    const det  = document.getElementById('pd-weekly-details');
    const grid = document.getElementById('pd-children-grid');
    const head = document.getElementById('pd-children-heading');
    if (!det || !grid || !head) return { missing: true };
    // DOCUMENT_POSITION_FOLLOWING === 4: the argument comes after the subject.
    return { missing: false,
             beforeCards: !!(det.compareDocumentPosition(grid) & 4),
             afterHeading: !!(head.compareDocumentPosition(det) & 4),
             visible: !det.classList.contains('hidden') };
  })()`);
  ok('the family report sits between the heading and the cards',
    !place.missing && place.beforeCards && place.afterHeading, JSON.stringify(place));
  ok('it is shown at all with more than one child', place.visible, JSON.stringify(place));

  // ⚠ TWO of the three seeded children are quiet (15 and 10 days), so this run
  //   always has an alert to find. A <details> is a promise that the contents
  //   can wait; that promise must not be made about a warning.
  const summary = await js(`(() => {
    const det = document.getElementById('pd-weekly-details');
    const sum = document.getElementById('pd-weekly-summary');
    return { open: det.open, text: sum ? sum.innerText.trim() : 'MISSING',
             alerted: !!sum && !!sum.querySelector('.pd-weekly-alert'),
             inside: (document.getElementById('pd-family-overview').innerText.match(/nothing for \\d+ days?/g) || []).length };
  })()`);
  ok('the summary states the alert without being opened',
    summary.alerted && /gone quiet/.test(summary.text), JSON.stringify(summary));
  ok('it is open on arrival when a child has gone quiet', summary.open, JSON.stringify(summary));
  ok('the alerts really are inside it', summary.inside > 0, JSON.stringify(summary));

  // ⚠⚠ COLLAPSING IT HAS TO STICK. renderParentDashboard() runs again every
  //   time the parent comes back from a child's dashboard, so an unconditional
  //   `open = true` would reopen it on every return and the panel would argue
  //   with the person reading it.
  const sticks = await js(`(async () => {
    const det = document.getElementById('pd-weekly-details');
    det.open = false;
    det.dispatchEvent(new Event('toggle'));
    await renderParentDashboard();
    await new Promise((r) => setTimeout(r, 700));
    return { reopened: document.getElementById('pd-weekly-details').open };
  })()`);
  ok('once the parent collapses it, a re-render leaves it collapsed',
    !sticks.reopened, JSON.stringify(sticks));

  console.log('');
  console.log(fails ? `  ${fails} of ${checks} checks FAILED` : `all ${checks} checks passed`);
  try { chrome.kill(); } catch (_) {}
  server.close();
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
