'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Science - P4 · Motion   (examWeight 4, joint heaviest)
//
//  ⚠ THE SPEED-TIME GRAPH IS THE FORMAT, not an illustration of it. The
//    syllabus outcome is "plot and interpret speed-time graphs" and the papers
//    supply the graph to be read. Every graph below is inline SVG with the axes
//    labelled and a printed scale, so the shape can be read off exactly.
//
//  ⚠ TWO KINDS OF GRID EXIST IN THE REAL PAPERS AND THEY ARE NOT THE SAME
//    TASK (blueprint-science.md §X.5): a BARE grid where the candidate chooses
//    and labels both axes, worth roughly double, and a PRE-AXED grid. Only the
//    reading half is assessable here - this pack has no plotting surface - so
//    the plotting outcome is honestly not covered and is recorded as such.
//
//  ⚠ <i> IS AN HTML BREAKOUT TAG AND MUST NEVER APPEAR INSIDE AN <svg>: the
//    parser closes the svg there and the rest of the figure is lost. Italic
//    inside an svg is <tspan font-style="italic">.
//
//  ⚠ 75.5% of Physics mark-bearing parts are worth ONE mark. Difficulty is
//    weighted to reading and single-step substitution, not to derivations.
//
//  Source: NCE Science (Physics) 2021-2023, 2025; NCF Grades 7-9 §P4.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-p4-motion';

// ── A speed-time graph. `pts` is a list of [t, v] in graph units; the axes are
//    0-6 s and 0-12 m/s with printed ticks, so a value can be read exactly.
const stGraph = (pts, caption) => {
  const X0 = 42, Y0 = 128, X1 = 232, Y1 = 18;
  const sx = t => X0 + (t / 6) * (X1 - X0);
  const sy = v => Y0 - (v / 12) * (Y0 - Y1);
  let g = '<svg viewBox="0 0 250 165" width="270" role="img" aria-label="a speed-time graph">';
  for (let t = 0; t <= 6; t++) {
    g += '<line x1="' + sx(t).toFixed(1) + '" y1="' + Y1 + '" x2="' + sx(t).toFixed(1) + '" y2="' + Y0 +
         '" stroke="#e2e8f0" stroke-width="1"/>';
  }
  for (let v = 0; v <= 12; v += 2) {
    g += '<line x1="' + X0 + '" y1="' + sy(v).toFixed(1) + '" x2="' + X1 + '" y2="' + sy(v).toFixed(1) +
         '" stroke="#e2e8f0" stroke-width="1"/>';
  }
  g += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X1 + '" y2="' + Y0 + '" stroke="#0f172a" stroke-width="2"/>';
  g += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X0 + '" y2="' + Y1 + '" stroke="#0f172a" stroke-width="2"/>';
  for (let t = 0; t <= 6; t += 2) {
    g += '<text x="' + sx(t).toFixed(1) + '" y="' + (Y0 + 12) + '" font-size="9" text-anchor="middle" fill="#334155">' + t + '</text>';
  }
  for (let v = 0; v <= 12; v += 4) {
    g += '<text x="' + (X0 - 5) + '" y="' + (sy(v) + 3).toFixed(1) + '" font-size="9" text-anchor="end" fill="#334155">' + v + '</text>';
  }
  g += '<text x="137" y="152" font-size="9" text-anchor="middle" fill="#334155">time / s</text>';
  g += '<text x="12" y="76" font-size="9" text-anchor="middle" fill="#334155" transform="rotate(-90 12 76)">speed / m/s</text>';
  const d = pts.map((p, i) => (i ? 'L' : 'M') + sx(p[0]).toFixed(1) + ' ' + sy(p[1]).toFixed(1)).join(' ');
  g += '<path d="' + d + '" fill="none" stroke="#b91c1c" stroke-width="2.5"/>';
  if (caption) {
    g += '<text x="137" y="163" font-size="8" text-anchor="middle" fill="#64748b">' + caption + '</text>';
  }
  return g + '</svg>';
};

const G_RISING   = stGraph([[0, 0], [6, 12]], '');
const G_CONSTANT = stGraph([[0, 8], [6, 8]], '');
const G_FALLING  = stGraph([[0, 12], [6, 0]], '');
const G_THREE    = stGraph([[0, 0], [2, 8], [4, 8], [6, 0]], '');

const MCQ = [
  ['g9s-p4-001', 'scalars_vectors', 1,
   'Which of these is a <b>vector</b> quantity?',
   ['Velocity', 'Speed', 'Distance', 'Time'], 'Velocity',
   'A vector needs a direction as well as a size.',
   'Velocity has both a size and a direction, so it is a vector. Speed, distance and time have size only.'],

  ['g9s-p4-002', 'scalars_vectors', 1,
   'Which of these is a <b>scalar</b> quantity?',
   ['Distance', 'Displacement', 'Velocity', 'Acceleration'], 'Distance',
   'A scalar has size only, with no direction.',
   'Distance has a size but no direction, so it is a scalar. The other three all carry a direction.'],

  ['g9s-p4-003', 'scalars_vectors', 2,
   'What is the difference between a scalar and a vector?',
   ['A vector has a direction as well as a size',
    'A vector is always larger than a scalar',
    'A scalar is always measured in metres',
    'A scalar can never be negative'],
   'A vector has a direction as well as a size',
   'Think about what extra information a vector carries.',
   'A scalar is fully described by a size; a vector needs a direction too.'],

  ['g9s-p4-004', 'distance_displacement', 2,
   'A pupil walks 40 m east, then 40 m back west to the starting point. What is the total <b>distance</b> travelled?',
   ['80 m', '0 m', '40 m', '20 m'], '80 m',
   'Distance counts every metre walked, whichever way.',
   'Distance is the whole path length: 40 + 40 = 80 m.'],

  ['g9s-p4-005', 'distance_displacement', 2,
   'A pupil walks 40 m east, then 40 m back west to the starting point. What is the <b>displacement</b>?',
   ['0 m', '80 m', '40 m east', '40 m west'], '0 m',
   'Displacement is measured from start to finish.',
   'Displacement is the straight line from start to finish; they end where they began, so it is zero.'],

  ['g9s-p4-006', 'distance_displacement', 3,
   'A car drives 300 m north and then 400 m east. Its distance travelled is 700 m. Why is its displacement smaller than that?',
   ['Displacement is the straight line from start to finish',
    'Displacement ignores the first part of a journey',
    'Displacement is always half of the distance',
    'Displacement is measured in different units'],
   'Displacement is the straight line from start to finish',
   'The path is bent; the displacement is not.',
   'Displacement is the direct line between the start and finish, which is shorter than a path that changes direction.'],

  ['g9s-p4-007', 'speed_velocity', 1,
   'What is the SI unit of speed?',
   ['Metre per second', 'Metre', 'Second', 'Metre per second squared'],
   'Metre per second',
   'Speed is a distance divided by a time.',
   'Speed is distance divided by time, so its unit is metres per second (m/s).'],

  ['g9s-p4-008', 'speed_velocity', 2,
   'What is the difference between speed and velocity?',
   ['Velocity states the direction as well as the size',
    'Velocity is always the larger of the two',
    'Speed is measured over a longer time',
    'Speed applies only to objects that are slowing down'],
   'Velocity states the direction as well as the size',
   'One of them is a vector.',
   'Speed is a scalar; velocity is the same measurement with a direction attached.'],

  ['g9s-p4-009', 'speed_velocity', 3,
   'A car goes once round a circular track and returns to the start in 60 s. What is its <b>average velocity</b>?',
   ['Zero, because the displacement is zero',
    'The same as its average speed',
    'Half its average speed',
    'It cannot be worked out without the radius'],
   'Zero, because the displacement is zero',
   'Average velocity uses displacement, not distance.',
   'The car finishes where it started, so its displacement is zero and its average velocity is zero - even though its speed was not.'],

  ['g9s-p4-010', 'acceleration', 1,
   'What is the SI unit of acceleration?',
   ['Metre per second squared', 'Metre per second', 'Metre', 'Second'],
   'Metre per second squared',
   'Acceleration is a change of speed divided by a time.',
   'Acceleration is measured in metres per second squared (m/s&sup2;).'],

  ['g9s-p4-011', 'acceleration', 2,
   'What does an acceleration of 3 m/s&sup2; mean?',
   ['The speed increases by 3 m/s every second',
    'The object travels 3 m every second',
    'The object travels 3 m in total',
    'The speed is 3 m/s throughout'],
   'The speed increases by 3 m/s every second',
   'Acceleration is a change of speed each second.',
   'An acceleration of 3 m/s&sup2; means the speed rises by 3 m/s in each second that passes.'],

  ['g9s-p4-012', 'acceleration', 3,
   'A car is slowing down. What can be said about its acceleration?',
   ['It is negative, because the speed is decreasing',
    'It is zero, because the car is still moving',
    'It is positive, because the car is still moving forward',
    'It cannot be worked out for a slowing car'],
   'It is negative, because the speed is decreasing',
   'A falling speed is a negative change of speed.',
   'Slowing down is a negative change of speed each second, which is a negative acceleration (a deceleration).'],

  ['g9s-p4-013', 'speed_time_graphs', 2,
   'What does the speed-time graph shown tell you about the motion?<br>' + G_CONSTANT,
   ['The object moves at a constant speed',
    'The object is speeding up steadily',
    'The object is slowing down quite steadily',
    'The object is not moving at all'],
   'The object moves at a constant speed',
   'Look at whether the line rises, falls or stays level.',
   'A horizontal line on a speed-time graph means the speed does not change, so the object moves at a constant speed.'],

  ['g9s-p4-014', 'speed_time_graphs', 2,
   'What does the speed-time graph shown tell you about the motion?<br>' + G_RISING,
   ['The object is speeding up steadily',
    'The object moves at a constant speed',
    'The object is slowing down steadily',
    'The object stays at the same place'],
   'The object is speeding up steadily',
   'Look at whether the line rises, falls or stays level.',
   'A straight line rising to the right means the speed increases evenly, so the object accelerates steadily.'],

  ['g9s-p4-015', 'speed_time_graphs', 2,
   'What does the speed-time graph shown tell you about the motion?<br>' + G_FALLING,
   ['The object is slowing down steadily',
    'The object is speeding up steadily',
    'The object moves at a constant speed',
    'The object is moving backwards'],
   'The object is slowing down steadily',
   'Look at whether the line rises, falls or stays level.',
   'A straight line falling to the right means the speed drops evenly, so the object decelerates until it stops.'],

  ['g9s-p4-016', 'speed_time_graphs', 3,
   'Read the graph shown. What is the speed at 4 s?<br>' + G_CONSTANT,
   ['8 m/s', '4 m/s', '12 m/s', '0 m/s'], '8 m/s',
   'Go up from 4 on the time axis to the line, then across.',
   'The line sits level at 8 on the speed axis, so at 4 s the speed is 8 m/s.'],

  ['g9s-p4-017', 'speed_time_graphs', 3,
   'Read the graph shown. What is happening between 2 s and 4 s?<br>' + G_THREE,
   ['The speed stays constant', 'The object speeds up',
    'The object slows down', 'The object is stationary'],
   'The speed stays constant',
   'Look only at the middle section of the line.',
   'Between 2 s and 4 s the line is horizontal, so the speed is unchanged over that interval.'],

  ['g9s-p4-018', 'speed_time_graphs', 3,
   'On the graph shown, which section describes the object slowing to a stop?<br>' + G_THREE,
   ['The last section, from 4 s to 6 s',
    'The first section, from 0 s to 2 s',
    'The middle section, from 2 s to 4 s',
    'No section of this graph shows slowing down'],
   'The last section, from 4 s to 6 s',
   'Find the part of the line that falls to zero.',
   'The final section falls from 8 m/s to 0 m/s, which is the object slowing to a stop.'],

  ['g9s-p4-019', 'speed_time_graphs', 3,
   'On a speed-time graph, what does a horizontal line lying <b>on</b> the time axis mean?',
   ['The object is stationary', 'The object moves at a steady speed',
    'The object is speeding up', 'The object is slowing down'],
   'The object is stationary',
   'The speed value being read off is zero.',
   'A line along the time axis means the speed is zero throughout, so the object is not moving.'],

  ['g9s-p4-020', 'motion_problems', 2,
   'Which equation gives the speed of an object?',
   ['Speed = distance &divide; time', 'Speed = distance &times; time',
    'Speed = time &divide; distance', 'Speed = distance + time'],
   'Speed = distance &divide; time',
   'Metres per second is metres divided by seconds.',
   'Speed is the distance travelled divided by the time taken.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const NUM = [
  ['g9s-p4-021', 'motion_problems', 2,
   'A runner covers 100 m in 20 s. Calculate the average speed, in m/s.',
   5, 'Speed = distance &divide; time.', '100 / 20 = 5 m/s.'],
  ['g9s-p4-022', 'motion_problems', 2,
   'A car travels 240 m in 12 s. Calculate the average speed, in m/s.',
   20, 'Speed = distance &divide; time.', '240 / 12 = 20 m/s.'],
  ['g9s-p4-023', 'motion_problems', 3,
   'A cyclist travels at 6 m/s for 30 s. Calculate the distance covered, in metres.',
   180, 'Rearrange to distance = speed &times; time.', '6 &times; 30 = 180 m.'],
  ['g9s-p4-024', 'motion_problems', 3,
   'A bus travels 900 m at an average speed of 15 m/s. Calculate the time taken, in seconds.',
   60, 'Rearrange to time = distance &divide; speed.', '900 / 15 = 60 s.'],
  ['g9s-p4-025', 'acceleration', 3,
   'A car speeds up from 4 m/s to 20 m/s in 8 s. Calculate its acceleration, in m/s&sup2;.',
   2, 'Acceleration = change in speed &divide; time.', '(20 - 4) / 8 = 16 / 8 = 2 m/s&sup2;.'],
  ['g9s-p4-026', 'acceleration', 3,
   'A trolley starting from rest reaches 12 m/s in 4 s. Calculate its acceleration, in m/s&sup2;.',
   3, 'Starting from rest means the first speed is 0.', '(12 - 0) / 4 = 3 m/s&sup2;.'],
  ['g9s-p4-027', 'speed_time_graphs', 3,
   'Read the graph shown. What is the speed, in m/s, at 3 s?<br>' + G_RISING,
   6, 'Go up from 3 on the time axis to the line, then across.',
   'The line rises evenly from 0 to 12 m/s over 6 s, so at 3 s it is halfway: 6 m/s.'],
  ['g9s-p4-028', 'speed_time_graphs', 3,
   'Read the graph shown. What is the acceleration, in m/s&sup2;?<br>' + G_RISING,
   2, 'Acceleration = change in speed &divide; time taken.',
   'The speed rises from 0 to 12 m/s in 6 s, so the acceleration is 12 / 6 = 2 m/s&sup2;.'],
  ['g9s-p4-029', 'distance_displacement', 2,
   'A pupil walks 25 m north, then 25 m south back to the start. State the displacement, in metres.',
   0, 'Displacement is measured from start to finish.',
   'They finish where they started, so the displacement is 0 m.'],
  ['g9s-p4-030', 'speed_velocity', 3,
   'A train covers 3000 m in 150 s. Calculate its average speed, in m/s.',
   20, 'Speed = distance &divide; time.', '3000 / 150 = 20 m/s.'],
];

NUM.forEach(([id, subsection, difficulty, question, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeNum({ id, chapterId: CH, subsection, difficulty,
    question, answer, hint, explanation }));
});

const SHORT = [
  ['g9s-p4-031', 'scalars_vectors', 1,
   'Give the term for a quantity that has a size but no direction.',
   'Scalar', ['a scalar', 'scalar quantity'],
   'The opposite of a vector.', 'A scalar has magnitude only, with no direction.'],
  ['g9s-p4-032', 'scalars_vectors', 1,
   'Give the term for a quantity that has both a size and a direction.',
   'Vector', ['a vector', 'vector quantity'],
   'The opposite of a scalar.', 'A vector has both magnitude and direction.'],
  ['g9s-p4-033', 'distance_displacement', 2,
   'Give the term for the straight-line separation of the finishing point from the starting point.',
   'Displacement', ['the displacement'],
   'It is the vector partner of distance.',
   'Displacement is the straight line from start to finish, with a direction.'],
  ['g9s-p4-034', 'acceleration', 2,
   'Give the term for the rate at which the speed of an object changes.',
   'Acceleration', ['the acceleration'],
   'It is measured in metres per second squared.',
   'Acceleration is the change of speed per second.'],
  ['g9s-p4-035', 'speed_time_graphs', 3,
   'State what a horizontal line on a speed-time graph tells you about the speed.',
   'The speed is constant',
   ['constant speed', 'the speed does not change', 'steady speed', 'it is not changing'],
   'Look at whether the value being read off changes.',
   'A horizontal line means the speed stays the same throughout that interval.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

})();
