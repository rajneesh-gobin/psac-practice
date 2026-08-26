'use strict';
// ══════════════════════════════════════════════
//  Grade 5 Maths - Core Question Bank
//  Base questions for all 18 chapters.
//  Pushes into the global STATIC_QUESTIONS array.
//  Must load AFTER engine/helpers.js and engine/questions_engine.js
// ══════════════════════════════════════════════

STATIC_QUESTIONS.push(

  // ── NUMERATION ──
  makeMCQ({ id:'N01', chapterId:'numeration', subsection:'place_value', difficulty:1,
    question:'What is the value of the digit <b>7</b> in the number 47,382?',
    options:['7','70','700','7,000','70,000'],
    answer:'7,000',
    hint:'The positions from right to left are: ones, tens, hundreds, thousands, ten-thousands. Find where 7 sits.',
    explanation:'In 47,382, the digit 7 is in the <b>thousands</b> place. Its value = 7 × 1,000 = <b>7,000</b>.' }),

  makeMCQ({ id:'N02', chapterId:'numeration', subsection:'place_value', difficulty:1,
    question:'Which digit is in the <b>ten-thousands</b> place of 82,541?',
    options:['2','8','5','4'],
    answer:'8',
    hint:'Count the digits from the right: ones→tens→hundreds→thousands→ten-thousands.',
    explanation:'82,541 has 5 digits. The ten-thousands digit (leftmost) is <b>8</b>.' }),

  makeNum({ id:'N03', chapterId:'numeration', subsection:'words_digits', difficulty:2,
    question:'Write the number <b>fifty-three thousand, two hundred and six</b> in digits.',
    answer:'53206', acceptableAnswers:['53206','53,206','53 206'],
    hint:'Fifty-three thousand = 53,000. Two hundred = 200. Six = 6. Add them together.',
    explanation:'53,000 + 200 + 6 = <b>53,206</b>.' }),

  makeNum({ id:'N04', chapterId:'numeration', subsection:'place_value', difficulty:2,
    question:'What is <b>10,000 more</b> than 63,457?',
    answer:'73457', acceptableAnswers:['73457','73,457'],
    hint:'Adding 10,000 increases only the ten-thousands digit by 1.',
    explanation:'63,457 + 10,000 = <b>73,457</b>.' }),

  makeMCQ({ id:'N05', chapterId:'numeration', subsection:'ordering', difficulty:2,
    question:'Arrange in <b>ascending order</b> (smallest first):<br>34,512 &nbsp; 34,215 &nbsp; 34,521',
    options:['34,215 ; 34,512 ; 34,521','34,512 ; 34,215 ; 34,521','34,521 ; 34,512 ; 34,215','34,215 ; 34,521 ; 34,512'],
    answer:'34,215 ; 34,512 ; 34,521',
    hint:'Compare digit by digit from left to right. All have the same ten-thousands (3) and thousands (4) digit, so compare the hundreds digit next.',
    explanation:'Hundreds digits: 2 < 5 < 5. For the two numbers with 5 in hundreds, compare tens: 1 < 2. So: 34,215 → 34,512 → 34,521.' }),

  makeNum({ id:'N06', chapterId:'numeration', subsection:'expanded', difficulty:3,
    question:'Write the <b>expanded form</b> of 56,304.<br><i>(Format: 50000+6000+300+4)</i>',
    answer:'50000+6000+300+4',
    acceptableAnswers:['50000+6000+300+4','50,000+6,000+300+4'],
    hint:'Expanded form splits each digit by its place value. 56,304 = 5×10000 + 6×1000 + 3×100 + 0×10 + 4×1.',
    explanation:'56,304 = 50,000 + 6,000 + 300 + 4 (the tens digit is 0 so we skip it).' }),

  makeMCQ({ id:'N07', chapterId:'numeration', subsection:'ordering', difficulty:3,
    question:'Which number is exactly <b>halfway</b> between 40,000 and 50,000?',
    options:['44,000','45,000','46,000','48,000'],
    answer:'45,000',
    hint:'Halfway = (first number + second number) ÷ 2.',
    explanation:'(40,000 + 50,000) ÷ 2 = 90,000 ÷ 2 = <b>45,000</b>.' }),

  makeNum({ id:'N08', chapterId:'numeration', subsection:'word_probs', difficulty:4,
    question:'School A has 28,456 pupils. School B has 36,321 pupils.<br>How many <b>more</b> pupils does School B have?',
    answer:'7865', acceptableAnswers:['7865','7,865'],
    hint:'This is a subtraction word problem. Subtract the smaller number from the larger.',
    explanation:'36,321 − 28,456 = <b>7,865</b> more pupils.' }),

  // ── FOUR OPERATIONS ──
  makeNum({ id:'F01', chapterId:'four_ops', subsection:'addition', difficulty:1,
    question:'Calculate: <b>34,567 + 28,432</b>',
    answer:'62999', acceptableAnswers:['62999','62,999'],
    hint:'Line up the digits by place value. Add from right (ones) to left (ten-thousands), carrying when needed.',
    explanation:'34,567 + 28,432 = <b>62,999</b>.' }),

  makeNum({ id:'F02', chapterId:'four_ops', subsection:'addition', difficulty:1,
    question:'Calculate: <b>70,000 − 23,456</b>',
    answer:'46544', acceptableAnswers:['46544','46,544'],
    hint:'Borrow from the left as needed. 70,000 − 23,456: you will need to borrow through several zeros.',
    explanation:'70,000 − 23,456 = <b>46,544</b>.' }),

  makeNum({ id:'F03', chapterId:'four_ops', subsection:'multiplication', difficulty:2,
    question:'Calculate: <b>4,563 × 8</b>',
    answer:'36504', acceptableAnswers:['36504','36,504'],
    hint:'Multiply each digit by 8 from right to left, carrying the tens digit each time.',
    explanation:'4,563 × 8: 3×8=24 (carry 2), 6×8=48+2=50 (carry 5), 5×8=40+5=45 (carry 4), 4×8=32+4=36. Answer: <b>36,504</b>.' }),

  makeNum({ id:'F04', chapterId:'four_ops', subsection:'division', difficulty:2,
    question:'Calculate: <b>7,296 ÷ 6</b>',
    answer:'1216',
    hint:'Use long division. 7÷6=1 remainder 1. Bring down 2 → 12÷6=2. Bring down 9 → 9÷6=1 r3. Bring down 6 → 36÷6=6.',
    explanation:'7,296 ÷ 6 = <b>1,216</b>.' }),

  makeNum({ id:'F05', chapterId:'four_ops', subsection:'multiplication', difficulty:2,
    question:'Calculate: <b>234 × 15</b>',
    answer:'3510', acceptableAnswers:['3510','3,510'],
    hint:'Break it: 234 × 15 = 234 × 10 + 234 × 5 = 2,340 + 1,170.',
    explanation:'234 × 10 = 2,340 and 234 × 5 = 1,170. Total = 2,340 + 1,170 = <b>3,510</b>.' }),

  makeNum({ id:'F06', chapterId:'four_ops', subsection:'addition', difficulty:3,
    question:'Calculate: <b>52,368 + 37,945</b>',
    answer:'90313', acceptableAnswers:['90313','90,313'],
    hint:'Add column by column right to left. Watch for carries.',
    explanation:'52,368 + 37,945 = <b>90,313</b>.' }),

  makeNum({ id:'F07', chapterId:'four_ops', subsection:'division', difficulty:3,
    question:'Calculate: <b>9,405 ÷ 9</b>',
    answer:'1045',
    hint:'9÷9=1, 4÷9=0 (bring down 0), 40÷9=4 r4, 45÷9=5.',
    explanation:'9,405 ÷ 9 = <b>1,045</b>.' }),

  makeNum({ id:'F08', chapterId:'four_ops', subsection:'word_probs', difficulty:4,
    question:'Mrs Ali buys <b>24 books</b> at Rs 35 each. She pays with a Rs 1,000 note.<br>How much <b>change</b> does she receive?',
    answer:'160', acceptableAnswers:['160','Rs 160'],
    hint:'Step 1: Total cost = 24 × 35. Step 2: Change = 1,000 − total cost.',
    explanation:'24 × 35 = Rs 840. Change = 1,000 − 840 = <b>Rs 160</b>.' }),

  makeNum({ id:'F09', chapterId:'four_ops', subsection:'word_probs', difficulty:4,
    question:'A factory packs 350 biscuits into boxes of 14. How many <b>full boxes</b> are made?',
    answer:'25',
    hint:'This is a division problem. Divide total biscuits by number per box.',
    explanation:'350 ÷ 14 = <b>25</b> full boxes.' }),

  // ── SQUARE NUMBERS & PATTERNS ──
  makeNum({ id:'S01', chapterId:'square_nums', subsection:'square_nums', difficulty:1,
    question:'What is <b>7 squared</b> (7²)?',
    answer:'49',
    hint:'7 squared means 7 × 7.',
    explanation:'7² = 7 × 7 = <b>49</b>.' }),

  makeNum({ id:'S02', chapterId:'square_nums', subsection:'square_nums', difficulty:1,
    question:'What is <b>9²</b>?',
    answer:'81',
    hint:'9² = 9 × 9.',
    explanation:'9 × 9 = <b>81</b>.' }),

  makeMCQ({ id:'S03', chapterId:'square_nums', subsection:'square_nums', difficulty:2,
    question:'Which of these is a <b>perfect square number</b>?',
    options:['50','36','72','45'],
    answer:'36',
    hint:'A perfect square is the result of a whole number multiplied by itself. Check: 6 × 6 = 36.',
    explanation:'6 × 6 = 36, so <b>36</b> is a perfect square. (50, 72, 45 are not perfect squares.)' }),

  makeNum({ id:'S04', chapterId:'square_nums', subsection:'square_roots', difficulty:2,
    question:'What is the <b>square root</b> of 64?<br><i>(i.e., which number × itself = 64?)</i>',
    answer:'8',
    hint:'Think: which number multiplied by itself gives 64? 8 × 8 = ?',
    explanation:'8 × 8 = 64, so the square root of 64 = <b>8</b>.' }),

  makeMCQ({ id:'S05', chapterId:'square_nums', subsection:'patterns', difficulty:2,
    question:'What is the <b>next number</b> in the sequence?<br>1, 4, 9, 16, ___',
    options:['20','24','25','30'],
    answer:'25',
    hint:'These are square numbers: 1²=1, 2²=4, 3²=9, 4²=16 … what is 5²?',
    explanation:'The pattern is the sequence of square numbers. 5² = 5 × 5 = <b>25</b>.' }),

  makeMCQ({ id:'S06', chapterId:'square_nums', subsection:'patterns', difficulty:3,
    question:'What is the <b>next number</b> in the sequence?<br>3, 6, 12, 24, ___',
    options:['30','36','48','60'],
    answer:'48',
    hint:'Check the rule: is each term being multiplied or added? 3→6 (×2), 6→12 (×2), 12→24 (×2)…',
    explanation:'Each term is multiplied by 2. 24 × 2 = <b>48</b>.' }),

  makeNum({ id:'S07', chapterId:'square_nums', subsection:'patterns', difficulty:3,
    question:'The <b>next 3 terms</b> of the sequence 100, 90, 81, 73, … follow a subtracting pattern.<br>What is the term after 73?',
    answer:'66',
    hint:'Find the differences: 100-90=10, 90-81=9, 81-73=8 … the differences decrease by 1 each time. So next difference = 7.',
    explanation:'Differences: 10, 9, 8, 7 … 73 − 7 = <b>66</b>.' }),

  makeNum({ id:'S08', chapterId:'square_nums', subsection:'square_nums', difficulty:4,
    question:'A square garden has an <b>area of 169 m²</b>.<br>What is the length of one side?',
    answer:'13', acceptableAnswers:['13','13m','13 m'],
    hint:'The area of a square = side × side. Find which number × itself = 169.',
    explanation:'13 × 13 = 169. So the side length = <b>13 m</b>.' }),

  // ── GEOMETRY ──
  makeMCQ({ id:'G01', chapterId:'geometry', subsection:'symmetry', difficulty:1,
    question:'How many <b>lines of symmetry</b> does a square have?',
    options:['1','2','3','4'],
    answer:'4',
    hint:'A line of symmetry divides the shape into two identical halves. A square can be folded along horizontal, vertical, and both diagonal lines.',
    explanation:'A square has <b>4</b> lines of symmetry: 2 along the diagonals and 2 through the midpoints of opposite sides.' }),

  makeMCQ({ id:'G02', chapterId:'geometry', subsection:'symmetry', difficulty:1,
    question:'How many lines of symmetry does an <b>equilateral triangle</b> have?',
    options:['1','2','3','4'],
    answer:'3',
    hint:'An equilateral triangle has 3 equal sides. Each line of symmetry goes from a vertex to the midpoint of the opposite side.',
    explanation:'An equilateral triangle has <b>3</b> lines of symmetry.' }),

  makeMCQ({ id:'G03', chapterId:'geometry', subsection:'angles', difficulty:1,
    question:'An angle of <b>90°</b> is called a ___ angle.',
    options:['Acute','Obtuse','Right','Straight'],
    answer:'Right',
    hint:'A right angle looks like the corner of a square and is exactly 90°.',
    explanation:'An angle of exactly 90° is called a <b>right angle</b>.' }),

  makeMCQ({ id:'G04', chapterId:'geometry', subsection:'directions', difficulty:2,
    question:'You face <b>North</b> and turn <b>clockwise 90°</b>. Which direction do you now face?',
    options:['South','East','West','North-East'],
    answer:'East',
    hint:'Clockwise from North goes: North → East → South → West → North. A 90° turn is one quarter-turn.',
    explanation:'A 90° clockwise turn from North brings you to face <b>East</b>.' }),

  makeNum({ id:'G05', chapterId:'geometry', subsection:'angles', difficulty:2,
    question:'Two angles of a triangle are <b>45°</b> and <b>75°</b>. What is the <b>third angle</b>?',
    answer:'60', acceptableAnswers:['60','60°','60 degrees'],
    hint:'The angles of a triangle always add up to 180°. Third angle = 180° − 45° − 75°.',
    explanation:'180° − 45° − 75° = <b>60°</b>.' }),

  makeMCQ({ id:'G06', chapterId:'geometry', subsection:'2d_shapes', difficulty:2,
    question:'Which shape has <b>4 equal sides</b> and <b>4 right angles</b>?',
    options:['Rectangle','Rhombus','Square','Parallelogram'],
    answer:'Square',
    hint:'A rectangle has 4 right angles but sides are not necessarily equal. A rhombus has equal sides but not necessarily right angles.',
    explanation:'Only the <b>square</b> has all four sides equal AND all four angles equal to 90°.' }),

  makeMCQ({ id:'G07', chapterId:'geometry', subsection:'2d_shapes', difficulty:3,
    question:'How many <b>sides</b> does a pentagon have?',
    options:['4','5','6','7'],
    answer:'5',
    hint:'Penta = 5 in Greek. Pentagon = 5-sided shape.',
    explanation:'A pentagon has <b>5</b> sides.' }),

  makeNum({ id:'G08', chapterId:'geometry', subsection:'angles', difficulty:4,
    question:'An isosceles triangle has two angles of <b>70°</b> each.<br>What is the size of the <b>third angle</b>?',
    answer:'40', acceptableAnswers:['40','40°'],
    hint:'Angles in a triangle = 180°. An isosceles triangle has two equal base angles.',
    explanation:'Two angles = 70° + 70° = 140°. Third angle = 180° − 140° = <b>40°</b>.' }),

  // ── FRACTIONS ──
  makeMCQ({ id:'FR01', chapterId:'fractions', subsection:'equivalent', difficulty:1,
    question:'Simplify <b>12/16</b> to its lowest terms.',
    options:['6/8','3/4','2/3','4/5'],
    answer:'3/4',
    hint:'Find the Highest Common Factor (HCF) of 12 and 16. HCF = 4. Divide both by 4.',
    explanation:'12 ÷ 4 = 3 and 16 ÷ 4 = 4. So 12/16 = <b>3/4</b>.' }),

  makeNum({ id:'FR02', chapterId:'fractions', subsection:'fraction_of', difficulty:1,
    question:'What is <b>¾ of 80</b>?',
    answer:'60',
    hint:'To find ¾ of a number: first divide by 4 (to find ¼), then multiply by 3.',
    explanation:'80 ÷ 4 = 20 (this is ¼). 20 × 3 = <b>60</b> (this is ¾).' }),

  makeNum({ id:'FR03', chapterId:'fractions', subsection:'proper_improper', difficulty:2,
    question:'Convert the mixed number <b>2 and 3/5</b> to an improper fraction.<br><i>(Write as a/b, e.g. 13/5)</i>',
    answer:'13/5',
    hint:'Improper fraction = (whole number × denominator) + numerator, over the denominator. 2 × 5 + 3 = 13.',
    explanation:'2 and 3/5 = (2 × 5 + 3)/5 = <b>13/5</b>.' }),

  makeNum({ id:'FR04', chapterId:'fractions', subsection:'add_sub', difficulty:2,
    question:'Calculate: <b>2/3 + 1/4</b><br><i>(Give as a fraction, e.g. 11/12)</i>',
    answer:'11/12',
    hint:'Find a common denominator first. LCD of 3 and 4 is 12. Convert: 2/3 = 8/12, 1/4 = 3/12.',
    explanation:'2/3 = 8/12 and 1/4 = 3/12. Adding: 8/12 + 3/12 = <b>11/12</b>.' }),

  makeNum({ id:'FR05', chapterId:'fractions', subsection:'add_sub', difficulty:2,
    question:'Calculate: <b>3/4 − 1/3</b><br><i>(Give as a fraction, e.g. 5/12)</i>',
    answer:'5/12',
    hint:'LCD of 4 and 3 is 12. Convert: 3/4 = 9/12, 1/3 = 4/12.',
    explanation:'9/12 − 4/12 = <b>5/12</b>.' }),

  makeNum({ id:'FR06', chapterId:'fractions', subsection:'add_sub', difficulty:3,
    question:'Calculate: <b>2/5 × 35</b>',
    answer:'14',
    hint:'To multiply a fraction by a whole number: (2 × 35) ÷ 5. Or: find 1/5 of 35 first, then multiply by 2.',
    explanation:'35 ÷ 5 = 7 (that is 1/5). 7 × 2 = <b>14</b>.' }),

  makeMCQ({ id:'FR07', chapterId:'fractions', subsection:'proper_improper', difficulty:3,
    question:'Convert the improper fraction <b>17/4</b> to a mixed number.',
    options:['4 and 1/4','4 and 3/4','3 and 1/4','5 and 1/4'],
    answer:'4 and 1/4',
    hint:'Divide the numerator by the denominator. 17 ÷ 4 = 4 remainder 1. So it is 4 and 1/4.',
    explanation:'17 ÷ 4 = 4 with remainder 1. So 17/4 = <b>4 and 1/4</b>.' }),

  makeNum({ id:'FR08', chapterId:'fractions', subsection:'word_probs', difficulty:4,
    question:'A bag of flour weighs <b>5 kg</b>. Reza uses <b>2/5</b> of it for baking.<br>How many kg does she use?',
    answer:'2', acceptableAnswers:['2','2kg','2 kg'],
    hint:'Find 2/5 of 5. Divide 5 by 5 to get 1/5, then multiply by 2.',
    explanation:'5 ÷ 5 = 1 (that is 1/5). 1 × 2 = <b>2 kg</b>.' }),

  // ── DECIMALS ──
  makeMCQ({ id:'D01', chapterId:'decimals', subsection:'place_value', difficulty:1,
    question:'What is the value of the digit <b>5</b> in 3.<b>5</b>7?',
    options:['5 ones','5 tenths','5 hundredths','5 tens'],
    answer:'5 tenths',
    hint:'In a decimal, the first digit after the point is tenths, the second is hundredths.',
    explanation:'3.57: the digit 5 is in the first decimal place (tenths). Its value is <b>5 tenths</b>.' }),

  makeNum({ id:'D02', chapterId:'decimals', subsection:'operations', difficulty:1,
    question:'Calculate: <b>3.45 + 2.30</b>',
    answer:'5.75',
    hint:'Line up the decimal points. Add as normal: .45 + .30 = .75 and 3 + 2 = 5.',
    explanation:'3.45 + 2.30 = <b>5.75</b>.' }),

  makeNum({ id:'D03', chapterId:'decimals', subsection:'operations', difficulty:2,
    question:'Calculate: <b>8.50 − 3.25</b>',
    answer:'5.25',
    hint:'Keep the decimal points lined up. 8.50 − 3.25: .50 − .25 = .25 and 8 − 3 = 5.',
    explanation:'8.50 − 3.25 = <b>5.25</b>.' }),

  makeMCQ({ id:'D04', chapterId:'decimals', subsection:'ordering', difficulty:2,
    question:'Arrange in <b>descending order</b> (largest first):<br>0.8 &nbsp; 0.45 &nbsp; 0.9 &nbsp; 0.35',
    options:['0.9, 0.8, 0.45, 0.35','0.35, 0.45, 0.8, 0.9','0.9, 0.45, 0.8, 0.35','0.8, 0.9, 0.45, 0.35'],
    answer:'0.9, 0.8, 0.45, 0.35',
    hint:'Compare tenths digit first. 0.9 > 0.8 > 0.45 > 0.35.',
    explanation:'Largest to smallest: <b>0.9, 0.8, 0.45, 0.35</b>.' }),

  makeNum({ id:'D05', chapterId:'decimals', subsection:'place_value', difficulty:3,
    question:'Round <b>7.68</b> to 1 decimal place.',
    answer:'7.7',
    hint:'Look at the second decimal digit (8). Since 8 ≥ 5, round up the first decimal digit.',
    explanation:'7.68: the second decimal is 8 ≥ 5, so round up 6 to 7. Answer: <b>7.7</b>.' }),

  makeNum({ id:'D06', chapterId:'decimals', subsection:'operations', difficulty:3,
    question:'Calculate: <b>4.25 × 4</b>',
    answer:'17', acceptableAnswers:['17','17.0','17.00'],
    hint:'Multiply as whole numbers: 425 × 4 = 1700. Then place decimal 2 places from right.',
    explanation:'4.25 × 4 = <b>17.00 = 17</b>.' }),

  makeNum({ id:'D07', chapterId:'decimals', subsection:'word_probs', difficulty:4,
    question:'Anita buys cloth at <b>Rs 45.50 per metre</b>. She buys <b>3 metres</b>.<br>How much does she pay in total?',
    answer:'136.50', acceptableAnswers:['136.50','136.5','Rs 136.50'],
    hint:'Total = price per metre × number of metres = 45.50 × 3.',
    explanation:'45.50 × 3 = <b>Rs 136.50</b>.' }),

  // ── POWERS ──
  makeNum({ id:'P01', chapterId:'powers', subsection:'calculate', difficulty:1,
    question:'Calculate: <b>2³</b>',
    answer:'8',
    hint:'2³ means 2 × 2 × 2. Multiply three 2s together.',
    explanation:'2 × 2 × 2 = 4 × 2 = <b>8</b>.' }),

  makeNum({ id:'P02', chapterId:'powers', subsection:'notation', difficulty:1,
    question:'Write <b>5 × 5</b> using exponent (power) notation.<br><i>(Write as e.g. 5^2)</i>',
    answer:'5^2', acceptableAnswers:['5^2','5²'],
    hint:'When a number is multiplied by itself, write the base followed by the exponent (how many times it appears).',
    explanation:'5 × 5 = 5² (5 to the power of 2). Written as <b>5^2</b>.' }),

  makeNum({ id:'P03', chapterId:'powers', subsection:'calculate', difficulty:2,
    question:'Calculate: <b>3² + 2³</b>',
    answer:'17',
    hint:'Calculate each power first: 3² = 3×3 = 9 and 2³ = 2×2×2 = 8. Then add.',
    explanation:'3² = 9 and 2³ = 8. 9 + 8 = <b>17</b>.' }),

  makeNum({ id:'P04', chapterId:'powers', subsection:'calculate', difficulty:2,
    question:'Calculate: <b>10² − 5²</b>',
    answer:'75',
    hint:'10² = 100 and 5² = 25. Subtract.',
    explanation:'10² = 100 and 5² = 25. 100 − 25 = <b>75</b>.' }),

  makeNum({ id:'P05', chapterId:'powers', subsection:'calculate', difficulty:3,
    question:'Calculate: <b>2³ × 3²</b>',
    answer:'72',
    hint:'First: 2³ = 8. Then: 3² = 9. Multiply the results.',
    explanation:'2³ = 8 and 3² = 9. 8 × 9 = <b>72</b>.' }),

  makeMCQ({ id:'P06', chapterId:'powers', subsection:'calculate', difficulty:3,
    question:'Which is greater: <b>4²</b> or <b>3³</b>?',
    options:['4² because 16 > 27','3³ because 27 > 16','They are equal','Cannot be compared'],
    answer:'3³ because 27 > 16',
    hint:'Calculate both: 4² = 4×4 and 3³ = 3×3×3. Then compare.',
    explanation:'4² = 16 and 3³ = 27. Since 27 > 16, <b>3³ is greater</b>.' }),

  makeNum({ id:'P07', chapterId:'powers', subsection:'calculate', difficulty:4,
    question:'A cuboid has equal sides of length <b>4 cm</b>.<br>Express its volume as a power and calculate it.<br><i>(Volume of a cube = side × side × side)</i>',
    answer:'64', acceptableAnswers:['64','64 cm3','64cm3'],
    hint:'Volume = side³. Calculate 4³ = 4 × 4 × 4.',
    explanation:'Volume = 4³ = 4 × 4 × 4 = 16 × 4 = <b>64 cm³</b>.' }),

  // ── AVERAGE ──
  makeNum({ id:'A01', chapterId:'average', subsection:'mean', difficulty:1,
    question:'Find the <b>average</b> of: 20, 30, 40',
    answer:'30',
    hint:'Average = total sum ÷ number of items. Add all three, then divide by 3.',
    explanation:'(20 + 30 + 40) ÷ 3 = 90 ÷ 3 = <b>30</b>.' }),

  makeNum({ id:'A02', chapterId:'average', subsection:'mean', difficulty:1,
    question:'Find the average of: <b>15, 25, 35, 45</b>',
    answer:'30',
    hint:'Add all four numbers, then divide by 4.',
    explanation:'(15+25+35+45) ÷ 4 = 120 ÷ 4 = <b>30</b>.' }),

  makeNum({ id:'A03', chapterId:'average', subsection:'mean', difficulty:2,
    question:'The <b>average</b> of 5 numbers is <b>12</b>.<br>What is their <b>sum</b>?',
    answer:'60',
    hint:'Sum = Average × number of items. Think of it like: if each of 5 boxes has 12 items, total = 5 × 12.',
    explanation:'Sum = 12 × 5 = <b>60</b>.' }),

  makeNum({ id:'A04', chapterId:'average', subsection:'word_probs', difficulty:2,
    question:'Mia scored <b>65, 78, 82</b> and <b>71</b> in four tests.<br>What was her <b>average score</b>?',
    answer:'74',
    hint:'Add all four scores, then divide by 4 (the number of tests).',
    explanation:'(65+78+82+71) ÷ 4 = 296 ÷ 4 = <b>74</b>.' }),

  makeNum({ id:'A05', chapterId:'average', subsection:'mean', difficulty:3,
    question:'The average of <b>3 numbers</b> is <b>20</b>. Two of them are <b>15</b> and <b>22</b>.<br>Find the <b>third number</b>.',
    answer:'23',
    hint:'Step 1: Find the total (average × 3 = 60). Step 2: Subtract the two known numbers.',
    explanation:'Total = 20 × 3 = 60. Third number = 60 − 15 − 22 = <b>23</b>.' }),

  makeNum({ id:'A06', chapterId:'average', subsection:'word_probs', difficulty:4,
    question:'A class of <b>30 pupils</b> has an average score of <b>75</b>.<br>If 25 pupils scored a total of <b>1,875</b>, what is the total score of the remaining <b>5 pupils</b>?',
    answer:'375',
    hint:'Step 1: Find overall total = average × 30. Step 2: Subtract the 25 pupils\' total.',
    explanation:'Overall total = 75 × 30 = 2,250. Remaining 5 pupils = 2,250 − 1,875 = <b>375</b>.' }),

  // ── RATIO ──
  makeMCQ({ id:'R01', chapterId:'ratio', subsection:'equivalent', difficulty:1,
    question:'Simplify the ratio <b>8 : 12</b>',
    options:['4:6','2:3','4:8','1:4'],
    answer:'2:3',
    hint:'Find the HCF of 8 and 12. HCF = 4. Divide both sides by 4.',
    explanation:'8 ÷ 4 = 2 and 12 ÷ 4 = 3. So 8:12 = <b>2:3</b>.' }),

  makeNum({ id:'R02', chapterId:'ratio', subsection:'word_probs', difficulty:2,
    question:'In a class, the ratio of boys to girls is <b>3:2</b>.<br>There are <b>15 boys</b>. How many <b>girls</b> are there?',
    answer:'10',
    hint:'3 parts = 15 boys, so 1 part = 15 ÷ 3 = 5. Girls = 2 parts = 2 × 5.',
    explanation:'1 part = 15 ÷ 3 = 5. Girls = 2 × 5 = <b>10</b>.' }),

  makeNum({ id:'R03', chapterId:'ratio', subsection:'word_probs', difficulty:2,
    question:'1 pencil costs <b>Rs 5</b>. How much do <b>8 pencils</b> cost? (Direct proportion)',
    answer:'40', acceptableAnswers:['40','Rs 40'],
    hint:'This is direct proportion. Cost = price of 1 × number of pencils.',
    explanation:'8 × Rs 5 = <b>Rs 40</b>.' }),

  makeNum({ id:'R04', chapterId:'ratio', subsection:'writing', difficulty:3,
    question:'The ratio of red to blue marbles is <b>4:5</b>. There are <b>36 marbles</b> in total.<br>How many are <b>red</b>?',
    answer:'16',
    hint:'Total parts = 4+5 = 9. Red marbles = (4/9) × 36.',
    explanation:'Total parts = 9. Value of 1 part = 36 ÷ 9 = 4. Red = 4 × 4 = <b>16</b>.' }),

  makeNum({ id:'R05', chapterId:'ratio', subsection:'writing', difficulty:3,
    question:'3 oranges cost <b>Rs 10</b>. How much do <b>12 oranges</b> cost?',
    answer:'40', acceptableAnswers:['40','Rs 40'],
    hint:'Find the cost of 1 orange first, then multiply by 12. Or: use the ratio 3:10 = 12:?',
    explanation:'1 orange = Rs 10 ÷ 3. 12 oranges = (10 ÷ 3) × 12 = 10 × 4 = <b>Rs 40</b>.' }),

  makeNum({ id:'R06', chapterId:'ratio', subsection:'dividing', difficulty:4,
    question:'Asha and Ben share <b>Rs 280</b> in the ratio <b>3:4</b>.<br>How much does <b>Asha</b> get?',
    answer:'120', acceptableAnswers:['120','Rs 120'],
    hint:'Total parts = 3+4 = 7. Asha\'s share = (3/7) × 280.',
    explanation:'Total parts = 7. 1 part = 280 ÷ 7 = 40. Asha = 3 × 40 = <b>Rs 120</b>.' }),

  // ── LENGTH ──
  makeNum({ id:'L01', chapterId:'length', subsection:'conversion', difficulty:1,
    question:'Convert <b>3 m</b> to centimetres.',
    answer:'300', acceptableAnswers:['300','300cm','300 cm'],
    hint:'1 metre = 100 cm. Multiply by 100.',
    explanation:'3 m = 3 × 100 = <b>300 cm</b>.' }),

  makeNum({ id:'L02', chapterId:'length', subsection:'conversion', difficulty:1,
    question:'Convert <b>450 cm</b> to metres. <i>(Write as m cm, e.g. 4m50cm)</i>',
    answer:'4m50cm', acceptableAnswers:['4m50cm','4 m 50 cm','4.5m','4.5'],
    hint:'Divide by 100 to convert cm to m. 450 ÷ 100 = 4 remainder 50.',
    explanation:'450 ÷ 100 = 4 m remainder 50 cm = <b>4 m 50 cm</b>.' }),

  makeNum({ id:'L03', chapterId:'length', subsection:'perimeter', difficulty:2,
    question:'Find the <b>perimeter</b> of a rectangle with length <b>8 cm</b> and width <b>5 cm</b>.',
    answer:'26', acceptableAnswers:['26','26cm','26 cm'],
    hint:'Perimeter of rectangle = 2 × length + 2 × width = (2 × 8) + (2 × 5).',
    explanation:'P = (2 × 8) + (2 × 5) = 16 + 10 = <b>26 cm</b>.' }),

  makeNum({ id:'L04', chapterId:'length', subsection:'perimeter', difficulty:2,
    question:'A square has a <b>perimeter of 64 cm</b>. What is the length of <b>one side</b>?',
    answer:'16', acceptableAnswers:['16','16cm','16 cm'],
    hint:'A square has 4 equal sides. Side = perimeter ÷ 4.',
    explanation:'64 ÷ 4 = <b>16 cm</b>.' }),

  makeNum({ id:'L05', chapterId:'length', subsection:'perimeter', difficulty:3,
    question:'Find the perimeter of a triangle with sides <b>7 cm</b>, <b>8 cm</b> and <b>9 cm</b>.',
    answer:'24', acceptableAnswers:['24','24cm','24 cm'],
    hint:'Perimeter of a triangle = sum of all three sides.',
    explanation:'7 + 8 + 9 = <b>24 cm</b>.' }),

  makeNum({ id:'L06', chapterId:'length', subsection:'perimeter', difficulty:4,
    question:'A rectangle has a perimeter of <b>40 cm</b> and a length of <b>12 cm</b>.<br>Find its <b>width</b>.',
    answer:'8', acceptableAnswers:['8','8cm','8 cm'],
    hint:'P = 2l + 2w. So 40 = 2(12) + 2w → 40 = 24 + 2w → 2w = 16 → w = 8.',
    explanation:'40 = 2(12) + 2w → 40 − 24 = 2w → 16 = 2w → w = <b>8 cm</b>.' }),

  // ── AREA ──
  makeNum({ id:'AR01', chapterId:'area', subsection:'rectangle', difficulty:1,
    question:'Find the <b>area</b> of a rectangle with length <b>6 cm</b> and width <b>4 cm</b>.',
    answer:'24', acceptableAnswers:['24','24cm2','24 cm²'],
    hint:'Area of rectangle = length × width.',
    explanation:'Area = 6 × 4 = <b>24 cm²</b>.' }),

  makeNum({ id:'AR02', chapterId:'area', subsection:'rectangle', difficulty:1,
    question:'Find the <b>area</b> of a square with side <b>7 cm</b>.',
    answer:'49', acceptableAnswers:['49','49cm2','49 cm²'],
    hint:'Area of square = side × side = side².',
    explanation:'Area = 7 × 7 = <b>49 cm²</b>.' }),

  makeNum({ id:'AR03', chapterId:'area', subsection:'rectangle', difficulty:2,
    question:'A rectangle has an area of <b>56 cm²</b> and a width of <b>7 cm</b>.<br>Find its <b>length</b>.',
    answer:'8', acceptableAnswers:['8','8cm','8 cm'],
    hint:'Length = Area ÷ Width.',
    explanation:'Length = 56 ÷ 7 = <b>8 cm</b>.' }),

  makeNum({ id:'AR04', chapterId:'area', subsection:'triangle', difficulty:2,
    question:'Find the area of a right-angled triangle with base <b>10 cm</b> and height <b>6 cm</b>.',
    answer:'30', acceptableAnswers:['30','30cm2','30 cm²'],
    hint:'Area of triangle = (base × height) ÷ 2. Or: (rectangle area) ÷ 2.',
    explanation:'Area = (10 × 6) ÷ 2 = 60 ÷ 2 = <b>30 cm²</b>.' }),

  makeNum({ id:'AR05', chapterId:'area', subsection:'rectangle', difficulty:3,
    question:'A square has an area of <b>81 cm²</b>. Find the <b>side length</b>.',
    answer:'9', acceptableAnswers:['9','9cm','9 cm'],
    hint:'Area = side × side. Find which number × itself = 81.',
    explanation:'9 × 9 = 81. Side length = <b>9 cm</b>.' }),

  makeNum({ id:'AR06', chapterId:'area', subsection:'word_probs', difficulty:4,
    question:'A rectangular garden is <b>15 m × 12 m</b>. Grass costs <b>Rs 25 per m²</b>.<br>What is the <b>total cost</b> of grassing the garden?',
    answer:'4500', acceptableAnswers:['4500','Rs 4500','Rs 4,500'],
    hint:'Step 1: Area = 15 × 12. Step 2: Cost = Area × 25.',
    explanation:'Area = 15 × 12 = 180 m². Cost = 180 × 25 = <b>Rs 4,500</b>.' }),

  // ── CAPACITY ──
  makeNum({ id:'C01', chapterId:'capacity', subsection:'operations', difficulty:1,
    question:'Complete: <b>1 litre = ___ mL</b>',
    answer:'1000',
    hint:'The prefix "milli" means one thousandth. 1 L = 1,000 millilitres.',
    explanation:'<b>1 L = 1,000 mL</b>.' }),

  makeNum({ id:'C02', chapterId:'capacity', subsection:'conversion', difficulty:1,
    question:'Convert <b>2.5 L</b> to millilitres.',
    answer:'2500', acceptableAnswers:['2500','2500ml','2500 mL'],
    hint:'1 L = 1,000 mL. Multiply 2.5 × 1,000.',
    explanation:'2.5 × 1,000 = <b>2,500 mL</b>.' }),

  makeNum({ id:'C03', chapterId:'capacity', subsection:'operations', difficulty:2,
    question:'Calculate: <b>3 L 500 mL + 2 L 750 mL</b><br><i>(Give answer as e.g. 6L250mL)</i>',
    answer:'6L250mL', acceptableAnswers:['6L250mL','6 L 250 mL','6250mL'],
    hint:'Add mL first: 500+750=1250 mL = 1 L 250 mL. Carry 1 L. Add litres: 3+2+1=6 L.',
    explanation:'500 mL + 750 mL = 1,250 mL = 1 L 250 mL. 3 L + 2 L + 1 L = 6 L. Total = <b>6 L 250 mL</b>.' }),

  makeNum({ id:'C04', chapterId:'capacity', subsection:'operations', difficulty:3,
    question:'A fish tank holds <b>18 L</b>. Each bucket holds <b>3 L 600 mL</b>.<br>How many <b>full buckets</b> are needed to fill the tank?',
    answer:'5',
    hint:'Convert to mL: 18 L = 18,000 mL, 3 L 600 mL = 3,600 mL. Divide.',
    explanation:'18,000 ÷ 3,600 = <b>5</b> full buckets.' }),

  makeNum({ id:'C05', chapterId:'capacity', subsection:'operations', difficulty:4,
    question:'A container has <b>7 L 400 mL</b> of juice. <b>2 L 650 mL</b> is poured out.<br>How much is <b>left</b>?',
    answer:'4L750mL', acceptableAnswers:['4L750mL','4 L 750 mL','4750mL'],
    hint:'7 L 400 mL − 2 L 650 mL. Since 400 mL < 650 mL, borrow 1 L (=1000 mL): 1400 − 650 = 750 mL.',
    explanation:'Borrow 1 L: 7400 mL − 2650 mL = 4750 mL = <b>4 L 750 mL</b>.' }),

  // ── MASS ──
  makeNum({ id:'M01', chapterId:'mass', subsection:'operations', difficulty:1,
    question:'Complete: <b>1 kg = ___ g</b>',
    answer:'1000',
    hint:'The prefix "kilo" means 1,000. 1 kilogram = 1,000 grams.',
    explanation:'<b>1 kg = 1,000 g</b>.' }),

  makeNum({ id:'M02', chapterId:'mass', subsection:'conversion', difficulty:1,
    question:'Convert <b>3.5 kg</b> to grams.',
    answer:'3500', acceptableAnswers:['3500','3500g','3500 g'],
    hint:'Multiply by 1,000. 3.5 × 1,000.',
    explanation:'3.5 × 1,000 = <b>3,500 g</b>.' }),

  makeNum({ id:'M03', chapterId:'mass', subsection:'operations', difficulty:2,
    question:'Calculate: <b>4 kg 300 g + 2 kg 800 g</b><br><i>(e.g. 7kg100g)</i>',
    answer:'7kg100g', acceptableAnswers:['7kg100g','7 kg 100 g','7100g'],
    hint:'Add g first: 300+800=1100 g = 1 kg 100 g. Carry 1 kg. 4+2+1=7 kg.',
    explanation:'300+800=1,100 g=1 kg 100 g. Litres: 4+2+1=7 kg. Total = <b>7 kg 100 g</b>.' }),

  makeNum({ id:'M04', chapterId:'mass', subsection:'operations', difficulty:2,
    question:'4 equal bags have a total mass of <b>12 kg 800 g</b>.<br>Find the mass of <b>one bag</b>.',
    answer:'3kg200g', acceptableAnswers:['3kg200g','3 kg 200 g','3200g'],
    hint:'Divide the total mass by 4. 12 kg 800 g = 12,800 g. 12,800 ÷ 4.',
    explanation:'12,800 g ÷ 4 = 3,200 g = <b>3 kg 200 g</b>.' }),

  makeNum({ id:'M05', chapterId:'mass', subsection:'word_probs', difficulty:4,
    question:'A bag of rice weighs <b>5 kg 400 g</b>. There are <b>6 bags</b>.<br>What is the <b>total mass</b>?',
    answer:'32kg400g', acceptableAnswers:['32kg400g','32 kg 400 g','32400g'],
    hint:'Multiply: 5 kg 400 g × 6. First multiply g: 400×6=2400g=2kg400g. Then kg: 5×6=30kg. Add: 30+2=32kg.',
    explanation:'400 g × 6 = 2,400 g = 2 kg 400 g. 5 kg × 6 = 30 kg. Total = 30+2 = <b>32 kg 400 g</b>.' }),

  // ── MONEY ──
  makeNum({ id:'MO01', chapterId:'money', subsection:'operations', difficulty:1,
    question:'Calculate: <b>Rs 5.50 + Rs 3.25</b>',
    answer:'8.75', acceptableAnswers:['8.75','Rs 8.75'],
    hint:'Add pence (cents) first: 50+25=75 cents. Then rupees: 5+3=8.',
    explanation:'Rs 5.50 + Rs 3.25 = <b>Rs 8.75</b>.' }),

  makeMCQ({ id:'MO02', chapterId:'money', subsection:'profit_loss', difficulty:1,
    question:'An item is bought for <b>Rs 50</b> and sold for <b>Rs 65</b>.<br>Is this a profit or loss? How much?',
    options:['Profit of Rs 15','Loss of Rs 15','Profit of Rs 10','No profit or loss'],
    answer:'Profit of Rs 15',
    hint:'When selling price > buying price, there is a PROFIT. Profit = Selling Price − Buying Price.',
    explanation:'SP (65) > BP (50), so there is a PROFIT. Profit = 65 − 50 = <b>Rs 15</b>.' }),

  makeNum({ id:'MO03', chapterId:'money', subsection:'profit_loss', difficulty:2,
    question:'A trader buys an item for <b>Rs 200</b> and sells it for <b>Rs 175</b>.<br>Find the <b>loss</b>.',
    answer:'25', acceptableAnswers:['25','Rs 25'],
    hint:'When SP < BP, there is a LOSS. Loss = Buying Price − Selling Price.',
    explanation:'BP(200) > SP(175), so LOSS = 200 − 175 = <b>Rs 25</b>.' }),

  makeNum({ id:'MO04', chapterId:'money', subsection:'profit_loss', difficulty:2,
    question:'Selling price is <b>Rs 350</b>, profit is <b>Rs 80</b>.<br>Find the <b>buying price</b>.',
    answer:'270', acceptableAnswers:['270','Rs 270'],
    hint:'Buying Price = Selling Price − Profit.',
    explanation:'BP = 350 − 80 = <b>Rs 270</b>.' }),

  makeNum({ id:'MO05', chapterId:'money', subsection:'profit_loss', difficulty:3,
    question:'A shopkeeper buys 20 mangoes at Rs 4 each and sells them at Rs 7 each.<br>What is his <b>total profit</b>?',
    answer:'60', acceptableAnswers:['60','Rs 60'],
    hint:'Profit per mango = SP − BP = 7−4 = Rs 3. Total profit = 3 × 20.',
    explanation:'Profit per mango = 7−4 = Rs 3. Total = 3 × 20 = <b>Rs 60</b>.' }),

  makeNum({ id:'MO06', chapterId:'money', subsection:'profit_loss', difficulty:4,
    question:'A trader buys 50 kg of sugar at Rs 60 per kg and sells at Rs 75 per kg.<br>Find the <b>total profit</b>.',
    answer:'750', acceptableAnswers:['750','Rs 750'],
    hint:'Profit per kg = 75−60 = Rs 15. Total profit = 15 × 50.',
    explanation:'Profit per kg = 75−60 = Rs 15. Total = 15 × 50 = <b>Rs 750</b>.' }),

  makeNum({ id:'MO07', chapterId:'money', subsection:'profit_loss', difficulty:3,
    question:'Sylvie bought 84 pencils for <b>Rs 378</b>. She sold them at <b>Rs 6 each</b>.<br>Find her <b>profit</b>.',
    answer:'126', acceptableAnswers:['126','Rs 126'],
    hint:'Total selling = 84×6. Profit = Total selling − Buying price.',
    explanation:'Total selling = 84×6 = Rs 504. Profit = 504−378 = <b>Rs 126</b>.' }),

  // ── TIME ──
  makeNum({ id:'T01', chapterId:'time', subsection:'reading', difficulty:1,
    question:'Complete: <b>1 hour = ___ minutes</b>',
    answer:'60',
    hint:'There are 60 minutes in every hour. This is the key time conversion fact.',
    explanation:'<b>1 hour = 60 minutes</b>.' }),

  makeNum({ id:'T02', chapterId:'time', subsection:'conversion', difficulty:1,
    question:'Convert <b>3 hours</b> to minutes.',
    answer:'180', acceptableAnswers:['180','180 min','180 minutes'],
    hint:'1 hour = 60 minutes. Multiply by 3.',
    explanation:'3 × 60 = <b>180 minutes</b>.' }),

  makeNum({ id:'T03', chapterId:'time', subsection:'reading', difficulty:2,
    question:'Calculate: <b>2 h 30 min + 1 h 45 min</b><br><i>(e.g. 4h15min)</i>',
    answer:'4h15min', acceptableAnswers:['4h15min','4 h 15 min','4:15'],
    hint:'Add minutes: 30+45=75 min = 1h 15min. Carry 1h. Add hours: 2+1+1=4h.',
    explanation:'30+45=75 min=1h 15min. Hours: 2+1+1=4h. Total = <b>4 h 15 min</b>.' }),

  makeNum({ id:'T04', chapterId:'time', subsection:'conversion', difficulty:2,
    question:'Convert <b>195 minutes</b> to hours and minutes.<br><i>(e.g. 3h15min)</i>',
    answer:'3h15min', acceptableAnswers:['3h15min','3 h 15 min'],
    hint:'Divide by 60. 195 ÷ 60 = 3 hours remainder 15 minutes.',
    explanation:'195 ÷ 60 = 3 h remainder 15 min = <b>3 h 15 min</b>.' }),

  makeNum({ id:'T05', chapterId:'time', subsection:'duration', difficulty:3,
    question:'A journey of <b>4 h 30 min</b> starts at <b>10:15 am</b>.<br>At what time does it end? <i>(24h format or am/pm)</i>',
    answer:'2:45pm', acceptableAnswers:['2:45pm','14:45','2:45 pm','14h45'],
    hint:'Add 4h to 10:15 → 14:15. Then add 30min → 14:45 = 2:45 pm.',
    explanation:'10:15 + 4h = 14:15. 14:15 + 30min = 14:45 = <b>2:45 pm</b>.' }),

  makeNum({ id:'T06', chapterId:'time', subsection:'reading', difficulty:4,
    question:'School starts at <b>8:45 am</b>. Lunch break is after <b>3 h 15 min</b>.<br>At what time is lunch? <i>(e.g. 12:00pm)</i>',
    answer:'12:00pm', acceptableAnswers:['12:00pm','12:00','12pm','noon'],
    hint:'Add 3h to 8:45 → 11:45. Add 15min → 12:00.',
    explanation:'8:45 + 3h = 11:45. 11:45 + 15min = <b>12:00 (noon)</b>.' }),

  // ── GRAPHS ──
  makeMCQ({ id:'GR01', chapterId:'graphs', subsection:'pictogram', difficulty:1,
    question:'In a pictogram, <b>1 symbol = 5 pupils</b>.<br>How many pupils do <b>3 symbols</b> represent?',
    options:['3','5','15','50'],
    answer:'15',
    hint:'Multiply the number of symbols by the key value.',
    explanation:'3 × 5 = <b>15 pupils</b>.' }),

  makeNum({ id:'GR02', chapterId:'graphs', subsection:'bar_chart', difficulty:2,
    question:'A bar chart shows: Monday bar = <b>40</b>, Tuesday bar = <b>25</b>.<br>How many <b>more</b> on Monday than Tuesday?',
    answer:'15',
    hint:'More = larger value − smaller value.',
    explanation:'40 − 25 = <b>15 more</b> on Monday.' }),

  makeMCQ({ id:'GR03', chapterId:'graphs', subsection:'pictogram', difficulty:2,
    question:`A pictogram shows children's favourite fruit:
<div class="picto-wrap">
<table class="picto-table">
  <tr><th>Fruit</th><th>Symbols</th></tr>
  <tr><td>Apple</td><td><span class="picto-sym">🍎🍎🍎</span></td></tr>
  <tr><td>Banana</td><td><span class="picto-sym">🍌🍌</span></td></tr>
  <tr><td>Mango</td><td><span class="picto-sym">🍋🍋🍋🍋</span></td></tr>
</table>
<span class="picto-key">🔑 Key: 1 symbol = 10 children</span>
</div>
How many children prefer <b>Mango</b>?`,
    options:['4','40','14','100'],
    answer:'40',
    hint:'Count the mango symbols (4) and multiply by the key value (10).',
    explanation:'Mango has 4 symbols. 4 × 10 = <b>40 children</b>.' }),

  makeNum({ id:'GR04', chapterId:'graphs', subsection:'mean', difficulty:3,
    question:'A bar chart for 5 subjects shows totals: Maths=80, English=70, French=60, Science=50, History=65.<br>What is the <b>average mark</b> across all subjects?',
    answer:'65',
    hint:'Average = total ÷ number of subjects. Add all 5 bars then divide by 5.',
    explanation:'(80+70+60+50+65)÷5 = 325÷5 = <b>65</b>.' }),

  makeMCQ({ id:'GR05', chapterId:'graphs', subsection:'pictogram', difficulty:3,
    question:`A pictogram shows trees planted each month:
<div class="picto-wrap">
<table class="picto-table">
  <tr><th>Month</th><th>Symbols</th></tr>
  <tr><td>February</td><td><span class="picto-sym">▲▲▲▲</span></td></tr>
  <tr><td>March</td><td><span class="picto-sym">▲▲</span></td></tr>
  <tr><td>September</td><td><span class="picto-sym">▲▲▲▲▲</span></td></tr>
</table>
<span class="picto-key">🔑 Key: ▲ = 3 trees</span>
</div>
In which month were the <b>most</b> trees planted?`,
    options:['February','March','September','Equal'],
    answer:'September',
    hint:'Count the symbols for each month and multiply by 3.',
    explanation:'September has 5 symbols = 5×3=15 trees. Feb=12 trees, Mar=6 trees. <b>September</b> has the most.' })

);
