'use strict';
STATIC_QUESTIONS.push(
  makeText({
    id: 'g7s-sts-017', chapterId: 'g7s-sts', difficulty: 1,
    subsection: 'sustainability',
    question: 'Complete the waste rule: reduce, reuse, ______.',
    answer: 'recycle', alsoAccept: ['recycling'],
    hint: 'It is the last and least effective of the three.',
    explanation: 'The rule is reduce, reuse, recycle, in that order — using less comes first because recycling still costs energy. "Remove" and "refuse" are not part of the standard three.'
  }),
  makeMCQ({
    id: 'g7s-sts-018', chapterId: 'g7s-sts', difficulty: 2,
    subsection: 'science_technology',
    question: 'Which technology lets a doctor see a broken bone without cutting the patient open?',
    options: ['X-ray imaging', 'A microscope', 'A telescope', 'A barometer'],
    answer: 'X-ray imaging',
    hint: 'It uses a kind of radiation that passes through soft tissue.',
    explanation: 'X-rays pass through soft tissue but are stopped by bone, so the bone shows up on the image. A microscope needs a thin sample, a telescope looks at distant objects and a barometer measures air pressure.'
  }),
  makeMCQ({
    id: 'g7s-sts-019', chapterId: 'g7s-sts', difficulty: 3,
    subsection: 'discoveries',
    question: 'Which discovery first allowed doctors to <b>cure</b> a patient who already had a bacterial infection?',
    options: ['Penicillin', 'Vaccination', 'The telescope', 'The transistor'],
    answer: 'Penicillin',
    hint: 'Alexander Fleming noticed a mould killing bacteria on a dish.',
    explanation: 'Penicillin was the first antibiotic, and it kills bacteria in a patient who is already ill. Vaccines prevent an infection before it starts, while the telescope and the transistor belong to astronomy and electronics.'
  }),
  makeNum({
    id: 'g7s-sts-020', chapterId: 'g7s-sts', difficulty: 2,
    subsection: 'sustainability',
    question: 'A school of 500 pupils runs a recycling drive. Each pupil brings in 2 plastic bottles a week. How many bottles are collected in 4 weeks?',
    answer: 4000, acceptableAnswers: ['4000', '4,000'],
    hint: 'Work out one week first, then the four weeks.',
    explanation: '500 × 2 = 1000 bottles a week, and 1000 × 4 = 4000 bottles in four weeks. 1000 is the total for a single week only.'
  })
);
