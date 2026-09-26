'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  NCE 2023 Physics (N530) – past-paper questions
//  Source: Mauritius Examinations Syndicate
//    library/g9-2023-physics-e109b8.pdf  (Examiners' Report, 29 pp)
//
//  Q1 is 10 MCQs (items a–j), each 1 mark. Q2–Q6 are structured written
//  questions captured in PSAC_PDF_QUESTIONS below.
//  Items requiring diagram-based image selection are flagged needsArtwork.
//
//  ID format: g9s-pp23p-NNN
//  ⚠ Alt text never names the answer.
// ══════════════════════════════════════════════════════════════════════════

// Q1(a) originally shows 4 instrument images; rephrased as text.
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp23p-001', chapterId:'g9s-p1-measurements', subsection:'measuring_instruments', difficulty:1,
    learnMore:'📄 NCE 2023 Physics exam.',
    question:'Which instrument is used to measure <b>mass</b>?',
    options:['Electronic balance','Measuring cylinder','Ruler','Thermometer'], answer:'Electronic balance',
    hint:'Mass is the amount of matter in an object.',
    explanation:'An <b>electronic balance</b> measures mass in grams or kilograms. A measuring cylinder measures volume, a ruler measures length and a thermometer measures temperature.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp23p-002', chapterId:'g9s-p3-energy', subsection:'non_renewable_sources', difficulty:1,
    learnMore:'📄 NCE 2023 Physics exam.',
    question:'Which one of the following is a <b>non-renewable</b> source of energy?',
    options:['Coal','Falling water','Solar energy','Wind'], answer:'Coal',
    hint:'Non-renewable means it cannot be replenished at the rate it is used.',
    explanation:'<b>Coal</b> is non-renewable — it was formed over millions of years from organic matter and cannot be replaced on a human timescale. Falling water (hydroelectric), solar and wind are all renewable.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp23p-pdf-001', chapterId:'g9s-p5-electricity', subsection:'circuit_symbols', difficulty:1,
    learnMore:'📄 NCE 2023 Physics exam.',
    question:'<img src="assets/past-papers/g9-physics-2023/q1c.png" alt="Four electrical circuit symbols labelled A, B, C and D" style="max-width:100%;margin-bottom:8px"><br>Which electrical symbol represents an <b>open switch</b>?',
    options:['A','B','C','D'], answer:'D',
    hint:'An open switch has a gap — the conducting arm is raised away from the contact point.',
    explanation:'<b>D</b> is the open switch symbol — a line hinged at one end and lifted at an angle, showing the circuit is broken. A is a cell, B is a resistor and C is a voltmeter.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp23p-003', chapterId:'g9s-p1-measurements', subsection:'si_units', difficulty:1,
    learnMore:'📄 NCE 2023 Physics exam.',
    question:'What is the SI unit of <b>length</b>?',
    options:['kelvin (K)','kilogram (kg)','metre (m)','second (s)'], answer:'metre (m)',
    hint:'Think of the base unit on a ruler or measuring tape.',
    explanation:'The SI unit of length is the <b>metre (m)</b>. Kelvin is temperature, kilogram is mass and second is time.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp23p-004', chapterId:'g9s-p1-measurements', subsection:'measuring_instruments', difficulty:2,
    learnMore:'📄 NCE 2023 Physics exam.',
    question:'A clinical thermometer has a scale from 35 °C to 42 °C. Which of the following temperatures can be measured with this thermometer?',
    options:['17 °C','27 °C','37 °C','47 °C'], answer:'37 °C',
    hint:'The temperature must fall within the range of the scale.',
    explanation:'Only <b>37 °C</b> lies within the clinical thermometer's range of 35–42 °C. The values 17 °C and 27 °C are below 35 °C and 47 °C is above 42 °C, so none of those can be read on this instrument.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp23p-pdf-002', chapterId:'g9s-p2-light', subsection:'laws_of_reflection', difficulty:1,
    learnMore:'📄 NCE 2023 Physics exam.',
    question:'<img src="assets/past-papers/g9-physics-2023/q1f.png" alt="Object P placed in front of a plane mirror with four possible image positions labelled A, B, C and D" style="max-width:100%;margin-bottom:8px"><br>Fig. 1.2 shows object P placed in front of a plane mirror. Circle the letter which shows the <b>correct position of the image</b> formed.',
    options:['A','B','C','D'], answer:'B',
    hint:'The image in a plane mirror is as far behind the mirror as the object is in front, at the same height.',
    explanation:'<b>B</b> is the correct position. The image in a plane mirror is virtual and forms the same distance behind the mirror as the object is in front, at the same height as the object.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp23p-005', chapterId:'g9s-p4-motion', subsection:'scalars_vectors', difficulty:1,
    learnMore:'📄 NCE 2023 Physics exam.',
    question:'Which one of the following is a <b>vector quantity</b>?',
    options:['Acceleration','Distance','Mass','Speed'], answer:'Acceleration',
    hint:'A vector has both magnitude and direction.',
    explanation:'<b>Acceleration</b> is a vector — it has both magnitude (e.g. 5 m/s²) and direction (e.g. northward). Distance, mass and speed are scalars — they have magnitude only.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp23p-006', chapterId:'g9s-p4-motion', subsection:'speed_velocity', difficulty:1,
    learnMore:'📄 NCE 2023 Physics exam.',
    question:'Which quantity is defined as the <b>distance travelled per unit time</b>?',
    options:['Acceleration','Displacement','Speed','Velocity'], answer:'Speed',
    hint:'This is the basic formula: quantity = distance ÷ time.',
    explanation:'<b>Speed</b> is defined as the distance travelled per unit time (speed = distance ÷ time). Velocity is similar but includes direction. Acceleration is the rate of change of velocity, and displacement is a directed distance.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp23p-pdf-003', chapterId:'g9s-p2-light', subsection:'laws_of_reflection', difficulty:2,
    learnMore:'📄 NCE 2023 Physics exam.',
    question:'<img src="assets/past-papers/g9-physics-2023/q1i.png" alt="Four ray diagrams showing reflection of light at a plane mirror labelled A, B, C and D" style="max-width:100%;margin-bottom:8px"><br>Which one of the following ray diagrams shows the <b>correct reflection</b> of light at a plane mirror?',
    options:['A','B','C','D'], answer:'D',
    hint:'The angle of incidence equals the angle of reflection, both measured from the normal to the mirror.',
    explanation:'<b>D</b> shows the correct reflection. The incident and reflected rays are on the same side of the mirror, and the angle of incidence equals the angle of reflection (both measured from the normal). In A the ray passes through the mirror (refraction), not reflection.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp23p-007', chapterId:'g9s-p1-measurements', subsection:'accuracy_of_instruments', difficulty:2,
    learnMore:'📄 NCE 2023 Physics exam.',
    question:'A regular pencil is placed next to a ruler. Which one of the following is most likely to be the <b>diameter of the pencil</b>?',
    options:['6 km','6 m','6 cm','6 mm'], answer:'6 mm',
    hint:'Hold a pencil — it is about the width of a small finger.',
    explanation:'A typical pencil has a diameter of about <b>6 mm</b> (0.6 cm). 6 cm would be as wide as a tin can, 6 m would be taller than a room, and 6 km is the size of a small town.' })
);

// ─── Written questions (Q2–Q6) ───────────────────────────────────────────
window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp23p-pdf-004', chapterId:'g9s-p2-light', marks:3, year:2023, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q3 (a). Classify each of the following as <b>luminous</b> or <b>non-luminous</b>: lighted torch, Sun, Moon, plane mirror, book.',
    markScheme:'Luminous: lighted torch, Sun. Non-luminous: Moon, plane mirror, book. (Luminous objects produce their own light; non-luminous objects only reflect light from another source.)' }
);

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp23p-pdf-005', chapterId:'g9s-p2-light', marks:2, year:2023, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q3 (c). A student tries to look at a candle through a bent tube but cannot see it. State what this observation shows about the nature of light.',
    markScheme:'Light travels in straight lines (rectilinear propagation). The bend in the tube blocks the path of the straight-travelling light rays from the candle.' }
);

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp23p-pdf-006', chapterId:'g9s-p5-electricity', marks:2, year:2023, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q4 (c)(i)(ii). An ammeter is used to measure the current flowing in a lamp. (i) Which circuit shows the correct position of the ammeter? (ii) Give a reason for your answer.',
    markScheme:'(i) The circuit with the ammeter in series with the lamp (the right-hand diagram in Fig. 4.2). (ii) An ammeter must be connected in series so that the same current flows through both the ammeter and the lamp; in parallel the ammeter would read a different current.' }
);

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp23p-pdf-007', chapterId:'g9s-p5-electricity', marks:2, year:2023, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q4 (d). A current of 0.5 A flows in a circuit for 8 s. Calculate the <b>amount of charge</b> that flows. Show your working.',
    markScheme:'Q = I × t = 0.5 × 8 = <b>4.0 C</b>.' }
);

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp23p-pdf-008', chapterId:'g9s-p3-energy', marks:2, year:2023, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q5 (a). Fig. 5.1 shows an apple at three positions K, L and M as it falls from a tree (K is highest, M is at the ground). (i) In which position does the apple have minimum <b>potential energy</b>? (ii) In which position does the apple have minimum <b>kinetic energy</b>?',
    markScheme:'(i) M — gravitational potential energy is least when the object is at the lowest point. (ii) K — the apple starts from rest so its kinetic energy is zero (minimum) at the top.' }
);

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp23p-pdf-009', chapterId:'g9s-p4-motion', marks:2, year:2023, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q5 (b)(ii). A pendulum bob makes 40 complete oscillations in 30 s. Calculate the <b>time period</b> of the pendulum.',
    markScheme:'Period = total time ÷ number of oscillations = 30 ÷ 40 = <b>0.75 s</b>.' }
);

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp23p-pdf-010', chapterId:'g9s-p3-energy', marks:2, year:2023, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q5 (c). A glass jar has a metal lid that is too tight to open. A student tries three methods: Method 1 — place the lid under warm water; Method 2 — place the whole jar in warm water; Method 3 — place the lid in ice. (i) Which method will allow the student to open the lid? (ii) Give a reason.',
    markScheme:'(i) Method 1. (ii) The warm water heats the metal lid, causing it to expand and loosen its grip on the glass jar, making it easier to turn.' }
);

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp23p-pdf-011', chapterId:'g9s-p1-measurements', marks:2, year:2023, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q5 (d)(i)(ii). The volumes of two stones are measured using two measuring cylinders X and Y with different initial water levels. After both stones are fully submerged, the water levels are equal. (i) Name the method used to measure the volume of the stones. (ii) Which cylinder contained the greater volume of water initially — X or Y?',
    markScheme:'(i) Displacement method. (ii) Cylinder X — because the stone in X displaces a smaller volume of water than the stone in Y. So X needed more water to begin with for the final levels to be equal.' }
);

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp23p-pdf-012', chapterId:'g9s-p4-motion', marks:3, year:2023, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q6. A speed-time graph shows a car's motion. The car accelerates uniformly from rest to 8 m/s in the first 6 s, then moves at constant speed from 6 s to 12 s, then accelerates to 14 m/s at 14 s, then decelerates to 0 m/s at 18 s. (b) For which time interval does the car move at constant speed? (d) Calculate the maximum acceleration. Show your working.',
    markScheme:'(b) 6 s – 12 s (the flat section of the graph). (d) Maximum acceleration occurs where the gradient is steepest: the deceleration from 14 m/s to 0 m/s in (18 − 14) = 4 s → a = 14 ÷ 4 = <b>3.5 m/s²</b>.' }
);
