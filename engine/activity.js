'use strict';
// ══════════════════════════════════════════════
//  Activity trail — what a child or a parent actually did, and for how long.
//
//  Reads back in Admin › Activity. Nothing in this file is a feature for the
//  person using the app: it answers one question for the people running it -
//  "they opened chapter practice and then did nothing" - which no other table
//  in this project can answer. login_events stops at the sign-in,
//  student_point_events starts at a first correct answer, and the space
//  between them was invisible.
//
//  ⚠ A SCREEN IS TWO ROWS: 'screen' when it opens, 'screen_end' when it is
//    left, carrying { ms, answers }. An arrival with NO departure is not a
//    dropped row - it is a child who closed the app on that screen, which is
//    the drop-off the whole feature exists to show.
//
//  ⚠ DURATIONS COME FROM performance.now(), WHICH IS MONOTONIC. A device clock
//    is never trusted here (see _muDayKey elsewhere in this project for the
//    same rule): a clock that jumps mid-session would otherwise produce a
//    negative lesson or a four-hour one. `created_at` is stamped by the
//    database trigger, so ordering and retention do not depend on the device
//    at all.
//
//  ⚠ INSERT WITHOUT .select(). PostgREST emits RETURNING for
//    `.insert().select()`, and a RETURNING statement is checked against the
//    SELECT policy - which on activity_events is is_admin(). Asking for the
//    row back would make every child's insert fail with a 42501 that names the
//    wrong half of the policy. See docs/claude/database.md rule 2.
//
//  ⚠ NOTHING HERE MAY THROW INTO A CALLER OR BLOCK ONE. It is instrumentation
//    hanging off showScreen() and the login path; a failure to record must
//    cost the child nothing at all.
// ══════════════════════════════════════════════

const Activity = (() => {
  // A batch is one request, not one per tap. 10 keeps a lost tab cheap; the
  // page-hide flush below is what actually closes most sessions.
  const FLUSH_AT   = 10;
  const MAX_BUFFER = 200;    // a memory guard, not a quota - see _drop()
  const MAX_ROWS   = 50;     // per request
  const TICK_MS    = 20000;
  const GIVE_UP    = 3;      // consecutive rejections before the buffer is dropped

  let _buf      = [];
  let _screen   = null;      // { id, at }
  let _lastId   = null;      // to resume after the tab comes back
  let _answers  = 0;
  let _flushing = false;
  let _fails    = 0;
  let _jwt      = null;      // last seen parent access token, for the hide flush
  let _on       = true;

  const _now = () => (typeof performance !== 'undefined' && performance.now)
    ? performance.now() : Date.now();

  // ⚠ ACTIVE_STUDENT_ID is a script-scoped `let` in app.js, not a window
  //   property, and a `typeof` on a binding still in its TDZ THROWS rather than
  //   answering 'undefined' - which is why every read here is wrapped.
  function _safe(fn, fallback) {
    try { return fn(); } catch (_) { return fallback; }
  }

  // Who is holding the device, and whose screens are on it. Those are two
  // different things and the second one is the whole point: a parent in kid
  // mode is actor_kind 'parent' WITH as_student set.
  function _actor() {
    const studentId = _safe(() => (typeof ACTIVE_STUDENT_ID !== 'undefined' ? ACTIVE_STUDENT_ID : null), null);
    const token     = _safe(() => (typeof getStudentToken === 'function' ? getStudentToken() : null), null);
    const parentId  = _safe(() => (typeof Auth !== 'undefined' && Auth.getParentUserId ? Auth.getParentUserId() : null), null);
    // A real child session carries the x-student-token; a parent previewing a
    // child does not (auth.js mints none on purpose), so the token is what
    // tells a sign-in from kid mode.
    if (studentId && token) return { actor_kind: 'student', actor_id: studentId, as_student: studentId };
    if (parentId)           return { actor_kind: 'parent',  actor_id: parentId,  as_student: studentId || null };
    return null;   // signed out: RLS would refuse the row anyway
  }

  function log(kind, ref, meta) {
    if (!_on || !kind) return;
    const who = _actor();
    if (!who) return;
    // ⚠ EVERY ROW CARRIES EVERY KEY, null included. PostgREST rejects a batch
    //   whose objects do not all have the SAME keys - "All object keys must
    //   match", PGRST102, 400, the WHOLE batch - and measured against
    //   production that is exactly what happens when one row omits `meta` and
    //   the next one has it. Nothing here would have shown it: the error is
    //   swallowed on purpose (instrumentation must not cost the child
    //   anything), so the trail would simply have gone quiet.
    _buf.push({
      actor_kind: who.actor_kind,
      actor_id:   who.actor_id,
      as_student: who.as_student,
      kind:       String(kind).slice(0, 40),
      ref:        ref == null ? null : String(ref).slice(0, 120),
      meta:       meta && typeof meta === 'object' ? meta : null,
    });
    // ⚠ Drops the OLDEST. A buffer this deep means the network is gone; the
    //   recent trail is worth more than the start of a session nobody can read.
    if (_buf.length > MAX_BUFFER) _buf.splice(0, _buf.length - MAX_BUFFER);
    if (_buf.length >= FLUSH_AT) flush();
  }

  // Called by showScreen(). Repainting the same screen is not a move.
  function screen(id) {
    if (!id || (_screen && _screen.id === id)) return;
    endScreen();
    _screen  = { id, at: _now() };
    _lastId  = id;
    _answers = 0;
    log('screen', id);
  }

  function endScreen(extra) {
    if (!_screen) return;
    const ms = Math.max(0, Math.round(_now() - _screen.at));
    const meta = { ms, answers: _answers };
    if (extra && typeof extra === 'object') Object.assign(meta, extra);
    log('screen_end', _screen.id, meta);
    _screen  = null;
    _answers = 0;
  }

  async function flush() {
    if (_flushing || !_buf.length) return;
    const sb = _safe(() => (typeof _sb !== 'undefined' ? _sb : null), null);
    if (!sb) return;
    _flushing = true;
    const rows = _buf.slice(0, MAX_ROWS);
    try {
      const { error } = await sb.from('activity_events').insert(rows);   // ⚠ no .select()
      if (error) {
        // A rejected batch is usually RLS answering "you are not who you say
        // you are" - a signed-out tab still holding rows. Retrying it for ever
        // would be a loop nobody watches.
        if (++_fails >= GIVE_UP) { _buf = []; _fails = 0; }
      } else {
        _buf = _buf.slice(rows.length);
        _fails = 0;
      }
      const s = await sb.auth.getSession();
      _jwt = s?.data?.session?.access_token || null;
    } catch (_) {
      if (++_fails >= GIVE_UP) { _buf = []; _fails = 0; }
    } finally {
      _flushing = false;
    }
  }

  // ⚠ A page being hidden cannot await anything - supabase-js would be torn
  //   down mid-promise. keepalive:true is the one send that survives, and it
  //   needs the headers built by hand: _sbFetch is not in play here.
  function _flushKeepalive() {
    if (!_buf.length) return;
    const url = _safe(() => (typeof SB_URL !== 'undefined' ? SB_URL : null), null);
    const key = _safe(() => (typeof SB_KEY !== 'undefined' ? SB_KEY : null), null);
    if (!url || !key) return;
    const rows = _buf.slice(0, MAX_ROWS);
    _buf = _buf.slice(rows.length);
    const headers = {
      'Content-Type':  'application/json',
      apikey:          key,
      Authorization:   'Bearer ' + (_jwt || key),
      Prefer:          'return=minimal',
    };
    const token = _safe(() => (typeof getStudentToken === 'function' ? getStudentToken() : null), null);
    if (token) headers['x-student-token'] = token;
    try {
      fetch(url + '/rest/v1/activity_events', {
        method: 'POST', headers, body: JSON.stringify(rows), keepalive: true,
      }).catch(() => {});
    } catch (_) {}
  }

  function _init() {
    // Answers are counted from the event bus rather than from the practice
    // code, so nothing in the question path had to change to support this.
    _safe(() => { if (typeof Events !== 'undefined') Events.on('answer', () => { _answers++; }); });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        endScreen({ hidden: true });
        log('page_hide', _lastId);
        _flushKeepalive();
      } else if (!_screen && _lastId) {
        // Coming back is a fresh arrival, and saying so is what keeps the two
        // halves of a resumed session from reading as one long unbroken hour.
        screen(_lastId);
      }
    });
    window.addEventListener('pagehide', () => { endScreen({ hidden: true }); _flushKeepalive(); });
    setInterval(flush, TICK_MS);
  }

  if (typeof document !== 'undefined') _init();

  return {
    log, screen, endScreen, flush,
    // Sign-out flushes what is left before the credentials go away: the rows
    // are inserted as the actor who made them and cannot be filed afterwards.
    async signOut(kind) {
      endScreen();
      log(kind || 'signout', _lastId);
      await flush();
      _lastId = null;
    },
    // Test seam and a kill switch - an admin turning this off should not need
    // a deploy.
    setEnabled(on) { _on = !!on; if (!_on) _buf = []; },
    _state() { return { buffered: _buf.length, screen: _screen && _screen.id, answers: _answers }; },
  };
})();
if (typeof window !== 'undefined') window.Activity = Activity;
