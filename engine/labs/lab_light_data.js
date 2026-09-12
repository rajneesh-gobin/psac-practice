'use strict';
// ══════════════════════════════════════════════
//  Science Labs - the physics behind the Light Bench (NCE Grade 9, P2 Light).
//
//  ⚠ THE PHYSICS LIVES HERE, NOT IN THE ANIMATION. Every ray direction, every
//    angle a protractor can read, every mistake\'s wrong number comes from this
//    file. lab_light.js only scales these results to the canvas and draws them.
//    If a ray looks wrong on screen, fix it HERE.
//  ⚠ Grounded in g9s-p2-light (subjects/grade9-physics/_manifest.js):
//    luminous_objects, light_and_vision, rectilinear_propagation, reflection,
//    laws_of_reflection, ray_diagrams, refraction. Paper shapes from
//    docs/nce-grade9/blueprint-science.md: Physics 2022 Q4 (draw the normal,
//    measure the angle of incidence WITH A PROTRACTOR, draw the refracted ray),
//    Physics 2021 Q2(c) (label the normal), Physics 2021 Q3(b)(i) and 2023 Q2(d)
//    (name the type of error - parallax).
//  ⚠ REFRACTIVE INDEX IS BEYOND THE NCE SYLLABUS (see the header of
//    questions/p2_refraction.js: n = sin i / sin r is Form IV). The bench uses
//    Snell\'s law with n = 1.5 so every angle is TRUE, but a pupil is only ever
//    asked the qualitative facts: towards / away from the normal, smaller /
//    larger angle, no bend along the normal, emergent ray parallel. Anywhere
//    the number 1.5 or a sine is shown, it says "beyond the NCE syllabus".
//  ⚠ Total internal reflection is not in P2 and never happens here: a ray
//    enters a rectangular block through one face and leaves through the
//    opposite one, where the angle inside is always below the critical angle.
//
//  Geometry: canvas-style coordinates (x right, y DOWN), angles in degrees.
//  The ray hits the surface at P = (0, 0). One unit is the thickness of the
//  glass block. beta = where the ray box sits, measured from the vertical;
//  tau = how far the mirror or block is turned (clockwise positive). The
//  signed angle of incidence is beta + tau.
// ══════════════════════════════════════════════
const LabLightData = (() => {
  const N_AIR = 1.0, N_GLASS = 1.5;
  const RAD = Math.PI / 180;

  // Bench limits. A ray box further round than 80° only grazes the surface.
  const LIMITS = { betaMin: 0, betaMax: 80, tauMin: -20, tauMax: 20, maxI: 80, step: 5, tiltStep: 5 };
  // A glass block 11 cm long, 6 cm across: the ray crosses the 6 cm.
  const BLOCK = { thicknessMm: 60, widthMm: 110 };
  const BOX_DIST = 1.35;     // ray box front, in block thicknesses from P
  const RAY_LEN = 2.6;       // how far a ray is drawn after the last surface
  // Parallax on a protractor: its scale sits above the paper, so from the side
  // the ray appears against a mark a few degrees away. Both readings move the
  // same way round the scale.
  const PARALLAX_DEG = 4;
  // Ray-box lamp housing: fully hot after ~20 s on, cool ~45 s after switching
  // off (a real one takes minutes - the bench runs faster so a pupil can wait).
  const HEAT = { riseSec: 20, fallSec: 45, hot: 0.2 };

  // ── Angles ─────────────────────────────────────
  const sin = d => Math.sin(d * RAD), cos = d => Math.cos(d * RAD);
  const asinD = x => Math.asin(Math.max(-1, Math.min(1, x))) / RAD;

  function reflectAngle(i) { return i; }

  // Snell\'s law, n1 sin i = n2 sin r. Keeps the sign of i. Null past the
  // critical angle (never reached on this bench - see the header).
  function refractAngle(i, n1 = N_AIR, n2 = N_GLASS) {
    const s = n1 * sin(Math.abs(i)) / n2;
    if (s > 1 + 1e-12) return null;
    return Math.sign(i || 0) * asinD(s) || 0;
  }
  // Leaving the block through the parallel face: glass → air.
  function emergentAngle(r) { return refractAngle(r, N_GLASS, N_AIR); }
  function criticalAngle() { return asinD(N_AIR / N_GLASS); }
  // Sideways shift of the emergent ray from a parallel-sided block of thickness t.
  function lateralShift(i, t) {
    const a = Math.abs(i), r = Math.abs(refractAngle(a));
    return t * sin(a - r) / cos(r);
  }
  // What a protractor counting from the SURFACE reads for a ray at angle x
  // from the normal: the commonest mistake in the topic.
  function fromSurface(x) { return 90 - Math.abs(x); }
  // A protractor is read to the nearest degree.
  function readAngle(x) { return Math.round(x); }

  // ── Vectors ────────────────────────────────────
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
  const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k];
  const cross = (a, b) => a[0] * b[1] - a[1] * b[0];
  const unit = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
  // Angle in degrees between two directions (0-180).
  const between = (a, b) => Math.acos(Math.max(-1, Math.min(1, dot(unit(a), unit(b))))) / RAD;

  // r = d - 2 (d·n) n
  function reflectDir(d, n) { const k = 2 * dot(d, n); return unit([d[0] - k * n[0], d[1] - k * n[1]]); }
  // Snell in vector form. `n` is the surface normal on the side the ray comes
  // from (so d·n < 0).
  function refractDir(d, n, n1, n2) {
    const eta = n1 / n2, ci = -dot(d, n);
    const k = 1 - eta * eta * (1 - ci * ci);
    if (k < 0) return null;
    return unit(add([d[0] * eta, d[1] * eta], n, eta * ci - Math.sqrt(k)));
  }

  function frame(beta, tau) {
    return {
      d: [sin(beta), cos(beta)],        // from the ray box towards P
      n: [sin(tau), -cos(tau)],         // the normal, on the ray box\'s side
      s: [cos(tau), sin(tau)],          // along the surface
    };
  }

  // Everything the bench draws for a mirror or a block, in block-thickness
  // units with P at the origin.
  //   o = { setup: 'mirror'|'block', beta, tau, lifted }
  function trace(o) {
    const { d, n, s } = frame(o.beta, o.tau);
    const P = [0, 0];
    const i = o.beta + o.tau;
    const box = add(P, d, -BOX_DIST);
    const out = { i: Math.abs(i), signedI: i, d, n, s, P, box, segs: [[box, P]] };
    if (o.setup === 'mirror') {
      const rd = reflectDir(d, n);
      out.out = rd;
      out.r = between(rd, n);
      out.segs.push([P, add(P, rd, RAY_LEN)]);
      return out;
    }
    if (o.setup === 'block' && !o.lifted) {
      const t = refractDir(d, n, N_AIR, N_GLASS);
      const down = [-n[0], -n[1]];
      const Q = add(P, t, 1 / dot(t, down));           // where it reaches the far face
      const e = refractDir(t, n, N_GLASS, N_AIR);       // the far face\'s normal on the glass side is n
      out.inside = t; out.Q = Q; out.out = e;
      out.r = between(t, down);
      out.e = between(e, down);
      out.shift = Math.abs(cross(add(Q, P, -1), d));   // distance from Q to the incident line
      out.segs.push([P, Q], [Q, add(Q, e, RAY_LEN)]);
      return out;
    }
    // Nothing to hit (or the block lifted off): straight on.
    out.out = d;
    out.segs.push([P, add(P, d, RAY_LEN + 1)]);
    return out;
  }

  // What the pupil\'s protractor reading comes out as.
  //   o = { setup, beta, tau, ref: 'normal'|'surface', eye: 'above'|'side' }
  function reading(o) {
    const i = Math.abs(o.beta + o.tau);
    const r = o.setup === 'mirror' ? reflectAngle(i) : Math.abs(refractAngle(i));
    let si = i, sr = r;
    const faults = [];
    if (o.ref === 'surface') { si = fromSurface(i); sr = fromSurface(r); faults.push('surface'); }
    if (o.eye === 'side') {
      // A mirror\'s two rays sit either side of ONE normal, so a shifted scale
      // pushes one reading up and the other down; a block\'s rays sit on
      // opposite halves of the circle and both move the same way.
      si += PARALLAX_DEG;
      sr += o.setup === 'mirror' ? -PARALLAX_DEG : PARALLAX_DEG;
      faults.push('parallax');
    }
    return { setup: o.setup, trueI: i, trueR: r, i: readAngle(si), r: readAngle(sr),
             e: o.setup === 'block' ? readAngle(Math.abs(emergentAngle(r))) : null,
             ok: !faults.length, faults };
  }

  // ── Three cards with holes ─────────────────────
  // Light reaches the far end only if every hole is on the one straight line.
  function cardsPath(aligned) { return aligned ? 'through' : 'blocked'; }

  // ── The shelf ─────────────────────────────────
  // `grades` as everywhere in this file: untagged = the original Grade 9 level.
  const SETUPS = {
    mirror: { icon: '🪞', name: 'Plane mirror', meta: 'On a sheet of paper' },
    block:  { icon: '🧊', name: 'Glass block', meta: 'Rectangular · 11 × 6 cm' },
    cards:  { icon: '🕳️', name: 'Three cards with holes', meta: 'Rectilinear propagation', meta4: 'Does light go in straight lines?', grades: [4, 9] },
    shadow: { icon: '🌑', name: 'Shadow bench', meta: 'Torch, holder and a white screen', grades: [4] },
    bounce: { icon: '🪞', name: 'Safety mirror', meta: 'Plastic, with smooth edges', grades: [4] },
    cracked:{ icon: '💔', name: 'Old cracked mirror', meta: 'Found at the back of a cupboard', grades: [4], hazard: 'g4_sharp' },
  };
  const SOURCES = {
    raybox: { icon: '🔦', name: 'Ray box', meta: '12 V lamp · gets hot', short: 'Ray box', hot: true },
    laser:  { icon: '🔴', name: 'Laser pointer', meta: 'Class 2 · never look into it', short: 'Laser', laser: true },
    torch:  { icon: '🔦', name: 'Torch', meta: 'Battery torch · very bright', short: 'Torch', sign: 'eye', grades: [4] },
    lamp:   { icon: '💡', name: 'Desk lamp', meta: 'Old bulb · gets hot', short: 'Lamp', hot: true, sign: 'hot', grades: [4] },
  };

  // ── Discoveries ────────────────────────────────
  // A FOUND card shows `saw`, the `formula` and `learn` (and `exam`); a LOCKED
  // card shows `how` as steps, and "Show me how" runs them as a guide.
  // scripts/test-labs-light.js follows every `how` and fails if any does not
  // actually unlock its card.
  // Tokens: setup:<id> source:<id> power:on|off normal protractor:normal|surface
  //         eye:above|side angle:<deg> tilt:<deg> read look cards:move|align
  //         lift cool pack
  const M = 'setup:mirror', B = 'setup:block', C = 'setup:cards', ON = 'power:on', OFF = 'power:off',
        NORM = 'normal', PROT = 'protractor:normal', READ = 'read';
  const DISCOVERIES = [
    { id: 'beam', icon: '🔦', title: 'A ray of light', hint: 'Switch on the ray box',
      how: [M, ON],
      saw: 'A narrow, straight beam of light from the ray box to the mirror - and a second straight beam bouncing off it.',
      learn: 'A ray box passes light from a lamp through a narrow slit to make a single ray. In a ray diagram a ray is drawn as a straight line with an arrow showing which way the light travels.' },
    { id: 'normal', icon: '📏', title: 'The normal', hint: 'The most important line in a ray diagram',
      how: [M, NORM],
      saw: 'A dashed line at 90° to the mirror, through the point where the ray hits it.',
      formula: 'normal ⟂ surface (at 90°)',
      learn: 'The normal is a construction line: drawn dashed, at right angles to the surface, at the point where the ray strikes. Every angle in a ray diagram is measured from it.',
      exam: 'Physics 2022 Q4(a) asks you to draw the normal; Physics 2021 Q2(c) asks you to label it.' },
    { id: 'law_reflection', icon: '🪞', title: 'Angle in = angle out', hint: 'Measure both angles at a mirror',
      how: [M, ON, NORM, PROT, READ],
      saw: 'Your protractor read the same angle for the incident ray and for the reflected ray, both counted from the normal.',
      formula: 'angle of incidence i = angle of reflection r',
      learn: 'The laws of reflection: (1) the angle of incidence equals the angle of reflection; (2) the incident ray, the reflected ray and the normal all lie in the same plane.',
      exam: 'Physics 2022 Q4(b): measure an angle with the protractor - always from the normal.' },
    { id: 'three_angles', icon: '📊', title: 'Every angle obeys', hint: 'Measure at three different angles',
      how: [M, ON, NORM, PROT, 'angle:20', READ, 'angle:40', READ, 'angle:60', READ],
      saw: 'Three different angles of incidence, and every time the angle of reflection matched it.',
      formula: 'i = r at every angle',
      learn: 'One reading could be luck. Repeating at several angles and getting i = r every time is how you show the law holds - that is what a results table is for.' },
    { id: 'along_normal', icon: '↩️', title: 'Straight back', hint: 'Aim the ray along the normal',
      how: [M, ON, 'angle:0'],
      saw: 'With the ray box straight in front of the mirror, the ray went back along exactly the path it came in on.',
      formula: 'i = 0°  →  r = 0°',
      learn: 'A ray along the normal has an angle of incidence of 0°, so its angle of reflection is 0° too: it is reflected straight back on itself.' },
    { id: 'turn_mirror', icon: '🔄', title: 'Turn the mirror', hint: 'Tilt the mirror and watch the reflected ray',
      how: [M, ON, 'tilt:10'],
      saw: 'Turning the mirror by 10° swung the reflected ray round by 20°.',
      formula: 'mirror turns θ  →  reflected ray turns 2θ (beyond the NCE syllabus)',
      learn: 'Turning the mirror turns the normal with it, so the angle of incidence changes by θ - and the angle of reflection by θ as well. Together the reflected ray moves twice as far. (A good extra; beyond the NCE syllabus.)' },
    { id: 'refract_in', icon: '🧊', title: 'Bent towards the normal', hint: 'Measure the angles at a glass block',
      how: [B, ON, NORM, PROT, READ],
      saw: 'Inside the glass the ray was closer to the normal: the angle of refraction was smaller than the angle of incidence.',
      formula: 'air → glass: r < i (bends towards the normal)',
      learn: 'Refraction is the bending of light as it passes from one medium into another. Light slows down in glass, so it bends TOWARDS the normal on the way in, and AWAY from the normal on the way out.',
      exam: 'Physics 2022 Q4(c)(i): draw the refracted ray - bent towards the normal inside the glass.' },
    { id: 'block_straight', icon: '⬇️', title: 'No bend along the normal', hint: 'Aim the ray straight into the glass',
      how: [B, ON, 'angle:0'],
      saw: 'A ray going in along the normal went straight through the block without bending at all.',
      formula: 'i = 0°  →  r = 0° (no bending)',
      learn: 'The light still slows down in the glass, but a ray along the normal meets the surface square on, so it does not change direction. Refraction is a change of speed first, and a bend only when the ray arrives at an angle.' },
    { id: 'parallel_out', icon: '⏸️', title: 'Out parallel', hint: 'Trace the ray, then lift the block',
      how: [B, ON, 'lift'],
      saw: 'With the block lifted off, your pencil trace showed the ray leaving the block parallel to the ray that went in - but shifted sideways.',
      formula: 'emergent ray ∥ incident ray (laterally displaced)',
      learn: 'The ray bends towards the normal going in and by exactly the same amount away from the normal coming out. The two faces of a rectangular block are parallel, so the ray leaves in its original direction, displaced sideways.' },
    { id: 'refract_angles', icon: '📈', title: 'Bigger in, bigger bend', hint: 'Measure refraction at three angles',
      how: [B, ON, NORM, PROT, 'angle:20', READ, 'angle:40', READ, 'angle:60', READ],
      saw: 'The bigger the angle of incidence, the bigger the angle of refraction - but it was always the smaller of the two.',
      formula: 'sin i ÷ sin r = 1.5 for glass - the refractive index (beyond the NCE syllabus)',
      learn: 'For every angle, r is smaller than i when light enters glass. The exact rule, sin i ÷ sin r = 1.5, is the refractive index of glass: you will meet it in Form IV. At Grade 9, say which way it bends and whether the angle gets bigger or smaller.' },
    { id: 'straight_line', icon: '📐', title: 'Light travels in straight lines', hint: 'Look through three holes in a row',
      how: [C, ON, 'look'],
      saw: 'With the three holes in a straight line you could see the lamp through them.',
      learn: 'Light travels in straight lines in a uniform medium. The holes had to be exactly in line - you can check by threading a string through them and pulling it tight.',
      exam: 'NCE P2: devise an experiment to show light travels in straight lines - three cards with holes, lined up with a string, and a lamp.' },
    { id: 'blocked', icon: '🚧', title: 'Out of line, out of sight', hint: 'Move one card, then look again',
      how: [C, ON, 'cards:move', 'look'],
      saw: 'With the middle card moved to one side, the lamp disappeared. The light stopped on the card.',
      learn: 'Light cannot bend round the card to reach your eye, because it only travels in straight lines. The same idea explains shadows.' },
    { id: 'luminous', icon: '🌑', title: 'Luminous or non-luminous?', hint: 'Look through with the lamp switched off',
      how: [C, OFF, 'look'],
      saw: 'With the lamp switched off you saw nothing at all - not even the cards right in front of you.',
      learn: 'The lamp is LUMINOUS: it gives out its own light. The cards are NON-LUMINOUS: you only see them when light from a luminous source bounces off them into your eyes. With no light, there is nothing to see - light is needed for vision.' },
    { id: 'laser_spot', icon: '🔴', title: 'A laser, the safe way', hint: 'Shine a laser through the holes onto the screen',
      how: [C, 'source:laser', ON],
      saw: 'A bright red spot on the white screen at the end - the laser beam went straight through all three holes.',
      learn: 'A laser beam is so narrow that you can see it travel in a straight line. You look at the spot it makes on a screen - never along the beam itself.' },
    { id: 'safe_pack', icon: '🧤', title: 'Handle it cool', hint: 'Pack the ray box away safely',
      how: [M, ON, OFF, 'cool', 'pack'],
      saw: 'You switched the ray box off, let the lamp housing cool, then packed it away by its base.',
      learn: 'A filament lamp turns most of its electrical energy into heat, not light, so the housing gets hot. Switch off, let it cool, and hold it by the base.' },
  ];

  // ── Hazards: the mistakes that stop the experiment ───
  const HAZARDS = {
    laser_eye: {
      signs: ['eye'], fx: 'flash',
      title: () => 'Stop - never look along a laser beam',
      happened: () => 'You put your eye to the holes with a laser pointer behind them. The holes were in line, so the beam went straight through all three - and straight into your eye.',
      why: 'A laser beam does not spread out, so all of its energy lands on one tiny spot at the back of your eye (the retina). Even a school laser pointer can damage it permanently in less than a second - and a laser beam bounced off a mirror is just as dangerous.',
      instead: 'Only look through the holes when the light is an ordinary lamp. With a laser, look at the spot it makes on a white screen at the end. Never point a laser at anyone\'s face.',
      exam: 'A safety precaution is asked on the NCE science papers (for example Chemistry 2022 Q5(a)(ii)). For a light experiment: never look directly into a laser beam or a bright lamp - view the beam on a screen.',
    },
    hot_lamp: {
      signs: ['hot'], fx: 'burn',
      title: () => 'Ouch - the lamp housing is hot',
      happened: () => 'You picked up the ray box by its lamp end straight after switching it off. The bulb had been on for a while, and the metal round it was hot enough to burn your fingers.',
      why: 'A ray-box bulb turns most of its electrical energy into heat, not light. The housing stays hot for several minutes after it has been switched off.',
      instead: 'Switch off, wait for the ray box to cool, then lift it by its base. While it is on, turn it by the base too - never by the lamp end.',
      exam: 'A filament lamp wastes most of its energy as heat (P3 Energy). Safety precaution: let the ray box cool before handling it.',
    },
  };

  // ── Wrong but safe: the mistakes that give a wrong number ───
  const RESULTS = {
    surface: {
      icon: '📐',
      title: c => c.setup === 'mirror' ? 'You measured from the mirror, not the normal' : 'You measured from the glass surface, not the normal',
      happened: c => `Your protractor counted from the ${c.setup === 'mirror' ? 'mirror' : 'surface of the block'}, so it read ${c.i}° for the angle of incidence. The real angle of incidence is ${c.trueI}°, because angles in a ray diagram are always measured from the normal: 90° − ${c.trueI}° = ${c.i}°.${c.setup === 'mirror' ? ' (Both your readings were wrong by the same amount, so they still looked equal - that is why this mistake is so easy to miss.)' : ''}`,
      instead: 'Draw the normal first: a dashed line at 90° to the surface where the ray hits it. Put the protractor\'s centre on that point and count from the normal - 0° along the normal.',
      exam: 'Physics 2022 Q4(b): measure the angle of incidence with the protractor, from the normal. If a question gives the angle between the ray and the SURFACE, the angle of incidence is 90° minus it.',
    },
    parallax: {
      icon: '👁️',
      title: () => 'Parallax error - your eye was not in line',
      happened: c => `Looking at the protractor from the side, the ray seemed to cross the scale at ${c.i}° instead of ${c.trueI}°${c.setup === 'mirror' ? `, and the reflected ray at ${c.r}° instead of ${c.trueR}°. The law of reflection did not break - your eye did` : ''}. The scale sits a little above the paper, so from an angle each line appears against the wrong mark.`,
      instead: 'Put your eye directly above the mark you are reading, looking straight down at the scale. Then read to the nearest degree.',
      exam: 'Name the type of error: parallax error, caused by the eye not being in line with the scale (Physics 2021 Q3(b)(i), Physics 2023 Q2(d)).',
    },
  };

  const SIGN_LABELS = { eye: 'Bright light', hot: 'Hot surface', sharp: 'Sharp - can cut' };

  // Short, true facts for the 💡 button, tied to P2.
  const FACTS = [
    'The Sun and the other stars are luminous: they make their own light. The Moon and the planets are non-luminous - we see them because they reflect sunlight.',
    'You see a non-luminous object, like this page, because light from a luminous source bounces off it into your eyes.',
    'Light travels at about 300 000 km every second - fast enough to go round the Earth more than 7 times in one second.',
    'Sunlight takes about 8 minutes to reach the Earth.',
    'Shadows form because light travels in straight lines and cannot bend round the object in its way.',
    'A plane-mirror image is upright, the same size as the object, as far behind the mirror as the object is in front, and laterally inverted - left and right swapped.',
    'AMBULANCE is written back to front on the front of an ambulance, so drivers ahead read it the right way round in their mirror.',
    'A pencil standing in a glass of water looks bent at the surface. That is refraction (Physics 2021 Q1(i)).',
    'A swimming pool looks shallower than it really is: light from the bottom bends away from the normal as it leaves the water.',
    'In glass, light slows to about two-thirds of its speed in air. That change of speed is what makes it bend.',
    'A periscope uses two plane mirrors, each at 45°, to let you see over a wall.',
    'Optical fibres carry light along thin glass threads by reflecting it again and again off the inside wall - used in endoscopes and internet cables.',
    'Ray experiments work best in a dim room: the ray on the paper is much easier to see and to mark.',
  ];

  // ── Missions ──
  // A question\'s FIRST option is the answer; the quiz shuffles them.
  const MISSIONS = [
    {
      id: 'law', icon: '🪞', title: 'Prove the law of reflection', setup: 'mirror',
      blurb: 'Measure i and r at three different angles, from the normal, then answer the paper questions.',
      intro: 'Prove the law of reflection! Switch on the ray box, draw the normal, place the protractor - then measure i and r at THREE different angles.',
      quiz: [
        { q: 'A ray strikes a plane mirror with an angle of incidence of 35°. What is the angle of reflection?',
          options: ['35°', '55°', '70°', '145°'],
          why: 'Angle of incidence = angle of reflection, both measured from the normal.' },
        { q: 'The angle between an incident ray and the MIRROR is 50°. What is the angle of incidence?',
          options: ['40°', '50°', '90°', '130°'],
          why: 'The angle of incidence is measured from the normal, which is at 90° to the mirror: 90° − 50° = 40°.' },
        { q: 'What is the normal in a ray diagram?',
          options: ['A line at 90° to the surface where the ray hits it', 'The ray that leaves the mirror', 'The line of the mirror surface', 'Any straight line drawn with a ruler'],
          why: 'The normal is a construction line, drawn dashed, perpendicular to the surface at the point of incidence (Physics 2022 Q4(a), Physics 2021 Q2(c)).' },
        { q: 'Which of these is one of the laws of reflection?',
          options: ['The incident ray, the reflected ray and the normal lie in the same plane', 'The angle of incidence is measured from the mirror', 'The reflected ray is always at 90° to the mirror', 'Light slows down when it is reflected'],
          why: 'The two laws: i = r, and the incident ray, reflected ray and normal all lie in one plane.' },
        { q: 'A pupil reads the protractor with her eye to one side of the scale. What type of error is this?',
          options: ['Parallax error', 'Zero error', 'An error in the law of reflection', 'A calculation error'],
          why: 'Parallax error comes from the eye not being in line with the scale (Physics 2021 Q3(b)(i)). Look straight down at the mark.' },
        { q: 'A ray hits the mirror along the normal. Where does it go?',
          options: ['Straight back along its own path', 'Along the surface of the mirror', 'Off at 90° to its path', 'Through the mirror'],
          why: 'Along the normal, i = 0°, so r = 0°: the ray is reflected straight back on itself.' },
      ],
    },
    {
      id: 'bend', icon: '🧊', title: 'Bend the beam', setup: 'block',
      blurb: 'Send a ray through a glass block at 0° and two other angles, trace it, then answer the paper questions.',
      intro: 'Bend the beam! Measure i and r at 0° and at two other angles, then trace the ray and lift the block to see where it comes out.',
      quiz: [
        { q: 'A ray passes at an angle from air into glass. Which way does it bend?',
          options: ['Towards the normal', 'Away from the normal', 'It does not bend', 'Along the surface of the glass'],
          why: 'Light slows down entering glass, so it bends towards the normal: the angle of refraction is smaller than the angle of incidence.' },
        { q: 'A ray enters a glass block along the normal (angle of incidence 0°). What happens?',
          options: ['It goes straight through without bending', 'It bends towards the normal', 'It bends away from the normal', 'It is reflected straight back'],
          why: 'It still slows down, but meeting the surface square on it does not change direction.' },
        { q: 'How does the ray leaving a rectangular glass block compare with the ray that went in?',
          options: ['It is parallel to it, but shifted sideways', 'It is at 90° to it', 'It carries on along exactly the same line', 'It bends back towards the ray box'],
          why: 'It bends in by the same amount it bends out, and the faces are parallel, so it leaves parallel to the incident ray - laterally displaced.' },
        { q: 'Why does light bend when it passes from air into glass?',
          options: ['It slows down in the glass', 'The glass reflects it', 'It speeds up in the glass', 'The glass absorbs some colours'],
          why: 'Refraction is caused by the change of speed between two media.' },
        { q: 'In your experiment the angle of incidence in air was 40°. Which could be the angle of refraction in the glass?',
          options: ['25°', '40°', '55°', '90°'],
          why: 'Entering glass the ray bends towards the normal, so r must be smaller than 40°. (The bench measured 25°.)' },
        { q: 'What is the bending of light as it passes from one medium into another called?',
          options: ['Refraction', 'Reflection', 'Dispersion', 'Absorption'],
          why: 'Refraction. Reflection is bouncing off a surface; dispersion is white light splitting into colours.' },
      ],
    },
  ];

  // ── Guided experiments: "I landed here - what do I do?" ──
  // One action per step, in the discovery tokens above. A step with `btn` gets
  // a button in the yellow box that does it; the matching control glows. A
  // step with no button (`cool`) waits for the bench.
  const GUIDES = [
    { id: 'reflect', icon: '🪞', title: 'Bounce a beam off a mirror',
      blurb: 'Shine a ray at a mirror and measure both angles from the normal.',
      lesson: 'The angle of incidence equals the angle of reflection - and both are measured from the NORMAL, the dashed line at 90° to the mirror. That is the law of reflection.',
      steps: [
        { on: 'setup:mirror',      say: 'Tap 🪞 Place the plane mirror on the bench.' },
        { on: 'power:on',          say: 'Tap 💡 Switch on the ray box — watch the ray hit the mirror and bounce off.' },
        { on: 'normal',            say: 'Tap 📏 Draw the normal — a dashed line at 90° to the mirror at the point of incidence.' },
        { on: 'protractor:normal', say: 'Tap 📐 Place the protractor — centre it where the ray hits, counting from the normal.' },
        { on: 'read',              say: 'Tap 📝 Read the angles — angle of incidence and angle of reflection.' },
        { on: 'angle:50',          say: 'Tap ↻ Turn the ray box to 50° — set the angle of incidence to 50°.' },
        { on: 'read',              say: 'Tap 📝 Read the angles again — are they still equal?' },
      ] },
    { id: 'bend', icon: '🧊', title: 'Bend a beam with glass',
      blurb: 'Shine a ray through a glass block and find out which way it bends.',
      lesson: 'Entering glass, light slows down and bends TOWARDS the normal: r is smaller than i. Leaving, it bends AWAY from the normal. From a rectangular block it comes out parallel to the ray that went in, shifted sideways.',
      steps: [
        { on: 'setup:block',       say: 'Tap 🧊 Place the glass block on the bench.' },
        { on: 'power:on',          say: 'Tap 💡 Switch on the ray box.' },
        { on: 'angle:40',          say: 'Tap ↻ Turn the ray box to 40° — the ray meets the block at 40° to the normal.' },
        { on: 'normal',            say: 'Tap 📏 Draw the normals — one where the ray goes in, one where it comes out.' },
        { on: 'protractor:normal', say: 'Tap 📐 Place the protractor at the entry point, counting from the normal.' },
        { on: 'read',              say: 'Tap 📝 Read the angles — which is smaller: air or glass?' },
        { on: 'lift',              say: 'Tap 🧊 Trace & lift the block — mark the rays then lift the block to see the path.' },
      ] },
    { id: 'straight', icon: '🕳️', title: 'Does light travel in straight lines?',
      blurb: 'Line up three cards with holes and look for the lamp.',
      lesson: 'You saw the lamp only when all three holes were in one straight line. Light travels in straight lines in a uniform medium - it cannot bend round a card to reach your eye.',
      steps: [
        { on: 'setup:cards',       say: 'Tap 🕳️ Set up the three cards — stand them with holes in a row, lamp behind.' },
        { on: 'power:on',          say: 'Tap 💡 Switch on the lamp.' },
        { on: 'look',              say: 'Tap 👁️ Look through the holes — can you see the lamp?' },
        { on: 'cards:move',        say: 'Tap ↔ Move the middle card slightly to one side.' },
        { on: 'look',              say: 'Tap 👁️ Look through the holes again.' },
      ] },
  ];

  // ══════════════════════════════════════════════
  //  GRADE 4 (PSAC) - light and shadows
  //
  //  ⚠ Grounded in subjects/grade4-science:
  //    g4sci-materials - "transparent/opaque"; g4s-mat-001 (glass is
  //    transparent), g4s-mat-004 (opaque: wood, stone, metal, cardboard;
  //    translucent: frosted glass, tracing paper), g4s-mat-011 (frosted glass
  //    is translucent), g4sc-mat-052/053 (the three words defined);
  //    g4sci-energy - light is a form of energy, the Sun is a source, and a
  //    torch changes electrical energy into light (g4sc-energy-002).
  //  ⚠ Shadows through the day (the Sun\'s height) are GRADE 6 (g6sc-hd-059),
  //    not Grade 4, so they are not here. No angles, no protractor, no
  //    refraction at Grade 4: the mirror obeys the same law (trace() above)
  //    but no angle is ever shown.
  //  ⚠ The Materials Tester already sorts materials with a torch. This level
  //    is about LIGHT: shadows (how dark, how big, what shape), straight lines
  //    and a mirror bounce.
  // ══════════════════════════════════════════════
  const GRADES = [4, 9];
  const LEVELS = {
    4: { eyebrow: 'Science · Grade 4', setup: 'shadow', source: 'torch' },
    9: { eyebrow: 'Physics · Grade 9', setup: 'mirror', source: 'raybox' },
  };

  // What goes in the holder. Every one stands 5 cm tall.
  const OBJECTS = {
    card:    { icon: '🌳', name: 'Card tree',       light: 'opaque',      shape: 'tree' },
    book:    { icon: '📕', name: 'Book',            light: 'opaque',      shape: 'block' },
    wood:    { icon: '🪵', name: 'Wooden block',    light: 'opaque',      shape: 'block' },
    glass:   { icon: '🪟', name: 'Glass sheet',     light: 'transparent', shape: 'block' },
    tracing: { icon: '📄', name: 'Tracing paper',   light: 'translucent', shape: 'block' },
    frosted: { icon: '🥛', name: 'Frosted plastic', light: 'translucent', shape: 'block' },
  };
  // `through`: how much of the light reaches the screen behind it - used only
  // to shade the drawing (clear glass passes about 90%).
  const LIGHT_WORDS = {
    transparent: { shadow: 'almost no shadow',     lets: 'Light goes through. You can see through it clearly.', through: 0.9 },
    translucent: { shadow: 'a pale, fuzzy shadow', lets: 'Some light goes through. Things look blurry.',        through: 0.45 },
    opaque:      { shadow: 'a dark shadow',        lets: 'No light goes through. It blocks the light.',         through: 0 },
  };
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

  // Side view along a table, in cm from the torch\'s start line. A small torch
  // lies on the table and shines along it, so every shadow starts at the
  // table. Similar triangles: shadow = object × (torch→screen) ÷ (torch→object).
  // A Grade 4 child reads a 30 cm ruler to the nearest cm. No position gives a
  // 15 cm shadow, so an upside-down ruler never reads the right number by luck.
  const SHADOW = { objCm: 5, screenAt: 60, rulerCm: 30, positions: [10, 12, 15, 25, 30, 50], start: 15,
                   torchAt: { front: 0, back: -10 } };
  function shadowCm(objAt, torch) {
    const t = SHADOW.torchAt[torch || 'front'];
    return SHADOW.objCm * (SHADOW.screenAt - t) / (objAt - t);
  }
  //   ruler: 'zero' (0 at the bottom of the shadow) | 'flip' (30 at the bottom)
  function readShadow(objAt, torch, ruler) {
    const trueCm = shadowCm(objAt, torch), realCm = Math.round(trueCm);
    const flip = ruler === 'flip';
    return { trueCm, realCm, cm: flip ? SHADOW.rulerCm - realCm : realCm, ok: !flip };
  }

  // Top view: the torch shines at a mirror standing on the table, 30° from
  // straight on; the light bounces onto the wall (wallY block-units away).
  // The teddy sits where the light lands with the mirror turned 10°.
  const BOUNCE = { beta: 30, target: 10, wallY: -1.6, hitWidth: 0.15 };
  function bounceSpot(tau) {
    const t = trace({ setup: 'mirror', beta: BOUNCE.beta, tau });
    if (t.out[1] >= 0) return null;
    return t.out[0] * (BOUNCE.wallY / t.out[1]);
  }
  function bounceHits(tau) {
    const x = bounceSpot(tau), X = bounceSpot(BOUNCE.target);
    return x !== null && Math.abs(x - X) < BOUNCE.hitWidth;
  }

  const S4 = 'setup:shadow', ON4 = 'power:on';
  const G4_DISCOVERIES = [
    { id: 'g4_source', icon: '🔦', title: 'A light source', hint: 'Switch on the torch',
      how: [S4, ON4],
      saw: 'The torch lit up the white screen. It gives out its own light.',
      learn: 'A light source gives out its own light. The Sun, a torch and a lamp are light sources. A torch changes electrical energy from its batteries into light.' },
    { id: 'g4_shadow', icon: '🌑', title: 'A dark shadow', hint: 'Shine the torch at the book',
      how: [S4, 'obj:book', ON4],
      saw: 'The book stopped the light. A dark shadow appeared on the screen.',
      formula: 'opaque → a dark shadow',
      learn: 'The book is opaque: no light goes through it. A shadow is the dark place where the light cannot reach.' },
    { id: 'g4_shape', icon: '🌳', title: 'Same shape', hint: 'Look at the card tree\'s shadow',
      how: [S4, 'obj:card', ON4],
      saw: 'The shadow had the same shape as the card tree.',
      learn: 'Light goes past the edges of the tree, but not through it. So the shadow copies the shape of the object.' },
    { id: 'g4_pale', icon: '📄', title: 'A pale shadow', hint: 'Shine the torch at the tracing paper',
      how: [S4, 'obj:tracing', ON4],
      saw: 'The tracing paper made a pale, fuzzy shadow. Some light got through.',
      formula: 'translucent → a pale shadow',
      learn: 'Tracing paper is translucent. It lets some light through, but you cannot see clearly through it. Frosted plastic is translucent too.' },
    { id: 'g4_clear', icon: '🪟', title: 'Almost no shadow', hint: 'Shine the torch at the glass sheet',
      how: [S4, 'obj:glass', ON4],
      saw: 'The glass sheet hardly made a shadow. The light went straight through.',
      formula: 'transparent → almost no shadow',
      learn: 'Glass is transparent. Light goes through it, so you can see through it clearly. That is why windows are made of glass.' },
    { id: 'g4_no_light', icon: '🌚', title: 'No light, no shadow', hint: 'Switch the torch off with the tree in place',
      how: [S4, 'obj:card', ON4, 'power:off'],
      saw: 'When the torch went off, the shadow went too.',
      learn: 'A shadow needs light. With no light, everything is dark, so there is no shadow to see.' },
    { id: 'g4_words', icon: '🔤', title: 'Name all three', hint: 'Name glass, tracing paper and wood',
      how: [S4, ON4, 'obj:glass', 'name:transparent', 'obj:tracing', 'name:translucent', 'obj:wood', 'name:opaque'],
      saw: 'You named a transparent, a translucent and an opaque material from their shadows.',
      formula: 'no shadow: transparent · pale shadow: translucent · dark shadow: opaque',
      learn: 'The shadow tells you the word. The more light a material blocks, the darker its shadow.' },
    { id: 'g4_measure', icon: '📏', title: 'Measure a shadow', hint: 'Use the ruler on the screen',
      how: [S4, 'obj:card', ON4, 'ruler:zero', 'measure'],
      saw: 'You measured the card tree\'s shadow with the 0 of the ruler at the bottom.',
      learn: 'Put the 0 at the bottom of the shadow and read the number at the top. The tree is only 5 cm tall, but its shadow can be much taller.' },
    { id: 'g4_bigger', icon: '⬆️', title: 'Nearer means bigger', hint: 'Measure, move the tree nearer the torch, measure again',
      how: [S4, 'obj:card', ON4, 'measure', 'pos:10', 'measure'],
      saw: 'You moved the card tree nearer the torch. Its shadow got bigger.',
      formula: 'nearer the torch → a bigger shadow',
      learn: 'Light spreads out from the torch. Near the torch, the tree blocks a wide part of it, so the shadow is big.' },
    { id: 'g4_smaller', icon: '⬇️', title: 'Further means smaller', hint: 'Measure, move the tree away from the torch, measure again',
      how: [S4, 'obj:card', ON4, 'measure', 'pos:50', 'measure'],
      saw: 'You moved the card tree away from the torch. Its shadow got smaller.',
      formula: 'further from the torch → a smaller shadow',
      learn: 'Far from the torch, the tree blocks only a thin part of the spreading light. So the shadow is small.' },
    { id: 'g4_fair', icon: '⚖️', title: 'A fair test', hint: 'Measure at three places, torch kept still',
      how: [S4, 'obj:card', ON4, 'pos:10', 'measure', 'pos:25', 'measure', 'pos:50', 'measure'],
      saw: 'Three measurements at three places. You moved only the card tree, never the torch.',
      learn: 'A fair test changes one thing and keeps everything else the same. Then you know what made the difference.' },
    { id: 'g4_straight', icon: '📐', title: 'Light goes straight', hint: 'Shine the torch through three holes',
      how: ['setup:cards', ON4, 'look'],
      saw: 'With the three holes in a straight line, a spot of light reached the screen.',
      learn: 'Light travels in straight lines. It went straight through all three holes.' },
    { id: 'g4_blocked', icon: '🚧', title: 'Out of line', hint: 'Move one card, then look at the screen',
      how: ['setup:cards', ON4, 'cards:move', 'look'],
      saw: 'With the middle card moved, the spot on the screen went out. The light stopped on the card.',
      learn: 'Light cannot bend round the card. That is also why shadows form.' },
    { id: 'g4_bounce', icon: '🪞', title: 'Light bounces', hint: 'Shine the torch at the mirror',
      how: ['setup:bounce', ON4],
      saw: 'The light hit the mirror and bounced off onto the wall.',
      learn: 'A mirror is very smooth and shiny, so light bounces off it. This is called reflection.' },
    { id: 'g4_target', icon: '🧸', title: 'Light up the teddy', hint: 'Turn the mirror to aim the light',
      how: ['setup:bounce', ON4, 'tilt:' + BOUNCE.target],
      saw: 'You turned the mirror, and the bounced light landed on the teddy.',
      learn: 'Turning the mirror changes where the light bounces. Mirrors can send light into a dark corner.' },
    { id: 'g4_safe_pack', icon: '🧤', title: 'Cool before you carry', hint: 'Pack the desk lamp away safely',
      how: [S4, 'source:lamp', ON4, 'power:off', 'cool', 'pack'],
      saw: 'You switched the lamp off, let it cool, then packed it away by its base.',
      learn: 'A bulb gives out heat as well as light. Let it cool before anyone touches it.' },
  ];

  const G4_HAZARDS = {
    g4_eye: {
      signs: ['eye'], fx: 'flash',
      title: () => 'Stop - never stare into a bright light',
      happened: c => `You looked straight into the ${c.src || 'torch'}. The bright light went right into your eyes. Now you see blurry spots.`,
      why: 'A bright torch can hurt the back of your eye. The Sun is much brighter still. It can harm your eyes for ever.',
      instead: 'Look at the light on the screen, never into the torch. Never look at the Sun, even with sunglasses.',
      exam: 'Staying safe with light: never look straight at the Sun or a bright torch. Look at where the light lands.',
    },
    g4_hot: {
      signs: ['hot'], fx: 'burn',
      title: () => 'Ouch - the lamp is hot',
      happened: () => 'You picked up the desk lamp by its shade just after switching it off. The old bulb had been on a while. The shade burnt your fingers.',
      why: 'An old bulb turns a lot of electricity into heat, not just light. It stays hot for minutes after you switch it off.',
      instead: 'Switch off and wait for the lamp to cool. Then ask an adult to move it, holding it by its base.',
      exam: 'A bulb changes electrical energy into light AND heat. That is why it gets hot.',
    },
    g4_sharp: {
      signs: ['sharp'], fx: 'crack',
      title: () => 'Careful - broken glass cuts',
      happened: () => 'You picked up an old mirror with a crack across it. A sharp edge of glass caught your finger.',
      why: 'Cracked glass has edges as sharp as a knife. A small piece can break off and cut you.',
      instead: 'Never touch broken glass. Tell an adult straight away. In the lab, use the plastic safety mirror.',
      exam: 'Lab safety: tell an adult about broken glass. Never pick it up yourself.',
    },
  };

  const G4_RESULTS = {
    g4_label: {
      icon: '🔤',
      title: c => c.obj === 'tracing' && c.said === 'transparent' ? 'Tracing paper is not transparent' : `The ${c.name.toLowerCase()} is not ${c.said}`,
      happened: c => `You called the ${c.name.toLowerCase()} ${c.said}. But look at the screen: it made ${LIGHT_WORDS[c.is].shadow}. ${LIGHT_WORDS[c.is].lets} So it is ${c.is}.`,
      instead: 'Look at the shadow first. Almost no shadow: transparent. A pale, fuzzy shadow: translucent. A dark shadow: opaque.',
      exam: 'Tracing paper and frosted glass are translucent. Some light gets through, but you cannot see clearly through them.',
    },
    g4_unfair: {
      icon: '⚖️',
      title: () => 'Not a fair test - two things changed',
      happened: c => `Between your two measurements you moved the torch AND the card tree. The shadow went from ${c.from} cm to ${c.to} cm. But which move did that? You cannot tell.`,
      instead: 'Change only ONE thing. Keep the torch still, move only the card tree, then measure again.',
      exam: 'A fair test changes one thing at a time and keeps everything else the same.',
    },
    g4_ruler: {
      icon: '📏',
      title: () => 'You measured from the wrong end',
      happened: c => `Your ruler was upside down, with its ${SHADOW.rulerCm} cm end at the bottom of the shadow. It read ${c.cm} cm. The shadow is really ${c.realCm} cm tall: ${SHADOW.rulerCm} − ${c.cm} = ${c.realCm}.`,
      instead: 'Put the 0 of the ruler at the bottom of the shadow. Read the number at the top of the shadow.',
      exam: 'When you measure with a ruler, always start from the 0 mark.',
    },
  };

  // Short sentences for a 9-year-old, for the 💡 button at Grade 4.
  const FACTS_G4 = [
    'The Sun is our biggest light source. It gives us light and heat.',
    'A torch changes electrical energy from its batteries into light.',
    'Light travels in straight lines. It cannot bend round corners.',
    'A shadow is the dark shape where light cannot reach.',
    'Opaque things, like wood and card, make dark shadows.',
    'Glass is transparent. That is why windows are made of glass.',
    'Frosted glass is translucent. It lets light into a bathroom, but nobody can see in.',
    'A shadow is always on the side away from the light.',
    'Move a toy nearer a torch and its shadow grows bigger.',
    'A mirror is very smooth and shiny, so light bounces off it.',
    'Shadow puppets work because your hands block the light.',
    'Never look straight at the Sun, even with sunglasses.',
  ];

  const G4_MISSIONS = [
    {
      id: 'g4_detective', icon: '🕵️', title: 'Shadow detective', setup: 'shadow',
      blurb: 'Shine the torch at different things. Name one transparent, one translucent and one opaque.',
      intro: 'Shadow detective! Switch on the torch. Put things in the holder and look at each shadow. Then name the material.',
      quiz: [
        { q: 'Which of these is transparent?',
          options: ['Glass', 'Tracing paper', 'Wood', 'Card'],
          why: 'You can see clearly through glass. The light goes straight through it.' },
        { q: 'Tracing paper lets some light through, but things look blurry. It is…',
          options: ['translucent', 'transparent', 'opaque', 'shiny'],
          why: 'Translucent means some light gets through, but you cannot see clearly.' },
        { q: 'Why does a book make a dark shadow?',
          options: ['It is opaque, so it blocks the light', 'It is transparent', 'It gives out its own light', 'It lets all the light through'],
          why: 'A book is opaque. No light goes through it, so there is a dark shadow behind it.' },
        { q: 'A bathroom window lets light in, but nobody can see in. What is it made of?',
          options: ['Frosted glass', 'Clear glass', 'Wood', 'Metal'],
          why: 'Frosted glass is translucent: light comes in, but you cannot see clearly through it.' },
        { q: 'What two things do you need to make a shadow?',
          options: ['A light and an opaque object', 'Only an opaque object', 'Only a transparent object', 'A mirror and some water'],
          why: 'A shadow forms when an opaque object blocks light. No light, no shadow.' },
      ],
    },
    {
      id: 'g4_sizes', icon: '📏', title: 'Grow a shadow', setup: 'shadow',
      blurb: 'Measure the card tree\'s shadow at three places. Keep the torch still.',
      intro: 'Grow a shadow! Switch on the torch. Measure the card tree\'s shadow at three places. Move only the tree, never the torch.',
      quiz: [
        { q: 'You move a toy nearer the torch. What happens to its shadow?',
          options: ['It gets bigger', 'It gets smaller', 'It stays the same size', 'It disappears'],
          why: 'Near the torch, the toy blocks a wide part of the light, so its shadow grows.' },
        { q: 'The card tree was 15 cm from the torch. Its shadow was 20 cm tall. Now it is 25 cm from the torch. How tall could the shadow be?',
          options: ['12 cm', '20 cm', '30 cm', '60 cm'],
          why: 'Further from the torch means a smaller shadow. The bench measured 12 cm.' },
        { q: 'In a fair test of shadow size, what do you change?',
          options: ['Only where the object stands', 'The torch and the object', 'The torch, the object and the screen', 'Nothing at all'],
          why: 'Change one thing only - where the object stands. Keep the torch and the screen still.' },
        { q: 'Where does the 0 on the ruler go when you measure a shadow?',
          options: ['At the bottom of the shadow', 'At the top of the shadow', 'In the middle of the shadow', 'Anywhere on the screen'],
          why: 'Start at 0 at the bottom, then read the number at the top of the shadow.' },
        { q: 'Why does a shadow form?',
          options: ['Light goes in straight lines and cannot bend round things', 'Light bends round the object', 'The object gives out darkness', 'Light goes through opaque things'],
          why: 'Light travels in straight lines. An opaque object stops it, and the space behind is dark.' },
      ],
    },
  ];

  const G4_GUIDES = [
    { id: 'g4_shadows', icon: '🌑', title: 'Make a shadow',
      blurb: 'Shine a torch at card, tracing paper and glass. Which shadow is darkest?',
      lesson: 'Opaque things block all the light, so they make a dark shadow. Translucent things let some light through: a pale shadow. Transparent glass lets the light through: almost no shadow.',
      steps: [
        { on: 'setup:shadow', say: 'Tap 🌑 Place the shadow bench on the table.' },
        { on: 'obj:card',     say: 'Tap 🌳 Card tree in the holder to place it.' },
        { on: 'power:on',     say: 'Tap 🔦 Switch on the torch and look at the screen.' },
        { on: 'obj:tracing',  say: 'Tap 📄 Tracing paper in the holder — is the shadow as dark?' },
        { on: 'obj:glass',    say: 'Tap 🪟 Glass sheet in the holder — can you see a shadow?' },
      ] },
    { id: 'g4_size', icon: '📏', title: 'Big shadow, small shadow',
      blurb: 'Move the card tree nearer the torch, then further away. Measure each shadow.',
      lesson: 'Nearer the torch, the shadow is bigger. Further away, it is smaller. You moved only the tree, so it was a fair test.',
      steps: [
        { on: 'setup:shadow', say: 'Tap 🌑 Place the shadow bench on the table.' },
        { on: 'obj:card',     say: 'Tap 🌳 Card tree in the holder to place it.' },
        { on: 'power:on',     say: 'Tap 🔦 Switch on the torch.' },
        { on: 'measure',      say: 'Tap 📏 Measure the shadow with the ruler.' },
        { on: 'pos:10',       say: 'Tap ◀ Move the tree to 10 cm — close to the torch.' },
        { on: 'measure',      say: 'Tap 📏 Measure the shadow again — is it bigger?' },
        { on: 'pos:50',       say: 'Tap ▶ Move the tree to 50 cm — far from the torch.' },
        { on: 'measure',      say: 'Tap 📏 Measure it again — what happened?' },
      ] },
    { id: 'g4_straight', icon: '🕳️', title: 'Does light go in straight lines?',
      blurb: 'Shine a torch through three holes. Then move one card.',
      lesson: 'The light reached the screen only when the three holes were in a straight line. Light travels in straight lines. It cannot bend round a card.',
      steps: [
        { on: 'setup:cards',  say: 'Tap 🕳️ Set up the three cards in a row.' },
        { on: 'power:on',     say: 'Tap 🔦 Switch on the torch behind them.' },
        { on: 'look',         say: 'Tap 👀 Look at the screen — is there a spot of light?' },
        { on: 'cards:move',   say: 'Tap ↔ Move the middle card slightly to one side.' },
        { on: 'look',         say: 'Tap 👀 Look at the screen again.' },
      ] },
    { id: 'g4_mirror', icon: '🪞', title: 'Bounce the light',
      blurb: 'Use a mirror to shine light on the teddy in the corner.',
      lesson: 'Light bounces off a smooth, shiny mirror. That is called reflection. Turning the mirror changes where the light goes.',
      steps: [
        { on: 'setup:bounce', say: 'Tap 🪞 Place the safety mirror on the table.' },
        { on: 'power:on',     say: 'Tap 🔦 Switch on the torch — where does the light go?' },
        { on: 'tilt:' + BOUNCE.target, say: 'Tap ↻ Turn the mirror — rotate it until the light lands on the teddy.' },
      ] },
  ];

  // One list per kind, each item tagged with its grades (untagged = Grade 9).
  const tag4 = x => Object.assign(x, { grades: [4] });
  G4_DISCOVERIES.forEach(d => DISCOVERIES.push(tag4(d)));
  G4_MISSIONS.forEach(m => MISSIONS.push(tag4(m)));
  G4_GUIDES.forEach(g => GUIDES.push(tag4(g)));
  Object.keys(G4_HAZARDS).forEach(k => { HAZARDS[k] = tag4(G4_HAZARDS[k]); });
  Object.keys(G4_RESULTS).forEach(k => { RESULTS[k] = tag4(G4_RESULTS[k]); });

  return { N_AIR, N_GLASS, LIMITS, BLOCK, BOX_DIST, RAY_LEN, PARALLAX_DEG, HEAT,
           reflectAngle, refractAngle, emergentAngle, criticalAngle, lateralShift, fromSurface, readAngle,
           reflectDir, refractDir, between, frame, trace, reading, cardsPath,
           GRADES, LEVELS, OBJECTS, LIGHT_WORDS, SHADOW, shadowCm, readShadow, BOUNCE, bounceSpot, bounceHits, cap,
           SETUPS, SOURCES, DISCOVERIES, HAZARDS, RESULTS, SIGN_LABELS, FACTS, FACTS_G4, MISSIONS, GUIDES };
})();
if (typeof window !== 'undefined') window.LabLightData = LabLightData;
