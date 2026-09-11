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
// Grades 4 and 6 (LAB_SPEC §8-§9): each grade has its own guides, missions and
// discoveries, tagged `grades`; the things tested in the gap conduct or
// insulate as they really do; every primary recipe and guide, replayed through
// the same facts() and primaryMistake() the bench uses, reaches its discovery
// with no card on the way; the words are a 9-11-year-old's (no NCE jargon,
// short sentences); and a paper reference is quoted only if it is in
// subjects/grade6-science/questions/past_paper_*.js.
//
// Grade 7 (g7s-electricity): its own guides, missions and discoveries (ids
// g7_…/g7-…), each discovery reached by its own recipe through facts(), every
// guide run with no card on the way; its own wording for every card the bench
// can show (g7_…), with a HOT and an ELECTRIC hazard and the meter mistakes;
// "pick the symbol" questions whose right picture IS that standard symbol and
// whose labels never name the part; the diagram and meter missions' checks;
// and none of the Grade 9 arithmetic (Q = It, W = QV, V = IR) or a paper
// reference (there is no Grade 7 paper in the app).
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
const G9 = list => C.forGrade(list, 9);

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
const badPre = Object.entries(C.PRESETS).filter(([, p]) => !p.name || Object.entries(p.parts).some(([k, v]) => !C.SLOTS[k] || (v !== null && !C.KINDS[v.split(':')[0]])));
ok('every preset uses real slots and real components', badPre.length === 0, badPre.map(x => x[0]));
ok('every preset starts with its switch OPEN (closing it is the pupil’s move)', Object.keys(C.PRESETS).every(id => Object.values(C.layoutOf(id)).filter(p => p.kind === 'switch').every(p => p.open)));
ok('every quick layout, at every grade, is a preset', C.GRADES.every(g => (C.QUICK_BY_GRADE[g] || []).every(id => C.PRESETS[id])) && C.QUICK.every(id => C.PRESETS[id]));
const parts = Object.keys(C.KINDS).filter(k => !C.KINDS[k].obj);
ok('every component has a name, a job and a standard symbol', parts.every(k => C.KINDS[k].name && C.KINDS[k].job && /<svg/.test(C.SYMBOL[k])));
ok('no <i> inside a symbol SVG (it breaks out of the svg)', Object.values(C.SYMBOL).every(x => !/<i[\s>]/.test(x)));

console.log('\nDiscoveries (Grade 9)');
const all = C.DISCOVERIES, ids9 = G9(all).map(x => x.id);
ok('at least 12 Grade 9 discoveries', ids9.length >= 12, ids9.length);
ok('discovery ids are unique across every grade', new Set(all.map(x => x.id)).size === all.length);
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
const badDisc = all.filter(x => !x.learn || !x.hint || !x.saw || !x.title || !x.icon || !Array.isArray(x.how) || !x.how.length || !x.how.every(tokenOk));
ok('every discovery has what you saw, why it happens, a clue and a valid recipe', badDisc.length === 0, badDisc.map(x => x.id));
ok('every recipe starts from a laid-out circuit', all.every(x => x.how[0].startsWith('build:')));
ok('every Grade 9 discovery is unlocked somewhere on the bench', !bench || ids9.every(id => bench.includes(`'${id}'`)), ids9.filter(id => !bench.includes(`'${id}'`)));
ok('anything beyond the syllabus says so', G9(all).filter(x => /cancel|opposite/.test(x.learn)).every(x => /beyond the NCE syllabus/.test(x.learn + x.formula)));
// Each recipe's circuit, simulated here, reaches the state its card describes.
const replay = how => { let l = {}; for (const on of how) { const [k, a, b] = on.split(':');
  if (k === 'build') l = C.layoutOf(a); else if (k === 'place') l[a] = b === 'switch' ? { kind: b, open: true } : { kind: b };
  else if (k === 'switch') Object.values(l).filter(p => p.kind === 'switch').forEach(p => { p.open = a === 'off'; });
  else if (k === 'bulb') l[a].out = b === 'out'; else if (k === 'flip') l[a].flip = !l[a].flip; else if (k === 'remove') delete l[a]; }
  return l; };
const R = id => { const x = all.find(q => q.id === id); const l = replay(x.how); return { l, s: S(l) }; };
let r = R('series_dim'); ok('recipe series_dim ends with two dim bulbs in series', C.arrangement(r.s) === 'series');
r = R('parallel_independent'); ok('recipe parallel_independent ends with one bulb still at full brightness', C.litBulbs(r.s).length === 1 && near(r.s.bulbs.h11.brightness, 1));
r = R('series_break'); ok('recipe series_break ends with no current', r.s.cellI < 1e-6);
r = R('cells_oppose'); ok('recipe cells_oppose ends with no current on a complete loop', r.s.cellI < 1e-6 && !C.hasGap(r.l));
r = R('fuse_blows'); ok('recipe fuse_blows melts the fuse', C.fusesOver(r.s).includes('h20'));
r = R('gap_fixed'); ok('recipe gap_fixed ends lit', C.litBulbs(r.s).length === 1);
r = R('volts_share'); ok('recipe volts_share reads 0.75 V (the card says so)', near(r.s.meters.h11.value, 0.75) && /0\.75 V/.test(all.find(q => q.id === 'volts_share').saw));
r = R('resistor_dims'); ok('recipe resistor_dims reads 0.25 A (the card says so)', near(r.s.meters.h20.value, 0.25) && /0\.25 A/.test(all.find(q => q.id === 'resistor_dims').saw));
r = R('same_current'); ok('recipe same_current: two equal ammeters at 0.25 A', near(r.s.meters.h20.value, 0.25) && near(r.s.meters.h02.value, 0.25));
ok('no recipe produces a short circuit, a blown bulb or a voltmeter in the loop',
   all.every(x => { const l = replay(x.how); const s2 = S(l); const d2 = C.diagnose(l, s2); return !(s2.short && !C.fusesOver(s2).length) && !d2.over.length && !d2.vmSeries.length; }));

console.log('\nGuided experiments');
ok('at least 3 Grade 9 guided experiments', G9(C.GUIDES).length >= 3);
ok('guide ids are unique across every grade', new Set(C.GUIDES.map(g => g.id)).size === C.GUIDES.length);
for (const G of C.GUIDES) {
  const bad = G.steps.filter(x => !tokenOk(x.on) || !x.say || (x.on.startsWith('wait:') ? !!x.btn : !x.btn));
  ok(`${G.title} (Grade ${(G.grades || [9]).join('/')}): every step names a real action, says what to do, and has a button unless it is a wait`, bad.length === 0, bad);
  ok(`${G.title} (Grade ${(G.grades || [9]).join('/')}): ends with what they found out`, !!(G.lesson && G.blurb && G.icon));
}
const gm = replay(C.GUIDES.find(g => g.id === 'meters').steps.map(x => x.on).filter(x => x !== 'read'));
s = S(gm);
ok('the meters guide’s lesson numbers are what the bench measures (1.00 A, 3.00 V with two cells)', near(s.meters.h20.value, 1.0) && near(s.meters.h11.value, 3.0));

console.log('\nMissions, hazards and results');
ok('at least 2 Grade 9 missions', G9(C.MISSIONS).length >= 2);
ok('mission ids are unique across every grade', new Set(C.MISSIONS.map(m => m.id)).size === C.MISSIONS.length);
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
ok('at least 3 Grade 9 mistakes that teach (hazards + result cards)', G9(Object.values(C.HAZARDS)).length + G9(Object.values(C.RESULTS)).length >= 3);
ok('at least 10 facts for the 💡 button', C.FACTS.length >= 10);
ok('every exam point quotes a real paper reference or none', [...all.map(x => x.exam), ...Object.values(C.RESULTS).map(x => x.exam), ...Object.values(C.HAZARDS).map(x => x.exam)]
   .filter(Boolean).every(t => !/Physics 20\d\d/.test(t) || /Physics 20(21|22|23|25) Q\d/.test(t)));

// ══ Grades 4 and 6 ════════════════════════════
console.log('\nGrade levels');
ok('the lab declares its grades: 4, 6, 7 and 9', JSON.stringify(C.GRADES) === '[4,6,7,9]');
const P = [4, 6];
const tagged = [...C.DISCOVERIES, ...C.GUIDES, ...C.MISSIONS].filter(x => x.grades);
ok('every tagged guide, mission and discovery names only grades the lab has', tagged.every(x => x.grades.length && x.grades.every(g => C.GRADES.includes(g))));
ok('no guide, mission or discovery is shared between grades (each level is its own)', tagged.every(x => x.grades.length === 1));
for (const g of P) {
  const gd = C.forGrade(C.GUIDES, g), ds = C.forGrade(C.DISCOVERIES, g), ms = C.forGrade(C.MISSIONS, g);
  ok(`Grade ${g}: at least 3 guided experiments (${gd.length}), 10 discoveries (${ds.length}), 2 missions (${ms.length})`, gd.length >= 3 && ds.length >= 10 && ms.length >= 2);
  ok(`Grade ${g}: every mission has at least 5 questions and says what the bench checks`, ms.every(M => M.quiz.length >= 5 && ['torch', 'sort', 'fix'].includes(M.kind)));
  ok(`Grade ${g}: every id carries its grade, so progress never collides with another grade's`,
     [...gd, ...ds, ...ms].every(x => x.id.startsWith('g' + g)), [...gd, ...ds, ...ms].filter(x => !x.id.startsWith('g' + g)).map(x => x.id));
  ok(`Grade ${g}: every discovery is unlocked by a fact the bench works out`, ds.every(x => C.WHENS.includes(x.when)), ds.filter(x => !C.WHENS.includes(x.when)).map(x => x.id));
  ok(`Grade ${g}: at least 8 facts for the 💡 button`, (C.FACTS_BY_GRADE[g] || []).length >= 8);
  const hz = Object.values(C.HAZARDS).filter(h => (h.grades || []).includes(g)), rs = Object.values(C.RESULTS).filter(h => (h.grades || []).includes(g));
  ok(`Grade ${g}: at least 3 mistakes that teach, with a HOT hazard (a short circuit) and an ELECTRIC one (mains / wet hands)`,
     hz.length + rs.length >= 3 && hz.some(h => h.signs.includes('hot')) && hz.some(h => h.signs.includes('electric')) && rs.length >= 1, { hz: hz.length, rs: rs.length });
  ok(`Grade ${g}: the ⚠️ safety row has its three electric cards (mains, wet hands, a split cable), each with a notebook line`,
     ['mains', 'wet_hands', 'cable'].every(id => C.HAZARDS[id] && C.HAZARDS[id].grades.includes(g) && C.HAZARDS[id].signs[0] === 'electric' && C.HAZARDS[id].log));
}
const qs = C.MISSIONS.flatMap(M => M.quiz.map(q => q.q));
ok('no quiz question is asked at two grades', new Set(qs).size === qs.length, qs.filter((q, i) => qs.indexOf(q) !== i));
ok('Grade 4 has no circuit symbols; Grade 6 has them as an extra; Grade 9 as the paper draws them', !C.symbolsFor(4) && C.symbolsFor(6) && C.symbolsFor(9));
ok('meters, resistors and fuses are not on the Grade 4/6 bench; Grades 7 and 9 have them', ['ammeter', 'voltmeter', 'resistor', 'fuse'].every(k => !C.toolsFor(4).includes(k) && !C.toolsFor(6).includes(k) && C.toolsFor(7).includes(k) && C.toolsFor(9).includes(k)));
ok('the Grade 6 symbols discovery says it is beyond the PSAC syllabus', /beyond the PSAC syllabus/.test(C.DISCOVERIES.find(x => x.id === 'g6_symbols').learn));

console.log('\nThings to test in the gap');
const inGap = (obj, over) => { const l = closed('tester'); l[C.TEST_SLOT] = { kind: obj }; return Object.assign(l, over || {}); };
for (const o of ['spoon', 'coin']) {
  const l = inGap(o), x = S(l);
  ok(`${C.OBJECTS[o].name} (metal): a conductor - the bulb lights at full brightness`, C.testResult(l, C.TEST_SLOT) === 'conductor' && near(x.bulbs.h12.brightness, 1, 0.01));
}
let l = inGap('lead'), x = S(l);
ok('pencil lead (graphite, 3 Ω): a conductor, but the bulb is "dim" (a quarter as bright)', C.testResult(l, C.TEST_SLOT) === 'conductor' && near(x.bulbs.h12.brightness, 0.25) && C.brightnessWord(x.bulbs.h12.brightness) === 'dim');
for (const o of ['rubber', 'ruler', 'stick']) {
  l = inGap(o); x = S(l);
  ok(`${C.OBJECTS[o].name}: an insulator - no current at all`, C.testResult(l, C.TEST_SLOT) === 'insulator' && x.cellI < 1e-6);
}
ok('the metals are exactly the things marked metal', C.TEST_OBJECTS.filter(o => C.OBJECTS[o].metal).join() === 'spoon,coin');
ok('with the switch open the test says nothing yet', C.testResult(L('tester', { [C.TEST_SLOT]: { kind: 'spoon' } }), C.TEST_SLOT) === null);
ok('with the rest of the circuit broken the test says nothing either (not a fair test)', C.testResult(inGap('spoon', { h02: undefined }), C.TEST_SLOT) === null || (() => { const b = inGap('spoon'); delete b.h02; return C.testResult(b, C.TEST_SLOT) === null; })());
const sp = closed('single'); sp.h01 = { kind: 'wire' }; sp.v10 = { kind: 'spoon' };
ok('a spoon straight across the cell is a short circuit, like a wire', S(sp).short);
ok('the Grade 6 "which did NOT light" answer lists exactly the insulators', (() => {
  const q = C.MISSIONS.find(m => m.id === 'g6_wire').quiz.find(q2 => /did NOT light/.test(q2.q));
  const ins = C.TEST_OBJECTS.filter(o => C.testResult(inGap(o), C.TEST_SLOT) === 'insulator').map(o => C.OBJECTS[o].name.toLowerCase());
  return ins.every(n => q.options[0].toLowerCase().includes(n)) && ins.length === 3;
})());

console.log('\nPrimary mistakes');
l = closed('twocells', { h10: { kind: 'cell', flip: true } });
ok('two cells facing each other, switch closed: the "cells the wrong way" card', C.primaryMistake(l, S(l), 'switch:on') === 'cells_wrong');
l = closed('single'); delete l.h00; l.h00 = { kind: 'wire' };
ok('no cell on the board, switch closed: the "no cell" card', C.primaryMistake(l, S(l), 'switch:on') === 'no_cell');
l = closed('gap');
ok('a gap, switch closed: the "there is a gap" card', C.primaryMistake(l, S(l), 'switch:on') === 'open_circuit');
l = inGap('rubber');
ok('an insulator in the tester is a TEST, not a mistake: no card', C.primaryMistake(l, S(l), 'switch:on') === null);
l = closed('single');
ok('a working circuit: no card', C.primaryMistake(l, S(l), 'switch:on') === null);
const br = L('broken');
ok('the broken torch has two faults: a gap and an unscrewed bulb', C.hasGap(br) && br.h12.out === true && !br.v31);

console.log('\nEvery primary recipe and guide, replayed');
// The same event stream the bench produces, through the same data functions.
// g7: the Grade 7 bench also shows the voltmeter-in-the-loop card. A fuse that
// carries too much melts first, as it does on the bench (only Grade 7 has one).
function simulate(steps, g7) {
  let lay = {}, tests = {}, gapPrev = false, gapFilled = false, view = 'picture';
  const seen = new Set(), cards = [];
  for (const on of steps) {
    const [k, a, b] = on.split(':');
    const before = S(lay);
    if (k === 'build') lay = C.layoutOf(a);
    else if (k === 'place') lay[a] = b === 'switch' ? { kind: b, open: true } : { kind: b };
    else if (k === 'switch') Object.values(lay).filter(p => p.kind === 'switch').forEach(p => { p.open = a === 'off'; });
    else if (k === 'bulb') lay[a] = { kind: 'bulb', out: b === 'out' };
    else if (k === 'flip') lay[a].flip = !lay[a].flip;
    else if (k === 'remove') delete lay[a];
    else if (k === 'view') view = a;
    let sol = S(lay), fuse = false;
    const fz = C.fusesOver(sol);
    if (fz.length) { fz.forEach(x => { lay[x].blown = true; }); sol = S(lay); fuse = true; }
    const dg = C.diagnose(lay, sol);
    if (dg.short) cards.push(on + ' → short circuit');
    if (dg.over.length) cards.push(on + ' → blown bulb');
    if (g7 && dg.vmSeries.length) cards.push(on + ' → voltmeter in the loop');
    const m = C.primaryMistake(lay, sol, on);
    if (m) cards.push(on + ' → ' + m);
    const gap = C.hasGap(lay);
    if (gapPrev && !gap && /^place:.*:wire$/.test(on)) gapFilled = true;
    gapPrev = gap;
    C.objectTests(lay).forEach(t => { if (t.result) tests[t.obj] = t.result; });
    const f = C.facts({ layout: lay, sol, prev: before, evt: on, view, tests, gapFilled, warm: k === 'wait' && sol.flowing && +a >= 10, fuse });
    if (C.litBulbs(sol).length) gapFilled = false;
    f.forEach(v => seen.add(v));
  }
  return { lay, sol: S(lay), seen, cards, tests };
}
for (const g of P) {
  const miss = [], carded = [];
  for (const dsc of C.forGrade(C.DISCOVERIES, g)) {
    const run = simulate(dsc.how);
    if (!run.seen.has(dsc.when)) miss.push(dsc.id + ' (wants ' + dsc.when + ', saw ' + [...run.seen].join(' ') + ')');
    if (run.cards.length) carded.push(dsc.id + ': ' + run.cards.join('; '));
  }
  ok(`Grade ${g}: every discovery's own recipe reaches the fact that unlocks it`, miss.length === 0, miss);
  ok(`Grade ${g}: no recipe trips a hazard or a "what went wrong" card on the way`, carded.length === 0, carded);
  const gc = C.forGrade(C.GUIDES, g).map(G => ({ id: G.id, cards: simulate(G.steps.map(st => st.on)).cards })).filter(q => q.cards.length);
  ok(`Grade ${g}: every guided experiment runs to its end with no card on the way`, gc.length === 0, gc);
}
let run = simulate(C.GUIDES.find(G => G.id === 'g4-test').steps.map(st => st.on));
ok('"Conductor or insulator?" (Grade 4): its lesson is what happened - spoon and lead conduct, the ruler does not',
   run.tests.spoon === 'conductor' && run.tests.lead === 'conductor' && run.tests.ruler === 'insulator');
run = simulate(C.GUIDES.find(G => G.id === 'g6-wire').steps.map(st => st.on));
ok('"What makes a good wire?" (Grade 6): the coin and lead conduct, the rubber does not', run.tests.coin === 'conductor' && run.tests.lead === 'conductor' && run.tests.rubber === 'insulator');
run = simulate(C.GUIDES.find(G => G.id === 'g6-fault').steps.map(st => st.on));
ok('"Find the faults" (Grade 6): both faults mended, the torch lights', C.litBulbs(run.sol).length === 1);
run = simulate(C.GUIDES.find(G => G.id === 'g6-cells').steps.map(st => st.on));
ok('"More cells, more light" (Grade 6): the second cell makes the bulb four times as bright, without blowing it', near(run.sol.bulbs.h12.brightness, 4) && !C.diagnose(run.lay, run.sol).over.length);
ok('the Grade 4 "sort" discovery needs all six things tested', simulate(['build:tester', 'place:v31:spoon', 'switch:on']).seen.has('sorted') === false);

console.log('\nWords a 9-11-year-old can read');
const texts = [];
const add = (where, t) => { if (t) texts.push({ where, t: String(t) }); };
for (const x of [...C.forGrade(C.DISCOVERIES, 4), ...C.forGrade(C.DISCOVERIES, 6)]) ['title', 'hint', 'saw', 'learn', 'formula', 'exam'].forEach(k => add(x.id + '.' + k, x[k]));
for (const G of [...C.forGrade(C.GUIDES, 4), ...C.forGrade(C.GUIDES, 6)]) { add(G.id + '.blurb', G.blurb); add(G.id + '.lesson', G.lesson); G.steps.forEach((st, i) => { add(G.id + '.say' + i, st.say); add(G.id + '.btn' + i, st.btn); }); }
for (const M of [...C.forGrade(C.MISSIONS, 4), ...C.forGrade(C.MISSIONS, 6)]) { add(M.id + '.blurb', M.blurb); add(M.id + '.intro', M.intro); M.quiz.forEach((q, i) => { add(M.id + '.q' + i, q.q); q.options.forEach(o => add(M.id + '.opt' + i, o)); add(M.id + '.why' + i, q.why); }); }
const isP = x => !!x.grades && x.grades.some(g => g <= 6);
for (const [id, H] of Object.entries(C.HAZARDS)) if (isP(H)) [H.title({}), H.happened({}), H.why, H.instead, H.exam, H.log].forEach(t => add(id, t));
for (const [id, Rr] of Object.entries(C.RESULTS)) if (isP(Rr)) [Rr.title({ cells: 3 }), Rr.happened({ cells: 3 }), Rr.instead, Rr.exam].forEach(t => add(id, t));
[...C.FACTS_BY_GRADE[4], ...C.FACTS_BY_GRADE[6]].forEach((t, i) => add('fact' + i, t));
Object.entries(C.JOBS_P).forEach(([k, t]) => add('job.' + k, t));
const JARGON = /\b(amperes?|amps?|volts?|voltage|ohms?|resistance|resistors?|coulombs?|series|parallel|potential difference|terminals?|ammeters?|voltmeters?|charge|filament|NCE)\b|Ω|Q = It|\d\s?V\b|\d\s?A\b|Physics 20/i;
const jargon = texts.filter(x => JARGON.test(x.t)).map(x => x.where + ': ' + x.t.match(JARGON)[0]);
ok('no NCE jargon (volts, amps, ohms, series, parallel, charge, terminal…) in any Grade 4/6 text', jargon.length === 0, jargon);
const words = t => t.split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length;
const sentences = t => t.split(/(?<=[.!?])\s+/);
const longSay = C.GUIDES.filter(isP).flatMap(G => G.steps.map(st => st.say)).flatMap(sentences).filter(x => words(x) > 15);
ok('every guided step says one thing in at most 15 words a sentence', longSay.length === 0, longSay);
const longAny = texts.flatMap(x => sentences(x.t).filter(y => words(y) > 22).map(y => x.where + ': ' + y));
ok('no Grade 4/6 sentence runs past 22 words', longAny.length === 0, longAny);
// Paper references: only what subjects/grade6-science/questions/past_paper_*.js holds.
const ppDir = path.join(ROOT, 'subjects', 'grade6-science', 'questions');
const years = fs.readdirSync(ppDir).map(f => (f.match(/^past_paper_(\d{4})\.js$/) || [])[1]).filter(Boolean);
const refs = texts.flatMap(x => (x.t.match(/PSAC 20\d\d/g) || []).map(m => ({ where: x.where, y: m.slice(5) })));
ok(`every PSAC reference is a year with a past paper in the app (${years.join(', ')})`, refs.every(q => years.includes(q.y)), refs);
ok('PSAC 2024 Q1 really is about the energy out of a switched-on television',
   /Q1:[\s\S]*form of energy <b>at the output<\/b> when a television set is switched on[\s\S]*Q2:/.test(fs.readFileSync(path.join(ppDir, 'past_paper_2024.js'), 'utf8')));
ok('PSAC 2023 really asks why used cells should not be thrown into the environment',
   /Why should used cells not be thrown into the environment/.test(fs.readFileSync(path.join(ppDir, 'past_paper_2023.js'), 'utf8')));
ok('Grade 4 quotes no paper at all (there is no Grade 4 paper)', !texts.filter(x => /^g4/.test(x.where)).some(x => /PSAC 20/.test(x.t)));

// ══ Grade 7 ═══════════════════════════════════
console.log('\nGrade 7 (g7s-electricity)');
const G7 = { gd: C.forGrade(C.GUIDES, 7), ds: C.forGrade(C.DISCOVERIES, 7), ms: C.forGrade(C.MISSIONS, 7) };
ok(`Grade 7: at least 3 guided experiments (${G7.gd.length}), 10 discoveries (${G7.ds.length}), 2 missions (${G7.ms.length})`,
   G7.gd.length >= 3 && G7.ds.length >= 10 && G7.ms.length >= 2);
ok('Grade 7: every id carries its grade (g7_…, g7-…), so progress never collides with another grade’s',
   [...G7.gd, ...G7.ds, ...G7.ms].every(x => /^g7[_-]/.test(x.id)), [...G7.gd, ...G7.ds, ...G7.ms].filter(x => !/^g7[_-]/.test(x.id)).map(x => x.id));
ok('Grade 7: nothing of Grades 4, 6 or 9 is tagged Grade 7, and nothing of Grade 7 is shown at another grade',
   [4, 6, 9].every(g => !C.forGrade([...C.GUIDES, ...C.DISCOVERIES, ...C.MISSIONS], g).some(x => /^g7/.test(x.id))));
ok('Grade 7: every discovery is unlocked by a fact the bench works out', G7.ds.every(x => C.WHENS.includes(x.when)), G7.ds.filter(x => !C.WHENS.includes(x.when)).map(x => x.id));
ok('Grade 7: every mission has at least 5 questions and says what the bench checks', G7.ms.every(M => M.quiz.length >= 5 && ['diagram', 'sp7', 'meters7'].includes(M.kind)));
ok('Grade 7: at least 8 facts for the 💡 button', (C.FACTS_BY_GRADE[7] || []).length >= 8);
ok('Grade 7: every component the syllabus names is on the shelf, with its symbol and a Grade 7 job',
   C.symbolsFor(7) && ['cell', 'bulb', 'switch', 'resistor', 'ammeter', 'voltmeter', 'fuse'].every(k => C.kindsFor(7).includes(k) && C.toolsFor(7).includes(k))
   && C.kindsFor(7).every(k => C.JOBS_7[k] && /<svg/.test(C.SYMBOL[k])));
ok('Grade 7: every quick layout is a real preset', C.QUICK_BY_GRADE[7].every(id => C.PRESETS[id]));

const hz7 = Object.entries(C.HAZARDS).filter(([, h]) => (h.grades || []).includes(7));
const rs7 = Object.entries(C.RESULTS).filter(([, h]) => (h.grades || []).includes(7));
ok(`Grade 7: at least 3 mistakes that teach (${hz7.length} hazards, ${rs7.length} result cards), with a HOT one and an ELECTRIC one`,
   hz7.length + rs7.length >= 3 && hz7.some(([, h]) => h.signs.includes('hot')) && hz7.some(([, h]) => h.signs.includes('electric')));
ok('Grade 7: every card the bench can show at Grade 7 has its own Grade 7 wording (g7_…)',
   ['short_circuit', 'mains', 'wet_hands', 'cable'].every(b => C.HAZARDS['g7_' + b]) && ['open_circuit', 'no_cell', 'cells_wrong', 'bulb_blown', 'ammeter_parallel', 'voltmeter_series'].every(b => C.RESULTS['g7_' + b]));
ok('Grade 7: the ⚠️ row cards (mains, wet hands, split cable) are ELECTRIC, each with a notebook line',
   ['mains', 'wet_hands', 'cable'].every(b => C.HAZARDS['g7_' + b].signs[0] === 'electric' && C.HAZARDS['g7_' + b].log));
ok('Grade 7-only cards: a meter connected the wrong way - the ammeter across the lamp, the voltmeter in the loop (quoting its reading)',
   /IN SERIES/.test(C.RESULTS.g7_ammeter_parallel.instead) && /ACROSS/.test(C.RESULTS.g7_voltmeter_series.instead) && /1\.50 V/.test(C.RESULTS.g7_voltmeter_series.happened({ v: '1.50' })));
ok('Grade 7: the burnt-out lamp card quotes the cells and their voltage (3 cells in series: 4.5 V), as the bench measures it',
   /3 cells in series \(4\.5 V\)/.test(C.RESULTS.g7_bulb_blown.happened({ cells: 3, v: '4.5' })) && near(S(Object.assign(closed('twocells'), { h20: { kind: 'cell' } })).bulbs.h12.V, 4.5));
ok('Grade 7: the cells-the-wrong-way card names the symbol’s long (+) and short (−) lines', /long line \(\+\)/.test(C.RESULTS.g7_cells_wrong.instead) && /long line is the positive/.test(C.RESULTS.g7_cells_wrong.exam));

console.log('\nGrade 7 missions');
const q7 = G7.ms.flatMap(M => M.quiz);
const pics = q7.filter(q => q.options.some(o => typeof o === 'object'));
ok(`Grade 7: ${pics.length} “pick the symbol” questions, every option a picture with its own label`,
   pics.length >= 3 && pics.every(q => q.options.every(o => o && o.label && /<svg/.test(o.svg)) && new Set(q.options.map(o => o.label)).size === 4));
ok('…each answer IS the standard symbol the question asks for', pics.every(q => { const k = (q.q.match(/symbol for an? (\w+)/) || [])[1]; return !!k && q.options[0].svg === C.SYMBOL[k]; }), pics.map(q => q.q));
ok('…and each picture is a different symbol', pics.every(q => new Set(q.options.map(o => o.svg)).size === 4));
const PART_WORDS = /\b(switch|cells?|battery|lamp|bulb|resistor|fuse|ammeter|voltmeter)\b/i;
ok('…and no label names a part - that would give the answer away', pics.every(q => q.options.every(o => !PART_WORDS.test(o.label))), pics.flatMap(q => q.options.map(o => o.label)).filter(t => PART_WORDS.test(t)));
const q45 = q7.find(q => /Three 1\.5 V cells/.test(q.q));
ok('“Three 1.5 V cells in series” is 1.5 + 1.5 + 1.5 = 4.5 V (the bank’s g7s-electricity-020)', q45 && q45.options[0] === C.seriesR(C.EMF, C.EMF, C.EMF).toFixed(1) + ' V');
const qPlus = q7.find(q => /positive \(\+\) terminal/.test(q.q));
ok('the + terminal of the cell symbol is its long thin line, as the bench draws it', qPlus && /long thin/.test(qPlus.options[0]) && /long thin line is the positive/.test(C.KINDS.cell.job));
const ring = { h00: { kind: 'cell' }, h10: { kind: 'wire' }, h20: { kind: 'wire' }, v30: { kind: 'resistor' }, v31: { kind: 'wire' }, h22: { kind: 'wire' },
               h12: { kind: 'bulb' }, h02: { kind: 'wire' }, v01: { kind: 'wire' }, v00: { kind: 'switch', open: false } };
const DP = ['cell', 'switch', 'bulb', 'resistor'];
s = S(ring);
ok('“Build it from the diagram”: the four parts in one closed loop count, and the lamp is dim (the quiz says so)',
   C.oneLoop(s, DP) && C.brightnessWord(s.bulbs.h12.brightness) === 'dim' && q7.some(q => /glowed only dimly/.test(q.q)));
ok('…a resistor on a side branch is NOT one loop', !C.oneLoop(S(Object.assign({}, ring, { v30: { kind: 'wire' }, h11: { kind: 'resistor' }, v11: { kind: 'wire' }, v21: { kind: 'wire' } })), DP));
ok('…nor is the loop with its switch open', !C.oneLoop(S(Object.assign({}, ring, { v00: { kind: 'switch', open: true } })), DP));
const dg7 = C.DIAGRAM_G7;
ok('…and the diagram draws exactly those four symbols: a cell (long + short line), an open switch, a resistor and a lamp - with no words',
   (dg7.match(/<rect/g) || []).length === 1 && (dg7.match(/<circle cx="120"/g) || []).length === 1 && /stroke-width="5"/.test(dg7) && /M130 30 156 16/.test(dg7) && !/<text[^>]*>[A-Za-z]/.test(dg7));
let mc = C.meterChecks(S(closed('meters')));
ok('“Measure it”: an ammeter in the loop and a voltmeter across the lamp both count (1.50 V)', mc.ammeter && mc.voltmeter && near(mc.volts[0], 1.5));
const vIn = closed('single'); vIn.h20 = { kind: 'voltmeter' };
mc = C.meterChecks(S(vIn));
ok('…a voltmeter standing in the loop does not (and the lamp is out)', !mc.voltmeter && !mc.ammeter);
const bs = closed('branch_switch');
ok('“Wired like a house”: switch closed, both lamps light in parallel; open, only the lamp on its branch goes out',
   C.arrangement(S(bs)) === 'parallel' && C.litBulbs(S(L('branch_switch'))).join() === 'h12');

console.log('\nGrade 7: every recipe and guide, replayed');
const miss7 = [], carded7 = [];
for (const dsc of G7.ds) {
  const run7 = simulate(dsc.how, true);
  if (!run7.seen.has(dsc.when)) miss7.push(dsc.id + ' (wants ' + dsc.when + ', saw ' + [...run7.seen].join(' ') + ')');
  if (run7.cards.length) carded7.push(dsc.id + ': ' + run7.cards.join('; '));
}
ok('Grade 7: every discovery’s own recipe reaches the fact that unlocks it', miss7.length === 0, miss7);
ok('Grade 7: no recipe trips a hazard or a “what went wrong” card on the way', carded7.length === 0, carded7);
const gc7 = G7.gd.map(G => ({ id: G.id, cards: simulate(G.steps.map(st => st.on), true).cards })).filter(q => q.cards.length);
ok('Grade 7: every guided experiment runs to its end with no card on the way', gc7.length === 0, gc7);
r = R('g7_cells'); ok('recipe g7_cells: two cells in series, the voltmeter reads 3.00 V (the card says so)', near(r.s.meters.h11.value, 3) && /3\.00 V/.test(all.find(q => q.id === 'g7_cells').saw));
r = R('g7_ammeter'); ok('recipe g7_ammeter reads 0.50 A (the card says so)', near(r.s.meters.h20.value, 0.5) && /0\.50 A/.test(all.find(q => q.id === 'g7_ammeter').saw));
r = R('g7_voltmeter'); ok('recipe g7_voltmeter reads 1.50 V across the lamp (the card says so)', near(r.s.meters.h11.value, 1.5) && /1\.50 V/.test(all.find(q => q.id === 'g7_voltmeter').saw));
r = R('g7_resistor'); ok('recipe g7_resistor reads 0.25 A and the lamp is dim', near(r.s.meters.h20.value, 0.25) && C.brightnessWord(r.s.bulbs.h12.brightness) === 'dim');
const gl7 = id => C.GUIDES.find(G => G.id === id);
run = simulate(gl7('g7-meters').steps.map(st => st.on), true);
ok('“Measure current and voltage” (Grade 7): its lesson’s numbers are what the bench reads (0.50 A / 1.50 V, then 1.00 A / 3.00 V)',
   near(run.sol.meters.h20.value, 1) && near(run.sol.meters.h11.value, 3) && ['0.50 A', '1.50 V', '1.00 A', '3.00 V'].every(t => gl7('g7-meters').lesson.includes(t)));
run = simulate(gl7('g7-parts').steps.map(st => st.on), true);
ok('“Parts and their symbols” (Grade 7): ends in the symbols view with the resistor dimming the lamp', run.seen.has('symbols') && C.brightnessWord(run.sol.bulbs.h12.brightness) === 'dim');
run = simulate(gl7('g7-fuse').steps.map(st => st.on), true);
ok('“A fuse protects the circuit” (Grade 7): the fuse melts and no current flows', run.lay.h20.blown === true && run.sol.cellI < 1e-6 && run.seen.has('fuse_melts'));
run = simulate(gl7('g7-sp').steps.map(st => st.on), true);
ok('“Series or parallel?” (Grade 7): ends with the parallel lamp still lit at full brightness', C.litBulbs(run.sol).join() === 'h11' && near(run.sol.bulbs.h11.brightness, 1));

console.log('\nGrade 7: words for a 12-year-old, and no Grade 9 arithmetic');
const t7 = [];
const add7 = (w, t) => { if (t) t7.push({ where: w, t: String(t) }); };
for (const x of G7.ds) ['title', 'hint', 'saw', 'learn', 'formula', 'exam'].forEach(k => add7(x.id + '.' + k, x[k]));
for (const G of G7.gd) { add7(G.id + '.blurb', G.blurb); add7(G.id + '.lesson', G.lesson); G.steps.forEach((st, i) => { add7(G.id + '.say' + i, st.say); add7(G.id + '.btn' + i, st.btn); }); }
for (const M of G7.ms) { add7(M.id + '.blurb', M.blurb); add7(M.id + '.intro', M.intro); M.quiz.forEach((q, i) => { add7(M.id + '.q' + i, q.q); q.options.forEach(o => add7(M.id + '.opt' + i, typeof o === 'object' ? o.label : o)); add7(M.id + '.why' + i, q.why); }); }
for (const [id, H] of hz7) [H.title({}), H.happened({}), H.why, H.instead, H.exam, H.log].forEach(t => add7(id, t));
for (const [id, Rr] of rs7) [Rr.title({ cells: 3, v: '4.5' }), Rr.happened({ cells: 3, v: '4.5' }), Rr.instead, Rr.exam].forEach(t => add7(id, t));
C.FACTS_BY_GRADE[7].forEach((t, i) => add7('fact' + i, t));
Object.entries(C.JOBS_7).forEach(([k, t]) => add7('job.' + k, t));
const G9ONLY = /Q = It|W = QV|V = IR|R = V ÷ I|\b[Cc]oulombs?\b|1\/R|\d\s?Ω|[Pp]otential difference|Physics 20|\bPSAC\b|\bNCE\b|[Bb]eyond the/;
const g9w = t7.filter(x => G9ONLY.test(x.t)).map(x => x.where + ': ' + x.t.match(G9ONLY)[0]);
ok('Grade 7: no Grade 9 arithmetic (Q = It, W = QV, V = IR, resistance sums) and no paper or other exam named', g9w.length === 0, g9w);
const long7 = G7.gd.flatMap(G => G.steps.map(st => st.say)).flatMap(sentences).filter(x => words(x) > 16);
ok('Grade 7: every guided step says one thing, in at most 16 words a sentence', long7.length === 0, long7);
const longAny7 = t7.flatMap(x => sentences(x.t).filter(y => words(y) > 25).map(y => x.where + ': ' + y));
ok('Grade 7: no sentence runs past 25 words', longAny7.length === 0, longAny7);
ok('Grade 7 quotes no paper - and there is no Grade 7 past paper in the app to quote',
   !fs.readdirSync(path.join(ROOT, 'subjects', 'grade7-science', 'questions')).some(f => /^past_paper/.test(f)) && !t7.some(x => /\b20\d\d\b/.test(x.t)));
const bank7 = fs.readdirSync(path.join(ROOT, 'subjects', 'grade7-science', 'questions')).map(f => fs.readFileSync(path.join(ROOT, 'subjects', 'grade7-science', 'questions', f), 'utf8')).join('\n');
ok('the Grade 7 bank really teaches it: symbols, the ammeter in series, the voltmeter across, 4.5 V from three cells, parallel house lights, the fuse',
   /Which labelled symbol is the <b>switch<\/b>/.test(bank7) && /It is always connected in series/.test(bank7) && /connected in parallel, across the component/.test(bank7)
   && /answer: 4\.5/.test(bank7) && /lights in a house connected in parallel/.test(bank7) && /A fuse is designed to melt/.test(bank7));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
