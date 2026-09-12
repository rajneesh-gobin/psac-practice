'use strict';
// ══════════════════════════════════════════════
//  Science Labs - the physics behind the Motion Track (NCE Grade 9, P4 Motion).
//
//  ⚠ THE PHYSICS LIVES HERE, NOT IN THE ANIMATION. Every time, speed,
//    acceleration, gradient, area and route length the bench shows comes from
//    this file. lab_motion.js only scales these numbers to the canvas.
//  ⚠ Grounded in g9s-p4-motion (subjects/grade9-physics/_manifest.js):
//    scalars_vectors, distance_displacement, speed_velocity, acceleration,
//    speed_time_graphs, motion_problems. Paper shapes from
//    docs/nce-grade9/blueprint-science.md: Physics 2023 Q6(d) [3] (gradient →
//    acceleration), Physics 2022 Q6(d) [2] (area → distance), Physics 2023
//    Q6(c) (shade the area), Physics 2025 Q1(h) (a = Δv ÷ t), Physics 2021
//    Q5(c) (plot on a pre-axed grid), Physics 2021 Q6(b) (improve accuracy).
//  ⚠ DISTANCE-TIME GRAPHS ARE NOT IN THE NCE SYLLABUS (P4 names only
//    speed-time graphs) and no question in the pack uses one, so the bench
//    draws only a speed-time graph.
//  ⚠ THE RAMP MODEL a = g × (h ÷ L) − friction IS BEYOND THE NCE SYLLABUS.
//    It makes every number true (g = 10 m/s², as the pack uses 10 N/kg), but a
//    pupil is only asked the Grade 9 facts: a steeper ramp gives a greater
//    acceleration; uniform acceleration is a straight sloping line; constant
//    speed is a horizontal line. Wherever the model is shown it says so.
//
//  Units: metres, seconds, m/s, m/s². The ramp height is in cm (as pupils
//  measure it with a ruler); the track is 2.0 m long with a mark every 0.5 m.
// ══════════════════════════════════════════════
const LabMotionData = (() => {
  const G = 10;              // m/s² - the pack's g = 10 N/kg
  const TRACK = 2.0;         // m
  const MARK = 0.5;          // m between marks / light gates
  const FRICTION = 0.1;      // m/s² of rolling friction on a school trolley
  const PUSH = 1.0;          // m/s - the speed a gentle push gives
  const STILL_SEC = 3;       // how long the logger records a trolley that never moves
  const HEIGHTS = [0, 2, 10, 20, 30, 40, 50];   // cm the raised end can be set to
  // A hand-held stopwatch is started LATE by the pupil's reaction time: you
  // see the trolley move, then your thumb presses. Three typical values (s).
  const REACT = [0.25, 0.15, 0.30];
  // The speed-time grid is fixed so runs can be compared on one set of axes.
  const AXES = { tMax: 4, tStep: 0.5, tLabel: 1, vMax: 3.5, vStep: 0.5, vLabel: 1 };
  const JOG = 2;             // m/s - a pupil jogging the field routes
  const FAST_END = 2.5;      // m/s - a trolley this fast hits the stop block hard

  const round = (x, dp) => { const k = Math.pow(10, dp); return Math.round(x * k + (x >= 0 ? 1e-9 : -1e-9)) / k; };
  const r2 = x => round(x, 2);
  const f2 = x => r2(x).toFixed(2);
  const f1 = x => round(x, 1).toFixed(1);

  // ── The ramp ─────────────────────────────────
  const sinTheta = h => h / 100 / TRACK;
  const angleDeg = h => Math.asin(sinTheta(h)) * 180 / Math.PI;
  // Down the slope, gravity gives g × sinθ; friction takes a little back.
  // Raised 2 cm, the two cancel: that is a FRICTION-COMPENSATED runway.
  function accel(h) { return round(G * sinTheta(h) - FRICTION, 9); }

  // Everything that happens in one run.
  //   start 'rest' = released from rest, 'push' = given a push of PUSH m/s.
  // A trolley at rest with no net push down the slope stays at rest.
  function plan(h, start) {
    const u = start === 'push' ? PUSH : 0;
    const a = accel(h);
    if (u === 0 && a <= 0) return { h, start, u: 0, a: 0, moving: false, reached: false, dur: STILL_SEC, tEnd: null, vEnd: 0, dist: 0 };
    let tEnd;
    if (Math.abs(a) < 1e-12) tEnd = TRACK / u;
    else {
      const disc = u * u + 2 * a * TRACK;
      if (disc < 0) {                                   // stops before the end
        const tStop = u / -a;
        return { h, start, u, a, moving: true, reached: false, dur: tStop, tEnd: tStop, vEnd: 0, dist: u * u / (2 * -a) };
      }
      tEnd = (-u + Math.sqrt(disc)) / a;
    }
    return { h, start, u, a, moving: true, reached: true, dur: tEnd, tEnd, vEnd: u + a * tEnd, dist: TRACK };
  }

  // Where the trolley is (m along the track) and how fast, t seconds in.
  function state(p, t) {
    const tt = Math.max(0, Math.min(t, p.dur));
    if (!p.moving) return { x: 0, v: 0 };
    return { x: p.u * tt + 0.5 * p.a * tt * tt, v: p.u + p.a * tt };
  }

  // Time for the trolley to reach x metres (the inverse of state).
  function timeAt(p, x) {
    if (!p.moving) return null;
    if (Math.abs(p.a) < 1e-12) return x / p.u;
    const disc = p.u * p.u + 2 * p.a * x;
    if (disc < 0) return null;
    return (-p.u + Math.sqrt(disc)) / p.a;
  }

  // Light gates at every mark: the time each one is reached and the speed there.
  function gates(p) {
    const out = [];
    for (let x = MARK; x <= TRACK + 1e-9; x += MARK) {
      const t = timeAt(p, x);
      if (t == null) break;
      out.push({ x: round(x, 1), t: r2(t), v: r2(p.u + p.a * t) });
    }
    return out;
  }

  // The gradient a pupil reads: a right-angled triangle on the line, from
  // t = 0 to the last half-second mark before the end of the run - two points
  // that sit on grid lines, so both can be read off exactly.
  function gradientRead(p) {
    const tLast = p.moving ? p.tEnd : 2;
    const t2 = Math.max(AXES.tStep, Math.floor((tLast - 1e-9) / AXES.tStep) * AXES.tStep);
    const v1 = r2(state(p, 0).v), v2 = r2(state(p, t2).v);
    return { t1: 0, v1, t2, v2, dv: r2(v2 - v1), dt: t2, a: r2((v2 - v1) / t2) };
  }

  // The area under the line up to the end of the run = the distance travelled.
  function areaRead(p) {
    if (!p.moving) return { shape: 'none', t: STILL_SEC, u: 0, v: 0, d: 0, working: 'speed 0 m/s the whole time: no area, so 0 m' };
    const t = r2(p.tEnd), u = r2(p.u), v = r2(p.vEnd);
    const d = (p.u + p.vEnd) / 2 * p.tEnd;             // exact
    const shape = Math.abs(p.a) < 1e-12 ? 'rectangle' : p.u === 0 ? 'triangle' : 'trapezium';
    const working = shape === 'triangle' ? `½ × ${f2(t)} s × ${f2(v)} m/s = ${f1(d)} m`
      : shape === 'rectangle' ? `${f2(u)} m/s × ${f2(t)} s = ${f1(d)} m`
      : `(${f2(u)} + ${f2(v)}) ÷ 2 × ${f2(t)} s = ${f1(d)} m`;
    return { shape, t, u, v, d, working };
  }

  // speed = distance ÷ time; average speed = total distance ÷ total time.
  const speed = (d, t) => d / t;

  // What a hand stopwatch reads for the run: started late by a reaction time.
  function stopwatch(p, k) {
    const late = REACT[((k % REACT.length) + REACT.length) % REACT.length];
    return { late, t: r2(p.tEnd - late) };
  }
  const mean = xs => xs.reduce((s, x) => s + x, 0) / xs.length;

  // One row of the results table.
  function reading(p, timer, k) {
    if (!p.moving) return { h: p.h, start: p.start, timer, moving: false, tTrue: null, t: null, avg: 0, vEnd: 0, ok: true, faults: [] };
    const tTrue = r2(p.tEnd);
    const sw = timer === 'stopwatch' ? stopwatch(p, k) : null;
    const t = sw ? sw.t : tTrue;
    return { h: p.h, start: p.start, timer, moving: true, reached: p.reached, tTrue, t, late: sw ? sw.late : 0,
             avg: r2(speed(p.dist, t)), avgTrue: r2(speed(p.dist, p.tEnd)), vEnd: r2(p.vEnd),
             ok: !sw, faults: sw ? ['stopwatch'] : [] };
  }

  // ── Walking a route on the school field ──────
  // x east, y north, in metres. Start = the first point.
  function trackPts() {
    const S = 100, R = 100 / Math.PI, pts = [[0, 0], [S, 0]], n = 36;
    for (let k = 1; k <= n; k++) { const a = -Math.PI / 2 + Math.PI * k / n; pts.push([S + R * Math.cos(a), R + R * Math.sin(a)]); }
    pts.push([0, 2 * R]);
    for (let k = 1; k <= n; k++) { const a = Math.PI / 2 + Math.PI * k / n; pts.push([R * Math.cos(a), R + R * Math.sin(a)]); }
    pts[pts.length - 1] = [0, 0];
    return pts;
  }
  const ROUTES = {
    straight: { icon: '➡️', name: 'Straight line', meta: '60 m east', pts: [[0, 0], [60, 0]] },
    back:     { icon: '↔️', name: 'There and back', meta: '40 m east, 40 m back', pts: [[0, 0], [40, 0], [0, 0]] },
    corner:   { icon: '↱', name: 'Round the corner', meta: '30 m north, 40 m east', pts: [[0, 0], [0, 30], [40, 30]] },
    track:    { icon: '🏟️', name: 'Once round the track', meta: '400 m running track', pts: trackPts(), distance: 400 },
  };
  function pathLength(pts) {
    let s = 0;
    for (let k = 1; k < pts.length; k++) s += Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]);
    return s;
  }
  // Direction of a displacement as a compass bearing from north, clockwise.
  function bearing(dx, dy) { return ((Math.atan2(dx, dy) * 180 / Math.PI) + 360) % 360; }
  function dirText(dx, dy) {
    if (Math.hypot(dx, dy) < 1e-6) return 'no direction - back at the start';
    const b = bearing(dx, dy);
    const names = { 0: 'north', 90: 'east', 180: 'south', 270: 'west' };
    const rb = Math.round(b);
    if (names[rb] !== undefined) return names[rb];
    if (rb > 0 && rb < 90) return `${rb}° east of north`;
    if (rb > 90 && rb < 180) return `${180 - rb}° east of south`;
    if (rb > 180 && rb < 270) return `${rb - 180}° west of south`;
    return `${360 - rb}° west of north`;
  }
  function walk(id) {
    const R = ROUTES[id];
    const distance = R.distance || pathLength(R.pts);
    const a = R.pts[0], z = R.pts[R.pts.length - 1];
    const dx = z[0] - a[0], dy = z[1] - a[1];
    const displacement = Math.hypot(dx, dy);
    const time = distance / JOG;
    return { id, distance: r2(distance), displacement: r2(displacement), dir: dirText(dx, dy), time: r2(time),
             avgSpeed: r2(distance / time), avgVel: r2(displacement / time), same: Math.abs(distance - displacement) < 1e-6 };
  }

  // ── The shelf ─────────────────────────────────
  const SETUPS = {
    ramp: { icon: '🛷', name: 'Trolley and ramp', meta: '2.0 m track · marks every 0.5 m' },
    walk: { icon: '🚶', name: 'Walk on the field', meta: 'Tape measure and compass' },
  };

  // ── Discoveries ────────────────────────────────
  // Tokens: setup:<id> height:<cm> start:rest|push timer:gates|stopwatch
  //         block:on|off meaning:accel|speed run gradient area
  //         route:<id> disp:straight|path walk
  const RAMP = 'setup:ramp', WALK = 'setup:walk';
  const DISCOVERIES = [
    { id: 'from_rest', icon: '🛷', title: 'Speeding up from rest', hint: 'Let go of the trolley at the top of the ramp',
      how: [RAMP, 'height:20', 'start:rest', 'run'],
      saw: 'The speed-time line started at the origin - speed 0 at time 0 - and rose in a straight line until the trolley reached the stop block.',
      formula: 'straight line sloping up = uniform (steady) acceleration',
      learn: 'Released from rest, the trolley gains the same amount of speed every second: it has a uniform acceleration. On a speed-time graph that is a straight line sloping upwards from the origin.',
      exam: 'Recognise the nature of motion from a speed-time graph (P4) - Physics 2025 Q1(g) is a graph-reading MCQ.' },
    { id: 'gradient', icon: '📐', title: 'Gradient = acceleration', hint: 'Draw a triangle on the line',
      how: [RAMP, 'height:20', 'meaning:accel', 'run', 'gradient'],
      saw: 'Your triangle on the line: the speed went up 1.80 m/s in 2.0 s. 1.80 ÷ 2.0 = 0.9, so the acceleration is 0.9 m/s².',
      formula: 'acceleration = change in velocity ÷ time = gradient of a speed-time graph',
      learn: 'The gradient of a speed-time graph is how much the speed changes each second - and that is exactly what acceleration means. A steeper line means a greater acceleration. Units: (m/s) ÷ s = m/s².',
      exam: 'Physics 2023 Q6(d) [3]: find the maximum acceleration from the gradient. Physics 2025 Q1(h): a = Δv ÷ t.' },
    { id: 'area', icon: '▦', title: 'Area = distance', hint: 'Shade the area under the line',
      how: [RAMP, 'height:20', 'run', 'area'],
      saw: 'The shaded triangle under the line: ½ × 2.11 s × 1.90 m/s = 2.0 m - exactly the length of the track.',
      formula: 'distance travelled = area under a speed-time graph',
      learn: 'Speed × time is distance, and on a speed-time graph speed × time is an area. For a triangle use ½ × base × height; for a rectangle, base × height; split any other shape into those.',
      exam: 'Physics 2022 Q6(d) [2]: find the distance from the area under the graph. Physics 2023 Q6(c): shade the area that represents the distance.' },
    { id: 'steeper', icon: '⛰️', title: 'Steeper ramp, steeper line', hint: 'Release the trolley from two different heights',
      how: [RAMP, 'start:rest', 'height:10', 'run', 'height:40', 'run'],
      saw: 'Two lines on one graph. The higher ramp gave a steeper line: the trolley gained speed faster and reached the stop block sooner.',
      formula: 'higher ramp → greater acceleration → steeper speed-time line',
      learn: 'Raising the ramp makes a bigger part of the trolley's weight pull it down the slope, so it speeds up faster. Only the height changed - the same trolley, the same track - so it is a fair test.',
      exam: 'Name the variable you changed (the height of the ramp) and one you kept the same (the trolley and its mass).' },
    { id: 'push_accel', icon: '👋', title: 'A head start', hint: 'Give the trolley a push down the ramp',
      how: [RAMP, 'height:20', 'start:push', 'run'],
      saw: 'This time the line did not start at the origin: it started at 1.0 m/s (the push) and still sloped upwards at the same steepness as before.',
      formula: 'line starts at the initial speed u, gradient still = acceleration',
      learn: 'Where the line starts on the speed axis is the speed at time 0. The push changed the starting speed, not the acceleration - the slope of the ramp decides that, so the gradient is unchanged.' },
    { id: 'stationary', icon: '🛑', title: 'Going nowhere', hint: 'Release the trolley on a flat track',
      how: [RAMP, 'height:0', 'start:rest', 'run'],
      saw: 'The trolley did not move. The data logger drew a line lying ON the time axis: speed 0 m/s the whole time.',
      formula: 'line along the time axis = at rest (stationary)',
      learn: 'With the track flat there is nothing to pull the trolley along, so it stays where it is. A horizontal line at zero speed means the object is stationary.' },
    { id: 'constant', icon: '➖', title: 'Constant speed', hint: 'Push the trolley along a friction-compensated runway',
      how: [RAMP, 'height:2', 'start:push', 'run'],
      saw: 'Raised just 2 cm, the runway exactly cancels friction. After the push the speed stayed at 1.0 m/s: a horizontal line.',
      formula: 'horizontal line = constant speed (acceleration 0 m/s²)',
      learn: 'A horizontal line on a speed-time graph means the speed does not change. Its gradient is zero, so the acceleration is zero. Tilting a runway just enough to cancel friction is how a lab gets truly steady motion.',
      exam: 'A horizontal line on a speed-time graph: constant speed (g9s-p4-013; Physics 2025 Q1(g)).' },
    { id: 'slowing', icon: '📉', title: 'Friction slows it down', hint: 'Push the trolley along a flat track',
      how: [RAMP, 'height:0', 'start:push', 'run'],
      saw: 'On the flat the pushed trolley slowed down: the line sloped DOWN, from 1.0 m/s to about 0.77 m/s at the end of the track.',
      formula: 'line sloping down = deceleration (negative acceleration)',
      learn: 'Friction acts against the motion, so the speed falls a little every second. A falling straight line is a uniform deceleration; its gradient is negative (here −0.1 m/s²).' },
    { id: 'stop_block', icon: '🧱', title: 'Stopped safely', hint: 'Send a fast trolley into the stop block',
      how: [RAMP, 'block:on', 'height:40', 'run'],
      saw: 'The trolley hit the stop block at nearly 3 m/s and stopped dead - on the graph the speed dropped straight to zero.',
      learn: 'A stop block (or a padded catch box) at the end of the ramp stops the trolley without anyone reaching into its path. The faster it goes, the more important that is.',
      exam: 'Safety precaution for a trolley on a ramp: a stop block at the end - never catch it by hand (g9 inquiry questions).' },
    { id: 'repeats', icon: '🔁', title: 'Repeat and average', hint: 'Time the same run three times by hand',
      how: [RAMP, 'height:20', 'start:rest', 'timer:stopwatch', 'run', 'run', 'run'],
      saw: 'Three hand-timed runs gave three different times for the same run. Their mean is closer to the light-gate time than the worst one.',
      formula: 'mean = (t₁ + t₂ + t₃) ÷ 3',
      learn: 'Your reaction time is different every time you press, so hand timings scatter. Repeating and taking the mean evens out that random scatter; light gates remove it altogether.',
      exam: 'Improve the accuracy of a measurement: repeat and take the mean (Physics 2021 Q6(b)).' },
    { id: 'there_back', icon: '↔️', title: 'Back where you started', hint: 'Walk somewhere and come back',
      how: [WALK, 'route:back', 'disp:straight', 'walk'],
      saw: 'You jogged 40 m east and 40 m back: distance 80 m, but displacement 0 m - you finished exactly where you started.',
      formula: 'distance = total path length · displacement = straight line from start to finish',
      learn: 'Distance counts every metre you travel, whichever way. Displacement only cares where you ended up compared with where you started - and in which direction.',
      exam: 'Define distance and displacement (P4) - g9s-p4-004 and -005 are this exact walk.' },
    { id: 'corner', icon: '↱', title: 'The short cut', hint: 'Walk a route that turns a corner',
      how: [WALK, 'route:corner', 'disp:straight', 'walk'],
      saw: 'Distance walked 70 m (30 m + 40 m), but the straight line from start to finish is only 50 m, at 53° east of north.',
      formula: 'displacement 50 m (a 3-4-5 triangle) < distance 70 m',
      learn: 'When the path changes direction, the displacement - the straight line - is shorter than the distance. On a scale drawing you can measure it with a ruler and its direction with a protractor.' },
    { id: 'straight_same', icon: '➡️', title: 'When they are the same', hint: 'Walk in one straight line',
      how: [WALK, 'route:straight', 'disp:straight', 'walk'],
      saw: 'A straight 60 m walk east: distance 60 m and displacement 60 m east. The same size - only the displacement has a direction.',
      learn: 'Distance and displacement are equal in size only when you move in one straight line without turning back. Even then, displacement carries a direction (east) and distance does not.' },
    { id: 'track_velocity', icon: '🏟️', title: 'Fast, but velocity zero', hint: 'Go once round the running track',
      how: [WALK, 'route:track', 'disp:straight', 'walk'],
      saw: 'Once round the 400 m track in 200 s: average speed 2 m/s, but average velocity 0 m/s - the displacement is zero.',
      formula: 'average speed = distance ÷ time · average velocity = displacement ÷ time',
      learn: 'Speed uses distance; velocity uses displacement. Finish where you started and your average velocity is zero, however fast you ran.',
      exam: 'g9s-p4-009: a car once round a circular track has an average velocity of zero.' },
    { id: 'scalar_vector', icon: '🧭', title: 'Scalar or vector?', hint: 'Compare two different routes',
      how: [WALK, 'disp:straight', 'route:back', 'walk', 'route:corner', 'walk'],
      saw: 'Two routes in your table. Every distance is just a number of metres; every displacement needs a direction as well.',
      formula: 'scalar: size only (distance, speed, time) · vector: size AND direction (displacement, velocity, acceleration)',
      learn: 'A scalar is fully described by its size. A vector needs a direction too. Distance and speed are scalars; displacement and velocity are their vector partners.',
      exam: 'Distinguish between scalars and vectors, with examples (P4) - g9s-p4-001 to -003.' },
  ];

  // ── Hazards: the mistakes that stop the experiment ───
  // A falling trolley is a physical danger, so it takes the ISO 7010 general
  // warning triangle ('warning', "Caution") - the GHS "Harmful" diamond it
  // first borrowed says chemical.
  const HAZARDS = {
    no_block: {
      signs: ['warning'], fx: 'fall',
      title: () => 'Stop - the trolley came off the end',
      happened: c => `With no stop block, the trolley reached the end of the ramp at ${f1(c.v || 0)} m/s, shot off the edge of the bench and crashed to the floor - right next to someone's foot.`,
      why: 'A loaded school trolley weighs about a kilogram and has hard metal wheels. Falling from bench height it can crush toes, and it breaks itself and the light gates too. Reaching out to catch a fast trolley by hand is how fingers get trapped.',
      instead: 'Clamp a stop block (or a padded catch box) at the bottom of the ramp before every run. Keep feet, bags and hands out of the trolley's path, and never catch a moving trolley by hand.',
      exam: 'A safety precaution is asked on the NCE science papers (for example Chemistry 2022 Q5(a)(ii)). For a trolley on a ramp: a stop block or catch box at the end - never catch it by hand.',
    },
  };

  // ── Wrong but safe: the mistakes that give a wrong number ───
  const RESULTS = {
    stopwatch: {
      icon: '⏱️',
      title: () => 'You started the stopwatch late',
      happened: c => `Your stopwatch read ${f2(c.t)} s for the 2.0 m, but the light gates measured ${f2(c.tTrue)} s. You saw the trolley move, then pressed - ${f2(c.late)} s late: your reaction time. So your average speed came out as ${f2(c.avg)} m/s instead of ${f2(c.avgTrue)} m/s.`,
      instead: 'Use light gates: they start and stop the clock themselves. If you only have a stopwatch, repeat the run three times and take the mean - that evens out the random part of your reaction time. Time a longer run so a small delay matters less.',
      exam: 'Name the error (the reaction time of the person timing) and improve the accuracy of a measurement: repeat and average (Physics 2021 Q6(b)(i)-(ii)).',
    },
    gradient_speed: {
      icon: '📈',
      title: () => 'The gradient is not the speed',
      happened: c => `Your triangle gave a gradient of ${f2(c.dv)} ÷ ${f1(c.dt)} = ${f2(c.a)}, and you wrote it down as a speed: ${f2(c.a)} m/s. But the speed is read off the vertical axis - at the end the trolley was doing ${f2(c.vEnd)} m/s. The gradient of a speed-time graph is the ACCELERATION: ${f2(c.a)} m/s².`,
      instead: 'Speed: read straight up from the time to the line, then across to the speed axis (m/s). Acceleration: the gradient, change in speed ÷ change in time (m/s²). Distance: the area under the line (m).',
      exam: 'Physics 2023 Q6(d) [3]: the maximum acceleration is the steepest gradient. Always give the unit - m/s² for acceleration, m/s for speed.',
    },
    disp_path: {
      icon: '🧭',
      title: () => 'That is the distance, not the displacement',
      happened: c => `You measured along the path you walked and wrote displacement = ${f1(c.distance)} m. That is the DISTANCE. The displacement is the straight line from start to finish: ${f1(c.displacement)} m${c.displacement > 0 ? ` (${c.dir})` : ' - you finished where you started'}.`,
      instead: 'For displacement, ignore the path: draw one straight line from the start to the finish, measure it, and give its direction. For distance, add up every part of the path.',
      exam: 'Define distance and displacement, and say which is a vector (P4). A walk 40 m east and back: distance 80 m, displacement 0 m (g9s-p4-004, -005).',
    },
  };

  const MODEL_NOTE = 'The bench works out the acceleration down the slope as a = g × (height ÷ track length) − friction, with g = 10 m/s² and friction 0.1 m/s² - that formula is beyond the NCE syllabus. At Grade 9, say: the steeper the ramp, the greater the acceleration.';

  // Short, true facts for the 💡 button, tied to P4.
  const FACTS = [
    'A cheetah can reach about 30 m/s - the fastest land animal. Usain Bolt's top speed was about 12 m/s.',
    'Sound travels through air at about 340 m/s; light at about 300 000 000 m/s.',
    'A car doing 60 km/h is travelling at about 17 m/s. To change km/h into m/s, divide by 3.6.',
    'Speed, distance and time are scalars. Velocity, displacement and acceleration are vectors - they need a direction.',
    'Deceleration is just a negative acceleration: the speed is going down.',
    'Light gates time a card on the trolley breaking a beam of light - to a thousandth of a second, with no reaction time.',
    'A typical reaction time is about 0.2 s. That is why hand timing of short, fast events is so unreliable.',
    'On a speed-time graph: gradient = acceleration, area = distance. Learn both - no formula sheet is given in the NCE paper.',
    'Distance-time graphs also exist - there the gradient is the speed. You will meet them later (beyond the NCE syllabus).',
    'An object falling freely near the Earth speeds up by about 10 m/s every second: an acceleration of about 10 m/s².',
    'A lift, a train pulling out of a station and a sprinter off the blocks all accelerate - you feel it as a push back into your seat.',
    'The Earth moves round the Sun at about 30 000 m/s - but after one year its displacement is almost zero.',
  ];

  // ── Missions ──
  // A question's FIRST option is the answer; the quiz shuffles them.
  const MISSIONS = [
    {
      id: 'accel', icon: '📐', title: 'Find the acceleration', setup: 'ramp',
      blurb: 'Release the trolley from two heights, read the gradient of each line, shade an area, then answer the paper questions.',
      intro: 'Find the acceleration! Stop block on, light gates on. Release the trolley from rest at TWO different heights, find the gradient of each line, and shade the area under one of them.',
      quiz: [
        { q: 'A trolley starts from rest and reaches 1.8 m/s in 2.0 s. What is its acceleration?',
          options: ['0.9 m/s²', '3.6 m/s²', '1.8 m/s²', '0.9 m/s'],
          why: 'Acceleration = change in speed ÷ time = (1.8 − 0) ÷ 2.0 = 0.9 m/s². The unit is m/s², not m/s.' },
        { q: 'On a speed-time graph, what does the gradient of the line give?',
          options: ['The acceleration', 'The speed', 'The distance travelled', 'The time taken'],
          why: 'Gradient = change in speed ÷ change in time = acceleration (Physics 2023 Q6(d)).' },
        { q: 'On a speed-time graph, what does the area under the line give?',
          options: ['The distance travelled', 'The acceleration', 'The average speed', 'The time taken'],
          why: 'Speed × time = distance, and speed × time is the area under the line (Physics 2022 Q6(d)).' },
        { q: 'A trolley speeds up steadily from rest to 2.0 m/s in 4.0 s. How far does it travel in that time?',
          options: ['4.0 m', '8.0 m', '2.0 m', '0.5 m'],
          why: 'The area under the line is a triangle: ½ × 4.0 s × 2.0 m/s = 4.0 m.' },
        { q: 'A speed-time graph is a straight line rising from the origin. What is the motion?',
          options: ['Uniform acceleration from rest', 'Constant speed', 'Slowing down steadily', 'At rest'],
          why: 'Starting at speed 0 and rising in a straight line: the speed goes up by the same amount every second.' },
        { q: 'The ramp is raised higher and the trolley released again. How does its speed-time line change?',
          options: ['It is steeper - a greater acceleration', 'It is flatter - a smaller acceleration', 'It becomes horizontal', 'It does not change'],
          why: 'A steeper ramp gives a greater acceleration, and the gradient of the line is the acceleration.' },
        { q: 'Why is a stop block fixed at the bottom of the ramp?',
          options: ['To stop the trolley falling onto the floor or someone's feet', 'To make the trolley accelerate faster', 'To measure the speed at the bottom', 'To keep the ramp at the same height'],
          why: 'It stops the trolley safely without anyone reaching into its path - a safety precaution.' },
      ],
    },
    {
      id: 'disp', icon: '🧭', title: 'Distance or displacement?', setup: 'walk',
      blurb: 'Jog three routes on the field, including once round the track, and record distance and displacement for each.',
      intro: 'Distance or displacement? Jog three different routes - one of them once round the track. For each, record the distance and the displacement (the straight line from start to finish).',
      quiz: [
        { q: 'A pupil walks 40 m east, then 40 m west back to the start. What are the distance and the displacement?',
          options: ['80 m and 0 m', '0 m and 80 m', '80 m and 80 m', '40 m and 0 m'],
          why: 'Distance is the whole path, 40 + 40 = 80 m. Displacement is start to finish - the same point - so 0 m.' },
        { q: 'Which of these is a vector quantity?',
          options: ['Displacement', 'Distance', 'Speed', 'Time'],
          why: 'A vector has a direction as well as a size. Displacement does; distance, speed and time have size only.' },
        { q: 'A girl walks 30 m north and then 40 m east. What is the size of her displacement?',
          options: ['50 m', '70 m', '10 m', '0 m'],
          why: 'The straight line from start to finish, measured on a scale drawing, is 50 m (a 3-4-5 triangle). 70 m is the distance.' },
        { q: 'A runner goes once round a 400 m track in 80 s. What is her average speed?',
          options: ['5 m/s', '0 m/s', '320 m/s', '0.2 m/s'],
          why: 'Average speed = total distance ÷ total time = 400 ÷ 80 = 5 m/s.' },
        { q: 'The same runner, once round the 400 m track in 80 s. What is her average velocity?',
          options: ['0 m/s', '5 m/s', '400 m/s', '80 m/s'],
          why: 'She finishes where she started, so her displacement is 0 m and her average velocity is 0 m/s (g9s-p4-009).' },
        { q: 'What is the difference between speed and velocity?',
          options: ['Velocity has a direction as well as a size', 'Velocity is always the larger of the two', 'Speed is measured over a longer time', 'Speed is only for objects slowing down'],
          why: 'Speed is a scalar; velocity is the same quantity with a direction attached - a vector.' },
      ],
    },
  ];

  // ── Guided experiments: "I landed here - what do I do?" ──
  const GUIDES = [
    { id: 'ramp', icon: '🛷', title: 'Roll a trolley down a ramp',
      blurb: 'Release a trolley, watch its speed-time graph draw itself, then find the acceleration and the distance.',
      lesson: 'Released from rest, the trolley sped up steadily: a straight line sloping up. Its GRADIENT is the acceleration (change in speed ÷ time) and the AREA under it is the distance travelled.',
      steps: [
        { on: 'setup:ramp',  say: 'Tap 🛷 Set up the ramp to place the trolley on the bench.' },
        { on: 'block:on',    say: 'Tap 🧱 Fit the stop block — safety first!' },
        { on: 'height:20',   say: 'Tap ▲ to raise the ramp to 20 cm.' },
        { on: 'run',         say: 'Tap ▶ Release — watch the speed-time graph draw itself.' },
        { on: 'gradient',    say: 'Tap 📐 Find the gradient to draw a triangle on the line.' },
        { on: 'area',        say: 'Tap ▦ Shade the area — what distance does it show?' },
      ] },
    { id: 'steady', icon: '➖', title: 'Steady speed and slowing down',
      blurb: 'Push the trolley on a friction-compensated runway, then on a flat track, and compare the lines.',
      lesson: 'On the friction-compensated runway the speed stayed the same: a HORIZONTAL line, acceleration zero. On the flat track friction slowed it: a line sloping DOWN, a deceleration.',
      steps: [
        { on: 'setup:ramp',  say: 'Tap 🛷 Set up the ramp.' },
        { on: 'height:2',    say: 'Tap ▲ to raise to 2 cm — just enough to cancel friction.' },
        { on: 'start:push',  say: 'Tap 👋 Choose "Pushed" to give the trolley a push.' },
        { on: 'run',         say: 'Tap ▶ Push the trolley and watch the line.' },
        { on: 'height:0',    say: 'Tap ▼ to lay the track flat (0 cm).' },
        { on: 'run',         say: 'Tap ▶ Push again — is the line still level?' },
      ] },
    { id: 'walk', icon: '🧭', title: 'Distance or displacement?',
      blurb: 'Jog two routes on the field and compare how far you went with where you ended up.',
      lesson: 'Distance is the whole length of the path; displacement is the straight line from start to finish, with a direction. There and back: 80 m but 0 m. Round a corner: 70 m but 50 m.',
      steps: [
        { on: 'setup:walk',     say: 'Tap 🚶 Go to the field to head outside with a tape measure.' },
        { on: 'disp:straight',  say: 'Tap 📏 Straight line — displacement is start to finish in a straight line.' },
        { on: 'route:back',     say: 'Tap ↔️ There and back: 40 m east, then 40 m back.' },
        { on: 'walk',           say: 'Tap 🚶 Jog the route — watch distance and displacement.' },
        { on: 'route:corner',   say: 'Tap ↱ Round the corner: 30 m north then 40 m east.' },
        { on: 'walk',           say: 'Tap 🚶 Jog it — which is bigger this time?' },
      ] },
  ];

  return { G, TRACK, MARK, FRICTION, PUSH, STILL_SEC, HEIGHTS, REACT, AXES, JOG, FAST_END, MODEL_NOTE,
           round, r2, f2, f1, sinTheta, angleDeg, accel, plan, state, timeAt, gates, gradientRead, areaRead, speed,
           stopwatch, mean, reading, ROUTES, pathLength, bearing, dirText, walk,
           SETUPS, DISCOVERIES, HAZARDS, RESULTS, FACTS, MISSIONS, GUIDES };
})();
if (typeof window !== 'undefined') window.LabMotionData = LabMotionData;
