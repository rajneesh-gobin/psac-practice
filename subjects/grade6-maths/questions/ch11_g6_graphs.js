'use strict';
// Grade 6 Maths — Chapter: Graphs (bar, line, pie charts)
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
    explanation:'<b>Banana</b> is the most popular fruit, with <b>30%</b> of the 200 students choosing it — the largest sector in the pie chart.' }),

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
    explanation:'<b>Tuesday</b> has the tallest bar in the chart, showing approximately 40 books were read — more than any other day shown.' }),

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
    explanation:'A <b>line graph</b> is ideal for showing how something changes over time — showing trends, rises, falls, and patterns. For example: daily temperature, monthly rainfall, or weekly sales figures.' }),

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
