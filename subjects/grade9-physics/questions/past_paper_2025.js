'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  NCE 2025 Physics (N530) – past-paper questions
//  Sources: Mauritius Examinations Syndicate
//    library/g9-2025-physics-034b13.pdf  (Question Paper, 16 pp)
//    library/g9-2025-physics-5db5b4.pdf  (Examiners' Report, 10+ pp)
//
//  MCQ answer key confirmed from Table 2 of the Examiners' Report:
//    (a) C  (b) B  (c) C  (d) A  (e) D  (f) D  (g) B  (h) B  (i) A  (j) C
//
//  Q1 is 10 MCQs (items a–j), each 1 mark. Q2–Q6 are structured written
//  questions captured in PSAC_PDF_QUESTIONS below.
//  Items requiring diagram-based selection are flagged needsArtwork.
//
//  ID format: g9s-pp25p-NNN
//  ⚠ Alt text never names the answer.
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp25p-001', chapterId:'g9s-p1-measurements', subsection:'measuring_instruments', difficulty:1,
    learnMore:'📄 NCE 2025 Physics exam.',
    question:'Which physical quantity is measured using a <b>balance</b>?',
    options:['Diameter','Length','Mass','Temperature'], answer:'Mass',
    hint:'A balance compares how much matter is in an object.',
    explanation:'A balance measures <b>mass</b> — the amount of matter in an object, measured in kilograms or grams. Diameter and length are measured with a ruler or calliper; temperature is measured with a thermometer.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp25p-pdf-001', chapterId:'g9s-p5-electricity', subsection:'circuit_symbols', difficulty:1,
    learnMore:'📄 NCE 2025 Physics exam.',
    question:'<img src="assets/past-papers/g9-physics-2025/q1b.png" alt="Four circuit diagrams labelled A, B, C and D each showing a cell connected to bulbs with different switch configurations" style="max-width:100%;margin-bottom:8px"><br>Which of the following circuit diagrams shows a <b>closed electric circuit</b>?',
    options:['A','B','C','D'], answer:'B',
    hint:'A closed circuit has no gaps — the switch must be in the closed position.',
    explanation:'<b>B</b> shows a closed circuit — all components are connected and the switch is closed, so current can flow. A, C and D each contain an open switch that breaks the circuit.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp25p-002', chapterId:'g9s-p1-measurements', subsection:'measurement_errors', difficulty:2,
    learnMore:'📄 NCE 2025 Physics exam.',
    question:'When reading the volume of a liquid in a measuring cylinder, where should the observer\'s <b>line of sight</b> be aligned for an accurate reading?',
    options:['Above the top of the meniscus','At the top of the curved surface','At the bottom of the curved surface','Below the bottom of the meniscus'], answer:'At the bottom of the curved surface',
    hint:'The meniscus of most liquids curves downward in the centre.',
    explanation:'The line of sight must be level with the <b>bottom of the meniscus</b> (the lowest point of the curved liquid surface). Reading from above or below introduces parallax error and gives an incorrect volume.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp25p-003', chapterId:'g9s-p2-light', subsection:'laws_of_reflection', difficulty:2,
    learnMore:'📄 NCE 2025 Physics exam.',
    question:'Fig. 1.2 shows a ray of light reflecting from a plane mirror. Four angles are labelled: <i>a</i> is between the incident ray and the mirror surface, <i>b</i> is between the incident ray and the normal, <i>c</i> is between the reflected ray and the normal, and <i>d</i> is between the reflected ray and the mirror surface. Which pair of angles are <b>equal</b>?',
    options:['b and c','b and d','a and b','a and c'], answer:'b and c',
    hint:'Apply the first law of reflection.',
    explanation:'By the first law of reflection, the <b>angle of incidence equals the angle of reflection</b>, both measured from the normal to the mirror. Angle b is the angle of incidence and angle c is the angle of reflection, so <b>b = c</b>.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp25p-004', chapterId:'g9s-p1-measurements', subsection:'accuracy_of_instruments', difficulty:1,
    learnMore:'📄 NCE 2025 Physics exam.',
    question:'Which of the following is the <b>most reasonable estimate</b> of the height of a pupil\'s school desk?',
    options:['0.08 cm','0.8 cm','8 cm','80 cm'], answer:'80 cm',
    hint:'Stand next to a desk — roughly how high does it reach?',
    explanation:'A typical school desk is about <b>80 cm</b> tall (roughly waist height for a seated student). 8 cm is barely above the floor; 0.8 cm and 0.08 cm are smaller than a pencil.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp25p-005', chapterId:'g9s-p2-light', subsection:'luminous_objects', difficulty:1,
    learnMore:'📄 NCE 2025 Physics exam.',
    question:'Which of the following is <b>luminous</b>?',
    options:['Gold','Moon','Rock','Sun'], answer:'Sun',
    hint:'Luminous objects produce their own light.',
    explanation:'The <b>Sun</b> is luminous — it generates its own light by nuclear fusion. Gold, Moon and rock are all non-luminous; they can only reflect light that falls on them.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp25p-006', chapterId:'g9s-p4-motion', subsection:'speed_time_graphs', difficulty:2,
    learnMore:'📄 NCE 2025 Physics exam.',
    question:'A speed-time graph shows an object accelerating uniformly from 2 m/s at t = 0 to 6 m/s at t = 10 s. What is the speed of the object at <b>t = 5 s</b>?',
    options:['7.5 m/s','4.0 m/s','2.5 m/s','0.0 m/s'], answer:'4.0 m/s',
    hint:'The speed increases at a steady rate. Find the midpoint.',
    explanation:'The speed rises uniformly from 2 to 6 m/s over 10 s — a rate of 0.4 m/s per second. At t = 5 s: speed = 2 + (0.4 × 5) = 2 + 2 = <b>4.0 m/s</b>. Alternatively, 5 s is the midpoint in time, so the speed is the midpoint between 2 and 6, which is also 4 m/s.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp25p-007', chapterId:'g9s-p4-motion', subsection:'acceleration', difficulty:2,
    learnMore:'📄 NCE 2025 Physics exam.',
    question:'A car increases its speed from <b>20 m/s</b> to <b>60 m/s</b> in <b>5 s</b>. What is the acceleration of the car?',
    options:['4 m/s²','8 m/s²','12 m/s²','16 m/s²'], answer:'8 m/s²',
    hint:'Use a = (v − u) ÷ t.',
    explanation:'a = (v − u) ÷ t = (60 − 20) ÷ 5 = 40 ÷ 5 = <b>8 m/s²</b>.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp25p-008', chapterId:'g9s-p3-energy', subsection:'electricity_production', difficulty:2,
    learnMore:'📄 NCE 2025 Physics exam.',
    question:'What is the <b>energy transformation</b> that takes place in a thermal power station?',
    options:['Chemical → Heat → Kinetic → Electrical',
             'Heat → Chemical → Kinetic → Electrical',
             'Electrical → Kinetic → Heat → Chemical',
             'Kinetic → Heat → Chemical → Electrical'],
    answer:'Chemical → Heat → Kinetic → Electrical',
    hint:'Fuel is burned first; think about what happens next at the turbine and generator.',
    explanation:'In a thermal power station: (1) fuel (chemical energy) is burned in a furnace → (2) heat boils water into steam → (3) steam drives turbines (kinetic energy) → (4) turbines spin a generator producing <b>electrical energy</b>.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp25p-009', chapterId:'g9s-p5-electricity', subsection:'current_voltage_resistance', difficulty:1,
    learnMore:'📄 NCE 2025 Physics exam.',
    question:'What is the <b>unit of resistance</b>?',
    options:['coulomb (C)','joule (J)','ohm (Ω)','volt (V)'], answer:'ohm (Ω)',
    hint:'Named after the German physicist Georg Simon Ohm.',
    explanation:'Electrical resistance is measured in <b>ohms (Ω)</b>. The coulomb is the unit of charge, the joule is the unit of energy and the volt is the unit of potential difference.' })
);

// ─── Written questions (Q2–Q6) ───────────────────────────────────────────
window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp25p-pdf-002', chapterId:'g9s-p4-motion', marks:1, year:2025, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q2 (a). Define the <b>time period</b> of a simple pendulum.',
    markScheme:'The time period is the time taken for the pendulum bob to complete one full oscillation (one complete swing from X to Z and back to X).' }
);

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp25p-pdf-003', chapterId:'g9s-p4-motion', marks:5, year:2025, grade:9,
    subject:'Science (Physics)', type:'short',
    image:'assets/past-papers/g9-physics-2025/q2b.png',
    question:'Q2 (b). Fig. 2.1 shows a stopwatch. (i) Read the time shown on the stopwatch, in seconds. [3 marks] (ii) The time shown is the time taken for a pendulum to make 30 complete swings. Calculate the time period of the pendulum. [2 marks]',
    markScheme:'(i) The small minute dial points to 1 minute; the large second dial points to 36 s. Total = 60 + 36 = <b>96 s</b>. (1 mark: minute dial on 1; 1 mark: second dial on 36; 1 mark: correct total 96 s.) (ii) Time period = 96 ÷ 30 = <b>3.2 s</b>.' }
);

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp25p-pdf-004', chapterId:'g9s-p2-light', marks:5, year:2025, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q3. A girl stands 120 cm from a plane mirror. A photo frame hangs on a wall 210 cm behind her. (a) The girl raises her right arm. Explain why her LEFT arm appears to be raised in the mirror. (b) Give two other characteristics of an image formed in a plane mirror. (c) What is the distance between the girl and the image of the photo frame she sees in the mirror?',
    markScheme:'(a) Lateral inversion — the plane mirror reverses left and right, so the right arm in reality appears as the left arm in the reflection. (b) Any two of: virtual / same size as the object / upright / image distance = object distance. (c) The photo frame is 120 + 210 = 330 cm from the mirror. Its image is 330 cm behind the mirror. Distance from girl to image of photo frame = 120 + 330 = <b>450 cm</b>.' }
);

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp25p-pdf-005', chapterId:'g9s-p3-energy', marks:9, year:2025, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q4. Table 4.1 lists energy sources: Diesel, Wind, Sun, Coal. (a)(i) Put a tick (✓) beside all non-renewable sources. (a)(ii) Give one advantage of renewable sources. (b) Match each statement in Column A to its energy form: Energy due to motion → ? ; Energy produced by a vibrating guitar string → ? ; Energy stored in a compressed spring → ? ; Energy that enables us to see → ? (c) Tick two physical quantities needed to calculate gravitational potential energy (Mass, Speed, Time, Height). (d)(i) Four identical bags W, X, Y, Z are on different shelves (W highest, Z lowest). Which has maximum GPE?',
    markScheme:'(a)(i) Diesel ✓, Coal ✓. (a)(ii) Any one of: renewable / does not run out / no pollution / free fuel. (b) Motion → Kinetic energy; Guitar string → Sound energy; Compressed spring → Potential energy; Enables seeing → Light energy. (c) Mass ✓ and Height ✓. (d)(i) W (highest shelf → greatest height → maximum GPE).' }
);

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp25p-pdf-006', chapterId:'g9s-p4-motion', marks:7, year:2025, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q5. Fig. 5.1 shows the motion of a car. The car moves at 5 m/s from t = 0 to t = 10 s, then accelerates to 12 m/s between t = 10 s and t = 20 s, then moves at constant speed to t = 30 s. (a) At what time does the car start to accelerate? (b) For how long does the car accelerate? (d) For how long does the car move at constant speed during its journey? (e) What is the maximum speed reached during the journey?',
    markScheme:'(a) t = 10 s. (b) 20 − 10 = 10 s. (d) Constant speed in two phases: 0–10 s (10 s) + 20–30 s (10 s) = 20 s total. (e) 12 m/s.' }
);

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp25p-pdf-007', chapterId:'g9s-p5-electricity', marks:8, year:2025, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q6 (b)(i)–(iii). A student sets up a circuit with a battery, Lamp X, Instrument P (in parallel with the lamp) and Instrument Q (in series). (i) What is the function of the battery? (ii) Identify instruments P and Q. (iii) Which physical quantity does instrument Q measure? (iv) Will lamp X light up? Explain. (c) A current of 3 A flows in a resistor for 2 s. Calculate the amount of charge that flows.',
    markScheme:'(i) The battery provides the electromotive force (emf) / source of electrical energy to drive the current. (ii) P is connected in parallel → P is a voltmeter. Q is connected in series → Q is an ammeter. (iii) Q measures current. (iv) Lamp X will not light up — the circuit has a gap (open circuit) so no current flows. (c) Q = I × t = 3 × 2 = <b>6 C</b>.' }
);
