'use strict';
// ═══════════════════════════════════════════════════════════════════════
//  MathMaster Grade 5 — Subsection Questions
//  MIE Mauritius Curriculum
//
//  HOW TO ADD QUESTIONS (for human and AI contributors):
//  ───────────────────────────────────────────────────────
//  1. Use makeMCQ() for multiple-choice or makeNum() for numeric answers.
//  2. Set chapterId from the CHAPTERS list in questions.js.
//  3. Set subsection from the SYLLABUS list in questions.js.
//  4. Set difficulty: 1=basic, 2=medium, 3=hard, 4=word problem.
//  5. Use a unique id (prefix + sequential number, e.g. 'ROM01').
//  6. Push into STATIC_QUESTIONS — already done by the loop at the bottom.
//  7. Never duplicate an existing id. Run a grep first if unsure.
//
//  QUICK TEMPLATE:
//    makeNum({ id:'XX01', chapterId:'numeration', subsection:'place_value',
//      difficulty:2, question:'...', answer:'42',
//      acceptableAnswers:['42'], hint:'...', explanation:'...' })
//
//    makeMCQ({ id:'XX01', chapterId:'fractions', subsection:'comparing',
//      difficulty:2, question:'...', options:['A','B','C','D'],
//      answer:'B', hint:'...', explanation:'...' })
// ═══════════════════════════════════════════════════════════════════════

const QS2 = [

  // ══════════════════════════════════════════════
  //  NUMERATION — Roman Numerals
  // ══════════════════════════════════════════════
  makeMCQ({ id:'ROM01', chapterId:'numeration', subsection:'roman', difficulty:1,
    question:'What is the value of the Roman numeral <b>XIV</b>?',
    options:['9','14','15','16'],
    answer:'14',
    hint:'X=10, IV=4 (4 = 5−1 written as IV). 10+4=14.',
    explanation:'XIV = X(10) + IV(4) = <b>14</b>.' }),

  makeNum({ id:'ROM02', chapterId:'numeration', subsection:'roman', difficulty:2,
    question:'Write <b>58</b> in Roman numerals.',
    answer:'LVIII',
    hint:'L=50, V=5, III=3. 50+5+3=58.',
    explanation:'58 = 50+5+3 = L+V+III = <b>LVIII</b>.' }),

  makeMCQ({ id:'ROM03', chapterId:'numeration', subsection:'roman', difficulty:2,
    question:'What number does <b>XLII</b> represent?',
    options:['32','42','52','62'],
    answer:'42',
    hint:'XL = 40 (not LX). II = 2. So XL+II.',
    explanation:'XL = 50−10 = 40. II = 2. XLII = <b>42</b>.' }),

  makeNum({ id:'ROM04', chapterId:'numeration', subsection:'roman', difficulty:3,
    question:'Write <b>99</b> in Roman numerals.',
    answer:'XCIX',
    hint:'XC=90 (100−10). IX=9 (10−1). So XC+IX.',
    explanation:'90=XC, 9=IX. 99 = <b>XCIX</b>.' }),

  makeMCQ({ id:'ROM05', chapterId:'numeration', subsection:'roman', difficulty:3,
    question:'What is <b>CCXLV</b> in numbers?',
    options:['215','225','245','265'],
    answer:'245',
    hint:'CC=200, XL=40, V=5. Add them.',
    explanation:'CC(200) + XL(40) + V(5) = <b>245</b>.' }),

  // ══════════════════════════════════════════════
  //  NUMERATION — Rounding
  // ══════════════════════════════════════════════
  makeNum({ id:'RND01', chapterId:'numeration', subsection:'rounding', difficulty:1,
    question:'Round <b>3,672</b> to the nearest <b>100</b>.',
    answer:'3700', acceptableAnswers:['3700','3,700'],
    hint:'Look at the tens digit (7). Since 7≥5, round up. 36xx → 3700.',
    explanation:'Tens digit is 7 (≥5) so round up. 3,672 → <b>3,700</b>.' }),

  makeNum({ id:'RND02', chapterId:'numeration', subsection:'rounding', difficulty:2,
    question:'Round <b>47,382</b> to the nearest <b>10,000</b>.',
    answer:'50000', acceptableAnswers:['50000','50,000'],
    hint:'Look at the thousands digit (7). 7≥5, so round up.',
    explanation:'Thousands digit = 7 (≥5) → round up. 47,382 → <b>50,000</b>.' }),

  makeNum({ id:'RND03', chapterId:'numeration', subsection:'rounding', difficulty:2,
    question:'Round <b>23,450</b> to the nearest <b>1,000</b>.',
    answer:'23000', acceptableAnswers:['23000','23,000'],
    hint:'Look at the hundreds digit (4). 4<5, so round down.',
    explanation:'Hundreds digit = 4 (<5) → round down. 23,450 → <b>23,000</b>.' }),

  makeNum({ id:'RND04', chapterId:'numeration', subsection:'rounding', difficulty:3,
    question:'A crowd of <b>18,748</b> people attended a match.<br>Round this to the nearest <b>1,000</b>.',
    answer:'19000', acceptableAnswers:['19000','19,000'],
    hint:'Look at the hundreds digit (7). 7≥5 so round up.',
    explanation:'Hundreds digit = 7 (≥5) → 18,748 rounds up to <b>19,000</b>.' }),

  // ══════════════════════════════════════════════
  //  NUMERATION — Number Sequences
  // ══════════════════════════════════════════════
  makeNum({ id:'SEQ01', chapterId:'numeration', subsection:'sequences', difficulty:1,
    question:'What is the next number in the sequence?<br><b>3, 7, 11, 15, ___</b>',
    answer:'19',
    hint:'The difference between each term is 4 (add 4 each time).',
    explanation:'15 + 4 = <b>19</b>. The rule is +4 each time.' }),

  makeMCQ({ id:'SEQ02', chapterId:'numeration', subsection:'sequences', difficulty:2,
    question:'What is the next number in the sequence?<br><b>2, 6, 18, 54, ___</b>',
    options:['72','108','162','216'],
    answer:'162',
    hint:'Each number is multiplied by 3. 54 × 3 = ?',
    explanation:'The rule is ×3. 54 × 3 = <b>162</b>.' }),

  makeNum({ id:'SEQ03', chapterId:'numeration', subsection:'sequences', difficulty:2,
    question:'What comes next?<br><b>100, 93, 86, 79, ___</b>',
    answer:'72',
    hint:'The difference is −7 each time. 79−7=?',
    explanation:'79 − 7 = <b>72</b>. The rule is −7.' }),

  makeNum({ id:'SEQ04', chapterId:'numeration', subsection:'sequences', difficulty:3,
    question:'Find the missing number:<br><b>1, 4, 9, 16, ___, 36</b>',
    answer:'25',
    hint:'These are square numbers: 1², 2², 3², 4², 5², 6².',
    explanation:'1, 4, 9, 16 are 1², 2², 3², 4². Next is 5² = <b>25</b>.' }),

  // ══════════════════════════════════════════════
  //  FOUR OPERATIONS — BODMAS / Mixed Ops
  // ══════════════════════════════════════════════
  makeNum({ id:'BOD01', chapterId:'four_ops', subsection:'mixed_ops', difficulty:2,
    question:'Calculate: <b>5 + 3 × 4</b>',
    answer:'17',
    hint:'BODMAS: Multiplication first. 3×4=12. Then 5+12.',
    explanation:'3×4=12. 5+12=<b>17</b>. Multiplication before addition.' }),

  makeNum({ id:'BOD02', chapterId:'four_ops', subsection:'mixed_ops', difficulty:2,
    question:'Calculate: <b>(12 − 4) × 3</b>',
    answer:'24',
    hint:'Brackets first: 12−4=8. Then 8×3.',
    explanation:'(12−4)=8. 8×3=<b>24</b>.' }),

  makeNum({ id:'BOD03', chapterId:'four_ops', subsection:'mixed_ops', difficulty:3,
    question:'Calculate: <b>20 ÷ (2 + 3)</b>',
    answer:'4',
    hint:'Brackets first: 2+3=5. Then 20÷5.',
    explanation:'2+3=5. 20÷5=<b>4</b>.' }),

  makeNum({ id:'BOD04', chapterId:'four_ops', subsection:'mixed_ops', difficulty:3,
    question:'Calculate: <b>3 × (7 − 2) + 8</b>',
    answer:'23',
    hint:'Brackets: 7−2=5. Then 3×5=15. Then 15+8.',
    explanation:'(7−2)=5. 3×5=15. 15+8=<b>23</b>.' }),

  // ══════════════════════════════════════════════
  //  FOUR OPERATIONS — Division with Remainder
  // ══════════════════════════════════════════════
  makeMCQ({ id:'DIV01', chapterId:'four_ops', subsection:'division', difficulty:1,
    question:'What is <b>85 ÷ 9</b>?',
    options:['9 r 1','9 r 4','8 r 5','10 r 5'],
    answer:'9 r 4',
    hint:'9 × 9 = 81. 85 − 81 = 4. So quotient is 9, remainder is 4.',
    explanation:'9 × 9 = 81. 85 − 81 = 4 remainder. Answer = <b>9 r 4</b>.' }),

  makeNum({ id:'DIV02', chapterId:'four_ops', subsection:'division', difficulty:2,
    question:'<b>137 cookies</b> are packed equally into <b>12 bags</b>.<br>How many are left over?',
    answer:'5',
    hint:'137 ÷ 12 = 11 remainder ?. 12 × 11 = 132. 137 − 132 = ?',
    explanation:'12×11=132. 137−132=<b>5</b> cookies left over.' }),

  makeNum({ id:'DIV03', chapterId:'four_ops', subsection:'division', difficulty:3,
    question:'<b>250 seedlings</b> are planted in rows of <b>8</b>.<br>How many <b>complete rows</b> are there, and how many seedlings are left?<br><i>(Answer: rows r leftover, e.g. 3r2)</i>',
    answer:'31r2',
    hint:'250 ÷ 8 = 31 remainder ?. 8 × 31 = 248. 250−248=2.',
    explanation:'8×31=248. 250−248=2. So <b>31 rows, 2 left over</b>.' }),

  // ══════════════════════════════════════════════
  //  FOUR OPERATIONS — Multiplication
  // ══════════════════════════════════════════════
  makeNum({ id:'MUL01', chapterId:'four_ops', subsection:'multiplication', difficulty:2,
    question:'Calculate: <b>243 × 6</b>',
    answer:'1458',
    hint:'Multiply each digit: 3×6=18 (carry 1). 4×6+1=25 (carry 2). 2×6+2=14.',
    explanation:'243 × 6 = <b>1,458</b>.' }),

  makeNum({ id:'MUL02', chapterId:'four_ops', subsection:'multiplication', difficulty:3,
    question:'A school has <b>28 classrooms</b>. Each classroom has <b>35 pupils</b>.<br>How many pupils in total?',
    answer:'980', acceptableAnswers:['980'],
    hint:'28 × 35. Break it: 28×30=840 and 28×5=140. Add.',
    explanation:'28×30=840. 28×5=140. 840+140=<b>980 pupils</b>.' }),

  makeNum({ id:'MUL03', chapterId:'four_ops', subsection:'multiplication', difficulty:3,
    question:'Calculate: <b>78 × 35</b>',
    answer:'2730',
    hint:'78×30=2340. 78×5=390. Add: 2340+390.',
    explanation:'78×30=2340. 78×5=390. 2340+390=<b>2,730</b>.' }),

  // ══════════════════════════════════════════════
  //  FRACTIONS — Proper, Improper & Mixed Numbers
  // ══════════════════════════════════════════════
  makeNum({ id:'FIM01', chapterId:'fractions', subsection:'proper_improper', difficulty:1,
    question:'Convert the mixed number <b>3¼</b> to an improper fraction.',
    answer:'13/4',
    hint:'Multiply whole number by denominator, then add numerator. (3×4)+1=13. Keep same denominator.',
    explanation:'(3×4)+1=13. Denominator stays 4. Answer = <b>13/4</b>.' }),

  makeNum({ id:'FIM02', chapterId:'fractions', subsection:'proper_improper', difficulty:2,
    question:'Convert the improper fraction <b>17/5</b> to a mixed number.',
    answer:'3 2/5', acceptableAnswers:['3 2/5','3and2/5','3 and 2/5'],
    hint:'Divide: 17÷5=3 remainder 2. Write as 3 and 2/5.',
    explanation:'17÷5=3 r 2. Mixed number = <b>3 2/5</b>.' }),

  makeNum({ id:'FIM03', chapterId:'fractions', subsection:'proper_improper', difficulty:2,
    question:'Convert <b>2¾</b> to an improper fraction.',
    answer:'11/4',
    hint:'(2×4)+3=11. Denominator stays 4.',
    explanation:'(2×4)+3=11. Improper fraction = <b>11/4</b>.' }),

  // ══════════════════════════════════════════════
  //  FRACTIONS — Comparing & Ordering
  // ══════════════════════════════════════════════
  makeMCQ({ id:'FCO01', chapterId:'fractions', subsection:'comparing', difficulty:2,
    question:'Which fraction is <b>smaller</b>: <b>3/8</b> or <b>2/5</b>?',
    options:['3/8','2/5','They are equal','Cannot compare'],
    answer:'3/8',
    hint:'Find a common denominator (40). 3/8=15/40 and 2/5=16/40.',
    explanation:'3/8=15/40 and 2/5=16/40. Since 15<16, <b>3/8 is smaller</b>.' }),

  makeMCQ({ id:'FCO02', chapterId:'fractions', subsection:'comparing', difficulty:2,
    question:'Arrange in <b>ascending order</b> (smallest first):<br><b>1/2, 1/3, 2/5</b>',
    options:['1/3, 2/5, 1/2','1/2, 2/5, 1/3','2/5, 1/3, 1/2','1/3, 1/2, 2/5'],
    answer:'1/3, 2/5, 1/2',
    hint:'Common denominator 30: 1/3=10/30, 2/5=12/30, 1/2=15/30.',
    explanation:'10/30 < 12/30 < 15/30. So: <b>1/3 < 2/5 < 1/2</b>.' }),

  makeMCQ({ id:'FCO03', chapterId:'fractions', subsection:'comparing', difficulty:3,
    question:'Which is <b>greater</b>: <b>5/6</b> or <b>7/9</b>?',
    options:['5/6','7/9','They are equal','Cannot tell'],
    answer:'5/6',
    hint:'LCD of 6 and 9 = 18. 5/6=15/18 and 7/9=14/18.',
    explanation:'5/6=15/18, 7/9=14/18. 15>14, so <b>5/6 is greater</b>.' }),

  // ══════════════════════════════════════════════
  //  FRACTIONS — Adding & Subtracting
  // ══════════════════════════════════════════════
  makeNum({ id:'FAS01', chapterId:'fractions', subsection:'add_sub', difficulty:2,
    question:'Calculate: <b>1/3 + 1/4</b><br><i>(Give as a fraction, e.g. 5/12)</i>',
    answer:'7/12',
    hint:'LCD of 3 and 4 = 12. 1/3=4/12 and 1/4=3/12. Add numerators.',
    explanation:'4/12 + 3/12 = <b>7/12</b>.' }),

  makeNum({ id:'FAS02', chapterId:'fractions', subsection:'add_sub', difficulty:2,
    question:'Calculate: <b>2/3 − 1/4</b>',
    answer:'5/12',
    hint:'LCD=12. 2/3=8/12 and 1/4=3/12. Subtract numerators.',
    explanation:'8/12 − 3/12 = <b>5/12</b>.' }),

  makeNum({ id:'FAS03', chapterId:'fractions', subsection:'add_sub', difficulty:3,
    question:'Calculate: <b>3/5 + 2/3</b><br><i>Give as a mixed number (e.g. 1 4/15)</i>',
    answer:'1 4/15', acceptableAnswers:['1 4/15','1and4/15','19/15'],
    hint:'LCD=15. 3/5=9/15 and 2/3=10/15. Add: 19/15=1r4.',
    explanation:'9/15+10/15=19/15=1 and 4/15. Answer = <b>1 4/15</b>.' }),

  makeNum({ id:'FAS04', chapterId:'fractions', subsection:'add_sub', difficulty:3,
    question:'Aisha has <b>¾ of a pizza</b> and eats <b>1/3</b>.<br>What fraction is <b>left</b>?',
    answer:'5/12',
    hint:'3/4 − 1/3. LCD=12. 9/12 − 4/12.',
    explanation:'9/12 − 4/12 = <b>5/12</b> of the pizza remains.' }),

  // ══════════════════════════════════════════════
  //  FRACTIONS — Fraction of a Quantity
  // ══════════════════════════════════════════════
  makeNum({ id:'FFQ01', chapterId:'fractions', subsection:'fraction_of', difficulty:1,
    question:'Find <b>3/4 of 60</b>.',
    answer:'45',
    hint:'Divide by 4 first (60÷4=15), then multiply by 3.',
    explanation:'60÷4=15. 15×3=<b>45</b>.' }),

  makeNum({ id:'FFQ02', chapterId:'fractions', subsection:'fraction_of', difficulty:2,
    question:'Find <b>5/8 of 96</b>.',
    answer:'60',
    hint:'96÷8=12. 12×5=?',
    explanation:'96÷8=12. 12×5=<b>60</b>.' }),

  makeNum({ id:'FFQ03', chapterId:'fractions', subsection:'fraction_of', difficulty:3,
    question:'A journey is <b>90 km</b> long. A driver completes <b>2/3</b> of it.<br>How many kilometres does he still have to drive?',
    answer:'30', acceptableAnswers:['30','30km'],
    hint:'Distance done = 2/3×90=60 km. Distance left = 90−60.',
    explanation:'2/3×90=60 km done. Left = 90−60=<b>30 km</b>.' }),

  // ══════════════════════════════════════════════
  //  DECIMALS — Operations
  // ══════════════════════════════════════════════
  makeNum({ id:'DOP01', chapterId:'decimals', subsection:'operations', difficulty:1,
    question:'Calculate: <b>4.75 + 2.85</b>',
    answer:'7.60', acceptableAnswers:['7.60','7.6'],
    hint:'Align decimal points. 75+85=160 (carry 1). 4+2+1=7.',
    explanation:'4.75 + 2.85 = <b>7.60</b>.' }),

  makeNum({ id:'DOP02', chapterId:'decimals', subsection:'operations', difficulty:2,
    question:'Calculate: <b>12.3 − 4.67</b>',
    answer:'7.63',
    hint:'Align decimal points. 12.30 − 4.67. Borrow as needed.',
    explanation:'12.30 − 4.67 = <b>7.63</b>.' }),

  makeNum({ id:'DOP03', chapterId:'decimals', subsection:'operations', difficulty:2,
    question:'Calculate: <b>2.4 × 5</b>',
    answer:'12', acceptableAnswers:['12','12.0'],
    hint:'24 × 5 = 120. Move decimal one place left → 12.0.',
    explanation:'2.4 × 5 = 24×5÷10 = 120÷10 = <b>12</b>.' }),

  makeNum({ id:'DOP04', chapterId:'decimals', subsection:'operations', difficulty:3,
    question:'Calculate: <b>15.6 ÷ 4</b>',
    answer:'3.9',
    hint:'156÷4=39. Then move the decimal one place left: 3.9.',
    explanation:'15.6÷4=<b>3.9</b>.' }),

  // ══════════════════════════════════════════════
  //  DECIMALS — Fraction ↔ Decimal Conversion
  // ══════════════════════════════════════════════
  makeMCQ({ id:'DCO01', chapterId:'decimals', subsection:'conversion', difficulty:1,
    question:'What is <b>0.75</b> as a fraction in its simplest form?',
    options:['3/4','7/5','75/10','15/20'],
    answer:'3/4',
    hint:'0.75 = 75/100. HCF of 75 and 100 is 25. 75÷25=3, 100÷25=4.',
    explanation:'75/100 ÷ 25 = <b>3/4</b>.' }),

  makeMCQ({ id:'DCO02', chapterId:'decimals', subsection:'conversion', difficulty:2,
    question:'What is <b>3/8</b> as a decimal?',
    options:['0.375','0.38','0.3','0.25'],
    answer:'0.375',
    hint:'Divide 3 by 8. 3.000 ÷ 8 = 0.375.',
    explanation:'3÷8 = <b>0.375</b>.' }),

  makeNum({ id:'DCO03', chapterId:'decimals', subsection:'conversion', difficulty:2,
    question:'Convert <b>0.4</b> to a fraction in simplest form.',
    answer:'2/5',
    hint:'0.4 = 4/10. Simplify by dividing both by 2.',
    explanation:'4/10 ÷ 2/2 = <b>2/5</b>.' }),

  // ══════════════════════════════════════════════
  //  PERCENTAGE — All subsections
  // ══════════════════════════════════════════════
  makeMCQ({ id:'PC01', chapterId:'percentage', subsection:'meaning', difficulty:1,
    question:'What does <b>%</b> mean?',
    options:['Per ten','Per hundred','Per thousand','Per million'],
    answer:'Per hundred',
    hint:'The word "percent" comes from Latin "per centum" meaning "per hundred".',
    explanation:'% means <b>per hundred</b>. So 45% = 45 out of 100.' }),

  makeMCQ({ id:'PC02', chapterId:'percentage', subsection:'conversion', difficulty:1,
    question:'What is <b>½</b> as a percentage?',
    options:['25%','40%','50%','75%'],
    answer:'50%',
    hint:'½ = 0.5. Multiply by 100 to get percentage.',
    explanation:'½ = 0.5 = <b>50%</b>.' }),

  makeNum({ id:'PC03', chapterId:'percentage', subsection:'conversion', difficulty:2,
    question:'Write <b>3/5</b> as a percentage.',
    answer:'60', acceptableAnswers:['60','60%'],
    hint:'3÷5=0.6. 0.6×100=60%.',
    explanation:'3÷5=0.6. 0.6×100=<b>60%</b>.' }),

  makeMCQ({ id:'PC04', chapterId:'percentage', subsection:'conversion', difficulty:2,
    question:'Write <b>45%</b> as a fraction in its simplest form.',
    options:['9/20','45/10','45/1000','4/5'],
    answer:'9/20',
    hint:'45/100. HCF of 45 and 100 is 5. Divide both by 5.',
    explanation:'45÷5=9, 100÷5=20. Simplest form = <b>9/20</b>.' }),

  makeNum({ id:'PC05', chapterId:'percentage', subsection:'conversion', difficulty:2,
    question:'What percentage is <b>18</b> of <b>24</b>?',
    answer:'75', acceptableAnswers:['75','75%'],
    hint:'(18 ÷ 24) × 100.',
    explanation:'18÷24 = 0.75. 0.75×100 = <b>75%</b>.' }),

  makeNum({ id:'PC06', chapterId:'percentage', subsection:'of_quantity', difficulty:1,
    question:'Find <b>25%</b> of Rs <b>80</b>.',
    answer:'20', acceptableAnswers:['20','Rs 20'],
    hint:'25% = ¼. 80÷4=20.',
    explanation:'25% = ¼. 80÷4 = <b>Rs 20</b>.' }),

  makeNum({ id:'PC07', chapterId:'percentage', subsection:'of_quantity', difficulty:2,
    question:'Find <b>15%</b> of <b>60</b>.',
    answer:'9',
    hint:'10% of 60 = 6. 5% of 60 = 3. 15% = 10%+5%.',
    explanation:'10% = 6. 5% = 3. 15% = 6+3 = <b>9</b>.' }),

  makeNum({ id:'PC08', chapterId:'percentage', subsection:'of_quantity', difficulty:2,
    question:'Find <b>40%</b> of <b>250</b>.',
    answer:'100',
    hint:'10% of 250 = 25. 40% = 4×25.',
    explanation:'10%=25. 40%=4×25=<b>100</b>.' }),

  makeNum({ id:'PC09', chapterId:'percentage', subsection:'of_quantity', difficulty:3,
    question:'A class has <b>30 pupils</b>. <b>60%</b> of them passed a test.<br>How many <b>failed</b>?',
    answer:'12',
    hint:'Passed = 60% × 30 = 18. Failed = 30 − 18.',
    explanation:'60% of 30 = 18 passed. 30−18 = <b>12 failed</b>.' }),

  makeNum({ id:'PC10', chapterId:'percentage', subsection:'of_quantity', difficulty:3,
    question:'A school has <b>500 pupils</b>. <b>45%</b> are boys.<br>How many are <b>girls</b>?',
    answer:'275',
    hint:'Boys = 45% of 500 = 225. Girls = 500 − 225.',
    explanation:'45% of 500 = (45÷100)×500 = 225 boys. Girls = 500−225 = <b>275</b>.' }),

  makeNum({ id:'PC11', chapterId:'percentage', subsection:'increase', difficulty:3,
    question:'A price increases from <b>Rs 200</b> to <b>Rs 250</b>.<br>What is the <b>percentage increase</b>?',
    answer:'25', acceptableAnswers:['25','25%'],
    hint:'Increase = 250−200=50. % increase = (50÷200)×100.',
    explanation:'Increase=50. (50÷200)×100=<b>25%</b>.' }),

  makeNum({ id:'PC12', chapterId:'percentage', subsection:'increase', difficulty:3,
    question:'A mark drops from <b>80</b> to <b>72</b>.<br>What is the <b>percentage decrease</b>?',
    answer:'10', acceptableAnswers:['10','10%'],
    hint:'Decrease=80−72=8. (8÷80)×100.',
    explanation:'Decrease=8. (8÷80)×100=<b>10%</b>.' }),

  makeNum({ id:'PC13', chapterId:'percentage', subsection:'increase', difficulty:4,
    question:'Priya earns <b>Rs 3,500 per month</b>. She gets a <b>12%</b> salary increase.<br>What is her <b>new monthly salary</b>?',
    answer:'3920', acceptableAnswers:['3920','Rs 3920','3,920'],
    hint:'Increase = 12% of 3500. New salary = 3500 + increase.',
    explanation:'12% of 3500 = (12÷100)×3500 = Rs 420. New salary = 3500+420 = <b>Rs 3,920</b>.' }),

  makeNum({ id:'PC14', chapterId:'percentage', subsection:'of_quantity', difficulty:4,
    question:'A shopkeeper gives a <b>15%</b> discount on a shirt marked at <b>Rs 480</b>.<br>What is the <b>selling price</b>?',
    answer:'408', acceptableAnswers:['408','Rs 408'],
    hint:'Discount = 15% of 480. Selling price = 480 − discount.',
    explanation:'Discount=15%×480=(15÷100)×480=Rs 72. Selling price=480−72=<b>Rs 408</b>.' }),

  // ══════════════════════════════════════════════
  //  MONEY — Discount & Best Buy
  // ══════════════════════════════════════════════
  makeNum({ id:'DISC01', chapterId:'money', subsection:'discount', difficulty:2,
    question:'A watch is priced at <b>Rs 500</b>. A <b>20%</b> discount is offered.<br>What is the <b>sale price</b>?',
    answer:'400', acceptableAnswers:['400','Rs 400'],
    hint:'Discount = 20% of 500 = 100. Sale price = 500 − 100.',
    explanation:'20% of 500 = Rs 100. Sale price = 500−100 = <b>Rs 400</b>.' }),

  makeMCQ({ id:'DISC02', chapterId:'money', subsection:'discount', difficulty:3,
    question:'Shop A sells pens at <b>Rs 5 each</b>. Shop B sells <b>8 pens for Rs 36</b>.<br>Which is the <b>better buy</b>?',
    options:['Shop A (Rs 5 each)','Shop B (Rs 4.50 each)','Both the same price','Cannot tell'],
    answer:'Shop B (Rs 4.50 each)',
    hint:'Shop B: 36÷8=Rs 4.50 per pen. Compare with Rs 5.',
    explanation:'Shop B: 36÷8=Rs 4.50 per pen < Rs 5. <b>Shop B is better</b>.' }),

  makeNum({ id:'DISC03', chapterId:'money', subsection:'discount', difficulty:3,
    question:'A toy marked <b>Rs 600</b> has a <b>30%</b> discount.<br>Find the <b>amount saved</b>.',
    answer:'180', acceptableAnswers:['180','Rs 180'],
    hint:'Amount saved = 30% of 600.',
    explanation:'30% of 600=(30÷100)×600=<b>Rs 180</b> saved.' }),

  makeNum({ id:'DISC04', chapterId:'money', subsection:'discount', difficulty:4,
    question:'Leila buys a jacket marked <b>Rs 920</b> at a discount of <b>25%</b>.<br>She pays with Rs 1,000.<br>What is her <b>change</b>?',
    answer:'310', acceptableAnswers:['310','Rs 310'],
    hint:'Discount=25%×920=Rs 230. Sale price=920−230=Rs 690. Change=1000−690.',
    explanation:'Discount=Rs 230. Sale price=Rs 690. Change=1000−690=<b>Rs 310</b>.' }),

  // ══════════════════════════════════════════════
  //  TIME — Reading Clocks (12h / 24h)
  // ══════════════════════════════════════════════
  makeNum({ id:'CLK01', chapterId:'time', subsection:'reading', difficulty:1,
    question:'Write <b>3:45 pm</b> in 24-hour format.',
    answer:'15:45', acceptableAnswers:['15:45','1545'],
    hint:'For pm times after noon, add 12 to the hour. 3+12=15.',
    explanation:'3:45 pm = 12+3 hours = <b>15:45</b>.' }),

  makeNum({ id:'CLK02', chapterId:'time', subsection:'reading', difficulty:2,
    question:'Write <b>22:30</b> in 12-hour format (with am/pm).',
    answer:'10:30pm', acceptableAnswers:['10:30pm','10:30 pm'],
    hint:'22:30 is after noon (pm). 22−12=10.',
    explanation:'22:30 − 12 hours = <b>10:30 pm</b>.' }),

  makeNum({ id:'CLK03', chapterId:'time', subsection:'reading', difficulty:2,
    question:'How many minutes from <b>08:15</b> to <b>09:00</b>?',
    answer:'45', acceptableAnswers:['45','45 min','45 minutes'],
    hint:'From 08:15 to 09:00 = 45 minutes.',
    explanation:'09:00 − 08:15 = <b>45 minutes</b>.' }),

  makeNum({ id:'CLK04', chapterId:'time', subsection:'reading', difficulty:3,
    question:'A film starts at <b>19:45</b> and lasts <b>1 h 50 min</b>.<br>At what time does it end? <i>(24h format)</i>',
    answer:'21:35', acceptableAnswers:['21:35','9:35pm'],
    hint:'19:45 + 1h = 20:45. 20:45 + 50min = 21:35.',
    explanation:'19:45 + 1h = 20:45. 20:45 + 50min = <b>21:35</b>.' }),

  // ══════════════════════════════════════════════
  //  TIME — Calendar Problems
  // ══════════════════════════════════════════════
  makeMCQ({ id:'CAL01', chapterId:'time', subsection:'calendar', difficulty:2,
    question:'If today is <b>Wednesday 5th March</b>, what day is <b>14th March</b>?',
    options:['Monday','Tuesday','Friday','Thursday'],
    answer:'Friday',
    hint:'14 − 5 = 9 days later. 9 ÷ 7 = 1 week + 2 days. Wednesday + 2 = Friday.',
    explanation:'9 days later: 9÷7=1r2. Wednesday+2=<b>Friday</b>.' }),

  makeNum({ id:'CAL02', chapterId:'time', subsection:'calendar', difficulty:2,
    question:'How many days from <b>15 July</b> to <b>12 August</b>?',
    answer:'28', acceptableAnswers:['28','28 days'],
    hint:'July has 31 days. Remaining in July: 31−15=16. Then 12 days in August.',
    explanation:'31−15=16 days left in July. +12 days in August = <b>28 days</b>.' }),

  makeNum({ id:'CAL03', chapterId:'time', subsection:'calendar', difficulty:3,
    question:'A school term starts on <b>3 January</b> and ends on <b>28 March</b>.<br>How many days is the term?<br><i>(Assume February has 28 days)</i>',
    answer:'84', acceptableAnswers:['84','84 days'],
    hint:'Jan: 31−3=28 days. Feb: 28 days. March: 28 days. Total = 28+28+28.',
    explanation:'Jan 3→31=28 days. Feb=28. Mar 1→28=28 days. Total=28+28+28=<b>84 days</b>.' }),

  makeMCQ({ id:'CAL04', chapterId:'time', subsection:'calendar', difficulty:3,
    question:'Riya was born on <b>15 August 2015</b>. On 15 August 2025, how old is she?',
    options:['9 years old','10 years old','11 years old','8 years old'],
    answer:'10 years old',
    hint:'2025 − 2015 = 10 years.',
    explanation:'2025 − 2015 = <b>10 years old</b>.' }),

  // ══════════════════════════════════════════════
  //  AREA — Triangles
  // ══════════════════════════════════════════════
  makeNum({ id:'TRI01', chapterId:'area', subsection:'triangle', difficulty:2,
    question:'Find the area of a triangle with base <b>8 cm</b> and height <b>5 cm</b>.',
    answer:'20', acceptableAnswers:['20','20cm2','20 cm²'],
    hint:'Area of triangle = ½ × base × height. ½ × 8 × 5.',
    explanation:'Area = ½ × 8 × 5 = ½ × 40 = <b>20 cm²</b>.' }),

  makeNum({ id:'TRI02', chapterId:'area', subsection:'triangle', difficulty:2,
    question:'A triangle has base <b>12 m</b> and height <b>7 m</b>.<br>Find its area.',
    answer:'42', acceptableAnswers:['42','42m2','42 m²'],
    hint:'Area = ½ × 12 × 7.',
    explanation:'½ × 12 × 7 = <b>42 m²</b>.' }),

  makeNum({ id:'TRI03', chapterId:'area', subsection:'triangle', difficulty:3,
    question:'A triangular garden has a base of <b>14 m</b> and a height of <b>9 m</b>.<br>Grass seed costs <b>Rs 25 per m²</b>.<br>Find the <b>total cost</b> to seed the garden.',
    answer:'1575', acceptableAnswers:['1575','Rs 1575'],
    hint:'Area = ½×14×9=63 m². Cost = 63 × 25.',
    explanation:'Area=½×14×9=63 m². Cost=63×25=<b>Rs 1,575</b>.' }),

  // ══════════════════════════════════════════════
  //  AREA — Compound Shapes
  // ══════════════════════════════════════════════
  makeNum({ id:'COMP01', chapterId:'area', subsection:'compound', difficulty:3,
    question:`An L-shaped room is shown below:
<div style="margin:8px 0;font-family:monospace;font-size:14px;color:#1e3a5f;background:#f0f4ff;display:inline-block;padding:8px;border-radius:6px;">
  ┌──────8 m──────┐<br>
  │               │<br>
3 m         ┌───┤<br>
  │         │ 2m │ 3m<br>
  └───5m────┘   │<br>
                └─3m─┘
</div>
<br>Find the area of the L-shape.<br><i>(Outer rectangle is 8m wide, 6m tall; cut-out is 3m×3m)</i>`,
    answer:'39', acceptableAnswers:['39','39m2','39 m²'],
    hint:'Total rectangle area − cut-out area. 8×6=48. Cut-out=3×3=9. 48−9=39.',
    explanation:'Outer area=8×6=48. Cut-out=3×3=9. L-shape area=48−9=<b>39 m²</b>.' }),

  makeNum({ id:'COMP02', chapterId:'area', subsection:'compound', difficulty:3,
    question:'A path <b>1 m wide</b> surrounds a rectangular garden <b>6 m × 4 m</b>.<br>Find the area of the <b>path only</b>.',
    answer:'24', acceptableAnswers:['24','24m2','24 m²'],
    hint:'Outer rectangle=(6+2)×(4+2)=8×6=48. Inner=6×4=24. Path=48−24.',
    explanation:'Outer=8×6=48 m². Inner=6×4=24 m². Path area=48−24=<b>24 m²</b>.' }),

  // ══════════════════════════════════════════════
  //  GRAPHS — Bar Charts
  // ══════════════════════════════════════════════
  makeNum({ id:'BAR01', chapterId:'graphs', subsection:'bar_chart', difficulty:1,
    question:`A bar chart shows books read in a week:
<div style="background:#f8fafc;border:1px solid #e2e8f0;padding:8px;border-radius:6px;margin:6px 0;font-size:13px;">
  Mon: ████████ 8<br>
  Tue: ██████ 6<br>
  Wed: ██████████ 10<br>
  Thu: ████ 4<br>
  Fri: ████████ 8
</div>
How many books were read on <b>Wednesday</b>?`,
    answer:'10',
    hint:'Read the bar height for Wednesday.',
    explanation:'The Wednesday bar reaches <b>10</b>.' }),

  makeNum({ id:'BAR02', chapterId:'graphs', subsection:'bar_chart', difficulty:2,
    question:`A bar chart shows pupils' favourite sports:
<div style="background:#f8fafc;border:1px solid #e2e8f0;padding:8px;border-radius:6px;margin:6px 0;font-size:13px;">
  Football: 45<br>
  Cricket: 28<br>
  Swimming: 32<br>
  Tennis: 15
</div>
How many <b>more pupils</b> prefer Football than Cricket?`,
    answer:'17',
    hint:'45 − 28 = ?',
    explanation:'45 − 28 = <b>17 more pupils</b>.' }),

  makeNum({ id:'BAR03', chapterId:'graphs', subsection:'bar_chart', difficulty:2,
    question:`A bar chart shows cookies sold each day:
Mon:35, Tue:42, Wed:28, Thu:50, Fri:45
<br>What is the <b>total cookies sold</b> for the week?`,
    answer:'200',
    hint:'Add all 5 values: 35+42+28+50+45.',
    explanation:'35+42+28+50+45=<b>200 cookies</b>.' }),

  makeNum({ id:'BAR04', chapterId:'graphs', subsection:'bar_chart', difficulty:3,
    question:`A bar chart shows the number of cars sold each quarter:
Q1:120, Q2:150, Q3:90, Q4:180
<br>What is the <b>average</b> number of cars sold per quarter?`,
    answer:'135',
    hint:'Total=(120+150+90+180)=540. Average=540÷4.',
    explanation:'Total=540. 540÷4=<b>135 cars</b> per quarter.' }),

  // ══════════════════════════════════════════════
  //  GRAPHS — Frequency Tables
  // ══════════════════════════════════════════════
  makeNum({ id:'FRQ01', chapterId:'graphs', subsection:'frequency', difficulty:2,
    question:`A frequency table shows test marks:
<table style="border-collapse:collapse;margin:6px 0;font-size:13px">
  <tr><th style="border:1px solid #ccc;padding:4px 8px">Mark</th><th style="border:1px solid #ccc;padding:4px 8px">Freq</th></tr>
  <tr><td style="border:1px solid #ccc;padding:4px 8px">60</td><td style="border:1px solid #ccc;padding:4px 8px">4</td></tr>
  <tr><td style="border:1px solid #ccc;padding:4px 8px">70</td><td style="border:1px solid #ccc;padding:4px 8px">7</td></tr>
  <tr><td style="border:1px solid #ccc;padding:4px 8px">80</td><td style="border:1px solid #ccc;padding:4px 8px">5</td></tr>
  <tr><td style="border:1px solid #ccc;padding:4px 8px">90</td><td style="border:1px solid #ccc;padding:4px 8px">4</td></tr>
</table>
How many pupils took the test in <b>total</b>?`,
    answer:'20',
    hint:'Add all frequencies: 4+7+5+4.',
    explanation:'4+7+5+4=<b>20 pupils</b>.' }),

  makeMCQ({ id:'FRQ02', chapterId:'graphs', subsection:'frequency', difficulty:2,
    question:`Using the same frequency table (Mark: Freq — 60:4, 70:7, 80:5, 90:4),
what is the <b>mode</b> (most common mark)?`,
    options:['60','70','80','90'],
    answer:'70',
    hint:'The mode is the value with the highest frequency.',
    explanation:'Frequency 7 is highest, for mark 70. Mode = <b>70</b>.' }),

  makeNum({ id:'FRQ03', chapterId:'graphs', subsection:'frequency', difficulty:3,
    question:`A frequency table shows siblings:
<table style="border-collapse:collapse;margin:6px 0;font-size:13px">
  <tr><th style="border:1px solid #ccc;padding:3px 7px">Siblings</th><th style="border:1px solid #ccc;padding:3px 7px">Freq</th></tr>
  <tr><td style="border:1px solid #ccc;padding:3px 7px">0</td><td style="border:1px solid #ccc;padding:3px 7px">5</td></tr>
  <tr><td style="border:1px solid #ccc;padding:3px 7px">1</td><td style="border:1px solid #ccc;padding:3px 7px">12</td></tr>
  <tr><td style="border:1px solid #ccc;padding:3px 7px">2</td><td style="border:1px solid #ccc;padding:3px 7px">8</td></tr>
  <tr><td style="border:1px solid #ccc;padding:3px 7px">3</td><td style="border:1px solid #ccc;padding:3px 7px">3</td></tr>
  <tr><td style="border:1px solid #ccc;padding:3px 7px">4</td><td style="border:1px solid #ccc;padding:3px 7px">2</td></tr>
</table>
What is the <b>total number of siblings</b> across all pupils?`,
    answer:'45',
    hint:'Multiply each siblings value by its frequency, then add: 0×5 + 1×12 + 2×8 + 3×3 + 4×2.',
    explanation:'0+12+16+9+8=<b>45 siblings</b> in total.' }),

];

QS2.forEach(q => { if (q) STATIC_QUESTIONS.push(q); });
console.log(`✅ Subsection questions loaded: ${QS2.filter(Boolean).length} questions added.`);
