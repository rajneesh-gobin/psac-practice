'use strict';
// Science Labs: the physics the Light Bench is allowed to show.
//
// The bench draws whatever engine/labs/lab_light_data.js says, so a mistake in
// that file is a mistake taught to a child. This checks what can be checked
// mechanically: the law of reflection (as an angle AND as a traced ray), Snell's
// law with n = 1.5 at several angles, no bending along the normal, the emergent
// ray parallel to the incident ray and displaced by t·sin(i−r)/cos r, the wrong
// readings (from the surface, parallax), every discovery recipe, every guide,
// every quiz question and every hazard / result card - and, since 2026-09-20,
// every EXPERIMENT (lab_experiment.js): its tokens, its refs, the label each
// instruction names, and its See text replayed through this file's own maths.
//
// Run: node scripts/test-labs-light-data.js
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_light_data.js'), 'utf8');
const bench = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_light.js'), 'utf8');
const core = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_core.js'), 'utf8');
const ctx = vm.createContext({});
vm.runInContext(src + '\nthis.LabLightData = LabLightData;', ctx);
const L = ctx.LabLightData;

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); }
};
const near = (a, b, eps = 1e-9) => Math.abs(a - b) < eps;
const RAD = Math.PI / 180;

console.log('\nReflection');
ok('angle of reflection = angle of incidence (0°-80°)', [0, 10, 25, 30, 45, 60, 80].every(i => L.reflectAngle(i) === i));
const mirrorBad = [];
for (let beta = 0; beta <= 80; beta += 5) for (let tau = -20; tau <= 20; tau += 5) {
  if (Math.abs(beta + tau) > 80) continue;
  const t = L.trace({ setup: 'mirror', beta, tau });
  const i = L.between([-t.d[0], -t.d[1]], t.n), r = L.between(t.out, t.n);
  if (!near(i, Math.abs(beta + tau), 1e-7) || !near(r, i, 1e-7)) mirrorBad.push({ beta, tau, i, r });
  // the incident ray, the normal and the reflected ray are coplanar (2-D) and on opposite sides of the normal
  const side = (t.d[0] * t.n[1] - t.d[1] * t.n[0]) * (t.out[0] * t.n[1] - t.out[1] * t.n[0]);
  if (Math.abs(beta + tau) > 0 && side < 0) mirrorBad.push({ beta, tau, why: 'reflected ray on the same side as the incident ray' });
}
ok('the traced ray obeys i = r for every ray-box and mirror position the bench allows', mirrorBad.length === 0, mirrorBad.slice(0, 3));
const t0 = L.trace({ setup: 'mirror', beta: 0, tau: 0 });
ok('along the normal (i = 0°) the ray is reflected straight back', near(t0.out[0], -t0.d[0], 1e-12) && near(t0.out[1], -t0.d[1], 1e-12));
const dirDeg = v => Math.atan2(v[1], v[0]) / RAD;
const turn = (Math.abs(dirDeg(L.trace({ setup: 'mirror', beta: 30, tau: 10 }).out) - dirDeg(L.trace({ setup: 'mirror', beta: 30, tau: 0 }).out)));
ok('turning the mirror by 10° turns the reflected ray by 20° (the turn_mirror discovery)', near(turn, 20, 1e-7), turn);

console.log('\nRefraction (Snell, n = 1.5)');
const expect = { 0: 0, 10: 6.6478, 20: 13.1801, 30: 19.4712, 40: 25.3740, 45: 28.1255, 50: 30.7102, 60: 35.2644, 70: 38.7896, 80: 41.0364 };
for (const [i, r] of Object.entries(expect)) ok(`i = ${i}° in air → r = ${r}° in glass`, near(L.refractAngle(+i), r, 1e-3), L.refractAngle(+i));
ok('sin i ÷ sin r = 1.5 at every angle from 5° to 80°',
   [5, 15, 25, 35, 55, 65, 75, 80].every(i => near(Math.sin(i * RAD) / Math.sin(L.refractAngle(i) * RAD), 1.5, 1e-9)));
ok('air → glass bends TOWARDS the normal: r < i for every i > 0', [1, 5, 30, 60, 80].every(i => L.refractAngle(i) < i));
ok('glass → air bends AWAY from the normal: e > r', [5, 20, 35, 41].every(r => L.emergentAngle(r) > r));
ok('the bigger the angle of incidence, the bigger the angle of refraction', [10, 20, 30, 40, 50, 60, 70].every((i, k, a) => !k || L.refractAngle(i) > L.refractAngle(a[k - 1])));
ok('no bending along the normal: i = 0° → r = 0°', L.refractAngle(0) === 0);
ok('the critical angle of glass is 41.8° (beyond the NCE syllabus) and the bench never reaches it',
   near(L.criticalAngle(), 41.8103, 1e-3) && L.refractAngle(L.LIMITS.maxI) < L.criticalAngle());
ok('leaving the parallel face, the emergent angle equals the angle of incidence', [0, 15, 30, 45, 60, 80].every(i => near(L.emergentAngle(L.refractAngle(i)), i, 1e-9)));

console.log('\nThe rectangular block, traced');
const blockBad = [];
for (let beta = 0; beta <= 80; beta += 5) for (let tau = -20; tau <= 20; tau += 10) {
  if (Math.abs(beta + tau) > 80) continue;
  const i = Math.abs(beta + tau);
  const t = L.trace({ setup: 'block', beta, tau });
  const par = Math.abs(t.out[0] * t.d[1] - t.out[1] * t.d[0]);        // cross product of unit vectors
  const same = t.out[0] * t.d[0] + t.out[1] * t.d[1] > 0;
  const shiftF = L.lateralShift(i, 1);
  const HW = L.BLOCK.widthMm / L.BLOCK.thicknessMm / 2;
  const along = Math.abs(t.Q[0] * t.s[0] + t.Q[1] * t.s[1]);          // exit point along the far face
  if (par > 1e-9 || !same) blockBad.push({ beta, tau, why: 'emergent not parallel', par });
  if (!near(t.r, L.refractAngle(i), 1e-7)) blockBad.push({ beta, tau, why: 'inside angle', r: t.r });
  if (!near(t.e, i, 1e-7)) blockBad.push({ beta, tau, why: 'emergent angle', e: t.e });
  if (!near(t.shift, shiftF, 1e-9)) blockBad.push({ beta, tau, why: 'shift', a: t.shift, b: shiftF });
  if (along > HW) blockBad.push({ beta, tau, why: 'ray leaves through a side face', along, HW });
}
ok('for every position: r from Snell, emergent ray PARALLEL to the incident ray and at angle i, shift = t·sin(i−r)/cos r, out through the far face',
   blockBad.length === 0, blockBad.slice(0, 3));
const tz = L.trace({ setup: 'block', beta: 0, tau: 0 });
ok('a ray along the normal goes straight through: no bend in, no bend out, no shift',
   near(tz.inside[0], tz.d[0], 1e-12) && near(tz.inside[1], tz.d[1], 1e-12) && near(tz.shift, 0, 1e-12));
ok('the shift grows with the angle (30° → 60°)', L.lateralShift(60, 1) > L.lateralShift(30, 1) && L.lateralShift(30, 1) > 0);
ok('a 6 cm block shifts a 30° ray by about 12 mm', near(L.lateralShift(30, L.BLOCK.thicknessMm), 11.62, 0.05), L.lateralShift(30, 60));

console.log('\nReadings and mistakes');
const good = L.reading({ setup: 'mirror', beta: 30, tau: 0, ref: 'normal', eye: 'above' });
ok('a correct mirror reading at 30°: i = 30°, r = 30°, no faults', good.ok && good.i === 30 && good.r === 30);
const gb = L.reading({ setup: 'block', beta: 40, tau: 0, ref: 'normal', eye: 'above' });
ok('a correct block reading at 40°: i = 40°, r = 25° (to the nearest degree), leaves at 40°', gb.ok && gb.i === 40 && gb.r === 25 && gb.e === 40, gb);
const surf = L.reading({ setup: 'mirror', beta: 30, tau: 0, ref: 'surface', eye: 'above' });
ok('measured from the mirror: 90° − 30° = 60° for both, flagged', !surf.ok && surf.i === 60 && surf.r === 60 && surf.faults[0] === 'surface');
const surfB = L.reading({ setup: 'block', beta: 40, tau: 0, ref: 'surface', eye: 'above' });
ok('measured from the glass surface: 50° and 65°', surfB.i === 50 && surfB.r === 65, surfB);
const par = L.reading({ setup: 'mirror', beta: 30, tau: 0, ref: 'normal', eye: 'side' });
ok(`parallax on a mirror: the two readings split by ${2 * L.PARALLAX_DEG}° - the law seems to break`, !par.ok && par.i === 30 + L.PARALLAX_DEG && par.r === 30 - L.PARALLAX_DEG && par.faults[0] === 'parallax');
ok('a protractor is read to the nearest degree', L.readAngle(19.47) === 19 && L.readAngle(28.13) === 28 && L.readAngle(35.26) === 35);
ok('fromSurface is 90° minus the angle from the normal', L.fromSurface(30) === 60 && L.fromSurface(0) === 90 && L.fromSurface(90) === 0);

console.log('\nDiscoveries');
const G9 = x => !x.grades || x.grades.includes(9), G4 = x => !!x.grades && x.grades.includes(4);
const ids = L.DISCOVERIES.map(d => d.id);
ok('at least 12 Grade 9 discoveries', L.DISCOVERIES.filter(G9).length >= 12, L.DISCOVERIES.filter(G9).length);
ok('discovery ids are unique', new Set(ids).size === ids.length);
const forGrade = (x, g) => (x.grades || [9]).includes(g);
// A recipe may only use apparatus and tokens that exist at its own grade.
const tokenOk = (on, g = 9) => {
  const [k, v] = on.split(':');
  if (k === 'setup') return !!L.SETUPS[v] && forGrade(L.SETUPS[v], g) && !L.SETUPS[v].hazard;
  if (k === 'source') return !!L.SOURCES[v] && forGrade(L.SOURCES[v], g);
  if (g === 4) {
    if (k === 'obj') return !!L.OBJECTS[v];
    if (k === 'pos') return L.SHADOW.positions.includes(+v);
    if (k === 'torch') return v in L.SHADOW.torchAt;
    if (k === 'ruler') return v === 'zero' || v === 'flip';
    if (k === 'name') return !!L.LIGHT_WORDS[v];
    if (['protractor', 'eye', 'angle'].includes(k) || ['normal', 'read', 'lift'].includes(on)) return false;
    if (on === 'measure') return true;
  }
  if (k === 'power') return v === 'on' || v === 'off';
  if (k === 'protractor') return v === 'normal' || v === 'surface';
  if (k === 'eye') return v === 'above' || v === 'side';
  if (k === 'angle') return /^\d+$/.test(v) && +v >= 0 && +v <= L.LIMITS.maxI && +v % L.LIMITS.step === 0;
  if (k === 'tilt') return /^-?\d+$/.test(v) && +v >= L.LIMITS.tauMin && +v <= L.LIMITS.tauMax;
  if (k === 'cards') return v === 'move' || v === 'align';
  return ['normal', 'read', 'look', 'lift', 'cool', 'pack'].includes(on);
};
const badDisc = L.DISCOVERIES.filter(d => !d.learn || !d.hint || !d.saw || !d.title || !d.icon || !Array.isArray(d.how) || !d.how.length
  || !d.how.every(on => tokenOk(on, G4(d) ? 4 : 9)));
ok('every discovery has what you saw, why it happens, a clue and a valid “how to find it” recipe', badDisc.length === 0, badDisc.map(d => d.id));
const unreachable = ids.filter(id => !bench.includes(`_discover('${id}')`));
ok('every discovery is unlocked somewhere on the bench', unreachable.length === 0, unreachable);
ok('no recipe asks a pupil to look through the holes with a laser on',
   L.DISCOVERIES.every(d => !(d.how.includes('source:laser') && d.how.includes('look'))));
ok('anything beyond the syllabus (refractive index, 2θ rule) says so',
   L.DISCOVERIES.filter(d => /sin i|2θ|refractive index/.test(d.formula || '')).every(d => /beyond the NCE syllabus/.test(d.formula)));

console.log('\nGuided experiments');
ok('at least 3 Grade 9 guided experiments', L.GUIDES.filter(G9).length >= 3);
ok('guide ids are unique', new Set(L.GUIDES.map(g => g.id)).size === L.GUIDES.length);
for (const G of L.GUIDES) {
  const bad = G.steps.filter(s => !tokenOk(s.on, G4(G) ? 4 : 9) || !s.say);
  ok(`${G.title}: every step names a real action, says what to do, and has a button unless it is a wait`, bad.length === 0, bad);
  ok(`${G.title}: ends with what they found out`, !!(G.lesson && G.blurb && G.icon));
}

console.log('\nMissions, hazards and results');
ok('at least 2 Grade 9 missions', L.MISSIONS.filter(G9).length >= 2);
for (const M of L.MISSIONS) {
  const bad = M.quiz.filter(q => q.options.length !== 4 || new Set(q.options).size !== 4 || !q.why || !q.q);
  ok(`${M.title}: ${M.quiz.length} questions, each with 4 distinct options and a reason`, M.quiz.length >= 4 && bad.length === 0, bad.map(q => q.q));
  ok(`${M.title}: has a setup on the shelf, an intro and a blurb`, !!(L.SETUPS[M.setup] && M.intro && M.blurb && M.icon));
}
const bend40 = L.MISSIONS.find(m => m.id === 'bend').quiz.find(q => /40°/.test(q.q));
ok('the “which could be r at 40°” answer is what the bench measures', bend40 && bend40.options[0] === L.readAngle(L.refractAngle(40)) + '°', bend40 && bend40.options[0]);
const law50 = L.MISSIONS.find(m => m.id === 'law').quiz.find(q => /MIRROR is 50°/.test(q.q));
ok('the “angle with the mirror is 50°” answer is 90° − 50°', law50 && law50.options[0] === L.fromSurface(50) + '°');
const signKinds = (core.match(/SIGN_LABELS = \{([^}]*)\}/) || [, ''])[1];
for (const [id, H] of Object.entries(L.HAZARDS)) {
  ok(`hazard ${id} has real signs and explains what happened, why, what to do and the exam point`,
     H.signs.length && H.signs.every(s => new RegExp('\\b' + s + ':').test(signKinds)) && H.fx && H.title({}) && H.happened({}) && H.why && H.instead && H.exam);
}
ok('the laser hazard uses the eye sign; the lamp uses the hot sign', L.HAZARDS.laser_eye.signs.includes('eye') && L.HAZARDS.hot_lamp.signs.includes('hot'));
for (const [id, R] of Object.entries(L.RESULTS).filter(([, R]) => G9(R))) {
  const c = L.reading({ setup: 'mirror', beta: 30, tau: 0, ref: id === 'surface' ? 'surface' : 'normal', eye: id === 'parallax' ? 'side' : 'above' });
  ok(`result card ${id} says what happened (with the numbers), what to do and the exam point`,
     R.icon && R.title(c) && R.happened(c).includes(c.i + '°') && R.instead && R.exam, R.happened(c));
}
ok('the from-the-mirror card shows the 90° − θ working', /90° − 30° = 60°/.test(L.RESULTS.surface.happened(surf)));
ok('at least 3 mistakes that teach (hazards + result cards)', Object.keys(L.HAZARDS).length + Object.keys(L.RESULTS).length >= 3);
ok('at least 10 facts for the 💡 button', L.FACTS.length >= 10);

// ══ Grade 4 (PSAC) ══════════════════════════════
console.log('\nGrade levels');
ok('GRADES is [4, 9], and each has a level with its eyebrow', JSON.stringify(L.GRADES) === '[4,9]'
   && L.LEVELS[4].eyebrow === 'Science · Grade 4' && L.LEVELS[9].eyebrow === 'Physics · Grade 9');
ok('the bench never hardcodes an eyebrow or an exam heading for a card',
   !/Physics · Grade 9|Science · Grade 4/.test(bench) && !/examLabel/.test(bench));
ok('the Grade 9 set is untagged, the Grade 4 set is tagged [4] and every id starts g4_',
   [...L.DISCOVERIES, ...L.GUIDES, ...L.MISSIONS, ...Object.values(L.HAZARDS), ...Object.values(L.RESULTS)].every(x => !x.grades || JSON.stringify(x.grades) === '[4]')
   && [...L.DISCOVERIES, ...L.GUIDES, ...L.MISSIONS].filter(G4).every(x => x.id.startsWith('g4_'))
   && Object.keys(L.HAZARDS).concat(Object.keys(L.RESULTS)).every(k => k.startsWith('g4_') === G4(L.HAZARDS[k] || L.RESULTS[k])));
const d4 = L.DISCOVERIES.filter(G4), g4 = L.GUIDES.filter(G4), m4 = L.MISSIONS.filter(G4);
ok(`Grade 4 has at least 10 discoveries (${d4.length}), 3 guided experiments (${g4.length}) and 2 missions (${m4.length})`, d4.length >= 10 && g4.length >= 3 && m4.length >= 2);
for (const M of m4) {
  const bad = M.quiz.filter(q => q.options.length !== 4 || new Set(q.options).size !== 4 || !q.why || !q.q);
  ok(`Grade 4 ${M.title}: at least 5 questions, 4 distinct options and a reason each, set on a Grade 4 bench`,
     M.quiz.length >= 5 && bad.length === 0 && forGrade(L.SETUPS[M.setup], 4), bad.map(q => q.q));
}
ok('every discovery is unlocked somewhere on the bench (both grades)', ids.every(id => bench.includes(`_discover('${id}')`)));

console.log('\nGrade 4 science');
ok('glass is transparent; tracing paper and frosted plastic translucent; card, book and wood opaque (g4s-mat-001/004/011)',
   L.OBJECTS.glass.light === 'transparent' && L.OBJECTS.tracing.light === 'translucent' && L.OBJECTS.frosted.light === 'translucent'
   && ['card', 'book', 'wood'].every(k => L.OBJECTS[k].light === 'opaque'));
ok('the more light a material lets through, the paler its shadow (opaque 0 < translucent < transparent)',
   L.LIGHT_WORDS.opaque.through === 0 && L.LIGHT_WORDS.translucent.through > 0 && L.LIGHT_WORDS.transparent.through > L.LIGHT_WORDS.translucent.through);
ok('similar triangles: shadow ÷ (torch→screen) = object ÷ (torch→object), at every place and torch position',
   Object.keys(L.SHADOW.torchAt).every(t => L.SHADOW.positions.every(p => {
     const T = L.SHADOW.torchAt[t]; return near(L.shadowCm(p, t) / (L.SHADOW.screenAt - T), L.SHADOW.objCm / (p - T), 1e-12); })));
ok('the numbers the bench and the quiz use: 10 cm → 30 cm, 15 cm → 20 cm, 25 cm → 12 cm, 50 cm → 6 cm',
   L.readShadow(10, 'front').realCm === 30 && L.readShadow(15, 'front').realCm === 20 && L.readShadow(25, 'front').realCm === 12 && L.readShadow(50, 'front').realCm === 6);
ok('nearer the torch → bigger shadow, for both torch positions',
   Object.keys(L.SHADOW.torchAt).every(t => L.SHADOW.positions.every((p, k, a) => !k || L.shadowCm(p, t) < L.shadowCm(a[k - 1], t))));
ok('every shadow fits the 30 cm ruler, and the start place is on the list',
   Object.keys(L.SHADOW.torchAt).every(t => L.SHADOW.positions.every(p => L.readShadow(p, t).realCm <= L.SHADOW.rulerCm)) && L.SHADOW.positions.includes(L.SHADOW.start));
const flipBad = [];
Object.keys(L.SHADOW.torchAt).forEach(t => L.SHADOW.positions.forEach(p => {
  const r = L.readShadow(p, t, 'flip'); if (r.ok || r.cm === r.realCm || r.cm !== L.SHADOW.rulerCm - r.realCm) flipBad.push({ p, t, r });
}));
ok('an upside-down ruler reads 30 − the real height, and never the right number by luck', flipBad.length === 0, flipBad);
const sz = m4.find(m => m.id === 'g4_sizes').quiz.find(q => /25 cm from the torch/.test(q.q));
ok('the “now it is 25 cm away” answer is what the bench measures, and so is its 20 cm',
   sz && sz.options[0] === L.readShadow(25, 'front').realCm + ' cm' && sz.q.includes(L.readShadow(15, 'front').realCm + ' cm tall'));
const tilts = []; for (let t = L.LIMITS.tauMin; t <= L.LIMITS.tauMax; t += L.LIMITS.tiltStep) tilts.push(t);
ok(`only turning the mirror ${L.BOUNCE.target}° lands the light on the teddy`, tilts.filter(t => L.bounceHits(t)).join() === String(L.BOUNCE.target), tilts.filter(t => L.bounceHits(t)));
ok('turning the mirror further moves the bounced light further along the wall',
   tilts.every((t, k) => !k || L.bounceSpot(t) === null || L.bounceSpot(t) > L.bounceSpot(tilts[k - 1])));

console.log('\nGrade 4 mistakes');
const signs4 = { g4_eye: 'eye', g4_hot: 'hot', g4_sharp: 'sharp' };
for (const [id, s] of Object.entries(signs4)) {
  const H = L.HAZARDS[id];
  ok(`hazard ${id} has the ${s} sign and says what happened, why, what to do and the exam point`,
     H && H.signs.join() === s && new RegExp('\\b' + s + ':').test(signKinds) && H.fx && H.title({}) && H.happened({ src: 'torch' }) && H.why && H.instead && H.exam);
}
ok('the cracked mirror on the shelf is the sharp hazard, not apparatus', L.SETUPS.cracked.hazard === 'g4_sharp' && forGrade(L.SETUPS.cracked, 4));
const lab = { obj: 'tracing', name: 'Tracing paper', said: 'transparent', is: 'translucent' };
ok('calling tracing paper transparent: its own title, and the shadow it really made',
   L.RESULTS.g4_label.title(lab) === 'Tracing paper is not transparent' && /pale, fuzzy shadow/.test(L.RESULTS.g4_label.happened(lab)) && /translucent/.test(L.RESULTS.g4_label.happened(lab)));
ok('an unfair test says both moves and both numbers', /torch AND the card tree/.test(L.RESULTS.g4_unfair.happened({ from: 20, to: 10 })) && /20 cm to 10 cm/.test(L.RESULTS.g4_unfair.happened({ from: 20, to: 10 })));
const rf = L.readShadow(15, 'front', 'flip');
ok('the wrong-end ruler card shows the working: 30 − 10 = 20', L.RESULTS.g4_ruler.happened(rf).includes('30 − 10 = 20'), L.RESULTS.g4_ruler.happened(rf));
ok('Grade 4 has at least 3 mistakes that teach, including all three wrong-but-safe cards', Object.values(L.RESULTS).filter(G4).length >= 3 && Object.values(L.HAZARDS).filter(G4).length >= 3);

console.log('\nGrade 4 reading level');
const texts4 = [];
d4.forEach(d => texts4.push(d.saw, d.learn, d.hint));
g4.forEach(g => { texts4.push(g.blurb, g.lesson); g.steps.forEach(s => texts4.push(s.say)); });
m4.forEach(m => { texts4.push(m.blurb, m.intro); m.quiz.forEach(q => texts4.push(q.q, q.why)); });
Object.values(L.HAZARDS).filter(G4).forEach(H => texts4.push(H.title({}), H.happened({ src: 'torch' }), H.why, H.instead, H.exam));
texts4.push(L.RESULTS.g4_label.happened(lab), L.RESULTS.g4_unfair.happened({ from: 20, to: 10 }), L.RESULTS.g4_ruler.happened(rf), L.RESULTS.g4_label.instead, L.RESULTS.g4_unfair.instead, L.RESULTS.g4_ruler.instead);
L.FACTS_G4.forEach(f => texts4.push(f));
const long = [];
texts4.forEach(t => String(t).split(/(?<=[.!?…])\s+/).forEach(s => { const n = s.split(/\s+/).filter(Boolean).length; if (n > 18) long.push(n + ': ' + s); }));
ok('every Grade 4 sentence is short (18 words at most)', long.length === 0, long);
ok('no Grade 4 text uses Grade 9 ideas: angles, the normal, a protractor, refraction',
   texts4.every(t => !/°|protractor|refract|\bnormal\b|angle/i.test(t)), texts4.filter(t => /°|protractor|refract|\bnormal\b|angle/i.test(t)));
ok('at least 10 Grade 4 facts for the 💡 button', L.FACTS_G4.length >= 10);
ok('read-aloud is only ever started by a tap: one speak() call, reached only from the two 🔊 buttons',
   (bench.match(/\.speak\(/g) || []).length === 1 && (bench.match(/_say\([^)]/g) || []).length === 3
   && /case 'say-coach'[^\n]*_say\(/.test(bench) && /case 'say-guide'[^\n]*_say\(/.test(bench));

// ══ Experiments (lab_experiment.js, LAB_SPEC.md §10) ═══════════
// The contract is checked by scripts/test-labs-experiments-data.js; this is
// the bench's side of it: every setup and step token is one _do() performs at
// that grade, every check ref is a quiz question of that grade, every `say`
// names the control it points at, no step is already satisfied when it is
// reached, and - replayed through the same reading()/readShadow()/trace() the
// bench draws from - each See text is TRUE and the right path trips no card.
console.log('\nExperiments');
const X = L.EXPERIMENTS || [];
ok('the data file exports EXPERIMENTS', Array.isArray(X) && X.length > 0);
ok('experiment ids are unique and start with their grade', new Set(X.map(e => e.id)).size === X.length && X.every(e => e.grades.length === 1 && e.id.startsWith('g' + e.grades[0] + '_')), X.map(e => e.id));
const xChapters = (core.match(/\blight:\s*\{([^}]*)\}/) || [, ''])[1];
const xGradeChapters = g => ((xChapters.match(new RegExp(`\\b${g}:\\s*\\[([^\\]]*)\\]`)) || [, ''])[1].match(/'([^']+)'/g) || []).map(x => x.slice(1, -1));
for (const g of [4, 9]) {
  const mine = X.filter(e => e.grades.includes(g));
  ok(`Grade ${g}: 3 to 5 experiments (${mine.length}), each on a chapter lab_core.js lists for the Light Bench at Grade ${g}`,
     mine.length >= 3 && mine.length <= 5 && mine.every(e => xGradeChapters(g).includes(e.chapter)), { n: mine.length, chapters: mine.map(e => e.chapter), registry: xGradeChapters(g) });
}
ok('Grade 9 experiments name their pack (there is no grade9-science pack)', X.filter(e => e.grades[0] === 9).every(e => e.pack === 'grade9-physics') && X.filter(e => e.grades[0] === 4).every(e => !e.pack));
const xTok = (t, g) => tokenOk(t, g) || t === 'cool' || t === 'measure' || /^(obj|name|pos|torch|ruler):/.test(t) && g === 4;
const xSteps = e => e.steps.map(s => s.on || (s.any && s.any[0]));
const xQ = ref => { if (ref && typeof ref === 'object') return ref; const [m, i] = String(ref).split(':'); const M = L.MISSIONS.find(x => x.id === m); return M ? M.quiz[Number(i)] : null; };
const words = s => String(s).trim().split(/\s+/).filter(Boolean).length;

// A model of the bench, driven by the same tokens _do() takes, with every
// number from this file. Returns the notebook and any card the bench would show.
function xRun(g, tokens) {
  const st = { setup: null, source: g === 4 ? 'torch' : 'raybox', power: false, beta: 30, tau: 0, normal: false, prot: false, ref: 'normal', eye: 'above',
               aligned: true, lifted: false, obj: 'card', pos: L.SHADOW.start, torch: 'front', ruler: 'zero', moved: { torch: false, obj: false }, shadows: [],
               log: [], cards: [], readings: [] };
  const i = () => Math.abs(st.beta + st.tau);
  const optical = () => st.setup === 'mirror' || st.setup === 'block';
  const note = () => { const O = L.OBJECTS[st.obj], W = L.LIGHT_WORDS[O.light]; st.log.push(`Shadow of the ${O.name.toLowerCase()}: ${L.cap(W.shadow)}. ${W.lets}`); };
  for (const t of tokens) {
    const [k, v] = t.split(':');
    switch (k) {
      case 'setup': if (L.SETUPS[v].hazard) { st.cards.push(L.SETUPS[v].hazard); break; }
        Object.assign(st, { setup: v, beta: g === 4 ? L.BOUNCE.beta : 30, tau: 0, normal: false, prot: false, lifted: false, aligned: true, obj: 'card', pos: L.SHADOW.start, torch: 'front', ruler: 'zero', moved: { torch: false, obj: false }, shadows: [] }); break;
      case 'source': st.source = v; break;
      case 'power': st.power = v === 'on'; if (g === 4 && st.setup === 'shadow') { if (st.power) note(); else st.log.push('Torch off: The shadow went too. No light, no shadow.'); } break;
      case 'obj': if (st.setup === 'shadow' && st.obj !== v) { st.obj = v; if (st.power) note(); } break;
      case 'pos': if (st.setup === 'shadow' && st.pos !== +v) { st.pos = +v; st.moved.obj = true; } break;
      case 'torch': if (st.torch !== v) { st.torch = v; st.moved.torch = true; } break;
      case 'ruler': st.ruler = v; break;
      case 'measure': {
        if (st.setup !== 'shadow' || !st.power || L.OBJECTS[st.obj].light !== 'opaque') break;
        const R = L.readShadow(st.pos, st.torch, st.ruler), last = st.shadows[st.shadows.length - 1];
        if (!R.ok) { st.cards.push('g4_ruler'); break; }
        if (last && st.moved.torch && st.moved.obj) { st.cards.push('g4_unfair'); st.shadows = []; st.moved = { torch: false, obj: false }; break; }
        st.shadows.push({ pos: st.pos, cm: R.cm }); st.moved = { torch: false, obj: false };
        st.readings.push({ pos: st.pos, cm: R.cm });
        st.log.push(`Shadow of the ${L.OBJECTS[st.obj].name.toLowerCase()}: at the ${st.pos} cm mark → shadow ${R.cm} cm tall`); break; }
      case 'name': { if (st.setup !== 'shadow' || !st.power) break; const is = L.OBJECTS[st.obj].light;
        if (v !== is) st.cards.push('g4_label'); else st.log.push(`${L.OBJECTS[st.obj].name}: ${is}`); break; }
      case 'look': { if (st.setup !== 'cards') break;
        if (g === 4) { if (!st.power) break; st.log.push(L.cardsPath(st.aligned) === 'through' ? 'Holes in a straight line: A spot of light on the screen.' : 'One card out of line: No spot on the screen.'); break; }
        if (st.power && L.SOURCES[st.source].laser && st.aligned) { st.cards.push('laser_eye'); break; }
        st.log.push(!st.power ? 'Looking with the lamp off' : L.cardsPath(st.aligned) === 'through' ? 'Holes in a straight line' : 'One card out of line'); break; }
      case 'cards': if (st.setup === 'cards') st.aligned = v === 'align'; break;
      case 'normal': if (optical()) st.normal = true; break;
      case 'protractor': if (optical()) { st.prot = true; st.ref = v; } break;
      case 'eye': st.eye = v; break;
      case 'angle': if (optical()) st.beta = Math.max(L.LIMITS.betaMin, Math.min(L.LIMITS.betaMax, +v - st.tau)); break;
      case 'tilt': if (optical() || st.setup === 'bounce') st.tau = +v; break;
      case 'read': { if (!optical() || !st.power || st.lifted || !st.prot || (st.ref === 'normal' && !st.normal)) break;
        const r = L.reading({ setup: st.setup, beta: st.beta, tau: st.tau, ref: st.ref, eye: st.eye });
        st.readings.push(r);
        if (!r.ok) { st.cards.push(r.faults[0]); break; }
        st.log.push(st.setup === 'mirror' ? `Reading at the plane mirror: i = ${r.i}°, r = ${r.r}°` : `Reading at the glass block: i = ${r.i}° r = ${r.r}° e = ${r.e}°`); break; }
      case 'lift': { if (st.setup !== 'block') break; if (st.lifted) { st.lifted = false; break; } if (!st.power) break;
        const tr = L.trace({ setup: 'block', beta: st.beta, tau: st.tau, lifted: false }); st.lifted = true; st.trace = tr;
        st.log.push(tr.i > 0 ? `Traced and lifted the block: parallel, shifted by about ${Math.round(tr.shift * L.BLOCK.thicknessMm)} mm` : 'Traced and lifted the block: one straight line, no shift'); break; }
      case 'pack': st.setup = null; break;
      case 'cool': break;
    }
  }
  return st;
}
// Mirrors _satisfied() in the bench: what a guide skips because it is already so.
const xSat = (st, t) => { if (!t) return false; const [k, v] = t.split(':'); switch (k) {
  case 'setup': return st.setup === v; case 'source': return st.source === v; case 'power': return v === 'on' ? st.power : !st.power;
  case 'normal': return st.normal; case 'protractor': return st.prot && st.ref === v; case 'eye': return st.eye === v;
  case 'angle': return (st.setup === 'mirror' || st.setup === 'block') && Math.abs(st.beta + st.tau) === +v; case 'tilt': return st.tau === +v;
  case 'cards': return v === 'move' ? !st.aligned : st.aligned; case 'obj': return st.setup === 'shadow' && st.obj === v;
  case 'pos': return st.setup === 'shadow' && st.pos === +v; case 'torch': return st.torch === v; case 'ruler': return st.ruler === v; default: return false; } };
// What a child reads on the control a token belongs to (_renderControls / _shelfHTML), emoji aside.
const xLabel = (st, t, g) => { const [k, v] = t.split(':'); const src = L.SOURCES[st.source].short; switch (k) {
  case 'setup': return L.SETUPS[v].name; case 'source': return L.SOURCES[v].name;
  case 'power': return st.power ? `${src} on` : `Switch on ${src.toLowerCase()}`;
  case 'normal': return st.normal ? 'Rub out normal' : 'Draw the normal';
  case 'protractor': return st.prot ? (v === 'normal' ? 'The normal' : st.setup === 'block' ? 'The surface' : 'The mirror') : 'Protractor';
  case 'eye': return st.eye === 'above' ? 'Eye: above' : 'Eye: to the side'; case 'angle': return 'Ray box';
  case 'tilt': return st.setup === 'block' ? 'Block' : 'Mirror'; case 'read': return 'Read the angles';
  case 'look': return g === 4 ? 'Look at the screen' : 'Look through the holes'; case 'cards': return st.aligned ? 'Move the middle card' : 'Line the card up';
  case 'lift': return st.lifted ? 'Put block back' : 'Trace & lift block'; case 'pack': return 'Pack away';
  case 'obj': return L.OBJECTS[v].name; case 'pos': return +v < st.pos ? 'Nearer the torch' : 'Further away';
  case 'torch': return st.torch === 'front' ? 'Move the torch back' : 'Torch back to 0'; case 'ruler': return st.ruler === 'zero' ? 'Ruler: 0 at the bottom' : 'Ruler: upside down';
  case 'measure': return 'Measure the shadow'; case 'name': return v; default: return null; } };
const plain = s => String(s || '').replace(/[\u{1F000}-\u{1FAFF}\u{2300}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}\u{2190}-\u{21FF}]/gu, '').replace(/\s+/g, ' ').trim().toLowerCase();
// A wrong option the bench must only HEAR (its own card or a state change would
// fight the runner's card): the guard in lab_light.js that hears it.
const xGuard = { name: "_expWrong('name:'", protractor: "_expWrong('protractor:'", angle: '_expWrong(would)', tilt: '_expWrong(would)', pos: "_expWrong('pos:'",
                 read: "_expWrong('read')", lift: "_expWrong('lift')", look: "_expWrong('look')", ruler: "_expWrong('ruler:'", torch: "_expWrong('torch:'",
                 eye: '_expWrong(to)', cards: "_expWrong(_b.aligned ? 'cards:move'", measure: "_expWrong('measure')", pack: "_expWrong('pack')", setup: "_expWrong('setup:'", source: "_expWrong('source:'" };
for (const e of X) {
  const t = e.id, g = e.grades[0];
  ok(`${t}: every setup token is one the bench performs at Grade ${g}`, e.setup.every(x => xTok(x, g)), e.setup.filter(x => !xTok(x, g)));
  ok(`${t}: every step token (on, any, options) is one the bench performs at Grade ${g}`, e.steps.every(s => (s.options || s.any || [s.on]).every(x => xTok(x, g))), e.steps);
  ok(`${t}: an ask step lists 2-4 options, its answer among them, and each wrong text names another option`,
     e.steps.filter(s => s.ask).every(s => Array.isArray(s.options) && s.options.length >= 2 && s.options.length <= 4
       && (s.any ? s.any.every(x => s.options.includes(x)) : s.options.includes(s.on)) && Object.keys(s.wrong || {}).every(k => s.options.includes(k) && k !== s.on)), e.steps.filter(s => s.ask));
  ok(`${t}: every check ref is a Grade ${g} quiz question with 4 distinct options and a reason`,
     e.check.every(ref => { const q = xQ(ref); const M = typeof ref === 'string' && L.MISSIONS.find(x => x.id === ref.split(':')[0]);
       return !!q && q.q && Array.isArray(q.options) && q.options.length === 4 && new Set(q.options).size === 4 && !!q.why && (!M || (M.grades || [9]).includes(g)); }), e.check);
  ok(`${t}: at most 5 steps, each under 25 words${g === 4 ? ' (and 12 at Grade 4)' : ''}`,
     e.steps.length <= 5 && e.steps.every(s => words(s.say || s.ask) <= (g === 4 ? 12 : 25)), e.steps.map(s => words(s.say || s.ask)));
  const path = [...e.setup, ...xSteps(e)];
  const run = xRun(g, path);
  ok(`${t}: the right path trips no hazard or "what went wrong" card (setup included)`, run.cards.length === 0, run.cards);
  ok(`${t}: the right path writes at least one notebook line (the See and the Check need evidence)`, run.log.length >= 1, run.log);
  const skipped = [], labels = [];
  e.steps.forEach((s, k) => {
    const before = xRun(g, [...e.setup, ...xSteps(e).slice(0, k)]);
    if (!s.options && !s.any && xSat(before, s.on)) skipped.push({ step: k + 1, on: s.on });
    if (s.say) { const label = xLabel(before, s.on, g); if (!label || !plain(s.say).includes(plain(label))) labels.push({ step: k + 1, say: s.say, label }); }
  });
  ok(`${t}: no step is already satisfied when it is reached (the guide would skip it unseen)`, skipped.length === 0, skipped);
  ok(`${t}: every instruction names the control it points at (the button's text without its emoji)`, labels.length === 0, labels);
  const wrongs = [];
  e.steps.forEach((s, k) => Object.keys(s.wrong || {}).forEach(w => {
    const kind = w.split(':')[0];
    if (kind === 'obj') { const r = xRun(g, [...e.setup, ...xSteps(e).slice(0, k), w]); if (r.cards.length) wrongs.push(w + ': ' + r.cards.join(';')); }
    else if (!xGuard[kind] || !bench.includes(xGuard[kind])) wrongs.push(w + ': no _expWrong guard in lab_light.js');
  }));
  ok(`${t}: every wrong option is placed harmlessly (an object) or heard without acting (the bench guards it)`, wrongs.length === 0, wrongs);
}
// The See text of each experiment is what the maths gives.
const xSee = id => X.find(x => x.id === id).see.saw;
const xGo = (id, n) => { const e = X.find(x => x.id === id); return xRun(e.grades[0], [...e.setup, ...xSteps(e).slice(0, n === undefined ? e.steps.length : n)]); };
const W = L.LIGHT_WORDS;
let r = xGo('g4_through');
ok('"Which things let light through?": glass, tracing paper and wood each went in and were named, and the See quotes the three shadows',
   r.log.some(l => /^Glass sheet: transparent/.test(l)) && r.log.some(l => /^Tracing paper: translucent/.test(l)) && r.log.some(l => /wooden block/.test(l))
   && [W.transparent.shadow, W.translucent.shadow, W.opaque.shadow].every(s => xSee('g4_through').includes(s)), r.log);
ok('…its wrong objects are what their cards say: tracing paper translucent, wood opaque, glass transparent',
   L.OBJECTS.tracing.light === 'translucent' && L.OBJECTS.wood.light === 'opaque' && L.OBJECTS.glass.light === 'transparent');
r = xGo('g4_shadow');
ok('"What makes a shadow?": a dark shadow with the torch on, gone with it off, and the book makes one too',
   r.log.some(l => /card tree: A dark shadow/.test(l)) && r.log.some(l => /^Torch off/.test(l)) && r.log.some(l => /book: A dark shadow/.test(l)) && L.OBJECTS.book.light === 'opaque'
   && /shadow went too/.test(xSee('g4_shadow')) && /book made a dark shadow/.test(xSee('g4_shadow')), r.log);
r = xGo('g4_bigger');
const cms = r.readings.map(x => x.cm);
ok(`"Does a shadow get bigger?": 25 → 15 → 12 cm from the torch measures ${cms.join(', ')} cm, each bigger, torch never moved`,
   r.readings.map(x => x.pos).join() === '25,15,12' && cms.join() === [25, 15, 12].map(p => L.readShadow(p, 'front').realCm).join() && cms[0] < cms[1] && cms[1] < cms[2] && r.shadows.length === 3, r.readings);
ok('…and the See quotes all three numbers', cms.every(c => xSee('g4_bigger').includes(`${c} cm`)), xSee('g4_bigger'));
ok('…its "back to 25 cm" card quotes the shadow at 25 cm', X.find(x => x.id === 'g4_bigger').steps[3].wrong['pos:25'].includes(L.readShadow(25, 'front').realCm + ' cm'));
r = xGo('g4_straight');
ok('"Can light bend round a corner?": a spot with the holes in line, none with the middle card moved',
   L.cardsPath(true) === 'through' && L.cardsPath(false) === 'blocked' && r.log.some(l => /spot of light/.test(l)) && r.log.some(l => /No spot/.test(l)) && /spot went out/.test(xSee('g4_straight')), r.log);
r = xGo('g9_reflect');
ok('"Angle of reflection at 30°": i = r at 30° and at 35°, both from the normal, and the See quotes them',
   r.readings.length === 2 && r.readings.every(x => x.ok && x.i === x.r) && r.readings.map(x => x.i).join() === '30,35'
   && /i = 30°, r = 30°/.test(xSee('g9_reflect')) && /35° and 35°/.test(xSee('g9_reflect')), r.readings);
ok('…its "from the mirror" card shows 90° − 60° = 30°', X.find(x => x.id === 'g9_reflect').steps[0].wrong['protractor:surface'].includes(`${L.fromSurface(30)}°`) && /90° − 60° = 30°/.test(X.find(x => x.id === 'g9_reflect').steps[0].wrong['protractor:surface']));
r = xGo('g9_refract');
ok('"Which way does light bend?": 40° → 25° and 45° → 28° in the glass, r < i both times, and the See quotes them',
   r.readings.map(x => `${x.i}/${x.r}`).join() === `40/${L.readAngle(L.refractAngle(40))},45/${L.readAngle(L.refractAngle(45))}` && r.readings.every(x => x.r < x.i)
   && /r = 25°/.test(xSee('g9_refract')) && /r = 28°/.test(xSee('g9_refract')), r.readings);
r = xGo('g9_parallel');
const mm = Math.round(L.lateralShift(40, L.BLOCK.thicknessMm));
ok(`"Does the ray come out parallel?": leaves at 40°, trace parallel and shifted ${mm} mm - the See says so`,
   r.readings[0] && r.readings[0].e === 40 && r.lifted && r.trace && Math.abs(r.trace.out[0] * r.trace.d[1] - r.trace.out[1] * r.trace.d[0]) < 1e-9
   && xSee('g9_parallel').includes(`${mm} mm`) && /left the far side at 40°/.test(xSee('g9_parallel')), { e: r.readings[0] && r.readings[0].e, mm });
r = xGo('g9_normal');
ok('"Does a ray along the normal bend?": i = 0°, r = 0°, the trace is one straight line with no shift',
   r.readings[0] && r.readings[0].i === 0 && r.readings[0].r === 0 && r.trace && near(r.trace.shift, 0, 1e-12) && /i = 0° and r = 0°/.test(xSee('g9_normal')), r.readings);
// Words and papers.
const xt = [];
for (const e of X) {
  const addx = (k, v) => { if (v) xt.push({ where: e.id + '.' + k, t: String(v), g: e.grades[0] }); };
  addx('title', e.title); addx('aim', e.aim); addx('predict', e.predict.q); e.predict.options.forEach((o, i) => { addx('opt' + i, o.label); addx('sub' + i, o.sub); });
  e.steps.forEach((s, i) => { addx('step' + i, s.say || s.ask); Object.values(s.wrong || {}).forEach((w, j) => addx(`wrong${i}.${j}`, w)); });
  addx('saw', e.see.saw); addx('learn', e.see.learn); addx('exam', e.exam);
  e.check.filter(c => typeof c === 'object').forEach((q, i) => { addx('q' + i, q.q); q.options.forEach(o => addx('qopt' + i, o)); addx('why' + i, q.why); });
}
const x4 = xt.filter(x => x.g === 4);
const xlong = x4.flatMap(x => x.t.split(/(?<=[.!?…])\s+/).filter(y => words(y) > 18).map(y => x.where + ': ' + y));
ok('Grade 4 experiments: every sentence is short (18 words at most)', xlong.length === 0, xlong);
const xjar = x4.filter(x => /°|protractor|refract|\bnormal\b|angle/i.test(x.t)).map(x => x.where);
ok('Grade 4 experiments: no Grade 9 ideas (angles, the normal, a protractor, refraction)', xjar.length === 0, xjar);
ok('Grade 4 experiments quote no paper (there is no Grade 4 paper)', !x4.some(x => /PSAC 20\d\d/.test(x.t)), x4.filter(x => /PSAC 20\d\d/.test(x.t)).map(x => x.where));
const q9dir = path.join(ROOT, 'subjects', 'grade9-physics', 'questions');
const q9 = fs.readdirSync(q9dir).map(f => fs.readFileSync(path.join(q9dir, f), 'utf8')).join('\n');
const xrefs = xt.filter(x => x.g === 9).flatMap(x => (x.t.match(/(?:Physics|NCE) 20\d\d(?: Q\d+[a-z()]*)?/g) || []).map(m => ({ where: x.where, ref: m })));
ok(`Grade 9 experiments: every paper reference (${xrefs.length ? [...new Set(xrefs.map(r => r.ref))].join(', ') : 'none quoted'}) is in subjects/grade9-physics/questions`, xrefs.every(r => q9.includes(r.ref)), xrefs.filter(r => !q9.includes(r.ref)));
ok('the bench exports the experiment adapter with every hook the runner drives',
   /const experiment = \{/.test(bench) && ['list', 'question', 'reset', 'apply', 'guide', 'stop', 'evidence', 'focus', 'selector', 'hooks'].every(k => new RegExp('^\\s*' + k + ':', 'm').test(bench))
   && /return \{ study, experiment,/.test(bench) && /experiment\.hooks\.token\(token, s\)/.test(bench) && /experiment\.hooks\.step\(_guide\.step\)/.test(bench) && /experiment\.hooks\.done\(\)/.test(bench) && /if \(!G\.exp\) _reset\(\);/.test(bench));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
