'use strict';
// Grade 7 Maths — g7m-integers, batch 2A (015–019)

const _B2A_NUMLINE = `<svg viewBox="0 0 480 92" width="480" height="92" style="display:block;margin:6px auto;max-width:100%;background:#f8fafc;border-radius:8px;border:1px solid #cbd5e1" role="img" aria-label="a number line diagram"><line x1="28" y1="55" x2="456" y2="55" stroke="#1e293b" stroke-width="2"/><polygon points="24,55 34,50 34,60" fill="#1e293b"/><polygon points="460,55 450,50 450,60" fill="#1e293b"/><line x1="40" y1="48" x2="40" y2="62" stroke="#1e293b" stroke-width="2"/><text x="40" y="79" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#1e293b">&#8722;8</text><line x1="90" y1="48" x2="90" y2="62" stroke="#1e293b" stroke-width="2"/><text x="90" y="79" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#1e293b">&#8722;6</text><line x1="140" y1="48" x2="140" y2="62" stroke="#1e293b" stroke-width="2"/><text x="140" y="79" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#1e293b">&#8722;4</text><line x1="190" y1="48" x2="190" y2="62" stroke="#1e293b" stroke-width="2"/><text x="190" y="79" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#1e293b">&#8722;2</text><line x1="240" y1="48" x2="240" y2="62" stroke="#1e293b" stroke-width="2"/><text x="240" y="79" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#1e293b">0</text><line x1="290" y1="48" x2="290" y2="62" stroke="#1e293b" stroke-width="2"/><text x="290" y="79" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#1e293b">2</text><line x1="340" y1="48" x2="340" y2="62" stroke="#1e293b" stroke-width="2"/><text x="340" y="79" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#1e293b">4</text><line x1="390" y1="48" x2="390" y2="62" stroke="#1e293b" stroke-width="2"/><text x="390" y="79" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#1e293b">6</text><line x1="440" y1="48" x2="440" y2="62" stroke="#1e293b" stroke-width="2"/><text x="440" y="79" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#1e293b">8</text><line x1="115" y1="32" x2="115" y2="55" stroke="#dc2626" stroke-width="2"/><polygon points="115,56 108,42 122,42" fill="#dc2626"/><text x="115" y="24" text-anchor="middle" font-size="14" font-weight="bold" font-family="sans-serif" fill="#dc2626">P</text></svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7m-integers-015', chapterId:'g7m-integers', difficulty:3,
    subsection:'number_line',
    question:'The number line below is labelled in steps of 2. What number is at the point marked <b>P</b>?' + _B2A_NUMLINE,
    options:['−5','−4','−3','5'],
    answer:'−5',
    hint:'P sits exactly halfway between two labels. What is halfway between them?',
    explanation:'P is midway between −6 and −4, so it is −5. −4 and −3 are to the RIGHT of P, and 5 is on the positive side of zero altogether.' }),

  makeNum({ id:'g7m-integers-016', chapterId:'g7m-integers', difficulty:3,
    subsection:'number_line',
    question:'One winter night the temperature fell to −5 °C on the Curepipe plateau while it stayed at 3 °C on the coast at Flic en Flac. How many degrees COLDER was Curepipe?',
    answer:8,
    hint:'Count the steps along a number line from −5 up to 3, passing through zero.',
    explanation:'From −5 to 0 is 5 degrees, then 0 to 3 is 3 more: 5 + 3 = 8 °C. Subtracting 3 − (−5) gives the same 8. Answering 2 means the two numbers were added instead of counted apart.' }),

  makeMCQ({ id:'g7m-integers-017', chapterId:'g7m-integers', difficulty:3,
    subsection:'number_line',
    question:'Rishi says that −7 is greater than −3 "because 7 is bigger than 3". Which statement puts him right?',
    options:['−7 is less than −3','−7 is equal to −3','−7 is greater than −3','−3 is less than −7'],
    answer:'−7 is less than −3',
    hint:'On a number line the further LEFT a number sits, the smaller it is.',
    explanation:'−7 lies further left than −3, so −7 < −3. The size of the digit tells you nothing on its own once a minus sign is there: the last two options both repeat Rishi\'s mistake, and the middle one claims the two numbers are the same point.' }),

  makeMCQ({ id:'g7m-integers-018', chapterId:'g7m-integers', difficulty:2,
    subsection:'number_types',
    question:'"Every odd number is a prime number." Which number proves this statement is FALSE?',
    options:['9','7','11','13'],
    answer:'9',
    hint:'Look for an odd number that has a third factor besides 1 and itself.',
    explanation:'9 is odd but 9 = 3 × 3, so it has three factors (1, 3 and 9) and is composite. 7, 11 and 13 are all odd AND prime, so none of them can disprove anything.' }),

  makeNum({ id:'g7m-integers-019', chapterId:'g7m-integers', difficulty:4,
    subsection:'operations',
    question:'A lift in a Port Louis office block starts in the car park on level −2. It rises 7 levels, then goes down 3 levels, then rises 4 more levels. Which level is the lift on now?',
    answer:6,
    hint:'Work through the journey one move at a time, starting the count at −2.',
    explanation:'−2 + 7 = 5, then 5 − 3 = 2, then 2 + 4 = 6, so the lift stops on level 6. Adding all three moves to zero instead of to −2 gives 8, which forgets that the lift began two levels below the ground.' })

);
