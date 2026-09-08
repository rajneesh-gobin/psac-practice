'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Science - P1 · Measurements   (examWeight 3, raised from 2 after
//  this file was written; see below)
//
//  ⚠ THE WEIGHT WAS WRONG AND HAS SINCE BEEN FIXED — this chapter is now 3,
//    not the 2 this file was written against. blueprint-science.md §M.6.7 asked
//    for it to be raised, and the whole grade9-science set was rederived on
//    2026-09-08 (see the derivation block in _manifest.js). ⚠ The old weights
//    summed to 47 rather than 40, which is not cosmetic: assembleExamPaper()
//    sheds the surplus off the FIRST chapter in list order, so one chapter can
//    be dealt a single question instead of eight while the paper still totals
//    40 and every test passes. Not derived from scripts/exam-mark-maps.json —
//    that file carries no Grade 9 entries.
//
//  ⚠ READING A SCALE IS A FORMAT, NOT A TOPIC. The papers print a ruler, a
//    measuring cylinder or a thermometer and ask for the reading; the answer
//    cannot be produced without the figure. Every scale below is inline SVG
//    with real graduations, so it can genuinely be read.
//
//  ⚠ PARALLAX AND ZERO ERROR ARE THE TWO NAMED ERRORS in the syllabus, and the
//    papers ask them by name. Both are drawn rather than described.
//
//  ⚠ <i> IS AN HTML BREAKOUT TAG AND MUST NEVER APPEAR INSIDE AN <svg>.
//
//  Source: NCE Science (Physics) 2021-2023, 2025; NCF Grades 7-9 §P1.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-p1-measurements';

// ── A measuring cylinder holding `ml` of liquid, graduated every 10 cm3 to 50.
const cylinder = (ml) => {
  const TOP = 18, BOT = 130, MAXV = 50;
  const y = v => BOT - (v / MAXV) * (BOT - TOP);
  let g = '<svg viewBox="0 0 150 152" width="150" role="img" aria-label="a measuring cylinder holding a liquid">';
  g += '<rect x="45" y="' + TOP + '" width="52" height="' + (BOT - TOP) + '" fill="none" stroke="#0f172a" stroke-width="2"/>';
  g += '<rect x="46" y="' + y(ml).toFixed(1) + '" width="50" height="' + (BOT - y(ml)).toFixed(1) + '" fill="#bfdbfe"/>';
  g += '<path d="M 46 ' + y(ml).toFixed(1) + ' Q 71 ' + (y(ml) + 4).toFixed(1) + ' 96 ' + y(ml).toFixed(1) +
       '" fill="none" stroke="#1d4ed8" stroke-width="1.5"/>';
  for (let v = 0; v <= MAXV; v += 10) {
    g += '<line x1="45" y1="' + y(v).toFixed(1) + '" x2="60" y2="' + y(v).toFixed(1) + '" stroke="#0f172a" stroke-width="1.5"/>';
    g += '<text x="41" y="' + (y(v) + 3).toFixed(1) + '" font-size="9" text-anchor="end" fill="#334155">' + v + '</text>';
  }
  for (let v = 5; v < MAXV; v += 10) {
    g += '<line x1="45" y1="' + y(v).toFixed(1) + '" x2="53" y2="' + y(v).toFixed(1) + '" stroke="#64748b" stroke-width="1"/>';
  }
  g += '<text x="112" y="76" font-size="9" fill="#334155">cm&#179;</text>';
  return g + '</svg>';
};

// ── A ruler with an object lying on it from `a` to `b` cm (0-10 cm scale).
const ruler = (a, b) => {
  const X0 = 20, X1 = 230, TOP = 40;
  const x = c => X0 + (c / 10) * (X1 - X0);
  let g = '<svg viewBox="0 0 250 100" width="270" role="img" aria-label="an object lying beside a ruler">';
  g += '<rect x="' + X0 + '" y="' + TOP + '" width="' + (X1 - X0) + '" height="34" fill="#fef9c3" stroke="#0f172a" stroke-width="1.5"/>';
  for (let c = 0; c <= 10; c++) {
    g += '<line x1="' + x(c).toFixed(1) + '" y1="' + TOP + '" x2="' + x(c).toFixed(1) + '" y2="' + (TOP + 12) + '" stroke="#0f172a" stroke-width="1.5"/>';
    g += '<text x="' + x(c).toFixed(1) + '" y="' + (TOP + 26) + '" font-size="9" text-anchor="middle" fill="#334155">' + c + '</text>';
  }
  for (let c = 0.5; c < 10; c += 1) {
    g += '<line x1="' + x(c).toFixed(1) + '" y1="' + TOP + '" x2="' + x(c).toFixed(1) + '" y2="' + (TOP + 7) + '" stroke="#64748b" stroke-width="1"/>';
  }
  // ⚠ The unit sat at (X1-4, TOP+32), which collided with the "10" tick label
  //   three pixels away and printed as an unreadable overlap. Found by
  //   rendering the contact sheet and looking at it, not by any assertion:
  //   both labels were inside the viewBox, so the clipping check passed.
  g += '<text x="' + X1 + '" y="' + (TOP + 46) + '" font-size="8" text-anchor="end" fill="#64748b">cm</text>';
  g += '<rect x="' + x(a).toFixed(1) + '" y="16" width="' + (x(b) - x(a)).toFixed(1) + '" height="16" fill="#94a3b8" stroke="#0f172a" stroke-width="1.5"/>';
  return g + '</svg>';
};

// ── An eye placed correctly (level) or badly (above) beside a scale, for the
//    parallax items. The reading itself is never printed.
const parallax = (where) => {
  const eyeY = where === 'level' ? 62 : 24;
  return '<svg viewBox="0 0 220 120" width="240" role="img" aria-label="an eye positioned beside a scale">' +
    '<rect x="70" y="20" width="42" height="86" fill="none" stroke="#0f172a" stroke-width="2"/>' +
    '<rect x="71" y="58" width="40" height="47" fill="#bfdbfe"/>' +
    '<line x1="70" y1="62" x2="86" y2="62" stroke="#0f172a" stroke-width="1.5"/>' +
    '<line x1="70" y1="40" x2="82" y2="40" stroke="#64748b" stroke-width="1"/>' +
    '<line x1="70" y1="84" x2="82" y2="84" stroke="#64748b" stroke-width="1"/>' +
    '<ellipse cx="176" cy="' + eyeY + '" rx="15" ry="9" fill="none" stroke="#0f172a" stroke-width="2"/>' +
    '<circle cx="176" cy="' + eyeY + '" r="4" fill="#0f172a"/>' +
    '<line x1="161" y1="' + eyeY + '" x2="112" y2="62" stroke="#b91c1c" stroke-width="1.5" stroke-dasharray="4 3"/>' +
    '<text x="176" y="' + (eyeY + 24) + '" font-size="9" text-anchor="middle" fill="#334155">eye</text>' +
    '</svg>';
};

const MCQ = [
  ['g9s-p1-001', 'si_units', 1,
   'What is the SI unit of length?',
   ['Metre', 'Centimetre', 'Kilometre', 'Millimetre'], 'Metre',
   'The SI unit is the base one, not a multiple of it.',
   'The SI unit of length is the metre (m); centimetres and kilometres are multiples of it.'],

  ['g9s-p1-002', 'si_units', 1,
   'What is the SI unit of mass?',
   ['Kilogram', 'Gram', 'Newton', 'Litre'], 'Kilogram',
   'It is the only base unit here with a prefix built in.',
   'The SI unit of mass is the kilogram (kg).'],

  ['g9s-p1-003', 'si_units', 1,
   'What is the SI unit of time?',
   ['Second', 'Minute', 'Hour', 'Day'], 'Second',
   'The base unit, not a multiple of it.',
   'The SI unit of time is the second (s).'],

  ['g9s-p1-004', 'si_units', 2,
   'Which unit is used for volume in a school laboratory?',
   ['Cubic centimetre', 'Square centimetre', 'Centimetre', 'Gram'],
   'Cubic centimetre',
   'Volume is a measurement in three directions.',
   'Volume is measured in cubic centimetres (cm&#179;); a square centimetre is an area and a centimetre is a length.'],

  ['g9s-p1-005', 'si_units', 2,
   'Which quantity is measured in degrees Celsius?',
   ['Temperature', 'Mass', 'Volume', 'Time'], 'Temperature',
   'It is read from a thermometer.',
   'Temperature is measured in degrees Celsius in the laboratory (the SI unit is the kelvin).'],

  ['g9s-p1-006', 'measuring_instruments', 1,
   'Which instrument is used to measure the volume of a liquid?',
   ['A measuring cylinder', 'A ruler', 'A balance', 'A stopwatch'],
   'A measuring cylinder',
   'It is graduated in cubic centimetres.',
   'A measuring cylinder is graduated in cm&#179; and is used to measure the volume of a liquid.'],

  ['g9s-p1-007', 'measuring_instruments', 1,
   'Which instrument is used to measure mass?',
   ['A balance', 'A ruler', 'A thermometer', 'A measuring cylinder'],
   'A balance',
   'It compares or weighs the amount of matter.',
   'Mass is measured with a balance.'],

  ['g9s-p1-008', 'measuring_instruments', 1,
   'Which instrument is used to measure a short interval of time?',
   ['A stopwatch', 'A thermometer', 'A balance', 'A ruler'], 'A stopwatch',
   'It is started and stopped by hand.',
   'A stopwatch measures the time taken by an event.'],

  ['g9s-p1-009', 'measuring_instruments', 2,
   'Which instrument would you choose to measure the thickness of a single sheet of paper most accurately?',
   ['A micrometer screw gauge', 'A metre rule',
    'A measuring cylinder', 'A stopwatch'],
   'A micrometer screw gauge',
   'The measurement is far smaller than one millimetre.',
   'A micrometer measures to a hundredth of a millimetre, which a metre rule cannot approach.'],

  ['g9s-p1-010', 'measuring_instruments', 2,
   'How is the volume of a small stone found with a measuring cylinder?',
   ['By the rise in the water level when the stone is lowered in',
    'By weighing the stone carefully on an accurate balance',
    'By measuring the stone from end to end with a ruler',
    'By timing how long the stone takes to sink to the bottom'],
   'By the rise in the water level when the stone is lowered in',
   'The stone pushes the water up.',
   'The stone displaces its own volume of water, so the rise in the level is the volume of the stone.'],

  ['g9s-p1-011', 'measuring_instruments', 3,
   'Read the measuring cylinder shown. What is the volume of the liquid?<br>' + cylinder(30),
   ['30 cm&#179;', '20 cm&#179;', '35 cm&#179;', '40 cm&#179;'], '30 cm&#179;',
   'Read the mark at the bottom of the curved surface.',
   'The bottom of the meniscus sits on the 30 mark, so the volume is 30 cm&#179;.'],

  ['g9s-p1-012', 'measuring_instruments', 3,
   'Read the measuring cylinder shown. What is the volume of the liquid?<br>' + cylinder(25),
   ['25 cm&#179;', '20 cm&#179;', '30 cm&#179;', '15 cm&#179;'], '25 cm&#179;',
   'The small marks are every 5 cm&#179;.',
   'The level is halfway between 20 and 30, on the 25 mark, so the volume is 25 cm&#179;.'],

  ['g9s-p1-013', 'measuring_instruments', 3,
   'Read the ruler shown. How long is the grey object?<br>' + ruler(2, 7),
   ['5 cm', '7 cm', '2 cm', '9 cm'], '5 cm',
   'Subtract the reading at one end from the reading at the other.',
   'The object runs from the 2 cm mark to the 7 cm mark, so its length is 7 - 2 = 5 cm.'],

  ['g9s-p1-014', 'measuring_instruments', 3,
   'Read the ruler shown. How long is the grey object?<br>' + ruler(1, 4.5),
   ['3.5 cm', '4.5 cm', '3 cm', '5.5 cm'], '3.5 cm',
   'The small marks are every half centimetre.',
   'The object runs from 1 cm to 4.5 cm, so its length is 4.5 - 1 = 3.5 cm.'],

  ['g9s-p1-015', 'accuracy_of_instruments', 2,
   'Which instrument gives the more accurate measurement of a length of about 4 cm?',
   ['A ruler marked in millimetres', 'A ruler marked in centimetres only',
    'A metre rule marked in decimetres', 'A tape marked every 5 cm'],
   'A ruler marked in millimetres',
   'Smaller divisions give a more precise reading.',
   'The smaller the smallest division, the more precisely the length can be read - millimetre marks beat centimetre marks.'],

  ['g9s-p1-016', 'accuracy_of_instruments', 2,
   'Why is a measuring cylinder better than a beaker for measuring a volume?',
   ['Its scale has much smaller divisions',
    'It holds a much larger volume of liquid',
    'It is made of a stronger glass',
    'It can be heated more safely'],
   'Its scale has much smaller divisions',
   'Compare the two scales, not the two shapes.',
   'A beaker is marked roughly; a measuring cylinder has a fine scale, so the reading is far more accurate.'],

  ['g9s-p1-017', 'accuracy_of_instruments', 3,
   'A pupil measures the thickness of one page by measuring 100 pages and dividing by 100. Why?',
   ['One page is too thin for the ruler to measure accurately',
    'The pages become thicker when they are stacked up',
    'A ruler cannot measure paper at all',
    'It makes the answer a whole number'],
   'One page is too thin for the ruler to measure accurately',
   'Think about the smallest division on the ruler.',
   'A single page is far thinner than the smallest division, so many are measured together and the total divided.'],

  ['g9s-p1-018', 'measurement_errors', 2,
   'In the figure the eye is placed as shown when the scale is read. What error does this cause?<br>' + parallax('above'),
   ['A parallax error', 'A zero error',
    'An error in the units used', 'No error at all'],
   'A parallax error',
   'Look at where the eye is compared with the liquid level.',
   'The eye is not level with the mark, so the line of sight meets the scale at an angle and the reading is wrong - a parallax error.'],

  ['g9s-p1-019', 'measurement_errors', 2,
   'In the figure the eye is placed as shown when the scale is read. Is the reading affected?<br>' + parallax('level'),
   ['No, because the eye is level with the mark',
    'Yes, because the eye is above the mark',
    'Yes, because the eye is below the mark',
    'Yes, because the eye is too close to the scale'],
   'No, because the eye is level with the mark',
   'Look at where the eye is compared with the liquid level.',
   'The eye is level with the mark being read, so there is no parallax error.'],

  ['g9s-p1-020', 'measurement_errors', 2,
   'How is a parallax error avoided?',
   ['By placing the eye level with the mark being read',
    'By using a much larger measuring cylinder',
    'By reading the scale twice',
    'By warming the liquid first'],
   'By placing the eye level with the mark being read',
   'It is about where the eye is.',
   'A parallax error is avoided by looking at the scale square-on, with the eye level with the mark.'],

  ['g9s-p1-021', 'measurement_errors', 3,
   'A balance reads 0.4 g when there is nothing on it. What kind of error is this?',
   ['A zero error', 'A parallax error',
    'An error in the choice of unit', 'A random error only'],
   'A zero error',
   'The instrument does not start at zero.',
   'An instrument that does not read zero when it should has a zero error, and every reading is out by that amount.'],

  ['g9s-p1-022', 'measurement_errors', 3,
   'A balance shows 0.4 g when empty. An object placed on it reads 12.7 g. What is the true mass?',
   ['12.3 g', '13.1 g', '12.7 g', '0.4 g'], '12.3 g',
   'Take the zero error off the reading.',
   'The zero error of +0.4 g must be subtracted: 12.7 - 0.4 = 12.3 g.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const NUM = [
  ['g9s-p1-023', 'measuring_instruments', 2,
   'Read the measuring cylinder shown. State the volume of the liquid, in cm&#179;.<br>' + cylinder(40),
   40, 'Read the mark at the bottom of the curved surface.',
   'The bottom of the meniscus is on the 40 mark, so the volume is 40 cm&#179;.'],
  ['g9s-p1-024', 'measuring_instruments', 3,
   'Read the ruler shown. State the length of the grey object, in cm.<br>' + ruler(3, 8),
   5, 'Subtract the reading at one end from the reading at the other.',
   'The object runs from 3 cm to 8 cm, so it is 8 - 3 = 5 cm long.'],
  ['g9s-p1-025', 'measuring_instruments', 3,
   'A stone is lowered into a measuring cylinder. The water level rises from 20 cm&#179; to 32 cm&#179;. Calculate the volume of the stone, in cm&#179;.',
   12, 'The stone pushes aside its own volume of water.',
   '32 - 20 = 12 cm&#179;.'],
  ['g9s-p1-026', 'measurement_errors', 3,
   'A balance reads 0.2 g when empty. A sample reads 8.9 g on it. Calculate the true mass, in grams.',
   8.7, 'Subtract the zero error.', '8.9 - 0.2 = 8.7 g.'],
  ['g9s-p1-027', 'accuracy_of_instruments', 3,
   '100 identical sheets of paper form a stack 12 mm thick. Calculate the thickness of one sheet, in mm.',
   0.12, 'Divide the total by the number of sheets.', '12 / 100 = 0.12 mm.'],
];

NUM.forEach(([id, subsection, difficulty, question, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeNum({ id, chapterId: CH, subsection, difficulty,
    question, answer, hint, explanation }));
});

const SHORT = [
  ['g9s-p1-028', 'si_units', 1,
   'Give the SI unit of length.',
   'Metre', ['meter', 'm', 'the metre'],
   'Not the centimetre.', 'The SI unit of length is the metre.'],
  ['g9s-p1-029', 'si_units', 1,
   'Give the SI unit of mass.',
   'Kilogram', ['kg', 'the kilogram', 'kilogramme'],
   'Not the gram.', 'The SI unit of mass is the kilogram.'],
  ['g9s-p1-030', 'measurement_errors', 2,
   'Name the error caused by reading a scale with the eye not level with the mark.',
   'Parallax error', ['parallax', 'parallax err'],
   'Two words.', 'Reading a scale from an angle gives a parallax error.'],
  ['g9s-p1-031', 'measurement_errors', 2,
   'Name the error present when an instrument does not read zero before it is used.',
   'Zero error', ['zero', 'end error'],
   'Two words.', 'A zero error offsets every reading the instrument gives.'],
  ['g9s-p1-032', 'measuring_instruments', 1,
   'Name the instrument used to measure the volume of a liquid.',
   'Measuring cylinder', ['a measuring cylinder', 'measuring-cylinder'],
   'It is graduated in cm&#179;.', 'A measuring cylinder measures the volume of a liquid.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

})();
