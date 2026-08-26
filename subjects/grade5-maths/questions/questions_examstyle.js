'use strict';
// ══════════════════════════════════════════════════════
//  MathMaster Grade 5 - Exam-Style Question Bank
//  Modelled directly on MIE Mauritius 2023/2024/2025 papers
//  Real contexts, real phrasings, real question types
// ══════════════════════════════════════════════════════

(function () {

const EX = [

  // ════════════════════════════════════════════════
  //  NUMERATION & NOTATION  (exam-style)
  // ════════════════════════════════════════════════
  makeNum({ id:'EN01', chapterId:'numeration', subsection:'place_value', difficulty:1,
    question:'Write the value of the digit <b>6</b> in the number <b>3,625</b>.',
    answer:'600', acceptableAnswers:['600','six hundred'],
    hint:'The 6 is in the hundreds place. 6 × 100 = 600.',
    explanation:'In 3,625, the digit 6 is in the hundreds place. Its value is <b>600</b>.' }),

  makeMCQ({ id:'EN02', chapterId:'numeration', subsection:'ordering', difficulty:2,
    question:'In which of the following numbers does the digit <b>6</b> have the <b>greatest value</b>?',
    options:['2536','3625','5263','6325'],
    answer:'6325',
    hint:'Find where 6 sits in each number. The further left, the greater the value.',
    explanation:'In 6325, the 6 is in the thousands place → value = 6,000. That is the greatest. Answer: <b>6325</b>.' }),

  makeNum({ id:'EN03', chapterId:'numeration', subsection:'expanded', difficulty:2,
    question:'Work out:<br>(100 × 3) + (1 × 5) + (4 × 1000) + (10 × 2)',
    answer:'4325', acceptableAnswers:['4325'],
    hint:'Add each part: 300 + 5 + 4000 + 20.',
    explanation:'300 + 5 + 4000 + 20 = <b>4325</b>.' }),

  makeMCQ({ id:'EN04', chapterId:'numeration', subsection:'sequences', difficulty:3,
    question:'The number pattern is: <b>58, 62, 66, ___</b><br>What is the missing number?',
    options:['68','70','72','74'],
    answer:'70',
    hint:'Each term increases by 4. 66 + 4 = ?',
    explanation:'The pattern goes up by 4 each time. 66 + 4 = <b>70</b>.' }),

  makeNum({ id:'EN05', chapterId:'numeration', subsection:'place_value', difficulty:3,
    question:'Given that <b>23 × 17 = 391</b>, find the value of <b>23 × 170</b>.',
    answer:'3910', acceptableAnswers:['3910'],
    hint:'170 = 17 × 10. So 23 × 170 = 391 × 10.',
    explanation:'23 × 170 = 23 × 17 × 10 = 391 × 10 = <b>3910</b>.' }),

  makeNum({ id:'EN06', chapterId:'numeration', subsection:'rounding', difficulty:4,
    question:'A school has <b>2,456 boys</b> and <b>1,839 girls</b>.<br>How many more boys than girls are there?<br>Round your answer to the nearest <b>hundred</b>.',
    answer:'600', acceptableAnswers:['600'],
    hint:'Difference = 2456 − 1839 = 617. Round to nearest 100.',
    explanation:'2456 − 1839 = 617. Rounded to nearest 100 = <b>600</b>.' }),

  makeMCQ({ id:'EN07', chapterId:'numeration', subsection:'sequences', difficulty:2,
    question:'Complete the square number sequence:<br>1, 4, 9, <b>___</b>, 25',
    options:['14','16','18','20'],
    answer:'16',
    hint:'These are square numbers: 1²=1, 2²=4, 3²=9, 4²=?, 5²=25.',
    explanation:'4² = 16. The sequence is <b>16</b>.' }),

  makeMCQ({ id:'EN08', chapterId:'numeration', subsection:'sequences', difficulty:2,
    question:'Complete the pattern: <b>16, 25, 36, ___</b>',
    options:['45','47','49','51'],
    answer:'49',
    hint:'16=4², 25=5², 36=6². Next is 7².',
    explanation:'7² = 49. The next square number is <b>49</b>.' }),

  // ════════════════════════════════════════════════
  //  FOUR OPERATIONS  (exam-style)
  // ════════════════════════════════════════════════
  makeNum({ id:'EF01', chapterId:'four_ops', subsection:'word_probs', difficulty:3,
    question:'Mr Gerard divides <b>48 pencils equally</b> among <b>6 pupils</b>.<br>How many pencils does each pupil receive?',
    answer:'8',
    hint:'Divide: 48 ÷ 6.',
    explanation:'48 ÷ 6 = <b>8 pencils</b> each.' }),

  makeNum({ id:'EF02', chapterId:'four_ops', subsection:'addition', difficulty:3,
    question:'One packet of balloons contains <b>16 balloons</b>.<br>Mother buys <b>9 packets</b> of balloons.<br>How many balloons does mother get in all?',
    answer:'144',
    hint:'Multiply: 16 × 9.',
    explanation:'16 × 9 = <b>144 balloons</b>.' }),

  makeNum({ id:'EF03', chapterId:'four_ops', subsection:'word_probs', difficulty:4,
    question:'A shopkeeper buys <b>24 large packets of rice</b> for a total of <b>Rs 4,680</b>.<br>He repacks them into <b>50 smaller packets</b>. He sells <b>30</b> at <b>Rs 120</b> each and the remaining <b>20</b> at <b>Rs 100</b> each.<br>Find his <b>total profit</b>.',
    answer:'920', acceptableAnswers:['920','Rs 920'],
    hint:'Revenue = 30×120 + 20×100. Profit = Revenue − Rs 4,680.',
    explanation:'Revenue = Rs 3,600 + Rs 2,000 = Rs 5,600. Profit = 5,600 − 4,680 = <b>Rs 920</b>.' }),

  makeNum({ id:'EF04', chapterId:'four_ops', subsection:'addition', difficulty:4,
    question:'A fruitseller buys <b>200 pineapples</b> for <b>Rs 10,000</b>.<br>He sells <b>125 pineapples</b> at <b>Rs 60</b> each and the remaining at <b>Rs 55</b> each.<br>Calculate his <b>total profit</b>.',
    answer:'1625', acceptableAnswers:['1625','Rs 1625'],
    hint:'Remaining = 200−125 = 75. Revenue = 125×60 + 75×55. Profit = Revenue − 10,000.',
    explanation:'Revenue = 7,500 + 4,125 = Rs 11,625. Cost = Rs 10,000. Profit = <b>Rs 1,625</b>.' }),

  makeNum({ id:'EF05', chapterId:'four_ops', subsection:'word_probs', difficulty:4,
    question:'A shopkeeper buys <b>255 apples</b> and <b>130 oranges</b> for <b>Rs 2,536</b>. He gives away <b>50 apples</b> and <b>40 oranges</b> to a friend.<br>He sells the remaining apples at <b>Rs 12</b> each and oranges at <b>Rs 15</b> each.<br>Find the <b>total selling price</b>.',
    answer:'3810', acceptableAnswers:['3810','Rs 3810'],
    hint:'Remaining: 205 apples, 90 oranges. Revenue = 205×12 + 90×15.',
    explanation:'205 × 12 = Rs 2,460. 90 × 15 = Rs 1,350. Total = <b>Rs 3,810</b>.' }),

  makeNum({ id:'EF06', chapterId:'four_ops', subsection:'mixed_ops', difficulty:3,
    question:'For an outing, each pupil pays <b>Rs 120</b> for transport and <b>Rs 250</b> for entrance.<br>(a) How much does <b>one pupil</b> pay?<br>Give just the total per pupil.',
    answer:'370', acceptableAnswers:['370','Rs 370'],
    hint:'Add: 120 + 250.',
    explanation:'120 + 250 = <b>Rs 370</b> per pupil.' }),

  makeNum({ id:'EF07', chapterId:'four_ops', subsection:'word_probs', difficulty:4,
    question:'For an aquarium outing, each pupil pays <b>Rs 120</b> transport and <b>Rs 250</b> entrance fee.<br><b>18 pupils</b> go on the outing. How much do they pay <b>in total</b>?',
    answer:'6660', acceptableAnswers:['6660','Rs 6660'],
    hint:'Per pupil = 120+250 = Rs 370. Total = 370 × 18.',
    explanation:'Rs 370 × 18 = <b>Rs 6,660</b>.' }),

  makeNum({ id:'EF08', chapterId:'four_ops', subsection:'word_probs', difficulty:4,
    question:'Mike has <b>Rs 2,000</b>. He buys a <b>stepladder for Rs 1,200</b> and <b>2 paintbrushes at Rs 80.50 each</b>.<br>How much money does he have <b>left</b>?',
    answer:'639', acceptableAnswers:['639','Rs 639','Rs 639.00'],
    hint:'Total spent = 1200 + 2×80.50. Left = 2000 − total spent.',
    explanation:'2 brushes = Rs 161. Total = 1200+161 = Rs 1,361. Left = 2,000−1,361 = <b>Rs 639</b>.' }),

  // ════════════════════════════════════════════════
  //  SQUARE NUMBERS  (exam-style)
  // ════════════════════════════════════════════════
  makeNum({ id:'ES01', chapterId:'square_nums', subsection:'square_nums', difficulty:1,
    question:'Find the <b>value</b> of <b>6²</b>.',
    answer:'36',
    hint:'6² = 6 × 6.',
    explanation:'6 × 6 = <b>36</b>.' }),

  makeMCQ({ id:'ES02', chapterId:'square_nums', subsection:'square_nums', difficulty:2,
    question:'Which of the following is a <b>square number</b>?',
    options:['18','56','64','82'],
    answer:'64',
    hint:'A square number = n × n. Try: 8 × 8 = ?',
    explanation:'8 × 8 = 64. So <b>64</b> is a square number.' }),

  makeNum({ id:'ES03', chapterId:'square_nums', subsection:'square_nums', difficulty:3,
    question:'The area of a square is <b>twice</b> the area of a rectangle measuring <b>8 cm × 4 cm</b>.<br>Find the <b>length of one side</b> of the square.',
    answer:'8', acceptableAnswers:['8','8cm'],
    hint:'Rectangle area = 8×4 = 32 cm². Square area = 2×32 = 64 cm². Side = √64.',
    explanation:'Rectangle = 32 cm². Square = 64 cm². √64 = <b>8 cm</b>.' }),

  makeNum({ id:'ES04', chapterId:'square_nums', subsection:'square_nums', difficulty:3,
    question:'The <b>area of a square is 36 cm²</b>.<br>What is the <b>length of one side</b>?',
    answer:'6', acceptableAnswers:['6','6cm'],
    hint:'Side = √36. What number × itself = 36?',
    explanation:'6 × 6 = 36. Side = <b>6 cm</b>.' }),

  makeMCQ({ id:'ES05', chapterId:'square_nums', subsection:'patterns', difficulty:4,
    question:'Riya arranges counters in square patterns:<br>Pattern 1 → 1 counter<br>Pattern 2 → 4 counters<br>Pattern 3 → 9 counters<br>How many counters in <b>Pattern 9</b>?',
    options:['81','72','64','49'],
    answer:'81',
    hint:'Pattern n has n² counters. Pattern 9 = 9².',
    explanation:'9² = 9 × 9 = <b>81 counters</b>.' }),

  // ════════════════════════════════════════════════
  //  GEOMETRY  (exam-style)
  // ════════════════════════════════════════════════
  makeMCQ({ id:'EG01', chapterId:'geometry', subsection:'directions', difficulty:2,
    question:'Clarel is facing <b>East</b>. He makes a <b>¼ turn anticlockwise</b>.<br>Which direction does he face?',
    options:['North','South','West','North-East'],
    answer:'North',
    hint:'Anticlockwise from East: East → North.',
    explanation:'A quarter-turn anticlockwise from East = <b>North</b>.' }),

  makeMCQ({ id:'EG02', chapterId:'geometry', subsection:'directions', difficulty:2,
    question:'Seema is facing <b>East</b>. She makes a <b>¾ turn clockwise</b>.<br>Which direction is she now facing?',
    options:['North','South','West','East'],
    answer:'North',
    hint:'¾ CW from East: E→S→W→N (three quarter-turns).',
    explanation:'3 × 90° clockwise from East: East→South→West→<b>North</b>.' }),

  makeMCQ({ id:'EG03', chapterId:'geometry', subsection:'directions', difficulty:3,
    question:'Mary is facing <b>West</b>. Which turn makes her face <b>South</b>?',
    options:['¼ turn anticlockwise','¾ turn anticlockwise','¼ turn clockwise','¾ turn clockwise'],
    answer:'¼ turn anticlockwise',
    hint:'Anticlockwise from West: West → South (one quarter turn).',
    explanation:'¼ anticlockwise from West → <b>South</b>.' }),

  makeNum({ id:'EG04', chapterId:'geometry', subsection:'angles', difficulty:3,
    question:'A triangle has angles <b>47°</b> and <b>68°</b>.<br>What is the <b>third angle</b>?',
    answer:'65', acceptableAnswers:['65','65°'],
    hint:'All angles in a triangle sum to 180°. Third = 180 − 47 − 68.',
    explanation:'180 − 47 − 68 = <b>65°</b>.' }),

  makeMCQ({ id:'EG05', chapterId:'geometry', subsection:'angles', difficulty:3,
    question:'Which angles are <b>equal</b> in a kite?',
    options:['The two angles between unequal sides','The top and bottom angles','All four angles','None of the angles'],
    answer:'The two angles between unequal sides',
    hint:'In a kite, the angles between the unequal sides are equal.',
    explanation:'A kite has one pair of equal angles - the angles between the pairs of unequal sides.' }),

  makeMCQ({ id:'EG06', chapterId:'geometry', subsection:'symmetry', difficulty:2,
    question:'How many <b>lines of symmetry</b> does a <b>square</b> have?',
    options:['One','Two','Three','Four'],
    answer:'Four',
    hint:'A square has 4 sides + 4 diagonal lines of symmetry.',
    explanation:'A square has <b>4</b> lines of symmetry: 2 through opposite sides, 2 through corners.' }),

  makeMCQ({ id:'EG07', chapterId:'geometry', subsection:'symmetry', difficulty:2,
    question:'How many <b>lines of symmetry</b> does an <b>equilateral triangle</b> have?',
    options:['1','2','3','4'],
    answer:'3',
    hint:'An equilateral triangle has 3 equal sides and 3 lines of symmetry.',
    explanation:'An equilateral triangle has <b>3</b> lines of symmetry.' }),

  // ════════════════════════════════════════════════
  //  FRACTIONS  (exam-style)
  // ════════════════════════════════════════════════
  makeNum({ id:'EFR01', chapterId:'fractions', subsection:'word_probs', difficulty:2,
    question:'Vidhi cuts a cake into <b>9 equal pieces</b>. She eats <b>4 pieces</b>.<br>What fraction of the cake is <b>left</b>?',
    answer:'5/9',
    hint:'Left = (9 − 4) out of 9.',
    explanation:'9 − 4 = 5 pieces left. Fraction = <b>5/9</b>.' }),

  makeNum({ id:'EFR02', chapterId:'fractions', subsection:'word_probs', difficulty:2,
    question:'A pizza is divided into <b>8 equal parts</b>. Dany eats <b>2 parts</b> and Rita eats <b>1 part</b>.<br>What fraction of the pizza is <b>left</b>?',
    answer:'5/8',
    hint:'Eaten = 2+1=3. Left = (8−3)/8.',
    explanation:'3 parts eaten. Left = 5 out of 8 = <b>5/8</b>.' }),

  makeNum({ id:'EFR03', chapterId:'fractions', subsection:'word_probs', difficulty:3,
    question:'Rita has <b>36 sweets</b>. She gives <b>⅓</b> of the sweets to Reaz.<br>How many sweets does Reaz get?',
    answer:'12',
    hint:'1/3 × 36.',
    explanation:'1/3 × 36 = <b>12 sweets</b>.' }),

  makeNum({ id:'EFR04', chapterId:'fractions', subsection:'add_sub', difficulty:3,
    question:'Work out: <b>3/5 ÷ 8</b>',
    answer:'3/40',
    hint:'Dividing a fraction by a whole number: 3/5 ÷ 8 = 3/(5×8).',
    explanation:'3/5 ÷ 8 = 3/40 = <b>3/40</b>.' }),

  makeNum({ id:'EFR05', chapterId:'fractions', subsection:'add_sub', difficulty:3,
    question:'Work out: <b>7/12 − 1/6</b>',
    answer:'5/12',
    hint:'Convert 1/6 to twelfths: 1/6 = 2/12. Then subtract.',
    explanation:'7/12 − 2/12 = <b>5/12</b>.' }),

  makeNum({ id:'EFR06', chapterId:'fractions', subsection:'word_probs', difficulty:4,
    question:'Ashley has some stickers. He gives <b>1/4</b> to his brother and <b>2/3</b> to his sister.<br>What fraction does Ashley give away <b>in total</b>?',
    answer:'11/12',
    hint:'LCD of 4 and 3 = 12. 1/4 = 3/12. 2/3 = 8/12. Add.',
    explanation:'3/12 + 8/12 = <b>11/12</b> given away.' }),

  makeNum({ id:'EFR07', chapterId:'fractions', subsection:'word_probs', difficulty:4,
    question:'Ashley gives <b>1/4</b> of his stickers to his brother and <b>2/3</b> to his sister.<br>He has <b>24 stickers left</b>.<br>How many stickers did Ashley have <b>at first</b>?',
    answer:'288',
    hint:'Fraction given = 1/4 + 2/3 = 11/12. Fraction left = 1/12. If 1/12 = 24, total = 24 × 12.',
    explanation:'Fraction left = 1 − 11/12 = 1/12. 1/12 of total = 24. Total = 24 × 12 = <b>288 stickers</b>.' }),

  makeNum({ id:'EFR08', chapterId:'fractions', subsection:'equivalent', difficulty:4,
    question:'<b>840 beads</b> are shared among Ashi, Billy and Dan.<br>Ashi gets <b>5/8</b> of the beads. Billy gets <b>210 beads</b>.<br>What fraction does Billy get? (Give in simplest form)',
    answer:'1/4',
    hint:'Billy = 210/840. Simplify: divide both by 210.',
    explanation:'210/840 = 1/4 (dividing by 210). Billy gets <b>1/4</b>.' }),

  makeNum({ id:'EFR09', chapterId:'fractions', subsection:'word_probs', difficulty:4,
    question:'In a school, <b>2/5</b> of the pupils are boys. There are <b>324 boys</b>.<br>Find the <b>total number of pupils</b>.',
    answer:'810',
    hint:'2/5 of total = 324. Total = 324 ÷ 2 × 5.',
    explanation:'1/5 of total = 162. Total = 162 × 5 = <b>810 pupils</b>.' }),

  makeNum({ id:'EFR10', chapterId:'fractions', subsection:'word_probs', difficulty:4,
    question:'Rita has <b>3/4 m</b> of lace. She gives <b>1/3</b> of it to Seema.<br>What length of lace does Seema receive? Give your answer in <b>cm</b>.',
    answer:'25', acceptableAnswers:['25','25cm'],
    hint:'1/3 × 3/4 = 1/4 m. Convert to cm: 1/4 × 100.',
    explanation:'1/3 × 3/4 m = 1/4 m = 25 cm = <b>25 cm</b>.' }),

  // ════════════════════════════════════════════════
  //  DECIMALS  (exam-style)
  // ════════════════════════════════════════════════
  makeNum({ id:'ED01', chapterId:'decimals', subsection:'operations', difficulty:1,
    question:'Work out: <b>3.9 − 0.5</b>',
    answer:'3.4',
    hint:'Subtract: 3.9 − 0.5.',
    explanation:'3.9 − 0.5 = <b>3.4</b>.' }),

  makeNum({ id:'ED02', chapterId:'decimals', subsection:'operations', difficulty:2,
    question:'What is the value of <b>7</b> in the number <b>87.21</b>?',
    answer:'7', acceptableAnswers:['7','7 units','7units'],
    hint:'In 87.21, the digit 7 is in the units (ones) place.',
    explanation:'87.21: 8 is tens, <b>7 is units</b>.' }),

  makeNum({ id:'ED03', chapterId:'decimals', subsection:'operations', difficulty:2,
    question:'Divya buys <b>1 litre of water</b>. She drinks <b>0.4 L</b>.<br>How much water is left?',
    answer:'0.6', acceptableAnswers:['0.6','0.6L'],
    hint:'1.0 − 0.4.',
    explanation:'1.0 − 0.4 = <b>0.6 L</b>.' }),

  makeNum({ id:'ED04', chapterId:'decimals', subsection:'operations', difficulty:2,
    question:'Work out: <b>7.5 − 1.3</b>',
    answer:'6.2',
    hint:'Subtract tenths, then units.',
    explanation:'7.5 − 1.3 = <b>6.2</b>.' }),

  makeNum({ id:'ED05', chapterId:'decimals', subsection:'operations', difficulty:3,
    question:'Work out: <b>73.0 − 4.8</b>',
    answer:'68.2',
    hint:'Borrow: 73.0 → 72 and 10 tenths. 10 − 8 = 2 tenths. 72 − 4 = 68.',
    explanation:'73.0 − 4.8 = <b>68.2</b>.' }),

  makeNum({ id:'ED06', chapterId:'decimals', subsection:'place_value', difficulty:3,
    question:'Complete: <b>5 hundredths + 3 tenths + 4 units = ___</b>',
    answer:'4.35',
    hint:'4 units = 4. 3 tenths = 0.3. 5 hundredths = 0.05. Add.',
    explanation:'4 + 0.3 + 0.05 = <b>4.35</b>.' }),

  makeNum({ id:'ED07', chapterId:'decimals', subsection:'word_probs', difficulty:4,
    question:'Anna buys <b>2 kg of carrots</b> at <b>Rs 70.50 per kg</b> and <b>½ kg of peas</b> at <b>Rs 116 per kg</b>.<br>She pays with a <b>Rs 500 note</b>. How much <b>change</b> does she get?',
    answer:'301', acceptableAnswers:['301','Rs 301'],
    hint:'Carrots = 2×70.50=141. Peas = 0.5×116=58. Total = 199. Change = 500−199.',
    explanation:'Carrots = Rs 141. Peas = Rs 58. Total = Rs 199. Change = Rs 500 − 199 = <b>Rs 301</b>.' }),

  // ════════════════════════════════════════════════
  //  POWERS & EXPONENTS  (exam-style)
  // ════════════════════════════════════════════════
  makeNum({ id:'EP01', chapterId:'powers', subsection:'calculate', difficulty:1,
    question:'Find the value of <b>6²</b>.',
    answer:'36',
    hint:'6² = 6 × 6.',
    explanation:'6 × 6 = <b>36</b>.' }),

  makeMCQ({ id:'EP02', chapterId:'powers', subsection:'calculate', difficulty:2,
    question:'What is the value of <b>2³ + 1</b>?',
    options:['2','4','8','9'],
    answer:'9',
    hint:'2³ = 2×2×2 = 8. Then 8 + 1.',
    explanation:'2³ = 8. 8 + 1 = <b>9</b>.' }),

  makeMCQ({ id:'EP03', chapterId:'powers', subsection:'calculate', difficulty:2,
    question:'What is the value of <b>4³</b>?',
    options:['12','16','34','64'],
    answer:'64',
    hint:'4³ = 4 × 4 × 4.',
    explanation:'4 × 4 = 16. 16 × 4 = <b>64</b>.' }),

  makeNum({ id:'EP04', chapterId:'powers', subsection:'calculate', difficulty:3,
    question:'A square room has side <b>9 m</b>.<br>Write its area as a power, then calculate: <b>9² = ?</b>',
    answer:'81',
    hint:'9² = 9 × 9.',
    explanation:'9 × 9 = <b>81 m²</b>.' }),

  makeNum({ id:'EP05', chapterId:'powers', subsection:'word_probs', difficulty:3,
    question:'Priya has <b>3² marbles</b>. Her brother has <b>2³ marbles</b>.<br>How many marbles do they have <b>altogether</b>?',
    answer:'17',
    hint:'3² = 9. 2³ = 8. Total = 9 + 8.',
    explanation:'9 + 8 = <b>17 marbles</b>.' }),

  makeNum({ id:'EP06', chapterId:'powers', subsection:'notation', difficulty:4,
    question:'A town doubles its number of street lights every year. It starts with <b>2² lights</b>.<br>After <b>3 more years</b> (doublings), express the number of lights as a <b>power of 2</b> and calculate it.',
    answer:'32', acceptableAnswers:['32','2^5'],
    hint:'Start = 2² = 4. After 1 year = 2³. After 2 = 2⁴. After 3 more = 2⁵.',
    explanation:'2² → 2³ → 2⁴ → 2⁵ = 32. <b>32 lights</b>.' }),

  // ════════════════════════════════════════════════
  //  AVERAGE  (exam-style)
  // ════════════════════════════════════════════════
  makeNum({ id:'EA01', chapterId:'average', subsection:'mean', difficulty:2,
    question:'What is the <b>average</b> of: <b>3, 6, 4, 7</b>?',
    answer:'5',
    hint:'Add all four, then divide by 4.',
    explanation:'3+6+4+7=20. 20÷4=<b>5</b>.' }),

  makeNum({ id:'EA02', chapterId:'average', subsection:'mean', difficulty:3,
    question:'Three children Sarah, David and Yusuf have an <b>average of 26 marbles</b> each.<br>Find the <b>total</b> number of marbles the three children have.',
    answer:'78',
    hint:'Total = average × number of children. 26 × 3.',
    explanation:'26 × 3 = <b>78 marbles</b>.' }),

  makeNum({ id:'EA03', chapterId:'average', subsection:'missing', difficulty:4,
    question:'Three children have an average of <b>26 marbles</b>. Sarah gives some to her sister. The <b>new average drops to 21</b>.<br>How many marbles did Sarah give away?',
    answer:'15',
    hint:'Old total = 26×3=78. New total = 21×3=63. Given away = 78−63.',
    explanation:'Old total=78. New total=63. Given away = 78−63 = <b>15 marbles</b>.' }),

  makeNum({ id:'EA04', chapterId:'average', subsection:'mean', difficulty:3,
    question:'The <b>total weight of 3 children</b> is <b>132 kg</b>.<br>Find the <b>average weight</b> of the 3 children.',
    answer:'44', acceptableAnswers:['44','44kg'],
    hint:'Average = total ÷ number. 132 ÷ 3.',
    explanation:'132 ÷ 3 = <b>44 kg</b>.' }),

  makeNum({ id:'EA05', chapterId:'average', subsection:'mean', difficulty:4,
    question:'Kian is <b>9 years old</b>. Ziya is <b>5 years younger</b> than Kian. Amira is <b>7 years older</b> than Ziya.<br>Find the <b>average age</b> of the three children.',
    answer:'8', acceptableAnswers:['8','8 years'],
    hint:'Kian=9. Ziya=9−5=4. Amira=4+7=11. Average = (9+4+11)÷3.',
    explanation:'9+4+11=24. 24÷3=<b>8 years</b>.' }),

  // ════════════════════════════════════════════════
  //  RATIO  (exam-style)
  // ════════════════════════════════════════════════
  makeNum({ id:'ER01', chapterId:'ratio', subsection:'equivalent', difficulty:2,
    question:'A box has <b>32 pencils</b> and <b>8 erasers</b>.<br>Find the ratio of pencils to erasers in <b>simplest form</b>.',
    answer:'4:1', acceptableAnswers:['4:1','4 : 1'],
    hint:'32:8. Divide both by 8.',
    explanation:'32÷8 : 8÷8 = <b>4:1</b>.' }),

  makeNum({ id:'ER02', chapterId:'ratio', subsection:'equivalent', difficulty:2,
    question:'Write <b>25:15</b> in its <b>simplest form</b>.',
    answer:'5:3', acceptableAnswers:['5:3','5 : 3'],
    hint:'Divide both by GCF = 5.',
    explanation:'25÷5 : 15÷5 = <b>5:3</b>.' }),

  makeNum({ id:'ER03', chapterId:'ratio', subsection:'dividing', difficulty:3,
    question:'Mother shares money between Aisha and Rayan in the ratio <b>3:2</b>.<br>Aisha gets <b>Rs 1,500</b>.<br>How much does Rayan get?',
    answer:'1000', acceptableAnswers:['1000','Rs 1000'],
    hint:'Aisha = 3 parts = Rs 1,500. 1 part = 500. Rayan = 2 parts.',
    explanation:'1 part = 500. Rayan = 2 × 500 = <b>Rs 1,000</b>.' }),

  makeNum({ id:'ER04', chapterId:'ratio', subsection:'word_probs', difficulty:3,
    question:'The ratio of mangoes to bananas in a box is <b>4:5</b>.<br>There are <b>36 mangoes</b>.<br>How many bananas are there?',
    answer:'45',
    hint:'4 parts = 36 mangoes. 1 part = 9. Bananas = 5 × 9.',
    explanation:'1 part = 9. Bananas = 5 × 9 = <b>45</b>.' }),

  makeNum({ id:'ER05', chapterId:'ratio', subsection:'equivalent', difficulty:4,
    question:'Write <b>48:12</b> in its <b>simplest form</b>.',
    answer:'4:1', acceptableAnswers:['4:1','4 : 1'],
    hint:'GCF of 48 and 12 = 12.',
    explanation:'48÷12 : 12÷12 = <b>4:1</b>.' }),

  makeNum({ id:'ER06', chapterId:'ratio', subsection:'writing', difficulty:4,
    question:'A worker earns <b>Rs 535</b> for <b>4 hours</b> of work.<br>How much does he earn for <b>12 hours</b>?',
    answer:'1605', acceptableAnswers:['1605','Rs 1605'],
    hint:'Rate per hour = 535÷4. Then × 12. Or: 12÷4 = 3, so 3 × 535.',
    explanation:'12÷4=3. 3 × 535 = <b>Rs 1,605</b>.' }),

  // ════════════════════════════════════════════════
  //  LENGTH  (exam-style)
  // ════════════════════════════════════════════════
  makeNum({ id:'EL01', chapterId:'length', subsection:'perimeter', difficulty:2,
    question:'The length of a <b>square</b> is <b>7 cm</b>.<br>Find the <b>perimeter</b> of the square.',
    answer:'28', acceptableAnswers:['28','28cm'],
    hint:'Perimeter of square = 4 × side.',
    explanation:'4 × 7 = <b>28 cm</b>.' }),

  makeNum({ id:'EL02', chapterId:'length', subsection:'perimeter', difficulty:2,
    question:'Find the <b>perimeter</b> of a triangle with sides <b>6 cm, 5 cm</b> and <b>7 cm</b>.',
    answer:'18', acceptableAnswers:['18','18cm'],
    hint:'Add all three sides.',
    explanation:'6 + 5 + 7 = <b>18 cm</b>.' }),

  makeNum({ id:'EL03', chapterId:'length', subsection:'perimeter', difficulty:3,
    question:'A <b>rectangular field</b> is <b>12 m long</b> and <b>10 m wide</b>.<br>What is its <b>perimeter</b>?',
    answer:'44', acceptableAnswers:['44','44m'],
    hint:'P = 2(l + w) = 2(12 + 10).',
    explanation:'2 × (12 + 10) = 2 × 22 = <b>44 m</b>.' }),

  makeNum({ id:'EL04', chapterId:'length', subsection:'conversion', difficulty:3,
    question:'A tailor uses <b>2 m 40 cm</b> of cloth to make one shirt.<br>What length of cloth is needed to make <b>4 shirts</b>? Give your answer in <b>cm</b>.',
    answer:'960', acceptableAnswers:['960','960cm'],
    hint:'2 m 40 cm = 240 cm. For 4 shirts: 240 × 4.',
    explanation:'240 cm × 4 = <b>960 cm</b>.' }),

  makeNum({ id:'EL05', chapterId:'length', subsection:'conversion', difficulty:4,
    question:'Feroz is <b>1 m 45 cm</b> tall. Salim is <b>20 cm taller</b> than Feroz.<br>What is Salim\'s height in <b>cm</b>?',
    answer:'165', acceptableAnswers:['165','165cm'],
    hint:'Feroz = 145 cm. Salim = 145 + 20.',
    explanation:'145 + 20 = <b>165 cm</b>.' }),

  makeNum({ id:'EL06', chapterId:'length', subsection:'word_probs', difficulty:4,
    question:'Ali is <b>180 cm</b> tall. Sheena is <b>half as tall</b> as Ali. Elisa is <b>8 cm shorter</b> than Sheena.<br>What is Elisa\'s height?',
    answer:'82', acceptableAnswers:['82','82cm'],
    hint:'Sheena = 180÷2 = 90 cm. Elisa = 90−8.',
    explanation:'Sheena = 90 cm. Elisa = 90−8 = <b>82 cm</b>.' }),

  // ════════════════════════════════════════════════
  //  AREA  (exam-style)
  // ════════════════════════════════════════════════
  makeNum({ id:'EAR01', chapterId:'area', subsection:'rectangle', difficulty:2,
    question:'Find the <b>area</b> of a rectangle measuring <b>8 cm × 4 cm</b>.',
    answer:'32', acceptableAnswers:['32','32cm2'],
    hint:'Area = length × width.',
    explanation:'8 × 4 = <b>32 cm²</b>.' }),

  makeNum({ id:'EAR02', chapterId:'area', subsection:'triangle', difficulty:3,
    question:'A right-angled triangle has a <b>base of 26 cm</b> and a <b>height of 10 cm</b>.<br>Find the <b>area</b> of the shaded triangle.',
    answer:'130', acceptableAnswers:['130','130cm2'],
    hint:'Area of triangle = ½ × base × height.',
    explanation:'½ × 26 × 10 = <b>130 cm²</b>.' }),

  makeNum({ id:'EAR03', chapterId:'area', subsection:'triangle', difficulty:4,
    question:'A rectangle ACDE is <b>10 cm × 7 cm</b>. Inside it, triangle BCD has <b>base 4 cm and height 7 cm</b>.<br>Find the area of shape ABDE (rectangle minus triangle).',
    answer:'56', acceptableAnswers:['56','56cm2'],
    hint:'Rectangle area = 70. Triangle = ½×4×7=14. ABDE = 70−14.',
    explanation:'Rectangle = 70 cm². Triangle = 14 cm². ABDE = 70−14 = <b>56 cm²</b>.' }),

  // ════════════════════════════════════════════════
  //  CAPACITY  (exam-style)
  // ════════════════════════════════════════════════
  makeNum({ id:'EC01', chapterId:'capacity', subsection:'word_probs', difficulty:2,
    question:'The capacity of a bottle is <b>2 L</b>. It contains <b>1 L 500 mL</b> of water.<br>How much <b>more</b> water is needed to fill it?',
    answer:'500', acceptableAnswers:['500','500mL'],
    hint:'2 L = 2,000 mL. 1 L 500 mL = 1,500 mL. More needed = 2,000 − 1,500.',
    explanation:'2,000 − 1,500 = <b>500 mL</b>.' }),

  makeNum({ id:'EC02', chapterId:'capacity', subsection:'operations', difficulty:3,
    question:'Anna mixes <b>250 mL</b> of apple juice with <b>1,050 mL</b> of orange juice.<br>How much <b>mixed fruit juice</b> does she prepare in total?',
    answer:'1300', acceptableAnswers:['1300','1300mL'],
    hint:'Add: 250 + 1,050.',
    explanation:'250 + 1,050 = <b>1,300 mL</b>.' }),

  makeNum({ id:'EC03', chapterId:'capacity', subsection:'operations', difficulty:4,
    question:'Anna has <b>1,300 mL</b> of mixed juice. She fills <b>6 glasses</b>, each holding <b>200 mL</b>.<br>How much juice is <b>left over</b>?',
    answer:'100', acceptableAnswers:['100','100mL'],
    hint:'Used = 6 × 200 = 1,200 mL. Left = 1,300 − 1,200.',
    explanation:'6 × 200 = 1,200 mL. Left = 1,300 − 1,200 = <b>100 mL</b>.' }),

  makeNum({ id:'EC04', chapterId:'capacity', subsection:'operations', difficulty:3,
    question:'Mira mixes <b>300 mL</b> of concentrated juice with <b>2 L</b> of water.<br>How much juice does she get in total? Give your answer in <b>mL</b>.',
    answer:'2300', acceptableAnswers:['2300','2300mL'],
    hint:'2 L = 2,000 mL. Total = 300 + 2,000.',
    explanation:'300 + 2,000 = <b>2,300 mL</b>.' }),

  makeNum({ id:'EC05', chapterId:'capacity', subsection:'operations', difficulty:4,
    question:'Tank A has a capacity of <b>380 L</b> and is <b>half full</b> of water.<br>All this water is transferred to Tank B which holds <b>525 L</b> when full.<br>How much more water must be added to fill Tank B completely?',
    answer:'335', acceptableAnswers:['335','335L'],
    hint:'Tank A contains 380÷2 = 190 L. More needed = 525 − 190.',
    explanation:'190 L transferred. Need = 525−190 = <b>335 L</b>.' }),

  // ════════════════════════════════════════════════
  //  MASS  (exam-style)
  // ════════════════════════════════════════════════
  makeNum({ id:'EM01', chapterId:'mass', subsection:'operations', difficulty:2,
    question:'A basket of fruits has a mass of <b>5.7 kg</b>. Reena removes a pineapple.<br>The basket now has a mass of <b>4.9 kg</b>.<br>What is the mass of the pineapple?',
    answer:'0.8', acceptableAnswers:['0.8','0.8kg'],
    hint:'5.7 − 4.9.',
    explanation:'5.7 − 4.9 = <b>0.8 kg</b>.' }),

  makeNum({ id:'EM02', chapterId:'mass', subsection:'operations', difficulty:3,
    question:'A basket containing rice (8.9 kg total) has a packet of rice removed, leaving <b>5.4 kg</b>.<br>What is the mass of the packet of rice? Give your answer in <b>grams</b>.',
    answer:'3500', acceptableAnswers:['3500','3500g'],
    hint:'Difference = 8.9−5.4 = 3.5 kg. Convert to grams: × 1000.',
    explanation:'8.9−5.4 = 3.5 kg = <b>3,500 g</b>.' }),

  makeNum({ id:'EM03', chapterId:'mass', subsection:'word_probs', difficulty:3,
    question:'The <b>total mass</b> of Dev and Mala is <b>48 kg</b>. Dev weighs <b>29 kg</b>.<br>What is Mala\'s mass?',
    answer:'19', acceptableAnswers:['19','19kg'],
    hint:'Mala = 48 − 29.',
    explanation:'48 − 29 = <b>19 kg</b>.' }),

  // ════════════════════════════════════════════════
  //  MONEY  (exam-style)
  // ════════════════════════════════════════════════
  makeNum({ id:'EMO01', chapterId:'money', subsection:'word_probs', difficulty:2,
    question:'Mary has a <b>Rs 500 note</b>, a <b>Rs 50 note</b>, a <b>Rs 10 coin</b> and a <b>Rs 5 coin</b>.<br>How much money does she have in all?',
    answer:'565', acceptableAnswers:['565','Rs 565'],
    hint:'Add: 500 + 50 + 10 + 5.',
    explanation:'500 + 50 + 10 + 5 = <b>Rs 565</b>.' }),

  makeNum({ id:'EMO02', chapterId:'money', subsection:'word_probs', difficulty:3,
    question:'A shopkeeper buys <b>24 large packets of rice</b> for <b>Rs 4,680</b> total.<br>Find the buying price of <b>one</b> large packet of rice.',
    answer:'195', acceptableAnswers:['195','Rs 195'],
    hint:'Price per packet = 4,680 ÷ 24.',
    explanation:'4,680 ÷ 24 = <b>Rs 195</b>.' }),

  makeNum({ id:'EMO03', chapterId:'money', subsection:'word_probs', difficulty:4,
    question:'A shop sells: stepladder <b>Rs 1,200</b>, pail of paint <b>Rs 250</b>, paintbrush <b>Rs 80.50</b>.<br>Mike has Rs 2,000. He buys 2 paintbrushes and a stepladder. With the money left, how many <b>pails of paint</b> can he buy?',
    answer:'2',
    hint:'Spent = 2×80.50 + 1200 = Rs 1,361. Left = Rs 639. Pails = 639 ÷ 250 (whole number).',
    explanation:'Left = Rs 639. 639 ÷ 250 = 2 remainder 139. He can buy <b>2 pails</b>.' }),

  makeNum({ id:'EMO04', chapterId:'money', subsection:'operations', difficulty:4,
    question:'A cupcake recipe for <b>12 cupcakes</b> uses <b>115 g of flour</b>.<br>Mother makes <b>24 cupcakes</b> from a <b>500 g packet</b> of flour.<br>How much flour is <b>left over</b>?',
    answer:'270', acceptableAnswers:['270','270g'],
    hint:'For 24 cupcakes: 2 × 115 = 230 g needed. Left = 500 − 230.',
    explanation:'24 cupcakes need 230 g. Left = 500 − 230 = <b>270 g</b>.' }),

  makeMCQ({ id:'EMO05', chapterId:'money', subsection:'operations', difficulty:3,
    question:'Rs 2.25 equals how many <b>cents</b>?',
    options:['22 cents','225 cents','22.5 cents','2250 cents'],
    answer:'225 cents',
    hint:'1 Rupee = 100 cents. Rs 2.25 = 2.25 × 100.',
    explanation:'2.25 × 100 = <b>225 cents</b>.' }),

  // ════════════════════════════════════════════════
  //  TIME  (exam-style)
  // ════════════════════════════════════════════════
  makeNum({ id:'ET01', chapterId:'time', subsection:'word_probs', difficulty:2,
    question:'Riya goes for a swim at <b>8:30 a.m.</b> She swims for <b>25 minutes</b>.<br>At what time does she <b>finish</b> swimming?',
    answer:'8:55am', acceptableAnswers:['8:55am','8:55 am','08:55'],
    hint:'8:30 + 25 min = 8:55.',
    explanation:'8:30 + 25 min = <b>8:55 a.m.</b>' }),

  makeNum({ id:'ET02', chapterId:'time', subsection:'duration', difficulty:3,
    question:'A film starts at <b>3:45 p.m.</b> and ends at <b>6:00 p.m.</b><br>How long does the film last? Give as hours and minutes.',
    answer:'2h15min', acceptableAnswers:['2h15min','2 h 15 min','2h 15min'],
    hint:'6:00 − 3:45. Minutes: 60−45=15. Hours: 6−1−3=2.',
    explanation:'6:00 − 3:45 = <b>2 hours 15 minutes</b>.' }),

  makeNum({ id:'ET03', chapterId:'time', subsection:'duration', difficulty:3,
    question:'Mila starts climbing at <b>07:20 a.m.</b> and reaches the top at <b>10:05 a.m.</b><br>How long did she take? Give hours and minutes.',
    answer:'2h45min', acceptableAnswers:['2h45min','2 h 45 min'],
    hint:'10:05 − 07:20. Min: 05−20, borrow → 65−20=45. Hours: 10−1−7=2.',
    explanation:'10:05 − 07:20 = <b>2 hours 45 minutes</b>.' }),

  makeNum({ id:'ET04', chapterId:'time', subsection:'duration', difficulty:4,
    question:'Mila reaches the top of a mountain at <b>10:05 a.m.</b> She rests for <b>40 minutes</b>, then takes <b>2 hours 10 minutes</b> to descend.<br>At what time does she reach the <b>foot</b> of the mountain?',
    answer:'12:55pm', acceptableAnswers:['12:55pm','12:55 pm','12:55'],
    hint:'10:05 + 40 min = 10:45. 10:45 + 2h10min = 12:55.',
    explanation:'10:05 + 40 min = 10:45. 10:45 + 2h 10min = <b>12:55 p.m.</b>' }),

  makeNum({ id:'ET05', chapterId:'time', subsection:'duration', difficulty:4,
    question:'Eshan leaves home at <b>07:30</b> and takes <b>1 hour 45 minutes</b> to reach his office.<br>At what time does he arrive?',
    answer:'09:15', acceptableAnswers:['09:15','9:15','09:15am'],
    hint:'07:30 + 1h = 08:30. 08:30 + 45 min = 09:15.',
    explanation:'07:30 + 1h 45min = <b>09:15</b>.' }),

  makeNum({ id:'ET06', chapterId:'time', subsection:'conversion', difficulty:3,
    question:'Convert <b>1¼ hours</b> into minutes.',
    answer:'75', acceptableAnswers:['75','75 minutes'],
    hint:'1 hour = 60 min. ¼ hour = 15 min. Total = 60 + 15.',
    explanation:'60 + 15 = <b>75 minutes</b>.' }),

  // ════════════════════════════════════════════════
  //  GRAPHS & DATA  (exam-style - pictogram/bar chart)
  // ════════════════════════════════════════════════
  makeNum({ id:'EGR01', chapterId:'graphs', subsection:'bar_chart', difficulty:2,
    question:'A bar chart shows water bottles sold by Mr Kumar:<br>Mon=14, Tue=10, Wed=6, Thu=8, Fri=18.<br>On which day did Mr Kumar sell the <b>least</b> number of bottles?<br><i>Type the day name.</i>',
    answer:'Wednesday', acceptableAnswers:['Wednesday','wednesday','Wed'],
    hint:'Find the smallest bar: 6 bottles.',
    explanation:'Wednesday had only 6 bottles - the <b>least</b>.' }),

  makeNum({ id:'EGR02', chapterId:'graphs', subsection:'bar_chart', difficulty:3,
    question:'Mr Kumar\'s water bottle sales: Mon=14, Tue=10, Wed=6, Thu=8.<br>He sells each bottle for <b>Rs 15</b>.<br>How much money did he earn on <b>Tuesday and Thursday combined</b>?',
    answer:'270', acceptableAnswers:['270','Rs 270'],
    hint:'(10 + 8) × 15.',
    explanation:'18 × 15 = <b>Rs 270</b>.' }),

  makeNum({ id:'EGR03', chapterId:'graphs', subsection:'bar_chart', difficulty:3,
    question:'A bar chart: Mon=14, Tue=10, Wed=6, Thu=8.<br>Mr Kumar sold <b>three times as many</b> bottles on Friday as on Wednesday.<br>How many did he sell on <b>Friday</b>?',
    answer:'18',
    hint:'Wednesday = 6. Friday = 3 × 6.',
    explanation:'3 × 6 = <b>18 bottles</b> on Friday.' }),

  makeMCQ({ id:'EGR04', chapterId:'graphs', subsection:'bar_chart', difficulty:3,
    question:'A bar chart shows transport used by pupils:<br>Van=16, Bus=12, Car=8, Foot=10.<br>Which means of transport is used by <b>most</b> pupils?',
    options:['Van','Bus','Car','Foot'],
    answer:'Van',
    hint:'Find the tallest bar.',
    explanation:'Van = 16 pupils - the most. Answer: <b>Van</b>.' }),

  makeNum({ id:'EGR05', chapterId:'graphs', subsection:'pictogram', difficulty:4,
    question:'A pictogram shows bakery loaves:<br>Mon=700, Tue=500, Wed=800, Thu=900, Fri=700, Sat=1000.<br>On Sunday, the bakery makes <b>200 fewer loaves</b> than Wednesday.<br>How many more loaves were produced on <b>Saturday</b> than on <b>Tuesday</b>?',
    answer:'500',
    hint:'Saturday=1000, Tuesday=500. Difference = 1000−500.',
    explanation:'1000 − 500 = <b>500 loaves</b>.' }),

  makeNum({ id:'EGR06', chapterId:'graphs', subsection:'pictogram', difficulty:4,
    question:'A pictogram (key: 1 symbol = 100 loaves) shows:<br>Mon=7 symbols, Tue=5 symbols, Wed=8 symbols.<br>On <b>Sunday</b>, the bakery makes 200 fewer than Wednesday.<br>How many loaves on <b>Sunday</b>?',
    answer:'600', acceptableAnswers:['600','600 loaves'],
    hint:'Wednesday = 8×100 = 800. Sunday = 800 − 200.',
    explanation:'800 − 200 = <b>600 loaves</b>.' }),

];

// Push all exam-style questions into the main pool
EX.forEach(q => { if (q) STATIC_QUESTIONS.push(q); });

console.log(`✅ Exam-style bank loaded. Added ${EX.filter(Boolean).length} MIE-style questions.`);

})();
