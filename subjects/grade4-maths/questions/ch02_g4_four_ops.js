'use strict';
// Grade 4 Maths — Chapter: Four Operations (addition, subtraction, multiplication, division)
// IDs format: g4m-ops-NNN

STATIC_QUESTIONS.push(

  makeNum({ id:'g4m-ops-001', chapterId:'g4-four-ops', difficulty:1,
    question:'Calculate: 2,345 + 4,213',
    answer:'6558', acceptableAnswers:['6558','6,558'],
    hint:'Add units, then tens, then hundreds, then thousands.',
    explanation:'2,345 + 4,213: Units 5+3=8; Tens 4+1=5; Hundreds 3+2=5; Thousands 2+4=6. Answer: <b>6,558</b>.' }),

  makeNum({ id:'g4m-ops-002', chapterId:'g4-four-ops', difficulty:1,
    question:'Calculate: 7,562 − 3,241',
    answer:'4321', acceptableAnswers:['4321','4,321'],
    hint:'Subtract units, then tens, then hundreds, then thousands.',
    explanation:'7,562 − 3,241: Units 2−1=1; Tens 6−4=2; Hundreds 5−2=3; Thousands 7−3=4. Answer: <b>4,321</b>.' }),

  makeNum({ id:'g4m-ops-003', chapterId:'g4-four-ops', difficulty:2,
    question:'Calculate: 4,327 + 2,586 (involves carrying)',
    answer:'6913', acceptableAnswers:['6913','6,913'],
    hint:'Carry whenever a column sum is 10 or more.',
    explanation:'4,327 + 2,586: Units 7+6=13 (write 3, carry 1). Tens 2+8+1=11 (write 1, carry 1). Hundreds 3+5+1=9. Thousands 4+2=6. Answer: <b>6,913</b>.' }),

  makeNum({ id:'g4m-ops-004', chapterId:'g4-four-ops', difficulty:2,
    question:'Calculate: 5,304 − 2,168 (involves borrowing)',
    answer:'3136', acceptableAnswers:['3136','3,136'],
    hint:'When a digit is too small to subtract, borrow from the next column.',
    explanation:'5,304 − 2,168: Units: 4 < 8, borrow from tens (tens=0, so borrow from hundreds first). Units become 14: 14−8=6. Tens become 9: 9−6=3. Hundreds become 2: 2−1=1. Thousands: 5−2=3. Answer: <b>3,136</b>.' }),

  makeMCQ({ id:'g4m-ops-005', chapterId:'g4-four-ops', difficulty:1,
    question:'4 × 7 = 28. This can also be written as REPEATED ADDITION as:',
    options:['4 + 4 + 4 + 4','7 + 7 + 7 + 7','4 + 7','4 × 4 + 7'],
    answer:'7 + 7 + 7 + 7',
    hint:'4 × 7 means "7 added 4 times".',
    explanation:'4 × 7 means 7 added 4 times: <b>7 + 7 + 7 + 7</b> = 28. Multiplication is repeated addition. MIE Grade 4: understand multiplication as repeated addition and as arrays (rows and columns).' }),

  makeNum({ id:'g4m-ops-006', chapterId:'g4-four-ops', difficulty:2,
    question:'Calculate: 840 ÷ 4',
    answer:'210', acceptableAnswers:['210'],
    hint:'Think: 800 ÷ 4 = 200, and 40 ÷ 4 = 10. Add the results.',
    explanation:'800 ÷ 4 = 200. 40 ÷ 4 = 10. 200 + 10 = <b>210</b>. You can also do the long division step by step: 8÷4=2 (hundreds), 4÷4=1 (tens), 0÷4=0 (units) → 210.' }),

  makeNum({ id:'g4m-ops-007', chapterId:'g4-four-ops', difficulty:2,
    question:'Mrs Linda has 21 sweets. She puts 3 sweets in each small box. How many boxes does she need?',
    answer:'7', acceptableAnswers:['7'],
    hint:'This is a GROUPING division problem. How many groups of 3 can you make from 21?',
    explanation:'21 ÷ 3 = <b>7 boxes</b>. Division as grouping: 3 × 7 = 21, so 21 sweets can fill exactly 7 boxes with 3 each. From MIE Grade 4 division worksheet.' }),

  makeNum({ id:'g4m-ops-008', chapterId:'g4-four-ops', difficulty:2,
    question:'Mr Laval shares Rs 4,000 equally among 8 pupils. How much money does each pupil receive?',
    answer:'500', acceptableAnswers:['500','Rs 500'],
    hint:'Rs 4,000 ÷ 8. Think: 4,000 ÷ 8 = 40 ÷ 8 × 100.',
    explanation:'Rs 4,000 ÷ 8 = Rs <b>500</b>. 40 ÷ 8 = 5, so 4,000 ÷ 8 = 500. Division as equal sharing. From MIE Grade 4 division worksheet.' }),

  makeNum({ id:'g4m-ops-009', chapterId:'g4-four-ops', difficulty:2,
    question:'Mother buys 50 eggs. She needs 3 eggs for each cupcake. How many COMPLETE cupcakes can she make?',
    answer:'16', acceptableAnswers:['16'],
    hint:'Divide 50 by 3. There will be a remainder (eggs left over).',
    explanation:'50 ÷ 3 = 16 remainder 2. She can make <b>16 complete cupcakes</b> with 2 eggs left over. 3 × 16 = 48. 50 − 48 = 2 eggs remaining. From MIE Grade 4 division worksheet.' }),

  makeNum({ id:'g4m-ops-010', chapterId:'g4-four-ops', difficulty:3,
    question:'Riya buys 3 bags of rice at Rs 75 each and 2 bags of flour at Rs 48 each. How much does she pay in TOTAL?',
    answer:'321', acceptableAnswers:['321','Rs 321'],
    hint:'Find the cost of rice (3 × 75), then the cost of flour (2 × 48). Add both.',
    explanation:'Rice: 3 × Rs 75 = Rs 225. Flour: 2 × Rs 48 = Rs 96. Total = 225 + 96 = <b>Rs 321</b>. This is a two-step word problem — a Level 3 skill in MIE Grade 4.' })

);
