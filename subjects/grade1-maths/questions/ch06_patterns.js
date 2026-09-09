'use strict';
(function () {

// ── repeating_patterns (001–025) ──────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g1mth-pat-001', chapterId:'g1mth-patterns', difficulty:1, subsection:'repeating_patterns',
    question:'The pattern is: circle, square, circle, square, ___. What comes next?',
    options:['circle','triangle','rectangle','square'], answer:'circle',
    hint:'The pattern is circle, square, circle, square — it repeats.',
    explanation:'The pattern repeats: circle, square. After square comes <b>circle</b>.' }),

  makeMCQ({ id:'g1mth-pat-002', chapterId:'g1mth-patterns', difficulty:1, subsection:'repeating_patterns',
    question:'red, blue, red, blue, red, ___. What comes next?',
    options:['blue','red','green','yellow'], answer:'blue',
    hint:'The colours repeat: red, blue, red, blue…',
    explanation:'The pattern is red, blue repeating. After red comes <b>blue</b>.' }),

  makeMCQ({ id:'g1mth-pat-003', chapterId:'g1mth-patterns', difficulty:1, subsection:'repeating_patterns',
    question:'triangle, triangle, circle, triangle, triangle, ___. What comes next?',
    options:['circle','square','triangle','rectangle'], answer:'circle',
    hint:'The pattern is: triangle, triangle, circle.',
    explanation:'The pattern repeats: triangle, triangle, circle. After two triangles comes <b>circle</b>.' }),

  makeMCQ({ id:'g1mth-pat-004', chapterId:'g1mth-patterns', difficulty:1, subsection:'repeating_patterns',
    question:'A, B, A, B, A, ___. What comes next?',
    options:['B','A','C','D'], answer:'B',
    hint:'The pattern is A, B repeating.',
    explanation:'The pattern A, B repeats. After A comes <b>B</b>.' }),

  makeMCQ({ id:'g1mth-pat-005', chapterId:'g1mth-patterns', difficulty:1, subsection:'repeating_patterns',
    question:'big, small, big, small, ___. What comes next?',
    options:['big','small','medium','very big'], answer:'big',
    hint:'The pattern is big, small repeating.',
    explanation:'The pattern big, small repeats. After small comes <b>big</b>.' }),

  makeMCQ({ id:'g1mth-pat-006', chapterId:'g1mth-patterns', difficulty:1, subsection:'repeating_patterns',
    question:'🌟 ⭐ 🌟 ⭐ 🌟 ___. What comes next?',
    options:['⭐','🌟','💫','✨'], answer:'⭐',
    hint:'The pattern is big star, small star repeating.',
    explanation:'The pattern repeats: 🌟 ⭐. After 🌟 comes <b>⭐</b>.' }),

  makeMCQ({ id:'g1mth-pat-007', chapterId:'g1mth-patterns', difficulty:1, subsection:'repeating_patterns',
    question:'clap, stamp, clap, stamp, ___. What comes next?',
    options:['clap','stamp','jump','sit'], answer:'clap',
    hint:'The pattern is clap, stamp repeating.',
    explanation:'The pattern clap, stamp repeats. After stamp comes <b>clap</b>.' }),

  makeMCQ({ id:'g1mth-pat-008', chapterId:'g1mth-patterns', difficulty:1, subsection:'repeating_patterns',
    question:'The pattern is A, A, B, A, A, ___. What comes next?',
    options:['B','A','C','D'], answer:'B',
    hint:'The pattern is A, A, B repeating.',
    explanation:'The pattern A, A, B repeats. After A, A comes <b>B</b>.' }),

  makeMCQ({ id:'g1mth-pat-009', chapterId:'g1mth-patterns', difficulty:1, subsection:'repeating_patterns',
    question:'mango, papaya, mango, papaya, ___. What comes next?',
    options:['mango','papaya','lychee','orange'], answer:'mango',
    hint:'The pattern is mango, papaya repeating.',
    explanation:'The pattern mango, papaya repeats. After papaya comes <b>mango</b>.' }),

  makeMCQ({ id:'g1mth-pat-010', chapterId:'g1mth-patterns', difficulty:1, subsection:'repeating_patterns',
    question:'1, 2, 3, 1, 2, 3, 1, ___. What comes next?',
    options:['2','1','3','4'], answer:'2',
    hint:'The pattern is 1, 2, 3 repeating.',
    explanation:'The pattern 1, 2, 3 repeats. After 1 comes <b>2</b>.' }),

  makeMCQ({ id:'g1mth-pat-011', chapterId:'g1mth-patterns', difficulty:1, subsection:'repeating_patterns',
    question:'red, red, blue, red, red, ___. What comes next?',
    options:['blue','red','green','yellow'], answer:'blue',
    hint:'The pattern is red, red, blue repeating.',
    explanation:'The pattern red, red, blue repeats. After red, red comes <b>blue</b>.' }),

  makeMCQ({ id:'g1mth-pat-012', chapterId:'g1mth-patterns', difficulty:1, subsection:'repeating_patterns',
    question:'square, circle, square, circle, ___. What comes next?',
    options:['square','circle','triangle','rectangle'], answer:'square',
    hint:'The pattern is square, circle repeating.',
    explanation:'The pattern square, circle repeats. After circle comes <b>square</b>.' }),

  makeMCQ({ id:'g1mth-pat-013', chapterId:'g1mth-patterns', difficulty:1, subsection:'repeating_patterns',
    question:'What is the MISSING shape: circle, square, ___, circle, square, triangle?',
    options:['triangle','circle','square','rectangle'], answer:'triangle',
    hint:'The pattern is circle, square, triangle repeating.',
    explanation:'The pattern is circle, square, triangle. The missing shape is <b>triangle</b>.' }),

  makeMCQ({ id:'g1mth-pat-014', chapterId:'g1mth-patterns', difficulty:2, subsection:'repeating_patterns',
    question:'Rani is making a bead pattern: red, blue, green, red, blue, green, red, ___.',
    options:['blue','green','red','yellow'], answer:'blue',
    hint:'The pattern is red, blue, green repeating.',
    explanation:'The pattern red, blue, green repeats. After red comes <b>blue</b>.' }),

  makeMCQ({ id:'g1mth-pat-015', chapterId:'g1mth-patterns', difficulty:1, subsection:'repeating_patterns',
    question:'up, up, down, up, up, ___. What comes next?',
    options:['down','up','left','right'], answer:'down',
    hint:'The pattern is up, up, down repeating.',
    explanation:'The pattern up, up, down repeats. After up, up comes <b>down</b>.' }),

  makeMCQ({ id:'g1mth-pat-016', chapterId:'g1mth-patterns', difficulty:1, subsection:'repeating_patterns',
    question:'Which shape comes NEXT: triangle, square, triangle, square, triangle, ___?',
    options:['square','triangle','circle','rectangle'], answer:'square',
    hint:'Triangle, square repeats.',
    explanation:'The pattern triangle, square repeats. After triangle comes <b>square</b>.' }),

  makeMCQ({ id:'g1mth-pat-017', chapterId:'g1mth-patterns', difficulty:1, subsection:'repeating_patterns',
    question:'Stamp, clap, clap, stamp, clap, clap, ___. What comes next?',
    options:['stamp','clap','jump','sit'], answer:'stamp',
    hint:'The pattern is stamp, clap, clap repeating.',
    explanation:'The pattern stamp, clap, clap repeats. After clap, clap comes <b>stamp</b>.' }),

  makeMCQ({ id:'g1mth-pat-018', chapterId:'g1mth-patterns', difficulty:2, subsection:'repeating_patterns',
    question:'Tom\'s pattern: A, B, C, A, B, C, A, B, ___. What comes next?',
    options:['C','A','B','D'], answer:'C',
    hint:'The pattern A, B, C repeats. After A, B comes ___.',
    explanation:'The pattern A, B, C repeats. After B comes <b>C</b>.' }),

  makeMCQ({ id:'g1mth-pat-019', chapterId:'g1mth-patterns', difficulty:1, subsection:'repeating_patterns',
    question:'yellow, yellow, yellow, yellow, ___. What comes next?',
    options:['yellow','blue','red','green'], answer:'yellow',
    hint:'The pattern is just yellow repeating.',
    explanation:'The pattern is yellow, yellow, yellow. It keeps repeating: <b>yellow</b>.' }),

  makeMCQ({ id:'g1mth-pat-020', chapterId:'g1mth-patterns', difficulty:2, subsection:'repeating_patterns',
    question:'Mia lines up her toys: doll, car, doll, car, doll. How many toys are there?',
    options:['5','4','6','3'], answer:'5',
    hint:'Count: doll (1), car (2), doll (3), car (4), doll (5).',
    explanation:'There are <b>5</b> toys in the line.' }),

  makeMCQ({ id:'g1mth-pat-021', chapterId:'g1mth-patterns', difficulty:1, subsection:'repeating_patterns',
    question:'big, big, small, big, big, ___. What comes next?',
    options:['small','big','medium','tiny'], answer:'small',
    hint:'The pattern is big, big, small repeating.',
    explanation:'The pattern big, big, small repeats. After big, big comes <b>small</b>.' }),

  makeMCQ({ id:'g1mth-pat-022', chapterId:'g1mth-patterns', difficulty:1, subsection:'repeating_patterns',
    question:'Which colour is MISSING: red, blue, ___, red, blue, green?',
    options:['green','red','blue','yellow'], answer:'green',
    hint:'The pattern is red, blue, green repeating.',
    explanation:'The pattern is red, blue, green. The missing colour is <b>green</b>.' }),

  makeMCQ({ id:'g1mth-pat-023', chapterId:'g1mth-patterns', difficulty:1, subsection:'repeating_patterns',
    question:'Dev\'s pattern: 🐱 🐶 🐱 🐶 ___. What comes next?',
    options:['🐱','🐶','🐰','🐸'], answer:'🐱',
    hint:'The pattern is cat, dog repeating.',
    explanation:'The pattern cat, dog repeats. After dog comes <b>cat</b>.' }),

  makeMCQ({ id:'g1mth-pat-024', chapterId:'g1mth-patterns', difficulty:2, subsection:'repeating_patterns',
    question:'Rani draws: circle, circle, square, circle, circle, square. How many squares are there?',
    options:['2','1','3','4'], answer:'2',
    hint:'Count the squares in the pattern.',
    explanation:'There are <b>2</b> squares in the pattern.' }),

  makeMCQ({ id:'g1mth-pat-025', chapterId:'g1mth-patterns', difficulty:1, subsection:'repeating_patterns',
    question:'fast, slow, fast, slow, ___. What comes next?',
    options:['fast','slow','stop','medium'], answer:'fast',
    hint:'The pattern is fast, slow repeating.',
    explanation:'The pattern fast, slow repeats. After slow comes <b>fast</b>.' })
);

// ── number_patterns (026–050) ─────────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g1mth-pat-026', chapterId:'g1mth-patterns', difficulty:1, subsection:'number_patterns',
    question:'2, 4, 6, 8, ___. What comes next?',
    options:['10','9','11','7'], answer:'10',
    hint:'Count up in 2s.',
    explanation:'Counting in 2s: 2, 4, 6, 8, <b>10</b>.' }),

  makeMCQ({ id:'g1mth-pat-027', chapterId:'g1mth-patterns', difficulty:1, subsection:'number_patterns',
    question:'5, 10, 15, 20, ___. What comes next?',
    options:['25','22','24','30'], answer:'25',
    hint:'Count up in 5s.',
    explanation:'Counting in 5s: 5, 10, 15, 20, <b>25</b>.' }),

  makeMCQ({ id:'g1mth-pat-028', chapterId:'g1mth-patterns', difficulty:1, subsection:'number_patterns',
    question:'10, 20, ___. Count in 10s. What comes next?',
    options:['30','25','40','35'], answer:'30',
    hint:'Add 10 each time.',
    explanation:'Counting in 10s: 10, 20, <b>30</b>.' }),

  makeMCQ({ id:'g1mth-pat-029', chapterId:'g1mth-patterns', difficulty:1, subsection:'number_patterns',
    question:'1, 2, 3, 4, 5, ___. What comes next?',
    options:['6','7','5','4'], answer:'6',
    hint:'Count up in 1s.',
    explanation:'Counting in 1s: 1, 2, 3, 4, 5, <b>6</b>.' }),

  makeMCQ({ id:'g1mth-pat-030', chapterId:'g1mth-patterns', difficulty:1, subsection:'number_patterns',
    question:'What is MISSING? 2, 4, ___, 8, 10.',
    options:['6','5','7','3'], answer:'6',
    hint:'Count in 2s: 2, 4, ?, 8, 10.',
    explanation:'Counting in 2s: 2, 4, <b>6</b>, 8, 10.' }),

  makeMCQ({ id:'g1mth-pat-031', chapterId:'g1mth-patterns', difficulty:1, subsection:'number_patterns',
    question:'5, 10, ___, 20, 25. What is missing?',
    options:['15','12','14','16'], answer:'15',
    hint:'Count in 5s: 5, 10, ?, 20, 25.',
    explanation:'Counting in 5s: 5, 10, <b>15</b>, 20, 25.' }),

  makeMCQ({ id:'g1mth-pat-032', chapterId:'g1mth-patterns', difficulty:1, subsection:'number_patterns',
    question:'How many do we add each time when counting in 2s?',
    options:['2','1','5','10'], answer:'2',
    hint:'2, 4, 6 — each number is 2 more.',
    explanation:'We add <b>2</b> each time when counting in 2s.' }),

  makeMCQ({ id:'g1mth-pat-033', chapterId:'g1mth-patterns', difficulty:1, subsection:'number_patterns',
    question:'How many do we add each time when counting in 5s?',
    options:['5','2','10','1'], answer:'5',
    hint:'5, 10, 15 — each number is 5 more.',
    explanation:'We add <b>5</b> each time when counting in 5s.' }),

  makeMCQ({ id:'g1mth-pat-034', chapterId:'g1mth-patterns', difficulty:1, subsection:'number_patterns',
    question:'Count in 10s: 10, 20, 30, ___.',
    options:['40','35','45','50'], answer:'40',
    hint:'Add 10 to 30.',
    explanation:'Counting in 10s: 10, 20, 30, <b>40</b>.' }),

  makeMCQ({ id:'g1mth-pat-035', chapterId:'g1mth-patterns', difficulty:2, subsection:'number_patterns',
    question:'Tom counts in 2s starting from 0: 0, 2, 4, 6, ___.',
    options:['8','7','9','10'], answer:'8',
    hint:'Add 2 to 6.',
    explanation:'0, 2, 4, 6, <b>8</b> — counting in 2s.' }),

  makeMCQ({ id:'g1mth-pat-036', chapterId:'g1mth-patterns', difficulty:1, subsection:'number_patterns',
    question:'What comes next when counting in 1s: 17, 18, 19, ___?',
    options:['20','21','18','22'], answer:'20',
    hint:'Add 1 to 19.',
    explanation:'17, 18, 19, <b>20</b> — counting in 1s.' }),

  makeMCQ({ id:'g1mth-pat-037', chapterId:'g1mth-patterns', difficulty:1, subsection:'number_patterns',
    question:'Which number is MISSING when counting in 5s: 5, 10, ___, 20?',
    options:['15','12','14','16'], answer:'15',
    hint:'5 + 5 + 5 = 15.',
    explanation:'Counting in 5s: 5, 10, <b>15</b>, 20.' }),

  makeMCQ({ id:'g1mth-pat-038', chapterId:'g1mth-patterns', difficulty:1, subsection:'number_patterns',
    question:'Count in 2s: 6, 8, ___, 12.',
    options:['10','9','11','7'], answer:'10',
    hint:'Add 2 to 8.',
    explanation:'6, 8, <b>10</b>, 12 — counting in 2s.' }),

  makeMCQ({ id:'g1mth-pat-039', chapterId:'g1mth-patterns', difficulty:2, subsection:'number_patterns',
    question:'Rani has 5 rupees. Every day she saves 5 more. After 3 days, how much does she have?',
    options:['15','10','20','5'], answer:'15',
    hint:'5, 10, 15 — count in 5s for 3 days.',
    explanation:'5 → 10 → <b>15</b>. After 3 days, Rani has 15 rupees.' }),

  makeMCQ({ id:'g1mth-pat-040', chapterId:'g1mth-patterns', difficulty:1, subsection:'number_patterns',
    question:'Which numbers are even when you count in 2s starting from 2?',
    options:['2, 4, 6, 8, 10','1, 3, 5, 7, 9','2, 5, 8, 11','1, 2, 3, 4, 5'], answer:'2, 4, 6, 8, 10',
    hint:'Counting in 2s from 2 gives even numbers.',
    explanation:'Counting in 2s from 2: <b>2, 4, 6, 8, 10</b> — all even numbers.' }),

  makeMCQ({ id:'g1mth-pat-041', chapterId:'g1mth-patterns', difficulty:1, subsection:'number_patterns',
    question:'Count in 10s: ___, 20, 30, 40. What is the first number?',
    options:['10','0','5','15'], answer:'10',
    hint:'What comes before 20 when counting in 10s?',
    explanation:'Counting in 10s: <b>10</b>, 20, 30, 40.' }),

  makeMCQ({ id:'g1mth-pat-042', chapterId:'g1mth-patterns', difficulty:2, subsection:'number_patterns',
    question:'Dev has 10 lychees. Each day he picks 10 more. After 2 more days, how many will he have?',
    options:['30','20','40','10'], answer:'30',
    hint:'10, 20, 30 — count in 10s.',
    explanation:'10 → 20 → <b>30</b>. After 2 more days, Dev has 30 lychees.' }),

  makeMCQ({ id:'g1mth-pat-043', chapterId:'g1mth-patterns', difficulty:1, subsection:'number_patterns',
    question:'What is the NEXT number when counting backwards in 2s: 10, 8, 6, ___?',
    options:['4','5','3','2'], answer:'4',
    hint:'Take away 2 from 6.',
    explanation:'10, 8, 6, <b>4</b> — counting down in 2s.' }),

  makeMCQ({ id:'g1mth-pat-044', chapterId:'g1mth-patterns', difficulty:1, subsection:'number_patterns',
    question:'Count in 5s: 20, 15, 10, ___. What comes next?',
    options:['5','0','3','8'], answer:'5',
    hint:'We are counting DOWN in 5s. Take 5 from 10.',
    explanation:'Counting down in 5s: 20, 15, 10, <b>5</b>.' }),

  makeMCQ({ id:'g1mth-pat-045', chapterId:'g1mth-patterns', difficulty:2, subsection:'number_patterns',
    question:'Mia saves 2 rupees every day. She starts with 0. How much does she have after 5 days?',
    options:['10','8','12','5'], answer:'10',
    hint:'Count in 2s: 0, 2, 4, 6, 8, 10.',
    explanation:'2, 4, 6, 8, <b>10</b>. After 5 days, Mia has 10 rupees.' }),

  makeMCQ({ id:'g1mth-pat-046', chapterId:'g1mth-patterns', difficulty:1, subsection:'number_patterns',
    question:'When counting in 10s, what comes after 10?',
    options:['20','11','15','100'], answer:'20',
    hint:'Add 10 to 10.',
    explanation:'10 + 10 = <b>20</b>.' }),

  makeMCQ({ id:'g1mth-pat-047', chapterId:'g1mth-patterns', difficulty:1, subsection:'number_patterns',
    question:'Count in 2s: 12, 14, 16, ___.',
    options:['18','17','19','15'], answer:'18',
    hint:'Add 2 to 16.',
    explanation:'12, 14, 16, <b>18</b>.' }),

  makeMCQ({ id:'g1mth-pat-048', chapterId:'g1mth-patterns', difficulty:1, subsection:'number_patterns',
    question:'What comes before 10 when counting in 5s: ___, 10, 15, 20?',
    options:['5','0','8','3'], answer:'5',
    hint:'10 − 5 = 5.',
    explanation:'Counting in 5s: <b>5</b>, 10, 15, 20.' }),

  makeMCQ({ id:'g1mth-pat-049', chapterId:'g1mth-patterns', difficulty:2, subsection:'number_patterns',
    question:'Tom writes every second number: 1, ___, 3, ___, 5. What fills the blanks?',
    options:['2 and 4','1 and 3','3 and 5','0 and 2'], answer:'2 and 4',
    hint:'Count in 1s and pick every other number.',
    explanation:'The sequence is 1, <b>2</b>, 3, <b>4</b>, 5.' }),

  makeMCQ({ id:'g1mth-pat-050', chapterId:'g1mth-patterns', difficulty:1, subsection:'number_patterns',
    question:'Count in 2s: 4, 6, 8, ___, 12.',
    options:['10','9','11','7'], answer:'10',
    hint:'Add 2 to 8.',
    explanation:'4, 6, 8, <b>10</b>, 12.' })
);

// ── odd_even_patterns (051–075) ───────────────────────────────────────────────

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g1mth-pat-051', chapterId:'g1mth-patterns', difficulty:1, subsection:'odd_even_patterns',
    question:'Is 9 odd or even?',
    options:['odd','even'], answer:'odd',
    hint:'9 ends in 9. Numbers ending in 9 are odd.',
    explanation:'<b>9</b> is <b>odd</b>. It ends in 9.' }),

  makeMCQ({ id:'g1mth-pat-052', chapterId:'g1mth-patterns', difficulty:1, subsection:'odd_even_patterns',
    question:'Which of these is an even number: 3, 5, 7, 8?',
    options:['8','3','5','7'], answer:'8',
    hint:'Even numbers end in 0, 2, 4, 6 or 8.',
    explanation:'<b>8</b> is even. It ends in 8.' }),

  makeMCQ({ id:'g1mth-pat-053', chapterId:'g1mth-patterns', difficulty:1, subsection:'odd_even_patterns',
    question:'The even numbers between 1 and 10 are: 2, 4, ___, 8, 10.',
    options:['6','5','7','3'], answer:'6',
    hint:'Even numbers: 2, 4, 6, 8, 10.',
    explanation:'The even numbers are 2, 4, <b>6</b>, 8, 10.' }),

  makeMCQ({ id:'g1mth-pat-054', chapterId:'g1mth-patterns', difficulty:1, subsection:'odd_even_patterns',
    question:'When you count in 2s from 1, you say: 1, 3, 5, 7, ___. What comes next?',
    options:['9','8','10','11'], answer:'9',
    hint:'These are odd numbers. Add 2 to 7.',
    explanation:'1, 3, 5, 7, <b>9</b> — these are the odd numbers.' }),

  makeMCQ({ id:'g1mth-pat-055', chapterId:'g1mth-patterns', difficulty:1, subsection:'odd_even_patterns',
    question:'Which group shows ONLY even numbers?',
    options:['2, 4, 6, 8','1, 3, 5, 7','2, 3, 4, 5','1, 2, 3, 4'], answer:'2, 4, 6, 8',
    hint:'Even numbers end in 0, 2, 4, 6 or 8.',
    explanation:'<b>2, 4, 6, 8</b> are all even numbers.' }),

  makeMCQ({ id:'g1mth-pat-056', chapterId:'g1mth-patterns', difficulty:1, subsection:'odd_even_patterns',
    question:'Which group shows ONLY odd numbers?',
    options:['1, 3, 5, 7','2, 4, 6, 8','1, 2, 3, 4','3, 4, 5, 6'], answer:'1, 3, 5, 7',
    hint:'Odd numbers end in 1, 3, 5, 7 or 9.',
    explanation:'<b>1, 3, 5, 7</b> are all odd numbers.' }),

  makeMCQ({ id:'g1mth-pat-057', chapterId:'g1mth-patterns', difficulty:1, subsection:'odd_even_patterns',
    question:'Is 14 odd or even?',
    options:['even','odd'], answer:'even',
    hint:'14 ends in 4. Numbers ending in 4 are even.',
    explanation:'<b>14</b> is <b>even</b>. It ends in 4.' }),

  makeMCQ({ id:'g1mth-pat-058', chapterId:'g1mth-patterns', difficulty:1, subsection:'odd_even_patterns',
    question:'Is 11 odd or even?',
    options:['odd','even'], answer:'odd',
    hint:'11 ends in 1. Numbers ending in 1 are odd.',
    explanation:'<b>11</b> is <b>odd</b>. It ends in 1.' }),

  makeMCQ({ id:'g1mth-pat-059', chapterId:'g1mth-patterns', difficulty:2, subsection:'odd_even_patterns',
    question:'Rani has 7 flowers. She wants to give an equal number to 2 friends. Can she do it without cutting a flower?',
    options:['No — 7 is odd so one is left over','Yes — 7 is even','Yes — 7 ÷ 2 = 3.5','No — she has no flowers'], answer:'No — 7 is odd so one is left over',
    hint:'Odd numbers cannot be split into 2 equal groups.',
    explanation:'<b>No</b> — 7 is odd, so there will be one flower left over.' }),

  makeMCQ({ id:'g1mth-pat-060', chapterId:'g1mth-patterns', difficulty:1, subsection:'odd_even_patterns',
    question:'What is the pattern of even numbers: 2, 4, 6, 8, 10, ___?',
    options:['12','11','13','9'], answer:'12',
    hint:'Add 2 each time.',
    explanation:'Even numbers increase by 2: 2, 4, 6, 8, 10, <b>12</b>.' }),

  makeMCQ({ id:'g1mth-pat-061', chapterId:'g1mth-patterns', difficulty:1, subsection:'odd_even_patterns',
    question:'What is the pattern of odd numbers: 1, 3, 5, 7, 9, ___?',
    options:['11','10','12','8'], answer:'11',
    hint:'Add 2 each time.',
    explanation:'Odd numbers increase by 2: 1, 3, 5, 7, 9, <b>11</b>.' }),

  makeMCQ({ id:'g1mth-pat-062', chapterId:'g1mth-patterns', difficulty:1, subsection:'odd_even_patterns',
    question:'Is 20 odd or even?',
    options:['even','odd'], answer:'even',
    hint:'20 ends in 0. Numbers ending in 0 are even.',
    explanation:'<b>20</b> is <b>even</b>. It ends in 0.' }),

  makeMCQ({ id:'g1mth-pat-063', chapterId:'g1mth-patterns', difficulty:1, subsection:'odd_even_patterns',
    question:'Which number is ODD: 6, 12, 15, 18?',
    options:['15','6','12','18'], answer:'15',
    hint:'Odd numbers end in 1, 3, 5, 7 or 9.',
    explanation:'<b>15</b> is odd. It ends in 5.' }),

  makeMCQ({ id:'g1mth-pat-064', chapterId:'g1mth-patterns', difficulty:2, subsection:'odd_even_patterns',
    question:'Tom has 8 stickers. He shares them equally between 2 children. How many does each child get?',
    options:['4','3','5','8'], answer:'4',
    hint:'8 is even. 8 ÷ 2 = ?',
    explanation:'8 ÷ 2 = <b>4</b>. Each child gets 4 stickers.' }),

  makeMCQ({ id:'g1mth-pat-065', chapterId:'g1mth-patterns', difficulty:1, subsection:'odd_even_patterns',
    question:'Which number does NOT belong with the odd numbers: 1, 3, 4, 5, 7?',
    options:['4','1','3','5'], answer:'4',
    hint:'Find the even number hiding in the group.',
    explanation:'<b>4</b> is even — it does not belong with the odd numbers 1, 3, 5, 7.' }),

  makeMCQ({ id:'g1mth-pat-066', chapterId:'g1mth-patterns', difficulty:1, subsection:'odd_even_patterns',
    question:'Which number does NOT belong with the even numbers: 2, 4, 6, 7, 8?',
    options:['7','2','4','6'], answer:'7',
    hint:'Find the odd number hiding in the group.',
    explanation:'<b>7</b> is odd — it does not belong with the even numbers 2, 4, 6, 8.' }),

  makeMCQ({ id:'g1mth-pat-067', chapterId:'g1mth-patterns', difficulty:2, subsection:'odd_even_patterns',
    question:'Mia counts 6 mangoes and 4 papayas. Is the total odd or even?',
    options:['even — 10 is even','odd — 10 is odd','even — 10 ends in 0','cannot tell'], answer:'even — 10 is even',
    hint:'6 + 4 = 10. Is 10 odd or even?',
    explanation:'6 + 4 = 10. <b>10 is even</b> — it ends in 0.' }),

  makeMCQ({ id:'g1mth-pat-068', chapterId:'g1mth-patterns', difficulty:1, subsection:'odd_even_patterns',
    question:'What is the NEXT even number after 16?',
    options:['18','17','19','15'], answer:'18',
    hint:'Even numbers increase by 2.',
    explanation:'The next even number after 16 is <b>18</b>.' }),

  makeMCQ({ id:'g1mth-pat-069', chapterId:'g1mth-patterns', difficulty:1, subsection:'odd_even_patterns',
    question:'What is the NEXT odd number after 13?',
    options:['15','14','16','12'], answer:'15',
    hint:'Odd numbers increase by 2.',
    explanation:'The next odd number after 13 is <b>15</b>.' }),

  makeMCQ({ id:'g1mth-pat-070', chapterId:'g1mth-patterns', difficulty:2, subsection:'odd_even_patterns',
    question:'Dev adds 2 even numbers together. Will the answer be odd or even?',
    options:['even','odd','sometimes even sometimes odd','cannot tell'], answer:'even',
    hint:'Try it: 2 + 4 = 6, 4 + 6 = 10. Always even?',
    explanation:'Even + Even = <b>Even</b>. Try: 2 + 4 = 6, 6 + 8 = 14.' }),

  makeMCQ({ id:'g1mth-pat-071', chapterId:'g1mth-patterns', difficulty:1, subsection:'odd_even_patterns',
    question:'Is 3 odd or even?',
    options:['odd','even'], answer:'odd',
    hint:'3 ends in 3. Numbers ending in 3 are odd.',
    explanation:'<b>3</b> is <b>odd</b>.' }),

  makeMCQ({ id:'g1mth-pat-072', chapterId:'g1mth-patterns', difficulty:1, subsection:'odd_even_patterns',
    question:'Is 10 odd or even?',
    options:['even','odd'], answer:'even',
    hint:'10 ends in 0. Numbers ending in 0 are even.',
    explanation:'<b>10</b> is <b>even</b>.' }),

  makeMCQ({ id:'g1mth-pat-073', chapterId:'g1mth-patterns', difficulty:2, subsection:'odd_even_patterns',
    question:'Rani writes all the even numbers from 2 to 10. How many numbers does she write?',
    options:['5','4','6','10'], answer:'5',
    hint:'Even numbers from 2 to 10: 2, 4, 6, 8, 10 — count them.',
    explanation:'<b>5</b> even numbers: 2, 4, 6, 8, 10.' }),

  makeMCQ({ id:'g1mth-pat-074', chapterId:'g1mth-patterns', difficulty:2, subsection:'odd_even_patterns',
    question:'Tom writes all the odd numbers from 1 to 9. How many numbers does he write?',
    options:['5','4','6','9'], answer:'5',
    hint:'Odd numbers from 1 to 9: 1, 3, 5, 7, 9 — count them.',
    explanation:'<b>5</b> odd numbers: 1, 3, 5, 7, 9.' }),

  makeMCQ({ id:'g1mth-pat-075', chapterId:'g1mth-patterns', difficulty:2, subsection:'odd_even_patterns',
    question:'Mia has 5 cups. She puts 2 biscuits in each cup. How many biscuits are there?',
    options:['10','8','12','5'], answer:'10',
    hint:'Count in 2s: 2, 4, 6, 8, 10.',
    explanation:'5 cups × 2 biscuits = <b>10</b> biscuits. Count in 2s: 2, 4, 6, 8, 10.' })
);

})();
