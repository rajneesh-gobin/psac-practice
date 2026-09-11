'use strict';
// Science Labs: the physics the Circuit Board is allowed to show.
//
// The bench draws whatever engine/labs/lab_circuit_data.js says, so a mistake
// in that file is a mistake taught to a child. This checks what can be checked
// mechanically: the nodal solver against hand-worked series and parallel
// circuits (currents, voltages, brightness ∝ I²R), an open switch / a gap /
// an unscrewed bulb giving zero current, more cells giving a brighter bulb,
// short-circuit detection (and which part carries the short), the ammeter
// across a bulb, the voltmeter in the loop, the fuse, a blown bulb, Q = It and
// W = QV, every preset, every discovery recipe, guide, quiz, hazard and card.
//
// Run: node scripts/test-labs-circuit-data.js
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_circuit_data.js'), 'utf8');
const bench = fs.existsSync(path.join(ROOT, 'engine', 'labs', 'lab_circuit.js')) ? fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_circuit.js'), 'utf8') : '';
const core = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_core.js'), 'utf8');
const ctx = vm.createContext({});
vm.runInContext(src + '\nthis.LabCircuitData = LabCircuitData;', ctx);
const C = ctx.LabCircuitData;

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); }
};
const near = (a, b, eps = 5e-3) => Math.abs(a - b) < eps;
const L = (id, over) => { const l = C.layoutOf(id); for (const [k, v] of Object.entries(over || {})) { if (v === null) delete l[k]; else l[k] = v; } return l; };
const closed = (id, over) => { const l = L(id, over); for (const k of Object.keys(l)) if (l[k].kind === 'switch') l[k].open = false; return l; };
const S = l => C.solve(l);
const amm = (sol, slot) => sol.meters[slot].value;

console.log('\nOne cell, one bulb');
let s = S(closed('single'));
ok('switch closed: I = 1.5 V ÷ 3 Ω = 0.50 A', near(s.bulbs.h12.I, 0.5) && near(s.cellI, 0.5), s.bulbs.h12);
ok('the bulb has the full 1.5 V across it', near(s.bulbs.h12.V, 1.5));
ok('its brightness is the reference, 1 (P = I²R = 0.75 W)', near(s.bulbs.h12.brightness, 1) && near(s.bulbs.h12.P, 0.75));
ok('it is lit and called "normal"', s.bulbs.h12.lit && C.brightnessWord(s.bulbs.h12.brightness) === 'normal');
ok('no short circuit, and current is flowing', !s.short && s.flowing);
s = S(L('single'));
ok('switch open: no current anywhere, the bulb is off', s.cellI < 1e-6 && !s.bulbs.h12.lit && s.els.every(e => Math.abs(e.I) < 1e-6));
s = S(closed('gap'));
ok('a gap in the loop: no current even with the switch closed', s.cellI < 1e-6 && !s.bulbs.h12.lit);
ok('hasGap sees the missing wire; not the open switch', C.hasGap(L('gap')) && !C.hasGap(L('single')));
const g2 = closed('gap'); g2.v31 = { kind: 'wire' };
ok('filling the gap lights the bulb', S(g2).bulbs.h12.lit);
ok('the switch controls the bulb', C.switchControls(closed('single'), 'v00'));
ok('conventional current leaves the + terminal: clockwise, so right-to-left through the bottom bulb', S(closed('single')).els.find(e => e.slot === 'h12').I < 0);

console.log('\nSeries');
s = S(closed('series2'));
ok('two bulbs in series: R = 3 + 3 = 6 Ω, I = 0.25 A through each', near(s.bulbs.h12.I, 0.25) && near(s.bulbs.h22.I, 0.25) && near(s.cellI, 0.25) && near(C.seriesR(3, 3), 6));
ok('each has 0.75 V across it; the two add up to the 1.5 V supply', near(s.bulbs.h12.V, 0.75) && near(s.bulbs.h12.V + s.bulbs.h22.V, 1.5));
ok('each is a quarter as bright as one bulb alone ("dim")', near(s.bulbs.h12.brightness, 0.25) && C.brightnessWord(s.bulbs.h12.brightness) === 'dim');
ok('the solver calls it series', C.arrangement(s) === 'series');
s = S(closed('series2', { h12: { kind: 'bulb', out: true } }));
ok('unscrew one: the other goes out too', !s.bulbs.h22.lit && s.cellI < 1e-6);
s = S(closed('ammeters2'));
ok('two ammeters in one series loop read the same: 0.25 A', near(amm(s, 'h20'), 0.25) && near(amm(s, 'h02'), 0.25) && near(amm(s, 'h20'), amm(s, 'h02'), 1e-6));
s = S(closed('series_volts'));
ok('a voltmeter across one of two series bulbs reads 0.75 V', near(s.meters.h11.value, 0.75));
ok('…and it does not disturb the current (still 0.25 A)', near(amm(s, 'h20'), 0.25));

console.log('\nParallel');
s = S(closed('parallel2'));
ok('two bulbs in parallel: 0.50 A through each, 1.00 A from the cell', near(s.bulbs.h12.I, 0.5) && near(s.bulbs.h11.I, 0.5) && near(s.cellI, 1.0));
ok('each has the full 1.5 V and is as bright as one bulb alone', near(s.bulbs.h11.V, 1.5) && near(s.bulbs.h11.brightness, 1) && near(s.bulbs.h12.brightness, 1));
ok('1/R = 1/3 + 1/3 → R = 1.5 Ω, and V ÷ I agrees', near(C.parallelR(3, 3), 1.5, 1e-12) && near(C.resistance(1.5, s.cellI), 1.5));
ok('the solver calls it parallel', C.arrangement(s) === 'parallel');
s = S(closed('parallel2', { h12: { kind: 'bulb', out: true } }));
ok('unscrew one: the other stays lit, just as bright', s.bulbs.h11.lit && near(s.bulbs.h11.brightness, 1) && near(s.cellI, 0.5));
s = S(closed('parallel_amm'));
ok('the ammeter before the branches reads the total, 1.00 A', near(amm(s, 'h20'), 1.0));
s = S(closed('series_amm'));
ok('the same ammeter in the series layout reads 0.25 A', near(amm(s, 'h20'), 0.25));

console.log('\nCells, meters and resistance');
s = S(closed('twocells'));
ok('two cells in series: 3.0 V across the bulb, 1.00 A', near(s.bulbs.h12.V, 3.0) && near(s.bulbs.h12.I, 1.0));
ok('more cells = brighter: four times the power ("very bright")', near(s.bulbs.h12.brightness, 4) && C.brightnessWord(4) === 'very bright');
s = S(closed('twocells', { h10: { kind: 'cell', flip: true } }));
ok('one cell turned round: the cells cancel, no current, although the loop is complete', s.cellI < 1e-6 && !C.hasGap(closed('twocells', { h10: { kind: 'cell', flip: true } })));
s = S(closed('meters'));
ok('meters: the ammeter reads 0.50 A, the voltmeter 1.50 V', near(amm(s, 'h20'), 0.5) && near(s.meters.h11.value, 1.5));
ok('…the ammeter is in series with the cell', C.ammeterInSeries(s, 'h20'));
ok('V ÷ I from the meters gives the bulb’s 3 Ω', near(C.resistance(s.meters.h11.value, amm(s, 'h20')), 3, 0.02));
const m2 = closed('meters'); m2.h10 = { kind: 'cell' };
s = S(m2);
ok('meters with two cells: 1.00 A and 3.00 V - double the voltage, double the current', near(amm(s, 'h20'), 1.0) && near(s.meters.h11.value, 3.0));
s = S(closed('resistor'));
ok('a 3 Ω resistor in series: I = 1.5 ÷ (3 + 3) = 0.25 A, the bulb dims', near(amm(s, 'h20'), 0.25) && near(s.bulbs.h12.brightness, 0.25));

console.log('\nMistakes');
const sc = closed('single'); sc.v11 = { kind: 'wire' }; sc.v21 = { kind: 'wire' }; sc.h11 = { kind: 'wire' };
s = S(sc);
let d = C.diagnose(sc, s);
ok('a wire across the bulb: short circuit, huge current, bulb dark', s.short && s.cellI > C.SHORT_A && !s.bulbs.h12.lit && d.via === 'wire', { I: s.cellI, via: d.via });
ok('…the parts carrying the short include the cell and the new wire', d.hot.includes('h00') && d.hot.includes('h11') && !d.hot.includes('h12'));
const sc2 = closed('single'); sc2.h01 = { kind: 'wire' }; sc2.v10 = { kind: 'wire' };
ok('a wire straight across the cell is a short circuit too', S(sc2).short && C.diagnose(sc2, S(sc2)).via === 'wire');
const ap = closed('single'); ap.v11 = { kind: 'wire' }; ap.v21 = { kind: 'wire' }; ap.h11 = { kind: 'ammeter' };
s = S(ap); d = C.diagnose(ap, s);
ok('an ammeter across the bulb takes nearly all the current: flagged as the ammeter mistake', s.short && d.via === 'ammeter' && !s.bulbs.h12.lit);
const vs = closed('single'); vs.h20 = { kind: 'voltmeter' };
s = S(vs); d = C.diagnose(vs, s);
ok('a voltmeter in the loop: the bulb goes out, the voltmeter reads the full 1.5 V', !s.bulbs.h12.lit && near(s.meters.h20.value, 1.5) && d.vmSeries.includes('h20'), d);
ok('a voltmeter ACROSS a bulb is not flagged', C.diagnose(closed('meters'), S(closed('meters'))).vmSeries.length === 0
   && C.diagnose(closed('series_volts'), S(closed('series_volts'))).vmSeries.length === 0);
const fz = closed('fuse'); fz.h11 = { kind: 'wire' };
s = S(fz);
ok('a short with a fuse in the loop: the fuse carries more than 3 A and melts', C.fusesOver(s).includes('h20'));
fz.h20.blown = true;
s = S(fz);
ok('…after it melts, no current flows and nothing is short-circuited', s.cellI < 1e-6 && !s.short);
ok('the fuse does not blow in a normal circuit (0.5 A)', C.fusesOver(S(closed('fuse'))).length === 0);
const three = closed('twocells'); three.h20 = { kind: 'cell' };
s = S(three); d = C.diagnose(three, s);
ok('three cells (4.5 V) on one bulb: over its 4 V limit, it blows', near(s.bulbs.h12.V, 4.5) && d.over.includes('h12'));
ok('two cells (3 V) do not blow it', C.diagnose(closed('twocells'), S(closed('twocells'))).over.length === 0);
ok('the worst normal circuit on the shelf stays below the fuse and short limits',
   ['single', 'series2', 'parallel2', 'twocells', 'meters', 'resistor', 'parallel_amm'].every(id => { const x = S(closed(id)); return !x.short && x.cellI <= C.FUSE_A; }));

console.log('\nQ = It and W = QV');
ok('Q = It: 0.5 A for 10 s = 5 C', C.charge(0.5, 10) === 5);
ok('W = QV: 5 C through 1.5 V = 7.5 J', C.energy(5, 1.5) === 7.5);
const rd = C.reading(closed('meters'), S(closed('meters')), 10);
ok('a reading after 10 s at 0.50 A records Q = 5 C and W = 7.5 J', rd.Q === 5 && rd.W === 7.5 && rd.amps[0] === 0.5 && rd.volts[0] === 1.5, rd);
ok('the reading names the circuit', /one bulb · 1 cell/.test(rd.label) && /2 bulbs in parallel/.test(C.reading(closed('parallel2'), S(closed('parallel2')), 0).label));

console.log('\nPresets and slots');
ok('12 connection points, 17 slots', C.NODES === 12 && Object.keys(C.SLOTS).length === 17);
ok('every slot joins two neighbouring points', Object.values(C.SLOTS).every(x => Math.abs(x.a - x.b) === 1 || Math.abs(x.a - x.b) === C.COLS));
const badPre = Object.entries(C.PRESETS).filter(([, p]) => !p.name || Object.entries(p.parts).some(([k, v]) => !C.SLOTS[k] || (v !== null && !C.KINDS[v])));
ok('every preset uses real slots and real components', badPre.length === 0, badPre.map(x => x[0]));
ok('every preset starts with its switch OPEN (closing it is the pupil’s move)', Object.keys(C.PRESETS).every(id => Object.values(C.layoutOf(id)).filter(p => p.kind === 'switch').every(p => p.open)));
ok('every quick layout is a preset', C.QUICK.every(id => C.PRESETS[id]));
ok('every component has a name, a job and a standard symbol', Object.keys(C.KINDS).every(k => C.KINDS[k].name && C.KINDS[k].job && /<svg/.test(C.SYMBOL[k])));
ok('no <i> inside a symbol SVG (it breaks out of the svg)', Object.values(C.SYMBOL).every(x => !/<i[\s>]/.test(x)));

console.log('\nDiscoveries');
const ids = C.DISCOVERIES.map(x => x.id);
ok('at least 12 discoveries', ids.length >= 12, ids.length);
ok('discovery ids are unique', new Set(ids).size === ids.length);
const tokenOk = on => {
  const [k, a, b] = on.split(':');
  if (k === 'build') return !!C.PRESETS[a];
  if (k === 'place') return !!C.SLOTS[a] && !!C.KINDS[b];
  if (k === 'remove' || k === 'flip') return !!C.SLOTS[a];
  if (k === 'switch') return a === 'on' || a === 'off';
  if (k === 'bulb') return !!C.SLOTS[a] && (b === 'out' || b === 'in');
  if (k === 'wait') return /^\d+$/.test(a) && +a > 0 && +a <= 30;
  if (k === 'view') return a === 'symbols' || a === 'picture';
  return on === 'read';
};
const badDisc = C.DISCOVERIES.filter(x => !x.learn || !x.hint || !x.saw || !x.title || !x.icon || !Array.isArray(x.how) || !x.how.length || !x.how.every(tokenOk));
ok('every discovery has what you saw, why it happens, a clue and a valid recipe', badDisc.length === 0, badDisc.map(x => x.id));
ok('every recipe starts from a laid-out circuit', C.DISCOVERIES.every(x => x.how[0].startsWith('build:')));
ok('every discovery is unlocked somewhere on the bench', !bench || ids.every(id => bench.includes(`'${id}'`)), ids.filter(id => !bench.includes(`'${id}'`)));
ok('anything beyond the syllabus says so', C.DISCOVERIES.filter(x => /cancel|opposite/.test(x.learn)).every(x => /beyond the NCE syllabus/.test(x.learn + x.formula)));
// Each recipe's circuit, simulated here, reaches the state its card describes.
const replay = how => { let l = {}; for (const on of how) { const [k, a, b] = on.split(':');
  if (k === 'build') l = C.layoutOf(a); else if (k === 'place') l[a] = b === 'switch' ? { kind: b, open: true } : { kind: b };
  else if (k === 'switch') Object.values(l).filter(p => p.kind === 'switch').forEach(p => { p.open = a === 'off'; });
  else if (k === 'bulb') l[a].out = b === 'out'; else if (k === 'flip') l[a].flip = !l[a].flip; else if (k === 'remove') delete l[a]; }
  return l; };
const R = id => { const x = C.DISCOVERIES.find(q => q.id === id); const l = replay(x.how); return { l, s: S(l) }; };
let r = R('series_dim'); ok('recipe series_dim ends with two dim bulbs in series', C.arrangement(r.s) === 'series');
r = R('parallel_independent'); ok('recipe parallel_independent ends with one bulb still at full brightness', C.litBulbs(r.s).length === 1 && near(r.s.bulbs.h11.brightness, 1));
r = R('series_break'); ok('recipe series_break ends with no current', r.s.cellI < 1e-6);
r = R('cells_oppose'); ok('recipe cells_oppose ends with no current on a complete loop', r.s.cellI < 1e-6 && !C.hasGap(r.l));
r = R('fuse_blows'); ok('recipe fuse_blows melts the fuse', C.fusesOver(r.s).includes('h20'));
r = R('gap_fixed'); ok('recipe gap_fixed ends lit', C.litBulbs(r.s).length === 1);
r = R('volts_share'); ok('recipe volts_share reads 0.75 V (the card says so)', near(r.s.meters.h11.value, 0.75) && /0\.75 V/.test(C.DISCOVERIES.find(q => q.id === 'volts_share').saw));
r = R('resistor_dims'); ok('recipe resistor_dims reads 0.25 A (the card says so)', near(r.s.meters.h20.value, 0.25) && /0\.25 A/.test(C.DISCOVERIES.find(q => q.id === 'resistor_dims').saw));
r = R('same_current'); ok('recipe same_current: two equal ammeters at 0.25 A', near(r.s.meters.h20.value, 0.25) && near(r.s.meters.h02.value, 0.25));
ok('no recipe produces a short circuit, a blown bulb or a voltmeter in the loop',
   C.DISCOVERIES.every(x => { const l = replay(x.how); const s2 = S(l); const d2 = C.diagnose(l, s2); return !(s2.short && !C.fusesOver(s2).length) && !d2.over.length && !d2.vmSeries.length; }));

console.log('\nGuided experiments');
ok('at least 3 guided experiments', C.GUIDES.length >= 3);
ok('guide ids are unique', new Set(C.GUIDES.map(g => g.id)).size === C.GUIDES.length);
for (const G of C.GUIDES) {
  const bad = G.steps.filter(x => !tokenOk(x.on) || !x.say || (x.on.startsWith('wait:') ? !!x.btn : !x.btn));
  ok(`${G.title}: every step names a real action, says what to do, and has a button unless it is a wait`, bad.length === 0, bad);
  ok(`${G.title}: ends with what they found out`, !!(G.lesson && G.blurb && G.icon));
}
const gm = replay(C.GUIDES.find(g => g.id === 'meters').steps.map(x => x.on).filter(x => x !== 'read'));
s = S(gm);
ok('the meters guide’s lesson numbers are what the bench measures (1.00 A, 3.00 V with two cells)', near(s.meters.h20.value, 1.0) && near(s.meters.h11.value, 3.0));

console.log('\nMissions, hazards and results');
ok('at least 2 missions', C.MISSIONS.length >= 2);
for (const M of C.MISSIONS) {
  const bad = M.quiz.filter(q => q.options.length !== 4 || new Set(q.options).size !== 4 || !q.why || !q.q);
  ok(`${M.title}: ${M.quiz.length} questions, each with 4 distinct options and a reason`, M.quiz.length >= 4 && bad.length === 0, bad.map(q => q.q));
  ok(`${M.title}: has an intro, a blurb and an icon`, !!(M.intro && M.blurb && M.icon));
}
const qL = C.MISSIONS.find(m => m.id === 'light').quiz;
ok('"0.5 A for 10 s" answer is Q = It', qL.find(q => /10 s/.test(q.q)).options[0] === C.charge(0.5, 10) + ' C');
ok('"1.5 V drives 0.5 A" answer is the bulb’s resistance', qL.find(q => /resistance of the bulb/.test(q.q)).options[0] === C.R.bulb + ' Ω' && C.resistance(1.5, 0.5) === C.R.bulb);
const qC = C.MISSIONS.find(m => m.id === 'compare').quiz;
ok('"two 3 Ω in parallel" answer is 1/R = 1/3 + 1/3', qC.find(q => /combined resistance/.test(q.q)).options[0] === C.parallelR(3, 3) + ' Ω');
ok('"0.25 A in series and 1.00 A in parallel" is what the mission’s layouts read',
   near(amm(S(closed('series_amm')), 'h20'), 0.25) && near(amm(S(closed('parallel_amm')), 'h20'), 1.0) && qC.some(q => /0\.25 A in series and 1\.00 A in parallel/.test(q.q)));
const signKinds = (core.match(/SIGN_LABELS = \{([^}]*)\}/) || [, ''])[1];
for (const [id, H] of Object.entries(C.HAZARDS)) {
  ok(`hazard ${id} has real signs and explains what happened, why, what to do and the exam point`,
     H.signs.length && H.signs.every(x => new RegExp('\\b' + x + ':').test(signKinds)) && H.fx && H.title({}) && H.happened({}) && H.why && H.instead && H.exam);
}
for (const [id, Rr] of Object.entries(C.RESULTS)) {
  const c = { v: '1.5', cells: 3 };
  ok(`result card ${id} says what happened, what to do instead and the exam point`, !!(Rr.icon && Rr.title(c) && Rr.happened(c) && Rr.instead && Rr.exam));
}
ok('the voltmeter card quotes the reading', /1\.5 V/.test(C.RESULTS.voltmeter_series.happened({ v: '1.5' })));
ok('at least 3 mistakes that teach (hazards + result cards)', Object.keys(C.HAZARDS).length + Object.keys(C.RESULTS).length >= 3);
ok('at least 10 facts for the 💡 button', C.FACTS.length >= 10);
ok('every exam point quotes a real paper reference or none', [...C.DISCOVERIES.map(x => x.exam), ...Object.values(C.RESULTS).map(x => x.exam), ...Object.values(C.HAZARDS).map(x => x.exam)]
   .filter(Boolean).every(t => !/Physics 20\d\d/.test(t) || /Physics 20(21|22|23|25) Q\d/.test(t)));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
