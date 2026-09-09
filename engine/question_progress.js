'use strict';
// ══════════════════════════════════════════════
//  PSAC Exam Practice - per-question progress: cache, queue and sync
//  The browser half of migrations/20260908_chapter_question_progress.sql.
//
//  Uses _sb (global from supabase.js). The child's x-student-token is already
//  attached by that layer, and record_question_progress() derives the student
//  from it, so nothing here sends a student id for an ordinary child session.
//
//  WHY A QUEUE AND NOT A DIRECT WRITE
//  A child answers a question every few seconds, often on a phone that drops
//  its connection mid-lesson. Writing straight through would either block the
//  next question on a round trip or lose the answer. Answers are therefore
//  appended to a durable local queue, flushed in batches, and only removed once
//  the server has confirmed them. A confirmation is never assumed.
//
//  ⚠ EVERY QUEUED ANSWER CARRIES AN eventKey. record_question_progress()
//    ignores a repeat of the same key, so a retry after an ambiguous failure
//    cannot count the answer twice. Without it, "did that save?" has no safe
//    answer and the honest choice would be to drop the write.
//
//  ⚠ THE LOCAL CACHE IS A CACHE, NOT A SECOND SOURCE OF TRUTH. The database
//    owns per-question state. This module applies the same transition locally
//    so the UI can react at once (PracticeSelector.nextState mirrors the SQL),
//    then reconciles from the server on the next chapter load. Where the two
//    disagree, the server wins.
//
//  ⚠ Assignment and guest work never reaches here - app.js returns from
//    recordAnswer() before this is called when ASSIGNMENT_MODE is set, exactly
//    as it already does for chapter aggregates.
// ══════════════════════════════════════════════

const QuestionProgress = (() => {

  const QUEUE_KEY = 'psac_qprog_queue_v1';
  const MAX_QUEUE = 500;          // ~an hour of solid practice; beyond this the
                                  // oldest are dropped rather than growing forever
  const BATCH = 50;               // the RPC refuses more than 100 per call
  const FLUSH_MS = 4000;

  let _cache = Object.create(null);   // questionId -> record
  let _loaded = Object.create(null);  // chapterId -> true
  let _owner = null;                  // student id this cache belongs to
  let _timer = null;
  let _flushing = false;
  let _online = true;

  const _sbc = () => (typeof _sb !== 'undefined' && _sb) ? _sb : null;

  // ── the durable queue ───────────────────────────────────────────────────
  function readQueue() {
    try { const raw = localStorage.getItem(QUEUE_KEY); return raw ? JSON.parse(raw) || [] : []; }
    catch (e) { return []; }
  }
  function writeQueue(q) {
    // A failed localStorage write must not throw into the answer path; the
    // answer is already recorded in the chapter aggregate either way.
    try { localStorage.setItem(QUEUE_KEY, JSON.stringify(q.slice(-MAX_QUEUE))); } catch (e) {}
  }

  // A key that is stable for THIS answer event and unique across events, so a
  // retry is recognised but two genuine answers to the same question are not
  // collapsed. Not derived from question text - that is never a key.
  function eventKey(studentId, questionId) {
    const rnd = (typeof crypto !== 'undefined' && crypto.getRandomValues)
      ? crypto.getRandomValues(new Uint32Array(1))[0].toString(36)
      : Math.floor(Math.random() * 4294967296).toString(36);
    return `${String(studentId || 'anon').slice(0, 8)}.${questionId}.${Date.now().toString(36)}.${rnd}`;
  }

  // ── recording ───────────────────────────────────────────────────────────
  function record(studentId, question, correct) {
    if (!question || !question.id || !question.chapterId) return null;
    const id = question.id;

    // optimistic local transition, mirroring the SQL
    const next = (typeof PracticeSelector !== 'undefined')
      ? PracticeSelector.nextState(_cache[id], !!correct)
      : null;
    if (next) {
      _cache[id] = Object.assign({}, _cache[id], next, {
        chapterId: question.chapterId,
        lastSeenAt: Date.now(),
        pending: true,
      });
    }

    const q = readQueue();
    q.push({
      question_id: id,
      chapter_id: question.chapterId,
      // ⚠ .id, not the pack. ACTIVE_PACK is the whole pack OBJECT - chapters,
      //   notes, badges, syllabus prose - and every other reader in the app
      //   spells it `ACTIVE_PACK?.id`. Sending the object put an entire
      //   serialised manifest into a column called subject_pack_id: measured on
      //   the live table, 25 rows held 572 KB where 25 ids would have been 325
      //   bytes, and it grew by ~23 KB for every question a child answered.
      subject_pack_id: (typeof ACTIVE_PACK !== 'undefined' && ACTIVE_PACK) ? (ACTIVE_PACK.id || null) : null,
      correct: !!correct,
      event_key: eventKey(studentId, id),
    });
    writeQueue(q);
    schedule();
    return next;
  }

  function schedule() {
    if (_timer) return;
    _timer = setTimeout(() => { _timer = null; flush(); }, FLUSH_MS);
  }

  // ── flushing ────────────────────────────────────────────────────────────
  //  Items are removed only after the server confirms them. A failure leaves
  //  the queue intact and reports the sync state honestly, rather than telling
  //  the child their work is saved when it is not.
  async function flush() {
    if (_flushing) return { ok: false, reason: 'busy' };
    const sb = _sbc();
    let q = readQueue();
    if (!q.length) return { ok: true, written: 0 };
    if (!sb) return { ok: false, reason: 'no_client' };

    _flushing = true;
    let written = 0;
    try {
      while (q.length) {
        const batch = q.slice(0, BATCH);
        const { data, error } = await sb.rpc('record_question_progress', { p_items: batch });
        if (error || !data || data.ok !== true) {
          _online = false;
          return { ok: false, reason: (error && error.message) || (data && data.error) || 'refused', written };
        }
        written += (data.written || 0);
        // ⚠ THE SERVER OWNS THE SCORE. app.js has been adding its own optimistic
        //   prediction per answer; this is the number that actually got minted,
        //   including every award it declined because the question had already
        //   paid. Applied on every batch, so a device that was offline for an
        //   hour reconciles on the first successful flush.
        if (typeof applyServerPoints === 'function' && typeof data.points !== 'undefined') {
          try { applyServerPoints(data.points, data.level); } catch (_) {}
        }
        // Only now is it safe to drop them. Re-read, because an answer may have
        // been appended while the request was in flight.
        const fresh = readQueue();
        writeQueue(fresh.slice(batch.length));
        q = readQueue();
      }
      _online = true;
      for (const k of Object.keys(_cache)) if (_cache[k]) _cache[k].pending = false;
      return { ok: true, written };
    } catch (e) {
      _online = false;
      return { ok: false, reason: e && e.message, written };
    } finally {
      _flushing = false;
    }
  }

  // ── loading ─────────────────────────────────────────────────────────────
  //  One chapter at a time. Loading the whole bank to draw one Question Map is
  //  exactly what this must not do.
  async function loadChapter(studentId, chapterId, opts) {
    const force = !!(opts && opts.force);
    if (!chapterId) return {};
    if (_owner && studentId && _owner !== studentId) reset(studentId);
    _owner = studentId || _owner;
    if (_loaded[chapterId] && !force) return _cache;

    const sb = _sbc();
    if (!sb) return _cache;
    try {
      let query = sb.from('student_question_progress')
        .select('question_id,chapter_id,state,attempts,correct_attempts,wrong_attempts,consecutive_correct,ever_wrong,last_seen_at,recovered_at')
        .eq('chapter_id', chapterId);
      // A child's own rows come back through RLS on the token alone. A parent
      // previewing a child has no token, so the id is named explicitly.
      if (studentId) query = query.eq('student_id', studentId);
      const { data, error } = await query;
      if (error) return _cache;
      for (const r of (data || [])) {
        const local = _cache[r.question_id];
        // A local row still waiting to sync is NEWER than the server's copy.
        if (local && local.pending) continue;
        _cache[r.question_id] = {
          chapterId: r.chapter_id,
          state: r.state,
          attempts: r.attempts,
          correctAttempts: r.correct_attempts,
          wrongAttempts: r.wrong_attempts,
          consecutiveCorrect: r.consecutive_correct,
          everWrong: r.ever_wrong,
          lastSeenAt: r.last_seen_at ? Date.parse(r.last_seen_at) : 0,
          recoveredAt: r.recovered_at ? Date.parse(r.recovered_at) : 0,
          pending: false,
        };
      }
      _loaded[chapterId] = true;
    } catch (e) { /* stay with whatever is cached */ }
    return _cache;
  }

  // One-off conversion of the legacy answeredIds array. Safe to call more than
  // once: the SQL is ON CONFLICT DO NOTHING, so it can never overwrite a real
  // answer with a legacy placeholder.
  async function backfill(studentId) {
    const sb = _sbc();
    if (!sb || !studentId) return { ok: false };
    try {
      const { data, error } = await sb.rpc('backfill_question_progress', { p_student: studentId });
      if (error) return { ok: false, reason: error.message };
      _loaded = Object.create(null);   // totals changed; reload on next open
      return data || { ok: false };
    } catch (e) { return { ok: false, reason: e && e.message }; }
  }

  // ⚠ Switching child must clear this, for the same reason
  //   QuestionLoader.useStudent() exists: the modules stay in memory and
  //   switching child never reloads the page.
  function reset(studentId) {
    _cache = Object.create(null);
    _loaded = Object.create(null);
    _owner = studentId || null;
  }

  // Has this question EVER been answered correctly by this child? The points
  // rule "a question pays once, ever" is enforced in the database; this is the
  // local prediction of it, so app.js can decide whether to float a number
  // before the queue has been anywhere near the server.
  //
  // ⚠ An id this cache has never seen answers FALSE - optimistic on purpose.
  //   The cache is only ever loaded a chapter at a time, so "not here" usually
  //   means "not loaded", not "never answered". Being optimistic shows a float
  //   that a later flush may quietly not honour; being pessimistic would hide
  //   points the child genuinely earned. The header total is corrected from the
  //   server either way, within one flush.
  const everCorrect = (questionId) => ((_cache[questionId] || {}).correctAttempts || 0) > 0;


  const all = () => _cache;
  const forChapter = (chapterId) => {
    const out = Object.create(null);
    for (const k of Object.keys(_cache)) if (_cache[k].chapterId === chapterId) out[k] = _cache[k];
    return out;
  };
  const pendingCount = () => readQueue().length;
  const syncState = () => (readQueue().length === 0 ? 'synced' : (_online ? 'saving' : 'offline'));

  if (typeof window !== 'undefined') {
    window.addEventListener('online', () => { _online = true; flush(); });
    // A tab going away is the last chance to save; the queue survives either
    // way, but flushing here means the next device sees the work sooner.
    window.addEventListener('pagehide', () => { flush(); });
  }

  return { record, flush, loadChapter, backfill, reset, all, forChapter, everCorrect, pendingCount, syncState, eventKey, QUEUE_KEY };
})();

if (typeof window !== 'undefined') window.QuestionProgress = QuestionProgress;
if (typeof module !== 'undefined' && module.exports) module.exports = QuestionProgress;
