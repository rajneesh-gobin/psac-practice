'use strict';
// Science Labs: the physics the Measurement Lab is allowed to show.
//
// The bench draws whatever engine/labs/lab_measure_data.js says and marks a
// pupil right or wrong by its judge(), so a mistake in that file is a mistake
// taught to a child. This checks what can be checked mechanically: the vernier
// and micrometer reading rules for many settings, zero-error corrections of
// both signs, the meniscus and parallax readings, every true value sitting
// clearly nearer one mark than the next, unit conversions, each instrument's
// precision, every discovery and guide recipe actually reaching its reading or
// its mistake, and every quiz, hazard and result card being complete.
//
// Run: node scripts/test-labs-measure-data.js
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_measure_data.js'), 'utf8');
const bench = fs.existsSync(path.join(ROOT, 'engine', 'labs', 'lab_measure.js'))
  ? fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_measure.js'), 'utf8') : '';
const ctx = vm.createContext({});
vm.runInContext(src + '\nthis.LabMeasureData = LabMeasureData;', ctx);
const D = ctx.LabMeasureData;

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); }
};
const near = (a, b, e = 1e-9) => Math.abs(a - b) < e;
const I = D.INSTRUMENTS, S = D.SPECIMENS;

console.log('\nPrecision of each instrument');
ok('metre rule reads to 0.1 cm (1 mm)', I.rule.step === 0.1 && I.rule.unit === 'cm');
ok('vernier least count = 1 mm − 9 mm/10 = 0.1 mm = 0.01 cm', near((1 - 9 / 10) / 10, I.vernier.step) && I.vernier.unit === 'cm');
ok('micrometer least count = 0.5 mm pitch ÷ 50 thimble divisions = 0.01 mm', near(0.5 / 50, I.micrometer.step) && I.micrometer.unit === 'mm');
ok('measuring cylinder 1 cm³, stopwatch dial 1 s', I.cylinder.step === 1 && I.cylinder.unit === 'cm³' && I.stopwatch.step === 1 && I.stopwatch.unit === 's');
ok('lab thermometer 1 °C over −10..110 °C; clinical 0.1 °C over 35..42 °C',
   I.thermometer.step === 1 && I.thermometer.min === -10 && I.thermometer.max === 110
   && I.clinical.step === 0.1 && I.clinical.min === 35 && I.clinical.max === 42);
ok('balance reads to 0.1 g', I.balance.step === 0.1 && I.balance.unit === 'g');
ok('every instrument shows as many decimals as its precision needs',
   Object.values(I).every(x => near(Math.pow(10, -x.dp), x.step) || (x.step === 1 && x.dp === 0)));
ok('precision ladder micrometer < vernier < rule (in mm)', 0.01 < I.vernier.step * 10 && I.vernier.step * 10 < I.rule.step * 10);

console.log('\nVernier reading rule');
let badV = [];
for (let t = -9; t <= 1500; t++) {                 // every 0.1 mm setting from −0.9 mm to 150 mm
  const R = t / 10, p = D.vernierParts(R);
  const coincide = R + 0.9 * p.div;
  if (!near(coincide, Math.round(coincide), 1e-6)) badV.push([R, 'no coincidence']);
  if (!near(p.mainMm + p.div / 10, R, 1e-9)) badV.push([R, 'main + div ≠ R']);
  if (!near(p.cm, R / 10, 1e-9)) badV.push([R, 'cm']);
  if (p.div < 0 || p.div > 9) badV.push([R, 'div out of range']);
  if (p.mainMm > R + 1e-9) badV.push([R, 'main mark after the vernier zero']);
}
ok('1510 settings: vernier division k lines up with a main mark and main + k × 0.1 mm = reading', badV.length === 0, badV.slice(0, 5));
let badBest = [];
for (let i = 0; i < 4000; i++) {
  const L = (i * 37.13) % 149.9;
  const f = (L * 10) % 1;
  if (Math.abs(f - 0.5) < 0.2) continue;            // the lab never uses a value this close to half-way
  const dist = k => { const x = L + 0.9 * k; return Math.abs(x - Math.round(x)); };
  let best = 0; for (let k = 1; k <= 9; k++) if (dist(k) < dist(best) - 1e-12) best = k;
  const p = D.vernierParts(L);
  const expectDiv = p.div;
  // k = 10 (the next whole mm) is the same reading as k = 0 of the next mm
  if (!(best === expectDiv || (expectDiv === 0 && dist(0) < 0.05))) badBest.push([L, best, expectDiv]);
}
ok('for any true length, the line that lines up BEST is the one the reading rule names', badBest.length === 0, badBest.slice(0, 5));
const vz = D.vernierParts(-0.2);
ok('negative zero error −0.2 mm: main scale −1 mm (−0.1 cm), 8th division, reading −0.02 cm = −(10 − 8) × 0.01',
   vz.mainMm === -1 && vz.div === 8 && near(vz.cm, -0.02) && near(vz.cm, -(10 - vz.div) * 0.01));
const vc = D.vernierParts(23.72);
ok('coin 23.72 mm on a vernier: main 23 mm, 7th division → 2.37 cm', vc.mainMm === 23 && vc.div === 7 && near(vc.cm, 2.37));

console.log('\nMicrometer reading rule');
let badM = [];
for (let h = 0; h <= 2500; h++) {
  const R = h / 100, p = D.micrometerParts(R);
  if (!near(p.sleeve * 2, Math.round(p.sleeve * 2))) badM.push([R, 'sleeve not a half-mm']);
  if (p.thimble < 0 || p.thimble > 49) badM.push([R, 'thimble']);
  if (!near(p.sleeve + p.thimble / 100, R, 1e-9)) badM.push([R, 'sum']);
}
ok('2501 settings 0-25 mm: sleeve (whole or half mm) + thimble × 0.01 mm = reading', badM.length === 0, badM.slice(0, 5));
const mw = D.micrometerParts(0.92), mc = D.micrometerParts(23.72);
ok('wire 0.92 mm: sleeve 0.5 (a half-mm mark showing) + 42 divisions', mw.sleeve === 0.5 && mw.thimble === 42 && mw.half);
ok('coin 23.72 mm: sleeve 23.5 + 22 divisions', mc.sleeve === 23.5 && mc.thimble === 22);

console.log('\nEvery measurement the bench can make');
const opts = [{ align: 'mark', eye: 'level', tared: false, timed: true }, { align: 'end', eye: 'above', tared: true, timed: true },
              { align: 'mark', eye: 'below', tared: false, timed: true }];
const pairs = [];
for (const iid of Object.keys(I)) for (const sid of D.specimensFor(iid)) for (const o of opts) pairs.push([iid, sid, o, D.measure(iid, sid, o)]);
const okPairs = pairs.filter(p => p[3].ok);
ok(`${okPairs.length} readings: the right answer judges "ok"`, okPairs.every(([, , , m]) => D.judge(m, m.want).verdict === 'ok'),
   okPairs.filter(([, , , m]) => D.judge(m, m.want).verdict !== 'ok').map(p => p.slice(0, 2)));
const clash = okPairs.filter(([, , , m]) => {
  const all = [];
  for (const k of Object.keys(m.mistakes)) for (const v of m.mistakes[k]) { if (near(v, m.want, m.step / 1000)) return true; all.push(v); }
  const kinds = Object.keys(m.mistakes);
  for (let a = 0; a < kinds.length; a++) for (let b = a + 1; b < kinds.length; b++)
    if (m.mistakes[kinds[a]].some(x => m.mistakes[kinds[b]].some(y => near(x, y, m.step / 1000)))) return true;
  return false;
});
ok('no mistake ever equals the right answer, and no two mistakes read the same', clash.length === 0, clash.map(p => p.slice(0, 2)));
ok('every mistake value judges as that mistake', okPairs.every(([, , , m]) =>
  Object.keys(m.mistakes).every(k => m.mistakes[k].every(v => D.judge(m, v).verdict === k))));
ok('every reading has a worked explanation and a unit', okPairs.every(([, , , m]) => m.work && m.work.length > 20 && m.unit && m.wantS));
const decimalsOk = okPairs.every(([, , , m]) => near(D.round(m.want, m.step), m.want, m.step / 1000));
ok('every right answer is a whole number of the instrument’s smallest step', decimalsOk);

// The nearest mark is never in doubt: the TRUE position is at least 0.2 of a
// division away from half-way between two marks.
const amb = [];
for (const [iid, sid, o, m] of okPairs) {
  const K = I[iid].kind;
  let pos, div;
  if (K === 'rule') { pos = m.scale; div = 1; }
  else if (K === 'vernier') { pos = m.scale; div = 0.1; }
  else if (K === 'micrometer') { pos = m.scale; div = 0.01; }
  else if (K === 'cylinder' || K === 'thermometer' || K === 'stopwatch') { pos = m.scale; div = I[iid].step; }
  else continue;
  const f = ((pos / div) % 1 + 1) % 1;
  if (Math.abs(f - 0.5) < 0.2 - 1e-9) amb.push([iid, sid, pos]);
}
ok('every true value is clearly nearer one mark than the next (never within 0.2 of half a division)', amb.length === 0, amb);

console.log('\nThe metre rule and its worn end');
const pm = D.measure('rule', 'pencil', { align: 'mark' }), pe = D.measure('rule', 'pencil', { align: 'end' });
ok('pencil 163.2 mm from the 1 cm mark: far end 17.3 cm, length 16.3 cm', near(pm.read, 17.3) && near(pm.want, 16.3));
ok('from the worn end (0.2 cm): far end reads 16.5 cm, 0.2 cm too long - the end error', near(pe.mistakes.end[0], 16.5) && near(pe.want, 16.3)
   && near(pe.mistakes.end[0] - pe.want, D.RULE.wornMm / 10));
ok('forgetting to subtract the 1 cm start is caught', D.judge(pm, 17.3).verdict === 'far');

console.log('\nZero error, both signs');
const za = D.measure('vernier_old', 'closed'), zb = D.measure('vernier_bent', 'closed');
ok('old caliper A, jaws closed, reads +0.03 cm', near(za.want, 0.03));
ok('old caliper B, jaws closed, reads −0.02 cm', near(zb.want, -0.02));
const ra = D.measure('vernier_old', 'rod'), rb = D.measure('vernier_bent', 'rod'), r0 = D.measure('vernier', 'rod');
ok('rod 12.18 mm: a perfect vernier reads 1.22 cm', near(r0.want, 1.22));
ok('caliper A reads 1.25 cm; true = 1.25 − (+0.03) = 1.22 cm', near(ra.read, 1.25) && near(ra.want, 1.22) && near(ra.read - za.want, ra.want));
ok('caliper B reads 1.20 cm; true = 1.20 − (−0.02) = 1.22 cm', near(rb.read, 1.20) && near(rb.want, 1.22) && near(rb.read - zb.want, rb.want));
ok('the uncorrected reading is caught as "raw", adding instead of subtracting as "sign"',
   D.judge(ra, 1.25).verdict === 'raw' && D.judge(ra, 1.28).verdict === 'sign' && D.judge(rb, 1.20).verdict === 'raw' && D.judge(rb, 1.18).verdict === 'sign');
const ba = D.measure('balance', 'stone', { tared: false }), bt = D.measure('balance', 'stone', { tared: true });
ok('balance with a +0.4 g zero error shows 39.0 g for a 38.6 g stone; tared it shows 38.6 g', near(ba.read, 39.0) && near(ba.want, 38.6) && near(bt.read, 38.6)
   && D.judge(ba, 39).verdict === 'raw' && !bt.mistakes.raw);
ok('the empty balance reads its zero error, 0.4 g', near(D.measure('balance', 'closed', {}).want, 0.4) && near(D.measure('balance', 'closed', { tared: true }).want, 0));

console.log('\nMeniscus and parallax');
ok('parallax shift from the cylinder’s geometry: 1.4 cm × 8/30 ÷ 0.17 cm per cm³ ≈ 2 cm³',
   D.parallaxShift('above') === 2 && D.parallaxShift('below') === -2 && D.parallaxShift('level') === 0);
const wl = D.measure('cylinder', 'water', { eye: 'level' }), wa = D.measure('cylinder', 'water', { eye: 'above' }), wb = D.measure('cylinder', 'water', { eye: 'below' });
ok('water: bottom of the meniscus 64 cm³, its top 65 cm³', wl.want === 64 && wl.mistakes.top[0] === 65 && D.judge(wl, 65).verdict === 'top');
ok('eye above reads too HIGH (66), eye below too LOW (62), eye level has no parallax mistake',
   wa.mistakes.apparent[0] === 66 && wb.mistakes.apparent[0] === 62 && !wl.mistakes.apparent
   && D.judge(wa, 66).verdict === 'apparent' && D.judge(wb, 62).verdict === 'apparent');
const st = D.measure('cylinder', 'stone', { eye: 'level' });
ok('stone by displacement: 50 → 63 cm³, volume 13 cm³; typing the new level is caught', st.want === 13 && st.scale === 63 && D.judge(st, 63).verdict === 'level');
ok('glass marble: 15.81 mm diameter and 5.2 g agree with glass (≈ 2.5 g/cm³)',
   near(4 / 3 * Math.PI * Math.pow(S.marble.length / 20, 3) * 2.5, S.marble.mass, 0.1));

console.log('\nChoosing an instrument precise enough');
const coarse = (i, s) => D.measure(i, s, { align: 'mark' }).tooCoarse;
ok('a thin wire is too small for the metre rule (0.1 cm on 0.1 cm) and for the vernier (0.01 on 0.09 cm)', coarse('rule', 'wire') && coarse('vernier', 'wire'));
ok('the micrometer measures the wire properly (0.01 on 0.92 mm)', !coarse('micrometer', 'wire') && near(D.measure('micrometer', 'wire').want, 0.92));
ok('paper on a metre rule reads 0.0 cm - flagged', coarse('rule', 'paper') && D.measure('rule', 'paper', { align: 'mark' }).want === 0);
ok('a coin is fine on the metre rule (2.4 cm) and on the vernier (2.37 cm)', !coarse('rule', 'coin') && !coarse('vernier', 'coin')
   && near(D.measure('rule', 'coin', { align: 'mark' }).want, 2.4) && near(D.measure('vernier', 'coin').want, 2.37));
ok('the pencil is too long for the vernier (15 cm) and the micrometer (25 mm)',
   D.measure('vernier', 'pencil').why === 'range' && D.measure('micrometer', 'pencil').why === 'range' && D.measure('micrometer', 'coin').ok);

console.log('\nThermometers and the stopwatch');
ok('clinical thermometer in hot or boiling water: past its range (it bursts)', D.measure('clinical', 'hot').why === 'burst' && D.measure('clinical', 'boiling').why === 'burst');
ok('clinical thermometer in ice or tap water: below its range', D.measure('clinical', 'ice').why === 'below' && D.measure('clinical', 'tap').why === 'below');
ok('body temperature: clinical 36.8 °C, lab thermometer 37 °C', near(D.measure('clinical', 'body').want, 36.8) && D.measure('thermometer', 'body').want === 37);
ok('melting ice 0 °C and boiling water 100 °C are inside the lab thermometer’s range', D.measure('thermometer', 'ice').want === 0 && D.measure('thermometer', 'boiling').want === 100);
ok('the stopwatch cannot be read before it has timed anything', D.measure('stopwatch', 'kettle', { timed: false }).why === 'untimed');
const kt = D.measure('stopwatch', 'kettle', { timed: true });
ok('200 s shows as 3 min 20 s; typing 3.20 or 320 is caught', kt.parts.min === 3 && kt.parts.sec === 20 && D.judge(kt, 3.2).verdict === 'units' && D.judge(kt, 320).verdict === 'units');
ok('10 pendulum swings in 16 s is 1.6 s a swing', /1\.6 s/.test(D.measure('stopwatch', 'pendulum', { timed: true }).work));

console.log('\nSI units and conversions');
ok('2.37 cm = 23.7 mm = 0.0237 m', D.convert('length', 2.37, 'cm') === '= 23.7 mm = 0.0237 m', D.convert('length', 2.37, 'cm'));
ok('0.92 mm = 0.092 cm = 0.00092 m', D.convert('length', 0.92, 'mm') === '= 0.092 cm = 0.00092 m', D.convert('length', 0.92, 'mm'));
ok('64 cm³ = 64 ml = 0.064 dm³', D.convert('volume', 64, 'cm³') === '= 64 ml = 0.064 dm³');
ok('38.6 g = 0.0386 kg', D.convert('mass', 38.6, 'g') === '= 0.0386 kg');
ok('200 s = 3 min 20 s', D.convert('time', 200, 's') === '= 3 min 20 s');
ok('27 °C = 300 K, 0 °C = 273 K, 100 °C = 373 K', D.convert('temp', 27, '°C') === '= 300 K' && D.toKelvin(0) === 273 && D.toKelvin(100) === 373);
ok('SI units: m, kg, m³, s, K', ['length', 'mass', 'volume', 'time', 'temp'].map(q => D.QUANTITIES[q].sym).join() === 'm,kg,m³,s,K');
ok('typed readings parse: "2,36", "−0.02", "2.36 cm", ".5"; nonsense does not',
   D.parseReading('2,36') === 2.36 && D.parseReading('−0.02') === -0.02 && D.parseReading('2.36 cm') === 2.36 && D.parseReading('.5') === 0.5 && D.parseReading('abc') === null && D.parseReading('') === null);
ok('negative numbers are shown with a real minus sign', D.fmt(-0.02, 2) === '−0.02' && D.fmt(0.03, 2) === '0.03');

console.log('\nDiscoveries and guides: every recipe reaches what it claims');
function simulate(steps) {
  const s = { inst: null, spec: null, eye: 'level', align: 'end', tared: false, timed: false };
  const out = [];
  for (const on of steps) {
    const [k, v] = on.split(':');
    if (k === 'inst') { if (!I[v]) return 'no instrument ' + v; s.inst = v; s.spec = null; s.eye = 'level'; s.tared = false; s.timed = false; }
    else if (k === 'spec') {
      if (!s.inst) return 'spec before inst';
      if (!D.specimensFor(s.inst).includes(v)) return `${v} is not on the ${s.inst} shelf`;
      s.spec = v; s.timed = false;
    } else if (k === 'zoom') { if (!s.inst || I[s.inst].kind === 'balance') return 'zoom with nothing to zoom'; }
    else if (k === 'eye') { if (s.inst !== 'cylinder') return 'eye on ' + s.inst; if (!['above', 'level', 'below'].includes(v)) return 'eye ' + v; s.eye = v; }
    else if (k === 'align') { if (s.inst !== 'rule') return 'align on ' + s.inst; s.align = v; }
    else if (k === 'tare') { if (s.inst !== 'balance' || (s.spec && s.spec !== 'closed')) return 'tare with something on the pan'; s.tared = true; }
    else if (k === 'start') { if (s.inst !== 'stopwatch' || !s.spec) return 'start without a stopwatch and an event'; s.timed = true; }
    else if (k === 'read' || k === 'misread') {
      const m = D.measure(s.inst, s.spec, s);
      if (!m.ok) return `${on}: ${m.msg}`;
      if (k === 'misread' && !(m.mistakes[v] || []).length) return `no "${v}" mistake for ${s.inst}+${s.spec}`;
      out.push({ on, inst: s.inst, spec: s.spec, m });
    } else return 'unknown step ' + on;
  }
  return out;
}
const ids = D.DISCOVERIES.map(d => d.id);
ok(`at least 12 discoveries (${ids.length}), unique ids`, ids.length >= 12 && new Set(ids).size === ids.length);
const badD = D.DISCOVERIES.filter(d => !d.icon || !d.title || !d.hint || !d.saw || !d.learn || !d.eq || !Array.isArray(d.how) || !d.how.length
  || typeof simulate(d.how) === 'string' || !/read/.test(d.how[d.how.length - 1]));
ok('every discovery: what you saw, the rule, why, and a recipe that ends in a reading it can reach',
   badD.length === 0, badD.map(d => d.id + ': ' + simulate(d.how)));
if (bench) {
  const unnamed = ids.filter(id => !bench.includes(`'${id}'`));
  ok('the bench names every discovery it can unlock', unnamed.length === 0, unnamed);
}
ok(`at least 3 guided experiments (${D.GUIDES.length}), unique ids`, D.GUIDES.length >= 3 && new Set(D.GUIDES.map(g => g.id)).size === D.GUIDES.length);
for (const G of D.GUIDES) {
  const sim = simulate(G.steps.map(s => s.on));
  ok(`${G.title}: every step is a real action with words and a button, and the recipe works`,
     typeof sim !== 'string' && G.steps.every(s => s.say && s.btn) && G.lesson && G.blurb && G.icon, sim);
}

console.log('\nMissions, choices, hazards and result cards');
ok(`at least 2 missions (${D.MISSIONS.length})`, D.MISSIONS.length >= 2);
for (const M of D.MISSIONS) {
  const bad = M.quiz.filter(q => q.options.length !== 4 || new Set(q.options).size !== 4 || !q.why || !q.q);
  ok(`${M.title}: ${M.quiz.length} questions, each with 4 distinct options and a reason`, M.quiz.length >= 4 && bad.length === 0, bad.map(q => q.q));
  if (M.tasks) ok(`${M.title}: every task is a measurement the bench can make`,
    M.tasks.every(t => D.measure(t.inst, t.spec, { eye: t.eye || 'level', timed: true }).ok));
}
ok('the vernier mission asks the Physics 2023 Q2(a) question: which scale is M, which is V',
   D.MISSIONS[0].quiz.some(q => /MAIN scale with M/.test(q.q)) && D.MISSIONS[0].quiz.some(q => /VERNIER scale, V/.test(q.q)));
ok('the vernier quiz arithmetic is right (2.3 + 7 × 0.01 = 2.37; 9 ÷ 10 = 0.9; 2.37 cm = 23.7 mm)',
   near(2.3 + 7 * 0.01, 2.37) && near(9 / 10, 0.9) && D.convert('length', 2.37, 'cm').startsWith('= 23.7 mm'));
ok('the errors quiz arithmetic is right (1.28 − 0.03 = 1.25; 3.45 − (−0.02) = 3.47)', near(1.28 - 0.03, 1.25) && near(3.45 - (-0.02), 3.47));
ok('every job in "Right tool" names a real best instrument for its own quantity',
   D.CHOICES.every(c => D.CHOICE_INSTRUMENTS.includes(c.best) && I[c.best].quantity === c.quantity && c.why && c.job));
const missingWhy = [];
for (const c of D.CHOICES) for (const iid of D.CHOICE_INSTRUMENTS)
  if (iid !== c.best && I[iid].quantity === c.quantity && !c.not[iid]) missingWhy.push(c.id + '/' + iid);
ok('every wrong instrument for the SAME quantity has its own reason', missingWhy.length === 0, missingWhy);
ok('a wrong instrument for another quantity says what it does measure',
   /measures volume, not length/.test(D.wrongToolReason(D.CHOICES[0], 'cylinder')));
for (const [id, H] of Object.entries(D.HAZARDS)) {
  const c = { what: 'boiling water', temp: 100 };
  ok(`hazard ${id}: a real sign, what happened, why, what to do and the exam point`,
     H.signs.length && H.signs.every(s => D.SIGN_LABELS[s]) && H.title(c) && H.happened(c) && H.why && H.instead && H.exam && /100 °C/.test(H.happened(c)));
}
const rc = { pos: 'above', typed: '66 cm³', want: '64 cm³', inst: 'old caliper A', empty: 'its jaws are closed', zeroS: '+0.03 cm', typedS: '1.25 cm',
             readS: '1.25 cm', wantS: '1.22 cm', spec: 'the diameter of a copper wire', stepS: '0.1 cm', ratio: 'as big as the wire', better: 'micrometer',
             reason: 'x', best: 'Micrometer', bestWhy: 'y' };
const badR = Object.entries(D.RESULTS).filter(([, R]) => !R.icon || !R.exam || !R.title(rc) || !R.happened(rc) || !R.instead(rc));
ok(`${Object.keys(D.RESULTS).length} result cards, each with what happened, what to do instead and the exam point`,
   Object.keys(D.RESULTS).length >= 3 && badR.length === 0, badR.map(r => r[0]));
ok('at least 3 mistakes that teach (hazards + result cards)', Object.keys(D.HAZARDS).length + Object.keys(D.RESULTS).length >= 3);
ok('facts are there for the 💡 button', D.FACTS.length >= 8 && D.FACTS.every(f => f.length > 30));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
