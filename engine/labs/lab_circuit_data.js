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
//
//  ⚠ THREE LEVELS (docs/labs/LAB_SPEC.md §9). Content with no `grades` is the
//    original Grade 9 set. The PSAC levels are grounded in the app's own banks:
//    - Grade 4: g4sci-materials ("Which of these is a good ELECTRICAL
//      CONDUCTOR?", copper inside / plastic or rubber outside) and g4sci-energy
//      (a torch's battery stores chemical energy, a bulb gives light and some
//      heat, switch off to save energy). No circuit symbols at Grade 4.
//    - Grade 6: g6-energy (the wire carries the current, the cell stores
//      chemical energy, insulators, copper wire, safety at home), depth_hard
//      ("chemical → electrical → light and heat") and exam_depth (copper is a
//      conductor, the plastic covering an insulator). Symbols are NOT in the
//      Grade 6 bank, so they are offered as a labelled extra only.
//    Paper references are quoted only from past_paper_*.js: PSAC 2024 Q1 (the
//    energy at the output of a switched-on television) and PSAC 2023 (why
//    used cells must not be thrown into the environment).
//    - Grade 7 (NCE, lower secondary): g7s-electricity in
//      subjects/grade7-science - "Identify the main parts of an electric
//      circuit. Recognise cells, batteries, bulbs, switches and resistors. Draw
//      circuits using conventional symbols. Investigate the workings of simple
//      circuits." The bank asks: which symbol is the switch/cell/lamp/resistor
//      (-003, -004, -009, -010, -017), a diagram with a gap (-018, hd-064),
//      series vs parallel and house wiring (-006, -012, -016, hd-061..063),
//      more cells = brighter, then burnt out (-011, hd-069), three 1.5 V cells
//      = 4.5 V (-020), ammeter in series / voltmeter across and the units A, V,
//      Ω (-008, -013, -015, -019), the resistor limits the current (-007),
//      copper conducts / plastic insulates (-014, hd-070), the fuse (hd-066),
//      why symbols are standard (hd-067). NO numerical V = IR, Q = It or W = QV:
//      those are Grade 9. There is no Grade 7 past paper in the app, so no
//      paper is quoted; the exam heading is "📝 In your exams".
//    Progress never collides: every id below Grade 9 carries its grade (g4_…,
//    g6_…, g7_…).
// ══════════════════════════════════════════════
const LabCircuitData = (() => {
  const GRADES = [4, 6, 7, 9];
  const forGrade = (list, g) => list.filter(x => (x.grades || [9]).includes(g));
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

  // ── Primary: things to test in the gap (Grades 4 and 6) ──
  // A pencil lead is graphite: it conducts, but far less well than a metal, so
  // in series with the 3 Ω bulb (R = 3 Ω) the bulb glows at a quarter of its
  // normal brightness - dim, as it does in a school tester. Metals are
  // milliohms. Dry rubber, plastic and wood are insulators (conductance 0).
  const OBJECTS = {
    spoon:  { name: 'Metal spoon',   icon: '🥄', made: 'steel, a metal',         metal: true,  R: 0.001 },
    coin:   { name: 'Coin',          icon: '🪙', made: 'metal',                  metal: true,  R: 0.001 },
    lead:   { name: 'Pencil lead',   icon: '✏️', made: 'graphite, not a metal',  metal: false, R: 3 },
    rubber: { name: 'Rubber',        icon: '⬜', made: 'rubber',                 metal: false, R: 0 },
    ruler:  { name: 'Plastic ruler', icon: '📏', made: 'plastic',                metal: false, R: 0 },
    stick:  { name: 'Wooden stick',  icon: '🪵', made: 'dry wood',               metal: false, R: 0 },
  };
  const TEST_OBJECTS = Object.keys(OBJECTS);
  for (const [k, o] of Object.entries(OBJECTS))
    KINDS[k] = { name: o.name, icon: o.icon, meta: 'Made of ' + o.made, job: `A thing to test. It is made of ${o.made}. Put it in a gap and close the switch.`, obj: true };
  // What each part does, in Grade 4-6 words (the Grade 9 text talks of charge and terminals).
  const JOBS_P = {
    wire:   'Joins the parts. Copper inside carries the electricity; plastic outside keeps you safe.',
    cell:   'Gives the circuit its energy. A battery is one or more cells.',
    bulb:   'Lights up when electricity flows through it.',
    switch: 'Opens and closes a gap in the circuit.',
  };
  // Grade 7: what each part does, in the words of the Grade 7 bank (the Grade 9
  // text talks of charge and terminals; Grade 7 names the symbol).
  const JOBS_7 = {
    wire:      'Joins the parts. Copper inside conducts the current; plastic outside is an insulator.',
    cell:      'Provides the energy that pushes the current round. In its symbol the long line is + and the short line is −.',
    bulb:      'A lamp. It lights when a current flows through it. Its symbol is a circle with a cross.',
    switch:    'Opens and closes the circuit. Open, it leaves a gap; closed, it completes the loop.',
    ammeter:   'Measures the current, in amperes (A). It goes IN SERIES, in the loop.',
    voltmeter: 'Measures the voltage across a part, in volts (V). It goes ACROSS the part, one lead each side.',
    resistor:  'Limits the current, so less of it flows. Its symbol is a plain rectangle.',
    fuse:      'A thin wire that melts if the current gets too big, and so breaks the circuit.',
  };
  const TOOLS_P = ['hand', 'wire', 'cell', 'bulb', 'switch', 'eraser'];
  const toolsFor = g => (g <= 6 ? TOOLS_P : TOOLS);
  const kindsFor = g => (g <= 6 ? ['wire', 'cell', 'bulb', 'switch'] : ['wire', 'cell', 'bulb', 'switch', 'ammeter', 'voltmeter', 'resistor', 'fuse']);
  // Grade 4 draws pictures only; Grade 6 sees symbols as an extra; Grades 7 and 9 as the syllabus draws them.
  const symbolsFor = g => g !== 4;

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
    // Primary
    tester:       P('A tester with a gap for testing things', { v31: null }),
    switch_right: P('A circuit with the switch on the other side', { v00: 'wire', v31: 'switch' }),
    broken:       P('A torch that does not work', { v31: null, h12: 'bulb:out' }),
    // Grade 7: the only switch is on one branch, as a light switch is in a house.
    branch_switch: P('Two lamps in parallel, a switch on one branch', { h11: 'bulb', v11: 'switch', v21: 'wire', v00: 'wire' }),
  };
  // Quick layouts offered on the shelf (the others belong to guides and missions).
  const QUICK = ['single', 'series2', 'parallel2', 'twocells', 'meters', 'resistor', 'fuse'];
  const QUICK_BY_GRADE = { 4: ['single', 'gap', 'tester'], 6: ['single', 'tester', 'twocells', 'switch_right'],
                           7: ['single', 'series2', 'parallel2', 'branch_switch', 'twocells', 'resistor', 'fuse'], 9: QUICK };
  // The gap a tester leaves for the thing being tested.
  const TEST_SLOT = 'v31';

  // A part is written 'kind' or 'kind:out' (a bulb unscrewed from its holder).
  function layoutOf(id) {
    const p = PRESETS[id], out = {};
    if (!p) return out;
    for (const [slot, spec] of Object.entries(p.parts)) {
      if (!spec) continue;
      const [kind, state] = spec.split(':');
      out[slot] = kind === 'switch' ? { kind, open: true } : state === 'out' ? { kind, out: true } : { kind };
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
    const o = OBJECTS[p.kind];
    return o && o.R ? 1 / o.R : 0;
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

  // ── Primary: testing things in a gap ──────────
  // A fair test: every switch closed, no short circuit, and with a plain wire
  // in place of the object the bulb WOULD light. Then the object is a conductor
  // if the bulb lights and an insulator if it stays dark. Otherwise null (the
  // rest of the circuit is not working, so the test says nothing yet).
  function testResult(layout, slot) {
    const p = layout[slot];
    if (!p || !OBJECTS[p.kind]) return null;
    if (Object.values(layout).some(q => q && q.kind === 'switch' && q.open)) return null;
    const sol = solve(layout);
    if (sol.short) return null;
    const s2 = solve(Object.assign({}, layout, { [slot]: { kind: 'wire' } }));
    if (s2.short || !litBulbs(s2).length) return null;
    return litBulbs(sol).length ? 'conductor' : 'insulator';
  }
  function objectTests(layout) {
    return Object.keys(layout).sort().filter(k => layout[k] && OBJECTS[layout[k].kind])
      .map(slot => ({ slot, obj: layout[slot].kind, result: testResult(layout, slot) }));
  }

  // Are the meters where they belong? An ammeter carrying the cell's current to
  // a lit lamp, and a voltmeter whose reading is the voltage of a lit lamp.
  function meterChecks(sol) {
    const lit = litBulbs(sol);
    const across = Object.keys(sol.meters).sort().filter(k => sol.meters[k].kind === 'voltmeter' && sol.meters[k].value > 0.1
      && lit.some(b => Math.abs(sol.bulbs[b].V - sol.meters[k].value) < 0.02));
    return { ammeter: lit.length > 0 && Object.keys(sol.meters).some(k => ammeterInSeries(sol, k)),
             voltmeter: across.length > 0, volts: across.map(k => sol.meters[k].value) };
  }
  // One loop: every part of these kinds carries the whole of the cell's current.
  function oneLoop(sol, kinds) {
    const els = sol.els.filter(e => kinds.includes(e.kind));
    return sol.flowing && kinds.every(k => els.some(e => e.kind === k)) && els.every(e => Math.abs(Math.abs(e.I) - sol.cellI) < 1e-3);
  }

  // What a Grade 4/6/7 pupil has just shown, as the facts their discoveries
  // are unlocked by (their `when`). o = { layout, sol, prev (the solution before
  // the change), evt, view, tests (object → result so far), gapFilled, warm,
  // fuse (a fuse has just melted) }.
  const WHENS = ['lit', 'switch_off', 'switch_moved', 'gap_fixed', 'unscrew', 'warm', 'brighter', 'symbols', 'sorted',
    'conductor:metal', 'insulator:any', ...TEST_OBJECTS.flatMap(x => ['conductor:' + x, 'insulator:' + x]),
    'series_two', 'series_break', 'parallel_two', 'parallel_keeps', 'branch_off', 'resistor_dims',
    'ammeter_series', 'voltmeter_across', 'cells_add', 'fuse_melts'];
  function facts(o) {
    const f = new Set(), sol = o.sol, lit = litBulbs(sol), prevLit = o.prev ? litBulbs(o.prev) : [], evt = o.evt || '';
    if (lit.length) f.add('lit');
    if (lit.length && o.gapFilled) f.add('gap_fixed');
    if (evt === 'switch:off' && prevLit.length && !lit.length) {
      f.add('switch_off');
      const sw = Object.keys(o.layout).filter(k => o.layout[k].kind === 'switch');
      if (sw.length && !sw.includes('v00')) f.add('switch_moved');
    }
    if (/^bulb:.*:out$/.test(evt) && prevLit.length && !lit.length) f.add('unscrew');
    if (lit.some(k => sol.bulbs[k].brightness >= 3)) f.add('brighter');
    if (o.view === 'symbols' && lit.length) f.add('symbols');
    if (o.warm && lit.length) f.add('warm');
    for (const t of objectTests(o.layout)) {
      if (!t.result) continue;
      f.add(t.result + ':' + t.obj);
      if (t.result === 'conductor' && OBJECTS[t.obj].metal) f.add('conductor:metal');
      if (t.result === 'insulator') f.add('insulator:any');
    }
    if (o.tests && TEST_OBJECTS.every(x => o.tests[x])) f.add('sorted');
    // Grade 7: series and parallel, the resistor, the meters, the fuse.
    const arr = arrangement(sol), prevArr = o.prev ? arrangement(o.prev) : 'none';
    if (arr === 'series' && lit.length === 2) f.add('series_two');
    if (arr === 'parallel' && lit.length === 2 && lit.every(k => sol.bulbs[k].brightness >= 0.9)) f.add('parallel_two');
    if (/^bulb:.*:out$/.test(evt)) {
      if (prevArr === 'series' && !lit.length) f.add('series_break');
      if (prevArr === 'parallel' && lit.length === 1 && sol.bulbs[lit[0]].brightness >= 0.9) f.add('parallel_keeps');
    }
    if (evt === 'switch:off' && prevLit.length >= 2 && lit.length && lit.length < prevLit.length) f.add('branch_off');
    const res = sol.els.filter(e => e.kind === 'resistor' && Math.abs(e.I) > 0.01);
    if (res.length && lit.some(k => Math.abs(sol.bulbs[k].I - Math.abs(res[0].I)) < 1e-3 && sol.bulbs[k].brightness < 0.5)) f.add('resistor_dims');
    if (evt === 'read') {
      const m = meterChecks(sol);
      if (m.ammeter) f.add('ammeter_series');
      if (m.voltmeter) f.add('voltmeter_across');
      if (sol.cells >= 2 && m.volts.some(v => Math.abs(v - sol.cells * EMF) < 0.02)) f.add('cells_add');
    }
    if (o.fuse) f.add('fuse_melts');
    return f;
  }

  // The wrong-but-safe mistakes at Grades 4 and 6 (the result card to show, or
  // null). An insulator in the loop is a TEST, not a gap: no card for it.
  function primaryMistake(layout, sol, evt) {
    const parts = Object.values(layout).filter(Boolean);
    const closed = parts.every(p => p.kind !== 'switch' || !p.open);
    const bulb = parts.some(p => p.kind === 'bulb');
    const insulated = objectTests(layout).some(t => t.result === 'insulator');
    if (/^(switch:on$|flip:|place:.*:cell$)/.test(evt || '') && closed && bulb && sol.cells >= 2 && sol.cellI < 1e-3 && !hasGap(layout) && !insulated) return 'cells_wrong';
    if (evt === 'switch:on' && bulb && !sol.cells) return 'no_cell';
    if (evt === 'switch:on' && hasGap(layout) && !insulated) return 'open_circuit';
    return null;
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
      saw: 'Across one of two bulbs in series the voltmeter read 0.75 V - half of the cell\'s 1.5 V.',
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

    // ── Grade 4 (g4sci-materials, g4sci-energy) ──
    // A primary discovery is unlocked by its `when` fact (see facts() above).
    { id: 'g4_light', grades: [4], when: 'lit', icon: '💡', title: 'The bulb lights up', hint: 'Close the switch on a complete circuit',
      how: ['build:single', ON],
      saw: 'You closed the switch and the bulb lit up. The moving dots show electricity flowing.',
      learn: 'Electricity flows only round a complete loop. We call the loop a circuit. It goes from the cell, through the wires and the bulb, and back.',
      exam: 'A torch lights only when its circuit is complete.' },
    { id: 'g4_switch', grades: [4], when: 'switch_off', icon: '🔘', title: 'Switch off, light off', hint: 'Open the switch while the bulb is lit',
      how: ['build:single', ON, OFF],
      saw: 'You opened the switch. The bulb went out at once.',
      learn: 'An open switch makes a gap in the circuit, so the electricity stops. Switch off lights you are not using. It saves energy.' },
    { id: 'g4_gap', grades: [4], when: 'gap_fixed', icon: '🧩', title: 'Mind the gap', hint: 'Fill the gap in a broken circuit',
      how: ['build:gap', 'place:v31:wire', ON],
      saw: 'One wire was missing. You put it back, closed the switch, and the bulb lit.',
      learn: 'Every part must join the next. A missing wire leaves a gap, and electricity cannot jump across it.' },
    { id: 'g4_loose', grades: [4], when: 'unscrew', icon: '🔧', title: 'A loose bulb', hint: 'Unscrew the bulb while it is lit',
      how: ['build:single', ON, 'bulb:h12:out'],
      saw: 'You unscrewed the bulb and the light went out.',
      learn: 'A loose bulb makes a gap too. If a torch will not light, check that the bulb is screwed in.' },
    { id: 'g4_warm', grades: [4], when: 'warm', icon: '🔥', title: 'Light and heat', hint: 'Leave a bulb on for 10 seconds',
      how: ['build:single', ON, 'wait:10'],
      saw: 'The bulb stayed on for 10 seconds. It gave out light, and it got warm.',
      formula: 'electrical energy → light energy + heat energy',
      learn: 'A bulb changes electrical energy into light. It gives out some heat as well. That is why an old bulb feels hot.' },
    { id: 'g4_spoon', grades: [4], when: 'conductor:spoon', icon: '🥄', title: 'A spoon lets it through', hint: 'Test the metal spoon in the gap',
      how: ['build:tester', 'place:v31:spoon', ON],
      saw: 'With the metal spoon in the gap, the bulb lit up.',
      learn: 'The spoon is made of metal. Metals let electricity pass through them. A material that does this is a conductor.',
      exam: 'Most metals are good conductors of electricity.' },
    { id: 'g4_coin', grades: [4], when: 'conductor:coin', icon: '🪙', title: 'A coin lets it through', hint: 'Test the coin in the gap',
      how: ['build:tester', 'place:v31:coin', ON],
      saw: 'With the coin in the gap, the bulb lit up.',
      learn: 'A coin is metal, so it is a conductor. Electricity passes through it easily.' },
    { id: 'g4_lead', grades: [4], when: 'conductor:lead', icon: '✏️', title: 'Pencil lead conducts!', hint: 'Test the pencil lead in the gap',
      how: ['build:tester', 'place:v31:lead', ON],
      saw: 'With the pencil lead in the gap, the bulb lit up, but only dimly.',
      learn: 'Pencil lead is graphite, not metal. It is a conductor, but not a very good one. So the bulb glows dimly.' },
    { id: 'g4_rubber', grades: [4], when: 'insulator:rubber', icon: '⬜', title: 'Rubber stops it', hint: 'Test the rubber in the gap',
      how: ['build:tester', 'place:v31:rubber', ON],
      saw: 'With the rubber in the gap, the bulb stayed dark.',
      learn: 'Rubber does not let electricity pass. A material like this is an insulator. Rubber on a cable keeps you safe from shocks.' },
    { id: 'g4_ruler', grades: [4], when: 'insulator:ruler', icon: '📏', title: 'Plastic stops it', hint: 'Test the plastic ruler in the gap',
      how: ['build:tester', 'place:v31:ruler', ON],
      saw: 'With the plastic ruler in the gap, the bulb stayed dark.',
      learn: 'Plastic is an insulator. That is why wires are covered in plastic. You can touch them safely.' },
    { id: 'g4_stick', grades: [4], when: 'insulator:stick', icon: '🪵', title: 'Wood stops it', hint: 'Test the wooden stick in the gap',
      how: ['build:tester', 'place:v31:stick', ON],
      saw: 'With the wooden stick in the gap, the bulb stayed dark.',
      learn: 'Dry wood is an insulator. Electricity cannot pass through it.' },
    { id: 'g4_sorted', grades: [4], when: 'sorted', icon: '🗂️', title: 'All sorted!', hint: 'Test all six things, one after another',
      how: ['build:tester', 'place:v31:spoon', ON, 'place:v31:coin', 'place:v31:lead', 'place:v31:rubber', 'place:v31:ruler', 'place:v31:stick'],
      saw: 'You tested all six things. Three lit the bulb and three did not.',
      formula: 'conductors: spoon, coin, pencil lead  ·  insulators: rubber, plastic ruler, wooden stick',
      learn: 'Conductors let electricity through. Insulators stop it. A wire uses both: copper inside to carry it, plastic outside for safety.',
      exam: 'Know why a wire is copper inside and plastic outside.' },

    // ── Grade 6 (g6-energy, g6-materials) ──
    { id: 'g6_circuit', grades: [6], when: 'lit', icon: '💡', title: 'A complete circuit', hint: 'Close the switch on a complete circuit',
      how: ['build:single', ON],
      saw: 'You closed the switch and the bulb lit up. The dots show the electric current.',
      learn: 'The cell pushes an electric current round the circuit. The wire carries the current. The bulb uses it to make light.',
      exam: 'Know the job of each part: the cell gives energy, the wire carries the current, the switch opens and closes the circuit.' },
    { id: 'g6_switch', grades: [6], when: 'switch_off', icon: '🔘', title: 'The switch breaks the circuit', hint: 'Open the switch while the bulb is lit',
      how: ['build:single', ON, OFF],
      saw: 'You opened the switch. The current stopped and the bulb went out.',
      learn: 'An open switch is a gap. The current stops everywhere in the loop, not only near the switch.' },
    { id: 'g6_anywhere', grades: [6], when: 'switch_moved', icon: '↪️', title: 'A switch works anywhere', hint: 'Use a switch on the other side of the circuit',
      how: ['build:switch_right', ON, OFF],
      saw: 'The switch was on the other side of the bulb. It still turned the bulb off.',
      learn: 'There is only one loop, so a gap anywhere stops the current. The switch can go before or after the bulb.' },
    { id: 'g6_fault', grades: [6], when: 'gap_fixed', icon: '🧩', title: 'Find the fault', hint: 'Mend a circuit that has a gap',
      how: ['build:gap', 'place:v31:wire', ON],
      saw: 'A wire was missing. With it back and the switch closed, the bulb lit.',
      learn: 'When a torch will not work, look for the fault. It may be a gap, a loose bulb, or a cell the wrong way round.' },
    { id: 'g6_loose', grades: [6], when: 'unscrew', icon: '🔧', title: 'A loose bulb is a gap', hint: 'Unscrew the bulb while it is lit',
      how: ['build:single', ON, 'bulb:h12:out'],
      saw: 'You unscrewed the bulb. The current stopped and the light went out.',
      learn: 'The current must pass through the bulb. A loose bulb breaks the circuit, just like a gap.' },
    { id: 'g6_metal', grades: [6], when: 'conductor:metal', icon: '🪙', title: 'Metals conduct', hint: 'Test a coin or a metal spoon in the gap',
      how: ['build:tester', 'place:v31:coin', ON],
      saw: 'With the metal in the gap, the bulb lit up brightly.',
      learn: 'Metals are good conductors of electricity. That is why the inside of an electric wire is copper, a metal.',
      exam: 'Copper is used for wires because it is a good conductor and bends easily.' },
    { id: 'g6_graphite', grades: [6], when: 'conductor:lead', icon: '✏️', title: 'A non-metal that conducts', hint: 'Test the pencil lead in the gap',
      how: ['build:tester', 'place:v31:lead', ON],
      saw: 'The pencil lead lit the bulb, but only dimly.',
      learn: 'Pencil lead is graphite. It is not a metal, yet it conducts. It lets less current through than a metal, so the bulb is dim.' },
    { id: 'g6_insulate', grades: [6], when: 'insulator:any', icon: '📏', title: 'Insulators stop the current', hint: 'Test the plastic ruler in the gap',
      how: ['build:tester', 'place:v31:ruler', ON],
      saw: 'With the plastic in the gap, the bulb stayed dark.',
      learn: 'Plastic, rubber and wood are insulators. The plastic coating on a wire stops the current reaching your hand.',
      exam: 'The plastic covering of a wire is an insulator; the copper inside is a conductor.' },
    { id: 'g6_brighter', grades: [6], when: 'brighter', icon: '🔋', title: 'Two cells, brighter bulb', hint: 'Use two cells instead of one',
      how: ['build:twocells', ON],
      saw: 'With two cells the bulb was much brighter than with one.',
      learn: 'Two cells in a row push harder than one, so more current flows through the bulb. Too many cells would blow it.' },
    { id: 'g6_energy', grades: [6], when: 'warm', icon: '🔥', title: 'From cell to light', hint: 'Leave a bulb on for 10 seconds',
      how: ['build:single', ON, 'wait:10'],
      saw: 'After 10 seconds the bulb was still shining, and it had got warm.',
      formula: 'chemical energy (cell) → electrical energy → light + heat',
      learn: 'The cell stores chemical energy. In the circuit it becomes electrical energy. The bulb changes it into light and some heat.',
      exam: 'PSAC 2024 Q1 asked for the energy coming out of a switched-on television. Name the energy going in and coming out.' },
    { id: 'g6_symbols', grades: [6], when: 'symbols', icon: '✏️', title: 'Draw it with symbols', hint: 'Switch to the symbols view',
      how: ['build:single', ON, 'view:symbols'],
      saw: 'The same circuit, drawn with simple symbols instead of pictures.',
      formula: 'cell: a long and a short line  ·  bulb: a circle with a cross  ·  switch: a lifted line',
      learn: 'Scientists draw circuits with symbols. This is an extra: you will use it at secondary school. It is beyond the PSAC syllabus.' },

    // ── Grade 7 (g7s-electricity: circuit_parts, circuit_symbols, simple_circuits) ──
    { id: 'g7_circuit', grades: [7], when: 'lit', icon: '💡', title: 'A complete circuit', hint: 'Close the switch on a complete circuit',
      how: ['build:single', ON],
      saw: 'You closed the switch and the lamp lit. The moving dots show the current flowing all the way round the loop.',
      formula: 'cell → wire → switch → wire → lamp → wire → back to the cell',
      learn: 'A circuit is a complete loop. The cell provides the energy, the wires carry the current, and the lamp changes the energy into light and some heat. Break the loop anywhere and the current stops.',
      exam: 'Know the job of each part: the cell provides the energy, the switch opens and closes the circuit, the lamp gives out light.' },
    { id: 'g7_switch', grades: [7], when: 'switch_off', icon: '🔘', title: 'Open switch, no current', hint: 'Open the switch while the lamp is lit',
      how: ['build:single', ON, OFF],
      saw: 'You opened the switch. The lamp went out and the dots stopped everywhere in the loop.',
      learn: 'A switch is a gap you can close. Open (off), it breaks the circuit, so no current flows anywhere - not only near the switch. Closed (on), the loop is complete again.',
      exam: 'In a circuit diagram, an open switch is drawn as a line lifted away from its contact.' },
    { id: 'g7_gap', grades: [7], when: 'gap_fixed', icon: '🧩', title: 'Find the break', hint: 'Mend a circuit that has a gap in its wire',
      how: ['build:gap', 'place:v31:wire', ON],
      saw: 'A wire was missing on the right. You filled the gap, closed the switch, and the lamp lit.',
      learn: 'Trace a circuit with your finger, on the board or in a diagram, from the cell all the way round. A break anywhere makes an open circuit, and no current flows.',
      exam: 'A diagram shows a lamp that does not light: look for a break in the wire before you blame the cell or the lamp.' },
    { id: 'g7_symbols', grades: [7], when: 'symbols', icon: '✏️', title: 'Circuit symbols', hint: 'Switch to the circuit-diagram view with the lamp lit',
      how: ['build:single', ON, 'view:symbols'],
      saw: 'The same circuit, drawn as a circuit diagram: standard symbols joined by straight wires.',
      formula: 'cell: a long line (+) and a short line (−) · lamp: a circle with a cross · switch: a lifted line · resistor: a plain rectangle',
      learn: 'Standard symbols mean anyone can read a diagram, whatever language they speak. Wires are drawn straight, with square corners: what matters is what joins to what.',
      exam: 'Exam questions show four symbols and ask which one is the switch, the cell, the lamp or the resistor.' },
    { id: 'g7_resistor', grades: [7], when: 'resistor_dims', icon: '🟫', title: 'A resistor limits the current', hint: 'Put a resistor in the loop with the lamp',
      how: ['build:resistor', ON],
      saw: 'With a resistor in the loop the lamp was dim, and the ammeter read 0.25 A instead of 0.50 A.',
      formula: 'more resistance → less current → a dimmer lamp',
      learn: 'A resistor opposes the current, so less current flows round the whole loop. Resistance is measured in ohms (Ω). Resistors protect other parts from too big a current.',
      exam: 'The symbol for a resistor is a plain rectangle. Its job is to limit the current.' },
    { id: 'g7_series', grades: [7], when: 'series_two', icon: '🔗', title: 'Two lamps in series', hint: 'Put two lamps one after the other in one loop',
      how: ['build:series2', ON],
      saw: 'Two lamps in one loop both lit, but both were dim.',
      learn: 'In series there is only one path for the current. The two lamps share the voltage of the cell, so each one gets less and glows dimly.' },
    { id: 'g7_series_out', grades: [7], when: 'series_break', icon: '💔', title: 'One out, all out', hint: 'Unscrew a lamp in a series circuit',
      how: ['build:series2', ON, 'bulb:h12:out'],
      saw: 'You unscrewed one lamp, and the other went out too.',
      learn: 'A series circuit is a single loop. Take out any part and the loop is broken, so the current stops everywhere.',
      exam: 'Two lamps in series: if one breaks, the other goes off as well.' },
    { id: 'g7_parallel', grades: [7], when: 'parallel_two', icon: '🔀', title: 'Two lamps in parallel', hint: 'Give each lamp its own branch',
      how: ['build:parallel2', ON],
      saw: 'Each of the two lamps was as bright as one lamp on its own.',
      learn: 'In parallel each lamp sits on its own branch and gets the full voltage of the cell, so each glows at full brightness. The cell has to supply both branches.' },
    { id: 'g7_parallel_on', grades: [7], when: 'parallel_keeps', icon: '🧍', title: 'Each on its own path', hint: 'Unscrew a lamp in a parallel circuit',
      how: ['build:parallel2', ON, 'bulb:h12:out'],
      saw: 'You unscrewed one lamp. The other stayed lit, just as bright as before.',
      learn: 'Each branch of a parallel circuit is its own complete path back to the cell. Breaking one branch leaves the others working.',
      exam: 'Two lamps in parallel: if one breaks, the other stays on.' },
    { id: 'g7_branch', grades: [7], when: 'branch_off', icon: '🏠', title: 'Wired like a house', hint: 'Open a switch that sits on one branch only',
      how: ['build:branch_switch', ON, OFF],
      saw: 'The switch was on one branch. Opening it put out its own lamp, and the other lamp stayed on.',
      learn: 'A switch controls only the branch it is on. The lights in a house are in parallel, each with its own switch, so each one can be switched on and off by itself.',
      exam: 'Why are house lights wired in parallel? Each can be switched on its own, and one broken lamp does not put out the rest.' },
    { id: 'g7_cells', grades: [7], when: 'cells_add', icon: '🔋', title: 'Cells in series add up', hint: 'Measure across the lamp with two cells in series',
      how: ['build:meters', 'place:h10:cell', ON, READ],
      saw: 'With two cells in series the voltmeter read 3.00 V across the lamp, and the lamp was far brighter.',
      formula: '1.5 V + 1.5 V = 3.0 V   (three cells: 1.5 V + 1.5 V + 1.5 V = 4.5 V)',
      learn: 'Cells joined end to end, in series, add their voltages. A battery is two or more cells joined together. A bigger voltage pushes a bigger current, so the lamp is brighter - but too many cells burn it out.',
      exam: 'Three 1.5 V cells in series make a 4.5 V battery.' },
    { id: 'g7_ammeter', grades: [7], when: 'ammeter_series', icon: '⏲️', title: 'Using an ammeter', hint: 'Take a reading with an ammeter in the loop',
      how: ['build:meters', ON, READ],
      saw: 'The ammeter, in the loop with the lamp, read 0.50 A.',
      formula: 'current is measured in amperes (A) - ammeter IN SERIES',
      learn: 'The current you want to measure must flow through the ammeter, so it goes in the loop, in series. It has almost no resistance, so it does not change the current.',
      exam: 'An ammeter measures current, in amperes, and is always connected in series.' },
    { id: 'g7_voltmeter', grades: [7], when: 'voltmeter_across', icon: '🎚️', title: 'Using a voltmeter', hint: 'Take a reading with a voltmeter across the lamp',
      how: ['build:meters', ON, READ],
      saw: 'The voltmeter, connected across the lamp, read 1.50 V: the voltage of the cell.',
      formula: 'voltage is measured in volts (V) - voltmeter ACROSS the part',
      learn: 'A voltmeter compares the two ends of a part, so it goes across it, in parallel: one lead on each side. Almost no current flows through it.',
      exam: 'A voltmeter measures the voltage across a part, in volts, and is connected in parallel with it.' },
    { id: 'g7_fuse', grades: [7], when: 'fuse_melts', icon: '🧵', title: 'The fuse did its job', hint: 'Make a short cut round the lamp - with a fuse in the loop',
      how: ['build:fuse', ON, 'place:h11:wire'],
      saw: 'The new wire made a short cut round the lamp. The current shot up, the thin fuse wire melted, and the circuit was broken before anything else got hot.',
      formula: 'current too big → the fuse melts → the circuit is broken',
      learn: 'A fuse is a weak point built in on purpose. It fails first, so the wiring never gets hot enough to start a fire.',
      exam: 'Why build a weak point into a circuit on purpose? The fuse breaks the circuit before the wiring can overheat.' },
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
    // ── Grades 4 and 6 ──
    short_circuit_p: {
      grades: [4, 6], signs: ['hot'], fx: 'short',
      title: () => 'Short circuit - the wire is getting hot',
      happened: () => 'Your wire made a short cut from one end of the cell to the other. The electricity rushed round the short cut, not through the bulb. The bulb went dark, and the wire and the cell got hot. This is called a short circuit.',
      why: 'A short circuit makes wires and cells hot very fast. A real battery can leak or burn your fingers. In a house, a short circuit can start a fire.',
      instead: 'Always keep the bulb in the loop. Never join the two ends of a cell with just a wire. If a wire gets hot, let go and ask an adult.',
      exam: 'Electricity takes the easiest path. A path with nothing in it to use the energy is a short circuit.',
    },
    mains: {
      grades: [4, 6], signs: ['electric'], fx: 'zap',
      log: 'Tried to run the circuit from a wall socket. Mains electricity can kill.',
      title: () => 'Stop! That is mains electricity',
      happened: () => 'You tried to power the circuit from the socket on the wall. Our bulb is made for small cells. Mains electricity is about 150 times stronger than one cell. The bulb would burst, and you could get a deadly shock.',
      why: 'Mains electricity can pass through your body. It can burn you and stop your heart. A cell is safe to hold. A socket is not.',
      instead: 'Use only cells (batteries) for experiments. Never push anything into a socket. Leave plugs and sockets to an adult.',
      exam: 'One safety rule at home: never push anything into a socket.',
    },
    wet_hands: {
      grades: [4, 6], signs: ['electric'], fx: 'zap',
      log: 'Reached for a plug with wet hands. Water and mains electricity do not mix.',
      title: () => 'Wet hands and electricity do not mix',
      happened: () => 'You reached for a plug with wet hands. Tap water lets electricity pass. From a socket, it could flow into your body and give you a bad shock.',
      why: 'Wet skin lets mains electricity into your body much more easily than dry skin. A shock can burn you or stop your heart.',
      instead: 'Dry your hands before you touch a switch or a plug. Keep water and drinks away from sockets. Our cells are safe even with wet hands - they are far too weak to hurt you.',
      exam: 'Keep electrical things away from water. Never touch them with wet hands.',
    },
    cable: {
      grades: [4, 6], signs: ['electric'], fx: 'zap',
      log: 'Picked up a lamp with a split cable. The bare copper could give a shock.',
      title: () => 'A damaged cable is dangerous',
      happened: () => 'You picked up a lamp whose cable is split. The plastic is broken and the copper inside shows. Touching it while it is plugged in could give you a shock.',
      why: 'The plastic round a cable is an insulator. It keeps the electricity inside. Once it splits, the bare copper can pass mains electricity into your hand.',
      instead: 'Never touch a split or burnt cable, and never use it. Tell an adult. They will switch it off at the socket and have it mended.',
      exam: 'The plastic covering of a cable is an insulator. It stops electric shocks.',
    },
    // ── Grade 7 ──
    g7_short_circuit: {
      grades: [7], signs: ['hot'], fx: 'short',
      title: () => 'Short circuit - the wire is getting hot',
      happened: () => 'Your wire joined the two ends of the cell with nothing in between to use the energy. A very big current rushed round that short path. The wire and the cell got hot, and the lamp went dark.',
      why: 'A wire has almost no resistance, so nothing limits the current. It heats the wire and the cell very fast. A real battery can leak, burn you or even catch fire, and short circuits in house wiring start fires.',
      instead: 'Always keep a lamp or a resistor in the loop. Never join the two ends of a cell with just a wire. If a wire gets hot, open the switch at once.',
      exam: 'A fuse is a weak point built in on purpose. It melts when the current is too big, and breaks the circuit before the wiring overheats.',
    },
    g7_mains: {
      grades: [7], signs: ['electric'], fx: 'zap',
      log: 'Tried to run the circuit from a wall socket. Mains electricity (230 V) can kill.',
      title: () => 'Stop! That is mains electricity',
      happened: () => 'You tried to power the circuit from a wall socket. Mains electricity in Mauritius is 230 V - about 150 times the voltage of one 1.5 V cell. The lamp would burst, and you could get a deadly shock.',
      why: 'At 230 V a current can be driven through your body. It can burn you and stop your heart. A 1.5 V cell is far too weak to do that.',
      instead: 'Use only cells for experiments. Never push anything into a socket. Leave plugs, sockets and house wiring to an adult or an electrician.',
      exam: 'A house is wired in parallel, so every socket gets the full mains voltage. Never treat a socket like a cell.',
    },
    g7_wet_hands: {
      grades: [7], signs: ['electric'], fx: 'zap',
      log: 'Reached for a plug with wet hands. Tap water and mains electricity do not mix.',
      title: () => 'Wet hands and mains electricity do not mix',
      happened: () => 'You reached for a plug with wet hands. Tap water conducts electricity, so a current from the socket could flow into your body.',
      why: 'Wet skin lets a current into your body much more easily than dry skin. At mains voltage that current can burn you or stop your heart.',
      instead: 'Dry your hands before you touch a switch or a plug. Keep water and drinks away from sockets. Our 1.5 V cells are safe even with wet hands.',
      exam: 'Tap water is a conductor, so keep water away from sockets, plugs and switches.',
    },
    g7_cable: {
      grades: [7], signs: ['electric'], fx: 'zap',
      log: 'Picked up a lamp with a split cable. The bare copper could give a shock.',
      title: () => 'A damaged cable is dangerous',
      happened: () => 'You picked up a lamp whose cable is split. The plastic coating is broken and the copper inside shows. Touching it while it is plugged in could give you a shock.',
      why: 'Copper is a very good conductor, so it carries the current. The plastic round it is an insulator that keeps the current inside. Once the plastic splits, the bare copper can pass mains current into your hand.',
      instead: 'Never touch or use a split or burnt cable. Tell an adult, who will switch it off at the socket and have it mended.',
      exam: 'Wires are copper because copper conducts well. They are coated in plastic because plastic is an insulator.',
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
    // ── Grades 4 and 6 ──
    open_circuit_p: {
      grades: [4, 6], icon: '🧩',
      title: () => 'Nothing lights - there is a gap',
      happened: () => 'You closed the switch, but there is a gap somewhere in the loop. Electricity cannot jump across a gap, so the bulb stays dark.',
      instead: 'Follow the loop with your finger, from the cell all the way round and back. Fill the empty space with a wire, or screw in a loose bulb.',
      exam: 'A bulb lights only when the circuit is complete, with no gaps.',
    },
    no_cell_p: {
      grades: [4, 6], icon: '🔋',
      title: () => 'No cell - nothing gives the energy',
      happened: () => 'You closed the switch, but there is no cell on the board. Wires, a switch and a bulb cannot make electricity on their own.',
      instead: 'Pick a 🔋 cell and put it in the loop. The cell gives the circuit its energy.',
      exam: 'A cell (battery) stores chemical energy. In a circuit it becomes electrical energy.',
    },
    bulb_blown_p: {
      grades: [4, 6], icon: '💥',
      title: () => 'Too many cells - the bulb blew',
      happened: c => `You used ${c.cells} cells. That was too much for this little bulb. Its thin wire got so hot that it melted. It flashed, then went dark for good.`,
      instead: 'Use no more than two cells with this bulb. Put a wire in place of one cell. Then tap the bulb with ✋ to fit a new one.',
      exam: 'More cells make a bulb brighter, until it blows.',
    },
    cells_wrong_p: {
      grades: [4, 6], icon: '↔️',
      title: () => 'The cells are facing each other',
      happened: () => 'The loop is complete, but the bulb stays dark. One cell is the wrong way round, so the two cells push against each other.',
      instead: 'Tap one cell with ✋ to turn it round. The + end of one cell must touch the other end of the next, as in a torch.',
      exam: 'Put cells into a torch the way the + sign shows.',
    },
    // ── Grade 7 ──
    g7_open_circuit: {
      grades: [7], icon: '🧩',
      title: () => 'Nothing lights - the circuit has a break',
      happened: () => 'You closed the switch, but the loop is broken somewhere. The current cannot flow across a gap, so there is no current anywhere and the lamp stays off.',
      instead: 'Trace the loop with your finger, from the cell all the way round and back, just as you would trace a circuit diagram. Fill the empty space with a wire.',
      exam: 'A diagram shows a lamp that does not light: look for a break in the wire before you blame the cell or the lamp.',
    },
    g7_no_cell: {
      grades: [7], icon: '🔋',
      title: () => 'No cell - nothing pushes the current',
      happened: () => 'You closed the switch, but there is no cell on the board. Wires, a switch and a lamp cannot make a current on their own.',
      instead: 'Pick 🔋 Cell and put it in the loop. The cell, or a battery of cells, provides the energy.',
      exam: 'The cell (or battery) is the part of a circuit that provides the electrical energy.',
    },
    g7_cells_wrong: {
      grades: [7], icon: '↔️',
      title: () => 'The cells are facing each other',
      happened: () => 'The loop is complete, but the lamp stays dark. One cell is turned round, so the two cells push the current in opposite directions and cancel out.',
      instead: 'Tap one cell with ✋ to turn it round. In a diagram, the long line (+) of one cell faces the short line (−) of the next.',
      exam: 'In the symbol for a cell, the long line is the positive (+) terminal and the short line is the negative (−).',
    },
    g7_bulb_blown: {
      grades: [7], icon: '💥',
      title: () => 'Too many cells - the lamp burnt out',
      happened: c => `With ${c.cells} cells in series (${c.v} V), the lamp had far more voltage than it is made for. The bigger voltage pushed a bigger current through its thin wire, the filament. It glowed very brightly, overheated and broke.`,
      instead: 'Match the battery to the lamp: this one is made for up to two cells (3 V). Put a wire in place of one cell, then tap the lamp with ✋ to fit a new one.',
      exam: 'Cells in series add their voltages: 1.5 V + 1.5 V + 1.5 V = 4.5 V. More voltage drives more current, which is why a lamp can burn out.',
    },
    g7_ammeter_parallel: {
      grades: [7], icon: '⏲️',
      title: () => 'The ammeter is across the lamp, not in the loop',
      happened: () => 'An ammeter has almost no resistance. Connected across the lamp, it made a short cut round it: the lamp went out and the needle shot past the end of the scale.',
      instead: 'An ammeter goes IN SERIES. Take a wire out of the loop and put the ammeter in its place, so the current flows through it.',
      exam: 'An ammeter measures current, in amperes (A), and is always connected in series.',
    },
    g7_voltmeter_series: {
      grades: [7], icon: '🎚️',
      title: () => 'The voltmeter is in the loop, not across the lamp',
      happened: c => `A voltmeter has a very high resistance. Standing in the loop, it let almost no current through, so the lamp went out. It read ${c.v} V - the voltage of the cell, not of the lamp.`,
      instead: 'Put a wire back where the voltmeter is. Then connect the voltmeter ACROSS the lamp, one lead to each end of it.',
      exam: 'A voltmeter measures the voltage across a part, in volts (V), and is connected in parallel with it.',
    },
  };

  const SIGN_LABELS = { hot: 'Hot surface', electric: 'Electric shock' };

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
  const FACTS_BY_GRADE = {
    4: [
      'A torch has cells inside. People often call them batteries.',
      'A conductor lets electricity pass through it. Most metals are conductors.',
      'An insulator stops electricity. Plastic, rubber and dry wood are insulators.',
      'A wire is copper inside and plastic outside. The copper carries the electricity. The plastic keeps you safe.',
      'A bulb gives out light and a little heat.',
      'Switch off lights you are not using. It saves energy.',
      'The cells in this lab are safe to touch. A socket on the wall is not.',
      'Never touch a switch or a plug with wet hands.',
      'Pencil lead is not really lead. It is graphite mixed with clay.',
      'A cell stores chemical energy. A torch turns it into light.',
    ],
    6: [
      'A cell stores chemical energy. In a circuit it becomes electrical energy.',
      'Electricity flows round a complete circuit as an electric current.',
      'Copper is used for wires because it is a very good conductor, and it bends easily.',
      'The plastic coating on a wire is an insulator. It stops electric shocks.',
      'Two cells in a row push harder than one, so the bulb glows brighter.',
      'Most electricity in Mauritius comes from power stations that burn fuel. Switching off saves fuel.',
      'An LED bulb gives as much light as an old bulb but uses far less electricity.',
      'Mains electricity is about 150 times stronger than one cell. Never experiment with it.',
      'Used cells must not be thrown away outside. Their chemicals can pollute soil and water.',
      'Dry your hands before you touch a switch or a plug.',
    ],
    7: [
      'A circuit must be a complete loop before a current can flow.',
      'A battery is two or more cells joined together, though people often call one cell a battery.',
      'In the symbol for a cell, the long thin line is the positive (+) end and the short thick line is the negative (−).',
      'Current is measured in amperes (A) with an ammeter. Voltage is measured in volts (V) with a voltmeter.',
      'Resistance is measured in ohms (Ω). A resistor limits the current in a circuit.',
      'Three 1.5 V cells in series make a 4.5 V battery: the voltages add up.',
      'Copper is used for wires because it conducts electricity very well. The plastic coating is an insulator.',
      'The lights in a house are wired in parallel, so each one can be switched on and off by itself.',
      'A fuse is a thin wire that melts if the current gets too big. It breaks the circuit before the wiring overheats.',
      'Standard circuit symbols mean anyone can read a diagram, whatever language they speak.',
      'Mauritius burns bagasse, the waste left from crushing sugar cane, to make some of its electricity.',
    ],
  };

  // Grade 7 "Build it from the diagram": a cell, an open switch, a resistor and
  // a lamp in one loop, drawn with the standard symbols (the long line of the
  // cell is +). No labels - reading the symbols is the mission.
  const DIAGRAM_G7 = '<svg viewBox="0 0 240 140" class="lab-circuit-target-svg" role="img" aria-label="A circuit diagram to build">'
    + '<g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">'
    + '<path d="M30 30H74M86 30H130M160 30H210V55M210 85V110H134M106 110H30V30"/>'
    + '<path d="M74 16v28"/><path d="M86 22v16" stroke-width="5"/>'
    + '<path d="M130 30 156 16"/>'
    + '<rect x="202" y="55" width="16" height="30"/>'
    + '<circle cx="120" cy="110" r="14"/><path d="M110.1 100.1l19.8 19.8M129.9 100.1 110.1 119.9"/>'
    + '</g><g fill="currentColor"><circle cx="130" cy="30" r="3"/><circle cx="160" cy="30" r="3"/></g>'
    + '<text x="70" y="12" font-size="12" font-weight="700" fill="currentColor" font-family="system-ui,sans-serif">+</text></svg>';
  const PIC7 = {
    switch:    { label: 'A line lifted away from a contact',        svg: SYMBOL.switch },
    cell:      { label: 'A long thin line beside a short thick one', svg: SYMBOL.cell },
    bulb:      { label: 'A circle with a cross inside',             svg: SYMBOL.bulb },
    resistor:  { label: 'A plain rectangle',                        svg: SYMBOL.resistor },
    fuse:      { label: 'A rectangle with a wire through it',       svg: SYMBOL.fuse },
    ammeter:   { label: 'A circle with an A inside',                svg: SYMBOL.ammeter },
    voltmeter: { label: 'A circle with a V inside',                 svg: SYMBOL.voltmeter },
  };

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
          why: 'In series they share the cell\'s voltage and the current is halved, so each is dimmer.' },
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

    // ── Grade 4 ── `kind` says what the bench checks: torch | sort | fix.
    {
      id: 'g4_torch', grades: [4], kind: 'torch', icon: '🔦', title: 'Make a torch',
      blurb: 'Build a circuit part by part: a cell, a switch, a bulb and wires. Then switch it on.',
      intro: 'Make a torch! The board is empty. Put a cell, a switch and a bulb in one loop. Join the gaps with wires. Then close the switch.',
      quiz: [
        { q: 'Why did the bulb light when you closed the switch?',
          options: ['The circuit was complete, with no gaps', 'The switch makes the electricity', 'The bulb keeps light stored inside it', 'The wires are coloured red'],
          why: 'Electricity flows only round a complete loop. Closing the switch closed the last gap.' },
        { q: 'Which part gives the circuit its energy?',
          options: ['The cell', 'The switch', 'The wire', 'The bulb'],
          why: 'The cell stores chemical energy. The circuit turns it into light.' },
        { q: 'What does a switch do?',
          options: ['It opens and closes a gap in the circuit', 'It makes the cell much stronger', 'It changes light into heat', 'It stores electricity for later'],
          why: 'Open, the switch makes a gap and the bulb goes out. Closed, the circuit is complete.' },
        { q: 'A torch will not light. What should you check first?',
          options: ['That the circuit is complete and the bulb is screwed in', 'That the torch case is shiny and new', 'That the torch was kept in the dark', 'That the room lights are switched off'],
          why: 'A gap or a loose bulb breaks the circuit, so no electricity flows.' },
        { q: 'A bulb gives out light. What else does it give out?',
          options: ['Heat', 'Water', 'Air', 'Sound'],
          why: 'A bulb changes electrical energy into light and some heat. That is why it feels warm.' },
      ],
    },
    {
      id: 'g4_sort', grades: [4], kind: 'sort', icon: '🥄', title: 'Conductor or insulator?',
      blurb: 'Test all six things in the gap. Which ones light the bulb?',
      intro: 'Conductor or insulator? Pick a thing under the board and put it in the gap. Close the switch. Test all six.',
      quiz: [
        { q: 'Which of these is a conductor of electricity?',
          options: ['A metal spoon', 'A plastic ruler', 'A rubber', 'A wooden stick'],
          why: 'The spoon is metal. Metals let electricity pass, so the bulb lit.' },
        { q: 'Why did the bulb stay dark with the rubber in the gap?',
          options: ['Rubber is an insulator', 'Rubber is a metal', 'Rubber is too heavy', 'Rubber is too small'],
          why: 'An insulator does not let electricity pass, so there was still a gap in the circuit.' },
        { q: 'Electric wires are covered in plastic. Why?',
          options: ['Plastic is an insulator, so it stops shocks', 'Plastic makes the electricity flow faster', 'Plastic is a conductor, like copper', 'Plastic makes the wire look nicer'],
          why: 'The copper inside carries the electricity. The plastic outside keeps it away from your hands.' },
        { q: 'The pencil lead made the bulb glow dimly. What does this show?',
          options: ['Pencil lead conducts, but not as well as metal', 'Pencil lead is an insulator', 'Pencil lead is made of metal', 'Pencil lead makes its own electricity'],
          why: 'Graphite lets some electricity through - less than a metal - so the bulb is dim.' },
        { q: 'What is an insulator?',
          options: ['A material that does not let electricity pass', 'A material that lets electricity pass easily', 'A machine that makes electricity', 'A wire that joins a cell to a bulb'],
          why: 'Plastic, rubber and dry wood are insulators. Metals are conductors.' },
      ],
    },

    // ── Grade 6 ──
    {
      id: 'g6_fix', grades: [6], kind: 'fix', icon: '🔧', title: 'Fix the torch',
      blurb: 'This torch does not work. Find the faults and make it light.',
      intro: 'Fix the torch! It has two faults. Find them both, mend them, then close the switch.',
      quiz: [
        { q: 'The torch had a gap in its circuit. What happened to the current?',
          options: ['No current flowed anywhere', 'Current flowed only near the cell', 'The current jumped across the gap', 'The current flowed the other way'],
          why: 'A circuit is one loop. A gap anywhere stops the current everywhere.' },
        { q: 'An unscrewed bulb stops the torch working. Why?',
          options: ['It makes a gap, so the circuit is broken', 'It uses up all the energy of the cell', 'It turns the current into sound', 'It turns the cell the wrong way round'],
          why: 'The current must pass through the bulb. A loose bulb leaves a gap.' },
        { q: 'What is the job of the wire in a circuit?',
          options: ['To carry the electric current', 'To store energy for later', 'To change electricity into light', 'To make the bulb brighter'],
          why: 'The wire is a conductor. It carries the current from the cell to the bulb and back.' },
        { q: 'Which energy change happens in a lit torch?',
          options: ['Chemical → electrical → light and heat', 'Light → electrical → chemical', 'Heat → chemical → sound', 'Electrical → chemical → movement'],
          why: 'The cell stores chemical energy. It becomes electrical energy, then light and heat in the bulb.' },
        { q: 'Why should used cells not be thrown into the environment?',
          options: ['Their chemicals can pollute soil and water', 'They start to glow in the dark', 'They grow into new cells in the soil', 'They make the soil too cold for plants'],
          why: 'Cells hold chemicals that can harm living things. PSAC 2023 asked this. Take used cells to a collection point.' },
      ],
    },
    {
      id: 'g6_wire', grades: [6], kind: 'sort', icon: '🧵', title: 'What makes a good wire?',
      blurb: 'Test six things in the gap. Which could carry the current like a wire?',
      intro: 'What makes a good wire? Put each thing in the gap and close the switch. Test all six.',
      quiz: [
        { q: 'Which metal is used inside electric wires?',
          options: ['Copper', 'Iron', 'Gold', 'Lead'],
          why: 'Copper is a very good conductor, and it bends easily. Gold conducts too, but costs far too much.' },
        { q: 'In your tests, which things did NOT light the bulb?',
          options: ['The rubber, the plastic ruler and the wooden stick', 'The spoon, the coin and the pencil lead', 'Only the coin', 'All six things'],
          why: 'Rubber, plastic and wood are insulators. The metals and the graphite are conductors.' },
        { q: 'Which of these could NOT be used as a wire in a circuit?',
          options: ['A plastic ruler', 'A metal spoon', 'A coin', 'A strip of copper'],
          why: 'A wire must be a conductor. Plastic is an insulator, so no current would flow.' },
        { q: 'Pencil lead lit the bulb, but dimly. Pencil lead is made of:',
          options: ['Graphite, a non-metal that conducts', 'Lead, a heavy metal', 'Plastic, an insulator', 'Rubber, from a tree'],
          why: 'Pencil lead is graphite mixed with clay. Graphite conducts, but less well than a metal.' },
        { q: 'Which of these is a safe thing to do with electricity at home?',
          options: ['Dry your hands before touching a switch', 'Push a key into a socket to test it', 'Use a lamp whose cable is split', 'Pull a plug out by its cable'],
          why: 'Water lets electricity into your body. Never touch switches or plugs with wet hands.' },
      ],
    },

    // ── Grade 7 ── `kind`: diagram (build the drawn circuit) | sp7 (series and
    // parallel, one lamp unscrewed in each) | meters7 (both meters in place, a reading).
    {
      id: 'g7_diagram', grades: [7], kind: 'diagram', icon: '✏️', title: 'Build it from the diagram',
      blurb: 'A circuit diagram shows four parts in one loop. Read the symbols, build it for real, then switch it on.',
      intro: 'Build it from the diagram! Read the symbols in the mission box. Put each part in ONE loop, join the gaps with wires, then close the switch.',
      quiz: [
        { q: 'Which of these is the circuit symbol for a switch?',
          options: [PIC7.switch, PIC7.cell, PIC7.bulb, PIC7.resistor],
          why: 'A switch is drawn as a line lifted away from its contact: a gap that can be closed. The long and short lines are a cell, the crossed circle is a lamp and the rectangle is a resistor.' },
        { q: 'Which of these is the circuit symbol for a cell?',
          options: [PIC7.cell, PIC7.fuse, PIC7.voltmeter, PIC7.ammeter],
          why: 'A cell is one long thin line and one short thick line. The circles with a letter are meters, and a rectangle with a wire through it is a fuse.' },
        { q: 'In the symbol for a cell, which line is the positive (+) terminal?',
          options: ['The long thin line', 'The short thick line', 'The wire on its left', 'The gap between the lines'],
          why: 'The long line is positive (+) and the short line is negative (−). Cells in a battery must all face the same way.' },
        { q: 'The lamp in your circuit glowed only dimly. Which part made it dim?',
          options: ['The resistor, because it limits the current', 'The switch, because it was closed', 'The wires, because they are copper', 'The cell, because it was a new one'],
          why: 'A resistor opposes the current, so less current flows through the lamp and it glows dimly. Take the resistor out and the lamp is brighter.' },
        { q: 'Why are circuit diagrams drawn with standard symbols, not pictures of the parts?',
          options: ['Anyone can read them, whatever their language', 'They show the real size of every part', 'They show the colour of every wire', 'They make the diagram harder to copy'],
          why: 'Everyone agrees on the same symbols, so a diagram means the same thing everywhere. What matters is which part joins to which.' },
      ],
    },
    {
      id: 'g7_sp', grades: [7], kind: 'sp7', icon: '🔀', title: 'Two lamps, two ways',
      blurb: 'Wire two lamps in series, then in parallel. Unscrew one lamp in each and watch the other.',
      intro: 'Two lamps, two ways! Lay out each circuit from the mission box, close the switch, then unscrew one lamp and watch the other.',
      quiz: [
        { q: 'In your series circuit you took out one lamp. What did the other lamp do?',
          options: ['It went out too', 'It stayed on, as bright as before', 'It became much brighter', 'It began to flash on and off'],
          why: 'A series circuit has only one path. Break it anywhere and the current stops everywhere.' },
        { q: 'In your parallel circuit you took out one lamp. What did the other lamp do?',
          options: ['It stayed on', 'It went out too', 'It went dimmer', 'It flickered, then went out'],
          why: 'Each lamp in a parallel circuit has its own path back to the cell, so it keeps working.' },
        { q: 'Two lamps in series glow dimly. The same two lamps in parallel glow brightly. Why?',
          options: ['In series the lamps share the voltage of the cell', 'In parallel the cell makes a bigger voltage', 'Series circuits use much thinner wires', 'In parallel the lamps are nearer the cell'],
          why: 'In series each lamp gets only part of the cell\'s voltage. In parallel each branch gets the full voltage.' },
        { q: 'A house has ten lights. Why are they wired in parallel, not in series?',
          options: ['Each light can be switched on and off by itself', 'Parallel wiring makes every light dimmer', 'Series wiring would need no switches', 'Parallel wiring uses no electricity at all'],
          why: 'In parallel each light has its own branch and its own switch. In series, one broken lamp would put every light out.' },
        { q: 'A circuit diagram shows two lamps side by side, each on its own branch. How are they connected?',
          options: ['In parallel', 'In series', 'They are not connected', 'As a short circuit'],
          why: 'Side-by-side branches, each with its own path to the cell, are parallel. Lamps one after the other in a single loop are in series.' },
      ],
    },
    {
      id: 'g7_meters', grades: [7], kind: 'meters7', icon: '⏲️', title: 'Measure it',
      blurb: 'Add an ammeter and a voltmeter to a working lamp circuit, each in the right place. Then take a reading.',
      intro: 'Measure it! The lamp circuit is ready. Put an ammeter IN the loop and a voltmeter ACROSS the lamp, close the switch and take a reading.',
      quiz: [
        { q: 'Which of these is the circuit symbol for an ammeter?',
          options: [PIC7.ammeter, PIC7.voltmeter, PIC7.bulb, PIC7.resistor],
          why: 'An ammeter is a circle with an A inside. A circle with a V is a voltmeter, and a circle with a cross is a lamp.' },
        { q: 'What does an ammeter measure, and in which unit?',
          options: ['Current, in amperes (A)', 'Voltage, in volts (V)', 'Resistance, in ohms (Ω)', 'Energy, in joules (J)'],
          why: 'An ammeter measures the current flowing through it. The unit of current is the ampere, or amp.' },
        { q: 'How must a voltmeter be connected to measure the voltage of a lamp?',
          options: ['Across the lamp, one lead on each side', 'In the loop, in place of a wire', 'To the positive end of the cell only', 'It needs no wires to measure'],
          why: 'A voltmeter compares the two ends of a part, so it goes across the part, in parallel with it.' },
        { q: 'Three 1.5 V cells are joined in series to make a battery. What is its voltage?',
          options: ['4.5 V', '1.5 V', '3.0 V', '0.5 V'],
          why: 'Cells in series add their voltages: 1.5 V + 1.5 V + 1.5 V = 4.5 V.' },
        { q: 'Which unit is resistance measured in?',
          options: ['The ohm (Ω)', 'The volt (V)', 'The ampere (A)', 'The watt (W)'],
          why: 'Resistance is measured in ohms. The volt is the unit of voltage, and the ampere the unit of current.' },
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
        { on: 'place:v31:wire', say: 'Tap the glowing gap on the right to put a wire in.', btn: '〰️ Put a wire in the gap' },
        { on: 'switch:on',      say: 'Tap the switch 🔘 to close it.',                      btn: '🔘 Close the switch' },
        { on: 'switch:off',     say: 'Tap the switch 🔘 to open it — what happens?',        btn: '🔘 Open the switch' },
        { on: 'view:symbols',   say: 'Tap ✏️ Symbols to see the circuit as a standard diagram.', btn: '✏️ Show the circuit symbols' },
      ] },
    { id: 'sp', icon: '🔀', title: 'Series or parallel?',
      blurb: 'Two bulbs, two ways. Which is brighter - and which keeps working?',
      lesson: 'In SERIES there is one path: the bulbs share the cell\'s voltage, so each is dimmer, and one break puts them all out. In PARALLEL each bulb has its own path and the full voltage: each is as bright as a bulb alone, and one can go out while the other keeps working.',
      steps: [
        { on: 'build:series2',   say: 'Lay out two bulbs in SERIES - one after the other, in a single loop.',   btn: '🔌 Lay out two bulbs in series' },
        { on: 'switch:on',       say: 'Tap the switch 🔘 to close it — how bright are the bulbs?',              btn: '🔘 Close the switch' },
        { on: 'bulb:h12:out',    say: 'Tap a bulb 💡 to unscrew it.',                                           btn: '🔧 Unscrew a bulb' },
        { on: 'build:parallel2', say: 'Both went out! Now lay out two bulbs in PARALLEL - each on its own branch.', btn: '🔌 Lay out two bulbs in parallel' },
        { on: 'switch:on',       say: 'Tap the switch 🔘 to close it — compare the brightness.',                 btn: '🔘 Close the switch' },
        { on: 'bulb:h12:out',    say: 'Tap a bulb 💡 to unscrew it again.',                                     btn: '🔧 Unscrew a bulb' },
      ] },
    { id: 'meters', icon: '⏲️', title: 'Measure current and voltage',
      blurb: 'Use an ammeter and a voltmeter - then add a second cell.',
      lesson: 'The ammeter, in SERIES, measured the current: 0.50 A with one cell, 1.00 A with two. The voltmeter, ACROSS the bulb, read 1.50 V, then 3.00 V. Double the voltage, double the current: the bulb\'s resistance stayed at V ÷ I = 3 Ω.',
      steps: [
        { on: 'build:meters',   say: 'Lay out a circuit with an ammeter in the loop and a voltmeter across the bulb.', btn: '🔌 Lay out the circuit' },
        { on: 'switch:on',      say: 'Tap the switch 🔘 to close it.',                                                 btn: '🔘 Close the switch' },
        { on: 'read',           say: 'Tap 📝 Read to record both meter readings.',                                     btn: '📝 Take a reading' },
        { on: 'place:h10:cell', say: 'Tap the glowing slot to add a second cell in series.',                           btn: '🔋 Add a second cell' },
        { on: 'read',           say: 'Tap 📝 Read again — what changed?',                                              btn: '📝 Take a reading' },
      ] },

    // ── Grade 4 ──
    { id: 'g4-light', grades: [4], icon: '💡', title: 'Light a bulb',
      blurb: 'Find the gap, fill it, and switch on.',
      lesson: 'A bulb lights only when the circuit is complete. A circuit is one unbroken loop: from the cell, through the bulb, and back. A gap or an open switch stops the electricity.',
      steps: [
        { on: 'build:gap',      say: 'Set out a cell, a switch, a bulb and some wires.',               btn: '🔌 Set out the circuit' },
        { on: 'place:v31:wire', say: 'Tap the glowing gap to put a wire in.',                          btn: '〰️ Put a wire in the gap' },
        { on: 'switch:on',      say: 'Tap the switch 🔘 to close it.',                                 btn: '🔘 Close the switch' },
        { on: 'switch:off',     say: 'Tap the switch 🔘 to open it — what happens?',                   btn: '🔘 Open the switch' },
      ] },
    { id: 'g4-test', grades: [4], icon: '🥄', title: 'Conductor or insulator?',
      blurb: 'Put things in the gap. Which ones let the electricity through?',
      lesson: 'The spoon and the pencil lead lit the bulb, so they are conductors. The plastic ruler did not, so it is an insulator. Metals conduct. Plastic, rubber and wood do not.',
      steps: [
        { on: 'build:tester',     say: 'Set out a tester. It has a gap on the right for testing things.', btn: '🔌 Set out the tester' },
        { on: 'place:v31:spoon',  say: 'Tap the spoon 🥄 to put it in the gap.',                         btn: '🥄 Put in the spoon' },
        { on: 'switch:on',        say: 'Tap the switch 🔘 to close it — does the bulb light?',            btn: '🔘 Close the switch' },
        { on: 'place:v31:ruler',  say: 'Tap the ruler 📏 to swap it in.',                                 btn: '📏 Put in the ruler' },
        { on: 'place:v31:lead',   say: 'Tap the pencil lead ✏️ to try that next.',                        btn: '✏️ Put in the pencil lead' },
      ] },
    { id: 'g4-energy', grades: [4], icon: '🔥', title: 'Light and heat',
      blurb: 'Leave a bulb on. What does it give out?',
      lesson: 'A bulb changes electrical energy into light. It gives out some heat too. An unscrewed bulb makes a gap, so the light goes out.',
      steps: [
        { on: 'build:single', say: 'Set out a cell, a switch and a bulb.',         btn: '🔌 Set out the circuit' },
        { on: 'switch:on',    say: 'Tap the switch 🔘 to close it.',               btn: '🔘 Close the switch' },
        { on: 'wait:10',      say: 'Watch the bulb for 10 seconds — feel the heat!' },
        { on: 'bulb:h12:out', say: 'Tap the bulb 💡 to unscrew it.',              btn: '🔧 Unscrew the bulb' },
      ] },

    // ── Grade 6 ──
    { id: 'g6-fault', grades: [6], icon: '🔧', title: 'Find the faults',
      blurb: 'A torch that will not light. Find what is wrong.',
      lesson: 'The torch had two faults: a gap and a loose bulb. Each one broke the circuit. With both mended, the circuit was complete and the current could flow.',
      steps: [
        { on: 'build:broken',   say: 'Here is a torch that does not work. Look at the loop closely.', btn: '🔌 Set out the torch' },
        { on: 'place:v31:wire', say: 'Tap the glowing gap to fill it with a wire.',                   btn: '〰️ Fill the gap' },
        { on: 'bulb:h12:in',    say: 'Tap the bulb 💡 to screw it back in.',                          btn: '🔧 Screw in the bulb' },
        { on: 'switch:on',      say: 'Tap the switch 🔘 to close it.',                                btn: '🔘 Close the switch' },
      ] },
    { id: 'g6-wire', grades: [6], icon: '🧵', title: 'What makes a good wire?',
      blurb: 'Test a coin, a rubber and a pencil lead in the gap.',
      lesson: 'The coin (a metal) and the pencil lead (graphite) let the current through, so they are conductors. The rubber did not: it is an insulator. A wire needs a conductor inside and an insulator outside.',
      steps: [
        { on: 'build:tester',     say: 'Set out a tester. The gap on the right is for testing things.', btn: '🔌 Set out the tester' },
        { on: 'place:v31:coin',   say: 'Tap the coin 🪙 to put it in the gap.',                         btn: '🪙 Put in the coin' },
        { on: 'switch:on',        say: 'Tap the switch 🔘 to close it — does the current flow?',        btn: '🔘 Close the switch' },
        { on: 'place:v31:rubber', say: 'Tap the rubber ⬜ to swap it in.',                              btn: '⬜ Put in the rubber' },
        { on: 'place:v31:lead',   say: 'Tap the pencil lead ✏️ to try that next.',                     btn: '✏️ Put in the pencil lead' },
      ] },
    { id: 'g6-cells', grades: [6], icon: '🔋', title: 'More cells, more light',
      blurb: 'Add a second cell. Then draw the circuit with symbols.',
      lesson: 'Two cells in a row push harder than one, so more current flows and the bulb is brighter. Scientists draw circuits with simple symbols - an extra you will use at secondary school.',
      steps: [
        { on: 'build:single',   say: 'Set out one cell, a switch and a bulb.',                    btn: '🔌 Set out the circuit' },
        { on: 'switch:on',      say: 'Tap the switch 🔘 to close it — note how bright the bulb is.', btn: '🔘 Close the switch' },
        { on: 'place:h10:cell', say: 'Tap the glowing slot to add a second cell.',                btn: '🔋 Add a second cell' },
        { on: 'view:symbols',   say: 'Tap ✏️ Symbols to see the circuit as a diagram.',           btn: '✏️ Show the symbols' },
      ] },

    // ── Grade 7 ──
    { id: 'g7-parts', grades: [7], icon: '✏️', title: 'Parts and their symbols',
      blurb: 'Light a lamp, see it as a circuit diagram, then add a resistor.',
      lesson: 'A circuit needs a cell to provide the energy, wires to carry the current, and a complete loop. A switch opens and closes that loop. In a circuit diagram each part has a standard symbol. The cell is a long and a short line, and the lamp a circle with a cross. The switch is a lifted line, and the resistor a plain rectangle. The resistor limits the current, so the lamp went dim.',
      steps: [
        { on: 'build:single',       say: 'Lay out a cell, a switch, a lamp and some wires.',                         btn: '🔌 Lay out the circuit' },
        { on: 'switch:on',          say: 'Tap the switch 🔘 to close it.',                                           btn: '🔘 Close the switch' },
        { on: 'view:symbols',       say: 'Tap ✏️ Symbols to see the same circuit as a standard diagram.',            btn: '✏️ Show the circuit symbols' },
        { on: 'place:v31:resistor', say: 'Tap the glowing slot to swap in a resistor 🟫 — watch the lamp!',          btn: '🟫 Put in a resistor' },
      ] },
    { id: 'g7-sp', grades: [7], icon: '🔀', title: 'Series or parallel?',
      blurb: 'Two lamps, two ways. Which are brighter - and which keep working?',
      lesson: 'In SERIES there is only one path. The two lamps share the voltage of the cell, so each is dim, and a break anywhere puts both out. In PARALLEL each lamp has its own branch and the full voltage. Each is as bright as one lamp alone, and one can go out while the other stays on. That is why a house is wired in parallel.',
      steps: [
        { on: 'build:series2',   say: 'Lay out two lamps in SERIES: one after the other, in a single loop.', btn: '🔌 Lay out two lamps in series' },
        { on: 'switch:on',       say: 'Tap the switch 🔘 to close it — how bright are the lamps?',           btn: '🔘 Close the switch' },
        { on: 'bulb:h12:out',    say: 'Tap a lamp 💡 to unscrew it.',                                        btn: '🔧 Unscrew a lamp' },
        { on: 'build:parallel2', say: 'Both went out! Now lay out two lamps in PARALLEL, each on its own branch.', btn: '🔌 Lay out two lamps in parallel' },
        { on: 'switch:on',       say: 'Tap the switch 🔘 to close it — compare the brightness.',              btn: '🔘 Close the switch' },
        { on: 'bulb:h12:out',    say: 'Tap a lamp 💡 to unscrew it again.',                                  btn: '🔧 Unscrew a lamp' },
      ] },
    { id: 'g7-meters', grades: [7], icon: '⏲️', title: 'Measure current and voltage',
      blurb: 'Use an ammeter and a voltmeter. Then add a second cell.',
      lesson: 'The ammeter was IN SERIES, in the loop, so the current flowed through it: 0.50 A with one cell, 1.00 A with two. The voltmeter was ACROSS the lamp: 1.50 V with one cell, 3.00 V with two. Cells in series add their voltages, 1.5 V + 1.5 V = 3 V, and the bigger voltage pushed a bigger current through the lamp.',
      steps: [
        { on: 'build:meters',   say: 'Lay out a circuit with an ammeter in the loop and a voltmeter across the lamp.', btn: '🔌 Lay out the circuit' },
        { on: 'switch:on',      say: 'Tap the switch 🔘 to close it.',                                                 btn: '🔘 Close the switch' },
        { on: 'read',           say: 'Tap 📝 Read to record both meter readings.',                                     btn: '📝 Take a reading' },
        { on: 'place:h10:cell', say: 'Tap the glowing slot to add a second cell in series.',                           btn: '🔋 Add a second cell' },
        { on: 'read',           say: 'Tap 📝 Read again — what changed?',                                              btn: '📝 Take a reading' },
      ] },
    { id: 'g7-fuse', grades: [7], icon: '🧵', title: 'A fuse protects the circuit',
      blurb: 'Make a short cut round the lamp - with a fuse in the loop.',
      lesson: 'The new wire made a short cut round the lamp, so the current shot up. The thin wire inside the fuse melted and broke the circuit before the other wires could overheat. A fuse is a weak point built in on purpose: it fails first, so that nothing else does.',
      steps: [
        { on: 'build:fuse',     say: 'Lay out a lamp circuit with a fuse in the loop.',                        btn: '🔌 Lay out the circuit' },
        { on: 'switch:on',      say: 'Tap the switch 🔘 — the lamp lights as normal.',                        btn: '🔘 Close the switch' },
        { on: 'place:h11:wire', say: 'Tap the glowing slot across the lamp to add a short-cut wire — watch the fuse!', btn: '〰️ Add the short-cut wire' },
      ] },
  ];

  return { GRADES, forGrade, COLS, ROWS, NODES, EMF, R, SHORT_A, FUSE_A, BULB_MAX_V, P_REF, LIT, FS,
           SLOTS, SYMBOL, KINDS, TOOLS, PRESETS, QUICK, QUICK_BY_GRADE, TEST_SLOT, layoutOf,
           OBJECTS, TEST_OBJECTS, JOBS_P, JOBS_7, toolsFor, kindsFor, symbolsFor,
           solve, loopThrough, hasGap, fusesOver, diagnose, arrangement, ARR_NAMES, brightnessWord,
           switchControls, ammeterInSeries, litBulbs, meterChecks, oneLoop,
           testResult, objectTests, WHENS, facts, primaryMistake,
           charge, energy, resistance, seriesR, parallelR, round2, reading,
           DISCOVERIES, HAZARDS, RESULTS, SIGN_LABELS, FACTS, FACTS_BY_GRADE, MISSIONS, GUIDES, DIAGRAM_G7 };
})();
if (typeof window !== 'undefined') window.LabCircuitData = LabCircuitData;
