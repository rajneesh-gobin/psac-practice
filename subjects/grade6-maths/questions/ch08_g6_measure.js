'use strict';
// Grade 6 Maths — Chapter: Measurement (unit conversion, perimeter, 12h/24h time, money)
// IDs format: g6m-meas-NNN

STATIC_QUESTIONS.push(

  makeNum({ id:'g6m-meas-001', chapterId:'g6-measure', difficulty:1,
    question:'Convert 3.5 km to metres.',
    answer:'3500', acceptableAnswers:['3500','3500 m'],
    hint:'1 km = 1000 m. Multiply by 1000.',
    explanation:'3.5 km × 1000 = <b>3500 m</b>.' }),

  makeNum({ id:'g6m-meas-002', chapterId:'g6-measure', difficulty:1,
    question:'Convert 4800 g to kilograms.',
    answer:'4.8', acceptableAnswers:['4.8','4.8 kg'],
    hint:'1 kg = 1000 g. Divide by 1000.',
    explanation:'4800 g ÷ 1000 = <b>4.8 kg</b>.' }),

  makeNum({ id:'g6m-meas-003', chapterId:'g6-measure', difficulty:1,
    question:'Convert 2 litres 350 ml to millilitres.',
    answer:'2350', acceptableAnswers:['2350','2350 ml'],
    hint:'1 litre = 1000 ml. So 2 litres = 2000 ml. Add 350 ml.',
    explanation:'2 litres = 2000 ml. 2000 + 350 = <b>2350 ml</b>.' }),

  makeNum({ id:'g6m-meas-004', chapterId:'g6-measure', difficulty:2,
    question:'Find the PERIMETER of a rectangle with length 12 cm and width 7 cm.',
    answer:'38', acceptableAnswers:['38','38 cm'],
    hint:'Perimeter of a rectangle = 2 × (length + width).',
    explanation:'Perimeter = 2 × (12 + 7) = 2 × 19 = <b>38 cm</b>.' }),

  makeNum({ id:'g6m-meas-005', chapterId:'g6-measure', difficulty:2,
    question:'A square garden has a perimeter of 52 m. What is the length of ONE side?',
    answer:'13', acceptableAnswers:['13','13 m'],
    hint:'A square has 4 equal sides. Divide perimeter by 4.',
    explanation:'Length of one side = 52 ÷ 4 = <b>13 m</b>.' }),

  makeMCQ({ id:'g6m-meas-006', chapterId:'g6-measure', difficulty:1,
    question:'What is 3:45 pm written in 24-hour clock format?',
    options:['3:45','3:45 pm','15:45','13:45'],
    answer:'15:45',
    hint:'For pm times after noon: add 12 to the hours. 3 + 12 = 15.',
    explanation:'3:45 pm in 24-hour format: add 12 to the hour → 3 + 12 = 15. So it is <b>15:45</b>.' }),

  makeMCQ({ id:'g6m-meas-007', chapterId:'g6-measure', difficulty:1,
    question:'What is 22:30 in 12-hour (am/pm) format?',
    options:['10:30 am','2:30 pm','10:30 pm','12:30 am'],
    answer:'10:30 pm',
    hint:'24-hour times from 13:00 to 23:59 are pm. Subtract 12 from the hours: 22 − 12 = 10.',
    explanation:'22:30 is past noon, so it is pm. 22 − 12 = 10. So 22:30 = <b>10:30 pm</b>.' }),

  makeNum({ id:'g6m-meas-008', chapterId:'g6-measure', difficulty:2,
    question:'A train leaves at 09:20 and arrives at 14:05. How long is the journey? (Answer in hours and minutes, e.g. 4h 45min)',
    answer:'4h 45min', acceptableAnswers:['4h 45min','4 hours 45 minutes','4:45'],
    hint:'From 09:20 to 14:20 = 5 hours. But arrival is 14:05, which is 15 minutes before 14:20. So 5h − 15min = 4h 45min.',
    explanation:'09:20 to 14:05: From 09:20 to 14:20 would be 5 hours. But 14:05 is 15 minutes before 14:20, so the journey is 5h − 15min = <b>4 hours 45 minutes</b>.' }),

  makeNum({ id:'g6m-meas-009', chapterId:'g6-measure', difficulty:2,
    question:'Books cost Rs 85 each. How much do 12 books cost?',
    answer:'1020', acceptableAnswers:['1020','Rs 1020'],
    hint:'Multiply: 85 × 12. Try 85×10=850, 85×2=170. Add.',
    explanation:'85 × 12 = 85×10 + 85×2 = 850 + 170 = <b>Rs 1020</b>.' }),

  makeNum({ id:'g6m-meas-010', chapterId:'g6-measure', difficulty:2,
    question:'A rectangle has a perimeter of 48 cm. Its length is 14 cm. What is its WIDTH?',
    answer:'10', acceptableAnswers:['10','10 cm'],
    hint:'Perimeter = 2(l + w). So 48 = 2(14 + w). Divide 48 by 2, then subtract 14.',
    explanation:'48 = 2(14 + w). 24 = 14 + w. w = 24 − 14 = <b>10 cm</b>.' })

);
