'use strict';
// ══════════════════════════════════════════════
//  Science Labs - the shared shell: the hub, the lab registry and loader,
//  overlays, hazard signs and cards, the mission quiz, discoveries, progress.
//  NCE only (openLabs() in app.js). Plan: docs/labs/PLAN.md. How a lab is
//  built: docs/labs/LAB_SPEC.md.
//
//  Loaded ON DEMAND by RoleModules group 'labs' (engine/registry.js) - and it
//  is the ONLY file that group loads. Each lab's own files (its data, its
//  bench, its stylesheet) are fetched by _ensure() when that lab is opened, so
//  the hub costs one file and a lab costs only itself.
//
//  ⚠ Progress lives in DB.labs and NEVER reaches recordAnswer()/_recordDaily():
//    like the Game Zone, a lab must not move the mastery reports parents read.
//  ⚠ Every overlay is appended INSIDE #labs-root, which is inside
//    #screen-labs - a panel outside a .screen is never hidden by showScreen().
//  ⚠ A lab module is found through window[global]: each lab ends with
//    `window.LabX = LabX`, because a top-level const never lands on window.
// ══════════════════════════════════════════════
const Labs = (() => {
  const L = (id, icon, name, subject, global, blurb, ready) => ({
    id, icon, name, subject, global, blurb, ready: !!ready,
    files: [`engine/labs/lab_${id}_data.js`, `engine/labs/lab_${id}.js`],
    css: `engine/labs/lab_${id}.css`,
  });
  // `ready` decides whether the hub offers the lab. Labs.openLab() will load
  // any registered lab regardless - that is how a lab is tested before it is
  // switched on here.
  const LABS = [
    { id: 'mixing', icon: '🧪', name: 'Mixing Bench', subject: 'Chemistry', global: 'LabMixing', ready: true,
      blurb: 'Metals, acids and alkalis. Make things fizz, pop and change colour - and find out why.',
      files: ['engine/labs/lab_chem_data.js', 'engine/labs/lab_mixing.js'], css: null },
    L('separation', '⚗️', 'Separation Station', 'Chemistry', 'LabSeparation', 'Build a distillation rig, grow crystals and sublime a solid.', true),
    L('light',      '🔦', 'Light Bench',        'Physics',   'LabLight',      'Mirrors, glass blocks and a protractor. Bend a beam of light.', true),
    L('measure',    '📏', 'Measurement Lab',    'Physics',   'LabMeasure',    'Read a measuring cylinder and a vernier caliper - and beat parallax error.', true),
    L('circuit',    '💡', 'Circuit Board',      'Physics',   'LabCircuit',    'Snap cells, bulbs and switches into series and parallel circuits.', true),
    L('motion',     '🛷', 'Motion Track',       'Physics',   'LabMotion',     'Roll a trolley down a ramp and watch its speed-time graph draw itself.', true),
    L('photo',      '🌿', 'Photosynthesis Lab', 'Biology',   'LabPhoto',      'Pondweed, a lamp and a bubble counter. What does a plant need?', true),
    L('quadrat',    '🟩', 'Quadrat Field',      'Biology',   'LabQuadrat',    'Throw quadrats on a Mauritian habitat and estimate a population.', true),
    L('microscope', '🔬', 'Microscope',         'Biology',   'LabMicroscope', 'Look at blood cells, measure the drawing and work out the magnification.'),
    // Primary (PSAC Grades 4-6) labs - docs/labs/LAB_SPEC.md §8. Subject
    // 'Science' is not in SUBJECTS yet, so the hub does not list them until the
    // per-grade layer lands; Labs.openLab() still loads them for their tests.
    L('rusting',   '🔩', 'Rusting Lab',       'Science', 'LabRusting',   'Three test tubes, three iron nails. What does iron need to rust?', true),
    L('materials', '🧲', 'Materials Tester',  'Science', 'LabMaterials', 'Test objects with a magnet, a torch, a circuit and a bowl of water.'),
    L('water',     '💧', 'Water & States',    'Science', 'LabWater',     'Melt, boil, evaporate and condense - and make a water cycle in a jar.'),
    L('air',       '🕯️', 'Air & Burning',     'Science', 'LabAir',       'What does a flame need? Candles, jars and the fire triangle.'),
  ];
  const SUBJECTS = ['Chemistry', 'Physics', 'Biology'];

  let _open = null;           // the lab on the bench, or null for the hub
  let _mem = {};              // progress when there is no DB (a preview with no child)
  let _ovClose = null, _lastFocus = null;
  const _loading = new Map();

  const esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  function calm() {
    return document.documentElement.classList.contains('kid-calm')
      || !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  // The shared stylesheet travels with the module, so a child who never opens
  // Labs never downloads it either.
  function _css() {
    if (document.getElementById('lab-css')) return;
    const l = document.createElement('link');
    l.id = 'lab-css'; l.rel = 'stylesheet'; l.href = 'engine/labs/labs.css';
    document.head.appendChild(l);
  }

  // ── Loading one lab ─────────────────────────
  const _module = l => (typeof window !== 'undefined' && window[l.global]) || null;
  function _inject(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src; s.async = false;
      s.onload = () => resolve(src);
      s.onerror = () => reject(new Error('could not load ' + src));
      document.head.appendChild(s);
    });
  }
  // ⚠ A failed load drops its cached promise, so a retry can succeed - the same
  //   rule as PackLoader and RoleModules.
  function _ensure(l) {
    if (_module(l)) return Promise.resolve(true);
    if (_loading.has(l.id)) return _loading.get(l.id);
    if (l.css && !document.querySelector(`link[data-lab-css="${l.id}"]`)) {
      const k = document.createElement('link');
      k.rel = 'stylesheet'; k.href = l.css; k.setAttribute('data-lab-css', l.id);
      document.head.appendChild(k);
    }
    let chain = Promise.resolve();
    l.files.forEach(f => { chain = chain.then(() => _inject(f)); });
    const p = chain.then(() => !!_module(l)).catch(err => {
      _loading.delete(l.id);
      console.warn('[Labs]', l.id, err && err.message);
      return false;
    });
    _loading.set(l.id, p);
    return p;
  }

  // ── Progress ─────────────────────────────────
  function store(lab) {
    let root;
    if (typeof DB !== 'undefined' && DB && typeof DB === 'object') { DB.labs = DB.labs || {}; root = DB.labs; }
    else root = _mem;
    const s = root[lab] = root[lab] || {};
    s.disc = s.disc || {}; s.missions = s.missions || {}; s.hazards = s.hazards || {}; s.guides = s.guides || {};
    return s;
  }
  function persist() {
    if (typeof save === 'function' && typeof DB !== 'undefined' && DB) { try { save(DB); } catch (e) { console.warn('[Labs] save', e); } }
  }

  // info = { title, total } for the toast. Returns true only the first time.
  function discover(lab, id, info) {
    const s = store(lab);
    if (s.disc[id]) return false;
    s.disc[id] = Date.now();
    persist();
    const n = Object.keys(s.disc).length;
    if (typeof toast === 'function') {
      toast(`✨ New discovery: ${info && info.title ? info.title : id}${info && info.total ? ` (${n}/${info.total})` : ''}`, 2600);
    }
    return true;
  }

  function stars(n, big) {
    const k = Math.max(0, Math.min(3, n | 0));
    return `<span class="lab-stars${big ? ' is-big' : ''}" role="img" aria-label="${k} of 3 stars">`
      + '<b>' + '★'.repeat(k) + '</b>' + '☆'.repeat(3 - k) + '</span>';
  }

  function confetti() {
    if (!calm() && typeof launchConfetti === 'function') { try { launchConfetti(120); } catch (e) {} }
  }

  // ── Hazard signs ─────────────────────────────
  // Chemical hazards are GHS diamonds (red border, black symbol). Physical and
  // biological ones are ISO 7010 warning triangles (yellow, black border).
  const SIGN_LABELS = {
    corrosive: 'Corrosive', explosive: 'Explosive', flammable: 'Flammable', pressure: 'Gas under pressure',
    toxic: 'Toxic', irritant: 'Harmful', oxidising: 'Oxidising',
    electric: 'Electric shock', hot: 'Hot surface', eye: 'Bright light', biohazard: 'Biological hazard',
    warning: 'Caution',
  };
  // `warning` is the ISO 7010 general-warning "!" (W001), for a physical danger
  // no other sign names - a trolley off the end of a bench. The GHS "Harmful"
  // diamond says chemical, and borrowing it said the wrong thing.
  const TRIANGLE = new Set(['electric', 'hot', 'eye', 'biohazard', 'warning']);
  const GLYPH = {
    corrosive: '<rect x="18" y="20" width="8" height="15" rx="2" transform="rotate(-32 22 27)"/>'
             + '<rect x="38" y="20" width="8" height="15" rx="2" transform="rotate(32 42 27)"/>'
             + '<circle cx="27" cy="37.5" r="1.9"/><circle cx="37" cy="37.5" r="1.9"/>'
             + '<path d="M20 42h10l2 2.5 2-2.5h10v4.5H20z"/>',
    // A jagged burst with flying fragments - a round core with rays read as a sun.
    explosive: '<path d="M32 21l2.6 6.4 6.2-3.4-2 6.6 6.8.4-5.6 4 5.6 4-6.8.4 2 6.6-6.2-3.4L32 47l-2.6-6.4-6.2 3.4 2-6.6-6.8-.4 5.6-4-5.6-4 6.8-.4-2-6.6 6.2 3.4z"/>'
             + '<rect x="17" y="20" width="4" height="4" transform="rotate(20 19 22)"/><rect x="43" y="19" width="3.5" height="3.5" transform="rotate(-25 45 21)"/><rect x="45" y="42" width="3" height="3"/>',
    flammable: '<path d="M32 18.5c4 5.2 9.5 8.3 9.5 15.2a9.5 9.5 0 0 1-19 0c0-4.2 2.2-6.4 4.2-9.3 0 3.1 1.1 5.2 3.1 5.2-1-4.1 0-8.2 2.2-11.1z"/><rect x="21.5" y="45" width="21" height="3" rx="1"/>',
    pressure:  '<rect x="26.5" y="23.5" width="11" height="22" rx="5"/><rect x="29.5" y="18" width="5" height="6.5" rx="1"/>',
    toxic:     '<circle cx="32" cy="26.5" r="7.5"/><rect x="28" y="30" width="8" height="5.5" rx="1"/>'
             + '<circle cx="29" cy="26" r="2" fill="#fff"/><circle cx="35" cy="26" r="2" fill="#fff"/>'
             + '<path d="M21 38.5l22 8M43 38.5l-22 8" stroke="#111" stroke-width="3.2" stroke-linecap="round"/>',
    irritant:  '<rect x="29.5" y="18" width="5" height="18" rx="2.5"/><circle cx="32" cy="42.5" r="3"/>',
    oxidising: '<circle cx="32" cy="40" r="6.5" fill="none" stroke="#111" stroke-width="2.8"/>'
             + '<path d="M32 17.5c3 4 7.5 6.2 7.5 11a7.5 7.5 0 0 1-15 0c0-3 1.8-4.8 3.2-7 0 2.2.9 3.9 2.3 3.9-.8-3 0-6 2-7.9z"/>',
    electric:  '<path d="M35.5 22 25.5 38.5h6.5L28.5 50l11-18h-6.5l3.5-10z"/>',
    hot:       '<path d="M25 25c-3 3 3 6 0 9s3 6 0 9M32 25c-3 3 3 6 0 9s3 6 0 9M39 25c-3 3 3 6 0 9s3 6 0 9" stroke="#111" stroke-width="2.6" fill="none" stroke-linecap="round"/><rect x="21" y="46" width="22" height="3"/>',
    eye:       '<path d="M19 39c6.5-8.5 19.5-8.5 26 0-6.5 8.5-19.5 8.5-26 0z" fill="none" stroke="#111" stroke-width="2.8"/><circle cx="32" cy="39" r="4"/>'
             + '<path d="M32 22v5M22 25l3 4M42 25l-3 4" stroke="#111" stroke-width="2.4" stroke-linecap="round"/>',
    warning:   '<rect x="29.3" y="22" width="5.4" height="17" rx="2.7"/><circle cx="32" cy="45" r="3.2"/>',
    biohazard: '<circle cx="32" cy="31" r="5.5" fill="none" stroke="#111" stroke-width="2.8"/>'
             + '<circle cx="25.5" cy="42" r="5.5" fill="none" stroke="#111" stroke-width="2.8"/>'
             + '<circle cx="38.5" cy="42" r="5.5" fill="none" stroke="#111" stroke-width="2.8"/><circle cx="32" cy="38" r="2.4"/>',
  };
  function sign(kind, mini) {
    const frame = TRIANGLE.has(kind)
      ? `<path d="M32 6 L60 55 H4 Z" fill="#FFD200" stroke="#111" stroke-width="${mini ? 5 : 3.5}" stroke-linejoin="round"/>`
      : `<rect x="13" y="13" width="38" height="38" rx="3" transform="rotate(45 32 32)" fill="#fff" stroke="#D0131A" stroke-width="${mini ? 6 : 4.5}"/>`;
    const svg = `<svg viewBox="0 0 64 64" aria-hidden="true" class="${mini ? 'lab-sign-mini' : 'lab-sign-svg'}">${frame}<g fill="#111">${GLYPH[kind] || ''}</g></svg>`;
    if (mini) return svg;
    return `<figure class="lab-sign">${svg}<figcaption>${esc(SIGN_LABELS[kind] || kind)}</figcaption></figure>`;
  }

  // ── Overlays ─────────────────────────────────
  function overlay(html, opts = {}) {
    closeOverlay(true);
    const root = document.getElementById('labs-root');
    if (!root) return null;
    const ov = document.createElement('div');
    ov.id = 'lab-overlay';
    ov.className = 'lab-overlay ' + (opts.cls || '');
    ov.innerHTML = `<div class="lab-ov-card" role="dialog" aria-modal="true" aria-labelledby="lab-ov-title" tabindex="-1">${html}</div>`;
    root.appendChild(ov);
    _lastFocus = document.activeElement;
    _ovClose = opts.onClose || null;
    ov.addEventListener('click', e => {
      if (e.target === ov && opts.dismiss !== false) { closeOverlay(); return; }
      if (e.target.closest('[data-ov-close]')) closeOverlay();
    });
    ov.addEventListener('keydown', e => {
      if (e.key === 'Escape' && opts.dismiss !== false) { e.preventDefault(); closeOverlay(); }
    });
    const card = ov.firstElementChild;
    const f = card.querySelector('[data-autofocus]') || card.querySelector('button') || card;
    try { f.focus({ preventScroll: true }); } catch (e) {}
    return card;
  }

  function closeOverlay(silent) {
    const ov = document.getElementById('lab-overlay');
    if (!ov) return;
    ov.remove();
    const cb = _ovClose; _ovClose = null;
    if (!silent && cb) cb();
    try { if (_lastFocus && _lastFocus.isConnected) _lastFocus.focus({ preventScroll: true }); } catch (e) {}
  }

  // A mistake: the sign, what happened, why it matters, what to do instead,
  // and where the same point earns marks on the paper.
  function hazardCard(o) {
    overlay(`
      <div class="lab-hz-head">
        <div class="lab-hz-signs">${(o.signs || []).map(s => sign(s)).join('')}</div>
        <p class="lab-hz-kicker">⚠ Hazard</p>
        <h2 id="lab-ov-title">${esc(o.title)}</h2>
      </div>
      <div class="lab-hz-body">
        <section class="lab-hz-sec is-what"><h3>What happened</h3><p>${esc(o.happened)}</p></section>
        <section class="lab-hz-sec is-why"><h3>Why it’s dangerous</h3><p>${esc(o.why)}</p></section>
        <section class="lab-hz-sec is-do"><h3>✅ Do this instead</h3><p>${esc(o.instead)}</p></section>
        ${o.exam ? `<section class="lab-hz-sec is-exam"><h3>📝 On the NCE paper</h3><p>${esc(o.exam)}</p></section>` : ''}
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>${esc(o.button || 'Got it - try again safely')}</button></div>`,
      { cls: 'is-hazard', onClose: o.onClose });
  }

  // Not dangerous, but not right either (an overshot end point, a misread scale).
  function resultCard(o) {
    overlay(`
      <div class="lab-rs-head">
        <span class="lab-rs-icon" aria-hidden="true">${esc(o.icon || '🔎')}</span>
        <div><p class="lab-rs-kicker">What went wrong</p><h2 id="lab-ov-title">${esc(o.title)}</h2></div>
      </div>
      <div class="lab-hz-body">
        <section class="lab-hz-sec is-what"><h3>What happened</h3><p>${esc(o.happened)}</p></section>
        <section class="lab-hz-sec is-do"><h3>✅ What you should have done</h3><p>${esc(o.instead)}</p></section>
        ${o.exam ? `<section class="lab-hz-sec is-exam"><h3>📝 On the NCE paper</h3><p>${esc(o.exam)}</p></section>` : ''}
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>${esc(o.button || 'Got it')}</button></div>`,
      { cls: 'is-result', onClose: o.onClose });
  }

  function _shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }

  // One question per screen, one try each, the reason shown either way.
  // A question's FIRST option is the answer (in each lab's data file); shuffled here.
  function quiz(questions, o = {}) {
    const qs = questions.map(q => ({ q: q.q, why: q.why, opts: _shuffle(q.options.map((t, i) => ({ t, ok: i === 0 }))) }));
    let i = 0, first = 0, answered = false;
    const card = overlay('', { cls: 'is-quiz', dismiss: false });
    if (!card) return;
    const draw = () => {
      const q = qs[i];
      answered = false;
      card.innerHTML = `
        <p class="lab-quiz-meta">${esc(o.title || 'Questions')} · Question ${i + 1} of ${qs.length}</p>
        <div class="lab-quiz-bar" aria-hidden="true"><i style="width:${Math.round((i / qs.length) * 100)}%"></i></div>
        <h2 id="lab-ov-title" class="lab-quiz-q">${esc(q.q)}</h2>
        <div class="lab-quiz-opts">${q.opts.map((op, k) =>
          `<button type="button" class="lab-quiz-opt" data-k="${k}"><span class="lab-quiz-letter">${'ABCD'[k]}</span><span>${esc(op.t)}</span></button>`).join('')}</div>
        <div class="lab-quiz-fb" aria-live="polite"></div>`;
      const b = card.querySelector('.lab-quiz-opt');
      if (b) b.focus({ preventScroll: true });
    };
    card.addEventListener('click', e => {
      const opt = e.target.closest('.lab-quiz-opt');
      if (opt && !answered) {
        answered = true;
        const q = qs[i], picked = q.opts[+opt.dataset.k];
        if (picked.ok) first++;
        card.querySelectorAll('.lab-quiz-opt').forEach((x, k) => { x.disabled = true; if (q.opts[k].ok) x.classList.add('is-right'); });
        if (!picked.ok) opt.classList.add('is-wrong');
        const fb = card.querySelector('.lab-quiz-fb');
        fb.innerHTML = `<p class="${picked.ok ? 'is-right' : 'is-wrong'}"><b>${picked.ok ? 'Correct!' : 'Not quite.'}</b> ${esc(q.why)}</p>
          <button type="button" class="lab-btn lab-btn-primary" data-next>${i + 1 < qs.length ? 'Next question →' : 'See my result'}</button>`;
        fb.querySelector('[data-next]').focus({ preventScroll: true });
        return;
      }
      if (e.target.closest('[data-next]')) {
        i++;
        if (i < qs.length) draw();
        else { closeOverlay(true); if (o.onDone) o.onDone({ firstTry: first, total: qs.length }); }
      }
    });
    draw();
  }

  function missionDone(o) {
    const card = overlay(`
      <div class="lab-done">
        <p class="lab-done-icon" aria-hidden="true">${esc(o.icon || '🏆')}</p>
        <p class="lab-rs-kicker">Mission complete</p>
        <h2 id="lab-ov-title">${esc(o.title)}</h2>
        ${stars(o.stars, true)}
        <p class="lab-done-score">${o.score} of ${o.total} questions right first time</p>
        <ul class="lab-done-list">${(o.lines || []).map(l => `<li>${esc(l)}</li>`).join('')}</ul>
      </div>
      <div class="lab-ov-actions">
        <button type="button" class="lab-btn" data-again>Play again</button>
        <button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>Done</button>
      </div>`, { cls: 'is-done', onClose: o.onClose });
    if (card) card.querySelector('[data-again]').addEventListener('click', () => { closeOverlay(true); if (o.onAgain) o.onAgain(); });
    if (o.stars >= 3) confetti();
  }

  // ── Hub ──────────────────────────────────────
  function _hubHTML() {
    // The LAB's grade, not the child's: a Grade 5 pupil a parent has given
    // Grade 9 access is still doing Grade 9 science in here.
    const g = (typeof _LAB_GRADES !== 'undefined' && _LAB_GRADES.length) ? _LAB_GRADES.join(' & ') : 9;
    const card = l => {
      if (!l.ready) {
        return `<div class="lab-card is-soon" aria-disabled="true">
          <span class="lab-card-icon" aria-hidden="true">${l.icon}</span>
          <span class="lab-card-name">${esc(l.name)}</span>
          <span class="lab-card-blurb">${esc(l.blurb)}</span>
          <span class="lab-card-meta">Coming soon</span></div>`;
      }
      const s = store(l.id);
      const found = Object.keys(s.disc).length;
      const earned = Object.values(s.missions).reduce((a, m) => a + (m.stars || 0), 0);
      const meta = found || earned ? `✨ ${found} found · ★ ${earned} stars` : 'Not started yet';
      return `<button type="button" class="lab-card" data-lab="${l.id}">
        <span class="lab-card-icon" aria-hidden="true">${l.icon}</span>
        <span class="lab-card-name">${esc(l.name)}</span>
        <span class="lab-card-blurb">${esc(l.blurb)}</span>
        <span class="lab-card-meta">${meta}</span>
        <span class="lab-card-go" aria-hidden="true">Open the lab →</span></button>`;
    };
    return `<div class="lab lab-hub">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-hub-exit aria-label="Back to my board">←</button>
        <div class="lab-top-title"><span class="lab-eyebrow">NCE · Grade ${esc(g)}</span><h1>Science Labs</h1></div>
      </header>
      <p class="lab-hub-lede">Real experiments with real science. Get it wrong and you’ll see exactly what would have happened - and what to do instead.</p>
      ${SUBJECTS.map(sub => `<section class="lab-hub-subject" aria-label="${sub}">
        <h2 class="lab-card-subject">${sub}</h2>
        <div class="lab-hub-grid">${LABS.filter(l => l.subject === sub).map(card).join('')}</div>
      </section>`).join('')}
      <p class="lab-hub-foot">🥽 These labs follow real school-lab safety rules. Nothing here is for trying at home.</p>
    </div>`;
  }

  function _wireHub(root) {
    root.onclick = e => {
      const c = e.target.closest('[data-lab]');
      if (c) { openLab(c.dataset.lab); return; }
      if (e.target.closest('[data-hub-exit]')) exit();
    };
  }

  function render() {
    _css();
    const root = document.getElementById('labs-root');
    if (!root) return;
    const l = _open && LABS.find(x => x.id === _open);
    if (l) {
      const mod = _module(l);
      root.onclick = null;
      if (mod) { mod.mount(root); return; }
      root.innerHTML = `<div class="lab"><p class="lab-hub-lede">Opening the ${esc(l.name)}…</p></div>`;
      _ensure(l).then(ok => {
        if (_open !== l.id) return;
        if (ok) { render(); return; }
        root.innerHTML = `<div class="lab"><p class="lab-hub-lede">The ${esc(l.name)} could not be loaded. Check your connection and try again.</p>
          <button type="button" class="lab-btn lab-btn-primary" data-hub-back>Back to Science Labs</button></div>`;
        root.onclick = e => { if (e.target.closest('[data-hub-back]')) backToHub(); };
      });
      return;
    }
    _open = null;
    root.innerHTML = _hubHTML();
    _wireHub(root);
  }

  function openLab(id) {
    if (!LABS.find(x => x.id === id)) return;
    _open = id;
    render();
    const root = document.getElementById('labs-root');
    if (root) root.scrollIntoView({ block: 'start' });
  }

  function _unmountOpen() {
    const l = _open && LABS.find(x => x.id === _open);
    const m = l && _module(l);
    if (m && m.unmount) m.unmount();
  }

  function backToHub() {
    closeOverlay(true);
    _unmountOpen();
    _open = null;
    render();
  }

  function exit() {
    closeOverlay(true);
    _unmountOpen();
    _open = null;
    if (typeof StudentHome !== 'undefined' && StudentHome.open) StudentHome.open();
    else if (typeof showScreen === 'function') showScreen('student-home');
  }

  return { LABS, SIGN_LABELS, render, openLab, backToHub, exit, store, persist, discover, stars, confetti,
           calm, esc, sign, overlay, closeOverlay, hazardCard, resultCard, quiz, missionDone };
})();
if (typeof window !== 'undefined') window.Labs = Labs;
