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
const ids = L.DISCOVERIES.map(d => d.id);
ok('at least 12 discoveries', ids.length >= 12, ids.length);
ok('discovery ids are unique', new Set(ids).size === ids.length);
const tokenOk = on => {
  const [k, v] = on.split(':');
  if (k === 'setup') return !!L.SETUPS[v];
  if (k === 'source') return !!L.SOURCES[v];
  if (k === 'power') return v === 'on' || v === 'off';
  if (k === 'protractor') return v === 'normal' || v === 'surface';
  if (k === 'eye') return v === 'above' || v === 'side';
  if (k === 'angle') return /^\d+$/.test(v) && +v >= 0 && +v <= L.LIMITS.maxI && +v % L.LIMITS.step === 0;
  if (k === 'tilt') return /^-?\d+$/.test(v) && +v >= L.LIMITS.tauMin && +v <= L.LIMITS.tauMax;
  if (k === 'cards') return v === 'move' || v === 'align';
  return ['normal', 'read', 'look', 'lift', 'cool', 'pack'].includes(on);
};
const badDisc = L.DISCOVERIES.filter(d => !d.learn || !d.hint || !d.saw || !d.title || !d.icon || !Array.isArray(d.how) || !d.how.length || !d.how.every(tokenOk));
ok('every discovery has what you saw, why it happens, a clue and a valid “how to find it” recipe', badDisc.length === 0, badDisc.map(d => d.id));
const unreachable = ids.filter(id => !bench.includes(`_discover('${id}')`));
ok('every discovery is unlocked somewhere on the bench', unreachable.length === 0, unreachable);
ok('no recipe asks a pupil to look through the holes with a laser on',
   L.DISCOVERIES.every(d => !(d.how.includes('source:laser') && d.how.includes('look'))));
ok('anything beyond the syllabus (refractive index, 2θ rule) says so',
   L.DISCOVERIES.filter(d => /sin i|2θ|refractive index/.test(d.formula || '')).every(d => /beyond the NCE syllabus/.test(d.formula)));

console.log('\nGuided experiments');
ok('at least 3 guided experiments', L.GUIDES.length >= 3);
ok('guide ids are unique', new Set(L.GUIDES.map(g => g.id)).size === L.GUIDES.length);
for (const G of L.GUIDES) {
  const bad = G.steps.filter(s => !tokenOk(s.on) || !s.say || (s.on === 'cool' ? !!s.btn : !s.btn));
  ok(`${G.title}: every step names a real action, says what to do, and has a button unless it is a wait`, bad.length === 0, bad);
  ok(`${G.title}: ends with what they found out`, !!(G.lesson && G.blurb && G.icon));
}

console.log('\nMissions, hazards and results');
ok('at least 2 missions', L.MISSIONS.length >= 2);
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
for (const [id, R] of Object.entries(L.RESULTS)) {
  const c = L.reading({ setup: 'mirror', beta: 30, tau: 0, ref: id === 'surface' ? 'surface' : 'normal', eye: id === 'parallax' ? 'side' : 'above' });
  ok(`result card ${id} says what happened (with the numbers), what to do and the exam point`,
     R.icon && R.title(c) && R.happened(c).includes(c.i + '°') && R.instead && R.exam, R.happened(c));
}
ok('the from-the-mirror card shows the 90° − θ working', /90° − 30° = 60°/.test(L.RESULTS.surface.happened(surf)));
ok('at least 3 mistakes that teach (hazards + result cards)', Object.keys(L.HAZARDS).length + Object.keys(L.RESULTS).length >= 3);
ok('at least 10 facts for the 💡 button', L.FACTS.length >= 10);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
