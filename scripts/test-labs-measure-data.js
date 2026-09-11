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
ok('every instrument shows as many decimals as its precision needs (a whole-number step, none)',
   Object.values(I).every(x => near(Math.pow(10, -x.dp), x.step) || (x.step >= 1 && Number.isInteger(x.step) && x.dp === 0)));
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
  else if (K === 'cylinder' || K === 'thermometer' || K === 'stopwatch' || K === 'dial') { pos = m.scale; div = I[iid].step; }
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
// Mirrors the bench: instruments are known by their KIND (a Grade 4 jug is a
// cylinder, its ruler a rule); a Grade 4 ruler starts at its end until moved;
// taring a kitchen scale takes the thing off it; each Start is one more try.
function simulate(steps) {
  const s = { inst: null, spec: null, eye: 'level', align: 'end', tared: false, timed: false, trial: -1, tapped: false };
  const out = [];
  for (const on of steps) {
    const [k, v] = on.split(':');
    const K = s.inst ? I[s.inst].kind : null;
    if (k === 'inst') { if (!I[v]) return 'no instrument ' + v; s.inst = v; s.spec = null; s.eye = 'level'; s.tared = false; s.timed = false; s.trial = -1; s.tapped = false; if (I[v].grades) s.align = 'end'; }
    else if (k === 'spec') {
      if (!s.inst) return 'spec before inst';
      if (!D.specimensFor(s.inst).includes(v)) return `${v} is not on the ${s.inst} shelf`;
      s.spec = v; s.timed = false; s.trial = -1; s.tapped = false;
    } else if (k === 'tap') { if (K !== 'cylinder' || !s.spec || !S[s.spec].bubble) return 'tap with no bubble to free'; s.tapped = true; }
    else if (k === 'zoom') { if (!s.inst || ['balance', 'density', 'block'].includes(K)) return 'zoom with nothing to zoom'; }
    else if (k === 'eye') { if (K !== 'cylinder') return 'eye on ' + s.inst; if (!['above', 'level', 'below'].includes(v)) return 'eye ' + v; s.eye = v; }
    else if (k === 'align') { if (K !== 'rule' || I[s.inst].endMm === 0) return 'align on ' + s.inst; s.align = v; }
    else if (k === 'tare') {
      if (K === 'dial') { s.spec = null; s.tared = true; }
      else if (K !== 'balance' || (s.spec && s.spec !== 'closed')) return 'tare with something on the pan';
      else s.tared = true;
    }
    else if (k === 'start') { if (K !== 'stopwatch' || !s.spec) return 'start without a stopwatch and an event'; s.timed = true; s.trial++; }
    else if (k === 'read' || k === 'misread') {
      const m = D.measure(s.inst, s.spec, Object.assign({}, s, { trial: Math.max(0, s.trial) }));
      if (!m.ok) return `${on}: ${m.msg}`;
      if (k === 'misread' && (v === 'unit' ? !m.wrongUnit : v === 'weight' ? m.quantity !== 'mass' : !(m.mistakes[v] || []).length)) return `no "${v}" mistake for ${s.inst}+${s.spec}`;
      out.push({ on, inst: s.inst, spec: s.spec, m });
    } else return 'unknown step ' + on;
  }
  return out;
}
const ids = D.DISCOVERIES.map(d => d.id);
const g9d = D.forGrade(D.DISCOVERIES, 9), g4d = D.forGrade(D.DISCOVERIES, 4), g7d = D.forGrade(D.DISCOVERIES, 7), g8d = D.forGrade(D.DISCOVERIES, 8);
ok(`Grade 9: at least 12 discoveries (${g9d.length}); Grades 4, 7 and 8: at least 10 (${g4d.length}, ${g7d.length}, ${g8d.length}); ids unique, each in one grade`,
   g9d.length >= 12 && g4d.length >= 10 && g7d.length >= 10 && g8d.length >= 10 && new Set(ids).size === ids.length
   && g9d.length + g4d.length + g7d.length + g8d.length === ids.length);
const badD = D.DISCOVERIES.filter(d => !d.icon || !d.title || !d.hint || !d.saw || !d.learn || !d.eq || !Array.isArray(d.how) || !d.how.length
  || typeof simulate(d.how) === 'string' || !/read/.test(d.how[d.how.length - 1]));
ok('every discovery: what you saw, the rule, why, and a recipe that ends in a reading it can reach',
   badD.length === 0, badD.map(d => d.id + ': ' + simulate(d.how)));
if (bench) {
  const unnamed = ids.filter(id => !bench.includes(`'${id}'`));
  ok('the bench names every discovery it can unlock', unnamed.length === 0, unnamed);
}
const perGrade = list => D.GRADES.map(g => D.forGrade(list, g).length);
ok(`at least 3 guided experiments per grade (Grades ${D.GRADES.join('/')}: ${perGrade(D.GUIDES).join('/')}), unique ids`,
   perGrade(D.GUIDES).every(n => n >= 3) && new Set(D.GUIDES.map(g => g.id)).size === D.GUIDES.length);
for (const G of D.GUIDES) {
  const sim = simulate(G.steps.map(s => s.on));
  ok(`${G.title}: every step is a real action with words and a button, and the recipe works`,
     typeof sim !== 'string' && G.steps.every(s => s.say && s.btn) && G.lesson && G.blurb && G.icon, sim);
}

console.log('\nMissions, choices, hazards and result cards');
ok(`at least 2 missions per grade (Grades ${D.GRADES.join('/')}: ${perGrade(D.MISSIONS).join('/')}), unique ids`,
   perGrade(D.MISSIONS).every(n => n >= 2) && new Set(D.MISSIONS.map(m => m.id)).size === D.MISSIONS.length);
const optLabel = o => (o && typeof o === 'object' ? o.label : o);
for (const M of D.MISSIONS) {
  const bad = M.quiz.filter(q => q.options.length !== 4 || new Set(q.options.map(optLabel)).size !== 4 || !q.why || !q.q || q.options.some(o => !optLabel(o)));
  const least = M.grades ? 5 : 4, mg = (M.grades || [9])[0];
  ok(`${M.title} (Grade ${mg}): ${M.quiz.length} questions (≥ ${least}), each with 4 distinct options and a reason`, M.quiz.length >= least && bad.length === 0, bad.map(q => q.q));
  if (M.tasks) ok(`${M.title} (Grade ${mg}): every task is a measurement the bench can make, with this grade's things`,
    M.tasks.every(t => D.measure(t.inst, t.spec, { eye: t.eye || 'level', timed: true, align: t.align || 'end', tared: !!t.tared }).ok
      && (I[t.inst].grades || [9]).includes(mg) && D.specimensFor(t.inst, mg).includes(t.spec)));
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
for (const [id, H] of Object.entries(D.HAZARDS).filter(([, h]) => !h.grades)) {
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

// ════════ Grade 4 (PSAC) ════════
console.log('\nGrade levels: one lab, four separate sets');
ok('GRADES is [4, 7, 8, 9]; forGrade treats untagged content as Grade 9',
   D.GRADES.join() === '4,7,8,9' && D.forGrade([{}, { grades: [4] }], 9).length === 1 && D.forGrade([{}, { grades: [4] }], 4).length === 1);
for (const [name, list] of [['discovery', D.DISCOVERIES], ['guide', D.GUIDES], ['mission', D.MISSIONS]]) {
  const bad = list.filter(x => (x.grades ? !(x.grades.length === 1 && [4, 7, 8].includes(x.grades[0]) && x.id.startsWith('g' + x.grades[0] + '_')) : /^g\d_/.test(x.id)));
  ok(`every Grade 4/7/8 ${name} is tagged with ONE grade and has that grade's g<n>_ id; every Grade 9 one is untagged`, bad.length === 0, bad.map(x => x.id));
}
const g4I = Object.keys(I).filter(id => (I[id].grades || []).includes(4)), g9I = Object.keys(I).filter(id => !I[id].grades);
const g78I = Object.keys(I).filter(id => D.mid(I[id]));
ok(`Grade 4 has its own shelf of ${g4I.length}: ruler, tape, jug, thermometer, kitchen scale, stopwatch`, g4I.join() === 'ruler30,tape,jug,thermo4,scale4,watch4');
ok('Grade 4 instruments see only Grade 4 things to measure, Grade 9 instruments only Grade 9 things',
   g4I.every(i => D.specimensFor(i).length && D.specimensFor(i).every(s => (S[s].grades || []).includes(4)))
   && g9I.every(i => D.specimensFor(i).every(s => (S[s].grades || [9]).includes(9))));
const recipeInst = list => list.flatMap(x => (x.how || (x.steps || []).map(s => s.on)).filter(o => /^inst:/.test(o)).map(o => o.slice(5)));
ok('Grade 4 recipes use only Grade 4 instruments; Grade 9 recipes only Grade 9 ones',
   recipeInst([...D.forGrade(D.DISCOVERIES, 4), ...D.forGrade(D.GUIDES, 4)]).every(i => g4I.includes(i))
   && recipeInst([...D.forGrade(D.DISCOVERIES, 9), ...D.forGrade(D.GUIDES, 9)]).every(i => g9I.includes(i)));
const g4Text = JSON.stringify([D.forGrade(D.DISCOVERIES, 4), D.forGrade(D.GUIDES, 4), D.forGrade(D.MISSIONS, 4), D.FACTS4, D.RULES4, D.CHOICES4,
  g4I.map(i => [I[i].how, I[i].hello, I[i].prec])]);
ok('no vernier, micrometer, zero error, parallax or meniscus in the Grade 4 set (they stay Grade 9)', !/vernier|micrometer|zero error|parallax|meniscus|kelvin/i.test(g4Text));

console.log('\nGrade 4: the ruler, the tape and the gap before 0');
const q0 = D.measure('ruler30', 'pencil4', { align: 'zero' }), qe = D.measure('ruler30', 'pencil4', { align: 'end' });
ok('pencil from the 0 mark: reads 14 cm, and there is nothing to subtract', q0.want === 14 && q0.read === 14 && Object.keys(q0.mistakes).length === 0);
ok('pushed against the ruler’s end (1 cm before 0): it reaches 13 cm, 1 cm too short - the "end" mistake',
   qe.read === 13 && qe.want === 14 && D.judge(qe, 13).verdict === 'end' && I.ruler30.endMm === -10);
ok('the door (90 cm) does not fit a 30 cm ruler - use the tape, which reads 90 cm',
   D.measure('ruler30', 'door4', {}).why === 'range' && /tape measure/.test(D.measure('ruler30', 'door4', {}).msg) && D.measure('tape', 'door4', { align: 'end' }).want === 90);
ok('a tape’s hook is its 0: no gap, so no end mistake; the desk is 120 cm', !D.measure('tape', 'desk4', { align: 'end' }).mistakes.end && D.measure('tape', 'desk4', {}).want === 120);
ok('no Grade 4 length is flagged "not precise enough" (a Grade 9 idea)', g4I.filter(i => I[i].quantity === 'length').every(i => D.specimensFor(i).every(s => !D.measure(i, s, { align: 'zero' }).tooCoarse)));

console.log('\nGrade 4: the measuring jug');
ok('jug: 5 cm inside radius, so 1 ml is 1/(π × 5²) = 0.0127 cm of height', near(D.jugCmPerMl(5), 1 / (Math.PI * 25)) && near(D.jugCmPerMl(5), 0.0127, 1e-4));
ok('eye 8 cm high at 30 cm: 5 × 8/30 = 1.33 cm = 105 ml, so 100 ml (two 50 ml marks) too high - or too low',
   near(5 * 8 / 30 / D.jugCmPerMl(5), 104.7, 0.1) && D.parallaxShift('above', 'jug') === 100 && D.parallaxShift('below', 'jug') === -100);
const jl = D.measure('jug', 'juice4', { eye: 'level' }), ja = D.measure('jug', 'juice4', { eye: 'above' }), jb = D.measure('jug', 'juice4', { eye: 'below' });
ok('juice 350 ml at eye level; 450 ml from above, 250 ml from below - both caught', jl.want === 350 && ja.mistakes.apparent[0] === 450 && jb.mistakes.apparent[0] === 250
   && D.judge(ja, 450).verdict === 'apparent' && D.judge(jb, 250).verdict === 'apparent' && !jl.mistakes.apparent);
ok('no "top of the meniscus" mistake at Grade 4; the worked reading counts on from 300', !jl.mistakes.top && /1 mark above 300/.test(jl.work) && 300 + 50 === 350);

console.log('\nGrade 4: the thermometer counts in 2s');
ok('a mark every 2 °C, a number every 10 °C, −10 °C to 110 °C', I.thermo4.step === 2 && I.thermo4.num === 10 && I.thermo4.min === -10 && I.thermo4.max === 110);
const tp = D.measure('thermo4', 'tap4', {});
ok('tap water 28 °C: 4 marks above 20, 20 + 4 × 2 = 28', tp.want === 28 && /4 marks above 20/.test(tp.work) && 20 + 4 * 2 === 28);
ok('ice and water 0 °C (ice melts at 0 °C); hot water poured by an adult 64 °C', D.measure('thermo4', 'ice4', {}).want === 0 && D.measure('thermo4', 'hot4', {}).want === 64);
ok('pouring kettle water yourself is a hazard, not a reading', D.measure('thermo4', 'kettle4', {}).why === 'hazard' && D.measure('thermo4', 'kettle4', {}).hazard === 'hot_water' && !!D.HAZARDS.hot_water);
ok('every Grade 4 temperature to read sits on a 2 °C mark', D.specimensFor('thermo4').filter(s => !S[s].hazard).every(s => S[s].temp % 2 === 0));

console.log('\nGrade 4: the kitchen scale');
const sc0 = D.measure('scale4', 'mango4', { tared: false }), scT = D.measure('scale4', 'mango4', { tared: true });
ok('pointer at 40 g before weighing: a 340 g mango shows 380 g, and reading 380 g is the "raw" mistake',
   sc0.read === 380 && sc0.want === 340 && D.judge(sc0, 380).verdict === 'raw');
ok('set to 0 first, it shows 340 g and there is no mistake to make', scT.read === 340 && !scT.mistakes.raw);
ok('every Grade 4 mass sits on a 20 g mark, with and without the 40 g', D.specimensFor('scale4').every(s => S[s].mass % 20 === 0 && (S[s].mass + 40) % 20 === 0));

console.log('\nGrade 4: measure three times');
ok('the ball takes 5, 5, 8, 5 s on tries 1-4, and the reading follows the try',
   [0, 1, 2, 3].map(t => D.measure('watch4', 'ball4', { timed: true, trial: t }).want).join() === '5,5,8,5');
ok('the odd one out of 5, 5, 8 is 8; of 5, 5 nothing yet; 5 is the usual time', D.oddOne([5, 5, 8]).odd === 8 && D.oddOne([5, 5]) === null && D.oddOne([5, 5, 8, 5]).usual === 5);

console.log('\nGrade 4: a reading is a number and a unit');
const ju = (m, v, u) => D.judgeUnit(m, v, u);
ok('14 cm, 140 mm and 0.14 m are all the pencil', ju(q0, 14, 'cm').verdict === 'ok' && ju(q0, 140, 'mm').verdict === 'ok' && ju(q0, 0.14, 'm').verdict === 'ok');
ok('14 m is the right number with the wrong unit; 14 g is a unit for something else',
   ju(q0, 14, 'm').verdict === 'unit' && ju(q0, 14, 'm').sameQ === true && ju(q0, 14, 'g').verdict === 'unit' && ju(q0, 14, 'g').sameQ === false);
ok('no unit picked asks for one; 350 ml = 0.35 l; 13 cm on the gap ruler is the end mistake in any unit',
   ju(q0, 14, '').verdict === 'nounit' && ju(jl, 0.35, 'l').verdict === 'ok' && ju(qe, 13, 'cm').verdict === 'end' && ju(qe, 0.13, 'm').verdict === 'end');
const g4Pairs = okPairs.filter(([iid]) => (I[iid].grades || []).includes(4));
ok(`all ${g4Pairs.length} Grade 4 readings have a wrong unit for the guide to write, of a real unit`, g4Pairs.length > 20 && g4Pairs.every(([, , , m]) => D.UNITS[m.wrongUnit] && D.UNIT_CHOICES.includes(m.wrongUnit) && D.UNIT_CHOICES.includes(m.unit)));
ok('Grade 4 notebook conversions: 14 cm = 140 mm; 120 cm = 1 m 20 cm; 350 ml has nothing to add',
   D.convert('length', 14, 'cm', true) === '= 140 mm' && D.convert('length', 120, 'cm', true) === '= 1 m 20 cm' && D.convert('volume', 350, 'ml', true) === '');

console.log('\nGrade 4: missions, choices and cards');
ok('the Grade 4 quiz arithmetic is right (20 + 3 × 2 = 26; 13 − 1 = 12; 300 + 50 = 350)', 20 + 3 * 2 === 26 && 13 - 1 === 12 && 300 + 50 === 350);
const chooseQ = D.MISSIONS.find(m => m.id === 'g4_choose').quiz;
ok('"Right tool" asks "pick the instrument" with picture options { label, svg }',
   chooseQ.filter(q => q.options.every(o => o && typeof o === 'object' && /^<svg /.test(o.svg) && o.label)).length >= 4);
ok('every job in the Grade 4 "Right tool" names a Grade 4 instrument for its own quantity',
   D.CHOICES4.every(c => D.CHOICE_INSTRUMENTS4.includes(c.best) && I[c.best].quantity === c.quantity && c.why && c.job) && D.CHOICE_INSTRUMENTS4.every(i => g4I.includes(i)));
const miss4 = [];
for (const c of D.CHOICES4) for (const iid of D.CHOICE_INSTRUMENTS4) if (iid !== c.best && I[iid].quantity === c.quantity && !c.not[iid]) miss4.push(c.id + '/' + iid);
ok('every wrong Grade 4 tool for the SAME quantity has its own reason', miss4.length === 0, miss4);
ok('a wrong Grade 4 tool for another quantity says, in plain words, what it measures',
   D.wrongToolReason(D.CHOICES4[0], 'scale4') === 'The kitchen scale measures mass (how heavy), not length (how long).');
const h4 = Object.entries(D.HAZARDS).filter(([, h]) => (h.grades || []).includes(4)), r4 = Object.entries(D.RESULTS).filter(([, r]) => (r.grades || []).includes(4));
ok(`Grade 4 hazards (${h4.map(h => h[0]).join(', ')}): hot water → the Hot sign; a snapped thermometer → Sharp`,
   D.HAZARDS.hot_water.signs.join() === 'hot' && D.HAZARDS.snapped.signs.join() === 'sharp'
   && h4.every(([, H]) => H.signs.every(s => D.SIGN_LABELS[s]) && H.title({}) && H.happened({ what: 'the water' }) && H.why && H.instead && H.exam && H.button && H.after));
const rc4 = { spec: 'pencil', typed: '13 cm', want: '14 cm', pos: 'above', zero: '40 g', u: 'm', uName: 'metres', uq: 'length (how long)', ru: 'cm', rName: 'centimetres',
              rq: 'length (how long)', inst: 'ruler', sameQ: true, factor: 100, bigger: true, reason: 'x', best: 'Ruler', bestWhy: 'y' };
ok(`Grade 4 result cards (${r4.map(r => r[0]).join(', ')}): each says what happened, what to do instead and the exam point`,
   r4.length >= 4 && r4.every(([, R]) => R.icon && R.exam && R.title(rc4) && R.happened(rc4) && R.instead(rc4)));
ok('the wrong-unit card: 14 m is 100 times too big; a mass unit on a ruler says what each measures',
   /100 times too big/.test(D.RESULTS.wrong_unit.happened(Object.assign({}, rc4, { typed: '14 m' })))
   && /grams \(g\) measure mass \(how heavy\)/.test(D.RESULTS.wrong_unit.happened(Object.assign({}, rc4, { sameQ: false, u: 'g', uName: 'grams', uq: 'mass (how heavy)' }))));
ok(`at least 3 Grade 4 mistakes that teach (${h4.length} hazards + ${r4.length} result cards)`, h4.length + r4.length >= 3);
ok('Grade 4 facts for the 💡 button, and the help card’s rules', D.FACTS4.length >= 8 && D.FACTS4.every(f => f.length > 30) && D.RULES4.length >= 4);

// LAB_SPEC §8: sentences of about 15 words at most for a 9-year-old.
const LIMIT = 18;
const longSentences = [];
const say = (where, t) => String(t || '').replace(/<[^>]+>/g, '').split(/[.!?]+\s+/)
  .forEach(sn => { const w = sn.trim().split(/\s+/).filter(Boolean).length; if (w > LIMIT) longSentences.push(`${where} (${w}): ${sn.trim().slice(0, 80)}`); });
D.forGrade(D.GUIDES, 4).forEach(G => { say(G.id, G.lesson); say(G.id, G.blurb); G.steps.forEach(s => say(G.id, s.say)); });
g4d.forEach(d => { say(d.id, d.saw); say(d.id, d.learn); say(d.id, d.hint); });
D.forGrade(D.MISSIONS, 4).forEach(M => { say(M.id, M.intro); say(M.id, M.blurb); M.quiz.forEach(q => { say(M.id, q.q); say(M.id, q.why); }); });
h4.forEach(([id, H]) => { say(id, H.happened({ what: 'the tap water' })); say(id, H.why); say(id, H.instead); say(id, H.exam); say(id, H.after); });
r4.forEach(([id, R]) => { say(id, R.happened(rc4)); say(id, R.instead(rc4)); say(id, R.exam); });
D.FACTS4.forEach(f => say('fact', f)); D.RULES4.forEach(f => say('rule', f));
D.CHOICES4.forEach(c => { say(c.id, c.why); Object.values(c.not).forEach(n => say(c.id, n)); });
g4I.forEach(i => { say(i, I[i].how); say(i, I[i].hello); });
g4Pairs.forEach(([iid, sid, , m]) => say(iid + '/' + sid, m.work));
ok(`Grade 4 reading level: no sentence over ${LIMIT} words in any guide, discovery, mission, card, fact or worked reading`, longSentences.length === 0, longSentences.slice(0, 6));

// ════════ Grades 7 and 8 ════════
console.log('\nGrades 7 and 8: their own shelf and things');
ok(`the Grade 7/8 shelf: ${g78I.join(', ')}`, g78I.join() === 'cyl78,block7,bal78,dens8');
ok('the block ruler is Grade 7 only, the density bench Grade 8 only; the cylinder and balance are shared',
   I.block7.grades.join() === '7' && I.dens8.grades.join() === '8' && I.cyl78.grades.join() === '7,8' && I.bal78.grades.join() === '7,8');
ok('each grade sees only its own things on a shared instrument (sugar is Grade 7\'s, no Grade 4 or 9 thing)',
   D.specimensFor('bal78', 7).join() === 'closed,stone78,sugar7' && D.specimensFor('bal78', 8).join() === 'closed,stone78'
   && g78I.every(i => D.specimensFor(i).every(s => (S[s].grades || []).some(g => g === 7 || g === 8))));
const recipe78 = g => recipeInst([...D.forGrade(D.DISCOVERIES, g), ...D.forGrade(D.GUIDES, g)]);
ok('Grade 7 and 8 recipes use only instruments of their own grade',
   recipe78(7).every(i => I[i].grades && I[i].grades.includes(7)) && recipe78(8).every(i => I[i].grades && I[i].grades.includes(8)));
const txt78 = g => JSON.stringify([D.forGrade(D.DISCOVERIES, g), D.forGrade(D.GUIDES, g), D.forGrade(D.MISSIONS, g), D.FACTS_BY_GRADE[g], D.RULES_BY_GRADE[g],
  D.INTRO_BY_GRADE[g], g78I.map(i => [I[i].how, I[i].hello, I[i].prec])]);
ok('no vernier, micrometer or "zero error" at Grades 7-8 (the packs say "zero the balance")', ![7, 8].some(g => /vernier|micrometer|zero error/i.test(txt78(g))));
const meas78 = okPairs.filter(([iid]) => D.mid(I[iid]));
ok(`all ${meas78.length} Grade 7/8 readings: a work line, and the wrong unit a guide writes is a real choice`,
   meas78.length > 30 && meas78.every(([, , , m]) => m.work && (!m.wrongUnit || D.UNITS[m.wrongUnit])));

console.log('\nGrade 7: the measuring cylinder and displacement');
const w7 = D.measure('cyl78', 'water78', { eye: 'level' }), w7a = D.measure('cyl78', 'water78', { eye: 'above' }), w7b = D.measure('cyl78', 'water78', { eye: 'below' });
ok('water 46 cm³ at the bottom of the meniscus; its edge 47; eye above 48, below 44 (the same 2 cm³ parallax as the Grade 9 cylinder)',
   w7.want === 46 && w7.mistakes.top[0] === 47 && w7a.mistakes.apparent[0] === 48 && w7b.mistakes.apparent[0] === 44
   && D.judge(w7, 47).verdict === 'top' && D.judge(w7a, 48).verdict === 'apparent');
const s7 = D.measure('cyl78', 'stone78', {});
ok('stone: 50 → 68 cm³, so 68 − 50 = 18 cm³; typing 68 is "level"', s7.want === 18 && s7.level === 68 && 68 - 50 === 18 && D.judge(s7, 68).verdict === 'level');
const b7 = D.measure('cyl78', 'bubble78', {}), b7t = D.measure('cyl78', 'bubble78', { tapped: true });
ok('rough stone with a 1 cm³ bubble: level 64, not 63; 64 − 40 = 24 is the bubble mistake; tapped, the level is 63 and 63 − 40 = 23',
   b7.level === 64 && b7.want === 23 && D.judge(b7, 24).verdict === 'bubble' && b7t.level === 63 && !b7t.mistakes.bubble && 63 - 40 === 23 && D.judge(b7t, 23).verdict === 'ok');
ok('dropping the steel block in cracks the cylinder; the big stone overflows it (70 + 45 = 115 > 100 cm³)',
   D.measure('cyl78', 'drop78', {}).hazard === 'cyl_crack' && D.measure('cyl78', 'big78', {}).hazard === 'spill'
   && S.big78.before + S.big78.volume > I.cyl78.max && S.stone78.before + S.stone78.volume <= I.cyl78.max && S.bubble78.before + S.bubble78.volume + S.bubble78.bubble <= I.cyl78.max);
ok('1 cm³ = 1 ml: 46 ml is right on the cylinder; 46 cm² is the right number in a unit for area',
   D.judgeUnit(w7, 46, 'ml').verdict === 'ok' && D.judgeUnit(w7, 46, 'cm²').verdict === 'unit' && D.judgeUnit(w7, 46, 'cm²').sameQ === false);

console.log('\nGrade 7: blocks and the balance');
const bx = D.measure('block7', 'box7', {}), sp = D.measure('block7', 'soap7', {});
ok('wooden block 5 × 3 × 2 = 30 cm³ (area 15, sum 10); soap 8 × 5 × 3 = 120 cm³', bx.want === 30 && S.box7.volume === 30 && bx.mistakes.area[0] === 15 && bx.mistakes.sum[0] === 10
   && sp.want === 120 && S.soap7.volume === 120 && D.judge(bx, 15).verdict === 'area' && D.judge(bx, 10).verdict === 'sum');
const bl = D.measure('bal78', 'stone78', { tared: false }), blT = D.measure('bal78', 'stone78', { tared: true });
ok('balance reads 2.4 g empty (g7s-hd-018): the 45.0 g stone shows 47.4 g; zeroed it shows 45.0 g',
   near(D.measure('bal78', 'closed', {}).want, 2.4) && near(bl.read, 47.4) && D.judge(bl, 47.4).verdict === 'raw' && near(blT.read, 45) && !blT.mistakes.raw);
const sg = D.measure('bal78', 'sugar7', { tared: true });
ok('250 g of sugar = 0.25 kg is right; 250 N is weight, not mass (a unit for another quantity)',
   D.judgeUnit(sg, 0.25, 'kg').verdict === 'ok' && D.judgeUnit(sg, 250, 'N').verdict === 'unit' && D.judgeUnit(sg, 250, 'N').sameQ === false
   && D.QUANTITIES.force.kid === 'weight (a force)');
ok('Grade 7/8 notebook conversions: 46 cm³ = 46 ml; 45 g = 0.045 kg; 2.7 g/cm³ = 2700 kg/m³',
   D.convert('volume', 46, 'cm³', 7) === '= 46 ml' && D.convert('mass', 45, 'g', 7) === '= 0.045 kg' && D.convert('density', 2.7, 'g/cm³', 8) === '= 2700 kg/m³');

console.log('\nGrade 8: density = mass ÷ volume');
const dens = Object.keys(S).filter(k => S[k].density != null);
const vol = R => (R.dims ? R.dims[0] * R.dims[1] * R.dims[2] : R.liquid ? R.V : R.after - R.before);
const mass = R => (R.liquid ? R.full - R.empty : R.m);
ok(`all ${dens.length} things on the density bench: density = mass ÷ volume EXACTLY, and the bench agrees`,
   dens.length >= 8 && dens.every(k => near(mass(S[k].rho) / vol(S[k].rho), S[k].density, 1e-9) && D.measure('dens8', k, {}).want === S[k].density),
   dens.map(k => [k, mass(S[k].rho) / vol(S[k].rho), S[k].density]));
// Real densities (g/cm³) the numbers must match.
const REAL = { alu8: [2.69, 2.71], steel8: [7.75, 8.05], copper8: [8.9, 8.96], stone8: [2.4, 3.0], cork8: [0.12, 0.3], wood8: [0.5, 0.8], ice8: [0.91, 0.93], oil8: [0.9, 0.93] };
ok('every density is a real one: aluminium 2.7, steel ≈ 7.9, copper 8.9, stone 2.5, cork 0.24, wood 0.6, ice 0.92, cooking oil 0.92',
   Object.entries(REAL).every(([k, [a, b]]) => S[k].density >= a && S[k].density <= b));
ok('the worked numbers: 108 ÷ 40 = 2.7; 79 ÷ 10 = 7.9; 89 ÷ (60 − 50) = 8.9; 45 ÷ (68 − 50) = 2.5; 24 ÷ 100 = 0.24; 120 ÷ 200 = 0.6; 46 ÷ 50 = 0.92; (126 − 80) ÷ 50 = 0.92',
   near(108 / 40, 2.7) && near(79 / 10, 7.9) && near(89 / (60 - 50), 8.9) && near(45 / (68 - 50), 2.5) && near(24 / 100, 0.24) && near(120 / 200, 0.6) && near(46 / 50, 0.92) && near((126 - 80) / 50, 0.92));
ok('the density-bench stone IS the Grade 7 stone: 45 g and 18 cm³', S.stone8.rho.m === S.stone78.mass && vol(S.stone8.rho) === S.stone78.volume && S.stone8.rho.before === S.stone78.before);
ok('float or sink against water 1.0 g/cm³: cork, wood, ice and oil float; aluminium, steel, copper and stone sink',
   D.WATER === 1 && ['cork8', 'wood8', 'ice8', 'oil8'].every(k => D.measure('dens8', k, {}).floats) && ['alu8', 'steel8', 'copper8', 'stone8'].every(k => !D.measure('dens8', k, {}).floats));
const al = D.measure('dens8', 'alu8', {}), cu = D.measure('dens8', 'copper8', {}), ol = D.measure('dens8', 'oil8', {});
ok('the slips: 40 ÷ 108 = 0.37 (upside down); copper ÷ the final level 89 ÷ 60 = 1.48; oil with its cylinder 126 ÷ 50 = 2.52',
   al.mistakes.flip[0] === 0.37 && D.judge(al, 0.37).verdict === 'flip' && cu.mistakes.dlevel[0] === 1.48 && D.judge(cu, 1.48).verdict === 'dlevel'
   && ol.mistakes.total[0] === 2.52 && D.judge(ol, 2.52).verdict === 'total');
ok('units: 2700 kg/m³ is right (1 g/cm³ = 1000 kg/m³); 2.7 kg/m³ is 1000 times too small',
   D.judgeUnit(al, 2700, 'kg/m³').verdict === 'ok' && D.judgeUnit(al, 2.7, 'kg/m³').verdict === 'unit' && D.judgeUnit(al, 2.7, 'kg/m³').sameQ === true
   && near(D.UNITS['g/cm³'].f / D.UNITS['kg/m³'].f, 1000));
ok('a floating block\'s picture sits with density ÷ 1.0 of it under water (cork 24%, ice 92%)', /y="10.88"/.test(D.floatPic(0.24)) && /y="19.04"/.test(D.floatPic(0.92)));
ok('the Grade 8 quiz arithmetic: 150 ÷ 50 = 3; 39 ÷ (45 − 30) = 2.6; (170 − 60) ÷ 100 = 1.1; wrong options 39 ÷ 45 ≈ 0.87, 39 ÷ 30 = 1.3',
   near(150 / 50, 3) && near(39 / (45 - 30), 2.6) && near((170 - 60) / 100, 1.1) && near(Math.round(39 / 45 * 100) / 100, 0.87) && near(39 / 30, 1.3));
ok('the Grade 7 quiz arithmetic: 37 − 30 = 7; 6 × 4 × 2 = 48; 21.5 − 1.5 = 20.0; 750 g = 0.75 kg', 37 - 30 === 7 && 6 * 4 * 2 === 48 && near(21.5 - 1.5, 20) && near(750 / 1000, 0.75));
ok('weight on Earth: 45 g × 10 N/kg = 0.45 N (the Grade 8 weight card)', near(0.045 * 10, 0.45));

console.log('\nGrades 7 and 8: cards, pictures, reading level');
const h78 = Object.entries(D.HAZARDS).filter(([, h]) => (h.grades || []).some(g => g === 7 || g === 8));
ok(`Grade 7/8 hazards (${h78.map(h => h[0]).join(', ')}): a dropped block and a dropped cylinder → Sharp; spilt water → Caution (warning)`,
   D.HAZARDS.cyl_crack.signs.join() === 'sharp' && D.HAZARDS.cyl_dropped.signs.join() === 'sharp' && D.HAZARDS.spill.signs.join() === 'warning'
   && h78.every(([, H]) => H.signs.every(s => D.SIGN_LABELS[s]) && H.title({}) && H.happened({ what: 'big stone' }) && H.why && H.instead && H.exam && H.button && H.after));
const r78 = Object.entries(D.RESULTS).filter(([, r]) => (r.grades || []).some(g => g === 7 || g === 8));
const rc78 = { typed: '68 cm³', want: '18 cm³', typedN: '15', spec: 'stone', pos: 'above', levelS: '46 cm³', levelN: 68, before: 50, bubble: 1, zeroS: '2.4 g', readS: '47.4 g',
               l: 5, w: 3, h: 2, kind: 'area', u: 'N', uName: 'newtons', uq: 'weight (a force)', inst: 'electronic balance', rq: 'mass (how heavy)', sameQ: false, factor: 1000, bigger: false,
               mass: 108, Vn: 40, after: 60, full: 126, empty: 80 };
ok(`Grade 7/8 result cards (${r78.map(r => r[0]).join(', ')}): each says what happened, what to do instead and the exam point`,
   r78.length >= 8 && r78.every(([, R]) => R.icon && R.exam && R.title(rc78) && R.happened(rc78) && R.instead(rc78)));
ok('the four slips the brief names each have a card: the top of the meniscus, the starting volume, an air bubble, g/cm³ vs kg/m³, mass vs weight',
   ['top78', 'level78', 'bubble78', 'wrong_unit78', 'mass_weight'].every(k => D.RESULTS[k]));
for (const g of [7, 8]) {
  const hz = h78.filter(([, h]) => h.grades.includes(g)).length, rs = r78.filter(([, r]) => r.grades.includes(g)).length;
  ok(`Grade ${g}: ${D.forGrade(D.GUIDES, g).length} guides, ${D.forGrade(D.DISCOVERIES, g).length} discoveries, ${D.forGrade(D.MISSIONS, g).length} missions, ${hz} hazards + ${rs} result cards; facts, rules, a welcome, a unit list`,
     D.forGrade(D.GUIDES, g).length >= 3 && D.forGrade(D.DISCOVERIES, g).length >= 10 && D.forGrade(D.MISSIONS, g).length >= 2 && hz + rs >= 3
     && D.FACTS_BY_GRADE[g].length >= 8 && D.FACTS_BY_GRADE[g].every(f => f.length > 30) && D.RULES_BY_GRADE[g].length >= 4 && D.INTRO_BY_GRADE[g].length >= 4
     && D.UNIT_CHOICES_BY_GRADE[g].every(u => D.UNITS[u]) && D.UNIT_HINT[g] && D.HELP_HINT[g] && D.EMPTY_ICONS[g]);
}
ok('every Grade 7/8 unit list holds the unit of every one of its instruments',
   [7, 8].every(g => g78I.filter(i => I[i].grades.includes(g)).every(i => D.UNIT_CHOICES_BY_GRADE[g].includes(I[i].unit))));
const picQ = D.forGrade(D.MISSIONS, 7).concat(D.forGrade(D.MISSIONS, 8)).flatMap(M => M.quiz).filter(q => q.options.every(o => o && typeof o === 'object' && /^<svg /.test(o.svg) && o.label));
ok(`Grade 7/8 missions ask ${picQ.length} picture questions ({ label, svg })`, picQ.length >= 3);
// A 12-13-year-old: sentences of about 25 words at most.
const LIMIT78 = 25, long78 = [];
const say78 = (where, t) => String(t || '').replace(/<[^>]+>/g, '').split(/[.!?]+\s+/)
  .forEach(sn => { const w = sn.trim().split(/\s+/).filter(Boolean).length; if (w > LIMIT78) long78.push(`${where} (${w}): ${sn.trim().slice(0, 80)}`); });
[7, 8].forEach(g => {
  D.forGrade(D.GUIDES, g).forEach(G => { say78(G.id, G.lesson); say78(G.id, G.blurb); G.steps.forEach(s => say78(G.id, s.say)); });
  D.forGrade(D.DISCOVERIES, g).forEach(d => { say78(d.id, d.saw); say78(d.id, d.learn); say78(d.id, d.hint); });
  D.forGrade(D.MISSIONS, g).forEach(M => { say78(M.id, M.intro); say78(M.id, M.blurb); M.quiz.forEach(q => { say78(M.id, q.q); say78(M.id, q.why); }); });
  D.FACTS_BY_GRADE[g].forEach(f => say78('fact', f)); D.RULES_BY_GRADE[g].forEach(f => say78('rule', f));
});
h78.forEach(([id, H]) => { say78(id, H.happened({ what: 'big stone' })); say78(id, H.why); say78(id, H.instead); say78(id, H.exam); say78(id, H.after); });
r78.forEach(([id, R]) => { say78(id, R.happened(rc78)); say78(id, R.instead(rc78)); say78(id, R.exam); });
meas78.forEach(([iid, sid, , m]) => say78(iid + '/' + sid, m.work));
g78I.forEach(i => { say78(i, I[i].how); say78(i, I[i].hello); });
ok(`Grade 7/8 reading level: no sentence over ${LIMIT78} words`, long78.length === 0, long78.slice(0, 6));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
