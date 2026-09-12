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
  // `grades`: the grades a lab has content for. When a lab gains a level (a
  // Grade 8 set in the Separation Station, say) add the grade here AND to
  // _LAB_GRADES in app.js, which the home note reads before this file is ever
  // loaded - scripts/test-labs-grades.js fails if the two disagree.
  // `blurb` may be { 9: '…', 4: '…' } when a lab reads differently per grade.
  const L = (id, icon, name, subject, global, blurb, grades, ready) => ({
    id, icon, name, subject, global, grades, ready: !!ready,
    blurb: typeof blurb === 'object' ? blurb[grades[grades.length - 1]] : blurb,
    blurbs: typeof blurb === 'object' ? blurb : null,
    files: [`engine/labs/lab_${id}_data.js`, `engine/labs/lab_${id}.js`],
    css: `engine/labs/lab_${id}.css`,
  });
  // `ready` decides whether the hub offers the lab. Labs.openLab() will load
  // any registered lab regardless - that is how a lab is tested before it is
  // switched on here.
  const LABS = [
    { id: 'mixing', icon: '🧪', name: 'Mixing Bench', subject: 'Chemistry', global: 'LabMixing', grades: [8, 9], ready: true,
      blurb: 'Metals, acids and alkalis. Make things fizz, pop and change colour - and find out why.',
      blurbs: { 9: 'Metals, acids and alkalis. Make things fizz, pop and change colour - and find out why.',
                8: 'Kitchen acids and alkalis: universal indicator, litmus and neutralisation.' },
      files: ['engine/labs/lab_chem_data.js', 'engine/labs/lab_mixing.js'], css: null },
    L('separation', '⚗️', 'Separation Station', 'Chemistry', 'LabSeparation', {
      9: 'Build a distillation rig, grow crystals and sublime a solid.',
      8: 'Filter muddy water, evaporate salt water and split ink into its dyes.',
      7: 'Dissolve salt, weigh it, then get it back - and sort mixtures from compounds.' }, [7, 8, 9], true),
    L('light',      '🔦', 'Light Bench',        'Physics',   'LabLight',      {
      9: 'Mirrors, glass blocks and a protractor. Bend a beam of light.',
      4: 'A torch, a screen and shadows. What lets light through - and what blocks it?' }, [4, 9], true),
    L('measure',    '📏', 'Measurement Lab',    'Physics',   'LabMeasure',    {
      9: 'Read a measuring cylinder and a vernier caliper - and beat parallax error.',
      4: 'Rulers, jugs, thermometers and scales. Pick the right tool and read it right.',
      7: 'Read a measuring cylinder, find a stone’s volume by displacement and weigh it.',
      8: 'Mass ÷ volume: find each density, then watch it float or sink in water.' }, [4, 7, 8, 9], true),
    L('circuit',    '💡', 'Circuit Board',      'Physics',   'LabCircuit',    {
      9: 'Snap cells, bulbs and switches into series and parallel circuits.',
      4: 'Build a circuit and light a bulb. Which things let electricity through?',
      6: 'Light a bulb, find conductors and insulators - and stay safe with electricity.',
      7: 'Build circuits from their symbols, wire series and parallel, place the meters.' }, [4, 6, 7, 9], true),
    L('motion',     '🛷', 'Motion Track',       'Physics',   'LabMotion',     'Roll a trolley down a ramp and watch its speed-time graph draw itself.', [9], true),
    L('photo',      '🌿', 'Photosynthesis Lab', 'Biology',   'LabPhoto',      {
      9: 'Pondweed, a lamp and a bubble counter. What does a plant need?',
      4: 'Grow plants in the light and the dark. What does a plant need to grow?',
      6: 'Plants make their own food. Test light, water and leaves - and count the bubbles.' }, [4, 6, 9], true),
    L('quadrat',    '🟩', 'Quadrat Field',      'Biology',   'LabQuadrat',    'Throw quadrats on a Mauritian habitat and estimate a population.', [9], true),
    L('microscope', '🔬', 'Microscope',         'Biology',   'LabMicroscope', {
      9: 'Look at blood cells, measure the drawing and work out the magnification.',
      7: 'Make your own slides: onion skin, cheek cells and a leaf. Name the parts of a cell.' }, [7, 9], true),
    // Primary (PSAC Grades 4-6) labs - docs/labs/LAB_SPEC.md §8.
    L('rusting',   '🔩', 'Rusting Lab',       'Science', 'LabRusting',   'Three test tubes, three iron nails. What does iron need to rust?', [6], true),
    L('materials', '🧲', 'Materials Tester',  'Science', 'LabMaterials', 'Test objects with a magnet, a torch, a circuit and a bowl of water.', [4], true),
    L('water',     '💧', 'Water & States',    'Science', 'LabWater',     'Melt, boil, evaporate and condense - and make a water cycle in a jar.', [4], true),
    L('air',       '🕯️', 'Air & Burning',     'Science', 'LabAir',       'What does a flame need? Candles, jars and the fire triangle.', [4, 6], true),
    L('food',      '🥪', 'Food Tests',        'Science', 'LabFood',      'Test foods for starch, sugar, protein and fat - and read the colours.', [8], true),
    L('sunmoon',   '🌍', 'Sun, Earth & Moon', 'Science', 'LabSunmoon',  {
      6: 'Spin Earth to create day and night. Place a shadow stick. Trigger eclipses.',
      7: 'Explore eight moon phases, tidal locking, seasons and eclipse geometry.' }, [6, 7], true),
    L('forces',    '⚖️', 'Forces & Pressure', 'Science', 'LabForces',
      'Hang weights on a spring balance and press pads into soft ground — measure force and pressure.', [8], true),
    L('magnets',   '🧲', 'Magnets',           'Science', 'LabMagnets', {
      4: 'Test objects with a magnet. Which things are pulled? Sort them — magnetic or not.',
      8: 'Two bar magnets, iron filings and a plotting compass. Map the invisible field.' }, [4, 8], true),
    L('heat',      '🔥', 'Heat Transfer',     'Science', 'LabHeat',
      'Conduction, convection and radiation. Three stations, three big ideas.', [6], true),
    L('nutrition', '🥦', 'Food Groups & Teeth', 'Science', 'LabNutrition', {
      6: 'Build a balanced meal, test food groups, and label the four types of teeth.' }, [6], true),
    L('gastests',  '💨', 'Gas Tests',          'Science', 'LabGastests',
      'Collect gas and test it: does the glowing splint relight? Does limewater go milky? Does the lit splint pop?', [7], true),
    L('changes',   '🔥', 'Physical & Chemical Changes', 'Science', 'LabChanges', {
      7: 'Sort changes into physical and chemical. Can you reverse it? Was a new substance made?',
      8: 'Classify reactions by observation: colour change, gas, precipitate, temperature shift.' }, [7, 8], true),
    L('energy',    '⚡', 'Work, Energy & Power', 'Science', 'LabEnergy',
      'Pull a weight up a ramp and calculate the work done. Do it faster — compare the power.', [8], true),
    { id: 'periodic', icon: '⚗️', name: 'Periodic Table', subject: 'Chemistry', global: 'LabPeriodic',
      grades: [9], ready: true,
      blurb: 'Explore all 118 elements — filter by type, build compound formulae.',
      blurbs: null,
      files: ['engine/labs/lab_periodic_data.js', 'engine/labs/lab_periodic.js'],
      css: 'engine/labs/lab_periodic.css' },
  ];
  // ⚠ The app has no core Grade 5 science yet (docs/labs/PLAN.md), so a Grade 5
  //   pupil uses the primary labs built for Grades 4 and 6.
  const GRADE_ALIASES = { 5: [4, 6] };
  const SUBJECTS = ['Science', 'Chemistry', 'Physics', 'Biology'];

  let _open = null;           // the lab on the bench, or null for the hub
  let _mem = {};              // progress when there is no DB (a preview with no child)
  let _ovClose = null, _lastFocus = null;
  const _loading = new Map();

  // ── Grades ───────────────────────────────────
  let _grade = null;          // the grade picked in the hub
  let _labGrade = null;       // the grade the open lab is being used at

  const _serves = (l, g) => l.grades.includes(g) || (GRADE_ALIASES[g] || []).some(a => l.grades.includes(a));
  function labsFor(g) { return LABS.filter(l => _serves(l, Number(g))); }
  function _ownGrade() {
    if (typeof GradeAccess !== 'undefined') return Number(GradeAccess.ownGrade());
    return Number(typeof SELECTED_GRADE !== 'undefined' && SELECTED_GRADE) || 9;
  }
  // What this child may pick: their own grade and any a parent unlocked ABOVE
  // it (GradeAccess.childChoices - a child aims up, never quietly down), and
  // only grades with at least one ready lab.
  function usableGrades() {
    const choices = typeof GradeAccess !== 'undefined' ? GradeAccess.childChoices() : [_ownGrade()];
    return [...new Set(choices.map(Number))].filter(g => labsFor(g).some(l => l.ready)).sort((a, b) => a - b);
  }
  // ⚠ The pick belongs to ONE child: switching child never reloads the page,
  //   so a Grade 6 child would otherwise open on the Grade 9 a sibling chose.
  let _gradeKey = '';
  function _pickGrade() {
    const usable = usableGrades();
    const own = _ownGrade(), key = own + ':' + usable.join();
    if (key !== _gradeKey) { _gradeKey = key; _grade = null; }
    if (_grade && usable.includes(_grade)) return _grade;
    _grade = usable.includes(own) ? own : (usable.find(g => g >= own) || usable[0] || null);
    return _grade;
  }
  // The grade a lab is used at: the one picked, or - for a Grade 5 pupil in a
  // lab built for 4 and 6 - the grade that lab actually has content for.
  function _gradeForLab(l, g = _grade || _ownGrade()) {
    if (l.grades.includes(g)) return g;
    const alias = (GRADE_ALIASES[g] || []).find(a => l.grades.includes(a));
    if (alias) return alias;
    return l.grades.find(x => x >= g) || l.grades[l.grades.length - 1];
  }
  // A lab asks this which grade's guides, missions and discoveries to show.
  function grade() { return _labGrade; }

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
  // Which grade a discovery or mission belongs to, so the hub shows a Grade 4
  // pupil their Grade 4 progress, not Grade 9's. Labs write missions straight
  // into their store, so persist() - which every lab calls after a write - tags
  // whatever changed since the lab opened with the grade it is being used at.
  // Untagged (older) progress counts as the lab's original, highest grade.
  let _openedAt = 0;
  const _stamp = v => typeof v === 'number' ? v : (v && v.at) || 0;
  function _tag() {
    const l = _open && LABS.find(x => x.id === _open);
    if (!l || !_labGrade) return;
    const s = store(l.id); s.gr = s.gr || {};
    [['d', s.disc], ['m', s.missions]].forEach(([k, obj]) => Object.keys(obj).forEach(id => {
      if (_stamp(obj[id]) >= _openedAt) s.gr[k + ':' + id] = _labGrade;
    }));
  }
  function _progress(l, lg) {
    const s = store(l.id), gr = s.gr || {}, top = l.grades[l.grades.length - 1];
    const mine = (k, id) => (gr[k + ':' + id] || top) === lg;
    return {
      found: Object.keys(s.disc).filter(id => mine('d', id)).length,
      stars: Object.entries(s.missions).filter(([id]) => mine('m', id)).reduce((a, [, m]) => a + ((m && m.stars) || 0), 0),
    };
  }
  function persist() {
    try { _tag(); } catch (e) { console.warn('[Labs] tag', e); }
    if (typeof save === 'function' && typeof DB !== 'undefined' && DB) { try { save(DB); } catch (e) { console.warn('[Labs] save', e); } }
  }

  // info = { title, total } for the toast. Returns true only the first time.
  function discover(lab, id, info) {
    const s = store(lab);
    if (s.disc[id]) return false;
    s.disc[id] = Date.now();
    persist();
    const l = LABS.find(x => x.id === lab);
    const n = l && _labGrade && _open === lab ? _progress(l, _labGrade).found : Object.keys(s.disc).length;
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
    warning: 'Caution', sharp: 'Sharp - can cut',
    goggles: 'Wear eye protection',
  };
  // `goggles` is a MANDATORY sign (ISO 7010 M004, white on a blue disc): it
  // says what to wear, not what the danger is - pair it with the hazard sign.
  // `eye` is "Bright light" and must not stand in for it.
  const MANDATORY = new Set(['goggles']);
  // `warning` is the ISO 7010 general-warning "!" (W001), for a physical danger
  // no other sign names - a trolley off the end of a bench. `sharp` is W022,
  // for broken glass or a point. The GHS "Harmful" diamond says CHEMICAL, and
  // three labs had borrowed it for a cracked slide, cracked glass and a nail.
  const TRIANGLE = new Set(['electric', 'hot', 'eye', 'biohazard', 'warning', 'sharp']);
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
    sharp:     '<path d="M20 49 25.5 31 30 40 34.5 24 38.5 38 44 32 44 49Z"/>',
    goggles:   '<path d="M12 29c0-4 3-6.5 7-6.5h26c4 0 7 2.5 7 6.5v5c0 4.5-3 7.5-7 7.5h-7l-6-5.5-6 5.5h-7c-4 0-7-3-7-7.5z" fill="#fff"/>'
             + '<ellipse cx="22.5" cy="32" rx="6" ry="4.5" fill="#1F5FAD"/><ellipse cx="41.5" cy="32" rx="6" ry="4.5" fill="#1F5FAD"/>',
    biohazard: '<circle cx="32" cy="31" r="5.5" fill="none" stroke="#111" stroke-width="2.8"/>'
             + '<circle cx="25.5" cy="42" r="5.5" fill="none" stroke="#111" stroke-width="2.8"/>'
             + '<circle cx="38.5" cy="42" r="5.5" fill="none" stroke="#111" stroke-width="2.8"/><circle cx="32" cy="38" r="2.4"/>',
  };
  function sign(kind, mini) {
    const frame = MANDATORY.has(kind)
      ? `<circle cx="32" cy="32" r="28" fill="#1F5FAD"/>`
      : TRIANGLE.has(kind)
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

  // Which exam the "📝" section points at: PSAC for Grades 4-6, the NCE paper
  // for Grade 9. A lab can still pass its own `examLabel`.
  function _examLabel(o) {
    if (o.examLabel) return o.examLabel;
    const g = _labGrade || _grade || 9;
    return g <= 6 ? '📝 In the PSAC exam' : g >= 9 ? '📝 On the NCE paper' : '📝 In your exams';
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
        ${o.exam ? `<section class="lab-hz-sec is-exam"><h3>${esc(_examLabel(o))}</h3><p>${esc(o.exam)}</p></section>` : ''}
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
        ${o.exam ? `<section class="lab-hz-sec is-exam"><h3>${esc(_examLabel(o))}</h3><p>${esc(o.exam)}</p></section>` : ''}
      </div>
      <div class="lab-ov-actions"><button type="button" class="lab-btn lab-btn-primary" data-ov-close data-autofocus>${esc(o.button || 'Got it')}</button></div>`,
      { cls: 'is-result', onClose: o.onClose });
  }

  function _shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }

  // An option is text, or { label, svg } for the paper's "pick the apparatus"
  // questions (Chemistry 2024 Q1(1)). The svg comes from a lab's own data file,
  // never from a pupil, so it is inserted as markup; the label is escaped.
  const _optHTML = t => (t && typeof t === 'object')
    ? `<span class="lab-quiz-pic" aria-hidden="true">${t.svg || ''}</span><span>${esc(t.label || '')}</span>`
    : `<span>${esc(t)}</span>`;

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
        <div class="lab-quiz-header">
          <p class="lab-quiz-meta">${esc(o.title || 'Questions')} · Question ${i + 1} of ${qs.length}</p>
          <button type="button" class="lab-quiz-exit" data-quiz-exit aria-label="Exit quiz">✕</button>
        </div>
        <div class="lab-quiz-bar" aria-hidden="true"><i style="width:${Math.round((i / qs.length) * 100)}%"></i></div>
        <h2 id="lab-ov-title" class="lab-quiz-q">${esc(q.q)}</h2>
        <div class="lab-quiz-opts">${q.opts.map((op, k) =>
          `<button type="button" class="lab-quiz-opt" data-k="${k}"><span class="lab-quiz-letter">${'ABCD'[k]}</span>${_optHTML(op.t)}</button>`).join('')}</div>
        <div class="lab-quiz-fb" aria-live="polite"></div>`;
      const b = card.querySelector('.lab-quiz-opt');
      if (b) b.focus({ preventScroll: true });
    };
    card.addEventListener('click', e => {
      if (e.target.closest('[data-quiz-exit]')) { closeOverlay(true); return; }
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
  const _blurb = (l, g) => (l.blurbs && l.blurbs[_gradeForLab(l, g)]) || l.blurb;
  function _hubHTML() {
    const g = _pickGrade();
    const usable = usableGrades();
    const list = g ? labsFor(g) : [];
    const card = l => {
      if (!l.ready) {
        return `<div class="lab-card is-soon" aria-disabled="true">
          <span class="lab-card-icon" aria-hidden="true">${l.icon}</span>
          <span class="lab-card-name">${esc(l.name)}</span>
          <span class="lab-card-blurb">${esc(l.blurb)}</span>
          <span class="lab-card-meta">Coming soon</span></div>`;
      }
      const p = _progress(l, _gradeForLab(l, g));
      const meta = p.found || p.stars ? `✨ ${p.found} found · ★ ${p.stars} stars` : 'Not started yet';
      return `<button type="button" class="lab-card" data-lab="${l.id}">
        <span class="lab-card-icon" aria-hidden="true">${l.icon}</span>
        <span class="lab-card-name">${esc(l.name)}</span>
        <span class="lab-card-blurb">${esc(_blurb(l, g))}</span>
        <span class="lab-card-meta">${meta}</span>
        <span class="lab-card-go" aria-hidden="true">Open the lab →</span></button>`;
    };
    // One grade needs no picker. More than one - their own plus grades a parent
    // unlocked above it - gets "My grade", and the labs follow the pick.
    const picker = usable.length > 1
      ? `<div class="lab-grade-picker" role="group" aria-label="Choose a grade">
          <span class="lab-grade-label">My grade:</span>
          ${usable.map(x => `<button type="button" class="lab-grade-chip" data-grade="${x}" aria-pressed="${x === g}">Grade ${x}</button>`).join('')}
        </div>`
      : '';
    // Science is one subject up to Grade 8 (PSAC and the Grade 7-8 packs); only
    // Grade 9 splits into Biology, Chemistry and Physics. So a Grade 9 physics
    // lab used at Grade 4 or 7 sits under Science with that grade's other labs.
    const subj = l => _gradeForLab(l, g) <= 8 ? 'Science' : l.subject;
    const body = g
      ? SUBJECTS.filter(sub => list.some(l => subj(l) === sub)).map(sub => `<section class="lab-hub-subject" aria-label="${sub}">
          <h2 class="lab-card-subject">${sub}</h2>
          <div class="lab-hub-grid">${list.filter(l => subj(l) === sub).map(card).join('')}</div>
        </section>`).join('')
      : '<p class="lab-hub-lede">There are no labs for your grade yet - they are on the way.</p>';
    return `<div class="lab lab-hub">
      <header class="lab-top">
        <button type="button" class="lab-icon-btn" data-hub-exit aria-label="Back to my board">←</button>
        <div class="lab-top-title"><span class="lab-eyebrow">${g ? `${g <= 6 ? 'PSAC' : 'NCE'} · Grade ${esc(g)}` : 'Science'}</span><h1>Science Labs</h1></div>
      </header>
      ${picker}
      <p class="lab-hub-lede">Real experiments with real science. Get it wrong and you’ll see exactly what would have happened - and what to do instead.</p>
      ${body}
      <p class="lab-hub-foot">🥽 These labs follow real school-lab safety rules. Nothing here is for trying at home.</p>
    </div>`;
  }

  function _wireHub(root) {
    root.onclick = e => {
      const gb = e.target.closest('[data-grade]');
      if (gb) { _grade = Number(gb.dataset.grade); render(); return; }
      const c = e.target.closest('[data-lab]');
      if (c) { openLab(c.dataset.lab); return; }
      if (e.target.closest('[data-hub-exit]')) exit();
    };
  }

  // ── Idle hint ─────────────────────────────────────────────────────────────────
  // After 9 s of silence, pulse the most relevant tappable button so a child
  // who is stuck knows where to start. Resets on any tap or key press.
  const _HINT_SEL = [
    '.lab-changes-zone',
    '.lab-nutrition-food-btn:not(.lab-nutrition-food-placed)',
    '.lab-start-item',
    'button[data-scenario]:not(:disabled)',
    '.lab-card:not(.is-soon)',
    '.lab-btn-primary:not([disabled])',
  ].join(',');

  let _hintTimer = 0, _hintRoot = null;

  function _clearHint() {
    clearTimeout(_hintTimer); _hintTimer = 0;
    if (_hintRoot) _hintRoot.querySelectorAll('.is-idle-hint').forEach(el => el.classList.remove('is-idle-hint'));
  }

  function _scheduleHint() {
    _hintTimer = setTimeout(() => {
      const el = _hintRoot && (_hintRoot.querySelector('.is-next:not(.is-guide-dim)') || _hintRoot.querySelector('#lab-study .lab-btn-primary') || _hintRoot.querySelector(_HINT_SEL));
      if (!el) { _scheduleHint(); return; }
      el.classList.add('is-idle-hint');
      el.addEventListener('animationend', () => { el.classList.remove('is-idle-hint'); _scheduleHint(); }, { once: true });
    }, 9000);
  }

  function _resetHint() { _clearHint(); _scheduleHint(); }

  function _startIdleHint(root) {
    if (_hintRoot !== root) {
      if (_hintRoot) {
        _hintRoot.removeEventListener('pointerdown', _resetHint, true);
        _hintRoot.removeEventListener('keydown',     _resetHint, true);
      }
      _hintRoot = root;
      root.addEventListener('pointerdown', _resetHint, { passive: true, capture: true });
      root.addEventListener('keydown',     _resetHint, { passive: true, capture: true });
    }
    _clearHint();
    _scheduleHint();
  }

  function render() {
    _css();
    const root = document.getElementById('labs-root');
    if (!root) return;
    const l = _open && LABS.find(x => x.id === _open);
    if (l) {
      const mod = _module(l);
      root.onclick = null;
      if (mod) {
        try {
          if (window.LabStudy) LabStudy.detach();
          mod.mount(root);
          if (window.LabStudy) LabStudy.attach(root, l, mod);
          _startIdleHint(root);
        } catch (err) {
          console.error('[Labs] Could not open ' + l.id, err);
          try { mod.unmount(); } catch (_) {}
          root.innerHTML = `<div class="lab"><h2>This experiment could not open</h2><p>Your saved work is safe. Try opening it again.</p><button type="button" class="lab-btn lab-btn-primary" data-retry>Try again</button><button type="button" class="lab-btn" data-back>Choose another lab</button></div>`;
          root.onclick = e => { if (e.target.closest('[data-retry]')) render(); if (e.target.closest('[data-back]')) backToHub(); };
        }
        return;
      }
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
    // Restore the last open lab after a page refresh.
    let savedLab = null;
    try { savedLab = sessionStorage.getItem('psac-open-lab'); } catch (_) {}
    if (savedLab && LABS.find(x => x.id === savedLab)) { openLab(savedLab); return; }
    root.innerHTML = _hubHTML();
    _wireHub(root);
    _startIdleHint(root);
  }

  function openLab(id) {
    const l = LABS.find(x => x.id === id);
    if (!l) return;
    _open = id; _openedAt = Date.now();
    _labGrade = _gradeForLab(l);
    try { sessionStorage.setItem('psac-open-lab', id); } catch (_) {}
    render();
    const root = document.getElementById('labs-root');
    if (root) root.scrollIntoView({ block: 'start' });
  }

  function _unmountOpen() {
    if (window.LabStudy) LabStudy.detach();
    const l = _open && LABS.find(x => x.id === _open);
    const m = l && _module(l);
    if (m && m.unmount) m.unmount();
  }

  function backToHub() {
    closeOverlay(true);
    _unmountOpen();
    _open = null;
    try { sessionStorage.removeItem('psac-open-lab'); } catch (_) {}
    render();
  }

  function exit() {
    closeOverlay(true);
    _unmountOpen();
    _open = null;
    try { sessionStorage.removeItem('psac-open-lab'); } catch (_) {}
    if (typeof StudentHome !== 'undefined' && StudentHome.open) StudentHome.open();
    else if (typeof showScreen === 'function') showScreen('student-home');
  }

  return { LABS, SIGN_LABELS, GRADE_ALIASES, render, openLab, backToHub, exit, grade, labsFor, usableGrades,
           studyBegin: (...args) => window.LabStudy ? LabStudy.begin(...args) : false,
           studyComplete: (...args) => window.LabStudy ? LabStudy.complete(...args) : false,
           studyCheckpoint: (...args) => window.LabStudy && LabStudy.checkpoint(...args),
           store, persist, discover, stars, confetti,
           calm, esc, sign, overlay, closeOverlay, hazardCard, resultCard, quiz, missionDone };
})();
if (typeof window !== 'undefined') window.Labs = Labs;
