'use strict';
// Grade 4 Maths — Chapter: Numeration & Place Value (0-10,000)
// IDs format: g4m-num-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4m-num-001', chapterId:'g4-numeration', difficulty:1,
    question:'What is the LARGEST 4-digit number?',
    options:['9,000','9,900','9,999','10,000'],
    answer:'9,999',
    hint:'A 4-digit number has thousands, hundreds, tens and units.',
    explanation:'The largest 4-digit number is <b>9,999</b> (nine thousand, nine hundred and ninety-nine). The next number, 10,000, is a 5-digit number. MIE Grade 4 works with whole numbers up to 10,000.' }),

  makeMCQ({ id:'g4m-num-002', chapterId:'g4-numeration', difficulty:1,
    question:'In the number 3,456, what is the VALUE of the digit 4?',
    options:['4','40','400','4,000'],
    answer:'400',
    hint:'Place values from right: units, tens, hundreds, thousands.',
    explanation:'In 3,456: digit 3 is in the thousands (value 3,000), digit 4 is in the <b>hundreds (value 400)</b>, digit 5 is in the tens (value 50), digit 6 is in the units (value 6).' }),

  makeTF({ id:'g4m-num-003', chapterId:'g4-numeration', difficulty:1,
    question:'The number 847 is an ODD number.',
    answer:true,
    hint:'Look at the last digit (units digit). Odd numbers end in 1, 3, 5, 7 or 9.',
    explanation:'<b>True.</b> A number is ODD if its units digit is 1, 3, 5, 7 or 9. 847 ends in 7, so it is odd. EVEN numbers end in 0, 2, 4, 6 or 8.' }),

  makeMCQ({ id:'g4m-num-004', chapterId:'g4-numeration', difficulty:2,
    question:'Which is the GREATEST number?',
    options:['4,329','4,293','4,923','4,392'],
    answer:'4,923',
    hint:'Compare digit by digit from left. Start with thousands, then hundreds.',
    explanation:'All numbers have 4 thousands. Compare the hundreds: 9 hundreds > 3 hundreds. So <b>4,923</b> is the greatest. Strategy: compare digit by digit from left — thousands first, then hundreds, then tens, then units.' }),

  makeNum({ id:'g4m-num-005', chapterId:'g4-numeration', difficulty:1,
    question:'Write this in numerals: 4,000 + 200 + 50 + 7',
    answer:'4257', acceptableAnswers:['4257','4,257'],
    hint:'Add the thousands, hundreds, tens and units together.',
    explanation:'4,000 + 200 + 50 + 7 = <b>4,257</b>. This is called expanded notation. Thousands = 4, hundreds = 2, tens = 5, units = 7.' }),

  makeNum({ id:'g4m-num-006', chapterId:'g4-numeration', difficulty:2,
    question:'What number is 1,000 MORE than 6,845?',
    answer:'7845', acceptableAnswers:['7845','7,845'],
    hint:'Add 1,000 to 6,845. This increases the thousands digit by 1.',
    explanation:'6,845 + 1,000 = <b>7,845</b>. Adding 1,000 increases the thousands digit from 6 to 7. The other digits stay the same.' }),

  makeNum({ id:'g4m-num-007', chapterId:'g4-numeration', difficulty:2,
    question:'Complete the number pattern: 2,400 → 2,800 → 3,200 → _____ → 4,000',
    answer:'3600', acceptableAnswers:['3600','3,600'],
    hint:'Find the rule. What is 2,800 - 2,400? The same amount is added each time.',
    explanation:'The pattern increases by 400 each time: 2,400 + 400 = 2,800; 2,800 + 400 = 3,200; 3,200 + 400 = <b>3,600</b>; 3,600 + 400 = 4,000. Always check: the next term 4,000 confirms the rule.' }),

  makeNum({ id:'g4m-num-008', chapterId:'g4-numeration', difficulty:1,
    question:'Write 7,000 + 600 + 9 in numerals. (There are NO tens.)',
    answer:'7609', acceptableAnswers:['7609','7,609'],
    hint:'When there are no tens, put a 0 in the tens place.',
    explanation:'7,000 + 600 + 0 + 9 = <b>7,609</b>. The tens place has 0 because there are no tens. Zero acts as a placeholder — it is important to include it or the number changes.' }),

  makeMCQ({ id:'g4m-num-009', chapterId:'g4-numeration', difficulty:2,
    question:'How do you write "eight thousand, five hundred and nine" in NUMERALS?',
    options:['8,059','8,509','8,590','8,905'],
    answer:'8,509',
    hint:'Eight thousand = 8,000. Five hundred = 500. Nine = 9. There are no tens.',
    explanation:'Eight thousand = 8,000; five hundred = 500; nine = 9; no tens = 0. Total = <b>8,509</b>. The zero in the tens place is a placeholder — without it, we would get a different number.' }),

  makeNum({ id:'g4m-num-010', chapterId:'g4-numeration', difficulty:3,
    question:'A town has 4,536 people. A second town has 2,718 MORE people than the first town. How many people live in the second town?',
    answer:'7254', acceptableAnswers:['7254','7,254'],
    hint:'Add 4,536 + 2,718. Start from units and carry where needed.',
    explanation:'4,536 + 2,718: Units 6+8=14 (write 4, carry 1). Tens 3+1+1=5. Hundreds 5+7=12 (write 2, carry 1). Thousands 4+2+1=7. Answer: <b>7,254</b>.' })

);
