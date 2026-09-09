'use strict';
(function () {

// P1 Measurements — IDs 001-012
makeMCQ({
  id: 'g9s-ppi-001',
  chapterId: 'g9s-p1-measurements',
  subsection: 'measuring_instruments',
  difficulty: 1,
  question: 'Which instrument is used to measure the <b>mass</b> of an object?',
  options: ['Balance', 'Thermometer', 'Measuring cylinder', 'Stopwatch'],
  answer: 'Balance',
  explanation: 'A balance compares mass against known masses. Thermometer measures temperature, measuring cylinder measures volume, stopwatch measures time.'
});

makeMCQ({
  id: 'g9s-ppi-002',
  chapterId: 'g9s-p1-measurements',
  subsection: 'measuring_instruments',
  difficulty: 1,
  question: 'Which instrument is most suitable for measuring the <b>volume</b> of a liquid?',
  options: ['Measuring cylinder', 'Balance', 'Ruler', 'Thermometer'],
  answer: 'Measuring cylinder',
  explanation: 'A measuring cylinder is calibrated to read the volume of liquids directly in cm³ or mL.'
});

makeMCQ({
  id: 'g9s-ppi-003',
  chapterId: 'g9s-p1-measurements',
  subsection: 'measuring_instruments',
  difficulty: 2,
  question: 'When reading the volume of water in a measuring cylinder, at which level of the meniscus should you read?',
  options: ['Bottom of the curved surface', 'Top of the curved surface', 'Middle of the curved surface', 'Any level of the curved surface'],
  answer: 'Bottom of the curved surface',
  explanation: 'Water forms a concave meniscus. The correct reading is taken at the bottom of the curved surface (the meniscus) to avoid parallax error.'
});

makeMCQ({
  id: 'g9s-ppi-004',
  chapterId: 'g9s-p1-measurements',
  subsection: 'measurement_errors',
  difficulty: 2,
  question: 'To avoid parallax error when reading a measuring cylinder, the eye should be positioned:',
  options: ['Level with the liquid surface', 'Above the liquid surface', 'Below the liquid surface', 'At any convenient height'],
  answer: 'Level with the liquid surface',
  explanation: 'Parallax error occurs when the line of sight is not perpendicular to the scale. The eye must be at the same level as the liquid surface to read accurately.'
});

makeMCQ({
  id: 'g9s-ppi-005',
  chapterId: 'g9s-p1-measurements',
  subsection: 'measuring_instruments',
  difficulty: 1,
  question: 'A student estimates the height of a school desk. Which value is most reasonable?',
  options: ['80 cm', '8 cm', '0.8 cm', '800 cm'],
  answer: '80 cm',
  explanation: 'A typical school desk is about 70–80 cm tall. 8 cm is far too short, 0.8 cm is tiny, and 800 cm (8 m) is the height of a building.'
});

makeMCQ({
  id: 'g9s-ppi-006',
  chapterId: 'g9s-p1-measurements',
  subsection: 'measurement_errors',
  difficulty: 2,
  question: 'A ruler is placed so that the zero mark does not align with the start of the object being measured. This type of error is called:',
  options: ['End error', 'Parallax error', 'Zero error', 'Random error'],
  answer: 'End error',
  explanation: 'End error (also called zero error with rulers) occurs when the measurement does not start at the zero mark of the ruler, giving a systematic offset.'
});

makeMCQ({
  id: 'g9s-ppi-007',
  chapterId: 'g9s-p1-measurements',
  subsection: 'accuracy_of_instruments',
  difficulty: 2,
  question: 'Which measuring instrument is most accurate for measuring the diameter of a thin wire?',
  options: ['Micrometer screw gauge', 'Vernier caliper', 'Metre ruler', 'Measuring tape'],
  answer: 'Micrometer screw gauge',
  explanation: 'A micrometer screw gauge can measure to 0.01 mm, making it the most accurate instrument for very small lengths like wire diameter.'
});

makeMCQ({
  id: 'g9s-ppi-008',
  chapterId: 'g9s-p1-measurements',
  subsection: 'accuracy_of_instruments',
  difficulty: 2,
  question: 'A vernier caliper is preferred over a metre ruler because it:',
  options: ['Gives a more accurate reading', 'Is easier to use', 'Can measure larger lengths', 'Requires no zero correction'],
  answer: 'Gives a more accurate reading',
  explanation: 'A vernier caliper reads to 0.1 mm, whereas a metre ruler typically reads to only 1 mm. Greater precision reduces measurement uncertainty.'
});

makeMCQ({
  id: 'g9s-ppi-009',
  chapterId: 'g9s-p1-measurements',
  subsection: 'measuring_instruments',
  difficulty: 1,
  question: 'What does a thermometer measure?',
  options: ['Temperature', 'Heat energy', 'Mass', 'Volume'],
  answer: 'Temperature',
  explanation: 'A thermometer measures temperature in degrees Celsius (°C) or Kelvin (K). Heat energy is measured in joules using a calorimeter.'
});

makeMCQ({
  id: 'g9s-ppi-010',
  chapterId: 'g9s-p1-measurements',
  subsection: 'measurement_errors',
  difficulty: 2,
  question: 'A stopwatch reads 0.3 s when it is not timing anything. This is an example of:',
  options: ['Zero error', 'Parallax error', 'End error', 'Human error'],
  answer: 'Zero error',
  explanation: 'Zero error occurs when an instrument gives a non-zero reading when it should read zero. The actual time must be corrected by subtracting 0.3 s from every reading.'
});

makeNum({
  id: 'g9s-ppi-011',
  chapterId: 'g9s-p1-measurements',
  subsection: 'measuring_instruments',
  difficulty: 2,
  question: 'A student measures the time for 30 complete swings of a pendulum and records 60 s. What is the time period of the pendulum in seconds?',
  answer: 2,
  unit: 's',
  explanation: 'Time period = total time ÷ number of swings = 60 ÷ 30 = 2 s. The time period is the time for ONE complete oscillation.'
});

makeMCQ({
  id: 'g9s-ppi-012',
  chapterId: 'g9s-p1-measurements',
  subsection: 'measuring_instruments',
  difficulty: 3,
  question: 'The time period of a pendulum is defined as the time for:',
  options: ['One complete oscillation', 'Half an oscillation', 'Thirty complete oscillations', 'The pendulum to swing to one side only'],
  answer: 'One complete oscillation',
  explanation: 'The time period T is the time taken for ONE complete back-and-forth swing (oscillation). Thirty swings are counted to reduce timing errors, then divided by 30.'
});

// P2 Light — IDs 013-022
makeMCQ({
  id: 'g9s-ppi-013',
  chapterId: 'g9s-p2-light',
  subsection: 'luminous_objects',
  difficulty: 1,
  question: 'Which of the following is a <b>luminous</b> object?',
  options: ['A burning candle', 'The Moon', 'A mirror', 'A planet'],
  answer: 'A burning candle',
  explanation: 'A luminous object produces its own light. A candle burns and produces light. The Moon, mirrors and planets only reflect light — they are non-luminous.'
});

makeMCQ({
  id: 'g9s-ppi-014',
  chapterId: 'g9s-p2-light',
  subsection: 'luminous_objects',
  difficulty: 1,
  question: 'Which of the following is a <b>non-luminous</b> object?',
  options: ['The Moon', 'The Sun', 'A star', 'A torch bulb'],
  answer: 'The Moon',
  explanation: 'The Moon does not produce its own light — it reflects sunlight. The Sun, stars and a torch bulb all produce their own light and are luminous.'
});

makeMCQ({
  id: 'g9s-ppi-015',
  chapterId: 'g9s-p2-light',
  subsection: 'laws_of_reflection',
  difficulty: 1,
  question: 'The law of reflection states that the angle of incidence is:',
  options: ['Equal to the angle of reflection', 'Greater than the angle of reflection', 'Less than the angle of reflection', 'Unrelated to the angle of reflection'],
  answer: 'Equal to the angle of reflection',
  explanation: 'The law of reflection: angle of incidence = angle of reflection. Both angles are measured from the normal (a line perpendicular to the mirror surface).'
});

makeMCQ({
  id: 'g9s-ppi-016',
  chapterId: 'g9s-p2-light',
  subsection: 'laws_of_reflection',
  difficulty: 2,
  question: 'In a ray diagram, the angle of incidence and the angle of reflection are both measured from the:',
  options: ['Normal to the mirror', 'Surface of the mirror', 'Reflected ray', 'Horizontal baseline'],
  answer: 'Normal to the mirror',
  explanation: 'The normal is an imaginary line drawn perpendicular to the mirror at the point of incidence. Both the angle of incidence and angle of reflection are measured from this normal.'
});

makeMCQ({
  id: 'g9s-ppi-017',
  chapterId: 'g9s-p2-light',
  subsection: 'ray_diagrams',
  difficulty: 2,
  question: 'A plane mirror forms an image that is:',
  options: ['Virtual, upright, and the same size as the object', 'Real, inverted, and the same size as the object', 'Virtual, inverted, and larger than the object', 'Real, upright, and smaller than the object'],
  answer: 'Virtual, upright, and the same size as the object',
  explanation: 'A plane mirror always produces a virtual (cannot be projected), upright (erect), and same-size image, located as far behind the mirror as the object is in front.'
});

makeMCQ({
  id: 'g9s-ppi-018',
  chapterId: 'g9s-p2-light',
  subsection: 'reflection',
  difficulty: 2,
  question: 'When you look at your right hand in a plane mirror, the image appears to raise its:',
  options: ['Left hand', 'Right hand', 'Both hands', 'Neither hand'],
  answer: 'Left hand',
  explanation: 'A plane mirror causes lateral inversion — left and right are swapped. Your right hand appears as the left hand of the image.'
});

makeNum({
  id: 'g9s-ppi-019',
  chapterId: 'g9s-p2-light',
  subsection: 'ray_diagrams',
  difficulty: 2,
  question: 'An object is placed 120 cm in front of a plane mirror. How far is the image behind the mirror, in cm?',
  answer: 120,
  unit: 'cm',
  explanation: 'For a plane mirror, the image distance equals the object distance. Object is 120 cm in front → image is 120 cm behind the mirror.'
});

makeMCQ({
  id: 'g9s-ppi-020',
  chapterId: 'g9s-p2-light',
  subsection: 'rectilinear_propagation',
  difficulty: 1,
  question: 'Light travels in:',
  options: ['Straight lines', 'Curved paths', 'Zigzag paths', 'Circular paths'],
  answer: 'Straight lines',
  explanation: 'Light travels in straight lines (rectilinear propagation) in a uniform medium. This is why shadows have sharp edges and a pinhole camera forms an inverted image.'
});

makeMCQ({
  id: 'g9s-ppi-021',
  chapterId: 'g9s-p2-light',
  subsection: 'light_and_vision',
  difficulty: 2,
  question: 'We are able to see a non-luminous object because:',
  options: ['It reflects light into our eyes', 'It produces its own dim light', 'It absorbs all light falling on it', 'It refracts light towards us'],
  answer: 'It reflects light into our eyes',
  explanation: 'Non-luminous objects are visible because they reflect light from a luminous source into our eyes. Without a light source, non-luminous objects are invisible.'
});

makeNum({
  id: 'g9s-ppi-022',
  chapterId: 'g9s-p2-light',
  subsection: 'ray_diagrams',
  difficulty: 3,
  question: 'A person stands 120 cm in front of a plane mirror. A second object is 210 cm directly behind the person. How far is the image of the second object from the person, in cm?',
  answer: 450,
  unit: 'cm',
  explanation: 'The second object is 120 + 210 = 330 cm from the mirror. Its image is 330 cm behind the mirror. Distance from the person = 330 cm (behind mirror) + 120 cm (person to mirror) = 450 cm.'
});

// P3 Energy — IDs 023-038
makeMCQ({
  id: 'g9s-ppi-023',
  chapterId: 'g9s-p3-energy',
  subsection: 'non_renewable_sources',
  difficulty: 1,
  question: 'Which of the following is a <b>non-renewable</b> energy source?',
  options: ['Coal', 'Solar energy', 'Wind energy', 'Hydroelectric energy'],
  answer: 'Coal',
  explanation: 'Coal is non-renewable — it formed over millions of years and will eventually run out. Solar, wind and hydroelectric energy are renewable as they are continuously replenished.'
});

makeMCQ({
  id: 'g9s-ppi-024',
  chapterId: 'g9s-p3-energy',
  subsection: 'renewable_sources',
  difficulty: 1,
  question: 'Which of the following is a <b>renewable</b> energy source?',
  options: ['Wind energy', 'Natural gas', 'Oil', 'Nuclear energy'],
  answer: 'Wind energy',
  explanation: 'Wind energy is renewable because wind is continuously replenished by the Sun heating the atmosphere. Natural gas, oil and nuclear fuel are finite and non-renewable.'
});

makeMCQ({
  id: 'g9s-ppi-025',
  chapterId: 'g9s-p3-energy',
  subsection: 'non_renewable_sources',
  difficulty: 2,
  question: 'Nuclear energy is classified as non-renewable because:',
  options: ['Nuclear fuel is finite and will eventually be exhausted', 'It produces harmful radiation only', 'It cannot generate electricity', 'It releases carbon dioxide when used'],
  answer: 'Nuclear fuel is finite and will eventually be exhausted',
  explanation: 'Nuclear fuel (uranium, plutonium) exists in limited quantities in the Earth\'s crust. Once used, it cannot be replenished on a human timescale, making it non-renewable.'
});

makeMCQ({
  id: 'g9s-ppi-026',
  chapterId: 'g9s-p3-energy',
  subsection: 'electricity_production',
  difficulty: 2,
  question: 'In a thermal power station, what is the correct order of energy transformations?',
  options: ['Chemical → heat → kinetic → electrical', 'Electrical → heat → kinetic → chemical', 'Kinetic → heat → chemical → electrical', 'Heat → chemical → kinetic → electrical'],
  answer: 'Chemical → heat → kinetic → electrical',
  explanation: 'Fuel (chemical energy) burns to produce heat → heats water to steam (heat) → spins a turbine (kinetic) → drives a generator (electrical energy).'
});

makeMCQ({
  id: 'g9s-ppi-027',
  chapterId: 'g9s-p3-energy',
  subsection: 'conservation_of_energy',
  difficulty: 2,
  question: 'As a ball falls freely from a height, its gravitational potential energy (GPE):',
  options: ['Converts to kinetic energy', 'Converts to heat energy only', 'Stays the same throughout', 'Increases as it falls'],
  answer: 'Converts to kinetic energy',
  explanation: 'By conservation of energy, GPE converts to kinetic energy (KE) as the ball falls. At the ground, all GPE has become KE (ignoring air resistance).'
});

makeMCQ({
  id: 'g9s-ppi-028',
  chapterId: 'g9s-p3-energy',
  subsection: 'energy_problems',
  difficulty: 2,
  question: 'At which point does a falling ball have maximum gravitational potential energy?',
  options: ['At its highest point', 'At the halfway point', 'Just before hitting the ground', 'At the ground level'],
  answer: 'At its highest point',
  explanation: 'GPE = mgh. GPE is maximum when height h is maximum, which is at the starting (highest) point. At ground level, h = 0, so GPE = 0.'
});

makeNum({
  id: 'g9s-ppi-029',
  chapterId: 'g9s-p3-energy',
  subsection: 'energy_problems',
  difficulty: 2,
  question: 'A 2 kg ball is held at a height of 5 m above the ground. Calculate its gravitational potential energy in joules. (g = 10 N/kg)',
  answer: 100,
  unit: 'J',
  explanation: 'GPE = mgh = 2 × 10 × 5 = 100 J.'
});

makeMCQ({
  id: 'g9s-ppi-030',
  chapterId: 'g9s-p3-energy',
  subsection: 'conservation_of_energy',
  difficulty: 1,
  question: 'The law of conservation of energy states that energy:',
  options: ['Cannot be created or destroyed, only converted', 'Is always lost as heat during conversion', 'Can be created from nothing by a machine', 'Decreases over time in a closed system'],
  answer: 'Cannot be created or destroyed, only converted',
  explanation: 'The law of conservation of energy states that the total energy in a closed system remains constant. Energy changes form but the total amount is always conserved.'
});

makeMCQ({
  id: 'g9s-ppi-031',
  chapterId: 'g9s-p3-energy',
  subsection: 'comparing_energy_sources',
  difficulty: 2,
  question: 'Which is an advantage of solar energy over coal?',
  options: ['It does not produce carbon dioxide when generating electricity', 'It generates electricity at night as well as day', 'It is cheaper to build solar panels than coal power stations', 'It produces more electricity per unit area than coal'],
  answer: 'It does not produce carbon dioxide when generating electricity',
  explanation: 'Solar panels generate electricity without combustion, so they produce no CO₂. Coal burning releases CO₂, a greenhouse gas contributing to climate change.'
});

makeMCQ({
  id: 'g9s-ppi-032',
  chapterId: 'g9s-p3-energy',
  subsection: 'energy_problems',
  difficulty: 1,
  question: 'A moving car has which form of energy?',
  options: ['Kinetic energy', 'Gravitational potential energy', 'Chemical energy', 'Nuclear energy'],
  answer: 'Kinetic energy',
  explanation: 'Any moving object has kinetic energy (KE = ½mv²). The car\'s fuel (chemical energy) was converted to kinetic energy via the engine.'
});

makeMCQ({
  id: 'g9s-ppi-033',
  chapterId: 'g9s-p3-energy',
  subsection: 'renewable_sources',
  difficulty: 2,
  question: 'Which energy source uses the movement of water in rivers to generate electricity?',
  options: ['Hydroelectric energy', 'Tidal energy', 'Geothermal energy', 'Biomass energy'],
  answer: 'Hydroelectric energy',
  explanation: 'Hydroelectric power stations use flowing or falling water (usually from a dam on a river) to spin turbines and generate electricity.'
});

makeMCQ({
  id: 'g9s-ppi-034',
  chapterId: 'g9s-p3-energy',
  subsection: 'comparing_energy_sources',
  difficulty: 3,
  question: 'A wind turbine produces electricity only when the wind blows. This is described as a:',
  options: ['Disadvantage of wind energy', 'Advantage of wind energy', 'Property of all renewable sources', 'Feature shared with coal-fired stations'],
  answer: 'Disadvantage of wind energy',
  explanation: 'Wind energy is intermittent — it depends on wind speed. When there is no wind, no electricity is produced. This unreliability is a key disadvantage compared with fossil fuel stations.'
});

makeNum({
  id: 'g9s-ppi-035',
  chapterId: 'g9s-p3-energy',
  subsection: 'energy_problems',
  difficulty: 3,
  question: 'A 5 kg object falls from a height of 8 m. Calculate its kinetic energy just before it hits the ground in joules, assuming no air resistance. (g = 10 N/kg)',
  answer: 400,
  unit: 'J',
  explanation: 'By conservation of energy, KE gained = GPE lost = mgh = 5 × 10 × 8 = 400 J.'
});

makeMCQ({
  id: 'g9s-ppi-036',
  chapterId: 'g9s-p3-energy',
  subsection: 'energy_problems',
  difficulty: 2,
  question: 'A compressed spring has which type of stored energy?',
  options: ['Elastic potential energy', 'Gravitational potential energy', 'Kinetic energy', 'Sound energy'],
  answer: 'Elastic potential energy',
  explanation: 'A compressed or stretched spring stores elastic potential energy. When released, this converts to kinetic energy.'
});

makeMCQ({
  id: 'g9s-ppi-037',
  chapterId: 'g9s-p3-energy',
  subsection: 'non_renewable_sources',
  difficulty: 1,
  question: 'Which THREE of the following are non-renewable energy sources? Coal, Wind, Oil, Solar, Natural Gas',
  options: ['Coal, Oil, and Natural Gas', 'Coal, Wind, and Solar', 'Oil, Solar, and Natural Gas', 'Wind, Oil, and Natural Gas'],
  answer: 'Coal, Oil, and Natural Gas',
  explanation: 'Coal, oil and natural gas are fossil fuels — finite and non-renewable. Wind and solar are renewable energy sources replenished naturally.'
});

makeMCQ({
  id: 'g9s-ppi-038',
  chapterId: 'g9s-p3-energy',
  subsection: 'energy_problems',
  difficulty: 3,
  question: 'A 3 kg ball is dropped from rest. Just before it hits the ground its speed is 20 m/s. What was the height from which it was dropped? (g = 10 N/kg)',
  options: ['20 m', '30 m', '10 m', '60 m'],
  answer: '20 m',
  explanation: 'GPE = KE: mgh = ½mv² → gh = ½v² → h = v²/(2g) = 400/20 = 20 m.'
});

// P4 Motion — IDs 039-050
makeMCQ({
  id: 'g9s-ppi-039',
  chapterId: 'g9s-p4-motion',
  subsection: 'scalars_vectors',
  difficulty: 1,
  question: 'Which of the following is a <b>scalar</b> quantity?',
  options: ['Speed', 'Velocity', 'Acceleration', 'Force'],
  answer: 'Speed',
  explanation: 'Speed is scalar — it has magnitude only. Velocity, acceleration and force are vectors because they have both magnitude and direction.'
});

makeMCQ({
  id: 'g9s-ppi-040',
  chapterId: 'g9s-p4-motion',
  subsection: 'scalars_vectors',
  difficulty: 1,
  question: 'Which of the following is a <b>vector</b> quantity?',
  options: ['Displacement', 'Distance', 'Mass', 'Time'],
  answer: 'Displacement',
  explanation: 'Displacement is vector — it has both magnitude and direction (e.g. 5 m north). Distance, mass and time are scalars with magnitude only.'
});

makeMCQ({
  id: 'g9s-ppi-041',
  chapterId: 'g9s-p4-motion',
  subsection: 'speed_velocity',
  difficulty: 2,
  question: 'A car travels 300 m in 20 s. What is its average speed?',
  options: ['15 m/s', '12 m/s', '6000 m/s', '1.5 m/s'],
  answer: '15 m/s',
  explanation: 'Average speed = distance ÷ time = 300 ÷ 20 = 15 m/s.'
});

makeNum({
  id: 'g9s-ppi-042',
  chapterId: 'g9s-p4-motion',
  subsection: 'acceleration',
  difficulty: 2,
  question: 'A car increases its speed from 10 m/s to 30 m/s in 4 s. Calculate its acceleration in m/s².',
  answer: 5,
  unit: 'm/s²',
  explanation: 'a = (v − u) / t = (30 − 10) / 4 = 20 / 4 = 5 m/s².'
});

makeMCQ({
  id: 'g9s-ppi-043',
  chapterId: 'g9s-p4-motion',
  subsection: 'speed_time_graphs',
  difficulty: 2,
  question: 'On a speed-time graph, a horizontal straight line indicates that the object is moving with:',
  options: ['Constant speed', 'Constant acceleration', 'Increasing acceleration', 'Zero speed'],
  answer: 'Constant speed',
  explanation: 'A horizontal line on a speed-time graph means the speed is not changing — the object moves at constant speed. Acceleration = gradient = 0.'
});

makeMCQ({
  id: 'g9s-ppi-044',
  chapterId: 'g9s-p4-motion',
  subsection: 'speed_time_graphs',
  difficulty: 2,
  question: 'On a speed-time graph, the acceleration of an object is represented by the:',
  options: ['Gradient (slope) of the line', 'Area under the line', 'Height of the line', 'Length of the line'],
  answer: 'Gradient (slope) of the line',
  explanation: 'Acceleration = change in speed ÷ time = gradient of a speed-time graph. The area under a speed-time graph gives the distance travelled.'
});

makeMCQ({
  id: 'g9s-ppi-045',
  chapterId: 'g9s-p4-motion',
  subsection: 'speed_time_graphs',
  difficulty: 2,
  question: 'On a speed-time graph, the area under the graph represents the:',
  options: ['Distance travelled', 'Acceleration', 'Average velocity', 'Resultant force'],
  answer: 'Distance travelled',
  explanation: 'Distance = speed × time. On a speed-time graph this corresponds to the area of the region under the line (a rectangle for constant speed, a triangle for uniform acceleration).'
});

makeNum({
  id: 'g9s-ppi-046',
  chapterId: 'g9s-p4-motion',
  subsection: 'acceleration',
  difficulty: 3,
  question: 'A cyclist decelerates from 15 m/s to 3 m/s in 6 s. Calculate the magnitude of the deceleration in m/s².',
  answer: 2,
  unit: 'm/s²',
  explanation: 'Deceleration = (u − v) / t = (15 − 3) / 6 = 12 / 6 = 2 m/s². The negative sign indicates slowing down; magnitude is 2 m/s².'
});

makeMCQ({
  id: 'g9s-ppi-047',
  chapterId: 'g9s-p4-motion',
  subsection: 'distance_displacement',
  difficulty: 2,
  question: 'A student walks 3 m east then 4 m north. The total distance walked is:',
  options: ['7 m', '5 m', '1 m', '12 m'],
  answer: '7 m',
  explanation: 'Distance is the total path length: 3 + 4 = 7 m. Displacement (a vector) would be 5 m (by Pythagoras: √(3² + 4²) = 5 m), but the question asks for distance.'
});

makeMCQ({
  id: 'g9s-ppi-048',
  chapterId: 'g9s-p4-motion',
  subsection: 'speed_time_graphs',
  difficulty: 3,
  question: 'An object starts from rest and accelerates uniformly to 20 m/s in 5 s. What is the distance travelled?',
  options: ['50 m', '100 m', '20 m', '25 m'],
  answer: '50 m',
  explanation: 'On the speed-time graph this is a triangle. Distance = ½ × base × height = ½ × 5 × 20 = 50 m. (Alternatively: average speed = 10 m/s; distance = 10 × 5 = 50 m.)'
});

makeMCQ({
  id: 'g9s-ppi-049',
  chapterId: 'g9s-p4-motion',
  subsection: 'scalars_vectors',
  difficulty: 1,
  question: 'Energy is a:',
  options: ['Scalar quantity', 'Vector quantity', 'Neither scalar nor vector', 'Both scalar and vector'],
  answer: 'Scalar quantity',
  explanation: 'Energy has magnitude only — it has no direction. Therefore energy is a scalar quantity. Examples of scalars: speed, distance, mass, time, energy.'
});

makeNum({
  id: 'g9s-ppi-050',
  chapterId: 'g9s-p4-motion',
  subsection: 'motion_problems',
  difficulty: 3,
  question: 'A train travelling at 25 m/s applies its brakes and stops in 50 s. Calculate the distance the train travels while braking, in metres.',
  answer: 625,
  unit: 'm',
  explanation: 'Using average speed: average speed = (25 + 0)/2 = 12.5 m/s. Distance = 12.5 × 50 = 625 m. (Or: s = ut + ½at²; a = −0.5 m/s²; s = 25×50 + ½×(−0.5)×2500 = 1250 − 625 = 625 m.)'
});

// P5 Electricity — IDs 051-060
makeMCQ({
  id: 'g9s-ppi-051',
  chapterId: 'g9s-p5-electricity',
  subsection: 'circuit_symbols',
  difficulty: 1,
  question: 'For current to flow in a circuit, the switch must be:',
  options: ['Closed (connected)', 'Open (disconnected)', 'Removed from the circuit', 'Replaced by a resistor'],
  answer: 'Closed (connected)',
  explanation: 'A closed switch completes the circuit, allowing current to flow. An open switch creates a gap (break) in the circuit and current cannot flow.'
});

makeMCQ({
  id: 'g9s-ppi-052',
  chapterId: 'g9s-p5-electricity',
  subsection: 'current_voltage_resistance',
  difficulty: 1,
  question: 'The unit of electrical resistance is the:',
  options: ['Ohm (Ω)', 'Coulomb (C)', 'Joule (J)', 'Volt (V)'],
  answer: 'Ohm (Ω)',
  explanation: 'Resistance is measured in ohms (Ω). Coulomb is the unit of charge, joule is the unit of energy, and volt is the unit of potential difference.'
});

makeMCQ({
  id: 'g9s-ppi-053',
  chapterId: 'g9s-p5-electricity',
  subsection: 'current_voltage_resistance',
  difficulty: 2,
  question: 'A resistor has a resistance of 10 Ω and a current of 2 A flows through it. What is the voltage across the resistor?',
  options: ['20 V', '5 V', '12 V', '0.2 V'],
  answer: '20 V',
  explanation: 'By Ohm\'s Law: V = IR = 2 × 10 = 20 V.'
});

makeNum({
  id: 'g9s-ppi-054',
  chapterId: 'g9s-p5-electricity',
  subsection: 'current_voltage_resistance',
  difficulty: 2,
  question: 'A 12 V battery is connected to a 4 Ω resistor. Calculate the current flowing through the resistor in amperes.',
  answer: 3,
  unit: 'A',
  explanation: 'By Ohm\'s Law: I = V/R = 12/4 = 3 A.'
});

makeMCQ({
  id: 'g9s-ppi-055',
  chapterId: 'g9s-p5-electricity',
  subsection: 'charge_and_current',
  difficulty: 2,
  question: 'The equation relating charge (Q), current (I) and time (t) is:',
  options: ['Q = It', 'Q = I/t', 'Q = I + t', 'Q = t/I'],
  answer: 'Q = It',
  explanation: 'Charge = current × time. Q (coulombs) = I (amperes) × t (seconds). For example, a 2 A current flowing for 5 s delivers 10 C of charge.'
});

makeNum({
  id: 'g9s-ppi-056',
  chapterId: 'g9s-p5-electricity',
  subsection: 'charge_and_current',
  difficulty: 2,
  question: 'A current of 3 A flows through a wire for 10 s. Calculate the charge that passes through the wire in coulombs.',
  answer: 30,
  unit: 'C',
  explanation: 'Q = It = 3 × 10 = 30 C.'
});

makeMCQ({
  id: 'g9s-ppi-057',
  chapterId: 'g9s-p5-electricity',
  subsection: 'series_circuits',
  difficulty: 2,
  question: 'In a series circuit, the current:',
  options: ['Is the same at every point in the circuit', 'Is different at each component', 'Increases as it passes through each resistor', 'Decreases as it passes through each resistor'],
  answer: 'Is the same at every point in the circuit',
  explanation: 'In a series circuit there is only one path for current. Charge is not used up, so the current is identical at every point in the circuit.'
});

makeMCQ({
  id: 'g9s-ppi-058',
  chapterId: 'g9s-p5-electricity',
  subsection: 'potential_difference',
  difficulty: 2,
  question: 'In a series circuit containing two resistors and a 12 V battery, if 4 V is across the first resistor, what is the voltage across the second resistor?',
  options: ['8 V', '4 V', '12 V', '16 V'],
  answer: '8 V',
  explanation: 'In a series circuit, the sum of voltages across components equals the supply voltage. V₂ = 12 − 4 = 8 V.'
});

makeNum({
  id: 'g9s-ppi-059',
  chapterId: 'g9s-p5-electricity',
  subsection: 'dc_circuit_problems',
  difficulty: 3,
  question: 'A charge of 20 C passes through a potential difference of 6 V. Calculate the work done in joules.',
  answer: 120,
  unit: 'J',
  explanation: 'Work done W = QV = 20 × 6 = 120 J.'
});

makeMCQ({
  id: 'g9s-ppi-060',
  chapterId: 'g9s-p5-electricity',
  subsection: 'current_voltage_resistance',
  difficulty: 3,
  question: 'A resistor obeys Ohm\'s Law. If the voltage across it is doubled while its resistance stays the same, the current will:',
  options: ['Double', 'Halve', 'Stay the same', 'Quadruple'],
  answer: 'Double',
  explanation: 'By Ohm\'s Law, I = V/R. If V doubles and R is constant, I doubles. For example, V: 6→12 V with R = 3 Ω gives I: 2→4 A.'
});

})();
