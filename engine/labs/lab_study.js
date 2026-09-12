'use strict';
// Shared study journey. The lab owns simulation state and validates its actions.
// A completed investigation records practice, never exam mastery.
const LabStudy = (() => {
  const VERSION = 1;
  let root = null, lab = null, module = null, attempt = null, permitted = null;
  let timer = 0, observed = null, generation = 0;
  const esc = s => Labs.esc(s);
  const key = () => String(Labs.grade());
  const store = () => {
    const s = Labs.store(lab.id);
    s.study = s.study || {};
    return s.study[key()] = s.study[key()] || { attempts: {}, last: null };
  };
  const encode = value => JSON.parse(JSON.stringify(value, (_, v) => v instanceof Set ? { $set: [...v] } : v));
  const decode = value => JSON.parse(JSON.stringify(value), (_, v) => v && Array.isArray(v.$set) ? new Set(v.$set) : v);
  // Legacy untagged guides belong to the lab's original (highest) grade.
  const guides = () => module.study.guides().filter(g => (g.grades || [Math.max(...lab.grades)]).includes(Number(Labs.grade())));
  const definition = () => attempt && guides().find(g => g.id === attempt.id);
  function save(snapshot = false) {
    if (!attempt || !lab) return;
    if (snapshot && attempt.phase === 'experiment') {
      const state = module.study.snapshot();
      if (state) attempt.snapshot = encode(state);
    }
    attempt.updatedAt = Date.now();
    store().attempts[attempt.id] = attempt;
    store().last = attempt.id;
    Labs.persist();
  }
  function evidence() {
    if (!root) return [];
    if (module.study.evidence) return module.study.evidence();
    // Read only recorded observations, never infer results from instructional text.
    return [...root.querySelectorAll('.lab-notebook tbody tr, .lab-notebook .lab-log li, #lab-notebook tbody tr, #lab-notebook .lab-log li')]
      .map(el => (el.innerText || el.textContent || '').trim().replace(/\s+/g, ' '))
      .filter(Boolean).filter((v, i, all) => all.indexOf(v) === i).slice(0, 8);
  }
  function node() {
    let el = root.querySelector('#lab-study');
    if (!el) {
      el = document.createElement('section'); el.id = 'lab-study'; el.className = 'lab-study';
      el.setAttribute('aria-label', 'Your investigation');
      const header = root.querySelector('.lab-top');
      if (header) header.after(el); else root.prepend(el);
    }
    return el;
  }
  function button(action, label, primary = true) {
    return `<button type="button" class="lab-btn${primary ? ' lab-btn-primary' : ''}" data-study="${action}">${label}</button>`;
  }
  function steps(phase) {
    const phases = ['predict', 'experiment', 'explain', 'complete'];
    const labels = ['Think', 'Try it', 'Explain', 'Finished'];
    return `<ol class="lab-study-progress" aria-label="Investigation progress">${phases.map((p, i) => `<li${p === phase ? ' aria-current="step"' : ''}>${i + 1}. ${labels[i]}</li>`).join('')}</ol>`;
  }
  function setMode(mode) {
    root.dataset.studyMode = mode;
    // The guide belongs above the scene, in the same position on phone and desktop.
    const guide = root.querySelector('#lab-guide'), stage = root.querySelector('.lab-stage');
    if (guide && stage && stage.firstElementChild !== guide) stage.prepend(guide);
  }
  function choose() {
    attempt = null; Labs.closeOverlay(true); setMode('choose');
    const all = guides(), s = store();
    const unfinished = s.last && s.attempts[s.last];
    const recommended = all.find(g => g.id !== unfinished?.id && !s.attempts[g.id]?.completedAt) || all[0];
    const card = g => `<article class="lab-study-choice"><h2>${esc(g.title)}</h2><p>${esc(g.blurb || '')}</p><p class="lab-hint">Try the experiment, explain what you saw, then finish.</p><button type="button" class="lab-btn lab-btn-primary" data-study-guide="${esc(g.id)}">${s.attempts[g.id] && !s.attempts[g.id].completedAt ? 'Continue investigation' : s.attempts[g.id]?.completedAt ? 'Try again' : 'Start investigation'}</button></article>`;
    node().innerHTML = `<p class="lab-study-kicker">Use science to answer a question</p>
      ${unfinished && unfinished.version === VERSION && !unfinished.completedAt && all.some(g => g.id === unfinished.id) ? `<div class="lab-study-resume"><p>Carry on with <b>${esc(unfinished.title)}</b>.</p>${button('resume', 'Continue investigation')}</div>` : ''}
      ${recommended ? card(recommended) : '<p>Choose an element to begin exploring.</p>'}
      <details><summary>Choose another investigation</summary>${all.filter(g => g !== recommended).map(card).join('')}</details>
      <div class="lab-study-actions">${button('explore', 'Explore freely', false)}</div>`;
  }
  function show() {
    if (!root || !attempt) return;
    const G = definition(); if (!G) { choose(); return; }
    setMode(attempt.phase);
    let html = steps(attempt.phase) + `<h2>${esc(G.title)}</h2>`;
    if (attempt.phase === 'predict') {
      html += `<p>${esc(G.blurb || '')}</p><label for="study-prediction">What do you think you will find? A few words are enough.</label>
        <textarea id="study-prediction" data-study-field="prediction" rows="2" maxlength="300">${esc(attempt.prediction || '')}</textarea>
        <p class="lab-hint">Your prediction is not marked. It is fine to be unsure.</p><div class="lab-study-actions">${button('try', 'Try it')}${button('unsure', 'Not sure — let me try', false)}</div>`;
    } else if (attempt.phase === 'experiment') {
      html += `<p>Follow the instruction above the experiment. Your questions come next.</p><div class="lab-study-actions">${button('hint', 'Show me where', false)}${button('pause', 'Save and leave', false)}</div>`;
    } else if (attempt.phase === 'explain') {
      html += `<p>The experiment is finished. Use what you saw to answer these two questions.</p>
        ${attempt.evidence?.length ? `<details open><summary>Your recorded results</summary><ul>${attempt.evidence.map(v => `<li>${esc(v)}</li>`).join('')}</ul></details>` : ''}
        <label for="study-observation">1. What did you observe? Name a result or a change.</label><textarea id="study-observation" data-study-field="observation" maxlength="500" rows="2">${esc(attempt.observation || '')}</textarea>
        <label for="study-explanation">2. Why did that happen? Use the science you know.</label><textarea id="study-explanation" data-study-field="explanation" maxlength="500" rows="2">${esc(attempt.explanation || '')}</textarea>
        <p class="lab-hint">A short answer is enough. You can also say both answers aloud and use the spoken-answer button.</p>
        <p id="study-answer-message" role="status"></p>
        <details id="study-science"><summary>Help me explain it</summary><p>${esc(G.lesson || '')}</p></details>
        <div class="lab-study-actions">${button('review', 'Compare my answers')}${button('oral', 'I said both answers aloud', false)}${button('retry', 'Try the experiment again', false)}${button('pause', 'Save and leave', false)}</div>`;
    } else if (attempt.phase === 'review') {
      html = steps('explain') + `<h2>Check your explanation</h2><p>${esc(G.lesson || '')}</p>
        ${attempt.observation ? `<p><b>Your observation:</b> ${esc(attempt.observation)}</p>` : ''}
        ${attempt.explanation ? `<p><b>Your explanation:</b> ${esc(attempt.explanation)}</p>` : ''}
        <p>Does your answer explain what you observed? You can improve it before finishing.</p>
        <p class="lab-hint">This is a self-check, not an automatically marked answer.</p>
        <div class="lab-study-actions">${button('finish', 'I have checked my answer — finish')}${button('edit', 'Improve my answer', false)}</div>`;
    } else {
      html += `<p><strong>Investigation complete.</strong> You tried the experiment and checked your explanation.</p><p>${esc(G.lesson || '')}</p>
        <p>Try explaining this idea again without looking. Then test a different example on the bench.</p>
        <div class="lab-study-actions">${button('choose', 'Choose my next investigation')}${button('explore', 'Try my own example', false)}</div>`;
    }
    node().innerHTML = html;
  }
  function begin(id, G, run) {
    if (!root || !lab || lab.id !== id || !module.study || G.adhoc) return false;
    if (permitted === G.id) { permitted = null; return false; }
    Labs.closeOverlay(true);
    attempt = { version: VERSION, id: G.id, title: G.title, phase: 'predict', startedAt: Date.now(), prediction: '', observation: '', explanation: '', hints: 0 };
    attemptRun = run;
    save(); show(); node().scrollIntoView({ block: 'start', behavior: 'auto' });
    return true;
  }
  let attemptRun = null;
  function run() {
    const G = definition(); if (!G) return;
    attempt.phase = 'experiment'; attempt.snapshot = null; attempt.evidence = [];
    permitted = G.id; save(); setMode('experiment');
    (attemptRun || (() => module.study.start(G.id)))();
    permitted = null; show(); save(true);
  }
  function complete(id, G) {
    if (!attempt || !lab || lab.id !== id || attempt.id !== G.id || attempt.phase !== 'experiment') return false;
    attempt.evidence = evidence(); attempt.phase = 'explain'; attempt.snapshot = null;
    save();
    const current = generation;
    queueMicrotask(() => { if (root && current === generation) { show(); node().scrollIntoView({ block: 'start', behavior: 'auto' }); } });
    return true;
  }
  function checkpoint(id) {
    if (!attempt || lab?.id !== id || attempt.phase !== 'experiment') return;
    const current = generation, active = attempt;
    queueMicrotask(() => { if (current === generation && active === attempt && attempt?.phase === 'experiment') save(true); });
  }
  function hint() {
    if (attempt) { attempt.hints++; save(); }
    const target = root.querySelector('.is-next:not(.is-guide-dim)');
    if (target) { target.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' }); target.focus?.({ preventScroll: true }); }
    else {
      const guide = root.querySelector('#lab-guide');
      guide?.scrollIntoView({ block: 'start', behavior: 'auto' });
    }
  }
  function onClick(e) {
    const pick = e.target.closest('[data-study-guide]');
    const action = e.target.closest('[data-study]');
    if (!pick && !action) { clearTimeout(timer); timer = setTimeout(() => save(true), 100); return; }
    e.preventDefault(); e.stopImmediatePropagation();
    if (pick) {
      const saved = store().attempts[pick.dataset.studyGuide];
      if (saved && !saved.completedAt) { resume(saved); return; }
      module.study.start(pick.dataset.studyGuide); return;
    }
    switch (action.dataset.study) {
      case 'try': run(); break;
      case 'unsure': attempt.prediction = 'Not sure yet'; run(); break;
      case 'hint': hint(); break;
      case 'review':
        if (!attempt.observation?.trim() || !attempt.explanation?.trim()) {
          root.querySelector('#study-answer-message').textContent = 'Add a short observation and explanation, or say both aloud and choose the spoken-answer button.';
          break;
        }
        attempt.answerMode = 'written'; attempt.phase = 'review'; save(); show(); break;
      case 'oral': attempt.answerMode = 'spoken'; attempt.phase = 'review'; save(); show(); break;
      case 'edit': attempt.phase = 'explain'; save(); show(); break;
      case 'finish':
        attempt.phase = 'complete'; attempt.completedAt = Date.now(); save();
        Labs.store(lab.id).guides[attempt.id] = attempt.completedAt;
        Labs.persist(); show(); break;
      case 'retry': run(); break;
      case 'pause': save(true); module.study.stop(); choose(); break;
      case 'choose': module.study.stop(); choose(); break;
      case 'explore':
        save(true); module.study.stop(); attempt = null; setMode('explore');
        node().innerHTML = `<p>Explore freely. You can return to a short investigation whenever you like.</p>${button('choose', 'Choose an investigation')}`; break;
      case 'resume': {
        const s = store(); resume(s.attempts[s.last]); break;
      }
    }
  }
  function resume(saved) {
        attempt = saved; attemptRun = null;
        if (!attempt) { choose(); return; }
        if (!definition() || attempt.version !== VERSION) { choose(); return; }
        if (attempt.phase === 'experiment' && attempt.snapshot) {
          module.unmount(); module.study.restore(decode(attempt.snapshot)); module.mount(root);
          Labs.closeOverlay(true); module.study.refresh(); show();
        } else if (attempt.phase === 'experiment') run();
        else show();
  }
  function onInput(e) {
    if (!attempt || !e.target.dataset.studyField) return;
    const field = e.target.dataset.studyField;
    if (!['prediction', 'observation', 'explanation'].includes(field)) return;
    attempt[field] = e.target.value.slice(0, 500); save();
  }
  function detach() {
    generation++;
    clearTimeout(timer); save(true);
    if (root) { root.removeEventListener('click', onClick, true); root.removeEventListener('input', onInput); }
    if (observed) observed.disconnect(); observed = null;
    root = null; lab = null; module = null; attempt = null; attemptRun = null; permitted = null;
  }
  function attach(host, descriptor, mod) {
    detach();
    if (!mod.study) return;
    root = host; lab = descriptor; module = mod;
    Labs.closeOverlay(true);
    root.addEventListener('click', onClick, true); root.addEventListener('input', onInput);
    choose();
    observed = new MutationObserver(() => {
      const guide = root?.querySelector('#lab-guide'), stage = root?.querySelector('.lab-stage');
      if (guide && stage && stage.firstElementChild !== guide) stage.prepend(guide);
    });
    observed.observe(root, { childList: true, subtree: true });
  }
  return { attach, detach, begin, complete, checkpoint, hint, encode, decode };
})();
if (typeof window !== 'undefined') window.LabStudy = LabStudy;
