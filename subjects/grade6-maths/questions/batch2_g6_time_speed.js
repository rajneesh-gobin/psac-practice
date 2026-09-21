'use strict';

(function () {

STATIC_QUESTIONS.push(

  makeMCQ({
    id: 'g6m-ts-023', chapterId: 'g6-time-speed', subsection: 'clock_formats', difficulty: 1,
    question: 'What is "quarter past 7 in the evening" written in 24-hour clock format?',
    options: ['07:15', '19:15', '07:45', '19:45'],
    answer: '19:15',
    hint: 'Quarter past 7 = 7:15 pm. For pm times, add 12 to the hour.',
    explanation: 'Quarter past 7 = 7:15. In the evening means pm. 7 + 12 = 19. So in 24-hour format: <b>19:15</b>.'
  }),

  makeMCQ({
    id: 'g6m-ts-024', chapterId: 'g6-time-speed', subsection: 'clock_formats', difficulty: 1,
    question: 'What is "half past 11 at night" written in 24-hour clock format?',
    options: ['11:30', '23:30', '13:30', '00:30'],
    answer: '23:30',
    hint: 'Half past 11 = 11:30 pm. Add 12 to convert pm hours to 24-hour format.',
    explanation: 'Half past 11 at night = 11:30 pm. 11 + 12 = 23. So in 24-hour format: <b>23:30</b>.'
  }),

  makeMCQ({
    id: 'g6m-ts-025', chapterId: 'g6-time-speed', subsection: 'clock_formats', difficulty: 1,
    question: 'What is "quarter to 3 in the afternoon" written in 24-hour clock format?',
    options: ['02:45', '14:45', '03:15', '15:15'],
    answer: '14:45',
    hint: 'Quarter to 3 = 2:45 pm. Add 12 to the hours for pm times.',
    explanation: 'Quarter to 3 = 2:45 pm. 2 + 12 = 14. So in 24-hour format: <b>14:45</b>.'
  }),

  makeMCQ({
    id: 'g6m-ts-026', chapterId: 'g6-time-speed', subsection: 'clock_formats', difficulty: 1,
    question: 'Convert 6:15 am to 24-hour clock format.',
    options: ['6:15', '06:15', '18:15', '016:15'],
    answer: '06:15',
    hint: 'Morning times (am) stay the same in 24-hour format. Write single-digit hours with a leading zero.',
    explanation: '6:15 am is a morning time, so the hour stays the same. In 24-hour format, write it as <b>06:15</b> (with a leading zero).'
  }),

  makeMCQ({
    id: 'g6m-ts-027', chapterId: 'g6-time-speed', subsection: 'clock_formats', difficulty: 2,
    question: 'Convert 11:55 pm to 24-hour clock format.',
    options: ['11:55', '23:55', '00:55', '12:55'],
    answer: '23:55',
    hint: 'For pm times, add 12 to the hour. 11 + 12 = 23.',
    explanation: '11:55 pm: add 12 to the hour. 11 + 12 = 23. In 24-hour format: <b>23:55</b>. This is 5 minutes before midnight.'
  }),

  makeTF({
    id: 'g6m-ts-028', chapterId: 'g6-time-speed', subsection: 'clock_formats', difficulty: 1,
    question: 'Midnight is written as 00:00 in 24-hour clock format.',
    answer: true,
    hint: 'Midnight marks the start of a new day. The 24-hour clock counts from 00:00 at midnight to 23:59.',
    explanation: '<b>True.</b> Midnight = 00:00 in 24-hour format. The 24-hour clock runs from 00:00 (midnight) through 12:00 (noon) to 23:59, then back to 00:00. Noon = 12:00. 1 minute past midnight = 00:01.'
  }),

  makeMCQ({
    id: 'g6m-ts-029', chapterId: 'g6-time-speed', subsection: 'clock_formats', difficulty: 2,
    question: 'A clock shows 00:30. Is this time in the morning (am) or evening (pm), and what is it in 12-hour format?',
    options: ['12:30 pm (noon)', '12:30 am (midnight)', '0:30 pm', '1:30 am'],
    answer: '12:30 am (midnight)',
    hint: '00:30 in 24-hour time means 30 minutes after midnight. Midnight is 12:00 am.',
    explanation: '00:30 is 30 minutes after midnight. Midnight = 12:00 am, so 00:30 = <b>12:30 am</b>. Times from 00:00 to 11:59 in 24-hour format are am; from 12:00 to 23:59 are pm.'
  }),

  makeMCQ({
    id: 'g6m-ts-030', chapterId: 'g6-time-speed', subsection: 'clock_formats', difficulty: 2,
    question: 'What time is 3 hours after 10:45?',
    options: ['13:45', '13:15', '07:45', '14:45'],
    answer: '13:45',
    hint: 'Add 3 hours to 10:45. 10 + 3 = 13, minutes stay the same.',
    explanation: '10:45 + 3 hours = <b>13:45</b>. The minutes do not change when adding whole hours. 13:45 in 12-hour format is 1:45 pm.'
  }),

  makeMCQ({
    id: 'g6m-ts-031', chapterId: 'g6-time-speed', subsection: 'clock_formats', difficulty: 2,
    question: 'What time is 2 hours 20 minutes BEFORE 14:00?',
    options: ['16:20', '11:40', '12:20', '11:20'],
    answer: '11:40',
    hint: 'Subtract 2h 20min from 14:00. First subtract 2 hours: 12:00. Then subtract 20 minutes: 11:40.',
    explanation: '14:00 minus 2 hours = 12:00. 12:00 minus 20 minutes = <b>11:40</b>. This is 11:40 am in 12-hour format.'
  }),

  makeNum({
    id: 'g6m-ts-032', chapterId: 'g6-time-speed', subsection: 'duration', difficulty: 2,
    question: 'School starts at 08:30 and ends at 14:45. How long is the school day? (Answer in hours and minutes, e.g. 6h 15min)',
    answer: '6h 15min',
    acceptableAnswers: ['6h 15min', '6 hours 15 minutes', '6:15', '375 min'],
    hint: 'From 08:30 to 14:30 = 6 hours. From 14:30 to 14:45 = 15 more minutes.',
    explanation: '08:30 to 14:30 = 6 hours. 14:30 to 14:45 = 15 minutes. Total = <b>6 hours 15 minutes</b>.'
  }),

  makeNum({
    id: 'g6m-ts-033', chapterId: 'g6-time-speed', subsection: 'duration', difficulty: 2,
    question: 'A bus leaves at 09:15 and the journey takes 2 hours 40 minutes. At what time does it arrive? (Write in 24-hour format, e.g. 11:55)',
    answer: '11:55',
    acceptableAnswers: ['11:55'],
    hint: 'Add 2h 40min to 09:15. First add 2 hours: 11:15. Then add 40 minutes: 11:55.',
    explanation: '09:15 + 2 hours = 11:15. 11:15 + 40 minutes = <b>11:55</b>.'
  }),

  makeNum({
    id: 'g6m-ts-034', chapterId: 'g6-time-speed', subsection: 'duration', difficulty: 2,
    question: 'A football match started at 16:20 and lasted 1 hour 45 minutes. At what time did it end? (Write in 24-hour format)',
    answer: '18:05',
    acceptableAnswers: ['18:05'],
    hint: 'Add 1h 45min to 16:20. First add 1 hour: 17:20. Then add 45 minutes: 17:20 + 45min = 18:05.',
    explanation: '16:20 + 1 hour = 17:20. 17:20 + 45 minutes: 17:20 + 40min = 18:00, then + 5min = <b>18:05</b>.'
  }),

  makeNum({
    id: 'g6m-ts-035', chapterId: 'g6-time-speed', subsection: 'duration', difficulty: 2,
    question: 'A patient has a doctor appointment at 10:40. She waits 35 minutes before being called in. At what time is she called? (Write in 24-hour format)',
    answer: '11:15',
    acceptableAnswers: ['11:15'],
    hint: 'Add 35 minutes to 10:40. 10:40 + 20min = 11:00, then + 15min = 11:15.',
    explanation: '10:40 + 35 minutes: 10:40 + 20min = 11:00, then 11:00 + 15min = <b>11:15</b>.'
  }),

  makeNum({
    id: 'g6m-ts-036', chapterId: 'g6-time-speed', subsection: 'duration', difficulty: 2,
    question: 'A film lasts 2 hours 15 minutes and starts at 19:50. At what time does it end? (Write in 24-hour format)',
    answer: '22:05',
    acceptableAnswers: ['22:05'],
    hint: 'Add 2h 15min to 19:50. First add 2 hours: 21:50. Then add 15 minutes: 22:05.',
    explanation: '19:50 + 2 hours = 21:50. 21:50 + 15 minutes = <b>22:05</b>.'
  }),

  makeNum({
    id: 'g6m-ts-037', chapterId: 'g6-time-speed', subsection: 'duration', difficulty: 2,
    question: 'An event runs from 11:55 to 14:10. How long does it last? (Answer in hours and minutes, e.g. 2h 15min)',
    answer: '2h 15min',
    acceptableAnswers: ['2h 15min', '2 hours 15 minutes', '135 min'],
    hint: 'From 11:55 to 14:10. Count forward: 11:55 to 13:55 = 2 hours, then 13:55 to 14:10 = 15 minutes.',
    explanation: '11:55 to 13:55 = 2 hours. 13:55 to 14:10 = 15 minutes. Total = <b>2 hours 15 minutes</b>.'
  }),

  makeNum({
    id: 'g6m-ts-038', chapterId: 'g6-time-speed', subsection: 'conversion', difficulty: 2,
    question: 'Convert 185 minutes into hours and minutes.',
    answer: '3h 5min',
    acceptableAnswers: ['3h 5min', '3 hours 5 minutes', '3 hours and 5 minutes'],
    hint: '60 minutes = 1 hour. Divide 185 by 60 to find full hours, the remainder is the minutes.',
    explanation: '185 ÷ 60 = 3 remainder 5. So 185 minutes = <b>3 hours 5 minutes</b>. Check: 3 × 60 = 180, and 185 − 180 = 5 minutes.'
  }),

  makeNum({
    id: 'g6m-ts-039', chapterId: 'g6-time-speed', subsection: 'conversion', difficulty: 2,
    question: 'How many minutes are there from 07:00 to 09:25?',
    answer: '145',
    acceptableAnswers: ['145', '145 minutes'],
    hint: 'From 07:00 to 09:00 = 2 hours = 120 minutes. From 09:00 to 09:25 = 25 minutes. Add them.',
    explanation: '07:00 to 09:00 = 2 hours = 120 minutes. 09:00 to 09:25 = 25 minutes. Total = 120 + 25 = <b>145 minutes</b>.'
  }),

  makeNum({
    id: 'g6m-ts-040', chapterId: 'g6-time-speed', subsection: 'conversion', difficulty: 2,
    question: 'How many seconds are there in 2 and a half minutes?',
    answer: '150',
    acceptableAnswers: ['150', '150 seconds'],
    hint: '1 minute = 60 seconds. 2.5 minutes × 60 = ?',
    explanation: '2.5 × 60 = <b>150 seconds</b>. Or: 2 minutes = 120 seconds, half a minute = 30 seconds, total = 150 seconds.'
  }),

  makeNum({
    id: 'g6m-ts-041', chapterId: 'g6-time-speed', subsection: 'speed', difficulty: 2,
    question: 'A plane flies 2700 km in 3 hours. What is its average speed in km/h?',
    answer: '900',
    acceptableAnswers: ['900', '900 km/h'],
    hint: 'Speed = Distance / Time.',
    explanation: 'Speed = 2700 / 3 = <b>900 km/h</b>. This is a typical cruising speed for a commercial jet aircraft.'
  }),

  makeNum({
    id: 'g6m-ts-042', chapterId: 'g6-time-speed', subsection: 'speed', difficulty: 3,
    question: 'A jogger runs 5 km in 25 minutes. What is the average speed in km/h? (Hint: convert 25 minutes to a fraction of an hour first.)',
    answer: '12',
    acceptableAnswers: ['12', '12 km/h'],
    hint: '25 minutes = 25/60 hours. Speed = 5 / (25/60) = 5 × (60/25).',
    explanation: '25 minutes = 25/60 = 5/12 hours. Speed = 5 ÷ (5/12) = 5 × 12/5 = <b>12 km/h</b>. Alternatively: in 60 minutes she would run 5 × (60/25) = 12 km, so her speed is 12 km/h.'
  })

);

})();
