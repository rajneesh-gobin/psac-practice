'use strict';

(function () {

const P1 = 'g9s-p1-measurements';
const P2 = 'g9s-p2-light';
const P3 = 'g9s-p3-energy';
const P4 = 'g9s-p4-motion';
const P5 = 'g9s-p5-electricity';

STATIC_QUESTIONS.push(

  makeNum({
    id: 'g9s-phard-001', chapterId: P4, subsection: 'acceleration', difficulty: 3,
    question: 'A car travelling at 30 m/s brakes uniformly and comes to rest in 6 seconds. Calculate the deceleration of the car in m/s².',
    answer: 5, acceptableAnswers: ['5', '5 m/s²'],
    hint: 'Deceleration = change in speed ÷ time taken. The car goes from 30 m/s to 0 m/s.',
    explanation: 'Change in speed = 30 − 0 = 30 m/s. Time = 6 s. Deceleration = 30 ÷ 6 = <b>5 m/s²</b>. Deceleration is simply acceleration in the negative direction — the car is slowing down.'
  }),

  makeMCQ({
    id: 'g9s-phard-002', chapterId: P4, subsection: 'speed_time_graphs', difficulty: 4,
    question: 'A speed-time graph shows a straight line rising from (0 s, 0 m/s) to (4 s, 20 m/s), then a horizontal line from (4 s, 20 m/s) to (7 s, 20 m/s). What is the TOTAL distance travelled?',
    options: ['60 m', '80 m', '100 m', '140 m'],
    answer: '100 m',
    hint: 'Distance = area under the speed-time graph. Split it into a triangle (0 to 4 s) and a rectangle (4 to 7 s).',
    explanation: 'Triangle (0–4 s): area = ½ × base × height = ½ × 4 × 20 = 40 m. Rectangle (4–7 s): area = 3 × 20 = 60 m. Total distance = 40 + 60 = <b>100 m</b>. The area under a speed-time graph always gives the distance travelled.'
  }),

  makeNum({
    id: 'g9s-phard-003', chapterId: P4, subsection: 'motion_problems', difficulty: 3,
    question: 'A jogger runs 400 m in 80 s, stops to rest for 40 s, then runs a further 200 m in 40 s. What is the average speed for the ENTIRE journey in m/s? (Average speed = total distance ÷ total time.)',
    answer: 3.75, acceptableAnswers: ['3.75', '3.75 m/s'],
    hint: 'Total distance includes both running sections. Total time includes the rest period.',
    explanation: 'Total distance = 400 + 200 = 600 m. Total time = 80 + 40 + 40 = 160 s. Average speed = 600 ÷ 160 = <b>3.75 m/s</b>. Note: the rest period is included in total time, which lowers the average speed.'
  }),

  makeMCQ({
    id: 'g9s-phard-004', chapterId: P4, subsection: 'scalars_vectors', difficulty: 3,
    question: 'Which of the following is a VECTOR quantity?',
    options: ['Mass', 'Temperature', 'Velocity', 'Speed'],
    answer: 'Velocity',
    hint: 'A vector has both magnitude AND direction. A scalar has magnitude only.',
    explanation: '<b>Velocity</b> is a vector — it has both a magnitude (how fast) and a direction (which way). Speed is a scalar (how fast only). Mass and temperature are also scalars — they have no associated direction.'
  }),

  makeNum({
    id: 'g9s-phard-005', chapterId: P4, subsection: 'acceleration', difficulty: 4,
    question: 'A ball is released from rest and falls freely under gravity. Taking the acceleration due to gravity as 10 m/s², what is the speed of the ball after 3.5 seconds?',
    answer: 35, acceptableAnswers: ['35', '35 m/s'],
    hint: 'Use v = u + at. The ball starts from rest, so u = 0.',
    explanation: 'v = u + at = 0 + 10 × 3.5 = <b>35 m/s</b>. Since the ball starts from rest (u = 0) and accelerates at g = 10 m/s², the speed increases by 10 m/s every second. After 3.5 s it reaches 35 m/s.'
  }),

  makeNum({
    id: 'g9s-phard-006', chapterId: P5, subsection: 'charge_and_current', difficulty: 3,
    question: 'A charge of 60 coulombs flows through a lamp in 12 seconds. What is the electric current in amperes?',
    answer: 5, acceptableAnswers: ['5', '5 A'],
    hint: 'Current = charge ÷ time (I = Q ÷ t).',
    explanation: 'I = Q ÷ t = 60 ÷ 12 = <b>5 A</b>. The ampere is defined as one coulomb of charge flowing per second. Here, 60 coulombs in 12 seconds gives a steady current of 5 A.'
  }),

  makeNum({
    id: 'g9s-phard-007', chapterId: P5, subsection: 'charge_and_current', difficulty: 3,
    question: 'A voltage of 15 V is applied across a resistor and a current of 0.5 A flows through it. Calculate the resistance of the resistor in ohms using Ohm\'s Law.',
    answer: 30, acceptableAnswers: ['30', '30 Ω', '30 ohms'],
    hint: 'Ohm\'s Law: V = IR. Rearrange to R = V ÷ I.',
    explanation: 'R = V ÷ I = 15 ÷ 0.5 = <b>30 Ω</b>. Ohm\'s Law states that voltage = current × resistance (V = IR). Rearranging: R = V/I. A current of 0.5 A through a 30 Ω resistor requires exactly 15 V.'
  }),

  makeMCQ({
    id: 'g9s-phard-008', chapterId: P5, subsection: 'charge_and_current', difficulty: 4,
    question: 'Two identical bulbs are connected in PARALLEL to a battery. Compared to a single bulb connected to the same battery, how does each bulb in the parallel circuit behave?',
    options: [
      'Dimmer, because the current is shared between the two bulbs',
      'The same brightness, because the voltage across each bulb is unchanged',
      'Brighter, because the total power of the circuit has doubled',
      'Dimmer, because the voltage across each bulb is halved'
    ],
    answer: 'The same brightness, because the voltage across each bulb is unchanged',
    hint: 'In a parallel circuit, every branch receives the full battery voltage.',
    explanation: 'In a parallel circuit each branch is connected directly across the battery, so the <b>voltage across each bulb equals the full battery voltage</b> — the same as for a single bulb. Because each bulb has the same voltage and resistance as before, it glows at the same brightness. (The battery supplies twice the current overall, but that current is split between the two branches.)'
  }),

  makeMCQ({
    id: 'g9s-phard-009', chapterId: P5, subsection: 'charge_and_current', difficulty: 3,
    question: 'A 12 V battery is connected to two resistors of 4 Ω and 8 Ω in SERIES. What is the current flowing through the circuit?',
    options: ['3 A', '2 A', '1 A', '6 A'],
    answer: '1 A',
    hint: 'In series, total resistance = R₁ + R₂. Then use I = V ÷ R_total.',
    explanation: 'Total resistance = 4 + 8 = 12 Ω. Current I = V ÷ R = 12 ÷ 12 = <b>1 A</b>. In a series circuit the same current flows through every component, and resistances add together. The voltage drop across the 4 Ω resistor is 4 V, and across the 8 Ω resistor is 8 V, totalling 12 V.'
  }),

  makeMCQ({
    id: 'g9s-phard-010', chapterId: P2, subsection: 'reflection', difficulty: 3,
    question: 'A ray of light strikes a plane mirror at an angle of incidence of 40° (measured from the normal). What is the angle between the incident ray and the reflected ray?',
    options: ['40°', '80°', '140°', '20°'],
    answer: '80°',
    hint: 'The angle of reflection equals the angle of incidence. The angle between the two rays is the sum of both angles.',
    explanation: 'By the law of reflection, angle of reflection = angle of incidence = 40°. The angle between the incident ray and reflected ray = 40° + 40° = <b>80°</b>. Both angles are measured from the normal, and the two rays lie on the same side of that normal.'
  }),

  makeMCQ({
    id: 'g9s-phard-011', chapterId: P2, subsection: 'refraction', difficulty: 3,
    question: 'Light travels from water into air. When the angle of incidence EXCEEDS the critical angle, what happens?',
    options: [
      'The light is fully absorbed by the water surface',
      'Total internal reflection occurs — the light reflects back into the water',
      'The light bends away from the normal and enters the air at a large angle',
      'The light speeds up and passes straight through without bending'
    ],
    answer: 'Total internal reflection occurs — the light reflects back into the water',
    hint: 'The critical angle is the angle beyond which light cannot escape into the less dense medium.',
    explanation: 'When the angle of incidence in the denser medium (water) exceeds the <b>critical angle</b>, no refracted ray exists and <b>total internal reflection</b> occurs — all the light bounces back into the water. This only happens when light travels from a denser to a less dense medium (e.g., glass→air, water→air).'
  }),

  makeMCQ({
    id: 'g9s-phard-012', chapterId: P2, subsection: 'refraction', difficulty: 4,
    question: 'A fibre optic cable carries data as pulses of light. The light travels along the glass core and does not escape through the sides of the fibre. Which physical principle makes this possible?',
    options: [
      'Diffraction of light at the glass-air boundary',
      'Total internal reflection at the glass-air boundary',
      'Refraction that continuously bends light toward the axis of the fibre',
      'Absorption and re-emission of photons at each bend in the fibre'
    ],
    answer: 'Total internal reflection at the glass-air boundary',
    hint: 'The light strikes the glass-air boundary at an angle greater than the critical angle.',
    explanation: 'Glass is denser than air, and light travelling inside the glass strikes the glass-air boundary at an angle larger than the critical angle. This causes <b>total internal reflection</b> at every point, keeping the light trapped inside the fibre as it bounces along. This is the basis of all fibre-optic communications. Diffraction, refraction toward the axis, and absorption do not describe this effect.'
  }),

  makeNum({
    id: 'g9s-phard-013', chapterId: P3, subsection: 'energy_problems', difficulty: 3,
    question: 'A worker pushes a heavy crate with a constant force of 250 N along a horizontal floor for a distance of 8 m. Calculate the work done by the worker in joules.',
    answer: 2000, acceptableAnswers: ['2000', '2000 J'],
    hint: 'Work done = force × distance in the direction of the force (W = F × d).',
    explanation: 'W = F × d = 250 × 8 = <b>2000 J</b>. Work is only done when a force moves an object through a distance in the direction of that force. The unit is the joule (J): 1 J = 1 N × 1 m.'
  }),

  makeNum({
    id: 'g9s-phard-014', chapterId: P3, subsection: 'energy_problems', difficulty: 4,
    question: 'A machine receives an input power of 500 W. In 6 seconds it produces 1800 J of useful work output. Calculate the efficiency of the machine as a percentage.',
    answer: 60, acceptableAnswers: ['60', '60%'],
    hint: 'Efficiency = (useful power output ÷ power input) × 100. Find useful output power from W ÷ t.',
    explanation: 'Useful output power = 1800 J ÷ 6 s = 300 W. Efficiency = (300 ÷ 500) × 100 = <b>60%</b>. The remaining 40% of the input power (200 W) is wasted, mainly as heat due to friction. No machine can exceed 100% efficiency.'
  }),

  makeMCQ({
    id: 'g9s-phard-015', chapterId: P3, subsection: 'thermal_expansion', difficulty: 3,
    question: 'A bimetallic strip is made by bonding a strip of brass and a strip of iron together. When heated, brass expands more than iron. In which direction does the strip bend?',
    options: [
      'Toward the brass side',
      'Toward the iron side',
      'It remains perfectly straight',
      'It expands equally in all directions and does not bend'
    ],
    answer: 'Toward the iron side',
    hint: 'The side that expands more becomes longer and forms the outside of the curve.',
    explanation: 'When heated, the brass side expands more than the iron side. The longer brass side forms the <b>outer curve</b>, forcing the strip to bend <b>toward the iron side</b>. This differential expansion is the operating principle of bimetallic strips used in thermostats and heat-sensitive switches.'
  })

);

})();
