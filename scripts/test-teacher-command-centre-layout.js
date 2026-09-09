'use strict';
// Teacher Command Centre — measured in a real browser.
//
// Loads the app on a local static server in headless Chrome, stands in for
// Supabase with a scripted teacher (two classrooms, three pieces of work,
// results with a struggling pupil), and then, at 360px and 1280px in light and
// dark themes, walks Home → Classrooms → Set Work → Results → the classroom
// overlay (Overview / Work / Pupils) → the More menus, asserting on every
// screen that:
//   • nothing protrudes past the viewport (per-element rects, ancestor walk
//     stopped at <body> because body { overflow-x: clip } hides everything),
//   • visible text meets 4.5:1 against its composited background,
//   • primary actions are at least 44px tall,
//   • the main navigation has exactly four tabs and More holds five tools,
//   • the classroom nav has exactly four primary sections, Materials among them.
//
// Run:  node scripts/test-teacher-command-centre-layout.js [--shots DIR]
// ⚠ Fresh Chrome profile, service worker bypassed, cache disabled: otherwise
//   a stale shell measures the PREVIOUS style.css and reports a fix as landed.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os'), assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const shotsDir = (() => { const i = process.argv.indexOf('--shots'); return i > 0 ? process.argv[i + 1] : ''; })();
if (shotsDir) fs.mkdirSync(shotsDir, { recursive: true });
const PORT = 8797, DBG = 9343;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.mjs': 'text/javascript' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
  const name = path.resolve(root, '.' + p);
  if (!name.startsWith(root + path.sep) || !fs.existsSync(name) || fs.statSync(name).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(name)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(name).pipe(res);
});
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = url => new Promise((resolve, reject) => http.get(url, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { resolve(JSON.parse(s)); } catch (e) { reject(e); } }); }).on('error', reject));

// ── Scripted teacher data, injected into the page ──────────────────────────
const MOCK = `
(() => {
  const soon = new Date(Date.now() + 26*3600000).toISOString();
  const week = new Date(Date.now() + 6*86400000).toISOString();
  const past = new Date(Date.now() - 2*86400000).toISOString();
  const classes = [
    { id: 'c1', name: 'Grade 5 Blue', active: true, access_type: 'per_student', pupils: 3 },
    { id: 'c2', name: 'Online revision group', active: true, access_type: 'per_student', pupils: 2 },
  ];
  const assignments = [
    { id: 'a1', code: 'ABC123', title: 'Fractions homework', subject_pack_id: 'grade5-maths', chapter_ids: ['fractions'], question_count: 10, duration_mins: null, expires_at: soon, status: 'active', submissions: 2, created_at: past },
    { id: 'a2', code: 'DEF456', title: 'Vocabulary quick test', subject_pack_id: 'grade5-english', chapter_ids: [], question_count: 5, duration_mins: 10, expires_at: week, status: 'active', submissions: 1, created_at: past },
    { id: 'a3', code: 'GHI789', title: 'Old geometry practice', subject_pack_id: 'grade5-maths', chapter_ids: ['geometry'], question_count: 10, duration_mins: null, expires_at: past, status: 'closed', submissions: 3, created_at: past },
  ];
  const modes = [
    { id: 'a1', mode: 'classroom_pin', classroom_id: 'c1', classroom_name: 'Grade 5 Blue', archived: false },
    { id: 'a2', mode: 'nickname', classroom_id: null, classroom_name: '', archived: false },
    { id: 'a3', mode: 'classroom_pin', classroom_id: 'c1', classroom_name: 'Grade 5 Blue', archived: true },
  ];
  const ans = (ok, i) => ({ id: 'g5m-fractions-00' + i, correct: ok, userAnswer: ok ? '1/2' : '1/3', correctAnswer: '1/2' });
  const results = {
    a1: [
      { name: 'Aisha', name_key: 'p1', submitted_at: new Date(Date.now() - 3600000).toISOString(), score: 8, total: 10, pct: 80, attempt: 1, elapsed_secs: 540, answers: [1,2,3,4,5,6,7,8,9,10].map(i => ans(i <= 8, i)) },
      { name: 'Ben', name_key: 'p2', submitted_at: new Date(Date.now() - 7200000).toISOString(), score: 2, total: 10, pct: 20, attempt: 1, elapsed_secs: 50, answers: [1,2,3,4,5,6,7,8,9,10].map(i => ans(i <= 2, i)) },
      { name: 'Chloé <b>x</b>', name_key: 'p3', not_started: true, submitted_at: null, answers: [] },
    ],
    a2: [ { name: 'Guest Kid', name_key: 'nick:guest', submitted_at: new Date().toISOString(), score: 4, total: 5, pct: 80, attempt: 1, elapsed_secs: 300, answers: [] } ],
    a3: [],
  };
  const roster = [ { id: 'p1', name: 'Aisha', active: true }, { id: 'p2', name: 'Ben', active: true }, { id: 'p3', name: 'Chloé <b>x</b>', active: true } ];
  const newRoster = [ { id: 'n1', name: 'Student 1', active: true }, { id: 'n2', name: 'Student 2', active: true } ];
  window.__calls = [];
  const chain = (data) => { const p = Promise.resolve({ data, error: null }); const c = { then: p.then.bind(p), catch: p.catch.bind(p), finally: p.finally.bind(p) }; ['select','eq','order','insert','delete','update','single'].forEach(k => c[k] = () => c); return c; };
  _sb.rpc = async (name, args) => {
    window.__calls.push([name, args]);
    if (name === 'guest_my_assignments') return { data: { ok: true, assignments } };
    if (name === 'teacher_guest_assignment_modes') return { data: { ok: true, modes } };
    if (name === 'guest_assignment_quota') return { data: { ok: true, per_day: 3, left_today: 2, max_students: 40 } };
    if (name === 'teacher_guest_results') return { data: { ok: true, assignment: { id: args.p_assignment_id }, submissions: results[args.p_assignment_id] || [] } };
    if (name === 'teacher_guest_manage') {
      if (args.p_action === 'list') return { data: { ok: true, classes } };
      if (args.p_action === 'roster') return { data: { ok: true, pupils: args.p_classroom === 'c1' ? roster : newRoster, access_type: 'per_student', class_pin: null } };
      if (args.p_action === 'create_class') return { data: { ok: true, id: 'c-new' } };
      if (args.p_action === 'reveal_pin') return { data: { ok: true, pin: '4821' } };
      if (args.p_action === 'reveal_all_pins') return { data: { ok: true, pupils: roster.map(p => ({ ...p, pin: '1234' })) } };
      return { data: { ok: true } };
    }
    if (name === 'teacher_guest_create_assignment') return { data: { ok: true, id: 'a9', code: 'NEW999', assignments_left_today: 1 } };
    return { data: { ok: true } };
  };
  _sb.from = () => chain([]);
  _sb.auth.getSession = async () => ({ data: { session: { user: { id: 'teacher-1' } } } });
  _sb.auth.getUser = async () => ({ data: { user: { id: 'teacher-1' } } });
  Auth.isTeacher = () => true;
  Auth.getParentProfile = () => ({ id: 'teacher-1', full_name: 'Mrs Devi', role: 'teacher' });
  _isParentSession = () => true;
  if (typeof QuestionLoader !== 'undefined') QuestionLoader.loadSubject = async () => [];
  try { localStorage.removeItem('psac_teacher_loc_v1'); } catch (_) {}
})();`;

// ── Page-side measurement helpers ──────────────────────────────────────────
const PROBE = `
(() => {
  const W = innerWidth;
  const KNOWN = [['.ta-tab-content', ['#243f26', '#101010']], ['.tc-cd-overlay', ['#23422a', '#0f0f0f']], ['.tc-setup-guide', ['#123922', '#123922']], ['.tc-cd-header', ['#1c3c2b', '#1c3c2b']], ['.tc-share-inner', ['#254528', '#254528']], ['.ncf-panel', ['#254528', '#254528']], ['#ta-build-btn', ['#22402a', '#22402a']], ['.ta-btn-pencil', ['#d7ae2d', '#d7ae2d']], ['.tc-cd-action-btn', ['#e8c245', '#e8c245']], ['.teacher-navigation', ['#23422a', '#23422a']], ['.ta-tab', ['#2b4a2c', '#1b1b1b']], ['.ta-more-btn', ['#2b4a2c', '#1b1b1b']], ['.tc-cd-nav-active', ['#f4ce52', '#f4ce52']], ['.tc-share-wa-btn', ['#25d366', '#25d366']], ['.tc-share-copy-btn', ['#e8c245', '#e8c245']], ['.ta-btn-eraser', ['#dcb5aa', '#dcb5aa']], ['.tp-flag', ['#1b2f20', '#1b2f20']], ['.tc-cd-student-pin-badge', ['#1b2f20', '#1b2f20']]];
  const dark = document.documentElement.classList.contains('dark');
  const parse = s => { const m = (s || '').match(/[\\d.]+/g); if (!m) return null; const v = m.map(Number); return { r: v[0], g: v[1], b: v[2], a: v.length > 3 ? v[3] : 1 }; };
  const hex = h => ({ r: parseInt(h.slice(1,3),16), g: parseInt(h.slice(3,5),16), b: parseInt(h.slice(5,7),16), a: 1 });
  const lum = c => [c.r, c.g, c.b].map(v => { v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }).reduce((n, v, i) => n + v * [.2126, .7152, .0722][i], 0);
  const ratio = (a, b) => (Math.max(lum(a), lum(b)) + .05) / (Math.min(lum(a), lum(b)) + .05);
  const blend = (top, under) => ({ r: top.r * top.a + under.r * (1 - top.a), g: top.g * top.a + under.g * (1 - top.a), b: top.b * top.a + under.b * (1 - top.a), a: 1 });
  function bgOf(el) {
    const layers = [];
    let node = el;
    while (node && node !== document.documentElement) {
      const s = getComputedStyle(node);
      const known = KNOWN.find(([sel]) => node.matches(sel));
      const bc = parse(s.backgroundColor);
      if (known && (!bc || bc.a < 1)) { layers.push(hex(known[1][dark ? 1 : 0])); break; }
      if (bc && bc.a >= 1) { layers.push(bc); break; }
      if (bc && bc.a > 0) layers.push(bc);
      node = node.parentElement;
    }
    let out = layers.length && layers[layers.length - 1].a >= 1 ? layers.pop() : hex(dark ? '#111111' : '#f2ebe0');
    while (layers.length) out = blend(layers.pop(), out);
    return out;
  }
  // ⚠ Not checkVisibility(): Chrome 152 headless answers false for every element here, which would blind the probe. Closed <details> content is excluded by geometry instead.
  const inClosedDetails = el => { let n = el; while (n && n !== document.body) { if (n.tagName === 'DETAILS' && !n.open && !(el.tagName === 'SUMMARY' && el.parentElement === n) && !el.closest('summary')) return true; n = n.parentElement; } return false; };
  const visible = el => { if (inClosedDetails(el)) return false; const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && Number(s.opacity) > 0.2; };
  const inScroller = el => { let n = el.parentElement; while (n && n !== document.body) { const s = getComputedStyle(n); if (/(auto|scroll|hidden|clip)/.test(s.overflowX) && n.scrollWidth > n.clientWidth + 1) return true; n = n.parentElement; } return false; };
  const scope = document.querySelector('#tc-classroom-detail:not(.hidden)') || document.querySelector('#ta-share-text-panel, #tc-share-panel, #ta-assignment-detail, #tp-panel') || document.getElementById('screen-teacher');
  const overflow = [], contrast = [], small = []; let measured = 0;
  const textEls = [...scope.querySelectorAll('h2,h3,h4,p,small,strong,b,span,button,label,summary,time,option,a,input,td,th')];
  for (const el of textEls) {
    if (!visible(el)) continue;
    if (el.closest('.hidden') || el.closest('[hidden]') || el.classList.contains('sr-only')) continue;
    const r = el.getBoundingClientRect();
    if ((r.right > W + 1 || r.left < -1) && !inScroller(el) && r.width > 2) overflow.push({ tag: el.tagName, cls: el.className && el.className.baseVal === undefined ? String(el.className).slice(0, 50) : '', text: (el.textContent || '').trim().slice(0, 40), left: Math.round(r.left), right: Math.round(r.right) });
    const own = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1);
    if (!own) continue;
    measured++;
    if (el.tagName === 'INPUT' || el.tagName === 'OPTION') continue;
    if (!/[A-Za-z0-9]/.test(el.textContent)) continue;
    const s = getComputedStyle(el);
    const fg = parse(s.color); if (!fg) continue;
    const bg = bgOf(el);
    const rt = ratio(fg, bg);
    const size = parseFloat(s.fontSize), bold = parseInt(s.fontWeight) >= 700;
    const large = size >= 24 || (size >= 18.66 && bold);
    if (rt < (large ? 3 : 4.5)) contrast.push({ text: (el.textContent || '').trim().slice(0, 40), cls: String(el.className).slice(0, 60), ratio: +rt.toFixed(2), fg: s.color, bg: 'rgb(' + [bg.r, bg.g, bg.b].map(Math.round).join(',') + ')', size });
  }
  const targets = [...scope.querySelectorAll('.ta-tab,.ta-more-btn,.th-action,.tw-btn,#ta-build-btn,.tr-insight-btn,.tr-bulk button,.ta-more-menu button,.tc-cd-nav-btn,.tc-work-filter,.ta-due-chips button,.ta-share-opt,.th-empty button,.tp-open,.ta-settings-card,.tc-cd-action-btn,.ta-state-retry,.tc-setup-step>button,.tc-setup-skip,.tc-setup-help')];
  for (const el of targets) { if (!visible(el)) continue; const r = el.getBoundingClientRect(); if (r.height < 43.5) small.push({ cls: String(el.className).slice(0, 50), text: (el.textContent || '').trim().slice(0, 30), h: Math.round(r.height) }); }
  const scroll = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
  return { overflow, contrast, small, scroll, W, checked: measured };
})()`;

let chrome, ws; const pageErrorsRef = [];
(async () => {
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + DBG, '--user-data-dir=' + fs.mkdtempSync(path.join(os.tmpdir(), 'psac-tcc-')), '--no-first-run', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });
  let version;
  for (let i = 0; i < 40 && !version; i++) { try { version = await get('http://127.0.0.1:' + DBG + '/json/version'); } catch (_) { await sleep(250); } }
  assert(version, 'Chrome starts');
  ws = new WebSocket(version.webSocketDebuggerUrl); await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  let serial = 0; const waiting = new Map();
  const pageErrors = pageErrorsRef;
  ws.onmessage = e => { const m = JSON.parse(e.data); if (waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); }
    if (m.method === 'Runtime.exceptionThrown') pageErrors.push(m.params.exceptionDetails?.exception?.description || m.params.exceptionDetails?.text);
    if (m.method === 'Runtime.consoleAPICalled' && (m.params.type === 'error' || m.params.type === 'warning')) pageErrors.push(m.params.args.map(a => a.value || a.description).join(' ')); };
  function send(method, params = {}, sessionId) { return new Promise((resolve, reject) => {
    const id = ++serial, t = setTimeout(() => { waiting.delete(id); reject(Error('Timeout ' + method)); }, 20000);
    waiting.set(id, m => { clearTimeout(t); m.error ? reject(Error(m.error.message)) : resolve(m.result); }); ws.send(JSON.stringify({ id, method, params, sessionId }));
  }); }
  const target = await send('Target.createTarget', { url: 'about:blank' });
  const session = await send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
  const call = (m, p) => send(m, p, session.sessionId);
  await call('Page.enable'); await call('Runtime.enable'); await call('Network.enable');
  await call('Network.setBypassServiceWorker', { bypass: true }); await call('Network.setCacheDisabled', { cacheDisabled: true });
  const evaluate = async (expression, awaitPromise = false) => {
    const r = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise });
    assert(!r.exceptionDetails, JSON.stringify(r.exceptionDetails?.exception?.description || r.exceptionDetails));
    return r.result.value;
  };
  const shot = async name => {
    if (!shotsDir) return;
    const r = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    fs.writeFileSync(path.join(shotsDir, name + '.png'), Buffer.from(r.data, 'base64'));
  };
  let failures = 0, checks = 0;
  const report = (label, probe) => {
    checks++;
    const bad = probe.overflow.length || probe.contrast.length || probe.small.length || probe.scroll > probe.W + 1;
    if (bad) { failures++; console.log('✗ ' + label + ' — ' + JSON.stringify({ overflow: probe.overflow.slice(0, 6), contrast: probe.contrast.slice(0, 8), small: probe.small.slice(0, 6), scroll: probe.scroll, W: probe.W })); }
    else console.log('✓ ' + label + ' — ' + probe.checked + ' elements, no overflow, contrast ≥ 4.5:1, targets ≥ 44px');
  };

  await call('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/' });
  let ready = false;
  // ⚠ TeacherMode and TeacherHome are in the lazy teacher group, so ASK for
  //   them. A plain boot never defines them any more (test-role-modules.js).
  for (let i = 0; i < 120 && !ready; i++) { await sleep(500); try { ready = await evaluate("typeof _sb !== 'undefined' && !!_sb && typeof Auth !== 'undefined' && document.readyState === 'complete' ? RoleModules.ensure('teacher').then(() => typeof TeacherMode !== 'undefined' && typeof TeacherHome !== 'undefined') : false"); } catch (_) {} }
  assert(ready, 'app globals loaded');
  await sleep(1500);
  await evaluate(MOCK);
  await evaluate("document.head.append(Object.assign(document.createElement('style'),{textContent:'*,*::before,*::after{transition:none!important;animation:none!important}'}))");

  for (const width of [360, 1280]) for (const dark of [false, true]) {
    const tag = width + (dark ? '-dark' : '-light');
    await call('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 600 });
    await evaluate(`document.documentElement.classList.toggle('dark', ${dark}); document.querySelectorAll('.screen').forEach(e => e.classList.add('hidden')); document.getElementById('screen-teacher').classList.remove('hidden'); typeof TeacherClassroomDetail !== 'undefined' && TeacherClassroomDetail.close(); localStorage.removeItem('psac_teacher_loc_v1'); TeacherMode.render(); true`);
    await sleep(1200);
    // Navigation shape
    const nav = await evaluate(`({ tabs: [...document.querySelectorAll('#screen-teacher .teacher-navigation .ta-tab')].map(b => b.textContent.trim()), more: [...document.querySelectorAll('#ta-more-menu [data-more]')].map(b => b.dataset.more), home: document.querySelector('.ta-tab-content[data-tab="home"]').classList.contains('hidden') === false })`);
    assert.deepEqual(nav.tabs, ['🏠 Home', '🏫 Classrooms', '✏️ Set Work', '📊 Results'], 'four main tabs');
    assert.deepEqual(nav.more, ['materials', 'messages', 'gradebook', 'assignments', 'settings'], 'five tools behind More');
    assert(nav.home, 'Home is the landing tab');
    const home = await evaluate(`({ greeting: document.querySelector('.th-hero h3')?.textContent, actions: document.querySelectorAll('.th-action').length, cards: document.querySelectorAll('.th-card').length, help: document.querySelector('.th-card:nth-child(2)')?.textContent })`);
    if (!home.greeting) console.log('ta-home:', await evaluate("document.getElementById('ta-home').innerHTML.slice(0, 400)"));
    assert.match(home.greeting || '', /Good (morning|afternoon|evening), Mrs Devi/);
    assert.equal(home.actions, 3); assert.equal(home.cards, 3);
    assert.match(home.help, /Ben/, 'Ben (20% over 10 questions) is flagged on Home');
    assert.doesNotMatch(home.help, /Aisha/, 'Aisha (80%) is not flagged');
    report('Home ' + tag, await evaluate(PROBE)); await shot('home-' + tag);

    await evaluate("TeacherMode.toggleMore(true); true"); await sleep(150);
    report('More menu ' + tag, await evaluate(PROBE)); await shot('more-' + tag);
    await evaluate("TeacherMode.closeMore(); TeacherMode.switchTab('classes'); true"); await sleep(600);
    report('Classrooms ' + tag, await evaluate(PROBE)); await shot('classes-' + tag);

    await evaluate("TeacherMode.switchTab('create'); document.getElementById('ta-more-options').open = true; true"); await sleep(700);
    const form = await evaluate(`(() => { const vis = id => { const e = document.getElementById(id); return !!e && e.offsetParent !== null; }; return { classroom: vis('ta-class-picker'), share: vis('ta-share-choice'), subject: vis('ta-subject'), chapter: vis('ta-chapter-opts-container'), count: vis('ta-count'), due: vis('ta-due'), pupils: vis('ta-pupils-list'), difficulty: vis('ta-difficulty'), btn: document.getElementById('ta-build-btn').textContent.trim(), pin: document.querySelector('input[name=ta-share][value=classroom_pin]').checked }; })()`);
    assert(form.classroom && form.share && form.subject && form.chapter && form.count && form.due, 'initial fields visible ' + JSON.stringify(form));
    assert(form.pin, 'a classroom with pupils defaults to PIN entry');
    assert.match(form.btn, /Assign to the whole class/);
    assert(form.pupils && form.difficulty, 'More options reveals pupils and difficulty');
    report('Set Work ' + tag, await evaluate(PROBE)); await shot('create-' + tag);
    // Chrome hides closed <details> content with content-visibility, so the
    // honest check is checkVisibility() plus the details box shrinking to its summary.
    const collapsed = await evaluate(`(() => { const d = document.getElementById('ta-more-options'); d.open = false; const e = document.getElementById('ta-difficulty'); const db = d.getBoundingClientRect(), eb = e.getBoundingClientRect(), sb = d.querySelector('summary').getBoundingClientRect(); return db.height <= sb.height + 6 && (eb.height === 0 || eb.top >= db.bottom - 1); })()`);
    assert(collapsed, 'difficulty hidden until More options is opened');

    await evaluate("TeacherWorkspace.openResults('a1'); true"); await sleep(900);
    const res = await evaluate(`(() => { const w = document.querySelector('.tr-wrap'); const t = w ? w.textContent : ''; return { has: !!w, stats: [...document.querySelectorAll('.tr-stats strong')].map(e => e.textContent), help: document.querySelector('.tr-help')?.textContent || '', groups: [...document.querySelectorAll('.tr-group h4')].map(h => h.textContent.replace(/\\s+/g, ' ').trim()), escaped: w ? w.innerHTML.includes('<b>x</b>') : true, bulk: [...document.querySelectorAll('.tr-bulk button')].map(b => b.disabled) }; })()`);
    assert(res.has, 'results screen rendered');
    assert.deepEqual(res.stats.slice(0, 4), ['3', '2', '0', '1'], 'assigned / completed / in progress / not started');
    assert.match(res.help, /1 pupil struggled with/, 'chapter insight for Ben');
    assert.match(res.help, /1 pupil has not submitted/, 'reminder insight for Chloé');
    assert.match(res.help, /completed very quickly/, 'rushed insight for Ben');
    assert(res.groups.some(g => /May need help 1/.test(g)), 'help group holds one pupil: ' + res.groups.join(' | '));
    assert(!res.escaped, 'pupil names are escaped');
    assert.deepEqual(res.bulk, [false, false], 'remind and more-practice are enabled');
    report('Results ' + tag, await evaluate(PROBE)); await shot('results-' + tag);

    await evaluate("TeacherGuestClasses.openById('c1'); true"); await sleep(1200);
    const ov = await evaluate(`({ open: !document.getElementById('tc-classroom-detail').classList.contains('hidden'), nav: [...document.querySelectorAll('.tc-cd-nav > .tc-cd-nav-btn')].map(b => b.dataset.sec), more: [...document.querySelectorAll('#tc-cd-more-menu [data-sec]')].map(b => b.dataset.sec), stats: [...document.querySelectorAll('.tc-today-stats strong')].map(e => e.textContent), attention: document.querySelector('.tc-today-columns')?.textContent || '' })`);
    assert(ov.open, 'classroom overlay opens from Home data');
    assert.deepEqual(ov.nav, ['overview', 'work', 'pupils', 'materials'], 'four primary classroom sections');
    assert.deepEqual(ov.more, ['results', 'settings']);
    assert.equal(ov.stats[0], '3', 'pupil count');
    assert.match(ov.attention, /Ben|Chloé/, 'needs attention lists a pupil');
    report('Classroom overview ' + tag, await evaluate(PROBE)); await shot('class-overview-' + tag);
    await evaluate("TeacherClassroomDetail.showSection('work'); true"); await sleep(400);
    const work = await evaluate(`({ cards: document.querySelectorAll('#tc-cd-work .tw-card').length, completion: document.querySelector('#tc-cd-work .tw-completion')?.textContent, filters: [...document.querySelectorAll('.tc-work-filter')].map(b => b.textContent.trim()) })`);
    assert.equal(work.cards, 1, 'one active assignment in this classroom');
    assert.equal(work.completion, '2 of 3 completed');
    assert.equal(work.filters.length, 3);
    report('Classroom work ' + tag, await evaluate(PROBE)); await shot('class-work-' + tag);
    await evaluate("TeacherClassroomDetail.setWorkFilter('archived'); true"); await sleep(300);
    assert.equal(await evaluate("document.querySelectorAll('#tc-cd-work .tw-card').length"), 1, 'archived assignment appears under Archived');
    await evaluate("TeacherClassroomDetail.showSection('pupils'); true"); await sleep(400);
    const pupils = await evaluate(`(() => { const rows = [...document.querySelectorAll('.tp-row')]; return { n: rows.length, flags: document.querySelectorAll('.tp-flag').length, pinsHidden: [...document.querySelectorAll('[data-pin-badge]')].every(b => b.classList.contains('hidden')), escaped: !document.getElementById('tc-cd-pupils').innerHTML.includes('<b>x</b>') }; })()`);
    assert.equal(pupils.n, 3); assert(pupils.pinsHidden, 'PINs hidden by default'); assert(pupils.escaped, 'pupil name escaped');
    assert(pupils.flags >= 1, 'a needs-help flag is shown');
    await evaluate("document.querySelector('[data-action=toggle_pin][data-pi=\"1\"]').click(); true"); await sleep(300);
    const pin = await evaluate("({ badge: document.querySelector('[data-pin-badge=\"1\"]').textContent, shown: !document.querySelector('[data-pin-badge=\"1\"]').classList.contains('hidden'), copy: !document.querySelector('[data-action=copy_pin][data-pi=\"1\"]').classList.contains('hidden') })");
    assert.equal(pin.badge, '4821'); assert(pin.shown && pin.copy, 'per-pupil PIN reveal + copy');
    await evaluate("document.getElementById('tc-cd-pupil-search').value = 'ais'; document.getElementById('tc-cd-pupil-search').dispatchEvent(new Event('input')); true");
    assert.equal(await evaluate("[...document.querySelectorAll('.tp-row')].filter(r => !r.hidden).length"), 1, 'roster search filters');
    await evaluate("document.getElementById('tc-cd-pupil-search').value = ''; document.getElementById('tc-cd-pupil-search').dispatchEvent(new Event('input')); true");
    report('Classroom pupils ' + tag, await evaluate(PROBE)); await shot('class-pupils-' + tag);
    await evaluate("TeacherClassroomDetail.toggleMore(true); true"); await sleep(150);
    report('Classroom more ' + tag, await evaluate(PROBE));
    await evaluate("TeacherClassroomDetail.toggleMore(false); TeacherClassroomDetail.openPupil(1); true"); await sleep(300);
    report('Pupil panel ' + tag, await evaluate(PROBE)); await shot('pupil-' + tag);
    await evaluate("TeacherClassroomDetail.closePupil(); true");

    // Refresh restores the classroom + section
    const loc = await evaluate("JSON.parse(localStorage.getItem('psac_teacher_loc_v1'))");
    assert.equal(loc.classId, 'c1'); assert.equal(loc.section, 'pupils'); assert.equal(loc.tab, 'results');
    await evaluate("TeacherClassroomDetail.close(); true");
    assert.equal(await evaluate("JSON.parse(localStorage.getItem('psac_teacher_loc_v1')).classId"), null, 'closing forgets the classroom');
    await evaluate("localStorage.setItem('psac_teacher_loc_v1', JSON.stringify({ owner: 'teacher-1', tab: 'results', classId: 'c1', className: 'Grade 5 Blue', section: 'work', resultsId: 'a1' })); TeacherMode.render(); true"); await sleep(1500);
    const restored = await evaluate("({ open: !document.getElementById('tc-classroom-detail').classList.contains('hidden'), sec: document.querySelector('.tc-cd-nav-btn.tc-cd-nav-active')?.dataset.sec, tab: document.querySelector('#screen-teacher .ta-tab[aria-selected=true]')?.dataset.tab, results: !!document.querySelector('.tr-wrap') })");
    assert(restored.open && restored.sec === 'work' && restored.tab === 'results' && restored.results, 'refresh restores tab, results and classroom: ' + JSON.stringify(restored));
    await evaluate("TeacherClassroomDetail.close(); true");

    // A new per-pupil classroom opens as a short, data-driven setup path,
    // rather than a dashboard full of zeroes and unexplained controls.
    await evaluate("localStorage.removeItem('psac_tc_pref_c2'); TeacherGuestClasses.openById('c2'); true"); await sleep(900);
    const guide = await evaluate(`(() => { const g = document.querySelector('.tc-setup-guide'); return { shown: !!g, steps: document.querySelectorAll('.tc-setup-step').length, current: document.querySelector('.tc-setup-current h4')?.textContent || '', text: g?.textContent || '', stats: document.querySelectorAll('.tc-today-stats').length }; })()`);
    assert(guide.shown, 'new classroom setup guide is shown');
    assert.equal(guide.steps, 3, 'setup guide has three steps');
    assert.match(guide.current, /Replace the 2 numbered pupil names/);
    assert.match(guide.text, /Nothing here creates a pupil account/);
    assert.match(guide.text, /link.*PIN/i);
    assert.equal(guide.stats, 0, 'zero-value command dashboard is hidden during first setup');
    report('New classroom guide ' + tag, await evaluate(PROBE)); await shot('class-guide-' + tag);
    await evaluate("TeacherClassroomDetail.dismissSetupGuide(); true"); await sleep(150);
    assert.equal(await evaluate("document.querySelectorAll('.tc-setup-guide').length"), 0, 'teacher can dismiss the guide');
    assert.equal(await evaluate("document.querySelectorAll('.tc-today-stats').length"), 1, 'full dashboard remains available');
    await evaluate("TeacherClassroomDetail.showSetupGuide(); true"); await sleep(150);
    assert.equal(await evaluate("document.querySelectorAll('.tc-setup-guide').length"), 1, 'teacher can reopen classroom help');
    await evaluate("TeacherClassroomDetail.close(); true");
    const openedAfterCreate = await evaluate(`(async () => { const original = TeacherGuestClasses.openById; let opened = ''; TeacherGuestClasses.openById = id => { opened = id; }; NewClassroomForm.open(); document.getElementById('ncf-name').value = 'New Year 5'; document.getElementById('ncf-count').value = '12'; await NewClassroomForm._submit(); TeacherGuestClasses.openById = original; return opened; })()`, true);
    assert.equal(openedAfterCreate, 'c-new', 'new classroom opens automatically after creation');

    // Success screen after publishing
    await evaluate("TeacherMode.switchTab('create'); true"); await sleep(300);
    await evaluate(`(() => { const m = document.getElementById('modal-share-assignment'); const set = id => { const e = document.getElementById(id); if (e) e.textContent = 'x'; }; TeacherMode.__test = true; return true; })()`);
    await evaluate("(() => { window.__toasts = []; if (!window.__toastWrapped) { window.__toastWrapped = true; (() => { const _t = toast; toast = (m, d) => { window.__toasts.push(m); _t(m, d); }; })(); } document.getElementById('ta-grade').value = '5'; TeacherMode.gradeChange(); document.getElementById('ta-subject').value = 'grade5-maths'; TeacherMode.subjectChange(); const pk = SUBJECT_PACKS.find(p => p.id === 'grade5-maths'); const ch = pk._chapters[0].id; STATIC_QUESTIONS.push(...Array.from({length: 12}, (_, i) => ({ id: 'g5m-' + ch + '-' + String(100 + i), chapterId: ch, difficulty: 1 + (i % 4) }))); TeacherMode.chooseClassroom('c1'); const cb = document.querySelector('#ta-chapter-opts-container input[value=\"' + ch + '\"]'); if (cb) cb.checked = true; return true; })()");
    await evaluate("TeacherMode.buildAssignment()", true); await sleep(500);
    const success = await evaluate(`({ shown: !document.getElementById('modal-share-assignment').classList.contains('hidden'), title: document.getElementById('ta-share-title').textContent, cls: document.getElementById('ta-share-class').textContent, due: document.getElementById('ta-share-due').textContent, link: document.getElementById('ta-share-link').value, view: !!document.getElementById('ta-share-view'), call: window.__calls.filter(c => c[0] === 'teacher_guest_create_assignment').pop() })`);
    assert(success.shown, 'success screen opens; toasts: ' + JSON.stringify(await evaluate('window.__toasts'))); assert.equal(success.cls, 'Grade 5 Blue'); assert(success.link.endsWith('/a/NEW999'), 'link: ' + success.link);
    assert(/[A-Za-z]{3} \d+ [A-Za-z]{3}/.test(success.due), 'due date shown: ' + success.due);
    assert.equal(success.call[1].p_access, 'classroom_pin'); assert.equal(success.call[1].p_classroom, 'c1'); assert.match(success.call[1].p_due_at, /T/, 'due date sent to the server');
    report('Success screen ' + tag, await evaluate(PROBE)); await shot('success-' + tag);
    await evaluate("TeacherMode.closeShare(); true");
  }
  console.log(`\nTeacher command centre: ${checks - failures}/${checks} measured screens clean across 360px/1280px × light/dark.`);
  if (failures) { console.error(`${failures} screen(s) failed measurement.`); process.exitCode = 1; }
})().catch(e => { console.error(e); if (pageErrorsRef.length) console.error('Page errors:\n' + pageErrorsRef.slice(-8).join('\n')); process.exitCode = 1; }).finally(() => { ws?.close(); chrome?.kill(); server.close(); });
