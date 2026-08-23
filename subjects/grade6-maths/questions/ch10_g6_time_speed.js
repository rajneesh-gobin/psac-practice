'use strict';
// Grade 6 Maths — Chapter: Time & Speed (Speed=D/T, GMT, time zones)
// IDs format: g6m-ts-NNN

// Speed triangle SVG
const _SVG_SPEED = `<svg viewBox="0 0 180 100" width="180" height="100" style="display:block;margin:6px auto;background:#fefce8;border-radius:8px;border:1px solid #fde68a">
  <polygon points="90,10 10,90 170,90" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
  <line x1="90" y1="10" x2="90" y2="90" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="90" y="45" text-anchor="middle" font-size="11" fill="#92400e" font-weight="bold">D</text>
  <text x="45" y="84" text-anchor="middle" font-size="11" fill="#92400e" font-weight="bold">S</text>
  <text x="135" y="84" text-anchor="middle" font-size="11" fill="#92400e" font-weight="bold">T</text>
  <text x="90" y="100" text-anchor="middle" font-size="7.5" fill="#64748b">Cover D: S=D÷T | Cover S: D=S×T | Cover T: T=D÷S</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6m-ts-001', chapterId:'g6-time-speed', difficulty:1,
    question:`${_SVG_SPEED}What is the formula for SPEED?`,
    options:['Speed = Distance + Time','Speed = Distance × Time','Speed = Distance ÷ Time','Speed = Time ÷ Distance'],
    answer:'Speed = Distance ÷ Time',
    hint:'Look at the triangle: D at the top, S and T at the bottom. Cover S to see D÷T.',
    explanation:'<b>Speed = Distance ÷ Time</b> (S = D/T). If you cover Distance, you get Distance = Speed × Time. If you cover Time, you get Time = Distance ÷ Speed.' }),

  makeNum({ id:'g6m-ts-002', chapterId:'g6-time-speed', difficulty:2,
    question:'A car travels 240 km in 3 hours. What is its average speed in km/h?',
    answer:'80', acceptableAnswers:['80','80 km/h'],
    hint:'Speed = Distance ÷ Time.',
    explanation:'Speed = 240 ÷ 3 = <b>80 km/h</b>.' }),

  makeNum({ id:'g6m-ts-003', chapterId:'g6-time-speed', difficulty:2,
    question:'A cyclist rides at 15 km/h for 4 hours. What distance does she cover?',
    answer:'60', acceptableAnswers:['60','60 km'],
    hint:'Distance = Speed × Time.',
    explanation:'Distance = 15 × 4 = <b>60 km</b>.' }),

  makeNum({ id:'g6m-ts-004', chapterId:'g6-time-speed', difficulty:2,
    question:'A train travels 350 km at a speed of 70 km/h. How long does the journey take? (Answer in hours)',
    answer:'5', acceptableAnswers:['5','5 hours'],
    hint:'Time = Distance ÷ Speed.',
    explanation:'Time = 350 ÷ 70 = <b>5 hours</b>.' }),

  makeMCQ({ id:'g6m-ts-005', chapterId:'g6-time-speed', difficulty:2,
    question:'Mauritius is in time zone GMT+4. When it is 12:00 noon GMT (in London), what time is it in Mauritius?',
    options:['8:00 am','12:00 noon','4:00 pm','16:00 pm'],
    answer:'4:00 pm',
    hint:'GMT+4 means Mauritius is 4 hours AHEAD of GMT. Add 4 hours to GMT time.',
    explanation:'Mauritius is <b>GMT+4</b> — 4 hours ahead of Greenwich Mean Time. When GMT = 12:00, Mauritius time = 12:00 + 4 = <b>16:00 (4:00 pm)</b>.' }),

  makeMCQ({ id:'g6m-ts-006', chapterId:'g6-time-speed', difficulty:2,
    question:'A flight from London (GMT) leaves at 10:00 am London time and takes 11 hours. What time does it arrive in Mauritius (GMT+4)?',
    options:['9:00 pm Mauritius time','1:00 am next day','10:00 pm','11:00 pm'],
    answer:'1:00 am next day',
    hint:'Arrival in GMT = 10:00 + 11h = 21:00. Then convert to GMT+4: 21:00 + 4 = 25:00 = 01:00 next day.',
    explanation:'Departs London at 10:00 GMT. 11-hour flight: arrival in GMT = 10:00 + 11h = 21:00 GMT. Add 4 hours for Mauritius: 21:00 + 4 = 25:00 = <b>01:00 next day</b> in Mauritius.' }),

  makeNum({ id:'g6m-ts-007', chapterId:'g6-time-speed', difficulty:2,
    question:'Convert 2 hours 30 minutes to minutes.',
    answer:'150', acceptableAnswers:['150','150 minutes'],
    hint:'1 hour = 60 minutes. So 2 hours = 120 minutes. Add 30.',
    explanation:'2 × 60 + 30 = 120 + 30 = <b>150 minutes</b>.' }),

  makeNum({ id:'g6m-ts-008', chapterId:'g6-time-speed', difficulty:2,
    question:'How many seconds are there in 1 hour and 15 minutes?',
    answer:'4500', acceptableAnswers:['4500'],
    hint:'1h 15min = 75 minutes. 75 minutes × 60 seconds = ?',
    explanation:'1h 15min = 75 minutes. 75 × 60 = <b>4500 seconds</b>.' }),

  makeTF({ id:'g6m-ts-009', chapterId:'g6-time-speed', difficulty:1,
    question:'A car travelling at 60 km/h covers 60 km in one hour.',
    answer:true,
    hint:'Speed is defined as distance per unit time.',
    explanation:'<b>True</b>. By definition, if speed = 60 km/h, the car travels 60 km in exactly 1 hour (Distance = Speed × Time = 60 × 1 = 60 km).' }),

  makeNum({ id:'g6m-ts-010', chapterId:'g6-time-speed', difficulty:2,
    question:'Two towns are 180 km apart. A bus travels at 60 km/h. How many minutes does the journey take?',
    answer:'180', acceptableAnswers:['180','180 minutes'],
    hint:'First find the time in hours (Time = D÷S), then convert to minutes (×60).',
    explanation:'Time = 180 ÷ 60 = 3 hours. 3 hours × 60 = <b>180 minutes</b>.' })

);
