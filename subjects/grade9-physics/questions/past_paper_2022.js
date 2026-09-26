'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  NCE 2021-2022 Physics (N530) – past-paper questions
//  Source: Mauritius Examinations Syndicate
//    library/g9-2022-physics-ac853f.pdf  (Examiners' Report, 20 pp)
//
//  Q1 is 10 MCQs (items a–j), each 1 mark. Q2–Q5 are structured written
//  questions captured in PSAC_PDF_QUESTIONS below.
//  Items requiring diagram-based image selection are flagged needsArtwork.
//
//  ID format: g9s-pp22p-NNN
//  ⚠ Alt text never names the answer.
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp22p-001', chapterId:'g9s-p1-measurements', subsection:'si_units', difficulty:1,
    learnMore:'📄 NCE 2022 Physics exam.',
    question:'What is the SI unit of <b>mass</b>?',
    options:['kelvin (K)','kilogram (kg)','metre (m)','second (s)'], answer:'kilogram (kg)',
    hint:'Think of the base unit used on a balance or scales.',
    explanation:'The SI unit of mass is the <b>kilogram (kg)</b>. Kelvin is the unit of temperature, metre is the unit of length and second is the unit of time.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp22p-pdf-001', chapterId:'g9s-p5-electricity', subsection:'circuit_symbols', difficulty:1,
    learnMore:'📄 NCE 2022 Physics exam.',
    question:'<img src="assets/past-papers/g9-physics-2022/q1b.png" alt="An electrical circuit with four components labelled A, B, C and D" style="max-width:100%;margin-bottom:8px"><br>Fig. 1.1 shows an electrical circuit. Which labelled component is the <b>cell</b>?',
    options:['A','B','C','D'], answer:'A',
    hint:'A cell is represented by a long line and a short line side by side.',
    explanation:'<b>A</b> is the cell — represented in circuit diagrams by a long line (positive terminal) next to a short thick line (negative terminal). B is the bulb, C is the switch and D is the resistor.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp22p-002', chapterId:'g9s-p1-measurements', subsection:'measuring_instruments', difficulty:1,
    learnMore:'📄 NCE 2022 Physics exam.',
    question:'Which instrument is used to measure <b>length</b>?',
    options:['A ruler','A clock','A balance','A thermometer'], answer:'A ruler',
    hint:'Which one has a scale marked in centimetres or metres?',
    explanation:'A <b>ruler</b> measures length. A clock measures time, a balance measures mass and a thermometer measures temperature.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp22p-003', chapterId:'g9s-p3-energy', subsection:'comparing_energy_sources', difficulty:1,
    learnMore:'📄 NCE 2022 Physics exam.',
    question:'Which one of the following is a <b>non-polluting</b> source of energy?',
    options:['Bagasse','Diesel','Wind','Wood'], answer:'Wind',
    hint:'Non-polluting means it produces no harmful emissions when generating electricity.',
    explanation:'<b>Wind</b> is non-polluting — turbines produce no emissions. Bagasse, diesel and wood all release combustion products (CO₂, smoke) when burned.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp22p-004', chapterId:'g9s-p5-electricity', subsection:'circuit_symbols', difficulty:1,
    learnMore:'📄 NCE 2022 Physics exam.',
    question:'What is the <b>function of a switch</b> in an electric circuit?',
    options:['It opens and closes the circuit','It carries electrical energy to the circuit','It is the source of energy in the circuit','It resists the flow of current'], answer:'It opens and closes the circuit',
    hint:'What does pressing a light switch do to the circuit?',
    explanation:'A switch <b>opens and closes the circuit</b>, controlling whether current can flow. When open, the circuit is broken and no current flows; when closed, the circuit is complete.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp22p-005', chapterId:'g9s-p4-motion', subsection:'scalars_vectors', difficulty:1,
    learnMore:'📄 NCE 2022 Physics exam.',
    question:'Which one of the following is a <b>scalar quantity</b>?',
    options:['Acceleration','Displacement','Speed','Velocity'], answer:'Speed',
    hint:'A scalar has magnitude only — no direction.',
    explanation:'<b>Speed</b> is a scalar — it has magnitude (e.g. 10 m/s) but no direction. Acceleration, displacement and velocity all require a direction to be fully described, so they are vectors.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp22p-006', chapterId:'g9s-p2-light', subsection:'luminous_objects', difficulty:1,
    learnMore:'📄 NCE 2022 Physics exam.',
    question:'What is a <b>luminous object</b>?',
    options:['An object that absorbs light','An object that reflects light','An object that refracts light','An object that produces light'], answer:'An object that produces light',
    hint:'Luminous comes from lumen — light.',
    explanation:'A luminous object is one that <b>produces its own light</b>. The Sun, fire and a glowing bulb are luminous. The Moon is non-luminous — it only reflects sunlight.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp22p-007', chapterId:'g9s-p3-energy', subsection:'conservation_of_energy', difficulty:1,
    learnMore:'📄 NCE 2022 Physics exam.',
    question:'Which formula is used to calculate the <b>kinetic energy</b> (KE) of a moving object?',
    options:['mgh','½mv²','ma','mv'], answer:'½mv²',
    hint:'KE depends on mass and how fast the object moves.',
    explanation:'Kinetic energy is calculated using <b>KE = ½mv²</b>, where m is mass (kg) and v is speed (m/s). The formula mgh gives gravitational potential energy, ma gives force and mv gives momentum.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp22p-pdf-002', chapterId:'g9s-p2-light', subsection:'laws_of_reflection', difficulty:1,
    learnMore:'📄 NCE 2022 Physics exam.',
    question:'<img src="assets/past-papers/g9-physics-2022/q1i.png" alt="The letter F in front of a plane mirror with four possible images labelled A, B, C and D" style="max-width:100%;margin-bottom:8px"><br>Fig. 1.2 shows the letter F in front of a plane mirror. Which one of the four options shows the <b>correct image of the letter F</b> formed in the plane mirror?',
    options:['A','B','C','D'], answer:'D',
    hint:'A plane mirror produces a laterally inverted image — left and right are swapped.',
    explanation:'The correct image is <b>D</b>. A plane mirror reverses left and right (lateral inversion), so the horizontal strokes of the F point in the opposite direction. The image is upright and the same size as the object.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp22p-008', chapterId:'g9s-p4-motion', subsection:'speed_velocity', difficulty:2,
    learnMore:'📄 NCE 2022 Physics exam.',
    question:'An athlete is running. Which one of the following could be the <b>average speed</b> of the athlete?',
    options:['0.05 m/s','5 m/s','50 m/s','500 m/s'], answer:'5 m/s',
    hint:'Think about how fast a person runs. 1 m/s ≈ 3.6 km/h.',
    explanation:'A running athlete typically reaches about <b>5 m/s</b> (≈ 18 km/h). 0.05 m/s is barely moving; 50 m/s would be faster than a car on a motorway; 500 m/s is approaching the speed of sound.' })
);

// ─── Written questions (Q2–Q5) ───────────────────────────────────────────
window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp22p-pdf-003', chapterId:'g9s-p3-energy', marks:4, year:2022, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q2 (b). In a thermal power station, energy is transformed at the furnace (L) and at the generator (N). (i) State the energy transformation at the furnace L. (ii) State the energy transformation at the generator N.',
    markScheme:'(i) At furnace L: chemical energy → heat (thermal) energy. (ii) At generator N: kinetic energy → electrical energy.' }
);

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp22p-pdf-004', chapterId:'g9s-p3-energy', marks:2, year:2022, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q2 (c). Give <b>one advantage</b> of thermal power stations.',
    markScheme:'Any one of: (1) can generate large amounts of electricity; (2) reliable — not dependent on weather; (3) fuel (coal, oil, gas) is readily available in many countries; (4) can respond quickly to changes in demand.' }
);

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp22p-pdf-005', chapterId:'g9s-p1-measurements', marks:3, year:2022, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q3 (a). A stone is placed in a measuring cylinder containing water. (i) The water level before adding the stone is 20 cm³ and after is 43 cm³. What is the <b>volume of the water</b>? (ii) What is the <b>volume of the stone</b>?',
    markScheme:'(i) Volume of water = 20 cm³ (the initial reading before the stone was added). (ii) Volume of stone = 43 − 20 = 23 cm³. Wait — re-reading: water level was 20 before, 43 after, so stone volume = 43 − 20 = 23 cm³. The 2022 paper states water = 20 cm³, stone = 23 cm³.' }
);

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp22p-pdf-006', chapterId:'g9s-p1-measurements', marks:3, year:2022, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q3 (c). A student uses a Vernier calliper to measure the diameter of a marble. The main scale reading is 4.50 cm and the Vernier scale reading is 0.07 cm. (i) State the main scale reading. (ii) State the Vernier scale reading. (iii) Calculate the diameter of the marble.',
    markScheme:'(i) 4.50 cm. (ii) 0.07 cm. (iii) Diameter = 4.50 + 0.07 = <b>4.57 cm</b>.' }
);
