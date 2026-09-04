'use strict';

const LearningCoach = (() => {
  const PACK = 'grade5-maths';
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const day = () => _muDayKey();
  const after = (date, n) => new Date(Date.parse(date + 'T00:00:00Z') + n * 86400000).toISOString().slice(0,10);
  const state = () => DB.learningCoach || (DB.learningCoach = {version:1, topics:{}, history:[], mission:null});
  let busy = false;

  function groups(questions) {
    const map = new Map();
    const seen = new Set();
    questions.forEach(q => {
      if (!q.id || !q.question || !q.subsection || ![1,2,3,4].includes(q.difficulty)) return;
      if (!['mcq','numeric','tf'].includes(q.type) || q.answer == null) return;
      const signature = q.question.replace(/\s+/g,' ').trim().toLowerCase();
      if (seen.has(signature)) return;
      seen.add(signature);
      const key = `${q.chapterId}/${q.subsection}/${q.difficulty}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(q);
    });
    return [...map].filter(([,qs]) => qs.length >= 20).map(([key,qs]) => ({key,qs}));
  }

  function choose(data, pool, today) {
    if (data.mission && !data.mission.completed) return data.mission;
    if (data.history.some(h => h.day === today)) return null;
    const available = new Map(pool.map(g => [g.key,g]));
    const topics = Object.entries(data.topics).filter(([key]) => available.has(key));
    const due = topics.filter(([,t]) => t.baseline && (t.practised || t.reviewOnly) && !t.followup && t.due <= today)
      .sort((a,b)=>a[1].due.localeCompare(b[1].due))[0];
    if (due) return {kind:'check', key:due[0], ids:due[1].reserved, day:today, answers:{}};
    const needsPractice = topics.filter(([,t]) => t.baseline && !t.practised && !t.followup && !t.reviewOnly)
      .sort((a,b) => a[1].baseline.correct - b[1].baseline.correct)[0];
    if (needsPractice) {
      const [key,t] = needsPractice;
      const qs = available.get(key).qs.filter(q => !t.used.includes(q.id) && !t.reserved.includes(q.id));
      if (qs.length >= 8) return {kind:'practice',key,ids:qs.slice(0,8).map(q=>q.id),day:today,answers:{}};
    }
    const fresh = pool.find(g => !data.topics[g.key]);
    if (!fresh) return null;
    return {kind:'baseline',key:fresh.key,ids:fresh.qs.slice(0,6).map(q=>q.id),reserved:fresh.qs.slice(6,12).map(q=>q.id),day:today,answers:{}};
  }

  function label(key) {
    const [chapter,sub,diff] = key.split('/');
    const pack = SUBJECT_PACKS.find(p=>p.id===PACK);
    const ch = (pack?._chapters || pack?.chapters || []).find(c=>c.id===chapter);
    const sections = pack?.syllabus?.[chapter]?.subsections || [];
    const section = sections.find(s=>s.id===sub);
    return `${ch?.name || chapter} · ${section?.name || section?.title || sub.replace(/_/g,' ')} · Level ${diff}`;
  }

  function renderChild() {
    const eligible = Number(Auth.getActiveAccount()?.grade) === 5 && !_isParentContext();
    for (const id of ['coach-child-home','coach-child-subject']) {
      const el = document.getElementById(id);
      if (!el) continue;
      el.classList.toggle('hidden', !eligible);
      if (!eligible) continue;
      const data = DB.learningCoach;
      const done = data?.history?.find(h=>h.day===day());
      const pending = data?.mission && !data.mission.completed;
      el.innerHTML = `<div><span class="coach-kicker">GRADE 5 MATHS · LEARNING COACH PILOT</span><h3>${done && !pending ? 'Today’s mission is complete! 🌟' : 'Your small mission for today 🚀'}</h3><p>${done && !pending ? 'You made time to learn. Come back tomorrow for your next mission.' : pending ? 'Pick up where you left off. Your answered questions are saved.' : '6–8 questions, about 10 minutes. Start with a short check, then practise and check again on a later day.'}</p></div><button onclick="LearningCoach.start()" ${busy ? 'disabled' : ''}>${pending?'Continue mission':done?'Check next step':'Start today’s mission'} →</button>`;
    }
  }

  function renderParent() {
    const el = document.getElementById('coach-parent-summary');
    if (!el) return;
    const student = Auth.getStudents().find(s=>s.id===ACTIVE_STUDENT_ID);
    el.classList.toggle('hidden', Number(student?.grade)!==5);
    if (Number(student?.grade)!==5) return;
    const data = DB.learningCoach;
    const history = data?.history || [];
    const week = history.filter(h=>h.day>=after(day(),-6) && h.day<=day());
    const topics = Object.entries(data?.topics || {});
    const cards = topics.map(([key,t]) => {
      const next = t.followup ? `Follow-up: ${t.followup.correct}/6 on ${t.followup.day} — different questions at the same difficulty.`
        : t.reviewOnly ? `An encouraging start. We will check retention from ${t.due}; targeted practice is not assigned from this result.`
        : t.practised ? `Practice completed. Fresh check due ${t.due}.`
        : 'Next step: 8 targeted practice questions.';
      return `<div class="coach-topic"><strong>${esc(label(key))}</strong><p>Starting check: ${t.baseline.correct}/6 on ${esc(t.baseline.day)}. ${esc(next)}</p><small>Small samples: these checks are not proof of mastery or an exam prediction.</small></div>`;
    }).join('');
    el.innerHTML = `<span class="coach-kicker">GRADE 5 MATHS · LEARNING COACH PILOT</span><h3>Your child’s weekly learning coach</h3><p>${new Set(week.map(h=>h.day)).size} days with a completed mission in the last 7 days.</p>${cards || '<p>No starting check completed yet. In child mode, tap “Start today’s mission”.</p>'}<p class="coach-note">Topics not listed are not checked yet. Checks use first attempts with hints off. Daily practice includes hints and explanations. Other practice remains available.</p>`;
  }

  async function start() {
    if (busy || _isParentContext() || Number(Auth.getActiveAccount()?.grade)!==5) return;
    if (_capReached('questions')) { _showCapModal('questions'); return; }
    busy = true; renderChild();
    const child = ACTIVE_STUDENT_ID;
    try {
      const pack = activateSubjectPack(PACK);
      if (!pack) throw Error('Grade 5 Maths is not available.');
      await QuestionLoader.loadSubject(PACK);
      if (child !== ACTIVE_STUDENT_ID || _isParentContext()) return;
      const chapterIds = new Set((pack._chapters || pack.chapters || []).map(ch=>ch.id));
      const allowed = q => chapterIds.has(q.chapterId) && !(DB.restrictions?.lockedChapters || []).includes(q.chapterId) &&
        _planAllowsChapter(q.chapterId) && q.difficulty <= (DB.restrictions?.maxDifficulty ?? 4);
      const pool = groups(STATIC_QUESTIONS.filter(allowed));
      const data = state();
      const mission = choose(data,pool,day());
      if (!mission) { toast(data.history.some(h=>h.day===day())?'Today’s coach mission is complete. Come back tomorrow!':'No new coach mission is ready. Continue chapter practice while waiting for your follow-up check.',4500); return; }
      const remaining = mission.ids.filter(id=>!Object.hasOwn(mission.answers,id));
      const qs = remaining.map(id=>STATIC_QUESTIONS.find(q=>q.id===id && allowed(q)));
      if (qs.some(q=>!q)) throw Error('Some mission questions are unavailable or locked. Ask your parent to check chapter access.');
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
    if (mission.kind==='baseline') data.topics[mission.key] = {
      baseline:{correct,day:today},used:mission.ids,reserved:mission.reserved,
      reviewOnly:correct>=5, due:correct>=5?after(today,7):null
    };
    else {
      const topic = data.topics[mission.key];
      topic.used = [...new Set([...topic.used,...mission.ids])];
      if (mission.kind==='practice') { topic.practised=today; topic.due=after(today,3); }
      else topic.followup={correct,day:today};
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
  return {start,record,finish,renderChild,renderParent,groups,choose,complete};
})();
