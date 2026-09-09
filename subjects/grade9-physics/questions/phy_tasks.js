'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Science - Physics  SHAPE batch  (18 structured tasks)
//  IDs: g9s-ptask-001 – g9s-ptask-018
//  Chapters: g9s-p3-energy, g9s-p4-motion, g9s-p5-electricity
//
//  Each task uses makeTask() with multi-part NCE-style structured questions.
//  Each part returns a numeric answer. Mark values follow NCE Physics papers
//  (most single-mark parts; no part worth more than 3 marks).
//
//  ⚠ <i> IS AN HTML BREAKOUT TAG AND MUST NEVER APPEAR INSIDE AN <svg>.
//    Italic inside an svg is <tspan font-style="italic">.
//
//  Source: NCE Science (Physics) 2021-2025; NCF Grades 7-9 §P3, §P4, §P5.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const SRC = 'NCE Science (Physics) 2021-2025; NCF Grades 7-9 §P3-P5.';

// Part helper — numeric response
const P = (label, prompt, marks, answer, unit, hint, explanation) => ({
  label, prompt, marks, hint, explanation,
  response: Object.assign(
    { kind: 'number', answer: String(answer) },
    unit ? { unit } : {}
  ),
});

// ── SVG helpers ────────────────────────────────────────────────────────

// Speed-time graph: axes 0-10 s, 0-20 m/s
const stG = (pts) => {
  const X0 = 44, Y0 = 128, X1 = 232, Y1 = 18;
  const sx = t => X0 + (t / 10) * (X1 - X0);
  const sy = v => Y0 - (v / 20) * (Y0 - Y1);
  let g = '<svg viewBox="0 0 260 165" width="280" role="img" aria-label="a speed-time graph">';
  for (let t = 0; t <= 10; t += 2) {
    g += '<line x1="' + sx(t).toFixed(1) + '" y1="' + Y1 + '" x2="' + sx(t).toFixed(1) + '" y2="' + Y0 + '" stroke="#e2e8f0" stroke-width="1"/>';
  }
  for (let v = 0; v <= 20; v += 4) {
    g += '<line x1="' + X0 + '" y1="' + sy(v).toFixed(1) + '" x2="' + X1 + '" y2="' + sy(v).toFixed(1) + '" stroke="#e2e8f0" stroke-width="1"/>';
  }
  g += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X1 + '" y2="' + Y0 + '" stroke="#0f172a" stroke-width="2"/>';
  g += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X0 + '" y2="' + Y1 + '" stroke="#0f172a" stroke-width="2"/>';
  for (let t = 0; t <= 10; t += 2) {
    g += '<text x="' + sx(t).toFixed(1) + '" y="' + (Y0 + 12) + '" font-size="9" text-anchor="middle" fill="#334155">' + t + '</text>';
  }
  for (let v = 0; v <= 20; v += 4) {
    g += '<text x="' + (X0 - 5) + '" y="' + (sy(v) + 3).toFixed(1) + '" font-size="9" text-anchor="end" fill="#334155">' + v + '</text>';
  }
  g += '<text x="138" y="152" font-size="9" text-anchor="middle" fill="#334155">time / s</text>';
  g += '<text x="12" y="76" font-size="9" text-anchor="middle" fill="#334155" transform="rotate(-90 12 76)">speed / m/s</text>';
  const d = pts.map((p, i) => (i ? 'L' : 'M') + sx(p[0]).toFixed(1) + ' ' + sy(p[1]).toFixed(1)).join(' ');
  g += '<path d="' + d + '" fill="none" stroke="#b91c1c" stroke-width="2.5"/>';
  return g + '</svg>';
};

// Series circuit: rectangular loop with cell, resistors, ammeter, voltmeter labels
const seriesCircuitSVG = (emfLabel, r1Label, r2Label) => {
  let g = '<svg viewBox="0 0 260 180" width="280" role="img" aria-label="a series electrical circuit">';
  // outer rectangle (the loop)
  g += '<rect x="20" y="25" width="220" height="120" fill="none" stroke="#0f172a" stroke-width="2"/>';
  // Cell on top centre
  g += '<line x1="118" y1="10" x2="118" y2="30" stroke="#0f172a" stroke-width="2"/>'; // long +
  g += '<line x1="132" y1="16" x2="132" y2="30" stroke="#0f172a" stroke-width="4"/>'; // short -
  g += '<line x1="108" y1="25" x2="118" y2="25" stroke="#0f172a" stroke-width="2"/>';
  g += '<line x1="132" y1="25" x2="142" y2="25" stroke="#0f172a" stroke-width="2"/>';
  g += '<text x="125" y="9" font-size="10" text-anchor="middle" fill="#334155">' + (emfLabel || 'E') + '</text>';
  // Resistor 1 on right side
  g += '<rect x="220" y="60" width="20" height="38" fill="none" stroke="#0f172a" stroke-width="2"/>';
  g += '<text x="242" y="82" font-size="10" fill="#334155">' + (r1Label || 'R₁') + '</text>';
  // Resistor 2 on bottom
  g += '<rect x="108" y="130" width="44" height="16" fill="none" stroke="#0f172a" stroke-width="2"/>';
  g += '<text x="130" y="160" font-size="10" text-anchor="middle" fill="#334155">' + (r2Label || 'R₂') + '</text>';
  // Ammeter on left side
  g += '<circle cx="20" cy="85" r="12" fill="none" stroke="#0f172a" stroke-width="2"/>';
  g += '<text x="20" y="90" font-size="11" text-anchor="middle" fill="#0f172a">A</text>';
  // Labels
  g += '<text x="130" y="20" font-size="8" text-anchor="middle" fill="#64748b">cell</text>';
  return g + '</svg>';
};

// Simple pendulum SVG for energy problems
const pendulumSVG = (heightLabel) => {
  let g = '<svg viewBox="0 0 200 180" width="220" role="img" aria-label="a pendulum diagram">';
  // Pivot
  g += '<line x1="100" y1="10" x2="100" y2="15" stroke="#0f172a" stroke-width="4"/>';
  g += '<rect x="82" y="5" width="36" height="10" fill="#334155"/>';
  // String at rest (vertical)
  g += '<line x1="100" y1="15" x2="100" y2="145" stroke="#64748b" stroke-width="1.5"/>';
  // String at angle (left high point)
  g += '<line x1="100" y1="15" x2="58" y2="110" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3"/>';
  // Bob at rest (lowest)
  g += '<circle cx="100" cy="148" r="10" fill="#334155" stroke="#0f172a" stroke-width="1.5"/>';
  // Bob at high (left)
  g += '<circle cx="58" cy="113" r="10" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3 2"/>';
  // Height arrow
  g += '<line x1="52" y1="113" x2="52" y2="148" stroke="#1d4ed8" stroke-width="1.5"/>';
  g += '<polygon points="52,108 48,118 56,118" fill="#1d4ed8"/>';
  g += '<polygon points="52,153 48,143 56,143" fill="#1d4ed8"/>';
  g += '<text x="42" y="134" font-size="11" text-anchor="end" fill="#1d4ed8">' + (heightLabel || 'h') + '</text>';
  g += '<text x="100" y="172" font-size="9" text-anchor="middle" fill="#334155">lowest point</text>';
  return g + '</svg>';
};

// Energy bar diagram (GPE + KE at two positions)
const energyBarSVG = () => {
  let g = '<svg viewBox="0 0 220 140" width="240" role="img" aria-label="an energy bar chart showing GPE and KE at two positions">';
  // Position A (top): all GPE
  g += '<rect x="20" y="40" width="30" height="80" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1.5"/>';
  g += '<rect x="55" y="120" width="30" height="0" fill="#ef4444" stroke="#b91c1c" stroke-width="1.5"/>';
  g += '<text x="35" y="35" font-size="9" text-anchor="middle" fill="#334155">GPE</text>';
  g += '<text x="70" y="35" font-size="9" text-anchor="middle" fill="#334155">KE</text>';
  g += '<text x="55" y="135" font-size="9" text-anchor="middle" fill="#334155">Position A</text>';
  // Position B (bottom): all KE
  g += '<rect x="120" y="120" width="30" height="0" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1.5"/>';
  g += '<rect x="155" y="40" width="30" height="80" fill="#ef4444" stroke="#b91c1c" stroke-width="1.5"/>';
  g += '<text x="135" y="35" font-size="9" text-anchor="middle" fill="#334155">GPE</text>';
  g += '<text x="170" y="35" font-size="9" text-anchor="middle" fill="#334155">KE</text>';
  g += '<text x="155" y="135" font-size="9" text-anchor="middle" fill="#334155">Position B</text>';
  // baseline
  g += '<line x1="10" y1="120" x2="210" y2="120" stroke="#0f172a" stroke-width="1"/>';
  return g + '</svg>';
};

// ── Tasks ──────────────────────────────────────────────────────────────

const ITEMS = [

  // ── P4 Motion: speed-time graph A (acc then const then decel) ────────
  ['g9s-ptask-001', 'g9s-p4-motion', 'speed_time_graphs', 3, [
    P('a.i', 'Read the graph. What is the speed of the object at t = 4 s?',
      1, 8, 'm/s', 'Read the y-value at x = 4.', 'At t = 4 s the graph reaches 8 m/s.'),
    P('a.ii', 'Calculate the acceleration during the first 4 s.',
      2, 2, 'm/s²', 'Gradient = rise &divide; run.',
      'a = (8 &minus; 0) &divide; 4 = 2 m/s&sup2;.'),
    P('b', 'Calculate the distance travelled between t = 4 s and t = 8 s.',
      2, 32, 'm', 'Distance = area of rectangle (constant speed section).',
      'Distance = 8 &times; (8 &minus; 4) = 8 &times; 4 = 32 m.'),
    P('c', 'Calculate the total distance travelled from t = 0 to t = 10 s.',
      3, 56, 'm', 'Split into triangle + rectangle + triangle.',
      'Triangle 1: &frac12;&times;4&times;8=16 m. Rectangle: 32 m. Triangle 2: &frac12;&times;2&times;8=8 m. Total = 56 m.'),
  ], stG([[0,0],[4,8],[8,8],[10,0]]),
  'Speed-time graph showing acceleration (0-4 s), constant speed (4-8 s) and deceleration (8-10 s).'],

  // ── P4 Motion: speed-time graph B (uniform acceleration from rest) ────
  ['g9s-ptask-002', 'g9s-p4-motion', 'speed_time_graphs', 3, [
    P('a.i', 'What is the initial speed of the object?',
      1, 0, 'm/s', 'Read the speed at t = 0.', 'The graph starts at 0 m/s; the object starts from rest.'),
    P('a.ii', 'Calculate the acceleration of the object.',
      2, 2, 'm/s²', 'Gradient = change in speed &divide; time taken.',
      'a = (16 &minus; 0) &divide; 8 = 2 m/s&sup2;.'),
    P('b', 'How far does the object travel in 8 s?',
      2, 64, 'm', 'Area under the graph is a triangle.',
      'Distance = &frac12; &times; 8 &times; 16 = 64 m.'),
    P('c', 'At t = 8 s the object immediately begins to decelerate at 4 m/s&sup2;. How long does it take to stop?',
      2, 4, 's', 'Time = speed &divide; deceleration.',
      't = 16 &divide; 4 = 4 s.'),
  ], stG([[0,0],[8,16]]),
  'Speed-time graph showing uniform acceleration from rest to 16 m/s in 8 s.'],

  // ── P4 Motion: speed-time graph C (deceleration to rest) ─────────────
  ['g9s-ptask-003', 'g9s-p4-motion', 'speed_time_graphs', 3, [
    P('a.i', 'What is the initial speed of the vehicle?',
      1, 20, 'm/s', 'Read the y-intercept.', 'The graph starts at 20 m/s.'),
    P('a.ii', 'After how many seconds does the vehicle stop?',
      1, 10, 's', 'Find where the line crosses the x-axis.', 'The line reaches 0 m/s at t = 10 s.'),
    P('a.iii', 'Calculate the deceleration.',
      2, 2, 'm/s²', 'Deceleration = change in speed &divide; time.',
      'Deceleration = (20 &minus; 0) &divide; 10 = 2 m/s&sup2;.'),
    P('b', 'Calculate the total distance the vehicle travels before stopping.',
      2, 100, 'm', 'Area of the triangle under the graph.',
      'Distance = &frac12; &times; 10 &times; 20 = 100 m.'),
  ], stG([[0,20],[10,0]]),
  'Speed-time graph showing uniform deceleration from 20 m/s to rest in 10 s.'],

  // ── P4 Motion: calculation-only task (no graph) ───────────────────────
  ['g9s-ptask-004', 'g9s-p4-motion', 'acceleration', 3, [
    P('a', 'A car accelerates from 5 m/s to 25 m/s in 8 s. Calculate the acceleration.',
      2, 2.5, 'm/s²', 'a = (v &minus; u) &divide; t.',
      'a = (25 &minus; 5) &divide; 8 = 20 &divide; 8 = 2.5 m/s&sup2;.'),
    P('b', 'Calculate the distance covered during this acceleration. (Use s = &frac12;(u + v)t.)',
      2, 120, 'm', 's = &frac12;(u + v) &times; t.',
      's = &frac12; &times; (5 + 25) &times; 8 = &frac12; &times; 30 &times; 8 = 120 m.'),
    P('c', 'After reaching 25 m/s, the car brakes with a deceleration of 5 m/s&sup2;. How long does it take to stop?',
      2, 5, 's', 't = v &divide; a (u = 25, v = 0).',
      't = 25 &divide; 5 = 5 s.'),
    P('d', 'How far does the car travel during braking?',
      2, 62.5, 'm', 'Distance = &frac12;(u + v) &times; t.',
      'Distance = &frac12; &times; (25 + 0) &times; 5 = 62.5 m.'),
  ], null, null],

  // ── P4 Motion: distance-displacement-speed multi-part ─────────────────
  ['g9s-ptask-005', 'g9s-p4-motion', 'motion_problems', 3, [
    P('a', 'A runner completes a 400 m circular track in 52 s. Calculate her average speed in m/s.',
      2, 7.69, 'm/s', 'Average speed = distance &divide; time. Give to 3 significant figures.',
      '400 &divide; 52 &asymp; 7.69 m/s.'),
    P('b', 'What is the magnitude of her displacement when she has completed exactly one full lap?',
      1, 0, 'm', 'She returns to the starting position.',
      'One full lap returns her to the start; displacement = 0 m.'),
    P('c', 'In the first 100 m of the lap she runs in a straight line. How long does this take at the average speed from (a)?',
      2, 13, 's', 't = d &divide; v.',
      't = 100 &divide; 7.69 &asymp; 13 s.'),
  ], null, null],

  // ── P3 Energy: pendulum conservation ──────────────────────────────────
  ['g9s-ptask-006', 'g9s-p3-energy', 'energy_problems', 3, [
    P('a', 'A pendulum bob of mass 0.5 kg is released from rest at a height of 0.8 m above the lowest point. Taking g = 10 N/kg, calculate its gravitational potential energy at the highest point.',
      2, 4, 'J', 'GPE = mgh.',
      'GPE = 0.5 &times; 10 &times; 0.8 = 4 J.'),
    P('b', 'What is the kinetic energy of the bob at the lowest point (ignoring air resistance)?',
      1, 4, 'J', 'All GPE converts to KE at the lowest point.',
      'By conservation of energy, KE at lowest = GPE at highest = 4 J.'),
    P('c', 'Calculate the speed of the bob at the lowest point.',
      2, 4, 'm/s', 'KE = &frac12;mv&sup2;; solve for v.',
      '4 = &frac12; &times; 0.5 &times; v&sup2;; v&sup2; = 16; v = 4 m/s.'),
    P('d', 'In practice, the bob only reaches 0.72 m on the other side. How much energy was lost to air resistance?',
      2, 0.4, 'J', 'GPE at 0.72 m = mgh; energy lost = original GPE &minus; final GPE.',
      'GPE at 0.72 m = 0.5 &times; 10 &times; 0.72 = 3.6 J. Lost = 4 &minus; 3.6 = 0.4 J.'),
  ], pendulumSVG('0.8 m'),
  'A pendulum bob shown at its highest point (0.8 m above the lowest point) and at the lowest point.'],

  // ── P3 Energy: falling ball energy ────────────────────────────────────
  ['g9s-ptask-007', 'g9s-p3-energy', 'conservation_of_energy', 3, [
    P('a', 'A ball of mass 2 kg is held at rest at a height of 5 m above the ground. Calculate its GPE. Take g = 10 N/kg.',
      2, 100, 'J', 'GPE = mgh.', 'GPE = 2 &times; 10 &times; 5 = 100 J.'),
    P('b', 'The ball is released. Ignoring air resistance, calculate its KE just before hitting the ground.',
      1, 100, 'J', 'All GPE converts to KE.',
      'KE = GPE = 100 J.'),
    P('c', 'Calculate the speed of the ball just before it hits the ground.',
      2, 10, 'm/s', 'KE = &frac12;mv&sup2;.',
      '100 = &frac12; &times; 2 &times; v&sup2;; v&sup2; = 100; v = 10 m/s.'),
    P('d', 'In reality the ball hits the ground at 9.5 m/s. Calculate the energy lost to air resistance.',
      2, 9.75, 'J', 'Energy lost = GPE &minus; actual KE.',
      'Actual KE = &frac12; &times; 2 &times; 90.25 = 90.25 J. Lost = 100 &minus; 90.25 = 9.75 J.'),
  ], energyBarSVG(),
  'An energy bar chart: Position A (held at 5 m) shows only GPE; Position B (ground) shows only KE.'],

  // ── P3 Energy: power station efficiency ───────────────────────────────
  ['g9s-ptask-008', 'g9s-p3-energy', 'electricity_production', 3, [
    P('a', 'A coal power station burns 2 000 kg of coal per hour. The energy stored in coal is 30 000 kJ/kg. Calculate the total chemical energy released per hour in MJ.',
      2, 60000, 'MJ', 'Energy = mass &times; energy per kg; convert kJ to MJ (&divide; 1 000).',
      '2 000 &times; 30 000 = 60 000 000 kJ = 60 000 MJ.'),
    P('b', 'The station generates 24 000 MJ of electrical energy per hour. Calculate its efficiency as a percentage.',
      2, 40, '%', 'Efficiency = (useful output &divide; total input) &times; 100.',
      '(24 000 &divide; 60 000) &times; 100 = 40%.'),
    P('c', 'How much energy per hour is wasted as heat (in MJ)?',
      1, 36000, 'MJ', 'Wasted = total &minus; useful.',
      '60 000 &minus; 24 000 = 36 000 MJ.'),
  ], null, null],

  // ── P5 Electricity: simple Ohm's Law series circuit ──────────────────
  ['g9s-ptask-009', 'g9s-p5-electricity', 'dc_circuit_problems', 3, [
    P('a', 'In the circuit shown, the cell has an e.m.f. of 6 V and the resistor R&#8321; = 3 &Omega;. Calculate the current flowing in the circuit.',
      2, 2, 'A', 'I = V &divide; R.',
      'I = 6 &divide; 3 = 2 A.'),
    P('b', 'Calculate the potential difference across R&#8321;.',
      1, 6, 'V', 'In a single-loop circuit with one resistor, V across R = supply voltage.',
      'V = 2 &times; 3 = 6 V (all the supply voltage drops across the only resistor).'),
    P('c', 'How much charge passes through R&#8321; in 30 s?',
      2, 60, 'C', 'Q = It.',
      'Q = 2 &times; 30 = 60 C.'),
    P('d', 'How much work is done in moving this charge through R&#8321;?',
      2, 360, 'J', 'W = QV.',
      'W = 60 &times; 6 = 360 J.'),
  ], seriesCircuitSVG('6 V', '3 Ω', ''),
  'A series circuit with a 6 V cell and a 3 ohm resistor, with an ammeter in series.'],

  // ── P5 Electricity: two-resistor series circuit ───────────────────────
  ['g9s-ptask-010', 'g9s-p5-electricity', 'dc_circuit_problems', 3, [
    P('a', 'A circuit has a 12 V supply and two resistors in series: R&#8321; = 4 &Omega; and R&#8322; = 8 &Omega;. Calculate the total resistance.',
      1, 12, 'Ω', 'R&sub;total; = R&#8321; + R&#8322;.',
      'R&sub;total; = 4 + 8 = 12 &Omega;.'),
    P('b', 'Calculate the current in the circuit.',
      2, 1, 'A', 'I = V &divide; R&sub;total;.',
      'I = 12 &divide; 12 = 1 A.'),
    P('c', 'Calculate the voltage across R&#8321;.',
      2, 4, 'V', 'V = IR.',
      'V&#8321; = 1 &times; 4 = 4 V.'),
    P('d', 'Calculate the voltage across R&#8322;.',
      2, 8, 'V', 'V = IR.',
      'V&#8322; = 1 &times; 8 = 8 V.'),
    P('e', 'Verify your answers to (c) and (d) by checking they add to the supply voltage.',
      1, 12, 'V', 'V&#8321; + V&#8322; should equal the supply.',
      '4 + 8 = 12 V ✓'),
  ], seriesCircuitSVG('12 V', '4 Ω', '8 Ω'),
  'A series circuit with a 12 V cell, a 4 ohm resistor (R1) and an 8 ohm resistor (R2), with an ammeter.'],

  // ── P5 Electricity: Q = It and W = QV ────────────────────────────────
  ['g9s-ptask-011', 'g9s-p5-electricity', 'charge_and_current', 3, [
    P('a', 'A current of 0.5 A flows in a circuit for 4 minutes. Calculate the charge transferred.',
      2, 120, 'C', 'Convert minutes to seconds; Q = It.',
      'Q = 0.5 &times; 240 = 120 C.'),
    P('b', 'The potential difference across the component is 9 V. Calculate the work done in transferring this charge.',
      2, 1080, 'J', 'W = QV.',
      'W = 120 &times; 9 = 1 080 J.'),
    P('c', 'Calculate the power dissipated by the component.',
      2, 4.5, 'W', 'Power = W &divide; t (in seconds).',
      'P = 1 080 &divide; 240 = 4.5 W.'),
  ], null, null],

  // ── P5 Electricity: finding unknown resistance ─────────────────────────
  ['g9s-ptask-012', 'g9s-p5-electricity', 'current_voltage_resistance', 3, [
    P('a', 'A voltmeter reads 4.5 V across an unknown resistor R. An ammeter in series reads 0.3 A. Calculate R.',
      2, 15, 'Ω', 'R = V &divide; I.',
      'R = 4.5 &divide; 0.3 = 15 &Omega;.'),
    P('b', 'A second identical resistor is connected in series with the first. The supply voltage is unchanged. Calculate the new current.',
      2, 0.15, 'A', 'New R&sub;total; = 2 &times; 15 = 30 &Omega;. Supply V = 4.5 + voltage across original resistor = 0.3 &times; (original total R).',
      'Original supply V: with one 15 &Omega; resistor and I = 0.3 A, V = 0.3 &times; 15 = 4.5 V (all across R). New R = 30 &Omega;. New I = 4.5 &divide; 30 = 0.15 A.'),
    P('c', 'Calculate the new voltage across one resistor.',
      1, 2.25, 'V', 'V = new I &times; R.',
      'V = 0.15 &times; 15 = 2.25 V.'),
  ], null, null],

  // ── P5 Electricity: ammeter and voltmeter readings in a circuit ────────
  ['g9s-ptask-013', 'g9s-p5-electricity', 'measuring_current_voltage', 3, [
    P('a', 'A series circuit has a 9 V cell, a 6 &Omega; resistor and a switch. The switch is closed. State the reading on an ammeter placed in series.',
      2, 1.5, 'A', 'I = V &divide; R.',
      'I = 9 &divide; 6 = 1.5 A.'),
    P('b', 'State the reading on a voltmeter placed across the 6 &Omega; resistor.',
      1, 9, 'V', 'V = I &times; R.',
      'V = 1.5 &times; 6 = 9 V (all the supply voltage).'),
    P('c', 'A second resistor of 3 &Omega; is added in series. Calculate the new current.',
      2, 1, 'A', 'New R&sub;total; = 9 &Omega;. I = V &divide; R.',
      'I = 9 &divide; 9 = 1 A.'),
    P('d', 'What does the voltmeter across the 6 &Omega; resistor now read?',
      2, 6, 'V', 'V = I &times; R.',
      'V = 1 &times; 6 = 6 V.'),
  ], seriesCircuitSVG('9 V', '6 Ω', ''),
  'A series circuit with a 9 V cell and a 6 ohm resistor, ammeter in series.'],

  // ── P4 + P5 combined: acceleration then current calculation ──────────
  ['g9s-ptask-014', 'g9s-p4-motion', 'motion_problems', 3, [
    P('a', 'A vehicle starts from rest and accelerates uniformly to 20 m/s in 8 s. Calculate the acceleration.',
      2, 2.5, 'm/s²', 'a = (v &minus; u) &divide; t.',
      'a = (20 &minus; 0) &divide; 8 = 2.5 m/s&sup2;.'),
    P('b', 'Calculate the distance the vehicle covers during this acceleration.',
      2, 80, 'm', 's = &frac12;(u + v)t.',
      's = &frac12; &times; 20 &times; 8 = 80 m.'),
    P('c', 'The vehicle&rsquo;s electric motor operates at 48 V and draws 15 A while accelerating. Calculate the charge transferred in 8 s.',
      2, 120, 'C', 'Q = It.',
      'Q = 15 &times; 8 = 120 C.'),
    P('d', 'Calculate the electrical energy used by the motor in 8 s.',
      2, 5760, 'J', 'W = QV.',
      'W = 120 &times; 48 = 5 760 J.'),
  ], null, null],

  // ── P3 Energy: renewable vs non-renewable numbers ─────────────────────
  ['g9s-ptask-015', 'g9s-p3-energy', 'comparing_energy_sources', 3, [
    P('a', 'A wind turbine produces 2.5 MW on a windy day. How many joules of energy does it generate in 1 hour?',
      2, 9000000000, 'J', 'Power in W &times; time in seconds; 2.5 MW = 2 500 000 W.',
      '2 500 000 &times; 3 600 = 9 000 000 000 J = 9 &times; 10&sup9; J.'),
    P('b', 'A coal plant burns 5 000 kg of coal per hour (energy content 30 000 kJ/kg). Calculate the energy released from coal in one hour in joules.',
      2, 150000000000, 'J', 'Energy = mass &times; energy per kg; convert kJ to J.',
      '5 000 &times; 30 000 &times; 1 000 = 1.5 &times; 10&sup2; J.'),
    P('c', 'The coal plant has 40% efficiency. Calculate its useful electrical output in one hour in joules.',
      2, 60000000000, 'J', 'Useful output = efficiency &times; total input.',
      '0.40 &times; 1.5 &times; 10&sup2; = 6 &times; 10&sup0; J.'),
  ], null, null],

  // ── P5 Electricity: fuse and energy calculation ────────────────────────
  ['g9s-ptask-016', 'g9s-p5-electricity', 'dc_circuit_problems', 3, [
    P('a', 'A lamp operates at 240 V and has a resistance of 960 &Omega;. Calculate the current through the lamp.',
      2, 0.25, 'A', 'I = V &divide; R.',
      'I = 240 &divide; 960 = 0.25 A.'),
    P('b', 'Calculate the charge that passes through the lamp in 1 hour.',
      2, 900, 'C', 'Q = It; convert 1 hour to seconds.',
      'Q = 0.25 &times; 3 600 = 900 C.'),
    P('c', 'Calculate the energy transferred by the lamp in 1 hour.',
      2, 216000, 'J', 'W = QV.',
      'W = 900 &times; 240 = 216 000 J.'),
    P('d', 'A fuse rated at 500 mA protects the circuit. Will it blow when the lamp is switched on? Write the current compared with the fuse rating.',
      1, 0.25, 'A', 'Compare the lamp current with 0.5 A.',
      'Current = 0.25 A; fuse rating = 0.5 A. The current is below the fuse rating, so it will NOT blow.'),
  ], null, null],

  // ── P4 Motion: motion with two phases ────────────────────────────────
  ['g9s-ptask-017', 'g9s-p4-motion', 'motion_problems', 3, [
    P('a', 'A train travels at a constant speed of 30 m/s for 1 200 m, then decelerates uniformly to rest in 20 s. Calculate the time taken to travel the first 1 200 m.',
      2, 40, 's', 't = d &divide; v.',
      't = 1 200 &divide; 30 = 40 s.'),
    P('b', 'Calculate the deceleration during the final 20 s.',
      2, 1.5, 'm/s²', 'Deceleration = initial speed &divide; time.',
      'Deceleration = (30 &minus; 0) &divide; 20 = 1.5 m/s&sup2;.'),
    P('c', 'Calculate the distance covered during the deceleration phase.',
      2, 300, 'm', 'Average speed &times; time.',
      'Average speed = (30 + 0) &divide; 2 = 15 m/s. Distance = 15 &times; 20 = 300 m.'),
    P('d', 'Calculate the total distance from start to final rest.',
      1, 1500, 'm', 'Add the two phases.',
      'Total = 1 200 + 300 = 1 500 m.'),
  ], null, null],

  // ── P5 + P3 combined: energy and current ──────────────────────────────
  ['g9s-ptask-018', 'g9s-p5-electricity', 'potential_difference', 3, [
    P('a', 'An electric kettle operates at 230 V and draws a current of 8 A. Calculate the resistance of the heating element.',
      2, 28.75, 'Ω', 'R = V &divide; I.',
      'R = 230 &divide; 8 = 28.75 &Omega;.'),
    P('b', 'Calculate the charge that flows through the kettle in 3 minutes.',
      2, 1440, 'C', 'Q = It; convert minutes to seconds.',
      'Q = 8 &times; 180 = 1 440 C.'),
    P('c', 'Calculate the energy transferred to the water in 3 minutes.',
      2, 331200, 'J', 'W = QV.',
      'W = 1 440 &times; 230 = 331 200 J.'),
    P('d', 'Express this energy in kilojoules.',
      1, 331.2, 'kJ', 'Divide by 1 000.',
      '331 200 &divide; 1 000 = 331.2 kJ.'),
  ], null, null],
];

ITEMS.forEach(([id, chapterId, subsection, difficulty, parts, svgHtml, altText]) => {
  STATIC_QUESTIONS.push(makeTask(Object.assign(
    { id, chapterId, subsection, difficulty, source: SRC, parts },
    svgHtml ? { stimulus: { html: svgHtml, altText: altText || 'a diagram' } } : {}
  )));
});

})();
