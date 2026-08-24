'use strict';
// ══════════════════════════════════════════════
//  MathMaster Grade 5 - Extended Question Pool
//  Adds ~200 questions to bring total to 300+
// ══════════════════════════════════════════════

(function () {

// ── EXTRA STATIC QUESTIONS ────────────────────
const EXTRA = [

  // ════════════ NUMERATION ════════════
  makeMCQ({ id:'N09', chapterId:'numeration', difficulty:1,
    question:'Write the number <b>28,050</b> in words.',
    options:['Twenty-eight thousand and fifty','Two thousand eight hundred and fifty','Twenty-eight hundred fifty','Twenty thousand eight fifty'],
    answer:'Twenty-eight thousand and fifty',
    hint:'Read the number in groups: 28 thousands, 0 hundreds, 5 tens, 0 ones.',
    explanation:'28,050 = twenty-eight thousand and fifty (the hundreds digit is 0, so we skip it).' }),

  makeNum({ id:'N10', chapterId:'numeration', difficulty:1,
    question:'What is the digit in the <b>hundreds</b> place of <b>67,435</b>?',
    answer:'4',
    hint:'Count from the right: ones (5), tens (3), hundreds (4).',
    explanation:'In 67,435, the hundreds digit is <b>4</b>.' }),

  makeMCQ({ id:'N11', chapterId:'numeration', difficulty:2,
    question:'Which symbol correctly compares the two numbers?<br><b>54,321 ___ 54,312</b>',
    options:['>','<','=','Cannot compare'],
    answer:'>',
    hint:'Compare digit by digit from left. The first four digits are the same (5,4,3). Compare the tens: 2 > 1.',
    explanation:'54,321 vs 54,312: the tens digit 2 > 1, so 54,321 <b>></b> 54,312.' }),

  makeNum({ id:'N12', chapterId:'numeration', difficulty:2,
    question:'Round <b>47,682</b> to the nearest <b>1,000</b>.',
    answer:'48000', acceptableAnswers:['48000','48,000'],
    hint:'Look at the hundreds digit (6). Since 6 ≥ 5, round the thousands digit up.',
    explanation:'Hundreds digit = 6 ≥ 5, so round up: 47,682 → <b>48,000</b>.' }),

  makeNum({ id:'N13', chapterId:'numeration', difficulty:2,
    question:'What is <b>1,000 less</b> than 83,200?',
    answer:'82200', acceptableAnswers:['82200','82,200'],
    hint:'Subtracting 1,000 reduces only the thousands digit by 1.',
    explanation:'83,200 − 1,000 = <b>82,200</b>.' }),

  makeMCQ({ id:'N14', chapterId:'numeration', difficulty:3,
    question:'The number 35,□72 has a 4 in the <b>hundreds</b> place. What is □?',
    options:['4','3','5','7'],
    answer:'4',
    hint:'The hundreds position (3rd from right) is the □ digit here. 35,_72 means the hundreds digit is the blank.',
    explanation:'35,□72: positions right to left: 2=ones, 7=tens, □=hundreds. So □ = <b>4</b>.' }),

  makeNum({ id:'N15', chapterId:'numeration', difficulty:3,
    question:'Write the number that is <b>100 less</b> than fifty thousand and eight.',
    answer:'49908', acceptableAnswers:['49908','49,908'],
    hint:'First convert to digits: fifty thousand and eight = 50,008. Then subtract 100.',
    explanation:'50,008 − 100 = <b>49,908</b>.' }),

  makeNum({ id:'N16', chapterId:'numeration', difficulty:4,
    question:'A company sold 34,560 items in January and 28,745 items in February.<br>How many items did they sell <b>in total</b> over both months?',
    answer:'63305', acceptableAnswers:['63305','63,305'],
    hint:'Add the two months together using column addition.',
    explanation:'34,560 + 28,745 = <b>63,305</b>.' }),

  // ════════════ FOUR OPERATIONS ════════════
  makeNum({ id:'F10', chapterId:'four_ops', difficulty:1,
    question:'Calculate: <b>48,324 + 31,275</b>',
    answer:'79599', acceptableAnswers:['79599','79,599'],
    hint:'Add column by column from right to left.',
    explanation:'48,324 + 31,275 = <b>79,599</b>.' }),

  makeNum({ id:'F11', chapterId:'four_ops', difficulty:1,
    question:'Calculate: <b>93,000 − 45,678</b>',
    answer:'47322', acceptableAnswers:['47322','47,322'],
    hint:'Borrow as needed. 93,000 has zeros, so you\'ll borrow through them.',
    explanation:'93,000 − 45,678 = <b>47,322</b>.' }),

  makeNum({ id:'F12', chapterId:'four_ops', difficulty:2,
    question:'Calculate: <b>325 × 24</b>',
    answer:'7800', acceptableAnswers:['7800','7,800'],
    hint:'325 × 24 = 325 × 20 + 325 × 4 = 6,500 + 1,300.',
    explanation:'325 × 20 = 6,500 and 325 × 4 = 1,300. 6,500 + 1,300 = <b>7,800</b>.' }),

  makeNum({ id:'F13', chapterId:'four_ops', difficulty:2,
    question:'Calculate: <b>6,384 ÷ 8</b>',
    answer:'798',
    hint:'Use long division. 63÷8=7 r7. 78÷8=9 r6. 64÷8=8.',
    explanation:'6,384 ÷ 8 = <b>798</b>.' }),

  makeMCQ({ id:'F14', chapterId:'four_ops', difficulty:3,
    question:'What is the <b>remainder</b> when 7,654 is divided by 9?',
    options:['1','2','4','6'],
    answer:'4',
    hint:'9 × 850 = 7,650. 7,654 − 7,650 = 4.',
    explanation:'9 × 850 = 7,650. 7,654 − 7,650 = <b>4</b>. Remainder = 4.' }),

  makeNum({ id:'F15', chapterId:'four_ops', difficulty:3,
    question:'Calculate: <b>412 × 35</b>',
    answer:'14420', acceptableAnswers:['14420','14,420'],
    hint:'412 × 35 = 412 × 30 + 412 × 5 = 12,360 + 2,060.',
    explanation:'412 × 30 = 12,360 and 412 × 5 = 2,060. 12,360 + 2,060 = <b>14,420</b>.' }),

  makeNum({ id:'F16', chapterId:'four_ops', difficulty:4,
    question:'A library has <b>4,284 books</b> on 6 equal shelves.<br>How many books are on <b>each shelf</b>?',
    answer:'714',
    hint:'Divide total books by number of shelves.',
    explanation:'4,284 ÷ 6 = <b>714 books</b> per shelf.' }),

  makeNum({ id:'F17', chapterId:'four_ops', difficulty:4,
    question:'A school orders <b>45 boxes</b> of pens. Each box holds <b>36 pens</b>.<br>How many pens are ordered <b>in total</b>?',
    answer:'1620', acceptableAnswers:['1620','1,620'],
    hint:'Multiply boxes × pens per box.',
    explanation:'45 × 36 = <b>1,620 pens</b>.' }),

  // ════════════ SQUARE NUMBERS ════════════
  makeNum({ id:'S09', chapterId:'square_nums', difficulty:1,
    question:'What is <b>12²</b>?',
    answer:'144',
    hint:'12² = 12 × 12.',
    explanation:'12 × 12 = <b>144</b>.' }),

  makeMCQ({ id:'S10', chapterId:'square_nums', difficulty:1,
    question:'Which list shows <b>only</b> square numbers?',
    options:['1, 4, 8, 16','4, 9, 16, 25','9, 18, 27, 36','1, 3, 6, 10'],
    answer:'4, 9, 16, 25',
    hint:'Square numbers: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100… Check each option.',
    explanation:'4=2², 9=3², 16=4², 25=5². All square numbers. Answer: <b>4, 9, 16, 25</b>.' }),

  makeNum({ id:'S11', chapterId:'square_nums', difficulty:2,
    question:'What is the <b>next number</b> in: 80, 40, 20, 10, ___?',
    answer:'5',
    hint:'Each term is divided by 2. 10 ÷ 2 = ?',
    explanation:'Divide by 2 each time: 80→40→20→10→<b>5</b>.' }),

  makeNum({ id:'S12', chapterId:'square_nums', difficulty:2,
    question:'Find the <b>missing number</b>: 3, 6, 12, ___, 48',
    answer:'24',
    hint:'Each term is multiplied by 2.',
    explanation:'Pattern is ×2: 3→6→12→<b>24</b>→48.' }),

  makeMCQ({ id:'S13', chapterId:'square_nums', difficulty:3,
    question:'What is the <b>missing term</b>? &nbsp; 2, 5, 10, 17, 26, ___',
    options:['34','35','36','37'],
    answer:'37',
    hint:'Find the differences: 3, 5, 7, 9, … (odd numbers increasing by 2). What comes after 9+2=11?',
    explanation:'Differences: +3,+5,+7,+9,+11. Next term: 26+11=<b>37</b>.' }),

  makeNum({ id:'S14', chapterId:'square_nums', difficulty:4,
    question:'A square tile has an area of <b>225 cm²</b>. What is the length of <b>one side</b>?',
    answer:'15', acceptableAnswers:['15','15cm','15 cm'],
    hint:'Find which square number equals 225. 15 × 15 = ?',
    explanation:'15 × 15 = 225. Side = <b>15 cm</b>.' }),

  // ════════════ GEOMETRY ════════════
  makeMCQ({ id:'G09', chapterId:'geometry', difficulty:1,
    question:'How many lines of symmetry does a <b>rectangle</b> have?',
    options:['0','1','2','4'],
    answer:'2',
    hint:'A rectangle has 2 pairs of equal sides. You can fold it along the horizontal midline or the vertical midline.',
    explanation:'A rectangle has <b>2</b> lines of symmetry (horizontal and vertical through the midpoints of opposite sides).' }),

  makeMCQ({ id:'G10', chapterId:'geometry', difficulty:1,
    question:'An angle less than 90° is called ___.',
    options:['Right angle','Obtuse angle','Acute angle','Reflex angle'],
    answer:'Acute angle',
    hint:'Acute means "sharp". A sharp angle is smaller than a right angle (90°).',
    explanation:'An angle less than 90° is called an <b>acute angle</b>.' }),

  makeMCQ({ id:'G11', chapterId:'geometry', difficulty:2,
    question:'You face <b>East</b> and turn <b>anticlockwise 90°</b>. Which direction do you face?',
    options:['North','South','West','North-East'],
    answer:'North',
    hint:'Anticlockwise from East: East → North → West → South. One 90° turn anticlockwise from East goes to North.',
    explanation:'90° anticlockwise from East = <b>North</b>.' }),

  makeMCQ({ id:'G12', chapterId:'geometry', difficulty:2,
    question:'A <b>kite</b> has:',
    options:['4 equal sides','2 pairs of equal adjacent sides','All angles equal','Opposite sides equal and parallel'],
    answer:'2 pairs of equal adjacent sides',
    hint:'A kite looks like a flying kite - it has two pairs of sides that are equal, but they are adjacent (next to each other), not opposite.',
    explanation:'A kite has <b>2 pairs of equal adjacent sides</b>. It is not a parallelogram.' }),

  makeNum({ id:'G13', chapterId:'geometry', difficulty:3,
    question:'A triangle has angles of <b>52°</b> and <b>63°</b>.<br>Find the <b>third angle</b>.',
    answer:'65', acceptableAnswers:['65','65°'],
    hint:'Angles in a triangle add up to 180°.',
    explanation:'Third angle = 180° − 52° − 63° = <b>65°</b>.' }),

  makeNum({ id:'G14', chapterId:'geometry', difficulty:3,
    question:'You face <b>South</b> and make a <b>half turn</b> (180°) clockwise.<br>Which direction do you now face?',
    answer:'North',
    hint:'A half turn (180°) from South goes all the way to the opposite direction.',
    explanation:'180° from South = <b>North</b>.' }),

  makeMCQ({ id:'G15', chapterId:'geometry', difficulty:4,
    question:'An isosceles triangle has a top angle of <b>40°</b>.<br>What is each <b>base angle</b>?',
    options:['60°','70°','80°','90°'],
    answer:'70°',
    hint:'An isosceles triangle has two equal base angles. Total = 180°. Base angles = (180° − 40°) ÷ 2.',
    explanation:'(180° − 40°) ÷ 2 = 140° ÷ 2 = <b>70°</b>.' }),

  makeNum({ id:'G16', chapterId:'geometry', difficulty:4,
    question:'A shape has <b>5 sides</b> and one line of symmetry.<br>What type of shape is it?',
    answer:'pentagon',
    hint:'A 5-sided shape is a pentagon. If it has only one line of symmetry, it is an irregular or asymmetric pentagon.',
    explanation:'A 5-sided shape is a <b>pentagon</b>.' }),

  // ════════════ FRACTIONS ════════════
  makeMCQ({ id:'FR09', chapterId:'fractions', difficulty:1,
    question:'Which fraction is <b>equivalent</b> to <b>2/3</b>?',
    options:['4/9','6/9','3/6','5/9'],
    answer:'6/9',
    hint:'To find equivalent fractions, multiply (or divide) both numerator and denominator by the same number. 2/3 = 2×3/3×3 = 6/9.',
    explanation:'2/3 = (2×3)/(3×3) = <b>6/9</b>.' }),

  makeMCQ({ id:'FR10', chapterId:'fractions', difficulty:1,
    question:'What is <b>1/2</b> of <b>48</b>?',
    options:['12','24','36','48'],
    answer:'24',
    hint:'½ of a number means divide it by 2.',
    explanation:'48 ÷ 2 = <b>24</b>.' }),

  makeNum({ id:'FR11', chapterId:'fractions', difficulty:2,
    question:'Calculate: <b>1/2 + 1/3</b><br><i>(Give as fraction e.g. 5/6)</i>',
    answer:'5/6',
    hint:'LCD of 2 and 3 is 6. 1/2 = 3/6 and 1/3 = 2/6.',
    explanation:'3/6 + 2/6 = <b>5/6</b>.' }),

  makeNum({ id:'FR12', chapterId:'fractions', difficulty:2,
    question:'Convert <b>19/4</b> to a mixed number. <i>(e.g. 4and3/4)</i>',
    answer:'4and3/4', acceptableAnswers:['4and3/4','4 3/4','4 and 3/4'],
    hint:'Divide: 19 ÷ 4 = 4 remainder 3. So 19/4 = 4 whole and 3/4.',
    explanation:'19 ÷ 4 = 4 remainder 3. So 19/4 = <b>4 and 3/4</b>.' }),

  makeNum({ id:'FR13', chapterId:'fractions', difficulty:3,
    question:'Calculate: <b>5/6 − 1/4</b><br><i>(Give as fraction e.g. 7/12)</i>',
    answer:'7/12',
    hint:'LCD of 6 and 4 is 12. 5/6 = 10/12 and 1/4 = 3/12.',
    explanation:'10/12 − 3/12 = <b>7/12</b>.' }),

  makeNum({ id:'FR14', chapterId:'fractions', difficulty:3,
    question:'Calculate: <b>3/4 × 60</b>',
    answer:'45',
    hint:'First ÷ 4 (to get 1/4), then × 3 (to get 3/4). 60 ÷ 4 = 15, then 15 × 3.',
    explanation:'60 ÷ 4 = 15. 15 × 3 = <b>45</b>.' }),

  makeNum({ id:'FR15', chapterId:'fractions', difficulty:4,
    question:'A pizza is cut into <b>8 slices</b>. Ali eats <b>3/8</b> and his sister eats <b>2/8</b>.<br>What <b>fraction</b> of the pizza is <b>left</b>?',
    answer:'3/8',
    hint:'Total eaten = 3/8 + 2/8. Left = 1 whole − total eaten = 8/8 − total.',
    explanation:'Eaten = 3/8 + 2/8 = 5/8. Left = 8/8 − 5/8 = <b>3/8</b>.' }),

  makeNum({ id:'FR16', chapterId:'fractions', difficulty:4,
    question:'Meera has <b>Rs 360</b>. She spends <b>5/9</b> of it at the market.<br>How much does she <b>spend</b>?',
    answer:'200', acceptableAnswers:['200','Rs 200'],
    hint:'Find 5/9 of 360. Divide 360 by 9 first, then multiply by 5.',
    explanation:'360 ÷ 9 = 40 (that is 1/9). 40 × 5 = <b>Rs 200</b>.' }),

  // ════════════ DECIMALS ════════════
  makeNum({ id:'D08', chapterId:'decimals', difficulty:1,
    question:'What is <b>0.3</b> as a fraction? <i>(e.g. 3/10)</i>',
    answer:'3/10',
    hint:'0.3 means 3 tenths.',
    explanation:'0.3 = <b>3/10</b> (three tenths).' }),

  makeNum({ id:'D09', chapterId:'decimals', difficulty:2,
    question:'Calculate: <b>12.75 + 8.60</b>',
    answer:'21.35',
    hint:'Line up the decimal points. 12.75 + 8.60 = ?',
    explanation:'12.75 + 8.60 = <b>21.35</b>.' }),

  makeNum({ id:'D10', chapterId:'decimals', difficulty:2,
    question:'Calculate: <b>20.00 − 7.45</b>',
    answer:'12.55',
    hint:'20.00 − 7.45. Borrow as needed.',
    explanation:'20.00 − 7.45 = <b>12.55</b>.' }),

  makeMCQ({ id:'D11', chapterId:'decimals', difficulty:3,
    question:'Which decimal is <b>between</b> 0.6 and 0.7?',
    options:['0.8','0.59','0.65','0.71'],
    answer:'0.65',
    hint:'Look for a number where the tenths digit is 6, and the hundredths gives it a value between 0.60 and 0.70.',
    explanation:'0.65 sits between 0.60 and 0.70. It is <b>0.65</b>.' }),

  makeNum({ id:'D12', chapterId:'decimals', difficulty:3,
    question:'Round <b>4.353</b> to 2 decimal places.',
    answer:'4.35',
    hint:'Look at the third decimal digit (3). Since 3 < 5, the second decimal digit stays the same.',
    explanation:'Third decimal = 3 < 5, so keep 5 unchanged: <b>4.35</b>.' }),

  makeNum({ id:'D13', chapterId:'decimals', difficulty:4,
    question:'A ribbon is <b>3.75 m</b> long. Priya cuts off <b>1.48 m</b>.<br>How much ribbon is <b>left</b>?',
    answer:'2.27', acceptableAnswers:['2.27','2.27m'],
    hint:'Subtract: 3.75 − 1.48.',
    explanation:'3.75 − 1.48 = <b>2.27 m</b>.' }),

  // ════════════ POWERS ════════════
  makeNum({ id:'P08', chapterId:'powers', difficulty:1,
    question:'Calculate: <b>4²</b>',
    answer:'16',
    hint:'4² = 4 × 4.',
    explanation:'4 × 4 = <b>16</b>.' }),

  makeNum({ id:'P09', chapterId:'powers', difficulty:2,
    question:'Calculate: <b>5² + 4²</b>',
    answer:'41',
    hint:'Calculate each power separately: 5²=25, 4²=16. Then add.',
    explanation:'5² = 25 and 4² = 16. 25 + 16 = <b>41</b>.' }),

  makeNum({ id:'P10', chapterId:'powers', difficulty:2,
    question:'Write <b>2 × 2 × 2 × 2</b> as a power.<br><i>(e.g. 2^4)</i>',
    answer:'2^4', acceptableAnswers:['2^4','2⁴'],
    hint:'Count how many times 2 is multiplied. The base is 2, the exponent is the count.',
    explanation:'2 appears 4 times, so 2 × 2 × 2 × 2 = <b>2⁴</b>.' }),

  makeMCQ({ id:'P11', chapterId:'powers', difficulty:3,
    question:'Calculate: <b>6² − 2³</b>',
    options:['22','26','28','36'],
    answer:'28',
    hint:'6² = 36 and 2³ = 8. Subtract.',
    explanation:'6² = 36 and 2³ = 8. 36 − 8 = <b>28</b>.' }),

  makeNum({ id:'P12', chapterId:'powers', difficulty:4,
    question:'A square field has side length <b>9 m</b>. Using power notation, its area = 9². Calculate the area.',
    answer:'81', acceptableAnswers:['81','81m2','81 m²'],
    hint:'Area of square = side². 9² = 9 × 9.',
    explanation:'9² = 9 × 9 = <b>81 m²</b>.' }),

  // ════════════ AVERAGE ════════════
  makeNum({ id:'A07', chapterId:'average', difficulty:1,
    question:'Find the average of: <b>10, 20, 30, 40, 50</b>',
    answer:'30',
    hint:'Add all 5 numbers, then divide by 5.',
    explanation:'(10+20+30+40+50) ÷ 5 = 150 ÷ 5 = <b>30</b>.' }),

  makeNum({ id:'A08', chapterId:'average', difficulty:2,
    question:'The average pocket money of 4 children is <b>Rs 80</b>.<br>What is the <b>total</b> pocket money?',
    answer:'320', acceptableAnswers:['320','Rs 320'],
    hint:'Total = average × number of children.',
    explanation:'80 × 4 = <b>Rs 320</b>.' }),

  makeNum({ id:'A09', chapterId:'average', difficulty:3,
    question:'Ahmad scored <b>72, 85, 91</b> in three tests.<br>What score must he get in the <b>4th test</b> for an average of <b>82</b>?',
    answer:'80',
    hint:'Step 1: Total needed = 82 × 4 = 328. Step 2: Already scored = 72+85+91 = 248. Step 3: 4th = 328 − 248.',
    explanation:'Target total = 82 × 4 = 328. Already = 72+85+91 = 248. 4th test = 328−248 = <b>80</b>.' }),

  makeNum({ id:'A10', chapterId:'average', difficulty:3,
    question:'The average of <b>6 numbers</b> is <b>45</b>. Five of them are 40, 50, 42, 48, 43.<br>Find the <b>sixth number</b>.',
    answer:'47',
    hint:'Total = 45 × 6 = 270. Add the 5 known numbers. Sixth = 270 − sum of known.',
    explanation:'Total = 45×6 = 270. Sum of 5 = 40+50+42+48+43 = 223. Sixth = 270−223 = <b>47</b>.' }),

  makeNum({ id:'A11', chapterId:'average', difficulty:4,
    question:'A car travels <b>120 km on Monday</b>, <b>85 km on Tuesday</b> and <b>145 km on Wednesday</b>.<br>What is the <b>average distance</b> per day?',
    answer:'116.67', acceptableAnswers:['116.67','116','117'],
    hint:'Add all three distances, then divide by 3.',
    explanation:'(120+85+145) ÷ 3 = 350 ÷ 3 ≈ <b>116.67 km</b> (or accept 116 or 117).' }),

  // ════════════ RATIO ════════════
  makeMCQ({ id:'R07', chapterId:'ratio', difficulty:1,
    question:'Express <b>15/25</b> as a ratio in its simplest form.',
    options:['15:25','5:3','3:5','1:5'],
    answer:'3:5',
    hint:'Divide both by HCF(15,25) = 5. 15÷5 = 3 and 25÷5 = 5.',
    explanation:'15:25 → 3:5 (dividing both by 5). Answer: <b>3:5</b>.' }),

  makeNum({ id:'R08', chapterId:'ratio', difficulty:2,
    question:'5 kg of onions cost <b>Rs 80</b>. How much will <b>8 kg</b> cost?',
    answer:'128', acceptableAnswers:['128','Rs 128'],
    hint:'Find cost of 1 kg first, then multiply by 8.',
    explanation:'1 kg = 80÷5 = Rs 16. 8 kg = 16×8 = <b>Rs 128</b>.' }),

  makeNum({ id:'R09', chapterId:'ratio', difficulty:2,
    question:'In a fruit basket, the ratio of mangoes to oranges is <b>5:3</b>. There are <b>24 oranges</b>.<br>How many <b>mangoes</b> are there?',
    answer:'40',
    hint:'3 parts = 24 oranges, so 1 part = 24 ÷ 3 = 8. Mangoes = 5 parts = 5 × 8.',
    explanation:'1 part = 24÷3 = 8. Mangoes = 5×8 = <b>40</b>.' }),

  makeNum({ id:'R10', chapterId:'ratio', difficulty:3,
    question:'A recipe needs flour and sugar in the ratio <b>4:1</b>. If you use <b>500 g of flour</b>, how much <b>sugar</b> do you need?',
    answer:'125', acceptableAnswers:['125','125g','125 g'],
    hint:'4 parts = 500 g, so 1 part = 500 ÷ 4. Sugar = 1 part.',
    explanation:'1 part = 500÷4 = 125 g. Sugar = <b>125 g</b>.' }),

  makeNum({ id:'R11', chapterId:'ratio', difficulty:4,
    question:'A prize of <b>Rs 630</b> is shared between Ali and Ben in the ratio <b>2:7</b>.<br>How much does <b>Ben</b> get?',
    answer:'490', acceptableAnswers:['490','Rs 490'],
    hint:'Total parts = 2+7 = 9. Ben\'s share = (7/9) × 630.',
    explanation:'1 part = 630÷9 = 70. Ben = 7×70 = <b>Rs 490</b>.' }),

  makeMCQ({ id:'R12', chapterId:'ratio', difficulty:3,
    question:'Which pair of quantities are in <b>direct proportion</b>?',
    options:['Speed and time (fixed distance)','Sides of square and its area','Number of workers and time to finish a job','Number of pencils bought and cost'],
    answer:'Number of pencils bought and cost',
    hint:'Direct proportion means as one increases, the other increases by the same factor. More pencils = more cost.',
    explanation:'More pencils → more cost (by the same factor). This is <b>direct proportion</b>.' }),

  // ════════════ LENGTH ════════════
  makeNum({ id:'L07', chapterId:'length', difficulty:1,
    question:'Convert <b>75 mm</b> to centimetres.',
    answer:'7.5', acceptableAnswers:['7.5','7.5cm','7cm5mm'],
    hint:'10 mm = 1 cm. Divide by 10.',
    explanation:'75 ÷ 10 = <b>7.5 cm</b>.' }),

  makeNum({ id:'L08', chapterId:'length', difficulty:2,
    question:'Calculate: <b>5 m 40 cm + 2 m 75 cm</b><br><i>(e.g. 8m15cm)</i>',
    answer:'8m15cm', acceptableAnswers:['8m15cm','8 m 15 cm'],
    hint:'Add cm: 40+75=115 cm = 1 m 15 cm. Carry 1 m. 5+2+1 = 8 m.',
    explanation:'40+75=115 cm = 1 m 15 cm. 5+2+1 = 8 m. Total = <b>8 m 15 cm</b>.' }),

  makeNum({ id:'L09', chapterId:'length', difficulty:3,
    question:'An equilateral triangle has a perimeter of <b>51 cm</b>.<br>Find the length of <b>one side</b>.',
    answer:'17', acceptableAnswers:['17','17cm','17 cm'],
    hint:'An equilateral triangle has 3 equal sides. Side = Perimeter ÷ 3.',
    explanation:'51 ÷ 3 = <b>17 cm</b>.' }),

  makeNum({ id:'L10', chapterId:'length', difficulty:4,
    question:'A fencing company charges <b>Rs 120 per metre</b>.<br>A rectangular field is <b>25 m × 18 m</b>. What is the <b>total cost</b> to fence the entire field?',
    answer:'10320', acceptableAnswers:['10320','Rs 10320','Rs 10,320'],
    hint:'Step 1: Find the perimeter of the field. Step 2: Multiply by cost per metre.',
    explanation:'Perimeter = 2(25+18) = 2×43 = 86 m. Cost = 86×120 = <b>Rs 10,320</b>.' }),

  // ════════════ AREA ════════════
  makeNum({ id:'AR07', chapterId:'area', difficulty:1,
    question:'Find the area of a rectangle with length <b>12 m</b> and width <b>7 m</b>.',
    answer:'84', acceptableAnswers:['84','84m2','84 m²'],
    hint:'Area = length × width.',
    explanation:'12 × 7 = <b>84 m²</b>.' }),

  makeNum({ id:'AR08', chapterId:'area', difficulty:2,
    question:'A square carpet has an area of <b>196 cm²</b>. Find the length of <b>one side</b>.',
    answer:'14', acceptableAnswers:['14','14cm','14 cm'],
    hint:'Find which number × itself = 196. Try 14 × 14.',
    explanation:'14 × 14 = 196. Side = <b>14 cm</b>.' }),

  makeNum({ id:'AR09', chapterId:'area', difficulty:3,
    question:'A right-angled triangle has a base of <b>14 cm</b> and a height of <b>9 cm</b>.<br>Find its <b>area</b>.',
    answer:'63', acceptableAnswers:['63','63cm2','63 cm²'],
    hint:'Area of triangle = (base × height) ÷ 2.',
    explanation:'(14 × 9) ÷ 2 = 126 ÷ 2 = <b>63 cm²</b>.' }),

  makeNum({ id:'AR10', chapterId:'area', difficulty:4,
    question:'A rectangular room is <b>9 m × 6 m</b>. Tiles cost <b>Rs 150 per m²</b>.<br>Find the <b>total cost</b> to tile the floor.',
    answer:'8100', acceptableAnswers:['8100','Rs 8100','Rs 8,100'],
    hint:'Step 1: Area = 9 × 6. Step 2: Cost = Area × 150.',
    explanation:'Area = 9×6 = 54 m². Cost = 54×150 = <b>Rs 8,100</b>.' }),

  // ════════════ CAPACITY ════════════
  makeNum({ id:'C06', chapterId:'capacity', difficulty:1,
    question:'Complete: <b>1 L = ___ cL</b>',
    answer:'100',
    hint:'cL = centilitre. There are 100 centilitres in 1 litre.',
    explanation:'<b>1 L = 100 cL</b>.' }),

  makeNum({ id:'C07', chapterId:'capacity', difficulty:2,
    question:'Convert <b>3 L 250 mL</b> to millilitres.',
    answer:'3250', acceptableAnswers:['3250','3250mL','3250 mL'],
    hint:'1 L = 1000 mL. So 3 L = 3000 mL. Add 250 mL.',
    explanation:'3000 + 250 = <b>3,250 mL</b>.' }),

  makeNum({ id:'C08', chapterId:'capacity', difficulty:3,
    question:'A recipe requires <b>750 mL</b> of milk. How many <b>full cups</b> of 200 mL each are needed?',
    answer:'4',
    hint:'Divide total needed by cup size: 750 ÷ 200 = 3.75. You need to round UP to fill the recipe.',
    explanation:'750 ÷ 200 = 3.75, so you need <b>4</b> cups (3 cups give 600 mL which is not enough).' }),

  makeNum({ id:'C09', chapterId:'capacity', difficulty:4,
    question:'A shop sells juice in bottles of <b>1 L 500 mL</b> each. How much juice is in <b>6 bottles</b>?',
    answer:'9L', acceptableAnswers:['9L','9 L','9000mL','9000 mL'],
    hint:'Multiply: 1 L 500 mL × 6. mL: 500×6=3000=3L. L: 1×6=6L. Total: 6+3=9L.',
    explanation:'1500 mL × 6 = 9,000 mL = <b>9 L</b>.' }),

  // ════════════ MASS ════════════
  makeNum({ id:'M06', chapterId:'mass', difficulty:1,
    question:'Convert <b>5,750 g</b> to kilograms and grams.<br><i>(e.g. 5kg750g)</i>',
    answer:'5kg750g', acceptableAnswers:['5kg750g','5 kg 750 g'],
    hint:'1000 g = 1 kg. 5750 ÷ 1000 = 5 kg remainder 750 g.',
    explanation:'5750 g = 5000 g + 750 g = <b>5 kg 750 g</b>.' }),

  makeNum({ id:'M07', chapterId:'mass', difficulty:2,
    question:'Calculate: <b>8 kg 200 g − 3 kg 750 g</b><br><i>(e.g. 4kg450g)</i>',
    answer:'4kg450g', acceptableAnswers:['4kg450g','4 kg 450 g','4450g'],
    hint:'200g < 750g so borrow 1kg(=1000g): 1200g − 750g = 450g. 8−1−3=4kg.',
    explanation:'Borrow: 1,200g − 750g = 450g. kg: 8−1−3 = 4 kg. Total = <b>4 kg 450 g</b>.' }),

  makeNum({ id:'M08', chapterId:'mass', difficulty:3,
    question:'A lorry carries <b>7 bags of cement</b> each weighing <b>3 kg 500 g</b>.<br>What is the <b>total mass</b>?',
    answer:'24kg500g', acceptableAnswers:['24kg500g','24 kg 500 g','24500g'],
    hint:'Multiply: 3 kg 500 g × 7. g: 500×7=3500g=3kg500g. kg: 3×7=21+3=24kg.',
    explanation:'500g×7=3500g=3kg500g. kg: 3×7=21+3=24kg. Total = <b>24 kg 500 g</b>.' }),

  makeNum({ id:'M09', chapterId:'mass', difficulty:4,
    question:'A box of chocolates weighs <b>2 kg 400 g</b>. The empty box weighs <b>350 g</b>.<br>What is the mass of the <b>chocolates alone</b>?',
    answer:'2kg50g', acceptableAnswers:['2kg50g','2 kg 50 g','2050g'],
    hint:'Mass of chocolates = Total mass − empty box. 2400g − 350g.',
    explanation:'2400 − 350 = 2050 g = <b>2 kg 50 g</b>.' }),

  // ════════════ MONEY ════════════
  makeNum({ id:'MO08', chapterId:'money', difficulty:1,
    question:'Convert <b>Rs 4.75</b> into cents.',
    answer:'475', acceptableAnswers:['475','475c','475 c'],
    hint:'Rs 1 = 100 cents. Rs 4 = 400 c. Add 75 c.',
    explanation:'Rs 4.75 = 400c + 75c = <b>475 c</b>.' }),

  makeNum({ id:'MO09', chapterId:'money', difficulty:2,
    question:'A pair of shoes costs <b>Rs 850</b>. During a sale it is sold for <b>Rs 680</b>.<br>What is the <b>discount</b>?',
    answer:'170', acceptableAnswers:['170','Rs 170'],
    hint:'Discount = Original price − Sale price.',
    explanation:'850 − 680 = <b>Rs 170</b> discount.' }),

  makeNum({ id:'MO10', chapterId:'money', difficulty:2,
    question:'A shopkeeper bought items for <b>Rs 3,200</b>. He sold them for <b>Rs 4,150</b>.<br>Calculate his <b>profit</b>.',
    answer:'950', acceptableAnswers:['950','Rs 950'],
    hint:'Profit = Selling Price − Buying Price.',
    explanation:'4150 − 3200 = <b>Rs 950</b>.' }),

  makeNum({ id:'MO11', chapterId:'money', difficulty:3,
    question:'A trader sold an item at <b>Rs 580</b> making a <b>loss of Rs 120</b>.<br>What was his <b>buying price</b>?',
    answer:'700', acceptableAnswers:['700','Rs 700'],
    hint:'Buying Price = Selling Price + Loss (when there is a loss).',
    explanation:'BP = SP + Loss = 580 + 120 = <b>Rs 700</b>.' }),

  makeNum({ id:'MO12', chapterId:'money', difficulty:4,
    question:'Adam bought 6 items at <b>Rs 45 each</b> and sold all 6 at <b>Rs 38 each</b>.<br>Find his <b>total loss</b>.',
    answer:'42', acceptableAnswers:['42','Rs 42'],
    hint:'Loss per item = BP − SP = 45−38. Total loss = 7 × 6.',
    explanation:'Loss per item = 45−38 = Rs 7. Total loss = 7×6 = <b>Rs 42</b>.' }),

  makeNum({ id:'MO13', chapterId:'money', difficulty:4,
    question:'A market stall earns <b>Rs 2,850</b> total from selling <b>30 kg</b> of tomatoes.<br>What is the selling price <b>per kg</b>?',
    answer:'95', acceptableAnswers:['95','Rs 95'],
    hint:'Price per kg = Total earnings ÷ Number of kg.',
    explanation:'2850 ÷ 30 = <b>Rs 95</b> per kg.' }),

  // ════════════ TIME ════════════
  makeNum({ id:'T07', chapterId:'time', difficulty:1,
    question:'Complete: <b>1 minute = ___ seconds</b>',
    answer:'60',
    hint:'There are 60 seconds in every minute.',
    explanation:'<b>1 minute = 60 seconds</b>.' }),

  makeNum({ id:'T08', chapterId:'time', difficulty:2,
    question:'Convert <b>2 h 45 min</b> to minutes.',
    answer:'165', acceptableAnswers:['165','165 min'],
    hint:'2 h = 2×60 = 120 min. Add 45 min.',
    explanation:'120 + 45 = <b>165 minutes</b>.' }),

  makeNum({ id:'T09', chapterId:'time', difficulty:2,
    question:'Calculate: <b>5 h 20 min − 2 h 50 min</b><br><i>(e.g. 2h30min)</i>',
    answer:'2h30min', acceptableAnswers:['2h30min','2 h 30 min'],
    hint:'20 min < 50 min, so borrow 1 h = 60 min. 20+60=80 min. 80−50=30 min. h: 5−1−2=2h.',
    explanation:'Borrow: 80−50=30 min. 5−1−2=2h. Total = <b>2 h 30 min</b>.' }),

  makeNum({ id:'T10', chapterId:'time', difficulty:3,
    question:'A film starts at <b>7:45 pm</b> and lasts <b>2 h 15 min</b>.<br>At what time does it <b>end</b>?',
    answer:'10:00pm', acceptableAnswers:['10:00pm','10pm','22:00','10:00 pm'],
    hint:'Add 2h to 7:45 → 9:45 pm. Then add 15 min → 10:00 pm.',
    explanation:'7:45 + 2h = 9:45 pm. 9:45 + 15 min = <b>10:00 pm</b>.' }),

  makeNum({ id:'T11', chapterId:'time', difficulty:3,
    question:'Convert <b>315 seconds</b> to minutes and seconds.<br><i>(e.g. 5min15s)</i>',
    answer:'5min15s', acceptableAnswers:['5min15s','5 min 15 s','5m15s'],
    hint:'315 ÷ 60 = 5 remainder 15.',
    explanation:'315 ÷ 60 = 5 min remainder 15 s = <b>5 min 15 s</b>.' }),

  makeNum({ id:'T12', chapterId:'time', difficulty:4,
    question:'A train leaves station A at <b>9:55 am</b> and arrives at station B at <b>1:30 pm</b>.<br>How long was the <b>journey</b>?<br><i>(e.g. 3h35min)</i>',
    answer:'3h35min', acceptableAnswers:['3h35min','3 h 35 min'],
    hint:'From 9:55 to 1:30. 9:55 → 13:30. 13:30 − 9:55: 30−55 borrow → 90−55=35 min. 13−1−9=3h.',
    explanation:'13:30 − 9:55 = <b>3 h 35 min</b>.' }),

  // ════════════ GRAPHS ════════════
  makeMCQ({ id:'GR06', chapterId:'graphs', difficulty:1,
    question:'In a pictogram, <b>1 symbol = 10 pupils</b>.<br>If there are <b>4.5 symbols</b>, how many pupils does it represent?',
    options:['40','45','50','4.5'],
    answer:'45',
    hint:'4.5 × 10 = 45. Half a symbol = 5 pupils.',
    explanation:'4.5 × 10 = <b>45 pupils</b>.' }),

  makeMCQ({ id:'GR07', chapterId:'graphs', difficulty:2,
    question:'A bar chart shows: Mon=50, Tue=35, Wed=45, Thu=30.<br>On which day were the <b>fewest</b> items sold?',
    options:['Monday','Tuesday','Wednesday','Thursday'],
    answer:'Thursday',
    hint:'Look for the smallest bar value.',
    explanation:'Thursday has the smallest value (30). Answer: <b>Thursday</b>.' }),

  makeNum({ id:'GR08', chapterId:'graphs', difficulty:3,
    question:'A pictogram shows fruit preferences.<br>Apple: 6 symbols, Banana: 4 symbols, Mango: 3 symbols. Key: 1 symbol = 5 children.<br>How many children were surveyed in <b>total</b>?',
    answer:'65',
    hint:'Total symbols = 6+4+3 = 13. Total children = 13 × 5.',
    explanation:'13 × 5 = <b>65 children</b>.' }),

  makeNum({ id:'GR09', chapterId:'graphs', difficulty:3,
    question:'A bar chart shows weekly savings: Mon=Rs20, Tue=Rs35, Wed=Rs15, Thu=Rs40, Fri=Rs25.<br>What is the <b>average</b> daily saving?',
    answer:'27', acceptableAnswers:['27','Rs 27'],
    hint:'Average = total ÷ number of days. Total = 20+35+15+40+25.',
    explanation:'Total = 135. Average = 135÷5 = <b>Rs 27</b>.' }),

  makeMCQ({ id:'GR10', chapterId:'graphs', difficulty:4,
    question:'In a pictogram, 1 symbol = 4 books.<br>Class A has 6 symbols, Class B has 4.5 symbols, Class C has 5 symbols.<br>How many MORE books does Class A have than Class C?',
    options:['2','4','6','8'],
    answer:'4',
    hint:'Class A = 6×4=24. Class C = 5×4=20. Difference = 24−20.',
    explanation:'A = 24 books, C = 20 books. 24−20 = <b>4 more books</b>.' }),
];

// Push all extras into the main array
EXTRA.forEach(q => STATIC_QUESTIONS.push(q));

// ── EXTRA DYNAMIC GENERATORS ──────────────────
// These extend the existing GENERATORS object

Object.assign(GENERATORS, {

  geometry: (level) => {
    if (level <= 2) {
      const a = rnd(30, 70), b = rnd(20, 50);
      const c = 180 - a - b;
      return makeNum({
        id:`GG${Date.now()}`, chapterId:'geometry', difficulty:level,
        question:`A triangle has two angles of <b>${a}°</b> and <b>${b}°</b>.<br>Find the <b>third angle</b>.`,
        answer: String(c), acceptableAnswers:[String(c), c+'°'],
        hint:'All three angles in a triangle add up to 180°.',
        explanation:`180° − ${a}° − ${b}° = <b>${c}°</b>.`
      });
    }
    if (level === 3) {
      // Isosceles triangle - find the base angles given top angle
      const top = rnd(20, 80);
      const base = (180 - top) / 2;
      return makeNum({
        id:`GG${Date.now()}`, chapterId:'geometry', difficulty:level,
        question:`An isosceles triangle has a top angle of <b>${top}°</b>.<br>The two base angles are equal.<br>Find each <b>base angle</b>.`,
        answer: String(base), acceptableAnswers:[String(base), base+'°'],
        hint:`Total angles = 180°. Base angles together = 180° − ${top}°. Divide by 2.`,
        explanation:`(180° − ${top}°) ÷ 2 = ${180-top}° ÷ 2 = <b>${base}°</b>.`
      });
    }
    // L4 - compass direction word problem
    const dirs = ['North','East','South','West'];
    const startIdx = rnd(0, 3);
    const cw = Math.random() > 0.5;
    const turns90 = rnd(1, 3);
    const endIdx = (startIdx + (cw ? turns90 : 4 - turns90)) % 4;
    const startDir = dirs[startIdx];
    const endDir = dirs[endIdx];
    const turnDesc = `${cw ? 'clockwise' : 'anticlockwise'} ${turns90 * 90}°`;
    const wrongOpts = dirs.filter(d => d !== endDir).slice(0, 3);
    return makeMCQ({
      id:`GG${Date.now()}`, chapterId:'geometry', difficulty:level,
      question:`Ravi faces <b>${startDir}</b> and turns <b>${turnDesc}</b>.<br>Which direction does he now face?`,
      options:[endDir, ...wrongOpts],
      answer: endDir,
      hint:`Clockwise order: North → East → South → West → North. Each 90° = one step.`,
      explanation:`From ${startDir}, ${turnDesc} → <b>${endDir}</b>.`
    });
  },

  length: (level) => {
    if (level <= 2) {
      const l = rnd(4, 30), w = rnd(2, 20);
      const P = 2 * (l + w);
      return makeNum({
        id:`GL${Date.now()}`, chapterId:'length', difficulty:level,
        question:`Find the <b>perimeter</b> of a rectangle with length <b>${l} cm</b> and width <b>${w} cm</b>.`,
        answer: String(P), acceptableAnswers:[String(P), P+'cm', P+' cm'],
        hint:'P = 2 × (length + width).',
        explanation:`P = 2 × (${l} + ${w}) = 2 × ${l+w} = <b>${P} cm</b>.`
      });
    }
    if (level === 3) {
      // Find missing side given perimeter
      const l = rnd(8, 30), w = rnd(4, 20);
      const P = 2 * (l + w);
      return makeNum({
        id:`GL${Date.now()}`, chapterId:'length', difficulty:level,
        question:`A rectangle has a perimeter of <b>${P} cm</b> and a length of <b>${l} cm</b>.<br>Find its <b>width</b>.`,
        answer: String(w), acceptableAnswers:[String(w), w+'cm'],
        hint:`P = 2(l + w). So l + w = P ÷ 2. Width = (P ÷ 2) − length.`,
        explanation:`l + w = ${P} ÷ 2 = ${P/2}. Width = ${P/2} − ${l} = <b>${w} cm</b>.`
      });
    }
    // L4 - fencing cost word problem
    const l = rnd(10, 40), w = rnd(5, 25);
    const P = 2 * (l + w);
    const costPerM = rnd(50, 200);
    const total = P * costPerM;
    return makeNum({
      id:`GL${Date.now()}`, chapterId:'length', difficulty:level,
      question:`A rectangular garden is <b>${l} m long</b> and <b>${w} m wide</b>.<br>Fencing costs <b>Rs ${costPerM} per metre</b>.<br>Find the <b>total cost</b> to fence the entire garden.`,
      answer: String(total), acceptableAnswers:[String(total), 'Rs '+total],
      hint:`Step 1: Perimeter = 2(${l} + ${w}). Step 2: Cost = perimeter × Rs ${costPerM}.`,
      explanation:`P = 2 × ${l+w} = ${P} m. Cost = ${P} × ${costPerM} = <b>Rs ${total}</b>.`
    });
  },

  time: (level) => {
    if (level <= 2) {
      const h = rnd(1, 5), m = rnd(5, 55);
      const totalMins = h * 60 + m;
      return makeNum({
        id:`GT${Date.now()}`, chapterId:'time', difficulty:level,
        question:`Convert <b>${h} h ${m} min</b> to minutes.`,
        answer: String(totalMins), acceptableAnswers:[String(totalMins), totalMins+' min'],
        hint:`1 h = 60 min. Multiply ${h} × 60, then add ${m}.`,
        explanation:`${h} × 60 + ${m} = <b>${totalMins} min</b>.`
      });
    }
    if (level === 3) {
      // Journey: start time + duration → end time
      const startH = rnd(7, 20), startM = [0,15,30,45][rnd(0,3)];
      const durH = rnd(1, 4), durM = [0,15,30,45][rnd(0,3)];
      let endM = startM + durM, carry = 0;
      if (endM >= 60) { endM -= 60; carry = 1; }
      let endH = (startH + durH + carry) % 24;
      const fmt2 = (h, m) => `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
      const startStr = fmt2(startH, startM);
      const endStr = fmt2(endH, endM);
      const durStr = durM > 0 ? `${durH} h ${durM} min` : `${durH} h`;
      return makeNum({
        id:`GT${Date.now()}`, chapterId:'time', difficulty:level,
        question:`A bus departs at <b>${startStr}</b> and the journey takes <b>${durStr}</b>.<br>At what time does it arrive? <i>(24-hour format, e.g. 14:30)</i>`,
        answer: endStr, acceptableAnswers:[endStr],
        hint:`Add ${durH} hours to ${startH}: get ${startH+durH}h. Then add ${durM} minutes to ${startM} min.`,
        explanation:`${startStr} + ${durStr} = <b>${endStr}</b>.`
      });
    }
    // L4 - find duration between two times (word problem)
    const startH = rnd(7, 12), startM = [0,15,30,45][rnd(0,3)];
    const durH = rnd(1, 5), durM = [0,15,30,45][rnd(0,3)];
    let endM = startM + durM, carry = 0;
    if (endM >= 60) { endM -= 60; carry = 1; }
    const endH = startH + durH + carry;
    const fmt2 = (h, m) => `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
    const startStr = fmt2(startH, startM);
    const endStr = fmt2(endH, endM);
    const ansStr = durM > 0 ? `${durH}h${durM}min` : `${durH}h`;
    const altStr = durM > 0 ? `${durH} h ${durM} min` : `${durH} h`;
    return makeNum({
      id:`GT${Date.now()}`, chapterId:'time', difficulty:level,
      question:`A school event starts at <b>${startStr}</b> and ends at <b>${endStr}</b>.<br>How long does the event last? <i>(e.g. 2h30min)</i>`,
      answer: ansStr, acceptableAnswers:[ansStr, altStr],
      hint:`Subtract start time from end time. End: ${endStr}, Start: ${startStr}.`,
      explanation:`${endStr} − ${startStr} = <b>${altStr}</b>.`
    });
  },

  ratio: (level) => {
    const a = rnd(2, 7), b = rnd(2, 7);
    const factor = rnd(3, 12);
    const actualTotal = factor * (a + b);
    const partA = factor * a;

    if (level <= 2) {
      // Direct proportion - price per unit
      const qty1 = rnd(2, 8), price1 = rnd(10, 60);
      const qty2 = rnd(3, 15);
      const price2 = (price1 / qty1) * qty2;
      if (!Number.isInteger(price2)) {
        // fallback to sharing
        return makeNum({
          id:`GR${Date.now()}`, chapterId:'ratio', difficulty:level,
          question:`Share <b>Rs ${actualTotal}</b> in the ratio <b>${a}:${b}</b>.<br>How much is the <b>first share</b>?`,
          answer: String(partA), acceptableAnswers:[String(partA),'Rs '+partA],
          hint:`Total parts = ${a+b}. One part = ${actualTotal}÷${a+b} = ${factor}.`,
          explanation:`1 part = ${factor}. First share = ${a}×${factor} = <b>Rs ${partA}</b>.`
        });
      }
      return makeNum({
        id:`GR${Date.now()}`, chapterId:'ratio', difficulty:level,
        question:`If <b>${qty1} pens cost Rs ${price1}</b>, how much do <b>${qty2} pens</b> cost?`,
        answer: String(price2), acceptableAnswers:[String(price2),'Rs '+price2],
        hint:`Cost of 1 pen = ${price1} ÷ ${qty1}. Then multiply by ${qty2}.`,
        explanation:`1 pen = Rs ${price1/qty1}. ${qty2} pens = ${price1/qty1} × ${qty2} = <b>Rs ${price2}</b>.`
      });
    }
    if (level === 3) {
      // Given one part, find the other
      return makeNum({
        id:`GR${Date.now()}`, chapterId:'ratio', difficulty:level,
        question:`Flour and sugar are mixed in the ratio <b>${a}:${b}</b>.<br>If there is <b>${partA} g of flour</b>, how many grams of <b>sugar</b> are used?`,
        answer: String(factor * b), acceptableAnswers:[String(factor*b), (factor*b)+'g'],
        hint:`${a} parts = ${partA} g → 1 part = ${partA}÷${a} = ${factor} g. Sugar = ${b} parts.`,
        explanation:`1 part = ${partA} ÷ ${a} = ${factor} g. Sugar = ${b} × ${factor} = <b>${factor*b} g</b>.`
      });
    }
    // L4 - full sharing word problem
    const prize = actualTotal * rnd(2, 5);
    const fac2 = prize / (a + b);
    if (!Number.isInteger(fac2)) {
      return makeNum({
        id:`GR${Date.now()}`, chapterId:'ratio', difficulty:level,
        question:`Ali and Bina share <b>Rs ${actualTotal}</b> in the ratio <b>${a}:${b}</b>.<br>How much more does <b>${a > b ? 'Ali' : 'Bina'}</b> receive than the other?`,
        answer: String(Math.abs(partA - factor*b)), acceptableAnswers:[String(Math.abs(partA-factor*b))],
        hint:`Calculate both shares first, then find the difference.`,
        explanation:`Ali = Rs ${partA}, Bina = Rs ${factor*b}. Difference = Rs ${Math.abs(partA-factor*b)}.`
      });
    }
    const shareA = fac2 * a, shareB = fac2 * b;
    return makeNum({
      id:`GR${Date.now()}`, chapterId:'ratio', difficulty:level,
      question:`A prize of <b>Rs ${prize}</b> is shared between two students in the ratio <b>${a}:${b}</b>.<br>The student with the <b>larger share</b> buys a book for <b>Rs ${Math.floor(Math.max(shareA,shareB)/3)}</b>.<br>How much does she have <b>left</b>?`,
      answer: String(Math.max(shareA,shareB) - Math.floor(Math.max(shareA,shareB)/3)),
      acceptableAnswers:[String(Math.max(shareA,shareB) - Math.floor(Math.max(shareA,shareB)/3))],
      hint:`Step 1: Find the larger share (${a>b?a:b} parts × one part value). Step 2: Subtract the book cost.`,
      explanation:`Larger share = Rs ${Math.max(shareA,shareB)}. After book = ${Math.max(shareA,shareB)} − ${Math.floor(Math.max(shareA,shareB)/3)} = <b>Rs ${Math.max(shareA,shareB)-Math.floor(Math.max(shareA,shareB)/3)}</b>.`
    });
  },

  square_nums: (level) => {
    const n = level <= 2 ? rnd(2, 9) : rnd(5, 13);
    const sq = n * n;
    if (level <= 2) {
      return Math.random() > 0.5
        ? makeNum({ id:`GS${Date.now()}`, chapterId:'square_nums', difficulty:level,
            question:`Calculate: <b>${n}²</b>`, answer: String(sq), acceptableAnswers:[String(sq)],
            hint:`${n}² = ${n} × ${n}.`, explanation:`${n} × ${n} = <b>${sq}</b>.` })
        : makeNum({ id:`GS${Date.now()}`, chapterId:'square_nums', difficulty:level,
            question:`What is the <b>square root</b> of <b>${sq}</b>?`, answer: String(n), acceptableAnswers:[String(n)],
            hint:`Which number × itself = ${sq}?`, explanation:`${n} × ${n} = ${sq}, so √${sq} = <b>${n}</b>.` });
    }
    if (level === 3) {
      // Number pattern - find next term
      const start = rnd(2, 6), step = rnd(2, 4);
      const seq = [start, start*step, start*step*step, start*step*step*step];
      const next = seq[3] * step;
      return makeNum({
        id:`GS${Date.now()}`, chapterId:'square_nums', difficulty:level,
        question:`What is the <b>next number</b> in the pattern?<br><b>${seq.join(', ')}, ___</b>`,
        answer: String(next), acceptableAnswers:[String(next)],
        hint:`Find the rule: each term is multiplied by ${step}.`,
        explanation:`Rule: ×${step} each time. ${seq[3]} × ${step} = <b>${next}</b>.`
      });
    }
    // L4 - square area word problem
    return makeNum({
      id:`GS${Date.now()}`, chapterId:'square_nums', difficulty:level,
      question:`A square room has an area of <b>${sq} m²</b>.<br>A tile is <b>1 m × 1 m</b>. How many tiles are needed to cover the floor?<br><i>Hint: first find the side length.</i>`,
      answer: String(sq), acceptableAnswers:[String(sq)],
      hint:`Side = √${sq} = ${n} m. Area = ${n} × ${n} = ${sq} m². Each tile = 1 m², so tiles needed = area.`,
      explanation:`Side = ${n} m. Floor area = ${n}² = <b>${sq} tiles</b>.`
    });
  },

  decimals: (level) => {
    if (level <= 2) {
      const a = (rnd(100, 999) / 100).toFixed(2);
      const b = (rnd(10, 500) / 100).toFixed(2);
      const op = Math.random() > 0.5 ? '+' : '-';
      const fa = parseFloat(a), fb = parseFloat(b);
      const [big, small] = fa >= fb ? [fa, fb] : [fb, fa];
      const result = op === '+' ? (big + small).toFixed(2) : (big - small).toFixed(2);
      return makeNum({
        id:`GD${Date.now()}`, chapterId:'decimals', difficulty:level,
        question:`Calculate: <b>${op === '+' ? a : big.toFixed(2)} ${op} ${op === '+' ? b : small.toFixed(2)}</b>`,
        answer: result, acceptableAnswers:[result, String(parseFloat(result))],
        hint:'Line up the decimal points and work column by column.',
        explanation:`= <b>${result}</b>.`
      });
    }
    if (level === 3) {
      // Multiply decimal by whole number
      const base = (rnd(10, 99) / 10).toFixed(1);
      const times = rnd(2, 9);
      const result = (parseFloat(base) * times).toFixed(1);
      return makeNum({
        id:`GD${Date.now()}`, chapterId:'decimals', difficulty:level,
        question:`Calculate: <b>${base} × ${times}</b>`,
        answer: result, acceptableAnswers:[result, String(parseFloat(result))],
        hint:`Multiply ${base.replace('.','').replace(/^0/,'')} × ${times} then place the decimal.`,
        explanation:`${base} × ${times} = <b>${result}</b>.`
      });
    }
    // L4 - decimal word problem (money/measurement)
    const price = (rnd(50, 500) / 10).toFixed(1);
    const qty = rnd(2, 8);
    const total = (parseFloat(price) * qty).toFixed(1);
    const paid = (Math.ceil(parseFloat(total) / 50) * 50).toFixed(1);
    const change = (parseFloat(paid) - parseFloat(total)).toFixed(1);
    return makeNum({
      id:`GD${Date.now()}`, chapterId:'decimals', difficulty:level,
      question:`A pen costs <b>Rs ${price}</b>. Rajan buys <b>${qty} pens</b> and pays <b>Rs ${paid}</b>.<br>How much <b>change</b> does he receive?`,
      answer: change, acceptableAnswers:[change, String(parseFloat(change)),'Rs '+change],
      hint:`Total = Rs ${price} × ${qty}. Change = Rs ${paid} − total.`,
      explanation:`Total = ${price} × ${qty} = Rs ${total}. Change = ${paid} − ${total} = <b>Rs ${change}</b>.`
    });
  },

});

console.log(`✅ Extra questions loaded. Total pool: ${STATIC_QUESTIONS.length} static questions + dynamic generators for ${Object.keys(GENERATORS).length} chapters.`);

})();
