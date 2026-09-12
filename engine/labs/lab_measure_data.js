'use strict';
// ══════════════════════════════════════════════
//  Science Labs - the physics behind the Measurement Lab (NCE Grade 9, P1).
//
//  ⚠ THE SCIENCE LIVES HERE, NOT IN THE DRAWING. Every true value, every
//    instrument's precision and range, how each scale is read, every mistake
//    and what it reads as - all of it is decided in this file. lab_measure.js
//    only draws the scale where this file says it is and asks judge() whether
//    a typed reading is right. If a reading looks wrong on screen, fix it HERE.
//  ⚠ Grounded in the live chapter g9s-p1-measurements (subsections si_units,
//    measuring_instruments, accuracy_of_instruments, measurement_errors) and
//    the paper shapes in docs/nce-grade9/blueprint-science.md: Physics 2023
//    Q2(a) mark main scale M / vernier scale V; Physics 2022 Q3(c) read a
//    vernier; Physics 2022 Q3(a)(i) read a measuring cylinder; Physics 2021
//    Q3(b)(i) and 2023 Q2(d) name the type of error; Physics 2021 Q6(b)
//    improve the accuracy of a measurement.
//  ⚠ Every true value is chosen so that the nearest mark is never in doubt
//    (at least 0.2 of a division away from half-way). The drawing puts the
//    object at its TRUE size, so a pupil who reads to the nearest division
//    gets exactly one right answer. scripts/test-labs-measure-data.js fails if
//    a value drifts towards half a division.
//
//  Length values are stored in mm to 0.01 mm; each instrument turns them into
//  its own unit (cm for the rule and vernier, mm for the micrometer).
//
//  GRADE 4 (PSAC). A second, separate set: its own instruments, things to
//  measure, guides, discoveries, missions and mistake cards, every one tagged
//  `grades: [4]`. Anything untagged is the original Grade 9 set, and
//  forGrade() is the only filter. Grounded in the app's own Grade 4 bank:
//  chapter g4sci-enr-equipment (subsection `measuring`: which instrument
//  measures length, mass, time, volume and temperature, and in which unit),
//  subjects/grade4-science/questions/depth_hard.js g4sci-hd-065 (a pencil
//  started at the 1 cm mark), -066 (eye level with the water), -068 (check a
//  thermometer in melting ice, 0 °C), -070 (a balance whose pointer starts
//  past zero), -071 (an odd stopwatch reading: repeat it), -073 (a long tape,
//  not a 30 cm ruler moved end to end); and grade4-maths g4-measures (mm, cm,
//  m, km; g and kg; mL and L) and g4-data (reading a scale that goes up in
//  steps). No vernier, micrometer or zero-error arithmetic at Grade 4.
//
//  GRADES 7 AND 8 (lower secondary, NCE stage). Two more sets, tagged
//  `grades: [7]` / `[8]`, ids g7_ / g8_. Shared apparatus (cyl78, bal78) is
//  tagged [7, 8]; shared questions are not.
//  Grade 7 - chapter g7s-measurement (si_units, measuring_instruments,
//  calculating_measurements): g7s-measurement-001/-002/-007/-016 (SI units
//  kg, m, s, K), -003/-010 and g7s-hd-017 (measuring cylinder, bottom of the
//  meniscus at eye level, parallax), -011/-012 and g7s-hd-018 (a balance that
//  reads 2.4 g with nothing on it), -006 (box volume l × w × h), -017 and
//  g7s-hd-015 (a stone by displacement, final − first reading), -019 and
//  g7s-hd-021 (g ↔ kg), g7s-hd-020 (mass written in newtons: mass is kg,
//  weight is N). Grade 8 - chapter g8s-inquiry, subsection density_volume:
//  g8s-inquiry-004/-019 (displacement), -005/-010/-016 and g8s-hd-001/-002
//  (density = mass ÷ volume in g/cm³, 2.7 g/cm³ is aluminium, using the final
//  reading is the slip), -011 (ice ≈ 0.92 g/cm³ floats), -014/g8s-hd-003 (a
//  steel ship's average density), g8s-hd-010 (liquids layer by density); and
//  g8s-forces-003/-016 (weight in newtons, g = 10 N/kg). Neither pack uses an
//  overflow (eureka) can or kg/m³, so the lab has no overflow can and marks
//  kg/m³ as beyond the Grade 8 questions. No vernier, micrometer or "zero
//  error" at 7-8: the packs say "zero the balance".
// ══════════════════════════════════════════════
const LabMeasureData = (() => {

  const GRADES = [4, 7, 8, 9];
  // Untagged content is the lab's original grade, 9.
  const forGrade = (list, g) => list.filter(x => (x.grades || [9]).includes(g));

  const QUANTITIES = {
    length: { name: 'length',      si: 'metre',        sym: 'm',  lab: 'cm and mm', kid: 'length (how long)' },
    mass:   { name: 'mass',        si: 'kilogram',     sym: 'kg', lab: 'g',         kid: 'mass (how heavy)' },
    volume: { name: 'volume',      si: 'cubic metre',  sym: 'm³', lab: 'cm³',       kid: 'volume (how much liquid)' },
    time:   { name: 'time',        si: 'second',       sym: 's',  lab: 's',         kid: 'time (how long it takes)' },
    temp:   { name: 'temperature', si: 'kelvin',       sym: 'K',  lab: '°C',        kid: 'temperature (how hot or cold)' },
    area:    { name: 'area',    si: 'square metre',              sym: 'm²',    lab: 'cm²',   kid: 'area (a flat surface)' },
    force:   { name: 'weight',  si: 'newton',                    sym: 'N',     lab: 'N',     kid: 'weight (a force)' },
    density: { name: 'density', si: 'kilogram per cubic metre',  sym: 'kg/m³', lab: 'g/cm³', kid: 'density (the mass in each cm³)' },
  };
  // Water's density, the line between floating and sinking in water.
  const WATER = 1.0;

  // kind      which drawing and which reading rule
  // unit/step what the pupil types, and the smallest step the scale can read
  // zero      zero error IN THE TYPED UNIT (cm for a caliper, g for the balance)
  const INSTRUMENTS = {
    rule:         { kind: 'rule',       name: 'Metre rule',              short: 'Metre rule',   icon: '📏', group: 'length', quantity: 'length', unit: 'cm', step: 0.1,  dp: 1, maxMm: 1000,
                    prec: '0.1 cm (1 mm)', meta: 'Reads to 1 mm · one end is worn',
                    how: 'Line the object up with a clear mark, read the mark nearest its far end, then subtract the starting mark.' },
    vernier:      { kind: 'vernier',    name: 'Vernier caliper',         short: 'Vernier',      icon: '🔧', group: 'length', quantity: 'length', unit: 'cm', step: 0.01, dp: 2, maxMm: 150, zero: 0,
                    prec: '0.01 cm (0.1 mm)', meta: 'Reads to 0.1 mm',
                    how: 'Main scale: the mark just BEFORE the vernier zero. Vernier: the division that lines up best with a main-scale mark, × 0.01 cm. Add them.' },
    vernier_old:  { kind: 'vernier',    name: 'Old vernier caliper A',   short: 'Old caliper A', icon: '🔧', group: 'length', quantity: 'length', unit: 'cm', step: 0.01, dp: 2, maxMm: 150, zero: 0.03, worn: true,
                    prec: '0.01 cm (0.1 mm)', meta: 'A worn jaw - check its zero first',
                    how: 'Close the jaws first and read the zero error. Then true reading = scale reading − zero error.' },
    vernier_bent: { kind: 'vernier',    name: 'Old vernier caliper B',   short: 'Old caliper B', icon: '🔧', group: 'length', quantity: 'length', unit: 'cm', step: 0.01, dp: 2, maxMm: 150, zero: -0.02, worn: true,
                    prec: '0.01 cm (0.1 mm)', meta: 'A bent jaw - check its zero first',
                    how: 'Close the jaws first. If the vernier zero sits LEFT of the main-scale zero, the zero error is negative.' },
    micrometer:   { kind: 'micrometer', name: 'Micrometer screw gauge',  short: 'Micrometer',   icon: '🗜️', group: 'length', quantity: 'length', unit: 'mm', step: 0.01, dp: 2, maxMm: 25, zero: 0,
                    prec: '0.01 mm', meta: 'Reads to 0.01 mm · opens to 25 mm',
                    how: 'Sleeve: the last mark showing (a mark below the line adds 0.5 mm). Thimble: the division on the line, × 0.01 mm. Add them.' },
    cylinder:     { kind: 'cylinder',   name: 'Measuring cylinder',      short: 'Cylinder',     icon: '🧪', group: 'other', quantity: 'volume', unit: 'cm³', step: 1, dp: 0, max: 100,
                    prec: '1 cm³', meta: '100 cm³ · 1 cm³ divisions',
                    how: 'Eye level with the liquid. Read the BOTTOM of the meniscus.' },
    stopwatch:    { kind: 'stopwatch',  name: 'Stopwatch',               short: 'Stopwatch',    icon: '⏱️', group: 'other', quantity: 'time', unit: 's', step: 1, dp: 0,
                    prec: '1 s on this dial', meta: 'Minute dial + second hand',
                    how: 'Minutes from the small dial, seconds from the big hand. Time in seconds = minutes × 60 + seconds.' },
    thermometer:  { kind: 'thermometer', name: 'Laboratory thermometer', short: 'Thermometer',  icon: '🌡️', group: 'other', quantity: 'temp', unit: '°C', step: 1, dp: 0, min: -10, max: 110,
                    prec: '1 °C · range −10 to 110 °C', meta: '−10 °C to 110 °C',
                    how: 'Read the mark level with the top of the red thread, with your eye level with it.' },
    clinical:     { kind: 'thermometer', name: 'Clinical thermometer',   short: 'Clinical',     icon: '🌡️', group: 'other', quantity: 'temp', unit: '°C', step: 0.1, dp: 1, min: 35, max: 42,
                    prec: '0.1 °C · range 35 to 42 °C', meta: 'Glass · 35 °C to 42 °C only',
                    how: 'Each small mark is 0.1 °C. Count the small marks past the last whole degree.' },
    balance:      { kind: 'balance',    name: 'Electronic balance',      short: 'Balance',      icon: '⚖️', group: 'other', quantity: 'mass', unit: 'g', step: 0.1, dp: 1, max: 200, zero: 0.4,
                    prec: '0.1 g', meta: 'Reads to 0.1 g · check the empty reading',
                    how: 'Check the empty reading first. Press Zero (tare) so it reads 0.0 g, then put the object on.' },

    // ── Grade 4 ── one shelf (group g4). Every scale here is read to a whole
    // mark, and each one counts in a different step: 1 cm, 50 ml, 2 °C, 20 g.
    // endMm: where the physical end of a ruler sits. The 30 cm ruler has a
    // 1 cm gap before its 0 mark; a tape measure's hook IS its 0.
    ruler30:      { kind: 'rule',       grades: [4], group: 'g4', name: 'Ruler (30 cm)',   short: 'Ruler',       icon: '📏', quantity: 'length', unit: 'cm', step: 1, dp: 0, maxMm: 300, endMm: -10,
                    prec: 'each mark is 1 cm', meta: 'Up to 30 cm · a gap before 0', hello: 'Look where the 0 mark is. It is not at the very end!',
                    how: 'Put one end of the object on the 0 mark. Read the mark at the other end.' },
    tape:         { kind: 'rule',       grades: [4], group: 'g4', name: 'Tape measure',    short: 'Tape',        icon: '➰', quantity: 'length', unit: 'cm', step: 1, dp: 0, maxMm: 5000, endMm: 0,
                    prec: 'each mark is 1 cm', meta: 'Up to 5 m · for long things', hello: 'A tape is long and bends. Use it for long things.',
                    how: 'Hook the end on one side. Pull the tape straight. Read the mark at the other side.' },
    jug:          { kind: 'cylinder',   grades: [4], group: 'g4', name: 'Measuring jug',   short: 'Jug',         icon: '🫗', quantity: 'volume', unit: 'ml', step: 50, dp: 0, max: 1000, mark: 50, num: 100, meniscus: 0, wide: true,
                    zoomPx: [0.44, 0.88], parallax: { radiusCm: 5, eyeRiseCm: 8, eyeDistCm: 30 },
                    prec: 'each mark is 50 ml', meta: '1 litre (1000 ml) · a mark every 50 ml', hello: 'Keep it on the table. Bring your eye down to the liquid.',
                    how: 'Keep the jug on a flat table. Bend down so your eye is level with the liquid. Read the mark.' },
    thermo4:      { kind: 'thermometer', grades: [4], group: 'g4', name: 'Thermometer',    short: 'Thermometer', icon: '🌡️', quantity: 'temp', unit: '°C', step: 2, dp: 0, min: -10, max: 110, num: 10, stir: true,
                    prec: 'each mark is 2 °C', meta: '−10 °C to 110 °C · a mark every 2 °C', hello: 'Not every mark has a number. Count on in 2s.',
                    how: 'Keep the bulb in the water. Read the mark at the top of the red line, with your eye level.' },
    scale4:       { kind: 'dial',       grades: [4], group: 'g4', name: 'Kitchen scale',   short: 'Scale',       icon: '⚖️', quantity: 'mass', unit: 'g', step: 20, dp: 0, max: 1000, num: 100, zero: 40,
                    prec: 'each mark is 20 g', meta: 'Up to 1 kg (1000 g) · check the pointer', hello: 'Look at the pointer. Is it on 0 before you weigh?',
                    how: 'Before you weigh, turn the knob so the pointer is on 0. Then read where the pointer stops.' },
    watch4:       { kind: 'stopwatch',  grades: [4], group: 'g4', name: 'Stopwatch',       short: 'Stopwatch',   icon: '⏱️', quantity: 'time', unit: 's', step: 1, dp: 0,
                    prec: 'each mark is 1 s', meta: 'Counts seconds', hello: 'Press Start. It stops by itself.',
                    how: 'Press Start. It stops by itself. Read where the red hand points.' },

    // ── Grades 7 and 8 ── one shelf (group g78). The cylinder and balance are
    // shared; the block ruler is Grade 7's, the density bench Grade 8's.
    cyl78:        { kind: 'cylinder',   grades: [7, 8], group: 'g78', name: 'Measuring cylinder', short: 'Cylinder', icon: '🧪', quantity: 'volume', unit: 'cm³', step: 1, dp: 0, max: 100,
                    prec: '1 cm³ (100 cm³ cylinder)', meta: '100 cm³ · a mark every 1 cm³', hello: 'Keep it on the bench. Read the bottom of the meniscus.',
                    how: 'Leave it on the bench. Bend down so your eye is level with the liquid. Read the bottom of the curved surface (the meniscus).' },
    block7:       { kind: 'block',      grades: [7], group: 'g78', name: 'Ruler and block',    short: 'Block',    icon: '🧱', quantity: 'volume', unit: 'cm³', step: 1, dp: 0,
                    prec: 'sides to 1 cm', meta: 'Volume of a regular block', hello: 'Measure each side. Then multiply all three.',
                    how: 'Measure the length, the width and the height. Volume = length × width × height, in cm³.' },
    bal78:        { kind: 'balance',    grades: [7, 8], group: 'g78', name: 'Electronic balance', short: 'Balance',  icon: '⚖️', quantity: 'mass', unit: 'g', step: 0.1, dp: 1, max: 500, zero: 2.4,
                    prec: '0.1 g', meta: 'Reads to 0.1 g · check the empty pan', hello: 'Look at the empty pan first. Does it read 0.0 g?',
                    how: 'With the pan empty, press Zero (tare) so it reads 0.0 g. Then put the object on and read the mass.' },
    dens8:        { kind: 'density',    grades: [8], group: 'g78', name: 'Density bench',      short: 'Density',  icon: '🧮', quantity: 'density', unit: 'g/cm³', step: 0.01, dp: 2,
                    prec: '0.01 g/cm³', meta: 'Mass ÷ volume · then float or sink?', hello: 'Find the mass and the volume. Then divide.',
                    how: 'Density = mass ÷ volume. Take the mass from the balance and the volume from the block\'s sides or the cylinder. Give the answer in g/cm³.' },
  };

  // What there is to measure. One value per quantity it can be measured for.
  // `for` limits a specimen to the instruments listed (the "nothing" setting).
  const SPECIMENS = {
    coin:     { icon: '🪙', name: 'Coin',          length: 23.72, mass: 7.9,  label: { length: 'the diameter of a coin', mass: 'the mass of a coin' }, color: '#C9A227' },
    marble:   { icon: '🔵', name: 'Glass marble',  length: 15.81, mass: 5.2,  label: { length: 'the diameter of a glass marble', mass: 'the mass of a glass marble' }, color: '#6FB7D8' },
    rod:      { icon: '🔩', name: 'Metal rod',     length: 12.18,             label: { length: 'the diameter of a metal rod' }, color: '#9AA5AE' },
    pencil:   { icon: '✏️', name: 'Pencil',        length: 163.2,             label: { length: 'the length of a pencil' }, color: '#F2C230' },
    wire:     { icon: '〰️', name: 'Copper wire',   length: 0.92,              label: { length: 'the diameter of a copper wire' }, color: '#C0693A' },
    paper:    { icon: '📄', name: 'Sheet of paper', length: 0.11,             label: { length: 'the thickness of a sheet of paper' }, color: '#F4F4EE' },
    closed:   { grades: [7, 8, 9], icon: '🤏', name: 'Nothing', length: 0, mass: 0, for: ['vernier', 'vernier_old', 'vernier_bent', 'micrometer', 'balance', 'bal78'],
                label: { length: 'nothing - the jaws closed', mass: 'nothing - the empty pan' }, color: '#FFFFFF' },
    water:    { icon: '💧', name: 'Water',         volume: 64,                label: { volume: 'the volume of water in the cylinder' }, color: '#AFD5EA' },
    stone:    { icon: '🪨', name: 'Stone',         volume: 13, mass: 38.6, before: 50,
                label: { volume: 'the volume of a stone (by displacement)', mass: 'the mass of a stone' }, color: '#7D7A73' },
    pendulum: { icon: '🕰️', name: 'Pendulum',      time: 16, swings: 10, speed: 2, label: { time: 'the time for 10 swings of a pendulum' } },
    kettle:   { icon: '♨️', name: 'Water heating', time: 200, speed: 25,      label: { time: 'the time for water on a hot plate to boil' } },
    ice:      { icon: '🧊', name: 'Melting ice',   temp: 0,                   label: { temp: 'the temperature of melting ice' } },
    tap:      { icon: '🚰', name: 'Tap water',     temp: 27,                  label: { temp: 'the temperature of tap water' } },
    hot:      { icon: '🍵', name: 'Hot water',     temp: 64,                  label: { temp: 'the temperature of hot water' } },
    boiling:  { icon: '♨️', name: 'Boiling water', temp: 100,                 label: { temp: 'the temperature of boiling water' } },
    body:     { icon: '🙂', name: 'Your body',     temp: 36.8,                label: { temp: 'your body temperature (under the arm)' } },

    // ── Grade 4 ── whole marks only: lengths in whole cm, liquids on a 50 ml
    // mark, temperatures on a 2 °C mark, masses on a 20 g mark.
    pencil4:  { grades: [4], icon: '✏️', name: 'Pencil',       length: 140, shape: 'pencil', label: { length: 'the length of a pencil' }, color: '#F2C230' },
    leaf4:    { grades: [4], icon: '🍃', name: 'Leaf',         length: 90,   label: { length: 'the length of a leaf' }, color: '#5FA04E' },
    book4:    { grades: [4], icon: '📘', name: 'Book',         length: 210,  label: { length: 'the width of a book' }, color: '#3E7CC0' },
    door4:    { grades: [4], icon: '🚪', name: 'Door',         length: 900,  label: { length: 'the width of the classroom door' }, color: '#9C6B3E' },
    desk4:    { grades: [4], icon: '🪑', name: 'Desk',         length: 1200, label: { length: 'the length of a desk' }, color: '#B98B55' },
    juice4:   { grades: [4], icon: '🧃', name: 'Orange juice', volume: 350,  label: { volume: 'the orange juice in the jug' }, color: '#F4A640', liquid: 'rgba(244,166,64,0.6)' },
    water4:   { grades: [4], icon: '💧', name: 'Water',        volume: 800,  label: { volume: 'the water in the jug' }, color: '#AFD5EA' },
    ice4:     { grades: [4], icon: '🧊', name: 'Ice and water', temp: 0,  look: 'ice', label: { temp: 'the temperature of ice and water' } },
    tap4:     { grades: [4], icon: '🚰', name: 'Tap water',    temp: 28,     look: 'tap', label: { temp: 'the temperature of tap water' } },
    hot4:     { grades: [4], icon: '🧑‍🏫', name: 'Hot water (an adult pours)', temp: 64, look: 'hot', label: { temp: 'the temperature of hot water' } },
    kettle4:  { grades: [4], icon: '♨️', name: 'Pour kettle water yourself', temp: 90, look: 'hot', hazard: 'hot_water', label: { temp: 'hot water from the kettle' } },
    mango4:   { grades: [4], icon: '🥭', name: 'Mango',        mass: 340,    label: { mass: 'the mass of a mango' }, color: '#F2A93B' },
    potato4:  { grades: [4], icon: '🥔', name: 'Potatoes',     mass: 760,    label: { mass: 'the mass of some potatoes' }, color: '#C49A5A' },
    // Timed again and again: the third try was stopped late (8 s, not 5 s).
    ball4:    { grades: [4], icon: '⚽', name: 'Ball down a slope', time: 5, trials: [5, 5, 8, 5], speed: 1, look: 'ball', label: { time: 'the time for a ball to roll down a slope' } },

    // ── Grades 7 and 8 ── `for` keeps each thing on its own instrument, since
    // the cylinder and the block ruler both measure volume.
    // The stone is ONE stone: 45.0 g, 18 cm³ by displacement, so 2.5 g/cm³ on
    // the density bench (stone8).
    water78:  { grades: [7, 8], for: ['cyl78'], icon: '💧', name: 'Water', volume: 46, label: { volume: 'the water in the cylinder' }, color: '#AFD5EA' },
    stone78:  { grades: [7, 8], for: ['cyl78', 'bal78'], icon: '🪨', name: 'Stone', volume: 18, before: 50, mass: 45, shape: 'stone',
                label: { volume: 'the volume of a stone (by displacement)', mass: 'the mass of the stone' }, color: '#7D7A73' },
    // An air bubble of 1 cm³ clings to the rough stone until the glass is tapped.
    bubble78: { grades: [7, 8], for: ['cyl78'], icon: '🫧', name: 'Rough stone', volume: 23, before: 40, bubble: 1, shape: 'stone',
                label: { volume: 'the volume of a rough stone (by displacement)' }, color: '#8C7B66' },
    drop78:   { grades: [7, 8], for: ['cyl78'], icon: '🔩', name: 'Steel block - drop it in', volume: 10, before: 50, shape: 'block', hazard: 'cyl_crack',
                label: { volume: 'a steel block dropped into the cylinder' }, color: '#8E969C' },
    big78:    { grades: [7, 8], for: ['cyl78'], icon: '🗿', name: 'Big stone', volume: 45, before: 70, shape: 'stone', hazard: 'spill',
                label: { volume: 'a big stone in 70 cm³ of water' }, color: '#6E6A62' },
    box7:     { grades: [7], for: ['block7'], icon: '🧱', name: 'Wooden block', dims: [5, 3, 2], volume: 30, label: { volume: 'the volume of a wooden block' }, color: '#C49A5A' },
    soap7:    { grades: [7], for: ['block7'], icon: '🧼', name: 'Bar of soap', dims: [8, 5, 3], volume: 120, label: { volume: 'the volume of a bar of soap' }, color: '#9FD3C7' },
    sugar7:   { grades: [7], for: ['bal78'], icon: '🍬', name: 'Bag of sugar', mass: 250, label: { mass: 'the mass of a bag of sugar' }, color: '#F4F4EE' },
    // Grade 8: what the density bench shows. `density` is the true value and
    // the data test checks it is mass ÷ volume. rho: a block's sides (dims),
    // a displacement (before/after, cm³), or a liquid weighed in a cylinder
    // (empty/full, g) of volume V.
    alu8:     { grades: [8], icon: '⬜', name: 'Aluminium block', density: 2.7, rho: { m: 108, dims: [5, 4, 2] }, label: { density: 'the density of aluminium' }, color: '#C8CDD2' },
    steel8:   { grades: [8], icon: '🔩', name: 'Steel block', density: 7.9, rho: { m: 79, dims: [2.5, 2, 2] }, label: { density: 'the density of steel' }, color: '#8E969C' },
    copper8:  { grades: [8], icon: '🟧', name: 'Copper lump', density: 8.9, rho: { m: 89, before: 50, after: 60 }, label: { density: 'the density of copper' }, color: '#C0693A' },
    stone8:   { grades: [8], icon: '🪨', name: 'Stone', density: 2.5, rho: { m: 45, before: 50, after: 68 }, label: { density: 'the density of the stone' }, color: '#7D7A73' },
    cork8:    { grades: [8], icon: '🍾', name: 'Cork block', density: 0.24, rho: { m: 24, dims: [5, 5, 4] }, label: { density: 'the density of cork' }, color: '#C9A06A' },
    wood8:    { grades: [8], icon: '🪵', name: 'Wooden block', density: 0.6, rho: { m: 120, dims: [10, 5, 4] }, label: { density: 'the density of wood' }, color: '#B98B55' },
    ice8:     { grades: [8], icon: '🧊', name: 'Ice block', density: 0.92, rho: { m: 46, dims: [5, 5, 2] }, label: { density: 'the density of ice' }, color: '#DCEFF7' },
    oil8:     { grades: [8], icon: '🫒', name: 'Cooking oil', density: 0.92, rho: { empty: 80, full: 126, V: 50, liquid: true }, label: { density: 'the density of cooking oil' }, color: '#E8C547' },
  };

  // The metre rule's end is worn: the 0 and 1 mm marks have gone and the
  // physical end sits at the 2 mm mark. A pupil who butts an object against
  // that end and reads the far end straight off gets a length 0.2 cm too long.
  const RULE = { wornMm: 2, markMm: 10 };

  // Water curves UP at the glass: the edge of the meniscus sits this far above
  // the bottom of the curve on a 100 cm³ cylinder.
  const MENISCUS = 1;

  // Parallax on the measuring cylinder, from its geometry. The meniscus is at
  // the centre of the cylinder; the scale is on the front of the glass, one
  // internal radius (1.4 cm) nearer the eye. An eye 8 cm above the level and
  // 30 cm away sees the level against a mark 1.4 × 8/30 = 0.37 cm higher.
  // 100 cm³ over 17 cm of height is 0.17 cm per cm³, so the error is ≈ 2 cm³:
  // too HIGH from above, too LOW from below.
  const PARALLAX = { radiusCm: 1.4, eyeRiseCm: 8, eyeDistCm: 30, cmPerCm3: 0.17 };
  // The Grade 4 jug is 5 cm across the inside radius, so 1 ml is 1/(π × 5²) =
  // 0.0127 cm of height. Its scale is 5 cm in front of the liquid's centre, so
  // an eye 8 cm high and 30 cm away sees it 5 × 8/30 = 1.33 cm off: 105 ml,
  // which is 100 ml to the nearest 50 ml mark - two marks too high or low.
  const jugCmPerMl = r => 1 / (Math.PI * r * r);
  function parallaxShift(eye, instId) {
    if (eye !== 'above' && eye !== 'below') return 0;
    const I = INSTRUMENTS[instId || 'cylinder'];
    const P = I.parallax || PARALLAX;
    const perUnit = I.parallax ? jugCmPerMl(P.radiusCm) : PARALLAX.cmPerCm3;
    const step = I.step || 1;
    const n = Math.round((P.radiusCm * P.eyeRiseCm / P.eyeDistCm) / perUnit / step) * step;
    return eye === 'above' ? n : -n;
  }

  // A reading is "too coarse" when one division is more than a tenth of it.
  const COARSE = 0.1;

  // ── Number helpers ─────────────────────────────
  const round = (x, step) => Math.round(x / step) * step;
  const clean = x => parseFloat(Number(x).toFixed(6));
  const fmt = (x, dp) => {
    const s = clean(x).toFixed(dp);
    return s.charAt(0) === '-' ? '−' + s.slice(1) : s;
  };
  // "2.36", "2,36", "−0.02", "2.36 cm" all read as numbers; anything else is null.
  function parseReading(s) {
    const t = String(s == null ? '' : s).trim().replace(/−/g, '-').replace(',', '.');
    const m = /^[-+]?(\d+\.?\d*|\.\d+)/.exec(t);
    return m ? parseFloat(m[0]) : null;
  }

  // ── Reading the scales ─────────────────────────
  // A vernier: 10 divisions span 9 mm, so vernier division k sits at R + 0.9k.
  // It meets a main-scale mark when R + 0.9k is a whole number of mm, which
  // happens for k = the tenths digit of R. `main` is the mark just BEFORE the
  // vernier zero - for a negative zero error that is the −1 mm mark.
  function vernierParts(mm) {
    const t = Math.round(mm * 10);            // tenths of a mm
    const main = Math.floor(t / 10);          // mm
    const div = t - main * 10;                // 0..9
    return { mainMm: main, mainCm: clean(main / 10), div, cm: clean(t / 100) };
  }
  // A micrometer: the sleeve has mm marks above the line and half-mm marks
  // below; one turn of the 50-division thimble moves the spindle 0.5 mm, so a
  // division is 0.01 mm.
  function micrometerParts(mm) {
    const h = Math.round(mm * 100);           // hundredths of a mm
    const sleeveH = Math.floor(h / 50) * 50;
    return { sleeve: clean(sleeveH / 100), thimble: h - sleeveH, mm: clean(h / 100), half: (sleeveH % 100) === 50 };
  }
  function stopwatchParts(s) {
    return { min: Math.floor(s / 60), sec: s % 60 };
  }

  // ── SI units and conversions ───────────────────
  // kid: the Grade 4 notebook shows only what Grade 4 maths converts (mm, cm
  // and m; ml and l; g and kg), and nothing when there is nothing to add.
  function convert(q, v, unit, kid) {
    const n = x => String(clean(x));
    // Grades 7-8 (kid = 7 or 8): cm³ ↔ ml, g ↔ kg; g/cm³ → kg/m³ (beyond the
    // Grade 8 questions, which use g/cm³ only).
    if (kid === 7 || kid === 8) {
      if (q === 'volume' && unit === 'cm³') return `= ${n(v)} ml`;
      if (q === 'mass' && unit === 'g') return `= ${n(v / 1000)} kg`;
      if (q === 'density' && unit === 'g/cm³') return `= ${n(v * 1000)} kg/m³`;
      return '';
    }
    if (kid) {
      if (q === 'length' && unit === 'cm') return v >= 100 ? `= ${Math.floor(v / 100)} m ${n(v % 100)} cm` : `= ${n(v * 10)} mm`;
      if (q === 'volume' && unit === 'ml' && v >= 1000) return `= ${Math.floor(v / 1000)} l ${n(v % 1000)} ml`;
      if (q === 'mass' && unit === 'g' && v >= 1000) return `= ${Math.floor(v / 1000)} kg ${n(v % 1000)} g`;
      return '';
    }
    if (q === 'length') {
      const mm = unit === 'cm' ? v * 10 : v;
      return unit === 'cm' ? `= ${n(mm)} mm = ${n(mm / 1000)} m` : `= ${n(mm / 10)} cm = ${n(mm / 1000)} m`;
    }
    if (q === 'volume') return `= ${n(v)} ml = ${n(v / 1000)} dm³`;
    if (q === 'mass') return `= ${n(v / 1000)} kg`;
    if (q === 'time') { const p = stopwatchParts(v); return p.min ? `= ${p.min} min ${p.sec} s` : `= ${n(v)} s`; }
    if (q === 'temp') return `= ${n(v + 273)} K`;
    return '';
  }
  // T/K = θ/°C + 273 (the school value; 273.15 exactly).
  const toKelvin = c => c + 273;

  // ── What an instrument shows for a specimen ────
  // opts: { align: 'end'|'mark', eye: 'level'|'above'|'below', tared, timed }
  // Returns the true value the pupil should type (`want`), the scale position
  // the bench draws (`scale`), and `mistakes`: for each named mistake, the
  // values a pupil who made it would type.
  // g (optional): only what that grade sees - a shared Grade 7/8 instrument
  // lists each grade's own things.
  function specimensFor(instId, g) {
    const I = INSTRUMENTS[instId];
    if (!I) return [];
    const gi = I.grades || [9];
    return Object.keys(SPECIMENS).filter(id => {
      const S = SPECIMENS[id];
      if (S[I.quantity] == null) return false;
      if (!(S.grades || [9]).some(x => gi.includes(x))) return false;
      if (g != null && !(S.grades || [9]).includes(g)) return false;
      return !S.for || S.for.includes(instId);
    });
  }

  function measure(instId, specId, o) {
    o = o || {};
    const I = INSTRUMENTS[instId], S = SPECIMENS[specId];
    if (!I) return { ok: false, why: 'none', msg: 'Pick an instrument from the shelf first.' };
    if (!S) return { ok: false, why: 'nospec', msg: `Now pick something to measure with the ${I.name.toLowerCase()}.` };
    const q = I.quantity, val = q === 'time' && S.trials ? S.trials[(o.trial || 0) % S.trials.length] : S[q];
    if (val == null || (S.for && !S.for.includes(instId))) {
      return { ok: false, why: 'quantity', msg: `The ${I.name.toLowerCase()} measures ${QUANTITIES[q].name}. Pick something with a ${QUANTITIES[q].name} to measure.` };
    }
    // A thing that is a hazard (Grades 7-8: dropped in, or overflowing) stops
    // the experiment before anything is read.
    if (S.hazard && I.kind !== 'thermometer') return { ok: false, why: 'hazard', hazard: S.hazard, msg: 'Stop! That is not safe.' };
    const m = { ok: true, inst: instId, spec: specId, quantity: q, unit: I.unit, step: I.step, dp: I.dp, zero: 0,
                label: S.label[q], mistakes: {}, tooCoarse: false, work: '' };
    const f = x => fmt(x, I.dp);
    const U = ' ' + I.unit;
    const g78 = mid(I);

    if (I.kind === 'rule' && I.endMm != null) {
      if (val > I.maxMm) return { ok: false, why: 'range', msg: `The ${S.name.toLowerCase()} is longer than ${I.maxMm / 10} cm. Use the tape measure.` };
      const start = o.align === 'end' && I.endMm < 0 ? I.endMm : 0;
      const stepMm = I.step * 10, far = start + val, farMark = Math.round(far / stepMm) * stepMm;
      m.scale = far; m.start = start;
      m.read = clean(farMark / 10);
      m.want = clean((farMark - start) / 10);
      if (start < 0) {
        m.mistakes.end = [m.read];
        m.work = `This ruler has a gap before 0, so the ${S.name.toLowerCase()} started 1 cm before 0. It reaches ${f(m.read)} cm, so it is ${f(m.read)} + 1 = ${f(m.want)} cm long. Better: start at 0.`;
      } else m.work = `One end is on 0. The other end is on the ${f(m.read)} cm mark. So it is ${f(m.want)} cm long.`;
    } else if (I.kind === 'rule') {
      if (val > 300) return { ok: false, why: 'range', msg: 'That is too long to fit on this part of the bench.' };
      const start = o.align === 'end' ? RULE.wornMm : RULE.markMm;
      const far = start + val;
      const farMark = Math.round(far);
      m.scale = far; m.start = start;
      m.want = clean((farMark - start) / 10);
      m.read = clean(farMark / 10);
      if (o.align === 'end') {
        m.mistakes.end = [m.read];
        m.work = `The far end is nearest the ${f(m.read)} cm mark. But the worn end starts at 0.2 cm, not 0, so length = ${f(m.read)} − 0.2 = ${f(m.want)} cm. Better: start at the 1.0 cm mark.`;
      } else {
        m.mistakes.far = [m.read];
        m.work = `It starts at the 1.0 cm mark and its far end is nearest the ${f(m.read)} cm mark. Length = ${f(m.read)} − 1.0 = ${f(m.want)} cm.`;
      }
    } else if (I.kind === 'vernier' || I.kind === 'micrometer') {
      if (val > I.maxMm) {
        return { ok: false, why: 'range', msg: `The ${S.name.toLowerCase()} is too big: the ${I.name.toLowerCase()} opens only to ${I.maxMm >= 100 ? I.maxMm / 10 + ' cm' : I.maxMm + ' mm'}. Use the metre rule.` };
      }
      const zMm = (I.zero || 0) * 10;          // a caliper's zero error, in mm
      m.zero = I.zero || 0;
      m.scale = val + zMm;                     // where the vernier zero / thimble edge really is
      m.jaw = val;                             // where the moving jaw is
      if (I.kind === 'vernier') {
        const p = vernierParts(m.scale);
        m.parts = p;
        m.read = p.cm;
        const sum = `Main scale ${f(p.mainCm)} cm + vernier ${p.div} × 0.01 = ${f(p.cm)} cm`;
        if (specId === 'closed') {
          m.want = m.read;
          m.work = m.read === 0
            ? 'Jaws closed: the vernier zero lines up exactly with the main-scale zero. 0.00 cm - no zero error.'
            : m.read > 0
              ? `Jaws closed, but the vernier zero is just PAST the main-scale zero. ${sum}: a zero error of +${f(m.read)} cm.`
              : `Jaws closed, but the vernier zero is just LEFT of the main-scale zero, so the main scale reads −0.1 cm. Division ${p.div} lines up: −0.1 + ${f(p.div / 100)} = ${f(m.read)} cm - a negative zero error, −(10 − ${p.div}) × 0.01 cm.`;
        } else {
          m.want = clean(round(val, 0.1) / 10);
          if (m.zero) {
            m.mistakes.raw = [m.read];
            m.mistakes.sign = [clean(m.read + m.zero)];
            m.work = `${sum}. Zero error ${m.zero > 0 ? '+' : ''}${f(m.zero)} cm, so true = ${f(m.read)} − (${f(m.zero)}) = ${f(m.want)} cm.`;
          } else m.work = `${sum}. Reading = ${f(m.want)} cm.`;
        }
      } else {
        const p = micrometerParts(m.scale);
        m.parts = p;
        m.read = p.mm;
        m.want = specId === 'closed' ? p.mm : clean(round(val, 0.01));
        m.work = specId === 'closed'
          ? 'Jaws closed: the thimble zero is on the line and the sleeve shows 0. 0.00 mm - no zero error.'
          : `Sleeve: ${f(p.sleeve)} mm${p.half ? ' (a half-millimetre mark is showing below the line)' : ''}. Thimble: ${p.thimble} on the line → ${p.thimble} × 0.01 = ${f(p.thimble / 100)} mm. Reading = ${f(p.sleeve)} + ${f(p.thimble / 100)} = ${f(p.mm)} mm.`;
      }
    } else if (I.kind === 'cylinder') {
      // A clinging air bubble pushes the level up by its own volume until the
      // glass is tapped.
      const bub = S.bubble && !o.tapped ? S.bubble : 0;
      const level = (S.before != null ? S.before + val : val) + bub;
      const shift = parallaxShift(o.eye, instId);
      const men = I.meniscus != null ? I.meniscus : MENISCUS;
      const sub = v => (S.before != null ? [v, clean(v - S.before)] : [v]);
      m.scale = level; m.before = S.before != null ? S.before : null; m.level = level; m.bubble = bub;
      m.top = level + men; m.apparent = level + shift;
      m.want = val;
      if (men) m.mistakes.top = sub(level + men);
      if (shift) m.mistakes.apparent = sub(level + shift);
      if (bub) m.mistakes.bubble = [clean(val + bub)];
      if (S.before != null) {
        m.mistakes.level = [level];
        const nm = S.name.toLowerCase();
        m.work = !g78 ? `Before: ${S.before} cm³ of water. With the stone in, the bottom of the meniscus is on ${level}. Volume of the stone = ${level} − ${S.before} = ${val} cm³.`
          : bub ? `Before: ${S.before} cm³. With the ${nm} in, the level is ${level}, but ${bub} cm³ of that is an air bubble. Volume = ${level} − ${S.before} − ${bub} = ${val} cm³. Tap the glass first next time.`
          : `Before: ${S.before} cm³ of water. With the ${nm} in, the bottom of the meniscus is on ${level}. Volume = ${level} − ${S.before} = ${val} cm³.`;
      } else m.work = g78 ? `Your eye is level with the bottom of the meniscus. It is on the ${val} cm³ mark, so there is ${val} cm³ (= ${val} ml).`
        : I.grades ? `Your eye is level with the liquid. ${countOn(val, I)}`
        : `Eye level with the liquid: the bottom of the meniscus is on the ${val} mark, so the volume is ${val} cm³.`;
    } else if (I.kind === 'block') {
      // Grade 7: the volume of a regular block is calculated from its sides.
      const [l, w, h] = S.dims;
      m.dims = S.dims; m.scale = val;
      m.want = clean(l * w * h);
      m.mistakes.area = [clean(l * w)];
      m.mistakes.sum = [clean(l + w + h)];
      m.work = `Volume = length × width × height = ${l} × ${w} × ${h} = ${m.want} cm³.`;
    } else if (I.kind === 'density') {
      // Grade 8: density = mass ÷ volume, then float or sink in water.
      const R = S.rho;
      const mass = R.liquid ? clean(R.full - R.empty) : R.m;
      const V = R.dims ? clean(R.dims[0] * R.dims[1] * R.dims[2]) : R.liquid ? R.V : clean(R.after - R.before);
      const r2 = x => clean(round(x, I.step));
      m.want = r2(mass / V);
      m.info = { mass, V, dims: R.dims || null, before: R.before, after: R.after, empty: R.empty, full: R.full, liquid: !!R.liquid };
      m.floats = m.want < WATER; m.scale = m.want;
      m.mistakes.flip = [r2(V / mass)];
      if (R.after != null) m.mistakes.dlevel = [r2(mass / R.after)];
      if (R.liquid) m.mistakes.total = [r2(R.full / V)];
      const n = x => String(clean(x));
      const mS = R.liquid ? `Mass of ${S.name.toLowerCase()} = ${n(R.full)} − ${n(R.empty)} = ${n(mass)} g.` : `Mass = ${n(mass)} g.`;
      const vS = R.dims ? `Volume = ${R.dims.map(n).join(' × ')} = ${n(V)} cm³.` : R.liquid ? `Volume = ${n(V)} cm³.` : `Volume = ${n(R.after)} − ${n(R.before)} = ${n(V)} cm³.`;
      const fl = m.floats ? `That is less than water (${fmt(WATER, 2)} g/cm³), so it floats${R.liquid ? ' on top of water' : ''}.`
                          : `That is more than water (${fmt(WATER, 2)} g/cm³), so it sinks.`;
      m.work = `${mS} ${vS} Density = ${n(mass)} ÷ ${n(V)} = ${f(m.want)} g/cm³. ${fl}`;
    } else if (I.kind === 'stopwatch') {
      if (!o.timed) return { ok: false, why: 'untimed', msg: 'Start the stopwatch first: tap ▶️ Start timing.' };
      const p = stopwatchParts(val);
      m.parts = p; m.scale = val; m.want = val;
      const wrongUnits = [clean(p.min + p.sec / 100), p.min * 100 + p.sec].filter(x => x !== val);
      if (p.min) m.mistakes.units = wrongUnits;
      m.trial = o.trial || 0;
      if (I.grades) m.work = `The red hand points to ${val}. It took ${val} seconds.`;
      else m.work = `The minute hand has passed ${p.min}; the second hand is on ${p.sec}. Time = ${p.min} × 60 + ${p.sec} = ${val} s.`
        + (S.swings ? ` That is ${S.swings} swings, so one swing takes ${val} ÷ ${S.swings} = ${clean(val / S.swings)} s.` : '');
    } else if (I.kind === 'thermometer') {
      if (S.hazard) return { ok: false, why: 'hazard', hazard: S.hazard, msg: 'Stop! Ask an adult to pour hot water.' };
      if (val < I.min) return { ok: false, why: 'below', msg: `${S.name} is colder than ${I.min} °C, the bottom of this thermometer's range - the thread stays below the scale. Use the laboratory thermometer.` };
      if (val > I.max) return { ok: false, why: 'burst', msg: `${S.name} is hotter than ${I.max} °C, the top of this thermometer's range.` };
      m.scale = val; m.want = clean(round(val, I.step));
      m.work = I.grades ? `The red line stops here. ${countOn(m.want, I)}`
        : `The top of the thread is level with the ${f(m.want)} mark, so the temperature is ${f(m.want)} °C (= ${fmt(toKelvin(m.want), I.dp)} K).`;
    } else if (I.kind === 'dial') {
      // A kitchen scale whose pointer rests past 0 until its knob is turned.
      const zero = o.tared ? 0 : I.zero;
      m.zero = zero; m.read = clean(val + zero); m.scale = m.read; m.want = val;
      if (zero) {
        m.mistakes.raw = [m.read];
        m.work = `The pointer started at ${zero} g, not 0. So the ${S.name.toLowerCase()} is ${m.read} − ${zero} = ${val} g. Next time, set it to 0 first.`;
      } else m.work = `The pointer started on 0. ${countOn(val, I)}`;
    } else if (I.kind === 'balance') {
      const zero = o.tared ? 0 : I.zero;
      m.zero = zero;
      m.read = clean(val + zero);
      m.scale = m.read;
      m.want = specId === 'closed' ? m.read : val;
      if (specId === 'closed') {
        m.work = !zero ? 'Empty pan, 0.0 g: the balance has been zeroed.'
          : g78 ? `With nothing on the pan it reads ${f(zero)} g, not 0.0 g. Press Zero (tare), or take ${f(zero)} g off every reading.`
          : `With nothing on the pan it reads ${f(zero)} g: a zero error of +${f(zero)} g. Press Zero (tare) or subtract it from every reading.`;
      } else if (zero) {
        m.mistakes.raw = [m.read];
        m.mistakes.sign = [clean(m.read + zero)];
        m.work = `The display shows ${f(m.read)} g, but the empty balance read ${f(zero)} g. True mass = ${f(m.read)} − ${f(zero)} = ${f(val)} g.`;
      } else m.work = `The balance was zeroed first, so the display is the mass: ${f(val)} g${g78 ? ` (= ${String(clean(val / 1000))} kg)` : ''}.`;
    }
    if (q === 'length' && specId !== 'closed' && !I.grades) m.tooCoarse = m.want === 0 || I.step / m.want > COARSE + 1e-9;
    if (I.grades) m.wrongUnit = WRONG_UNIT[I.unit];
    m.wantS = f(m.want) + U;
    return m;
  }

  // Which mistake (if any) a typed value is. Checked in this order, so the
  // first match is the one explained.
  const MISTAKE_ORDER = ['apparent', 'top', 'raw', 'sign', 'end', 'far', 'level', 'units', 'bubble', 'area', 'sum', 'flip', 'dlevel', 'total'];
  // Grades 7-8: an instrument of that level (not the Grade 4 shelf).
  function mid(I) { return !!(I && I.grades) && !I.grades.includes(4); }
  function judge(m, v) {
    if (!m || !m.ok || v == null || !isFinite(v)) return { verdict: 'none' };
    const tol = m.step / 1000;
    const eq = (a, b) => Math.abs(a - b) < tol;
    if (eq(v, m.want)) return { verdict: 'ok' };
    for (const k of MISTAKE_ORDER) {
      if ((m.mistakes[k] || []).some(x => eq(v, x))) return { verdict: k };
    }
    if (Math.abs(v - m.want) <= m.step * 1.5 + tol) return { verdict: 'near' };
    return { verdict: 'wrong' };
  }

  // ── Grade 4: a reading is a number AND a unit ──
  // f: how many of the quantity's base unit (cm, ml, g, °C, s) one of it is.
  const UNITS = {
    mm: { q: 'length', f: 0.1, name: 'millimetres' }, cm: { q: 'length', f: 1, name: 'centimetres' }, m: { q: 'length', f: 100, name: 'metres' },
    ml: { q: 'volume', f: 1, name: 'millilitres' }, l: { q: 'volume', f: 1000, name: 'litres' },
    g: { q: 'mass', f: 1, name: 'grams' }, kg: { q: 'mass', f: 1000, name: 'kilograms' },
    '°C': { q: 'temp', f: 1, name: 'degrees Celsius' }, s: { q: 'time', f: 1, name: 'seconds' }, min: { q: 'time', f: 60, name: 'minutes' },
    'cm³': { q: 'volume', f: 1, name: 'cubic centimetres' }, 'cm²': { q: 'area', f: 1, name: 'square centimetres' },
    N: { q: 'force', f: 1, name: 'newtons' },
    // 1 kg/m³ = 1000 g ÷ 1 000 000 cm³ = 0.001 g/cm³.
    'g/cm³': { q: 'density', f: 1, name: 'grams per cubic centimetre' }, 'kg/m³': { q: 'density', f: 0.001, name: 'kilograms per cubic metre' },
  };
  const UNIT_CHOICES = ['mm', 'cm', 'm', 'ml', 'l', 'g', 'kg', '°C', 's', 'min'];
  const UNIT_CHOICES_BY_GRADE = {
    4: UNIT_CHOICES,
    7: ['cm', 'm', 'cm²', 'cm³', 'ml', 'l', 'g', 'kg', 'N'],
    8: ['cm³', 'ml', 'g', 'kg', 'N', 'g/cm³', 'kg/m³'],
  };
  // What the assistant says when a number has no unit.
  const UNIT_HINT = { 4: 'Now pick the unit too. Is it cm, ml, °C, g or s?', 7: 'Now pick the unit too. Is it cm³, g or kg?', 8: 'Now pick the unit too. Density is in g/cm³.' };
  // The unit a "right number, wrong unit" guide step writes down.
  const WRONG_UNIT = { cm: 'm', ml: 'l', g: 'kg', '°C': 'g', s: 'min', 'cm³': 'cm²', 'g/cm³': 'kg/m³' };
  // 0.14 m and 140 mm are the same length as 14 cm, so they are right. 14 m is
  // the right number with the wrong unit. A number that is wrong in every unit
  // is judged as a number first, so each card explains ONE thing.
  function judgeUnit(m, v, unit) {
    if (!m || !m.ok || v == null || !isFinite(v)) return { verdict: 'none' };
    const U = UNITS[unit], B = UNITS[m.unit];
    if (!U || !B) return { verdict: 'nounit' };
    if (U.q !== B.q) return { verdict: 'unit', sameQ: false };
    const j = judge(m, clean(v * U.f / B.f));
    if (unit === m.unit || j.verdict !== 'wrong') return j;
    return judge(m, v).verdict === 'ok' ? { verdict: 'unit', sameQ: true } : judge(m, v);
  }

  // "It is 4 marks above 20. Each mark is 2 °C: 20 + 8 = 28 °C." - how a
  // Grade 4 pupil reads a mark that has no number of its own.
  function countOn(v, I) {
    const u = ' ' + I.unit, num = I.num || I.step;
    if (Math.abs(v % num) < 1e-9) return `It is on the ${fmt(v, I.dp)}${u} mark.`;
    const base = Math.floor(v / num) * num, k = Math.round((v - base) / I.step);
    return `It is ${k} mark${k === 1 ? '' : 's'} above ${fmt(base, I.dp)}. Each mark is ${fmt(I.step, I.dp)}${u}: ${fmt(base, I.dp)} + ${fmt(k * I.step, I.dp)} = ${fmt(v, I.dp)}${u}.`;
  }

  // The odd one out in repeated readings: the value that disagrees when at
  // least two others agree. null while nothing is odd.
  function oddOne(vals) {
    const count = {};
    vals.forEach(v => { count[v] = (count[v] || 0) + 1; });
    const keys = Object.keys(count).map(Number).sort((a, b) => count[b] - count[a]);
    if (!keys.length || count[keys[0]] < 2) return null;
    const odd = vals.filter(v => v !== keys[0]);
    return odd.length ? { usual: keys[0], odd: odd[odd.length - 1] } : null;
  }

  // ── Discoveries ────────────────────────────────
  // `how` uses the guide vocabulary: inst:<id>, spec:<id>, zoom, eye:<pos>,
  // align:<end|mark>, tare, start (the stopwatch has stopped), read (a correct
  // reading), misread:<mistake> (a reading showing that mistake).
  // scripts/test-labs-measure.js follows every `how` in a real browser.
  const DISCOVERIES = [
    { id: 'cyl_read', icon: '🧪', title: 'The bottom of the meniscus', hint: 'Read a measuring cylinder correctly',
      how: ['inst:cylinder', 'spec:water', 'zoom', 'read'],
      saw: 'The water curved up where it touched the glass. You read the bottom of the curve, with your eye level with it.',
      eq: 'volume = the mark at the bottom of the meniscus (cm³)',
      learn: 'Water is attracted to glass, so it creeps up the sides and makes a curved surface - the meniscus. The bottom of the curve is the true level.' },
    { id: 'meniscus_top', icon: '🌊', title: 'Top of the meniscus', hint: 'A cylinder mistake - read the edge of the water',
      how: ['inst:cylinder', 'spec:water', 'zoom', 'misread:top'],
      saw: 'Reading the edges of the curve gave a volume one division too big.',
      eq: 'top of the curve = true level + 1 cm³ (on this cylinder)',
      learn: 'For water the edges of the meniscus are higher than the true level, so reading them makes the volume too big. Mercury curves the other way, so for mercury the top is read.' },
    { id: 'parallax_high', icon: '👁️', title: 'Parallax: eye too high', hint: 'Read a cylinder with your eye above the level',
      how: ['inst:cylinder', 'spec:water', 'eye:above', 'misread:apparent'],
      saw: 'From above, your line of sight crossed the scale above the true level: the reading was too high.',
      eq: 'eye above → reading too high',
      learn: 'The scale is on the front of the glass and the meniscus is in the middle, so a slanted line of sight meets the scale at the wrong mark. That is parallax error.' },
    { id: 'parallax_low', icon: '🙈', title: 'Parallax: eye too low', hint: 'Read a cylinder with your eye below the level',
      how: ['inst:cylinder', 'spec:water', 'eye:below', 'misread:apparent'],
      saw: 'From below, your line of sight crossed the scale below the true level: the reading was too low.',
      eq: 'eye below → reading too low',
      learn: 'Parallax works both ways. The cure is the same: eye level with the mark, looking at the scale at right angles.' },
    { id: 'displacement', icon: '🪨', title: 'Volume by displacement', hint: 'Find the volume of a stone with a cylinder',
      how: ['inst:cylinder', 'spec:stone', 'read'],
      saw: 'The stone pushed the water level up. The rise was the stone\'s volume.',
      eq: 'volume of stone = level with stone − level before',
      learn: 'A solid pushes aside (displaces) its own volume of water, so an odd-shaped solid can be measured with a measuring cylinder.' },
    { id: 'rule_read', icon: '📏', title: 'Reading a metre rule', hint: 'Measure a pencil from the 1 cm mark',
      how: ['inst:rule', 'spec:pencil', 'align:mark', 'zoom', 'read'],
      saw: 'You started at the 1.0 cm mark, read the far end and subtracted.',
      eq: 'length = far reading − start reading',
      learn: 'A metre rule reads to the nearest millimetre (0.1 cm). Starting at a clear mark and subtracting avoids the worn end.' },
    { id: 'end_error', icon: '🪵', title: 'The worn end', hint: 'A ruler mistake - start from its very end',
      how: ['inst:rule', 'spec:pencil', 'align:end', 'misread:end'],
      saw: 'The end of the ruler was worn, so the pencil really started at 0.2 cm and the length came out 0.2 cm too long.',
      eq: 'worn end: reading − true length = 0.2 cm',
      learn: 'A worn or damaged end is not at zero - that is zero (end) error. Measure from a clear mark such as 1.0 cm and subtract it.' },
    { id: 'vernier_read', icon: '🔧', title: 'Reading a vernier', hint: 'Measure a coin with the vernier caliper',
      how: ['inst:vernier', 'spec:coin', 'zoom', 'zoom', 'read'],
      saw: 'The main scale gave the millimetres; the vernier line that matched a main-scale mark gave the tenth of a millimetre.',
      eq: 'reading = main scale + (vernier division × 0.01 cm)',
      learn: 'Ten vernier divisions span 9 mm, so each is 0.1 mm shorter than a millimetre. Only one of them can line up with a main-scale mark - and which one tells you the next digit.' },
    { id: 'micrometer_read', icon: '🗜️', title: 'Reading a micrometer', hint: 'Measure a wire with the micrometer',
      how: ['inst:micrometer', 'spec:wire', 'zoom', 'read'],
      saw: 'The sleeve gave the whole and half millimetres; the thimble gave the hundredths.',
      eq: 'reading = sleeve + (thimble division × 0.01 mm)',
      learn: 'One full turn of the thimble moves the spindle 0.5 mm. The thimble has 50 divisions, so each is 0.5 ÷ 50 = 0.01 mm.' },
    { id: 'zero_pos', icon: '➕', title: 'A positive zero error', hint: 'Check the zero of old caliper A, then use it',
      how: ['inst:vernier_old', 'spec:closed', 'read', 'spec:rod', 'read'],
      saw: 'With the jaws closed, old caliper A read +0.03 cm. You took that off your reading.',
      eq: 'true reading = scale reading − zero error',
      learn: 'A worn jaw means the vernier zero sits past the main-scale zero even with nothing between the jaws. Every reading is 0.03 cm too big until you correct it.' },
    { id: 'zero_neg', icon: '➖', title: 'A negative zero error', hint: 'Check the zero of old caliper B, then use it',
      how: ['inst:vernier_bent', 'spec:closed', 'read', 'spec:rod', 'read'],
      saw: 'With the jaws closed, old caliper B read −0.02 cm: its vernier zero was to the LEFT of the main-scale zero.',
      eq: 'true reading = scale reading − (−0.02) = scale reading + 0.02',
      learn: 'A negative zero error makes every reading too small. Subtracting a negative number is the same as adding its size.' },
    { id: 'zero_raw', icon: '0️⃣', title: 'Zero error left in', hint: 'A caliper mistake - measure without checking its zero',
      how: ['inst:vernier_old', 'spec:rod', 'misread:raw'],
      saw: 'Straight off the scale of old caliper A, the rod read 0.03 cm too big.',
      eq: 'uncorrected reading = true value + zero error',
      learn: 'An instrument can be precise and still wrong: a zero error shifts every reading by the same amount. Check the zero before you measure.' },
    { id: 'too_coarse', icon: '🔬', title: 'Not precise enough', hint: 'Measure a thin wire with a metre rule',
      how: ['inst:rule', 'spec:wire', 'align:mark', 'read'],
      saw: 'The whole wire was about one millimetre division on the metre rule.',
      eq: 'choose an instrument whose smallest division is tiny compared with the object',
      learn: 'The smaller the smallest division, the more precise the instrument: metre rule 1 mm, vernier 0.1 mm, micrometer 0.01 mm.' },
    { id: 'balance_zero', icon: '⚖️', title: 'Zero the balance', hint: 'Weigh a stone the right way',
      how: ['inst:balance', 'tare', 'spec:stone', 'read'],
      saw: 'After you pressed Zero (tare), the empty balance read 0.0 g and then read the stone\'s mass directly.',
      eq: 'mass = reading − empty reading',
      learn: 'A balance that does not read 0.0 g when empty has a zero error. Taring removes it; otherwise subtract the empty reading.' },
    { id: 'stopwatch_read', icon: '⏱️', title: 'Minutes into seconds', hint: 'Time water heating to the boil',
      how: ['inst:stopwatch', 'spec:kettle', 'start', 'read'],
      saw: 'The small dial counted the minutes and the big hand the seconds.',
      eq: 'time in s = minutes × 60 + seconds',
      learn: 'The second (s) is the SI unit of time. A stopwatch dial shows minutes and seconds; convert to seconds before you calculate.' },
    { id: 'pendulum', icon: '🕰️', title: 'Time many swings', hint: 'Time 10 swings of a pendulum',
      how: ['inst:stopwatch', 'spec:pendulum', 'start', 'read'],
      saw: '10 swings took 16 s, so one swing takes 1.6 s.',
      eq: 'time for one swing = total time ÷ number of swings',
      learn: 'Your reaction time (about 0.2 s) adds an error every time you press the button. Timing 10 swings and dividing by 10 makes that error ten times smaller for each swing.' },
    { id: 'ice_point', icon: '🧊', title: 'Melting ice: 0 °C', hint: 'Put the thermometer in melting ice',
      how: ['inst:thermometer', 'spec:ice', 'zoom', 'read'],
      saw: 'In melting ice the thread stopped at 0 °C.',
      eq: '0 °C = 273 K',
      learn: 'Pure ice melts at 0 °C. In kelvin, the SI unit of temperature, that is 273 K (K = °C + 273).' },
    { id: 'boil_point', icon: '♨️', title: 'Boiling water: 100 °C', hint: 'Put the laboratory thermometer in boiling water',
      how: ['inst:thermometer', 'spec:boiling', 'zoom', 'read'],
      saw: 'In boiling water the thread stopped at 100 °C.',
      eq: '100 °C = 373 K',
      learn: 'Pure water boils at 100 °C at sea level - inside this thermometer\'s −10 °C to 110 °C range. On the central plateau of Mauritius it boils a little lower, because the air pressure is lower.' },
    { id: 'clinical', icon: '🩺', title: 'Precise but narrow', hint: 'Take a body temperature with the clinical thermometer',
      how: ['inst:clinical', 'spec:body', 'zoom', 'read'],
      saw: 'The clinical thermometer read to 0.1 °C, but only between 35 °C and 42 °C.',
      eq: 'precision 0.1 °C · range 35-42 °C',
      learn: 'A clinical thermometer has tiny divisions (0.1 °C) over a short range - just what a body temperature needs, and useless for anything hotter.' },

    // ── Grade 4 ──
    { id: 'g4_ruler_zero', grades: [4], icon: '📏', title: 'Start at 0', hint: 'Measure a pencil with the ruler',
      how: ['inst:ruler30', 'spec:pencil4', 'align:zero', 'read'],
      saw: 'You put one end of the pencil on the 0 mark. The other end was on 14 cm.',
      eq: 'start at 0 → length = the mark at the other end',
      learn: 'A ruler measures length in centimetres (cm). Start at the 0 mark, not at the end of the ruler.' },
    { id: 'g4_ruler_end', grades: [4], icon: '🪵', title: 'The gap before 0', hint: 'A ruler mistake - start at the very end of the ruler',
      how: ['inst:ruler30', 'spec:pencil4', 'align:end', 'misread:end'],
      saw: 'The pencil started at the end of the ruler, 1 cm before 0. So the reading was 1 cm too short.',
      eq: 'start at the end → the reading is too short',
      learn: 'Many rulers have a gap before the 0 mark. Always line the object up with 0.' },
    { id: 'g4_tape', grades: [4], icon: '➰', title: 'A tape for long things', hint: 'Measure the classroom door',
      how: ['inst:tape', 'spec:door4', 'read'],
      saw: 'The door is 90 cm wide. That is three times as long as the 30 cm ruler.',
      eq: 'long things → tape measure · 100 cm = 1 m',
      learn: 'A tape measure is long and it bends. A short ruler would have to be moved again and again.' },
    { id: 'g4_jug_read', grades: [4], icon: '🫗', title: 'Eye level with the liquid', hint: 'Read the juice in the measuring jug',
      how: ['inst:jug', 'spec:juice4', 'zoom', 'read'],
      saw: 'With your eye level with the juice, it was on the 350 ml mark.',
      eq: 'liquid in millilitres (ml) · 1000 ml = 1 litre (l)',
      learn: 'A measuring jug shows how much liquid there is. Keep it on a flat table and read it at eye level.' },
    { id: 'g4_jug_above', grades: [4], icon: '👁️', title: 'Looking from above', hint: 'Read the jug with your eye too high',
      how: ['inst:jug', 'spec:juice4', 'eye:above', 'misread:apparent'],
      saw: 'From above, the juice looked higher than it really was.',
      eq: 'eye too high → the reading is too big',
      learn: 'The marks are on the front of the jug. From above, your eye line meets a higher mark. Bend down!' },
    { id: 'g4_jug_below', grades: [4], icon: '🙈', title: 'Looking from below', hint: 'Read the jug with your eye too low',
      how: ['inst:jug', 'spec:water4', 'eye:below', 'misread:apparent'],
      saw: 'From below, the water looked lower than it really was.',
      eq: 'eye too low → the reading is too small',
      learn: 'Too high or too low both give a wrong reading. Only eye level is right.' },
    { id: 'g4_thermo_2s', grades: [4], icon: '🌡️', title: 'Counting in 2s', hint: 'Read the thermometer in tap water',
      how: ['inst:thermo4', 'spec:tap4', 'zoom', 'read'],
      saw: 'The red line stopped 4 marks above 20. Each mark is 2 °C, so it was 28 °C.',
      eq: 'temperature = last number + (marks × 2 °C)',
      learn: 'Not every mark has a number. Find what one mark is worth. Then count on from the last number.' },
    { id: 'g4_ice', grades: [4], icon: '🧊', title: 'Ice is 0 °C', hint: 'Put the thermometer in ice and water',
      how: ['inst:thermo4', 'spec:ice4', 'read'],
      saw: 'In ice and water, the red line stopped at 0 °C.',
      eq: 'ice melts at 0 °C · water boils at 100 °C',
      learn: 'Ice melts, and water freezes, at 0 °C. So ice and water is a good way to check a thermometer.' },
    { id: 'g4_hot_adult', grades: [4], icon: '🧑‍🏫', title: 'Hot water - with an adult', hint: 'Measure hot water the safe way',
      how: ['inst:thermo4', 'spec:hot4', 'zoom', 'read'],
      saw: 'An adult poured the hot water. The thermometer read 64 °C.',
      eq: 'hot water: an adult pours, you read',
      learn: 'The red liquid gets bigger (expands) when it warms up, so it climbs the tube. Hot water can burn, so an adult pours it.' },
    { id: 'g4_scale_zero', grades: [4], icon: '⚖️', title: 'Set the scale to 0', hint: 'Weigh a mango the right way',
      how: ['inst:scale4', 'tare', 'spec:mango4', 'read'],
      saw: 'You turned the knob so the pointer was on 0. Then the mango read 340 g.',
      eq: 'pointer on 0 first, then weigh · 1000 g = 1 kg',
      learn: 'A kitchen scale measures mass in grams (g). It must start at 0, or every reading is wrong.' },
    { id: 'g4_scale_raw', grades: [4], icon: '0️⃣', title: 'Not set to 0', hint: 'A scale mistake - weigh without checking the pointer',
      how: ['inst:scale4', 'spec:mango4', 'misread:raw'],
      saw: 'The pointer started at 40 g. So the mango looked 40 g too heavy.',
      eq: 'pointer not on 0 → every reading is too big',
      learn: 'Look at the pointer BEFORE you put anything on. If it is not on 0, turn the knob.' },
    { id: 'g4_unit', grades: [4], icon: '🔤', title: 'Numbers need units', hint: 'Write a length with the wrong unit',
      how: ['inst:ruler30', 'spec:pencil4', 'align:zero', 'misread:unit'],
      saw: '14 m is not the same as 14 cm! 14 m is longer than a bus.',
      eq: 'cm or m for length · ml or l for liquid · g or kg for mass · °C · s',
      learn: 'A number on its own tells you nothing. The unit says what was measured and how big it is.' },
    { id: 'g4_repeat', grades: [4], icon: '🔁', title: 'Measure three times', hint: 'Time the ball three times',
      how: ['inst:watch4', 'spec:ball4', 'start', 'read', 'start', 'read', 'start', 'read'],
      saw: 'The ball took 5 s, 5 s, then 8 s. The 8 s was the odd one out.',
      eq: 'measure more than once · do an odd result again',
      learn: 'Anyone can press a button late. Measuring three times shows up a mistake. Then you do that one again.' },

    // ── Grade 7 ── volume, mass and units
    { id: 'g7_cyl_read', grades: [7], icon: '🧪', title: 'Read the meniscus', hint: 'Read the water in the measuring cylinder',
      how: ['inst:cyl78', 'spec:water78', 'zoom', 'read'],
      saw: 'The water curved up at the glass. You read the bottom of the curve: 46 cm³.',
      eq: 'volume = the mark at the bottom of the meniscus (cm³) · 1 cm³ = 1 ml',
      learn: 'Water clings to glass, so its surface curves. That curve is the meniscus. The true level is the bottom of the curve.' },
    { id: 'g7_top', grades: [7], icon: '🌊', title: 'Top of the meniscus', hint: 'A cylinder mistake - read the edge of the water',
      how: ['inst:cyl78', 'spec:water78', 'zoom', 'misread:top'],
      saw: 'Reading the edge of the curve gave 47 cm³: 1 cm³ too much.',
      eq: 'edge of the curve → the reading is too big',
      learn: 'The edges of the water creep up the glass. Only the bottom of the curve shows how much liquid there is.' },
    { id: 'g7_par_above', grades: [7], icon: '👁️', title: 'Parallax: eye too high', hint: 'Read the cylinder with your eye above the water',
      how: ['inst:cyl78', 'spec:water78', 'eye:above', 'misread:apparent'],
      saw: 'From above, your line of sight met the scale 2 cm³ too high.',
      eq: 'eye above → reading too high',
      learn: 'The scale is on the front of the glass and the water is behind it. Looking at a slant makes the level seem to move. This is parallax error.' },
    { id: 'g7_par_below', grades: [7], icon: '🙈', title: 'Parallax: eye too low', hint: 'Read the cylinder with your eye below the water',
      how: ['inst:cyl78', 'spec:water78', 'eye:below', 'misread:apparent'],
      saw: 'From below, the reading came out 2 cm³ too low.',
      eq: 'eye below → reading too low',
      learn: 'Too high or too low, both are wrong. Keep the cylinder on the bench and bend down until your eye is level.' },
    { id: 'g7_displace', grades: [7], icon: '🪨', title: 'Volume by displacement', hint: 'Find the volume of a stone',
      how: ['inst:cyl78', 'spec:stone78', 'read'],
      saw: 'The water rose from 50 cm³ to 68 cm³. The stone\'s volume is 68 − 50 = 18 cm³.',
      eq: 'volume of solid = final reading − first reading',
      learn: 'A solid that sinks pushes aside (displaces) its own volume of water. This works for any odd shape that sinks and does not soak up water.' },
    { id: 'g7_start', grades: [7], icon: '➖', title: 'Take away the first reading', hint: 'A displacement mistake - write down only the new level',
      how: ['inst:cyl78', 'spec:stone78', 'misread:level'],
      saw: '68 cm³ is the water AND the stone. Only 18 cm³ of it is the stone.',
      eq: 'stone = 68 − 50, not 68',
      learn: 'The water was there before the stone. Always subtract the first reading from the final one.' },
    { id: 'g7_bubble', grades: [7], icon: '🫧', title: 'The air bubble', hint: 'A displacement mistake - leave a bubble on the stone',
      how: ['inst:cyl78', 'spec:bubble78', 'misread:bubble'],
      saw: 'A bubble stuck to the rough stone. It pushed the water up 1 cm³ more, so the volume came out 24 cm³, not 23 cm³.',
      eq: 'a bubble on the solid → the volume is too big',
      learn: 'Air takes up space too. A bubble under the water adds its own volume to the solid\'s.' },
    { id: 'g7_bubble_free', grades: [7], icon: '👆', title: 'Tap the bubble free', hint: 'Free the bubble, then read the rough stone',
      how: ['inst:cyl78', 'spec:bubble78', 'tap', 'read'],
      saw: 'You tapped the glass. The bubble floated up and the level fell to 63 cm³. 63 − 40 = 23 cm³.',
      eq: 'no bubbles → the rise is the solid alone',
      learn: 'Tap the side of the cylinder, or lower the solid slowly, so no air stays stuck to it.' },
    { id: 'g7_block', grades: [7], icon: '🧱', title: 'Volume of a block', hint: 'Work out the volume of the wooden block',
      how: ['inst:block7', 'spec:box7', 'read'],
      saw: 'The block is 5 cm by 3 cm by 2 cm. Its volume is 5 × 3 × 2 = 30 cm³.',
      eq: 'volume = length × width × height',
      learn: 'A regular block does not need water. Measure its three sides and multiply. Its volume is in cubic centimetres (cm³).' },
    { id: 'g7_area', grades: [7], icon: '⬛', title: 'Area is not volume', hint: 'A block mistake - multiply only two sides',
      how: ['inst:block7', 'spec:box7', 'misread:area'],
      saw: '5 × 3 = 15 is the area of one face, in cm². It leaves out the height.',
      eq: 'area = l × w (cm²) · volume = l × w × h (cm³)',
      learn: 'Area covers a flat surface. Volume fills space, so it needs all three sides.' },
    { id: 'g7_balance', grades: [7], icon: '⚖️', title: 'Zero the balance', hint: 'Weigh the stone the right way',
      how: ['inst:bal78', 'tare', 'spec:stone78', 'read'],
      saw: 'You pressed Zero with the pan empty. Then the stone read 45.0 g.',
      eq: 'mass = the reading after zeroing (g) · 1000 g = 1 kg',
      learn: 'An electronic balance measures mass. It must read 0.0 g with nothing on it, or every reading is wrong.' },
    { id: 'g7_raw', grades: [7], icon: '0️⃣', title: 'Not zeroed', hint: 'A balance mistake - weigh without looking at the empty pan',
      how: ['inst:bal78', 'spec:stone78', 'misread:raw'],
      saw: 'The empty pan already read 2.4 g. So the stone read 47.4 g, which is 2.4 g too much.',
      eq: 'not zeroed → every mass is too big by the same amount',
      learn: 'Look at the empty balance first. Press Zero, or take the empty reading off each mass.' },
    { id: 'g7_weight', grades: [7], icon: '🍎', title: 'Mass is not weight', hint: 'Write a mass in newtons',
      how: ['inst:bal78', 'tare', 'spec:sugar7', 'misread:weight'],
      saw: '250 N is a weight, not a mass. The sugar\'s mass is 250 g (0.25 kg).',
      eq: 'mass in kilograms (kg) · weight in newtons (N)',
      learn: 'Mass is the amount of matter. Weight is the pull of gravity on it, a force. On the Moon your mass stays the same but your weight is smaller.' },

    // ── Grade 8 ── density, floating and sinking
    { id: 'g8_alu', grades: [8], icon: '⬜', title: 'Aluminium: 2.7 g/cm³', hint: 'Find the density of the aluminium block',
      how: ['inst:dens8', 'spec:alu8', 'read'],
      saw: 'The block is 108 g and 5 × 4 × 2 = 40 cm³. 108 ÷ 40 = 2.70 g/cm³, so it sinks.',
      eq: 'density = mass ÷ volume',
      learn: 'Density is how much mass is packed into each cm³. Every piece of aluminium, big or small, has the same density.' },
    { id: 'g8_steel', grades: [8], icon: '🔩', title: 'Steel: 7.9 g/cm³', hint: 'Find the density of steel',
      how: ['inst:dens8', 'spec:steel8', 'read'],
      saw: '79 g in 10 cm³ is 7.90 g/cm³, nearly eight times the density of water.',
      eq: 'steel ≈ 7.9 g/cm³ > water 1.0 g/cm³ → sinks',
      learn: 'A small steel block feels heavy for its size. Heavy for its size means dense.' },
    { id: 'g8_copper', grades: [8], icon: '🟧', title: 'Copper by displacement', hint: 'Find the density of the copper lump',
      how: ['inst:dens8', 'spec:copper8', 'read'],
      saw: 'The water rose from 50 to 60 cm³, so the lump is 10 cm³. 89 g ÷ 10 cm³ = 8.90 g/cm³.',
      eq: 'volume = final − first reading, then density = mass ÷ volume',
      learn: 'An odd shape has no sides to measure, so its volume comes from displacement.' },
    { id: 'g8_stone', grades: [8], icon: '🪨', title: 'A stone: 2.5 g/cm³', hint: 'Find the density of the stone',
      how: ['inst:dens8', 'spec:stone8', 'read'],
      saw: 'The stone is 45 g, and the water rose from 50 to 68 cm³: 18 cm³. 45 ÷ 18 = 2.50 g/cm³.',
      eq: 'stone ≈ 2.5 g/cm³ → sinks',
      learn: 'Most rocks are about 2.5 to 3 g/cm³. That is why stones sink in water.' },
    { id: 'g8_cork', grades: [8], icon: '🍾', title: 'Cork floats high', hint: 'Find the density of cork',
      how: ['inst:dens8', 'spec:cork8', 'read'],
      saw: 'Cork is 24 g in 100 cm³: 0.24 g/cm³. It floated with most of it above the water.',
      eq: 'density < 1.0 g/cm³ → floats',
      learn: 'Anything less dense than water floats in it. The lower the density, the higher it floats.' },
    { id: 'g8_wood', grades: [8], icon: '🪵', title: 'Wood floats', hint: 'Find the density of the wooden block',
      how: ['inst:dens8', 'spec:wood8', 'read'],
      saw: '120 g in 200 cm³ is 0.60 g/cm³. The block floated with a little more than half under water.',
      eq: 'wood ≈ 0.5 to 0.8 g/cm³ → floats',
      learn: 'Wood is full of tiny air spaces, so it is less dense than water.' },
    { id: 'g8_ice', grades: [8], icon: '🧊', title: 'Ice floats - just', hint: 'Find the density of ice',
      how: ['inst:dens8', 'spec:ice8', 'read'],
      saw: '46 g in 50 cm³ is 0.92 g/cm³. It floated with most of it under the water.',
      eq: 'ice 0.92 g/cm³ < water 1.00 g/cm³',
      learn: 'Water expands when it freezes, so ice is less dense than water. An iceberg floats with about nine tenths of it under the sea.' },
    { id: 'g8_oil', grades: [8], icon: '🫒', title: 'Oil floats on water', hint: 'Find the density of cooking oil',
      how: ['inst:dens8', 'spec:oil8', 'read'],
      saw: 'The oil\'s mass was 126 − 80 = 46 g in 50 cm³: 0.92 g/cm³. It sat on top of the water.',
      eq: 'mass of a liquid = full − empty · a less dense liquid floats on a denser one',
      learn: 'Liquids that do not mix form layers. The least dense one ends up on top.' },
    { id: 'g8_flip', grades: [8], icon: '🔄', title: 'Upside down', hint: 'A density mistake - divide the volume by the mass',
      how: ['inst:dens8', 'spec:alu8', 'misread:flip'],
      saw: '40 ÷ 108 = 0.37 is volume ÷ mass. It would make aluminium float, which it does not.',
      eq: 'density = mass ÷ volume (not volume ÷ mass)',
      learn: 'Check your answer makes sense. A metal must come out above 1 g/cm³, because metals sink.' },
    { id: 'g8_final', grades: [8], icon: '📏', title: 'The final reading is not the volume', hint: 'A density mistake - use the final water level as the volume',
      how: ['inst:dens8', 'spec:copper8', 'misread:dlevel'],
      saw: 'Dividing by 60 cm³ used the water as well as the copper. The copper is only 10 cm³.',
      eq: 'volume of the solid = final − first reading',
      learn: 'Work out the volume first, by taking away the first reading. Then divide.' },
    { id: 'g8_total', grades: [8], icon: '🫙', title: 'Take off the cylinder', hint: 'A density mistake - leave the cylinder\'s mass in',
      how: ['inst:dens8', 'spec:oil8', 'misread:total'],
      saw: '126 g is the oil AND the cylinder. The oil alone is 126 − 80 = 46 g.',
      eq: 'mass of a liquid = full − empty',
      learn: 'Weigh the empty container first. Then take it away from the full reading.' },
    { id: 'g8_kgm3', grades: [8], icon: '🔤', title: 'g/cm³ is not kg/m³', hint: 'Write a density with the wrong unit',
      how: ['inst:dens8', 'spec:wood8', 'misread:unit'],
      saw: '0.60 kg/m³ would be a thousand times too small. Wood is 0.60 g/cm³, which is 600 kg/m³.',
      eq: '1 g/cm³ = 1000 kg/m³ (kg/m³ is beyond the Grade 8 questions)',
      learn: 'The unit is part of the answer. The same density is 0.6 in g/cm³ but 600 in kg/m³.' },
    { id: 'g8_weight', grades: [8], icon: '🌍', title: 'Weight is a force', hint: 'Write the stone\'s mass in newtons',
      how: ['inst:bal78', 'tare', 'spec:stone78', 'misread:weight'],
      saw: '45 N is a weight. The balance gave a mass: 45.0 g. On Earth, 45 g weighs about 0.45 N.',
      eq: 'weight (N) = mass (kg) × 10 N/kg on Earth',
      learn: 'A balance measures mass in grams or kilograms. A spring balance (newton meter) measures weight in newtons.' },
  ];

  // ── The one dangerous mistake: it stops the experiment ──
  const HAZARDS = {
    clinical_burst: {
      signs: ['toxic'], fx: 'burst',
      title: () => 'Stop - the clinical thermometer has burst',
      happened: c => `You put the clinical thermometer into ${c.what} at about ${c.temp} °C. Its scale stops at 42 °C, so the liquid inside expanded past the top of the tube with nowhere to go - and cracked the glass.`,
      why: 'Broken glass cuts, and hot water scalds. Older glass clinical thermometers hold mercury: the silver beads that spill out give off a toxic vapour, and mercury must never be touched or swept up by hand.',
      instead: 'Check an instrument\'s RANGE before you use it. For hot water, use the laboratory thermometer (−10 °C to 110 °C). If a thermometer does break: step back, touch nothing and tell your teacher at once - they clear it up with the school\'s spill kit.',
      exam: 'Choosing an instrument means checking its range as well as its precision. Physics 2021 (Fig 1.3) asks for the range of a laboratory thermometer: −10 °C to 110 °C.',
    },
    // ── Grade 4: real, age-appropriate dangers only ──
    hot_water: {
      grades: [4], signs: ['hot'], fx: 'splash',
      title: () => 'Stop - hot water can burn you',
      happened: () => 'You tried to pour hot water from the kettle yourself. It splashed out of the beaker.',
      why: 'Water from a kettle can burn (scald) your skin in a second. A burn hurts and can leave a scar.',
      instead: 'Ask an adult to pour hot water for you. Keep your hands and face back. Then put the thermometer in.',
      exam: 'Questions ask which instrument measures how hot water is: a thermometer. Its unit is degrees Celsius (°C).',
      button: 'Ask an adult to help',
      after: 'Good. Now pick "Hot water (an adult pours)".',
    },
    snapped: {
      grades: [4], signs: ['sharp'], fx: 'crack',
      title: () => 'Stop - the thermometer snapped',
      happened: c => `You stirred ${c.what} with the thermometer. Its thin glass snapped near the bulb.`,
      why: 'Broken glass is very sharp and can cut you. The red liquid inside can spill out.',
      instead: 'Never stir with a thermometer. Use a spoon or a stirring rod. If glass breaks, step back and tell your teacher.',
      exam: 'Questions ask how to use a thermometer. Keep the bulb in the liquid. Read it with your eye level.',
      button: 'Get a new thermometer',
      after: 'A new thermometer. Stir with a spoon - never with the thermometer.',
    },
    // ── Grades 7 and 8 ── glass and water
    cyl_crack: {
      grades: [7, 8], signs: ['sharp'], fx: 'crack',
      title: () => 'Stop - the cylinder has cracked',
      happened: c => `You dropped ${c.what === 'the water' ? 'a steel block' : 'the ' + c.what.replace(/ - drop it in$/, '')} straight into the glass cylinder. It hit the bottom hard and cracked the glass. Water is leaking out.`,
      why: 'Cracked glass has sharp edges that cut. The leaking water also makes the bench and the floor slippery.',
      instead: 'Tilt the cylinder and let a solid slide gently down the side, or lower it in on a thread. If glass breaks, step back and tell your teacher.',
      exam: 'Displacement questions expect a safe method: the solid is lowered in gently, so no water splashes out and the glass does not break.',
      button: 'Get a new cylinder',
      after: 'A new cylinder. Solids go in gently, on a thread. Try the stone.',
    },
    cyl_dropped: {
      grades: [7, 8], signs: ['sharp'], fx: 'crack',
      title: () => 'Stop - the cylinder slipped and smashed',
      happened: () => 'You lifted the full cylinder up to your eye. The wet glass slipped out of your hand and smashed.',
      why: 'Broken glass cuts. A tall cylinder is easy to drop or knock over, and wet glass is slippery.',
      instead: 'Leave the cylinder standing on a flat bench. Bend down until your eye is level with the liquid. If glass breaks, keep back and tell your teacher.',
      exam: 'Questions ask how to read a measuring cylinder: standing on a flat surface, with your eye level with the bottom of the meniscus.',
      button: 'Get a new cylinder',
      after: 'A new cylinder. It stays on the bench - use 👁️ to move your eye instead.',
    },
    spill: {
      grades: [7, 8], signs: ['warning'], fx: 'splash',
      title: () => 'Stop - water on the floor',
      happened: c => `The ${c.what} pushed the water up past the top of the cylinder. It spilled over the bench and onto the floor. The reading is lost too.`,
      why: 'A wet lab floor is slippery. Someone could slip and fall, perhaps while carrying glass.',
      instead: 'Wipe up a spill at once and tell your teacher. Start with less water, or use a bigger cylinder, so the level stays below the top.',
      exam: 'Displacement questions expect enough water to cover the solid, but not so much that it overflows.',
      button: 'Mop it up',
      after: 'All dry. A big stone needs less water first, or a bigger cylinder.',
    },
  };
  const SIGN_LABELS = { toxic: 'Toxic', hot: 'Hot', sharp: 'Sharp - can cut', warning: 'Caution' };

  // ── Wrong but safe: what went wrong and what to do instead ──
  const RESULTS = {
    parallax: {
      icon: '👁️',
      title: () => 'Parallax error - your eye was not level',
      happened: c => `With your eye ${c.pos} the liquid, your line of sight crossed the scale at ${c.typed} - but the bottom of the meniscus is really at ${c.want}. Looking from ${c.pos === 'above' ? 'above makes the reading too HIGH' : 'below makes the reading too LOW'}.`,
      instead: () => 'Bend down until your eye is level with the bottom of the meniscus, so you look at the scale at right angles (perpendicular). Then read.',
      exam: 'Naming the error is a paper question - "state the type of error": parallax error (Physics 2021 Q3(b)(i), Physics 2023 Q2(d)). To avoid it: eye level with the mark, perpendicular to the scale.',
    },
    meniscus_top: {
      icon: '🌊',
      title: () => 'You read the top of the meniscus',
      happened: c => `Water curves UP where it touches the glass. You read ${c.typed} at the edges of the curve, but the bottom of the curve - the true level - is at ${c.want}.`,
      instead: () => 'For water, read the BOTTOM of the meniscus, with your eye level with it. (Mercury curves the other way - for mercury you read the top.)',
      exam: 'Reading a measuring cylinder is examined (Physics 2022 Q3(a)(i)): the mark at the bottom of the meniscus, read at eye level.',
    },
    zero_raw: {
      icon: '0️⃣',
      title: () => 'Zero error - not corrected',
      happened: c => `The ${c.inst} does not read zero when ${c.empty}: it reads ${c.zeroS}. You recorded ${c.typedS} straight off the scale, so your reading is out by ${c.zeroS}.`,
      instead: c => `Check the zero first. Then true reading = scale reading − zero error: ${c.readS} − (${c.zeroS}) = ${c.wantS}.`,
      exam: 'An instrument that reads a value when it should read zero has a zero error (Physics 2023 Q2(d): identify the type of error). Subtract a positive zero error; for a negative one, add its size.',
    },
    end_error: {
      icon: '🪵',
      title: () => 'End error - the worn end of the ruler',
      happened: c => `The end of this metre rule is worn: the 0 mark has gone and the end really sits at 0.2 cm. Lined up with that end, the far end of the ${c.spec} read ${c.typed}, which is 0.2 cm too long.`,
      instead: () => 'Line the object up with a clear mark away from the end - the 1.0 cm mark - and subtract it: length = far reading − 1.0 cm.',
      exam: 'Zero (end) error is one of the two named errors in length measurement in the NCE syllabus (P1), alongside parallax error.',
    },
    too_coarse: {
      icon: '🔬',
      title: () => 'Right reading - wrong instrument',
      happened: c => `Your reading of ${c.typedS} is right for the ${c.inst}, which reads only to ${c.stepS}. But ${c.spec} is so small that one division is ${c.ratio}.`,
      instead: c => `Choose an instrument whose smallest division is tiny compared with the object: for ${c.spec}, the ${c.better}.`,
      exam: 'Choosing the most suitable instrument - and saying why ("it reads to 0.01 mm, so it is more precise") - earns the mark.',
    },
    wrong_tool: {
      icon: '🧰',
      title: c => `Not the ${c.inst.toLowerCase()}`,
      happened: c => c.reason,
      instead: c => `Use the ${c.best.toLowerCase()}: ${c.bestWhy}`,
      exam: 'Choose an instrument for the QUANTITY (length, volume, time, temperature, mass), its SIZE and the PRECISION you need.',
    },
    // ── Grade 4 ──
    ruler_end4: {
      grades: [4], icon: '📏',
      title: () => 'The ruler did not start at 0',
      happened: c => `The ${c.spec} was pushed against the end of the ruler. This ruler has a 1 cm gap before 0. So ${c.typed} is 1 cm too short.`,
      instead: () => 'Line up one end with the 0 mark. Then read the mark at the other end.',
      exam: 'Questions show an object on a ruler. Check where it starts. From 1 cm to 13 cm is 12 cm, not 13 cm.',
    },
    parallax4: {
      grades: [4], icon: '👁️',
      title: () => 'Your eye was not level',
      happened: c => `You looked from ${c.pos} the liquid. From there it looked like ${c.typed}. The real level is ${c.want}.`,
      instead: () => 'Keep the jug on a flat table. Bend down until your eye is level with the liquid. Then read the mark.',
      exam: 'Questions ask why you read a jug or cylinder at eye level. From above or below, the reading is wrong.',
    },
    not_zeroed: {
      grades: [4], icon: '⚖️',
      title: () => 'The scale did not start at 0',
      happened: c => `Before the ${c.spec} went on, the pointer was already at ${c.zero}. So ${c.typed} is ${c.zero} too heavy.`,
      instead: () => 'Look at the empty scale first. If the pointer is not on 0, turn the knob until it is. Then weigh.',
      exam: 'Questions ask about a balance that does not start at 0. Every reading is too heavy until it is set to 0.',
    },
    wrong_unit: {
      grades: [4], icon: '🔤',
      title: c => (c.sameQ ? 'Right number - wrong unit' : 'That unit is for something else'),
      happened: c => (c.sameQ
        ? `You wrote ${c.typed}. The number is right, but the unit is not. ${c.typed} is ${c.factor} times too ${c.bigger ? 'big' : 'small'}!`
        : `You wrote ${c.typed}. But ${c.uName} (${c.u}) measure ${c.uq}. The ${c.inst} measures ${c.rq}.`),
      instead: c => `Write the unit the scale uses. The ${c.inst} shows ${c.rName} (${c.ru}). So write ${c.want}.`,
      exam: 'Exam answers need a number AND the right unit. Use cm for length, ml for liquid and g for mass. Use °C for temperature and s for time.',
    },
    wrong_tool4: {
      grades: [4], icon: '🧰',
      title: c => `Not the ${c.inst.toLowerCase()}`,
      happened: c => c.reason,
      instead: c => `Use the ${c.best.toLowerCase()}: ${c.bestWhy}`,
      exam: 'Questions ask which instrument to use. First ask: am I measuring length, liquid, temperature, mass or time?',
    },
    // ── Grades 7 and 8 ── ctx comes from the bench (see _mistake): the typed
    // and true readings with units, and the numbers behind them.
    parallax78: {
      grades: [7, 8], icon: '👁️',
      title: () => 'Parallax error - your eye was not level',
      happened: c => `With your eye ${c.pos} the water, your line of sight crossed the scale ${c.pos} the true level of ${c.levelS}. So ${c.typed} is too ${c.pos === 'above' ? 'high' : 'low'}.`,
      instead: () => 'Keep the cylinder on the bench. Bend down until your eye is level with the bottom of the meniscus. Then read.',
      exam: 'Questions ask why a cylinder is read at eye level: from above or below the reading is wrong. This is parallax error.',
    },
    top78: {
      grades: [7, 8], icon: '🌊',
      title: () => 'You read the top of the meniscus',
      happened: c => `Water curves up where it touches the glass. The edge of the curve gave you ${c.typed}. The bottom of the curve, the true level, is ${c.levelS}.`,
      instead: () => 'Read the BOTTOM of the meniscus, with your eye level with it.',
      exam: 'Questions ask where to read a measuring cylinder: at the bottom of the meniscus, with your eye level with it.',
    },
    level78: {
      grades: [7, 8], icon: '➖',
      title: () => 'You forgot the water that was there first',
      happened: c => `${c.typed} is the new water level: the water and the ${c.spec} together. There was ${c.before} cm³ of water before.`,
      instead: c => `Take away the first reading: ${c.levelN} − ${c.before} = ${c.want}.`,
      exam: 'Displacement questions give two readings. The volume of the solid is the final reading minus the first one.',
    },
    bubble78: {
      grades: [7, 8], icon: '🫧',
      title: () => 'An air bubble was stuck to the stone',
      happened: c => `An air bubble clung to the ${c.spec}. It pushed the water up ${c.bubble} cm³ more, so ${c.typed} is too big.`,
      instead: () => 'Tap the side of the cylinder so the bubble floats up and pops. Then read the level again.',
      exam: 'Questions ask how to make a displacement reading accurate: no air bubbles on the solid, and the solid fully under the water.',
    },
    raw78: {
      grades: [7, 8], icon: '⚖️',
      title: () => 'The balance did not start at 0.0 g',
      happened: c => `With nothing on the pan the balance read ${c.zeroS}. So ${c.typed} is ${c.zeroS} too heavy.`,
      instead: c => `Press Zero (tare) with the pan empty. Or take the empty reading away: ${c.readS} − ${c.zeroS} = ${c.want}.`,
      exam: 'Questions ask what to do when a balance shows a mass with nothing on it: zero it, or subtract that amount from every reading.',
    },
    area78: {
      grades: [7], icon: '⬛',
      title: () => 'That is not a volume',
      happened: c => (c.kind === 'sum'
        ? `You added the sides: ${c.l} + ${c.w} + ${c.h} = ${c.typedN}. Adding lengths gives a length, not a volume.`
        : `${c.l} × ${c.w} = ${c.typedN} is the area of one face, in cm². It leaves out the height.`),
      instead: c => `Multiply all three sides: ${c.l} × ${c.w} × ${c.h} = ${c.want}.`,
      exam: 'Questions ask for the volume of a box: length × width × height, in cm³.',
    },
    wrong_unit78: {
      grades: [7, 8], icon: '🔤',
      title: c => (c.sameQ ? 'Right number - wrong unit' : 'That unit is for something else'),
      happened: c => (c.sameQ
        ? `You wrote ${c.typed}. The number is right, but the unit is not: ${c.typed} is ${c.factor} times too ${c.bigger ? 'big' : 'small'}.`
        : `You wrote ${c.typed}. But ${c.uName} (${c.u}) measure ${c.uq}. The ${c.inst} gives ${c.rq}.`),
      instead: c => `The unit is part of the answer. Write ${c.want}.`,
      exam: 'Every answer needs a number and the right unit: cm³ for volume, g or kg for mass, g/cm³ for density.',
    },
    mass_weight: {
      grades: [7, 8], icon: '🍎',
      title: () => 'Mass is not weight',
      happened: c => (c.u === 'N'
        ? `You wrote ${c.typed}. Newtons (N) measure weight, which is a force. The ${c.inst} measures mass, in grams or kilograms.`
        : `You wrote ${c.typed}. Grams and kilograms measure mass. Weight is a force, measured in newtons.`),
      instead: c => `Mass is the amount of matter, in g or kg: write ${c.want}. Weight is the pull of gravity on it, about 10 N for each kg on Earth.`,
      exam: 'Questions show a mass written in newtons and ask what is wrong: newtons measure weight; mass is in kilograms.',
    },
    flip8: {
      grades: [8], icon: '🔄',
      title: () => 'Volume ÷ mass - the formula upside down',
      happened: c => `You worked out ${c.Vn} ÷ ${c.mass} = ${c.typedN}. That is volume ÷ mass, the formula upside down.`,
      instead: c => `Density = mass ÷ volume = ${c.mass} ÷ ${c.Vn} = ${c.want}.`,
      exam: 'Density questions give a mass and a volume. Divide the MASS by the VOLUME, and give the unit, g/cm³.',
    },
    level8: {
      grades: [8], icon: '📏',
      title: () => 'You divided by the final reading',
      happened: c => `${c.after} cm³ is the water and the ${c.spec} together. The ${c.spec} is only ${c.after} − ${c.before} = ${c.Vn} cm³.`,
      instead: c => `Volume = ${c.after} − ${c.before} = ${c.Vn} cm³. Density = ${c.mass} ÷ ${c.Vn} = ${c.want}.`,
      exam: 'A common slip is dividing by the final water level. Find the volume by subtracting first.',
    },
    total8: {
      grades: [8], icon: '🫙',
      title: () => 'You forgot the mass of the cylinder',
      happened: c => `${c.full} g is the ${c.spec} and the cylinder together. The empty cylinder is ${c.empty} g.`,
      instead: c => `Mass of ${c.spec} = ${c.full} − ${c.empty} = ${c.mass} g. Density = ${c.mass} ÷ ${c.Vn} = ${c.want}.`,
      exam: 'For the density of a liquid, weigh the container empty, then full. The difference is the mass of the liquid.',
    },
  };

  // The better instrument to name on a "too coarse" card.
  function betterFor(specId) {
    const v = SPECIMENS[specId] && SPECIMENS[specId].length;
    return v != null && v < 5 ? 'micrometer screw gauge (reads to 0.01 mm)' : 'vernier caliper (reads to 0.01 cm)';
  }

  // Short, true facts for the 💡 button.
  const FACTS = [
    'A vernier scale has 10 divisions in 9 mm, so each is 0.1 mm shorter than a millimetre. That tiny difference lets you read to 0.1 mm.',
    'A micrometer spindle moves 0.5 mm for each full turn of the thimble. The thimble has 50 divisions, so each is 0.01 mm.',
    'Mercury\'s meniscus bulges UP - the opposite of water - so for mercury you read the top of the curve.',
    'Your reaction time is about 0.2 s. Timing 10 swings and dividing by 10 makes that error ten times smaller for each swing.',
    'The kelvin is the SI unit of temperature: K = °C + 273. Water freezes at 273 K and boils at 373 K.',
    '1 cm³ is exactly 1 ml, and 1000 cm³ is 1 dm³ - one litre.',
    'The kilogram is the only SI base unit with a prefix built into its name.',
    'To measure one sheet of paper with a ruler, measure a stack of 100 and divide by 100 - the same trick as timing 10 swings.',
    'Precision is how finely a scale reads. Accuracy is how close you are to the true value. A zero error makes a precise instrument inaccurate.',
    'A clinical thermometer reads 35-42 °C to 0.1 °C: very precise, but over a narrow range - just what a body temperature needs.',
    'A measuring cylinder is far more accurate than a beaker: a beaker\'s marks are rough guides, a cylinder\'s are a real scale.',
  ];
  const FACTS4 = [
    'A ruler measures length in centimetres (cm). 100 cm make 1 metre (m).',
    'Many rulers have a small gap before the 0 mark. Always start measuring at 0.',
    'A measuring jug shows how much liquid there is, in millilitres (ml). 1000 ml make 1 litre (l).',
    'Read a jug with your eye level with the liquid - not from above.',
    'A thermometer measures how hot or cold something is, in degrees Celsius (°C).',
    'Ice melts at 0 °C. Water boils at 100 °C. Your body is about 37 °C.',
    'A kitchen scale measures mass in grams (g). 1000 g make 1 kilogram (kg).',
    'Check that a scale points to 0 before you put anything on it.',
    'A stopwatch measures time in seconds (s). 60 seconds make 1 minute.',
    'Scientists measure more than once. If one result is odd, they do it again.',
    'Never stir with a thermometer. Its thin glass can snap.',
  ];
  // The rules on the Grade 4 help card.
  const RULES4 = [
    'Start at 0 on a ruler - not at its very end.',
    'Keep your eye level with the liquid or the red line.',
    'Set a scale to 0 before you weigh.',
    'Write the unit: cm, ml, g, °C or s.',
    'Measure more than once. Do an odd result again.',
    'Never stir with a thermometer. Let an adult pour hot water.',
  ];
  // ── Grades 7 and 8: facts, help rules, welcome lines ──
  const FACTS7 = [
    'The SI unit of length is the metre (m), of mass the kilogram (kg) and of time the second (s).',
    'The SI unit of temperature is the kelvin (K). Water freezes at 273 K.',
    '1 cm³ is exactly the same volume as 1 ml, and 1000 cm³ is 1 litre.',
    'Read a measuring cylinder at the bottom of the meniscus, with your eye level with it.',
    'A solid that sinks pushes aside its own volume of water. That is displacement.',
    'Tap the glass to free any air bubbles before you read a displacement.',
    'Lower a solid into a cylinder gently, on a thread or down the side. Never drop it in.',
    'A balance must read 0.0 g with nothing on the pan. Press Zero (tare) first.',
    'Mass is the amount of matter, in kilograms. Weight is a force, in newtons.',
    'For a small volume, use a small cylinder: its marks are closer together, so it reads more finely.',
  ];
  const FACTS8 = [
    'Density = mass ÷ volume. In this lab it is in grams per cubic centimetre (g/cm³).',
    'Water has a density of 1.0 g/cm³. Anything less dense floats in it; anything denser sinks.',
    'Aluminium is 2.7 g/cm³, steel about 7.9 g/cm³ and copper 8.9 g/cm³.',
    'Cork is only about 0.24 g/cm³, and most wood is 0.5 to 0.8 g/cm³. Both float.',
    'Ice is about 0.92 g/cm³, so it floats with about nine tenths of it under the water.',
    'A steel ship floats because its hull holds air: its average density is less than water\'s.',
    'Liquids that do not mix form layers, with the least dense on top. Oil floats on water.',
    'Every piece of the same substance has the same density, however big or small it is.',
    'The SI unit of density is kg/m³ (beyond the Grade 8 questions): 1 g/cm³ = 1000 kg/m³.',
    'On Earth weight = mass × 10 N/kg, so a 1 kg bag weighs about 10 N.',
  ];
  const FACTS_BY_GRADE = { 4: FACTS4, 7: FACTS7, 8: FACTS8 };
  const RULES_BY_GRADE = {
    4: RULES4,
    7: ['Keep the cylinder on the bench. Bend down to read it.', 'Read the bottom of the meniscus.', 'Displacement: final reading − first reading.',
        'Lower a solid in gently, and tap any bubbles free.', 'Zero the balance before you weigh.', 'Mass is in g or kg; weight is in newtons (N).'],
    8: ['Density = mass ÷ volume, in g/cm³.', 'Volume of a block: length × width × height.', 'Volume of an odd shape: final − first reading.',
        'Mass of a liquid: full container − empty container.', 'Less dense than water (1.0 g/cm³): it floats.', 'Mop up a spill at once.'],
  };
  // [bold lead, the rest] for the first-visit welcome (Grade 4's is in the bench).
  const INTRO_BY_GRADE = {
    7: [['New here?', 'Tap "Show me how". I will show you each tap.'], ['Measure volume.', 'Read a measuring cylinder, and find the volume of a stone by displacement.'],
        ['Measure mass.', 'Zero the balance first. Then weigh.'], ['Write the unit.', 'Type the number, then pick cm³, g or kg.'], ['Mistakes are fine here.', 'Try one and see what goes wrong.']],
    8: [['New here?', 'Tap "Show me how". I will show you each tap.'], ['Find the density.', 'Mass ÷ volume, for blocks, a stone and a liquid.'],
        ['Float or sink?', 'Compare it with water, 1.0 g/cm³ - then watch.'], ['Write the unit.', 'Density is in g/cm³.'], ['Mistakes are fine here.', 'Try one and see what goes wrong.']],
  };
  const HELP_HINT = {
    4: '1 cm = 10 mm · 1 m = 100 cm · 1 l = 1000 ml · 1 kg = 1000 g · 1 min = 60 s',
    7: '1 cm³ = 1 ml · 1000 cm³ = 1 l · 1000 g = 1 kg · SI units: m, kg, s, K',
    8: '1 cm³ = 1 ml · water = 1.0 g/cm³ · 1 g/cm³ = 1000 kg/m³ · weight (N) = mass (kg) × 10 N/kg',
  };
  const EMPTY_ICONS = { 4: '📏 ➰ 🫗 🌡️ ⚖️ ⏱️', 7: '🧪 🧱 ⚖️', 8: '🧪 ⚖️ 🧮' };

  // Pictures for "pick the instrument" questions (Labs.quiz { label, svg }).
  const PICS = {
    ruler30: '<svg viewBox="0 0 64 48"><rect x="3" y="17" width="58" height="14" rx="2" fill="#EEDBA6" stroke="#6B5A30" stroke-width="1.5"/><path d="M9 17v7M15 17v4M21 17v7M27 17v4M33 17v7M39 17v4M45 17v7M51 17v4M57 17v7" stroke="#222" stroke-width="1.3"/></svg>',
    tape: '<svg viewBox="0 0 64 48"><rect x="30" y="27" width="31" height="9" fill="#F5D23A" stroke="#6B5210" stroke-width="1.2"/><path d="M36 27v4M42 27v3M48 27v4M54 27v3" stroke="#222" stroke-width="1.2"/><rect x="58" y="25" width="4" height="13" fill="#888"/><circle cx="22" cy="26" r="17" fill="#D9483B" stroke="#7A1E17" stroke-width="1.5"/><circle cx="22" cy="26" r="6" fill="#F4F4F0" stroke="#7A1E17"/></svg>',
    jug: '<svg viewBox="0 0 64 48"><path d="M18 6h26l-2 38H20z" fill="rgba(122,182,222,0.25)" stroke="#2B4A5A" stroke-width="1.6"/><path d="M19.4 24h23.3l-1 20H20.4z" fill="rgba(122,182,222,0.75)"/><path d="M44 12c9 0 9 18 0 18" fill="none" stroke="#2B4A5A" stroke-width="2.4"/><path d="M20 12h6M20 18h4M20 24h6M20 30h4M20 36h6" stroke="#2B4A5A" stroke-width="1.2"/></svg>',
    thermo4: '<svg viewBox="0 0 64 48"><rect x="27" y="3" width="10" height="34" rx="5" fill="#fff" stroke="#2B4A5A" stroke-width="1.5"/><circle cx="32" cy="40" r="6" fill="#D8323A" stroke="#2B4A5A" stroke-width="1.5"/><rect x="30.5" y="18" width="3" height="20" fill="#D8323A"/><path d="M37 9h4M37 15h3M37 21h4M37 27h3" stroke="#2B4A5A" stroke-width="1.2"/></svg>',
    scale4: '<svg viewBox="0 0 64 48"><ellipse cx="32" cy="9" rx="20" ry="5" fill="#C7CFD5" stroke="#3A4A52" stroke-width="1.3"/><rect x="29" y="12" width="6" height="5" fill="#9AA5AE"/><rect x="12" y="17" width="40" height="29" rx="5" fill="#E3E8EB" stroke="#3A4A52" stroke-width="1.3"/><circle cx="32" cy="31" r="11" fill="#FBFBF8" stroke="#3A4A52" stroke-width="1.2"/><path d="M32 31l6-7" stroke="#C0262D" stroke-width="2" stroke-linecap="round"/></svg>',
    watch4: '<svg viewBox="0 0 64 48"><rect x="29" y="2" width="6" height="6" fill="#2E3A40"/><circle cx="32" cy="27" r="18" fill="#2E3A40"/><circle cx="32" cy="27" r="15" fill="#FBFBF8"/><path d="M32 27l7-9" stroke="#C0262D" stroke-width="2" stroke-linecap="round"/><path d="M32 13v3M46 27h-3M32 41v-3M18 27h3" stroke="#222" stroke-width="1.4"/></svg>',
  };
  const P = id => ({ label: INSTRUMENTS[id].name, svg: PICS[id] });
  // Grades 7-8: apparatus pictures, and a block in a tank of water.
  const PICS78 = {
    cylinder: '<svg viewBox="0 0 64 48"><rect x="26.8" y="20" width="10.4" height="21.2" fill="rgba(122,182,222,0.7)"/><path d="M26 4v38h12V4" fill="none" stroke="#2B4A5A" stroke-width="1.6"/><path d="M26 8h4M26 12h3M26 16h4M26 20h3M26 24h4M26 28h3M26 32h4M26 36h3" stroke="#2B4A5A" stroke-width="1"/><rect x="20" y="42" width="24" height="3" fill="#2B4A5A"/></svg>',
    beaker: '<svg viewBox="0 0 64 48"><rect x="16.8" y="22" width="30.4" height="19.2" fill="rgba(122,182,222,0.7)"/><path d="M13 6h3v36h32V6" fill="none" stroke="#2B4A5A" stroke-width="1.6"/><path d="M40 14h7M42 22h5M40 30h7" stroke="#2B4A5A" stroke-width="1"/></svg>',
    balance: '<svg viewBox="0 0 64 48"><ellipse cx="32" cy="12" rx="18" ry="4" fill="#C7CFD5" stroke="#3A4A52"/><rect x="29" y="14" width="6" height="6" fill="#9AA5AE"/><rect x="8" y="20" width="48" height="24" rx="3" fill="#E3E8EB" stroke="#3A4A52" stroke-width="1.3"/><rect x="18" y="26" width="28" height="10" fill="#16231F"/><path d="M36 29v4M40 29v4M44 29v4" stroke="#7CF2A0" stroke-width="1.4"/></svg>',
    ruler: PICS.ruler30,
  };
  // under: the fraction of the block below the water line, or 1 for a block
  // resting on the bottom. For a floating block that fraction IS its density
  // ÷ water's (it sinks until it pushes aside its own weight of water).
  function floatPic(under) {
    const h = 12, top = under >= 1 ? 44 - h : 20 - h * (1 - under);
    return `<svg viewBox="0 0 64 48"><rect x="24" y="${clean(top)}" width="16" height="${h}" fill="#B98B55" stroke="#5A4020"/>`
      + '<rect x="10" y="20" width="44" height="24" fill="rgba(122,182,222,0.55)"/><path d="M10 20h44" stroke="#2B6A9A" stroke-width="1.2"/>'
      + '<path d="M10 6v38h44V6" fill="none" stroke="#2B4A5A" stroke-width="1.6"/></svg>';
  }
  const FP = (label, under) => ({ label, svg: floatPic(under) });

  // The jobs in "Right tool for the job". `not` gives the reason for every
  // other instrument that measures the SAME quantity; an instrument for a
  // different quantity gets the general reason from wrongToolReason().
  const CHOICES = [
    { id: 'wire', job: 'The diameter of a thin copper wire (about 1 mm)', quantity: 'length', best: 'micrometer',
      why: 'it reads to 0.01 mm, so even a 1 mm wire is 100 divisions.',
      not: { rule: 'Its smallest division, 1 mm, is as big as the whole wire - the reading would tell you almost nothing.',
             vernier: 'It reads only to 0.1 mm, so one division is a tenth of the wire. The micrometer is ten times finer.' } },
    { id: 'desk', job: 'The width of a desk (about 60 cm)', quantity: 'length', best: 'rule',
      why: 'it covers long lengths, and to the nearest millimetre is plenty for 60 cm.',
      not: { vernier: 'A vernier caliper opens to only 15 cm.', micrometer: 'A micrometer opens to only 25 mm.' } },
    { id: 'tube', job: 'The inside diameter of a test tube (about 1.5 cm)', quantity: 'length', best: 'vernier',
      why: 'its inside jaws reach into the tube, and it reads to 0.01 cm.',
      not: { rule: 'You cannot hold a ruler across the inside of a tube, and it reads only to 1 mm.',
             micrometer: 'Its anvil and spindle close on the OUTSIDE of an object - it cannot measure an inside diameter.' } },
    { id: 'liquid', job: 'The volume of some water (about 60 cm³)', quantity: 'volume', best: 'cylinder',
      why: 'it is graduated in cm³ - read the bottom of the meniscus at eye level.', not: {} },
    { id: 'boil', job: 'The temperature of boiling water', quantity: 'temp', best: 'thermometer',
      why: 'its range (−10 °C to 110 °C) covers 100 °C.',
      not: { clinical: 'Its range stops at 42 °C. In boiling water it would burst.' } },
    { id: 'fever', job: 'A pupil\'s body temperature, to 0.1 °C', quantity: 'temp', best: 'clinical',
      why: 'it reads to 0.1 °C over 35-42 °C - the body-temperature range.',
      not: { thermometer: 'It reads only to 1 °C: it cannot tell 37.2 °C from 37.4 °C.' } },
  ];
  const CHOICE_INSTRUMENTS = ['rule', 'vernier', 'micrometer', 'cylinder', 'stopwatch', 'thermometer', 'clinical', 'balance'];
  const CHOICES4 = [
    { id: 'pencil', job: 'How long is a pencil?', quantity: 'length', best: 'ruler30',
      why: 'a pencil is short, and a ruler reads it to the nearest cm.',
      not: { tape: 'A tape can do it, but it is floppy. A ruler is easier for something short.' } },
    { id: 'room', job: 'How long is the classroom?', quantity: 'length', best: 'tape',
      why: 'a tape is many metres long, so you lay it down once.',
      not: { ruler30: 'A 30 cm ruler is far too short. You would move it again and again, and small mistakes add up.' } },
    { id: 'juice', job: 'How much juice is in a bottle?', quantity: 'volume', best: 'jug',
      why: 'it has marks in ml. Pour the juice in and read it at eye level.', not: {} },
    { id: 'bath', job: 'How hot is the water for a bath?', quantity: 'temp', best: 'thermo4',
      why: 'it measures how hot or cold something is, in °C.', not: {} },
    { id: 'mango', job: 'How heavy is a mango?', quantity: 'mass', best: 'scale4',
      why: 'it measures mass in grams. Set it to 0 first.', not: {} },
    { id: 'race', job: 'How long does a running race take?', quantity: 'time', best: 'watch4',
      why: 'it measures time in seconds. Start it, then stop it.', not: {} },
  ];
  const CHOICE_INSTRUMENTS4 = ['ruler30', 'tape', 'jug', 'thermo4', 'scale4', 'watch4'];

  // ── Missions ───────────────────────────────────
  // A question's FIRST option is the answer; the quiz shuffles them.
  const MISSIONS = [
    {
      id: 'vernier', icon: '🔧', title: 'Read the vernier',
      blurb: 'Measure a coin, a marble and a rod to 0.01 cm, then answer paper-style questions.',
      intro: 'Read the vernier! Pick the vernier caliper, then measure the coin, the glass marble and the metal rod. Zoom in, read the main scale, find the vernier line that lines up - and type your reading.',
      tasks: [
        { id: 'coin',   text: 'Measure the diameter of the coin',         inst: 'vernier', spec: 'coin' },
        { id: 'marble', text: 'Measure the diameter of the glass marble', inst: 'vernier', spec: 'marble' },
        { id: 'rod',    text: 'Measure the diameter of the metal rod',    inst: 'vernier', spec: 'rod' },
      ],
      quiz: [
        { q: 'On a diagram of a vernier caliper you must mark the MAIN scale with M. Which scale is it?',
          options: ['The long fixed scale on the beam, marked in cm and mm', 'The short sliding scale with ten divisions', 'The rotating scale on the thimble', 'The pointer at the end of the depth gauge'],
          why: 'The main scale is the long fixed one on the beam (Physics 2023 Q2(a)). The short sliding one beside it is the vernier scale, V.' },
        { q: 'Which part is the VERNIER scale, V?',
          options: ['The short sliding scale of ten divisions beside the main scale', 'The long fixed scale marked in centimetres', 'The pair of jaws that grip the object', 'The screw that locks the slider in place'],
          why: 'The vernier scale slides along the main scale with the moving jaw. Its ten divisions give the extra 0.01 cm.' },
        { q: 'The main scale reads 2.3 cm and the 7th vernier division lines up with a main-scale mark. What is the reading?',
          options: ['2.37 cm', '2.30 cm', '3.0 cm', '2.07 cm'],
          why: 'Reading = main scale + vernier division × 0.01 cm = 2.3 + 0.07 = 2.37 cm (Physics 2022 Q3(c): read both scales, then combine).' },
        { q: 'What is the smallest length a vernier caliper can measure?',
          options: ['0.01 cm (0.1 mm)', '0.1 cm (1 mm)', '0.001 cm', '1 cm'],
          why: 'Ten vernier divisions span 9 mm, so the caliper reads to 1 − 0.9 = 0.1 mm = 0.01 cm.' },
        { q: 'Ten vernier divisions span 9 mm. How long is one vernier division?',
          options: ['0.9 mm', '1 mm', '0.1 mm', '9 mm'],
          why: '9 mm ÷ 10 = 0.9 mm - just 0.1 mm shorter than a main-scale millimetre.' },
        { q: 'The coin measured 2.37 cm. What is that in millimetres?',
          options: ['23.7 mm', '237 mm', '0.237 mm', '2.37 mm'],
          why: '1 cm = 10 mm, so 2.37 × 10 = 23.7 mm.' },
      ],
    },
    {
      id: 'errors', icon: '🎯', title: 'Beat the errors',
      blurb: 'Find a zero error and correct it, beat parallax and weigh a stone on a balance that does not start at zero.',
      intro: 'Beat the errors! Old caliper A has a worn jaw and the balance does not start at zero. Find each error, correct for it, and read the measuring cylinder with your eye in the right place.',
      tasks: [
        { id: 'zero', text: 'Close the jaws of old caliper A and read its zero error', inst: 'vernier_old', spec: 'closed' },
        { id: 'rod',  text: 'Measure the rod with old caliper A - correct for the zero error', inst: 'vernier_old', spec: 'rod' },
        { id: 'cyl',  text: 'Read the water in the measuring cylinder, eye level', inst: 'cylinder', spec: 'water', eye: 'level' },
        { id: 'bal',  text: 'Weigh the stone on the balance - it does not start at zero', inst: 'balance', spec: 'stone' },
      ],
      quiz: [
        { q: 'A pupil reads a measuring cylinder with her eye above the level of the liquid. Name this type of error.',
          options: ['Parallax error', 'Zero error', 'End error', 'Reaction-time error'],
          why: 'A line of sight that is not perpendicular to the scale gives a parallax error (Physics 2021 Q3(b)(i), Physics 2023 Q2(d)).' },
        { q: 'With its jaws closed a vernier caliper reads +0.03 cm. It then reads 1.28 cm on a rod. What is the true diameter?',
          options: ['1.25 cm', '1.31 cm', '1.28 cm', '0.03 cm'],
          why: 'True reading = scale reading − zero error = 1.28 − 0.03 = 1.25 cm.' },
        { q: 'A caliper has a zero error of −0.02 cm. It reads 3.45 cm on a block. What is the true length?',
          options: ['3.47 cm', '3.43 cm', '3.45 cm', '3.25 cm'],
          why: 'True reading = 3.45 − (−0.02) = 3.45 + 0.02 = 3.47 cm. A negative zero error makes every reading too small.' },
        { q: 'How do you avoid parallax error when you read a measuring cylinder?',
          options: ['Put your eye level with the bottom of the meniscus', 'Read the top of the meniscus instead', 'Tilt the cylinder towards you', 'Read the scale from above the liquid'],
          why: 'Eye level with the mark, looking at the scale at right angles, is the only way to see the true reading.' },
        { q: 'Why should you not measure from the very end of an old metre rule?',
          options: ['The end may be worn, so it is not exactly at zero', 'The first centimetre is always marked in inches', 'The end of the ruler is too thin to see', 'The scale is printed backwards at the end'],
          why: 'A worn end gives a zero (end) error. Start from a clear mark such as 1.0 cm and subtract it.' },
        { q: 'Suggest how to improve the accuracy of timing one swing of a pendulum.',
          options: ['Time 10 swings and divide by 10', 'Time one swing very carefully', 'Use a heavier pendulum bob', 'Start the stopwatch after the bob is let go'],
          why: 'Your reaction-time error is shared out over 10 swings, so it is ten times smaller for each (Physics 2021 Q6(b): improve the accuracy).' },
      ],
    },
    {
      id: 'choose', icon: '🧰', title: 'Right tool for the job', choices: CHOICES, pick: CHOICE_INSTRUMENTS,
      blurb: 'Six jobs, eight instruments. Pick the best one for each - quantity, size and precision.',
      intro: 'Right tool for the job! For each job, tap the instrument you would use. Think about the quantity, how big it is, and how precisely you need it.',
      quiz: [
        { q: 'Which list puts the instruments from MOST to LEAST precise?',
          options: ['Micrometer, vernier caliper, metre rule', 'Metre rule, vernier caliper, micrometer', 'Vernier caliper, micrometer, metre rule', 'Micrometer, metre rule, vernier caliper'],
          why: 'Micrometer 0.01 mm, vernier caliper 0.1 mm, metre rule 1 mm: the smaller the division, the more precise.' },
        { q: 'What is the SI unit of temperature?',
          options: ['Kelvin (K)', 'Degree Celsius (°C)', 'Joule (J)', 'Degree Fahrenheit (°F)'],
          why: 'The kelvin is the SI unit; degrees Celsius are what lab thermometers show. K = °C + 273.' },
        { q: 'Tap water is at 27 °C. What is this in kelvin?',
          options: ['300 K', '246 K', '27 K', '273 K'],
          why: 'K = °C + 273, so 27 + 273 = 300 K.' },
        { q: 'A laboratory thermometer reads from −10 °C to 110 °C. Which temperature can it NOT measure?',
          options: ['150 °C', '100 °C', '0 °C', '−5 °C'],
          why: '150 °C is above the top of its range (110 °C). The RANGE is the lowest to the highest reading.' },
        { q: 'A stopwatch shows 3 minutes 20 seconds. What is this in seconds?',
          options: ['200 s', '320 s', '380 s', '32 s'],
          why: '3 × 60 + 20 = 200 s. The second is the SI unit of time.' },
        { q: 'What is the SI unit of mass?',
          options: ['Kilogram (kg)', 'Gram (g)', 'Newton (N)', 'Tonne (t)'],
          why: 'The kilogram is the SI unit of mass. The newton is the unit of force (weight).' },
      ],
    },

    // ── Grade 4 ── a task's `align`/`tared` must be true of the reading too.
    {
      id: 'g4_read', grades: [4], icon: '🔍', title: 'Read the scales',
      blurb: 'Measure with a ruler, a jug, a thermometer and a scale. Then answer 6 questions.',
      intro: 'Read the scales! Measure the pencil, the juice, the tap water and the mango. Start at 0, keep your eye level, and set the scale to 0.',
      tasks: [
        { id: 'pencil', text: 'Measure the pencil - start at 0', inst: 'ruler30', spec: 'pencil4', align: 'zero', need: 'For the mission, start the pencil at 0.' },
        { id: 'juice',  text: 'Read the juice in the jug - eye level', inst: 'jug', spec: 'juice4', eye: 'level', need: 'For the mission, read it with your eye level.' },
        { id: 'tap',    text: 'Read the thermometer in tap water', inst: 'thermo4', spec: 'tap4' },
        { id: 'mango',  text: 'Weigh the mango - set the scale to 0 first', inst: 'scale4', spec: 'mango4', tared: true, need: 'For the mission, set the scale to 0 first.' },
      ],
      quiz: [
        { q: 'A thermometer has a mark every 2 °C. The red line is 3 marks above 20 °C. What is the temperature?',
          options: ['26 °C', '23 °C', '25 °C', '32 °C'],
          why: 'Each mark is 2 °C, so 3 marks is 6 °C. 20 + 6 = 26 °C.' },
        { q: 'A pencil starts at the 1 cm mark and ends at the 13 cm mark. How long is it?',
          options: ['12 cm', '13 cm', '14 cm', '11 cm'],
          why: 'It did not start at 0. From 1 cm to 13 cm is 13 − 1 = 12 cm.' },
        { q: 'A jug has a mark every 50 ml. The juice is one mark above 300 ml. How much juice is there?',
          options: ['350 ml', '301 ml', '310 ml', '400 ml'],
          why: 'One mark is 50 ml. 300 + 50 = 350 ml.' },
        { q: 'Why must your eye be level with the liquid when you read a jug?',
          options: ['From above or below, the reading is wrong', 'So that the liquid does not spill out', 'So that the jug does not get warm', 'Because the numbers are very small'],
          why: 'From above, the liquid looks higher. From below, it looks lower. Only eye level gives the true reading.' },
        { q: 'A kitchen scale points to 40 g before anything is on it. What should you do first?',
          options: ['Turn the knob so the pointer is on 0', 'Add 40 g to every reading you take', 'Weigh the mango two times over', 'Put the scale down on the floor'],
          why: 'A scale must start at 0. If not, every reading is 40 g too heavy.' },
        { q: 'Which unit would you use for the length of a pencil?',
          options: ['centimetres (cm)', 'kilograms (kg)', 'litres (l)', 'degrees Celsius (°C)'],
          why: 'Length is measured in millimetres (mm), centimetres (cm) or metres (m).' },
      ],
    },
    {
      id: 'g4_choose', grades: [4], icon: '🧰', title: 'Right tool for the job', choices: CHOICES4, pick: CHOICE_INSTRUMENTS4,
      blurb: 'Six jobs, six tools. Pick the right one for each job.',
      intro: 'Right tool for the job! Read each job. Then tap the tool you would use. Ask: what am I measuring?',
      quiz: [
        { q: 'Which one measures how hot or cold something is?', options: [P('thermo4'), P('jug'), P('scale4'), P('ruler30')],
          why: 'A thermometer measures temperature, in degrees Celsius (°C).' },
        { q: 'Which one would you use to find the mass of a bag of rice?', options: [P('scale4'), P('thermo4'), P('jug'), P('watch4')],
          why: 'A kitchen scale measures mass, in grams (g) and kilograms (kg).' },
        { q: 'Which one measures how much water is in a bottle?', options: [P('jug'), P('ruler30'), P('watch4'), P('scale4')],
          why: 'A measuring jug measures liquid, in millilitres (ml) and litres (l).' },
        { q: 'Which one is best for the length of the school hall?', options: [P('tape'), P('ruler30'), P('thermo4'), P('jug')],
          why: 'A tape measure is many metres long. A 30 cm ruler would have to be moved again and again.' },
        { q: 'Which one measures how long a race takes?', options: [P('watch4'), P('thermo4'), P('scale4'), P('jug')],
          why: 'A stopwatch measures time, in seconds (s).' },
        { q: 'In which unit is the mass of a mango measured?', options: ['grams (g)', 'centimetres (cm)', 'millilitres (ml)', 'degrees Celsius (°C)'],
          why: 'Mass is measured in grams (g). 1000 g = 1 kg.' },
      ],
    },
    {
      id: 'g4_fair', grades: [4], icon: '🔁', title: 'Fair measuring',
      blurb: 'Time a ball down a slope three times. Is one result odd? Then answer 5 questions.',
      intro: 'Fair measuring! Pick the stopwatch and the ball. Time it three times. Look at your notebook: do the times agree?',
      tasks: [
        { id: 't1', text: 'Time the ball - try 1', inst: 'watch4', spec: 'ball4' },
        { id: 't2', text: 'Time the ball - try 2', inst: 'watch4', spec: 'ball4' },
        { id: 't3', text: 'Time the ball - try 3', inst: 'watch4', spec: 'ball4' },
      ],
      quiz: [
        { q: 'Ama times a ball three times: 5 s, 5 s and 8 s. What should she do about the 8 s?',
          options: ['Time it again - one odd result is usually a mistake', 'Keep 8 s, because it is the biggest time', 'Add the three times together: 18 s', 'Throw away both of the 5 s results'],
          why: 'Two results agree. The odd one is usually a mistake, like pressing Stop late. Do it again to check.' },
        { q: 'Why do scientists measure the same thing more than once?',
          options: ['To check the result and spot a mistake', 'Because the first time is always wrong', 'To make the numbers come out bigger', 'Because instruments get tired quickly'],
          why: 'Repeating shows whether the results agree. If one is odd, it can be checked.' },
        { q: 'Three pupils measure the same leaf. They get 9 cm, 9 cm and 9 cm. How long is the leaf?',
          options: ['9 cm', '27 cm', '3 cm', '18 cm'],
          why: 'All three agree, so the leaf is 9 cm long. You do not add the results.' },
        { q: 'A class measures the playground with a 30 cm ruler and gets a different answer every time. What would help most?',
          options: ['Use a long tape measure', 'Use a shorter ruler', 'Count their steps', 'Measure only half of it'],
          why: 'A long tape is laid down once. Moving a short ruler again and again adds up small mistakes.' },
        { q: 'Two thermometers are in the same glass of water. One reads 28 °C and one reads 33 °C. How can you find the faulty one?',
          options: ['Put both in ice and water: a good one reads 0 °C', 'Take the higher reading, because it is bigger', 'Add them and then halve the answer', 'Leave both of them out in the sun first'],
          why: 'Ice and water is at 0 °C. A thermometer that does not read 0 °C there is faulty.' },
      ],
    },

    // ── Grade 7 ──
    {
      id: 'g7_volume', grades: [7], icon: '🧪', title: 'Measure volume',
      blurb: 'Read a cylinder, find a stone\'s volume by displacement and work out a block\'s. Then 5 questions.',
      intro: 'Measure volume! Read the water at eye level, find the stone\'s volume by displacement, and work out the wooden block\'s volume.',
      tasks: [
        { id: 'water', text: 'Read the water in the cylinder - eye level', inst: 'cyl78', spec: 'water78', eye: 'level', need: 'For the mission, read it with your eye level.' },
        { id: 'stone', text: 'Find the volume of the stone by displacement', inst: 'cyl78', spec: 'stone78' },
        { id: 'block', text: 'Work out the volume of the wooden block', inst: 'block7', spec: 'box7' },
      ],
      quiz: [
        { q: 'Which is used to measure the volume of a liquid accurately?', options: [{ label: 'Measuring cylinder', svg: PICS78.cylinder }, { label: 'Beaker', svg: PICS78.beaker }, { label: 'Electronic balance', svg: PICS78.balance }, { label: 'Ruler', svg: PICS78.ruler }],
          why: 'A measuring cylinder has a real scale. A beaker\'s marks are only a rough guide, a balance measures mass and a ruler length.' },
        { q: 'Water stands at 30 cm³. A key is lowered in and the level rises to 37 cm³. What is the volume of the key?',
          options: ['7 cm³', '37 cm³', '30 cm³', '67 cm³'],
          why: 'Volume of the key = final − first reading = 37 − 30 = 7 cm³.' },
        { q: 'Where should your eye be when you read a measuring cylinder?',
          options: ['Level with the bottom of the meniscus', 'Above the water, looking down', 'Level with the top of the cylinder', 'Below the base, looking up'],
          why: 'From above or below you get parallax error. Eye level with the bottom of the meniscus gives the true reading.' },
        { q: 'A box is 6 cm long, 4 cm wide and 2 cm high. What is its volume?',
          options: ['48 cm³', '12 cm³', '24 cm³', '48 cm²'],
          why: 'Volume = 6 × 4 × 2 = 48 cm³. Adding the sides gives 12, and 6 × 4 = 24 is the area of one face.' },
        { q: '1 cm³ is the same volume as…', options: ['1 ml', '1 l', '10 ml', '1000 ml'],
          why: '1 cm³ = 1 ml exactly, so 1000 cm³ = 1000 ml = 1 litre.' },
      ],
    },
    {
      id: 'g7_mass', grades: [7], icon: '⚖️', title: 'Mass, not weight',
      blurb: 'Check the empty balance, zero it and weigh two things. Then 5 questions.',
      intro: 'Mass, not weight! Look at the empty balance first. Zero it, then weigh the stone and the bag of sugar.',
      tasks: [
        { id: 'empty', text: 'Read the empty balance', inst: 'bal78', spec: 'closed' },
        { id: 'stone', text: 'Weigh the stone - zero the balance first', inst: 'bal78', spec: 'stone78', tared: true, need: 'For the mission, press Zero first.' },
        { id: 'sugar', text: 'Weigh the bag of sugar - zeroed', inst: 'bal78', spec: 'sugar7', tared: true, need: 'For the mission, press Zero first.' },
      ],
      quiz: [
        { q: 'What is the SI unit of mass?', options: ['kilogram (kg)', 'newton (N)', 'gram (g)', 'litre (l)'],
          why: 'The kilogram is the SI unit of mass. The newton is the unit of force, such as weight.' },
        { q: 'A balance reads 1.5 g with nothing on the pan. A shell then reads 21.5 g. What is the shell\'s true mass?',
          options: ['20.0 g', '21.5 g', '23.0 g', '1.5 g'],
          why: 'Take the empty reading away: 21.5 − 1.5 = 20.0 g. Better still, press Zero first.' },
        { q: 'Which sentence about mass and weight is right?',
          options: ['Mass is the amount of matter; weight is the pull of gravity on it', 'Mass and weight are two names for the same thing', 'Weight is the amount of matter; mass is a force', 'Mass changes on the Moon, but weight does not'],
          why: 'Mass (kg) stays the same everywhere. Weight (N) is a force, and it is smaller on the Moon.' },
        { q: 'What is 750 g in kilograms?', options: ['0.75 kg', '7.5 kg', '75 kg', '0.075 kg'],
          why: '1 kg = 1000 g, so 750 ÷ 1000 = 0.75 kg.' },
        { q: 'Which unit is used for weight?', options: ['newton (N)', 'kilogram (kg)', 'gram (g)', 'cubic centimetre (cm³)'],
          why: 'Weight is a force, so it is measured in newtons.' },
      ],
    },

    // ── Grade 8 ──
    {
      id: 'g8_density', grades: [8], icon: '🧮', title: 'Find the density',
      blurb: 'A metal block, a stone and a liquid: mass ÷ volume. Then 5 questions.',
      intro: 'Find the density! Work out mass ÷ volume for the aluminium block, the stone and the cooking oil.',
      tasks: [
        { id: 'alu', text: 'Density of the aluminium block', inst: 'dens8', spec: 'alu8' },
        { id: 'stone', text: 'Density of the stone (by displacement)', inst: 'dens8', spec: 'stone8' },
        { id: 'oil', text: 'Density of the cooking oil', inst: 'dens8', spec: 'oil8' },
      ],
      quiz: [
        { q: 'A block has a mass of 150 g and a volume of 50 cm³. What is its density?',
          options: ['3 g/cm³', '0.33 g/cm³', '7500 g/cm³', '100 g/cm³'],
          why: 'Density = mass ÷ volume = 150 ÷ 50 = 3 g/cm³.' },
        { q: 'A pebble of mass 39 g is lowered into water. The level rises from 30 cm³ to 45 cm³. What is the pebble\'s density?',
          options: ['2.6 g/cm³', '0.87 g/cm³', '1.3 g/cm³', '0.38 g/cm³'],
          why: 'Volume = 45 − 30 = 15 cm³. Density = 39 ÷ 15 = 2.6 g/cm³. Dividing by 45 uses the water as well.' },
        { q: 'An empty beaker is 60 g. With 100 cm³ of a liquid in it, it is 170 g. What is the liquid\'s density?',
          options: ['1.1 g/cm³', '1.7 g/cm³', '0.6 g/cm³', '110 g/cm³'],
          why: 'Mass of liquid = 170 − 60 = 110 g. Density = 110 ÷ 100 = 1.1 g/cm³.' },
        { q: 'Which is the formula for density?',
          options: ['density = mass ÷ volume', 'density = volume ÷ mass', 'density = mass × volume', 'density = mass − volume'],
          why: 'Density is the mass in each unit of volume, so mass is divided by volume.' },
        { q: 'A big and a small piece of the same aluminium are weighed and measured. What do you find?',
          options: ['They have the same density', 'The big piece is denser', 'The small piece is denser', 'Only the big piece has a density'],
          why: 'Density belongs to the substance. More aluminium means more mass AND more volume in the same ratio.' },
      ],
    },
    {
      id: 'g8_float', grades: [8], icon: '🛟', title: 'Float or sink?',
      blurb: 'Cork, ice and copper: work out each density and watch it in water. Then 5 questions.',
      intro: 'Float or sink? Find the density of the cork, the ice and the copper. Compare each with water, 1.0 g/cm³.',
      tasks: [
        { id: 'cork', text: 'Density of the cork block', inst: 'dens8', spec: 'cork8' },
        { id: 'ice', text: 'Density of the ice block', inst: 'dens8', spec: 'ice8' },
        { id: 'copper', text: 'Density of the copper lump', inst: 'dens8', spec: 'copper8' },
      ],
      quiz: [
        { q: 'Cork is 0.24 g/cm³. Which picture shows a cork block in water?',
          options: [FP('Floats, mostly above the water', 0.24), FP('Floats, mostly under the water', 0.9), FP('Rests on the bottom', 1), FP('Floats exactly half in', 0.5)],
          why: 'Cork is far less dense than water, so it floats high. A floating block sinks until it pushes aside its own weight of water.' },
        { q: 'Iron is about 7.9 g/cm³. What does an iron nail do in water?',
          options: ['It sinks, because it is denser than water', 'It floats, because it is a solid', 'It floats, because it is small', 'It sinks only if it is large'],
          why: '7.9 g/cm³ is more than water\'s 1.0 g/cm³, so iron sinks, whatever its size.' },
        { q: 'Ice is 0.92 g/cm³. Which picture shows an ice block in water?',
          options: [FP('Floats, mostly under the water', 0.92), FP('Floats, mostly above the water', 0.2), FP('Rests on the bottom', 1), FP('Floats exactly half in', 0.5)],
          why: 'Ice is only a little less dense than water, so it floats with about nine tenths under the water.' },
        { q: 'Cooking oil (0.92 g/cm³) and water (1.0 g/cm³) are poured into a jar. What happens?',
          options: ['The oil floats on top of the water', 'The oil sinks below the water', 'They mix into one liquid', 'The bigger volume goes on top'],
          why: 'Liquids that do not mix form layers, and the less dense one is on top.' },
        { q: 'Steel is denser than water. Why does a steel ship float?',
          options: ['Its hull holds air, so its average density is less than water\'s', 'Steel is less dense than sea water', 'Its engines hold it up in the water', 'Salt water makes the steel lighter'],
          why: 'The hull and the air inside it together have a lower average density than water. Fill it with water and it sinks.' },
      ],
    },
  ];

  function wrongToolReason(choice, instId) {
    const I = INSTRUMENTS[instId];
    if (choice.not[instId]) return choice.not[instId];
    if (I.grades) return `The ${I.name.toLowerCase()} measures ${QUANTITIES[I.quantity].kid}, not ${QUANTITIES[choice.quantity].kid}.`;
    return `The ${I.name.toLowerCase()} measures ${QUANTITIES[I.quantity].name}, not ${QUANTITIES[choice.quantity].name}.`;
  }

  // ── Guided experiments ─────────────────────────
  // One action per step; `on` is what completes it (the discovery vocabulary
  // above). A step with `btn` gets a button in the yellow box that does it.
  const READ = { on: 'read', say: 'Read the scale — type your reading in the box and tap Check!' };
  const READ4 = { on: 'read', say: 'Read the scale — type the number, pick the unit and tap Check.' };
  const READ78 = { on: 'read', say: 'Read the scale — type the number, pick the unit and tap Check.' };
  const GUIDES = [
    { id: 'cylinder', icon: '🧪', title: 'Read a measuring cylinder',
      blurb: 'Find the bottom of the meniscus and read it at eye level.',
      lesson: 'Water curves up at the glass, making a meniscus. Read the BOTTOM of the curve with your eye level with it. Volume is measured in cm³ (1 cm³ = 1 ml).',
      steps: [
        { on: 'inst:cylinder', say: 'Tap 🧪 the measuring cylinder to pick it.' },
        { on: 'spec:water',    say: 'Tap 💧 water to choose what to measure.' },
        { on: 'zoom',          say: 'Tap 🔍 Zoom in to see every 1 cm³ mark.' },
        { on: 'zoom',          say: 'Tap 🔍 Zoom in again — look at the curved surface.' },
        READ,
      ] },
    { id: 'vernier', icon: '🔧', title: 'Read a vernier caliper',
      blurb: 'Main scale + the vernier line that lines up. Measure a coin to 0.01 cm.',
      lesson: 'Main scale: the mark just before the vernier zero. Vernier: the division that lines up best with a main-scale mark, × 0.01 cm. Add them. That reads to 0.1 mm - ten times finer than a ruler.',
      steps: [
        { on: 'inst:vernier', say: 'Tap 🔧 the vernier caliper to pick it.' },
        { on: 'spec:coin',    say: 'Tap 🪙 to close the jaws on the coin.' },
        { on: 'zoom',         say: 'Tap 🔍 Zoom in to see both scales.' },
        { on: 'zoom',         say: 'Tap 🔍 Zoom in again — find the vernier line that lines up exactly.' },
        READ,
      ] },
    { id: 'parallax', icon: '👁️', title: 'Beat parallax error',
      blurb: 'See how the reading changes when your eye is too high - then fix it.',
      lesson: 'With your eye above the level the reading is too high; below, too low. That is parallax error. Eye level, looking at the scale at right angles, gives the true reading.',
      steps: [
        { on: 'inst:cylinder',    say: 'Tap 🧪 the measuring cylinder to pick it.' },
        { on: 'spec:water',       say: 'Tap 💧 to measure the water.' },
        { on: 'eye:above',        say: 'Tap 👁️ Eye above — stand tall so your eye is above the water.' },
        { on: 'misread:apparent', say: 'Read where the dashed line crosses the scale — tap ✏️ to record it.' },
        { on: 'eye:level',        say: 'Tap 👁️ Eye level — bend down so your eye is level with the meniscus.' },
        READ,
      ] },
    { id: 'compare', icon: '🔬', title: 'Which is most precise?',
      blurb: 'Measure one thin wire with a metre rule, a vernier and a micrometer.',
      lesson: 'Metre rule to 1 mm, vernier caliper to 0.1 mm, micrometer to 0.01 mm. For something as thin as a wire only the micrometer gives a useful reading: the smaller the division, the more precise the instrument.',
      steps: [
        { on: 'inst:rule',       say: 'Tap 📏 the metre rule to start.' },
        { on: 'spec:wire',       say: 'Tap 〰️ to measure the copper wire.' },
        { on: 'align:mark',      say: 'Tap 📍 to line up with the 1 cm mark, away from the worn end.' },
        READ,
        { on: 'inst:vernier',    say: 'Tap 🔧 the vernier caliper to try it next.' },
        { on: 'spec:wire',       say: 'Tap 〰️ to measure the same wire.' },
        READ,
        { on: 'inst:micrometer', say: 'Tap 🗜️ the micrometer — the most precise instrument.' },
        { on: 'spec:wire',       say: 'Tap 〰️ to measure the wire one more time.' },
        READ,
      ] },
    { id: 'zero', icon: '0️⃣', title: 'Find and fix a zero error',
      blurb: 'Close the jaws of an old caliper, read its zero error, then correct a reading.',
      lesson: 'Close the jaws first. If the reading is not zero, that is the zero error. True reading = scale reading − zero error.',
      steps: [
        { on: 'inst:vernier_old', say: 'Tap 🔧 old caliper A — its jaw is worn.' },
        { on: 'spec:closed',      say: 'Tap 🤏 to close the jaws with nothing between them.' },
        { on: 'zoom',             say: 'Tap 🔍 Zoom in to see both zeros.' },
        { on: 'zoom',             say: 'Tap 🔍 Zoom in again — does the vernier zero line up with the main-scale zero?' },
        { on: 'read',             say: 'Type what it really reads — that is the zero error. Tap Check.' },
        { on: 'spec:rod',         say: 'Tap 🔩 to measure the metal rod with the same caliper.' },
        { on: 'read',             say: 'Read the scales, take away the zero error — type the TRUE diameter.' },
      ] },
    { id: 'swing', icon: '🕰️', title: 'Time a pendulum',
      blurb: 'Time 10 swings with a stopwatch and work out one swing.',
      lesson: 'Minutes × 60 + seconds gives the time in seconds. Timing 10 swings and dividing by 10 shares out your reaction-time error, so one swing is timed far more accurately.',
      steps: [
        { on: 'inst:stopwatch', say: 'Tap ⏱️ the stopwatch to pick it.' },
        { on: 'spec:pendulum',  say: 'Tap 🕰️ to time 10 swings of the pendulum.' },
        { on: 'start',          say: 'Tap ▶️ Start as you release the bob — it stops after 10 swings.' },
        READ,
      ] },

    // ── Grade 4 ── one instruction per step, short words.
    { id: 'g4_ruler', grades: [4], icon: '📏', title: 'Measure with a ruler',
      blurb: 'Start at 0 and read the other end.',
      lesson: 'Put one end on the 0 mark. Read the mark at the other end. Length is measured in centimetres (cm).',
      steps: [
        { on: 'inst:ruler30', say: 'Tap 📏 the ruler to pick it.' },
        { on: 'spec:pencil4', say: 'Tap ✏️ the pencil to measure it.' },
        { on: 'align:zero',   say: 'Tap 📍 to line up the pencil\'s end with the 0 mark.' },
        READ4,
      ] },
    { id: 'g4_jug', grades: [4], icon: '🫗', title: 'Read a measuring jug',
      blurb: 'Get your eye level with the juice.',
      lesson: 'Keep the jug on a flat table. Bend down so your eye is level with the liquid. Then read the mark.',
      steps: [
        { on: 'inst:jug',         say: 'Tap 🫗 the measuring jug to pick it.' },
        { on: 'spec:juice4',      say: 'Tap 🧃 orange juice to measure it.' },
        { on: 'eye:above',        say: 'Tap 👁️ Eye above — stand tall so your eye is above the juice.' },
        { on: 'misread:apparent', say: 'Read the mark where the dashed line meets the scale — tap ✏️ to record.' },
        { on: 'eye:level',        say: 'Tap 👁️ Eye level — bend down to get your eye level with the juice.' },
        READ4,
      ] },
    { id: 'g4_thermo', grades: [4], icon: '🌡️', title: 'Read a thermometer',
      blurb: 'Count the marks in 2s.',
      lesson: 'Find the last number below the red line. Count on 2 °C for each mark. Temperature is in degrees Celsius (°C).',
      steps: [
        { on: 'inst:thermo4', say: 'Tap 🌡️ the thermometer to pick it.' },
        { on: 'spec:tap4',    say: 'Tap 🚰 tap water to put the thermometer in.' },
        { on: 'zoom',         say: 'Tap 🔍 Zoom in to see the red line.' },
        { on: 'zoom',         say: 'Tap 🔍 Zoom in again — each small mark is 2 °C.' },
        READ4,
      ] },
    { id: 'g4_scale', grades: [4], icon: '⚖️', title: 'Weigh a mango',
      blurb: 'Set the scale to 0, then weigh.',
      lesson: 'Check the pointer is on 0 before you weigh. Mass is measured in grams (g). 1000 g = 1 kg.',
      steps: [
        { on: 'inst:scale4', say: 'Tap ⚖️ the kitchen scale to pick it.' },
        { on: 'tare',        say: 'Tap 0️⃣ to set the pointer to 0 before weighing.' },
        { on: 'spec:mango4', say: 'Tap 🥭 the mango to put it on the scale.' },
        { on: 'zoom',        say: 'Tap 🔍 Zoom in to see the pointer.' },
        READ4,
      ] },
    { id: 'g4_fair', grades: [4], icon: '🔁', title: 'Measure three times',
      blurb: 'Time a ball down a slope - three times.',
      lesson: 'Measure more than once. If one result is odd, do it again. That makes your result fair.',
      steps: [
        { on: 'inst:watch4', say: 'Tap ⏱️ the stopwatch to pick it.' },
        { on: 'spec:ball4',  say: 'Tap ⚽ the ball on the slope.' },
        { on: 'start',       say: 'Tap ▶️ Start — the ball rolls and the stopwatch stops at the bottom.' },
        READ4,
        { on: 'start',       say: 'Tap ▶️ Start to time it again.' },
        READ4,
        { on: 'start',       say: 'Tap ▶️ Start one more time.' },
        READ4,
      ] },

    // ── Grade 7 ──
    { id: 'g7_cyl', grades: [7], icon: '🧪', title: 'Read a measuring cylinder',
      blurb: 'The bottom of the meniscus, at eye level.',
      lesson: 'Keep the cylinder on the bench and bend down. Read the bottom of the meniscus. Volume is in cm³, and 1 cm³ = 1 ml.',
      steps: [
        { on: 'inst:cyl78',   say: 'Tap 🧪 the measuring cylinder to pick it.' },
        { on: 'spec:water78', say: 'Tap 💧 to choose the water in it.' },
        { on: 'zoom',         say: 'Tap 🔍 Zoom in on the water level.' },
        { on: 'zoom',         say: 'Tap 🔍 Zoom in again — see how the surface curves? That is the meniscus.' },
        READ78,
      ] },
    { id: 'g7_displace', grades: [7], icon: '🪨', title: 'Volume of a stone',
      blurb: 'Displacement: final reading − first reading.',
      lesson: 'A stone pushes aside its own volume of water. Volume of the stone = final reading − first reading.',
      steps: [
        { on: 'inst:cyl78',    say: 'Tap 🧪 the measuring cylinder (50 cm³ of water inside).' },
        { on: 'spec:stone78',  say: 'Tap 🪨 to lower the stone in gently on a thread.' },
        { on: 'misread:level', say: 'Try the common mistake — tap ✏️ to write the new level as the volume.' },
        { on: 'read',          say: 'Now subtract the first reading — type the stone\'s actual volume.' },
      ] },
    { id: 'g7_bubble', grades: [7], icon: '🫧', title: 'Beat the air bubble',
      blurb: 'A bubble makes a volume too big.',
      lesson: 'Air takes up space. Tap the glass so no bubble stays stuck to the solid, then read the level.',
      steps: [
        { on: 'inst:cyl78',     say: 'Tap 🧪 the measuring cylinder (40 cm³ of water inside).' },
        { on: 'spec:bubble78',  say: 'Tap 🫧 to lower the rough stone in — see the air bubble stuck to it?' },
        { on: 'misread:bubble', say: 'Tap ✏️ to record the volume with the bubble still there.' },
        { on: 'tap',            say: 'Tap 👆 the glass to free the bubble.' },
        READ78,
      ] },
    { id: 'g7_block', grades: [7], icon: '🧱', title: 'Volume of a block',
      blurb: 'Length × width × height.',
      lesson: 'A regular block needs no water. Measure its three sides and multiply: volume = length × width × height, in cm³.',
      steps: [
        { on: 'inst:block7', say: 'Tap 🧱 the ruler and block to pick them.' },
        { on: 'spec:box7',   say: 'Tap 🧱 the wooden block — its sides are already measured.' },
        { on: 'read',        say: 'Multiply the three sides — type the volume and pick its unit.' },
      ] },
    { id: 'g7_balance', grades: [7], icon: '⚖️', title: 'Weigh a stone',
      blurb: 'Zero the balance, then weigh.',
      lesson: 'Check the empty pan. Press Zero (tare) so it reads 0.0 g. Then the display is the mass, in grams.',
      steps: [
        { on: 'inst:bal78',   say: 'Tap ⚖️ the electronic balance — look at the empty pan.' },
        { on: 'tare',         say: 'Tap 0️⃣ Zero — it reads 2.4 g with nothing on it, not zero!' },
        { on: 'spec:stone78', say: 'Tap 🪨 to put the stone on the pan.' },
        READ78,
      ] },

    // ── Grade 8 ──
    { id: 'g8_block', grades: [8], icon: '⬜', title: 'Density of a metal block',
      blurb: 'Mass ÷ volume for aluminium.',
      lesson: 'Density = mass ÷ volume. Aluminium is 2.7 g/cm³ - more than water\'s 1.0 g/cm³, so it sinks.',
      steps: [
        { on: 'inst:dens8',   say: 'Tap 🧮 the density bench to pick it.' },
        { on: 'spec:alu8',    say: 'Tap ⬜ the aluminium block.' },
        { on: 'misread:flip', say: 'Try the common mistake — tap ✏️ to divide volume ÷ mass.' },
        { on: 'read',         say: 'Now do mass ÷ volume — type the density and pick g/cm³.' },
      ] },
    { id: 'g8_stone', grades: [8], icon: '🪨', title: 'The whole method: a stone',
      blurb: 'Weigh it, find its volume, then divide.',
      lesson: 'Mass from a zeroed balance, volume by displacement, then density = mass ÷ volume: 45 ÷ 18 = 2.5 g/cm³.',
      steps: [
        { on: 'inst:bal78',   say: 'Tap ⚖️ the electronic balance to pick it.' },
        { on: 'tare',         say: 'Tap 0️⃣ Zero with the pan empty.' },
        { on: 'spec:stone78', say: 'Tap 🪨 to put the stone on the pan.' },
        { on: 'read',         say: 'Read the mass in grams — type it and tap Check.' },
        { on: 'inst:cyl78',   say: 'Tap 🧪 the measuring cylinder next.' },
        { on: 'spec:stone78', say: 'Tap 🪨 to lower the same stone into 50 cm³ of water.' },
        { on: 'read',         say: 'Volume = final reading − first reading — type it.' },
        { on: 'inst:dens8',   say: 'Tap 🧮 the density bench.' },
        { on: 'spec:stone8',  say: 'Tap 🪨 the same stone.' },
        { on: 'read',         say: 'Density = mass ÷ volume — type it and pick g/cm³.' },
      ] },
    { id: 'g8_float', grades: [8], icon: '🛟', title: 'Float or sink?',
      blurb: 'Cork and steel: compare each with water.',
      lesson: 'Less dense than water (1.0 g/cm³): it floats. Denser than water: it sinks. Cork is 0.24 g/cm³; steel is 7.9 g/cm³.',
      steps: [
        { on: 'inst:dens8',  say: 'Tap 🧮 the density bench to pick it.' },
        { on: 'spec:cork8',  say: 'Tap 🍾 the cork block.' },
        { on: 'read',        say: 'Work out its density — will it float? Type and check.' },
        { on: 'spec:steel8', say: 'Tap 🔩 the steel block next.' },
        { on: 'read',        say: 'Work out its density — float or sink? Type and check.' },
      ] },
    { id: 'g8_liquid', grades: [8], icon: '🫒', title: 'Density of a liquid',
      blurb: 'Weigh the cylinder empty, then full.',
      lesson: 'Mass of a liquid = full container − empty container. Cooking oil is 0.92 g/cm³, so it floats on water.',
      steps: [
        { on: 'inst:dens8',    say: 'Tap 🧮 the density bench to pick it.' },
        { on: 'spec:oil8',     say: 'Tap 🫒 the cooking oil.' },
        { on: 'misread:total', say: 'Try the common slip — tap ✏️ to use the full reading as the mass.' },
        { on: 'read',          say: 'Subtract the empty cylinder mass, then divide by volume — type the density.' },
      ] },
  ];

  return { GRADES, forGrade, QUANTITIES, WATER, INSTRUMENTS, SPECIMENS, RULE, MENISCUS, PARALLAX, COARSE, parallaxShift, jugCmPerMl,
           round, clean, fmt, parseReading, vernierParts, micrometerParts, stopwatchParts, convert, toKelvin,
           specimensFor, measure, judge, MISTAKE_ORDER, betterFor, mid,
           UNITS, UNIT_CHOICES, UNIT_CHOICES_BY_GRADE, UNIT_HINT, WRONG_UNIT, judgeUnit, countOn, oddOne,
           DISCOVERIES, HAZARDS, SIGN_LABELS, RESULTS, FACTS, FACTS4, FACTS7, FACTS8, FACTS_BY_GRADE, RULES4, RULES_BY_GRADE,
           INTRO_BY_GRADE, HELP_HINT, EMPTY_ICONS, PICS, PICS78, floatPic, MISSIONS, CHOICES, CHOICE_INSTRUMENTS,
           CHOICES4, CHOICE_INSTRUMENTS4, wrongToolReason, GUIDES };
})();
if (typeof window !== 'undefined') window.LabMeasureData = LabMeasureData;
