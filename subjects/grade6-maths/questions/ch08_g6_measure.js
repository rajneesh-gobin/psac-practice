'use strict';
// Grade 6 Maths - Chapter: Measurement (unit conversion, perimeter, 12h/24h time, money)
// IDs format: g6m-meas-NNN

STATIC_QUESTIONS.push(

  makeNum({ id:'g6m-meas-001', chapterId:'g6-measure', subsection:'conversion', difficulty:1,
    question:'Convert 3.5 km to metres.',
    answer:'3500', acceptableAnswers:['3500','3500 m'],
    hint:'1 km = 1000 m. Multiply by 1000.',
    explanation:'3.5 km × 1000 = <b>3500 m</b>.' }),

  makeNum({ id:'g6m-meas-002', chapterId:'g6-measure', subsection:'conversion', difficulty:1,
    question:'Convert 4800 g to kilograms.',
    answer:'4.8', acceptableAnswers:['4.8','4.8 kg'],
    hint:'1 kg = 1000 g. Divide by 1000.',
    explanation:'4800 g ÷ 1000 = <b>4.8 kg</b>.' }),

  makeNum({ id:'g6m-meas-003', chapterId:'g6-measure', subsection:'conversion', difficulty:1,
    question:'Convert 2 litres 350 ml to millilitres.',
    answer:'2350', acceptableAnswers:['2350','2350 ml'],
    hint:'1 litre = 1000 ml. So 2 litres = 2000 ml. Add 350 ml.',
    explanation:'2 litres = 2000 ml. 2000 + 350 = <b>2350 ml</b>.' }),

  makeNum({ id:'g6m-meas-004', chapterId:'g6-measure', subsection:'perimeter', difficulty:2,
    question:'Find the PERIMETER of a rectangle with length 12 cm and width 7 cm.',
    answer:'38', acceptableAnswers:['38','38 cm'],
    hint:'Perimeter of a rectangle = 2 × (length + width).',
    explanation:'Perimeter = 2 × (12 + 7) = 2 × 19 = <b>38 cm</b>.' }),

  makeNum({ id:'g6m-meas-005', chapterId:'g6-measure', subsection:'perimeter', difficulty:2,
    question:'A square garden has a perimeter of 52 m. What is the length of ONE side?',
    answer:'13', acceptableAnswers:['13','13 m'],
    hint:'A square has 4 equal sides. Divide perimeter by 4.',
    explanation:'Length of one side = 52 ÷ 4 = <b>13 m</b>.' }),

  makeMCQ({ id:'g6m-meas-006', chapterId:'g6-measure', subsection:'conversion', difficulty:1,
    question:'What is 3:45 pm written in 24-hour clock format?',
    options:['3:45','3:45 pm','15:45','13:45'],
    answer:'15:45',
    hint:'For pm times after noon: add 12 to the hours. 3 + 12 = 15.',
    explanation:'3:45 pm in 24-hour format: add 12 to the hour → 3 + 12 = 15. So it is <b>15:45</b>.' }),

  makeMCQ({ id:'g6m-meas-007', chapterId:'g6-measure', subsection:'conversion', difficulty:1,
    question:'What is 22:30 in 12-hour (am/pm) format?',
    options:['10:30 am','2:30 pm','10:30 pm','12:30 am'],
    answer:'10:30 pm',
    hint:'24-hour times from 13:00 to 23:59 are pm. Subtract 12 from the hours: 22 − 12 = 10.',
    explanation:'22:30 is past noon, so it is pm. 22 − 12 = 10. So 22:30 = <b>10:30 pm</b>.' }),

  makeNum({ id:'g6m-meas-008', chapterId:'g6-measure', subsection:'word_probs', difficulty:2,
    question:'A train leaves at 09:20 and arrives at 14:05. How long is the journey? (Answer in hours and minutes, e.g. 4h 45min)',
    answer:'4h 45min', acceptableAnswers:['4h 45min','4 hours 45 minutes','4:45'],
    hint:'From 09:20 to 14:20 = 5 hours. But arrival is 14:05, which is 15 minutes before 14:20. So 5h − 15min = 4h 45min.',
    explanation:'09:20 to 14:05: From 09:20 to 14:20 would be 5 hours. But 14:05 is 15 minutes before 14:20, so the journey is 5h − 15min = <b>4 hours 45 minutes</b>.' }),

  makeNum({ id:'g6m-meas-009', chapterId:'g6-measure', subsection:'conversion', difficulty:2,
    question:'Books cost Rs 85 each. How much do 12 books cost?',
    answer:'1020', acceptableAnswers:['1020','Rs 1020'],
    hint:'Multiply: 85 × 12. Try 85×10=850, 85×2=170. Add.',
    explanation:'85 × 12 = 85×10 + 85×2 = 850 + 170 = <b>Rs 1020</b>.' }),

  makeNum({ id:'g6m-meas-010', chapterId:'g6-measure', subsection:'perimeter', difficulty:2,
    question:'A rectangle has a perimeter of 48 cm. Its length is 14 cm. What is its WIDTH?',
    answer:'10', acceptableAnswers:['10','10 cm'],
    hint:'Perimeter = 2(l + w). So 48 = 2(14 + w). Divide 48 by 2, then subtract 14.',
    explanation:'48 = 2(14 + w). 24 = 14 + w. w = 24 − 14 = <b>10 cm</b>.' })

);

STATIC_QUESTIONS.push(

  makeNum({ id:'g6m-meas-011', chapterId:'g6-measure', subsection:'conversion', difficulty:1,
    question:'Convert 8.25 km to METRES.',
    answer:'8250', acceptableAnswers:['8250','8250 m'],
    hint:'1 km = 1000 m. Multiply by 1000.',
    explanation:'8.25 km × 1000 = <b>8250 m</b>. Key conversions from MIE Grade 6: 1 km = 1000 m, 1 m = 100 cm, 1 cm = 10 mm. To convert from larger to smaller units, multiply.' }),

  makeNum({ id:'g6m-meas-012', chapterId:'g6-measure', subsection:'conversion', difficulty:1,
    question:'Convert 4500 g to KILOGRAMS.',
    answer:'4.5', acceptableAnswers:['4.5','4.5 kg'],
    hint:'1 kg = 1000 g. Divide by 1000.',
    explanation:'4500 ÷ 1000 = <b>4.5 kg</b>. To convert from smaller to larger units, divide. MIE Grade 6 mass conversions: 1 tonne = 1000 kg, 1 kg = 1000 g.' }),

  makeNum({ id:'g6m-meas-013', chapterId:'g6-measure', subsection:'capacity', difficulty:2,
    question:'A tank holds 2.5 litres. How many CENTILITRES is this? (1 litre = 100 cL)',
    answer:'250', acceptableAnswers:['250','250 cL'],
    hint:'Multiply by 100 to convert litres to centilitres.',
    explanation:'2.5 L × 100 = <b>250 cL</b>. Capacity conversions: 1 L = 100 cL = 1000 mL. So 1 cL = 10 mL.' }),

  makeMCQ({ id:'g6m-meas-014', chapterId:'g6-measure', subsection:'conversion', difficulty:2,
    question:'A tourist from France exchanges €200 for Mauritian Rupees. If the exchange rate is 1 euro = Rs 48.50, how many Rupees does she receive?',
    options:['Rs 9,700','Rs 9,500','Rs 9,600','Rs 9,800'],
    answer:'Rs 9,700',
    hint:'Multiply 200 × 48.50.',
    explanation:'200 × 48.50 = <b>Rs 9,700</b>. Currency conversion in MIE Grade 6: Rupees = foreign currency × exchange rate. Common currencies: Euro (€), US Dollar ($), British Pound (£).' }),

  makeNum({ id:'g6m-meas-015', chapterId:'g6-measure', subsection:'length', difficulty:2,
    question:'A rope is 4 m 75 cm long. Another rope is 2 m 50 cm long. What is the TOTAL length in metres and centimetres? (Answer as decimal metres, e.g. 7.25)',
    answer:'7.25', acceptableAnswers:['7.25','7.25 m','7 m 25 cm'],
    hint:'Convert both to cm: 475 + 250 = 725 cm = 7 m 25 cm.',
    explanation:'4 m 75 cm = 475 cm. 2 m 50 cm = 250 cm. Total = 725 cm = <b>7 m 25 cm = 7.25 m</b>.' }),

  makeNum({ id:'g6m-meas-016', chapterId:'g6-measure', subsection:'mass', difficulty:2,
    question:'A suitcase weighs 18 kg 500 g. The airport allowance is 23 kg. How much MORE weight (in kg and g) can be added? (Answer in kg as decimal, e.g. 4.5)',
    answer:'4.5', acceptableAnswers:['4.5','4.5 kg','4 kg 500 g'],
    hint:'23 kg − 18 kg 500 g = ?',
    explanation:'23 kg = 23,000 g. 18 kg 500 g = 18,500 g. Difference = 23,000 − 18,500 = 4,500 g = <b>4 kg 500 g = 4.5 kg</b>.' }),

  makeNum({ id:'g6m-meas-017', chapterId:'g6-measure', subsection:'capacity', difficulty:2,
    question:'A jug contains 1 L 250 mL of juice. 475 mL is poured out. How much is LEFT? (Answer in mL)',
    answer:'775', acceptableAnswers:['775','775 mL'],
    hint:'Convert 1 L 250 mL to mL: 1250 mL. Subtract 475.',
    explanation:'1 L 250 mL = 1250 mL. 1250 − 475 = <b>775 mL</b> remaining.' }),

  makeMCQ({ id:'g6m-meas-018', chapterId:'g6-measure', subsection:'mass', difficulty:2,
    question:'Which is heavier: 2.5 tonnes or 2,600 kg?',
    options:['2.5 tonnes','2,600 kg','They are equal','Cannot be compared'],
    answer:'2,600 kg',
    hint:'Convert 2.5 tonnes to kg: 2.5 × 1000 = 2,500 kg. Compare with 2,600 kg.',
    explanation:'2.5 tonnes = 2.5 × 1000 = 2,500 kg. Since 2,600 kg > 2,500 kg, <b>2,600 kg is heavier</b>. Always convert to the same unit before comparing.' }),

  makeNum({ id:'g6m-meas-019', chapterId:'g6-measure', subsection:'conversion', difficulty:4,
    question:'A family\'s electricity bill in Mauritius is charged at Rs 4.20 per unit for the first 100 units and Rs 6.50 per unit for units above 100. If they used 150 units, what is their TOTAL bill?',
    answer:'745', acceptableAnswers:['745','Rs 745'],
    hint:'First 100 units: 100 × 4.20. Next 50 units: 50 × 6.50. Add together.',
    explanation:'First 100 units: 100 × Rs 4.20 = Rs 420. Next 50 units (150 − 100): 50 × Rs 6.50 = Rs 325. Total = 420 + 325 = <b>Rs 745</b>.' })

);
