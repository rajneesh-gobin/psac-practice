'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  NCE 2020-2021 Physics (N530) – past-paper questions
//  Source: Mauritius Examinations Syndicate
//    library/g9-2021-physics-e94613.pdf  (Examiners' Report, 25 pp)
//
//  Q1 is 10 MCQs (items a–j), each worth 1 mark. Q2–Q6 are structured
//  written questions captured in PSAC_PDF_QUESTIONS below.
//  Items that require a diagram not reproducible in text are flagged
//  needsArtwork: true and kept only in PSAC_PDF_QUESTIONS.
//
//  ID format: g9s-pp21p-NNN
//  ⚠ Alt text never names the answer.
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp21p-001', chapterId:'g9s-p1-measurements', subsection:'si_units', difficulty:1,
    learnMore:'📄 NCE 2021 Physics exam.',
    question:'Which one of the following is a <b>physical quantity</b>?',
    options:['Kelvin','Kilogram','Metre','Volume'], answer:'Volume',
    hint:'A physical quantity is something you can measure. The others are all SI units.',
    explanation:'<b>Volume</b> is a physical quantity — a property of matter that can be measured. Kelvin, kilogram and metre are SI <i>units</i>, not quantities. The corresponding quantities are temperature, mass and length.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp21p-002', chapterId:'g9s-p1-measurements', subsection:'si_units', difficulty:1,
    learnMore:'📄 NCE 2021 Physics exam.',
    question:'What is the SI unit of <b>work</b>?',
    options:['joule (J)','newton (N)','second (s)','watt (W)'], answer:'joule (J)',
    hint:'Think about the unit used for energy.',
    explanation:'Work is a form of energy, so its SI unit is the <b>joule (J)</b>. The newton is the unit of force, the second is the unit of time, and the watt is the unit of power.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp21p-003', chapterId:'g9s-p5-electricity', subsection:'circuit_symbols', difficulty:1,
    learnMore:'📄 NCE 2021 Physics exam.',
    question:'In an electric circuit diagram, a component is represented by a <b>rectangle (□)</b>. What does this symbol represent?',
    options:['Battery','Bulb','Cell','Resistor'], answer:'Resistor',
    hint:'The rectangle is the standard IEC symbol for a component that opposes current flow.',
    explanation:'A <b>resistor</b> is drawn as a rectangle in circuit diagrams. A cell is drawn as a long and a short line, a battery is two or more such pairs, and a bulb (lamp) is drawn as a circle with a cross inside.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp21p-004', chapterId:'g9s-p4-motion', subsection:'scalars_vectors', difficulty:1,
    learnMore:'📄 NCE 2021 Physics exam.',
    question:'Which one of the following is a <b>vector quantity</b>?',
    options:['Distance','Displacement','Speed','Time'], answer:'Displacement',
    hint:'A vector has both magnitude and direction.',
    explanation:'<b>Displacement</b> is a vector — it records how far an object has moved AND in which direction. Distance, speed and time are scalars; they have magnitude but no direction.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp21p-005', chapterId:'g9s-p3-energy', subsection:'conservation_of_energy', difficulty:2,
    learnMore:'📄 NCE 2021 Physics exam.',
    question:'A rubber band is stretched and held in position. What is the <b>form of energy stored</b> in the stretched rubber band?',
    options:['Chemical energy','Heat energy','Kinetic energy','Potential energy'], answer:'Potential energy',
    hint:'The band is stationary but ready to move. What type of stored energy does a stretched object have?',
    explanation:'A stretched rubber band stores <b>elastic potential energy</b>, a form of potential energy. Kinetic energy requires movement; chemical and heat energy are not stored by stretching.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp21p-006', chapterId:'g9s-p2-light', subsection:'luminous_objects', difficulty:1,
    learnMore:'📄 NCE 2021 Physics exam.',
    question:'Which of the following are <b>non-luminous</b> bodies?',
    options:['Clouds','Stars','Glowing fireflies','Lighted candles'], answer:'Clouds',
    hint:'Non-luminous means the object does not produce its own light.',
    explanation:'<b>Clouds</b> are non-luminous — they reflect sunlight but do not produce light of their own. Stars, glowing fireflies and lighted candles all generate their own light, so they are luminous.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp21p-007', chapterId:'g9s-p1-measurements', subsection:'measuring_instruments', difficulty:2,
    learnMore:'📄 NCE 2021 Physics exam.',
    question:'A laboratory thermometer has a scale that starts at −10 °C and ends at 110 °C. What is the <b>range</b> of temperatures that can be measured with this thermometer?',
    options:['from −10 °C to 100 °C','from −10 °C to 110 °C','from 0 °C to 110 °C','from 0 °C to 100 °C'], answer:'from −10 °C to 110 °C',
    hint:'The range goes from the lowest to the highest value on the scale.',
    explanation:'The thermometer scale begins at −10 °C and ends at 110 °C, so the <b>range is −10 °C to 110 °C</b>. The range is defined by both ends of the scale, not just the positive part.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp21p-008', chapterId:'g9s-p4-motion', subsection:'speed_time_graphs', difficulty:2,
    learnMore:'📄 NCE 2021 Physics exam.',
    question:'A speed-time graph of a car shows a <b>straight line sloping downward</b> from top-left to bottom-right. Which statement about the motion of the car is correct?',
    options:['moving with increasing speed','moving with decreasing speed','moving with increasing acceleration','moving with decreasing acceleration'], answer:'moving with decreasing speed',
    hint:'Read the y-axis (speed) as you move from left to right along the time axis.',
    explanation:'A downward slope on a speed-time graph means speed is falling over time, so the car is <b>decelerating</b> — moving with decreasing speed. Acceleration is the gradient; a straight (constant) slope means constant acceleration, not changing acceleration.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp21p-009', chapterId:'g9s-p2-light', subsection:'refraction', difficulty:2,
    learnMore:'📄 NCE 2021 Physics exam.',
    question:'A pencil is placed in a glass of water and appears to be broken at the water surface. What is the cause of this effect?',
    options:['Reflection','Absorption','Refraction','Convergence'], answer:'Refraction',
    hint:'Light changes direction when it passes from one medium into another.',
    explanation:'<b>Refraction</b> is the bending of light as it passes from one medium (water) into another (air). The pencil looks broken because the light from the submerged part bends at the water surface, changing its apparent position.' })
);

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp21p-010', chapterId:'g9s-p5-electricity', subsection:'charge_and_current', difficulty:2,
    learnMore:'📄 NCE 2021 Physics exam.',
    question:'A kettle is switched on for <b>2 minutes</b>. A current of <b>10 A</b> flows in the circuit. What is the amount of charge that flows through a given point in the circuit?',
    options:['1200 C','20 C','5 C','0.2 C'], answer:'1200 C',
    hint:'Use Q = It. Remember to convert minutes to seconds first.',
    explanation:'Using <b>Q = It</b>: time = 2 min = 120 s; Q = 10 A × 120 s = <b>1200 C</b>. Common mistakes are forgetting to convert minutes to seconds (giving 20 C) or dividing instead of multiplying.' })
);

// ─── Written questions from the structured section (Q2–Q6) ───────────────
window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp21p-pdf-001', chapterId:'g9s-p2-light', marks:2, year:2021, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q2 (a). State <b>two</b> properties of an image formed in a plane mirror.',
    markScheme:'Any two of: (1) virtual / cannot be formed on a screen; (2) same size as the object; (3) laterally inverted / left–right reversed; (4) upright / erect; (5) image distance = object distance (image appears as far behind the mirror as the object is in front).' }
);

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp21p-pdf-002', chapterId:'g9s-p2-light', marks:3, year:2021, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q2 (b). A man of height 170 cm stands 48 cm in front of a plane mirror. (i) State the height of his image. (ii) Calculate the distance of the image from the mirror.',
    markScheme:'(i) 170 cm — the image in a plane mirror is the same height as the object. (ii) Image distance = object distance = 48 cm. (The image is 48 cm behind the mirror, so the man is 48 + 48 = 96 cm from his own image.)' }
);

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp21p-pdf-003', chapterId:'g9s-p3-energy', marks:3, year:2021, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q3 (a)(i). Classify each source as polluting (P) or non-polluting (NP): Fossil fuels, Charcoal, Wind.',
    markScheme:'Fossil fuels → P; Charcoal → P; Wind → NP. (Burning fossil fuels and charcoal releases CO₂ and other pollutants. Wind energy produces no emissions during operation.)' }
);

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp21p-pdf-004', chapterId:'g9s-p3-energy', marks:2, year:2021, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q3 (a)(ii). Give <b>one</b> disadvantage of hydroelectric power.',
    markScheme:'Any one of: (1) depends on rainfall — drought reduces output; (2) flooding of land upstream harms the environment / displaces communities; (3) very high construction cost; (4) suitable rivers needed / limited to certain locations.' }
);

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp21p-pdf-005', chapterId:'g9s-p5-electricity', marks:1, year:2021, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q4 (b)(i). Define <b>electrical resistance</b>.',
    markScheme:'Electrical resistance is the opposition to the flow of electric current in a circuit. It is measured in ohms (Ω).' }
);

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp21p-pdf-006', chapterId:'g9s-p5-electricity', marks:2, year:2021, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q4 (b)(ii). Two resistors X (6 Ω) and Y (2 Ω) are connected in series. Calculate the <b>combined resistance</b>. Show your working.',
    markScheme:'R_total = R_X + R_Y = 6 + 2 = <b>8 Ω</b>. In a series circuit, resistances add directly.' }
);

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp21p-pdf-007', chapterId:'g9s-p4-motion', marks:2, year:2021, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q5 (a). A car travels 200 m in 10 s. Calculate its <b>average speed</b>. Show your working.',
    markScheme:'Speed = distance ÷ time = 200 ÷ 10 = <b>20 m/s</b>.' }
);

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp21p-pdf-008', chapterId:'g9s-p4-motion', marks:2, year:2021, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q5 (b). A car accelerates uniformly from 20 m/s to 44 m/s in 8 s. Calculate its <b>acceleration</b>. Show your working.',
    markScheme:'a = (v − u) ÷ t = (44 − 20) ÷ 8 = 24 ÷ 8 = <b>3 m/s²</b>.' }
);

window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp21p-pdf-009', chapterId:'g9s-p4-motion', marks:2, year:2021, grade:9,
    subject:'Science (Physics)', type:'short',
    question:'Q5 (d). Using the speed-time data from Q5 (a) and Q5 (b) — the car travels at 20 m/s then accelerates to 44 m/s over 8 s — calculate the <b>distance covered during the acceleration phase</b>.',
    markScheme:'Distance = average speed × time = ½(u + v) × t = ½(20 + 44) × 8 = ½ × 64 × 8 = <b>256 m</b>.' }
);
