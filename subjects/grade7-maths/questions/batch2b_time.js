'use strict';
// Grade 7 Maths — Time (g7m-time), batch 2B
// IDs: g7m-time-009 … -020

(function () {

const _BUS_TABLE = '<table class="q-table">' +
  '<tr><th>Stop</th><th>Bus A</th><th>Bus B</th><th>Bus C</th></tr>' +
  '<tr><td>Port Louis</td><td>06:15</td><td>07:00</td><td>07:45</td></tr>' +
  '<tr><td>Rose Hill</td><td>06:50</td><td>07:35</td><td>08:20</td></tr>' +
  '<tr><td>Quatre Bornes</td><td>07:05</td><td>07:50</td><td>08:35</td></tr>' +
  '<tr><td>Curepipe</td><td>07:30</td><td>08:15</td><td>09:00</td></tr></table>';

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7m-time-009', chapterId:'g7m-time', difficulty:2,
    subsection:'reading_time',
    question:'Write 7:40 p.m. in 24-hour clock notation.',
    options:['19:40','07:40','17:40','21:40'],
    answer:'19:40',
    hint:'Afternoon and evening times need 12 added to the hour.',
    explanation:'7 + 12 = 19, so 7:40 p.m. is <b>19:40</b>. 07:40 is twenty to eight in the morning, and 17:40 would be 5:40 p.m.' }),

  makeNum({ id:'g7m-time-010', chapterId:'g7m-time', difficulty:2,
    subsection:'reading_time',
    question:'How many minutes are there in 3¼ hours?',
    answer:195,
    hint:'Deal with the 3 whole hours first, then the quarter of an hour.',
    explanation:'3 × 60 = 180 minutes, plus a quarter of an hour = 15 minutes, giving <b>195 minutes</b>. Answering 325 treats the quarter as 25 minutes, which would be a decimal 3.25 read as minutes.' }),

  makeNum({ id:'g7m-time-011', chapterId:'g7m-time', difficulty:2,
    subsection:'reading_time',
    question:'A clock shows 3:47. How many minutes are there until 4 o’clock?',
    answer:13,
    hint:'Count up from 47 to the next full hour, which is 60 minutes.',
    explanation:'60 − 47 = <b>13 minutes</b>. Working with 100 instead of 60 would give 53, but an hour has only 60 minutes.' }),

  makeMCQ({ id:'g7m-time-012', chapterId:'g7m-time', difficulty:3,
    subsection:'reading_time',
    question:'A pupil wrote 6:15 p.m. as 06:15. Why is this wrong?',
    options:['06:15 is a quarter past six in the morning','06:15 is a quarter to six in the evening','the 24-hour clock never uses a zero','p.m. times always start with the digit 2'],
    answer:'06:15 is a quarter past six in the morning',
    hint:'Read 06:15 back to yourself as a 24-hour time. Which part of the day is it?',
    explanation:'On the 24-hour clock <b>06:15 is a quarter past six in the morning</b>; the evening time is 18:15. The 24-hour clock does use a leading zero for early hours, and p.m. times run from 12 to 23, not only the twenties.' }),

  makeNum({ id:'g7m-time-013', chapterId:'g7m-time', difficulty:3,
    subsection:'time_intervals',
    question:'A football match kicks off at 15:50 and the final whistle goes at 17:35. How long does the match last, in minutes?',
    answer:105,
    hint:'Count on to the next full hour first, then count the rest.',
    explanation:'15:50 to 16:00 is 10 minutes, 16:00 to 17:00 is 60 minutes, and 17:00 to 17:35 is 35 minutes: 10 + 60 + 35 = <b>105 minutes</b>. Subtracting 1735 − 1550 as ordinary numbers gives 185, which treats an hour as 100 minutes.' }),

  makeMCQ({ id:'g7m-time-014', chapterId:'g7m-time', difficulty:3,
    subsection:'time_intervals',
    question:'A journey lasting 2 hours 25 minutes ends at 13:10. At what time did it start?',
    options:['10:45','11:45','10:35','15:35'],
    answer:'10:45',
    hint:'Work backwards: take off the hours first, then the minutes.',
    explanation:'13:10 minus 2 hours is 11:10, and 11:10 minus 25 minutes is <b>10:45</b>. 15:35 adds the time instead of subtracting it, and 10:35 takes off 35 minutes rather than 25.' }),

  makeMCQ({ id:'g7m-time-015', chapterId:'g7m-time', difficulty:4,
    subsection:'time_intervals',
    question:'A school holds three exams of 45 minutes each, with a 10-minute break between one exam and the next. The first exam starts at 08:00. At what time does the last exam finish?',
    options:['10:35','10:15','10:25','10:45'],
    answer:'10:35',
    hint:'Three exams, but how many breaks are there between them?',
    explanation:'The exams take 3 × 45 = 135 minutes and there are only two breaks, 2 × 10 = 20 minutes, giving 155 minutes = 2 h 35 min after 08:00, so <b>10:35</b>. Counting three breaks gives 10:45.' }),

  makeNum({ id:'g7m-time-016', chapterId:'g7m-time', difficulty:4,
    subsection:'time_intervals',
    question:'A nurse works from 07:00 to 15:00 each day and does six shifts a week. How many hours does she work in one week?',
    answer:48,
    hint:'Find the length of one shift before you think about the six days.',
    explanation:'One shift is 15:00 − 07:00 = 8 hours, and 6 × 8 = <b>48 hours</b>. Answering 8 gives one shift only, and 42 would be seven days at six hours.' }),

  makeMCQ({ id:'g7m-time-017', chapterId:'g7m-time', difficulty:2,
    subsection:'timetables',
    question:`${_BUS_TABLE}How long does <b>Bus B</b> take to travel from Port Louis to Curepipe?`,
    options:['1 h 15 min','1 h 05 min','1 h 30 min','2 h 15 min'],
    answer:'1 h 15 min',
    hint:'Find the Port Louis time and the Curepipe time in the Bus B column only.',
    explanation:'Bus B leaves Port Louis at 07:00 and reaches Curepipe at 08:15, which is <b>1 h 15 min</b>. Reading across the wrong column or comparing two different buses gives the other answers.' }),

  makeNum({ id:'g7m-time-018', chapterId:'g7m-time', difficulty:3,
    subsection:'timetables',
    question:`${_BUS_TABLE}How many minutes does <b>Bus A</b> take to travel from Rose Hill to Curepipe?`,
    answer:40,
    hint:'You need two times from the same column, and neither of them is the Port Louis time.',
    explanation:'Bus A is at Rose Hill at 06:50 and at Curepipe at 07:30: 10 minutes to 07:00 and then 30 more, so <b>40 minutes</b>. Starting from 06:15 instead would give the whole journey, 75 minutes.' }),

  makeMCQ({ id:'g7m-time-019', chapterId:'g7m-time', difficulty:3,
    subsection:'timetables',
    question:`${_BUS_TABLE}Rahul reaches the Port Louis stop at 06:20. How long must he wait for the next bus?`,
    options:['40 minutes','5 minutes','45 minutes','1 h 25 min'],
    answer:'40 minutes',
    hint:'Bus A has already gone. Which bus is the next one to leave Port Louis?',
    explanation:'Bus A left at 06:15, five minutes before he arrived, so he must wait for Bus B at 07:00: that is <b>40 minutes</b>. Answering 5 minutes counts the bus he has already missed.' }),

  makeMCQ({ id:'g7m-time-020', chapterId:'g7m-time', difficulty:4,
    subsection:'timetables',
    question:`${_BUS_TABLE}Priya must be in Curepipe by 08:30. It takes her 20 minutes to walk from home to the Rose Hill stop. What is the latest time she can leave home?`,
    options:['07:15','07:35','06:30','07:55'],
    answer:'07:15',
    hint:'Find the last bus that still reaches Curepipe in time, then work backwards from the Rose Hill stop.',
    explanation:'Bus C arrives at 09:00, which is too late, so the last usable bus is Bus B, at Rose Hill at 07:35 and in Curepipe at 08:15. Walking takes 20 minutes, so she leaves home by <b>07:15</b>. 07:35 forgets the walk, and 07:55 is the walk added on instead of taken off.' })

);

})();
