'use strict';
// NCE Physics multi-year questions — inspired by 2021, 2023 past papers.
// IDs g9s-pmy-001 to g9s-pmy-040. All subsection ids match _manifest.js.
(function () {

// ── Chapter p1: Measurements ──────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-001', chapterId: 'g9s-p1-measurements', subsection: 'si_units',
  difficulty: 2,
  question: 'Which of the following is the SI unit of <b>volume</b>?',
  options: ['m³', 'cm³', 'litre', 'mL'],
  answer: 'm³',
  explanation: 'The SI unit of volume is the cubic metre (m³). Litres and cm³ are commonly used but are not SI base units.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-002', chapterId: 'g9s-p1-measurements', subsection: 'measuring_instruments',
  difficulty: 2,
  question: 'Which instrument is most suitable for measuring the <b>mass</b> of a small stone?',
  options: ['Electronic balance', 'Spring balance', 'Thermometer', 'Measuring cylinder'],
  answer: 'Electronic balance',
  explanation: 'An electronic balance directly measures mass in grams or kilograms. A spring balance measures weight (force), not mass.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-003', chapterId: 'g9s-p1-measurements', subsection: 'measuring_instruments',
  difficulty: 2,
  question: 'A vernier caliper has three main parts labelled J (external jaws), K (internal jaws) and L (depth gauge/tail). Which part is used to measure the <b>diameter</b> of a metal rod?',
  options: ['J — external jaws', 'K — internal jaws', 'L — depth gauge', 'Any of the three'],
  answer: 'J — external jaws',
  explanation: 'The external jaws (J) grip the outside of an object to measure its outer diameter or width.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-004', chapterId: 'g9s-p1-measurements', subsection: 'measuring_instruments',
  difficulty: 2,
  question: 'Which part of a vernier caliper is used to measure the <b>depth</b> of a beaker?',
  options: ['Depth gauge (tail)', 'External jaws', 'Internal jaws', 'The main scale only'],
  answer: 'Depth gauge (tail)',
  explanation: 'The tail (depth gauge) is inserted into the beaker and slides against the base to measure its internal depth.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-005', chapterId: 'g9s-p1-measurements', subsection: 'si_units',
  difficulty: 1,
  question: 'What is the SI unit of <b>length</b>?',
  options: ['Metre (m)', 'Centimetre (cm)', 'Kilometre (km)', 'Millimetre (mm)'],
  answer: 'Metre (m)',
  explanation: 'The metre is the SI base unit of length. All other metric units of length are multiples or sub-multiples of the metre.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-006', chapterId: 'g9s-p1-measurements', subsection: 'accuracy_of_instruments',
  difficulty: 2,
  question: 'A clinical thermometer has a range of 35 °C to 42 °C. Which of the following temperatures <b>can</b> be measured with this thermometer?',
  options: ['37 °C', '34 °C', '43 °C', '20 °C'],
  answer: '37 °C',
  explanation: '37 °C lies within the thermometer\'s range of 35–42 °C. Temperatures outside this range cannot be read on the scale.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-007', chapterId: 'g9s-p1-measurements', subsection: 'measurement_errors',
  difficulty: 3,
  question: 'Which type of error occurs when a vernier caliper reads a value other than zero when its jaws are fully closed?',
  options: ['Zero error', 'Parallax error', 'Random error', 'Systematic error'],
  answer: 'Zero error',
  explanation: 'A zero error occurs when the instrument does not read zero when measuring nothing. It is corrected by subtracting the zero reading from every measurement.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-008', chapterId: 'g9s-p1-measurements', subsection: 'accuracy_of_instruments',
  difficulty: 2,
  question: 'A laboratory thermometer has a range of −10 °C to 110 °C. Which of the following temperatures <b>cannot</b> be measured with it?',
  options: ['115 °C', '0 °C', '100 °C', '−5 °C'],
  answer: '115 °C',
  explanation: '115 °C is above the maximum reading of 110 °C, so it cannot be measured with this thermometer without damaging it.'
}));

// ── Chapter p2: Light ─────────────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-009', chapterId: 'g9s-p2-light', subsection: 'luminous_objects',
  difficulty: 1,
  question: 'Which of the following is a <b>non-luminous</b> body?',
  options: ['Clouds', 'The Sun', 'A lighted candle', 'A torch that is switched on'],
  answer: 'Clouds',
  explanation: 'Non-luminous bodies do not produce their own light — they only reflect light from other sources. Clouds, the Moon and mirrors are non-luminous.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-010', chapterId: 'g9s-p2-light', subsection: 'luminous_objects',
  difficulty: 2,
  question: 'Classify the following: a <b>lighted torch</b>, the <b>Moon</b> and the <b>Sun</b>. Which set is correct?',
  options: [
    'Torch — luminous; Moon — non-luminous; Sun — luminous',
    'Torch — luminous; Moon — luminous; Sun — luminous',
    'Torch — non-luminous; Moon — non-luminous; Sun — luminous',
    'Torch — luminous; Moon — non-luminous; Sun — non-luminous'
  ],
  answer: 'Torch — luminous; Moon — non-luminous; Sun — luminous',
  explanation: 'The Sun and a lighted torch produce their own light (luminous). The Moon only reflects sunlight, so it is non-luminous.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-011', chapterId: 'g9s-p2-light', subsection: 'rectilinear_propagation',
  difficulty: 2,
  question: 'A student looks through a <b>bent flexible tube</b> at a lighted candle at the other end. The student cannot see the flame. What is the correct reason?',
  options: [
    'Light travels in a straight line',
    'Light is absorbed by the tube walls',
    'Light is reflected inside the tube',
    'Light is refracted as it enters the tube'
  ],
  answer: 'Light travels in a straight line',
  explanation: 'Because light travels in straight lines (rectilinear propagation), it cannot travel around a bend in a tube, so the candle flame is not visible.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-012', chapterId: 'g9s-p2-light', subsection: 'light_and_vision',
  difficulty: 2,
  question: 'A pencil placed partly in water appears bent or broken at the surface. This is due to:',
  options: ['Refraction', 'Reflection', 'Dispersion', 'Total internal reflection'],
  answer: 'Refraction',
  explanation: 'Light changes speed when it passes from water to air, causing it to change direction (refraction). This makes the submerged part of the pencil appear displaced.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-013', chapterId: 'g9s-p2-light', subsection: 'ray_diagrams',
  difficulty: 2,
  question: 'A beam of light in which all rays are parallel to one another and to the principal axis is called a:',
  options: ['Parallel beam', 'Convergent beam', 'Divergent beam', 'Scattered beam'],
  answer: 'Parallel beam',
  explanation: 'A parallel beam has all light rays running side-by-side in the same direction. A convergent beam comes to a focus; a divergent beam spreads outward.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-014', chapterId: 'g9s-p2-light', subsection: 'reflection',
  difficulty: 2,
  question: 'Which of the following is <b>not</b> a property of the image formed in a plane mirror?',
  options: [
    'The image is real',
    'The image is virtual',
    'The image is the same size as the object',
    'The image is laterally inverted'
  ],
  answer: 'The image is real',
  explanation: 'A plane mirror forms a virtual, upright, laterally inverted image the same size as the object. It is virtual — it cannot be projected onto a screen.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-015', chapterId: 'g9s-p2-light', subsection: 'laws_of_reflection',
  difficulty: 2,
  question: 'An object is placed 48 cm in front of a plane mirror. How far is the image behind the mirror?',
  options: ['48 cm', '24 cm', '96 cm', '12 cm'],
  answer: '48 cm',
  explanation: 'In a plane mirror the image is always the same distance behind the mirror as the object is in front. Object distance = image distance = 48 cm.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-016', chapterId: 'g9s-p2-light', subsection: 'ray_diagrams',
  difficulty: 3,
  question: 'A beam of light in which rays spread out from a single point is called a:',
  options: ['Divergent beam', 'Parallel beam', 'Convergent beam', 'Diffuse beam'],
  answer: 'Divergent beam',
  explanation: 'A divergent beam has rays spreading outward from a common point — like light from a small bulb. A convergent beam is the opposite: rays meet at a point.'
}));

// ── Chapter p3: Energy ────────────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-017', chapterId: 'g9s-p3-energy', subsection: 'conservation_of_energy',
  difficulty: 2,
  question: 'What type of energy is stored in a <b>stretched rubber band</b>?',
  options: ['Elastic potential energy', 'Kinetic energy', 'Chemical energy', 'Thermal energy'],
  answer: 'Elastic potential energy',
  explanation: 'Stretching or compressing a spring or rubber band stores elastic potential energy. This is released as kinetic energy when the band returns to its original shape.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-018', chapterId: 'g9s-p3-energy', subsection: 'non_renewable_sources',
  difficulty: 1,
  question: 'Which of the following is a <b>non-renewable</b> energy source?',
  options: ['Coal', 'Solar energy', 'Wind energy', 'Hydroelectric power'],
  answer: 'Coal',
  explanation: 'Coal is a fossil fuel formed over millions of years and cannot be replenished quickly. Solar, wind and hydro are renewable because they are continuously available.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-019', chapterId: 'g9s-p3-energy', subsection: 'energy_problems',
  difficulty: 2,
  question: 'An apple is at positions K (top of tree), L (halfway down) and M (just about to hit the ground). At which position does the apple have <b>minimum potential energy</b>?',
  options: ['M', 'K', 'L', 'The same at all three'],
  answer: 'M',
  explanation: 'Gravitational potential energy = mgh. At the lowest position M, h is smallest, so potential energy is at its minimum.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-020', chapterId: 'g9s-p3-energy', subsection: 'energy_problems',
  difficulty: 2,
  question: 'An apple falls from positions K (top) to L (middle) to M (bottom). At which position does it have <b>minimum kinetic energy</b>?',
  options: ['K', 'M', 'L', 'Kinetic energy is the same throughout'],
  answer: 'K',
  explanation: 'At K the apple has just been released from rest, so its speed (and kinetic energy) is zero — the minimum. As it falls, KE increases because PE converts to KE.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-021', chapterId: 'g9s-p3-energy', subsection: 'energy_problems',
  difficulty: 3,
  question: 'A pendulum makes 40 complete oscillations in 30 seconds. What is the <b>period</b> of the pendulum?',
  options: ['0.75 s', '1.33 s', '30 s', '40 s'],
  answer: '0.75 s',
  explanation: 'Period = total time ÷ number of oscillations = 30 ÷ 40 = 0.75 s.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-022', chapterId: 'g9s-p3-energy', subsection: 'conservation_of_energy',
  difficulty: 2,
  question: 'A glass jar has a tight metal lid. To open it, a student places the <b>lid</b> under warm running water. Why does this method work?',
  options: [
    'The metal lid expands more than the glass when heated, loosening the seal',
    'The warm water lubricates the lid',
    'Glass contracts when warm water is poured on it',
    'Water reduces friction between the lid and jar'
  ],
  answer: 'The metal lid expands more than the glass when heated, loosening the seal',
  explanation: 'Metals have higher coefficients of thermal expansion than glass. The lid expands slightly when warmed, breaking the tight seal and making it easier to twist off.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-023', chapterId: 'g9s-p3-energy', subsection: 'energy_problems',
  difficulty: 1,
  question: 'What is the SI unit of <b>work and energy</b>?',
  options: ['Joule (J)', 'Watt (W)', 'Newton (N)', 'Pascal (Pa)'],
  answer: 'Joule (J)',
  explanation: 'The joule is the SI unit for both work (force × distance) and energy. 1 joule = 1 newton × 1 metre.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-024', chapterId: 'g9s-p3-energy', subsection: 'conservation_of_energy',
  difficulty: 2,
  question: 'A pendulum swings from X (left extreme) through Y (bottom) to Z (right extreme). At which point is <b>kinetic energy maximum</b>?',
  options: ['Y — at the bottom', 'X — at the left extreme', 'Z — at the right extreme', 'The same at X and Z'],
  answer: 'Y — at the bottom',
  explanation: 'At Y (the lowest point) all potential energy has converted to kinetic energy, so KE is at its maximum. At X and Z the pendulum momentarily stops — KE = 0.'
}));

// ── Chapter p4: Motion ────────────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-025', chapterId: 'g9s-p4-motion', subsection: 'scalars_vectors',
  difficulty: 2,
  question: 'Which of the following is a <b>vector</b> quantity?',
  options: ['Displacement', 'Speed', 'Mass', 'Temperature'],
  answer: 'Displacement',
  explanation: 'A vector has both magnitude and direction. Displacement specifies how far and in which direction. Speed, mass and temperature are scalars — magnitude only.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-026', chapterId: 'g9s-p4-motion', subsection: 'scalars_vectors',
  difficulty: 2,
  question: 'Which of the following is a <b>vector</b> quantity?',
  options: ['Acceleration', 'Distance', 'Time', 'Energy'],
  answer: 'Acceleration',
  explanation: 'Acceleration has both magnitude (how much speed changes per second) and direction. Distance, time and energy are scalars.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-027', chapterId: 'g9s-p4-motion', subsection: 'speed_velocity',
  difficulty: 1,
  question: 'Which formula correctly defines <b>average speed</b>?',
  options: [
    'Average speed = total distance ÷ total time',
    'Average speed = total time ÷ total distance',
    'Average speed = displacement ÷ time',
    'Average speed = acceleration × time'
  ],
  answer: 'Average speed = total distance ÷ total time',
  explanation: 'Average speed = total distance covered divided by the total time taken. When direction is included, it becomes average velocity (displacement ÷ time).'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-028', chapterId: 'g9s-p4-motion', subsection: 'speed_time_graphs',
  difficulty: 2,
  question: 'A speed-time graph shows a straight line that slopes <b>downward</b> from left to right. This represents:',
  options: ['Uniform deceleration', 'Uniform acceleration', 'Constant speed', 'Non-uniform acceleration'],
  answer: 'Uniform deceleration',
  explanation: 'A downward-sloping straight line on a speed-time graph means speed is decreasing at a constant rate — uniform deceleration (negative acceleration).'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-029', chapterId: 'g9s-p4-motion', subsection: 'acceleration',
  difficulty: 3,
  question: 'A car starts from rest and reaches a speed of 8 m/s in 6 seconds. What is its acceleration?',
  options: ['1.3 m/s²', '0.75 m/s²', '48 m/s²', '6 m/s²'],
  answer: '1.3 m/s²',
  explanation: 'Acceleration = change in speed ÷ time = (8 − 0) ÷ 6 ≈ 1.3 m/s².'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-030', chapterId: 'g9s-p4-motion', subsection: 'speed_time_graphs',
  difficulty: 2,
  question: 'A speed-time graph shows a car at 8 m/s from t = 6 s to t = 12 s. What is the car doing during this interval?',
  options: ['Moving at constant speed', 'Accelerating uniformly', 'Decelerating', 'At rest'],
  answer: 'Moving at constant speed',
  explanation: 'A horizontal line on a speed-time graph means speed is not changing — the car is moving at constant (uniform) speed. Acceleration = 0.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-031', chapterId: 'g9s-p4-motion', subsection: 'acceleration',
  difficulty: 3,
  question: 'A car\'s speed increases from 8 m/s to 14 m/s in 2 seconds. Calculate the acceleration.',
  options: ['3 m/s²', '11 m/s²', '7 m/s²', '6 m/s²'],
  answer: '3 m/s²',
  explanation: 'Acceleration = (v − u) ÷ t = (14 − 8) ÷ 2 = 6 ÷ 2 = 3 m/s².'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-032', chapterId: 'g9s-p4-motion', subsection: 'motion_problems',
  difficulty: 3,
  question: 'On a speed-time graph a car decelerates from 14 m/s to 0 m/s over 4 seconds. What distance does it cover during this deceleration?',
  options: ['28 m', '56 m', '14 m', '4 m'],
  answer: '28 m',
  explanation: 'Distance = area under speed-time graph = ½ × base × height = ½ × 4 × 14 = 28 m.'
}));

// ── Chapter p5: Electricity ───────────────────────────────────────────────

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-033', chapterId: 'g9s-p5-electricity', subsection: 'circuit_symbols',
  difficulty: 2,
  question: 'In a circuit diagram, a straight line with a gap between two lines represents which component?',
  options: ['Open switch', 'Resistor', 'Voltmeter', 'Lamp'],
  answer: 'Open switch',
  explanation: 'An open switch is shown as a line with a break (gap) between contacts. A closed switch has the line completing the gap.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-034', chapterId: 'g9s-p5-electricity', subsection: 'series_circuits',
  difficulty: 2,
  question: 'Two lamps and an open switch are connected in series. What happens to the lamps?',
  options: [
    'Neither lamp lights — the circuit is broken',
    'Both lamps light at full brightness',
    'Only the lamp closest to the battery lights',
    'The lamps flicker on and off'
  ],
  answer: 'Neither lamp lights — the circuit is broken',
  explanation: 'In a series circuit, an open switch breaks the circuit at that point. No current can flow anywhere in the circuit, so neither lamp lights.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-035', chapterId: 'g9s-p5-electricity', subsection: 'measuring_current_voltage',
  difficulty: 2,
  question: 'How must an ammeter be connected in a circuit to measure the current through a lamp?',
  options: ['In series with the lamp', 'In parallel with the lamp', 'Between the lamp and the battery only', 'Across the power supply terminals'],
  answer: 'In series with the lamp',
  explanation: 'An ammeter must be connected in series so that all the current through the lamp also passes through it. Connecting it in parallel would short-circuit the lamp.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-036', chapterId: 'g9s-p5-electricity', subsection: 'charge_and_current',
  difficulty: 3,
  question: 'A current of 0.5 A flows in a circuit for 8 seconds. Calculate the charge that flows.',
  options: ['4 C', '8 C', '0.5 C', '16 C'],
  answer: '4 C',
  explanation: 'Q = It = 0.5 × 8 = 4 coulombs.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-037', chapterId: 'g9s-p5-electricity', subsection: 'charge_and_current',
  difficulty: 3,
  question: 'A current of 10 A flows in a circuit for 2 minutes. Calculate the total charge that flows.',
  options: ['1 200 C', '20 C', '120 C', '600 C'],
  answer: '1 200 C',
  explanation: 'Q = It. Convert time: 2 min = 120 s. Q = 10 × 120 = 1 200 C.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-038', chapterId: 'g9s-p5-electricity', subsection: 'circuit_symbols',
  difficulty: 1,
  question: 'Which circuit symbol represents a <b>resistor</b>?',
  options: [
    'A rectangle (or a zigzag line)',
    'A circle with a cross inside',
    'Two parallel lines of unequal length',
    'A circle with the letter A inside'
  ],
  answer: 'A rectangle (or a zigzag line)',
  explanation: 'The resistor symbol is a rectangle (IEC standard) or a zigzag line (US/older standard). A circle with a cross is a lamp; parallel lines are a cell; A in a circle is an ammeter.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-039', chapterId: 'g9s-p5-electricity', subsection: 'measuring_current_voltage',
  difficulty: 2,
  question: 'How should a voltmeter be connected to measure the potential difference across a lamp?',
  options: ['In parallel with the lamp', 'In series with the lamp', 'Between the battery and switch', 'Anywhere in the circuit'],
  answer: 'In parallel with the lamp',
  explanation: 'A voltmeter measures the potential difference between two points. It must be placed in parallel with the component so it can compare the voltage at each terminal.'
}));

STATIC_QUESTIONS.push(makeMCQ({
  id: 'g9s-pmy-040', chapterId: 'g9s-p5-electricity', subsection: 'dc_circuit_problems',
  difficulty: 2,
  question: 'In a series circuit with three lamps, one lamp blows (breaks). What happens to the other two lamps?',
  options: [
    'They go out — the series circuit is broken',
    'They shine more brightly',
    'They continue to shine at the same brightness',
    'One goes out and one gets brighter'
  ],
  answer: 'They go out — the series circuit is broken',
  explanation: 'In a series circuit there is only one path for current. A blown lamp breaks that path, so no current flows anywhere and all lamps go out.'
}));

})();
