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
// ══════════════════════════════════════════════
const LabMicroscopeData = (() => {

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
      const jx = (rnd() - 0.5) * 6, jy = (rnd() - 0.5) * 6;
      if (r < 0.84) out.push({ type: 'rbc', x: gx * step + jx, y: gy * step + jy, rot: rnd() * 6.283 });
      else if (r < 0.92 && !near) out.push({ type: 'platelet', x: gx * step + jx, y: gy * step + jy, rot: rnd() * 6.283 });
    }
    return out;
  }

  // ── What the eyepiece shows, in words ──────────
  // s = { slide, clipped, light, diaph, eye, obj, z, pos }
  function view(s) {
    const bright = brightness(s.light, s.diaph, s.obj);
    const dark = s.light === 'off' || bright < DARK_BELOW;
    const visible = !!s.slide && !dark;
    const focus = focusWord(s.z, s.obj);
    return { slide: s.slide || null, light: s.light, diaph: s.diaph, eye: s.eye, obj: s.obj, total: total(s.eye, s.obj),
             bright, dark, visible, focus, sharp: visible && focus === 'sharp',
             seen: visible && (focus === 'sharp' || focus === 'near'),
             under: s.slide ? under(s.pos) : null, pos: { x: s.pos.x, y: s.pos.y } };
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

  // ── Discoveries ─────────────────────────────────
  // how = guide tokens (see GUIDES below). scripts/test-labs-microscope.js
  // follows every `how` from a fresh bench and fails if it does not unlock its
  // own card.
  const SETUP = ['rig:scope', 'slide:blood', 'clips', 'light:lamp'];
  const LOW = [...SETUP, 'obj:4', 'lower', 'focus:near', 'focus:sharp'];
  const HIGH = [...LOW, 'obj:40', 'focus:sharp'];
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
  ];

  // ── Hazards: the mistakes that stop the experiment ───
  const SAFETY_EXAM = 'Safety precautions earn marks on the NCE science papers (for example Chemistry 2022 Q5(a)(ii)).';
  const HAZARDS = {
    crack: {
      signs: ['irritant'],
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
        { on: 'rig:scope', say: 'Go to the microscope.', btn: '🔬 Microscope' },
        { on: 'slide:blood', say: 'Put the prepared blood smear on the stage, over the hole where the light comes up.', btn: '🩸 Prepared blood smear' },
        { on: 'clips', say: 'Hold the slide still with the two stage clips.', btn: '📎 Clip the slide' },
        { on: 'light:lamp', say: 'Switch on the lamp in the base.', btn: '💡 Lamp on' },
        { on: 'obj:4', say: 'Turn the nosepiece to the LOW-power objective, ×4. Always start here.', btn: '🔍 ×4 objective' },
        { on: 'lower', say: 'Watching from the SIDE, lower the lens until it is just above the slide.', btn: '⬇️ Lower it, watching from the side' },
        { on: 'focus:near', say: 'Now look through the eyepiece. Turn the COARSE focus so the lens moves UP, away from the slide, until the cells appear.', btn: '⤴️ Coarse focus up' },
        { on: 'focus:sharp', say: 'Turn the FINE focus a little at a time until the cells are sharp.', btn: '🎯 Fine focus' },
      ] },
    { id: 'highpower', icon: '🔬', title: 'Go to high power',
      blurb: 'Focus on low power, switch to ×400 and name your first cell.',
      lesson: 'At ×400 (10 × 40) single cells can be named. The image stayed nearly in focus when you switched, so only the fine focus was needed - the coarse knob at high power loses the image or cracks the slide. The pink disc with a pale centre and no nucleus is a red blood cell.',
      steps: [
        { on: 'rig:scope', say: 'Go to the microscope.', btn: '🔬 Microscope' },
        { on: 'slide:blood', say: 'Put the prepared blood smear on the stage.', btn: '🩸 Prepared blood smear' },
        { on: 'clips', say: 'Clip the slide in place.', btn: '📎 Clip the slide' },
        { on: 'light:lamp', say: 'Switch on the lamp.', btn: '💡 Lamp on' },
        { on: 'obj:4', say: 'Low power first: the ×4 objective.', btn: '🔍 ×4 objective' },
        { on: 'lower', say: 'Watching from the side, lower the lens to just above the slide.', btn: '⬇️ Lower it, watching from the side' },
        { on: 'focus:near', say: 'Looking through the eyepiece, coarse focus UP until the cells appear.', btn: '⤴️ Coarse focus up' },
        { on: 'focus:sharp', say: 'Fine focus until they are sharp.', btn: '🎯 Fine focus' },
        { on: 'obj:40', say: 'Now swing in the HIGH-power objective, ×40. The image should stay nearly in focus.', btn: '🔬 ×40 objective' },
        { on: 'focus:sharp', say: 'Use ONLY the fine focus now, a little at a time.', btn: '🎯 Fine focus' },
        { on: 'id:rbc', say: 'The pointer is on a pink disc, pale in the middle, with no nucleus. Name it.', btn: '🔴 Red blood cell' },
      ] },
    { id: 'hunt', icon: '🧭', title: 'Hunt for white cells',
      blurb: 'At ×400, move the slide to find a phagocyte and a lymphocyte - and draw one.',
      lesson: 'White cells are rare, so you have to move the slide to find them. Both have a nucleus that the stain turns purple: a phagocyte’s is in lobes, a lymphocyte’s is large and round. Phagocytes engulf microbes; lymphocytes make antibodies.',
      steps: [
        { on: 'rig:scope', say: 'Go to the microscope.', btn: '🔬 Microscope' },
        { on: 'slide:blood', say: 'Put the prepared blood smear on the stage.', btn: '🩸 Prepared blood smear' },
        { on: 'clips', say: 'Clip the slide in place.', btn: '📎 Clip the slide' },
        { on: 'light:lamp', say: 'Switch on the lamp.', btn: '💡 Lamp on' },
        { on: 'obj:4', say: 'Low power first: the ×4 objective.', btn: '🔍 ×4 objective' },
        { on: 'lower', say: 'Watching from the side, lower the lens to just above the slide.', btn: '⬇️ Lower it, watching from the side' },
        { on: 'focus:near', say: 'Looking through the eyepiece, coarse focus UP until the cells appear.', btn: '⤴️ Coarse focus up' },
        { on: 'focus:sharp', say: 'Fine focus until they are sharp.', btn: '🎯 Fine focus' },
        { on: 'obj:40', say: 'Swing in the ×40 objective.', btn: '🔬 ×40 objective' },
        { on: 'focus:sharp', say: 'Fine focus only.', btn: '🎯 Fine focus' },
        { on: 'move:left', say: 'Move the slide to the LEFT. Watch which way the cells go.', btn: '◀ Move the slide left' },
        { on: 'id:phago', say: 'A big cell with a purple nucleus in lobes. Name it.', btn: '🟣 Phagocyte' },
        { on: 'draw', say: 'Draw it in your notebook - a good biological drawing.', btn: '✏️ Draw it' },
        { on: 'move:right', say: 'Move the slide to the RIGHT.', btn: '▶ Move the slide right' },
        { on: 'move:right', say: 'And once more to the right.', btn: '▶ Move the slide right' },
        { on: 'id:lympho', say: 'This one is nearly all nucleus - large and round. Name it.', btn: '🔵 Lymphocyte' },
      ] },
    { id: 'measure', icon: '📐', title: 'Measure a drawing',
      blurb: 'Measure a red blood cell drawing with the ruler and find its magnification.',
      lesson: 'Magnification = image size ÷ actual size. The drawing measured 60 mm; the real cell is 8 µm = 0.008 mm; 60 ÷ 0.008 = ×7500. Make the units match first, and write no unit after a magnification.',
      steps: [
        { on: 'rig:measure', say: 'Go to the measuring desk.', btn: '📏 Measure a drawing' },
        { on: 'fig:rbc', say: 'Choose the drawing of a red blood cell. Its real width is 8 µm.', btn: '🔴 Red blood cell drawing' },
        { on: 'ruler:cell', say: 'Lay the ruler across the WHOLE cell, with the 0 on one edge.', btn: '📏 Ruler across the whole cell' },
        { on: 'convert', say: 'The drawing is in mm but the cell is in µm. Make the units match: 8 µm = 8 ÷ 1000 mm.', btn: '🔁 Make the units match' },
        { on: 'divide', say: 'Magnification = image size ÷ actual size.', btn: '➗ Image ÷ actual' },
        { on: 'answer', say: 'Write the answer - no unit after a magnification.', btn: '✅ Write the answer' },
      ] },
    { id: 'paper', icon: '📝', title: 'The ×15 000 question',
      blurb: 'The paper’s hardest sum: a platelet drawn at ×15 000. How big is it in µm?',
      lesson: 'Actual size = image size ÷ magnification = 30 mm ÷ 15 000 = 0.002 mm, and 0.002 mm × 1000 = 2 µm. The drawing is bigger than the platelet, so you divide - and then give the answer in the unit asked for.',
      steps: [
        { on: 'rig:measure', say: 'Go to the measuring desk.', btn: '📏 Measure a drawing' },
        { on: 'fig:platelet', say: 'Choose the platelet drawn at ×15 000.', btn: '🟤 Platelet at ×15 000' },
        { on: 'ruler:cell', say: 'Measure the drawing with the ruler.', btn: '📏 Ruler across the whole cell' },
        { on: 'divide', say: 'Actual size = image size ÷ magnification. Divide by 15 000.', btn: '➗ Image ÷ magnification' },
        { on: 'convert', say: 'That answer is in mm. The question asks for µm: multiply by 1000.', btn: '🔁 mm → µm (× 1000)' },
        { on: 'answer', say: 'Write the answer, with its unit.', btn: '✅ Write the answer' },
      ] },
  ];

  return { EYEPIECES, OBJECTIVES, OBJ, total, FIELD_NUMBER, fieldOfViewMm,
           Z_START, Z_MIN, Z_MAX, COARSE, FINE, FOCUS_AT, WORK_DIST, DEPTH, LOWER_GAP, clearance, blur, focusWord, FOCUS_WORDS, lowerTo, clampZ,
           LIGHTS, DIAPHRAGM, OBJ_LIGHT, DARK_BELOW, brightness, SLIDES, CELLS, CELL_IDS, PLASMA,
           FIELD_UM, FIELD_X, FIELD_Y, POINTER, under, MOVES, move, VIEW_K, viewUm, fieldCells,
           view, scopeDiscoveries, identify, ID_SAY, DRAW,
           UM_PER_MM, mmToUm, umToMm, magnification, actualMm, actualUm, imageMm, same, fmt,
           FIGURES, figure, rulerLen, imageFor, rightAnswer, work, workLines, measureDiscoveries,
           PARTS, COLOURS, DISCOVERIES, HAZARDS, RESULTS, FACTS, MISSIONS, GUIDES };
})();
if (typeof window !== 'undefined') window.LabMicroscopeData = LabMicroscopeData;
