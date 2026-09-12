'use strict';
// ══════════════════════════════════════════════
//  Science Labs - the biology and the maths behind the Microscope (NCE Grade 9).
//
//  ⚠ THE SCIENCE LIVES HERE, NOT IN THE ANIMATION. Every magnification, cell
//    size, focus distance, brightness, which cell sits under the pointer, every
//    drawing size, calculation, hazard, card, fact, guide, discovery and quiz
//    question comes from this file. lab_microscope.js only moves things over
//    time and draws them.
//  ⚠ Grounded in the live chapter g9s-b1-circulatory, subsections
//    components_of_blood ("Plasma, red cells, white cells and platelets") and
//    magnification ("Calculating the magnification of drawings of blood
//    cells"), and in the paper shape blueprint-science.md §B.3/§B.6: a
//    magnification question where the pupil MEASURES the printed figure with a
//    ruler and divides (Biology 2024 Q4(e)(ii) ×8000 [2]; Biology 2023 Q5(a)
//    ×15000 [3]). Phagocytes and lymphocytes are in the grade9-biology bank
//    (b1_volume.js). Anything else - the inverted image, the field of view,
//    cell counts per mm³ - is labelled "beyond the NCE syllabus".
//  ⚠ MAGNIFICATION = IMAGE SIZE ÷ ACTUAL SIZE, both in the SAME unit, and the
//    answer has no unit. 1 mm = 1000 µm. scripts/test-labs-microscope-data.js
//    re-derives every number below.
//
//  The focus model (knob positions in steps of 0.1 mm):
//    z = where the focus knobs have put the lens. Each objective is sharp at
//    FOCUS_AT[obj] and sits WORK_DIST[obj] above the slide when it is sharp, so
//        clearance = WORK_DIST + (z - FOCUS_AT)      (≤ 0 → the lens hits the slide)
//        blur      = |z - FOCUS_AT| ÷ DEPTH           (0 sharp · <1 nearly · <3 blurred)
//    Coarse moves 3 mm a turn, fine 0.5 mm. The high-power lens is long, sits
//    close to the slide and has a tiny depth of focus - so the coarse knob at
//    high power loses the image, and turned DOWN it cracks the slide.
//
//  ⚠ TWO LEVELS (LAB_SPEC §9). Untagged content is the original Grade 9 level;
//    everything tagged `grades: [7]` has an id starting g7_. The Grade 7 level
//    is grounded in subjects/grade7-science, chapter g7s-cells ("Identify the
//    parts of animal and plant cells under a microscope. Compare the structure
//    of animal and plant cells."): g7s-cells-002 (a microscope views cells),
//    -003 nucleus, -004/-016 membrane, -005/-020 cell wall and the onion's
//    brick shape, -006/-012/-018 chloroplast and chlorophyll, -011 vacuole,
//    -013 onion vs cheek under a microscope, -017 labelled plant cell, -019
//    image = actual × magnification (0.05 mm at ×100 = 5 mm), hd-025 wall +
//    green = a plant that photosynthesises, hd-026 no chloroplasts where there
//    is no light, hd-033 the parts both cells share, hd-036 leaf rectangles vs
//    round cheek cells. The pack names no stain and no cover slip: iodine,
//    methylene blue and the cover slip are how "parts ... under a microscope"
//    is done in a school lab, so they are taught as method and never as a
//    quoted exam point. Grade 7 quotes no paper reference.
// ══════════════════════════════════════════════
const LabMicroscopeData = (() => {

  // ── Grade levels ───────────────────────────────
  const GRADES = [7, 9];
  const forGrade = (list, g) => list.filter(x => (x.grades || [9]).includes(g));

  // ── The microscope ─────────────────────────────
  const EYEPIECES = [10, 15];
  const OBJECTIVES = [4, 10, 40];
  // Real objectives carry a colour band: red ×4, yellow ×10, blue ×40.
  const OBJ = {
    4:  { name: 'Low power',    short: 'low',    band: '#D8323A' },
    10: { name: 'Medium power', short: 'medium', band: '#E8B21A' },
    40: { name: 'High power',   short: 'high',   band: '#3B8FD9' },
  };
  function total(eye, obj) { return eye * obj; }

  // Field of view = field number ÷ objective (beyond the NCE syllabus).
  const FIELD_NUMBER = { 10: 18, 15: 12 };
  function fieldOfViewMm(eye, obj) { return FIELD_NUMBER[eye] / obj; }

  const Z_START = 150, Z_MIN = -300, Z_MAX = 200;
  const COARSE = 30, FINE = 5;                     // 0.1 mm per step
  const FOCUS_AT = { 4: 0, 10: 0, 40: 5 };
  const WORK_DIST = { 4: 100, 10: 70, 40: 15 };
  const DEPTH = { 4: 30, 10: 15, 40: 8 };
  const LOWER_GAP = 30;                            // "just above the slide", watching from the side
  function clearance(z, obj) { return WORK_DIST[obj] + (z - FOCUS_AT[obj]); }
  function blur(z, obj) { return Math.abs(z - FOCUS_AT[obj]) / DEPTH[obj]; }
  function focusWord(z, obj) {
    const q = blur(z, obj);
    return q === 0 ? 'sharp' : q < 1 ? 'near' : q < 3 ? 'blurred' : 'none';
  }
  const FOCUS_WORDS = { sharp: 'Sharp', near: 'Nearly sharp', blurred: 'Blurred', none: 'No image - just light' };
  function lowerTo(obj) { return FOCUS_AT[obj] + LOWER_GAP - WORK_DIST[obj]; }
  const clampZ = z => Math.max(Z_MIN, Math.min(Z_MAX, z));

  // ── Light ──────────────────────────────────────
  const LIGHTS = {
    lamp:   { name: 'Lamp', meta: 'Built into the base', level: 1 },
    mirror: { name: 'Mirror', meta: 'Aimed at a bright window', level: 0.7 },
    off:    { name: 'Off', meta: 'No light', level: 0 },
  };
  const DIAPHRAGM = {
    wide:   { name: 'Wide open', level: 1 },
    mid:    { name: 'Half open', level: 0.6 },
    narrow: { name: 'Nearly closed', level: 0.3 },
  };
  // A stronger objective spreads the same light over a bigger picture: dimmer.
  const OBJ_LIGHT = { 4: 1, 10: 0.7, 40: 0.4 };
  const DARK_BELOW = 0.15;
  function brightness(light, diaph, obj) { return LIGHTS[light].level * DIAPHRAGM[diaph].level * OBJ_LIGHT[obj]; }

  // ── Slides ─────────────────────────────────────
  const SLIDES = {
    blood:     { name: 'Prepared blood smear', meta: 'Stained, sterile, sealed', stained: true },
    unstained: { name: 'Unstained smear', meta: 'Prepared, but no stain', stained: false },
    // Grade 7: slides the pupil makes - specimen, then stain, then cover slip.
    onion: { name: 'Onion skin', meta: 'A thin layer, in a drop of water', stained: false, g7: true, kind: 'plant', needsStain: true, grades: [7] },
    cheek: { name: 'Cheek cells', meta: 'Your own, on a clean cotton bud', stained: false, g7: true, kind: 'animal', needsStain: true, grades: [7] },
    leaf:  { name: 'Pondweed leaf', meta: 'One thin leaf - no stain needed', stained: false, g7: true, kind: 'plant', needsStain: false, grades: [7] },
  };
  const STAINS = {
    iodine: { name: 'Iodine solution', meta: 'Turns plant cells brown', for: 'onion' },
    blue:   { name: 'Methylene blue', meta: 'Turns animal cells blue', for: 'cheek' },
  };
  const COVERS = {
    angle: { name: 'Lower it at an angle', meta: 'One edge first, slowly' },
    drop:  { name: 'Drop it flat', meta: 'Straight down' },
  };

  // ── Blood ──────────────────────────────────────
  // sizeUm is the width used in every calculation; range is how a textbook says it.
  const CELLS = {
    rbc:      { name: 'Red blood cell', short: 'Red cell', icon: '🔴', sizeUm: 8, range: 'about 7-8 µm', nucleus: 'none',
                look: 'A pink disc, paler in the middle (it is biconcave), with no nucleus.',
                job: 'Carries oxygen, using the red pigment haemoglobin.',
                clue: 'Pink disc · pale centre · no nucleus' },
    phago:    { name: 'Phagocyte', short: 'Phagocyte', icon: '🟣', sizeUm: 12, range: 'about 10-12 µm', nucleus: 'lobed', white: true,
                look: 'A white blood cell, bigger than a red cell, with a purple nucleus in several lobes and grainy cytoplasm.',
                job: 'Engulfs and digests microbes (phagocytosis).',
                clue: 'Big · lobed purple nucleus' },
    lympho:   { name: 'Lymphocyte', short: 'Lymphocyte', icon: '🔵', sizeUm: 10, range: 'about 8-10 µm', nucleus: 'round', white: true,
                look: 'A white blood cell with one large, round purple nucleus that almost fills it, and a thin rim of cytoplasm.',
                job: 'Makes antibodies that destroy microbes.',
                clue: 'Huge round nucleus · thin rim' },
    platelet: { name: 'Platelet', short: 'Platelet', icon: '🟤', sizeUm: 2, range: 'about 2-3 µm', nucleus: 'none',
                look: 'A tiny purple fragment, much smaller than any cell, with no nucleus.',
                job: 'Helps the blood to clot at a wound.',
                clue: 'Tiny purple fragment' },
  };
  const CELL_IDS = ['rbc', 'phago', 'lympho', 'platelet'];
  const PLASMA = 'Plasma is the pale yellow liquid part of blood. It carries the cells and platelets, dissolved food, carbon dioxide and hormones. On a dried smear it is the pale background between the cells.';

  // ── The slide under the lens ───────────────────
  // The smear is a grid of fields, 60 µm apart. pos = the field under the
  // objective. POINTER = what the eyepiece pointer rests on in each field.
  // White cells are rare, so most fields hold only red cells and platelets.
  const FIELD_UM = 60;
  const FIELD_X = [-2, 2], FIELD_Y = [-1, 1];
  const POINTER = {
    '-2,-1': 'rbc',      '-1,-1': 'lympho', '0,-1': 'gap',      '1,-1': 'rbc',    '2,-1': 'platelet',
    '-2,0':  'platelet', '-1,0':  'lympho', '0,0':  'rbc',      '1,0':  'phago',  '2,0':  'rbc',
    '-2,1':  'rbc',      '-1,1':  'rbc',    '0,1':  'platelet', '1,1':  'rbc',    '2,1':  'phago',
  };
  function under(pos) { return POINTER[pos.x + ',' + pos.y] || 'rbc'; }
  // Moving the slide LEFT brings the part of the smear to its RIGHT under the lens.
  const MOVES = { left: [1, 0], right: [-1, 0], up: [0, 1], down: [0, -1] };
  function move(pos, dir) {
    const d = MOVES[dir];
    const x = Math.max(FIELD_X[0], Math.min(FIELD_X[1], pos.x + d[0]));
    const y = Math.max(FIELD_Y[0], Math.min(FIELD_Y[1], pos.y + d[1]));
    return { x, y, edge: x === pos.x && y === pos.y };
  }
  // The picture on a phone is enlarged: the view shows VIEW_K ÷ total µm across.
  const VIEW_K = 24000;
  function viewUm(eye, obj) { return VIEW_K / total(eye, obj); }

  // A deterministic smear: the pointer's cell at the centre of its field, red
  // cells on a jittered grid around it, a few platelets.
  function _rng(seed) {
    let a = seed >>> 0;
    return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function fieldCells(fx, fy) {
    const rnd = _rng(((fx + 50) * 7919) ^ ((fy + 50) * 104729));
    const mid = POINTER[fx + ',' + fy] || 'rbc';
    const out = [];
    if (mid !== 'gap') out.push({ type: mid, x: 0, y: 0, rot: rnd() * 6.283 });
    const step = 12;
    for (let gx = -2; gx <= 2; gx++) for (let gy = -2; gy <= 2; gy++) {
      if (!gx && !gy) continue;
      const near = Math.abs(gx) <= 1 && Math.abs(gy) <= 1;
      if (near && mid === 'gap') continue;
      if ((CELLS[mid] && CELLS[mid].white) && (gx === 0 || gy === 0) && near) continue;
      const r = rnd();
      // More scatter away from the pointer, so low power does not read as a grid;
      // less next to it, so nothing covers the pointer's cell.
      const jit = near ? 6 : 10;
      const jx = (rnd() - 0.5) * jit, jy = (rnd() - 0.5) * jit;
      if (r < 0.84) out.push({ type: 'rbc', x: gx * step + jx, y: gy * step + jy, rot: rnd() * 6.283 });
      else if (r < 0.92 && !near) out.push({ type: 'platelet', x: gx * step + jx, y: gy * step + jy, rot: rnd() * 6.283 });
    }
    return out;
  }

  // ── Grade 7: plant and animal cells ────────────
  // One geometry, in µm, decides both what is drawn and which part is under
  // the pointer - so the name the pupil must give is always what they see.
  // Onion epidermis: brick-shaped cells 200 µm long and 50 µm (0.05 mm) wide,
  // the cell of g7s-cells-019. Pondweed leaf: small boxes lined with
  // chloroplasts. Cheek cells: rounded, floppy, scattered in the water.
  const TISSUE = {
    onion: { w: 200, h: 50, wall: 2, band: 6, nucR: 8 },
    leaf:  { w: 60,  h: 24, wall: 1.5, band: 7, chlR: 2.5 },
  };
  const _hash = (i, r, k) => _rng(((i + 500) * 7919) ^ ((r + 500) * 104729) ^ (k * 15485863))();
  function brick(slide, x, y) {
    const T = TISSUE[slide];
    const r = Math.floor(y / T.h), off = (r & 1) ? T.w / 2 : 0;
    const i = Math.floor((x - off) / T.w);
    return { i, r, x0: off + i * T.w, y0: r * T.h, lx: x - off - i * T.w, ly: y - r * T.h };
  }
  function onionNucleus(i, r) {
    if (!i && !r) return { x: 50, y: 25 };
    return { x: 30 + (TISSUE.onion.w - 60) * _hash(i, r, 1), y: 20 + 10 * _hash(i, r, 2) };
  }
  function leafChloros(i, r) {
    const T = TISSUE.leaf, out = [];
    const j = k => (i || r) ? _hash(i, r, k) - 0.5 : 0;
    let k = 0;
    for (let x = 6; x <= T.w - 6; x += 6) { out.push({ x: x + j(++k), y: 4.5 + j(++k) }); out.push({ x: x + j(++k), y: T.h - 4.5 + j(++k) }); }
    out.push({ x: 4.5 + j(++k), y: T.h / 2 }, { x: T.w - 4.5 + j(++k), y: T.h / 2 });
    return out;
  }
  // Cheek cells repeat every CHEEK_TILE µm. The LAST cell is on top.
  const CHEEK_TILE = 240, CHEEK_NUC = 4.5, CHEEK_MEM = 2.5;
  const CHEEK = [
    { x: -66, y: 34, R: 29, p: 2.2, q: 0.9, nx: 3, ny: -2 },
    { x: 60, y: -45, R: 26, p: 1.3, q: 2.5, nx: -2, ny: 3 },
    { x: -45, y: -60, R: 27, p: 3.1, q: 1.7, nx: 2, ny: 2 },
    { x: 25, y: 70, R: 25, p: 0.7, q: 4.0, nx: -3, ny: -1 },
    { x: 85, y: 40, R: 24, p: 5.0, q: 0.3, nx: 1, ny: 2 },
    { x: 0, y: 0, R: 28, p: 0, q: 0, nx: 0, ny: 0 },
  ];
  function cheekR(c, th) { return c.R * (1 + 0.12 * Math.sin(3 * th + c.p) + 0.08 * Math.sin(5 * th + c.q)); }
  const _tile = v => v - CHEEK_TILE * Math.round(v / CHEEK_TILE);
  function partAt(slide, x, y) {
    if (slide === 'cheek') {
      const tx = _tile(x), ty = _tile(y);
      for (let k = CHEEK.length - 1; k >= 0; k--) {
        const c = CHEEK[k], dx = tx - c.x, dy = ty - c.y, d = Math.hypot(dx, dy), rr = cheekR(c, Math.atan2(dy, dx));
        if (d > rr) continue;
        if (Math.hypot(dx - c.nx, dy - c.ny) < CHEEK_NUC) return 'nucleus';
        return rr - d < CHEEK_MEM ? 'membrane' : 'cytoplasm';
      }
      return 'gap';
    }
    const T = TISSUE[slide], b = brick(slide, x, y);
    const d = Math.min(b.lx, T.w - b.lx, b.ly, T.h - b.ly);
    if (d < T.wall) return 'wall';
    if (slide === 'onion') {
      const n = onionNucleus(b.i, b.r);
      if (Math.hypot(b.lx - n.x, b.ly - n.y) < T.nucR) return 'nucleus';
    } else if (leafChloros(b.i, b.r).some(c => Math.hypot(b.lx - c.x, b.ly - c.y) < T.chlR)) return 'chloroplast';
    return d < T.band ? 'cytoplasm' : 'vacuole';
  }
  // Where the eyepiece pointer rests for each position of the slide.
  const G7_POINTS = { onion: { o: [50, 25], dx: 50, dy: 21 }, cheek: { o: [0, 0], dx: 14, dy: 14 }, leaf: { o: [30, 4.5], dx: 30, dy: 7.5 } };
  function pointG7(slide, pos) { const P = G7_POINTS[slide]; return { x: P.o[0] + pos.x * P.dx, y: P.o[1] + pos.y * P.dy }; }
  function partUnder(slide, pos) { const p = pointG7(slide, pos); return partAt(slide, p.x, p.y); }
  // Air trapped by a dropped cover slip (µm on the slide), away from the pointer.
  const BUBBLES = [{ x: -160, y: 90, R: 45 }, { x: 230, y: -70, R: 28 }, { x: 120, y: 170, R: 60 }, { x: -260, y: -150, R: 35 }, { x: 330, y: 120, R: 40 }];
  // Tissue is bigger than blood, so the phone picture is enlarged less.
  const G7_VIEW_K = 48000;
  function viewUmG7(eye, obj) { return G7_VIEW_K / total(eye, obj); }
  const ONION_WIDTH_UM = TISSUE.onion.h;

  // ── What the eyepiece shows, in words ──────────
  // s = { slide, clipped, light, diaph, eye, obj, z, pos, stain, cover }
  function view(s) {
    const bright = brightness(s.light, s.diaph, s.obj);
    const dark = s.light === 'off' || bright < DARK_BELOW;
    const S = s.slide ? SLIDES[s.slide] : null;
    const g7 = !!(S && S.g7);
    const covered = !g7 || !!s.cover;
    const visible = !!s.slide && !dark && covered;
    const focus = focusWord(s.z, s.obj);
    return { slide: s.slide || null, light: s.light, diaph: s.diaph, eye: s.eye, obj: s.obj, total: total(s.eye, s.obj),
             bright, dark, visible, focus, sharp: visible && focus === 'sharp',
             seen: visible && (focus === 'sharp' || focus === 'near'),
             g7, covered, stain: s.stain || null, stained: g7 ? (!S.needsStain || !!s.stain) : !!(S && S.stained),
             bubbles: g7 && s.cover === 'drop', kind: S ? S.kind || null : null,
             under: s.slide ? (g7 ? partUnder(s.slide, s.pos) : under(s.pos)) : null, pos: { x: s.pos.x, y: s.pos.y } };
  }

  // What one change on the microscope unlocks. act = the token just done.
  function scopeDiscoveries(prev, cur, act) {
    const out = [];
    const k = String(act || '').split(':')[0];
    if (cur.sharp && cur.slide === 'blood') {
      if (cur.obj === 4) out.push('low_power');
      if (cur.obj === 40) out.push('high_power');
      if (cur.light === 'mirror') out.push('mirror');
      if (cur.eye === 15) out.push('eyepiece');
    }
    if (cur.sharp && cur.slide === 'unstained' && cur.obj === 40) out.push('stain');
    if (cur.g7) {
      if (cur.sharp && cur.slide === 'onion' && cur.stained && cur.obj === 4) out.push('g7_low');
      if (k === 'obj' && prev && prev.sharp && cur.obj > prev.obj && cur.seen) out.push('g7_zoom');
      if (cur.sharp && cur.slide === 'onion' && !cur.stained && cur.obj === 40) out.push('g7_stain');
      return out;
    }
    if (k === 'obj' && prev && prev.sharp && cur.obj > prev.obj && cur.seen) out.push('smaller_field');
    if (k === 'move' && cur.seen && prev && (prev.pos.x !== cur.pos.x || prev.pos.y !== cur.pos.y)) out.push('inverted');
    if (k === 'diaphragm' && prev && prev.dark && !cur.dark && cur.obj === 40 && cur.slide && cur.light !== 'off') out.push('diaphragm');
    return out;
  }

  // Naming the cell under the pointer. Returns { ok } or { ok:false, why }.
  function identify(v, guess) {
    if (!v.slide) return { ok: false, why: 'no_slide' };
    if (v.dark) return { ok: false, why: 'dark' };
    if (v.focus !== 'sharp') return { ok: false, why: 'blurred' };
    if (v.obj !== 40) return { ok: false, why: 'too_small' };
    if (v.slide === 'unstained') return { ok: false, why: 'unstained' };
    if (v.under === 'gap') return { ok: false, why: 'gap' };
    return v.under === guess ? { ok: true, cell: guess } : { ok: false, why: 'wrong', cell: v.under };
  }
  const ID_SAY = {
    no_slide: 'There is no slide on the stage yet.',
    dark: 'It is too dark to see anything. Switch on the light, or open the diaphragm.',
    blurred: 'The image is not sharp. Focus it first - at high power, with the fine focus only.',
    too_small: 'At this magnification the cells are too small to tell apart. Swing in the ×40 objective.',
    unstained: 'Without a stain you cannot see the nuclei, so you cannot tell the white cells apart. Use the stained smear.',
    gap: 'There is no cell under the pointer - only the dried plasma between the cells. Move the slide.',
  };

  // ── Grade 7: naming the parts of a cell ────────
  const CELL_PARTS = {
    wall:        { name: 'Cell wall', icon: '🧱', look: 'The thick outer edge of each plant cell', plantOnly: true,
                   job: 'Made of cellulose. It is strong and rigid, so it gives a plant cell its fixed shape and supports it.' },
    membrane:    { name: 'Cell membrane', icon: '⭕', look: 'The very thin outer layer of the cell',
                   job: 'Controls what goes into and out of the cell.' },
    cytoplasm:   { name: 'Cytoplasm', icon: '🫧', look: 'The jelly inside the membrane, around the nucleus',
                   job: 'A jelly where most of the cell’s chemical reactions take place.' },
    nucleus:     { name: 'Nucleus', icon: '🟤', look: 'A dark, round spot, once it is stained',
                   job: 'Controls all the activities of the cell.' },
    vacuole:     { name: 'Vacuole', icon: '💧', look: 'The big clear space in the middle of a plant cell', plantOnly: true,
                   job: 'Stores water and cell sap, which keeps the cell firm.' },
    chloroplast: { name: 'Chloroplast', icon: '🟢', look: 'Small green discs', plantOnly: true,
                   job: 'Contains chlorophyll, the green pigment that traps light for photosynthesis.' },
  };
  const PART_IDS = ['wall', 'membrane', 'cytoplasm', 'nucleus', 'vacuole', 'chloroplast'];
  function _g7Check(v) {
    if (!v.slide) return 'no_slide';
    if (!v.covered) return 'uncovered';
    if (v.dark) return 'dark';
    if (v.focus !== 'sharp') return 'blurred';
    if (v.obj !== 40) return 'too_small';
    if (!v.stained) return 'unstained';
    return null;
  }
  function identifyPart(v, guess) {
    const why = _g7Check(v);
    if (why) return { ok: false, why };
    if (v.under === 'gap') return { ok: false, why: 'gap' };
    return v.under === guess ? { ok: true, part: guess } : { ok: false, why: 'wrong', part: v.under };
  }
  function classify(v, kind) {
    const why = _g7Check(v);
    if (why) return { ok: false, why };
    return v.kind === kind ? { ok: true, kind } : { ok: false, why: 'wrong', kind: v.kind };
  }
  const ID_SAY_G7 = {
    no_slide: 'There is no slide on the stage yet. Make one first.',
    uncovered: 'Put a cover slip on first. It keeps the specimen flat and keeps the lens dry.',
    dark: 'It is too dark to see anything. Switch on the light, or open the diaphragm.',
    blurred: 'The image is not sharp. Focus it first - at high power, with the fine focus only.',
    too_small: 'At this magnification the parts are too small to name. Swing in the ×40 objective.',
    gap: 'There is no cell under the pointer - only the water between the cells. Move the slide.',
  };
  // Started on high power: a coarse turn at ×40, before any sharp image on low
  // power, from a blurred or empty view to an empty one.
  function highFirst(prev, cur, knob, lowSeen) {
    return !!(cur.g7 && knob === 'coarse' && cur.obj === 40 && !lowSeen && prev && prev.visible && !prev.seen && !cur.seen);
  }

  // ── A biological drawing of each cell ──────────
  // The width the pupil's drawing is made; magnification of the drawing =
  // drawing width ÷ real width.
  const DRAW = {
    rbc:      { widthMm: 40, labels: ['cell membrane', 'cytoplasm full of haemoglobin', 'no nucleus (pale centre)'] },
    phago:    { widthMm: 48, labels: ['cell membrane', 'cytoplasm', 'lobed nucleus'] },
    lympho:   { widthMm: 40, labels: ['cell membrane', 'thin rim of cytoplasm', 'large round nucleus'] },
    platelet: { widthMm: 20, labels: ['fragment of a cell', 'no nucleus'] },
  };

  // ── Magnification ──────────────────────────────
  const UM_PER_MM = 1000;
  const mmToUm = mm => _clean(mm * UM_PER_MM);
  const umToMm = um => _clean(um / UM_PER_MM);
  function _clean(n) { return +(+n).toPrecision(12); }
  function magnification(imageMm, actualUm) { return _clean(imageMm * UM_PER_MM / actualUm); }
  function actualMm(imageMm, mag) { return _clean(imageMm / mag); }
  function actualUm(imageMm, mag) { return _clean(imageMm * UM_PER_MM / mag); }
  function imageMm(actualUmV, mag) { return _clean(actualUmV * mag / UM_PER_MM); }
  function same(a, b) { return Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(b)); }
  // Numbers the way the working is written: "7500", "15 000", "0.002".
  function fmt(n) {
    if (!isFinite(n)) return String(n);
    let s = String(+(+n).toPrecision(6));
    if (/e/.test(s)) s = (+n).toFixed(10).replace(/0+$/, '').replace(/\.$/, '');
    const neg = s.charAt(0) === '-'; if (neg) s = s.slice(1);
    const parts = s.split('.');
    if (parts[0].length > 4) parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return (neg ? '-' : '') + parts.join('.');
  }

  // Printed figures to measure. The on-screen ruler is drawn to the same scale
  // as the figure, exactly as a ruler lies on the printed page.
  //   findM      - the actual size is given: find the magnification
  //   findActual - the magnification is printed: find the actual size (in askUnit)
  const FIGURES = [
    { id: 'rbc', cell: 'rbc', mode: 'findM', title: 'A red blood cell', imageMm: 60, innerMm: 24, innerName: 'the pale centre',
      eyeMm: 50, actualUm: 8, blurb: 'Actual width 8 µm. Find the magnification.' },
    { id: 'phago', cell: 'phago', mode: 'findM', title: 'A phagocyte', imageMm: 36, innerMm: 20, innerName: 'the nucleus',
      eyeMm: 30, actualUm: 12, blurb: 'Actual width 12 µm. Find the magnification.' },
    { id: 'lympho', cell: 'lympho', mode: 'findActual', title: 'A lymphocyte', imageMm: 80, innerMm: 64, innerName: 'the nucleus',
      eyeMm: 70, mag: 8000, askUnit: 'mm', paper: 'Biology 2024 Q4(e)(ii)', blurb: 'Drawn at ×8000. Actual size, in mm?' },
    { id: 'platelet', cell: 'platelet', mode: 'findActual', title: 'A platelet', imageMm: 30, innerMm: null, innerName: null,
      eyeMm: 25, mag: 15000, askUnit: 'µm', paper: 'Biology 2023 Q5(a)', blurb: 'Drawn at ×15 000. Actual size, in µm?' },
  ];
  const figure = id => FIGURES.find(f => f.id === id);
  function rulerLen(f) { return Math.ceil((f.imageMm + 5) / 10) * 10; }
  function imageFor(f, ruler) { return ruler === 'eye' ? f.eyeMm : ruler === 'inner' ? f.innerMm : f.imageMm; }
  function rightAnswer(f) {
    if (f.mode === 'findM') return { value: magnification(f.imageMm, f.actualUm), unit: '' };
    return f.askUnit === 'µm' ? { value: actualUm(f.imageMm, f.mag), unit: 'µm' } : { value: actualMm(f.imageMm, f.mag), unit: 'mm' };
  }
  const show = (v, unit) => unit ? `${fmt(v)} ${unit}` : `×${fmt(v)}`;

  // The pupil's working. w = { ruler: 'cell'|'inner'|'eye'|null, converted, op: 'divide'|'multiply'|null }
  function work(f, w) {
    const image = imageFor(f, w.ruler);
    let value, unit;
    if (f.mode === 'findM') {
      const act = w.converted ? umToMm(f.actualUm) : f.actualUm;
      value = w.op === 'multiply' ? _clean(image * act) : _clean(image / act);
      unit = '';
    } else {
      const mm = w.op === 'multiply' ? _clean(image * f.mag) : actualMm(image, f.mag);
      value = w.converted ? mmToUm(mm) : mm;
      unit = w.converted ? 'µm' : 'mm';
    }
    const R = rightAnswer(f);
    let error = null;
    if (w.ruler === 'eye') error = 'by_eye';
    else if (w.ruler === 'inner') error = 'wrong_dim';
    else if (w.op === 'multiply') error = 'multiply';
    else if (f.mode === 'findM' && !w.converted) error = 'no_convert';
    else if (f.mode === 'findActual' && unit !== R.unit) error = 'no_convert';
    const correct = !error && same(value, R.value) && unit === R.unit;
    return { image, value, unit, shown: show(value, unit), right: R.value, rightUnit: R.unit, rightShown: show(R.value, R.unit), error, correct };
  }

  // The lines of working, as far as the pupil has got.
  function workLines(f, w) {
    const out = [];
    if (!w.ruler) return out;
    const image = imageFor(f, w.ruler);
    out.push(w.ruler === 'eye' ? `Image size ≈ ${fmt(image)} mm (by eye)` : `Image size = ${fmt(image)} mm (ruler)`);
    if (f.mode === 'findM') {
      out.push(w.converted ? `Actual = ${fmt(f.actualUm)} µm = ${fmt(f.actualUm)} ÷ 1000 = ${fmt(umToMm(f.actualUm))} mm` : `Actual = ${fmt(f.actualUm)} µm`);
      if (w.op) {
        const act = w.converted ? fmt(umToMm(f.actualUm)) : fmt(f.actualUm);
        const r = work(f, w);
        out.push(w.op === 'multiply' ? `${fmt(image)} × ${act} = ${fmt(r.value)}` : `M = image ÷ actual = ${fmt(image)} ÷ ${act} = ×${fmt(r.value)}`);
      }
    } else {
      if (w.op) {
        const mm = w.op === 'multiply' ? _clean(image * f.mag) : actualMm(image, f.mag);
        out.push(w.op === 'multiply' ? `${fmt(image)} × ${fmt(f.mag)} = ${fmt(mm)} mm` : `Actual = image ÷ M = ${fmt(image)} ÷ ${fmt(f.mag)} = ${fmt(mm)} mm`);
        if (w.converted) out.push(`= ${fmt(mm)} × 1000 = ${fmt(mmToUm(mm))} µm`);
      } else if (w.converted) out.push(`Image = ${fmt(image)} × 1000 = ${fmt(mmToUm(image))} µm`);
    }
    return out;
  }

  // What a correct answer unlocks.
  function measureDiscoveries(f, r) {
    if (!r.correct) return [];
    if (f.mode === 'findM') return ['mag_calc'];
    return f.askUnit === 'µm' ? ['um_mm'] : ['actual_calc'];
  }

  // ── The parts of the microscope ────────────────
  const PARTS = [
    { id: 'eyepiece', name: 'Eyepiece', job: 'The lens you look through. It magnifies ×10 (or ×15).' },
    { id: 'tube', name: 'Body tube', job: 'Holds the eyepiece and the objective lenses the right distance apart.' },
    { id: 'nosepiece', name: 'Revolving nosepiece', job: 'Turns to swing a different objective lens into place.' },
    { id: 'objective', name: 'Objective lens', job: 'The lens nearest the slide: ×4 (low), ×10 (medium) or ×40 (high power).' },
    { id: 'stage', name: 'Stage', job: 'The flat platform the slide sits on, over a hole that lets the light through.' },
    { id: 'clips', name: 'Stage clips', job: 'Hold the slide still on the stage.' },
    { id: 'diaphragm', name: 'Diaphragm', job: 'Controls how much light passes up through the slide.' },
    { id: 'light', name: 'Lamp or mirror', job: 'The light source: a lamp, or a mirror that reflects light up through the slide.' },
    { id: 'coarse', name: 'Coarse focus knob', job: 'Moves the lens a long way quickly - to find the image on low power.' },
    { id: 'fine', name: 'Fine focus knob', job: 'Moves the lens a tiny amount to make the image sharp - the only focus knob to use at high power.' },
    { id: 'arm', name: 'Arm', job: 'Carry the microscope by the arm, with your other hand under the base.' },
    { id: 'base', name: 'Base', job: 'The heavy foot that keeps the microscope steady.' },
  ];

  // Colours of a stained smear (the stain turns nuclei purple) and an unstained one.
  const COLOURS = {
    stained:   { bg: '#F6EEEA', rbc: '#DE6670', rbcMid: '#F2AEB2', rbcEdge: '#B8404C', cyto: '#EADFF2', grain: '#C8A8DC',
                 nucleus: '#5B3A8C', lymCyto: '#CFE0F5', lymNuc: '#48307E', platelet: '#8A5BB0' },
    unstained: { bg: '#F8F5EC', rbc: '#EFE3C9', rbcMid: '#F6EFDD', rbcEdge: '#D6C6A2', cyto: '#F4EFE3', grain: '#EEE6D4',
                 nucleus: '#ECE3CE', lymCyto: '#F3EEE2', lymNuc: '#ECE4D0', platelet: '#F1EBDD' },
  };
  // Grade 7: iodine turns onion cells brown (nucleus darkest), methylene blue
  // turns cheek cells blue; unstained, both are nearly colourless. A leaf is green.
  const COLOURS_G7 = {
    onion:  { bg: '#F4E6B8', wall: '#8A5A1C', cyto: '#E3BF6A', vac: '#FAEFCB', nuc: '#6E350B' },
    onionPlain: { bg: '#F7F5EE', wall: '#DCD6C6', cyto: '#F2EFE4', vac: '#F7F5EE', nuc: '#EFEBDF' },
    cheek:  { bg: '#EEF3F8', cyto: '#B5D0EE', mem: '#3F74B3', nuc: '#1C3A86' },
    cheekPlain: { bg: '#F6F6F1', cyto: '#EFEFE7', mem: '#E0E0D5', nuc: '#EAEAE0' },
    leaf:   { bg: '#EAF3DF', wall: '#5F8440', cyto: '#CFE3B4', vac: '#EEF6E2', chl: '#2A8A2E' },
    bubble: { rim: '#1F2327', fill: 'rgba(255,255,255,0.75)' },
  };
  const SLIDE_TINT = { blood: 'rgba(200,80,110,0.8)', unstained: 'rgba(210,190,150,0.8)', onion: 'rgba(214,190,120,0.8)',
                       onionStained: 'rgba(170,100,30,0.85)', cheek: 'rgba(215,215,200,0.8)', cheekStained: 'rgba(60,110,180,0.85)', leaf: 'rgba(60,140,60,0.85)' };

  // ── Discoveries ─────────────────────────────────
  // how = guide tokens (see GUIDES below). scripts/test-labs-microscope.js
  // follows every `how` from a fresh bench and fails if it does not unlock its
  // own card.
  const SETUP = ['rig:scope', 'slide:blood', 'clips', 'light:lamp'];
  const LOW = [...SETUP, 'obj:4', 'lower', 'focus:near', 'focus:sharp'];
  const HIGH = [...LOW, 'obj:40', 'focus:sharp'];
  // Grade 7: make the slide (specimen, stain, cover slip), then the same focusing.
  const G7_SET = (slide, stain) => ['rig:scope', 'slide:' + slide].concat(stain ? ['stain:' + stain] : [], ['cover:angle', 'clips', 'light:lamp']);
  const G7_LOW = (slide, stain) => G7_SET(slide, stain).concat(['obj:4', 'lower', 'focus:near', 'focus:sharp']);
  const G7_HIGH = (slide, stain) => G7_LOW(slide, stain).concat(['obj:40', 'focus:sharp']);
  const DISCOVERIES = [
    { id: 'low_power', icon: '🔍', title: 'Blood on low power', hint: 'Focus a blood smear with the ×4 objective',
      how: LOW, formula: 'total magnification = eyepiece × objective = 10 × 4 = ×40',
      saw: 'At ×40 the smear was covered in hundreds of tiny pink dots - far too small to tell apart.',
      learn: 'Always start on low power: it shows the widest area and leaves the most room between the lens and the slide, so you can find the cells safely before zooming in.' },
    { id: 'smaller_field', icon: '🎯', title: 'Zoom in, see less', hint: 'Focus on low power, then swing in a stronger objective',
      how: [...LOW, 'obj:10'], formula: 'total magnification = 10 × 10 = ×100',
      saw: 'With the ×10 objective the cells looked bigger, but far fewer of them fitted in the circle - and the image was still nearly in focus.',
      learn: 'The more you magnify, the smaller the area you see (the field of view). With a ×10 eyepiece it is about 4.5 mm across at ×40 but only 0.45 mm at ×400 - field of view is beyond the NCE syllabus. Objectives are made to stay nearly in focus when you switch, so only the fine focus is needed after.' },
    { id: 'high_power', icon: '🔬', title: 'Cells at ×400', hint: 'Focus on low power first, then go to high power',
      how: HIGH, formula: 'total magnification = 10 × 40 = ×400',
      saw: 'At ×400 the red cells were clear pink discs with pale centres, and the purple nuclei of the white cells stood out.',
      learn: 'High power is for looking at single cells. The ×40 lens sits very close to the slide, so you focus it with the fine focus knob only.' },
    { id: 'eyepiece', icon: '👁️', title: 'A stronger eyepiece', hint: 'Swap the ×10 eyepiece for the ×15',
      how: [...LOW, 'eye:15'], formula: 'total magnification = 15 × 4 = ×60',
      saw: 'With the ×15 eyepiece the same cells looked one and a half times bigger.',
      learn: 'Total magnification = eyepiece magnification × objective magnification. Change either lens and the total changes.' },
    { id: 'inverted', icon: '🔄', title: 'Upside down and back to front', hint: 'Move the slide while you watch the cells',
      how: [...LOW, 'move:left'],
      saw: 'You moved the slide to the left - and the cells in the eyepiece slid to the RIGHT.',
      learn: 'The lenses of a compound microscope turn the image upside down and back to front, so it moves the opposite way to the slide (beyond the NCE syllabus).' },
    { id: 'diaphragm', icon: '🔆', title: 'More light at high power', hint: 'At ×400, close the diaphragm - then open it',
      how: [...HIGH, 'diaphragm:narrow', 'diaphragm:wide'],
      saw: 'At ×400 with the diaphragm nearly closed the view went dark. Opening it wide brought the cells back.',
      learn: 'The diaphragm controls how much light passes up through the slide. High power spreads the light over a bigger picture, so it needs more light. (A narrower diaphragm gives more contrast when there is light to spare.)' },
    { id: 'mirror', icon: '🪞', title: 'Light from a mirror', hint: 'No lamp? Use the mirror, aimed at a window',
      how: ['rig:scope', 'slide:blood', 'clips', 'light:mirror', 'obj:4', 'lower', 'focus:near', 'focus:sharp'],
      saw: 'With the mirror reflecting light from a bright window, the cells were clear - a little dimmer than with the lamp.',
      learn: 'The mirror reflects light up through the hole in the stage and the slide. Aim it at a window or a lamp - never at the Sun.' },
    { id: 'stain', icon: '🎨', title: 'Why the stain?', hint: 'Look at an UNSTAINED smear on high power',
      how: ['rig:scope', 'slide:unstained', 'clips', 'light:lamp', 'obj:4', 'lower', 'focus:near', 'focus:sharp', 'obj:40', 'focus:sharp'],
      saw: 'Without a stain the cells were pale ghosts, and the nuclei of the white cells could hardly be seen.',
      learn: 'Cells are almost colourless. A stain colours parts of them - it turns the nuclei of white cells purple - so they can be seen and told apart.' },
    { id: 'rbc', icon: '🔴', title: 'Red blood cells', hint: 'Name the cell under the pointer at ×400',
      how: [...HIGH, 'id:rbc'],
      saw: 'A pink disc, paler in the middle, with no nucleus - and there were more of them than anything else.',
      learn: 'Red blood cells carry oxygen using haemoglobin. They have no nucleus, which leaves more room for haemoglobin, and their biconcave shape gives a large surface for taking up oxygen.' },
    { id: 'phago', icon: '🟣', title: 'A phagocyte', hint: 'At ×400, move the slide LEFT to find a big cell with a lobed nucleus',
      how: [...HIGH, 'move:left', 'id:phago'],
      saw: 'A large white blood cell with a purple nucleus in several lobes and grainy cytoplasm.',
      learn: 'Phagocytes are white blood cells that engulf and digest microbes - phagocytosis. They defend the body against disease.' },
    { id: 'lympho', icon: '🔵', title: 'A lymphocyte', hint: 'At ×400, move the slide RIGHT to find a cell that is nearly all nucleus',
      how: [...HIGH, 'move:right', 'id:lympho'],
      saw: 'A white blood cell whose large, round nucleus almost filled it, with only a thin rim of cytoplasm.',
      learn: 'Lymphocytes are white blood cells that make antibodies, which help destroy microbes.' },
    { id: 'platelet', icon: '🟤', title: 'Platelets', hint: 'At ×400, move the slide UP and look for the tiniest purple bits',
      how: [...HIGH, 'move:up', 'id:platelet'],
      saw: 'A tiny purple fragment, much smaller than a red cell, with no nucleus.',
      learn: 'Platelets are fragments of cells, not whole cells. They help the blood to clot, which seals a wound and stops bleeding.' },
    { id: 'drawing', icon: '✏️', title: 'A biological drawing', hint: 'At ×400, draw the cell under the pointer',
      how: [...HIGH, 'draw'], formula: 'magnification of the drawing = 40 mm ÷ 0.008 mm = ×5000',
      saw: 'Your drawing went into the notebook: clear pencil lines, no shading, ruled label lines, and its magnification.',
      learn: 'A biological drawing is large, uses single clear lines with no shading, has label lines drawn with a ruler, and states its magnification: drawing size ÷ real size.' },
    { id: 'mag_calc', icon: '📐', title: 'Magnification = image ÷ actual', hint: 'Measure the red-cell drawing and work out its magnification',
      how: ['rig:measure', 'fig:rbc', 'ruler:cell', 'convert', 'divide', 'answer'], formula: 'magnification = image size ÷ actual size = 60 mm ÷ 0.008 mm = ×7500',
      saw: 'The drawing measured 60 mm. The real cell is 8 µm = 0.008 mm, so the drawing is 7500 times bigger.',
      learn: 'Magnification = image size ÷ actual size, with both in the same unit. It has no unit - it is a length divided by a length.' },
    { id: 'actual_calc', icon: '📏', title: 'Actual size = image ÷ magnification', hint: 'The lymphocyte drawn at ×8000: how big is it really?',
      how: ['rig:measure', 'fig:lympho', 'ruler:cell', 'divide', 'answer'], formula: 'actual size = image size ÷ magnification = 80 mm ÷ 8000 = 0.01 mm',
      saw: 'The drawing measured 80 mm. Divided by 8000, the real lymphocyte is 0.01 mm across.',
      learn: 'Turn the formula round: actual size = image size ÷ magnification. The drawing is bigger than the cell, so you always divide.' },
    { id: 'um_mm', icon: '🔁', title: '1 mm = 1000 µm', hint: 'The platelet drawn at ×15 000 - give its size in µm',
      how: ['rig:measure', 'fig:platelet', 'ruler:cell', 'divide', 'convert', 'answer'], formula: '30 mm ÷ 15 000 = 0.002 mm = 0.002 × 1000 = 2 µm',
      saw: 'The drawing measured 30 mm. 30 ÷ 15 000 = 0.002 mm, and 0.002 × 1000 = 2 µm.',
      learn: 'Cells are measured in micrometres (µm). 1 mm = 1000 µm: multiply mm by 1000 to get µm, and divide µm by 1000 to get mm.' },
    // ── Grade 7 ──
    { id: 'g7_low', grades: [7], icon: '🧅', title: 'Onion cells on low power', hint: 'Focus a stained onion-skin slide with the ×4 objective',
      how: G7_LOW('onion', 'iodine'),
      saw: 'Rows and rows of long, brick-shaped boxes, fitted together like a wall. Each box is one cell.',
      learn: 'Onion skin is a single layer of plant cells, so light passes through it. Starting on low power shows you the widest area, so you can find the cells before you zoom in - and it leaves the most room between the lens and the slide.' },
    { id: 'g7_zoom', grades: [7], icon: '🎯', title: 'Bigger, but fewer', hint: 'Focus the onion cells on low power, then swing in the ×10 objective',
      how: G7_LOW('onion', 'iodine').concat(['obj:10']), formula: 'image size = actual size × magnification = 0.05 mm × 100 = 5 mm',
      saw: 'At ×100 each onion cell looked bigger, but far fewer cells fitted in the circle. The image stayed nearly in focus.',
      learn: 'An onion cell is about 0.05 mm wide - far too small to see with your eyes alone. At ×100 its image is 100 times bigger, so it looks 5 mm wide. The more you magnify, the less of the slide you see at once.' },
    { id: 'g7_stain', grades: [7], icon: '🎨', title: 'Why add a stain?', hint: 'Look at onion skin with NO stain at ×400',
      how: G7_HIGH('onion', null),
      saw: 'Without a stain the onion cells were almost invisible: faint outlines, and no nucleus to be seen.',
      learn: 'Cells are almost colourless. A stain is a dye that colours parts of a cell so they show up. Iodine solution turns the nucleus of an onion cell dark brown; methylene blue turns cheek cells blue.' },
    { id: 'g7_nucleus', grades: [7], icon: '🟤', title: 'The nucleus', hint: 'At ×400 on stained onion skin, name the dark round spot',
      how: G7_HIGH('onion', 'iodine').concat(['part:nucleus']),
      saw: 'A dark brown, round spot inside the cell - the iodine stained it darker than anything else.',
      learn: 'The nucleus controls all the activities of the cell. Plant cells and animal cells both have one.' },
    { id: 'g7_vacuole', grades: [7], icon: '💧', title: 'The vacuole', hint: 'At ×400 on onion skin, move the slide LEFT to the big clear middle',
      how: G7_HIGH('onion', 'iodine').concat(['move:left', 'part:vacuole']),
      saw: 'A big clear space filling the middle of the cell, pale even after staining.',
      learn: 'The large vacuole stores water and cell sap. When it is full it pushes out against the cell wall and keeps the cell firm - that is why a watered plant stands up and a dry one wilts.' },
    { id: 'g7_wall', grades: [7], icon: '🧱', title: 'The cell wall', hint: 'At ×400 on onion skin, move the slide RIGHT onto the thick edge',
      how: G7_HIGH('onion', 'iodine').concat(['move:right', 'part:wall']),
      saw: 'A thick, dark line around each cell, shared with the cell next door.',
      learn: 'The cell wall is made of cellulose. It is strong and rigid, so it holds a plant cell in its fixed, brick-like shape. Only plant cells have one. The thin cell membrane lies just inside it - too thin to see here.' },
    { id: 'g7_cytoplasm', grades: [7], icon: '🫧', title: 'Cytoplasm', hint: 'At ×400 on onion skin, move the slide UP onto the thin layer inside the wall',
      how: G7_HIGH('onion', 'iodine').concat(['move:up', 'part:cytoplasm']),
      saw: 'A thin yellow layer lining the inside of the wall, around the big clear vacuole.',
      learn: 'Cytoplasm is a jelly where most of the cell’s chemical reactions take place. In a plant cell the big vacuole pushes it into a thin layer against the wall.' },
    { id: 'g7_membrane', grades: [7], icon: '⭕', title: 'The cell membrane', hint: 'At ×400 on stained cheek cells, move LEFT twice to the very edge of a cell',
      how: G7_HIGH('cheek', 'blue').concat(['move:left', 'move:left', 'part:membrane']),
      saw: 'A very thin blue line around the cheek cell - and no thick wall outside it.',
      learn: 'The cell membrane controls what goes into and out of the cell. Every cell has one. An animal cell has only its membrane round the outside, so it is soft and can change shape.' },
    { id: 'g7_chloroplast', grades: [7], icon: '🟢', title: 'Chloroplasts', hint: 'At ×400 on a pondweed leaf, name the small green discs',
      how: G7_HIGH('leaf', null).concat(['part:chloroplast']),
      saw: 'Lots of small green discs lining the inside of each leaf cell.',
      learn: 'Chloroplasts contain chlorophyll, the green pigment that traps light for photosynthesis, so the cell can make its own food. Only plant cells that get light have them: root cells and onion cells have none.' },
    { id: 'g7_plant', grades: [7], icon: '🌿', title: 'A plant cell', hint: 'At ×400 on onion skin, decide: plant or animal?',
      how: G7_HIGH('onion', 'iodine').concat(['kind:plant']),
      saw: 'Brick-shaped cells, each with a thick cell wall and a big clear vacuole.',
      learn: 'A cell wall and a large vacuole mean a plant cell. Onion skin has no chloroplasts, because the layers of an onion bulb grow wrapped up, out of the light. A green leaf cell has all three.' },
    { id: 'g7_animal', grades: [7], icon: '👄', title: 'An animal cell', hint: 'At ×400 on cheek cells, decide: plant or animal?',
      how: G7_HIGH('cheek', 'blue').concat(['kind:animal']),
      saw: 'Rounded, flat cells of different shapes, each with a dark blue nucleus - and no wall.',
      learn: 'Cheek cells are animal cells: a cell membrane, cytoplasm and a nucleus, but no cell wall, no large vacuole and no chloroplasts. With no wall they have no fixed shape.' },
  ];

  // ── Hazards: the mistakes that stop the experiment ───
  const SAFETY_EXAM = 'Safety precautions earn marks on the NCE science papers (for example Chemistry 2022 Q5(a)(ii)).';
  const HAZARDS = {
    crack: {
      signs: ['sharp'],
      title: () => 'Crack! The lens hit the slide',
      happened: c => c.knob === 'nosepiece'
        ? `You swung the ×${c.obj} objective into place with the lens already low. The long high-power lens hit the slide and cracked the glass.`
        : `You turned the ${c.knob} focus knob so the ×${c.obj} objective moved DOWN${c.obj === 40 ? ' - and at high power it sits only a fraction of a millimetre above the slide' : ', past the point where it touches the slide'}. The lens pressed into the slide and cracked it.`,
      why: 'Broken glass has sharp edges that can cut your fingers. The objective lens can be scratched or knocked out of line - a scratched lens gives a blurred image for good. A broken blood slide is no longer sealed under its cover slip.',
      instead: 'Start on the LOW-power objective. Watching from the SIDE, lower the lens until it is just above the slide. Then look through the eyepiece and turn the coarse focus so the lens moves UP, away from the slide, until the image appears. At high power use only the fine focus. Tell your teacher about broken glass - do not pick it up.',
      exam: SAFETY_EXAM + ' For a microscope: start on low power, and focus by moving the lens away from the slide.',
    },
    blood: {
      signs: ['biohazard'],
      title: () => 'Stop! No fresh blood in the school lab',
      happened: () => 'You picked up a lancet to prick your finger for a fresh drop of blood.',
      why: 'Blood can carry infections, such as HIV, without the person knowing. A lancet or a slide that has touched someone’s blood can pass an infection on, and even a tiny wound can become infected.',
      instead: 'Use a prepared blood smear: it is sterile, stained and sealed under a cover slip. Never prick yourself or anyone else in class, never share or reuse a lancet, and never touch someone else’s blood.',
      exam: 'HIV is passed on in infected blood - for example on shared needles or other sharp instruments. How HIV spreads and how to prevent it is part of the disease strand of the Biology paper.',
    },
    sun: {
      signs: ['eye'],
      title: () => 'Never use direct sunlight!',
      happened: () => 'You tilted the mirror to catch the Sun. The mirror and the lenses gathered the sunlight and sent it straight up the microscope into your eye - a blinding flash.',
      why: 'Sunlight concentrated by a mirror and lenses can burn the retina at the back of the eye in an instant. It does not hurt while it happens, and the damage can be permanent.',
      instead: 'Aim the mirror at a bright window or a lamp - never at the Sun. Better still, use a microscope with its own lamp.',
      exam: SAFETY_EXAM + ' For a microscope with a mirror: never use direct sunlight.',
    },
    // ── Grade 7 ──
    g7_swab: {
      grades: [7], signs: ['biohazard'],
      title: () => 'Stop! Never use someone else’s cotton bud',
      happened: () => 'You picked up a cotton bud a friend had already used, to scrape the inside of your own cheek.',
      why: 'Saliva (spit) and cheek cells can carry germs - bacteria and viruses. A used bud passes them from one mouth to another, and a used bud left on the bench spreads them to anyone who touches it.',
      instead: 'Use a fresh, clean cotton bud and gently scrape only the inside of your OWN cheek. Put the used bud straight into a beaker of disinfectant (a liquid that kills germs). Wash your hands afterwards.',
      exam: 'Working safely in the lab is part of Grade 7 science: say what could go wrong and how to prevent it. Here - one fresh bud each, and used buds go into disinfectant.',
    },
    g7_stain: {
      grades: [7], signs: ['irritant'],
      title: () => 'Splash! Stain on your skin',
      happened: () => 'You squeezed the dropper hard, with no goggles on. Stain splashed onto your fingers and close to your eyes.',
      why: 'Stains such as iodine solution and methylene blue colour your skin for days and can harm your eyes. Methylene blue is harmful if swallowed.',
      instead: 'Wear goggles. Squeeze the dropper gently: ONE drop, straight onto the specimen. Wipe up spills. If stain gets in your eye, rinse it with plenty of clean water and tell your teacher at once.',
      exam: 'A safety precaution when you use a stain: wear goggles, and add it one drop at a time from a dropper.',
    },
    g7_crack: {
      grades: [7], signs: ['sharp'],
      title: c => c.knob === 'press' ? 'Crack! The cover slip broke' : 'Crack! The lens hit the slide',
      happened: c => c.knob === 'press'
        ? 'You pressed hard on the cover slip to flatten the specimen. A cover slip is glass thinner than a fingernail - it cracked under your thumb.'
        : c.knob === 'nosepiece'
          ? `You swung the ×${c.obj} objective into place with the lens already low. The long high-power lens hit the slide and cracked the glass.`
          : `You turned the ${c.knob} focus knob so the ×${c.obj} objective moved DOWN, onto the slide. The lens pressed into the cover slip and cracked it.`,
      why: 'Broken glass has very sharp edges that can cut you, and tiny slivers of a cover slip are hard to see. The lens can be scratched too - then every image is blurred.',
      instead: 'Never press on a cover slip - lower it gently and let it settle. To focus, start on the LOW-power objective. Watching from the SIDE, lower the lens until it is just above the slide. Then look through the eyepiece and turn the coarse focus so the lens moves UP, away from the slide. Tell your teacher about broken glass - do not pick it up.',
      exam: 'Using a microscope safely: start on low power, and focus by moving the lens away from the slide.',
    },
    g7_sun: {
      grades: [7], signs: ['eye'],
      title: () => 'Never use direct sunlight!',
      happened: () => 'You tilted the mirror to catch the Sun. The mirror and the lenses gathered the sunlight and sent it straight up the microscope into your eye - a blinding flash.',
      why: 'Sunlight gathered by a mirror and lenses can burn the back of your eye (the retina) in an instant. It does not hurt while it happens, and the damage can last for ever.',
      instead: 'Aim the mirror at a bright window or a lamp - never at the Sun. A microscope with its own lamp is even better.',
      exam: 'A safety rule for a microscope with a mirror: never use direct sunlight - it can damage your eyes.',
    },
  };

  // ── Wrong but safe: what went wrong and what to do instead ───
  const MAG_EXAM = 'The paper’s magnification questions - Biology 2023 Q5(a) (×15 000, 3 marks) and Biology 2024 Q4(e)(ii) (×8000, 2 marks) - need you to measure the printed drawing with a ruler, then divide.';
  const RESULTS = {
    no_convert: { icon: '📐', title: 'The units did not match',
      happened: c => c.mode === 'findM'
        ? `You divided ${c.image} mm by ${c.actual} µm without converting. That gives ${c.shown} - 1000 times too small, because 1 mm = 1000 µm. The drawing is really ${c.rightShown}.`
        : `You worked out ${c.image} ÷ ${c.mag} = ${c.mm} - but that answer is in mm, and the question asks for µm. Written as ${c.mm} µm the cell would be 1000 times too small. It is really ${c.rightShown}.`,
      instead: 'Put both lengths in the SAME unit before you divide, and give the answer in the unit the question asks for. 1 mm = 1000 µm: to change µm into mm divide by 1000; to change mm into µm multiply by 1000.',
      exam: 'Biology 2024 Q4(e)(ii) says “Answer in mm” - give the unit the question asks for. Cell sizes are usually given in µm, so check: 1 mm = 1000 µm.' },
    wrong_dim: { icon: '📏', title: 'You measured the wrong part',
      happened: c => `You laid the ruler across ${c.innerName} (${c.inner} mm), not across the whole cell (${c.image} mm). Your answer, ${c.shown}, is for the wrong length - it should be ${c.rightShown}.`,
      instead: 'Measure the whole cell at its widest, from one edge of the cell membrane to the other - the same width the actual size refers to. Put the 0 of the ruler exactly on one edge.',
      exam: MAG_EXAM },
    by_eye: { icon: '👁️', title: 'You guessed instead of measuring',
      happened: c => `You judged the drawing by eye as about ${c.eye} mm. With the ruler it measures ${c.image} mm, so your answer, ${c.shown}, is wrong - it should be ${c.rightShown}.`,
      instead: 'Always measure the drawing with a ruler, in millimetres, with the 0 on one edge of the cell. A guess can be several millimetres out, and a big magnification turns a small error into a big one.',
      exam: MAG_EXAM },
    multiply: { icon: '✖️', title: 'Multiplied instead of divided',
      happened: c => c.mode === 'findActual'
        ? `You multiplied ${c.image} mm by ${c.mag} and got ${c.wrongMm} mm - a cell ${c.metres} metres wide! The drawing is ${c.mag} times BIGGER than the real cell, so the real cell must be smaller.`
        : `You multiplied the image size by the actual size and got ${c.shown}. That is not a magnification: magnification says how many times bigger the drawing is.`,
      instead: 'Magnification = image size ÷ actual size, and actual size = image size ÷ magnification - both are divisions. Then check your answer is sensible: a blood cell is a few micrometres across.',
      exam: MAG_EXAM },
    lost_image: { icon: '🌫️', title: 'The image vanished',
      happened: c => `At high power you turned the COARSE focus knob. One turn moved the lens ${c.mm} mm - but at ×${c.total} the image is sharp only within a tiny fraction of a millimetre, so it disappeared into a blur.`,
      instead: 'At high power use ONLY the fine focus knob. If you lose the image, swing back to low power, find the cells and focus there, then switch to high power again.',
      exam: 'Naming the parts of an apparatus and what each does is a paper skill - labelling a supplied diagram with no word bank is a Biology question shape (Biology 2025 Q2(b)). The fine focus knob is the one for high power.' },
    // ── Grade 7 ──
    g7_bubbles: { grades: [7], icon: '🫧', title: 'Air bubbles under the cover slip',
      happened: () => 'You dropped the cover slip flat onto the drop of water. Air was trapped under it: now there are round bubbles with thick black rims on the slide. A bubble can hide the cells - and it is easy to mistake one for a cell.',
      instead: 'Touch one edge of the cover slip to the slide beside the drop, then lower the other edge slowly, at an angle. The water spreads out and pushes the air in front of it. Make a new slide and try again.',
      exam: 'To remember for a test: lower the cover slip slowly, at an angle, so that no air bubbles are trapped.' },
    g7_highfirst: { grades: [7], icon: '🌫️', title: 'Nothing to see on high power',
      happened: c => `You started on the ×40 objective (×${c.total}) without finding the cells on low power first. At high power the image is sharp only over a tiny distance, and one turn of the coarse knob moved the lens ${c.mm} mm - straight past it. All you can see is light.`,
      instead: 'Always start on the LOW-power objective (×4). It shows the widest area and is easy to focus. Find the cells, make them sharp, THEN swing in the ×40 objective and use only the fine focus.',
      exam: 'To remember for a test: start on the low-power objective - it shows more of the slide and is easier and safer to focus.' },
    g7_nostain: { grades: [7], icon: '👻', title: 'No stain - the cells are almost invisible',
      happened: c => `You tried to name the ${c.part} on ${c.slide} with no stain. The cells are nearly colourless, so even at ×400 you can only just make out faint outlines - the nucleus cannot be seen at all.`,
      instead: 'Add one drop of stain before the cover slip: iodine solution for onion skin (it turns the nucleus dark brown), methylene blue for cheek cells (it turns them blue). Then make the slide again.',
      exam: 'To remember for a test: a stain colours parts of the cell, such as the nucleus, so that they can be seen.' },
    g7_lost_image: { grades: [7], icon: '🌫️', title: 'The image vanished',
      happened: c => `At high power you turned the COARSE focus knob. One turn moved the lens ${c.mm} mm - but at ×${c.total} the image is sharp only within a tiny fraction of a millimetre, so it disappeared into a blur.`,
      instead: 'At high power use ONLY the fine focus knob. If you lose the image, swing back to low power, find the cells and focus there, then switch to high power again.',
      exam: 'To remember for a test: the fine focus knob is the one to use at high power.' },
  };

  // Short, true facts for the 💡 button, tied to the chapter.
  const FACTS = [
    'Total magnification = eyepiece × objective. A ×10 eyepiece with a ×40 objective gives ×400.',
    'Always start on the low-power objective: it shows the widest area and leaves the most room between the lens and the slide.',
    'A red blood cell is about 7-8 µm across - about 125 of them side by side would stretch 1 mm.',
    '1 mm = 1000 µm (micrometres). Cells are so small that biologists measure them in µm.',
    'Red blood cells have no nucleus, leaving more room for haemoglobin, the red pigment that carries oxygen.',
    'The biconcave shape of a red blood cell gives it a large surface area for taking up oxygen.',
    'Phagocytes engulf and digest microbes. Lymphocytes make antibodies.',
    'Platelets are fragments of cells. They help the blood to clot at a wound.',
    'Plasma, the pale yellow liquid part of blood, carries the cells, dissolved food, carbon dioxide and hormones.',
    'Red cells far outnumber white cells - about 5 million red cells but only about 7000 white cells in one cubic millimetre of blood (beyond the NCE syllabus).',
    'A stain colours the nuclei of white blood cells purple, so they can be seen.',
    'Magnification has no unit: it is a length divided by a length.',
    'A biological drawing uses a sharp pencil, single clear lines, no shading and ruled label lines - and states its magnification.',
    'Carry a microscope with two hands: one on the arm, one under the base.',
  ];
  // Grade 7 facts, each from the grade7-science cells chapter.
  const FACTS_G7 = [
    'All living things are made of cells. The cell is the basic unit of life.',
    'Cells are far too small to see with your eyes alone - you need a microscope.',
    'The nucleus controls all the activities of the cell.',
    'The cell membrane controls what goes into and out of the cell.',
    'Only plant cells have a cell wall. It is made of cellulose and gives them a fixed, brick-like shape.',
    'Chloroplasts contain chlorophyll, the green pigment that traps light for photosynthesis.',
    'The large vacuole in a plant cell stores water and cell sap, which keeps the cell firm.',
    'Plant and animal cells both have a cell membrane, cytoplasm and a nucleus.',
    'Root cells have no chloroplasts: no light reaches them under the ground.',
    'Image size = actual size × magnification. A cell 0.05 mm wide looks 5 mm wide at ×100.',
    'Robert Hooke first used the word "cell" in 1665, after looking at cork through a microscope.',
    'Cells → tissues → organs → organ systems → organism: from smallest to largest.',
    'Always start on the low-power objective, and carry a microscope with one hand on the arm and one under the base.',
  ];
  function imageOf(actualMmV, mag) { return _clean(actualMmV * mag); }

  // Little drawings for the picture questions (no text inside - the labels say
  // what a pupil sees, never the name being asked for).
  const _svg = inner => `<svg viewBox="0 0 64 48" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  const _ptr = (x, y) => `<line x1="2" y1="2" x2="${x}" y2="${y}" stroke="#111" stroke-width="1.6"/><circle cx="${x}" cy="${y}" r="1.8" fill="#111"/>`;
  const _onionPic = '<rect x="4" y="12" width="56" height="24" fill="#E3BF6A" stroke="#8A5A1C" stroke-width="3"/><rect x="9" y="17" width="46" height="14" fill="#FAEFCB"/><circle cx="18" cy="24" r="4.5" fill="#6E350B"/>';
  const _leafPic = '<rect x="6" y="12" width="52" height="24" fill="#EEF6E2" stroke="#5F8440" stroke-width="2.5"/>'
    + [11, 17, 23, 29, 35, 41, 47, 53].map(x => `<circle cx="${x}" cy="16.5" r="2" fill="#2A8A2E"/><circle cx="${x}" cy="31.5" r="2" fill="#2A8A2E"/>`).join('');
  const _cheekPic = '<path d="M32 8C44 8 56 16 54 26C52 38 40 42 30 40C18 38 8 32 10 22C12 12 22 8 32 8Z" fill="#B5D0EE" stroke="#3F74B3" stroke-width="1.5"/><circle cx="31" cy="24" r="4" fill="#1C3A86"/>';
  const _rbcPic = '<circle cx="32" cy="24" r="15" fill="#DE6670"/><circle cx="32" cy="24" r="6" fill="#F2AEB2"/>';
  const PICS = {
    onion: _svg(_onionPic), leaf: _svg(_leafPic), cheek: _svg(_cheekPic), rbc: _svg(_rbcPic),
    onionAt: { vacuole: _svg(_onionPic + _ptr(42, 25)), nucleus: _svg(_onionPic + _ptr(18, 24)),
               wall: _svg(_onionPic + _ptr(60, 30)), cytoplasm: _svg(_onionPic + _ptr(32, 15.2)) },
  };
  const PTR_LABEL = { vacuole: 'Pointer in the big clear middle', nucleus: 'Pointer on the dark round spot',
                      wall: 'Pointer on the thick outer edge', cytoplasm: 'Pointer on the thin layer inside the edge' };
  const _pickPart = (...order) => order.map(p => ({ label: PTR_LABEL[p], svg: PICS.onionAt[p] }));

  // ── Missions ── A question's FIRST option is the answer; the quiz shuffles them.
  // `calc` on a question lets the data test re-derive its answer.
  const MISSIONS = [
    {
      id: 'focus', icon: '🎯', title: 'Focus at ×400, safely', rig: 'scope',
      blurb: 'Set up the microscope, focus on low power, then go to high power - without cracking a slide.',
      intro: 'Put the stained blood smear on the stage and clip it, switch on the light, focus it on LOW power (lower the lens watching from the side, then focus upwards), then swing in the ×40 objective and make the cells sharp with the fine focus only.',
      quiz: [
        { q: 'Which objective lens should you always start with?',
          options: ['The low-power objective (×4)', 'The high-power objective (×40)', 'The medium-power objective (×10)', 'Whichever lens is nearest the slide'],
          why: 'Low power shows the widest area and leaves the most room above the slide, so you find the cells safely before zooming in.' },
        { q: 'A microscope has a ×10 eyepiece and a ×40 objective. What is the total magnification?',
          options: ['×400', '×50', '×30', '×4'], calc: { kind: 'total', eye: 10, obj: 40, answer: 400 },
          why: 'Total magnification = eyepiece × objective = 10 × 40 = ×400. You multiply, never add.' },
        { q: 'Which part should you use to focus at high power?',
          options: ['The fine focus knob', 'The coarse focus knob', 'The diaphragm', 'The stage clips'],
          why: 'At high power the lens is very close to the slide and the image is sharp only over a tiny distance. The coarse knob would lose the image - or crack the slide.' },
        { q: 'What is the job of the stage clips?',
          options: ['To hold the slide still on the stage', 'To make the image brighter', 'To change the magnification', 'To focus the image'],
          why: 'The clips stop the slide sliding about while you move and focus.' },
        { q: 'What does the diaphragm control?',
          options: ['How much light passes up through the slide', 'How far the lens is from the slide', 'The magnification of the eyepiece', 'Which objective lens is in use'],
          why: 'Open it for more light (high power needs it); close it a little for more contrast.' },
        { q: 'Looking through the eyepiece, which way should the coarse focus move the lens?',
          options: ['Up, away from the slide', 'Down, towards the slide', 'It does not matter', 'Sideways, across the slide'],
          why: 'Lower the lens while watching from the SIDE; then, looking through the eyepiece, only ever focus upwards - so the lens can never hit the slide.' },
        { q: 'Why must you never use the mirror to reflect direct sunlight into a microscope?',
          options: ['Focused sunlight can permanently damage your eyes', 'Sunlight makes the stain fade', 'The mirror would crack in the heat', 'Sunlight is not bright enough'],
          why: 'The mirror and lenses concentrate the sunlight into your eye. Use a window or a lamp instead.' },
      ],
    },
    {
      id: 'cells', icon: '🩸', title: 'Name that cell', rig: 'scope',
      blurb: 'At ×400, move the slide to find and name a red cell, a phagocyte, a lymphocyte and a platelet.',
      intro: 'Focus the stained blood smear at ×400 (low power first!). Then move the slide to bring different cells under the pointer, and name each one: a red blood cell, a phagocyte, a lymphocyte and a platelet. White cells are rare - you will have to hunt.',
      need: ['rbc', 'phago', 'lympho', 'platelet'],
      quiz: [
        { q: 'Which cell carries oxygen around the body?',
          options: ['The red blood cell', 'The phagocyte', 'The lymphocyte', 'The platelet'],
          why: 'Red blood cells contain haemoglobin, which carries oxygen from the lungs to the body cells.' },
        { q: 'Why does a red blood cell have no nucleus?',
          options: ['It leaves more room for haemoglobin to carry oxygen', 'It lets the cell divide more often', 'It helps the cell to fight infection', 'It helps the blood to clot'],
          why: 'Without a nucleus the cell has more space for haemoglobin, so each cell carries more oxygen.' },
        { q: 'Which white blood cell engulfs and digests bacteria?',
          options: ['The phagocyte', 'The lymphocyte', 'The red blood cell', 'The platelet'],
          why: 'Phagocytes engulf microbes - phagocytosis. Lymphocytes work differently: they make antibodies.' },
        { q: 'What do lymphocytes produce?',
          options: ['Antibodies', 'Haemoglobin', 'Platelets', 'Plasma'],
          why: 'Lymphocytes make antibodies, which help destroy particular microbes.' },
        { q: 'What is the job of the platelets?',
          options: ['To help the blood clot at a wound', 'To carry oxygen', 'To make antibodies', 'To carry dissolved food'],
          why: 'Platelets are cell fragments that help blood to clot, sealing a wound.' },
        { q: 'On your slide, how could you tell a white blood cell from a red blood cell?',
          options: ['The white cell has a nucleus, stained purple', 'The white cell is smaller and has no nucleus', 'The white cell is a pink disc with a pale centre', 'The white cell has no cell membrane'],
          why: 'White cells have a nucleus (lobed in a phagocyte, large and round in a lymphocyte); red cells have none.' },
        { q: 'Which part of the blood is not a cell, but the liquid the cells are carried in?',
          options: ['Plasma', 'Platelets', 'Haemoglobin', 'Lymphocytes'],
          why: 'Plasma is the pale yellow liquid. It carries the cells, dissolved food, carbon dioxide and hormones.' },
      ],
    },
    {
      id: 'mag', icon: '📐', title: 'Work out the magnification', rig: 'measure',
      blurb: 'Measure two drawings with the ruler: find a magnification, then the paper’s ×15 000 question.',
      intro: 'Two drawings, the way the paper sets them. 1) The red blood cell: measure it with the ruler and find the magnification (its real width is 8 µm). 2) The platelet drawn at ×15 000: measure it and find its real size in µm. Make the units match!',
      need: ['rbc', 'platelet'],
      quiz: [
        { q: 'Which formula gives the magnification of a drawing?',
          options: ['Magnification = image size ÷ actual size', 'Magnification = actual size ÷ image size', 'Magnification = image size × actual size', 'Magnification = image size − actual size'],
          why: 'Magnification is how many times bigger the image is than the real thing: image size ÷ actual size, in the same unit.' },
        { q: 'A red blood cell 8 µm wide is drawn 40 mm wide. What is the magnification of the drawing?',
          options: ['×5000', '×5', '×320', '×50'], calc: { kind: 'mag', imageMm: 40, actualUm: 8, answer: 5000 },
          why: '8 µm = 0.008 mm. 40 ÷ 0.008 = ×5000. Forgetting to convert gives 40 ÷ 8 = 5 - 1000 times too small.' },
        { q: 'A cell is drawn at a magnification of ×15 000. The drawing measures 45 mm. What is the actual size of the cell?',
          options: ['0.003 mm (3 µm)', '675 000 mm', '0.03 mm (30 µm)', '3 mm'], calc: { kind: 'actualMm', imageMm: 45, mag: 15000, answer: 0.003 },
          why: 'The ×15 000 shape of Biology 2023 Q5(a): actual size = image ÷ magnification = 45 ÷ 15 000 = 0.003 mm = 3 µm.' },
        { q: 'A white blood cell is drawn at ×8000 and the drawing measures 96 mm. What is its actual size, in mm?',
          options: ['0.012 mm', '0.12 mm', '768 000 mm', '1.2 mm'], calc: { kind: 'actualMm', imageMm: 96, mag: 8000, answer: 0.012 },
          why: 'The shape of Biology 2024 Q4(e)(ii): 96 ÷ 8000 = 0.012 mm (12 µm) - a sensible size for a white cell.' },
        { q: 'How many micrometres (µm) are there in 1 mm?',
          options: ['1000', '100', '10', '1 000 000'], calc: { kind: 'umPerMm', answer: 1000 },
          why: '1 mm = 1000 µm. Multiply mm by 1000 to get µm; divide µm by 1000 to get mm.' },
        { q: 'Why does a magnification have no unit?',
          options: ['It is a length divided by a length, so the units cancel', 'It is always measured in millimetres', 'It is always a whole number', 'Micrometres are too small to write'],
          why: 'mm ÷ mm (or µm ÷ µm) leaves a plain number. The × in front of it is not a unit.' },
        { q: 'On the paper, how do you find the image size of a printed drawing?',
          options: ['Measure it with a ruler, in mm', 'Estimate it by eye', 'Count the cells in the drawing', 'Read it off the magnification'],
          why: 'Biology 2024 Q4(e)(ii) and 2023 Q5(a) both need the printed figure measured with a ruler - it is the first step of the calculation.' },
      ],
    },
    // ── Grade 7 ──
    {
      id: 'g7_onionparts', grades: [7], icon: '🧅', title: 'Parts of a plant cell', rig: 'scope', slide: 'onion',
      blurb: 'Make a stained onion-skin slide and name four parts of a plant cell at ×400.',
      intro: 'Make an onion-skin slide: onion skin, one drop of iodine, and a cover slip lowered at an angle. Focus it on LOW power first, then go to ×400. Move the slide to bring each part under the pointer, and name it: the nucleus, the cell wall, the vacuole and the cytoplasm.',
      need: ['nucleus', 'wall', 'vacuole', 'cytoplasm'],
      needs: { nucleus: '🟤 The nucleus', wall: '🧱 The cell wall', vacuole: '💧 The vacuole', cytoplasm: '🫧 The cytoplasm' },
      quiz: [
        { q: 'The pointer in each drawing of an onion cell rests on a different part. Which one points at the VACUOLE?',
          options: _pickPart('vacuole', 'nucleus', 'wall', 'cytoplasm'),
          why: 'The vacuole is the big clear space in the middle of a plant cell. It stores water and cell sap.' },
        { q: 'Which drawing points at the CELL WALL?',
          options: _pickPart('wall', 'vacuole', 'nucleus', 'cytoplasm'),
          why: 'The cell wall is the thick outer edge. It is made of cellulose and holds the cell’s shape.' },
        { q: 'Which part of the cell controls all its activities?',
          options: ['The nucleus', 'The vacuole', 'The cell wall', 'The cytoplasm'],
          why: 'The nucleus is the control centre of the cell. Iodine stains it dark brown.' },
        { q: 'Onion cells keep a fixed, brick-like shape. Which part gives them that shape?',
          options: ['The cell wall', 'The cell membrane', 'The nucleus', 'The cytoplasm'],
          why: 'Only plant cells have a rigid wall of cellulose outside the membrane. It holds the shape.' },
        { q: 'Why did you add a drop of iodine to the onion skin?',
          options: ['To stain the cells so their parts can be seen', 'To keep the onion skin alive', 'To stop any air bubbles forming', 'To make the cells grow bigger'],
          why: 'Cells are almost colourless. Iodine stains them, and the nucleus shows up dark brown.' },
        { q: 'How should you lower the cover slip onto the slide?',
          options: ['Slowly, one edge first, at an angle', 'Quickly, dropped flat from above', 'Pressed down hard with a thumb', 'It does not matter how you do it'],
          why: 'Lowering it at an angle pushes the air out, so no bubbles are trapped. Pressing can crack the thin glass.' },
        { q: 'Onion skin cells have no chloroplasts. Why does that make sense?',
          options: ['The onion layers grow out of the light', 'Onion cells do not need any energy', 'Chloroplasts would make it too heavy', 'The iodine washed the chloroplasts away'],
          why: 'Chloroplasts need light to make food. The layers of an onion bulb grow wrapped up, in the dark - like root cells, they have none.' },
      ],
    },
    {
      id: 'g7_compare', grades: [7], icon: '🔍', title: 'Plant or animal?', rig: 'scope',
      blurb: 'Look at your own cheek cells and a pondweed leaf. Which is plant, which is animal - and how can you tell?',
      intro: 'Make two slides, one at a time. 1) Your cheek cells with methylene blue: name the cell membrane, then decide - plant or animal? 2) A pondweed leaf (no stain needed): name a chloroplast, then decide again. Low power first each time!',
      need: ['membrane', 'animal', 'chloroplast', 'plant'],
      needSlide: { membrane: 'cheek', animal: 'cheek', chloroplast: 'leaf', plant: 'leaf' },
      needs: { membrane: '⭕ Cheek cell: the cell membrane', animal: '👄 Cheek cell: plant or animal?', chloroplast: '🟢 Leaf cell: a chloroplast', plant: '🌿 Leaf cell: plant or animal?' },
      quiz: [
        { q: 'Which drawing shows a cheek cell?',
          options: [{ label: 'Rounded, no wall, a dark spot inside', svg: PICS.cheek }, { label: 'A long box with a thick edge', svg: PICS.onion },
                    { label: 'A box lined with green discs', svg: PICS.leaf }, { label: 'A pink disc, pale in the middle', svg: PICS.rbc }],
          why: 'Cheek cells are animal cells: rounded and floppy, with a nucleus - but no wall.' },
        { q: 'You saw a nucleus, a membrane and cytoplasm in your cheek cells. Which part did the onion cells have that the cheek cells did not?',
          options: ['A cell wall', 'A nucleus', 'A cell membrane', 'Cytoplasm'],
          why: 'Both kinds of cell have a nucleus, a membrane and cytoplasm. Only the plant cell has a cell wall.' },
        { q: 'Which part traps light for photosynthesis?',
          options: ['The chloroplast', 'The vacuole', 'The nucleus', 'The cell membrane'],
          why: 'Chloroplasts contain chlorophyll, the green pigment that traps light energy.' },
        { q: 'Which three parts do plant cells AND animal cells both have?',
          options: ['Membrane, cytoplasm and nucleus', 'Wall, vacuole and chloroplasts', 'Wall, membrane and nucleus', 'Cytoplasm, vacuole and chloroplasts'],
          why: 'Every cell has a membrane, cytoplasm and a nucleus. The wall, the large vacuole and chloroplasts belong to plant cells.' },
        { q: 'A cell has a rigid wall and green structures inside. What can you conclude?',
          options: ['It is a plant cell that can photosynthesise', 'It is an animal cell that makes food', 'It is a plant cell from a root', 'It is an animal cell with a wall'],
          why: 'A wall means a plant cell, and the green chloroplasts mean it can photosynthesise. Root cells have walls but no chloroplasts.' },
        { q: 'An onion cell is 0.05 mm wide. How wide does it look at ×400?',
          options: ['20 mm', '0.000125 mm', '4 mm', '400 mm'], calc: { kind: 'image', actualMm: 0.05, mag: 400, answer: 20 },
          why: 'Image size = actual size × magnification = 0.05 × 400 = 20 mm. The image is bigger than the cell, so you multiply.' },
        { q: 'What should you do with the cotton bud after scraping your cheek?',
          options: ['Put it straight into disinfectant', 'Give it to a friend to use', 'Leave it on the bench for later', 'Rinse it and put it back in the box'],
          why: 'Saliva can carry germs. Disinfectant kills them, and nobody else touches your bud.' },
      ],
    },
  ];

  // ── Guided experiments: "I landed here - what do I do?" ──
  // One action per step. `on` is what completes it:
  //   rig:scope|measure · slide:blood|unstained · clips · light:lamp|mirror|off
  //   diaphragm:wide|mid|narrow · eye:10|15 · obj:4|10|40 · lower
  //   coarse:up|down · fine:up|down · focus:near|sharp (the image has become
  //   nearly sharp / sharp - the button turns the right knob one step)
  //   move:left|right|up|down · id:<cell> · draw
  //   fig:<figure> · ruler:cell|inner|eye · convert · divide · multiply · answer
  // A step whose setting is already in place is skipped.
  const GUIDES = [
    { id: 'firstlook', icon: '🔍', title: 'Your first look',
      blurb: 'Set up the microscope and focus a blood smear on low power.',
      lesson: 'Total magnification = eyepiece × objective = 10 × 4 = ×40. On low power the blood is hundreds of tiny dots. Starting on low power, and focusing UPWARDS away from the slide, keeps the lens and the slide safe.',
      steps: [
        { on: 'rig:scope', say: 'Tap 🔬 to go to the microscope.' },
        { on: 'slide:blood', say: 'Tap 🩸 to put the blood smear on the stage, over the light hole.' },
        { on: 'clips', say: 'Tap 📎 to clip the slide still with the two stage clips.' },
        { on: 'light:lamp', say: 'Tap 💡 to switch on the lamp.' },
        { on: 'obj:4', say: 'Tap 🔍 ×4 to turn to the LOW-power objective — always start here!' },
        { on: 'lower', say: 'Tap ⬇️ to lower the lens — watch from the SIDE so you don\'t hit the slide.' },
        { on: 'focus:near', say: 'Look through the eyepiece — tap ⤴️ to turn the COARSE focus UP until cells appear.' },
        { on: 'focus:sharp', say: 'Tap 🎯 to use the FINE focus — a little at a time until cells are sharp.' },
      ] },
    { id: 'highpower', icon: '🔬', title: 'Go to high power',
      blurb: 'Focus on low power, switch to ×400 and name your first cell.',
      lesson: 'At ×400 (10 × 40) single cells can be named. The image stayed nearly in focus when you switched, so only the fine focus was needed - the coarse knob at high power loses the image or cracks the slide. The pink disc with a pale centre and no nucleus is a red blood cell.',
      steps: [
        { on: 'rig:scope', say: 'Tap 🔬 to go to the microscope.' },
        { on: 'slide:blood', say: 'Tap 🩸 to put the blood smear on the stage.' },
        { on: 'clips', say: 'Tap 📎 to clip the slide in place.' },
        { on: 'light:lamp', say: 'Tap 💡 to switch on the lamp.' },
        { on: 'obj:4', say: 'Tap 🔍 ×4 for low power first — always start here!' },
        { on: 'lower', say: 'Tap ⬇️ to lower the lens — watch from the side.' },
        { on: 'focus:near', say: 'Look through the eyepiece — tap ⤴️ COARSE focus UP until cells appear.' },
        { on: 'focus:sharp', say: 'Tap 🎯 fine focus until the cells are sharp.' },
        { on: 'obj:40', say: 'Tap 🔬 ×40 to swing in HIGH-power — the image should stay nearly in focus.' },
        { on: 'focus:sharp', say: 'Tap 🎯 fine focus ONLY now — a tiny turn at a time.' },
        { on: 'id:rbc', say: 'Tap the pink disc with the pale centre and no nucleus — name it!' },
      ] },
    { id: 'hunt', icon: '🧭', title: 'Hunt for white cells',
      blurb: 'At ×400, move the slide to find a phagocyte and a lymphocyte - and draw one.',
      lesson: 'White cells are rare, so you have to move the slide to find them. Both have a nucleus that the stain turns purple: a phagocyte’s is in lobes, a lymphocyte’s is large and round. Phagocytes engulf microbes; lymphocytes make antibodies.',
      steps: [
        { on: 'rig:scope', say: 'Tap 🔬 to go to the microscope.' },
        { on: 'slide:blood', say: 'Tap 🩸 to put the blood smear on the stage.' },
        { on: 'clips', say: 'Tap 📎 to clip the slide in place.' },
        { on: 'light:lamp', say: 'Tap 💡 to switch on the lamp.' },
        { on: 'obj:4', say: 'Tap 🔍 ×4 for low power first.' },
        { on: 'lower', say: 'Tap ⬇️ to lower the lens — watch from the side.' },
        { on: 'focus:near', say: 'Look through the eyepiece — tap ⤴️ COARSE focus UP until cells appear.' },
        { on: 'focus:sharp', say: 'Tap 🎯 fine focus until they are sharp.' },
        { on: 'obj:40', say: 'Tap 🔬 ×40 to swing in the high-power objective.' },
        { on: 'focus:sharp', say: 'Tap 🎯 fine focus only — careful!' },
        { on: 'move:left', say: 'Tap ◀ to move the slide LEFT — watch which way the cells go.' },
        { on: 'id:phago', say: 'Tap the big cell with a purple lobed nucleus — name it!' },
        { on: 'draw', say: 'Tap ✏️ to draw it — a good biological drawing.' },
        { on: 'move:right', say: 'Tap ▶ to move the slide RIGHT.' },
        { on: 'move:right', say: 'Tap ▶ once more to the right.' },
        { on: 'id:lympho', say: 'Tap the cell that is nearly all large round nucleus — name it!' },
      ] },
    { id: 'measure', icon: '📐', title: 'Measure a drawing',
      blurb: 'Measure a red blood cell drawing with the ruler and find its magnification.',
      lesson: 'Magnification = image size ÷ actual size. The drawing measured 60 mm; the real cell is 8 µm = 0.008 mm; 60 ÷ 0.008 = ×7500. Make the units match first, and write no unit after a magnification.',
      steps: [
        { on: 'rig:measure', say: 'Tap 📏 to go to the measuring desk.' },
        { on: 'fig:rbc', say: 'Tap 🔴 to choose the red blood cell drawing (real width: 8 µm).' },
        { on: 'ruler:cell', say: 'Tap 📏 to lay the ruler across the WHOLE cell with 0 on one edge.' },
        { on: 'convert', say: 'Tap 🔁 to make units match: 8 µm = 8 ÷ 1000 mm.' },
        { on: 'divide', say: 'Tap ➗ — magnification = image size ÷ actual size.' },
        { on: 'answer', say: 'Tap ✅ to write the answer — no unit after a magnification!' },
      ] },
    { id: 'paper', icon: '📝', title: 'The ×15 000 question',
      blurb: 'The paper’s hardest sum: a platelet drawn at ×15 000. How big is it in µm?',
      lesson: 'Actual size = image size ÷ magnification = 30 mm ÷ 15 000 = 0.002 mm, and 0.002 mm × 1000 = 2 µm. The drawing is bigger than the platelet, so you divide - and then give the answer in the unit asked for.',
      steps: [
        { on: 'rig:measure', say: 'Tap 📏 to go to the measuring desk.' },
        { on: 'fig:platelet', say: 'Tap 🟤 to choose the platelet drawn at ×15 000.' },
        { on: 'ruler:cell', say: 'Tap 📏 to lay the ruler across the drawing.' },
        { on: 'divide', say: 'Tap ➗ — actual size = image size ÷ magnification (÷ 15 000).' },
        { on: 'convert', say: 'Tap 🔁 to convert mm → µm: multiply by 1000.' },
        { on: 'answer', say: 'Tap ✅ to write the answer with its unit.' },
      ] },
    // ── Grade 7 ──
    { id: 'g7_onion', grades: [7], icon: '🧅', title: 'Onion skin cells',
      blurb: 'Make an onion-skin slide, stain it with iodine and find the nucleus.',
      lesson: 'Onion skin is one layer of plant cells, shaped like bricks. The iodine stained the nucleus dark brown so you could see it. You started on low power and focused upwards, away from the slide, so the lens never touched it.',
      steps: [
        { on: 'rig:scope', say: 'Tap 🔬 to go to the microscope.' },
        { on: 'slide:onion', say: 'Tap 🧅 to peel a thin layer of onion skin and lay it flat on the slide.' },
        { on: 'stain:iodine', say: 'Tap 💧 to add ONE drop of iodine solution — it stains the cell parts.' },
        { on: 'cover:angle', say: 'Tap 🔲 to lower the cover slip at an angle — this pushes air out.' },
        { on: 'clips', say: 'Tap 📎 to clip the slide still on the stage.' },
        { on: 'light:lamp', say: 'Tap 💡 to switch on the lamp.' },
        { on: 'obj:4', say: 'Tap 🔍 ×4 for low power — always start here!' },
        { on: 'lower', say: 'Tap ⬇️ to lower the lens — watch from the SIDE.' },
        { on: 'focus:near', say: 'Look through the eyepiece — tap ⤴️ COARSE focus UP until cells appear.' },
        { on: 'focus:sharp', say: 'Tap 🎯 fine focus — a little at a time until sharp.' },
        { on: 'obj:40', say: 'Tap 🔬 ×40 to swing to high power.' },
        { on: 'focus:sharp', say: 'Tap 🎯 fine focus ONLY now.' },
        { on: 'part:nucleus', say: 'Tap the dark round spot — name this part of the cell!' },
      ] },
    { id: 'g7_cheek', grades: [7], icon: '👄', title: 'Your own cheek cells',
      blurb: 'Scrape your cheek, stain the cells with methylene blue and find the cell membrane.',
      lesson: 'Cheek cells are animal cells: rounded and floppy, with a thin cell membrane, cytoplasm and a nucleus - but no cell wall, no large vacuole and no chloroplasts. The methylene blue stained the nucleus dark blue.',
      steps: [
        { on: 'rig:scope', say: 'Tap 🔬 to go to the microscope.' },
        { on: 'slide:cheek', say: 'Tap 👄 to scrape cheek cells and smear them on a slide.' },
        { on: 'stain:blue', say: 'Tap 💧 to add ONE drop of methylene blue stain.' },
        { on: 'cover:angle', say: 'Tap 🔲 to lower the cover slip at an angle.' },
        { on: 'clips', say: 'Tap 📎 to clip the slide still.' },
        { on: 'light:lamp', say: 'Tap 💡 to switch on the lamp.' },
        { on: 'obj:4', say: 'Tap 🔍 ×4 for low power first.' },
        { on: 'lower', say: 'Tap ⬇️ to lower the lens — watch from the side.' },
        { on: 'focus:near', say: 'Look through the eyepiece — tap ⤴️ COARSE focus UP until cells appear.' },
        { on: 'focus:sharp', say: 'Tap 🎯 fine focus until sharp.' },
        { on: 'obj:40', say: 'Tap 🔬 ×40 for high power.' },
        { on: 'focus:sharp', say: 'Tap 🎯 fine focus ONLY now.' },
        { on: 'part:nucleus', say: 'Tap the dark blue spot inside the cell — name it!' },
        { on: 'move:left', say: 'Tap ◀ to move the slide LEFT.' },
        { on: 'move:left', say: 'Tap ◀ once more — to the very edge of the cell.' },
        { on: 'part:membrane', say: 'Tap the very thin line around the cell — name it!' },
        { on: 'kind:animal', say: 'No wall, no big vacuole, no green discs — tap to decide: plant or animal?' },
      ] },
    { id: 'g7_leaf', grades: [7], icon: '🌿', title: 'Green leaf cells',
      blurb: 'Look at a pondweed leaf - no stain needed - and find the chloroplasts and the cell wall.',
      lesson: 'The leaf cells were neat boxes with a cell wall, a big vacuole and many green chloroplasts, where photosynthesis happens. The leaf is so thin that light passes through it, and the chloroplasts are green on their own - so no stain was needed.',
      steps: [
        { on: 'rig:scope', say: 'Tap 🔬 to go to the microscope.' },
        { on: 'slide:leaf', say: 'Tap 🌿 to lay a pondweed leaf flat in a drop of water on the slide.' },
        { on: 'cover:angle', say: 'Tap 🔲 — no stain needed, just lower the cover slip at an angle.' },
        { on: 'clips', say: 'Tap 📎 to clip the slide still.' },
        { on: 'light:lamp', say: 'Tap 💡 to switch on the lamp.' },
        { on: 'obj:4', say: 'Tap 🔍 ×4 for low power first.' },
        { on: 'lower', say: 'Tap ⬇️ to lower the lens — watch from the side.' },
        { on: 'focus:near', say: 'Look through the eyepiece — tap ⤴️ COARSE focus UP until cells appear.' },
        { on: 'focus:sharp', say: 'Tap 🎯 fine focus until sharp.' },
        { on: 'obj:40', say: 'Tap 🔬 ×40 for high power.' },
        { on: 'focus:sharp', say: 'Tap 🎯 fine focus ONLY now.' },
        { on: 'part:chloroplast', say: 'Tap the small green disc — name it!' },
        { on: 'move:left', say: 'Tap ◀ to move the slide LEFT to the edge of the cell.' },
        { on: 'part:wall', say: 'Tap the firm line around the box-shaped cell — name it!' },
        { on: 'kind:plant', say: 'Cell wall AND chloroplasts — tap to decide: plant or animal?' },
      ] },
  ];

  return { GRADES, forGrade, STAINS, COVERS, TISSUE, brick, onionNucleus, leafChloros, CHEEK, CHEEK_TILE, CHEEK_NUC, CHEEK_MEM, cheekR,
           partAt, G7_POINTS, pointG7, partUnder, BUBBLES, G7_VIEW_K, viewUmG7, ONION_WIDTH_UM, CELL_PARTS, PART_IDS,
           identifyPart, classify, ID_SAY_G7, highFirst, COLOURS_G7, SLIDE_TINT, FACTS_G7, imageOf, PICS,
           EYEPIECES, OBJECTIVES, OBJ, total, FIELD_NUMBER, fieldOfViewMm,
           Z_START, Z_MIN, Z_MAX, COARSE, FINE, FOCUS_AT, WORK_DIST, DEPTH, LOWER_GAP, clearance, blur, focusWord, FOCUS_WORDS, lowerTo, clampZ,
           LIGHTS, DIAPHRAGM, OBJ_LIGHT, DARK_BELOW, brightness, SLIDES, CELLS, CELL_IDS, PLASMA,
           FIELD_UM, FIELD_X, FIELD_Y, POINTER, under, MOVES, move, VIEW_K, viewUm, fieldCells,
           view, scopeDiscoveries, identify, ID_SAY, DRAW,
           UM_PER_MM, mmToUm, umToMm, magnification, actualMm, actualUm, imageMm, same, fmt,
           FIGURES, figure, rulerLen, imageFor, rightAnswer, work, workLines, measureDiscoveries,
           PARTS, COLOURS, DISCOVERIES, HAZARDS, RESULTS, FACTS, MISSIONS, GUIDES };
})();
if (typeof window !== 'undefined') window.LabMicroscopeData = LabMicroscopeData;
