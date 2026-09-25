'use strict';
// What the activity trail records, and for whom.
//
// WHY THIS EXISTS — asked for from the app:
//   "I want to know if parents actually switched to kid mode (from which
//    account), kid clicked chapter practice, and from there didn't click
//    anything."
//
// Both halves of that are easy to get wrong in a way no screen would show:
//
// ⚠ WHO IS HOLDING THE DEVICE AND WHOSE SCREENS THEY ARE IS NOT ONE COLUMN. A
//   parent opening a child from the dashboard is actor_kind 'parent' WITH
//   as_student set. Collapsing the two would file a parent's browsing as the
//   child's own work - the opposite of the answer being asked for.
// ⚠ THE TOKEN IS WHAT TELLS THE TWO APART. auth.js mints an x-student-token for
//   a PIN sign-in and deliberately none for a parent preview, so "is there a
//   token" is the whole test. There is no other signal.
// ⚠ A SCREEN WITH NO DEPARTURE IS THE ANSWER, not a lost row.
//
//   node scripts/test-activity-log.js

const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const SRC = fs.readFileSync('engine/activity.js', 'utf8').replace(/\r/g, '');

let checks = 0;
const ok = (label, cond, detail) => {
  assert(cond, label + (detail !== undefined ? ' — ' + JSON.stringify(detail) : ''));
  checks++; console.log('✓ ' + label);
};

// One booted module with every global it reads under test control.
function boot({ studentId = null, token = null, parentId = null, insertFails = false } = {}) {
  const sent = [];        // batches handed to PostgREST
  const selects = [];     // any .select() on an insert - must stay empty
  const listeners = {};
  const keepalive = [];   // what the page-hide path actually sent
  let clock = 0;

  const insertChain = rows => {
    const p = Promise.resolve(insertFails ? { error: { code: '42501' } } : { error: null });
    // ⚠ A thenable that ALSO offers .select(): if the module ever asks for its
    //   row back, PostgREST emits RETURNING, which is checked against the
    //   admin-only SELECT policy and refuses every child's insert. The test
    //   has to be able to SEE that call, not just hope it is absent.
    p.select = () => { selects.push(rows.length); return p; };
    sent.push(rows);
    return p;
  };

  const ctx = {
    console,
    JSON, Promise, Object, Math, Number, String, Array, Date,
    performance: { now: () => clock },
    setInterval: () => 0,
    setTimeout,
    // ⚠ THE HIDE PATH DOES NOT GO THROUGH supabase-js. A page being hidden
    //   cannot await anything, so activity.js posts with fetch(keepalive:true)
    //   and hand-built headers. A test that only watched .insert() would call
    //   the last screen of every session "lost" when it is right here.
    fetch: (url, init) => {
      try { sent.push(JSON.parse(init.body)); } catch (_) {}
      keepalive.push({ url, headers: (init && init.headers) || {}, keepalive: !!(init && init.keepalive) });
      return Promise.resolve({ ok: true });
    },
    SB_URL: 'https://example.supabase.co',
    SB_KEY: 'anon-key',
    ACTIVE_STUDENT_ID: studentId,
    getStudentToken: () => token,
    Auth: { getParentUserId: () => parentId },
    Events: { on(evt, fn) { (listeners[evt] ||= []).push(fn); } },
    _sb: {
      from: () => ({ insert: insertChain }),
      auth: { getSession: async () => ({ data: { session: { access_token: 'jwt' } } }) },
    },
    document: { addEventListener: (t, fn) => { (listeners[t] ||= []).push(fn); }, visibilityState: 'visible' },
    window: { addEventListener: (t, fn) => { (listeners[t] ||= []).push(fn); } },
  };
  vm.createContext(ctx);
  vm.runInContext(SRC, ctx, { filename: 'engine/activity.js' });
  // ⚠ A top-level `const` in a classic script is a LEXICAL binding, not a
  //   property of the global object - ctx.Activity is undefined and the module
  //   is reached the same way the browser reaches it: through window.
  return {
    A: ctx.window.Activity, ctx, sent, selects, listeners, keepalive,
    tick: ms => { clock += ms; },
    answer: () => (listeners.answer || []).forEach(fn => fn({ correct: true })),
    hide: () => { ctx.document.visibilityState = 'hidden'; (listeners.visibilitychange || []).forEach(fn => fn()); },
    show: () => { ctx.document.visibilityState = 'visible'; (listeners.visibilitychange || []).forEach(fn => fn()); },
  };
}

// Reading the buffer without an export: force a flush and read what was sent.
async function drain(t) { await t.A.flush(); return t.sent.flat(); }

(async () => {
  console.log('Activity trail\n');

  // 1 · Signed out is silent. RLS would refuse the row anyway; buffering it
  //     would only mean inserting it later under whoever signs in NEXT.
  {
    const t = boot({});
    t.A.screen('practice-hub');
    t.A.log('chapter_open', 'fractions');
    const rows = await drain(t);
    ok('nothing is recorded when nobody is signed in', rows.length === 0, rows);
  }

  // 2 · A signed-in child.
  {
    const t = boot({ studentId: 'kid-1', token: 'tok-abc' });
    t.A.screen('practice');
    const rows = await drain(t);
    ok('a child\'s own screens are filed as the child',
      rows.length === 1 && rows[0].actor_kind === 'student'
      && rows[0].actor_id === 'kid-1' && rows[0].as_student === 'kid-1', rows);
  }

  // 3 · ⚠ THE REPORTED REQUIREMENT. A parent in kid mode: their id, the
  //     child's screens. No token, because auth.js mints none for a preview.
  {
    const t = boot({ studentId: 'kid-1', parentId: 'parent-9' });
    t.A.log('switch_to_kid', 'kid-1');
    t.A.screen('student-home');
    const rows = await drain(t);
    ok('kid mode says WHICH parent and WHICH child',
      rows.every(r => r.actor_kind === 'parent' && r.actor_id === 'parent-9' && r.as_student === 'kid-1'), rows);
    ok('and the switch itself is an event', rows[0].kind === 'switch_to_kid', rows[0]);
  }

  // 4 · Time on a screen, and what was answered on it.
  {
    const t = boot({ studentId: 'kid-1', token: 'tok' });
    t.A.screen('practice');
    t.answer(); t.answer(); t.answer();
    t.tick(95000);
    t.A.screen('student-home');
    const rows = await drain(t);
    const end = rows.find(r => r.kind === 'screen_end');
    ok('leaving a screen records how long it held them',
      end && end.ref === 'practice' && end.meta.ms === 95000, end);
    ok('and how many questions were answered on it', end.meta.answers === 3, end.meta);
    const next = rows[rows.length - 1];
    ok('the answer count resets on the next screen', next.kind === 'screen' && next.ref === 'student-home', next);
  }

  // 5 · ⚠ THE CASE THE FEATURE WAS ASKED FOR. Opened a chapter, did nothing.
  {
    const t = boot({ studentId: 'kid-1', token: 'tok' });
    t.A.screen('practice');
    t.tick(240000);
    t.hide();
    const rows = await drain(t);
    const end = rows.find(r => r.kind === 'screen_end');
    ok('four minutes on practice with no answers is recorded as exactly that',
      end && end.meta.ms === 240000 && end.meta.answers === 0, end && end.meta);
    ok('and closing the app is its own event', rows.some(r => r.kind === 'page_hide'), rows.map(r => r.kind));
    // ⚠ The hide post is hand-built, so it can silently omit the ONE header
    //   RLS resolves a child by. Without it the batch is refused and the end
    //   of every session is lost - the rows most worth having.
    const beacon = t.keepalive[0] || { headers: {} };
    ok('the hide post carries the student token and is keepalive',
      beacon.headers['x-student-token'] === 'tok' && beacon.keepalive === true, beacon);
  }

  // 6 · Coming back is a new arrival, not a continuation - otherwise a phone
  //     left in a pocket overnight reads as an eight-hour study session.
  {
    const t = boot({ studentId: 'kid-1', token: 'tok' });
    t.A.screen('practice');
    t.tick(1000); t.hide();
    t.tick(3600000); t.show();
    t.tick(2000); t.A.screen('student-home');
    const rows = await drain(t);
    const ends = rows.filter(r => r.kind === 'screen_end');
    ok('a session resumed after an hour is two visits, not one long one',
      ends.length === 2 && ends[0].meta.ms === 1000 && ends[1].meta.ms === 2000, ends.map(e => e.meta.ms));
  }

  // 7 · Repainting a screen is not moving to it.
  {
    const t = boot({ studentId: 'kid-1', token: 'tok' });
    t.A.screen('practice'); t.A.screen('practice'); t.A.screen('practice');
    const rows = await drain(t);
    ok('a repaint of the same screen is not a second visit', rows.length === 1, rows.map(r => r.kind));
  }

  // 8 · ⚠ The insert must never ask for its row back - see the header.
  {
    const t = boot({ studentId: 'kid-1', token: 'tok' });
    for (let i = 0; i < 12; i++) t.A.log('screen', 's' + i);
    await new Promise(r => setTimeout(r, 0));
    await t.A.flush();
    ok('rows are inserted without select() - RETURNING would hit the admin-only read policy',
      t.selects.length === 0, t.selects);
    ok('a full buffer flushes on its own', t.sent.length >= 1, t.sent.map(b => b.length));
  }

  // 9 · A rejected batch is dropped rather than retried for ever: the usual
  //     cause is a tab that signed out, and nothing it holds will ever be
  //     accepted.
  {
    const t = boot({ studentId: 'kid-1', token: 'tok', insertFails: true });
    for (let i = 0; i < 5; i++) t.A.log('screen', 's' + i);
    await t.A.flush(); await t.A.flush(); await t.A.flush();
    ok('a batch the server keeps refusing is given up on, not looped',
      t.A._state().buffered === 0, t.A._state());
  }

  // 10 · The buffer is bounded when the network is gone.
  {
    const t = boot({ studentId: 'kid-1', token: 'tok', insertFails: true });
    for (let i = 0; i < 600; i++) t.A.log('screen', 's' + i);
    ok('an offline buffer cannot grow without limit', t.A._state().buffered <= 200, t.A._state());
  }

  // 11 · The kill switch stops it dead.
  {
    const t = boot({ studentId: 'kid-1', token: 'tok' });
    t.A.setEnabled(false);
    t.A.screen('practice');
    const rows = await drain(t);
    ok('setEnabled(false) records nothing at all', rows.length === 0, rows);
  }

  // 12 · ⚠ MEASURED AGAINST PRODUCTION, NOT REASONED. PostgREST rejects a
  //      batch whose objects do not all carry the SAME keys - PGRST102, "All
  //      object keys must match", 400, the whole batch - and activity.js
  //      swallows its errors by design, so the only symptom would be a trail
  //      that quietly stopped. One row without `meta` beside one with it is
  //      all it takes.
  {
    const t = boot({ studentId: 'kid-1', token: 'tok' });
    t.A.screen('practice');                                     // no meta
    t.tick(1000);
    t.A.screen('student-home');                                 // screen_end WITH meta
    t.A.log('chapter_open', 'fractions', { pack: 'grade5-maths' });
    await t.A.flush();
    const batch = t.sent[0] || [];
    const shape = JSON.stringify(Object.keys(batch[0] || {}).sort());
    ok('every row in a batch carries the same keys (PGRST102 rejects the whole batch otherwise)',
      batch.length >= 3 && batch.every(r => JSON.stringify(Object.keys(r).sort()) === shape),
      batch.map(r => Object.keys(r).sort().join('|')));
  }

  console.log('\nActivity trail: ' + checks + ' checks passed.');
})().catch(e => { console.error('\n✗ ' + e.message); process.exit(1); });
