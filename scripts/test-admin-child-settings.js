'use strict';
// Admin › Members › a child's ⚙️ Settings, in a real browser at 360px, with the
// Supabase client stubbed.
//
// Asserted: the panel says in plain words what is not at its default; the
// "why can or can't they see it" list names EVERY layer closing a chapter; a
// toggle sends exactly one key to admin_patch_student_settings (never the whole
// settings object) with the typed reason; a refused patch repaints the control
// back to what the server holds; a non-super admin gets disabled controls; an
// authored display name cannot run script; and nothing protrudes past a 360px
// phone.
//
// Run:  CHROME_PATH=<Chrome for Testing> node scripts/test-admin-child-settings.js
// ⚠ Served over file:// (Chrome for Testing here cannot reach 127.0.0.1), and
//   the page target's URL is asserted before anything is driven.
const http = require('node:http'), fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const DBG = 9394;
const PAGE = pathToFileURL(path.join(ROOT, 'index.html')).href;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) => http.get(u, r => { let s = ''; r.on('data', v => s += v); r.on('end', () => { try { res(JSON.parse(s)); } catch (e) { rej(e); } }); }).on('error', rej));
let checks = 0, failed = 0;
const ok = (label, cond, detail) => { if (cond) { checks++; console.log('OK   ' + label); } else { failed++; console.log('FAIL ' + label + (detail !== undefined ? ' -- ' + JSON.stringify(detail) : '')); } };

(async () => {
  if (!process.env.CHROME_PATH) { console.log('Set CHROME_PATH to a Chrome for Testing binary (the installed Chrome cannot be driven headless here).'); process.exit(2); }
  const chrome = spawn(process.env.CHROME_PATH, [
    '--headless=new', '--remote-debugging-port=' + DBG,
    '--user-data-dir=' + fs.mkdtempSync(path.join(os.tmpdir(), 'psac-childsettings-')),
    '--allow-file-access-from-files', '--no-first-run', '--hide-scrollbars', 'about:blank',
  ], { stdio: 'ignore' });
  const quit = code => { try { chrome.kill(); } catch (_) {} process.exit(code); };
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
  await call('Page.enable'); await call('Runtime.enable');
  await call('Emulation.setDeviceMetricsOverride', { width: 360, height: 780, deviceScaleFactor: 2, mobile: true });
  const ev = async expr => {
    const r = await call('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(String(r.exceptionDetails.exception && r.exceptionDetails.exception.description || r.exceptionDetails.text).slice(0, 400));
    return r.result.value;
  };

  await call('Page.navigate', { url: PAGE });
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) { await sleep(500); try { ready = await ev("document.readyState === 'complete' && typeof RoleModules !== 'undefined' && typeof _sb !== 'undefined' && typeof SupportSettings !== 'undefined'"); } catch (_) {} }
  const url = await ev('location.href');
  if (!url.startsWith('file:')) { console.log('REFUSING: the page target is ' + url + ', not the file we navigated to.'); quit(1); }
  ok('app loaded, SupportSettings present', ready === true);
  await sleep(1500);

  const loaded = await ev(`new Promise(res => {
    RoleModules.withGroup('admin', () => res(typeof AdminPanel !== 'undefined'));
    setTimeout(() => res(typeof AdminPanel !== 'undefined'), 8000);
  })`);
  ok('the admin module loads', loaded === true);

  // A real Grade 5 maths chapter pair from the generated index: one locked by
  // the parent, one switched off site-wide.
  const chapters = await ev(`(() => {
    const p = SUBJECT_PACKS.find(x => x.id === 'grade5-maths');
    const list = (p && (p._chapters || p.chapters)) || [];
    return list.slice(0, 3).map(c => c.id);
  })()`);
  ok('grade5-maths has chapters to test with', chapters.length >= 3, chapters);
  const [LOCKED, KILLED] = chapters;

  await ev(`(() => {
    const P1 = '00000000-0000-4000-8000-00000000000a', S1 = '00000000-0000-4000-8000-00000000000b';
    window.__P1 = P1; window.__S1 = S1;
    window.__rpc = []; window.__refuse = null; window.__toasts = [];
    const origToast = window.toast;
    window.toast = (m, d) => { window.__toasts.push(m); try { origToast && origToast(m, d); } catch (_) {} };
    window.__kid = { id: S1, display_name: 'Kim <img src=x onerror="window.__xss=1">', username: 'kim', grade: 5,
      session_version: 0, expires_at: null, created_at: '2026-01-01T00:00:00Z',
      settings: { examDisabled: true, maxDifficulty: 2, lockedChapters: [${JSON.stringify(LOCKED)}] } };
    const tables = {
      profiles: [{ id: P1, full_name: 'Pam Parent', role: 'parent', is_super_admin: false, disabled: false,
        expires_at: null, created_at: '2026-01-01T00:00:00Z', teacher_status: 'none', referral_code: null,
        credits: 0, blocked_until: null }],
      families: [{ id: 'fam-1', parent_id: P1 }],
      students: [window.__kid],
      student_progress: [], chapter_entitlements: [], admin_actions: [], subscriptions: [],
      plans: [{ id: 'free', name: 'Free', price_mur: 0, features: { allowed_chapters: null } }],
      mm_data: [{ value: { disabled_grades: [], disabled_subjects: [], disabled_chapters: [${JSON.stringify(KILLED)}],
                           plan_enforcement_enabled: false } }],
    };
    _sb.from = table => {
      let single = false;
      const q = {
        then(res, rej) {
          const rows = tables[table] || [];
          const out = single ? { data: rows[0] || null, error: null } : { data: rows, count: rows.length, error: null };
          return Promise.resolve(out).then(res, rej);
        },
      };
      ['select','in','order','or','eq','ilike','is','limit','neq','not','gte','lte','filter','match','range']
        .forEach(m => { q[m] = () => q; });
      q.maybeSingle = () => { single = true; return q; }; q.single = q.maybeSingle;
      q.update = () => { window.__rpc.push({ name: 'DIRECT UPDATE ' + table }); return q; };
      return q;
    };
    _sb.rpc = async (name, args) => {
      window.__rpc.push({ name, args: JSON.parse(JSON.stringify(args || {})) });
      if (name === 'admin_patch_student_settings') {
        if (window.__refuse) return { data: { ok: false, error: window.__refuse }, error: null };
        const s = Object.assign({}, window.__kid.settings);
        Object.entries(args.p_patch).forEach(([k, v]) => { if (v === null) delete s[k]; else s[k] = v; });
        window.__kid.settings = s;
        return { data: { ok: true, changed: true, settings: s }, error: null };
      }
      return { data: { ok: true }, error: null };
    };
    Auth.isSuperAdmin = () => true;
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    for (let n = document.getElementById('admin-members-list'); n; n = n.parentElement) n.classList.remove('hidden');
    return true;
  })()`);

  await ev('AdminPanel.loadMembers(1)');
  await ev(`(async () => { AdminPanel.toggleMemberRow(window.__P1); await AdminPanel.toggleChildren(window.__P1); await new Promise(r => setTimeout(r, 200)); return true; })()`);
  ok('the child is listed with a ⚙️ Settings button', await ev(`!!document.querySelector('[onclick*="toggleChildSettings"]')`));
  await ev(`AdminPanel.toggleChildSettings(window.__P1, window.__S1)`);
  await sleep(200);

  const panelText = () => ev(`(document.getElementById('child-settings-' + window.__S1) || {}).textContent || ''`);
  let t = await panelText();
  ok('the settings panel opens', t.length > 0);
  ok('it says exam mode is switched off', t.includes('Exam mode is switched off'), t.slice(0, 300));
  ok('it names the difficulty cap in words', t.includes('Questions stop at Level 2 (Medium)'));
  ok('it counts the parent\'s lock', t.includes('1 chapter locked by the parent'));
  ok('the "why" list is there', t.includes('Why can or can’t they see it?'));
  ok('Grade 5 Mathematics reports 2 closed chapters (a lock and a kill switch)', /2 of \d+ closed/.test(t), t.match(/closed|all open/g));
  ok('the kill-switched chapter says why', t.includes('This chapter is switched off site-wide'));
  ok('the locked chapter says why', t.includes('Locked by the parent'));
  ok('an authored display name did not run', (await ev('window.__xss')) === undefined || (await ev('window.__xss')) === null);

  // ── A toggle sends ONE key, with the reason, through the RPC
  await ev(`(() => { const i = document.getElementById('child-reason-' + window.__S1); i.value = 'Mum rang 11 Sep'; return true; })()`);
  await ev(`(() => { const box = [...document.querySelectorAll('#child-settings-' + window.__S1 + ' input[type=checkbox]')]
      .find(b => b.getAttribute('onchange').includes('examDisabled')); box.click(); return true; })()`);
  await sleep(300);
  let last = await ev('window.__rpc.filter(r => r.name === "admin_patch_student_settings").pop()');
  ok('turning exam mode on sends exactly { examDisabled: false }', last && JSON.stringify(last.args.p_patch) === '{"examDisabled":false}', last);
  ok('the typed reason travels with it', last && last.args.p_reason === 'Mum rang 11 Sep', last && last.args.p_reason);
  t = await panelText();
  ok('the panel repaints from the server\'s answer', !t.includes('Exam mode is switched off'));
  ok('admin.js never wrote students directly', !(await ev('window.__rpc.some(r => /DIRECT UPDATE/.test(r.name))')));

  // ── Unlock the chapter the parent locked
  await ev(`(() => { const box = [...document.querySelectorAll('#child-settings-' + window.__S1 + ' input[type=checkbox]')]
      .find(b => b.getAttribute('onchange').includes(${JSON.stringify(LOCKED)})); box.click(); return true; })()`);
  await sleep(300);
  last = await ev('window.__rpc.filter(r => r.name === "admin_patch_student_settings").pop()');
  ok('unlocking sends lockedChapters without it', last && JSON.stringify(last.args.p_patch) === '{"lockedChapters":[]}', last);
  t = await panelText();
  ok('only the kill switch still closes a chapter now', /1 of \d+ closed/.test(t), t.match(/\d+ of \d+ closed|all open/g));

  // ── A refusal repaints the control back
  await ev(`window.__refuse = 'not_authorised'; true`);
  await ev(`(() => { const box = [...document.querySelectorAll('#child-settings-' + window.__S1 + ' input[type=checkbox]')]
      .find(b => b.getAttribute('onchange').includes('hintsDisabled')); box.click(); return true; })()`);
  await sleep(300);
  const hintsChecked = await ev(`[...document.querySelectorAll('#child-settings-' + window.__S1 + ' input[type=checkbox]')]
      .find(b => b.getAttribute('onchange').includes('hintsDisabled')).checked`);
  ok('a refused change leaves the box showing what the server holds (hints still on)', hintsChecked === true);
  ok('and says why', (await ev('window.__toasts.slice(-1)[0] || ""')).includes('Only a super admin'), await ev('window.__toasts.slice(-3)'));
  await ev(`window.__refuse = null; true`);

  // ── 360px: nothing inside the panel protrudes (details opened so every row is measured)
  const geo = await ev(`(() => {
    const panel = document.getElementById('child-settings-' + window.__S1);
    panel.querySelectorAll('details').forEach(d => { d.open = true; });
    const r = [...panel.querySelectorAll('*')].map(e => e.getBoundingClientRect()).filter(b => b.width > 0);
    return { maxRight: Math.max(...r.map(b => b.right)), vw: innerWidth, n: r.length };
  })()`);
  ok('nothing in the panel protrudes past a 360px phone', geo.maxRight <= geo.vw + 0.5, geo);

  // ── A plain admin sees the answers, but cannot change anything
  await ev(`Auth.isSuperAdmin = () => false; AdminPanel.toggleChildSettings(window.__P1, window.__S1); AdminPanel.toggleChildSettings(window.__P1, window.__S1)`);
  await sleep(300);
  const plain = await ev(`(() => {
    const panel = document.getElementById('child-settings-' + window.__S1);
    const inputs = [...panel.querySelectorAll('input, select')];
    return { all: inputs.length, disabled: inputs.filter(i => i.disabled).length, note: panel.textContent.includes('Only a super admin can change these.') };
  })()`);
  ok('a plain admin gets every control disabled, and is told why', plain.all > 0 && plain.disabled === plain.all && plain.note, plain);

  console.log('\n' + checks + ' passed, ' + failed + ' failed');
  ws.close();
  quit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
