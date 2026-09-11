'use strict';
// Science Labs: the physics the Light Bench is allowed to show.
//
// The bench draws whatever engine/labs/lab_light_data.js says, so a mistake in
// that file is a mistake taught to a child. This checks what can be checked
// mechanically: the law of reflection (as an angle AND as a traced ray), Snell's
// law with n = 1.5 at several angles, no bending along the normal, the emergent
// ray parallel to the incident ray and displaced by t·sin(i−r)/cos r, the wrong
// readings (from the surface, parallax), every discovery recipe, every guide,
// every quiz question and every hazard / result card.
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
  const bad = G.steps.filter(s => !tokenOk(s.on, G4(G) ? 4 : 9) || !s.say || (s.on === 'cool' ? !!s.btn : !s.btn));
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

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
