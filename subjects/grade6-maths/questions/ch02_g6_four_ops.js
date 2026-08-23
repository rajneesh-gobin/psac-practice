'use strict';
// Grade 6 Maths — Chapter: Four Operations (long mult/div, BODMAS)
// IDs format: g6m-ops-NNN

STATIC_QUESTIONS.push(

  makeNum({ id:'g6m-ops-001', chapterId:'g6-four-ops', difficulty:1,
    question:'Calculate: 347 × 8',
    answer:'2776', acceptableAnswers:['2776'],
    hint:'Multiply each digit of 347 by 8, starting from the ones column.',
    explanation:'7×8=56 (write 6, carry 5), 4×8=32+5=37 (write 7, carry 3), 3×8=24+3=27. Result: <b>2776</b>.' }),

  makeNum({ id:'g6m-ops-002', chapterId:'g6-four-ops', difficulty:2,
    question:'Calculate: 56 × 43',
    answer:'2408', acceptableAnswers:['2408'],
    hint:'Use long multiplication: 56×3 = 168, 56×40 = 2240. Add together.',
    explanation:'56 × 3 = 168. 56 × 40 = 2240. Total: 168 + 2240 = <b>2408</b>.' }),

  makeNum({ id:'g6m-ops-003', chapterId:'g6-four-ops', difficulty:2,
    question:'Calculate: 824 ÷ 4',
    answer:'206', acceptableAnswers:['206'],
    hint:'Divide each digit: 8÷4=2, 2÷4=0 remainder 2, 24÷4=6.',
    explanation:'Divide step by step: 8÷4=2, bring down 2 → 2÷4=0 remainder 2, bring down 4 → 24÷4=6. Result: <b>206</b>.' }),

  makeNum({ id:'g6m-ops-004', chapterId:'g6-four-ops', difficulty:2,
    question:'Calculate: 952 ÷ 8',
    answer:'119', acceptableAnswers:['119'],
    hint:'Long division: 9÷8=1 rem 1, bring down 5 → 15÷8=1 rem 7, bring down 2 → 72÷8=9.',
    explanation:'9÷8=1 (rem 1) → 15÷8=1 (rem 7) → 72÷8=9. Result: <b>119</b>.' }),

  makeMCQ({ id:'g6m-ops-005', chapterId:'g6-four-ops', difficulty:2,
    question:'Using BODMAS, calculate: 5 + 3 × 4 − 2',
    options:['30','15','15','15'],
    answer:'15',
    hint:'BODMAS: multiplication BEFORE addition/subtraction. Do 3×4 first.',
    explanation:'BODMAS order: multiplication first → 3 × 4 = 12. Then left to right: 5 + 12 − 2 = <b>15</b>.' }),

  makeMCQ({ id:'g6m-ops-006', chapterId:'g6-four-ops', difficulty:2,
    question:'Using BODMAS, calculate: (8 + 4) ÷ 3 × 2',
    options:['6','8','24','4'],
    answer:'8',
    hint:'Brackets first: (8+4)=12. Then left to right: 12÷3=4, then 4×2=8.',
    explanation:'Brackets first: (8 + 4) = 12. Then left to right: 12 ÷ 3 = 4, then 4 × 2 = <b>8</b>.' }),

  makeNum({ id:'g6m-ops-007', chapterId:'g6-four-ops', difficulty:2,
    question:'A school has 36 classrooms. Each classroom has 28 desks. How many desks altogether?',
    answer:'1008', acceptableAnswers:['1008'],
    hint:'Multiply: 36 × 28. Try 36×20=720, 36×8=288.',
    explanation:'36 × 20 = 720. 36 × 8 = 288. Total: 720 + 288 = <b>1008 desks</b>.' }),

  makeNum({ id:'g6m-ops-008', chapterId:'g6-four-ops', difficulty:2,
    question:'875 mangoes are packed equally into 7 boxes. How many mangoes are in each box?',
    answer:'125', acceptableAnswers:['125'],
    hint:'875 ÷ 7. How many times does 7 go into 8? Into 17? Into 35?',
    explanation:'875 ÷ 7: 8÷7=1 rem 1 → 17÷7=2 rem 3 → 35÷7=5. Each box has <b>125 mangoes</b>.' }),

  makeTF({ id:'g6m-ops-009', chapterId:'g6-four-ops', difficulty:1,
    question:'In the expression 6 + 2 × 5, you should add 6 + 2 first to get 8, then multiply by 5.',
    answer:false,
    hint:'What does BODMAS say about multiplication vs addition?',
    explanation:'<b>False</b>. According to BODMAS, <b>multiplication comes before addition</b>. So: 2 × 5 = 10 first, then 6 + 10 = 16. (NOT 8 × 5 = 40.)' }),

  makeNum({ id:'g6m-ops-010', chapterId:'g6-four-ops', difficulty:2,
    question:'Calculate: 15 + 3² − (4 × 2). (3² means 3 squared = 3×3)',
    answer:'15', acceptableAnswers:['15'],
    hint:'BODMAS: Brackets then Orders (powers) then Add/Subtract.',
    explanation:'Brackets first: (4 × 2) = 8. Orders: 3² = 9. Then: 15 + 9 − 8 = <b>16</b>.' })

);
