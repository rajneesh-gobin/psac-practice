'use strict';
// ══════════════════════════════════════════════
//  Science Labs - the physics behind the Circuit Board (NCE Grade 9, P5).
//
//  ⚠ THE PHYSICS LIVES HERE, NOT IN THE ANIMATION. Every current, voltage,
//    brightness, short circuit, blown bulb and meter reading comes from
//    solve() below. lab_circuit.js only draws what it returns. If a bulb looks
//    wrong on screen, fix it HERE.
//  ⚠ Grounded in g9s-p5-electricity (subjects/grade9-physics/_manifest.js):
//    circuit_symbols, series_circuits, measuring_current_voltage,
//    current_voltage_resistance, charge_and_current (Q = It),
//    potential_difference (W = QV), dc_circuit_problems. The syllabus names
//    SERIES circuits; parallel is on the bench because the paper asks it too
//    (Physics 2022 Q5(b)(i), a parallel-resistance sum - blueprint-science.md
//    §P.6) and every bank question on houses and broken lamps contrasts them.
//    Conductors/insulators, mains wiring, buzzers and motors are not in the
//    Grade 9 chapter, so they are not on the bench.
//
//  The model (small and honest):
//  - A board of 4 × 3 connection points. A component sits on the space
//    between two neighbouring points ("a slot"): 'h<c><r>' joins (c,r) to
//    (c+1,r), 'v<c><r>' joins (c,r) to (c,r+1).
//  - Identical bulbs are fixed 3 Ω resistances; the resistor is 3 Ω. A cell is
//    1.5 V with a negligible internal resistance (0.0001 Ω - "ideal", but a
//    short circuit still has a number). Wires, closed switches, ammeters and
//    fuses are 0.000001 Ω - far below the cell, as in real life, so in a short
//    the cell's own resistance takes the voltage and the bulbs go dark. A
//    voltmeter is 1 MΩ.
//  - Solved by nodal analysis (Kirchhoff's current law at every point), so
//    series, parallel, a short circuit, an ammeter across a bulb and a
//    voltmeter in the loop all come out of the same maths - nothing is a
//    special case in the drawing code.
//  - Brightness ∝ power: P = I²R, shown as a multiple of one bulb on one cell
//    (0.75 W). The pupil sees it in words; V = IR is used in the syllabus's own
//    terms (resistance = voltage ÷ current).
// ══════════════════════════════════════════════
const LabCircuitData = (() => {
  const COLS = 4, ROWS = 3, NODES = COLS * ROWS;
  const EMF = 1.5;
  const R = { wire: 1e-6, closed: 1e-6, cell: 1e-4, bulb: 3, resistor: 3, ammeter: 1e-6, voltmeter: 1e6, fuse: 1e-6 };
  const LEAK = 1e-9;          // a whisper of conductance to "ground" keeps a floating part solvable
  const SHORT_A = 20;         // a cell pushing more than this is short-circuited
  const FUSE_A = 3;           // the fuse melts above 3 A
  const BULB_MAX_V = 4;       // the bulb is made for up to 3 V (two cells); 3 cells blow it
  const P_REF = EMF * EMF / R.bulb;   // one bulb on one cell: 0.75 W = brightness 1
  const LIT = 0.02;           // below 2% of normal brightness the filament does not glow
  const FS = { ammeter: 2, voltmeter: 5 };   // meter full-scale: 0-2 A, 0-5 V

  const node = (c, r) => r * COLS + c;
  const ROW_NAMES = ['top', 'middle', 'bottom'], COL_NAMES = ['left', 'middle', 'right'];
  const SIDE_NAMES = ['left', 'inner left', 'inner right', 'right'], HALF_NAMES = ['upper', 'lower'];
  const SLOTS = {};
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS - 1; c++)
    SLOTS['h' + c + r] = { id: 'h' + c + r, dir: 'h', c, r, a: node(c, r), b: node(c + 1, r), name: `${ROW_NAMES[r]} row, ${COL_NAMES[c]}` };
  for (let r = 0; r < ROWS - 1; r++) for (let c = 0; c < COLS; c++)
    SLOTS['v' + c + r] = { id: 'v' + c + r, dir: 'v', c, r, a: node(c, r), b: node(c, r + 1), name: `${SIDE_NAMES[c]} side, ${HALF_NAMES[r]}` };

  // ── Standard symbols (IEC, as the NCE papers and the question bank draw them) ──
  const svg = inner => `<svg viewBox="0 0 64 32" class="lab-circuit-svg" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">${inner}</g></svg>`;
  const SYMBOL = {
    wire:      svg('<path d="M4 16h56"/>'),
    cell:      svg('<path d="M4 16h24M36 16h24"/><path d="M28 5v22" stroke-width="2.2"/><path d="M36 10v12" stroke-width="5"/>'),
    bulb:      svg('<path d="M4 16h16M44 16h16"/><circle cx="32" cy="16" r="11"/><path d="M24.2 8.2l15.6 15.6M39.8 8.2 24.2 23.8"/>'),
    switch:    svg('<path d="M4 16h18M44 16h16"/><circle cx="22" cy="16" r="2.2" fill="currentColor"/><circle cx="42" cy="16" r="2.2" fill="currentColor"/><path d="M22 16 40 6"/>'),
    ammeter:   svg('<path d="M4 16h16M44 16h16"/><circle cx="32" cy="16" r="11"/>') .replace('</g></svg>', '</g><text x="32" y="21" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor" font-family="system-ui,sans-serif">A</text></svg>'),
    voltmeter: svg('<path d="M4 16h16M44 16h16"/><circle cx="32" cy="16" r="11"/>') .replace('</g></svg>', '</g><text x="32" y="21" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor" font-family="system-ui,sans-serif">V</text></svg>'),
    resistor:  svg('<path d="M4 16h14M46 16h14"/><rect x="18" y="10" width="28" height="12"/>'),
    fuse:      svg('<path d="M4 16h56"/><rect x="18" y="11" width="28" height="10"/>'),
  };

  // ── The components ──────────────────────────
  const KINDS = {
    wire:      { name: 'Wire',      icon: '〰️', meta: 'Copper, plastic-coated', job: 'Joins the components. It has almost no resistance.' },
    cell:      { name: 'Cell',      icon: '🔋', meta: '1.5 V', job: 'Pushes charge round the circuit. In the symbol, the long thin line is the positive (+) terminal.' },
    bulb:      { name: 'Bulb',      icon: '💡', meta: 'Filament lamp · 3 Ω', job: 'Lights up when a current flows through it. Also called a lamp.' },
    switch:    { name: 'Switch',    icon: '🔘', meta: 'Opens or closes the circuit', job: 'Open, it makes a gap; closed, it completes the circuit.' },
    ammeter:   { name: 'Ammeter',   icon: '⏲️', meta: 'Current · connect IN SERIES', job: 'Measures current in amperes (A). It goes in the loop, so the current passes through it.' },
    voltmeter: { name: 'Voltmeter', icon: '🎚️', meta: 'Voltage · connect ACROSS', job: 'Measures voltage (potential difference) in volts (V). It goes across a component, one lead each side.' },
    resistor:  { name: 'Resistor',  icon: '🟫', meta: '3 Ω', job: 'Opposes the current, so less current flows.' },
    fuse:      { name: 'Fuse',      icon: '🧵', meta: 'Melts above 3 A', job: 'A thin wire that melts if the current gets too big, breaking the circuit.' },
  };
  const TOOLS = ['hand', 'wire', 'cell', 'bulb', 'switch', 'ammeter', 'voltmeter', 'resistor', 'fuse', 'eraser'];

  // ── Ready-made layouts ────────────────────────
  // Every one is the same outer loop: the cell top-left, the switch on the
  // left side, the bulb along the bottom. The switch starts OPEN.
  const BASE = { h00: 'cell', h10: 'wire', h20: 'wire', v30: 'wire', v31: 'wire', h22: 'wire', h12: 'bulb', h02: 'wire', v01: 'wire', v00: 'switch' };
  const P = (name, over) => ({ name, parts: Object.assign({}, BASE, over || {}) });
  const PRESETS = {
    single:       P('One cell, one bulb and a switch'),
    gap:          P('A circuit with a gap in it', { v31: null }),
    series2:      P('Two bulbs in series', { h22: 'bulb' }),
    parallel2:    P('Two bulbs in parallel', { h11: 'bulb', v11: 'wire', v21: 'wire' }),
    twocells:     P('Two cells and a bulb', { h10: 'cell' }),
    meters:       P('An ammeter in series and a voltmeter across the bulb', { h20: 'ammeter', h11: 'voltmeter', v11: 'wire', v21: 'wire' }),
    ammeters2:    P('Two bulbs in series with two ammeters', { h22: 'bulb', h20: 'ammeter', h02: 'ammeter' }),
    series_volts: P('Two bulbs in series, a voltmeter across one', { h22: 'bulb', h20: 'ammeter', h11: 'voltmeter', v11: 'wire', v21: 'wire' }),
    series_amm:   P('Two bulbs in series with an ammeter', { h22: 'bulb', h20: 'ammeter' }),
    parallel_amm: P('Two bulbs in parallel with an ammeter', { h11: 'bulb', v11: 'wire', v21: 'wire', h20: 'ammeter' }),
    resistor:     P('A bulb, a resistor and an ammeter', { h20: 'ammeter', v31: 'resistor' }),
    fuse:         P('A bulb with a fuse in the circuit', { h20: 'fuse', v11: 'wire', v21: 'wire' }),
  };
  // Quick layouts offered on the shelf (the others belong to guides and missions).
  const QUICK = ['single', 'series2', 'parallel2', 'twocells', 'meters', 'resistor', 'fuse'];

  function layoutOf(id) {
    const p = PRESETS[id], out = {};
    if (!p) return out;
    for (const [slot, kind] of Object.entries(p.parts)) {
      if (!kind) continue;
      out[slot] = kind === 'switch' ? { kind, open: true } : { kind };
    }
    return out;
  }

  // ── The solver ──────────────────────────────
  function conductance(p) {
    switch (p.kind) {
      case 'wire': return 1 / R.wire;
      case 'switch': return p.open ? 0 : 1 / R.closed;
      case 'bulb': return p.out || p.blown ? 0 : 1 / R.bulb;
      case 'resistor': return 1 / R.resistor;
      case 'ammeter': return 1 / R.ammeter;
      case 'voltmeter': return 1 / R.voltmeter;
      case 'fuse': return p.blown ? 0 : 1 / R.fuse;
      case 'cell': return 1 / R.cell;
    }
    return 0;
  }

  // Gaussian elimination with partial pivoting. G is small (12 × 12).
  function gauss(G, J) {
    const n = J.length, A = G.map((row, i) => [...row, J[i]]);
    for (let k = 0; k < n; k++) {
      let p = k;
      for (let i = k + 1; i < n; i++) if (Math.abs(A[i][k]) > Math.abs(A[p][k])) p = i;
      [A[k], A[p]] = [A[p], A[k]];
      const d = A[k][k] || 1e-30;
      for (let i = k + 1; i < n; i++) {
        const f = A[i][k] / d;
        if (!f) continue;
        for (let j = k; j <= n; j++) A[i][j] -= f * A[k][j];
      }
    }
    const x = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      let s = A[i][n];
      for (let j = i + 1; j < n; j++) s -= A[i][j] * x[j];
      x[i] = s / (A[i][i] || 1e-30);
    }
    return x;
  }

  // layout: { slotId: { kind, open?, out?, blown?, flip? } }
  // Returns the potential of every point, and for every part the current I
  // (from its point a to its point b, amperes) and the voltage V = Va − Vb.
  function solve(layout) {
    const G = Array.from({ length: NODES }, () => new Array(NODES).fill(0));
    const J = new Array(NODES).fill(0);
    const els = [];
    for (const id of Object.keys(layout || {})) {
      const p = layout[id], s = SLOTS[id];
      if (!p || !s || !KINDS[p.kind]) continue;
      const g = conductance(p);
      const el = { slot: id, kind: p.kind, a: s.a, b: s.b, g, I: 0, V: 0 };
      if (g > 0) {
        G[s.a][s.a] += g; G[s.b][s.b] += g; G[s.a][s.b] -= g; G[s.b][s.a] -= g;
        if (p.kind === 'cell') {
          // A cell as its Norton equivalent: EMF/r pushed into the + terminal.
          el.plus = p.flip ? s.a : s.b; el.minus = p.flip ? s.b : s.a;
          J[el.plus] += EMF * g; J[el.minus] -= EMF * g;
        }
      }
      els.push(el);
    }
    for (let i = 0; i < NODES; i++) G[i][i] += LEAK;
    const V = gauss(G, J);
    for (const el of els) {
      if (!(el.g > 0)) continue;
      el.V = V[el.a] - V[el.b];
      if (el.kind === 'cell') {
        const out = (EMF - (V[el.plus] - V[el.minus])) * el.g;   // − to + inside the cell
        el.I = el.plus === el.b ? out : -out;
      } else el.I = el.V * el.g;
    }
    const bulbs = {}, meters = {};
    let cellI = 0, cells = 0;
    for (const el of els) {
      const p = layout[el.slot];
      if (el.kind === 'bulb') {
        const I = Math.abs(el.I), Vb = Math.abs(el.V), Pw = I * I * R.bulb;
        const b = el.g > 0 ? Pw / P_REF : 0;
        bulbs[el.slot] = { I, V: Vb, P: Pw, brightness: b, lit: b >= LIT, out: !!p.out, blown: !!p.blown };
      } else if (el.kind === 'ammeter') meters[el.slot] = { kind: 'ammeter', value: Math.abs(el.I) };
      else if (el.kind === 'voltmeter') meters[el.slot] = { kind: 'voltmeter', value: Math.abs(el.V) };
      else if (el.kind === 'cell') { cells++; cellI = Math.max(cellI, Math.abs(el.I)); }
    }
    return { V, els, bulbs, meters, cellI, cells, short: cellI > SHORT_A,
             flowing: cellI > 1e-3 && cellI <= SHORT_A };
  }

  const _el = (sol, slot) => sol.els.find(e => e.slot === slot);
  const litBulbs = sol => Object.keys(sol.bulbs).filter(k => sol.bulbs[k].lit);

  // Is there a closed path from one terminal of this part to the other, not
  // counting the part itself? Voltmeters are not a path (1 MΩ lights nothing).
  // opts.closeSwitches: treat every switch as closed.
  function _joined(layout, skip, opts) {
    const parent = [...Array(NODES).keys()];
    const find = x => { while (parent[x] !== x) x = parent[x] = parent[parent[x]]; return x; };
    for (const [id, p] of Object.entries(layout)) {
      if (id === skip || !p || !SLOTS[id] || p.kind === 'voltmeter') continue;
      const g = p.kind === 'switch' && opts && opts.closeSwitches ? 1 : conductance(p);
      if (g > 0) parent[find(SLOTS[id].a)] = find(SLOTS[id].b);
    }
    return (a, b) => find(a) === find(b);
  }
  function loopThrough(layout, slot, opts) {
    const s = SLOTS[slot];
    return !!s && _joined(layout, slot, opts)(s.a, s.b);
  }
  // A gap: there is a cell and a bulb, and no cell has a closed loop even with
  // every switch closed. (A switch is a gap you can close - not a missing wire.)
  function hasGap(layout) {
    const cells = Object.keys(layout).filter(k => layout[k] && layout[k].kind === 'cell');
    const bulbs = Object.keys(layout).filter(k => layout[k] && layout[k].kind === 'bulb');
    if (!cells.length || !bulbs.length) return false;
    return !cells.some(c => loopThrough(layout, c, { closeSwitches: true }));
  }

  // The mistakes, found from the solution.
  function fusesOver(sol) { return sol.els.filter(e => e.kind === 'fuse' && e.g > 0 && Math.abs(e.I) > FUSE_A).map(e => e.slot); }
  function diagnose(layout, sol) {
    const short = sol.short;
    const via = short ? (sol.els.some(e => e.kind === 'ammeter' && Math.abs(e.I) > SHORT_A) ? 'ammeter' : 'wire') : null;
    const hot = short ? sol.els.filter(e => Math.abs(e.I) > SHORT_A).map(e => e.slot) : [];
    const over = short ? [] : Object.keys(sol.bulbs).filter(k => sol.bulbs[k].V > BULB_MAX_V);
    // A voltmeter is "in series" if, put back as a plain wire, it would let a
    // bulb light that is dark now: it is standing in the path the current needs.
    const vmSeries = short ? [] : Object.keys(layout).filter(k => {
      const p = layout[k];
      if (!p || p.kind !== 'voltmeter' || !(sol.meters[k] && sol.meters[k].value > 0.1)) return false;
      const alt = Object.assign({}, layout, { [k]: { kind: 'wire' } });
      const s2 = solve(alt);
      if (s2.short) return false;
      return Object.keys(s2.bulbs).some(b => s2.bulbs[b].lit && !(sol.bulbs[b] && sol.bulbs[b].lit));
    });
    return { short, via, hot, over, vmSeries };
  }

  // 'none' | 'single' | 'series' | 'parallel' | 'mixed' - from the currents alone.
  function arrangement(sol) {
    const lit = litBulbs(sol).map(k => sol.bulbs[k]);
    if (!lit.length) return 'none';
    if (lit.length === 1) return 'single';
    if (lit.length === 2) {
      const [x, y] = lit, I = sol.cellI;
      if (Math.abs(x.I - y.I) < 1e-3 && Math.abs(x.I - I) < 2e-3) return 'series';
      if (Math.abs(x.I + y.I - I) < 2e-3) return 'parallel';
    }
    return 'mixed';
  }
  const ARR_NAMES = { none: 'no bulb lit', single: 'one bulb', series: '2 bulbs in series', parallel: '2 bulbs in parallel', mixed: 'several bulbs' };

  function brightnessWord(b) {
    if (!(b >= LIT)) return 'off';
    if (b < 0.15) return 'very dim';
    if (b < 0.5) return 'dim';
    if (b < 1.6) return 'normal';
    if (b < 3) return 'bright';
    return 'very bright';
  }

  // Does this switch control the bulbs? Open it: does every bulb go out?
  function switchControls(layout, slot) {
    const p = layout[slot];
    if (!p || p.kind !== 'switch') return false;
    const s1 = solve(Object.assign({}, layout, { [slot]: { kind: 'switch', open: false } }));
    const s0 = solve(Object.assign({}, layout, { [slot]: { kind: 'switch', open: true } }));
    return litBulbs(s1).length > 0 && litBulbs(s0).length === 0;
  }
  // Is this ammeter measuring the current the cell supplies (in series with it)?
  function ammeterInSeries(sol, slot) {
    const m = sol.meters[slot];
    return !!m && m.kind === 'ammeter' && m.value > 0.01 && Math.abs(m.value - sol.cellI) < 0.01;
  }

  // ── The two formulas the syllabus names, and V = IR ──
  const charge = (I, t) => I * t;          // Q = It
  const energy = (Q, V) => Q * V;          // W = QV
  const resistance = (V, I) => V / I;      // R = V ÷ I
  const seriesR = (...r) => r.reduce((a, b) => a + b, 0);
  const parallelR = (...r) => 1 / r.reduce((a, b) => a + 1 / b, 0);
  const round2 = x => Math.round(x * 100) / 100;

  // What goes in the notebook when the pupil takes a reading.
  function reading(layout, sol, t) {
    const amm = Object.keys(sol.meters).filter(k => sol.meters[k].kind === 'ammeter').sort();
    const vm = Object.keys(sol.meters).filter(k => sol.meters[k].kind === 'voltmeter').sort();
    const arr = arrangement(sol);
    const A = amm.map(k => round2(sol.meters[k].value));
    const Vv = vm.map(k => round2(sol.meters[k].value));
    const bulbs = Object.keys(sol.bulbs).sort().map(k => brightnessWord(sol.bulbs[k].brightness));
    const out = { arr, label: ARR_NAMES[arr] + (sol.cells > 1 ? ` · ${sol.cells} cells` : sol.cells === 1 ? ' · 1 cell' : ''),
                  cells: sol.cells, amps: A, volts: Vv, bulbs, t: Math.round(t || 0), Q: null, W: null };
    if (A.length && A[0] > 0.01 && t >= 1) {
      out.Q = round2(charge(A[0], Math.round(t)));
      if (Vv.length) out.W = round2(energy(out.Q, Vv[0]));
    }
    return out;
  }

  // ── Discoveries ────────────────────────────────
  // A FOUND card shows `saw`, the `formula`, `learn` and `exam`; a LOCKED card
  // shows `how` as steps, and "Show me how" runs them as a guide.
  // scripts/test-labs-circuit.js follows every `how` and fails if any does not
  // actually unlock its card - and if any of them trips a hazard or result card.
  // Tokens: build:<preset> place:<slot>:<kind> remove:<slot> switch:on|off
  //         bulb:<slot>:out|in flip:<slot> read wait:<seconds> view:symbols|picture
  const ON = 'switch:on', OFF = 'switch:off', READ = 'read';
  const DISCOVERIES = [
    { id: 'first_light', icon: '💡', title: 'The bulb lights', hint: 'Close the switch on a complete circuit',
      how: ['build:single', ON],
      saw: 'With the switch closed the bulb lit, and the moving dots showed a current flowing all the way round the loop.',
      formula: 'complete (closed) circuit → current flows',
      learn: 'Charge can only flow round an unbroken loop, from one terminal of the cell back to the other. The cell pushes it; the bulb turns its energy into light and heat.',
      exam: 'Physics 2025 Q6(b)(iv) asks whether a lamp will light, and why: say whether the circuit is complete.' },
    { id: 'switch_off', icon: '🔘', title: 'Switch off = circuit broken', hint: 'Open the switch while the bulb is lit',
      how: ['build:single', ON, OFF],
      saw: 'Opening the switch put the bulb out at once, and the dots stopped everywhere in the loop.',
      formula: 'open switch → a gap → no current anywhere',
      learn: 'A switch is a gap you can close. Open, it breaks the circuit, so no current flows anywhere in the loop - not only near the switch.' },
    { id: 'gap_fixed', icon: '🧩', title: 'Mind the gap', hint: 'Fill the gap in a broken circuit',
      how: ['build:gap', 'place:v31:wire', ON],
      saw: 'One wire was missing. Once the gap was filled and the switch closed, the bulb lit.',
      learn: 'A circuit must be complete. When a torch will not light, look for the gap: a loose wire, a bad connection, or a broken filament.',
      exam: 'Physics 2025 Q6(b)(iv): will the lamp light? Only if the circuit is complete.' },
    { id: 'series_dim', icon: '🔗', title: 'Two in series: dimmer', hint: 'Two bulbs, one after the other',
      how: ['build:series2', ON],
      saw: 'Two bulbs in one loop were both dim - each only a quarter as bright as one bulb alone.',
      formula: 'series: R = R₁ + R₂ = 3 Ω + 3 Ω = 6 Ω,  I = 1.5 V ÷ 6 Ω = 0.25 A',
      learn: 'In series the bulbs share the voltage of the cell and the total resistance is bigger, so less current flows and each bulb is dimmer.' },
    { id: 'series_break', icon: '💔', title: 'One out, all out', hint: 'Unscrew a bulb in a series circuit',
      how: ['build:series2', ON, 'bulb:h12:out'],
      saw: 'Unscrewing one bulb put the other one out too.',
      learn: 'A series circuit has only one path. Take out any part and the loop is broken, so the current stops everywhere.',
      exam: 'Why is a series circuit a poor choice for house lights? One broken lamp puts every other light out.' },
    { id: 'parallel_bright', icon: '🔀', title: 'Two in parallel: full brightness', hint: 'Give each bulb its own branch',
      how: ['build:parallel2', ON],
      saw: 'Each of the two bulbs was as bright as a single bulb on its own.',
      formula: '1/R = 1/3 + 1/3 → R = 1.5 Ω,  I = 1.5 V ÷ 1.5 Ω = 1.0 A (0.5 A in each branch)',
      learn: 'Each branch gets the full voltage of the cell, so each bulb carries the same current it would alone. The cell feeds both branches, so it supplies twice the current - and runs down twice as fast.',
      exam: 'The syllabus names series circuits, but the paper has asked a parallel-resistance sum: Physics 2022 Q5(b)(i), 1/R = 1/R₁ + 1/R₂.' },
    { id: 'parallel_independent', icon: '🧍', title: 'Each on its own', hint: 'Unscrew a bulb in a parallel circuit',
      how: ['build:parallel2', ON, 'bulb:h12:out'],
      saw: 'The other bulb stayed lit, just as bright as before.',
      learn: 'In parallel every bulb has its own path back to the cell. Breaking one branch leaves the others complete - which is why the lights in a house are wired in parallel.' },
    { id: 'more_cells', icon: '🔋', title: 'More cells, brighter bulb', hint: 'Add a second cell',
      how: ['build:twocells', ON],
      saw: 'With two cells the bulb was far brighter than with one.',
      formula: 'cells in series add: 1.5 V + 1.5 V = 3.0 V,  I = 3.0 V ÷ 3 Ω = 1.0 A',
      learn: 'Two cells in series give twice the voltage, so twice the current flows through the same bulb. It gets four times the power and glows much brighter - but too many cells would blow it.' },
    { id: 'cells_oppose', icon: '↔️', title: 'Cells facing each other', hint: 'Turn one of two cells round',
      how: ['build:twocells', ON, 'flip:h10'],
      saw: 'With one cell turned round the bulb went out, even though the loop was still complete.',
      formula: '+1.5 V − 1.5 V = 0 V (beyond the NCE syllabus)',
      learn: 'The two cells now push the charge in opposite directions, so they cancel out. The cells in a battery must face the same way: + of one against − of the next. (A good extra - beyond the NCE syllabus.)' },
    { id: 'ammeter_read', icon: '⏲️', title: 'Reading an ammeter', hint: 'Measure the current with an ammeter',
      how: ['build:meters', ON, READ],
      saw: 'The ammeter, in the loop with the bulb, read 0.50 A.',
      formula: 'current I, in amperes (A) - ammeter in series',
      learn: 'An ammeter is connected IN SERIES, so the current it measures passes through it. It has almost no resistance, so it does not change the current.',
      exam: 'Drawing a circuit diagram from a written description is Physics 2021 Q4(a), worth 4 marks: the ammeter goes in the loop.' },
    { id: 'voltmeter_read', icon: '🎚️', title: 'Reading a voltmeter', hint: 'Measure the voltage across the bulb',
      how: ['build:meters', ON, READ],
      saw: 'The voltmeter, connected across the bulb, read 1.50 V.',
      formula: 'potential difference V, in volts (V) - voltmeter across',
      learn: 'A voltmeter compares two points, so it goes ACROSS a component - one lead each side. Its huge resistance means almost no current goes through it.' },
    { id: 'same_current', icon: '🟰', title: 'The same all the way round', hint: 'Two ammeters in one series loop',
      how: ['build:ammeters2', ON, READ],
      saw: 'Two ammeters in different places in the loop read exactly the same: 0.25 A.',
      formula: 'series: the current is the same at every point',
      learn: 'Charge is not used up. In a single loop, every coulomb that leaves the cell passes every point and comes back, so the current is the same everywhere.' },
    { id: 'volts_share', icon: '➗', title: 'Sharing the voltage', hint: 'Measure across one of two bulbs in series',
      how: ['build:series_volts', ON, READ],
      saw: 'Across one of two bulbs in series the voltmeter read 0.75 V - half of the cell’s 1.5 V.',
      formula: 'series: V = V₁ + V₂ → 1.5 V = 0.75 V + 0.75 V',
      learn: 'In series the voltages across the components add up to the supply voltage. Two identical bulbs take half each.' },
    { id: 'resistor_dims', icon: '🟫', title: 'A resistor cuts the current', hint: 'Put a resistor in series with the bulb',
      how: ['build:resistor', ON],
      saw: 'With a 3 Ω resistor in the loop the bulb was dim, and the ammeter read 0.25 A instead of 0.50 A.',
      formula: 'V = IR → I = 1.5 V ÷ (3 Ω + 3 Ω) = 0.25 A',
      learn: 'Resistance opposes the current. More resistance in series means less current for the same voltage, so the bulb dims.',
      exam: 'Physics 2021 Q4(b)(i) asks you to define resistance: how much a component opposes the current (R = V ÷ I, in ohms).' },
    { id: 'fuse_blows', icon: '🧵', title: 'The fuse did its job', hint: 'Short out the bulb - with a fuse in the circuit',
      how: ['build:fuse', ON, 'place:h11:wire'],
      saw: 'The new wire gave the current a path round the bulb. The current shot up, the thin fuse wire melted, and the circuit was broken before anything else got hot.',
      formula: 'current above 3 A → the fuse melts → the circuit is broken',
      learn: 'A fuse is a deliberately weak link: a thin wire that melts when the current is too big. It protects the wires and the cell from the heat of a short circuit.' },
    { id: 'diagram_view', icon: '✏️', title: 'Draw it with symbols', hint: 'Switch to the circuit-diagram view',
      how: ['build:single', ON, 'view:symbols'],
      saw: 'The same circuit drawn with standard symbols: the cell as a long and a short line, the bulb as a circle with a cross, the switch as a lifted line.',
      learn: 'A circuit diagram uses standard symbols joined by straight lines, with the components in the same order round the loop as the real circuit.',
      exam: 'Physics 2023 Q1(c) gives circuit symbols as the answer options; Physics 2021 Q4(a) asks you to draw a circuit from a written description.' },
    { id: 'charge_flow', icon: '⏱️', title: 'Counting the charge', hint: 'Let the current flow for 10 seconds, then read',
      how: ['build:meters', ON, 'wait:10', READ],
      saw: 'After 10 s at 0.50 A, 5 C of charge had passed through the ammeter and 7.5 J had been transferred in the bulb.',
      formula: 'Q = It = 0.50 A × 10 s = 5.0 C;   W = QV = 5.0 C × 1.5 V = 7.5 J',
      learn: 'Current is the rate of flow of charge: one ampere is one coulomb every second. Potential difference is the energy per coulomb, so each coulomb gives the bulb 1.5 J.',
      exam: 'Q = It and W = QV are the two formulas the P5 syllabus names; Physics 2021 Q1(j) is a Q = It calculation.' },
  ];

  // ── Hazards: the mistakes that stop the experiment ───
  const HAZARDS = {
    short_circuit: {
      signs: ['hot'], fx: 'short',
      title: () => 'Short circuit - the wire is getting hot',
      happened: () => 'Your wire joined the two ends of the cell with nothing in between to use the energy. A huge current rushed round that short path: the wire and the cell got hot, and no bulb lit - the current took the easy way round.',
      why: 'A wire has almost no resistance, so nothing limits the current. It heats the wire and the cell very quickly: a real battery can leak, burn your fingers or even catch fire. Short circuits in mains wiring start house fires.',
      instead: 'Always keep something that uses the energy - a bulb or a resistor - in the loop. Never connect a wire straight across a cell. If a wire gets hot, open the switch at once.',
      exam: 'A short circuit is a path with almost no resistance. A fuse protects a circuit by melting when the current is too big. A safety precaution is asked on the NCE science papers (e.g. Chemistry 2022 Q5(a)(ii)).',
    },
  };

  // ── Wrong but safe: the mistakes that give no light, or a wrong number ───
  const RESULTS = {
    ammeter_parallel: {
      icon: '⏲️',
      title: () => 'The ammeter is across the bulb, not in the loop',
      happened: () => 'An ammeter has almost no resistance. Connected across the bulb, it gave the current an easy path round it: the bulb went out and the needle shot past the end of the scale. A real school ammeter would blow its own fuse.',
      instead: 'Connect an ammeter IN SERIES: break the loop and put the ammeter in the gap, so the current passes through it. Only a voltmeter goes across a component.',
      exam: 'Ammeter in series, voltmeter across (in parallel). Physics 2021 Q4(a) asks you to draw a circuit from a description - put each meter in the right place.',
    },
    voltmeter_series: {
      icon: '🎚️',
      title: () => 'The voltmeter is in the loop, not across the bulb',
      happened: c => `A voltmeter has a very high resistance. Standing in the loop, it let almost no current through: the bulb went out, and the voltmeter read ${c.v} V - the voltage of the battery, not of the bulb.`,
      instead: 'Put a wire back where the voltmeter was, so the loop is complete. Then connect the voltmeter ACROSS the bulb: one lead to each end of it.',
      exam: 'A voltmeter is connected across (in parallel with) the component whose voltage it measures.',
    },
    open_circuit: {
      icon: '🧩',
      title: () => 'Nothing lights - the circuit has a gap',
      happened: () => 'You closed the switch, but there is a gap somewhere in the loop. Charge cannot flow across a gap, so there is no current anywhere and the bulb stays off.',
      instead: 'Follow the loop with your finger from one end of the cell all the way back to the other. Every part must join the next - fill the empty space with a wire (the glowing outline shows where it goes).',
      exam: 'Physics 2025 Q6(b)(iv): will the lamp light, and why? It lights only when the circuit is complete (closed).',
    },
    bulb_blown: {
      icon: '💥',
      title: () => 'Too many cells - the bulb blew',
      happened: c => `With ${c.cells} cells (${c.v} V) across it, the bulb had far more voltage than it is made for. The current was so big that the thin filament overheated and melted: it flashed, then went dark for good.`,
      instead: 'Match the battery to the bulb. This bulb is made for up to 3 V - two cells. Put a wire in place of one cell, then tap the bulb with ✋ to fit a new one.',
      exam: 'More cells in series → more voltage → more current → a brighter bulb (until it blows). V = IR.',
    },
  };

  const SIGN_LABELS = { hot: 'Hot surface' };

  // Short, true facts for the 💡 button, tied to P5.
  const FACTS = [
    'Current is the rate of flow of charge: Q = It. One ampere means one coulomb of charge passing every second.',
    'Charge is not used up in a circuit - the same current comes back to the cell as leaves it. What the bulb uses is ENERGY.',
    'Potential difference is energy per unit charge: W = QV. A 1.5 V cell gives every coulomb 1.5 joules.',
    'Cells in series add their voltages: two 1.5 V cells make 3 V. A "battery" is really two or more cells joined together.',
    'In the symbol for a cell, the long thin line is the positive (+) terminal and the short thick line is the negative (−).',
    'An ammeter has almost no resistance, so it does not slow the current it measures. A voltmeter has a huge resistance, so almost no current goes through it.',
    'Houses are wired in parallel: every lamp gets the full voltage and can be switched on and off on its own.',
    'A fuse is a thin wire that melts if the current gets too big. It breaks the circuit before the wires overheat.',
    'Most of the energy a filament bulb takes in becomes heat, not light - that is why old bulbs got so hot.',
    'Resistance is measured in ohms (Ω), after the German physicist Georg Ohm. Resistance = voltage ÷ current.',
    'Mains electricity in Mauritius is 230 V - about 150 times the voltage of one cell. Never experiment with mains sockets.',
    'Wet skin conducts far better than dry skin. Never touch a switch or a plug with wet hands.',
  ];

  // ── Missions ──
  // A question's FIRST option is the answer; the quiz shuffles them.
  const MISSIONS = [
    {
      id: 'light', icon: '💡', title: 'Light the bulb',
      blurb: 'Build a circuit from nothing: a cell, a switch, a bulb and an ammeter in series. Then read the current.',
      intro: 'Light the bulb! The board is empty. Put a cell, a switch, a bulb and an ammeter in ONE loop, join the gaps with wire, close the switch and take a reading.',
      quiz: [
        { q: 'Which description is the circuit symbol for a cell?',
          options: ['A long thin line beside a short thick line', 'A circle with a cross inside it', 'A plain rectangle in the wire', 'A circle with the letter A inside it'],
          why: 'A cell is one long thin line (+) and one short thick line (−). A circle with a cross is a lamp; a circle with A is an ammeter; a rectangle is a resistor.' },
        { q: 'Before you closed the switch, the bulb did not light. Why?',
          options: ['The circuit was not complete, so no current could flow', 'The cell had no energy until the switch was closed', 'The ammeter was blocking the current', 'A bulb needs two cells before it will light'],
          why: 'An open switch is a gap. Charge can only flow round a complete (closed) loop.' },
        { q: 'How must an ammeter be connected to measure the current through a bulb?',
          options: ['In series with the bulb', 'Across (in parallel with) the bulb', 'Across the cell only', 'It does not need to be connected'],
          why: 'The current being measured has to pass through the ammeter, so it goes in the loop, in series.' },
        { q: 'Your ammeter read 0.50 A. What does it measure, and in what unit?',
          options: ['Current, in amperes', 'Voltage, in volts', 'Resistance, in ohms', 'Charge, in coulombs'],
          why: 'An ammeter measures current. The unit of current is the ampere (A).' },
        { q: 'A current of 0.5 A flows for 10 s. How much charge passes? (Q = It)',
          options: ['5 C', '0.05 C', '20 C', '10.5 C'],
          why: 'Q = It = 0.5 A × 10 s = 5 C.' },
        { q: 'A 1.5 V cell drives 0.5 A through the bulb. What is the resistance of the bulb?',
          options: ['3 Ω', '0.33 Ω', '0.75 Ω', '2 Ω'],
          why: 'Resistance = voltage ÷ current = 1.5 V ÷ 0.5 A = 3 Ω (V = IR).' },
      ],
    },
    {
      id: 'compare', icon: '🔀', title: 'Series or parallel?',
      blurb: 'Build two bulbs in series and in parallel, measure the current, unscrew a bulb in each - then answer the paper questions.',
      intro: 'Series or parallel? Lay out each circuit, close the switch, take a reading, then unscrew one bulb and watch the other.',
      quiz: [
        { q: 'Two identical bulbs are in series with one cell. Compared with one bulb on its own, each bulb is:',
          options: ['Dimmer', 'Brighter', 'Exactly as bright', 'Not lit at all'],
          why: 'In series they share the cell’s voltage and the current is halved, so each is dimmer.' },
        { q: 'In your series circuit you unscrewed one bulb. What happened to the other one?',
          options: ['It went out, because the only path was broken', 'It stayed lit at the same brightness', 'It became brighter', 'It flickered on and off'],
          why: 'A series circuit is a single loop. Break it anywhere and the current stops everywhere.' },
        { q: 'In your parallel circuit you unscrewed one bulb. What happened to the other one?',
          options: ['It stayed lit, because it has its own path', 'It went out as well', 'It became dimmer', 'It became much brighter'],
          why: 'Each branch of a parallel circuit is its own complete path back to the cell.' },
        { q: 'Why are the lights in a house wired in parallel?',
          options: ['Each light can work, and be switched, on its own', 'It makes every bulb dimmer and safer', 'It uses less wire than series', 'Parallel circuits need no switches'],
          why: 'In series one broken lamp would put every light out, and they would all share the voltage.' },
        { q: 'The ammeter read 0.25 A in series and 1.00 A in parallel. Why is the parallel current bigger?',
          options: ['Two branches side by side let more current flow in total', 'The cell becomes stronger in parallel', 'The bulbs store less charge in series', 'A parallel circuit has no resistance at all'],
          why: 'Side-by-side branches give a smaller total resistance (1.5 Ω instead of 6 Ω), so the same cell pushes more current.' },
        { q: 'Two 3 Ω bulbs are in parallel. What is their combined resistance? (1/R = 1/R₁ + 1/R₂)',
          options: ['1.5 Ω', '6 Ω', '3 Ω', '9 Ω'],
          why: '1/R = 1/3 + 1/3 = 2/3, so R = 1.5 Ω. In series it would be 3 + 3 = 6 Ω. (A parallel sum like this was asked in Physics 2022 Q5(b)(i).)' },
        { q: 'The current in a series circuit is measured at three different points. The readings are:',
          options: ['All the same', 'Smaller each time', 'Bigger each time', 'Largest in the middle'],
          why: 'There is only one path, and charge is not used up, so the current is the same everywhere in a series circuit.' },
      ],
    },
  ];

  // ── Guided experiments: "I landed here - what do I do?" ──
  // One action per step, in the discovery tokens above. A step with `btn` gets
  // a button in the yellow box that does it; the matching control glows. A
  // `wait:` step has no button: the bench moves it on.
  const GUIDES = [
    { id: 'light', icon: '💡', title: 'Light a bulb',
      blurb: 'Find the gap, complete the circuit, switch on - then draw it with symbols.',
      lesson: 'A bulb lights only when the circuit is COMPLETE: an unbroken loop from one terminal of the cell, through the bulb and back to the other. A gap or an open switch breaks the loop, so no current flows anywhere. A circuit diagram shows the same loop with standard symbols.',
      steps: [
        { on: 'build:gap',      say: 'Lay out a cell, a switch, a bulb and some wires on the board.',                                  btn: '🔌 Lay out the circuit' },
        { on: 'place:v31:wire', say: 'Follow the loop round from the cell. There is a gap on the right! Put a wire in the glowing space.', btn: '〰️ Put a wire in the gap' },
        { on: 'switch:on',      say: 'The loop is complete. Now close the switch.',                                                    btn: '🔘 Close the switch' },
        { on: 'switch:off',     say: 'It lights! Now open the switch again. What happens?',                                            btn: '🔘 Open the switch' },
        { on: 'view:symbols',   say: 'Now see the same circuit drawn with standard symbols - the way the exam draws it.',               btn: '✏️ Show the circuit symbols' },
      ] },
    { id: 'sp', icon: '🔀', title: 'Series or parallel?',
      blurb: 'Two bulbs, two ways. Which is brighter - and which keeps working?',
      lesson: 'In SERIES there is one path: the bulbs share the cell’s voltage, so each is dimmer, and one break puts them all out. In PARALLEL each bulb has its own path and the full voltage: each is as bright as a bulb alone, and one can go out while the other keeps working.',
      steps: [
        { on: 'build:series2',   say: 'Lay out two bulbs in SERIES - one after the other, in a single loop.',   btn: '🔌 Lay out two bulbs in series' },
        { on: 'switch:on',       say: 'Close the switch. How bright are the bulbs?',                           btn: '🔘 Close the switch' },
        { on: 'bulb:h12:out',    say: 'Both dim. Now unscrew one of the bulbs.',                               btn: '🔧 Unscrew a bulb' },
        { on: 'build:parallel2', say: 'Both went out! Now lay out two bulbs in PARALLEL - each on its own branch.', btn: '🔌 Lay out two bulbs in parallel' },
        { on: 'switch:on',       say: 'Close the switch. Compare the brightness.',                             btn: '🔘 Close the switch' },
        { on: 'bulb:h12:out',    say: 'Both bright! Unscrew one bulb again.',                                  btn: '🔧 Unscrew a bulb' },
      ] },
    { id: 'meters', icon: '⏲️', title: 'Measure current and voltage',
      blurb: 'Use an ammeter and a voltmeter - then add a second cell.',
      lesson: 'The ammeter, in SERIES, measured the current: 0.50 A with one cell, 1.00 A with two. The voltmeter, ACROSS the bulb, read 1.50 V, then 3.00 V. Double the voltage, double the current: the bulb’s resistance stayed at V ÷ I = 3 Ω.',
      steps: [
        { on: 'build:meters',   say: 'Lay out a circuit with an ammeter in the loop and a voltmeter across the bulb.', btn: '🔌 Lay out the circuit' },
        { on: 'switch:on',      say: 'Close the switch.',                                                          btn: '🔘 Close the switch' },
        { on: 'read',           say: 'Take a reading from both meters.',                                           btn: '📝 Take a reading' },
        { on: 'place:h10:cell', say: 'Now add a second cell, in series with the first (in the glowing space).',     btn: '🔋 Add a second cell' },
        { on: 'read',           say: 'Take a reading again. What changed?',                                        btn: '📝 Take a reading' },
      ] },
  ];

  return { COLS, ROWS, NODES, EMF, R, SHORT_A, FUSE_A, BULB_MAX_V, P_REF, LIT, FS,
           SLOTS, SYMBOL, KINDS, TOOLS, PRESETS, QUICK, layoutOf,
           solve, loopThrough, hasGap, fusesOver, diagnose, arrangement, ARR_NAMES, brightnessWord,
           switchControls, ammeterInSeries, litBulbs,
           charge, energy, resistance, seriesR, parallelR, round2, reading,
           DISCOVERIES, HAZARDS, RESULTS, SIGN_LABELS, FACTS, MISSIONS, GUIDES };
})();
if (typeof window !== 'undefined') window.LabCircuitData = LabCircuitData;
