'use strict';
// Grade 6 Maths — top-up questions.

// --- g6-decimals (8 questions: g6m-dec-050..057) ---
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g6m-dec-050', chapterId:'g6-decimals', difficulty:1,
    question:'What is 3.45 + 1.7?',
    options:['4.52','5.15','5.12','4.15'],
    answer:'5.15',
    hint:'Line up the decimal points: 3.45 + 1.70.',
    explanation:'3.45 + 1.70 = 5.15. Always align decimal points when adding: the tenths column (4+7=11, carry 1), then the units column (3+1+1=5).' }),

  makeMCQ({ id:'g6m-dec-051', chapterId:'g6-decimals', difficulty:1,
    question:'What is 2.4 × 3?',
    options:['6.2','7.2','7.4','6.4'],
    answer:'7.2',
    hint:'Calculate 24 × 3 = 72, then replace the decimal point.',
    explanation:'2.4 × 3: ignore the decimal and multiply 24 × 3 = 72. 2.4 has 1 decimal place, so the answer has 1 decimal place: 7.2.' }),

  makeMCQ({ id:'g6m-dec-052', chapterId:'g6-decimals', difficulty:2,
    question:'What is 0.5 × 0.4?',
    options:['0.09','0.20','0.45','2.0'],
    answer:'0.20',
    hint:'5 × 4 = 20. Count decimal places: 1 + 1 = 2 total.',
    explanation:'0.5 × 0.4: multiply 5 × 4 = 20. Each factor has 1 decimal place, so the product has 2 decimal places: 0.20 = 0.2.' }),

  makeMCQ({ id:'g6m-dec-053', chapterId:'g6-decimals', difficulty:1,
    question:'What is 4.8 ÷ 4?',
    options:['1.0','1.2','1.8','2.0'],
    answer:'1.2',
    hint:'Think: 48 ÷ 4 = 12, then replace the decimal point.',
    explanation:'4.8 ÷ 4: multiply both by 10 to get 48 ÷ 4 = 12, then replace the decimal: 1.2.' }),

  makeMCQ({ id:'g6m-dec-054', chapterId:'g6-decimals', difficulty:1,
    question:'Which decimal is equal to ¾?',
    options:['0.25','0.34','0.70','0.75'],
    answer:'0.75',
    hint:'Divide 3 by 4.',
    explanation:'¾ = 3 ÷ 4 = 0.75. Key conversions: ½ = 0.5, ¼ = 0.25, ¾ = 0.75, ⅕ = 0.2, ⅛ = 0.125.' }),

  makeMCQ({ id:'g6m-dec-055', chapterId:'g6-decimals', difficulty:2,
    question:'Round 7.38 to one decimal place.',
    options:['7.3','7.4','7.0','8.0'],
    answer:'7.4',
    hint:'Look at the second decimal digit (8). Is it 5 or more?',
    explanation:'To round 7.38 to 1 decimal place, look at the second decimal digit: 8 ≥ 5, so round up. The first decimal digit goes from 3 to 4. Answer: 7.4.' }),

  makeMCQ({ id:'g6m-dec-056', chapterId:'g6-decimals', difficulty:4,
    question:'A shopkeeper buys 6 identical toys for Rs 85.50 each and sells them all for a total of Rs 540. What is his total profit?',
    options:['Rs 27.00','Rs 54.00','Rs 111.00','Rs 454.50'],
    answer:'Rs 27.00',
    hint:'Find the total cost (6 × Rs 85.50) then subtract from Rs 540.',
    explanation:'Total cost = 6 × Rs 85.50 = Rs 513.00. Profit = Rs 540.00 − Rs 513.00 = Rs 27.00.' }),

  makeMCQ({ id:'g6m-dec-057', chapterId:'g6-decimals', difficulty:4,
    question:'Mia runs 1.35 km in the morning and 0.9 km in the evening every day for 5 days. What is the total distance she runs over the 5 days?',
    options:['9.25 km','11.25 km','6.75 km','10.00 km'],
    answer:'11.25 km',
    hint:'Add the two daily distances first, then multiply by 5.',
    explanation:'Distance per day = 1.35 + 0.90 = 2.25 km. Total for 5 days = 2.25 × 5 = 11.25 km.' })
);

// --- g6-factors-hcf (2 questions: g6m-fac-050..051) ---
STATIC_QUESTIONS.push(
  makeMCQ({ id:'g6m-fac-050', chapterId:'g6-factors-hcf', difficulty:4,
    question:'Two pieces of ribbon measure 48 cm and 36 cm. What is the greatest length that both pieces can be cut into equal pieces, with no ribbon left over?',
    options:['6 cm','8 cm','12 cm','24 cm'],
    answer:'12 cm',
    hint:'Find the HCF of 48 and 36.',
    explanation:'Factors of 48: 1, 2, 3, 4, 6, 8, 12, 16, 24, 48. Factors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36. The Highest Common Factor is 12. Each ribbon can be cut into 12 cm pieces with no waste.' }),

  makeMCQ({ id:'g6m-fac-051', chapterId:'g6-factors-hcf', difficulty:4,
    question:'A bus to town leaves every 12 minutes and a bus to the beach leaves every 8 minutes. Both leave at 9:00 am. After how many minutes will both buses next depart at exactly the same time?',
    options:['4 minutes','20 minutes','24 minutes','96 minutes'],
    answer:'24 minutes',
    hint:'Find the LCM of 12 and 8.',
    explanation:'Multiples of 12: 12, 24, 36 … Multiples of 8: 8, 16, 24, 32 … The Lowest Common Multiple is 24. Both buses will next leave together 24 minutes after 9:00 am, at 9:24 am.' })
);
