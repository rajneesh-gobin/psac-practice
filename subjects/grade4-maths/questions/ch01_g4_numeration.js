'use strict';
// Grade 4 Maths - Chapter: Numeration & Place Value (0-10,000)
// IDs format: g4m-num-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4m-num-001', chapterId:'g4-numeration', subsection:'place_value', difficulty:1,
    question:'What is the LARGEST 4-digit number?',
    options:['9,000','9,900','9,999','10,000'],
    answer:'9,999',
    hint:'A 4-digit number has thousands, hundreds, tens and units.',
    explanation:'The largest 4-digit number is <b>9,999</b> (nine thousand, nine hundred and ninety-nine). The next number, 10,000, is a 5-digit number. MIE Grade 4 works with whole numbers up to 10,000.' }),

  makeMCQ({ id:'g4m-num-002', chapterId:'g4-numeration', subsection:'place_value', difficulty:1,
    question:'In the number 3,456, what is the VALUE of the digit 4?',
    options:['4','40','400','4,000'],
    answer:'400',
    hint:'Place values from right: units, tens, hundreds, thousands.',
    explanation:'In 3,456: digit 3 is in the thousands (value 3,000), digit 4 is in the <b>hundreds (value 400)</b>, digit 5 is in the tens (value 50), digit 6 is in the units (value 6).' }),

  makeTF({ id:'g4m-num-003', chapterId:'g4-numeration', subsection:'compare_order', difficulty:1,
    question:'The number 847 is an ODD number.',
    answer:true,
    hint:'Look at the last digit (units digit). Odd numbers end in 1, 3, 5, 7 or 9.',
    explanation:'<b>True.</b> A number is ODD if its units digit is 1, 3, 5, 7 or 9. 847 ends in 7, so it is odd. EVEN numbers end in 0, 2, 4, 6 or 8.' }),

  makeMCQ({ id:'g4m-num-004', chapterId:'g4-numeration', subsection:'compare_order', difficulty:2,
    question:'Which is the GREATEST number?',
    options:['4,329','4,293','4,923','4,392'],
    answer:'4,923',
    hint:'Compare digit by digit from left. Start with thousands, then hundreds.',
    explanation:'All numbers have 4 thousands. Compare the hundreds: 9 hundreds > 3 hundreds. So <b>4,923</b> is the greatest. Strategy: compare digit by digit from left - thousands first, then hundreds, then tens, then units.' }),

  makeNum({ id:'g4m-num-005', chapterId:'g4-numeration', subsection:'expanded', difficulty:1,
    question:'Write this in numerals: 4,000 + 200 + 50 + 7',
    answer:'4257', acceptableAnswers:['4257','4,257'],
    hint:'Add the thousands, hundreds, tens and units together.',
    explanation:'4,000 + 200 + 50 + 7 = <b>4,257</b>. This is called expanded notation. Thousands = 4, hundreds = 2, tens = 5, units = 7.' }),

  makeNum({ id:'g4m-num-006', chapterId:'g4-numeration', subsection:'patterns', difficulty:2,
    question:'What number is 1,000 MORE than 6,845?',
    answer:'7845', acceptableAnswers:['7845','7,845'],
    hint:'Add 1,000 to 6,845. This increases the thousands digit by 1.',
    explanation:'6,845 + 1,000 = <b>7,845</b>. Adding 1,000 increases the thousands digit from 6 to 7. The other digits stay the same.' }),

  makeNum({ id:'g4m-num-007', chapterId:'g4-numeration', subsection:'patterns', difficulty:2,
    question:'Complete the number pattern: 2,400 → 2,800 → 3,200 → _____ → 4,000',
    answer:'3600', acceptableAnswers:['3600','3,600'],
    hint:'Find the rule. What is 2,800 - 2,400? The same amount is added each time.',
    explanation:'The pattern increases by 400 each time: 2,400 + 400 = 2,800; 2,800 + 400 = 3,200; 3,200 + 400 = <b>3,600</b>; 3,600 + 400 = 4,000. Always check: the next term 4,000 confirms the rule.' }),

  makeNum({ id:'g4m-num-008', chapterId:'g4-numeration', subsection:'expanded', difficulty:1,
    question:'Write 7,000 + 600 + 9 in numerals. (There are NO tens.)',
    answer:'7609', acceptableAnswers:['7609','7,609'],
    hint:'When there are no tens, put a 0 in the tens place.',
    explanation:'7,000 + 600 + 0 + 9 = <b>7,609</b>. The tens place has 0 because there are no tens. Zero acts as a placeholder - it is important to include it or the number changes.' }),

  makeMCQ({ id:'g4m-num-009', chapterId:'g4-numeration', subsection:'words_numerals', difficulty:2,
    question:'How do you write "eight thousand, five hundred and nine" in NUMERALS?',
    options:['8,059','8,509','8,590','8,905'],
    answer:'8,509',
    hint:'Eight thousand = 8,000. Five hundred = 500. Nine = 9. There are no tens.',
    explanation:'Eight thousand = 8,000; five hundred = 500; nine = 9; no tens = 0. Total = <b>8,509</b>. The zero in the tens place is a placeholder - without it, we would get a different number.' }),

  makeNum({ id:'g4m-num-010', chapterId:'g4-numeration', subsection:'word_problems', difficulty:3,
    question:'A town has 4,536 people. A second town has 2,718 MORE people than the first town. How many people live in the second town?',
    answer:'7254', acceptableAnswers:['7254','7,254'],
    hint:'Add 4,536 + 2,718. Start from units and carry where needed.',
    explanation:'4,536 + 2,718: Units 6+8=14 (write 4, carry 1). Tens 3+1+1=5. Hundreds 5+7=12 (write 2, carry 1). Thousands 4+2+1=7. Answer: <b>7,254</b>.' })

);

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4m-num-011', chapterId:'g4-numeration', subsection:'rounding', difficulty:1,
    question:'What is 2,847 rounded to the NEAREST 10?',
    options:['2,840','2,850','2,800','2,900'],
    answer:'2,850',
    hint:'Look at the units digit (7). If it is 5 or more, round up the tens.',
    explanation:'The units digit is 7. Since 7 ≥ 5, we round UP the tens digit: 4 tens becomes 5 tens. So 2,847 rounds to <b>2,850</b>. Rule: if the units digit is 0–4, round down; if 5–9, round up.' }),

  makeMCQ({ id:'g4m-num-012', chapterId:'g4-numeration', subsection:'rounding', difficulty:1,
    question:'What is 5,365 rounded to the NEAREST 100?',
    options:['5,300','5,400','5,000','5,360'],
    answer:'5,400',
    hint:'Look at the tens digit (6). If it is 5 or more, round the hundreds up.',
    explanation:'The tens digit is 6. Since 6 ≥ 5, we round UP the hundreds digit: 3 hundreds becomes 4 hundreds. So 5,365 rounds to <b>5,400</b>. The tens and units become zero when rounding to the nearest 100.' }),

  makeNum({ id:'g4m-num-013', chapterId:'g4-numeration', subsection:'patterns', difficulty:1,
    question:'What is 100 LESS than 7,300?',
    answer:'7200', acceptableAnswers:['7200','7,200'],
    hint:'Subtract 100 from 7,300. The hundreds digit decreases by 1.',
    explanation:'7,300 − 100 = <b>7,200</b>. Subtracting 100 decreases the hundreds digit by 1; all other digits remain the same.' }),

  makeNum({ id:'g4m-num-014', chapterId:'g4-numeration', subsection:'patterns', difficulty:2,
    question:'Complete the number pattern: 3,000 → 2,750 → 2,500 → _____ → 2,000',
    answer:'2250', acceptableAnswers:['2250','2,250'],
    hint:'Find the rule: 3,000 − 2,750 = 250. The pattern SUBTRACTS 250 each time.',
    explanation:'Each step subtracts 250: 3,000 → 2,750 → 2,500 → <b>2,250</b> → 2,000. Confirm: 2,250 − 250 = 2,000 ✓. Number patterns can count up or down by any amount.' }),

  makeMCQ({ id:'g4m-num-015', chapterId:'g4-numeration', subsection:'words_numerals', difficulty:1,
    question:'Which numerals represent "six thousand, seven hundred and forty"?',
    options:['6,074','6,704','6,740','6,470'],
    answer:'6,740',
    hint:'Six thousand = 6,000. Seven hundred = 700. Forty = 40. No units.',
    explanation:'6,000 + 700 + 40 + 0 = <b>6,740</b>. Take care when a digit is zero - do not leave out its place.' }),

  makeMCQ({ id:'g4m-num-016', chapterId:'g4-numeration', subsection:'place_value', difficulty:2,
    question:'Which number has 5 thousands, 3 hundreds, 0 tens and 2 units?',
    options:['5,032','5,302','5,320','5,023'],
    answer:'5,302',
    hint:'Build digit by digit: Th=5, H=3, T=0, U=2.',
    explanation:'Thousands=5, Hundreds=3, Tens=0, Units=2 → <b>5,302</b>. The zero in the tens place is a placeholder - omitting it would change the number entirely.' }),

  makeTF({ id:'g4m-num-017', chapterId:'g4-numeration', subsection:'place_value', difficulty:1,
    question:'The number 9,999 is a 4-digit number.',
    answer:true,
    hint:'Count the digits in 9,999.',
    explanation:'<b>True.</b> 9,999 has four digits and is the largest 4-digit number. The next number, 10,000, is the smallest 5-digit number.' }),

  makeMCQ({ id:'g4m-num-018', chapterId:'g4-numeration', subsection:'compare_order', difficulty:3,
    question:'Place these numbers in order from GREATEST to SMALLEST: 4,519 ; 4,951 ; 4,195 ; 4,915',
    options:[
      '4,915 ; 4,951 ; 4,519 ; 4,195',
      '4,951 ; 4,915 ; 4,519 ; 4,195',
      '4,195 ; 4,519 ; 4,915 ; 4,951',
      '4,519 ; 4,951 ; 4,195 ; 4,915'
    ],
    answer:'4,951 ; 4,915 ; 4,519 ; 4,195',
    hint:'All have 4 thousands. Compare hundreds: 9 > 5 > 1. Two numbers have 9 hundreds - compare their tens next.',
    explanation:'All have 4,000. Hundreds: 9 (4,9xx) > 5 (4,5xx) > 1 (4,1xx). The two 9-hundreds numbers: 4,951 has 5 tens and 4,915 has 1 ten, so 4,951 > 4,915. Final order: <b>4,951 ; 4,915 ; 4,519 ; 4,195</b>.' }),

  makeMCQ({ id:'g4m-num-019', chapterId:'g4-numeration', subsection:'rounding', difficulty:4,
    question:'Priya saves Rs 1,000 every month for 8 months. She then spends Rs 3,500. To the NEAREST HUNDRED RUPEES, how much does she have left?',
    options:['Rs 4,000','Rs 4,500','Rs 5,000','Rs 3,500'],
    answer:'Rs 4,500',
    hint:'Step 1: 1,000 × 8 = total saved. Step 2: subtract 3,500. Step 3: round to nearest 100.',
    explanation:'Total saved: Rs 1,000 × 8 = Rs 8,000. After spending: Rs 8,000 − Rs 3,500 = Rs 4,500. 4,500 is already a multiple of 100, so it rounds to <b>Rs 4,500</b>.' })

);
