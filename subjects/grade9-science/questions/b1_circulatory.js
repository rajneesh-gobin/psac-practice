'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Science - B1 · Blood Circulatory System   (examWeight 3)
//
//  ⚠ MAGNIFICATION WAS THE PREREQUISITE FOR THIS CHAPTER. `magnification` is a
//    declared subsection, and blueprint-science §M.6.5 warns that Biology
//    "needs a known physical scale for magnification items" - without one the
//    marks are unreachable. The figure below therefore carries a SCALE BAR
//    drawn to a stated length, and every magnification item supplies both the
//    drawing size and the real size in the same unit. Nothing asks a child to
//    measure the screen: a screen has no known size, and an item that depends
//    on one is unmarkable on a phone.
//
//  ⚠ MAGNIFICATION = IMAGE SIZE / ACTUAL SIZE, and the answer has NO UNIT. Both
//    lengths must be in the same unit before dividing - which is the step the
//    papers actually award the mark for, so several items make the conversion
//    the point rather than hiding it.
//
//  ⚠ BIOLOGY IS 92.6% VISUAL (§X.4). Blood vessel cross-sections and a supplied
//    health-data graph are drawn as inline SVG here.
//
//  ⚠ <i> IS AN HTML BREAKOUT TAG AND MUST NEVER APPEAR INSIDE AN <svg>.
//
//  Source: NCE Science (Biology) 2021-2025; NCF Grades 7-9 §B1.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-b1-circulatory';

// ── A drawing of a red blood cell with a scale bar of a STATED length.
//    The bar is what makes a magnification question answerable.
const cellDrawing = () =>
  '<svg viewBox="0 0 230 150" width="240" role="img" aria-label="a drawing of a cell with a scale bar">' +
  '<ellipse cx="112" cy="66" rx="58" ry="40" fill="#fecaca" stroke="#b91c1c" stroke-width="2"/>' +
  '<ellipse cx="112" cy="66" rx="26" ry="18" fill="#fca5a5" stroke="#b91c1c" stroke-width="1.5"/>' +
  '<line x1="54" y1="120" x2="170" y2="120" stroke="#0f172a" stroke-width="2"/>' +
  '<line x1="54" y1="114" x2="54" y2="126" stroke="#0f172a" stroke-width="2"/>' +
  '<line x1="170" y1="114" x2="170" y2="126" stroke="#0f172a" stroke-width="2"/>' +
  '<text x="112" y="140" font-size="10" text-anchor="middle" fill="#0f172a">drawing is 58 mm wide</text>' +
  '</svg>';

// ── Cross-sections of the three vessel types, lettered so an item can ask
//    which is which without printing the names.
const vessels = () => {
  const one = (cx, wall, lumen, letter) =>
    '<circle cx="' + cx + '" cy="60" r="' + (lumen + wall) + '" fill="#fecaca" stroke="#b91c1c" stroke-width="2"/>' +
    '<circle cx="' + cx + '" cy="60" r="' + lumen + '" fill="#ffffff" stroke="#b91c1c" stroke-width="1.5"/>' +
    '<text x="' + cx + '" y="118" font-size="12" font-weight="bold" text-anchor="middle" fill="#1d4ed8">' + letter + '</text>';
  return '<svg viewBox="0 0 280 130" width="280" role="img" aria-label="three cross-sections drawn to the same scale">' +
    one(52, 16, 12, 'A') + one(140, 6, 26, 'B') + one(228, 2, 6, 'C') +
    '<text x="140" y="14" font-size="9" text-anchor="middle" fill="#334155">all drawn to the same scale</text>' +
    '</svg>';
};

// ── Supplied health data: deaths from heart disease against daily salt intake.
const healthGraph = () => {
  const X0 = 44, Y0 = 118, X1 = 236, Y1 = 20;
  const pts = [[0, 10], [1, 18], [2, 30], [3, 46], [4, 58]];
  const sx = i => X0 + (i / 4) * (X1 - X0);
  const sy = v => Y0 - (v / 60) * (Y0 - Y1);
  let g = '<svg viewBox="0 0 250 150" width="270" role="img" aria-label="a graph of supplied data">';
  for (let v = 0; v <= 60; v += 20) {
    g += '<line x1="' + X0 + '" y1="' + sy(v).toFixed(1) + '" x2="' + X1 + '" y2="' + sy(v).toFixed(1) + '" stroke="#e2e8f0"/>';
    g += '<text x="' + (X0 - 5) + '" y="' + (sy(v) + 3).toFixed(1) + '" font-size="9" text-anchor="end" fill="#334155">' + v + '</text>';
  }
  g += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X1 + '" y2="' + Y0 + '" stroke="#0f172a" stroke-width="2"/>';
  g += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X0 + '" y2="' + Y1 + '" stroke="#0f172a" stroke-width="2"/>';
  ['2', '4', '6', '8', '10'].forEach((t, i) => {
    g += '<text x="' + sx(i).toFixed(1) + '" y="' + (Y0 + 13) + '" font-size="9" text-anchor="middle" fill="#334155">' + t + '</text>';
  });
  g += '<text x="140" y="144" font-size="9" text-anchor="middle" fill="#334155">salt eaten each day / g</text>';
  g += '<text x="12" y="70" font-size="9" text-anchor="middle" fill="#334155" transform="rotate(-90 12 70)">deaths per 1000</text>';
  g += '<path d="' + pts.map((p, i) => (i ? 'L' : 'M') + sx(p[0]).toFixed(1) + ' ' + sy(p[1]).toFixed(1)).join(' ') +
       '" fill="none" stroke="#b91c1c" stroke-width="2.5"/>';
  pts.forEach(p => { g += '<circle cx="' + sx(p[0]).toFixed(1) + '" cy="' + sy(p[1]).toFixed(1) + '" r="3" fill="#b91c1c"/>'; });
  return g + '</svg>';
};

const CELL = cellDrawing(), VESSELS = vessels(), GRAPH = healthGraph();

const MCQ = [
  ['g9s-b1-001', 'circulatory_overview', 1,
   'The circulatory system is made up of the blood, the blood vessels and:',
   ['The heart', 'The lungs', 'The kidneys', 'The stomach'], 'The heart',
   'It is the pump that drives the blood.',
   'Blood, blood vessels and the heart together make up the circulatory system.'],

  ['g9s-b1-002', 'circulatory_overview', 1,
   'What is the main job of the heart?',
   ['To pump blood around the body', 'To take oxygen out of the air',
    'To digest the food that is eaten', 'To remove waste from the blood'],
   'To pump blood around the body',
   'It is a muscular pump.',
   'The heart is a muscular pump that keeps blood moving through the vessels.'],

  ['g9s-b1-003', 'circulatory_overview', 2,
   'Which of these does the blood NOT transport?',
   ['Light from the eyes to the brain', 'Oxygen to the body cells',
    'Digested food to all of the body cells', 'Carbon dioxide to the lungs'],
   'Light from the eyes to the brain',
   'Three of these are really carried in the blood.',
   'Blood carries oxygen, dissolved food and carbon dioxide; light is not transported by blood at all.'],

  ['g9s-b1-004', 'components_of_blood', 1,
   'Which part of the blood is the pale yellow liquid?',
   ['Plasma', 'Red blood cells', 'White blood cells', 'Platelets'],
   'Plasma',
   'It is the liquid the other parts float in.',
   'Plasma is the straw-coloured liquid in which the cells and platelets are carried.'],

  ['g9s-b1-005', 'components_of_blood', 1,
   'Which part of the blood carries oxygen?',
   ['Red blood cells', 'White blood cells', 'Platelets', 'Plasma'],
   'Red blood cells',
   'They contain haemoglobin.',
   'Red blood cells contain haemoglobin, which binds oxygen and carries it to the body cells.'],

  ['g9s-b1-006', 'components_of_blood', 2,
   'What is the main job of the white blood cells?',
   ['To defend the body against disease',
    'To carry oxygen around the body',
    'To help the blood to clot at a wound',
    'To carry dissolved food to the cells'],
   'To defend the body against disease',
   'They are part of the body defences.',
   'White blood cells fight infection by engulfing microbes and producing antibodies.'],

  ['g9s-b1-007', 'components_of_blood', 2,
   'What is the main job of the platelets?',
   ['To help the blood clot when a vessel is cut',
    'To carry oxygen from the lungs',
    'To fight microbes that enter the body',
    'To carry hormones around the body'],
   'To help the blood clot when a vessel is cut',
   'They act at a wound.',
   'Platelets help the blood to clot, which seals a wound and stops further blood loss.'],

  ['g9s-b1-008', 'components_of_blood', 3,
   'A person has too few red blood cells. Which symptom would you expect?',
   ['Tiredness, because less oxygen reaches the body cells',
    'Frequent bleeding from a wound that will not stop',
    'Many infections, one after another',
    'Blood that clots far too quickly'],
   'Tiredness, because less oxygen reaches the body cells',
   'Match the symptom to the job of the missing cells.',
   'Fewer red cells means less oxygen delivered, so the person tires easily - the condition called anaemia.'],

  ['g9s-b1-009', 'components_of_blood', 3,
   'Why does a red blood cell have no nucleus?',
   ['It leaves more room to carry oxygen',
    'It makes the cell live much longer',
    'It allows the cell to divide more often',
    'It helps the cell to fight infection'],
   'It leaves more room to carry oxygen',
   'Think about what fills the cell instead.',
   'Losing the nucleus leaves more space for haemoglobin, so each cell carries more oxygen.'],

  ['g9s-b1-010', 'blood_vessels', 1,
   'Which vessel carries blood away from the heart?',
   ['An artery', 'A vein', 'A capillary', 'The plasma'], 'An artery',
   'The A goes away.',
   'Arteries carry blood away from the heart; veins return it.'],

  ['g9s-b1-011', 'blood_vessels', 1,
   'Which vessel carries blood back towards the heart?',
   ['A vein', 'An artery', 'A capillary', 'The plasma'], 'A vein',
   'The opposite of an artery.',
   'Veins carry blood back towards the heart.'],

  ['g9s-b1-012', 'blood_vessels', 2,
   'The three vessels shown are drawn to the same scale. Which is the artery?<br>' + VESSELS,
   ['A, because it has the thickest wall',
    'B, because it has the widest space inside',
    'C, because it is the smallest of the three',
    'None of them, because arteries have no wall'],
   'A, because it has the thickest wall',
   'An artery carries blood at high pressure.',
   'A has much the thickest, most muscular wall, which is what withstands the high pressure from the heart.'],

  ['g9s-b1-013', 'blood_vessels', 2,
   'The three vessels shown are drawn to the same scale. Which is the capillary?<br>' + VESSELS,
   ['C, because it is tiny with a very thin wall',
    'A, because it has the thickest wall',
    'B, because it has the widest space inside',
    'None of them, because capillaries are not vessels'],
   'C, because it is tiny with a very thin wall',
   'A capillary wall is one cell thick.',
   'C is the smallest with the thinnest wall, which is what lets substances pass through it easily.'],

  ['g9s-b1-014', 'blood_vessels', 3,
   'Why is the wall of a capillary only one cell thick?',
   ['So oxygen and food can pass quickly into the cells around it',
    'So the blood can be pumped at a much higher pressure',
    'So the capillary can stretch to hold more blood',
    'So the blood flows through it as fast as possible'],
   'So oxygen and food can pass quickly into the cells around it',
   'Exchange is what a capillary is for.',
   'A wall one cell thick gives a very short diffusion distance, so exchange with the surrounding tissue is fast.'],

  ['g9s-b1-015', 'blood_vessels', 3,
   'Why do veins contain valves while arteries do not?',
   ['The blood in veins is at low pressure and could flow backwards',
    'The blood in veins is at higher pressure than in arteries',
    'Veins are much closer to the heart than arteries',
    'Veins carry blood that contains no oxygen at all'],
   'The blood in veins is at low pressure and could flow backwards',
   'Think about what stops the blood going the wrong way.',
   'Vein blood is at low pressure, so valves are needed to keep it flowing one way, back towards the heart.'],

  ['g9s-b1-016', 'magnification', 2,
   'The drawing shown is 58 mm wide. The real cell is 0.0058 mm wide. What is the magnification?<br>' + CELL,
   ['10 000', '1000', '100', '58 000'], '10 000',
   'Magnification = drawing size &divide; real size.',
   '58 &divide; 0.0058 = 10 000. Magnification has no unit.'],

  ['g9s-b1-017', 'magnification', 2,
   'Which formula gives the magnification of a drawing?',
   ['Magnification = drawing size &divide; real size',
    'Magnification = real size &divide; drawing size',
    'Magnification = drawing size &times; real size',
    'Magnification = drawing size + real size'],
   'Magnification = drawing size &divide; real size',
   'A bigger drawing of the same object means a bigger magnification.',
   'Magnification is how many times larger the drawing is: drawing size divided by real size.'],

  ['g9s-b1-018', 'magnification', 3,
   'Why does a magnification have no unit?',
   ['It is a length divided by a length, so the units cancel',
    'It is always measured in millimetres',
    'It is always a whole number',
    'It is measured in the same unit as the drawing'],
   'It is a length divided by a length, so the units cancel',
   'Look at what is divided by what.',
   'Both quantities are lengths in the same unit, so the units cancel and the answer is a plain number.'],

  ['g9s-b1-019', 'magnification', 3,
   'A cell is 0.02 mm across and is drawn 40 mm across. What must be done before dividing?',
   ['Nothing: both lengths are already in millimetres',
    'The drawing must be converted into micrometres',
    'The real size must be converted into metres',
    'Both lengths must first be converted into centimetres'],
   'Nothing: both lengths are already in millimetres',
   'Check the units of each measurement first.',
   'Both are in millimetres, so they can be divided directly: 40 &divide; 0.02 = 2000.'],

  ['g9s-b1-020', 'pulse', 1,
   'What is a <b>pulse</b>?',
   ['The stretching of an artery each time the heart beats',
    'The sound the heart makes as it closes its valves',
    'The amount of blood pumped in one minute',
    'The pressure of blood inside a vein'],
   'The stretching of an artery each time the heart beats',
   'It can be felt where an artery runs near the skin.',
   'Each heartbeat sends a surge of blood that stretches the artery wall - that stretch is the pulse.'],

  ['g9s-b1-021', 'pulse', 2,
   'Where can a pulse most easily be felt?',
   ['At the wrist, where an artery runs near the skin',
    'On the back of the hand, directly over a vein',
    'On the forehead, over the skull',
    'On the knee, over the joint'],
   'At the wrist, where an artery runs near the skin',
   'A pulse is felt over an artery, not a vein.',
   'The artery at the wrist runs close to the surface, so its stretch can be felt easily.'],

  ['g9s-b1-022', 'pulse', 2,
   'What happens to the pulse rate during hard exercise?',
   ['It rises, because the muscles need more oxygen',
    'It falls, because the body is saving energy',
    'It stays exactly the same throughout',
    'It stops until the exercise is finished'],
   'It rises, because the muscles need more oxygen',
   'Think about what working muscles need more of.',
   'Exercising muscles need more oxygen and glucose, so the heart beats faster and the pulse rate rises.'],

  ['g9s-b1-023', 'cardiovascular_disease', 2,
   'What happens during a <b>heart attack</b>?',
   ['The blood supply to part of the heart muscle is blocked',
    'The blood supply to part of the brain is blocked',
    'The lungs fill with fluid and stop working',
    'The kidneys stop filtering the blood'],
   'The blood supply to part of the heart muscle is blocked',
   'The name says which organ is affected.',
   'A blocked coronary artery starves part of the heart muscle of oxygen, which is a heart attack.'],

  ['g9s-b1-024', 'cardiovascular_disease', 2,
   'What happens during a <b>stroke</b>?',
   ['The blood supply to part of the brain is interrupted',
    'The blood supply to part of the heart is interrupted',
    'The blood becomes too thin to clot at a wound',
    'The lungs take in too much oxygen at once'],
   'The blood supply to part of the brain is interrupted',
   'A stroke affects a different organ from a heart attack.',
   'A stroke happens when the blood supply to part of the brain is cut off or a vessel there bursts.'],

  ['g9s-b1-025', 'cardiovascular_disease', 2,
   'Which of these increases the risk of cardiovascular disease?',
   ['Smoking', 'Regular exercise', 'Eating fruit and vegetables', 'Sleeping well'],
   'Smoking',
   'Three of these protect the heart.',
   'Smoking damages the blood vessels and raises the risk of heart attack and stroke.'],

  ['g9s-b1-026', 'cardiovascular_disease', 3,
   'Which change would most reduce a person&rsquo;s risk of a heart attack?',
   ['Taking regular exercise and eating less fatty food',
    'Sleeping for an extra hour each afternoon',
    'Drinking more sweet fizzy drinks each day',
    'Watching less television in the evening'],
   'Taking regular exercise and eating less fatty food',
   'Two changes act directly on the heart and vessels.',
   'Exercise strengthens the heart and a low-fat diet reduces the fatty deposits that block arteries.'],

  ['g9s-b1-027', 'interpreting_health_data', 3,
   'The graph shows deaths from heart disease against the amount of salt eaten. What does it show?<br>' + GRAPH,
   ['Deaths rise as salt intake rises',
    'Deaths fall as salt intake rises',
    'Deaths stay the same at every salt intake',
    'There is no pattern in the data at all'],
   'Deaths rise as salt intake rises',
   'Follow the line from left to right.',
   'The line rises steadily from left to right, so a higher salt intake goes with more deaths.'],

  ['g9s-b1-028', 'interpreting_health_data', 3,
   'Reading the same graph, roughly how many deaths per 1000 occur at a salt intake of 6 g per day?<br>' + GRAPH,
   ['30', '10', '46', '58'], '30',
   'Go up from 6 on the horizontal axis to the line, then across.',
   'At 6 g the line is level with 30 on the vertical axis.'],

  ['g9s-b1-029', 'interpreting_health_data', 3,
   'The graph shows deaths rising with salt intake. What does that NOT prove on its own?',
   ['That the salt is what causes the deaths',
    'That the two measurements rise together',
    'That deaths are higher at 10 g than at 2 g',
    'That the pattern is the same across the range'],
   'That the salt is what causes the deaths',
   'Two things rising together is not the same as one causing the other.',
   'The graph shows a correlation; proving cause needs further evidence, because something else could explain both.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const NUM = [
  ['g9s-b1-030', 'magnification', 2,
   'A drawing of a cell is 60 mm wide. The real cell is 0.006 mm wide. Calculate the magnification.',
   10000, 'Magnification = drawing size &divide; real size.',
   '60 &divide; 0.006 = 10 000.'],
  ['g9s-b1-031', 'magnification', 3,
   'A drawing of a cell is 40 mm wide. The real cell is 0.02 mm wide. Calculate the magnification.',
   2000, 'Both lengths are already in millimetres.', '40 &divide; 0.02 = 2000.'],
  ['g9s-b1-032', 'magnification', 3,
   'A cell 0.05 mm across is drawn at a magnification of 400. Calculate the width of the drawing, in mm.',
   20, 'Drawing size = real size &times; magnification.', '0.05 &times; 400 = 20 mm.'],
  ['g9s-b1-033', 'pulse', 2,
   'A pupil counts 18 pulse beats in 15 seconds. Calculate the pulse rate in beats per minute.',
   72, 'There are four lots of 15 seconds in a minute.', '18 &times; 4 = 72 beats per minute.'],
  ['g9s-b1-034', 'pulse', 3,
   'A pupil counts 35 beats in 30 seconds. Calculate the pulse rate in beats per minute.',
   70, 'Double the count for 30 seconds.', '35 &times; 2 = 70 beats per minute.'],
];

NUM.forEach(([id, subsection, difficulty, question, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeNum({ id, chapterId: CH, subsection, difficulty,
    question, answer, hint, explanation }));
});

const SHORT = [
  ['g9s-b1-035', 'components_of_blood', 1,
   'Name the liquid part of the blood.',
   'Plasma', ['the plasma', 'blood plasma'],
   'It is pale yellow.', 'Plasma is the liquid part of the blood.'],
  ['g9s-b1-036', 'components_of_blood', 2,
   'Name the red pigment in red blood cells that carries oxygen.',
   'Haemoglobin', ['hemoglobin', 'haemoglobin.'],
   'It gives blood its colour.', 'Haemoglobin binds oxygen and carries it round the body.'],
  ['g9s-b1-037', 'blood_vessels', 1,
   'Name the type of blood vessel that carries blood away from the heart.',
   'Artery', ['an artery', 'arteries'],
   'A for away.', 'Arteries carry blood away from the heart.'],
  ['g9s-b1-038', 'blood_vessels', 2,
   'Name the smallest blood vessels, whose walls are one cell thick.',
   'Capillaries', ['capillary', 'a capillary'],
   'Exchange happens across them.',
   'Capillaries are the tiniest vessels, where exchange with the tissues takes place.'],
  ['g9s-b1-039', 'magnification', 2,
   'Write the formula used to calculate magnification.',
   'Magnification = drawing size / real size',
   ['drawing size / real size', 'image size / actual size',
    'magnification = image size / actual size', 'drawing/real'],
   'It is one length divided by another.',
   'Magnification = drawing (image) size divided by real (actual) size.'],
  ['g9s-b1-040', 'cardiovascular_disease', 2,
   'State one lifestyle change that reduces the risk of cardiovascular disease.',
   'Stop smoking',
   ['take regular exercise', 'eat less fat', 'exercise', 'stop smoking',
    'eat less salt', 'eat a healthy diet', 'do not smoke'],
   'Think about smoking, diet or exercise.',
   'Not smoking, exercising regularly and eating less fat and salt all lower the risk.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

})();
