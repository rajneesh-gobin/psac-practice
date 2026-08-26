'use strict';
// Grade 4 Maths - Chapter: Four Operations (addition, subtraction, multiplication, division)
// IDs format: g4m-ops-NNN

STATIC_QUESTIONS.push(

  makeNum({ id:'g4m-ops-001', chapterId:'g4-four-ops', subsection:'add_sub', difficulty:1,
    question:'Calculate: 2,345 + 4,213',
    answer:'6558', acceptableAnswers:['6558','6,558'],
    hint:'Add units, then tens, then hundreds, then thousands.',
    explanation:'2,345 + 4,213: Units 5+3=8; Tens 4+1=5; Hundreds 3+2=5; Thousands 2+4=6. Answer: <b>6,558</b>.' }),

  makeNum({ id:'g4m-ops-002', chapterId:'g4-four-ops', subsection:'add_sub', difficulty:1,
    question:'Calculate: 7,562 − 3,241',
    answer:'4321', acceptableAnswers:['4321','4,321'],
    hint:'Subtract units, then tens, then hundreds, then thousands.',
    explanation:'7,562 − 3,241: Units 2−1=1; Tens 6−4=2; Hundreds 5−2=3; Thousands 7−3=4. Answer: <b>4,321</b>.' }),

  makeNum({ id:'g4m-ops-003', chapterId:'g4-four-ops', subsection:'add_sub', difficulty:2,
    question:'Calculate: 4,327 + 2,586 (involves carrying)',
    answer:'6913', acceptableAnswers:['6913','6,913'],
    hint:'Carry whenever a column sum is 10 or more.',
    explanation:'4,327 + 2,586: Units 7+6=13 (write 3, carry 1). Tens 2+8+1=11 (write 1, carry 1). Hundreds 3+5+1=9. Thousands 4+2=6. Answer: <b>6,913</b>.' }),

  makeNum({ id:'g4m-ops-004', chapterId:'g4-four-ops', subsection:'add_sub', difficulty:2,
    question:'Calculate: 5,304 − 2,168 (involves borrowing)',
    answer:'3136', acceptableAnswers:['3136','3,136'],
    hint:'When a digit is too small to subtract, borrow from the next column.',
    explanation:'5,304 − 2,168: Units: 4 < 8, borrow from tens (tens=0, so borrow from hundreds first). Units become 14: 14−8=6. Tens become 9: 9−6=3. Hundreds become 2: 2−1=1. Thousands: 5−2=3. Answer: <b>3,136</b>.' }),

  makeMCQ({ id:'g4m-ops-005', chapterId:'g4-four-ops', subsection:'multiplication', difficulty:1,
    question:'4 × 7 = 28. This can also be written as REPEATED ADDITION as:',
    options:['4 + 4 + 4 + 4','7 + 7 + 7 + 7','4 + 7','4 × 4 + 7'],
    answer:'7 + 7 + 7 + 7',
    hint:'4 × 7 means "7 added 4 times".',
    explanation:'4 × 7 means 7 added 4 times: <b>7 + 7 + 7 + 7</b> = 28. Multiplication is repeated addition. MIE Grade 4: understand multiplication as repeated addition and as arrays (rows and columns).' }),

  makeNum({ id:'g4m-ops-006', chapterId:'g4-four-ops', subsection:'division', difficulty:2,
    question:'Calculate: 840 ÷ 4',
    answer:'210', acceptableAnswers:['210'],
    hint:'Think: 800 ÷ 4 = 200, and 40 ÷ 4 = 10. Add the results.',
    explanation:'800 ÷ 4 = 200. 40 ÷ 4 = 10. 200 + 10 = <b>210</b>. You can also do the long division step by step: 8÷4=2 (hundreds), 4÷4=1 (tens), 0÷4=0 (units) → 210.' }),

  makeNum({ id:'g4m-ops-007', chapterId:'g4-four-ops', subsection:'word_problems', difficulty:2,
    question:'Mrs Linda has 21 sweets. She puts 3 sweets in each small box. How many boxes does she need?',
    answer:'7', acceptableAnswers:['7'],
    hint:'This is a GROUPING division problem. How many groups of 3 can you make from 21?',
    explanation:'21 ÷ 3 = <b>7 boxes</b>. Division as grouping: 3 × 7 = 21, so 21 sweets can fill exactly 7 boxes with 3 each. From MIE Grade 4 division worksheet.' }),

  makeNum({ id:'g4m-ops-008', chapterId:'g4-four-ops', subsection:'word_problems', difficulty:2,
    question:'Mr Laval shares Rs 4,000 equally among 8 pupils. How much money does each pupil receive?',
    answer:'500', acceptableAnswers:['500','Rs 500'],
    hint:'Rs 4,000 ÷ 8. Think: 4,000 ÷ 8 = 40 ÷ 8 × 100.',
    explanation:'Rs 4,000 ÷ 8 = Rs <b>500</b>. 40 ÷ 8 = 5, so 4,000 ÷ 8 = 500. Division as equal sharing. From MIE Grade 4 division worksheet.' }),

  makeNum({ id:'g4m-ops-009', chapterId:'g4-four-ops', subsection:'word_problems', difficulty:2,
    question:'Mother buys 50 eggs. She needs 3 eggs for each cupcake. How many COMPLETE cupcakes can she make?',
    answer:'16', acceptableAnswers:['16'],
    hint:'Divide 50 by 3. There will be a remainder (eggs left over).',
    explanation:'50 ÷ 3 = 16 remainder 2. She can make <b>16 complete cupcakes</b> with 2 eggs left over. 3 × 16 = 48. 50 − 48 = 2 eggs remaining. From MIE Grade 4 division worksheet.' }),

  makeNum({ id:'g4m-ops-010', chapterId:'g4-four-ops', subsection:'word_problems', difficulty:3,
    question:'Riya buys 3 bags of rice at Rs 75 each and 2 bags of flour at Rs 48 each. How much does she pay in TOTAL?',
    answer:'321', acceptableAnswers:['321','Rs 321'],
    hint:'Find the cost of rice (3 × 75), then the cost of flour (2 × 48). Add both.',
    explanation:'Rice: 3 × Rs 75 = Rs 225. Flour: 2 × Rs 48 = Rs 96. Total = 225 + 96 = <b>Rs 321</b>. This is a two-step word problem - a Level 3 skill in MIE Grade 4.' })

);

STATIC_QUESTIONS.push(

  makeNum({ id:'g4m-ops-011', chapterId:'g4-four-ops', subsection:'multiplication', difficulty:1,
    question:'Calculate: 6 × 8',
    answer:'48', acceptableAnswers:['48'],
    hint:'Use your times tables: 6 groups of 8.',
    explanation:'6 × 8 = <b>48</b>. Recall: 8×6=48 too - multiplication is commutative. MIE Grade 4 requires fluency with multiplication tables up to 10×10.' }),

  makeNum({ id:'g4m-ops-012', chapterId:'g4-four-ops', subsection:'multiplication', difficulty:2,
    question:'Calculate: 47 × 6',
    answer:'282', acceptableAnswers:['282'],
    hint:'Multiply units first: 7×6=42 (write 2, carry 4). Then tens: 4×6=24, plus 4 carry = 28.',
    explanation:'47 × 6: Units 7×6=42 (write 2, carry 4). Tens 4×6=24 + 4=28. Answer: <b>282</b>. Multiply each digit by 6 from right to left, carrying when needed.' }),

  makeNum({ id:'g4m-ops-013', chapterId:'g4-four-ops', subsection:'multiplication', difficulty:2,
    question:'Calculate: 325 × 4',
    answer:'1300', acceptableAnswers:['1300','1,300'],
    hint:'Multiply each digit by 4: units first, then tens, then hundreds.',
    explanation:'325 × 4: Units 5×4=20 (write 0, carry 2). Tens 2×4=8+2=10 (write 0, carry 1). Hundreds 3×4=12+1=13. Answer: <b>1,300</b>.' }),

  makeMCQ({ id:'g4m-ops-014', chapterId:'g4-four-ops', subsection:'order_ops', difficulty:1,
    question:'What is the INVERSE (opposite) operation of multiplication?',
    options:['Addition','Subtraction','Division','Nothing'],
    answer:'Division',
    hint:'If 3 × 4 = 12, which operation takes you back to 3 or 4?',
    explanation:'The inverse of multiplication is <b>division</b>. If 3 × 4 = 12, then 12 ÷ 4 = 3 and 12 ÷ 3 = 4. Use inverse operations to check answers: 1,300 ÷ 4 = 325 confirms 325 × 4 = 1,300.' }),

  makeNum({ id:'g4m-ops-015', chapterId:'g4-four-ops', subsection:'division', difficulty:2,
    question:'Calculate: 98 ÷ 7',
    answer:'14', acceptableAnswers:['14'],
    hint:'Try 7 × 10 = 70, 7 × 14 = 98. What times 7 equals 98?',
    explanation:'98 ÷ 7 = <b>14</b>. Check: 7 × 14 = 98 ✓. Short method: 70 ÷ 7 = 10; remaining 28 ÷ 7 = 4; total = 14.' }),

  makeNum({ id:'g4m-ops-016', chapterId:'g4-four-ops', subsection:'division', difficulty:2,
    question:'Calculate: 175 ÷ 5',
    answer:'35', acceptableAnswers:['35'],
    hint:'100 ÷ 5 = 20 and 75 ÷ 5 = 15. Add the two parts.',
    explanation:'100 ÷ 5 = 20. 75 ÷ 5 = 15. Total = 20 + 15 = <b>35</b>. Check: 5 × 35 = 175 ✓.' }),

  makeNum({ id:'g4m-ops-017', chapterId:'g4-four-ops', subsection:'word_problems', difficulty:2,
    question:'A school has 9 classrooms. Each classroom has 32 pupils. How many pupils are there in TOTAL?',
    answer:'288', acceptableAnswers:['288'],
    hint:'Multiply: 9 × 32. Try 9 × 30 = 270, then 9 × 2 = 18. Add.',
    explanation:'9 × 32 = 9×30 + 9×2 = 270 + 18 = <b>288</b>. The distributive property: 9×(30+2) = (9×30)+(9×2) = 270+18 = 288.' }),

  makeMCQ({ id:'g4m-ops-018', chapterId:'g4-four-ops', subsection:'word_problems', difficulty:3,
    question:'A minivan carries 8 passengers. How many minivans are needed to carry 63 people, with NO ONE left behind?',
    options:['7','8','9','63'],
    answer:'8',
    hint:'63 ÷ 8 = 7 remainder 7. What does the remainder mean for the number of vans?',
    explanation:'63 ÷ 8 = 7 remainder 7. Seven vans carry 56 people; 7 more still need to travel. One extra van is needed. Total: <b>8 vans</b>. When a remainder means someone is left out, always round UP the number of groups.' }),

  makeNum({ id:'g4m-ops-019', chapterId:'g4-four-ops', subsection:'word_problems', difficulty:4,
    question:'A baker bakes 6 trays of biscuits with 24 biscuits per tray. She packs them into bags of 9. How many COMPLETE bags can she fill?',
    answer:'16', acceptableAnswers:['16'],
    hint:'Step 1: 6 × 24 = total biscuits. Step 2: divide total by 9.',
    explanation:'Total biscuits: 6 × 24 = 144. Bags: 144 ÷ 9 = <b>16 complete bags</b> with 0 left over. Check: 9 × 16 = 144 ✓. Two-step word problem: multiply first, then divide.' })

);
