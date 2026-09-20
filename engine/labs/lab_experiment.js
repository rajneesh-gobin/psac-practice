'use strict';
// ══════════════════════════════════════════════
//  Science Labs - the experiment runner (docs/labs/REWORK_PLAN_2026-09-19.md §4).
//
//  One shape for every lab and every grade, six stops in the same words:
//    Aim → Predict → Do → See → Check → Done
//  The bench keeps its simulation, its guide box and its glow; this file owns
//  the panel above the bench, the order of the stops, the prediction, the
//  evidence, the quiz and what gets saved. A lab joins in by exporting an
//  `experiment` adapter (LAB_SPEC.md §10) and an EXPERIMENTS list in its data.
//
//  ⚠ Progress lives in Labs.store(<lab>).done[<experiment id>] and never
//    reaches recordAnswer()/_recordDaily() - same rule as games and missions.
//  ⚠ The child never types. Predict is a tap; Check is the MCQ quiz; See is
//    what the bench recorded.
//  ⚠ Loaded by the `labs` RoleModules group beside lab_core.js. Found through
//    window.LabExperiment (a top-level const never lands on window by itself).
// ══════════════════════════════════════════════
const LabExperiment = (() => {
  const STOPS = [['aim', 'Aim'], ['predict', 'Predict'], ['do', 'Do'], ['see', 'See'], ['check', 'Check'], ['done', 'Done']];
  let _root = null, _lab = null, _mod = null, _list = [];
  let _exp = null, _phase = 'aim', _predicted = null, _step = 0, _result = null, _wrongs = 0;
  let _guideHome = null;   // where #lab-guide lived before Do borrowed it
  let _talking = false;
  const esc = s => Labs.esc(s);
  const $ = sel => _root && _root.querySelector(sel);

  // ── Progress ─────────────────────────────────
  function store() { const s = Labs.store(_lab.id); s.done = s.done || {}; return s; }
  const isDone = e => !!store().done[e.id];
  function nextAfter(e) {
    const i = e ? _list.findIndex(x => x.id === e.id) : -1;
    return _list.slice(i + 1).find(x => !isDone(x)) || _list.find(x => !isDone(x)) || null;
  }
  // Grade 9 science is three packs; the chapter id says which (g9s-b…, c…, p…).
  const packFor = e => e.pack || (Number(Labs.grade()) === 9
    ? ({ b: 'grade9-biology', c: 'grade9-chemistry', p: 'grade9-physics' }[(String(e.chapter).match(/^g9s-([bcp])/) || [])[1]] || 'grade9-physics')
    : `grade${Labs.grade()}-science`);

  // ── Read aloud (never automatic) ─────────────
  function _hush() { if (!_talking) return; _talking = false; try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {} }
  function _say(text) {
    const ss = window.speechSynthesis;
    if (!ss || typeof SpeechSynthesisUtterance === 'undefined') return;
    _hush();
    const clean = String(text || '').replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, '').replace(/[→▶]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!clean) return;
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = 'en-GB'; u.rate = 0.95;
    try {
      const vs = (ss.getVoices && ss.getVoices()) || [];
      const en = vs.filter(v => /^en/i.test(v.lang || ''));
      const v = en.find(x => /en[-_]GB/i.test(x.lang) && x.localService) || en.find(x => x.localService) || en[0];
      if (v) u.voice = v;
    } catch (e) {}
    u.onend = u.onerror = () => { _talking = false; };
    _talking = true;
    try { ss.speak(u); } catch (e) { _talking = false; }
  }

  // ── Panel ────────────────────────────────────
  function node() {
    let el = $('#lab-exp');
    if (!el) {
      el = document.createElement('section');
      el.id = 'lab-exp'; el.className = 'lab-exp'; el.setAttribute('aria-live', 'polite');
      const top = $('.lab-top');
      if (top) top.after(el); else _root.prepend(el);
    }
    return el;
  }
  function mode(m) { _phase = m; _root.dataset.expMode = m; }
  function progress(phase) {
    const i = STOPS.findIndex(s => s[0] === phase);
    return `<ol class="lab-exp-progress" aria-label="Experiment progress">${STOPS.map(([k, label], n) =>
      `<li class="${n < i ? 'is-done' : n === i ? 'is-now' : ''}"${n === i ? ' aria-current="step"' : ''}><i>${n + 1}</i>${esc(label)}</li>`).join('')}</ol>`;
  }
  const btn = (act, label, primary, extra = '') => `<button type="button" class="lab-btn${primary ? ' lab-btn-primary' : ''}${extra}" data-exp="${act}">${label}</button>`;
  const speak = text => `<button type="button" class="lab-icon-btn lab-exp-say" data-exp="say" data-say="${esc(text)}" aria-label="Read this aloud">🔊</button>`;

  function render() {
    if (!_root || !_exp) return;
    const e = _exp, n = _list.indexOf(e) + 1, total = _list.length, doneN = _list.filter(isDone).length;
    let html = '';
    if (_phase === 'aim') {
      html = `<p class="lab-exp-kicker">🔬 Experiment ${n} of ${total}${isDone(e) ? ' · ✓ done before' : ''}</p>
        <h2 class="lab-exp-title" id="lab-exp-title">${esc(e.title)}</h2>
        <p class="lab-exp-aim">${esc(e.aim)}</p>
        <div class="lab-exp-actions">${speak(e.title + '. ' + e.aim)}${btn('start', 'Start ▶', true, ' lab-btn-wide')}</div>
        <details class="lab-exp-others"><summary>Other experiments · ${doneN} of ${total} done</summary>
          <ul>${_list.map(x => `<li><button type="button" class="lab-exp-other${x === e ? ' is-current' : ''}" data-exp-open="${esc(x.id)}">${x.icon || '🔬'} ${esc(x.title)}${isDone(x) ? ' <em>✓</em>' : ''}</button></li>`).join('')}</ul>
          ${btn('explore', 'Explore the bench freely', false, ' lab-btn-sm')}
        </details>`;
    } else if (_phase === 'predict') {
      const p = e.predict;
      html = progress('predict') + `<h2 class="lab-exp-title" id="lab-exp-title">${esc(p.q)}</h2>
        <div class="lab-exp-opts">${p.options.map(o => `<button type="button" class="lab-exp-opt" data-exp-pick="${esc(o.id)}">${o.icon ? `<span class="lab-exp-opt-icon" aria-hidden="true">${o.icon}</span>` : ''}<b>${esc(o.label)}</b>${o.sub ? `<small>${esc(o.sub)}</small>` : ''}</button>`).join('')}</div>
        <p class="lab-hint">Just have a go. A prediction is never marked.</p>
        <div class="lab-exp-actions">${speak(p.q + '. ' + p.options.map(o => o.label).join(', or '))}</div>`;
    } else if (_phase === 'do') {
      const steps = e.steps.length, s = e.steps[Math.min(_step, steps - 1)];
      html = progress('do') + `<div class="lab-exp-strip"><p class="lab-exp-strip-text"><b class="lab-exp-next-label">Next action · step ${Math.min(_step + 1, steps)} of ${steps}</b>${esc(s.say || s.ask || '')}</p>
        <div class="lab-exp-strip-actions">${speak(s.say || s.ask || '')}<button type="button" class="lab-btn lab-btn-sm" data-exp="where">💡 Where?</button></div></div>`;
    } else if (_phase === 'see') {
      const p = e.predict, mine = p && p.options.find(o => o.id === _predicted), right = p && p.options.find(o => o.id === p.answer);
      const ev = evidence();
      html = progress('see') + `<p class="lab-exp-kicker">👀 What happened</p>
        <h2 class="lab-exp-title" id="lab-exp-title">${esc(e.see.saw)}</h2>
        ${p ? `<p class="lab-exp-predict ${_predicted === p.answer ? 'is-right' : 'is-wrong'}">You said: <b>${esc(mine ? mine.label : 'not sure')}</b>. ${_predicted === p.answer ? '✓ That is what happened!' : `It was <b>${esc(right ? right.label : '')}</b>. Now you know.`}</p>` : ''}
        ${ev.length ? `<section class="lab-exp-evidence"><h3>Your notebook</h3><ul>${ev.map(v => `<li>${esc(v)}</li>`).join('')}</ul></section>` : ''}
        <div class="lab-exp-actions">${speak(e.see.saw)}${btn('check', `Check what you learnt ▶`, true, ' lab-btn-wide')}</div>`;
    } else if (_phase === 'check') {
      html = progress('check') + `<h2 class="lab-exp-title" id="lab-exp-title">${esc(e.check.length)} quick question${e.check.length === 1 ? '' : 's'} about what you saw</h2>
        <div class="lab-exp-actions">${btn('quiz', 'Answer the questions ▶', true, ' lab-btn-wide')}</div>`;
    } else if (_phase === 'done') {
      const nx = nextAfter(e), r = _result || { firstTry: 0, total: 0 };
      html = progress('done') + `<p class="lab-exp-kicker">✅ Experiment complete</p>
        <h2 class="lab-exp-title" id="lab-exp-title">${esc(e.title)}</h2>
        <section class="lab-hz-sec is-do lab-exp-learn"><h3>You found out</h3><p>${esc(e.see.learn)}</p></section>
        ${e.exam ? `<section class="lab-hz-sec is-exam"><h3>${esc(Labs.grade() <= 6 ? '📝 In the PSAC exam' : '📝 In your exam')}</h3><p>${esc(e.exam)}</p></section>` : ''}
        <p class="lab-exp-score">${r.total ? `${r.firstTry} of ${r.total} right first time.` : ''}${r.total && r.firstTry === r.total ? ' ⭐ Perfect!' : ''}</p>
        <div class="lab-exp-actions is-col">
          ${nx ? btn('next', `Next experiment: ${esc(nx.title)} ▶`, true, ' lab-btn-wide') : btn('hub', 'All experiments done! Back to Science Labs ▶', true, ' lab-btn-wide')}
          ${e.chapter ? btn('practise', 'Practise this chapter →', false, ' lab-btn-wide') : ''}
          ${btn('explore', 'Explore the bench', false, ' lab-btn-wide')}
        </div>`;
    } else if (_phase === 'explore') {
      html = `<div class="lab-exp-strip"><p class="lab-exp-strip-text">Free bench. Try your own ideas.</p>
        <div class="lab-exp-strip-actions">${btn('back', '◀ Back to the experiments', false, ' lab-btn-sm')}</div></div>`;
    }
    node().innerHTML = html;
  }

  function evidence() {
    try { return (_mod.experiment.evidence ? _mod.experiment.evidence() : []).filter(Boolean).slice(0, 6).map(String); } catch (e) { return []; }
  }
  function scrollTop() {
    const el = node();
    try { el.scrollIntoView({ block: 'start', behavior: 'auto' }); } catch (e) {}
  }

  // ── The stops ────────────────────────────────
  function open(e) {
    _hush();
    Labs.closeOverlay(true);
    returnGuide();
    _exp = e; _predicted = null; _step = 0; _result = null; _wrongs = 0;
    _mod.experiment.reset();
    (e.setup || []).forEach(t => { try { _mod.experiment.apply(t); } catch (err) { console.warn('[Labs] setup', t, err); } });
    focus([]);
    mode('aim'); render(); scrollTop();
  }
  function focus(tokens) { if (_mod.experiment.focus) { try { _mod.experiment.focus(tokens); } catch (e) {} } }
  function stepTokens() {
    const out = [];
    _exp.steps.forEach(s => { (s.options || s.any || (s.on ? [s.on] : [])).forEach(t => out.push(t)); });
    return out;
  }
  function borrowGuide() {
    const g = $('#lab-guide'), wrap = $('.lab-canvas-wrap');
    if (!g || !wrap || g.parentNode === wrap) return;
    _guideHome = { parent: g.parentNode, next: g.nextSibling };
    wrap.appendChild(g);
  }
  function returnGuide() {
    const g = $('#lab-guide');
    if (g && _guideHome && _guideHome.parent && _guideHome.parent.isConnected) {
      _guideHome.parent.insertBefore(g, _guideHome.next && _guideHome.next.isConnected ? _guideHome.next : null);
    }
    _guideHome = null;
  }
  function startDo() {
    const e = _exp;
    if (!e.steps || !e.steps.length) { finishDo(); return; }
    _step = 0;
    focus(stepTokens());
    mode('do'); render();
    borrowGuide();
    _mod.experiment.guide({
      id: 'exp-' + e.id, adhoc: true, exp: true, icon: e.icon || '🔬', title: e.title,
      steps: e.steps.map(s => ({ on: s.on, any: s.any, options: s.options, wrong: s.wrong, say: s.say || s.ask || '' })),
    });
    const wrap = $('.lab-canvas-wrap');
    if (wrap) { try { wrap.scrollIntoView({ block: 'start', behavior: 'auto' }); } catch (err) {} }
  }
  function finishDo() {
    returnGuide();
    focus([]);
    mode('see'); render(); scrollTop();
  }
  function startCheck() {
    const e = _exp;
    const qs = (e.check || []).map(ref => _mod.experiment.question(ref)).filter(q => q && q.q && q.options);
    if (!qs.length) { finish({ firstTry: 0, total: 0 }); return; }
    mode('check'); render();
    Labs.quiz(qs, { title: e.title, evidence: evidence(), onDone: finish });
  }
  function finish(r) {
    const e = _exp;
    _result = r;
    const s = store();
    const prev = s.done[e.id] || {};
    s.done[e.id] = { at: Date.now(), score: r.firstTry, total: r.total, best: Math.max(prev.best || 0, r.firstTry),
                     predicted: _predicted, right: !!(e.predict && _predicted === e.predict.answer), wrongs: _wrongs };
    Labs.persist();
    mode('done'); render(); scrollTop();
    if (r.total && r.firstTry === r.total) Labs.confetti();
  }
  function explore() {
    _hush(); Labs.closeOverlay(true);
    try { _mod.experiment.stop(); } catch (e) {}
    returnGuide(); focus(null);
    mode('explore'); render();
  }
  function whereNext() {
    const el = $('.is-next:not(.is-guide-dim)') || $('.is-next') || $('#lab-guide');
    if (!el) return;
    el.classList.remove('is-idle-hint'); void el.offsetWidth; el.classList.add('is-idle-hint');
    el.addEventListener('animationend', () => el.classList.remove('is-idle-hint'), { once: true });
    try { el.scrollIntoView({ block: 'center', behavior: Labs.calm() ? 'auto' : 'smooth' }); } catch (e) {}
  }

  // ── Hooks the bench calls while an experiment guide runs ──
  function onToken(token, step) {
    if (_phase !== 'do' || !step) return;
    const wrong = step.wrong && step.wrong[token];
    if (!wrong) return;
    _wrongs++;
    Labs.resultCard({ icon: '🤔', title: 'Not that one', happened: wrong, instead: step.say || step.ask || '', button: 'Try again' });
  }
  function onStep(i) { if (_phase === 'do') { _step = i; render(); } }
  function onGuideDone() { if (_phase === 'do') finishDo(); }

  // ── Clicks ───────────────────────────────────
  function onClick(ev) {
    const openBtn = ev.target.closest('[data-exp-open]');
    const pick = ev.target.closest('[data-exp-pick]');
    const act = ev.target.closest('[data-exp]');
    if (!openBtn && !pick && !act) return;
    ev.preventDefault(); ev.stopImmediatePropagation();
    if (openBtn) { const e = _list.find(x => x.id === openBtn.dataset.expOpen); if (e) open(e); return; }
    if (pick) { _predicted = pick.dataset.expPick; startDo(); return; }
    switch (act.dataset.exp) {
      case 'say': _say(act.dataset.say || ''); break;
      case 'start': if (_exp.predict && _exp.predict.options && _exp.predict.options.length) { mode('predict'); render(); scrollTop(); } else startDo(); break;
      case 'where': whereNext(); break;
      case 'check': startCheck(); break;
      case 'quiz': startCheck(); break;
      case 'next': { const nx = nextAfter(_exp); if (nx) open(nx); else Labs.backToHub(); break; }
      case 'hub': Labs.backToHub(); break;
      case 'practise': Labs.practiseChapter(packFor(_exp), _exp.chapter); break;
      case 'explore': explore(); break;
      case 'back': open(_exp); break;
    }
  }

  // ── Attach / detach ──────────────────────────
  // opts: { experiment: id } or { chapter: chapterId } picks where to start.
  function attach(root, lab, mod, opts) {
    detach();
    if (!mod || !mod.experiment || typeof mod.experiment.list !== 'function') return false;
    let list = [];
    try { list = mod.experiment.list() || []; } catch (e) { list = []; }
    if (!list.length) return false;
    _root = root; _lab = lab; _mod = mod; _list = list;
    mod.experiment.hooks = { token: onToken, step: onStep, done: onGuideDone };
    root.addEventListener('click', onClick, true);
    // The Aim IS the welcome: the bench's own first-visit card would say "tap
    // Show me how" and start the old guide instead.
    store().intro = true;
    let e = null;
    if (opts && opts.experiment) e = _list.find(x => x.id === opts.experiment) || null;
    if (!e && opts && opts.chapter) e = _list.find(x => x.chapter === opts.chapter && !isDone(x)) || _list.find(x => x.chapter === opts.chapter) || null;
    if (!e) e = nextAfter(null) || _list[0];
    open(e);
    return true;
  }
  function detach() {
    _hush();
    if (_root) {
      _root.removeEventListener('click', onClick, true);
      returnGuide();
      delete _root.dataset.expMode;
      const el = _root.querySelector('#lab-exp'); if (el) el.remove();
    }
    if (_mod && _mod.experiment) _mod.experiment.hooks = {};
    _root = null; _lab = null; _mod = null; _list = []; _exp = null; _phase = 'aim'; _predicted = null; _result = null;
  }
  const active = () => !!_exp;

  function _debug() {
    const s = _exp && _exp.steps && _exp.steps[_step];
    return { lab: _lab && _lab.id, exp: _exp && _exp.id, phase: _phase, step: _step, predicted: _predicted, wrongs: _wrongs,
             token: s ? (s.on || (s.any && s.any[0]) || null) : null, tokens: s ? (s.options || s.any || [s.on]) : [],
             list: _list.map(x => x.id), done: _lab ? Object.keys(store().done) : [], result: _result };
  }

  return { attach, detach, active, open: id => { const e = _list.find(x => x.id === id); if (e) open(e); }, _debug };
})();
if (typeof window !== 'undefined') window.LabExperiment = LabExperiment;
