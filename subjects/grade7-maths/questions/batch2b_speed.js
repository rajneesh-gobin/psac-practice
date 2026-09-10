'use strict';
// Grade 7 Maths — Speed (g7m-speed), batch 2B
// IDs: g7m-speed-009 … -020

(function () {

const _SVG_DT_GRAPH = `<svg viewBox="0 0 250 170" width="250" height="170" role="img" aria-label="A distance-time graph made of three straight sections labelled A, B, C and D" style="display:block;margin:6px auto;background:#f8fafc;border-radius:8px;border:1px solid #cbd5e1">
  <line x1="35" y1="140" x2="235" y2="140" stroke="#334155" stroke-width="2"/>
  <line x1="35" y1="140" x2="35" y2="18" stroke="#334155" stroke-width="2"/>
  <polyline points="35,140 100,78 155,78 215,26" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>
  <circle cx="35" cy="140" r="3.2" fill="#1d4ed8"/><circle cx="100" cy="78" r="3.2" fill="#1d4ed8"/>
  <circle cx="155" cy="78" r="3.2" fill="#1d4ed8"/><circle cx="215" cy="26" r="3.2" fill="#1d4ed8"/>
  <text x="27" y="152" font-size="9" fill="#1e293b">A</text>
  <text x="96" y="70" font-size="9" fill="#1e293b">B</text>
  <text x="153" y="70" font-size="9" fill="#1e293b">C</text>
  <text x="219" y="22" font-size="9" fill="#1e293b">D</text>
  <text x="135" y="162" font-size="9" fill="#475569" text-anchor="middle">Time</text>
  <text x="16" y="80" font-size="9" fill="#475569" text-anchor="middle" transform="rotate(-90 16 80)">Distance</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7m-speed-009', chapterId:'g7m-speed', difficulty:2,
    subsection:'speed_formula',
    question:'Rearranged from the speed formula, <b>distance</b> is equal to …',
    options:['speed × time','speed ÷ time','time ÷ speed','speed + time'],
    answer:'speed × time',
    hint:'If you drive at 50 km each hour for 2 hours, do you multiply or divide?',
    explanation:'Since speed = distance ÷ time, multiplying both sides by time gives distance = <b>speed × time</b>. Speed ÷ time and time ÷ speed both come from moving the letters without balancing the equation, and speeds and times can never simply be added.' }),

  makeNum({ id:'g7m-speed-010', chapterId:'g7m-speed', difficulty:2,
    subsection:'speed_formula',
    question:'A runner covers 400 m in 50 seconds. What is her average speed, in metres per second?',
    answer:8,
    hint:'Metres per second means metres divided by seconds.',
    explanation:'400 ÷ 50 = <b>8 m/s</b>. Multiplying instead would give 20,000, a number far larger than any runner could reach.' }),

  makeMCQ({ id:'g7m-speed-011', chapterId:'g7m-speed', difficulty:3,
    subsection:'speed_formula',
    question:'A bus keeps an average speed of 45 km/h for 40 minutes. How far does it travel?',
    options:['30 km','45 km','15 km','60 km'],
    answer:'30 km',
    hint:'The speed is given per hour, so the 40 minutes must be written as a fraction of an hour first.',
    explanation:'40 minutes is ⅔ of an hour, so the distance is 45 × ⅔ = <b>30 km</b>. Using 40 as if it were hours, or using 1 hour, gives the other answers.' }),

  makeMCQ({ id:'g7m-speed-012', chapterId:'g7m-speed', difficulty:3,
    subsection:'speed_formula',
    question:'A car travels 60 km in its first hour and 40 km in its second hour. What is its average speed for the whole journey?',
    options:['50 km/h','40 km/h','60 km/h','100 km/h'],
    answer:'50 km/h',
    hint:'Average speed is the TOTAL distance divided by the TOTAL time.',
    explanation:'Total distance 60 + 40 = 100 km over a total time of 2 hours gives 100 ÷ 2 = <b>50 km/h</b>. 100 km/h is the distance covered, not a speed, and 60 or 40 km/h describe one hour only.' }),

  makeNum({ id:'g7m-speed-013', chapterId:'g7m-speed', difficulty:2,
    subsection:'unit_conversion',
    question:'Convert 72 km/h into metres per second.',
    answer:20,
    hint:'One kilometre is 1,000 m and one hour is 3,600 s. Divide by 3.6.',
    explanation:'72 × 1,000 = 72,000 m in 3,600 s, and 72,000 ÷ 3,600 = <b>20 m/s</b>. The short cut is to divide by 3.6; multiplying by 3.6 instead would give 259.2, which is faster than an aeroplane.' }),

  makeMCQ({ id:'g7m-speed-014', chapterId:'g7m-speed', difficulty:2,
    subsection:'unit_conversion',
    question:'Which is faster, a scooter at 20 m/s or a car at 60 km/h?',
    options:['the scooter','the car','they are equal','it cannot be judged'],
    answer:'the scooter',
    hint:'You cannot compare the numbers until both speeds are written in the same unit.',
    explanation:'20 m/s × 3.6 = 72 km/h, which is more than 60 km/h, so <b>the scooter</b> is faster. Comparing 20 with 60 directly makes the car look faster, but the units are not the same.' }),

  makeNum({ id:'g7m-speed-015', chapterId:'g7m-speed', difficulty:3,
    subsection:'unit_conversion',
    question:'A cyclist rides at a steady 18 km/h. How many <b>metres</b> does she cover in one minute?',
    answer:300,
    hint:'How many kilometres in one minute? Then change that into metres.',
    explanation:'18 km in 60 minutes means 18 ÷ 60 = 0.3 km each minute, and 0.3 km = <b>300 m</b>. Answering 18,000 gives the distance for a whole hour.' }),

  makeMCQ({ id:'g7m-speed-016', chapterId:'g7m-speed', difficulty:3,
    subsection:'unit_conversion',
    question:'To change a speed from m/s into km/h, a pupil divided by 3.6. What should the pupil have done instead?',
    options:['multiplied by 3.6','divided by 1,000','multiplied by 60','divided by 3,600'],
    answer:'multiplied by 3.6',
    hint:'A speed in km/h is always a bigger number than the same speed in m/s. Should the number grow or shrink?',
    explanation:'Going from m/s to km/h makes the number larger, so the pupil should have <b>multiplied by 3.6</b>. Dividing by 3.6 is the conversion in the opposite direction, and the other two operations only complete half of the conversion.' }),

  makeNum({ id:'g7m-speed-017', chapterId:'g7m-speed', difficulty:3,
    subsection:'distance_time',
    question:'A lorry leaves Port Louis at 07:00 and reaches Mahébourg, 60 km away, at 08:30. What is its average speed, in km/h?',
    answer:40,
    hint:'Work out how long the journey took, as a number of hours, before dividing.',
    explanation:'The journey took 1½ hours, so the speed is 60 ÷ 1.5 = <b>40 km/h</b>. Dividing by 1 hour 30 read as 1.30 gives about 46, which treats an hour as 100 minutes.' }),

  makeMCQ({ id:'g7m-speed-018', chapterId:'g7m-speed', difficulty:4,
    subsection:'distance_time',
    question:'A van drives 90 km at 60 km/h, stops for 30 minutes, then drives a further 50 km at 50 km/h. How long does the whole trip take?',
    options:['3 h','2 h 30 min','3 h 30 min','4 h'],
    answer:'3 h',
    hint:'Work out each driving stage separately, then remember the stop is part of the total time.',
    explanation:'90 ÷ 60 = 1½ h, the stop adds ½ h, and 50 ÷ 50 = 1 h: 1.5 + 0.5 + 1 = <b>3 hours</b>. Leaving out the stop gives 2 h 30 min.' }),

  makeNum({ id:'g7m-speed-019', chapterId:'g7m-speed', difficulty:4,
    subsection:'distance_time',
    question:'Two friends leave the same place at the same moment along the same road. One walks at 5 km/h and the other cycles at 15 km/h. How many kilometres apart are they after 45 minutes?',
    answer:7.5,
    hint:'The gap grows at the DIFFERENCE of the two speeds. How many kilometres does the gap gain each hour?',
    explanation:'The gap grows at 15 − 5 = 10 km/h, and 45 minutes is ¾ of an hour, so the gap is 10 × 0.75 = <b>7.5 km</b>. Adding the speeds gives 20 km/h, which would only be right if they walked in opposite directions.' }),

  makeMCQ({ id:'g7m-speed-020', chapterId:'g7m-speed', difficulty:3,
    subsection:'distance_time',
    question:`${_SVG_DT_GRAPH}This distance–time graph shows one journey. Between which two points is the vehicle <b>not moving</b>?`,
    options:['between B and C','between A and B','between C and D','it never stops'],
    answer:'between B and C',
    hint:'When a vehicle stops, time keeps passing but the distance stays the same.',
    explanation:'From B to C the line is flat: time increases but the distance does not change, so the vehicle is stopped <b>between B and C</b>. The sloping sections A to B and C to D both show the vehicle moving, and the steeper section C to D is the faster one.' })

);

})();
