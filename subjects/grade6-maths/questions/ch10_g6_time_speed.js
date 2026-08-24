'use strict';
// Grade 6 Maths - Chapter: Time & Speed (Speed=D/T, GMT, time zones)
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
    explanation:'Mauritius is <b>GMT+4</b> - 4 hours ahead of Greenwich Mean Time. When GMT = 12:00, Mauritius time = 12:00 + 4 = <b>16:00 (4:00 pm)</b>.' }),

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


STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6m-ts-011', chapterId:'g6-time-speed', difficulty:1,
    question:'Convert 14:45 to 12-hour (am/pm) format.',
    options:['4:45 am','2:45 am','4:45 pm','2:45 pm'],
    answer:'2:45 pm',
    hint:'14:45 is in the afternoon (pm). Subtract 12: 14 - 12 = 2.',
    explanation:'14:45 - 12:00 = <b>2:45 pm</b>. Times from 13:00 to 23:59 in 24-hour format are converted to pm by subtracting 12 from the hours. 00:00 to 11:59 = am (keep the same hours, with midnight = 12:00 am and noon = 12:00 pm).' }),

  makeMCQ({ id:'g6m-ts-012', chapterId:'g6-time-speed', difficulty:1,
    question:'Write 7:30 am in 24-hour clock format.',
    options:['07:30','19:30','7:30','17:30'],
    answer:'07:30',
    hint:'Morning times (am) stay the same in 24-hour format - just write single-digit hours with a leading zero.',
    explanation:'7:30 am becomes <b>07:30</b> in 24-hour format. For am times: keep the same hour value and write it with 2 digits (e.g. 7 becomes 07). For pm times: add 12 to the hour (e.g. 7:30 pm = 19:30).' }),

  makeNum({ id:'g6m-ts-013', chapterId:'g6-time-speed', difficulty:2,
    question:'A film starts at 09:50 and ends at 13:25. How long is the film? (Write as: Xh Ymin, e.g. 3h 35min)',
    answer:'3h 35min', acceptableAnswers:['3h 35min','3 hours 35 minutes','3:35'],
    hint:'From 09:50 to 13:50 = 4 hours. But 13:25 is 25 minutes before 13:50. So 4h - 25min = 3h 35min.',
    explanation:'09:50 to 13:50 = 4 hours. 13:25 is 25 minutes before 13:50, so: 4 hours - 25 minutes = <b>3 hours 35 minutes</b>. MIE method: count on from start time to the nearest whole hour, then add remaining minutes.' }),

  makeMCQ({ id:'g6m-ts-014', chapterId:'g6-time-speed', difficulty:2,
    question:'Mauritius is at UTC+4 (4 hours ahead of GMT). When it is 10:00 in London (GMT), what time is it in Mauritius?',
    options:['06:00','14:00','12:00','10:00'],
    answer:'14:00',
    hint:'Mauritius is 4 hours AHEAD. Add 4 to the GMT time.',
    explanation:'10:00 GMT + 4 hours = <b>14:00</b> in Mauritius. Mauritius Standard Time (MUT) = UTC + 4. This time zone difference is a standard topic in the MIE Grade 6 Maths textbook (Measurement chapter).' }),

  makeNum({ id:'g6m-ts-015', chapterId:'g6-time-speed', difficulty:2,
    question:'A car travels 150 km in 2 hours 30 minutes. What is its average SPEED in km/h?',
    answer:'60', acceptableAnswers:['60','60 km/h'],
    hint:'Convert 2h 30min to decimal hours (2.5 h). Speed = Distance / Time.',
    explanation:'Time = 2h 30min = 2.5 hours. Speed = 150 / 2.5 = <b>60 km/h</b>. MIE Grade 6 formula triangle: Speed = Distance / Time. Cover S to see D/T. Cover D to see S x T. Cover T to see D/S.' }),

  makeNum({ id:'g6m-ts-016', chapterId:'g6-time-speed', difficulty:2,
    question:'A cyclist rides at 16 km/h for 2 hours 30 minutes. How far does she travel? (Answer in km)',
    answer:'40', acceptableAnswers:['40','40 km'],
    hint:'Convert 2h 30min to decimal hours (2.5 h). Distance = Speed x Time.',
    explanation:'Time = 2.5 hours. Distance = 16 x 2.5 = <b>40 km</b>. Always convert time to decimal hours before calculating distance. 30 min = 0.5 h, 15 min = 0.25 h, 45 min = 0.75 h.' }),

  makeNum({ id:'g6m-ts-017', chapterId:'g6-time-speed', difficulty:2,
    question:'A bus travels 240 km at an average speed of 80 km/h. How long does the journey take? (Answer in hours)',
    answer:'3', acceptableAnswers:['3','3 hours','3 h'],
    hint:'Time = Distance / Speed.',
    explanation:'Time = 240 / 80 = <b>3 hours</b>. If the answer is not a whole number, convert the decimal part to minutes: e.g. 3.5 hours = 3 hours 30 minutes (0.5 x 60 = 30 min).' }),

  makeNum({ id:'g6m-ts-018', chapterId:'g6-time-speed', difficulty:3,
    question:'A train leaves at 08:45 and arrives at 12:15. If the average speed was 90 km/h, what is the length of the route in km?',
    answer:'315', acceptableAnswers:['315','315 km'],
    hint:'Step 1: find journey duration (08:45 to 12:15). Step 2: convert to decimal hours. Step 3: Distance = Speed x Time.',
    explanation:'Duration: 08:45 to 12:15 = 3 hours 30 minutes = 3.5 hours. Distance = 90 x 3.5 = <b>315 km</b>.' }),

  makeNum({ id:'g6m-ts-019', chapterId:'g6-time-speed', difficulty:4,
    question:'Cyclist A leaves point P at 09:00 travelling at 15 km/h. Cyclist B leaves the same point at 10:00 in the same direction at 20 km/h. At what time does Cyclist B catch up with Cyclist A? (Write as HH:MM)',
    answer:'13:00', acceptableAnswers:['13:00','1:00 pm'],
    hint:'By 10:00, A has a 1-hour head start = 15 km lead. B gains (20-15) = 5 km per hour on A. Time to close gap = 15 / 5 = 3 hours after 10:00.',
    explanation:'By 10:00, Cyclist A has covered 1 x 15 = 15 km. Relative speed of B over A = 20 - 15 = 5 km/h. Time for B to close the 15 km gap = 15 / 5 = 3 hours after 10:00 = <b>13:00</b>. Check: B at 13:00 = 3 x 20 = 60 km. A at 13:00 = 4 x 15 = 60 km ✓.' })

);
