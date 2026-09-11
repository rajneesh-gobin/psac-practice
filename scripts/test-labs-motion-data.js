'use strict';
// Science Labs: the physics the Motion Track is allowed to show.
//
// The bench draws whatever engine/labs/lab_motion_data.js says, so a mistake in
// that file is a mistake taught to a child. This checks what can be checked
// mechanically: the ramp model (steeper → greater acceleration, 2 cm cancels
// friction), every run covers the 2.0 m track (s = ut + ½at², v² = u² + 2as),
// speed = distance ÷ time, the gradient reading equals the acceleration, the
// area under the line equals the distance, constant speed is a horizontal
// line, the light gates, the hand stopwatch's reaction-time error, the field
// routes (distance vs displacement, average speed vs average velocity), every
// discovery recipe, every guide, every quiz question and every card.
//
// Run: node scripts/test-labs-motion-data.js
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_motion_data.js'), 'utf8');
const bench = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_motion.js'), 'utf8');
const core = fs.readFileSync(path.join(ROOT, 'engine', 'labs', 'lab_core.js'), 'utf8');
const ctx = vm.createContext({});
vm.runInContext(src + '\nthis.LabMotionData = LabMotionData;', ctx);
const M = ctx.LabMotionData;

let pass = 0, fail = 0;
const ok = (label, cond, detail) => {
  if (cond) { pass++; console.log('  PASS  ' + label); }
  else { fail++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); }
};
const near = (a, b, eps = 1e-9) => Math.abs(a - b) < eps;

console.log('\nThe ramp');
const expectA = { 0: -0.1, 2: 0, 10: 0.4, 20: 0.9, 30: 1.4, 40: 1.9, 50: 2.4 };
for (const [h, a] of Object.entries(expectA)) ok(`raised ${h} cm: a = ${a} m/s² (g·h/L − friction)`, near(M.accel(+h), a, 1e-9), M.accel(+h));
ok('the higher the ramp, the greater the acceleration', M.HEIGHTS.every((h, k, a) => !k || M.accel(h) > M.accel(a[k - 1])));
ok('2 cm is a friction-compensated runway: a = 0 exactly', M.accel(2) === 0);
ok('the steepest slope is under 15° (a real school ramp)', near(M.angleDeg(50), 14.4775, 1e-3) && M.angleDeg(50) < 15);
ok('the ramp formula is labelled beyond the NCE syllabus', /beyond the NCE syllabus/.test(M.MODEL_NOTE));

console.log('\nEvery run');
const runs = [];
for (const h of M.HEIGHTS) for (const s of ['rest', 'push']) runs.push(M.plan(h, s));
const moving = runs.filter(p => p.moving);
ok('every moving run covers the 2.0 m track: s = ut + ½at²',
   moving.every(p => near(p.u * p.tEnd + 0.5 * p.a * p.tEnd * p.tEnd, M.TRACK, 1e-9)), moving.map(p => [p.h, p.start, p.tEnd]));
ok('final speed v = u + at at every height', moving.every(p => near(p.vEnd, p.u + p.a * p.tEnd, 1e-12)));
ok('and v² = u² + 2as', moving.every(p => near(p.vEnd * p.vEnd, p.u * p.u + 2 * p.a * M.TRACK, 1e-9)));
ok('state() at the end of a run is the end of the track at the final speed',
   moving.every(p => { const s = M.state(p, p.tEnd); return near(s.x, M.TRACK, 1e-9) && near(s.v, p.vEnd, 1e-12); }));
const p20 = M.plan(20, 'rest');
ok('from rest at 20 cm: 2.0 m in 2.11 s, 1.90 m/s at the end', M.r2(p20.tEnd) === 2.11 && M.r2(p20.vEnd) === 1.9, [p20.tEnd, p20.vEnd]);
ok('from rest, the average speed is half the final speed (uniform acceleration)',
   moving.filter(p => p.u === 0).every(p => near(M.speed(M.TRACK, p.tEnd), p.vEnd / 2, 1e-12)));
ok('a trolley released on a flat track (or the 2 cm runway) does not move', !M.plan(0, 'rest').moving && !M.plan(2, 'rest').moving && M.plan(0, 'rest').vEnd === 0);
const pc = M.plan(2, 'push');
ok('pushed on the 2 cm runway: constant 1.0 m/s, 2.0 s for 2.0 m',
   near(pc.tEnd, 2, 1e-12) && [0, 0.5, 1, 1.5, 2].every(t => near(M.state(pc, t).v, 1, 1e-12)));
const pf = M.plan(0, 'push');
ok('pushed on the flat: friction slows it from 1.0 to 0.77 m/s, still reaching the end', pf.reached && pf.vEnd < pf.u && M.r2(pf.vEnd) === 0.77, pf.vEnd);
ok('speed = distance ÷ time', M.speed(100, 20) === 5 && M.speed(2.0, 2.0) === 1);

console.log('\nGradient = acceleration, area = distance');
const gradBad = moving.filter(p => { const g = M.gradientRead(p); return !near(g.a, M.r2(p.a), 1e-9) || !near(g.v2, M.r2(M.state(p, g.t2).v), 1e-9) || g.t2 > p.tEnd || g.t2 % 0.5 !== 0; });
ok('the gradient read off the line equals the acceleration, for every run', gradBad.length === 0, gradBad.map(p => [p.h, p.start, M.gradientRead(p)]));
ok('the gradient triangle’s corners sit on grid lines and read cleanly (to 2 d.p.)',
   moving.every(p => { const g = M.gradientRead(p); return near(g.v2 * 100, Math.round(g.v2 * 100), 1e-9) && near(M.state(p, g.t2).v, g.v2, 1e-9); }));
const g20 = M.gradientRead(p20);
ok('20 cm from rest: gradient = 1.80 m/s ÷ 2.0 s = 0.9 m/s²', g20.dv === 1.8 && g20.dt === 2 && g20.a === 0.9, g20);
ok('horizontal line → gradient 0; flat push → gradient −0.1 m/s²', M.gradientRead(pc).a === 0 && M.gradientRead(pf).a === -0.1);
ok('the area under every moving line is the 2.0 m travelled', moving.every(p => near(M.areaRead(p).d, M.TRACK, 1e-9)));
ok('triangle from rest, rectangle at constant speed, trapezium with a push',
   M.areaRead(p20).shape === 'triangle' && M.areaRead(pc).shape === 'rectangle' && M.areaRead(M.plan(20, 'push')).shape === 'trapezium');
ok('the triangle working shows ½ × 2.11 s × 1.90 m/s = 2.0 m', M.areaRead(p20).working === '½ × 2.11 s × 1.90 m/s = 2.0 m', M.areaRead(p20).working);
ok('a trolley that never moved has no area: 0 m', M.areaRead(M.plan(0, 'rest')).d === 0);
ok('the fixed axes hold every run (0-4 s, 0-3.5 m/s)', runs.every(p => p.dur <= M.AXES.tMax && p.vEnd <= M.AXES.vMax && p.u <= M.AXES.vMax));

console.log('\nLight gates and the hand stopwatch');
const gt = M.gates(p20);
ok('four light gates, one every 0.5 m', gt.length === 4 && gt.map(g => g.x).join() === '0.5,1,1.5,2', gt);
ok('speeding up: each gate is reached later, faster, and each 0.5 m takes less time',
   gt.every((g, k) => !k || (g.t > gt[k - 1].t && g.v > gt[k - 1].v)) && gt.every((g, k) => k < 2 || (g.t - gt[k - 1].t) < (gt[k - 1].t - gt[k - 2].t)));
ok('the last gate agrees with the run: 2.11 s, 1.90 m/s', gt[3].t === 2.11 && gt[3].v === 1.9);
const sw = M.stopwatch(p20, 0);
ok('a late start makes the hand time SHORTER by the reaction time', near(sw.t, M.r2(p20.tEnd - M.REACT[0]), 1e-9) && sw.t < p20.tEnd);
const rd = M.reading(p20, 'stopwatch', 0), rg = M.reading(p20, 'gates', 0);
ok('…so the hand-timed average speed comes out too high, and is flagged', !rd.ok && rd.avg > rg.avg && rg.ok && rd.faults[0] === 'stopwatch', [rd.avg, rg.avg]);
const three = [0, 1, 2].map(k => M.stopwatch(p20, k).t);
ok('three hand timings scatter, and their mean is closer to the gates than the worst one',
   new Set(three).size === 3 && Math.abs(M.mean(three) - p20.tEnd) < Math.max(...three.map(t => Math.abs(t - p20.tEnd))), three);
ok('typical reaction times are between 0.1 s and 0.35 s', M.REACT.every(r => r >= 0.1 && r <= 0.35));

console.log('\nDistance and displacement');
const W = id => M.walk(id);
ok('there and back: distance 80 m, displacement 0 m', W('back').distance === 80 && W('back').displacement === 0);
ok('round the corner: distance 70 m, displacement 50 m at 53° east of north', W('corner').distance === 70 && W('corner').displacement === 50 && W('corner').dir === '53° east of north', W('corner'));
ok('a straight line: distance = displacement = 60 m, east', W('straight').distance === 60 && W('straight').displacement === 60 && W('straight').dir === 'east' && W('straight').same);
ok('the drawn running track really is 400 m long (within 0.5%) and closes on itself',
   Math.abs(M.pathLength(M.ROUTES.track.pts) - 400) < 2 && W('track').displacement === 0, M.pathLength(M.ROUTES.track.pts));
ok('once round the track at 2 m/s: 200 s, average speed 2 m/s, average velocity 0 m/s', W('track').time === 200 && W('track').avgSpeed === 2 && W('track').avgVel === 0);
ok('displacement is never more than distance', Object.keys(M.ROUTES).every(id => W(id).displacement <= W(id).distance));
ok('average velocity = displacement ÷ time on every route', Object.keys(M.ROUTES).every(id => near(W(id).avgVel, M.r2(W(id).displacement / W(id).time), 1e-9)));
ok('bearings: east = 90°, north = 0°', near(M.bearing(1, 0), 90, 1e-9) && near(M.bearing(0, 1), 0, 1e-9) && M.dirText(-3, 0) === 'west');

console.log('\nDiscoveries');
const ids = M.DISCOVERIES.map(d => d.id);
ok('at least 12 discoveries', ids.length >= 12, ids.length);
ok('discovery ids are unique', new Set(ids).size === ids.length);
const tokenOk = on => {
  const [k, v] = on.split(':');
  if (k === 'setup') return !!M.SETUPS[v];
  if (k === 'height') return M.HEIGHTS.includes(+v) && /^\d+$/.test(v);
  if (k === 'start') return v === 'rest' || v === 'push';
  if (k === 'timer') return v === 'gates' || v === 'stopwatch';
  if (k === 'block') return v === 'on' || v === 'off';
  if (k === 'meaning') return v === 'accel' || v === 'speed';
  if (k === 'route') return !!M.ROUTES[v];
  if (k === 'disp') return v === 'straight' || v === 'path';
  return ['run', 'gradient', 'area', 'walk'].includes(on);
};
const badDisc = M.DISCOVERIES.filter(d => !d.learn || !d.hint || !d.saw || !d.title || !d.icon || !Array.isArray(d.how) || !d.how.length || !d.how.every(tokenOk));
ok('every discovery has what you saw, why it happens, a clue and a valid “how to find it” recipe', badDisc.length === 0, badDisc.map(d => d.id));
ok('every recipe starts by choosing its apparatus', M.DISCOVERIES.every(d => d.how[0].startsWith('setup:')));
const unreachable = ids.filter(id => !bench.includes(`_discover('${id}')`));
ok('every discovery is unlocked somewhere on the bench', unreachable.length === 0, unreachable);
ok('no recipe runs the trolley without its stop block, or makes a known mistake it does not mean to',
   M.DISCOVERIES.every(d => !d.how.includes('block:off') && !d.how.includes('meaning:speed') && !d.how.includes('disp:path')));
ok('the numbers quoted in the discoveries are what the bench computes',
   /1\.80 m\/s in 2\.0 s/.test(M.DISCOVERIES.find(d => d.id === 'gradient').saw)
   && M.DISCOVERIES.find(d => d.id === 'area').saw.includes(M.areaRead(p20).working)
   && /0\.77 m\/s/.test(M.DISCOVERIES.find(d => d.id === 'slowing').saw)
   && M.plan(40, 'rest').vEnd >= M.FAST_END && M.plan(30, 'rest').vEnd < M.FAST_END);
ok('real paper references are quoted (2022 Q6(d), 2023 Q6(d))',
   M.DISCOVERIES.some(d => /Physics 2022 Q6\(d\)/.test(d.exam || '')) && M.DISCOVERIES.some(d => /Physics 2023 Q6\(d\)/.test(d.exam || '')));

console.log('\nGuided experiments');
ok('at least 3 guided experiments', M.GUIDES.length >= 3);
ok('guide ids are unique', new Set(M.GUIDES.map(g => g.id)).size === M.GUIDES.length);
for (const G of M.GUIDES) {
  const bad = G.steps.filter(s => !tokenOk(s.on) || !s.say || !s.btn);
  ok(`${G.title}: every step names a real action, says what to do, and has a button`, bad.length === 0, bad);
  ok(`${G.title}: ends with what they found out`, !!(G.lesson && G.blurb && G.icon));
}

console.log('\nMissions, hazards and results');
ok('at least 2 missions', M.MISSIONS.length >= 2);
for (const Mi of M.MISSIONS) {
  const bad = Mi.quiz.filter(q => q.options.length !== 4 || new Set(q.options).size !== 4 || !q.why || !q.q);
  ok(`${Mi.title}: ${Mi.quiz.length} questions, each with 4 distinct options and a reason`, Mi.quiz.length >= 4 && bad.length === 0, bad.map(q => q.q));
  ok(`${Mi.title}: has a setup on the shelf, an intro and a blurb`, !!(M.SETUPS[Mi.setup] && Mi.intro && Mi.blurb && Mi.icon));
}
const qa = M.MISSIONS.find(m => m.id === 'accel').quiz;
ok('quiz: 1.8 m/s in 2.0 s from rest → 0.9 m/s²', qa[0].options[0] === (1.8 / 2.0) + ' m/s²');
ok('quiz: from rest to 2.0 m/s in 4.0 s → area ½ × 4 × 2 = 4.0 m', qa.find(q => /4\.0 s\. How far/.test(q.q)).options[0] === (0.5 * 4 * 2).toFixed(1) + ' m');
const qd = M.MISSIONS.find(m => m.id === 'disp').quiz;
ok('quiz: 400 m in 80 s → average speed 5 m/s, average velocity 0 m/s', qd[3].options[0] === (400 / 80) + ' m/s' && qd[4].options[0] === '0 m/s');
ok('quiz: 30 m north then 40 m east → 50 m', qd[2].options[0] === Math.hypot(30, 40) + ' m');
const signKinds = (core.match(/SIGN_LABELS = \{([^}]*)\}/) || [, ''])[1];
for (const [id, H] of Object.entries(M.HAZARDS)) {
  ok(`hazard ${id} has real signs and explains what happened, why, what to do and the exam point`,
     H.signs.length && H.signs.every(s => new RegExp('\\b' + s + ':').test(signKinds)) && H.fx && H.title({}) && H.happened({ v: 2.8 }) && H.why && H.instead && H.exam);
}
ok('the no-stop-block card quotes the speed it left the ramp at', /2\.8 m\/s/.test(M.HAZARDS.no_block.happened({ v: 2.757 })));
const ctxs = {
  stopwatch: Object.assign({}, rd),
  gradient_speed: Object.assign({}, g20, { vEnd: 1.9 }),
  disp_path: W('corner'),
};
for (const [id, R] of Object.entries(M.RESULTS)) {
  const c = ctxs[id], h = R.happened(c);
  ok(`result card ${id} says what happened (with the numbers), what to do and the exam point`, R.icon && R.title(c) && h && R.instead && R.exam, h);
}
ok('the stopwatch card shows the hand time and the gate time', M.RESULTS.stopwatch.happened(rd).includes(M.f2(rd.t) + ' s') && M.RESULTS.stopwatch.happened(rd).includes('2.11 s'));
ok('the gradient card shows 1.80 ÷ 2.0 = 0.90 and the real speed 1.90 m/s', /1\.80 ÷ 2\.0 = 0\.90/.test(M.RESULTS.gradient_speed.happened(ctxs.gradient_speed)) && /1\.90 m\/s/.test(M.RESULTS.gradient_speed.happened(ctxs.gradient_speed)));
ok('the displacement card gives 70 m walked but 50 m start to finish', /70\.0 m/.test(M.RESULTS.disp_path.happened(W('corner'))) && /50\.0 m/.test(M.RESULTS.disp_path.happened(W('corner'))));
ok('at least 3 mistakes that teach (hazards + result cards)', Object.keys(M.HAZARDS).length + Object.keys(M.RESULTS).length >= 3);
ok('at least 10 facts for the 💡 button', M.FACTS.length >= 10);
ok('distance-time graphs are only mentioned as beyond the NCE syllabus',
   [...M.FACTS, ...M.DISCOVERIES.map(d => d.learn + d.saw)].filter(t => /distance-time/i.test(t)).every(t => /beyond the NCE syllabus/.test(t)));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
