'use strict';
// Grade 6 Maths — Chapter: Decimals (3 decimal places, ×÷ by 10/100/1000)
// IDs format: g6m-dec-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6m-dec-001', chapterId:'g6-decimals', difficulty:1,
    question:'What is the value of the digit <b>7</b> in 3.47<b>7</b>?',
    options:['7 tenths','7 hundredths','7 thousandths','7 ones'],
    answer:'7 thousandths',
    hint:'Positions after the decimal point: tenths, hundredths, thousandths.',
    explanation:'In 3.477, the digits after the decimal are: 4 (tenths), 7 (hundredths), <b>7 (thousandths)</b>. The last 7 is in the thousandths place, so its value is 7/1000.' }),

  makeNum({ id:'g6m-dec-002', chapterId:'g6-decimals', difficulty:1,
    question:'Write 0.375 as a fraction in its simplest form. (Write as A/B)',
    answer:'3/8', acceptableAnswers:['3/8'],
    hint:'0.375 = 375/1000. Find HCF(375, 1000) = 125. Divide both by 125.',
    explanation:'0.375 = 375/1000. HCF = 125. 375÷125 = 3, 1000÷125 = 8. So 0.375 = <b>3/8</b>.' }),

  makeNum({ id:'g6m-dec-003', chapterId:'g6-decimals', difficulty:1,
    question:'Calculate: 4.85 × 10',
    answer:'48.5', acceptableAnswers:['48.5'],
    hint:'Multiplying by 10 moves the decimal point ONE place to the right.',
    explanation:'4.85 × 10 = <b>48.5</b>. Each digit moves one place to the left (or equivalently the decimal point shifts one place right).' }),

  makeNum({ id:'g6m-dec-004', chapterId:'g6-decimals', difficulty:1,
    question:'Calculate: 7.36 × 100',
    answer:'736', acceptableAnswers:['736'],
    hint:'Multiplying by 100 moves the decimal point TWO places to the right.',
    explanation:'7.36 × 100 = <b>736</b>. The decimal moves two places right, giving a whole number.' }),

  makeNum({ id:'g6m-dec-005', chapterId:'g6-decimals', difficulty:1,
    question:'Calculate: 5.2 × 1000',
    answer:'5200', acceptableAnswers:['5200'],
    hint:'Multiplying by 1000 moves the decimal point THREE places to the right.',
    explanation:'5.2 × 1000 = <b>5200</b>. The decimal point moves three places to the right.' }),

  makeNum({ id:'g6m-dec-006', chapterId:'g6-decimals', difficulty:1,
    question:'Calculate: 830 ÷ 100',
    answer:'8.3', acceptableAnswers:['8.3'],
    hint:'Dividing by 100 moves the decimal point TWO places to the left.',
    explanation:'830 ÷ 100 = <b>8.3</b>. When dividing by 100, the decimal moves two places to the left (or digits move two places to the right).' }),

  makeNum({ id:'g6m-dec-007', chapterId:'g6-decimals', difficulty:2,
    question:'Calculate: 3.245 + 1.78 (answer to 3 decimal places)',
    answer:'5.025', acceptableAnswers:['5.025'],
    hint:'Line up the decimal points and add: 3.245 + 1.780.',
    explanation:'3.245 + 1.780 = <b>5.025</b>. Always line up decimal points when adding or subtracting decimals.' }),

  makeNum({ id:'g6m-dec-008', chapterId:'g6-decimals', difficulty:2,
    question:'Calculate: 6.4 − 2.875',
    answer:'3.525', acceptableAnswers:['3.525'],
    hint:'Write as 6.400 − 2.875 (add trailing zeros so both have 3 decimal places).',
    explanation:'6.400 − 2.875 = <b>3.525</b>. Adding trailing zeros (6.400) makes the subtraction easier — and does not change the value.' }),

  makeMCQ({ id:'g6m-dec-009', chapterId:'g6-decimals', difficulty:2,
    question:'Round 4.7368 to <b>2 decimal places</b>.',
    options:['4.73','4.74','4.7','4.736'],
    answer:'4.74',
    hint:'Look at the third decimal place (6). Since 6 ≥ 5, round the second decimal place up.',
    explanation:'4.7368 — third decimal digit is 6 (≥ 5), so we round up the second decimal digit from 3 to 4. Answer: <b>4.74</b>.' }),

  makeNum({ id:'g6m-dec-010', chapterId:'g6-decimals', difficulty:2,
    question:'A bottle holds 1.5 litres. How many millilitres is this? (1 litre = 1000 ml)',
    answer:'1500', acceptableAnswers:['1500'],
    hint:'Multiply by 1000 to convert litres to millilitres.',
    explanation:'1.5 × 1000 = <b>1500 ml</b>. Multiplying by 1000 shifts the decimal 3 places right.' })

);
