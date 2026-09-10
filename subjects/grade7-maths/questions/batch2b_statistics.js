'use strict';
// Grade 7 Maths — Statistics (g7m-statistics), batch 2B
// IDs: g7m-statistics-009 … -020

(function () {

const _BAKERY = '<table class="q-table">' +
  '<tr><th>Day</th><th>Loaves sold</th></tr>' +
  '<tr><td>Monday</td><td>45</td></tr>' +
  '<tr><td>Tuesday</td><td>38</td></tr>' +
  '<tr><td>Wednesday</td><td>52</td></tr>' +
  '<tr><td>Thursday</td><td>41</td></tr>' +
  '<tr><td>Friday</td><td>64</td></tr></table>';

const _SVG_BARS = `<svg viewBox="0 0 260 175" width="260" height="175" role="img" aria-label="A bar chart with four bars of different heights, one for each sport" style="display:block;margin:6px auto;background:#f0fdfa;border-radius:8px;border:1px solid #99f6e4">
  <g stroke="#ccfbf1" stroke-width="1">
    <line x1="32" y1="124" x2="248" y2="124"/><line x1="32" y1="108" x2="248" y2="108"/>
    <line x1="32" y1="92" x2="248" y2="92"/><line x1="32" y1="76" x2="248" y2="76"/>
    <line x1="32" y1="60" x2="248" y2="60"/><line x1="32" y1="44" x2="248" y2="44"/>
    <line x1="32" y1="28" x2="248" y2="28"/><line x1="32" y1="12" x2="248" y2="12"/>
  </g>
  <rect x="44" y="28" width="34" height="112" fill="#2dd4bf" stroke="#0f766e" stroke-width="1.4"/>
  <rect x="96" y="76" width="34" height="64" fill="#2dd4bf" stroke="#0f766e" stroke-width="1.4"/>
  <rect x="148" y="92" width="34" height="48" fill="#2dd4bf" stroke="#0f766e" stroke-width="1.4"/>
  <rect x="200" y="44" width="34" height="96" fill="#2dd4bf" stroke="#0f766e" stroke-width="1.4"/>
  <line x1="32" y1="140" x2="248" y2="140" stroke="#134e4a" stroke-width="2"/>
  <line x1="32" y1="140" x2="32" y2="8" stroke="#134e4a" stroke-width="2"/>
  <g font-size="7.5" fill="#134e4a" text-anchor="end">
    <text x="28" y="143">0</text><text x="28" y="127">2</text><text x="28" y="111">4</text>
    <text x="28" y="95">6</text><text x="28" y="79">8</text><text x="28" y="63">10</text>
    <text x="28" y="47">12</text><text x="28" y="31">14</text><text x="28" y="15">16</text>
  </g>
  <g font-size="8" fill="#134e4a" text-anchor="middle">
    <text x="61" y="152">Football</text><text x="113" y="152">Athletics</text>
    <text x="165" y="152">Volleyball</text><text x="217" y="152">Swimming</text>
  </g>
  <text x="140" y="168" font-size="8" fill="#0f766e" text-anchor="middle">Number of pupils</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeNum({ id:'g7m-statistics-009', chapterId:'g7m-statistics', difficulty:3,
    subsection:'data_tables',
    question:`${_BAKERY}How many loaves did the bakery sell from Monday to Friday altogether?`,
    answer:240,
    hint:'Add the five daily totals. Pair numbers that make a round number to check yourself.',
    explanation:'45 + 38 + 52 + 41 + 64 = <b>240 loaves</b>. A quick check: five days averaging roughly 48 loaves should land near 240, so an answer under 200 or over 300 would be wrong at a glance.' }),

  makeMCQ({ id:'g7m-statistics-010', chapterId:'g7m-statistics', difficulty:3,
    subsection:'data_tables',
    question:`${_BAKERY}How many MORE loaves were sold on the busiest day than on the quietest day?`,
    options:['26','23','19','29'],
    answer:'26',
    hint:'Find the largest and the smallest figures in the table before you subtract.',
    explanation:'The busiest day is Friday with 64 and the quietest is Tuesday with 38, so 64 − 38 = <b>26</b>. Using Monday’s 45 as the smallest gives 19, and using Wednesday as the busiest gives 14.' }),

  makeMCQ({ id:'g7m-statistics-011', chapterId:'g7m-statistics', difficulty:2,
    subsection:'data_tables',
    question:'In a tally chart, one item is recorded as |||| |||| |||. What number does this show?',
    options:['13','11','12','14'],
    answer:'13',
    hint:'Tallies are grouped in fives, with the fifth stroke drawn across the other four.',
    explanation:'Two complete groups of five make 10, and the three loose strokes make <b>13</b>. Counting only the groups gives 10, and miscounting the loose strokes gives 12 or 14.' }),

  makeNum({ id:'g7m-statistics-012', chapterId:'g7m-statistics', difficulty:4,
    subsection:'data_tables',
    question:`${_BAKERY}The bakery sells each loaf for Rs 15. How many rupees did it take on Wednesday and Thursday together?`,
    answer:1395,
    hint:'Add the two days’ loaves first — that is much easier than pricing each day separately.',
    explanation:'52 + 41 = 93 loaves, and 93 × 15 = <b>Rs 1,395</b>. Pricing Wednesday alone gives Rs 780, and using all five days gives Rs 3,600.' }),

  makeNum({ id:'g7m-statistics-013', chapterId:'g7m-statistics', difficulty:2,
    subsection:'mean',
    question:'Find the mean of these five numbers: 12, 15, 9, 20, 14.',
    answer:14,
    hint:'Add them all, then share the total between however many numbers there are.',
    explanation:'12 + 15 + 9 + 20 + 14 = 70, and 70 ÷ 5 = <b>14</b>. Dividing by 4 instead of 5 gives 17.5 — the divisor is always how many values were added.' }),

  makeMCQ({ id:'g7m-statistics-014', chapterId:'g7m-statistics', difficulty:3,
    subsection:'mean',
    question:'The mean mass of six boxes is 8 kg. What is the total mass of the six boxes?',
    options:['48 kg','42 kg','54 kg','14 kg'],
    answer:'48 kg',
    hint:'The mean is the total divided by six, so run that division backwards.',
    explanation:'Total = mean × number of values = 8 × 6 = <b>48 kg</b>. 14 kg comes from adding 8 and 6 instead of multiplying, which would make each box lighter than the mean says.' }),

  makeMCQ({ id:'g7m-statistics-015', chapterId:'g7m-statistics', difficulty:4,
    subsection:'mean',
    question:'Four pupils have a mean test score of 62. A fifth pupil then scores 82. What is the mean score of all five pupils?',
    options:['66','64','68','72'],
    answer:'66',
    hint:'Turn the first mean back into a total before you bring the fifth score in.',
    explanation:'The four pupils total 4 × 62 = 248; adding 82 gives 330, and 330 ÷ 5 = <b>66</b>. Averaging 62 and 82 gives 72, which wrongly treats the fifth pupil as though she counted as much as the other four together.' }),

  makeNum({ id:'g7m-statistics-016', chapterId:'g7m-statistics', difficulty:4,
    subsection:'mean',
    question:`${_BAKERY}What is the mean number of loaves the bakery sold per day over these five days?`,
    answer:48,
    hint:'You need the five-day total first, and then the number of days.',
    explanation:'The total is 45 + 38 + 52 + 41 + 64 = 240, and 240 ÷ 5 = <b>48 loaves</b> per day. Notice that no single day equals the mean — the mean is a summary, not one of the values.' }),

  makeMCQ({ id:'g7m-statistics-017', chapterId:'g7m-statistics', difficulty:2,
    subsection:'bar_charts',
    question:`${_SVG_BARS}How many more pupils chose football than volleyball?`,
    options:['8','6','14','20'],
    answer:'8',
    hint:'Read the height of each bar against the scale, then subtract.',
    explanation:'Football has 14 and volleyball 6, so the difference is <b>8</b> pupils. 20 is the two bars added together, and 14 is football alone.' }),

  makeNum({ id:'g7m-statistics-018', chapterId:'g7m-statistics', difficulty:2,
    subsection:'bar_charts',
    question:`${_SVG_BARS}How many pupils took part in this survey altogether?`,
    answer:40,
    hint:'Every pupil chose exactly one sport, so every bar has to be counted.',
    explanation:'14 + 8 + 6 + 12 = <b>40 pupils</b>. Reading only the tallest bar, or forgetting one of the four, is the usual slip here.' }),

  makeMCQ({ id:'g7m-statistics-019', chapterId:'g7m-statistics', difficulty:3,
    subsection:'bar_charts',
    question:`${_SVG_BARS}What fraction of the pupils surveyed chose swimming?`,
    options:['3/10','1/4','1/5','2/5'],
    answer:'3/10',
    hint:'Compare the swimming bar with the total of all four bars, then simplify.',
    explanation:'12 out of 40 chose swimming, and 12/40 simplifies to <b>3/10</b>. 1/4 would be 10 pupils and 1/5 only 8, so neither matches the height of the swimming bar.' }),

  makeMCQ({ id:'g7m-statistics-020', chapterId:'g7m-statistics', difficulty:3,
    subsection:'bar_charts',
    question:'On a different bar chart, each square on the vertical axis stands for 2 pupils. One bar is exactly 7 squares tall. How many pupils does that bar represent?',
    options:['14','7','9','16'],
    answer:'14',
    hint:'The number of squares is not the number of pupils — check the scale first.',
    explanation:'7 squares × 2 pupils per square = <b>14 pupils</b>. Answering 7 reads the squares as pupils and ignores the scale, and 9 adds the 2 instead of multiplying by it.' })

);

})();
