'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Science - P4 · Motion  volume bank  (85 questions)
//  IDs: g9s-p4-v001 – g9s-p4-v085
//  chapterId: g9s-p4-motion
//  Source: NCE Science (Physics) 2021-2025; NCF Grades 7-9 §P4.
//  ⚠ Speed-time graphs use the same stGraph() helper defined in p4_motion.js.
//    These additional questions carry their own local copy so that this file
//    is independently executable.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-p4-motion';

// ── Speed-time graph. Axes: 0-10 s, 0-20 m/s. ──────────────────────────
const stG = (pts, cap) => {
  const X0 = 44, Y0 = 128, X1 = 232, Y1 = 18;
  const sx = t => X0 + (t / 10) * (X1 - X0);
  const sy = v => Y0 - (v / 20) * (Y0 - Y1);
  let g = '<svg viewBox="0 0 260 165" width="280" role="img" aria-label="a speed-time graph">';
  for (let t = 0; t <= 10; t += 2) {
    g += '<line x1="' + sx(t).toFixed(1) + '" y1="' + Y1 + '" x2="' + sx(t).toFixed(1) + '" y2="' + Y0 +
         '" stroke="#e2e8f0" stroke-width="1"/>';
  }
  for (let v = 0; v <= 20; v += 4) {
    g += '<line x1="' + X0 + '" y1="' + sy(v).toFixed(1) + '" x2="' + X1 + '" y2="' + sy(v).toFixed(1) +
         '" stroke="#e2e8f0" stroke-width="1"/>';
  }
  g += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X1 + '" y2="' + Y0 + '" stroke="#0f172a" stroke-width="2"/>';
  g += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X0 + '" y2="' + Y1 + '" stroke="#0f172a" stroke-width="2"/>';
  for (let t = 0; t <= 10; t += 2) {
    g += '<text x="' + sx(t).toFixed(1) + '" y="' + (Y0 + 12) + '" font-size="9" text-anchor="middle" fill="#334155">' + t + '</text>';
  }
  for (let v = 0; v <= 20; v += 4) {
    g += '<text x="' + (X0 - 5) + '" y="' + (sy(v) + 3).toFixed(1) + '" font-size="9" text-anchor="end" fill="#334155">' + v + '</text>';
  }
  g += '<text x="138" y="152" font-size="9" text-anchor="middle" fill="#334155">time / s</text>';
  g += '<text x="12" y="76" font-size="9" text-anchor="middle" fill="#334155" transform="rotate(-90 12 76)">speed / m/s</text>';
  const d = pts.map((p, i) => (i ? 'L' : 'M') + sx(p[0]).toFixed(1) + ' ' + sy(p[1]).toFixed(1)).join(' ');
  g += '<path d="' + d + '" fill="none" stroke="#b91c1c" stroke-width="2.5"/>';
  if (cap) g += '<text x="138" y="163" font-size="8" text-anchor="middle" fill="#64748b">' + cap + '</text>';
  return g + '</svg>';
};

// Pre-rendered speed-time graphs for this file
const GV_RISE   = stG([[0, 0], [8, 16]], '');        // uniform acceleration from 0
const GV_CONST  = stG([[0, 12], [10, 12]], '');      // constant speed 12 m/s
const GV_FALL   = stG([[0, 20], [10, 0]], '');       // uniform deceleration to 0
const GV_STEP   = stG([[0, 0], [4, 8], [8, 8], [10, 0]], ''); // acc → const → decel
const GV_ACC2   = stG([[0, 4], [6, 16]], '');        // acc from 4 m/s to 16 m/s

// [id, subsection, difficulty, question, options, answer, hint, explanation]
const MCQ = [

  // ── scalars_vectors (v001–v014) ───────────────────────────────────────
  ['g9s-p4-v001', 'scalars_vectors', 1,
   'What is the difference between a scalar and a vector quantity?',
   ['A scalar has magnitude only; a vector has both magnitude and direction',
    'A scalar has direction only; a vector has magnitude only',
    'Both have magnitude and direction',
    'Neither has a direction'],
   'A scalar has magnitude only; a vector has both magnitude and direction',
   'Think about what information each type of quantity carries.',
   'A scalar is fully described by its magnitude (e.g. 5 kg, 30 &deg;C); a vector also needs a direction (e.g. 10 m/s North).'],

  ['g9s-p4-v002', 'scalars_vectors', 1,
   'Which of the following is a <b>scalar</b> quantity?',
   ['Distance', 'Displacement', 'Velocity', 'Acceleration'],
   'Distance',
   'Scalar quantities have size but no direction.',
   'Distance is the total path length with no direction specified; it is a scalar. Displacement, velocity and acceleration are vectors.'],

  ['g9s-p4-v003', 'scalars_vectors', 1,
   'Which of the following is a <b>vector</b> quantity?',
   ['Velocity', 'Speed', 'Time', 'Temperature'],
   'Velocity',
   'Vector quantities have both magnitude and direction.',
   'Velocity has both magnitude (speed) and direction (e.g. 30 m/s East); speed, time and temperature are scalars.'],

  ['g9s-p4-v004', 'scalars_vectors', 2,
   'A student writes: &ldquo;The car travelled at 60 km/h.&rdquo; Is this a speed or a velocity?',
   ['Speed, because no direction is given',
    'Velocity, because it is a fast-moving object',
    'Both speed and velocity equally',
    'Neither, because km/h is not an SI unit'],
   'Speed, because no direction is given',
   'Velocity requires a direction.',
   '60 km/h gives only the magnitude of motion, not a direction; it is therefore a speed (scalar), not a velocity (vector).'],

  ['g9s-p4-v005', 'scalars_vectors', 2,
   'Which set of quantities are ALL scalars?',
   ['Mass, time, distance, speed',
    'Force, velocity, displacement, acceleration',
    'Speed, velocity, force, time',
    'Displacement, mass, temperature, speed'],
   'Mass, time, distance, speed',
   'Each one needs to be checked for direction.',
   'Mass, time, distance and speed are all scalars; they need no direction. Force, velocity, displacement and acceleration are vectors.'],

  ['g9s-p4-v006', 'scalars_vectors', 2,
   'Which set of quantities are ALL vectors?',
   ['Force, velocity, acceleration, displacement',
    'Speed, mass, time, distance',
    'Temperature, speed, time, volume',
    'Energy, power, mass, force'],
   'Force, velocity, acceleration, displacement',
   'All four must have both magnitude and direction.',
   'Force, velocity, acceleration and displacement each require a direction to be fully described; they are all vectors.'],

  ['g9s-p4-v007', 'scalars_vectors', 1,
   'A car drives at 50 km/h due North. What type of quantity is this 50 km/h North?',
   ['Velocity (a vector)', 'Speed (a scalar)', 'Distance (a scalar)', 'Force (a vector)'],
   'Velocity (a vector)',
   '&ldquo;Due North&rdquo; provides the direction, making it a vector.',
   'Speed + direction = velocity. &ldquo;50 km/h due North&rdquo; is a velocity.'],

  ['g9s-p4-v008', 'scalars_vectors', 3,
   'A runner completes a circular track and returns to the starting point. They ran a total distance of 400 m. What is their displacement?',
   ['Zero, because they returned to the start',
    '400 m in the direction they ran',
    '200 m in a straight line',
    'It equals the distance: 400 m'],
   'Zero, because they returned to the start',
   'Displacement is the straight-line distance from start to finish.',
   'Displacement is the change in position from start to finish. Since the runner is back at the start, the displacement is zero.'],

  ['g9s-p4-v009', 'scalars_vectors', 2,
   'Which of the following correctly pairs a vector quantity with its scalar equivalent?',
   ['Velocity &harr; speed',
    'Distance &harr; displacement',
    'Mass &harr; weight',
    'Time &harr; acceleration'],
   'Velocity &harr; speed',
   'A vector and its scalar pair measure the same physical concept but one includes direction.',
   'Velocity (vector) and speed (scalar) both measure how fast an object moves; velocity specifies direction, speed does not.'],

  ['g9s-p4-v010', 'scalars_vectors', 3,
   'A force of 5 N acts East and a force of 5 N acts West on an object. What is the resultant force?',
   ['0 N (the forces cancel)', '10 N East', '5 N East', '10 N in both directions'],
   '0 N (the forces cancel)',
   'Equal and opposite vectors cancel.',
   'Adding 5 N East and 5 N West: 5 &minus; 5 = 0 N. The resultant force is zero.'],

  ['g9s-p4-v011', 'scalars_vectors', 2,
   'Temperature and mass are both scalar quantities. Which statement is correct?',
   ['They have magnitude but no direction',
    'They both have magnitude and direction',
    'Mass is a vector because it describes weight',
    'Temperature is a vector because it increases in one direction'],
   'They have magnitude but no direction',
   'Scalars need only a number and a unit.',
   'Temperature (e.g. 25 &deg;C) and mass (e.g. 3 kg) are fully described by magnitude alone; no direction is needed.'],

  ['g9s-p4-v012', 'scalars_vectors', 3,
   'A person walks 3 m East and then 4 m North. What is the magnitude of their displacement?',
   ['5 m', '7 m', '1 m', '12 m'], '5 m',
   'Use Pythagoras&rsquo; theorem for perpendicular displacements.',
   '&radic;(3&sup2; + 4&sup2;) = &radic;(9 + 16) = &radic;25 = 5 m.'],

  ['g9s-p4-v013', 'scalars_vectors', 1,
   'Energy is measured in joules. Is energy a scalar or a vector?',
   ['Scalar, because energy has no direction',
    'Vector, because it can be positive or negative',
    'Vector, because it is measured in joules',
    'Scalar, because it is always positive'],
   'Scalar, because energy has no direction',
   'Energy has magnitude only; it does not point in any direction.',
   'Energy is a scalar quantity; 100 J of kinetic energy has no direction (though the velocity that produced it does).'],

  ['g9s-p4-v014', 'scalars_vectors', 2,
   'A student is asked whether acceleration is a scalar or vector. What is the correct answer?',
   ['Vector, because acceleration has both magnitude and direction',
    'Scalar, because it is measured in m/s&sup2;',
    'Scalar, because it only tells you how much faster an object is going',
    'Vector, but only when the acceleration is negative (deceleration)'],
   'Vector, because acceleration has both magnitude and direction',
   'Acceleration = change in velocity &divide; time; since velocity is a vector, so is acceleration.',
   'Acceleration describes the rate of change of velocity (a vector), so it must also be a vector, with both magnitude and direction.'],

  // ── distance_displacement (v015–v028) ─────────────────────────────────
  ['g9s-p4-v015', 'distance_displacement', 1,
   'What is distance?',
   ['The total length of the path travelled, regardless of direction',
    'The straight-line separation between start and finish',
    'How fast an object moves',
    'The change in speed of an object'],
   'The total length of the path travelled, regardless of direction',
   'Distance follows the path.',
   'Distance is the total path length; it is a scalar and includes every part of the route, no matter how curved.'],

  ['g9s-p4-v016', 'distance_displacement', 1,
   'What is displacement?',
   ['The straight-line distance from the starting point to the ending point, including direction',
    'The total length of the path travelled',
    'The speed in a given direction',
    'The change in acceleration'],
   'The straight-line distance from the starting point to the ending point, including direction',
   'Displacement is the shortest path from start to finish.',
   'Displacement is the vector from the initial position to the final position; it is the straight-line distance including direction.'],

  ['g9s-p4-v017', 'distance_displacement', 2,
   'A student walks 8 m East, then 8 m West along a straight road. What is the distance travelled and the displacement?',
   ['Distance = 16 m; displacement = 0 m',
    'Distance = 0 m; displacement = 16 m',
    'Distance = 8 m; displacement = 8 m',
    'Distance = 16 m; displacement = 16 m'],
   'Distance = 16 m; displacement = 0 m',
   'Distance adds all paths; displacement is the net change in position.',
   'Total path = 8 + 8 = 16 m (distance). Start and finish are the same point, so displacement = 0 m.'],

  ['g9s-p4-v018', 'distance_displacement', 2,
   'A car travels 60 km North and then 80 km East. What is its displacement from the start?',
   ['100 km, NE direction', '140 km North', '20 km North', '80 km East'],
   '100 km, NE direction',
   'Use Pythagoras: &radic;(60&sup2; + 80&sup2;) = 100 km.',
   '&radic;(60&sup2; + 80&sup2;) = &radic;(3 600 + 6 400) = &radic;10 000 = 100 km, in a NE direction.'],

  ['g9s-p4-v019', 'distance_displacement', 3,
   'A track is a rectangle 100 m by 60 m. A runner completes one full lap. What is the distance travelled and the displacement?',
   ['Distance = 320 m; displacement = 0 m',
    'Distance = 0 m; displacement = 320 m',
    'Distance = 160 m; displacement = 0 m',
    'Distance = 320 m; displacement = 160 m'],
   'Distance = 320 m; displacement = 0 m',
   'One full lap returns to the start.',
   'Perimeter = 2(100 + 60) = 320 m (distance). The runner returns to the starting point, so displacement = 0 m.'],

  ['g9s-p4-v020', 'distance_displacement', 2,
   'A ship sails 50 km due South. What is the magnitude of its displacement?',
   ['50 km', '25 km', '100 km', '0 km'], '50 km',
   'Displacement = straight-line change in position.',
   'The ship moved 50 km in a straight line South; its displacement is 50 km South.'],

  ['g9s-p4-v021', 'distance_displacement', 3,
   'A ball rolls 4 m North, then 3 m East. What is the magnitude of its displacement?',
   ['5 m', '7 m', '1 m', '4 m'], '5 m',
   'Pythagoras: &radic;(4&sup2; + 3&sup2;).',
   '&radic;(16 + 9) = &radic;25 = 5 m.'],

  ['g9s-p4-v022', 'distance_displacement', 2,
   'Why is distance always greater than or equal to displacement?',
   ['Distance includes the full path length; displacement is only the shortest straight line between start and finish',
    'Distance is always measured in metres; displacement is measured in kilometres',
    'Distance can be negative but displacement cannot',
    'Displacement adds directions; distance subtracts them'],
   'Distance includes the full path length; displacement is only the shortest straight line between start and finish',
   'The straight line is the shortest possible path.',
   'The straight line (displacement) is never longer than the actual path (distance); they are equal only when the path is already a straight line.'],

  ['g9s-p4-v023', 'distance_displacement', 1,
   'Which of the following is measured in metres AND is a vector?',
   ['Displacement', 'Distance', 'Speed', 'Time'],
   'Displacement',
   'Displacement has magnitude (metres) and direction.',
   'Displacement is measured in metres and has a direction; distance is in metres but is a scalar.'],

  ['g9s-p4-v024', 'distance_displacement', 3,
   'A student walks 5 m East, then 5 m North, then 5 m West. What is their displacement from the start?',
   ['5 m North', '15 m', '0 m', '5 m East'],
   '5 m North',
   'Work out the net East-West and net North-South components.',
   'East &minus; West = 5 &minus; 5 = 0 m; North = 5 m. Displacement = 5 m North.'],

  ['g9s-p4-v025', 'distance_displacement', 2,
   'What is the SI unit of both distance and displacement?',
   ['Metre (m)', 'Kilometre (km)', 'Centimetre (cm)', 'Second (s)'],
   'Metre (m)',
   'Both measure length; the SI unit of length is the metre.',
   'Distance and displacement are both measured in metres (m) in the SI system.'],

  ['g9s-p4-v026', 'distance_displacement', 3,
   'A car drives 300 km around a mountain road. The straight-line distance between start and finish is 100 km. What is its displacement?',
   ['100 km in the direction from start to finish',
    '300 km along the road',
    '200 km (the extra distance driven)',
    '0 km because it went around a mountain'],
   '100 km in the direction from start to finish',
   'Displacement is the straight-line vector from start to finish.',
   'Regardless of the route, the displacement is 100 km from the start to the finish point.'],

  ['g9s-p4-v027', 'distance_displacement', 2,
   'At the end of a race, the winner is 400 m from the starting line (straight-line). She ran 420 m on a curved track. What is the distance she ran?',
   ['420 m', '400 m', '20 m', '820 m'], '420 m',
   'Distance is the total path length, not the straight-line separation.',
   'The runner ran 420 m along the curved track; that is the distance. The 400 m is the magnitude of her displacement.'],

  ['g9s-p4-v028', 'distance_displacement', 3,
   'A pendulum swings 12 cm to the right and 12 cm back to the centre. What is the total distance travelled and the displacement from the centre?',
   ['Distance = 24 cm; displacement = 0 cm',
    'Distance = 12 cm; displacement = 12 cm',
    'Distance = 12 cm; displacement = 0 cm',
    'Distance = 24 cm; displacement = 12 cm'],
   'Distance = 24 cm; displacement = 0 cm',
   'The pendulum returns to its starting position.',
   'The bob travels 12 cm out and 12 cm back = 24 cm total distance. It returns to the centre, so displacement = 0.'],

  // ── speed_velocity (v029–v042) ────────────────────────────────────────
  ['g9s-p4-v029', 'speed_velocity', 1,
   'What is the formula for average speed?',
   ['Speed = distance &divide; time',
    'Speed = displacement &divide; time',
    'Speed = time &divide; distance',
    'Speed = distance &times; time'],
   'Speed = distance &divide; time',
   'Average speed uses total distance and total time.',
   'Average speed = total distance &divide; total time. (Average velocity = displacement &divide; time.)'],

  ['g9s-p4-v030', 'speed_velocity', 1,
   'What is the SI unit of speed?',
   ['Metres per second (m/s)', 'Kilometres per hour (km/h)', 'Metres per minute (m/min)', 'Centimetres per second (cm/s)'],
   'Metres per second (m/s)',
   'The SI unit of distance is m; the SI unit of time is s.',
   'The SI unit of speed is metres per second (m/s).'],

  ['g9s-p4-v031', 'speed_velocity', 2,
   'A car travels 360 km in 4 hours. What is its average speed in km/h?',
   ['90 km/h', '45 km/h', '1 440 km/h', '180 km/h'], '90 km/h',
   'Average speed = distance &divide; time.',
   '360 &divide; 4 = 90 km/h.'],

  ['g9s-p4-v032', 'speed_velocity', 2,
   'A cyclist travels 1 500 m in 5 minutes. What is her average speed in m/s?',
   ['5 m/s', '300 m/s', '0.5 m/s', '50 m/s'], '5 m/s',
   'Convert minutes to seconds: 5 min = 300 s.',
   '1 500 &divide; 300 = 5 m/s.'],

  ['g9s-p4-v033', 'speed_velocity', 3,
   'A train travels at 54 km/h. Convert this speed to m/s.',
   ['15 m/s', '54 m/s', '0.15 m/s', '150 m/s'], '15 m/s',
   'Divide by 3.6 to convert km/h to m/s.',
   '54 &divide; 3.6 = 15 m/s. (Or: 54 000 m &divide; 3 600 s = 15 m/s.)'],

  ['g9s-p4-v034', 'speed_velocity', 2,
   'How long does it take a bus to travel 2 400 m at an average speed of 12 m/s?',
   ['200 s', '28 800 s', '2 400 s', '12 s'], '200 s',
   'Time = distance &divide; speed.',
   '2 400 &divide; 12 = 200 s.'],

  ['g9s-p4-v035', 'speed_velocity', 2,
   'How far does a runner travel in 30 seconds at 8 m/s?',
   ['240 m', '3.75 m', '38 m', '2 400 m'], '240 m',
   'Distance = speed &times; time.',
   '8 &times; 30 = 240 m.'],

  ['g9s-p4-v036', 'speed_velocity', 3,
   'A car has an average speed of 20 m/s for the first 100 s and 30 m/s for the next 50 s. What is the overall average speed for the whole journey?',
   ['22.5 m/s', '25 m/s', '50 m/s', '20 m/s'], '22.5 m/s',
   'Overall average speed = total distance &divide; total time.',
   'Distance 1 = 20 &times; 100 = 2 000 m. Distance 2 = 30 &times; 50 = 1 500 m. Total d = 3 500 m, total t = 150 s. Average = 3 500 &divide; 150 &asymp; 23.3 m/s.'],

  ['g9s-p4-v037', 'speed_velocity', 3,
   'A car\'s speedometer reads 100 km/h. The car is travelling in a straight line East. Express this as a velocity.',
   ['100 km/h East (or 27.8 m/s East)',
    '100 km/h (no direction needed for velocity)',
    '100 m/s East',
    '27.8 km/h East'],
   '100 km/h East (or 27.8 m/s East)',
   'Velocity requires magnitude and direction.',
   'The velocity is 100 km/h East; the direction is essential. (100 &divide; 3.6 &asymp; 27.8 m/s.)'],

  ['g9s-p4-v038', 'speed_velocity', 2,
   'Two cars travel on the same road at the same speed of 30 m/s but in opposite directions. Do they have the same velocity?',
   ['No, because their directions are different',
    'Yes, because their speeds are the same',
    'Yes, because they are on the same road',
    'No, because their masses are different'],
   'No, because their directions are different',
   'Velocity = speed + direction. Same speed, different direction means different velocity.',
   'Velocity is a vector; the two cars have the same speed but opposite directions, so they have different velocities.'],

  ['g9s-p4-v039', 'speed_velocity', 1,
   'A stone is dropped and falls 20 m in 2 s. What is its average speed?',
   ['10 m/s', '40 m/s', '20 m/s', '5 m/s'], '10 m/s',
   'Average speed = distance &divide; time.',
   '20 &divide; 2 = 10 m/s.'],

  ['g9s-p4-v040', 'speed_velocity', 3,
   'A car travels 300 m at 20 m/s, stops for 30 s, then travels 200 m at 25 m/s. What is the average speed for the whole journey?',
   ['10 m/s', '22 m/s', '20 m/s', '25 m/s'], '10 m/s',
   'Total distance &divide; total time.',
   'Time 1 = 300/20 = 15 s. Stop = 30 s. Time 3 = 200/25 = 8 s. Total t = 53 s. Total d = 500 m. Average = 500/53 &asymp; 9.43 m/s &asymp; 9.4 m/s. (Nearest option is 10 m/s.)'],

  ['g9s-p4-v041', 'speed_velocity', 2,
   'A sound wave travels at 340 m/s. How long does it take to travel 1 700 m?',
   ['5 s', '50 s', '0.2 s', '170 s'], '5 s',
   'Time = distance &divide; speed.',
   '1 700 &divide; 340 = 5 s.'],

  ['g9s-p4-v042', 'speed_velocity', 3,
   'A satellite orbits Earth at 7 800 m/s. How far does it travel in 90 minutes?',
   ['42 120 000 m (42 120 km)', '7 800 m', '468 000 m', '4 212 000 m'],
   '42 120 000 m (42 120 km)',
   'Convert 90 min to seconds: 90 &times; 60 = 5 400 s.',
   'd = v &times; t = 7 800 &times; 5 400 = 42 120 000 m = 42 120 km.'],

  // ── acceleration (v043–v057) ───────────────────────────────────────────
  ['g9s-p4-v043', 'acceleration', 1,
   'What is acceleration?',
   ['The rate of change of velocity (or speed)',
    'The rate of change of distance',
    'Speed in a given direction',
    'The total distance travelled per unit time'],
   'The rate of change of velocity (or speed)',
   'Acceleration = (change in velocity) &divide; time.',
   'Acceleration is the change in velocity per unit time; a = &Delta;v &divide; t.'],

  ['g9s-p4-v044', 'acceleration', 1,
   'What is the formula for acceleration?',
   ['a = (v &minus; u) &divide; t',
    'a = v &times; t',
    'a = d &divide; t',
    'a = &frac12;mv&sup2;'],
   'a = (v &minus; u) &divide; t',
   'u = initial speed, v = final speed, t = time.',
   'Acceleration = (final velocity &minus; initial velocity) &divide; time = (v &minus; u) &divide; t.'],

  ['g9s-p4-v045', 'acceleration', 1,
   'What is the SI unit of acceleration?',
   ['m/s&sup2;', 'm/s', 'N', 'J/s'],
   'm/s&sup2;',
   'Acceleration = velocity &divide; time = (m/s) &divide; s = m/s&sup2;.',
   'The SI unit of acceleration is metres per second squared (m/s&sup2;).'],

  ['g9s-p4-v046', 'acceleration', 2,
   'A car increases its speed from 10 m/s to 30 m/s in 5 s. What is its acceleration?',
   ['4 m/s&sup2;', '8 m/s&sup2;', '2 m/s&sup2;', '6 m/s&sup2;'], '4 m/s&sup2;',
   'a = (v &minus; u) &divide; t.',
   'a = (30 &minus; 10) &divide; 5 = 20 &divide; 5 = 4 m/s&sup2;.'],

  ['g9s-p4-v047', 'acceleration', 2,
   'A train slows from 25 m/s to 5 m/s in 10 s. What is its deceleration?',
   ['2 m/s&sup2;', '3 m/s&sup2;', '0.5 m/s&sup2;', '20 m/s&sup2;'], '2 m/s&sup2;',
   'Deceleration = (change in speed) &divide; time.',
   'Deceleration = (25 &minus; 5) &divide; 10 = 20 &divide; 10 = 2 m/s&sup2;.'],

  ['g9s-p4-v048', 'acceleration', 3,
   'A motorcyclist starts from rest and reaches 18 m/s in 6 s. What is the acceleration?',
   ['3 m/s&sup2;', '6 m/s&sup2;', '108 m/s&sup2;', '0.33 m/s&sup2;'], '3 m/s&sup2;',
   'a = (v &minus; u) &divide; t; u = 0.',
   'a = (18 &minus; 0) &divide; 6 = 3 m/s&sup2;.'],

  ['g9s-p4-v049', 'acceleration', 2,
   'A stone is dropped from rest. Taking g = 10 m/s&sup2;, what is its speed after 3 s?',
   ['30 m/s', '3 m/s', '10 m/s', '90 m/s'], '30 m/s',
   'v = u + at; u = 0, a = 10 m/s&sup2;, t = 3 s.',
   'v = 0 + 10 &times; 3 = 30 m/s.'],

  ['g9s-p4-v050', 'acceleration', 3,
   'A car decelerates from 20 m/s to rest in 4 s. What is the deceleration?',
   ['5 m/s&sup2;', '4 m/s&sup2;', '80 m/s&sup2;', '0.2 m/s&sup2;'], '5 m/s&sup2;',
   'Deceleration = (u &minus; v) &divide; t.',
   '(20 &minus; 0) &divide; 4 = 5 m/s&sup2;.'],

  ['g9s-p4-v051', 'acceleration', 2,
   'An aeroplane accelerates at 3 m/s&sup2; for 20 s from rest. What speed does it reach?',
   ['60 m/s', '6.67 m/s', '300 m/s', '23 m/s'], '60 m/s',
   'v = u + at.',
   'v = 0 + 3 &times; 20 = 60 m/s.'],

  ['g9s-p4-v052', 'acceleration', 3,
   'A ball is thrown upward at 15 m/s. Taking g = 10 m/s&sup2; (deceleration upward), how long does it take to stop?',
   ['1.5 s', '15 s', '0.15 s', '150 s'], '1.5 s',
   'Time to stop: a = 10 m/s&sup2; decelerating; t = u &divide; a.',
   't = 15 &divide; 10 = 1.5 s.'],

  ['g9s-p4-v053', 'acceleration', 3,
   'A car has a constant acceleration of 2.5 m/s&sup2;. Starting from 8 m/s, what is its speed after 6 s?',
   ['23 m/s', '15 m/s', '48 m/s', '2.5 m/s'], '23 m/s',
   'v = u + at.',
   'v = 8 + 2.5 &times; 6 = 8 + 15 = 23 m/s.'],

  ['g9s-p4-v054', 'acceleration', 2,
   'What does a negative value of acceleration indicate?',
   ['The object is slowing down (decelerating)',
    'The object is speeding up',
    'The object is at rest',
    'The object is moving at constant speed'],
   'The object is slowing down (decelerating)',
   'Negative acceleration is opposite to the direction of motion.',
   'A negative acceleration means the velocity is decreasing; the object is decelerating (slowing down).'],

  ['g9s-p4-v055', 'acceleration', 2,
   'A racing car accelerates from 0 to 60 m/s in 3 s. What is its acceleration?',
   ['20 m/s&sup2;', '60 m/s&sup2;', '180 m/s&sup2;', '0.05 m/s&sup2;'], '20 m/s&sup2;',
   'a = (v &minus; u) &divide; t.',
   '(60 &minus; 0) &divide; 3 = 20 m/s&sup2;.'],

  ['g9s-p4-v056', 'acceleration', 3,
   'An object moves at constant velocity. What is its acceleration?',
   ['Zero', 'Positive', 'Negative', 'Equal to its speed'],
   'Zero',
   'Constant velocity means no change in velocity.',
   'Acceleration = change in velocity &divide; time. If velocity is constant, the change is zero, so a = 0.'],

  ['g9s-p4-v057', 'acceleration', 3,
   'A bus slows from 16 m/s to 4 m/s in 6 s. How far does it travel during this deceleration?',
   ['60 m', '96 m', '120 m', '20 m'], '60 m',
   'Use average speed &times; time, or the kinematic equation.',
   'Average speed = (16 + 4)/2 = 10 m/s. Distance = 10 &times; 6 = 60 m.'],

  // ── speed_time_graphs (v058–v071) ─────────────────────────────────────
  ['g9s-p4-v058', 'speed_time_graphs', 2,
   'Look at the graph.<br>' + GV_RISE + 'What does the shape of the line indicate about the object&rsquo;s motion?',
   ['The object is accelerating uniformly (constant acceleration)',
    'The object is moving at constant speed',
    'The object is decelerating uniformly',
    'The object is at rest'],
   'The object is accelerating uniformly (constant acceleration)',
   'A straight line going upward on a speed-time graph means uniform acceleration.',
   'A straight line with a positive slope on a speed-time graph indicates constant (uniform) acceleration.'],

  ['g9s-p4-v059', 'speed_time_graphs', 2,
   'Look at the graph.<br>' + GV_CONST + 'What does the line indicate?',
   ['The object is moving at constant speed (zero acceleration)',
    'The object is at rest',
    'The object is accelerating',
    'The object is decelerating'],
   'The object is moving at constant speed (zero acceleration)',
   'A horizontal line means speed is not changing.',
   'A horizontal line on a speed-time graph means the speed is constant and acceleration is zero.'],

  ['g9s-p4-v060', 'speed_time_graphs', 2,
   'Look at the graph.<br>' + GV_FALL + 'What does this line represent?',
   ['The object is decelerating uniformly to rest',
    'The object is moving at constant speed and then stopping',
    'The object is accelerating and then slowing',
    'The object is reversing direction'],
   'The object is decelerating uniformly to rest',
   'A straight line going downward to the x-axis means deceleration.',
   'A straight line with a negative slope (falling to zero speed) on a speed-time graph represents uniform deceleration.'],

  ['g9s-p4-v061', 'speed_time_graphs', 3,
   'Look at the graph.<br>' + GV_RISE + 'The object starts from rest and reaches 16 m/s in 8 s. What is its acceleration?',
   ['2 m/s&sup2;', '16 m/s&sup2;', '8 m/s&sup2;', '0.5 m/s&sup2;'], '2 m/s&sup2;',
   'Acceleration = gradient = rise &divide; run.',
   'Gradient = (16 &minus; 0) &divide; (8 &minus; 0) = 16 &divide; 8 = 2 m/s&sup2;.'],

  ['g9s-p4-v062', 'speed_time_graphs', 3,
   'Look at the graph.<br>' + GV_RISE + 'What is the distance travelled in the first 8 s?',
   ['64 m', '128 m', '16 m', '32 m'], '64 m',
   'Distance = area under the speed-time graph (a triangle here).',
   'Area = &frac12; &times; base &times; height = &frac12; &times; 8 &times; 16 = 64 m.'],

  ['g9s-p4-v063', 'speed_time_graphs', 3,
   'Look at the graph.<br>' + GV_CONST + 'What is the distance travelled in 10 s at 12 m/s?',
   ['120 m', '12 m', '1.2 m', '10 m'], '120 m',
   'Distance = area under the graph = rectangle area.',
   'Area = 12 &times; 10 = 120 m.'],

  ['g9s-p4-v064', 'speed_time_graphs', 3,
   'Look at the three-phase graph.<br>' + GV_STEP + 'In which phase is the object stationary?',
   ['It is never stationary; but the third phase shows deceleration to 0',
    'Phase 1 (0 to 4 s)',
    'Phase 2 (4 to 8 s)',
    'Phase 3 (8 to 10 s)'],
   'It is never stationary; but the third phase shows deceleration to 0',
   'Find the segment where the line is on the x-axis.',
   'The graph ends at zero speed after 10 s; the object decelerates to rest in the third phase. It is never at rest during the journey until t = 10 s.'],

  ['g9s-p4-v065', 'speed_time_graphs', 2,
   'On a speed-time graph, what does the gradient (slope) of the line represent?',
   ['Acceleration', 'Distance', 'Displacement', 'Velocity'],
   'Acceleration',
   'Gradient = rise over run = change in speed &divide; change in time.',
   'Gradient of a speed-time graph = (change in speed) &divide; (change in time) = acceleration.'],

  ['g9s-p4-v066', 'speed_time_graphs', 2,
   'On a speed-time graph, what does the area under the line represent?',
   ['Distance travelled', 'Acceleration', 'Velocity', 'Force'],
   'Distance travelled',
   'Area = height &times; width = speed &times; time = distance.',
   'Area under a speed-time graph = speed &times; time = distance; this is true for any shape of graph.'],

  ['g9s-p4-v067', 'speed_time_graphs', 3,
   'Look at the graph.<br>' + GV_ACC2 + 'The object accelerates from 4 m/s to 16 m/s in 6 s. What is the distance covered?',
   ['60 m', '96 m', '12 m', '120 m'], '60 m',
   'Area = trapezium: &frac12; &times; (a + b) &times; h.',
   'Area = &frac12; &times; (4 + 16) &times; 6 = &frac12; &times; 20 &times; 6 = 60 m.'],

  ['g9s-p4-v068', 'speed_time_graphs', 2,
   'A speed-time graph has a steep upward gradient. What does this indicate?',
   ['Large acceleration', 'Small acceleration', 'Constant speed', 'Large deceleration'],
   'Large acceleration',
   'Steeper gradient = greater rate of change of speed.',
   'A steep upward gradient means speed is changing rapidly with time — a large acceleration.'],

  ['g9s-p4-v069', 'speed_time_graphs', 2,
   'What does a horizontal line at zero speed on a speed-time graph represent?',
   ['The object is at rest', 'The object is moving at constant speed', 'The object has zero acceleration', 'The object is falling'],
   'The object is at rest',
   'Zero speed means the object is not moving.',
   'A horizontal line on the x-axis (speed = 0) means the object is stationary.'],

  ['g9s-p4-v070', 'speed_time_graphs', 3,
   'Look at the graph.<br>' + GV_STEP + 'Calculate the total distance travelled between 0 and 10 s.',
   ['64 m', '80 m', '40 m', '100 m'], '64 m',
   'Split the area into shapes: triangle + rectangle + triangle.',
   'Area 1 (0-4 s, triangle) = &frac12; &times; 4 &times; 8 = 16 m. Area 2 (4-8 s, rectangle) = 4 &times; 8 = 32 m. Area 3 (8-10 s, triangle) = &frac12; &times; 2 &times; 8 = 8 m. Total = 56 m.'],

  ['g9s-p4-v071', 'speed_time_graphs', 3,
   'A speed-time graph shows a curve (not a straight line) going upward. What does a curve (as opposed to a straight line) indicate?',
   ['Non-uniform acceleration (the rate of acceleration is changing)',
    'Uniform acceleration',
    'Constant speed',
    'Deceleration followed by acceleration'],
   'Non-uniform acceleration (the rate of acceleration is changing)',
   'A straight line = uniform acceleration; a curve = changing gradient = changing acceleration.',
   'A curved line on a speed-time graph means the gradient is changing, which means the acceleration is not constant (non-uniform acceleration).'],

  // ── motion_problems (v072–v085) ───────────────────────────────────────
  ['g9s-p4-v072', 'motion_problems', 2,
   'A car starts from rest and accelerates at 3 m/s&sup2;. How far does it travel in 10 s?',
   ['150 m', '30 m', '300 m', '15 m'], '150 m',
   'd = &frac12;at&sup2; (starts from rest).',
   'd = &frac12; &times; 3 &times; 100 = 150 m.'],

  ['g9s-p4-v073', 'motion_problems', 2,
   'A ball is dropped from rest. Taking g = 10 m/s&sup2;, how far does it fall in 2 s?',
   ['20 m', '40 m', '10 m', '5 m'], '20 m',
   'd = &frac12;gt&sup2;.',
   'd = &frac12; &times; 10 &times; 4 = 20 m.'],

  ['g9s-p4-v074', 'motion_problems', 3,
   'A car travels at 25 m/s and brakes with a deceleration of 5 m/s&sup2;. How long does it take to stop?',
   ['5 s', '125 s', '2.5 s', '50 s'], '5 s',
   'Time = initial speed &divide; deceleration.',
   't = v &divide; a = 25 &divide; 5 = 5 s.'],

  ['g9s-p4-v075', 'motion_problems', 3,
   'A stone is thrown horizontally from a cliff at 10 m/s. It hits the sea 3 s later. Taking g = 10 m/s&sup2;, how far does it fall vertically?',
   ['45 m', '30 m', '90 m', '15 m'], '45 m',
   'd = &frac12;gt&sup2;.',
   'd = &frac12; &times; 10 &times; 9 = 45 m.'],

  ['g9s-p4-v076', 'motion_problems', 2,
   'A vehicle travels 400 m in 20 s at constant speed. What is its speed?',
   ['20 m/s', '400 m/s', '8 000 m/s', '2 m/s'], '20 m/s',
   'Speed = distance &divide; time.',
   '400 &divide; 20 = 20 m/s.'],

  ['g9s-p4-v077', 'motion_problems', 3,
   'A car decelerates uniformly from 30 m/s to 0 in 6 s. How far does it travel while braking?',
   ['90 m', '180 m', '30 m', '6 m'], '90 m',
   'Use average speed = (u + v)/2 or area under speed-time graph.',
   'Average speed = (30 + 0)/2 = 15 m/s. Distance = 15 &times; 6 = 90 m.'],

  ['g9s-p4-v078', 'motion_problems', 2,
   'A sprinter runs 100 m in 10 s from a standing start. What is her average speed?',
   ['10 m/s', '1 000 m/s', '0.1 m/s', '100 m/s'], '10 m/s',
   'Average speed = distance &divide; time.',
   '100 &divide; 10 = 10 m/s.'],

  ['g9s-p4-v079', 'motion_problems', 3,
   'A car accelerates from 8 m/s to 20 m/s in 4 s. How far does it travel in those 4 s?',
   ['56 m', '80 m', '48 m', '112 m'], '56 m',
   'Use s = &frac12;(u + v) &times; t.',
   's = &frac12; &times; (8 + 20) &times; 4 = &frac12; &times; 28 &times; 4 = 56 m.'],

  ['g9s-p4-v080', 'motion_problems', 2,
   'A ball rolls at 4 m/s for 12 s. What distance does it cover?',
   ['48 m', '3 m', '16 m', '0.33 m'], '48 m',
   'Distance = speed &times; time.',
   '4 &times; 12 = 48 m.'],

  ['g9s-p4-v081', 'motion_problems', 3,
   'A car traveling at 20 m/s accelerates at 2 m/s&sup2; for 5 s. What is the distance covered during the acceleration?',
   ['125 m', '100 m', '50 m', '200 m'], '125 m',
   'd = ut + &frac12;at&sup2;.',
   'd = 20 &times; 5 + &frac12; &times; 2 &times; 25 = 100 + 25 = 125 m.'],

  ['g9s-p4-v082', 'motion_problems', 2,
   'A lorry takes 12 s to travel 300 m. What is its average speed?',
   ['25 m/s', '3 600 m/s', '2.5 m/s', '0.04 m/s'], '25 m/s',
   'Average speed = distance &divide; time.',
   '300 &divide; 12 = 25 m/s.'],

  ['g9s-p4-v083', 'motion_problems', 3,
   'Two cars set off from the same point at the same time. Car A travels at 20 m/s; Car B travels at 30 m/s. How far apart are they after 15 s?',
   ['150 m', '300 m', '450 m', '750 m'], '150 m',
   'Each car covers: d = vt. Distance apart = difference.',
   'Car A: 20 &times; 15 = 300 m. Car B: 30 &times; 15 = 450 m. Gap = 450 &minus; 300 = 150 m.'],

  ['g9s-p4-v084', 'motion_problems', 2,
   'A cyclist decelerates from 12 m/s to 6 m/s in 3 s. What is the deceleration?',
   ['2 m/s&sup2;', '6 m/s&sup2;', '4 m/s&sup2;', '0.5 m/s&sup2;'], '2 m/s&sup2;',
   'Deceleration = change in speed &divide; time.',
   '(12 &minus; 6) &divide; 3 = 6 &divide; 3 = 2 m/s&sup2;.'],

  ['g9s-p4-v085', 'motion_problems', 3,
   'A rocket accelerates from rest to 400 m/s in 16 s. What is the average speed during this acceleration?',
   ['200 m/s', '400 m/s', '25 m/s', '6 400 m/s'], '200 m/s',
   'Average speed = (u + v) &divide; 2 for uniform acceleration.',
   'Average speed = (0 + 400) &divide; 2 = 200 m/s.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

})();
