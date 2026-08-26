'use strict';
// Grade 6 Maths - Chapter: Four Operations (long mult/div, BODMAS)
// IDs format: g6m-ops-NNN

STATIC_QUESTIONS.push(

  makeNum({ id:'g6m-ops-001', chapterId:'g6-four-ops', subsection:'multiplication', difficulty:1,
    question:'Calculate: 347 × 8',
    answer:'2776', acceptableAnswers:['2776'],
    hint:'Multiply each digit of 347 by 8, starting from the ones column.',
    explanation:'7×8=56 (write 6, carry 5), 4×8=32+5=37 (write 7, carry 3), 3×8=24+3=27. Result: <b>2776</b>.' }),

  makeNum({ id:'g6m-ops-002', chapterId:'g6-four-ops', subsection:'multiplication', difficulty:2,
    question:'Calculate: 56 × 43',
    answer:'2408', acceptableAnswers:['2408'],
    hint:'Use long multiplication: 56×3 = 168, 56×40 = 2240. Add together.',
    explanation:'56 × 3 = 168. 56 × 40 = 2240. Total: 168 + 2240 = <b>2408</b>.' }),

  makeNum({ id:'g6m-ops-003', chapterId:'g6-four-ops', subsection:'division', difficulty:2,
    question:'Calculate: 824 ÷ 4',
    answer:'206', acceptableAnswers:['206'],
    hint:'Divide each digit: 8÷4=2, 2÷4=0 remainder 2, 24÷4=6.',
    explanation:'Divide step by step: 8÷4=2, bring down 2 → 2÷4=0 remainder 2, bring down 4 → 24÷4=6. Result: <b>206</b>.' }),

  makeNum({ id:'g6m-ops-004', chapterId:'g6-four-ops', subsection:'division', difficulty:2,
    question:'Calculate: 952 ÷ 8',
    answer:'119', acceptableAnswers:['119'],
    hint:'Long division: 9÷8=1 rem 1, bring down 5 → 15÷8=1 rem 7, bring down 2 → 72÷8=9.',
    explanation:'9÷8=1 (rem 1) → 15÷8=1 (rem 7) → 72÷8=9. Result: <b>119</b>.' }),

  makeMCQ({ id:'g6m-ops-005', chapterId:'g6-four-ops', subsection:'mixed_ops', difficulty:2,
    question:'Using BODMAS, calculate: 5 + 3 × 4 − 2',
    options:['30','15','15','15'],
    answer:'15',
    hint:'BODMAS: multiplication BEFORE addition/subtraction. Do 3×4 first.',
    explanation:'BODMAS order: multiplication first → 3 × 4 = 12. Then left to right: 5 + 12 − 2 = <b>15</b>.' }),

  makeMCQ({ id:'g6m-ops-006', chapterId:'g6-four-ops', subsection:'mixed_ops', difficulty:2,
    question:'Using BODMAS, calculate: (8 + 4) ÷ 3 × 2',
    options:['6','8','24','4'],
    answer:'8',
    hint:'Brackets first: (8+4)=12. Then left to right: 12÷3=4, then 4×2=8.',
    explanation:'Brackets first: (8 + 4) = 12. Then left to right: 12 ÷ 3 = 4, then 4 × 2 = <b>8</b>.' }),

  makeNum({ id:'g6m-ops-007', chapterId:'g6-four-ops', subsection:'word_probs', difficulty:2,
    question:'A school has 36 classrooms. Each classroom has 28 desks. How many desks altogether?',
    answer:'1008', acceptableAnswers:['1008'],
    hint:'Multiply: 36 × 28. Try 36×20=720, 36×8=288.',
    explanation:'36 × 20 = 720. 36 × 8 = 288. Total: 720 + 288 = <b>1008 desks</b>.' }),

  makeNum({ id:'g6m-ops-008', chapterId:'g6-four-ops', subsection:'add_sub', difficulty:2,
    question:'875 mangoes are packed equally into 7 boxes. How many mangoes are in each box?',
    answer:'125', acceptableAnswers:['125'],
    hint:'875 ÷ 7. How many times does 7 go into 8? Into 17? Into 35?',
    explanation:'875 ÷ 7: 8÷7=1 rem 1 → 17÷7=2 rem 3 → 35÷7=5. Each box has <b>125 mangoes</b>.' }),

  makeTF({ id:'g6m-ops-009', chapterId:'g6-four-ops', subsection:'multiplication', difficulty:1,
    question:'In the expression 6 + 2 × 5, you should add 6 + 2 first to get 8, then multiply by 5.',
    answer:false,
    hint:'What does BODMAS say about multiplication vs addition?',
    explanation:'<b>False</b>. According to BODMAS, <b>multiplication comes before addition</b>. So: 2 × 5 = 10 first, then 6 + 10 = 16. (NOT 8 × 5 = 40.)' }),

  makeNum({ id:'g6m-ops-010', chapterId:'g6-four-ops', subsection:'mixed_ops', difficulty:2,
    question:'Calculate: 15 + 3² − (4 × 2). (3² means 3 squared = 3×3)',
    answer:'16', acceptableAnswers:['16'],
    hint:'BODMAS: Brackets then Orders (powers) then Add/Subtract.',
    explanation:'Brackets first: (4 × 2) = 8. Orders: 3² = 9. Then: 15 + 9 − 8 = <b>16</b>.' })

);

STATIC_QUESTIONS.push(

  makeNum({ id:'g6m-ops-011', chapterId:'g6-four-ops', subsection:'multiplication', difficulty:2,
    question:'Calculate: 23,456 × 4',
    answer:'93824', acceptableAnswers:['93824','93,824'],
    hint:'Multiply each digit by 4 from right to left, carrying where needed.',
    explanation:'23,456 × 4: 6×4=24 (write 4, carry 2), 5×4=20+2=22 (write 2, carry 2), 4×4=16+2=18 (write 8, carry 1), 3×4=12+1=13 (write 3, carry 1), 2×4=8+1=9. Answer: <b>93,824</b>.' }),

  makeNum({ id:'g6m-ops-012', chapterId:'g6-four-ops', subsection:'multiplication', difficulty:2,
    question:'Calculate: 2,345 × 36',
    answer:'84420', acceptableAnswers:['84420','84,420'],
    hint:'Long multiplication: 2345×6, then 2345×30, then add.',
    explanation:'2,345 × 6 = 14,070. 2,345 × 30 = 70,350. Total: 14,070 + 70,350 = <b>84,420</b>.' }),

  makeNum({ id:'g6m-ops-013', chapterId:'g6-four-ops', subsection:'division', difficulty:2,
    question:'Calculate: 456,000 ÷ 1000',
    answer:'456', acceptableAnswers:['456'],
    hint:'Dividing by 1000 removes 3 zeros (or shifts the decimal 3 places left).',
    explanation:'456,000 ÷ 1,000 = <b>456</b>. When dividing by powers of 10: ÷10 removes one zero, ÷100 removes two zeros, ÷1,000 removes three zeros. So 456,000 ÷ 1,000 = 456.' }),

  makeNum({ id:'g6m-ops-014', chapterId:'g6-four-ops', subsection:'division', difficulty:2,
    question:'A 4-digit number divided by 7 gives quotient 845 and remainder 3. What is the 4-digit number?',
    answer:'5918', acceptableAnswers:['5918'],
    hint:'Number = (divisor × quotient) + remainder = (7 × 845) + 3.',
    explanation:'Number = (7 × 845) + 3 = 5,915 + 3 = <b>5,918</b>. Check: 5,918 ÷ 7 = 845 remainder 3 ✓. MIE Grade 6 textbook formula: Dividend = (Divisor × Quotient) + Remainder.' }),

  makeMCQ({ id:'g6m-ops-015', chapterId:'g6-four-ops', subsection:'mixed_ops', difficulty:2,
    question:'Using BODMAS, calculate: 48 ÷ (4 + 2) × 3',
    options:['24','6','36','4'],
    answer:'24',
    hint:'Brackets first: (4+2)=6. Then left to right: 48÷6=8, then 8×3=24.',
    explanation:'Brackets: (4 + 2) = 6. Then left to right: 48 ÷ 6 = 8. Then: 8 × 3 = <b>24</b>. After brackets are resolved, multiplication and division are performed left to right.' }),

  makeNum({ id:'g6m-ops-016', chapterId:'g6-four-ops', subsection:'word_probs', difficulty:2,
    question:'A school orders 48 boxes of pens. Each box contains 144 pens. How many pens altogether? Then, these pens are shared equally among 24 classes. How many pens does EACH CLASS receive?',
    answer:'288', acceptableAnswers:['288'],
    hint:'Step 1: total pens = 48 × 144. Step 2: divide total by 24.',
    explanation:'Total pens = 48 × 144 = 6,912. Pens per class = 6,912 ÷ 24 = <b>288 pens</b>.' }),

  makeNum({ id:'g6m-ops-017', chapterId:'g6-four-ops', subsection:'add_sub', difficulty:2,
    question:'What number multiplied by 9 gives 567?',
    answer:'63', acceptableAnswers:['63'],
    hint:'This is a missing factor problem: ___ × 9 = 567. Use division: 567 ÷ 9.',
    explanation:'567 ÷ 9 = <b>63</b>. Check: 63 × 9 = 567 ✓. Missing factor problems use inverse operations: multiplication ↔ division.' }),

  makeMCQ({ id:'g6m-ops-018', chapterId:'g6-four-ops', subsection:'word_probs', difficulty:3,
    question:'A factory worker earns Rs 450 per day. He works 5 days a week for 52 weeks. However, he takes 12 days of unpaid leave. What are his TOTAL EARNINGS for the year?',
    options:['Rs 111,600','Rs 117,000','Rs 105,600','Rs 116,550'],
    answer:'Rs 111,600',
    hint:'Total working days = (52 × 5) − 12. Earnings = working days × Rs 450.',
    explanation:'Total scheduled days = 52 × 5 = 260. Days worked = 260 − 12 = 248. Earnings = 248 × 450 = <b>Rs 111,600</b>.' }),

  makeNum({ id:'g6m-ops-019', chapterId:'g6-four-ops', subsection:'word_probs', difficulty:4,
    question:'In a PSAC exam, Aisha scored 87 in English, 94 in Maths, 78 in Science and 91 in French. The pass mark is 75% of the total possible marks (400). Did she pass, and what was her total score?',
    answer:'350', acceptableAnswers:['350'],
    hint:'Add all four scores. Compare with 75% of 400 = 300.',
    explanation:'Total = 87 + 94 + 78 + 91 = <b>350</b>. Pass mark = 75% × 400 = 300. Since 350 > 300, Aisha passed. She scored 350/400 = 87.5%.' })

);
