'use strict';
// Grade 6 Maths - Chapter: Decimals (3 decimal places, ×÷ by 10/100/1000)
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
    explanation:'6.400 − 2.875 = <b>3.525</b>. Adding trailing zeros (6.400) makes the subtraction easier - and does not change the value.' }),

  makeMCQ({ id:'g6m-dec-009', chapterId:'g6-decimals', difficulty:2,
    question:'Round 4.7368 to <b>2 decimal places</b>.',
    options:['4.73','4.74','4.7','4.736'],
    answer:'4.74',
    hint:'Look at the third decimal place (6). Since 6 ≥ 5, round the second decimal place up.',
    explanation:'4.7368 - third decimal digit is 6 (≥ 5), so we round up the second decimal digit from 3 to 4. Answer: <b>4.74</b>.' }),

  makeNum({ id:'g6m-dec-010', chapterId:'g6-decimals', difficulty:2,
    question:'A bottle holds 1.5 litres. How many millilitres is this? (1 litre = 1000 ml)',
    answer:'1500', acceptableAnswers:['1500'],
    hint:'Multiply by 1000 to convert litres to millilitres.',
    explanation:'1.5 × 1000 = <b>1500 ml</b>. Multiplying by 1000 shifts the decimal 3 places right.' })

);

STATIC_QUESTIONS.push(

  makeNum({ id:'g6m-dec-011', chapterId:'g6-decimals', difficulty:1,
    question:'Calculate: 4.35 × 3',
    answer:'13.05', acceptableAnswers:['13.05'],
    hint:'Multiply 435 × 3 = 1305, then place the decimal point 2 places from right.',
    explanation:'435 × 3 = 1305. The original number had 2 decimal places → answer has 2 decimal places: <b>13.05</b>. MIE Grade 6 method: ignore the decimal, multiply as whole numbers, then insert the decimal at the end by counting decimal places.' }),

  makeNum({ id:'g6m-dec-012', chapterId:'g6-decimals', difficulty:2,
    question:'Calculate: 2.46 × 12',
    answer:'29.52', acceptableAnswers:['29.52'],
    hint:'Multiply 246 × 12 = 2952, then place the decimal 2 places from right.',
    explanation:'246 × 12: 246×2=492; 246×10=2460; total=2952. Two decimal places → <b>29.52</b>.' }),

  makeNum({ id:'g6m-dec-013', chapterId:'g6-decimals', difficulty:1,
    question:'Meera bought items costing Rs 45.75, Rs 128.50 and Rs 67.25. What is the TOTAL cost?',
    answer:'241.50', acceptableAnswers:['241.50','241.5','Rs 241.50'],
    hint:'Add the three amounts, aligning decimal points: 45.75 + 128.50 + 67.25.',
    explanation:'45.75 + 128.50 = 174.25. Then 174.25 + 67.25 = <b>Rs 241.50</b>. Always align decimal points when adding/subtracting decimals.' }),

  makeMCQ({ id:'g6m-dec-014', chapterId:'g6-decimals', difficulty:2,
    question:'Which decimal is the GREATEST?',
    options:['0.45','0.405','0.450','0.045'],
    answer:'0.45',
    hint:'0.45 and 0.450 are the same. Compare 0.45 with 0.405: look at the hundredths digit.',
    explanation:'0.45 = 0.450 (adding a zero after the last decimal place doesn\'t change the value). Compare 0.450 with 0.405: tenths are the same (4), but hundredths: 5 > 0. So 0.45 = 0.450 > 0.405 > 0.045. The greatest is <b>0.45</b>.' }),

  makeNum({ id:'g6m-dec-015', chapterId:'g6-decimals', difficulty:2,
    question:'Convert the fraction 7/20 to a DECIMAL.',
    answer:'0.35', acceptableAnswers:['0.35'],
    hint:'Multiply numerator and denominator to make the denominator 100: 7/20 = 35/100.',
    explanation:'7/20 × 5/5 = 35/100 = <b>0.35</b>. Alternatively: 7 ÷ 20 = 0.35. The MIE Grade 6 textbook teaches converting to hundredths (or thousandths) as the most efficient method for simple fractions.' }),

  makeNum({ id:'g6m-dec-016', chapterId:'g6-decimals', difficulty:2,
    question:'Round 6.847 to 2 DECIMAL PLACES.',
    answer:'6.85', acceptableAnswers:['6.85'],
    hint:'Look at the third decimal place (7). Since 7 ≥ 5, round up the second decimal place.',
    explanation:'6.847 - the third decimal digit is 7 (≥ 5), so round up: 6.84 → 6.<b>85</b>. Rounding to 2 decimal places means keeping only 2 digits after the decimal point.' }),

  makeNum({ id:'g6m-dec-017', chapterId:'g6-decimals', difficulty:2,
    question:'A shopkeeper buys 12 kg of rice at Rs 35.50 per kg. What is the TOTAL COST?',
    answer:'426', acceptableAnswers:['426','Rs 426','426.00'],
    hint:'Multiply 35.50 × 12. Try 35.5 × 10 = 355, then 35.5 × 2 = 71. Add.',
    explanation:'35.50 × 10 = 355. 35.50 × 2 = 71. Total: 355 + 71 = <b>Rs 426</b>.' }),

  makeMCQ({ id:'g6m-dec-018', chapterId:'g6-decimals', difficulty:2,
    question:'Which of these has the correct ORDER from SMALLEST to GREATEST?',
    options:[
      '0.6, 0.06, 0.61, 0.609',
      '0.06, 0.6, 0.609, 0.61',
      '0.06, 0.6, 0.61, 0.609',
      '0.609, 0.61, 0.6, 0.06'
    ],
    answer:'0.06, 0.6, 0.609, 0.61',
    hint:'Compare digit by digit from left: tenths first, then hundredths, then thousandths.',
    explanation:'Tenths: 0.06 has 0 tenths; others have 6 tenths. So 0.06 is smallest. Among 0.6, 0.609, 0.61: all have 6 tenths; compare hundredths: 0 vs 0 vs 1. 0.609 vs 0.610: thousandths 9 < 0 - wait: 0.610 > 0.609. So order: <b>0.06, 0.6, 0.609, 0.61</b>.' }),

  makeNum({ id:'g6m-dec-019', chapterId:'g6-decimals', difficulty:4,
    question:'A car travels 38.4 km on 3.2 litres of petrol. How many km does it travel per LITRE? If petrol costs Rs 52.50 per litre, what is the cost of petrol for a 192 km journey? (Answer: cost in Rs)',
    answer:'315', acceptableAnswers:['315','Rs 315'],
    hint:'km per litre = 38.4 ÷ 3.2. Litres for 192 km = 192 ÷ km per litre. Cost = litres × Rs 52.50.',
    explanation:'km per litre = 38.4 ÷ 3.2 = 12 km/litre. Litres for 192 km = 192 ÷ 12 = 6 litres. Cost = 6 × 52.50 = <b>Rs 315</b>.' })

);
