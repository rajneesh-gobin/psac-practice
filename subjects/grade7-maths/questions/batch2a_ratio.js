'use strict';
// Grade 7 Maths — g7m-ratio, batch 2A (011–020)

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7m-ratio-011', chapterId:'g7m-ratio', difficulty:2,
    subsection:'simplifying_ratio',
    question:'Simplify the ratio 45 : 60 : 75.',
    options:['3 : 4 : 5','9 : 12 : 15','5 : 6 : 7','15 : 20 : 25'],
    answer:'3 : 4 : 5',
    hint:'Divide all three parts by the LARGEST number that goes into every one of them.',
    explanation:'The HCF of 45, 60 and 75 is 15, so dividing through gives 3 : 4 : 5. Dividing by 5 stops at 9 : 12 : 15 and dividing by 3 stops at 15 : 20 : 25 — both still have a common factor. 5 : 6 : 7 simply subtracts, which is not simplifying.' }),

  makeMCQ({ id:'g7m-ratio-012', chapterId:'g7m-ratio', difficulty:2,
    subsection:'simplifying_ratio',
    question:'Write 750 g : 2 kg as a ratio in its simplest form.',
    options:['3 : 8','8 : 3','3 : 4','375 : 1'],
    answer:'3 : 8',
    hint:'A ratio only works once both quantities are in the SAME unit.',
    explanation:'2 kg = 2 000 g, so the ratio is 750 : 2 000, and dividing both by 250 gives 3 : 8. Comparing 750 with 2 without converting gives 375 : 1, and 8 : 3 has the two quantities the wrong way round.' }),

  makeNum({ id:'g7m-ratio-013', chapterId:'g7m-ratio', difficulty:3,
    subsection:'simplifying_ratio',
    question:'The ratio 24 : n simplifies to 3 : 5. What is the value of n?',
    answer:40,
    hint:'What has 3 been multiplied by to reach 24? Do the same to the 5.',
    explanation:'24 ÷ 3 = 8, so both parts have been multiplied by 8 and n = 5 × 8 = 40. Adding 21 to the 5 instead of multiplying gives 26, which would not simplify to 3 : 5 at all.' }),

  makeNum({ id:'g7m-ratio-014', chapterId:'g7m-ratio', difficulty:3,
    subsection:'dividing_ratio',
    question:'A ribbon 60 cm long is cut into three pieces in the ratio 2 : 3 : 5. How many centimetres long is the LONGEST piece?',
    answer:30,
    hint:'Add the parts of the ratio first to find how many equal shares the ribbon is cut into.',
    explanation:'2 + 3 + 5 = 10 parts, so one part is 60 ÷ 10 = 6 cm and the longest piece is 5 × 6 = 30 cm. Answering 5 gives the number of parts rather than a length, and answering 12 takes the shortest piece.' }),

  makeMCQ({ id:'g7m-ratio-015', chapterId:'g7m-ratio', difficulty:3,
    subsection:'dividing_ratio',
    question:'Rs 1 200 is shared between Anil and Bala in the ratio 5 : 3. How many rupees MORE than Bala does Anil receive?',
    options:['Rs 300','Rs 150','Rs 450','Rs 750'],
    answer:'Rs 300',
    hint:'The difference between the two shares is worth 5 − 3 parts.',
    explanation:'There are 8 parts, so one part is 1 200 ÷ 8 = Rs 150. The difference is 2 parts, that is 2 × 150 = Rs 300. Rs 750 is Anil\'s whole share, Rs 450 is Bala\'s, and Rs 150 is only one part.' }),

  makeNum({ id:'g7m-ratio-016', chapterId:'g7m-ratio', difficulty:4,
    subsection:'dividing_ratio',
    question:'Three friends share the Rs 1 800 cost of a farewell gift in the ratio 4 : 5 : 9. The friend paying the largest amount is later given Rs 200 back by the other two. How many rupees does she pay in the end?',
    answer:700,
    hint:'Find the value of one part, work out her share, and only then adjust it.',
    explanation:'4 + 5 + 9 = 18 parts, so one part is 1 800 ÷ 18 = Rs 100 and her share is 9 × 100 = Rs 900. Getting Rs 200 back leaves 900 − 200 = Rs 700. Answering 900 forgets the refund, and 1 100 adds it on instead of taking it off.' }),

  makeNum({ id:'g7m-ratio-017', chapterId:'g7m-ratio', difficulty:2,
    subsection:'proportion',
    question:'Seven exercise books cost Rs 210. At the same price each, how many rupees do 12 books cost?',
    answer:360,
    hint:'Find the cost of ONE book before scaling up.',
    explanation:'210 ÷ 7 = Rs 30 for one book, so 12 books cost 12 × 30 = Rs 360. Adding 5 books\' worth of rupees (210 + 5 = 215) confuses the number of books with their price.' }),

  makeMCQ({ id:'g7m-ratio-018', chapterId:'g7m-ratio', difficulty:3,
    subsection:'proportion',
    question:'Six workers build a boundary wall in 10 days. Working at the same rate, how long would 4 workers take to build the same wall?',
    options:['15 days','6 days','12 days','20 days'],
    answer:'15 days',
    hint:'Fewer workers means MORE days. Find the total number of worker-days first.',
    explanation:'The job takes 6 × 10 = 60 worker-days, so 4 workers need 60 ÷ 4 = 15 days. Scaling the way you would for a direct proportion gives 10 × 4 ÷ 6 = 6.7 days, which wrongly says fewer workers finish sooner.' }),

  makeNum({ id:'g7m-ratio-019', chapterId:'g7m-ratio', difficulty:3,
    subsection:'proportion',
    question:'A car travels 84 km on 6 litres of petrol. How many litres are needed for a journey of 154 km?',
    answer:11,
    hint:'Work out how many kilometres the car covers on one litre.',
    explanation:'84 ÷ 6 = 14 km per litre, so 154 ÷ 14 = 11 litres. Working out litres per kilometre and then multiplying by 154 gives the same 11, but dividing 154 by 6 instead ignores the car\'s actual rate.' }),

  makeMCQ({ id:'g7m-ratio-020', chapterId:'g7m-ratio', difficulty:4,
    subsection:'proportion',
    question:'A map of Mauritius is drawn to a scale of 1 : 250 000. Port Louis and Mahébourg are 40 km apart on the ground. How far apart are they on the map?',
    options:['16 cm','10 cm','25 cm','1.6 cm'],
    answer:'16 cm',
    hint:'Turn 40 km into centimetres before you divide by the scale factor.',
    explanation:'40 km = 40 000 m = 4 000 000 cm, and 4 000 000 ÷ 250 000 = 16 cm. Misreading the scale as 1 : 2 500 000 gives 1.6 cm, and 25 cm just borrows the digits of the scale itself.' })

);
