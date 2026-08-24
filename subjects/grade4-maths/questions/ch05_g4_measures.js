'use strict';
// Grade 4 Maths — Chapter: Measures & Units (length/mass/capacity/time/money)
// IDs format: g4m-meas-NNN

STATIC_QUESTIONS.push(

  makeNum({ id:'g4m-meas-001', chapterId:'g4-measures', difficulty:1,
    question:'Convert 5 m to CENTIMETRES.',
    answer:'500', acceptableAnswers:['500','500 cm'],
    hint:'1 m = 100 cm. Multiply by 100.',
    explanation:'5 m x 100 = <b>500 cm</b>. MIE Grade 4 length conversion: 1 m = 100 cm. To convert metres to centimetres, multiply by 100. To convert cm to m, divide by 100.' }),

  makeNum({ id:'g4m-meas-002', chapterId:'g4-measures', difficulty:1,
    question:'Convert 3 kg to GRAMS.',
    answer:'3000', acceptableAnswers:['3000','3000 g','3,000 g'],
    hint:'1 kg = 1000 g. Multiply by 1000.',
    explanation:'3 kg x 1000 = <b>3,000 g</b>. MIE Grade 4 mass conversion: 1 kg = 1000 g. Multiply by 1000 to go from kg to g; divide by 1000 to go from g to kg.' }),

  makeNum({ id:'g4m-meas-003', chapterId:'g4-measures', difficulty:1,
    question:'Convert 4 L to CENTILITRES. (1 L = 100 cL)',
    answer:'400', acceptableAnswers:['400','400 cL'],
    hint:'Multiply by 100 to convert litres to centilitres.',
    explanation:'4 L x 100 = <b>400 cL</b>. MIE Grade 4 capacity conversion: 1 L = 100 cL. Other unit: 1 L = 1000 mL, so 1 cL = 10 mL.' }),

  makeNum({ id:'g4m-meas-004', chapterId:'g4-measures', difficulty:2,
    question:'Convert 350 cm to METRES. (Write as a decimal, e.g. 3.5)',
    answer:'3.5', acceptableAnswers:['3.5','3.5 m','3 m 50 cm'],
    hint:'Divide by 100 to convert centimetres to metres.',
    explanation:'350 cm / 100 = <b>3.5 m</b> = 3 m 50 cm. When converting from a smaller unit to a larger unit, divide.' }),

  makeNum({ id:'g4m-meas-005', chapterId:'g4-measures', difficulty:2,
    question:'1 hour 45 minutes = how many MINUTES?',
    answer:'105', acceptableAnswers:['105','105 minutes'],
    hint:'1 hour = 60 minutes. Add 60 + 45.',
    explanation:'1 hour = 60 minutes. 60 + 45 = <b>105 minutes</b>. Time conversions: 1 hour = 60 minutes, 1 minute = 60 seconds, 1 day = 24 hours.' }),

  makeMCQ({ id:'g4m-meas-006', chapterId:'g4-measures', difficulty:1,
    question:'On a clock, where does the MINUTE HAND point when the time is EXACTLY 3 o\'clock?',
    options:['To the 3','To the 6','To the 9','To the 12'],
    answer:"To the 12",
    hint:'When the time is exactly on the hour, where is the minute hand?',
    explanation:'When the time is exactly on the hour (e.g. 3 o\'clock), the minute hand always points to the <b>12</b>. The hour hand then points to the hour number (3 for 3 o\'clock).' }),

  makeNum({ id:'g4m-meas-007', chapterId:'g4-measures', difficulty:2,
    question:'A bag of sugar weighs 2 kg 500 g. What is this in GRAMS?',
    answer:'2500', acceptableAnswers:['2500','2500 g','2,500 g'],
    hint:'Convert 2 kg to grams, then add 500 g.',
    explanation:'2 kg = 2,000 g. 2,000 g + 500 g = <b>2,500 g</b>. Always convert the whole number of kg first, then add the remaining grams.' }),

  makeNum({ id:'g4m-meas-008', chapterId:'g4-measures', difficulty:2,
    question:'Meera buys 3 bottles of juice, each containing 500 mL. What is the TOTAL amount in LITRES?',
    answer:'1.5', acceptableAnswers:['1.5','1.5 L','1500 mL'],
    hint:'Find total mL first: 3 x 500. Then convert to litres (divide by 1000).',
    explanation:'3 x 500 mL = 1,500 mL. 1,500 mL / 1,000 = <b>1.5 L</b>. MIE Grade 4: 1 L = 1,000 mL = 100 cL.' }),

  makeNum({ id:'g4m-meas-009', chapterId:'g4-measures', difficulty:2,
    question:'Ram buys 4 pens at Rs 15 each and 2 rulers at Rs 8 each. How much does he pay in TOTAL?',
    answer:'76', acceptableAnswers:['76','Rs 76'],
    hint:'Find the cost of pens (4 x 15) and rulers (2 x 8) separately. Then add.',
    explanation:'Pens: 4 x Rs 15 = Rs 60. Rulers: 2 x Rs 8 = Rs 16. Total = 60 + 16 = <b>Rs 76</b>. Two-step money word problem.' }),

  makeNum({ id:'g4m-meas-010', chapterId:'g4-measures', difficulty:4,
    question:'Each of 4 bags weighs 1 kg 250 g. All 4 bags are packed into a carton that weighs 500 g. What is the TOTAL MASS of the packed carton in GRAMS?',
    answer:'5500', acceptableAnswers:['5500','5500 g','5,500 g'],
    hint:'Step 1: convert 1 kg 250 g to grams. Step 2: multiply by 4. Step 3: add the carton weight.',
    explanation:'Each bag = 1,000 + 250 = 1,250 g. 4 bags = 4 x 1,250 = 5,000 g. Add carton: 5,000 + 500 = <b>5,500 g</b>.' })

);
