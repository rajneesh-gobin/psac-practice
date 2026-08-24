'use strict';
// Grade 6 Maths - Chapter: Graphs (bar, line, pie charts)
// IDs format: g6m-gr-NNN

// Pie chart SVG showing favourite fruit data
const _SVG_PIE = `<svg viewBox="0 0 240 140" width="240" height="140" style="display:block;margin:6px auto;background:#fefce8;border-radius:8px;border:1px solid #fde68a">
  <circle cx="80" cy="70" r="55" fill="#e2e8f0"/>
  <path d="M80,70 L80,15 A55,55 0 0,1 130.8,42.5 Z" fill="#3b82f6"/>
  <path d="M80,70 L130.8,42.5 A55,55 0 0,1 118.3,120.3 Z" fill="#22c55e"/>
  <path d="M80,70 L118.3,120.3 A55,55 0 0,1 29.2,98.3 Z" fill="#f97316"/>
  <path d="M80,70 L29.2,98.3 A55,55 0 0,1 80,15 Z" fill="#a855f7"/>
  <text x="105" y="52" font-size="7" fill="white" font-weight="bold">Mango</text>
  <text x="108" y="62" font-size="7" fill="white">25%</text>
  <text x="107" y="90" font-size="7" fill="white" font-weight="bold">Banana</text>
  <text x="108" y="100" font-size="7" fill="white">30%</text>
  <text x="42" y="100" font-size="7" fill="white" font-weight="bold">Apple</text>
  <text x="44" y="110" font-size="7" fill="white">25%</text>
  <text x="40" y="60" font-size="7" fill="white" font-weight="bold">Papaya</text>
  <text x="44" y="70" font-size="7" fill="white">20%</text>
  <rect x="148" y="20" width="10" height="8" fill="#3b82f6"/>
  <text x="162" y="28" font-size="7" fill="#334155">Mango 25%</text>
  <rect x="148" y="34" width="10" height="8" fill="#22c55e"/>
  <text x="162" y="42" font-size="7" fill="#334155">Banana 30%</text>
  <rect x="148" y="48" width="10" height="8" fill="#f97316"/>
  <text x="162" y="56" font-size="7" fill="#334155">Apple 25%</text>
  <rect x="148" y="62" width="10" height="8" fill="#a855f7"/>
  <text x="162" y="70" font-size="7" fill="#334155">Papaya 20%</text>
  <text x="80" y="135" text-anchor="middle" font-size="6.5" fill="#64748b">Favourite fruit of 200 students</text>
</svg>`;

// Simple bar chart SVG
const _SVG_BAR = `<svg viewBox="0 0 240 120" width="240" height="120" style="display:block;margin:6px auto;background:#f0fdf4;border-radius:8px;border:1px solid #86efac">
  <line x1="30" y1="10" x2="30" y2="95" stroke="#475569" stroke-width="1.5"/>
  <line x1="30" y1="95" x2="225" y2="95" stroke="#475569" stroke-width="1.5"/>
  <rect x="45" y="45" width="28" height="50" fill="#3b82f6"/>
  <rect x="90" y="25" width="28" height="70" fill="#22c55e"/>
  <rect x="135" y="55" width="28" height="40" fill="#f97316"/>
  <rect x="180" y="35" width="28" height="60" fill="#a855f7"/>
  <text x="59" y="108" text-anchor="middle" font-size="7" fill="#334155">Mon</text>
  <text x="104" y="108" text-anchor="middle" font-size="7" fill="#334155">Tue</text>
  <text x="149" y="108" text-anchor="middle" font-size="7" fill="#334155">Wed</text>
  <text x="194" y="108" text-anchor="middle" font-size="7" fill="#334155">Thu</text>
  <text x="22" y="95" text-anchor="end" font-size="6.5" fill="#475569">0</text>
  <text x="22" y="75" text-anchor="end" font-size="6.5" fill="#475569">10</text>
  <text x="22" y="55" text-anchor="end" font-size="6.5" fill="#475569">20</text>
  <text x="22" y="35" text-anchor="end" font-size="6.5" fill="#475569">30</text>
  <text x="22" y="15" text-anchor="end" font-size="6.5" fill="#475569">40</text>
  <line x1="30" y1="75" x2="225" y2="75" stroke="#e2e8f0" stroke-width="0.8"/>
  <line x1="30" y1="55" x2="225" y2="55" stroke="#e2e8f0" stroke-width="0.8"/>
  <line x1="30" y1="35" x2="225" y2="35" stroke="#e2e8f0" stroke-width="0.8"/>
  <line x1="30" y1="15" x2="225" y2="15" stroke="#e2e8f0" stroke-width="0.8"/>
  <text x="120" y="118" text-anchor="middle" font-size="6.5" fill="#64748b">Books read per day (each unit = 10 books)</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6m-gr-001', chapterId:'g6-graphs', difficulty:1,
    question:`${_SVG_PIE}Looking at the pie chart, which fruit is the MOST popular?`,
    options:['Mango','Banana','Apple','Papaya'],
    answer:'Banana',
    hint:'The largest sector of the pie chart represents the most popular choice.',
    explanation:'<b>Banana</b> is the most popular fruit, with <b>30%</b> of the 200 students choosing it - the largest sector in the pie chart.' }),

  makeNum({ id:'g6m-gr-002', chapterId:'g6-graphs', difficulty:2,
    question:`${_SVG_PIE}There are 200 students in total. How many students chose MANGO?`,
    answer:'50', acceptableAnswers:['50'],
    hint:'Mango = 25%. Calculate 25% of 200.',
    explanation:'25% of 200 = (25÷100) × 200 = 0.25 × 200 = <b>50 students</b>.' }),

  makeNum({ id:'g6m-gr-003', chapterId:'g6-graphs', difficulty:2,
    question:`${_SVG_PIE}Using the pie chart, how many students chose PAPAYA out of 200 students total?`,
    answer:'40', acceptableAnswers:['40'],
    hint:'Papaya = 20%. Find 20% of 200.',
    explanation:'20% of 200 = (20÷100) × 200 = 0.20 × 200 = <b>40 students</b>.' }),

  makeMCQ({ id:'g6m-gr-004', chapterId:'g6-graphs', difficulty:2,
    question:'In a pie chart, what does a sector of 90° represent as a percentage of the whole?',
    options:['25%','30%','50%','45%'],
    answer:'25%',
    hint:'A full circle = 360°. What fraction of 360° is 90°?',
    explanation:'90° out of 360° = 90/360 = 1/4 = <b>25%</b> of the whole pie chart.' }),

  makeMCQ({ id:'g6m-gr-005', chapterId:'g6-graphs', difficulty:1,
    question:`${_SVG_BAR}Using the bar chart, on which day were the MOST books read?`,
    options:['Monday','Tuesday','Wednesday','Thursday'],
    answer:'Tuesday',
    hint:'Compare the heights of the four bars.',
    explanation:'<b>Tuesday</b> has the tallest bar in the chart, showing approximately 40 books were read - more than any other day shown.' }),

  makeMCQ({ id:'g6m-gr-006', chapterId:'g6-graphs', difficulty:2,
    question:'A line graph shows temperature over 5 days. On Monday it was 24°C and on Friday it was 29°C. The line rises steadily. What was the temperature on Wednesday (middle day)?',
    options:['25°C','26°C','26.5°C','27°C'],
    answer:'26.5°C',
    hint:'The rise from Monday to Friday is 5°C over 4 intervals. Each day rises by 5÷4 = 1.25°C.',
    explanation:'Rise = 29°C − 24°C = 5°C over 4 intervals (Mon→Tue, Tue→Wed, Wed→Thu, Thu→Fri). Each interval = 5÷4 = 1.25°C. Wednesday (2 intervals from Monday) = 24 + 2×1.25 = 24 + 2.5 = <b>26.5°C</b>.' }),

  makeMCQ({ id:'g6m-gr-007', chapterId:'g6-graphs', difficulty:2,
    question:'What is the BEST type of graph to use when comparing amounts in DIFFERENT categories (e.g. sales in different months)?',
    options:['Pie chart','Line graph','Bar chart','Pictogram'],
    answer:'Bar chart',
    hint:'Which graph uses vertical or horizontal bars whose height/length shows the quantity?',
    explanation:'A <b>bar chart</b> is best for comparing discrete categories side by side. A pie chart shows parts of a whole. A line graph shows change over time. A bar chart clearly shows which category has the greatest or smallest value.' }),

  makeMCQ({ id:'g6m-gr-008', chapterId:'g6-graphs', difficulty:2,
    question:'A LINE GRAPH is most useful for showing:',
    options:[
      'The proportion of a total that each category represents',
      'Changes over time (trends)',
      'The comparison of totally unrelated groups',
      'Parts of a whole adding up to 100%'
    ],
    answer:'Changes over time (trends)',
    hint:'Think of temperature recorded every day for a week.',
    explanation:'A <b>line graph</b> is ideal for showing how something changes over time - showing trends, rises, falls, and patterns. For example: daily temperature, monthly rainfall, or weekly sales figures.' }),

  makeTF({ id:'g6m-gr-009', chapterId:'g6-graphs', difficulty:1,
    question:'In a pie chart, all sectors together must represent exactly 100% (or 360°).',
    answer:true,
    hint:'A pie chart shows the parts of a whole.',
    explanation:'<b>True</b>. A pie chart represents a whole (100% = 360°). All sectors added together must equal 100% (or equivalently 360°). If they do not, the data or chart is incorrect.' }),

  makeNum({ id:'g6m-gr-010', chapterId:'g6-graphs', difficulty:2,
    question:'A pie chart shows that 40% of students prefer football. If the chart has 360° in total, how many degrees represent football?',
    answer:'144', acceptableAnswers:['144','144°'],
    hint:'Degrees = percentage × 360 ÷ 100. Or: 40% of 360°.',
    explanation:'40% of 360° = (40÷100) × 360 = 0.4 × 360 = <b>144°</b>.' })

);


STATIC_QUESTIONS.push(

  makeNum({ id:'g6m-gr-011', chapterId:'g6-graphs', difficulty:1,
    question:'Find the MEAN of these five values: 12, 15, 18, 9, 16.',
    answer:'14', acceptableAnswers:['14'],
    hint:'Mean = Sum / Number of values. Add all 5 values first.',
    explanation:'Sum = 12 + 15 + 18 + 9 + 16 = 70. Mean = 70 / 5 = <b>14</b>. The mean is the most common type of average. MIE Grade 6: Mean = Total / Number of items.' }),

  makeNum({ id:'g6m-gr-012', chapterId:'g6-graphs', difficulty:1,
    question:'Find the RANGE of these values: 23, 7, 15, 19, 11, 8.',
    answer:'16', acceptableAnswers:['16'],
    hint:'Range = Highest value - Lowest value.',
    explanation:'Highest = 23. Lowest = 7. Range = 23 - 7 = <b>16</b>. The range measures the spread of data. A larger range means data is more spread out; a smaller range means data is more consistent.' }),

  makeNum({ id:'g6m-gr-013', chapterId:'g6-graphs', difficulty:2,
    question:'In a pie chart, 1/3 of students chose cricket as their favourite sport. How many DEGREES does the cricket sector represent?',
    answer:'120', acceptableAnswers:['120','120 degrees'],
    hint:'1/3 of 360 degrees. Or: 360 / 3.',
    explanation:'1/3 of 360 degrees = 360 / 3 = <b>120 degrees</b>. To find degrees for any fraction: multiply 360 by the fraction. For a percentage: (percentage / 100) x 360. Example: 25% = (25/100) x 360 = 90 degrees.' }),

  makeMCQ({ id:'g6m-gr-014', chapterId:'g6-graphs', difficulty:2,
    question:'In a pictogram, each full symbol represents 8 students. A row shows 3 and a half symbols. How many students does this row represent?',
    options:['28','24','32','3.5'],
    answer:'28',
    hint:'Multiply the number of symbols by the value each symbol represents. Half symbol = 4 students.',
    explanation:'3 full symbols = 3 x 8 = 24. Half symbol = 4. Total = 24 + 4 = <b>28 students</b>. Always check the key (legend) of a pictogram to find the value of each symbol before reading the data.' }),

  makeMCQ({ id:'g6m-gr-015', chapterId:'g6-graphs', difficulty:2,
    question:'A sector in a pie chart represents 72 degrees. What PERCENTAGE of the whole does this sector represent?',
    options:['20%','25%','18%','72%'],
    answer:'20%',
    hint:'Percentage = (degrees / 360) x 100.',
    explanation:'Percentage = (72 / 360) x 100 = 0.2 x 100 = <b>20%</b>. Divide the sector angle by 360 degrees and multiply by 100. Reverse: degrees to % divide by 360 x 100; % to degrees multiply by 360 / 100.' }),

  makeNum({ id:'g6m-gr-016', chapterId:'g6-graphs', difficulty:2,
    question:'Point A is at coordinates (2, 3) and Point B is at (7, 3). Both points share the same y-coordinate. What is the DISTANCE between them?',
    answer:'5', acceptableAnswers:['5','5 units'],
    hint:'When y-coordinates are equal, the points lie on a horizontal line. Distance = difference in x-values.',
    explanation:'Both points have y = 3, so they lie on a horizontal line. Distance = 7 - 2 = <b>5 units</b>. For horizontal lines: distance = |x2 - x1|. For vertical lines: distance = |y2 - y1|. MIE Grade 6 coordinates use the standard (x, y) notation with x horizontal and y vertical.' }),

  makeNum({ id:'g6m-gr-017', chapterId:'g6-graphs', difficulty:2,
    question:'A bar chart shows monthly rainfall for 4 months: January 120 mm, February 80 mm, March 60 mm, April 40 mm. What is the MEAN monthly rainfall?',
    answer:'75', acceptableAnswers:['75','75 mm'],
    hint:'Mean = Sum / Number of months. Sum = 120 + 80 + 60 + 40.',
    explanation:'Sum = 120 + 80 + 60 + 40 = 300 mm. Mean = 300 / 4 = <b>75 mm</b>. Reading data from charts and then performing calculations is a key MIE Grade 6 data handling skill.' }),

  makeTF({ id:'g6m-gr-018', chapterId:'g6-graphs', difficulty:2,
    question:'In a correctly drawn bar chart, all bars must have EQUAL WIDTH and EQUAL SPACING between them.',
    answer:true,
    hint:'Think about what makes a bar chart fair and easy to read.',
    explanation:'<b>True.</b> In a correctly drawn bar chart: bars have equal width, equal gaps between them, a clearly labelled scale on the y-axis, and labelled categories on the x-axis. Unequal bar widths would make bars appear to represent different totals, misleading the reader.' }),

  makeNum({ id:'g6m-gr-019', chapterId:'g6-graphs', difficulty:4,
    question:'Five students scored: 62, 78, 55, 84 and 71 in a Maths test. A sixth student then scored 91. What is the NEW MEAN score for all 6 students?',
    answer:'73.5', acceptableAnswers:['73.5'],
    hint:'Sum of first 5 scores: 62+78+55+84+71. Add the 6th. Divide total by 6.',
    explanation:'Sum of 5 scores = 62 + 78 + 55 + 84 + 71 = 350. Original mean = 350 / 5 = 70. New sum = 350 + 91 = 441. New mean = 441 / 6 = <b>73.5</b>. The mean increased because 91 is above the original mean of 70.' })

);
