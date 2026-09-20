'use strict';

// Learning Coach — one small spaced-retrieval mission a day, from any of the
// child's live subjects.
//
// A topic is one chapter subsection of one pack. Its life: a STARTING CHECK
// (6 questions, hints off) → a PRACTICE round (up to 8 fresh questions from the
// same subsection, hints on) → a FRESH CHECK on 6 questions reserved at the
// start and never shown since, three days later. A strong start (5/6) skips
// practice and is re-checked after a week.
//
// ⚠ The cycle CONTINUES after that check (2026-09-20). It used to stop there
//   whatever the score, so a child who got 2/6 on the fresh check was never
//   coached on that topic again — the one child the coach exists for.
//   - a WEAK check (under 5/6) → another practice round, checked again three
//     days later. After MAX_ROUNDS practice rounds without a strong check the
//     topic is STALLED: re-checked in a fortnight, and the parent card says
//     practice alone is not fixing it.
//   - a STRONG check → the next check waits longer each time (7, 14, 30 days).
//     Three strong checks in a row and the topic is DONE.
//   Later checks draw questions the child has not seen; when a subsection and
//   its chapter run dry they reuse the oldest-seen ones, which by then are at
//   least a week old.
//
// ⚠ Began as a Grade 5 Maths pilot keyed `chapter/subsection/difficulty` with
//   20+ questions per key. Measured across the built bundles on 2026-09-19,
//   that rule left 22 of 49 packs with NOTHING the coach could pick (grade4/5/6
//   science, every history pack, every Grade 7–8 pack); grouping by
//   `pack/chapter/subsection` at 12+ leaves only the three `comingSoon` ICT
//   placeholders empty. Keys are now `packId/chapterId/subsection`, and a v1
//   blob is migrated in state() — the same child must not lose a topic in
//   flight because the key format changed under them.
// ⚠ Missions draw from every live pack of the child's OWN grade, rotating by
//   subject so a child is not coached on Maths five days running. Packs are
//   loaded one at a time, only as far as the next mission needs — loading the
//   whole grade to pick 6 questions is the French pack's 600 KB for nothing.
// ⚠ Every question passes the same gates as ordinary practice: chapter
//   declared, not parent-locked, plan allows it, difficulty within the cap.
const LearningCoach = (() => {
  const VERSION = 2;
  const GROUP_MIN = 12;      // 6 for the starting check + 6 reserved for the fresh check
  const CHECK_SIZE = 6;
  const PRACTICE_SIZE = 8;
  const PRACTICE_MIN = 4;    // fewer fresh questions than this is not a practice round
  const STRONG = 5;          // /6 on the starting check: skip practice, re-check in a week
  const PRACTICE_GAP = 3;    // days between practice and the fresh check
  const STRONG_GAP = 7;      // a strong START waits a week for its first check
  const LONG_GAPS = [7, 14, 30]; // after each strong CHECK, the next waits longer
  const DONE_STREAK = 3;     // strong checks in a row that retire a topic
  const MAX_ROUNDS = 3;      // practice rounds without a strong check → stalled
  const STALLED_GAP = 14;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const day = () => _muDayKey();
  const after = (date, n) => new Date(Date.parse(date + 'T00:00:00Z') + n * 86400000).toISOString().slice(0,10);
  const packOf = key => key.split('/')[0];
  let busy = false;

  function state() {
    if (!DB.learningCoach) DB.learningCoach = { version: VERSION, topics: {}, history: [], mission: null };
    const data = DB.learningCoach;
    if (!data.version || data.version < 2) migrate(data);
    for (const t of Object.values(data.topics || {})) normalise(t);
    return data;
  }

  // Every topic carries `next` ('practice' | 'check' | 'done') and `due`.
  // Older shapes only had flags (reviewOnly / noPractice / practised /
  // followup) and stopped at the first fresh check; they are read once here so
  // the rest of the module never has to know they existed.
  function normalise(t) {
    if (!t || !t.baseline) return t;
    if (!Array.isArray(t.checks)) t.checks = t.followup ? [t.followup] : [];
    if (typeof t.rounds !== 'number') t.rounds = t.practised ? 1 : 0;
    if (typeof t.streak !== 'number') t.streak = t.followup && t.followup.correct >= STRONG ? 1 : 0;
    if (t.checks.length && Array.isArray(t.reserved) && t.reserved.length) {
      t.used = [...new Set([...(t.used || []), ...t.reserved])];
      t.reserved = [];
    }
    if (t.done) t.next = 'done';
    if (!t.next) {
      if (t.followup) {
        if (t.followup.correct >= STRONG) { t.next = 'check'; t.due = t.due && t.due > t.followup.day ? t.due : after(t.followup.day, LONG_GAPS[0]); }
        else { t.next = 'practice'; t.due = null; }
      }
      else if (t.practised || t.reviewOnly || t.noPractice) t.next = 'check';
      else t.next = 'practice';
    }
    return t;
  }

  // v1 keys were `chapter/subsection/difficulty` and only ever grade5-maths.
  // Several v1 keys can fold into one v2 key (one per difficulty); the first
  // wins and the rest only contribute their used/reserved ids, so no question
  // a child has already seen is dealt as "fresh".
  function migrate(data) {
    const topics = {};
    for (const [key, t] of Object.entries(data.topics || {})) {
      const parts = key.split('/');
      const nk = parts.length === 3 && !SUBJECT_PACKS.some(p => p.id === parts[0]) ? `grade5-maths/${parts[0]}/${parts[1]}` : key;
      if (!topics[nk]) { topics[nk] = t; continue; }
      topics[nk].used = [...new Set([...(topics[nk].used || []), ...(t.used || []), ...(t.reserved || [])])];
    }
    data.topics = topics;
    const fix = key => { const parts = String(key || '').split('/'); return parts.length === 3 && !SUBJECT_PACKS.some(p => p.id === parts[0]) ? `grade5-maths/${parts[0]}/${parts[1]}` : key; };
    data.history = (data.history || []).map(h => ({ ...h, key: fix(h.key) }));
    if (data.mission && !data.mission.completed) data.mission = { ...data.mission, key: fix(data.mission.key) };
    else if (data.mission) data.mission = null;
    data.version = VERSION;
  }

  function livePacks(grade) {
    const gs = (typeof window !== 'undefined' && window.GLOBAL_SETTINGS) || {};
    return SUBJECT_PACKS.filter(p => Number(p.grade) === Number(grade) && !p.comingSoon
      && !(gs.disabled_grades || []).includes(p.grade) && !(gs.disabled_subjects || []).includes(p.id));
  }

  function groups(questions, packId) {
    const map = new Map();
    const seen = new Set();
    questions.forEach(q => {
      if (!q.id || !q.question || !q.subsection || ![1,2,3,4].includes(q.difficulty)) return;
      if (!['mcq','numeric','tf'].includes(q.type) || q.answer == null) return;
      const signature = q.question.replace(/\s+/g,' ').trim().toLowerCase();
      if (seen.has(signature)) return;
      seen.add(signature);
      const key = `${packId || q.packId || q.pack || 'pack'}/${q.chapterId}/${q.subsection}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(q);
    });
    return [...map].filter(([,qs]) => qs.length >= GROUP_MIN)
      .map(([key,qs]) => ({ key, qs: qs.slice().sort((a,b) => a.difficulty - b.difficulty) }));
  }

  // 12 questions spread evenly across the difficulty-sorted group, dealt
  // alternately to the check and the reserve so both sets are the same shape.
  function deal(qs) {
    const n = Math.min(qs.length, CHECK_SIZE * 2);
    const picks = [];
    for (let i = 0; i < n; i++) picks.push(qs[Math.round(i * (qs.length - 1) / Math.max(1, n - 1))]);
    const uniq = [...new Set(picks)];
    for (const q of qs) { if (uniq.length >= n) break; if (!uniq.includes(q)) uniq.push(q); }
    return { ids: uniq.filter((_, i) => i % 2 === 0).map(q => q.id), reserved: uniq.filter((_, i) => i % 2 === 1).map(q => q.id) };
  }

  // Fresh practice questions: the topic's own subsection first, then the rest
  // of the same chapter. A subsection of exactly 12 has nothing left after
  // the two checks, and a chapter-mate is still targeted practice.
  function practiceSet(t, key, pool) {
    const taken = new Set([...(t.used || []), ...(t.reserved || [])]);
    const [pack, chapter] = key.split('/');
    const own = (pool.find(g => g.key === key)?.qs || []).filter(q => !taken.has(q.id));
    const mates = pool.filter(g => g.key !== key && g.key.startsWith(`${pack}/${chapter}/`)).flatMap(g => g.qs).filter(q => !taken.has(q.id));
    return [...own, ...mates].slice(0, PRACTICE_SIZE);
  }

  // The first fresh check is the reserve dealt at the start. Later checks take
  // questions the child has not seen (subsection, then chapter); when those
  // run out they reuse the OLDEST seen ones — `used` is appended in order, so
  // its head is the starting check from at least a week before.
  function checkSet(t, key, pool) {
    if (Array.isArray(t.reserved) && t.reserved.length) return t.reserved.slice(0, CHECK_SIZE);
    const seen = new Set(t.used || []);
    const [pack, chapter] = key.split('/');
    const own = (pool.find(g => g.key === key)?.qs || []).filter(q => !seen.has(q.id));
    const mates = pool.filter(g => g.key !== key && g.key.startsWith(`${pack}/${chapter}/`)).flatMap(g => g.qs).filter(q => !seen.has(q.id));
    const ids = [...own, ...mates].slice(0, CHECK_SIZE).map(q => q.id);
    const inPool = new Set(pool.flatMap(g => g.qs.map(q => q.id)));
    for (const id of t.used || []) { if (ids.length >= CHECK_SIZE) break; if (inPool.has(id) && !ids.includes(id)) ids.push(id); }
    return ids;
  }

  // Fresh topics rotate by subject: the pack with the fewest topics started
  // comes first, ties broken by the order the packs are registered in.
  function freshOrder(data, pool) {
    const started = {};
    for (const key of Object.keys(data.topics)) started[packOf(key)] = (started[packOf(key)] || 0) + 1;
    const rank = new Map(SUBJECT_PACKS.map((p, i) => [p.id, i]));
    return pool.filter(g => !data.topics[g.key])
      .sort((a, b) => (started[packOf(a.key)] || 0) - (started[packOf(b.key)] || 0) || (rank.get(packOf(a.key)) ?? 999) - (rank.get(packOf(b.key)) ?? 999));
  }

  function choose(data, pool, today) {
    if (data.mission && !data.mission.completed) return data.mission;
    if (data.history.some(h => h.day === today)) return null;
    const available = new Map(pool.map(g => [g.key,g]));
    const topics = Object.entries(data.topics).filter(([key]) => available.has(key));
    topics.forEach(([,t]) => normalise(t));
    const due = topics.filter(([,t]) => t.next === 'check' && t.due && t.due <= today)
      .sort((a,b)=>a[1].due.localeCompare(b[1].due));
    for (const [key, t] of due) {
      const ids = checkSet(t, key, pool);
      if (ids.length >= CHECK_SIZE) return {kind:'check', key, ids, day:today, answers:{}};
    }
    // Weakest first: the lowest latest score, then the lowest start.
    const latest = t => (t.checks && t.checks.length ? t.checks[t.checks.length - 1].correct : t.baseline.correct);
    const needsPractice = topics.filter(([,t]) => t.next === 'practice')
      .sort((a,b) => latest(a[1]) - latest(b[1]) || a[1].baseline.correct - b[1].baseline.correct);
    for (const [key, t] of needsPractice) {
      const qs = practiceSet(t, key, pool);
      if (qs.length >= PRACTICE_MIN) return {kind:'practice',key,ids:qs.map(q=>q.id),day:today,answers:{}};
      // Nothing fresh to practise with: the check will have to carry it.
      t.next = 'check'; t.due = t.due && t.due > today ? t.due : after(today, PRACTICE_GAP); t.noPractice = true;
    }
    const fresh = freshOrder(data, pool)[0];
    if (!fresh) return null;
    const dealt = deal(fresh.qs);
    return {kind:'baseline',key:fresh.key,ids:dealt.ids,reserved:dealt.reserved,day:today,answers:{}};
  }

  // Which topics COULD be chosen today without loading anything, so start()
  // knows which packs to fetch: a pending mission names its own; otherwise a
  // topic awaiting practice, or one whose fresh check is due. A topic resting
  // until next week must not cost a fetch today.
  function wantedPacks(data, today) {
    if (data.mission && !data.mission.completed) return [packOf(data.mission.key)];
    return [...new Set(Object.entries(data.topics)
      .filter(([,t]) => normalise(t) && t.next !== 'done' && (t.next === 'practice' || (t.due && t.due <= today)))
      .map(([key]) => packOf(key)))];
  }

  function label(key) {
    const [packId, chapter, sub] = key.split('/');
    const pack = SUBJECT_PACKS.find(p=>p.id===packId);
    const ch = (pack?._chapters || pack?.chapters || []).find(c=>c.id===chapter);
    const sections = pack?.syllabus?.[chapter]?.subsections || [];
    const section = sections.find(s=>s.id===sub);
    const subject = pack?.subject || pack?.name || packId;
    return `${subject} · ${ch?.name || chapter} · ${section?.name || section?.title || String(sub || '').replace(/_/g,' ')}`;
  }

  function childEligible() {
    if (_isParentContext()) return false;
    return livePacks(Auth.getActiveAccount()?.grade).length > 0;
  }

  function renderChild() {
    const eligible = childEligible();
    for (const id of ['coach-child-home','coach-child-subject']) {
      const el = document.getElementById(id);
      if (!el) continue;
      el.classList.toggle('hidden', !eligible);
      if (!eligible) continue;
      const data = DB.learningCoach;
      const done = data?.history?.find(h=>h.day===day());
      const pending = data?.mission && !data.mission.completed;
      const pendingLabel = pending ? label(data.mission.key) : '';
      el.innerHTML = `<div><span class="coach-kicker">LEARNING COACH</span><h3>${done && !pending ? 'Today’s mission is complete! 🌟' : 'Your small mission for today 🚀'}</h3><p>${done && !pending ? 'You made time to learn. Come back tomorrow for your next mission.' : pending ? `Pick up where you left off: ${esc(pendingLabel)}. Your answered questions are saved.` : '6–8 questions, about 10 minutes, from any of your subjects. Start with a short check, then practise and check again on a later day.'}</p></div><button onclick="LearningCoach.start()" ${busy ? 'disabled' : ''}>${pending?'Continue mission':done?'Check next step':'Start today’s mission'} →</button>`;
    }
  }

  function renderParent() {
    const el = document.getElementById('coach-parent-summary');
    if (!el) return;
    const student = Auth.getStudents().find(s=>s.id===ACTIVE_STUDENT_ID);
    const eligible = !!student && livePacks(student.grade).length > 0;
    el.classList.toggle('hidden', !eligible);
    if (!eligible) return;
    const data = DB.learningCoach;
    const history = data?.history || [];
    const week = history.filter(h=>h.day>=after(day(),-6) && h.day<=day());
    const topics = Object.entries(data?.topics || {});
    const cards = topics.map(([key,t]) => {
      normalise(t);
      const last = t.checks.length ? t.checks[t.checks.length - 1] : null;
      const trail = t.checks.length ? ` Fresh checks: ${t.checks.map(c => `${c.correct}/${CHECK_SIZE} on ${c.day}`).join(', ')}.` : '';
      const next = t.next === 'done' ? 'Retained: three strong checks in a row. The coach has moved on from this topic.'
        : t.stalled ? `Still under ${STRONG}/${CHECK_SIZE} after ${t.rounds} practice rounds - practice alone is not fixing this one. It may need explaining in person. Re-check due ${t.due}.`
        : t.next === 'practice' ? (last ? `Not yet retained. Next step: another round of up to ${PRACTICE_SIZE} practice questions, then a fresh check.` : `Next step: up to ${PRACTICE_SIZE} targeted practice questions.`)
        : t.reviewOnly && !last ? `An encouraging start. We will check retention from ${t.due}; targeted practice is not assigned from this result.`
        : t.noPractice && !last ? `Too few fresh questions in this topic for a practice round. Fresh check due ${t.due}.`
        : last && last.correct >= STRONG ? `Strong check ${t.streak} of ${DONE_STREAK}. Next check due ${t.due}, on a longer gap each time.`
        : `Practice completed. Fresh check due ${t.due}.`;
      return `<div class="coach-topic"><strong>${esc(label(key))}</strong><p>Starting check: ${t.baseline.correct}/${CHECK_SIZE} on ${esc(t.baseline.day)}.${esc(trail)} ${esc(next)}</p><small>Small samples: these checks are not proof of mastery or an exam prediction.</small></div>`;
    }).join('');
    el.innerHTML = `<span class="coach-kicker">LEARNING COACH</span><h3>Your child’s weekly learning coach</h3><p>${new Set(week.map(h=>h.day)).size} days with a completed mission in the last 7 days.</p>${cards || '<p>No starting check completed yet. In child mode, tap “Start today’s mission”.</p>'}<p class="coach-note">Topics not listed are not checked yet. Missions rotate through every subject in their grade. Checks use first attempts with hints off. Daily practice includes hints and explanations. Other practice remains available.</p>`;
  }

  async function loadPack(pack) {
    if (typeof PackLoader !== 'undefined') await PackLoader.ensure(pack.id).catch(() => {});
    await QuestionLoader.loadSubject(pack.id);
  }

  function allowedIn(pack) {
    const chapterIds = new Set((pack._chapters || pack.chapters || []).map(ch=>ch.id));
    return q => chapterIds.has(q.chapterId) && !(DB.restrictions?.lockedChapters || []).includes(q.chapterId) &&
      _planAllowsChapter(q.chapterId) && q.difficulty <= (DB.restrictions?.maxDifficulty ?? 4);
  }

  // Questions are tagged to a chapter, never to a pack; a pack's share of
  // STATIC_QUESTIONS is whatever is tagged to one of ITS chapters.
  function poolFor(packs) {
    return packs.flatMap(pack => groups(STATIC_QUESTIONS.filter(allowedIn(pack)), pack.id));
  }

  async function start() {
    if (busy || !childEligible()) return;
    if (_capReached('questions')) { _showCapModal('questions'); return; }
    busy = true; renderChild();
    const child = ACTIVE_STUDENT_ID;
    const today = day();
    try {
      const data = state();
      const packs = livePacks(Auth.getActiveAccount()?.grade);
      const pending = data.mission && !data.mission.completed;
      if (!pending && data.history.some(h=>h.day===today)) { toast('Today’s coach mission is complete. Come back tomorrow!', 4500); return; }
      const byId = new Map(packs.map(p => [p.id, p]));
      const loaded = [];
      const stale = () => child !== ACTIVE_STUDENT_ID || _isParentContext();
      for (const id of wantedPacks(data, today)) {
        const p = byId.get(id);
        if (p) { await loadPack(p); loaded.push(p); }
      }
      if (stale()) return;
      let mission = choose(data, poolFor(loaded), today);
      // Nothing due and nothing to practise: open packs one at a time, fewest
      // topics started first, until one offers a fresh topic.
      if (!mission && !pending) {
        const started = {};
        for (const key of Object.keys(data.topics)) started[packOf(key)] = (started[packOf(key)] || 0) + 1;
        const rest = packs.filter(p => !loaded.includes(p)).sort((a, b) => (started[a.id] || 0) - (started[b.id] || 0));
        for (const p of rest) {
          await loadPack(p); loaded.push(p);
          if (stale()) return;
          mission = choose(data, poolFor(loaded), today);
          if (mission) break;
        }
      }
      if (!mission) { toast('No new coach mission is ready. Continue chapter practice while waiting for your follow-up check.', 4500); return; }
      const pack = byId.get(packOf(mission.key));
      if (!pack) throw Error('That subject is not available right now.');
      if (!activateSubjectPack(pack.id)) throw Error('That subject could not be opened.');
      const allowed = allowedIn(pack);
      const remaining = mission.ids.filter(id=>!Object.hasOwn(mission.answers,id));
      const qs = remaining.map(id=>STATIC_QUESTIONS.find(q=>q.id===id && allowed(q)));
      if (qs.some(q=>!q)) throw Error('Some mission questions are unavailable or locked. Ask your parent to check chapter access.');
      if (mission.kind === 'baseline') mission.spare = spareFor(mission, poolFor([pack]));
      data.mission = mission;
      save(DB,true);
      if (!qs.length) { finish(); return; }
      startSearchPractice(qs, `${mission.kind==='practice'?'Daily mission':mission.kind==='check'?'Fresh check':'Starting check'} · ${label(mission.key)}`, mission);
      document.getElementById('practice-back-btn').onclick = () => showScreen('subject-select');
      document.getElementById('practice-pause-btn')?.classList.add('hidden');
      loadPracticeQuestion();
    } catch(error) { toast(error.message || 'The coach could not load. Please try again.',4500); }
    finally { busy=false; renderChild(); }
  }

  // How many fresh questions a practice round could draw on, recorded at the
  // starting check so complete() can tell "practise next" from "nothing left".
  function spareFor(mission, pool) {
    return practiceSet({ used: mission.ids, reserved: mission.reserved }, mission.key, pool).length;
  }

  function record(q, correct) {
    const mission = S.practice.coachMission;
    if (!mission || state().mission !== mission || !mission.ids.includes(q.id) || Object.hasOwn(mission.answers,q.id)) return;
    mission.answers[q.id] = !!correct;
    if (mission.ids.every(id=>Object.hasOwn(mission.answers,id))) complete(state(),mission,day());
    save(DB,true);
  }

  function complete(data, mission, today) {
    if (mission.completed) return;
    const correct = mission.ids.filter(id=>mission.answers[id]).length;
    if (mission.kind==='baseline') {
      const strong = correct >= STRONG;
      const thin = !strong && (mission.spare ?? PRACTICE_SIZE) < PRACTICE_MIN;
      data.topics[mission.key] = {
        baseline:{correct,day:today},used:mission.ids,reserved:mission.reserved,
        reviewOnly:strong, noPractice:thin, checks:[], rounds:0, streak:0,
        next: strong || thin ? 'check' : 'practice',
        due: strong ? after(today,STRONG_GAP) : thin ? after(today,PRACTICE_GAP) : null
      };
    }
    else {
      const topic = normalise(data.topics[mission.key]);
      topic.used = [...new Set([...topic.used,...mission.ids])];
      if (mission.kind==='practice') {
        topic.practised=today; topic.rounds=(topic.rounds||0)+1;
        topic.next='check'; topic.due=after(today,PRACTICE_GAP);
      }
      else {
        // The reserve is spent by the first check; later checks deal afresh.
        topic.reserved=[];
        topic.followup={correct,day:today};
        topic.checks=[...(topic.checks||[]),{correct,day:today}];
        if (correct >= STRONG) {
          topic.streak=(topic.streak||0)+1; topic.stalled=false;
          if (topic.streak >= DONE_STREAK) { topic.next='done'; topic.done=true; topic.due=null; }
          else { topic.next='check'; topic.due=after(today,LONG_GAPS[Math.min(topic.streak-1,LONG_GAPS.length-1)]); }
        }
        else {
          topic.streak=0;
          if ((topic.rounds||0) >= MAX_ROUNDS) { topic.stalled=true; topic.next='check'; topic.due=after(today,STALLED_GAP); }
          else { topic.next='practice'; topic.due=null; }
        }
      }
    }
    mission.completed=true;
    data.history.push({day:today,kind:mission.kind,key:mission.key,correct,total:mission.ids.length});
    data.history=data.history.slice(-90);
  }

  function finish() {
    S.practice.coachMission = null;
    _setAssignmentContext(false);
    showScreen('subject-select');
    toast('Mission complete! 🌟 Your next step will be ready on a later day.',4000);
  }
  return {start,record,finish,renderChild,renderParent,groups,choose,complete,migrate,normalise,livePacks,label,deal,practiceSet,checkSet};
})();
